"use strict";
const util = require('util');
const http = require('http');
const url = require("url");
const path = require("path");
const bcrypt = require('bcrypt-nodejs');
const jwt = require('jwt-simple');
const formidable = require('formidable');
const ObjectID = require('mongodb').ObjectID;
const moment = require('moment');
const _ = require('lodash');
const assert = require('assert');
const DB = require('../server-src/DB');
const FogBugz = require('./FogBugz');
const GridFS = require('./GridFS');
const MailChimp = require('./MailChimp');
const dotenv = require('dotenv').config();

const ApiError = require('./api-error');
const serve = require('koa-static');
const Koa = require('koa');
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');
const json = require('koa-json');

const app = new Koa();
const router = new Router({ prefix: '/api' });

app.use(bodyParser({ strict: false }));
app.use(json());

app.use(serve('.', { index: 'client-build/index.html' }));

app.use(async (ctx, next) => {
    try {
        await next();
    } catch (err) {
        ctx.status = err.status || 500;
        ctx.body = err.message;
    }
});

router.get('/member/count', async (ctx, next) =>
    await DB.countMembers()
        .then(memberCount => ctx.body = memberCount)
        .catch(ctx.throw));

router.get('/member/email-addresses', async (ctx, next) =>
    await DB.getAllEmailAddresses()
        .then(emailaddresses => ctx.body = emailaddresses)
        .catch(ctx.throw));

router.get('/member', async (ctx, next) =>
    await DB.authorizeMember(jwt.decode(ctx.request.header['x-auth'], process.env.SECRET_JWT_KEY)._id)
        .then(DB.getMembers)
        .then(members => ctx.body = members)
        .catch(ctx.throw));

router.get('/member/:id', async (ctx, next) =>
    await DB.findMember(jwt.decode(ctx.params.id, secretJwtKey)._id)
        .then(member => { console.log(member), ctx.body = member; })
        .catch(ctx.throw));

router.post('/member/login', async (ctx, next) =>
    await DB.loginMember(ctx.request.body)
        // Return a JWT token - required for 'Members Only'
        .then(member => ctx.body = { jwt: jwt.encode({ _id: member._id }, process.env.SECRET_JWT_KEY), exec: member.exec })
        .catch(ctx.throw));

router.post('/member/signup', async (ctx, next) =>
    await DB.signupMember(ctx.request.body)
        .then(member => ctx.body = { jwt: jwt.encode({ _id: member._id }, process.env.SECRET_JWT_KEY), exec: member.exec })
        .catch(ctx.throw));

router.put('/member/:id', async (ctx, next) => {
    const member_id = jwt.decode(ctx.params.id, process.env.SECRET_JWT_KEY)._id;
    await DB.persistMemberChange(ctx.request.body)
        .then(member => ctx.body = member)
        .catch(ctx.throw);
});

router.post('/member/', async (ctx, next) => {

    let member = _.assign(ctx.request.body);

    member = ctx.request.body;
    await DB.duplicateCheck(member)
        .catch(ctx.throw);

    member.password = bcrypt.hashSync(member.password);

    await DB.saveNewApplicant(member)
        .then(member => ctx.body = member)
        .catch(ctx.throw);
});

router.put('/member/:id/change-password', async (ctx, next) => {

    let member = _.assign(ctx.request.body);

    member._id = jwt.decode(ctx.request.header['x-auth'], secretJwtKey)._id;
    member.password = bcrypt.hashSync(member.password);

    await DB.persistMemberChange(member)
        .then(member => ctx.body = member)
        .catch(ctx.throw);
});

router.get('/newsitem/objectid', async (ctx, next) =>
    ctx.body = new ObjectID());

router.get('/newsitem', async (ctx, next) =>

    await DB.getNewsItems()
        .then(newsItems => ctx.body = newsItems)
        .catch(ctx.throw));

router.get('/newsitem/:id/files', async (ctx, next) => {

    try {
        const files = await GridFS.listNewsItemFiles(ctx.params.id);
        await GridFS.retrieveNewsItemFiles(files);
        ctx.body = files;
    } catch (err) {
        ctx.throw(err);
    }
});

router.get('/newsitem/image-upload', async (ctx, next) => {

    const form = new formidable.IncomingForm();
    form.parse(ctx.request, (err, fields, files) => {
        console.log('inspect:\n', util.inspect({ fields: fields, files: files }));
        console.log('filename: ', files.file.name);
    });
    form.on('progress', (bytesReceived, bytesExpected) => {
        const percent_complete = (bytesReceived / bytesExpected) * 100;
        console.log(percent_complete.toFixed(2));
    });
    form.on('error', function (err) {
        console.error(err);
    });
    form.on('end', (fields, files) => {
        /* Temporary location of our uploaded file */
        const temp_path = this.openedFiles[0].path;
        const file_name = this.openedFiles[0].name;
        console.log("request.headers['newsitemid']: ", ctx.request.header['newsitemid']);
        console.log("request.headers: ", JSON.stringify(ctx.request.headers, null, 4));
        GridFS.saveFileToDb(this.openedFiles[0].path, this.openedFiles[0].name, 'newsitem', ctx.request.header['newsitemid'])
            .then(() => ctx.status = 200)
            .catch(ctx.throw);
    });
});

router.delete('/newsitem/:id', async (ctx, next) =>

    await DB.removeNewsItem(ctx.params.id)
        .then(GridFS.removeNewsItemFiles)
        .then(() => ctx.status = 200)
        .catch(ctx.throw));

router.post('/newsitem/publish', async (ctx, next) =>

    await DB.saveNewsItem(ctx.request.body)
        .then(newsItem => ctx.body = newsItem)
        .catch(ctx.throw));

app.use(router.routes());

const port = process.env.PORT || 3000;
app.listen(port);

console.log('Server listening on Port: ', port);
