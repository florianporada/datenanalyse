/**
 * Created by florianporada on 07.04.16.
 */
fs = require('fs');


var path = 'Liste_PPN-ExNr_HSHN-libre.csv';
var path2 = 'test.csv';
var dataSet = [];

fs.readFile(path2, 'utf8', function (err,data) {
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
    console.log(getDuplicates(dataSet, 'ppn'));
    console.log(getStatistics(dataSet, 'ppn'));
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
    var results = [data[0][key]];

    for (var j = 0; j < data.length; j++) {
        if (results.indexOf(data[j][key]) == -1) {
            results.push(data[j][key])
        }
    }

    return results;
};

var getStatistics = function(data, key) {
    var compare = getDuplicates(data, key);
    var result = [];

    for (var i = 0; i < compare.length; i++) {
        result[compare[i]] = '';
    }

    for (var j = 0; j < compare.length; j++) {
        var count = 0;
        for (var k = 0; k < data.length; k++) {
            if (data[k][key] == compare[j]) {
                count++
            }
        }

        result[compare[j]] = count;
    }

    return result;
};