//知识库
import { loginreq, req, jsonreq, picturess } from './axiosFun';
import httpUrls from './requestURL'
let {httpUrl, memberUrl, loginUrl, membersUrl} = httpUrls;

//标签选项
export const getEnterprise_label = (params) => { return jsonreq("get", httpUrl+"api/se_enterprise/enterprise_label?"+params) };
//企业营销详情
export const getRetrieve = (params) => { return jsonreq("get",httpUrl+"api/se_enterprise/retrieve?"+params) };
//企业信息保存或修改
export const companySubmit = (data) => { return jsonreq("post",httpUrl+"api/se_enterprise/company_create_or_update",data) };
//项目信息创建或修改
export const projectSubmit = (data) => { return jsonreq("post",httpUrl+"api/se_enterprise/project_create_or_update",data) };
//资讯信息创建或修改
export const informationSubmit = (data) => { return jsonreq("post",httpUrl+"api/se_enterprise/information_create_or_update",data) };
//知识库创建或修改
export const knowledgeSubmit = (data) => { return jsonreq("post",httpUrl+"api/se_enterprise/knowledge_create_or_update",data) };
//知识库列表
export const getKnowledge = (params) => { return jsonreq("get",httpUrl+"api/se_enterprise/knowledge_list?"+params) };
//企业设置
export const companySet = (data) => { return jsonreq("post",httpUrl+"api/se_enterprise/company_update",data) }
//用户下的企业列表
export const getUserCompany = (params) => { return jsonreq("get",httpUrl+"api/se_enterprise/list"+params) };
//企业成员列表
export const getMemberCompany = (params) => { return jsonreq("get",httpUrl+"api/se_enterprise/enterprise_member?"+params) };
//添加企业成员
export const addCompanyMember = (data) => { return jsonreq("post",httpUrl+"api/se_enterprise/enterprise_member",data) }
//企业成员审核


//AI知识库
//获取知识库菜单栏数据
export const getKnowledgeMenus = (params) => { return jsonreq("get",memberUrl+"agent/groups/?"+params) };
// 获取智能体数据
export const getKnowledgeModel = (params) => { return jsonreq("get",memberUrl+"agent/models/?"+params) };
// 删除智能体分组/智能体
export const deleteModel = (params) => { return jsonreq("delete",memberUrl+"agent/models/",params) };
// 修改智能体分组名称/智能体描述http://127.0.0.1:8060/agent/agent_group_edit/
export const editModel = (params) => { return jsonreq("post",memberUrl+"agent/agent_group_edit/",params) };
// 添加智能体分组名称/智能体
export const createdModel = (params) => { return jsonreq("post",memberUrl+"agent/models/",params) };
// 获取图片库数据
export const getKnowledgeImage = (params) => { return jsonreq("get",memberUrl+"agent/pictures/?"+params) };
// 删除图片库分组/图片
export const deleteImage = (params) => { return jsonreq("delete",memberUrl+"agent/pictures/",params) };
// 修改图片库分组名称/图片描述
export const editImage = (params) => { return jsonreq("put",memberUrl+"agent/pictures/",params) };
// 添加图片库分组名称/图片描述
export const createdImage = (params) => { return jsonreq("post",memberUrl+"agent/pictures/",params) }
// 获取文档库数据
export const getKnowledgeDocument = (params) => { return jsonreq("get",memberUrl+"agent/documents/?"+params) };
// 删除文档库分组/文档
export const deleteDocument = (params) => { return jsonreq("delete",memberUrl+"agent/documents/",params) };
// 修改文档库分组名称/文档描述
export const editDocument = (params) => { return jsonreq("put",memberUrl+"agent/documents/",params) };
// 添加文档库分组名称/文档
export const createdDocument = (params) => { return jsonreq("post",memberUrl+"agent/documents/",params) };
// 获取网址库数据
export const getKnowledgeWebsite = (params) => { return jsonreq("get",memberUrl+"agent/websites/?"+params) };
// 删除网址库分组/网址
export const deleteWebsite = (params) => { return jsonreq("delete",memberUrl+"agent/websites/",params) };
// 修改网址库分组名称/网址描述
export const editWebsite = (params) => { return jsonreq("put",memberUrl+"agent/websites/",params) };
// 添加网址库分组名称/网址描述
export const createdWebsite = (params) => { return jsonreq("post",memberUrl+"agent/websites/",params) };

// 获取用户创建的分组信息
export const getUserGroups = (params) => { return jsonreq("get",memberUrl+"agent/groups/?"+params) };
// 获取用户创建的分组分类信息
export const getUserGroupsModel = (params) => { return jsonreq("get",memberUrl+"agent/groups_model/?"+params) };

//获取AI智能体分组信息http://127.0.0.1:8060/
export const getModelGroups = (params) => { return jsonreq("get",memberUrl+"agent/agent_groups/?"+params) };

//AI智能体对话
export const chatAgent = (params) => { return jsonreq("post",memberUrl+"agent/chat/",params) };
