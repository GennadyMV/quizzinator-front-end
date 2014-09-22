QuizApp.service('API', ['$http', 'AnswerFormatter', function($http, AnswerFormatter){
	var _public = {};

	var API_URL = 'http://localhost:8080';

	_public.get_quiz = function(options){
		$http({
			method: 'GET',
			url: API_URL + '/quiz/' + options.id,
		}).success(function(quiz){
			options.success(AnswerFormatter.input(quiz));
		}).error(function(){
			options.error();
		});
	};

	_public.answer_quiz = function(options){
		$http({
			method: 'POST',
			url: API_URL + '/quiz/' + options.quiz.id + '/answer',
			dataType: 'json',
			headers: {
		       "Content-Type": "application/json"
		    },
			data: JSON.stringify({ answer: JSON.stringify(AnswerFormatter.output(options.quiz)), user: options.user, ip: "192.168.0.0" })
		}).success(function(peer_reviews){
			peer_reviews.forEach(function(review){
				review.answer = JSON.parse(review.answer);
				review.selected = false;
			});

			options.success(peer_reviews);
		}).error(function(){
			options.error();
		});
	}

	_public.send_peer_review = function(options){
		$http({
			method: 'POST',
			url: API_URL + '/quiz/' + options.quiz.id + '/answer/' + options.review.id + '/review', 
			dataType: 'json',
			headers: {
		       "Content-Type": "application/json"
		    },
		    data: JSON.stringify({ reviewer: options.reviewer, review: options.review.content })
		}).success(function(){
			options.success();
		}).error(function(){
			options.error();
		});
	}
	
	return _public;
}]);