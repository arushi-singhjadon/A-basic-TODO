'use strict';

angular.module('todoDetailsControllerModule', ['ngRoute'])
	.controller('TodoDetailCtrl', ['$scope', '$routeParams', 'Todos', function ($scope, $routeParams, Todos) {
	    $scope.getTodoDetailsCallback = function(result) {
			$scope.todo = result;
		}	
	    Todos.getTodoDetails($routeParams.id,$scope.getTodoDetailsCallback);
  }]);