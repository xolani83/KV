(function(){
  'use strict'

  angular
    .module('app')
    .controller('flashCardCtrl',flashCardCtrl);

  function flashCardCtrl($http) {
    let vm = this;
    vm.nextCard = nextCard;
    vm.setTense = setTense;
    vm.tallyResult = tallyResult;
    vm.toggleOptions = toggleOptions;
    vm.toggleList = toggleList;
    vm.loadVerbs = loadVerbs;
    vm.speak =speak;
    vm.verbs = [];
    vm.card = {};
    vm.favOnly = true;
    vm.total = 0;
    vm.right = 0;
    vm.score = 0;
    vm.difficult = [];

    let speaker = new SpeechSynthesisUtterance();
    let index = 0;
    let back = "dict";
    let front = "meaning";
    let voices = [];

    setup();

    function setup(){

      loadVerbs();

      function getVoices(){
        voices = window.speechSynthesis.getVoices();

        if(voices.length < 1){
          setTimeout(getVoices, 500);
        }
      }

      function loadFirstCard(){
        if(vm.verbs.length === 0 ){
          setTimeout(loadFirstCard, 1000);
        }
        else{
          nextCard();
        }
      }

      getVoices();
      loadFirstCard();
    }

    function loadVerbs(){
      vm.favOnly ? getFavouriteVerbs() : getAllVerbs();
      if(vm.verbs.length === 0){
          setTimeout(loadVerbs, 500);
      }
    }

    function getAllVerbs(){
      $http.get('/api/verbs')
        .then((verbs)=> {
          vm.verbs = verbs.data;
        });
    }

    function getFavouriteVerbs(){
      $http.get('/api/verbs/favourites')
        .then((verbs)=> {
          vm.verbs = verbs.data;
      });
    }

    function random(){
      index = Math.floor(Math.random()*vm.verbs.length);
      getTense(vm.verbs[index]);
    }

    function addToDifficult(){
      vm.difficult.includes(vm.card.back) ? true : vm.difficult.push(vm.card.back);
    }

    function toggleOptions(){
      vm.showOptions ? vm.showOptions = false : vm.showOptions = true;
      if(vm.showList){ vm.showList = false; }
    }

    function toggleList(){
      vm.showList ? vm.showList = false : vm.showList = true;
      if(vm.showOptions){ vm.showOptions = false; }
    }

    function tallyResult(value){
      vm.total++
      value == "correct" ? vm.right++ : addToDifficult();
      vm.score = Math.floor((vm.right/vm.total)*100);
      nextCard();
    }

    function nextCard(){
      vm.showAnswer = false;
      random();
    }

    function speak(txt){
      vm.showAnswer = true;
      speaker.text = txt;
      speaker.voice = voices.find((element)=> { return element.name == "Google 한국의" || element.name == "Korean South Korea"});
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

})();
