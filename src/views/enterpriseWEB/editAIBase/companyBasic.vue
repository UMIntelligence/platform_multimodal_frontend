<template>
  <div style="min-width: 470px">
    <!-- <div class="first-title">企业信息</div> -->
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="120px"
      class="demo-ruleForm basic_form"
    >
      <el-form-item
        label="企业信息"
        prop="lianxi"
        class="form_item-title"
        style="margin-top: 22px;"
      ></el-form-item>
      <el-form-item label="公司全称" prop="companyName">
        <el-input
          v-model="ruleForm.companyName"
          style="max-width: 500px"
          maxlength="50"
          placeholder="请输入您的公司名称（50字以内）"
        ></el-input>
      </el-form-item>
      <el-form-item label="公司简称" prop="companyAbbreviation">
        <el-input
          v-model="ruleForm.companyAbbreviation"
          style="max-width: 500px"
          maxlength="50"
          placeholder="请输入公司简称(50字以内）"
        ></el-input>
      </el-form-item>
      <el-form-item label="职位" prop="position">
        <el-input
          v-model="ruleForm.position"
          style="max-width: 500px"
          placeholder="请输入职位"
        ></el-input>
      </el-form-item>
      <el-form-item label="公司网址" prop="position">
        <el-input
          v-model="ruleForm.companyWebAddress"
          style="max-width: 500px"
          placeholder="请输入公司网址"
        ></el-input>
      </el-form-item>
      <el-form-item label="行业/赛道" prop="industry">
        <el-select
          v-model="ruleForm.industry"
          placeholder="请选择"
          style="width: 100%; max-width: 500px"
        >
          <el-option
            v-for="item in options"
            :key="item.label_code"
            :label="item.label"
            :value="item.label_code"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="注册地址" prop="registerAddress">
        <el-input
          v-model="ruleForm.registerAddress"
          style="max-width: 500px"
          placeholder="请填写注册地址"
        ></el-input>
      </el-form-item>
      <el-form-item label="公司描述" prop="companyDescribe">
        <el-input
          type="textarea"
          :autosize="{ minRows: 3, maxRows: 6 }"
          v-model="ruleForm.companyDescribe"
          style="max-width: 500px"
          maxlength="5000"
          placeholder="请描述下公司发展阶段5000字内"
        ></el-input>
      </el-form-item>
      <el-form-item label="ICP备案号" prop="ICPNumber">
        <el-input
          v-model="ruleForm.ICPNumber"
          style="max-width: 500px"
          placeholder="请输入备案号"
        ></el-input>
      </el-form-item>

      <el-form-item
        label="联系方式"
        prop="lianxi"
        class="form_item-title"
      ></el-form-item>
      <el-form-item label="联系电话" prop="phone">
        <el-input
          v-model="ruleForm.phone"
          style="max-width: 500px"
          placeholder="请输入联系电话"
        ></el-input>
      </el-form-item>
      <el-form-item label="联系邮箱" prop="email">
        <el-input
          v-model="ruleForm.email"
          style="max-width: 500px"
          placeholder="请输入联系邮箱"
        ></el-input>
      </el-form-item>
      <el-form-item label="公司地址" prop="companyAddress">
        <el-input
          v-model="ruleForm.companyAddress"
          style="max-width: 500px"
          placeholder="请输入公司地址"
        ></el-input>
      </el-form-item>

      <div style="display: flex; justify-content: center; margin: 20px 0">
        <el-button
          style="padding: 5px 20px; font-size: 18px"
          @click="nextStepForm('ruleForm')"
          >保存</el-button
        >
      </div>

      <el-form-item label="小程序二维码" prop="name">
        <el-upload
          style="max-width: 500px"
          :action="httpUrls.loginUrl + 'api/user/oss_upload'"
          accept=".png,.jpg,.jpeg"
          :on-change="handleUploadChangeMiniCode"
          :on-success="handleSuccessMiniCode"
          list-type="picture-card"
          :headers="headerData"
          :limit="1"
          :on-exceed="
            () => {
              return $message.error('文件上传超出最大限制！');
            }
          "
          :auto-upload="true"
          ref="miniCodeList"
          :file-list="ruleForm.miniCodeList"
          :data="requestMiniCode"
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
                @click="handleRemoveMiniCode(file)"
              >
                <i class="el-icon-delete"></i>
              </span>
            </span>
          </div>
        </el-upload>
        <div class="title_prompt">请上传jpg/png文件，文件大小不超过5MB</div>
        <!-- <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="dialogImageUrl" alt="">
        </el-dialog> -->
      </el-form-item>

      <el-form-item label="公众号二维码" prop="name">
        <el-upload
          style="max-width: 500px"
          :action="httpUrls.loginUrl + 'api/user/oss_upload'"
          list-type="picture-card"
          :auto-upload="true"
          :headers="headerData"
          :limit="1"
          :on-exceed="
            () => {
              return $message.error('文件上传超出最大限制！');
            }
          "
          accept=".png,.jpg,.jpeg"
          ref="officialAccountList"
          :on-change="handleUploadChangeOfficialAccount"
          :on-success="handleSuccessOfficialAccount"
          :file-list="ruleForm.officialAccountList"
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
                @click="handleRemoveOfficialAccount(file)"
              >
                <i class="el-icon-delete"></i>
              </span>
            </span>
          </div>
        </el-upload>
        <!-- <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="dialogImageUrl" alt="">
        </el-dialog> -->
        <div class="title_prompt">请上传jpg/png文件，文件大小不超过5MB</div>
      </el-form-item>
      <el-form-item label="公司logo" prop="name">
        <el-upload
          style="max-width: 500px"
          :action="httpUrls.loginUrl + 'api/user/oss_upload'"
          list-type="picture-card"
          :auto-upload="true"
          :headers="headerData"
          :limit="1"
          :on-exceed="
            () => {
              return $message.error('文件上传超出最大限制！');
            }
          "
          accept=".png,.jpg,.jpeg"
          ref="companyLogoList"
          :on-change="handleUploadChangeCompanyLogo"
          :on-success="handleSuccessCompanyLogo"
          :file-list="ruleForm.companyLogoList"
          :data="requestCompanyLogo"
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
                @click="handleRemoveCompanyLogo(file)"
              >
                <i class="el-icon-delete"></i>
              </span>
            </span>
          </div>
        </el-upload>
        <!-- <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="dialogImageUrl" alt="">
        </el-dialog> -->
        <div class="title_prompt">请上传jpg/png文件，文件大小不超过5MB</div>
      </el-form-item>
      <el-form-item label="公司图片" prop="name">
        <el-upload
          style="max-width: 500px"
          :action="httpUrls.loginUrl + 'api/user/oss_upload'"
          list-type="picture-card"
          :auto-upload="true"
          :headers="headerData"
          :limit="10"
          :on-exceed="
            () => {
              return $message.error('文件上传超出最大限制！');
            }
          "
          accept=".png,.jpg,.jpeg"
          ref="companyPictureList"
          :on-change="handleUploadChangeCompanyPicture"
          :on-success="handleSuccessCompanyPicture"
          :file-list="ruleForm.companyPictureList"
          :data="requestCompanyPicture"
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
                @click="handleRemoveCompanyPicture(file)"
              >
                <i class="el-icon-delete"></i>
              </span>
            </span>
          </div>
        </el-upload>
        <!-- <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="dialogImageUrl" alt="">
        </el-dialog> -->
        <div class="title_prompt">请上传jpg/png文件，文件大小不超过5MB</div>
      </el-form-item>

      <el-form-item label="资料文件" prop="name">
        <div class="upload_file-list">
          <div class="file-title">文档</div>
          <!-- <upload-file-file
            key="file"
            style="width: calc(100% - 90px);max-width: 500px;"
            :data="requestFileList"
            :fileList="ruleForm.fileList"
            :source="'file'"
            :limit="10"
            :accept="'.docx,.doc,.txt,.pdf,.xls,.xlsx,.pptx'"
            :title="'文件资料上传可包含，DOC、XISX、PPT、TXT、PDF文件'"
            @adduploadfile="addUploadFile"
            @removeuploadfile="removeUploadFile">
          </upload-file-file> -->

          <el-upload
            class="upload-demo"
            style="width: calc(100% - 90px); max-width: 500px"
            :action="httpUrls.loginUrl + 'api/user/oss_upload'"
            :limit="10"
            :headers="headerData"
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
          <!-- <upload-file-picture
            key="picture"
            style="width: calc(100% - 90px);max-width: 500px;"
            :data="requestPictureList"
            :fileList="ruleForm.pictureList"
            :source="'picture'"
            :limit="10"
            :accept="'.jpg,.jpeg,.png'"
            :title="'文件资料上传可包含，JPG、PNG文件'"
            @adduploadfile="addUploadFile"
            @removeuploadfile="removeUploadFile">
          </upload-file-picture> -->

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
        <!-- 视频 -->
        <div class="upload_file-list" v-show="false">
          <div class="file-title">视频</div>
          <!-- <upload-file-video
            key="video"
            style="width: calc(100% - 90px);max-width: 500px;"
            :data="requestVideoList"
            :fileList="ruleForm.videoList"
            :source="'video'"
            :limit="10"
            :accept="'.flv,.rmvb,.mp4,.mvb'"
            :title="'文件资料上传可包含，FLV、RMVB、MP4、MVB文件'"
            @adduploadfile="addUploadFile"
            @removeuploadfile="removeUploadFile">
          </upload-file-video> -->

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

      <el-form-item label="网址">
        <div
          v-for="(item, i) in networkAddressNumber"
          :key="i"
          style="
            display: flex;
            align-items: center;
            margin-bottom: 10px;
            position: relative;
          "
        >
          <el-input
            v-model="networkAddress[i]"
            placeholder="请输入您的网址"
            style="width: calc(100% - 79px)"
          ></el-input>
          <img
            v-if="networkAddressNumber > 1"
            src="../../../assets/images/trash.png"
            style="position: absolute; right: 89px; top: 50%; transform: translateY(-50%)"
            @click="removeNetwork(i)"
          />
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
      </el-form-item>
      <!-- <el-form-item> -->
      <div style="width: 80%; display: flex; justify-content: center; margin: 0 auto">
        <el-button @click="nextStepForm('ruleForm', 'nextStep')" style="width: 30%"
          >下一步</el-button
        >
        <el-button
          type="primary"
          style="width: 60%; background-color: #1f64ff"
          @click="nextStepForm('ruleForm')"
          >保存</el-button
        >
      </div>
      <!-- </el-form-item> -->
    </el-form>

    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImageUrl" alt="" />
    </el-dialog>
  </div>
