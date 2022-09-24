import schedule from 'node-schedule'
import cornTime from './config/server-config.js'
import mainForProd from './main.js'

console.log('======【定时推送服务已启动, enjoying it】======')
console.log(`目前定时推送的配置为：【${cornTime}】`)
schedule.scheduleJob(cornTime, () => {
  mainForProd()
})
