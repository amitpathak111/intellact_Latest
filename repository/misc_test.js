
let chai = require('chai');
let chaiHttp = require('chai-http');
let should = chai.should();
let server = "http://127.0.0.1:9020" ;



chai.use(chaiHttp);
  
  describe('/delete all the trades', () => {
      it('it should delete all the trdes', (done) => {

      	
        chai.request(server)
            .delete('/erase')
            .end((err, res) => {
            	console.log(res.status)
              res.should.have.status(200);
                  
              done();
            });
      });  


  });

