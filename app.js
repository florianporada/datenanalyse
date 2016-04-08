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
            ppn: getPPN(lines[i]),
            recordNr: getRecordNr(lines[i]),
            signature: '',
            barcode: '',
            seal: ''
        });
    }

    console.log(dataSet);
});

var getPPN = function(line) {
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

var getRecordNr = function(line) {
    if (line === undefined || line === null) {
        return
    }

    var prefix = line.split(',')[0];
    line = line.replace(prefix + ',', '');

    return line.split(' ')[0];
};