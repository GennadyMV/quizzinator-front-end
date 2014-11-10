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

      var toolbar = $(elem).siblings('.sketchpad-toolbar')[0];

      $(elem).find('svg').css({
        border: '1px solid rgb(220,220,220)'
      });

      $(toolbar).find('.palette-color').on('click', function(){
        var palette_colors = $(this).parent('.palette-container').children('.palette-color');

        $(palette_colors).removeClass('chosen');
        $(this).addClass('chosen');

        sketchpad.pen().color($(this).css('background-color'));
      });

      $(toolbar).find('.stroke-width-delimeter').on('click', function(){
        var stroke_width_delimeters = $(this).parent('.stroke-width-container').children('.stroke-width-delimeter');
        var stroke_width = parseInt($(this).attr('data-width'));

        $(stroke_width_delimeters).removeClass('chosen')
        $(this).addClass('chosen');

        sketchpad.pen().width(stroke_width);
      });

      $(toolbar).find('.add-rectangle-to-sketchpad button').on('click', function(){
        var stroke_width = parseInt($('.stroke-width-delimeter.chosen').attr('data-width'));

        sketchpad.add_rectangle(stroke_width);
      });

      $(toolbar).find('.sketchpad-undo-stroke').on('click', function(){
        sketchpad.undo();
      });

      $(toolbar).find('.add-text-to-sketchpad button').on('click', function(){
        var textarea = $(this).parent('.add-text-to-sketchpad').find('textarea');
        var stroke_width = parseInt($('.stroke-width-delimeter.chosen').attr('data-width'));
        var font_size = 16;

        if(stroke_width == 1){
          font_size = 10;
        }else if(stroke_width == 9){
          font_size = 22;
        }

        sketchpad.add_text($(textarea).val(), font_size);
        $(textarea).val('');
      });

      sketchpad.change(function() {
    		scope.$apply(function(){
          var elements = sketchpad.elements();
          scope.sketch = angular.toJson(elements);
        });
    	});
    }
  }
});
