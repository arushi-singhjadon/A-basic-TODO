
angular.module('app', ['ngRoute','ngResource','ui.bootstrap','ngSanitize'])

 
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

			editTodo: function(title, note, id, callback){

				$http({
				 	method: 'PUT', 
				 	url: '/todos/'+id,
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


	.controller('TodoController', ['$scope','$http','Todos', '$route',function ($scope, $resource,Todos,$route) {
					
					$scope.newTodoTitle = "Add title of new task";
					$scope.newTodoNote = "Add note of new task";

					$scope.reloadRoute = function() {
   						$route.reload();
   					}

					// get all todos
					$scope.getTodosCallback = function(result) {
						$scope.todos = result;
						$scope.totalItems = $scope.todos.length;
					
					}		

					$scope.currentPage = 1;
					$scope.numPerPage = 5;


					 $scope.paginate = function(value) {
					 	
					    var begin, end, index;
					    begin = ($scope.currentPage - 1) * $scope.numPerPage;
					    end = begin + $scope.numPerPage;
					    index = $scope.todos.indexOf(value);
					    return (begin <= index && index < end);
					  };

					 
					Todos.getAllTodos($scope.getTodosCallback);
					
					$scope.done=false;
					
					//save a todo
					$scope.postTodoCallback = function(result) {
						console.log(result);
					}

					$scope.saveThis = function(){
						//console.log(newTodo);
						Todos.postTodo($scope.newTodoTitle,$scope.newTodoNote,$scope.postTodoCallback);	
						$scope.reloadRoute();
					}
				//	upon click of checkbox
					$scope.updateStatus = function(id){
							

					}

					$scope.page = 'list';

					$scope.editTodoCallback = function(result) {
						console.log(result);
						$scope.reloadRoute();
					}

					
    				$scope.cancel = function() {
					        $scope.page = 'list';
					}

					$scope.save = function() {
				        $scope.page = 'list';
				        console.log($scope.x + " " + $scope.title);
				        Todos.editTodo($scope.title, $scope.note, $scope.x, $scope.editTodoCallback);

				    }

				    $scope.edit = function(id,title,note){

				    	$scope.x=id;
				    	$scope.title= title;
				    	$scope.note = note;
				    	//console.log(title+"  "+note);
				    	$scope.page= 'editor';
				    }
				    $scope.deleteTodoCallback = function(result) {
						console.log(result);
					}
				    $scope.changeStatus = function(id){
				    	Todos.deleteTodo(id,$scope.deleteTodoCallback);
				    	$scope.reloadRoute();
				    }
		}])
	
 .controller('TodoDetailCtrl', ['$scope', 'Todos', function ($scope, $routeParams, Todos) {
				
			
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
		 });
	}]);