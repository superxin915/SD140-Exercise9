mapboxgl.accessToken = `pk.eyJ1Ijoic3VwZXJ4aW4iLCJhIjoiY2thNWlqZHd4MDBpODNnb3owMDA2Y3dnYiJ9.-zciQf0emsOdjhIjB2uoNA`;

const geoLocate = new mapboxgl.GeolocateControl();
const searchForm = document.querySelector(`form`);
const map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mapbox/streets-v9'
});

let latitude;
let longitude;

searchForm.addEventListener(`submit`, event => {
  const inputArea = document.querySelector(`input`);

  if (inputArea.value.trim() !== ``) {
    searchPlaces(inputArea.value);
  }

  inputArea.value = ``;
  event.preventDefault();
})

map.on('load', function() {
  geoLocate.trigger();
});

map.addControl(geoLocate);

geoLocate.on(`geolocate`, event => {
  latitude = event.coords.latitude;
  longitude = event.coords.longitude;
})

function searchPlaces(keyword) {
  fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${keyword}.json?access_token=${mapboxgl.accessToken}&proximity=${longitude},${latitude}&types=poi&limit=10`)
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error(`Fail to retrieve data.`);
      }
    })
    .then(data => {
      updateSearchResults(data.features);
    })
}

function updateSearchResults(list) {
  const searchResultArea = document.querySelector(`.points-of-interest`);
  let html = ``;

  list.forEach(location => {
    const distance = calculateDistance(longitude, latitude, location.center[0], location.center[1]);
    html += `
      <li class="poi" data-long="${location.center[0]}" data-lat="${location.center[1]}">
        <ul>
          <li class="name">${location.text}</li>
          <li class="street-address">${location.properties.address}</li>
          <li class="distance">${distance} km</li>
        </ul>
      </li>
    `;
  })

  searchResultArea.innerHTML = html;
}

function calculateDistance(longitude1, latitude1, longitude2, latitude2) {
  return (Math.sqrt(Math.pow((longitude1 - longitude2), 2) + Math.pow((latitude1 - latitude2), 2)) * 100).toFixed(1);
}