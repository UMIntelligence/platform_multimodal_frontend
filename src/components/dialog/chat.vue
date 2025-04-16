/**
 * 对话
 */
<template>
  <div style="width: 100%;display: flex;height: calc(100%);position: relative;">
    <div class="role_back-page" @click="$emit('hidechatspeak', false)">
      <img class="img" src="../../assets/images/right.png">
      返回
    </div>

    <div class="content" style="margin-left: 0;">
      <div style="display: flex;justify-content: center;">
        <div style="margin: 10px 0 10px 16px;display: flex;justify-content: center;background-color: #FFFFFF;padding: 4px;border-radius: 4px;">
          <el-button v-for="item in aiNameList" :key="item.value" class="ai-btn-list" @click="selectAIname(item.value)"
            :style="AIname == item.value ? 'color: #ffffff;background: #1F64FF;' : ''">
            <img v-if="item.value == 8" style="position: absolute;right: 0;top: -10px;width: 30px;height: 18px;"
              src="../../assets/images/indexIcon5.png" alt="">
            {{ item.label }}
          </el-button>
        </div>
      </div>

      <!-- <div style="display: flex;align-items: center;font-size: 14px;color: #AAB2C8;margin: 30px 0 10px 0;">
        <img src="../../assets/images/alert-triangle.png" style="margin-right: 10px;" />
        请注意：角色内容为AI生成，不做任何决策使用！由此引发的一切后果，需自行承担，请知悉！
      </div> -->
      <div class="cg-chat-content" id="chatCont" ref="wrap">

        <div class="cg-chat-left">
          <img class="cg-user-pic cg-right" :src="httpUrls.ossUrl + roleJuese.character_avatar" alt="">
          <!-- <img class="cg-user-pic cg-right" src="../../assets/images/GPT40.png" alt="" v-if="chat_type == 1">
          <img class="cg-user-pic cg-right" src="../../assets/images/wenxinyiyan.png" alt="" v-if="chat_type == 4">
          <img class="cg-user-pic cg-right" src="../../assets/images/xunfeixinghuo.png" alt="" v-if="chat_type == 5">
          <img class="cg-user-pic cg-right" src="../../assets/images/Claude.png" alt="" v-if="chat_type == 7">
          <img class="cg-user-pic cg-right" src="../../assets/images/ChatGLM.png" alt="" v-if="chat_type == 8"> -->
          <div class="as-cont-left" style="min-width: 425px;">
            <div class="as_text_left">
              <div class="cg-chatbox cg-chatbox-left">
                <div class="left_tip">{{ roleJuese.content }}</div>

                <!-- <div class="left_tip" v-if="chat_type == 0">我是领先的AI35大语言GPT模型，现在为您服务！</div>
                <div class="left_tip" v-else-if="chat_type == 1">我是前沿的AI40大语言GPT模型，为您提供专业便捷的启智服务！</div>
                <div class="left_tip" v-else-if="chat_type == 4">我是百度全新一代知识增强大语言模型，文心一言大模型</div>
                <div class="left_tip" v-else-if="chat_type == 5">我是讯飞星火大模型以中文为核心的，新一代认知智能大模型</div>
                <div class="left_tip" v-else-if="chat_type == 7">我是Claude大型语言模型</div>
                <div class="left_tip" v-else-if="chat_type == 8">我是ChatGLM千亿对话模型</div> -->
                <!-- <div class="left_tip-content">
                  <span
                    v-if="Object.keys(loginInfo.member.data.count).length != 0 && !loginInfo.member.status && chat_type == 0">体验次数可用{{
                      loginInfo.member.data.count.AI35.day }}次</span>
                  <span
                    v-if="Object.keys(loginInfo.member.data.count).length != 0 && !loginInfo.member.status && chat_type == 1">体验次数可用{{
                      loginInfo.member.data.count.AI40.day }}次</span>
                  <span
                    v-if="Object.keys(loginInfo.member.data.count).length != 0 && !loginInfo.member.status && chat_type == 4">体验次数可用{{
                      loginInfo.member.data.count.WENXIN.day }}次</span>
                  <span
                    v-if="Object.keys(loginInfo.member.data.count).length != 0 && !loginInfo.member.status && chat_type == 5">体验次数可用{{
                      loginInfo.member.data.count.XUNFEI.day }}次</span>
                  <span
                    v-if="Object.keys(loginInfo.member.data.count).length != 0 && !loginInfo.member.status && chat_type == 7">体验次数可用{{
                      loginInfo.member.data.count.CLAUDE.day }}次</span>
                  <span
                    v-if="Object.keys(loginInfo.member.data.count).length != 0 && !loginInfo.member.status && chat_type == 8">体验次数可用{{
                      loginInfo.member.data.count.CHATGLM.day }}次</span>
                  (1k token消耗{{ chat_type == 1 ? 65 : 4 }}算力点)
                </div> -->
              </div>
            </div>
          </div>
        </div>

        <!-- 3.5显示 -->
        <div v-for="(item, index) in chatList" :key="index" v-if="chat_type == 0">
          <div>
            <!-- 左侧模板 -->
            <div class="cg-chat-left" v-if="item.role == 'assistant'">
              <el-checkbox v-if="isShowChecked" v-model="item.checked" style="margin-right: 18px;margin-top: 6px;"
                @change="changeSendAnswer(item)"></el-checkbox>
              <div style="display: flex;">
                <img class="cg-user-pic cg-right" :src="httpUrls.ossUrl + roleJuese.character_avatar" alt="">
                <div class="as-cont-left" style="min-width: 600px;">
                  <!-- 文字模式 -->
                  <div class="as_text_left">
                    <div class="cg-chatbox cg-chatbox-left">
                      <!-- 实时显示的内容/内容 -->
                      <div class="reply markdown-body"
                        :style="!isfinishThreeFive && index == chatList.length - 1 ? 'white-space: pre-wrap;' : ''"
                        v-html="(index == chatList.length - 1 && index != 0 && !isDetailThreeFive) ? replyThreeFive : item.markedContent">
                      </div>

                      <!-- <div style="font-size: 14px;color: #999999;margin-top: 20px;"
                        v-if="isfinishThreeFive && index == chatList.length - 1 && !isClickChat">
                        如果对此答案不满意，
                        <span style="color: #1F64FF;cursor: pointer;" @click="toChatFouty">点我</span>
                        可以尝试在40中提问
                      </div> -->

                      <div class="comput" style="margin-top: 10px;">
                        <div style="display: flex;flex-wrap: nowrap;">
                          <span class="put_text" v-if="!isfinishThreeFive && index == chatList.length - 1"><img
                              class="await_img" src="../../assets/images/await.gif" alt="">思考中，</span>
                          <span class="put_text" v-if="item.timer != false"><img class="await_img"
                              src="../../assets/images/Time_atack_light.png" alt=""></span>
                          <!-- 回答结束时显示 -->
                          <span class="put_text" v-if="isfinishThreeFive && item.timer != false">耗时:{{ item.timer
                          }}秒</span>
                          <!-- 回答中显示 -->
                          <span class="put_text" v-else-if="!isClickChat && index == chatList.length - 1">耗时:{{
                            timerThreeFive }}秒</span>
                          <!-- 回答中 -->
                          <span class="put_text" v-else-if="!isfinishThreeFive && index == chatList.length - 1">耗时:{{
                            timerThreeFive }}秒</span>
                          <!-- 历史记录等显示 -->
                          <div class="put_text" v-if="index != chatList.length - 1">总字数：{{ (index == chatList.length - 1 &&
                            index != 0 && !isDetailThreeFive) ? replyThreeFive.length : item.content.length }}</div>
                          <!-- 回答结束时显示 -->
                          <div class="put_text" v-else-if="isfinishThreeFive">总字数：{{ (index == chatList.length - 1 && index
                            != 0 && !isDetailThreeFive) ? replyThreeFive.length : item.content.length }}</div>

                          <!-- <span class="put_text" v-if="isBtnThreeFive">
                            <span>消耗{{ item.integral }}算力</span>
                            <span v-if="Number(item.integral) != 0">：上行{{ item.prompt_tokens }}token 下行{{
                              item.completion_tokens }}token</span>
                          </span>

                          <el-tooltip placement="top" v-if="isBtnThreeFive">
                            <div slot="content" class="tooltip_public">
                              消耗算力：上行+下行=消耗算力<br />
                              如开通会员VIP，在有效期内使用问答消耗算力显示为0<br />
                              提醒：用户提问字数+机器人回答字数=消耗文字（因接口获取存在不稳定性，会产生token误差，如有问题请联系客服）<br />
                            </div>
                            <el-button icon="el-icon-question"
                              style="padding: 0;background-color: transparent;border: none;color: #999999;"></el-button>
                          </el-tooltip> -->
                        </div>

                        <div class="help-setpon">
                          <!-- <img class="help-setpon-img" v-if="!item.help" src="../../assets/images/helpNo.png" alt=""
                            @click="showSetonHelpImg(1, true, item)">
                          <img class="help-setpon-img" v-if="item.help" src="../../assets/images/helpYes.png" alt=""
                            @click="showSetonHelpImg(1, false, item)">
                          <img class="help-setpon-img" v-if="!item.stepOn" src="../../assets/images/stepOnNo.png" alt=""
                            @click="showSetonHelpImg(2, true, item)">
                          <img class="help-setpon-img" v-if="item.stepOn" src="../../assets/images/stepOnYes.png" alt=""
                            @click="showSetonHelpImg(2, false, item)"> -->
                          <img class="cope-img" src="../../assets/images/copyBlack.png" @click="copyText(item.content)"
                            alt="">
                        </div>
                      </div>

                      <div class="prompt" v-if="isBtnThreeFive">当前内容为AI生成，不做任何决策使用！由此引发的一切后果，需自行承担，请知悉，已通过阿里云内容安全审核</div>
                    </div>
                  </div>
                  <div class="chat_bot">
                    <span class="operete_btn"
                      v-if="isfinishThreeFive && index == chatList.length - 1 && item.finish_reason == 'length'"
                      @click="keepAs(1, item)">继续</span>
                    <span class="operete_btn" v-if="isfinishThreeFive && index == chatList.length - 1"
                      @click="optimizeAnswers(item, index)">优化本次回答</span>
                    <span class="reset_request" v-if="!isfinishThreeFive && index == chatList.length - 1"
                      @click="endController(item.session_code)">
                      <i class="el-icon-remove-outline"></i>
                      停止回答
                    </span>
                    <span class="reset_request" v-if="!isClickChat && index == chatList.length - 1 && isfinishThreeFive"
                      @click="resetController" style="width: 73px;">
                      <i class="el-icon-refresh"></i>
                      重试
                    </span>
                  </div>

                </div>

              </div>
            </div>
            <!-- 右侧模板 -->
            <div :class="isShowChecked ? 'cg-chat-right' : 'cg-chat-right cg-chat-right-on'" v-if="item.role == 'user'"
              style="justify-content: flex-start">

              <el-checkbox v-if="isShowChecked" v-model="item.checked" style="margin-right: 18px;margin-top: 6px;"
                @change="changeSendAnswer(item)"></el-checkbox>
              <div class="as-cont-right">
                <img class="cg-user-pic cg-left" :src="httpUrls.ossUrl + loginInfo.avatar_url" alt="">
                <div class="as_text_right">
                  <div class="cg-chatbox cg-chatbox-right">
                    <span class="reply" style="display: block;margin-bottom: 10px;" v-html="item.content"></span>
                    <img class="img" src="../../assets/images/copyWrite.png" alt="" @click="copyText(item.content)">
                  </div>
                  <div class="reset_request" v-if="!isClickChat && isfinishThreeFive" @click="resetQuest(item)">
                    <i class="el-icon-chat-dot-round" style="font-size: 16px;"></i>
                    重新提问
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- 4.0显示 -->
        <div v-for="(item, index) in chatVipList" :key="index" v-if="chat_type == 1">
          <div>
            <!-- 左侧模板 -->
            <div class="cg-chat-left" v-if="item.role == 'assistant'">
              <el-checkbox v-if="isShowChecked" v-model="item.checked" style="margin-right: 18px;margin-top: 6px;"
                @change="changeSendAnswer(item)"></el-checkbox>
              <div style="display: flex;">
                <img class="cg-user-pic cg-right" :src="httpUrls.ossUrl + roleJuese.character_avatar" alt="">
                <div class="as-cont-left" style="min-width: 600px;">
                  <!-- 文字模式 -->
                  <div class="as_text_left">
                    <div class="cg-chatbox cg-chatbox-left">
                      <div class="reply markdown-body"
                        :style="!isfinishFourZero && index == chatVipList.length - 1 ? 'white-space: pre-wrap;' : ''"
                        v-html="(index == chatVipList.length - 1 && index != 0 && !isDetailFourZero) ? replyFourZero : item.markedContent">
                      </div>

                      <div class="comput">
                        <div style="display: flex;flex-wrap: nowrap;">
                          <span class="put_text" v-if="!isfinishFourZero && index == chatVipList.length - 1"><img
                              class="await_img asd" src="../../assets/images/await.gif" alt="">思考中，</span>
                          <span class="put_text" v-if="isfinishFourZero && !isClickChat"><img class="await_img"
                              src="../../assets/images/Time_atack_light.png" alt=""></span>
                          <!-- 回答结束时显示 -->
                          <span class="put_text 1" v-if="item.timer != false && isfinishFourZero">耗时:{{ item.timer
                          }}秒</span>
                          <!-- 回答中显示 -->
                          <span class="put_text 2" v-else-if="!isClickChat && index == chatVipList.length - 1">耗时:{{
                            timerFourZero }}秒</span>
                          <span class="put_text 3" v-else-if="!isfinishFourZero && index == chatVipList.length - 1">耗时:{{
                            timerFourZero }}秒</span>
                          <!-- 历史记录等显示 -->
                          <div class="put_text" v-if="index != chatVipList.length - 1">总字数：{{ (index == chatVipList.length
                            - 1 && index != 0 && !isDetailFourZero) ? replyFourZero.length : item.content.length }}</div>
                          <!-- 回答结束时显示 -->
                          <div class="put_text" v-else-if="isfinishFourZero">总字数：{{ (index == chatVipList.length - 1 &&
                            index != 0 && !isDetailFourZero) ? replyFourZero.length : item.content.length }}</div>

                          <!-- <span class="put_text" v-if="isBtnFourZero">
                            <span>消耗{{ item.integral }}算力</span>
                            <span v-if="Number(item.integral) != 0">：上行{{ item.prompt_tokens }}token 下行{{
                              item.completion_tokens }}token</span>
                          </span>

                          <el-tooltip placement="top" v-if="isBtnThreeFive">
                            <div slot="content" class="tooltip_public">
                              消耗算力：上行+下行=消耗算力<br />
                              如开通会员VIP，在有效期内使用问答消耗算力显示为0<br />
                              提醒：用户提问字数+机器人回答字数=消耗文字（因接口获取存在不稳定性，会产生token误差，如有问题请联系客服）<br />
                            </div>
                            <el-button icon="el-icon-question"
                              style="padding: 0;background-color: transparent;border: none;color: #999999;"></el-button>
                          </el-tooltip> -->
                        </div>

                        <div class="help-setpon">
                          <!-- <img class="help-setpon-img" v-if="!item.help" src="../../assets/images/helpNo.png" alt=""
                            @click="showSetonHelpImg(3, true, item)">
                          <img class="help-setpon-img" v-if="item.help" src="../../assets/images/helpYes.png" alt=""
                            @click="showSetonHelpImg(3, false, item)">
                          <img class="help-setpon-img" v-if="!item.stepOn" src="../../assets/images/stepOnNo.png" alt=""
                            @click="showSetonHelpImg(4, true, item)">
                          <img class="help-setpon-img" v-if="item.stepOn" src="../../assets/images/stepOnYes.png" alt=""
                            @click="showSetonHelpImg(4, false, item)"> -->
                          <img class="cope-img" src="../../assets/images/copyBlack.png" @click="copyText(item.content)"
                            alt="">
                        </div>
                      </div>

                      <div class="prompt" v-if="isBtnFourZero">当前内容为AI生成，不做任何决策使用！由此引发的一切后果，需自行承担，请知悉，已通过阿里云内容安全审核</div>
                    </div>
                  </div>
                  <div class="chat_bot">
                    <span class="operete_btn"
                      v-if="isfinishFourZero && index == chatVipList.length - 1 && item.finish_reason == 'length'"
                      @click="keepAs(1, item)">继续</span>
                    <span class="operete_btn" v-if="isfinishFourZero && index == chatVipList.length - 1"
                      @click="optimizeAnswers(item, index)">优化本次回答</span>
                    <span class="reset_request" v-if="!isfinishFourZero && index == chatVipList.length - 1"
                      @click="endController(item.session_code)">
                      <i class="el-icon-remove-outline"></i>
                      停止回答
                    </span>

                    <span class="reset_request" v-if="isfinishFourZero && !isClickChat && index == chatVipList.length - 1"
                      @click="resetController" style="width: 73px;">
                      <i class="el-icon-refresh"></i>
                      重试
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <!-- 右侧模板 -->
            <div :class="isShowChecked ? 'cg-chat-right' : 'cg-chat-right cg-chat-right-on'" v-if="item.role == 'user'"
              style="justify-content: flex-start">

              <el-checkbox v-if="isShowChecked" v-model="item.checked" style="margin-right: 18px;margin-top: 6px;"
                @change="changeSendAnswer(item)"></el-checkbox>
              <div class="as-cont-right">
                <img class="cg-user-pic cg-left" :src="httpUrls.ossUrl + loginInfo.avatar_url" alt="">
                <div class="as_text_right">
                  <div class="cg-chatbox cg-chatbox-right">
                    <span class="reply" style="display: block;margin-bottom: 10px;" v-html="item.content"></span>
                    <img class="img" src="../../assets/images/copyWrite.png" alt="" @click="copyText(item.content)">
                  </div>

                  <div class="reset_request" v-if="!isClickChat && isfinishFourZero" @click="resetQuest(item)">
                    <i class="el-icon-chat-dot-round" style="font-size: 16px;"></i>
                    重新提问
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- 文心一言 -->
        <div v-for="(item, index) in chatYiyanList" :key="index" v-if="chat_type == 4">
          <div>
            <!-- 左侧模板 -->
            <div class="cg-chat-left" v-if="item.role == 'assistant'">
              <el-checkbox v-if="isShowChecked" v-model="item.checked" style="margin-right: 18px;margin-top: 6px;"
                @change="changeSendAnswer(item)"></el-checkbox>
              <div style="display: flex;">
                <img class="cg-user-pic cg-right" :src="httpUrls.ossUrl + roleJuese.character_avatar" alt="">
                <div class="as-cont-left" style="min-width: 600px;">
                  <!-- 文字模式 -->
                  <div class="as_text_left">
                    <div class="cg-chatbox cg-chatbox-left">
                      <div class="reply markdown-body"
                        :style="!isfinishYiyan && index == chatYiyanList.length - 1 ? 'white-space: pre-wrap;' : ''"
                        v-html="(index == chatYiyanList.length - 1 && index != 0 && !isDetailYiyan) ? replyYiyan : item.markedContent">
                      </div>

                      <!-- <div style="font-size: 14px;color: #999999;margin-top: 20px;"
                        v-if="isfinishYiyan && index == chatYiyanList.length - 1 && !isClickChat">
                        如果对此答案不满意，
                        <span style="color: #1F64FF;cursor: pointer;" @click="toChatFouty">点我</span>
                        可以尝试在40中提问
                      </div> -->
                      <div class="comput">
                        <div style="display: flex;flex-wrap: nowrap;">
                          <span class="put_text" v-if="!isfinishYiyan && index == chatYiyanList.length - 1"><img
                              class="await_img asd" src="../../assets/images/await.gif" alt="">思考中，</span>
                          <span class="put_text" v-if="isfinishYiyan && !isClickChat"><img class="await_img"
                              src="../../assets/images/Time_atack_light.png" alt=""></span>
                          <!-- 回答结束时显示 -->
                          <span class="put_text 1" v-if="item.timer != false && isfinishYiyan">耗时:{{ item.timer }}秒</span>
                          <!-- 回答中显示 -->
                          <span class="put_text 2" v-else-if="!isClickChat && index == chatYiyanList.length - 1">耗时:{{
                            timerYiyan }}秒</span>
                          <span class="put_text 3" v-else-if="!isfinishYiyan && index == chatYiyanList.length - 1">耗时:{{
                            timerYiyan }}秒</span>
                          <!-- 历史记录等显示 -->
                          <div class="put_text" v-if="index != chatYiyanList.length - 1">总字数：{{ (index ==
                            chatYiyanList.length - 1 && index != 0 && !isDetailYiyan) ? replyYiyan.length :
                            item.content.length }}</div>
                          <!-- 回答结束时显示 -->
                          <div class="put_text" v-else-if="isfinishYiyan">总字数：{{ (index == chatYiyanList.length - 1 &&
                            index != 0 && !isDetailYiyan) ? replyYiyan.length : item.content.length }}</div>

                          <!-- <span class="put_text" v-if="isBtnYiyan">
                            <span>消耗{{ item.integral }}算力</span>
                            <span v-if="Number(item.integral) != 0">：上行{{ item.prompt_tokens }}token 下行{{
                              item.completion_tokens }}token</span>
                          </span>

                          <el-tooltip placement="top" v-if="isBtnYiyan">
                            <div slot="content" class="tooltip_public">
                              消耗算力：上行+下行=消耗算力<br />
                              如开通会员VIP，在有效期内使用问答消耗算力显示为0<br />
                              提醒：用户提问字数+机器人回答字数=消耗文字（因接口获取存在不稳定性，会产生token误差，如有问题请联系客服）<br />
                            </div>
                            <el-button icon="el-icon-question"
                              style="padding: 0;background-color: transparent;border: none;color: #999999;"></el-button>
                          </el-tooltip> -->
                        </div>

                        <div class="help-setpon">
                          <!-- <img class="help-setpon-img" v-if="!item.help" src="../../assets/images/helpNo.png" alt=""
                            @click="showSetonHelpImg(5, true, item)">
                          <img class="help-setpon-img" v-if="item.help" src="../../assets/images/helpYes.png" alt=""
                            @click="showSetonHelpImg(5, false, item)">
                          <img class="help-setpon-img" v-if="!item.stepOn" src="../../assets/images/stepOnNo.png" alt=""
                            @click="showSetonHelpImg(6, true, item)">
                          <img class="help-setpon-img" v-if="item.stepOn" src="../../assets/images/stepOnYes.png" alt=""
                            @click="showSetonHelpImg(6, false, item)"> -->
                          <img class="cope-img" src="../../assets/images/copyBlack.png" @click="copyText(item.content)"
                            alt="">
                        </div>
                      </div>

                      <div class="prompt" v-if="isBtnYiyan">当前内容为AI生成，不做任何决策使用！由此引发的一切后果，需自行承担，请知悉，已通过阿里云内容安全审核</div>
                    </div>
                  </div>
                  <div class="chat_bot">
                    <span class="operete_btn"
                      v-if="isfinishYiyan && index == chatYiyanList.length - 1 && item.finish_reason == 'length'"
                      @click="keepAs(1, item)">继续</span>
                    <span class="operete_btn" v-if="isfinishYiyan && index == chatYiyanList.length - 1"
                      @click="optimizeAnswers(item, index)">优化本次回答</span>
                    <span class="reset_request" v-if="!isfinishYiyan && index == chatYiyanList.length - 1"
                      @click="endController(item.session_code)">
                      <i class="el-icon-remove-outline"></i>
                      停止回答
                    </span>

                    <span class="reset_request" v-if="isfinishYiyan && !isClickChat && index == chatYiyanList.length - 1"
                      @click="resetController" style="width: 73px;">
                      <i class="el-icon-refresh"></i>
                      重试
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <!-- 右侧模板 -->
            <div :class="isShowChecked ? 'cg-chat-right' : 'cg-chat-right cg-chat-right-on'" v-if="item.role == 'user'"
              style="justify-content: flex-start">

              <el-checkbox v-if="isShowChecked" v-model="item.checked" style="margin-right: 18px;margin-top: 6px;"
                @change="changeSendAnswer(item)"></el-checkbox>
              <div class="as-cont-right">
                <img class="cg-user-pic cg-left" :src="httpUrls.ossUrl + loginInfo.avatar_url" alt="">
                <div class="as_text_right">
                  <div class="cg-chatbox cg-chatbox-right">
                    <span class="reply" style="display: block;margin-bottom: 10px;" v-html="item.content"></span>
                    <img class="img" src="../../assets/images/copyWrite.png" alt="" @click="copyText(item.content)">
                  </div>

                  <div class="reset_request" v-if="!isClickChat && isfinishYiyan" @click="resetQuest(item)">
                    <i class="el-icon-chat-dot-round" style="font-size: 16px;"></i>
                    重新提问
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- 讯飞星火 -->
        <div v-for="(item, index) in chatXunfeiList" :key="index" v-if="chat_type == 5">
          <div>
            <!-- 左侧模板 -->
            <div class="cg-chat-left" v-if="item.role == 'assistant'">
              <el-checkbox v-if="isShowChecked" v-model="item.checked" style="margin-right: 18px;margin-top: 6px;"
                @change="changeSendAnswer(item)"></el-checkbox>
              <div style="display: flex;">
                <img class="cg-user-pic cg-right" :src="httpUrls.ossUrl + roleJuese.character_avatar" alt="">
                <div class="as-cont-left" style="min-width: 600px;">
                  <!-- 文字模式 -->
                  <div class="as_text_left">
                    <div class="cg-chatbox cg-chatbox-left">
                      <div class="reply markdown-body"
                        :style="!isfinishXunfei && index == chatXunfeiList.length - 1 ? 'white-space: pre-wrap;' : ''"
                        v-html="(index == chatXunfeiList.length - 1 && index != 0 && !isDetailXunfei) ? replyXunfei : item.markedContent">
                      </div>

                      <!-- <div style="font-size: 14px;color: #999999;margin-top: 20px;"
                        v-if="isfinishXunfei && index == chatXunfeiList.length - 1 && !isClickChat">
                        如果对此答案不满意，
                        <span style="color: #1F64FF;cursor: pointer;" @click="toChatFouty">点我</span>
                        可以尝试在40中提问
                      </div> -->
                      <div class="comput">
                        <div style="display: flex;flex-wrap: nowrap;">
                          <span class="put_text" v-if="!isfinishXunfei && index == chatXunfeiList.length - 1"><img
                              class="await_img asd" src="../../assets/images/await.gif" alt="">思考中，</span>
                          <span class="put_text" v-if="isfinishXunfei && !isClickChat"><img class="await_img"
                              src="../../assets/images/Time_atack_light.png" alt=""></span>
                          <!-- 回答结束时显示 -->
                          <span class="put_text 1" v-if="item.timer != false && isfinishXunfei">耗时:{{ item.timer
                          }}秒</span>
                          <!-- 回答中显示 -->
                          <span class="put_text 2" v-else-if="!isClickChat && index == chatXunfeiList.length - 1">耗时:{{
                            timerXunfei }}秒</span>
                          <span class="put_text 3" v-else-if="!isfinishXunfei && index == chatXunfeiList.length - 1">耗时:{{
                            timerXunfei }}秒</span>
                          <!-- 历史记录等显示 -->
                          <div class="put_text" v-if="index != chatXunfeiList.length - 1">总字数：{{ (index ==
                            chatXunfeiList.length - 1 && index != 0 && !isDetailXunfei) ? replyXunfei.length :
                            item.content.length }}</div>
                          <!-- 回答结束时显示 -->
                          <div class="put_text" v-else-if="isfinishXunfei">总字数：{{ (index == chatXunfeiList.length - 1 &&
                            index != 0 && !isDetailXunfei) ? replyXunfei.length : item.content.length }}</div>

                          <!-- <span class="put_text" v-if="isBtnXunfei">
                            <span>消耗{{ item.integral }}算力</span>
                            <span v-if="Number(item.integral) != 0">：上行{{ item.prompt_tokens }}token 下行{{
                              item.completion_tokens }}token</span>
                          </span>

                          <el-tooltip placement="top" v-if="isBtnXunfei">
                            <div slot="content" class="tooltip_public">
                              消耗算力：上行+下行=消耗算力<br />
                              如开通会员VIP，在有效期内使用问答消耗算力显示为0<br />
                              提醒：用户提问字数+机器人回答字数=消耗文字（因接口获取存在不稳定性，会产生token误差，如有问题请联系客服）<br />
                            </div>
                            <el-button icon="el-icon-question"
                              style="padding: 0;background-color: transparent;border: none;color: #999999;"></el-button>
                          </el-tooltip> -->
                        </div>

                        <div class="help-setpon">
                          <!-- <img class="help-setpon-img" v-if="!item.help" src="../../assets/images/helpNo.png" alt=""
                            @click="showSetonHelpImg(7, true, item)">
                          <img class="help-setpon-img" v-if="item.help" src="../../assets/images/helpYes.png" alt=""
                            @click="showSetonHelpImg(7, false, item)">
                          <img class="help-setpon-img" v-if="!item.stepOn" src="../../assets/images/stepOnNo.png" alt=""
                            @click="showSetonHelpImg(8, true, item)">
                          <img class="help-setpon-img" v-if="item.stepOn" src="../../assets/images/stepOnYes.png" alt=""
                            @click="showSetonHelpImg(8, false, item)"> -->
                          <img class="cope-img" src="../../assets/images/copyBlack.png" @click="copyText(item.content)"
                            alt="">
                        </div>
                      </div>

                      <div class="prompt" v-if="isBtnXunfei">当前内容为AI生成，不做任何决策使用！由此引发的一切后果，需自行承担，请知悉，已通过阿里云内容安全审核</div>
                    </div>
                  </div>
                  <div class="chat_bot">
                    <span class="operete_btn"
                      v-if="isfinishXunfei && index == chatXunfeiList.length - 1 && item.finish_reason == 'length'"
                      @click="keepAs(1, item)">继续</span>
                    <span class="operete_btn" v-if="isfinishXunfei && index == chatXunfeiList.length - 1"
                      @click="optimizeAnswers(item, index)">优化本次回答</span>
                    <span class="reset_request" v-if="!isfinishXunfei && index == chatXunfeiList.length - 1"
                      @click="endController(item.session_code)">
                      <i class="el-icon-remove-outline"></i>
                      停止回答
                    </span>

                    <span class="reset_request"
                      v-if="isfinishXunfei && !isClickChat && index == chatXunfeiList.length - 1" @click="resetController"
                      style="width: 73px;">
                      <i class="el-icon-refresh"></i>
                      重试
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <!-- 右侧模板 -->
            <div :class="isShowChecked ? 'cg-chat-right' : 'cg-chat-right cg-chat-right-on'" v-if="item.role == 'user'"
              style="justify-content: flex-start">

              <el-checkbox v-if="isShowChecked" v-model="item.checked" style="margin-right: 18px;margin-top: 6px;"
                @change="changeSendAnswer(item)"></el-checkbox>
              <div class="as-cont-right">
                <img class="cg-user-pic cg-left" :src="httpUrls.ossUrl + loginInfo.avatar_url" alt="">
                <div class="as_text_right">
                  <div class="cg-chatbox cg-chatbox-right">
                    <span class="reply" style="display: block;margin-bottom: 10px;" v-html="item.content"></span>
                    <img class="img" src="../../assets/images/copyWrite.png" alt="" @click="copyText(item.content)">
                  </div>

                  <div class="reset_request" v-if="!isClickChat && isfinishXunfei" @click="resetQuest(item)">
                    <i class="el-icon-chat-dot-round" style="font-size: 16px;"></i>
                    重新提问
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Claude -->
        <div v-for="(item, index) in chatClaudeList" :key="index" v-if="chat_type == 7">
          <div>
            <!-- 左侧模板 -->
            <div class="cg-chat-left" v-if="item.role == 'assistant'">
              <el-checkbox v-if="isShowChecked" v-model="item.checked" style="margin-right: 18px;margin-top: 6px;"
                @change="changeSendAnswer(item)"></el-checkbox>
              <div style="display: flex;">
                <img class="cg-user-pic cg-right" :src="httpUrls.ossUrl + roleJuese.character_avatar" alt="">
                <div class="as-cont-left" style="min-width: 600px;">
                  <!-- 文字模式 -->
                  <div class="as_text_left">
                    <div class="cg-chatbox cg-chatbox-left">
                      <div class="reply markdown-body"
                        :style="!isfinishClaude && index == chatClaudeList.length - 1 ? 'white-space: pre-wrap;' : ''"
                        v-html="(index == chatClaudeList.length - 1 && index != 0 && !isDetailClaude) ? replyClaude : item.markedContent">
                      </div>

                      <!-- <div style="font-size: 14px;color: #999999;margin-top: 20px;"
                        v-if="isfinishClaude && index == chatClaudeList.length - 1 && !isClickChat">
                        如果对此答案不满意，
                        <span style="color: #1F64FF;cursor: pointer;" @click="toChatFouty">点我</span>
                        可以尝试在40中提问
                      </div> -->
                      <div class="comput">
                        <div style="display: flex;flex-wrap: nowrap;">
                          <span class="put_text" v-if="!isfinishClaude && index == chatClaudeList.length - 1"><img
                              class="await_img asd" src="../../assets/images/await.gif" alt="">思考中，</span>
                          <span class="put_text" v-if="isfinishClaude && !isClickChat"><img class="await_img"
                              src="../../assets/images/Time_atack_light.png" alt=""></span>
                          <!-- 回答结束时显示 -->
                          <span class="put_text 1" v-if="item.timer != false && isfinishClaude">耗时:{{ item.timer
                          }}秒</span>
                          <!-- 回答中显示 -->
                          <span class="put_text 2" v-else-if="!isClickChat && index == chatClaudeList.length - 1">耗时:{{
                            timerClaude }}秒</span>
                          <span class="put_text 3" v-else-if="!isfinishClaude && index == chatClaudeList.length - 1">耗时:{{
                            timerClaude }}秒</span>
                          <!-- 历史记录等显示 -->
                          <div class="put_text" v-if="index != chatClaudeList.length - 1">总字数：{{ (index ==
                            chatClaudeList.length - 1 && index != 0 && !isDetailClaude) ? replyClaude.length :
                            item.content.length }}</div>
                          <!-- 回答结束时显示 -->
                          <div class="put_text" v-else-if="isfinishClaude">总字数：{{ (index == chatClaudeList.length - 1 &&
                            index != 0 && !isDetailClaude) ? replyClaude.length : item.content.length }}</div>

                          <!-- <span class="put_text" v-if="isBtnClaude">
                            <span>消耗{{ item.integral }}算力</span>
                            <span v-if="Number(item.integral) != 0">：上行{{ item.prompt_tokens }}token 下行{{
                              item.completion_tokens }}token</span>
                          </span>

                          <el-tooltip placement="top" v-if="isBtnClaude">
                            <div slot="content" class="tooltip_public">
                              消耗算力：上行+下行=消耗算力<br />
                              如开通会员VIP，在有效期内使用问答消耗算力显示为0<br />
                              提醒：用户提问字数+机器人回答字数=消耗文字（因接口获取存在不稳定性，会产生token误差，如有问题请联系客服）<br />
                            </div>
                            <el-button icon="el-icon-question"
                              style="padding: 0;background-color: transparent;border: none;color: #999999;"></el-button>
                          </el-tooltip> -->
                        </div>

                        <div class="help-setpon">
                          <!-- <img class="help-setpon-img" v-if="!item.help" src="../../assets/images/helpNo.png" alt=""
                            @click="showSetonHelpImg(9, true, item)">
                          <img class="help-setpon-img" v-if="item.help" src="../../assets/images/helpYes.png" alt=""
                            @click="showSetonHelpImg(9, false, item)">
                          <img class="help-setpon-img" v-if="!item.stepOn" src="../../assets/images/stepOnNo.png" alt=""
                            @click="showSetonHelpImg(10, true, item)">
                          <img class="help-setpon-img" v-if="item.stepOn" src="../../assets/images/stepOnYes.png" alt=""
                            @click="showSetonHelpImg(10, false, item)"> -->
                          <img class="cope-img" src="../../assets/images/copyBlack.png" @click="copyText(item.content)"
                            alt="">
                        </div>
                      </div>

                      <div class="prompt" v-if="isBtnClaude">当前内容为AI生成，不做任何决策使用！由此引发的一切后果，需自行承担，请知悉，已通过阿里云内容安全审核</div>
                    </div>
                  </div>
                  <div class="chat_bot">
                    <span class="operete_btn"
                      v-if="isfinishClaude && index == chatClaudeList.length - 1 && item.finish_reason == 'length'"
                      @click="keepAs(1, item)">继续</span>
                    <span class="operete_btn" v-if="isfinishClaude && index == chatClaudeList.length - 1"
                      @click="optimizeAnswers(item, index)">优化本次回答</span>
                    <span class="reset_request" v-if="!isfinishClaude && index == chatClaudeList.length - 1"
                      @click="endController(item.session_code)">
                      <i class="el-icon-remove-outline"></i>
                      停止回答
                    </span>

                    <span class="reset_request"
                      v-if="isfinishClaude && !isClickChat && index == chatClaudeList.length - 1" @click="resetController"
                      style="width: 73px;">
                      <i class="el-icon-refresh"></i>
                      重试
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <!-- 右侧模板 -->
            <div :class="isShowChecked ? 'cg-chat-right' : 'cg-chat-right cg-chat-right-on'" v-if="item.role == 'user'"
              style="justify-content: flex-start">

              <el-checkbox v-if="isShowChecked" v-model="item.checked" style="margin-right: 18px;margin-top: 6px;"
                @change="changeSendAnswer(item)"></el-checkbox>
              <div class="as-cont-right">
                <img class="cg-user-pic cg-left" :src="httpUrls.ossUrl + loginInfo.avatar_url" alt="">
                <div class="as_text_right">
                  <div class="cg-chatbox cg-chatbox-right">
                    <span class="reply" style="display: block;margin-bottom: 10px;" v-html="item.content"></span>
                    <img class="img" src="../../assets/images/copyWrite.png" alt="" @click="copyText(item.content)">
                  </div>

                  <div class="reset_request" v-if="!isClickChat && isfinishClaude" @click="resetQuest(item)">
                    <i class="el-icon-chat-dot-round" style="font-size: 16px;"></i>
                    重新提问
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- ChatGLM -->
        <div v-for="(item, index) in chatChatGLMList" :key="index" v-if="chat_type == 8">
          <div>
            <!-- 左侧模板 -->
            <div class="cg-chat-left" v-if="item.role == 'assistant'">
              <el-checkbox v-if="isShowChecked" v-model="item.checked" style="margin-right: 18px;margin-top: 6px;"
                @change="changeSendAnswer(item)"></el-checkbox>
              <div style="display: flex;">
                <img class="cg-user-pic cg-right" :src="httpUrls.ossUrl + roleJuese.character_avatar" alt="">
                <div class="as-cont-left" style="min-width: 600px;">
                  <!-- 文字模式 -->
                  <div class="as_text_left">
                    <div class="cg-chatbox cg-chatbox-left">
                      <div class="reply markdown-body"
                        :style="!isfinishChatGLM && index == chatChatGLMList.length - 1 ? 'white-space: pre-wrap;' : ''"
                        v-html="(index == chatChatGLMList.length - 1 && index != 0 && !isDetailChatGLM) ? replyChatGLM : item.markedContent">
                      </div>

                      <!-- <div style="font-size: 14px;color: #999999;margin-top: 20px;"
                        v-if="isfinishChatGLM && index == chatChatGLMList.length - 1 && !isClickChat">
                        如果对此答案不满意，
                        <span style="color: #1F64FF;cursor: pointer;" @click="toChatFouty">点我</span>
                        可以尝试在40中提问
                      </div> -->
                      <div class="comput">
                        <div style="display: flex;flex-wrap: nowrap;">
                          <span class="put_text" v-if="!isfinishChatGLM && index == chatChatGLMList.length - 1"><img
                              class="await_img asd" src="../../assets/images/await.gif" alt="">思考中，</span>
                          <span class="put_text" v-if="isfinishChatGLM && !isClickChat"><img class="await_img"
                              src="../../assets/images/Time_atack_light.png" alt=""></span>
                          <!-- 回答结束时显示 -->
                          <span class="put_text 1" v-if="item.timer != false && isfinishChatGLM">耗时:{{ item.timer
                          }}秒</span>
                          <!-- 回答中显示 -->
                          <span class="put_text 2" v-else-if="!isClickChat && index == chatChatGLMList.length - 1">耗时:{{
                            timerChatGLM }}秒</span>
                          <span class="put_text 3"
                            v-else-if="!isfinishChatGLM && index == chatChatGLMList.length - 1">耗时:{{ timerChatGLM
                            }}秒</span>
                          <!-- 历史记录等显示 -->
                          <div class="put_text" v-if="index != chatChatGLMList.length - 1">总字数：{{ (index ==
                            chatChatGLMList.length - 1 && index != 0 && !isDetailChatGLM) ? replyChatGLM.length :
                            item.content.length }}</div>
                          <!-- 回答结束时显示 -->
                          <div class="put_text" v-else-if="isfinishChatGLM">总字数：{{ (index == chatChatGLMList.length - 1 &&
                            index != 0 && !isDetailChatGLM) ? replyChatGLM.length : item.content.length }}</div>

                          <!-- <span class="put_text" v-if="isBtnChatGLM">
                            <span>消耗{{ item.integral }}算力</span>
                            <span>：共{{ item.total_tokens }}token</span>
                          </span>

                          <el-tooltip placement="top" v-if="isBtnChatGLM">
                            <div slot="content" class="tooltip_public">
                              消耗算力：上行+下行=消耗算力<br />
                              如开通会员VIP，在有效期内使用问答消耗算力显示为0<br />
                              提醒：用户提问字数+机器人回答字数=消耗文字（因接口获取存在不稳定性，会产生token误差，如有问题请联系客服）<br />
                            </div>
                            <el-button icon="el-icon-question"
                              style="padding: 0;background-color: transparent;border: none;color: #999999;"></el-button>
                          </el-tooltip> -->
                        </div>

                        <div class="help-setpon">
                          <!-- <img class="help-setpon-img" v-if="!item.help" src="../../assets/images/helpNo.png" alt=""
                            @click="showSetonHelpImg(11, true, item)">
                          <img class="help-setpon-img" v-if="item.help" src="../../assets/images/helpYes.png" alt=""
                            @click="showSetonHelpImg(11, false, item)">
                          <img class="help-setpon-img" v-if="!item.stepOn" src="../../assets/images/stepOnNo.png" alt=""
                            @click="showSetonHelpImg(12, true, item)">
                          <img class="help-setpon-img" v-if="item.stepOn" src="../../assets/images/stepOnYes.png" alt=""
                            @click="showSetonHelpImg(12, false, item)"> -->
                          <img class="cope-img" src="../../assets/images/copyBlack.png" @click="copyText(item.content)"
                            alt="">
                        </div>
                      </div>

                      <div class="prompt" v-if="isBtnChatGLM">当前内容为AI生成，不做任何决策使用！由此引发的一切后果，需自行承担，请知悉，已通过阿里云内容安全审核</div>
                    </div>
                  </div>
                  <div class="chat_bot">
                    <span class="operete_btn"
                      v-if="isfinishChatGLM && index == chatChatGLMList.length - 1 && item.finish_reason == 'length'"
                      @click="keepAs(1, item)">继续</span>
                    <span class="operete_btn" v-if="isfinishChatGLM && index == chatChatGLMList.length - 1"
                      @click="optimizeAnswers(item, index)">优化本次回答</span>
                    <span class="reset_request" v-if="!isfinishChatGLM && index == chatChatGLMList.length - 1"
                      @click="endController(item.session_code)">
                      <i class="el-icon-remove-outline"></i>
                      停止回答
                    </span>

                    <span class="reset_request"
                      v-if="isfinishChatGLM && !isClickChat && index == chatChatGLMList.length - 1"
                      @click="resetController" style="width: 73px;">
                      <i class="el-icon-refresh"></i>
                      重试
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <!-- 右侧模板 -->
            <div :class="isShowChecked ? 'cg-chat-right' : 'cg-chat-right cg-chat-right-on'" v-if="item.role == 'user'"
              style="justify-content: flex-start">

              <el-checkbox v-if="isShowChecked" v-model="item.checked" style="margin-right: 18px;margin-top: 6px;"
                @change="changeSendAnswer(item)"></el-checkbox>
              <div class="as-cont-right">
                <img class="cg-user-pic cg-left" :src="httpUrls.ossUrl + loginInfo.avatar_url" alt="">
                <div class="as_text_right">
                  <div class="cg-chatbox cg-chatbox-right">
                    <span class="reply" style="display: block;margin-bottom: 10px;" v-html="item.content"></span>
                    <img class="img" src="../../assets/images/copyWrite.png" alt="" @click="copyText(item.content)">
                  </div>

                  <div class="reset_request" v-if="!isClickChat && isfinishChatGLM" @click="resetQuest(item)">
                    <i class="el-icon-chat-dot-round" style="font-size: 16px;"></i>
                    重新提问
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- 通义千问 -->
        <div v-for="(item, index) in chatTongyiList" :key="index" v-if="chat_type == 10">
          <div>
            <!-- 左侧模板 -->
            <div class="cg-chat-left" v-if="item.role == 'assistant'">
              <el-checkbox v-if="isShowChecked" v-model="item.checked" style="margin-right: 18px;margin-top: 6px;"
                @change="changeSendAnswer(item)"></el-checkbox>
              <div style="display: flex;">
                <img class="cg-user-pic cg-right" :src="httpUrls.ossUrl + roleJuese.character_avatar" alt="">
                <div class="as-cont-left" style="min-width: 600px;">
                  <!-- 文字模式 -->
                  <div class="as_text_left">
                    <div class="cg-chatbox cg-chatbox-left">
                      <div class="reply markdown-body"
                        :style="!isfinishTongyi && index == chatTongyiList.length - 1 ? 'white-space: pre-wrap;' : ''"
                        v-html="(index == chatTongyiList.length - 1 && index != 0 && !isDetailTongyi) ? replyTongyi : item.markedContent">
                      </div>

                      <!-- <div style="font-size: 14px;color: #999999;margin-top: 20px;"
                        v-if="isfinishTongyi && index == chatTongyiList.length - 1 && !isClickChat">
                        如果对此答案不满意，
                        <span style="color: #1F64FF;cursor: pointer;" @click="toChatFouty">点我</span>
                        可以尝试在40中提问
                      </div> -->
                      <div class="comput">
                        <div style="display: flex;flex-wrap: nowrap;">
                          <span class="put_text" v-if="!isfinishTongyi && index == chatTongyiList.length - 1"><img
                              class="await_img asd" src="../../assets/images/await.gif" alt="">思考中，</span>
                          <span class="put_text" v-if="isfinishTongyi && !isClickChat"><img class="await_img"
                              src="../../assets/images/Time_atack_light.png" alt=""></span>
                          <!-- 回答结束时显示 -->
                          <span class="put_text 1" v-if="item.timer != false && isfinishTongyi">耗时:{{ item.timer
                          }}秒</span>
                          <!-- 回答中显示 -->
                          <span class="put_text 2" v-else-if="!isClickChat && index == chatTongyiList.length - 1">耗时:{{
                            timerTongyi }}秒</span>
                          <span class="put_text 3"
                            v-else-if="!isfinishTongyi && index == chatTongyiList.length - 1">耗时:{{ timerTongyi
                            }}秒</span>
                          <!-- 历史记录等显示 -->
                          <div class="put_text" v-if="index != chatTongyiList.length - 1">总字数：{{ (index ==
                            chatTongyiList.length - 1 && index != 0 && !isDetailTongyi) ? replyTongyi.length :
                            item.content.length }}</div>
                          <!-- 回答结束时显示 -->
                          <div class="put_text" v-else-if="isfinishTongyi">总字数：{{ (index == chatTongyiList.length - 1 &&
                            index != 0 && !isDetailTongyi) ? replyTongyi.length : item.content.length }}</div>

                          <!-- <span class="put_text" v-if="isBtnTongyi">
                            <span>消耗{{ item.integral }}算力</span>
                            <span v-if="Number(item.integral) != 0">：上行{{ item.prompt_tokens }}token 下行{{
                              item.completion_tokens }}token</span>
                          </span>

                          <el-tooltip placement="top" v-if="isBtnTongyi">
                            <div slot="content" class="tooltip_public">
                              消耗算力：上行+下行=消耗算力<br />
                              如开通会员VIP，在有效期内使用问答消耗算力显示为0<br />
                              提醒：用户提问字数+机器人回答字数=消耗文字（因接口获取存在不稳定性，会产生token误差，如有问题请联系客服）<br />
                            </div>
                            <el-button icon="el-icon-question"
                              style="padding: 0;background-color: transparent;border: none;color: #999999;"></el-button>
                          </el-tooltip> -->
                        </div>

                        <div class="help-setpon">
                          <!-- <img class="help-setpon-img" v-if="!item.help" src="../../assets/images/helpNo.png" alt=""
                            @click="showSetonHelpImg(11, true, item)">
                          <img class="help-setpon-img" v-if="item.help" src="../../assets/images/helpYes.png" alt=""
                            @click="showSetonHelpImg(11, false, item)">
                          <img class="help-setpon-img" v-if="!item.stepOn" src="../../assets/images/stepOnNo.png" alt=""
                            @click="showSetonHelpImg(12, true, item)">
                          <img class="help-setpon-img" v-if="item.stepOn" src="../../assets/images/stepOnYes.png" alt=""
                            @click="showSetonHelpImg(12, false, item)"> -->
                          <img class="cope-img" src="../../assets/images/copyBlack.png" @click="copyText(item.content)"
                            alt="">
                        </div>
                      </div>

                      <div class="prompt" v-if="isBtnTongyi">当前内容为AI生成，不做任何决策使用！由此引发的一切后果，需自行承担，请知悉，已通过阿里云内容安全审核</div>
                    </div>
                  </div>
                  <div class="chat_bot">
                    <span class="operete_btn"
                      v-if="isfinishTongyi && index == chatTongyiList.length - 1 && item.finish_reason == 'length'"
                      @click="keepAs(1, item)">继续</span>
                    <span class="operete_btn" v-if="isfinishTongyi && index == chatTongyiList.length - 1"
                      @click="optimizeAnswers(item, index)">优化本次回答</span>
                    <span class="reset_request" v-if="!isfinishTongyi && index == chatTongyiList.length - 1"
                      @click="endController(item.session_code)">
                      <i class="el-icon-remove-outline"></i>
                      停止回答
                    </span>

                    <span class="reset_request"
                      v-if="isfinishTongyi && !isClickChat && index == chatTongyiList.length - 1"
                      @click="resetController" style="width: 73px;">
                      <i class="el-icon-refresh"></i>
                      重试
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <!-- 右侧模板 -->
            <div :class="isShowChecked ? 'cg-chat-right' : 'cg-chat-right cg-chat-right-on'" v-if="item.role == 'user'"
              style="justify-content: flex-start">

              <el-checkbox v-if="isShowChecked" v-model="item.checked" style="margin-right: 18px;margin-top: 6px;"
                @change="changeSendAnswer(item)"></el-checkbox>
              <div class="as-cont-right">
                <img class="cg-user-pic cg-left" :src="httpUrls.ossUrl + loginInfo.avatar_url" alt="">
                <div class="as_text_right">
                  <div class="cg-chatbox cg-chatbox-right">
                    <span class="reply" style="display: block;margin-bottom: 10px;" v-html="item.content"></span>
                    <img class="img" src="../../assets/images/copyWrite.png" alt="" @click="copyText(item.content)">
                  </div>

                  <div class="reset_request" v-if="!isClickChat && isfinishTongyi" @click="resetQuest(item)">
                    <i class="el-icon-chat-dot-round" style="font-size: 16px;"></i>
                    重新提问
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- 商汤 -->
        <div v-for="(item, index) in chatShangtangList" :key="index" v-if="chat_type == 11">
          <div>
            <!-- 左侧模板 -->
            <div class="cg-chat-left" v-if="item.role == 'assistant'">
              <el-checkbox v-if="isShowChecked" v-model="item.checked" style="margin-right: 18px;margin-top: 6px;"
                @change="changeSendAnswer(item)"></el-checkbox>
              <div style="display: flex;">
                <img class="cg-user-pic cg-right" :src="httpUrls.ossUrl + roleJuese.character_avatar" alt="">
                <div class="as-cont-left" style="min-width: 600px;">
                  <!-- 文字模式 -->
                  <div class="as_text_left">
                    <div class="cg-chatbox cg-chatbox-left">
                      <div class="reply markdown-body"
                        :style="!isfinishShangtang && index == chatShangtangList.length - 1 ? 'white-space: pre-wrap;' : ''"
                        v-html="(index == chatShangtangList.length - 1 && index != 0 && !isDetailShangtang) ? replyShangtang : item.markedContent">
                      </div>

                      <!-- <div style="font-size: 14px;color: #999999;margin-top: 20px;"
                        v-if="isfinishShangtang && index == chatShangtangList.length - 1 && !isClickChat">
                        如果对此答案不满意，
                        <span style="color: #1F64FF;cursor: pointer;" @click="toChatFouty">点我</span>
                        可以尝试在40中提问
                      </div> -->
                      <div class="comput">
                        <div style="display: flex;flex-wrap: nowrap;">
                          <span class="put_text" v-if="!isfinishShangtang && index == chatShangtangList.length - 1"><img
                              class="await_img asd" src="../../assets/images/await.gif" alt="">思考中，</span>
                          <span class="put_text" v-if="isfinishShangtang && !isClickChat"><img class="await_img"
                              src="../../assets/images/Time_atack_light.png" alt=""></span>
                          <!-- 回答结束时显示 -->
                          <span class="put_text 1" v-if="item.timer != false && isfinishShangtang">耗时:{{ item.timer
                          }}秒</span>
                          <!-- 回答中显示 -->
                          <span class="put_text 2" v-else-if="!isClickChat && index == chatShangtangList.length - 1">耗时:{{
                            timerShangtang }}秒</span>
                          <span class="put_text 3"
                            v-else-if="!isfinishShangtang && index == chatShangtangList.length - 1">耗时:{{ timerShangtang
                            }}秒</span>
                          <!-- 历史记录等显示 -->
                          <div class="put_text" v-if="index != chatShangtangList.length - 1">总字数：{{ (index ==
                            chatShangtangList.length - 1 && index != 0 && !isDetailShangtang) ? replyShangtang.length :
                            item.content.length }}</div>
                          <!-- 回答结束时显示 -->
                          <div class="put_text" v-else-if="isfinishShangtang">总字数：{{ (index == chatShangtangList.length - 1 &&
                            index != 0 && !isDetailShangtang) ? replyShangtang.length : item.content.length }}</div>

                          <!-- <span class="put_text" v-if="isBtnShangtang">
                            <span>消耗{{ item.integral }}算力</span>
                            <span v-if="Number(item.integral) != 0">：上行{{ item.prompt_tokens }}token 下行{{
                              item.completion_tokens }}token</span>
                          </span>

                          <el-tooltip placement="top" v-if="isBtnShangtang">
                            <div slot="content" class="tooltip_public">
                              消耗算力：上行+下行=消耗算力<br />
                              如开通会员VIP，在有效期内使用问答消耗算力显示为0<br />
                              提醒：用户提问字数+机器人回答字数=消耗文字（因接口获取存在不稳定性，会产生token误差，如有问题请联系客服）<br />
                            </div>
                            <el-button icon="el-icon-question"
                              style="padding: 0;background-color: transparent;border: none;color: #999999;"></el-button>
                          </el-tooltip> -->
                        </div>

                        <div class="help-setpon">
                          <!-- <img class="help-setpon-img" v-if="!item.help" src="../../assets/images/helpNo.png" alt=""
                            @click="showSetonHelpImg(11, true, item)">
                          <img class="help-setpon-img" v-if="item.help" src="../../assets/images/helpYes.png" alt=""
                            @click="showSetonHelpImg(11, false, item)">
                          <img class="help-setpon-img" v-if="!item.stepOn" src="../../assets/images/stepOnNo.png" alt=""
                            @click="showSetonHelpImg(12, true, item)">
                          <img class="help-setpon-img" v-if="item.stepOn" src="../../assets/images/stepOnYes.png" alt=""
                            @click="showSetonHelpImg(12, false, item)"> -->
                          <img class="cope-img" src="../../assets/images/copyBlack.png" @click="copyText(item.content)"
                            alt="">
                        </div>
                      </div>

                      <div class="prompt" v-if="isBtnShangtang">当前内容为AI生成，不做任何决策使用！由此引发的一切后果，需自行承担，请知悉，已通过阿里云内容安全审核</div>
                    </div>
                  </div>
                  <div class="chat_bot">
                    <span class="operete_btn"
                      v-if="isfinishShangtang && index == chatShangtangList.length - 1 && item.finish_reason == 'length'"
                      @click="keepAs(1, item)">继续</span>
                    <span class="operete_btn" v-if="isfinishShangtang && index == chatShangtangList.length - 1"
                      @click="optimizeAnswers(item, index)">优化本次回答</span>
                    <span class="reset_request" v-if="!isfinishShangtang && index == chatShangtangList.length - 1"
                      @click="endController(item.session_code)">
                      <i class="el-icon-remove-outline"></i>
                      停止回答
                    </span>

                    <span class="reset_request"
                      v-if="isfinishShangtang && !isClickChat && index == chatShangtangList.length - 1"
                      @click="resetController" style="width: 73px;">
                      <i class="el-icon-refresh"></i>
                      重试
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <!-- 右侧模板 -->
            <div :class="isShowChecked ? 'cg-chat-right' : 'cg-chat-right cg-chat-right-on'" v-if="item.role == 'user'"
              style="justify-content: flex-start">

              <el-checkbox v-if="isShowChecked" v-model="item.checked" style="margin-right: 18px;margin-top: 6px;"
                @change="changeSendAnswer(item)"></el-checkbox>
              <div class="as-cont-right">
                <img class="cg-user-pic cg-left" :src="httpUrls.ossUrl + loginInfo.avatar_url" alt="">
                <div class="as_text_right">
                  <div class="cg-chatbox cg-chatbox-right">
                    <span class="reply" style="display: block;margin-bottom: 10px;" v-html="item.content"></span>
                    <img class="img" src="../../assets/images/copyWrite.png" alt="" @click="copyText(item.content)">
                  </div>

                  <div class="reset_request" v-if="!isClickChat && isfinishShangtang" @click="resetQuest(item)">
                    <i class="el-icon-chat-dot-round" style="font-size: 16px;"></i>
                    重新提问
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- 账户没钱了 -->
        <div class="cg-chat-left" v-if="!isuser">
          <img class="cg-user-pic cg-right" :src="httpUrls.ossUrl + roleJuese.character_avatar" alt="">
          <!-- <img class="cg-user-pic cg-right" src="../../assets/images/GPT40.png" alt="" v-if="chat_type == 1">
          <img class="cg-user-pic cg-right" src="../../assets/images/wenxinyiyan.png" alt="" v-if="chat_type == 4">
          <img class="cg-user-pic cg-right" src="../../assets/images/xunfeixinghuo.png" alt="" v-if="chat_type == 5">
          <img class="cg-user-pic cg-right" src="../../assets/images/Claude.png" alt="" v-if="chat_type == 7">
          <img class="cg-user-pic cg-right" src="../../assets/images/ChatGLM.png" alt="" v-if="chat_type == 8"> -->
          <div class="as-cont-left">
            <div class="as_text_left">
              <div class="cg-chatbox cg-chatbox-left">
                <div class="left_tip">{{ queryErrorMsg }}</div>
                <div style="margin-top: 10px;display: flex;justify-content: space-between;">
                  <el-button v-if="chat_type == 0"
                    style="background-color: #FF9B17;color: #FFFFFF;border-radius: 4px;padding: 6px 60px;"
                    @click="$refs.Pay.PayVisible = true">开通VIP</el-button>
                  <!-- <el-button type="primary" style="background-color: #1F64FF;border-radius: 4px;padding: 6px 60px;"
                    @click="$router.push('/member/Member')">购买流量包</el-button> -->
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- 屏蔽词 -->
        <div class="cg-chat-left" v-if="isFoulLanguage">
          <img class="cg-user-pic cg-right" :src="httpUrls.ossUrl + roleJuese.character_avatar" alt="">
          <!-- <img class="cg-user-pic cg-right" src="../../assets/images/GPT40.png" alt="" v-if="chat_type == 1">
          <img class="cg-user-pic cg-right" src="../../assets/images/wenxinyiyan.png" alt="" v-if="chat_type == 4">
          <img class="cg-user-pic cg-right" src="../../assets/images/xunfeixinghuo.png" alt="" v-if="chat_type == 5">
          <img class="cg-user-pic cg-right" src="../../assets/images/Claude.png" alt="" v-if="chat_type == 7">
          <img class="cg-user-pic cg-right" src="../../assets/images/ChatGLM.png" alt="" v-if="chat_type == 8"> -->
          <div class="as-cont-left">
            <div class="as_text_left">
              <div class="cg-chatbox cg-chatbox-left">
                <div class="left_tip">{{ queryErrorMsg }}</div>
              </div>
            </div>
          </div>
        </div>

        <!-- 关注公众号 -->
        <!-- <div class="codebox" v-if="chatList.length == 0 && AIname == 0" style="margin-top: 30px;">
                <img class="codeimg" :src="contactService" alt="">
                <span class="codename" style="margin: 10px 0 20px 0;">加客服免费领会员</span>
                <div>为了方便您以后能找到我们的网站，请按<span style="color: #0084ff;font-weight: bold;">Ctrl+D</span>收藏吧,或者下载<span style="color: #0084ff;font-weight: bold;cursor: pointer;" @click="downloadImage('慧远AI','.url')">快捷方式文件</span>拖至桌面</div>
            </div>
            <div class="codebox" v-if="AIname == 1 && chatVipList.length == 0" style="margin-top: 30px;">
                <img class="codeimg" :src="contactService" alt="">
                <span class="codename" style="margin: 10px 0 20px 0;">加客服免费领会员</span>
            </div> -->

        <!-- 获取中 -->
        <div>
          <div class="cg-chat-left" v-if="isTimeThreeFive && chat_type == 0" style="margin-bottom: 20px;">
            <img class="cg-user-pic cg-right" :src="httpUrls.ossUrl + roleJuese.character_avatar" alt="">
            <div class="as-cont-left">
              <div class="as_text_left">
                <div class="cg-chatbox cg-chatbox-left">
                  <div class="comput" style="justify-content: flex-start;">
                    <span class="put_text"><img class="await_img" src="../../assets/images/await.gif" alt="">思考中，</span>
                    <span class="put_text">耗时:{{ timerThreeFive }}秒</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- 获取中 -->
          <div class="cg-chat-left" v-else-if="isTimeFourZero && chat_type == 1" style="margin-bottom: 20px;">
            <img class="cg-user-pic cg-right" :src="httpUrls.ossUrl + roleJuese.character_avatar" alt="">
            <div class="as-cont-left">
              <div class="as_text_left">
                <div class="cg-chatbox cg-chatbox-left">
                  <div class="comput" style="justify-content: flex-start;">
                    <span class="put_text"><img class="await_img" src="../../assets/images/await.gif" alt="">思考中，</span>
                    <span class="put_text">耗时:{{ timerFourZero }}秒</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- 获取中 -->
          <div class="cg-chat-left" v-else-if="isTimeYiyan && chat_type == 4" style="margin-bottom: 20px;">
            <img class="cg-user-pic cg-right" :src="httpUrls.ossUrl + roleJuese.character_avatar" alt="">
            <div class="as-cont-left">
              <div class="as_text_left">
                <div class="cg-chatbox cg-chatbox-left">
                  <div class="comput" style="justify-content: flex-start;">
                    <span class="put_text"><img class="await_img" src="../../assets/images/await.gif" alt="">思考中，</span>
                    <span class="put_text">耗时:{{ timerYiyan }}秒</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- 获取中 -->
          <div class="cg-chat-left" v-else-if="isTimeXunfei && chat_type == 5" style="margin-bottom: 20px;">
            <img class="cg-user-pic cg-right" :src="httpUrls.ossUrl + roleJuese.character_avatar" alt="">
            <div class="as-cont-left">
              <div class="as_text_left">
                <div class="cg-chatbox cg-chatbox-left">
                  <div class="comput" style="justify-content: flex-start;">
                    <span class="put_text"><img class="await_img" src="../../assets/images/await.gif" alt="">思考中，</span>
                    <span class="put_text">耗时:{{ timerXunfei }}秒</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- 获取中 -->
          <div class="cg-chat-left" v-else-if="isTimeClaude && chat_type == 7" style="margin-bottom: 20px;">
            <img class="cg-user-pic cg-right" :src="httpUrls.ossUrl + roleJuese.character_avatar" alt="">
            <div class="as-cont-left">
              <div class="as_text_left">
                <div class="cg-chatbox cg-chatbox-left">
                  <div class="comput" style="justify-content: flex-start;">
                    <span class="put_text"><img class="await_img" src="../../assets/images/await.gif" alt="">思考中，</span>
                    <span class="put_text">耗时:{{ timerClaude }}秒</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- 获取中 -->
          <div class="cg-chat-left" v-else-if="isTimeChatGLM && chat_type == 8" style="margin-bottom: 20px;">
            <img class="cg-user-pic cg-right" :src="httpUrls.ossUrl + roleJuese.character_avatar" alt="">
            <div class="as-cont-left">
              <div class="as_text_left">
                <div class="cg-chatbox cg-chatbox-left">
                  <div class="comput" style="justify-content: flex-start;">
                    <span class="put_text"><img class="await_img" src="../../assets/images/await.gif" alt="">思考中，</span>
                    <span class="put_text">耗时:{{ timerChatGLM }}秒</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- 获取中 -->
          <div class="cg-chat-left" v-else-if="isTimeTongyi && chat_type == 10" style="margin-bottom: 20px;">
            <img class="cg-user-pic cg-right" :src="httpUrls.ossUrl + roleJuese.character_avatar" alt="">
            <div class="as-cont-left">
              <div class="as_text_left">
                <div class="cg-chatbox cg-chatbox-left">
                  <div class="comput" style="justify-content: flex-start;">
                    <span class="put_text"><img class="await_img" src="../../assets/images/await.gif" alt="">思考中，</span>
                    <span class="put_text">耗时:{{ timerTongyi }}秒</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- 获取中 -->
          <div class="cg-chat-left" v-else-if="isTimeShangtang && chat_type == 11" style="margin-bottom: 20px;">
            <img class="cg-user-pic cg-right" :src="httpUrls.ossUrl + roleJuese.character_avatar" alt="">
            <div class="as-cont-left">
              <div class="as_text_left">
                <div class="cg-chatbox cg-chatbox-left">
                  <div class="comput" style="justify-content: flex-start;">
                    <span class="put_text"><img class="await_img" src="../../assets/images/await.gif" alt="">思考中，</span>
                    <span class="put_text">耗时:{{ timerShangtang }}秒</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <span class="reset_request query-reset_request" v-if="isTimeThreeFive && chat_type == 0"
            @click="endController('', false)">
            <i class="el-icon-remove-outline"></i>
            停止回答
          </span>
          <span class="reset_request query-reset_request" v-else-if="isTimeFourZero && chat_type == 1"
            @click="endController('', false)">
            <i class="el-icon-remove-outline"></i>
            停止回答
          </span>
          <span class="reset_request query-reset_request" v-else-if="isTimeYiyan && chat_type == 4"
            @click="endController('', false)">
            <i class="el-icon-remove-outline"></i>
            停止回答
          </span>
          <span class="reset_request query-reset_request" v-else-if="isTimeXunfei && chat_type == 5"
            @click="endController('', false)">
            <i class="el-icon-remove-outline"></i>
            停止回答
          </span>
          <span class="reset_request query-reset_request" v-else-if="isTimeClaude && chat_type == 7"
            @click="endController('', false)">
            <i class="el-icon-remove-outline"></i>
            停止回答
          </span>
          <span class="reset_request query-reset_request" v-else-if="isTimeChatGLM && chat_type == 8"
            @click="endController('', false)">
            <i class="el-icon-remove-outline"></i>
            停止回答
          </span>
          <span class="reset_request query-reset_request" v-else-if="isTimeTongyi && chat_type == 10"
            @click="endController('', false)">
            <i class="el-icon-remove-outline"></i>
            停止回答
          </span>
          <span class="reset_request query-reset_request" v-else-if="isTimeShangtang && chat_type == 11"
            @click="endController('', false)">
            <i class="el-icon-remove-outline"></i>
            停止回答
          </span>
        </div>
      </div>

      <!-- 开启新会话 35 -->
      <div style="font-size: 14px;color: #999999;text-align: center;line-height: 30px;"
        v-if="startNewChat35 && AIname == 0">
        <span style="cursor: pointer;" @click="resetNewChat">
          <span
            style="width: 26px;height: 1px;background-color: #999999;display: inline-block;vertical-align: middle;"></span>
          <span style="color: #1F64FF;vertical-align: middle;margin: 0 10px;">点击我,开启新会话</span>
          <span
            style="width: 26px;height: 1px;background-color: #999999;display: inline-block;vertical-align: middle;"></span>
        </span>
      </div>

      <!-- 开启新会话 40 -->
      <div style="font-size: 14px;color: #999999;text-align: center;line-height: 30px;"
        v-if="startNewChat40 && AIname == 1">
        <span style="cursor: pointer;" @click="resetNewChat">
          <span
            style="width: 26px;height: 1px;background-color: #999999;display: inline-block;vertical-align: middle;"></span>
          <span style="color: #1F64FF;vertical-align: middle;margin: 0 10px;">点击我,开启新会话</span>
          <span
            style="width: 26px;height: 1px;background-color: #999999;display: inline-block;vertical-align: middle;"></span>
        </span>
      </div>

      <!-- 开启新会话 文心一言 -->
      <div style="font-size: 14px;color: #999999;text-align: center;line-height: 30px;"
        v-if="startNewChatYiyan && AIname == 4">
        <span style="cursor: pointer;" @click="resetNewChat">
          <span
            style="width: 26px;height: 1px;background-color: #999999;display: inline-block;vertical-align: middle;"></span>
          <span style="color: #1F64FF;vertical-align: middle;margin: 0 10px;">点击我,开启新会话</span>
          <span
            style="width: 26px;height: 1px;background-color: #999999;display: inline-block;vertical-align: middle;"></span>
        </span>
      </div>

      <!-- 开启新会话 讯飞星火 -->
      <div style="font-size: 14px;color: #999999;text-align: center;line-height: 30px;"
        v-if="startNewChatXunfei && AIname == 5">
        <span style="cursor: pointer;" @click="resetNewChat">
          <span
            style="width: 26px;height: 1px;background-color: #999999;display: inline-block;vertical-align: middle;"></span>
          <span style="color: #1F64FF;vertical-align: middle;margin: 0 10px;">点击我,开启新会话</span>
          <span
            style="width: 26px;height: 1px;background-color: #999999;display: inline-block;vertical-align: middle;"></span>
        </span>
      </div>

      <!-- 开启新会话 Claude -->
      <div style="font-size: 14px;color: #999999;text-align: center;line-height: 30px;"
        v-if="startNewChatClaude && AIname == 7">
        <span style="cursor: pointer;" @click="resetNewChat">
          <span
            style="width: 26px;height: 1px;background-color: #999999;display: inline-block;vertical-align: middle;"></span>
          <span style="color: #1F64FF;vertical-align: middle;margin: 0 10px;">点击我,开启新会话</span>
          <span
            style="width: 26px;height: 1px;background-color: #999999;display: inline-block;vertical-align: middle;"></span>
        </span>
      </div>

      <!-- 开启新会话 ChatGLM -->
      <div style="font-size: 14px;color: #999999;text-align: center;line-height: 30px;"
        v-if="startNewChatChatGLM && AIname == 8">
        <span style="cursor: pointer;" @click="resetNewChat">
          <span
            style="width: 26px;height: 1px;background-color: #999999;display: inline-block;vertical-align: middle;"></span>
          <span style="color: #1F64FF;vertical-align: middle;margin: 0 10px;">点击我,开启新会话</span>
          <span
            style="width: 26px;height: 1px;background-color: #999999;display: inline-block;vertical-align: middle;"></span>
        </span>
      </div>

      <!-- 开启新会话 ChatGLM -->
      <div style="font-size: 14px;color: #999999;text-align: center;line-height: 30px;"
        v-if="startNewChatTongyi && AIname == 10">
        <span style="cursor: pointer;" @click="resetNewChat">
          <span
            style="width: 26px;height: 1px;background-color: #999999;display: inline-block;vertical-align: middle;"></span>
          <span style="color: #1F64FF;vertical-align: middle;margin: 0 10px;">点击我,开启新会话</span>
          <span
            style="width: 26px;height: 1px;background-color: #999999;display: inline-block;vertical-align: middle;"></span>
        </span>
      </div>

      <!-- 开启新会话 ChatGLM -->
      <div style="font-size: 14px;color: #999999;text-align: center;line-height: 30px;"
        v-if="startNewChatShangtang && AIname == 11">
        <span style="cursor: pointer;" @click="resetNewChat">
          <span
            style="width: 26px;height: 1px;background-color: #999999;display: inline-block;vertical-align: middle;"></span>
          <span style="color: #1F64FF;vertical-align: middle;margin: 0 10px;">点击我,开启新会话</span>
          <span
            style="width: 26px;height: 1px;background-color: #999999;display: inline-block;vertical-align: middle;"></span>
        </span>
      </div>

      <div class="footer_cont">
        <div class="cont">
          <!-- <el-select v-model="AIname" placeholder="智能AI为您服务"
            :class="isShowTemplateSelte ? 'chat-select-aiName onceClassName' : 'chat-select-aiName'"
            :disabled="AINameDisabled" :style="{ '--a': textareaHeight }">
            <el-option v-for="item in aiNameList" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select> -->

          <el-input resize="none" :style="{ '--a': textareaHeight }"
            :class="isShowTemplateSelte ? 'onceClassNameRight role-chat-text-textarea' : 'role-chat-text-textarea'" type="textarea"
            :autosize="{ minRows: 1, maxRows: 6 }" placeholder="在此输入您想了解的内容，Shift+Enter换行，Enter发送"
            v-model="sendValue" @input="changeSendValue" @keyup.enter.native="(event) => handleKeyUp(event)">
          </el-input>
          <div class="textarea-btn" :style="{ '--a': textareaHeight }">
            <el-button class="send_img" style="height: 32px;width: 70px;" type="primary" v-if="chat_type == 0"
              @click="isBtnThreeFive ? sendMsg() : sendMsg2()">发送</el-button>
            <el-button class="send_img" style="height: 32px;width: 70px;" type="primary" v-if="chat_type == 1"
              @click="isBtnFourZero ? sendMsg() : sendMsg2()">发送</el-button>
            <el-button class="send_img" style="height: 32px;width: 70px;" type="primary" v-if="chat_type == 4"
              @click="isBtnYiyan ? sendMsg() : sendMsg2()">发送</el-button>
            <el-button class="send_img" style="height: 32px;width: 70px;" type="primary" v-if="chat_type == 5"
              @click="isBtnXunfei ? sendMsg() : sendMsg2()">发送</el-button>
            <el-button class="send_img" style="height: 32px;width: 70px;" type="primary" v-if="chat_type == 7"
              @click="isBtnClaude ? sendMsg() : sendMsg2()">发送</el-button>
            <el-button class="send_img" style="height: 32px;width: 70px;" type="primary" v-if="chat_type == 8"
              @click="isBtnChatGLM ? sendMsg() : sendMsg2()">发送</el-button>
            <el-button class="send_img" style="height: 32px;width: 70px;" type="primary" v-if="chat_type == 10"
              @click="isBtnTongyi ? sendMsg() : sendMsg2()">发送</el-button>
            <el-button class="send_img" style="height: 32px;width: 70px;" type="primary" v-if="chat_type == 11"
              @click="isBtnShangtang ? sendMsg() : sendMsg2()">发送</el-button>
          </div>

          <div class="association" v-if="isShowassociation">
            <div class="title">是否关联上文</div>
            <div class="item">
              <el-radio v-model="association" label="1">是</el-radio>
              <el-radio v-model="association" label="2">否</el-radio>
            </div>
            <div class="line"></div>
          </div>
        </div>
      </div>

      <!-- 补充弹窗 -->
      <el-dialog :visible.sync="supplyVisible" width="500px" :modal-append-to-body="false">
        <div class="supply_cont">
          <el-input type="textarea" resize='none' :rows="3" placeholder="请输入您要优化的内容" v-model="supplyValue"></el-input>
        </div>

        <span slot="footer" class="chat-dialog-footer" @click="keepAs(2)">
          发送
        </span>
      </el-dialog>

      <!-- 注册组件 -->
      <Register ref="Register"></Register>

      <pay ref="Pay"></pay>
    </div>
  </div>
