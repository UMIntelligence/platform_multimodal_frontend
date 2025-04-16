import { loginreq, req, jsonreq } from './axiosFun';
import httpUrls from './requestURL'
let {httpUrl} = httpUrls

// 获取ppt模板
export const pptTemplate = (data) => {
  return req('get', httpUrl + 'api/chat/get_theme_list', data)
}

// 获取历史ppt
export const getPptList = (data) => {
  return req('get', httpUrl + 'api/chat/ppt_history?page_size='+ data.page_size +'&page='+ data.page + '&title=' + data.title)
}

// 获取历史名称
export const editTitle = (data) => {
  return req('put', httpUrl + 'api/chat/ppt_history', data)
}

//删除历史
export const delPpt = (data) => {
  return req('delete', httpUrl + 'api/chat/ppt_history?sid=' + data.sid)
}

// 生成主题和大纲
export const addBase = (data) => {
  return req('post', httpUrl + 'api/chat/generate_ppt_base', data)
}

// 生成ppt
export const addPPt = (data) => {
  return jsonreq('post', httpUrl + 'api/chat/start_generate_ppt', data)
}

// 获取ppt链接
export const getPPtLink = (data) => {
  return req('get', httpUrl + 'api/chat/start_generate_ppt?sid='+data.sid)
}

// 上传文档获取大纲
export const addDocBase = (data) => {
  return req('post', httpUrl + 'api/chat/upload_ppt_document', data)
}