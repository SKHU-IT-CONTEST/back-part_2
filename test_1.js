// 필요한 항목 : 체감온도 데이터 + 앞으로의 3시간의 데이터

/* NodeJs 12 샘플 코드 */


var request = require('request');
var convert = require('xml-js');
var fs = require('fs');

var url = 'http://apis.data.go.kr/3160000/guroPointFocInfoSvc/getGuro10PointFocInfoSvc';
var queryParams = '?' + encodeURIComponent('serviceKey') + '=XXsK%2F1XwVTPaVFfkrpoBQapqSlNiziqMMJJRcS549BH3B2gH1ph4mkRwBJgDbI20uZDnt9SiLbsVlFT5%2FAHCBQ%3D%3D'; /* Service Key*/
queryParams += '&' + encodeURIComponent('returnType') + '=' + encodeURIComponent('xml'); /* */
queryParams += '&' + encodeURIComponent('numOfRows') + '=' + encodeURIComponent('10'); /* */
queryParams += '&' + encodeURIComponent('pageNo') + '=' + encodeURIComponent('1'); /* */

request.get(url + queryParams, (err, res, body) => {
    if(err) {
        console.log(`err => ${err}`)
    }
    else {
        if(res.statusCode == 200) {
            var result = body
            console.log(`body data => ${result}`)
            var xmlToJson = convert.xml2json(result, {compact: true, spaces: 4});
            console.log(`xml to json => ${xmlToJson}`)
        }
        fs.writeFileSync('example.json', xmlToJson);
    }
})


// request({
//     url: url + queryParams,
//     method: 'GET'
// }, function (error, response, body) {
//     const a = JSON.stringify(response.statusCode);
//     const b = JSON.stringify(response.headers);
//     const c = JSON.stringify(body);
//     console.log('Status', response.statusCode);
//     console.log('Headers', JSON.stringify(response.headers));
//     console.log('Reponse received', body);
//     fs.writeFileSync('example1.json', a + b + c);
//     // var json = convert.xml2json(body, {compact: true, spaces: 4});
//     // var data = JSON.parse(json).response.body.items.item;
//     // var localCode = data['localCode']._text;
//     // var humi = data['humi']._text;
//     // var rain = data['rain']._text;
//     // console.log('localcode: ', localCode);
//     // console.log('humi: ', humi);
//     // console.log('rain: ', rain);
// });