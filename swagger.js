const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Task Master API',
    description: 'Stores tasks, users, teams and inventory info and allows users to CRUD.',
  },
  host: 'taskmaster-oq75.onrender.com',
  schemes: ['https'],
};

const outputFile = './swagger-output.json';
const endpointsFiles = ['./routes/index.js'];

/* NOTE: if you use the express Router, you must pass in the 
   'endpointsFiles' only the root file where the route starts,
   such as index.js, app.js, routes.js, ... */

swaggerAutogen(outputFile, endpointsFiles, doc);