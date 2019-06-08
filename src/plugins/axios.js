import axios from "axios";
import store from "../plugins/store"
import {Message} from "element-ui"

axios.defaults.baseURL = "/api";
axios.interceptors.request.use(
  function (req) {
    if (store.state.token != "") {
      req.headers.Authorization = store.state.token
    }
    return req;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  function (response) {
    
    return response;
  },
  function (error) {
    console.log(error.response)
    if (error.response.status == 401 && error.response.data.message == "无token,请登录") {
      store.commit("logout")
      Message({ type: "error", message: "发生错误,请重新登录" })
      setTimeout(() => {
        window.location.href = "./login.html"
      }, 1000);
      return 
    }
    if (error.response.status == 401 && error.response.data.message == "权限不足") {
      Message({ type: "error", message: "权限不足" })
      return
    }
    return Promise.reject(error);
  }
);

export default axios;