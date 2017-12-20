const express = require('express');
const router = express.Router();
const rp = require('request-promise');

router.get('/:id', function(req, res, next) {
  let ticker = (req.params.id).toUpperCase();

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
  let o = {}
  let options = {
    uri: `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${ticker}&interval=1min&apikey=24HXTRKR761VN11S`,
    json:true
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
      console.log(repos);
      var data = Object.keys(repos['Time Series (1min)'])

      for (var i = 0; i < 2; i++) {
        open[i] = repos['Time Series (1min)'][data[i]]['1. open'];
        close[i] = repos['Time Series (1min)'][data[i]]['4. close'];
        volume[i] = repos['Time Series (1min)'][data[i]]['5. volume'];
        low[i] = repos['Time Series (1min)'][data[i]]['3. low'];
        high[i] = repos['Time Series (1min)'][data[i]]['2. high'];
      }

      if(close[0] - close[1] > 0) {
        image='http://cs-server.usc.edu:45678/hw/hw8/images/Up.png';
        color='green';
      } else {
        image='http://cs-server.usc.edu:45678/hw/hw8/images/Down.png';
        color='red';
      }

      return {
        symbol: repos['Meta Data']['2. Symbol'],
        last_price: round(close[0],2),
        change: round(close[0]-close[1],2),
        change_percent: round((close[0]-close[1]) / (close[1] / 100),2),
        image:image,
        color:color,
        volume:volume[0]

      };
    });

}
module.exports = router;
