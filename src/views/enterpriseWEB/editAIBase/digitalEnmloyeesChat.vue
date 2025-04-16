/**
 * 识万物
 */
<template>
  <div style="background-color: #f1f2f5;height: 100%;">
  <div class="digital_robots" :style="{ '--a': textareaHeight }">
    <!-- <div @click="$refs.member.PayVisible = true">开通会员</div> -->
    <div class="recognizingSllThings"
      :style="chatImageFile != '' ? 'height: calc(100% - 210px);' : ''">

      <div class="cg-chat-content-thing" id="chatCont" ref="wrap">

        <div class="cg-chat-left">
          <img class="cg-user-pic cg-right" :src="httpUrls.ossUrl + robotMsg.icon_url" alt="">
          <div class="as-cont-left" style="min-width: 425px;">
            <div class="as_text_left">
              <div class="cg-chatbox cg-chatbox-left">
                <div class="left_tip">{{ robotMsg.welcome_msg }}</div>
              </div>
            </div>
          </div>
        </div>

        <div v-for="(item, index) in chatList" :key="index">
          <div>
            <!-- 左侧模板 -->
            <div class="cg-chat-left" v-if="item.role == 'assistant'">
              <!-- 多选框 -->
              <div style="display: flex;">
                <img class="cg-user-pic cg-right" :src="httpUrls.ossUrl + robotMsg.icon_url" alt="">
                <div class="as-cont-left" style="min-width: 600px;">
                  <!-- 文字模式 -->
                  <div class="as_text_left">
                    <div class="cg-chatbox cg-chatbox-left">
                      <!-- 实时显示的内容/内容 -->
                      <div class="reply markdown-body"
                        :style="!isfinishThreeFive && index == chatList.length - 1 ? 'white-space: pre-wrap;' : ''"
                        v-html="(index == chatList.length - 1 && index != 0 && !isDetailThreeFive) ? replyThreeFive : item.content">
                      </div>

                      <div class="comput" style="margin-top: 10px;">
                        <div style="display: flex;flex-wrap: nowrap;">
                          <span class="put_text" v-if="!isfinishThreeFive && index == chatList.length - 1"><img
                              class="await_img" src="../../../assets/images/await.gif" alt="">思考中，</span>
                          <span class="put_text" v-if="item.timer != false"><img class="await_img"
                              src="../../../assets/images/Time_atack_light.png" alt=""></span>
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
                          <div class="put_text" v-if="index != chatList.length - 1">总字数：{{ (index == chatList.length - 1
                            &&
                            index != 0 && !isDetailThreeFive) ? replyThreeFive.length : item.content.length }}</div>
                          <!-- 回答结束时显示 -->
                          <div class="put_text" v-else-if="isfinishThreeFive">总字数：{{ (index == chatList.length - 1 &&
                            index
                            != 0 && !isDetailThreeFive) ? replyThreeFive.length : item.content.length }}</div>

                          <span class="put_text" v-if="isBtnThreeFive">
                            <span>消耗{{ item.integral }}算力</span>
                            <span>：共{{ item.total_tokens }}token</span>
                          </span>

                          <!-- <el-tooltip placement="top" v-if="isBtnThreeFive">
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
                          <img class="cope-img" src="../../../assets/images/copyBlack.png" @click="copyText(item.content)"
                            alt="">
                        </div>
                      </div>

                      <div class="prompt" v-if="isBtnThreeFive">当前内容为AI生成，不做任何决策使用！由此引发的一切后果，需自行承担，请知悉，已通过阿里云内容安全审核</div>
                    </div>
                  </div>
                  <!-- <div class="chat_bot">
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
                  </div> -->

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
                    <img v-if="item.images != null && item.images.length > 0" :src="httpUrls.ossUrl + item.images[0]"
                      alt="" style="width: 300px;cursor: zoom-in;"
                      @click="showImagesVisible = true, chatimageUrl = item.images[0]">
                    <img class="img" src="../../../assets/images/copyWrite.png" alt="" @click="copyText(item.content)">
                  </div>
                  <!-- <div class="reset_request" v-if="!isClickChat && isfinishThreeFive" @click="resetQuest(item)">
                    <i class="el-icon-chat-dot-round" style="font-size: 16px;"></i>
                    重新提问
                  </div> -->
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- 账户没钱了 -->
        <div class="cg-chat-left" v-if="!isuser">
          <img class="cg-user-pic cg-right" :src="httpUrls.ossUrl + robotMsg.icon_url" alt="">
          <div class="as-cont-left">
            <div class="as_text_left">
              <div class="cg-chatbox cg-chatbox-left">
                <div class="left_tip">{{ queryErrorMsg }}</div>
                <div style="margin-top: 10px;display: flex;justify-content: space-between;">
                  <el-button v-if="chat_type == 0"
                    style="background-color: #FF9B17;color: #FFFFFF;border-radius: 4px;padding: 6px 60px;"
                    @click="$resf.member.PayVisible = true">购买套餐</el-button>
                  <!-- <el-button type="primary" style="background-color: #1F64FF;border-radius: 4px;padding: 6px 60px;"
                    @click="$router.push('/member/Member')">购买流量包</el-button> -->
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- 屏蔽词 -->
        <div class="cg-chat-left" v-if="isFoulLanguage">
          <img class="cg-user-pic cg-right" :src="httpUrls.ossUrl + robotMsg.icon_url" alt="">
          <div class="as-cont-left">
            <div class="as_text_left">
              <div class="cg-chatbox cg-chatbox-left">
                <div class="left_tip">{{ queryErrorMsg }}</div>
              </div>
            </div>
          </div>
        </div>

        <!-- 获取中 -->
        <div>
          <div class="cg-chat-left" v-if="isTimeThreeFive" style="margin-bottom: 20px;">
            <img class="cg-user-pic cg-right" :src="httpUrls.ossUrl + robotMsg.icon_url" alt="">
            <div class="as-cont-left">
              <div class="as_text_left">
                <div class="cg-chatbox cg-chatbox-left">
                  <div class="comput" style="justify-content: flex-start;">
                    <span class="put_text"><img class="await_img" src="../../../assets/images/await.gif" alt="">思考中，</span>
                    <span class="put_text">耗时:{{ timerThreeFive }}秒</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>

        <span class="reset_request query-reset_request" v-if="isTimeThreeFive" @click="endController('', false)">
          <i class="el-icon-remove-outline"></i>
          停止回答
        </span>
      </div>
    </div>

    <!-- 开启新会话 35 -->
    <div style="font-size: 14px;color: #999999;text-align: center;line-height: 30px;"
      v-if="startNewChat35 && AIname == 8">
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
        <div :class="isSahowUploadPicture && chatImageFile != '' ? 'footer-inp_img footer-inp_img-on' : 'footer-inp_img'">
          <el-input resize="none" :style="{ '--a': textareaHeight }"
            :class="isShowTemplateSelte ? 'onceClassNameRight chat-text-textarea' : 'chat-text-textarea'" type="textarea"
            :autosize="{ minRows: 1, maxRows: 6 }" placeholder="在此输入您想了解的内容，Shift+Enter换行，Enter发送" v-model="sendValue"
            @input="changeSendValue" @keyup.enter.native="(event) => handleKeyUp(event)">
          </el-input>

          <div class="upload-file_image" v-if="isSahowUploadPicture && chatImageFile != ''">
            <img class="img" :src="httpUrls.ossUrl + chatImageFile" alt="">
            <i class="el-icon-close clear_img" @click="clearUploadImage"></i>
          </div>
        </div>
        <div class="textarea-btn">
          <div class="mask">
            <el-upload
              :class="isSahowUploadPicture && chatImageFile != '' ? 'upload-demo-chat upload-demo-chat-on' : 'upload-demo-chat'"
              v-if="isSahowUploadPicture && chatImageFile == ''" drag accept=".jpg,.jpeg,.png" ref="blueprintReading"
              :data="blueprintReadingFile" :style="{ '--a': textareaHeight }" :headers="headerData"
              :action="httpUrls.loginUrl + 'api/user/oss_upload'" :on-change="handleChangeFile"
              :on-success="handleSuccessFile" :on-exceed="() => { return $message.error('文件上传超出最大限制！') }"
              :show-file-list="false" :limit="1">
              <i class="el-icon-upload"></i>
              <div class="el-upload__text">将图片拖到此处，或<em>点击上传</em></div>
              <!-- <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div> -->
            </el-upload>

            <!-- <img style="cursor: pointer;" src="../../../assets/images/camera.png" alt=""
              @click="isSahowUploadPicture = !isSahowUploadPicture, chatImageFile = ''"> -->
            <el-button class="send_img" style="height: 32px;width: 70px;" type="primary"
              @click="isBtnThreeFive ? sendMsg() : sendMsg2()">发送</el-button>
          </div>
        </div>
      </div>
    </div>

    <!-- 补充弹窗 -->
    <el-dialog :visible.sync="supplyVisible" width="500px">
      <div class="supply_cont">
        <el-input type="textarea" resize='none' :rows="3" placeholder="请输入您要优化的内容" v-model="supplyValue"></el-input>
      </div>

      <span slot="footer" class="chat-dialog-footer" @click="keepAs(2)">
        发送
      </span>
    </el-dialog>

    <!-- 注册组件 -->
    <Register ref="Register"></Register>

    <!-- 图片预览 -->
    <el-dialog class="draw_image-class_dark" :visible.sync="showImagesVisible">
      <img :src="httpUrls.ossUrl + chatimageUrl" alt="" style="max-height: 800px;min-height: 500px;cursor: zoom-out;"
        @click="showImagesVisible = false">
    </el-dialog>

    <pay ref="member"></pay>
  </div>
