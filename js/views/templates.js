angular.module('templates', ['../js/views/answered.html', '../js/views/error.html', '../js/views/login.html', '../js/views/peer_review_done.html', '../js/views/peer_review_form.html', '../js/views/peer_review_viewer_form.html', '../js/views/quiz_form.html', '../js/views/answers/checkbox_question.html', '../js/views/answers/multiple_choice_question.html', '../js/views/answers/open_question.html', '../js/views/answers/scale_question.html', '../js/views/answers/sketchpad.html', '../js/views/answers/slider_question.html', '../js/views/widgets/checkbox_question.html', '../js/views/widgets/code_sample.html', '../js/views/widgets/image.html', '../js/views/widgets/multiple_choice_question.html', '../js/views/widgets/open_question.html', '../js/views/widgets/peer_reviews.html', '../js/views/widgets/scale_question.html', '../js/views/widgets/sketchpad.html', '../js/views/widgets/slider_question.html', '../js/views/widgets/text_container.html']);

angular.module("../js/views/answered.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("../js/views/answered.html",
    "<div class=\"quiz-panel-heading\">Done!</div>\n" +
    "<div class=\"quiz-panel-body\">\n" +
    "        Thanks for answering this quiz!\n" +
    "        You can check your review later with this hash: {{userhash}}\n" +
    "	<p style=\"margin: 15px 0px 0px 0px\">\n" +
    "		<button class=\"btn-blue\" ng-click=\"logout()\">\n" +
    "			<i class=\"fa fa-sign-out\"></i> Log out\n" +
    "		</button>\n" +
    "	</p>\n" +
    "</div>\n" +
    "");
}]);

angular.module("../js/views/error.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("../js/views/error.html",
    "<div class=\"quiz-panel-heading\">Well, this is awkward...</div>\n" +
    "<div class=\"quiz-panel-body\">\n" +
    "	There seems to be something wrong with this quiz. Please, try again later.\n" +
    "</div>");
}]);

angular.module("../js/views/login.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("../js/views/login.html",
    "<div class=\"quiz-panel-heading\">Login to answer</div>\n" +
    "<div class=\"quiz-panel-body\">\n" +
    "	<form class=\"log-in-form\" ng-submit=\"login()\">\n" +
    "		<div class=\"form-item\">\n" +
    "			<label>TMC-tunnus</label>\n" +
    "			<input type=\"text\" class=\"text-field\" ng-model=\"$parent.username\" placeholder=\"Tunnus\" required>\n" +
    "		</div>\n" +
    "		<button type=\"submit\" class=\"btn-blue\"><i class=\"fa fa-sign-in\"></i> Login</button>\n" +
    "	</form>\n" +
    "</div>");
}]);

angular.module("../js/views/peer_review_done.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("../js/views/peer_review_done.html",
    "<div class=\"quiz-panel-heading\">Done!</div>\n" +
    "<div class=\"quiz-panel-body\">\n" +
    "    Thanks for the peer reviews!\n" +
    "</div>\n" +
    "");
}]);

