describe('QuizController', function(){
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
  				  if(options.id == 2) {
              options.error();
            } else {
              options.success(AnswerFormatter.input({id: options.id,
  				    title:"hurr durr?",
  					  items:angular.toJson([{question:"derpderpderp",item_type:"open_question"}]),
  					  quizAnswers:[],
  					  reviewable:true,
              answered: true,
              answering_expired: false,
              reviewing_expired: false,
              myLatestAnswer: angular.toJson({id:4,answer:[{question:"derpderpderp",value:"kokookok",item_type:"open_question",max_length:50,index:0}]})
  					}));
          }
  			},
  			answer_quiz: function(options) {
          options.success({});
        }
  		}
  	})();

  	var AuthenticationMock = (function(){
  		return {
      		log_user: function(){},
      		get_user: function(){return 'Hattumies'}
  		}
  	})();

  	beforeEach(inject(function($controller, $rootScope) {
    	$controller('MainController', {
        $scope: $rootScope
      });

      scope = $rootScope.$new();
    	ctrl = $controller('QuizController', {
      		$scope: scope,
      		Authentication: AuthenticationMock,
      		API: QuizAPiMock
    	});

      scope.username = 'kalle';

      scope.init(angular.toJson({ 'id' : 1 }));
    }));

    it('should be initialized correctly with username', function() {
    	expect(scope.quiz.title).toBe('hurr durr?');
    	expect(scope.quiz.items[0].question).toContain("derpderpderp");
  		expect(scope.quiz.items.length).toBe(1);
    });

    it('should be initialized correctly without username', function() {
      scope.username = null;

      scope.init(angular.toJson({ 'id' : 1 }));

      expect(scope.view).toContain('login.html');
    });

    it('should present the view correctly when given user name', function() {
      expect(scope.view).toContain('quiz_form.html');
    });

    it('should be able to change users', function() {
      scope.init(angular.toJson({'id':1}));

      expect(scope.username).toBe('kalle');
      scope.new_username = 'Hattumies';
      scope.change_username();
      expect(scope.username).toBe('Hattumies');
    });

    it('should render error message when id is not found', function() {
      scope.init(angular.toJson({ 'id' : 2 }));

      expect(scope.view).toContain('error.html');
    });

    it('shloud be open if it has not been set to be closed', function() {
      scope.toggle_quiz();
      expect(scope.quiz.is_open).toBe(true);
    });

    it('should show correctly when quiz is set to be closed', function() {
      scope.toggle_quiz();
      scope.toggle_quiz();
      expect(scope.quiz.is_open).toBe(false);
    });

    it('should be able to answer the quiz', function(){
      scope.send_answer();

      expect(scope.quiz.answered).toBe(true);
    });

    it('should show last answer when quiz loads', function() {
      expect(scope.quiz.my_latest_answer[0].value).toBe("kokookok");
    });

    it('should be able to logout user by using authentication module', function(){
      scope.$apply();

      Auth.logout({ scope: scope });

      scope.$apply();

      expect(scope.username).toBe(null);
    });

    it('should be able to login user by using authentication module', function(){
      scope.$apply();

      Auth.login('Kalle', { scope: scope });

      scope.$apply();

      expect(scope.username).toBe('Kalle');
    });

});
