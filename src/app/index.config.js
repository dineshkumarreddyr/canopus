(function () {
    'use strict';

    angular
      .module('canopus')
      .config(config)
    .value('$appconfig', {
        apiUrl: 'http://localhost:8008/api/dashboard/v1/'
    });
    /** @ngInject */
    function config($logProvider) {
        // Enable log
        $logProvider.debugEnabled(true);
    }

})();
