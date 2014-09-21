var ANSWER_READER = (function(){
	var _public = {};

	var readers = {
		open_question: function(item){
			var question = $(item).find('.open-question-question').text();
			var value = $(item).find('.open-question-value').val();

			return {
				question: question,
				value: value
			};
		},
		multiple_choice_question: function(item){
			var question = $(item).find('.multiple-choice-question-question').text();
			var value = $(item).find('input[type="radio"]:checked').val();

			return {
				question: question,
				value: value
			};
		},
		checkbox_question: function(item){
			var question = $(item).find('.checkbox-question-question').text();
			var checked = $(item).find('input[type="checkbox"]:checked');

			return {
				question: question,
				value: $.map(checked, function(check){ return $(check).val() })
			};
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