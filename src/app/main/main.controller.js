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
            addGridOptions();
        };
        activate();

        function addGridOptions() {
            //Grid Options
            /* PRODUCTS GRID */
            vm.productgridOptions = {
                enableSorting: true,
                enableFiltering: true,
                enableColumnResizing: true,
                onRegisterApi: function (gridApi) {
                    vm.gridApi = gridApi;
                },
                columnDefs: [
                    { name: 'transactionId', minWidth: 130, width: 180, field: 'txid', enableColumnResizing: true, enablePinning: true },
                    { name: 'product', field: 'pname', minWidth: 130, width: 180 },
                    { name: 'organizationName', field: 'orgname', minWidth: 150, width: 200 },
                    {
                        name: 'customer', cellTemplate: '<div data-ng-if=row.entity.guest=="true" class="ui-grid-cell-contents">{{row.entity.gname}}</div>' +
                          '<div data-ng-if=row.entity.guest=="false" class="ui-grid-cell-contents">{{row.entity.uname}}</div>', minWidth: 130, width: 180
                    },
                    { name: 'paymentStatus', field: 'paymentstatus' },
                    { name: 'bookDate', field: 'bookingdate' },
                    { name: 'bookSession', field: 'bookingsession', enableFiltering: false },
                ],
                expandableRowTemplate: 'app/main/productexpand.html',
                expandableRowHeight: 300
            }

            //Astrology Bookings
            vm.astrobookingsOptions = {
                enableSorting: true,
                enableFiltering: true,
                enableColumnResizing: true,
                onRegisterApi: function (gridApi) {
                    vm.agridApi = gridApi;
                },
                columnDefs: [
                    { name: 'customerName', field: 'name', enablePinning: true, width: 180 },
                    { name: 'customerEmail', field: 'emailaddress', width: 180 },
                    { name: 'customerNumber', field: 'number', width: 180 },
                    { name: 'bookedOn', cellTemplate: '<div class="ui-grid-cell-contents">{{row.entity.createddate | date:"dd-MMM-yyyy hh:mm:ss"}}</div>', width: 180 },
                    { name: 'astrologer', field: 'orgname', width: 180 },
                    { name: 'astrologerEmail', field: 'email', width: 180 },
                    { name: 'astrologerNumber(P)', field: 'privatenumber', width: 180 },
                    { name: 'astrologerNumber(Pub)', field: 'publicnumber', width: 180 },
                    {
                        name: 'astrologerAddress', cellTemplate: '<div class="ui-grid-cell-contents">' +
                          '{{row.entity.address}},{{row.entity.landmark}}</div>', width: 600
                    },
                ]
            }

            //Yoga Bookings
            vm.yogabookingsOptions = {
                enableSorting: true,
                enableFiltering: true,
                enableColumnResizing: true,
                onRegisterApi: function (gridApi) {
                    vm.ygridApi = gridApi;
                },
                columnDefs: [
                    { name: 'customerName', field: 'name', enablePinning: true, width: 180 },
                    { name: 'customerEmail', field: 'emailaddress', width: 180 },
                    { name: 'customerNumber', field: 'number', width: 180 },
                    { name: 'bookedOn', cellTemplate: '<div class="ui-grid-cell-contents">{{row.entity.createddate | date:"dd-MMM-yyyy hh:mm:ss"}}</div>', width: 180 },
                    { name: 'trainer', field: 'orgname', width: 180 },
                    { name: 'trainerEmail', field: 'email', width: 180 },
                    { name: 'trainerNumber(P)', field: 'privatenumber', width: 180 },
                    { name: 'trainerNumber(Pub)', field: 'publicnumber', width: 180 },
                    {
                        name: 'trainerAddress', cellTemplate: '<div class="ui-grid-cell-contents">' +
                          '{{row.entity.address}},{{row.entity.landmark}}</div>', width: 600
                    },
                ]
            }

            //User Accounts
            vm.useraccountsOptions = {
                enableSorting: true,
                enableFiltering: true,
                enableColumnResizing: true,
                onRegisterApi: function (gridApi) {
                    vm.ugridApi = gridApi;
                },
                columnDefs: [
                    { name: 'cosmicId', cellTemplate:'<div class="ui-grid-cell-contents">COU{{row.entity.userid}}</div>' },
                    { name: 'username', field: 'name', width: 180 },
                    { name: 'mobileNumber', field: 'number' },
                    { name: 'emailAddress', field: 'emailaddress' },
                    { name: 'dateOfBirth', field: 'dob' },
                    { name: 'timeOfBirth', field: 'tob' },
                    { name: 'placeOfBirth', field: 'pob' }
                ]
            }

            //Guest Accounts
            vm.guestaccountsOptions = {
                enableSorting: true,
                enableFiltering: true,
                enableColumnResizing: true,
                onRegisterApi: function (gridApi) {
                    vm.guestgridApi = gridApi;
                },
                columnDefs: [
                    { name: 'cosmicId', cellTemplate: '<div class="ui-grid-cell-contents">COG{{row.entity.guestid}}</div>' },
                    { name: 'username', field: 'name', width: 180 },
                    { name: 'mobileNumber', field: 'number' },
                    { name: 'emailAddress', field: 'emailaddress' },
                    { name: 'dateOfBirth', field: 'dob' },
                    { name: 'timeOfBirth', field: 'tob' },
                    { name: 'placeOfBirth', field: 'pob' }
                ]
            }

        };

        function init() {
            this.GuestAccouts = function () {
                $appservice.GetGuestAccounts($appservice.GetCookie('accesstoken')).then(function (response) {
                    if (response != undefined && response.status != undefined && response.status.indexOf("success") > -1) {
                        vm.guestaccounts = response.records;

                        vm.guestaccountsOptions.data = vm.guestaccounts;
                    }
                }, function (response) {
                    $log.error(response);
                });
            };
            this.UserAccounts = function () {
                $appservice.GetUserAccounts($appservice.GetCookie('accesstoken')).then(function (response) {
                    if (response != undefined && response.status != undefined && response.status.indexOf("success") > -1) {
                        vm.useraccounts = response.records;

                        vm.useraccountsOptions.data = vm.useraccounts;
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
                        //Adding data to product grid options
                        vm.productgridOptions.data = vm.transactions;
                    }
                }, function (response) {
                    $log.error(response);
                });
            };
            this.YogaBookings = function () {
                $appservice.GetYogaBookings($appservice.GetCookie('accesstoken')).then(function (response) {
                    if (response != undefined && response.status != undefined && response.status.indexOf("success") > -1) {
                        vm.yogabookings = response.records;

                        vm.yogabookingsOptions.data = vm.yogabookings;
                    }
                }, function (response) {
                    $log.error(response);
                });
            };
            this.AstrologyBookings = function () {
                $appservice.GetAstrologyBookings($appservice.GetCookie('accesstoken')).then(function (response) {
                    if (response != undefined && response.status != undefined && response.status.indexOf("success") > -1) {
                        vm.astrologybookings = response.records;

                        vm.astrobookingsOptions.data = vm.astrologybookings;
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
                        return (moment(v.createddate) >= moment().startOf('isoweek')) && (moment(v.createddate) <= moment().endOf('isoweek'));
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
                            vm.weekRevenue += v.amount;
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
