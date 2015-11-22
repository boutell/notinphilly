(function () {
angular.module('notinphillyServerApp')
  .controller('mainController', [ '$scope', '$http', 'mapService', function($scope, $http, mapService) {
    angular.extend($scope, {
               zoomControl: false,
                center: {
                    lat: 39.948920,
                    lng: -75.201825,
                    zoom: 13
                },
                tiles: {
                   name: 'Not in philly map',
                   url: 'http://api.tiles.mapbox.com/v4/{mapid}/{z}/{x}/{y}.png?access_token={apikey}',
                   type: 'xyz',
                   options: {
                       apikey: 'pk.eyJ1IjoieXVyeWtvcnp1biIsImEiOiJjaWY2eTN2aHMwc3VncnptM3QxMzU3d3hxIn0.Mt0JldEMvvTdWW4GW2RSlQ',
                       mapid: 'yurykorzun.nljndeg0'
                   }
               }
            });
    $scope.tooltip = {};
    console.log("Loading main page...");
    var mapCallbacks = {
      neighborhoodMouseOverCallback : function(e)
      {
          var x = e.originalEvent.pageX;
          var y = e.originalEvent.pageY;
          var layer = e.target;

          if ( typeof x !== 'undefined' ){
            $scope.tooltip.nhoodTooltipStyle = {
              top: (y - 120 ) + 'px',
              left: (x + 20) + 'px'
            };
            $scope.tooltip.isNhoodTooltipVisible = true;
          }
          else
          {
            $scope.tooltip.isNhoodTooltipVisiblee = false;
          }

          $scope.tooltip.hoverOverNhoodName = layer.feature.properties.name;
          $scope.tooltip.totalStreetsAdopted = 0;
          $scope.tooltip.totalStreets = 100;
      },
      neighborhoodMouseOutCallback : function(e)
      {
          $scope.tooltip.isNhoodTooltipVisible  = false;
      },
      streetMouseOverCallback : function(e)
      {
        var x = e.originalEvent.pageX;
        var y = e.originalEvent.pageY;
        if ( typeof x !== 'undefined' ){
          $scope.tooltip.streetTooltipStyle = {
            top: (y - 120 ) + 'px',
            left: (x + 20) + 'px'
          };
          $scope.tooltip.isStreetTooltipVisible = true;
        }
        else
        {
          $scope.tooltip.isStreetTooltipVisiblee = false;
        }

        var layer = e.target;

        $scope.tooltip.hoverOverStreetName = layer.feature.properties.name;
        $scope.tooltip.totalStreetAdopters = 0;

        layer.setStyle({
            opacity: 0.7,
            weight: 15
        });

        if (!L.Browser.ie && !L.Browser.opera) {
            layer.bringToFront();
        }
      },
      streetMouseOutCallback: function(e){
          $scope.tooltip.isStreetTooltipVisible = false;

          var layer = e.target;

          layer.setStyle({
            weight: 10,
            opacity: 0.4
          });
      },
      streetClickCallback: function(e){
        if(e.target.feature)
        {
          mapService.showStreetPopup(e.latlng, e.target.feature.properties);
        }
        $scope.tooltip.isStreetTooltipVisible = false;
      }
    };

    mapService.setMapCallbacks(mapCallbacks);
    mapService.setNeighborhoodLayers();
  }]);
})();
