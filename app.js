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
    var ids = [];
    var result = [];

    for (var i = 0; i < lines.length; i++) {
        var id = lines[i].split(',')[0];
        if (id.length > 3) {
            ids.push({
                id: lines[i].split(',')[0],
                line: i
            });
            console.log(lines[i].split(','));
        }
    }

    console.log(lines.length);
    console.log(ids.length);
    console.log(result);
});