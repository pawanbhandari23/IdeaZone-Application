angular.module('starter')

  // Login authentication
    .factory('AuthenticationService',
      ['Base64', '$http', '$cookieStore', '$rootScope', '$timeout',
        function (Base64, $http, $cookieStore, $rootScope, $timeout) {
          var service = {};

          service.Login = function (username, password, callback) {
            console.log(password);

            // Dummy authentication
            $timeout(function () {
              var response = { success: username === 'test' && password === 'test' };
              if (!response.success) {
                response.message = 'Username or password is incorrect';
              }
              console.log(response.success);
              callback(response);
            }, 1000);


            /* Real authentication
             ----------------------------------------------*/

            // $http.post('/backend/index.php', { username: username, password: password })
            //     .success(function (response) {
            //         var response = { success: response.status === 'true' };
            //         console.log(response.success);
            //         if (!response.success) {
            //             response.message = 'Invalid input';
            //         }
            //         callback(response);
            //     });

          };

          service.SetCredentials = function (username, password) {
            var authdata = Base64.encode(username + ':' + password);

            $rootScope.globals = {
              currentUser: {
                username: username,
                authdata: authdata
              }
            };

            $http.defaults.headers.common['Authorization'] = 'Basic ' + authdata; // jshint ignore:line
            $cookieStore.put('globals', $rootScope.globals);
          };

          service.ClearCredentials = function () {
            $rootScope.globals = {};
            $cookieStore.remove('globals');
            $http.defaults.headers.common.Authorization = 'Basic ';
          };

          return service;
        }])

    .factory('Base64', function () {
      /* jshint ignore:start */

      var keyStr = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';

      return {
        encode: function (input) {
          var output = "";
          var chr1, chr2, chr3 = "";
          var enc1, enc2, enc3, enc4 = "";
          var i = 0;

          do {
            chr1 = input.charCodeAt(i++);
            chr2 = input.charCodeAt(i++);
            chr3 = input.charCodeAt(i++);

            enc1 = chr1 >> 2;
            enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
            enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
            enc4 = chr3 & 63;

            if (isNaN(chr2)) {
              enc3 = enc4 = 64;
            } else if (isNaN(chr3)) {
              enc4 = 64;
            }

            output = output +
              keyStr.charAt(enc1) +
              keyStr.charAt(enc2) +
              keyStr.charAt(enc3) +
              keyStr.charAt(enc4);
            chr1 = chr2 = chr3 = "";
            enc1 = enc2 = enc3 = enc4 = "";
          } while (i < input.length);

          return output;
        },

        decode: function (input) {
          var output = "";
          var chr1, chr2, chr3 = "";
          var enc1, enc2, enc3, enc4 = "";
          var i = 0;

          // remove all characters that are not A-Z, a-z, 0-9, +, /, or =
          var base64test = /[^A-Za-z0-9\+\/\=]/g;
          if (base64test.exec(input)) {
            window.alert("There were invalid base64 characters in the input text.\n" +
              "Valid base64 characters are A-Z, a-z, 0-9, '+', '/',and '='\n" +
              "Expect errors in decoding.");
          }
          input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");

          do {
            enc1 = keyStr.indexOf(input.charAt(i++));
            enc2 = keyStr.indexOf(input.charAt(i++));
            enc3 = keyStr.indexOf(input.charAt(i++));
            enc4 = keyStr.indexOf(input.charAt(i++));

            chr1 = (enc1 << 2) | (enc2 >> 4);
            chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
            chr3 = ((enc3 & 3) << 6) | enc4;

            output = output + String.fromCharCode(chr1);

            if (enc3 != 64) {
              output = output + String.fromCharCode(chr2);
            }
            if (enc4 != 64) {
              output = output + String.fromCharCode(chr3);
            }

            chr1 = chr2 = chr3 = "";
            enc1 = enc2 = enc3 = enc4 = "";

          } while (i < input.length);

          return output;
        }
      };

      /* jshint ignore:end */
    })


// Touch in mobile
  .directive('noScroll', function($document) {
    return {
      restrict: 'A',
      link: function($scope, $element, $attr) {
        $document.on('touchmove', function(e) {
          e.preventDefault();
        });
      }
    }
  })

  // Generating single idea and its detail
  .factory('IdeaService',function(){
  var mine=[];
  return {
    getMy: function(){
      mine=[
        {id: 1, ideaTitle:'Idea 1',image:'http://lorempixel.com/image_output/abstract-q-c-640-480-1.jpg', text:'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequuntur debitis illo laborum maxime officiis. Adipisci aspernatur atque aut consectetur consequuntur dolor dolorem, expedita fugit laudantium maxime nobis provident, qui unde Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequuntur debitis illo laborum maxime officiis. Adipisci aspernatur atque aut consectetur consequuntur dolor dolorem, expedita fugit laudantium maxime nobis provident, qui unde Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequuntur debitis illo laborum maxime officiis. Adipisci aspernatur atque aut consectetur consequuntur dolor dolorem, expedita fugit laudantium maxime nobis provident, qui unde Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequuntur debitis illo laborum maxime officiis. Adipisci aspernatur atque aut consectetur consequuntur dolor dolorem, expedita fugit laudantium maxime nobis provident, qui unde Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequuntur debitis illo laborum maxime officiis. Adipisci aspernatur atque aut consectetur consequuntur dolor dolorem, expedita fugit laudantium maxime nobis provident, qui unde Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequuntur debitis illo laborum maxime officiis. Adipisci aspernatur atque aut consectetur consequuntur dolor dolorem, expedita fugit laudantium maxime nobis provident, qui unde Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequuntur debitis illo laborum maxime officiis. Adipisci aspernatur atque aut consectetur consequuntur dolor dolorem, expedita fugit laudantium maxime nobis provident, qui unde?', like:'1', dislike:'2'},
        {id: 2, ideaTitle:'Idea 2',image:'http://lorempixel.com/image_output/city-q-c-640-480-7.jpg', text:'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequuntur debitis illo laborum maxime officiis. Adipisci aspernatur atque aut consectetur consequuntur dolor dolorem, expedita fugit laudantium maxime nobis provident, qui unde?',like:'1', dislike:'2'},
        {id: 3, ideaTitle:'Idea 3',image:'http://lorempixel.com/image_output/technics-q-c-640-480-9.jpg', text:'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequuntur debitis illo laborum maxime officiis. Adipisci aspernatur atque aut consectetur consequuntur dolor dolorem, expedita fugit laudantium maxime nobis provident, qui unde?',like:'1', dislike:'2'}
      ];
      return mine;
    },
    getOne:function(IdeaId) {
      for(i=0;i<mine.length;i++){
        if(mine[i].id == IdeaId){
          return mine[i];
        }
      }
    }
  }
})
