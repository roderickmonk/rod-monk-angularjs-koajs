angular.module('ttc').directive('dsEmailaddress', () => {
    return {
        restrict: 'E',
        scope: false,
        templateUrl: '/client-build/ng-templates/ds-emailaddress.html',
        link: function ($scope, element, attrs) { }
    }
});

angular.module('ttc').directive('dsConfirmEmailaddress', () => {
    return {
        restrict: 'E',
        scope: false,
        templateUrl: '/client-build/ng-templates/ds-confirmemailaddress.html',
        link: function ($scope, element, attrs) { }
    }
});

angular.module('ttc').directive('dsPassword', () => {
    return {
        restrict: 'E',
        scope: false,
        templateUrl: '/client-build/ng-templates/ds-password.html',
        link: function ($scope, element, attrs) { }
    }
});

angular.module('ttc').directive('dsConfirmpassword', () => {
    return {
        restrict: 'E',
        scope: false,
        templateUrl: '/client-build/ng-templates/ds-confirmpassword.html',
        link: function ($scope, element, attrs) { }
    }
});

angular.module('ttc').directive('dsFirstname', () => {
    return {
        restrict: 'E',
        scope: false,
        templateUrl: '/client-build/ng-templates/ds-firstname.html',
        link: function ($scope, element, attrs) { }
    }
});

angular.module('ttc').directive('dsFamilyname', () => {
    return {
        restrict: 'E',
        scope: false,
        templateUrl: '/client-build/ng-templates/ds-familyname.html',
        link: function ($scope, element, attrs) { }
    }
});

angular.module('ttc').directive('dsFamilyemailaddress', () => {
    return {
        restrict: 'E',
        scope: false,
        templateUrl: '/client-build/ng-templates/ds-familyemailaddress.html',
        link: function ($scope, element, attrs) { }
    }
});

angular.module('ttc').directive('dateField', function ($filter) {
    return {
        restrict: 'A',
        require: 'ngModel',
        link: function (scope, element, attrs, ngModelController) {
            ngModelController.$parsers.push(function (data) {
                //View -> Model
                console.log('View -> Model: ', data);
                var date = moment(data, 'YYYY-MM-DD', true);

                ngModelController.$setValidity('date', date.isValid());
                return date.isValid() ? date.toDate() : undefined;
            });
            ngModelController.$formatters.push(function (data) {
                //Model -> View
                return $filter('date')(data, "yyyy-MM-dd");
            });
        }
    }
});

angular.module('ttc').directive('ttcFamilyEmailaddressAttr', function ($filter) {
    return {
        restrict: 'A',
        require: 'ngModel',
        link: function (scope, element, attrs, ngModelController) {
            if (_.isUndefined(scope.familyemailaddress))
                scope.familyemailaddress = '';

            ngModelController.$parsers.push(function (data) {

                console.log(data);
                console.log('allemailaddresses.length: ', scope.allemailaddresses.length);

                if (!data) {
                    // It's Ok not to set a familyemailaddress at all
                    ngModelController.$setValidity('familyemailaddress', true);
                    ngModelController.$setValidity('email', true);
                }
                else {// We have data, but is it any good
                    var familyemailaddressKnown = scope.allemailaddresses.indexOf(data) >= 0;
                    ngModelController.$setValidity('familyemailaddress', familyemailaddressKnown);
                    ngModelController.$setValidity('email', familyemailaddressKnown);
                    console.log('familyemailaddressKnown: ', familyemailaddressKnown);
                }
            });
            ngModelController.$formatters.push((data) => {
                //Model -> View
                console.log('ngModelController.$formatters.push: ', data);
                if (scope.allemailaddresses.indexOf(data) >= 0)
                    return data;
                else
                    return null;
            });
        }
    }
});

angular.module('ttc').directive('dsAddress', () => {
    return {
        restrict: 'E',
        scope: false,
        templateUrl: '/client-build/ng-templates/ds-address.html',
        link: ($scope, element, attrs) => { }
    }
});

angular.module('ttc').directive('dsPlace', () => {
    return {
        restrict: 'E',
        scope: false,
        templateUrl: '/client-build/ng-templates/ds-place.html',
        link: function ($scope, element, attrs) { }
    }
});

angular.module('ttc').directive('dsPostcode', () => {
    return {
        restrict: 'E',
        scope: false,
        templateUrl: '/client-build/ng-templates/ds-postcode.html',
        link: function ($scope, element, attrs) { }
    }
});

angular.module('ttc').directive('dsPrimaryphone', () => {
    return {
        restrict: 'E',
        scope: false,
        templateUrl: '/client-build/ng-templates/ds-primaryphone.html',
        link: function ($scope, element, attrs) { }
    }
});

