//企业知识库
import httpUrls from './requestURL'
import { loginreq, req, jsonreq, picturess } from './axiosFun';
let {httpUrl, memberUrl, loginUrl,enterpriseUrl} = httpUrls;
// 查询文件夹数据
export const getFolder = (data) => { return jsonreq("post", enterpriseUrl+"knowledge/find_folder", data) };
// 文件夹上传文件
export const uploadFolder = (data) => { return jsonreq("post", enterpriseUrl+"knowledge/file_upload", data) };
// 创建文件夹
export const createFolder = (data) => { return jsonreq("post", enterpriseUrl+"knowledge/create_folder", data) };
// 删除文件夹/知识库
export const deleteFolder = (data) => { return jsonreq("post", enterpriseUrl+"knowledge/delete_file", data) };
// 编辑文件夹/知识库
export const editFolder = (data) => { return jsonreq("post", enterpriseUrl+"knowledge/update_file", data) };
// 查询向量库数据
export const getVector = (data) => { return jsonreq("post", enterpriseUrl+"knowledge/find_vector", data) };
// 创建向量库
export const createBase= (data) => { return jsonreq("post", enterpriseUrl+"knowledge/create_vector", data) };

//首页智能体相关接口
// 类目
export const getCozeTags= (data) => { return jsonreq("post", "https://qy.umi6.com:8002/coze/category", data) };
// 获取智能体数据
export const getAgent= (data) => { return jsonreq("post","https://qy.umi6.com:8002/coze/find_coze", data) };
