// mariaDB에 접속하여 데이터 저장할 구조 구축하기
var maria= require('mysql');
var db = maria.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '1234',
    database: 'weatherDBTest'
});

module.exports = db;