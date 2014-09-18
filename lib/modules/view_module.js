var VIEW = (function(TEMPLATE, API, ANSWER_READER, AUTHENTICATION){
	var _public = {};

	var peer_review_display = function(quiz_object, options){
        $(quiz_object).html(TEMPLATE.render_peer_review());
		//$(quiz_object).find('button.submit-quiz').html('<i class="fa fa-send"></i> Sending ...').attr('disabled', true);
		//alert(JSON.stringify(options.answer))
	}

    var quiz_authenticate_display = function(quiz_object, options){ 
        $(quiz_object).html(TEMPLATE.render_login());
        $(quiz_object).find('.log-in-form').bind('submit', function(e){
            e.preventDefault();

            AUTHENTICATION.log_user($('.log-in-username').val());

            $(quiz_object).find('.logged-username').html(AUTHENTICATION.get_user());
            $('.quiz-container').trigger('authenticate');

            quiz_form_display(quiz_object, { quiz: options.quiz });
        });
    }

    var quiz_form_display = function(quiz_object, options){
        $(quiz_object).html(TEMPLATE.render_quiz(options.quiz));
        $(quiz_object).find('.change-username').bind('click', function(){
            $(quiz_object).find('.new-username-form').toggle();
            
            $(quiz_object).find('.set-new-username').bind('click', function(){
                AUTHENTICATION.log_user($(quiz_object).find('.new-username').val());
                
                $(quiz_object).find('.new-username-form').hide();
                $('.quiz-container').trigger('new_username');
            });
        });

        $('.logged-username').html(AUTHENTICATION.get_user());

        $(quiz_object).find('form').bind('submit', function(e){
            e.preventDefault();
            
            var answer = ANSWER_READER.read_answers({
                quiz: $(quiz_object).closest('.quiz-container')
            });   

            peer_review_display(quiz_object, { answer: answer })
        });
    }

	_public.quiz_display = function(quiz_object, options){
		var quiz_id = ( options && options.quizId ) ? options.quizId : $(quiz_object).attr('data-quizId');

		$(quiz_object).attr('data-quizId', quiz_id).html(TEMPLATE.render_loading());

        API.get_quiz({
            id: quiz_id,
            done: function(quiz){
                $(quiz_object).addClass('quiz-panel quiz-container');

                $('.quiz-container').on('authenticate', function(){
                    quiz_form_display(quiz_object, { quiz: quiz });
                });

                $('.quiz-container').on('new_username', function(){
                    $(quiz_object).find('.logged-username').html(AUTHENTICATION.get_user());
                });
                
                if(AUTHENTICATION.get_user()){
                    quiz_form_display(quiz_object, {
                        quiz: quiz
                    });
                }else{
                    quiz_authenticate_display(quiz_object, { 
                        quiz: quiz 
                    });
                }
            },
            fail: function(){
                $(quiz_object).html(TEMPLATE.render_error());
            }
        });
	}

	return _public;

})(TEMPLATE, API, ANSWER_READER, AUTHENTICATION);