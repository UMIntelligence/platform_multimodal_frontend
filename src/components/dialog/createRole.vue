<template>
  <div class="create-role">
    <go-back></go-back>
    <div style="min-width: 470px;">
      <el-form v-if="roleType != '编辑'" label-width="100px" :model="ruleForm" :rules="rules" ref="ruleForm"
        class="demo-ruleForm">
        <el-form-item label="模块" prop="model">
          <el-select v-model="ruleForm.model" @change="modelChange" placeholder="请选择模块" style="width: 100%;">
            <!-- , {value: 4, label: '工作助理'} -->
            <el-option
              v-for="item in [{ value: '1003', label: '人物互动' }, { value: '1001', label: '角色扮演' }, { value: '1000', label: '生活助理' }]"
              :key="item.value" :label="item.label" :value="item.value">
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
          <el-select v-model="career" placeholder="请选择职业" clearable class="item_select" style="width: 100%;">
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
          <el-select v-model="employmentTime" placeholder="请选择从业时间" clearable class="item_select" style="width: 100%;">
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
            <el-option v-for="item in moduleList" :key="item.module_id" :label="item.name" :value="item.module_id">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <!-- 
        创建人物
       -->
      <div v-if="Number(data.model) == '1003'">
        <el-form :model="ruleFormRole" :rules="rulesRole" ref="ruleFormRole" label-width="100px" class="demo-ruleForm">
          <el-form-item label="人物头像" prop="picture">
            <el-upload :action="httpUrls.loginUrl + 'api/user/oss_upload'" accept=".png,.jpg,.jpeg"
              :headers="headerData"
              :on-change="handleUploadChange" list-type="picture-card" :auto-upload="true" :limit="1" 
              :on-success="handleUploadSuccessRole" :file-list="ruleFormRole.picture" style="max-width: 500px;" 
              :data="requestMiniCode" class="upload-file-code" :on-exceed="handleExceed">
              <div class="upload-btn">
                <div class="btn-mask">
                  <i class="el-icon-plus" style="font-size: 18px;"></i>
                  <div>点击上传</div>
                </div>
              </div>
              <div slot="file" slot-scope="{file}">
                <img class="el-upload-list__item-thumbnail"  :src="httpUrls.ossUrl + ruleFormRole.picture[0].file_url" alt="">
                <span class="el-upload-list__item-actions">
                  <span class="el-upload-list__item-preview" @click="handlePictureCardPreview(file)">
                    <i class="el-icon-zoom-in"></i>
                  </span>
                  <span class="el-upload-list__item-delete" @click="handleRemove(file)">
                    <i class="el-icon-delete"></i>
                  </span>
                </span>
              </div>
            </el-upload>
            <div class="title_prompt">请上传jpg/png文件，文件大小不超过5MB</div>
            <el-dialog :visible.sync="dialogVisible">
              <img width="100%" :src="dialogImageUrl" alt="">
            </el-dialog>
          </el-form-item>
          <el-form-item label="人物名称" prop="name">
            <el-input v-model="ruleFormRole.name" style="max-width: 500px;" show-word-limit placeholder="例如，“阿尔伯特·爱因斯坦"
              maxlength="10"></el-input>
          </el-form-item>
          <el-form-item label="人物问候语" prop="greetings">
            <el-input type="textarea" v-model="ruleFormRole.greetings" :autosize="{ minRows: 3, maxRows: 6 }"
              style="max-width: 500px;" maxlength="100" show-word-limit
              placeholder="例如，“阿尔伯特·爱因斯坦”可能会说：“大家好，我是阿尔伯特·爱因斯坦。我生于 1879 年 3 月 14 日，我提出了狭义相对论和广义相对论。”"></el-input>
          </el-form-item>
          <el-form-item label="是否公开" prop="isPublic">
            <!-- <el-select v-model="ruleFormRole.isPublic" placeholder="请选择" style="max-width: 500px;">
              <el-option v-for="item in [{ value: 1, label: '公开:任何人都可以和您创建的人物聊天' }, { value: 0, label: '私有：只有您可以聊天' }]"
                :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select> -->
            <!-- <el-radio-group v-model="ruleFormRole.isPublic"> -->
            <el-radio v-model="ruleFormRole.isPublic" :label="1">公开:任何人都可以和您创建的人物聊天</el-radio>
            <el-radio v-model="ruleFormRole.isPublic" :label="0">私有：只有您可以聊天</el-radio>
            <!-- </el-radio-group> -->
          </el-form-item>
          <div class="vertical_line-data">
            <div class="vertical_line"></div>
            高级设置
          </div>
          <el-form-item label="隐性提示词" prop="opaqueWord">
            <div v-for="(item, index) in inputArr" :key="index"
              style="display: flex;justify-content: space-between;align-items: center;margin-bottom: 5px;">
              <el-input type="textarea" v-model="item.title" style="width: 90%;max-width: 450px;"
                :autosize="{ minRows: 3, maxRows: 6 }" placeholder="例如：我是“阿尔伯特·爱因斯坦”：用户问我问题请阿尔伯特·爱因斯坦口吻回复用户"></el-input>
              <div style="font-size: 14px;color: red;cursor: pointer;" @click="inputDelete(index)" v-if="index != 0">删除
              </div>
            </div>

            <div style="font-size: 14px;color: blue;cursor: pointer;" @click="inputArr.push({ title: '' })">添加</div>
            <div style="color: #666;font-size: 14px;font-weight: 400;">隐性提示词不会显示在平台上，用于大模型训练完善聊天质量</div>
          </el-form-item>
          <el-form-item label="示例提示词" prop="example_question">
            <el-input type="textarea" v-model="ruleFormRole.example_question" placeholder="请输入该人物的示例问题"
              style="max-width: 500px;" :autosize="{ minRows: 3, maxRows: 6 }"></el-input>
          </el-form-item>
          <el-form-item label="介绍" prop="introduce">
            <el-input type="textarea" v-model="ruleFormRole.introduce" style="max-width: 500px;"
              :autosize="{ minRows: 3, maxRows: 6 }" placeholder="请输入该人物详细介绍"></el-input>
          </el-form-item>
          <el-form-item label="影响" prop="effect">
            <el-input type="textarea" v-model="ruleFormRole.effect" style="max-width: 500px;"
              :autosize="{ minRows: 3, maxRows: 6 }" placeholder="请输入该人物影响与成就"></el-input>
          </el-form-item>
          <el-form-item style="display: flex;justify-content: center;">
            <el-button style="padding: 6px 10px;" @click="submitFormRole('ruleFormRole')">保存</el-button>
          </el-form-item>
        </el-form>
      </div>

      <!-- 
  创建问题集a
  -->
      <el-form :model="ruleFormQuestion" :rules="rulesQuestion" ref="ruleFormQuestion" label-width="100px"
        class="demo-ruleForm" v-else>
        <el-form-item label="标题" prop="name">
          <el-input v-model="ruleFormQuestion.name" maxlength="10" style="max-width: 500px;" show-word-limit
            placeholder="例如，房产经纪人" v-if="data.model == 4"></el-input>
          <el-input v-model="ruleFormQuestion.name" maxlength="10" style="max-width: 500px;" show-word-limit
            placeholder="例如，机器学习工程师" v-else></el-input>
        </el-form-item>
        <el-form-item label="内容" prop="greetings">
          <el-input type="textarea" v-model="ruleFormQuestion.greetings" :autosize="{ minRows: 3, maxRows: 6 }"
            v-if="data.model == 4" style="max-width: 500px;" show-word-limit maxlength="100"
            placeholder="我是一名出色的房产经纪人，输入购房需求，如：100万预算买三房，给您一些建议:"></el-input>
          <el-input type="textarea" v-model="ruleFormQuestion.greetings" :autosize="{ minRows: 3, maxRows: 6 }" v-else
            style="max-width: 500px;" show-word-limit maxlength="100"
            placeholder="我是机器学习工程师。我会写一些机器学习的概念，你遇到那些问题可以直接问我:"></el-input>
        </el-form-item>
        <el-form-item label="是否公开" prop="isPublic">
          <!-- <el-select v-model="ruleFormQuestion.isPublic" placeholder="请选择" style="max-width: 500px;">
            <el-option v-for="item in [{ value: 1, label: '' }, { value: 0, label: '私有：只有您可以聊天' }]"
              :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select> -->
          <!-- <el-radio-group > -->
          <el-radio v-model="ruleFormQuestion.isPublic" :label="1">公开:任何人都可以和您创建的人物聊天</el-radio>
          <el-radio v-model="ruleFormQuestion.isPublic" :label="0">私有：只有您可以聊天</el-radio>
          <!-- </el-radio-group> -->

        </el-form-item>
        <div class="vertical_line-data">
          <div class="vertical_line"></div>
          高级设置
        </div>
        <el-form-item label="隐性提示词" prop="opaqueWord">
          <div v-for="(item, index) in inputArr" :key="index"
            style="display: flex;justify-content: space-between;align-items: center;margin-bottom: 5px;">
            <el-input type="textarea" v-model="item.title" style="width: 90%;max-width: 450px;"
              :autosize="{ minRows: 3, maxRows: 6 }" placeholder="例如：我是“阿尔伯特·爱因斯坦”：用户问我问题请阿尔伯特·爱因斯坦口吻回复用户"></el-input>
            <div style="font-size: 14px;color: red;cursor: pointer;" @click="inputDelete(index)" v-if="index != 0">删除</div>
          </div>

          <div style="font-size: 14px;color: blue;cursor: pointer;" @click="inputArr.push({ title: '' })">添加</div>
          <div style="color: #666;font-size: 14px;font-weight: 400;">隐性提示词不会显示在平台上，用于大模型训练完善聊天质量</div>
        </el-form-item>
        <el-form-item label="示例提示词" prop="example_question">
          <el-input type="textarea" v-model="ruleFormQuestion.example_question" placeholder="请输入该人物的示例问题"
            style="max-width: 500px;" :autosize="{ minRows: 3, maxRows: 6 }"></el-input>
        </el-form-item>
        <div style="display: flex;align-items: center;">
          <div class="vertical_line"></div>
          <div class="vertical_line-data" style="margin: 0 10px 0 0;">对话相关</div>
          <div style="line-height: 22px;">示例：可添加不同的对话示例</div>
          <!-- <el-button type="text" style="font-size: 16px;padding: 0;border: none;margin-left: 10px;">查看示例</el-button> -->
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
              <!-- <el-button type="text" @click="ruleFormAddTag = item, dialogVisible = true">编辑</el-button>
              <el-button type="text" @click="dialogueScenario.splice(i, 1)">删除</el-button> -->
            </div>
          </div>
          <div v-if="item.title != ''">标题：{{ item.title }}</div>
          <div v-if="item.placeholder != ''">提示语：{{ item.placeholder }}</div>
          <div v-if="item.dynamicTags.length != 0">标签：<span v-for="(v, o) in item.dynamicTags" :key="o">{{ v }} {{ o ==
            item.dynamicTags.length - 1 ? '' : '/' }}</span></div>
          <!-- <div>多选内容：</div>
          <div>单选内容：</div> -->
        </div>
        <div style="display: flex;justify-content: center;margin-top: 20px;">
          <el-button plain icon="el-icon-circle-plus" style="border: 1px solid #1F64FF;color: #1F64FF;padding: 6px 100px;"
            @click="dialogVisible = true">添加</el-button>
        </div>

        <div style="display: flex;justify-content: center;margin-top: 30px;">
          <el-button style="padding: 6px 10px;" @click="submitFormQuestion('ruleFormQuestion')">保存</el-button>
        </div>
        <!-- <el-form-item class="form-item-left-zero" style="display: flex;justify-content: center;">
        </el-form-item> -->
      </el-form>

      <div class="vertical_line-data">
        <div class="vertical_line"></div>
        人物知识库
      </div>
      <div class="select_file_list">
        <div class="file_title_list">资料文件</div>
        <div>
          <div class="upload_file-list">
            <div class="file-title">文档</div>
            <el-upload class="upload-demo" style="width: calc(100% - 90px);max-width: 500px;"
              :action="httpUrls.loginUrl + 'api/user/oss_upload'" accept=".docx,.doc,.txt,.pdf,.xls,.xlsx,.pptx"
              :headers="headerData"
              :file-list="fileList" :data="requestFileList" :on-change="handleFileList"
              :on-success="handleSuccessFileList" ref="fileList" multiple :auto-upload="true" :limit="10">
              <el-button size="small" type="primary" icon="el-icon-upload2"
                style="background-color: #1f64ff;">点击上传</el-button>
              <div slot="tip" class="el-upload__tip title_prompt">文件资料上传可包含，DOC、XISX、PPT、TXT、PDF文件</div>
            </el-upload>
          </div>

          <div class="upload_file-list">
            <div class="file-title">图片</div>
            <el-upload class="upload-demo" style="width: calc(100% - 90px);max-width: 500px;"
              :action="httpUrls.loginUrl + 'api/user/oss_upload'" :file-list="pictureList" :data="requestPictureList"
              :headers="headerData"
              ref="pictureList" accept=".jpg,.jpeg,.png" multiple :on-change="handlePictureList"
              :on-success="handleSuccessPictureList" :auto-upload="true" :limit="10">
              <el-button size="small" type="primary" icon="el-icon-upload2"
                style="background-color: #1f64ff;">点击上传</el-button>
              <div slot="tip" class="el-upload__tip title_prompt">文件资料上传可包含，JPG、PNG文件</div>
            </el-upload>
          </div>

          <!-- <div class="upload_file-list">
            <div class="file-title">视频</div>
            <el-upload class="upload-demo" style="width: calc(100% - 90px);max-width: 500px;"
              :action="httpUrls.loginUrl + 'api/user/oss_upload'" :file-list="videoList" :data="requestVideoList"
              :on-change="handleVideoList" :on-success="handleSuccessVideoList"
              ref="videoList" accept=".flv,.rmvb,.mp4,.mvb" multiple :auto-upload="true" :limit="10">
              <el-button size="small" type="primary" icon="el-icon-upload2"
                style="background-color: #1f64ff;">点击上传</el-button>
              <div slot="tip" class="el-upload__tip title_prompt">文件资料上传可包含，FLV、RMVB、MP4、MVB文件</div>
            </el-upload>
          </div> -->
        </div>
      </div>

      <div style="display: flex;">
        <div class="file_title_list">网址</div>
        <div style="width: calc(100% - 100px);">
          <div v-for="(item, i) in networkAddressNumber" style="display: flex;align-items: center;margin-bottom: 10px;">
            <el-input v-model="networkAddress[i]" placeholder="请输入您的网址" style="width: calc(100% - 79px)"></el-input>
            <el-button v-if="i == 0"
              @click="networkAddressNumber >= 10 ? networkAddressNumber = 10 : networkAddressNumber++" icon="el-icon-plus"
              style="width: 69px;padding: 0 10px;margin-left: 10px;font-size: 14px;line-height: 22px;height: 30px;background-color: #1F64FF;color: #fff;">添加</el-button>
          </div>
        </div>
      </div>

      <div style="display: flex;align-items: center;flex-direction: column;">
        <el-button v-if="Number(data.model) == '1003'" type="primary"
          style="width: 50%;background-color: #1f64ff;margin: 40px 0 10px 0;"
          @click="submitFormRole('ruleFormRole')">提交</el-button>
        <el-button v-else type="primary" style="width: 50%;background-color: #1f64ff;margin: 40px 0 10px 0;"
          @click="submitFormQuestion('ruleFormQuestion')">提交</el-button>
        <div style="color: #666;font-size: 14px;font-weight: 400;">以上信息越完善，能够帮助人物更好地分析问题，增强问题解决的能力。</div>
      </div>
    </div>

    <el-dialog title="添加" :visible.sync="dialogVisible" width="30%">
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

        <!-- <el-form-item label="多选内容" prop="isPublic">
          <el-select v-model="ruleFormQuestion.isPublic" placeholder="请选择" style="max-width: 500px;">
            <el-option v-for="item in [{ value: 1, label: '是' }, { value: 2, label: '否' }]"
              :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="单选内容" prop="isPublic">
          <el-select v-model="ruleFormQuestion.isPublic" placeholder="请选择" style="max-width: 500px;">
            <el-option v-for="item in [{ value: 1, label: '是' }, { value: 2, label: '否' }]"
              :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item> -->

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

    <div style="width: 248px;"></div>
  </div>
