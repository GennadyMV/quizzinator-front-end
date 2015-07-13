QuizApp.directive('codetyping', function(){

	return {
		scope: {
			item: '=ngModel'
		},
		link: function(scope, elem, attrs) {
			$(elem).children('.code-typing').allowTabChar();
                  scope.untyped = scope.item.code;
                  scope.$watch('item.value', function(newVal) {
            	if (newVal === undefined) newVal = "";
                  newVal = newVal.replace(/\t/g,"    ");
                  scope.test = newVal;
            	var code = scope.item.code.replace(/\t/g,"    ");
            	scope.untyped = code.substring(newVal.length + 1);
            	var i = 0;
            	while (i < newVal.length) {
            		if (scope.item.code.replace(/\t/g,"    ").charAt(i) !== newVal.charAt(i)) break;
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
		templateUrl: '../js/views/widgets/code_typing_template.html'
	}
});

(function($) {
    function pasteIntoInput(el, text) {
        el.focus();
        var val = el.value;
        if (typeof el.selectionStart == "number") {
            var selStart = el.selectionStart;
            el.value = val.slice(0, selStart) + text + val.slice(el.selectionEnd);
            el.selectionEnd = el.selectionStart = selStart + text.length;
        } else if (typeof document.selection != "undefined") {
            var textRange = document.selection.createRange();
            textRange.text = text;
            textRange.collapse(false);
            textRange.select();
        }
    }

    function allowTabChar(el) {
        $(el).keydown(function(e) {
            if (e.which == 9) {
                pasteIntoInput(this, "    ");
                return false;
            }
        });

        // For Opera, which only allows suppression of keypress events, not keydown
        $(el).keypress(function(e) {
            if (e.which == 9) {
                return false;
            }
        });
    }

    $.fn.allowTabChar = function() {
        if (this.jquery) {
            this.each(function() {
                if (this.nodeType == 1) {
                    var nodeName = this.nodeName.toLowerCase();
                    if (nodeName == "textarea" || (nodeName == "input" && this.type == "text")) {
                        allowTabChar(this);
                    }
                }
            })
        }
        return this;
    }
})(jQuery);
