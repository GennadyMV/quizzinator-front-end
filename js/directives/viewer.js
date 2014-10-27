QuizApp.directive('viewer', function(){
  return {
    scope: {
      sketch: '=ngModel'
    },
    link: function(scope, elem, attrs){
      console.log(scope.sketch)
      var viewer = Raphael.sketchpad(Raphael($(elem)[0], 450, 450), {
      	width: 450,
      	height: 450,
      	strokes: JSON.parse(scope.sketch),
        editing: false
      });
    }
  }
});
