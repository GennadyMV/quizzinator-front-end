QuizApp.service('API', ['$rootScope', '$http', 'AnswerFormatter', function($rootScope, $http, AnswerFormatter){
	var _public = {};

	var API_URL = $rootScope.api;

	_public.get_quiz = function(options){
		$http({
			method: 'GET',
			url: API_URL + '/quiz/' + options.id,
			params: { username: options.username }
		}).success(function(quiz){
			options.success(AnswerFormatter.input(quiz, API_URL));
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
			options.success(answer_response);
		}).error(function(){
			options.error();
		});
	};

	_public.get_peer_reviews = function(options){
		$http({
			method: 'GET',
			url: API_URL + '/quiz/' + options.quiz + '/review_answers',
			params: { username: options.username}
		}).success(function(answer_response){
			if(!answer_response) options.success([]);

			answer_response.forEach(function(review){
				review.answer = angular.fromJson(review.answer);
				review.selected = false;
			});

			options.success(answer_response);
		}).error(function(){
			options.error();
		});
	};

	_public.get_peer_reviews_by_quiz = function(options){
		$http({
			method: 'GET',
			url: API_URL + '/quiz/' + options.quiz + '/reviews',
			params: {username: options.username, reviewCount: options.review_count}
		}).success(function(peer_reviews){
			options.success(peer_reviews);
		});
	};

	_public.get_peer_reviews_by_user = function(options){
		$http({
			method: 'GET',
			url: API_URL + '/reviews',
			params: {username: options.username}
		}).success(function(peer_reviews){
			options.success(peer_reviews);
		})
	}

	_public.rate_peer_review = function(options){
		$http({
			method: 'POST',
			url: API_URL + '/quiz/' + options.quiz + '/answer/' + options.answer + '/review/' + options.review + '/rate',
			params: {userhash: options.user, rating: options.rating}
		}).success(function(){
			options.success();
		}).error(function(){
			options.error();
		});
	};

	_public.send_peer_review = function(options){
		$http({
			method: 'POST',
			url: API_URL + '/quiz/' + options.quiz + '/answer/' + options.review.id + '/review',
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
	};
        
        _public.send_clicks = function(options){
                $http({
                    method: 'POST',
                    url: API_URL + '/clicks',
                    dataType: 'json',
                    headers: { 'Content-Type':'application/json' },
                    data: {
                            user: options.username,
                            quizId: options.quiz_id,
                            clicks: options.events
                    }
                })
                .success(options.success)
                .error(options.error);
            
        };

	return _public;
}]);
