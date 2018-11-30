const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const redFlagFixtures = require('../test/fixtures/red-flags.json');


const incidents = redFlagFixtures.all.success.body.data
const fakeDatabase = {
	incidents
};

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.get('/api/v1/red-flags', (req, res) => {
	const data = fakeDatabase.incidents.filter(incident => incident.type === 'red-flag');
	res.status(200).json({data, status: 200});
});

app.post('/api/v1/red-flags', (req, res) => {
	const {location, comment, Images, Videos, createdBy} = req.body;
	
	if(location && comment && createdBy) {
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
				message: 'Created red-flag record'
			}]
		});
	} else {
		res.status(400).json({
			status: 400,
			error: 'Failed to create record'
		})
	}
});

app.listen(3000, () => {
	console.log('Server started on port 3000...');
})