QuizApp.controller('QuizController', ['$scope', 'Authentication', 'API', function($scope, Authentication, API){
	$scope.username = $scope.$parent.username;

	$scope.init = function(quiz_id){
		$scope.quiz_id = quiz_id;

		if(!Authentication.get_user()){
			$scope.view = 'js/views/login.html';
		}else{
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
				}
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

	$scope.send_review = function(){
		
	}

	$scope.$parent.$watch('username', function(new_val, old_val){
		$scope.username = $scope.$parent.username;
	});
}]);