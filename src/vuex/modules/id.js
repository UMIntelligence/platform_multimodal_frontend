const id = {
  namespaced: true,
  state: {
    AIname: 0, // AI的类型 // 35：0  40：1  文心一言：4  讯飞星火：5
    GPT35sessionCode: '', // GPT35的session_code
    GPT40sessionCode: '', // GPT40的session_code
    DELLE2sessionCode: '', // DELL·E 2的session_code
    BAIDUsessionCode: '', // 百度绘画的session_code
    remindBool:false,
  },
  mutations: {
    set_remind(state, remindBool) {
      console.log(remindBool,'状态管理')
      state.remindBool = remindBool
    },
    setAIName(state, AIName) {
      state.AIname = AIName
    },
    // GPT35的session_code
    SET_35SESSION_CODE(state, GPT35sessionCode) {
      state.GPT35sessionCode = GPT35sessionCode
    },
    // GPT40的session_code
    SET_40SESSION_CODE(state, GPT40sessionCode) {
      state.GPT40sessionCode = GPT40sessionCode
    },
    // DELL的session_code
    SET_DELLSESSION_CODE(state, DELLE2sessionCode) {
      state.DELLE2sessionCode = DELLE2sessionCode
    },
    // 百度绘画的session_code
    SET_BAIDUSESSION_CODE(state, BAIDUsessionCode) {
      state.BAIDUsessionCode = BAIDUsessionCode
    },
  },
  actions: {
    SET_REMINDT({commit}, bool) {
      commit('set_remind', bool)
    },
    SET_REMINDF({commit}, bool) {
      commit('set_remind', bool)
    },
    setAIChatname({commit}, chatName) {
      commit('setAIName', chatName)
    },
    // GPT35的session_code
    changeGPT35SessionCode({commit}, GPT35sessionCode) {
      commit('SET_35SESSION_CODE', GPT35sessionCode)
    },
    // GPT40的session_code
    changeGPT40SessionCode({commit}, GPT40sessionCode) {
      commit('SET_40SESSION_CODE', GPT40sessionCode)
    },
    // DELL的session_code
    changeDELLE2SessionCode({commit}, DELLE2sessionCode) {
      commit('SET_DELLSESSION_CODE', DELLE2sessionCode)
    },
    // 百度绘画的session_code
    changeBaiduSessionCode({commit}, BAIDUsessionCode) {
      commit('SET_BAIDUSESSION_CODE', BAIDUsessionCode)
    },
  }
}


export default id