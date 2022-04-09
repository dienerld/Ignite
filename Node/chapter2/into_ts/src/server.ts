import express from 'express';
import { categoriesRoutes } from './routes/categories.routes';

const app = express();
app.use(express.json());
const PORT = 3333;

app.get('/api', (request, response) => response.send());

app.use('/categories', categoriesRoutes);

app.listen(PORT, () => console.log('server running'));
