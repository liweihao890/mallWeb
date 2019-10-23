import axios from 'axios'
//封装saxios请求
export function request (config){
    // 1.创建实例，配置请求的基本路径等配置
    const instance = axios.create({
        baseURL:'http://123.207.32.32:8000/api/v1',
        timeout:5000
    }) 
    
    // 2.设置拦截器
    //请求拦截器
    instance.interceptors.request.use(
        config => config ,
        err => console.log(err)
    )
    // 响应拦截器
    instance.interceptors.response.use(
        res =>  {
            
            return res.data},
        err => console.log(err)
    )
    // 3.导出实例,这个实例就是promise对象
    return instance(config)
}