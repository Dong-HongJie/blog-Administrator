// 引入mongoose, 创建用户集合
const mongoose = require("mongoose");
const commentSchema = new mongoose.Schema({
  // 文章id
  aid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Article",
  },
  // 用户id
  uid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  time:{
    type: Date
  },
  // 评论内容
  content: {
    type: String
  }
});

// 创建评论集合
const Comment = mongoose.model("Comment", commentSchema);

// 将评论的集合构造函数作为模块成员导出
module.exports = {
  Comment
} 