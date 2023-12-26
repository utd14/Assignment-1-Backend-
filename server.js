const express = require('express');
const { Client } = require('pg');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');

const app = express();
const port = 4000;

app.use(express.static(__dirname)); 

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const client = new Client({
  host: 'localhost',
  user: 'postgres',
  port: 5432,
  database: 'backend',
  password: '123',
});

client.connect()
  .then(() => console.log('Connected to PostgreSQL'))
  .catch(error => console.error('Error connecting to PostgreSQL', error));


app.post('/register', async (req, res) => {
  const { username, password } = req.body;

  const checkUserQuery = 'SELECT * FROM users WHERE username = $1';
  const checkUserValues = [username];

  try {
    const userCheckResult = await client.query(checkUserQuery, checkUserValues);

    if (userCheckResult.rows.length > 0) {
      return res.status(400).json({ error: 'Username already exists' });
    }

    const hashpw = await bcrypt.hash(password, 10);

    const insertUserQuery = 'INSERT INTO users (username, password) VALUES ($1, $2) RETURNING *';
    const insertUserValues = [username, hashpw];

    const result = await client.query(insertUserQuery, insertUserValues);

    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error registering user');
  }
});


app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  const query = 'SELECT * FROM users WHERE username = $1';
  const values = [username];

  try {
    const result = await client.query(query, values);

    if (result.rows.length === 0) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const user = result.rows[0];

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (passwordMatch) {
      res.send('Login successful');
    } else {
      res.status(401).json({ error: 'Invalid credentials' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Error authenticating user');
  }
});

app.listen(port, () => console.log(`Server running at http://localhost:${port}`));