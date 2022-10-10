const superagent = require('superagent');
const dataName = ["T1H", "RN1", "REH", "SKY", "PTY"];

class Weather{

    constructor(){
        this.data = new Object();
        this.date = null;
    }

    async #loadDate(){
        if(this.date == null || new Date() - this.date < 600000)
            return false;
        
        this.date = new Date();
        return true;
    }

    async #updateData(){
        await this.#loadDate().then(res => {if(!res) return this.data; });
        let date = new Date();
        let yyyy = String(date.getFullYear());
        let mm = 1 + date.getMonth() > 9 ? 1 + date.getMonth() : "0" + (1 + date.getMonth());
        let dd = date.getDate() > 9 ? date.getDate() : "0" + date.getDate();
        let hhmm = date.getHours()-1 > 9 ? (date.getHours()-1) + "30" : (date.getHours()-1 < 0 ? "2330" : "0" + (date.getHours()-1) + "30"); 
        let queryParams = '?' + encodeURIComponent('serviceKey') + '='+'HjiD4JethBZ2g7D8NH8CTR5qMFVVpkYiD%2FAT%2BZmtcSs%2BVHI5qsO8zetHJEaLTaWXP3f%2BH%2Bzrtr5vLpvc8RZmvw%3D%3D';
        queryParams += '&' + encodeURIComponent('pageNo') + '=' + encodeURIComponent('1'); /**/
        queryParams += '&' + encodeURIComponent('numOfRows') + '=' + encodeURIComponent('1000'); /**/
        queryParams += '&' + encodeURIComponent('dataType') + '=' + encodeURIComponent('JSON'); /**/
        queryParams += '&' + encodeURIComponent('base_date') + '=' + encodeURIComponent((yyyy+mm)+dd); /**/
        queryParams += '&' + encodeURIComponent('base_time') + '=' + encodeURIComponent(hhmm); /**/
        queryParams += '&' + encodeURIComponent('nx') + '=' + encodeURIComponent('57'); /**/
        queryParams += '&' + encodeURIComponent('ny') + '=' + encodeURIComponent('125'); /**/

        await superagent
            .get("http://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getUltraSrtFcst"+queryParams)
            .then(res => {
                this.data = new Object();// 초기화 안하면... 11시가 되어도 10시가 남으면서 계속 적재당함. => 메모리 낭비
                JSON.parse(res["text"])["response"]["body"]["items"]["item"].forEach(element => {
                    if(this.data[element["fcstDate"] +"."+ element["fcstTime"]] == undefined)
                        this.data[element["fcstDate"] +"."+ element["fcstTime"]] = new Object();
                    if(dataName.includes(element["category"]))
                        this.data[element["fcstDate"] +"."+ element["fcstTime"]][element["category"]] = element["fcstValue"];
                });
            });
        return this.data;
    }

    async getData(){
        return await this.#updateData();
    }

}

module.exports = Weather;
