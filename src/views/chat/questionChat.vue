<template>
  <div
    style="
      width: 100%;
      height: 100%;
      display: flex;
      position: relative;
      background-color: #f1f2f5;
      overflow-x: hidden;
    "
  >
    <div
      class="content"
      :style="
        isShowRightNav
          ? 'width: calc(100% - 242px);margin-left: 242px;'
          : 'width: calc(100%);margin-left: 5px;'
      "
    >
      <GoBackNew style="margin-left: 10px"></GoBackNew>

      <div class="cg-chat-content" ref="wrap">
        <div id="chatCont" style="overflow: auto; height: 100%">
          <div class="questionRole">
            <div :class="'head roleBg_' + applicationCenterId">
              <div>{{ roleData.titleOne }}</div>
            </div>
            <div class="title">{{ roleData.title }}</div>
            <div class="text">
              {{ roleData.content }}
            </div>
            <div class="btn" @click="$router.go(-1)">
              <img
                src="https://umi-intelligence.oss-cn-shenzhen.aliyuncs.com/xcx/com/message_center/Frame@2x.png"
                alt=""
              />
              <div>切换提示词</div>
            </div>
          </div>
          <!-- 文字 -->
          <div v-for="(item, index) in chatList" :key="index">
            <div>
              <!-- 左侧模板 -->
              <div class="cg-chat-left" v-if="item.role == 'assistant'">
                <!-- 多选框 -->
                <!-- <el-checkbox v-if="isShowChecked" v-model="item.checked" style="margin-right: 18px;margin-top: 6px;" @change="changeSendAnswer(item)"></el-checkbox> -->
                <div style="display: flex; width: 100%">
                  <div class="cg-user-pic cg-right" v-if="chat_type == 1004">
                    <img
                      src="../../assets/images/Frame-logo.jpg"
                      alt=""
                      style="width: 25px; height: 25px"
                    />
                  </div>
                  <div class="cg-user-pic cg-right" v-else-if="chat_type == 4">
                    <img
                      src="../../assets/img/logo3.png"
                      alt=""
                      style="width: 25px; height: 25px"
                    />
                  </div>
                  <div class="cg-user-pic cg-right" v-else-if="chat_type == 5">
                    <img
                      src="../../assets/img/讯飞星火认知大模型-AI大语言模型-星火大模型-科大讯飞1.png"
                      alt=""
                      style="width: 25px; height: 25px"
                    />
                  </div>
                  <!-- glm图标 -->
                  <div class="cg-user-pic cg-right" v-else-if="chat_type == 8">
                    <img
                      :src="
                        httpUrls.ossUrl +
                        'static/picture/e70dcaf9-f3cb-40c1-99de-b739f09a7d18.png'
                      "
                      alt=""
                      style="width: 25px; height: 25px"
                    />
                  </div>
                  <div class="cg-user-pic cg-right" v-else-if="chat_type == 12">
              <img
                :src="
                  httpUrls.ossUrl +
                  'static/picture/0bd787ee-2f53-4216-b810-030f6ba2f55c.png'
                "
                alt=""
                style="width: 25px; height: 25px"
              />
            </div>
                  <div class="cg-user-pic cg-right" v-else-if="chat_type == 1003">
                    <img
                      :src="
                        httpUrls.ossUrl +
                        'static/picture/a2d95978-ce23-4206-99cd-7b51a42a4388.png'
                      "
                      alt=""
                      style="width: 35px; height: 35px"
                    />
                  </div>
                  <div class="cg-user-pic cg-right" v-else-if="chat_type == 1001">
                    <img
                      :src="
                        httpUrls.ossUrl +
                        'static/picture/b21293b8-b53c-4aab-8a5e-7eb269776839.png'
                      "
                      alt=""
                      style="width: 35px; height: 35px"
                    />
                  </div>
                  <div class="cg-user-pic cg-right" v-else>
                    <img
                      src="../../assets/img/通义1.png"
                      alt=""
                      style="width: 25px; height: 25px"
                    />
                  </div>
                  <div class="as-cont-left" >
                    <!-- 文字模式 -->
                    <div class="as_text_left">
                      <div class="cg-chatbox cg-chatbox-left">
                        <!-- 实时显示的内容/内容 -->
                        <div
                          v-if="t_timeChat != null && index == chatList.length - 1"
                          class="reply markdown-body"
                          :style="
                            !isfinishChat && index == chatList.length - 1
                              ? 'white-space: pre-wrap;'
                              : ''
                          "
                        >
                          {{ item.content }}
                        </div>
                        <div
                          v-else
                          class="reply markdown-body"
                          :style="
                            !isfinishChat && index == chatList.length - 1
                              ? 'white-space: pre-wrap;'
                              : ''
                          "
                          v-html="
                            index == chatList.length - 1 && index != 0 && !isDetailChat
                              ? replyChat
                              : item.markedContent
                          "
                        ></div>
                        <div class="comput" style="margin-top: 10px">
                          <div style="display: flex; flex-wrap: nowrap">
                            <span
                              class="put_text"
                              v-if="!isfinishChat && index == chatList.length - 1"
                              ><img
                                class="await_img"
                                src="../../assets/images/await.gif"
                                alt=""
                              />思考中，</span
                            >
                            <span class="put_text" v-if="item.timer != false"
                              ><img
                                class="await_img"
                                src="../../assets/images/Time_atack_light.png"
                                alt=""
                            /></span>
                            <!-- 回答结束时显示 -->
                            <span
                              class="put_text"
                              v-if="isfinishChat && item.timer != false"
                              >耗时:{{ item.timer }}秒</span
                            >
                            <!-- 回答中显示 -->
                            <span
                              class="put_text"
                              v-else-if="!isClickChat && index == chatList.length - 1"
                              >耗时:{{ timerChat }}秒</span
                            >
                            <!-- 回答中 -->
                            <span
                              class="put_text"
                              v-else-if="!isfinishChat && index == chatList.length - 1"
                              >耗时:{{ timerChat }}秒</span
                            >
                            <!-- 历史记录等显示 -->
                            <div class="put_text" v-if="index != chatList.length - 1">
                              总字数：{{
                                index == chatList.length - 1 &&
                                index != 0 &&
                                !isDetailChat
                                  ? replyChat.length
                                  : item.content.length
                              }}
                            </div>
                            <!-- 回答结束时显示 -->
                            <div class="put_text" v-else-if="isfinishChat">
                              总字数：{{
                                index == chatList.length - 1 &&
                                index != 0 &&
                                !isDetailChat
                                  ? replyChat.length
                                  : item.content.length
                              }}
                            </div>
                          </div>

                          <div class="help-setpon">
                            <img
                              class="help-setpon-img"
                              v-if="!item.help"
                              src="../../assets/images/helpNo.png"
                              alt=""
                              @click="showSetonHelpImg(1, true, item)"
                            />
                            <img
                              class="help-setpon-img"
                              v-if="item.help"
                              src="../../assets/images/helpYes.png"
                              alt=""
                              @click="showSetonHelpImg(1, false, item)"
                            />
                            <img
                              class="help-setpon-img"
                              v-if="!item.stepOn"
                              src="../../assets/images/stepOnNo.png"
                              alt=""
                              @click="showSetonHelpImg(2, true, item)"
                            />
                            <img
                              class="help-setpon-img"
                              v-if="item.stepOn"
                              src="../../assets/images/stepOnYes.png"
                              alt=""
                              @click="showSetonHelpImg(2, false, item)"
                            />
                            <img
                              class="cope-img"
                              src="../../assets/images/copyBlack.png"
                              @click="copyText(item.content)"
                              alt=""
                            />
                          </div>
                        </div>

                        <div class="prompt" v-if="isBtnChat">
                          当前内容为AI生成，不做任何决策使用！由此引发的一切后果，需自行承担，请知悉，已通过阿里云内容安全审核
                        </div>
                      </div>
                    </div>
                    <div class="chat_bot">
                      <span
                        class="operete_btn"
                        v-if="
                          isfinishChat &&
                          index == chatList.length - 1 &&
                          item.finish_reason == 'length'
                        "
                        @click="keepAs(1, item)"
                        >继续</span
                      >
                      <span
                        class="reset_request"
                        v-if="isfinishChat && index == chatList.length - 1"
                        @click="optimizeAnswers(item, index)"
                        >继续提问</span
                      >
                      <span
                        class="reset_request"
                        id="tinZhi"
                        v-if="!isfinishChat && index == chatList.length - 1"
                        @click="endController(item.session_code)"
                      >
                        <i class="el-icon-remove-outline"></i>
                        停止回答
                      </span>
                      <span
                        class="reset_request"
                        v-if="
                          !isClickChat && isfinishChat && index == chatList.length - 1
                        "
                        @click="resetController"
                      >
                        <i class="el-icon-chat-dot-round" style="font-size: 16px"></i>
                        重新回答
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <!-- 右侧模板 -->
              <div
                :class="
                  isShowChecked ? 'cg-chat-right' : 'cg-chat-right cg-chat-right-on'
                "
                v-if="item.role == 'user'"
                style="justify-content: flex-start"
              >
                <div class="as-cont-right">
                  <img
                    class="cg-user-pic cg-left"
                    :src="httpUrls.ossUrl + loginInfo.avatar_url"
                    alt=""
                  />
                  <div class="as_text_right">
                    <div class="cg-chatbox cg-chatbox-right">
                      <span
                        class="reply"
                        style="display: block; margin-bottom: 10px"
                        v-html="item.content"
                      ></span>
                      <img
                        v-if="item.images != null && item.images.length > 0"
                        :src="httpUrls.ossUrl + item.images[0]"
                        alt=""
                        style="width: 300px; cursor: zoom-in"
                        @click="
                          (showImagesVisible = true), (chatimageUrl = item.images[0])
                        "
                      />
                      <img
                        class="img"
                        src="../../assets/images/copyWrite.png"
                        alt=""
                        @click="copyText(item.content)"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- 账户没钱了 -->
          <div class="cg-chat-left" v-if="!isuser">
            <div class="cg-user-pic cg-right" v-if="chat_type == 1004">
              <img
                src="../../assets/images/Frame-logo.jpg"
                alt=""
                style="width: 25px; height: 25px"
              />
            </div>
            <div class="cg-user-pic cg-right" v-else-if="chat_type == 4">
              <img
                src="../../assets/img/logo3.png"
                alt=""
                style="width: 25px; height: 25px"
              />
            </div>
            <div class="cg-user-pic cg-right" v-else-if="chat_type == 5">
              <img
                src="../../assets/img/讯飞星火认知大模型-AI大语言模型-星火大模型-科大讯飞1.png"
                alt=""
                style="width: 25px; height: 25px"
              />
            </div>
            <!-- glm图标 -->
            <div class="cg-user-pic cg-right" v-else-if="chat_type == 8">
              <img
                :src="
                  httpUrls.ossUrl +
                  'static/picture/e70dcaf9-f3cb-40c1-99de-b739f09a7d18.png'
                "
                alt=""
                style="width: 25px; height: 25px"
              />
            </div>
            <div class="cg-user-pic cg-right" v-else-if="chat_type == 12">
              <img
                :src="
                  httpUrls.ossUrl +
                  'static/picture/0bd787ee-2f53-4216-b810-030f6ba2f55c.png'
                "
                alt=""
                style="width: 25px; height: 25px"
              />
            </div>
            <div class="cg-user-pic cg-right" v-else-if="chat_type == 1000">
              <img
                :src="
                  httpUrls.ossUrl +
                  'static/picture/a2d95978-ce23-4206-99cd-7b51a42a4388.png'
                "
                alt=""
                style="width: 35px; height: 35px"
              />
            </div>
            <div class="cg-user-pic cg-right" v-else-if="chat_type == 1001">
              <img
                :src="
                  httpUrls.ossUrl +
                  'static/picture/b21293b8-b53c-4aab-8a5e-7eb269776839.png'
                "
                alt=""
                style="width: 35px; height: 35px"
              />
            </div>
            <div class="cg-user-pic cg-right" v-else>
              <img
                src="../../assets/img/通义1.png"
                alt=""
                style="width: 25px; height: 25px"
              />
            </div>
            <div class="as-cont-left 123">
              <div class="as_text_left">
                <div class="cg-chatbox cg-chatbox-left">
                  <div class="left_tip">{{ queryErrorMsg }}</div>
                  <div
                    style="
                      margin-top: 10px;
                      display: flex;
                      justify-content: space-between;
                    "
                  >
                    <el-button
                      style="
                        background-color: #ff9b17;
                        color: #ffffff;
                        border-radius: 4px;
                        padding: 6px 60px;
                      "
                      @click="$refs.Pay.PayVisible = true"
                      >开通VIP</el-button
                    >
                    <!-- <el-button type="primary" style="background-color: #1F64FF;border-radius: 4px;padding: 6px 60px;" @click="$router.push('/member/Member')">购买流量包</el-button> -->
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- 屏蔽词 -->
          <div class="cg-chat-left" v-if="isFoulLanguage">
            <div class="cg-user-pic cg-right" v-if="chat_type == 1004">
              <img
                src="../../assets/images/Frame-logo.jpg"
                alt=""
                style="width: 25px; height: 25px"
              />
            </div>
            <div class="cg-user-pic cg-right" v-else-if="chat_type == 4">
              <img
                src="../../assets/img/logo3.png"
                alt=""
                style="width: 25px; height: 25px"
              />
            </div>
            <div class="cg-user-pic cg-right" v-else-if="chat_type == 5">
              <img
                src="../../assets/img/讯飞星火认知大模型-AI大语言模型-星火大模型-科大讯飞1.png"
                alt=""
                style="width: 25px; height: 25px"
              />
            </div>
            <!-- glm图标 -->
            <div class="cg-user-pic cg-right" v-else-if="chat_type == 8">
              <img
                :src="
                  httpUrls.ossUrl +
                  'static/picture/e70dcaf9-f3cb-40c1-99de-b739f09a7d18.png'
                "
                alt=""
                style="width: 25px; height: 25px"
              />
            </div>
            <div class="cg-user-pic cg-right" v-else-if="chat_type == 12">
              <img
                :src="
                  httpUrls.ossUrl +
                  'static/picture/0bd787ee-2f53-4216-b810-030f6ba2f55c.png'
                "
                alt=""
                style="width: 25px; height: 25px"
              />
            </div>
            <div class="cg-user-pic cg-right" v-else-if="chat_type == 1003">
              <img
                :src="
                  httpUrls.ossUrl +
                  'static/picture/a2d95978-ce23-4206-99cd-7b51a42a4388.png'
                "
                alt=""
                style="width: 35px; height: 35px"
              />
            </div>
            <div class="cg-user-pic cg-right" v-else-if="chat_type == 1001">
              <img
                :src="
                  httpUrls.ossUrl +
                  'static/picture/b21293b8-b53c-4aab-8a5e-7eb269776839.png'
                "
                alt=""
                style="width: 35px; height: 35px"
              />
            </div>
            <div class="cg-user-pic cg-right" v-else>
              <img
                src="../../assets/img/通义1.png"
                alt=""
                style="width: 25px; height: 25px"
              />
            </div>
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
            <div class="cg-chat-left" v-if="isTimeChat" style="margin-bottom: 20px">
              <div class="cg-user-pic cg-right" v-if="chat_type == 1004">
                <img
                  src="../../assets/images/Frame-logo.jpg"
                  alt=""
                  style="width: 25px; height: 25px"
                />
              </div>
              <div class="cg-user-pic cg-right" v-else-if="chat_type == 4">
                <img
                  src="../../assets/img/logo3.png"
                  alt=""
                  style="width: 25px; height: 25px"
                />
              </div>
              <div class="cg-user-pic cg-right" v-else-if="chat_type == 5">
                <img
                  src="../../assets/img/讯飞星火认知大模型-AI大语言模型-星火大模型-科大讯飞1.png"
                  alt=""
                  style="width: 25px; height: 25px"
                />
              </div>
              <!-- glm图标 -->
              <div class="cg-user-pic cg-right" v-else-if="chat_type == 8">
                <img
                  :src="
                    httpUrls.ossUrl +
                    'static/picture/e70dcaf9-f3cb-40c1-99de-b739f09a7d18.png'
                  "
                  alt=""
                  style="width: 25px; height: 25px"
                />
              </div>
              <div class="cg-user-pic cg-right" v-else-if="chat_type == 12">
              <img
                :src="
                  httpUrls.ossUrl +
                  'static/picture/0bd787ee-2f53-4216-b810-030f6ba2f55c.png'
                "
                alt=""
                style="width: 25px; height: 25px"
              />
            </div>
              <div class="cg-user-pic cg-right" v-else-if="chat_type == 1003">
                <img
                  :src="
                    httpUrls.ossUrl +
                    'static/picture/a2d95978-ce23-4206-99cd-7b51a42a4388.png'
                  "
                  alt=""
                  style="width: 35px; height: 35px"
                />
              </div>
              <div class="cg-user-pic cg-right" v-else-if="chat_type == 1001">
                <img
                  :src="
                    httpUrls.ossUrl +
                    'static/picture/b21293b8-b53c-4aab-8a5e-7eb269776839.png'
                  "
                  alt=""
                  style="width: 35px; height: 35px"
                />
              </div>
              <div class="cg-user-pic cg-right" v-else>
                <img
                  src="../../assets/img/通义1.png"
                  alt=""
                  style="width: 25px; height: 25px"
                />
              </div>
              <div class="as-cont-left">
                <div class="as_text_left">
                  <div class="cg-chatbox cg-chatbox-left">
                    <div class="comput" style="justify-content: flex-start">
                      <span class="put_text"
                        ><img
                          class="await_img"
                          src="../../assets/images/await.gif"
                          alt=""
                        />思考中，</span
                      >
                      <span class="put_text">耗时:{{ timerChat }}秒</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <span
              class="reset_request query-reset_request"
              v-if="isTimeChat"
              @click="endController('', false)"
            >
              <i class="el-icon-remove-outline"></i>
              停止回答
            </span>
          </div>
        </div>
      </div>

      <div class="footer_cont">
        <div class="btn_cont">
          <div class="chat_cont">
            <el-cascader
              size="small"
              v-model="chat_value"
              :options="options"
              @change="handleChange"
              @visible-change="visibleChange"
            >
            </el-cascader>
          </div>
          <div class="chat_new" @click="resetNewChat()">
            <i class="el-icon-plus" style="margin-right: 5px"></i>创建新会话
          </div>
        </div>
        <div class="cont">
          <div
            :class="
              isSahowUploadPicture ? 'footer-inp_img footer-inp_img-on' : 'footer-inp_img'
            "
          >
            <el-input
              resize="none"
              :style="{ '--a': textareaHeight }"
              :class="
                isShowTemplateSelte
                  ? 'onceClassNameRight chat-text-textarea'
                  : 'chat-text-textarea'
              "
              type="textarea"
              :autosize="{ minRows: 1, maxRows: 6 }"
              placeholder="在此输入您想了解的内容，Shift+Enter换行，Enter发送"
              v-model="sendValue"
              @input="changeSendValue"
              @keyup.enter.native="(event) => handleKeyUp(event)"
            >
            </el-input>
          </div>

          <div class="textarea-btn">
            <div class="mask" style="justify-content: flex-end">
              <el-button
                class="send_img"
                style="height: 32px; width: 70px"
                type="primary"
                @click="isBtnChat ? sendMsg() : sendMsg2()"
                >发送</el-button
              >
            </div>
          </div>

          <div class="association" v-if="isShowassociation" style="z-index: 5">
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
      <el-dialog :visible.sync="supplyVisible" width="500px">
        <div class="supply_cont">
          <el-input
            type="textarea"
            resize="none"
            :rows="3"
            placeholder="请输入您要提问的内容"
            v-model="sendValue"
          ></el-input>
        </div>

        <span slot="footer" class="chat-dialog-footer" @click="sendMsg('reset')">
          发送
        </span>
      </el-dialog>

      <!-- 注册组件 -->
      <Register ref="Register"></Register>
    </div>
    <right-nav
      :updataRightList="updataRightList"
      :sessionRightNavCode="sessionRightNavCode"
      @updatachatlist="updataChatList"
      @undatename="undateName"
      :randomStr="randomStr"
      @resetnewchat="resetNewChat"
      @isshowrightsidbar="isShowRightSidbar"
    ></right-nav>
    <el-dialog class="draw_image-class_dark" :visible.sync="showImagesVisible">
      <img
        :src="httpUrls.ossUrl + chatimageUrl"
        alt=""
        style="max-height: 800px; min-height: 500px; cursor: zoom-out"
        @click="showImagesVisible = false"
      />
    </el-dialog>
    <pay ref="Pay"></pay>
  </div>
