require('dotenv').config()
const express = require('express');
const app = express();
const OktaJwtVerifier = require('@okta/jwt-verifier')
const oktaJwtVerifier = new OktaJwtVerifier({
  issuer: process.env.ISSUER,
  clientId: process.env.TEST_CLIENT_ID
})

// Custom middleware for check OAuth in OKTA
const checkOAuth = async (req, res, next) => {
    try {
        const { authorization } = req.headers
        if (!authorization) throw new Error('You must send an Authorization header')
    
        const [authType, token] = authorization.split(' ')
        if (authType !== 'Bearer') throw new Error('Expected a Bearer token')
    
        await oktaJwtVerifier.verifyAccessToken(token)
        next()
      } catch (error) {
        res.json({ error: error.message })
      }    
}

//https://developer.okta.com/blog/2018/06/06/node-api-oauth-client-credentials

/* app.get('/', async (req, res) => {
  try {
    const { authorization } = req.headers
    if (!authorization) throw new Error('You must send an Authorization header')

    const [authType, token] = authorization.split(' ')
    if (authType !== 'Bearer') throw new Error('Expected a Bearer token')

    await oktaJwtVerifier.verifyAccessToken(token)
    res.json('Hello World!')
  } catch (error) {
    res.json({ error: error.message })
  }
})
 */
app.get('/', checkOAuth, (req,res) => {
    res.json('Hello World!')
})

app.get('/v1/test', (req,res) => {
    res.status(200).json({'Message':'Test Success.'})
})

app.get('/v2/test', checkOAuth, (req,res) => {
    res.status(200).json({'Message':'Test Success with OAuth2.0'})
})


const port = process.env.PORT || 3000

app.listen(port , () => console.log(`Listening on port ${port}`))