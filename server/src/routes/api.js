const express = require('express'); 

const planetsRouter = require('./planets/planets.router');
const launchesRouter = require('./launches/launches.router');

const api = express.Router();

app.use('/v1/planets', planetsRouter);
app.use('/v1/launches', launchesRouter);

module.exports = api;