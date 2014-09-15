var API = (function(){
	var _public = {};

	var API_URL = 'http://localhost:8080';

	_public.get_quiz = function(options){
			$.get(API_URL + '/quiz/' + options.id)
			.done(function(data){
				options.done(data);
 			}).fail(function(){
 				options.fail();
 			});
		};

	_public.create_quiz = function(options){
			$.post(API_URL + '/quizAnswers/' + options.quizId, JSON.stringify(options.answer))
			.done(function(data){
				options.done(data);
			}).fail(function(){
				options.fail();
			})
	}
	
	return _public;
})();
