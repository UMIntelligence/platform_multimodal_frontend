import { loginreq, req, jsonreq, picturess } from './axiosFun';
import httpUrls from './requestURL'
let {httpUrl, memberUrl, loginUrl} = httpUrls

// 创建语音转写任务'http://7f402cd8.vip.cpolar.top/'
export const fileIdentifier = (data) => {
  return req('post', httpUrl + 'api/sv_voice/file_identifier', data)
}

// 语音识别结果
export const resultFileIdentifier = (data) => {
  return req('get', httpUrl + 'api/sv_voice/file_identifier?' + data)
}

// 识别结果保存
export const audioResultSubmit = (data) => {
  return req('post', httpUrl + 'api/sv_voice/speech_recognition', data)
}

// 语音识别的历史列表
export const audioHistoryList = (data) => {
  return req('get', httpUrl + 'api/sv_voice/speech_recognition?' + data)
}

// 编辑语音识别
export const audioEditResult = (data, speech_code) => {
  return jsonreq('put', httpUrl + 'api/sv_voice/speech_recognition/' + speech_code, data)
}

// 语音识别删除
export const audioDelete = (data) => {
  return req('delete', httpUrl + 'api/sv_voice/speech_recognition/' + data.speech_code)
}

// pcm转MP3
export const pcmToMP3 = (data) => {
  return jsonreq('post', loginUrl + 'api/user/pcm2wav', data)
}