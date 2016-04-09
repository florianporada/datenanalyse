/**
 * Created by florianporada on 07.04.16.
 */
fs = require('fs');


var path = 'Liste_PPN-ExNr_HSHN-libre.csv';
var path2 = 'test.csv';
var dataSet = [];

fs.readFile(path, 'utf8', function (err,data) {
    if (err) {
        return console.log(err);
    }
    var lines = data.split('\n');

    for (var i = 1; i < lines.length; i++) {
        dataSet.push({
            ppn: parsePPN(lines[i]),
            recordNr: parseRecordNr(lines[i]),
            signature: parseSignature(lines[i]),
            barcode: parseBarcode(lines[i]),
            seal: parseSeal(lines[i])
        });
    }

    console.log(dataSet);
    console.log(getDuplicates(dataSet, 'seal'));
});

var parsePPN = function(line) {
    if (line === undefined || line === null) {
        return 
    }

    var ppn = line.split(',')[0].toString();
    if (ppn.length !== 9 && ppn.length < 9) {
        var l = 9 - ppn.length;
        var fill = '';
        for (var i = 0; i < l; i++) {
            fill += '0';
        }

        return fill + ppn + '';
    }

    return ppn;
};

var parseRecordNr = function(line) {
    if (line === undefined || line === null) {
        return
    }

    //replace PPN with emtpy string
    line = line.replace(line.split(',')[0] + ',', '');

    return line.split(' ')[0];
};

//TODO: noch failsafe machen.
var parseSignature = function(line) {
    if (line === undefined || line === null) {
        return
    }
    
    //replace PPN + recordNr with emtpy string
    line = line.replace(line.split(' ')[0], '').trim();

    return line.split(',')[0];
};

var parseBarcode = function(line) {
    if (line === undefined || line === null) {
        return
    }

    return line.split(',')[line.split(',').length - 2];
};

var parseSeal = function(line) {
    if (line === undefined || line === null) {
        return
    }

    return line.split(',')[line.split(',').length - 1].replace('\r', '');
};

var getDuplicates = function(data, key) {
    var arr = [];
    var results = [data[1][key]];

    for (var i = 0; i < data.length; i++) {
        arr.push(data[i][key])
    }

    for (var j = 0; j < arr.length; j++) {
        if (results.indexOf(arr[j]) == -1) {
            results.push(arr[j])
        }
    }

    return results;
};