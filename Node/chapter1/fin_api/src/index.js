const express = require('express');
const { v4: uuidv4 } = require('uuid');
const app = express();
const port = 3333;

const customers = [];

app.use(express.json());

function getBalance(statement) {
  const balance = statement.reduce((acc, operation) => {
    if (operation.type === 'credit') {
      return acc + operation.amount;
    } else {
      return acc - operation.amount;
    }
  }, 0);

  return balance;
}
// middleware

function verifyExistsAccountCPF(req, res, next) {
  const { cpf } = req.headers;

  const customer = customers.find((customer) => customer.cpf === cpf);

  if (!customer) {
    return res.json({ error: 'Customer not found' });
  }

  req.customer = customer;
  return next();
}

/**
 * name  - string
 * cpf  - string
 * id  - uuid
 * statement []
 */
app.post('/account', (req, res) => {
  const { name, cpf } = req.body;
  const id = uuidv4();

  const customersAlreadyExist = customers.some(
    (customer) => customer.cpf === cpf
  );
  if (customersAlreadyExist) {
    return res.status(400).json({ error: 'Customer already exists!' });
  }

  customers.push({
    name,
    cpf,
    id,
    statement: [],
  });

  return res.status(201).send();
});

app.get('/statement', verifyExistsAccountCPF, (req, res) => {
  const { customer } = req;
  return res.json(customer.statement);
});

app.post('/deposit', verifyExistsAccountCPF, (req, res) => {
  const { description, amount } = req.body;
  const { customer } = req;
  const statementOperation = {
    description,
    amount,
    date: new Date(),
    type: 'credit',
  };

  customer.statement.push(statementOperation);

  return res.status(201).json(customer.statement);
});

app.post('/withdraw', verifyExistsAccountCPF, (req, res) => {
  const { amount } = req.body;
  const { customer } = req;
  const balance = getBalance(customer.statement);

  if (balance < amount) {
    return res.status(400).json({ error: 'Insufficient funds!' });
  }

  const statementOperation = {
    amount,
    date: new Date(),
    type: 'debit',
  };

  customer.statement.push(statementOperation);

  return res.status(201).send();
});

app.get('/statement/date', verifyExistsAccountCPF, (req, res) => {
  const { customer } = req;
  const { date } = req.query;

  const dateFormatted = new Date(date + ' 00:00');
  const statement = customer.statement.filter(
    (statement) =>
      statement.date.toDateString() === new Date(dateFormatted).toDateString()
  );

  return res.json(statement);
});

app.put('/account/', verifyExistsAccountCPF, (req, res) => {
  const { customer } = req;
  const { name } = req.body;

  customer.name = name;

  return res.status(201).send();
});

app.get('/account', verifyExistsAccountCPF, (req, res) => {
  const { customer } = req;

  return res.json(customer);
});

app.delete('/account/', verifyExistsAccountCPF, (req, res) => {
  const { customer } = req;

  customers.splice(customer, 1);

  return res.status(204).json(customers);
});

app.get('/balance/', verifyExistsAccountCPF, (req, res) => {
  const { customer } = req;
  const balance = getBalance(customer.statement);

  res.json(balance);
});
app.listen(port);
