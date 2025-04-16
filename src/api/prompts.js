import axios from 'axios';
import { req, picturess, jsonreq } from './axiosFun';
import httpUrls from './requestURL'
let {httpUrl, memberUrl, loginUrl} = httpUrls

// 指令集
export const typeList = (params) => {
    return req('get', httpUrl+'api/prompts/type_list', '')
}

// 热词推荐
export const recommend = (params) => {
    return req('get', httpUrl+'api/prompts/recommend', '')
}

// 类型模板
export const prompts = (params) => {
    return req('get', httpUrl+'api/prompts/prompts?' + params)
}

// 获取模板指令次数
export const promptsRecommend = (params) => {
    return req('post', httpUrl+'api/prompts/recommend', '')
}

// 点赞点踩
export const chatLikes = (params) => {
    return req('put', httpUrl + 'api/chat/chat_likes', params)
}
export const chatLikesNew = (params) => {
    return req('put', httpUrl + 'api/chat/chat_image', params)
}
// 修改title
export const updateTitle = (params) => {
    return req('put', httpUrl + 'api/chat/update_title', params)
}

// 百度绘画请求提交
export const getBaiduImage = (params) => {
    return req('post', httpUrl + 'api/chat/baidu_ernie_image', params)
}

// 百度绘画的结果
export const baiduErnieImage = (params) => {
    return req('get', httpUrl + 'api/chat/baidu_ernie_image?task_id='+ params.task_id + '&action_type='+ params.action_type)
}

// 专业水平/地位
export const expertiseLevel = (data) => {
    return req('post', memberUrl + 'pay/expertise_level/', data)
}

// 行业
export const payIndustry = () => {
    return req('get', memberUrl + 'pay/industry/')
}

// 操作模块
export const payModules = (data) => {
    return req('post', memberUrl + 'pay/modules/', data)
}

// 从业时间
export const occuDuration = (data) => {
    return req('post', memberUrl + 'pay/occu_duration/', data)
}

// 职业
export const occupation = (data) => {
    return req('post', memberUrl + 'pay/occupation/', data)
}

// 问题集
export const getQuestion = (data) => {
    return req('post', memberUrl + 'pay/questions_set/', data)
}

// 问题集
export const getOneQuestion = (data) => {
    return req('get', memberUrl + 'pay/questions_set/?' + data)
}


// 子职业/类型
export const secOccupation = (data) => {
    return req('post', memberUrl + 'pay/sec_occupation/', data)
}

export const searchQuestionsSet = (data) => {
    return jsonreq('post', memberUrl + 'pay/questions_set_search/', data)
}

// 获取版本信息
export const version = (data) => {
    return picturess('post', loginUrl  + 'api/user/version', data)
}

// 用户反馈
export const problemFeedback = (data) => {
    return jsonreq('post', loginUrl + 'api/user/problem_feedback', data)
}

// 上传图片
export const ossUpload = (data) => {
    return picturess('post', httpUrl + 'api/user/oss_upload', data)
}

// 自定义问题集
export const questionConfig = (data) => {
    return req('post', memberUrl + 'pay/question_config/', data)
}

// 问答广场列表
export const chatSquareList = (data) => {
    return req('get', httpUrl + 'api/chat/chat_square_rand_list?' + data)
}

// 分享到问答广场
export const chareSquare = (data) => {
    return jsonreq('post', httpUrl + 'api/chat/chat_square', data)
}

// 问答详情
export const chaserDetail = (data) => {
    return req('get', httpUrl + 'api/chat/chat_square/' + data)
}

// tab栏
export const applitetab = () => {
    return jsonreq('get', memberUrl + 'pay/tab/')
}