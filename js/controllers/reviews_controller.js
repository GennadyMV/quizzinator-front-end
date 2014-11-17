QuizApp.controller('ReviewsController', ['$scope', '$location', 'Authentication', 'API', function($scope, $location, Authentication, API){
	$scope.init = function() {
		$scope.username = Authentication.get_user();
		API.get_peer_reviews_by_user({
		username: $scope.username,
		quiz: $scope.$parent.quiz_id,
		success: function(peer_reviews){
			$scope.reviews = angular.fromJson(peer_reviews);
		},
		error: function(){
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
				review.totalRating += rating;
			}
		});
	}
}]);

