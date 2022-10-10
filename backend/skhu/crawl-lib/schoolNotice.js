const superagent = require('superagent');
const cheerio = require('superagent-cheerio');

class schoolNotice
{
    constructor(){
        this.data = {};
        this.date = null;
    }

    async #loadDate()
    {
        if(this.date == null || new Date() - this.date >= 600000)
        {
            this.date = new Date();
            return true;
        }
        else
            return false;
        
        
    }

    async #updateData() {
        await this.#loadDate().then(res => {if(!res) return this.data; });
        let ret = await superagent
            .post("https://lms.skhu.ac.kr/ilos/community/notice_list.acl")
            .set('User-Agent', "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/104.0.5112.102 Safari/537.36 Edg/104.0.1293.70")
            .set('Host', "lms.skhu.ac.kr")
            .set('Origin', "https://lms.skhu.ac.kr")
            .set('Referer', "https://lms.skhu.ac.kr/ilos/community/notice_list_form.acl")
            .send({"SCH_KEY": "T",
            "SCH_TARGET":"",
            "SCH_VALUE" : "",
            "start": "1",
            "encoding": "utf-8" })
            .use(cheerio());

            let i;
            for(i = 0; i < 3; i++){
                var tmp= new Object();
                tmp["num"] = Number(ret.$(`body > table > tbody > tr:nth-child(${(i+1).toString()}) > td.left > a.site-link`).attr('href').split("ARTL_NUM=")[1].split("&")[0]);
                tmp["title"] = ret.$(`body > table > tbody > tr:nth-child(${(i+1).toString()}) > td.left > a.site-link`).text() ;
                this.data[i] = tmp;
            }

            i = 0;
            let tmp_i = 1;
            while(i < 5){
                var tmp={};
                if(ret.$(`body > table > tbody > tr:nth-child(${tmp_i}) > td:nth-child(1)`).text().trim().length < 1){
                    tmp_i++;
                    continue;
                }
    
                tmp["num"] = Number(ret.$(`body > table > tbody > tr:nth-child(${(tmp_i).toString()}) > td.left > a.site-link`).attr('href').split("ARTL_NUM=")[1].split("&")[0]);
                tmp["title"] = ret.$(`body > table > tbody > tr:nth-child(${(tmp_i).toString()}) > td.left > a.site-link`).text() ;
                this.data[i+3] = tmp;
                tmp_i++;
                i++;
            }
            return this.data;
        }

        async getData(){
            return await this.#updateData();
        }
}

module.exports = schoolNotice;
