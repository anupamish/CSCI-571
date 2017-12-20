import {Component, OnInit } from '@angular/core';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/map';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { chart } from 'highcharts';
import { stockChart } from 'highcharts/highstock';
import { FacebookService, InitParams,UIResponse, UIParams} from 'ngx-facebook';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/takeWhile';
import 'rxjs/add/observable/forkJoin';
import { IntervalObservable } from "rxjs/observable/IntervalObservable";
import { NgxCarousel } from 'ngx-carousel';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  faceURL;
  savedItems = JSON.parse(localStorage.getItem('favouriteStocks'));
  title = 'app';
  currentSlide = "0";
  orderBy: string = "asc";
  sortBy: string = "default";
  loadingData: boolean = false;
  refresh: boolean = true;
  loadingGraphs: boolean = false;
  invalidTicker: boolean = false;
  priceError: boolean = false;
  chartError: boolean = false;
  historyError: boolean = false;
  newsError: boolean = false;
  isThere :boolean = false;
  currentChart;
  smaData;
  emaData;
  rsiData;
  adxData;
  macdData;
  cciData;
  bbandsMiddle;
  bbandsUpper;
  bbandsLower;
  historyStock;
  priceStock;
  volumeStock;
  stochData1;
  stochData2;
  indicatorData={};
  stockDetails=[];
  stockNews=[];
  stockTicker='';
  stateCtrl: FormControl;
  filteredStates: Observable<any[]>;
  public carouselOne: NgxCarousel;
  states = [];
  ngOnInit(){
    this.carouselOne = {
      grid: {xs: 1, sm: 1, md: 1, lg: 1, all: 0},
      point: {
        visible: false
      },

    }
    if(!localStorage.getItem(('favouriteStocks'))){
      localStorage.setItem('favouriteStocks',JSON.stringify([]));
    }
    this.stockTicker='';


  }


  constructor(private http: HttpClient, private fb: FacebookService ) {
    this.stateCtrl = new FormControl();
    this.stateCtrl.valueChanges
      .debounceTime(100)
      .startWith(null)
      .subscribe((ticker) => {
        if (ticker) {
          this.getSuggestions(ticker)
        }
      });
    fb.init({
      appId            : '1287002014737790',
      xfbml            : true,
      version          : 'v2.11'
    });
  }


  getSuggestions(name: string) {
    this.http.get<any[]>('http://stock-env.us-east-2.elasticbeanstalk.com/ticker/'+name)
      .subscribe(data => {
        this.states = data;
      });
  }

  enableAutoRefresh(e) {
    this.refresh = e.target.checked;
  }

  autoRefresh(){
    console.log("Refreshing")
    let tickers = this.getRefreshObservables();

    Observable.forkJoin(tickers).subscribe(res => {
      this.savedItems = res;
      localStorage.setItem('favouriteStocks',JSON.stringify(res));
    })

    IntervalObservable.create(5000)
      .takeWhile(() => this.refresh) // only fires when component is alive
      .subscribe(() => {
        Observable.forkJoin(this.getRefreshObservables()).subscribe(res => {
          this.savedItems = res;
          localStorage.setItem('favouriteStocks',JSON.stringify(res));
        })
      });
  }

  getRefreshObservables() {
    let observables = [];

    for(let i = 0; i<this.savedItems.length;i++){
      let obr = this.http.get('http://stock-env.us-east-2.elasticbeanstalk.com/auto/'+this.savedItems[i].symbol)
        .map(
          (responseFavs) =>{
            return {
              symbol: responseFavs['symbol'] ,
              price: responseFavs['last_price'],
              change: responseFavs['change'],
              change_percent: responseFavs['change_percent'],
              color: responseFavs['color'],
              volume: parseInt(responseFavs['volume']),
              image: responseFavs['image']
            }
          }
        );

      observables.push(obr)

    }
    return observables;
  }

  clear() {
    this.stockTicker = "";
  }

  setStockTicker(ticker) {
    this.stockTicker = ticker;
  }

  getStockData(){
    this.carouselOne.slide = 1;
    if (this.stockTicker.replace(/ /g,'').length == 0) {
      this.invalidTicker = true;
      return;
    }
    this.isThere=false;
    for(var i=0; i < this.savedItems.length; i++){
      if(this.savedItems[i].symbol == this.stockTicker){
        this.isThere= true; 
        break;
      }
    }

    this.invalidTicker = false;
    this.loadingData = true;
    this.priceError=false;
    this.http.get<any[]>('http://stock-env.us-east-2.elasticbeanstalk.com/api/'+this.stockTicker)
      .subscribe(
        (response) => {
          this.stockDetails = response;
          
        },
        () => {
          this.loadingData = false;
          this.priceError = true;
        },
        () => {
          this.loadingData = false;
          this.priceError=false;
        });
    this.http.get<any[]>('http://stock-env.us-east-2.elasticbeanstalk.com/news/'+this.stockTicker).subscribe(newsResponse=>{
      this.stockNews=newsResponse;
      this.newsError=false;
    },
      () => {
        this.newsError=true;
      },
      () =>{
        this.newsError=false;
      });
    this.http.get('http://stock-env.us-east-2.elasticbeanstalk.com/graphs/'+this.stockTicker).subscribe(historyResponse=>{
      this.historyStock=historyResponse;
      this.historyError=false;

    },() => {
      this.historyError = true;

    }, () => {
      this.historyError=false;
    });

    this.loadingGraphs = true;
    this.chartError=false;
    this.http.get('http://stock-env.us-east-2.elasticbeanstalk.com/recentgraphs/'+this.stockTicker).subscribe(
      (indicatorResponse) => {
        this.indicatorData = indicatorResponse;
        this.smaData = this.indicatorData['SMA'];
        this.emaData = this.indicatorData['EMA'];
        this.rsiData = this.indicatorData['RSI'];
        this.adxData = this.indicatorData['ADX'];
        this.macdData = this.indicatorData['MACD'];
        this.cciData = this.indicatorData['CCI'];
        this.stochData1 = this.indicatorData['STOCH1'];
        this.stochData2 = this.indicatorData['STOCH2'];
        this.bbandsLower = this.indicatorData['BBANDSLower'];
        this.bbandsUpper = this.indicatorData['BBANDSUpper'];
        this.bbandsMiddle = this.indicatorData['BBANDSMiddle'];
        this.priceStock = this.indicatorData['Price'];
        this.volumeStock = this.indicatorData['Volume'];
        if(this.indicatorData==JSON.stringify({}))
        this.chartError=true;
      },
      () => {
        this.loadingGraphs = false;
        this.chartError=true;
      },
      () => {
        this.loadingGraphs = false;
        this.printSMA(this.smaData);
        this.printEMA(this.emaData);
        this.printADX(this.adxData);
        this.printCCI(this.cciData);
        this.printMACD(this.macdData);
        this.printSTOCH(this.stochData1,this.stochData2);
        this.printBBANDS(this.bbandsLower,this.bbandsMiddle,this.bbandsUpper);
        this.printRSI(this.rsiData);
        this.printPrice(this.priceStock,this.volumeStock);
        this.chartError=false;
      });

  }

  deleteFavourite(deleteTicker){
    let favs = JSON.parse(localStorage.getItem('favouriteStocks'));
    let index = favs.indexOf(deleteTicker);
    favs.splice(index, 1);
    localStorage.setItem('favouriteStocks',JSON.stringify(favs));
    this.savedItems = favs;
  }
  fbAction(){
    let exportURL="https://export.highcharts.com/";
    var optionsStr = JSON.stringify(this.currentChart);
    let obj = {
      infile: optionsStr,
      type: 'image/png',
      async: true,
      constr: "Chart"
    }
    return this.http.post(exportURL,obj,{
      headers: new HttpHeaders().set('content-type', 'application/json'),
      responseType: 'text'
    }).toPromise().then(result => {
      let imageURL = exportURL+result;
      const options: UIParams = {
        method: 'share',
        href: imageURL
      };
      this.fb.ui(options)
        .then((res: UIResponse) => {
          alert('Posted to timeline successfully!')
        }).catch(err => {console.log(err)});
    });


  }

  saveFavorites(){
    //localStorage.setItem('favouriteStocks',[]);
    // localStorage.removeItem('favouriteStocks');
    if (!localStorage.getItem('favouriteStocks')){
      localStorage.setItem('favouriteStocks',JSON.stringify([]));
    };
    let storedObject={
      symbol: this.stockDetails['symbol'],
      price: this.stockDetails['last_price'],
      change:this.stockDetails['change'],
      change_percent:this.stockDetails['change_percent'],
      color: this.stockDetails['color'],
      volume: this.stockDetails['volume'],
      image:this.stockDetails['image']
    };
    let symbol = this.stockDetails['symbol'];
    let stored = localStorage.getItem('favouriteStocks');
    let favs = JSON.parse(localStorage.getItem('favouriteStocks'));

    if (!stored.includes(symbol)){
      favs.push(storedObject);
    } else {
      let index = favs.indexOf(symbol);
      favs.splice(index, 1);
    }
    localStorage.setItem('favouriteStocks',JSON.stringify(favs));
    this.savedItems = favs;
  }

  printHistoryChart(historyStock){
    stockChart('historychartcontainer', {
      title: {
        text: this.stockTicker+ ' Stock Value'
      },
      subtitle: {
        text: '<a href="https://www.alphavantage.co/" style="color:blue" target="_blank">Source: Alpha Vantage</a>',
        useHTML: true
      },
      tooltip: {
        split: false
      },
      yAxis:{
        title: {
          text: 'Stock Value'
        }
      },rangeSelector: {

        buttons: [ {
          type: 'week',
          count: 1,
          text: '1w'
        }, {
          type: 'month',
          count: 1,
          text: '1m'
        },{
          type: 'month',
          count: 3,
          text: '3m'
        } ,{
          type: 'month',
          count: 6,
          text: '6m'
        },{
          type:'ytd',
          count:5,
          text:'YTD'
        }, {
          type: 'year',
          count: 1,
          text: '1y'
        }, {
          type: 'all',
          text: 'All'
        }],
        selected: 0
      },

      series: [{
        name: this.stockTicker,
        data: historyStock,
        type: 'area',

      }],
    });
  }

  printSMA(smaData){
    this.currentChart = {
      chart: {
        zoomType: 'x'
      },
      title: {
        text: 'Simple Moving Average (SMA)'
      },
      subtitle: {
        text:"<a href='https://www.alphavantage.co' target='_blank'>Source: Alpha Vantage </a>",
        useHTML: true
      },
      xAxis: {
        type: 'datetime',
        tickInterval: 24 * 3600 * 1000 * 7,
        dateTimeLabelFormats: {
          month:'%m/%d',
          week: '%m/%d',
          day:'%m/%d'
        },

        tickPixelInterval: 10
      },
      yAxis: {
        title: {
          text: 'SMA'
        },
      },

      plotOptions: {
        series: {
          pointInterval: 24 * 3600 * 1000 // one day
        }
      },
      series: [{
        type: 'line',
        name: this.stockTicker,
        data: smaData,
        color: '#D33920'

      }]
    };
    chart('smachart', this.currentChart);
  }
  printEMA(emaData){
    this.currentChart={
      chart: {
        zoomType: 'x'
      },
      title: {
        text: 'Exponential Moving Average (EMA)'
      },
      subtitle: {
        text:"<a href='https://www.alphavantage.co' target='_blank'>Source: Alpha Vantage </a>",
        useHTML: true
      },
      xAxis: {
        type: 'datetime',
        tickInterval: 24 * 3600 * 1000 * 7,
        dateTimeLabelFormats: {
          month:'%m/%d',
          week: '%m/%d',
          day:'%m/%d'
        },

        tickPixelInterval: 10
      },
      yAxis: {
        title: {
          text: 'EMA'
        },
      },

      plotOptions: {
        series: {
          pointInterval: 24 * 3600 * 1000 // one day
        }
      },
      series: [{
        type: 'line',
        name: this.stockTicker,
        data: emaData,
        color: '#D33920'

      }]
    };
    chart('emachart',this.currentChart );
  }
  printRSI(rsiData){
    this.currentChart= {
      chart: {
        zoomType: 'x'
      },
      title: {
        text: 'Relative Strength Index (RSI)'
      },
      subtitle: {
        text:"<a href='https://www.alphavantage.co' target='_blank'>Source: Alpha Vantage </a>",
        useHTML: true
      },
      xAxis: {
        type: 'datetime',
        tickInterval: 24 * 3600 * 1000 * 7,
        dateTimeLabelFormats: {
          month:'%m/%d',
          week: '%m/%d',
          day:'%m/%d'
        },

        tickPixelInterval: 10
      },
      yAxis: {
        title: {
          text: 'EMA'
        },
      },

      plotOptions: {
        series: {
          pointInterval: 24 * 3600 * 1000 // one day
        }
      },
      series: [{
        type: 'line',
        name: this.stockTicker,
        data: rsiData,
        color: '#D33920'

      }]
    };
    chart('rsichart',this.currentChart);
  }
  printADX(adxData){
    this.currentChart={
      chart: {
        zoomType: 'x'
      },
      title: {
        text: 'Average Directional movement indeX (ADX)'
      },
      subtitle: {
        text:"<a href='https://www.alphavantage.co' target='_blank'>Source: Alpha Vantage </a>",
        useHTML: true
      },
      xAxis: {
        type: 'datetime',
        tickInterval: 24 * 3600 * 1000 * 7,
        dateTimeLabelFormats: {
          month:'%m/%d',
          week: '%m/%d',
          day:'%m/%d'
        },

        tickPixelInterval: 10
      },
      yAxis: {
        title: {
          text: 'ADX'
        },
      },

      plotOptions: {
        series: {
          pointInterval: 24 * 3600 * 1000 // one day
        }
      },
      series: [{
        type: 'line',
        name: this.stockTicker,
        data: adxData,
        color: '#D33920'

      }]
    };
    chart('adxchart',this.currentChart);
  }
  printCCI(cciData){
    this.currentChart={
      chart: {
        zoomType: 'x'
      },
      title: {
        text: 'Commodity Channel Index (CCI)'
      },
      subtitle: {
        text:"<a href='https://www.alphavantage.co' target='_blank'>Source: Alpha Vantage </a>",
        useHTML: true
      },
      xAxis: {
        type: 'datetime',
        tickInterval: 24 * 3600 * 1000 * 7,
        dateTimeLabelFormats: {
          month:'%m/%d',
          week: '%m/%d',
          day:'%m/%d'
        },

        tickPixelInterval: 10
      },
      yAxis: {
        title: {
          text: 'CCI'
        },
      },

      plotOptions: {
        series: {
          pointInterval: 24 * 3600 * 1000 // one day
        }
      },
      series: [{
        type: 'line',
        name: this.stockTicker,
        data: cciData,
        color: '#D33920'

      }]
    };
    chart('ccichart',this.currentChart );
  }
  printMACD(macdData){
    this.currentChart={
      chart: {
        zoomType: 'x'
      },
      title: {
        text: 'Moving Average Convergence/Divergence (MACD)'
      },
      subtitle: {
        text:"<a href='https://www.alphavantage.co' target='_blank'>Source: Alpha Vantage </a>",
        useHTML: true
      },
      xAxis: {
        type: 'datetime',
        tickInterval: 24 * 3600 * 1000 * 7,
        dateTimeLabelFormats: {
          month:'%m/%d',
          week: '%m/%d',
          day:'%m/%d'
        },

        tickPixelInterval: 10
      },
      yAxis: {
        title: {
          text: 'MACD'
        },
      },

      plotOptions: {
        series: {
          pointInterval: 24 * 3600 * 1000 // one day
        }
      },
      series: [{
        type: 'line',
        name: this.stockTicker,
        data: macdData,
        color: '#D33920'

      }]
    };
    chart('macdchart',this.currentChart );
  }
  printSTOCH(stochData1,stochData2){
    this.currentChart={
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


      plotOptions: {
        series: {


        }
      },

      series: [{
        name: this.stockTicker + ' SlowK',
        data: stochData1,
        color: '#D33920',
        type: 'line',

      },
        {
          name: this.stockTicker + ' SlowD',
          data: stochData2,
          color: '#91BDE8',
          type: 'line',

        }
      ],



    };
    chart('stochchart', this.currentChart);
  }

  printBBANDS(bbandsLower,bbandsMiddle,bbandsUpper){
    this.currentChart={
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


      plotOptions: {
        series: {



        }
      },

      series: [
        {
          name: this.stockTicker + ' Real Middle Band',
          data: bbandsMiddle,
          color: '#D33920',
          type: 'line',

        },
        {
          name: this.stockTicker + ' Real Upper Band',
          data: bbandsUpper,
          color: '#000000',
          type: 'line',

        },
        {
          name: this.stockTicker + ' Real Lower Band',
          data: bbandsLower,
          color: '#D8FECF',
          type: 'line',

        },

      ],


    };
    chart('bbandschart',this.currentChart );
  }
  printPrice(priceStock, volumeStock){
    this.currentChart={
      chart:{
        zoomType:'x'
      },title: {
        text: this.stockTicker +' Stock Price and Volume'
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
        name: this.stockTicker,
        type: 'area',
        data: priceStock,
        color:'#D33920'


      }, {
        name:this.stockTicker+' Volume',
        type: 'column',
        data: volumeStock,
        yAxis: 1,
        color:'rgba(255,255,255,0.5)',


      }]
    };
    chart('pricechart',this.currentChart );

  }

}
