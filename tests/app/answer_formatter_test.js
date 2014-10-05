describe('AnswerFormatter', function(){
	var AnswerFormatter;

	beforeEach(function(){
		module('QuizApp');

		inject(function(_AnswerFormatter_){
			AnswerFormatter = _AnswerFormatter_;
		});
	});

	it('should manipulate open question answer if max length is set', function(){
		var output = AnswerFormatter.output(
			{ 
				items: [
					{
						question: 'Waddup?',
						value: 'My nigga!',
						max_length: 5,
						item_type: 'open_question'
					}
				]
			}
		);

		expect(output[0].value.length).toBe(5);
	});

	it('should not manipulate open question answer length if max length not set', function(){
		var output = AnswerFormatter.output(
			{ 
				items: [
					{
						question: 'Waddup?',
						value: 'My nigga!',
						item_type: 'open_question'
					}
				]
			}
		);

		expect(output[0].value).toBe('My nigga!');
	})
});