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