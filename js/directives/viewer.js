QuizApp.directive('viewer', function(){
  return {
    scope: {
      sketch: '=ngModel'
    },
    link: function(scope, elem, attrs){
      console.log(scope.sketch)
      var viewer = Raphael.sketchpad($(elem).attr('id'), {
      	width: 400,
      	height: 400,
      	strokes: JSON.parse(scope.sketch),
        editing: false
      });
    }
  }
});
