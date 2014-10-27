QuizApp.controller('PeerReviewViewerController', ['$scope', 'API', function($scope, API){
	$scope.number_of_reviews_on_list = 5;
	$scope.peer_reviews = [];
	$scope.current_peer_reviews = [];
	$scope.current_index;

	$scope.get_peer_reviews = function() {
		API.get_peer_reviews({
			id: $scope.quiz_id,
			success: function(reviews) {
				$scope.peer_reviews = reviews;
				$scope.current_index = 0;
			}
		})
	}

	$scope.list_peer_reviews_forward = function() {
		for(i=0;i < $scope.number_of_reviews_on_list;i++) {
			if($scope.current_index < $scope.peer_reviews) {
			$scope.current_peer_reviews[i] = $scope.peer_reviews[$scope.current_index;
			$scope.curent_index++; 
			}
		}
	}

	$scope.list_peer_reviews_backwards = function() {
		for(i=0;i < $scope.number_of_reviews_on_list;i++) {
			if($scope.current_index >= 0) {
			$scope.current_peer_reviews[i] = $scope.peer_reviews[$scope.current_index;
			$scope.curent_index--; 
			}
		}
	}
}]);