angular.module('ttc').directive('dsAlternativephone', () => {
    return {
        restrict: 'E',
        scope: false,
        templateUrl: '/client-build/ng-templates/ds-alternativephone.html',
        link: function ($scope, element, attrs) { }
    }
});

angular.module('ttc').directive('dsDob', () => {
    return {
        restrict: 'E',
        scope: false,
        templateUrl: '/client-build/ng-templates/ds-dob.html',
        link: function ($scope, element, attrs) { }
    }
});

angular.module('ttc').directive('dsLiabilityagreed', () => {
    return {
        restrict: 'E',
        scope: false,
        templateUrl: '/client-build/ng-templates/ds-liabilityagreed.html',
        link: function ($scope, element, attrs) { }
    }
});

angular.module('ttc').directive('dsCommunicationsagreed', () => {
    return {
        restrict: 'E',
        scope: false,
        templateUrl: '/client-build/ng-templates/ds-communicationsagreed.html',
        link: function ($scope, element, attrs) { }
    }
});

angular.module('ttc').directive('dsPhotoagreed', () => {
    return {
        restrict: 'E',
        scope: false,
        templateUrl: '/client-build/ng-templates/ds-photoagreed.html',
        link: function ($scope, element, attrs) { }
    }
});

angular.module('ttc').directive('dsStudent', () => {
    return {
        restrict: 'E',
        scope: false,
        templateUrl: '/client-build/ng-templates/ds-student.html',
        link: function ($scope, element, attrs) { }
    }
});

angular.module('ttc').directive('dsVolunteerMaintenance', () => {
    return {
        restrict: 'E',
        scope: false,
        templateUrl: '/client-build/ng-templates/ds-volunteer-maintenance.html',
        link: function ($scope, element, attrs) { }
    }
});

angular.module('ttc').directive('dsVolunteerBookkeeping', () => {
    return {
        restrict: 'E',
        scope: false,
        templateUrl: '/client-build/ng-templates/ds-volunteer-bookkeeping.html',
        link: function ($scope, element, attrs) { }
    }
});

angular.module('ttc').directive('dsVolunteerGardening', () => {
    return {
        restrict: 'E',
        scope: false,
        templateUrl: '/client-build/ng-templates/ds-volunteer-gardening.html',
        link: function ($scope, element, attrs) { }
    }
});

angular.module('ttc').directive('dsVolunteerArchivist', () => {
    return {
        restrict: 'E',
        scope: false,
        templateUrl: '/client-build/ng-templates/ds-volunteer-archivist.html',
        link: function ($scope, element, attrs) { }
    }
});

angular.module('ttc').directive('dsVolunteerOrganizeclubsocial', () => {
    return {
        restrict: 'E',
        scope: false,
        templateUrl: '/client-build/ng-templates/ds-volunteer-organizeclubsocial.html',
        link: function ($scope, element, attrs) { }
    }
});

angular.module('ttc').directive('dsVolunteerPhonecommittee', () => {
    return {
        restrict: 'E',
        scope: false,
        templateUrl: '/client-build/ng-templates/ds-volunteer-phonecommittee.html',
        link: function ($scope, element, attrs) { }
    }
});

angular.module('ttc').directive('dsVolunteerWebprogramming', () => {
    return {
        restrict: 'E',
        scope: false,
        templateUrl: '/client-build/ng-templates/ds-volunteer-webprogramming.html',
        link: function ($scope, element, attrs) { }
    }
});

angular.module('ttc').directive('dsVolunteerTeamcaptain', () => {
    return {
        restrict: 'E',
        scope: false,
        templateUrl: '/client-build/ng-templates/ds-volunteer-teamcaptain.html',
        link: function ($scope, element, attrs) { }
    }
});

angular.module('ttc').directive('dsVolunteerMembershipdrives', () => {
    return {
        restrict: 'E',
        scope: false,
        templateUrl: '/client-build/ng-templates/ds-volunteer-membershipdrives.html',
        link: function ($scope, element, attrs) { }
    }
});

angular.module('ttc').directive('dsVolunteerMediacoordinator', () => {
    return {
        restrict: 'E',
        scope: false,
        templateUrl: '/client-build/ng-templates/ds-volunteer-mediacoordinator.html',
        link: function ($scope, element, attrs) { }
    }
});

angular.module('ttc').directive('dsVolunteerSupportplayerimprovementjunior', () => {
    return {
        restrict: 'E',
        scope: false,
        templateUrl: '/client-build/ng-templates/ds-volunteer-supportplayerimprovementjunior.html',
        link: function ($scope, element, attrs) { }
    }
});

