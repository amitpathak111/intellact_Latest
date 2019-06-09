
var express = require('express');
var router = express.Router();
var config = require("./config.js");

//feletes all the trade data 
router.delete('/',function(req,res){

  	config.trades_col.remove({}, function(err, result){

  		res.status('200').send("trades dropped");


  	});
  	
});



/************export function************/
module.exports = router;