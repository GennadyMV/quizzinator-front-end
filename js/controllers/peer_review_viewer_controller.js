QuizApp.controller('PeerReviewViewerController', ['$scope', 'API', 'Authentication', function($scope, API, Authentication){

	$scope.peer_reviews = [];
	$scope.answers = [];

	$scope.init = function(item) {
		$scope.count = item.count;
		$scope.get_peer_reviews();
	};

	/**
	* Fetches the peer reviews from the server
	*/
	$scope.get_peer_reviews = function() {
		API.get_peer_reviews_by_quiz({
			quiz: $scope.$parent.quiz_id,
			username: Authentication.get_user(),
			review_count: $scope.count,
			success: function(reviews) {
				$scope.peer_reviews = angular.fromJson(reviews);
			},
			error: function() {
				throw "error getting peer reviews";
			}
		});
	};

	/**
	* Rates a peer review with a given rating
	*
	* @param review peer review to rate
	* @param rating (-1, 1)
	*/
	$scope.rate = function(review, rating) {
		API.rate_peer_review({
			quiz: $scope.$parent.quiz_id,
			answer: review.answerId,
			review: review.id,
			user: $scope.$parent.username,
			rating: rating,
			success: function() {
				review.rated = true;
				review.totalRating = review.totalRating + rating;
			},
			error: function() {
				throw "error rating";
			}
		});
	};

}]);
