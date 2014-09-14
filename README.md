#Plugin

## Set up
<pre>
  <!-- HEAD SECTION -->
  <script src="quiznator.js"></script>
  
  <!-- BOOTSTRAP FILES -->
  <script src="vendor/bootstrap/js/bootstrap.min.js"></script>
  <link rel="stylesheet" href="vendor/bootstrap/css/bootstrap.min.css"/>
</pre>

## Usage

###Without jQuery
<pre>
  <div class="quiz-container" data-quizId="{My quiz id}"></div>
</pre>

###With jQuery
<pre>
  <div class="my-custom-element"></div>
</pre>

And call the quiz-plugin

<pre>
  $('.my-custom-element').quiz({ quizId: my_quiz_id });
</pre>
