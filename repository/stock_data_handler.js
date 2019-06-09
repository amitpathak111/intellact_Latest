
let express = require('express');
let router = express.Router();
let config = require("./config.js");

///input ->stockname ,tradetype ,start and end tradetime
//return  data based of stockname ,tradetype and tradetime
//ordered by tradeid...will return status code 404
 //when no trade exits for that symbol

router.get('/:stockSymbol/trades',function(req,res){


	config.trades_col.find({'symbol' : req.params.stockSymbol }, function(err, trades){

		if(err || trades.length == 0){

			res.status('404').send("There are no trades for stock");

		}else{
			
			
			var filteredTrade =  trades.filter(function(trade) {
				return trade.type == req.query.type
				 	trade.timestamp >=  new Date(req.query.start) &&
         			trade.timestamp <=  new Date(req.query.end) ;
			});	

			filteredTrade.sort(function(a, b){
  				return a.id > b.id;
			});
			 
  			res.status('200').send(filteredTrade);
		
  		}

  	}); 	
});

///input ->stockname  ,start and end tradetime
//return  max and min ltp based of stockname , and tradetime
//ordered by tradeid...will return status code 404
 //when no trade exits for that symbol

router.get('/:stockSymbol/price',function(req,res){

	config.trades_col.find({'symbol' : req.params.stockSymbol },{
		_id : 0,
		price : 1,
		timestamp : 1

		}, function(err, trades){

		if(err || trades.length == 0){
			
			res.status('404').send( {
				"message":"There are no trades in the given date range"
					});

		}else{
			
			let finalData = {};

			finalData.symbol = req.params.stockSymbol ;

			let filteredTrade =  trades.filter(function(trade) {
				return trade.timestamp >=  new Date(req.query.start) &&
         				trade.timestamp <=  new Date(req.query.end) ;
			});

			finalData.min = Math.min.apply(null, filteredTrade.map(item => item.price)),
		    finalData.max = Math.max.apply(null, filteredTrade.map(item => item.price));

  			res.status('200').send(finalData);
		
  		}

  	}); 	

});
/************export function************/
module.exports = router;

