const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// Create Schema：
// Schema（模式）是 Mongoose 中用来定义 MongoDB 数据库集合中文档结构的工具。
const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    avatar: {
        type: String
    },
    identity: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
})

// users 是 MongoDB 中集合的名称
// User 是一个 Mongoose 模型的名称。
// 在 Node.js 中，使用 Mongoose 将 MongoDB 的集合抽象为 模型，
// 这样就可以通过模型来操作数据库中的数据，而不需要直接使用低级的数据库操作。
// 通过模型，你可以更方便地进行增、删、改、查等操作，同时也能确保数据结构的一致性。
module.exports = User = mongoose.model("users", UserSchema);