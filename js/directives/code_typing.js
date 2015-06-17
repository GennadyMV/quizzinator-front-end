QuizApp.directive('codetyping', function(){

	return {
		scope: {
			item: '=ngModel'
		},
		link: function(scope, elem, attrs) {
			scope.untyped = scope.item.code;
            scope.$watch('item.value', function(newVal) {
            	if (newVal === undefined) newVal = "";
            	var code = scope.item.code;
            	scope.untyped = code.substring(newVal.length + 1);
            	var i = 0;
            	while (i < newVal.length) {
            		if (scope.item.code.charAt(i) !== newVal.charAt(i)) break;
            		i++;
            	}
            	scope.correct = code.substring(0, i);
            	scope.wrong = code.substring(i, newVal.length);
            	if(scope.wrong.length == 0){
            		scope.current = code.charAt(i).replace(/\n/g,"⏎\n");
            	} else {
            		scope.current = "";
            		scope.untyped = code.substring(newVal.length);
            	}
            });
		},
		// You do not currently have the ability to access scope variables from the templateUrl function, since the template is requested before the scope is initialized.
		templateUrl: '../js/views/widgets/code_typing_template.html'
	}
});