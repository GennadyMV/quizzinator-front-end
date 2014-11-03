QuizApp.controller('PeerReviewViewerController', ['$scope', 'API', 'Authentication', function($scope, API, Authentication){
	$scope.count;
	$scope.peer_reviews = [];

	$scope.init = function(item) {
		$scope.count = item.count;
		$scope.get_peer_reviews();
	}

	$scope.answer_view = function(item_type) {
		return get_path('answers/' + item_type + '.html');
	}

	function get_path(template){
        return $scope.templates_path + '/' + template;
    }

	$scope.get_peer_reviews = function() {
		API.get_peer_reviews({
			quiz: $scope.$parent.quiz_id,
			username: Authentication.get_user(),
			review_count: $scope.count,
			success: function(reviews) {
				$scope.peer_reviews = angular.fromJson(reviews);
				console.log($scope.peer_reviews);
			}
		})
	}
}]);
