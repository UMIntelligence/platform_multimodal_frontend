<template>
  <div
    class="template-chat"
    id="temolate_chat"
    :style="{
      '--a': chatHeight || '0px',
      height: isShowNotice ? 'calc(100% - 30px)' : ' 100%',
    }"
  >
    <div class="first_item">
      <div style="display: flex; align-items: center; cursor: pointer" @click="backPage">
        <i class="el-icon-arrow-left"></i>
        <span>返回</span>
      </div>
    </div>

    <div class="item" id="chatinProgress">
      <div class="title" id="chatinTitle">
        {{ /^AI/.test(item.title.trim()) ? item.title : "AI " + item.title.trim() }}
      </div>
      <div class="contents" :title="item.content" id="chatinContents">
        {{ item.content }}
      </div>

      <div class="robot" id="chatinRobot">
        <div style="width: 100%">
          <!-- <div class="chat_list">
            <div class="chat-title">引擎:</div>
            <div
              style="
                display: flex;
                flex-wrap: wrap;
                align-items: flex-end;
                background-color: #ffffff;
                border-radius: 8px;
              "
            >
              <el-select v-model="chat_type" size="small" placeholder="请选择">
                <el-option
                  v-for="item in options"
                  :key="item.label"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </div>
          </div> -->
          <div>
            <!-- 单选 多选 输入 选择器 开关 标签 文本域 -->
            <div
              class="templateselect-list"
              :key="item.title"
              v-for="item in questionList"
            >
              <div class="selsect-title">
                <div>
                  <span>{{ item.title }}</span>
                  <span v-if="item.is_required == '1'" style="color: #f00">*</span>
                </div>
                <div>
                  <span style="margin-right: 15px">引擎:</span>
                  <!-- <el-select
                    style="width: 110px"
                    v-model="chat_type"
                    size="small"
                    placeholder="请选择"
                  >
                    <el-option
                      v-for="item in options"
                      :key="item.label"
                      :label="item.label"
                      :value="item.value"
                    >
                    </el-option>
                  </el-select> -->
                  <el-cascader size="small" v-model="chat_value" :options="options" @change="handleChange"
                    @visible-change="visibleChange">
                  </el-cascader>
                </div>
              </div>
              <el-input
                v-if="item.info_type_name == 'Input'"
                v-model="item.selectItem"
                :placeholder="
                  item.example_question ? item.example_question : item.placeholder
                "
              ></el-input>
              <el-input
                v-if="item.info_type_name == 'Textarea'"
                rows="4"
                type="textarea"
                autosize
                v-model="item.selectItem"
                :placeholder="
                  item.example_question ? item.example_question : item.placeholder
                "
              ></el-input>

              <div v-if="item.info_type_name == 'CheckBox'">
                <el-select
                  v-model="item.selectItem"
                  multiple
                  :placeholder="item.placeholder"
                  style="width: 100%"
                >
                  <el-option
                    v-for="v in item.options"
                    :key="v.option_id"
                    :label="v.value"
                    :value="v.value"
                  >
                  </el-option>
                </el-select>
              </div>

              <div
                v-if="item.info_type_name == 'Select' || item.info_type_name == 'Radio'"
              >
                <el-select
                  v-model="item.selectItem"
                  :placeholder="item.placeholder"
                  style="width: 100%"
                >
                  <el-option
                    v-for="v in item.options"
                    :key="v.option_id"
                    :label="v.value"
                    :value="v.value"
                  >
                  </el-option>
                </el-select>
              </div>

              <div v-if="item.info_type_name == 'Switch'">
                <el-switch v-model="item.selectItem"></el-switch>
              </div>

              <div
                v-if="item.info_type_name == 'Tag'"
                style="border: 1px solid #e5e6eb; padding: 8px 12px; border-radius: 8px"
              >
                <el-tag
                  :key="tag.option_id"
                  v-for="tag in item.tagOptions"
                  closable
                  :disable-transitions="false"
                  @close="handleClose(tag, item)"
                >
                  {{ tag.value }}
                </el-tag>
                <el-input
                  class="input-new-tag"
                  v-if="inputVisible"
                  v-model="inputValue"
                  ref="saveTagInput"
                  size="small"
                  @keyup.enter.native="handleInputConfirm(item)"
                  @blur="handleInputConfirm(item)"
                >
                </el-input>
                <el-button v-else class="button-new-tag" size="small" @click="showInput"
                  >+ 添加</el-button
                >
              </div>
              <div
                style="font-size: 12px; margin-top: 2px; color: #f56c6c"
                v-if="item.required"
              >
                此选项为必填
              </div>
            </div>
          </div>

          <div style="display: flex; justify-content: center; margin-top: 20px">
            <el-button
              type="primary"
              style="width: 70%; background-color: #1f64ff; border: none"
              v-if="chat_type == 0"
              @click="isBtnThreeFive ? sendMsg() : sendMsg2()"
              >{{
                isBtnThreeFive ? "AI一下" : "思考中..." + timerThreeFive + "秒"
              }}</el-button
            >
            <el-button
              type="primary"
              style="width: 70%; background-color: #1f64ff; border: none"
              v-if="chat_type == 1"
              @click="isBtnFourZero ? sendMsg() : sendMsg2()"
              >{{
                isBtnFourZero ? "AI一下" : "思考中..." + timerFourZero + "秒"
              }}</el-button
            >
            <el-button
              type="primary"
              style="width: 70%; background-color: #1f64ff; border: none"
              v-if="chat_type == 4"
              @click="isBtnYiyan ? sendMsg() : sendMsg2()"
              >{{ isBtnYiyan ? "AI一下" : "思考中..." + timerYiyan + "秒" }}</el-button
            >
            <el-button
              type="primary"
              style="width: 70%; background-color: #1f64ff; border: none"
              v-if="chat_type == 5"
              @click="isBtnXunfei ? sendMsg() : sendMsg2()"
              >{{ isBtnXunfei ? "AI一下" : "思考中..." + timerXunfei + "秒" }}</el-button
            >
            <el-button
              type="primary"
              style="width: 70%; background-color: #1f64ff; border: none"
              v-if="chat_type == 7"
              @click="isBtnClaude ? sendMsg() : sendMsg2()"
              >{{ isBtnClaude ? "AI一下" : "思考中..." + timerClaude + "秒" }}</el-button
            >
            <el-button
              type="primary"
              style="width: 70%; background-color: #1f64ff; border: none"
              v-if="chat_type == 8 || chat_type == 1003 || chat_type == 1001 || chat_type == 1004"
              @click="isBtnChatGLM ? sendMsg() : sendMsg2()"
              >{{
                isBtnChatGLM ? "AI一下" : "思考中..." + timerChatGLM + "秒"
              }}</el-button
            >
            <el-button
              type="primary"
              style="width: 70%; background-color: #1f64ff; border: none"
              v-if="chat_type == 10"
              @click="isBtnTongyi ? sendMsg() : sendMsg2()"
              >{{
                isBtnChatGLM ? "AI一下" : "思考中..." + timerChatGLM + "秒"
              }}</el-button
            >
            <el-button
              type="primary"
              style="width: 70%; background-color: #1f64ff; border: none"
              v-if="chat_type == 12"
              @click="isBtnShangtang ? sendMsg() : sendMsg2()"
              >{{
                isBtnChatGLM ? "AI一下" : "思考中..." + timerChatGLM + "秒"
              }}</el-button
            >
          </div>
        </div>
      </div>

      <!-- 
        35对话结果
       -->
      <div class="answerResults" v-if="isShowResultsThreeFive && chat_type == 0">
        <div class="onAnalysis">
          <div class="titlea">
            <div style="width: 33%"></div>
            <div style="width: 33%">AI分析结果</div>
            <div
              style="
                width: 33%;
                display: flex;
                align-items: center;
                justify-content: flex-end;
                cursor: pointer;
              "
              @click="shareGuangchang"
            >
              <img src="../../assets/images/shareicon.png" alt="" />
              分享到问答广场
            </div>
          </div>
          <div style="padding: 20px; border-radius: 5px; background: #ffffff">
            <!-- <div class="replay" style="margin-bottom: 10px;" v-if="chat_type == 0">{{ chatList[0].content }}</div> -->
            <div v-if="!isuser">
              <div>{{ queryErrorMsg }}</div>
              <el-button
                style="
                  background-color: #1f64ff;
                  border-radius: 4px;
                  padding: 6px 60px;
                  color: #ffffff;
                  margin-top: 5px;
                "
                @click="$refs.Pay.PayVisible = true"
                >开通VIP</el-button
              >
            </div>
            <div
              class="replay"
              v-else-if="chat_type == 0"
              v-html="isDetailThreeFive ? chatList[1].markedContent : replyThreeFive"
            ></div>

            <div class="consume">
              <span class="words">字数：{{ chatList[1].content.length }}</span>
            </div>
            <div class="prompt" v-if="isBtnThreeFive">
              当前内容为AI生成，不做任何决策使用！由此引发的一切后果，需自行承担，请知悉，已通过阿里云内容安全审核
            </div>
          </div>
        </div>

        <div class="button_list">
          <div class="btn_left" v-if="chat_type == 0">
            <el-button
              icon="el-icon-check"
              style="
                color: #1f64ff;
                font-size: 14px;
                padding: 6px 10px;
                border: 1px solid #1f64ff;
              "
              @click="optimizeAnswers(chatList[1])"
              >优化本次回答</el-button
            >
            <el-button
              icon="el-icon-refresh"
              style="
                color: #1f64ff;
                font-size: 14px;
                padding: 6px 10px;
                border: 1px solid #1f64ff;
              "
              @click="resetController"
              >重试</el-button
            >
          </div>

          <el-button
            v-if="!isfinishThreeFive && chat_type == 0"
            icon="el-icon-remove-outline"
            style="
              color: #1f64ff;
              font-size: 14px;
              padding: 6px 10px;
              border: 1px solid #1f64ff;
            "
            @click="endController(chatList[1].session_code)"
            >停止回答</el-button
          >
          <el-button
            v-else
            icon="el-icon-remove-outline"
            style="
              color: #1f64ff;
              font-size: 14px;
              padding: 6px 10px;
              border: 1px solid #1f64ff;
            "
            @click="resetNewChat(chat_type)"
            >重新提问</el-button
          >

          <div class="btn_right" v-if="chat_type == 0">
            <img
              src="../../assets/images/helpNo.png"
              v-if="!chatList[1].help"
              alt=""
              @click="showSetonHelpImg(1, true, chatList[1])"
            />
            <img
              src="../../assets/images/helpYes.png"
              v-else
              alt=""
              @click="showSetonHelpImg(1, false, chatList[1])"
            />
            <img
              src="../../assets/images/stepOnNo.png"
              v-if="!chatList[1].stepOn"
              alt=""
              @click="showSetonHelpImg(2, true, chatList[1])"
            />
            <img
              src="../../assets/images/stepOnYes.png"
              v-else
              alt=""
              @click="showSetonHelpImg(2, false, chatList[1])"
            />
            <img
              src="../../assets/images/copyBlack.png"
              alt=""
              @click="copyText(chatList[1].content)"
            />
          </div>
        </div>
      </div>

      <!-- 
        40对话结果
       -->
      <div class="answerResults" v-if="isShowResultsFourZero && chat_type == 1">
        <div class="onAnalysis">
          <div class="titlea">
            <div style="width: 33%"></div>
            <div style="width: 33%">AI分析结果</div>
            <div
              style="
                width: 33%;
                display: flex;
                align-items: center;
                justify-content: flex-end;
                cursor: pointer;
              "
              @click="shareGuangchang"
            >
              <img src="../../assets/images/shareicon.png" alt="" />
              分享到问答广场
            </div>
          </div>
          <div style="padding: 20px; border-radius: 5px; background: #ffffff">
            <!-- 40 -->
            <div
              class="replay"
              v-if="chat_type == 1"
              v-html="isDetailFourZero ? chatVipList[1].markedContent : replyFourZero"
            ></div>
            <div v-if="!isuser">
              {{ queryErrorMsg }}
              <el-button
                style="
                  background-color: #1f64ff;
                  border-radius: 4px;
                  padding: 6px 60px;
                  color: #ffffff;
                  margin-top: 5px;
                "
                @click="$refs.Pay.PayVisible = true"
                >开通VIP</el-button
              >
            </div>

            <div class="consume">
              <span class="words">字数：{{ chatVipList[1].content.length }}</span>
            </div>
            <div class="prompt" v-if="isBtnFourZero">
              当前内容为AI生成，不做任何决策使用！由此引发的一切后果，需自行承担，请知悉，已通过阿里云内容安全审核
            </div>
          </div>
        </div>

        <div class="button_list">
          <div class="btn_left" v-if="chat_type == 1">
            <el-button
              icon="el-icon-check"
              style="
                color: #1f64ff;
                font-size: 14px;
                padding: 6px 10px;
                border: 1px solid #1f64ff;
              "
              @click="optimizeAnswers(chatVipList[1])"
              >优化本次回答</el-button
            >
            <el-button
              icon="el-icon-refresh"
              style="
                color: #1f64ff;
                font-size: 14px;
                padding: 6px 10px;
                border: 1px solid #1f64ff;
              "
              @click="resetController"
              >重试</el-button
            >
          </div>

          <el-button
            v-if="!isfinishFourZero && chat_type == 1"
            icon="el-icon-remove-outline"
            style="
              color: #1f64ff;
              font-size: 14px;
              padding: 6px 10px;
              border: 1px solid #1f64ff;
            "
            @click="endController(chatVipList[1].session_code)"
            >停止回答</el-button
          >
          <el-button
            v-else
            icon="el-icon-remove-outline"
            style="
              color: #1f64ff;
              font-size: 14px;
              padding: 6px 10px;
              border: 1px solid #1f64ff;
            "
            @click="resetNewChat(chat_type)"
            >重新提问</el-button
          >

          <div class="btn_right" v-if="chat_type == 1">
            <img
              src="../../assets/images/helpNo.png"
              v-if="!chatVipList[1].help"
              alt=""
              @click="showSetonHelpImg(3, true, chatVipList[1])"
            />
            <img
              src="../../assets/images/helpYes.png"
              v-else
              alt=""
              @click="showSetonHelpImg(3, false, chatVipList[1])"
            />
            <img
              src="../../assets/images/stepOnNo.png"
              v-if="!chatVipList[1].help"
              alt=""
              @click="showSetonHelpImg(4, true, chatVipList[1])"
            />
            <img
              src="../../assets/images/stepOnYes.png"
              v-else
              alt=""
              @click="showSetonHelpImg(4, false, chatVipList[1])"
            />
            <img
              src="../../assets/images/copyBlack.png"
              alt=""
              @click="copyText(chatVipList[1].content)"
            />
          </div>
        </div>
      </div>

      <!-- 
        文心一言对话结果
       -->
      <div class="answerResults" v-if="isShowResultsYiyan && chat_type == 4">
        <div class="onAnalysis">
          <div class="titlea">
            <div style="width: 33%"></div>
            <div style="width: 33%">AI分析结果</div>
            <div
              style="
                width: 33%;
                display: flex;
                align-items: center;
                justify-content: flex-end;
                cursor: pointer;
              "
              @click="shareGuangchang"
            >
              <img src="../../assets/images/shareicon.png" alt="" />
              分享到问答广场
            </div>
          </div>
          <div style="padding: 20px; border-radius: 5px; background: #ffffff">
            <!-- 文心一言 -->
            <div
              class="replay"
              v-if="chat_type == 4"
              v-html="isDetailYiyan ? chatYiyanList[1].markedContent : replyYiyan"
            ></div>
            <div v-if="!isuser">
              {{ queryErrorMsg }}
              <el-button
                style="
                  background-color: #1f64ff;
                  border-radius: 4px;
                  padding: 6px 60px;
                  color: #ffffff;
                  margin-top: 5px;
                "
                @click="$refs.Pay.PayVisible = true"
                >开通VIP</el-button
              >
            </div>

            <div class="consume">
              <span class="words">字数：{{ chatYiyanList[1].content.length }}</span>
            </div>
            <div class="prompt" v-if="isBtnYiyan">
              当前内容为AI生成，不做任何决策使用！由此引发的一切后果，需自行承担，请知悉，已通过阿里云内容安全审核
            </div>
          </div>
        </div>

        <div class="button_list">
          <div class="btn_left" v-if="chat_type == 4">
            <el-button
              icon="el-icon-check"
              style="
                color: #1f64ff;
                font-size: 14px;
                padding: 6px 10px;
                border: 1px solid #1f64ff;
              "
              @click="optimizeAnswers(chatYiyanList[1])"
              >优化本次回答</el-button
            >
            <el-button
              icon="el-icon-refresh"
              style="
                color: #1f64ff;
                font-size: 14px;
                padding: 6px 10px;
                border: 1px solid #1f64ff;
              "
              @click="resetController"
              >重试</el-button
            >
          </div>

          <el-button
            v-if="!isfinishYiyan && chat_type == 4"
            icon="el-icon-remove-outline"
            style="
              color: #1f64ff;
              font-size: 14px;
              padding: 6px 10px;
              border: 1px solid #1f64ff;
            "
            @click="endController(chatYiyanList[1].session_code)"
            >停止回答</el-button
          >
          <el-button
            v-else
            icon="el-icon-remove-outline"
            style="
              color: #1f64ff;
              font-size: 14px;
              padding: 6px 10px;
              border: 1px solid #1f64ff;
            "
            @click="resetNewChat(chat_type)"
            >重新提问</el-button
          >

          <div class="btn_right" v-if="chat_type == 4">
            <img
              src="../../assets/images/helpNo.png"
              v-if="!chatYiyanList[1].help"
              alt=""
              @click="showSetonHelpImg(5, true, chatYiyanList[1])"
            />
            <img
              src="../../assets/images/helpYes.png"
              v-else
              alt=""
              @click="showSetonHelpImg(5, false, chatYiyanList[1])"
            />
            <img
              src="../../assets/images/stepOnNo.png"
              v-if="!chatYiyanList[1].stepOn"
              alt=""
              @click="showSetonHelpImg(6, true, chatYiyanList[1])"
            />
            <img
              src="../../assets/images/stepOnYes.png"
              v-else
              alt=""
              @click="showSetonHelpImg(6, false, chatYiyanList[1])"
            />
            <img
              src="../../assets/images/copyBlack.png"
              alt=""
              @click="copyText(chatYiyanList[1].content)"
            />
          </div>
        </div>
      </div>

      <!-- 
        讯飞星火对话结果
       -->
      <div class="answerResults" v-if="isShowResultsXunfei && chat_type == 5">
        <div class="onAnalysis">
          <div class="titlea">
            <div style="width: 33%"></div>
            <div style="width: 33%">AI分析结果</div>
            <div
              style="
                width: 33%;
                display: flex;
                align-items: center;
                justify-content: flex-end;
                cursor: pointer;
              "
              @click="shareGuangchang"
            >
              <img src="../../assets/images/shareicon.png" alt="" />
              分享到问答广场
            </div>
          </div>
          <div style="padding: 20px; border-radius: 5px; background: #ffffff">
            <!-- 讯飞星火 -->
            <div
              class="replay"
              v-if="chat_type == 5"
              v-html="isDetailXunfei ? chatXunfeiList[1].markedContent : replyXunfei"
            ></div>
            <div v-if="!isuser">
              {{ queryErrorMsg }}
              <el-button
                style="
                  background-color: #1f64ff;
                  border-radius: 4px;
                  padding: 6px 60px;
                  color: #ffffff;
                  margin-top: 5px;
                "
                @click="$refs.Pay.PayVisible = true"
                >开通VIP</el-button
              >
            </div>

            <div class="consume">
              <span class="words">字数：{{ chatXunfeiList[1].content.length }}</span>
            </div>
            <div class="prompt" v-if="isBtnXunfei">
              当前内容为AI生成，不做任何决策使用！由此引发的一切后果，需自行承担，请知悉，已通过阿里云内容安全审核
            </div>
          </div>
        </div>

        <div class="button_list">
          <div class="btn_left" v-if="chat_type == 5">
            <el-button
              icon="el-icon-check"
              style="
                color: #1f64ff;
                font-size: 14px;
                padding: 6px 10px;
                border: 1px solid #1f64ff;
              "
              @click="optimizeAnswers(chatXunfeiList[1])"
              >优化本次回答</el-button
            >
            <el-button
              icon="el-icon-refresh"
              style="
                color: #1f64ff;
                font-size: 14px;
                padding: 6px 10px;
                border: 1px solid #1f64ff;
              "
              @click="resetController"
              >重试</el-button
            >
          </div>

          <el-button
            v-if="!isfinishXunfei && chat_type == 5"
            icon="el-icon-remove-outline"
            style="
              color: #1f64ff;
              font-size: 14px;
              padding: 6px 10px;
              border: 1px solid #1f64ff;
            "
            @click="endController(chatXunfeiList[1].session_code)"
            >停止回答</el-button
          >
          <el-button
            v-else
            icon="el-icon-remove-outline"
            style="
              color: #1f64ff;
              font-size: 14px;
              padding: 6px 10px;
              border: 1px solid #1f64ff;
            "
            @click="resetNewChat(chat_type)"
            >重新提问</el-button
          >

          <div class="btn_right" v-if="chat_type == 5">
            <img
              src="../../assets/images/helpNo.png"
              v-if="!chatXunfeiList[1].help"
              alt=""
              @click="showSetonHelpImg(7, true, chatXunfeiList[1])"
            />
            <img
              src="../../assets/images/helpYes.png"
              v-else
              alt=""
              @click="showSetonHelpImg(7, false, chatXunfeiList[1])"
            />
            <img
              src="../../assets/images/stepOnNo.png"
              v-if="!chatXunfeiList[1].stepOn"
              alt=""
              @click="showSetonHelpImg(8, true, chatXunfeiList[1])"
            />
            <img
              src="../../assets/images/stepOnYes.png"
              v-else
              alt=""
              @click="showSetonHelpImg(8, false, chatXunfeiList[1])"
            />
            <img
              src="../../assets/images/copyBlack.png"
              alt=""
              @click="copyText(chatXunfeiList[1].content)"
            />
          </div>
        </div>
      </div>

      <!-- 
        Claude对话结果
       -->
      <div class="answerResults" v-if="isShowResultsClaude && chat_type == 7">
        <div class="onAnalysis">
          <div class="titlea">
            <div style="width: 33%"></div>
            <div style="width: 33%">AI分析结果</div>
            <div
              style="
                width: 33%;
                display: flex;
                align-items: center;
                justify-content: flex-end;
                cursor: pointer;
              "
              @click="shareGuangchang"
            >
              <img src="../../assets/images/shareicon.png" alt="" />
              分享到问答广场
            </div>
          </div>
          <div style="padding: 20px; border-radius: 5px; background: #ffffff">
            <!-- 讯飞星火 -->
            <div
              class="replay"
              v-if="chat_type == 7"
              v-html="isDetailClaude ? chatClaudeList[1].markedContent : replyClaude"
            ></div>
            <div v-if="!isuser">
              {{ queryErrorMsg }}
              <el-button
                style="
                  background-color: #1f64ff;
                  border-radius: 4px;
                  padding: 6px 60px;
                  color: #ffffff;
                  margin-top: 5px;
                "
                @click="$refs.Pay.PayVisible = true"
                >开通VIP</el-button
              >
            </div>

            <div class="consume">
              <span class="words">字数：{{ chatClaudeList[1].content.length }}</span>
            </div>
            <div class="prompt" v-if="isBtnClaude">
              当前内容为AI生成，不做任何决策使用！由此引发的一切后果，需自行承担，请知悉，已通过阿里云内容安全审核
            </div>
          </div>
        </div>

        <div class="button_list">
          <div class="btn_left" v-if="chat_type == 7">
            <el-button
              icon="el-icon-check"
              style="
                color: #1f64ff;
                font-size: 14px;
                padding: 6px 10px;
                border: 1px solid #1f64ff;
              "
              @click="optimizeAnswers(chatClaudeList[1])"
              >优化本次回答</el-button
            >
            <el-button
              icon="el-icon-refresh"
              style="
                color: #1f64ff;
                font-size: 14px;
                padding: 6px 10px;
                border: 1px solid #1f64ff;
              "
              @click="resetController"
              >重试</el-button
            >
          </div>

          <el-button
            v-if="!isfinishClaude && chat_type == 7"
            icon="el-icon-remove-outline"
            style="
              color: #1f64ff;
              font-size: 14px;
              padding: 6px 10px;
              border: 1px solid #1f64ff;
            "
            @click="endController(chatClaudeList[1].session_code)"
            >停止回答</el-button
          >
          <el-button
            v-else
            icon="el-icon-remove-outline"
            style="
              color: #1f64ff;
              font-size: 14px;
              padding: 6px 10px;
              border: 1px solid #1f64ff;
            "
            @click="resetNewChat(chat_type)"
            >重新提问</el-button
          >

          <div class="btn_right" v-if="chat_type == 7">
            <img
              src="../../assets/images/helpNo.png"
              v-if="!chatClaudeList[1].help"
              alt=""
              @click="showSetonHelpImg(9, true, chatClaudeList[1])"
            />
            <img
              src="../../assets/images/helpYes.png"
              v-else
              alt=""
              @click="showSetonHelpImg(9, false, chatClaudeList[1])"
            />
            <img
              src="../../assets/images/stepOnNo.png"
              v-if="!chatClaudeList[1].stepOn"
              alt=""
              @click="showSetonHelpImg(10, true, chatClaudeList[1])"
            />
            <img
              src="../../assets/images/stepOnYes.png"
              v-else
              alt=""
              @click="showSetonHelpImg(10, false, chatClaudeList[1])"
            />
            <img
              src="../../assets/images/copyBlack.png"
              alt=""
              @click="copyText(chatClaudeList[1].content)"
            />
          </div>
        </div>
      </div>

      <!-- 
        ChatGLM对话结果
       -->
      <div
        class="answerResults"
        v-if="
          isShowResultsChatGLM &&
          (chat_type == 8 || chat_type == 1003 || chat_type == 1001 || chat_type == 1004)
        "
      >
        <div class="onAnalysis">
          <div class="titlea">
            <div style="width: 33%"></div>
            <div style="width: 33%">AI分析结果</div>
            <div
              style="
                width: 33%;
                display: flex;
                align-items: center;
                justify-content: flex-end;
                cursor: pointer;
              "
              @click="shareGuangchang"
            >
              <img src="../../assets/images/shareicon.png" alt="" />
              分享到问答广场
            </div>
          </div>
          <div style="padding: 20px; border-radius: 5px; background: #ffffff">
            <!-- 讯飞星火 -->
            <div
              class="replay"
              v-if="chat_type == 8 || chat_type == 1003 || chat_type == 1001 || chat_type == 1004"
              v-html="isDetailChatGLM ? chatChatGLMList[1].markedContent : replyChatGLM"
            ></div>
            <div v-if="!isuser">
              {{ queryErrorMsg }}
              <el-button
                style="
                  background-color: #1f64ff;
                  border-radius: 4px;
                  padding: 6px 60px;
                  color: #ffffff;
                  margin-top: 5px;
                "
                @click="$refs.Pay.PayVisible = true"
                >开通VIP</el-button
              >
            </div>

            <div class="consume">
              <span class="words">字数：{{ chatChatGLMList[1].content.length }}</span>
            </div>
            <div class="prompt" v-if="isBtnChatGLM">
              当前内容为AI生成，不做任何决策使用！由此引发的一切后果，需自行承担，请知悉，已通过阿里云内容安全审核
            </div>
          </div>
        </div>

        <div class="button_list">
          <div
            class="btn_left"
            v-if="chat_type == 8 || chat_type == 1003 || chat_type == 1001 || chat_type == 1004"
          >
            <span class="optimize_question" @click="optimizeAnswers(chatChatGLMList[1])">
              <img
                src="../../assets/images/file_download_done.png"
                alt=""
                style="margin-right: 8px"
              />
              <span>优化本次回答</span>
            </span>
            <span class="reset_speak" @click="resetController">
              <img
                src="../../assets/images/reset1.png"
                alt=""
                style="margin-right: 8px"
              />
              <span>重试</span>
            </span>
          </div>

          <el-button
            v-if="
              !isfinishChatGLM &&
              (chat_type == 8 || chat_type == 1003 || chat_type == 1001 || chat_type == 1001)
            "
            icon="el-icon-remove-outline"
            style="
              color: #1f64ff;
              font-size: 14px;
              padding: 6px 10px;
              border: 1px solid #1f64ff;
            "
            @click="endController(chatChatGLMList[1].session_code)"
            >停止回答</el-button
          >
          <el-button
            v-else
            icon="el-icon-remove-outline"
            style="
              color: #1f64ff;
              font-size: 14px;
              padding: 6px 10px;
              border: 1px solid #1f64ff;
            "
            @click="resetNewChat(chat_type)"
            >重新提问</el-button
          >

          <div
            class="btn_right"
            v-if="chat_type == 8 || chat_type == 1003 || chat_type == 1001 || chat_type == 1004"
          >
            <img
              src="../../assets/images/helpNo1.png"
              v-if="!chatChatGLMList[1].help"
              alt=""
              @click="showSetonHelpImg(11, true, chatChatGLMList[1])"
            />
            <img
              src="../../assets/images/helpYes1.png"
              v-else
              alt=""
              @click="showSetonHelpImg(11, false, chatChatGLMList[1])"
            />
            <div class="img_line"></div>
            <img
              src="../../assets/images/stepOnNo1.png"
              v-if="!chatChatGLMList[1].stepOn"
              alt=""
              @click="showSetonHelpImg(12, true, chatChatGLMList[1])"
            />
            <img
              src="../../assets/images/stepOnYes1.png"
              v-else
              alt=""
              @click="showSetonHelpImg(12, false, chatChatGLMList[1])"
            />
            <div class="img_line"></div>
            <img
              src="../../assets/images/copyvideo.png"
              alt=""
              @click="copyText(chatChatGLMList[1].content)"
            />
          </div>
        </div>
      </div>

      <!-- 
        通义千问对话结果
       -->
      <div class="answerResults" v-if="isShowResultsTongyi && chat_type == 10">
        <div class="onAnalysis">
          <div class="titlea">
            <div style="width: 33%"></div>
            <div style="width: 33%">AI分析结果</div>
            <div
              style="
                width: 33%;
                display: flex;
                align-items: center;
                justify-content: flex-end;
                cursor: pointer;
              "
              @click="shareGuangchang"
            >
              <img src="../../assets/images/shareicon.png" alt="" />
              分享到问答广场
            </div>
          </div>
          <div style="padding: 20px; border-radius: 5px; background: #ffffff">
            <!-- 讯飞星火 -->
            <div
              class="replay"
              v-if="chat_type == 10"
              v-html="isDetailTongyi ? chatTongyiList[1].markedContent : replyTongyi"
            ></div>
            <div v-if="!isuser">
              {{ queryErrorMsg }}
              <el-button
                style="
                  background-color: #1f64ff;
                  border-radius: 4px;
                  padding: 6px 60px;
                  color: #ffffff;
                  margin-top: 5px;
                "
                @click="$refs.Pay.PayVisible = true"
                >开通VIP</el-button
              >
            </div>

            <div class="consume">
              <span class="words">字数：{{ chatTongyiList[1].content.length }}</span>
            </div>
            <div class="prompt" v-if="isBtnTongyi">
              当前内容为AI生成，不做任何决策使用！由此引发的一切后果，需自行承担，请知悉，已通过阿里云内容安全审核
            </div>
          </div>
        </div>

        <div class="button_list">
          <div class="btn_left" v-if="chat_type == 10">
            <el-button
              icon="el-icon-check"
              style="
                color: #1f64ff;
                font-size: 14px;
                padding: 6px 10px;
                border: 1px solid #1f64ff;
              "
              @click="optimizeAnswers(chatTongyiList[1])"
              >优化本次回答</el-button
            >
            <el-button
              icon="el-icon-refresh"
              style="
                color: #1f64ff;
                font-size: 14px;
                padding: 6px 10px;
                border: 1px solid #1f64ff;
              "
              @click="resetController"
              >重试</el-button
            >
          </div>

          <el-button
            v-if="!isfinishTongyi && chat_type == 10"
            icon="el-icon-remove-outline"
            style="
              color: #1f64ff;
              font-size: 14px;
              padding: 6px 10px;
              border: 1px solid #1f64ff;
            "
            @click="endController(chatTongyiList[1].session_code)"
            >停止回答</el-button
          >
          <el-button
            v-else
            icon="el-icon-remove-outline"
            style="
              color: #1f64ff;
              font-size: 14px;
              padding: 6px 10px;
              border: 1px solid #1f64ff;
            "
            @click="resetNewChat(chat_type)"
            >重新提问</el-button
          >

          <div class="btn_right" v-if="chat_type == 10">
            <img
              src="../../assets/images/helpNo.png"
              v-if="!chatTongyiList[1].help"
              alt=""
              @click="showSetonHelpImg(13, true, chatTongyiList[1])"
            />
            <img
              src="../../assets/images/helpYes.png"
              v-else
              alt=""
              @click="showSetonHelpImg(13, false, chatTongyiList[1])"
            />
            <img
              src="../../assets/images/stepOnNo.png"
              v-if="!chatTongyiList[1].stepOn"
              alt=""
              @click="showSetonHelpImg(14, true, chatTongyiList[1])"
            />
            <img
              src="../../assets/images/stepOnYes.png"
              v-else
              alt=""
              @click="showSetonHelpImg(14, false, chatTongyiList[1])"
            />
            <img
              src="../../assets/images/copyBlack.png"
              alt=""
              @click="copyText(chatTongyiList[1].content)"
            />
          </div>
        </div>
      </div>

      <!-- 
        360对话结果
       -->
      <div class="answerResults" v-if="isShowResultsShangtang && chat_type == 12">
        <div class="onAnalysis">
          <div class="titlea">
            <div style="width: 33%"></div>
            <div style="width: 33%">AI分析结果</div>
            <div
              style="
                width: 33%;
                display: flex;
                align-items: center;
                justify-content: flex-end;
                cursor: pointer;
              "
              @click="shareGuangchang"
            >
              <img src="../../assets/images/shareicon.png" alt="" />
              分享到问答广场
            </div>
          </div>
          <div style="padding: 20px; border-radius: 5px; background: #ffffff">
            <!-- 讯飞星火 -->
            <div
              class="replay"
              v-if="chat_type == 12"
              v-html="
                isDetailShangtang ? chatShangtangList[1].markedContent : replyShangtang
              "
            ></div>
            <div v-if="!isuser">
              {{ queryErrorMsg }}
              <el-button
                style="
                  background-color: #1f64ff;
                  border-radius: 4px;
                  padding: 6px 60px;
                  color: #ffffff;
                  margin-top: 5px;
                "
                @click="$refs.Pay.PayVisible = true"
                >开通VIP</el-button
              >
            </div>

            <div class="consume">
              <span class="words">字数：{{ chatShangtangList[1].content.length }}</span>
            </div>
            <div class="prompt" v-if="isBtnShangtang">
              当前内容为AI生成，不做任何决策使用！由此引发的一切后果，需自行承担，请知悉，已通过阿里云内容安全审核
            </div>
          </div>
        </div>

        <div class="button_list">
          <div class="btn_left" v-if="chat_type == 12">
            <el-button
              icon="el-icon-check"
              style="
                color: #1f64ff;
                font-size: 14px;
                padding: 6px 10px;
                border: 1px solid #1f64ff;
              "
              @click="optimizeAnswers(chatShangtangList[1])"
              >优化本次回答</el-button
            >
            <el-button
              icon="el-icon-refresh"
              style="
                color: #1f64ff;
                font-size: 14px;
                padding: 6px 10px;
                border: 1px solid #1f64ff;
              "
              @click="resetController"
              >重试</el-button
            >
          </div>

          <el-button
            v-if="!isfinishShangtang && chat_type == 12"
            icon="el-icon-remove-outline"
            style="
              color: #1f64ff;
              font-size: 14px;
              padding: 6px 10px;
              border: 1px solid #1f64ff;
            "
            @click="endController(chatShangtangList[1].session_code)"
            >停止回答</el-button
          >
          <el-button
            v-else
            icon="el-icon-remove-outline"
            style="
              color: #1f64ff;
              font-size: 14px;
              padding: 6px 10px;
              border: 1px solid #1f64ff;
            "
            @click="resetNewChat(chat_type)"
            >重新提问</el-button
          >

          <div class="btn_right" v-if="chat_type == 12">
            <img
              src="../../assets/images/helpNo.png"
              v-if="!chatShangtangList[1].help"
              alt=""
              @click="showSetonHelpImg(15, true, chatShangtangList[1])"
            />
            <img
              src="../../assets/images/helpYes.png"
              v-else
              alt=""
              @click="showSetonHelpImg(15, false, chatShangtangList[1])"
            />
            <img
              src="../../assets/images/stepOnNo.png"
              v-if="!chatShangtangList[1].stepOn"
              alt=""
              @click="showSetonHelpImg(16, true, chatShangtangList[1])"
            />
            <img
              src="../../assets/images/stepOnYes.png"
              v-else
              alt=""
              @click="showSetonHelpImg(16, false, chatShangtangList[1])"
            />
            <img
              src="../../assets/images/copyBlack.png"
              alt=""
              @click="copyText(chatShangtangList[1].content)"
            />
          </div>
        </div>
      </div>
    </div>

    <div class="problem_square" id="problem_square">
      <div class="mskd">
        <div class="squar-title">
          <div class="title">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="6"
              height="16"
              viewBox="0 0 6 16"
              fill="none"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M0 13C0 14.6569 1.34315 16 3 16C4.65685 16 6 14.6569 6 13V3C6 1.34315 4.65685 0 3 0C1.34315 0 0 1.34315 0 3V13Z"
                fill="#1F64FF"
              />
            </svg>
            <span style="margin: 0 10px 0 6px">问答广场</span>
            <span style="color: #666; font-size: 12px">其他人都在问什么</span>
          </div>
          <el-button class="btn" type="text" style="padding: 0" @click="queryShareList"
            >换一批<i class="el-icon-refresh"></i
          ></el-button>
          <!-- <div>换一批</div> -->
        </div>
        <div
          style="text-align: center; margin-top: 5px; color: #999; font-size: 14px"
          v-if="!squareList"
        >
          暂无相关数据推荐
        </div>
        <div class="question_square-list" v-else>
          <div
            :class="squareList.length - 1 == i ? 'item item-on' : 'item'"
            v-for="(item, i) in squareList"
            :key="i"
            @click="squareDetail(item)"
          >
            <div
              v-for="(v, ind) in item.session_data"
              :key="ind"
              :class="v.role == 'user' ? 'user' : 'assistant'"
            >
              {{ v.content }}
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 二维码 -->
    <div class="services" id="services_code">
      <div class="items" style="margin-right: 30px" v-if="item.contact_qr_code">
        <img :src="item.contact_qr_code" alt="" />
        <div class="item_text">{{ item.contact_qr_code_desc }}</div>
      </div>
      <div class="items" style="margin-left: 30px" v-if="item.interest_group_code">
        <img :src="item.interest_group_code" alt="" />
        <div class="item_text">{{ item.interest_group_code_desc }}</div>
      </div>
    </div>

    <!-- 补充弹窗 -->
    <el-dialog :visible.sync="supplyVisible" width="500px" :modal-append-to-body="false">
      <div class="supply_cont">
        <el-input
          type="textarea"
          resize="none"
          :rows="3"
          placeholder="请输入您要优化的内容"
          v-model="supplyValue"
        ></el-input>
      </div>

      <span slot="footer" class="chat-dialog-footer" @click="keepAs(2)">
        发送
        <!-- <img class="supply_img" src="../../assets/images/send.png" alt=""> -->
      </span>
    </el-dialog>

    <!-- 注册组件 -->
    <Register ref="Register"></Register>

    <pay ref="Pay"></pay>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import httpUrls from "../../api/requestURL";
