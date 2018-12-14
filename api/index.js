const
  express = require('express'),
  app = express(),
  server = app.listen(process.env.PORT || 3000),
  bodyParser = require('body-parser'),
  cors = require('cors'),
  { $server } = require('./services');

process.title = 'Pet Tracker API';

app.use(require('./middlewares/requests'));
app.use(cors({
  credentials: true
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use('/alerts', require('./controllers/alerts'));

$server.checkDatabase();