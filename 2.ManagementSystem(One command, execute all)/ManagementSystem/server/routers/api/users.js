// @login & register
const express = require('express');
const User = require('../../models/User');
// 加密：
const bcrypt = require('bcryptjs');
// 头像：
const gravatar = require('gravatar');
// token(jsonwebtoken)：
const jwt = require('jsonwebtoken');
// key:
const key = require('../../config/keys');
// token认证：passport
const passport = require('passport');

const router = express.Router();

// $route GET    api/users/test
// @description: 返回请求的json数据
// @access:      public
router.get('/test', (req, res) => {
    res.json({ "message": "login successfully" });
})

// $route POST    api/users/register
// @description:  返回请求的json数据
// @access:       public
router.post('/register', (req, res) => {
    // 查询数据库中是否拥有邮箱：
    // User.findOne() 返回的是一个 Promise 对象，只有通过 then、catch 或 async/await 来处理查询结果或错误。
    // user是单条文档，如果使用find而不是findOne，返回文档数组
    User.findOne({ email: req.body.email })
        .then((user) => {
            if (user)
                return res.status(400).json("邮箱已被注册!");
            else {
                // 使用 gravatar获得头像，mm:默认头像照片
                var avatar = gravatar.url(req.body.email, { s: '200', r: 'pg', d: 'mm' });
                const newUser = new User({
                    name: req.body.name,
                    email: req.body.email,
                    avatar,
                    identity: req.body.identity,
                    password: req.body.password
                })
                // 加密
                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if (err) throw err;

                        newUser.password = hash;

                        newUser.save()
                            .then((user) => { res.json(user) })
                            .catch((err) => { console.log(err) });
                    });
                });
            }
        });
})

// $route POST    api/users/login
// @description:  返回token jwt passport
// @access:       public
router.post('/login', (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    User.findOne({ email })
        .then((user) => {
            if (!user)
                return res.status(400).json({ email: "用户名不存在！" });

            // 用户名存在，进行密码匹配：
            bcrypt.compare(password, user.password)
                .then((isMatch) => {
                    if (isMatch) {
                        // 返回token(钥匙)：只有拿着钥匙，才能从服务器中获得想要的数据

                        // jwt.sign("规则", "加密名字", "过期时间", "箭头函数");
                        const rule = {
                            id: user.id,
                            name: user.name,
                            avatar: user.avatar,
                            identity: user.identity
                        };
                        jwt.sign(rule, key.secretOrKey, { expiresIn: 3600 }, (err, token) => {
                            if (err) throw err;
                            res.json({
                                success: true,
                                token: "Bearer " + token
                            });
                        })
                    }
                    else {
                        return res.status(400).json({ password: "密码错误！" });
                    }
                })
        })
})

// 携带token想要向服务器获取信息：
// $route GET     api/users/current
// @description:  reutrn current user
// @access:       private
router.get('/current', passport.authenticate("jwt", { session: false }), (req, res) => {
    res.json({
        id: req.user.id,
        name: req.user.name,
        avatar: req.user.avatar,
        email: req.user.email,
        identity: req.user.identity
    })
})

module.exports = router;