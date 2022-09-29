//express 모듈 불러오기
var webapp = require('./routes/index');
var db = require('./database/connect/maria');
var http = require('http');
var express = require("express");
// mariaDB에 접속하여 데이터 저장할 구조 구축하기

express = express();







var app = http.createServer(function(req,res){

    db.query(function(error, result){
        // 커넥션.query 메소드를 호출해서(첫번째인자는 SQL문을주고, 두번째 인자로 콜백함수를 줌).
        // 첫번째 인자 쿼리가 실행되고 나서 두번째 콜백함수가 실행됨(에러가발생했으면 임의변수 error에 에러값 할당, 접속결과 성공시 결과값 임의변수 topics에 할당)
        console.log(result)
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
    });

})
app.listen(3030, () => console.log("연결완료: 3030"));

/* --------- 여기까지 db 처리용 테스트 코드 입니다. --------- */

/* --------- 여기서부터는 rest api 테스트 코드 입니다. --------- */


// router.get('/', function(req, res, next) {
//     res.render('index', { title: 'Express' });
// });
//
// router.get('/create', function(req, res) {
//     maria.query('CREATE TABLE SaveGoodData ('
//         +'DEPART_CODE INT(11) NOT NULL,'
//         +'NAME VARCHAR(200) NULL DEFAULT NULL COLLATE utf8mb3_general_ci,'
//         +'PRIMARY KEY (DEPART_CODE) USING BTREE)', function(err, rows, fields) {
//         if(!err) {
//             res.send(rows); // responses send rows
//         } else {
//             console.log("err : " + err);
//             res.send(err);  // response send err
//         }
//     });
// });
//
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
//
// router.get('/insert', function(req, res) {
//     maria.query('INSERT INTO DEPARTMENT(DEPART_CODE,NAME) VALUES(5001,"ENGLISH")', function(err, rows, fields) {
//         if(!err) {
//             res.send(rows); // responses send rows
//         } else {
//             console.log("err : " + err);
//             res.send(err);  // response send err
//         }
//     });
// });
//
// router.get('/select', function(req, res) {
//     maria.query('SELECT * FROM DEPARTMENT', function(err, rows, fields) {
//         if(!err) {
//             res.send(rows); // responses send rows
//         } else {
//             console.log("err : " + err);
//             res.send(err);  // response send err
//         }
//     });
// });
//
// router.get('/update', function(req, res) {
//     maria.query('UPDATE DEPARTMENT SET NAME="UPD ENG" WHERE DEPART_CODE=5001', function(err, rows, fields) {
//         if(!err) {
//             res.send(rows); // responses send rows
//         } else {
//             console.log("err : " + err);
//             res.send(err);  // response send err
//         }
//     });
// });
//
// router.get('/delete', function(req, res) {
//     maria.query('DELETE FROM DEPARTMENT WHERE DEPART_CODE=5001', function(err, rows, fields) {
//         if(!err) {
//             res.send(rows); // responses send rows
//         } else {
//             console.log("err : " + err);
//             res.send(err);  // response send err
//         }
//     });
// });
//
// module.exports = router;
/* --------- 여기까지 rest api 테스트 코드 입니다. --------- */


/* ------ 여기서부터는 http 통신을 위한 본격적인 원본 코드입니다. ------ */

