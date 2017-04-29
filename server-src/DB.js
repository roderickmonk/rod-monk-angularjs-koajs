"use strict";

const mongoose = require("mongoose");
const bcrypt = require('bcrypt-nodejs');
const jwt = require('jwt-simple');
const FogBugz = require('../server-src/FogBugz');
const ApiError = require('./api-error');
const moment = require('moment');
const _ = require('lodash');
const assert = require('http-assert');

// Tell mongoose not to use the general purpose Promise
require('mongoose').Promise = global.Promise;

mongoose.connect(process.env.MONGO_DB);

// Setup the Mongoose models
const MemberSchema = new mongoose.Schema({
	emailaddress: { type: String, lowercase: true },
	password: String,
	firstname: String,
	familyname: String,
	student: { type: Boolean, default: false },
	familyemailaddress: { type: String, lowercase: true, default: null },
	dob: Date,
	address: String,
	place: String,
	postcode: String,
	primaryphone: String,
	alternativephone: String,
	liabilityagreed: Boolean,
	communicationsagreed: Boolean,
	photoagreed: Boolean,
	paid: { type: Boolean, default: false },
	joiningyear: Number,
	exec: { type: String, lowercase: true }
});
const Member = mongoose.model('members', MemberSchema);

const NewsItemSchema = new mongoose.Schema({
	headline: String,
	body: String,
	uploadTimestamp: Date
});
const NewsItem = mongoose.model('newsitem', NewsItemSchema);

// Constants
const MONGOOSE_UPDATE_OPTIONS = {
	multi: false,
	upsert: false,
	new: true
};

const saveNewsItem = (newsitem) => new Promise((resolve, reject) => {

	// Record the date when the save was done
	newsitem.uploadTimestamp = moment();

	NewsItem(newsitem).save()
		.then(() => resolve(newsitem))
		.catch(reject);
});

const getNewsItems = () => NewsItem.find();

const removeNewsItem = (newsitemid) => NewsItem.findOneAndRemove({ _id: newsitemid }).then(() => newsitemid);

const countMembers = () => new Promise((resolve) => Member.find().then(members => resolve(members.length)));

const getMembers = () => Member.find({}, '-_id -password');

const getAllEmailAddresses = () => Member.find()
	.then(members => members.map(member => member.emailaddress));

const findMember = (_id) => Member.findOne({ _id }, '-_id -password');

// Make persistant changes to a member's information
const persistMemberChange = member => Member.findByIdAndUpdate(member._id, member, MONGOOSE_UPDATE_OPTIONS);

const loginMember = (login) =>

	new Promise((resolve, reject) => {

		Member.findOne({
			firstname: { $in: new RegExp(`^${login.firstname}$`, 'i') },
			emailaddress: { $in: new RegExp(`^${login.emailaddress}$`, 'i') },
		})
			.then(member => {
				if (_.isEmpty(member)) {
					reject(new ApiError('Unauthorized', 401));
				} else {
					// Comparison must be done against a proper encrypted password
					if (member.password && member.password.length == 60 &&
						bcrypt.compareSync(login.password, member.password)) {
						resolve(member);
						return;
					} else {
						reject(new ApiError('Unauthorized', 401));
					}
				}
			})
			.catch(reject);
	});

const signupMember = (member) => new Promise((resolve, reject) => {

	// Look for a member whose details match all of the following
	Member.findOne({
		firstname: { $in: new RegExp(`^${member.firstname}$`, 'i') },
		familyname: { $in: new RegExp(`^${member.familyname}$`, 'i') },
		emailaddress: { $in: new RegExp(`^${member.emailaddress}$`, 'i') },
		postcode: { $in: new RegExp(`^${member.postcode}$`, 'i') },
	})
		.then(({ _id, dob }) => {
			// Must exist and dobs must match
			if (_.isEmpty(_id) || !moment(member.dob).isSame(dob, 'day')) {
				reject(new ApiError('Unauthorized', 401));
			} else {
				// Record the encrypted form of the password to the database
				persistMemberChange({ _id, password: bcrypt.hashSync(member.password) })
					.then(resolve)
					.catch(reject);
			}
		})
		.catch(reject);
});

// Assure a member's credentials
const authorizeMember = (_id) => Member.findOne({ _id });

// Before accepting a new member application, ensure that the person is not already known.
const duplicateCheck = (member) => new Promise((resolve, reject) => {

	Member.findOne({
		firstname: { $in: new RegExp(`^${member.firstname}$`, 'i') },
		familyname: { $in: new RegExp(`^${member.familyname}$`, 'i') },
		emailaddress: { $in: new RegExp(`^${member.emailaddress}$`, 'i') },
		postcode: { $in: new RegExp(`^${member.postcode}$`, 'i') }
	})
		.then(member => {
			if (_.isEmpty(member)) {
				// Not a duplicate
				resolve(null);
			}
			else {
				reject(new Error('Our records show that you have already applied or that you are already a member.  ' +
					'If you are already a member, please Login and renew your membership.  ' +
					'Please contact the TTC webmaster if you cannot resolve the problem.'));
			}
		})
		.catch(reject);
});

const saveNewApplicant = (member) => Member(member).save();

module.exports = {
	saveNewsItem: saveNewsItem,
	getNewsItems: getNewsItems,
	removeNewsItem: removeNewsItem,
	countMembers: countMembers,
	getMembers: getMembers,
	getAllEmailAddresses: getAllEmailAddresses,
	findMember: findMember,
	persistMemberChange: persistMemberChange,
	loginMember: loginMember,
	signupMember: signupMember,
	authorizeMember: authorizeMember,
	duplicateCheck: duplicateCheck,
	saveNewApplicant: saveNewApplicant,
}
