<template>
  <div class="mine-role">
    <div class="role_btn" v-if="!isSHowChat">
      <div class="role_back-page">
        <div @click="$router.go(-1)">
          <img class="img" src="../../assets/images/right.png" alt="">
          返回
        </div>
        <div class="add_role">
          <el-button icon="el-icon-plus" style="font-size: 14px;padding: 8px 20px;color: #1f64ff;border-color: #1f64ff;" @click="addRoleOrQuestion()">创作</el-button>
        </div>
      </div>
  
      <div class="add_select-role">
        <div class="select_role">
          <div :class="classTitle == 2 ? 'item on' : 'item'" @click="selectRoleList(2)">私有</div>
          <div :class="classTitle == 1 ? 'item on' : 'item'" @click="selectRoleList(1)">公开</div>
          <div :class="classTitle == 4 ? 'item on' : 'item'" @click="selectRoleList(4)">审核通过</div>
          <div :class="classTitle == 5 ? 'item on' : 'item'" @click="selectRoleList(5)">待审核</div>
          <div :class="classTitle == 6 ? 'item on' : 'item'" @click="selectRoleList(6)">驳回</div>
          <div :class="classTitle == 3 ? 'item on' : 'item'" @click="selectRoleList(3)">聊天记录</div>
        </div>
        <div>
          <el-select v-if="classTitle == 3" :disabled="isSHowChat" class="selset-role-hande" v-model="selsectQuestionTemplate" @change="handleQuestionType" placeholder="请选择" style="width: 102px;height: 32px;line-height: 32px;">
            <el-option
              v-for="item in selectAIOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>

          <el-select v-else class="selset-role-hande" :disabled="isSHowChat" v-model="selsectQuestionTemplate" @change="handleQuestionType" placeholder="请选择" style="width: 102px;height: 32px;line-height: 32px;">
            <el-option
              v-for="item in templateType"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </div>
      </div>
    </div>

    <div v-if="isSHowChat" :style="roleItem.character_avatar != '' ? 'width: 90%;margin: 52px 10% 10px 60px;height: calc(100% - 12px);position: absolute;top: -40px;z-index: 100;background-color: #F1F2F5;' : 'width: 90%;margin: 0px 10% 10px 60px;height: calc(100% - 120px);overflow-y: auto;position: absolute;left: 50%;top: 50%;transform: translate(-50%,-50%);'">
      <chat v-if="roleItem.character_avatar != ''" @hidechatspeak="hideChatSpeak" :roleItem="roleItem" :sessionCode="sessionCode"></chat>
      <template-chat v-else @hidechat="hideChat" :item="{
        'question_id': roleItem.question_id,
        'module_id': roleItem.module_id,
        'title': roleItem.assistant_title,
        'content': roleItem.assistant_content,
        'example_question':roleItem.example_question,
        'ontact_qr_code': '',
        'contact_qr_code_desc': '',
        'interest_group_code': '',
        'interest_group_code_desc': '',
        'content_hidden': '',
        'industry_id': '',
        'occupation_id': '',
        'character_avatar': '',
        'sub_occu_id': '',
        'emp_duration_id': '',
        'expertise_level_id': '',
      }"></template-chat>
    </div>

    <!-- 人物列表 -->
    <div class="role_list" v-else-if="classTitle != 3">
      <div class="role_list-itme" @click="addRoleOrQuestion()">
        <div class="item"  style="display: flex;justify-content: center;align-items: center;flex-direction: column;cursor: pointer;color: #1f64ff;">
          <!-- <div style="box-sizing: border-box;display: flex;flex-direction: column;align-items: center;display:inline-block;"> -->
            <i style="font-size: 24px;font-weight: bold;" class="el-icon-plus"></i>
            <div>创作</div>
          <!-- </div> -->
        </div>
      </div>
      <div class="role_list-itme" v-for="(item, i) in roleList" :key="i" @click.stop="Number(item.status) == 1 || Number(item.status) == 3 ? toRoleTalk(item) : ''">
        <div class="item">
          <div style="display: flex;margin-top: 10px;">
            <div class="title_position">
              <img v-if="item.character_avatar != ''" :src="httpUrls.ossUrl + item.character_avatar" alt="" style="width: 50px;height: 50px;">
              <div :class="'title-once_position' + (Math.random() * 4).toFixed(0)"   v-else>{{ item.onceTitle }}</div>
              <!-- <div class="reviews_state reviews_state1" v-if="item.status == 1">审核成功</div> -->
              <div class="reviews_state reviews_state2" v-if="item.status == 0">审核中</div>
              <div class="reviews_state reviews_state3" v-else-if="item.status == 2">已驳回</div>
            </div>
            <div class="title">{{ item.character_name || item.assistant_title }}</div>
          </div>
          <div class="main">{{ item.character_greetings || item.assistant_content }}</div>
        </div>
        <div class="reviews_result">
          <el-popover
            v-if="item.status == 2"
            placement="top-start"
            title="驳回原因"
            width="200"
            trigger="hover"
            :content="item.refuse_reason">
            <img src="../../assets/images/icon_help.png" slot="reference" alt="" style="width: 18px;height: 18px;cursor: pointer;">
          </el-popover>
          <img src="../../assets/images/edit3.png" alt="" style="width: 18px;height: 18px;margin-left: 18px;cursor: pointer;" @click.stop="editRole(item)" v-if="item.status == 3"><!-- 编辑 -->
          <img src="../../assets/images/trash.png" alt="" style="width: 18px;height: 18px;margin-left: 18px;cursor: pointer;" @click.stop="deleteRole(item, i)" v-if="item.status != 1"> <!-- 删除 -->
        </div>
      </div>
      <!-- roleList.length == 0 -->
      <div v-if="false" style="font-size: 24px;text-align: center;font-weight: bold;width: 100%;margin-top: 30px;">暂无数据</div>

    </div>

    <!-- 聊天记录 -->
    <div ref="queryRoleChatList" v-else style="overflow-y: auto;height: calc(100% - 150px);padding-bottom: 10px;margin-top: 50px;">
      <div class="history_record" ref="innerRole">
        <div v-if="roleList.length == 0" style="font-size: 24px;text-align: center;font-weight: bold;width: 100%;margin-top: 30px;">暂无数据</div>
  
        <div v-for="(item, i) in roleList" :key="i" style="background-color: #FFFFFF;display: flex;box-shadow: 0px 4px 14px 0px rgba(51, 51, 51, 0.10);padding: 20px;margin-top: 10px;border-radius: 10px;align-items: center;justify-content: space-between;" @click="continueChat(item)">
            <div style="display: flex;">
              <img :src="httpUrls.ossUrl + item.character_avatar" style="width: 50px;height: 50px;margin-right: 10px;" />
              <div style="line-height: 50px;">{{ item.character_name }}</div>
            </div>
          <img @click.stop="deleteHistoryChat(item.session_code, i)" src="../../assets/images/trash.png" style="height: 20px;cursor: pointer;" alt="">
        </div>
      </div>
    </div>
    
    <el-dialog
      title="创作"
      :visible.sync="addModulesVisible"
      width="500px">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="80px" class="demo-ruleForm">
        <el-form-item label="模块" prop="model">
          <el-select v-model="ruleForm.model" @change="modelChange" placeholder="请选择模块" style="width: 100%;">
            <el-option
              v-for="item in [{value: '1003', label: '人物互动'}, {value: '1001', label: '角色扮演'}, {value: '1000', label: '生活助理'}, {value: 4, label: '工作助理'}]"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <!-- <el-form-item label="行业" prop="isPublic">
          <el-select v-model="industry" placeholder="请选择行业" class="item_select">
            <el-option v-for="item in industryArr" :key="item.industry_id" :label="item.name" :value="item.industry_id">
            </el-option>
          </el-select>
        </el-form-item> -->
        <el-form-item label="职业" v-if="ruleForm.model == 4">
          <el-select v-model="career" placeholder="请选择职业" clearable class="item_select"  style="width: 100%;">
            <el-option v-for="item in careerArr" :key="item.occu_id" :label="item.name" :value="item.occu_id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="类型" v-if="ruleForm.model == 4">
          <el-select v-model="typesOf" placeholder="请选择类型" clearable class="item_select" style="width: 100%;">
            <el-option v-for="item in typesOfArr" :key="item.sub_occu_id" :label="item.name" :value="item.sub_occu_id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="从业时间" v-if="ruleForm.model == 4">
          <el-select v-model="employmentTime" placeholder="请选择从业时间" clearable class="item_select"
          style="width: 100%;">
            <el-option v-for="item in employmentTimeArr" :key="item.emp_duration_id" :label="item.emp_duration_name"
              :value="item.emp_duration_id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="地位" v-if="ruleForm.model == 4">
          <el-select v-model="status" placeholder="请选择地位" clearable class="item_select" style="width: 100%;">
            <el-option v-for="item in statusArr" :key="item.expertise_level_id" :label="item.name"
              :value="item.expertise_level_id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="分类" prop="module">
          <el-select v-model="ruleForm.module" placeholder="请选择分类" style="width: 100%;">
            <el-option v-for="item in moduleList" :key="item.module_id" :label="item.name"
              :value="item.module_id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item style="display: flex;justify-content: flex-end;">
          <el-button @click="addModulesVisible = false">取消</el-button>
          <el-button type="primary" @click="submitForm('ruleForm')">确认</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

    <register ref="Register"></register>
  </div>
