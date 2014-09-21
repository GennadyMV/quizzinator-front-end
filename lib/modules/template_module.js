var TEMPLATE = (function(){
	var _public = {};

	var templates = {
		loading: 
		'<div class="quiz-panel-heading">Loading</div>\n\
		<div class="quiz-panel-body">Loading the quiz...</div>\n\
		</div>',
		error: 
		'<div class="alert-error">Error loading the quiz!</div>',
		quiz_body: 
		'<div class="quiz-panel-heading">{{title}}</div>\n\
		<div class="quiz-panel-user-info">\n\
			<button class="btn-grey btn-sm change-username" style="margin-right: 10px;"><i class="fa fa-pencil"></i> Change</button>Logged in as <span class="logged-username"></span>\n\
			<div style="margin-top: 15px; display: none;" class="new-username-form">\n\
				<div class="form-item">\n\
					<input type="text" placeholder="Username" class="text-field new-username">\n\
				</div>\n\
				<button class="btn-blue set-new-username">Save</button>\n\
			</div>\n\
		</div>\n\
		<div class="quiz-panel-body">\n\
			<form>{{{body}}}\n\
				<button class="btn-blue submit-quiz"><i class="fa fa-send"></i> Send</button>\n\
			</form>\n\
		</div>',
		open_question: 
		'<div class="form-item quiz-item" data-type="open_question">\n\
			<label class="open-question-question">{{question}}</label>\n\
			<textarea rows="5" class="text-field open-question-value"></textarea>\n\
		</div>',
		multiple_choice_question: 
		'<div class="form-item quiz-item" data-type="multiple_choice_question">\n\
			<label class="multiple-choice-question-question">{{question}}</label>\n\
			{{#each options}}\n\
				<div class="radio">\n\
					<label><input type="radio" name="{{../question}}" value="{{title}}">{{title}}</label>\n\
				</div>\n\
			{{/each}}\n\
		</div>',
		checkbox_question: 
		'<div class="form-item quiz-item" data-type="checkbox_question">\n\
			<label class="checkbox-question-question">{{question}}</label>\n\
			{{#each checkboxes}}\n\
				<div class="checkbox">\n\
					<label><input type="checkbox" value="{{title}}">{{title}}</label>\n\
				</div>\n\
			{{/each}}\n\
		</div>',
		text_container: 
		'<div class="form-item">{{{content}}}</div>',
		login: 
		'<div class="quiz-panel-heading">Login to answer</div>\n\
		<div class="quiz-panel-body">\n\
			<form class="log-in-form">\n\
				<div class="form-item">\n\
					<label>TMC-tunnus</label>\n\
					<input type="text" class="text-field log-in-username" placeholder="Tunnus" required>\n\
				</div>\n\
				<button type="submit" class="btn-blue"><i class="fa fa-sign-in"></i> Login</button>\n\
			</form>\n\
		</div>',
<<<<<<< HEAD
		peer_review:
		'<div class="quiz-panel-heading">Choose an answer to review</div>\n\
		<div class="quiz-panel-body">\n\
			<div class="form-item">\n\
				<label>You review</label>\n\
				<textarea class="text-field peer-review-content" rows="4"></textarea>\n\
			</div>\n\
			<button class="btn-blue peer-review-submit"><i class="fa fa-send"></i> Send</button>\n\
			<div class="peer-review-container">\n\
				{{#each answers}}\n\
					<div class="peer-review-answer">\n\
						<div class="peer-review-answer-body" style="margin-left: 2px" data-answerId="{{id}}">\n\
							<h2 class="peer-review-user"><i class="fa fa-user"></i> {{user}}</h2>\n\
							{{#each answer}}\n\
								<div class="form-item">\n\
									<label>{{question}}</label>\n\
									{{value}}\n\
								</div>\n\
							{{/each}}\n\
						</div>\n\
					</div>\n\
				{{/each}}\n\
=======
		peer_review: 
		'<div class="peer-review">\n\
			<div class="peer-review-candidate">\n\
				<button>tämä on parempi!</button>\n\
			</div>\n\
			<div class="peer-review-candidate">\n\
				<button>tämä on parempi!</button>\n\
>>>>>>> 70d2b406d6256c65611cd97902a277949193251a
			</div>\n\
		</div>'
	}

	_public.render_loading = function(){
		return templates.loading;
	}

	_public.render_error = function(){
		return templates.error;
	}

	_public.render_peer_review = function(data){
		var peer_review_template = Handlebars.compile(templates.peer_review);
		return peer_review_template(data);
	}

	_public.render_quiz = function(data){
		var quiz_template = Handlebars.compile(templates.quiz_body);
		var quiz_body = "";
		data.items = JSON.parse(data.items)

		data.items.forEach(function(item){
			if(templates[item.item_type]){
				var item_template = Handlebars.compile(templates[item.item_type]);
				quiz_body += item_template(item);
			}
		});

		return quiz_template({ id: data.id, title: data.title, body: quiz_body });
	}

	_public.render_login = function(data){
		return templates.login;
	}

	return _public;
})();
