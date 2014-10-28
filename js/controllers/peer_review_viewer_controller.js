QuizApp.controller('PeerReviewViewerController', ['$scope', 'API', function($scope, API){
	$scope.count;
	$scope.peer_reviews = [];
	$scope.current_peer_reviews = [];
	$scope.current_index;

	$scope.init = function(item) {
		$scope.count = item.count;
		$scope.current_index = 0;
		get_peer_reviews();
	}

	$scope.list_peer_reviews_forward = function() {
		for(i=0;i < $scope.count;i++) {
			if($scope.current_index < $scope.peer_reviews) {
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

	get_peer_reviews = function() {
		API.get_peer_reviews({
			id: $scope.parent.quiz_id,
			success: function(reviews) {
				$scope.peer_reviews = reviews;
			}
		})
	}
}]);