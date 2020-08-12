// 操作数组

/**
* @module array
* @author: lwh
* @param arr 需要去重的数组对象 
* @return arr 去重之后的数组
* @description: 数组去重
* @since: 2019-12-19 11:38:00
*/
function ArrayWeightRemoval(arr) {
  let obj = []
  return arr = arr.reduce((item, next)=> {
    obj[next.id] ? '' : obj[next.id] = true && item.push(next);
    return item;
  }, []);
}
/**
* @module array
* @author: lwh
* @param  arr 合并数组
* @param  arr1 合并进arr的数组
* @return arr 合并之后的数组
* @description: 合并两个数组
* @since: 2019-12-19 11:39:48
*/
function reorganizedArray(arr,arr1) {
  return arr = arr.map((item,index) => {
    return {...item, ...arr1[index]};
  });
}
module.exports={
  ArrayWeightRemoval,
  reorganizedArray,
}