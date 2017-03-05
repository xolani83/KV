(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function(){
  'use strict'

  let mainCtrl = require('./main/main.controller');

  angular
    .module('app', ['ngRoute'])
    .config(function($routeProvider){
      $routeProvider
        .when('/',{
          templateUrl : "./main/main.html"
        });
      });

})();

},{"./main/main.controller":2}],2:[function(require,module,exports){
(function(){
  'use strict'

  angular
    .module('app')
    .controller('mainCtrl',mainCtrl);

  function mainCtrl($http) {
    let vm = this;
    vm.nextCard = nextCard;
    vm.setTense = setTense;
    vm.speak =speak;
    vm.card = {};

    let speaker = new SpeechSynthesisUtterance();
    let index = 0;
    let back = "dict";
    let front = "meaning";
    let voices = [];
    setup();

    function setup(){
      $http.get('/api/verbs')
        .then((verbs)=> {
          vm.verbs = verbs.data;
        });

        function getVoices(){
          voices = window.speechSynthesis.getVoices();

          if(voices.length < 1){
            setTimeout(getVoices, 500);
          }
        }

        getVoices();
    }

    function random(){
      index = Math.floor(Math.random()*vm.verbs.length);
      //vm.card.front = vm.verbs[index][front];
      //vm.card.back = vm.verbs[index][back];
      getTense(vm.verbs[index]);
    }

    function nextCard(){
      console.log("clicked")
      vm.showAnswer = false;
      random();
    }

    function speak(txt){
      vm.showAnswer = true;
      speaker.text = txt;
      speaker.voice = voices.find((element)=> { return element.name == "Google 한국의"});
      speaker.rate = 0.9;
      window.speechSynthesis.speak(speaker);
    }

    function must(verb){
      vm.card.front = "must "+ verb.meaning.substr(2);
      vm.card.back = verb.present_base + "야 해요";
    }

    function want(verb){
      vm.card.front = "want "+ verb.meaning;
      vm.card.back = verb.stem + "고 싶어요";
    }

    function goingTo(verb){
      vm.card.front = "going "+ verb.meaning;
      vm.card.back = verb.future_base + " 거예요";
    }

    function can(verb){
      vm.card.front = "can"+ verb.meaning.substr(2);
      vm.card.back = verb.future_base + " 수 있어요";
    }

    function cant(verb){
      vm.card.front = "can't"+ verb.meaning.substr(2);
      vm.card.back = verb.future_base + " 수 없어요";
    }

    function defaultCard(verb){
      vm.card.front = verb.meaning;
      vm.card.back = verb.dict;
    }

    function setTense(value){
      switch(value){
        case "want":
          vm.isWant = true;
          vm.isGoingTo = false;
          vm.isCan = false;
          vm.isCant = false;
          vm.isMust = false;
          break;
        case "goingTo":
          vm.isWant = false;
          vm.isGoingTo = true;
          vm.isCan = false;
          vm.isCant = false;
          vm.isMust = false;
          break;
        case "can":
          vm.isWant = false;
          vm.isGoingTo = false;
          vm.isCan = true;
          vm.isCant = false;
          vm.isMust = false;
          break;
        case "cant":
          vm.isWant = false;
          vm.isGoingTo = false;
          vm.isCan = false;
          vm.isCant = true;
          vm.isMust = false;
          break;
        case "must":
          vm.isWant = false;
          vm.isGoingTo = false;
          vm.isCan = false;
          vm.isCant = false;
          vm.isMust = true;
          break;
      }
    }

    function getTense(verb){
      if(vm.isWant){ want(verb);}
      else if(vm.isGoingTo){ goingTo(verb);}
      else if(vm.isCan){ can(verb);}
      else if(vm.isCant){ cant(verb);}
      else if(vm.isMust){ must(verb);}
      else{ defaultCard(verb);}
    }
  }

  //module.exports = mainCtrl;
})();

},{}]},{},[1]);
