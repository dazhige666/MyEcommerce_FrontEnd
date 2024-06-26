"use strict";

import Vue from 'vue';
import axios from "axios";
import router from '../router'


// Full config:  https://github.com/axios/axios#request-config
// axios.defaults.baseURL = process.env.baseURL || process.env.apiUrl || '';
// axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

let config = {
  baseURL:"http://localhost:9090"
  // timeout: 60 * 1000, // Timeout
  // withCredentials: true, // Check cross-site Access-Control
};

const _axios = axios.create(config);

_axios.interceptors.request.use(
  function(config) {
    // Do something before request is sent
    console.log(config);
    if(!config.url.endsWith("/back/login")){

      let username = window.localStorage.getItem("username");
      if(username==null||username==""||username==undefined){
        router.push("/login").catch(err => console.log(err));

      }
    }
    console.log(router);
    //判断请求是否从login发出，如果不是，判断本地存储的用户是否存在，都不存在，说明用户没有登录
    //跳转到登录界面
    return config;
  },
  function(error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
_axios.interceptors.response.use(
  function(response) {
    // Do something with response data
    return response;
  },
  function(error) {
    // Do something with response error
    return Promise.reject(error);
  }
);

Plugin.install = function(Vue, options) {
  Vue.axios = _axios;
  window.axios = _axios;
  Object.defineProperties(Vue.prototype, {
    axios: {
      get() {
        return _axios;
      }
    },
    $axios: {
      get() {
        return _axios;
      }
    },
  });
};

Vue.use(Plugin)

export default Plugin;
