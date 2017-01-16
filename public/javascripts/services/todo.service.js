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
			postTodo: function(title,note,cat,callback){

				$http({
				 	method: 'POST', 
				 	url: '/todos',
				 	data:{
				 		'title' : title,
				 		'note' : note,
				 		'category' : cat
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
							console.log("In factory response is:"+response);
							callback(response);
						}
						//$scope.todos = data; 
				})
				.error (function(response){
						console.error(response);
				});
			}
		
	};
}]);
	

