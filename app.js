/**
 * Created by florianporada on 07.04.16.
 */
fs = require('fs');


var path = 'Liste_PPN-ExNr_HSHN-libre.csv';
var dataSet = [];

fs.readFile(path, 'utf8', function (err,data) {
    if (err) {
        return console.log(err);
    }
    var lines = data.split('\n');

    for (var i = 0; i < lines.length; i++) {
        dataSet.push({
            ppn: parsePPN(lines[i]),
            recordNr: parseRecordNr(lines[i]),
            signature: parseSignature(lines[i]),
            barcode: parseBarcode(lines[i]),
            seal: parseSeal(lines[i])
        });
    }

    console.log(dataSet);
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
    line = line.replace(line.split(' ')[0] + ' ', '');

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