</template>

<script>
import {
  expertiseLevel,
  payIndustry,
  payModules,
  occuDuration,
  occupation,
  getQuestion,
  getOneQuestion,
  secOccupation
} from '../../api/prompts'
import { getUserModelsList, deleteUserModels, getUserModelsDetail, roleChatList, ChatDelete, deleteFootprint } from '../../api/chatMG'
import httpUrls from '../../api/requestURL'

import chat from './chat'
import templateChat from './templateChat'
import register from '../register'

export default {
  name: 'mine-role',
  data() {
    return {
      httpUrls,
      userInfo: {},
      isSHowChat: false,
      roleItem: {},
      sessionCode: '',
      page_size: 20,
      page: 1,
      classTitle: 2,
      roleList: [],
      addModulesVisible: false,
      isPublic: 1,
      industryArr: [],
      careerArr: [],
      typesOfArr: [],
      employmentTimeArr: [],
      statusArr: [],
      selsectQuestionTemplate: '5',
      industry: '', // 行业
      career: '', // 职业
      typesOf: '', // 类型
      employmentTime: '', // 从业时间
      status: '', // 地位
      ruleForm: {
        module: '',
        model: '1003', // 模块
        industry: '', // 行业
        career: '', // 职业
        typesOf: '', // 类型
        employmentTime: '', // 从业时间
        status: '', // 地位
      },
      rules: {
        module: [
          { required: true, message: '请选择分类', trigger: 'change' }
        ],
        model: [
          { required: true, message: '请选择模块', trigger: 'change' }
        ],
      },
      isLoading: false,

      moduleList: [],
      containerHeight: '',
      innerHeight: '',
      selectAIOptions: [
        {
          value: "4",
          label: "文心一言",
        },
        {
          value: "5",
          label: "讯飞星火",
        },
        {
          value: "10",
          label: "通义千问",
        },
        {
          value: "12",
          label: "360智脑",
        },
        {
          value: "1000",
          label: "火山云雀",
        },
        {
          value: "1001",
          label: "腾讯混元",
        },
        {
          value: "8",
          label: "ChatGLM",
        },
        // { value: 11, label: '商汤日日新' },
        // { value: 0, label: 'AI35' },
        // { value: 1, label: 'AI40' },
        // { value: 7, label: 'Claude' },
      ],
      templateType: [
        {value: '5', label:  '全部'},
        {value: '1', label: '角色扮演'},
        {value: '2', label: '生活助理'},
        {value: '3', label: '人物互动'},
        {value: '4', label: '工作助理'},
      ]
    }
  },

  watch: {
    // 行业
    industry: {
      deep: true,
      handler() {
        if (this.titlesCLass == 1 && this.industry != '') {
          if (this.createds == '') {
            this.career = ''
            this.careerArr = []
            this.typesOf = ''
            this.typesOfArr = []
            this.employmentTime = ''
            this.employmentTimeArr = []
            this.status = ''
            this.statusArr = []
            this.ruleForm.industry = this.industry
            this.getOccupation('', this.ruleForm.industry)
            if (this.career != '') {
              this.getSecOccupation(this.ruleForm.industry, this.ruleForm.career)
              this.getOccuDuration(this.ruleForm.industry, this.ruleForm.career, this.ruleForm.typesOf)
              this.getExpertiseLevel(this.ruleForm.industry, this.ruleForm.career, this.ruleForm.typesOf, this.ruleForm.employmentTime)
            }
            this.getPayModules('', this.ruleForm.industry, this.ruleForm.career, this.ruleForm.typesOf, this.ruleForm.employmentTime, this.ruleForm.status)
          }
        }
      }
    },
    // 职业
    career: {
      deep: true,
      handler() {
        console.log(this.career);
        if (this.career != '') {
          this.typesOf = ''
          this.typesOfArr = []
          this.employmentTime = ''
          this.employmentTimeArr = []
          this.status = ''
          this.statusArr = []
          this.ruleForm.career = this.career
          this.getSecOccupation(this.ruleForm.industry, this.ruleForm.career)
          if (this.typesOf != '') {
            this.getOccuDuration(this.ruleForm.industry, this.ruleForm.career, this.ruleForm.typesOf)
            this.getExpertiseLevel(this.ruleForm.industry, this.ruleForm.career, this.ruleForm.typesOf, this.ruleForm.employmentTime)
          }
          this.getPayModules('', this.ruleForm.industry, this.ruleForm.career, this.ruleForm.typesOf, this.ruleForm.employmentTime, this.ruleForm.status)
        }
      }
    },
    // 类型
    typesOf: {
      deep: true,
      handler() {
        if (this.typesOf != '') {
          this.employmentTime = ''
          this.employmentTimeArr = []
          this.status = ''
          this.statusArr = []
          this.ruleForm.typesOf = this.typesOf
          this.getOccuDuration(this.ruleForm.industry, this.ruleForm.career, this.ruleForm.typesOf)
          if (this.employmentTime != '') {
            this.getExpertiseLevel(this.ruleForm.industry, this.ruleForm.career, this.ruleForm.typesOf, this.ruleForm.employmentTime)
          }
          this.getPayModules('', this.ruleForm.industry, this.ruleForm.career, this.ruleForm.typesOf, this.ruleForm.employmentTime, this.ruleForm.status)
        }
      }
    },
    // 从业时间
    employmentTime: {
      deep: true,
      handler() {
        if (this.employmentTime != '') {
          this.status = ''
          this.statusArr = []
          this.ruleForm.employmentTime = this.employmentTime
          this.getExpertiseLevel(this.ruleForm.industry, this.ruleForm.career, this.ruleForm.typesOf, this.ruleForm.employmentTime)
          this.getPayModules('', this.ruleForm.industry, this.ruleForm.career, this.ruleForm.typesOf, this.ruleForm.employmentTime, this.ruleForm.status)
        }
      }
    },
    // 地位
    status: {
      deep: true,
      handler() {
        if (this.status != '') {
          this.ruleForm.status = this.status
          this.getPayModules('', this.ruleForm.industry, this.ruleForm.career, this.ruleForm.typesOf, this.ruleForm.employmentTime, this.ruleForm.status)
        }
      }
    }
  },

  components: {
    chat,
    templateChat,
    register
  },

  created() {
    if (this.ruleForm.model == 4) {
      this.getPayIndustry()
      this.getOccupation('', '426270729486406')
    }
    this.getPayModules('', this.ruleForm.model, this.ruleForm.career, this.ruleForm.typesOf, this.ruleForm.employmentTime, this.ruleForm.status, '426299485399558')
    
    this.getUserModels('',0, this.selsectQuestionTemplate)
  },

  mounted() {
    this.userInfo = JSON.parse(localStorage.getItem('userInfo'))
  },

  methods: {
    addRoleOrQuestion() {
      let userInfo = JSON.parse(localStorage.getItem('userInfo'))
      if (userInfo.role == 'guess') {
        this.$refs.Register.registerVisible = true
      }else{
        sessionStorage.setItem('createRoleData', JSON.stringify(this.ruleForm))
        this.$router.push('/createRole/createRole')
      }
    },

    hideChat(bool) {
      this.isSHowChat = false
    },
    // 继续对话
    continueChat(item) {
      console.log(item);
      if (Number(item.chat_type) == 0) {
        localStorage.setItem('session_code', item.session_code)
      } else {
        let sessoCode = 'session_code' + item.chat_type
        localStorage.setItem(sessoCode, item.session_code)
      }
      this.sessionCode = item.session_code
      this.roleItem = item
      // sessionStorage.setItem('createRoleData', JSON.stringify(item))
      this.isSHowChat = true
    },
    hideChatSpeak() {
      this.isSHowChat = false
    },

    // 切换tag
    selectRoleList(type) {
      this.classTitle = type
      this.roleList = []
      this.isSHowChat = false
      if (type == 1) {
        this.isPublic = 1
        this.selsectQuestionTemplate = '5'
        this.getUserModels('',this.isPublic, this.selsectQuestionTemplate)
      } else if (type == 2) {
        this.isPublic = 0
        this.selsectQuestionTemplate = '5'
        this.getUserModels('',this.isPublic, this.selsectQuestionTemplate)
      } else if (type == 3) {
        // 获取对话列表
        this.selsectQuestionTemplate = '8'
        this.page_size = 20
        this.page = 1
        this.getRoleChatList(this.selsectQuestionTemplate)
        this.$nextTick(() => {
          console.log(this.$refs.innerRole.offsetHeight);
          // 容器高度
          this.containerHeight = this.$refs.queryRoleChatList.clientHeight
          // 内容高度
          this.innerHeight = this.$refs.innerRole.offsetHeight
          // 滚动监听
          this.$refs.queryRoleChatList.addEventListener('scroll',this.callBackScroll)
        })
      }else if(type == 4){
        console.log(this.selsectQuestionTemplate,'审核通过')
        this.getUserModels('审核通过',1, 5)
      }else if(type == 5){
        this.getUserModels('待审核',1, 5)

        
      }else if(type == 6){
        this.getUserModels('驳回',1, 5)

      }
    },
    // 滚动回调函数
    callBackScroll(e) {
      if (this.isLoading) return
      this.innerHeight = this.$refs.innerRole.offsetHeight
      let scrollTop = e.target.scrollTop
      // 当滚出去的内容高度加上窗口也就是外部容器的高度大于等于内容高度时发送请求
      if (scrollTop + this.containerHeight >= this.innerHeight) {
        this.page++
        this.getRoleChatList(this.selsectQuestionTemplate)
        console.log('到底了~~');
      }
    },

    // 获取人物聊天列表
    getRoleChatList(e) {
      let val = {
        chat_type: e,
        page_size: this.page_size,
        page: this.page,
        title: '',
      }
      this.isLoading = true
      roleChatList(val).then(res => {
        if (res.code == 20000) {
          res.data.data.forEach(v => {
            v.checkBox = false
          });
          this.roleList = this.roleList.concat(res.data.data);
        } else {
          this.$message.error(res.msg)
        }
        this.isLoading = false
      }).catch(err => {
        this.isLoading = false
        this.$message.error('获取失败！')
      })
    },
    handleQuestionType(e) {
      if (this.classTitle == 3) {
        this.roleList = []
        this.getRoleChatList(e)
      } else {
        this.getUserModels('',this.isPublic, e)
      }
    },

    modelChange(e) {
      this.ruleForm.module = ''
      this.ruleForm.industry = '426270729486406' // 行业
      this.ruleForm.career = '' // 职业
      this.ruleForm.typesOf = '' // 类型
      this.ruleForm.employmentTime = '' // 从业时间
      this.ruleForm.status = '' // 地位
      if (e == 4) {
        this.getPayIndustry()
        this.getOccupation('', '426270729486406')
        this.getPayModules('', '426270729486406', this.ruleForm.career, this.ruleForm.typesOf, this.ruleForm.employmentTime, this.ruleForm.status, '426299485399558')
      } else {
        this.getPayModules('', e, this.ruleForm.career, this.ruleForm.typesOf, this.ruleForm.employmentTime, this.ruleForm.status, '426299485399558')
      }
    },

    // 对话
    toRoleTalk(item) {
      console.log(item,'toRoleTalk');
      this.sessionCode = ''
      this.roleItem = {...item, source: 'mineRole'}
      this.isSHowChat = true
    },

    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$router.push({
            name: '创作',
            params: {data: this.ruleForm}
          })
          sessionStorage.setItem('createRoleData', JSON.stringify(this.ruleForm))
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },

    // 获取行业列表
    getPayIndustry() {
      payIndustry().then(res => {
        setTimeout(() => {
          this.createds = ''
        }, 3000);
        this.industryArr = res.data
      })
    },
    // 获取职业列表
    getOccupation(type, industry) {
      if (type == 'created') {
        industry = '426270729486406'
      }
      let data = { industry_id: industry }
      occupation(data).then(res => {
        if (type == 'created') {
          this.ruleForm.industry = '426270729486406'
        } else if (type == 'mounted') {
          this.ruleForm.industry = industry
        }
        this.careerArr = res.data
      })
    },

    // 获取类型列表
    getSecOccupation(industry, career) {
      let data = {
        industry_id: industry,
      }
      if (career != '') {
        data.occu_id = career
      }
      secOccupation(data).then(res => {
        this.typesOfArr = res.data
      })
    },
    // 获取从业时间列表
    getOccuDuration(industry, career, typesOf) {
      let data = {
        industry_id: industry,
        // occu_id: career,
        // sub_occu_id: typesOf
      }
      if (career != '') {
        data.occu_id = career
      }
      if (typesOf != '') {
        data.sub_occu_id = typesOf
      }
      occuDuration(data).then(res => {
        this.employmentTimeArr = res.data
      })
    },

    // 获取专业水平列表
    getExpertiseLevel(industry, career, typesOf, employmentTime) {
      let data = {
        industry_id: industry,
        // occu_id: career,
        // sub_occu_id: typesOf,
        // emp_duration_id: employmentTime
      }
      if (career != '') {
        data.occu_id = career
      }
      if (typesOf != '') {
        data.sub_occu_id = typesOf
      }
      if (employmentTime != '') {
        data.emp_duration_id = employmentTime
      }
      expertiseLevel(data).then(res => {
        this.statusArr = res.data
      })
    },
    // 操作模块/根据上面的5个下拉列表请求
    getPayModules(type, industry, career, typesOf, employmentTime, status, id = '') {
      // type：是否为默认状态, industry：行业, career：职业, typesOf：类型, employmentTime：从业时间, status：地位, id：模块id
      if (type == 'created') {
        industry = '426270729486406'
      }
      // console.log(industry);
      let data = {
        industry_id: industry,
      }
      if (career != '') {
        data.occu_id = career
      }
      if (typesOf != '') {
        data.sub_occu_id = typesOf
      }
      if (employmentTime != '') {
        data.emp_duration_id = employmentTime
      }
      if (status != '') {
        data.expertise_level_id = status
      }
      payModules(data).then(res => {
        this.moduleList = res.data
        if (res.data != null && res.data.length != 0) {
          this.ruleForm.module = res.data[0].module_id
        } else {
          this.ruleForm.module = ''
        }
      })
    },

    editRole(item) {
      let userInfo = JSON.parse(localStorage.getItem('userInfo'))
      getUserModelsDetail(`user_id=${userInfo.user_id}&question_id=${item.question_id}`).then(res => {
        // console.log(res);
        let data = {
          module: res.data[0].module_id == '0' ? '' : res.data[0].module_id,
          model: res.data[0].industry_id == '0' ? '' : res.data[0].industry_id, // 模块
          industry: '', // 行业
          career: res.data[0].occu_id == '0' ? '' : res.data[0].occu_id, // 职业
          typesOf: res.data[0].sub_occu_id == '0' ? '' : res.data[0].sub_occu_id, // 类型
          employmentTime: res.data[0].emp_duration_id == '0' ? '' : res.data[0].emp_duration_id, // 从业时间
          status: res.data[0].expertise_level_id == '0' ? '' : res.data[0].expertise_level_id, // 地位
          example_question:res.data[0].example_question
        }
        sessionStorage.setItem('createRoleData', JSON.stringify(data))
        sessionStorage.setItem('edit_roles', JSON.stringify(res.data[0]))
        this.$router.push('/createRole/createRole')
      })
    },

    deleteRole(item, i) {
      this.$confirm('是否删除该角色', '系统提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteUserModels({question_id: item.question_id}).then(res => {
          this.getPayModules('', '1003', this.ruleForm.career, this.ruleForm.typesOf, this.ruleForm.employmentTime, this.ruleForm.status, '426299485399558')
          this.roleList.splice(i, 1)
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消'
        });          
      });
    },

    // 获取用户创建问题集列表
    getUserModels(type = '',isPublic, industry_id) {
      console.log(type,'---标识符')
      let userInfo = JSON.parse(localStorage.getItem('userInfo'))
      getUserModelsList(`user_id=${userInfo.user_id}&is_public=${isPublic}&industry_id=${industry_id}`).then(res => {
        // console.log(res);
        res.data.forEach(v => {
          if (v.character_avatar == '') {
            v.onceTitle = this.sliceTitle(v.assistant_title)
          }
        })
        if (type == "审核通过") {
          this.roleList = res.data.filter( (item) => {
            return item.status == 1;
          });
        } else if (type == "待审核") {
          this.roleList = res.data.filter( (item) => {
            return item.status == 0;
          });
        } else if (type == "驳回") {
          this.roleList = res.data.filter( (item) => {
            return item.status == 2;
          });
        } else {
          this.roleList = res.data;
        }
      })
    },

    // 去掉空格
    sliceTitle(title) {
        let tit = title.replace(/\s*/g, '')
        tit = tit.slice(0, 1)
        return tit
    },

    deleteHistoryChat(item, i) {
      ChatDelete({session_codes: JSON.stringify([item])}).then(res => {
        if(res.code == 20000) {
            this.$message.success('删除成功！')
            this.roleList.splice(i, 1)
            deleteFootprint(`type_code=image&eid=${item}`).then(res => {})

        } else if (res.code > 20000 && res.code < 50000) {
          this.$message.error(res.msg)
        } else {
          this.$message.error('网络异常，请重试')
        }
      }).catch(err => {
        this.$message.error('删除失败！')
      })
    },
  }
}
</script>

