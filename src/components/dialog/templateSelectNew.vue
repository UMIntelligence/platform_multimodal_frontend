<template>
  <div class="main">
    <nav
      :style="
        title == '私享'
          ? 'width:368px;transition: width .2s;'
          : 'width:260px;transition: width .2s;'
      "
    >
      <div class="nav-title">
        <div v-show="title == '历史'" class="domHover back" @click="title = '私享'">
          <i class="el-icon-arrow-left"></i>
          <span>返回</span>
        </div>
      </div>
      <div style="width: 100%" v-if="title == '私享'">
        <!-- “ 我 ” -->
        <div class="teacher-my" v-if="mentorOrMe.length > 0">
          <div class="my-title">
            <span>遇事不决问自己</span>
            <div @click="title = '历史'">历史记录 ></div>
          </div>
          <div class="my-box">
            <div>
              <img
                v-if="!userPhoto"
                class="image me_photo"
                style="width: 50px; height: 50px"
                src="../../assets/images/default_ai_icon.png"
                alt=""
              />
              <img
                v-else
                class="image me_photo"
                :src="httpUrls.ossUrl + userPhoto"
                alt=""
              />
              <div v-if="!userPhoto">我</div>
              <div v-else>{{ mentorOrMe[0].me.name }}</div>
            </div>
            <div>
              <div class="domHover" @click="toMeChat()">问自己</div>
              <div @click.self="editMeItem(mentorOrMe)">编辑资料</div>
              <div>*补充完善资料，我将成为您的孪生数字人</div>
            </div>
          </div>
        </div>
        <div class="teacher-say" v-if="mentorOrMe.length > 0">
          <img
            :src="
              httpUrls.ossUrl + 'static/picture/04292683-6683-407f-898c-843d9cbf7854.png'
            "
            alt=""
          />
          <div style="display: flex; align-items: center">
            <img :src="httpUrls.ossUrl + userPhoto" alt="" />
            <div>Hi，{{ mentorOrMe[0]["me"] ? mentorOrMe[0]["me"].name : "" }}</div>
          </div>
          <div>{{ time_text }}，好久不见了呀，最近怎么样?</div>
        </div>
        <!-- AI导师 -->
        <div class="teacher-AI">
          <!-- 标题 -->
          <div class="box-title">
            <div>AI导师助你成功</div>
            <div @click="toMentor(mentorRecommend[0])">管理导师 ></div>
          </div>
          <!-- 导师盒子 -->
          <div class="box-content">
            <div class="box-center" v-for="(item, i) in mentorRecommend" :key="i">
              <img
                :src="httpUrls.ossUrl + item.avatar"
                alt=""
                @click="toMentorChat(item)"
              />
              <span>{{ item.character_name }}</span>
              <div class="edit_btn" @click.stop="addMentor(item)">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                >
                  <path
                    d="M14 6.33398H2"
                    stroke="white"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M10 2.33398L14 6.33398"
                    stroke="white"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M2.26562 9.66602H14.2656"
                    stroke="white"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M2.26562 9.66602L6.26564 13.666"
                    stroke="white"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
        <!-- 热门AI顾问推荐 -->
        <div class="teacher-consultant">
          <div class="consultant-title">热门导师</div>
          <div style="">
            <div
              class="consultant-box domHover"
              v-for="item in recommend"
              :key="item.character_name"
              @click="toMentorChat(item.character_name)"
            >
              <img :src="httpUrls.ossUrl + item.avatar" alt="" />
              <div>
                <div>{{ item.character_name }}</div>
                <div>{{ item.introduction }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        v-else
        style="
          overflow-y: auto;
          width: 251px;
          height: calc(100% - 24px);
          position: relative;
        "
      >
        <!-- 历史记录 -->
        <right-nav
          :updataRightList="updataRightList"
          :sessionRightNavCode="sessionRightNavCode"
          @updatachatlist="updataChatList"
          @undatename="undateName"
          :randomStr="randomStr"
          @resetnewchat="resetNewChat"
          @isshowrightsidbar="isShowRightSidbar"
        ></right-nav>
      </div>
    </nav>
    <section
      :style="
        title == '私享' ? 'width: calc(100% - 368px);' : 'width: calc(100% - 260px);'
      "
    >
      <div class="cg-chat-content" id="chatCont" ref="wrap">
        <div class="cg-chat-left">
          <div class="cg-user-pic cg-right" v-if="!robotMsg">
            <img
              src="../../assets/images/Frame-logo.jpg"
              alt=""
              style="width: 25px; height: 25px"
            />
          </div>
          <div v-else>
            <img
              class="cg-user-pic cg-right"
              :src="httpUrls.ossUrl + robotMsg.avatar"
              alt=""
            />
          </div>
          <div class="as-cont-left" style="min-width: 425px">
            <div class="as_text_left">
              <div class="cg-chatbox cg-chatbox-left">
                <div class="left_tip" v-if="!robotMsg">
                  {{ modelText
                    }}<span style="
                        font-weight: 400;
                        font-size: 13px;
                        color: #999;
                        margin-left: 5px;
                      ">（{{ modelToken }}）</span>
                </div>
                <div class="left_tip" v-else>{{ robotMsg.greeting }}</div>
              </div>
            </div>
          </div>
        </div>

        <div v-for="(item, index) in chatList" :key="index">
          <div>
            <!-- 左侧模板 -->
            <div class="cg-chat-left" v-if="item.role == 'assistant'">
              <!-- 多选框 -->
              <div style="display: flex">
                <div class="cg-user-pic cg-right" v-if="!robotMsg">
                  <img
                    src="../../assets/images/Frame-logo.jpg"
                    alt=""
                    style="width: 25px; height: 25px"
                  />
                </div>
                <div v-else>
                  <img
                    class="cg-user-pic cg-right"
                    :src="httpUrls.ossUrl + robotMsg.avatar"
                    alt=""
                  />
                </div>
                <div class="as-cont-left" style="min-width: 600px">
                  <!-- 文字模式 -->
                  <div class="as_text_left">
                    <div class="cg-chatbox cg-chatbox-left">
                      <!-- 实时显示的内容/内容 -->
                      <div
                        class="reply markdown-body"
                        :style="
                          !isfinishThreeFive && index == chatList.length - 1
                            ? 'white-space: pre-wrap;'
                            : ''
                        "
                        v-html="item.content"
                      ></div>

                      <div class="comput" style="margin-top: 10px">
                        <div style="display: flex; flex-wrap: nowrap">
                          <span
                            class="put_text"
                            v-if="!isfinishThreeFive && index == chatList.length - 1"
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
                            v-if="isfinishThreeFive && item.timer != false"
                            >耗时:{{ item.timer }}秒</span
                          >
                          <!-- 回答中显示 -->
                          <span
                            class="put_text"
                            v-else-if="!isClickChat && index == chatList.length - 1"
                            >耗时:{{ timerThreeFive }}秒</span
                          >
                          <!-- 回答中 -->
                          <span
                            class="put_text"
                            v-else-if="!isfinishThreeFive && index == chatList.length - 1"
                            >耗时:{{ timerThreeFive }}秒</span
                          >
                          <!-- 历史记录等显示 -->
                          <div class="put_text" v-if="index != chatList.length - 1">
                            总字数：{{
                              index == chatList.length - 1 &&
                              index != 0 &&
                              !isDetailThreeFive
                                ? replyThreeFive.length
                                : item.content.length
                            }}
                          </div>
                          <!-- 回答结束时显示 -->
                          <div class="put_text" v-else-if="isfinishThreeFive">
                            总字数：{{
                              index == chatList.length - 1 &&
                              index != 0 &&
                              !isDetailThreeFive
                                ? replyThreeFive.length
                                : item.content.length
                            }}
                          </div>

                          <span class="put_text" v-if="isBtnThreeFive">
                            <span>消耗{{ item.integral }}算力</span>
                            <span>：共{{ item.total_tokens }}token</span>
                          </span>
                        </div>

                        <div class="help-setpon">
                          <img
                            class="cope-img"
                            src="../../assets/images/copyBlack.png"
                            @click="copyText(item.content)"
                            alt=""
                          />
                        </div>
                      </div>

                      <div class="prompt" v-if="isBtnThreeFive">
                        当前内容为AI生成，不做任何决策使用！由此引发的一切后果，需自行承担，请知悉，已通过阿里云内容安全审核
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <!-- 右侧模板 -->
            <div
              :class="isShowChecked ? 'cg-chat-right' : 'cg-chat-right cg-chat-right-on'"
              v-if="item.role == 'user'"
              style="justify-content: flex-start"
            >
              <el-checkbox
                v-if="isShowChecked"
                v-model="item.checked"
                style="margin-right: 18px; margin-top: 6px"
                @change="changeSendAnswer(item)"
              ></el-checkbox>
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
                      @click="(showImagesVisible = true), (chatimageUrl = item.images[0])"
                    />
                    <img
                      class="img"
                      src="../../assets/images/copyWrite.png"
                      alt=""
                      @click="copyText(item.content)"
                    />
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
          <div class="cg-user-pic cg-right" v-if="!robotMsg">
            <img
              src="../../assets/images/Frame-logo.jpg"
              alt=""
              style="width: 25px; height: 25px"
            />
          </div>
          <div v-else>
            <img
              class="cg-user-pic cg-right"
              :src="httpUrls.ossUrl + robotMsg.avatar"
              alt=""
            />
          </div>
          <div class="as-cont-left">
            <div class="as_text_left">
              <div class="cg-chatbox cg-chatbox-left">
                <div class="left_tip">{{ queryErrorMsg }}</div>
                <div
                  style="margin-top: 10px; display: flex; justify-content: space-between"
                >
                  <el-button
                    v-if="chat_type == 0"
                    style="
                      background-color: #ff9b17;
                      color: #ffffff;
                      border-radius: 4px;
                      padding: 6px 60px;
                    "
                    @click="$resf.member.PayVisible = true"
                    >购买套餐</el-button
                  >
                  <!-- <el-button type="primary" style="background-color: #1F64FF;border-radius: 4px;padding: 6px 60px;"
                    @click="$router.push('/member/Member')">购买流量包</el-button> -->
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- 屏蔽词 -->
        <div class="cg-chat-left" v-if="isFoulLanguage">
          <div class="cg-user-pic cg-right" v-if="!robotMsg">
            <img
              src="../../assets/images/Frame-logo.jpg"
              alt=""
              style="width: 25px; height: 25px"
            />
          </div>
          <div v-else>
            <img
              class="cg-user-pic cg-right"
              :src="httpUrls.ossUrl + robotMsg.avatar"
              alt=""
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
          <div class="cg-chat-left" v-if="isTimeThreeFive" style="margin-bottom: 20px">
            <div class="cg-user-pic cg-right" v-if="!robotMsg">
              <img
                src="../../assets/images/Frame-logo.jpg"
                alt=""
                style="width: 25px; height: 25px"
              />
            </div>
            <div v-else>
              <img
                class="cg-user-pic cg-right"
                :src="httpUrls.ossUrl + robotMsg.avatar"
                alt=""
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
                    <span class="put_text">耗时:{{ timerThreeFive }}秒</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <span
          class="reset_request query-reset_request"
          v-if="isTimeThreeFive"
          @click="endController('', false)"
        >
          <i class="el-icon-remove-outline"></i>
          停止回答
        </span>
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
          <div class="chat_new" @click="resetNewChat(), (uploadHide = false)">
            <i class="el-icon-plus" style="margin-right: 5px"></i>创建新会话
          </div>
        </div>
        <div class="cont">
          <div
            :class="
              isSahowUploadPicture && chatImageFile != ''
                ? 'footer-inp_img footer-inp_img-on'
                : 'footer-inp_img'
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

            <div
              class="upload-file_image"
              v-if="isSahowUploadPicture && chatImageFile != ''"
            >
              <img class="img" :src="httpUrls.ossUrl + chatImageFile" alt="" />
              <i class="el-icon-close clear_img" @click="clearUploadImage"></i>
            </div>
          </div>
          <div class="textarea-btn">
            <div class="mask" style="justify-content: flex-end">
              <!-- <el-upload
                :class="
                  isSahowUploadPicture && chatImageFile != ''
                    ? 'upload-demo-chat upload-demo-chat-on'
                    : 'upload-demo-chat'
                "
                v-if="isSahowUploadPicture && chatImageFile == ''"
                drag
                accept=".jpg,.jpeg,.png"
                ref="blueprintReading"
                :data="blueprintReadingFile"
                :style="{ '--a': textareaHeight }"
                :action="httpUrls.loginUrl + 'api/user/oss_upload'"
                :on-change="handleChangeFile"
                :on-success="handleSuccessFile"
                :on-exceed="
                  () => {
                    return $message.error('文件上传超出最大限制！');
                  }
                "
                :show-file-list="false"
                :limit="1"
              >
                <i class="el-icon-upload"></i>
                <div class="el-upload__text">
                  将图片拖到此处，或<em>点击上传</em>
                </div>
              </el-upload>

              <img
                style="cursor: pointer"
                src="../../assets/images/camera.png"
                alt=""
                @click="
                  (isSahowUploadPicture = !isSahowUploadPicture),
                    (chatImageFile = '')
                "
              /> -->
              <el-button
                class="send_img"
                style="height: 32px; width: 70px"
                type="primary"
                @click="isBtnChatGLM ? sendMsg() : sendMsg2()"
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
    </section>
    <register ref="Register"></register>
  </div>
</template>
<script>
import {
  getMentorMe,
  getMetorList,
  batchMeTutor,
  deleteMentor,
  updateMentorMe,
  deleteMentorMe,
} from "../../api/mentor";
import {
  creatChat,
  chatDetail,
  creatDraw,
  questionSetRecommend,
  submitFootprint,
  mentorMatchContext,
} from "../../api/chatMG";
import { recommend, chatLikes, promptsRecommend } from "../../api/prompts";
import register from "../register";
import rightNav from "../rightNav";
import httpUrls from "../../api/requestURL";
import { marked } from "marked";
import { textDecoder, arr2str } from "../../utils/download";
import { mapGetters } from "vuex";
export default {
  name: "templateSelectNew",
  data() {
    return {
      title: "私享",
      httpUrls,
      mentorOrMe: [],
      userPhoto: "",
      mentorRecommend: [], //导师数据
      recommend: [], //推荐导师数据
      robotMsg: null, //AI/机器人信息

      randomStr: 0, // 随机数，刷新列表
      sessionRightNavCode: "", // 聊天组的唯一id，用于刷新历史会话
      httpUrls,
      showMeneber: false,
      isSahowUploadPicture: false,
      isShowRightNav: true,
      chatImageFile: "", // 上传图片的地址
      oldchatImageFile: "",
      chatimageUrl: "",
      showImagesVisible: false,
      robotMsg: "", // 机器人的信息
      blueprintReadingFile: {
        image: null,
        image_name: null,
        oss_dir: "static",
        cate: "recognizingSllThings-picture",
      },
      AINameDisabled: false,
      // chatText: 'AI35',
      // action_type: '1',
      // activeName: '0',
      chat_type: 1004, // ai35: 0; ai40: 1
      AIname: 1004, // ai id
      chat_value: ["1004", "umi-pro-4k"],
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
      sendValue: "", // 问题的内容
      oldSendValue: "", // 临时保存上一次的问题
      isShow: false, // 快速提问
      // isPay: true,
      replyThreeFive: "", // 实时回答 / 35
      replyFourZero: "", // 实时回答 / 40
      replyYiyan: "", // 实时回答 / 文心一言
      replyXunfei: "", // 实时回答 / 讯飞星火
      replyClaude: "", // 实时回答 / Claude
      replyChatGLM: "", // 实时回答 / ChatGLM
      replyTongyi: "", // 实时回答 / 通义千问
      replyShangtang: "", // 实时回答 / 商汤

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
      isfinishThreeFive: true, // 完成打字效果 / 35
      isfinishFourZero: true, // 完成打字效果 / 40
      isfinishYiyan: true, // 完成打字效果 / 文心一言
      isfinishXunfei: true, // 完成打字效果 / 讯飞星火
      isfinishClaude: true, // 完成打字效果 / 讯飞星火
      isfinishChatGLM: true, // 完成打字效果 / ChatGLM
      isfinishTongyi: true, // 完成打字效果 / 通义千问
      isfinishShangtang: true, // 完成打字效果 / 商汤

      isBtnThreeFive: true, // 防止重新发送
      isBtnFourZero: true, // 防止重新发送
      isBtnYiyan: true, // 防止重新发送
      isBtnXunfei: true, // 防止重新发送
      isBtnClaude: true, // 防止重新发送
      isBtnChatGLM: true, // 防止重新发送
      isBtnTongyi: true, // 防止重新发送
      isBtnShangtang: true, // 防止重新发送

      supplyVisible: false, // 补充对话
      supplyValue: "", // 补充对话的问题
      isDetailThreeFive: false, // 显示会话内容 / 35
      isDetailFourZero: false, // 显示会话内容 / 40
      isDetailYiyan: false, // 显示会话内容 / 40
      isDetailXunfei: false, // 显示会话内容 / 40
      isDetailClaude: false, // 显示会话内容 / 40
      isDetailChatGLM: false, // 显示会话内容 / ChatGLM
      isDetailTongyi: false, // 显示会话内容 / ChatGLM
      isDetailShangtang: false, // 显示会话内容 / ChatGLM

      qsList: {}, // 热词

      chatList: [], //3.5数据
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

      textAreaLength: "2000", // 问题长度
      association: "", // 是否关联上下文
      isShowassociation: false, // 是否关联上下文
      isShowChecked: false, // 复选框
      ordeAIList: [], // 关联上下文的列表
      // showRegister: false,
      updataRightList: null, // ai的id，=chat_type
      promptsId: null, // 模板指令的id
      isClickChat: false, // 点击历史会话打开优化本次回答
      chatItem: {}, // 用于存放优化会话的临时对象
      msgCode: "", // 当前会话的唯一id

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
      time_text: "",
    };
  },
  components: {
    register,
    rightNav,
  },
  computed: {
    ...mapGetters(["carouselMessage", "userInfoData"]),
    modelText() {
      let text;
      let value = this.chat_value[0];
      if (!value) {
        return;
      }
      switch (value) {
        case "4":
          text = `我是文心一言大模型，${this.chat_value[1]}版本`
          break;
        case "5":
          text = `我是讯飞星火大模型，${this.chat_value[1]}版本`
          break;
        case "8":
          text = `我是chatGLM大模型，${this.chat_value[1]}版本`
          break;
        case "10":
          text = `我是通义千问大模型，${this.chat_value[1]}版本`
          break;
        case "12":
          text = `我是360智脑大模型，${this.chat_value[1]}版本`
          break;
        case "1001":
          text = `我是混元大模型，${this.chat_value[1]}版本`
          break;
        case "1003":
          text = `我是豆包大模型，${this.chat_value[1]}版本`
          break;
        case "1004":
          text = `我是无忧秘书大模型，${this.chat_value[1]}版本`
          break;
        default:
          break;
      }
      // console.log(text,'--欢迎文字')
      return text;
    },
    modelToken() {
      let token;
      let value = this.chat_value[1];
      switch (value) {
        case "ernie-4.0-8k-latest":
          token = "4800算力/1k token";
          break;
        case "ernie-3.5-128k":
          token = "4.8算力/1k token";
          break;
        case "ernie-speed-128k":
          token = "免费";
          break;
        case "v1.1":
          token = "免费";
          break;
        case "v3.5":
          token = "900算力/1k token";
          break;
        case "v4.0":
          token = "3000算力/1k token";
          break;
        case "glm-4-airx":
          token = "300算力/1k token";
          break;
        case "glm-4-air":
          token = "30算力/1k token";
          break;
        case "glm-4-flash":
          token = "免费";
          break;
        case "qwen-turbo":
          token = "免费";
          break;
        case "qwen-plus":
          token = "480算力/1k token";
          break;
        case "qwen-max-longcontext":
          token = "4800算力/1k token";
          break;
        case "360GPT_S2_V9":
          token = "360算力/1k token";
          break;
        case "360gpt2-pro":
          token = "150算力/1k token";
          break;
        case "360gpt-turbo":
          token = "免费";
          break;

        case "hunyuan-lite":
          token = "免费";
          break;
        case "hunyuan-standard":
          token = "285算力/1k token";
          break;
        case "hunyuan-standard-256K":
          token = "2250算力/1k token";
          break;
        case "hunyuan-pro":
          token = "3900算力/1k token";
          break;
        case "Doubao-lite-32k":
          token = "84算力/1k token";
          break;
        case "Doubao-lite-128k":
          token = "420算力/1k token";
          break;
        case "umi-pro-4k":
          token = "免费";
          break;
        case "umi-pro-32k":
          token = "84算力/1k token";
          break;
        case "umi-pro-128k":
          token = "420算力/1k token";
          break;
        default:
          break;
      }
      return token;
    },
  },
  watch: {
    // 用户信息发生改变，重置页面信息
    userInfoData: {
      deep: true,
      handler() {
        console.log("进入监听");
        // location.reload();
        this.getMentorMe();
        this.getMetorList();
      },
    },
    // mentorRecommend: {
    //   deep: true,
    //   handler() {
    //     console.log(this.mentorRecommend, 123456789);
    //   },
    // },
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
        console.log(this.AIname, typeof this.AIname);
        switch (this.AIname) {
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
        // if (this.AIname == 0) {
        this.textAreaLength = "2000";
        this.$store.dispatch("user/changeChatListLength", this.chatList.length);
        // }
        this.chat_type = this.AIname;
        this.chatList = [];
        this.$store.dispatch("id/setAIChatname", this.AIname);
        this.updataRightList = Number(this.chat_type);
      },
    },
    isShowassociation: {
      deep: true,
      handler() {
        if (this.isShowassociation && this.association == "") {
          this.isBtnChatGLM = false;
        }
      },
    },
    association: {
      deep: true,
      handler() {
        if (this.association != "") {
          this.isBtnChatGLM = true;
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
    this.getTime();
  },
  mounted() {
    this.loginRoNot();
    this.getMentorMe(); //获取“ 我 ” 信息
    this.getMetorList();
    this.updataRightList = Number(this.chat_type);
    this.loginInfo = JSON.parse(localStorage.getItem("userInfo"));
    this.$root.Bus.$on("selectChat", (value) => {
      // 接收点击相应会话标识
      this.chatList = [];
      this.$store.dispatch("user/changeChatListLength", this.chatList.length);
      this.getDetail(value);
    });

    this.$root.Bus.$on("delChat", (value) => {
      // 清空历史会话
      this.chatList = [];
      this.$store.dispatch("user/changeChatListLength", this.chatList.length);
      this.isTimeChat = false;
    });
    localStorage.setItem("session_code", "");
  },
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
    //级联改变
    handleChange(val) {
      this.chat_type = val[0];
      // console.log(this.chat_type)
      this.updataRightList = Number(this.chat_type);
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
    toMentor(item) {
      console.log(this.item);
      sessionStorage.setItem("ADD_MENTOR_ITEM_MESSAGE", JSON.stringify(item));
      this.$router.push("/mengerMentor");
    },
    // 修改我
    editMeItem(item) {
      sessionStorage.setItem("EDIT_ME_ITEM_MSG", JSON.stringify(item));
      this.$router.push("/createMentor");
    },
    getTime() {
      // 获取当前时间
      let timeNow = new Date();
      // 获取当前小时
      let hours = timeNow.getHours();
      // 判断当前时间段
      if (hours >= 0 && hours <= 10) {
        this.time_text = `早上好`;
      } else if (hours > 10 && hours <= 14) {
        this.time_text = `中午好`;
      } else if (hours > 14 && hours <= 18) {
        this.time_text = `下午好`;
      } else if (hours > 18 && hours <= 24) {
        this.time_text = `晚上好`;
      }
    },
    // 判断是否登录
    loginRoNot() {
      let userinfo = JSON.parse(localStorage.getItem("userInfo"));
      if (userinfo.role !== "user") {
        this.$message({
          message: "当前尚未登录，请先登录",
          type: "warning",
        });
        this.$refs.Register.registerVisible = true;
        return false;
      } else {
        return true;
      }
    },
    //“ 导师 ”对话
    toMentorChat(item) {
      if (this.loginRoNot()) {
        this.resetNewChat();
        if (typeof item == "string") {
          this.robotMsg = this.recommend.find((val) => val.character_name == item);
        } else {
          this.robotMsg = item;
        }
      }
    },
    //对话“ 自己 ”
    toMeChat() {
      if (this.loginRoNot()) {
        let item = this.mentorOrMe[0].me;
        let data = {
          avatar: item.photo,
          character_name: item.name,
          document: item.document,
          greeting: "你好，我是你自己，有什么问题我们一起沟通！",
          image: item.image,
          implicit_hint: item.implicit_hint,
          influence: item.influence,
          introduction: item.introduction,
          is_built_in: item.is_built_in,
          me_id: item.me_id,
          sort: item.sort,
          tutor_id: item.tutor_id,
          user_id: item.user_id,
          website: item.website,
        };
        this.robotMsg = data;
      }
    },
    //获取"我"信息
    getMentorMe() {
      let userInfo = JSON.parse(localStorage.getItem("userInfo"));
      let data = `user_id=${userInfo.user_id}&page_index=1&page_count=5`;
      getMentorMe(data)
        .then((res) => {
          if (res.data.length == 0 || res.data == null) {
            this.isMeMsg = [];
          } else {
            // console.log(res, '获取我')
            this.isMeMsg = res.data;
            let meId = [];
            res.data.forEach((v) => {
              meId.push(v.me_id);
            });
            batchMeTutor({ me_ids: JSON.stringify(meId) })
              .then((response) => {
                // console.log(response.data, '----')
                if (response.code == 20000) {
                  this.mentorOrMe = response.data;
                  this.userPhoto = response.data[0].me.photo;
                }
              })
              .catch((err) => {
                console.log(err, "mentorOrMe错误");
              });
          }
        })
        .catch((err) => {
          console.log(err, "错误--获取我");
        });
    },
    // 获取导师数据
    getMetorList() {
      let userInfo = JSON.parse(localStorage.getItem("userInfo"));
      if (userInfo.role != "user") {
        getMetorList(`page_index=1&page_count=8&is_built_in=1`)
          .then((res) => {
            this.mentorRecommend = res.data;
          })
          .catch((err) => {
            console.log(err, "导师数据错误");
          });
      } else {
        let data = `user_id=${userInfo.user_id}&page_index=1&page_count=5`;
        getMentorMe(data).then((res) => {
          let meId = [];
          res.data.forEach((v) => {
            meId.push(v.me_id);
          });
          batchMeTutor({ me_ids: JSON.stringify(meId) }).then((response) => {
            if (response.code == 20000) {
              this.mentorRecommend = response.data[0].tutor.filter(
                (item) => item.character_name != undefined && item.character_name != null
              );
              if (this.mentorRecommend.length == 0) {
                this.mentorRecommend = this.recommend.slice(0, 8);
              }
            }
          });
        });
        getMetorList(`is_built_in=1`)
          .then((res) => {
            console.log(res.data, "导师数据");
            this.recommend = res.data;
            if (this.mentorRecommend.length == 0) {
              this.mentorRecommend = this.recommend.slice(0, 8);
            }
          })
          .catch((err) => {
            console.log(err, "导师数据错误");
          });
      }
    },

    //对话---------------------------------
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
      this.chatVipList.forEach((v) => {
        v.checked = false;
      });
      this.chatYiyanList.forEach((v) => {
        v.checked = false;
      });
      this.chatXunfeiList.forEach((v) => {
        v.checked = false;
      });
      this.chatClaudeList.forEach((v) => {
        v.checked = false;
      });
      this.chatChatGLMList.forEach((v) => {
        v.checked = false;
      });
      this.chatTongyiList.forEach((v) => {
        v.checked = false;
      });
      this.chatShangtangList.forEach((v) => {
        v.checked = false;
      });
      this.sendValue = "";
      this.association = "";
      this.isClickChat = true;
      this.chatContScroll = "";
      this.isShowTemplateChatGLM = false;
      if (!this.isfinishChatGLM) {
        clearInterval(this.t_timeChatGLM);
        this.isfinishChatGLM = true;
        this.isBtnChatGLM = true;
        try {
          this.controllerChatGLM.abort();
        } catch (error) {}
      }
      this.getDetail(code);
    },
    // 获取会话详情
    getDetail(code) {
      this.isDetailThreeFive = true;
      this.isTimeThreeFive = false;
      this.isfinishThreeFive = true;
      this.chatList = [];
      this.isShowTemplateThreeFive = false;
      this.isFoulLanguage = false;
      this.ordeAIList = [];
      const renderer = new marked.Renderer();
      // 重写代码块渲染方法，使用highlight.js进行代码高亮
      renderer.code = (code, language) => {
        const validLanguage = hljs.getLanguage(language) ? language : "plaintext";
        const highlightedCode = hljs.highlight(validLanguage, code).value;
        return `<pre><code class="hljs ${validLanguage}">${highlightedCode}</code></pre>`;
      };
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
    clearUploadImage() {
      this.isSahowUploadPicture = false;
      this.chatImageFile = "";
    },
    handleChangeFile(file, fileList) {
      this.blueprintReadingFile.image = file.raw;
      this.blueprintReadingFile.image_name = file.name;
    },
    handleSuccessFile(response, file, fileList) {
      if (response.code == 20000) {
        this.chatImageFile = response.data.new_url;
        this.oldchatImageFile = response.data.new_url;
        this.resetNewChat("fileSuccess");
      } else {
        this.$message.error(response.msg);
        this.$refs.blueprintReading.clearFiles();
      }
    },

    // 优化回答
    optimizeAnswers(item, index) {
      if (!this.isfinishThreeFive) {
        this.$message("当前问题还没回答完毕，请稍后再提问");
        return;
      }
      this.supplyVisible = true;
      this.chatItem = { ...item, chatIndex: index };
      this.supplyValue = "";
    },

    // 开启新会话
    resetNewChat(aiId) {
      // if (this.chatList.length == 0) return
      this.chatList = [];
      this.startNewChat35 = false;
      this.isShowTemplateThreeFive = true;
      this.$store.dispatch("user/changeChatListLength", 0);
      localStorage.setItem("session_code", "");
      localStorage.setItem("chat_group_code", "");
      this.isuser = true;
      this.endController("", false); // 终止回答
      this.isShowChecked = false;
      this.isShowassociation = false;
      this.isClickChat = false;
      if (aiId != "fileSuccess") {
        this.sendValue = "";
      }
      this.msgCode = "";
      this.isTimeThreeFive = false;
      this.randomStr = Math.random();
    },

    resetQuest(item) {
      if (!this.isfinishThreeFive) {
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
      // if (bool != '' && bool != 'toChatFouty') {
      //     this.sendValue = this.oldSendValue
      // }

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
      if (Number(this.association) != 1) {
        if (msgList.length >= "2001") {
          this.$message.error("文字不得超过2000字");
          return;
        }
      }
      this.isFoulLanguage = false;
      this.isShowassociation = false;
      this.isShowChecked = false;

      this.isShow = true; // 快速提问
      this.isDetailThreeFive = false;
      this.isfinishThreeFive = false; // 完成打字效果
      this.isBtnThreeFive = false; // 是否允许重发
      this.replyThreeFive = "";
      this.isShowTemplateThreeFive = false; // 关闭热词

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
        images: [this.chatImageFile],
        content: this.sendValue, // 预留，对话内容的转换
        markedContent: marked(this.sendValue),
        checked: false,
        help: false, // 点赞
        stepOn: false, // 点踩
        timer: false,
      };

      // 获取当前会话列表的长度，用作右侧侧边栏的选中状态
      this.chatList.push({ ...sendVal, id: this.chatList.length }); // id：用于关联上下文时的排序，防止顺序错乱导致接口返回的信息错误
      this.$store.dispatch("user/changeChatListLength", this.chatList.length);

      this.toBottom();

      // this.isTime = true; // 思考中
      this.isTimeThreeFive = true;
      this.replyThreeFive = "";
      if (bool != "toChatFouty") {
        this.timerThreeFive = 0;
        this.t_timeThreeFive = setInterval(() => {
          this.timerThreeFive += 1;
        }, 1000);
      }
      let val = null;
      let msg = [];
      this.chatList.forEach((v) => {
        msg.push({
          role: v.role,
          content: v.content,
        });
      });
      let userInfos = JSON.parse(localStorage.getItem("userInfo"));
      mentorMatchContext({
        user_id: userInfos.user_code,
        me_id: this.robotMsg.me_id,
        tutor_id: this.robotMsg.tutor_id,
        question_content: this.sendValue,
      }).then((res) => {
        // historyList[historyList.length - 1].covert_content = res.data.prompt
        val = {
          chat_type: this.chat_type,
          session_code: localStorage.getItem("session_code") || "",
          chat_group_code: "",
          scenario_type: "mentor",
          content: this.sendValue,
          msg_list: JSON.stringify([
            {
              role: "user",
              covert_content: res.data.prompt,
              content: this.sendValue,
              images: this.chatImageFile != "" ? [this.chatImageFile] : [],
            },
          ]),
          model: this.chat_value[1],
        };
        this.vipSend(bool, val);
      });
    },

    // 4.0信息发送
    async vipSend(bool = "", val) {
      if (Number(this.association) == 2) {
        val.session_code = "";
      }

      this.association = "";

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
        this.t_timeThreeFive = setInterval(() => {
          this.timerThreeFive += 1;
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
      sessionStorage.setItem("chatImageFile", this.chatImageFile);
      this.chatImageFile = "";

      let response = null;
      let url =
        Number(this.chat_type) == 0 || Number(this.chat_type) == 1
          ? "api/chat/async_chat_session"
          : "api/chat/async_chat_completion";
      console.log(val, "--请求参数");
      this.controllerThreeFive = new AbortController();
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
        signal: this.controllerThreeFive.signal,
      });
      this.ordeAIList = [];

      console.log(response);
      if (Number(response.status) != 200) {
        response.json().then((res) => {
          this.codeHandleChange(res);
        });
        return;
      }

      this.sendValue = ""; // 清空发送栏内容
      const reader = response.body.getReader();

      this.association = "";

      while (true) {
        const { value, done } = await reader.read();
        if (done) {
          break;
        }
        if (value) {
          let stringStr = arr2str(value);
          let chatArr = stringStr.split("\r\n");
          this.isDetailThreeFive = false;
          // 信息清空
          chatArr.forEach((val) => {
            if (val != "") {
              let res = JSON.parse(val);
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
      this.isTimeThreeFive = false;
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
          this.replyThreeFive = replyStr;
          i++;
          // 定位到聊天最底部
          this.toBottom();
        } else {
          clearInterval(time);
        }
      }, 100);

      // 判断是否显示完毕
      setTimeout(() => {
        this.isfinishThreeFive = true; // 完成打字效果
        this.isBtnThreeFive = true;
        clearInterval(this.t_timeThreeFive);
        this.t_timeThreeFive = null;
      }, replyArr.length * 100);
    },

    toBottom(type = true) {
      // 定位到当前聊天地点
      this.$nextTick(() => {
        setTimeout(() => {
          var scrollTop = document.getElementById("chatCont");
          if (this.chatContScroll == "" || this.chatContScroll <= scrollTop.scrollTop) {
            scrollTop.scrollTop = scrollTop.scrollHeight;
            this.chatContScroll = scrollTop.scrollTop;
          }
        }, 200);
      });
    },

    // 重新回答
    resetController() {
      if (!this.isfinishThreeFive) {
        this.$message("当前问题还没回答完毕，请稍后再提问");
        return;
      }

      this.sendValue = this.chatList[this.chatList.length - 2].content;
      console.log(this.chatList[this.chatList.length - 2].content);
      this.chatList.splice(this.chatList.length - 2, 2);
      this.endController("", false);
      this.sendMsg("true");
    },

    // 终止回答
    endController(code, resetChat = true) {
      this.isfinishThreeFive = true;
      this.isBtnThreeFive = true;
      this.isTimeThreeFive = false;
      try {
        this.controllerThreeFive.abort();
      } catch (error) {}
      clearInterval(this.t_timeThreeFive);
      this.sessionRightNavCode = code;
      if (resetChat) {
        this.chatList[this.chatList.length - 1].timer = this.timerThreeFive;
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
        scenario_type: "mentor",
        image_url: this.oldchatImageFile,
      };
      this.isBtnThreeFive = false;
      this.isDetailThreeFive = false;
      this.isfinishThreeFive = false;
      this.replyThreeFive = "";
      this.supplyVisible = false;
      if (this.chatItem.timer) {
        this.timerThreeFive = this.chatItem.timer;
      } else {
        this.timerThreeFive = 0;
      }
      this.t_timeThreeFive = setInterval(() => {
        this.timerThreeFive += 1;
      }, 1000);
      this.vipAgainSend(key, val, item);
    },

    async vipAgainSend(key, valu = {}, item) {
      let msg = "继续";
      if (key == 2) {
        msg = this.supplyValue;
      }

      let val = null;
      let smg = [];
      this.chatList.forEach((v) => {
        smg.push({
          role: v.role,
          content: v.content,
        });
      });
      val = {
        chat_type: this.chat_type,
        session_code: localStorage.getItem("session_code"),
        chat_group_code: localStorage.getItem("chat_group_code"),
        msg_list: JSON.stringify(smg),
        image_url: this.oldchatImageFile,
        scenario_type: "mentor",
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
          markedContent: marked(this.supplyValue),
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
          markedContent: marked(this.supplyValue),
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
      console.log(val, "请求参数");
      this.controllerThreeFive = new AbortController();
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
        signal: this.controllerThreeFive.signal,
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
              this.talkMsgList(res);
              return;
            }
          });
        }
      }
    },

    // ai返回的数据处理
    talkMsgList(res) {
      console.log("----------------------------------------", res);
      /**
       * 35
       */
      this.msgCode = res.msg_code;
      if (Number(res.code) == 36003) {
        this.isfinishThreeFive = true;
        clearInterval(this.t_timeThreeFive);
        this.t_timeThreeFive = null;
        this.isTimeThreeFive = false;
        this.isBtnThreeFive = true;
        this.$message.error("关联对话必须为一问一答");
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
          this.isfinishThreeFive = true;
          clearInterval(this.t_timeThreeFive);
          this.t_timeThreeFive = null;
          this.isTimeThreeFive = false;
          this.isBtnThreeFive = true;
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

      // 35
      if (!this.isfinishThreeFive) {
        this.isTimeThreeFive = false;
        // if (res != "" && res.content != null) {
        //   if (res.finish_reason != "stop") {
        //     this.replyThreeFive =
        //       this.chatList[this.chatList.length - 1].content + res.content;
        //     this.chatList[this.chatList.length - 1].content =
        //       this.chatList[this.chatList.length - 1].content + res.content;
        //   }
        //   // 定位到聊天最底部
        //   this.toBottom();
        // }
        const renderer = new marked.Renderer();
        // 重写代码块渲染方法，使用highlight.js进行代码高亮
        renderer.code = (code, language) => {
          const validLanguage = hljs.getLanguage(language) ? language : "plaintext";
          const highlightedCode = hljs.highlight(validLanguage, code).value;
          return `<pre><code class="hljs ${validLanguage}">${highlightedCode}</code></pre>`;
        };
        if (res != "" && res.content != null) {
          // console.log(res.content,'文本')
          if (this.chat_type == "10") {
            this.$set(this.chatList[this.chatList.length - 1], "content", res.content);
            this.$set(
              this.chatList[this.chatList.length - 1],
              "markedContent",
              marked(res.content, { renderer })
            );
            this.replyChat = marked(res.content);
          } else {
            this.$set(
              this.chatList[this.chatList.length - 1],
              "content",
              this.chatList[this.chatList.length - 1].content + res.content
            );
            // this.chatList[this.chatList.length - 1].markedContent = marked(
            //   this.chatList[this.chatList.length - 1].content + res.content
            // );
            this.$set(
              this.chatList[this.chatList.length - 1],
              "markedContent",
              marked(this.chatList[this.chatList.length - 1].content + res.content, {
                renderer,
              })
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
          localStorage.setItem("session_code", res.session_code);
        }
        if (res.create_time != "" && res.create_time != null) {
          this.chatList[this.chatList.length - 1].create_time = res.create_time;
        }
        if (res.chat_group_code != "" && res.chat_group_code != null) {
          this.chatList[this.chatList.length - 1].chat_group_code = res.chat_group_code;
          localStorage.setItem("chat_group_code", res.chat_group_code);
        }
        if (
          res.finish_reason == "stop" ||
          res.finish_reason == 2 ||
          res.finish_reason === true
        ) {
          // console.log('完结了');
          this.isfinishThreeFive = true;
          this.isBtnThreeFive = true;
          // this.chatList[this.chatList.length-1].content = this.reply;
          for (let i = 0; i < 10; i++) {
            clearInterval(this.t_timeThreeFive);
          }
          this.t_timeThreeFive = null;
          this.chatList[this.chatList.length - 1].finish_reason = res.finish_reason;
          this.$store.dispatch("user/changeChatListLength", this.chatList.length);
          this.chatList[this.chatList.length - 1].timer = this.timerThreeFive;
          if (!localStorage.getItem("session_code")) {
            this.sessionRightNavCode = res.session_code;
          }
          this.chatList.forEach((v) => {
            v.markedContent = marked(v.content);
          });

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
          let type_name;
          if (this.chat_type == 4) type_name = "文心一言";
          else if (this.chat_type == 5) type_name = "讯飞星火";
          else if (this.chat_type == 8) type_name = "chatGLM";
          else if (this.chat_type == 10) type_name = "通义千问";
          else if (this.chat_type == 12) type_name = "360智脑";
          else if (this.chat_type == 1003) type_name = "豆包";
          else if (this.chat_type == 1001) type_name = "腾讯混元";
          else if (this.chat_type == 1004) type_name = "无忧秘书";
          submitFootprint({
            type_name,
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
        }
        // 保存最近使用
        if (res.finish_reason == "stop") {
          this.sessionRightNavCode = res.session_code;
        }
        if (res.role != "" && res.role != null) {
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

    codeHandleChange(res) {
      // if (response.status == '400') {
      this.isTimeThreeFive = false;
      this.isBtnThreeFive = true;
      this.isfinishThreeFive = true; // 完成打字效果
      clearInterval(this.t_timeThreeFive);
      this.t_timeThreeFive = null;

      if (Number(res.code) == 40013) {
        this.$refs.Register.registerVisible = true;
        this.$store.dispatch("user/GuessLogin");
      }
      if (
        (Number(res.code) == 30014 || Number(res.code) == 40022) &&
        this.loginInfo.role == "guess"
      ) {
        this.queryErrorMsg = res.msg;
        this.$refs.Register.registerVisible = true;
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
            type: "error",
            duration: 2000,
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
  },
};
</script>
<style scoped>
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
.domHover {
  cursor: pointer;
}

.main {
  width: 100%;
  height: 100%;
  padding: 0px;
  display: flex;
}

nav {
  /* min-width: 25%; */
  height: 100%;
  background: white;
  padding: 10px 20px;
  box-sizing: border-box;
  position: relative;
  overflow: hidden;
}

.nav-title {
  display: flex;
  padding-bottom: 4px;
  position: relative;
  width: 100%;
  height: 20px;
}

.nav-title div {
  color: #666;
  font-family: PingFang SC;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
}
.nav-title .history {
  position: absolute;
  right: 0px;
}
.nav-title .back {
  position: absolute;
  left: 10px;
  display: flex;
  align-items: center;
}
.nav-title .back span {
  margin-left: 2px;
}

.teacher-my {
  width: 100%;
  height: 148px;
  border-radius: 8px;
  background: linear-gradient(161deg, #c0d3fe -58.8%, #fff 45.69%);
  position: relative;
  padding: 12px 16px;
  box-sizing: border-box;
}

.teacher-my .my-title {
  color: #000;
  /* Drop Shadow */
  text-shadow: 0px 0px 2px rgba(0, 0, 0, 0.05);
  font-family: PingFang SC;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 150%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  /* 21px */
}
.teacher-my .my-title > div {
  color: #9b9b9b;
  font-family: PingFang SC;
  font-size: 13px;
  font-style: normal;
  font-weight: 400;
  line-height: 150%;
  margin-top: 2px;
  cursor: pointer;
}
.teacher-my .my-box {
  display: flex;
  position: relative;
  bottom: -10px;
}

.teacher-my .my-box > div:first-child {
  width: 90px;
  height: 90px;
  position: relative;
  border-radius: 10.455px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.my-box > div:first-child img {
  width: 90px;
  height: 90px;
  border-radius: 10.455px;
}

.my-box > div:first-child div {
  width: 100%;
  text-align: center;
  position: absolute;
  left: 50%;
  bottom: 5px;
  transform: translate(-50%);
  color: #fff;
  font-family: PingFang SC;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 150%;
  /* 21px */
  letter-spacing: 0.7px;
}

.teacher-my .my-box > div:last-child {
  height: 90px;
  padding-top: 10px;
  box-sizing: border-box;
  margin-left: 10px;
}

.teacher-my .my-box > div:last-child div:nth-child(1) {
  width: calc(100% - 5px);
  line-height: 27px;
  flex-shrink: 0;
  border-radius: 3px;
  background: #1f64ff;
  text-align: center;
  color: #fff;
  font-family: PingFang SC;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
}

.teacher-my .my-box > div:last-child div:nth-child(2) {
  margin-top: 11px;
  width: calc(100% - 6px);
  line-height: 25px;
  border: 1px solid #1f64ff;
  color: #1f64ff;
  font-family: PingFang SC;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  /* 21px */
  text-align: center;
}

.teacher-my .my-box > div:last-child div:nth-child(2):hover {
  cursor: pointer;
}

.teacher-my .my-box > div:last-child div:nth-child(3) {
  color: #9b9b9b;
  margin-top: 4px;
  font-family: PingFang SC;
  font-size: 10px;
  font-style: normal;
  font-weight: 400;
  line-height: 150%;
  /* 18px */
}

.teacher-say {
  margin-top: 12px;
  width: 100%;
  height: 90px;
  padding: 16px;
  box-sizing: border-box;
  position: relative;
  border-radius: 0px 8px 8px 8px;
  border: 1px solid #ececec;
  background: linear-gradient(161deg, #c0d3fe -58.8%, #fff 45.69%);
}

.teacher-say > img {
  width: 90px;
  height: 90px;
  position: absolute;
  right: 0;
  top: 0;
}

.teacher-say div img {
  width: 35px;
  height: 35px;
  border-radius: 50%;
  margin-right: 6px;
}

.teacher-say div div {
  color: #1f64ff;
  font-family: PingFang SC;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: 150%;
  /* 27px */
}

.teacher-say > div:last-child {
  margin-top: 6px;
  color: #242f49;

  font-family: PingFang SC;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 150%;
  /* 19.5px */
}

.teacher-AI {
  width: 100%;
  margin-top: 24px;
  padding: 12px 16px;
  padding-bottom: 0px;
  /* height: 188px; */
  flex-shrink: 0;
  border-radius: 8px;
  border: 1px solid #eee;
  background: white;
  display: inline-block;
  box-sizing: border-box;
}

.teacher-AI .box-title {
  /* width: 100%; */
  display: flex;
  justify-content: space-between;
}

.teacher-AI .box-title > div:first-child {
  color: #000;
  /* Drop Shadow */
  text-shadow: 0px 0px 2px rgba(0, 0, 0, 0.05);
  font-family: PingFang SC;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 150%;
  /* 21px */
}

.teacher-AI .box-title > div:last-child {
  color: #9b9b9b;

  font-family: PingFang SC;
  font-size: 13px;
  font-style: normal;
  font-weight: 400;
  line-height: 150%;
  margin-top: 2px;
  /* 19.5px */
}

.teacher-AI .box-title > div:last-child:hover {
  cursor: pointer;
}

.teacher-AI .box-content {
  width: 100%;
  height: 180px;
  margin-top: 6px;
  display: grid;
  justify-content: space-between;
  grid-template-columns: repeat(auto-fill, 90px);
  grid-gap: 0 1px;
  overflow-y: auto;
}

.teacher-AI .box-content .box-center {
  width: 90px;
  height: 90px;
  border-radius: 10px;
  position: relative;
  margin-right: 9px;
  margin-bottom: 9px;
}
::-webkit-scrollbar-thumb {
  /* background-color: #f2f2f2; */
  background-color: #dddddd;
}
.box-center:hover {
  cursor: pointer;
}

.box-content .box-center img {
  width: 90px;
  height: 90px;
  border-radius: 10px;
}

.box-content .box-center span {
  position: absolute;
  left: 50%;
  bottom: 5px;
  display: inline-block;
  width: 100%;
  text-align: center;
  transform: translate(-50%);
  color: #fff;
  font-family: PingFang SC;
  font-size: 11.5px;
  /* font-style: normal; */
  font-weight: 500;
  line-height: 150%;
  /* 21px */
  letter-spacing: 0.7px;
}

.box-content .box-center .edit_btn {
  width: 20px;
  height: 20px;
  border-radius: 0px 6px;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0px;
  right: 0px;
  display: none;
}

.box-center:hover .edit_btn {
  display: block;
  display: flex;
  justify-content: center;
  align-items: center;
}

.teacher-consultant {
  width: 100%;
  margin-top: 24px;
  box-sizing: border-box;
}

.teacher-consultant > div:last-child {
  width: 100%;
  height: calc(100vh - 657px - 100px);
  overflow-y: auto;
  margin-top: 10px;
}

.consultant-title {
  color: #000;
  text-shadow: 0px 0px 2px rgba(0, 0, 0, 0.05);
  font-family: PingFang SC;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 150%;
}

.consultant-box {
  margin-bottom: 10px;
  width: 100%;
  height: 86px;
  padding: 16px 12px;
  border-radius: 8px;
  background: #f7f7f9;
  display: flex;
  box-sizing: border-box;
  position: relative;
}

.consultant-box img {
  width: 54px;
  height: 54px;
  border-radius: 4px;
  margin-right: 12px;
}

.consultant-box > div {
  width: calc(100% - 54px - 12px);
  position: relative;
  display: flex;
  flex-direction: column;
  position: relative;
}

.consultant-box > div div:first-child {
  color: #000;
  width: 100%;
  font-family: PingFang SC;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 150%;
  position: absolute;
  top: 0px;
  /* 21px */
}

.consultant-box > div div:last-child {
  color: #24252b;
  font-family: PingFang SC;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 150%;
  position: absolute;
  bottom: 0px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}

section {
  width: 75%;
  height: calc(100%);
  background: #f1f2f5;
  display: flex;
  flex-direction: column;
  transition: width 0.2s;
  position: relative;
}
</style>
<style scoped>
.model-price {
  font-size: 12px;
  margin-top: 10px;
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
  height: calc(100% - 22px);
  display: flex;
  flex-direction: column;
  margin-left: 400px;
  /* transition: width .2s; */
}

.footer_cont {
  /* background: #fff; */
  width: calc(100% - 80px);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px 0 10px 20px;
  position: relative;
  bottom: 30px;
  margin-left: 20px;
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
  padding-left: 10px;
  background: #fff;
  border-radius: 10px;
  display: flex;
  align-items: center;
  position: relative;
}

.cg-chat-content {
  width: calc(100% - 120px);
  flex: 1;
  padding: 20px 60px;
  margin: auto;
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
