// 필요한 항목 : 체감온도 데이터 + 앞으로의 3시간의 데이터
// 7~12 까지의 데이터 추출 필요함

// 사전에 필요한 패키지
var request = require('request');
var convert = require('xml-js');

var fs = require('fs');


var url = 'http://apis.data.go.kr/3160000/guroPointFocInfoSvc/getGuro10PointFocInfoSvc';
var queryParams = '?' + encodeURIComponent('serviceKey') + '=XXsK%2F1XwVTPaVFfkrpoBQapqSlNiziqMMJJRcS549BH3B2gH1ph4mkRwBJgDbI20uZDnt9SiLbsVlFT5%2FAHCBQ%3D%3D'; /* Service Key*/
queryParams += '&' + encodeURIComponent('returnType') + '=' + encodeURIComponent('xml'); /* */
queryParams += '&' + encodeURIComponent('numOfRows') + '=' + encodeURIComponent('100'); /* */
queryParams += '&' + encodeURIComponent('pageNo') + '=' + encodeURIComponent('4'); /* */


request.get(url + queryParams, (err, res, body) => {
    if(err) {
        console.log(`err => ${err}`)
    }
    else {
        if(res.statusCode == 200) {

            var result = body
            console.log(`body data => ${result}`)
            var xmlToJson = convert.xml2json(result, {compact: true, spaces: 4});
            console.log(xmlToJson);

        }
        fs.writeFileSync('./back-part_2/modified.json', xmlToJson); // 저장되는 데이터는 1시간 간격으로 업데이트 처리됨
        // fs.writeFileSync('/Users/hwangjaehyeon/my-json-server/db.json', xmlToJson); // 개인용 임시서버 활용을 위한 저장용 코드
    }
})