import { textDecoder, arr2str } from "../../utils/download";
import {
  chatLikes,
  questionConfig,
  chatSquareList,
  chareSquare,
  chaserDetail,
} from "../../api/prompts";
import Register from "../../components/register";
import { options } from "marked";
import { submitFootprint, matchContextAssistant } from "../../api/chatMG";

import { marked } from "marked";
import hljs from "highlight.js";

import pay from "../pay";

export default {
  name: "template-chat",
  data() {
    return {
      loginInfo: {},
      sendValue: "",
      supplyValue: "",
      oldSendValue: "",
      supplyVisible: false,
      isShowResults: false,

      // 会话结果
      isShowResultsThreeFive: false,
      isShowResultsFourZero: false,
      isShowResultsYiyan: false,
      isShowResultsXunfei: false,
      isShowResultsClaude: false,
      isShowResultsChatGLM: false,
      isShowResultsTongyi: false,
      isShowResultsShangtang: false,

      replyThreeFive: "", // 实时回答 / 35
      replyFourZero: "", // 实时回答 / 40
      replyYiyan: "", // 实时回答 / 文心一言
      replyXunfei: "", // 实时回答 / 讯飞星火
      replyClaude: "", // 实时回答 / 讯飞星火
      replyChatGLM: "", // 实时回答 / 讯飞星火
      replyTongyi: "", // 实时回答 / 讯飞星火
      replyShangtang: "", // 实时回答 / 讯飞星火

      timerThreeFive: 0, // 定时器的时间 / 35
      timerFourZero: 0, // 定时器的时间 / 40
      timerYiyan: 0, // 定时器的时间 / 文心一言
      timerXunfei: 0, // 定时器的时间 / 讯飞星火
      timerClaude: 0, // 定时器的时间 / 讯飞星火
      timerChatGLM: 0, // 定时器的时间 / 讯飞星火
      timerTongyi: 0, // 定时器的时间 / 讯飞星火
      timerShangtang: 0, // 定时器的时间 / 讯飞星火

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
      isTimeChatGLM: false, // 开启获取中对话框 / 讯飞星火
      isTimeTongyi: false, // 开启获取中对话框 / 讯飞星火
      isTimeShangtang: false, // 开启获取中对话框 / 讯飞星火

      // isfinish: true,
      isfinishThreeFive: true, // 完成打字效果 / 35
      isfinishFourZero: true, // 完成打字效果 / 40
      isfinishYiyan: true, // 完成打字效果 / 文心一言
      isfinishXunfei: true, // 完成打字效果 / 讯飞星火
      isfinishClaude: true, // 完成打字效果 / 讯飞星火
      isfinishChatGLM: true, // 完成打字效果 / 讯飞星火
      isfinishTongyi: true, // 完成打字效果 / 讯飞星火
      isfinishShangtang: true, // 完成打字效果 / 讯飞星火

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
      isDetailChatGLM: false, // 显示会话内容 / 40
      isDetailTongyi: false, // 显示会话内容 / 40
      isDetailShangtang: false, // 显示会话内容 / 40

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
      isShowTemplateSelte: false, // 查询模板
      isShowTemplate: true, // 热词推荐
      textAreaLength: "900", // 问题长度
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
      textareaHeight: "80px", // 发送框的同一高度
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
      tokenNumberClaude: {
        completionTokens: 0,
        promptTokens: 0,
        integral: 0,
        totalTokens: 0,
      },
      tokenNumberChatGLM: {
        completionTokens: 0,
        promptTokens: 0,
        integral: 0,
        totalTokens: 0,
      },
      tokenNumberTongyi: {
        completionTokens: 0,
        promptTokens: 0,
        integral: 0,
        totalTokens: 0,
      },
      tokenNumberShangtang: {
        completionTokens: 0,
        promptTokens: 0,
        integral: 0,
        totalTokens: 0,
      },

      questionList: [], // 问题列表
      inputVisible: false,
      inputValue: "",
      squareList: [], // 问题广场列表
      chatHeight: "",
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
      chat_type: "1004",
      chat_model: 'umi-pro-4k'
    };
  },
  computed: {
    ...mapGetters(["contactService", "isShowNotice"]),
  },
  components: {
    Register,
    pay,
  },
  props: {
    item: {
      type: Object,
      default: {},
    },
  },
  watch: {
    questionList: {
      deep: true,
      handler() {
        // console.log(this.questionList, "watch");
        this.questionList.forEach((v) => {
          if (v.selectItem != "") {
            v.required = false;
          }
        });
      },
    },
    chat_type: {
      deep: true,
      handler() {
        // console.log(this.chat_type);
        // console.log(this.chatChatGLMList);
      },
    },
  },
  created() {
    // 获取用户要输入的内容
    questionConfig({ question_id: this.item.question_id }).then((res) => {
      console.log("111111");
      // console.log(res,'questionConfig');
      if (res.data.length != 0) {
        res.data.forEach((v) => {
          console.log(v, "questionList");
          let arrss = [];
          v.options.forEach((a) => {
            arrss.push(a);
          });
          if (v.info_type_name == "CheckBox" || v.info_type_name == "Tag") {
            this.questionList.push({
              ...v,
              tagOptions: arrss,
              selectItem: [], // 选择的内容
              required: false,
            });
          } else {
            this.questionList.push({
              ...v,
              tagOptions: arrss,
              selectItem: "", // 选择的内容
              required: false,
            });
          }
        });
      } else {
        console.log(this.questionList, "questionList为0");
        this.questionList.push({
          options: [
            {
              option_id: "1",
              value: "你的提问",
            },
          ],
          info_type_id: "-1",
          info_type_name: "Textarea",
          title: "你的提问",
          selectItem: this.item.example_question ? this.item.example_question : "",
          placeholder: this.item.example_question
            ? this.item.example_question
            : "请说出你的需求，我来帮你解答",
          weight: "1",
          is_required: "1",
        });
      }
    });

    this.queryShareList();
  },
  mounted() {
    console.log(this.item.title, "当前页面的信息");

    this.loginInfo = JSON.parse(localStorage.getItem("userInfo"));
    sessionStorage.removeItem("questonsList");
    this.$nextTick(() => {
      this.chatHeight =
        document.getElementsByClassName("title-list")[0].clientHeight + "px";
    });
  },
  methods: {
    //开启新会话
    resetNewChat(aiId) {
      this.isShowResultsThreeFive = false;
      this.isShowResultsFourZero = false;
      this.isShowResultsYiyan = false;
      this.isShowResultsXunfei = false;
      this.isShowResultsClaude = false;
      this.isShowResultsChatGLM = false;
      this.isShowResultsTongyi = false;
      this.isShowResultsShangtang = false;
      this.endController("", false); // 终止回答

      this.sendValue = "";
    },
    // 分享到广场
    shareGuangchang() {
      this.$confirm("是否将您的答案和问题分享到问答广场", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          let sessionData = JSON.parse(sessionStorage.getItem("questonsList"));
          let questionData = []; // 用户填写的数据
          sessionData.forEach((v) => {
            if (v.info_type_name == "Tag") {
              let arr = [];
              v.tagOptions.forEach((item) => {
                arr.push(item.value);
              });
              questionData.push({
                title: v.title,
                content: arr,
                options: v.options,
                info_type_name: v.info_type_name,
                is_required: v.is_required,
              });
            } else if (v.info_type_name == "CheckBox") {
              let arr = [];
              v.selectItem.forEach((element) => {
                arr.push(element);
              });
              questionData.push({
                title: v.title,
                content: arr,
                options: v.options,
                info_type_name: v.info_type_name,
                is_required: v.is_required,
              });
            } else {
              questionData.push({
                title: v.title,
                content: v.selectItem,
                options: v.options,
                info_type_name: v.info_type_name,
                is_required: v.is_required,
              });
            }
          });
          let dataJson = {
            session_code: "",
            module_id: this.item.module_id,
            question_id: this.item.question_id,
            chat_group_code: "",
            question_data: questionData,
            session_data: "",
          };
          let chatData = [];
          if (this.chat_type == 0) {
            this.chatList.forEach((v) => {
              chatData.push({
                role: v.role,
                content: v.content,
              });
            });
            dataJson.session_code = this.chatList[1].session_code;
            dataJson.chat_group_code = this.chatList[1].chat_group_code;
            dataJson.session_data = chatData;
          } else if (this.chat_type == 1) {
            this.chatVipList.forEach((v) => {
              chatData.push({
                role: v.role,
                content: v.content,
              });
            });
            dataJson.session_code = this.chatVipList[1].session_code;
            dataJson.chat_group_code = this.chatVipList[1].chat_group_code;
            dataJson.session_data = chatData;
          } else if (this.chat_type == 4) {
            this.chatYiyanList.forEach((v) => {
              chatData.push({
                role: v.role,
                content: v.content,
              });
            });
            dataJson.session_code = this.chatYiyanList[1].session_code;
            dataJson.chat_group_code = this.chatYiyanList[1].chat_group_code;
            dataJson.session_data = chatData;
          } else if (this.chat_type == 5) {
            this.chatXunfeiList.forEach((v) => {
              chatData.push({
                role: v.role,
                content: v.content,
              });
            });
            dataJson.session_code = this.chatXunfeiList[1].session_code;
            dataJson.chat_group_code = this.chatXunfeiList[1].chat_group_code;
            dataJson.session_data = chatData;
          } else if (this.chat_type == 7) {
            this.chatClaudeList.forEach((v) => {
              chatData.push({
                role: v.role,
                content: v.content,
              });
            });
            dataJson.session_code = this.chatClaudeList[1].session_code;
            dataJson.chat_group_code = this.chatClaudeList[1].chat_group_code;
            dataJson.session_data = chatData;
          } else if (
            this.chat_type == 8 ||
            this.chat_type == 1003 ||
            this.chat_type == 1001 || this.chat_type == 1004
          ) {
            this.chatChatGLMList.forEach((v) => {
              chatData.push({
                role: v.role,
                content: v.content,
              });
            });
            dataJson.session_code = this.chatChatGLMList[1].session_code;
            dataJson.chat_group_code = this.chatChatGLMList[1].chat_group_code;
            dataJson.session_data = chatData;
          } else if (this.chat_type == 10) {
            this.chatTongyiList.forEach((v) => {
              chatData.push({
                role: v.role,
                content: v.content,
              });
            });
            dataJson.session_code = this.chatTongyiList[1].session_code;
            dataJson.chat_group_code = this.chatTongyiList[1].chat_group_code;
            dataJson.session_data = chatData;
          } else if (this.chat_type == 12) {
            this.chatShangtangList.forEach((v) => {
              chatData.push({
                role: v.role,
                content: v.content,
              });
            });
            dataJson.session_code = this.chatShangtangList[1].session_code;
            dataJson.chat_group_code = this.chatShangtangList[1].chat_group_code;
            dataJson.session_data = chatData;
          }

          chareSquare(dataJson).then((res) => {
            if (res.code == 20000) {
              this.$message.success("分享成功");
            } else if (res.code > 20000 && res.code < 50000) {
              this.$message.error(res.msg);
            }
            // console.log(res);
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消",
          });
        });
    },

    // 删除标签
    handleClose(tag, item) {
      this.questionList.forEach((v) => {
        if (v.info_type_id == item.info_type_id && v.title == item.title) {
          v.tagOptions.splice(v.options.indexOf(tag), 1);
        }
      });
      // this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
    },

    // 输入框聚焦
    showInput() {
      this.inputVisible = true;
      this.$nextTick(() => {
        this.$refs.saveTagInput.$refs.input.focus();
      });
    },

    // 添加标签
    handleInputConfirm(item) {
      let inputValue = this.inputValue;
      if (inputValue) {
        this.questionList.forEach((v) => {
          if (v.info_type_id == item.info_type_id && v.title == item.title) {
            v.tagOptions.push({
              option_id: v.options.length,
              value: inputValue,
            });
          }
        });
      }
      this.inputVisible = false;
      this.inputValue = "";
    },

    // 获取问答广场列表数据
    queryShareList() {
      chatSquareList(
        `module_id=${this.item.module_id}&question_id=${this.item.question_id}`
      ).then((res) => {
        // console.log(`module_id=${this.item.module_id}&question_id=${this.item.question_id}`,'问答广场请求参数')
        // console.log(res,'queryShareList');
        this.squareList = res.data;
      });
    },

    // 问答广场的详情
    squareDetail(item) {
      // console.log(item);
      let questionDatas = JSON.parse(sessionStorage.getItem("questonsList"));
      chaserDetail(item.session_code).then((res) => {
        // console.log("进入chaserDetail");
        // console.log(res);
        // console.log(res.data.question_data, res.data.session_data[1].content);
        // if (!questionDatas) {
        //   this.questionList = questionDatas
        // }
        this.questionList.forEach((item) => {
          res.data.question_data.forEach((v) => {
            if (item.info_type_name == "Tag" && v.info_type_name == "Tag") {
              item.options.push({ ...v.options });
              if (typeof v.content == "string") {
                item.tagOptions.push({ opton_id: -1, value: v.content });
              } else {
                v.content.forEach((a, s) => {
                  item.tagOptions.push({
                    option_id: s,
                    value: a,
                  });
                });
              }
            } else if (
              item.info_type_name == "CheckBox" &&
              v.info_type_name == "CheckBox"
            ) {
              item.options.push({ ...v.options });
              v.content.forEach((a) => {
                item.selectItem.push(a);
              });
            } else if (item.info_type_name == "Select" && v.info_type_name == "Select") {
              if (v.hasOwnProperty("options")) {
                v.options.forEach((b) => {
                  if (JSON.stringify(item.options).indexOf(b.info_type_id) == -1) {
                    item.options.push(b);
                  }
                });
                // item.options.push({...v.options})
              }
              // item.selectItem.push(v.content)
            } else {
              item.selectItem = v.content;
            }
          });
        });
        const renderer = new marked.Renderer();
        // 重写代码块渲染方法，使用highlight.js进行代码高亮
        renderer.code = (code, language) => {
          const validLanguage = hljs.getLanguage(language) ? language : "plaintext";
          const highlightedCode = hljs.highlight(validLanguage, code).value;
          return `<pre><code class="hljs ${validLanguage}">${highlightedCode}</code></pre>`;
        };
        if (this.chat_type == 0) {
          this.chatList = res.data.session_data;
          this.chatList[0].session_code = res.data.session_code;
          this.chatList[1].session_code = res.data.session_code;
          this.replyThreeFive = marked(res.data.session_data[1].content, {
            renderer,
          });
          this.chatList[1].markedContent = marked(res.data.session_data[1].content, {
            renderer,
          });
          this.isShowResultsThreeFive = true;
        } else if (this.chat_type == 1) {
          this.chatVipList = res.data.session_data;
          this.chatVipList[0].session_code = res.data.session_code;
          this.chatVipList[1].session_code = res.data.session_code;
          this.replyFourZero = marked(res.data.session_data[1].content, {
            renderer,
          });
          this.chatVipList[1].markedContent = marked(res.data.session_data[1].content, {
            renderer,
          });
          this.isShowResultsFourZero = true;
        } else if (this.chat_type == 4) {
          this.chatYiyanList = res.data.session_data;
          this.chatYiyanList[0].session_code = res.data.session_code;
          this.chatYiyanList[1].session_code = res.data.session_code;
          this.replyYiyan = marked(res.data.session_data[1].content, {
            renderer,
          });
          this.chatYiyanList[1].markedContent = marked(res.data.session_data[1].content, {
            renderer,
          });
          this.isShowResultsYiyan = true;
        } else if (this.chat_type == 5) {
          this.chatXunfeiList = res.data.session_data;
          this.chatXunfeiList[0].session_code = res.data.session_code;
          this.chatXunfeiList[1].session_code = res.data.session_code;
          this.replyXunfei = marked(res.data.session_data[1].content, {
            renderer,
          });
          this.chatXunfeiList[1].markedContent = marked(
            res.data.session_data[1].content,
            { renderer }
          );
          this.isShowResultsXunfei = true;
        } else if (this.chat_type == 7) {
          this.chatClaudeList = res.data.session_data;
          this.chatClaudeList[0].session_code = res.data.session_code;
          this.chatClaudeList[1].session_code = res.data.session_code;
          this.replyClaude = marked(res.data.session_data[1].content, {
            renderer,
          });
          this.chatClaudeList[1].markedContent = marked(
            res.data.session_data[1].content,
            { renderer }
          );
          this.isShowResultsClaude = true;
        } else if (
          this.chat_type == 8 ||
          this.chat_type == 1003 ||
          this.chat_type == 1001 || this.chat_type == 1004
        ) {
          this.chatChatGLMList = res.data.session_data;
          this.chatChatGLMList[0].session_code = res.data.session_code;
          this.chatChatGLMList[1].session_code = res.data.session_code;
          this.replyChatGLM = marked(res.data.session_data[1].content, {
            renderer,
          });
          this.chatChatGLMList[1].markedContent = marked(
            res.data.session_data[1].content,
            { renderer }
          );
          this.isShowResultsChatGLM = true;
        } else if (this.chat_type == 10) {
          this.chatTongyiList = res.data.session_data;
          this.chatTongyiList[0].session_code = res.data.session_code;
          this.chatTongyiList[1].session_code = res.data.session_code;
          this.replyTongyi = marked(res.data.session_data[1].content, {
            renderer,
          });
          this.chatTongyiList[1].markedContent = marked(
            res.data.session_data[1].content,
            { renderer }
          );
          this.isShowResultsTongyi = true;
        } else if (this.chat_type == 12) {
          this.chatShangtangList = res.data.session_data;
          this.chatShangtangList[0].session_code = res.data.session_code;
          this.chatShangtangList[1].session_code = res.data.session_code;
          this.replyShangtang = marked(res.data.session_data[1].content, {
            renderer,
          });
          this.chatShangtangList[1].markedContent = marked(
            res.data.session_data[1].content,
            { renderer }
          );
          this.isShowResultsShangtang = true;
        }

        sessionStorage.setItem("questonsList", JSON.stringify(this.questionList));
      });
    },

    sendMsg(bool = "") {
      console.log("进入");
      if (this.loginInfo.role == "guess") {
        this.$refs.Register.registerVisible = true;
        return;
      }
      this.chatContScroll = "";
      // console.log("sendMsg");
      // 重新回答
      if (bool == "true" && sessionStorage.getItem("questonsList")) {
        this.questionList = JSON.parse(sessionStorage.getItem("questonsList"));
      }
      let returmSend = false;
      this.questionList.forEach((v) => {
        if (
          v.info_type_name == "Tag" &&
          v.is_required == "1" &&
          (v.tagOptions.length == 0 || v.tagOptions == "")
        ) {
          console.log(1);
          v.required = true;
          returmSend = true;
        } else if (
          v.info_type_name != "Tag" &&
          v.is_required == "1" &&
          v.selectItem == ""
        ) {
          this.$message.error("请说出你的需求！");
          console.log(2);
          v.required = true;
          returmSend = true;
        }
      });
      if (returmSend) {
        return;
      }
      this.questionList.forEach((v) => {
        if (v.info_type_name == "Input" || v.info_type_name == "Textarea") {
          this.sendValue += v.selectItem + ",";
        }
        if (
          (v.info_type_name == "Redio" || v.info_type_name == "Select") &&
          v.selectItem != ""
        ) {
          this.sendValue += v.title + ":";
          this.sendValue += v.selectItem.value + ",";
        }
        if (v.info_type_name == "CheckBox" && v.selectItem.length > 0) {
          this.sendValue += v.title + ":";
          v.selectItem.forEach((item) => {
            this.sendValue += item.value + ",";
          });
        }
        if (v.info_type_name == "Tag") {
          this.sendValue += v.title + ":";
          v.tagOptions.forEach((item) => {
            this.sendValue += item.value + ",";
          });
        }
      });
      // 判断输入的文字和选中上下文的文字是否超过限制
      let msgList = "";
      this.ordeAIList.forEach((v) => {
        msgList += v.content;
      });
      msgList += this.sendValue;
      this.isuser = true;
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
      if (this.chat_type == 0) {
        this.chatList = [];
      } else if (this.chat_type == 1) {
        this.chatVipList = [];
      } else if (this.chat_type == 4) {
        this.chatYiyanList = [];
      } else if (this.chat_type == 5) {
        this.chatXunfeiList = [];
      } else if (this.chat_type == 7) {
        this.chatClaudeList = [];
      } else if (
        this.chat_type == 8 ||
        this.chat_type ==  1003 ||
        this.chat_type == 1001 || this.chat_type == 1004
      ) {
        this.chatChatGLMList = [];
      } else if (this.chat_type == 10) {
        this.chatTongyiList = [];
      } else if (this.chat_type == 12) {
        this.chatShangtangList = [];
      }
      matchContextAssistant({
        company_id: this.item.question_id,
        clerk_id: this.item.question_id,
        question_content: this.sendValue,
      }).then((res) => {
        let val = null;
        let title = /^AI/.test(this.item.title.trim())
          ? this.item.title
          : "AI " + this.item.title.trim();

        if (this.chat_type == 0) {
          val = {
            chat_type: this.chat_type,
            session_code: bool == "true" ? localStorage.getItem("session_code") : "",
            chat_group_code: "",
            msg_list: JSON.stringify([
              {
                role: "user",
                content: title + " " + this.item.content + this.sendValue,
                covert_content:
                  "人格设定：你是xxxx公司开发的umibot。" +
                  res.data.prompt +
                  this.item.content_hidden,
              },
            ]),
          };
        } else if (this.chat_type == 1) {
          val = {
            chat_type: this.chat_type,
            session_code: bool == "true" ? localStorage.getItem("session_code1") : "",
            chat_group_code: "",
            // "session_code": '',
            // "chat_group_code": "",
            msg_list: JSON.stringify([
              {
                role: "user",
                content: title + " " + this.item.content + this.sendValue,
                covert_content:
                  "人格设定：你是xxxx公司开发的umibot。" +
                  res.data.prompt +
                  this.item.content_hidden,
              },
            ]),
          };
        } else if (this.chat_type == 4) {
          val = {
            chat_type: this.chat_type,
            session_code: bool == "true" ? localStorage.getItem("session_code4") : "",
            chat_group_code: "",
            // "session_code": '',
            // "chat_group_code": "",
            msg_list: JSON.stringify([
              {
                role: "user",
                content: title + " " + this.item.content + this.sendValue,
                covert_content:
                  "人格设定：你是xxxx公司开发的umibot。" +
                  res.data.prompt +
                  this.item.content_hidden,
              },
            ]),
          };
        } else if (this.chat_type == 5) {
          val = {
            chat_type: this.chat_type,
            session_code: bool == "true" ? localStorage.getItem("session_code5") : "",
            chat_group_code: "",
            // "session_code": '',
            // "chat_group_code": "",
            msg_list: JSON.stringify([
              {
                role: "user",
                content: title + " " + this.item.content + this.sendValue,
                covert_content:
                  "人格设定：你是xxxx公司开发的umibot。" +
                  res.data.prompt +
                  this.item.content_hidden,
              },
            ]),
          };
        } else if (this.chat_type == 7) {
          val = {
            chat_type: this.chat_type,
            session_code: bool == "true" ? localStorage.getItem("session_code7") : "",
            chat_group_code: "",
            // "session_code": '',
            // "chat_group_code": "",
            msg_list: JSON.stringify([
              {
                role: "user",
                content: title + " " + this.item.content + this.sendValue,
                covert_content:
                  "人格设定：你是xxxx公司开发的umibot。" +
                  res.data.prompt +
                  this.item.content_hidden,
              },
            ]),
          };
        } else if (
          this.chat_type == 8 ||
          this.chat_type == 1003 ||
          this.chat_type == 1001 || this.chat_type == 1004
        ) {
          val = {
            chat_type: this.chat_type,
            session_code: bool == "true" ? localStorage.getItem("session_code8") : "",
            chat_group_code: "",
            // "session_code": '',
            // "chat_group_code": "",
            msg_list: JSON.stringify([
              {
                role: "user",
                content: title + " " + this.item.content + this.sendValue,
                covert_content:
                  "人格设定：你是xxxx公司开发的umibot。" +
                  res.data.prompt +
                  this.item.content_hidden,
              },
            ])
          };
        } else if (this.chat_type == 10) {
          val = {
            chat_type: this.chat_type,
            session_code: bool == "true" ? localStorage.getItem("session_code10") : "",
            chat_group_code: "",
            // "session_code": '',
            // "chat_group_code": "",
            msg_list: JSON.stringify([
              {
                role: "user",
                content: title + " " + this.item.content + this.sendValue,
                covert_content:
                  "人格设定：你是xxxx公司开发的umibot。" +
                  res.data.prompt +
                  this.item.content_hidden,
              },
            ]),
          };
        } else if (this.chat_type == 12) {
          val = {
            chat_type: this.chat_type,
            session_code: bool == "true" ? localStorage.getItem("session_code11") : "",
            chat_group_code: "",
            // "session_code": '',
            // "chat_group_code": "",
            msg_list: JSON.stringify([
              {
                role: "user",
                content: title + " " + this.item.content + this.sendValue,
                covert_content:
                  "人格设定：你是xxxx公司开发的umibot。" +
                  res.data.prompt +
                  this.item.content_hidden,
              },
            ]),
          };
        }
        val.model = this.chat_model
        this.vipSend(bool, val);
      });
    },

    // 4.0信息发送
    async vipSend(bool = "", val) {
      if (bool != "true" && bool != "reset" && bool != "toChatFouty") {
        if (this.chat_type == 0) {
          // 是否显示关联上下文
          if (!this.isShowassociation && this.chatList.length != 0) {
            this.isShowassociation = !this.isShowassociation;
            return;
          }
          // 关联上下文的多选，此处仅用作展示
          this.chatList.forEach((v) => {
            v.checked = false;
          });
        } else if (this.chat_type == 1) {
          if (!this.isShowassociation && this.chatVipList.length != 0) {
            this.isShowassociation = !this.isShowassociation;
            return;
          }
          this.chatVipList.forEach((v) => {
            v.checked = false;
          });
        } else if (this.chat_type == 4) {
          if (!this.isShowassociation && this.chatYiyanList.length != 0) {
            this.isShowassociation = !this.isShowassociation;
            return;
          }
          this.chatYiyanList.forEach((v) => {
            v.checked = false;
          });
        } else if (this.chat_type == 5) {
          if (!this.isShowassociation && this.chatXunfeiList.length != 0) {
            this.isShowassociation = !this.isShowassociation;
            return;
          }
          this.chatXunfeiList.forEach((v) => {
            v.checked = false;
          });
        } else if (this.chat_type == 7) {
          if (!this.isShowassociation && this.chatClaudeList.length != 0) {
            this.isShowassociation = !this.isShowassociation;
            return;
          }
          this.chatClaudeList.forEach((v) => {
            v.checked = false;
          });
        } else if (
          this.chat_type == 8 ||
          this.chat_type == 1003 ||
          this.chat_type == 1001 || this.chat_type == 1004
        ) {
          if (!this.isShowassociation && this.chatChatGLMList.length != 0) {
            this.isShowassociation = !this.isShowassociation;
            return;
          }
          this.chatChatGLMList.forEach((v) => {
            v.checked = false;
          });
        } else if (this.chat_type == 10) {
          if (!this.isShowassociation && this.chatTongyiList.length != 0) {
            this.isShowassociation = !this.isShowassociation;
            return;
          }
          this.chatTongyiList.forEach((v) => {
            v.checked = false;
          });
        } else if (this.chat_type == 12) {
          if (!this.isShowassociation && this.chatShangtangList.length != 0) {
            this.isShowassociation = !this.isShowassociation;
            return;
          }
          this.chatShangtangList.forEach((v) => {
            v.checked = false;
          });
        }
      }
      this.isFoulLanguage = false;
      this.isShowassociation = false;
      this.isShowChecked = false;

      this.isShow = true; // 快速提问
      if (this.chat_type == 0) {
        this.isDetailThreeFive = false;
        this.isfinishThreeFive = false; // 完成打字效果
        this.isBtnThreeFive = false; // 是否允许重发
        this.replyThreeFive = "";
        this.isShowResultsThreeFive = true;
      } else if (this.chat_type == 1) {
        this.isBtnFourZero = false; // 是否允许重发
        this.isDetailFourZero = false;
        this.isfinishFourZero = false; // 完成打字效果
        this.replyFourZero = "";
        this.isShowResultsFourZero = true;
      } else if (this.chat_type == 4) {
        this.isBtnYiyan = false; // 是否允许重发
        this.isDetailYiyan = false;
        this.isfinishYiyan = false; // 完成打字效果
        this.replyYiyan = "";
        this.isShowResultsYiyan = true;
      } else if (this.chat_type == 5) {
        this.isBtnXunfei = false; // 是否允许重发
        this.isDetailXunfei = false;
        this.isfinishXunfei = false; // 完成打字效果
        this.replyXunfei = "";
        this.isShowResultsXunfei = true;
      } else if (this.chat_type == 7) {
        this.isBtnClaude = false; // 是否允许重发
        this.isDetailClaude = false;
        this.isfinishClaude = false; // 完成打字效果
        this.replyClaude = "";
        this.isShowResultsClaude = true;
      } else if (
        this.chat_type == 8 ||
        this.chat_type == 1003 ||
        this.chat_type == 1001 || this.chat_type == 1004
      ) {
        this.isBtnChatGLM = false; // 是否允许重发
        this.isDetailChatGLM = false;
        this.isfinishChatGLM = false; // 完成打字效果
        this.replyChatGLM = "";
        this.isShowResultsChatGLM = true;
      } else if (this.chat_type == 10) {
        this.isBtnTongyi = false; // 是否允许重发
        this.isDetailTongyi = false;
        this.isfinishTongyi = false; // 完成打字效果
        this.replyTongyi = "";
        this.isShowResultsTongyi = true;
      } else if (this.chat_type == 12) {
        this.isBtnShangtang = false; // 是否允许重发
        this.isDetailShangtang = false;
        this.isfinishShangtang = false; // 完成打字效果
        this.replyShangtang = "";
        this.isShowResultsShangtang = true;
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
        content: this.sendValue, // 预留，对话内容的转换
        // "markedContent": marked(this.sendValue),
        checked: false,
        help: false, // 点赞
        stepOn: false, // 点踩
        timer: false,
      };
      // console.log(this.sendValue, sendVal);

      // 获取当前会话列表的长度，用作右侧侧边栏的选中状态
      if (this.chat_type == 0) {
        this.chatList.push({ ...sendVal, id: this.chatList.length }); // id：用于关联上下文时的排序，防止顺序错乱导致接口返回的信息错误
        this.$store.dispatch("user/changeChatListLength", this.chatList.length);
      } else if (this.chat_type == 1) {
        this.chatVipList.push({ ...sendVal, id: this.chatVipList.length }); // id：用于关联上下文时的排序，防止顺序错乱导致接口返回的信息错误
        this.$store.dispatch("user/changeChatListLength", this.chatVipList.length);
      } else if (this.chat_type == 4) {
        this.chatYiyanList.push({ ...sendVal, id: this.chatYiyanList.length }); // id：用于关联上下文时的排序，防止顺序错乱导致接口返回的信息错误
        this.$store.dispatch("user/changeChatListLength", this.chatYiyanList.length);
      } else if (this.chat_type == 5) {
        this.chatXunfeiList.push({
          ...sendVal,
          id: this.chatXunfeiList.length,
        }); // id：用于关联上下文时的排序，防止顺序错乱导致接口返回的信息错误
        this.$store.dispatch("user/changeChatListLength", this.chatXunfeiList.length);
      } else if (this.chat_type == 7) {
        this.chatClaudeList.push({
          ...sendVal,
          id: this.chatClaudeList.length,
        }); // id：用于关联上下文时的排序，防止顺序错乱导致接口返回的信息错误
        this.$store.dispatch("user/changeChatListLength", this.chatClaudeList.length);
      } else if (
        this.chat_type == 8 ||
        this.chat_type == 1003 ||
        this.chat_type == 1001 || this.chat_type == 1004
      ) {
        this.chatChatGLMList.push({
          ...sendVal,
          id: this.chatChatGLMList.length,
        }); // id：用于关联上下文时的排序，防止顺序错乱导致接口返回的信息错误
        this.$store.dispatch("user/changeChatListLength", this.chatChatGLMList.length);
      } else if (this.chat_type == 10) {
        this.chatTongyiList.push({
          ...sendVal,
          id: this.chatTongyiList.length,
        }); // id：用于关联上下文时的排序，防止顺序错乱导致接口返回的信息错误
        this.$store.dispatch("user/changeChatListLength", this.chatTongyiList.length);
      } else if (this.chat_type == 12) {
        this.chatShangtangList.push({
          ...sendVal,
          id: this.chatShangtangList.length,
        }); // id：用于关联上下文时的排序，防止顺序错乱导致接口返回的信息错误
        this.$store.dispatch("user/changeChatListLength", this.chatShangtangList.length);
      }
      // console.log(this.chatYiyanList);

      this.toBottom();

      // this.isTime = true; // 思考中
      if (this.chat_type == 0) {
        this.isTimeThreeFive = true;
      } else if (this.chat_type == 1) {
        this.isTimeFourZero = true;
      } else if (this.chat_type == 4) {
        this.isTimeYiyan = true;
      } else if (this.chat_type == 5) {
        this.isTimeXunfei = true;
      } else if (this.chat_type == 7) {
        this.isTimeClaude = true;
      } else if (
        this.chat_type == 8 ||
        this.chat_type == 1003 ||
        this.chat_type == 1001 || this.chat_type == 1004
      ) {
        this.isTimeChatGLM = true;
      } else if (this.chat_type == 10) {
        this.isTimeTongyi = true;
      } else if (this.chat_type == 12) {
        this.isTimeShangtang = true;
      }
      if (bool != "toChatFouty") {
        if (this.chat_type == 0) {
          this.timerThreeFive = 0;
          this.t_timeThreeFive = setInterval(() => {
            this.timerThreeFive += 1;
          }, 1000);
        } else if (this.chat_type == 1) {
          this.timerFourZero = 0;
          this.t_timeFourZero = setInterval(() => {
            this.timerFourZero += 1;
          }, 1000);
        } else if (this.chat_type == 4) {
          this.timerYiyan = 0;
          this.t_timeYiyan = setInterval(() => {
            this.timerYiyan += 1;
          }, 1000);
        } else if (this.chat_type == 5) {
          this.timerXunfei = 0;
          this.t_timeXunfei = setInterval(() => {
            this.timerXunfei += 1;
          }, 1000);
        } else if (this.chat_type == 7) {
          this.timerClaude = 0;
          this.t_timeClaude = setInterval(() => {
            this.timerClaude += 1;
          }, 1000);
        } else if (
          this.chat_type == 8 ||
          this.chat_type == 1003 ||
          this.chat_type == 1001 || this.chat_type == 1004
        ) {
          this.timerChatGLM = 0;
          this.t_timeChatGLM = setInterval(() => {
            this.timerChatGLM += 1;
          }, 1000);
        } else if (this.chat_type == 10) {
          this.timerTongyi = 0;
          this.t_timeTongyi = setInterval(() => {
            this.timerTongyi += 1;
          }, 1000);
        } else if (this.chat_type == 12) {
          this.timerShangtang = 0;
          this.t_timeShangtang = setInterval(() => {
            this.timerShangtang += 1;
          }, 1000);
        }
      }

      // 关联上下文时，拿到对应的值然后清空对应的数据
      if (Number(this.association) == 1) {
        this.ordeAIList.sort((a, b) => {
          return a.id - b.id;
        });
        let contemt = [];
        this.ordeAIList.forEach((v) => {
          contemt.push({
            role: v.role,
            content: v.content,
          });
        });

        if (this.chat_type == 0) {
          val = {
            chat_type: this.chat_type,
            session_code: bool == "true" ? localStorage.getItem("session_code") : "",
            chat_group_code: "",
            // 'session_code': '',
            // 'chat_group_code': "",
            msg_list: JSON.stringify([
              ...contemt,
              { role: "user", content: this.sendValue },
            ]),
          };
        } else if (this.chat_type == 1) {
          val = {
            chat_type: this.chat_type,
            session_code: bool == "true" ? localStorage.getItem("session_code1") : "",
            chat_group_code: "",
            // 'session_code': '',
            // 'chat_group_code': "",
            msg_list: JSON.stringify([
              ...contemt,
              { role: "user", content: this.sendValue },
            ]),
          };
        } else if (this.chat_type == 4) {
          val = {
            chat_type: this.chat_type,
            session_code: bool == "true" ? localStorage.getItem("session_code4") : "",
            chat_group_code: "",
            // 'session_code': '',
            // 'chat_group_code': "",
            msg_list: JSON.stringify([
              ...contemt,
              { role: "user", content: this.sendValue },
            ]),
          };
        } else if (this.chat_type == 5) {
          val = {
            chat_type: this.chat_type,
            session_code: bool == "true" ? localStorage.getItem("session_code5") : "",
            chat_group_code: "",
            // 'session_code': '',
            // 'chat_group_code': "",
            msg_list: JSON.stringify([
              ...contemt,
              { role: "user", content: this.sendValue },
            ]),
          };
        } else if (this.chat_type == 7) {
          val = {
            chat_type: this.chat_type,
            session_code: bool == "true" ? localStorage.getItem("session_code7") : "",
            chat_group_code: "",
            // 'session_code': '',
            // 'chat_group_code': "",
            msg_list: JSON.stringify([
              ...contemt,
              { role: "user", content: this.sendValue },
            ]),
          };
        } else if (
          this.chat_type == 8 ||
          this.chat_type == 1003 ||
          this.chat_type == 1001 || this.chat_type == 1004
        ) {
          val = {
            chat_type: this.chat_type,
            session_code: bool == "true" ? localStorage.getItem("session_code8") : "",
            chat_group_code: "",
            // 'session_code': '',
            // 'chat_group_code': "",
            msg_list: JSON.stringify([
              ...contemt,
              { role: "user", content: this.sendValue },
            ])
          };
        } else if (this.chat_type == 10) {
          val = {
            chat_type: this.chat_type,
            session_code: bool == "true" ? localStorage.getItem("session_code10") : "",
            chat_group_code: "",
            // 'session_code': '',
            // 'chat_group_code': "",
            msg_list: JSON.stringify([
              ...contemt,
              { role: "user", content: this.sendValue },
            ]),
          };
        } else if (this.chat_type == 12) {
          val = {
            chat_type: this.chat_type,
            session_code: bool == "true" ? localStorage.getItem("session_code11") : "",
            chat_group_code: "",
            // 'session_code': '',
            // 'chat_group_code': "",
            msg_list: JSON.stringify([
              ...contemt,
              { role: "user", content: this.sendValue },
            ]),
          };
        }
        val.model = this.chat_model
        this.ordeAIList = [];
      }
      if (Number(this.association) == 2) {
        val.session_code = "";
      }

      this.association = "";

      if (this.chat_type == 0) {
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
      } else if (this.chat_type == 1) {
        this.chatVipList.push({
          //新构造一个对话内容
          session_code: "",
          create_time: "",
          chat_group_code: "",
          finish_reason: "",
          role: "",
          content: "",
          help: false, // 点赞
          stepOn: false, // 点踩
          id: this.chatVipList.length,
          timer: false,
        });
      } else if (this.chat_type == 4) {
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
      } else if (this.chat_type == 5) {
        this.chatXunfeiList.push({
          //新构造一个对话内容
          session_code: "",
          create_time: "",
          chat_group_code: "",
          finish_reason: "",
          role: "",
          content: "",
          help: false, // 点赞
          stepOn: false, // 点踩
          id: this.chatXunfeiList.length,
          timer: false,
        });
      } else if (this.chat_type == 7) {
        this.chatClaudeList.push({
          //新构造一个对话内容
          session_code: "",
          create_time: "",
          chat_group_code: "",
          finish_reason: "",
          role: "",
          content: "",
          help: false, // 点赞
          stepOn: false, // 点踩
          id: this.chatClaudeList.length,
          timer: false,
        });
      } else if (
        this.chat_type == 8 ||
        this.chat_type == 1003 ||
        this.chat_type == 1001 || this.chat_type == 1004
      ) {
        this.chatChatGLMList.push({
          //新构造一个对话内容
          session_code: "",
          create_time: "",
          chat_group_code: "",
          finish_reason: "",
          role: "",
          content: "",
          help: false, // 点赞
          stepOn: false, // 点踩
          id: this.chatChatGLMList.length,
          timer: false,
        });
      } else if (this.chat_type == 10) {
        this.chatTongyiList.push({
          //新构造一个对话内容
          session_code: "",
          create_time: "",
          chat_group_code: "",
          finish_reason: "",
          role: "",
          content: "",
          help: false, // 点赞
          stepOn: false, // 点踩
          id: this.chatTongyiList.length,
          timer: false,
        });
      } else if (this.chat_type == 12) {
        this.chatShangtangList.push({
          //新构造一个对话内容
          session_code: "",
          create_time: "",
          chat_group_code: "",
          finish_reason: "",
          role: "",
          content: "",
          help: false, // 点赞
          stepOn: false, // 点踩
          id: this.chatShangtangList.length,
          timer: false,
        });
      }
      if (bool == "toChatFouty") {
        if (this.chat_type == 0) {
          this.t_timeThreeFive = setInterval(() => {
            this.timerThreeFive += 1;
          }, 1000);
        } else if (this.chat_type == 1) {
          this.t_timeFourZero = setInterval(() => {
            this.timerFourZero += 1;
          }, 1000);
        } else if (this.chat_type == 4) {
          this.t_timeYiyan = setInterval(() => {
            this.timerYiyan += 1;
          }, 1000);
        } else if (this.chat_type == 5) {
          this.t_timeXunfei = setInterval(() => {
            this.timerXunfei += 1;
          }, 1000);
        } else if (this.chat_type == 7) {
          this.t_timeClaude = setInterval(() => {
            this.timerClaude += 1;
          }, 1000);
        } else if (
          this.chat_type == 8 ||
          this.chat_type == 1003 ||
          this.chat_type == 1001 || this.chat_type == 1004
        ) {
          this.t_timeChatGLM = setInterval(() => {
            this.timerChatGLM += 1;
          }, 1000);
        } else if (this.chat_type == 10) {
          this.t_timeTongyi = setInterval(() => {
            this.timerTongyi += 1;
          }, 1000);
        } else if (this.chat_type == 12) {
          this.t_timeShangtang = setInterval(() => {
            this.timerShangtang += 1;
          }, 1000);
        }
      }

      if (bool == "true") {
        val.msg_code = this.msgCode;
      }

      // 发送后把所有问题还原
      sessionStorage.setItem("questonsList", JSON.stringify(this.questionList)); // 每次信息发送后存到本地
      this.questionList.forEach((v) => {
        v.selectItem = "";
        if (v.info_type_name == "Tap") {
          let arra = [];
          v.options.forEach((a) => {
            arra.push(a);
          });
          v.tagOptions = arra;
        }
      });

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

      let response = null;
      console.log(val, "请求参数");
      let url =
        Number(this.chat_type) == 0 || Number(this.chat_type) == 1
          ? "api/chat/async_chat_session"
          : "api/chat/async_chat_completion";
      // console.log(val, "--请求参数");
      if (this.chat_type == 0) {
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
      } else if (this.chat_type == 1) {
        this.controllerFourZreo = new AbortController();
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
          signal: this.controllerFourZreo.signal,
        });
      } else if (this.chat_type == 4) {
        this.controllerYiyan = new AbortController();
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
          signal: this.controllerYiyan.signal,
        });
      } else if (this.chat_type == 5) {
        this.controllerXunfei = new AbortController();
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
          signal: this.controllerXunfei.signal,
        });
      } else if (this.chat_type == 7) {
        this.controllerClaude = new AbortController();
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
          signal: this.controllerClaude.signal,
        });
      } else if (
        this.chat_type == 8 ||
        this.chat_type == 1003 ||
        this.chat_type == 1001 || this.chat_type == 1004
      ) {
        this.controllerChatGLM = new AbortController();
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
          signal: this.controllerChatGLM.signal,
        });
      } else if (this.chat_type == 10) {
        this.controllerTongyi = new AbortController();
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
          signal: this.controllerTongyi.signal,
        });
      } else if (this.chat_type == 12) {
        // console.log(val, "--请求参数");
        this.controllerShangtang = new AbortController();
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
          signal: this.controllerShangtang.signal,
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
          let stringStr = arr2str(value);
          let chatArr = stringStr.split("\r\n");
          if (this.chat_type == 0) {
            this.isDetailThreeFive = false;
          } else if (this.chat_type == 1) {
            this.isDetailFourZero = false;
          } else if (this.chat_type == 4) {
            this.isDetailYiyan = false;
          } else if (this.chat_type == 5) {
            this.isDetailXunfei = false;
          } else if (this.chat_type == 7) {
            this.isDetailClaude = false;
          } else if (
            this.chat_type == 8 ||
            this.chat_type == 1003 ||
            this.chat_type == 1001 || this.chat_type == 1001
          ) {
            this.isDetailChatGLM = false;
          } else if (this.chat_type == 10) {
            this.isDetailTongyi = false;
          } else if (this.chat_type == 12) {
            this.isDetailShangtang = false;
          }
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
      // console.log(res);
      /**
       * 35
       */
      // console.log('========================', res);
      this.msgCode = res.msg_code;
      if (Number(res.code) == 36003) {
        if (this.chat_type == 0) {
          this.isfinishThreeFive = true;
          clearInterval(this.t_timeThreeFive);
          this.t_timeThreeFive = null;
          this.isTimeThreeFive = false;
          this.isBtnThreeFive = true;
        } else if (this.chat_type == 1) {
          clearInterval(this.t_timeFourZero);
          this.t_timeFourZero = null;
          this.isfinishFourZero = true;
          this.isTimeFourZero = false;
          this.isBtnFourZero = true;
        } else if (this.chat_type == 4) {
          clearInterval(this.t_timeYiyan);
          this.t_timeYiyan = null;
          this.isfinishYiyan = true;
          this.isTimeYiyan = false;
          this.isBtnYiyan = true;
        } else if (this.chat_type == 5) {
          clearInterval(this.t_timeXunfei);
          this.t_timeXunfei = null;
          this.isfinishXunfei = true;
          this.isTimeXunfei = false;
          this.isBtnXunfei = true;
        } else if (this.chat_type == 7) {
          clearInterval(this.t_timeClaude);
          this.t_timeClaude = null;
          this.isfinishClaude = true;
          this.isTimeClaude = false;
          this.isBtnClaude = true;
        } else if (
          this.chat_type == 8 ||
          this.chat_type == 1003 ||
          this.chat_type == 1001 || this.chat_type == 1004
        ) {
          clearInterval(this.t_timeChatGLM);
          this.t_timeChatGLM = null;
          this.isfinishChatGLM = true;
          this.isTimeChatGLM = false;
          this.isBtnChatGLM = true;
        } else if (this.chat_type == 10) {
          clearInterval(this.t_timeTongyi);
          this.t_timeTongyi = null;
          this.isfinishTongyi = true;
          this.isTimeTongyi = false;
          this.isBtnTongyi = true;
        } else if (this.chat_type == 12) {
          clearInterval(this.t_timeShangtang);
          this.t_timeShangtang = null;
          this.isfinishShangtang = true;
          this.isTimeShangtang = false;
          this.isBtnShangtang = true;
        }
        this.$message.error("关联对话必须为一问一答");
      }
      if (Number(res.code) == 30014 || Number(res.code) == 40022) {
        // 登录
        if (this.loginInfo.role == "guess") {
          sessionStorage.setItem("templateSelectToken", this.item.title);
          console.log(1);
          this.$refs.Register.registerVisible = true;
          return;
        }
        // 升级会员
        if (this.loginInfo.role == "user") {
          this.queryErrorMsg = res.msg;
          this.isuser = false;
          if (this.chat_type == 0) {
            this.isfinishThreeFive = true;
            clearInterval(this.t_timeThreeFive);
            this.t_timeThreeFive = null;
            this.isTimeThreeFive = false;
            this.isBtnThreeFive = true;
          } else if (this.chat_type == 1) {
            clearInterval(this.t_timeFourZero);
            this.t_timeFourZero = null;
            this.isfinishFourZero = true;
            this.isTimeFourZero = false;
            this.isBtnFourZero = true;
          } else if (this.chat_type == 4) {
            clearInterval(this.t_timeYiyan);
            this.t_timeYiyan = null;
            this.isfinishYiyan = true;
            this.isTimeYiyan = false;
            this.isBtnYiyan = true;
          } else if (this.chat_type == 5) {
            clearInterval(this.t_timeXunfei);
            this.t_timeXunfei = null;
            this.isfinishXunfei = true;
            this.isTimeXunfei = false;
            this.isBtnXunfei = true;
          } else if (this.chat_type == 7) {
            clearInterval(this.t_timeClaude);
            this.t_timeClaude = null;
            this.isfinishClaude = true;
            this.isTimeClaude = false;
            this.isBtnClaude = true;
          } else if (
            this.chat_type == 8 ||
            this.chat_type == 1003 ||
            this.chat_type == 1001 || this.chat_type == 1004
          ) {
            clearInterval(this.t_timeChatGLM);
            this.t_timeChatGLM = null;
            this.isfinishChatGLM = true;
            this.isTimeChatGLM = false;
            this.isBtnChatGLM = true;
          } else if (this.chat_type == 10) {
            clearInterval(this.t_timeTongyi);
            this.t_timeTongyi = null;
            this.isfinishTongyi = true;
            this.isTimeTongyi = false;
            this.isBtnTongyi = true;
          } else if (this.chat_type == 12) {
            clearInterval(this.t_timeShangtang);
            this.t_timeShangtang = null;
            this.isfinishShangtang = true;
            this.isTimeShangtang = false;
            this.isBtnShangtang = true;
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

      // 35
      if (res.chat_type == "0" && !this.isfinishThreeFive) {
        this.isTimeThreeFive = false;
        if (res != "" && res.content != null) {
          // this.replyThreeFive = this.chatList[this.chatList.length - 1].content + res.content;
          // this.chatList[this.chatList.length - 1].content = this.chatList[this.chatList.length - 1].content + res.content;

          this.chatList[this.chatList.length - 1].content =
            this.chatList[this.chatList.length - 1].content + res.content;

          this.chatList[this.chatList.length - 1].markedContent =
            this.chatList[this.chatList.length - 1].content + res.content;
          this.replyThreeFive =
            this.chatList[this.chatList.length - 1].content + res.content;
          // 定位到聊天最底部
          // this.toBottom();
        }
        if (res.session_code != "" && res.session_code != null) {
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
        if (res.finish_reason != "" && res.finish_reason != null) {
          this.isfinishThreeFive = true;
          this.isBtnThreeFive = true;
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
          this.tokenNumberThreeFive = {
            completionTokens: res.completion_tokens, // 下行token
            promptTokens: res.prompt_tokens, // 上行token
            integral: res.integral, // 积分
            totalTokens: res.total_tokens, // 总tokes
          };

          this.chatList.forEach((v) => {
            v.markedContent = marked(v.content, { renderer });
          });
          this.replyThreeFive = marked(this.replyThreeFive, { renderer });

          let str = "";
          if (sessionStorage.getItem("applicationId") == "3") {
            str = "效率工具";
          } else if (sessionStorage.getItem("applicationId") == "2") {
            str = "娱乐生活";
          } else if (sessionStorage.getItem("applicationId") == "5") {
            str = "工作学习";
          } else if (sessionStorage.getItem("applicationId") == "1") {
            str = "工作助理";
          }
          // 保存最近使用
          submitFootprint({
            type_name: str,
            type_code: "assistant",
            title: this.oldSendValue.replace(/,$/, ""),
            eid: res.session_code,
          }).then((res) => {});
        }
        if (res.finish_reason == "stop") {
          this.sessionRightNavCode = res.session_code;
        }
        if (res.role != "" && res.role != null) {
          this.chatList[this.chatList.length - 1].role = res.role;
        }
      }

      /**
       * 40
       */
      if (res.chat_type == "1" && !this.isfinishFourZero) {
        this.isTimeFourZero = false;
        if (res != "" && res.content != null) {
          // this.replyFourZero = this.chatVipList[this.chatVipList.length - 1].content + res.content;
          // this.chatVipList[this.chatVipList.length - 1].content = this.chatVipList[this.chatVipList.length - 1].content + res.content;

          this.chatVipList[this.chatVipList.length - 1].content =
            this.chatVipList[this.chatVipList.length - 1].content + res.content;

          this.chatVipList[this.chatVipList.length - 1].markedContent =
            this.chatVipList[this.chatVipList.length - 1].content + res.content;
          this.replyFourZero =
            this.chatVipList[this.chatVipList.length - 1].content + res.content;
          // 定位到聊天最底部
          // this.toBottom();
        }
        if (res.session_code != "" && res.session_code != null) {
          this.chatVipList[this.chatVipList.length - 1].session_code = res.session_code;
          localStorage.setItem("session_code1", res.session_code);
        }
        if (res.create_time != "" && res.create_time != null) {
          this.chatVipList[this.chatVipList.length - 1].create_time = res.create_time;
        }
        if (res.chat_group_code != "" && res.chat_group_code != null) {
          this.chatVipList[this.chatVipList.length - 1].chat_group_code =
            res.chat_group_code;
          localStorage.setItem("chat_group_code1", res.chat_group_code);
        }
        if (res.finish_reason != "" && res.finish_reason != null) {
          // console.log('完结了');
          clearInterval(this.t_timeFourZero);
          this.t_timeFourZero = null;
          this.isfinishFourZero = true;
          this.isBtnFourZero = true;
          this.chatVipList[this.chatVipList.length - 1].finish_reason = res.finish_reason;
          this.$store.dispatch("user/changeChatListLength", this.chatVipList.length);
          this.chatVipList[this.chatVipList.length - 1].timer = this.timerFourZero;
          if (!localStorage.getItem("session_code1")) {
            this.sessionRightNavCode = res.session_code;
          }
          this.tokenNumberFourZero = {
            completionTokens: res.completion_tokens, // 下行token
            promptTokens: res.prompt_tokens, // 上行token
            integral: res.integral, // 积分
            totalTokens: res.total_tokens, // 总tokes
          };

          this.chatVipList.forEach((v) => {
            v.markedContent = marked(v.content, { renderer });
          });
          this.replyFourZero = marked(this.replyFourZero, { renderer });

          let str = "";
          if (sessionStorage.getItem("applicationId") == "3") {
            str = "效率工具";
          } else if (sessionStorage.getItem("applicationId") == "2") {
            str = "娱乐生活";
          } else if (sessionStorage.getItem("applicationId") == "5") {
            str = "工作学习";
          } else if (sessionStorage.getItem("applicationId") == "1") {
            str = "工作助理";
          }
          // 保存最近使用
          submitFootprint({
            type_name: str,
            type_code: "assistant",
            title: this.oldSendValue.replace(/,$/, ""),
            eid: res.session_code,
          }).then((res) => {});
        }
        if (res.finish_reason == "stop") {
          this.sessionRightNavCode = res.session_code;
        }
        if (res.role != "" && res.role != null) {
          this.chatVipList[this.chatVipList.length - 1].role = res.role;
        }
      }

      /**
       * 文心一言
       */
      if (res.chat_type == "4" && !this.isfinishYiyan) {
        this.isTimeYiyan = false;
        if (res != "" && res.content != null) {
          // this.replyYiyan = this.chatYiyanList[this.chatYiyanList.length - 1].content + res.content;
          // this.chatYiyanList[this.chatYiyanList.length - 1].content = this.chatYiyanList[this.chatYiyanList.length - 1].content + res.content;

          this.chatYiyanList[this.chatYiyanList.length - 1].content =
            this.chatYiyanList[this.chatYiyanList.length - 1].content + res.content;

          this.chatYiyanList[this.chatYiyanList.length - 1].markedContent =
            this.chatYiyanList[this.chatYiyanList.length - 1].content + res.content;
          this.replyYiyan =
            this.chatYiyanList[this.chatYiyanList.length - 1].content + res.content;
          // 定位到聊天最底部
          // this.toBottom();
        }
        if (res.session_code != "" && res.session_code != null) {
          this.chatYiyanList[this.chatYiyanList.length - 1].session_code =
            res.session_code;
          localStorage.setItem("session_code4", res.session_code);
        }
        if (res.create_time != "" && res.create_time != null) {
          this.chatYiyanList[this.chatYiyanList.length - 1].create_time = res.create_time;
        }
        if (res.chat_group_code != "" && res.chat_group_code != null) {
          this.chatYiyanList[this.chatYiyanList.length - 1].chat_group_code =
            res.chat_group_code;
          localStorage.setItem("chat_group_code4", res.chat_group_code);
        }
        if (res.finish_reason) {
          // console.log('完结了');
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
          this.tokenNumberYiyan = {
            completionTokens: res.completion_tokens, // 下行token
            promptTokens: res.prompt_tokens, // 上行token
            integral: res.integral, // 积分
            totalTokens: res.total_tokens, // 总tokes
          };

          this.chatYiyanList.forEach((v) => {
            v.markedContent = marked(v.content, { renderer });
          });
          this.replyYiyan = marked(this.replyYiyan, { renderer });

          let str = "";
          if (sessionStorage.getItem("applicationId") == "3") {
            str = "效率工具";
          } else if (sessionStorage.getItem("applicationId") == "2") {
            str = "娱乐生活";
          } else if (sessionStorage.getItem("applicationId") == "5") {
            str = "工作学习";
          } else if (sessionStorage.getItem("applicationId") == "1") {
            str = "工作助理";
          }
          // 保存最近使用
          submitFootprint({
            type_name: str,
            type_code: "assistant",
            title: this.oldSendValue.replace(/,$/, ""),
            eid: res.session_code,
          }).then((res) => {});
        }
        if (res.finish_reason == "stop") {
          this.sessionRightNavCode = res.session_code;
        }
        if (res.role != "" && res.role != null) {
          this.chatYiyanList[this.chatYiyanList.length - 1].role = res.role;
        }
      }

      /**
       * 讯飞星火
       */
      if (res.chat_type == "5" && !this.isfinishXunfei) {
        this.isTimeXunfei = false;
        if (res != "" && res.content != null) {
          // this.replyXunfei = this.chatXunfeiList[this.chatXunfeiList.length - 1].content + res.content;
          // this.chatXunfeiList[this.chatXunfeiList.length - 1].content = this.chatXunfeiList[this.chatXunfeiList.length - 1].content + res.content;

          this.chatXunfeiList[this.chatXunfeiList.length - 1].content =
            this.chatXunfeiList[this.chatXunfeiList.length - 1].content + res.content;

          this.chatXunfeiList[this.chatXunfeiList.length - 1].markedContent =
            this.chatXunfeiList[this.chatXunfeiList.length - 1].content + res.content;
          this.replyXunfei =
            this.chatXunfeiList[this.chatXunfeiList.length - 1].content + res.content;
          // 定位到聊天最底部
          // this.toBottom();
        }
        if (res.session_code != "" && res.session_code != null) {
          this.chatXunfeiList[this.chatXunfeiList.length - 1].session_code =
            res.session_code;
          localStorage.setItem("session_code5", res.session_code);
        }
        if (res.create_time != "" && res.create_time != null) {
          this.chatXunfeiList[this.chatXunfeiList.length - 1].create_time =
            res.create_time;
        }
        if (res.chat_group_code != "" && res.chat_group_code != null) {
          this.chatXunfeiList[this.chatXunfeiList.length - 1].chat_group_code =
            res.chat_group_code;
          localStorage.setItem("chat_group_code5", res.chat_group_code);
        }
        if (res.finish_reason == 2) {
          // console.log('完结了');
          clearInterval(this.t_timeXunfei);
          this.t_timeXunfei = null;
          this.isfinishXunfei = true;
          this.isBtnXunfei = true;
          this.chatXunfeiList[this.chatXunfeiList.length - 1].finish_reason =
            res.finish_reason;
          this.$store.dispatch("user/changeChatListLength", this.chatXunfeiList.length);
          this.chatXunfeiList[this.chatXunfeiList.length - 1].timer = this.timerXunfei;
          if (!localStorage.getItem("session_code1")) {
            this.sessionRightNavCode = res.session_code;
          }
          this.tokenNumberXunfei = {
            completionTokens: res.completion_tokens, // 下行token
            promptTokens: res.prompt_tokens, // 上行token
            integral: res.integral, // 积分
            totalTokens: res.total_tokens, // 总tokes
          };

          this.chatXunfeiList.forEach((v) => {
            v.markedContent = marked(v.content, { renderer });
          });
          this.replyXunfei = marked(this.replyXunfei, { renderer });

          let str = "";
          if (sessionStorage.getItem("applicationId") == "3") {
            str = "效率工具";
          } else if (sessionStorage.getItem("applicationId") == "2") {
            str = "娱乐生活";
          } else if (sessionStorage.getItem("applicationId") == "5") {
            str = "工作学习";
          } else if (sessionStorage.getItem("applicationId") == "1") {
            str = "工作助理";
          }
          // 保存最近使用
          submitFootprint({
            type_name: str,
            type_code: "assistant",
            title: this.oldSendValue.replace(/,$/, ""),
            eid: res.session_code,
          }).then((res) => {});
        }
        if (res.finish_reason == "stop") {
          this.sessionRightNavCode = res.session_code;
        }
        if (res.role != "" && res.role != null) {
          this.chatXunfeiList[this.chatXunfeiList.length - 1].role = res.role;
        }
      }

      /**
       * Claude
       */
      if (res.chat_type == "7" && !this.isfinishClaude) {
        this.isTimeClaude = false;
        if (res != "" && res.content != null) {
          // this.replyClaude = this.chatClaudeList[this.chatClaudeList.length - 1].content + res.content;
          // this.chatClaudeList[this.chatClaudeList.length - 1].content = this.chatClaudeList[this.chatClaudeList.length - 1].content + res.content;

          this.chatClaudeList[this.chatClaudeList.length - 1].content =
            this.chatClaudeList[this.chatClaudeList.length - 1].content + res.content;

          this.chatClaudeList[this.chatClaudeList.length - 1].markedContent =
            this.chatClaudeList[this.chatClaudeList.length - 1].content + res.content;
          this.replyClaude =
            this.chatClaudeList[this.chatClaudeList.length - 1].content + res.content;
          // 定位到聊天最底部
          // this.toBottom();
        }
        if (res.session_code != "" && res.session_code != null) {
          this.chatClaudeList[this.chatClaudeList.length - 1].session_code =
            res.session_code;
          localStorage.setItem("session_code7", res.session_code);
        }
        if (res.create_time != "" && res.create_time != null) {
          this.chatClaudeList[this.chatClaudeList.length - 1].create_time =
            res.create_time;
        }
        if (res.chat_group_code != "" && res.chat_group_code != null) {
          this.chatClaudeList[this.chatClaudeList.length - 1].chat_group_code =
            res.chat_group_code;
          localStorage.setItem("chat_group_code7", res.chat_group_code);
        }
        if (res.finish_reason == "stop") {
          // console.log('完结了');
          clearInterval(this.t_timeClaude);
          this.t_timeClaude = null;
          this.isfinishClaude = true;
          this.isBtnClaude = true;
          this.chatClaudeList[this.chatClaudeList.length - 1].finish_reason =
            res.finish_reason;
          this.$store.dispatch("user/changeChatListLength", this.chatClaudeList.length);
          this.chatClaudeList[this.chatClaudeList.length - 1].timer = this.timerClaude;
          if (!localStorage.getItem("session_code7")) {
            this.sessionRightNavCode = res.session_code;
          }
          this.tokenNumberClaude = {
            completionTokens: res.completion_tokens, // 下行token
            promptTokens: res.prompt_tokens, // 上行token
            integral: res.integral, // 积分
            totalTokens: res.total_tokens, // 总tokes
          };

          this.chatClaudeList.forEach((v) => {
            v.markedContent = marked(v.content, { renderer });
          });
          this.replyClaude = marked(this.replyClaude, { renderer });

          let str = "";
          if (sessionStorage.getItem("applicationId") == "3") {
            str = "效率工具";
          } else if (sessionStorage.getItem("applicationId") == "2") {
            str = "娱乐生活";
          } else if (sessionStorage.getItem("applicationId") == "5") {
            str = "工作学习";
          } else if (sessionStorage.getItem("applicationId") == "1") {
            str = "工作助理";
          }
          // 保存最近使用
          submitFootprint({
            type_name: str,
            type_code: "assistant",
            title: this.oldSendValue.replace(/,$/, ""),
            eid: res.session_code,
          }).then((res) => {});
        }
        if (res.finish_reason == "stop") {
          this.sessionRightNavCode = res.session_code;
        }
        if (res.role != "" && res.role != null) {
          this.chatClaudeList[this.chatClaudeList.length - 1].role = res.role;
        }
      }

      /**
       * ChatGLM
       */
      if (
        (res.chat_type == "8" || res.chat_type == "1003" || res.chat_type == "1001" || res.chat_type == "1004") &&
        !this.isfinishChatGLM
      ) {
        this.isTimeChatGLM = false;
        if (res != "" && res.content != null) {
          // this.replyChatGLM = this.chatChatGLMList[this.chatChatGLMList.length - 1].content + res.content;
          // this.chatChatGLMList[this.chatChatGLMList.length - 1].content = this.chatChatGLMList[this.chatChatGLMList.length - 1].content + res.content;

          this.chatChatGLMList[this.chatChatGLMList.length - 1].content =
            this.chatChatGLMList[this.chatChatGLMList.length - 1].content + res.content;

          this.chatChatGLMList[
            this.chatChatGLMList.length - 1
          ].markedContent = marked(
            this.chatChatGLMList[this.chatChatGLMList.length - 1].content + res.content,
            { renderer }
          );
          this.replyChatGLM = marked(
            this.chatChatGLMList[this.chatChatGLMList.length - 1].content + res.content,
            { renderer }
          );
          // 定位到聊天最底部
          // this.toBottom();
        }
        if (res.session_code != "" && res.session_code != null) {
          this.chatChatGLMList[this.chatChatGLMList.length - 1].session_code =
            res.session_code;
          localStorage.setItem("session_code8", res.session_code);
        }
        if (res.create_time != "" && res.create_time != null) {
          this.chatChatGLMList[this.chatChatGLMList.length - 1].create_time =
            res.create_time;
        }
        if (res.chat_group_code != "" && res.chat_group_code != null) {
          this.chatChatGLMList[this.chatChatGLMList.length - 1].chat_group_code =
            res.chat_group_code;
          localStorage.setItem("chat_group_code8", res.chat_group_code);
        }
        if (res.finish_reason == "stop") {
          // console.log('完结了');
          clearInterval(this.t_timeChatGLM);
          this.t_timeChatGLM = null;
          this.isfinishChatGLM = true;
          this.isBtnChatGLM = true;
          this.chatChatGLMList[this.chatChatGLMList.length - 1].finish_reason =
            res.finish_reason;
          this.$store.dispatch("user/changeChatListLength", this.chatChatGLMList.length);
          this.chatChatGLMList[this.chatChatGLMList.length - 1].timer = this.timerChatGLM;
          if (!localStorage.getItem("session_code8")) {
            this.sessionRightNavCode = res.session_code;
          }
          this.tokenNumberChatGLM = {
            completionTokens: res.completion_tokens, // 下行token
            promptTokens: res.prompt_tokens, // 上行token
            integral: res.integral, // 积分
            totalTokens: res.total_tokens, // 总tokes
          };

          // this.chatChatGLMList.forEach((v) => {
          //   v.markedContent = marked(v.content, { renderer });
          // });
          // this.replyChatGLM = marked(this.replyChatGLM, { renderer });

          let str = "";
          if (sessionStorage.getItem("applicationId") == "3") {
            str = "效率工具";
          } else if (sessionStorage.getItem("applicationId") == "2") {
            str = "娱乐生活";
          } else if (sessionStorage.getItem("applicationId") == "5") {
            str = "工作学习";
          } else if (sessionStorage.getItem("applicationId") == "1") {
            str = "工作助理";
          }
          // 保存最近使用
          submitFootprint({
            type_name: str,
            type_code: "assistant",
            title: this.oldSendValue.replace(/,$/, ""),
            eid: res.session_code,
          }).then((res) => {});
        }
        if (res.finish_reason == "stop") {
          this.sessionRightNavCode = res.session_code;
        }
        if (res.role != "" && res.role != null) {
          this.chatChatGLMList[this.chatChatGLMList.length - 1].role = res.role;
        }
      }

      /**
       * 通义千问
       */
      if (res.chat_type == "10" && !this.isfinishTongyi) {
        this.isTimeTongyi = false;
        if (res != "" && res.content != null) {
          // this.replyTongyi = res.content;
          // this.chatTongyiList[this.chatTongyiList.length - 1].content = res.content;

          this.chatTongyiList[this.chatTongyiList.length - 1].content = res.content;

          this.chatTongyiList[this.chatTongyiList.length - 1].markedContent = res.content;
          this.replyTongyi = res.content;
          // 定位到聊天最底部
          // this.toBottom();
        }
        if (res.session_code != "" && res.session_code != null) {
          this.chatTongyiList[this.chatTongyiList.length - 1].session_code =
            res.session_code;
          localStorage.setItem("session_code10", res.session_code);
        }
        if (res.create_time != "" && res.create_time != null) {
          this.chatTongyiList[this.chatTongyiList.length - 1].create_time =
            res.create_time;
        }
        if (res.chat_group_code != "" && res.chat_group_code != null) {
          this.chatTongyiList[this.chatTongyiList.length - 1].chat_group_code =
            res.chat_group_code;
          localStorage.setItem("chat_group_code10", res.chat_group_code);
        }
        if (res.finish_reason == "stop") {
          // console.log('完结了');
          clearInterval(this.t_timeTongyi);
          this.t_timeTongyi = null;
          this.isfinishTongyi = true;
          this.isBtnTongyi = true;
          this.chatTongyiList[this.chatTongyiList.length - 1].finish_reason =
            res.finish_reason;
          this.$store.dispatch("user/changeChatListLength", this.chatTongyiList.length);
          this.chatTongyiList[this.chatTongyiList.length - 1].timer = this.timerTongyi;
          if (!localStorage.getItem("session_code10")) {
            this.sessionRightNavCode = res.session_code;
          }
          this.tokenNumberTongyi = {
            completionTokens: res.completion_tokens, // 下行token
            promptTokens: res.prompt_tokens, // 上行token
            integral: res.integral, // 积分
            totalTokens: res.total_tokens, // 总tokes
          };

          this.chatTongyiList.forEach((v) => {
            v.markedContent = marked(v.content, { renderer });
          });
          this.replyTongyi = marked(this.replyTongyi, { renderer });

          let str = "";
          if (sessionStorage.getItem("applicationId") == "3") {
            str = "效率工具";
          } else if (sessionStorage.getItem("applicationId") == "2") {
            str = "娱乐生活";
          } else if (sessionStorage.getItem("applicationId") == "5") {
            str = "工作学习";
          } else if (sessionStorage.getItem("applicationId") == "1") {
            str = "工作助理";
          }
          // 保存最近使用
          submitFootprint({
            type_name: str,
            type_code: "assistant",
            title: this.oldSendValue.replace(/,$/, ""),
            eid: res.session_code,
          }).then((res) => {});
        }
        if (res.finish_reason == "stop") {
          this.sessionRightNavCode = res.session_code;
        }
        if (res.role != "" && res.role != null) {
          this.chatTongyiList[this.chatTongyiList.length - 1].role = res.role;
        }
      }

      /**
       * 360
       */
      if (this.chat_type == 12 && !this.isfinishShangtang) {
        this.isTimeShangtang = false;
        if (res != "" && res.content != null) {
          // this.replyShangtang = this.chatShangtangList[this.chatShangtangList.length - 1].content + res.content;
          // this.chatShangtangList[this.chatShangtangList.length - 1].content = this.chatShangtangList[this.chatShangtangList.length - 1].content + res.content;

          this.chatShangtangList[this.chatShangtangList.length - 1].content =
            this.chatShangtangList[this.chatShangtangList.length - 1].content +
            res.content;

          this.chatShangtangList[this.chatShangtangList.length - 1].markedContent =
            this.chatShangtangList[this.chatShangtangList.length - 1].content +
            res.content;
          this.replyShangtang =
            this.chatShangtangList[this.chatShangtangList.length - 1].content +
            res.content;
          // 定位到聊天最底部
          // this.toBottom();
        }
        if (res.session_code != "" && res.session_code != null) {
          this.chatShangtangList[this.chatShangtangList.length - 1].session_code =
            res.session_code;
          localStorage.setItem("session_code11", res.session_code);
        }
        if (res.create_time != "" && res.create_time != null) {
          this.chatShangtangList[this.chatShangtangList.length - 1].create_time =
            res.create_time;
        }
        if (res.chat_group_code != "" && res.chat_group_code != null) {
          this.chatShangtangList[this.chatShangtangList.length - 1].chat_group_code =
            res.chat_group_code;
          localStorage.setItem("chat_group_code11", res.chat_group_code);
        }
        if (res.finish_reason == "stop") {
          // console.log('完结了');
          clearInterval(this.t_timeShangtang);
          this.t_timeShangtang = null;
          this.isfinishShangtang = true;
          this.isBtnShangtang = true;
          this.chatShangtangList[this.chatShangtangList.length - 1].finish_reason =
            res.finish_reason;
          this.$store.dispatch(
            "user/changeChatListLength",
            this.chatShangtangList.length
          );
          this.chatShangtangList[
            this.chatShangtangList.length - 1
          ].timer = this.timerShangtang;
          if (!localStorage.getItem("session_code11")) {
            this.sessionRightNavCode = res.session_code;
          }
          this.tokenNumberShangtang = {
            completionTokens: res.completion_tokens, // 下行token
            promptTokens: res.prompt_tokens, // 上行token
            integral: res.integral, // 积分
            totalTokens: res.total_tokens, // 总tokes
          };

          this.chatShangtangList.forEach((v) => {
            v.markedContent = marked(v.content, { renderer });
          });
          this.replyShangtang = marked(this.replyShangtang, { renderer });

          let str = "";
          if (sessionStorage.getItem("applicationId") == "3") {
            str = "效率工具";
          } else if (sessionStorage.getItem("applicationId") == "2") {
            str = "娱乐生活";
          } else if (sessionStorage.getItem("applicationId") == "5") {
            str = "工作学习";
          } else if (sessionStorage.getItem("applicationId") == "1") {
            str = "工作助理";
          }
          // 保存最近使用
          submitFootprint({
            type_name: str,
            type_code: "assistant",
            title: this.oldSendValue.replace(/,$/, ""),
            eid: res.session_code,
          }).then((res) => {});
        }
        if (res.finish_reason == "stop") {
          this.sessionRightNavCode = res.session_code;
        }
        if (res.role != "" && res.role != null) {
          this.chatShangtangList[this.chatShangtangList.length - 1].role = res.role;
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
      } else if (
        this.chat_type == 8 ||
        this.chat_type == 1003 ||
        this.chat_type == 1001 || this.chat_type == 1004
      ) {
        this.isBtnChatGLM = false;
        this.isDetailChatGLM = false;
        this.isfinishChatGLM = false;
      } else if (this.chat_type == 10) {
        this.isBtnTongyi = false;
        this.isDetailTongyi = false;
        this.isfinishTongyi = false;
      } else if (this.chat_type == 12) {
        this.isBtnShangtang = false;
        this.isDetailShangtang = false;
        this.isfinishShangtang = false;
      }
      this.supplyVisible = false;
      if (this.chat_type == 0) {
        if (this.chatItem.timer) {
          this.timerThreeFive = this.chatItem.timer;
        } else {
          this.timerThreeFive = 0;
        }
        this.t_timeThreeFive = setInterval(() => {
          this.timerThreeFive += 1;
        }, 1000);
      } else if (this.chat_type == 1) {
        if (this.chatItem.timer) {
          this.timerFourZero = this.chatItem.timer;
        } else {
          this.timerFourZero = 0;
        }
        this.t_timeFourZero = setInterval(() => {
          this.timerFourZero += 1;
        }, 1000);
      } else if (this.chat_type == 4) {
        if (this.chatItem.timer) {
          this.timerYiyan = this.chatItem.timer;
        } else {
          this.timerYiyan = 0;
        }
        this.t_timeYiyan = setInterval(() => {
          this.timerYiyan += 1;
        }, 1000);
      } else if (this.chat_type == 5) {
        if (this.chatItem.timer) {
          this.timerXunfei = this.chatItem.timer;
        } else {
          this.timerXunfei = 0;
        }
        this.t_timeXunfei = setInterval(() => {
          this.timerXunfei += 1;
        }, 1000);
      } else if (this.chat_type == 7) {
        if (this.chatItem.timer) {
          this.timerClaude = this.chatItem.timer;
        } else {
          this.timerClaude = 0;
        }
        this.t_timeClaude = setInterval(() => {
          this.timerClaude += 1;
        }, 1000);
      } else if (
        this.chat_type == 8 ||
        this.chat_type == 1003 ||
        this.chat_type == 1001 || this.chat_type == 1004
      ) {
        if (this.chatItem.timer) {
          this.timerChatGLM = this.chatItem.timer;
        } else {
          this.timerChatGLM = 0;
        }
        this.t_timeChatGLM = setInterval(() => {
          this.timerChatGLM += 1;
        }, 1000);
      } else if (this.chat_type == 10) {
        if (this.chatItem.timer) {
          this.timerTongyi = this.chatItem.timer;
        } else {
          this.timerTongyi = 0;
        }
        this.t_timeTongyi = setInterval(() => {
          this.timerTongyi += 1;
        }, 1000);
      } else if (this.chat_type == 12) {
        if (this.chatItem.timer) {
          this.timerShangtang = this.chatItem.timer;
        } else {
          this.timerShangtang = 0;
        }
        this.t_timeShangtang = setInterval(() => {
          this.timerShangtang += 1;
        }, 1000);
      }

      matchContextAssistant({
        company_id: this.item.question_id,
        clerk_id: this.item.question_id,
        question_content: this.sendValue,
      }).then((res) => {
        let val = null;
        if (this.chat_type == 0) {
          val = {
            chat_type: this.chat_type,
            session_code: localStorage.getItem("session_code"),
            chat_group_code: localStorage.getItem("chat_group_code"),
            msg_list: JSON.stringify([
              { role: item.role, content: item.content },
              { role: "user", content: msg, covert_content: res.data.prompt },
            ]),
          };
        } else if (this.chat_type == 1) {
          val = {
            chat_type: this.chat_type,
            session_code: localStorage.getItem("session_code1"),
            chat_group_code: localStorage.getItem("chat_group_code1"),
            msg_list: JSON.stringify([
              { role: item.role, content: item.content },
              { role: "user", content: msg, covert_content: res.data.prompt },
            ]),
          };
        } else if (this.chat_type == 4) {
          val = {
            chat_type: this.chat_type,
            session_code: localStorage.getItem("session_code4"),
            chat_group_code: localStorage.getItem("chat_group_code4"),
            msg_list: JSON.stringify([
              {
                role: this.chatYiyanList[this.chatYiyanList.length - 2].role,
                content: this.chatYiyanList[this.chatYiyanList.length - 2].content,
              },
              { role: item.role, content: item.content },
              { role: "user", content: msg, covert_content: res.data.prompt },
            ]),
          };
        } else if (this.chat_type == 5) {
          val = {
            chat_type: this.chat_type,
            session_code: localStorage.getItem("session_code5"),
            chat_group_code: localStorage.getItem("chat_group_code5"),
            msg_list: JSON.stringify([
              { role: item.role, content: item.content },
              { role: "user", content: msg, covert_content: res.data.prompt },
            ]),
          };
        } else if (this.chat_type == 7) {
          val = {
            chat_type: this.chat_type,
            session_code: localStorage.getItem("session_code7"),
            chat_group_code: localStorage.getItem("chat_group_code7"),
            msg_list: JSON.stringify([
              {
                role: this.chatClaudeList[0].role,
                content: this.chatClaudeList[0].content,
              },
              { role: item.role, content: item.content },
              { role: "user", content: msg, covert_content: res.data.prompt },
            ]),
          };
        } else if (
          this.chat_type == 8 ||
          this.chat_type == 1003 ||
          this.chat_type == 1001 || this.chat_type == 1004
        ) {
          val = {
            chat_type: this.chat_type,
            session_code: localStorage.getItem("session_code8"),
            chat_group_code: localStorage.getItem("chat_group_code8"),
            msg_list: JSON.stringify([
              {
                role: this.chatChatGLMList[0].role,
                content: this.chatChatGLMList[0].content,
              },
              { role: item.role, content: item.content },
              { role: "user", content: msg, covert_content: res.data.prompt },
            ])
          };
        } else if (this.chat_type == 10) {
          val = {
            chat_type: this.chat_type,
            session_code: localStorage.getItem("session_code10"),
            chat_group_code: localStorage.getItem("chat_group_code10"),
            msg_list: JSON.stringify([
              {
                role: this.chatTongyiList[0].role,
                content: this.chatTongyiList[0].content,
              },
              { role: item.role, content: item.content },
              { role: "user", content: msg, covert_content: res.data.prompt },
            ]),
          };
        } else if (this.chat_type == 12) {
          val = {
            chat_type: this.chat_type,
            session_code: localStorage.getItem("session_code11"),
            chat_group_code: localStorage.getItem("chat_group_code1"),
            msg_list: JSON.stringify([
              {
                role: this.chatShangtangList[0].role,
                content: this.chatShangtangList[0].content,
              },
              { role: item.role, content: item.content },
              { role: "user", content: msg, covert_content: res.data.prompt },
            ])
          };
        }
        val.model = this.chat_model
        this.vipAgainSend(key, val, item);
      });
    },

    async vipAgainSend(key, val, item) {
      // console.log(item, "进入优化对话");
      let userInfo = JSON.parse(localStorage.getItem("userInfo"));
      let response = null;
      let url =
        Number(this.chat_type) == 0 || Number(this.chat_type) == 1
          ? "api/chat/async_chat_session"
          : "api/chat/async_chat_completion";
      if (this.chat_type == 0) {
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
      } else if (this.chat_type == 1) {
        this.controllerFourZreo = new AbortController();
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
          signal: this.controllerFourZreo.signal,
        });
      } else if (this.chat_type == 4) {
        this.controllerYiyan = new AbortController();
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
          signal: this.controllerYiyan.signal,
        });
      } else if (this.chat_type == 5) {
        this.controllerXunfei = new AbortController();
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
          signal: this.controllerXunfei.signal,
        });
      } else if (this.chat_type == 7) {
        this.controllerClaude = new AbortController();
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
          signal: this.controllerClaude.signal,
        });
      } else if (
        this.chat_type == 8 ||
        this.chat_type == 1003 ||
        this.chat_type == 1001 || this.chat_type == 1004
      ) {
        this.controllerChatGLM = new AbortController();
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
          signal: this.controllerChatGLM.signal,
        });
      } else if (this.chat_type == 10) {
        this.controllerTongyi = new AbortController();
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
          signal: this.controllerTongyi.signal,
        });
      } else if (this.chat_type == 12) {
        this.controllerShangtang = new AbortController();
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
          signal: this.controllerShangtang.signal,
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
          let stringStr = arr2str(value);
          let chatArr = stringStr.split("\r\n");
          chatArr.forEach((val) => {
            if (val != "") {
              let res = JSON.parse(val);
              // console.log(res, "优化本次回答接口返回数据");
              this.talkMsgList(res);
              return;
            }
          });
        }
      }
    },

    // 终止回答
    endController(code, resetChat = true) {
      if (Number(this.chat_type) == 0) {
        this.isfinishThreeFive = true;
        this.isBtnThreeFive = true;
        this.isTimeThreeFive = false;
        try {
          this.controllerThreeFive.abort();
        } catch (error) {}
        clearInterval(this.t_timeThreeFive);
      } else if (Number(this.chat_type) == 1) {
        this.isBtnFourZero = true;
        this.isfinishFourZero = true;
        this.isTimeFourZero = false;
        try {
          this.controllerFourZreo.abort();
        } catch (error) {}
        clearInterval(this.t_timeFourZero);
      } else if (Number(this.chat_type) == 4) {
        this.isBtnYiyan = true;
        this.isfinishYiyan = true;
        this.isTimeYiyan = false;
        try {
          this.controllerYiyan.abort();
        } catch (error) {}
        clearInterval(this.t_timeYiyan);
      } else if (Number(this.chat_type) == 5) {
        this.isBtnXunfei = true;
        this.isfinishXunfei = true;
        this.isTimeXunfei = false;
        try {
          this.controllerXunfei.abort();
        } catch (error) {}
        clearInterval(this.t_timeXunfei);
      } else if (Number(this.chat_type) == 7) {
        this.isBtnClaude = true;
        this.isfinishClaude = true;
        this.isTimeClaude = false;
        try {
          this.controllerClaude.abort();
        } catch (error) {}
        clearInterval(this.t_timeClaude);
      } else if (Number(this.chat_type) == 8) {
        this.isBtnChatGLM = true;
        this.isfinishChatGLM = true;
        this.isTimeChatGLM = false;
        try {
          this.controllerChatGLM.abort();
        } catch (error) {}
        clearInterval(this.t_timeChatGLM);
      } else if (Number(this.chat_type) == 10) {
        this.isBtnTongyi = true;
        this.isfinishTongyi = true;
        this.isTimeTongyi = false;
        try {
          this.controllerTongyi.abort();
        } catch (error) {}
        clearInterval(this.t_timeTongyi);
      } else if (Number(this.chat_type) == 12) {
        this.isBtnShangtang = true;
        this.isfinishShangtang = true;
        this.isTimeShangtang = false;
        try {
          this.controllerShangtang.abort();
        } catch (error) {}
        clearInterval(this.t_timeShangtang);
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
        } else if (
          this.chat_type == 8 ||
          this.chat_type == 1003 ||
          this.chat_type == 1001 || this.chat_type == 1004
        ) {
          this.chatChatGLMList[this.chatChatGLMList.length - 1].timer = this.timerChatGLM;
        } else if (this.chat_type == 10) {
          this.chatTongyiList[this.chatTongyiList.length - 1].timer = this.timerTongyi;
        } else if (this.chat_type == 12) {
          this.chatShangtangList[
            this.chatShangtangList.length - 1
          ].timer = this.timerShangtang;
        }
      }
    },

    // 重新回答
    resetController() {
      if (this.chat_type == 0) {
        if (!this.isfinishThreeFive) {
          this.$message("当前问题还没回答完毕，请稍后再提问");
          return;
        }
      } else if (this.chat_type == 1) {
        if (!this.isfinishFourZero) {
          this.$message("当前问题还没回答完毕，请稍后再提问");
          return;
        }
      } else if (this.chat_type == 4) {
        if (!this.isfinishYiyan) {
          this.$message("当前问题还没回答完毕，请稍后再提问");
          return;
        }
      } else if (this.chat_type == 5) {
        if (!this.isfinishXunfei) {
          this.$message("当前问题还没回答完毕，请稍后再提问");
          return;
        }
      } else if (this.chat_type == 7) {
        if (!this.isfinishClaude) {
          this.$message("当前问题还没回答完毕，请稍后再提问");
          return;
        }
      } else if (
        this.chat_type == 8 ||
        this.chat_type == 1003 ||
        this.chat_type == 1001 || this.chat_type == 1004
      ) {
        if (!this.isfinishChatGLM) {
          this.$message("当前问题还没回答完毕，请稍后再提问");
          return;
        }
      } else if (this.chat_type == 10) {
        if (!this.isfinishTongyi) {
          this.$message("当前问题还没回答完毕，请稍后再提问");
          return;
        }
      } else if (this.chat_type == 12) {
        if (!this.isfinishShangtang) {
          this.$message("当前问题还没回答完毕，请稍后再提问");
          return;
        }
      }

      // if (this.chat_type == 0) {
      //   this.chatList.splice(this.chatList.length - 2, 2)
      // } else if (this.chat_type == 1) {
      //   this.chatVipList.splice(this.chatVipList.length - 2, 2)
      // } else if (this.chat_type == 4) {
      //   this.chatYiyanList.splice(this.chatYiyanList.length - 2, 2)
      // } else if (this.chat_type == 5) {
      //   this.chatXunfeiList.splice(this.chatXunfeiList.length - 2, 2)
      // } else if (this.chat_type == 7) {
      //   this.chatClaudeList.splice(this.chatClaudeList.length - 2, 2)
      // } else if (this.chat_type == 8) {
      //   this.chatChatGLMList.splice(this.chatChatGLMList.length - 2, 2)
      // }
      this.endController("", false);
      this.sendMsg("true");
    },

    // 优化回答
    optimizeAnswers(item) {
      if (this.chat_type == 0) {
        if (!this.isfinishThreeFive) {
          this.$message("当前问题还没回答完毕，请稍后再提问");
          return;
        }
      } else if (this.chat_type == 1) {
        if (!this.isfinishFourZero) {
          this.$message("当前问题还没回答完毕，请稍后再提问");
          return;
        }
      } else if (this.chat_type == 4) {
        if (!this.isfinishYiyan) {
          this.$message("当前问题还没回答完毕，请稍后再提问");
          return;
        }
      } else if (this.chat_type == 5) {
        if (!this.isfinishXunfei) {
          this.$message("当前问题还没回答完毕，请稍后再提问");
          return;
        }
      } else if (this.chat_type == 7) {
        if (!this.isfinishClaude) {
          this.$message("当前问题还没回答完毕，请稍后再提问");
          return;
        }
      } else if (
        this.chat_type == 8 ||
        this.chat_type == 1003 ||
        this.chat_type == 1001 || this.chat_type == 1004
      ) {
        if (!this.isfinishChatGLM) {
          this.$message("当前问题还没回答完毕，请稍后再提问");
          return;
        }
      } else if (this.chat_type == 10) {
        if (!this.isfinishTongyi) {
          this.$message("当前问题还没回答完毕，请稍后再提问");
          return;
        }
      } else if (this.chat_type == 12) {
        if (!this.isfinishShangtang) {
          this.$message("当前问题还没回答完毕，请稍后再提问");
          return;
        }
      }
      this.supplyVisible = true;
      this.chatItem = item;
      this.supplyValue = "";
      if (this.chat_type == 0) {
        this.replyThreeFive = item.content;
      } else if (this.chat_type == 1) {
        this.replyFourZero = item.content;
      } else if (this.chat_type == 4) {
        this.replyYiyan = item.content;
      } else if (this.chat_type == 5) {
        this.replyXunfei = item.content;
      } else if (this.chat_type == 7) {
        this.replyClaude = item.content;
      } else if (
        this.chat_type == 8 ||
        this.chat_type == 1003 ||
        this.chat_type == 1001 || this.chat_type == 1004
      ) {
        this.replyChatGLM = item.content;
      } else if (this.chat_type == 10) {
        this.replyTongyi = item.content;
      } else if (this.chat_type == 12) {
        this.replyShangtang = item.content;
      }
    },

    toBottom(type = true) {
      // 定位到当前聊天地点
      this.$nextTick(() => {
        setTimeout(() => {
          var scrollTop = document.getElementById("temolate_chat");
          let problemSquare = document.getElementById("problem_square") || {
            clientHeight: 0,
          };
          let servicesCode = document.getElementById("services_code");
          let first_item = document.getElementsByClassName("first_item")[0];
          let chatinProgress = document.getElementById("chatinProgress");
          let chatinRobot = document.getElementById("chatinRobot");
          let chatinContents = document.getElementById("chatinContents");
          let chatinTitle = document.getElementById("chatinTitle");
          if (this.chatContScroll == "" || this.chatContScroll <= scrollTop.scrollTop) {
            // scrollTop.scrollTop = scrollTop.scrollHeight
            scrollTop.scrollTop =
              problemSquare.clientHeight +
              servicesCode.clientHeight +
              chatinProgress.clientHeight -
              problemSquare.offsetHeight -
              servicesCode.offsetHeight -
              chatinRobot.offsetHeight -
              chatinContents.offsetHeight -
              chatinTitle.offsetHeight;
            this.chatContScroll = scrollTop.scrollTop;
          }
        }, 200);
      });
    },

    codeHandleChange(res) {
      // console.log(res);
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
      } else if (
        this.chat_type == 8 ||
        this.chat_type == 1003 ||
        this.chat_type == 1001 || this.chat_type == 1004
      ) {
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
      } else if (this.chat_type == 12) {
        this.isBtnShangtang = true;
        this.isTimeShangtang = false;
        clearInterval(this.t_timeShangtang);
        this.t_timeShangtang = null;
        this.isfinishShangtang = true; // 完成打字效果
      }

      if (Number(res.code) == 40013) {
        sessionStorage.setItem("templateSelectToken", this.item.title);
        console.log(2);
        this.$refs.Register.registerVisible = true;
        this.$store.dispatch("user/GuessLogin");
      } else if (
        (Number(res.code) == 30014 || Number(res.code) == 40022) &&
        this.loginInfo.role == "guess"
      ) {
        this.queryErrorMsg = res.msg;
        sessionStorage.setItem("templateSelectToken", this.item.title);
        console.log(3);
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

    backPage() {
      this.$emit("hidechat", true);
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
        this.chatList[1].help = false;
        this.chatList[1].stepOn = false;
        this.chatList[1].help = bool;
        this.chatList[1].is_likes = bool ? 1 : 0;
      } else if (num == 2) {
        // GPT35
        this.chatList[1].help = false;
        this.chatList[1].stepOn = false;
        this.chatList[1].stepOn = bool;
        this.chatList[1].is_likes = bool ? 2 : 0;
      } else if (num == 3) {
        // GPT40
        this.chatVipList[1].help = false;
        this.chatVipList[1].stepOn = false;
        this.chatVipList[1].help = bool;
        this.chatVipList[1].is_likes = bool ? 1 : 0;
      } else if (num == 4) {
        // GPT40
        this.chatVipList[1].help = false;
        this.chatVipList[1].stepOn = false;
        this.chatVipList[1].stepOn = bool;
        this.chatVipList[1].is_likes = bool ? 2 : 0;
      } else if (num == 5) {
        // GPT40
        this.chatYiyanList[1].help = false;
        this.chatYiyanList[1].stepOn = false;
        this.chatYiyanList[1].help = bool;
        this.chatYiyanList[1].is_likes = bool ? 1 : 0;
      } else if (num == 6) {
        // GPT40
        this.chatYiyanList[1].help = false;
        this.chatYiyanList[1].stepOn = false;
        this.chatYiyanList[1].stepOn = bool;
        this.chatYiyanList[1].is_likes = bool ? 2 : 0;
      } else if (num == 7) {
        // GPT40
        this.chatXunfeiList[1].help = false;
        this.chatXunfeiList[1].stepOn = false;
        this.chatXunfeiList[1].help = bool;
        this.chatXunfeiList[1].is_likes = bool ? 1 : 0;
      } else if (num == 8) {
        // GPT40
        this.chatXunfeiList[1].help = false;
        this.chatXunfeiList[1].stepOn = false;
        this.chatXunfeiList[1].stepOn = bool;
        this.chatXunfeiList[1].is_likes = bool ? 2 : 0;
      } else if (num == 9) {
        // GPT40
        this.chatClaudeList[1].help = false;
        this.chatClaudeList[1].stepOn = false;
        this.chatClaudeList[1].help = bool;
        this.chatClaudeList[1].is_likes = bool ? 2 : 0;
      } else if (num == 10) {
        // GPT40
        this.chatClaudeList[1].help = false;
        this.chatClaudeList[1].stepOn = false;
        this.chatClaudeList[1].stepOn = bool;
        this.chatClaudeList[1].is_likes = bool ? 2 : 0;
      } else if (num == 11) {
        // GPT40
        this.chatChatGLMList[1].help = false;
        this.chatChatGLMList[1].stepOn = false;
        this.chatChatGLMList[1].help = bool;
        this.chatChatGLMList[1].is_likes = bool ? 2 : 0;
      } else if (num == 12) {
        // GPT40
        this.chatChatGLMList[1].help = false;
        this.chatChatGLMList[1].stepOn = false;
        this.chatChatGLMList[1].stepOn = bool;
        this.chatChatGLMList[1].is_likes = bool ? 2 : 0;
      } else if (num == 13) {
        // GPT40
        this.chatTongyiList[1].help = false;
        this.chatTongyiList[1].stepOn = false;
        this.chatTongyiList[1].help = bool;
        this.chatTongyiList[1].is_likes = bool ? 2 : 0;
      } else if (num == 14) {
        // GPT40
        this.chatTongyiList[1].help = false;
        this.chatTongyiList[1].stepOn = false;
        this.chatTongyiList[1].stepOn = bool;
        this.chatTongyiList[1].is_likes = bool ? 2 : 0;
      } else if (num == 15) {
        // GPT40
        this.chatShangtangList[1].help = false;
        this.chatShangtangList[1].stepOn = false;
        this.chatShangtangList[1].help = bool;
        this.chatShangtangList[1].is_likes = bool ? 2 : 0;
      } else if (num == 16) {
        // GPT40
        this.chatShangtangList[1].help = false;
        this.chatShangtangList[1].stepOn = false;
        this.chatShangtangList[1].stepOn = bool;
        this.chatShangtangList[1].is_likes = bool ? 2 : 0;
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
      console.log(val)
      this.chat_type = val[0];
      this.chat_model = val[1]
    },
  },
};
</script>