</template>

<script>
import httpUrls from "../../api/requestURL";
import {
  creatChat,
  chatDetail,
  creatDraw,
  questionSetRecommend,
  submitFootprint,
  matchContextAssistant,
} from "../../api/chatMG";
import {
  recommend,
  chatLikes,
  promptsRecommend,
  getOneQuestion,
} from "../../api/prompts";
import TemplateSelect from "../../components/dialog/templateSelect";
import Register from "../../components/register";
import rightNav from "../../components/rightNav";

import { mapGetters } from "vuex";

import { marked } from "marked";
import hljs from "highlight.js";

import pay from "../../components/pay";
import { textDecoder, arr2str } from "../../utils/download";
import GoBackNew from "../../components/goBack";
export default {
  name: "chat",
  data() {
    return {
      roleData: {},
      capacityData: [
        {
          title: "对话模型",
          path: "/workset/worksetNav",
        },
        {
          title: "优选能力",
          path: "/index",
        },
        {
          title: "绘画模型",
          path: "/workset/worksetNav",
        },
        {
          title: "AI工具集",
          path: "/workset/worksetNav",
        },
        {
          title: "AI超级能力",
          path: "/convert/index",
        },
        {
          title: "AI资讯",
          path: "/information/information?ification=fun",
        },
        {
          title: "AI实验室",
          path: "/chataboratory/laboratoryChat?value=0",
        },
        {
          title: "AI语音合成",
          path: "/workset/voiceChat",
        },
      ], //能力数组
      chat_value: ["1004", "umi-pro-4k"],
      hideUpload: false,
      options: [
        {
          value: "4",
          label: "文心一言",
          children: [
            {
              value: "ernie-speed-128k",
              label: "ernie-speed-128k（免费）",
            },
            {
              value: "ernie-4.0-8k-latest",
              label: "ernie-4.0-8k-latest",
            },
            {
              value: "ernie-3.5-128k",
              label: "ernie-3.5-128k",
            },
            
          ],
        },

        {
          value: "10",
          label: "通义千问",
          children: [
            {
              value: "qwen-turbo",
              label: "qwen-turbo（免费）",
            },
            {
              value: "qwen-plus",
              label: "qwen-plus",
            },
            {
              value: "qwen-max-longcontext",
              label: "qwen-max-longcontext",
            }
          ],
        },
        {
          value: "5",
          label: "讯飞星火",
          children: [
            {
              value: "v1.1",
              label: "v1.1（免费）",
            },
            {
              value: "v3.5",
              label: "v3.5",
            },
            {
              value: "v4.0",
              label: "v4.0",
            },
          ],
        },

        {
          value: "8",
          label: "chatGLM",
          children: [
          {
              value: "glm-4-flash",
              label: "glm-4-flash（免费）",
            },
            {
              value: "glm-4-airx",
              label: "glm-4-airx",
            },
            {
              value: "glm-4-air",
              label: "glm-4-air",
            },
            
          ],
        },
        {
          value: "12",
          label: "360智脑",
          children: [
            {
              value: "360gpt-turbo",
              label: "360gpt-turbo（免费）",
            },
            {
              value: "360GPT_S2_V9",
              label: "360GPT_S2_V9",
            },
            {
              value: "360gpt2-pro",
              label: "360gpt2-pro",
            },
            
          ],
        },

        {
          value: "1001",
          label: "腾讯混元",
          children: [
            {
              value: "hunyuan-lite",
              label: "hunyuan-lite（免费）",
            },
            {
              value: "hunyuan-standard",
              label: "hunyuan-standard",
            },
            {
              value: "hunyuan-standard-256K",
              label: "hunyuan-standard-256K",
            },
            {
              value: "hunyuan-pro",
              label: "hunyuan-pro",
            }
          ],
        },
        {
          value: "1003",
          label: "豆包",
          children: [
            {
              value: "Doubao-lite-32k",
              label: "Doubao-lite-32k（免费）",
            },
            {
              value: "Doubao-lite-128k",
              label: "Doubao-lite-128k（免费）",
            }
          ],
        },
        {
          value: "1004",
          label: "无忧秘书",
          children: [
            {
              value: "umi-pro-4k",
              label: "umi-pro-4k（免费）",
            },
            {
              value: "umi-pro-32k",
              label: "umi-pro-32k",
            },
            {
              value: "umi-pro-128k",
              label: "umi-pro-128k",
            }

          ],
        }
      ],
      httpUrls,
      isSahowUploadPicture: false,
      isShowRightNav: true,
      chatimageUrl: "",
      showImagesVisible: false,
      blueprintReadingFile: {
        image: null,
        image_name: null,
        oss_dir: "static",
        cate: "AI_chat-picture",
      },
      
      AINameDisabled: false,
      // chatText: 'AI35',
      // action_type: '1',
      // activeName: '0',
      chat_type: 1004, // ai35: 0; ai40: 1
      AIname: 1004, // ai id
      sendValue: "", // 问题的内容
      oldSendValue: "", // 临时保存上一次的问题
      isShow: false, // 快速提问
      // isPay: true,
      replyChat: "", // 实时回答 / 35

      timerChat: 0, // 定时器的时间 / 35

      t_timeChat: null, // 定时器

      isTimeChat: false, // 开启获取中对话框 / 35

      // isfinish: true,
      isfinishChat: true, // 完成打字效果 / 35

      isBtnChat: true, // 防止重新发送

      supplyVisible: false, // 补充对话
      supplyValue: "", // 补充对话的问题
      isDetailChat: false, // 显示会话内容 / 35

      qsList: {}, // 热词

      chatList: [], //3.5数据

      isuser: true, //使用次数是否用完
      isShowTemplateSelte: false, // 查询模板
      isShowTemplateChat: true, // 热词推荐

      textAreaLength: "2000", // 问题长度
      association: "", // 是否关联上下文
      isShowassociation: false, // 是否关联上下文
      isShowChecked: false, // 复选框
      ordeAIList: [], // 关联上下文的列表
      // showRegister: false,
      updataRightList: null, // ai的id，=chat_type
      promptsId: null, // 模板指令的id
      sessionRightNavCode: "", // 聊天组的唯一id，用于刷新历史会话
      isClickChat: false, // 点击历史会话打开优化本次回答
      chatItem: {}, // 用于存放优化会话的临时对象
      randomStr: 0, // 随机数，刷新列表
      msgCode: "", // 当前会话的唯一id

      controllerChat: null, // 用于终止fetch请求 / 35

      startNewChat35: false, // 开启新会话35

      isScrollTop: false, // 滚动条的变化
      chatContScroll: "", // 滚动条距离顶部的高度
      oldScrollTop: 0,
      textareaHeight: "38px", // 发送框的同一高度
      queryErrorMsg: "", // 会员次数用尽的提示
      isFoulLanguage: false, // 用户问题是否出现屏蔽词，问题返回时

      // 会话消耗的token和积分
      tokenNumberThreeFive: {
        completionTokens: 0, // 下行token
        promptTokens: 0, // 上行token
        integral: 0, // 积分
        totalTokens: 0, // 总tokes
      },
      tokenNumberFourZero: {
        completionTokens: 0,
        promptTokens: 0,
        integral: 0,
        totalTokens: 0,
      },
      tokenNumberYiyan: {
        completionTokens: 0,
        promptTokens: 0,
        integral: 0,
        totalTokens: 0,
      },
      tokenNumberXunfei: {
        completionTokens: 0,
        promptTokens: 0,
        integral: 0,
        totalTokens: 0,
      },
    };
  },

  // 注册组件
  components: {
    Register,
    TemplateSelect,
    rightNav,
    pay,
    GoBackNew,
  },
  computed: {
    ...mapGetters([
      "userInfoData",
      "contactService",
      "isShowNotice",
      "applicationCenterId",
    ]),
  },

  props: {
    item: {
      type: String,
      default: "",
    },
  },

  watch: {
    sendValue: {
      deep: true,
      handler() {
        setTimeout(() => {
          this.textareaHeight =
            document.getElementsByClassName("chat-text-textarea")[0].childNodes[0]
              .clientHeight + "px";
        }, 10);
      },
    },
    isTimeChat: {
      deep: true,
      handler() {
        if (this.isTimeChat) {
          this.AINameDisabled = true;
        } else {
          this.AINameDisabled = false;
        }
      },
    },

    // 用户信息发生改变，重置页面信息
    userInfoData: {
      deep: true,
      handler() {
        this.randomStr = Math.random();
        this.chatList = [];
        this.queryQuestionSetRecommend();
      },
    },
    AIname: {
      deep: true,
      handler() {
        // 切换不同的ai时重置页面
        this.isuser = true;
        this.isShowassociation = false;
        this.isShowChecked = false;
        this.chatList.forEach((v) => {
          v.checked = false;
        });
        this.association = "";

        // if (this.AIname == 0) {
        this.textAreaLength = "2000";
        this.$store.dispatch("user/changeChatListLength", this.chatList.length);
        // }
        this.chat_type = this.AIname;
        // console.log("触发", this.chat_type);
        switch (this.chat_type) {
          case 4:
            //文心一言
            this.chat_value = ["4", "ernie-4.0-8k-latest"];
            break;
          case 10:
            //通义千问
            this.chat_value = ["10", "qwen-turbo"];
            break;
          case 5:
            //讯飞星火
            this.chat_value = ["5", "v1.1"];
            break;
          case 8:
            //chatGLM
            this.chat_value = ["8", "glm-4-airx"];
            break;
          case 12:
            //360
            this.chat_value = ["12", "360GPT_S2_V9"];
            break;
          case 1001:
            //腾讯混元
            this.chat_value = ["1001", "hunyuan-lite"];
            break;
          case 1003:
            //豆包
            this.chat_value = ["1003", "Doubao-lite-32k"];
            break;
          case 1004:
            //无忧秘书
            this.chat_value = ["1004", "umi-pro-4k"];
            break;
          default:
            break;
        }
        console.log(this.chat_value, "级联选择");
        this.chatList = [];
        this.$store.dispatch("id/setAIChatname", this.AIname);
        this.updataRightList = Number(this.chat_type);
      },
    },
    isShowassociation: {
      deep: true,
      handler() {
        if (this.isShowassociation && this.association == "") {
          this.isBtnChat = false;
        }
      },
    },
    association: {
      deep: true,
      handler() {
        if (this.association != "") {
          this.isBtnChat = true;
        }
        if (Number(this.association) == 2) {
          this.isClickChat = false;
          clearInterval(this.t_timeChat);
          this.chatList = [];
          this.$store.dispatch("user/changeChatListLength", this.chatList.length);
          this.sendMsg();
          this.isShowChecked = false;
          this.isShowassociation = false;
          this.isClickChat = false;
        } else if (Number(this.association == 1)) {
          // this.$message.success('请勾选您要关联上文的内容')
          // this.isShowChecked = true
          this.sendMsg();
        }
      },
    },
    chatList: {
      deep: true,
      handler() {
        if (this.chatList.length == 0) {
          this.startNewChat35 = false;
        } else {
          this.startNewChat35 = true;
        }
      },
    },
  },

  created() {
    this.updataRightList = Number(this.chat_type);
    this.loginInfo = JSON.parse(localStorage.getItem("userInfo"));

    this.$root.Bus.$on("delChat", (value) => {
      // 清空历史会话
      this.chatList = [];
      this.$store.dispatch("user/changeChatListLength", this.chatList.length);
      this.isTimeChat = false;
    });
    localStorage.setItem("session_code", "");
    this.queryQuestionSetRecommend();
  },

  mounted() {
    if (
      this.$route.query.parent_user_code != undefined &&
      this.$route.query.parent_user_code != "undefined"
    ) {
      // this.$refs.Register.registerVisible = true
      localStorage.setItem("parent_user_code", this.$route.query.parent_user_code);
      localStorage.setItem("parent_user_role", this.$route.query.role);
      sessionStorage.setItem("applicationId", this.$route.query.applyId);
      this.$store.dispatch(
        "app/changeApplicationCenterId",
        Number(this.$route.query.applyId)
      );
      //给默认问题集
      // this.defaultSelset("mounted");
      //获取人物数据
      this.initQuestion();
    }
    // document.title =
    //   httpUrls.name +
    //   "是一款人工智能聊天机器-能进行AI绘画-适用于多个场景进行聊天-商务合作-源码定制等";
    // let metaKeywords = document.createElement("meta");
    // metaKeywords.id = "chat-meta-keywords";
    // metaKeywords.name = "keywords";
    // metaKeywords.content =
    //   httpUrls.name +
    //   ",Ai聊天,ChatGpt3.5,ChatGpt4.0中文版,OpenAi,chatgpt国内版,AI智能软件,源码定制,API接口GPT4.0,API接口百度AI绘画";
    // document.getElementsByTagName("head")[0].appendChild(metaKeywords);

    // let metaDescription = document.createElement("meta");
    // metaDescription.id = "chat-meta-description";
    // metaDescription.name = "description";
    // metaDescription.content =
    //   httpUrls.name +
    //   "是人工智能聊天工具,相当于国内版的chatgpt4.0.拥有语言理解能力和文本生成能力,能撰写视频脚本,文案,翻译,代码,写论文邮件,诗词歌赋等任务.职场上升职.写工作报告,企业管理,市场营销等能助你一臂之力.它上知天文下知地理,在任何场景都能和你像人类一样进行交流,互动.";
    // document.getElementsByTagName("head")[0].appendChild(metaDescription);
  },

  // 卸载前
  beforeDestroy() {
    // document.getElementById("chat-meta-keywords").remove();
    // document.getElementById("chat-meta-description").remove();
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
    // 去掉空格
    sliceTitle(title) {
      let tit = title.replace(/\s*/g, "");
      tit = tit.slice(0, 1);
      return tit;
    },
    initQuestion() {
      let moduleId = this.$route.query.id;
      let question_id = this.$route.query.question;
      let requestData = `&module_id=${moduleId}&question_id=${question_id}`;
      getOneQuestion(requestData)
        .then((res) => {
          res.data.forEach((v) => {
            v.titleOne = this.sliceTitle(v.title);
          });
          this.roleData = res.data[0];
        })
        .catch((err) => {
          this.$message.error("服务器异常");
        });
    },
    visibleChange() {
      //修改级联选择器高度
      const selectDropDownNode = document.getElementsByClassName("el-cascader-panel");
      const selectDom = document.getElementsByClassName("el-cascader-menu__wrap");
      for (let i = 0; i < selectDropDownNode.length; i++) {
        selectDropDownNode[i].style.height = "260px";
        selectDom[i].style.height = "260px";
      }
    },
    //级联改变
    handleChange(val) {
      this.chat_type = val[0];
      // console.log(this.chat_type)
      this.updataRightList = Number(this.chat_type);
    },
    //能力跳转
    handleCapacity(val) {
      // console.log(val);
      if (val.path == "/workset/worksetNav") {
        if (val.title == "AI工具集") {
          this.$store.dispatch("app/changeworksetLabel", "图片处理");
          this.$router.push("/workset/worksetNav");
        } else {
          this.$store.dispatch("app/changeworksetLabel", val.title);
          this.$router.push("/workset/worksetNav");
        }
      } else {
        this.$router.push(val.path);
      }
    },
    isShowRightSidbar(bool) {
      this.isShowRightNav = bool;
    },

    undateName(aiId) {
      this.AIname = aiId;
    },
    updataChatList(code) {
      this.isuser = true;
      this.isShowassociation = false;
      this.isShowChecked = false;
      this.chatList.forEach((v) => {
        v.checked = false;
      });

      this.sendValue = "";
      this.association = "";
      this.isClickChat = true;
      this.chatContScroll = "";
      // console.log(this.chat_type);
      this.isShowTemplateChat = false;
      if (!this.isfinishChat) {
        try {
          this.controllerChat.abort();
        } catch (error) {}
        clearInterval(this.t_timeChat);
        this.isfinishChat = true;
        this.isBtnChat = true;
      }
      // }
      this.getDetail(code);
    },

    // 获取会话详情
    getDetail(code) {
      // console.log(code,'会话详情')
      this.isDetailChat = true;
      this.isTimeChat = false;
      this.isfinishChat = true;
      this.chatList = [];
      this.isShowTemplateChat = false;
      this.isFoulLanguage = false;
      this.ordeAIList = [];
      const renderer = new marked.Renderer();
      // 重写代码块渲染方法，使用highlight.js进行代码高亮
      renderer.code = (code, language) => {
        const validLanguage = hljs.getLanguage(language) ? language : "plaintext";
        const highlightedCode = hljs.highlight(validLanguage, code).value;
        return `<pre><code class="hljs ${validLanguage}">${highlightedCode}</code></pre>`;
      };
      // console.log(code)
      chatDetail(code)
        .then((res) => {
          if (res.code == 20000) {
            let arr = res.data;
            arr.forEach((item, index) => {
              localStorage.setItem("session_code", code);
              localStorage.setItem("chat_group_code", item.chat_group_code);
              this.chatList.push({
                ...item,
                help: item.is_likes == 1 ? true : false,
                stepOn: item.is_likes == 2 ? true : false,
                markedContent: marked(item.content, { renderer }),
                id: this.chatList.length,
                timer: false,
              });
              this.$store.dispatch("user/changeChatListLength", this.chatList.length);
            });
            this.$nextTick(() => {
              let pres = document.getElementsByTagName("pre");
              for (let a = 0; a < pres.length; a++) {
                let spans = document.createElement("span");
                spans.setAttribute("class", "copy-code-button");
                spans.addEventListener("click", (event) => {
                  var input = document.createElement("textarea"); // 创建input对象
                  input.value = event.target.previousElementSibling.innerText; // 设置复制内容
                  document.body.appendChild(input); // 添加临时实例
                  input.select(); // 选择实例内容
                  document.execCommand("Copy"); // 执行复制
                  document.body.removeChild(input); // 删除临时实例
                  this.$message.success("复制成功！");
                });
                spans.setAttribute("click", "copyCodeButton");
                pres[a].appendChild(spans);
              }
            });
            this.isShow = true;
            this.isScrollTop = false;
            this.toBottom(false);
          } else {
            this.$message.error(res.msg);
          }
        })
        .catch((err) => {
          this.$message.error("获取会话失败！");
        });
    },

    // 优化回答
    optimizeAnswers(item, index) {
      if (!this.isfinishChat) {
        this.$message("当前问题还没回答完毕，请稍后再提问");
        return;
      }
      this.supplyVisible = true;
      this.chatItem = { ...item, chatIndex: index };
      this.supplyValue = "";
    },

    // 开启新会话
    resetNewChat(aiId) {
      // if (aiId == 0) {
      if (this.chatList.length == 0) return;
      this.chatList = [];
      this.isShowTemplateChat = true;
      this.$store.dispatch("user/changeChatListLength", 0);
      localStorage.setItem("session_code", "");
      localStorage.setItem("chat_group_code", "");
      // }
      this.isuser = true;
      this.endController("", false); // 终止回答
      this.randomStr = Math.random();
      this.isShowChecked = false;
      this.isShowassociation = false;
      this.isClickChat = false;
      this.msgCode = "";
      // if (aiId == 0) {
      this.isTimeChat = false;
      // }
      this.sendValue = "";
    },

    resetQuest(item) {
      if (!this.isfinishChat) {
        this.$message("当前问题还没回答完毕，请稍后再提问");
        return;
      }
      this.sendValue = item.content;
      this.endController("", false);
      this.vipSend("reset");
    },

    //发送信息
    sendMsg(bool = "") {
      this.loginInfo = JSON.parse(localStorage.getItem("userInfo"));
      this.chatContScroll = "";
      // 重新回答

      if (this.sendValue == "" || this.sendValue.replace(/\s*/g, "") == "") {
        this.$message({
          type: "error",
          message: "请输入您要发送内容",
        });
        return false;
      }
      // 判断输入的文字和选中上下文的文字是否超过限制
      let msgList = "";
      this.ordeAIList.forEach((v) => {
        msgList += v.content;
      });
      msgList += this.sendValue;
      this.isuser = true;
      matchContextAssistant({
        company_id: this.$route.query.question,
        clerk_id: this.$route.query.question,
        question_content: this.sendValue,
      }).then((res) => {
        let val = null;
        let title = /^AI/.test(this.roleData.title.trim())
          ? this.roleData.title
          : "AI " + this.roleData.title.trim();
        val = {
          chat_type: this.chat_type,
          scenario_type: "question",
          session_code: bool == "true" ? localStorage.getItem("session_code") : "",
          chat_group_code: "",
          model: this.chat_value[1],
          msg_list: JSON.stringify([
            {
              role: "user",
              content: title + " " + this.roleData.content + this.sendValue,
              covert_content:
                "人格设定：你是xxxx公司开发的umibot。" + res.data.prompt,
            },
          ]),
        };
        this.vipSend(bool, val);
      });
    },

    // 4.0信息发送
    async vipSend(bool = "", val) {
      // 重试/优化/重新提问等不需要关联上下文
      if (bool != "true" && bool != "reset" && bool != "toChatFouty") {
        // 是否显示关联上下文
        if (!this.isShowassociation && this.chatList.length != 0) {
          this.isShowassociation = !this.isShowassociation;
          return;
        }
        // 关联上下文的多选，此处仅用作展示
        this.chatList.forEach((v) => {
          v.checked = false;
        });
      }
      this.isFoulLanguage = false;
      this.isShowassociation = false;
      this.isShowChecked = false;
      this.supplyVisible = false;

      this.isShow = true; // 快速提问
      this.isDetailChat = false;
      this.isfinishChat = false; // 完成打字效果
      this.isBtnChat = false; // 是否允许重发
      this.replyChat = "";
      this.isShowTemplateChat = false; // 关闭热词

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
      if (month < 10) {
        month = "0" + month;
      }
      if (day < 10) {
        day = "0" + day;
      }
      if (hour < 10) {
        hour = "0" + hour;
      }
      if (minute < 10) {
        minute = "0" + minute;
      }
      if (second < 10) {
        second = "0" + second;
      }

      let date = month + "/" + day + " " + hour + "-" + minute + "-" + second;

      let sendVal = {
        // 询问者问题展示
        create_time: date,
        finish_reason: "length",
        session_code: "",
        chat_group_code: "",
        role: "user",
        images: [],
        content: this.sendValue, // 预留，对话内容的转换
        markedContent: marked("<pre><code>" + this.sendValue + "</code></pre>"),
        checked: false,
        help: false, // 点赞
        stepOn: false, // 点踩
        timer: false,
      };
      if (/<[^>]*>/i.test(sendVal.content)) {
        sendVal.content = marked(
          '<pre><code class="hljs html">' +
            sendVal.content.replace(/</g, "&lt;").replace(/>/g, "&gt;") +
            "</code></pre>"
        ); //这是处理好的代码块
      }
      // 获取当前会话列表的长度，用作右侧侧边栏的选中状态
      this.chatList.push({ ...sendVal, id: this.chatList.length }); // id：用于关联上下文时的排序，防止顺序错乱导致接口返回的信息错误
      this.$store.dispatch("user/changeChatListLength", this.chatList.length);

      this.toBottom();

      // this.isTime = true; // 思考中
      this.isTimeChat = true;
      this.replyChat = "";
      if (bool != "toChatFouty") {
        this.timerChat = 0;
        this.t_timeChat = setInterval(() => {
          this.timerChat += 1;
        }, 1000);
      }

      // 关联上下文时，拿到对应的值然后清空对应的数据
      if (Number(this.association) == 1) {
        let historyList = [];
        this.chatList.forEach((v, i) => {
          if (i != this.chatList.length - 1) {
            historyList.push({
              role: v.role,
              content: v.content,
            });
          }
        });
        val = {
          chat_type: this.chat_type,
          session_code: localStorage.getItem("session_code") || "",
          chat_group_code: "",
          model: this.chat_value[1], //AI模型参数
          scenario_type: "question",
          msg_list: JSON.stringify([
            ...historyList,
            {
              role: "user",
              content: this.sendValue,
              covert_content:
                "你是xxxx公司开发的大语言模型， 名字叫 UMI bot，言辞简洁，每次回答控制在30 个字以内，现在开始：",
              images: [],
            },
          ]),
        };
        this.ordeAIList = [];
      }
      if (Number(this.association) == 2) {
        val.session_code = "";
        this.association = "";
      }

      this.chatList.push({
        //新构造一个对话内容
        session_code: "",
        create_time: "",
        chat_group_code: "",
        finish_reason: "",
        role: "",
        content: "",
        help: false, // 点赞
        stepOn: false, // 点踩
        id: this.chatList.length,
        timer: false,
      });
      if (bool == "toChatFouty") {
        this.t_timeChat = setInterval(() => {
          this.timerChat += 1;
        }, 1000);
      }

      if (bool == "true") {
        val.msg_code = this.msgCode;
      }

      let userInfo = JSON.parse(localStorage.getItem("userInfo"));
      // 模板指令使用后要 +1
      if (this.promptsId != null) {
        promptsRecommend({ prompts_id: this.promptsId }).then(() => {
          this.promptsId = null;
        });
      }
      this.oldSendValue = this.sendValue;
      this.isClickChat = false;
      this.sendValue = "";
      this.isSahowUploadPicture = false;

      let response = null;
      let url =
        Number(this.chat_type) == 0 || Number(this.chat_type) == 1
          ? "api/chat/async_chat_session"
          : "api/chat/async_chat_completion";
      this.controllerChat = new AbortController();
      response = await fetch(httpUrls.httpUrl + url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "*/*",
          authorization: userInfo.token,
          role: userInfo.role,
          source: "pc",
        },
        body: JSON.stringify(val),
        signal: this.controllerChat.signal,
      });
      this.ordeAIList = [];

      if (Number(response.status) != 200) {
        response.json().then((res) => {
          this.codeHandleChange(res);
        });
        return;
      }
      // console.log(response, "发送问题后返回数据")

      this.sendValue = ""; // 清空发送栏内容
      const reader = response.body.getReader();

      while (true) {
        const { value, done } = await reader.read();
        if (done) {
          break;
        }
        if (value) {
          let stringStr = arr2str(value);
          let chatArr = stringStr.split("\r\n");
          this.isDetailChat = false;
          // 信息清空
          chatArr.forEach((val, index) => {
            if (val != "") {
              let res = JSON.parse(val);
              // console.log(res, "循环传递", index);
              this.talkMsgList(res);
              return;
            }
          });
        }
      }
    },

    sendMsg2() {
      if (!this.isShowassociation || this.association != "") {
        this.$message({
          type: "info",
          message: "当前问题还没回答完毕，请稍后再提问！",
        });
      } else {
        this.$message({
          type: "info",
          message: "请选择是否关联",
        });
      }
    },

    // 关联上下文的多选
    changeSendAnswer(item) {
      let a = 1;
      for (let i = 0; i < this.ordeAIList.length; i++) {
        if (
          item.create_time == this.ordeAIList[i].create_time &&
          item.content == this.ordeAIList[i].content
        ) {
          this.ordeAIList.splice(i, 1);
          i--;
          a = 0;
          break;
        } else {
          a = 1;
        }
      }
      if (a == 1) {
        this.ordeAIList.push(item);
      }
      this.$forceUpdate(); //解决点击计数器失效问题
    },

    // 内容逐字显示，每个字显示间隔为0.1秒，并识别换行符
    showReply(content) {
      this.isTimeChat = false;
      let reply = content;
      let replyArr = reply.split("");
      let replyStr = "";
      let i = 0;
      let time = setInterval(() => {
        if (i < replyArr.length) {
          // marked.parse, 预留，需删除下面的判断
          if (replyArr[i] == "\n") {
            replyStr += "\n";
          } else {
            replyStr += replyArr[i];
          }
          this.replyChat = replyStr;
          // this.reply = replyStr
          i++;
          // 定位到聊天最底部
          this.toBottom();
        } else {
          clearInterval(time);
        }
      }, 100);

      // 判断是否显示完毕
      setTimeout(() => {
        this.isfinishChat = true; // 完成打字效果
        this.isBtnChat = true;
        clearInterval(this.t_timeChat);
        this.t_timeChat = null;
      }, replyArr.length * 100);
    },

    toBottom(type = true) {
      // 定位到当前聊天地点
      this.$nextTick(() => {
        setTimeout(() => {
          var scrollTop = document.getElementById("chatCont");
          let bottom = document.getElementById("tinZhi");
          if (this.chatContScroll == "" || this.chatContScroll <= scrollTop.scrollTop) {
            scrollTop.scrollTop = scrollTop.scrollHeight;
            this.chatContScroll = scrollTop.scrollTop;
          }
        }, 200);
      });
    },

    // 重新回答
    resetController() {
      if (!this.isfinishChat) {
        this.$message("当前问题还没回答完毕，请稍后再提问");
        return;
      }
      this.sendValue = this.chatList[this.chatList.length - 2].content;
      // console.log(this.chatList[this.chatList.length - 2].content);
      this.chatList.splice(this.chatList.length - 2, 2);
      this.endController("", false);
      this.sendMsg("true");
    },

    // 终止回答
    endController(code, resetChat = true) {
      this.isfinishChat = true;
      this.isBtnChat = true;
      this.isTimeChat = false;
      try {
        this.controllerChat.abort();
      } catch (error) {}
      clearInterval(this.t_timeChat);

      this.sessionRightNavCode = code;
      if (resetChat) {
        this.chatList[this.chatList.length - 1].timer = this.timerChat;
      }
    },

    // 继续回答
    keepAs(key, item = {}) {
      if (this.supplyValue == "" || this.supplyValue.replace(/\s*/g, "") == "") {
        this.$message.error("请输入您要发送内容");
        return;
      }
      let msg = "继续";
      if (key == 2) {
        msg = this.supplyValue;
        item = this.chatItem;
      }

      let val = {
        chat_type: this.chat_type,
        action_type: 3,
        session_code: this.chatItem.session_code,
        chat_group_code: this.chatItem.chat_group_code,
        content: msg,
      };
      this.isBtnChat = false;
      this.isDetailChat = false;
      this.isfinishChat = false;
      this.replyChat = "";
      this.supplyVisible = false;
      if (this.chatItem.timer) {
        this.timerChat = this.chatItem.timer;
      } else {
        this.timerChat = 0;
      }
      this.t_timeChat = setInterval(() => {
        this.timerChat += 1;
      }, 1000);
      matchContextAssistant({
        company_id: this.$route.query.question,
        clerk_id: this.$route.query.question,
        question_content: this.sendValue,
      }).then((res) => {
        let val = null;
        val = {
          chat_type: this.chat_type,
          session_code: localStorage.getItem("session_code"),
          chat_group_code: localStorage.getItem("chat_group_code"),
          model: this.chat_value[1],
          scenario_type: "question",
          msg_list: JSON.stringify([
            { role: item.role, content: item.content },
            { role: "user", content: msg, covert_content: res.data.prompt },
          ]),
        };
        this.vipAgainSend(key, val, item);
      });
    },

    async vipAgainSend(key, valu = {}, item) {
      console.log(111223);
      let msg = "继续";
      if (key == 2) {
        msg = this.supplyValue;
      }

      let val = null;
      val = {
        chat_type: this.chat_type,
        session_code: localStorage.getItem("session_code"),
        chat_group_code: localStorage.getItem("chat_group_code"),
        msg_list: JSON.stringify([
          { role: item.role, content: item.content },
          {
            role: "user",
            content: msg,
            covert_content:
              "你是xxxx公司开发的大语言模型， 名字叫 UMI bot，言辞简洁，每次回答控制在30 个字以内，现在开始：",
          },
        ]),
      };

      let userInfo = JSON.parse(localStorage.getItem("userInfo"));
      if (key == 2) {
        this.chatList.push({
          // 询问者问题展示
          create_time: "date",
          finish_reason: "length",
          session_code: this.chatItem.session_code,
          chat_group_code: this.chatItem.chat_group_code,
          role: "user",
          content: this.supplyValue, // 预留，对话内容的转换
          markedContent: marked("<pre><code>" + this.supplyValue + "</code></pre>"),
          checked: false,
          help: false, // 点赞
          stepOn: false, // 点踩
          timer: false,
        });
        this.chatList.push({
          // 询问者问题展示
          create_time: "date",
          finish_reason: "length",
          session_code: "",
          chat_group_code: "",
          role: "assistant",
          content: "", // 预留，对话内容的转换
          markedContent: marked("<pre><code>" + this.supplyValue + "</code></pre>"),
          checked: false,
          help: false, // 点赞
          stepOn: false, // 点踩
          timer: false,
        });
        this.$store.dispatch("user/changeChatListLength", this.chatList.length);
      }

      let response = null;
      let url =
        Number(this.chat_type) == 0 || Number(this.chat_type) == 1
          ? "api/chat/async_chat_session"
          : "api/chat/async_chat_completion";
      this.controllerChat = new AbortController();
      response = await fetch(httpUrls.httpUrl + url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "*/*",
          authorization: userInfo.token,
          role: userInfo.role,
          source: "pc",
        },
        body: JSON.stringify(val),
        signal: this.controllerChat.signal,
      });

      this.ordeAIList = [];
      // 状态码的统一处理
      if (response.status != "200") {
        response.json().then((res) => {
          this.codeHandleChange(res);
        });
        return;
      }

      if (!response.ok) {
        this.$message.error(response.statusText);
        return;
      }

      this.sendValue = ""; // 清空发送栏内容
      const reader = response.body.getReader();

      while (true) {
        const { value, done } = await reader.read();
        if (done) {
          break;
        }
        if (value) {
          let stringStr = arr2str(value);
          let chatArr = stringStr.split("\r\n");
          chatArr.forEach((val) => {
            if (val != "") {
              let res = JSON.parse(val);
              console.log(res, 55621);
              this.talkMsgList(res);
              return;
            }
          });
        }
      }
    },

    // ai返回的数据处理
    talkMsgList(res) {
      // console.log("---------", res);
      /**
       * 35
       *
       */
      this.msgCode = res.msg_code;
      if (Number(res.code) == 36003) {
        this.isfinishChat = true;
        clearInterval(this.t_timeChat);
        this.t_timeChat = null;
        this.isTimeChat = false;
        this.isBtnChat = true;
        this.$message.error("关联对话必须为一问一答");
      }
      if (this.loginInfo.role == "guess") {
        this.$refs.Register.registerVisible = true;
        return;
      }
      if (Number(res.code) == 30014 || Number(res.code) == 40022) {
        // 登录
        if (this.loginInfo.role == "guess") {
          this.$refs.Register.registerVisible = true;
          return;
        }
        // 升级会员
        if (this.loginInfo.role == "user") {
          this.queryErrorMsg = res.msg;
          this.isuser = false;
          this.isfinishChat = true;
          clearInterval(this.t_timeChat);
          this.t_timeChat = null;
          this.isTimeChat = false;
          this.isBtnChat = true;
          return;
        }
      }

      // 状态码的统一处理
      if (res.code != undefined) {
        let resStatus = this.codeHandleChange(res);
        if (!resStatus) {
          return;
        }
      }
      const renderer = new marked.Renderer();
      // 重写代码块渲染方法，使用highlight.js进行代码高亮
      renderer.code = (code, language) => {
        const validLanguage = hljs.getLanguage(language) ? language : "plaintext";
        const highlightedCode = hljs.highlight(validLanguage, code).value;
        return `<pre><code class="hljs ${validLanguage}">${highlightedCode}</code></pre>`;
      };

      if (!this.isfinishChat) {
        this.isTimeChat = false;
        if (res != "" && res.content != null) {
          // console.log(res.content,'文本')
          if (this.chat_type == "10") {
            this.chatList[this.chatList.length - 1].content = res.content;
            this.chatList[this.chatList.length - 1].markedContent = marked(res.content);
            this.replyChat = marked(res.content);
          } else {
            this.chatList[this.chatList.length - 1].content =
              this.chatList[this.chatList.length - 1].content + res.content;

            this.chatList[this.chatList.length - 1].markedContent = marked(
              this.chatList[this.chatList.length - 1].content + res.content
            );
            this.replyChat = marked(
              this.chatList[this.chatList.length - 1].content + res.content
            );
          }
          // 定位到聊天最底部
          this.toBottom();
        }
        if (res.session_code != "" && res.content != null) {
          this.chatList[this.chatList.length - 1].session_code = res.session_code;
          this.chatList[this.chatList.length - 2].session_code = res.session_code;
          localStorage.setItem("session_code", res.session_code);
        }
        if (res.create_time != "" && res.create_time != null) {
          this.chatList[this.chatList.length - 1].create_time = res.create_time;
        }
        if (res.chat_group_code != "" && res.chat_group_code != null) {
          this.chatList[this.chatList.length - 1].chat_group_code = res.chat_group_code;
          this.chatList[this.chatList.length - 2].chat_group_code = res.chat_group_code;
          localStorage.setItem("chat_group_code", res.chat_group_code);
        }
        // console.log(res.finish_reason)
        if (
          res.finish_reason == "stop" ||
          res.finish_reason == 2 ||
          res.finish_reason === true
        ) {
          if (/<[^>]*>/i.test(this.chatList[this.chatList.length - 1].content)) {
            this.chatList[this.chatList.length - 1].content = marked(
              '<pre><code class="hljs html">' +
                this.chatList[this.chatList.length - 1].content
                  .replace(/</g, "&lt;")
                  .replace(/>/g, "&gt;") +
                "</code></pre>"
            ); //这是处理好的代码块
          }

          this.isfinishChat = true;
          this.isBtnChat = true;
          for (let i = 0; i < 10; i++) {
            clearInterval(this.t_timeChat);
          }
          this.t_timeChat = null;
          this.chatList[this.chatList.length - 1].finish_reason = res.finish_reason;
          this.$store.dispatch("user/changeChatListLength", this.chatList.length);
          this.chatList[this.chatList.length - 1].timer = this.timerChat;
          // this.$root.Bus.$emit('updateList', this.chat_type) // 触发左侧导航栏刷新对话内容
          this.chatList.forEach((v) => {
            v.markedContent = marked(v.content, { renderer });
          });
          this.replyChat = marked(this.replyChat, { renderer });

          this.tokenNumberThreeFive = {
            completionTokens: res.completion_tokens, // 下行token
            promptTokens: res.prompt_tokens, // 上行token
            integral: res.integral, // 积分
            totalTokens: res.total_tokens, // 总tokes
          };
          this.chatList[this.chatList.length - 1].completion_tokens =
            res.completion_tokens;
          this.chatList[this.chatList.length - 1].prompt_tokens = res.prompt_tokens;
          this.chatList[this.chatList.length - 1].integral = res.integral;
          this.chatList[this.chatList.length - 1].total_tokens = res.total_tokens;

          // 保存最近使用
          submitFootprint({
            type_name: "提示词大全",
            type_code: "chat",
            title: this.oldSendValue,
            eid: res.session_code,
          }).then((res) => {});

          this.$nextTick(() => {
            let pres = document.getElementsByTagName("pre");
            for (let a = 0; a < pres.length; a++) {
              let spans = document.createElement("span");
              spans.setAttribute("class", "copy-code-button");
              spans.addEventListener("click", (event) => {
                var input = document.createElement("textarea"); // 创建input对象
                input.value = event.target.previousElementSibling.innerText; // 设置复制内容
                document.body.appendChild(input); // 添加临时实例
                input.select(); // 选择实例内容
                document.execCommand("Copy"); // 执行复制
                document.body.removeChild(input); // 删除临时实例
                this.$message.success("复制成功！");
              });
              spans.setAttribute("click", "copyCodeButton");
              pres[a].appendChild(spans);
            }
          });
          if (this.chatList[this.chatList.length - 1].markedContent != this.replyChat) {
            this.replyChat = this.chatList[this.chatList.length - 1].markedContent;
          }
          this.sessionRightNavCode = res.session_code;
        }
        if (res.role != "" && res.role != null) {
          this.chatList[this.chatList.length - 1].role = res.role;
        }
        // return;
      }
    },

    // 快速选择问题,热词推荐
    selectQs(val) {
      this.sendValue = val;
    },

    // 复制服务信息
    copyText(val) {
      var input = document.createElement("textarea"); // 创建input对象
      input.value = val; // 设置复制内容
      document.body.appendChild(input); // 添加临时实例
      input.select(); // 选择实例内容
      document.execCommand("Copy"); // 执行复制
      document.body.removeChild(input); // 删除临时实例
      this.$message.success("复制成功！");
    },

    // 文本域的值变化
    changeSendValue(value) {
      if (value.match(/^\//) != null) {
        this.isShowTemplateSelte = true;
      } else {
        this.isShowTemplateSelte = false;
      }
    },

    // 显示隐藏点赞/踩
    showSetonHelpImg(num, bool, item) {
      // console.log(item);
      if (
        bool &&
        (num == 1 ||
          num == 3 ||
          num == 5 ||
          num == 7 ||
          num == 9 ||
          num == 11 ||
          num == 13 ||
          num == 15)
      ) {
        chatLikes({
          is_likes: 1,
          session_code: item.session_code,
          chat_group_code: item.chat_group_code,
        });
      } else if (
        bool &&
        (num == 2 ||
          num == 4 ||
          num == 6 ||
          num == 8 ||
          num == 10 ||
          num == 12 ||
          num == 14 ||
          num == 16)
      ) {
        chatLikes({
          is_likes: 2,
          session_code: item.session_code,
          chat_group_code: item.chat_group_code,
        });
      } else {
        chatLikes({
          is_likes: 0,
          session_code: item.session_code,
          chat_group_code: item.chat_group_code,
        });
      }

      if (num == 1) {
        // GPT35
        for (let i = 0; i < this.chatList.length; i++) {
          if (
            this.chatList[i].id == item.id &&
            this.chatList[i].session_code == item.session_code &&
            this.chatList[i].chat_group_code == item.chat_group_code
          ) {
            this.chatList[i].help = false;
            this.chatList[i].stepOn = false;
            this.chatList[i].help = bool;
            this.chatList[i].is_likes = bool ? 1 : 0;
          }
        }
      } else if (num == 2) {
        // GPT35
        for (let i = 0; i < this.chatList.length; i++) {
          if (
            this.chatList[i].id == item.id &&
            this.chatList[i].session_code == item.session_code &&
            this.chatList[i].chat_group_code == item.chat_group_code
          ) {
            this.chatList[i].help = false;
            this.chatList[i].stepOn = false;
            this.chatList[i].stepOn = bool;
            this.chatList[i].is_likes = bool ? 2 : 0;
          }
        }
      } else if (num == 3) {
        // GPT40
        for (let i = 0; i < this.chatVipList.length; i++) {
          if (
            this.chatVipList[i].id == item.id &&
            this.chatVipList[i].session_code == item.session_code &&
            this.chatVipList[i].chat_group_code == item.chat_group_code
          ) {
            this.chatVipList[i].help = false;
            this.chatVipList[i].stepOn = false;
            this.chatVipList[i].help = bool;
            this.chatVipList[i].is_likes = bool ? 1 : 0;
          }
        }
      } else if (num == 4) {
        // GPT40
        for (let i = 0; i < this.chatVipList.length; i++) {
          if (
            this.chatVipList[i].id == item.id &&
            this.chatVipList[i].session_code == item.session_code &&
            this.chatVipList[i].chat_group_code == item.chat_group_code
          ) {
            this.chatVipList[i].help = false;
            this.chatVipList[i].stepOn = false;
            this.chatVipList[i].stepOn = bool;
            this.chatVipList[i].is_likes = bool ? 2 : 0;
          }
        }
      } else if (num == 5) {
        // GPT40
        for (let i = 0; i < this.chatYiyanList.length; i++) {
          if (
            this.chatYiyanList[i].id == item.id &&
            this.chatYiyanList[i].session_code == item.session_code &&
            this.chatYiyanList[i].chat_group_code == item.chat_group_code
          ) {
            this.chatYiyanList[i].help = false;
            this.chatYiyanList[i].stepOn = false;
            this.chatYiyanList[i].help = bool;
            this.chatYiyanList[i].is_likes = bool ? 1 : 0;
          }
        }
      } else if (num == 6) {
        // GPT40
        for (let i = 0; i < this.chatYiyanList.length; i++) {
          if (
            this.chatYiyanList[i].id == item.id &&
            this.chatYiyanList[i].session_code == item.session_code &&
            this.chatYiyanList[i].chat_group_code == item.chat_group_code
          ) {
            this.chatYiyanList[i].help = false;
            this.chatYiyanList[i].stepOn = false;
            this.chatYiyanList[i].stepOn = bool;
            this.chatYiyanList[i].is_likes = bool ? 2 : 0;
          }
        }
      } else if (num == 7) {
        // GPT40
        for (let i = 0; i < this.chatXunfeiList.length; i++) {
          if (
            this.chatXunfeiList[i].id == item.id &&
            this.chatXunfeiList[i].session_code == item.session_code &&
            this.chatXunfeiList[i].chat_group_code == item.chat_group_code
          ) {
            this.chatXunfeiList[i].help = false;
            this.chatXunfeiList[i].stepOn = false;
            this.chatXunfeiList[i].help = bool;
            this.chatXunfeiList[i].is_likes = bool ? 1 : 0;
          }
        }
      } else if (num == 8) {
        // GPT40
        for (let i = 0; i < this.chatXunfeiList.length; i++) {
          if (
            this.chatXunfeiList[i].id == item.id &&
            this.chatXunfeiList[i].session_code == item.session_code &&
            this.chatXunfeiList[i].chat_group_code == item.chat_group_code
          ) {
            this.chatXunfeiList[i].help = false;
            this.chatXunfeiList[i].stepOn = false;
            this.chatXunfeiList[i].stepOn = bool;
            this.chatXunfeiList[i].is_likes = bool ? 2 : 0;
          }
        }
      } else if (num == 9) {
        // GPT40
        for (let i = 0; i < this.chatClaudeList.length; i++) {
          if (
            this.chatClaudeList[i].id == item.id &&
            this.chatClaudeList[i].session_code == item.session_code &&
            this.chatClaudeList[i].chat_group_code == item.chat_group_code
          ) {
            this.chatClaudeList[i].help = false;
            this.chatClaudeList[i].stepOn = false;
            this.chatClaudeList[i].help = bool;
            this.chatClaudeList[i].is_likes = bool ? 1 : 0;
          }
        }
      } else if (num == 10) {
        // GPT40
        for (let i = 0; i < this.chatClaudeList.length; i++) {
          if (
            this.chatClaudeList[i].id == item.id &&
            this.chatClaudeList[i].session_code == item.session_code &&
            this.chatClaudeList[i].chat_group_code == item.chat_group_code
          ) {
            this.chatClaudeList[i].help = false;
            this.chatClaudeList[i].stepOn = false;
            this.chatClaudeList[i].stepOn = bool;
            this.chatClaudeList[i].is_likes = bool ? 2 : 0;
          }
        }
      } else if (num == 11) {
        // GPT40
        for (let i = 0; i < this.chatChatGLMList.length; i++) {
          if (
            this.chatChatGLMList[i].id == item.id &&
            this.chatChatGLMList[i].session_code == item.session_code &&
            this.chatChatGLMList[i].chat_group_code == item.chat_group_code
          ) {
            this.chatChatGLMList[i].help = false;
            this.chatChatGLMList[i].stepOn = false;
            this.chatChatGLMList[i].help = bool;
            this.chatChatGLMList[i].is_likes = bool ? 1 : 0;
          }
        }
      } else if (num == 12) {
        // GPT40
        for (let i = 0; i < this.chatChatGLMList.length; i++) {
          if (
            this.chatChatGLMList[i].id == item.id &&
            this.chatChatGLMList[i].session_code == item.session_code &&
            this.chatChatGLMList[i].chat_group_code == item.chat_group_code
          ) {
            this.chatChatGLMList[i].help = false;
            this.chatChatGLMList[i].stepOn = false;
            this.chatChatGLMList[i].stepOn = bool;
            this.chatChatGLMList[i].is_likes = bool ? 2 : 0;
          }
        }
      } else if (num == 13) {
        // GPT40
        for (let i = 0; i < this.chatTongyiList.length; i++) {
          if (
            this.chatTongyiList[i].id == item.id &&
            this.chatTongyiList[i].session_code == item.session_code &&
            this.chatTongyiList[i].chat_group_code == item.chat_group_code
          ) {
            this.chatTongyiList[i].help = false;
            this.chatTongyiList[i].stepOn = false;
            this.chatTongyiList[i].help = bool;
            this.chatTongyiList[i].is_likes = bool ? 1 : 0;
          }
        }
      } else if (num == 14) {
        // GPT40
        for (let i = 0; i < this.chatTongyiList.length; i++) {
          if (
            this.chatTongyiList[i].id == item.id &&
            this.chatTongyiList[i].session_code == item.session_code &&
            this.chatTongyiList[i].chat_group_code == item.chat_group_code
          ) {
            this.chatTongyiList[i].help = false;
            this.chatTongyiList[i].stepOn = false;
            this.chatTongyiList[i].stepOn = bool;
            this.chatTongyiList[i].is_likes = bool ? 2 : 0;
          }
        }
      } else if (num == 15) {
        // GPT40
        for (let i = 0; i < this.chatShangtangList.length; i++) {
          if (
            this.chatShangtangList[i].id == item.id &&
            this.chatShangtangList[i].session_code == item.session_code &&
            this.chatShangtangList[i].chat_group_code == item.chat_group_code
          ) {
            this.chatShangtangList[i].help = false;
            this.chatShangtangList[i].stepOn = false;
            this.chatShangtangList[i].help = bool;
            this.chatShangtangList[i].is_likes = bool ? 1 : 0;
          }
        }
      } else if (num == 16) {
        // GPT40
        for (let i = 0; i < this.chatShangtangList.length; i++) {
          if (
            this.chatShangtangList[i].id == item.id &&
            this.chatShangtangList[i].session_code == item.session_code &&
            this.chatShangtangList[i].chat_group_code == item.chat_group_code
          ) {
            this.chatShangtangList[i].help = false;
            this.chatShangtangList[i].stepOn = false;
            this.chatShangtangList[i].stepOn = bool;
            this.chatShangtangList[i].is_likes = bool ? 2 : 0;
          }
        }
      }
    },

    // 指令集的回调
    useingTemplate(item) {
      this.isShowTemplateSelte = false;
      this.sendValue = item.prompts_name;
    },

    // 换一批模板
    refresh() {
      this.queryQuestionSetRecommend();
    },

    // 更多模板
    showMore() {
      this.$router.push("/templateSelect/templateSelect");
      this.$store.dispatch("user/changeRouterIndex", 3);
    },

    // 关闭推荐
    closeRecommend() {
      this.isShowTemplate = false;
    },

    // 下载快捷方式
    downloadImage(a, b) {
      var d = "" + a + b;
      var e = "[InternetShortcut]" + "\n" + "URL=" + location.href;
      this.saveToDesktop(d, e);
    },

    saveToDesktop(fileName, data) {
      var explorer = navigator.userAgent.toLowerCase();
      if (explorer.indexOf("trident") > 0) {
        //IE 5+
        var wss = new ActiveXObject("WScript.Shell");
        var desktopUrl = wss.SpecialFolders("Desktop");
        var fso = new ActiveXObject("Scripting.FileSystemObject");
        var tf = fso.CreateTextFile(desktopUrl + "\\" + fileName, true);
        tf.Write(data);
        tf.Close();
      } else {
        //fireFox chrome
        var urlObj = window.URL || window.webkitURL || window;
        var blob = new Blob([data]);
        var link = document.createElementNS("http://www.w3.org/1999/xhtml", "a");
        link.href = urlObj.createObjectURL(blob);
        link.download = fileName;
        saveClick(link);
      }

      function saveClick(obj) {
        var e = document.createEvent("MouseEvents");
        e.initMouseEvent(
          "click",
          true,
          false,
          window,
          0,
          0,
          0,
          0,
          0,
          false,
          false,
          false,
          false,
          0,
          null
        );
        obj.dispatchEvent(e);
      }
    },

    codeHandleChange(res) {
      console.log(res, "状态码");
      // if (response.status == '400') {
      this.isTimeChat = false;
      this.isBtnChat = true;
      this.isfinishChat = true; // 完成打字效果
      clearInterval(this.t_timeChat);
      this.t_timeChat = null;

      if (Number(res.code) == 40013) {
        console.log("进入2");
        this.$refs.Register.registerVisible = true;
        this.$store.dispatch("user/GuessLogin");
        return;
      }
      if (
        (Number(res.code) == 30014 || Number(res.code) == 40022) &&
        this.loginInfo.role == "guess"
      ) {
        console.log("进入3");
        this.queryErrorMsg = res.msg;
        this.$refs.Register.registerVisible = true;
        return;
      } else if (
        (Number(res.code) == 30014 || Number(res.code) == 40022) &&
        this.loginInfo.role == "user"
      ) {
        this.isuser = false;
        this.queryErrorMsg = res.msg;
      } else if (Number(res.code) == 40015) {
        this.isFoulLanguage = true;
        this.queryErrorMsg = res.msg;
      } else {
        if (
          Number(res.code) < 50000 &&
          Number(res.code) != 40022 &&
          Number(res.code) != 30014
        ) {
          this.$message.error(res.msg);
        } else if (Number(res.code) != 40022 && Number(res.code) != 30014) {
          this.$message({
            message: "网络异常,请稍后重试",
            duration: 2000,
          });
        }
      }
    },

    // 获取推荐问题集
    queryQuestionSetRecommend() {
      questionSetRecommend().then((res) => {
        this.qsList = [];
        this.qsList.push(res.data[0]);
        this.qsList.push(res.data[1]);
        this.qsList.push(res.data[2]);
      });
    },

    resetMarkedRenderer() {
      const renderer = new marked.Renderer();
      // 重写代码块渲染方法，使用highlight.js进行代码高亮
      renderer.code = (code, language) => {
        const validLanguage = hljs.getLanguage(language) ? language : "plaintext";
        const highlightedCode = hljs.highlight(validLanguage, code).value;
        return `<pre><code class="hljs ${validLanguage}">${highlightedCode}</code></pre>`;
      };
      return renderer;
    },
  },
};
</script>

