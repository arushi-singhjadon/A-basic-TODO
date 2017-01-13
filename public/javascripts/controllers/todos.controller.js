'use strict';

angular.module('todoControllerModule', ['ngRoute'])

	.controller('TodoController', ['$scope','$http','Todos', '$route',function ($scope, $resource,Todos,$route,$location) {
					
					//$scope.newTodoTitle = "Add title of new task";
					//$scope.newTodoNote = "Add note of new task";
					$scope.filteredTodos = [];
				    $scope.numPerPage = 5;
				    $scope.currentPage = 1;
				    $scope.categories = [{"id": 1, "name": "personal"},
    									{"id": 2, "name": "office"},
    									{"id": 3, "name": "grocery"}];

					$scope.reloadRoute = function() {
   						$route.reload();
   					}

					// get all todos
					$scope.getTodosCallback = function(result) {
						$scope.todos = result;
						//$scope.totalItems = $scope.todos.length;
							$scope.figureOutTodosToDisplay();
						
					
					}		

								

					$scope.figureOutTodosToDisplay = function() {
					    var begin = (($scope.currentPage - 1) * $scope.numPerPage);
					   
					    var end = begin + $scope.numPerPage;
					
					    $scope.filteredTodos = $scope.todos.slice(begin, end);
					    //console.log("filteredTodos= "+$scope.filteredTodos);
					  };

					

					$scope.pageChanged = function() {
						console.log("page changed");
					    $scope.figureOutTodosToDisplay();
					  };


					 // $scope.paginate = function(value) {


					 //    var begin, end, index;
					 //    begin = ($scope.currentPage - 1) * $scope.numPerPage;
					 //    end = begin + $scope.numPerPage;
					 //    index = $scope.todos.indexOf(value);
					 //    return (begin <= index && index < end);
					 //  };

					 
					Todos.getAllTodos($scope.getTodosCallback);

					$scope.getCategoriesCallback = function(result) {
						$scope.categories = result;
						console.log($scope.categories);
						
					}

					//Todos.getAllCategories($scope.getCategoriesCallback);
					//$scope.done=false;
					
					//save a todo
					$scope.postTodoCallback = function(result) {
						console.log(result);
					}

					$scope.saveThis = function(){
						//console.log(newTodo);
						//console.log($scope.selectedFacilityId);
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
				        Todos.editTodo($scope.title, $scope.note, $scope.x,new Date(), $scope.editTodoCallback);

				    }

				    $scope.edit = function(id,title,note){

				    	$scope.x=id;
				    	$scope.title= title;
				    	$scope.note = note;
				    	$scope.page= 'editor';
				    	//var dt = new Date();

				    }
				    $scope.deleteTodoCallback = function(result) {
						console.log("Result is: "+result);
					//	$scope.todos=result;
					    //$scope.todos = result;
					}
				    $scope.changeStatus = function(id){
				    	Todos.deleteTodo(id,$scope.deleteTodoCallback);
				    	$scope.reloadRoute();
				    }
		}])