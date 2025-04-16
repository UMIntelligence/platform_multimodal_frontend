
<template>
  <div
    style="width: 100%;display: flex;height: calc(100%);position: relative;background-color: #F1F2F5;box-sizing: border-box;overflow: hidden;display: flex;align-items:center;">

    <div class="content" v-if="chatShow"
      :style="!isShowRightNav ? 'width: calc(100% - 70px - 18px);margin-left: 88px;' : ''">
      <div class="go-back" style="z-index: 10;">
          <div @click="chatShow = false" class="go_back-item-on">
            <img style="width: 10px;transform: rotateZ(180deg);margin: auto 0;" src="../../assets/images/right.png"
              alt="">
            <span style="margin-left: 8px;">返回</span>
          </div>
        </div>
      <div class="addModel">
        <div class="addModel-top">
          <div>{{ this.talk }}</div>
          <div>我们来聊聊</div>
        </div>

        <div class="addModel-bottom">
          <div>
            <div class="line"></div>
            <div>参与角色<span v-if="totalToken">当前设定算力{{ totalToken }}w</span></div>
          </div>
          <div v-if="!detailRoleData.length"><span v-for="item in roleData" :key="item.role_code">{{ item.role_name
          }}，</span></div>
          <div v-else><span v-for="item in detailRoleData" :key="item.role_code">{{ item.role_name }}，</span></div>
        </div>
      </div>
      <div class="cg-chat-content" id="chatCont" ref="wrap">
        <div class="cg-chat-left" v-if="talk">
          <div class="cg-right cg-user-pic "
            style="display: flex;justify-content:center;align-items: center;background-color: white;">
            <img src="../../assets/images/Frame-logo.jpg" alt="">
          </div>
          <div class="as-cont-left" style="max-width: 625px;">
            <div class="as_text_left">
              <div class="cg-chatbox cg-chatbox-left">
                <div class="left_tip">
                  <Typed @endTyped="endTyped" :typedList="[`今天我们的会话主题是—${talk}`]" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- this.typedIndex >= 1 -->
        <!-- <div class="introduce">
          <div class="cg-chat-left" style="max-width: 45%;min-width: 45%;" v-for="(item, index) in introduceData"
            :key="index">
            <template v-if="typedIndex >= index + 1">
              <div class="cg-right cg-user-pic "
                style="display: flex;justify-content:center;align-items: center;background-color: white;">
                <svg xmlns="http://www.w3.org/2000/svg" style="width: 27px;height: 27px;" width="17" height="17"
                  viewBox="0 0 27 27" fill="none">
                  <rect x="8.33203" y="1.88867" width="17" height="21" rx="1.77778" fill="#BAD4FB" />
                  <g filter="url(#filter0_bi_8495_25588)">
                    <rect x="2.33203" y="1.88867" width="20" height="23" rx="1.77778" fill="#608DFF" />
                  </g>
                  <path d="M2.66797 24.8887H26.668V26.6664H2.66797V24.8887Z" fill="white" />
                  <rect x="7.33203" y="9.88867" width="7" height="1.78" rx="0.89" fill="white" />
                  <rect x="7.33203" y="14.8887" width="5" height="1.78" rx="0.89" fill="white" />
                  <defs>
                    <filter id="filter0_bi_8495_25588" x="-15.4457" y="-15.8891" width="55.5556" height="58.5556"
                      filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                      <feFlood flood-opacity="0" result="BackgroundImageFix" />
                      <feGaussianBlur in="BackgroundImageFix" stdDeviation="8.88889" />
                      <feComposite in2="SourceAlpha" operator="in" result="effect1_backgroundBlur_8495_25588" />
                      <feBlend mode="normal" in="SourceGraphic" in2="effect1_backgroundBlur_8495_25588" result="shape" />
                      <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                        result="hardAlpha" />
                      <feOffset dy="1.77778" />
                      <feGaussianBlur stdDeviation="2.66667" />
                      <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
                      <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.55 0" />
                      <feBlend mode="normal" in2="shape" result="effect2_innerShadow_8495_25588" />
                    </filter>
                  </defs>
                </svg>
              </div>
              <div class="as-cont-left" style="max-width: 100%;">
                <div class="as_text_left">
                  <div class="cg-chatbox cg-chatbox-left">
                    <div class="left_tip">
                      <Typed @endTyped="endTyped" :typedList="[item.introduce]" />
                    </div>
                  </div>
                </div>
              </div>
            </template>

          </div>
        </div> -->
        <!-- 文心一言 -->
        <div v-for="(item, index) in chatYiyanList" :key="index">
          <div>
            <!-- 左侧模板 -->
            <div class="cg-chat-left" v-if="item.role == 'assistant'">
              <el-checkbox v-if="isShowChecked" v-model="item.checked" style="margin-right: 18px;margin-top: 6px;"
                @change="changeSendAnswer(item)"></el-checkbox>
              <div style="display: flex;width: 100%;">
                <div class="cg-right cg-user-pic " style="background-color: white;" v-if="!detailRoleData.length">
                  <img style="width: 40px;height: 40px;border-radius: 50%;"
                    :src='httpUrls.ossUrl + roleData[index].role_logo' alt="">
                  <div style="font-size: 11px;text-align: center;">{{ roleData[index].role_name }}</div>
                </div>
                <div class="cg-right cg-user-pic " style="background-color: white;" v-else>
                  <img style="width: 40px;height: 40px;border-radius: 50%;"
                    :src='httpUrls.ossUrl + detailRoleData[index].role_logo' alt="">
                  <div style="font-size: 11px;text-align: center;">{{ detailRoleData[index].role_name }}</div>
                </div>

                <div class="as-cont-left" style="min-width: 600px;">
                  <!-- 文字模式 -->
                  <div class="as_text_left">
                    <div class="cg-chatbox cg-chatbox-left">
                      <div v-if="t_timeYiyan != null && index == chatYiyanList.length - 1" class="reply markdown-body"
                        :style="!isfinishYiyan && index == chatYiyanList.length - 1 ? 'white-space: pre-wrap;' : ''">
                        {{ item.content }}</div>

                      <div v-else class="reply markdown-body"
                        :style="!isfinishYiyan && index == chatYiyanList.length - 1 ? 'white-space: pre-wrap;' : ''"
                        v-html="(index == chatYiyanList.length - 1 && index != 0 && !isDetailYiyan) ? replyYiyan : item.markedContent">
                      </div>
                      <div class="prompt" v-if="isBtnYiyan">
                        当前内容为AI生成，不做任何决策使用！由此引发的一切后果，需自行承担，请知悉，已通过阿里云内容安全审核
                      </div>
                    </div>
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
                    <img v-if="item.images != null && item.images.length > 0" :src="httpUrls.ossUrl + item.images[0]"
                      alt="" style="width: 300px;cursor: zoom-in;"
                      @click="showImagesVisible = true, chatimageUrl = item.images[0]">
                    <img class="img" src="../../assets/images/copyWrite.png" alt="" @click="copyText(item.content)">
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- 屏蔽词 -->
        <div class="cg-chat-left" v-if="isFoulLanguage">
          <div class="cg-right cg-user-pic "
            style="display: flex;justify-content:center;align-items: center;background-color: white;">
            <svg xmlns="http://www.w3.org/2000/svg" style="width: 27px;height: 27px;" width="17" height="17"
              viewBox="0 0 27 27" fill="none">
              <rect x="8.33203" y="1.88867" width="17" height="21" rx="1.77778" fill="#BAD4FB" />
              <g filter="url(#filter0_bi_8495_25588)">
                <rect x="2.33203" y="1.88867" width="20" height="23" rx="1.77778" fill="#608DFF" />
              </g>
              <path d="M2.66797 24.8887H26.668V26.6664H2.66797V24.8887Z" fill="white" />
              <rect x="7.33203" y="9.88867" width="7" height="1.78" rx="0.89" fill="white" />
              <rect x="7.33203" y="14.8887" width="5" height="1.78" rx="0.89" fill="white" />
              <defs>
                <filter id="filter0_bi_8495_25588" x="-15.4457" y="-15.8891" width="55.5556" height="58.5556"
                  filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                  <feFlood flood-opacity="0" result="BackgroundImageFix" />
                  <feGaussianBlur in="BackgroundImageFix" stdDeviation="8.88889" />
                  <feComposite in2="SourceAlpha" operator="in" result="effect1_backgroundBlur_8495_25588" />
                  <feBlend mode="normal" in="SourceGraphic" in2="effect1_backgroundBlur_8495_25588" result="shape" />
                  <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                    result="hardAlpha" />
                  <feOffset dy="1.77778" />
                  <feGaussianBlur stdDeviation="2.66667" />
                  <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
                  <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.55 0" />
                  <feBlend mode="normal" in2="shape" result="effect2_innerShadow_8495_25588" />
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
      </div>

      <!-- 补充弹窗 -->
      <el-dialog :visible.sync="supplyVisible" width="500px">
        <div class="supply_cont">
          <el-input type="textarea" resize='none' :rows="3" placeholder="请输入您要优化的内容" v-model="sendValue"></el-input>
        </div>

        <span slot="footer" class="chat-dialog-footer" @click="sendMsg('reset')">
          发送
        </span>
      </el-dialog>

      <!-- 注册组件 -->
      <Register ref="Register"></Register>

      <!-- 算力不足提醒 -->

    </div>
    <div class="manyModel" v-else :style="!isShowRightNav ? 'width: calc(100% - 70px - 18px);margin-left: 88px;' : ''">
      <template v-if="!pageStatus">
        <div @click="chatYiyanList.length?chatShow = true:$router.go(-1)" class="go_back-item-on">
            <img style="width: 10px;transform: rotateZ(180deg);margin: auto 0;" src="../../assets/images/right.png"
              alt="">
            <span style="margin-left: 8px;">返回</span>
          </div>
        <div class="manyModel-top">
          <img src="../../assets/images/Frame-logo.jpg" alt="">
          <div>Hi，你想要聊些什么？</div>
        </div>
        <!-- 创建话题 -->
        <div class="createTalk">
          <div class="title">
            <div class="line"></div>
            <div>创建话题</div>
          </div>
          <div class="text">
            <el-input type="textarea" :rows="6" placeholder="请输入你想发布讨论的话题，例如:AI的前景、人工智能的优劣势..." v-model="talk">
            </el-input>
          </div>
        </div>
        <!-- 参与角色 -->
        <div class="addRole">
          <div class="title">
            <div class="line"></div>
            <div style="margin-right: 5px;">参与角色</div>
            <el-tooltip effect="dark" placement="top">
              <div slot="content">
                发言顺序的不同将决定每个角色的发言次序不同。某个角色<br />发言时，其他角色将停止发言，等待该角色发言完毕后，<br />进入下一角色的发言环节，所有角色发言完毕后，该次发言结束。</div>
              <img style="width: 16px;chat_typeheight: 16px;" src="../../assets/images/help-circle.png" alt="">
            </el-tooltip>
          </div>
          <div class="tips">点击下方模型可进入编辑详情，左上角数字代表发言顺序</div>
          <div class="role">
            <div class="role-box" v-for="(item, index) in roleData" :key="item.role_code"
              @click.stop="handleDetailRole(item)">
              <div class="role-top domHover">
                <div class="left-icon">{{ index + 1 }}</div>
                <img class="right-icon domHover"
                  :src='httpUrls.ossUrl + "static/picture/cc04a568-af7c-439e-8e09-f6cd795833bd.png"'
                  @click.stop="handleDeleteRole(item)">
                <img class="role-img" :src='httpUrls.ossUrl + item.role_logo' alt="">
              </div>
              <div class="role-text">{{ item.role_name }}</div>
            </div>
            <div class="role-box domHover" @click="handleCreateRole">
              <div class="role-top">
                <img class="role-img" :src='httpUrls.ossUrl + "static/picture/dd3611fe-0626-4841-9ff8-4e2243211df6.png"'
                  alt="">
              </div>
              <div class="role-text">绑定模型</div>
            </div>
          </div>
        </div>
        <!-- 设置算力 -->
        <div class="setToken">
          <div class="title">
            <div class="line"></div>
            <div style="margin-right: 5px;">设定算力</div>
            <el-tooltip effect="dark" placement="top">
              <div slot="content">
                发言顺序的不同将决定每个角色的发言次序不同。某个角色<br />发言时，其他角色将停止发言，等待该角色发言完毕后，<br />进入下一角色的发言环节，所有角色发言完毕后，该次发言结束。</div>
              <img style="width: 16px;height: 16px;" src="../../assets/images/help-circle.png" alt="">
            </el-tooltip>
          </div>
          <div class="tips">本次互动中3个角色预计投入总算力：20.8w算力/1k token</div>
          <div class="token-input">
            <div>自定义</div>
            <div>
              <el-input v-model="tokenInput" placeholder="请输入算力(单位w)" clearable></el-input>
            </div>
          </div>
          <div class="token-box">
            <div v-for="item in 3" :key="item" class="domHover"
              :style="tokenCheck == item ? 'border-color: #1F64FF;' : ''" @click="tokenCheck = item, tokenInput = ''">
              <div>{{ item }}00w</div>
              <div>算力</div>
            </div>
          </div>
        </div>
        <!-- 开始发言 -->
        <div class="submitTalk domHover" @click="createSubject">开始发言</div>
      </template>
      <template v-else>
        <div class="go-back" style="z-index: 10;">
          <div @click="pageStatus = false" class="go_back-item-on">
            <img style="width: 10px;transform: rotateZ(180deg);margin: auto 0;" src="../../assets/images/right.png"
              alt="">
            <span style="margin-left: 8px;">返回</span>
          </div>
        </div>
        <div class="manyModel-top" v-if="roleStatus == 'edit'"
          :style="pageStatus && roleStatus == 'edit' ? 'margin-top: 35px;' : ''">
          <div>当前角色：{{ roleDetail.role_name }}</div>
        </div>
        <!-- 创建话题 -->
        <div class="createTalk" :style="pageStatus && roleStatus != 'edit' ? 'margin-top: 35px;' : ''">
          <div class="title">
            <div class="line"></div>
            <div style="margin-right: 15px;">{{ roleStatus == 'create' ? '创建' : '修改' }}角色名称</div>
            <el-input style="width: 200px;" v-model="createdRole_name" placeholder="请输入角色名称"></el-input>
          </div>
          <div class="title">
            <div class="line"></div>
            <div>{{ roleStatus == 'create' ? '创建' : '修改' }}当前角色提示词</div>
          </div>
          <div class="text">
            <el-input type="textarea" :rows="6"
              placeholder="给当前角色一个指令，你可以这样填：现在我们在模拟参加一个群聊，其中你扮演的角色是小文，请不要出现关于小文字样的内容，你的回答要简短，在100字以内"
              v-model="roleDetail.covert_content">
            </el-input>
            <div class="text-tips">发言顺序：
              <span v-if="roleStatus == 'create'">第{{ roleData.length + 1 }}位</span>
              <span v-else>第{{ roleData.findIndex(item => item.model == selectRole.model_name) + 1 }}位</span>
            </div>
          </div>
        </div>
        <!-- 参与角色 -->
        <div class="addRole">
          <div class="title">
            <div class="line"></div>
            <div style="margin-right: 5px;">更换角色</div>
            <el-tooltip effect="dark" placement="top">
              <div slot="content">
                发言顺序的不同将决定每个角色的发言次序不同。某个角色<br />发言时，其他角色将停止发言，等待该角色发言完毕后，<br />进入下一角色的发言环节，所有角色发言完毕后，该次发言结束。</div>
              <img style="width: 16px;height: 16px;" src="../../assets/images/help-circle.png" alt="">
            </el-tooltip>
          </div>
          <div class="tips" v-if="selectRole.model">当前选择的是{{ selectRole.model }}，{{ selectRole.consume_points }}w算力/{{
            selectRole.unit }}</div>
          <div class="role" style="width: calc((100px * 5) + (13px * 5));">
            <div class="role-box domHover" v-for="item in modelData" :key="item.model"
              style="width: 100px;margin-right:13px;margin-bottom: 13px;">
              <div class="role-top" style="width: 100%;height: 114px;" @click="selectRole = item"
                :style="selectRole.model_name == item.model_name ? 'border-color:#1F64FF;' : ''">
                <img class="role-img" :src='httpUrls.ossUrl + item.logo' alt=""
                  style="top: 0%;left: 50%;transform: translate(-50%,0%);width:74px;height: 74px;">
                <div class="role-top-text">{{ item.model }}</div>
                <div class="role-top-token">{{ item.consume_points }}w算力/{{ item.unit }}</div>
              </div>
            </div>
          </div>
        </div>
        <div class="submitTalk domHover" @click="confirmRole()">确认{{
          roleStatus ==
          'edit' ? '修改' : '创建' }}</div>
      </template>
    </div>

    <!-- 历史记录 -->
    <right-nav :updataRightList="updataRightList" :sessionRightNavCode="sessionRightNavCode"
      @updatachatlist="updataChatList" @undatename="undateName" :randomStr="randomStr" @resetnewchat="resetNewChat"
      @isshowrightsidbar="isShowRightSidbar"></right-nav>
    <el-dialog title="补充算力提醒" class="tokenDialog" :visible.sync="tokenDialogVisible" width="486px">
      <div>
        <div class="tokenDialog-title">本轮互动算力耗尽，需补充算力可继续对话</div>
        <div class="tokenDialog-cotent">
          <div>
            <div>补充算力</div>
            <div><el-input v-model="tokenInput"></el-input></div>
            <div>w算力</div>
          </div>
          <div>
            <div v-for="item in 3" :key="item" :style="tokenCheck == item ? 'border-color: #1F64FF;' : ''"
              @click="tokenCheck = item, tokenInput = ''">
              <div>{{ item }}00W</div>
              <div>算力</div>
            </div>
          </div>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="tokenDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleAddToken">确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog class="draw_image-class_dark" :visible.sync="showImagesVisible">
      <img :src="httpUrls.ossUrl + chatimageUrl" alt="" style="max-height: 800px;min-height: 500px;cursor: zoom-out;"
        @click="showImagesVisible = false">
    </el-dialog>
    <pay ref="Pay"></pay>
  </div>
