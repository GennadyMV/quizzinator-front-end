QuizApp.directive('sketchpad', function(){
  return {
    scope: {
      sketch: '=ngModel'
    },
    link: function(scope, elem, attrs){
      var sketchpad = Raphael.sketchpad(Raphael($(elem)[0], 450, 450), {
    		width: 450,
    		height: 450,
    		editing: true
    	});

      $(elem).find('svg').css({
        border: '1px solid rgb(220,220,220)'
      });

      $(elem).append('<p><button class="btn-grey clear-sketchpad"><i class="fa fa-undo"></i> Undo</button></p>');
      $(elem).find('.clear-sketchpad').on('click', function(){
        sketchpad.undo();
      });

      sketchpad.change(function() {
    		scope.$apply(function(){
          scope.sketch = sketchpad.json()
        });
    	});
    }
  }
});
