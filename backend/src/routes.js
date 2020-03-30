const express = require('express');
const { celebrate, Segments, Joi } = require('celebrate');

const OngController = require('./controllers/OngController');
const IncidentController = require('./controllers/IncidentController');
const ProfileController = require('./controllers/ProfileController');
const SessionController = require('./controllers/SessionController');

const routes = express.Router();

routes.post('/sessions', SessionController.create);

//	ONGS
routes.get('/ongs', OngController.index);
routes.post(
	'/ongs',
	celebrate({
		[Segments.BODY]: Joi.object().keys({
			name: Joi.string().required(),
			email: Joi.string()
				.required()
				.email(),
			whatsapp: Joi.string()
				.required()
				.length(12),
			city: Joi.string().required(),
			country: Joi.string().required()
		})
	}),
	OngController.store
);

//	INCIDENTS
routes.get(
	'/incidents',
	celebrate({
		[Segments.QUERY]: Joi.object().keys({
			page: Joi.number()
		})
	}),
	IncidentController.index
);
routes.post('/incidents', IncidentController.store);
routes.delete(
	'/incidents/:id',
	celebrate({
		[Segments.PARAMS]: Joi.object().keys({
			id: Joi.number().required()
		})
	}),
	IncidentController.remove
);

//	PROFILES
routes.get(
	'/profile',
	celebrate({
		[Segments.HEADERS]: Joi.object()
			.keys({
				authorization: Joi.string().required()
			})
			.unknown()
	}),
	ProfileController.index
);

module.exports = routes;
