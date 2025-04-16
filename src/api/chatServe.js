// 服务商API
import { loginreq, req, jsonreq, picturess } from './axiosFun';
import httpUrls from './requestURL'
let {httpUrl, memberUrl, loginUrl, membersUrl} = httpUrls;

// 获取成员列表
export const getTeamdata = (params) => { return req("get", loginUrl+"api/user/top_my_members", params) };
// 获取服务商统计数据
export const getchatServe = (params) => { return req("get", loginUrl+"api/user/OperatorStatistics", params) };
//申请服务商
// 验证码验证
export const  verifyCode = (params) => { return req("post", loginUrl+"api/user/MobileVerify", params) };