<style scoped>
/* .footer-inp_img /deep/ .el-textarea__inner{
  border: 0px !important;
} */
.roleBg_1 {
  border-radius: 6px;
  font-size: 20px;
  line-height: 50px;
  text-align: center;
  color: #ffffff;
  background: #ffb833;
  width: 50px;
  height: 50px;
  left: 20px;
  top: -25px;
}

.roleBg_2 {
  border-radius: 6px;
  font-size: 20px;
  line-height: 50px;
  text-align: center;
  color: #ffffff;
  background: #7f48ff;
  width: 50px;
  height: 50px;
  left: 20px;
  top: -25px;
}

.roleBg_3 {
  border-radius: 6px;
  font-size: 20px;
  line-height: 50px;
  text-align: center;
  color: #ffffff;
  background: #40de9f;
  width: 50px;
  height: 50px;
  left: 20px;
  top: -25px;
}
.roleBg_5 {
  border-radius: 6px;
  font-size: 20px;
  line-height: 50px;
  text-align: center;
  color: #ffffff;
  background: #ff8e8e;
  width: 50px;
  height: 50px;
  left: 20px;
  top: -25px;
}
.questionRole {
  width: 600px;
  padding: 50px 20px;
  box-sizing: border-box;
  background: #ffffff;
  border-radius: 10px 10px 10px 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
  margin: auto;
  margin-top: 30px;
}
.questionRole .head {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: auto;
  font-weight: 500;
  font-size: 44px;
  color: #fff;
  background: #ffb833;
}
.questionRole .title {
  margin-top: 8px;
  margin-bottom: 16px;
  font-weight: 500;
  font-size: 20px;
  color: #333333;
  text-align: center;
}
.questionRole .text {
  max-width: 396px;
  font-weight: 400;
  font-size: 14px;
  color: #666666;
  margin: auto;
}
.questionRole .btn {
  padding: 8px 14px;
  box-sizing: border-box;
  border-radius: 4px;
  border: 1px solid #3363f6;
  display: flex;
  align-items: center;
  position: absolute;
  right: 20px;
  top: 20px;
  cursor: pointer;
}
.questionRole .btn img {
  margin-right: 8px;
  width: 16px;
  height: 16px;
}
.questionRole .btn div {
  font-weight: 500;
  font-size: 14px;
  color: #3363f6;
}
.uploadImg {
  width: 60%;
  height: 350px;
  border-radius: 10px;
  background: #fff;
  margin-top: 30px;
  box-shadow: 0px 0px 0px 0px rgba(0, 0, 0, 0.1), 0px 10px 33px 0px rgba(0, 0, 0, 0.1);
  position: relative;
  left: 50%;
  transform: translate(-50%);
  /* padding-top: 70px; */
  box-sizing: border-box;
  /* display: flex;justify-content: center;flex-direction: column; */
}
.uploadBack {
  position: absolute;
  top: 20px;
  right: 20px;
  display: flex;
  align-items: center;
  z-index: 99999;
  cursor: pointer;
}
.uploadBack .el-icon-close {
  font-size: 24px;
  cursor: pointer;
}
.uploadBack div {
  margin-left: 0px;
  color: #666;
  font-family: PingFang SC;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 150%; /* 21px */
}
.upload-demo /deep/ .el-upload {
  width: 100%;
  height: 100%;
}
.uploadImg-text {
  color: #898989;
  text-align: center;
  font-family: PingFang SC;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 24px; /* 171.429% */
  /* margin-top: 5px; */
  margin-bottom: 15px;
}
.upload-demo /deep/ .el-upload-dragger {
  width: 100%;
  height: 100%;
  padding-top: 50px;
  box-sizing: border-box;
}
.uploadImg-title {
  color: #000;
  text-align: center;
  font-family: PingFang SC;
  font-size: 18px;
  font-style: normal;
  font-weight: 500;
  line-height: 24px; /* 133.333% */
}
.upload-content {
  display: flex;
  justify-content: center;
  flex-direction: column;
}
.cg-chat-content ::-webkit-scrollbar {
  display: none;
}
.btn_cont {
  display: flex;
  align-items: center;
  justify-self: flex-start;
  padding: 10px;
  width: 100%;
}
.chat_new {
  padding: 6px 20px;
  background: rgb(31, 100, 255);
  color: white;
  font-size: 14px;
  border-radius: 6px;
  cursor: pointer;
}
.chat_cont {
  margin-right: 13px;
}
.chat_cont /deep/ .el-input__inner {
  background: white;
  border-radius: 6px;
  height: 32px;
  font-size: 14px;
  padding-left: 10px;
}
.share {
  margin-top: 5px;
  font-family: PingFang SC;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 150%; /* 19.5px */
  display: flex;
  align-items: center;
  cursor: pointer;
}
.share div:first-child {
  color: red;
}
.share div:last-child {
  color: #1f64ff;
}
.capacity {
  width: 375px;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  margin: auto;
}
.capacity-box {
  cursor: pointer;
  border-radius: 6px;
  background: #fff;
  width: 80px;
  padding: 12px 0px;
  text-align: center;
  margin-bottom: 10px;
  color: #343540;
  font-family: PingFang SC;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 150%; /* 21px */
}
.capacity-box:hover {
  background-color: rgb(31, 100, 255);
  color: white;
}
.model-price {
  font-size: 12px;
  margin-top: 10px;
}

