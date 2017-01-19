'use strict';

angular.module('todoControllerModule', ['ngRoute'])
	.controller('TodoController', ['$scope','$http','Todos', '$route',function ($scope, $resource,Todos,$route,$location) {
				
		$scope.filteredTodos = [];
	    $scope.numPerPage = 5;
	    $scope.currentPage = 1;
	    $scope.page = 'list';
	   // $scope.taskDone = true;
		$scope.typeOptions = [
		    { name: 'Personal', value: 'Personal' }, 
		    { name: 'Grocery', value: 'Grocery' }, 
		    { name: 'Office', value: 'Office' }
		];

		$scope.form = {type : $scope.typeOptions[0].value};
		//console.log($scope.todo.status);
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

		$scope.getTodosCountCallback = function(result){
			$scope.count = result;
			console.log("count= "+$scope.count);
		}
		$scope.getTodosCallback = function(result) {
			$scope.filteredTodos = result;
			console.log($scope.filteredTodos);
		};		
		
		//	Todos.getAllTodos($scope.getTodosCallback);
		//	Todos.getAllTodos(1, $scope.numPerPage, $scope.getTodosCallback);

		
		Todos.getTodosinRange(0,0,true,$scope.getTodosCountCallback);

		$scope.figureOutTodosToDisplay = function() {
			var begin = $scope.currentPage;
		    var end = $scope.numPerPage;
		    Todos.getTodosinRange(begin,end,false,$scope.getTodosCallback);
		  //  $scope.filteredTodos = $scope.todos.slice(begin, end);
		};
	
		$scope.figureOutTodosToDisplay();

		$scope.pageChanged = function() {
			console.log("page changed");
		    $scope.figureOutTodosToDisplay();
		 };

		//save a todo
		$scope.postTodoCallback = function(result) {
			console.log("Result saved: "+result);
			Todos.getTodosinRange(0,0,true,$scope.getTodosCountCallback);
		};

		$scope.saveThis = function(){
			if($scope.newTodoTitle && $scope.newTodoNote) {
				Todos.postTodo($scope.newTodoTitle,$scope.newTodoNote,$scope.form.type,$scope.postTodoCallback);	
				$scope.figureOutTodosToDisplay();
			}
		};
	
		$scope.editTodoCallback = function(result) {
			console.log(result);
			$scope.figureOutTodosToDisplay();
		};

		
		$scope.cancel = function() {
	        $scope.page = 'list';
		};
		
		
		$scope.save = function() {
	        $scope.page = 'list';
	        console.log($scope.id + " " + $scope.title);
	        Todos.editTodo($scope.title, $scope.note, $scope.id,false,false,$scope.editTodoCallback);

	    };

	    $scope.edit = function(id,title,note){
	    	$scope.id=id;
	    	$scope.title= title;
	    	$scope.note = note;
	    	$scope.page= 'editor';
	    };

	    $scope.deleteTodoCallback = function(result) {
			console.log("Result is: "+result);
			Todos.getTodosinRange(0,0,true,$scope.getTodosCountCallback);
		};

	    $scope.delete = function(id) {
	    	Todos.deleteTodo(id,$scope.deleteTodoCallback);
	    	//$scope.reloadRoute();
	    	$scope.figureOutTodosToDisplay();
	    };


		$scope.change = function() {
			console.log($scope.form1.type);
			$scope.numPerPage = $scope.form1.type;
			console.log($scope.numPerPage);
			$scope.figureOutTodosToDisplay();
		};

		$scope.editStatusCallback = function(result){
			console.log(result);
		};

		$scope.changeStatus = function(id,status) {
			Todos.editTodo("","",id,true,status,$scope.editTodoCallback);
			//Todos.editStatus(id,status,$scope.editStatusCallback);
			//console.log(id+" "+status);
		}
		
}]);