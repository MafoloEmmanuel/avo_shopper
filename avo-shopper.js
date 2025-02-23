module.exports = function(pool) {

	async function createShop(shopName) {

		const result = await pool.query(`insert into shop (name) values ($1) returning id`, [shopName]);
	//	console.log(result.rows)
		if (result.rowCount === 1) {
			console.log(result.rows[0].id)
			return result.rows[0].id;
		}
		return null;
	}

	async function listShops() {
		const result = await pool.query(`select * from shop`);
		//console.log(result.rows)
		return result.rows;
	}
	
	async function dealsForShop(shopId) {
		const result = await pool.query(`select name, qty, price, shop_id from avo_deal join shop on shop.id = avo_deal.shop_id where shop_id=$1`, [shopId]);
	//	console.log(result.rows)
		return result.rows;
	}

	async function topFiveDeals() {
		const bestPriceSQL = `select name as shop_name, price, qty, round((price/qty), 2) as unit_price from avo_deal 
		join shop on shop.id = avo_deal.shop_id 
		order by (price/qty) asc 
		limit 5`

		const result = await pool.query(bestPriceSQL);
//console.log(result.rows	)
		return result.rows;

	}

	async function createDeal(shopId, qty, price) {
		await pool.query(`insert into avo_deal (shop_id, qty, price) values ($1, $2, $3)`, 
			[shopId, qty, price]);
			
	}
async function seeDeals (){
 var result =await pool.query(
	 'select name,price,qty from avo_deal join shop on shop.id = avo_deal.shop_id ')
return result.rows
}
	async function recommendDeals(amount) {
		const result = await pool.query(`
			select name, price, qty, round((price/qty), 2) as unit_price from avo_deal 
			join shop on shop.id = avo_deal.shop_id 
			where price <= $1 order by unit_price asc`, [amount]);
//console.log(result.rows)
		return result.rows;
	}

	return {
		seeDeals,
		createDeal,
		createShop,
		listShops,
		dealsForShop,
		recommendDeals,
		topFiveDeals,
	}


}