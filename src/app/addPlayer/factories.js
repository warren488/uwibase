angular.module('uwiBase')
    .factory('sharedProperties', function ($http, $firebaseObject) {
      if (!guy) {
        console.log('creating guy');
        var guy = null;
      }
      var property = 0;
        return {
            getFocus: function () {
                return guy;
            },
            setFocus: function(value) {
              reo = firebase.database().ref("DATA/"+value);
              guy = $firebaseObject(reo);
            }
        };
    })
