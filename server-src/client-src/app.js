"use strict";

var app = angular.module('ttc', [
	'ngRoute',
	'ui.bootstrap',
	'ngMessages',
	'ngSanitize',
	'ngCookies',
	'cgBusy',
	'angularFileUpload',
	'pdf',
	'ngAnimate',
	'ui.bootstrap.datetimepicker'
]);

angular.module('ttc').config(['$httpProvider', $httpProvider => {

	//First clear out all out-of-the-box defaults
	if (!$httpProvider.defaults.headers.get) {
		$httpProvider.defaults.headers.get = {};
	}

	// Then define a few of our own
	$httpProvider.defaults.headers.get['Cache-Control'] = 'no-cache';
	$httpProvider.defaults.headers.get['Pragma'] = 'no-cache';

}]);

angular.module('ttc').config($cookiesProvider => {

	// Allow cookies are to be secure
	$cookiesProvider.defaults = {
		domain: 'ttc-website.herokuapp.com',
		secure: true
	};
});

angular.element(document).ready(function () {
	console.log('Starting Angular');
	angular.bootstrap(document, ['ttc']);
});


