import axios from 'axios';
import { loginreq, req, jsonreq, picturess } from './axiosFun';
import httpUrls from './requestURL'
let {httpUrl, memberUrl, loginUrl, membersUrl} = httpUrls


// <-------------AI实验室音频/视频----------------->
// 生成音频/视频
export const create_Audio_Video = (data) => { return jsonreq("post", httpUrl+"api/sv_voice/generate_music_video", data) };
// 查询生成状态
export const get_Audio_Video_status = (data) => { return jsonreq("get", httpUrl+"api/sv_voice/generate_music_video?trace_code="+data) };
//获取历史列表
export const get_Audio_Video_list = (data) => { return jsonreq("get", httpUrl+"api/sv_voice/get_music_video_record?"+data) };
//删除历史
export const delete_Audio_Video = (data) => { return jsonreq("delete", httpUrl+"api/sv_voice/get_music_video_record", data) };
//获取角色列表
export const get_RoleList = (data) => { return jsonreq("get", httpUrl+"api/sv_voice/get_character", data) };
//修改音视频点赞状态
export const change_Audio_Video_good = (data) => { return jsonreq("put", httpUrl+"api/sv_voice/generate_music_video", data) };
//获取音视频推荐接口
export const get_Audio_Video_recommend = (data) => { return jsonreq("get", httpUrl+"api/sv_voice/get_creator_materials?type="+data) };


//// 支付宝支付
export const shoppingServer = (data) => { return req("post", memberUrl+"pay/contact/", data) };
// <-------------登录----------------->

// 获取实名认证跳转链接 
export const getRealName = (params) => { return jsonreq("post", loginUrl+"api/user/real_name_authentication", params) };
// 查询实名结果
export const resultRealName = (params) => { return jsonreq("put", loginUrl+"api/user/real_name_authentication", params) };

// 用户名注册接口 
export const register = (params) => { return loginreq("post", loginUrl+"api/user/user_name_register", params) };

// 用户名登录接口 
export const login = (params) => { return loginreq("post", loginUrl+"api/user/user_name_login", params) };

// 游客登录接口 
export const guessLogin = (params) => { return loginreq("post", loginUrl+"api/user/create_temp_user", params) };

// 获取用户信息
export const getUserInfo = (params) => { return req("get", loginUrl+"api/user/get_user_info", params) };

// 获取手机验证码
export const getCode = (params) => { return req("post", loginUrl+"api/user/send_code", params) };

// 获取手机验证码
export const getImageCode = (params) => { return jsonreq("post", loginUrl+"api/user/ImageCode", params) };

// 手机号注册
export const phoneRegister = (params) => { return req("post", loginUrl+"api/user/mobile_register", params) };

// 检验手机号是否注册
export const isPhoneRegister = (params) => { return req("get", loginUrl+"api/user/mobile_register?mobile="+ params.mobile) };

// 手机号登录
export const phoneLogin = (params) => { return req("post", loginUrl+"api/user/mobile_login", params) };

// 获取微信登陆码
export const getWxCode = (params) => { return req("get", loginUrl+"api/user/wx_login", params) };

// 获取微信登陆状态
export const wxLogin = (params) => { return req("post", loginUrl+"api/user/wx_login", params) };

// 修改用户名
export const editName = (params) => { return req("post", loginUrl+"api/user/user_info", params) };

// 绑定手机
export const bindPhone = (params) => { return req("post", loginUrl+"api/user/set_mobile", params) };

// 绑定手机号
export const registerBindPhone = (params) => { return req('post', loginUrl + 'api/user/wx_login_add', params) }


// 退出接口
// export const logout = (params) => { return logoutreq("post", loginUrl+"/api/auth/logout/", params) };

// <-------------对话----------------->

// 用创建会话
export const creatChat = (params) => { return req("post", httpUrl+"api/chat/chat_session", params) };

// dell2绘画
export const creatDraw = (params) => { return req("post", httpUrl+"api/chat/image_generation", params) };

// 百度绘画
export const baiduDraw = (params) => { return jsonreq("post", httpUrl+"api/chat/async_text_to_image", params) };
//百度绘画查询结果
export const newbaiduDrawDetail = (params) => { return jsonreq("get", httpUrl+"api/chat/async_text_to_image?"+params) };


// 获取聊天列表
export const robotChatList = (params) => { return req("get", httpUrl + "api/chat/chat_session?" + params) };

// 获取聊天列表
export const chatList = (params) => { return req("get", httpUrl+"api/chat/chat_session?"+ params) };

// 获取人物聊天列表
export const roleChatList = (params) => { return req("get", httpUrl+"api/chat/chat_session?page_size="+ params.page_size +'&page='+ params.page + '&title=' +params.title + '&chat_type=' +params.chat_type + '&is_question=1') };