angular.module("../js/views/peer_review_form.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("../js/views/peer_review_form.html",
    "<div class=\"quiz-panel-heading\">\"{{title}}\" peer reviews</div>\n" +
    "<div class=\"quiz-panel-body\">\n" +
    "	<p class=\"text-muted text-center\">Round {{current_round}}/{{rounds}}</p>\n" +
    "	<form name=\"peer_review_{{$parent.quiz.id}}\">\n" +
    "		<div class=\"form-item\">\n" +
    "			<label>You review</label>\n" +
    "			<textarea class=\"text-field\" rows=\"4\" ng-model=\"$parent.peer_review_content\" ng-required=\"true\"></textarea>\n" +
    "		</div>\n" +
    "		<button class=\"btn-blue\" ng-disabled=\"peer_review_{{$parent.quiz.id}}.$invalid\" ng-click=\"send_peer_review()\"><i class=\"fa fa-send\"></i> Send</button>\n" +
    "\n" +
    "		<p class=\"text-muted\" style=\"margin-bottom: 0px\" ng-show=\"peer_review_{{$parent.quiz.id}}.$invalid\">\n" +
    "			Please, write your review before sending\n" +
    "		</p>\n" +
    "	</form>\n" +
    "	<div class=\"peer-review-container\">\n" +
    "		<div class=\"peer-review-answer\" ng-repeat=\"review in current_peer_reviews\">\n" +
    "			<div class=\"peer-review-answer-body\" ng-click=\"choose_review(review)\" ng-class=\"{ 'selected': review.selected }\">\n" +
    "				<h2 class=\"peer-review-user\"><i class=\"fa fa-user\"></i> {{review.user || 'Anonymous'}}</h2>\n" +
    "				<div class=\"form-item\" ng-repeat=\"answer in review.answer\" ng-include=\"answer_view(answer.item_type)\"></div>\n" +
    "			</div>\n" +
    "		</div>\n" +
    "	</div>\n" +
    "</div>\n" +
    "");
}]);

angular.module("../js/views/peer_review_viewer_form.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("../js/views/peer_review_viewer_form.html",
    "<div>hei!</div>");
}]);

angular.module("../js/views/quiz_form.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("../js/views/quiz_form.html",
    "<div class=\"quiz-panel-heading\" ng-click=\"toggle_quiz()\" style=\"cursor: pointer;\">\n" +
    "	<i class=\"fa fa-question-circle text-muted\"></i> {{quiz.title}} <span class=\"text-muted\" ng-show=\"quiz.answered\">answered</span>\n" +
    "	<button class=\"pull-right toggle-quiz\">\n" +
    "		<i class=\"fa fa-minus\" ng-show=\"$parent.quiz.is_open\"></i>\n" +
    "		<i class=\"fa fa-plus\" ng-hide=\"$parent.quiz.is_open\"></i>\n" +
    "	</button>\n" +
    "</div>\n" +
    "\n" +
    "<div class=\"quiz-panel-body\" ng-show=\"$parent.quiz.is_open\">\n" +
    "	<form name=\"quiz_form_{{$parent.quiz.id}}\" ng-hide=\"quiz.answering_expired\">\n" +
    "		<div class=\"form-item\" ng-repeat=\"item in quiz.items\" ng-include=\"widget_view(item.item_type)\"></div>\n" +
    "		<button class=\"btn-blue\" ng-click=\"send_answer()\" ng-disabled=\"quiz_form_{{$parent.quiz.id}}.$invalid\"><i class=\"fa fa-send\"></i> Send</button>\n" +
    "		<p class=\"text-muted\" style=\"margin-bottom: 0px;\" ng-show=\"quiz_form_{{$parent.quiz.id}}.$invalid\">Please, fill in all the fields before sending the quiz</p>\n" +
    "	</form>\n" +
    "\n" +
    "	<div class=\"alert alert-info\" ng-show=\"quiz.answering_expired\">The deadline for answering this quiz has passed</div>\n" +
    "</div>\n" +
    "\n" +
    "<div class=\"quiz-panel-user-info\" ng-show=\"$parent.quiz.is_open\">\n" +
    "	<button class=\"btn-grey btn-sm\" style=\"margin-right: 10px;\" ng-click=\"toggle_username_form()\"><i class=\"fa fa-pencil\"></i> Change</button>Logged in as {{username}}\n" +
    "	<div style=\"margin-top: 15px;\" ng-show=\"show_username_form\">\n" +
    "		<form name=\"change_username_{{$parent.quiz_id}}\">\n" +
    "			<div class=\"form-item\">\n" +
    "				<input type=\"text\" placeholder=\"Username\" ng-required=\"true\" class=\"text-field\" ng-model=\"$parent.new_username\">\n" +
    "			</div>\n" +
    "			<button class=\"btn-blue\" ng-click=\"change_username()\" ng-disabled=\"change_username_{{$parent.quiz_id}}.$invalid\">Save</button>\n" +
    "		</form>\n" +
    "	</div>\n" +
    "</div>\n" +
    "");
}]);

