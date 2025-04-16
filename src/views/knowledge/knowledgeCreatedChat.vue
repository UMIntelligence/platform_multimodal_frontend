<template>
  <!-- 创建AI智能体 -->
  <div class="main">
    <div class="go-back">
      <div @click="$router.go(-1)" class="go_back-item">
        <img
          style="width: 10px; transform: rotateZ(180deg)"
          src="../../assets/images/right.png"
          alt=""
        />
        <span style="margin-left: 8px">返回</span>
      </div>
    </div>
    <div class="left" id="left">
      <div>
        <div class="title">{{localStorageItem?'编辑':'创建'}}AI智能体</div>
        <el-form
          :model="ruleForm"
          :rules="rules"
          ref="ruleForm"
          label-width="100px"
          class="demo-ruleForm"
        >
          <div class="column-title">
            <div>
              <div class="line"></div>
              <div>基础设置</div>
            </div>
            <div class="domHover" @click="$message.success('保存成功')">保存</div>
          </div>

          <el-form-item label="分组" prop="fenzu" ref="fenzu">
            <el-select v-model="ruleForm.fenzu" placeholder="分组名称">
              <el-option :label="item.label" v-for="(item,index) in fenzu" :key="index" :value="item.value"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="分类" prop="fenlei" ref="fenlei">
            <el-select v-model="ruleForm.fenlei" placeholder="分类名称">
              <el-option :label="item.label" v-for="(item,index) in fenlei" :key="index" :value="item.value">
                <span style="float: left">{{ item.label }}</span>
                <span style="float: right;z-index: 10000;"> </span>
              </el-option>
              <el-option :label="item.label" v-for="(item,index) in typeArray" :key="index" :value="item.value">
                <span style="float: left">{{ item.label }}</span>
                <span style="float: right;z-index: 10000;" @click="handleDeteleType(item)"><i class="el-icon-delete"></i></span>
              </el-option>
              <template>
                <div class="add" @click="addType()">
                  <span style="font-size: 16px">+</span> 新增
                </div>
              </template>
            </el-select>
          </el-form-item>
          <el-form-item label="形象" prop="pic" ref="pic">
            <el-upload
              :action="httpUrls.loginUrl + 'api/user/oss_upload'"
              :on-change="handleUploadChange"
              :show-file-list="false"
              :on-success="handleUploadSuccess"
              :data="requestMiniCode"
              :headers="headerData"
              class="menter-avatar-uploader"
            >
              <img v-if="ruleForm.pic" :src="httpUrls.ossUrl + ruleForm.pic" alt="" class="menter-avatar">
              <div class="upload-btn">
                <div class="btn-mask">
                  <i class="el-icon-plus" style="font-size: 18px"></i>
                  <div>点击上传</div>
                </div>
              </div>
            </el-upload>
          </el-form-item>
          <el-form-item label="名称" prop="name" ref="name">
            <el-input v-model="ruleForm.name" placeholder="例如自媒体推文编导"></el-input>
          </el-form-item>
          <el-form-item label="描述" prop="desc" ref="desc">
            <el-input type="textarea" placeholder="例如，这是自媒体写作AI专家" :autosize="{ minRows: 3, maxRows: 6 }" show-word-limit maxlength="999" v-model="ruleForm.desc"></el-input>
          </el-form-item>
          <el-form-item label="智能体设定" prop="chatShezhi" ref="chatShezhi">
            <el-input type="textarea" placeholder="例如，我作为一位资深的自媒体写作专家，我专注于创作高质量的文章，我提供着专业的写作指导，我熟练掌握着各种写作技巧，我深入了解着行业的趋势。" :autosize="{ minRows: 3, maxRows: 6 }" show-word-limit maxlength="999" v-model="ruleForm.chatShezhi"></el-input>
          </el-form-item>
          <div class="column-title">
            <div>
              <div class="line"></div>
              <div>高级设置</div>
            </div>
            <div class="domHover" @click="$message.success('保存成功')">保存</div>
          </div>
          <el-form-item label="提示词" prop="tishici" ref="tishici">
            <el-input type="textarea" placeholder="例如，我作为一位资深的自媒体写作专家，我专注于创作高质量的文章，我提供着专业的写作指导，我熟练掌握着各种写作技巧，我深入了解着行业的趋势。" :autosize="{ minRows: 3, maxRows: 6 }" show-word-limit maxlength="999" v-model="ruleForm.tishici"></el-input>
            <div v-for="(item, index) in cueArr" :key="index" class="addInput-box">
              <el-input type="textarea" show-word-limit maxlength="999" v-model="item.tishi"
                :autosize="{ minRows: 3, maxRows: 6 }" placeholder="例如，我作为一位资深的自媒体写作专家，我专注于创作高质量的文章，我提供着专业的写作指导，我熟练掌握着各种写作技巧，我深入了解着行业的趋势。"></el-input>
              <div class="deleteInput" style="" @click="inputDelete('提示词',index)" v-if="cueArr.length != 0">删除
              </div>
            </div>
            <div class="addInput">
              <div class="addInput-bottom">
                <div @click="cueArr.push({tishi:''})">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
                    <path d="M14.25 2.25H3.75C2.92157 2.25 2.25 2.92157 2.25 3.75V14.25C2.25 15.0784 2.92157 15.75 3.75 15.75H14.25C15.0784 15.75 15.75 15.0784 15.75 14.25V3.75C15.75 2.92157 15.0784 2.25 14.25 2.25Z" stroke="#1F64FF" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M9 5.99609V11.9961" stroke="#1F64FF" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M6.00195 9H12.002" stroke="#1F64FF" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                  <span>添加</span>
                </div>
                <div>隐性提示词不会显示在平台上，用于大模型训练完善聊天质量</div>
              </div>
            </div>
          </el-form-item>
          <el-form-item label="预制问题" >
            <el-tag
            style="margin-right: 10px;"
              :key="tag"
              v-for="tag in presetTags"
              closable
              :disable-transitions="false"
              @close="handleClosePreset(tag)">
              {{tag}}
            </el-tag>
            <el-input
              class="input-new-tag"
              v-if="presetVisible"
              v-model="presetValue"
              ref="presetTagInput"
              size="small"
              @keyup.enter.native="handleInputConfirmPreset"
              @blur="handleInputConfirmPreset"
              style="width: 150px;"
            >
            </el-input>
            <el-button v-else class="button-new-tag" size="small" @click="showInputPreset">+ 添加</el-button>
          </el-form-item>
          <div class="column-title">
            <div>
              <div class="line"></div>
              <div>更多高级设置</div>
            </div>
            <div class="domHover" @click="$message.success('保存成功')">保存</div>
          </div>
          <el-form-item label="示例"> 
            <div class="shili">
              <div>可添加不同的对话示例</div>
              <el-popover
                placement="right"
                trigger="click">
                <img width="390px" :src='httpUrls.ossUrl + "static/picture/f35bd0a4-562a-4b18-9da8-804cfbbdbf2a.png"' />
                <span slot="reference">查看示例</span>
              </el-popover>
            </div>
            <div v-for="(item, i) in dialogueScenario" :key="i" style="padding: 20px;background: #F4F7F9;margin: 10px;">
          <div style="display: flex;justify-content: space-between;">
            <div v-if="item.type == '438260526168070'">类型：标签</div>
            <div v-if="item.type == '438600126748678'">类型：文本域</div>
            <div v-if="item.type == '438257565440006'">类型：输入框</div>
            <div v-if="item.type == '438257535715334'">类型：多选框</div>
            <div v-if="item.type == '438257788905478'">类型：下拉框</div>
            <div>
              <img src="../../assets/images/edit3.png" style="cursor: pointer;"
                @click="ruleFormAddTag = item, dialogVisible = true" alt="">
              <img src="../../assets/images/trash.png" style="cursor: pointer;" @click="dialogueScenario.splice(i, 1)"
                alt="">
            </div>
          </div>
          <div v-if="item.title != ''">标题：{{ item.title }}</div>
          <div v-if="item.placeholder != ''">提示语：{{ item.placeholder }}</div>
          <div v-if="item.dynamicTags.length != 0">标签：<span v-for="(v, o) in item.dynamicTags" :key="o">{{ v }} {{ o ==
            item.dynamicTags.length - 1 ? '' : '/' }}</span></div>
        </div>
            <div class="addInput" style="margin: 0px;">
              <div class="addInput-bottom">
                <div>
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
                    <path d="M14.25 2.25H3.75C2.92157 2.25 2.25 2.92157 2.25 3.75V14.25C2.25 15.0784 2.92157 15.75 3.75 15.75H14.25C15.0784 15.75 15.75 15.0784 15.75 14.25V3.75C15.75 2.92157 15.0784 2.25 14.25 2.25Z" stroke="#1F64FF" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M9 5.99609V11.9961" stroke="#1F64FF" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M6.00195 9H12.002" stroke="#1F64FF" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                  <span @click="dialogVisible = true">添加</span>
                </div>
              </div>
            </div>
          </el-form-item>
          <el-form-item label="提问示例" v-if="false" prop="shili" ref="shili">
            <el-input type="textarea" placeholder="请输入该人物的示例问题" :autosize="{ minRows: 3, maxRows: 6 }" show-word-limit maxlength="999" v-model="ruleForm.shili"></el-input>
            <div v-for="(item, index) in shiliArr" :key="index" class="addInput-box">
              <el-input type="textarea" show-word-limit maxlength="999" v-model="item.shili"
                :autosize="{ minRows: 3, maxRows: 6 }" placeholder="请输入该人物的示例问题"></el-input>
              <div class="deleteInput" style="" @click="inputDelete('示例',index)" v-if="shiliArr.length != 0">删除
              </div>
            </div>
            <div class="addInput">
              <div class="addInput-bottom">
                <div @click="shiliArr.push({shili:''})">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
                    <path d="M14.25 2.25H3.75C2.92157 2.25 2.25 2.92157 2.25 3.75V14.25C2.25 15.0784 2.92157 15.75 3.75 15.75H14.25C15.0784 15.75 15.75 15.0784 15.75 14.25V3.75C15.75 2.92157 15.0784 2.25 14.25 2.25Z" stroke="#1F64FF" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M9 5.99609V11.9961" stroke="#1F64FF" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M6.00195 9H12.002" stroke="#1F64FF" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                  <span>添加</span>
                </div>
                <div>隐性提示词不会显示在平台上，用于大模型训练完善聊天质量</div>
              </div>
            </div>
          </el-form-item>
        </el-form>
        <div class="column-title">
          <div>
            <div class="line"></div>
            <div>选择知识库</div>
          </div>
          <div class="domHover" @click="$message.success('保存成功')">保存</div>
        </div>
        <div class="tips">根据已配置的个人知识库，选择当前AI智能体使用的知识库内容</div>
        <!-- 选择知识库 -->
        <div class="checkKnowledge">
          <el-tree
            :data="treeData"
            :default-checked-keys="defaultCheck"
            show-checkbox
            default-expand-all
            node-key="id"
            ref="tree"
            highlight-current
            @check-change="handleCheckChange"
            :props="defaultProps">
          </el-tree>
        </div>
        <div style="width: 100%;height: 150px;">
          <div class="submitBtu" @click="handleSubmit('ruleForm')">保存</div>
        </div>
      </div>
    </div>
    <div class="right">
        <img :src="httpUrls.ossUrl + ruleForm.pic" alt="">
        <div class="chat_title">{{ruleForm.name}}</div>
        <div class="chat_tips">{{ruleForm.desc}}</div>
        <div class="chat_check">
          <div @click="toBottom">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
              <g clip-path="url(#clip0_10247_17605)">
              <path d="M6.66602 8.66795C6.95232 9.0507 7.31759 9.3674 7.73705 9.59657C8.15651 9.82574 8.62035 9.96202 9.09712 9.99617C9.57388 10.0303 10.0524 9.96152 10.5002 9.79447C10.9481 9.62741 11.3548 9.36599 11.6927 9.02795L13.6927 7.02795C14.2999 6.39927 14.6359 5.55726 14.6283 4.68327C14.6207 3.80929 14.2701 2.97324 13.6521 2.35522C13.0341 1.73719 12.198 1.38663 11.324 1.37903C10.45 1.37144 9.60802 1.70742 8.97935 2.31461L7.83268 3.45461" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M9.33151 7.33283C9.04521 6.95008 8.67994 6.63338 8.26048 6.40421C7.84102 6.17503 7.37717 6.03875 6.90041 6.00461C6.42365 5.97047 5.94512 6.03925 5.49728 6.20631C5.04944 6.37337 4.64277 6.63479 4.30485 6.97283L2.30485 8.97283C1.69765 9.60151 1.36167 10.4435 1.36927 11.3175C1.37686 12.1915 1.72742 13.0275 2.34545 13.6456C2.96348 14.2636 3.79952 14.6142 4.67351 14.6217C5.5475 14.6293 6.38951 14.2934 7.01818 13.6862L8.15818 12.5462" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              </g>
              <defs>
              <clipPath id="clip0_10247_17605">
              <rect width="16" height="16" fill="white"/>
              </clipPath>
              </defs>
            </svg>
            <div>关联知识库</div>
          </div>
          <div @click="$router.push('/knowledge/knowledgeRobot')">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M14.069 6.63914C14.3732 6.63914 14.6476 6.45586 14.7641 6.17461C14.8807 5.89367 14.8162 5.56992 14.6012 5.35461L11.156 1.90977C11.042 1.7957 10.8573 1.7957 10.7432 1.90977L10.0918 2.56117C9.97773 2.67523 9.97773 2.86008 10.0918 2.97398L12.2524 5.13445H1.34898C1.18977 5.13445 1.06055 5.26352 1.06055 5.42289V6.35086C1.06055 6.51008 1.18961 6.6393 1.34898 6.6393H14.069V6.63914ZM14.651 9.35555H1.93461C1.63039 9.35555 1.35602 9.53883 1.23945 9.82008C1.12289 10.101 1.18742 10.4248 1.40242 10.6401L4.84758 14.0851C4.96164 14.1991 5.14633 14.1991 5.26039 14.0851L5.9118 13.4337C6.02586 13.3196 6.02586 13.1348 5.9118 13.0209L3.75117 10.8602H14.651C14.8123 10.8602 14.9429 10.7295 14.9429 10.5684V9.64758C14.9429 9.48633 14.8123 9.35555 14.651 9.35555Z" fill="#1F64FF"/>
            </svg>
            <div>切换AI智能体</div>
          </div>
          <div >
            <el-select v-model="chat_type" placeholder="请选择对话模型">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </div>
        </div>
        <div class="chat_content" v-if="false">
          <div>
            <div>写一个朋友圈文案，要有趣好玩<span>*</span></div>
            <el-input v-model="chat_input" placeholder="文案主题是“今天中午吃什么”"></el-input>
          </div>
          <div>
            <div>需要包含以下内容<span>*</span></div>
            <div><tegInput @getCustomTag="getTagArray"></tegInput></div>
          </div>
          <div>
            <div>已特定性别视角</div>
            <el-select v-model="chat_gender" placeholder="请选择">
              <el-option value="1" label="男性"></el-option>
              <el-option value="2" label="女性"></el-option>
            </el-select>
          </div>
        </div>
        <div class="chat_content">
            <!-- 单选 多选 输入 选择器 开关 标签 文本域 -->
            <div
              class="templateselect-list"
              :key="item.title"
              v-for="item in questionList"
            >
              <div class="selsect-title">
                <div>
                  <span>{{ item.title }}</span>
                  <span v-if="item.is_required == '1'" style="color: #f00"
                    >*</span
                  >
                </div>
              
              </div>
              <el-input
                v-if="item.info_type_name == 'Input'"
                v-model="item.selectItem"
                :placeholder="
                  item.example_question
                    ? item.example_question
                    : item.placeholder
                "
              ></el-input>
              <el-input
                v-if="item.info_type_name == 'Textarea'"
                rows="4"
                type="textarea"
                autosize
                v-model="item.selectItem"
                :placeholder="
                  item.example_question
                    ? item.example_question
                    : item.placeholder
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
                v-if="
                  item.info_type_name == 'Select' ||
                  item.info_type_name == 'Radio'
                "
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
                style="
                  border: 1px solid #e5e6eb;
                  padding: 8px 12px;
                  border-radius: 8px;
                "
              >
                <el-tag
                  :key="tag.option_id"
                  v-for="tag in item.options"
                  closable
                  :disable-transitions="false"
                  @close="handleCloseTag(tag, item)"
                >
                  {{ tag.value }}
                </el-tag>
                <el-input
                  class="input-new-tag"
                  style="width: 150px;"
                  v-if="inputVisible"
                  v-model="inputValue"
                  ref="saveTagInputTag"
                  size="small"
                  @keyup.enter.native="handleInputConfirmTag(item)"
                  @blur="handleInputConfirmTag(item)"
                >
                </el-input>
                <el-button
                  v-else
                  class="button-new-tag"
                  size="small"
                  @click="showInputTag"
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
        <div class="sendMsg" @click="handleChat">{{isBtnChat ? "AI一下" : "思考中..." + timerChat + "秒"}}</div>
        <div
          class="answerResults"
          v-if="isShowResultsChat && chatList.length>1"
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
              >
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
                v-html="
                  isDetailChat ? chatList[1].markedContent : replyChat
                "
              ></div>
              <div></div>

              <div class="consume">
                <!-- <span class="words">字数：{{ chatList[1].content.length }}</span> -->
              </div>
              <div class="prompt" v-if="isBtnChat">
                当前内容为AI生成，不做任何决策使用！由此引发的一切后果，需自行承担，请知悉，已通过阿里云内容安全审核
              </div>
            </div>
          </div>

          <div class="button_list">
            <div class="btn_left">
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
              v-if="!isfinishChat"
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

            <div class="btn_right">
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
    </div>
    <el-dialog title="" :visible.sync="dialogVisible" width="370px">
      <el-form :model="ruleFormAddTag" :rules="rulesAddTag" ref="ruleFormAddTag" label-width="100px"
        class="demo-ruleForm">
        <el-form-item label="类型" prop="type">
          <el-select v-model="ruleFormAddTag.type" placeholder="请选择" @change="handleTagTypeChange">
            <el-option
              v-for="item in [{ value: '438600126748678', label: '文本域' }, { value: '438260526168070', label: '标签' }, { value: '438257535715334', label: '多选框' }, { value: '438257788905478', label: '单选框' }, { value: '438257565440006', label: '输入框' }]"
              :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="标题" prop="title" v-if="ruleFormAddTag.type != ''">
          <el-input v-model="ruleFormAddTag.title" placeholder="请输入内容"></el-input>
        </el-form-item>

        <el-form-item label="提示语" prop="placeholder"
          v-if="ruleFormAddTag.type != '438260526168070' && ruleFormAddTag.type != ''">
          <el-input v-model="ruleFormAddTag.placeholder" placeholder="请输入内容"></el-input>
        </el-form-item>

        <el-form-item :label="ruleFormAddTag.type == '438260526168070' ? '标签' : '选项'" prop="dynamicTags"
          v-if="ruleFormAddTag.type != '438600126748678' && ruleFormAddTag.type != '438257565440006' && ruleFormAddTag.type != ''">
          <el-tag :key="tag" v-for="tag in ruleFormAddTag.dynamicTags" closable :disable-transitions="false"
            @close="handleClose(tag)">
            {{ tag }}
          </el-tag>
          <el-input class="input-new-tag" v-if="inputVisible" style="width: 80px;" v-model="inputValue" ref="saveTagInput"
            size="small" @keyup.enter.native="handleInputConfirm" @blur="handleInputConfirm">
          </el-input>
          <el-button v-else class="button-new-tag" size="small" @click="showInput">+ 新的选项</el-button>
        </el-form-item>
        <el-form-item label="是否必填" prop="isPublic"
          v-if="ruleFormAddTag.type != '438600126748678' && ruleFormAddTag.type != '438257565440006' && ruleFormAddTag.type != ''">
          <el-select v-model="ruleFormAddTag.isPublic" placeholder="请选择" style="max-width: 500px;">
            <el-option v-for="item in [{ value: 1, label: '是' }, { value: 0, label: '否' }]" :key="item.value"
              :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" style="padding: 6px 10px;" @click="submitFormAddTag('ruleFormAddTag')">保存</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>
