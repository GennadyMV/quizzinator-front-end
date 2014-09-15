'use strict'

describe('Quiz plugin', function(){
	// Mock dat api
	var API = (function(){
		var _public = {};

		_public.get_quiz = function(options){
			options.done({
				title: 'Wazzup?',
				items: []
			});
		}

		return _public;
	})();

	it('should render quiz correctly', function(){
		API.get_quiz({
			done: function(quiz){
				expect(quiz.title).toBe('Wazzup?');
			}
		})
		
	});
});