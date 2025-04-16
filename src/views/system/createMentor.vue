<template>
  <div class="create-mentor">
    <div class="go-back-page">
      <div class="back" @click="$router.go(-1)">
        <i class="el-icon-arrow-left"></i>
        <span>返回</span>
      </div>
    </div>

    <div class="mask-mask">
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
        style="width: 600px"
      >
        <el-form-item>
          <div>*提供更多的资料，能帮助我们更好的训练你的数字分身，效果更好哦</div>
        </el-form-item>
        <el-form-item label="我的头像" prop="photo">
          <el-upload
            class="menter-avatar-uploader"
            :action="httpUrls.loginUrl + 'api/user/oss_upload'"
            :show-file-list="false"
            :data="requestData"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
            :on-change="handleAvatarChange"
            :headers="headerData"
          >
            <img
              v-if="ruleForm.photo"
              :src="httpUrls.ossUrl + ruleForm.photo"
              class="menter-avatar"
            />
            <i v-else class="el-icon-plus menter-avatar-uploader-icon"></i>
            <div v-if="!ruleForm.photo">点击上传</div>
            <div slot="tip" class="el-upload__tip">
              请上传jpg/png文件，文件大小不超过5MB
            </div>
          </el-upload>
        </el-form-item>
        <el-form-item label="昵称" prop="name">
          <el-input v-model="ruleForm.name" placeholder="请输入你的昵称"></el-input>
        </el-form-item>
        <el-form-item label="年龄" prop="age">
          <el-input v-model="ruleForm.age" placeholder="请输入你的年龄"></el-input>
        </el-form-item>
        <el-form-item label="职业" prop="occupation">
          <el-input v-model="ruleForm.occupation" placeholder="请输入你的职业"></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="gender">
          <el-select
            v-model="ruleForm.gender"
            placeholder="请选择性别"
            style="width: 100%"
          >
            <el-option
              v-for="item in genderList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
          <!-- <el-input v-model="ruleForm.gender" placeholder="请选择性别"></el-input> -->
        </el-form-item>
        <el-form-item label="学历" prop="education">
          <el-select
            v-model="ruleForm.education"
            placeholder="请选择学历"
            style="width: 100%"
          >
            <el-option
              v-for="item in educationList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
          <!-- <el-input v-model="ruleForm.education" placeholder="请选择学历"></el-input> -->
        </el-form-item>
        <el-form-item label="专业" prop="major">
          <el-input v-model="ruleForm.major" placeholder="请输入你的专业"></el-input>
        </el-form-item>
        <el-form-item label="兴趣爱好" prop="hobbies">
          <el-input
            v-model="ruleForm.hobbies"
            placeholder="请输入你的兴趣爱好"
          ></el-input>
        </el-form-item>
        <el-form-item label="地区" prop="region">
          <el-select
            v-model="ruleForm.region"
            placeholder="请选择你的地区"
            style="width: 100%"
          >
            <el-option
              v-for="item in regionList"
              :key="item.code"
              :label="item.name"
              :value="item.name"
            >
            </el-option>
          </el-select>
          <!-- <el-input v-model="ruleForm.region" placeholder="请选择你的地区"></el-input> -->
        </el-form-item>
        <el-form-item label="对话问候语" prop="greeting">
          <el-input
            v-model="ruleForm.greeting"
            type="textarea"
            :autosize="{ minRows: 5, maxRows: 5 }"
            resize="none"
            placeholder="例如，“阿尔伯特·爱因斯坦”可能会说：“大家好，我是阿尔伯特·爱因斯坦。我生于 1879 年 3 月 14 日，我提出了狭义相对论和广义相对论。”"
          ></el-input>
        </el-form-item>
        <el-form-item label="情感状态" prop="relationshipStatus">
          <el-input
            v-model="ruleForm.relationshipStatus"
            type="textarea"
            :autosize="{ minRows: 5, maxRows: 5 }"
            resize="none"
            placeholder="请简单描述一下你的感情状态"
          ></el-input>
        </el-form-item>
        <el-form-item label="梦想" prop="dream">
          <el-input
            v-model="ruleForm.dream"
            type="textarea"
            :autosize="{ minRows: 5, maxRows: 5 }"
            resize="none"
            placeholder="请输入你的梦想"
          ></el-input>
        </el-form-item>
        <el-form-item label="收入" prop="income">
          <el-input v-model="ruleForm.income" placeholder="请输入你的收入"></el-input>
        </el-form-item>
        <el-form-item label="形象描述" prop="imageDescription">
          <el-input
            v-model="ruleForm.imageDescription"
            type="textarea"
            :autosize="{ minRows: 5, maxRows: 5 }"
            resize="none"
            placeholder="请简单描述一下你的形象"
          ></el-input>
        </el-form-item>
        <el-form-item label="自定义资料" prop="extend">
          <el-button
            style="background-color: #1f64ff; color: #fff"
            @click="dialogVisible = true"
            >添加</el-button
          >
          <!-- <el-input v-model="ruleForm.extend" type="textarea" :autosize="{ minRows: 5, maxRows: 5 }" resize="none" placeholder="请简单描述一下你的形象"></el-input> -->
        </el-form-item>
        <div v-for="(item, i) in ruleForm.extend" :key="i" class="custio-mask-list">
          <div style="border-radius: 8px; background: #f0f5fa; width: calc(100% - 50px)">
            <el-form-item label="标题" prop="imageDescription" class="custom-title">
              <div>{{ item.formTitle }}</div>
            </el-form-item>
            <el-form-item label="内容" prop="imageDescription" class="custom-contnet">
              <div>{{ item.formText }}</div>
            </el-form-item>
          </div>
          <img
            src="../../assets/images/trash.png"
            alt=""
            @click="deleteCustom(item)"
            style="cursor: opinter"
          />
        </div>
        <el-form-item label="资料文件" prop="file">
          <div class="upload_file-list">
            <div class="file-title">文档</div>
            <el-upload
              class="upload-demo"
              style="width: calc(100% - 90px); max-width: 500px"
              :action="httpUrls.loginUrl + 'api/user/oss_upload'"
              :headers="headerData"
              :limit="10"
              :on-exceed="
                () => {
                  return $message.error('文件上传超出最大限制！');
                }
              "
              accept=".docx,.doc,.txt,.pdf,.xls,.xlsx,.pptx"
              :file-list="ruleForm.fileList"
              :data="requestFileList"
              :on-change="handleUploadChangeFileListFile"
              :on-success="handleSuccessFileListFile"
              :before-remove="beforeRemoveFileListFile"
              ref="fileList"
              multiple
              :auto-upload="true"
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
              :file-list="ruleForm.pictureList"
              :limit="10"
              :headers="headerData"
              :on-exceed="
                () => {
                  return $message.error('文件上传超出最大限制！');
                }
              "
              :data="requestPictureList"
              :on-change="handleUploadChangeFileListPicture"
              :on-success="handleSuccessFileListPicture"
              :before-remove="beforeRemoveFileListPicture"
              ref="pictureList"
              accept=".jpg,.jpeg,.png"
              multiple
              :auto-upload="true"
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

          <div class="upload_file-list">
            <div class="file-title">视频</div>
            <el-upload
              class="upload-demo"
              style="width: calc(100% - 90px); max-width: 500px"
              :action="httpUrls.loginUrl + 'api/user/oss_upload'"
              :file-list="ruleForm.videoList"
              :on-change="handleUploadChangeFileListVideo"
              :limit="10"
              :headers="headerData"
              :on-exceed="
                () => {
                  return $message.error('文件上传超出最大限制！');
                }
              "
              :on-success="handleSuccessFileListVideo"
              :before-remove="beforeRemoveFileListVideo"
              :data="requestVideoList"
              ref="videoList"
              accept=".flv,.rmvb,.mp4,.mvb"
              multiple
              :auto-upload="true"
            >
              <el-button
                size="small"
                type="primary"
                icon="el-icon-upload2"
                style="background-color: #1f64ff"
                >点击上传</el-button
              >
              <div slot="tip" class="el-upload__tip title_prompt">
                文件资料上传可包含，FLV、RMVB、MP4、MVB文件
              </div>
            </el-upload>
          </div>
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            style="background-color: #1f64ff; width: 390px"
            @click="submitForm('ruleForm')"
            v-if="!isCreateMe"
            >创建“我”</el-button
          >
          <el-button
            type="primary"
            style="background-color: #1f64ff; width: 390px"
            @click="submitForm('ruleForm')"
            v-else
            >确认修改</el-button
          >
          <div>
            <el-checkbox v-model="checkedArgee"></el-checkbox>
            同意<span style="color: #1f64ff; cursor: pointer" @click="agreeShow"
              >《{{ httpUrls.name }}用户隐私协议》</span
            >
          </div>
        </el-form-item>
      </el-form>
    </div>

    <el-dialog title="自定义资料添加" :visible.sync="dialogVisible" width="450">
      <div style="display: flex; align-items: center">
        <div style="width: 100px">标题</div>
        <el-input v-model="customTitle" placeholder="请输入内容"></el-input>
      </div>
      <div style="display: flex; align-items: center; margin-top: 20px">
        <div style="width: 100px">内容</div>
        <el-input
          v-model="customContent"
          placeholder="请输入内容"
          type="textarea"
          :autosize="{ minRows: 6, maxRows: 6 }"
          resize="none"
        ></el-input>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addCustomContent">确 定</el-button>
      </span>
    </el-dialog>

    <agree ref="Agree"></agree>
  </div>
