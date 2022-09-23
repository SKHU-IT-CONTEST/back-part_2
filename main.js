
// 사전에 필요한 패키지
// 필요한 항목 : 체감온도 데이터(구현 완료) + 앞으로의 3시간의 데이터(구현 완료)
// 7~12 까지의 데이터 추출 필요함

// 사전에 필요한 패키지
var request = require('request');
var convert = require('xml-js');
var fs = require('fs');
var moment = require('moment'); 

var nowDate = moment().format('YYYYMMDDHH00');
var oneHoursLaterDate = moment().add(1, 'h').format('YYYYMMDDHH00');
var twoHoursLaterDate = moment().add(2, 'h').format('YYYYMMDDHH00');
var threeHoursLaterDate = moment().add(3, 'h').format('YYYYMMDDHH00');

// 현재 데이터 + 앞으로의 3시간에 대한 데이터를 추출하기 위한 시간 데이터 배열 정의
var existableHoursarray = [];
existableHoursarray[0] = nowDate;
existableHoursarray[1] = oneHoursLaterDate;
existableHoursarray[2] = twoHoursLaterDate;
existableHoursarray[3] = threeHoursLaterDate;

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
            var a = "{" +  "\"" + "data" + "\"" + ":" + "[" + "{" + "\"" + "3hoursLater" + "\"" +  ":";
            var tmpData = selectedData.response.body.items.item;
            for (let i = 0; i < tmpData.length; i++) {
                if ((tmpData[i]['localCode']._text === "GURO_F08")
                    && (tmpData[i]['fcsDate']._text === existableHoursarray[0])) {
                        a +="," + "\"" + "nowWeather" + "\"" +  ":";a += JSON.stringify(tmpData[i]); 
                    } 
                if((tmpData[i]['localCode']._text === "GURO_F08")
                && (tmpData[i]['fcsDate']._text === existableHoursarray[1])) {
                
                    a += "," + "\"" + "1hoursLater" + "\"" +  ":";a += JSON.stringify(tmpData[i]); // 회대 지역(GURO_F08)의 내용만 추출하여 json 파일에 저장함
                }
                if((tmpData[i]['localCode']._text === "GURO_F08")
                && (tmpData[i]['fcsDate']._text === existableHoursarray[2])) {
                    a += "," + "\"" + "2hoursLater" + "\"" +  ":"; a += JSON.stringify(tmpData[i]);  
                }
                if((tmpData[i]['localCode']._text === "GURO_F08")
                && (tmpData[i]['fcsDate']._text === existableHoursarray[3])) {
                    a += JSON.stringify(tmpData[i]);   
                }
            }
            a += "} ] }"; // 데이터 추가 전의 "{ [ {" 기호에 알맞게 대응되도록 "} ] }" 기호 추가
            
            fs.writeFileSync("./back-part_2/modified.json", a); // 저장되는 데이터는 1시간 간격으로 업데이트 처리됨
        }
    }
})