</template>

<script>
import goBack from '../goBack'
import httpUrls from '../../api/requestURL'
import { createUserModels, editUserModels } from '../../api/chatMG'
import {
  payModules,
} from '../../api/prompts'
export default {
  name: 'create-role',
  data() {
    return {
      inputArr: [{ title: '' }],
      moduleList: [],  //分类数组
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
      httpUrls: httpUrls,
      roleType: '', // 新建或者编辑
      data: {}, // 从上一个页面来的基本数据
      dialogueScenario: [],
      dialogVisible: false,
      dialogImageUrl: '',
      requestMiniCode: {
        image: null,
        image_name: null,
        oss_dir: 'static',
        cate: 'Enterprise_customization-role_list'
      },
      headerData: {},
      // 上传的文件图片列表
      requestPictureList: {
        image: null,
        image_name: null,
        oss_dir: 'static',
        cate: 'Enterprise_customization-picture_list'
      },
      // 上传的文件列表
      requestFileList: {
        image: null,
        image_name: null,
        oss_dir: 'static',
        cate: 'Enterprise_customization-file_list'
      },
      // 上传的视频列表
      requestVideoList: {
        image: null,
        image_name: null,
        oss_dir: 'static',
        cate: 'Enterprise_customization-video_list'
      },
      ruleFormRole: {
        picture: [], // 人物头像
        name: '', // 人物名称
        greetings: '', // 问候语
        isPublic: 1, // 是否公开
        opaqueWord: '', // 隐性词
        example_question: "",  //示例问题
        introduce: '', // 介绍
        effect: '', // 影响
      },
      ruleFormQuestion: {
        picture: [], // 人物头像
        name: '', // 人物名称
        greetings: '', // 问候语
        isPublic: 1, // 是否公开
        opaqueWord: '', // 隐性词
        example_question: "",  //示例问题
        introduce: '', // 介绍
        effect: '', // 影响
      },
      ruleFormAddTag: {
        type: '',
        title: '',
        placeholder: '',
        dynamicTags: [],
        isPublic: 1,
      },
      inputVisible: false,
      inputValue: '',

      fileList: [], // 文件列表
      pictureList: [], // 图片列表
      videoList: [], // 视频列表
      networkAddress: [], // 网址列表

      networkAddressNumber: 1,
      rulesRole: {
        picture: [
          { required: true, message: '人物头像不能为空', trigger: 'change' },
        ],
        name: [
          { required: true, message: '请输入人物名称', trigger: 'blur' }
        ],
        greetings: [
          { required: true, message: '请输入人物问候语', trigger: 'blur' }
        ],
        isPublic: [
          { required: true, message: '请选择公开或私有', trigger: 'change' }
        ],
      },
      rulesQuestion: {
        picture: [
          { required: true, message: '人物头像不能为空', trigger: 'blur' },
        ],
        name: [
          { required: true, message: '请输入标题', trigger: 'blur' }
        ],
        greetings: [
          { required: true, message: '请输入内容', trigger: 'change' }
        ],
        isPublic: [
          { required: true, message: '请选择公开或私有', trigger: 'change' }
        ],
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
    };
  },
  components: {
    goBack
  },

  mounted() {
    let userInfo = JSON.parse(localStorage.getItem("userInfo"));
    this.headerData.authorization = userInfo.token
    this.headerData.role = userInfo.role

    window.addEventListener('beforeunload', this.beforeunLoadHandle)
    this.data = JSON.parse(sessionStorage.getItem('createRoleData'))
    if (sessionStorage.getItem('edit_roles')) {
      let datas = JSON.parse(sessionStorage.getItem('edit_roles'))
      this.roleType = '编辑'
      // console.log(datas, this.data);
      this.data.question_id = datas.question_id
      if (datas.industry_id == '1003') {
        this.ruleFormRole = {
          picture: [{ file_url: datas.character_avatar }], // 人物头像
          name: datas.character_name, // 人物名称
          greetings: datas.character_greetings, // 问候语
          isPublic: Number(datas.is_public), // 是否公开
          opaqueWord: datas.hint, // 隐性词
          introduce: datas.character_desc, // 介绍
          effect: datas.character_achievements, // 影响
          example_question:datas.example_question   //示例提示词
        }
        this.$set(this.inputArr[0], 'title', datas.hint)
        // this.inputArr.push({title:datas.hint})
      } else {
        this.ruleFormQuestion = {
          picture: [], // 人物头像
          name: datas.assistant_title, // 人物名称
          greetings: datas.assistant_content, // 问候语
          isPublic: Number(datas.is_public), // 是否公开
          opaqueWord: datas.hint, // 隐性词
          introduce: '', // 介绍
          effect: '', // 影响
          example_question:datas.example_question   //示例提示词
        }
        this.$set(this.inputArr[0], 'title', datas.hint)
        this.dialogueScenario = []
        console.log(datas,'编辑数据')
        datas.question_data.forEach(v => {
          let arr = []
          if (Object.keys(v.info_options).length != 0) {
            v.info_options.forEach(item => {
              arr.push(item.value)
            })
          }
          this.dialogueScenario.push({
            type: v.type_id,
            title: v.title,
            placeholder: v.placeholder,
            dynamicTags: arr,
            isPublic: Number(v.is_required),
            id: this.dialogueScenario.length
          })
        });
      }

      // 还原文件
      if (datas.files.hasOwnProperty('file')) {
        datas.files.file.forEach(v => {
          this.fileList.push({
            file_name: v.file_name,
            name: v.file_name,
            file_url: v.file_url
          })
        });
        // console.log(this.fileList);
      }
      if (datas.files.hasOwnProperty('pics')) {
        datas.files.pics.forEach(v => {
          this.pictureList.push({
            file_name: v.file_name,
            name: v.file_name,
            file_url: v.file_url
          })
        });

      }
      if (datas.files.hasOwnProperty('video')) {
        datas.files.video.forEach(v => {
          this.videoList.push({
            file_name: v.file_name,
            name: v.file_name,
            file_url: v.file_url
          })
        });

      }
      if (datas.files.hasOwnProperty('url')) {
        datas.files.url.forEach(v => {
          this.networkAddress.push(v.file_url)
        });
        this.networkAddressNumber = this.networkAddress.length
      }
    }
    // this.ruleFormRole.isPublic = 1;
  },
  created() {
    this.getPayModules('', '1003', this.ruleForm.career, this.ruleForm.typesOf, this.ruleForm.employmentTime, this.ruleForm.status, '426299485399558')
  },
  beforeDestroy() {
    window.removeEventListener('beforeunload', this.beforeunLoadHandle)
    sessionStorage.removeItem('edit_roles')
  },

  methods: {
    inputDelete(index) {
      if (this.inputArr.length > 1) {
        this.inputArr.splice(index, 1);
      }
    },
    modelChange(e) {
      this.$set(this.data, 'model', e)
      // this.data.model = e
      console.log(e, '---模块选择')
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
        console.log(res.data, '模块数组')
        this.moduleList = res.data
        if (res.data != null && res.data.length != 0) {
          console.log('进入')
          this.ruleForm.module = res.data[0].module_id
        } else {
          this.ruleForm.module = ''
        }
      })
    },
    // 切换标签属性时
    handleTagTypeChange(e) {
      if (e == '438600126748678' || e == '438257565440006') {
        this.ruleFormAddTag.dynamicTags = []
      }
    },
    handleClose(tag) {
      this.ruleFormAddTag.dynamicTags.splice(this.ruleFormAddTag.dynamicTags.indexOf(tag), 1);
    },

    showInput() {
      this.inputVisible = true;
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus();
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

    // 阻止刷新
    beforeunLoadHandle(event) {
      event.preventDefault();
      event.returnValue = '离开？'
    },

    handleUploadChange(file, fileList) {
      this.requestMiniCode.image = file.raw
    },
    handleUploadSuccessRole(response, file, fileList) {
      this.ruleFormRole.picture = [{ file_url: response.data.new_url }]
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = this.httpUrls.ossUrl + this.ruleFormRole.picture[0].file_url
      this.dialogVisible = true;
    },
    handleRemove(file) {
      this.ruleFormRole.picture = []
    },
    // 保存人物
    submitFormRole(formName) {
      let userInfo = JSON.parse(localStorage.getItem('userInfo'))
      this.$refs[formName].validate(valid => {
        if (valid) {
          let file = []
          let video = []
          let pics = []
          let url = []
          this.fileList.forEach(v => {
            file.push({
              file_name: v.name,
              file_url: v.file_url
            })
          });
          this.pictureList.forEach(v => {
            pics.push({
              file_name: v.name,
              file_url: v.file_url
            })
          });
          this.videoList.forEach(v => {
            video.push({
              file_name: v.name,
              file_url: v.file_url
            })
          });
          this.networkAddress.forEach(v => {
            url.push({
              file_name: v,
              file_url: v
            })
          });
          let opaqueWord = this.inputArr.map(item => item.title).join(",");
          console.log(opaqueWord, '隐性提示词')
          let data = {
            user_id: userInfo.user_id,
            industry_id: this.data.model == 4 ? this.data.industry : this.data.model, // 行业
            module_id: this.data.module, // 模块
            occu_id: this.data.career, // 职业
            sub_occu_id: this.data.typesOf, // 类型
            info_questions: [],
            emp_duration_id: this.data.employmentTime, // 从业时间
            expertise_level_id: this.data.status, // 地位
            character_avatar: this.ruleFormRole.picture[0].file_url,
            character_name: this.ruleFormRole.name,
            character_greetings: this.ruleFormRole.greetings,
            is_public: this.ruleFormRole.isPublic,
            // : this.ruleFormRole.opaqueWord
            hint:opaqueWord,
            example_question: this.ruleFormRole.example_question,
            character_desc: this.ruleFormRole.introduce,
            character_achievements: this.ruleFormRole.effect,
            assistant_title: '',
            assistant_content: '',
            related_document: {
              file,
              video,
              pics,
              url
            },
            refuse_reason: ''
          }
          console.log(data, '--请求参数')
          if (this.roleType == '编辑') {
            editUserModels({ ...data, question_id: this.data.question_id }).then(res => {
              if (res.code == 20000) {
                this.$message.success('编辑成功')
                setTimeout(() => {
                  this.$router.go(-1)
                }, 1000);
              }
            })
          } else {
            createUserModels(data).then(res => {
              // console.log(res);
              if (res.code == 20000) {
                this.$message.success('提交成功')
                setTimeout(() => {
                  this.$router.go(-1)
                }, 1000);
              }
            })
          }
        }
      })
    },

    // 保存问题集
    submitFormQuestion(formName) {
      let userInfo = JSON.parse(localStorage.getItem('userInfo'))
      this.$refs[formName].validate(valid => {
        if (valid) {
          let infoQuestions = []
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
          let opaqueWord = this.inputArr.map(item => item.title).join(",");
          let data = {
            user_id: userInfo.user_id,
            industry_id: this.data.model == 4 ? this.data.industry : this.data.model, // 行业
            module_id: this.data.module, // 模块
            occu_id: this.data.career, // 职业
            sub_occu_id: this.data.typesOf, // 类型
            info_questions: infoQuestions.length != 0 ? infoQuestions : defaultQuestion,
            emp_duration_id: this.data.employmentTime, // 从业时间
            expertise_level_id: this.data.status, // 地位
            character_avatar: '',
            character_name: '',
            character_greetings: '',
            is_public: this.ruleFormQuestion.isPublic == 1 ? true : false,
            hint:opaqueWord,
            character_desc: '',
            character_achievements: '',
            assistant_title: this.ruleFormQuestion.name,
            example_question: this.ruleFormQuestion.example_question,
            assistant_content: this.ruleFormQuestion.greetings,
            related_document: [],
            refuse_reason: ''
          }

          if (this.roleType == '编辑') {
            editUserModels({ ...data, question_id: this.data.question_id }).then(res => {
              if (res.code == 20000) {
                this.$message.success('编辑成功')
                setTimeout(() => {
                  this.$router.go(-1)
                }, 1000);
              }
            })
          } else {
            createUserModels(data).then(res => {
              if (res.code == 20000) {
                this.$message.success('提交成功')
                setTimeout(() => {
                  this.$router.go(-1)
                }, 1000);
              }
              // console.log(res);
              // this.ruleFormQuestion = {
              //   picture: [], // 人物头像
              //   name: '', // 人物名称
              //   greetings: '', // 问候语
              //   isPublic: 1, // 是否公开
              //   opaqueWord: '', // 隐性词
              //   introduce: '', // 介绍
              //   effect: '', // 影响
              // }
            })
          }

        }
      })
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

    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    handleFileList(file, fileList) {
      this.requestFileList.image = file.raw
      this.requestFileList.image_name = file.name
    },
    handleSuccessFileList(response, file, fileList) {
      this.fileList.push({
        file_name: response.data.name,
        name: response.data.name,
        file_url: response.data.new_url
      })
    },

    handlePictureList(file, fileList) {
      this.requestPictureList.image = file.raw
      this.requestPictureList.image_name = file.name
    },
    handleSuccessPictureList(response, file, fileList) {
      this.pictureList.push({
        file_name: response.data.name,
        name: response.data.name,
        file_url: response.data.new_url
      })
    },

    handleVideoList(file, fileList) {
      this.requestVideoList.image = file.raw
      this.requestVideoList.image_name = file.name
    },
    handleSuccessVideoList(response, file, fileList) {
      this.videoList.push({
        file_name: response.data.name,
        name: response.data.name,
        file_url: response.data.new_url
      })
    },

    handleExceed(file, fileList) {
      this.$message.error('文件超出最大限制')
    },
  }
}
</script>

<style scoped>
.create-role {
  display: flex;
  justify-content: center;
  /* margin: 30px 0; */
  padding-top: 30px;
  box-sizing: border-box;
  margin-bottom: 40px;
  position: relative;
}

.upload-btn {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
}

.upload-btn .btn-mask {
  line-height: 24px;
  margin: auto;
  font-size: 14px;
}

.upload_file-list {
  display: flex;
  margin-bottom: 15px;
}

.upload_file-list .file-title {
  color: #666;
  font-size: 14px;
  font-weight: 400;
  border-radius: 4px;
  border: 1px solid #DCDFE6;
  background: #FFF;
  height: 32px;
  line-height: 32px;
  padding: 0 10px;
  width: 50px;
  text-align: center;
  margin-right: 20px;
}

.vertical_line-data {
  display: flex;
  align-items: center;
  color: #000;
  font-size: 22px;
  font-weight: 500;
  margin-bottom: 30px;
}

.vertical_line {
  border-radius: 10px;
  background: #1F64FF;
  width: 4px;
  height: 24px;
  margin-right: 10px;
}

.select_file_list {
  display: flex;
}

.file_title_list {
  color: #333;
  font-size: 14px;
  line-height: 34px;
  margin-right: 10px;
  font-weight: 400;
  width: 90px;
  margin-right: 10px;
  text-align: right;
}
</style>

<style>
.upload-file-code .el-upload {
  width: 80px;
  height: 80px;
  background-color: #F2F3F5;
}

.upload-file-code .el-upload-list .el-upload-list__item {
  width: 80px;
  height: 80px;
  margin-bottom: 0;
}

.upload-demo .el-upload-dragger {
  width: 300px;
  height: 140px;
}

.upload-demo .el-upload-dragger .el-icon-upload {
  margin-top: 16px;
}

.upload-demo .el-upload-list .el-upload-list__item {
  margin: 0;
}

.el-upload__tip {
  margin-top: 0;
  line-height: 20px;
}
</style>