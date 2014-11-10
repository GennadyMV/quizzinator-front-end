QuizApp.controller('QuizController', ['$scope', '$sce', '$interval', 'Authentication', 'API', function($scope, $sce, $interval, Authentication, API){

	var _click_buffer = [];

	$scope.username = $scope.$parent.username;

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

					$scope.$parent.quiz_info[quiz.id.toString()] = { title: quiz.title, answered: quiz.answered, answering_expired: quiz.answering_expired, reviewing_expired: quiz.reviewing_expired };
				},
				error: function(){
					$scope.view = get_path('error.html');
				}
			});
		}
	}

	$scope.register_click = function($event){
		var username = Authentication.get_user();

		_click_buffer.push({
			username: username,
			quiz_id: $scope.quiz_id,
			timestamp: new Date(),
			x: $event.clientX,
			y: $event.clientY
		});
	}

	$scope.widget_view = function(type){
		return get_path('widgets/' + type + '.html');
	}

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
		$scope.$parent.quiz_info[$scope.quiz.id.toString()].answered = false;
		$scope.show_username_form = false;
	}

	$scope.send_answer = function(){
		if($scope.quiz.answering_expired){ return; }

		API.answer_quiz({
			quiz: $scope.quiz,
			user: Authentication.get_user(),
			success: function(answer_response){
				$scope.userhash = answer_response.userhash;

				$scope.quiz.answered = true;

				$scope.$parent.quiz_info[$scope.quiz.id.toString()].answered = true;

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
		for(quiz in $scope.$parent.quiz_info){
			$scope.$parent.quiz_info[quiz].answered = false;
		}

		Authentication.log_out_user();

		$scope.$parent.username = null;
	}

	$scope.toggle_quiz = function(){
		$scope.quiz.is_open = !$scope.quiz.is_open;
	}

	$interval(function(){
		if(_click_buffer.length > 0){
			// Send buffer to back-end
		}

		console.log(_click_buffer);
		_click_buffer = [];
	}, 6000);

	$(window).unload(function(){
		// Send rest of the buffer before leaving
	});

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

	function get_path(template){
		return $scope.$parent.templates_path + '/' + template;
	}
}]);