// 获取聊天详情
export const chatDetail = (params) => { return req("get", httpUrl+"api/chat/chat_session/"+ params) };
export const chatDetailNew = (params) => { return req("get", httpUrl+"api/chat/chat_image/"+ params) };


// 会话删除
// export const ChatDelete = (params) => { return req("delete", httpUrl+"/api/chat/chat_session/"+ params) };

// 会话删除
export const ChatDelete = (params) => { return jsonreq("delete", httpUrl+"api/chat/chat_session?session_codes="+ params.session_codes) };
export const ChatDeleteNew = (params) => { return jsonreq("delete", httpUrl+"api/chat/chat_image?image_codes="+ params.image_codes) };

// 会话全部删除
export const chatAllDelete = (params) => { return req("delete", httpUrl+"api/chat/chat_session/"+ params) };

// mj等待队列查询
export const mjWaitingQuery = () => { return req('get', httpUrl + 'api/chat/mj_waiting_query') }

// MJ绘画
export const mjCreateImage = (data) => { return jsonreq('post', httpUrl + 'api/chat/mj_create_image', data) }

// MJ绘画结果查询
export const mjGetImageEnd = (data) => { return req('get', httpUrl + 'api/chat/mj_create_image?tag=' + data) }

// SD绘画
export const SDCreateImage = (data) => { return jsonreq('post', httpUrl + 'api/chat/sd_create_image', data) }

// SD绘画结果查询
export const SDResultImage = (params) => { return req("get", httpUrl+"api/chat/async_text_to_image?" + params) };

// SD队列信息
export const getSDQueue = () => { return req('get', httpUrl + 'api/chat/get_queue') }

// SD模型接口
export const SDModel = () => { return req('get', httpUrl + 'api/chat/get_sd_model') }

//通义万相，火山引擎绘画
export const chatCreateImage = (data) => { return jsonreq('post', httpUrl + 'api/chat/text_to_image', data) }

// 绘画记录
export const drawChatHistroy = (data) => {
  return req('get', httpUrl + 'api/chat/image_list?' + data)
}

export const drawChatHistroyNew = (data) => {
  return req('get', httpUrl + 'api/chat/chat_image?' + data)
}

// 机器人训练
export const matchContextAssistant = (data) => {
  return jsonreq('post', membersUrl + 'digital_employee/match_context_assistant/', data)
}

// 导师训练
export const mentorMatchContext = (data) => {
  return jsonreq('post', memberUrl + 'assistant/match_context/', data)
}

// <-------------会员----------------->
// 获取会员等级列表
export const products = (params) => { return jsonreq("post", memberUrl+"pay/products/", params) };

// 微信支付
export const wechat = (params) => { return req("post", memberUrl+"pay/form_sheet_wechat/", params) };

// 支付宝支付
export const alipay = (params) => { return req("post", memberUrl+"pay/form_sheet_alipay/", params) };

// 支付轮询
export const payResult = (params) => { return req("post", memberUrl+"pay/pay_result/", params) };

// 支付订单列表
export const payOrder = (params) => { return jsonreq("post", memberUrl+"pay/orders/", params) };

// 删除订单
export const delOrder = (params) => { return jsonreq("delete", memberUrl+"pay/orders/", params) };

// 清空tokens
export const clearToken = (params) => { return req("post", memberUrl+"pay/tokens/", params) };

export const resetPay = (params) => { return req("post", memberUrl+"pay/repay/", params) };

// 获取定价规则
export const pricingRules = (data) => { return picturess('post', memberUrl + 'pay/billing_center/',data) }

// 计费中心
export const billingCenter = (data) => { return picturess('post', memberUrl + 'pay/billing_center/', data) }

// 获取推荐画集
export const drawingSetRecommend = () => { return picturess('get', memberUrl + 'pay/drawing_set_recommend/') }

// 获取推荐问题集
export const questionSetRecommend = () => { return picturess('get', memberUrl + 'pay/question_set_recommend/') }

//<-------------------业务合作------------>
//业务合作
export const business = (params) => { return req("post", memberUrl+"pay/contact/", params) };
//卡密兑换
export const cardChange = (params) => { return req("post", memberUrl+"pay/activate_code_consume/", params) };


// 获取会员信息
// export const members = (params) => { return req("post", memberUrl+"/pay/members/", params) };


// 获取图片地址
export const pictures = () => {
  return picturess('get', memberUrl + 'pay/pictures/')
}

// 文本翻译
export const textTranslate = (data) => {
  return jsonreq('post', httpUrl + 'api/chat/text_translate', data)
}


/**
 * 企业定制
 */
