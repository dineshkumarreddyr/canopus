/* DESCRIPTION  :: Login Controller 
 * AUTHOR :: DINESH KUMAR
 * CREATED DATE :: 16-11-2015
 */

(function () {
    'use strict';

    angular
      .module('canopus')
      .controller('MainController', MainController);

    /** @ngInject */
    function MainController($timeout, $appservice, $log, $state, $chartsvc) {
        var vm = this;

        function activate() {
            verifyCookies();
        };
        activate();

        function init() {
            this.GuestAccouts = function () {
                $appservice.GetGuestAccounts($appservice.GetCookie('accesstoken')).then(function (response) {
                    if (response != undefined && response.status != undefined && response.status.indexOf("success") > -1) {
                        vm.guestaccounts = response.records;
                    }
                }, function (response) {
                    $log.error(response);
                });
            };
            this.UserAccounts = function () {
                $appservice.GetUserAccounts($appservice.GetCookie('accesstoken')).then(function (response) {
                    if (response != undefined && response.status != undefined && response.status.indexOf("success") > -1) {
                        vm.useraccounts = response.records;
                    }
                }, function (response) {
                    $log.error(response);
                });
            };
            this.Transactions = function () {
                $appservice.GetTransactions($appservice.GetCookie('accesstoken')).then(function (response) {
                    if (response != undefined && response.status != undefined && response.status.indexOf("success") > -1) {
                        vm.transactions = response.records;

                        TransactionChart();
                    }
                }, function (response) {
                    $log.error(response);
                });
            };
            this.YogaBookings = function () {
                $appservice.GetYogaBookings($appservice.GetCookie('accesstoken')).then(function (response) {
                    if (response != undefined && response.status != undefined && response.status.indexOf("success") > -1) {
                        vm.yogabookings = response.records;
                    }
                }, function (response) {
                    $log.error(response);
                });
            };
            this.AstrologyBookings = function () {
                $appservice.GetAstrologyBookings($appservice.GetCookie('accesstoken')).then(function (response) {
                    if (response != undefined && response.status != undefined && response.status.indexOf("success") > -1) {
                        vm.astrologybookings = response.records;
                    }
                }, function (response) {
                    $log.error(response);
                });
            };
        }
        (new init()).GuestAccouts();
        (new init()).UserAccounts();
        (new init()).Transactions();
        (new init()).YogaBookings();
        (new init()).AstrologyBookings();

        function verifyCookies() {
            if ($appservice.GetCookie('accesstoken') == undefined || $appservice.GetCookie('accesstoken') == null || $appservice.GetCookie('uemail') == undefined || $appservice.GetCookie('uemail') == null) {
                alert('Invalid session !!');
                $state.go('login');
            }
        };

        //Transaction Weekly Chart
        vm.thisWeek = moment().startOf('isoweek').format('D,MMM YYYY') + " - " + moment().endOf('isoweek').format('D,MMM YYYY');

        function TransactionChart() {
            if (angular.element('#tchart')) {
                var tsChart = angular.element('#tchart')[0].getContext('2d');

                if (vm.transactions) {
                    vm.weekRevenue = 0;
                    var data = [0, 0, 0, 0, 0, 0, 0];
                    var rangeData = _.filter(vm.transactions, function (v) {
                        return (moment(v.createddate) <= moment().startOf('isoweek'));// && (moment(v.createddate) <= moment().endOf('isoweek'));
                    });
                    //TOTAL PRODUCTS SOLD
                    vm.totalProducts = rangeData.length;
                    //CHART DATA
                    if (rangeData && rangeData.length > 0) {
                        _.each(rangeData, function (v, i) {
                            switch (moment(v.createddate).day()) {
                                case 0:
                                    data[6] += 1;
                                    break;
                                case 1:
                                    data[0] += 1;
                                    break;
                                case 2:
                                    data[1] += 1;
                                    break;
                                case 3:
                                    data[2] += 1;
                                    break;
                                case 4:
                                    data[3] += 1;
                                    break;
                                case 5:
                                    data[4] += 1;
                                    break;
                                case 6:
                                    data[5] += 1;
                                    break;
                            }

                            //WeekRevenue
                            vm.weekRevenue += v.price;
                        });
                    }

                    if (data) {
                        $chartsvc.TransactionChart(tsChart, data);
                    }
                }
            }
        }

    }
})();
