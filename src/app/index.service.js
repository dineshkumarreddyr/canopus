/*DESCRIPTION :: API CALLING AND COMMON FUNCTIONS 
 * AUTHOR :: DINESH KUMAR
 * DATE :: 16-11-2015
 */

(function () {
    "use strict";

    angular
    .module('canopus')
    .factory('$appservice', appService);

    function appService($http, $q, $appconfig, $cookies) {
        function authenticate(data) {
            var deferred = $q.defer();

            $http.post($appconfig.apiUrl + 'open', data)
            .success(function (res) {
                deferred.resolve(res);
            })
            .error(function (res) {
                deferred.reject(res);
            });
            return deferred.promise;
        };

        function addCookie(key, value) {
            var currentDate = new Date();
            var expiry = moment(currentDate).add(1, 'hours').toDate();
            $cookies.put(key, value, { 'expires': expiry });
        };

        function getCookie(key) {
            return $cookies.get(key);
        };

        function removeCookie(key) {
            $cookies.remove(key);
        };

        function getGuestaccounts(accesstoken) {
            var deferred = $q.defer();

            $http.get($appconfig.apiUrl + 'guestaccounts', { headers: { 'accesstoken': accesstoken } })
            .success(function (res) {
                deferred.resolve(res);
            })
            .error(function (res) {
                deferred.reject(res);
            });
            return deferred.promise;
        };

        function getUserAccounts(accesstoken) {
            var deferred = $q.defer();

            $http.get($appconfig.apiUrl + 'useraccounts', { headers: { 'accesstoken': accesstoken } })
            .success(function (res) {
                deferred.resolve(res);
            })
            .error(function (res) {
                deferred.reject(res);
            });
            return deferred.promise;
        };

        function getTransactions(accesstoken) {
            var deferred = $q.defer();
            $http.get($appconfig.apiUrl + 'transactions', { headers: { 'accesstoken': accesstoken } })
            .success(function (res) {
                deferred.resolve(res);
            })
            .error(function (res) {
                deferred.reject(res);
            });
            return deferred.promise;
        };

        function getYogabookings(accesstoken) {
            var deferred = $q.defer();
            $http.get($appconfig.apiUrl + 'yogabookings', { headers: { 'accesstoken': accesstoken } })
            .success(function (res) {
                deferred.resolve(res);
            })
            .error(function (res) {
                deferred.reject(res);
            });
            return deferred.promise;
        };

        function getAstrologyBookings(accesstoken) {
            var deferred = $q.defer();
            $http.get($appconfig.apiUrl + 'astbookings', { headers: { 'accesstoken': accesstoken } })
            .success(function (res) {
                deferred.resolve(res);
            })
            .error(function (res) {
                deferred.reject(res);
            });
            return deferred.promise;
        };

        return {
            Authenticate: authenticate,
            AddCookie: addCookie,
            GetCookie: getCookie,
            RemoveCookie: removeCookie,
            GetGuestAccounts: getGuestaccounts,
            GetUserAccounts: getUserAccounts,
            GetTransactions: getTransactions,
            GetYogaBookings: getYogabookings,
            GetAstrologyBookings: getAstrologyBookings
        }
    }
})();