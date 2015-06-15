angular.module('templates', ['../js/views/answered.html', '../js/views/error.html', '../js/views/login.html', '../js/views/peer_review_done.html', '../js/views/peer_review_form.html', '../js/views/quiz_form.html', '../js/views/answers/checkbox_question.html', '../js/views/answers/multiple_choice_question.html', '../js/views/answers/multiple_choice_question_expl.html', '../js/views/answers/open_question.html', '../js/views/answers/scale_question.html', '../js/views/answers/sketchpad.html', '../js/views/answers/slider_question.html', '../js/views/widgets/checkbox_question.html', '../js/views/widgets/code_sample.html', '../js/views/widgets/code_typing.html', '../js/views/widgets/image.html', '../js/views/widgets/multiple_choice_question.html', '../js/views/widgets/multiple_choice_question_expl.html', '../js/views/widgets/my_peer_reviews.html', '../js/views/widgets/open_question.html', '../js/views/widgets/peer_reviews.html', '../js/views/widgets/scale_question.html', '../js/views/widgets/sketchpad.html', '../js/views/widgets/slider_question.html', '../js/views/widgets/text_container.html']);

angular.module("../js/views/answered.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("../js/views/answered.html",
    "<div class=\"quiz-panel-heading\">Done!</div>\n" +
    "<div class=\"quiz-panel-body\">\n" +
    "        Thanks for answering this quiz!\n" +
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
    "<div class=\"quiz-panel-heading\">\n" +
    "    \"{{title}}\" peer reviews\n" +
    "    <span class=\"pull-right quiz-dl\" ng-show=\"review_deadline\">Deadline: <br />{{ review_deadline }}</span>\n" +
    "</div>\n" +
    "<div class=\"quiz-panel-body\">\n" +
    "    <div ng-show=\"has_answered && !reviewing_expired && current_peer_reviews.length > 0\">\n" +
    "        <p class=\"text-muted text-center\">Round {{current_round}}/{{rounds}}</p>\n" +
    "        <form name=\"peer_review_{{$parent.quiz.id}}\">\n" +
    "            <div class=\"form-item\">\n" +
    "                <label>Your review</label>\n" +
    "                <textarea class=\"text-field\" rows=\"4\" ng-model=\"$parent.peer_review_content\" ng-required=\"true\"></textarea>\n" +
    "            </div>\n" +
    "            <button class=\"btn-blue\" ng-disabled=\"peer_review_{{$parent.quiz.id}}.$invalid\" ng-click=\"send_peer_review()\"><i class=\"fa fa-send\"></i> Send</button>\n" +
    "\n" +
    "            <p class=\"text-muted\" style=\"margin-bottom: 0px\" ng-show=\"peer_review_{{$parent.quiz.id}}.$invalid\">\n" +
    "                Please, write your review before sending\n" +
    "            </p>\n" +
    "        </form>\n" +
    "        <div class=\"peer-review-container\">\n" +
    "            <div class=\"peer-review-answer\" ng-repeat=\"review in current_peer_reviews\">\n" +
    "                <div class=\"peer-review-answer-body\" ng-click=\"choose_review(review)\" ng-class=\"{ 'selected': review.selected }\">\n" +
    "                    <h2 class=\"peer-review-user\"><i class=\"fa fa-user\"></i> {{review.user|| 'Anonymous'}}</h2>\n" +
    "                    <div class=\"form-item\" ng-repeat=\"answer in review.answer\" ng-include=\"answer_view(answer.item_type)\"></div>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "\n" +
    "    <div class=\"alert alert-info\" ng-hide=\"has_answered || reviewing_expired\">\n" +
    "        Answer the quiz before giving peer reviews\n" +
    "    </div>\n" +
    "\n" +
    "    <div class=\"alert alert-info\" ng-show=\"reviewing_expired\">\n" +
    "        The deadline for peer reviews has passed\n" +
    "    </div>\n" +
    "\n" +
    "    <div class=\"alert alert-info\" ng-show=\"has_answered && current_peer_reviews.length == 0\">\n" +
    "      No peers to review yet\n" +
    "    </div>\n" +
    "\n" +
    "</div>\n" +
    "");
}]);

