var express = require('express');
var router = express.Router();
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


/**
 * @swagger
 * /v2/test:
 *   get:
 *     tags:
 *       - Okta
 *     description: Authenticate endpoint
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Test Message
 *         schema:
 *           $ref: '#/definitions/Msg'
 */
//router.get('/api/puppies', db.getAllPuppies);
router.get('/test', checkOAuth, (req,res) => {
    res.status(200).json({'Message':'Test Success with OAuth2.0'})
})

/**
 * @swagger
 * definitions:
 *   Msg:
 *     type: object
 *     properties:
 *       Message:
 *         type: string
  */

 module.exports = router; 