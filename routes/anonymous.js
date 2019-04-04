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
    console.log(req.headers)
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


 router.post('/v2/discovery', (req, res)=> {
    const lid = req.body.logicalId;
    doc = {
        "logicalId": lid,
        "supportedDocumentConfigurations": [{
            "name": "Sync.PurchaseOrder",
            "receive": true,
            "send": true
        },
        {
            "name": "Sync.SalesOrder",
            "receive": true,
            "send": false 
        },
        {
            "name": "Sync.ItemMaster",
            "receive": true,
            "send": false 
        },
        {
            "name": "Process.ItemMaster",
            "receive": true,
            "send": true 
        },
        {
            "name": "Get.SalesOrder",
            "receive": true,
            "send": true 
        },
        {
            "name": "Get.PurchaseOrder",
            "receive": true,
            "send": false 
        }]
    }

    
    res.status(200).json(doc);
});


 module.exports = router; 