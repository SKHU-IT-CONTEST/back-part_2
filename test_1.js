// var request = require('request');
// var fs = require('fs')
// var url = 'http://apis.data.go.kr/3160000/guroPointFocInfoSvc/getGuro10PointFocInfoSvc';
// var queryParams = '?' + encodeURIComponent('serviceKey') + '=XXsK%2F1XwVTPaVFfkrpoBQapqSlNiziqMMJJRcS549BH3B2gH1ph4mkRwBJgDbI20uZDnt9SiLbsVlFT5%2FAHCBQ%3D%3D'; /* Service Key*/
// queryParams += '&' + encodeURIComponent('returnType') + '=' + encodeURIComponent('xml'); /* */
// queryParams += '&' + encodeURIComponent('numOfRows') + '=' + encodeURIComponent('10'); /* */
// queryParams += '&' + encodeURIComponent('pageNo') + '=' + encodeURIComponent('1'); /* */

// request({
//     url: url + queryParams,
//     method: 'GET'
// }, function (error, response, body) {
//     console.log('Status', response.statusCode);
//     console.log('Headers', JSON.stringify(response.headers));
//     console.log('Reponse received', body);
    
//     // console.log(JSON.stringify(headers))
//     // console.log(JSON.stringify(bodies))
// });

// 상수값 정의
const ServiceKey = 'XXsK%2F1XwVTPaVFfkrpoBQapqSlNiziqMMJJRcS549BH3B2gH1ph4mkRwBJgDbI20uZDnt9SiLbsVlFT5%2FAHCBQ%3D%3D'
const numOfRows = 10;
const pageNo = 1;

// module
let request = require('request');

var url = 'http://apis.data.go.kr/3160000/guroPointFocInfoSvc/getGuro10PointFocInfoSvc'; 
var queryParams = '?' + encodeURIComponent('serviceKey') + '=' + encodeURIComponent(ServiceKey); /* Service Key */
queryParams += '&' + encodeURIComponent('returnType') + '=' + encodeURIComponent('xml'); /* */
queryParams += '&' + encodeURIComponent('numOfRows') + '=' + encodeURIComponent(numOfRows); /* */
queryParams += '&' + encodeURIComponent('pageNo') + '=' + encodeURIComponent(pageNo); /* */

let options = {
    method: 'GET',
    url: url + queryParams
};

request(options, function(error, response, body) {
    if(error) {
        throw new Error(error);
    }
    let info = JSON.parse(body);

    // test block
    for(i in info['response']['body']['items']['item']) {
        console.log('발표일시:' + info['response']['body']['items']['item'][i]['baseDate'])
    }

    console.log('Status', response.statusCode);
    console.log('Headers', JSON.stringify(response.headers));
    console.log('Reponse received', body);
})
