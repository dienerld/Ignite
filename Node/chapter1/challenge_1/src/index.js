const express = require('express');
const cors = require('cors');

const { v4: uuidv4 } = require('uuid');

const app = express();

app.use(cors());
app.use(express.json());

const users = [];

function checksExistsUserAccount(request, response, next) {
  const { username } = request.headers;

  const user = users.find(u => u.username === username);
  if (!user) {
    return response.status(400).json({ error: 'User Not Found' });
  }

  request.user = user;
  return next();
}

app.get('/aa', (req, res) => res.json(users))

app.post('/users', (request, response) => {
  const { name, username } = request.body;

  if (users.find(user => user.username === username)) {
    return response.status(400).json({ error: 'User already exists' });
  }

  const newUser = {
    name,
    username,
    id: uuidv4(),
    todos: []
  }

  users.push(newUser);
  return response.status(201).json(newUser)
});

app.get('/todos', checksExistsUserAccount, (request, response) => {
  // Complete aqui
  const { user } = request;

  return response.status(200).json(user.todos)

});

// {
// id: 'uuid', // precisa ser um uuid
// title: 'Nome da tarefa',
// done: false,
// deadline: '2021-02-27T00:00:00.000Z',
// created_at: '2021-02-22T00:00:00.000Z'
// }
app.post('/todos', checksExistsUserAccount, (request, response) => {
  // Complete aqui
  const { user } = request;
  const { title, deadline } = request.body;

  const newTodo = {
    id: uuidv4(),
    title,
    done: false,
    deadline: new Date(deadline),
    created_at: new Date(),
  }

  user.todos.push(newTodo);
  return response.status(201).json(newTodo)
});

app.put('/todos/:id', checksExistsUserAccount, (request, response) => {
  const { user } = request;
  const { id } = request.params;
  const { title, deadline } = request.body;
  let todo = null;

  user.todos.forEach(element => {
    if (element.id === id) {
      element.title = title;
      element.deadline = new Date(deadline);
      todo = element;
    }
  })
  if (!todo) {
    return response.status(404).json({ error: 'Not found' });

  }
  return response.status(200).json(todo);
});

app.patch('/todos/:id/done', checksExistsUserAccount, (request, response) => {
  const { user } = request;
  const { id } = request.params;
  const { title, deadline } = request.body;
  let todo = null;

  user.todos.forEach(element => {
    if (element.id === id) {
      element.done = true;
      todo = element;
    }
  })
  if (!todo) {
    return response.status(404).json({ error: 'Not found' });

  }
  return response.status(200).json(todo);
});

app.delete('/todos/:id', checksExistsUserAccount, (request, response) => {
  // Complete aqui

  const { user } = request;
  const { id } = request.params;
  let todo = null;

  user.todos.forEach((element,index )=> {
    if(element.id === id) {
      todo= element
      user.todos.splice(index, 1)
    }
  });

  if (!todo) {
    return response.status(404).json({ error: 'Not found' });
  }

  return response.status(204).send();
});

module.exports = app;
