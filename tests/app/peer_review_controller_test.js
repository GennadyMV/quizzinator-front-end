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
      get_peer_reviews: function(options){
        options.success([
          {
            answerer: 'Kalle',
            answer: 'Kallen vastaus',
            selected: false
          },
          {
            answerer: 'Toni',
            answer: 'Vastaukseni',
            selected: false
          },
          {
            answerer: 'Kalle',
            answer: 'Vastaukseni',
            selected: false
          }
        ]);
      }
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

  it('should keep peer review form hidden if user has not answered quiz', function(){
    scope.id = 1;

    scope.$parent.quiz_info = {};

    scope.$parent.quiz_info['1'] = {
      title: 'Arton kyssäri',
      answered: false,
      answering_expired: false,
      reviewing_expired: false
    };

    scope.$apply();

    expect(scope.has_answered).toBe(false);
  });

  it('should show peer review form when user has answered quiz', function(){
    scope.id = 3;

    scope.$parent.quiz_info = {};

    scope.$parent.quiz_info['3'] = {
      title: 'Kallen kyssäri',
      answered: true,
      answering_expired: false,
      reviewing_expired: false
    };

    scope.$apply();

    expect(scope.has_answered).toBe(true);
  });

  it('should not see peer review form after reviewing deadline has passed', function(){
    scope.id = 3;

    scope.$parent.quiz_info = {};

    scope.$parent.quiz_info['3'] = {
      title: 'Tonin kyssäri',
      answered: true,
      answering_expired: false,
      reviewing_expired: true
    };

    scope.$apply();

    expect(scope.reviewing_expired).toBe(true);
  });

  it('should show peer review form when there are peer reviews', function(){
    scope.id = 3;

    scope.$parent.quiz_info['3'] = {
      title: 'Ilmarin kyssäri',
      answered: true,
      answering_expired: false,
      reviewing_expired: false
    };

    scope.$apply();

    expect(scope.current_peer_reviews.length).toBe(2);
  });

  it('should have correct amount of peer review rounds', function(){
    scope.id = 3;

    scope.$parent.quiz_info['3'] = {
      title: 'Ilmarin kyssäri',
      answered: true,
      answering_expired: false,
      reviewing_expired: false
    };

    scope.$apply();

    expect(scope.rounds).toBe(2);
    expect(scope.current_round).toBe(1);
  });

});
