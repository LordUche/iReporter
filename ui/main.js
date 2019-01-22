// google.maps.event.addDomListener(window, 'load', init);

const signupForm = document.querySelector('.signup-page form');

function signup(e) {
  e.preventDefault();
  console.log(signupForm);

  const url = 'http://localhost:3000/api/v1/auth/signup';
  const {
    firstname, lastname, othernames, username, phonenumber, email, password,
  } = this;
  const data = {
    firstname: firstname.value,
    lastname: lastname.value,
    othernames: othernames.value,
    username: username.value,
    phonenumber: phonenumber.value,
    email: email.value,
    password: password.value,
  };
  if (!data.phonenumber) delete data.phonenumber;
  console.log(data);
  const request = new Request(url, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: new Headers({ 'Content-type': 'application/json; charset=UTF-8' }),
  });
  fetch(request)
    .then(res => res.json())
    .then((data) => {
      if (data.status === 201) location.replace('./profile.html');
      else console.log(data);
    });
}

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

signupForm.addEventListener('submit', signup);
