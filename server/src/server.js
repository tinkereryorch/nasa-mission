const http = require('http');
const { loadPlanetsData } = require('./models/planets.model');
const { loadLaunchesData } = require('./models/launches.model');
const app = require('./app');
const { mongoConnect } = require('./services/mongo');

const PORT = process.env.PORT || 8000;

const server = http.createServer(app);

async function StartServer() {
    await mongoConnect();
    await loadPlanetsData();
    await loadLaunchesData();

    server.listen(PORT, () => {
        console.log(`Listening on port ${PORT}...`);
    });
}

StartServer();
