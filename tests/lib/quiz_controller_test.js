describe('CreateQuizController', function(){
  	var ctrl, scope, AnswerFormatter;

  	beforeEach(function(){
		module('QuizApp');

		inject(function(_AnswerFormatter_){
			AnswerFormatter = _AnswerFormatter_;
		});
	});

  	var QuizAPiMock = (function(){
  		return {
  			create_quiz: function(options){
  				options.done()
  			},
  			get_quiz: function(options) {
  				options.success(AnswerFormatter.input({id:1,
  					title:"hurr durr?",
  					items:JSON.stringify([{question:"derpderpderp",item_type:"open_question",$$hashKey:"003"}]),
  					quizAnswers:[],
  					reviewable:true
  					}));
  			}
  			send_answer: function(options) {
  				options.success({
  					quiz: {
  						title:"hurr durr?",
  						items:JSON.stringify([{question:"derpderpderp",item_type:"open_question",$$hashKey:"003"}]),
  						quizAnswers:[],
  						reviewable:true
  					}
  					user: AuthenticationMock.get_user();
  				})
  			}
  		}
  	})();

  	var AuthenticationMock = (function(){
  		return {
  			add_to_storage: function(){},
      		fetch_from_storage: function(){},
      		log_user: function(){},
      		get_user: function(){return 'Hattumies'}
  		}
  	})()

  	beforeEach(inject(function($controller, $rootScope) {
    	scope = $rootScope.$new();
    	ctrl = $controller('QuizController', {
      		$scope: scope,
      		Authentication: AuthenticationMock,
      		API: QuizAPiMock
    	});
    }));

    it('should be initialized correctly', function() {
    	scope.init(1);
    	expect(scope.quiz.title).toBe('hurr durr?');
    	expect(scope.quiz.items[0].question).toContain("derpderpderp");
  		expect(scope.quiz.items.length).toBe(1);
    })

    it('should add a question correctly')
    
});