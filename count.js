var fs = require('fs');
let click_1 = document.querySelector(".click_1");
let click_2 = document.querySelector(".click_2");
let click_3 = document.querySelector(".click_3");
let click_4 = document.querySelector(".click_4");
let click_5 = document.querySelector(".click_5");
let click_6 = document.querySelector(".click_6");


var countArray = [];
var count1 = document.getElementById("jebo_1");
countArray.push(count1);
var count2 = document.getElementById("jebo_2");
countArray.push(count2);
var count3 = document.getElementById("jebo_3");
countArray.push(count3);
var count4 = document.getElementById("jebo_4");
countArray.push(count4);
var count5 = document.getElementById("jebo_5");
countArray.push(count5);
var count6 = document.getElementById("jebo_6");
countArray.push(count6);


//
// function ii() {
//     var tmpdata = fs.readFileSync("test.json");
//     alert(tmpdata);
//
// }


async function ii() {
    showConsole();
    var data = {
        id1: 0,
        id2: 0,
        id3: 0,
        id4: 0,
        id5: 0,
        id6: 0,
    };
    for (let i = 0; i < data.length; i++) {
        countArray[i].addEventListener("click", function () {
            if (click_1.onclick === true) {
                let tmp = (data.id1)++;
                 delete data.id1;
                 data.id1 = tmp;
                fs.writeFileSync("test.json", JSON.stringify(data));
            } else if (click_2.onclick === true) {
                let tmp = (data.id2)++;
                alert("완료");
                fs.writeFileSync("test.json", JSON.stringify(tmp));
            } else if (click_3.onclick === true) {
                let tmp = (data.id3)++;
                fs.writeFileSync("test.json", JSON.stringify(tmp));
            } else if (click_4.onclick === true) {
                let tmp = (data.id4)++;
                fs.writeFileSync("test.json", JSON.stringify(tmp));
            } else if (click_5.onclick === true) {
                let tmp = (data.id5)++;
                fs.writeFileSync("test.json", JSON.stringify(tmp));


            } else if (click_6.onclick === true) {
                let tmp = (data.id6)++;
                fs.writeFileSync("test.json", JSON.stringify(tmp));
            }

        });

    }

    function showConsole() {
        alert("hello");
    }
}
