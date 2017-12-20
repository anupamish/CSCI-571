const express = require('express');
const router = express.Router();
const rp = require('request-promise');
let title;

const titleMap = {
  'SMA': "Simple Moving Average (SMA)",
  'EMA': "Exponential Moving Average (EMA)",
  'RSI': "Relative Strength Index (RSI)",
  "ADX": "Average Directional movement indeX (ADX)",
  "MACD": "Moving Average Convergence Divergence (MACD)",
  "CCI": "Commodity Channel Index (CCI)"
};

let createCommons = function (ticker, indicator) {
  let url = `http://stock-env.us-east-2.elasticbeanstalk.com/recentgraphs/${ticker.toUpperCase()}?indicator=${indicator.toLowerCase()}`;
  let options={
    uri:url
  };

  return rp(options)
    .then(function(response) {
      const data = JSON.parse(response);
      const currentChart = {
        chart: {
          zoomType: 'x'
        },
        title: {
          text: titleMap[indicator]
        },
        subtitle: {
          text: "<a href='https://www.alphavantage.co' target='_blank'>Source: Alpha Vantage </a>",
          useHTML: true
        },
        xAxis: {
          type: 'datetime',
          tickInterval: 24 * 3600 * 1000 * 7,
          dateTimeLabelFormats: {
            month: '%m/%d',
            week: '%m/%d',
            day: '%m/%d'
          },
          rotation: 0,
          tickPixelInterval: 10
        },
        yAxis: {
          title: {
            text: indicator
          },

        },
        plotOptions: {
          series: {
            pointInterval: 24 * 3600 * 1000 // one day
          }
        },
        series: [{
          type: 'line',
          name: ticker,
          data: data[indicator],
          color: '#D33920',

        }]
      };
      console.log(currentChart);
      return getChartURL(currentChart);
    });
}
let createPrice = function(ticker,indicator){
  let url = `http://stock-env.us-east-2.elasticbeanstalk.com/recentgraphs/${ticker.toUpperCase()}?indicator=${indicator.toLowerCase()}`;
  let options={
    uri:url
  };
  return rp(options)
  .then(function(response){
    const data = JSON.parse(response);
    const currentChart = {
      chart:{
        zoomType:'x'
      },title: {
        text: ticker +' Stock Price and Volume'
      },
      subtitle: {
        text:"<a href='https://www.alphavantage.co' target='_blank'>Source: Alpha Vantage </a>",
        useHTML: true
      },
      xAxis: [{
        type: 'datetime',
        dateTimeLabelFormats: {
          month: '%m/%d',
          week: '%m/%d',
          day: '%m/%d'},
        tickInterval : 7*24 * 3600 * 1000,
        tickPixelInterval:100,
        labels : { y : 20, rotation: -45, align: 'right' }

      }],
      yAxis: [{ // Primary yAxis
        labels: {

        },
        tickInterval: 10,
        title: {
          text: 'Stock Price',

        },
      }, { // Secondary yAxis

        title: {
          text: 'Volume',

        },
        tickInterval: 40000000,
        labels: {
        },
        opposite: true
      }],
      plotOptions: {
        series: {
          stacking: 'normal',

        },
        column: {
          pointWidth: 1,
          pointPadding:0.5,
          borderWidth:0
        }

      },
      series: [{
        name: ticker,
        type: 'area',
        data: data['Price'],
        color:'#D33920'

      }, {
        name: ticker+' Volume',
        type: 'column',
        data: data['Volume'],
        yAxis: 1,
        color:'rgba(255,255,255,0.5)',
      }]
    };
    return  getChartURL(currentChart);
  });
  
}

let createStoch = function(ticker,indicator){
  let url = `http://stock-env.us-east-2.elasticbeanstalk.com/recentgraphs/${ticker.toUpperCase()}?indicator=${indicator.toLowerCase()}`;
  let options={
    uri:url
  };
  return rp(options)
        .then(function(response){
          const data = JSON.parse(response);
          const currentChart={
            chart:{
              zoomType: 'x'
              },
              title: {
                 text: 'Stochastic Oscillator (STOCH)'
             },

             subtitle: {
                  text:"<a href='https://www.alphavantage.co' target='_blank'>Source: Alpha Vantage </a>",
                  useHTML: true
             },

             yAxis: {
                 title: {
                     text: 'STOCH'
                 }
             },
              xAxis: {
                 type: 'datetime',
                 tickInterval: 24 * 3600 * 1000 * 7,
                 dateTimeLabelFormats: {
                     month: '%m/%d',
                     week: '%m/%d',
                     day: '%m/%d'
             },

             tickPixelInterval: 10
              },
       series: [{
                 name: ticker + ' SlowK',
                 data: data['STOCH1'],
                 color: '#D33920',
                 type: 'line',

          },
         {
          name: ticker + ' SlowD',
          data: data['STOCH2'],
          color: '#91BDE8',
          type: 'line',

         }
     ]
    };
    return getChartURL(currentChart);
        });
}

let createBbands=function(ticker,indicator){
  let url = `http://stock-env.us-east-2.elasticbeanstalk.com/recentgraphs/${ticker.toUpperCase()}?indicator=${indicator.toLowerCase()}`;
  let options={
    uri:url
  };
  return rp(options)
        .then(function(response){
          const data = JSON.parse(response);
          const currentChart={
            chart:{
              zoomType:'x'
          },
          title: {
                  text: 'Bollinger Bands (BBANDS)'
              },

           subtitle: {
                  text:"<a href='https://www.alphavantage.co' target='_blank'>Source: Alpha Vantage </a>",
                  useHTML: true
               },

           yAxis: {
               title: {
                  text: 'BBANDS'
              }
          },
          xAxis: {
               type: 'datetime',
               tickInterval: 24 * 3600 * 1000 * 7,
               dateTimeLabelFormats: {
               month: '%m/%d',
               week: '%m/%d',
               day: '%m/%d'
               },

          tickPixelInterval: 10
          },
          series: [
              {
                  name: ticker + ' Real Middle Band',
                  data: data['BBANDSMiddle'],
                  color: '#D33920',
                  type: 'line',

              },
              {
                  name: ticker + ' Real Upper Band',
                  data: data['BBANDSUpper'],
                  color: '#000000',
                  type: 'line',

               },
              {
                  name: ticker + ' Real Lower Band',
                  data: data['BBANDSLower'],
                  color: '#D8FECF',
                  type: 'line',

               },

       ]
          };
          return getChartURL(currentChart);
        })
}
function getChartURL(currentChart){
  let exportUrl="https://export.highcharts.com/";
  let option = JSON.stringify(currentChart);
  let imageURL;
  let options={
    method:'POST',
    uri: exportUrl,
    body:{
      async:true,
      type: 'image/png',
      infile:option,
      constr:"Chart"
    },
    json:true
  };
  return rp(options)
    .then(function(response){
      imageURL = exportUrl + response;
      return {"url":imageURL};
    });
}
let functionMap = {
  'sma': createCommons,
  'rsi': createCommons,
  'ema': createCommons,
  'adx': createCommons,
  'cci': createCommons,
  'macd': createCommons,
  'price':createPrice,
  'stoch':createStoch,
  'bbands':createBbands
}

router.get('/:id',function(req,res,next){
  let indicator = req.query.indicator;
  let ticker = (req.params.id).toUpperCase();
  if(indicator) {
    graphit(ticker, indicator)
      .then(function(data) {
        res.header("Content-Type",'application/json');
        res.send(JSON.stringify(data,null,4));
      })
  }
});

function graphit(ticker, indicator){
  return functionMap[indicator](ticker,indicator.toUpperCase());
}

module.exports = router;
