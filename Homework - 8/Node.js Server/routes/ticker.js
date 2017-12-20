const express = require('express');
const router = express.Router();
const rp = require('request-promise');
const parseString = require('xml2js-parser').parseString;

router.get('/:id', function(req, res, next) {
  let ticker = (req.params.id).toUpperCase();
  let test = callAPI(ticker);
  test.then(function(data) {
    res.header("Content-Type",'application/json');
    res.send(JSON.stringify(data,null,4));
  }).catch(err => {
    console.log(err);
    res.status(503).send(err);
  })
});

function callAPI(ticker){
  let options = {
    uri: `http://dev.markitondemand.com/MODApis/Api/v2/Lookup/json?input=${ticker}`,
    json:true
  };

  return rp(options)
    .then (function(repos){
       return repos;
  });
}

module.exports = router;
