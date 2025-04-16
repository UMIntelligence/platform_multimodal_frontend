import { loginreq, req, jsonreq, picturess } from './axiosFun';
import httpUrls from './requestURL'
let {httpUrl, memberUrl, loginUrl} = httpUrls;

//获取引擎
export const getEngine = (params) => {
  return jsonreq('get', httpUrl + 'api/sv_voice/get_speech_engine?'+params)
}

// 获取音色
export const getTimbre = (params) => {
  return jsonreq('get', httpUrl + 'api/sv_voice/get_speech_voice?' + params)
}
//合成历史
export const getVoiceHistory = (params) => {
  return jsonreq('get', httpUrl + 'api/sv_voice/text_to_speech?' + params)
}
//语音合成
export const voiceSynthesis = (data) => {
  return jsonreq('post', httpUrl + 'api/sv_voice/text_to_speech', data)
}
//语音合成结果查询
export const getVoiceResult = (params) => {
  return jsonreq('get', httpUrl + 'api/sv_voice/get_speech_result?' + params)
}
//语音合成详情
export const getVoiceDetail = (params) => {
  return jsonreq('get', httpUrl + 'api/sv_voice/text_to_speech/' + params)
}
//语音合成详情
export const deleteVoiceDetail = (params) => {
  return jsonreq('delete', httpUrl + 'api/sv_voice/text_to_speech/' + params)
}

//声音克隆·新

//查询用户克隆次数
export const getCloneNumber = (params) => {
  return jsonreq('get', httpUrl + 'api/sv_voice/get_vid_number')
}
//声音克隆订单列表
export const audioCloneOrder = (params) => {
  return jsonreq('post', httpUrl + 'api/sv_voice/volcengine_voice_train', params)
}
//训练创建声音克隆
export const createdAudioClone = (params) => {
  return jsonreq('post', httpUrl + 'api/sv_voice/volcengine_voice_train', params)
}
//获取训练记录列表
export const getAudioClone = (params) => {
  return jsonreq('get', httpUrl + 'api/sv_voice/volcengine_voice_train?'+params)
}
//重新训练
export const editAudioClone = (params) => {
  return jsonreq('put', httpUrl + 'api/sv_voice/volcengine_voice_train?',params)
}
//启用音色
export const firingTimbre = (params) => {
  return jsonreq('put', httpUrl + 'api/sv_voice/enable_voice',params)
}
//声音余量查询
export const voiceIdQuery = (params) => {
  return jsonreq('get', httpUrl + 'api/sv_voice/VoiceIdQuery',params)
}
