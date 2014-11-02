QuizApp.controller('PeerReviewViewerController', ['$scope', 'API', 'Authentication', function($scope, API, Authentication){
	$scope.count;
	$scope.peer_reviews = [];
	$scope.current_peer_reviews = [];
	$scope.current_index;

	$scope.init = function(item) {
		$scope.count = item.count;
		$scope.current_index = 0;
		console.log('quizin id: ' + $scope.$parent.quiz.id)
		get_peer_reviews();
	}

	$scope.list_peer_reviews_forward = function() {
		for(i=0;i < $scope.count;i++) {
			if($scope.current_index < $scope.peer_reviews.length) {
			$scope.current_peer_reviews[i] = $scope.peer_reviews[$scope.current_index];
			$scope.curent_index++;
			}
		}
	}

	$scope.list_peer_reviews_backwards = function() {
		for(i=0;i < $scope.count;i++) {
			if($scope.current_index >= 0) {
			$scope.current_peer_reviews[i] = $scope.peer_reviews[$scope.current_index];
			$scope.curent_index--;
			}
		}
	}

	$scope.answer_view = function(item_type) {
		//console.log(item_type);
		return get_path('answers' + item_type + '.html');
	}

	function get_path(template){
		console.log($scope.templates_path + '/' + template);
    	return $scope.templates_path + '/' + template;
    }

	get_peer_reviews = function() {
		API.get_peer_reviews({
			quiz: $scope.$parent.quiz_id,
			username: Authentication.get_user(), 
			success: function(reviews) {
				$scope.peer_reviews = angular.fromJson(reviews);
				console.log($scope.peer_reviews);
				console.log($scope.peer_reviews[0].answer);
				$scope.list_peer_reviews_forward();
				console.log($scope.current_peer_reviews.length);
			}
		})
	}
}]);
