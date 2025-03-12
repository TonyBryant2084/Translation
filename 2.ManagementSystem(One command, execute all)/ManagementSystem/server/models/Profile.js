const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// Create Schema：
// Schema（模式）是 Mongoose 中用来定义 MongoDB 数据库集合中文档结构的工具。
const ProfileSchema = new Schema({
    // 创建时间：默认现在
    date: {
        type: Date,
        dufault: Date.now
    },
    // 收支类型：不必要
    type: {
        type: String,
    },
    // 描述：不必要
    description: {
        type: String,
    },
    // 收入：必要
    income: {
        type: String,
        required:true
    },
    // 支出：必要
    expend: {
        type: String,
        required:true
    },
    // 账户现金：必要
    cash: {
        type: String,
        required:true
    },
    // 备注：不必要
    remark: {
        type: String,
    },
})

// profile 是 MongoDB 中集合的名称
// Profile 是一个 Mongoose 模型的名称。
// 在 Node.js 中，使用 Mongoose 将 MongoDB 的集合抽象为 模型，
// 这样就可以通过模型来操作数据库中的数据，而不需要直接使用低级的数据库操作。
// 通过模型，你可以更方便地进行增、删、改、查等操作，同时也能确保数据结构的一致性。
module.exports = Profile = mongoose.model("profile", ProfileSchema);