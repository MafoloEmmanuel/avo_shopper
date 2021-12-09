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
        res.render('deals')
    }
    let createDeal = async (req, res, next) => {
        try {
            var shop = req.body.shop;
            var price = req.body.price;
            var qty = req.body.qty;

            console.log(price)
            console.log(qty)
            console.log(shop)
if(shop||price||qty){
    var getId = await avoShopper.createShop(shop)
    var createDeal = await avoShopper.createDeal(getId, qty, price);

    res.render('deals', {
        createDeal,

    })

}else if(!shop){
    req.flash('info', "Please choose a shop!")
    res.render('deals')
} else if(!price){
    req.flash('info', "Please enter a price!")
    res.render('deals')
}else if(!qty){
    req.flash('info', "Please enter qty!")
    res.render('deals')
}
        }
            catch (err) {
            next(err)
        }
    }
    let createShop = async (req, res, next) => {
        try {

            var shop = req.body.shop;
            if(shop){
              var listshops=  await avoShopper.createShop(shop);
                console.log(shop)
                res.render('newShop',{
                    listshops})
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
            const shopName = req.params.shopName;
            var shopId = await avoShopper.createShop(shopId)
            var shopDeals = await avoShopper.dealsForShop(shopId);
            res.render('dealsForShop', {
                shopName,
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