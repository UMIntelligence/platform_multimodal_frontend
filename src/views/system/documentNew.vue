<template>
  <div
    style="
      width: 100%;
      display: flex;
      height: 100%;
      position: relative;
      background-color: #f1f2f5;
    "
  >
    <div class="content">
      <GoBackNew style="margin-left: 10px"></GoBackNew>
      <div class="cg-chat-content" id="chatCont" ref="wrap">
        <div class="cg-chat-left">
          <div
            class="cg-right cg-user-pic"
            style="
              display: flex;
              justify-content: center;
              align-items: center;
              background-color: white;
            "
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              style="width: 27px; height: 27px"
              width="17"
              height="17"
              viewBox="0 0 27 27"
              fill="none"
            >
              <rect
                x="8.33203"
                y="1.88867"
                width="17"
                height="21"
                rx="1.77778"
                fill="#BAD4FB"
              />
              <g filter="url(#filter0_bi_8495_25588)">
                <rect
                  x="2.33203"
                  y="1.88867"
                  width="20"
                  height="23"
                  rx="1.77778"
                  fill="#608DFF"
                />
              </g>
              <path d="M2.66797 24.8887H26.668V26.6664H2.66797V24.8887Z" fill="white" />
              <rect
                x="7.33203"
                y="9.88867"
                width="7"
                height="1.78"
                rx="0.89"
                fill="white"
              />
              <rect
                x="7.33203"
                y="14.8887"
                width="5"
                height="1.78"
                rx="0.89"
                fill="white"
              />
              <defs>
                <filter
                  id="filter0_bi_8495_25588"
                  x="-15.4457"
                  y="-15.8891"
                  width="55.5556"
                  height="58.5556"
                  filterUnits="userSpaceOnUse"
                  color-interpolation-filters="sRGB"
                >
                  <feFlood flood-opacity="0" result="BackgroundImageFix" />
                  <feGaussianBlur in="BackgroundImageFix" stdDeviation="8.88889" />
                  <feComposite
                    in2="SourceAlpha"
                    operator="in"
                    result="effect1_backgroundBlur_8495_25588"
                  />
                  <feBlend
                    mode="normal"
                    in="SourceGraphic"
                    in2="effect1_backgroundBlur_8495_25588"
                    result="shape"
                  />
                  <feColorMatrix
                    in="SourceAlpha"
                    type="matrix"
                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                    result="hardAlpha"
                  />
                  <feOffset dy="1.77778" />
                  <feGaussianBlur stdDeviation="2.66667" />
                  <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
                  <feColorMatrix
                    type="matrix"
                    values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.55 0"
                  />
                  <feBlend
                    mode="normal"
                    in2="shape"
                    result="effect2_innerShadow_8495_25588"
                  />
                </filter>
              </defs>
            </svg>
          </div>
          <div class="as-cont-left" style="min-width: 425px">
            <div class="as_text_left">
              <div class="cg-chatbox cg-chatbox-left">
                <div class="left_tip">
                  <div>
                    欢迎来到文档对话，上传文档我即可进行文档内容的学习，开始<span
                      style="color: rgb(13, 153, 255)"
                      >上传文档</span
                    >试试吧！
                  </div>
                  <div>
                    <el-upload
                      class="upload-demo"
                      :on-success="handleAvatarSuccessA"
                      :on-change="handleAvatarChange"
                      :data="uploadData"
                      :action="httpUrls.loginUrl + 'api/user/oss_upload'"
                      :limit="1"
                      :headers="headerData"
                      :before-upload="beforeAvatarUploadA"
                      :file-list="fileList"
                    >
                      <div
                        style="
                          width: 276px;
                          line-height: 37px;
                          color: #1f64ff;
                          text-align: center;
                          font-weight: 500;
                          font-size: 15px;
                          border: 1px solid #1f64ff;
                          border-radius: 5px;
                          margin-top: 15px;
                        "
                      >
                        上传文档
                      </div>
                      <div
                        slot="tip"
                        class="el-upload__tip"
                        style="display: flex; justify-content: space-between"
                      >
                        <span>支持文件类型：pdf</span>
                        <span style="color: #999">6w算力/页</span>
                      </div>
                    </el-upload>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="cg-chat-left" v-if="file.file_id">
          <div
            class="cg-right cg-user-pic"
            style="
              display: flex;
              justify-content: center;
              align-items: center;
              background-color: white;
            "
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              style="width: 27px; height: 27px"
              width="17"
              height="17"
              viewBox="0 0 27 27"
              fill="none"
            >
              <rect
                x="8.33203"
                y="1.88867"
                width="17"
                height="21"
                rx="1.77778"
                fill="#BAD4FB"
              />
              <g filter="url(#filter0_bi_8495_25588)">
                <rect
                  x="2.33203"
                  y="1.88867"
                  width="20"
                  height="23"
                  rx="1.77778"
                  fill="#608DFF"
                />
              </g>
              <path d="M2.66797 24.8887H26.668V26.6664H2.66797V24.8887Z" fill="white" />
              <rect
                x="7.33203"
                y="9.88867"
                width="7"
                height="1.78"
                rx="0.89"
                fill="white"
              />
              <rect
                x="7.33203"
                y="14.8887"
                width="5"
                height="1.78"
                rx="0.89"
                fill="white"
              />
              <defs>
                <filter
                  id="filter0_bi_8495_25588"
                  x="-15.4457"
                  y="-15.8891"
                  width="55.5556"
                  height="58.5556"
                  filterUnits="userSpaceOnUse"
                  color-interpolation-filters="sRGB"
                >
                  <feFlood flood-opacity="0" result="BackgroundImageFix" />
                  <feGaussianBlur in="BackgroundImageFix" stdDeviation="8.88889" />
                  <feComposite
                    in2="SourceAlpha"
                    operator="in"
                    result="effect1_backgroundBlur_8495_25588"
                  />
                  <feBlend
                    mode="normal"
                    in="SourceGraphic"
                    in2="effect1_backgroundBlur_8495_25588"
                    result="shape"
                  />
                  <feColorMatrix
                    in="SourceAlpha"
                    type="matrix"
                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                    result="hardAlpha"
                  />
                  <feOffset dy="1.77778" />
                  <feGaussianBlur stdDeviation="2.66667" />
                  <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
                  <feColorMatrix
                    type="matrix"
                    values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.55 0"
                  />
                  <feBlend
                    mode="normal"
                    in2="shape"
                    result="effect2_innerShadow_8495_25588"
                  />
                </filter>
              </defs>
            </svg>
          </div>
          <div class="as-cont-left" style="min-width: 425px">
            <div class="as_text_left">
              <div class="cg-chatbox cg-chatbox-left">
                <div class="left_tip">
                  AI正在学习“{{ file.file_name }}”的内容，请向我提问吧
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- 文心一言 -->
        <div v-for="(item, index) in chatYiyanList" :key="index">
          <div>
            <!-- 左侧模板 -->
            <div class="cg-chat-left" v-if="item.role == 'assistant'">
              <el-checkbox
                v-if="isShowChecked"
                v-model="item.checked"
                style="margin-right: 18px; margin-top: 6px"
                @change="changeSendAnswer(item)"
              ></el-checkbox>
              <div style="display: flex; width: 100%">
                <div
                  class="cg-right cg-user-pic"
                  style="
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    background-color: white;
                  "
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    style="width: 27px; height: 27px"
                    width="17"
                    height="17"
                    viewBox="0 0 27 27"
                    fill="none"
                  >
                    <rect
                      x="8.33203"
                      y="1.88867"
                      width="17"
                      height="21"
                      rx="1.77778"
                      fill="#BAD4FB"
                    />
                    <g filter="url(#filter0_bi_8495_25588)">
                      <rect
                        x="2.33203"
                        y="1.88867"
                        width="20"
                        height="23"
                        rx="1.77778"
                        fill="#608DFF"
                      />
                    </g>
                    <path
                      d="M2.66797 24.8887H26.668V26.6664H2.66797V24.8887Z"
                      fill="white"
                    />
                    <rect
                      x="7.33203"
                      y="9.88867"
                      width="7"
                      height="1.78"
                      rx="0.89"
                      fill="white"
                    />
                    <rect
                      x="7.33203"
                      y="14.8887"
                      width="5"
                      height="1.78"
                      rx="0.89"
                      fill="white"
                    />
                    <defs>
                      <filter
                        id="filter0_bi_8495_25588"
                        x="-15.4457"
                        y="-15.8891"
                        width="55.5556"
                        height="58.5556"
                        filterUnits="userSpaceOnUse"
                        color-interpolation-filters="sRGB"
                      >
                        <feFlood flood-opacity="0" result="BackgroundImageFix" />
                        <feGaussianBlur in="BackgroundImageFix" stdDeviation="8.88889" />
                        <feComposite
                          in2="SourceAlpha"
                          operator="in"
                          result="effect1_backgroundBlur_8495_25588"
                        />
                        <feBlend
                          mode="normal"
                          in="SourceGraphic"
                          in2="effect1_backgroundBlur_8495_25588"
                          result="shape"
                        />
                        <feColorMatrix
                          in="SourceAlpha"
                          type="matrix"
                          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                          result="hardAlpha"
                        />
                        <feOffset dy="1.77778" />
                        <feGaussianBlur stdDeviation="2.66667" />
                        <feComposite
                          in2="hardAlpha"
                          operator="arithmetic"
                          k2="-1"
                          k3="1"
                        />
                        <feColorMatrix
                          type="matrix"
                          values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.55 0"
                        />
                        <feBlend
                          mode="normal"
                          in2="shape"
                          result="effect2_innerShadow_8495_25588"
                        />
                      </filter>
                    </defs>
                  </svg>
                </div>
                <div class="as-cont-left" style="min-width: 600px">
                  <!-- 文字模式 -->
                  <div class="as_text_left">
                    <div class="cg-chatbox cg-chatbox-left">
                      <div
                        v-if="t_timeYiyan != null && index == chatYiyanList.length - 1"
                        class="reply markdown-body"
                        :style="
                          !isfinishYiyan && index == chatYiyanList.length - 1
                            ? 'white-space: pre-wrap;'
                            : ''
                        "
                      >
                        {{
                          index == chatYiyanList.length - 1 &&
                          index != 0 &&
                          !isDetailYiyan
                            ? replyYiyan
                            : item.content
                        }}
                      </div>

                      <div
                        v-else
                        class="reply markdown-body"
                        :style="
                          !isfinishYiyan && index == chatYiyanList.length - 1
                            ? 'white-space: pre-wrap;'
                            : ''
                        "
                        v-html="
                          index == chatYiyanList.length - 1 &&
                          index != 0 &&
                          !isDetailYiyan
                            ? replyYiyan
                            : item.markedContent
                        "
                      ></div>

                      <!-- <div style="font-size: 14px;color: #999999;margin-top: 20px;" v-if="isfinishYiyan && index == chatYiyanList.length - 1 && !isClickChat">
                                          如果对此答案不满意，
                                          <span style="color: #1F64FF;cursor: pointer;" @click="toChatFouty">点我</span>
                                          可以尝试在40中提问
                                      </div> -->
                      <div class="comput">
                        <div style="display: flex; flex-wrap: nowrap">
                          <span
                            class="put_text"
                            v-if="!isfinishYiyan && index == chatYiyanList.length - 1"
                            ><img
                              class="await_img asd"
                              src="../../assets/images/await.gif"
                              alt=""
                            />思考中，</span
                          >
                          <span class="put_text" v-if="isfinishYiyan && !isClickChat"
                            ><img
                              class="await_img"
                              src="../../assets/images/Time_atack_light.png"
                              alt=""
                          /></span>
                          <!-- 回答结束时显示 -->
                          <span
                            class="put_text 1"
                            v-if="item.timer != false && isfinishYiyan"
                            >耗时:{{ item.timer }}秒</span
                          >
                          <!-- 回答中显示 -->
                          <span
                            class="put_text 2"
                            v-else-if="!isClickChat && index == chatYiyanList.length - 1"
                            >耗时:{{ timerYiyan }}秒</span
                          >
                          <span
                            class="put_text 3"
                            v-else-if="
                              !isfinishYiyan && index == chatYiyanList.length - 1
                            "
                            >耗时:{{ timerYiyan }}秒</span
                          >
                          <!-- 历史记录等显示 -->
                          <div class="put_text" v-if="index != chatYiyanList.length - 1">
                            总字数：{{
                              index == chatYiyanList.length - 1 &&
                              index != 0 &&
                              !isDetailYiyan
                                ? replyYiyan.length
                                : item.content.length
                            }}
                          </div>
                          <!-- 回答结束时显示 -->
                          <div class="put_text" v-else-if="isfinishYiyan">
                            总字数：{{
                              index == chatYiyanList.length - 1 &&
                              index != 0 &&
                              !isDetailYiyan
                                ? replyYiyan.length
                                : item.content.length
                            }}
                          </div>

                          <!-- <span class="put_text" v-if="isBtnYiyan">
                                                  <span>消耗{{ item.integral }}算力</span>
                                                  <span>：上行{{ item.prompt_tokens }}token 下行{{ item.completion_tokens }}token</span>
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
                          <img
                            class="help-setpon-img"
                            v-if="!item.help"
                            src="../../assets/images/helpNo.png"
                            alt=""
                            @click="showSetonHelpImg(5, true, item)"
                          />
                          <img
                            class="help-setpon-img"
                            v-if="item.help"
                            src="../../assets/images/helpYes.png"
                            alt=""
                            @click="showSetonHelpImg(5, false, item)"
                          />
                          <img
                            class="help-setpon-img"
                            v-if="!item.stepOn"
                            src="../../assets/images/stepOnNo.png"
                            alt=""
                            @click="showSetonHelpImg(6, true, item)"
                          />
                          <img
                            class="help-setpon-img"
                            v-if="item.stepOn"
                            src="../../assets/images/stepOnYes.png"
                            alt=""
                            @click="showSetonHelpImg(6, false, item)"
                          />
                          <img
                            class="cope-img"
                            src="../../assets/images/copyBlack.png"
                            @click="copyText(item.content)"
                            alt=""
                          />
                        </div>
                      </div>

                      <div class="prompt" v-if="isBtnYiyan">
                        当前内容为AI生成，不做任何决策使用！由此引发的一切后果，需自行承担，请知悉，已通过阿里云内容安全审核
                      </div>
                    </div>
                  </div>
                  <div class="chat_bot">
                    <span
                      class="operete_btn"
                      v-if="
                        isfinishYiyan &&
                        index == chatYiyanList.length - 1 &&
                        item.finish_reason == 'length'
                      "
                      @click="keepAs(1, item)"
                      >继续</span
                    >
                    <span
                      class="operete_btn"
                      v-if="isfinishYiyan && index == chatYiyanList.length - 1"
                      @click="optimizeAnswers(item, index)"
                      >优化本次回答</span
                    >
                    <span
                      class="reset_request"
                      v-if="!isfinishYiyan && index == chatYiyanList.length - 1"
                      @click="endController(item.session_code)"
                    >
                      <i class="el-icon-remove-outline"></i>
                      停止回答
                    </span>

                    <span
                      class="reset_request"
                      v-if="
                        isfinishYiyan && !isClickChat && index == chatYiyanList.length - 1
                      "
                      @click="resetController"
                      style="width: 73px"
                    >
                      <i class="el-icon-refresh"></i>
                      重试
                    </span>
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

                  <div
                    class="reset_request"
                    v-if="!isClickChat && isfinishYiyan"
                    @click="resetQuest(item)"
                  >
                    <i class="el-icon-chat-dot-round" style="font-size: 16px"></i>
                    重新提问
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- 账户没钱了 -->
        <div class="cg-chat-left" v-if="!isuser">
          <div
            class="cg-right cg-user-pic"
            style="
              display: flex;
              justify-content: center;
              align-items: center;
              background-color: white;
            "
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              style="width: 27px; height: 27px"
              width="17"
              height="17"
              viewBox="0 0 27 27"
              fill="none"
            >
              <rect
                x="8.33203"
                y="1.88867"
                width="17"
                height="21"
                rx="1.77778"
                fill="#BAD4FB"
              />
              <g filter="url(#filter0_bi_8495_25588)">
                <rect
                  x="2.33203"
                  y="1.88867"
                  width="20"
                  height="23"
                  rx="1.77778"
                  fill="#608DFF"
                />
              </g>
              <path d="M2.66797 24.8887H26.668V26.6664H2.66797V24.8887Z" fill="white" />
              <rect
                x="7.33203"
                y="9.88867"
                width="7"
                height="1.78"
                rx="0.89"
                fill="white"
              />
              <rect
                x="7.33203"
                y="14.8887"
                width="5"
                height="1.78"
                rx="0.89"
                fill="white"
              />
              <defs>
                <filter
                  id="filter0_bi_8495_25588"
                  x="-15.4457"
                  y="-15.8891"
                  width="55.5556"
                  height="58.5556"
                  filterUnits="userSpaceOnUse"
                  color-interpolation-filters="sRGB"
                >
                  <feFlood flood-opacity="0" result="BackgroundImageFix" />
                  <feGaussianBlur in="BackgroundImageFix" stdDeviation="8.88889" />
                  <feComposite
                    in2="SourceAlpha"
                    operator="in"
                    result="effect1_backgroundBlur_8495_25588"
                  />
                  <feBlend
                    mode="normal"
                    in="SourceGraphic"
                    in2="effect1_backgroundBlur_8495_25588"
                    result="shape"
                  />
                  <feColorMatrix
                    in="SourceAlpha"
                    type="matrix"
                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                    result="hardAlpha"
                  />
                  <feOffset dy="1.77778" />
                  <feGaussianBlur stdDeviation="2.66667" />
                  <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
                  <feColorMatrix
                    type="matrix"
                    values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.55 0"
                  />
                  <feBlend
                    mode="normal"
                    in2="shape"
                    result="effect2_innerShadow_8495_25588"
                  />
                </filter>
              </defs>
            </svg>
          </div>
          <div class="as-cont-left 123">
            <div class="as_text_left">
              <div class="cg-chatbox cg-chatbox-left">
                <div class="left_tip">{{ queryErrorMsg }}</div>
                <div
                  style="margin-top: 10px; display: flex; justify-content: space-between"
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
          <div
            class="cg-right cg-user-pic"
            style="
              display: flex;
              justify-content: center;
              align-items: center;
              background-color: white;
            "
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              style="width: 27px; height: 27px"
              width="17"
              height="17"
              viewBox="0 0 27 27"
              fill="none"
            >
              <rect
                x="8.33203"
                y="1.88867"
                width="17"
                height="21"
                rx="1.77778"
                fill="#BAD4FB"
              />
              <g filter="url(#filter0_bi_8495_25588)">
                <rect
                  x="2.33203"
                  y="1.88867"
                  width="20"
                  height="23"
                  rx="1.77778"
                  fill="#608DFF"
                />
              </g>
              <path d="M2.66797 24.8887H26.668V26.6664H2.66797V24.8887Z" fill="white" />
              <rect
                x="7.33203"
                y="9.88867"
                width="7"
                height="1.78"
                rx="0.89"
                fill="white"
              />
              <rect
                x="7.33203"
                y="14.8887"
                width="5"
                height="1.78"
                rx="0.89"
                fill="white"
              />
              <defs>
                <filter
                  id="filter0_bi_8495_25588"
                  x="-15.4457"
                  y="-15.8891"
                  width="55.5556"
                  height="58.5556"
                  filterUnits="userSpaceOnUse"
                  color-interpolation-filters="sRGB"
                >
                  <feFlood flood-opacity="0" result="BackgroundImageFix" />
                  <feGaussianBlur in="BackgroundImageFix" stdDeviation="8.88889" />
                  <feComposite
                    in2="SourceAlpha"
                    operator="in"
                    result="effect1_backgroundBlur_8495_25588"
                  />
                  <feBlend
                    mode="normal"
                    in="SourceGraphic"
                    in2="effect1_backgroundBlur_8495_25588"
                    result="shape"
                  />
                  <feColorMatrix
                    in="SourceAlpha"
                    type="matrix"
                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                    result="hardAlpha"
                  />
                  <feOffset dy="1.77778" />
                  <feGaussianBlur stdDeviation="2.66667" />
                  <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
                  <feColorMatrix
                    type="matrix"
                    values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.55 0"
                  />
                  <feBlend
                    mode="normal"
                    in2="shape"
                    result="effect2_innerShadow_8495_25588"
                  />
                </filter>
              </defs>
            </svg>
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
          <!-- 获取中 -->
          <div
            class="cg-chat-left"
            v-if="isTimeYiyan && chat_type == 4"
            style="margin-bottom: 20px"
          >
            <div
              class="cg-right cg-user-pic"
              style="
                display: flex;
                justify-content: center;
                align-items: center;
                background-color: white;
              "
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                style="width: 27px; height: 27px"
                width="17"
                height="17"
                viewBox="0 0 27 27"
                fill="none"
              >
                <rect
                  x="8.33203"
                  y="1.88867"
                  width="17"
                  height="21"
                  rx="1.77778"
                  fill="#BAD4FB"
                />
                <g filter="url(#filter0_bi_8495_25588)">
                  <rect
                    x="2.33203"
                    y="1.88867"
                    width="20"
                    height="23"
                    rx="1.77778"
                    fill="#608DFF"
                  />
                </g>
                <path d="M2.66797 24.8887H26.668V26.6664H2.66797V24.8887Z" fill="white" />
                <rect
                  x="7.33203"
                  y="9.88867"
                  width="7"
                  height="1.78"
                  rx="0.89"
                  fill="white"
                />
                <rect
                  x="7.33203"
                  y="14.8887"
                  width="5"
                  height="1.78"
                  rx="0.89"
                  fill="white"
                />
                <defs>
                  <filter
                    id="filter0_bi_8495_25588"
                    x="-15.4457"
                    y="-15.8891"
                    width="55.5556"
                    height="58.5556"
                    filterUnits="userSpaceOnUse"
                    color-interpolation-filters="sRGB"
                  >
                    <feFlood flood-opacity="0" result="BackgroundImageFix" />
                    <feGaussianBlur in="BackgroundImageFix" stdDeviation="8.88889" />
                    <feComposite
                      in2="SourceAlpha"
                      operator="in"
                      result="effect1_backgroundBlur_8495_25588"
                    />
                    <feBlend
                      mode="normal"
                      in="SourceGraphic"
                      in2="effect1_backgroundBlur_8495_25588"
                      result="shape"
                    />
                    <feColorMatrix
                      in="SourceAlpha"
                      type="matrix"
                      values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                      result="hardAlpha"
                    />
                    <feOffset dy="1.77778" />
                    <feGaussianBlur stdDeviation="2.66667" />
                    <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
                    <feColorMatrix
                      type="matrix"
                      values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.55 0"
                    />
                    <feBlend
                      mode="normal"
                      in2="shape"
                      result="effect2_innerShadow_8495_25588"
                    />
                  </filter>
                </defs>
              </svg>
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
                    <span class="put_text">耗时:{{ timerYiyan }}秒</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <span
            class="reset_request query-reset_request"
            v-if="isTimeYiyan && chat_type == 4"
            @click="endController('', false)"
          >
            <i class="el-icon-remove-outline"></i>
            停止回答
          </span>
        </div>
      </div>

      <div class="footer_cont">
        <div class="priceToken">17.4w算力/次</div>
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
            <div class="mask" style="display: flex; justify-content: flex-end">
              <el-button
                class="send_img"
                style="height: 32px; width: 70px"
                type="primary"
                v-if="chat_type == 4"
                @click="isBtnYiyan ? sendMsg() : sendMsg2()"
                >发送</el-button
              >
            </div>
          </div>

          <div class="association" v-if="isShowassociation" style="z-index: 10000">
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
            placeholder="请输入您要优化的内容"
            v-model="sendValue"
          ></el-input>
        </div>

        <span slot="footer" class="chat-dialog-footer" @click="sendMsg('reset')">
          发送
        </span>
      </el-dialog>

      <!-- 注册组件 -->
      <Register ref="Register"></Register>

      <!-- 算力不足提醒 -->
      <remind ref="remind"></remind>
    </div>
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
import { requestFile, getUserFile } from "../../api/document";
import { Line } from "echarts/lib/util/graphic";
import {
  creatChat,
  chatDetail,
  creatDraw,
  questionSetRecommend,
  submitFootprint,
} from "../../api/chatMG";
import { recommend, chatLikes, promptsRecommend } from "../../api/prompts";
import TemplateSelect from "../../components/dialog/templateSelect";
import Register from "../../components/register";
import rightNav from "../../components/rightNav";
import GoBackNew from "../../components/goBack";