<style scoped>
.template-chat {
  height: calc(100% - var(--a));
  overflow-y: auto;
}

.first_item {
  /* width: 70%; */
  margin: 0 auto;
  color: #666;
  font-size: 14px;
  font-weight: 500;
  padding: 20px 0;
  position: absolute;
  top: 0;
  background-color: #f1f2f5;
  z-index: 10;
}

.template-chat .item {
  width: 50%;
  margin: 10px auto;
  /* min-width: 700px; */
}

.template-chat .item .title {
  color: #000;
  font-size: 28px;
  font-weight: 500;
  text-align: center;
  margin-bottom: 20px;
}

.template-chat .item .contents {
  color: #666;
  font-size: 16px;
  font-weight: 400;
  line-height: 150%;
  margin-bottom: 38px;
  text-align: left;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
}

.robot {
  display: flex;
  justify-content: center;
}

.chat_list {
  display: flex;
  align-items: center;
  /* flex-wrap: wrap; */
  margin-bottom: 30px;
}

.chat-title {
  color: #333;
  font-size: 14px;
  font-weight: 500;
  /* line-height: 52px; */
  margin-right: 10px;
  width: 33px;
  /* margin-top: 17px; */
}

.chat_item {
  border-radius: 6px;
  /* border: 1px solid #E5E6EB; */
  padding: 7px 13px;
  color: #78829a;
  font-size: 14px;
  font-weight: 400;
  /* margin-right: 10px; */
  cursor: pointer;
  /* margin-bottom: 10px; */
}