angular.module("../js/views/answers/checkbox_question.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("../js/views/answers/checkbox_question.html",
    "<label>{{answer.question}}</label>\n" +
    "<span ng-repeat=\"check in answer.value\">\n" +
    "	{{check}}<span ng-show=\"$index != answer.value.length - 1\">, </span>\n" +
    "</span>");
}]);

angular.module("../js/views/answers/multiple_choice_question.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("../js/views/answers/multiple_choice_question.html",
    "<label>{{answer.question}}</label>\n" +
    "{{answer.value}}");
}]);

angular.module("../js/views/answers/open_question.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("../js/views/answers/open_question.html",
    "<label>{{answer.question}}</label>\n" +
    "{{answer.value}}\n" +
    "");
}]);

angular.module("../js/views/answers/scale_question.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("../js/views/answers/scale_question.html",
    "<label>{{answer.question}}</label>\n" +
    "<span ng-repeat=\"question in answer.value\">\n" +
    "	{{question.question}} <span class=\"text-muted\">{{question.value}}</span><span ng-show=\"$index != answer.value.length - 1\">, </span>\n" +
    "</span>\n" +
    "");
}]);

angular.module("../js/views/answers/sketchpad.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("../js/views/answers/sketchpad.html",
    "<label>{{answer.question}}</label>\n" +
    "<div ng-model=\"answer.value\" viewer></div>\n" +
    "");
}]);

angular.module("../js/views/answers/slider_question.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("../js/views/answers/slider_question.html",
    "<label>{{answer.question}}</label>\n" +
    "{{answer.value}}\n" +
    "");
}]);

angular.module("../js/views/widgets/checkbox_question.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("../js/views/widgets/checkbox_question.html",
    "<label class=\"checkbox-question-question\">{{item.question}}</label>\n" +
    "<div class=\"checkbox\" ng-repeat=\"checkbox in item.checkboxes\">\n" +
    "	<label><input type=\"checkbox\" value=\"{{checkbox.title}}\" ng-model=\"checkbox.value\">{{checkbox.title}}</label>\n" +
    "</div>\n" +
    "");
}]);

angular.module("../js/views/widgets/code_sample.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("../js/views/widgets/code_sample.html",
    "<div highlight ng-model=\"item.code\"></div>");
}]);

angular.module("../js/views/widgets/image.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("../js/views/widgets/image.html",
    "<img ng-src=\"{{item.imageUrl}}\" alt=\"preview\" />\n" +
    "");
}]);

angular.module("../js/views/widgets/multiple_choice_question.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("../js/views/widgets/multiple_choice_question.html",
    "<label class=\"multiple-choice-question-question\">{{item.question}}</label>\n" +
    "<div class=\"radio\" ng-repeat=\"option in item.options\">\n" +
    "	<label><input type=\"radio\" ng-model=\"item.value\" value=\"{{option.title}}\" ng-required=\"true\">{{option.title}}</label>\n" +
    "</div>\n" +
    "");
}]);

angular.module("../js/views/widgets/open_question.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("../js/views/widgets/open_question.html",
    "<label class=\"open-question-question\">{{item.question}}</label>\n" +
    "<p class=\"text-muted\" ng-show=\"item.max_length && item.value.length > 0\">{{item.max_length - item.value.length}} characters remaining</p>\n" +
    "<textarea rows=\"5\" class=\"text-field open-question-value\" ng-model=\"item.value\" maxlength=\"{{item.max_length}}\" ng-required=\"true\"></textarea>\n" +
    "");
}]);

