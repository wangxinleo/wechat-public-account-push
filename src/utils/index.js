import { selfDayjs } from './set-def-dayjs.js';

/**
 * 驼峰转下划线
 * @param {*} str
 * @returns
 */
export const toLowerLine =  (str) => {
  var temp = str.replace(/[A-Z]/g, function (match) {
    return "_" + match.toLowerCase();
    });
    if(temp.slice(0,1) === '_'){ //如果首字母是大写，执行replace时会多一个_，这里需要去掉
      temp = temp.slice(1);
    }
  return temp;
};


/**
 * 获取随机颜色
 * @returns
 */
export const getColor = () => {
  return `#${Math.floor(Math.random() * 0xffffff).toString(16).padEnd(6, "0")}`
}


/**
 * 生成一个从min 到 max 的随机数
 * @param {*} min
 * @param {*} max
 * @returns
 */
export const randomNum = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

/**
 * 对生日时间倒计时进行排序
 * @param {*} list
 * @returns
 */
export const sortBirthdayTime = (list) => {
  list.forEach(item => {
    const diffDay = Math.ceil(selfDayjs(selfDayjs().format('YYYY') + '-' + (item.useLunar ? item.solarDateInThisYear : item.date)).diff(selfDayjs(), 'day', true))
    if (diffDay >= 0) {
      item['diffDay'] = diffDay
    } else {
      item['diffDay'] = Math.ceil(selfDayjs(selfDayjs().add(1, 'year').format('YYYY') + '-' + (item.useLunar ? item.solarDateInThisYear : item.date)).diff(selfDayjs(), 'day', true))
    }
  })
  return list.sort((a, b) =>
    a.diffDay > b.diffDay ? 1 : -1
  );
};
