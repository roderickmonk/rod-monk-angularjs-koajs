"use strict";

const BugzScout = require('bugzscout');
const assert = require('assert');
require('dotenv').config();

const bugzscout_InfoOnly = new BugzScout({
    user: process.env.FOGBUGZ_USER,
    project: "ttcServer",
    area: "InfoOnly",
    domain: process.env.FOGBUGZ_DOMAIN,
    email: "",
    forceNewBug: false
});

const bugzscout_Warning = new BugzScout({
    user: process.env.FOGBUGZ_USER,
    project: "ttcServer",
    area: "Warning",
    domain: process.env.FOGBUGZ_DOMAIN,
    email: "",
    forceNewBug: true
});

const bugzscout_Alarm = new BugzScout({
    user: process.env.FOGBUGZ_USER,
    project: "ttcServer",
    area: "Alarm",
    domain: process.env.FOGBUGZ_DOMAIN,
    email: "",
    forceNewBug: true
});

exports.InfoOnly = (description, extra) => {
    bugzscout_InfoOnly.submit({ description: description, extra: extra, defaultMessage: 'BugzScout InfoOnly' },
        (err, res) => {
            if (err) console.log('BugzScout InfoOnly Error: ' + err);
        });
};

exports.Warning = (description, extra) => {
    bugzscout_Warning.submit({ description: description, extra: extra, defaultMessage: 'BugzScout Warning' },
        (err, res) => {
            if (err) console.log('BugzScout Warning Error: ' + err);
        });
};

exports.Alarm = (description, extra) => {
    bugzscout_Alarm.submit({ description: description, extra: extra, defaultMessage: 'BugzScout Alarm' },
        (err, res) => {
            if (err) console.log('BugzScout Alarm Error: ' + err);
        });
};