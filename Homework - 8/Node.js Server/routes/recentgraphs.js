const express = require('express');
const router = express.Router();
const rp = require('request-promise');
const parseString = require('xml2js-parser').parseString;
let api_key='24HXTRKR761VN11S';

let sma = function(ticker) {
  let data=[];
  let smaIndicator='SMA';
  let o = {
    'SMA': []
  }
  let keySMA = 'Technical Analysis: '+smaIndicator;
  let url ='https://www.alphavantage.co/query?function=sma&symbol='+ticker+'&interval=daily&time_period=10&series_type=close&apikey='+api_key;
  let options={
    uri:url
  };
  return rp(options)
    .then(function(repos){
      let result = JSON.parse(repos);
      let dates = Object.keys(result[keySMA]);
      for(var i=0; i<130;i++){
        var parsedDate = new Date(dates[i]);
        var utcDate = Date.UTC(parsedDate.getUTCFullYear(), parsedDate.getUTCMonth(), parsedDate.getUTCDate());
        data[i] = [utcDate, parseFloat(result[keySMA][dates[i]][smaIndicator])];
        o[smaIndicator].push(data[i]);
      }
      return o;
    });
}

let rsi= function(ticker){
  let data=[];
  let smaIndicator='RSI';
  let o = {
    'RSI': []
  }
  let keySMA = 'Technical Analysis: '+smaIndicator;
  let url ='https://www.alphavantage.co/query?function=rsi&symbol='+ticker+'&interval=daily&time_period=10&series_type=close&apikey='+api_key;
  let options={
    uri:url
  };
  return rp(options)
    .then(function(repos){
      let result = JSON.parse(repos);
      let dates = Object.keys(result[keySMA]);
      for(var i=0; i<130;i++){
        var parsedDate = new Date(dates[i]);
        var utcDate = Date.UTC(parsedDate.getUTCFullYear(), parsedDate.getUTCMonth(), parsedDate.getUTCDate());
        data[i] = [utcDate, parseFloat(result[keySMA][dates[i]][smaIndicator])];
        o[smaIndicator].push(data[i]);
      }
      return o;
    });
}

let ema= function(ticker){
  let data=[];
  let smaIndicator='EMA';
  let o = {
    'EMA': []
  }
  let keySMA = 'Technical Analysis: '+smaIndicator;
  let url ='https://www.alphavantage.co/query?function=ema&symbol='+ticker+'&interval=daily&time_period=10&series_type=close&apikey='+api_key;
  let options={
    uri:url
  };
  return rp(options)
    .then(function(repos){
      let result = JSON.parse(repos);
      let dates = Object.keys(result[keySMA]);
      for(var i=0; i<130;i++){
        var parsedDate = new Date(dates[i]);
        var utcDate = Date.UTC(parsedDate.getUTCFullYear(), parsedDate.getUTCMonth(), parsedDate.getUTCDate());
        data[i] = [utcDate, parseFloat(result[keySMA][dates[i]][smaIndicator])];
        o[smaIndicator].push(data[i]);
      }
      return o;
    });
}

let adx= function(ticker){
  let data=[];
  let smaIndicator='ADX';
  let o = {
    'ADX': []
  }
  let keySMA = 'Technical Analysis: '+smaIndicator;
  let url ='https://www.alphavantage.co/query?function=adx&symbol='+ticker+'&interval=daily&time_period=10&series_type=close&apikey='+api_key;
  let options={
    uri:url
  };
  return rp(options)
    .then(function(repos){
      let result = JSON.parse(repos);
      let dates = Object.keys(result[keySMA]);
      for(var i=0; i<130;i++){
        var parsedDate = new Date(dates[i]);
        var utcDate = Date.UTC(parsedDate.getUTCFullYear(), parsedDate.getUTCMonth(), parsedDate.getUTCDate());
        data[i] = [utcDate, parseFloat(result[keySMA][dates[i]][smaIndicator])];
        o[smaIndicator].push(data[i]);
      }
      return o;
    });
}

let cci= function(ticker){
  let data=[];
  let smaIndicator='CCI';
  let o = {
    'CCI': []
  }
  let keySMA = 'Technical Analysis: '+smaIndicator;
  let url ='https://www.alphavantage.co/query?function=cci&symbol='+ticker+'&interval=daily&time_period=10&series_type=close&apikey='+api_key;
  let options={
    uri:url
  };
  return rp(options)
    .then(function(repos){
      let result = JSON.parse(repos);
      let dates = Object.keys(result[keySMA]);
      for(var i=0; i<130;i++){
        var parsedDate = new Date(dates[i]);
        var utcDate = Date.UTC(parsedDate.getUTCFullYear(), parsedDate.getUTCMonth(), parsedDate.getUTCDate());
        data[i] = [utcDate, parseFloat(result[keySMA][dates[i]][smaIndicator])];
        o[smaIndicator].push(data[i]);
      }
      return o;
    });
}

let macd= function(ticker){
  let data=[];
  let smaIndicator='MACD';
  let o = {
    'MACD': []
  }
  let keySMA = 'Technical Analysis: '+smaIndicator;
  let url ='https://www.alphavantage.co/query?function=macd&symbol='+ticker+'&interval=daily&time_period=10&series_type=close&apikey='+api_key;
  let options={
    uri:url
  };
  return rp(options)
    .then(function(repos){
      let result = JSON.parse(repos);
      let dates = Object.keys(result[keySMA]);
      for(var i=0; i<130;i++){
        var parsedDate = new Date(dates[i]);
        var utcDate = Date.UTC(parsedDate.getUTCFullYear(), parsedDate.getUTCMonth(), parsedDate.getUTCDate());
        data[i] = [utcDate, parseFloat(result[keySMA][dates[i]][smaIndicator])];
        o[smaIndicator].push(data[i]);
      }
      return o;
    });
}

