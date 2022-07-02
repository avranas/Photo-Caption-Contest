const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const db = require('./db/db_setup.js')

const app = express(); 
const PORT = process.env.port || 3000;

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

//Routes
app.get('/', (req, res, next) => res.send('hi'));
app.use('/captions', require('./routes/captions.js')); 
app.use('/users', require('./routes/users.js'));
app.use('/images', require('./routes/images.js'));

app.listen(PORT, () => {
   console.log(
      `Running Photo Caption Contest - Listening on port ${PORT}`
   );
});
