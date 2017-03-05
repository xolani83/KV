(function(){
  'use strict'

  angular
    .module('app')
    .controller('overviewCtrl',overviewCtrl);

  function overviewCtrl($http) {
    let vm = this;
    vm.toggleFav = toggleFav;

    activate();

    function activate(){
      $http.get('/api/verbs')
        .then((verbs)=>{
          vm.verbs = verbs.data;
        });
    }

    function toggleFav(verb){
      verb.isFavourite = verb.isFavourite == true ? false : true;
      $http.put('/api/verbs/'+verb._id +'/favourite', verb);
    }

  }

})();
