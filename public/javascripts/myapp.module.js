angular.module('app', 
					[
						'ngRoute',
						'ngResource',
						'ui.bootstrap',
						'ngSanitize',
						'todoControllerModule',
						'todoDetailsControllerModule',
						'todoService'])
.config(['$routeProvider', function ($routeProvider) {
	$routeProvider
		.when('/',	  {
			templateUrl: 'templates/todos.template.html',
			controller: 'TodoController'
		})
		
		.when('/:id', {
			templateUrl: 'templates/todoDetails.template.html',
			controller: 'TodoDetailCtrl'
		 })

			//$locationProvider.html5Mode(true);
			//$locationProvider.html5Mode(true);
}]);
