QuizApp.controller('MainController', ['$scope', 'Authentication', function($scope, Authentication){
	$scope.username = Authentication.get_user();
	$scope.templates_path = 'build/templates';

	$scope.init = function(options){
		options = angular.fromJson(options);

		$scope.templates_path = options.templates || $scope.templates_path; 
	} 
}]);