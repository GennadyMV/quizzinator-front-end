QuizApp.directive('quiz', function(){
	return {
		link: function(scope, elem, attrs){
			$(elem).addClass('quiz-panel quiz-container');
		}
	}
});