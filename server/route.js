const express = require('express');
const router = express.Router();

router.get('/',(req, res)=>{
    res.setHeader('Access-Control-Allow-Origin', '*');

    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATHC, DELETE');

    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-Width, content-type');





    res.send('This is only my world!');
})


module.exports = router;