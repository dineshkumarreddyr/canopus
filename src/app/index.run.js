(function() {
  'use strict';

  angular
    .module('canopus')
    .run(runBlock);

  /** @ngInject */
  function runBlock($log) {

    $log.debug('runBlock end');
  }

})();