</template>

<script>
import httpUrls from "../../api/requestURL";
import { createMentorMe, getRegions, updateMentorMe } from "../../api/mentor";
import Agree from "../../components/Agree";
export default {
  components: { Agree },
  name: "create-metor",
  data() {
    return {
      headerData: {},
      httpUrls,
      isCreateMe: false,
      checkedArgee: false,
      dialogVisible: false,
      customTitle: "",
      customContent: "",
      ruleForm: {
        photo: "",
        name: "",
        age: "",
        occupation: "",
        gender: "",
        education: "",
        major: "",
        hobbies: "",
        region: "",
        greeting: "",
        relationshipStatus: "",
        dream: "",
        income: "",
        imageDescription: "",
        // documentUrl: '',
        // imageUrl: '',
        // videoUrl: '',
        fileList: [],
        pictureList: [],
        videoList: [],
        extend: [],
      },
      rules: {
        photo: [{ required: true, message: "请上传一个图片", trigger: "change" }],
        name: [{ required: true, message: "请输入昵称", trigger: "blur" }],
      },
      genderList: [
        { value: 1, label: "男" },
        { value: 2, label: "女" },
      ],
      educationList: [
        { value: 1, label: "博士" },
        { value: 2, label: "硕士" },
        { value: 3, label: "本科" },
        { value: 4, label: "大专" },
        { value: 5, label: "高中" },
        { value: 6, label: "初中" },
        { value: 7, label: "小学" },
        { value: 8, label: "其他" },
      ],
      regionList: [],
      requestData: {
        image: null,
        image_name: null,
        oss_dir: "static",
        cate: "mentor_image-list",
      },
      requestFileList: {
        image: null,
        image_name: null,
        oss_dir: "static",
        cate: "mentor_file-list",
      },
      requestPictureList: {
        image: null,
        image_name: null,
        oss_dir: "static",
        cate: "mentor_photo-list",
      },
      requestVideoList: {
        image: null,
        image_name: null,
        oss_dir: "static",
        cate: "mentor_video-list",
      },
    };
  },

  mounted() {
    let userInfo = JSON.parse(localStorage.getItem("userInfo"));
    this.headerData.authorization = userInfo.token
    this.headerData.role = userInfo.role
    const OldEDIT_ME_ITEM_MSG = JSON.parse(sessionStorage.getItem("EDIT_ME_ITEM_MSG"));
    // OldEDIT_ME_ITEM_MSG[0].me
    const EDIT_ME_ITEM_MSG = OldEDIT_ME_ITEM_MSG[0]
      ? OldEDIT_ME_ITEM_MSG[0].me
      : OldEDIT_ME_ITEM_MSG;
    // console.log(EDIT_ME_ITEM_MSG,'---编辑我')
    if (EDIT_ME_ITEM_MSG) {
      this.isCreateMe = true;
      this.ruleForm = {
        photo: EDIT_ME_ITEM_MSG.photo,
        name: EDIT_ME_ITEM_MSG.name,
        age: Number(EDIT_ME_ITEM_MSG.age) || "",
        occupation: EDIT_ME_ITEM_MSG.occupation,
        gender: EDIT_ME_ITEM_MSG.gender == "3" ? "" : EDIT_ME_ITEM_MSG.gender,
        education: Number(EDIT_ME_ITEM_MSG.education),
        major: EDIT_ME_ITEM_MSG.major,
        hobbies: EDIT_ME_ITEM_MSG.hobbies,
        region: EDIT_ME_ITEM_MSG.region,
        greeting: EDIT_ME_ITEM_MSG.greeting,
        relationshipStatus: EDIT_ME_ITEM_MSG.relationship_status,
        dream: EDIT_ME_ITEM_MSG.dream,
        income: EDIT_ME_ITEM_MSG.income,
        imageDescription: EDIT_ME_ITEM_MSG.image_description,
        fileList: [],
        pictureList: [],
        videoList: [],
        extend: EDIT_ME_ITEM_MSG.extend != "" ? JSON.parse(EDIT_ME_ITEM_MSG.extend) : "",
      };

      let document_url = EDIT_ME_ITEM_MSG.document_url.split(",");
      if (document_url != "") {
        document_url.forEach((v) => {
          this.ruleForm.fileList.push({
            file_url: v,
            name: v,
          });
        });
      }
      let image_url = EDIT_ME_ITEM_MSG.image_url.split(",");
      if (image_url != "") {
        image_url.forEach((v) => {
          this.ruleForm.pictureList.push({
            file_url: v,
            name: v,
          });
        });
      }
      let video_url = EDIT_ME_ITEM_MSG.video_url.split(",");
      if (video_url != "") {
        video_url.forEach((v) => {
          this.ruleForm.videoList.push({
            file_url: v,
            name: v,
          });
        });
      }
    }
  },

  beforeDestroy() {
    sessionStorage.removeItem("EDIT_ME_ITEM_MSG");
  },

  created() {
    this.getRegions();
  },

  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          const userInfo = JSON.parse(localStorage.getItem("userInfo"));
          let documentUrl = "";
          this.ruleForm.fileList.forEach((v, i) => {
            documentUrl +=
              v.file_url + (i == this.ruleForm.fileList.length - 1 ? "" : ",");
          });
          let pictureList = "";
          this.ruleForm.pictureList.forEach((v, i) => {
            pictureList +=
              v.file_url + (i == this.ruleForm.pictureList.length - 1 ? "" : ",");
          });
          let videoList = "";
          this.ruleForm.videoList.forEach((v, i) => {
            videoList +=
              v.file_url + (i == this.ruleForm.videoList.length - 1 ? "" : ",");
          });
          let data = {
            user_id: userInfo.user_id,
            photo: this.ruleForm.photo,
            name: this.ruleForm.name,
            age: this.ruleForm.age || "0",
            occupation: this.ruleForm.occupation,
            gender: this.ruleForm.gender || "3",
            education: String(this.ruleForm.education) || "8",
            major: this.ruleForm.major,
            hobbies: this.ruleForm.hobbies,
            region: this.ruleForm.region,
            greeting: this.ruleForm.greeting,
            relationship_status: this.ruleForm.relationshipStatus,
            dream: this.ruleForm.dream,
            income: this.ruleForm.income,
            image_description: this.ruleForm.imageDescription,
            document_url: documentUrl,
            image_url: pictureList,
            video_url: videoList,
            extend: this.ruleForm.extend.length == 0 ? "" : this.ruleForm.extend,
          };
          if (!this.checkedArgee) {
            this.$message.error("请仔细阅读并勾选《" + httpUrls.name + "用户隐私协议》");
            return;
          }
          const EDIT_ME_ITEM_MSG = JSON.parse(sessionStorage.getItem("EDIT_ME_ITEM_MSG"));
          if (EDIT_ME_ITEM_MSG) {
            if (EDIT_ME_ITEM_MSG.me_id) {
              data.me_id = EDIT_ME_ITEM_MSG.me_id;
            } else {
              data.me_id = EDIT_ME_ITEM_MSG[0]["me"]["me_id"];
            }
            updateMentorMe(data).then((res) => {
              if (res.code == 20000) {
                this.$message.success("修改成功");
                setTimeout(() => {
                  this.$router.go(-1);
                }, 500);
              } else {
                this.$message.error("网络异常，请稍后重试");
              }
            });
          } else {
            createMentorMe(data).then((res) => {
              console.log(res);
              if (res.code == 20000) {
                this.$message.success("创建成功");
                setTimeout(() => {
                  this.$router.go(-1);
                }, 500);
              }
            });
          }
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },

    // 添加自定义内容
    addCustomContent() {
      this.ruleForm.extend.push({
        formTitle: this.customTitle,
        formText: this.customContent,
        id: this.ruleForm.extend.length,
      });
      this.customContent = "";
      this.customTitle = "";
      this.dialogVisible = false;
    },

    deleteCustom(item) {
      this.ruleForm.extend.forEach((v, i) => {
        if (item.id == v.id) {
          this.ruleForm.extend.splice(i, 1);
        }
      });
    },

    handleAvatarChange(file, fileList) {
      this.requestData.image = file.raw;
      this.requestData.image_name = file.name;
    },

    handleAvatarSuccess(res, file) {
      this.ruleForm.photo = res.data.new_url;
    },

    beforeAvatarUpload(file) {
      console.log(file.type);
      const isJPG =
        file.type === "image/png" ||
        file.type === "image/jpg" ||
        file.name.substring(file.name.lastIndexOf(".") + 1) == "jpg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 或 PNG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },

    // 上传资料文件/文件
    handleUploadChangeFileListFile(file, fileList) {
      this.requestFileList.image = file.raw;
      this.requestFileList.image_name = file.name;
    },
    // 成功的回调
    handleSuccessFileListFile(response, file, fileList) {
      this.ruleForm.fileList.push({
        file_url: response.data.new_url,
        name: response.data.name,
        file_name: response.data.name,
      });
    },
    beforeRemoveFileListFile(file, fileList) {
      console.log(file, fileList);
      this.ruleForm.fileList.forEach((v, i) => {
        if (v.uid == file.uid) {
          this.ruleForm.fileList.splice(i, 1);
        }
      });
    },

    // 上传资料文件/图片
    handleUploadChangeFileListPicture(file, fileList) {
      this.requestPictureList.image = file.raw;
      this.requestPictureList.image_name = file.name;
    },
    // 成功的回调
    handleSuccessFileListPicture(response, file, fileList) {
      this.ruleForm.pictureList.push({
        file_url: response.data.new_url,
        name: response.data.name,
        file_name: response.data.name,
      });
    },
    beforeRemoveFileListPicture(file, fileList) {
      this.ruleForm.pictureList.forEach((v, i) => {
        if (v.uid == file.uid) {
          this.ruleForm.pictureList.splice(i, 1);
        }
      });
    },

    // 上传资料文件/视频
    handleUploadChangeFileListVideo(file, fileList) {
      this.requestVideoList.image = file.raw;
      this.requestVideoList.image_name = file.name;
    },
    // 成功的回调
    handleSuccessFileListVideo(response, file, fileList) {
      this.ruleForm.videoList.push({
        file_url: response.data.new_url,
        name: response.data.name,
        file_name: response.data.name,
      });
    },
    beforeRemoveFileListVideo(file, fileList) {
      this.ruleForm.videoList.forEach((v, i) => {
        if (v.uid == file.uid) {
          this.ruleForm.videoList.splice(i, 1);
        }
      });
    },

    agreeShow() {
      this.$refs.Agree.agreeVisibleParent = true;
      this.$refs.Agree.agreeVisibleOne = true;
    },

    // 获取城市列表
    getRegions() {
      getRegions().then((res) => {
        this.regionList = res.data;
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.create-mentor {
  height: calc(100% - 20px);
}

.mask-mask {
  display: flex;
  justify-content: center;
  width: 100%;
  height: calc(100% - 90px);
  overflow-y: auto;
}

.go-back-page {
  display: flex;
  margin: 20px 0;

  .back {
    cursor: pointer;
  }
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
  margin-top: 4px;
  line-height: 32px;
  padding: 0 10px;
  width: 50px;
  text-align: center;
  margin-right: 20px;
}

.custio-mask-list {
  margin-bottom: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  .custom-title,
  .custom-contnet {
    margin-bottom: 0;
  }
}
</style>

<style lang="scss">
.menter-avatar-uploader .el-upload {
  border: 1px dashed #e5e6eb;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  width: 80px;
  height: 80px;
  line-height: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #f2f3f5;
}
.menter-avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.menter-avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  // width: 80px;
  // height: 80px;
  // line-height: 80px;
  text-align: center;
}
.menter-avatar {
  width: 80px;
  height: 80px;
  display: block;
}
</style>
