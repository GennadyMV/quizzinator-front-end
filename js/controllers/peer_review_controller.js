QuizApp.controller('PeerReviewController', ['$scope', 'API', 'Authentication', function($scope, API, Authentication){
  $scope.peer_reviews = [];
  $scope.current_peer_reviews = [];

  $scope.rounds = 0;
  $scope.current_round = 0;

  $scope.init = function(options){
    options = angular.fromJson(options);

    $scope.id = options.id;
  };

  $scope.send_peer_review = function(){
    if($scope.reviewing_expired || !$scope.has_answered_quiz){ return; }

    var selected_peer = $.grep($scope.current_peer_reviews, function(peer){
      return peer.selected;
    })[0];

    API.send_peer_review({
      reviewer: $scope.$parent.username,
      quiz: $scope.id,
      review: { id: selected_peer.id, content: $scope.peer_review_content },
      success: function(){
        if($scope.peer_reviews.length > $scope.current_round * 2){
          $scope.current_peer_reviews = $scope.peer_reviews.slice($scope.current_round * 2, $scope.current_round * 2 + 2);

          $scope.current_peer_reviews[0].selected = true;

          $scope.peer_review_content = '';

          $scope.current_round++;
        }else{
          $scope.view = get_path('peer_review_done.html');
          $scope.peer_reviews = [];
        }
      },
      error: function(){
        $scope.view = get_path('error.html');
      }
    });
  };

  $scope.$parent.$watch('quiz_info', function(new_val, old_val){
    var quiz = new_val[$scope.id.toString()];
    
    var user_can_give_peer_reviews = quiz && !quiz.reviewing_expired && ( quiz.answered || ( quiz.answered && quiz.answering_expired ) );

    $scope.view = get_path('peer_review_form.html');

    $scope.has_answered_quiz = quiz.answered;
    $scope.answering_expired = quiz.reviewing_expired;
    $scope.review_deadline = quiz.review_deadline;
    $scope.title = quiz.title;

    if(user_can_give_peer_reviews && $scope.peer_reviews.length == 0){
      API.get_peer_reviews({
        quiz: $scope.id,
        username: Authentication.get_user(),
        success: function(peer_reviews){
          init_peer_reviews(peer_reviews);
        },
        error: function(){}
      });
    }else{
      $scope.peer_reviews = [];
      $scope.has_answered_quiz = false;
      $scope.answering_not_over = false;
    }
  }, true);

  $scope.choose_review = function(review){
    $scope.current_peer_reviews.forEach(function(r){
      r.selected = false;
    });

    review.selected = true;
  };

  $scope.answer_view = function(type){
    return get_path('answers/' + type + '.html');
  };

  function get_path(template){
    return $scope.$parent.templates_path + '/' + template;
  }

  function init_peer_reviews(peer_reviews){
    $scope.peer_reviews = peer_reviews;

    if($scope.peer_reviews.length == 0){
      $scope.hidden = true;
    }else{
      $scope.peer_reviews[0].selected = true;

      $scope.peer_review_content = '';

      $scope.rounds = Math.ceil($scope.peer_reviews.length / 2);
      $scope.current_round = 1;

      $scope.current_peer_reviews = $scope.peer_reviews.slice(0,2);
    }
  }
}]);
