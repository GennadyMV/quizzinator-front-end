describe('ReviewsController', function(){
	var ctrl, scope;

	beforeEach(function(){
    module('QuizApp');
	});

	var QuizAPiMock = (function(){
  		return {
  			get_peer_reviews_by_user: function(options){
  				options.success([{"id":1,"reviewer":"Masa","review":"Aika vÃ¤lkkyÃ¤.","rateCount":5,"totalRating":5,"answerId":1},{"id":2,"reviewer":"Epinator","review":"MASA PERKELE","rateCount":5,"totalRating":1,"answerId":2},{"id":3,"reviewer":"Ilmu","review":"Olet _huono","rateCount":4,"totalRating":-2,"answerId":3}]);
				},
				rate_peer_review: function(options){
					options.success();
				}
  		}
  	})();

  	beforeEach(inject(function($controller, $rootScope) {
    	scope = $rootScope.$new();
    	ctrl = $controller('ReviewsController', {
      		$scope: scope,
      		API: QuizAPiMock
    	});
      scope.username = 'kalle';
      scope.init();
    }));

  	it('should be able to get peer reviews', function(){
    	expect(scope.reviews.length).toBe(3);
    });

    it('should be able to rate peer reviews', function(){
    	expect(scope.reviews[0].rated).toBe(undefined);
    	scope.rate(scope.reviews[0], 1);
    	expect(scope.reviews[0].rated).toBe(true);

    	expect(scope.reviews[1].rated).toBe(undefined);
    	scope.rate(scope.reviews[1], -1);
    	expect(scope.reviews[1].rated).toBe(true);
    })
})
