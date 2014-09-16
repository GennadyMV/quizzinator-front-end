'use strict'

describe('Template module', function(){
	it('should render title corretly', function(){
		var test_quiz = {
			title: 'My awesome quiz',
			items: []
		}

		test_quiz.items = JSON.stringify(test_quiz.items);

		var rendered_quiz = TEMPLATE.render_quiz(test_quiz);

		expect(rendered_quiz).toContain('My awesome quiz');
	});

	it('should render fields correctly when one field', function(){
		var test_quiz = {
			title: 'My awesome quiz',
			items: [
				{
					question: 'My awesome question',
					item_type: 'open_question',
					id: 1
				}
			]
		}
		
		test_quiz.items = JSON.stringify(test_quiz.items);

		var rendered_quiz = TEMPLATE.render_quiz(test_quiz);

		expect(rendered_quiz).toContain('My awesome quiz');
		expect(rendered_quiz).toContain('My awesome question');
	});

	it('should render fields correctly when multiple fields', function(){
		var test_quiz = {
			title: 'My awesome quiz',
			items: [
				{
					question: 'First awesome question',
					item_type: 'open_question',
					id: 1
				},
				{
					question: 'Second awesome question',
					item_type: 'open_question',
					id: 2
				}
			]
		}

		test_quiz.items = JSON.stringify(test_quiz.items);

		var rendered_quiz = TEMPLATE.render_quiz(test_quiz);

		expect(rendered_quiz).toContain('My awesome quiz');
		expect(rendered_quiz).toContain('First awesome question');
		expect(rendered_quiz).toContain('Second awesome question');
	});

	it('should render fields correctly with a multiple choice question', function(){
		var test_quiz = {
			title: 'many choices',
			items: [
				{
					question: 'Onko?',
					options: [
						{title: 'juu'},
						{title: 'ei'},
						{title: 'ehkä'}
					],
					item_type: 'multiple_choice_question'
				}
			]
		}

		test_quiz.items = JSON.stringify(test_quiz.items);

		var rendered_quiz = TEMPLATE.render_quiz(test_quiz);

		expect(rendered_quiz).toContain('Onko?');
		expect(rendered_quiz).toContain('juu');
		expect(rendered_quiz).toContain('ei');
		expect(rendered_quiz).toContain('ehkä');
	})

	it('should render fields correctly with multiple multiple choice questions', function(){
		var test_quiz = {
			title: 'many choices',
			items: [
				{
					question: 'Onko?',
					options: [
						{title: 'juu'},
						{title: 'ei'},
						{title: 'ehkä'}
					],
					item_type: 'multiple_choice_question'
				},
				{
					question: 'Miksi?',
					options: [
						{title: 'siksi'},
						{title: 'koska'},
						{title: '42'}
					],
					item_type: 'multiple_choice_question'
				}	
			]
		}

		test_quiz.items = JSON.stringify(test_quiz.items);

		var rendered_quiz = TEMPLATE.render_quiz(test_quiz);

		expect(rendered_quiz).toContain('Onko?');
		expect(rendered_quiz).toContain('juu');
		expect(rendered_quiz).toContain('ei');
		expect(rendered_quiz).toContain('ehkä');
		expect(rendered_quiz).toContain('Miksi?');
		expect(rendered_quiz).toContain('siksi');
		expect(rendered_quiz).toContain('koska');
		expect(rendered_quiz).toContain('42');
	})

	it('should render fields correctly when open questions and multiple choice questions are used together', function(){
		var test_quiz = {
			title: 'open and multiple',
			items: [
				{
					question: 'Onko?',
					options: [
						{title: 'juu'},
						{title: 'ei'},
						{title: 'ehkä'}
					],
					item_type: 'multiple_choice_question'
				},
				{
					question: 'First awesome question',
					item_type: 'open_question',
					id: 1
				},
			]
		}

		test_quiz.items = JSON.stringify(test_quiz.items);

		var rendered_quiz = TEMPLATE.render_quiz(test_quiz);

		expect(rendered_quiz).toContain('Onko?');
		expect(rendered_quiz).toContain('juu');
		expect(rendered_quiz).toContain('ei');
		expect(rendered_quiz).toContain('ehkä');
		expect(rendered_quiz).toContain('First awesome question');
		expect(rendered_quiz).toContain('open and multiple');
	})
});
