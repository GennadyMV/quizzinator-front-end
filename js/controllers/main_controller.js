QuizApp.controller('MainController', ['$rootScope', '$scope', 'Authentication', function($rootScope, $scope, Authentication){

	$scope.username = Authentication.get_user();
	$scope.quiz_info = {};
	$scope.templates_path = '../js/views';

	/*
		Initialize the app
		@param options which contains the API url
	*/
	$scope.init = function(options){
		options = angular.fromJson(options);
		$rootScope.api = options.api;
	}
	
}]);
