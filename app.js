/**
 * Created by florianporada on 07.04.16.
 */
fs = require('fs');


var path = 'Liste_PPN-ExNr_HSHN-libre.csv';


fs.readFile(path, 'utf8', function (err,data) {
    if (err) {
        return console.log(err);
    }
    var lines = data.split('\n');
    var dataSet = [];

    for (var i = 0; i < lines.length; i++) {
        var id = lines[i].split(',')[0];
        if (id.length > 3) {
            dataSet.push({
                id: checkPPN(lines[i].split(',')[0]),
                line: i
            });
        }
    }

    console.log(lines.length);
    console.log(dataSet);
});


var checkPPN = function(ppn) {
    if (ppn === undefined || ppn === null) {
        return 
    }

    ppn = ppn.toString();
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