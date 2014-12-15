QuizApp.service('Authentication', function(){

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

	_public.log_out_user = function(){
		$.removeCookie('quiz_username');
		$.jStorage.deleteKey('quiz_username');
	}

	return _public;

});
