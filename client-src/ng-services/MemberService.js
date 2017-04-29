"use strict";

angular.module('ttc').factory('MemberService', ['$http', 'UserService', ($http, UserService) => {

	const httpHeaders = () => ({ headers: { 'x-auth': UserService.getToken() } });

	return {

		getAllMembers: () => $http.get('/api/member', httpHeaders())
			.then(response => response.data),

		getAllEmailAddresses: () => $http.get('/api/member/email-addresses', httpHeaders())
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