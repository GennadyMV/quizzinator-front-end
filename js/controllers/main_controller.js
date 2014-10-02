QuizApp.controller('MainController', ['$scope', 'Authentication', function($scope, Authentication){
	$scope.username = Authentication.get_user();
	$scope.templates_path = '../js/views';
}]);