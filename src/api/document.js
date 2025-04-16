import { loginreq, req, jsonreq, picturess } from './axiosFun';
import httpUrls from './requestURL'
let {httpUrl, memberUrl, loginUrl, membersUrl} = httpUrls;

//上传文件http://127.0.0.1:8060/kb/upload_document/
export const requestFile = (params) => { return jsonreq("post", memberUrl+"kb/upload_document/", params) };
//获取用户上传文件http://127.0.0.1:8060/kb/upload_document/
export const getUserFile = (params) => { return jsonreq("get", memberUrl+"kb/upload_document/"+ params) };