<script>
import httpUrls from "../../api/requestURL";
import tegInput from "../../components/tagInput.vue"
import { textDecoder, arr2str } from "../../utils/download";
import { marked } from "marked";
import {getUserGroups,getUserGroupsModel,createdModel,chatAgent,getKnowledgeModel } from "../../api/knowledge";
export default {
  name: "knowledgeCreatedChat",
  data() {
    return {
      headerData: {},
      presetTags: ['问题一'],
      presetVisible:false,
      presetValue:'',
      ordeAIList: [], // 关联上下文的列表
      dialogVisible:false,
      localStorageItem: localStorage.getItem('editKnowledge'),
      httpUrls,
      questionList:[],  //问题列表
      fenzu:[],   //分组数据
      fenlei:[],  //分类数据
      typeArray:[],   //用户自定义分类
      checkFileId:[],
      treeData:[],  //选择知识库数据
      checkTreeData:[],   //选中的树型节点
      defaultCheck:[],  //默认选中
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      ruleForm: {
        fenzu: "",  //分组
        fenlei: "", //分类
        pic: "", //形象
        name: "",   //名称
        desc: '',   //描述
        chatShezhi: '', //智能体设置
        tishici: "",  //提示词
        shili: "",    //示例
        preset_questions:[],  //预制问题
      },
      rules: {
        fenzu: [
          { required: true, message: "请选择您的分组", trigger: "change" },
        ],
        fenlei: [
          { required: true, message: "请选择您的分类", trigger: "change" },
        ],
        pic: [
          { required: true, message: "请上传您的形象", trigger: "change" },
        ],
        name: [
          { required: true, message: "请输入名称", trigger: "blur" },
        ],
        desc: [
          { required: true, message: "请输入描述", trigger: "blur" },
        ],
        chatShezhi: [
          { required: true, message: "请设置智能体", trigger: "blur" },
        ],
        tishici: [
          { required: true, message: "请设置提示词", trigger: "blur" },
        ],
      },
      ruleFormAddTag: {
        type: '',
        title: '',
        placeholder: '',
        dynamicTags: [],
        isPublic: 1,
      },
      rulesAddTag: {
        type: [
          { required: true, message: '请选择类型', trigger: 'change' },
        ],
        title: [
          { required: true, message: '请输入标题', trigger: 'blur' },
        ],
        placeholder: [
          { required: true, message: '请输入提示语', trigger: 'blur' },
        ],
        dynamicTags: [
          { required: true, message: '请填写标题或选项', trigger: 'blur' },
        ],
        isPublic: [
          { required: true, message: '请选择是否必填', trigger: 'blur' },
        ]
      },
      requestMiniCode: {
        image: null,
        image_name: null,
        oss_dir: "static",
        cate: "Enterprise_customization-role_list",
      },
      cueArr:[],
      shiliArr:[],
      dialogueScenario: [],
      options:[
        {
          label:"文心一言",
          value:'4'
        },
        {
          label:"通义千问",
          value:'10'
        },
        
      ],
      chat_type:'4',
      chat_input:'',  //chat文本框
      chat_tag:[],   //chat标签
      chat_gender:'',  //chat性别
      inputVisible: false,
      inputValue:'',

      chatList: [], //对话数据
      isfinishChat: true, // 完成打字效果 / 35
      sendValue:'你好',
      oldSendValue:'',
      isClickChat:false,
      isFoulLanguage: false, // 用户问题是否出现屏蔽词，问题返回时
      isShowassociation: false, // 是否关联上下文
      isShowChecked: false, // 复选框
      replyChat: "", // 实时回答 / 讯飞星火
      isBtnChat: true, // 防止重新发送
      isTimeChat: false, // 开启获取中对话框 / 35
      isDetailChat: false, // 显示会话内容 / 40
      t_timeChat: 0, // 定时器
      timerChat: 0, // 定时器的时间 / 35
      isuser:true,
      controllerChat: null, // 用于终止fetch请求 / 35
      isShowResultsChat: false,
      loginInfo:JSON.parse(localStorage.getItem('userInfo')),
      createdChatData:{},   //创建智能体后接口返回数据，
      chatData:{},  //对话后返回数据
    };
  },
  components:{
    tegInput
  },
  created() {
    let userInfo = JSON.parse(localStorage.getItem("userInfo"));
    this.headerData.authorization = userInfo.token
    this.headerData.role = userInfo.role
    //自定义分组
    let localStorageType = localStorage.getItem('typeArray')  
    //判断存储中有没有用户自定义的分类
    this.typeArray = localStorageType?JSON.parse(localStorageType):[]
    let requestData = `user_id=${JSON.parse(localStorage.getItem('userInfo'))['user_id']}`
    getUserGroups(requestData).then(res => {
      let arr = []
      Object.keys(res.data).map((key,index) => {
        let obj = {
          label:"",
          id:"",
          children:[]
        }
        if(key == 'documents'){
          obj.label = '文档库'
        }else if(key == 'pictures'){
          obj.label = '图片库'
        }else if(key == 'urls'){
          obj.label = '网址库'
        }
        obj.id = '';
        // obj.label = 
        Object.keys(res.data[key]).map((item,i) => {
          // console.log(res.data[key][item],'lllllllllljh')
          let childArr = []
          res.data[key][item].map(child => {
            let childObj = {
              label:"",
              id:"",
            }
            if(key == 'documents'){
              childObj.label = child.file_name;
              childObj.id = child.file_id
            }else if(key == 'pictures'){
              childObj.label = child.pic_name;
              childObj.id = child.pic_id
            }else if(key == 'urls'){
              childObj.label = child.url_name;
              childObj.id = child.url_id;
            }
            childArr.push(childObj)
          })
          obj.children.push({label:item,id:'',file_id:res.data[key][item],children:childArr})
        })
        // console.log(obj,'555555')
        arr.push(obj);
      })
      this.treeData = arr;
      let data = JSON.parse(localStorage.getItem('editKnowledge'))
      if(data){
        let checkArr = []
        data.file_id.split(',').map(file_id => {  //file_id：文件ID
          this.treeData.map(tree => {   //tree：树型数据
            tree.children.map(item => {   //item：分组数据
              item.file_id.map(child => { 
                let index = checkArr.findIndex(ind => ind == item.id)
                if(child.url_id){   //网址库
                  if(child.url_id == file_id){
                    if (index == -1) {
                      checkArr.push(child.url_id)
                    }
                  }
                }else if(child.file_id){  //文档库
                  if(child.file_id == file_id){
                    if (index == -1) {
                      checkArr.push(child.file_id)
                    }
                  }
                }else if(child.pic_id){   //图片库
                  if(child.pic_id == file_id){
                    if (index == -1) {
                      checkArr.push(child.pic_id)
                    }
                  }
                }
              })
          })
          })
        })
        this.defaultCheck = checkArr;
      }
    })
    getUserGroupsModel(requestData).then(res => {
      // console.log('获取用户分组分类')
      let groupArray = res.data['group_tree'];  //分组数据
      let typeArray = res.data['type_tree'];  //分类数据

      this.fenzu = Object.keys(groupArray).map(key => ({label:key,value:groupArray[key]}));
      console.log(this.fenzu,'分组数据')
      //有本地分组
      if(JSON.parse(localStorage.getItem("menuAgent"))){
        let obj = {
          label:JSON.parse(localStorage.getItem("menuAgent"))['groupName'],
          value:[{
            group_name:JSON.parse(localStorage.getItem("menuAgent"))['groupName'],
            group_order:this.fenzu.length+1
          }]
        }
        this.fenzu.push(obj)
      }
      this.fenlei = Object.keys(typeArray).map(key => ({label:key,value:key}));
      let data = JSON.parse(localStorage.getItem('editKnowledge'))
      if(data){
        this.fenzu.map(item => {
          if(item.label == data.group_name){
            this.$set(this.ruleForm,'fenzu',item.value)
          }
        })
        this.fenlei.map(item => {
          if(item.value == data.agent_type_name){
            // console.log(item)
            this.$set(this.ruleForm,'fenlei',item.value)
          }
        })
      }
    })
  },
  
  mounted(){
    let data = JSON.parse(localStorage.getItem('editKnowledge'))
    if (data) {
      let obj = {
        fenzu: "",  //分组
        fenlei: "", //分类
        pic: data.avatar_url, //形象
        name: data.agent_name,   //名称
        desc: data.agent_desc,   //描述
        chatShezhi: data.agent_character, //智能体设置
        tishici: data.agent_prompt,  //提示词
        shili: "",    //示例
      }

      //处理预制问题
      if(data.preset_questions && data.preset_questions.length != 0){
        this.presetTags = data.preset_questions.map(item => (item.question_content))
      }
      // this.defaultCheck = data.file_id.split(',')
      this.checkTreeData = data.file_id.split(',');
      this.dialogueScenario = []
      this.questionList = data.options.options;
      data.options.options.forEach(v => {
        let arr = []
        if (Object.keys(v.options).length != 0) {
          v.options.forEach(item => {
            arr.push(item.value)
          })
        }
        // console.log(v.options)
        this.dialogueScenario.push({
          type: v.info_type_id,
          title: v.title,
          placeholder: v.placeholder,
          dynamicTags: arr,
          isPublic: Number(v.is_required),
          id: this.dialogueScenario.length
        })
      });
      this.ruleForm = obj

    }
  },
  watch: {
    $route: {
      deep: true,
      handler() {
        if(this.$route.path != '/knowledge/knowledgeCreatedChat'){
          console.log('进入')
          localStorage.removeItem('editKnowledge')
        }
      }
    }
  },
  beforeDestroy() {
    console.log('页面销毁')
    localStorage.removeItem('editKnowledge')
  },
  methods: {
    handleClosePreset(tag) {
        this.presetTags.splice(this.presetTags.indexOf(tag), 1);
      },

    showInputPreset() {
      this.presetVisible = true;
      this.$nextTick(_ => {
        this.$refs.presetTagInput.$refs.input.focus();
      });
    },

    handleInputConfirmPreset() {
      let inputValue = this.presetValue;
      if (inputValue) {
        this.presetTags.push(inputValue);
      }
      this.presetVisible = false;
      this.presetValue = '';
    },
    toBottom(){
      let dom = document.getElementById('left')
      let child = document.getElementsByClassName('checkKnowledge')[0]
      dom.scrollTop = child.offsetTop - dom.offsetTop;
    },
    sendMsg(bool = "") {
      if (this.loginInfo.role == "guess") {
        this.$refs.Register.registerVisible = true;
        return 
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
          (v.options.length == 0 || v.options == "")
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
      // // 判断输入的文字和选中上下文的文字是否超过限制
      // let msgList = "";
      // this.ordeAIList.forEach((v) => {
      //   msgList += v.content;
      // });
      // msgList += this.sendValue;
      this.isuser = true;
      // if (this.chat_type == 0) {
      //   if (msgList.length >= "2001") {
      //     this.$message.error("文字不得超过2000字");
      //     return;
      //   }
      // } else {
      //   if (msgList.length >= "2001") {
      //     this.$message.error("文字不得超过2000字");
      //     return;
      //   }
      // }
      this.chatList = [];
      // matchContextAssistant({
      //   company_id: this.item.question_id,
      //   clerk_id: this.item.question_id,
      //   question_content: this.sendValue,
      // }).then((res) => {
      //   let val = null;
      //   let title = /^AI/.test(this.item.title.trim())
      //     ? this.item.title
      //     : "AI " + this.item.title.trim();

          
      // });
      let val = {
            chat_type: this.chat_type,
            session_code:
              bool == "true" ? localStorage.getItem("session_code") : "",
            chat_group_code: "",
            msg_list: JSON.stringify([
              {
                role: "user",
                content:  " " + this.chatData.question,
                covert_content: '',
                agent_id:this.chatData.agent_id
              },
            ]),
          };
        this.vipSend(bool, val);
    },

    // 4.0信息发送
    async vipSend(bool = "", val) {
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

      this.isShow = true; // 快速提问
      this.isDetailChat = false;
      this.isfinishChat = false; // 完成打字效果
      this.isBtnChat = false; // 是否允许重发
      this.replyChat = "";
      this.isShowResultsChat = true;

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
        content: this.chatData.question, // 预留，对话内容的转换
        // "markedContent": marked(this.sendValue),
        checked: false,
        help: false, // 点赞
        stepOn: false, // 点踩
        timer: false,
      };
      // console.log(this.sendValue, sendVal);

      // 获取当前会话列表的长度，用作右侧侧边栏的选中状态
        this.chatList.push({ ...sendVal, id: this.chatList.length }); // id：用于关联上下文时的排序，防止顺序错乱导致接口返回的信息错误
        this.$store.dispatch("user/changeChatListLength", this.chatList.length);
      // console.log(this.chatYiyanList);

      // this.toBottom();

      // this.isTime = true; // 思考中
        this.isTimeChat = true;
      if (bool != "toChatFouty") {
          // this.timerChat = 0;
          // this.t_timeChat = setInterval(() => {
          //   this.timerChat += 1;
          // }, 1000);
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

          val = {
            chat_type: this.chat_type,
            session_code:
              bool == "true" ? localStorage.getItem("session_code") : "",
            chat_group_code: "",
            // 'session_code': '',
            // 'chat_group_code': "",
            msg_list: JSON.stringify([
              ...contemt,
              { role: "user", content: this.chatData.question },
            ]),
          };
        this.ordeAIList = [];
      }
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
          this.t_timeChat = setInterval(() => {
            this.timerChat += 1;
          }, 1000);
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
          v.options = arra;
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
      let url =
        Number(this.chat_type) == 0 || Number(this.chat_type) == 1
          ? "api/chat/async_chat_session"
          : "api/chat/async_chat_completion";
      // console.log(val, "--请求参数");
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
            this.isDetailChat = false;
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
          this.isfinishChat = true;
          clearInterval(this.t_timeChat);
          this.t_timeChat = null;
          this.isTimeChat = false;
          this.isBtnChat = true;
        }
        this.$message.error("关联对话必须为一问一答");
      }
      if (Number(res.code) == 30014 || Number(res.code) == 40022) {
        // 登录
        if (this.loginInfo.role == "guess") {
          sessionStorage.setItem("templateSelectToken", this.item.title);
          console.log(1)
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
        const validLanguage = hljs.getLanguage(language)
          ? language
          : "plaintext";
        const highlightedCode = hljs.highlight(validLanguage, code).value;
        return `<pre><code class="hljs ${validLanguage}">${highlightedCode}</code></pre>`;
      };

      // 35
      console.log(res.content,'文本')
      if (!this.isfinishChat) {
        this.isTimeChat = false;
        if (res != "" && res.content != null) {
          // console.log(res.content,'文本')
          if (this.chat_type == "10") {
            this.chatList[this.chatList.length - 1].content = res.content;
            this.chatList[this.chatList.length - 1].markedContent = marked(
              res.content
            );
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
          // this.toBottom();
        }
        if (res.session_code != "" && res.session_code != null) {
          this.chatList[this.chatList.length - 1].session_code =
            res.session_code;
          localStorage.setItem("session_code", res.session_code);
        }
        if (res.create_time != "" && res.create_time != null) {
          this.chatList[this.chatList.length - 1].create_time = res.create_time;
        }
        if (res.chat_group_code != "" && res.chat_group_code != null) {
          this.chatList[this.chatList.length - 1].chat_group_code =
            res.chat_group_code;
          localStorage.setItem("chat_group_code", res.chat_group_code);
        }
        if (res.finish_reason != "" && res.finish_reason != null) {
          this.isfinishChat = true;
          this.isBtnChat = true;
          for (let i = 0; i < 10; i++) {
            clearInterval(this.t_timeChat);
          }
          this.t_timeChat = null;
          this.chatList[this.chatList.length - 1].finish_reason =
            res.finish_reason;
          this.$store.dispatch(
            "user/changeChatListLength",
            this.chatList.length
          );
          this.chatList[this.chatList.length - 1].timer = this.timerChat;
          if (!localStorage.getItem("session_code")) {
            this.sessionRightNavCode = res.session_code;
          }
          this.tokenNumberChat = {
            completionTokens: res.completion_tokens, // 下行token
            promptTokens: res.prompt_tokens, // 上行token
            integral: res.integral, // 积分
            totalTokens: res.total_tokens, // 总tokes
          };

          this.chatList.forEach((v) => {
            v.markedContent = marked(v.content, { renderer });
          });
          this.replyChat = marked(this.replyChat, { renderer });

          // let str = "";
          // if (sessionStorage.getItem("applicationId") == "3") {
          //   str = "效率工具";
          // } else if (sessionStorage.getItem("applicationId") == "2") {
          //   str = "娱乐生活";
          // } else if (sessionStorage.getItem("applicationId") == "5") {
          //   str = "工作学习";
          // } else if (sessionStorage.getItem("applicationId") == "1") {
          //   str = "工作助理";
          // }
          // // 保存最近使用
          // submitFootprint({
          //   type_name: str,
          //   type_code: "assistant",
          //   title: this.oldSendValue,
          //   eid: res.session_code,
          // }).then((res) => {});
        }
        if (res.finish_reason == "stop") {
          this.sessionRightNavCode = res.session_code;
        }
        if (res.role != "" && res.role != null) {
          this.chatList[this.chatList.length - 1].role = res.role;
        }
      }
    },
    // 重新回答
    resetController() {
        if (!this.isfinishChat) {
          this.$message("当前问题还没回答完毕，请稍后再提问");
          return;
        }
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
    // 用户新增分类
    addType(){
      this.$prompt('', '新增分类', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          inputPattern: /^.+$/,
          inputErrorMessage: '分类不能为空'
        }).then(({ value }) => {
          this.typeArray.push({label:value,value})
          localStorage.setItem('typeArray',JSON.stringify(this.typeArray))
          this.$message({
            type: 'success',
            message: '添加成功'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '取消输入'
          });       
        });
    },
     // 获取图片标签
     getTagArray(e) {
      this.chat_tag = e
    },
    //AI一下
    handleChat(){
      // this.sendMsg()
      // return
      let userInfo = JSON.parse(localStorage.getItem('userInfo'))
      if(this.localStorageItem){  //编辑
        let data = JSON.parse(this.localStorageItem)
        let requestData = `user_id=${userInfo.user_id}&group_id=${data.group_id}&group_order=${data.group_order}`
        getKnowledgeModel(requestData).then(res => {
          Object.keys(res.data).map(key => {
            Object.keys(res.data[key]).map(child => {
              if(res.data[key][child].agent_id == data.agent_id){
                console.log(res.data[key][child],'当前数据')
                localStorage.setItem('chatKnowledge',JSON.stringify(res.data[key][child]))
                this.$router.push('/knowledge/knowledgeChat')
              }
            })
          })
        })
      }else{  //创建后AI一下
        if(!Object.keys(this.createdChatData).length){
          this.$message.error('请先创建你的智能体')
        }else{
          console.log(this.createdChatData)
          let requestData = `user_id=${userInfo.user_id}&group_id=${this.createdChatData.group_id}&group_order=${this.createdChatData.group_order}`
          getKnowledgeModel(requestData).then(res => {
            Object.keys(res.data).map(key => {
              Object.keys(res.data[key]).map(child => {
                if(res.data[key][child].agent_id == this.createdChatData.agent_id){
                  localStorage.setItem('chatKnowledge',JSON.stringify(res.data[key][child]))
                  this.$router.push('/knowledge/knowledgeChat')
                }
              })
            })
          })
        }
      }
      // let requestData = {
      //   agent_id:JSON.parse(this.localStorageItem).agent_id,
      //   options:[]
      // }
      // let returmSend = false;
      // this.questionList.forEach((item) => {
      //   if (item.info_type_name == "Input" || item.info_type_name == "Textarea") {
      //     requestData.options.push({option_title:item.title,option_value:item.selectItem})
      //   }
      //   if (
      //     (item.info_type_name == "Redio" || item.info_type_name == "Select") &&
      //     item.selectItem != ""
      //   ) {
      //     requestData.options.push({option_title:item.title,option_value:item.title + ":"+item.selectItem})
      //     // this.sendValue += v.title + ":";
      //     // this.sendValue += v.selectItem.value + ",";
      //   }
      //   if (item.info_type_name == "CheckBox" && item.selectItem.length > 0) {
      //     // this.sendValue += v.title + ":";
      //     let text = item.title + ":"
      //     item.options.forEach((v) => {
      //       text += v.value + ",";
      //     });
      //     requestData.options.push({option_title:item.title,option_value:text})
      //   }
      //   if (item.info_type_name == "Tag") {
      //     let text = item.title + ":"
      //     item.options.forEach((v) => {
      //       text += v.value + ",";
      //     });
      //     requestData.options.push({option_title:item.title,option_value:text})
      //   }
      //   if(item.info_type_name != "Tag" &&item.is_required == "1" && !item.selectItem){
      //     this.$message.error("请说出你的需求！");
      //     returmSend = true;
      //   }
      // });
      // if (returmSend) {
      //   return;
      // }
      // this.timerChat = 0;
      // this.t_timeChat = setInterval(() => {
      //   this.timerChat += 1;
      // }, 1000);
      // this.isBtnChat = false;
      // this.questionList.map(item => {
      //   requestData.options.push({option_title:item.title,option_value:item.selectItem})
      // })
      // chatAgent(requestData).then(res => {
      //   console.log(res)
      //   if (res.code != 20000) {
      //     this.$message.error(res.msg)
      //   }else{
      //     this.chatData = res.data
      //     this.sendMsg()
      //   }
      // })
    },
    handleCheckChange(data, checked){
      let a = this.$refs.tree.getCheckedKeys().concat(this.$refs.tree.getHalfCheckedKeys())
      this.checkTreeData = a.filter(item =>item.trim() != '');
      let arr = [
        {
          tishi:"提示词1"
        },
        {
          tishi:"dasdq"
        },
      ]
    },

    // 图片上传
    handleUploadSuccess(response, file, fileList) {
      this.ruleForm.pic = response.data.new_url;
    },
    handleUploadChange(file, fileList) {
      this.requestMiniCode.image = file.raw;
    },
    inputDelete(text,index) {
      if (text == '提示词') {
        this.cueArr.splice(index, 1);
      }else{
        this.shiliArr.splice(index, 1);
      }
    },
    // 切换标签属性时
    handleTagTypeChange(e) {
      if (e == '438600126748678' || e == '438257565440006') {
        this.ruleFormAddTag.dynamicTags = []
      }
    },
    //弹出框
    handleClose(tag) {
      this.ruleFormAddTag.dynamicTags.splice(this.ruleFormAddTag.dynamicTags.indexOf(tag), 1);
    },
    showInput() {
      this.inputVisible = true;
      this.$nextTick(_ => {
        this.$refs.saveTagInputTag.$refs.input.focus();
      });
    },
    handleInputConfirm() {
      let inputValue = this.inputValue;
      if (inputValue) {
        this.ruleFormAddTag.dynamicTags.push(inputValue);
      }
      this.inputVisible = false;
      this.inputValue = '';
    },

    // AI对话
    // 删除标签
    handleCloseTag(tag, item) {
      this.questionList.forEach((v) => {
        if (v.info_type_id == item.info_type_id && v.title == item.title) {
          v.options.splice(v.options.indexOf(tag), 1);
        }
      });
      // this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
    },

    // 输入框聚焦
    showInputTag() {
      this.inputVisible = true;
      this.$nextTick(() => {
        this.$refs.saveTagInput.$refs.input.focus();
      });
    },

    // 添加标签
    handleInputConfirmTag(item) {
      let inputValue = this.inputValue;
      if (inputValue) {
        this.questionList.forEach((v) => {
          if (v.info_type_id == item.info_type_id && v.title == item.title) {
            console.log(v,'456999')
            v.options.push({
              option_id: v.options.length,
              value: inputValue,
            });
          }
        });
      }
      this.inputVisible = false;
      this.inputValue = "";
    },

    // 保存标签
    submitFormAddTag(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let a = 0
          this.dialogueScenario.forEach(v => {
            if (v.id == this.ruleFormAddTag.id) {
              v = ({ ...this.ruleFormAddTag, id: v.id })
              a = 1
            }
          })
          // console.log(this.ruleFormAddTag, valid, a);
          if (a == 0) {
            this.dialogueScenario.push({ ...this.ruleFormAddTag, id: this.dialogueScenario.length })
          }
          this.ruleFormAddTag = {
            type: '',
            title: '',
            placeholder: '',
            dynamicTags: [],
            isPublic: 1
          }
          this.dialogVisible = false
        }
      });
    },
    //保存
    handleSubmit(formName){
      this.$refs[formName].validate((valid,object) => {
          if (valid) {
            let file_ids = []
            this.checkTreeData.map(checkId => {   //循环选中数组获取到子级的数据
              this.treeData.map(tree => {   //循环树型菜单数组
                tree.children.map(item => {
                  item.children.map(childID => {
                    if(childID.id == checkId){
                      file_ids.push(childID.id)
                    }
                  })
                })
              })
            })
            if (!file_ids.length) {
              this.$confirm('你创建的AI智能体尚未关联知识库。请先关联知识库，如知识库内没有内容，请先上传内容。', '系统提示', {
                confirmButtonText: '去上传',
                cancelButtonText: '返回关联',
                type: 'warning'
              }).then(() => {
                this.$router.push('/knowledge/knowledge')
                this.$store.dispatch("app/changeknowledgeLabel", "图片库");
              }).catch(() => {
                       
              });
              // this.$message.warning('当前你未创建任何知识库，请前往创建！')
              return
            }
            const loading = this.$loading({
              lock: true,
              text: 'AI 智能体正在努力学习知识库内容，请稍作等待。',
              spinner: 'el-icon-loading',
              background: 'rgba(0, 0, 0, 0.7)'
            });
            // setTimeout(() => {
              // loading.close();
            // }, 2000);
            let infoQuestions = []
            // console.log(this.checkTreeData)
            // console.log(this.treeData,'树型菜单数据')
            
            this.dialogueScenario.forEach((v, i) => {
              let dynamicTags = []
              if (v.dynamicTags.length != 0) {
                v.dynamicTags.forEach(item => {
                  dynamicTags.push({
                    value: item
                  })
                })
              }
              infoQuestions.push({
                type_id: v.type,
                title: v.title,
                placeholder: v.placeholder,
                info_options: dynamicTags.length == 0 ? [{ value: '' }] : dynamicTags,
                is_required: v.isPublic,
                weight: 0
              })
            })
            let defaultQuestion = [{
              type_id: '438600126748678',
              title: '内容',
              placeholder: '请说出你的问题，我来帮你解答',
              info_options: [{ value: '' }],
              is_required: true,
              weight: 0
            }]

            //处理预制问题
            let preset_questions = this.presetTags.map(item => ({"question_content":item}))

            let requestData = {
              "is_edit": this.localStorageItem?1:0,  //是否编辑0否1是
              "user_id": JSON.parse(localStorage.getItem('userInfo'))['user_id'],  //用户ID
              "group_name": this.ruleForm.fenzu[0].group_name, //分组名称
              "group_order": this.ruleForm.fenzu[0].group_order,     //分组排序
              "agent_type": this.ruleForm.fenlei,   //智能体分类
              "avatar_url": this.ruleForm.pic,   //头像
              "agent_name": this.ruleForm.name,   //智能体名称
              "agent_desc": this.ruleForm.desc,   //智能体描述
              "agent_character": this.ruleForm.chatShezhi,  //智能体性格
              "file_ids": file_ids,   //文件ID列表,树型菜单
              "agent_prompt":[this.ruleForm.tishici].concat(this.cueArr.map(item => item.tishi)), //提示词
              "info_agent":infoQuestions.length != 0 ? infoQuestions : defaultQuestion,
              preset_questions
            }
            if (this.localStorageItem) {
              // console.log('进入编辑状态')
              let obj = {
                agent_id:JSON.parse(this.localStorageItem).agent_id
              }
              requestData = Object.assign(obj,{...requestData})
            }
            createdModel(requestData).then(res => {
              if(res.code == 20000){
                this.createdChatData = res.data
                if (this.localStorageItem) {
                  this.$message.success('编辑成功！')
                }else{
                  this.$message.success('添加成功！')
                }
                loading.close();
                this.$router.go(-1)
              }else{
                loading.close();
                this.$message.error('保存失败')
              }
            })
          } else {
            let str = [];
            for (let key in object) {
              object[key].map((item) => {
                str.push(item.message);
              });
              let dom = this.$refs[Object.keys(object)[0]];
              if (Object.prototype.toString.call(dom) !== "[object Object]") {
                dom = dom[0];
                break;//结束语句并跳出语句，进行下个语句执行
              }
              // console.log(dom,dom.$el)
              // 定位代码
              dom.$el.scrollIntoView({
                block: "center",
                behavior: "smooth",
              });
            }
            // 页面提示未通过校验字段项，并以逗号分隔
          }
        });
      
    },
    //删除自定义标签
    handleDeteleType(item){
      this.typeArray = this.typeArray.filter(child => child.label !== item.label);
      localStorage.setItem('typeArray',this.typeArray)
      this.$set(this.ruleForm,'fenlei','')
      this.$message.success('删除成功')
    }
  },
};
</script>
<style scoped lang="scss">
.domHover{
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
.answerResults {
  margin-top: 50px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.onAnalysis {
  width: 100%;
}
.titlea {
  color: #333;
  text-align: center;
  font-size: 16px;
  font-weight: 500;
  display: flex;
  justify-content: space-between;
}
.replay {
  color: #333;
  font-weight: 400;
  font-size: 16px;
  /* color: #333; */
  line-height: 20px;
  /* 设置字间距 */
  letter-spacing: 1px;
  /* white-space: pre-wrap; */
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
.prompt {
  color: #aab2c8;
  font-size: 14px;
  font-weight: 400;
  margin-top: 10px;
}
.button_list {
  margin-top: 10px;
  display: flex;
  justify-content: space-between;
  width: 100%;
}
.btn_left {
  display: flex;
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

.add {
  cursor: pointer;
  width: 100%;
  height: 30px;
  color: #3396fa;
  text-align: center;
  border-top: 1px solid #ccc;
  font-size: 14px;
  line-height: 30px;
  position: sticky;
  bottom: 0px;
  background-color: #fff;
  opacity: 1;
}
.submitBtu{
  margin: 20px auto;
  cursor: pointer;
  display: flex;
width: 400px;
height: 37px;
justify-content: center;
align-items: center;
flex-shrink: 0;
border-radius: 6px;
background: #1F64FF;
color: var(--Text-text-white, #FFF);
text-align: center;
font-family: "PingFang SC";
font-size: 17px;
font-style: normal;
font-weight: 600;
line-height: 24px; /* 141.176% */
}
.tips{
  color: #B7B9C0;
  font-family: PingFang SC;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 150%; /* 18px */
  margin-bottom: 20px;
}
.shili{
  display: flex;
  align-items: center;
  height: 40px;
  div{
    color: #000;
    text-align: justify;
    font-family: PingFang SC;
    font-style: normal;
    font-weight: 400;
    line-height: 33px; /* 33px */
    font-size: 16px;
  }
  span{
    margin-left: 10px;
    cursor: pointer;
    color: #1F64FF;
    text-align: justify;
    font-family: PingFang SC;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 27px; /* 27px */
  }
}
.addInput-box{
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 10px;
  position: relative;
}
.deleteInput{
  font-size: 14px;
  color: red;
  cursor: pointer;
  position: absolute;
  top: 50%;
  right: -35px;
  transform: translate(0%,-50%);
}
.main {
  width: 100%;
  height: 100%;
  display: flex;
  padding-top: 40px;
  padding-bottom: 30px;
  border-radius: 8px;
  padding-left: 20px;
  background: rgb(241, 242, 245);
  box-sizing: border-box;
  position: relative;
  .go-back {
    position: absolute;
    left: 20px;
    top: 10px;
    cursor: pointer;

    .go_back-item {
      display: flex;
      align-items: center;
      cursor: pointer;
      transition: all 0.2s;
    }
  }
  .left {
    width: calc(60%);
    min-width:500px;
    padding-top: 30px;
    box-sizing: border-box;
    background: #fff;
    height: 100%;
    display: flex;
    justify-content: center;
    overflow-y: auto;
    > div {
      width: 500px;
      .title {
        text-align: center;
        color: #000;
        font-family: PingFang SC;
        font-size: 24px;
        font-style: normal;
        font-weight: 500;
        line-height: 36px; /* 36px */
      }
      .line {
        width: 4px;
        height: 30px;
        border-radius: 10px;
        background: #1f64ff;
        margin-right: 8px;
      }
      .column-title {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 22px;
        > div:first-child {
          display: flex;
          align-items: center;
          div:last-child {
            color: #000;
            text-align: justify;
            font-family: PingFang SC;
            font-size: 22px;
            font-style: normal;
            font-weight: 500;
            line-height: 150%; /* 33px */
          }
        }
        > div:last-child {
          padding: 0px 12px;
          line-height: 30px;
          color: #1f64ff;
          text-align: center;
          font-family: PingFang SC;
          font-size: 17px;
          font-style: normal;
          font-weight: 600;
          border-radius: 6px;
          border: 1px solid #1f64ff;
        }
      }
      .addInput{
        margin-top: 20px;
        .addInput-bottom{
          display: flex;
          align-items: center;
          div:first-child{
            display: flex;
            align-items: center;
            margin-right: 20px;
            cursor: pointer;
            span{
              margin-left: 6px;
              color: #1F64FF;
              font-family: PingFang SC;
              font-size: 14px;
              font-style: normal;
              font-weight: 400;
              line-height: 22px; /* 157.143% */
            }
          }
          div:last-child{
            color: #666;
            font-family: PingFang SC;
            font-size: 12px;
            font-style: normal;
            font-weight: 400;
            line-height: 150%; /* 18px */
          }
        }
      }
    }
    .checkKnowledge{
      width: 500px;
      height: 372px;
      border: 1px solid #EBECF0;
      border-radius: 4px;
      padding: 15px;
      box-sizing: border-box;
      overflow-y: auto;
    }
  }
  .right {
    min-width: 500px;
    width: calc(100% - 60% - 3px);
    background: #fff;
    height: 100%;
    padding-top: 30px;
    box-sizing: border-box;
    overflow-y: auto;
    >img{
      width: 108px;
      height: 108px;
      border-radius: 50%;
      position: relative;
      left: 50%;
      transform: translate(-50%);
    }
    .chat_title{
      margin-top: 12px;
      color: #000;
      text-align: justify;
      font-family: PingFang SC;
      font-size: 20px;
      font-style: normal;
      font-weight: 500;
      line-height: 30px; /* 30px */
      text-align: center;
    }
    .chat_tips{
      color: #666;
      text-align: center;
      font-family: PingFang SC;
      font-size: 12px;
      font-style: normal;
      font-weight: 400;
      line-height: 18px; /* 18px */
    }
    .chat_check{
      display: flex;
      justify-content: center;
      margin-top: 16px;
      >div{
        cursor: pointer;
      }
      >div:nth-child(1){
        border-radius: 4px;
        background: #1F64FF;
        width: 120px;
        height: 32px;
        color: #FFF;
        text-align: center;
        font-family: PingFang SC;
        font-size: 12px;
        font-style: normal;
        font-weight: 400;
        line-height: 18px; /* 18px */
        display: flex;
        align-items: center;
        justify-content: center;
      }
      >div:nth-child(2){
        border-radius: 4px;
        display: flex;
        align-items: center;
        justify-content: center;
        background: #E5EDFF;
        color: #1F64FF;
        text-align: center;
        font-family: PingFang SC;
        font-size: 12px;
        font-style: normal;
        font-weight: 400;
        line-height: 150%; /* 18px */
        height: 32px;
        padding: 0px 8px;
        margin: 0px 12px;
      }
      >div:nth-child(3){
        width: 120px;
        /deep/ .el-input__inner{
          height: 32px;
        }
      }
    }
    .chat_content{
      width: 80%;
      margin: auto;
      margin-top: 30px;
      >div{
        margin-bottom: 15px;
        >div:first-child{
          margin-bottom: 7px;
          color: #333;
          font-family: PingFang SC;
          font-size: 13px;
          font-style: normal;
          font-weight: 400;
          line-height: 150%; /* 19.5px */
          span{
            font-family: PingFang SC;
            font-size: 13px;
            font-style: normal;
            font-weight: 400;
            line-height: 150%;
          }
        }
        
      }
      >div:nth-child(2){
          width: 100%;
          
          >div:last-child{
            padding: 8px 5px;
            box-sizing: border-box;
            border: 1px solid #E5E6EB;
            border-radius: 8px;
          }
        }
    }
    .sendMsg{
      cursor: pointer;
      display: flex;
      width: 208px;
      padding: 7px 15px;
      justify-content: center;
      align-items: center;
      gap: 10px;
      flex-shrink: 0;
      border-radius: 6px;
      background: #1F64FF;
      color: var(--Text-text-white, #FFF);
      text-align: center;
      font-family: PingFang SC;
      font-size: 16px;
      font-style: normal;
      // font-weight: 600;
      line-height: 24px; /* 141.176% */
      margin: auto;
      margin-top: 10px;
    }
  }
}
</style>

<style scoped>
/deep/ .el-upload{
  display: flex;
}
.menter-avatar-uploader /deep/ .el-upload {
  cursor: pointer;
  position: relative;
  width: 100% ;
  height: 90px;
  display: flex;
  justify-content: initial;
  flex-direction: initial;
  align-items: center;
  background: #FFF ;
  border: 0px ;
}

.menter-avatar-uploader .el-upload:hover {
  border-color: #409EFF;
}

.menter-avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  /* // width: 80px;
  // height: 80px;
  // line-height: 80px; */
  text-align: center;
}

.menter-avatar {
  width: 88px;
  height: 88px;
  display: block;
  margin-right: 10px;
}

.upload-btn {
  width: 88px;
  height: 88px;
  display: flex;
  align-items: center;
  background: rgb(242, 243, 245);
}

.upload-btn .btn-mask {
  line-height: 24px;
  margin: auto;
  font-size: 14px;
}

</style>