<?php
session_start();
?>
<?php
    $iserror=false;
    if(isset($_POST['search'])){
        if(!isset($_POST['ticker']) || trim($_POST['ticker']=='')){
            echo '<script language="javascript">';
            echo 'alert("Please enter a symbol.")';
            echo '</script>';
        }
        else {
            $ticker_Symbol = strtoupper($_POST['ticker']);
            $api_key = "24HXTRKR761VN11S";
            try{
            $response_Vantage = file_get_contents('https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol='.$ticker_Symbol.'&interval=1min&apikey='.$api_key);
            }catch (Exception $e){
                echo "Alphavantage API error.";
            }
            $response = json_decode($response_Vantage,true);
            if(isset($response['Error Message'])){
                $iserror = true;
            }else{
            //building the data for the first table
            $i =0;
            $open = array();
            $close = array();
            $low = array();
            $high = array();
            $volume = array();
            foreach($response['Time Series (Daily)'] as $key=>$value){
                $open[$i] = $value['1. open'];
                $close[$i] = $value['4. close'];
                $low[$i] = $value['3. low'];
                $high[$i] = $value['2. high'];
                $volume[$i] = $value['5. volume'];
                $i++;
                if($i==2) break;
            }
            array_reverse($close);
            array_reverse($open);
            array_reverse($low);
            array_reverse($high);
            array_reverse($volume);
            $symbol_print = $response['Meta Data']['2. Symbol'];
            $time_stamp = $response['Meta Data']['3. Last Refreshed'];
            $news_xml_url = 'https://seekingalpha.com/api/sa/combined/'.$ticker_Symbol.'.xml';
            $news_xml = simplexml_load_file($news_xml_url) or die('Problem in loading file.');
            global $jsonNews;
            $iterate =1;
            foreach($news_xml->channel->item as $item){
                if(strpos($item->link, 'article') !== false){
                $title = $item->title;
                $link = $item->link;
                $pubDate = $item->pubDate;
               $jsonNews[] = array(
                   "title" => $title,
                   "link" =>  $link,
                   "pubDate" => $pubDate);  
                if($iterate++ == 5) break;           
           }
        }
           
        }
    }
    }
?>

