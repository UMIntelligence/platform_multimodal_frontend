<template>
  <!-- 
  项目或产品信息
 -->
  <div class="basic_information">
    <div
      style="
        display: flex;
        justify-content: space-between;
        max-width: 620px;
        margin-bottom: 20px;
      "
      v-if="isShow"
    >
      <div style="font-weight: bold; font-size: 14px; margin-left: 30px">
        产品{{ id }}
      </div>
      <img
        style="cursor: pointer"
        @click="deleteProduct"
        src="../../../assets/images/trash.png"
        alt=""
      />
    </div>
    <div style="min-width: 470px">
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="124px"
        class="demo-ruleForm basic_form"
      >
        <el-form-item label="类目名称" prop="categoryName">
          <el-input
            v-model="ruleForm.categoryName"
            style="max-width: 500px"
            placeholder="类目名称用于对产品进行分类和归类。（10字以内）"
            maxlength="10"
          ></el-input>
        </el-form-item>
        <el-form-item label="项目或产品名称" prop="productName">
          <el-input
            v-model="ruleForm.productName"
            style="max-width: 500px"
            placeholder="请输入项目名称（50字以内）"
            maxlength="50"
          ></el-input>
        </el-form-item>
        <el-form-item label="产品简介" prop="productProfile">
          <el-input
            type="textarea"
            :autosize="{ minRows: 3, maxRows: 6 }"
            v-model="ruleForm.productProfile"
            style="max-width: 500px"
            placeholder="请描述您的产品或项目100字内。尽力简洁有力"
            maxlength="100"
          ></el-input>
        </el-form-item>

        <el-form-item label="产品图片" prop="name">
          <el-upload
            :action="httpUrls.loginUrl + 'api/user/oss_upload'"
            list-type="picture-card"
            :on-change="handleUploadChangeMiniCode"
            :on-success="handleSuccessMiniCode"
            :limit="10"
            :headers="headerData"
            :auto-upload="true"
            ref="officialAccountList"
            :file-list="ruleForm.officialAccountList"
            :on-exceed="
              () => {
                return $message.error('文件上传超出最大限制！');
              }
            "
            style="max-width: 500px"
            accept=".png,.jpg,.jpeg"
            :data="requestOffcialAccpunt"
            class="upload-file-code"
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
                :src="httpUrls.ossUrl + file.file_url"
                alt=""
              />
              <span class="el-upload-list__item-actions">
                <span
                  class="el-upload-list__item-preview"
                  @click="handlePictureCardPreview(file)"
                >
                  <i class="el-icon-zoom-in"></i>
                </span>
                <span
                  v-if="!disabled"
                  class="el-upload-list__item-delete"
                  @click="handleRemove(file)"
                >
                  <i class="el-icon-delete"></i>
                </span>
              </span>
            </div>
          </el-upload>
          <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt="" />
          </el-dialog>
          <div class="title_prompt">请上传jpg/png文件，文件大小不超过5MB</div>
        </el-form-item>

        <el-form-item label="资料文件">
          <div
            style="display: flex; justify-content: flex-start; min-width: 470px"
          >
            <div style="width: 80%">
              <!-- <div class="label_title">资料文件</div> -->
              <div style="max-width: 500px">
                <div class="upload_file-list">
                  <div class="file-title">文档</div>
                  <el-upload
                    class="upload-demo"
                    style="width: calc(100% - 90px); max-width: 500px"
                    :on-exceed="
                      () => {
                        return $message.error('文件上传超出最大限制！');
                      }
                    "
                    :action="httpUrls.loginUrl + 'api/user/oss_upload'"
                    accept=".docx,.doc,.txt,.pdf,.xls,.xlsx,.pptx"
                    :file-list="ruleForm.fileList"
                    :data="requestFileList"
                    ref="fileList"
                    :headers="headerData"
                    :before-remove="handleRemoveProductFile"
                    multiple
                    :auto-upload="true"
                    :on-change="handleChangeProductFile"
                    :on-success="handleSuccessProductFile"
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
                    :on-exceed="
                      () => {
                        return $message.error('文件上传超出最大限制！');
                      }
                    "
                    :action="httpUrls.loginUrl + 'api/user/oss_upload'"
                    :file-list="ruleForm.pictureList"
                    :data="requestPictureList"
                    ref="pictureList"
                    accept=".jpg,.jpeg,.png"
                    multiple
                    :headers="headerData"
                    :before-remove="handleRemoveProductPicture"
                    :auto-upload="true"
                    :on-change="handleChangeProductPicture"
                    :on-success="handleSuccessProductPicture"
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
                <!-- 视频 -->
                <div class="upload_file-list" v-show="false">
                  <div class="file-title">视频</div>
                  <el-upload
                    class="upload-demo"
                    style="width: calc(100% - 90px); max-width: 500px"
                    :on-exceed="
                      () => {
                        return $message.error('文件上传超出最大限制！');
                      }
                    "
                    :action="httpUrls.loginUrl + 'api/user/oss_upload'"
                    :file-list="ruleForm.videoList"
                    :data="requestVideoList"
                    ref="videoList"
                    accept=".flv,.rmvb,.mp4,.mvb"
                    multiple
                    :auto-upload="true"
                    :limit="10"
                    :headers="headerData"
                    :on-change="handleChangeProductVideo"
                    :on-success="handleSuccessProductVideo"
                    :before-remove="handleRemoveProductVideo"
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
              </div>
            </div>
          </div>
        </el-form-item>
        <el-form-item label="网址">
          <div>
            <div
              v-for="(item, i) in ruleForm.networkAddressNumber"
              :key="i"
              style="
                display: flex;
                align-items: center;
                margin-bottom: 10px;
                position: relative;
              "
            >
              <el-input
                v-model="ruleForm.networkAddress[i]"
                placeholder="请输入您的网址"
                style="width: calc(100% - 150px)"
              ></el-input>
              <img
                v-if="ruleForm.networkAddressNumber > 1"
                src="../../../assets/images/trash.png"
                style="
                  position: absolute;
                  right: 160px;
                  top: 50%;
                  transform: translateY(-50%);
                  cursor: pointer;
                "
                @click="removeProductNetwork(i)"
              />
              <el-button
                v-if="i == 0"
                @click="
                  ruleForm.networkAddressNumber >= 10
                    ? (ruleForm.networkAddressNumber = 10)
                    : ruleForm.networkAddressNumber++
                "
                icon="el-icon-plus"
                class="addWebsite"
                >添加网址</el-button
              >
            </div>
          </div>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import httpUrls from "../../../api/requestURL";
