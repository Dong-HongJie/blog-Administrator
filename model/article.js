// 引入mongoose, 创建文章集合，并导出，供其他地方操作数据库使用
// 创建用户集合
const mongoose = require("mongoose");

const articleSchema = new mongoose.Schema({
  title: {
    type: String,
    maxlength: 20,
    minlength: 4,
    required: [true, "请填写标题"],
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [true, "请传递作者"],
  },
  publishDate: {
    type: Date,
    default: Date.now,
  },
  cover: {
    type: String,
    default: null,
  },
  content: {
    type: String
  },
});

// 使用上面的规则创建集合
const Article = mongoose.model("Article", articleSchema);
module.exports = { Article };
