// navigator.geolocation.getCurrentPosition(
//   position => {
//     const coordinate = position.coords;
//     drawMap(coordinate.longitude, coordinate.latitude);
//   },
//   error => {
//     console.warn(`ERROR(${error.code}): ${error.message}`);
//   });

// function drawMap(longitude, latitude) {
mapboxgl.accessToken = `pk.eyJ1Ijoic3VwZXJ4aW4iLCJhIjoiY2thNWlqZHd4MDBpODNnb3owMDA2Y3dnYiJ9.-zciQf0emsOdjhIjB2uoNA`;

const map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mapbox/streets-v9',
  // center: [longitude, latitude],
  // zoom: 13
});

// const marker = new mapboxgl.Marker()
//   .setLngLat([longitude, latitude])
//   .addTo(map);
const geoLocate = new mapboxgl.GeolocateControl();

map.on('load', function() {
  geoLocate.trigger();
});

map.addControl(geoLocate);
// }