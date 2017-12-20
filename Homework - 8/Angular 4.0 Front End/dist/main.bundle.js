webpackJsonp(["main"],{

/***/ "../../../../../src/$$_lazy_route_resource lazy recursive":
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "../../../../../src/$$_lazy_route_resource lazy recursive";

/***/ }),

/***/ "../../../../../src/app/app.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".example-form {\n    min-width: 150px;\n    max-width: 500px;\n    width: 100%;\n  }\n  \n  .example-full-width {\n    width: 100%;\n  }\n  hr {\n    border: 0;\n    clear:both;\n    display:block;\n    width:900px;               \n    background-color:white;\n    height: 2px;\n  }", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/app.component.html":
/***/ (function(module, exports) {

module.exports = "<div>\n  <br>\n  <br>\n  <br>\n  <br>\n</div>\n<div class=\"container\">\n  <div class=\"well\" style=\"background-color:white;\">\n    <h3 style=\"text-align:center; margin-bottom:15px;\"> Stock Market Search </h3>\n    <form class=\"form-inline\">\n      <div [ngClass]=\"{'form-group': true, 'has-error': invalidTicker}\">\n        <label for=\"exampleInputName2\" style='font-size:15px; margin-right:25px;'>Enter Stock Ticker Symbol:\n          <span style=\"color: red\">*</span>\n        </label>\n        <input class=\"form-control\" size=\"90\" placeholder=\"e.g. AAPL\" [(ngModel)]=\"stockTicker\" ng-class=\"{red: test.myStock.$invalid}\"\n          style=\"margin-right:10px; font-size:15x;\" matInput [matAutocomplete]=\"auto\" [formControl]=\"stateCtrl\" required>\n        <mat-autocomplete #auto=\"matAutocomplete\">\n          <mat-option *ngFor=\"let state of states\" [value]=\"state.Symbol\">\n            <span>{{state.Symbol}} - {{state.Name}} ({{state.Exchange}})</span>\n          </mat-option>\n        </mat-autocomplete>\n\n      </div>\n      <button type=\"button\" (click)=getStockData() class=\"btn btn-default btn-lg\" style=\"background-color:#7D95AF; color:white; margin-right:5px;\">\n        <span class=\"glyphicon glyphicon-search\" aria-hidden=\"true\"></span> Get Quote\n      </button>\n      <button type=\"button\" class=\"btn btn-default btn-lg\" style=\"background-color:#EEEEEE;color:black;\" (click)=\"clear()\">\n        <span class=\"glyphicon glyphicon-refresh\" aria-hidden=\"true\"></span> Clear\n      </button>\n    </form>\n  </div>\n </div>\n<hr style=\"background-color:white; width:78%;\">\n<div class=\"container\">\n<div class=\"well\" style='background-color:white;'>\n    \n  <ngx-carousel  [inputs]=\"carouselOne\">\n      <ngx-item NgxCarouselItem>\n          <div class=\"card\">\n              <div class=\"card-header\">\n                <div class=\"row\">\n                        <div class=\"col-md-8\"> <h3 style=\"text-align:left;\">Favorite List</h3> </div>\n                        <div class=\"col-md-4\">\n                        <div class=\"row\">\n                          <div class=\"col-xs-3\">\n                          <span class=\"float-right\"style=\"font-size:12px; margin-right:2px;\">Auto Refresh:</span>\n                          </div>\n                          <div class=\"col-3 col-xs-3\">\n                          <mat-slide-toggle color=blue [checked]=\"refresh\"  (change)=\"refresh = $event.checked\"></mat-slide-toggle>\n                          </div>\n                          <div class=\"col-3 col-xs-3\">\n                          <button  (click)=\"autoRefresh()\" class=\"float-none\"type=\"button\" style=\"background-color:#EEEEEE; margin-right:20px; font-size:18px;\">\n                          <span class=\"glyphicon glyphicon-refresh\" aria-hidden=\"true\"></span>\n                          </button>\n                          </div>\n                          <div class=\"col-3 col-xs-3\">\n                          <button NgxCarouselNext  class=\"float-none rightRS\"type=\"button\" style=\"background-color:#EEEEEE;font-size:18px;\" [disabled]=\"stockTicker.length == 0\">\n                          <span class=\"glyphicon glyphicon-chevron-right\" aria-hidden=\"true\"></span>\n                          </button>\n                          </div>\n                        </div>\n                      </div>\n\n                </div>\n                </div>\n                <div class=\"card-block\">\n                    <div class=\"row\" style=\"margin-left:2%;\">\n                        <mat-form-field style=\"margin-right:5%;\">\n                          <label>Sort By </label> \n                          <mat-select  [(value)]=\"sortBy\">\n                            <mat-option value=\"default\">Default</mat-option>\n                            <mat-option value=\"symbol\">Symbol</mat-option>\n                            <mat-option value=\"price\">Price</mat-option>\n                            <mat-option value=\"change\">Change</mat-option>\n                            <mat-option value=\"change_percent\">Change Percent</mat-option>\n                            <mat-option value=\"volume\">Volume</mat-option>\n                          </mat-select>   \n                        </mat-form-field>\n                        \n                        <mat-form-field>     \n                            <label>Order By </label>         \n                          <mat-select [(value)]=\"orderBy\" [disabled]=\"sortBy == 'default'\">\n                            <mat-option value=\"asc\">Ascending</mat-option>\n                            <mat-option value=\"desc\">Descending</mat-option>\n                          </mat-select>\n                        </mat-form-field>\n                    </div>\n                    <div class=\"row\">\n                      <table style=\"font-size:13px; margin-left:3%;\"class=\"table table-striped table-responsive\">\n                        <thead>\n                          <tr>\n                          <th> Symbol</th>\n                          <th>Stock Price</th>\n                          <th>Change (Change Percent)</th>\n                          <th> Volume </th>\n                          <th></th>\n                          </tr>\n                        </thead>\n                        <tbody>\n                          <tr *ngFor=\"let item of savedItems | orderBy: sortBy : orderBy == 'desc'\">\n                            <td><a href=\"#\" (click)=\"handler(setStockTicker(item.symbol),getStockData())\">{{item.symbol}}</a></td>\n                            <td>{{item.price}}</td>\n                            <td><font color={{item.color}}>{{item.change}} ({{item.change_percent}}%) </font><img src='{{item.image}}' style='width:15px;height:15px;'></td>\n                            <td>{{item.volume|number}}</td>\n                            <td>\n                              <button (click)=\"deleteFavourite(item)\" class=\"float-none\"type=\"button\">\n                                <span class=\"glyphicon glyphicon-trash\" aria-hidden=\"true\"></span>\n                              </button></td>\n                          </tr>\n\n                        </tbody>\n                       </table>\n                    </div>\n                </div>\n          </div>\n        </ngx-item>\n        <ngx-item NgxCarouselItem>\n            <div class=\"card\">\n                <div class=\"card-header\">\n                  <div class=\"row\">\n                  <div class=\"col-1\">\n                      <button NgxCarouselPrev  class=\"float-none leftRs\"type=\"button\" style=\"background-color:#EEEEEE;font-size:18px;\">\n                          <span class=\"glyphicon glyphicon-chevron-left\" aria-hidden=\"true\"></span>\n                          </button>\n                  </div>\n                  <div class=\"col-11\"> <h3 style=\"text-align:center\">Stock Details</h3> </div>\n                  </div>\n                </div>\n                <div class=\"card-block\" style=\"padding:10px;\">\n                  <div class=\"mynav\" style='font-size:15px; color:#4979B2;'>\n                    <ul class=\"nav nav-pills tryme\">\n                      <li class=\"nav-item\">\n                        <a class=\"nav-link\" href=\"#current\" data-toggle=\"tab\">\n                          <span class='glyphicon glyphicon-time' style='margin-right:2px;'></span>Current Stock</a>\n                      </li>\n                      <li class=\"nav-item\">\n                        <a class=\"nav-link\" href=\"#history\" (click)=\"printHistoryChart(historyStock)\" data-toggle=\"tab\">\n                          <span class='glyphicon glyphicon-stats' style='margin-right:2px;'></span>Historical Charts</a>\n                      </li>\n                      <li class=\"nav-item\">\n                        <a class=\"nav-link\" href=\"#news\" data-toggle=\"tab\">\n                          <span class='glyphicon glyphicon-link' style='margin-right:2px;'></span> News Feeds</a>\n                      </li>\n                    </ul>\n                  </div>\n                  <hr>\n                  <div class=\"tab-content\">\n                  <div class=\"tab-pane active\" id=\"current\">\n                  <div class=\"row\">\n                    <div class=\"col-md-5\" style=\"font-size:12px;\">\n                  <table class=\"table table-striped table-responsive\">\n                    <thead>\n                      <tr>\n                        <th>Stock Details</th>\n                        <th>\n                          <div class='container'>\n                          <div class='row'>\n                            <div class=\"col-xs-6\">\n                        <button *ngIf=\"!isThere\"(click)=\"saveFavorites()\" class=\"float-none\"type=\"button\" style=\"background-color:#EEEEEE; font-size:18px; margin-right:25px;\" [disabled]=\"loadingData || !stockDetails.symbol\">\n                            <span class=\"glyphicon glyphicon-star-empty\" aria-hidden=\"true\"></span>\n                        </button>\n                        <button *ngIf=\"isThere\"  class=\"float-none\"type=\"button\" style=\"background-color:#EEEEEE; font-size:18px; margin-right:5px;\" [disabled]=\"loadingData || !stockDetails.symbol\">\n                            <span class=\"glyphicon glyphicon-star\" aria-hidden=\"true\"></span>\n                        </button>\n                          </div>\n                          <div class=\"col-xs-6\">\n                          <input (click)=\"fbAction()\" type =\"button\" [disabled]=\"loadingGraphs || !indicatorData.Price || !indicatorData.SMA || !indicatorData.EMA || !indicatorData.RSI || !indicatorData.CCI || !indicatorData.MACD || !indicatorData.STOCH1 || !indicatorData.BBANDSLower || !indicatorData.ADX\" style=\" background:url('http://cs-server.usc.edu:45678/hw/hw8/images/facebook.png') no-repeat; background-size: 100%; width: 3em;  height: 3em;\">\n                        </div>\n                        </div>\n                        </div>\n                        </th>\n                      </tr>\n                    </thead>\n                    <div *ngIf='priceError' style=\"padding-top:100px;\">\n                    <div  class=\"alert alert-danger\" style=\"width:100%;\" role=\"alert\">\n                        <strong>Error!</strong> Stock data not available.\n                    </div>\n                    </div>\n                    <div *ngIf='loadingData' style=\"padding-top:100px; width:auto;\">\n                      <div class=\"progress\" >\n                      <div class=\"progress-bar progress-bar-striped progress-bar-animated\" role=\"progressbar\" aria-valuenow=\"50\" aria-valuemin=\"0\" aria-valuemax=\"100\" style=\"width:50%; height:100%;\"></div>\n                      </div>\n                    </div>\n                    <tbody *ngIf=\"stockDetails.symbol && !loadingData && !priceError\">\n                      <tr>\n                          <th scope=\"row\">Stock Ticker Symbol</th>\n                          <td>{{stockDetails.symbol}}</td>\n                      </tr>\n                      <tr>\n                          <th scope=\"row\">Last Price</th>\n                          <td>{{stockDetails.last_price}}</td>\n                      </tr>\n                      <tr>\n                          <th scope=\"row\">Change (Change Percent)</th>\n                          <td><font color={{stockDetails.color}}>{{stockDetails.change}} ({{stockDetails.change_percent}}%) </font><img src='{{stockDetails.image}}' style='width:15px;height:15px;'></td>\n                      </tr>\n                      <tr>\n                          <th scope=\"row\">Timestamp</th>\n                          <td>{{stockDetails.timestamp}}</td>\n                      </tr>\n                      <tr>\n                          <th scope=\"row\">Open</th>\n                          <td>{{stockDetails.open}}</td>\n                      </tr>\n                      <tr>\n                          <th scope=\"row\">Close</th>\n                          <td>{{stockDetails.close}}</td>\n                      </tr>\n                      <tr>\n                          <th scope=\"row\">Day's Range</th>\n                          <td>{{stockDetails.low}} - {{stockDetails.high}}</td>\n                      </tr>\n                      <tr>\n                          <th scope=\"row\">Volume</th>\n                          <td>{{stockDetails.volume|number}}</td>\n                      </tr>\n                    </tbody>\n                  </table>\n                  </div>\n                  <div class=\" col-md-7\">\n                    <div>\n                    <ul class=\"nav nav-tabs\">\n                      <li class=\"nav-item\">\n                        <a class=\"nav-link active\" href=\"#price\"  (click)=\"printPrice(priceStock,volumeStock)\" data-toggle=\"tab\">Price</a>\n                      </li>\n                      <li class=\"nav-item\">\n                        <a class=\"nav-link\" href=\"#sma\" (click)=\"printSMA(smaData)\" data-toggle=\"tab\">SMA</a>\n                      </li>\n                      <li class=\"nav-item\">\n                        <a class=\"nav-link\" href=\"#ema\"(click)=\"printEMA(emaData)\" data-toggle=\"tab\">EMA</a>\n                      </li>\n                      <li class=\"nav-item\">\n                        <a class=\"nav-link\"  href=\"#stoch\" (click)=\"printSTOCH(stochData1,stochData2)\" data-toggle=\"tab\">STOCH</a>\n                      </li>\n                      <li class=\"nav-item\">\n                        <a class=\"nav-link\" href=\"#rsi\" (click)=\"printRSI(rsiData)\" data-toggle=\"tab\">RSI</a>\n                      </li>\n                      <li class=\"nav-item\">\n                        <a class=\"nav-link\" href=\"#adx\" (click)=\"printADX(adxData)\" data-toggle=\"tab\">ADX</a>\n                      </li>\n                      <li class=\"nav-item\">\n                        <a class=\"nav-link\" href=\"#cci\" (click)=\"printCCI(cciData)\" data-toggle=\"tab\">CCI</a>\n                      </li>\n                      <li class=\"nav-item\">\n                        <a class=\"nav-link\" href=\"#bbands\" (click)=\"printBBANDS(bbandsLower,bbandsMiddle,bbandsUpper)\" data-toggle=\"tab\">BBANDS</a>\n                      </li>\n                      <li class=\"nav-item\">\n                        <a class=\"nav-link\" href=\"#macd\" (click)=\"printMACD(macdData)\" data-toggle=\"tab\">MACD</a>\n                      </li>\n\n                    </ul>\n                    </div>\n                    <div *ngIf='chartError' style=\"padding-top:100px;\">\n                        <div  class=\"alert alert-danger\" style=\"width:100%;\" role=\"alert\">\n                            <strong>Error!</strong> Chart data not available.\n                        </div>\n                    </div>\n                    <div *ngIf=\"loadingGraphs\" style=\"padding-top:100px;\">\n                        <div class=\"progress\" >\n                          <div class=\"progress-bar progress-bar-striped progress-bar-animated\" role=\"progressbar\" aria-valuenow=\"50\" aria-valuemin=\"0\" aria-valuemax=\"100\" style=\"width:50%; height:100%;\"></div>\n                      </div>\n                      </div>\n                    <div id='chartTabContent' class=\"tab-content\" [hidden]=\"loadingGraphs || !indicatorData.Price || !indicatorData.SMA || !indicatorData.EMA || !indicatorData.RSI || !indicatorData.CCI || !indicatorData.MACD || !indicatorData.STOCH1 || !indicatorData.BBANDSLower || !indicatorData.ADX\">\n\n                        <div class=\"tab-pane\" id=\"sma\">\n\n                          <div id=\"smachart\">\n\n                          </div>\n\n                        </div>\n\n                      <div class=\"tab-pane\" id=\"ema\">\n\n                              <div id=\"emachart\">\n\n                              </div>\n\n                            </div>\n                            <div class=\"tab-pane\" id=\"rsi\">\n\n                                 <div id=\"rsichart\">\n\n                                 </div>\n\n                               </div>\n                               <div class=\"tab-pane\" id=\"adx\">\n\n                                   <div id=\"adxchart\">\n\n                                   </div>\n\n                                 </div>\n                                 <div class=\"tab-pane\" id=\"cci\">\n\n                                     <div id=\"ccichart\">\n\n                                  </div>\n\n                               </div>\n                               <div class=\"tab-pane\" id=\"macd\">\n\n                                   <div id=\"macdchart\">\n\n                                </div>\n\n                             </div>\n                             <div class=\"tab-pane\" id=\"stoch\">\n\n                               <div id=\"stochchart\">\n\n                            </div>\n\n                         </div>\n                         <div class=\"tab-pane\" id=\"bbands\">\n\n                           <div id=\"bbandschart\">\n\n                        </div>\n\n                     </div>\n                     <div class=\"tab-pane active\"  id=\"price\">\n\n                       <div id=\"pricechart\">\n\n                    </div>\n\n\n                 </div>\n                 </div>\n                </div>\n\n\n\n                  </div>\n                </div>\n                <div class=\"tab-pane\" id=\"news\">\n                    <div *ngIf='newsError' style=\"padding-top:100px;\">\n                        <div  class=\"alert alert-danger\" style=\"width:100%;\" role=\"alert\">\n                            <strong>Error!</strong> news data not available.\n                        </div>\n                    </div>\n                    <div *ngIf='!newsError'>\n                    <div *ngFor=\"let item of stockNews; let i=index\">\n                        <div *ngIf=\"i<5\">\n                        <div class=\"well\" style=\"background-color:#EFEFEF;\">\n                        <h3><a href='{{item.link}}'>{{item.title}}</a></h3><br/>\n                        <h3>Author: {{item.author}}</h3><br/>\n                        <h3>Date: {{item.pubDate}}</h3><br/>\n                        </div>\n                        </div>\n                    </div>\n                    </div>\n                </div>\n                <div class=\"tab-pane\" id=\"history\">\n                    <div *ngIf='historyError' style=\"padding-top:100px;\">\n                        <div  class=\"alert alert-danger\" style=\"width:100%;\" role=\"alert\">\n                            <strong>Error!</strong> news data not available.\n                        </div>\n                    </div>\n                  <div *ngIf=\"!historyError\">\n                  <div id=\"historychartcontainer\" style=\"height: 500px;\">\n\n                  </div>\n                  </div>\n                </div>\n                  </div>\n                </div>\n              </div>\n        </ngx-item>\n\n  </ngx-carousel>\n  </div>\n  </div>\n\n\n"

/***/ }),