</template>

<script>
import httpUrls from '../../api/requestURL'
import { requestFile, getUserFile } from '../../api/document'
import { Line } from 'echarts/lib/util/graphic'
import { creatChat, creatDraw, questionSetRecommend, submitFootprint } from '../../api/chatMG';
import { getModelList, getRoleList, createRole, createSubject, chatList, chatDetail, createChat, detailRole, deleteRole, upDataRole } from '../../api/manyModelChat';
import { recommend, chatLikes, promptsRecommend } from '../../api/prompts'
import TemplateSelect from '../../components/dialog/templateSelect'
import Register from '../../components/register'
import rightNav from '../../components/rightNav'
import Typed from "../../components/typedText";

import { mapGetters } from 'vuex'

import { marked } from 'marked'
import hljs from 'highlight.js'

import pay from '../../components/pay';
import { textDecoder, arr2str } from '../../utils/download'
export default {
  name: 'manyModelChat',
  data() {
    return {
      tokenDialogVisible: false, //算力不足提醒
      totalToken: 0, //总设定算力
      addTokenStatus: false, //补充算力状态
      subjectData: null,   //创建话题后数据
      chatShow: false,   //是否显示问答页面
      //创建话题页面--数据
      pageStatus: false, //显示页面/话题页面
      tokenInput: "",   //自定义token
      tokenCheck: null,   //选择系统token
      talk: "",   //话题
      roleCue: "", //角色提示词 
      roleData: [],  //角色数组
      detailRoleData: [],  //详情角色数组
      createdRole_name:"",    //创建角色
      roleDetail: {//角色详情
        role_name: "",
        chat_type: null,
        model: "",
        role_logo: "",
        covert_content: ""
      },
      roleStatus: 'create',
      roleQK: { //角色清空
        role_name: "",
        chat_type: null,
        model: "",
        role_logo: "",
        covert_content: ""
      },
      modelData: [], //模型数组
      selectRole: {},   //选择角色
      deteleRole: false, //删除状态
      createSubjectList: null,   //创建话题后数据
      chatRole: [],    //对话角色数组
      typedIndex: 0,
      introduceData: [ //自我介绍数组
        {
          url: "",
          value: "文心一言",
          introduce: "大家好！我是文心一言，我热爱推理，价格适中，希望可以给你惊喜。"
        },
        {
          url: "",
          value: "文心一言-4",
          introduce: "各位久等了！我是文心一言-4，我是来自文心家族目前的最强语言模型，在各方面的表现都很优异哦！"
        },
        {
          url: "",
          value: "文心一言Turbo",
          introduce: "哈喽！我是文心一言Turbo，我很有性价比，同时在速度方面有卓越表现。"
        },
        {
          url: "",
          value: "讯飞星火v1.1",
          introduce: "你们好呀！我是讯飞星火v1.1，我的价格不高，但能力也较为平庸哦！"
        },
        {
          url: "",
          value: "讯飞星火v2.1",
          introduce: "各位好啊！我是讯飞星火v2.1，我擅长文章生成，数学解答和编程代码等，希望给你解决学习上的问题！"
        },
        {
          url: "",
          value: "讯飞星火v3.1",
          introduce: "大家好！我是新一代认知智能大模型讯飞3.1，具备语言理解、知识问答、逻辑推理和编写等多种能力。"
        },
        {
          url: "",
          value: "通义千问qwen-plus",
          introduce: "Hello！我是通义千问qwen-plus，我会文案创作、推理、多模态理解和多语言支持哦，也能写小说和邮件，擅长多种能力哦！"
        },
        {
          url: "",
          value: "通义千问qwen-turbo",
          introduce: "大家久等了！我是通义千问qwen-Turbo，一个效率助手，致力于让生活更美好。"
        },
        {
          url: "",
          value: "ChatGLM",
          introduce: "hi！我是ChatGLM，我价格便宜，可以给出富有场景化的发言！"
        },
        {
          url: "",
          value: "360智脑",
          introduce: "你们好！我是360智脑，我比较擅长分析总结和逻辑推理！"
        },
      ],
      httpUrls,
      isSahowUploadPicture: false,
      isShowRightNav: true,
      chatImageFile: '', // 上传图片的地址
      chatimageUrl: '',
      showImagesVisible: false,
      blueprintReadingFile: {
        image: null,
        image_name: null,
        oss_dir: 'static',
        cate: 'AI_chat-picture'
      },
      aiNameList: [
        { value: 4, label: '文心一言', img: '../../assets/img/讯飞星火认知大模型-AI大语言模型-星火大模型-科大讯飞1.png' },
        { value: 5, label: '讯飞星火', img: '../../assets/img/通义1.png' },
        { value: 10, label: '通义千问', img: 'https://s3-alpha-sig.figma.com/img/0c43/4a73/456a956ee0424f9ded03e6c2bd7f2d7c?Expires=1700438400&Signature=N3e7zmoS5QJkFpCF05cVPznLiYQbnUrKk7hxkJKj0JD92SkwYV2tZUl6ui1slQtbaTAjM0BS1-C-KD-c5xXsETtlVNYlbCkvf53X49U8r9t938syzFwE3Q0CN8LCfOnq-7nJvFf~UppCV12MtvDYzSdzJGPxwHwfakISV1anbwDuN4uHF0cty2M-DEdxMZa09lABXlfeeZc7qvCdx0UQyQn1r84TzmfXUqaOKEkx-L4XiDK3eIeAtazga~-RO6BOsKevBNUS2nhC9-8b5ibGYu5wvpe-PIthjFZuYQhdyj6PJoNSgurw078t1C0FIvbglH79UudkwszE61yjIn~a9A__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4' },
        { value: 12, label: '360智脑-2', img: 'https://s3-alpha-sig.figma.com/img/bfe3/eede/3e02200dc2cd325a9abd9a9f4c0fb94f?Expires=1700438400&Signature=TgU4r71Ruhre5FZLzIL-aj7e5u1Fg3BAOcMLmKVwD79MVOMEqW83SbTtvzgU4pQgXkeeyzFiUwvEqZuRJjqZy~1nqJZrfQV332QFHN8djT1fH0QuR64b2wXO1-25TSg1S3ZW9XUCS1ymXPPgLxN0nKSJ8kBtyhEQ1JWUEHTvaKA6kt0n-Ljbls-~8HA1iYre1KEERp68GIKN9HNUIW4Ls1Rb~VTPucukB0ED9TuIIBerVH-8TIhYY0dF1EWtiLgR-TdVVBqXpge06d1ndeL7w9Hc2EvxSVk4Qd64wRLCHPObMWvTVRSxl0BPk23shhASLNqSuMqGVKGOAwUT2ZPKqA__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4' },
        { value: 8, label: 'ChatGLM', img: '../../assets/img/logo3.png' },

        // {value: 11, label: '商汤日日新'},
        // {value: 0, label: 'AI35'},
        // {value: 1, label: 'AI40'},
        // {value: 7, label: 'Claude'},
      ],
      AINameDisabled: false,
      chat_type: 4, // ai35: 0; ai40: 1
      AIname: 4, // ai id
      sendValue: '', // 问题的内容
      oldSendValue: '', // 临时保存上一次的问题
      isShow: false, // 快速提问
      // isPay: true,
      replyYiyan: '', // 实时回答 / 文心一言

      timerYiyan: 0, // 定时器的时间 / 文心一言

      t_timeYiyan: null, // 定时器

      isTimeYiyan: false, // 开启获取中对话框 / 文心一言

      isfinishYiyan: true,// 完成打字效果 / 文心一言

      isBtnYiyan: true, // 防止重新发送

      supplyVisible: false, // 补充对话
      supplyValue: '', // 补充对话的问题
      isDetailYiyan: false, // 显示会话内容 / 40

      qsList: {}, // 热词

      chatYiyanList: [], // 文心一言数据

      isuser: true, //使用次数是否用完

      isShowTemplateSelte: false, // 查询模板
      isShowTemplateYiyan: true, // 热词推荐

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

      controllerYiyan: null, // 用于终止fetch请求 / 文心一言
      controllerXunfei: null, // 用于终止fetch请求 / 讯飞星火
      controllerClaude: null, // 用于终止fetch请求 / 讯飞星火
      controllerChatGLM: null, // 用于终止fetch请求 / 讯飞星火
      controllerTongyi: null, // 用于终止fetch请求 / 讯飞星火
      controllerShangtang: null, // 用于终止fetch请求 / 讯飞星火
      controller360: null, // 用于终止fetch请求 / 讯飞星火

      startNewChatYiyan: false, // 开启新会话文心一言

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
      }
    }
  },

  // 注册组件
  components: {
    Register,
    TemplateSelect,
    rightNav,
    pay,
    Typed
  },
  computed: {
    ...mapGetters(['userInfoData', 'contactService']),
  },

  props: {
    item: {
      type: String,
      default: ''
    }
  },

  watch: {
    tokenInput: {
      deep: true,
      handler() {
        if (this.tokenInput) {
          this.tokenCheck = null;
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
    // 用户信息发生改变，重置页面信息
    userInfoData: {
      deep: true,
      handler() {
        this.randomStr = Math.random()
        this.chatYiyanList = []
        this.queryQuestionSetRecommend()

      }
    },
    isShowassociation: {
      deep: true,
      handler() {
        if (this.isShowassociation && this.association == '') {
          if (this.chat_type == 4) {
            this.isBtnYiyan = false
          }
        }
      }
    },
    association: {
      deep: true,
      handler() {
        if (this.association != '') {
          if (this.chat_type == 4) {
            this.isBtnYiyan = true
          }
        }
        if (Number(this.association) == 2) {
          this.isClickChat = false
          if (this.chat_type == 4) {
            clearInterval(this.t_timeYiyan)
            this.chatYiyanList = []
            this.$store.dispatch('user/changeChatListLength', this.chatYiyanList.length)
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
    chatYiyanList: {
      deep: true,
      handler() {
        if (this.chatYiyanList.length == 0) {
          this.startNewChatYiyan = false;
        } else {
          this.startNewChatYiyan = true;
        }
      }
    },
  },

  created() {
    this.init();
    this.updataRightList = Number(this.chat_type)
    this.loginInfo = JSON.parse(localStorage.getItem("userInfo"));
    this.$root.Bus.$on('selectChat', value => { // 接收点击相应会话标识
      this.chatYiyanList = [];
      this.$store.dispatch('user/changeChatListLength', this.chatYiyanList.length)
      this.getDetail(value);
    })

    this.$root.Bus.$on('delChat', value => { // 清空历史会话
      this.chatYiyanList = [];
      this.$store.dispatch('user/changeChatListLength', this.chatYiyanList.length)
      if (this.chat_type == 4) {
        this.isTimeYiyan = false;
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
    localStorage.setItem('session_code12', '');
    this.queryQuestionSetRecommend()
  },

  mounted() {
    // document.title = httpUrls.name + '是一款人工智能聊天机器-能进行AI绘画-适用于多个场景进行聊天-商务合作-源码定制等'
    // let metaKeywords = document.createElement('meta')
    // metaKeywords.id = 'chat-meta-keywords'
    // metaKeywords.name = 'keywords'
    // metaKeywords.content = httpUrls.name + ',Ai聊天,ChatGpt3.5,ChatGpt4.0中文版,OpenAi,chatgpt国内版,AI智能软件,源码定制,API接口GPT4.0,API接口百度AI绘画'
    // document.getElementsByTagName('head')[0].appendChild(metaKeywords)

    // let metaDescription = document.createElement('meta')
    // metaDescription.id = 'chat-meta-description'
    // metaDescription.name = 'description'
    // metaDescription.content = httpUrls.name + '是人工智能聊天工具,相当于国内版的chatgpt4.0.拥有语言理解能力和文本生成能力,能撰写视频脚本,文案,翻译,代码,写论文邮件,诗词歌赋等任务.职场上升职.写工作报告,企业管理,市场营销等能助你一臂之力.它上知天文下知地理,在任何场景都能和你像人类一样进行交流,互动.'
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
    if (this.$route.params.speakId != undefined && this.$route.params.id != undefined) {
      this.AIname = this.$route.params.id
      this.chat_type = this.$route.params.id
      this.updataChatList(this.$route.params.speakId)
    }
    if (this.$route.query.value) {
      this.AIname = this.$route.query.value

    }

  },

  // 卸载前
  beforeDestroy() {
    // document.getElementById('chat-meta-keywords').remove()
    // document.getElementById('chat-meta-description').remove()
  },

  /**
   * 里面的方法只有被调用才会执行
   */
  methods: {
    //补充算力
    async handleAddToken() {
      let userInfo = JSON.parse(localStorage.getItem('userInfo'));
      let signal = new AbortController();
      let url = `api/chat/group_chat/${this.subjectData.session_code}`;
      let use_integral = this.tokenCheck ? this.tokenCheck + '00' : this.tokenInput;
      let requestData = { use_integral: parseInt(use_integral) }
      let response = await fetch(httpUrls.httpUrl + url, {
        method: "Put",
        headers: {
          "Content-Type": 'application/json',
          'Accept': '*/*',
          'authorization': userInfo.token,
          'role': userInfo.role,
          'source': 'pc'
        },
        body: JSON.stringify(requestData),
        signal: signal.signal
      })
      const reader = response.body.getReader();
      this.totalToken = this.totalToken += parseInt(use_integral)
      const { value, done } = await reader.read();
      let stringStr = arr2str(value).split('\r\n')
      let res = JSON.parse(stringStr)
      console.log(res, '补充算力')
      if (res.code == 20000) {
        this.$message.success('算力补充成功！')
        this.tokenDialogVisible = false;
        this.addTokenStatus = true;   //补充过算力
        this.addTokenCreateChat()
      } else {
        this.$message.error(res.msg)
      }
    },
    //获取模型/角色
    init() {
      getModelList().then(res => {
        let data = res.data;
        data.forEach(item => {
          if (item.model == '通义千问 qwen-Turbo') {
            item.model = '通义千问turbo'
          } else if (item.model == '通义千问 qwen-Plus') {
            item.model = '通义千问plus'
          }
        })
        this.modelData = data;
      })
      this.initRole()
    },
    initRole() {
      let requestData = 'page_size=&page='
      getRoleList(requestData).then(res => {
        let data = this.roleData;
        let arr = [];
        if (this.deleteRole) {
          res.data.data.forEach((item, index) => {
            if (data[index].role_code == item.role_code) {
              arr.push(item)
            }
          })
          this.roleData = arr;
        } else {
          this.roleData = res.data.data;
        }
      })
    },
    //获取角色详情
    handleDetailRole(val) {
      // this.pageStatus = true;
      detailRole(val.role_code).then(res => {
        this.pageStatus = true;
        this.roleStatus = 'edit';
        this.roleDetail = Object.assign({ ...this.roleDetail }, res.data);
        let data = res.data;
        let obj = {
          role_name: data.role_name,
          chat_type: data.chat_type,
          model: "",
          model_name: data.model,
          role_logo: data.role_logo,
          consume_points: "",
          unit: ""
        }
        this.modelData.forEach(item => {
          if (item.model_name == data.model) {
            obj.model = item.model;
            obj.consume_points = item.consume_points;
            obj.unit = item.unit;
          }
        })
        this.createdRole_name = data.role_name
        this.selectRole = obj;
        console.log(obj)
      })
    },
    //角色创建
    handleCreateRole() {
      this.roleStatus = 'create'
      this.pageStatus = true;
    },
    //角色确认创建/修改
    async confirmRole() {
      let role = this.selectRole;
      if (!role.chat_type) {
        this.$message.error('请选择角色！')
        return
      }
      let requestData = {
        "role_name": this.createdRole_name?this.createdRole_name:role.model,        //# 角色名称
        "chat_type": role.chat_type,    //# 对话类型
        "model": role.model_name,        //# 对话模型
        "role_logo": role.logo,    //# 角色头像
        "covert_content": this.roleDetail.covert_content
      }
      if (this.roleStatus == 'edit') {
        let signal = new AbortController();
        let userInfo = JSON.parse(localStorage.getItem('userInfo'))
        let url = `api/chat/chat_role_view/${this.roleDetail.role_code}`
        let response = await fetch(httpUrls.httpUrl + url, {
          method: "Put",
          headers: {
            "Content-Type": 'application/json',
            'Accept': '*/*',
            'authorization': userInfo.token,
            'role': userInfo.role,
            'source': 'pc'
          },
          body: JSON.stringify(requestData),
          signal: signal.signal
        })
        const reader = response.body.getReader();
        const { value, done } = await reader.read();
        let stringStr = arr2str(value).split('\r\n')
        let res = JSON.parse(stringStr)
        if (res.code == 20000) {
          this.pageStatus = false;
          this.$message.success('角色修改成功！')
          this.initRole()
        } else {
          this.$message.error(res.msg)
        }
      } else {
        createRole(requestData).then(res => {
          if (res.code == 20000) {
            this.pageStatus = false;
            this.$message.success('角色创建成功！')
            this.initRole()
          } else {
            this.$message.error(res.msg)
          }
        })
      }
    },
    //角色删除
    handleDeleteRole(val) {
      let data = this.roleData;   //角色数组
      this.deleteRole = true;
      let arr = [];
      data.forEach(item => {
        if (val.role_code != item.role_code) {
          arr.push(item)
        }
      })
      this.roleData = arr;
    },
    //创建话题
    createSubject() {
      if (!this.talk) {
        this.$message.error('请先创建一个话题！')
        return
      }
      if (this.talk.length > 1024) {
        this.$message.error('抱歉，话题的字数不能大于1024...')
        return
      }
      if (!this.tokenCheck && !this.tokenInput) {
        this.$message.error('请设定你的预算算力！')
        return
      }
      // 创建请求参数
      let model_list = [];
      this.roleData.forEach((item, index) => {
        let obj = {
          role_code: item.role_code,
          sort_no: index + 1
        }
        model_list.push(obj)
      })
      let requestData = {
        total_integral: this.tokenCheck ? this.tokenCheck + '00' : this.tokenInput,  //设定的算力
        subject: this.talk,  //话题
        model_list,  //角色列表  
      }
      this.chatYiyanList = []
      createSubject(requestData).then(res => {
        if (res.code == 20000) {
          this.subjectData = res.data;
          this.totalToken = this.totalToken += parseInt(requestData.total_integral)
          this.createChat()
        }
      })
    },
    //发起群聊
    async createChat() {
      let arr = this.subjectData;
      let index = 0;
      for (let item of arr.model_list) {
        let continueOuterLoop = true;   //是否补充算力标识符/用于退出当前循环执行下一次
        if (this.addTokenStatus) {
          this.chatYiyanList.forEach((val, i) => {
            if (val.content.length > 0) {
              console.log(this.chatYiyanList, i)
              continueOuterLoop = false;
              index = i + 1
              return
            }
          })
        }
        if (!continueOuterLoop) {
          console.log('跳过当前循环')
          continue;
        }
        this.chatYiyanList.push({ //新构造一个对话内容
          'session_code': '',
          'create_time': '',
          'chat_group_code': '',
          'finish_reason': '',
          'role': '',
          'content': '',
          'help': false, // 点赞
          'stepOn': false, // 点踩
          timer: false,
          chat_type: item.chat_type
        });
        let userInfo = JSON.parse(localStorage.getItem('userInfo'))
        let requestData = {
          "chat_type": item.chat_type,
          "model": item.model,
          'group_role_code': item.group_role_code,
          'session_code': arr.session_code,
          msg_list: [{ role: 'user', content: this.talk, covert_content: item.covert_content }]
        };
        let signal = new AbortController();
        let url = 'api/chat/async_group_chat_completion'
        let response = await fetch(httpUrls.httpUrl + url, {
          method: "POST",
          headers: {
            "Content-Type": 'application/json',
            'Accept': '*/*',
            'authorization': userInfo.token,
            'role': userInfo.role,
            'source': 'pc'
          },
          body: JSON.stringify(requestData),
          signal: signal.signal
        })
        const reader = response.body.getReader();
        this.chatShow = true;
        while (true) {
          const { value, done } = await reader.read();
          if (done) {
            break;
          }
          if (value) {
            let stringStr = arr2str(value)
            let chatArr = stringStr.split('\r\n');
            chatArr.forEach((val) => {
              // console.log(index,'循环次数')
              if (val != '') {
                let res = JSON.parse(val);
                this.talkMsgList(res, index)
                return;
              }
            })
          }
        }
        index++
      }
    },
    //补充算力后发起群聊
    async addTokenCreateChat() {
      let arr = this.subjectData;
      let modelList = [];
      arr.model_list.forEach((item, i) => {
        if (!this.chatYiyanList[i].content) {
          modelList.push(arr.model_list[i])
        }
      });
      let index = arr.model_list.length - modelList.length;

      for (let item of modelList) {
        let userInfo = JSON.parse(localStorage.getItem('userInfo'))
        let requestData = {
          "chat_type": item.chat_type,
          "model": item.model,
          'group_role_code': item.group_role_code,
          'session_code': arr.session_code,
          msg_list: [{ role: 'user', content: this.talk, covert_content: item.covert_content }]
        };
        let signal = new AbortController();
        let url = 'api/chat/async_group_chat_completion'
        let response = await fetch(httpUrls.httpUrl + url, {
          method: "POST",
          headers: {
            "Content-Type": 'application/json',
            'Accept': '*/*',
            'authorization': userInfo.token,
            'role': userInfo.role,
            'source': 'pc'
          },
          body: JSON.stringify(requestData),
          signal: signal.signal
        })
        console.log(requestData, '请求参数')
        const reader = response.body.getReader();
        console.log(index, '补充后index')

        this.chatShow = true;
        while (true) {
          const { value, done } = await reader.read();
          if (done) {
            console.log(this.chatYiyanList, 'chat数组')
            break;
          }
          if (value) {
            let stringStr = arr2str(value)
            let chatArr = stringStr.split('\r\n');
            chatArr.forEach((val) => {
              if (val != '') {
                let res = JSON.parse(val);
                this.talkMsgList(res, index)
                return;
              }
            })
          }
        }
        index++
      }
    },
    endTyped(val) {
      this.typedIndex++;
    },
    isShowRightSidbar(bool) {
      console.log(bool)
      this.isShowRightNav = bool
    },
    undateName(aiId) {
      this.AIname = aiId
    },
    updataChatList(code) {
      this.isuser = true
      this.isShowassociation = false
      this.isShowChecked = false

      this.chatYiyanList.forEach(v => {
        v.checked = false
      })

      this.sendValue = ''
      this.association = ''
      this.isClickChat = true
      this.chatContScroll = ''
      if (this.chat_type == 4) {
        this.isShowTemplateYiyan = false
        if (!this.isfinishYiyan) {
          clearInterval(this.t_timeYiyan)
          this.isfinishYiyan = true
          this.isBtnYiyan = true
          try {
            this.controllerYiyan.abort()
          } catch (error) { }
        }
      }
      this.getDetail(code)
    },

    // 获取会话详情
    getDetail(code) {
      console.log(code, '进入会话详情')
      if (this.chat_type == 4) {
        this.isDetailYiyan = true;
        this.isTimeYiyan = false;
        this.isfinishYiyan = true
        this.chatYiyanList = []
        this.isShowTemplateYiyan = false
      }
      this.isFoulLanguage = false
      this.ordeAIList = []
      const renderer = new marked.Renderer();
      // 重写代码块渲染方法，使用highlight.js进行代码高亮
      renderer.code = (code, language) => {
        const validLanguage = hljs.getLanguage(language) ? language : 'plaintext';
        const highlightedCode = hljs.highlight(validLanguage, code).value;
        return `<pre><code class="hljs ${validLanguage}">${highlightedCode}</code></pre>`;
      };
      //获取会话详情
      chatDetail(code).then(res => {
        if (res.code == 20000) {
          let arr = res.data;
          let roleData = []
          arr.forEach((item, index) => {
            if (item.role == 'user') {
              this.talk = item.content;
            }
            if (item.role == 'assistant') {
              let obj = {
                role_name: item.role_name,
                role_code: item.role_code,
                role_logo: item.role_logo,
              }
              roleData.push(obj)
              localStorage.setItem('session_code4', code);
              localStorage.setItem('chat_group_code4', item.chat_group_code);
              this.chatYiyanList.push({
                ...item,
                help: item.is_likes == 1 ? true : false,
                stepOn: item.is_likes == 2 ? true : false,
                markedContent: marked(item.content, { renderer }),
                id: this.chatYiyanList.length,
                timer: false
              })
              this.$store.dispatch('user/changeChatListLength', this.chatYiyanList.length)
            }

          })
          this.detailRoleData = roleData

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
          this.chatShow = true;
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
      if (this.chat_type == 4) {
        if (!this.isfinishYiyan) {
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
      this.chatYiyanList = [];
      this.chatShow = false;
      this.isShowTemplateYiyan = true;
      this.$store.dispatch('user/changeChatListLength', 0)
      localStorage.setItem('session_code4', '')
      localStorage.setItem('chat_group_code4', '')
      this.isuser = true
      this.endController('', false) // 终止回答
      this.randomStr = Math.random()
      this.isShowChecked = false
      this.isShowassociation = false
      this.isClickChat = false
      this.msgCode = ''
      if (aiId == 4) {
        this.isTimeYiyan = false;
      }
      this.sendValue = ''
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
      if (this.chat_type == 4) {
        if (!this.isfinishYiyan) {
          this.$message('当前问题还没回答完毕，请稍后再提问')
          return
        }
      }

      if (this.chat_type == 4) {
        this.sendValue = this.chatYiyanList[this.chatYiyanList.length - 2].content
        this.chatYiyanList.splice(this.chatYiyanList.length - 2, 2)
      }
      this.endController('', false)
      this.sendMsg('true')
    },

    // 终止回答
    endController(code, resetChat = true) {
      if (Number(this.chat_type) == 4) {
        this.isBtnYiyan = true
        this.isfinishYiyan = true
        this.isTimeYiyan = false
        try {
          this.controllerYiyan.abort()
        } catch (error) { }
        clearInterval(this.t_timeYiyan);
      }

      this.sessionRightNavCode = code
      if (resetChat) {
        this.chatYiyanList[this.chatYiyanList.length - 1].timer = this.timerYiyan
      }
    },

    // ai返回的数据处理
    talkMsgList(val, index) {
      /**
       * 35
       */
      let res = val;
      this.msgCode = res.msg_code
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
          if (this.chat_type == 4) {
            clearInterval(this.t_timeYiyan)
            this.t_timeYiyan = null
            this.isfinishYiyan = true;
            this.isTimeYiyan = false
            this.isBtnYiyan = true
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


      /**
       * 文心一言
       */
      // if (res.chat_type == "4" && !this.isfinishYiyan) {
      setTimeout(() => {
        this.isTimeYiyan = false;
        if (res != '' && res.content != null) {
          let content = this.chatYiyanList[index].content
          if (this.chatYiyanList[index].chat_type == 10) {
            // this.chatYiyanList[index].content = res.content;
            this.$set(this.chatYiyanList[index],'content',res.content)
            
            // this.chatYiyanList[index].markedContent = res.content;
            this.$set(this.chatYiyanList[index],'markedContent',res.content)

            this.replyYiyan = res.content;
          } else {
            // this.chatYiyanList[index].content = content + res.content;
            this.$set(this.chatYiyanList[index],'content',content + res.content)

            // this.chatYiyanList[index].markedContent = content + res.content;
            this.$set(this.chatYiyanList[index],'markedContent',content + res.content)
            this.replyYiyan = this.chatYiyanList[index].content + res.content;
          }
          // 定位到聊天最底部
          console.log(this.chatYiyanList[index].markedContent,'---markedContent')
          this.toBottom();
        }
        if (res.session_code != '' && res.content != null) {
          this.chatYiyanList[index].session_code = res.session_code;
          // this.chatYiyanList[index].session_code = res.session_code;
          localStorage.setItem('session_code4', res.session_code);
        }
        if (res.create_time != '' && res.create_time != null) {
          // this.chatYiyanList[this.chatYiyanList.length - 1].create_time = res.create_time
        }
        if (res.chat_group_code != '' && res.chat_group_code != null) {
          this.chatYiyanList[index].chat_group_code = res.chat_group_code;
          this.chatYiyanList[index].chat_group_code = res.chat_group_code;
          localStorage.setItem('chat_group_code4', res.chat_group_code);
        }
        // 对话完成
        if (res.finish_reason) {
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
          this.chatYiyanList[index].completion_tokens = res.completion_tokens
          this.chatYiyanList[index].prompt_tokens = res.prompt_tokens
          this.chatYiyanList[index].integral = res.integral
          this.chatYiyanList[index].total_tokens = res.total_tokens


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
        }
        if (res.finish_reason) {
          setTimeout(() => {
            this.sessionRightNavCode = res.session_code;
          }, 2000)
        }
        //群聊完毕
        if(res.finish_reason == "stop" && index == this.chatYiyanList.length - 1){
          console.log('群聊完毕')
        }
        if (res.role != '' && res.role != null) {
          this.chatYiyanList[index].role = res.role;
        }
      }, 2000)
      // }

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
      if (num == 5) { // GPT40
        for (let i = 0; i < this.chatYiyanList.length; i++) {
          if (this.chatYiyanList[i].id == item.id && this.chatYiyanList[i].session_code == item.session_code && this.chatYiyanList[i].chat_group_code == item.chat_group_code) {
            this.chatYiyanList[i].help = false
            this.chatYiyanList[i].stepOn = false
            this.chatYiyanList[i].help = bool
            this.chatYiyanList[i].is_likes = bool ? 1 : 0
          }
        }
      } else if (num == 6) { // GPT40
        for (let i = 0; i < this.chatYiyanList.length; i++) {
          if (this.chatYiyanList[i].id == item.id && this.chatYiyanList[i].session_code == item.session_code && this.chatYiyanList[i].chat_group_code == item.chat_group_code) {
            this.chatYiyanList[i].help = false
            this.chatYiyanList[i].stepOn = false
            this.chatYiyanList[i].stepOn = bool
            this.chatYiyanList[i].is_likes = bool ? 2 : 0
          }
        }
      }
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
      if (this.chat_type == 4) {
        this.isBtnYiyan = true
        this.isTimeYiyan = false
        clearInterval(this.t_timeYiyan)
        this.t_timeYiyan = null
        this.isfinishYiyan = true; // 完成打字效果
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
          this.tokenDialogVisible = true;
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

<style scoped lang="scss">
.go-back {
  cursor: pointer;
  position: absolute;
  // left: 56px;
  // top: 50px;
}

.go_back-item-on {
  display: flex;
  transition: all .2s;
}

.tokenDialog /deep/ .el-dialog__header {
  border-bottom: 1px solid #ECEFF2;
}

.tokenDialog /deep/ .el-dialog__body {
  padding-top: 20px;
}

.tokenDialog-title {
  color: #545454;
  font-family: PingFang SC;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  margin-bottom: 16px;
}

.tokenDialog-cotent {
  color: #545454;
  font-family: PingFang SC;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
}

.tokenDialog-cotent>div {
  display: flex;
  align-items: center;
}

.tokenDialog-cotent>div:first-child>div:nth-child(2) {
  width: 102px;
  margin-left: 44px;
  margin-right: 8px;
}

.tokenDialog-cotent>div:last-child {
  margin-top: 20px;
}

.tokenDialog-cotent>div:last-child>div {
  width: 76px;
  height: 60px;
  border-radius: 4px;
  border: 1px solid #B8B5B5;
  margin-right: 11px;
}

.tokenDialog-cotent>div:last-child>div:hover {
  cursor: pointer;
}

.tokenDialog-cotent>div:last-child>div div:first-child {
  color: #1F64FF;
  font-family: DIN Alternate;
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
  line-height: 150%;
  text-align: center;
  margin-top: 5px;
}

.tokenDialog-cotent>div:last-child>div div:last-child {
  color: #999;
  text-align: justify;
  font-family: PingFang SC;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 150%;
  text-align: center;
}

.manyModel {
  width: calc(100% - 258px - 18px);
  height: calc(100% - 32px);
  margin-left: 258px;
  background-color: white;
  // transition: width 1s all;
  border-radius: 8px;
  padding: 16px;
  box-sizing: border-box;
  overflow-y: auto;
  position: relative;

  .domHover {
    cursor: pointer;
  }

  .title {
    display: flex;
    align-items: center;
    // margin-bottom: 12px;
    color: #393E45;
    font-family: PingFang SC;
    font-size: 16px;
    font-style: normal;
    font-weight: 600;
    line-height: 150%;
    margin-bottom: 2px;
    /* 24px */
  }

  .tips {
    color: #B7B9C0;
    font-family: PingFang SC;
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    line-height: 150%;
    margin-bottom: 16px;
  }

  .line {
    width: 3px;
    height: 16px;
    background: #1F64FF;
    margin-right: 10px;
  }

  .manyModel-top {
    display: flex;
    align-items: center;
    color: #242F49;
    font-family: PingFang SC;
    font-size: 20px;
    font-style: normal;
    font-weight: 500;
    line-height: 150%;
    margin-bottom: 17px;

    /* 30px */
    img {
      margin-right: 6px;
      width: 24px;
      height: 19.439px;
    }
  }

  .text {
    width: 660px;
    margin-bottom: 20px;

    .text-tips {
      margin-top: 10px;
      color: #393E45;
      font-family: PingFang SC;
      font-size: 14px;
      font-style: normal;
      font-weight: 400;
      line-height: 150%;

      span {
        color: #393E45;
        font-family: PingFang SC;
        font-size: 14px;
        font-style: normal;
        font-weight: 500;
        line-height: 150%;
      }
    }
  }

  // .el-textarea {
  //   border: 0px !important;
  // }
  // /deep/ .el-textarea__inner {
  //   border: 0px !important;
  // }

  .createTalk {
    .title {
      display: flex;
      align-items: center;
      margin-bottom: 12px;

      div:last-child {
        color: #393E45;
        font-family: PingFang SC;
        font-size: 16px;
        font-style: normal;
        font-weight: 600;
        line-height: 150%;
        /* 24px */
      }
    }
  }

  .addRole {
    .role {
      width: calc((80px * 5) + (16px * 5));
      display: flex;
      flex-wrap: wrap;

      .role-box {
        width: 80px;
        margin-right: 16px;
        margin-bottom: 13px;

        .role-top {
          width: 80px;
          height: 80px;
          box-sizing: border-box;
          border-radius: 7.111px;
          border: 1px solid #DBDBDB;
          background: #FFF;
          position: relative;

          .left-icon {
            width: 24px;
            height: 24px;
            line-height: 24px;
            position: absolute;
            top: 4px;
            left: 4px;
            background: #1F64FF;
            color: white;
            font-family: PingFang SC;
            font-size: 13px;
            font-style: normal;
            font-weight: 500;
            border-radius: 50%;
            text-align: center;
            /* 19.5px */
          }

          .right-icon {
            position: absolute;
            top: -3px;
            right: -3px;
          }

          .role-img {
            width: 45px;
            height: 45px;
            border-radius: 50%;
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
          }

          .role-top-text {
            color: #000;
            font-family: PingFang SC;
            font-size: 12px;
            font-style: normal;
            font-weight: 400;
            line-height: 150%;
            text-align: center;
            margin-top: 70px;
            /* 18px */
          }

          .role-top-token {
            color: #999;
            font-family: PingFang SC;
            font-size: 10px;
            font-style: normal;
            font-weight: 400;
            line-height: 150%;
            text-align: center;
            /* 15px */
          }
        }

        .role-text {
          margin-top: 8px;
          color: #000;
          font-family: PingFang SC;
          font-size: 12px;
          font-style: normal;
          font-weight: 400;
          line-height: 150%;
          /* 18px */
          text-align: center;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
      }
    }
  }

  .setToken {
    margin-top: 7px;

    .token-input {
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 326px;
      height: 58px;
      border-radius: 8.32px;
      border: 1.5px solid #E8EAEC;
      background: #FFF;
      margin: 12px 0px;
      padding: 18px 24px;
      box-sizing: border-box;

      >div:first-child {
        color: #222;
        text-align: center;
        font-family: PingFang SC;
        font-size: 14px;
        font-style: normal;
        font-weight: 400;
        line-height: 150%;
        /* 21px */
      }

      >div:last-child {
        width: 60%;

        /deep/ .el-input__inner {
          border: 0px;
        }
      }
    }

    .token-box {
      display: flex;

      >div {
        width: 100px;
        height: 100px;
        flex-shrink: 0;
        border-radius: 8.32px;
        border: 1.04px solid #E8EAEC;
        background: #FFF;
        margin-right: 13px;
        padding: 24px 0px;
        box-sizing: border-box;
        color: #1F64FF;
        font-family: DIN Alternate;
        font-size: 22px;
        font-style: normal;
        font-weight: 700;
        line-height: 150%;
        text-align: center;

        /* 33px */
        div:last-child {
          color: #999;
          font-family: PingFang SC;
          font-size: 12px;
          font-style: normal;
          font-weight: 400;
          line-height: 150%;
          /* 18px */
        }
      }
    }
  }

  .submitTalk {
    width: 380px;
    line-height: 48px;
    text-align: center;
    border-radius: 6px;
    background: #1F64FF;
    color: white;
    box-shadow: 0px 2px 6px 0px rgba(98, 98, 98, 0.10);
    font-family: PingFang SC;
    font-size: 18px;
    font-style: normal;
    font-weight: 500;
    letter-spacing: 0.18px;
    position: relative;
    left: 330px;
    transform: translate(-190px);
    margin-top: 30px;
  }
}
</style>

<style scoped>
.el-textarea__inner {
  height: 100px !important;
}

.button-new-tag {
  margin-left: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}

.content .addModel {
  padding: 0px 60px;
  box-sizing: border-box;
  margin-top: 45px;
  margin-bottom: 4px;
}

.content .addModel-top {
  margin-bottom: 24px;
}

.content .addModel-top>div:first-child {
  color: #242F49;
  font-family: PingFang SC;
  font-size: 20px;
  font-style: normal;
  font-weight: 500;
  line-height: 150%;
  /* 30px */
}

.content .addModel-top>div:last-child {
  color: #3F3F3F;
  font-family: PingFang SC;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 150%;
  /* 21px */
}

.content .addModel-bottom .line {
  width: 3px;
  height: 16px;
  background: #1F64FF;
  margin-right: 10px;
}

.content .addModel-bottom>div {
  display: flex;
  align-items: center;
}

.content .addModel-bottom>div:first-child div:last-child {
  color: #393E45;
  font-family: PingFang SC;
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: 150%;
  /* 24px */
}

.content .addModel-bottom>div:last-child {
  color: #393E45;
  font-family: PingFang SC;
  font-size: 13px;
  font-style: normal;
  font-weight: 400;
  line-height: 150%;
  /* 19.5px */
}

.content .addModel-bottom span {
  color: #999;
  font-family: PingFang SC;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 150%;
  margin-left: 5px;
  /* 18px */
}

.introduce {
  width: 100%;
  margin: 20px 0px;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}

.model-price {
  font-size: 12px;
  margin-top: 10px;
}

.bigModel {
  width: 76px;
  height: 100%;
  background-color: #F1F2F5;
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
  margin-left: 242px;
  transition: width .2s;
  position: relative;
  padding-top: 20px;
  padding-left: 20px;
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
  border: 1px solid #FFFFFF;
  display: inline-block;
  background: #FFFFFF;
  border-radius: 8px;
  color: #333;
  /* width: 100%; */
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

.model_list .ai-btn-list {
  border: none;
  border-radius: 0;
  font-size: 14px;
  padding: 8px 12px;
  background-color: #FFFFFF;
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