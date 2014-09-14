#Plugin

## Set up
<code>
  <!-- HEAD SECTION -->
  <script src="quiznator.js"></script>
  
  <!-- BOOTSTRAP FILES -->
  <script src="vendor/bootstrap/js/bootstrap.min.js"></script>
  <link rel="stylesheet" href="vendor/bootstrap/css/bootstrap.min.css"/>
</code>

## Usage

###Without jQuery
<code>
  <div class="quiz-container" data-quizId="{My quiz id}"></div>
</code>

###With jQuery
<code>
  <div class="my-custom-element"></div>
</code>

And call the quiz-plugin

<pre>
  $('.my-custom-element').quiz({ quizId: my_quiz_id });
</pre>
