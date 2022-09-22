
// 사전에 필요한 패키지
// 필요한 항목 : 체감온도 데이터(구현 완료) + 앞으로의 3시간의 데이터(구현 완료)
// 7~12 까지의 데이터 추출 필요함

// 사전에 필요한 패키지
var request = require('request');
var convert = require('xml-js');
var fs = require('fs');

const date = new Date();

var year = date.getFullYear();
var month = ('0' + (date.getMonth() + 1)).replace(-2);
var days = date.getDate();
var hours = date.getHours();
let existableHoursarray = new Array();

// 현재의 정확한 시간 데이터를 반환하는 함수
function convertHours(tmphour) {
    if (tmphour === 24 || tmphour === 25 || tmphour === 26) {
        switch (tmphour) {
            case 24:
                return "00";
            case 25:
                return "01";
            case 26:
                return "02";
        }
    }
    else if (tmphour < 10) return "0" + "" + tmphour;
    else return tmphour;
}

// 현재 데이터 + 앞으로의 3시간에 대한 데이터를 추출하기 위한 시간 데이터 배열 정의
existableHoursarray[0] = year + "" + month + "" + days + "" + convertHours(hours) + "" + "00";
existableHoursarray[1] = year + "" + month + "" + days + "" + convertHours(hours + 1) + "" + "00";
existableHoursarray[2] = year + "" + month + "" + days + "" + convertHours(hours + 2) + "" + "00";
existableHoursarray[3] = year + "" + month + "" + days + "" + convertHours(hours + 3) + "" + "00";


for(var i=0; i<existableHoursarray.length; i++) {
    console.log(existableHoursarray[i]);
}
var url = 'http://apis.data.go.kr/3160000/guroPointFocInfoSvc/getGuro10PointFocInfoSvc';
var queryParams = '?' + encodeURIComponent('serviceKey') + '=XXsK%2F1XwVTPaVFfkrpoBQapqSlNiziqMMJJRcS549BH3B2gH1ph4mkRwBJgDbI20uZDnt9SiLbsVlFT5%2FAHCBQ%3D%3D'; /* Service Key*/
queryParams += '&' + encodeURIComponent('returnType') + '=' + encodeURIComponent('xml'); /* */
queryParams += '&' + encodeURIComponent('numOfRows') + '=' + encodeURIComponent('1000'); /* */
queryParams += '&' + encodeURIComponent('pageNo') + '=' + encodeURIComponent('1'); /* */


request.get(url + queryParams, (err, res, body) => {
    if (err) {
        console.log(`err => ${err}`)
    }
    else {
        if (res.statusCode == 200) {

            var result = body
            // console.log(`body data => ${result}`) // 사전에 전체 데이터를 출력
            var selectedData = JSON.parse(convert.xml2json(result, { compact: true, spaces: 4 }));
            var a = "[";
            var tmpData = selectedData.response.body.items.item;
            for (let i = 0; i < tmpData.length; i++) {
                if ((tmpData[i]['localCode']._text === "GURO_F08")
                    && (tmpData[i]['fcsDate']._text === existableHoursarray[0] || tmpData[i]['fcsDate']._text === existableHoursarray[1] || tmpData[i]['fcsDate']._text === existableHoursarray[2] || tmpData[i]['fcsDate']._text === existableHoursarray[3])) { // 회대 지역의 날씨 데이터가 맞다면

                    a += JSON.stringify(tmpData[i]); a += ",";  // 회대 지역(GURO_F08)의 내용만 추출하여 json 파일에 저장함

                }
            }
            a = a.substring(0, a.length - 1); // json 구조의 규칙에 맞게끔 마지막 데이터의 ',' 문자 제거 처리
            a += "]"; // 데이터 추가 전의 '[' 기호에 알맞게 대응되도록 ']' 기호 추가
            fs.writeFileSync("./back-part_2/modified.json", a); // 저장되는 데이터는 1시간 간격으로 업데이트 처리됨
        }
    }
})