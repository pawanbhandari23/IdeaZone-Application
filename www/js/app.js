// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js

// angular.module('Authentication', ['ionic','ionic-material','ionMdInput', 'ionic.contrib.ui.cards']);
angular.module('starter', ['ionic', 'ionic-material','starter.controllers','ngCookies','ionMdInput','ionic.contrib.ui.cards'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})


.config(function($stateProvider, $urlRouterProvider) {

  //noinspection JSAnnotator
  $stateProvider

    .state('login', {
      url: '/login',
      views: {
        '': {
          cache: false,
          templateUrl: 'templates/login.html',
          controller:'LoginController'
        }
      }
    })

    .state('app', {
      url: '/app',
      views: {
        '': { templateUrl: 'templates/menu.html'},
        'menuContent@app': { templateUrl: 'templates/exploreIdeas.html'},
        controller:'AppCtrl'
      }
    })

    .state('app.exploreIdeas', {
      url: '/exploreIdeas',
      views: {
        'menuContent': {
          templateUrl: 'templates/exploreIdeas.html',
          controller:'CardsCtrl'
        }
      }
    })

    .state('app.myIdeas', {
      url: '/myIdeas',
      views: {
        'menuContent': {
          templateUrl: 'templates/myIdeas.html',
          controller: 'myIdeasCtrl'
        }
      }
    })

    .state('app.one', {
      url: '/myIdeas/:id',
      views: {
        'menuContent': {
          templateUrl: 'templates/detail.html',
          controller: 'myOneIdeaCtrl'
        }
      }
    })

    .state('app.terms', {
      url: '/terms',
      views: {
        'menuContent': {
          templateUrl: 'templates/terms.html'
        }
      }
    })

  .state('app.help', {
      url: '/help',
      views: {
        'menuContent': {
          templateUrl: 'templates/help.html'
        }
      }
    });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/login');
})

  .run(['$rootScope', '$location', '$cookieStore', '$http', '$ionicHistory',
    function ($rootScope, $location, $cookieStore, $http, $ionicHistory) {
      // keep user logged in after page refresh
      $rootScope.globals = $cookieStore.get('globals') || {};
      if ($rootScope.globals.currentUser) {
        $http.defaults.headers.common['Authorization'] = 'Basic ' + $rootScope.globals.currentUser.authdata; // jshint ignore:line
      }

      $rootScope.$on('$locationChangeStart', function (event, next, current) {
        // redirect to login page if not logged in
        if ($location.path() !== '/login' && !$rootScope.globals.currentUser) {
          $location.path('/login');
        }
      });

      //For disable cache after logout
      $rootScope.$on('$ionicView.enter', function() {
        $ionicHistory.clearCache()
      });

      //added for active nav
      // var path = function() { return $location.path();};
      // $rootScope.$watch(path, function(newVal, oldVal){
      //   $rootScope.activetab = newVal;
      // });


    }]);

