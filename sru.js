/**
 * Created by florianporada on 11.04.16.
 */
var request = require("request");
var mongoose = require('mongoose');
var fs = require('fs');

mongoose.connect('mongodb://localhost/SWB');

var Book = mongoose.model('Book', {
    ppn: String,
    xml: String
});

var swbFetcher = function(ppn, callback) {
    var url = 'http://swb.bsz-bw.de/sru/DB=2.1/username=/password=/?query=pica.ppn+%3D+%' + ppn +'%22&version=1.1&operation=searchRetrieve&stylesheet=http%3A%2F%2Fswb.bsz-bw.de%2Fsru%2F%3Fxsl%3DsearchRetrieveResponse&recordSchema=marc21&maximumRecords=1&startRecord=1&recordPacking=xml&sortKeys=none&x-info-5-mg-requestGroupings=none';
    Book.count({ppn: ppn}, function (err, count) {
        if (count === 0) {
            request(url, function(error, response, data) {
                if (!error && response.statusCode == 200) {
                    var book = new Book({
                        ppn: ppn,
                        xml: data
                    });

                    if (typeof callback === "function") {
                        callback(book);
                    }
                } else {
                    console.log(error, 'Trying to fetch ' + ppn + ' again in 5sec');
                    setTimeout(function() {
                        swbFetcher(ppn, function(item) {
                            saveItem(item);
                        });
                    }, 5000);
                }
            });
        } else {
            console.log('Item with ppn: ' + item.ppn + ' already exists.');
        }
    });
};

var saveItem = function(item) {
    Book.count({ppn: item.ppn}, function (err, count){
        if (count === 0) {
            item.save(function (err) {
                if (err) {
                    console.log(err);
                } else {
                    console.log('saved', item.ppn);
                }
            });
        } else {
            console.log('Item with ppn: ' + item.ppn + ' already exists.')
        }
    });
};

var readJsonFile = function(path, callback) {
    fs.readFile(path, 'utf8', function(err,data) {
        if (err) throw err;
        
        var obj = JSON.parse(data);
        
        if (typeof callback === "function") {
            callback(obj);
        }
    });
};

readJsonFile('uniquePPN.json', function(data) {
    data.forEach(function(item) {
        swbFetcher(item.ppn, function(item) {
            saveItem(item);
        });
    });
});