let stoch= function(ticker){
  let data1=[];
  let data2=[];
  let smaIndicator='STOCH';
  let o = {
    'STOCH1': [],
    'STOCH2':[]
  }
  let keySMA = 'Technical Analysis: '+smaIndicator;
  let url ='https://www.alphavantage.co/query?function=stoch&symbol='+ticker+'&interval=daily&time_period=10&series_type=close&apikey='+api_key;
  let options={
    uri:url
  };
  return rp(options)
    .then(function(repos){
      let result = JSON.parse(repos);
      let dates = Object.keys(result[keySMA]);
      for(var i=0; i<130;i++){
        var parsedDate = new Date(dates[i]);
        var utcDate = Date.UTC(parsedDate.getUTCFullYear(), parsedDate.getUTCMonth(), parsedDate.getUTCDate());
        data1[i] = [utcDate, parseFloat(result[keySMA][dates[i]]["SlowD"])];
        data2[i] = [utcDate, parseFloat(result[keySMA][dates[i]]["SlowK"])];
        o['STOCH1'].push(data1[i]);
        o['STOCH2'].push(data2[i]);
      }
      return o;
    });
}

let bbands= function(ticker){
  let data1=[];
  let data2=[];
  let data3=[];
  let smaIndicator='BBANDS';
  let o = {
    'BBANDSMiddle': [],
    'BBANDSUpper':[],
    'BBANDSLower':[]

  }
  let keySMA = 'Technical Analysis: '+smaIndicator;
  let url ='https://www.alphavantage.co/query?function=bbands&symbol='+ticker+'&interval=daily&time_period=10&series_type=close&apikey='+api_key;
  let options={
    uri:url
  };
  return rp(options)
    .then(function(repos){
      let result = JSON.parse(repos);
      let dates = Object.keys(result[keySMA]);
      for(var i=0; i<130;i++){
        var parsedDate = new Date(dates[i]);
        var utcDate = Date.UTC(parsedDate.getUTCFullYear(), parsedDate.getUTCMonth(), parsedDate.getUTCDate());
        data1[i] = [utcDate, parseFloat(result[keySMA][dates[i]]["Real Upper Band"])];
        data2[i] = [utcDate, parseFloat(result[keySMA][dates[i]]["Real Middle Band"])];
        data3[i] = [utcDate, parseFloat(result[keySMA][dates[i]]["Real Lower Band"])];
        o['BBANDSMiddle'].push(data2[i]);
        o['BBANDSUpper'].push(data1[i]);
        o['BBANDSLower'].push(data3[i]);
      }
      return o;
    });
}

let price= function(ticker){
  let data1=[];
  let data2=[];
  let o = {
    'Price': [],
    'Volume':[]
  }
  let keySMA = 'Time Series (Daily)'
  let url ='https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=' + ticker + '&outputsize=full&apikey=' + api_key;
  let options={
    uri:url
  };
  return rp(options)
    .then(function(repos){
      let result = JSON.parse(repos);
      let dates = Object.keys(result[keySMA]);
      for(var i=0; i<130;i++){
        var parsedDate = new Date(dates[i]);
        var utcDate = Date.UTC(parsedDate.getUTCFullYear(), parsedDate.getUTCMonth(), parsedDate.getUTCDate());
        data1[i] = [utcDate, parseFloat(result[keySMA][dates[i]]['5. volume'])];
        data2[i] = [utcDate, parseFloat(result[keySMA][dates[i]]['4. close'])];
        o['Volume'].push(data1[i]);
        o['Price'].push(data2[i]);
      }
      return o;
    });
}

let functionMap = {
  'sma': sma,
  'rsi': rsi,
  'ema': ema,
  'adx': adx,
  'cci': cci,
  'macd': macd,
  'stoch': stoch,
  'bbands': bbands,
  'price': price
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
  } else {
    let graphs = {};
    graphit(ticker, 'sma')
      .then((data) => {
        graphs['SMA'] = data['SMA'];
        return graphit(ticker, 'rsi');
      }).then((data) => {
        graphs['RSI'] = data['RSI'];
        return graphit(ticker,'ema');
      }).then((data) => {
        graphs['EMA'] = data['EMA'];
        return graphit(ticker,'adx');
      }).then((data)=>{
        graphs['ADX'] = data['ADX'];
        return graphit(ticker,'cci');
      }).then((data)=>{
        graphs['CCI'] = data['CCI'];
        return graphit(ticker,'macd');
      }).then((data)=>{
        graphs['MACD'] = data['MACD'];
        return graphit(ticker,'bbands');
      }).then((data)=>{
        graphs['BBANDSMiddle'] = data['BBANDSMiddle'];
        graphs['BBANDSUpper'] = data['BBANDSUpper'];
        graphs['BBANDSLower'] = data['BBANDSLower'];
        return graphit(ticker,'stoch');
      }).then((data)=>{
        graphs['STOCH1'] = data['STOCH1'];
        graphs['STOCH2'] = data['STOCH2'];
        return graphit(ticker,'price');
      }).then((data)=>{
        graphs['Volume'] = data['Volume'];
        graphs['Price'] = data['Price'];
        res.send(JSON.stringify(graphs, null, 4));
      }).catch(err => {
        res.send(graphs);
      })
  }
});

function graphit(ticker, indicator){
  return functionMap[indicator](ticker);
}

module.exports = router;
