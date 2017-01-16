'use strict';

angular.module('todoControllerModule', ['ngRoute'])
	.controller('TodoController', ['$scope','$http','Todos', '$route',function ($scope, $resource,Todos,$route,$location) {
				
		$scope.filteredTodos = [];
	    $scope.numPerPage = 5;
	    $scope.currentPage = 1;
	    $scope.page = 'list';

		$scope.typeOptions = [
		    { name: 'Personal', value: 'Personal' }, 
		    { name: 'Grocery', value: 'Grocery' }, 
		    { name: 'Office', value: 'Office' }
		];

		$scope.form = {type : $scope.typeOptions[0].value};

		$scope.arr = [
		    { value:1 }, 
		    { value:2 },
		    { value:3 },
		    { value:4 },
		    { value:5 },
		    { value:6 },
		    { value:7 },
		    { value:8 },
		    { value:9 },
		    { value:10 }
		];
		    
		$scope.form1 = {type : $scope.numPerPage};

		$scope.reloadRoute = function() {
			$route.reload();
		};

		// get all todos
		$scope.getTodosCallback = function(result) {
			$scope.todos = result;
			//$scope.filteredTodos = result;
			$scope.figureOutTodosToDisplay();
			console.log($scope.numPerPage);
		};		
				

		$scope.figureOutTodosToDisplay = function() {
		    var begin = (($scope.currentPage - 1) * $scope.numPerPage);
		    var end = begin + $scope.numPerPage;
		    $scope.filteredTodos = $scope.todos.slice(begin, end);
		 };
	

		$scope.pageChanged = function() {
			console.log("page changed");
		    $scope.figureOutTodosToDisplay();
		  };

		Todos.getAllTodos($scope.getTodosCallback);
	//	Todos.getAllTodos(1, $scope.numPerPage, $scope.getTodosCallback);

		//save a todo
		$scope.postTodoCallback = function(result) {
			console.log(result);
		};

		$scope.saveThis = function(){
			console.log($scope.form.type);
			if($scope.newTodoTitle && $scope.newTodoNote) {
				Todos.postTodo($scope.newTodoTitle,$scope.newTodoNote,$scope.form.type,$scope.postTodoCallback);	
				$scope.reloadRoute();
			}
		};
	
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
	    };

	    $scope.deleteTodoCallback = function(result) {
			console.log("Result is: "+result);
		
		};

	    $scope.changeStatus = function(id) {
	    	Todos.deleteTodo(id,$scope.deleteTodoCallback);
	    	$scope.reloadRoute();
	    };


		$scope.change = function() {
			console.log($scope.form1.type);
			$scope.numPerPage = $scope.form1.type;
			console.log($scope.numPerPage);
			$scope.figureOutTodosToDisplay();
		};
}]);