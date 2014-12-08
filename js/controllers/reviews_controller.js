QuizApp.controller('ReviewsController', ['$scope', '$location', 'Authentication', 'API', function($scope, $location, Authentication, API){

	/**
	* Initializes the peer reviews
	*/
	$scope.init = function() {
		$scope.username = Authentication.get_user();

		API.get_peer_reviews_by_user({
			username: $scope.username,
			quiz: $scope.$parent.quiz_id,
			success: function(peer_reviews){
				$scope.reviews = angular.fromJson(peer_reviews);
			},
			error: function(){}
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
			user: $scope.user,
			rating: rating,
			success: function(new_review) {
				review.rated = true;
				review.totalRating = new_review.totalRating;
			},
                        error: function() {
                            throw "error rating";
                        }
		});
	};
}]);
