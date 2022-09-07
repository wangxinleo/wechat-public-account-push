import dayjs from 'dayjs'
import tz from 'dayjs/plugin/timezone.js'
import utc from 'dayjs/plugin/utc.js'

dayjs.extend(tz)
dayjs.extend(utc)

export const selfDayjs = (time) => dayjs(time).utc().tz('Asia/Shanghai')

/* istanbul ignore next */
export const timeZone = () => dayjs.tz.guess()
