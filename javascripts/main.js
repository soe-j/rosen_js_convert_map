$(function () {
  // init
  var rosen = new Rosen('rmap', {
    apiKey: '',
    logoAttributionControl: false, // ロゴ非表示
    zoomControl: false             // ズームコントロール非表示
  });
  var ymap = new Y.Map("ymap", {
    configure: {
      scrollWheelZoom : true
    }
  });
  // bind
  $(window).bind("resize", function(e){
    ymap.updateSize();
  });
  // add method
  rosen.setCenterByCoordinate = function (lat, lon) {
    rosen.getNearestStations({
      latitude: lat,
      longitude: lon,
      range: 5000,
      limit: 3
    }).then(function (points) {
      if (points) {
        var trainPoints = points.filter(function(point){
          var type = point.station.station_type;
          return type % 2 == 1;
        });
        if (trainPoints.length >= 3) {
          var stations = trainPoints.map(function(point){
            var station = point.station;
            var coordinates = station.station_rects[16].symbol_rect.geometry.coordinates[0];
            var centerX = (coordinates[0][0] + coordinates[2][0]) / 2;
            var centerY = (coordinates[0][1] + coordinates[2][1]) / 2;
            return {
              name: station.name,
              coordinate: [centerX, centerY],
              distance: point.distance
            };
          });
          var hereOnMap = shingen(
            stations[0].coordinate[0], stations[0].coordinate[1], stations[0].distance,
            stations[1].coordinate[0], stations[1].coordinate[1], stations[1].distance,
            stations[2].coordinate[0], stations[2].coordinate[1], stations[2].distance
          );
          hereOnMap.push(16);
          rosen.setView(hereOnMap, 16, {animate: true});
        } else {
          console.log('近くに鉄道駅が3つ以上ない');
        }
      }
    })
  };

  // main
  ymap.drawMap(new Y.LatLng(35.66572, 139.73100), 16, Y.LayerSetId.NORMAL);
  rosen.setCenterByCoordinate(35.66572, 139.73100);
  ymap.bind('moveend', function(){
    var yCoordinate = ymap.getCenter();
    rosen.setCenterByCoordinate(yCoordinate.Lat, yCoordinate.Lon);
  });
});

// tools
var shingen = function(Xa, Ya, Ra, Xb, Yb, Rb, Xc, Yc, Rc) {
  var G = 0.05;

  var K = 2 * (Xb - Xa);
  var M = 2 * (Yb - Ya);
  var N = (Xa - Xb) * (Xa + Xb) + (Ya - Yb) * (Ya + Yb) - G * (Ra - Rb) * G * (Ra + Rb);
  var S = 2 * (Xc - Xb);
  var T = 2 * (Yc - Yb);
  var U = (Xb - Xc) * (Xb + Xc) + (Yb - Yc) * (Yb + Yc) - G * (Rb - Rc) * G * (Rb + Rc);
  var X = (N * T - M * U) / (M * S - K * T);
  var Y = (K * U - N * S) / (M * S - K * T);
  return [X, Y];
};
