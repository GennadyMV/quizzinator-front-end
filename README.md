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
<body ng-app="QuizApp" ng-controller="MainController" ng-init="init({ 'templates': 'build/templates' })">
```

init-funktion parametrit:

*templates*: polku template-tiedostoihin, oletuksena polku build/templates.

###Kyselyn upotus

```
<div ng-controller="QuizController" ng-init="init({ 'id': 1 })" quiz>
        <div ng-include="view"></div>
</div>
```

init-funktion parametrit:

*id*: upotettavan kyselyn id.
