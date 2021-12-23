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



            var shopName = req.body.name
            var shopId = req.body.shop
            var price = req.body.price;
            var qty = req.body.qty;
            if(shopId,qty,price){
                console.log(shopId)
                console.log(qty)
                console.log(price)
                await avoShopper.createDeal(shopId,qty,price)
             
res.redirect('/seeDeals')
            } else{
req.flash('info', "No empty fields!")
            }
        }
            catch (err) {
            console.log(err)
        }
    }
    let createShop = async (req, res) => {
        try {
            var shopName = req.body.shop;
            if(shopName){
              var createShop = await avoShopper.createShop(shopName)
              res.render('newShop',{
                    listshop: createShop
                })
            } else{
                req.flash('info', "Please enter shop name!")
                req.flash('newShop');
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
         console.log(shopName)
            res.render('dealsForShop', {
                shopName,
                shopDeals
            })
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
                req.flash('info', "Enter an amount to get deals for!");
                res.render('index')
            }

        } catch (err) {
            console.log(err)
        }
    }
    let newShop = async (req, res) => {
        res.render('newShop')

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
        newShop
    }
}