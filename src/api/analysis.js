//文档解析
import { loginreq, req, jsonreq, picturess } from './axiosFun';
import httpUrls from './requestURL'
let {httpUrl, memberUrl, loginUrl, membersUrl} = httpUrls;
let qyl = 'http://127.0.0.1:28083/'
//创建解析文档任务
export const createAnalysisWord = (data) => { return jsonreq("post", qyl+"api/chat/parse_document", data) };
//查找解析后的数据
export const getAnalysisWord = (params) => { return jsonreq("get", qyl+"api/chat/parse_document?"+ params) };
//获取解析历史记录
export const getAnalysisList = (params) => { return jsonreq("get", qyl+"api/chat/get_record?"+ params) };
//删除历史记录
export const DeleteAnalysisList = (params) => { return jsonreq("delete", qyl+"api/chat/get_record"+ params) };
//修改解析历史记录
export const EditAnalysisList = (params) => { return jsonreq("put", qyl+"api/chat/get_record", params) };

