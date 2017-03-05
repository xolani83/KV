(function(){
  'use strict'

  //let mainCtrl = require('./main/main.controller');

  angular
    .module('app', ['ngRoute'])
    .config(function($routeProvider){
      $routeProvider
        .when('/',{
          templateUrl: "./home/home.html"
        })
        .when('/overview/',{
          templateUrl : "./overview/overview.html"
        })
        .when('/session/',{
          templateUrl : "./flashCards/flashCards.html"
        });
      });
})();
