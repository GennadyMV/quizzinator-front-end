#Plugin

## Käyttö

Esimerkki:

<pre>

<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>Plugin</title>

        <!-- Font awesome -->
        <link rel="stylesheet" href="vendor/font-awesome/css/font-awesome.min.css">

        <!-- Application style -->
        <link rel="stylesheet" href="build/quiz.min.css">

        <!-- Application script -->
        <script src="build/quiz.min.js"></script>
    </head>
    <body style="padding: 40px;" ng-app="QuizApp" ng-controller="MainController">
        <div ng-controller="QuizController" ng-init="init(1)" quiz>
            <div ng-include="view"></div>
        </div>

        <div ng-controller="QuizController" ng-init="init(1)" quiz>
            <div ng-include="view"></div>
        </div>
    </body>
</html>

</pre>
