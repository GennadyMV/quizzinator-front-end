#Plugin

## Käyttö

###HEAD-tagi

```
<link rel="stylesheet" href="vendor/font-awesome/css/font-awesome.min.css">

<link rel="stylesheet" href="build/quiz.min.css">

<script src="build/quiz.min.js"></script>
```

###BODY-tagi

```
<body ng-app="QuizApp" ng-controller="MainController">
```

###Pluginin upotus

```
<div ng-controller="QuizController" ng-init="init(1)" quiz>
        <div ng-include="view"></div>
</div>
```
