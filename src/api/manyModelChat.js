import axios from "axios";
import { loginreq, req, jsonreq, picturess } from "./axiosFun";
import httpUrls from "./requestURL";
let { httpUrl, memberUrl, loginUrl, membersUrl } = httpUrls;
//获取模型列表
export const getModelList = data => {
  return jsonreq("get", httpUrl + "api/chat/get_model", data);
};
//获取角色列表
export const getRoleList = params => {
  return jsonreq("get", httpUrl + "api/chat/chat_role_view?"+params);
};
//角色创建
export const createRole = data => {
  return jsonreq("post", httpUrl + "api/chat/chat_role_view",data);
};
//角色详情 /role_code 角色编号,字符串
export const detailRole = data => {
  return jsonreq("get", httpUrl + "api/chat/chat_role_view/"+data);
};
//角色修改 /role_code 角色编号,字符串
export const upDataRole = (role_code,data) => {
  return jsonreq("put", httpUrl + `api/chat/chat_role_view/${role_code}`);
};
//补充算力
export const addToken = (role_code,data) => {
  return jsonreq("put", httpUrl + `api/chat/chat_role_view/${role_code}`);
};
//话题创建
export const createSubject = data => {
  return jsonreq("post", httpUrl + "api/chat/group_chat",data);
};
//对话历史列表 /title：标题过滤器
export const manyChatList = params => {
  return jsonreq("get", httpUrl + "api/chat/group_chat?"+params);
};
//对话历史详情 /session_code:话题编号
export const chatDetail = params => {
  return jsonreq("get", httpUrl + "api/chat/group_chat/"+params);
};
//对话历史删除 /session_code:话题编号
export const deleteManyChat = params => {
  return jsonreq("delete", httpUrl + "api/chat/group_chat/"+params);
};
//发起群聊
export const createChat = data => {
  return jsonreq("post", httpUrl + "api/chat/async_group_chat_completion",data);
};