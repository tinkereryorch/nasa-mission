const fs = require('fs');
const path = require('path');
const { parse } = require('csv-parse');

const planets = require('./planets.mongo');

const habitablePlanets = [];

function isPlanetHabitable(planet) {
    return planet['koi_disposition'] === 'CONFIRMED'
        && planet['koi_insol'] > 0.36 && planet['koi_insol'] < 1.11
        && planet['koi_prad'] < 1.6;
}

function loadPlanetsData() {

    return new Promise((resolve, reject) => {

        fs.createReadStream(path.join(__dirname, '..', '..', 'data', 'kepler_data.csv'))
            .pipe(parse({
                comment: '#',
                columns: true
            }))
            .on('data', async (data) => {
                if (isPlanetHabitable(data)) {
                    await planets.create({
                        keplerName: data.kepler_name,

                    });
                }
            })
            .on('error', (error) => {
                console.log(error);
                reject(error);
            })
            .on('end', () => {
                console.log(`${habitablePlanets.length} habitable planets found!`);
                resolve();
            });
    });
}

function getAllPlanets() {
    return habitablePlanets;
}

module.exports = {
    getAllPlanets,
    loadPlanetsData
};