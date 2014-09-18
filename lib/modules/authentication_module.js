var AUTHENTICATION = (function(){
	var _public = {};

	_public.log_user = function(username){
		$.jStorage.set('quiz_username', username);
		$.cookie('quiz_username', username);
	}

	_public.get_user = function(){
		return $.cookie('quiz_username') || $.jStorage.get('quiz_username');
	}

	return _public;
})();