/**
 * Created by florianporada on 11.04.16.
 */
var request = require("request");
var mongoose = require('mongoose');
var fs = require('fs');

mongoose.connect('mongodb://localhost/SWB');

var Item = mongoose.model('Item', {
    ppn: String,
    xml: String
});

var getItemFromSwb = function(ppn) {
    var url = 'http://swb.bsz-bw.de/sru/DB=2.1/username=/password=/?query=pica.ppn+%3D+%' + ppn +'%22&version=1.1&operation=searchRetrieve&stylesheet=http%3A%2F%2Fswb.bsz-bw.de%2Fsru%2F%3Fxsl%3DsearchRetrieveResponse&recordSchema=marc21&maximumRecords=1&startRecord=1&recordPacking=xml&sortKeys=none&x-info-5-mg-requestGroupings=none';

    request(url, function(error, response, data) {
        saveItem(new Item({
            ppn: ppn,
            xml: data
        }))
    });
};

var saveItem = function(item) {
    item.save(function (err) {
        if (err) {
            console.log(err);
        } else {
            console.log('saved');
        }
    });
};

var readJsonFile = function(path, callback) {
    fs.readFile(path, 'utf8', function (err,data) {
        if (err) throw err;
        
        var obj = JSON.parse(data);
        
        if (typeof callback === "function") {
            callback(obj);
        }
    });
};


readJsonFile('result.txt', function(data) {
    data.forEach(function(item) {
        getItemFromSwb(item.ppn);
    })
});
