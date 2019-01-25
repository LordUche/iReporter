const [form] = document.forms;

function report(e) {
  e.preventDefault();

  const {
    type, latitude, longitude, comment,
  } = this;
  const url = `http://localhost:3000/api/v1/${type.value}s`;
  const request = new Request(url, {
    method: 'post',
    headers: new Headers({
      'Content-Type': 'application/json; charset=UTF-8',
      'access-token': localStorage.getItem('token'),
    }),
    body: JSON.stringify({
      location: `${latitude.value}, ${longitude.value}`,
      comment: comment.value,
    }),
  });

  fetch(request)
    .then(res => res.json())
    .then((result) => {
      const { id } = result.data[0];
      if (result.status === 201) location.replace(`./incident.html?id=${id}&type=${type.value}`);
      else console.error(result);
    })
    .catch(console.error);
}

form.addEventListener('submit', report);
