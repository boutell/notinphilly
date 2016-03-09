(function () {
  var  app = angular.module('notinphillyServerApp', [
      'ngRoute',
      'ui.bootstrap',
      'ngAnimate',
      'treasure-overlay-spinner',
      'ui.select',
      'ngCookies',
      'ui.mask',
      'ngSanitize',
      'ui.grid',
      'ui.grid.pagination',
      'google.places'
    ])

    app.constant("APP_EVENTS", {
        "SPINNER_START": "spinnerStart",
        "SPINNER_END": "spinnerEnd",
        "LOGIN_SUCCESS": "loginSuccess",
        "LOGIN_FAILED": "loginFailed",
        "LOGOUT": "logout",
        "ENTER_NEIGBORHOOD_LEVEL": "enterNeigborhoodLevel",
        "ENTER_STREET_LEVEL": "enterStreetLevel",
        "STREET_ADOPTED": "streetAdopted",
        "STREET_LEFT": "streetLeft"
    });

  app.constant("APP_CONSTS", {
        "FOUND_STREET": "notinphilly.foundStreet",
        "MAP_CENTER": {  lat: 39.931054,  lng: -75.204009 },
    });

    app.config(function ($routeProvider, $logProvider, $provide) {
      $routeProvider
        .when('/', {
          templateUrl: 'app/main/main.html',
          controller: 'mainController'
        })
        .when('/admin', {
          templateUrl: 'app/admin/admin-template.html',
          controller: 'AdminController'
        })
        .otherwise({
          redirectTo: '/'
        });

        $provide.decorator('$exceptionHandler', ['$delegate',
          function($delegate) {
            return function(exception, cause) {
              $delegate(exception, cause);
            };
          }
        ]);

        $logProvider.debugEnabled(false);
    });

  app.run([
    '$rootScope',
    function($rootScope) {

    }
  ]);
})();
