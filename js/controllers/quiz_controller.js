QuizApp.controller('QuizController', ['$rootScope', '$scope', '$sce', '$interval', 'Authentication', 'API', function($rootScope, $scope, $sce, $interval, Authentication, API){

	var _event_buffer = [];
	var _original_quiz_items = [];

  $rootScope._event_buffer = _event_buffer;
	$scope.username = $scope.$parent.username;

	function flush_event_buffer() {
		API.send_events({
			quiz_id: $scope.quiz.id,
			username: $scope.username,
			events: _event_buffer,
			success: function () {
				_event_buffer.length = 0;
			},
			error: function () {
				_event_buffer.length = 0;
			}
		});
	}

	function initialize_quiz(quiz){
		$scope.quiz = quiz;
		$scope.view = get_path('quiz_form.html');

		$scope.$parent.quiz_info[quiz.id.toString()] = {
			title: quiz.title,
			answered: quiz.answered,
			answering_expired: quiz.answering_expired,
			reviewing_expired: quiz.reviewing_expired,
			review_deadline: quiz.review_deadline
		};

		if(quiz.my_latest_answer){
			_original_quiz_items = $.extend([], $scope.quiz.items);

			quiz.my_latest_answer.forEach(function(answer){
				answer.event_handler = $scope.quiz.items[answer.index].event_handler;
				$scope.quiz.items[answer.index] = answer;
			});
		} else {
			var copied = [];
			$scope.quiz.items.forEach(function (item) {
				copied.push($.extend({}, item));
			});

			_original_quiz_items = copied;
		}
	}

	/**
	* Initialize the quiz
	*
	* @param options which contains the id of the quiz
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
					initialize_quiz(quiz);
				},
				error: function(){
					$scope.view = get_path('error.html');
				}
			});
		}
	};

	/**
	* Gives a template file path for the given widget type
	*
	* @param type of the widget
	*/
	$scope.widget_view = function(type){
		return get_path('widgets/' + type + '.html');
	};

	/**
	* Gives a template file path for the given answer type
	*
	* @param type of the answer
	*/
	$scope.answer_view = function(type){
		return get_path('answers/' + type + '.html');
	};

	/**
	* Toggles the username form (hidden or showing)
	*/
	$scope.toggle_username_form = function(){
		$scope.show_username_form = !$scope.show_username_form;
	};

	/**
	* Changes the current username
	*/
	$scope.change_username = function(){
		Authentication.log_user($scope.new_username);

		$scope.username = $scope.new_username;
		$scope.$parent.username = $scope.new_username;

		$scope.new_username = '';
		$scope.quiz.answered = false;
		$scope.$parent.quiz_info[$scope.quiz.id.toString()].answered = false;
		$scope.show_username_form = false;
	};

	/**
	* Clears the user's current answer
	*/
	$scope.clear_answer = function(){
		if(confirm('Are you sure you want to clear your answer?')){
      var copied = [];
      _original_quiz_items.forEach(function(item) {
          copied.push($.extend({}, item));
      });
      $scope.quiz.items = copied;
		}
	};

	/**
	* Sends user's current asnwer to the server
	*/
	$scope.send_answer = function(){
		if(!$scope.quiz.can_answer){ return; }

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
	};

	/**
	* Logs user in
	*/
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
	};

	/**
	* Logs user out
	*/
	$scope.logout = function(){
		for(quiz in $scope.$parent.quiz_info){
			$scope.$parent.quiz_info[quiz].answered = false;
		}

		Authentication.log_out_user();

		$scope.$parent.username = null;
	};

	/**
	* Toggles the quiz (hidden or showing)
	*/
	$scope.toggle_quiz = function(){
		$scope.quiz.is_open = !$scope.quiz.is_open;
	};

	$interval(function(){
		if(_event_buffer.length > 0){
                    flush_event_buffer();
		}
	}, 6000);

	$(window).bind('beforeunload', function(){
    var obj = { action: 'close', element: 'window', actionTime: $.now() };

		_event_buffer.push(obj);

		flush_event_buffer();
	});

	$scope.$parent.$watch('username', function(new_val, old_val){
		$scope.username = $scope.$parent.username;

		if($scope.view === get_path('login.html') && $scope.username){
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
		}else if(new_val != null && (new_val != old_val)){
			API.get_quiz({
				id: $scope.quiz_id,
				username: $scope.username,
				success: function(quiz){
					initialize_quiz(quiz);
				},
				error: function(){
					$scope.view = get_path('error.html');
				}
			});
		}

		if($scope.view !== get_path('login.html') && $scope.username === null){
			$scope.view = get_path('login.html');
		}
	});

	function get_path(template){
		return $scope.$parent.templates_path + '/' + template;
	}
}]);
