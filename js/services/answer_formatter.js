QuizApp.service('AnswerFormatter', ['$sce', function($sce){
	var _public = {};

	var basic_input_formatter = function(item, type){
		return {
			question: item.question,
			value: '',
			item_type: type
		}
	}

	var input_formatters = {
		open_question: function(item){
			return basic_input_formatter(item, 'open_question');
		},
		multiple_choice_question: function(item){
			var format = basic_input_formatter(item, 'multiple_choice_question');
			format['options'] = item.options;

			return format;
		},
		checkbox_question: function(item){
			var format = basic_input_formatter(item, 'checkbox_question');
			format['checkboxes'] = $.map(item.checkboxes, function(checkbox){
				return {
					title: checkbox.title,
					value: false
				}
			});

			return format;
		},
		text_container: function(item){
			var format = basic_input_formatter(item, 'text_container');
			format['content'] = $sce.trustAsHtml(item.content);
			delete format['value'];

			return format;
		}
	}

	function basic_output_formatter(item){
		return {
			question: item.question,
			value: item.value
		}
	}

	var output_formatters = {
		open_question: function(item){
			return basic_output_formatter(item);
		},
		multiple_choice_question: function(item){
			return basic_output_formatter(item);
		},
		checkbox_question: function(item){
			var format = basic_output_formatter(item);

			var chosen = $.grep(item.checkboxes, function(checkbox){
				return checkbox.value;
			});

			format['value'] = $.map(chosen, function(checkbox){
				return checkbox.title;
			});

			return format;
		}
	}

	_public.input = function(quiz){
		var formatted = {
			title: quiz.title,
			answered: quiz.answered,
			id: quiz.id,
			items: []
		}

		var items = JSON.parse(quiz.items);
		items.forEach(function(item){
			if(typeof input_formatters[item.item_type] === 'function'){
				formatted.items.push(input_formatters[item.item_type](item));
			}
		});

		return formatted;
	}

	_public.output = function(quiz){
		var answers = [];

		quiz.items.forEach(function(item){
			if(typeof output_formatters[item.item_type] === 'function'){
				answers.push(output_formatters[item.item_type](item));
			}
		});

		return answers;
	}

	return _public;
}]);