.bigModel {
  width: 76px;
  height: 100%;
  background-color: #f1f2f5;
  position: absolute;
  top: -28px;
  padding: 0px 20px;
}

.bigModel .model-item {
  background-color: white;
  border-radius: 8px;
  width: 76px;
  height: 76px;
  flex-shrink: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 15px;
}

.bigModel .model-item img {
  width: 35px;
  height: 35px;
}

#chatCont::-webkit-scrollbar {
  height: 10px;
  width: 3px;
}

#chatCont::-webkit-scrollbar {
  background-color: #f9f9f9;
}

#chatCont::-webkit-scrollbar-thumb {
  border-radius: 4px;
  background-color: #dedede;
}

.footer-inp_img {
  width: calc(100% - 140px);
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
  border: 1px solid #e5e5e5;
  border-right: none;
  border-radius: 4px 0 0 4px;
}

.upload-file_image .clear_img {
  padding: 0 10px;
  border: 1px solid #e5e5e5;
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
  /* padding: 10px 0; */
  justify-content: space-between;
}

.qs_line {
  margin-bottom: 10px;
  padding: 20px;
  border-radius: 6px;
  font-weight: 400;
  font-size: 14px;
  height: 38px;
  color: #78829a;
  cursor: pointer;
  background-color: #ffffff;
}

