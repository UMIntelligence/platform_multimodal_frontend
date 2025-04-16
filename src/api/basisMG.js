import { loginreq, req, jsonreq, picturess } from './axiosFun';
import httpUrls from './requestURL'
let {httpUrl, memberUrl, loginUrl} = httpUrls

// 创建提示词历史
export const addPrompt= (data) => { return req("post", memberUrl+"assistant/prompt/", data) };

// 获取提示词历史
export const getPrompt= (data) => { return req("get", memberUrl+"assistant/prompt/?user_id="+ data.user_id) };

// 删除提示词历史
export const delPrompt= (data) => { return req("put", memberUrl+"assistant/prompt/", data) };