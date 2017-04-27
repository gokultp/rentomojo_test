var JobQueue       = require('./lib/jobqueue.js');
var request             = require('request');
var parser              = require('./lib/parser')
var fs                  = require('fs');
var url                 = require('url');

const CONCURRENCY       = 5;
const FILE_NAME         = 'links.csv';
var objUrlHashMap       = new Object();

Queue       = new JobQueue(function (data, cb) {
   makeRequest(data.href, function (err, body) {
       if(err){
        //    ignore errors
           cb(null)
       }
       else {
           parser.parseHtml(body, cb);
       }
   });
}, CONCURRENCY);



function makeRequest(url, cb) {
    request(url, function (err, res, body) {
        if(err){
            cb(err);
        }
        else{
            cb(null, body);
        }
    });
}

fs.appendFile(FILE_NAME, '"text","href"\r\n');


function startScrape(data) {
    console.log('--------------start')
    Queue.push(data, function (err, res) {
            console.log('--------------got')
            if(res){
                res.forEach(function(element, i) {

                    element.href        = fixLink(element.href, data.href);
                    element.text        = fixText(element.text);

                    if(element.href && !objUrlHashMap[element.href]){
                        objUrlHashMap[element.href]    = 1;
                        fs.appendFile(FILE_NAME, '"'+ element.text+ '","'+ element.href+'"\r\n', function (err) {
                            
                        });
                        startScrape(element)
                    }
                });
            }
            
        });
    
    return
}


function fixText(txt){
    // replace all new line characters
    return txt.replace(/\n/g, ' ').replace(/\r/g, ' ');
}

function fixLink(elementUrl, parentPageUrl) {
    // some urls will not have host for eg: for sin in it will be just '/signin'
    // so here we have to take host from parent page and append with it
    // here a library called url is used for that purpose.
    
    var currentUrl  = url.parse(elementUrl);
    if(currentUrl.host){
        return elementUrl;
    }
    var parentUrl   = url.parse(parentPageUrl);
    return parentUrl.resolve(elementUrl);
}

startScrape({href: 'https://medium.com'});