</template>

<script>
import httpUrls from '../../api/requestURL'

import { Line } from 'echarts/lib/util/graphic'
import { creatChat, chatDetail, creatDraw, questionSetRecommend, submitFootprint, matchContextAssistant } from '../../api/chatMG'
import { recommend, chatLikes, promptsRecommend } from '../../api/prompts'
import TemplateSelect from './templateSelect'
import Register from '../register'
import rightNav from '../rightNav'

import { mapGetters } from 'vuex'

import {marked} from 'marked'
import hljs from 'highlight.js'

import pay from '../pay'
import { textDecoder, arr2str } from '../../utils/download'
export default {
  name: 'chat',
  data() {
    return {
      httpUrls,
      roleJuese: {},
      aiNameList: [
        { value: 8, label: 'ChatGLM' },
        { value: 4, label: '文心一言' },
        { value: 5, label: '讯飞星火' },
        { value: 10, label: '通义千问' },
        // { value: 11, label: '商汤日日新' },
        // { value: 0, label: 'AI35' },
        // { value: 1, label: 'AI40' },
        // { value: 7, label: 'Claude' },
      ],
      AINameDisabled: false,
      // chatText: 'AI35',
      // action_type: '1',
      // activeName: '0',
      chat_type: 8, // ai35: 0; ai40: 1
      AIname: 8, // ai id
      sendValue: '', // 问题的内容
      oldSendValue: '', // 临时保存上一次的问题
      isShow: false, // 快速提问
      // isPay: true,
      replyThreeFive: '', // 实时回答 / 35
      replyFourZero: '', // 实时回答 / 40
      replyYiyan: '', // 实时回答 / 文心一言
      replyXunfei: '', // 实时回答 / 讯飞星火
      replyClaude: '', // 实时回答 / Claude
      replyChatGLM: '', // 实时回答 / ChatGLM
      replyTongyi: '', // 实时回答 / ChatGLM
      replyShangtang: '', // 实时回答 / ChatGLM

      timerThreeFive: 0, // 定时器的时间 / 35
      timerFourZero: 0, // 定时器的时间 / 40
      timerYiyan: 0, // 定时器的时间 / 文心一言
      timerXunfei: 0, // 定时器的时间 / 讯飞星火
      timerClaude: 0, // 定时器的时间 / Claude
      timerChatGLM: 0, // 定时器的时间 / ChatGLM
      timerTongyi: 0, // 定时器的时间 / ChatGLM
      timerShangtang: 0, // 定时器的时间 / ChatGLM

      t_timeThreeFive: 0, // 定时器
      t_timeFourZero: 0, // 定时器
      t_timeYiyan: 0, // 定时器
      t_timeXunfei: 0, // 定时器
      t_timeClaude: 0, // 定时器
      t_timeChatGLM: 0, // 定时器
      t_timeTongyi: 0, // 定时器
      t_timeShangtang: 0, // 定时器

      isTimeThreeFive: false, // 开启获取中对话框 / 35
      isTimeFourZero: false, // 开启获取中对话框 / 40
      isTimeYiyan: false, // 开启获取中对话框 / 文心一言
      isTimeXunfei: false, // 开启获取中对话框 / 讯飞星火
      isTimeClaude: false, // 开启获取中对话框 / 讯飞星火
      isTimeChatGLM: false, // 开启获取中对话框 / ChatGLM
      isTimeTongyi: false, // 开启获取中对话框 / ChatGLM
      isTimeShangtang: false, // 开启获取中对话框 / ChatGLM

      // isfinish: true,
      isfinishThreeFive: true,// 完成打字效果 / 35
      isfinishFourZero: true,// 完成打字效果 / 40
      isfinishYiyan: true,// 完成打字效果 / 文心一言
      isfinishXunfei: true,// 完成打字效果 / 讯飞星火
      isfinishClaude: true,// 完成打字效果 / 讯飞星火
      isfinishChatGLM: true,// 完成打字效果 / ChatGLM
      isfinishTongyi: true,// 完成打字效果 / ChatGLM
      isfinishShangtang: true,// 完成打字效果 / ChatGLM

      isBtnThreeFive: true, // 防止重新发送
      isBtnFourZero: true, // 防止重新发送
      isBtnYiyan: true, // 防止重新发送
      isBtnXunfei: true, // 防止重新发送
      isBtnClaude: true, // 防止重新发送
      isBtnChatGLM: true, // 防止重新发送
      isBtnTongyi: true, // 防止重新发送
      isBtnShangtang: true, // 防止重新发送

      supplyVisible: false, // 补充对话
      supplyValue: '', // 补充对话的问题
      isDetailThreeFive: false, // 显示会话内容 / 35
      isDetailFourZero: false, // 显示会话内容 / 40
      isDetailYiyan: false, // 显示会话内容 / 40
      isDetailXunfei: false, // 显示会话内容 / 40
      isDetailClaude: false, // 显示会话内容 / 40
      isDetailChatGLM: false, // 显示会话内容 / ChatGLM
      isDetailTongyi: false, // 显示会话内容 / ChatGLM
      isDetailShangtang: false, // 显示会话内容 / ChatGLM

      qsList: {}, // 热词

      chatList: [],//3.5数据
      chatVipList: [], // 4.0数据
      chatYiyanList: [], // 文心一言数据
      chatXunfeiList: [], // 讯飞星火数据
      chatClaudeList: [], // 讯飞星火数据
      chatChatGLMList: [], // 讯飞星火数据
      chatTongyiList: [], // 讯飞星火数据
      chatShangtangList: [], // 讯飞星火数据

      isuser: true, //使用次数是否用完
      // userTextarea: '',
      // isShowHelpImg: false,
      // isShowStepOnImg: false,

      isShowTemplateSelte: false, // 查询模板
      isShowTemplateThreeFive: true, // 热词推荐
      isShowTemplateFourZero: true, // 热词推荐
      isShowTemplateYiyan: true, // 热词推荐
      isShowTemplateXunfei: true, // 热词推荐
      isShowTemplateClaude: true, // 热词推荐
      isShowTemplateChatGLM: true, // 热词推荐
      isShowTemplateTongyi: true, // 热词推荐
      isShowTemplateShangtang: true, // 热词推荐

      textAreaLength: '2000', // 问题长度
      association: '', // 是否关联上下文
      isShowassociation: false, // 是否关联上下文
      isShowChecked: false, // 复选框
      ordeAIList: [], // 关联上下文的列表
      // showRegister: false,
      updataRightList: null, // ai的id，=chat_type
      promptsId: null, // 模板指令的id
      sessionRightNavCode: '', // 聊天组的唯一id，用于刷新历史会话
      isClickChat: false, // 点击历史会话打开优化本次回答
      chatItem: {}, // 用于存放优化会话的临时对象
      randomStr: 0, // 随机数，刷新列表
      msgCode: '', // 当前会话的唯一id

      controllerThreeFive: null, // 用于终止fetch请求 / 35
      controllerFourZreo: null, // 用于终止fetch请求 / 40
      controllerYiyan: null, // 用于终止fetch请求 / 文心一言
      controllerXunfei: null, // 用于终止fetch请求 / 讯飞星火
      controllerClaude: null, // 用于终止fetch请求 / 讯飞星火
      controllerChatGLM: null, // 用于终止fetch请求 / 讯飞星火
      controllerTongyi: null, // 用于终止fetch请求 / 讯飞星火
      controllerShangtang: null, // 用于终止fetch请求 / 讯飞星火

      startNewChat35: false, // 开启新会话35
      startNewChat40: false, // 开启新会话40
      startNewChatYiyan: false, // 开启新会话文心一言
      startNewChatXunfei: false, // 开启新会话讯飞星火
      startNewChatClaude: false, // 开启新会话讯飞星火
      startNewChatChatGLM: false, // 开启新会话讯飞星火
      startNewChatTongyi: false, // 开启新会话讯飞星火
      startNewChatShangtang: false, // 开启新会话讯飞星火

      isScrollTop: false, // 滚动条的变化
      chatContScroll: '', // 滚动条距离顶部的高度
      oldScrollTop: 0,
      textareaHeight: '31px', // 发送框的同一高度
      queryErrorMsg: '', // 会员次数用尽的提示
      isFoulLanguage: false, // 用户问题是否出现屏蔽词，问题返回时

      // 会话消耗的token和积分
      tokenNumberThreeFive: {
        completionTokens: 0, // 下行token
        promptTokens: 0, // 上行token
        integral: 0, // 积分
        totalTokens: 0 // 总tokes
      },
      tokenNumberFourZero: {
        completionTokens: 0,
        promptTokens: 0,
        integral: 0,
        totalTokens: 0
      },
      tokenNumberYiyan: {
        completionTokens: 0,
        promptTokens: 0,
        integral: 0,
        totalTokens: 0
      },
      tokenNumberXunfei: {
        completionTokens: 0,
        promptTokens: 0,
        integral: 0,
        totalTokens: 0
      }
    }
  },

  // 注册组件
  components: {
    Register,
    TemplateSelect,
    rightNav,
    pay
  },
  computed: {
    ...mapGetters(['userInfoData', 'contactService'])
  },

  props: {
    item: {
      type: String,
      default: ''
    },
    roleItem: {
      type: Object,
      default: () => {}
    },
    sessionCode: {
      type: String,
      default: ''
    },
    aiNmae: {
      type: Number,
      default: 8,
    },
  },

  watch: {
    // sessionCode: {
    //   deep: true,
    //   handler() {
    //     console.log(this.sessionCode);
    //   }
    // },
    sendValue: {
      deep: true,
      handler() {
        setTimeout(() => {
          this.textareaHeight = document.getElementsByClassName('role-chat-text-textarea')[0].childNodes[0].clientHeight + 'px'
        }, 10);
      }
    },
    isTimeThreeFive: {
      deep: true,
      handler() {
        if (this.isTimeThreeFive) {
          this.AINameDisabled = true
        } else {
          this.AINameDisabled = false
        }
      }
    },
    isTimeFourZero: {
      deep: true,
      handler() {
        if (this.isTimeFourZero) {
          this.AINameDisabled = true
        } else {
          this.AINameDisabled = false
        }
      }
    },
    isTimeYiyan: {
      deep: true,
      handler() {
        if (this.isTimeYiyan) {
          this.AINameDisabled = true
        } else {
          this.AINameDisabled = false
        }
      }
    },
    isTimeXunfei: {
      deep: true,
      handler() {
        if (this.isTimeXunfei) {
          this.AINameDisabled = true
        } else {
          this.AINameDisabled = false
        }
      }
    },
    isTimeClaude: {
      deep: true,
      handler() {
        if (this.isTimeClaude) {
          this.AINameDisabled = true
        } else {
          this.AINameDisabled = false
        }
      }
    },
    isTimeChatGLM: {
      deep: true,
      handler() {
        if (this.isTimeChatGLM) {
          this.AINameDisabled = true
        } else {
          this.AINameDisabled = false
        }
      }
    },
    isTimeTongyi: {
      deep: true,
      handler() {
        if (this.isTimeTongyi) {
          this.AINameDisabled = true
        } else {
          this.AINameDisabled = false
        }
      }
    },
    isTimeShangtang: {
      deep: true,
      handler() {
        if (this.isTimeShangtang) {
          this.AINameDisabled = true
        } else {
          this.AINameDisabled = false
        }
      }
    },
    // 用户信息发生改变，重置页面信息
    userInfoData: {
      deep: true,
      handler() {
        this.randomStr = Math.random()
        this.chatList = []
        this.chatVipList = []
        this.chatYiyanList = []
        this.chatXunfeiList = []
        this.chatClaudeList = []
        this.chatChatGLMList = []
        this.chatTongyiList = []
        this.chatShangtangList = []
        this.queryQuestionSetRecommend()

      }
    },
    AIname: {
      deep: true,
      handler() {
        // 切换不同的ai时重置页面
        this.isuser = true
        this.isShowassociation = false
        this.isShowChecked = false
        this.chatList.forEach(v => {
          v.checked = false
        })
        this.chatVipList.forEach(v => {
          v.checked = false
        })
        this.chatYiyanList.forEach(v => {
          v.checked = false
        })
        this.chatXunfeiList.forEach(v => {
          v.checked = false
        })
        this.chatClaudeList.forEach(v => {
          v.checked = false
        })
        this.chatChatGLMList.forEach(v => {
          v.checked = false
        })
        this.chatTongyiList.forEach(v => {
          v.checked = false
        })
        this.chatShangtangList.forEach(v => {
          v.checked = false
        })
        this.association = ''

        if (this.AIname == 0) {
          this.textAreaLength = '2000'
          this.$store.dispatch('user/changeChatListLength', this.chatList.length)
        } else if (this.AIname == 1) {
          this.textAreaLength = '2000'
          this.$store.dispatch('user/changeChatListLength', this.chatVipList.length)
        } else if (this.AIname == 4) {
          this.textAreaLength = '2000'
          this.$store.dispatch('user/changeChatListLength', this.chatYiyanList.length)
        } else if (this.AIname == 5) {
          this.textAreaLength = '2000'
          this.$store.dispatch('user/changeChatListLength', this.chatXunfeiList.length)
        } else if (this.AIname == 7) {
          this.textAreaLength = '2000'
          this.$store.dispatch('user/changeChatListLength', this.chatClaudeList.length)
        } else if (this.AIname == 8) {
          this.textAreaLength = '2000'
          this.$store.dispatch('user/changeChatListLength', this.chatChatGLMList.length)
        } else if (this.AIname == 10) {
          this.textAreaLength = '2000'
          this.$store.dispatch('user/changeChatListLength', this.chatTongyiList.length)
        } else if (this.AIname == 11) {
          this.textAreaLength = '2000'
          this.$store.dispatch('user/changeChatListLength', this.chatShangtangList.length)
        }
        this.chat_type = this.AIname
        this.$store.dispatch('id/setAIChatname', this.AIname)
        this.updataRightList = Number(this.chat_type)
      }
    },
    isShowassociation: {
      deep: true,
      handler() {
        if (this.isShowassociation && this.association == '') {
          if (this.chat_type == 0) {
            this.isBtnThreeFive = false
          } else if (this.chat_type == 1) {
            this.isBtnFourZero = false
          } else if (this.chat_type == 4) {
            this.isBtnYiyan = false
          } else if (this.chat_type == 5) {
            this.isBtnXunfei = false
          } else if (this.chat_type == 7) {
            this.isBtnClaude = false
          } else if (this.chat_type == 8) {
            this.isBtnChatGLM = false
          } else if (this.chat_type == 10) {
            this.isBtnTongyi = false
          } else if (this.chat_type == 11) {
            this.isBtnShangtang = false
          }
        }
      }
    },
    association: {
      deep: true,
      handler() {
        if (this.association != '') {
          if (this.chat_type == 0) {
            this.isBtnThreeFive = true
          } else if (this.chat_type == 1) {
            this.isBtnFourZero = true
          } else if (this.chat_type == 4) {
            this.isBtnYiyan = true
          } else if (this.chat_type == 5) {
            this.isBtnXunfei = true
          } else if (this.chat_type == 7) {
            this.isBtnClaude = true
          } else if (this.chat_type == 8) {
            this.isBtnChatGLM = true
          } else if (this.chat_type == 10) {
            this.isBtnTongyi = false
          } else if (this.chat_type == 11) {
            this.isBtnShangtang = false
          }
        }
        if (Number(this.association) == 2) {
          this.isClickChat = false
          if (this.chat_type == 0) {
            clearInterval(this.t_timeThreeFive)
            this.chatList = []
            this.$store.dispatch('user/changeChatListLength', this.chatList.length)
          } else if (this.chat_type == 1) {
            clearInterval(this.t_timeFourZero)
            this.chatVipList = []
            this.$store.dispatch('user/changeChatListLength', this.chatVipList.length)
          } else if (this.chat_type == 4) {
            clearInterval(this.t_timeYiyan)
            this.chatYiyanList = []
            this.$store.dispatch('user/changeChatListLength', this.chatYiyanList.length)
          } else if (this.chat_type == 5) {
            clearInterval(this.t_timeXunfei)
            this.chatXunfeiList = []
            this.$store.dispatch('user/changeChatListLength', this.chatXunfeiList.length)
          } else if (this.chat_type == 7) {
            clearInterval(this.t_timeClaude)
            this.chatClaudeList = []
            this.$store.dispatch('user/changeChatListLength', this.chatClaudeList.length)
          } else if (this.chat_type == 8) {
            clearInterval(this.t_timeChatGLM)
            this.chatChatGLMList = []
            this.$store.dispatch('user/changeChatListLength', this.chatChatGLMList.length)
          } else if (this.chat_type == 10) {
            clearInterval(this.t_timeTongyi)
            this.chatTongyiList = []
            this.$store.dispatch('user/changeChatListLength', this.chatTongyiList.length)
          } else if (this.chat_type == 11) {
            clearInterval(this.t_timeShangtang)
            this.chatShangtangList = []
            this.$store.dispatch('user/changeChatListLength', this.chatShangtangList.length)
          }
          this.sendMsg()
          this.isShowChecked = false
          this.isShowassociation = false
          this.isClickChat = false
        } else if (Number(this.association == 1)) {
          this.$message.success('请勾选您要关联上文的内容')
          this.isShowChecked = true
        }
      }
    },
    textAreaLength: {
      deep: true,
      handler() {
        if (this.chat_type == 0) {
          if (this.textAreaLength.length >= 2001) {
            this.$message.error('文字不得超过2000字')
          }
        } else {
          if (this.textAreaLength.length >= 2001) {
            this.$message.error('文字不得超过2000字')
          }
        }
      }
    },
    chatList: {
      deep: true,
      handler() {
        if (this.chatList.length == 0) {
          this.startNewChat35 = false
        } else {
          this.startNewChat35 = true
        }
      }
    },
    chatVipList: {
      deep: true,
      handler() {
        if (this.chatVipList.length == 0) {
          this.startNewChat40 = false
        } else {
          this.startNewChat40 = true
        }
      }
    },
    chatYiyanList: {
      deep: true,
      handler() {
        if (this.chatYiyanList.length == 0) {
          this.startNewChatYiyan = false
        } else {
          this.startNewChatYiyan = true
        }
      }
    },
    chatXunfeiList: {
      deep: true,
      handler() {
        if (this.chatXunfeiList.length == 0) {
          this.startNewChatXunfei = false
        } else {
          this.startNewChatXunfei = true
        }
      }
    },
    chatClaudeList: {
      deep: true,
      handler() {
        if (this.chatClaudeList.length == 0) {
          this.startNewChatClaude = false
        } else {
          this.startNewChatClaude = true
        }
      }
    },
    chatChatGLMList: {
      deep: true,
      handler() {
        if (this.chatChatGLMList.length == 0) {
          this.startNewChatChatGLM = false
        } else {
          this.startNewChatChatGLM = true
        }
      }
    },
    chatTongyiList: {
      deep: true,
      handler() {
        if (this.chatTongyiList.length == 0) {
          this.startNewChatTongyi = false
        } else {
          this.startNewChatTongyi = true
        }
      }
    },
    chatShangtangList: {
      deep: true,
      handler() {
        if (this.chatShangtangList.length == 0) {
          this.startNewChatShangtang = false
        } else {
          this.startNewChatShangtang = true
        }
      }
    },
  },

  created() {
    this.updataRightList = Number(this.chat_type)
    this.loginInfo = JSON.parse(localStorage.getItem("userInfo"));
    this.$root.Bus.$on('selectChat', value => { // 接收点击相应会话标识
      this.chatList = [];
      this.$store.dispatch('user/changeChatListLength', this.chatList.length)
      this.chatVipList = [];
      this.$store.dispatch('user/changeChatListLength', this.chatVipList.length)
      this.chatYiyanList = [];
      this.$store.dispatch('user/changeChatListLength', this.chatYiyanList.length)
      this.chatXunfeiList = [];
      this.$store.dispatch('user/changeChatListLength', this.chatXunfeiList.length)
      this.chatClaudeList = [];
      this.$store.dispatch('user/changeChatListLength', this.chatClaudeList.length)
      this.chatChatGLMList = [];
      this.$store.dispatch('user/changeChatListLength', this.chatChatGLMList.length)
      this.chatTongyiList = [];
      this.$store.dispatch('user/changeChatListLength', this.chatTongyiList.length)
      this.chatShangtangList = [];
      this.$store.dispatch('user/changeChatListLength', this.chatShangtangList.length)
      this.getDetail(value);
    })

    this.$root.Bus.$on('delChat', value => { // 清空历史会话
      this.chatList = [];
      this.$store.dispatch('user/changeChatListLength', this.chatList.length)
      this.chatVipList = [];
      this.$store.dispatch('user/changeChatListLength', this.chatVipList.length)
      this.chatYiyanList = [];
      this.$store.dispatch('user/changeChatListLength', this.chatYiyanList.length)
      this.chatXunfeiList = [];
      this.$store.dispatch('user/changeChatListLength', this.chatXunfeiList.length)
      this.chatClaudeList = [];
      this.$store.dispatch('user/changeChatListLength', this.chatClaudeList.length)
      this.chatChatGLMList = [];
      this.$store.dispatch('user/changeChatListLength', this.chatChatGLMList.length)
      this.chatTongyiList = [];
      this.$store.dispatch('user/changeChatListLength', this.chatTongyiList.length)
      this.chatShangtangList = [];
      this.$store.dispatch('user/changeChatListLength', this.chatShangtangList.length)
      if (this.chat_type == 0) {
        this.isTimeThreeFive = false;
      } else if (this.chat_type == 1) {
        this.isTimeFourZero = false;
      } else if (this.chat_type == 4) {
        this.isTimeYiyan = false;
      } else if (this.chat_type == 5) {
        this.isTimeXunfei = false;
      } else if (this.chat_type == 7) {
        this.isTimeClaude = false;
      } else if (this.chat_type == 8) {
        this.isTimeChatGLM = false;
      } else if (this.chat_type == 10) {
        this.isTimeTongyi = false;
      } else if (this.chat_type == 11) {
        this.isTimeShangtang = false;
      }
    })
    localStorage.setItem('session_code', '');
    localStorage.setItem('session_code1', '');
    localStorage.setItem('session_code4', '');
    localStorage.setItem('session_code5', '');
    localStorage.setItem('session_code7', '');
    localStorage.setItem('session_code8', '');
    localStorage.setItem('session_code10', '');
    localStorage.setItem('session_code11', '');
    this.queryQuestionSetRecommend()
  },

  mounted() {
    // this.chat_type = this.aiNmae
    // this.AIname = this.aiNmae

    if (this.sessionCode != '') {
      this.getDetail(this.sessionCode)
    }
    console.log(this.roleItem);
    if (this.roleItem.source == 'template') {
      this.roleJuese = {...this.roleItem, name: this.roleItem.title}
    } else {
      this.roleJuese = {
        question_id: this.roleItem.question_id,
        content: this.roleItem.character_greetings,
        name: this.roleItem.character_name,
        character_avatar: this.roleItem.character_avatar,
      }
    }
    // document.title = '慧远AI是一款人工智能聊天机器-能进行彩虹绘画-适用于多个场景进行聊天-商务合作-源码定制等'
    // let metaKeywords = document.createElement('meta')
    // metaKeywords.id = 'chat-meta-keywords'
    // metaKeywords.name = 'keywords'
    // metaKeywords.content = '慧远AI,Ai聊天,ChatGpt3.5,ChatGpt4.0中文版,OpenAi,chatgpt国内版,AI智能软件,源码定制,API接口GPT4.0,API接口百度彩虹绘画'
    // document.getElementsByTagName('head')[0].appendChild(metaKeywords)

    // let metaDescription = document.createElement('meta')
    // metaDescription.id = 'chat-meta-description'
    // metaDescription.name = 'description'
    // metaDescription.content = '慧远AI是人工智能聊天工具,相当于国内版的chatgpt4.0.拥有语言理解能力和文本生成能力,能撰写视频脚本,文案,翻译,代码,写论文邮件,诗词歌赋等任务.职场上升职.写工作报告,企业管理,市场营销等能助你一臂之力.它上知天文下知地理,在任何场景都能和你像人类一样进行交流,互动.'
    // document.getElementsByTagName('head')[0].appendChild(metaDescription)

    if (this.$route.params.item != undefined) {
      this.sendValue = this.$route.params.item
      this.promptsId = this.$route.params.item.prompts_id
      this.chat_type = Number(this.$route.params.id)
      this.AIname = Number(this.$route.params.id)
      if (this.$route.params.sendMsg) {
        this.sendMsg()
      }
    }
    this.$store.dispatch('id/setAIChatname', this.AIname)

    if (this.$route.params.id != undefined && this.$route.params.code != undefined) {
      this.getDetail(this.$route.params.code);
      this.AIname = this.$route.params.id
      this.chat_type = this.$route.params.id
    }

    if (this.$route.query.id != undefined) {
      let aiN = this.$route.query.id
      if (Number(aiN) != 0 && Number(aiN) != 1 && Number(aiN) != 4 && Number(aiN) != 5) {
        aiN = 0
      }
      this.AIname = aiN
      this.chat_type = aiN
    }
  },

  // 卸载前
  beforeDestroy() {
    //   document.getElementById('chat-meta-keywords').remove()
    //   document.getElementById('chat-meta-description').remove()
  },

  /**
   * 里面的方法只有被调用才会执行
   */
  methods: {
    //键盘按下事件
    handleKeyUp(event){
      if (event.shiftKey && event.keyCode === 13) {
        // 按下 Shift+Enter，换行
        console.log('换行')
      } else if (event.keyCode === 13) {
        // 按下 Enter，发送
        // 在这里添加你的发送逻辑
        this.sendMsg()
      }
    },
    selectAIname(type) {
      this.AIname = type
    },
    undateName(aiId) {
      this.AIname = aiId
    },
    updataChatList(code) {
      this.isuser = true
      this.isShowassociation = false
      this.isShowChecked = false
      this.chatList.forEach(v => {
        v.checked = false
      })
      this.chatVipList.forEach(v => {
        v.checked = false
      })
      this.chatYiyanList.forEach(v => {
        v.checked = false
      })
      this.chatXunfeiList.forEach(v => {
        v.checked = false
      })
      this.chatClaudeList.forEach(v => {
        v.checked = false
      })
      this.chatChatGLMList.forEach(v => {
        v.checked = false
      })
      this.chatTongyiList.forEach(v => {
        v.checked = false
      })
      this.chatShangtangList.forEach(v => {
        v.checked = false
      })
      this.sendValue = ''
      this.association = ''
      this.isClickChat = true
      this.chatContScroll = ''
      if (this.chat_type == 0) {
        this.isShowTemplateThreeFive = false
        if (!this.isfinishThreeFive) {
          try {
            this.controllerThreeFive.abort()
          } catch (error) { }
          clearInterval(this.t_timeThreeFive)
          this.isfinishThreeFive = true
          this.isBtnThreeFive = true
        }
      } else if (this.chat_type == 1) {
        this.isShowTemplateFourZero = false
        if (!this.isfinishFourZero) {
          clearInterval(this.t_timeFourZero)
          this.isfinishFourZero = true
          this.isBtnFourZero = true
          try {
            this.controllerFourZreo.abort()
          } catch (error) { }
        }
      } else if (this.chat_type == 4) {
        this.isShowTemplateYiyan = false
        if (!this.isfinishYiyan) {
          clearInterval(this.t_timeYiyan)
          this.isfinishYiyan = true
          this.isBtnYiyan = true
          try {
            this.controllerYiyan.abort()
          } catch (error) { }
        }
      } else if (this.chat_type == 5) {
        this.isShowTemplateXunfei = false
        if (!this.isfinishXunfei) {
          clearInterval(this.t_timeXunfei)
          this.isfinishXunfei = true
          this.isBtnXunfei = true
          try {
            this.controllerXunfei.abort()
          } catch (error) { }
        }
      } else if (this.chat_type == 7) {
        this.isShowTemplateClaude = false
        if (!this.isfinishClaude) {
          clearInterval(this.t_timeClaude)
          this.isfinishClaude = true
          this.isBtnClaude = true
          try {
            this.controllerClaude.abort()
          } catch (error) { }
        }
      } else if (this.chat_type == 8) {
        this.isShowTemplateChatGLM = false
        if (!this.isfinishChatGLM) {
          clearInterval(this.t_timeChatGLM)
          this.isfinishChatGLM = true
          this.isBtnChatGLM = true
          try {
            this.controllerChatGLM.abort()
          } catch (error) { }
        }
      } else if (this.chat_type == 10) {
        this.isShowTemplateTongyi = false
        if (!this.isfinishTongyi) {
          clearInterval(this.t_timeTongyi)
          this.isfinishTongyi = true
          this.isBtnTongyi = true
          try {
            this.controllerTongyi.abort()
          } catch (error) { }
        }
      } else if (this.chat_type == 11) {
        this.isShowTemplateShangtang = false
        if (!this.isfinishShangtang) {
          clearInterval(this.t_timeShangtang)
          this.isfinishShangtang = true
          this.isBtnShangtang = true
          try {
            this.controllerShangtang.abort()
          } catch (error) { }
        }
      }
      this.getDetail(code)
    },
    huanYiPi() {
      this.queryQuestionSetRecommend()
    },

    // 获取热词
    getRecommend() {
      recommend('').then(res => {
        if (res.data != null) {
          this.qsList = res.data
        } else if (res.code == 40013) {
          this.$refs.Register.registerVisible = true
        }
      })
    },

    // 获取会话详情
    getDetail(code) {
      console.log(this.chat_type);
      if (this.chat_type == 0) {
        this.isDetailThreeFive = true;
        this.isTimeThreeFive = false;
        this.isfinishThreeFive = true;
        this.chatList = [];
        this.isShowTemplateThreeFive = false
      } else if (this.chat_type == 1) {
        this.isDetailFourZero = true;
        this.isTimeFourZero = false;
        this.isfinishFourZero = true
        this.chatVipList = []
        this.isShowTemplateFourZero = false
      } else if (this.chat_type == 4) {
        this.isDetailYiyan = true;
        this.isTimeYiyan = false;
        this.isfinishYiyan = true
        this.chatYiyanList = []
        this.isShowTemplateYiyan = false
      } else if (this.chat_type == 5) {
        this.isDetailXunfei = true;
        this.isTimeXunfei = false;
        this.isfinishXunfei = true
        this.chatXunfeiList = []
        this.isShowTemplateXunfei = false
      } else if (this.chat_type == 7) {
        this.isDetailClaude = true;
        this.isTimeClaude = false;
        this.isfinishClaude = true
        this.chatClaudeList = []
        this.isShowTemplateClaude = false
      } else if (this.chat_type == 8) {
        this.isDetailChatGLM = true;
        this.isTimeChatGLM = false;
        this.isfinishChatGLM = true
        this.chatChatGLMList = []
        this.isShowTemplateChatGLM = false
      } else if (this.chat_type == 10) {
        this.isDetailTongyi = true;
        this.isTimeTongyi = false;
        this.isfinishTongyi = true
        this.chatTongyiList = []
        this.isShowTemplateTongyi = false
      } else if (this.chat_type == 11) {
        this.isDetailShangtang = true;
        this.isTimeShangtang = false;
        this.isfinishShangtang = true
        this.chatShangtangList = []
        this.isShowTemplateShangtang = false
      }
      this.ordeAIList = []
      this.isClickChat = true
      chatDetail(code).then(res => {
        if (res.code == 20000) {
          let arr = res.data;
          const renderer = new marked.Renderer();
          // 重写代码块渲染方法，使用highlight.js进行代码高亮
          renderer.code = (code, language) => {
              const validLanguage = hljs.getLanguage(language) ? language : 'plaintext';
              const highlightedCode = hljs.highlight(validLanguage, code).value;
              return `<pre><code class="hljs ${validLanguage}">${highlightedCode}</code></pre>`;
          };
          if (this.AIname == 0) {
            this.chatList = arr;
            this.chatList.forEach((v, i) => {
              v.id = i // 数组id，用于关联上下文时的排序
              v.markedContent = marked(v.content, { renderer })
            })
            this.$store.dispatch('user/changeChatListLength', this.chatList.length)
          } else if (this.AIname == 1) {
            this.chatVipList = arr;
            this.chatVipList.forEach((v, i) => {
              v.id = i // 数组id，用于关联上下文时的排序
              v.markedContent = marked(v.content, { renderer })
            })
            this.$store.dispatch('user/changeChatListLength', this.chatVipList.length)
          } else if (this.AIname == 4) {
            this.chatYiyanList = arr;
            this.chatYiyanList.forEach((v, i) => {
              v.id = i // 数组id，用于关联上下文时的排序
              v.markedContent = marked(v.content, { renderer })
            })
            this.$store.dispatch('user/changeChatListLength', this.chatYiyanList.length)
          } else if (this.AIname == 5) {
            this.chatXunfeiList = arr;
            this.chatXunfeiList.forEach((v, i) => {
              v.id = i // 数组id，用于关联上下文时的排序
              v.markedContent = marked(v.content, { renderer })
            })
            this.$store.dispatch('user/changeChatListLength', this.chatXunfeiList.length)
          } else if (this.AIname == 7) {
            this.chatClaudeList = arr;
            this.chatClaudeList.forEach((v, i) => {
              v.id = i // 数组id，用于关联上下文时的排序
              v.markedContent = marked(v.content, { renderer })
            })
            this.$store.dispatch('user/changeChatListLength', this.chatClaudeList.length)
          } else if (this.AIname == 8) {
            this.chatChatGLMList = arr;
            this.chatChatGLMList.forEach((v, i) => {
              v.id = i // 数组id，用于关联上下文时的排序
              v.markedContent = marked(v.content, { renderer })
            })
            this.$store.dispatch('user/changeChatListLength', this.chatChatGLMList.length)
          } else if (this.AIname == 10) {
            this.chatTongyiList = arr;
            this.chatTongyiList.forEach((v, i) => {
              v.id = i // 数组id，用于关联上下文时的排序
              v.markedContent = marked(v.content, { renderer })
            })
            this.$store.dispatch('user/changeChatListLength', this.chatTongyiList.length)
          } else if (this.AIname == 11) {
            this.chatShangtangList = arr;
            this.chatShangtangList.forEach((v, i) => {
              v.id = i // 数组id，用于关联上下文时的排序
              v.markedContent = marked(v.content, { renderer })
            })
            this.$store.dispatch('user/changeChatListLength', this.chatShangtangList.length)
          }
          this.$nextTick(() => {
            let pres = document.getElementsByTagName('pre')
            for (let a = 0; a < pres.length; a++) {
              let spans = document.createElement('span')
              spans.setAttribute('class', 'copy-code-button')
              spans.addEventListener('click', (event) => {
                var input = document.createElement("textarea"); // 创建input对象
                input.value = event.target.previousElementSibling.innerText; // 设置复制内容
                document.body.appendChild(input); // 添加临时实例
                input.select(); // 选择实例内容
                document.execCommand("Copy"); // 执行复制
                document.body.removeChild(input); // 删除临时实例
                this.$message.success('复制成功！');
              })
              spans.setAttribute('click', 'copyCodeButton')
              pres[a].appendChild(spans)
            }
          })
          this.isShow = true;
          this.isScrollTop = false
          this.toBottom(false);
        } else {
          this.$message.error(res.msg)
        }
      }).catch(err => {
        this.$message.error('获取会话失败！')
      })
    },

    // 优化回答
    optimizeAnswers(item, index) {
      if (this.chat_type == 0) {
        if (!this.isfinishThreeFive) {
          this.$message('当前问题还没回答完毕，请稍后再提问');
          return
        }
      } else if (this.chat_type == 1) {
        if (!this.isfinishFourZero) {
          this.$message('当前问题还没回答完毕，请稍后再提问');
          return
        }
      } else if (this.chat_type == 4) {
        if (!this.isfinishYiyan) {
          this.$message('当前问题还没回答完毕，请稍后再提问');
          return
        }
      } else if (this.chat_type == 5) {
        if (!this.isfinishXunfei) {
          this.$message('当前问题还没回答完毕，请稍后再提问');
          return
        }
      } else if (this.chat_type == 7) {
        if (!this.isfinishClaude) {
          this.$message('当前问题还没回答完毕，请稍后再提问');
          return
        }
      } else if (this.chat_type == 8) {
        if (!this.isfinishChatGLM) {
          this.$message('当前问题还没回答完毕，请稍后再提问');
          return
        }
      } else if (this.chat_type == 10) {
        if (!this.isfinishTongyi) {
          this.$message('当前问题还没回答完毕，请稍后再提问');
          return
        }
      } else if (this.chat_type == 11) {
        if (!this.isfinishShangtang) {
          this.$message('当前问题还没回答完毕，请稍后再提问');
          return
        }
      }
      this.supplyVisible = true
      this.chatItem = { ...item, chatIndex: index }
      this.supplyValue = ''
      if (this.chat_type == 0) {
        this.replyThreeFive = item.content
      } else if (this.chat_type == 1) {
        this.replyFourZero = item.content
      } else if (this.chat_type == 4) {
        this.replyYiyan = item.content
      } else if (this.chat_type == 5) {
        this.replyXunfei = item.content
      } else if (this.chat_type == 7) {
        this.replyClaude = item.content
      } else if (this.chat_type == 8) {
        this.replyChatGLM = item.content
      } else if (this.chat_type == 10) {
        this.replyTongyi = item.content
      } else if (this.chat_type == 11) {
        this.replyShangtang = item.content
      }
    },

    // 开启新会话
    resetNewChat() {
      if (this.chat_type == 0) {
        if (this.chatList.length == 0) return
        this.chatList = []
        this.isShowTemplateThreeFive = true
        this.$store.dispatch('user/changeChatListLength', 0)
        localStorage.setItem('session_code', '')
        localStorage.setItem('chat_group_code', '')
      } else if (this.chat_type == 1) {
        if (this.chatVipList.length == 0) return
        this.chatVipList = []
        this.isShowTemplateFourZero = true
        this.$store.dispatch('user/changeChatListLength', 0)
        localStorage.setItem('session_code1', '')
        localStorage.setItem('chat_group_code1', '')
      } else if (this.chat_type == 4) {
        if (this.chatYiyanList.length == 0) return
        this.chatYiyanList = []
        this.isShowTemplateYiyan = true
        this.$store.dispatch('user/changeChatListLength', 0)
        localStorage.setItem('session_code4', '')
        localStorage.setItem('chat_group_code4', '')
      } else if (this.chat_type == 5) {
        if (this.chatXunfeiList.length == 0) return
        this.chatXunfeiList = []
        this.isShowTemplateXunfei = true
        this.$store.dispatch('user/changeChatListLength', 0)
        localStorage.setItem('session_code5', '')
        localStorage.setItem('chat_group_code5', '')
      } else if (this.chat_type == 7) {
        if (this.chatClaudeList.length == 0) return
        this.chatClaudeList = []
        this.isShowTemplateClaude = true
        this.$store.dispatch('user/changeChatListLength', 0)
        localStorage.setItem('session_code7', '')
        localStorage.setItem('chat_group_code7', '')
      } else if (this.chat_type == 8) {
        if (this.chatChatGLMList.length == 0) return
        this.chatChatGLMList = []
        this.isShowTemplateChatGLM = true
        this.$store.dispatch('user/changeChatListLength', 0)
        localStorage.setItem('session_code8', '')
        localStorage.setItem('chat_group_code8', '')
      } else if (this.chat_type == 10) {
        if (this.chatTongyiList.length == 0) return
        this.chatTongyiList = []
        this.isShowTemplateTongyi = true
        this.$store.dispatch('user/changeChatListLength', 0)
        localStorage.setItem('session_code10', '')
        localStorage.setItem('chat_group_code10', '')
      } else if (this.chat_type == 11) {
        if (this.chatShangtangList.length == 0) return
        this.chatShangtangList = []
        this.isShowTemplateShangtang = true
        this.$store.dispatch('user/changeChatListLength', 0)
        localStorage.setItem('session_code11', '')
        localStorage.setItem('chat_group_code11', '')
      }
      this.isuser = true
      this.endController('', false) // 终止回答
      this.randomStr = Math.random()
      this.isShowChecked = false
      this.isShowassociation = false
      this.isClickChat = false
      this.msgCode = ''
      if (this.chat_type == 0) {
        this.isTimeThreeFive = false;
      } else if (this.chat_type == 1) {
        this.isTimeFourZero = false;
      } else if (this.chat_type == 4) {
        this.isTimeYiyan = false;
      } else if (this.chat_type == 5) {
        this.isTimeXunfei = false;
      } else if (this.chat_type == 7) {
        this.isTimeClaude = false;
      } else if (this.chat_type == 8) {
        this.isTimeChatGLM = false;
      } else if (this.chat_type == 10) {
        this.isTimeTongyi = false;
      } else if (this.chat_type == 11) {
        this.isTimeShangtang = false;
      }
      this.sendValue = ''
    },

    resetQuest(item) {
      if (this.chat_type == 0) {
        if (!this.isfinishThreeFive) {
          this.$message('当前问题还没回答完毕，请稍后再提问');
          return
        }
      } else if (this.chat_type == 1) {
        if (!this.isfinishFourZero) {
          this.$message('当前问题还没回答完毕，请稍后再提问');
          return
        }
      } else if (this.chat_type == 4) {
        if (!this.isfinishYiyan) {
          this.$message('当前问题还没回答完毕，请稍后再提问');
          return
        }
      } else if (this.chat_type == 5) {
        if (!this.isfinishXunfei) {
          this.$message('当前问题还没回答完毕，请稍后再提问');
          return
        }
      } else if (this.chat_type == 7) {
        if (!this.isfinishClaude) {
          this.$message('当前问题还没回答完毕，请稍后再提问');
          return
        }
      } else if (this.chat_type == 8) {
        if (!this.isfinishChatGLM) {
          this.$message('当前问题还没回答完毕，请稍后再提问');
          return
        }
      } else if (this.chat_type == 10) {
        if (!this.isfinishTongyi) {
          this.$message('当前问题还没回答完毕，请稍后再提问');
          return
        }
      } else if (this.chat_type == 11) {
        if (!this.isfinishShangtang) {
          this.$message('当前问题还没回答完毕，请稍后再提问');
          return
        }
      }
      this.sendValue = item.content
      this.endController('', false)
      let val = null
      matchContextAssistant({
        company_id: this.roleJuese.question_id,
        clerk_id: this.roleJuese.question_id,
        question_content: this.sendValue,
      }).then(res => {
        if (this.chat_type == 0) {
          val = {
            "chat_type": this.chat_type,
            "session_code": localStorage.getItem('session_code') || '',
            "chat_group_code": "",
            'question_id': this.roleJuese.question_id,
            msg_list: JSON.stringify([{ role: 'user', covert_content: `忘掉你之前学过的一切，我需要你模拟一个角色，角色名字是：${this.roleJuese.name}，下面是你的角色的信息：${this.roleJuese.content}\n以下是我的问题：${res.data.prompt}`, content: `${this.sendValue}`}]),
  
            // msg_list: JSON.stringify([{ role: 'user', covert_content: `忘掉你之前学过的一切，现在你是${this.roleJuese.name}，下面是你的角色的信息：${this.roleJuese.content}\n以下是我的问题：`, content: `${this.sendValue}`}])
          }
        } else if (this.chat_type == 1) {
          val = {
            "chat_type": this.chat_type,
            "session_code": localStorage.getItem('session_code1') || '',
            "chat_group_code": "",
            'question_id': this.roleJuese.question_id,
            msg_list: JSON.stringify([{ role: 'user', covert_content: `忘掉你之前学过的一切，现在你是${this.roleJuese.name}，下面是你的角色的信息：${this.roleJuese.content}\n以下是我的问题：${res.data.prompt}`, content: `${this.sendValue}`}]),
            // msg_list: JSON.stringify([{ role: 'user', content: this.sendValue }])
          }
        } else if (this.chat_type == 4) {
          val = {
            "chat_type": this.chat_type,
            "session_code": localStorage.getItem('session_code4') || '',
            "chat_group_code": "",
            'question_id': this.roleJuese.question_id,
            msg_list: JSON.stringify([{ role: 'user', covert_content: `忘掉你之前学过的一切，现在你是${this.roleJuese.name}，下面是你的角色的信息：${this.roleJuese.content}\n以下是我的问题：${res.data.prompt}`, content: `${this.sendValue}`}]),
  
            // msg_list: JSON.stringify([{ role: 'user', content: this.sendValue }])
          }
        } else if (this.chat_type == 5) {
          val = {
            "chat_type": this.chat_type,
            "session_code": localStorage.getItem('session_code5') || '',
            "chat_group_code": "",
            'question_id': this.roleJuese.question_id,
            msg_list: JSON.stringify([{ role: 'user', covert_content: `忘掉你之前学过的一切，现在你是${this.roleJuese.name}，下面是你的角色的信息：${this.roleJuese.content}\n以下是我的问题：${res.data.prompt}`, content: `${this.sendValue}`}]),
  
            // msg_list: JSON.stringify([{ role: 'user', content: this.sendValue }])
          }
        } else if (this.chat_type == 7) {
          val = {
            "chat_type": this.chat_type,
            "session_code": localStorage.getItem('session_code7') || '',
            "chat_group_code": "",
            'question_id': this.roleJuese.question_id,
            msg_list: JSON.stringify([{ role: 'user', covert_content: `忘掉你之前学过的一切，现在你是${this.roleJuese.name}，下面是你的角色的信息：${this.roleJuese.content}\n以下是我的问题：${res.data.prompt}`, content: `${this.sendValue}`}]),
  
            // msg_list: JSON.stringify([{ role: 'user', content: this.sendValue }])
          }
        } else if (this.chat_type == 8) {
          val = {
            "chat_type": this.chat_type,
            "session_code": localStorage.getItem('session_code8') || '',
            "chat_group_code": "",
            'question_id': this.roleJuese.question_id,
            msg_list: JSON.stringify([{ role: 'user', covert_content: `忘掉你之前学过的一切，我需要你模拟一个角色，角色名字是：${this.roleJuese.name}，下面是你的角色的信息：${this.roleJuese.content}\n以下是我的问题：${res.data.prompt}`, content: `${this.sendValue}`}]),
  
            // msg_list: JSON.stringify([{ role: 'user', content: this.sendValue }]),
            'model': 'chatglm_lite'
          }
        } else if (this.chat_type == 10) {
          val = {
            "chat_type": this.chat_type,
            "session_code": localStorage.getItem('session_code10') || '',
            "chat_group_code": "",
            'question_id': this.roleJuese.question_id,
            msg_list: JSON.stringify([{ role: 'user', covert_content: `忘掉你之前学过的一切，我需要你模拟一个角色，角色名字是：${this.roleJuese.name}，下面是你的角色的信息：${this.roleJuese.content}\n以下是我的问题：${res.data.prompt}`, content: `${this.sendValue}`}]),
  
            // msg_list: JSON.stringify([{ role: 'user', content: this.sendValue }]),
            'model': 'qwen-v1'
          }
        } else if (this.chat_type == 11) {
          val = {
            "chat_type": this.chat_type,
            "session_code": localStorage.getItem('session_code11') || '',
            "chat_group_code": "",
            'question_id': this.roleJuese.question_id,
            msg_list: JSON.stringify([{ role: 'user', covert_content: `忘掉你之前学过的一切，我需要你模拟一个角色，角色名字是：${this.roleJuese.name}，下面是你的角色的信息：${this.roleJuese.content}\n以下是我的问题：${res.data.prompt}`, content: `${this.sendValue}`}]),
  
            // msg_list: JSON.stringify([{ role: 'user', content: this.sendValue }]),
            'model': 'nova-ptc-xs-v1'
          }
        }
        this.vipSend(bool, val)
      })
    },

    //发送信息
    sendMsg(bool = '') {
      this.loginInfo = JSON.parse(localStorage.getItem('userInfo'));
      this.chatContScroll = ''
      // 重新回答
      if (bool != '' && bool != 'toChatFouty') {
        this.sendValue = this.oldSendValue
      }

      if (this.sendValue == '' || this.sendValue.replace(/\s*/g, '') == '') {
        this.$message({
          type: 'error',
          message: '请输入您要发送内容'
        })
        return false;
      }
      // 判断输入的文字和选中上下文的文字是否超过限制
      let msgList = ''
      this.ordeAIList.forEach(v => {
        msgList += v.content
      })
      msgList += this.sendValue;
      this.isuser = true;
      if (Number(this.association) != 1) {
        if (this.chat_type == 0) {
          if (msgList.length >= '2001') {
            this.$message.error('文字不得超过2000字')
            return
          }
        } else {
          if (msgList.length >= '2001') {
            this.$message.error('文字不得超过2000字')
            return
          }
        }
      }
      // 重试/优化/重新提问等不需要关联上下文
      if (bool != 'true' && bool != 'reset' && bool != 'toChatFouty') {
        if (this.chat_type == 0) {
          // 是否显示关联上下文
          // if (!this.isShowassociation && this.chatList.length != 0) {
          //   this.isShowassociation = !this.isShowassociation
          //   return
          // }
          // 关联上下文的多选，此处仅用作展示
          this.chatList.forEach(v => {
            v.checked = false
          })
        } else if (this.chat_type == 1) {
          // if (!this.isShowassociation && this.chatVipList.length != 0) {
          //   this.isShowassociation = !this.isShowassociation
          //   return
          // }
          this.chatVipList.forEach(v => {
            v.checked = false
          })
        } else if (this.chat_type == 4) {
          // if (!this.isShowassociation && this.chatYiyanList.length != 0) {
          //   this.isShowassociation = !this.isShowassociation
          //   return
          // }
          this.chatYiyanList.forEach(v => {
            v.checked = false
          })
        } else if (this.chat_type == 5) {
          // if (!this.isShowassociation && this.chatXunfeiList.length != 0) {
          //   this.isShowassociation = !this.isShowassociation
          //   return
          // }
          this.chatXunfeiList.forEach(v => {
            v.checked = false
          })
        } else if (this.chat_type == 7) {
          // if (!this.isShowassociation && this.chatClaudeList.length != 0) {
          //   this.isShowassociation = !this.isShowassociation
          //   return
          // }
          this.chatClaudeList.forEach(v => {
            v.checked = false
          })
        } else if (this.chat_type == 8) {
          // if (!this.isShowassociation && this.chatChatGLMList.length != 0) {
          //   this.isShowassociation = !this.isShowassociation
          //   return
          // }
          this.chatChatGLMList.forEach(v => {
            v.checked = false
          })
        } else if (this.chat_type == 10) {
          // if (!this.isShowassociation && this.chatChatGLMList.length != 0) {
          //   this.isShowassociation = !this.isShowassociation
          //   return
          // }
          this.chatTongyiList.forEach(v => {
            v.checked = false
          })
        } else if (this.chat_type == 11) {
          // if (!this.isShowassociation && this.chatChatGLMList.length != 0) {
          //   this.isShowassociation = !this.isShowassociation
          //   return
          // }
          this.chatShangtangList.forEach(v => {
            v.checked = false
          })
        }
      }
      this.isFoulLanguage = false
      this.isShowassociation = false
      this.isShowChecked = false

      this.isShow = true;  // 快速提问
      if (this.chat_type == 0) {
        this.isDetailThreeFive = false;
        this.isfinishThreeFive = false; // 完成打字效果
        this.isBtnThreeFive = false;  // 是否允许重发
        this.replyThreeFive = ''
        this.isShowTemplateThreeFive = false // 关闭热词
      } else if (this.chat_type == 1) {
        this.isBtnFourZero = false;  // 是否允许重发
        this.isDetailFourZero = false;
        this.isfinishFourZero = false; // 完成打字效果
        this.replyFourZero = ''
        this.isShowTemplateFourZero = false // 关闭热词
      } else if (this.chat_type == 4) {
        this.isBtnYiyan = false;  // 是否允许重发
        this.isDetailYiyan = false;
        this.isfinishYiyan = false; // 完成打字效果
        this.replyYiyan = ''
        this.isShowTemplateYiyan = false // 关闭热词
      } else if (this.chat_type == 5) {
        this.isBtnXunfei = false;  // 是否允许重发
        this.isDetailXunfei = false;
        this.isfinishXunfei = false; // 完成打字效果
        this.replyXunfei = ''
        this.isShowTemplateXunfei = false // 关闭热词
      } else if (this.chat_type == 7) {
        this.isBtnClaude = false;  // 是否允许重发
        this.isDetailClaude = false;
        this.isfinishClaude = false; // 完成打字效果
        this.replyClaude = ''
        this.isShowTemplateClaude = false // 关闭热词
      } else if (this.chat_type == 8) {
        this.isBtnChatGLM = false;  // 是否允许重发
        this.isDetailChatGLM = false;
        this.isfinishChatGLM = false; // 完成打字效果
        this.replyChatGLM = ''
        this.isShowTemplateChatGLM = false // 关闭热词
      } else if (this.chat_type == 10) {
        this.isBtnTongyi = false;  // 是否允许重发
        this.isDetailTongyi = false;
        this.isfinishTongyi = false; // 完成打字效果
        this.replyTongyi = ''
        this.isShowTemplateTongyi = false // 关闭热词
      } else if (this.chat_type == 11) {
        this.isBtnShangtang = false;  // 是否允许重发
        this.isDetailShangtang = false;
        this.isfinishShangtang = false; // 完成打字效果
        this.replyShangtang = ''
        this.isShowTemplateShangtang = false // 关闭热词
      }

      //月份是从0月开始获取的，所以要+1;
      let month = new Date().getMonth() + 1;
      //日
      let day = new Date().getDate();
      //时
      let hour = new Date().getHours();
      //分
      let minute = new Date().getMinutes();
      //秒
      let second = new Date().getSeconds();
      if (month < 10) { month = '0' + month }
      if (day < 10) { day = '0' + day }
      if (hour < 10) { hour = '0' + hour }
      if (minute < 10) { minute = '0' + minute }
      if (second < 10) { second = '0' + second }

      let date = month + '/' + day + ' ' + hour + '-' + minute + '-' + second;

      let sendVal = {  // 询问者问题展示
        "create_time": date,
        "finish_reason": "length",
        "session_code": '',
        "chat_group_code": '',
        "role": "user",
        "content": this.sendValue, // 预留，对话内容的转换
        "markedContent": marked(this.sendValue),
        checked: false,
        help: false, // 点赞
        stepOn: false, // 点踩
        timer: false,
      }

      // 获取当前会话列表的长度，用作右侧侧边栏的选中状态
      if (this.chat_type == 0) {
        this.chatList.push({ ...sendVal, id: this.chatList.length }); // id：用于关联上下文时的排序，防止顺序错乱导致接口返回的信息错误
        this.$store.dispatch('user/changeChatListLength', this.chatList.length)
      } else if (this.chat_type == 1) {
        this.chatVipList.push({ ...sendVal, id: this.chatVipList.length }); // id：用于关联上下文时的排序，防止顺序错乱导致接口返回的信息错误
        this.$store.dispatch('user/changeChatListLength', this.chatVipList.length)
      } else if (this.chat_type == 4) {
        this.chatYiyanList.push({ ...sendVal, id: this.chatYiyanList.length }); // id：用于关联上下文时的排序，防止顺序错乱导致接口返回的信息错误
        this.$store.dispatch('user/changeChatListLength', this.chatYiyanList.length)
      } else if (this.chat_type == 5) {
        this.chatXunfeiList.push({ ...sendVal, id: this.chatXunfeiList.length }); // id：用于关联上下文时的排序，防止顺序错乱导致接口返回的信息错误
        this.$store.dispatch('user/changeChatListLength', this.chatXunfeiList.length)
      } else if (this.chat_type == 7) {
        this.chatClaudeList.push({ ...sendVal, id: this.chatClaudeList.length }); // id：用于关联上下文时的排序，防止顺序错乱导致接口返回的信息错误
        this.$store.dispatch('user/changeChatListLength', this.chatClaudeList.length)
      } else if (this.chat_type == 8) {
        this.chatChatGLMList.push({ ...sendVal, id: this.chatChatGLMList.length }); // id：用于关联上下文时的排序，防止顺序错乱导致接口返回的信息错误
        this.$store.dispatch('user/changeChatListLength', this.chatChatGLMList.length)
      } else if (this.chat_type == 10) {
        this.chatTongyiList.push({ ...sendVal, id: this.chatTongyiList.length }); // id：用于关联上下文时的排序，防止顺序错乱导致接口返回的信息错误
        this.$store.dispatch('user/changeChatListLength', this.chatTongyiList.length)
      } else if (this.chat_type == 11) {
        this.chatShangtangList.push({ ...sendVal, id: this.chatShangtangList.length }); // id：用于关联上下文时的排序，防止顺序错乱导致接口返回的信息错误
        this.$store.dispatch('user/changeChatListLength', this.chatShangtangList.length)
      }

      this.toBottom();

      // this.isTime = true; // 思考中
      if (this.chat_type == 0) {
        this.isTimeThreeFive = true;
      } else if (this.chat_type == 1) {
        this.isTimeFourZero = true
      } else if (this.chat_type == 4) {
        this.isTimeYiyan = true
      } else if (this.chat_type == 5) {
        this.isTimeXunfei = true
      } else if (this.chat_type == 7) {
        this.isTimeClaude = true
      } else if (this.chat_type == 8) {
        this.isTimeChatGLM = true
      } else if (this.chat_type == 10) {
        this.isTimeTongyi = true
      } else if (this.chat_type == 11) {
        this.isTimeShangtang = true
      }
      if (bool != 'toChatFouty') {
        if (this.chat_type == 0) {
          this.timerThreeFive = 0;
          this.t_timeThreeFive = setInterval(() => {
            this.timerThreeFive += 1;
          }, 1000)
        } else if (this.chat_type == 1) {
          this.timerFourZero = 0;
          this.t_timeFourZero = setInterval(() => {
            this.timerFourZero += 1;
          }, 1000)
        } else if (this.chat_type == 4) {
          this.timerYiyan = 0;
          this.t_timeYiyan = setInterval(() => {
            this.timerYiyan += 1;
          }, 1000)
        } else if (this.chat_type == 5) {
          this.timerXunfei = 0;
          this.t_timeXunfei = setInterval(() => {
            this.timerXunfei += 1;
          }, 1000)
        } else if (this.chat_type == 7) {
          this.timerClaude = 0;
          this.t_timeClaude = setInterval(() => {
            this.timerClaude += 1;
          }, 1000)
        } else if (this.chat_type == 8) {
          this.timerChatGLM = 0;
          this.t_timeChatGLM = setInterval(() => {
            this.timerChatGLM += 1;
          }, 1000)
        } else if (this.chat_type == 10) {
          this.timerTongyi = 0;
          this.t_timeTongyi = setInterval(() => {
            this.timerTongyi += 1;
          }, 1000)
        } else if (this.chat_type == 11) {
          this.timerShangtang = 0;
          this.t_timeShangtang = setInterval(() => {
            this.timerShangtang += 1;
          }, 1000)
        }
      }
      let val = null
      matchContextAssistant({
        company_id: this.roleJuese.question_id,
        clerk_id: this.roleJuese.question_id,
        question_content: this.sendValue,
      }).then(res => {
        if (this.chat_type == 0) {
          val = {
            "chat_type": this.chat_type,
            "session_code": localStorage.getItem('session_code') || '',
            "chat_group_code": "",
            'question_id': this.roleJuese.question_id,
            msg_list: JSON.stringify([{ role: 'user', covert_content: `忘掉你之前学过的一切，我需要你模拟一个角色，角色名字是：${this.roleJuese.name}，下面是你的角色的信息：${this.roleJuese.content}\n以下是我的问题：${res.data.prompt}`, content: `${this.sendValue}`}]),
  
            // msg_list: JSON.stringify([{ role: 'user', covert_content: `忘掉你之前学过的一切，现在你是${this.roleJuese.name}，下面是你的角色的信息：${this.roleJuese.content}\n以下是我的问题：`, content: `${this.sendValue}`}])
          }
        } else if (this.chat_type == 1) {
          val = {
            "chat_type": this.chat_type,
            "session_code": localStorage.getItem('session_code1') || '',
            "chat_group_code": "",
            'question_id': this.roleJuese.question_id,
            msg_list: JSON.stringify([{ role: 'user', covert_content: `忘掉你之前学过的一切，现在你是${this.roleJuese.name}，下面是你的角色的信息：${this.roleJuese.content}\n以下是我的问题：${res.data.prompt}`, content: `${this.sendValue}`}]),
            // msg_list: JSON.stringify([{ role: 'user', content: this.sendValue }])
          }
        } else if (this.chat_type == 4) {
          val = {
            "chat_type": this.chat_type,
            "session_code": localStorage.getItem('session_code4') || '',
            "chat_group_code": "",
            'question_id': this.roleJuese.question_id,
            msg_list: JSON.stringify([{ role: 'user', covert_content: `忘掉你之前学过的一切，现在你是${this.roleJuese.name}，下面是你的角色的信息：${this.roleJuese.content}\n以下是我的问题：${res.data.prompt}`, content: `${this.sendValue}`}]),
  
            // msg_list: JSON.stringify([{ role: 'user', content: this.sendValue }])
          }
        } else if (this.chat_type == 5) {
          val = {
            "chat_type": this.chat_type,
            "session_code": localStorage.getItem('session_code5') || '',
            "chat_group_code": "",
            'question_id': this.roleJuese.question_id,
            msg_list: JSON.stringify([{ role: 'user', covert_content: `忘掉你之前学过的一切，现在你是${this.roleJuese.name}，下面是你的角色的信息：${this.roleJuese.content}\n以下是我的问题：${res.data.prompt}`, content: `${this.sendValue}`}]),
  
            // msg_list: JSON.stringify([{ role: 'user', content: this.sendValue }])
          }
        } else if (this.chat_type == 7) {
          val = {
            "chat_type": this.chat_type,
            "session_code": localStorage.getItem('session_code7') || '',
            "chat_group_code": "",
            'question_id': this.roleJuese.question_id,
            msg_list: JSON.stringify([{ role: 'user', covert_content: `忘掉你之前学过的一切，现在你是${this.roleJuese.name}，下面是你的角色的信息：${this.roleJuese.content}\n以下是我的问题：${res.data.prompt}`, content: `${this.sendValue}`}]),
  
            // msg_list: JSON.stringify([{ role: 'user', content: this.sendValue }])
          }
        } else if (this.chat_type == 8) {
          val = {
            "chat_type": this.chat_type,
            "session_code": localStorage.getItem('session_code8') || '',
            "chat_group_code": "",
            'question_id': this.roleJuese.question_id,
            msg_list: JSON.stringify([{ role: 'user', covert_content: `忘掉你之前学过的一切，我需要你模拟一个角色，角色名字是：${this.roleJuese.name}，下面是你的角色的信息：${this.roleJuese.content}\n以下是我的问题：${res.data.prompt}`, content: `${this.sendValue}`}]),
  
            // msg_list: JSON.stringify([{ role: 'user', content: this.sendValue }]),
            'model': 'chatglm_lite'
          }
        } else if (this.chat_type == 10) {
          val = {
            "chat_type": this.chat_type,
            "session_code": localStorage.getItem('session_code10') || '',
            "chat_group_code": "",
            'question_id': this.roleJuese.question_id,
            msg_list: JSON.stringify([{ role: 'user', covert_content: `忘掉你之前学过的一切，我需要你模拟一个角色，角色名字是：${this.roleJuese.name}，下面是你的角色的信息：${this.roleJuese.content}\n以下是我的问题：${res.data.prompt}`, content: `${this.sendValue}`}]),
  
            // msg_list: JSON.stringify([{ role: 'user', content: this.sendValue }]),
            'model': 'qwen-v1'
          }
        } else if (this.chat_type == 11) {
          val = {
            "chat_type": this.chat_type,
            "session_code": localStorage.getItem('session_code11') || '',
            "chat_group_code": "",
            'question_id': this.roleJuese.question_id,
            msg_list: JSON.stringify([{ role: 'user', covert_content: `忘掉你之前学过的一切，我需要你模拟一个角色，角色名字是：${this.roleJuese.name}，下面是你的角色的信息：${this.roleJuese.content}\n以下是我的问题：${res.data.prompt}`, content: `${this.sendValue}`}]),
  
            // msg_list: JSON.stringify([{ role: 'user', content: this.sendValue }]),
            'model': 'nova-ptc-xs-v1'
          }
        }
  
        // 关联上下文时，拿到对应的值然后清空对应的数据
        if (Number(this.association) == 1) {
          this.ordeAIList.sort((a, b) => {
            return a.id - b.id
          })
          let contemt = []
          this.ordeAIList.forEach(v => {
            contemt.push({
              role: v.role,
              content: v.content
            })
          })
  
          if (this.chat_type == 0) {
            val = {
              'chat_type': this.chat_type,
              'session_code': localStorage.getItem('session_code') || '',
              'chat_group_code': "",
              'question_id': this.roleJuese.question_id,
              'msg_list': JSON.stringify([...contemt, { role: 'user', content: this.sendValue, covert_content: `忘掉你之前学过的一切，我需要你模拟一个角色，角色名字是：${this.roleJuese.name}，下面是你的角色的信息：${this.roleJuese.content}\n以下是我的问题：${res.data.prompt}`}])
            }
          } else if (this.chat_type == 1) {
            val = {
              'chat_type': this.chat_type,
              'session_code': localStorage.getItem('session_code1') || '',
              'chat_group_code': "",
              'question_id': this.roleJuese.question_id,
              'msg_list': JSON.stringify([...contemt, { role: 'user', content: this.sendValue, covert_content: `忘掉你之前学过的一切，我需要你模拟一个角色，角色名字是：${this.roleJuese.name}，下面是你的角色的信息：${this.roleJuese.content}\n以下是我的问题：${res.data.prompt}`}])
            }
          } else if (this.chat_type == 4) {
            val = {
              'chat_type': this.chat_type,
              'session_code': localStorage.getItem('session_code4') || '',
              'chat_group_code': "",
              'question_id': this.roleJuese.question_id,
              'msg_list': JSON.stringify([...contemt, { role: 'user', content: this.sendValue, covert_content: `忘掉你之前学过的一切，我需要你模拟一个角色，角色名字是：${this.roleJuese.name}，下面是你的角色的信息：${this.roleJuese.content}\n以下是我的问题：${res.data.prompt}`}])
            }
          } else if (this.chat_type == 5) {
            val = {
              'chat_type': this.chat_type,
              'session_code': localStorage.getItem('session_code5') || '',
              'chat_group_code': "",
              'question_id': this.roleJuese.question_id,
              'msg_list': JSON.stringify([...contemt, { role: 'user', content: this.sendValue, covert_content: `忘掉你之前学过的一切，我需要你模拟一个角色，角色名字是：${this.roleJuese.name}，下面是你的角色的信息：${this.roleJuese.content}\n以下是我的问题：${res.data.prompt}`}])
            }
          } else if (this.chat_type == 7) {
            val = {
              'chat_type': this.chat_type,
              'session_code': localStorage.getItem('session_code7') || '',
              'chat_group_code': "",
              'question_id': this.roleJuese.question_id,
              'msg_list': JSON.stringify([...contemt, { role: 'user', content: this.sendValue, covert_content: `忘掉你之前学过的一切，我需要你模拟一个角色，角色名字是：${this.roleJuese.name}，下面是你的角色的信息：${this.roleJuese.content}\n以下是我的问题：${res.data.prompt}`}])
            }
          } else if (this.chat_type == 8) {
            val = {
              'chat_type': this.chat_type,
              'session_code': localStorage.getItem('session_code8') || '',
              'chat_group_code': "",
              'question_id': this.roleJuese.question_id,
              'msg_list': JSON.stringify([...contemt, { role: 'user', content: this.sendValue, covert_content: `忘掉你之前学过的一切，我需要你模拟一个角色，角色名字是：${this.roleJuese.name}，下面是你的角色的信息：${this.roleJuese.content}\n以下是我的问题：${res.data.prompt}`}]),
              'model': 'chatglm_lite'
            }
          } else if (this.chat_type == 10) {
            val = {
              'chat_type': this.chat_type,
              'session_code': localStorage.getItem('session_code10') || '',
              'chat_group_code': "",
              'question_id': this.roleJuese.question_id,
              'msg_list': JSON.stringify([...contemt, { role: 'user', content: this.sendValue, covert_content: `忘掉你之前学过的一切，我需要你模拟一个角色，角色名字是：${this.roleJuese.name}，下面是你的角色的信息：${this.roleJuese.content}\n以下是我的问题：${res.data.prompt}`}]),
              'model': 'qwen-v1'
            }
          } else if (this.chat_type == 11) {
            val = {
              'chat_type': this.chat_type,
              'session_code': localStorage.getItem('session_code11') || '',
              'chat_group_code': "",
              'question_id': this.roleJuese.question_id,
              'msg_list': JSON.stringify([...contemt, { role: 'user', content: this.sendValue, covert_content: `忘掉你之前学过的一切，我需要你模拟一个角色，角色名字是：${this.roleJuese.name}，下面是你的角色的信息：${this.roleJuese.content}\n以下是我的问题：${res.data.prompt}`}]),
              'model': 'nova-ptc-xs-v1'
            }
          }
          this.ordeAIList = []
        }
        this.vipSend(bool, val)
      })
    },

    // 4.0信息发送
    async vipSend(bool = '', val) {
      
      if (Number(this.association) == 2) {
        val.session_code = ''
      }

      this.association = ''

      if (this.chat_type == 0) {
        this.chatList.push({ //新构造一个对话内容
          'session_code': '',
          'create_time': '',
          'chat_group_code': '',
          'finish_reason': '',
          'role': '',
          'content': '',
          'help': false, // 点赞
          'stepOn': false, // 点踩
          id: this.chatList.length,
          timer: false
        });
      } else if (this.chat_type == 1) {
        this.chatVipList.push({ //新构造一个对话内容
          'session_code': '',
          'create_time': '',
          'chat_group_code': '',
          'finish_reason': '',
          'role': '',
          'content': '',
          'help': false, // 点赞
          'stepOn': false, // 点踩
          id: this.chatVipList.length,
          timer: false
        });
      } else if (this.chat_type == 4) {
        this.chatYiyanList.push({ //新构造一个对话内容
          'session_code': '',
          'create_time': '',
          'chat_group_code': '',
          'finish_reason': '',
          'role': '',
          'content': '',
          'help': false, // 点赞
          'stepOn': false, // 点踩
          id: this.chatYiyanList.length,
          timer: false
        });
      } else if (this.chat_type == 5) {
        this.chatXunfeiList.push({ //新构造一个对话内容
          'session_code': '',
          'create_time': '',
          'chat_group_code': '',
          'finish_reason': '',
          'role': '',
          'content': '',
          'help': false, // 点赞
          'stepOn': false, // 点踩
          id: this.chatXunfeiList.length,
          timer: false
        });
      } else if (this.chat_type == 7) {
        this.chatClaudeList.push({ //新构造一个对话内容
          'session_code': '',
          'create_time': '',
          'chat_group_code': '',
          'finish_reason': '',
          'role': '',
          'content': '',
          'help': false, // 点赞
          'stepOn': false, // 点踩
          id: this.chatClaudeList.length,
          timer: false
        });
      } else if (this.chat_type == 8) {
        this.chatChatGLMList.push({ //新构造一个对话内容
          'session_code': '',
          'create_time': '',
          'chat_group_code': '',
          'finish_reason': '',
          'role': '',
          'content': '',
          'help': false, // 点赞
          'stepOn': false, // 点踩
          id: this.chatChatGLMList.length,
          timer: false
        });
      } else if (this.chat_type == 10) {
        this.chatTongyiList.push({ //新构造一个对话内容
          'session_code': '',
          'create_time': '',
          'chat_group_code': '',
          'finish_reason': '',
          'role': '',
          'content': '',
          'help': false, // 点赞
          'stepOn': false, // 点踩
          id: this.chatTongyiList.length,
          timer: false
        });
      } else if (this.chat_type == 11) {
        this.chatShangtangList.push({ //新构造一个对话内容
          'session_code': '',
          'create_time': '',
          'chat_group_code': '',
          'finish_reason': '',
          'role': '',
          'content': '',
          'help': false, // 点赞
          'stepOn': false, // 点踩
          id: this.chatShangtangList.length,
          timer: false
        });
      }
      if (bool == 'toChatFouty') {
        if (this.chat_type == 0) {
          this.t_timeThreeFive = setInterval(() => {
            this.timerThreeFive += 1;
          }, 1000)
        } else if (this.chat_type == 1) {
          this.t_timeFourZero = setInterval(() => {
            this.timerFourZero += 1;
          }, 1000)
        } else if (this.chat_type == 4) {
          this.t_timeYiyan = setInterval(() => {
            this.timerYiyan += 1;
          }, 1000)
        } else if (this.chat_type == 5) {
          this.t_timeXunfei = setInterval(() => {
            this.timerXunfei += 1;
          }, 1000)
        } else if (this.chat_type == 7) {
          this.t_timeClaude = setInterval(() => {
            this.timerClaude += 1;
          }, 1000)
        } else if (this.chat_type == 8) {
          this.t_timeChatGLM = setInterval(() => {
            this.timerChatGLM += 1;
          }, 1000)
        } else if (this.chat_type == 10) {
          this.t_timeTongyi = setInterval(() => {
            this.timerTongyi += 1;
          }, 1000)
        } else if (this.chat_type == 11) {
          this.t_timeShangtang = setInterval(() => {
            this.timerShangtang += 1;
          }, 1000)
        }
      }

      if (bool == 'true') {
        val.msg_code = this.msgCode
      }

      let userInfo = JSON.parse(localStorage.getItem("userInfo"));
      // 模板指令使用后要 +1
      if (this.promptsId != null) {
        promptsRecommend({ prompts_id: this.promptsId }).then(() => {
          this.promptsId = null
        })
      }
      this.oldSendValue = this.sendValue
      this.isClickChat = false
      this.sendValue = ''

      let response = null
      let url = Number(this.chat_type) == 0 || Number(this.chat_type) == 1 ? 'api/chat/async_chat_session' : 'api/chat/async_chat_completion'
      if (this.chat_type == 0) {
        this.controllerThreeFive = new AbortController()
        response = await fetch(httpUrls.httpUrl + url, {
          method: "POST",
          headers: {
            "Content-Type": 'application/json',
            'Accept': '*/*',
            'authorization': userInfo.token,
            'role': userInfo.role,
            'source': 'pc'
          },
          body: JSON.stringify(val),
          signal: this.controllerThreeFive.signal
        })
      } else if (this.chat_type == 1) {
        this.controllerFourZreo = new AbortController()
        response = await fetch(httpUrls.httpUrl + url, {
          method: "POST",
          headers: {
            "Content-Type": 'application/json',
            'Accept': '*/*',
            'authorization': userInfo.token,
            'role': userInfo.role,
            'source': 'pc'
          },
          body: JSON.stringify(val),
          signal: this.controllerFourZreo.signal
        })
      } else if (this.chat_type == 4) {
        this.controllerYiyan = new AbortController()
        response = await fetch(httpUrls.httpUrl + url, {
          method: "POST",
          headers: {
            "Content-Type": 'application/json',
            'Accept': '*/*',
            'authorization': userInfo.token,
            'role': userInfo.role,
            'source': 'pc'
          },
          body: JSON.stringify(val),
          signal: this.controllerYiyan.signal
        })
      } else if (this.chat_type == 5) {
        this.controllerXunfei = new AbortController()
        response = await fetch(httpUrls.httpUrl + url, {
          method: "POST",
          headers: {
            "Content-Type": 'application/json',
            'Accept': '*/*',
            'authorization': userInfo.token,
            'role': userInfo.role,
            'source': 'pc'
          },
          body: JSON.stringify(val),
          signal: this.controllerXunfei.signal
        })
      } else if (this.chat_type == 7) {
        this.controllerClaude = new AbortController()
        response = await fetch(httpUrls.httpUrl + url, {
          method: "POST",
          headers: {
            "Content-Type": 'application/json',
            'Accept': '*/*',
            'authorization': userInfo.token,
            'role': userInfo.role,
            'source': 'pc'
          },
          body: JSON.stringify(val),
          signal: this.controllerClaude.signal
        })
      } else if (this.chat_type == 8) {
        this.controllerChatGLM = new AbortController()
        response = await fetch(httpUrls.httpUrl + url, {
          method: "POST",
          headers: {
            "Content-Type": 'application/json',
            'Accept': '*/*',
            'authorization': userInfo.token,
            'role': userInfo.role,
            'source': 'pc'
          },
          body: JSON.stringify(val),
          signal: this.controllerChatGLM.signal
        })
      } else if (this.chat_type == 10) {
        this.controllerTongyi = new AbortController()
        response = await fetch(httpUrls.httpUrl + url, {
          method: "POST",
          headers: {
            "Content-Type": 'application/json',
            'Accept': '*/*',
            'authorization': userInfo.token,
            'role': userInfo.role,
            'source': 'pc'
          },
          body: JSON.stringify(val),
          signal: this.controllerTongyi.signal
        })
      } else if (this.chat_type == 11) {
        this.controllerShangtang = new AbortController()
        response = await fetch(httpUrls.httpUrl + url, {
          method: "POST",
          headers: {
            "Content-Type": 'application/json',
            'Accept': '*/*',
            'authorization': userInfo.token,
            'role': userInfo.role,
            'source': 'pc'
          },
          body: JSON.stringify(val),
          signal: this.controllerShangtang.signal
        })
      }
      this.ordeAIList = []

      if (Number(response.status) != 200) {
        response.json().then(res => {
          this.codeHandleChange(res)
        })
        return
      }

      this.sendValue = '';// 清空发送栏内容
      const reader = response.body.getReader();

      this.association = ''

      while (true) {
        const { value, done } = await reader.read();
        if (done) {
          break;
        }
        if (value) {
          let stringStr = arr2str(value)
          let chatArr = stringStr.split('\r\n');
          if (this.chat_type == 0) {
            this.isDetailThreeFive = false
          } else if (this.chat_type == 1) {
            this.isDetailFourZero = false
          } else if (this.chat_type == 4) {
            this.isDetailYiyan = false
          } else if (this.chat_type == 5) {
            this.isDetailXunfei = false
          } else if (this.chat_type == 7) {
            this.isDetailClaude = false
          } else if (this.chat_type == 8) {
            this.isDetailChatGLM = false
          } else if (this.chat_type == 10) {
            this.isDetailTongyi = false
          } else if (this.chat_type == 11) {
            this.isDetailShangtang = false
          }
          // 信息清空
          chatArr.forEach(val => {
            if (val != '') {
              let res = JSON.parse(val);
              this.talkMsgList(res)
              return;
            }

          })
        }
      }
    },

    sendMsg2() {
      if (!this.isShowassociation || this.association != '') {
        this.$message({
          type: 'info',
          message: '当前问题还没回答完毕，请稍后再提问！'
        })
      } else {
        this.$message({
          type: 'info',
          message: '请选择是否关联'
        })
      }
    },


    // 关联上下文的多选
    changeSendAnswer(item) {
      let a = 1
      for (let i = 0; i < this.ordeAIList.length; i++) {
        if (item.create_time == this.ordeAIList[i].create_time && item.content == this.ordeAIList[i].content) {
          this.ordeAIList.splice(i, 1)
          i--
          a = 0
          break;
        } else {
          a = 1
        }
      }
      if (a == 1) {
        this.ordeAIList.push(item)
      }
      this.$forceUpdate();//解决点击计数器失效问题
    },

    // 内容逐字显示，每个字显示间隔为0.1秒，并识别换行符
    showReply(content) {
      if (this.chat_type == 0) {
        this.isTimeThreeFive = false;
      } else if (this.chat_type == 1) {
        this.isTimeFourZero = false
      } else if (this.chat_type == 4) {
        this.isTimeYiyan = false
      } else if (this.chat_type == 5) {
        this.isTimeXunfei = false
      } else if (this.chat_type == 7) {
        this.isTimeClaude = false
      } else if (this.chat_type == 8) {
        this.isTimeChatGLM = false
      } else if (this.chat_type == 10) {
        this.isTimeTongyi = false
      } else if (this.chat_type == 11) {
        this.isTimeShangtang = false
      }
      let reply = content;
      let replyArr = reply.split('');
      let replyStr = '';
      let i = 0;
      let time = setInterval(() => {
        if (i < replyArr.length) {
          // marked.parse, 预留，需删除下面的判断
          if (replyArr[i] == '\n') {
            replyStr += '\n'
          } else {
            replyStr += replyArr[i]
          }
          if (this.chat_type == 0) {
            this.replyThreeFive = replyStr
          } else if (this.chat_type == 1) {
            this.replyFourZero = replyStr
          } else if (this.chat_type == 4) {
            this.replyYiyan = replyStr
          } else if (this.chat_type == 5) {
            this.replyXunfei = replyStr
          } else if (this.chat_type == 7) {
            this.replyClaude = replyStr
          } else if (this.chat_type == 8) {
            this.replyChatGLM = replyStr
          } else if (this.chat_type == 10) {
            this.replyTongyi = replyStr
          } else if (this.chat_type == 11) {
            this.replyShangtang = replyStr
          }
          // this.reply = replyStr
          i++
          // 定位到聊天最底部
          this.toBottom();
        } else {
          clearInterval(time)
        }
      }, 100)

      // 判断是否显示完毕
      setTimeout(() => {
        if (this.chat_type == 0) {
          this.isfinishThreeFive = true; // 完成打字效果
          this.isBtnThreeFive = true;
          clearInterval(this.t_timeThreeFive);
          this.t_timeThreeFive = null
        } else if (this.chat_type == 1) {
          this.isBtnFourZero = true;
          this.isfinishFourZero = true; // 完成打字效果
          clearInterval(this.t_timeFourZero);
          this.t_timeFourZero = null
        } else if (this.chat_type == 4) {
          this.isBtnYiyan = true;
          this.isfinishYiyan = true; // 完成打字效果
          clearInterval(this.t_timeYiyan);
          this.t_timeYiyan = null
        } else if (this.chat_type == 5) {
          this.isBtnXunfei = true;
          this.isfinishXunfei = true; // 完成打字效果
          clearInterval(this.t_timeXunfei);
          this.t_timeXunfei = null
        } else if (this.chat_type == 7) {
          this.isBtnClaude = true;
          this.isfinishClaude = true; // 完成打字效果
          clearInterval(this.t_timeClaude);
          this.t_timeClaude = null
        } else if (this.chat_type == 8) {
          this.isBtnChatGLM = true;
          this.isfinishChatGLM = true; // 完成打字效果
          clearInterval(this.t_timeChatGLM);
          this.t_timeChatGLM = null
        } else if (this.chat_type == 10) {
          this.isBtnTongyi = true;
          this.isfinishTongyi = true; // 完成打字效果
          clearInterval(this.t_timeTongyi);
          this.t_timeTongyi = null
        } else if (this.chat_type == 8) {
          this.isBtnShangtang = true;
          this.isfinishShangtang = true; // 完成打字效果
          clearInterval(this.t_timeShangtang);
          this.t_timeShangtang = null
        }
      }, replyArr.length * 100)
    },

    toBottom(type = true) {
      // 定位到当前聊天地点
      this.$nextTick(() => {
        setTimeout(() => {
          var scrollTop = document.getElementById("chatCont")
          if (this.chatContScroll == '' || this.chatContScroll <= scrollTop.scrollTop) {
            scrollTop.scrollTop = scrollTop.scrollHeight
            this.chatContScroll = scrollTop.scrollTop
          }
        }, 200)

      })
    },

    // 重新回答
    resetController() {
      if (this.chat_type == 0) {
        if (!this.isfinishThreeFive) {
          this.$message('当前问题还没回答完毕，请稍后再提问')
          return
        }
      } else if (this.chat_type == 1) {
        if (!this.isfinishFourZero) {
          this.$message('当前问题还没回答完毕，请稍后再提问')
          return
        }
      } else if (this.chat_type == 4) {
        if (!this.isfinishYiyan) {
          this.$message('当前问题还没回答完毕，请稍后再提问')
          return
        }
      } else if (this.chat_type == 5) {
        if (!this.isfinishXunfei) {
          this.$message('当前问题还没回答完毕，请稍后再提问')
          return
        }
      } else if (this.chat_type == 7) {
        if (!this.isfinishClaude) {
          this.$message('当前问题还没回答完毕，请稍后再提问')
          return
        }
      } else if (this.chat_type == 8) {
        if (!this.isfinishChatGLM) {
          this.$message('当前问题还没回答完毕，请稍后再提问')
          return
        }
      } else if (this.chat_type == 10) {
        if (!this.isfinishTongyi) {
          this.$message('当前问题还没回答完毕，请稍后再提问')
          return
        }
      } else if (this.chat_type == 11) {
        if (!this.isfinishShangtang) {
          this.$message('当前问题还没回答完毕，请稍后再提问')
          return
        }
      }

      if (this.chat_type == 0) {
        this.chatList.splice(this.chatList.length - 2, 2)
      } else if (this.chat_type == 1) {
        this.chatVipList.splice(this.chatVipList.length - 2, 2)
      } else if (this.chat_type == 4) {
        this.chatYiyanList.splice(this.chatYiyanList.length - 2, 2)
      } else if (this.chat_type == 5) {
        this.chatXunfeiList.splice(this.chatXunfeiList.length - 2, 2)
      } else if (this.chat_type == 7) {
        this.chatClaudeList.splice(this.chatClaudeList.length - 2, 2)
      } else if (this.chat_type == 8) {
        this.chatChatGLMList.splice(this.chatChatGLMList.length - 2, 2)
      } else if (this.chat_type == 10) {
        this.chatTongyiList.splice(this.chatTongyiList.length - 2, 2)
      } else if (this.chat_type == 11) {
        this.chatShangtangList.splice(this.chatShangtangList.length - 2, 2)
      }
      this.endController('', false)
      this.sendMsg('true')
    },

    // 终止回答
    endController(code, resetChat = true) {
      if (Number(this.chat_type) == 0) {
        this.isfinishThreeFive = true
        this.isBtnThreeFive = true
        this.isTimeThreeFive = false
        try {
          this.controllerThreeFive.abort()
        } catch (error) { }
        clearInterval(this.t_timeThreeFive);
      } else if (Number(this.chat_type) == 1) {
        this.isBtnFourZero = true
        this.isfinishFourZero = true
        this.isTimeFourZero = false
        try {
          this.controllerFourZreo.abort()
        } catch (error) { }
        clearInterval(this.t_timeFourZero);
      } else if (Number(this.chat_type) == 4) {
        this.isBtnYiyan = true
        this.isfinishYiyan = true
        this.isTimeYiyan = false
        try {
          this.controllerYiyan.abort()
        } catch (error) { }
        clearInterval(this.t_timeYiyan);
      } else if (Number(this.chat_type) == 5) {
        this.isBtnXunfei = true
        this.isfinishXunfei = true
        this.isTimeXunfei = false
        try {
          this.controllerXunfei.abort()
        } catch (error) { }
        clearInterval(this.t_timeXunfei);
      } else if (Number(this.chat_type) == 7) {
        this.isBtnClaude = true
        this.isfinishClaude = true
        this.isTimeClaude = false
        try {
          this.controllerClaude.abort()
        } catch (error) { }
        clearInterval(this.t_timeClaude);
      } else if (Number(this.chat_type) == 8) {
        this.isBtnChatGLM = true
        this.isfinishChatGLM = true
        this.isTimeChatGLM = false
        try {
          this.controllerChatGLM.abort()
        } catch (error) { }
        clearInterval(this.t_timeChatGLM);
      } else if (Number(this.chat_type) == 10) {
        this.isBtnTongyi = true
        this.isfinishTongyi = true
        this.isTimeTongyi = false
        try {
          this.controllerTongyi.abort()
        } catch (error) { }
        clearInterval(this.t_timeTongyi);
      } else if (Number(this.chat_type) == 11) {
        this.isBtnShangtang = true
        this.isfinishShangtang = true
        this.isTimeShangtang = false
        try {
          this.controllerShangtang.abort()
        } catch (error) { }
        clearInterval(this.t_timeShangtang);
      }

      this.sessionRightNavCode = code
      if (resetChat) {
        if (this.chat_type == 0) {
          this.chatList[this.chatList.length - 1].timer = this.timerThreeFive
        } else if (this.chat_type == 1) {
          this.chatVipList[this.chatVipList.length - 1].timer = this.timerFourZero
        } else if (this.chat_type == 4) {
          this.chatYiyanList[this.chatYiyanList.length - 1].timer = this.timerYiyan
        } else if (this.chat_type == 5) {
          this.chatXunfeiList[this.chatXunfeiList.length - 1].timer = this.timerXunfei
        } else if (this.chat_type == 7) {
          this.chatClaudeList[this.chatClaudeList.length - 1].timer = this.timerClaude
        } else if (this.chat_type == 8) {
          this.chatChatGLMList[this.chatChatGLMList.length - 1].timer = this.timerChatGLM
        } else if (this.chat_type == 10) {
          this.chatTongyiList[this.chatTongyiList.length - 1].timer = this.timerTongyi
        } else if (this.chat_type == 11) {
          this.chatShangtangList[this.chatShangtangList.length - 1].timer = this.timerShangtang
        }
      }
    },

    // 继续回答
    keepAs(key, item = {}) {
      if (this.supplyValue == '' || this.supplyValue.replace(/\s*/g, '') == '') {
        this.$message.error('请输入您要发送内容')
        return;
      }
      // let msg = '继续';
      // if (key == 2) {
      //   msg = this.supplyValue
      //   item = this.chatItem
      // }

      // let val = {
      //   "chat_type": this.chat_type,
      //   "action_type": 3,
      //   "session_code": this.chatItem.session_code,
      //   "chat_group_code": this.chatItem.chat_group_code,
      //   "content": msg
      // }
      if (this.chat_type == 0) {
        this.isBtnThreeFive = false;
        this.isDetailThreeFive = false;
        this.isfinishThreeFive = false;
      } else if (this.chat_type == 1) {
        this.isBtnFourZero = false;
        this.isDetailFourZero = false;
        this.isfinishFourZero = false;
      } else if (this.chat_type == 4) {
        this.isBtnYiyan = false;
        this.isDetailYiyan = false;
        this.isfinishYiyan = false;
      } else if (this.chat_type == 5) {
        this.isBtnXunfei = false;
        this.isDetailXunfei = false;
        this.isfinishXunfei = false;
      } else if (this.chat_type == 7) {
        this.isBtnClaude = false;
        this.isDetailClaude = false;
        this.isfinishClaude = false;
      } else if (this.chat_type == 8) {
        this.isBtnChatGLM = false;
        this.isDetailChatGLM = false;
        this.isfinishChatGLM = false;
      } else if (this.chat_type == 10) {
        this.isBtnTongyi = false;
        this.isDetailTongyi = false;
        this.isfinishTongyi = false;
      } else if (this.chat_type == 11) {
        this.isBtnShangtang = false;
        this.isDetailShangtang = false;
        this.isfinishShangtang = false;
      }
      this.supplyVisible = false;
      if (this.chat_type == 0) {
        if (this.chatItem.timer) {
          this.timerThreeFive = this.chatItem.timer
        } else {
          this.timerThreeFive = 0
        }
        this.t_timeThreeFive = setInterval(() => {
          this.timerThreeFive += 1;
        }, 1000)
      } else if (this.chat_type == 1) {
        if (this.chatItem.timer) {
          this.timerFourZero = this.chatItem.timer
        } else {
          this.timerFourZero = 0
        }
        this.t_timeFourZero = setInterval(() => {
          this.timerFourZero += 1;
        }, 1000)
      } else if (this.chat_type == 4) {
        if (this.chatItem.timer) {
          this.timerYiyan = this.chatItem.timer
        } else {
          this.timerYiyan = 0
        }
        this.t_timeYiyan = setInterval(() => {
          this.timerYiyan += 1;
        }, 1000)
      } else if (this.chat_type == 5) {
        if (this.chatItem.timer) {
          this.timerXunfei = this.chatItem.timer
        } else {
          this.timerXunfei = 0
        }
        this.t_timeXunfei = setInterval(() => {
          this.timerXunfei += 1;
        }, 1000)
      } else if (this.chat_type == 7) {
        if (this.chatItem.timer) {
          this.timerClaude = this.chatItem.timer
        } else {
          this.timerClaude = 0
        }
        this.t_timeClaude = setInterval(() => {
          this.timerClaude += 1;
        }, 1000)
      } else if (this.chat_type == 8) {
        if (this.chatItem.timer) {
          this.timerChatGLM = this.chatItem.timer
        } else {
          this.timerChatGLM = 0
        }
        this.t_timeChatGLM = setInterval(() => {
          this.timerChatGLM += 1;
        }, 1000)
      } else if (this.chat_type == 10) {
        if (this.chatItem.timer) {
          this.timerTongyi = this.chatItem.timer
        } else {
          this.timerTongyi = 0
        }
        this.t_timeTongyi = setInterval(() => {
          this.timerTongyi += 1;
        }, 1000)
      } else if (this.chat_type == 11) {
        if (this.chatItem.timer) {
          this.timerShangtang = this.chatItem.timer
        } else {
          this.timerShangtang = 0
        }
        this.t_timeShangtang = setInterval(() => {
          this.timerShangtang += 1;
        }, 1000)
      }

      matchContextAssistant({
        company_id: this.roleJuese.question_id,
        clerk_id: this.roleJuese.question_id,
        question_content: this.sendValue,
      }).then(res => {
        let msg = '继续';
        if (key == 2) {
          msg = this.supplyValue
        }
  
        let val = null
        if (this.chat_type == 0) {
          val = {
            'question_id': this.roleJuese.question_id,
            "chat_type": this.chat_type,
            "session_code": localStorage.getItem('session_code'),
            "chat_group_code": localStorage.getItem('chat_group_code'),
            "msg_list": JSON.stringify([{ role: this.chatItem.role, content: this.chatItem.content }, { role: 'user', content: msg, covert_content: res.data.prompt }])
          }
        } else if (this.chat_type == 1) {
          val = {
            'question_id': this.roleJuese.question_id,
            "chat_type": this.chat_type,
            "session_code": localStorage.getItem('session_code1'),
            "chat_group_code": localStorage.getItem('chat_group_code1'),
            "msg_list": JSON.stringify([{ role: this.chatItem.role, content: this.chatItem.content }, { role: 'user', content: msg, covert_content: res.data.prompt }])
          }
        } else if (this.chat_type == 4) {
          val = {
            'question_id': this.roleJuese.question_id,
            "chat_type": this.chat_type,
            "session_code": localStorage.getItem('session_code4'),
            "chat_group_code": localStorage.getItem('chat_group_code4'),
            "msg_list": JSON.stringify([{ role: this.chatYiyanList[this.chatItem.chatIndex - 1].role, content: this.chatYiyanList[this.chatItem.chatIndex - 1].content }, { role: this.chatItem.role, content: this.chatItem.content }, { role: 'user', content: msg, covert_content: res.data.prompt }])
          }
        } else if (this.chat_type == 5) {
          val = {
            'question_id': this.roleJuese.question_id,
            "chat_type": this.chat_type,
            "session_code": localStorage.getItem('session_code5'),
            "chat_group_code": localStorage.getItem('chat_group_code5'),
            "msg_list": JSON.stringify([{ role: this.chatItem.role, content: this.chatItem.content }, { role: 'user', content: msg, covert_content: res.data.prompt }])
          }
        } else if (this.chat_type == 7) {
          val = {
            'question_id': this.roleJuese.question_id,
            "chat_type": this.chat_type,
            "session_code": localStorage.getItem('session_code7'),
            "chat_group_code": localStorage.getItem('chat_group_code7'),
            "msg_list": JSON.stringify([{ role: this.chatClaudeList[this.chatItem.chatIndex - 1].role, content: this.chatClaudeList[this.chatItem.chatIndex - 1].content }, { role: this.chatItem.role, content: this.chatItem.content }, { role: 'user', content: msg, covert_content: res.data.prompt }]),
          }
        } else if (this.chat_type == 8) {
          val = {
            'question_id': this.roleJuese.question_id,
            "chat_type": this.chat_type,
            "session_code": localStorage.getItem('session_code8'),
            "chat_group_code": localStorage.getItem('chat_group_code8'),
            "msg_list": JSON.stringify([{ role: this.chatChatGLMList[this.chatItem.chatIndex - 1].role, content: this.chatChatGLMList[this.chatItem.chatIndex - 1].content }, { role: this.chatItem.role, content: this.chatItem.content }, { role: 'user', content: msg, covert_content: res.data.prompt }]),
            'model': 'chatglm_lite'
          }
        } else if (this.chat_type == 10) {
          val = {
            'question_id': this.roleJuese.question_id,
            "chat_type": this.chat_type,
            "session_code": localStorage.getItem('session_code10'),
            "chat_group_code": localStorage.getItem('chat_group_code10'),
            "msg_list": JSON.stringify([{ role: this.chatTongyiList[this.chatItem.chatIndex - 1].role, content: this.chatTongyiList[this.chatItem.chatIndex - 1].content }, { role: this.chatItem.role, content: this.chatItem.content }, { role: 'user', content: msg, covert_content: res.data.prompt }]),
            'model': 'qwen-v1'
          }
        } else if (this.chat_type == 11) {
          val = {
            'question_id': this.roleJuese.question_id,
            "chat_type": this.chat_type,
            "session_code": localStorage.getItem('session_code8'),
            "chat_group_code": localStorage.getItem('chat_group_code8'),
            "msg_list": JSON.stringify([{ role: this.chatShangtangList[this.chatItem.chatIndex - 1].role, content: this.chatShangtangList[this.chatItem.chatIndex - 1].content }, { role: this.chatItem.role, content: this.chatItem.content }, { role: 'user', content: msg, covert_content: res.data.prompt }]),
            'model': 'nova-ptc-xs-v1'
          }
        }
        this.vipAgainSend(key, val, item, msg)
      })
    },

    async vipAgainSend(key, val = {}, item, msg) {
      let userInfo = JSON.parse(localStorage.getItem("userInfo"));
      if (key == 2) {
        if (this.chat_type == 0) {
          // this.chatList[this.chatList.length-1].content = this.chatList[this.chatList.length-1].content + '\n\n'+ msg +'\n'
          this.chatList[this.chatList.length - 1].markedContent = marked(this.chatList[this.chatList.length - 1].content + '\n' + msg) // 预留，对话内容的转换
          this.chatList[this.chatList.length - 1].content = this.chatList[this.chatList.length - 1].content + '\n\n' + msg + '\n'
          this.$store.dispatch('user/changeChatListLength', this.chatList.length)
        } else if (this.chat_type == 1) {
          // this.chatVipList[this.chatVipList.length-1].content = this.chatVipList[this.chatVipList.length-1].content + '\n\n'+ msg +'\n'
          this.chatVipList[this.chatVipList.length - 1].markedContent = marked(this.chatVipList[this.chatVipList.length - 1].content + '\n' + msg) // 预留，对话内容的转换
          this.chatVipList[this.chatVipList.length - 1].content = this.chatVipList[this.chatVipList.length - 1].content + '\n\n' + msg + '\n'
          this.$store.dispatch('user/changeChatListLength', this.chatVipList.length)
        } else if (this.chat_type == 4) {
          // this.chatVipList[this.chatVipList.length-1].content = this.chatVipList[this.chatVipList.length-1].content + '\n\n'+ msg +'\n'
          this.chatYiyanList[this.chatYiyanList.length - 1].markedContent = marked(this.chatYiyanList[this.chatYiyanList.length - 1].content + '\n' + msg) // 预留，对话内容的转换
          this.chatYiyanList[this.chatYiyanList.length - 1].content = this.chatYiyanList[this.chatYiyanList.length - 1].content + '\n\n' + msg + '\n'
          this.$store.dispatch('user/changeChatListLength', this.chatYiyanList.length)
        } else if (this.chat_type == 5) {
          // this.chatVipList[this.chatVipList.length-1].content = this.chatVipList[this.chatVipList.length-1].content + '\n\n'+ msg +'\n'
          this.chatXunfeiList[this.chatXunfeiList.length - 1].markedContent = marked(this.chatXunfeiList[this.chatXunfeiList.length - 1].content + '\n' + msg) // 预留，对话内容的转换
          this.chatXunfeiList[this.chatXunfeiList.length - 1].content = this.chatXunfeiList[this.chatXunfeiList.length - 1].content + '\n\n' + msg + '\n'
          this.$store.dispatch('user/changeChatListLength', this.chatXunfeiList.length)
        } else if (this.chat_type == 7) {
          // this.chatVipList[this.chatVipList.length-1].content = this.chatVipList[this.chatVipList.length-1].content + '\n\n'+ msg +'\n'
          this.chatClaudeList[this.chatClaudeList.length - 1].markedContent = marked(this.chatClaudeList[this.chatClaudeList.length - 1].content + '\n' + msg) // 预留，对话内容的转换
          this.chatClaudeList[this.chatClaudeList.length - 1].content = this.chatClaudeList[this.chatClaudeList.length - 1].content + '\n\n' + msg + '\n'
          this.$store.dispatch('user/changeChatListLength', this.chatClaudeList.length)
        } else if (this.chat_type == 8) {
          // this.chatVipList[this.chatVipList.length-1].content = this.chatVipList[this.chatVipList.length-1].content + '\n\n'+ msg +'\n'
          this.chatChatGLMList[this.chatChatGLMList.length - 1].markedContent = marked(this.chatChatGLMList[this.chatChatGLMList.length - 1].content + '\n' + msg) // 预留，对话内容的转换
          this.chatChatGLMList[this.chatChatGLMList.length - 1].content = this.chatChatGLMList[this.chatChatGLMList.length - 1].content + '\n\n' + msg + '\n'
          this.$store.dispatch('user/changeChatListLength', this.chatChatGLMList.length)
        } else if (this.chat_type == 10) {
          // this.chatVipList[this.chatVipList.length-1].content = this.chatVipList[this.chatVipList.length-1].content + '\n\n'+ msg +'\n'
          this.chatTongyiList[this.chatTongyiList.length - 1].markedContent = marked(this.chatTongyiList[this.chatTongyiList.length - 1].content + '\n' + msg) // 预留，对话内容的转换
          this.chatTongyiList[this.chatTongyiList.length - 1].content = this.chatTongyiList[this.chatTongyiList.length - 1].content + '\n\n' + msg + '\n'
          this.$store.dispatch('user/changeChatListLength', this.chatTongyiList.length)
        } else if (this.chat_type == 11) {
          // this.chatVipList[this.chatVipList.length-1].content = this.chatVipList[this.chatVipList.length-1].content + '\n\n'+ msg +'\n'
          this.chatShangtangList[this.chatShangtangList.length - 1].markedContent = marked(this.chatShangtangList[this.chatShangtangList.length - 1].content + '\n' + msg) // 预留，对话内容的转换
          this.chatShangtangList[this.chatShangtangList.length - 1].content = this.chatShangtangList[this.chatShangtangList.length - 1].content + '\n\n' + msg + '\n'
          this.$store.dispatch('user/changeChatListLength', this.chatShangtangList.length)
        }
      }

      let response = null
      let url = Number(this.chat_type) == 0 || Number(this.chat_type) == 1 ? 'api/chat/async_chat_session' : 'api/chat/async_chat_completion'
      if (this.chat_type == 0) {
        this.controllerThreeFive = new AbortController()
        response = await fetch(httpUrls.httpUrl + url, {
          method: "POST",
          headers: {
            "Content-Type": 'application/json',
            'Accept': '*/*',
            'authorization': userInfo.token,
            'role': userInfo.role,
            'source': 'pc'
          },
          body: JSON.stringify(val),
          signal: this.controllerThreeFive.signal
        });
      } else if (this.chat_type == 1) {
        this.controllerFourZreo = new AbortController()
        response = await fetch(httpUrls.httpUrl + url, {
          method: "POST",
          headers: {
            "Content-Type": 'application/json',
            'Accept': '*/*',
            'authorization': userInfo.token,
            'role': userInfo.role,
            'source': 'pc'
          },
          body: JSON.stringify(val),
          signal: this.controllerFourZreo.signal
        });
      } else if (this.chat_type == 4) {
        this.controllerYiyan = new AbortController()
        response = await fetch(httpUrls.httpUrl + url, {
          method: "POST",
          headers: {
            "Content-Type": 'application/json',
            'Accept': '*/*',
            'authorization': userInfo.token,
            'role': userInfo.role,
            'source': 'pc'
          },
          body: JSON.stringify(val),
          signal: this.controllerYiyan.signal
        });
      } else if (this.chat_type == 5) {
        this.controllerXunfei = new AbortController()
        response = await fetch(httpUrls.httpUrl + url, {
          method: "POST",
          headers: {
            "Content-Type": 'application/json',
            'Accept': '*/*',
            'authorization': userInfo.token,
            'role': userInfo.role,
            'source': 'pc'
          },
          body: JSON.stringify(val),
          signal: this.controllerXunfei.signal
        });
      } else if (this.chat_type == 7) {
        this.controllerClaude = new AbortController()
        response = await fetch(httpUrls.httpUrl + url, {
          method: "POST",
          headers: {
            "Content-Type": 'application/json',
            'Accept': '*/*',
            'authorization': userInfo.token,
            'role': userInfo.role,
            'source': 'pc'
          },
          body: JSON.stringify(val),
          signal: this.controllerClaude.signal
        });
      } else if (this.chat_type == 8) {
        this.controllerChatGLM = new AbortController()
        response = await fetch(httpUrls.httpUrl + url, {
          method: "POST",
          headers: {
            "Content-Type": 'application/json',
            'Accept': '*/*',
            'authorization': userInfo.token,
            'role': userInfo.role,
            'source': 'pc'
          },
          body: JSON.stringify(val),
          signal: this.controllerChatGLM.signal
        });
      } else if (this.chat_type == 10) {
        this.controllerTongyi = new AbortController()
        response = await fetch(httpUrls.httpUrl + url, {
          method: "POST",
          headers: {
            "Content-Type": 'application/json',
            'Accept': '*/*',
            'authorization': userInfo.token,
            'role': userInfo.role,
            'source': 'pc'
          },
          body: JSON.stringify(val),
          signal: this.controllerTongyi.signal
        });
      } else if (this.chat_type == 11) {
        this.controllerShangtang = new AbortController()
        response = await fetch(httpUrls.httpUrl + url, {
          method: "POST",
          headers: {
            "Content-Type": 'application/json',
            'Accept': '*/*',
            'authorization': userInfo.token,
            'role': userInfo.role,
            'source': 'pc'
          },
          body: JSON.stringify(val),
          signal: this.controllerShangtang.signal
        });
      }

      this.ordeAIList = []

      // 状态码的统一处理
      if (response.status != '200') {
        response.json().then(res => {
          this.codeHandleChange(res)
        })
        return
      }

      if (!response.ok) {
        this.$message.error(response.statusText);
        return;
      }

      this.sendValue = '';// 清空发送栏内容
      const reader = response.body.getReader();
      while (true) {
        const { value, done } = await reader.read();
        if (done) {
          break;
        }
        if (value) {
          let stringStr = arr2str(value)
          let chatArr = stringStr.split('\r\n');
          chatArr.forEach(val => {
            if (val != '') {
              let res = JSON.parse(val);
              this.talkMsgList(res)
              return
            }

          })
        }
      }
    },


    // ai返回的数据处理
    talkMsgList(res) {
      // console.log('----------------------------------------', res);
      /**
       * 35
       */
      this.msgCode = res.msg_code
      if (Number(res.code) == 36003) {
        if (this.chat_type == 0) {
          this.isfinishThreeFive = true;
          clearInterval(this.t_timeThreeFive)
          this.t_timeThreeFive = null
          this.isTimeThreeFive = false;
          this.isBtnThreeFive = true
        } else if (this.chat_type == 1) {
          clearInterval(this.t_timeFourZero)
          this.t_timeFourZero = null
          this.isfinishFourZero = true;
          this.isTimeFourZero = false
          this.isBtnFourZero = true
        } else if (this.chat_type == 4) {
          clearInterval(this.t_timeYiyan)
          this.t_timeYiyan = null
          this.isfinishYiyan = true;
          this.isTimeYiyan = false
          this.isBtnYiyan = true
        } else if (this.chat_type == 5) {
          clearInterval(this.t_timeXunfei)
          this.t_timeXunfei = null
          this.isfinishXunfei = true;
          this.isTimeXunfei = false
          this.isBtnXunfei = true
        } else if (this.chat_type == 7) {
          clearInterval(this.t_timeClaude)
          this.t_timeClaude = null
          this.isfinishClaude = true;
          this.isTimeClaude = false
          this.isBtnClaude = true
        } else if (this.chat_type == 8) {
          clearInterval(this.t_timeChatGLM)
          this.t_timeChatGLM = null
          this.isfinishChatGLM = true;
          this.isTimeChatGLM = false
          this.isBtnChatGLM = true
        } else if (this.chat_type == 10) {
          clearInterval(this.timerTongyi)
          this.timerTongyi = null
          this.isfinishTongyi = true;
          this.isTimeTongyi = false
          this.isBtnTongyi = true
        } else if (this.chat_type == 11) {
          clearInterval(this.t_timeShangtang)
          this.t_timeShangtang = null
          this.isfinishShangtang = true;
          this.isTimeShangtang = false
          this.isBtnShangtang = true
        }
        this.$message.error('关联对话必须为一问一答')
      }
      if (Number(res.code) == 30014 || Number(res.code) == 40022) {
        // 登录
        if (this.loginInfo.role == 'guess') {
          this.$refs.Register.registerVisible = true
          return
        }
        // 升级会员
        if (this.loginInfo.role == 'user') {
          this.queryErrorMsg = res.msg
          this.isuser = false
          if (this.chat_type == 0) {
            this.isfinishThreeFive = true;
            clearInterval(this.t_timeThreeFive)
            this.t_timeThreeFive = null
            this.isTimeThreeFive = false;
            this.isBtnThreeFive = true
          } else if (this.chat_type == 1) {
            clearInterval(this.t_timeFourZero)
            this.t_timeFourZero = null
            this.isfinishFourZero = true;
            this.isTimeFourZero = false
            this.isBtnFourZero = true
          } else if (this.chat_type == 4) {
            clearInterval(this.t_timeYiyan)
            this.t_timeYiyan = null
            this.isfinishYiyan = true;
            this.isTimeYiyan = false
            this.isBtnYiyan = true
          } else if (this.chat_type == 5) {
            clearInterval(this.t_timeXunfei)
            this.t_timeXunfei = null
            this.isfinishXunfei = true;
            this.isTimeXunfei = false
            this.isBtnXunfei = true
          } else if (this.chat_type == 7) {
            clearInterval(this.t_timeClaude)
            this.t_timeClaude = null
            this.isfinishClaude = true;
            this.isTimeClaude = false
            this.isBtnClaude = true
          } else if (this.chat_type == 8) {
            clearInterval(this.t_timeChatGLM)
            this.t_timeChatGLM = null
            this.isfinishChatGLM = true;
            this.isTimeChatGLM = false
            this.isBtnChatGLM = true
          } else if (this.chat_type == 10) {
            clearInterval(this.t_timeTongyi)
            this.t_timeTongyi = null
            this.isfinishTongyi = true;
            this.isTimeTongyi = false
            this.isBtnTongyi = true
          } else if (this.chat_type == 11) {
            clearInterval(this.t_timeShangtang)
            this.t_timeShangtang = null
            this.isfinishShangtang = true;
            this.isTimeShangtang = false
            this.isBtnShangtang = true
          }
          return
        }
      }

      // 状态码的统一处理
      if (res.code != undefined) {
        let resStatus = this.codeHandleChange(res)
        if (!resStatus) {
          return
        }
      }
      const renderer = new marked.Renderer();
      // 重写代码块渲染方法，使用highlight.js进行代码高亮
      renderer.code = (code, language) => {
          const validLanguage = hljs.getLanguage(language) ? language : 'plaintext';
          const highlightedCode = hljs.highlight(validLanguage, code).value;
          return `<pre><code class="hljs ${validLanguage}">${highlightedCode}</code></pre>`;
      };

      // 35
      if (res.chat_type == '0' && !this.isfinishThreeFive) {
        this.isTimeThreeFive = false;
        if (res != '' && res.content != null) {
          // this.chatVipList[this.chatVipList.length-1].content += res.content;
          // console.log(this.chatVipList[this.chatVipList.length-1].content, 335)
          // this.lsReply(this.chatVipList[this.chatVipList.length-1].content, res.content);
          // this.reply = this.chatList[this.chatList.length-1].content + res.content; // 老版本预留
          // this.replyThreeFive = marked(this.chatList[this.chatList.length-1].content + res.content); // 预留，对话内容的转换
          // this.replyThreeFive = this.chatList[this.chatList.length - 1].content + res.content;
          // this.chatList[this.chatList.length - 1].content = this.chatList[this.chatList.length - 1].content + res.content;

          this.replyThreeFive = this.chatList[this.chatList.length-1].content + res.content;
          
          this.chatList[this.chatList.length-1].markedContent = this.chatList[this.chatList.length-1].content + res.content;
          this.chatList[this.chatList.length-1].content = this.chatList[this.chatList.length-1].content + res.content;
          
          // 定位到聊天最底部
          this.toBottom();
        }
        if (res.session_code != '' && res.content != null) {
          this.chatList[this.chatList.length - 1].session_code = res.session_code;
          localStorage.setItem('session_code', res.session_code);
        }
        if (res.create_time != '' && res.create_time != null) {
          this.chatList[this.chatList.length - 1].create_time = res.create_time
        }
        if (res.chat_group_code != '' && res.chat_group_code != null) {
          this.chatList[this.chatList.length - 1].chat_group_code = res.chat_group_code;
          localStorage.setItem('chat_group_code', res.chat_group_code);
        }
        if (res.finish_reason != '' && res.finish_reason != null) {
          // console.log('完结了');
          this.isfinishThreeFive = true;
          this.isBtnThreeFive = true;
          // this.chatList[this.chatList.length-1].content = this.reply;
          for (let i = 0; i < 10; i++) {
            clearInterval(this.t_timeThreeFive)
          }
          this.t_timeThreeFive = null
          this.chatList[this.chatList.length - 1].finish_reason = res.finish_reason;
          this.$store.dispatch('user/changeChatListLength', this.chatList.length)
          this.chatList[this.chatList.length - 1].timer = this.timerThreeFive
          if (!localStorage.getItem('session_code')) {
            // this.$root.Bus.$emit('updateList', this.chat_type) // 触发左侧导航栏刷新对话内容
            this.sessionRightNavCode = res.session_code
          }
          this.chatList.forEach(v => {
            v.markedContent = marked(v.content, { renderer })
          })
          this.replyThreeFive = marked(this.replyThreeFive, { renderer })

          this.tokenNumberThreeFive = {
            completionTokens: res.completion_tokens, // 下行token
            promptTokens: res.prompt_tokens, // 上行token
            integral: res.integral, // 积分
            totalTokens: res.total_tokens // 总tokes
          }
          this.chatList[this.chatList.length - 1].completion_tokens = res.completion_tokens
          this.chatList[this.chatList.length - 1].prompt_tokens = res.prompt_tokens
          this.chatList[this.chatList.length - 1].integral = res.integral
          this.chatList[this.chatList.length - 1].total_tokens = res.total_tokens

          // 保存最近使用
          submitFootprint({
            type_name: '人物互动',
            type_code: 'celebrity',
            title: this.oldSendValue,
            eid: res.session_code
          }).then(res => {})
          // this.replyThreeFive = marked(this.replyThreeFive) // marked的转换
          // this.replyThreeFive = marked(this.chatList[this.chatList.length-1].content + res.content); // 预留，对话内容的转换
        }
        if (res.finish_reason == 'stop') {
          this.sessionRightNavCode = res.session_code
        }
        if (res.role != '' && res.role != null) {
          this.chatList[this.chatList.length - 1].role = res.role;
        }
        // return;
      }

      /**
       * 40
       */
      if (res.chat_type == "1" && !this.isfinishFourZero) {
        this.isTimeFourZero = false;
        if (res != '' && res.content != null) {
          // this.chatVipList[this.chatVipList.length-1].content += res.content;
          // this.lsReply(this.chatVipList[this.chatVipList.length-1].content, res.content);
          // this.chatVipList[this.chatVipList.length-1].content = marked.parse(this.chatVipList[this.chatVipList.length-1].content + res.content); // 预留，对话内容的转换
          // this.reply = this.chatVipList[this.chatVipList.length-1].content + res.content; // 老版本预留

          // this.replyFourZero = marked(this.chatVipList[this.chatVipList.length-1].content + res.content); // 预留，对话内容的转换
          // this.replyFourZero = this.chatVipList[this.chatVipList.length - 1].content + res.content;
          // this.chatVipList[this.chatVipList.length - 1].content = this.chatVipList[this.chatVipList.length - 1].content + res.content;

          this.replyFourZero = this.chatVipList[this.chatVipList.length-1].content + res.content;
          
          this.chatVipList[this.chatVipList.length-1].markedContent = this.chatVipList[this.chatVipList.length-1].content + res.content;
          this.chatVipList[this.chatVipList.length-1].content = this.chatVipList[this.chatVipList.length-1].content + res.content;
          // 定位到聊天最底部
          this.toBottom();
        }
        if (res.session_code != '' && res.content != null) {
          this.chatVipList[this.chatVipList.length - 1].session_code = res.session_code;
          localStorage.setItem('session_code1', res.session_code);
        }
        if (res.create_time != '' && res.create_time != null) {
          this.chatVipList[this.chatVipList.length - 1].create_time = res.create_time
        }
        if (res.chat_group_code != '' && res.chat_group_code != null) {
          this.chatVipList[this.chatVipList.length - 1].chat_group_code = res.chat_group_code;
          localStorage.setItem('chat_group_code1', res.chat_group_code);
        }
        if (res.finish_reason != '' && res.finish_reason != null) {
          // console.log('完结了');
          clearInterval(this.t_timeFourZero);
          this.t_timeFourZero = null
          this.isfinishFourZero = true;
          this.isBtnFourZero = true;
          // this.chatVipList[this.chatVipList.length-1].content = this.reply;
          this.chatVipList[this.chatVipList.length - 1].finish_reason = res.finish_reason;
          this.$store.dispatch('user/changeChatListLength', this.chatVipList.length)
          this.chatVipList[this.chatVipList.length - 1].timer = this.timerFourZero
          if (!localStorage.getItem('session_code1')) {
            this.sessionRightNavCode = res.session_code
          }

          this.chatVipList.forEach(v => {
            v.markedContent = marked(v.content, { renderer })
          })
          this.replyFourZero = marked(this.replyFourZero, { renderer })

          this.tokenNumberFourZero = {
            completionTokens: res.completion_tokens, // 下行token
            promptTokens: res.prompt_tokens, // 上行token
            integral: res.integral, // 积分
            totalTokens: res.total_tokens // 总tokes
          }
          this.chatVipList[this.chatVipList.length - 1].completion_tokens = res.completion_tokens
          this.chatVipList[this.chatVipList.length - 1].prompt_tokens = res.prompt_tokens
          this.chatVipList[this.chatVipList.length - 1].integral = res.integral
          this.chatVipList[this.chatVipList.length - 1].total_tokens = res.total_tokens

          // 保存最近使用
          submitFootprint({
            type_name: '人物互动',
            type_code: 'celebrity',
            title: this.oldSendValue,
            eid: res.session_code
          }).then(res => {})
          // this.replyFourZero = marked(this.replyFourZero) // marked的转换
        }
        if (res.finish_reason == 'stop') {
          this.sessionRightNavCode = res.session_code
        }
        if (res.role != '' && res.role != null) {
          this.chatVipList[this.chatVipList.length - 1].role = res.role;
        }
      }

      /**
       * 文心一言
       */
      if (res.chat_type == "4" && !this.isfinishYiyan) {
        this.isTimeYiyan = false;
        if (res != '' && res.content != null) {
          // this.replyYiyan = this.chatYiyanList[this.chatYiyanList.length - 1].content + res.content;
          // this.chatYiyanList[this.chatYiyanList.length - 1].content = this.chatYiyanList[this.chatYiyanList.length - 1].content + res.content;

          this.replyYiyan = this.chatYiyanList[this.chatYiyanList.length-1].content + res.content;
          
          this.chatYiyanList[this.chatYiyanList.length-1].markedContent = this.chatYiyanList[this.chatYiyanList.length-1].content + res.content;
          this.chatYiyanList[this.chatYiyanList.length-1].content = this.chatYiyanList[this.chatYiyanList.length-1].content + res.content;
          // 定位到聊天最底部
          this.toBottom();
        }
        if (res.session_code != '' && res.content != null) {
          this.chatYiyanList[this.chatYiyanList.length - 1].session_code = res.session_code;
          localStorage.setItem('session_code4', res.session_code);
        }
        if (res.create_time != '' && res.create_time != null) {
          this.chatYiyanList[this.chatYiyanList.length - 1].create_time = res.create_time
        }
        if (res.chat_group_code != '' && res.chat_group_code != null) {
          this.chatYiyanList[this.chatYiyanList.length - 1].chat_group_code = res.chat_group_code;
          localStorage.setItem('chat_group_code4', res.chat_group_code);
        }
        if (res.finish_reason) {
          // console.log('完结了');
          clearInterval(this.t_timeYiyan);
          this.t_timeYiyan = null
          this.isfinishYiyan = true;
          this.isBtnYiyan = true;
          this.chatYiyanList[this.chatYiyanList.length - 1].finish_reason = res.finish_reason;
          this.$store.dispatch('user/changeChatListLength', this.chatYiyanList.length)
          this.chatYiyanList[this.chatYiyanList.length - 1].timer = this.timerYiyan
          if (!localStorage.getItem('session_code4')) {
            this.sessionRightNavCode = res.session_code
          }

          this.chatYiyanList.forEach(v => {
            v.markedContent = marked(v.content, { renderer })
          })
          this.replyYiyan = marked(this.replyYiyan, { renderer })

          this.tokenNumberYiyan = {
            completionTokens: res.completion_tokens, // 下行token
            promptTokens: res.prompt_tokens, // 上行token
            integral: res.integral, // 积分
            totalTokens: res.total_tokens // 总tokes
          }
          this.chatYiyanList[this.chatYiyanList.length - 1].completion_tokens = res.completion_tokens
          this.chatYiyanList[this.chatYiyanList.length - 1].prompt_tokens = res.prompt_tokens
          this.chatYiyanList[this.chatYiyanList.length - 1].integral = res.integral
          this.chatYiyanList[this.chatYiyanList.length - 1].total_tokens = res.total_tokens

          // 保存最近使用
          submitFootprint({
            type_name: '人物互动',
            type_code: 'celebrity',
            title: this.oldSendValue,
            eid: res.session_code
          }).then(res => {})
        }
        if (res.finish_reason) {
          this.sessionRightNavCode = res.session_code
        }
        if (res.role != '' && res.role != null) {
          this.chatYiyanList[this.chatYiyanList.length - 1].role = res.role;
        }
      }

      /**
       * 讯飞星火
       */
      if (res.chat_type == "5" && !this.isfinishXunfei) {
        this.isTimeXunfei = false;
        if (res != '' && res.content != null) {
          // this.replyXunfei = this.chatXunfeiList[this.chatXunfeiList.length - 1].content + res.content;
          // this.chatXunfeiList[this.chatXunfeiList.length - 1].content = this.chatXunfeiList[this.chatXunfeiList.length - 1].content + res.content;

          this.replyXunfei = this.chatXunfeiList[this.chatXunfeiList.length-1].content + res.content;
          
          this.chatXunfeiList[this.chatXunfeiList.length-1].markedContent = this.chatXunfeiList[this.chatXunfeiList.length-1].content + res.content;
          this.chatXunfeiList[this.chatXunfeiList.length-1].content = this.chatXunfeiList[this.chatXunfeiList.length-1].content + res.content;
          // 定位到聊天最底部
          this.toBottom();
        }
        if (res.session_code != '' && res.content != null) {
          this.chatXunfeiList[this.chatXunfeiList.length - 1].session_code = res.session_code;
          localStorage.setItem('session_code5', res.session_code);
        }
        if (res.create_time != '' && res.create_time != null) {
          this.chatXunfeiList[this.chatXunfeiList.length - 1].create_time = res.create_time
        }
        if (res.chat_group_code != '' && res.chat_group_code != null) {
          this.chatXunfeiList[this.chatXunfeiList.length - 1].chat_group_code = res.chat_group_code;
          localStorage.setItem('chat_group_code5', res.chat_group_code);
        }
        if (res.finish_reason == 2) {
          clearInterval(this.t_timeXunfei);
          this.t_timeXunfei = null
          this.isfinishXunfei = true;
          this.isBtnXunfei = true;
          // this.chatVipList[this.chatVipList.length-1].content = this.reply;
          this.chatXunfeiList[this.chatXunfeiList.length - 1].finish_reason = res.finish_reason;
          this.$store.dispatch('user/changeChatListLength', this.chatXunfeiList.length)
          this.chatXunfeiList[this.chatXunfeiList.length - 1].timer = this.timerXunfei
          if (!localStorage.getItem('session_code5')) {
            this.sessionRightNavCode = res.session_code
          }

          this.chatXunfeiList.forEach(v => {
            v.markedContent = marked(v.content, { renderer })
          })
          this.replyXunfei = marked(this.replyXunfei, { renderer })

          this.tokenNumberXunfei = {
            completionTokens: res.completion_tokens, // 下行token
            promptTokens: res.prompt_tokens, // 上行token
            integral: res.integral, // 积分
            totalTokens: res.total_tokens // 总tokes
          }
          this.chatXunfeiList[this.chatXunfeiList.length - 1].completion_tokens = res.completion_tokens
          this.chatXunfeiList[this.chatXunfeiList.length - 1].prompt_tokens = res.prompt_tokens
          this.chatXunfeiList[this.chatXunfeiList.length - 1].integral = res.integral
          this.chatXunfeiList[this.chatXunfeiList.length - 1].total_tokens = res.total_tokens

          // 保存最近使用
          submitFootprint({
            type_name: '人物互动',
            type_code: 'celebrity',
            title: this.oldSendValue,
            eid: res.session_code
          }).then(res => {})
          // this.replyXunfei = marked(this.replyXunfei) // marked的转换
        }
        if (res.finish_reason == 2) {
          this.sessionRightNavCode = res.session_code
        }
        if (res.role != '' && res.role != null) {
          this.chatXunfeiList[this.chatXunfeiList.length - 1].role = res.role;
        }
      }

      /**
       * Claude
       */
      if (res.chat_type == "7" && !this.isfinishClaude) {
        this.isTimeClaude = false;
        if (res != '' && res.content != null) {
          // this.replyClaude = this.chatClaudeList[this.chatClaudeList.length - 1].content + res.content;
          // this.chatClaudeList[this.chatClaudeList.length - 1].content = this.chatClaudeList[this.chatClaudeList.length - 1].content + res.content;

          this.replyClaude = this.chatClaudeList[this.chatClaudeList.length-1].content + res.content;
          
          this.chatClaudeList[this.chatClaudeList.length-1].markedContent = this.chatClaudeList[this.chatClaudeList.length-1].content + res.content;
          this.chatClaudeList[this.chatClaudeList.length-1].content = this.chatClaudeList[this.chatClaudeList.length-1].content + res.content;
          // 定位到聊天最底部
          this.toBottom();
        }
        if (res.session_code != '' && res.content != null) {
          this.chatClaudeList[this.chatClaudeList.length - 1].session_code = res.session_code;
          localStorage.setItem('session_code7', res.session_code);
        }
        if (res.create_time != '' && res.create_time != null) {
          this.chatClaudeList[this.chatClaudeList.length - 1].create_time = res.create_time
        }
        if (res.chat_group_code != '' && res.chat_group_code != null) {
          this.chatClaudeList[this.chatClaudeList.length - 1].chat_group_code = res.chat_group_code;
          localStorage.setItem('chat_group_code7', res.chat_group_code);
        }
        if (res.finish_reason == 'stop') {
          clearInterval(this.t_timeClaude);
          this.t_timeClaude = null
          this.isfinishClaude = true;
          this.isBtnClaude = true;
          // this.chatVipList[this.chatVipList.length-1].content = this.reply;
          this.chatClaudeList[this.chatClaudeList.length - 1].finish_reason = res.finish_reason;
          this.$store.dispatch('user/changeChatListLength', this.chatClaudeList.length)
          this.chatClaudeList[this.chatClaudeList.length - 1].timer = this.timerClaude
          if (!localStorage.getItem('session_code7')) {
            this.sessionRightNavCode = res.session_code
          }

          this.chatClaudeList.forEach(v => {
            v.markedContent = marked(v.content, { renderer })
          })
          this.replyClaude = marked(this.replyClaude, { renderer })

          this.tokenNumberClaude = {
            completionTokens: res.completion_tokens, // 下行token
            promptTokens: res.prompt_tokens, // 上行token
            integral: res.integral, // 积分
            totalTokens: res.total_tokens // 总tokes
          }
          this.chatClaudeList[this.chatClaudeList.length - 1].completion_tokens = res.completion_tokens
          this.chatClaudeList[this.chatClaudeList.length - 1].prompt_tokens = res.prompt_tokens
          this.chatClaudeList[this.chatClaudeList.length - 1].integral = res.integral
          this.chatClaudeList[this.chatClaudeList.length - 1].total_tokens = res.total_tokens

          // 保存最近使用
          submitFootprint({
            type_name: '人物互动',
            type_code: 'celebrity',
            title: this.oldSendValue,
            eid: res.session_code
          }).then(res => {})
          // this.replyXunfei = marked(this.replyXunfei) // marked的转换
        }
        if (res.finish_reason == 'stop') {
          this.sessionRightNavCode = res.session_code
        }
        if (res.role != '' && res.role != null) {
          this.chatClaudeList[this.chatClaudeList.length - 1].role = res.role;
        }
      }

      /**
       * ChatGLM
       */
      if (res.chat_type == "8" && !this.isfinishChatGLM) {
        this.isTimeChatGLM = false;
        if (res != '' && res.content != null) {
          // this.replyChatGLM = this.chatChatGLMList[this.chatChatGLMList.length - 1].content + res.content;
          // this.chatChatGLMList[this.chatChatGLMList.length - 1].content = this.chatChatGLMList[this.chatChatGLMList.length - 1].content + res.content;

          this.replyChatGLM = this.chatChatGLMList[this.chatChatGLMList.length-1].content + res.content;
          
          this.chatChatGLMList[this.chatChatGLMList.length-1].markedContent = this.chatChatGLMList[this.chatChatGLMList.length-1].content + res.content;
          this.chatChatGLMList[this.chatChatGLMList.length-1].content = this.chatChatGLMList[this.chatChatGLMList.length-1].content + res.content;
          // 定位到聊天最底部
          this.toBottom();
        }
        if (res.session_code != '' && res.content != null) {
          this.chatChatGLMList[this.chatChatGLMList.length - 1].session_code = res.session_code;
          localStorage.setItem('session_code8', res.session_code);
        }
        if (res.create_time != '' && res.create_time != null) {
          this.chatChatGLMList[this.chatChatGLMList.length - 1].create_time = res.create_time
        }
        if (res.chat_group_code != '' && res.chat_group_code != null) {
          this.chatChatGLMList[this.chatChatGLMList.length - 1].chat_group_code = res.chat_group_code;
          localStorage.setItem('chat_group_code8', res.chat_group_code);
        }
        if (res.finish_reason == 'stop') {
          clearInterval(this.t_timeChatGLM);
          this.t_timeChatGLM = null
          this.isfinishChatGLM = true;
          this.isBtnChatGLM = true;
          // this.chatVipList[this.chatVipList.length-1].content = this.reply;
          this.chatChatGLMList[this.chatChatGLMList.length - 1].finish_reason = res.finish_reason;
          this.$store.dispatch('user/changeChatListLength', this.chatChatGLMList.length)
          this.chatChatGLMList[this.chatChatGLMList.length - 1].timer = this.timerChatGLM
          if (!localStorage.getItem('session_code8')) {
            this.sessionRightNavCode = res.session_code
          }

          this.chatChatGLMList.forEach(v => {
            v.markedContent = marked(v.content, { renderer })
          })
          this.replyChatGLM = marked(this.replyChatGLM, { renderer })

          this.tokenNumberChatGLM = {
            completionTokens: res.completion_tokens, // 下行token
            promptTokens: res.prompt_tokens, // 上行token
            integral: res.integral, // 积分
            totalTokens: res.total_tokens // 总tokes
          }
          this.chatChatGLMList[this.chatChatGLMList.length - 1].completion_tokens = res.completion_tokens
          this.chatChatGLMList[this.chatChatGLMList.length - 1].prompt_tokens = res.prompt_tokens
          this.chatChatGLMList[this.chatChatGLMList.length - 1].integral = res.integral
          this.chatChatGLMList[this.chatChatGLMList.length - 1].total_tokens = res.total_tokens

          // 保存最近使用
          submitFootprint({
            type_name: '人物互动',
            type_code: 'celebrity',
            title: this.oldSendValue,
            eid: res.session_code
          }).then(res => {})
          // this.replyXunfei = marked(this.replyXunfei) // marked的转换
        }
        if (res.finish_reason == 'stop') {
          this.sessionRightNavCode = res.session_code
        }
        if (res.role != '' && res.role != null) {
          this.chatChatGLMList[this.chatChatGLMList.length - 1].role = res.role;
        }
      }

      /**
       * 通义千问
       */
       if (res.chat_type == "10" && !this.isfinishTongyi) {
        this.isTimeTongyi = false;
        if (res != '' && res.content != null) {
          // this.replyTongyi = res.content;
          // this.chatTongyiList[this.chatTongyiList.length - 1].content = res.content;

          this.chatTongyiList[this.chatTongyiList.length-1].content = res.content;

          this.chatTongyiList[this.chatTongyiList.length-1].markedContent = res.content;
          this.replyTongyi = res.content;
          // 定位到聊天最底部
          this.toBottom();
        }
        if (res.session_code != '' && res.content != null) {
          this.chatTongyiList[this.chatTongyiList.length - 1].session_code = res.session_code;
          localStorage.setItem('session_code8', res.session_code);
        }
        if (res.create_time != '' && res.create_time != null) {
          this.chatTongyiList[this.chatTongyiList.length - 1].create_time = res.create_time
        }
        if (res.chat_group_code != '' && res.chat_group_code != null) {
          this.chatTongyiList[this.chatTongyiList.length - 1].chat_group_code = res.chat_group_code;
          localStorage.setItem('chat_group_code8', res.chat_group_code);
        }
        if (res.finish_reason == 'stop') {
          clearInterval(this.t_timeTongyi);
          this.t_timeTongyi = null
          this.isfinishTongyi = true;
          this.isBtnTongyi = true;
          // this.chatVipList[this.chatVipList.length-1].content = this.reply;
          this.chatTongyiList[this.chatTongyiList.length - 1].finish_reason = res.finish_reason;
          this.$store.dispatch('user/changeChatListLength', this.chatTongyiList.length)
          this.chatTongyiList[this.chatTongyiList.length - 1].timer = this.timerTongyi
          if (!localStorage.getItem('session_code8')) {
            this.sessionRightNavCode = res.session_code
          }

          this.chatTongyiList.forEach(v => {
            v.markedContent = marked(v.content, { renderer })
          })
          this.replyTongyi = marked(this.replyTongyi, { renderer })

          this.tokenNumberTongyi = {
            completionTokens: res.completion_tokens, // 下行token
            promptTokens: res.prompt_tokens, // 上行token
            integral: res.integral, // 积分
            totalTokens: res.total_tokens // 总tokes
          }
          this.chatTongyiList[this.chatTongyiList.length - 1].completion_tokens = res.completion_tokens
          this.chatTongyiList[this.chatTongyiList.length - 1].prompt_tokens = res.prompt_tokens
          this.chatTongyiList[this.chatTongyiList.length - 1].integral = res.integral
          this.chatTongyiList[this.chatTongyiList.length - 1].total_tokens = res.total_tokens

          // 保存最近使用
          submitFootprint({
            type_name: '人物互动',
            type_code: 'celebrity',
            title: this.oldSendValue,
            eid: res.session_code
          }).then(res => {})
          // this.replyXunfei = marked(this.replyXunfei) // marked的转换
        }
        if (res.finish_reason == 'stop') {
          this.sessionRightNavCode = res.session_code
        }
        if (res.role != '' && res.role != null) {
          this.chatTongyiList[this.chatTongyiList.length - 1].role = res.role;
        }
      }


      /**
       * 商汤
       */
       if (res.chat_type == "11" && !this.isfinishShangtang) {
        this.isTimeShangtang = false;
        if (res != '' && res.content != null) {
          // this.replyShangtang = this.chatShangtangList[this.chatShangtangList.length - 1].content + res.content;
          // this.chatShangtangList[this.chatShangtangList.length - 1].content = this.chatShangtangList[this.chatShangtangList.length - 1].content + res.content;

          this.replyShangtang = this.chatShangtangList[this.chatShangtangList.length-1].content + res.content;
          
          this.chatShangtangList[this.chatShangtangList.length-1].markedContent = this.chatShangtangList[this.chatShangtangList.length-1].content + res.content;
          this.chatShangtangList[this.chatShangtangList.length-1].content = this.chatShangtangList[this.chatShangtangList.length-1].content + res.content;
          // 定位到聊天最底部
          this.toBottom();
        }
        if (res.session_code != '' && res.content != null) {
          this.chatShangtangList[this.chatShangtangList.length - 1].session_code = res.session_code;
          localStorage.setItem('session_code8', res.session_code);
        }
        if (res.create_time != '' && res.create_time != null) {
          this.chatShangtangList[this.chatShangtangList.length - 1].create_time = res.create_time
        }
        if (res.chat_group_code != '' && res.chat_group_code != null) {
          this.chatShangtangList[this.chatShangtangList.length - 1].chat_group_code = res.chat_group_code;
          localStorage.setItem('chat_group_code8', res.chat_group_code);
        }
        if (res.finish_reason == 'stop') {
          clearInterval(this.t_timeShangtang);
          this.t_timeShangtang = null
          this.isfinishShangtang = true;
          this.isBtnShangtang = true;
          // this.chatVipList[this.chatVipList.length-1].content = this.reply;
          this.chatShangtangList[this.chatShangtangList.length - 1].finish_reason = res.finish_reason;
          this.$store.dispatch('user/changeChatListLength', this.chatShangtangList.length)
          this.chatShangtangList[this.chatShangtangList.length - 1].timer = this.timerShangtang
          if (!localStorage.getItem('session_code8')) {
            this.sessionRightNavCode = res.session_code
          }

          this.chatShangtangList.forEach(v => {
            v.markedContent = marked(v.content, { renderer })
          })
          this.replyShangtang = marked(this.replyShangtang, { renderer })

          this.tokenNumberShangtang = {
            completionTokens: res.completion_tokens, // 下行token
            promptTokens: res.prompt_tokens, // 上行token
            integral: res.integral, // 积分
            totalTokens: res.total_tokens // 总tokes
          }
          this.chatShangtangList[this.chatShangtangList.length - 1].completion_tokens = res.completion_tokens
          this.chatShangtangList[this.chatShangtangList.length - 1].prompt_tokens = res.prompt_tokens
          this.chatShangtangList[this.chatShangtangList.length - 1].integral = res.integral
          this.chatShangtangList[this.chatShangtangList.length - 1].total_tokens = res.total_tokens

          // 保存最近使用
          submitFootprint({
            type_name: '人物互动',
            type_code: 'celebrity',
            title: this.oldSendValue,
            eid: res.session_code
          }).then(res => {})
          // this.replyXunfei = marked(this.replyXunfei) // marked的转换
        }
        if (res.finish_reason == 'stop') {
          this.sessionRightNavCode = res.session_code
        }
        if (res.role != '' && res.role != null) {
          this.chatShangtangList[this.chatShangtangList.length - 1].role = res.role;
        }
      }
    },

    // 快速选择问题,热词推荐
    selectQs(val) {
      this.sendValue = val
    },

    // 复制服务信息
    copyText(val) {
      var input = document.createElement("textarea"); // 创建input对象
      input.value = val; // 设置复制内容
      document.body.appendChild(input); // 添加临时实例
      input.select(); // 选择实例内容
      document.execCommand("Copy"); // 执行复制
      document.body.removeChild(input); // 删除临时实例
      this.$message.success('复制成功！');
    },

    // 文本域的值变化
    changeSendValue(value) {
      if (value.match(/^\//) != null) {
        this.isShowTemplateSelte = true
      } else {
        this.isShowTemplateSelte = false
      }
    },

    // 显示隐藏点赞/踩
    showSetonHelpImg(num, bool, item) {
      if (bool && (num == 1 || num == 3 || num == 5 || num == 7 || num == 9 || num == 11 || num == 13 || num == 15)) {
        chatLikes({
          "is_likes": 1,
          "session_code": item.session_code,
          "chat_group_code": item.chat_group_code
        })
      } else if (bool && (num == 2 || num == 4 || num == 6 || num == 8 || num == 10 || num == 12 || num == 14 || num == 16)) {
        chatLikes({
          "is_likes": 2,
          "session_code": item.session_code,
          "chat_group_code": item.chat_group_code
        })
      } else {
        chatLikes({
          "is_likes": 0,
          "session_code": item.session_code,
          "chat_group_code": item.chat_group_code
        })
      }

      if (num == 1) { // GPT35
        for (let i = 0; i < this.chatList.length; i++) {
          if (this.chatList[i].session_code == item.session_code && this.chatList[i].chat_group_code == item.chat_group_code) {
            this.chatList[i].help = false
            this.chatList[i].stepOn = false
            this.chatList[i].help = bool
            this.chatList[i].is_likes = bool ? 1 : 0
          }
        }
      } else if (num == 2) { // GPT35
        for (let i = 0; i < this.chatList.length; i++) {
          if (this.chatList[i].session_code == item.session_code && this.chatList[i].chat_group_code == item.chat_group_code) {
            this.chatList[i].help = false
            this.chatList[i].stepOn = false
            this.chatList[i].stepOn = bool
            this.chatList[i].is_likes = bool ? 2 : 0
          }
        }
      } else if (num == 3) { // GPT40
        for (let i = 0; i < this.chatVipList.length; i++) {
          if (this.chatVipList[i].session_code == item.session_code && this.chatVipList[i].chat_group_code == item.chat_group_code) {
            this.chatVipList[i].help = false
            this.chatVipList[i].stepOn = false
            this.chatVipList[i].help = bool
            this.chatVipList[i].is_likes = bool ? 1 : 0
          }
        }
      } else if (num == 4) { // GPT40
        for (let i = 0; i < this.chatVipList.length; i++) {
          if (this.chatVipList[i].session_code == item.session_code && this.chatVipList[i].chat_group_code == item.chat_group_code) {
            this.chatVipList[i].help = false
            this.chatVipList[i].stepOn = false
            this.chatVipList[i].stepOn = bool
            this.chatVipList[i].is_likes = bool ? 2 : 0
          }
        }
      } else if (num == 5) { // GPT40
        for (let i = 0; i < this.chatYiyanList.length; i++) {
          if (this.chatYiyanList[i].session_code == item.session_code && this.chatYiyanList[i].chat_group_code == item.chat_group_code) {
            this.chatYiyanList[i].help = false
            this.chatYiyanList[i].stepOn = false
            this.chatYiyanList[i].help = bool
            this.chatYiyanList[i].is_likes = bool ? 1 : 0
          }
        }
      } else if (num == 6) { // GPT40
        for (let i = 0; i < this.chatYiyanList.length; i++) {
          if (this.chatYiyanList[i].session_code == item.session_code && this.chatYiyanList[i].chat_group_code == item.chat_group_code) {
            this.chatYiyanList[i].help = false
            this.chatYiyanList[i].stepOn = false
            this.chatYiyanList[i].stepOn = bool
            this.chatYiyanList[i].is_likes = bool ? 2 : 0
          }
        }
      } else if (num == 7) { // GPT40
        for (let i = 0; i < this.chatXunfeiList.length; i++) {
          if (this.chatXunfeiList[i].session_code == item.session_code && this.chatXunfeiList[i].chat_group_code == item.chat_group_code) {
            this.chatXunfeiList[i].help = false
            this.chatXunfeiList[i].stepOn = false
            this.chatXunfeiList[i].help = bool
            this.chatXunfeiList[i].is_likes = bool ? 1 : 0
          }
        }
      } else if (num == 8) { // GPT40
        for (let i = 0; i < this.chatXunfeiList.length; i++) {
          if (this.chatXunfeiList[i].session_code == item.session_code && this.chatXunfeiList[i].chat_group_code == item.chat_group_code) {
            this.chatXunfeiList[i].help = false
            this.chatXunfeiList[i].stepOn = false
            this.chatXunfeiList[i].stepOn = bool
            this.chatXunfeiList[i].is_likes = bool ? 2 : 0
          }
        }
      } else if (num == 9) { // GPT40
        for (let i = 0; i < this.chatClaudeList.length; i++) {
          if (this.chatClaudeList[i].session_code == item.session_code && this.chatClaudeList[i].chat_group_code == item.chat_group_code) {
            this.chatClaudeList[i].help = false
            this.chatClaudeList[i].stepOn = false
            this.chatClaudeList[i].help = bool
            this.chatClaudeList[i].is_likes = bool ? 1 : 0
          }
        }
      } else if (num == 10) { // GPT40
        for (let i = 0; i < this.chatClaudeList.length; i++) {
          if (this.chatClaudeList[i].session_code == item.session_code && this.chatClaudeList[i].chat_group_code == item.chat_group_code) {
            this.chatClaudeList[i].help = false
            this.chatClaudeList[i].stepOn = false
            this.chatClaudeList[i].stepOn = bool
            this.chatClaudeList[i].is_likes = bool ? 2 : 0
          }
        }
      } else if (num == 11) { // GPT40
        for (let i = 0; i < this.chatChatGLMList.length; i++) {
          if (this.chatChatGLMList[i].session_code == item.session_code && this.chatChatGLMList[i].chat_group_code == item.chat_group_code) {
            this.chatChatGLMList[i].help = false
            this.chatChatGLMList[i].stepOn = false
            this.chatChatGLMList[i].help = bool
            this.chatChatGLMList[i].is_likes = bool ? 1 : 0
          }
        }
      } else if (num == 12) { // GPT40
        for (let i = 0; i < this.chatChatGLMList.length; i++) {
          if (this.chatChatGLMList[i].session_code == item.session_code && this.chatChatGLMList[i].chat_group_code == item.chat_group_code) {
            this.chatChatGLMList[i].help = false
            this.chatChatGLMList[i].stepOn = false
            this.chatChatGLMList[i].stepOn = bool
            this.chatChatGLMList[i].is_likes = bool ? 2 : 0
          }
        }
      } else if (num == 13) { // GPT40
        for (let i = 0; i < this.chatTongyiList.length; i++) {
          if (this.chatTongyiList[i].session_code == item.session_code && this.chatTongyiList[i].chat_group_code == item.chat_group_code) {
            this.chatTongyiList[i].help = false
            this.chatTongyiList[i].stepOn = false
            this.chatTongyiList[i].help = bool
            this.chatTongyiList[i].is_likes = bool ? 1 : 0
          }
        }
      } else if (num == 14) { // GPT40
        for (let i = 0; i < this.chatTongyiList.length; i++) {
          if (this.chatTongyiList[i].session_code == item.session_code && this.chatTongyiList[i].chat_group_code == item.chat_group_code) {
            this.chatTongyiList[i].help = false
            this.chatTongyiList[i].stepOn = false
            this.chatTongyiList[i].stepOn = bool
            this.chatTongyiList[i].is_likes = bool ? 2 : 0
          }
        }
      } else if (num == 15) { // GPT40
        for (let i = 0; i < this.chatShangtangList.length; i++) {
          if (this.chatShangtangList[i].session_code == item.session_code && this.chatShangtangList[i].chat_group_code == item.chat_group_code) {
            this.chatShangtangList[i].help = false
            this.chatShangtangList[i].stepOn = false
            this.chatShangtangList[i].help = bool
            this.chatShangtangList[i].is_likes = bool ? 1 : 0
          }
        }
      } else if (num == 16) { // GPT40
        for (let i = 0; i < this.chatShangtangList.length; i++) {
          if (this.chatShangtangList[i].session_code == item.session_code && this.chatShangtangList[i].chat_group_code == item.chat_group_code) {
            this.chatShangtangList[i].help = false
            this.chatShangtangList[i].stepOn = false
            this.chatShangtangList[i].stepOn = bool
            this.chatShangtangList[i].is_likes = bool ? 2 : 0
          }
        }
      }
    },

    // 切换为ai40
    toChatFouty() {
      // this.controller.abort()
      // this.isfinish = true
      if (this.chat_type == 0) {
        // this.controllerThreeFive.abort()
        clearInterval(this.t_timeThreeFive)
        this.t_timeThreeFive = null;
        this.isfinishThreeFive = true;
        this.isBtnThreeFive = true
        this.chatList[this.chatList.length - 1].timer = this.timerThreeFive
      } else if (this.chat_type == 1) {
        clearInterval(this.t_timeFourZero)
        this.t_timeFourZero = null
        // this.controllerFourZreo.abort()
        this.isBtnFourZero = true
        this.isfinishFourZero = true;
        this.chatVipList[this.chatVipList.length - 1].timer = this.timerFourZero
      } else if (this.chat_type == 4) {
        clearInterval(this.t_timeYiyan)
        this.t_timeYiyan = null
        // this.controllerFourZreo.abort()
        this.isBtnYiyan = true
        this.isfinishYiyan = true;
        this.chatYiyanList[this.chatYiyanList.length - 1].timer = this.timerYiyan
      } else if (this.chat_type == 5) {
        clearInterval(this.t_timeXunfei)
        this.t_timeXunfei = null
        // this.controllerFourZreo.abort()
        this.isBtnXunfei = true
        this.isfinishXunfei = true;
        this.chatXunfeiList[this.chatXunfeiList.length - 1].timer = this.timerXunfei
      } else if (this.chat_type == 7) {
        clearInterval(this.t_timeClaude)
        this.t_timeClaude = null
        // this.controllerFourZreo.abort()
        this.isBtnClaude = true
        this.isfinishClaude = true;
        this.chatClaudeList[this.chatClaudeList.length - 1].timer = this.timerClaude
      } else if (this.chat_type == 8) {
        clearInterval(this.t_timeChatGLM)
        this.t_timeChatGLM = null
        // this.controllerFourZreo.abort()
        this.isBtnChatGLM = true
        this.isfinishChatGLM = true;
        this.chatChatGLMList[this.chatChatGLMList.length - 1].timer = this.timerChatGLM
      } else if (this.chat_type == 10) {
        clearInterval(this.t_timeTongyi)
        this.t_timeTongyi = null
        // this.controllerFourZreo.abort()
        this.isBtnTongyi = true
        this.isfinishTongyi = true;
        this.chatTongyiList[this.chatTongyiList.length - 1].timer = this.timerTongyi
      } else if (this.chat_type == 11) {
        clearInterval(this.t_timeShangtang)
        this.t_timeShangtang = null
        // this.controllerFourZreo.abort()
        this.isBtnShangtang = true
        this.isfinishShangtang = true;
        this.chatShangtangList[this.chatShangtangList.length - 1].timer = this.timerShangtang
      }
      // this.endController()
      if (this.chat_type == 0) {
        this.sendValue = this.chatList[this.chatList.length - 2].content
      } else if (this.chat_type == 4) {
        this.sendValue = this.chatYiyanList[this.chatYiyanList.length - 2].content
      } else if (this.chat_type == 5) {
        this.sendValue = this.chatXunfeiList[this.chatXunfeiList.length - 2].content
      } else if (this.chat_type == 7) {
        this.sendValue = this.chatClaudeList[this.chatClaudeList.length - 2].content
      } else if (this.chat_type == 8) {
        this.sendValue = this.chatChatGLMList[this.chatChatGLMList.length - 2].content
      } else if (this.chat_type == 10) {
        this.sendValue = this.chatTongyiList[this.chatTongyiList.length - 2].content
      } else if (this.chat_type == 11) {
        this.sendValue = this.chatShangtangList[this.chatShangtangList.length - 2].content
      }
      this.timerFourZero = 0
      this.AIname = 1
      this.chat_type = 1
      this.ordeAIList = []
      if (!this.isfinishFourZero) {
        this.$message('当前问题还没回答完毕，请稍后再提问！')
        return
      }
      this.sendMsg('toChatFouty')
    },

    // 指令集的回调
    useingTemplate(item) {
      this.isShowTemplateSelte = false
      this.sendValue = item.prompts_name
    },

    // 换一批模板
    refresh() {
      this.queryQuestionSetRecommend()
    },

    // 更多模板
    showMore() {
      this.$router.push('/templateSelect/templateSelect')
      this.$store.dispatch('user/changeRouterIndex', 3)
    },

    // 关闭推荐
    closeRecommend() {
      this.isShowTemplate = false
    },


    // 下载快捷方式
    downloadImage(a, b) {
      var d = '' + a + b;
      var e = '[InternetShortcut]' + '\n' + 'URL=' + location.href;
      this.saveToDesktop(d, e);
    },

    saveToDesktop(fileName, data) {
      var explorer = navigator.userAgent.toLowerCase();
      if (explorer.indexOf("trident") > 0) {//IE 5+
        var wss = new ActiveXObject("WScript.Shell");
        var desktopUrl = wss.SpecialFolders("Desktop");
        var fso = new ActiveXObject("Scripting.FileSystemObject");
        var tf = fso.CreateTextFile(desktopUrl + "\\" + fileName, true);
        tf.Write(data);
        tf.Close();
      } else {//fireFox chrome
        var urlObj = window.URL || window.webkitURL || window;
        var blob = new Blob([data]);
        var link = document.createElementNS("http://www.w3.org/1999/xhtml", "a")
        link.href = urlObj.createObjectURL(blob);
        link.download = fileName;
        saveClick(link);
      }

      function saveClick(obj) {
        var e = document.createEvent("MouseEvents");
        e.initMouseEvent(
          "click", true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null
        );
        obj.dispatchEvent(e);
      }
    },

    codeHandleChange(res) {
      // if (response.status == '400') {
      if (this.chat_type == 0) {
        this.isTimeThreeFive = false;
        this.isBtnThreeFive = true
        this.isfinishThreeFive = true; // 完成打字效果
        clearInterval(this.t_timeThreeFive)
        this.t_timeThreeFive = null
      } else if (this.chat_type == 1) {
        this.isBtnFourZero = true
        this.isTimeFourZero = false
        clearInterval(this.t_timeFourZero)
        this.t_timeFourZero = null
        this.isfinishFourZero = true; // 完成打字效果
      } else if (this.chat_type == 4) {
        this.isBtnYiyan = true
        this.isTimeYiyan = false
        clearInterval(this.t_timeYiyan)
        this.t_timeYiyan = null
        this.isfinishYiyan = true; // 完成打字效果
      } else if (this.chat_type == 5) {
        this.isBtnXunfei = true
        this.isTimeXunfei = false
        clearInterval(this.t_timeXunfei)
        this.t_timeXunfei = null
        this.isfinishXunfei = true; // 完成打字效果
      } else if (this.chat_type == 7) {
        this.isBtnClaude = true
        this.isTimeClaude = false
        clearInterval(this.t_timeClaude)
        this.t_timeClaude = null
        this.isfinishClaude = true; // 完成打字效果
      } else if (this.chat_type == 8) {
        this.isBtnChatGLM = true
        this.isTimeChatGLM = false
        clearInterval(this.t_timeChatGLM)
        this.t_timeChatGLM = null
        this.isfinishChatGLM = true; // 完成打字效果
      } else if (this.chat_type == 10) {
        this.isBtnTongyi = true
        this.isTimeTongyi = false
        clearInterval(this.t_timeTongyi)
        this.t_timeTongyi = null
        this.isfinishTongyi = true; // 完成打字效果
      } else if (this.chat_type == 11) {
        this.isBtnShangtang = true
        this.isTimeShangtang = false
        clearInterval(this.t_timeShangtang)
        this.t_timeShangtang = null
        this.isfinishShangtang = true; // 完成打字效果
      }

      if (Number(res.code) == 40013) {
        this.$refs.Register.registerVisible = true
        this.$store.dispatch('user/GuessLogin')
        // localStorage.setItem('userInfo', null)
      } else if ((Number(res.code) == 30014 || Number(res.code) == 40022) && this.loginInfo.role == 'guess') {
        this.queryErrorMsg = res.msg
        this.$refs.Register.registerVisible = true
      } else if ((Number(res.code) == 30014 || Number(res.code) == 40022) && this.loginInfo.role == 'user') {
        this.isuser = false
        this.queryErrorMsg = res.msg
      } else if (Number(res.code) == 40015) {
        this.isFoulLanguage = true
        this.queryErrorMsg = res.msg
      } else {
        if (Number(res.code) < 50000 && Number(res.code) != 40022 && Number(res.code) != 30014) {
          this.$message.error(res.msg)
        } else if (Number(res.code) != 40022 && Number(res.code) != 30014) {
          this.$message({
            message: '网络异常,请稍后重试',
            type: 'success',
            duration: 2000
          })
        }
      }
    },

    sendMsg2() {
      if (!this.isShowassociation || this.association != '') {
        this.$message({
          type: 'info',
          message: '当前问题还没回答完毕，请稍后再提问！'
        })
      } else {
        this.$message({
          type: 'info',
          message: '请选择是否关联'
        })
      }
      // this.$message({
      //     type: 'info',
      //     message: '当前问题还没回答完毕，请稍后再提问！'
      // })
    },

    // 获取推荐问题集
    queryQuestionSetRecommend() {
      questionSetRecommend().then(res => {
        this.qsList = []
        this.qsList.push(res.data[0])
        this.qsList.push(res.data[1])
        this.qsList.push(res.data[2])
      })
    },

    resetMarkedRenderer() {
      const renderer = new marked.Renderer();
      // 重写代码块渲染方法，使用highlight.js进行代码高亮
      renderer.code = (code, language) => {
          const validLanguage = hljs.getLanguage(language) ? language : 'plaintext';
          const highlightedCode = hljs.highlight(validLanguage, code).value;
          return `<pre><code class="hljs ${validLanguage}">${highlightedCode}</code></pre>`;
      };
      return renderer
    },
  }
}
</script>

<style scoped>
/deep/ .el-textarea__inner{
  border: 1px solid transparent;
}
.qs_text {
  display: flex;
  flex-wrap: wrap;
  padding: 10px 0;
  justify-content: space-between;
}

.qs_line {
  margin-bottom: 10px;
  padding: 20px;
  border-radius: 6px;
  font-weight: 400;
  font-size: 14px;
  height: 38px;
  color: #78829A;
  cursor: pointer;
  background-color: #F6F8FB;
}

.qs_line-item {
  -webkit-line-clamp: 2;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}

.qs_line:hover {
  color: #FFFFFF;
  background: #1F64FF;
}

.prompt {
  color: #AAB2C8;
  font-size: 14px;
  font-weight: 400;
  margin-top: 10px;
}

.content {
  width: 100%;
  height: calc(100% - 22px);
  display: flex;
  flex-direction: column;
}

.footer_cont {
  /* background: #fff; */
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px 0 0 0;
  position: relative;
  margin-bottom: 30px;
  /* margin-bottom: 26px; */
}

/* .footer_qs {
  width: calc(70% - 240px);
  position: absolute;
  top: 50%;
  transform: translateX(-50%) translateY(-50%);
  left: calc(50% + 120px);
} */

.qs_top {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 10px;
  margin-bottom: 20px;
}

.top_left {
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 150%;
  color: #000;
  margin-right: 16px;

}

.top_right {
  display: flex;
  cursor: pointer;
  align-items: center;
  color: #1F64FF;
}

.top_text {
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 150%;
  margin-left: 5px;
  color: #1F64FF;
}

.cont {
  width: 100%;
  background: #fff;
  border-radius: 8px;
  display: flex;
  align-items: center;
  position: relative;
  padding: 6px 0;
}

.cg-chat-content {
  width: 100%;
  flex: 1;
  padding: 20px 0;
  /* margin: auto; */
  overflow: auto;
  padding-top: 0;

}

.cg-chatbox {
  border-radius: 5px;
  position: relative;
  padding: 20px 20px 20px 20px;
  word-break: break-all;
  word-wrap: break-word;
}

.cg-chatbox-left {
  border: 1px solid #F5F6F8;
  display: inline-block;
  background: #FFFFFF;
  border-radius: 8px;
  color: #333;
}

.cg-chatbox-left::before {
  right: 100%;
  border-color: transparent #F5F6F8 transparent transparent;
}

.cg-chatbox-right {
  border: 1px solid #1F64FF;
  display: inline-block;
  background: #1F64FF;
  border-radius: 8px;
  color: #fff;
  text-align: left;
  position: relative;
  padding-bottom: 32px;
}

.cg-chatbox-right::before {
  left: 100%;
  border-color: transparent transparent transparent #1F64FF;
}

.cg-chat-left,
.cg-chat-right {
  display: flex;
  align-items: flex-start;
  padding-top: 20px;
  justify-content: flex-start;
}

.cg-user-pic {
  width: 40px;
  height: 40px;
  flex-shrink: 0;
  display: block;
  border-radius: 50%;
}

.cg-left {
  margin-right: 15px;
}

.cg-right {
  margin-right: 15px;
}

.cg-chat-right-on {
  justify-content: flex-start;
}

.reply {
  font-size: 16px;
  line-height: 20px;
  letter-spacing: 1px;
  /* white-space: pre-wrap; */
}

.left_tip {
  font-size: 16px;
  color: #333;
  font-weight: 600;
  line-height: 20px;
  /* 设置字间距 */
  letter-spacing: 1px;
}

.as-cont-right {
  width: 84%;
  display: flex;
  justify-content: flex-start;
}

.as_text_left {
  display: flex;
  align-items: flex-end;
  justify-content: flex-start;
}

.as_text_right {
  width: 100%;
}

.as-cont-left {
  max-width: 80%;
  text-align: left;
}

.chat_bot {
  display: flex;
}

.operete_btn {
  font-style: normal;
  font-weight: 500;
  font-size: 10px;
  line-height: 150%;
  color: #1F64FF;
  border: 1px solid rgba(31, 100, 255, 0.1);
  border-radius: 6px;
  padding: 5px 16px;
  margin-top: 15px;
  margin-right: 10px;
  cursor: pointer;
  background-color: rgba(31, 100, 255, 0.1);
}

.comput {
  display: flex;
  justify-content: space-between;
}

.put_text {
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 200%;
  color: #AAB2C8;
  display: flex;
  align-items: center;
  margin-right: 10px;
}

.await_img {
  width: 16px;
  height: 16px;
  opacity: 0.5;
}

.supply_cont {
  background: #fff;
  border-radius: 10px;
  width: 400px;
  margin: auto;
}

.textarea-btn {
  background-color: #FFFFFF;
  height: var(--a);
  width: 90px;
  /* position: relative; */
  display: flex;
  align-items: flex-end;
  /* border: 2px solid #1F64FF; */
  border-left: none;
  border-radius: 0 10px 10px 0;
}

.send_img {
  width: 70px;
  height: 38px;
  margin-left: 10px;
  /* position: absolute;
  right: 10px;
  top: 50%; */
  /* transform: translateY(-50%); */
  padding: 8px 20px;
  border: none;
  background-color: #1f64ff;
}

.help-setpon {
  display: flex;
  flex-wrap: nowrap;
  margin-top: 5px;
}

.help-setpon-img {
  height: 22px;
  width: 22px;
  margin-right: 22px;
  cursor: pointer;
}

.cg-chatbox-right .img {
  width: 22px;
  height: 20px;
  position: absolute;
  bottom: 10px;
  right: 20px;
  cursor: pointer;
  margin-top: 21px;
  display: block;
  margin-top: 22px;
}

.help-setpon .cope-img {
  width: 20px;
  height: 20px;
  cursor: pointer;
}

.association {
  background-color: #FFFFFF;
  position: absolute;
  right: 0;
  top: -118px;
  padding: 26px 44px;
  width: 100px;
  height: 60px;
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
  border-radius: 4px;
}

.association .title {
  font-weight: 400;
  font-size: 14px;
  line-height: 22px;
  color: #333333;
  text-align: center;
  margin-bottom: 14px;
}

.association .item {
  display: flex;
  justify-content: space-between;
}

.association .item .el-radio .el-radio__label {
  padding-left: 4px;
}

.association .line {
  width: 12px;
  height: 12px;
  transform: rotateZ(45deg) translateY(-50%);
  background-color: #FFFFFF;
  position: absolute;
  right: 50%;
  bottom: -10px;
  box-shadow: 2px 2px 0 rgba(0, 0, 0, 0.1);
}


.reset_request {
  font-size: 14px;
  line-height: 150%;
  color: #1F64FF;
  border: 1px solid #1F64FF;
  border-radius: 3px;
  width: 95px;
  padding: 5px 0;
  margin-top: 15px;
  text-align: center;
  cursor: pointer;
  margin-right: 20px;
}

.reset_request:hover {
  color: #1F64FF;
  background: rgba(31, 100, 255, 0.1);
  border: 1px solid rgba(31, 100, 255, 0.1);
}

.chat-dialog-footer {
  background-color: #1F64FF;
  color: #FFFFFF;
  padding: 6px 12px;
  font-size: 14px;
  border-radius: 4px;
  cursor: pointer;
}

.query-reset_request {
  padding: 5px;
  margin-left: 55px;
}

.left_tip-content {
  font-size: 14px;
  color: #7EA6FC;
}


.role_back-page {
  display: flex;
  align-items: center;
  cursor: pointer;
  margin-left: 10px;
  width: 80px;
  height: 20px;
  position: absolute;
  top: 10px;
}

.role_back-page .img {
  height: 14px;
  transform: rotateZ(180deg);
  margin-right: 5px;
}
</style>

<style scoped>
.role-chat-text-textarea textarea {
  background-color: #FFFFFF;
  border: none;
  min-height: 31px !important;
  height: 79px;
}

.role-chat-text-textarea textarea::-webkit-scrollbar {
  width: 3px;
}

.role-chat-text-textarea textarea::-webkit-scrollbar-thumb {
  background-color: #f2f2f2;
}

.role-chat-text-textarea {
  /* border: 2px solid #1F64FF; */
  border-left: none;
  border-right: 1px solid #FFFFFF;
  height: var(--a);
  width: calc(100% - 90px);
}

.onceClassName {
  border-top-left-radius: 0 !important;
}

.onceClassNameRight {
  border-top-right-radius: 0 !important;
}

.chat-select-aiName {
  width: 156px;
  height: var(--a) !important;
  border: 2px solid #1F64FF;
  border-right: none;
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
}

.chat-select-aiName input {
  height: var(--a) !important;
  font-weight: 400;
  color: #666666;
  font-size: 14px;
  padding: 20px;
  border-radius: 10px 0 0 10px;
  border: none;
  border-right: 1px solid #FFFFFF;
}

.content .el-input__inner {
  background: #F5F6FA;
  border-radius: 10px;
  height: 58px;
  font-size: 16px;
  padding-left: 30px;
}

.content .ai-btn-list {
  border: none;
  font-size: 14px;
  /* width: 84px; */
  /* height: 38px; */
  background-color: #FFFFFF;
  text-align: center;
  padding: 8px 12px;
  margin-left: 0;
  position: relative;
}
</style>