.qs_line-item {
  -webkit-line-clamp: 2;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}

.qs_line:hover {
  color: #ffffff;
  background: #1f64ff;
}

.prompt {
  color: #aab2c8;
  font-size: 14px;
  font-weight: 400;
  margin-top: 10px;
}

.content {
  width: calc(100% - 256px);
  height: calc(100% - 20px);
  display: flex;
  flex-direction: column;
  margin-left: 400px;
  transition: width 0.2s;
  position: relative;
}

.footer_cont {
  /* background: #fff; */
  width: calc(100% - 80px);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0px 0 10px 20px;
  position: relative;
  margin-left: 20px;
}

.footer_qs {
  width: 100%;
  /* width: calc(100% - 240px); */
  display: flex;
  justify-content: center;
  margin-top: 15px;
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
  color: #1f64ff;
}

.top_text {
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 150%;
  margin-left: 5px;
  color: #1f64ff;
}

.cont {
  width: 100%;
  padding: 6px 0;
  background: #fff;
  border-radius: 10px;
  display: flex;
  align-items: center;
  position: relative;
}

.cg-chat-content {
  width: calc(100% - 120px);
  flex: 1;
  padding: 5px 60px 0 70px;
  margin: auto;
  overflow: hidden;
  /* padding-top: 65px; */
  padding-bottom: 0px;
}