</div>
</template>

<script>
import httpUrls from '../../../api/requestURL'

import { Line } from 'echarts/lib/util/graphic'
import { creatChat, chatDetail, creatDraw, questionSetRecommend, consumeDigitalEmployee } from '../../../api/chatMG'
import { recommend, chatLikes, promptsRecommend } from '../../../api/prompts'
import TemplateSelect from '../../../components/dialog/templateSelect'
import Register from '../../../components/register'
import rightNav from '../../../components/rightNav'

import { mapGetters } from 'vuex'
import { marked } from 'marked'
import hljs from 'highlight.js'

import { textDecoder, arr2str } from '../../../utils/download'

import pay from '../../../components/pay'
export default {
  name: 'recognizingSllThings',
  data() {
    return {
      httpUrls,
      showMeneber: false,
      isSahowUploadPicture: false,
      isShowRightNav: true,
      chatImageFile: '', // 上传图片的地址
      oldchatImageFile: '',
      chatimageUrl: '',
      showImagesVisible: false,
      robotMsg: '', // 机器人的信息
      blueprintReadingFile: {
        image: null,
        image_name: null,
        oss_dir: 'static',
        cate: 'recognizingSllThings-picture'
      },
      aiNameList: [
        { value: 8, label: 'ChatGLM' },
        { value: 4, label: '文心一言' },
        { value: 5, label: '讯飞星火' },
        { value: 10, label: '通义千问' },
        // { value: 11, label: '商汤日日新' },
        // {value: 0, label: 'AI35'},
        // {value: 1, label: 'AI40'},
        // {value: 7, label: 'Claude'},
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
      replyTongyi: '', // 实时回答 / 通义千问
      replyShangtang: '', // 实时回答 / 商汤

      timerThreeFive: 0, // 定时器的时间 / 35
      timerFourZero: 0, // 定时器的时间 / 40
      timerYiyan: 0, // 定时器的时间 / 文心一言
      timerXunfei: 0, // 定时器的时间 / 讯飞星火
      timerClaude: 0, // 定时器的时间 / Claude
      timerChatGLM: 0, // 定时器的时间 / ChatGLM
      timerTongyi: 0, // 定时器的时间 / 通义千问
      timerShangtang: 0, // 定时器的时间 / 商汤

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
      isTimeTongyi: false, // 开启获取中对话框 / 通义千问
      isTimeShangtang: false, // 开启获取中对话框 / 商汤

      // isfinish: true,
      isfinishThreeFive: true,// 完成打字效果 / 35
      isfinishFourZero: true,// 完成打字效果 / 40
      isfinishYiyan: true,// 完成打字效果 / 文心一言
      isfinishXunfei: true,// 完成打字效果 / 讯飞星火
      isfinishClaude: true,// 完成打字效果 / 讯飞星火
      isfinishChatGLM: true,// 完成打字效果 / ChatGLM
      isfinishTongyi: true,// 完成打字效果 / 通义千问
      isfinishShangtang: true,// 完成打字效果 / 商汤

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
      isClickChat: false, // 点击历史会话打开优化本次回答
      chatItem: {}, // 用于存放优化会话的临时对象
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
      textareaHeight: '38px', // 发送框的同一高度
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
      },
      headerData: {}
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
    ...mapGetters(['userInfoData', 'contactService', 'enterpriseId'])
  },

  props: {
    item: {
      type: String,
      default: ''
    }
  },

  watch: {
    enterpriseId: {
      deep: true,
      handler() {
        this.$router.go(-1)
      }
    },
    sendValue: {
      deep: true,
      handler() {
        setTimeout(() => {
          this.textareaHeight = document.getElementsByClassName('chat-text-textarea')[0].childNodes[0].clientHeight + 'px'
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
          if (this.chat_type == 8) {
            this.isBtnThreeFive = false
          }
        }
      }
    },
    association: {
      deep: true,
      handler() {
        if (this.association != '') {
          if (this.chat_type == 8) {
            this.isBtnThreeFive = true
          }
        }
        if (Number(this.association) == 2) {
          this.isClickChat = false
          if (this.chat_type == 8) {
            clearInterval(this.t_timeThreeFive)
            this.chatList = []
            this.$store.dispatch('user/changeChatListLength', this.chatList.length)
          }
          this.sendMsg()
          this.isShowChecked = false
          this.isShowassociation = false
          this.isClickChat = false
        } else if (Number(this.association == 1)) {
          // this.$message.success('请勾选您要关联上文的内容')
          // this.isShowChecked = true
          this.sendMsg()
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
  },

  created() {
    this.updataRightList = Number(this.chat_type)
    this.loginInfo = JSON.parse(localStorage.getItem("userInfo"));
    localStorage.setItem('session_code', '');
  },

  mounted() {
    let userInfo = JSON.parse(localStorage.getItem("userInfo"));
    this.headerData.authorization = userInfo.token
    this.headerData.role = userInfo.role
    this.robotMsg = JSON.parse(sessionStorage.getItem('DIGITAL_EMPLOYESS_ITEM'))
    document.title = httpUrls.name

    if (this.$route.params.session_code != undefined) {
      this.getDetail(this.$route.params.session_code)
    }
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
    // 获取会话详情
    getDetail(code) {
        this.isDetailThreeFive = true;
        this.isTimeThreeFive = false;
        this.isfinishThreeFive = true;
        this.chatList = [];
        this.isShowTemplateThreeFive = false
        this.isFoulLanguage = false
        this.ordeAIList = []
        const renderer = new marked.Renderer();
        // 重写代码块渲染方法，使用highlight.js进行代码高亮
        renderer.code = (code, language) => {
            const validLanguage = hljs.getLanguage(language) ? language : 'plaintext';
            const highlightedCode = hljs.highlight(validLanguage, code).value;
            return `<pre><code class="hljs ${validLanguage}">${highlightedCode}</code></pre>`;
        };
        chatDetail(code).then(res => {
            if (res.code == 20000) {
               let arr = res.data;
               arr.forEach((item,index) => {
                  localStorage.setItem('session_code', code);
                  localStorage.setItem('chat_group_code', item.chat_group_code);
                  this.chatList.push({
                    ...item,
                    help: item.is_likes == 1 ? true : false,
                    stepOn: item.is_likes == 2 ? true : false,
                    markedContent: marked(item.content, { renderer }),
                    id: this.chatList.length,
                    timer: false
                  })
                  this.$store.dispatch('user/changeChatListLength', this.chatList.length)
                })
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
    clearUploadImage() {
      this.isSahowUploadPicture = false
      this.chatImageFile = ''
    },
    handleChangeFile(file, fileList) {
      this.blueprintReadingFile.image = file.raw
      this.blueprintReadingFile.image_name = file.name
    },
    handleSuccessFile(response, file, fileList) {
      if (response.code == 20000) {
        this.chatImageFile = response.data.new_url
        this.oldchatImageFile = response.data.new_url
        this.resetNewChat('fileSuccess')
      } else {
        this.$message.error(response.msg)
        this.$refs.blueprintReading.clearFiles()
      }
    },

    // 优化回答
    optimizeAnswers(item, index) {
      if (this.chat_type == 8) {
        if (!this.isfinishThreeFive) {
          this.$message('当前问题还没回答完毕，请稍后再提问');
          return
        }
      }
      this.supplyVisible = true
      this.chatItem = { ...item, chatIndex: index }
      this.supplyValue = ''
    },

    // 开启新会话
    resetNewChat(aiId) {
      if (this.chat_type == 8) {
        // if (this.chatList.length == 0) return
        this.chatList = []
        this.startNewChat35 = false
        this.isShowTemplateThreeFive = true
        this.$store.dispatch('user/changeChatListLength', 0)
        localStorage.setItem('session_code', '')
        localStorage.setItem('chat_group_code', '')
      }
      this.isuser = true
      this.endController('', false) // 终止回答
      this.isShowChecked = false
      this.isShowassociation = false
      this.isClickChat = false
      if(aiId != 'fileSuccess') {
        this.sendValue = ''
      }
      this.msgCode = ''
      if (aiId == 8) {
        this.isTimeThreeFive = false;
      }
    },

    resetQuest(item) {
      if (this.chat_type == 8) {
        if (!this.isfinishThreeFive) {
          this.$message('当前问题还没回答完毕，请稍后再提问');
          return
        }
      }
      this.sendValue = item.content
      this.endController('', false)
      this.vipSend('reset')
    },

    //发送信息
    sendMsg(bool = '') {
      this.loginInfo = JSON.parse(localStorage.getItem('userInfo'));
      this.chatContScroll = ''
      // 重新回答
      // if (bool != '' && bool != 'toChatFouty') {
      //     this.sendValue = this.oldSendValue
      // }


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
      this.isFoulLanguage = false
      this.isShowassociation = false
      this.isShowChecked = false

      this.isShow = true;  // 快速提问
      if (this.chat_type == 8) {
        this.isDetailThreeFive = false;
        this.isfinishThreeFive = false; // 完成打字效果
        this.isBtnThreeFive = false;  // 是否允许重发
        this.replyThreeFive = ''
        this.isShowTemplateThreeFive = false // 关闭热词
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
        "images": [this.chatImageFile],
        "content": this.sendValue, // 预留，对话内容的转换
        "markedContent": marked(this.sendValue),
        checked: false,
        help: false, // 点赞
        stepOn: false, // 点踩
        timer: false,
      }

      // 获取当前会话列表的长度，用作右侧侧边栏的选中状态
      if (this.chat_type == 8) {
        this.chatList.push({ ...sendVal, id: this.chatList.length }); // id：用于关联上下文时的排序，防止顺序错乱导致接口返回的信息错误
        this.$store.dispatch('user/changeChatListLength', this.chatList.length)
      }

      this.toBottom();

      // this.isTime = true; // 思考中
      if (this.chat_type == 8) {
        this.isTimeThreeFive = true;
        this.replyThreeFive = ''
      }
      if (bool != 'toChatFouty') {
        if (this.chat_type == 8) {
          this.timerThreeFive = 0;
          this.t_timeThreeFive = setInterval(() => {
            this.timerThreeFive += 1;
          }, 1000)
        }
      }
      let val = null
      if (this.chat_type == 8) {
        let msg = []
        this.chatList.forEach(v => {
          msg.push({
            role: v.role,
            content: v.content
          })
        });
        consumeDigitalEmployee({
          company_id: this.robotMsg.company_code,
          clerk_id: this.robotMsg.clerk_code,
          question_content: this.sendValue
        }).then(res => {
          // historyList[historyList.length - 1].covert_content = res.data.prompt
          val = {
            "chat_type": this.chat_type,
            "session_code": localStorage.getItem('session_code') || '',
            "chat_group_code": "",
            content: this.sendValue,
            company_code: this.robotMsg.company_code,
              clerk_code: this.robotMsg.clerk_code,
            msg_list: JSON.stringify([{ role: 'user', covert_content: res.data.prompt,  content: this.sendValue, images: this.chatImageFile != '' ? [this.chatImageFile] : [] }]),
            'model': 'chatglm_pro'
          }
          this.vipSend(bool, val)
        })
      }

      // 关联上下文时，拿到对应的值然后清空对应的数据
      // if (Number(this.association) == 1) {
      //   if (this.chat_type == 8) {
      //     let historyList = []
      //     this.chatList.forEach((v, i) => {
      //       historyList.push({
      //         role: v.role,
      //         content: v.content
      //       })
      //     })
      //     consumeDigitalEmployee({
      //       company_id: this.robotMsg.company_code,
      //       clerk_id: this.robotMsg.clerk_code,
      //       question_content: this.sendValue
      //     }).then(res => {
      //       historyList[historyList.length - 1].covert_content = res.data.prompt
      //       val = {
      //         'chat_type': this.chat_type,
      //         'session_code': localStorage.getItem('session_code') || '',
      //         'chat_group_code': "",
      //         'msg_list': JSON.stringify(historyList),
      //         company_code: this.robotMsg.company_code,
      //         clerk_code: this.robotMsg.clerk_code,
      //         image_url: this.oldchatImageFile
      //       }
      //       this.vipSend(bool)
      //     })
      //   }
      //   this.ordeAIList = []
      // }
    },

    // 4.0信息发送
    async vipSend(bool = '', val) {
      
      if (Number(this.association) == 2) {
        val.session_code = ''
      }

      this.association = ''

      if (this.chat_type == 8) {
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
      }
      if (bool == 'toChatFouty') {
        if (this.chat_type == 8) {
          this.t_timeThreeFive = setInterval(() => {
            this.timerThreeFive += 1;
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
      this.isSahowUploadPicture = false
      sessionStorage.setItem('chatImageFile', this.chatImageFile)
      this.chatImageFile = ''

      let response = null
      let url = Number(this.chat_type) == 0 || Number(this.chat_type) == 1 ? 'api/chat/async_chat_session' : 'api/chat/async_chat_completion'
      if (this.chat_type == 8) {
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
      }
      this.ordeAIList = []

      console.log(response);
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
          if (this.chat_type == 8) {
            this.isDetailThreeFive = false
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
      if (this.chat_type == 8) {
        this.isTimeThreeFive = false;
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
          if (this.chat_type == 8) {
            this.replyThreeFive = replyStr
          }
          i++
          // 定位到聊天最底部
          this.toBottom();
        } else {
          clearInterval(time)
        }
      }, 100)

      // 判断是否显示完毕
      setTimeout(() => {
        if (this.chat_type == 8) {
          this.isfinishThreeFive = true; // 完成打字效果
          this.isBtnThreeFive = true;
          clearInterval(this.t_timeThreeFive);
          this.t_timeThreeFive = null
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
      if (this.chat_type == 8) {
        if (!this.isfinishThreeFive) {
          this.$message('当前问题还没回答完毕，请稍后再提问')
          return
        }
      }

      if (this.chat_type == 8) {
        this.sendValue = this.chatList[this.chatList.length - 2].content
        console.log(this.chatList[this.chatList.length - 2].content);
        this.chatList.splice(this.chatList.length - 2, 2)
      }
      this.endController('', false)
      this.sendMsg('true')
    },

    // 终止回答
    endController(code, resetChat = true) {
      if (Number(this.chat_type) == 8) {
        this.isfinishThreeFive = true
        this.isBtnThreeFive = true
        this.isTimeThreeFive = false
        try {
          this.controllerThreeFive.abort()
        } catch (error) { }
        clearInterval(this.t_timeThreeFive);
      }

      if (resetChat) {
        if (this.chat_type == 8) {
          this.chatList[this.chatList.length - 1].timer = this.timerThreeFive
        }
      }
    },

    // 继续回答
    keepAs(key, item = {}) {
      if (this.supplyValue == '' || this.supplyValue.replace(/\s*/g, '') == '') {
        this.$message.error('请输入您要发送内容')
        return;
      }
      let msg = '继续';
      if (key == 2) {
        msg = this.supplyValue
        item = this.chatItem
      }

      let val = {
        "chat_type": this.chat_type,
        "action_type": 3,
        "session_code": this.chatItem.session_code,
        "chat_group_code": this.chatItem.chat_group_code,
        "content": msg,
        image_url: this.oldchatImageFile
      }
      if (this.chat_type == 8) {
        this.isBtnThreeFive = false;
        this.isDetailThreeFive = false;
        this.isfinishThreeFive = false;
        this.replyThreeFive = ''
      }
      this.supplyVisible = false;
      if (this.chat_type == 8) {
        if (this.chatItem.timer) {
          this.timerThreeFive = this.chatItem.timer
        } else {
          this.timerThreeFive = 0
        }
        this.t_timeThreeFive = setInterval(() => {
          this.timerThreeFive += 1;
        }, 1000)
      }
      this.vipAgainSend(key, val, item)
    },

    async vipAgainSend(key, valu = {}, item) {
      let msg = '继续';
      if (key == 2) {
        msg = this.supplyValue
      }

      let val = null
      if (this.chat_type == 8) {
        let smg = []
        this.chatList.forEach(v => {
          smg.push({
            role: v.role,
            content: v.content
          })
        })
        val = {
          "chat_type": this.chat_type,
          "session_code": localStorage.getItem('session_code'),
          "chat_group_code": localStorage.getItem('chat_group_code'),
          "msg_list": JSON.stringify(smg),
          image_url: this.oldchatImageFile
        }
      }

      let userInfo = JSON.parse(localStorage.getItem("userInfo"));
      if (key == 2) {
        if (this.chat_type == 8) {
          this.chatList.push(
            {  // 询问者问题展示
              "create_time": 'date',
              "finish_reason": "length",
              "session_code": this.chatItem.session_code,
              "chat_group_code": this.chatItem.chat_group_code,
              "role": "user",
              "content": this.supplyValue, // 预留，对话内容的转换
              "markedContent": marked(this.supplyValue),
              checked: false,
              help: false, // 点赞
              stepOn: false, // 点踩
              timer: false,
            }
          )
          this.chatList.push(
            {  // 询问者问题展示
              "create_time": 'date',
              "finish_reason": "length",
              "session_code": '',
              "chat_group_code": '',
              "role": "assistant",
              "content": '', // 预留，对话内容的转换
              "markedContent": marked(this.supplyValue),
              checked: false,
              help: false, // 点赞
              stepOn: false, // 点踩
              timer: false,
            }
          )
          this.$store.dispatch('user/changeChatListLength', this.chatList.length)
        }
      }

      let response = null
      let url = Number(this.chat_type) == 0 || Number(this.chat_type) == 1 ? 'api/chat/async_chat_session' : 'api/chat/async_chat_completion'
      if (this.chat_type == 8) {
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
        if (this.chat_type == 8) {
          this.isfinishThreeFive = true;
          clearInterval(this.t_timeThreeFive)
          this.t_timeThreeFive = null
          this.isTimeThreeFive = false;
          this.isBtnThreeFive = true
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
          if (this.chat_type == 8) {
            this.isfinishThreeFive = true;
            clearInterval(this.t_timeThreeFive)
            this.t_timeThreeFive = null
            this.isTimeThreeFive = false;
            this.isBtnThreeFive = true
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

      // 35
      if (!this.isfinishThreeFive) {
        this.isTimeThreeFive = false;
        if (res != '' && res.content != null) {
          if (res.finish_reason != 'stop') {
            this.replyThreeFive = this.chatList[this.chatList.length - 1].content + res.content;
            this.chatList[this.chatList.length - 1].content = this.chatList[this.chatList.length - 1].content + res.content;
          }
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
          }
          this.chatList.forEach(v => {
            v.markedContent = marked(v.content)
          })

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
        }
        if (res.role != '' && res.role != null) {
          this.chatList[this.chatList.length - 1].role = res.role;
        }
      }
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

    codeHandleChange(res) {
      // if (response.status == '400') {
      if (this.chat_type == 8) {
        this.isTimeThreeFive = false;
        this.isBtnThreeFive = true
        this.isfinishThreeFive = true; // 完成打字效果
        clearInterval(this.t_timeThreeFive)
        this.t_timeThreeFive = null
      }

      if (Number(res.code) == 40013) {
        this.$refs.Register.registerVisible = true
        this.$store.dispatch('user/GuessLogin')
      }
      if ((Number(res.code) == 30014 || Number(res.code) == 40022) && this.loginInfo.role == 'guess') {
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
            type: 'error',
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
    },

    // 获取推荐问题集
    queryQuestionSetRecommend() {
      questionSetRecommend().then(res => {
        this.qsList = []
        this.qsList.push(res.data[0])
        this.qsList.push(res.data[1])
        this.qsList.push(res.data[2])
      })
    }
  }
}
</script>

<style scoped>
.recognizingSllThings {
  width: 100%;
  display: flex;
  height: calc(100% - 70px);
  position: relative;
}
#chatCont::-webkit-scrollbar {
  background-color: #f9f9f9;
}

#chatCont::-webkit-scrollbar-thumb {
  border-radius: 4px;
  background-color: #dedede;
}

.footer-inp_img {
  width: calc(100% - 90px);
  position: relative;
}

.association_class {
  position: absolute;
  left: 10px;
  top: -34px;
  z-index: 2;
  font-size: 24px;
}

.upload-file_image {
  height: 80px;
  margin-top: 20px;
  display: flex;
  align-items: center;
}

.upload-file_image .img {
  height: 80px;
  border: 1px solid #E5E5E5;
  border-right: none;
  border-radius: 4px 0 0 4px;
}

.upload-file_image .clear_img {
  padding: 0 10px;
  border: 1px solid #E5E5E5;
  font-size: 18px;
  line-height: 80px;
  height: 80px;
  font-weight: bold;
  text-align: center;
  border-radius: 0 4px 4px 0;
  cursor: pointer;
}

.model_list {
  margin: 10px 0 10px 16px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.model_list .title {
  color: #333;
  font-size: 16px;
  font-weight: 500;
  margin: 20px 0 20px 0;
}

@media (height >=780px) {
  .footer_qs .qs_text {
    height: 295px;
    overflow-y: auto;
  }
}

@media (height < 780px) and (height >=690px) {
  .footer_qs .qs_text {
    height: 211px;
    overflow-y: auto;
  }
}

@media (height < 690px) {
  .footer_qs .qs_text {
    height: 121px;
    overflow-y: auto;
  }
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
  background-color: #FFFFFF;
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
  width: calc(100% - 256px);
  height: calc(100% - 22px);
  display: flex;
  flex-direction: column;
  margin-left: 240px;
  transition: width .2s;
}

.footer_cont {
  /* background: #fff; */
  width: calc(100% - 40px);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 6px 0 10px 20px;
  position: relative;
  margin-left: 20px;
}

.footer_qs {
  width: 100%;
  /* width: calc(100% - 240px); */
  display: flex;
  justify-content: center;
  margin-top: 30px;
  /* position: absolute; */
  /* top: 50%;
        transform: translateX(-50%) translateY(-50%); */
  /* left: calc(50% + 120px); */
}

.footer_qs .mask {
  width: 70%;
}

.qs_top {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 10px 0;
  width: 100%;
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
  padding: 6px 0;
  background: #fff;
  border-radius: 10px;
  display: flex;
  align-items: flex-end;
  position: relative;
}

.cg-chat-content-thing {
  width: calc(100% - 120px);
  flex: 1;
  padding: 20px 60px;
  /* margin: auto; */
  overflow: auto;
  height: calc(100% - 26px);
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
  border: 1px solid #FFFFFF;
  display: inline-block;
  background: #FFFFFF;
  border-radius: 8px;
  color: #333;
}

.cg-chatbox-left::before {
  right: 100%;
  border-color: transparent #FFFFFF transparent transparent;
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
  white-space: pre-wrap;
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
  height: calc(100%);
  width: 90px;
  display: flex;
  align-items: flex-end;
  position: relative;
  /* border: 2px solid #1F64FF; */
  /* border-left: none; */
  border-radius: 0 10px 10px 0;
}

.textarea-btn .mask {
  display: flex;
  /* margin-bottom: 10px; */
  align-items: center;
  /* height: 100%; */
  width: 90%;
  justify-content: space-between;
}

.send_img {
  width: 70px;
  height: 38px;
  /* position: absolute; */
  /* right: 10px;
      top: 50%; */
  /* transform: translateY(-50%); */
  padding: 8px 20px;
  background-color: #1f64ff;
  border: none;
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
  /* margin-top: 22px; */
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

.digital_robots {
  width: 100%;
  height: calc(100% - var(--a));
  background-color: #F1F2F5;
}
</style>

<style scoped>
.chat-text-textarea {
  display: flex;
  align-items: center;
}

.chat-text-textarea textarea {
  background-color: #FFFFFF;
  border: none;
  min-height: 31px !important;
  /* height: 38px; */
}

.chat-text-textarea textarea::-webkit-scrollbar {
  width: 3px;
}

.chat-text-textarea textarea::-webkit-scrollbar-thumb {
  background-color: #f2f2f2;
}

.chat-text-textarea {
  /* border: 2px solid #1F64FF; */
  border-left: none;
  border-right: 1px solid #FFFFFF;
  height: var(--a);
  width: calc(100%);
}

.onceClassName {
  border-top-left-radius: 0 !important;
}

.onceClassNameRight {
  border-top-right-radius: 0 !important;
}

.chat-select-aiName {
  width: 136px;
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

.ai-btn-list {
  border: none;
  font-size: 14px;
  padding: 8px 12px;
  background-color: #FFFFFF;
  text-align: center;
  margin-left: 10px;
  position: relative;
}

.upload-demo-chat {
  position: absolute;
  bottom: calc(var(--a) + 10px);
  right: 90px;
}

.upload-demo-chat-on {
  bottom: calc(90px + var(--a));
}

.draw_image-class_dark .el-dialog {
  border-radius: 4px;
  top: 50%;
  left: 50%;
  transform: translateY(-50%) translateX(-50%);
  /* max-height: 800px;
  min-height: 500px; */
  background-color: transparent;
  box-shadow: 0 0 0 transparent;
  margin: 0 !important;
  display: flex;
  justify-content: center;
  /* width: auto; */
}

.draw_image-class_dark .el-dialog__headerbtn {
  display: none;
}

.draw_image-class_dark .el-dialog__header {
  display: none;
}

.draw_image-class_dark .el-dialog__body {
  padding: 0;
}
</style>