const server = require('../../../../server');
const chai = require('chai');
// const chaiHttp = require('chai-http');
// chai.use(chaiHttp);
const should = chai.should();
//const agent = chai.request.agent(server);
const request = require('supertest');

// const supertest = require('supertest')
// supertest.Test.agent = (agent) ->
//   agent.attachCookies @
//   return @

const agent = request.agent(server);

const expect = chai.expect;

describe('Activities', () => {

  beforeEach(done => {
    request
      .agent(agent)
      .post('/api/login')
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .send({
          username: 'cmilfont@gmail.com',
          password: 'testes'
      })
      .then(res => {
        expect(res).to.have.cookie('sessionid');
          return done();
      });

  });

  describe('/POST Activity', () => {
    it('it should create an activity', (done) => {
      request
        .agent(agent)
        .post('/api/activities')
        .set('Accept', 'application/json')
        .set('Content-Type', 'application/json')
        .send({
          KindId: 1,
          description: '#mostro',
        })
        // .expect(200, {
        //   id: 1,
        //   description: '#mostro',
        // }, done);
        .end((err, res) => {
          expect(agent).to.have.cookie('connect.sid')
          console.log("BODY", res.body);
          //res.should.have.status(200);
          //res.body.should.be.eql({});
          done();
        });
    });
  });

  // describe('/GET Activities', () => {
  //   it('it should GET all activities from today', (done) => {
  //     agent
  //       .get('/activities')
  //       .end((err, res) => {
  //         console.log("BODY", res.body);
  //         res.should.have.status(200);
  //         res.body.should.be.eql([]);
  //         //res.body.should.be.a('array');
  //         //res.body.length.should.be.eql(0);
  //         done();
  //       });
  //   });
  // });

});
