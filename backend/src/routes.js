const express = require('express');

const OngController = require('./controllers/OngController');
const IncidentController = require('./controllers/IncidentController');
const ProfileController = require('./controllers/ProfileController');
const SessionController = require('./controllers/SessionController');

const routes = express.Router();

routes.post('/sessions', SessionController.create);

//	ONGS
routes.get('/ongs', OngController.index);
routes.post('/ongs', OngController.store);

//	INCIDENTS
routes.get('/incidents', IncidentController.index);
routes.post('/incidents', IncidentController.store);
routes.delete('/incidents/:id', IncidentController.remove);

//	PROFILES
routes.get('/profile', ProfileController.index);

module.exports = routes;