<style scoped>
.mine-role {
  padding-bottom: 10px;
  height: calc(100% - 10px);
  background-color: #F1F2F5;
  position: relative;
}

.mine-role .role_btn {
  position: sticky;
  top: 53px;
  z-index: 20;
  /* padding-top: 53px; */
  background-color: #F1F2F5;
  margin: 0 10% 10px 60px;
  /* padding-top: 53px; */
  border-bottom: 1px solid rgba(51, 51, 51, 0.10);
  /* box-shadow: 0 5px 5px 0 rgba(0, 0, 0, 0.05); */
}

.role_back-page {
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  margin-left: 10px;
}

.role_back-page .img {
  height: 14px;
  transform: rotateZ(180deg);
  margin-right: 5px;
}

.add_select-role {
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
}

.select_role {
  display: flex;
  line-height: 32px;
}

.select_role .item {
  cursor: pointer;
  padding: 0 30px;
}

.select_role .on {
  color: #1F64FF;
  border-bottom: 2px solid #1F64FF;
}

.role_list {
    /* display: flex;
    justify-content: space-between;
    flex-wrap: wrap; */
    margin: 0 -1.5%;
    margin-top: 50px;
    position: relative;
    height: calc(100% - var(--a));
    overflow-y: auto;
    padding: 0 10% 0 60px;
    display: flex;
    flex-wrap: wrap;
    width: calc(90% - 60px);
}

