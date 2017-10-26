'use strict';


angular.module('addPlayer',['firebase'])

	.component('addPlayer', {
		templateUrl: './src/app/addPlayer/add.html',
		controller: 'addCtrl'//you can also define the controller function here
	})

	.controller('addCtrl', function($firebaseObject, $scope){
		firebase.auth().signInAnonymously().catch(function(error){

		});
		firebase.auth().onAuthStateChanged(function(user){
			if(user){
		} else{

		}

		})

		 $scope.addPlayer = function(IDno, first, last, faculty, address, contact, custom, customval){


			 console.log(custom+":"+customval);

			 if (address === undefined) {
			 		address = "";
			 }

			 if (faculty === undefined) {
					faculty = "";
			 }

			 if (contact === undefined) {
					contact = "";
			 }


			console.log(first+":"+last+":"+IDno+":"+faculty+":"+address+":"+contact);
	    var refff = firebase.database().ref().child("DATA").child(IDno);
	    var team = $firebaseObject(refff);
	    team.first = first;
			team.ID = IDno;
	    team.last = last;
	    team.faculty = faculty;
	    team.address = address;
	    team.contact = contact;

			team.$save();

			//
			// if(custom !== undefined){
			// 	alert("dd");
			// 	var can = firebase.database().ref().child("DATA").child(IDno).child(custom);
			// 	var can1 = $firebaseObject(can);
			// 	can1.this[custom] = customval;
			// 	can1.$save();
			// }


			// console.log(team);

	    var reset = document.getElementsByTagName("form")[0];
			if ($firebaseObject(firebase.database().ref().child("DATA").child(IDno)).ID == IDno){
				alert("everything seems to have went smooth");
			}
	    for (var i = 0; i < reset.length - 1; i++) {
	      reset[i].value = "";
	    }
			if (!(custom == undefined || customval == undefined)){
			var cus = firebase.database().ref("DATA/"+IDno+"/custom/"+custom+"/1")
			var cus2 = firebase.database().ref("DATA/"+IDno+"/custom/"+custom+"/2")

			cus.set(custom);
			cus2.set(customval);
		}


		}



		console.log("Skank");
	}).component('viewPlayers', {
	  templateUrl: './src/app/addPlayer/view.html',
	  controller: 'viewCtrl'
	})
	.component('viewPlayer',{
		templateUrl: './src/app/addPlayer/player.html',
		controller: 'viewCtrl'
	})



	.controller('viewCtrl', function($firebaseArray, $firebaseObject, $scope, sharedProperties, $route, $location){

		$scope.filterFunction = function() {
			var input, filter, a, i, div;
			input = document.getElementById("myInput");
			filter = input.value.toUpperCase();
			div = document.getElementById("men");

			a = document.getElementsByName("men2");
			console.log(a, filter);
			for (i = 0; i < a.length; i++) {
				if (a[i].getElementsByTagName('div')[0].getElementsByTagName('h3')[0].innerHTML.toUpperCase().indexOf(filter) > -1) {
					a[i].style.display = "block";
					console.log(a[i].getElementsByTagName('div')[0].getElementsByTagName('h3')[0].innerHTML);
				}
				// else {
				// 	a[i].style.display = "none";
				//
				// }


				else if (a[i].getElementsByTagName('div')[0].getElementsByTagName('p')[0].innerHTML.toUpperCase().indexOf(filter) > -1) {
					a[i].style.display = "block";

				} else {
					a[i].style.display = "none";

				}

			}
		}


		$scope.refff = firebase.database().ref("DATA").orderByChild("first");

	  $scope.players = $firebaseObject($scope.refff);
		$scope.guy = sharedProperties.getFocus();


		// $scope.guycustom = firebase.database().ref("DATA/"+$scope.guy.ID+"/custom");
		// $scope.guycustom2 = $firebaseObject($scope.guycustom);

		$scope.guycustom2 = null;

		$scope.setPlayer = function(guy){
//CHECK FOR A CONFLICT SINCE I HAVE GUY DEFINED TWICE

			console.log($location.url());
			sharedProperties.setFocus(guy.ID);
			console.log(sharedProperties.getFocus());
			$scope.guy = sharedProperties.getFocus();
			$route.reload();
			$scope.guycustom = firebase.database().ref("DATA/"+guy.ID+"/custom");
			$scope.guycustom2 = $firebaseObject($scope.guycustom);
			console.log($scope.guycustom2);
			// $scope.set = firebase.database().ref().child("DATA").child("curr");
			// $scope.set2 = $firebaseObject($scope.set);
			// $scope.set2.get = guy;
			// $scope.set2.$save();
		}


		var today = new Date();

		var day = today.getDate();
		var month = today.getMonth() + 1;
		var year = today.getFullYear();



		$scope.date = day+"/"+month+"/"+year;
		$scope.time = today.getHours()+":"+today.getMinutes();


	})











	.component('editPlayer', {
			templateUrl: './src/app/addPlayer/edit.html',
			controller: 'editCtrl'
	})
	.controller('editCtrl', function($route, $firebaseObject, $scope, sharedProperties){

		$scope.warren = sharedProperties.getFocus();//info to be displayed on screen

		//USE INNER HTML TO VIEW INDIVIDUALS

		$scope.edit = function(first, last, IDno, faculty, address, contact){
			alert("yhh");


			console.log($scope.warren.first);
			console.log($scope.warren.last);
			console.log($scope.warren.contact);
			console.log($scope.warren.ID);
			console.log($scope.warren.address);
			console.log($scope.warren.faculty);




			if(IDno != undefined){
				alert('g')
				var save = firebase.database().ref("DATA/"+IDno);
				var save2 = $firebaseObject(save);
				var del = firebase.database().ref("DATA/"+$scope.warren.ID);
				console.log(firebase.database().ref().child("DATA").child($scope.warren.ID));
				save2.ID = IDno;

			}else{
				var save = firebase.database().ref().child("DATA").child($scope.warren.ID);
				var save2 = sharedProperties.getFocus();
			save2.ID = $scope.warren.ID = $scope.warren.ID;

			}

			if(first != undefined){
				alert($scope.warren.first);
			save2.first  = first;
			}else{
			save2.first =	$scope.warren.first = $scope.warren.first;
			}

			if(last != undefined){
			save2.last  = last;
			}else{
			save2.last =	$scope.warren.last = $scope.warren.last;
			}

			if(faculty != undefined){
			save2.faculty = faculty;
			}else{
			save2.faculty =	$scope.warren.faculty = $scope.warren.faculty;
			}



			if(address != undefined){
			save2.address = address;
			}else{
			save2.address =	$scope.warren.address = $scope.warren.address;
			}

			if(contact != undefined){
			save2.contact  = contact;
			}else{
			save2.contact =	$scope.warren.contact = $scope.warren.contact;
			}
			console.log($scope.warren);
			console.log(save2);
			save2.$save();
			$scope.warren.$save();
			var reset = document.getElementsByTagName("form")[0];
			console.log(document.getElementsByTagName("form")[0]);
	    for (var i = 0; i < reset.length - 1; i++) {
	      reset[i].value = "";
	    }

			if (del) {
				sharedProperties.setFocus(IDno);
				del.remove();
				$route.reload();
			}


		}

	})


	// <!-- *****************************************************************************************************
	// *****************************************************************************************************
	// *****************************************************************************************************
	// ***************************************************************************************************** -->



	.component('newFixture', {
		templateUrl: './src/app/addPlayer/fixture.html',
		controller: 'addFxCtrl'
	})
	.controller('addFxCtrl', function($scope, $firebaseObject){
		$scope.players = firebase.database().ref("DATA");
		$scope.players2 = $firebaseObject($scope.players);

		$scope.myFunction = function () {
			document.getElementById("myDropdown").classList.toggle("show");
			document.getElementsByClassName('dropbtn')[0].classList.toggle('focus');

			document.getElementsByTagName('body')[0].addEventListener('click', function(event){
				if (!event.target.matches('.show') && !event.target.matches('.focus') && !event.target.matches('.item') && !event.target.matches('#myInput')) {
					if (document.getElementsByClassName('show')[0]) {
						document.getElementsByClassName('show')[0].classList.toggle('show');
						}

						if (document.getElementsByClassName('focus')[0]) {
							document.getElementsByClassName('focus')[0].classList.toggle('focus');
								}
				}
			});
		}

		$scope.filterFunction = function() {
			var input, filter, a, i, div;
			input = document.getElementById("myInput");
			filter = input.value.toUpperCase();
			div = document.getElementById("myDropdown");
			a = div.getElementsByTagName("a");
			for (i = 0; i < a.length; i++) {
				if (a[i].innerHTML.toUpperCase().indexOf(filter) > -1) {
					a[i].style.display = "";
				} else {
					a[i].style.display = "none";
				}
			}
		}


		console.log("yh");
		$scope.days = 1;

		$scope.disable = function(){
			document.getElementsByName('transp')[0].setAttribute('disabled', 'true');
			document.getElementsByName('venue')[0].setAttribute('disabled', 'true');
			document.getElementsByName('venue')[0].value = '3W\'s Oval';
			document.getElementsByName('transp')[0].value = 'n/a';


		}

		$scope.enable = function(){
			document.getElementsByName('transp')[0].removeAttribute('disabled');
			document.getElementsByName('venue')[0].removeAttribute('disabled');

			if (document.getElementsByName('venue')[0].value == '3W\'s Oval' ) {
			document.getElementsByName('venue')[0].value = ''
		}

			if (document.getElementsByName('transp')[0].value = 'n/a') {
				document.getElementsByName('transp')[0].value = '';
			}


		}

		$scope.delete = function(num){
			alert('yyyy');
			var remove = document.getElementsByClassName(num)[0];
			console.log(remove);
			var par = remove.parentNode;
			par.removeChild(remove);

		}

		$scope.add = function(player){
			var playuh = document.createElement('li');
			var name = document.createTextNode(player.first+" "+player.last);
			var minus = document.createTextNode('---');
			var button = document.createElement('div');
			button.className = player.ID+"delb";
			// button.setAttribute('ng-click', 'delete()')
			button.addEventListener('click', function(event){
				if (event.target.className = "."+player.ID+"delb") {
					$scope.delete(player.ID);
				}
			});
			playuh.className = player.ID;
			var ins = document.getElementsByName('squadlist')[0];

			playuh.appendChild(name);
			button.appendChild(minus);
			playuh.appendChild(button);

			ins.appendChild(playuh);
			// ins.appendChild(button);

		}

		$scope.addDay = function(){

			if ($scope.days < 5) {

			$scope.days++
			var fig1 = document.createElement("input");
			var fig2 = document.createElement("input");
			var el1 = document.createElement("label");
			var but = document.getElementsByName("squadlabel")[0];
			var text = document.createTextNode('Day '+$scope.days);
			el1.appendChild(text);
			fig1.type = 'time';
			fig2.type = 'date';
			fig1.className = 'daytime';
			fig2.className = 'daytime';
			fig1.name = 'day'+$scope.days+"time";
			fig2.name = 'day'+$scope.days+"date";

			document.getElementsByTagName('form')[0].insertBefore(fig2, but);
			 document.getElementsByTagName('form')[0].insertBefore(fig1, but);
			 document.getElementsByTagName('form')[0].insertBefore(text, fig2);



			 document.getElementsByName('day'+$scope.days+"date")[0].setAttribute('ng-model', 'day'+$scope.days+"date")
			 document.getElementsByName('day'+$scope.days+"time")[0].setAttribute('ng-model', 'day'+$scope.days+"time")
		 }

		}







		$scope.addGame = function(tourn, enemy, status, venue, transp, day1date, day1time){//, day2date, day2tme, day3date, day3tme, day4date, day4tme, day5date, day5tme,){
			venue = document.getElementsByName('venue')[0].value;
			transp = document.getElementsByName('transp')[0].value;


			console.log(enemy+":"+status+":"+venue+":"+transp+":"+day1date+":"+day1time);


			var gref = firebase.database().ref("games/"+enemy+":"+tourn);
			var games = $firebaseObject(gref);

			games.opponents = enemy;
			games.status = status;
			games.venue = venue;
			games.transportation = transp;
			games.tournament = tourn;

			var times = document.getElementsByClassName('daytime');
			games.$save();

			var k = 1;
			for (var i = 0; i < times.length; i++) {
				if ((i > 0) && (i%2 == 0)) {
					k++;
				}

				if ((i%2 == 0) && (i < 2*k)) {
					//USE INNER FOR LOOP TO MULTIPLY ELEMENTS WOULD HAVE TO ADJUST REFERNCE

					console.log(times[i]);
					var dtimes = firebase.database().ref("games/"+enemy+":"+tourn+"/day"+k+"/date");
					var dtimes2 = $firebaseObject(dtimes);
					dtimes.set(times[i].value);
					// dtimes2.$save();
				}
				else if(i < 2*k){
					var dtimes = firebase.database().ref("games/"+enemy+":"+tourn+"/day"+k+"/time");
					var dtimes2 = $firebaseObject(dtimes);
						dtimes.set(times[i].value);
					// dtimes2.$save();
				}
				// DAY2



			}//end for


			var squad = document.getElementsByName('squadlist')[0]
			console.log(squad.getElementsByTagName('li'));
			if (squad.getElementsByTagName('li').length === 0) {

			} else {
				for (var i = 0; i < squad.getElementsByTagName('li').length; i++) {
					var sStore = firebase.database().ref("games/"+enemy+":"+tourn+"/sqaud/"+i)
					sStore.set(squad.getElementsByTagName('li')[i].innerHTML);
				}
				alert('yea fam');
			}

		}//end add game

		// <!-- *****************************************************************************************************
		// *****************************************************************************************************
		// *****************************************************************************************************
		// ***************************************************************************************************** -->


		// <!-- *****************************************************************************************************
	  // *****************************************************************************************************
	  // *****************************************************************************************************
	  // ***************************************************************************************************** -->


	}).component('viewFixtures', {
		templateUrl: 'viewfx.html',
		controller: 'FixturesPage'
	})
	.controller('FixturesPage', function($firebaseArray, $firebaseObject, $scope){

  var game = firebase.database().ref().child('games');
  $scope.games = $firebaseObject(game);

  // console.log($scope.games.$id.split(':').pop());
})
.component('viewContacts', {
	templateUrl: './src/app/addPlayer/chats.html',
	controller: 'MessagingCtrl'
})

.controller('MessagingCtrl', function($scope, $firebaseArray){

  var messagesRef = firebase.database().ref().child("DATA");
  $scope.people = $firebaseArray(messagesRef);
});