angular.module("../js/views/widgets/peer_reviews.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("../js/views/widgets/peer_reviews.html",
    "<div ng-controller=\"PeerReviewViewerController\" ng-init=\"init(item)\">\n" +
    "<label>Peer reviews derp</label>\n" +
    "	<div>\n" +
    "		<div class=\"peer-review-container\">\n" +
    "			<div class=\"peer-review-answer\" ng-repeat=\"review in current_peer_reviews track by $index\">\n" +
    "				<div class=\"form-item\" ng-repeat=\"answer in review.answer track by $index\" ng-include=\"answer_view(answer.item_type)\">\n" +
    "				</div>\n" +
    "			</div>\n" +
    "		</div>\n" +
    "	</div>\n" +
    "</div>");
}]);

angular.module("../js/views/widgets/scale_question.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("../js/views/widgets/scale_question.html",
    "<label>{{item.title}}</label>\n" +
    "\n" +
    "<div class=\"scale-grid scale-header\">\n" +
    "	<div class=\"grid-item text-muted\" style=\"width: 25%\">{{item.min.title}}</div>\n" +
    "	<div class=\"grid-item\" ng-repeat=\"iterator in item.scale\" style=\"width: {{65 / item.scale.length}}%\">{{iterator}}</div>\n" +
    "	<div class=\"grid-item text-muted\" style=\"width: 10%\">{{item.max.title}}</div>\n" +
    "</div>\n" +
    "\n" +
    "<div class=\"scale-grid scale-question-list\" ng-repeat=\"question in item.questions\">\n" +
    "	<div ng-show=\"$index % 15 == 0 && $index != 0\" class=\"scale-reminder\">\n" +
    "		<div class=\"grid-item text-muted\" style=\"width: 25%\">{{item.min.title}}</div>\n" +
    "		<div class=\"grid-item\" ng-repeat=\"iterator in item.scale\" style=\"width: {{65 / item.scale.length}}%\">{{iterator}}</div>\n" +
    "		<div class=\"grid-item text-muted\" style=\"width: 10%\">{{item.max.title}}</div>\n" +
    "	</div>\n" +
    "\n" +
    "	<div class=\"grid-item\" style=\"width: 25%\">{{$index + 1}}. {{question.question}}</div>\n" +
    "	<div class=\"grid-item\" ng-repeat=\"iterator in item.scale\" style=\"width: {{65 / item.scale.length}}%\"><label><input type=\"radio\" ng-model=\"question.value\" value=\"{{iterator}}\" ng-required=\"true\"> {{iterator}}</label></div>\n" +
    "	<div class=\"grid-item\" style=\"width: 10%\"></div>\n" +
    "</div>\n" +
    "");
}]);

angular.module("../js/views/widgets/sketchpad.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("../js/views/widgets/sketchpad.html",
    "<label>{{item.title}}</label>\n" +
    "<div ng-model=\"item.value\" sketchpad></div>\n" +
    "");
}]);

angular.module("../js/views/widgets/slider_question.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("../js/views/widgets/slider_question.html",
    "<table class=\"slider-table\">\n" +
    "  <tr>\n" +
    "    <td class=\"slider-question\">\n" +
    "      {{item.question}}\n" +
    "    </td>\n" +
    "\n" +
    "    <td class=\"slider-slider\">\n" +
    "      <input type=\"range\" max=\"{{item.max.value}}\" min=\"{{item.min.value}}\" ng-model=\"item.value\" slider>\n" +
    "\n" +
    "      <div class=\"slider-range\">\n" +
    "        <div class=\"slider-range-min text-muted\">\n" +
    "          {{item.min.title}}\n" +
    "        </div>\n" +
    "        <div class=\"slider-range-max text-muted\">\n" +
    "          {{item.max.title}}\n" +
    "        </div>\n" +
    "      </div>\n" +
    "    </td>\n" +
    "  </tr>\n" +
    "<table>\n" +
    "");
}]);

angular.module("../js/views/widgets/text_container.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("../js/views/widgets/text_container.html",
    "<div ng-bind-html=\"item.content\"></div>");
}]);
