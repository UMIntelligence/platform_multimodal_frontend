import { guessLogin } from '../../api/chatMG'

export default {
  namespaced: true,
  state: {
    user: false,
    routerIndex: 1, // 左侧导航栏的下标，从 1 开始
    chatListLength: 0, // 当前会话列表的长度
    userInfoData: null, // 用户id
    userDataInfo: null, // 用户信息
    noticeReadAll: 1, // 公告全部已读 1:已读 0:未读
    mainLeft: '240px', // 内容区域距离左侧的距离
    enterpriseId: -1, // 企业id，为-1时代表个人
    enterpriseIcon: '/satic', // 企业图标
  },
  mutations: {
    // 登录
    login(state, user) {
      state.user = user;
      localStorage.setItem("userInfo", user);
    },
    // 退出
    logout(state, user) {
      state.user = "";
      localStorage.setItem("userInfo", "");
    },
    SET_ROUTER_INDEX(state, routerIndex) {
      state.routerIndex = routerIndex
    },
    SET_CHAT_LIST_LENGTH(state, chatListLength) {
      state.chatListLength = chatListLength
    },
    SET_INFO(state, userInfoData) {
      state.userInfoData = userInfoData
    },
    SET_NOTICE_READ_ALL(state, noticeReadAll) {
      state.noticeReadAll = noticeReadAll
    },
    SET_MAIN_LEFT(state, mainLeft) {
      state.mainLeft = mainLeft
    },
    SET_USER_DATA(state, userDataInfo) {
      state.userDataInfo = userDataInfo
    },
    SET_ENTERPRISE_ID(state, enterpriseId) {
      state.enterpriseId = enterpriseId
    },
    SET_ENTERPRISE_ICON(state, enterpriseIcon) {
      state.enterpriseIcon = enterpriseIcon
    }
  },
  actions: {
    changeRouterIndex({ commit }, routerIndex) {
      commit('SET_ROUTER_INDEX', routerIndex)
    },
    changeChatListLength({ commit }, chatListLength) {
      commit('SET_CHAT_LIST_LENGTH', chatListLength)
    },
    changeInfo({ commit }, userInfoData) {
      console.log('用户信息改变')
      commit('SET_INFO', userInfoData)
    },
    changeNoticeReadAll({commit}, noticeReadAll) {
      commit('SET_NOTICE_READ_ALL', noticeReadAll)
    },
    changeMainLeft({commit}, mainLeft) {
      commit('SET_MAIN_LEFT', mainLeft)
    },
    changeUserDataInfo({commit}, userDataInfo) {
      commit('SET_USER_DATA', userDataInfo)
    },
    GuessLogin({commit}, tiem) {
      return new Promise((resolve, reject) => {
        guessLogin({ time: new Date().getTime() }).then(res => {
          if (res.code == 20000) {
            commit('SET_USER_DATA', res.data)
            localStorage.setItem('userInfo', JSON.stringify(res.data))
            resolve(res.data)
          } else {
            reject(res.msg)
          }
        }).catch(error => {
          reject(error)
        })
      })
    },
    changeEnterpriseId({commit}, enterpriseId) {
      commit('SET_ENTERPRISE_ID', enterpriseId)
    },
    changeEnterpriseIcon({commit}, enterpriseIcon) {
      commit('SET_ENTERPRISE_ICON', enterpriseIcon)
    }
  },

}