var ANSWER_READER = (function(){
	var _public = {};

	var readers = {
		open_question: function(item){
			var value = $(item).find('.open-question-value').val();

			return {
				value: value
			}
		},
		multiple_choice: function(item){
			var value = $(item).find('.quiz-radio input[name="choice"]:checked').val();

			return {
				value: value
			}
		}
	}

	_public.read_answers = function(options){
		var quiz_element = options.quiz;
		var answers = [];

		$(quiz_element).find('.quiz-item').each(function(){
			var item = $(this);
			var type = $(item).attr('data-type');

			answers.push(readers[type](item));
		});

		return answers;
	}

	return _public;
})();