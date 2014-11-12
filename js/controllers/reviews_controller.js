QuizApp.controller('ReviewsController', ['$scope', '$location', 'Authentication', 'API', function($scope, $location, Authentication, API){
	$scope.init = function() {
		console.log('kutsuttu');
		console.log(Authentication.get_user());
		$scope.username = Authentication.get_user()
		API.get_peer_reviews_by_user({
		username: $scope.username,
		success: function(quizes){
			console.log(quizes);
			json_quizes = angular.fromJson(quizes);
			$scope.reviews = json_quizes.reviews;
			console.log('quizes: ' + json_quizes);
			console.log('reviews: ' + $scope.reviews);
			console.log('derp');
		},
		error: function(){
		}
	});
	}


	$scope.upvote_review = function(quiz, answer, review){
		QuizAPI.rate_peer_review({
			quiz_id: quiz.quizId,
			answer_id: answer.id,
			review_id: review.id,
			userhash: $routeParams.userHash,
			rating: 1,
			success: function(){
				review.rating = 1;
			},
			error: function(){}
		});
	}

	$scope.downvote_review = function(quiz, answer, review){
		QuizAPI.rate_peer_review({
			quiz_id: quiz.quizId,
			answer_id: answer.id,
			review_id: review.id,
			userhash: $routeParams.userHash,
			rating: -1,
			success: function(){
				review.rating = -1;
			},
			error: function(){}
		});
	}

	$scope.get_answer_template = function(item){
		return '/assets/js/app/views/quiz/answer_formats/' + item.item_type + '.html';
	}
}]);

