import { loginreq, req, jsonreq, picturess } from './axiosFun';
import httpUrls from './requestURL'
let {httpUrl, memberUrl, loginUrl} = httpUrls

// 问题反馈
// export const requestProblem = (data) => {
//   return jsonreq('post', httpUrl + 'api/user/problem_feedback', data)
// }
export const requestProblem = (params) => { return jsonreq("post", loginUrl+"api/user/problem_feedback", params) };


// 获取“我”
export const getMentorMe = (data) => {
  return jsonreq('get', memberUrl + 'assistant/sva_me/?' + data)
}

// 创建“我”
export const createMentorMe = (data) => {
  return jsonreq('post', memberUrl + 'assistant/sva_me/', data)
}

// 更新“我”
export const updateMentorMe = (data) => {
  return jsonreq('put', memberUrl + 'assistant/sva_me/', data)
}

// 删除“我”
export const deleteMentorMe = (data) => {
  return jsonreq('delete', memberUrl + 'assistant/sva_me/', data)
}

// 获取导师列表
export const getMetorList = (data) => {
  return jsonreq('get', memberUrl + 'assistant/sva_tutor/?' + data)
}

// 创建导师
export const createMetor = (data) => {
  return jsonreq('post', memberUrl + 'assistant/sva_tutor/', data)
}

// 更新导师
export const updateMetor = (data) => {
  return jsonreq('put', memberUrl + 'assistant/sva_tutor/', data)
}

// 删除导师
export const deleteMentor = (data) => {
  return jsonreq('delete', memberUrl + 'assistant/sva_tutor/', data)
}

// 获取地区
export const getRegions = () => {
  return jsonreq('post', memberUrl + 'assistant/regions/')
}

// 获取我和导师的并列关系
export const batchMeTutor = (data) => {
  return jsonreq('post', memberUrl + 'assistant/batch_me_tutor/', data)
}
// 批量绑定导师
export const batchBind = (data) => {
  return jsonreq('post', memberUrl + 'assistant/batch_bind_tutor/', data)
}