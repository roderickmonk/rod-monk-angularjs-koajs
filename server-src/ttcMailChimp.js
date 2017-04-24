var https = require('https');
var md5 = require('md5');
var Track = require('../server-src/ttcTrack');

var MailChimpHostName = 'us12.api.mailchimp.com';
var MailChimpMembersPath = 'secret';
var MailChimpAuthorization = 'secret';

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

addMember = (emailaddress, FNAME, LNAME) => {

	const subscriber = JSON.stringify({
		'email_address': emailaddress,
		'status': 'subscribed',
		'merge_fields': {
			'FNAME': FNAME,
			'LNAME': LNAME
		}
	});

	const https_options = {
		hostname: MailChimpHostName,
		path: MailChimpMembersPath,
		method: 'POST',
		headers: {
			'Authorization': MailChimpAuthorization,
			'Content-Type': 'application/json',
			'Content-Length': subscriber.length
		}
	}

	return new Promise((resolve, reject) => {

		var req = https.request(https_options, (res) => {
			readResponseBody(res)
				.then(body => {
					if (res.Status < 200 || res.Status >= 300)
						Track.InfoOnly('MailChimp API addMember', 'response.Status: ' + res.statusCode + ', response.Body: ' + body);
				});
		});

		req.on('error', (err) => {
			Track.Warning('MailChimp API addMember Warning', e.message);
		});

		req.write(subscriber);
		req.end();
		resolve(null);
	});
}

module.exports = {
	addMember: addMember
}