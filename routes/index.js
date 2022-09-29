var express = require('express');
var router = express.Router();
var http = require('http');
// require maria.js
const db = require("../database/connect/maria");



var main = http.createServer(function(req,res){
    /* GET home page. */
    router.get('/', function(req, res, next) {
        res.render('index', { title: 'Express' });
    });

    router.post('/create', function(req, res) {
        db.query('CREATE TABLE comment ('
            +'commentIdx int auto_increment primary key,'
            +'commentContents varchar(25) null,'
            +'constraint commentIdx\n' +
            'unique (commentIdx)'
            + ');', function(err, rows, fields) {
            if(!err) {
                res.send(rows); // responses send rows
            } else {
                console.log("err : " + err);
                res.send(err);  // response send err
            }
        });
        db.query('CREATE TABLE heart ('
            +'heartIdx int auto_increment\n' +
            'primary key,'
            +'heartNum int null,'
            +'constraint heartIdx\n' +
            'unique (heartIdx)'
            + ');', function(err, rows, fields) {
            if(!err) {
                res.send(rows); // responses send rows
            } else {
                console.log("err : " + err);
                res.send(err);  // response send err
            }
        });
        db.query('CREATE TABLE app ('
            +'appIdx int auto_increment primary key,'
            +'commentContents varchar(25)  not null,'
            +'heartIdx int not null,'
            + 'commentIdx int not null,'
            + 'timestamp datetime not null,'
            + 'ipAddress varchar(30) not null,'
            + 'httpCookie varchar(100) not null,'
            + 'constraint app_comment_null_fk foreign key (commentIdx) references comment (commentIdx),'
            + 'constraint app_heart_null_fk foreign key (heartIdx) references heart (heartIdx)'
            + ');', function(err, rows, fields) {
            if(!err) {
                res.send(rows); // responses send rows
            } else {
                console.log("err : " + err);
                res.send(err);  // response send err
            }
        });
    });

// router.get('/drop', function(req, res) {
//     maria.query('DROP TABLE DEPARTMENT', function(err, rows, fields) {
//         if(!err) {
//             res.send(rows); // responses send rows
//         } else {
//             console.log("err : " + err);
//             res.send(err);  // response send err
//         }
//     });
// });

    router.put('/insert', function(req, res) {
        db.query('INSERT INTO app(appIdx, httpCookie, timestamp, ipAddress, heartNum, commentContents, heartIdx, commentIdx) VALUES(1, \'test\', 20010213, \'1000\', 10, \'test_hello\', default, default);', function(err, rows, fields) {
            if(!err) {
                res.send(rows); // responses send rows
            } else {
                console.log("err : " + err);
                res.send(err);  // response send err
            }
        });
    });

    router.get('/select', function(req, res) {
        db.query('SELECT * FROM app', function(err, rows, fields) {
            if(!err) {
                res.send(rows); // responses send rows
            } else {
                console.log("err : " + err);
                res.send(err);  // response send err
            }
        });
    });
    var html =   // 변수 html에 아래 html 코드를 입력
        `
    <!doctype html>
      <html>
      <head>
        <title>nodejs - mysql </title>
        <meta charset="utf-8">
      </head>
      <body>
        nodejs - mysql
      </body>
      </html>
    `

    res.writeHead(200);  // 응답: 상태 성공(200)
    res.end(html); // 웹에 띄워줄 내용 (html변수)

})
main.listen(3030, () => console.log("연결완료: 3030"));
// router.put('/update', function(req, res) {
//     db.query('UPDATE DEPARTMENT SET NAME="UPD ENG" WHERE DEPART_CODE=5001', function(err, rows, fields) {
//         if(!err) {
//             res.send(rows); // responses send rows
//         } else {
//             console.log("err : " + err);
//             res.send(err);  // response send err
//         }
//     });
// });

// router.delete('/delete', function(req, res) {
//     db.query('DELETE FROM DEPARTMENT WHERE DEPART_CODE=5001', function(err, rows, fields) {
//         if(!err) {
//             res.send(rows); // responses send rows
//         } else {
//             console.log("err : " + err);
//             res.send(err);  // response send err
//         }
//     });
// });
