describe('PeerReviewController', function(){
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
            reviewable:true
          }));
        }
      },
      answer_quiz: function(options) {
        if(options.quiz.id == 3){
          options.success(
            {
              answers: [
                {
                  id: 1,
                  user: 'kalle',
                  ip: '',
                  url: null,
                  answer: [{"question":"what's up?","value":"jees!","item_type":"open_question"}]
                }
              ]
            });
        } else {
          options.success([]);
      }}
    }
  })();

  beforeEach(inject(function($controller, $rootScope) {
    $controller('MainController', {
      $scope: $rootScope
    });

    scope = $rootScope.$new();
    ctrl = $controller('PeerReviewController', {
        $scope: scope,
        API: QuizAPiMock
    });
    scope.username = 'kalle';
  }));

  it('should keep peer review form hidden if there are no peer reviews', function(){
    scope.id = 1;

    scope.$parent.new_peer_review = { title: 'Lorem ipsum', id: 1, peer_reviews: [], userhash: 'abc' };

    expect(scope.hidden).toBe(true);
  });

  it('should show peer review form when there are peer reviews', function(){
    scope.id = 1;

    scope.$parent.new_peer_review = { title: 'Lorem ipsum', id: 1, peer_reviews: [{ user: 'kalle', answer: '' }], userhash: 'abc' };
    scope.$apply();

    expect(scope.hidden).toBe(false);
    expect(scope.current_peer_reviews.length).toBe(1);
  });

  it('should have correct amount of peer review rounds', function(){
    scope.id = 1;

    scope.$parent.new_peer_review = { title: 'Lorem ipsum', id: 1, peer_reviews: [{ user: 'kalle', answer: '' }, { user: 'henri', answer: '' }, { user: 'toni', answer: '' }], userhash: 'abc' };
    scope.$apply();

    expect(scope.rounds).toBe(2);
    expect(scope.current_round).toBe(1);
    expect(scope.current_peer_reviews.length).toBe(2);
  });

});
