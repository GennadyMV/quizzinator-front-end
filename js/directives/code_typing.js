QuizApp.directive('codetyping', function(){

	return {
		scope: {
			item: '=ngModel'
		},
		link: function(scope, elem, attrs) {
			scope.untyped = scope.item.code;
            scope.$watch('item.value', function(newVal) {
            	if (newVal === undefined) newVal = "";

            	scope.untyped = scope.item.code.substring(newVal.length);
            	var i = 0;
            	while (i < newVal.length) {
            		if (scope.item.code.charAt(i) !== newVal.charAt(i)) break;
            		i++;
            	}
            	scope.correct = scope.item.code.substring(0, i);
            	scope.wrong = scope.item.code.substring(i, newVal.length);
            });
		},
		// You do not currently have the ability to access scope variables from the templateUrl function, since the template is requested before the scope is initialized.
		templateUrl: '../js/views/widgets/code_typing_template.html'
	}
});