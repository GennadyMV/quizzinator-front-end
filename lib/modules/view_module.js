var VIEW = (function(TEMPLATE, API, ANSWER_READER, AUTHENTICATION){
	var _public = {};

	var peer_review_display = function(quiz_object, options){
		$(quiz_object).find('button.submit-quiz').html('<i class="fa fa-send"></i> Sending ...').attr('disabled', true);

        API.answer_quiz({
            quiz_id: options.quiz_id,
            answer: options.answer,
            user: AUTHENTICATION.get_user(),
            done: function(peer_reviews){
                console.log(peer_reviews)

                var answers = [];
                peer_reviews.forEach(function(review){
                    answers.push({
                        id: review.id,
                        user: review.user,
                        answer: JSON.parse(review.answer)
                    });
                });

                $(quiz_object).html(TEMPLATE.render_peer_review({ answers: answers }));
                $(quiz_object).find('.peer-review-answer-body').bind('click', function(){
                    $(this).closest('.peer-review-container').find('.peer-review-answer-body').removeClass('selected');
                    $(this).addClass('selected');
                });

                $(quiz_object).find('.peer-review-submit').bind('click', function(){
                    var answer_id = $(quiz_object).find('.peer-review-answer-body.selected').attr('data-answerId');
                    var review = $(quiz_object).find('.peer-review-content').val();

                    API.send_peer_review({
                        quiz_id: options.quiz_id,
                        answer_id: answer_id,
                        review: review,
                        reviewer: AUTHENTICATION.get_user(),
                        done: function(){
                            alert('Done!')
                        },
                        fail: function(){
                            alert('fail');
                        }
                    });
                });
            },
            fail: function(){
                alert('fail!');
            }
        });
	}

    var quiz_authenticate_display = function(quiz_object, options){ 
        $(quiz_object).html(TEMPLATE.render_login());
        $(quiz_object).find('.log-in-form').bind('submit', function(e){
            e.preventDefault();

            AUTHENTICATION.log_user($('.log-in-username').val());

            $(quiz_object).find('.logged-username').html(AUTHENTICATION.get_user());
            $('.quiz-container').trigger('authenticate');

            quiz_form_display(quiz_object, { quiz_id: options.quiz_id });
        });
    }

    var quiz_form_display = function(quiz_object, options){
        $(quiz_object).attr('data-quizId', options.quiz_id).html(TEMPLATE.render_loading());

        API.get_quiz({
            id: options.quiz_id,
            done: function(quiz){
                $(quiz_object).html(TEMPLATE.render_quiz(quiz));

                $('.quiz-container').on('authenticate', function(){
                    quiz_form_display(quiz_object, { quiz_id: options.quiz_id });
                });

                $('.quiz-container').on('new_username', function(){
                    $(quiz_object).find('.logged-username').html(AUTHENTICATION.get_user());
                });

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

                    peer_review_display(quiz_object, { answer: answer, quiz_id: options.quiz_id })
                });
            }
        });
    }

	_public.quiz_display = function(quiz_object, options){
		var quiz_id = ( options && options.quizId ) ? options.quizId : $(quiz_object).attr('data-quizId');

        $(quiz_object).addClass('quiz-panel quiz-container');

        if(AUTHENTICATION.get_user()){
            quiz_form_display(quiz_object, { quiz_id: quiz_id });
        }else{
            quiz_authenticate_display(quiz_object, { quiz_id: quiz_id });
        }
	}

	return _public;

})(TEMPLATE, API, ANSWER_READER, AUTHENTICATION);