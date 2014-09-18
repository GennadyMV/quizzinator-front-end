$.fn.extend({
    quiz: function(options){
        return this.each(function(){
            var _this = this;            

            VIEW.quiz_display(_this, options);
        });
    }
});

$(document).ready(function(){
    $('.quiz-container').each(function(){
        $(this).quiz();
    });
});
