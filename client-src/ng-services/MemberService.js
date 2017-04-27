"use strict";

const util = require ('../assets/js/util.js');

angular.module('ttc').factory('MemberService', ['$http', 'UserService',	function ($http, UserService) {

		function httpHeaders() {
			return {
				headers: {
					'x-auth': UserService.getToken(),
				}
			};
		}

		return {

			getAllMembers: () => 

				$http.get('/api/member', httpHeaders())
					.then(result => {
						let data = result.data;
						// Do some cleaning
						for (let i = 0; i < data.length; ++i) {
							data[i].firstname = _.capitalize(data[i].firstname);
							data[i].familyname = _.capitalize(data[i].familyname);
							data[i].primaryphone = util.normalizePhoneNumber(data[i].primaryphone);
							data[i].alternativephone = util.normalizePhoneNumber(data[i].alternativephone);
						}
						return data;
					}),

			getAllEmailAddresses: () => $http.get('/api/member/email-addresses', null, httpHeaders())
				.then(response => response.data),

			loginMember: (existingPassword, member) => $http.post(existingPassword ? '/api/member/login' : '/api/member/signup', member)
				.then(response => response.data),

			getMember: () => $http.get(`/api/member/${UserService.getToken()}`, httpHeaders())
				.then(response => response.data),

			saveMember: (member) => $http.put(`/api/member/${UserService.getToken()}`, member, httpHeaders()),

			saveNewMember: (member) => $http.post('/api/member/', member),

			changePassword: (member) => $http.put(`/api/member/${UserService.getToken()}/change-password`, member, httpHeaders())
				.then(response => response.data),

			countMembers: () => $http.get('/api/member/count')
				.then(response => response.data)
		}
	}
]);