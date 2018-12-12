// google.maps.event.addDomListener(window, 'load', init);
function init() {
  const location = document.getElementById('location');
  const longitude = document.querySelector('#longitude');
  const latitude = document.querySelector('#latitude');

  const autocomplete = new google.maps.places.Autocomplete(location);

  autocomplete.addListener('place_changed', () => {
    const place = autocomplete.getPlace();
    if (place.geometry) {
      const { lat, lng } = place.geometry.location;
      latitude.value = lat();
      longitude.value = lng();
    } else {
      latitude.value = 'error';
      longitude.value = 'error';
    }
  });
}
