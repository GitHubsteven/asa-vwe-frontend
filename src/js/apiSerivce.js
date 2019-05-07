//导入axios
import axios from 'axios'
//定义主机，定义别的主机可能会报跨域错误
const API_URL = "http://localhost:8090";

//定义并且曝光出一个类
export class ApiService {
    constructor() {
    }

//定义一个方法
    getBlogs() {
        const url = `${API_URL}/blog-list/`;
        return axios.get(url).then((res) => res.data);
    }

    viewBlog() {
        const url = `${API_URL}/blog-view/`;
        return axios.get(url).then((res) => res.data);
    }
}