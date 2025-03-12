// 导入mysql对象
const mysql = require('mysql2')
// 创建一个数据库连接对象
const db = mysql.createPool({
    host: '127.0.0.1',
    user: 'root',        //数据库用户名
    password: '123456',  //数据库密码
    database: 'my_db_01' //数据库名称
});

// 将数据库暴露出去
module.exports = db;