// // 데이터
// const weatherData = fs.readFileSync("./back-part_2/modified.json", 'utf-8');
//
//
// /**
//  * 파라미터 변수 뜻
//  * req : request 요청
//  * res : response 응답
//  */
//
// /**
//  * @path {GET} http://localhost:3000/
//  * @description 요청 데이터 값이 없고 반환 값이 있는 GET Method
//  */
//  app.get("/", (req, res) => {
//
//     // Hello World 데이터만 반환(test)
//     res.send("Hello world!");
// });
//
// /**
//  * @path {GET} http://localhost:3000/api/weatherdata/
//  * @description 요청 데이터 값이 없고 반환 값이 있는 GET Method
//  */
// app.get("/api/weatherdata", (req, res) => {
//
//     // 데이터 반환
//     res.json({ok: true, weatherData: weatherData});
// })
//
// /**
//  * @path {GET} http://localhost:3000/api/users/userBody
//  * @description Body 요청 데이터 값이 있고 반환 값이 있는 GET Method
//  *
//  *  post로 요청시 body에 데이터를 담아서 보낼수 있듯이 get도 사용이 가능하다.
//  */
// app.get("/weather", (req, res) => {
//
//     const item = req.body.items.item;
//
//     //filter라는 함수는 자바스크립트에서 배열 함수이다. 필터링을 할때 많이 사용된다 필터링한 데이터를 새로운 배열로 반환한다.
//     const data = weatherData.filter(item[0]._text == "GURO_F08");
//
//     res.json({ok: false, user: data})
// })
//
//
//
// /**
//  * @path {GET} http://localhost:3000/api/users/:user_id
//  * @description Path Variables 요청 데이터 값이 있고 반환 값이 있는 GET Method
//  *
//  *  Path Variables 방식
//  *
//  *  ex) 아래 GET 주소 에서 :user_id 는 서버에서 설정한 주소 키 값이다.
//  *      값을 찾을 때는 req.params.user_id 로 값을 찾는다.
//  *
//  *  *주의 사항*
//  *  :user_id 이 부분은 변수이기 때문에
//  *  경로가 /users/1 이거나 /users/2 이거 일때 둘다 라우터를 거치게 된다.
//  *  그렇기 때문에 다른 라우터 보다 아래 있어야 한다.
//  */
// app.get("/weather", (req, res) => {
//
//     const user_id = req.params.user_id
//
//     //filter라는 함수는 자바스크립트에서 배열 함수이다. 필터링을 할때 많이 사용된다 필터링한 데이터를 새로운 배열로 반환한다.
//     const user = weaterData.filter(data => data.id == user_id);
//
//     res.json({ok: true, user: user})
// })
//
// /**
//  * @path {POST} http://localhost:3000/api/users/add
//  * @description POST Method
//  *
//  *  POST 데이터를 생성할 때 사용된다.
//  *  req.body에 데이터를 담아서 보통 보낸다.
//  */
// app.post("/weather", (req, res) => {
//
//     // 구조분해를 통해 id 와 name을 추출
//     const { id, name } = req.body
//
//     //concat 함수는 자바스크립트에서 배열 함수이다. 새로운 데이터를 추가하면 새로운 배열로 반환한다.
//     const user = users.concat({id, name});
//
//     res.json({ok: true, users: user})
// })
//
// /**
//  * @path {PUT} http://localhost:3000/api/users/update
//  * @description 전체 데이터를 수정할 때 사용되는 Method
//  */
// app.put("/weather", (req, res) => {
//
//     // 구조분해를 통해 id 와 name을 추출
//     const { id, name } = req.body
//
//     //map 함수는 자바스크립트에서 배열 함수이다. 요소를 일괄적으로 변경할 때 사용됩니다.
//     const user = users.map(data => {
//
//         if(data.id == id) data.name = name
//
//         return {
//             id: data.id,
//             name: data.name
//         }
//     })
//
//     res.json({ok: true, users: user})
// })
//
// /**
//  * @path {PATCH} http://localhost:3000/api/user/update/:user_id
//  * @description 단일 데이터를 수정할 때 사용되는 Method
//  */
// app.patch("/weather", (req, res) => {
//
//     const { user_id} = req.params
//     const { name } = req.body
//
//     //map 함수는 자바스크립트에서 배열 함수이다. 요소를 일괄적으로 변경할 때 사용됩니다.
//     const user = users.map(data => {
//
//         if(data.id == user_id) data.name = name
//
//         return {
//             id: data.id,
//             name: data.name
//         }
//     })
//
//     res.json({ok: true, users: user})
// })
//
// /**
//  * @path {DELETE} http://localhost:3000/api/user/delete
//  * @description 데이터 삭제
//  *
//  */
// app.delete("/weather", (req, res) => {
//
//     const user_id = req.query.user_id
//
//     //filter라는 함수는 자바스크립트에서 배열 함수이다. 필터링을 할때 많이 사용된다 필터링한 데이터를 새로운 배열로 반환한다.
//     const user = users.filter(data => data.id != user_id );
//
//     res.json({ok: true, users: user})
// })

// http listen port 생성 서버 실행
// app.listen(3000, () => console.log("연결 완료(localhost:3000)."));
// localhost kill할 경우 : kill -9 $(lsof -ti:3000) 입력하기

/* ------ 여기까지 http 통신을 위한 본격적인 원본 코드입니다. ------ */