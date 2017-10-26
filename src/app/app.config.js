'use strict';

angular.module('uwiBase')
.config(function($routeProvider,$locationProvider){

  $locationProvider.html5Mode({enabled:true})

  $routeProvider.
  when("/", {
    template: "<add-player></add-player>"
  }).when("/addFx", {
    templateUrl: './src/app/addPlayer/fixture.html',
    controller: 'addFxCtrl'
    //CAN ALSO ADD THE COMPONENT BY ITSELF LIKE THE OTHERS AND WOULDN'T HAVE TO ADD A CONTROLLER


  })
  .when('/viewfx', {
    templateUrl: './src/app/addPlayer/viewfx.html',
    controller: 'FixturesPage'
  })

  .when('/chat', {
    template: '<view-contacts></view-contacts>'
  })


  .when('/post', {
    templateUrl: './src/app/addPlayer/post.html'
  })

  .when('/edit', {
    template:'<edit-player></edit-player>'
  }).
  when("/view", {
    template: "<div id='views'><view-players></view-players><view-player></view-player></div>"
  }).
  otherwise({
    template: "<p>Not Found</p>"
  })

});
