// 导入文章集合，便于后面操作数据库
const { Article } = require("../../model/article");
const pagination = require("mongoose-sex-page");
module.exports = async (req, res) => {
  // 接收客户端传过来的页码
  const page = req.query.page;
  //标识  标识当前访问的是文章管理页面
  req.app.locals.currentLink = "article";
  // 查询文章数据,这里要多级联合查询，通过文章——找到作者的名称
  // let articles = await Article.find().populate("author");
  // 改用pagination查询数据啦
  let articles = await pagination(Article)
    .find()
    .page(page)
    .size(2)
    .display(3)
    .populate("author")
    .exec();

  var str = JSON.stringify(articles);
  articles = JSON.parse(str);
  res.render("admin/article.art", {
    articles: articles,
  });
}