
let chai = require('chai');
let chaiHttp = require('chai-http');
let should = chai.should();
let server = "http://127.0.0.1:9020" ;

const start = "2019-06-05T15:55:06.440Z";
const end = "2019-06-09T15:55:06.440Z" ;
let type = "buy"

chai.use(chaiHttp);
  
  describe('/get stocks detail', () => {
      it('it should GET trades by script in between dates', (done) => {

      	let scriptSymbol = "SBIN" ;// script for which data exist
      	
        chai.request(server)
            .get('/stocks/'+ scriptSymbol + '/trades?type='+ type +'&start=' + start+ '&end=' + end)
            .end((err, res) => {
            	
                  res.should.have.status(200);
                  
              done();
            });
      });

      it('it should Not GET in trade', (done) => {

      	let scriptSymbol = "xyz" ;//random scriptname it should fail
        chai.request(server)
            .get('/stocks/'+ scriptSymbol + '/trades?start=' + start+ '&end=' + end)
            .end((err, res) => {
            	
                  res.should.have.status(404);
                  
                 
              done();
            });
      });

   
      it('it should GET max min of ltp of trade in between dates', (done) => {

      	let scriptSymbol = "SBIN" ;// script for which data exist
      	
        chai.request(server)
            .get('/stocks/'+ scriptSymbol + '/price?start=' + start+ '&end=' + end)
            .end((err, res) => {
            	
                  res.should.have.status(200);
                
              done();
            });
      });

      it('it should Not GET in trade', (done) => {

      	let scriptSymbol = "xyz" ;// any random name
        chai.request(server)
            .get('/stocks/'+ scriptSymbol + '/price?start=' + start+ '&end=' + end)
            .end((err, res) => {
            	
                  res.should.have.status(404);
                  
                 
              done();
            });
      });


  });

  