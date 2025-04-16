//axios响应拦截器
import axios from "axios";
import httpsUrls from "../api/requestURL";
import { ElMessage } from "element-ui";
import { mapGetters } from 'vuex';
import store from '../vuex/index';

//创建axios实例
const request = axios.create({
  baseURL: httpsUrls,
});



// ==== 响应拦截器(response)=====
let userInfo = JSON.parse(localStorage.getItem('userInfo'))
request.interceptors.response.use(response => {
  if (response.data.code == 40022) {
    // ElMessage('余额不足')
    store.dispatch('id/SET_REMINDT', true)
    return response
  }
  // if (response.data.code == 20000) {
  //   store.dispatch('app/changePhoneDialogVisible', true)
  // }
  return response
});

export default request;
