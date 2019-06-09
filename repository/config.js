const mongojs = require('mongojs');

var tradingData = mongojs("tradedata");
var trades_col = tradingData.collection("trades");

trades_col.createIndex( { "id": 1 }, { unique: true } )

/*******************public function**********************/
exports.trades_col = trades_col ;