angular.module("../js/views/quiz_form.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("../js/views/quiz_form.html",
    "<div class=\"quiz-panel-heading\" ng-click=\"toggle_quiz(); quiz.event_handler('click', $parent.quiz.is_open)\" style=\"cursor: pointer;\" >\n" +
    "    <i class=\"fa fa-question-circle text-muted\"></i> {{quiz.title}}\n" +
    "    <span class=\"text-muted\" ng-show=\"quiz.answered\">answered</span>\n" +
    "\n" +
    "\n" +
    "    <button class=\"pull-right toggle-quiz\">\n" +
    "        <i class=\"fa fa-minus\" ng-show=\"$parent.quiz.is_open\"></i>\n" +
    "        <i class=\"fa fa-plus\" ng-hide=\"$parent.quiz.is_open\"></i>\n" +
    "    </button>\n" +
    "    <span class=\"pull-right quiz-dl\" ng-show=\"quiz.deadline\">Deadline: <br /> {{ quiz.deadline }}</span>\n" +
    "</div>\n" +
    "\n" +
    "<div class=\"quiz-panel-body\" ng-show=\"$parent.quiz.is_open\">\n" +
    "\n" +
    "    <div class=\"alert alert-info\" ng-show=\"quiz.answering_expired\">\n" +
    "        The deadline for answering this quiz has passed\n" +
    "        <span ng-show=\"quiz.can_answer\"> but you can improve your answer until {{ quiz.improve_deadline }}</span>\n" +
    "    </div>\n" +
    "\n" +
    "    <form name=\"quiz_form_{{$parent.quiz.id}}\" ng-show=\"quiz.can_answer\">\n" +
    "        <div class=\"form-item\" ng-repeat=\"item in quiz.items\" ng-include=\"widget_view(item.item_type)\"></div>\n" +
    "        <button class=\"btn-blue\" ng-click=\"send_answer()\" type=\"button\" ng-disabled=\"quiz_form_{{$parent.quiz.id}}.$invalid\"><i class=\"fa fa-send\"></i> Send</button>\n" +
    "        <button style=\"margin-left: 10px;\" class=\"btn-grey\" type=\"button\" ng-click=\"clear_answer()\"><i class=\" fa fa-eraser\"></i> Clear answers</button>\n" +
    "        <p class=\"text-muted\" style=\"margin-bottom: 0px;\" ng-show=\"quiz_form_{{$parent.quiz.id}}.$invalid\">Please, fill in all the fields before sending the quiz</p>\n" +
    "    </form>\n" +
    "</div>\n" +
    "\n" +
    "<div class=\"quiz-panel-user-info\" ng-show=\"$parent.quiz.is_open\">\n" +
    "    <button class=\"btn-grey btn-sm\" type=\"button\" style=\"margin-right: 10px;\" ng-click=\"toggle_username_form()\"><i class=\"fa fa-pencil\"></i> Change</button>Logged in as {{username}}\n" +
    "    <div style=\"margin-top: 15px;\" ng-show=\"show_username_form\">\n" +
    "        <form name=\"change_username_{{$parent.quiz_id}}\">\n" +
    "            <div class=\"form-item\">\n" +
    "                <input type=\"text\" placeholder=\"Username\" ng-required=\"true\" class=\"text-field\" ng-model=\"$parent.new_username\">\n" +
    "            </div>\n" +
    "            <button class=\"btn-blue\" type=\"button\" ng-click=\"change_username()\" ng-disabled=\"change_username_{{$parent.quiz_id}}.$invalid\">Change</button>\n" +
    "        </form>\n" +
    "    </div>\n" +
    "</div>\n" +
    "");
}]);

angular.module("../js/views/answers/checkbox_question.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("../js/views/answers/checkbox_question.html",
    "<label>{{answer.question}}</label>\n" +
    "<span ng-repeat=\"checkbox in answer.checkboxes | filter:{ value: true }\">\n" +
    "	{{checkbox.title}}<span ng-show=\"$index != answer.checkboxes.length - 1\">, </span>\n" +
    "</span>\n" +
    "");
}]);

angular.module("../js/views/answers/multiple_choice_question.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("../js/views/answers/multiple_choice_question.html",
    "<label>{{answer.question}}</label>\n" +
    "{{answer.value}}");
}]);