</template>

<script>
import httpUrls from "../../../api/requestURL";

import { mapGetters } from "vuex";
import { enterpriseLabel, companyBasicMsg } from "../../../api/chatMG";

import uploadFile from "../../../components/uploadFile/uploadFile";

export default {
  name: "companyBasic",
  data() {
    return {
      httpUrls: httpUrls,
      options: [],
      ruleForm: {
        companyName: "",
        companyAbbreviation: "",
        position: "",
        companyWebAddress: "",
        industry: "",
        registerAddress: "",
        companyDescribe: "",
        ICPNumber: "",
        phone: "",
        email: "",
        companyAddress: "",
        miniCodeList: [], // 小程序二维码
        officialAccountList: [], // 公众号二维码
        companyLogoList: [], // 公司logo
        companyPictureList: [], // 公司图片
        fileList: [], // 文件列表
        pictureList: [], // 图片列表
        // videoList: [], // 视频列表
      },
      networkAddress: [],
      networkAddressNumber: 1,
      rules: {
        // companyName: [{ required: true, message: "请输入您的公司名称", trigger: "blur" }],
        // companyAbbreviation: [
        //   { required: true, message: "请输入您的公司简称", trigger: "blur" },
        // ],
      },
      dialogImageUrl: "",
      dialogVisible: false,
      disabled: false,

      // 小程序二维码列表
      requestMiniCode: {
        image: null,
        image_name: null,
        oss_dir: "static",
        cate: "Enterprise_customization-mini_code",
      },
      // 公众号列表
      requestOffcialAccpunt: {
        image: null,
        image_name: null,
        oss_dir: "static",
        cate: "Enterprise_customization-official_account",
      },
      // 公司logo列表
      requestCompanyLogo: {
        image: null,
        image_name: null,
        oss_dir: "static",
        cate: "Enterprise_customization-company_logo",
      },
      // 公司图片列表
      requestCompanyPicture: {
        image: null,
        image_name: null,
        oss_dir: "static",
        cate: "Enterprise_customization-company_picture",
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
      headerData: {}
    };
  },

  props: {
    data: {
      type: Object,
      default: () => {},
    },
    companyCode: {
      type: String,
      default: "",
    },
  },

  watch: {
    ruleForm: {
      deep: true,
      handler() {
        this.$store.dispatch("app/changeSubmitCompany", "1");
      },
    },
    companyDataMessage: {
      deep: true,
      handler() {
        this.defaultMsg();
      },
    },
    submitCompany: {
      deep: true,
      handler() {
        if (this.submitCompany == "1") {
          window.onbeforeunload = (e) => {
            e.returnValue = "离开？";
            return e.preventDefault();
          };
          // window.addEventListener('beforeunload', this.beforeunLoadHandle)
        } else {
          window.onbeforeunload = null;
          // window.removeEventListener('beforeunload', this.beforeunLoadHandle)
        }
      },
    },
  },

  components: {
    uploadFileFile: uploadFile,
    uploadFilePicture: uploadFile,
    uploadFileVideo: uploadFile,
  },

  computed: {
    ...mapGetters(["submitCompany", "companyDataMessage"]),
  },

  created() {
    enterpriseLabel("1").then((res) => {
      this.options = res.data.data;
    });
  },

  mounted() {
    this.defaultMsg();
    let userInfo = JSON.parse(localStorage.getItem("userInfo"));
    this.headerData.authorization = userInfo.token
    this.headerData.role = userInfo.role
  },

  beforeDestroy() {
    this.$emit("nextstep", { data: this.ruleForm, type: "destroy", action: "save" });
  },

  methods: {
    // 已填写的信息回溯
    defaultMsg() {
      if (
        Object.keys(this.companyDataMessage).length != 0 &&
        Object.keys(this.companyDataMessage.basicData).length != 0
      ) {
        for (const key in this.companyDataMessage.basicData) {
          this.ruleForm[key] = this.companyDataMessage.basicData[key];
        }
        this.ruleForm.pictureList.forEach((v) => {
          v.name = v.file_name;
        });
        // this.ruleForm.videoList.forEach((v) => {
        //   v.name = v.file_name;
        // });
        this.ruleForm.fileList.forEach((v) => {
          v.name = v.file_name;
        });
        let networkAddress = [];
        this.companyDataMessage.basicData.networkAddress.forEach((v) => {
          networkAddress.push(v.file_url);
        });
        this.networkAddress = networkAddress;
        this.networkAddressNumber =
          this.companyDataMessage.basicData.networkAddress.length || 1;
      }
    },

    // 上传的组件回调
    addUploadFile(data) {
      console.log(data, data.source);
      if (data.source == "file") {
        this.ruleForm.fileList.push({
          file_url: data.new_url,
          name: data.name,
          file_name: data.name,
          uid: data.uid,
        });
      } else if (data.source == "picture") {
        this.ruleForm.pictureList.push({
          file_url: data.new_url,
          name: data.name,
          file_name: data.name,
          uid: data.uid,
        });
      } else if (data.source == "video") {
        this.ruleForm.videoList.push({
          file_url: data.new_url,
          name: data.name,
          file_name: data.name,
          uid: data.uid,
        });
      }
    },

    // 删除的组件回调
    removeUploadFile(data) {
      console.log(data);
      if (data.source == "file") {
        this.ruleForm.fileList.forEach((v, i) => {
          console.log(v.uid, data.uid);
          if (v.uid == data.uid) {
            this.ruleForm.fileList.splice(i, 1);
          }
        });
      } else if (data.source == "picture") {
        this.ruleForm.pictureList.forEach((v, i) => {
          console.log(v.uid, data.uid);
          if (v.uid == data.uid) {
            this.ruleForm.pictureList.splice(i, 1);
          }
        });
      } else if (data.source == "video") {
        // this.ruleForm.videoList.forEach((v, i) => {
        //   console.log(v.uid, data.uid);
        //   if (v.uid == data.uid) {
        //     this.ruleForm.videoList.splice(i, 1);
        //   }
        // });
      }
    },
    // 上传小程序二维码
    handleUploadChangeMiniCode(file, fileList) {
      this.requestMiniCode.image = file.raw;
      this.requestMiniCode.image_name = file.name;
    },
    // 成功的回调
    handleSuccessMiniCode(response, file, fileList) {
      this.ruleForm.miniCodeList.push({
        name: response.data.name,
        file_url: response.data.new_url,
      });
    },
    handleRemoveMiniCode(file) {
      this.ruleForm.miniCodeList.forEach((v, i) => {
        if (v.uid == file.uid) {
          this.ruleForm.miniCodeList.splice(i, 1);
        }
      });
    },

    // 上传公众号二维码
    handleUploadChangeOfficialAccount(file, fileList) {
      this.requestOffcialAccpunt.image = file.raw;
      this.requestOffcialAccpunt.image_name = file.name;
    },
    // 成功的回调
    handleSuccessOfficialAccount(response, file, fileList) {
      this.ruleForm.officialAccountList.push({
        name: response.data.name,
        file_url: response.data.new_url,
      });
    },
    handleRemoveOfficialAccount(file) {
      this.ruleForm.officialAccountList.forEach((v, i) => {
        if (v.uid == file.uid) {
          this.ruleForm.officialAccountList.splice(i, 1);
        }
      });
    },

    // 上传公司Logo
    handleUploadChangeCompanyLogo(file, fileList) {
      this.requestCompanyLogo.image = file.raw;
      this.requestCompanyLogo.image_name = file.name;
    },
    // 成功的回调
    handleSuccessCompanyLogo(response, file, fileList) {
      this.ruleForm.companyLogoList.push({
        name: response.data.name,
        file_url: response.data.new_url,
      });
    },
    handleRemoveCompanyLogo(file) {
      this.ruleForm.companyLogoList.forEach((v, i) => {
        if (v.uid == file.uid) {
          this.ruleForm.companyLogoList.splice(i, 1);
        }
      });
    },

    // 上传公司图片
    handleUploadChangeCompanyPicture(file, fileList) {
      this.requestCompanyPicture.image = file.raw;
      this.requestCompanyPicture.image_name = file.name;
    },
    // 成功的回调
    handleSuccessCompanyPicture(response, file, fileList) {
      this.ruleForm.companyPictureList.push({
        name: response.data.name,
        file_url: response.data.new_url,
      });
    },
    handleRemoveCompanyPicture(file) {
      this.ruleForm.companyPictureList.forEach((v, i) => {
        if (v.uid == file.uid) {
          this.ruleForm.companyPictureList.splice(i, 1);
        }
      });
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
      // this.ruleForm.videoList.forEach((v, i) => {
      //   if (v.uid == file.uid) {
      //     this.ruleForm.videoList.splice(i, 1);
      //   }
      // });
    },

    // 下一步
    submitForm(formName) {
      this.$emit("nextstep", { data: this.ruleForm, type: "complete", action: "save" });
    },

    // 保存
    nextStepForm(formName, isSetp = "") {
      if (isSetp == "nextStep") {
        this.submitForm();
      }
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let miniCodeList = [];
          this.ruleForm.miniCodeList.forEach((v) => {
            miniCodeList.push({
              file_name: v.name,
              file_url: v.file_url,
            });
          });
          let officialAccountList = [];
          this.ruleForm.officialAccountList.forEach((v) => {
            officialAccountList.push({
              file_name: v.name,
              file_url: v.file_url,
            });
          });
          let companyLogoList = [];
          this.ruleForm.companyLogoList.forEach((v) => {
            companyLogoList.push({
              file_name: v.name,
              file_url: v.file_url,
            });
          });
          let companyPictureList = [];
          this.ruleForm.companyPictureList.forEach((v) => {
            companyPictureList.push({
              file_name: v.name,
              file_url: v.file_url,
            });
          });

          let fileList = [];
          this.ruleForm.fileList.forEach((v) => {
            fileList.push({
              file_name: v.name,
              file_url: v.file_url,
            });
          });
          let pictureList = [];
          this.ruleForm.pictureList.forEach((v) => {
            pictureList.push({
              file_name: v.name,
              file_url: v.file_url,
            });
          });
          let videoList = [];
          // this.ruleForm.videoList.forEach((v) => {
          //   videoList.push({
          //     file_name: v.name,
          //     file_url: v.file_url,
          //   });
          // });
          let networkAddress = [];
          this.networkAddress.forEach((v) => {
            networkAddress.push({
              file_name: v,
              file_url: v,
            });
          });
          let data = {
            action: "save",
            company_name: this.ruleForm.companyName, // 公司名称
            company_abbreviation: this.ruleForm.companyAbbreviation, // 公司简称
            position: this.ruleForm.position, // 职位
            industry_code: this.ruleForm.industry, // 行业编号
            registered_address: this.ruleForm.registerAddress, // 注册地址
            company_desc: this.ruleForm.companyDescribe, // 公司描述
            company_url: this.ruleForm.companyWebAddress, // 公司网址
            ipc_code: this.ruleForm.ICPNumber, // ipc备案号
            company_mailbox: this.ruleForm.email, // 公司邮箱
            company_address: this.ruleForm.companyAddress, // 公司地址
            company_mobile: this.ruleForm.phone, // 公司电话
            company_applet_list: miniCodeList, // 公司小程序图片列表
            company_official_account_list: officialAccountList, // 公司公众号
            company_log_list: companyLogoList, // 公司log
            company_image_list: companyPictureList, // 公司图片
            file_list: fileList, // 资料文件
            image_list: pictureList, // 资料图片
            vlog_list: videoList, // 资料视频
            website_list: networkAddress, // 资料网址
            company_code: "",
          };
          if (
            this.companyCode != "" &&
            this.companyCode != null &&
            this.companyCode != "null"
          ) {
            console.log(typeof this.companyCode, this.companyCode != null, "进入判断");
            data.company_code = this.companyCode;
          }

          companyBasicMsg(data).then((res) => {
            this.$store.dispatch("app/changeSubmitCompany", "2");
            if (res.code == 20000) {
              this.$message.success("保存成功");
              this.$emit("nextstep", {
                data: this.ruleForm,
                type: isSetp,
                action: "save",
              });
            } else {
              this.$message.error(res.msg);
            }
            console.log(res);
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },

    // 查看大图
    handlePictureCardPreview(file) {
      this.dialogImageUrl = httpUrls.ossUrl + file.file_url;
      this.dialogVisible = true;
    },

    // beforeunLoadHandle(event) {
    //   event.preventDefault();
    //   event.returnValue = '离开？'
    // },

    removeNetwork(i) {
      this.networkAddress.splice(i, 1);
      this.networkAddressNumber--;
    },
  },
};
</script>

<style scoped>
.enterprise-detail {
  background-color: #fff;
}

.basic_information {
  display: flex;
  justify-content: center;
}

.basic_information .first-title {
  text-align: center;
  color: #000;
  font-size: 24px;
  font-weight: 400;
  margin-top: 42px;
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
  padding: 0 10px;
  width: 50px;
  text-align: center;
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
  font-size: 20px;
  font-weight: bold;
  margin-top: 18px;
  margin-bottom: 8px;
}
</style>
