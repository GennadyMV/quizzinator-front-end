QuizApp.controller('MainController', ['$scope', 'Authentication', function($scope, Authentication){
	$scope.username = Authentication.get_user();
	$scope.quiz_info = {};
	$scope.templates_path = '../js/views';
}]);
