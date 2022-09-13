import axios from "axios";
import { getToken, setToken } from "@/utils/helpers";
axios.defaults.baseURL = "https://study-api.hanwenbo.top/";
// 错误信息处理
const errorHandle = (status, other) => {
    switch (status) {
        case 400:
            console.log("信息验证失败");
            break;
        case 401:
            console.log("认证失败");
            break;
        case 403:
            localStorage.removeItem("token");
            console.log("token校验失败");
            break;
        case 404:
            console.log("请求资源不存在");
            break;
        default:
            console.log(other);
            break;
    }
};
// 添加请求拦截器
axios.interceptors.request.use(
    function(config) {
        // 在发送请求之前做些什么
        const token = getToken();
        if (token) {
            config.headers = {
                "Content-Type": "application/x-www-form-urlencoded",
                Authorization: token,
            };
        }

        // console.log(config);
        return config;
    },
    function(error) {
        // 对请求错误做些什么
        return Promise.reject(error);
    }
);

// 添加响应拦截器
axios.interceptors.response.use(
    function(response) {
        // 对响应数据做点什么
        // console.log();
        setToken(response.headers.authorization);
        // response.headers['Authorization'] = response.data.token;
        return response.status === 200 ?
            Promise.resolve(response.data) :
            Promise.reject(response);
    },
    function(error) {
        // 对响应错误做点什么
        const { response } = error;
        if (response) {
            errorHandle(response.status, response.data.message);
            return Promise.reject(response.data);
        } else {
            console.log("断了");
        }
    }
);
export default axios;