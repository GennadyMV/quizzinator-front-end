$.fn.extend({
    quiz: function(options){
        return this.each(function(){
            var _this = this;            
            var quiz_id = ( options && options.quizId ) ? options.quizId : $(_this).attr('data-quizId');

            $(_this).attr('data-quizId', quiz_id);
            $(_this).html(TEMPLATE.render_loading());
            
            API.get_quiz({
                id: quiz_id,
                done: function(quiz){
                    $(_this).addClass('panel panel-default quiz-container');
                    $(_this).html(TEMPLATE.render_quiz(quiz));

                    $(_this).find('form').bind('submit', function(e){
                        e.preventDefault();
                        
                        var answer = ANSWER_READER.read_answers({
                            quiz: $(this).closest('.quiz-container')
                        });   

                        API.create_quiz({ 
                            quizId: quizId,
                            answer: answer,
                            done: function() {
                                console.log('ok');
                            },
                            fail: function() {
                                console.log('fail');
                            }
                        });
                    });
                },
                fail: function(){
                    $(_this).html(TEMPLATE.render_error());
                }
            });
        });
    }
});

$(document).ready(function(){
    $('.quiz-container').each(function(){
        if($(this).is(':empty')){
            $(this).quiz();
        }
    });
});