angular.module('ttc').directive('dsVolunteerSupportplayerimprovementadult', () => {
    return {
        restrict: 'E',
        scope: false,
        templateUrl: '/client-build/ng-templates/ds-volunteer-supportplayerimprovementadult.html',
        link: function ($scope, element, attrs) { }
    }
});

angular.module('ttc').directive('dsVolunteerSupportsocialevents', () => {
    return {
        restrict: 'E',
        scope: false,
        templateUrl: '/client-build/ng-templates/ds-volunteer-supportsocialevents.html',
        link: function ($scope, element, attrs) { }
    }
});

angular.module('ttc').directive('dsExecPresident', () => {
    return {
        restrict: 'E',
        scope: false,
        templateUrl: '/client-build/ng-templates/ds-exec-president.html',
        link: function ($scope, element, attrs) { }
    }
});

angular.module('ttc').directive('dsExecVicepresident', () => {
    return {
        restrict: 'E',
        scope: false,
        templateUrl: '/client-build/ng-templates/ds-exec-vicepresident.html',
        link: function ($scope, element, attrs) { }
    }
});

angular.module('ttc').directive('dsExecSecretary', () => {
    return {
        restrict: 'E',
        scope: false,
        templateUrl: '/client-build/ng-templates/ds-exec-secretary.html',
        link: function ($scope, element, attrs) { }
    }
});

angular.module('ttc').directive('dsExecTreasurer', () => {
    return {
        restrict: 'E',
        scope: false,
        templateUrl: '/client-build/ng-templates/ds-exec-treasurer.html',
        link: function ($scope, element, attrs) { }
    }
});

angular.module('ttc').directive('dsExecMaintenance', () => {
    return {
        restrict: 'E',
        scope: false,
        templateUrl: '/client-build/ng-templates/ds-exec-maintenance.html',
        link: function ($scope, element, attrs) { }
    }
});

angular.module('ttc').directive('dsExecSocialdirector', () => {
    return {
        restrict: 'E',
        scope: false,
        templateUrl: '/client-build/ng-templates/ds-exec-socialdirector.html',
        link: function ($scope, element, attrs) { }
    }
});

angular.module('ttc').directive('dsExecMembershipdirector', () => {
    return {
        restrict: 'E',
        scope: false,
        templateUrl: '/client-build/ng-templates/ds-exec-membershipdirector.html',
        link: function ($scope, element, attrs) { }
    }
});

angular.module('ttc').directive('dsExecMensleague', () => {
    return {
        restrict: 'E',
        scope: false,
        templateUrl: '/client-build/ng-templates/ds-exec-mensleague.html',
        link: function ($scope, element, attrs) { }
    }
});

angular.module('ttc').directive('dsExecWomensleague', () => {
    return {
        restrict: 'E',
        scope: false,
        templateUrl: '/client-build/ng-templates/ds-exec-womensleague.html',
        link: function ($scope, element, attrs) { }
    }
});

angular.module('ttc').directive('dsExecJuniorprogramcoordinator', () => {
    return {
        restrict: 'E',
        scope: false,
        templateUrl: '/client-build/ng-templates/ds-exec-juniorprogramcoordinator.html',
        link: function ($scope, element, attrs) { }
    }
});

angular.module('ttc').directive('dsExecWebmaster', () => {
    return {
        restrict: 'E',
        scope: false,
        templateUrl: '/client-build/ng-templates/ds-exec-webmaster.html',
        link: function ($scope, element, attrs) { }
    }
});

angular.module('ttc').directive('dsExecNewsletter', () => {
    return {
        restrict: 'E',
        scope: false,
        templateUrl: '/client-build/ng-templates/ds-exec-newsletter.html',
        link: function ($scope, element, attrs) { }
    }
});

angular.module('ttc').directive('dsExecTournamentdirector', () => {
    return {
        restrict: 'E',
        scope: false,
        templateUrl: '/client-build/ng-templates/ds-exec-tournamentdirector.html',
        link: function ($scope, element, attrs) { }
    }
});

angular.module('ttc').directive('dsPersonalProfile', () => {
    return {
        restrict: 'E',
        scope: false,
        templateUrl: '/client-build/ng-templates/ds-personal-profile.html',
        link: function ($scope, element, attrs) { }
    }
});

angular.module('ttc').directive('dsJoiningYear', () => {
    return {
        restrict: 'E',
        scope: false,
        templateUrl: '/client-build/ng-templates/ds-joining-year.html',
        link: function ($scope, element, attrs) { }
    }
});