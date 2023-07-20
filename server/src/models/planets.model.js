const { parse } = require('csv-parse');
const fs = require('fs');

const habitablePlanets = [];

function isPlanetHabitable(planet) {
    return planet['koi_disposition'] === 'CONFIRMED'
        && planet['koi_insol'] > 0.36 && planet['koi_insol'] < 1.11
        && planet['koi_prad'] < 1.6;
}

fs.createReadStream('./data/kepler_data.csv')
    .pipe(parse({
        comment: '#',
        columns: true
    }))
    .on('data', (data) => {
        if (isPlanetHabitable(data)) {
            habitablePlanets.push(data);
        }
    })
    .on('error', (error) => {
        console.log(error);
    })
    .on('end', () => {
        console.log(`${habitablePlanets.length} habitable planets found!`);
        console.log('Done');
    });

    module.exports = {
        planets: habitablePlanets,
    };