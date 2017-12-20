const express = require('express');
const router = express.Router();
const rp = require('request-promise');
const parseString = require('xml2js-parser').parseString;

//Router to handle Initial Table Data.
router.get('/:id', function(req, res, next) {
  ticker = (req.params.id).toUpperCase();
  callAPI(ticker)
    .then(function(data) {
      res.header("Content-Type",'application/json');
      res.send(JSON.stringify(data,null,4));
    }).catch(err => {
      console.log(err);
      res.status(503).send(err);
    })
});

function round(number, precision) {
  let factor = Math.pow(10, precision);
  let tempNumber = number * factor;
  let roundedTempNumber = Math.round(tempNumber);

  return roundedTempNumber / factor;
};

function callAPI(ticker){
  let options = {
    uri: `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${ticker}&interval=1min&apikey=24HXTRKR761VN11S`,
    json: true
  };

  return rp(options)
    .then (function(repos){
      let open=[];
      let close=[];
      let volume =[];
      let low = [];
      let high=[];
      let image='';
      let color='';
      var data = Object.keys(repos['Time Series (Daily)'])

      for (let i = 0; i < 2; i++) {
        open[i] = repos['Time Series (Daily)'][data[i]]['1. open'];
        close[i] = repos['Time Series (Daily)'][data[i]]['4. close'];
        volume[i] = repos['Time Series (Daily)'][data[i]]['5. volume'];
        low[i] = repos['Time Series (Daily)'][data[i]]['3. low'];
        high[i] = repos['Time Series (Daily)'][data[i]]['2. high'];
      }

      if (close[0] - close[1] > 0) {
        image='http://cs-server.usc.edu:45678/hw/hw8/images/Up.png';
        color='green';
      } else {
        image='http://cs-server.usc.edu:45678/hw/hw8/images/Down.png';
        color='red';
      }

      return {
        symbol: repos['Meta Data']['2. Symbol'],
        timestamp: repos['Meta Data']['3. Last Refreshed'],
        timezone: repos['Meta Data']['5. Time Zone'],
        last_price: round(close[0],2),
        change: round(close[0]-close[1],2),
        change_percent: round((close[0]-close[1]) / (close[1] / 100),2),
        image: image,
        color: color,
        open: round(open[0],2),
        close: round(close[0],2),
        low: round(low[0],2),
        high: round(high[0],2),
        volume: volume[0]

      };
    }).catch(err => console.log(err));
}

module.exports = router;
