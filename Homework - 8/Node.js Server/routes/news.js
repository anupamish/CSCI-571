const express = require('express');
const router = express.Router();
const rp = require('request-promise');
const parseString = require('xml2js-parser').parseString;

router.get('/:id', function (req, res, next) {
  let ticker = (req.params.id).toUpperCase();
  callJSON(ticker)
    .then(function(data) {
      res.header("Content-Type",'application/json');
      res.send(JSON.stringify(data,null,4));
    }).catch(err => {
      console.log(err);
      res.status(503).send(err);
    })
});

function callJSON(ticker){
  let options={
    uri: `https://seekingalpha.com/api/sa/combined/${ticker}.xml`
  }

  return rp(options)
    .then(function(xml_return){
      let o =[];
      return new Promise(function(resolve, reject){
        parseString(xml_return, function (err,result){
          let data = result['rss']['channel'][0]['item'];

          for(var i=0;i <data.length; i++){
            if((result['rss']['channel'][0]['item'][i]['link'][0]).includes("article")){
              var input= {
                'title':data[i]["title"][0].replace("\\'","'"),
                'link':data[i]['link'][0],
                'author': data[i]['sa:author_name'][0],
                'pubDate':data[i]['pubDate'][0]
              };

              o.push(input);
            }
          }
          resolve(o);
        });
      });
    });
}

module.exports = router;