angular.module("../js/views/answers/multiple_choice_question_expl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("../js/views/answers/multiple_choice_question_expl.html",
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
    "<label>{{answer.title}}</label>\n" +
    "<span ng-repeat=\"question in answer.questions\">\n" +
    "	{{question.question}} <span class=\"text-muted\">{{question.value}}</span><span ng-show=\"$index != answer.questions.length - 1\">, </span>\n" +
    "</span>\n" +
    "");
}]);

angular.module("../js/views/answers/sketchpad.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("../js/views/answers/sketchpad.html",
    "<label>{{answer.title}}</label>\n" +
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
    "	<label>\n" +
    "                <input type=\"checkbox\" value=\"{{checkbox.title}}\" ng-model=\"checkbox.value\" ng-change=\"item.event_handler('change', checkbox.title, checkbox.value)\">\n" +
    "            {{checkbox.title}}\n" +
    "        </label>\n" +
    "</div>\n" +
    "");
}]);

angular.module("../js/views/widgets/code_sample.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("../js/views/widgets/code_sample.html",
    "<div highlight ng-model=\"item.code\"></div>");
}]);

angular.module("../js/views/widgets/code_typing.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("../js/views/widgets/code_typing.html",
    "<div highlight ng-model=\"item.code\"></div>\n" +
    "<p class=\"text-muted\" ng-show=\"item.code.length && item.value.length > 0\">{{item.code.length - item.value.length}} characters remaining</p>\n" +
    "<textarea rows=\"5\" class=\"text-field open-question-value\" ng-model=\"item.value\" maxlength=\"item.code.length\" ng-required=\"true\" ng-click=\"item.event_handler('click', 0, item.value)\" ng-focus=\"item.event_handler('focus', 0, item.value)\" ng-blur=\"item.event_handler('blur', 0, item.value)\"></textarea>\n" +
    "");
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
    "    <label>\n" +
    "        <input type=\"radio\" ng-model=\"item.value\" value=\"{{option.title}}\" ng-required=\"true\" ng-change=\"item.event_handler('change', 0, item.value)\">\n" +
    "            {{option.title}}\n" +
    "        </label>\n" +
    "</div>\n" +
    "");
}]);

angular.module("../js/views/widgets/multiple_choice_question_expl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("../js/views/widgets/multiple_choice_question_expl.html",
    "<label class=\"multiple-choice-question-question\">{{item.question}}</label>\n" +
    "<div class=\"radio\" ng-repeat=\"option in item.options\">\n" +
    "    <label>\n" +
    "        <input type=\"radio\" ng-model=\"item.value\" value=\"{{option.title}}\" ng-required=\"true\" ng-change=\"item.event_handler('change', 0, item.value)\">\n" +
    "            {{option.title}} <span ng-show=\"item.value == option.title\" class=\"explanation {{option.correct}}\">{{option.explanation}}</span>\n" +
    "        </label>\n" +
    "</div>\n" +
    "");
}]);

angular.module("../js/views/widgets/my_peer_reviews.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("../js/views/widgets/my_peer_reviews.html",
    "<div ng-controller=\"ReviewsController\" ng-init=\"init()\">\n" +
    "    <label style=\"font-weight: bold\">My peer reviews</label>\n" +
    "		<p class=\"text-muted\" ng-hide=\"reviews && reviews.length > 0\">\n" +
    "			No peer reviews yet.\n" +
    "		</p>\n" +
    "    <div>\n" +
    "        <div class=\"peer-review-widget\">\n" +
    "            <div class=\"peer-review-widget-review\" ng-repeat=\"peer_review in reviews\">\n" +
    "                <div style=\"margin-bottom: 10px; font-weight: bold\">\n" +
    "                    <span ng-class=\"{ 'green': peer_review.totalRating > 0, 'red': peer_review.totalRating < 0, 'text-muted': peer_review.totalRating == 0 }\">\n" +
    "                        <span ng-show=\"peer_review.totalRating > 0\">+</span>{{peer_review.totalRating}}\n" +
    "                    </span>\n" +
    "                    {{peer_review.reviewer}}\n" +
    "                </div>\n" +
    "\n" +
    "                {{peer_review.review}}\n" +
    "                <div class=\"peer-review-widget-votes\" ng-hide=\"peer_review.rated\">\n" +
    "                    <button class=\"btn btn-grey\" type=\"button\" ng-click=\"item.event_handler('click', $index, 1);rate(peer_review, 1)\" style=\"cursor: pointer\">\n" +
    "                        <i class=\"fa fa-thumbs-up\"></i>\n" +
    "                    </button>\n" +
    "                    <button class=\"btn btn-grey\" type=\"button\" ng-click=\"item.event_handler('click', $index, - 1);rate(peer_review, -1)\" style=\"cursor: pointer; margin-left: 5px;\">\n" +
    "                        <i class=\"fa fa-thumbs-down\"></i>\n" +
    "                    </button>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</div>\n" +
    "");
}]);

