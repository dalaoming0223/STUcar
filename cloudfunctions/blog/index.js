// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

const TcbRouter = require('tcb-router')
const db = cloud.database()
const blogCollection = db.collection('blog')
// 云函数入口函数
exports.main = async (event, context) => {
  const app = new TcbRouter({
    event
  })
  app.router('list', async (ctx, next) => {
                                                          //第二个参数是以逆序还是顺序
    let blogList = await blogCollection.skip(event.start).limit(event.count)
    .orderBy('createTime', 'desc').get().then((res) =>{
      return res.data
    })
    ctx.body = blogList
  })
  return app.serve()
}