QuizApp.controller('QuizController', ['$scope', 'Authentication', 'API', function($scope, Authentication, API){
	$scope.username = $scope.$parent.username;

	$scope.init = function(quiz_id){
		$scope.quiz_id = quiz_id;

		if(!$scope.username){
			$scope.view = 'js/views/login.html';
		}else{
			API.get_quiz({
				id: $scope.quiz_id,
				username: $scope.username,
				success: function(quiz){
					$scope.quiz = quiz;
					$scope.view = 'js/views/quiz_form.html';
				},
				error: function(){
					$scope.view = 'js/views/error.html';
				}
			});
		}
	}

	$scope.widget_view = function(type){
		return 'js/views/widgets/' + type + '.html';
	}

	$scope.toggle_username_form = function(){
		$scope.show_username_form = !$scope.show_username_form;
	}

	$scope.change_username = function(){
		Authentication.log_user($scope.new_username);
		
		$scope.username = $scope.new_username;
		$scope.$parent.username = $scope.new_username;

		$scope.new_username = '';
		$scope.show_username_form = false;
	}

	$scope.send_answer = function(){
		API.answer_quiz({
			quiz: $scope.quiz,
			user: Authentication.get_user(),
			success: function(peer_reviews){
				if(!peer_reviews || peer_reviews.length == 0){
					$scope.view = 'js/views/answered.html';
				}else{
					$scope.peer_reviews = peer_reviews;
					$scope.view = 'js/views/peer_review_form.html';
					$scope.peer_review_content = '';
				}
			},
			error: function(){
				$scope.view = 'js/views/error.html';
			}
		});
	}

	$scope.login = function(){
		$scope.$parent.username = $scope.username;

		Authentication.log_user($scope.username);

		API.get_quiz({
			id: $scope.quiz_id,
			success: function(quiz){
				$scope.quiz = quiz;
				$scope.view = 'js/views/quiz_form.html';
			},
			error: function(){
				alert('fail');
			}
		});
	}

	$scope.choose_review = function(review){
		$scope.peer_reviews.forEach(function(r){
			r.selected = false;
		});

		review.selected = true;
	}

	$scope.send_peer_review = function(peer_review_content){
		var selected_peer = $.grep($scope.peer_reviews, function(peer){
			return peer.selected;
		})[0];

		API.send_peer_review({
			reviewer: $scope.username,
			quiz: $scope.quiz,
			review: { id: selected_peer.id, content: peer_review_content },
			success: function(){
				$scope.view = 'js/views/answered.html';
			},
			error: function(){
				$scope.view = 'js/views/error.html';
			}
		});	
	}

	$scope.$parent.$watch('username', function(new_val, old_val){
		$scope.username = $scope.$parent.username;

		if($scope.view == 'js/views/login.html' && $scope.username){
			API.get_quiz({
				id: $scope.quiz_id,
				success: function(quiz){
					$scope.quiz = quiz;
					$scope.view = 'js/views/quiz_form.html';
				},
				error: function(){
					$scope.view = 'js/views/error.html';
				}
			});
		}
	});
}]);