.cg-chatbox {
  border-radius: 5px;
  position: relative;
  padding: 20px 20px 20px 20px;
  word-break: break-all;
  word-wrap: break-word;
}

.cg-chatbox-left {
  border: 1px solid #ffffff;
  display: inline-block;
  background: #ffffff;
  border-radius: 8px;
  color: #333;
  /* width: 100%; */
}

.cg-chatbox-left::before {
  right: 100%;
  border-color: transparent #ffffff transparent transparent;
}

.cg-chatbox-right {
  border: 1px solid #1f64ff;
  display: inline-block;
  background: #1f64ff;
  border-radius: 8px;
  color: #fff;
  text-align: left;
  position: relative;
  padding-bottom: 32px;
}

.cg-chatbox-right::before {
  left: 100%;
  border-color: transparent transparent transparent #1f64ff;
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
  display: flex;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  /* display: block; */
  border-radius: 50%;
  overflow: hidden;
  background-color: white;
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
  color: #1f64ff;
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
  color: #aab2c8;
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
  background-color: #ffffff;
  height: calc(100%);
  width: 140px;
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
  background-color: #ffffff;
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
  background-color: #ffffff;
  position: absolute;
  right: 50%;
  bottom: -10px;
  box-shadow: 2px 2px 0 rgba(0, 0, 0, 0.1);
}

