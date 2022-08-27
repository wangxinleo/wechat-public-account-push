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