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
				console.log('reviews: ' + angular.fromJson(reviews));
				console.log('length: ' + reviews.length)
				$scope.peer_reviews = angular.fromJson(reviews);
				console.log($scope.peer_reviews);
				console.log($scope.peer_reviews.length);
				/*set_not_rated();
				console.log($scope.peer_reviews[0].not_rated);*/
			}
		})
	}

	$scope.rate = function(review, rating) {
		API.rate_peer_review({
			quiz: $scope.$parent.quiz_id,
			answer: review.answerId,
			review: review.id,
			user: review.reviewer,
			rating: rating,
			success: function(reviews) {

			}

		})
	}


	set_not_rated = function() {
		for(i=0;i<$scope.peer_reviews.length;i++) {
			$scope.peer_reviews[i].not_rated = true;
		}
	}
}]);
