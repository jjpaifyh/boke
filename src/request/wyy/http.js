import axios from 'axios';
import QS from 'qs'; // 引入qs模块
// 请求超时
axios.defaults.timeout = 10000;
// // 请求头设置
// application/x-www-form-urlencoded;charset=UTF-8
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
// 网易云总url头
axios.defaults.baseURL = 'http://localhost:3000/';
//  // 先导入vuex,因为我们要使用到里面的状态对象
// // vuex的路径根据自己的路径去写
// import store from '@/store/index';

// // 请求拦截器
// axios.interceptors.request.use(    
//     config => {        
//         // 每次发送请求之前判断vuex中是否存在token        
//         // 如果存在，则统一在http请求的header都加上token，这样后台根据token判断你的登录情况
//         // 即使本地存在token，也有可能token是过期的，所以在响应拦截器中要对返回状态进行判断 
//         const token = document.cookie.indexOf('MUSIC_U=')  
//         if(token == -1) console.log('没有');    
//         return config;    
//     },    
//     error => {        
//         // return Promise.error(error);    
// })


export function get(url, params){    
    let ren = Number(new Date());
    params.timestamp=ren; 
    return new Promise((resolve, reject) =>{      
        axios.get(url, {            
            params: params        
        }).then(res => {
            resolve(res);
        }).catch(err =>{
            reject(err.data)        
    })    
});}
export function post(url, params) {    
    return new Promise((resolve, reject) => {      
        axios.post(url, QS.stringify(params))        
        .then(res => {            
            resolve(res);        
        })        
        .catch(err => {            
            reject(err.data)        
        })    
    });
}




