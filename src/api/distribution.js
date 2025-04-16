import { loginreq, req, jsonreq, picturess } from './axiosFun';
import httpUrls from './requestURL'
let {httpUrl, memberUrl, loginUrl} = httpUrls

//兑换算力
export const exchange = (data) => {
  return req('post', loginUrl + 'api/user/balance_exchange', data)
}

// 获取分享二维码
export const queryQRCode = (data) => {
  return req('post', loginUrl + 'api/user/add_qr_code', {q_type: data.q_type}, data.source)
}

// 分销详情首页
export const distributionDetails = () => {
  return req('get', loginUrl + 'api/user/distribution_details')
}

// 我的成员列表
export const mineMembers = (data) => {
  return req('get', loginUrl + 'api/user/my_members?' + data)
}

// 分佣明细列表
export const commissionHistory = (data) => {
  return req('get', loginUrl + 'api/user/commission_history?' + data)
}

// 银行卡列表
export const getBankCardList = () => {
  return req('get', loginUrl + 'api/user/bank_card')
}

// 添加银行卡
export const setBankCard = (data) => {
  return req('post', loginUrl + 'api/user/bank_card', data)
}

// 提现记录
export const withdrawal = (data) => {
  return req('get', loginUrl + 'api/user/withdrawal?' + data)
}

// 发起提现
export const startWithdrawal = (data) => {
  return req('post', loginUrl + 'api/user/withdrawal', data)
}

// 获取银行卡所属银行
export const getBack = (card) => {
  return req('get', loginUrl + 'api/user/get_back?card_number=' + card)
}