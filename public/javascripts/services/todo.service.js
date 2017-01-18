'use strict';

angular.module('todoService', ['ngRoute'])
	.factory('Todos', ['$http', function($http) {         
		return {
			getTodosinRange: function(begin,end,countonly,callback){

				$http({
				 	method: 'GET', 
				 	url: '/todos',
				 	params: {
				 		begin:begin,
				 		end:end,
				 		countonly:countonly
				 	}
				 	
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

			editTodo: function(title, note, id, callback){

				$http({
				 	method: 'PUT', 
				 	url: '/todos/'+id,
				 	data:{
				 		'title' : title,
				 		'note' : note,
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
			editStatus: function(id, status, callback){

				$http({
				 	method: 'PUT', 
				 	url: '/todos/'+id,
				 	data:{
				 		'status':status
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
	}
]);
	

