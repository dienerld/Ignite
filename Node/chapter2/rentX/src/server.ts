import express from 'express';
import swaggerUi from 'swagger-ui-express';

import { router } from './routes';
import swaggerFile from './swagger.json';
import './database';

const app = express();
const PORT = 3333;

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));
app.use(express.json());

app.get('/api', (request, response) => response.send());

app.use(router);

app.listen(PORT, () => console.log('server running'));