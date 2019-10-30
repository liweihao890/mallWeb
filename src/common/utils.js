//防抖动函数的实现
export function debounce(func,delay){
    let timer = null
    return function (...args){
        if(timer){
            clearTimeout(timer)
        }
        timer = setTimeout(() =>{
            func.apply(this,args)
        },delay)
    }
}

/**
 * dateFormat(data, format)
 * desc：
 * 时间格式化，默认为 `yyyy-MM-dd` 类型
 * */
export function dateFormat (date, format) {
    let _format = format || 'yyyy-MM-dd';
  
    const d = date;
    const o = {
      'M+' : d.getMonth() + 1, // month
      'd+' : d.getDate(), // day
      'h+' : d.getHours(), // hour
      'm+' : d.getMinutes(), // minute
      's+' : d.getSeconds(), // second
      'q+' : Math.floor((d.getMonth() + 3) / 3), // quarter
      'S' : d.getMilliseconds() // millisecond
    };
  
  
    if (/(y+)/.test(_format)) {
      _format = _format.replace(RegExp.$1, (d.getFullYear() + '').substr(4 - RegExp.$1.length));
    }
  
    for (const k in o) {
      if (o.hasOwnProperty(k) && new RegExp('(' + k + ')').test(_format)) {
        _format = _format.replace(RegExp.$1, RegExp.$1.length === 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length));
      }
    }
  
    return _format;
    
  }


    /**
     * `repeat` 方法返回一个新字符串，表示将原字符串重复 `n` 次。
     *
     * `RegExp` 是javascript中的一个内置对象。为正则表达式。
     * `RegExp.$1` 是 `RegExp` 的一个属性,指的是与正则表达式匹配的第一个 子匹配(以括号为标志)字符串
     * 以此类推，RegExp.$2，RegExp.$3，..RegExp.$99总共可以有99个匹配
     *
     * 例子：
     * var r= /^(\d{4})-(\d{1,2})-(\d{1,2})$/; //正则表达式 匹配出生日期(简单匹配)
     * r.exec('1985-10-15');
     * s1=RegExp.$1;
     * s2=RegExp.$2;
     * s3=RegExp.$3;
     * console.log(s1+" "+s2+" "+s3)//结果为1985 10 15
     *
     * `test()` 方法用于检测一个字符串是否匹配某个模式.
     * 语法：RegExpObject.test(string)
     *
     */
  
    /**
     * 使用正则匹配年份：
     *
     * 1、 /(y+)/.test(_format)
     * - 检测： `_format` 中最少有一个 `y` // 正则： `+` 表示最少要有一个； `*` 表示 `0-N` ge; `?` 表示 `0/1` 个
     *
     * 2、 (d.getFullYear() + '').substr(4 - RegExp.$1.length))
     * - 判断正则匹配的字符串长度，截取年份字符串，正则匹配长度为 `1~3`、`5~7` 匹配结果为 `1~3` 位的年份字符串， `4,8,...` 为整个年份字符串
     *
     * 3、 _format = _format.replace(RegExp.$1, (d.getFullYear() + '').substr(4 - RegExp.$1.length));
     * - 替换所有 `y` 为上面匹配出的年份字符串的结果
     *
     */