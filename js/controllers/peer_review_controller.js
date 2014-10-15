QuizApp.controller('PeerReviewController', ['$scope', 'API', function($scope, API){
  $scope.peer_reviews = [];
  $scope.current_peer_reviews = [];

  $scope.hidden = true;

  $scope.rounds = 0;
  $scope.current_round = 0;

  $scope.init = function(options){
    options = angular.fromJson(options);

    $scope.id = options.id;
    console.log($scope.id);
  }

  /*
  *	peer_review_content: content of the review
  */
  $scope.send_peer_review = function(peer_review_content){
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
        }
      },
      error: function(){
        $scope.view = get_path('error.html');
      }
    });
  }

  $scope.$parent.$watch('new_peer_review', function(new_val, old_val){
    if(new_val.id == $scope.id){
      $scope.peer_reviews = new_val.peer_reviews;

      $scope.userhash = new_val.userhash;
      $scope.title = new_val.title;

      $scope.hidden = false;

      if($scope.peer_reviews.length == 0){
        $scope.hidden = true;
      }else{
        $scope.peer_reviews[0].selected = true;
        $scope.view = get_path('peer_review_form.html');
        $scope.peer_review_content = '';

        $scope.rounds = Math.ceil($scope.peer_reviews.length / 2);
        $scope.current_round = 1;
        $scope.current_peer_reviews = $scope.peer_reviews.slice(0,2);
      }
    }
  });

  /*
  *	review: review object to choose.
  */
  $scope.choose_review = function(review){
    $scope.current_peer_reviews.forEach(function(r){
      r.selected = false;
    });

    review.selected = true;
  }

  /*
  * type: type of answer, f.e 'open-question'.
  */
  $scope.answer_view = function(type){
    return get_path('answers/' + type + '.html');
  }

  /*
  *	template: file name of the template.
  */
  function get_path(template){
    return $scope.$parent.templates_path + '/' + template;
  }
}]);
