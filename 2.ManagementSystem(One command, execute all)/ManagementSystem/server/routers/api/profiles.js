// @login & register
const express = require('express');
const Profile = require('../../models/Profile');
// token认证：passport
const passport = require('passport');
const router = express.Router();

// $route GET    api/profiles/test
// @description: 返回请求的json数据
// @access:      public
router.get('/test', (req, res) => {
    res.json({ "message": "profile is successful" });
})

// $route GET    api/profiles/add
// @description: 添加信息接口
// @access:      private
router.post('/add', passport.authenticate("jwt", { session: false }), (req, res) => {
    const profileField = {};

    // 如果存在则就添加
    if (req.body.date) profileField.date = req.body.date;
    if (req.body.type) profileField.type = req.body.type;
    if (req.body.description) profileField.description = req.body.description;
    if (req.body.income) profileField.income = req.body.income;
    if (req.body.expend) profileField.expend = req.body.expend;
    if (req.body.cash) profileField.cash = req.body.cash;
    if (req.body.remark) profileField.remark = req.body.remark;

    new Profile(profileField).save()
        .then((profile) => {
            res.json(profile);
        })
})

// $route GET    api/profiles/
// @description: 获取所有信息
// @access:      private
router.get('/', passport.authenticate("jwt", { session: false }), (req, res) => {
    Profile.find()
        .then((profile) => {
            if (!profile)
                res.status(404).json("没有任何内容");

            res.json(profile);
        })
        .catch((err) => {
            res.status(404).json(err)
        })
})

// $route GET    api/profiles/:id
// @description: 获取单条信息
// @access:      private
router.get('/:id', passport.authenticate("jwt", { session: false }), (req, res) => {
    Profile.findOne({ _id: req.params.id })
        .then((profile) => {
            if (!profile)
                res.status(404).json("没有任何内容");

            res.json(profile);
        })
        .catch((err) => {
            res.status(404).json(err)
        })
})

// $route GET    api/profiles/edit/:id
// @description: 编辑信息接口
// @access:      private
router.post('/edit/:id', passport.authenticate("jwt", { session: false }), (req, res) => {
    const profileField = {};

    // 如果存在则就添加
    if (req.body.date) profileField.date = req.body.date;
    if (req.body.type) profileField.type = req.body.type;
    if (req.body.description) profileField.description = req.body.description;
    if (req.body.income) profileField.income = req.body.income;
    if (req.body.expend) profileField.expend = req.body.expend;
    if (req.body.cash) profileField.cash = req.body.cash;
    if (req.body.remark) profileField.remark = req.body.remark;

    Profile.findOneAndUpdate(
        { _id: req.params.id },
        { $set: profileField },
        { new: true }
    )
        .then((profile) => {
            res.json(profile)
        })
})

// $route GET    api/profiles/delete/:id
// @description: 删除信息接口
// @access:      private
router.delete('/delete/:id', passport.authenticate("jwt", { session: false }), (req, res) => {
    Profile.findOneAndDelete({ _id: req.params.id })
        .then((profile) => {
            if (!profile) {
                return res.status(404).json("该记录不存在");
            }
            res.json({ message: "删除成功", deletedProfile: profile });
        })
        .catch((err) => {
            res.status(500).json("删除失败");
        });
});


module.exports = router;