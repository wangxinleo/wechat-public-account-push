import { getAggregatedData } from './src/services/index.js'

/**
 * 参数测试函数
 */
export default async function mainForTest() {
  // 处理好的用户数据
  const aggregatedData = await getAggregatedData()
  aggregatedData.forEach((item) => {
    console.log(item.wxTemplateParams)
  })
}
