describe('PeerReviewViewerController', function(){
	var ctrl, scope;

	beforeEach(function(){
    module('QuizApp');
	});

  	var QuizAPiMock = (function(){
  		return {
  			get_peer_reviews_by_quiz: function(options){
  				options.success([{"id":1,"reviewer":"Masa","review":"Aika vÃ¤lkkyÃ¤.","rateCount":5,"totalRating":5,"answerId":1},{"id":2,"reviewer":"Epinator","review":"MASA PERKELE","rateCount":5,"totalRating":1,"answerId":2},{"id":3,"reviewer":"Ilmu","review":"Olet _huono","rateCount":4,"totalRating":-2,"answerId":3}]);
			},
			rate_peer_review: function(options){
				options.success();
			}
  		}
  	})();

  	beforeEach(inject(function($controller, $rootScope) {
    	scope = $rootScope.$new();
    	ctrl = $controller('PeerReviewViewerController', {
      		$scope: scope,
      		API: QuizAPiMock
    	});
      scope.username = 'kalle';
      scope.get_peer_reviews();
    }));

    it('should be able to get peer reviews', function(){
    	expect(scope.peer_reviews.length).toBe(3);
    });

    it('should be able to rate peer reviews', function(){
    	expect(scope.peer_reviews[0].not_rated).toBe(true);
    	scope.rate(scope.peer_reviews[0], 1);
    	expect(scope.peer_reviews[0].not_rated).toBe(false);

    	expect(scope.peer_reviews[1].not_rated).toBe(true);
    	scope.rate(scope.peer_reviews[1], -1);
    	expect(scope.peer_reviews[1].not_rated).toBe(false);
    })
})