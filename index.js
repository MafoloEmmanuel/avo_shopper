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
    connectionString,
    useSSL
});

const avoShopper = AvoShopper(pool);


// enable the req.body object - to allow us to use HTML forms
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// enable the static folder...
app.use(express.static('public'));

// add more middleware to allow for templating support

app.engine('handlebars', exphbs.engine());
app.set('view engine', 'handlebars');

app.get('/', async function (req, res) {
    await avoShopper.topFiveDeals()
    res.render('index', {
        topFive: await avoShopper.topFiveDeals(),
    
    });
    console.log('five')
});
app.post('/topFive', async(req,res)=>{
    await avoShopper.topFiveDeals()
    res.render('index', {
        topFive: await avoShopper.topFiveDeals(),
    
    });
})
app.get('/newShop', async (req, res) => {
    res.render('newShop')
})
app.post('/createShop', async (req, res) => {
    var shop = req.body.shop;
    await avoShopper.createShop(shop);
    console.log(shop)
    res.render('newShop')
})
app.get('/seeDeals', async (req, res) => {
    res.render('deals')
});
app.post('/createDeal', async (req, res) => {
    var shop = req.body.shop;
    var price = req.body.price;
    var qty = req.body.qty;
    console.log(price)
    console.log(qty)
    console.log(shop)


    var getId = await avoShopper.createShop(shop)
    var createDeal = await avoShopper.createDeal(getId, qty, price);

    res.render('deals', {

    })
})

app.get('/listshops', async (req, res) => {
    res.render('shops', {
        listshops: await avoShopper.listShops()
    })
})

app.get('/dealsForShop/:shopName', async (req, res) => {
    const shopName = req.params.shopName;
    var shopId = await avoShopper.get
    var shopDeals = await avoShopper.dealsForShop(shopName);
    res.render('dealsForShop', {
        shopName,
        shopDeals
    })

});

app.post('/recommended', async(req,res)=>{
    var amount  =req.body.amount;
  var recommendDeals =  await avoShopper.recommendDeals(amount);
res.render('index', {
    recommendDeals
})
})
// start  the server and start listening for HTTP request on the PORT number specified...
const PORT = process.env.PORT || 3019;

app.listen(PORT, function () {
    console.log(`AvoApp started on port ${PORT}`)
});