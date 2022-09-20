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
queryParams += '&' + encodeURIComponent('pageNo') + '=' + encodeURIComponent('10'); /* */


request.get(url + queryParams, (err, res, body) => {
    if(err) {
        console.log(`err => ${err}`)
    }
    else {
        if(res.statusCode == 200) {

            
            var result = body
            console.log(`body data => ${result}`) // 사전에 전체 데이터를 출력
            var selectedData = JSON.parse(convert.xml2json(result, {compact: true, spaces: 4}));
            var a = "";
            var tmpData = selectedData.response.body.items.item;
            for(let i=0; i<tmpData.length; i++) {
                if((tmpData[i]['localCode']._text === "GURO_F08")) { // 회대 지역의 날씨 데이터가 맞다면

                    a = a + JSON.stringify(tmpData[i]); // 회대 지역(GURO_F08)의 내용만 추출하여 json 파일에 저장함
                    
                }
            }
            fs.writeFileSync("./back-part_2/modified.json", a); // 저장되는 데이터는 1시간 간격으로 업데이트 처리됨
        }
        
        
        // fs.writeFileSync('/Users/hwangjaehyeon/my-json-server/db.json', xmlToJson); // 개인용 임시서버 활용을 위한 저장용 코드
    }
})
