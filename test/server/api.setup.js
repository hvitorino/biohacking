//process.env.NODE_ENV = 'test';

const chai = require('chai');
const chaiHttp = require('chai-http');

chai.use(chaiHttp);
chai.should();

const agent = chai.request.agent('http://localhost:3001')
agent
  .post('/api/login')
  .send({ username: 'cmilfont@gmail.com', password: 'testes' })
  .then(function (res) {
    expect(res).to.have.cookie('connect.sid');
    // The `agent` now has the sessionid cookie saved, and will send it
    // back to the server in the next request:
    return agent.get('/api/user')
      .then(function (res) {
         expect(res).to.have.status(200);
      })
  })