angular.module("../js/views/widgets/open_question.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("../js/views/widgets/open_question.html",
    "<label class=\"open-question-question\">{{item.question}}</label>\n" +
    "<p class=\"text-muted\" ng-show=\"item.max_length && item.value.length > 0\">{{item.max_length - item.value.length}} characters remaining</p>\n" +
    "<textarea rows=\"5\" class=\"text-field open-question-value\" ng-model=\"item.value\" maxlength=\"{{item.max_length}}\" ng-required=\"true\" ng-click=\"item.event_handler('click', 0, item.value)\" ng-focus=\"item.event_handler('focus', 0, item.value)\" ng-blur=\"item.event_handler('blur', 0, item.value)\"></textarea>\n" +
    "");
}]);

angular.module("../js/views/widgets/peer_reviews.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("../js/views/widgets/peer_reviews.html",
    "<div ng-controller=\"PeerReviewViewerController\" ng-init=\"init(item)\" ng-show=\"peer_reviews && peer_reviews.length > 0\">\n" +
    "    <label style=\"font-weight: bold\">Rate peer reviews</label>\n" +
    "    <div>\n" +
    "        <p class=\"text-muted\" ng-show=\"peer_reviews.length == 0\">\n" +
    "            No peer reviews yet.\n" +
    "        </p>\n" +
    "\n" +
    "        <div class=\"peer-review-widget\">\n" +
    "            <div class=\"peer-review-widget-review\" ng-repeat=\"peer_review in peer_reviews| limitTo: count\">\n" +
    "                <div style=\"margin-bottom: 10px; font-weight: bold\">\n" +
    "                    <span ng-class=\"{ 'green': peer_review.totalRating > 0, 'red': peer_review.totalRating < 0, 'text-muted': peer_review.totalRating == 0 }\">\n" +
    "                        <span ng-show=\"peer_review.totalRating > 0\">+</span>\n" +
    "                        {{peer_review.totalRating}}\n" +
    "                    </span>\n" +
    "                    {{peer_review.reviewer}}\n" +
    "                </div>\n" +
    "                {{peer_review.review}}\n" +
    "                \n" +
    "                <div class=\"peer-review-widget-votes\" ng-hide=\"peer_review.rated\">\n" +
    "                    <button class=\"btn btn-grey\" type=\"button\" ng-click=\"item.event_handler('click', $index, 1);rate(peer_review, 1)\" style=\"cursor: pointer;\">\n" +
    "                        <i  class=\"fa fa-thumbs-up\"></i>\n" +
    "                    </button>\n" +
    "                    <button class=\"btn btn-grey\" type=\"button\" ng-click=\"item.event_handler('click', $index, - 1);rate(peer_review, - 1)\" style=\"cursor: pointer; margin-left: 5px;\">\n" +
    "                        <i  class=\"fa fa-thumbs-down\"></i>\n" +
    "                    </button>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</div>\n" +
    "");
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
    "	<div class=\"grid-item\" ng-repeat=\"iterator in item.scale\" style=\"width: {{65 / item.scale.length}}%\">\n" +
    "            <label>\n" +
    "                <input type=\"radio\" ng-model=\"question.value\" value=\"{{iterator}}\" ng-required=\"true\" ng-change=\"item.event_handler('change', $parent.$index, iterator)\">\n" +
    "                {{iterator}}\n" +
    "            </label>\n" +
    "        </div>\n" +
    "	<div class=\"grid-item\" style=\"width: 10%\"></div>\n" +
    "</div>\n" +
    "");
}]);

