const elasticsearch = require('elasticsearch');

const connectionString = process.env.SEARCHBOX_SSL_URL;
const client = new elasticsearch.Client({ host: connectionString });

client.indices.exists({ index: 'activities' }).then(result => console.log(result));

client.index({
  index: 'activities',
  type: 'activity',
  id: '1',
  body: {
    UserId: 1,
    KindId: 2,
    description: '#testes #vaimonstro',
    tags: ['#testes', '#vaimonstro'],
    secret: true,
  },
}, (error, response) => console.log(error, response));
