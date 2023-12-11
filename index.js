var express = require('express');
var cors = require('cors');
var compression = require('compression');
var bodyParser = require('body-parser');
const app = express();
const baseRouter = require('./src/routes/index');
require('dotenv').config();

const PORT = process.env.PORT;

app.use(compression());
app.use(cors());

app.use(bodyParser.json({ strict: false, limit: '50mb' }));
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use('/api/v1', baseRouter);
app.get('/', async (req, res) => {
    res.send('ping');
});

app.listen(PORT, function () {
    console.log("server started at  " + PORT);
    console.log("Please Navigate to http://localhost:" + PORT.toString());
});