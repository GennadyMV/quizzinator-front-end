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

###Kyselyn upotus

```
<div ng-controller="QuizController" ng-init="init({ 'id': 1 })" quiz>
        <div ng-include="view"></div>
</div>
```

init-funktion parametrit:

* *id*: upotettavan kyselyn id.

###Lisenssi
Varmaan MIT
##Kolmannen osapuolen komponentit ja niiden lisenssit
| komponentti | lisenssi |
| ----------- | -------- |
| AngularJS   | MIT      |
| Bootstrap   | MIT      |
| Font Awesome | SIL OFL 1.1 |
| Font Awesome code | MIT |
| highlight.js | BSD |
| jQuery | MIT |
| jStorage | Unlicense |
| lz-string | WTFPL |
| Raphaël | MIT |
| Raphael SketchPad | MIT |