.chat_item-on {
  color: #ffffff;
  border: 0px solid #9a9a9a;
  background: #1f64ff;
}

.answerResults {
  margin-top: 50px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.titlea {
  color: #333;
  text-align: center;
  font-size: 16px;
  font-weight: 500;
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}

.replay {
  color: #333;
  font-size: 18px;
  font-weight: 400;
}

.img_help {
  width: 16px;
  height: 16px;
}

.consume {
  color: #7e8494;
  font-size: 14px;
  font-weight: 400;
  display: flex;
  margin: 16px 0 0 0;
  border-top: 1px solid #e0e1e2;
  padding-top: 16px;
}

.img_help {
  display: block;
  margin: auto 0;
}

.words {
  margin-right: 8px;
}

.prompt {
  color: #aab2c8;
  font-size: 14px;
  font-weight: 400;
  margin-top: 10px;
}

.onAnalysis {
  width: 100%;
}

.button_list {
  margin-top: 10px;
  display: flex;
  justify-content: space-between;
  width: 100%;
}

.btn_right {
  background-color: #ffffff;
  padding: 6px 10px;
  display: flex;
  align-items: center;
}

.btn_right img {
  width: 20px;
  height: 20px;
}

.img_line {
  width: 1px;
  background-color: #dcdcdc;
  height: 100%;
  margin: 0 8px;
}

.services {
  width: 50%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: auto;
  margin-top: 80px;
}

.services .items img {
  width: 120px;
  height: 120px;
  margin: 0 auto;
  display: block;
}

.item_text {
  width: 100%;
  text-align: center;
  font-size: 16px;
  color: #333;
  font-weight: 550;
  margin-top: 15px;
}

.replay {
  font-size: 16px;
  /* color: #333; */
  line-height: 20px;
  /* 设置字间距 */
  letter-spacing: 1px;
  /* white-space: pre-wrap; */
}

.chat-dialog-footer {
  background-color: #1f64ff;
  color: #ffffff;
  padding: 6px 12px;
  font-size: 14px;
  border-radius: 4px;
  cursor: pointer;
}

.templateselect-list .selsect-title {
  color: #333;
  font-size: 13px;
  font-weight: 400;
  margin-bottom: 10px;
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.templateselect-list .selsect-title > div {
  display: flex;
  align-items: center;
}

.problem_square {
  width: 50%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 50px;
}

.problem_square .mskd {
  width: calc(100% - 40px);
  padding: 20px;
  display: flex;
  flex-direction: column;
  background-color: #ffffff;
  border-radius: 8px;
}

.problem_square .squar-title {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  margin-bottom: 10px;
  /* width: 80%; */
}

.problem_square .squar-title .title {
  color: #333;
  font-size: 15px;
  font-weight: 500;
  display: flex;
  align-items: center;
}

/* .problem_square .question_square-list {
  width: 80%;
} */

.problem_square .question_square-list .item {
  width: 100%;
  cursor: pointer;
  padding: 12px 0;
  border-bottom: 1px solid #e5e6eb;
}

.problem_square .question_square-list .item-on {
  border: none;
  padding-bottom: 0;
}

.problem_square .question_square-list .item .user {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  color: #333;
  font-size: 12px;
  font-weight: 400;
}

.problem_square .question_square-list .item .assistant {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  color: #888;
  font-size: 12px;
  font-weight: 400;
}

.btn_left {
  display: flex;
}

.optimize_question {
  color: #1e1f24;
  font-size: 14px;
  padding: 6px 10px;
  border: none;
  display: flex;
  align-items: center;
  background-color: #ffffff;
  border-radius: 4px;
  margin-right: 10px;
}

.reset_speak {
  color: #1e1f24;
  font-size: 14px;
  padding: 6px 10px;
  border: none;
  display: flex;
  align-items: center;
  background-color: #ffffff;
  border-radius: 4px;
}
</style>

<style>
.templateselect-list .el-tag {
  margin-right: 10px;
  margin-bottom: 5px;
}
.templateselect-list .button-new-tag {
  margin-right: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
  margin-bottom: 5px;
}
.templateselect-list .input-new-tag {
  width: 90px;
  margin-right: 10px;
  margin-bottom: 5px;
  vertical-align: bottom;
}
</style>
