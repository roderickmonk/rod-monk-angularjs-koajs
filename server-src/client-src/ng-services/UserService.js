"use strict";

const isLocalStorageSupported = () => {
	let testKey = 'test',
		storage = window.localStorage;
	try {
		storage.setItem(testKey, '1');
		storage.removeItem(testKey);
		return true;
	} catch (error) {
		return false;
	}
}

// UserService provides a means for the controllers to share user login status and user role
angular.module('ttc').factory('UserService', ['$cookies', '$window', function ($cookies, $window) {

	let cookieCapable = false;

	let JWT;
	let exec;

	if (cookieCapable) {
		JWT = $cookies.get('JWT');
		exec = $cookies.get('exec');
	}
	else {
		JWT = localStorage.getItem('JWT');
		exec = localStorage.getItem('exec');
	}

	return {
		loggedIn: (privileges) => {
			if (cookieCapable) {
				$cookies.put('JWT', privileges.jwt, { secure: true });
				$cookies.put('exec', privileges.exec, { secure: true });
			}
			else if (isLocalStorageSupported()) {
				localStorage.setItem('JWT', privileges.jwt);
				localStorage.setItem('exec', privileges.exec);
			}
			JWT = privileges.jwt;
			exec = privileges.exec;
		},
		loggedOut: () => {
			if (cookieCapable) {
				$cookies.remove('JWT');
				$cookies.remove('exec');
			}
			else if (isLocalStorageSupported()) {
				localStorage.setItem('JWT', '');
				localStorage.setItem('exec', '');
			}
			JWT = '';
			exec = '';
		},

		isLoggedIn: () => !!JWT,

		getToken: () => JWT,

		getExec: () => exec
	}
}]);