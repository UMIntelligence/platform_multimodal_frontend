<template>
  <div class="main">
    <!-- 顶部导航栏 -->
    <div class="nav">
      <div class="goBack" @click="$router.go(-1)">
        <i class="el-icon-arrow-left"></i>
        <div>返回</div>
      </div>
      <div class="base">
  
      </div>
    </div>
    <!-- 内容 -->
    <div class="container">
      <template>
        <!-- 步骤条 -->
        <div class="container-top">
          <div class="container-top-box" @click="active = 0">
            <div class="item" :class="active >= 0 ? 'active-item' : ''">1</div>
            <div class="text" :class="active >= 0 ? 'active-text' : ''">
              填写企业信息
            </div>
          </div>
          <div class="line" :class="active > 0 ? 'active-item' : ''"></div>
          <div class="container-top-box" @click="active = 1">
            <div class="item" :class="active >= 1 ? 'active-item' : ''">2</div>
            <div class="text" :class="active >= 1 ? 'active-text' : ''">
              填写项目或产品信息
            </div>
          </div>
          <div class="line" :class="active > 1 ? 'active-item' : ''"></div>
          <div class="container-top-box" @click="active = 2">
            <div class="item" :class="active >= 2 ? 'active-item' : ''">3</div>
            <div class="text" :class="active >= 2 ? 'active-text' : ''">
              填写资讯信息
            </div>
          </div>
          <div class="line" :class="active > 2 ? 'active-item' : ''"></div>
          <div class="container-top-box" @click="active = 3">
            <div class="item" :class="active >= 3 ? 'active-item' : ''">4</div>
            <div class="text" :class="active >= 3 ? 'active-text' : ''">
              填写企业专属知识库
            </div>
          </div>
        </div>
        <!-- 企业基本信息 -->
        <div class="container-form" v-if="active == 0">
          <company-basic
            @nextstep="nextStep"
            :data="companyBasicMsg.basicData"
            :companyCode="company_code"
          ></company-basic>
        </div>
        <!-- 项目或产品信息 -->
        <div class="container-form" v-if="active == 1">
          <div class="first-title">项目或产品信息</div>
          <product
            v-for="(item, i) in productNumber"
            :key="i"
            :randomProductNumber="randomProductNumber"
            :id="item"
            :isShow="productNumber == 1 ? false : true"
            @completewrite="completeWrite"
            :data="companyBasicMsg.productData[item - 1] || {}"
            @deleteproduct="deleteProduct"
          ></product>
          <div style="display: flex; justify-content: center">
            <el-button
              icon="el-icon-circle-plus"
              style="color: #1f64ff; border-color: #1f64ff; width: 334px"
              @click="productNumber++"
              >添加产品</el-button
            >
          </div>
          <div
            style="
              max-width: 500px;
              min-width: 470px;
              display: flex;
              justify-content: center;
              margin: 60px auto 0 auto;
            "
          >
            <el-button @click="completeProductWrite('prev')" style="width: 25%"
              >上一步</el-button
            >
            <el-button @click="completeProductWrite('next')" style="width: 25%"
              >下一步</el-button
            >
            <el-button
              @click="completeProductWrite('submit')"
              type="primary"
              style="background-color: #1f64ff; width: 50%"
              >保存</el-button
            >
          </div>
        </div>
        <!-- 资讯信息 -->
        <div class="container-form" v-if="active == 2">
          <div class="first-title">资讯信息</div>
          <news-information
            v-for="(item, i) in newsNumber"
            :key="i"
            :randomNewsNumber="randomNewsNumber"
            :id="item"
            :isShow="newsNumber == 1 ? false : true"
            @comletenewswrite="comleteNewsWrite"
            @deletenews="deleteNews"
            :data="companyBasicMsg.newsData[item - 1] || {}"
          ></news-information>
          <div style="display: flex; justify-content: center">
            <el-button
              icon="el-icon-circle-plus"
              style="color: #1f64ff; border-color: #1f64ff; width: 334px"
              @click="newsNumber++"
              >添加信息模块</el-button
            >
          </div>

          <div
            style="
              max-width: 500px;
              min-width: 470px;
              display: flex;
              justify-content: center;
              margin: 60px auto 0 auto;
            "
          >
            <el-button @click="completeNewsWrite('prev')" style="width: 25%"
              >上一步</el-button
            >
            <el-button @click="completeNewsWrite('next')" style="width: 25%"
              >下一步</el-button
            >
            <el-button
              @click="completeNewsWrite('submit')"
              type="primary"
              style="background-color: #1f64ff; width: 50%"
              >保存</el-button
            >
          </div>
        </div>
        <!-- 项目或产品信息 -->
        <div class="container-form" v-if="active == 3">
          <div class="first-title">企业专属知识库</div>
          <knowledge-base
            v-for="(item, i) in companyBasicMsg.baseData"
            :key="i"
            :randomBaseNumber="randomBaseNumber"
            :id="i"
            :isShow="companyBasicMsg.baseData.length == 1 ? false : true"
            @comletebasedata="comleteBaseData"
            @deletebase="deleteBase"
            :data="item || {}"
          ></knowledge-base>
          <div style="display: flex; justify-content: center">
            <el-button
              icon="el-icon-circle-plus"
              style="color: #1f64ff; border-color: #1f64ff; width: 334px"
              @click="addDataBase"
              >添加知识库模块</el-button
            >
          </div>
          <div
            style="
              max-width: 500px;
              min-width: 470px;
              display: flex;
              justify-content: center;
              margin: 60px auto 0 auto;
            "
          >
            <el-button @click="completeBaseWrite('prev')" style="width: 30%"
              >上一步</el-button
            >
            <el-button
              @click="completeBaseWrite('next')"
              type="primary"
              style="background-color: #1f64ff; width: 60%"
              >保存</el-button
            >
          </div>
        </div>
      </template>
      <!-- 创建知识库成功页面 -->
      <div class="create_success" v-if="false">
        <img :src="httpUrls.ossUrl + 'static/picture/01c48d79-77b4-4d5d-a5f9-c2e81f7971e0.png'" alt="">
        <div>创建成功</div>
        <div>知识库创建完成，请返回知识库列表查看</div>
        <div @click="$router.push('/enterpriseWEB/knowledge/baseIndex')">返回知识库列表</div>
      </div>
    </div>
  </div>
