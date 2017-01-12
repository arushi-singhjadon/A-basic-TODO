'use strict';

angular.module('todoService', ['ngRoute'])

	.factory('Todos', ['$http', function($http) {         
		return {
			
			getAllTodos: function(callback){

				$http({
				 	method: 'GET', 
				 	url: '/todos'
				})
				.success (function(response){
					console.log(response);
						if(callback){
							callback(response);
						}
				})
				.error (function(response){
						console.error(response);
				});
			},

			getTodoDetails: function(id,callback){

				$http({
				 	method: 'GET', 
				 	url: '/todos/'+id
				})
				.success (function(response){
					console.log(response);
						if(callback){
							callback(response);
						}
				})
				.error (function(response){
						console.error(response);
				});
			},
			//post in database
			postTodo: function(title,note, callback){

				$http({
				 	method: 'POST', 
				 	url: '/todos',
				 	data:{
				 		'title' : title,
				 		'note' : note
				 	}
				})
				.success (function(response){
						if(callback){
							callback(response);
						}
				})
				.error (function(response){
						console.error(response);
				});
			},

			editTodo: function(title, note, id, dt, callback){

				$http({
				 	method: 'PUT', 
				 	url: '/todos/'+id,
				 	data:{
				 		'title' : title,
				 		'note' : note,
				 		'update_date': dt
				 	}
				 })

				.success (function(response){
						if(callback){
							callback(response);
						}
				})
				.error (function(response){
						console.error(response);
				});
			},

			deleteTodo: function(id,callback){

				$http({
				 	method: 'DELETE', 
				 	url: '/todos/'+id,
				 	
				})
				.success (function(response){
						if(callback){
							callback(response);
						}
				})
				.error (function(response){
						console.error(response);
				});
			}



			
		};
	}])

.config(['$routeProvider', function ($routeProvider) {
		$routeProvider
			.when('/',	  {
				templateUrl: '/todos.html',
				controller: 'TodoController'
			})
		
			.when('/:id', {
				templateUrl: '/todoDetails.html',
				controller: 'TodoDetailCtrl'
		 })

			//$locationProvider.html5Mode(true);
	}]);