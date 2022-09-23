// 导入文章集合,用于查询及联合查询
const { Article } = require('../../model/article')
// 导入分页模块
const pagination = require('mongoose-sex-page');
module.exports = async (req, res) => {
  const page = req.query.page
  // 从数据库中查询数据
  let result = await pagination(Article).page(page).size(4).display(5).find().populate("author").exec();
  res.render("home/default.art", {
    // 注意啦，result不是严格的JSON数据，直接传过去会有奇怪的错误的
    result: JSON.parse(JSON.stringify(result))
  });
};