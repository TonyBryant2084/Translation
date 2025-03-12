// 导入 express模块：
const express = require('express');

// 导入 find-free-port模块：
const findFreePort = require('find-free-port');

// 导入 body-parser模块：
const parser = require('body-parser');

// 导入 users模块：
const users = require('./routers/api/users');

// 导入 profiles模块：
const profiles = require('./routers/api/profiles');

// 导入 mongoose模块：
const mongoose = require('mongoose');
// DB config：
const db = require('./config/keys').mongoURI;

// 导入 passport模块：用户认证中间件
const passport = require('passport');

// 创建 app服务器：
const app = express();

// 注册中间件：
app.use(parser.urlencoded({ extended: false }));
app.use(parser.json());
app.use("/api/users", users);
app.use("/api/profiles", profiles);
app.use(passport.initialize()); // passport初始化
require('./config/passport')(passport);

let free_port;

// 连接 MongoDB：
mongoose.connect(db)
    .then(() => {
        console.log("MongoDB Connected");

        // 从 3000端口开始找空闲端口：
        findFreePort(3000, (err, freePort) => {
            if (err) {
                console.error('无法找到空闲端口：', err);
                return;
            }

            console.log(`空闲端口号是：${freePort}`);

            free_port = freePort;

            // 启动服务器：
            app.listen(freePort, () => {
                console.log(`Server is running at ${freePort}`);
            });
        });
    })
    .catch((err) => {
        console.error('MongoDB 连接失败：', err);
    });


    module.exports = {
        port: free_port
    }