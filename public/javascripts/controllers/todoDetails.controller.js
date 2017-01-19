'use strict';

angular.module('todoDetailsControllerModule', ['ngRoute'])
	.controller('TodoDetailCtrl', ['$scope', '$routeParams', 'Todos', function ($scope, $routeParams, Todos) {
	    $scope.getTodoDetailsCallback = function(result) {
			$scope.todo = result;
		//	console.log($scope.todo.status);
			if($scope.todo.status) {
				$scope.taskStatus = "Done";
			} else {
				$scope.taskStatus = "New";
			}
			//console.log($scope.taskStatus);
		}	
	    Todos.getTodoDetails($routeParams.id,$scope.getTodoDetailsCallback);
	    //console.log($scope.todo.status);
	    // if($scope.todo.status = false) {
	    // 	$scope.taskStatus = "Done";
	    // } else {
	    // 	$scope.taskStatus = "New";
	    // }
  	}
]);