'use strict'

describe('Template module', function(){
	it('should render title corretly', function(){
		var test_quiz = {
			title: 'My awesome quiz',
			items: JSON.stringify([])
		}

		var rendered_quiz = TEMPLATE.render_quiz(JSON.stringify(test_quiz));

		expect(rendered_quiz).toContain('My awesome quiz');
	});

	it('should render fields correctly when one field', function(){
		var test_quiz = {
			title: 'My awesome quiz',
			items: JSON.stringify([
				{
					question: 'My awesome question',
					item_type: 'open_question',
					id: 1
				}
			])
		}

		var rendered_quiz = TEMPLATE.render_quiz(JSON.stringify(test_quiz));

		expect(rendered_quiz).toContain('My awesome quiz');
		expect(rendered_quiz).toContain('My awesome question');
	});

	it('should render fields correctly when multiple fields', function(){
		var test_quiz = {
			title: 'My awesome quiz',
			items: JSON.stringify([
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
			])
		}

		var rendered_quiz = TEMPLATE.render_quiz(JSON.stringify(test_quiz));

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

		var rendered_quiz = TEMPLATE.render_quiz(JSON.stringify(test_quiz));

		expected(rendered_quiz).toContain('Onko?');
		expected(rendered_quiz).toContain('juu');
		expected(rendered_quiz).toContain('ei');
		expected(rendered_quiz).toContain('ehkä');
	})
});
