const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const path = require('path');
const bodyParser = require('body-parser');

const pjson = require('./package.json');

const app = express();
app.use(cors());
app.use(morgan('tiny'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(`${__dirname}/`));

// Routes
app.get('/health', function(req, res) {
  res.send('OK');
});
app.use('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
});

const PORT = process.env.PORT || 3000;
const IP_BIND = process.env.IP || '0.0.0.0';

app.listen(PORT, IP_BIND, () => {
  console.log(`
  => Starting ${pjson.name}
  => Node application starting in ${process.env.NODE_ENV || 'development'}
  * Listening on http://${IP_BIND}:${PORT}/
  * Environment: ${process.env.NODE_ENV || 'development'}
  Use Ctrl-C to stop
  `);
});

