const express = require('express');
const router = express.Router();
const rp = require('request-promise');
const parseString = require('xml2js-parser').parseString;
const api_key='24HXTRKR761VN11S';

router.get('/:id', function(req, res, next) {
  let ticker = (req.params.id).toUpperCase();

  graphit(ticker)
    .then((data)=>{
      res.send(JSON.stringify(data, null, 4));
    }).catch(err => {
      console.log(err);
      res.status(503).send(err);
    })
});

function graphit(ticker){
  let o = [];
  let keySMA = 'Time Series (Daily)'

  let options={
    uri:`https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${ticker}&outputsize=full&apikey=${api_key}`
  };

  return rp(options)
    .then(function(repos){
      let result = JSON.parse(repos);
      let dates = Object.keys(result[keySMA]);

      for(let i = 0; i < 1000; i++) {
        let parsedDate = new Date(dates[i]);
        let utcDate = Date.UTC(parsedDate.getUTCFullYear(), parsedDate.getUTCMonth(), parsedDate.getUTCDate());
        o.push([utcDate, parseFloat(result[keySMA][dates[i]]['4. close'])]);
      }

      return o.reverse();
    });
}

module.exports = router;
