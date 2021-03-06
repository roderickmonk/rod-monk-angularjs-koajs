"use strict";

// A trivial service from which to maintain the set of places where members reside
angular.module('ttc').factory('placesService', [function () {

	const places = [
		'Tsawwassen, BC, Canada', 'Delta, BC, Canada', 'Surrey, BC, Canada', 'Richmond, BC, Canada',
		'Vancouver, BC, Canada', 'Point Roberts, WA, USA', 'Burnaby, BC, Canada', 'New Westminster, BC, Canada'];

	return {
		get: () => places
	}
}
]);