angular.module("../js/views/widgets/sketchpad.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("../js/views/widgets/sketchpad.html",
    "<label>{{item.title}}</label>\n" +
    "<div class=\"sketchpad-container\">\n" +
    "  <div class=\"sketchpad-toolbar\">\n" +
    "    <div class=\"sketchpad-tool sketchpad-clear\">\n" +
    "      <button class=\"btn btn-grey\" type=\"button\"><i class=\"fa fa-eraser\"></i> Clear</button>\n" +
    "    </div>\n" +
    "\n" +
    "    <div class=\"sketchpad-tool choose-stroke-color-to-sketchpad\">\n" +
    "      <label class=\"label-block\">Choose color</label>\n" +
    "      <div class=\"palette-container\">\n" +
    "        <div class=\"palette-color chosen\" style=\"background-color: #000000\"></div>\n" +
    "        <div class=\"palette-color\" style=\"background-color: #787878\"></div>\n" +
    "        <div class=\"palette-color\" style=\"background-color: #CB2402\"></div>\n" +
    "        <div class=\"palette-color\" style=\"background-color: #61AE24\"></div>\n" +
    "        <div class=\"palette-color\" style=\"background-color: #00A1CB\"></div>\n" +
    "        <div class=\"palette-color\" style=\"background-color: #F18D05\"></div>\n" +
    "        <div class=\"palette-color\" style=\"background-color: #E54028\"></div>\n" +
    "        <div class=\"palette-color\" style=\"background-color: #D70060\"></div>\n" +
    "        <div class=\"palette-color\" style=\"background-color: #113F8C\"></div>\n" +
    "        <div class=\"palette-color\" style=\"background-color: #ffffff; border: 1px solid rgb(220,220,220); width: 18px; height: 18px;\"></div>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "\n" +
    "    <div class=\"sketchpad-tool choose-stroke-width-to-sketchpad\">\n" +
    "      <label class=\"label-block\">Choose with</label>\n" +
    "      <div class=\"stroke-width-container\">\n" +
    "        <div class=\"stroke-width-delimeter stroke-width-thin\" data-width=\"1\">Thin</div>\n" +
    "        <div class=\"stroke-width-delimeter chosen stroke-width-normal\" data-width=\"5\">Normal</div>\n" +
    "        <div class=\"stroke-width-delimeter stroke-width-thick\" data-width=\"9\">Thick</div>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "\n" +
    "    <div class=\"sketchpad-tool add-text-to-sketchpad\">\n" +
    "      <label class=\"label-block\">Add text</label>\n" +
    "      <textarea class=\"text-field\" placeholder=\"My text\"></textarea>\n" +
    "      <button class=\"btn btn-grey\" style=\"margin-top: 5px\" type=\"button\"><i class=\"fa fa-pencil\"></i> Add</button>\n" +
    "      <div class=\"text-muted\" style=\"margin-top: 10px\">\n" +
    "        Move the text by dragging and remove it by double clicking the left mouse button.\n" +
    "      </div>\n" +
    "    </div>\n" +
    "\n" +
    "    <div class=\"sketchpad-tool add-rectangle-to-sketchpad\">\n" +
    "      <label class=\"label-block\">Add rectangle</label>\n" +
    "      <button class=\"btn btn-grey\" type=\"button\"><i class=\"fa fa-square-o\" type=\"button\"></i> Add</button>\n" +
    "      <div class=\"text-muted\" style=\"margin-top: 10px\">\n" +
    "        Move the rectangle by dragging the middle, resize by dragging bottom-right corner and remove it by double clicking the left mouse button.\n" +
    "      </div>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "\n" +
    "  <div class=\"sketchpad-paper\" ng-model=\"item.value\" sketchpad></div>\n" +
    "</div>\n" +
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
    "        <input type=\"range\" max=\"{{item.max.value}}\" min=\"{{item.min.value}}\" ng-model=\"item.value\" ng-change=\"item.event_handler('change', 0, item.value)\" slider>\n" +
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
    "</table>\n" +
    "");
}]);

angular.module("../js/views/widgets/text_container.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("../js/views/widgets/text_container.html",
    "<div ng-bind-html=\"item.content\"></div>");
}]);
