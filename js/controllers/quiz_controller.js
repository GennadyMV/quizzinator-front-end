QuizApp.controller('QuizController', ['$scope', '$sce', 'Authentication', 'API', function($scope, $sce, Authentication, API){
	$scope.username = $scope.$parent.username;

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

	/*
	* type: type of answer, f.e 'open-question'.
	*/
	$scope.answer_view = function(type){
		return get_path('answers/' + type + '.html');
	}

	$scope.toggle_username_form = function(){
		$scope.show_username_form = !$scope.show_username_form;
	}

	$scope.change_username = function(){
		Authentication.log_user($scope.new_username);

		$scope.username = $scope.new_username;
		$scope.$parent.username = $scope.new_username;

		$scope.new_username = '';
		$scope.quiz.answered = false;
		$scope.show_username_form = false;
	}

	$scope.send_answer = function(){
		API.answer_quiz({
			quiz: $scope.quiz,
			user: Authentication.get_user(),
			success: function(answer_response){
        $scope.userhash = answer_response.userhash;

				$scope.$parent.new_peer_review = { title: $scope.quiz.title, id: $scope.quiz_id, peer_reviews: answer_response.answers, userhash: answer_response.userhash };

				$scope.quiz.answered = true;

				$scope.view = get_path('answered.html');
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

	$scope.toggle_quiz = function(){
		$scope.quiz.is_open = !$scope.quiz.is_open;
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
