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
	        console.log($scope.x + " " + $scope.title);
	        Todos.editTodo($scope.title, $scope.note, $scope.x, $scope.editTodoCallback);

	    };

	    $scope.edit = function(id,title,note){
	    	$scope.x=id;
	    	$scope.title= title;
	    	$scope.note = note;
	    	$scope.page= 'editor';
	    };

	    $scope.deleteTodoCallback = function(result) {
			console.log("Result is: "+result);
		};

	    $scope.delete = function(id) {
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