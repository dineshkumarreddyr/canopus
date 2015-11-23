/* DESCRIPTION  :: Login Controller 
 * AUTHOR :: DINESH KUMAR
 * CREATED DATE :: 16-11-2015
 */

(function () {
    "use strict";

    angular
    .module('canopus')
    .controller('LoginController', loginController);

    function loginController($log, $appservice, $state) {
        var vm = this;
        vm.authenticate = function (invalid) {
            if (invalid) {
                alert('Invalid !!');
                return;
            }
            var data = {
                emailaddress: vm.emailaddress,
                password: vm.password
            };

            $appservice.Authenticate(data).then(function (response) {
                if (response) {
                    if (response.status.indexOf('success') > -1) {
                        $appservice.AddCookie('uname', response.records.firstname);
                        $appservice.AddCookie('uemail', response.records.emailaddress);
                        $appservice.AddCookie('accesstoken', response.records.accesstoken);
                        $state.go('dashboard');
                    }
                    else if (response.status.indexOf('error') > -1) {
                        switch (response.ecode) {
                            case 'e2':
                                alert('Invalid Details');
                                break;
                            case 'e3':
                                alert('API Failed!! Please try reloading');
                                break;
                        }
                    }
                }
            }, function (response) {
                $log.error('API Failed' + response);
            });
        }
    }
})();