<html>
    <head>
    <script src="https://code.jquery.com/jquery-3.1.1.min.js"></script>
    <script src="https://code.highcharts.com/highcharts.js"></script>
    <script src="https://code.highcharts.com/modules/exporting.js"></script>
    <script type="text/javascript">
     Highcharts.seriesTypes.column.prototype.getExtremesFromAll = true;
    function chart_function(indicator){
        xmlhttp = new XMLHttpRequest();
        
        var ticker ='<?php echo $ticker_Symbol; ?>'; 
        var api_key='<?php echo $api_key;?>';
        var indicator = indicator;
        var key = 'Technical Analysis: '+indicator;
        var url ='https://www.alphavantage.co/query?function='+indicator+'&symbol='+ticker+'&interval=daily&time_period=10&series_type=close&apikey='+api_key;
        console.log(url);
        xmlhttp.open("GET",url,false);
        xmlhttp.send();
        var response = JSON.parse(xmlhttp.responseText);
        // data = [[x,y], ...]
        var data = [];
        var dates = Object.keys(response[key]);
        for(var i=0; i<130; i++){
            var parsedDate = new Date(dates[i]);
            var utcDate = Date.UTC(parsedDate.getUTCFullYear(), parsedDate.getUTCMonth(), parsedDate.getUTCDate());
            data[i] = [utcDate, parseFloat(response[key][dates[i]][indicator])];
        }
        switch(indicator){
            case 'SMA':
                var title = 'Simple Moving Average (SMA)';
                break;
            case 'EMA':
                var title ='Exponential Moving Average (EMA)';
                break;
            case 'RSI':
                var title = 'Relative Strength Index (RSI)';
                break;
            case 'ADX':
                var title ='Average Directional movement indeX (ADX)';
                break;
            case 'CCI':
                var title= 'Commodity Channel Index (CCI)';
                break;
            case 'MACD': 
                var title='Moving Average Convergence/Divergence (MACD)';
                break;
            default:
                break;
            }
           
                Highcharts.chart('container', {
                    chart: {
                        zoomType: 'x'
                    },
                    title: {
                        text: title
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
                        rotation: 0,
                        tickPixelInterval: 10
                    },
                    yAxis: {
                        title: {
                            text: indicator
                        },
                        
                    },
                    legend: {
                        align: 'right',
                        verticalAlign: 'middle',
                        layout: 'vertical'
                        
                    },
                    plotOptions: {
                            series: {
                                pointInterval: 24 * 3600 * 1000 // one day
                            }
                        },         
                    series: [{
                        type: 'line',
                        name: ticker,
                        data: data,
                        color: '#D33920',
                        marker:{
                            enabled:true,
                            radius:3
                        }
                    }]
                });
    }
    
    function chart_stoch(indicator) {
        xmlhttp = new XMLHttpRequest();
        var ticker = '<?php echo $ticker_Symbol;?>';
        var api_key = '<?php echo $api_key; ?>';
        var indicator = indicator;
        var key = 'Technical Analysis: '+indicator;
        var url ='https://www.alphavantage.co/query?function='+indicator+'&symbol='+ticker+'&interval=daily&time_period=10&series_type=close&apikey='+api_key;
        xmlhttp.open("GET",url,false);
        xmlhttp.send();
        var response = JSON.parse(xmlhttp.responseText);
            var data = [];
            var data2 = [];
            var dates = Object.keys(response[key]);
            for (var i = 0; i < 130; i++) {
                var parsedDate = new Date(dates[i]);
                var utcDate = Date.UTC(parsedDate.getUTCFullYear(), parsedDate.getUTCMonth(), parsedDate.getUTCDate());
                data[i] = [utcDate, parseFloat(response[key][dates[i]]["SlowD"])];
                data2[i] = [utcDate, parseFloat(response[key][dates[i]]["SlowK"])];

            }
           
                Highcharts.chart('container', {

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
                        rotation: 0,
                        tickPixelInterval: 10
                    },
                    legend: {
                        layout: 'vertical',
                        align: 'right',
                        verticalAlign: 'middle'
                    },

                    plotOptions: {
                        series: {
                            label: {
                                connectorAllowed: false
                            },

                        }
                    },

                    series: [{
                        name: ticker + ' SlowK',
                        data: data,
                        color: '#D33920',
                        type: 'line',
                        marker:{
                            enabled:true,
                            radius:3
                        }
                    },
                    {
                        name: ticker + ' SlowD',
                        data: data2,
                        color: '#91BDE8',
                        type: 'line',
                        marker:{
                            enabled:true,
                            radius:3
                        }
                    }
                    ],

                    responsive: {
                        rules: [{
                            condition: {
                                maxWidth: 500
                            },
                            chartOptions: {
                                legend: {

                                }
                            }
                        }]
                    }

                });
            }
    function chart_bbands(indicator) {
        xmlhttp = new XMLHttpRequest();
        var ticker = '<?php echo $ticker_Symbol;?>';
        var api_key = '<?php echo $api_key; ?>';
        var indicator = indicator;
        var key = 'Technical Analysis: '+indicator;
        var url ='https://www.alphavantage.co/query?function='+indicator+'&symbol='+ticker+'&interval=daily&time_period=10&series_type=close&apikey='+api_key;
        xmlhttp.open("GET",url,false);
        xmlhttp.send();
        var response = JSON.parse(xmlhttp.responseText);
            var data = [];
            var data2 = [];
            var data3=[];
            var dates = Object.keys(response[key]);
            for (var i = 0; i < 130; i++) {
                var parsedDate = new Date(dates[i]);
                var utcDate = Date.UTC(parsedDate.getUTCFullYear(), parsedDate.getUTCMonth(), parsedDate.getUTCDate());
                data[i] = [utcDate, parseFloat(response[key][dates[i]]["Real Upper Band"])];
                data2[i] = [utcDate, parseFloat(response[key][dates[i]]["Real Middle Band"])];
                data3[i]= [utcDate, parseFloat(response[key][dates[i]]["Real Lower Band"])];

            }
           
                Highcharts.chart('container', {

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
                        rotation: 0,
                        tickPixelInterval: 10
                    },
                    legend: {
                        layout: 'vertical',
                        align: 'right',
                        verticalAlign: 'middle'
                    },

                    plotOptions: {
                        series: {
                            label: {
                                connectorAllowed: false,
                            
                            },
                            

                        }
                    },

                    series: [
                        {
                        name: ticker + ' Real Middle Band',
                        data: data2,
                        color: '#D33920',
                        type: 'line',
                        marker:{
                            enabled:true,
                            radius:3
                        }
                    },
                    {
                        name: ticker + ' Real Upper Band',
                        data: data,
                        color: '#000000',
                        type: 'line',
                        marker:{
                            enabled:true,
                            radius:3
                        }
                    },
                    {
                        name: ticker + ' Real Lower Band',
                        data: data3,
                        color: '#D8FECF',
                        type: 'line',
                       marker:{
                            enabled:true,
                            radius:3
                        }
                    },

                    ],

                    responsive: {
                        rules: [{
                            condition: {
                                maxWidth: 500
                            },
                            chartOptions: {
                                legend: {

                                }
                            }
                        }]
                    }

                });
            }

    function chart_price(){
        xmlhttp = new XMLHttpRequest();
        var ticker = '<?php echo $ticker_Symbol; ?>';
        var api_key = '<?php echo $api_key; ?>';
        var key = 'Time Series (Daily)';
        var url = 'https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=' + ticker + '&outputsize=full&apikey=' + api_key;
        xmlhttp.open("GET", url, false);
        xmlhttp.send();
        var data = [];
        var data2 = [];
        var response = JSON.parse(xmlhttp.responseText);
        var n =  new Date();
        var y = n.getFullYear();
        var m = n.getMonth() + 1;
        var d = n.getDate();
        var dates = Object.keys(response[key]);
        var maxed = [];
        for (var i = 0; i < 130; i++) {
            var parsedDate = new Date(dates[i]);
            var utcDate = Date.UTC(parsedDate.getUTCFullYear(), parsedDate.getUTCMonth(), parsedDate.getUTCDate());
                data2[i] = [utcDate, parseFloat(response[key][dates[i]]['5. volume'])];
                data[i] = [utcDate, parseFloat(response[key][dates[i]]['4. close'])];
                maxed[i] = parseFloat(response[key][dates[i]]['4. close']);

        }
        var min = Math.min(...maxed);
        var max = Math.max(...maxed);
        console.log(min);
        console.log(max);
        
                Highcharts.chart('container', {
                    chart:{
                        
                    },
                    title: {
                        text: 'Stock Price ('+m+'/'+d+'/'+y+')'
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
                        max: max+10,
                        min: min-10,
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
                                pointWidth: 2,
                                pointRange: 1,
                                pointPadding: 0.2,
                                borderWidth: 0,
                                stacking: "normal",
                                fillOpacity: 0.6
                    
                            }
                        },
                    legend: {
                        layout: 'vertical',
                        align: 'right',
                        verticalAlign: 'middle'
                        
                    },
                    series: [{
                        name: ticker,
                        type: 'area',
                        data: data,
                        color:'#D33920'
                        
                
                    }, {
                        name:ticker+' Volume',
                        type: 'column',
                        data: data2,
                        yAxis: 1,
                        color:'#ffffff'
                        
                    }]
                });
            
    }
    function clearall(){
        document.getElementById('tickerSymbol').value='';
        document.getElementById('stockTableID').style.display = 'none';
        document.getElementById('container').style.display ='none';
        document.getElementById('showhide').style.display ='none';
        document.getElementById('newsoutput').style.display='none';
        document.getElementById('arrowclick').style.display ='none';
        

    }
    
    </script>
        <title> Stock Search  </title>
        <style>
            *{
                
            }
            
            .myform{
                margin-left: 500px;
                border:1px solid #ddd;
                width:420px;
                display: inline-block;
                margin-top:30px;
                padding-left: 10px;
                padding-right: 10px;
                background-color: #F3F3F3;
                padding-bottom: 24px;
            }
            h1{
                font-style:italic;
                height: 18px;
                margin-top: 3px;
                text-align: center;
            }
            a{
                text-decoration: none;
            }
            table,td,th{
                font-family:Helvetica, sans-serif;
                width: 1000px;
                text-align: justify;
                background-color: #fbfbfb;
                color: black;
                margin-left: 220px;
                margin-right:200px;
                border : 1px solid grey;
                border-collapse: collapse;
                font-size: 12px;
                padding: 5px;
                
            }
            .arrow{
                width:30px;
                height:20px;
                margin-left: 708px;
                margin-right:200px;
            }
            p.mid{
                margin-left: 662px;
                margin-right:200px;
                color: grey;
                font-family:Helvetica, sans-serif;
                font-size:12px;
            }
            table.stockTable{
                font-family:Helvetica, sans-serif;
                width: 1000px;
                text-align: justify;
                color: black;
                margin-left: 220px;
                margin-right:200px;
                border : 1px solid grey;
                border-collapse: collapse;
                font-size: 12px;
                padding: 5px;
            }
            table.stockTable td:nth-child(odd){
                background-color:#f3f3f3;
               font-weight:bold;
                width: 200px;
            }
            table.stockTable td:nth-child(even){
                background-color: #fbfbfb;
                width:1000px;
                text-align: center;
            }
            .arrowindi{
                width:15px;
                height:15px;
            }
            #container{
                width:1000px;
                margin-left: 220px;
                margin-right:200px;
                border : 1px solid grey;
            }
        </style>
    
        
    
    </head>
    <body>
        <form action="" class="myform" method="POST">
            <center>
            <h1> Stock Search </h1>
            </center>
            <hr>
            <p style="font-size:17px;">Enter Stock Ticker Symbol:<sup>* </sup> <input type="text" name="ticker" id="tickerSymbol" size="25" value='<?php if(isset($symbol_print))echo $symbol_print; ?>'/></p>
            <div class="actionButtons">
            <input type="submit" value="Submit" style="margin-left:200px; width:65px;" name="search">
            <input type=button style="width:60px;"value="Clear" onclick ='javascript:clearall();'>
            </div>
            <p style="font-size:17px; font-style:italic;"> <sup> * &nbsp </sup>  - &nbsp Mandatory fields.</p>           
        </form>
        <br>
        <?php if(isset($symbol_print)&& $iserror!=true): ?>
    <table class="stockTable" id="stockTableID">
        <tr>
            <td> Stock Ticker Symbol </td>
            <td> <?php echo $symbol_print; ?> </td>
        </tr>
       
        <?php
        $change = $close[0] - $close[1];
        echo "<tr><td>Close</td> "."<td>".$close[0]."</td></tr>";
        echo "<tr><td>Open</td>"."<td>".$open[0]."</td></tr>";
        echo "<tr><td>Previous Close</td>"."<td>".$close[1]."</td></tr>";
        echo "<tr><td>Change</td>"."<td>".round($change,2)." ";
        if($change>0) echo "<img src='http://cs-server.usc.edu:45678/hw/hw6/images/Green_Arrow_Up.png' class='arrowindi'>"; else if($change<0) echo "<img src='http://cs-server.usc.edu:45678/hw/hw6/images/Red_Arrow_Down.png' class='arrowindi'>" ;
        echo "</td></tr>" ;  
        echo "<tr><td>Change Percent</td>"."<td>".round($change / ($close[1] / 100),2)."%";
        if($change>0) echo "<img src='http://cs-server.usc.edu:45678/hw/hw6/images/Green_Arrow_Up.png' class='arrowindi'>"; else if($change<0) echo "<img src='http://cs-server.usc.edu:45678/hw/hw6/images/Red_Arrow_Down.png' class='arrowindi'>" ;
        echo "</td></tr>" ; 
        echo "<tr><td>Day's Range</td>"."<td>".$low[0] ." - " . $high[0]."</td></tr>";
        echo "<tr><td>Volume</td>"."<td>". number_format($volume[0])."</td></tr>";
        ?>
         <tr>
            <td>Timestamp </td>
            <td> <?php echo substr($time_stamp,0,10); ?></td>
        </tr>
        <tr>
            <td> Indicators</td>
            <td><div style="word-spacing:15px;"> <a href="javascript:chart_price()">Price </a> <a href="javascript:chart_function('SMA')"> SMA </a>
                 <a href="javascript:chart_function('EMA')">EMA  </a> <a href="javascript:chart_stoch('STOCH')"> STOCH </a>
                 <a href="javascript:chart_function('RSI')">RSI </a> <a href="javascript:chart_function('ADX')"> ADX </a>
                 <a href="javascript:chart_function('CCI')">CCI </a> <a href="javascript:chart_bbands('BBANDS')"> BBANDS </a>
                 <a href="javascript:chart_function('MACD')">MACD </a> </td></div>
        </table>
        <br>
        <div id="container">
            <script type="text/javascript">chart_price();</script>
         </div>
        <p class="mid" id="showhide"  onclick="loadNews()"> click to show stock news </p>
        <img class="arrow" id="arrowclick" src="http://cs-server.usc.edu:45678/hw/hw6/images/Gray_Arrow_Down.png" onclick="loadNews()">
        <br>
        <table id="newsoutput">
        </table>
        <br>
        <br>
        <br>
    </body>
    <?php elseif($iserror==true):?>
    <table class="stockTable" id="stockTableID">
        <tr>
            <td> Error </td>
            <td> Error: No Record has been found, please enter a valid symbol </td>
        </tr>
    </table>
     <?php endif;?>

    <script type="text/javascript">
        
        window.onload = function() {
             document.getElementById('newsoutput').style.display = 'none';
       }
       <?php  $data = json_encode($jsonNews,JSON_UNESCAPED_SLASHES)?> 
        var obj = <?=$data?>;
        var table = document.getElementById('newsoutput');
        var cell,text;

        for (var i in obj.reverse()) {
                var row = table.insertRow(0);
                cell = row.insertCell(0);
                text = "<a href='"+obj[i]['link']['0']+"' target='_blank'>"+obj[i]['title']['0'] +"</a>&nbsp &nbsp &nbsp"+ " Publication Time: "+(obj[i]['pubDate']['0']).substr(0,25);
                cell.innerHTML = text;
        }
        function loadNews(){
            var newsTable = document.getElementById("newsoutput");
            
            if (newsTable.style.display !== 'none') {
                newsTable.style.display = 'none';
                document.getElementById('showhide').innerHTML="click to show stock news";
                document.getElementById('arrowclick').src='http://cs-server.usc.edu:45678/hw/hw6/images/Gray_Arrow_Down.png'
            }
              else {
                    newsTable.style.display = '';
                    document.getElementById('showhide').innerHTML="click to hide stock news";
                    document.getElementById('arrowclick').src='http://cs-server.usc.edu:45678/hw/hw6/images/Gray_Arrow_Up.png'
                     
             }
        } 
        

        
   </script>
   
</html>