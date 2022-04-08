const express = require('express');

const app = express();
app.use(express.json());

const port = 3333;

/**
 * Route Params => Identificar um recurso | editar/deletar/buscar
 * Query Params => Paginação / Filtro
 * Body Params => Objetos para inserção / Alteração (JSON)
 */

app.get('/courses', (req, res) => {
  const query = req.query;
  console.log(query);
  res.json(['curso 1', 'curso 2', 'curso 3']);
});

app.post('/courses', (req, res) => {
  const body = req.body;
  console.log(body);
  res.json(['curso 1', 'curso 2', 'curso 3', 'curso 4']);
});

app.put('/courses/:id', (req, res) => {
  const params = req.params;
  console.log(params);
  res.json(['curso 6', 'curso 2', 'curso 3', 'curso 4']);
});

app.patch('/courses/:id', (req, res) =>
  res.json(['curso 6', 'curso 7', 'curso 3', 'curso 4'])
);

app.delete('/courses/:id', (req, res) =>
  res.json(['curso 6', 'curso 3', 'curso 4'])
);

app.listen(port);
