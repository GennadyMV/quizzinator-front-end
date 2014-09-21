var API = (function(){
	var _public = {};

	var API_URL = 'http://localhost:8080';

	_public.get_quiz = function(options){
<<<<<<< HEAD
		$.get(API_URL + '/quiz/' + options.id)
		.done(function(quiz){
			options.done(quiz);
		}).fail(function(){
			options.fail();
		});
	};

	_public.answer_quiz = function(options){
		$.ajax({
			type: 'POST',
			contentType: 'application/json',
			dataType: 'json',
			url: API_URL + '/quiz/' + options.quiz_id + '/answer',
			data: JSON.stringify({ answer: JSON.stringify(options.answer), user: options.user, ip: "192.168.0.0" }),
		}).done(function(peer_reviews){
			options.done(peer_reviews);
		}).fail(function(){
			options.fail();
		});
	}

	_public.send_peer_review = function(options){
		
	}
=======
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
>>>>>>> 70d2b406d6256c65611cd97902a277949193251a
	
	return _public;
})();
