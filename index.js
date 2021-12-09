const express = require('express');
const exphbs = require('express-handlebars');

const app = express();
const pg = require("pg");
let AvoShopper = require("./avo-shopper");
const Pool = pg.Pool;

let useSSL = false;
let local = process.env.LOCAL || false;
if (process.env.DATABASE_URL && !local) {
    useSSL = { rejectUnauthorized: false };
}
const connectionString = process.env.DATABASE_URL || 'postgresql://emmanuel:201735469@localhost:5432/coderdb';

const pool = new Pool({
    connectionString: connectionString,
  ssl:  useSSL
});

const avoShopper = AvoShopper(pool);
const AvoShopperRoutes = require('./routes/avo-shooper-routes')
const avoRoutes = AvoShopperRoutes(avoShopper)

const flash = require('express-flash')
const session = require('express-session');
app.use(session({
    secret: "<This is the string used for my sessions  >",
    resave: false,
    saveUninitialized: true
}));

//initialize the flash middleware
app.use(flash());
// enable the req.body object - to allow us to use HTML forms
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// enable the static folder...
app.use(express.static('public'));

// add more middleware to allow for templating support

app.engine('handlebars', exphbs.engine());
app.set('view engine', 'handlebars');

app.get('/', avoRoutes.home);
app.post('/topFive', avoRoutes.topFive);
app.post('/recommended',  avoRoutes.recommendDeals);
app.get('/seeDeals', avoRoutes.deals);
app.post('/createDeal', avoRoutes.createDeal);
app.get('/listshops', avoRoutes.listShops)
app.post('/createShop', avoRoutes.createShop);
app.get('/dealsForShop/:id', avoRoutes.dealsForShop)
app.get('/newShop', avoRoutes.newShop)

// start  the server and start listening for HTTP request on the PORT number specified...
const PORT = process.env.PORT || 3019;

app.listen(PORT, function () {
    console.log(`AvoApp started on port ${PORT}`)
});