require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const request = require('request');
const cheerio = require("cheerio");
var theNewYorkTimes;
var usaTodayNews;
var yahooNews;
var techCrunchNews;
var forbesNews;
var cosmopolitan;
var theEconomistNews;
var peopleNews;
var indiatodayNews;
var timesofindiaNews;
var businesstodayNews;
var indianexpressNews;
var thehinduNews;
var ndtvNews;
var zeeNews;
const app = express();
//NewYorkTimes
request("https://www.nytimes.com/",(error,response,html)=>
{
  if (!error && response.statusCode==200){
    const $ = cheerio.load(html);

    const nyt_heading = $(".css-1bxzzgs,e1lsht870").each((i,el) => {

    const heading = $(el).text();
    console.log(heading)
    if(i==0){
      theNewYorkTimes  = heading+".";
    }
    });
  }
});
//USA Today
request("https://www.usatoday.com/",(error,response,html)=>
{
  if (!error && response.statusCode==200){
    const $ = cheerio.load(html);

    const cnn_heading = $("span").each((i,el) => {

    const heading = $(el).text();
    console.log(heading)
    if(i==0){
      usaTodayNews = heading+".";
    }
    });
  }
});
//Yahoo
request("https://news.yahoo.com/",(error,response,html)=>
{
  if (!error && response.statusCode==200){
    const $ = cheerio.load(html);

    const y_heading = $("h2").each(function (i,el){
      const heading = $(el).text();

      yahooNews = heading + ".";
    })
    ;

  }
});
//TechCrunch
request("https://techcrunch.com/",(error,response,html)=>
{
  if (!error && response.statusCode==200){
    const $ = cheerio.load(html);
    const tch_heading = $(".post-block__title__link").each(function(i,e){
      if(i ==0){     const heading = $(e).text().trim();
      techCrunchNews = heading+".";
    }
    });
      }
});
//The Economist
request("https://www.economist.com/",(error,response,html)=>
{
  if (!error && response.statusCode==200){
    const $ = cheerio.load(html);
    const e_heading = $("h3").each(function (i,el){
      const heading = $(el).text();
      if(i == 0){
        theEconomistNews = heading+'.';
      }
    })
      }

});

//womansday
request("https://www.cosmopolitan.com/",(error,response,html)=>
{
  if (!error && response.statusCode==200){
    const $ = cheerio.load(html);
    const w_heading = $(".custom-item-title,item-title").each(function(i,e){
      if(i ==0){     const heading = $(e).text().trim();
      cosmopolitan = heading + '.';}
    });


      }
});
//People Magazine
request("https://people.com/",(error,response,html)=>
{
  if (!error && response.statusCode==200){
    const $ = cheerio.load(html);
    const p_heading = $(".entityTout__link").each(function(i,e){
      if(i ==0){     const heading = $(e).text().trim();
      peopleNews = heading + '.';}
    });
      }
});
//Forbes

request("https://www.forbes.com/",(error,response,html)=>
{
  if (!error && response.statusCode==200){
    const $ = cheerio.load(html);
    const p_heading = $(".happening__title").each(function(i,e){
      if(i ==0){     const heading = $(e).text().trim();
      forbesNews= heading + '.';}
    });
      }
});


//indiatoday
today_url = "https://www.indiatoday.in/"
today_target ="h2"
indiatodayNews = display_news(today_url,today_target)



//timesofindia
times_url = "https://timesofindia.indiatimes.com/us";
times_target = "figcaption";
timesofindiaNews = display_news(times_url,times_target)
//businesstoday
business_url = "https://www.businesstoday.in/";
business_target = ".topzone";
businesstodayNews = display_news(business_url,business_target)
//indianexpress
express_url = "https://indianexpress.com/";
express_target = ".ie-first-story";
indianexpressNews = display_news(express_url,express_target)
//

//thehindu
hindu_url = "https://www.thehindu.com/";
hindu_target = ".ls50x3Bluebg-heading";
thehinduNews = display_news(hindu_url,hindu_target)
//ndtv
ndtv_url = "https://www.ndtv.com/";
ndtv_target = "h1";
ndtvNews = display_news(ndtv_url,ndtv_target)
//zeeNews
zee_url = "https://zeenews.india.com/"
zee_target = "h1";
zeeNews = display_news(zee_url,zee_target)
function display_news(url,target){
  request(url,function (error,response, html){
    if (!error && response.statusCode==200){
      const $ = cheerio.load(html);
      const h = $(target).each(function (i,el){
        if(i==0){
          const heading= $(el).text().trim()+ ".";

          zeeNews = heading;
        }
      })

    }
  })
}
app.set('view engine', 'ejs');
app.use(express.static("public"));
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(express.static("public"));

app.get("/",function(req,res){
   res.render("home",{theNewYorkTimes :theNewYorkTimes,
     yahooNews:yahooNews,forbesNews:forbesNews, techCrunchNews:techCrunchNews,
   cosmopolitan:cosmopolitan,theEconomistNews:theEconomistNews,peopleNews:peopleNews,usaTodayNews:usaTodayNews
});



});
app.get("/india",function (req, res){
  res.render("india",{
    indiatoday:indiatodayNews, timesofindia:timesofindiaNews, businesstoday:businesstodayNews,
    indianexpress:indianexpressNews, thehindu:thehinduNews,ndtv:ndtvNews,zee:zeeNews
  })
})




app.listen(process.env.PORT || 3000,function(){
  console.log("Successfully running on port 3000");
});









// Apikey :
