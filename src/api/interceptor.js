/**
 * 生成基础axios对象，并对请求和响应做处理
 */
import axios from 'axios'
import { message} from 'antd';

// 创建一个独立的axios实例
const service = axios.create({
    // 设置baseUr地址,如果通过proxy跨域可直接填写base地址
    baseURL: 'https://www.liulongbin.top:8888/api/private/v1/',
});

// 请求拦截
service.interceptors.request.use(config => {
    return config;
}, err => {
    return Promise.reject(err)
});

// 返回拦截
service.interceptors.response.use((response) => {
    // 获取接口返回结果
    const res = response;
    console.log(res,'返回拦截')
    // status为200，直接把结果返回回去，这样前端代码就不用在获取一次data.
    if (res.status === 200) {
        return Promise.resolve(res.data)
    } else {
        // 错误显示可在service中控制，因为某些场景我们不想要展示错误
        return Promise.resolve(res)
    }
}, err => {
    if (err.message === 'Network Error') {
        return message.warning('网络连接异常！')
    }
    if (err.code === 'ECONNABORTED') {
        return message.warning('请求超时，请重试')
    }
    return Promise.reject(err)
});


export default service;