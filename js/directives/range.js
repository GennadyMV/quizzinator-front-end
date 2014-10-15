QuizApp.directive('range', function(){
  return {
    scope: {
      value: '=ngModel'
    },
    link: function(scope, elem, attrs){
      $(elem).on('mousemove change', function(){
        scope.$apply(function(){
          scope.value = $(this).val();
        });
      });

      scope.$watch('value', function(old_val, new_val){
        $(elem).val(new_val);
      });
    }
  }
});
