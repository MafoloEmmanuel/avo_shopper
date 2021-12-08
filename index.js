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

app.get('/', async function (req,res,next) {
   try{
    await avoShopper.topFiveDeals()
    res.render('index', {
        topFive: await avoShopper.topFiveDeals(),
    
    });
   } catch(err){
next(err)
   }
});
app.post('/topFive', async(req,res,next)=>{
  try{
    await avoShopper.topFiveDeals()
    res.render('index', {
        topFive: await avoShopper.topFiveDeals(),
    
    });
  } catch(err){
next(err)
  }
})
app.get('/newShop', async (req, res) => {
    res.render('newShop')
})
app.post('/createShop', async (req, res,next) => {
   try{
    var shop = req.body.shop;
    await avoShopper.createShop(shop);
    console.log(shop)
    res.render('newShop')
   } catch(err){
       next(err)}
})
app.get('/seeDeals', async (req, res) => {
    res.render('deals')
});
app.post('/createDeal', async (req, res,next) => {
    try{
        var shop = req.body.shop;
        var price = req.body.price;
        var qty = req.body.qty;
        console.log(price)
        console.log(qty)
        console.log(shop)
    
    
        var getId = await avoShopper.createShop(shop)
        var createDeal = await avoShopper.createDeal(getId, qty, price);
    
        res.render('deals', { createDeal
    
    })
}catch(err){
next(err)
}
    
})

app.get('/listshops', async (req, res,next) => {
  try{
    res.render('shops', {
        listshops: await avoShopper.listShops()
    })
  }  catch(err){
next(err)
  }
})

app.get('/dealsForShop/:shopName', async (req, res,next) => {
  try{
    const shopName = req.params.shopName;
    var shopId = await avoShopper.get
    var shopDeals = await avoShopper.dealsForShop(shopName);
    res.render('dealsForShop', {
        shopName,
        shopDeals
    })
  }  catch(err){
      next(err)
  }

});

app.post('/recommended', async(req,res,next)=>{
  try{
    var amount  =req.body.amount;
    var recommendDeals =  await avoShopper.recommendDeals(amount);
  res.render('index', {
      recommendDeals
  })
  } catch(err){
      next(err)
  } 
})
// start  the server and start listening for HTTP request on the PORT number specified...
const PORT = process.env.PORT || 3019;

app.listen(PORT, function () {
    console.log(`AvoApp started on port ${PORT}`)
});