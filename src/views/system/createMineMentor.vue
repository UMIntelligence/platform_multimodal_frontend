<template>
  <div class="create-role">
    <div class="go-back-page">
      <div class="back" @click="$router.go(-1)">
        <i class="el-icon-arrow-left"></i>
        <span>返回</span>
      </div>
    </div>
    <div
      style="min-width: 470px; display: flex; flex-direction: column; align-items: center"
    >
      <!-- 
        创建人物
       -->
      <el-form
        :model="ruleFormRole"
        :rules="rulesRole"
        ref="ruleFormRole"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="人物头像" prop="picture">
          <el-upload
            :action="httpUrls.loginUrl + 'api/user/oss_upload'"
            accept=".png,.jpg,.jpeg"
            :on-change="handleUploadChange"
            list-type="picture-card"
            :auto-upload="true"
            :limit="1"
            :headers="headerData"
            ref="miniCodeList"
            :on-success="handleUploadSuccessRole"
            style="max-width: 500px"
            :file-list="ruleFormRole.picture"
            :data="requestMiniCode"
            class="upload-file-code"
            :on-exceed="handleExceed"
          >
            <div class="upload-btn">
              <div class="btn-mask">
                <i class="el-icon-plus" style="font-size: 18px"></i>
                <div>点击上传</div>
              </div>
            </div>
            <div slot="file" slot-scope="{ file }">
              <img
                class="el-upload-list__item-thumbnail"
                :src="httpUrls.ossUrl + ruleFormRole.picture[0].file_url"
                alt=""
              />
              <span class="el-upload-list__item-actions">
                <span
                  class="el-upload-list__item-preview"
                  @click="handlePictureCardPreview(file)"
                >
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
            <img width="100%" :src="dialogImageUrl" alt="" />
          </el-dialog>
        </el-form-item>
        <el-form-item label="人物名称" prop="name">
          <el-input
            v-model="ruleFormRole.name"
            style="max-width: 500px"
            show-word-limit
            placeholder="例如，“阿尔伯特·爱因斯坦"
            maxlength="10"
          ></el-input>
        </el-form-item>
        <el-form-item label="人物问候语" prop="greetings">
          <el-input
            type="textarea"
            v-model="ruleFormRole.greetings"
            :autosize="{ minRows: 3, maxRows: 6 }"
            style="max-width: 500px"
            maxlength="100"
            show-word-limit
            placeholder="例如，“阿尔伯特·爱因斯坦”可能会说：“大家好，我是阿尔伯特·爱因斯坦。我生于 1879 年 3 月 14 日，我提出了狭义相对论和广义相对论。”"
          ></el-input>
        </el-form-item>
        <div class="vertical_line-data">
          <div class="vertical_line"></div>
          高级设置
        </div>
        <el-form-item label="隐形提示词" prop="opaqueWord">
          <el-input
            type="textarea"
            v-model="ruleFormRole.opaqueWord"
            style="max-width: 500px"
            :autosize="{ minRows: 3, maxRows: 6 }"
            placeholder="例如：我是“阿尔伯特·爱因斯坦”：用户问我问题请阿尔伯特·爱因斯坦口吻回复用户"
          ></el-input>
          <div style="color: #666; font-size: 14px; font-weight: 400">
            隐性提示词不会显示在平台上，用于大模型训练完善聊天质量
          </div>
        </el-form-item>
        <el-form-item label="介绍" prop="introduce">
          <el-input
            type="textarea"
            v-model="ruleFormRole.introduce"
            style="max-width: 500px"
            :autosize="{ minRows: 3, maxRows: 6 }"
            placeholder="请输入该人物详细介绍"
          ></el-input>
        </el-form-item>
        <el-form-item label="影响" prop="effect">
          <el-input
            type="textarea"
            v-model="ruleFormRole.effect"
            style="max-width: 500px"
            :autosize="{ minRows: 3, maxRows: 6 }"
            placeholder="请输入该人物影响与成就"
          ></el-input>
        </el-form-item>
        <el-form-item style="display: flex; justify-content: center">
          <el-button style="padding: 6px 10px" @click="submitFormRole('ruleFormRole')"
            >保存</el-button
          >
        </el-form-item>
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
            <el-upload
              class="upload-demo"
              style="width: calc(100% - 90px); max-width: 500px"
              :action="httpUrls.loginUrl + 'api/user/oss_upload'"
              accept=".docx,.doc,.txt,.pdf,.xls,.xlsx,.pptx"
              :file-list="fileList"
              :data="requestFileList"
              :on-change="handleFileList"
              :on-success="handleSuccessFileList"
              ref="fileList"
              :headers="headerData"
              multiple
              :auto-upload="true"
              :limit="10"
            >
              <el-button
                size="small"
                type="primary"
                icon="el-icon-upload2"
                style="background-color: #1f64ff"
                >点击上传</el-button
              >
              <div slot="tip" class="el-upload__tip title_prompt">
                文件资料上传可包含，DOC、XISX、PPT、TXT、PDF文件
              </div>
            </el-upload>
          </div>

          <div class="upload_file-list">
            <div class="file-title">图片</div>
            <el-upload
              class="upload-demo"
              style="width: calc(100% - 90px); max-width: 500px"
              :action="httpUrls.loginUrl + 'api/user/oss_upload'"
              :file-list="pictureList"
              :data="requestPictureList"
              ref="pictureList"
              :headers="headerData"
              accept=".jpg,.jpeg,.png"
              multiple
              :on-change="handlePictureList"
              :on-success="handleSuccessPictureList"
              :auto-upload="true"
              :limit="10"
            >
              <el-button
                size="small"
                type="primary"
                icon="el-icon-upload2"
                style="background-color: #1f64ff"
                >点击上传</el-button
              >
              <div slot="tip" class="el-upload__tip title_prompt">
                文件资料上传可包含，JPG、PNG文件
              </div>
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
              <div slot="tip" class="el-upload__tip title_prompt">
                文件资料上传可包含，FLV、RMVB、MP4、MVB文件</div>
            </el-upload>
          </div> -->
        </div>
      </div>

      <!-- <div style="display: flex;">
        <div class="file_title_list">网址</div>
        <div style="width: calc(100% - 100px);">
          <div v-for="(item, i) in networkAddressNumber" style="display: flex;align-items: center;margin-bottom: 10px;">
            <el-input v-model="networkAddress[i]" placeholder="和请输入您的网址" style="width: calc(100% - 79px)"></el-input>
            <el-button v-if="i == 0" @click="networkAddressNumber >= 10 ? networkAddressNumber = 10 : networkAddressNumber++" icon="el-icon-plus" style="width: 69px;padding: 0 10px;margin-left: 10px;font-size: 14px;line-height: 22px;height: 30px;background-color: #1F64FF;color: #fff;">添加</el-button>
          </div>
        </div>
      </div> -->

      <div style="display: flex">
        <div class="file_title_list">网址</div>
        <div style="width: calc(100% - 100px)">
          <div
            v-for="(item, i) in networkAddressNumber"
            style="display: flex; align-items: center; margin-bottom: 10px"
            :key="i"
          >
            <el-input
              v-model="networkAddress[i]"
              placeholder="请输入您的网址"
              style="width: calc(100% - 79px)"
            ></el-input>
            <el-button
              v-if="i == 0"
              @click="
                networkAddressNumber >= 10
                  ? (networkAddressNumber = 10)
                  : networkAddressNumber++
              "
              icon="el-icon-plus"
              style="
                width: 69px;
                padding: 0 10px;
                margin-left: 10px;
                font-size: 14px;
                line-height: 22px;
                height: 30px;
                background-color: #1f64ff;
                color: #fff;
              "
              >添加</el-button
            >
          </div>
        </div>
      </div>

      <div style="display: flex; align-items: center; flex-direction: column">
        <el-button
          type="primary"
          style="width: 50%; background-color: #1f64ff; margin: 40px 0 10px 0"
          @click="submitFormRole('ruleFormRole')"
          >提交</el-button
        >
        <!-- <el-button v-else type="primary" style="width: 50%;background-color: #1f64ff;margin: 40px 0 10px 0;" @click="submitFormQuestion('ruleFormQuestion')">提交</el-button> -->
        <div style="color: #666; font-size: 14px; font-weight: 400">
          以上信息越完善，能够帮助人物更好地分析问题，增强问题解决的能力。
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import httpUrls from "../../api/requestURL";
import { createUserModels, editUserModels } from "../../api/chatMG";
import { createMetor, updateMetor } from "../../api/mentor";
export default {
  name: "create-role",
  data() {
    return {
      headerData: {},
      httpUrls: httpUrls,
      menterItemMsg: {},
      roleType: "", // 新建或者编辑
      data: {}, // 从上一个页面来的基本数据
      dialogueScenario: [],
      dialogVisible: false,
      dialogImageUrl: "",
      requestMiniCode: {
        image: null,
        image_name: null,
        oss_dir: "static",
        cate: "menter_image-list",
      },
      // 上传的文件图片列表
      requestPictureList: {
        image: null,
        image_name: null,
        oss_dir: "static",
        cate: "menter-picture_list",
      },
      // 上传的文件列表
      requestFileList: {
        image: null,
        image_name: null,
        oss_dir: "static",
        cate: "menter-file_list",
      },
      // 上传的视频列表
      requestVideoList: {
        image: null,
        image_name: null,
        oss_dir: "static",
        cate: "menter-video_list",
      },
      ruleFormRole: {
        picture: [], // 人物头像
        name: "", // 人物名称
        greetings: "", // 问候语
        isPublic: 1, // 是否公开
        opaqueWord: "", // 隐性词
        introduce: "", // 介绍
        effect: "", // 影响
      },
      ruleFormQuestion: {
        picture: [], // 人物头像
        name: "", // 人物名称
        greetings: "", // 问候语
        isPublic: 1, // 是否公开
        opaqueWord: "", // 隐性词
        introduce: "", // 介绍
        effect: "", // 影响
      },
      ruleFormAddTag: {
        type: "",
        title: "",
        placeholder: "",
        dynamicTags: [],
        isPublic: 1,
      },
      inputVisible: false,
      inputValue: "",

      fileList: [], // 文件列表
      pictureList: [], // 图片列表
      videoList: [], // 视频列表
      networkAddress: [], // 网址列表

      networkAddressNumber: 1,
      rulesRole: {
        picture: [{ required: true, message: "人物头像不能为空", trigger: "change" }],
        name: [{ required: true, message: "请输入人物名称", trigger: "blur" }],
        greetings: [{ required: true, message: "请输入人物问候语", trigger: "blur" }],
        isPublic: [{ required: true, message: "请选择公开或私有", trigger: "change" }],
      },
      rulesQuestion: {
        picture: [{ required: true, message: "人物头像不能为空", trigger: "blur" }],
        name: [{ required: true, message: "请输入标题", trigger: "blur" }],
        greetings: [{ required: true, message: "请输入内容", trigger: "change" }],
        isPublic: [{ required: true, message: "请选择公开或私有", trigger: "change" }],
      },
      rulesAddTag: {
        type: [{ required: true, message: "请选择类型", trigger: "change" }],
        title: [{ required: true, message: "请输入标题", trigger: "blur" }],
        placeholder: [{ required: true, message: "请输入提示语", trigger: "blur" }],
        dynamicTags: [{ required: true, message: "请填写标题或选项", trigger: "blur" }],
        isPublic: [{ required: true, message: "请选择是否必填", trigger: "blur" }],
      },
    };
  },

  mounted() {
    let userInfo = JSON.parse(localStorage.getItem("userInfo"));
    this.headerData.authorization = userInfo.token
    this.headerData.role = userInfo.role
    this.menterItemMsg = JSON.parse(sessionStorage.getItem("ADD_MENTOR_ITEM_MESSAGE"));
    this.data = JSON.parse(sessionStorage.getItem("createRoleData"));
    if (sessionStorage.getItem("EDIT_MENTOR_ITEM_MESSAGE")) {
      let datas = JSON.parse(sessionStorage.getItem("EDIT_MENTOR_ITEM_MESSAGE"));
      this.roleType = "编辑";
      // console.log(datas, this.data);
      // this.data.question_id = datas.question_id
      // if (datas.industry_id == '1003') {
      this.ruleFormRole = {
        picture: [{ file_url: datas.avatar, name: datas.avatar }], // 人物头像
        name: datas.character_name, // 人物名称
        greetings: datas.greeting, // 问候语
        opaqueWord: datas.implicit_hint, // 隐性词
        introduce: datas.introduction, // 介绍
        effect: datas.influence, // 影响
      };
      // } else {
      //   this.ruleFormQuestion = {
      //     picture: [], // 人物头像
      //     name: datas.assistant_title, // 人物名称
      //     greetings: datas.assistant_content, // 问候语
      //     isPublic: Number(datas.is_public), // 是否公开
      //     opaqueWord: datas.hint, // 隐性词
      //     introduce: '', // 介绍
      //     effect: '', // 影响
      //   }
      //   this.dialogueScenario = []
      //   datas.question_data.forEach(v => {
      //     let arr = []
      //     if (Object.keys(v.info_options).length != 0) {
      //       v.info_options.forEach(item => {
      //         arr.push(item.value)
      //       })
      //     }
      //     this.dialogueScenario.push({
      //       type: v.type_id,
      //       title: v.title,
      //       placeholder: v.placeholder,
      //       dynamicTags: arr,
      //       isPublic: Number(v.is_required),
      //       id: this.dialogueScenario.length
      //     })
      //   });
      // }

      // 还原文件
      let documents = datas.document.split(",");
      documents.forEach((v) => {
        this.fileList.push({
          file_name: v,
          name: v,
          file_url: v,
        });
      });
      if (documents == "") {
        this.fileList = [];
      }
      let images = datas.image.split(",");
      images.forEach((v) => {
        this.pictureList.push({
          file_name: v,
          name: v,
          file_url: v,
        });
      });
      if (images == "") {
        this.pictureList = [];
      }
      let websites = datas.website.split(",");
      this.networkAddressNumber = websites.length;
      websites.forEach((v) => {
        this.networkAddress.push(v);
      });
      if (websites == "") {
        this.videoList = [];
      }
    }
  },
  beforeDestroy() {
    sessionStorage.removeItem("EDIT_MENTOR_ITEM_MESSAGE");
  },

  methods: {
    // 切换标签属性时
    handleTagTypeChange(e) {
      if (e == "438600126748678" || e == "438257565440006") {
        this.ruleFormAddTag.dynamicTags = [];
      }
    },
    handleClose(tag) {
      this.ruleFormAddTag.dynamicTags.splice(
        this.ruleFormAddTag.dynamicTags.indexOf(tag),
        1
      );
    },

    showInput() {
      this.inputVisible = true;
      this.$nextTick((_) => {
        this.$refs.saveTagInput.$refs.input.focus();
      });
    },

    handleInputConfirm() {
      let inputValue = this.inputValue;
      if (inputValue) {
        this.ruleFormAddTag.dynamicTags.push(inputValue);
      }
      this.inputVisible = false;
      this.inputValue = "";
    },

    handleUploadChange(file, fileList) {
      this.requestMiniCode.image = file.raw;
    },
    handleUploadSuccessRole(response, file, fileList) {
      this.ruleFormRole.picture.push({ file_url: response.data.new_url });
      console.log();
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = httpUrls.ossUrl + file.file_url;
      this.dialogVisible = true;
    },
    handleRemove(file) {
      this.ruleFormRole.picture = [];
    },
    // 保存人物
    submitFormRole(formName) {
      let userInfo = JSON.parse(localStorage.getItem("userInfo"));
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let file = "";
          let video = "";
          let pics = "";
          let url = "";
          this.fileList.forEach((v, i) => {
            file += v.file_url + (i == this.fileList.length - 1 ? "" : ",");
            // file.push({
            //   file_name: v.name,
            //   file_url: v.file_url
            // })
          });
          this.pictureList.forEach((v, i) => {
            pics += v.file_url + (i == this.pictureList.length - 1 ? "" : ",");
            // pics.push({
            //   file_name: v.name,
            //   file_url: v.file_url
            // })
          });
          this.videoList.forEach((v, i) => {
            video += v.file_url + (i == this.videoList.length - 1 ? "" : ",");
            // video.push({
            //   file_name: v.name,
            //   file_url: v.file_url
            // })
          });
          this.networkAddress.forEach((v, i) => {
            url += v + (i == this.networkAddress.length - 1 ? "" : ",");
            // url.push({
            //   file_name: v,
            //   file_url: v
            // })
          });
          let data = {
            user_id: userInfo.user_id,
            avatar: this.ruleFormRole.picture[0].file_url,
            character_name: this.ruleFormRole.name,
            greeting: this.ruleFormRole.greetings,
            implicit_hint: this.ruleFormRole.opaqueWord,
            introduction: this.ruleFormRole.introduce,
            influence: this.ruleFormRole.effect,
            document: file,
            image: pics,
            website: url,
            me_id: this.menterItemMsg ? this.menterItemMsg.me_id : "",
            sort: this.menterItemMsg ? String(this.menterItemMsg.sort) : "",
            // industry_id: this.data.model == 4 ? this.data.industry : this.data.model, // 行业
            // module_id: this.data.module, // 模块
            // occu_id: this.data.career, // 职业
            // sub_occu_id: this.data.typesOf, // 类型
            // info_questions: [],
            // emp_duration_id: this.data.employmentTime, // 从业时间
            // expertise_level_id: this.data.status, // 地位
            // character_avatar: this.ruleFormRole.picture[0].file_url,
            // character_name: this.ruleFormRole.name,
            // character_greetings: this.ruleFormRole.greetings,
            // is_public: this.ruleFormRole.isPublic,
            // hint: this.ruleFormRole.opaqueWord,
            // character_desc: this.ruleFormRole.introduce,
            // character_achievements: this.ruleFormRole.effect,
            // assistant_title: '',
            // assistant_content: '',
            // related_document: {
            //   file,
            //   video,
            //   pics,
            //   url
            // },
            // refuse_reason: ''
          };
          if (this.roleType == "编辑") {
            const EDIT_MENTOR_ITEM_MESSAGE = JSON.parse(
              sessionStorage.getItem("EDIT_MENTOR_ITEM_MESSAGE")
            );
            let requestData = {
              ...data,
              user_id: EDIT_MENTOR_ITEM_MESSAGE.user_id,
              me_id: EDIT_MENTOR_ITEM_MESSAGE.me_id,
              tutor_id: EDIT_MENTOR_ITEM_MESSAGE.tutor_id,
              sort: EDIT_MENTOR_ITEM_MESSAGE.sort,
            };
            updateMetor(requestData).then((res) => {
              if (res.code == 20000) {
                this.$message.success("编辑成功");
                setTimeout(() => {
                  this.$router.go(-1);
                }, 1000);
              } else {
                this.$message.error(res.msg);
              }
            });
          } else {
            createMetor(data).then((res) => {
              // console.log(res);
              if (res.code == 20000) {
                this.$message.success("提交成功");
                setTimeout(() => {
                  this.$router.go(-1);
                }, 1000);
              }
            });
          }
        }
      });
    },

    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    handleFileList(file, fileList) {
      this.requestFileList.image = file.raw;
      this.requestFileList.image_name = file.name;
    },
    handleSuccessFileList(response, file, fileList) {
      this.fileList.push({
        file_name: response.data.name,
        name: response.data.name,
        file_url: response.data.new_url,
      });
    },

    handlePictureList(file, fileList) {
      this.requestPictureList.image = file.raw;
      this.requestPictureList.image_name = file.name;
    },
    handleSuccessPictureList(response, file, fileList) {
      this.pictureList.push({
        file_name: response.data.name,
        name: response.data.name,
        file_url: response.data.new_url,
      });
    },

    handleVideoList(file, fileList) {
      this.requestVideoList.image = file.raw;
      this.requestVideoList.image_name = file.name;
    },
    handleSuccessVideoList(response, file, fileList) {
      this.videoList.push({
        file_name: response.data.name,
        name: response.data.name,
        file_url: response.data.new_url,
      });
    },

    handleExceed(file, fileList) {
      this.$message.error("文件超出最大限制");
    },
  },
};
</script>

<style scoped lang="scss">
.go-back-page {
  display: flex;
  margin: 20px 0;

  .back {
    cursor: pointer;
  }
}

.create-role {
  // display: flex;
  // justify-content: center;
  margin: 30px 0;
  margin-bottom: 40px;
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
  border: 1px solid #dcdfe6;
  background: #fff;
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
  background: #1f64ff;
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
  background-color: #f2f3f5;
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
