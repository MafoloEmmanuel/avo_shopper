module.exports = (avoShopper) => {
    let home = async (req, res, next) => {
        try {
            await avoShopper.topFiveDeals()
            res.render('index', {
                topFive: await avoShopper.topFiveDeals(),

            });
        } catch (err) {
            next(err)
        }
    }
    let topFive = async (req, res, next) => {
        try {
            await avoShopper.topFiveDeals()
            res.render('index', {
                topFive: await avoShopper.topFiveDeals(),

            });
        } catch (err) {
            next(err)
        }
    }
    let deals = async (req, res) => {
        res.render('deals', {
            listshops: await avoShopper.listShops()
        })
    }
    let createDeal = async (req, res, next) => {
        try {
            var shopId = req.body.shop;
            var price = req.body.price;
            var qty = req.body.qty;
            if(shopId,qty,price){
                console.log(shopId)
                console.log(qty)
                console.log(price)
                await avoShopper.createDeal(shopId,qty,price)
             

                res.render('deals', {
                    listshops: await avoShopper.listShops()
     })
            } else{
req.flash('info', "No empty fields!")
            }
        }

            catch (err) {
            next(err)
        }
    }
    let createShop = async (req, res, next) => {
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
            next(err)
        }
    }

    let listShops = async (req, res, next) => {
        try {
            res.render('shops', {
                listshops: await avoShopper.listShops()
            })
        } catch (err) {
            next(err)
        }
    }
    let dealsForShop = async (req, res, next) => {
        try {
            const shopId = req.params.id;
            var shopDeals = await avoShopper.dealsForShop(shopId);
         //   var shopName = shopDeals[0].name
         //   console.log(shopName)
            res.render('dealsForShop', {
//shopName,
                shopDeals
            })
        } catch (err) {
            next(err)
        }
    }
    let recommendDeals = async (req, res, next) => {
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
            next(err)
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