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

	_public.submit_answer = function(options){
			$.ajax(
				API_URL + '/quiz/' + options.id + '/answer',
				{
					type: 'post',
					contentType: 'application/json',
					dataType: 'json',
					data: JSON.stringify(options.answer)
				})
			.done(function(data){
				options.done(data);
			})
			.fail(function(){
				options.fail();
			});
	};
	
	return _public;
})();
