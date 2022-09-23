// 导入文章集合
const {Article} = require('../../model/article')
// 导入评论集合，获取评论
const { Comment } = require("../../model/comment");

module.exports = async (req, res) => {
  // 接收客户端传过来的文章id，用该id去查询数据库，讲查询到的数据渲染到模板字符串中
  const id = req.query.id;
  let article = await Article.findOne({_id:id}).populate('author');
  let comments = await Comment.find({aid:id}).populate('uid');
  res.render("home/article.art", {
    article: JSON.parse(JSON.stringify(article)),
    comments: JSON.parse(JSON.stringify(comments)),
  });
};
