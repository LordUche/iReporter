if (!localStorage.getItem('token')) location.replace('../index.html');
const logoutBtn = document.querySelector('.logout');
const [username1, username2] = document.querySelectorAll('.username');
const phonenumber = document.querySelector('.phonenumber');
const email = document.querySelector('.email');
const fullname = document.querySelector('.fullname');
const rejectedSummary = document.querySelector('.rejected');
const resolvedSummary = document.querySelector('.resolved');
const unresolvedSummary = document.querySelector('.unresolved');
const cardIncidents = document.querySelector('.card-incidents');
const tableIncidents = document.querySelector('.table-incidents');

function displayIncidents(data) {
  if (data.length) {
    data.forEach((incident) => {
      const typeClass = incident.type === 'red-flag' ? 'fa fa-flag error' : 'fa fa-exclamation-triangle warn';
      let statusClass;
      switch (incident.status) {
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
      cardIncidents.innerHTML += `
      <a href="./incident.html?id=${incident.id}&type=${incident.type}" class="card fx-row ac col">
        <span class="flex col-3-4">${incident.comment}</span>
        <span class="flex tc"><i class="${typeClass}"></i></span>
        <span class="flex tc"><i class="${statusClass}"></i></span>
      </a>
    `;
      tableIncidents.innerHTML += `
      <tr>
        <td>
          <a href="./incident.html?id=${incident.id}&type=${incident.type}">${incident.comment}</a>
        </td>
        <td class="tl"><i class="${typeClass}"></i> ${incident.type}</td>
        <td class="tl"><i class="${statusClass}"></i> ${incident.status}</td>
      </tr>
    `;
    });
  } else {
    cardIncidents.innerHTML = '<p class="bold">No reported incidents</p>';
    tableIncidents.innerHTML = '<p class="bold">No reported incidents</p>';
  }
}

function getProfile() {
  const request = new Request('http://localhost:3000/api/v1/profile', {
    headers: new Headers({
      'content-type': 'application/json; charset=UTF-8',
      'access-token': localStorage.getItem('token'),
    }),
  });

  fetch(request)
    .then(res => res.json())
    .then((result) => {
      const {
        user, data, resolved, rejected, unresolved, status,
      } = result;
      console.log(status);
      const { firstname, othernames, lastname } = user;
      username1.textContent = user.username;
      username2.textContent = `@${user.username}`;
      phonenumber.textContent = user.phonenumber;
      email.textContent = user.email;
      fullname.textContent = `${firstname} ${othernames || ''} ${lastname}`;
      resolvedSummary.textContent = resolved;
      rejectedSummary.textContent = rejected;
      unresolvedSummary.textContent = unresolved;
      displayIncidents(data);
    })
    .catch(console.error);
}

function logout() {
  localStorage.clear();
  location.replace('../index.html');
}

window.addEventListener('load', getProfile);
logoutBtn.addEventListener('click', logout);
