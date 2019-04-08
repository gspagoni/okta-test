var express = require('express');
var router = express.Router();
const base64 = require('base-64');

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

 router.get('/ping', (req, res)=> {
    objret = {
        "status": "OK",
        "code": 200,
        "errors": []
      }
    res.status(200).json(objret)
});

router.get('/versions', (req, res) => {
    objret = {
        "supportedVersions": [
          "v2"
        ]
      }
      res.status(200).json(objret)
});

router.get('/protocol', (req, res) => {
    objret = {
        "version"   : "v2",  
        "messageMethod" : "message",
        "message_ContentType" : "application/json",
        "supportedEncoding" : "BASE64",
        "supportedCharacterSet" : "UTF-8"
    }
    res.status(200).json(objret)
});


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
            "send": true
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

router.post('/v2/message', (req, res) => {
    const objret = {
        "status" : "OK", 
        "message" : "Published successfully", 
        "code" : 201        
    }
    const mess = req.body.document.value;

    // code to manage the message goes here
    
    console.log(base64.decode(mess));

    res.status(201).json(objret);
});


 module.exports = router; 