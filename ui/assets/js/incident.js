const commentTxt = document.querySelector('.comment');
const locationTxt = document.querySelector('.location');
const typeTxt = document.querySelector('.type');
const statusTxt = document.querySelector('.status');
const createdOnTxt = document.querySelector('.created-on');
const type = new URLSearchParams(location.search).get('type');
const id = new URLSearchParams(location.search).get('id');
const url = `http://localhost:3000/api/v1/${type}s/${id}`;
const headers = new Headers({
  'Content-Type': 'application/json; charset=UTF-8',
  'access-token': localStorage.token,
});

function getIncident(e) {
  e.preventDefault();
  const request = new Request(url, {
    method: 'get',
    headers,
  });

  fetch(request)
    .then(res => res.json())
    .then((result) => {
      if (result.status === 200) {
        const {
          comment, location: latlng, status, createdon,
        } = result.data[0];
        const typeClass = type === 'red-flag' ? 'fa fa-flag error' : 'fa fa-exclamation-triangle warn';
        let statusClass;
        switch (status) {
          case 'resolved':
            statusClass = 'fa fa-check success';
            break;

          case 'rejected':
            statusClass = 'fa fa-close error';
            break;

          case 'under investigation':
            statusClass = 'fa fa-eye accent';
            break;

          default:
            statusClass = 'fa fa-spinner warn';
            break;
        }
        commentTxt.textContent = comment;
        locationTxt.textContent = latlng;
        locationTxt.innerHTML
          += status === 'draft' ? ' <i class="fa fa-pencil t-sm" onclick="editLocation()"></i>' : '';
        typeTxt.innerHTML = `<i class="${typeClass} mr-1"></i> ${type}`;
        statusTxt.innerHTML = `<i class="${statusClass} ml-2"></i> ${status}`;
        createdOnTxt.innerHTML = `<i class="fa fa-clock-o mr-1"></i> ${new Date(
          createdon,
        ).toLocaleString()}`;
      } else {
        console.log(result.error);
      }
    })
    .catch(console.error);
}

function deleteIncident() {
  fetch(
    new Request(url, {
      method: 'delete',
      headers,
    }),
  )
    .then(res => res.json())
    .then((result) => {
      if (result.status === 200) {
        location.replace('./profile.html');
      }
    })
    .catch(console.error);
}

function editComment() {
  openPopup('#editCommentPopup');
  document.querySelector('#editCommentTxt').value = commentTxt.textContent.trim();
}

function editLocation() {
  openPopup('#editLocationPopup');
  document.querySelector('#editLocationTxt').value = locationTxt.textContent.trim();
}

function updateComment(e) {
  e.preventDefault();
  fetch(
    new Request(`${url}/comment`, {
      method: 'PATCH',
      body: JSON.stringify({ comment: document.querySelector('#editCommentTxt').value }),
      headers,
    }),
  )
    .then(res => res.json())
    .then((result) => {
      location.reload();
    })
    .catch(console.dir);
}

function updateLocation(e) {
  e.preventDefault();
  fetch(
    new Request(`${url}/location`, {
      method: 'PATCH',
      body: JSON.stringify({ location: document.querySelector('#editLocationTxt').value }),
      headers,
    }),
  )
    .then(res => res.json())
    .then((result) => {
      location.reload();
    })
    .catch(console.dir);
}

function openPopup(popupSelector) {
  document.querySelector(popupSelector).classList.add('visible');
}

function closePopup(popupSelector) {
  document.querySelector(popupSelector).classList.remove('visible');
}

window.addEventListener('load', getIncident);
