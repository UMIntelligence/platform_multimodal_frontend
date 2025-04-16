import { loginreq, req, jsonreq, picturess } from './axiosFun';
import httpUrls from './requestURL'
let {httpUrl, memberUrl, loginUrl} = httpUrls

// 数字人用户信息
export const digitalHumanExperience = (data) => {
  return jsonreq('post', httpUrl + 'api/sv_voice/digital_human_experience', data)
}

// 数字人文件上传
export const digitalHumanUploadFile = (data) => {
  return jsonreq('post', httpUrl + 'api/sv_voice/digital_human_file', data)
}

// 数字人文件列表
export const digitalHumanFileList = (data) => {
  return jsonreq('get', httpUrl + 'api/sv_voice/digital_human_file?' + data)
}

// 数字人文件删除
export const digitalHumanDeleteFile = (data) => {
  return jsonreq('delete', httpUrl + 'api/sv_voice/digital_human_file/' + data)
}

// 数字人创建
export const digitalHumanClone = (data) => {
  return jsonreq('post', httpUrl + 'api/sv_voice/digital_human_clone', data)
}

// 创建的数字人列表
export const digitalHumanCloneList = (data) => {
  return jsonreq('get', httpUrl + 'api/sv_voice/digital_human_clone?' + data)
}

// 我的数字人列表
export const myDigitalHuman = (data) => {
  return jsonreq('get', httpUrl + 'api/sv_voice/my_digital_human?' + data)
}

// 视频创作记录
export const myLiveVideo = (data) => {
  return jsonreq('get', httpUrl + 'api/sv_voice/my_live_video?' + data)
}

// 声音克隆记录
export const voiceGenerateHistory = (data) => {
  return jsonreq('get', httpUrl + 'api/sv_voice/voice_generate_history?' + data)
}

// 声音模型列表
export const customizedVoiceView = (data) => {
  return jsonreq('get', httpUrl + 'api/sv_voice/customized_voice_view?' + data)
}

// 口播视频创建
export const submitDigitalHumanProject = (data) => {
  return jsonreq('post', httpUrl + 'api/sv_voice/digital_human_project' , data)
}

// 获取阿里实时token
export const getaliToken = () => {
  return jsonreq('get', httpUrl + 'api/sv_voice/ali_token')
}

// 获取声音总时长
export const getDuration = (data) => {
  return jsonreq('post', httpUrl + 'api/sv_voice/get_duration', data)
}

// 口播视频项目列表
export const DigitalHumanProjectView = (data) => {
  return jsonreq('get', httpUrl + 'api/sv_voice/DigitalHumanProjectView?' + data)
}

// 获取形象视频的封面
export const GgetVideoCover = (data) => {
  return jsonreq('post', httpUrl + 'api/sv_voice/GgetVideoCover', data)
}

// 删除口播视频（草稿）
export const digitalHumanProject = (data) => {
  return jsonreq('delete', httpUrl + 'api/sv_voice/digital_human_project', data)
}

// 重新训练口播视频
export const resetTrainMyLiveVideo = (data) => {
  return jsonreq('put', httpUrl + 'api/sv_voice/my_live_video', data)
}

// 数字人详情
export const digitalHumanCloneDetail = (data) => {
  return jsonreq('get', httpUrl + 'api/sv_voice/digital_human_clone/' + data)
}

// 口播视频详情
export const digitalHumanProjectDetail = (data) => {
  return jsonreq('get', httpUrl + 'api/sv_voice/digital_human_project/' + data)
}

// 口播视频修改
export const digitalHumanEditProject = (code, data) => {
  return jsonreq('put', httpUrl + 'api/sv_voice/digital_human_project/' + code, data)
}

// 获取时长
export const getTotalAmount = (data) => {
  return jsonreq('post', memberUrl + 'pay/get_total_amount/', data)
}

// 数字人修改
export const editDigitalHumanClone = (code, data) => {
  return jsonreq('put', httpUrl + 'api/sv_voice/digital_human_clone/' + code, data)
}

// 获取朗读文字
export const getReadText = () => {
  return jsonreq('get', httpUrl + 'api/sv_voice/customized_voice')
}

// 音频检测
export const detectionCustomizedVoice = (data) => {
  return jsonreq('post', httpUrl + 'api/sv_voice/customized_voice', data)
}

// 创建音频
export const customizedVoiceCreateView = (data) => {
  return jsonreq('post', httpUrl + 'api/sv_voice/customized_voice_view', data)
}

// 声音克隆的详情
export const customizedVoiceDetailView = (data) => {
  return jsonreq('get', httpUrl + 'api/sv_voice/customized_voice_view/' + data)
}

// 克隆声音
export const voiceCloneGenerateHistory = (data) => {
  return jsonreq('post', httpUrl + 'api/sv_voice/voice_generate_history', data)
}