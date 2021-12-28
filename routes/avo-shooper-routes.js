module.exports = (avoShopper) => {
    let home = async (req, res) => {
        try {
            await avoShopper.topFiveDeals()
            res.render('index', {
                topFive: await avoShopper.topFiveDeals(),

            });
        } catch (err) {
    (err)
        }
    }
    let topFive = async (req, res) => {
        try {
            await avoShopper.topFiveDeals()
            res.render('index', {
                topFive: await avoShopper.topFiveDeals(),

            });
        } catch (err) {
    (err)
        }
    }
    let deals = async (req, res) => {
        res.render('deals', {
            listshops: await avoShopper.listShops()
        })
    }
    let createDeal = async (req, res) => {
        try {



            var shopId = req.body.shop
            var price = req.body.price;
            var qty = req.body.qty;
             if(shopId,qty,price){
                console.log(shopId)
                console.log(qty)
                console.log(price)
                await avoShopper.createDeal(shopId,qty,price)
             req.flash('success', 'Deal created successfully')
res.redirect('/seeDeals')
            }else if(shopId== ''){
                req.flash('error', "Select a shop!")
                res.redirect('/seeDeals');
            } else{
req.flash('error', "Fill the empty fields!");
res.redirect('/seeDeals');
            }
        }
            catch (err) {
            console.log(err)
        }
    }
    let createShop = async (req, res) => {
        try {
            var shopName = req.body.shop;
            if(!shopName){
                req.flash('error', 'Enter shop name!')
                res.render('newShop')
            }
            else{
              var createShop = await avoShopper.createShop(shopName)
            req.flash('success', 'Shop created successfully')
              res.render('newShop',{
                    listshop: createShop
                })
            } 
           
        } catch (err) {
            console.log(err)

        }
    }

    let listShops = async (req, res) => {
        try {
            res.render('shops', {
                listshops: await avoShopper.listShops()
            })
        } catch (err) {
            console.log(err)
        }
    }
    let dealsForShop = async (req, res) => {
        try {
            const shopId = req.params.id;
            var shopDeals = await avoShopper.dealsForShop(shopId);
            var shopName = shopDeals[0].name
        if(shopName){

            console.log(shopName)
               res.render('dealsForShop', {
                   shopName,
                   shopDeals
               })
        }
           else{
               req.flash('error', "No deals for this shop currently!");
               res.render('shops')
           } 
        } catch (err) {
            console.log(err)
        }
    }
    let recommendDeals = async (req, res) => {
        try {
            var amount = req.body.amount;
            if (amount) {
                var recommendDeals = await avoShopper.recommendDeals(amount);
                res.render('index', {
                    recommendDeals
                })
            } else {
                req.flash('error', "Enter an amount you have to get deals!");
                res.render('index')
            }

        } catch (err) {
            console.log(err)
        }
    }
    let newShop = async (req, res) => {
        res.render('newShop')

    }
    let allDeals = async(req,res)=>{
     var allDeals =   await avoShopper.seeDeals();
res.render('allDeals', {allDeals})
console.log('************')
    }
    return {
        home,
        topFive,
        recommendDeals,
        createDeal,
        createShop,
        listShops,
        dealsForShop,
        deals,
        newShop,
        allDeals
    }
}