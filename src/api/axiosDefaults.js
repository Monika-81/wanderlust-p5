import axios from "axios";

axios.defaults.baseURL = 'https://wanderlust-api-p5.herokuapp.com/'
axios.defaults.headers.post['Content-Type'] = 'multipart/form-data'
axios.defaults.withCredentials = true
// try while developing, getting CORS error:
axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';

export const axiosReq = axios.create()
export const axiosRes = axios.create()