(function(){
  'use strict'

  angular
    .module('app')
    .controller('homeCtrl',homeCtrl);

  function homeCtrl() {
    let vm = this;
    vm.message = "test";

  }

})();
