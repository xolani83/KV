(function(){
  'use strict'

  angular
    .module("app",[])
    .controller("main", main);

    function main(){
      let vm = this;
      vm.message = "Working";
    }
})();
