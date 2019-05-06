import axios from 'axios'

const API_URL = "http://localhost:8090";

export class ApiService {
  constructor() {
  }

  getBlogs() {
    const url = `${API_URL}/blog-list/`;
    return axios.get(url).then((res) => res.data);
  }

}