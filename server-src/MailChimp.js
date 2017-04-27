const https = require('https');
const md5 = require('md5');
const FogBugz = require('../server-src/FogBugz');
require('dotenv').config();
const MailChimpHostName = 'us12.api.mailchimp.com';

const readResponseBody = (response) => {
	response.setEncoding('utf8');

	return new Promise((resolve, reject) => {
		var body = "";
		response.on('readable', () => {
			var chunk = response.read();
			if (chunk) body += chunk;
		});
		response.on('end', () => {
			resolve(body);
		});
	});
}

const addMember = (emailaddress, FNAME, LNAME) => {

	const subscriber = JSON.stringify({
		'email_address': emailaddress,
		'status': 'subscribed',
		'merge_fields': {
			'FNAME': FNAME,
			'LNAME': LNAME
		}
	});

	const https_options = {
		hostname: 'us12.api.mailchimp.com',
		path: process.env.MAIL_CHIMP_MEMBERS_PATH,
		method: 'POST',
		headers: {
			'Authorization': process.env.MAIL_CHIMP_AUTHORIZATION,
			'Content-Type': 'application/json',
			'Content-Length': subscriber.length
		}
	}

	return new Promise((resolve, reject) => {

		var req = https.request(https_options, (res) => {
			readResponseBody(res)
				.then(body => {
					if (res.Status < 200 || res.Status >= 300)
						FogBugz.InfoOnly('MailChimp API addMember', 'response.Status: ' + res.statusCode + ', response.Body: ' + body);
				});
		});

		req.on('error', (err) => {
			FogBugz.Warning('MailChimp API addMember Warning', e.message);
		});

		req.write(subscriber);
		req.end();
		resolve(null);
	});
}

module.exports = {
	addMember: addMember
}