// 机器人训练
export const consumeDigitalEmployee = (data) => {
  return jsonreq('post', membersUrl + 'digital_employee/match_context_ce/', data)
}

// 标签选项
export const enterpriseLabel = (data) => {
  return jsonreq('get', httpUrl + 'api/se_enterprise/enterprise_label?label_type=' + data)
}

// 企业营销详情
export const enterpriseRetrieve = (data) => {
  return jsonreq('get', httpUrl + 'api/se_enterprise/retrieve?' + data)
}

// 企业基本信息保存/修改
export const companyBasicMsg = (data) => {
  return jsonreq('post', httpUrl + 'api/se_enterprise/company_create_or_update', data)
}

// 企业产品信息保存/修改
export const companyProductMsg = (data) => {
  return jsonreq('post', httpUrl + 'api/se_enterprise/project_create_or_update', data)
}

// 企业咨询信息保存/修改
export const companyNewsMsg = (data) => {
  return jsonreq('post', httpUrl + 'api/se_enterprise/information_create_or_update', data)
}

// 企业知识库信息保存/修改
export const companyKnowledgeMsg = (data) => {
  return jsonreq('post', httpUrl + 'api/se_enterprise/knowledge_create_or_update', data)
}

// 用户企业列表左侧导航栏
export const userCompanyList = () => {
  return jsonreq('get', httpUrl + 'api/se_enterprise/list')
}

// 企业设置
export const companyUpdate = (data) => {
  return jsonreq('post', httpUrl + 'api/se_enterprise/company_update', data)
}

// 知识库列表
export const knowledgeList = (data) => {
  return jsonreq('get', httpUrl + 'api/se_enterprise/knowledge_list?' + data)
}

// 企业成员列表
export const enterpriseMemberList = (data) => {
  return jsonreq('get', httpUrl + 'api/se_enterprise/enterprise_member?' + data)
}

// 邀请成员
export const enterpriseAddember = (data) => {
  return jsonreq('post', httpUrl + 'api/se_enterprise/enterprise_member', data)
}

// 成员审核
export const enterpriseProcessMember = (data) => {
  return jsonreq('put', httpUrl + 'api/se_enterprise/enterprise_member/' + data)
}

// 删除成员
export const enterpriseDeleteMember = (data) => {
  return jsonreq('delete', httpUrl + 'api/se_enterprise/enterprise_member/' + data)
}

// 创建数字员工
export const digitalAddClerk = (data) => {
  return jsonreq('post', httpUrl + 'api/se_enterprise/digital_clerk', data)
}

// 数字员工列表
export const digitalClerkList = (data) => {
  return jsonreq('get', httpUrl + 'api/se_enterprise/digital_clerk?' + data)
}

// 修改数字员工
export const digitalUpdataClerk = (code, data) => {
  return jsonreq('put', httpUrl + 'api/se_enterprise/digital_clerk/' + code, data)
}

// 删除数字员工
export const digitaldeleteClerk = (data) => {
  return jsonreq('delete', httpUrl + 'api/se_enterprise/digital_clerk/' + data)
}

/**
 *  用户新建问题集
 */
// 获取用户创建问题集列表
export const getUserModelsList = (data) => {
  return req('get', memberUrl + 'assistant/user_models/?' + data)
}

// 用户创建问题集
export const createUserModels = (data) => {
  return jsonreq('post', memberUrl + 'assistant/user_models/', data)
}

// 编辑问题集和角色
export const editUserModels = (data) => {
  return jsonreq('put', memberUrl + 'assistant/user_models/', data)
}

// 删除问题
export const deleteUserModels = (data) => {
  return jsonreq('delete', memberUrl + 'assistant/user_models/', data)
}

// 获取创建的问题集详情
export const getUserModelsDetail = (data) => {
  return jsonreq('get', memberUrl + 'assistant/user_models_content/?' + data)
}


// 修改头像
export const setAvatarUrl = (data) => {
  return req('post', loginUrl + 'api/user/set_avatar_url', data)
}

// 修改密码
export const updatePassword = (data) => {
  return req('post', loginUrl + 'api/user/update_password', data)
}

// 最近打开
export const footprint = (data) => {
  return jsonreq('get', loginUrl +  'api/user/footprint?' + data)
}

// 保存最近打开
export const submitFootprint = (data) => {
  return jsonreq('post', loginUrl + 'api/user/footprint', data)
}

// 删除最近使用
export const deleteFootprint = (data) => {
  return jsonreq('delete', loginUrl + 'api/user/footprint?' + data)
}

// 对话同步返回(用于获取每个页面的head里的描述)
export const getDesc = (params) => { return jsonreq("post", httpUrl+"api/chat/open_chat", params) };