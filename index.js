require('dotenv').config()
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const fqdn = require('node-fqdn');
const port = process.env.PORT || 3000

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const routes_anonymous = require('./routes/anonymous');
const routes_auth = require('./routes/oauth');

//https://developer.okta.com/blog/2018/06/06/node-api-oauth-client-credentials


const swaggerJsdoc = require('swagger-jsdoc');

const options = {
    swaggerDefinition: {
      // Like the one described here: https://swagger.io/specification/#infoObject
      info: {
        title: 'Test API',
        version: '1.0.0',
        description: 'Test Express API with autogenerated swagger doc',
      },
      host: fqdn() + ':' + port,//'itmingspagoni02.infor.com:3000',
      basePath: '/',
    },
    // List of files to be processes. You can also set globs './routes/*.js'
    apis: ['./routes/*.js'],
  };
  
  const specs = swaggerJsdoc(options);

  const swaggerUi = require('swagger-ui-express');

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

app.use('/v1', routes_anonymous);
app.use('/v2', routes_auth);

// serve swagger
app.get('/swagger.json', function(req, res) {
  res.setHeader('Content-Type', 'application/json');
  res.send(specs);
});

app.get('/', (req,res) => {
    res.json('Hello World!')
})


app.listen(port , () => console.log(`Listening on port ${port}`))