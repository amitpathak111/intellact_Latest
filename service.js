
  let express = require('express');
  let bodyParser = require('body-parser');
  let logger = require('morgan');
  let http = require('http');
  let tradeHandler = require('./repository/trade_handler.js');
  let stockHandler = require('./repository/stock_data_handler.js');
  let misc = require('./repository/misc.js');


  let app = express();


  app.set('port', process.env.PORT || 9020);
  app.set('ipaddr', process.env.OPENSHIFT_NODEJS_IP || "127.0.0.1");
  app.use(bodyParser.json());                        
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(logger('dev'));;

  app.use('/trades', tradeHandler);
  app.use('/stocks', stockHandler);
  app.use('/erase', misc);


http.createServer(app).listen(app.get('port'), function () {
    console.log(" Server listening On IP " + app.get('ipaddr') + " Port " + app.get('port'));
});
