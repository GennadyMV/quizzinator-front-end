var AUTHENTICATION = (function(){
	var _public = {};

	function add_to_storage(key, value){
		$.jStorage.set(key, value);
		$.cookie(key, value);
	}

	function fetch_from_storage(key){
		return $.cookie(key) || $.jStorage.get(key);
	}

	_public.log_user = function(username){
		add_to_storage('quiz_username', username);
	}

	_public.get_user = function(){
		return fetch_from_storage('quiz_username');
	}

	/*_public.log_answer = function(quiz_id){
		if(!this.has_answered_quiz(quiz_id)){
			var data = fetch_from_storage('quiz_answers');

			if(!data){
				add_to_storage('quiz_answers', '[' + fetch_from_storage('quiz_username') + '&' + quiz_id + ']');
			}else{
				var data = fetch_from_storage('quiz_answers');
				data += (',[' + fetch_from_storage('quiz_username') + '&' + quiz_id + ']');

				add_to_storage('quiz_answers', data);
			}
		}
	}

	_public.has_answered_quiz = function(quiz_id){
		var data = fetch_from_storage('quiz_answers');

		if(!data){
			return false;
		}else{
			return data.split(',').indexOf('[' + fetch_from_storage('quiz_username') + '&' + quiz_id + ']') >= 0;
		}
	}*/

	return _public;
})();