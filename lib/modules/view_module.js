var VIEW = (function(TEMPLATE, API, ANSWER_READER){
	var _public = {};

	var peer_review_display = function(quiz_object, options){
		$(quiz_object).find('button.submit-quiz').html('<span class="glyphicon glyphicon-ok"></span> Sending ...').attr('disabled', true);
		alert(JSON.stringify(options.answer))
	}

	_public.quiz_display = function(quiz_object, options){
		var quiz_id = ( options && options.quizId ) ? options.quizId : $(quiz_object).attr('data-quizId');

		$(quiz_object).attr('data-quizId', quiz_id).html(TEMPLATE.render_loading());

        API.get_quiz({
            id: quiz_id,
            done: function(quiz){
                $(quiz_object).addClass('panel panel-default quiz-container').html(TEMPLATE.render_quiz(quiz));
                $(quiz_object).find('form').bind('submit', function(e){
                    e.preventDefault();
                    
                    var answer = ANSWER_READER.read_answers({
                        quiz: $(quiz_object).closest('.quiz-container')
                    });   

                    peer_review_display(quiz_object, { quiz_id: quiz_id, answer: answer })
                });
            },
            fail: function(){
                $(quiz_object).html(TEMPLATE.render_error());
            }
        });
	}

	return _public;

})(TEMPLATE, API, ANSWER_READER);