/***/ "../../../../../src/app/app.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_forms__ = __webpack_require__("../../../forms/esm5/forms.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__ = __webpack_require__("../../../../rxjs/_esm5/Observable.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_startWith__ = __webpack_require__("../../../../rxjs/_esm5/add/operator/startWith.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_map__ = __webpack_require__("../../../../rxjs/_esm5/add/operator/map.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__angular_common_http__ = __webpack_require__("../../../common/esm5/http.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_highcharts__ = __webpack_require__("../../../../highcharts/highcharts.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_highcharts___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_highcharts__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_highcharts_highstock__ = __webpack_require__("../../../../highcharts/highstock.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_highcharts_highstock___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_highcharts_highstock__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_ngx_facebook__ = __webpack_require__("../../../../ngx-facebook/dist/esm/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_rxjs_add_operator_debounceTime__ = __webpack_require__("../../../../rxjs/_esm5/add/operator/debounceTime.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_rxjs_add_operator_takeWhile__ = __webpack_require__("../../../../rxjs/_esm5/add/operator/takeWhile.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_rxjs_add_observable_forkJoin__ = __webpack_require__("../../../../rxjs/_esm5/add/observable/forkJoin.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12_rxjs_observable_IntervalObservable__ = __webpack_require__("../../../../rxjs/_esm5/observable/IntervalObservable.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};













var AppComponent = (function () {
    function AppComponent(http, fb) {
        var _this = this;
        this.http = http;
        this.fb = fb;
        this.savedItems = JSON.parse(localStorage.getItem('favouriteStocks'));
        this.title = 'app';
        this.currentSlide = "0";
        this.orderBy = "asc";
        this.sortBy = "default";
        this.loadingData = false;
        this.refresh = true;
        this.loadingGraphs = false;
        this.invalidTicker = false;
        this.priceError = false;
        this.chartError = false;
        this.historyError = false;
        this.newsError = false;
        this.isThere = false;
        this.indicatorData = {};
        this.stockDetails = [];
        this.stockNews = [];
        this.stockTicker = '';
        this.states = [];
        this.stateCtrl = new __WEBPACK_IMPORTED_MODULE_1__angular_forms__["b" /* FormControl */]();
        this.stateCtrl.valueChanges
            .debounceTime(100)
            .startWith(null)
            .subscribe(function (ticker) {
            if (ticker) {
                _this.getSuggestions(ticker);
            }
        });
        fb.init({
            appId: '1287002014737790',
            xfbml: true,
            version: 'v2.11'
        });
    }
    AppComponent.prototype.ngOnInit = function () {
        this.carouselOne = {
            grid: { xs: 1, sm: 1, md: 1, lg: 1, all: 0 },
            point: {
                visible: false
            },
        };
        if (!localStorage.getItem(('favouriteStocks'))) {
            localStorage.setItem('favouriteStocks', JSON.stringify([]));
        }
        this.stockTicker = '';
    };
    AppComponent.prototype.getSuggestions = function (name) {
        var _this = this;
        this.http.get('http://stock-env.us-east-2.elasticbeanstalk.com/ticker/' + name)
            .subscribe(function (data) {
            _this.states = data;
        });
    };
    AppComponent.prototype.enableAutoRefresh = function (e) {
        this.refresh = e.target.checked;
    };
    AppComponent.prototype.autoRefresh = function () {
        var _this = this;
        console.log("Refreshing");
        var tickers = this.getRefreshObservables();
        __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__["a" /* Observable */].forkJoin(tickers).subscribe(function (res) {
            _this.savedItems = res;
            localStorage.setItem('favouriteStocks', JSON.stringify(res));
        });
        __WEBPACK_IMPORTED_MODULE_12_rxjs_observable_IntervalObservable__["a" /* IntervalObservable */].create(5000)
            .takeWhile(function () { return _this.refresh; }) // only fires when component is alive
            .subscribe(function () {
            __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__["a" /* Observable */].forkJoin(_this.getRefreshObservables()).subscribe(function (res) {
                _this.savedItems = res;
                localStorage.setItem('favouriteStocks', JSON.stringify(res));
            });
        });
    };
    AppComponent.prototype.getRefreshObservables = function () {
        var observables = [];
        for (var i = 0; i < this.savedItems.length; i++) {
            var obr = this.http.get('http://stock-env.us-east-2.elasticbeanstalk.com/auto/' + this.savedItems[i].symbol)
                .map(function (responseFavs) {
                return {
                    symbol: responseFavs['symbol'],
                    price: responseFavs['last_price'],
                    change: responseFavs['change'],
                    change_percent: responseFavs['change_percent'],
                    color: responseFavs['color'],
                    volume: parseInt(responseFavs['volume']),
                    image: responseFavs['image']
                };
            });
            observables.push(obr);
        }
        return observables;
    };
    AppComponent.prototype.clear = function () {
        this.stockTicker = "";
    };
    AppComponent.prototype.setStockTicker = function (ticker) {
        this.stockTicker = ticker;
    };
    AppComponent.prototype.getStockData = function () {
        var _this = this;
        this.carouselOne.slide = 1;
        if (this.stockTicker.replace(/ /g, '').length == 0) {
            this.invalidTicker = true;
            return;
        }
        this.isThere = false;
        for (var i = 0; i < this.savedItems.length; i++) {
            if (this.savedItems[i].symbol == this.stockTicker) {
                this.isThere = true;
                break;
            }
        }
        this.invalidTicker = false;
        this.loadingData = true;
        this.priceError = false;
        this.http.get('http://stock-env.us-east-2.elasticbeanstalk.com/api/' + this.stockTicker)
            .subscribe(function (response) {
            _this.stockDetails = response;
        }, function () {
            _this.loadingData = false;
            _this.priceError = true;
        }, function () {
            _this.loadingData = false;
            _this.priceError = false;
        });
        this.http.get('http://stock-env.us-east-2.elasticbeanstalk.com/news/' + this.stockTicker).subscribe(function (newsResponse) {
            _this.stockNews = newsResponse;
            _this.newsError = false;
        }, function () {
            _this.newsError = true;
        }, function () {
            _this.newsError = false;
        });
        this.http.get('http://stock-env.us-east-2.elasticbeanstalk.com/graphs/' + this.stockTicker).subscribe(function (historyResponse) {
            _this.historyStock = historyResponse;
            _this.historyError = false;
        }, function () {
            _this.historyError = true;
        }, function () {
            _this.historyError = false;
        });
        this.loadingGraphs = true;
        this.chartError = false;
        this.http.get('http://stock-env.us-east-2.elasticbeanstalk.com/recentgraphs/' + this.stockTicker).subscribe(function (indicatorResponse) {
            _this.indicatorData = indicatorResponse;
            _this.smaData = _this.indicatorData['SMA'];
            _this.emaData = _this.indicatorData['EMA'];
            _this.rsiData = _this.indicatorData['RSI'];
            _this.adxData = _this.indicatorData['ADX'];
            _this.macdData = _this.indicatorData['MACD'];
            _this.cciData = _this.indicatorData['CCI'];
            _this.stochData1 = _this.indicatorData['STOCH1'];
            _this.stochData2 = _this.indicatorData['STOCH2'];
            _this.bbandsLower = _this.indicatorData['BBANDSLower'];
            _this.bbandsUpper = _this.indicatorData['BBANDSUpper'];
            _this.bbandsMiddle = _this.indicatorData['BBANDSMiddle'];
            _this.priceStock = _this.indicatorData['Price'];
            _this.volumeStock = _this.indicatorData['Volume'];
            if (_this.indicatorData == JSON.stringify({}))
                _this.chartError = true;
        }, function () {
            _this.loadingGraphs = false;
            _this.chartError = true;
        }, function () {
            _this.loadingGraphs = false;
            _this.printSMA(_this.smaData);
            _this.printEMA(_this.emaData);
            _this.printADX(_this.adxData);
            _this.printCCI(_this.cciData);
            _this.printMACD(_this.macdData);
            _this.printSTOCH(_this.stochData1, _this.stochData2);
            _this.printBBANDS(_this.bbandsLower, _this.bbandsMiddle, _this.bbandsUpper);
            _this.printRSI(_this.rsiData);
            _this.printPrice(_this.priceStock, _this.volumeStock);
            _this.chartError = false;
        });
    };
    AppComponent.prototype.deleteFavourite = function (deleteTicker) {
        var favs = JSON.parse(localStorage.getItem('favouriteStocks'));
        var index = favs.indexOf(deleteTicker);
        favs.splice(index, 1);
        localStorage.setItem('favouriteStocks', JSON.stringify(favs));
        this.savedItems = favs;
    };
    AppComponent.prototype.fbAction = function () {
        var _this = this;
        var exportURL = "https://export.highcharts.com/";
        var optionsStr = JSON.stringify(this.currentChart);
        var obj = {
            infile: optionsStr,
            type: 'image/png',
            async: true,
            constr: "Chart"
        };
        return this.http.post(exportURL, obj, {
            headers: new __WEBPACK_IMPORTED_MODULE_5__angular_common_http__["c" /* HttpHeaders */]().set('content-type', 'application/json'),
            responseType: 'text'
        }).toPromise().then(function (result) {
            var imageURL = exportURL + result;
            var options = {
                method: 'share',
                href: imageURL
            };
            _this.fb.ui(options)
                .then(function (res) {
                alert('Posted to timeline successfully!');
            }).catch(function (err) { console.log(err); });
        });
    };
    AppComponent.prototype.saveFavorites = function () {
        //localStorage.setItem('favouriteStocks',[]);
        // localStorage.removeItem('favouriteStocks');
        if (!localStorage.getItem('favouriteStocks')) {
            localStorage.setItem('favouriteStocks', JSON.stringify([]));
        }
        ;
        var storedObject = {
            symbol: this.stockDetails['symbol'],
            price: this.stockDetails['last_price'],
            change: this.stockDetails['change'],
            change_percent: this.stockDetails['change_percent'],
            color: this.stockDetails['color'],
            volume: this.stockDetails['volume'],
            image: this.stockDetails['image']
        };
        var symbol = this.stockDetails['symbol'];
        var stored = localStorage.getItem('favouriteStocks');
        var favs = JSON.parse(localStorage.getItem('favouriteStocks'));
        if (!stored.includes(symbol)) {
            favs.push(storedObject);
        }
        else {
            var index = favs.indexOf(symbol);
            favs.splice(index, 1);
        }
        localStorage.setItem('favouriteStocks', JSON.stringify(favs));
        this.savedItems = favs;
    };
    AppComponent.prototype.printHistoryChart = function (historyStock) {
        Object(__WEBPACK_IMPORTED_MODULE_7_highcharts_highstock__["stockChart"])('historychartcontainer', {
            title: {
                text: this.stockTicker + ' Stock Value'
            },
            subtitle: {
                text: '<a href="https://www.alphavantage.co/" style="color:blue" target="_blank">Source: Alpha Vantage</a>',
                useHTML: true
            },
            tooltip: {
                split: false
            },
            yAxis: {
                title: {
                    text: 'Stock Value'
                }
            }, rangeSelector: {
                buttons: [{
                        type: 'week',
                        count: 1,
                        text: '1w'
                    }, {
                        type: 'month',
                        count: 1,
                        text: '1m'
                    }, {
                        type: 'month',
                        count: 3,
                        text: '3m'
                    }, {
                        type: 'month',
                        count: 6,
                        text: '6m'
                    }, {
                        type: 'ytd',
                        count: 5,
                        text: 'YTD'
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
    };
    AppComponent.prototype.printSMA = function (smaData) {
        this.currentChart = {
            chart: {
                zoomType: 'x'
            },
            title: {
                text: 'Simple Moving Average (SMA)'
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
        Object(__WEBPACK_IMPORTED_MODULE_6_highcharts__["chart"])('smachart', this.currentChart);
    };
    AppComponent.prototype.printEMA = function (emaData) {
        this.currentChart = {
            chart: {
                zoomType: 'x'
            },
            title: {
                text: 'Exponential Moving Average (EMA)'
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
        Object(__WEBPACK_IMPORTED_MODULE_6_highcharts__["chart"])('emachart', this.currentChart);
    };
    AppComponent.prototype.printRSI = function (rsiData) {
        this.currentChart = {
            chart: {
                zoomType: 'x'
            },
            title: {
                text: 'Relative Strength Index (RSI)'
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
        Object(__WEBPACK_IMPORTED_MODULE_6_highcharts__["chart"])('rsichart', this.currentChart);
    };
    AppComponent.prototype.printADX = function (adxData) {
        this.currentChart = {
            chart: {
                zoomType: 'x'
            },
            title: {
                text: 'Average Directional movement indeX (ADX)'
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
        Object(__WEBPACK_IMPORTED_MODULE_6_highcharts__["chart"])('adxchart', this.currentChart);
    };
    AppComponent.prototype.printCCI = function (cciData) {
        this.currentChart = {
            chart: {
                zoomType: 'x'
            },
            title: {
                text: 'Commodity Channel Index (CCI)'
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
        Object(__WEBPACK_IMPORTED_MODULE_6_highcharts__["chart"])('ccichart', this.currentChart);
    };
    AppComponent.prototype.printMACD = function (macdData) {
        this.currentChart = {
            chart: {
                zoomType: 'x'
            },
            title: {
                text: 'Moving Average Convergence/Divergence (MACD)'
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
        Object(__WEBPACK_IMPORTED_MODULE_6_highcharts__["chart"])('macdchart', this.currentChart);
    };
    AppComponent.prototype.printSTOCH = function (stochData1, stochData2) {
        this.currentChart = {
            chart: {
                zoomType: 'x'
            },
            title: {
                text: 'Stochastic Oscillator (STOCH)'
            },
            subtitle: {
                text: "<a href='https://www.alphavantage.co' target='_blank'>Source: Alpha Vantage </a>",
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
                series: {}
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
        Object(__WEBPACK_IMPORTED_MODULE_6_highcharts__["chart"])('stochchart', this.currentChart);
    };
    AppComponent.prototype.printBBANDS = function (bbandsLower, bbandsMiddle, bbandsUpper) {
        this.currentChart = {
            title: {
                text: 'Bollinger Bands (BBANDS)'
            },
            subtitle: {
                text: "<a href='https://www.alphavantage.co' target='_blank'>Source: Alpha Vantage </a>",
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
                series: {}
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
        Object(__WEBPACK_IMPORTED_MODULE_6_highcharts__["chart"])('bbandschart', this.currentChart);
    };
    AppComponent.prototype.printPrice = function (priceStock, volumeStock) {
        this.currentChart = {
            chart: {
                zoomType: 'x'
            }, title: {
                text: this.stockTicker + ' Stock Price and Volume'
            },
            subtitle: {
                text: "<a href='https://www.alphavantage.co' target='_blank'>Source: Alpha Vantage </a>",
                useHTML: true
            },
            xAxis: [{
                    type: 'datetime',
                    dateTimeLabelFormats: {
                        month: '%m/%d',
                        week: '%m/%d',
                        day: '%m/%d'
                    },
                    tickInterval: 7 * 24 * 3600 * 1000,
                    tickPixelInterval: 100,
                    labels: { y: 20, rotation: -45, align: 'right' }
                }],
            yAxis: [{
                    labels: {},
                    tickInterval: 10,
                    title: {
                        text: 'Stock Price',
                    },
                }, {
                    title: {
                        text: 'Volume',
                    },
                    tickInterval: 40000000,
                    labels: {},
                    opposite: true
                }],
            plotOptions: {
                series: {
                    stacking: 'normal',
                },
                column: {
                    pointWidth: 1,
                    pointPadding: 0.5,
                    borderWidth: 0
                }
            },
            series: [{
                    name: this.stockTicker,
                    type: 'area',
                    data: priceStock,
                    color: '#D33920'
                }, {
                    name: this.stockTicker + ' Volume',
                    type: 'column',
                    data: volumeStock,
                    yAxis: 1,
                    color: 'rgba(255,255,255,0.5)',
                }]
        };
        Object(__WEBPACK_IMPORTED_MODULE_6_highcharts__["chart"])('pricechart', this.currentChart);
    };
    AppComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-root',
            template: __webpack_require__("../../../../../src/app/app.component.html"),
            styles: [__webpack_require__("../../../../../src/app/app.component.css")]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_5__angular_common_http__["a" /* HttpClient */], __WEBPACK_IMPORTED_MODULE_8_ngx_facebook__["b" /* FacebookService */]])
    ], AppComponent);
    return AppComponent;
}());



/***/ }),

/***/ "../../../../../src/app/app.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__("../../../platform-browser/esm5/platform-browser.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_common_http__ = __webpack_require__("../../../common/esm5/http.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ng_bootstrap_ng_bootstrap__ = __webpack_require__("../../../../@ng-bootstrap/ng-bootstrap/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_platform_browser_animations__ = __webpack_require__("../../../platform-browser/esm5/animations.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__app_component__ = __webpack_require__("../../../../../src/app/app.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__angular_material__ = __webpack_require__("../../../material/esm5/material.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__angular_forms__ = __webpack_require__("../../../forms/esm5/forms.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_ngx_facebook__ = __webpack_require__("../../../../ngx-facebook/dist/esm/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_ngx_carousel__ = __webpack_require__("../../../../ngx-carousel/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_ng2_order_pipe__ = __webpack_require__("../../../../ng2-order-pipe/dist/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_ng2_order_pipe___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_10_ng2_order_pipe__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_hammerjs__ = __webpack_require__("../../../../hammerjs/hammer.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_hammerjs___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_11_hammerjs__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};












var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["NgModule"])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_5__app_component__["a" /* AppComponent */]
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_3__ng_bootstrap_ng_bootstrap__["a" /* NgbModule */].forRoot(),
                __WEBPACK_IMPORTED_MODULE_4__angular_platform_browser_animations__["a" /* BrowserAnimationsModule */],
                __WEBPACK_IMPORTED_MODULE_2__angular_common_http__["b" /* HttpClientModule */],
                __WEBPACK_IMPORTED_MODULE_6__angular_material__["b" /* MatFormFieldModule */],
                __WEBPACK_IMPORTED_MODULE_6__angular_material__["c" /* MatInputModule */],
                __WEBPACK_IMPORTED_MODULE_6__angular_material__["a" /* MatAutocompleteModule */],
                __WEBPACK_IMPORTED_MODULE_6__angular_material__["d" /* MatOptionModule */],
                __WEBPACK_IMPORTED_MODULE_6__angular_material__["f" /* MatSlideToggleModule */],
                __WEBPACK_IMPORTED_MODULE_6__angular_material__["e" /* MatSelectModule */],
                __WEBPACK_IMPORTED_MODULE_7__angular_forms__["d" /* FormsModule */],
                __WEBPACK_IMPORTED_MODULE_7__angular_forms__["i" /* ReactiveFormsModule */],
                __WEBPACK_IMPORTED_MODULE_10_ng2_order_pipe__["Ng2OrderModule"],
                __WEBPACK_IMPORTED_MODULE_8_ngx_facebook__["a" /* FacebookModule */].forRoot(),
                __WEBPACK_IMPORTED_MODULE_9_ngx_carousel__["a" /* NgxCarouselModule */]
            ],
            providers: [],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_5__app_component__["a" /* AppComponent */]]
        })
    ], AppModule);
    return AppModule;
}());



/***/ }),

/***/ "../../../../../src/environments/environment.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return environment; });
// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.
var environment = {
    production: false
};


/***/ }),

/***/ "../../../../../src/main.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__ = __webpack_require__("../../../platform-browser-dynamic/esm5/platform-browser-dynamic.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_hammerjs__ = __webpack_require__("../../../../hammerjs/hammer.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_hammerjs___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_hammerjs__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_app_module__ = __webpack_require__("../../../../../src/app/app.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__environments_environment__ = __webpack_require__("../../../../../src/environments/environment.ts");





if (__WEBPACK_IMPORTED_MODULE_4__environments_environment__["a" /* environment */].production) {
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["enableProdMode"])();
}
Object(__WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_3__app_app_module__["a" /* AppModule */])
    .catch(function (err) { return console.log(err); });


/***/ }),

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("../../../../../src/main.ts");


/***/ })

},[0]);
//# sourceMappingURL=main.bundle.js.map