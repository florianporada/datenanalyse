/**
 * Created by florianporada on 07.04.16.
 */
var fs = require('fs');

var path = 'Liste_PPN-ExNr_HSHN-libre.csv';
var path2 = 'test.csv';
var dataSet = [];
var file = fs.createWriteStream('result.txt');

fs.readFile(path2, 'utf8', function (err,data) {
    if (err) {
        return console.log(err);
    }
    var lines = data.match(/[^\r\n]+/g);

    for (var i = 1; i < lines.length; i++) {
        dataSet.push({
            ppn: parsePPN(lines[i]),
            recordNr: parseRecordNr(lines[i]),
            signature: parseSignature(lines[i]),
            barcode: parseBarcode(lines[i]),
            seal: parseSeal(lines[i])
        });
    }

    file.write(JSON.stringify(getUniques(dataSet, 'ppn'), 0 , 2));
    // console.log(getDuplicates(dataSet, 'ppn'));
});

var parsePPN = function(line) {
    if (line === undefined || line === null) {
        return 'missing line';
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

    return line.split(',')[1];
};

var parseSignature = function(line) {
    if (line === undefined || line === null) {
        return
    }

    var split = line.split(',');
    
    line = line.replace(split[0] + ',', '').replace(split[1] + ',', '').replace(split[split.length - 2] + ',', '').replace(split[split.length -1], '');
    line = line.slice(0, -1);

    return line;
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

    return line.split(',')[line.split(',').length - 1];
};

var getUniques = function(data, key) {
    var results = [];

    for (var j = 0; j < data.length; j++) {
        if (results.indexOf(data[j][key]) == -1) {
            var tmp = {};
            tmp[key] = data[j][key];
            results.push(tmp);
        }
    }

    return results;
};

var getStatistics = function(data, key) {
    var compare = getUniques(data, key);
    var result = [];
    var sortable = [];

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