.role_list-itme {
  width: 22%;
  margin: 20px 1.5%;
  position: relative;
  padding-bottom: 40px;
  cursor: pointer;
  margin-bottom: 0;
}

.role_list .item {
    /* margin: 20px 1.5%; */
    /* position: relative; */
    /* width: calc(22% - 42px); */
    /* cursor: pointer; */
    padding: 15px 20px 20px 20px;
    background: #FFFFFF;
    border: 1px solid #FFFFFF;
    box-shadow: 0px 4px 14px rgba(51, 51, 51, 0.1);
    border-radius: 10px;
    transition: all .2s;
    height: 110px;
}

.title_position {
    width: 50px;
    height: 50px;
    border-radius: 6px;
    background-color: #1F64FF;
    position: relative;
    margin-right: 10px;
    /* margin-right: 20px; */
}

.title-once_position0 {
    /* position: absolute; */
    border-radius: 6px;
    font-size: 20px;
    line-height: 50px;
    text-align: center;
    color: #65D0B6;
    background: rgba(101, 208, 182, 0.20);
    width: 50px;
    height: 50px;
    left: 20px;
    top: -25px;
}

.title-once_position4 {
    /* position: absolute; */
    border-radius: 6px;
    font-size: 20px;
    line-height: 50px;
    text-align: center;
    color: #65D0B6;
    background: rgba(101, 208, 182, 0.20);
    width: 50px;
    height: 50px;
    left: 20px;
    top: -25px;
}

