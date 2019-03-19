var express = require('express');
var router = express.Router();
/**
 * @swagger
 * /v1/test:
 *   get:
 *     tags:
 *       - Okta
 *     description: Anonymous endpoint
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Test Message
 *         schema:
 *           $ref: '#/definitions/Msg'
 */
//router.get('/api/puppies', db.getAllPuppies);
router.get('/test', (req,res) => {
    res.status(200).json({'Message':'Test Success.'})
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