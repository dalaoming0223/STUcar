module.exports = (date) => {
    let fmt = 'yyyy-MM-dd hh:mm:ss'
    const o = {
        'M+': date.getMonth() + 1,//month
        'd+': date.getDate(),
        'h+': date.getHours(),
        'm+': date.getMinutes(),
        's+': date.getSeconds(),
    }
    //test方法是用来匹配的
    if(/(y+)/.test(fmt)) {
        //RegExp.$1 当前正则表达式的第一个子表达式
       fmt = fmt.replace(RegExp.$1, date.getFullYear())
    }
    for(let k in o) {
        if(new RegExp('('+ k + ")").test(fmt)){
        fmt =  fmt.replace(RegExp.$1, o[k].toString().length == 1 ? '0' + o[k] : o[k])
        }
    }
    //console.log(fmt)
    return fmt
}