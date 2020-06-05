const express = require('express');

const OngController = require('./controllers/OngController');
const IncidentController = require('./controllers/IncidentController');
const ProfileController = require('./controllers/ProfileController');
const SessionController = require('./controllers/SessionController');

const OngsValidator = require('./validators/OngsValidator');
const ProfileValidator = require('./validators/ProfileValidator');
const IncidentValidator = require('./validators/IncidentValidator');

const routes = express.Router();

routes.post('/sessions', SessionController.store);

routes.get('/ongs' , OngController.index );
routes.post('/ongs', OngsValidator.store , OngController.store);

routes.get('/profile', ProfileValidator.index ,ProfileController.index)

routes.get('/incidents', IncidentValidator.index ,IncidentController.index);
routes.post("/incidents",IncidentController.store);
routes.delete('/incidents/:id', IncidentValidator.delete , IncidentController.delete );


module.exports = routes;