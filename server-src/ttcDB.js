"use strict";

var mongoose = require("mongoose");
var bcrypt = require('bcrypt-nodejs');
var jwt = require('jwt-simple');
var Track = require('../server-src/ttcTrack');
const ApiError = require('./api-error');
var moment = require('moment');
var _ = require('lodash');
var assert = require('http-assert');
require('mongoose').Promise = global.Promise;

mongoose.connect('mongodb://127.0.0.1:5432');

// Setup the Mongoose models
var MemberSchema = new mongoose.Schema({
	emailaddress: {
		type: String,
		lowercase: true
	},
	password: String,
	firstname: String,
	low_firstname: {
		type: String,
		lowercase: true
	},
	familyname: String,
	low_familyname: {
		type: String,
		lowercase: true
	},
	student: Boolean,
	familyemailaddress: {
		type: String,
		lowercase: true
	},
	dob: String,
	address: String,
	place: String,
	postcode: String,
	primaryphone: String,
	alternativephone: String,
	liabilityagreed: Boolean,
	communicationsagreed: Boolean,
	photoagreed: Boolean,
	paid: Boolean,
	joiningyear: Number,
	exec: {
		type: String,
		lowercase: true
	},
	volunteer_maintenance: Boolean,
	volunteer_bookkeeping: Boolean,
	volunteer_gardening: Boolean,
	volunteer_archivist: Boolean,
	volunteer_organizeclubsocial: Boolean,
	volunteer_supportsocialevents: Boolean,
	volunteer_phonecommittee: Boolean,
	volunteer_webprogramming: Boolean,
	volunteer_teamcaptain: Boolean,
	volunteer_membershipdrives: Boolean,
	volunteer_mediacoordinator: Boolean,
	volunteer_supportplayerimprovementjunior: Boolean,
	volunteer_supportplayerimprovementadult: Boolean,
	exec_president: Boolean,
	exec_vicepresident: Boolean,
	exec_secretary: Boolean,
	exec_treasurer: Boolean,
	exec_maintenance: Boolean,
	exec_socialdirector: Boolean,
	exec_membershipdirector: Boolean,
	exec_mensleague: Boolean,
	exec_womensleague: Boolean,
	exec_juniorprogramcoordinator: Boolean,
	exec_webmaster: Boolean,
	exec_newsletter: Boolean,
	exec_tournamentdirector: Boolean
});
var Member = mongoose.model('members', MemberSchema);

var NewsItemSchema = new mongoose.Schema({
	headline: String,
	body: String,
	uploadTimestamp: Date
});
var NewsItem = mongoose.model('newsitem', NewsItemSchema);

// Constants
var MONGOOSE_UPDATE_OPTIONS = {
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

const getMembers = () => Member.find();

const getAllEmailAddresses = () =>

	new Promise((resolve, reject) =>
		Member.find()
			.then(members => {
				let emailaddresses = [];
				for (let i = 0; i < members.length; ++i)
					emailaddresses.push(members[i].emailaddress);
				resolve(emailaddresses);
			})
			.catch(reject));

const findMember = (_id) => Member.findOne({ _id });

// Make persistant changes to a member's information
const persistMemberChange = (member) =>

	new Promise((resolve, reject) => {

		if (member.firstname)
			member.low_firstname = member.firstname.toLowerCase();
		if (member.familyname)
			member.low_familyname = member.familyname.toLowerCase();

		if (member.dob)
			member.dob = member.dob.slice(0, 10);

		Member.findByIdAndUpdate(member._id, member, MONGOOSE_UPDATE_OPTIONS)
			.then(resolve)
			.catch(reject);
	});


const loginMember = (login) =>

	new Promise((resolve, reject) => {

		Member.findOne({ low_firstname: login.firstname.toLowerCase(), emailaddress: login.emailaddress })
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
		low_firstname: member.firstname.toLowerCase(),
		low_familyname: member.familyname.toLowerCase(),
		emailaddress: member.emailaddress.toLowerCase(),
		postcode: member.postcode,
		dob: member.dob.slice(0, 10)
	})
		.then(({ _id }) => {
			if (_.isEmpty(_id)) {
				reject(new ApiError('Unauthorized', 401));
				return;
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

	// Deal with the low case MongoDB issue.
	if (member.firstname)
		member.low_firstname = member.firstname.toLowerCase();
	if (member.familyname)
		member.low_familyname = member.familyname.toLowerCase();

	Member.find({
		emailaddress: member.emailaddress,
		postcode: member.postcode,
		low_firstname: member.low_firstname,
		low_familyname: member.low_familyname
	})
		.then(members => {
			if (members.length) {
				reject(new Error('Our records show that you have already applied or that you are already a member.  ' +
					'If you are already a member, please Login and renew your membership.  ' +
					'Please contact the TTC webmaster if you cannot resolve the problem.'));
			} else
				resolve(null);
		})
		.catch(reject);
});

const saveNewApplicant = (member) => {

	member.dob = member.dob.slice(0, 10);

	// Deal with the low case MongoDB issue.
	if (member.firstname) {
		member.low_firstname = member.firstname.toLowerCase();
	}
	if (member.familyname) {
		member.low_familyname = member.familyname.toLowerCase();
	}

	return new Promise((resolve, reject) => {

		member.paid = false;
		Member(member).save((err, returned_member) => {
			err ? reject(err) : resolve(null)
		});
	});
}

// The following function is not normally run, but is available to ensure a fresh data import
// has been normalized for the needs of the application.
const cleanDatabase = () => Member.find()
	.then(members => members.forEach(member => {

		// Ensure clean DoBs
		members.dob = moment(members.dob, ['MM-DD-YYYY', 'YYYY-MM-DD']).format('YYYY-MM-DD');
		// emails are all lowercase
		members.emailaddress = members.emailaddress.toLowerCase();
		// Canadian postal codes are normalized
		members.postcode = members.postcode.replace(' ', '');

		Member.findByIdAndUpdate(members[i]._id, members, MONGOOSE_UPDATE_OPTIONS);
	}));

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
