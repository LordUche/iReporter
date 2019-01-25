if (localStorage.getItem('token')) location.replace('./profile.html');

const [form] = document.forms;
const countries = document.querySelector('#country');
const africanCountries = [
  { iso: 'DZ', name: 'Algeria', code: '213' },
  { iso: 'AO', name: 'Angola', code: '244' },
  { iso: 'BJ', name: 'Benin', code: '229' },
  { iso: 'BW', name: 'Botswana', code: '267' },
  { iso: 'BF', name: 'Burkina Faso', code: '226' },
  { iso: 'BI', name: 'Burundi', code: '257' },
  { iso: 'CM', name: 'Cameroon', code: '237' },
  { iso: 'CV', name: 'Cape Verde', code: '238' },
  { iso: 'CF', name: 'Central African Republic', code: '236' },
  { iso: 'TD', name: 'Chad', code: '235' },
  { iso: 'KM', name: 'Comoros', code: '269' },
  { iso: 'CD', name: 'Democratic Republic of the Congo', code: '243' },
  { iso: 'DJ', name: 'Djibouti', code: '253' },
  { iso: 'EG', name: 'Egypt', code: '20' },
  { iso: 'GQ', name: 'Equatorial Guinea', code: '240' },
  { iso: 'ER', name: 'Eritrea', code: '291' },
  { iso: 'ET', name: 'Ethiopia', code: '251' },
  { iso: 'GA', name: 'Gabon', code: '241' },
  { iso: 'GM', name: 'Gambia', code: '220' },
  { iso: 'GH', name: 'Ghana', code: '233' },
  { iso: 'GN', name: 'Guinea', code: '224' },
  { iso: 'GW', name: 'Guinea-Bissau', code: '245' },
  { iso: 'CI', name: 'Ivory Coast', code: '225' },
  { iso: 'KE', name: 'Kenya', code: '254' },
  { iso: 'LS', name: 'Lesotho', code: '266' },
  { iso: 'LR', name: 'Liberia', code: '231' },
  { iso: 'LY', name: 'Libya', code: '218' },
  { iso: 'MG', name: 'Madagascar', code: '261' },
  { iso: 'MW', name: 'Malawi', code: '265' },
  { iso: 'ML', name: 'Mali', code: '223' },
  { iso: 'MR', name: 'Mauritania', code: '222' },
  { iso: 'MU', name: 'Mauritius', code: '230' },
  { iso: 'YT', name: 'Mayotte', code: '262' },
  { iso: 'MA', name: 'Morocco', code: '212' },
  { iso: 'MZ', name: 'Mozambique', code: '258' },
  { iso: 'NA', name: 'Namibia', code: '264' },
  { iso: 'NE', name: 'Niger', code: '227' },
  { iso: 'NG', name: 'Nigeria', code: '234' },
  { iso: 'CG', name: 'Republic of the Congo', code: '242' },
  { iso: 'RE', name: 'Reunion', code: '262' },
  { iso: 'RW', name: 'Rwanda', code: '250' },
  { iso: 'SH', name: 'Saint Helena', code: '290' },
  { iso: 'ST', name: 'Sao Tome and Principe', code: '239' },
  { iso: 'SN', name: 'Senegal', code: '221' },
  { iso: 'SC', name: 'Seychelles', code: '248' },
  { iso: 'SL', name: 'Sierra Leone', code: '232' },
  { iso: 'SO', name: 'Somalia', code: '252' },
  { iso: 'ZA', name: 'South Africa', code: '27' },
  { iso: 'SS', name: 'South Sudan', code: '211' },
  { iso: 'SD', name: 'Sudan', code: '249' },
  { iso: 'SZ', name: 'Swaziland', code: '268' },
  { iso: 'TZ', name: 'Tanzania', code: '255' },
  { iso: 'TG', name: 'Togo', code: '228' },
  { iso: 'TN', name: 'Tunisia', code: '216' },
  { iso: 'UG', name: 'Uganda', code: '256' },
  { iso: 'EH', name: 'Western Sahara', code: '212' },
  { iso: 'ZM', name: 'Zambia', code: '260' },
  { iso: 'ZW', name: 'Zimbabwe', code: '263' },
];

function populateCountries(e) {
  const optArr = africanCountries.reduce(
    (acc, country) => {
      acc.push(
        `<option value="${country.iso.toLowerCase()}">${country.name} (${country.code})</option>`,
      );
      return acc;
    },
    ['<option value="" disabled selected>Country...</option>'],
  );

  countries.innerHTML = optArr.join('');
}

function signup(e) {
  e.preventDefault();

  const url = 'http://localhost:3000/api/v1/auth/signup';
  const {
    firstname, lastname, othernames, username, country, phonenumber, email, password,
  } = this;
  const data = {
    firstname: firstname.value,
    lastname: lastname.value,
    othernames: othernames.value,
    username: username.value,
    country: country.value,
    phonenumber: phonenumber.value,
    email: email.value,
    password: password.value,
  };
  if (!data.phonenumber) delete data.phonenumber;
  if (!data.othernames) delete data.othernames;
  console.log(data);
  const request = new Request(url, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: new Headers({ 'Content-type': 'application/json; charset=UTF-8' }),
  });
  fetch(request)
    .then(res => res.json())
    .then((result) => {
      if (result.status === 201) {
        localStorage.setItem('token', result.data[0].token);
        localStorage.username = result.data[0].user.username;
        location.replace('./profile.html');
      } else if (result.status === 400) {
        const errors = result.errors.map(e => `<p>${e}</p>`) || `<p>${result.error}</p>`;
        document.querySelector('.error-messages').innerHTML = errors;
        openPopup('#errors');
      } else {
        document.querySelector('.error-messages').innerHTML = `<p>${result.error}</p>`;
        openPopup('#errors');
      }
    })
    .catch(console.log);
}

function openPopup(popupSelector) {
  document.querySelector(popupSelector).classList.add('visible');
}

function closePopup(popupSelector) {
  document.querySelector(popupSelector).classList.remove('visible');
}

form.addEventListener('submit', signup);
window.addEventListener('load', populateCountries);
