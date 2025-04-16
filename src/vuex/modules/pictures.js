
export default {
  namespaced: true,
  state: {
    /**
     * 线上图片地址
     */
    officialAccount: '', // 公众号
    services: '', // 客服
    mini: '', // 小程序
    contactService: '' // 联系客服
  },
  mutations: {
    SET_OFFICIAL_ACCOUNT(state, officialAccount) {
      state.officialAccount = officialAccount
    },
    SET_SERVICES(state, services) {
      state.services = services
    },
    SET_MINI(state, mini) {
      state.mini = mini
    },
    SET_CONTACT_SERVICE(state, contactService) {
      state.contactService = contactService
    },
  },
  actions: {
    changeOfficialAccount({commit}, officialAccount) {
      commit('SET_OFFICIAL_ACCOUNT', officialAccount)
    },
    changeSerives({commit}, services) {
      commit('SET_SERVICES', services)
    },
    changeini({commit}, mini) {
      commit('SET_MINI', mini)
    },
    changeContactSeriver({commit}, contactService) {
      commit('SET_CONTACT_SERVICE', contactService)
    },
  }
}