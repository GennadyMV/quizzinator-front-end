QuizApp.controller('QuizController', ['$scope', 'Authentication', 'API', function($scope, Authentication, API){
	$scope.username = $scope.$parent.username;
	$scope.show_quiz = true;

	/*
	*	id: id of the quiz, f.e. { id: 1 }.
	*/
	$scope.init = function(options){
		options = angular.fromJson(options);

		$scope.quiz_id = options.id;

		if(!$scope.username){
			$scope.view = get_path('login.html');
		}else{
			API.get_quiz({
				id: $scope.quiz_id,
				username: $scope.username,
				success: function(quiz){
					$scope.quiz = quiz;
					$scope.view = get_path('quiz_form.html');
				},
				error: function(){
					$scope.view = get_path('error.html');
				}
			});
		}
	}

	/*
	*	type: type of the widget, f.e 'open_question'.
	*/
	$scope.widget_view = function(type){
		return get_path('widgets/' + type + '.html');
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
					$scope.view = get_path('answered.html');
				}else{
					$scope.peer_reviews = peer_reviews;
					$scope.peer_reviews[0].selected = true;
					$scope.view = get_path('peer_review_form.html');
					$scope.peer_review_content = '';
				}
			},
			error: function(){
				$scope.view = get_path('error.html');
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
				$scope.view = get_path('quiz_form.html');
			},
			error: function(){
				$scope.view = get_path('error.html');
			}
		});
	}

	$scope.logout = function(){
		Authentication.log_out_user();

		$scope.$parent.username = null;
	}

	/*
	*	review: review object to choose.
	*/
	$scope.choose_review = function(review){
		$scope.peer_reviews.forEach(function(r){
			r.selected = false;
		});

		review.selected = true;
	}

	/*
	*	perr_review_content: content of the review
	*/
	$scope.send_peer_review = function(peer_review_content){
		var selected_peer = $.grep($scope.peer_reviews, function(peer){
			return peer.selected;
		})[0];

		API.send_peer_review({
			reviewer: $scope.username,
			quiz: $scope.quiz,
			review: { id: selected_peer.id, content: peer_review_content },
			success: function(){
				$scope.view = get_path('answered.html');
			},
			error: function(){
				$scope.view = get_path('error.html');
			}
		});	
	}

	$scope.toggle_quiz = function(){
		$scope.show_quiz = !$scope.show_quiz;
	}

	$scope.$parent.$watch('username', function(new_val, old_val){
		$scope.username = $scope.$parent.username;

		if($scope.view == get_path('login.html') && $scope.username){
			API.get_quiz({
				id: $scope.quiz_id,
				success: function(quiz){
					$scope.quiz = quiz;
					$scope.view = get_path('quiz_form.html');
				},
				error: function(){
					$scope.view = get_path('error.html');
				}
			});
		}

		if($scope.view != get_path('login.html') && $scope.username == null){
			$scope.view = get_path('login.html');
		}
	});


	/*
	*	template: file name of the template.
	*/
	function get_path(template){
		return $scope.$parent.templates_path + '/' + template;
	}
}]);