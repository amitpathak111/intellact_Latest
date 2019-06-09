
let chai = require('chai');
let chaiHttp = require('chai-http');
let should = chai.should();
let server = "http://127.0.0.1:9020" ;

chai.use(chaiHttp);
  
  describe('/get trades', () => {
      it('it should GET all the trades', (done) => {
        chai.request(server)
            .get('/trades')
            .end((err, res) => {
            	
                  res.should.have.status(200);
                  res.body.should.be.a('array');
                 
              done();
            });
      });

      it('it should GET all the of user', (done) => {
        chai.request(server)
            .get('/trades/users/2')
            .end((err, res) => {
            	
                  res.should.have.status(200);
                  res.body.should.be.a('array');
                 
              done();
            });
      });

       it('it should  Not GET any Data', (done) => {
        chai.request(server)
            .get('/trades/users/qws')
            .end((err, res) => {
            	
                  res.should.have.status(404);
                 
                 
              done();
            });
      });
  });

  
  describe('/POST trades', () => {


      it('it should Not Post  trades', (done) => {

     	let trade = {
				"id": 2,
				"type": "buy",
				"user": {
					"id": 2,
					"name": "amit"
					},
				"symbol": "SBIN",
				"shares": 15,
				"price": 160,
				"timestamp": "2019-06-06T15:55:06.440Z"
			}

        chai.request(server)
            .post('/trades').send(trade)
            .end((err, res) => {
            	
                  res.should.have.status(400);
                 
                 
              done();
            });
      	});


	    it('it should Post New trades', (done) => {

     		let trade = {
				"id": 31,
				"type": "buy",
				"user": {
					"id": 2,
					"name": "amit"
					},
				"symbol": "SBIN",
				"shares": 15,
				"price": 155,
				"timestamp": "2019-06-08T15:55:06.440Z"
			}

        chai.request(server)
            .post('/trades').send(trade)
            .end((err, res) => {
            	
                  res.should.have.status(201);
                 
                 
              done();
            });
      	});


  });