</template>

<script>
import product from "./editAIBase/product";
import newsInformation from "./editAIBase/newsInformation";
import companyBasic from "./editAIBase/companyBasic";
import knowledgeBase from "./editAIBase/knowledgeBase";

import {
  business,
  enterpriseRetrieve,
  companyProductMsg,
  companyNewsMsg,
  companyKnowledgeMsg,
} from "../../api/chatMG";
import httpUrls from "../../api/requestURL";
import { mapGetters } from "vuex";

export default {
  name: "enterprise-detail",
  data() {
    var checkPhone = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入您的手机号"));
      } else if (!/^1[3456789]\d{9}$/.test(value)) {
        callback(new Error("请输入正确的手机号"));
      } else {
        callback();
      }
    };
    return {
      httpUrls: httpUrls,
      submitTitle: "",
      company_code: "",
      setpsList: ["企业信息", "项目或产品信息", "资讯信息", "企业专属知识库"],
      companyBasicMsg: {
        basicData: {}, // 企业信息
        productData: [], // 产品信息
        newsData: [], // 新闻/咨询信息
        baseData: [
          {
            newsTypesof: {},
            newsTitle: "",
            title: "",
            newsContent: "",
            officialAccountList: [],
            pictureList: [], // 图片列表
            videoList: [], // 视频列表
            fileList: [], // 文件列表
            labelCode: "",
            labelName: "",
            networkAddress: [],
            networkAddressNumber: 1,
            id: 1,
          },
        ], // 企业知识库信息
      },
      active: 0,
      productNumber: 1,
      productID: -1,
      newsNumber: 1,
      newsID: -1,
      knowledgeBases: 1,
      baseID: -1,

      randomProductNumber: 0, // 用于验证产品是否填写完成,点击下一步时需要验证是否已填必填项
      randomNewsNumber: 0, // 用于验证新闻是否填写完成,点击下一步时需要验证是否已填必填项
      randomBaseNumber: 0, // 用于验证知识库是否填写完成,点击下一步时需要验证是否已填必填项

      typeArr: [
        {
          label: "城市运营商",
          value: 1,
        },
        {
          label: "源码定制开发",
          value: 2,
        },
        {
          label: "API接口",
          value: 3,
        },
      ],
      ruleForm: {
        type: "",
        name: "",
        phone: "",
        text: "",
      },
      rules: {
        name: [{ required: true, message: "请输入您的姓名", trigger: "blur" }],
        type: [
          { required: true, message: "请选择您的合作意向", trigger: "change" },
        ],
        phone: [
          { required: true, message: "请输入您的手机号", trigger: "blur" },
          {
            validator: checkPhone,
            message: "请输入正确的手机号",
            trigger: "blur",
          },
        ],
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

      // 项目/产品文件列表
      productFileList: {
        fileList: [], // 文件列表
        pictureList: [], // 图片列表
        videoList: [], // 视频列表
        networkAddress: [],
        networkAddressNumber: 1,
      },

      // 新闻文件列表
      newsFileList: {
        fileList: [],
        pictureList: [],
        videoList: [],
        networkAddress: [],
        networkAddressNumber: 1,
      },

      // 知识库文件列表
      baseFileList: {
        fileList: [],
        pictureList: [],
        videoList: [],
        networkAddress: [],
        networkAddressNumber: 1,
      },
    };
  },
  components: {
    product,
    newsInformation,
    companyBasic,
    knowledgeBase
  },

  computed: {
    ...mapGetters(["submitCompany"]),
  },

  watch: {
    submitCompany: {
      deep: true,
      handler() {
        if (this.submitCompany == "1") {
          if (typeof window.onbeforeunload != "function") {
            window.onbeforeunload = (e) => {
              e.returnValue = "离开？";
              return e.preventDefault();
            };
          }
          // window.addEventListener('beforeunload', this.beforeunLoadHandle)
        } else {
          window.onbeforeunload = null;
          // window.removeEventListener('beforeunload', this.beforeunLoadHandle)
        }
      },
    },
  },

  created() {
    this.company_code = sessionStorage.getItem("COMPANY_CODE");
    this.queryCompanyDataBaseDetail();
  },

  mounted() {
    localStorage.setItem("submit_company", "1");
  },
  beforeDestroy() {
    window.onbeforeunload = null;
    sessionStorage.removeItem("EDIT_BASE_TYPE");
    // window.removeEventListener('beforeunload', this.beforeunLoadHandle)
  },
  methods: {
    // beforeunLoadHandle(event) {
    //   event.preventDefault();
    //   event.returnValue = '离开？'
    // },
    selectActicve(type) {
      this.active = type;
    },
    // 企业基本信息已经填好了
    nextStep(data) {
      // console.log('企业基本信息', data);
      this.companyBasicMsg.basicData = data.data;
      if (data.type == "nextStep") {
        this.active++;
      } else if (data.type == "") {
        this.queryCompanyDataBaseDetail();
      }
    },

    deleteProduct(id) {
      this.randomProductNumber = 10;
      this.productID = id;
      this.companyBasicMsg.productData = [];
    },

    // 产品信息已经填好了
    completeWrite(data) {
      // console.log('产品信息', data);
      let b = 0;
      this.companyBasicMsg.productData.forEach((v) => {
        if (data.data.id == v.id) {
          b = 1;
          v = data.data;
        }
      });
      if (b == 0) {
        this.companyBasicMsg.productData.push(data.data);
      }
      // this.companyBasicMsg.productData.push(data.data)
      let obj = {};
      if (this.productNumber == this.companyBasicMsg.productData.length) {
        if (this.randomProductNumber == 10) {
          this.productNumber = 0;
          this.companyBasicMsg.productData.forEach((v, i) => {
            if (v.id == this.productID) {
              this.companyBasicMsg.productData.splice(i, 1);
            }
          });
          this.productNumber = this.companyBasicMsg.productData.length;
        }

        let project_list = [];
        this.companyBasicMsg.productData.forEach((v) => {
          let images = [];
          v.officialAccountList.forEach((item) => {
            images.push({
              file_url: item.file_url,
              file_name: item.name,
            });
          });
          let website = [];
          v.networkAddress.forEach((item) => {
            website.push({
              file_name: item,
              file_url: item,
            });
          });
          project_list.push({
            project_code: v.project_code, // 项目id，有为修改，没有为新建
            category_name: v.categoryName, // 类目名称
            project_name: v.productName, // 项目名称
            brief_introduction: v.productProfile, // 简介
            project_image_list: images, // 图片
            file_list: v.fileList,
            image_list: v.pictureList,
            vlog_list: v.videoList,
            website_list: website,
          });
        });
        // let website = []
        // this.productFileList.networkAddress.forEach(v => {
        //   website.push({
        //     file_name: v,
        //     file_url: v
        //   })
        // })
        // obj = {
        //   project_list,
        //   file_list: this.productFileList.fileList,
        //   image_list: this.productFileList.pictureList,
        //   vlog_list: this.productFileList.videoList,
        //   website_list: website,
        // }
        if (this.randomProductNumber != 10) {
          companyProductMsg({
            project_list,
            company_code: this.company_code,
          }).then((res) => {
            if (res.code == 20000) {
              this.queryCompanyDataBaseDetail();
              window.onbeforeunload = null;
              if (this.submitTitle != "") {
                this.$message.success("保存成功");
                this.submitTitle = "";
              }
              // window.removeEventListener('beforeunload', this.beforeunLoadHandle)
              // this.$message.success('保存成功')
            } else {
              // this.$message.error(res.msg); 请先填写企业信息
            }
          });
        }

        this.randomProductNumber = -1;
        this.productID = -1;
      }
    },

    deleteNews(id) {
      this.randomNewsNumber = 10;
      this.newsID = id;
      this.companyBasicMsg.newsData = [];
    },

    // 新闻信息填好了
    comleteNewsWrite(data) {
      // console.log('咨询信息', data);
      let b = 0;
      this.companyBasicMsg.newsData.forEach((v) => {
        if (data.data.id == v.id) {
          b = 1;
          v = data.data;
        }
      });
      if (b == 0) {
        this.companyBasicMsg.newsData.push(data.data);
      }
      let obj = {};
      if (this.newsNumber == this.companyBasicMsg.newsData.length) {
        if (this.randomNewsNumber == 10) {
          this.newsNumber = 0;
          this.companyBasicMsg.newsData.forEach((v, i) => {
            if (v.id == this.newsID) {
              this.companyBasicMsg.newsData.splice(i, 1);
            }
          });
          this.newsNumber = this.companyBasicMsg.newsData.length;
        }
        let information_list = [];
        this.companyBasicMsg.newsData.forEach((v) => {
          let images = [];
          v.officialAccountList.forEach((item) => {
            images.push({
              file_url: item.file_url,
              file_name: item.name,
            });
          });
          let website = [];
          v.networkAddress.forEach((item) => {
            website.push({
              file_name: item,
              file_url: item,
            });
          });
          information_list.push({
            information_code: v.project_code,
            label_code: v.newsTypesof,
            information_name: v.newsTitle,
            content_desc: v.newsContent,
            information_image_list: images,
            // information_list,
            file_list: this.newsFileList.fileList,
            image_list: this.newsFileList.pictureList,
            vlog_list: this.newsFileList.videoList,
            website_list: website,
          });
        });
        // let website = []
        // this.newsFileList.networkAddress.forEach(v => {
        //   website.push({
        //     file_name: v,
        //     file_url: v
        //   })
        // })
        // obj = {
        //   information_list,
        //   file_list: this.newsFileList.fileList,
        //   image_list: this.newsFileList.pictureList,
        //   vlog_list: this.newsFileList.videoList,
        //   website_list: website,
        // }
        if (this.randomNewsNumber != 10) {
          companyNewsMsg({
            information_list,
            company_code: this.company_code,
          }).then((res) => {
            if (res.code == 20000) {
              this.queryCompanyDataBaseDetail();
              window.onbeforeunload = null;
              if (this.submitTitle != "") {
                this.$message.success("保存成功");
                this.submitTitle = "";
              }
              // window.removeEventListener('beforeunload', this.beforeunLoadHandle)
              // this.$message.success('保存成功')
            } else {
              // this.$message.error(res.msg); 请先填写企业信息
            }
          });
        }
        this.randomNewsNumber = -1;
        this.newsID = -1;
      }
    },

    deleteBase(id) {
      this.companyBasicMsg.baseData = [];
      this.baseID = id;
      this.randomBaseNumber = 10;
    },

    // 知识库信息填好了
    comleteBaseData(data) {
      console.log("知识库信息", data);
      let b = 0;
      this.companyBasicMsg.baseData.forEach((v) => {
        if (data.data.id == v.id) {
          b = 1;
          v = { ...data.data, id: data.data.id };
        }
      });
      if (b == 0) {
        this.companyBasicMsg.baseData.push({ ...data.data, id: data.data.id });
      }
      let obj = {};
      if (this.knowledgeBases == this.companyBasicMsg.baseData.length) {
        if (this.randomBaseNumber == 10) {
          this.knowledgeBases = 0;
          this.companyBasicMsg.baseData.forEach((v, i) => {
            if (v.id == this.baseID) {
              this.companyBasicMsg.baseData.splice(i, 1);
            }
          });
          this.knowledgeBases = this.companyBasicMsg.baseData.length;
        }
        let knowledge_list = [];
        this.companyBasicMsg.baseData.forEach((v) => {
          let website = [];
          v.networkAddress.forEach((v) => {
            website.push({
              file_name: v,
              file_url: v,
            });
          });
          let obj = {
            knowledge_code: v.project_code,
            content_desc: v.newsTitle,
            purpose: v.newsContent,
            title: v.title,
            file_list: v.fileList,
            image_list: v.pictureList,
            vlog_list: v.videoList,
            website_list: website,
          };
          if (
            v.newsTypesof != undefined &&
            v.newsTypesof.hasOwnProperty("behavior") &&
            v.newsTypesof.behavior == "user"
          ) {
            obj.category_name = v.newsTypesof.label_code;
            obj.category = "";
          } else {
            obj.category_name = "";
            obj.category = v.label_code || v.newsTypesof.label_code;
          }
          knowledge_list.push(obj);
        });
        // let website = []
        // this.baseFileList.networkAddress.forEach(v => {
        //   website.push({
        //     file_name: v,
        //     file_url: v
        //   })
        // })
        // obj = {
        //   knowledge_list,
        //   file_list: this.baseFileList.fileList,
        //   image_list: this.baseFileList.pictureList,
        //   vlog_list: this.baseFileList.videoList,
        //   website_list: website,
        // }
        if (this.randomBaseNumber != 10) {
          let bool = false;
          knowledge_list.forEach((v) => {
            if (v.file_list.length == 0 && v.image_list.length == 0) {
              bool = true;
            }
          });
          if (bool) {
            this.$message("知识库需要至少一个文件");
            return;
          }
          let datas = [];
          knowledge_list.forEach((v) => {
            if (
              v.title != "" &&
              v.content_desc != "" &&
              v.purpose != "" &&
              (v.file_list.length != 0 || v.image_list.length != 0)
            ) {
              datas.push(v);
            } else {
              bool = true;
            }
          });
          if (bool) {
            this.$message.error("知识库必填项未填写");
          }
          if (datas.length > 0) {
            companyKnowledgeMsg({
              knowledge_list: datas,
              company_code: this.company_code,
            }).then((res) => {
              if (res.code == 20000) {
                this.queryCompanyDataBaseDetail();
                window.onbeforeunload = null;
                if (this.submitTitle != "") {
                  if (!bool) {
                    this.$message.success("保存成功");
                  }
                  this.submitTitle = "";
                }
                // window.removeEventListener('beforeunload', this.beforeunLoadHandle)
                // this.$message.success('保存成功')
              } else {
                // this.$message.error(res.msg); 请先填写企业信息
              }
            });
          }
        }

        this.randomBaseNumber = -1;
        this.baseID = -1;
      }
    },

    // 保存产品信息
    completeProductWrite(type) {
      if (type == "next") {
        this.active++;
        this.randomProductNumber = Math.random();
        this.companyBasicMsg.productData = [];
        this.submitTitle = "保存成功";
      } else if (type == "prev") {
        this.active--;
        this.randomProductNumber = Math.random();
        this.companyBasicMsg.productData = [];
      } else {
        this.submitTitle = "保存成功";
        this.randomProductNumber = Math.random();
        this.companyBasicMsg.productData = [];
      }
    },

    // 保存新闻信息
    completeNewsWrite(type) {
      if (type == "next") {
        this.active++;
        this.randomNewsNumber = Math.random();
        this.companyBasicMsg.newsData = [];
        this.submitTitle = "保存成功";
      } else if (type == "prev") {
        this.active--;
        this.randomNewsNumber = Math.random();
        this.companyBasicMsg.newsData = [];
      } else {
        this.randomNewsNumber = Math.random();
        this.companyBasicMsg.newsData = [];
        this.submitTitle = "保存成功";
      }
    },

    // 保存知识库信息
    completeBaseWrite(type) {
      if (type == "prev") {
        this.active--;
        this.randomBaseNumber = Math.random();
        this.companyBasicMsg.baseData = [];
      } else {
        this.randomBaseNumber = Math.random();
        this.companyBasicMsg.baseData = [];
        this.submitTitle = "保存成功";
      }
    },

    submitForm(formName) {
      if (!this.isClick) return;
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.isClick = false;
          let val = {
            type: this.ruleForm.type,
            name: this.ruleForm.name,
            phone: this.ruleForm.phone,
            details: this.ruleForm.text,
          };

          business(val)
            .then((res) => {
              if (res.code == 20000) {
                this.$message.success("提交成功");
                (this.ruleForm = {
                  type: "",
                  name: "",
                  phone: "",
                  text: "",
                }),
                  (this.isClick = true);
              } else {
                this.isClick = true;
                // this.$message.error(res.msg); 请先填写企业信息
              }
            })
            .catch((err) => {
              this.isClick = true;
              this.$message.error("信息提交失败！");
            });
        }
      });
    },

    // 获取已上传的企业知识库详情
    queryCompanyDataBaseDetail() {
      // 获取填写的企业信息的详情
      enterpriseRetrieve(`company_code=${this.company_code}`).then((res) => {
        if (res.data != null) {
          let { data } = res;
          // 企业唯一id
          this.company_code = data.company_code;

          /**
           *  基本信息
           */
          let basicLink = [];
          data.website_list.forEach((v) => {
            basicLink.push(v.file_url);
          });
          let basicData = {
            companyName: data.company_name, // 公司名称
            companyAbbreviation: data.company_abbreviation, // 公司简称
            position: data.position, // 职位
            industry: data.industry_code, // 行业编号
            registerAddress: data.registered_address, // 注册地址
            companyDescribe: data.company_desc, // 公司描述
            companyWebAddress: data.company_url, // 公司网址
            ICPNumber: data.ipc_code, // ipc备案号
            email: data.company_mailbox, // 公司邮箱
            companyAddress: data.company_address, // 公司地址
            phone: data.company_mobile, // 公司电话

            miniCodeList: data.company_applet_list, // 公司小程序图片列表
            officialAccountList: data.company_official_account_list, // 公司公众号
            companyLogoList: data.company_log_list, // 公司log
            companyPictureList: data.company_image_list, // 公司图片
            fileList: data.file_list, // 资料文件
            pictureList: data.image_list, // 资料图片
            videoList: data.vlog_list, // 资料视频
            networkAddress: basicLink, // 资料网址
          };

          /**
           * 产品数据
           */
          // 基本信息
          let productData = [];
          this.productNumber =
            data.project_list.length == 0 ? 1 : data.project_list.length; // 产品数量
          data.project_list.forEach((v) => {
            let webLink = [];
            v.website_list.forEach((v) => {
              webLink.push(v.file_url);
            });
            productData.push({
              categoryName: v.category_name,
              productName: v.project_name,
              productProfile: v.brief_introduction,
              project_code: v.project_code,
              officialAccountList: v.project_image_list,
              fileList: v.file_list, // 文件列表
              pictureList: v.image_list, // 图片列表
              videoList: v.vlog_list, // 视频列表
              networkAddress: webLink,
              networkAddressNumber:
                v.website_list.length == 0 ? 1 : v.website_list.length,
            });
          });

          // 网址
          // let productNetwork = []
          // data.website_list.forEach(v => {
          //   productNetwork.push(v.file_url)
          // })

          // 文件数据
          // this.productFileList = {
          //   fileList: data.project_info.file_list, // 文件列表
          //   pictureList: data.project_info.image_list, // 图片列表
          //   videoList: data.project_info.vlog_list, // 视频列表
          //   networkAddress: productNetwork,
          //   networkAddressNumber: data.project_info.website_list.length == 0 ? 1 : data.project_info.website_list.length,
          // }

          /**
           * 新闻/咨询信息
           */
          // 基本信息
          let newsData = [];
          this.newsNumber =
            data.information_list.length == 0
              ? 1
              : data.information_list.length; // 数量
          data.information_list.forEach((v) => {
            let webLink = [];
            v.website_list.forEach((v) => {
              webLink.push(v.file_url);
            });
            newsData.push({
              project_code: v.information_code,
              newsTypesof: v.label_code,
              newsTitle: v.information_name,
              newsContent: v.content_desc,
              officialAccountList: v.information_image_list,
              fileList: v.file_list, // 文件列表
              pictureList: v.image_list, // 图片列表
              videoList: v.vlog_list, // 视频列表
              networkAddress: webLink,
              networkAddressNumber:
                v.website_list.length == 0 ? 1 : v.website_list.length,
            });
          });

          // 网址
          let newsNetwork = [];
          // data.information_info.website_list.forEach(v => {
          //   newsNetwork.push(v.file_url)
          // })

          // 文件数据
          // this.newsFileList = {
          //   fileList: data.information_info.file_list, // 文件列表
          //   pictureList: data.information_info.image_list, // 图片列表
          //   videoList: data.information_info.vlog_list, // 视频列表
          //   networkAddress: newsNetwork,
          //   networkAddressNumber: data.information_info.website_list.length == 0 ? 1 : data.information_info.website_list.length,
          // }

          /**
           * 知识库信息
           */
          // 基本信息
          let baseData = [];
          this.knowledgeBases =
            data.knowledge_list.length == 0 ? 1 : data.knowledge_list.length; // 数量
          data.knowledge_list.forEach((v, i) => {
            let webLink = [];
            v.website_list.forEach((v) => {
              webLink.push(v.file_url);
            });
            let obj = {
              project_code: v.knowledge_code,
              // newsTypesof: v.label_code,
              newsTitle: v.content_desc,
              newsContent: v.purpose,
              title: v.title,
              fileList: v.file_list, // 文件列表
              pictureList: v.image_list, // 图片列表
              videoList: v.vlog_list, // 视频列表
              networkAddress: webLink,
              networkAddressNumber:
                v.website_list.length == 0 ? 1 : v.website_list.length,
              id: i,
              // officialAccountList: v.information_image_list,
            };
            if (v.category == "") {
              // 分类编号为空
              obj.newsTypesof = {
                behavior: "user",
                label: v.category_name,
                label_code: v.category_name,
              };
              obj.labelName = v.category_name;
              obj.labelCode = v.category_name;
            } else {
              obj.labelName = v.category;
              obj.labelCode = v.category;
              obj.newsTypesof = {
                behavior: "user",
                label: v.label,
                label_code: v.category,
              };
              // obj.newsTypesof = v.category
            }
            baseData.push(obj);
          });

          // 网址
          // let baseNetwork = []
          // data.knowledge_info.website_list.forEach(v => {
          //   baseNetwork.push(v.file_url)
          // })

          // 文件数据
          // this.baseFileList = {
          //   fileList: data.knowledge_info.file_list, // 文件列表
          //   pictureList: data.knowledge_info.image_list, // 图片列表
          //   videoList: data.knowledge_info.vlog_list, // 视频列表
          //   networkAddress: baseNetwork,
          //   networkAddressNumber: data.knowledge_info.website_list.length == 0 ? 1 : data.knowledge_info.website_list.length,
          // }

          this.companyBasicMsg = {
            basicData,
            productData,
            newsData,
            baseData,
          };
          if (this.companyBasicMsg.baseData.length == 0) {
            this.companyBasicMsg.baseData = [
              {
                newsTypesof: {},
                newsTitle: "",
                title: "",
                newsContent: "",
                officialAccountList: [],
                pictureList: [], // 图片列表
                videoList: [], // 视频列表
                fileList: [], // 文件列表
                labelCode: "",
                labelName: "",
                networkAddress: [],
                networkAddressNumber: 1,
                id: 0,
              },
            ];
          }

          this.$store.dispatch(
            "app/changeCompanyDataMsg",
            this.companyBasicMsg
          );
        }
        if (sessionStorage.getItem("EDIT_BASE_TYPE") != undefined) {
          this.active = Number(sessionStorage.getItem("EDIT_BASE_TYPE"));
        }
      });
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
        this.productFileList.fileList.push({
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
      this.productFileList.fileList.forEach((v, i) => {
        if (v.uid == file.uid) {
          this.productFileList.fileList.splice(i, 1);
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
        this.productFileList.pictureList.push({
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
      this.productFileList.pictureList.forEach((v, i) => {
        if (v.uid == file.uid) {
          this.productFileList.pictureList.splice(i, 1);
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
        this.productFileList.videoList.push({
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
      this.productFileList.videoList.forEach((v, i) => {
        if (v.uid == file.uid) {
          this.productFileList.videoList.splice(i, 1);
        }
      });
    },

    /**
     * 新闻上传文件
     */
    // 新闻/文件列表
    handleChangeNewsFile(file, fileList) {
      this.requestFileList.image = file.raw;
      this.requestFileList.image_name = file.name;
    },
    handleSuccessNewsFile(response, file, fileList) {
      if (response.code == 20000) {
        this.newsFileList.fileList.push({
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
    handleRemoveNewsFile(file, fileList) {
      this.newsFileList.fileList.forEach((v, i) => {
        if (v.uid == file.uid) {
          this.newsFileList.fileList.splice(i, 1);
        }
      });
    },

    // 新闻/图片列表
    handleChangeNewsPicture(file, fileList) {
      this.requestPictureList.image = file.raw;
      this.requestPictureList.image_name = file.name;
    },
    handleSuccessNewsPicture(response, file, fileList) {
      if (response.code == 20000) {
        this.newsFileList.pictureList.push({
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
    handleRemoveNewsPicture(file, fileList) {
      this.newsFileList.pictureList.forEach((v, i) => {
        if (v.uid == file.uid) {
          this.newsFileList.pictureList.splice(i, 1);
        }
      });
    },

    // 新闻/视频列表
    handleChangeNewsVideo(file, fileList) {
      this.requestVideoList.image = file.raw;
      this.requestVideoList.image_name = file.name;
    },
    handleSuccessNewsVideo(response, file, fileList) {
      if (response.code == 20000) {
        this.newsFileList.videoList.push({
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
    handleRemoveNewsVideo(file, fileList) {
      this.newsFileList.videoList.forEach((v, i) => {
        if (v.uid == file.uid) {
          this.newsFileList.videoList.splice(i, 1);
        }
      });
    },

    /**
     * 知识库上传文件
     */
    // 知识库/文件列表
    handleChangeBaseFile(file, fileList) {
      this.requestFileList.image = file.raw;
      this.requestFileList.image_name = file.name;
    },
    handleSuccessBaseFile(response, file, fileList) {
      if (response.code == 20000) {
        this.baseFileList.fileList.push({
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
    handleRemoveBaseFile(file, fileList) {
      this.baseFileList.fileList.forEach((v, i) => {
        if (v.uid == file.uid) {
          this.baseFileList.fileList.splice(i, 1);
        }
      });
    },

    // 知识库/图片列表
    handleChangeBasePicture(file, fileList) {
      this.requestPictureList.image = file.raw;
      this.requestPictureList.image_name = file.name;
    },
    handleSuccessBasePicture(response, file, fileList) {
      if (response.code == 20000) {
        this.baseFileList.pictureList.push({
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
    handleRemoveBasePicture(file, fileList) {
      this.baseFileList.pictureList.forEach((v, i) => {
        if (v.uid == file.uid) {
          this.baseFileList.pictureList.splice(i, 1);
        }
      });
    },

    // 知识库/视频列表
    handleChangeBaseVideo(file, fileList) {
      this.requestVideoList.image = file.raw;
      this.requestVideoList.image_name = file.name;
    },
    handleSuccessBaseVideo(response, file, fileList) {
      if (response.code == 20000) {
        this.baseFileList.videoList.push({
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
    handleRemoveBaseVideo(file, fileList) {
      this.baseFileList.videoList.forEach((v, i) => {
        if (v.uid == file.uid) {
          this.baseFileList.videoList.splice(i, 1);
        }
      });
    },

    // 删除网址
    removeBaseNetwork(i) {
      this.baseFileList.networkAddress.splice(i, 1);
      this.baseFileList.networkAddressNumber--;
    },

    removeNewsNetwork(i) {
      this.newsFileList.networkAddress.splice(i, 1);
      this.newsFileList.networkAddressNumber--;
    },

    removeProductNetwork(i) {
      this.productFileList.networkAddress.splice(i, 1);
      this.productFileList.networkAddressNumber--;
    },

    addDataBase() {
      this.knowledgeBases++;

      this.companyBasicMsg.baseData.push({
        newsTypesof: {},
        newsTitle: "",
        title: "",
        newsContent: "",
        officialAccountList: [],
        pictureList: [], // 图片列表
        videoList: [], // 视频列表
        fileList: [], // 文件列表
        labelCode: "",
        labelName: "",
        networkAddress: [],
        networkAddressNumber: 1,
        id: this.companyBasicMsg.baseData.length,
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.main {
  width: 100%;
  min-height: 100%;
  padding-bottom: 30px;
  box-sizing: border-box;
  background: #f6f8fa;
  .first-title {
    margin-top: 40px;
    margin-bottom: 30px;
    font-weight: bold;
    font-size: 20px;
  }
  .nav {
    width: 100%;
    padding: 16px 20px;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    background: #ffffff;
    box-shadow: inset 0px -1px 0px 0px #ebebeb;
    .goBack {
      display: flex;
      align-items: center;
      cursor: pointer;
      div {
        margin-left: 0px;
        margin-right: 15px;
        font-size: 15px;
      }
    }
    .base {
      display: flex;
      align-items: center;
      img {
        width: 24px;
        height: auto;
      }
      div {
        font-size: 14px;
        margin: 0px !important;
      }
    }
  }
  .container {
    width: calc(100% - 40px);
    min-height: calc(100vh - 58px - 56px - 50px);
    padding-top: 50px;
    padding-bottom: 30px;
    box-sizing: border-box;
    margin: 20px auto;
    margin-bottom: 0px;
    border-radius: 10px 10px 10px 10px;
    background: #ffffff;
    position: relative;
    .container-top {
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;

      .active-item {
        background-color: #3363f6 !important;
      }
      .active-text {
        color: #000000 !important;
      }
      .line {
        width: 120px;
        height: 2px;
        background: #e6e6e6;
        margin: 0px 12px;
      }
      .container-top-box {
        display: flex;
        align-items: center;
        cursor: pointer;
        .item {
          width: 28px;
          height: 28px;
          text-align: center;
          line-height: 28px;
          background: #d9d9d9;
          border-radius: 28px;
          font-weight: 600;
          font-size: 16px;
          color: #ffffff;
        }
        .text {
          margin-left: 12px;
          color: #999999;
        }
      }
    }
    .container-form {
      width: 700px;
      margin: auto;
      .form-title {
        font-weight: bold;
        font-size: 20px;
        color: #000000;
        margin-top: 40px;
        margin-bottom: 30px;
      }
    }
    .create_success{
      position: absolute;
      left: 50%;
      top: 40%;
      transform: translate(-50%,-50%);
      display: flex;
      flex-direction: column;
      justify-content: center;
      text-align: center;
      img{
        width: 100px;
        height: 100px;
        // text-align: center;
        margin: auto;
      }
      div:nth-child(2){
        margin-top: 20px;
        font-weight: bold;
        font-size: 20px;
        color: #000000;
      }
      div:nth-child(3){
        margin-top: 8px;
        font-weight: 500;
        font-size: 14px;
        color: #999999;
      }
      div:nth-child(4){
        margin: auto;
        margin-top: 30px;
        width: 220px;
        padding: 9px 0px;
        box-sizing: border-box;
        text-align: center;
        color: #fff;
        background: #3363F6;
        border-radius: 8px 8px 8px 8px;
        font-weight: bold;
        font-size: 14px;
        cursor: pointer;
      }
    }
  }
}
</style>