// 文章的处理函数模块
const path = require('path')
const db = require('../db/index')
// 发布文章的处理函数
exports.addArticle = (req, res) => {
  console.log(req.file)
  if (!req.file || req.file.fieldname !== 'cover_img') return res.cc('文章封面是必选参数！')

  // TODO：证明数据都是合法的，可以进行后续业务逻辑的处理
  // 处理文章的信息对象
  const articleInfo = {
    // 标题、内容、发布状态、所属分类的Id
    ...req.body,
    // 文章封面的存放路径
    cover_img: path.join('/uploads', req.file.filename),
    // 文章的发布时间
    pub_date: new Date(),
    // 文章作者的Id
    author_id: req.user.id,
  }

  const sql = `insert into ev_articles set ?`
  db.query(sql, articleInfo, (err, results) => {
    if (err) return res.cc(err)
    if (results.affectedRows !== 1) return res.cc('发布新文章失败！')
    res.cc('发布文章成功！', 0)
  })
}
exports.getquestion = (req, res) => {
  const sql = `select * from question `
  db.query(sql, (err, results) => {
    if (err) return res.cc(err+'获取信息失败')
    res.send({
      status: 0,
      message: '获取题目信息成功！',
      data: results,
    })
  })
}
exports.getteacher = (req, res) => {
  const sql = `select * from teacher `
  db.query(sql, (err, results) => {
    if (err) return res.cc(err+'获取信息失败')
    res.send({
      status: 0,
      message: '获取教师信息成功！',
      data: results,
    })
  })
}
exports.updatequestionInfo = (req, res) => {
 
  const sql = `select * from question where question_id=?`
  db.query(sql, req.body.question_id, (err, results) => {
    // 执行 SQL 语句失败
    if (err) return res.cc(err)
    // 判断结果是否存在
    if (results.length !== 1) return res.cc('题目信息不存在！')
    //定义更新题目信息sql语句
    const sql = `update question set ? where question_id=?`
   
    // 调用 db.query() 执行 SQL 语句
    db.query(sql, [req.body,req.body.question_id], (err, results) => {
      // 执行 SQL 语句失败
      if (err) return res.cc(err)
      // 判断影响的行数
      if (results.affectedRows !== 1) return res.cc('更新信息失败！')
      // 成功      
      res.cc('更新题目信息成功', 0)
    })
})
}
exports.updateteacherInfo = (req, res) => {

  const sql = `select * from teacher where teacher_id=?`
  db.query(sql, req.body.teacher_id, (err, results) => {
    // 执行 SQL 语句失败
    if (err) return res.cc(err)
    // 判断结果是否存在
    if (results.length !== 1) return res.cc('教师信息不存在！')
    //定义更新题目信息sql语句
    const sql = `update teacher set ? where teacher_id=?`
   
    // 调用 db.query() 执行 SQL 语句
    db.query(sql, [req.body,req.body.teacher_id], (err, results) => {
      // 执行 SQL 语句失败
      if (err) return res.cc(err)
      // 判断影响的行数
      if (results.affectedRows !== 1) return res.cc('更新信息失败！')
      // 成功      
      res.cc('更新教师信息成功', 0)
    })
})
}
exports.inquirequestion= (req, res) => {

    //定义查询题目信息sql语句
    const sql = `select * from question where question_id= ?`
     
   
    // 调用 db.query() 执行 SQL 语句
    db.query(sql, req.body.question_id, (err, results) => {
      // 执行 SQL 语句失败
      if (err) return res.cc(err)
      // 判断影响的行数
     if (results.length !== 1) return res.cc(err+'查询信息失败！')
     
   
      // 成功  
      res.send({
        status:0,
        message: '获取题目信息成功！',
        data: results,
      })    
      
    })
}
exports.addquestionInfo = (req, res) => {

  //定义添加题目信息sql语句
  const sql = `insert into question set ? `
 console.log(req.body)
  // 调用 db.query() 执行 SQL 语句
  db.query(sql, [req.body], (err, results) => {
    // 执行 SQL 语句失败
    if (err) return res.cc(err)
    // 执行 SQL 语句成功，但是查询的结果可能为空
    if (results.affectedRows !== 1) return res.cc('添加信息失败！')
    // 成功 
    res.cc('添加题目信息成功', 0)     
   
  })
}