export default {
  name: "product",
  data() {
    return {
      httpUrls,
      ruleForm: {
        categoryName: "",
        productName: "",
        productProfile: "",
        officialAccountList: [], // 产品图片列表
        fileList: [], // 文件列表
        pictureList: [], // 图片列表
        // videoList: [], // 视频列表
        networkAddress: [], // 网址列表
        networkAddressNumber: 1, // 网址数量/用于循环
        headerData: {}
      },

      rules: {
        // productName: [
        //   { required: true, message: '请输入项目或产品名称', trigger: 'blur' },
        // ],
        // productProfile: [
        //   { required: true, message: '请输入项目简介', trigger: 'blur' },
        // ],
      },
      dialogImageUrl: "",
      dialogVisible: false,
      disabled: false,

      // 图片列表
      requestOffcialAccpunt: {
        image: null,
        image_name: null,
        oss_dir: "static",
        cate: "Enterprise_customization-picture_list",
      },

      // 上传的文件列表
      requestFileList: {
        image: null,
        image_name: null,
        oss_dir: "static",
        cate: "Enterprise_customization-file_list",
      },
      // 上传的文件图片列表
      requestPictureList: {
        image: null,
        image_name: null,
        oss_dir: "static",
        cate: "Enterprise_customization-picture_list",
      },
      // 上传的视频列表
      requestVideoList: {
        image: null,
        image_name: null,
        oss_dir: "static",
        cate: "Enterprise_customization-video_list",
      },
    };
  },
  props: {
    // 数据
    data: {
      type: Object,
      default: () => {},
    },
    // 用于区分此新闻是否已添加到数组，未添加则添加，已添加则替换
    id: {
      type: Number,
      default: 0,
    },
    isShow: {
      type: Boolean,
      default: false,
    },
    // 用于校验产品或项目是否填写完毕
    randomProductNumber: {
      type: Number,
      default: 0,
    },
  },
  watch: {
    randomProductNumber: {
      deep: true,
      handler() {
        if (this.randomProductNumber != -1) {
          if (this.randomProductNumber == 10) {
            this.$emit("completewrite", {
              data: { ...this.ruleForm, id: this.id },
              type: "complete",
              id: this.id,
            });
          } else {
            this.$refs["ruleForm"].validate((valid) => {
              if (valid) {
                this.$emit("completewrite", {
                  data: { ...this.ruleForm, id: this.id },
                  type: "complete",
                  id: this.id,
                });
              }
            });
          }
        }
      },
    },
    data: {
      deep: true,
      handler() {
        if (Object.keys(this.data).length != 0) {
          this.ruleForm = this.data;
        }
      },
    },
  },
  mounted() {
    let userInfo = JSON.parse(localStorage.getItem("userInfo"));
    this.headerData.authorization = userInfo.token
    this.headerData.role = userInfo.role
    // 判断数据源是否为空
    if (Object.keys(this.data).length != 0) {
      this.ruleForm = this.data;
    }
  },
  beforeDestroy() {
    // 页面关闭前将数据传到父组件里面，type：用于区分数据来自关闭前或点击下一步，由于步骤条可点击且无需验证必填项
    this.$emit("completewrite", {
      data: { ...this.ruleForm, id: this.id },
      type: "destroy",
      id: this.id,
    });
  },
  methods: {
    handlePictureCardPreview(file) {
      this.dialogImageUrl = httpUrls.ossUrl + file.file_url;
      this.dialogVisible = true;
    },

    // 上传小程序二维码
    handleUploadChangeMiniCode(file, fileList) {
      this.requestOffcialAccpunt.image = file.raw;
      this.requestOffcialAccpunt.image_name = file.name;
    },
    // 成功的回调
    handleSuccessMiniCode(response, file, fileList) {
      this.ruleForm.officialAccountList.push({
        name: response.data.name,
        file_url: response.data.new_url,
      });
    },
    handleRemove(file) {
      this.ruleForm.officialAccountList.forEach((v, i) => {
        if (v.uid == file.uid) {
          this.ruleForm.officialAccountList.splice(i, 1);
        }
      });
    },

    deleteProduct() {
      this.$emit("deleteproduct", this.id);
    },

    /**
     * 产品上传文件
     */
    // 产品/文件列表
    handleChangeProductFile(file, fileList) {
      this.requestFileList.image = file.raw;
      this.requestFileList.image_name = file.name;
    },
    handleSuccessProductFile(response, file, fileList) {
      if (response.code == 20000) {
        this.ruleForm.fileList.push({
          name: response.data.name,
          file_name: response.data.name,
          file_url: response.data.new_url,
        });
      } else {
        this.$message.error(response.msg);
      }
      this.requestFileList.image = null;
      this.requestFileList.image_name = null;
    },
    handleRemoveProductFile(file, fileList) {
      this.ruleForm.fileList.forEach((v, i) => {
        if (v.uid == file.uid) {
          this.ruleForm.fileList.splice(i, 1);
        }
      });
    },

    // 产品/图片列表
    handleChangeProductPicture(file, fileList) {
      this.requestPictureList.image = file.raw;
      this.requestPictureList.image_name = file.name;
    },
    handleSuccessProductPicture(response, file, fileList) {
      if (response.code == 20000) {
        this.ruleForm.pictureList.push({
          name: response.data.name,
          file_name: response.data.name,
          file_url: response.data.new_url,
        });
      } else {
        this.$message.error(response.msg);
      }
      this.requestPictureList.image = null;
      this.requestPictureList.image_name = null;
    },
    handleRemoveProductPicture(file, fileList) {
      this.ruleForm.pictureList.forEach((v, i) => {
        if (v.uid == file.uid) {
          this.ruleForm.pictureList.splice(i, 1);
        }
      });
    },

    // 产品/视频列表
    handleChangeProductVideo(file, fileList) {
      this.requestVideoList.image = file.raw;
      this.requestVideoList.image_name = file.name;
    },
    handleSuccessProductVideo(response, file, fileList) {
      if (response.code == 20000) {
        this.ruleForm.videoList.push({
          name: response.data.name,
          file_name: response.data.name,
          file_url: response.data.new_url,
        });
      } else {
        this.$message.error(response.msg);
      }
      this.requestVideoList.image = null;
      this.requestVideoList.image_name = null;
    },
    handleRemoveProductVideo(file, fileList) {
      this.ruleForm.videoList.forEach((v, i) => {
        if (v.uid == file.uid) {
          this.ruleForm.videoList.splice(i, 1);
        }
      });
    },

    removeProductNetwork(i) {
      this.ruleForm.networkAddress.splice(i, 1);
      this.ruleForm.networkAddressNumber--;
    },
  },
};
</script>
<style scoped>
.addWebsite {
  background: #3363F6;
  border-radius: 8px 8px 8px 8px;
  padding: 13px 29px;
  font-weight: bold;
  font-size: 14px;
  color: #FFFFFF;
  margin-left: 16px;
}
.enterprise-detail {
  background-color: #fff;
}

.basic_information {
  display: flex;
  justify-content: center;
  width: 88%;
  flex-direction: column;
}

.basic_information .first-title {
  text-align: center;
  color: #000;
  font-size: 24px;
  font-weight: 400;
  margin-bottom: 30px;
}

.success-round {
  background-color: #e8f3ff;
  color: #165dff;
  width: 16px;
  height: 16px;
  line-height: 16px;
  padding: 2px;
  text-align: center;
  border-radius: 50%;
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

.title_prompt {
  color: #9a9a9a;
  font-size: 14px;
  font-weight: 400;
  line-height: 20px;
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
  width: 50px;
  text-align: center;
  padding: 0 10px;
  margin-right: 20px;
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

.form_item-title label {
  color: #000;
  font-size: 22px;
  font-weight: 500;
}
</style>