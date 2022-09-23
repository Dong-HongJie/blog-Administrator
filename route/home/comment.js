const {Comment} = require('../../model/comment');
module.exports = async (req, res) => {
  // res.send(req.body.uid.replace(/[\'\"]/g, ""));
  // 对象结构
  const { content, uid, aid } = req.body;
  // 将评论信息存入数据库中
  await Comment.create({
    content: content,
    uid:uid.replace(/[\'\"]/g, ''),
    aid:aid,
    time: new Date()
  });

  //  将文章重定向到文章详情页面
  res.redirect('/home/article?id=' + aid); 
}