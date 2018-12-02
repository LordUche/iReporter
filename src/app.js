const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const redFlagFixtures = require('../test/fixtures/red-flags.json');


const incidents = redFlagFixtures.all.success.body.data;
const fakeDatabase = { incidents };
const redFlags = fakeDatabase.incidents.filter(incident => incident.type == 'red-flag');

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.get('/api/v1/red-flags', (req, res) => {
  res.status(200).json({ data: redFlags, status: 200 });
});

app.get('/api/v1/red-flags/:id', (req, res) => {
  const data = redFlags.filter(incident => incident.id == req.params.id);
  if (data.length) {
    res.status(200).json({ data, status: 200 });
  } else {
    res.status(404).json({ status: 404, error: 'That record does not exist' });
  }
});

app.post('/api/v1/red-flags', (req, res) => {
  const {
    location,
    comment,
    Images,
    Videos,
    createdBy,
  } = req.body;

  if (location && comment && createdBy) {
    const id = Math.floor(Math.random() * 100000);

    fakeDatabase.incidents.push({
      id,
      comment,
      location,
      createdBy,
      Images: Images || [],
      Videos: Videos || [],
      type: 'red-flag',
      status: 'draft',
      createdOn: new Date(),
    });

    res.status(201).json({
      status: 201,
      data: [{
        id,
        message: 'Created red-flag record',
      }],
    });
  } else {
    res.status(400).json({
      status: 400,
      error: 'Failed to create record',
    });
  }
});

app.put('/api/v1/red-flags/:id/location', (req, res) => {
  const data = redFlags.filter(incident => incident.id == req.params.id);
  const index = fakeDatabase.incidents.indexOf(data[0]);

  if (data.length) {
    fakeDatabase.incidents[index].location = req.body.location;
    res.status(200).json({
      status: 200,
      data: [{
        id: data[0].id,
        message: "Updated red-flag record's location",
      }],
    });
  } else {
    res.status(404).json({ status: 404, error: 'That record does not exist' });
  }
});

app.put('/api/v1/red-flags/:id/comment', (req, res) => {
  const data = redFlags.filter(incident => incident.id == req.params.id);
  const index = fakeDatabase.incidents.indexOf(data[0]);

  if (data.length) {
    fakeDatabase.incidents[index].comment = req.body.comment;
    res.status(200).json({
      status: 200,
      data: [{
        id: data[0].id,
        message: "Updated red-flag record's comment",
      }],
    });
  } else {
    res.status(404).json({ status: 404, error: 'That record does not exist' });
  }
});

app.delete('/api/v1/red-flags/:id', (req, res) => {
  const data = redFlags.filter(incident => incident.id == req.params.id);
  const index = fakeDatabase.incidents.indexOf(data[0]);

  if (data.length) {
    fakeDatabase.incidents.splice(index, 1);
    res.status(200).json({
      status: 200,
      data: [{
        id: data[0].id,
        message: 'Deleted red-flag record',
      }],
    });
  } else {
    res.status(404).json({ status: 404, error: 'That record does not exist' });
  }
});

app.listen(process.env.PORT || 3000, () => {
  console.log('Server started on port ', `${process.env.PORT || 3000}...`);
});
