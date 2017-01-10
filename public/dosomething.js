angular.module('app', ['ngRoute','ngResource'])

 /*.factory('Todos', ['$http', function($http){
    return $http.get('/todos');
  }])

  // Controller
  .controller('TodoController', ['$scope', 'Todos', function ($scope, Todos) {
    Todos.success(function(data){
      $scope.todos = data;
    }).error(function(data, status){
      console.log(data, status);
      $scope.todos = [];
    });
  }])
  */

  .factory('Todos', ['$resource', function($resource){
          return $resource('/todos/:id', {}, 
            {
              'update': { method:'PUT' }
            });
        }])

  .controller('TodoController', ['$scope', 'Todos', function ($scope, Todos) {
          $scope.todos = Todos.query();
          $scope.save = function(){
          
            var todo = new Todos({ title: $scope.newTodo});
            todo.$save(function(){
              $scope.todos.push(todo);
              $scope.newTodo = ''; // clear textbox
            });
          }
    }])
  
 .controller('TodoDetailCtrl', ['$scope', '$routeParams', 'Todos', function ($scope, $routeParams, Todos) {
   // $scope.todo = Todos[$routeParams.id];
   console.log("Hello");
      $scope.todo = Todos.get({id: $routeParams.id });
  }])

  .config(['$routeProvider', function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: '/todos.html',
        controller: 'TodoController'
      })
    
      .when('/:id', {
        templateUrl: '/todoDetails.html',
        controller: 'TodoDetailCtrl'
     });
  }]);