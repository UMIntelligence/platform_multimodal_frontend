import { loginreq, req, jsonreq } from './axiosFun';
import httpUrls from './requestURL'
let {httpUrl, memberUrl, loginUrl} = httpUrls

// 获取公告列表
export const messageCenter = (data) => {
  return req('post', memberUrl + 'pay/message_center/', data)
}

// 变更状态
export const messageCenterState = (data) => {
  return jsonreq('put', memberUrl + 'pay/message_center/', data)
}

// 获取公告详情
export const messageCenterContent = (data) => {
  return jsonreq('post', memberUrl + 'pay/message_center_content/', data)
}