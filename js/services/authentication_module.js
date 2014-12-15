var Auth = (function(){
  var self = {};

  var _add_to_storage = function(key, value){
    $.jStorage.set(key, value);
    $.cookie(key, value);
  }

  self.login = function(username, options){
    _add_to_storage('quiz_username', username);

    var scope = null;

    if(options && options.scope){
      scope = options.scope
    }else{
      scope = angular.element($('body')).scope();
    }

    scope.$apply(function(){
      scope.username = username;
    });
  }

  self.logout = function(options){
    $.removeCookie('quiz_username');
    $.jStorage.deleteKey('quiz_username');

    var scope = null;

    if(options && options.scope){
      scope = options.scope
    }else{
      scope = angular.element($('body')).scope();
    }

    scope.$apply(function(){
      scope.username = null;
    });
  }

  return self;
})();
