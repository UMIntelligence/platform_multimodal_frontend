export default {
  namespaced: true,
  state: {
    indexDom:"",  //首页节点
    phoneDialogVisible:false,   //绑定手机号弹框
    chatAIModel:"umi-pro-4k",   //顶部选择对话模型
    selectIfication:"fun",  //资讯分类
    isShowNotice:true,   //通知栏
    selectChat:null,  //选中对话模型/从首页进入
    worksetLabel:'对话模型',
    knowledgeLabel:'图片库',    //选中知识库(菜单栏)
    isShowRightNav:true,  //历史记录收起按钮
    isShowSidbar: true,
    noticeList: [], // 公告数组
    carouselMessage: [], // 可轮播的公告数组
    carouselMessageState: false, // 是否还有未读的公告
    submitCompany: '2', // 企业信息是否已经保存 1为未保存
    companyDataMessage: {}, // 已经填写的企业信息
    chatAIList: [
      {value: 4, label: '文心一言'},
      {value: 5, label: '讯飞星火'},
      {value: 8, label: 'ChatGLM'},
      {value: 0, label: 'AI35'},
      {value: 1, label: 'AI40'},
      {value: 7, label: 'Claude'},
    ],
    drawAIList: [
      {value: 9, label: 'Stable Diffusion'},
      {value: 6, label: 'Midjourney'},
      {value: 2, label: 'DALL·E 2'},
      {value: 3, label: '百度绘画'}
    ],
    applicationCenterId: 4, // 应用中心的模块id
    
  },
  mutations: {
    SETChatAIModel(state,chatAIModel){
      state.chatAIModel = chatAIModel
    },
    SET_Index_Dom(state,indexDom){
      state.indexDom = indexDom
    },
    SET_phoneDialogVisible(state,phoneDialogVisible){
      state.phoneDialogVisible = phoneDialogVisible
    },
    SET_SECTLECTCHAT(state,selectChat){
      // console.log(selectChat,'vuex')
      state.selectChat = selectChat
    },
    SET_Notice(state,isShowNotice) {
      state.isShowNotice = isShowNotice
    },
    SET_worksetLabel(state,worksetLabel) {
      state.worksetLabel = worksetLabel
    },
    SET_knowledgeLabel(state,knowledgeLabel) {
      state.knowledgeLabel = knowledgeLabel
    },
    SET_IsShowRightNav(state,isShowRightNav) {
      state.isShowRightNav = isShowRightNav
    },
    SET_selectIfication(state,a){
      state.selectIfication = a;
    },
    SET_SHOW_SIDBAR(state, isShowSidbar) {
      state.isShowSidbar = isShowSidbar
    },
    SET_NOTICE_LIST(state, noticeList) {
      state.noticeList = noticeList
    },
    SET_CAROUS_MESSAGE(state, carouselMessage) {
      state.carouselMessage = carouselMessage
    },
    SET_CAROUSE_MESSAGE_STATE(state, carouselMessageState) {
      state.carouselMessageState = carouselMessageState
    },
    SET_SUBMIT_COMPANY(state, submitCompany) {
      state.submitCompany = submitCompany
    },
    SET_COMPANY_DATA_MSG(state, companyDataMessage) {
      state.companyDataMessage = companyDataMessage
    },
    SET_APPLICATION_CENTER_ID(state, applicationCenterId) {
      state.applicationCenterId = applicationCenterId
    }
  },
  actions: {
    changeChatAiModel({commit}, chatAIModel) {
      commit('SETChatAIModel', chatAIModel);
    },
    changeIndexDom({commit}, indexDom) {
      commit('SET_Index_Dom', indexDom);
    },
    changePhoneDialogVisible({commit}, phoneDialogVisible) {
      commit('SET_phoneDialogVisible', phoneDialogVisible)
    },
    changeSelectChat({commit}, selectChat) {
      commit('SET_SECTLECTCHAT', selectChat)
    },
    changeisShowNotice({commit}, isShowNotice) {
      commit('SET_Notice', isShowNotice)
    },
    changeworksetLabel({commit}, worksetLabel) {
      commit('SET_worksetLabel', worksetLabel)
    },
    changeknowledgeLabel({commit}, knowledgeLabel) {
      commit('SET_knowledgeLabel', knowledgeLabel)
    },
    changeIsShowRightNav({commit}, isShowRightNav) {
      commit('SET_IsShowRightNav', isShowRightNav)
    },
    changeSelectIfication({commit}, selectIfication) {
      commit('SET_selectIfication', selectIfication)
    },
    changeShowSidbar({commit}, isShowSidbar) {
      commit('SET_SHOW_SIDBAR', isShowSidbar)
    },
    changeNoticeList({commit}, noticeList) {
      commit('SET_NOTICE_LIST', noticeList)
    },
    changeCarouselMessage({commit}, carouselMessage) {
      commit('SET_CAROUS_MESSAGE', carouselMessage)
    },
    changeCarouselMessageState({commit}, carouselMessageState) {
      commit('SET_CAROUSE_MESSAGE_STATE', carouselMessageState)
    },
    changeSubmitCompany({commit}, submitCompany) {
      commit('SET_SUBMIT_COMPANY', submitCompany)
    },
    changeCompanyDataMsg({commit}, companyDataMessage) {
      commit('SET_COMPANY_DATA_MSG', companyDataMessage)
    },
    changeApplicationCenterId({commit}, applicationCenterId) {
      commit('SET_APPLICATION_CENTER_ID', applicationCenterId)
    }
  },
}