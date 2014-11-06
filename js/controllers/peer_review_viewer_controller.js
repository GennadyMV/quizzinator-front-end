QuizApp.controller('PeerReviewViewerController', ['$scope', 'API', 'Authentication', function($scope, API, Authentication){
	$scope.count;
	$scope.peer_reviews = [];
	$scope.answers = [];

	$scope.init = function(item) {
		$scope.count = item.count;
		$scope.get_peer_reviews();
	}

	$scope.get_peer_reviews = function() {
		API.get_peer_reviews_by_quiz({
			quiz: $scope.$parent.quiz_id,
			username: Authentication.get_user(),
			review_count: $scope.count,
			success: function(reviews) {
				$scope.peer_reviews = angular.fromJson(reviews);
			}
		});
	}

	$scope.rate = function(review, rating) {
		API.rate_peer_review({
			quiz: $scope.$parent.quiz_id,
			answer: review.answerId,
			review: review.id,
			user: review.reviewer,
			rating: rating,
			success: function(reviews) {
				review.rated = true;
			}
		});
	}

}]);