.reset_request {
  font-size: 14px;
  line-height: 150%;
  color: #1f64ff;
  border: 1px solid #1f64ff;
  border-radius: 3px;
  width: 95px;
  padding: 5px 0;
  margin-top: 15px;
  text-align: center;
  cursor: pointer;
  margin-right: 20px;
}

.reset_request:hover {
  color: #1f64ff;
  background: rgba(31, 100, 255, 0.1);
  border: 1px solid rgba(31, 100, 255, 0.1);
}

.chat-dialog-footer {
  background-color: #1f64ff;
  color: #ffffff;
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
  color: #7ea6fc;
}
</style>

<style lang="scss" scoped>
.chat-text-textarea {
  display: flex;
  align-items: center;
}

.chat-text-textarea textarea {
  background-color: #ffffff;
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
  border-right: 1px solid #ffffff;
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
  border: 2px solid #1f64ff;
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
  border-right: 1px solid #ffffff;
}

.content .el-input__inner {
  background: #f5f6fa;
  border-radius: 10px;
  height: 58px;
  font-size: 16px;
  padding-left: 30px;
}

.model_list .ai-btn-list {
  border: none;
  border-radius: 0;
  font-size: 14px;
  padding: 8px 12px;
  background-color: #ffffff;
  text-align: center;
  margin-left: 0;
  position: relative;
  margin: auto;
}

.upload-demo-chat {
  position: absolute;
  bottom: calc(var(--a) + 10px);
  // right: 90px;
}

.upload-demo-chat-on {
  bottom: calc(90px + var(--a));
}

.draw_image-class_dark .el-dialog {
  border-radius: 4px;
  top: 50%;
  left: 50%;
  transform: translateY(-50%) translateX(-50%);
  background-color: transparent;
  box-shadow: 0 0 0 transparent;
  margin: 0 !important;
  display: flex;
  justify-content: center;
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

.go_back-item {
  top: 20px !important;
  left: 0px !important;
}
</style>
