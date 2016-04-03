angular.module('starter.controllers', [])

  .controller('AppCtrl', function($scope, $stateParams) {
  })

  .controller('myIdeasCtrl', function($scope, IdeaService) {
    $scope.myIdeasList=IdeaService.getMy();
  })

  .controller('myOneIdeaCtrl', function($scope, IdeaService, $stateParams) {
    var singleIdea = $stateParams.id;
    $scope.idea = IdeaService.getOne(singleIdea);
  })

  // .controller('myOneIdeaCtrl', function($scope, $state) {
  //   $scope.idea = $state.params.id;
  // })

  .controller('CardsCtrl', function($scope, $ionicSwipeCardDelegate) {
    var cardTypes = [
      { title: 'Idea 1', image: 'http://lorempixel.com/image_output/technics-q-c-640-480-3.jpg' },
      { title: 'Idea 2', image: 'http://ionicframework.com.s3.amazonaws.com/demos/ionic-contrib-swipecards/pic.png' },
      { title: 'Idea 3', image: 'http://ionicframework.com.s3.amazonaws.com/demos/ionic-contrib-swipecards/pic2.png' },
      { title: 'Idea 4', image: 'http://ionicframework.com.s3.amazonaws.com/demos/ionic-contrib-swipecards/pic3.png' },
      { title: 'Idea 5', image: 'http://ionicframework.com.s3.amazonaws.com/demos/ionic-contrib-swipecards/pic4.png' }];

    $scope.cards = Array.prototype.slice.call(cardTypes, 0, 0);

    $scope.cardSwiped = function(index) {
      $scope.addCard();
    };

    $scope.cardDestroyed = function(index) {
      $scope.cards.splice(index, 1);
    };

    $scope.addCard = function() {
      var newCard = cardTypes[Math.floor(Math.random() * cardTypes.length)];
      newCard.id = Math.random();
      $scope.cards.push(angular.extend({}, newCard));
    }
  })

  .controller('CardCtrl', function($scope, $ionicSwipeCardDelegate) {
    $scope.goAway = function() {
      var card = $ionicSwipeCardDelegate.getSwipeableCard($scope);
      card.swipe();
    };
  })

  .controller('LoginController',
    ['$scope', '$rootScope', '$location', 'AuthenticationService','ionicMaterialInk', 'ionicMaterialMotion',
      function ($scope, $rootScope, $location, AuthenticationService,ionicMaterialInk, ionicMaterialMotion) {
        //ink effects
        // Set Motion
        // ionicMaterialMotion.ripple();
        // Set Ink
        ionicMaterialInk.displayEffect();

        // reset login status
        AuthenticationService.ClearCredentials();

        $scope.login = function () {
          $scope.dataLoading = true;
          AuthenticationService.Login($scope.username, $scope.password, function (response) {
            if (response.success) {
              AuthenticationService.SetCredentials($scope.username, $scope.password);
              $location.path('/app');
            } else {
              $scope.error = response.message;
              $scope.dataLoading = false;
            }
          });
        };

      }]);
