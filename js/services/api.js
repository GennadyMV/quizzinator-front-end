QuizApp.service('API', ['$http', 'AnswerFormatter', function($http, AnswerFormatter){
	var _public = {};

	//var API_URL = 'http://t-aale.users.cs.helsinki.fi';
	var API_URL = 'http://localhost:8080';

	_public.get_quiz = function(options){
		$http({
			method: 'GET',
			url: API_URL + '/quiz/' + options.id,
			params: { username: options.username }
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
			data: angular.toJson({ answer: angular.toJson(AnswerFormatter.output(options.quiz)), user: options.user })
		}).success(function(answer_response){
			if(!answer_response.answers) options.success([]);

			answer_response.answers.forEach(function(review){
				review.answer = angular.fromJson(review.answer);
				review.selected = false;
			});

			options.success(answer_response);
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
		    data: angular.toJson({ reviewer: options.reviewer, review: options.review.content })
		}).success(function(){
			options.success();
		}).error(function(){
			options.error();
		});
	}
	
	return _public;
}]);
