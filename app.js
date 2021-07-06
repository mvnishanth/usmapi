require('dotenv').config()

const express = require('express')
const app = express()
const port = 8000
app.get('/', (req, res) => res.send('Hello World!'))
//====================================================================
// Setup body parser
// 
let bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
let cors = require('./cors.js');
app.use(cors);

app.use(bodyParser.json());
app.use('/api/resources', express.static(__dirname + '/public'));
app.use('/api/uploads', express.static(__dirname + '/uploads'));

let routes = require('./routes.js');

app.use('/api/', routes);

//====================================================================
// Setup mongodb through mongoose
// 
let db = require('./db.js').connection;
db.on('error', console.error.bind(console, 'MongoDb connection error:'));
db.once('open', function () {
    //console.log("Conneted to MongoDb");
});

//
// END mongodb setup
//====================================================================


//
// END routes setup
//====================================================================


//====================================================================
// setup error route
app.listen(port, () => console.log(`Example app listening on port ${port}!`))