.title-once_position1 {
    /* position: absolute; */
    border-radius: 6px;
    font-size: 20px;
    line-height: 50px;
    text-align: center;
    color: #FF9746;
    background: #FFEADA;
    width: 50px;
    height: 50px;
    left: 20px;
    top: -25px;
}

.title-once_position2 {
    /* position: absolute; */
    border-radius: 6px;
    font-size: 20px;
    line-height: 50px;
    text-align: center;
    color: #5F9BF8;
    background: #DFEBFE;
    width: 50px;
    height: 50px;
    left: 20px;
    top: -25px;
}

.title-once_position3 {
    /* position: absolute; */
    border-radius: 6px;
    font-size: 20px;
    line-height: 50px;
    text-align: center;
    color: #ED6A5D;
    background: #FBE1DF;
    width: 50px;
    height: 50px;
    left: 20px;
    top: -25px;
}

.role_list .item .title {
    color: #333;
    font-size: 18px;
    font-weight: 500;
    line-height: 50px;
    margin-left: 18px;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    width: calc(100% - 68px);
}

.role_list .item .main {
    font-weight: 400;
    font-size: 14px;
    color: #666;
    -webkit-line-clamp: 2;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
    margin-top: 15px;
}

.history_record {
  padding: 0 10% 0 60px;
}

.reviews_state {
  font-size: 12px;
  padding: 2px 0;
  position: absolute;
  left: 50%;
  text-align: center;
  transform: translateX(-50%);
  bottom: -8px;
  width: 100%;
  border-radius: 4px;
  white-space: nowrap;
}

.reviews_state1 {
  background-color: #f0f9eb;
  color: #67C23A;
}

.reviews_state2 {
  background-color: #DDE8FF;
  color: #1F64FF;
}

.reviews_state3 {
  background-color: #FBE1DF;
  color: #ED6A5D;
}

.reviews_result {
  display: flex;
  font-size: 12px;
  position: absolute;
  right: 8px;
  top: 8px;
}
</style>

<style>
.selset-role-hande .el-input .el-input__inner {
  height: 32px;
  padding: 0 28px 0 8px;
}

.selset-role-hande i {
  line-height: 32px;
}
</style>