import { mapGetters } from "vuex";

import { marked } from "marked";
import hljs from "highlight.js";

import pay from "../../components/pay";
import remind from "../../components/remind.vue";
import { textDecoder, arr2str } from "../../utils/download";
export default {
  name: "chat",
  data() {
    return {
      headerData: {},
      remind: "",
      //文件上传
      uploadData: {
        image: null,
        image_name: null,
        oss_dir: "static",
        cate: "mentor_image-list",
      },
      file: { file_id: null, file_name: null }, //上传后文件ID
      fileList: [],
      httpUrls,
      isSahowUploadPicture: false,
      isShowRightNav: true,
      chatImageFile: "", // 上传图片的地址
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
      chat_type: 4, // ai35: 0; ai40: 1
      AIname: 4, // ai id
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
      reply360: "", // 实时回答 / 商汤

      timerThreeFive: 0, // 定时器的时间 / 35
      timerFourZero: 0, // 定时器的时间 / 40
      timerYiyan: 0, // 定时器的时间 / 文心一言
      timerXunfei: 0, // 定时器的时间 / 讯飞星火
      timerClaude: 0, // 定时器的时间 / Claude
      timerChatGLM: 0, // 定时器的时间 / ChatGLM
      timerTongyi: 0, // 定时器的时间 / 通义千问
      timerShangtang: 0, // 定时器的时间 / 商汤
      timer360: 0, // 定时器的时间 / 360

      t_timeThreeFive: null, // 定时器
      t_timeFourZero: null, // 定时器
      t_timeYiyan: null, // 定时器
      t_timeXunfei: null, // 定时器
      t_timeClaude: null, // 定时器
      t_timeChatGLM: null, // 定时器
      t_timeTongyi: null, // 定时器
      t_timeShangtang: null, // 定时器
      t_time360: null, // 定时器

      isTimeThreeFive: false, // 开启获取中对话框 / 35
      isTimeFourZero: false, // 开启获取中对话框 / 40
      isTimeYiyan: false, // 开启获取中对话框 / 文心一言
      isTimeXunfei: false, // 开启获取中对话框 / 讯飞星火
      isTimeClaude: false, // 开启获取中对话框 / 讯飞星火
      isTimeChatGLM: false, // 开启获取中对话框 / ChatGLM
      isTimeTongyi: false, // 开启获取中对话框 / 通义千问
      isTimeShangtang: false, // 开启获取中对话框 / 商汤
      isTime360: false, // 开启获取中对话框 / 360

      // isfinish: true,
      isfinishThreeFive: true, // 完成打字效果 / 35
      isfinishFourZero: true, // 完成打字效果 / 40
      isfinishYiyan: true, // 完成打字效果 / 文心一言
      isfinishXunfei: true, // 完成打字效果 / 讯飞星火
      isfinishClaude: true, // 完成打字效果 / 讯飞星火
      isfinishChatGLM: true, // 完成打字效果 / ChatGLM
      isfinishTongyi: true, // 完成打字效果 / 通义千问
      isfinishShangtang: true, // 完成打字效果 / 商汤
      isfinish360: true, // 完成打字效果 / 商汤

      isBtnThreeFive: true, // 防止重新发送
      isBtnFourZero: true, // 防止重新发送
      isBtnYiyan: true, // 防止重新发送
      isBtnXunfei: true, // 防止重新发送
      isBtnClaude: true, // 防止重新发送
      isBtnChatGLM: true, // 防止重新发送
      isBtnTongyi: true, // 防止重新发送
      isBtnShangtang: true, // 防止重新发送
      isBtn360: true, // 防止重新发送

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
      isDetail360: false,

      qsList: {}, // 热词

      chatList: [], //3.5数据
      chatVipList: [], // 4.0数据
      chatYiyanList: [], // 文心一言数据
      chatXunfeiList: [], // 讯飞星火数据
      chatClaudeList: [], // 讯飞星火数据
      chatChatGLMList: [], // 讯飞星火数据
      chatTongyiList: [], // 讯飞星火数据
      chatShangtangList: [], // 讯飞星火数据
      chat360List: [], // 讯飞星火数据

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
      isShowTemplate360: true, // 热词推荐

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

      controllerThreeFive: null, // 用于终止fetch请求 / 35
      controllerFourZreo: null, // 用于终止fetch请求 / 40
      controllerYiyan: null, // 用于终止fetch请求 / 文心一言
      controllerXunfei: null, // 用于终止fetch请求 / 讯飞星火
      controllerClaude: null, // 用于终止fetch请求 / 讯飞星火
      controllerChatGLM: null, // 用于终止fetch请求 / 讯飞星火
      controllerTongyi: null, // 用于终止fetch请求 / 讯飞星火
      controllerShangtang: null, // 用于终止fetch请求 / 讯飞星火
      controller360: null, // 用于终止fetch请求 / 讯飞星火

      startNewChat35: false, // 开启新会话35
      startNewChat40: false, // 开启新会话40
      startNewChatYiyan: false, // 开启新会话文心一言
      startNewChatXunfei: false, // 开启新会话讯飞星火
      startNewChatClaude: false, // 开启新会话讯飞星火
      startNewChatChatGLM: false, // 开启新会话讯飞星火
      startNewChatTongyi: false, // 开启新会话讯飞星火
      startNewChatShangtang: false, // 开启新会话讯飞星火
      startNewChat360: false, // 开启新会话360

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
    remind,
    GoBackNew,
  },
  computed: {
    ...mapGetters(["userInfoData", "contactService"]),
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
    isTimeThreeFive: {
      deep: true,
      handler() {
        if (this.isTimeThreeFive) {
          this.AINameDisabled = true;
        } else {
          this.AINameDisabled = false;
        }
      },
    },
    isTimeFourZero: {
      deep: true,
      handler() {
        if (this.isTimeFourZero) {
          this.AINameDisabled = true;
        } else {
          this.AINameDisabled = false;
        }
      },
    },
    isTimeYiyan: {
      deep: true,
      handler() {
        if (this.isTimeYiyan) {
          this.AINameDisabled = true;
        } else {
          this.AINameDisabled = false;
        }
      },
    },
    isTimeXunfei: {
      deep: true,
      handler() {
        if (this.isTimeXunfei) {
          this.AINameDisabled = true;
        } else {
          this.AINameDisabled = false;
        }
      },
    },
    isTimeClaude: {
      deep: true,
      handler() {
        if (this.isTimeClaude) {
          this.AINameDisabled = true;
        } else {
          this.AINameDisabled = false;
        }
      },
    },
    isTimeChatGLM: {
      deep: true,
      handler() {
        if (this.isTimeChatGLM) {
          this.AINameDisabled = true;
        } else {
          this.AINameDisabled = false;
        }
      },
    },
    isTimeTongyi: {
      deep: true,
      handler() {
        if (this.isTimeTongyi) {
          this.AINameDisabled = true;
        } else {
          this.AINameDisabled = false;
        }
      },
    },
    isTimeShangtang: {
      deep: true,
      handler() {
        if (this.isTimeShangtang) {
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
        this.chatVipList = [];
        this.chatYiyanList = [];
        this.chatXunfeiList = [];
        this.chatClaudeList = [];
        this.chatChatGLMList = [];
        this.chatTongyiList = [];
        this.chatShangtangList = [];
        this.queryQuestionSetRecommend();
      },
    },
    isShowassociation: {
      deep: true,
      handler() {
        if (this.isShowassociation && this.association == "") {
          if (this.chat_type == 4) {
            this.isBtnYiyan = false;
          }
        }
      },
    },
    association: {
      deep: true,
      handler() {
        if (this.association != "") {
          if (this.chat_type == 4) {
            this.isBtnYiyan = true;
          }
        }
        if (Number(this.association) == 2) {
          this.isClickChat = false;
          if (this.chat_type == 4) {
            clearInterval(this.t_timeYiyan);
            this.chatYiyanList = [];
            this.$store.dispatch("user/changeChatListLength", this.chatYiyanList.length);
          }
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
    textAreaLength: {
      deep: true,
      handler() {
        if (this.chat_type == 0) {
          if (this.textAreaLength.length >= 2001) {
            this.$message.error("文字不得超过2000字");
          }
        } else {
          if (this.textAreaLength.length >= 2001) {
            this.$message.error("文字不得超过2000字");
          }
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
    chatVipList: {
      deep: true,
      handler() {
        if (this.chatVipList.length == 0) {
          this.startNewChat40 = false;
        } else {
          this.startNewChat40 = true;
        }
      },
    },
    chatYiyanList: {
      deep: true,
      handler() {
        if (this.chatYiyanList.length == 0) {
          this.startNewChatYiyan = false;
        } else {
          this.startNewChatYiyan = true;
        }
      },
    },
    chatXunfeiList: {
      deep: true,
      handler() {
        if (this.chatXunfeiList.length == 0) {
          this.startNewChatXunfei = false;
        } else {
          this.startNewChatXunfei = true;
        }
      },
    },
    chatClaudeList: {
      deep: true,
      handler() {
        if (this.chatClaudeList.length == 0) {
          this.startNewChatClaude = false;
        } else {
          this.startNewChatClaude = true;
        }
      },
    },
    chatChatGLMList: {
      deep: true,
      handler() {
        if (this.chatChatGLMList.length == 0) {
          this.startNewChatChatGLM = false;
        } else {
          this.startNewChatChatGLM = true;
        }
      },
    },
    chatTongyiList: {
      deep: true,
      handler() {
        if (this.chatTongyiList.length == 0) {
          this.startNewChatTongyi = false;
        } else {
          this.startNewChatTongyi = true;
        }
      },
    },
    chatShangtangList: {
      deep: true,
      handler() {
        if (this.chatShangtangList.length == 0) {
          this.startNewChatShangtang = false;
        } else {
          this.startNewChatShangtang = true;
        }
      },
    },
  },

  created() {
    let userInfo = JSON.parse(localStorage.getItem("userInfo"));
    this.headerData.authorization = userInfo.token
    this.headerData.role = userInfo.role
    this.updataRightList = Number(this.chat_type);
    this.loginInfo = JSON.parse(localStorage.getItem("userInfo"));
    this.$root.Bus.$on("selectChat", (value) => {
      // 接收点击相应会话标识
      this.chatList = [];
      this.$store.dispatch("user/changeChatListLength", this.chatList.length);
      this.chatVipList = [];
      this.$store.dispatch("user/changeChatListLength", this.chatVipList.length);
      this.chatYiyanList = [];
      this.$store.dispatch("user/changeChatListLength", this.chatYiyanList.length);
      this.chatXunfeiList = [];
      this.$store.dispatch("user/changeChatListLength", this.chatXunfeiList.length);
      this.chatClaudeList = [];
      this.$store.dispatch("user/changeChatListLength", this.chatClaudeList.length);
      this.chatChatGLMList = [];
      this.$store.dispatch("user/changeChatListLength", this.chatChatGLMList.length);
      this.chatTongyiList = [];
      this.$store.dispatch("user/changeChatListLength", this.chatTongyiList.length);
      this.chatShangtangList = [];
      this.$store.dispatch("user/changeChatListLength", this.chatShangtangList.length);
      this.getDetail(value);
    });

    this.$root.Bus.$on("delChat", (value) => {
      // 清空历史会话
      this.chatList = [];
      this.$store.dispatch("user/changeChatListLength", this.chatList.length);
      this.chatVipList = [];
      this.$store.dispatch("user/changeChatListLength", this.chatVipList.length);
      this.chatYiyanList = [];
      this.$store.dispatch("user/changeChatListLength", this.chatYiyanList.length);
      this.chatXunfeiList = [];
      this.$store.dispatch("user/changeChatListLength", this.chatXunfeiList.length);
      this.chatClaudeList = [];
      this.$store.dispatch("user/changeChatListLength", this.chatClaudeList.length);
      this.chatChatGLMList = [];
      this.$store.dispatch("user/changeChatListLength", this.chatChatGLMList.length);
      this.chatTongyiList = [];
      this.$store.dispatch("user/changeChatListLength", this.chatTongyiList.length);
      this.chatShangtangList = [];
      this.$store.dispatch("user/changeChatListLength", this.chatShangtangList.length);
      if (this.chat_type == 4) {
        this.isTimeYiyan = false;
      }
    });
    localStorage.setItem("session_code", "");
    localStorage.setItem("session_code1", "");
    localStorage.setItem("session_code4", "");
    localStorage.setItem("session_code5", "");
    localStorage.setItem("session_code7", "");
    localStorage.setItem("session_code8", "");
    localStorage.setItem("session_code10", "");
    localStorage.setItem("session_code11", "");
    localStorage.setItem("session_code12", "");
    this.queryQuestionSetRecommend();
  },

  mounted() {
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

    if (this.$route.params.item != undefined) {
      this.sendValue = this.$route.params.item;
      this.promptsId = this.$route.params.item.prompts_id;
      this.chat_type = Number(this.$route.params.id);
      this.AIname = Number(this.$route.params.id);
      if (this.$route.params.sendMsg) {
        this.sendMsg();
      }
    }
    this.$store.dispatch("id/setAIChatname", this.AIname);

    if (this.$route.params.id != undefined && this.$route.params.code != undefined) {
      this.getDetail(this.$route.params.code);
      this.AIname = this.$route.params.id;
      this.chat_type = this.$route.params.id;
    }

    if (this.$route.query.id != undefined) {
      let aiN = this.$route.query.id;
      if (Number(aiN) != 0 && Number(aiN) != 1 && Number(aiN) != 4 && Number(aiN) != 5) {
        aiN = 0;
      }
      this.AIname = aiN;
      this.chat_type = aiN;
    }
    if (this.$route.params.speakId != undefined && this.$route.params.id != undefined) {
      this.AIname = this.$route.params.id;
      this.chat_type = this.$route.params.id;
      this.updataChatList(this.$route.params.speakId);
    }
    if (this.$route.query.value) {
      this.AIname = this.$route.query.value;
    }
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
    // 素材图片上传
    handleAvatarSuccessA(res, file) {
      console.log(file, "文件上传成功");
      let userInfo = JSON.parse(localStorage.getItem("userInfo"));
      let data = {
        file_url: file.response.data.new_url,
        file_name: file.name,
        user_id: userInfo.user_id,
      };
      requestFile(data).then((res) => {
        console.log("杰哥文件上传", res);
        if (res.code == 20000) {
          this.file = Object.assign(this.file, { ...res.data });
        } else if (res.code == 30033) {
          this.$message.error("算力不足");
          this.$refs.remind.centerDialogVisible = true;
        }
      });
    },
    // 文件上传前
    beforeAvatarUploadA(file) {
      let index = file.name.indexOf(".");
      let str = file.name.split(".").pop();
      this.uploadData.image_name = file.name;
      if (str != "pdf") {
        this.$message.error("文件仅支持pdf一种类型!");
        return false;
      }
    },
    handleAvatarChange(file, fileList) {
      this.uploadData.image = file.raw;
      this.uploadData.image_name = file.name;
    },
    clearUploadImage() {
      this.isSahowUploadPicture = false;
      this.chatImageFile = "";
    },
    isShowRightSidbar(bool) {
      this.isShowRightNav = bool;
    },
    handleChangeFile(file, fileList) {
      this.blueprintReadingFile.image = file.raw;
      this.blueprintReadingFile.image_name = file.name;
    },
    handleSuccessFile(response, file, fileList) {
      this.chatImageFile = response.data.new_url;
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
      if (this.chat_type == 4) {
        this.isShowTemplateYiyan = false;
        if (!this.isfinishYiyan) {
          clearInterval(this.t_timeYiyan);
          this.isfinishYiyan = true;
          this.isBtnYiyan = true;
          try {
            this.controllerYiyan.abort();
          } catch (error) {}
        }
      }
      this.getDetail(code);
    },
    huanYiPi() {
      this.queryQuestionSetRecommend();
    },

    // 获取热词
    getRecommend() {
      recommend("").then((res) => {
        if (res.data != null) {
          this.qsList = res.data;
        } else if (res.code == 40013) {
          this.$refs.Register.registerVisible = true;
        }
      });
    },

    // 获取会话详情
    getDetail(code) {
      if (this.chat_type == 4) {
        this.isDetailYiyan = true;
        this.isTimeYiyan = false;
        this.isfinishYiyan = true;
        this.chatYiyanList = [];
        this.isShowTemplateYiyan = false;
      }
      this.isFoulLanguage = false;
      this.ordeAIList = [];
      const renderer = new marked.Renderer();
      // 重写代码块渲染方法，使用highlight.js进行代码高亮
      renderer.code = (code, language) => {
        const validLanguage = hljs.getLanguage(language) ? language : "plaintext";
        const highlightedCode = hljs.highlight(validLanguage, code).value;
        return `<pre><code class="hljs ${validLanguage}">${highlightedCode}</code></pre>`;
      };
      //获取会话详情
      chatDetail(code)
        .then((res) => {
          if (res.code == 20000) {
            let arr = res.data;
            arr.forEach((item, index) => {
              if (item.chat_type == 5) {
                localStorage.setItem("session_code4", code);
                localStorage.setItem("chat_group_code4", item.chat_group_code);
                this.chatYiyanList.push({
                  ...item,
                  help: item.is_likes == 1 ? true : false,
                  stepOn: item.is_likes == 2 ? true : false,
                  markedContent: marked(item.content, { renderer }),
                  id: this.chatYiyanList.length,
                  timer: false,
                });
                this.$store.dispatch(
                  "user/changeChatListLength",
                  this.chatYiyanList.length
                );
              }
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
      if (this.chat_type == 4) {
        if (!this.isfinishYiyan) {
          this.$message("当前问题还没回答完毕，请稍后再提问");
          return;
        }
      }
      this.supplyVisible = true;
      this.chatItem = { ...item, chatIndex: index };
      this.supplyValue = "";
    },

    // 开启新会话
    resetNewChat(aiId) {
      if (aiId == 4) {
        if (this.chatYiyanList.length == 0) return;
        this.chatYiyanList = [];
        this.isShowTemplateYiyan = true;
        this.$store.dispatch("user/changeChatListLength", 0);
        localStorage.setItem("session_code4", "");
        localStorage.setItem("chat_group_code4", "");
      }
      this.isuser = true;
      this.endController("", false); // 终止回答
      this.randomStr = Math.random();
      this.isShowChecked = false;
      this.isShowassociation = false;
      this.isClickChat = false;
      this.msgCode = "";
      if (aiId == 4) {
        this.isTimeYiyan = false;
      }
      this.sendValue = "";
    },

    resetQuest(item) {
      if (this.chat_type == 4) {
        if (!this.isfinishYiyan) {
          this.$message("当前问题还没回答完毕，请稍后再提问");
          return;
        }
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
      if (!this.file.file_id) {
        this.$message({
          type: "error",
          message: "暂未识别到您上传的文档，请稍后重试",
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
        if (this.chat_type == 0) {
          if (msgList.length >= "2001") {
            this.$message.error("文字不得超过2000字");
            return;
          }
        } else {
          if (msgList.length >= "2001") {
            this.$message.error("文字不得超过2000字");
            return;
          }
        }
      }
      this.vipSend(bool);
    },

    // 4.0信息发送
    async vipSend(bool = "") {
      // 重试/优化/重新提问等不需要关联上下文
      if (bool != "true" && bool != "reset" && bool != "toChatFouty") {
        if (this.chat_type == 4) {
          if (!this.isShowassociation && this.chatYiyanList.length != 0) {
            this.isShowassociation = !this.isShowassociation;
            return;
          }
          this.chatYiyanList.forEach((v) => {
            v.checked = false;
          });
        }
      }
      this.isFoulLanguage = false;
      this.isShowassociation = false;
      this.isShowChecked = false;
      this.supplyVisible = false;

      this.isShow = true; // 快速提问
      if (this.chat_type == 4) {
        this.isBtnYiyan = false; // 是否允许重发
        this.isDetailYiyan = false;
        this.isfinishYiyan = false; // 完成打字效果
        this.replyYiyan = "";
        this.isShowTemplateYiyan = false; // 关闭热词
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
      if (this.chat_type == 4) {
        this.chatYiyanList.push({ ...sendVal, id: this.chatYiyanList.length }); // id：用于关联上下文时的排序，防止顺序错乱导致接口返回的信息错误
        this.$store.dispatch("user/changeChatListLength", this.chatYiyanList.length);
      }

      this.toBottom();

      // this.isTime = true; // 思考中
      if (this.chat_type == 4) {
        this.isTimeYiyan = true;
        this.replyYiyan = "";
      }
      if (bool != "toChatFouty") {
        if (this.chat_type == 4) {
          this.timerYiyan = 0;
          this.t_timeYiyan = setInterval(() => {
            this.timerYiyan += 1;
          }, 1000);
        }
      }
      let val = null;
      if (this.chat_type == 4) {
        val = {
          chat_type: this.chat_type,
          session_code: localStorage.getItem("session_code4") || "",
          chat_group_code: "",
          msg_list: JSON.stringify([
            {
              role: "user",
              content: this.sendValue,
              images: this.chatImageFile != "" ? [this.chatImageFile] : [],
            },
          ]),
        };
        // 重试
        if (bool == "true") {
          let dataes = [];
          this.chatYiyanList.forEach((v) => {
            if (v.chat_group_code == this.chatItem.chat_group_code) {
              dataes.push({
                role: v.role,
                content: v.content,
              });
            }
          });
          val.msg_list = JSON.stringify([
            ...dataes,
            {
              role: "user",
              content: this.sendValue,
              images:
                sessionStorage.getItem("chatImageFile") != ""
                  ? [sessionStorage.getItem("chatImageFile")]
                  : [],
            },
          ]);
          val.chat_group_code = localStorage.getItem("chat_group_code4");
        }
      }
      // 关联上下文时，拿到对应的值然后清空对应的数据
      if (Number(this.association) == 1) {
        if (this.chat_type == 4) {
          let historyList = [];
          this.chatYiyanList.forEach((v, i) => {
            if (i != this.chatYiyanList.length - 1) {
              historyList.push({
                role: v.role,
                content: v.content,
              });
            }
          });
          val = {
            chat_type: this.chat_type,
            session_code: localStorage.getItem("session_code4") || "",
            chat_group_code: "",
            msg_list: JSON.stringify([
              ...historyList,
              {
                role: "user",
                content: this.sendValue,
                images: this.chatImageFile != "" ? [this.chatImageFile] : [],
              },
            ]),
          };
        }
        this.ordeAIList = [];
      }
      if (Number(this.association) == 2) {
        val.session_code = "";
      }

      this.association = "";

      if (this.chat_type == 4) {
        this.chatYiyanList.push({
          //新构造一个对话内容
          session_code: "",
          create_time: "",
          chat_group_code: "",
          finish_reason: "",
          role: "",
          content: "",
          help: false, // 点赞
          stepOn: false, // 点踩
          id: this.chatYiyanList.length,
          timer: false,
        });
      }
      if (bool == "toChatFouty") {
        if (this.chat_type == 4) {
          this.t_timeYiyan = setInterval(() => {
            this.timerYiyan += 1;
          }, 1000);
        }
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
      let requestData = {
        file_id: this.file.file_id,
        user_id: JSON.parse(localStorage.getItem("userInfo")).user_id,
        question_content: this.sendValue,
      };
      this.oldSendValue = this.sendValue;
      this.isClickChat = false;
      this.sendValue = "";
      this.isSahowUploadPicture = false;
      sessionStorage.setItem("chatImageFile", this.chatImageFile);
      this.chatImageFile = "";

      let response = null;
      // let url = Number(this.chat_type) == 0 || Number(this.chat_type) == 1 ? 'api/chat/async_chat_session' : 'api/chat/async_chat_completion'
      if (this.chat_type == 4) {
        this.controllerYiyan = new AbortController();
        // val.model = 'v1.1';
        // http://127.0.0.1:8060/kb/match_context_kb/
        response = await fetch(httpUrls.memberUrl + "kb/match_context_kb/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "*/*",
            authorization: userInfo.token,
            role: userInfo.role,
            source: "pc",
          },
          body: JSON.stringify(requestData),
          signal: this.controllerYiyan.signal,
        });
      }
      this.ordeAIList = [];

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
          let stringStr = JSON.parse(arr2str(value)); //处理成接口返回的信息--'字符串格式'
          let firstIndex = stringStr.data.prompt.indexOf("【");
          let lastIndex = stringStr.data.prompt.indexOf("】");
          let text = stringStr.data.prompt.slice(firstIndex + 1, lastIndex);
          let chatArr = text.split("");
          if (this.chat_type == 4) {
            this.isDetailYiyan = false;
          }

          let chatData = {
            chat_type: 5,
            scenario_type: "document",
            question_id: this.file.file_id,
            session_code: "",
            chat_group_code: "",
            content: this.oldSendValue,
            msg_list: JSON.stringify([
              {
                role: "user",
                covert_content: text,
                content: this.oldSendValue,
              },
            ]),
            model: "v1.1",
          };
          this.chatRequest(chatData);

          // 信息清空
          if (text.length > 5) {
            chatArr.forEach((val, index) => {
              let res = {
                chat_group_code: "11765305648635330728",
                chat_type: "4",
                completion_tokens: 0,
                content: val,
                create_time: "2023-11-21 14:32:25",
                finish_reason: index + 1 != text.length ? null : "stop",
                integral: 0,
                is_mod: 0,
                model: "completions_pro",
                msg_code: "11765305648635330796",
                prompt_tokens: 0,
                role: "assistant",
                session_code: "11765305648635330616",
                total_tokens: 0,
              };

              setTimeout(this.talkMsgList(res), 1000);
            });
          } else {
            let content = "在文档中没有找到与提问相关的内容，请尝试换个问题问问吧。";
            let arr = content.split("");
            arr.forEach((val, index) => {
              let res = {
                chat_group_code: "11765305648635330728",
                chat_type: "4",
                completion_tokens: 0,
                content: val,
                create_time: "2023-11-21 14:32:25",
                finish_reason: index + 1 != arr.length ? null : "stop",
                integral: 0,
                is_mod: 0,
                model: "completions_pro",
                msg_code: "11765305648635330796",
                prompt_tokens: 0,
                role: "assistant",
                session_code: "11765305648635330616",
                total_tokens: 0,
              };
              this.talkMsgList(res);
            });
          }
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
      if (this.chat_type == 4) {
        if (!this.isfinishYiyan) {
          this.$message("当前问题还没回答完毕，请稍后再提问");
          return;
        }
      }

      if (this.chat_type == 4) {
        this.sendValue = this.chatYiyanList[this.chatYiyanList.length - 2].content;
        this.chatYiyanList.splice(this.chatYiyanList.length - 2, 2);
      }
      this.endController("", false);
      this.sendMsg("true");
    },

    // 终止回答
    endController(code, resetChat = true) {
      if (Number(this.chat_type) == 4) {
        this.isBtnYiyan = true;
        this.isfinishYiyan = true;
        this.isTimeYiyan = false;
        try {
          this.controllerYiyan.abort();
        } catch (error) {}
        clearInterval(this.t_timeYiyan);
      }

      this.sessionRightNavCode = code;
      if (resetChat) {
        if (this.chat_type == 0) {
          this.chatList[this.chatList.length - 1].timer = this.timerThreeFive;
        } else if (this.chat_type == 1) {
          this.chatVipList[this.chatVipList.length - 1].timer = this.timerFourZero;
        } else if (this.chat_type == 4) {
          this.chatYiyanList[this.chatYiyanList.length - 1].timer = this.timerYiyan;
        } else if (this.chat_type == 5) {
          this.chatXunfeiList[this.chatXunfeiList.length - 1].timer = this.timerXunfei;
        } else if (this.chat_type == 7) {
          this.chatClaudeList[this.chatClaudeList.length - 1].timer = this.timerClaude;
        } else if (this.chat_type == 8) {
          this.chatChatGLMList[this.chatChatGLMList.length - 1].timer = this.timerChatGLM;
        } else if (this.chat_type == 10) {
          this.chatTongyiList[this.chatTongyiList.length - 1].timer = this.timerTongyi;
        } else if (this.chat_type == 11) {
          this.chatShangtangList[
            this.chatShangtangList.length - 1
          ].timer = this.timerShangtang;
        } else if (this.chat_type == 12) {
          this.chat360List[this.chat360List.length - 1].timer = this.timer360;
        }
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
        chat_type: "5",
        session_code: this.chatItem.session_code,
        chat_group_code: this.chatItem.chat_group_code,
        content: msg,
      };
      if (this.chat_type == 4) {
        this.isBtnYiyan = false;
        this.isDetailYiyan = false;
        this.isfinishYiyan = false;
        this.replyYiyan = "";
      }
      this.supplyVisible = false;
      if (this.chat_type == 4) {
        if (this.chatItem.timer) {
          this.timerYiyan = this.chatItem.timer;
        } else {
          this.timerYiyan = 0;
        }
        this.t_timeYiyan = setInterval(() => {
          this.timerYiyan += 1;
        }, 1000);
      }
      this.vipAgainSend(key, val, item);
    },

    async vipAgainSend(key, valu = {}, item) {
      let msg = "继续";
      if (key == 2) {
        msg = this.supplyValue;
      }

      let val = null;
      if (this.chat_type == 4) {
        val = {
          chat_type: "5",
          session_code: localStorage.getItem("session_code4"),
          chat_group_code: localStorage.getItem("chat_group_code4"),
          msg_list: JSON.stringify([
            {
              role: this.chatYiyanList[this.chatItem.chatIndex - 1].role,
              content: this.chatYiyanList[this.chatItem.chatIndex - 1].content,
            },
            { role: item.role, content: item.content },
            { role: "user", content: msg },
          ]),
        };
      }

      let userInfo = JSON.parse(localStorage.getItem("userInfo"));
      if (key == 2) {
        if (this.chat_type == 4) {
          this.chatYiyanList.push({
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
          this.chatYiyanList.push({
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
          // this.chatVipList[this.chatVipList.length-1].content = this.chatVipList[this.chatVipList.length-1].content + '\n\n'+ msg +'\n'
          // this.chatYiyanList[this.chatYiyanList.length-1].markedContent = marked(this.chatYiyanList[this.chatYiyanList.length-1].content + '\n' + msg) // 预留，对话内容的转换
          // this.chatYiyanList[this.chatYiyanList.length-1].content = this.chatYiyanList[this.chatYiyanList.length-1].content + '\n\n' + msg + '\n'
          this.$store.dispatch("user/changeChatListLength", this.chatYiyanList.length);
        }
      }

      let response = null;
      // let url = Number(this.chat_type) == 0 || Number(this.chat_type) == 1 ? 'api/chat/async_chat_session' : 'api/chat/async_chat_completion'
      if (this.chat_type == 4) {
        this.controllerYiyan = new AbortController();
        let requestData = {
          file_id: this.file.file_id,
          user_id: JSON.parse(localStorage.getItem("userInfo")).user_id,
          question_content: this.sendValue,
        };
        response = await fetch(httpUrls.memberUrl + "kb/match_context_kb/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "*/*",
            authorization: userInfo.token,
            role: userInfo.role,
            source: "pc",
          },
          body: JSON.stringify(requestData),
          signal: this.controllerYiyan.signal,
        });
      }

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
          console.log(value, done, "---对话请求返回");
          let stringStr = JSON.parse(arr2str(value)); //处理成接口返回的信息--'字符串格式'
          let firstIndex = stringStr.data.prompt.indexOf("【");
          let lastIndex = stringStr.data.prompt.indexOf("】");
          let text = stringStr.data.prompt.slice(firstIndex + 1, lastIndex);
          let chatArr = text.split("");
          if (this.chat_type == 4) {
            this.isDetailYiyan = false;
          }
          // 信息清空
          if (text.length > 5) {
            chatArr.forEach((val, index) => {
              let res = {
                chat_group_code: "11765305648635330728",
                chat_type: "4",
                completion_tokens: 0,
                content: val,
                create_time: "2023-11-21 14:32:25",
                finish_reason: index + 1 != text.length ? null : "stop",
                integral: 0,
                is_mod: 0,
                model: "completions_pro",
                msg_code: "11765305648635330796",
                prompt_tokens: 0,
                role: "assistant",
                session_code: "11765305648635330616",
                total_tokens: 0,
              };
              this.talkMsgList(res);
              // return;
              // }
            });
          } else {
            let content = "在文档中没有找到与提问相关的内容，请尝试换个问题问问吧。";
            let arr = content.split("");
            // chatArr.forEach()
            let res = {
              chat_group_code: "11765305648635330728",
              chat_type: "4",
              completion_tokens: 0,
              content: "在文档中没有找到与提问相关的内容，请尝试换个问题问问吧。",
              create_time: "2023-11-21 14:32:25",
              finish_reason: "stop",
              integral: 0,
              is_mod: 0,
              model: "completions_pro",
              msg_code: "11765305648635330796",
              prompt_tokens: 0,
              role: "assistant",
              session_code: "11765305648635330616",
              total_tokens: 0,
            };
            this.talkMsgList(res);
          }
        }
      }
    },

    async chatRequest(val) {
      this.controllerXunfei = new AbortController();
      let userInfo = JSON.parse(localStorage.getItem("userInfo"));
      let response = await fetch(httpUrls.httpUrl + "api/chat/async_chat_completion", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "*/*",
          authorization: userInfo.token,
          role: userInfo.role,
          source: "pc",
        },
        body: JSON.stringify(val),
        signal: this.controllerXunfei.signal,
      });
      const reader = response.body.getReader();
      const { value, done } = await reader.read();
      let str = JSON.parse(arr2str(value));
      console.log(str, "--chat请求");
      // 保存最近使用
      submitFootprint({
        type_name: "文档对话",
        type_code: "chat",
        title: this.oldSendValue,
        eid: str.session_code,
      }).then((res) => {
        console.log("保存成功");
      });
    },

    // ai返回的数据处理
    talkMsgList(res) {
      /**
       * 35
       */
      this.msgCode = res.msg_code;
      if (Number(res.code) == 36003) {
        if (this.chat_type == 4) {
          clearInterval(this.t_timeYiyan);
          this.t_timeYiyan = null;
          this.isfinishYiyan = true;
          this.isTimeYiyan = false;
          this.isBtnYiyan = true;
        }
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
          if (this.chat_type == 4) {
            clearInterval(this.t_timeYiyan);
            this.t_timeYiyan = null;
            this.isfinishYiyan = true;
            this.isTimeYiyan = false;
            this.isBtnYiyan = true;
          }
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

      /**
       * 文心一言
       */
      if (res.chat_type == "4" && !this.isfinishYiyan) {
        setTimeout(() => {
          this.isTimeYiyan = false;
          if (res != "" && res.content != null) {
            // this.replyYiyan = this.chatYiyanList[this.chatYiyanList.length-1].content + res.content;
            // this.chatYiyanList[this.chatYiyanList.length-1].content = this.chatYiyanList[this.chatYiyanList.length-1].content + res.content;
            // console.log(this.chatYiyanList[this.chatYiyanList.length - 1].content)
            this.chatYiyanList[this.chatYiyanList.length - 1].content =
              this.chatYiyanList[this.chatYiyanList.length - 1].content + res.content;
            this.chatYiyanList[this.chatYiyanList.length - 1].markedContent =
              this.chatYiyanList[this.chatYiyanList.length - 1].content + res.content;
            this.replyYiyan =
              this.chatYiyanList[this.chatYiyanList.length - 1].content + res.content;

            // 定位到聊天最底部
            this.toBottom();
          }
          if (res.session_code != "" && res.content != null) {
            this.chatYiyanList[this.chatYiyanList.length - 1].session_code =
              res.session_code;
            this.chatYiyanList[this.chatYiyanList.length - 2].session_code =
              res.session_code;
            localStorage.setItem("session_code4", res.session_code);
          }
          if (res.create_time != "" && res.create_time != null) {
            this.chatYiyanList[this.chatYiyanList.length - 1].create_time =
              res.create_time;
          }
          if (res.chat_group_code != "" && res.chat_group_code != null) {
            this.chatYiyanList[this.chatYiyanList.length - 1].chat_group_code =
              res.chat_group_code;
            this.chatYiyanList[this.chatYiyanList.length - 2].chat_group_code =
              res.chat_group_code;
            localStorage.setItem("chat_group_code4", res.chat_group_code);
          }
          if (res.finish_reason) {
            clearInterval(this.t_timeYiyan);
            this.t_timeYiyan = null;
            this.isfinishYiyan = true;
            this.isBtnYiyan = true;
            this.chatYiyanList[this.chatYiyanList.length - 1].finish_reason =
              res.finish_reason;
            this.$store.dispatch("user/changeChatListLength", this.chatYiyanList.length);
            this.chatYiyanList[this.chatYiyanList.length - 1].timer = this.timerYiyan;
            if (!localStorage.getItem("session_code4")) {
              this.sessionRightNavCode = res.session_code;
            }

            this.chatYiyanList.forEach((v) => {
              v.markedContent = marked(v.content, { renderer });
            });
            this.replyYiyan = marked(this.replyYiyan, { renderer });

            this.tokenNumberYiyan = {
              completionTokens: res.completion_tokens, // 下行token
              promptTokens: res.prompt_tokens, // 上行token
              integral: res.integral, // 积分
              totalTokens: res.total_tokens, // 总tokes
            };
            this.chatYiyanList[this.chatYiyanList.length - 1].completion_tokens =
              res.completion_tokens;
            this.chatYiyanList[this.chatYiyanList.length - 1].prompt_tokens =
              res.prompt_tokens;
            this.chatYiyanList[this.chatYiyanList.length - 1].integral = res.integral;
            this.chatYiyanList[this.chatYiyanList.length - 1].total_tokens =
              res.total_tokens;

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
          if (res.finish_reason) {
            setTimeout(() => {
              console.log("刷新2");
              this.sessionRightNavCode = res.session_code;
            }, 2000);
          }
          if (res.role != "" && res.role != null) {
            this.chatYiyanList[this.chatYiyanList.length - 1].role = res.role;
          }
        }, 2000);
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

    // 切换为ai40
    toChatFouty() {
      // this.controller.abort()
      // this.isfinish = true
      if (this.chat_type == 0) {
        // this.controllerThreeFive.abort()
        clearInterval(this.t_timeThreeFive);
        this.t_timeThreeFive = null;
        this.isfinishThreeFive = true;
        this.isBtnThreeFive = true;
        this.chatList[this.chatList.length - 1].timer = this.timerThreeFive;
      } else if (this.chat_type == 1) {
        clearInterval(this.t_timeFourZero);
        this.t_timeFourZero = null;
        // this.controllerFourZreo.abort()
        this.isBtnFourZero = true;
        this.isfinishFourZero = true;
        this.chatVipList[this.chatVipList.length - 1].timer = this.timerFourZero;
      } else if (this.chat_type == 4) {
        clearInterval(this.t_timeYiyan);
        this.t_timeYiyan = null;
        // this.controllerFourZreo.abort()
        this.isBtnYiyan = true;
        this.isfinishYiyan = true;
        this.chatYiyanList[this.chatYiyanList.length - 1].timer = this.timerYiyan;
      } else if (this.chat_type == 5) {
        clearInterval(this.t_timeXunfei);
        this.t_timeXunfei = null;
        // this.controllerFourZreo.abort()
        this.isBtnXunfei = true;
        this.isfinishXunfei = true;
        this.chatXunfeiList[this.chatXunfeiList.length - 1].timer = this.timerXunfei;
      } else if (this.chat_type == 7) {
        clearInterval(this.t_timeClaude);
        this.t_timeClaude = null;
        // this.controllerFourZreo.abort()
        this.isBtnClaude = true;
        this.isfinishClaude = true;
        this.chatClaudeList[this.chatClaudeList.length - 1].timer = this.timerClaude;
      } else if (this.chat_type == 8) {
        clearInterval(this.t_timeChatGLM);
        this.t_timeChatGLM = null;
        // this.controllerFourZreo.abort()
        this.isBtnChatGLM = true;
        this.isfinishChatGLM = true;
        this.chatChatGLMList[this.chatChatGLMList.length - 1].timer = this.timerChatGLM;
      } else if (this.chat_type == 10) {
        clearInterval(this.t_timeTongyi);
        this.t_timeTongyi = null;
        // this.controllerFourZreo.abort()
        this.isBtnTongyi = true;
        this.isfinishTongyi = true;
        this.chatTongyiList[this.chatTongyiList.length - 1].timer = this.timerTongyi;
      } else if (this.chat_type == 11) {
        clearInterval(this.t_timeShangtang);
        this.t_timeShangtang = null;
        // this.controllerFourZreo.abort()
        this.isBtnShangtang = true;
        this.isfinishShangtang = true;
        this.chatShangtangList[
          this.chatShangtangList.length - 1
        ].timer = this.timerShangtang;
      } else if (this.chat_type == 12) {
        clearInterval(this.t_time360);
        this.t_time360 = null;
        // this.controllerFourZreo.abort()
        this.isBtn360 = true;
        this.isfinish360 = true;
        this.chat360List[this.chat360List.length - 1].timer = this.timer360;
      }
      // this.endController()
      if (this.chat_type == 0) {
        this.sendValue = this.chatList[this.chatList.length - 2].content;
      } else if (this.chat_type == 4) {
        this.sendValue = this.chatYiyanList[this.chatYiyanList.length - 2].content;
      } else if (this.chat_type == 5) {
        this.sendValue = this.chatXunfeiList[this.chatXunfeiList.length - 2].content;
      } else if (this.chat_type == 7) {
        this.sendValue = this.chatClaudeList[this.chatClaudeList.length - 2].content;
      } else if (this.chat_type == 8) {
        this.sendValue = this.chatChatGLMList[this.chatChatGLMList.length - 2].content;
      } else if (this.chat_type == 10) {
        this.sendValue = this.chatTongyiList[this.chatTongyiList.length - 2].content;
      } else if (this.chat_type == 11) {
        this.sendValue = this.chatShangtangList[
          this.chatShangtangList.length - 2
        ].content;
      } else if (this.chat_type == 12) {
        this.sendValue = this.chat360List[this.chat360List.length - 2].content;
      }
      this.timerFourZero = 0;
      this.AIname = 1;
      this.chat_type = 1;
      this.ordeAIList = [];
      if (!this.isfinishFourZero) {
        this.$message("当前问题还没回答完毕，请稍后再提问！");
        return;
      }
      this.sendMsg("toChatFouty");
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
      // if (response.status == '400') {
      if (this.chat_type == 0) {
        this.isTimeThreeFive = false;
        this.isBtnThreeFive = true;
        this.isfinishThreeFive = true; // 完成打字效果
        clearInterval(this.t_timeThreeFive);
        this.t_timeThreeFive = null;
      } else if (this.chat_type == 1) {
        this.isBtnFourZero = true;
        this.isTimeFourZero = false;
        clearInterval(this.t_timeFourZero);
        this.t_timeFourZero = null;
        this.isfinishFourZero = true; // 完成打字效果
      } else if (this.chat_type == 4) {
        this.isBtnYiyan = true;
        this.isTimeYiyan = false;
        clearInterval(this.t_timeYiyan);
        this.t_timeYiyan = null;
        this.isfinishYiyan = true; // 完成打字效果
      } else if (this.chat_type == 5) {
        this.isBtnXunfei = true;
        this.isTimeXunfei = false;
        clearInterval(this.t_timeXunfei);
        this.t_timeXunfei = null;
        this.isfinishXunfei = true; // 完成打字效果
      } else if (this.chat_type == 7) {
        this.isBtnClaude = true;
        this.isTimeClaude = false;
        clearInterval(this.t_timeClaude);
        this.t_timeClaude = null;
        this.isfinishClaude = true; // 完成打字效果
      } else if (this.chat_type == 8) {
        this.isBtnChatGLM = true;
        this.isTimeChatGLM = false;
        clearInterval(this.t_timeChatGLM);
        this.t_timeChatGLM = null;
        this.isfinishChatGLM = true; // 完成打字效果
      } else if (this.chat_type == 10) {
        this.isBtnTongyi = true;
        this.isTimeTongyi = false;
        clearInterval(this.t_timeTongyi);
        this.t_timeTongyi = null;
        this.isfinishTongyi = true; // 完成打字效果
      } else if (this.chat_type == 11) {
        this.isBtnShangtang = true;
        this.isTimeShangtang = false;
        clearInterval(this.t_timeShangtang);
        this.t_timeShangtang = null;
        this.isfinishShangtang = true; // 完成打字效果
      } else if (this.chat_type == 12) {
        this.isBtn360 = true;
        this.isTime360 = false;
        clearInterval(this.t_time360);
        this.t_time360 = null;
        this.isfinish360 = true; // 完成打字效果
      }

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
            type: "success",
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
      // this.$message({
      //     type: 'info',
      //     message: '当前问题还没回答完毕，请稍后再提问！'
      // })
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
.priceToken {
  position: absolute;
  top: -10px;
  right: 0px;
  color: #999;
  font-size: 14px;
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
  margin-left: 242px;
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
  padding: 20px 0 10px 20px;
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
  padding: 20px 75px;
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
  width: 140px;
  display: flex;
  align-items: flex-end;
  position: relative;
  /* border: 2px solid #1F64FF; */
  /* border-left: none; */
  border-radius: 10px;
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

<style scoped>
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
