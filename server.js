const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const db = require('./db_setup.js')

const app = express(); 
const PORT = process.env.port || 3000;

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

app.get('/', (req, res, next) => res.send('hi'));




app.listen(PORT, () => {
   console.log(`Running Photo Caption Contest - Listening on port ${PORT}`);
});
