import express from 'express';
import config from '../../lib/config.js';

const app = express();


app.listen(config.services.farm.port, () => {
  console.log('Listening on port: '+config.services.farm.port);
});