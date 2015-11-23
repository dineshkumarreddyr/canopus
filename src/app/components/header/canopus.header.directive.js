/* DESCRIPTION :: HEADER DIRECTIVE
 * AUTHOR :: DINESH KUMAR
 * DATE :: 16-11-2015
 */

(function () {
    "use strict";

    angular
    .module('canopus')
    .directive('appHeader', canopusHeader);

    function canopusHeader() {
        return {
            restrict: 'AEC',
            templateUrl: 'app/components/header/canopus.header.tmpl.html',
            controllerAs: 'svm',
            controller: function ($appservice, $log, $state) {
                var vm = this;

                vm.username = $appservice.GetCookie('uname');

                vm.signout = function () {
                    $appservice.RemoveCookie('uname');
                    $appservice.RemoveCookie('uemail');
                    $appservice.RemoveCookie('accesstoken');

                    $state.go('login');
                }
            }
        }
    }
})();