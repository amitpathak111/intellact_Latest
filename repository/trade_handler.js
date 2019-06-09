
let express = require('express');
let router = express.Router();
let config = require("./config.js");

// add new trade to db
router.post('/',function(req,res){

	let trades = req.body;
	trades.timestamp = new Date(trades.timestamp);

	config.trades_col.save(trades,function(err,msg){

		if(err ){
			res.status('400').send("trade id duplication");
		}else{
			res.status('201').send("trade data saved");
		}

	});
});

// return all trades 
router.get('/',function(req,res){

	config.trades_col.find({}).sort({ id: 1 },function(err,trades){

		
		res.status('200').send(trades);
	});
});

// input is userid and will return all trades by user 
router.get('/users/:userID',function(req,res){

	var userId = parseInt(req.params.userID);

	config.trades_col.find({"user.id" :userId}).sort({ id: 1 },function(err,trades){

		if(err || trades.length == 0){
			res.status('404').send("no trades found");
		}else{

			res.status('200').send(trades);
		}
	});
});
/************export function************/
module.exports = router;