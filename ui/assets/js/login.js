if (localStorage.getItem('token')) location.replace('./profile.html');

const [form] = document.forms;

function login(e) {
  e.preventDefault();

  const url = 'https://uche-ireporter.herokuapp.com/api/v1/auth/login';
  const { email, password } = this;
  const data = {
    email: email.value,
    password: password.value,
  };

  const request = new Request(url, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: new Headers({ 'content-type': 'application/json; charset=UTF-8' }),
  });

  fetch(request)
    .then(res => res.json())
    .then((result) => {
      if (result.status === 200) {
        localStorage.token = result.data[0].token;
        localStorage.username = result.data[0].user.username;
        location.replace('./profile.html');
      } else console.log(result);
    })
    .catch(console.error);
}

form.addEventListener('submit', login);
