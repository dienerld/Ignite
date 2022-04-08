import express from 'express';
import { categoriesRoutes } from './routes/categoris.routes';

const app = express();
app.use(express.json());
const PORT = 3333;

app.get('/api', (request, response) => response.send());

app.use(categoriesRoutes);

app.listen(PORT, () => console.log('server running'));
