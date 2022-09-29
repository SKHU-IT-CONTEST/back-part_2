const maria = require('mysql2/promise');

const conn = maria.createConnection({
    host:'localhost',
    port:3306,
    user:'root',
    password:'1234',
    database:'weatherDBTest'
});

module.exports = conn;