const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')

const wechat = require('co-wechat');
const wx_config = require('./config').wx
const UserApi = require('./proxy').User

// error handler
onerror(app)

// middlewares
app.use(bodyparser({
  enableTypes:['json', 'form', 'text']
}))
app.use(json())
app.use(logger())
app.use(require('koa-static')(__dirname + '/public'))

app.use(views(__dirname + '/views', {
  extension: 'ejs'
}))


app.use(async (ctx, next) => {  
  if (ctx.path === '/wechat') {
      await next();  
  } else {  
      ctx.body = `Hello, koa2! Path is: ${ctx.path}`;  
  }  
});  


app.use(wechat(wx_config).middleware(async (message, ctx) => {
  if(message.MsgType == "event" && message.Event == "subscribe"){
    let is_repeat =  await UserApi.isRepeatUserName(message.FromUserName);
    if(is_repeat){
      return '欢迎您关注';
    }else{
      return '您已重复关注';
    }
  }
}));



module.exports = app
