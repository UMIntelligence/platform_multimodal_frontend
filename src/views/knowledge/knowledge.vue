<template>
  <div id="main">
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
    <div class="left">
      <!-- 导航栏 -->
      <el-menu
        class="el-menu-vertical-demo"
        unique-opened
        background-color="#FFFFFF"
        text-color="#333"
        active-text-color="#1f64ff"
        :default-active="menuIndex"
        @select="selectMenu"
      >
        <el-submenu index="1">
          <template slot="title">知识库</template>
          <el-submenu index="1-1">
            <template slot="title">
              <span :style="menuTwoIndex == '1-1' ? 'color: #1f64ff' : ''">图片库</span>
            </template>
            <template v-if="menus && menus.pictures && Object.keys(menusImage).length">
              <el-menu-item
                :index="item[Object.keys(item)][0]['group_id']"
                :class="
                  menuIndex == item[Object.keys(item)][0]['group_id'] ? 'menu-items' : ''
                "
                v-for="(item, index) in menusImage"
                :key="index"
              >
                <div class="menuBox">
                  <div
                    :style="
                      menuIndex == item[Object.keys(item)][0]['group_id']
                        ? 'color: #1f64ff'
                        : ''
                    "
                  >
                    {{ Object.keys(item)[0] }}
                  </div>
                  <div>
                    <i
                      class="el-icon-edit"
                      :style="
                        menuIndex == item[Object.keys(item)][0]['group_id']
                          ? 'color: rgb(31, 100, 255);'
                          : 'color: black;'
                      "
                      @click.stop="
                        $store.dispatch('app/changeknowledgeLabel', '图片库'),
                          (menuTwoIndex = '1-1'),
                          handleEditMenu(item[Object.keys(item)][0])
                      "
                    ></i>
                    <i
                      class="el-icon-delete"
                      :style="
                        menuIndex == item[Object.keys(item)][0]['group_id']
                          ? 'color: rgb(31, 100, 255);'
                          : 'color: black;'
                      "
                      @click.stop="
                        $store.dispatch('app/changeknowledgeLabel', '图片库'),
                          (menuTwoIndex = '1-1'),
                          handleDeleteMenu(item[Object.keys(item)][0])
                      "
                    ></i>
                  </div>
                </div>
              </el-menu-item>
            </template>
            <div class="createdMenu" @click="handleCreatedMenu('1-1')">
              <i class="el-icon-plus"></i>
              <span>新建分组</span>
            </div>
          </el-submenu>
          <el-submenu index="1-2">
            <template slot="title">
              <span :style="menuTwoIndex == '1-2' ? 'color: #1f64ff' : ''">文档库</span>
            </template>
            <template
              v-if="menus && menus.documents && Object.keys(menusDocument).length"
            >
              <el-menu-item
                :index="item[Object.keys(item)][0]['group_id']"
                :class="
                  menuIndex == item[Object.keys(item)][0]['group_id'] ? 'menu-items' : ''
                "
                v-for="(item, index) in menusDocument"
                :key="index"
              >
                <div class="menuBox">
                  <div
                    :style="
                      menuIndex == item[Object.keys(item)][0]['group_id']
                        ? 'color: #1f64ff'
                        : ''
                    "
                  >
                    {{ Object.keys(item)[0] }}
                  </div>
                  <div>
                    <i
                      class="el-icon-edit"
                      :style="
                        menuIndex == item[Object.keys(item)][0]['group_id']
                          ? 'color: rgb(31, 100, 255);'
                          : 'color: black;'
                      "
                      @click.stop="
                        $store.dispatch('app/changeknowledgeLabel', '文档库'),
                          (menuTwoIndex = '1-2'),
                          handleEditMenu(item[Object.keys(item)][0])
                      "
                    ></i>
                    <i
                      class="el-icon-delete"
                      :style="
                        menuIndex == item[Object.keys(item)][0]['group_id']
                          ? 'color: rgb(31, 100, 255);'
                          : 'color: black;'
                      "
                      @click.stop="
                        $store.dispatch('app/changeknowledgeLabel', '文档库'),
                          (menuTwoIndex = '1-2'),
                          handleDeleteMenu(item[Object.keys(item)][0])
                      "
                    ></i>
                  </div>
                </div>
              </el-menu-item>
            </template>
            <div class="createdMenu" @click="handleCreatedMenu('1-2')">
              <i class="el-icon-plus"></i>
              <span>新建分组</span>
            </div>
          </el-submenu>
          <el-submenu index="1-3">
            <template slot="title">
              <span :style="menuTwoIndex == '1-3' ? 'color: #1f64ff' : ''">网址库</span>
            </template>
            <template v-if="menus && menus.urls && Object.keys(menusWebsite).length">
              <el-menu-item
                :index="item[Object.keys(item)][0]['group_id']"
                :class="
                  menuIndex == item[Object.keys(item)][0]['group_id'] ? 'menu-items' : ''
                "
                v-for="(item, index) in menusWebsite"
                :key="index"
              >
                <div class="menuBox">
                  <div
                    :style="
                      menuIndex == item[Object.keys(item)][0]['group_id']
                        ? 'color: #1f64ff'
                        : ''
                    "
                  >
                    {{ Object.keys(item)[0] }}
                  </div>
                  <div>
                    <i
                      class="el-icon-edit"
                      :style="
                        menuIndex == item[Object.keys(item)][0]['group_id']
                          ? 'color: rgb(31, 100, 255);'
                          : 'color: black;'
                      "
                      @click.stop="
                        $store.dispatch('app/changeknowledgeLabel', '网址库'),
                          (menuTwoIndex = '1-3'),
                          handleEditMenu(item[Object.keys(item)][0])
                      "
                    ></i>
                    <i
                      class="el-icon-delete"
                      :style="
                        menuIndex == item[Object.keys(item)][0]['group_id']
                          ? 'color: rgb(31, 100, 255);'
                          : 'color: black;'
                      "
                      @click.stop="
                        $store.dispatch('app/changeknowledgeLabel', '网址库'),
                          (menuTwoIndex = '1-3'),
                          handleDeleteMenu(item[Object.keys(item)][0])
                      "
                    ></i>
                  </div>
                </div>
              </el-menu-item>
            </template>
            <div class="createdMenu" @click="handleCreatedMenu('1-3')">
              <i class="el-icon-plus"></i>
              <span>新建分组</span>
            </div>
          </el-submenu>
        </el-submenu>
      </el-menu>
    </div>
    <div class="right">
      <div class="right-title">
        <span>{{ group_name }}</span>
        <div class="right-title-tips" style="margin-left: 10px; line-height: 26px">
          {{ group_desc }}
        </div>
      </div>
      <div class="right-title-tips" v-if="knowledgeLabel == '图片库'">
        在此上传图片并编辑图片标签，帮助AI智能体更好地理解您的知识
      </div>
      <!-- 图片知识库 -->
      <div class="knowledgeImage" v-if="knowledgeLabel == '图片库'">
        <div>
          <el-upload
            :action="httpUrls.loginUrl + 'api/user/oss_upload'"
            :on-change="handleUploadChange"
            :show-file-list="false"
            :on-success="handleUploadSuccess"
            :data="requestMiniCode"
            :headers="headerData"
            class="menter-avatar-uploader"
          >
            <!-- <img v-if="ruleForm.pic" :src="httpUrls.ossUrl + ruleForm.pic" alt="" class="menter-avatar"> -->
            <div class="upload-btn">
              <div class="btn-mask">
                <i class="el-icon-plus" style="font-size: 18px"></i>
                <div>点击上传</div>
              </div>
            </div>
          </el-upload>
        </div>
        <div class="knowledgeImage-box" v-for="(item, index) in imageData" :key="index">
          <div>
            <img :src="httpUrls.ossUrl + item.pic_url" alt="" />
            <div @click="handleDeleteImage(item)">
              <img
                :src="
                  httpUrls.ossUrl +
                  'static/picture/2c4b7941-d99e-4a5d-9864-5de9df8457e2.png'
                "
                alt=""
              />
            </div>
          </div>
          <div>{{ item.pic_name }}</div>
          <div>
            <img
              :src="
                httpUrls.ossUrl +
                'static/picture/6eea7197-dbb7-442f-9e80-0c9dad4b4762.png'
              "
              alt=""
            />
            <div @click="handleDialogImage(item)">编辑标签</div>
          </div>
        </div>
      </div>
      <!-- 文档知识库 -->
      <div class="knowledgeDocument" v-else-if="knowledgeLabel == '文档库'">
        <div class="knowledgeDocument-title">
          <div>
            <div>上传文档</div>
          </div>
          <el-upload
            class="upload-demo"
            :on-success="handleAvatarSuccessA"
            :on-change="handleAvatarChange"
            :data="uploadData"
            :action="httpUrls.loginUrl + 'api/user/oss_upload'"
            :show-file-list="false"
            :before-upload="beforeAvatarUploadA"
            :file-list="fileList"
            :headers="headerData"
          >
            <div class="knowledgeDocument-upload">
              <img
                :src="
                  httpUrls.ossUrl +
                  'static/picture/e003ddb7-9248-4ca4-a1d1-6bd3e9306d3a.png'
                "
              />
              <div>上传文档</div>
            </div>
            <div slot="tip" class="el-upload__tip">
              文件资料上传可包含docx、pdf、csv、ppt、txt、md文件
            </div>
          </el-upload>
        </div>
        <div class="knowledgeDocument-content">
          <el-table
            :header-cell-style="getRowClass"
            :data="documentData"
            style="width: 100%"
          >
            <el-table-column prop="file_name" label="文档名称"></el-table-column>
            <el-table-column prop="file_desc" label="描述"></el-table-column>
            <el-table-column prop="file_type" label="类型"></el-table-column>
            <el-table-column prop="date" label="使用次数"></el-table-column>
            <el-table-column prop="date" label="上传时间"></el-table-column>
            <el-table-column prop="file_name" label="操作" width="100">
              <template slot-scope="scope">
                <div class="scoped-box">
                  <div @click="handleEdit(scope)">编辑</div>
                  <div @click="handleDelete(scope)">删除</div>
                </div>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
      <!-- 网址知识库 -->
      <div class="knowledgeWebsite" v-else>
        <div class="knowledgeWebsite-title">
          <div>导入网址</div>
          <div>
            <el-input v-model="website" placeholder="请输入您的网址"></el-input>
          </div>
          <div @click="handleCreatedWebsite" class="domHover">添加</div>
        </div>
        <div class="knowledgeWebsite-content">
          <el-table
            :header-cell-style="getRowClass"
            :data="websiteData"
            style="width: 100%"
          >
            <el-table-column prop="url_name" label="文档名称"></el-table-column>
            <el-table-column prop="url_title" label="标题"></el-table-column>
            <el-table-column prop="url_type" label="类型"></el-table-column>
            <el-table-column prop="times_used" label="使用次数"></el-table-column>
            <el-table-column prop="times_used" label="上传时间"></el-table-column>
            <el-table-column prop="date" label="操作">
              <template slot-scope="scope">
                <div class="scoped-box">
                  <div @click="handleEdit(scope.row)">编辑</div>
                  <div @click="handleDelete(scope.row)">删除</div>
                </div>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
    </div>
    <!-- 图片打标签 -->
    <el-dialog
      :title="knowledgeImageTitle"
      :visible.sync="imageDialogVisible"
      width="600px"
    >
      <div class="imageDialog-box">
        <img :src="httpUrls.ossUrl + dialogImage.iamge" />
        <div class="imageDialog-box-content">
          <div>
            <div>文件名称：</div>
            <div>{{ dialogImage.title }}</div>
          </div>
          <div>
            <div>标签</div>
            <div>
              <tagInput
                @getCustomTag="getTagArray"
                :tags="dialogImage.tagArray"
              ></tagInput>
            </div>
          </div>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="imageDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleEditImage">确 定</el-button>
      </span>
    </el-dialog>
    <knowledgeDialog
      ref="knowledgeDialog"
      @menu="initMenu()"
      @data="init()"
      :title.sync="knowledgeDialogTitle"
      :type.sync="knowledgeDialogType"
      :data.sync="knowledgeDialogObject"
    ></knowledgeDialog>
    <register ref="Register"></register>
  </div>
</template>
<script>
import httpUrls from "../../api/requestURL";
import knowledgeDialog from "../../components/knowledgeDialog.vue";
import tagInput from "../../components/tagInput.vue";
import { mapGetters } from "vuex";
import Register from "../../components/register";
import {
  getKnowledgeMenus,
  createdDocument,
  getKnowledgeDocument,
  deleteImage,
  getKnowledgeWebsite,
  getKnowledgeImage,
  createdImage,
  createdWebsite,
  editImage,
} from "../../api/knowledge";
export default {
  name: "knowledgeChat",
  data() {
    return {
      headerData: {},
      httpUrls,
      //图片上传
      requestMiniCode: {
        image: null,
        image_name: null,
        oss_dir: "static",
        cate: "Enterprise_customization-role_list",
      },
      knowledgeImageTitle: "添加标签",
      imageDialogVisible: false,
      //文档上传
      uploadData: {
        image: null,
        image_name: null,
        oss_dir: "static",
        cate: "mentor_image-list",
      },
      fileList: [],
      ruleForm: {
        pic: "",
      },
      imageData: [], //图片库数据
      documentData: [], //文档表格数据
      website: "", //网址
      websiteData: [], //网址表格数据
      menuIndex: 1,
      menuTwoIndex: "1-3", //二级
      knowledgeDialogTitle: "", //弹出框标题
      knowledgeDialogType: 0, //弹出框类型/编辑/删除/添加
      knowledgeDialogObject: {}, //弹出框数据
      group_order: 1, //当前分组的排序
      group_id: 1, //当前分组ID
      menus: [], //菜单数据
      menusImage: [],
      menusDocument: [],
      menusWebsite: [],
      dialogImage: {
        //图片弹出框
        iamge: "",
        title: "",
        tagArray: [],
        pic_id: "",
      },
    };
  },
  computed: {
    ...mapGetters(["knowledgeLabel"]),
    group_name() {
      //分组名称
      let name = "";
      if (this.knowledgeLabel == "图片库") {
        this.menusImage.some((item) => {
          // 使用 Object.entries 代替 Object.keys，可以同时得到键和值
          return Object.entries(item).some(([child, value], index) => {
            if (value[0].group_id == this.menuIndex) {
              name = value[0].group_name;
              return true; // 如果找到了匹配的项，返回 true 来停止遍历
            }
          });
        });
      } else if (this.knowledgeLabel == "文档库") {
        this.menusDocument.some((item) => {
          // 使用 Object.entries 代替 Object.keys，可以同时得到键和值
          return Object.entries(item).some(([child, value], index) => {
            if (value[0].group_id == this.menuIndex) {
              name = value[0].group_name;
              return true; // 如果找到了匹配的项，返回 true 来停止遍历
            }
          });
        });
      } else if (this.knowledgeLabel == "网址库") {
        this.menusWebsite.some((item) => {
          // 使用 Object.entries 代替 Object.keys，可以同时得到键和值
          return Object.entries(item).some(([child, value], index) => {
            if (value[0].group_id == this.menuIndex) {
              name = value[0].group_name;
              return true; // 如果找到了匹配的项，返回 true 来停止遍历
            }
          });
        });
      }
      // console.log(name,'分组名称')
      return name;
    },
    group_desc() {
      //分组描述
      let desc = "";
      if (this.knowledgeLabel == "图片库") {
        this.menusImage.some((item) => {
          // 使用 Object.entries 代替 Object.keys，可以同时得到键和值
          return Object.entries(item).some(([child, value], index) => {
            if (value[0].group_id == this.menuIndex) {
              desc = value[0].group_desc;
              return true; // 如果找到了匹配的项，返回 true 来停止遍历
            }
          });
        });
      } else if (this.knowledgeLabel == "文档库") {
        this.menusDocument.some((item) => {
          // 使用 Object.entries 代替 Object.keys，可以同时得到键和值
          return Object.entries(item).some(([child, value], index) => {
            if (value[0].group_id == this.menuIndex) {
              desc = value[0].group_desc;
              return true; // 如果找到了匹配的项，返回 true 来停止遍历
            }
          });
        });
      } else if (this.knowledgeLabel == "网址库") {
        this.menusWebsite.some((item) => {
          // 使用 Object.entries 代替 Object.keys，可以同时得到键和值
          return Object.entries(item).some(([child, value], index) => {
            if (value[0].group_id == this.menuIndex) {
              desc = value[0].group_desc;
              return true; // 如果找到了匹配的项，返回 true 来停止遍历
            }
          });
        });
      }
      // console.log(desc,'分组描述')
      return desc;
    },
  },
  watch: {
    knowledgeLabel: {
      deep: true,
      handler() {
        if (this.knowledgeLabel == "图片库") {
          this.menuIndex = this.menusImage[0][Object.keys(this.menusImage[0])][0][
            "group_id"
          ];
        } else if (this.knowledgeLabel == "文档库") {
          this.menuIndex = this.menusDocument[0][Object.keys(this.menusDocument[0])][0][
            "group_id"
          ];
        } else if (this.knowledgeLabel == "网址库") {
          this.menuIndex = this.menusWebsite[0][Object.keys(this.menusWebsite[0])][0][
            "group_id"
          ];
        }
        this.loginRoNot();
        this.init();
      },
    },
  },
  components: {
    knowledgeDialog,
    tagInput,
    Register,
  },
  async created() {
    try {
      await this.initMenu();
      await this.init();
    } catch (error) {
      console.error(error);
    }
  },
  mounted() {
    let userInfo = JSON.parse(localStorage.getItem("userInfo"));
    this.headerData.authorization = userInfo.token
    this.headerData.role = userInfo.role
    this.loginRoNot();
  },
  methods: {
    loginRoNot() {
      let userinfo = JSON.parse(localStorage.getItem("userInfo"));
      if (userinfo.role !== "user") {
        this.$message({
          message: "当前尚未登录，请先登录",
          type: "warning",
        });
        this.$refs.Register.registerVisible = true;
        return false;
      } else {
        return true;
      }
    },
    //获取分组数据
    initMenu() {
      let requestData = `user_id=${JSON.parse(localStorage.getItem("userInfo")).user_id}`;
      getKnowledgeMenus(requestData).then((res) => {
        //请求分组数据接口
        this.menus = res.data; //this.menus获取初始分组数据，后面需要用到初始分组数据判断本地创建的分组在杰哥那有没有

        let dataImage = res.data["pictures"]; //获取图片库分组数据
        let dataDocument = res.data["documents"]; //获取文档库分组数据
        let dataWebsite = res.data["urls"]; //获取网址库分组数据

        //this.menusWebsite才是在页面中渲染的网址库分组数据
        this.menusWebsite = Object.keys(dataWebsite).map((key) => ({
          //循环遍历构建出二级菜单栏数据，网址库下分组栏目
          [key]: dataWebsite[key],
        }));
        //this.menusImage才是在页面中渲染的图片库分组数据
        this.menusImage = Object.keys(dataImage).map((key) => ({
          //循环遍历构建出二级菜单栏数据，图片库下分组栏目
          [key]: dataImage[key],
        }));
        //this.menusDocument才是在页面中渲染的文档库分组数据
        this.menusDocument = Object.keys(dataDocument).map((key) => ({
          //循环遍历构建出二级菜单栏数据，文档库下分组栏目
          [key]: dataDocument[key],
        }));

        //knowledgeLabel：选中的知识库：文档库/图片库/网址库
        //这段判断中是获取当前选中知识库中的第一个分组的group_id赋值给menuIndex变量，给默认值的操作，
        //后面是拿menuIndex来请求分组中的数据
        if (this.knowledgeLabel == "图片库" && this.menusImage.length) {
          this.menuIndex = this.menusImage[0][Object.keys(this.menusImage[0])][0][
            "group_id"
          ];
        } else if (this.knowledgeLabel == "文档库" && this.menusDocument.length) {
          this.menuIndex = this.menusDocument[0][Object.keys(this.menusDocument[0])][0][
            "group_id"
          ];
        } else if (this.knowledgeLabel == "网址库" && this.menusWebsite.length) {
          this.menuIndex = this.menusWebsite[0][Object.keys(this.menusWebsite[0])][0][
            "group_id"
          ];
        }

        // console.log(this.menusWebsite,'menusWebsite')
        // console.log(this.menusImage,'menusImage')
        // console.log(this.menusDocument,'menusDocument')

        let menusImageBool = false; //判断图片库本地分组标识符
        let menusDocumentBool = false; //判断文档库本地分组标识符
        let menusWebsiteBool = false; //判断网址库本地分组标识符

        //判断服务器中是否有本地分组
        this.menusImage.map((item) => {
          //遍历我构建的分组数据,item:表示对应的分组栏目所有的数据，是对象
          Object.keys(item).forEach((k) => {
            //Object.keys()获取value值中所有的key，k表示分组栏目
            let menuImage = JSON.parse(localStorage.getItem("menuImage")); //获取用户输入的本地分组
            if (menuImage && menuImage["groupName"] == k) {
              //判断本地分组是否存在并且==k：分组栏目
              menusImageBool = true; //进入判断说明本地分组已存在杰哥数据库中
              return;
            }
          });
        });

        this.menusDocument.map((item) => {
          Object.keys(item).forEach((k) => {
            //k表示分组栏目
            let menuDocument = JSON.parse(localStorage.getItem("menuDocument")); //用户输入的本地分组存
            if (menuDocument && menuDocument["groupName"] == k) {
              //判断本地分组是否存在并且==k：分组栏目
              menusDocumentBool = true; //进入判断说明本地分组已存在杰哥数据库中
              return;
            }
          });
        });
        this.menusWebsite.map((item) => {
          Object.keys(item).forEach((k) => {
            let menuWebsite = JSON.parse(localStorage.getItem("menuWebsite"));
            if (menuWebsite && menuWebsite["groupName"] == k) {
              menusWebsiteBool = true; //进入判断说明本地分组已存在杰哥数据库中
              return;
            }
          });
        });

        //判断本地分组存在并且标识符为false，构建分组数据末尾追加到数组中
        if (JSON.parse(localStorage.getItem("menuImage")) && !menusImageBool) {
          let num = Math.floor(100000 + Math.random() * 900000); //随机数/临时分组ID
          let menuObj = {
            [JSON.parse(localStorage.getItem("menuImage"))["groupName"]]: [
              {
                group_id: num.toString(),
                group_order: this.menusImage.length + 1,
                group_name: JSON.parse(localStorage.getItem("menuImage"))["groupName"],
                group_desc: JSON.parse(localStorage.getItem("menuImage"))["groupDesc"],
                bool: true,
              },
            ],
          };
          this.menusImage.push(menuObj); //
        }
        if (JSON.parse(localStorage.getItem("menuDocument")) && !menusDocumentBool) {
          let num = Math.floor(100000 + Math.random() * 900000); //随机数/临时分组ID
          let menuObj = {
            //构建分组数据
            [JSON.parse(localStorage.getItem("menuDocument"))["groupName"]]: [
              {
                group_id: num.toString(), //随机字符串
                group_order: this.menusDocument.length + 1, //获取文档库分组的长度+1
                group_name: JSON.parse(localStorage.getItem("menuDocument"))["groupName"],
                group_desc: JSON.parse(localStorage.getItem("menuDocument"))["groupDesc"],
                bool: true, //标识符，判断是否是本地分组
              },
            ],
          };
          this.menusDocument.push(menuObj); //末尾追加到文档库分组数据中
        }
        if (JSON.parse(localStorage.getItem("menuWebsite")) && !menusWebsiteBool) {
          let num = Math.floor(100000 + Math.random() * 900000); //随机数/临时分组ID
          let menuObj = {
            [JSON.parse(localStorage.getItem("menuWebsite"))["groupName"]]: [
              {
                group_id: num.toString(),
                group_order: this.menusWebsite.length + 1,
                group_name: JSON.parse(localStorage.getItem("menuWebsite"))["groupName"],
                group_desc: JSON.parse(localStorage.getItem("menuWebsite"))["groupDesc"],
                bool: true,
              },
            ],
          };
          this.menusWebsite.push(menuObj);
        }
      });
    },
    //获取数据(初始化)
    async init() {
      // 表格请求参数
      console.log(this.menuIndex, "分组ID", Object.keys(this.menus).length);
      if (Object.keys(this.menus).length == 0) {
        let requestData = `user_id=${
          JSON.parse(localStorage.getItem("userInfo")).user_id
        }`;
        let res = await getKnowledgeMenus(requestData);
        this.menus = res.data;
        if (this.knowledgeLabel == "图片库") {
          this.menuIndex = Object.values(res.data["pictures"])[0][0]["group_id"];
        } else if (this.knowledgeLabel == "文档库") {
          this.menuIndex = Object.values(res.data["documents"])[0][0]["group_id"];
        } else if (this.knowledgeLabel == "网址库") {
          this.menuIndex = Object.values(res.data["urls"])[0][0]["group_id"];
        }
        console.log(this.menuIndex, "再次输出");
      }
      let group_id = ""; // 声明变量  判断数据中是否有分组ID，辨别临时ID
      let group_order = ""; //分组排序
      if (this.knowledgeLabel == "图片库") {
        Object.keys(this.menus["pictures"]).map((child) => {
          this.menus["pictures"][child].map((k) => {
            if (this.menuIndex == k.group_id) {
              console.log(k, 132654987);
              group_order = k.group_order;
              group_id = this.menuIndex;
            } else {
              console.log("获取数据进入否则");
              console.log(k, "否则");
            }
          });
        });
        let tableRequestData = `group_id=${
          this.menuIndex
        }&group_order=${group_order}&user_id=${
          JSON.parse(localStorage.getItem("userInfo")).user_id
        }`;
        this.menuTwoIndex = "1-1";
        getKnowledgeImage(tableRequestData).then((res) => {
          console.log(res, "图片库数据");
          this.imageData = res.data;
        });
      } else if (this.knowledgeLabel == "文档库") {
        Object.keys(this.menus["documents"]).map((child) => {
          this.menus["documents"][child].map((k) => {
            if (this.menuIndex == k.group_id) {
              group_order = k.group_order;
              group_id = k.group_id;
            } else {
              // console.log(this.menus['documents'])
              // console.log('文档获取数据进入否则',group_id)
            }
          });
        });
        let tableRequestData = `group_id=${
          this.menuIndex
        }&group_order=${group_order}&user_id=${
          JSON.parse(localStorage.getItem("userInfo")).user_id
        }`;
        this.menuTwoIndex = "1-2";
        getKnowledgeDocument(tableRequestData).then((res) => {
          console.log(res, "文档库数据");
          this.documentData = res.data;
        });
      } else if (this.knowledgeLabel == "网址库") {
        Object.keys(this.menus["urls"]).map((child) => {
          this.menus["urls"][child].map((k) => {
            console.log(k);
            if (this.menuIndex == k.group_id) {
              console.log(k, 132654987);
              group_order = k.group_order;
              group_id = this.menuIndex;
            }
          });
        });
        let tableRequestData = `group_id=${
          this.menuIndex
        }&group_order=${group_order}&user_id=${
          JSON.parse(localStorage.getItem("userInfo")).user_id
        }`;
        this.menuTwoIndex = "1-3";
        getKnowledgeWebsite(tableRequestData).then((res) => {
          console.log(res, "文档库数据");
          this.websiteData = res.data;
        });
      }
    },
    //导入网址
    handleCreatedWebsite() {
      //var reg = /^([hH][tT]{2}[pP]:\/\/|[hH][tT]{2}[pP][sS]:\/\/)(([A-Za-z0-9-~]+)\.)+([A-Za-z0-9-~\/])+$/;
      //if (!reg.test(this.website)) {
      //  this.$message.error('这网址不是以http://https://开头，或者不是网址！');
      //  return
      //}
      let requestData = {
        group_name: "", //分组名称
        url_name: this.website, //网址
        user_id: JSON.parse(localStorage.getItem("userInfo")).user_id,
        group_order: "1", //排序
        group_name: "默认分组",
      };
      let menusWebsiteBool = true; //true本地分组/数据库分组

      this.menusWebsite.some((item) => {
        // 使用 Object.entries 代替 Object.keys，可以同时得到键和值
        return Object.entries(item).some(([child, value], index) => {
          if (value[0].group_id == this.menuIndex) {
            requestData.group_name = value[0].group_name;
            requestData.group_order = value[0].group_order;
            requestData.group_desc = value[0].group_desc ? value[0].group_desc : "";
            return true; // 如果找到了匹配的项，返回 true 来停止遍历
          }
        });
      });
      // requestData.group_name==''?requestData.group_name:'默认分组';
      // requestData.group_order?requestData.group_order:'1';
      this.menusWebsite.map((item) => {
        Object.values(item).map((key_1) => {
          if (key_1[0].group_id == this.menuIndex) {
            //获取到你选中的分组
            Object.keys(this.menus["urls"]).map((key_2) => {
              //循环数据库分组
              if (key_1[0].group_name == key_2) {
                //判断是否是本地分组,数据库分组中有才进入,有说明不是本地分组
                menusWebsiteBool = false;
              }
            });
          }
        });
      });
      createdWebsite(requestData).then((res) => {
        if (res.code == 20000) {
          this.$message.success("网址导入成功");
          if (!menusWebsiteBool) {
            this.init();
          } else {
            localStorage.setItem("menuWebsite", null);
            this.initMenu();
            this.init();
          }
        } else {
          this.$message.error(res.msg);
        }
      });
    },
    //选中菜单项
    selectMenu(index, indexPath) {
      console.log("进入选中菜单项", indexPath);
      this.menuIndex = index;
      // console.log(this.menuIndex)
      this.menuTwoIndex = indexPath[1];
      if (this.menuTwoIndex == "1-1") {
        this.$store.dispatch("app/changeknowledgeLabel", "图片库");
      } else if (this.menuTwoIndex == "1-2") {
        this.$store.dispatch("app/changeknowledgeLabel", "文档库");
      } else if (this.menuTwoIndex == "1-3") {
        this.$store.dispatch("app/changeknowledgeLabel", "网址库");
      }
      this.init();
    },
    //编辑图片显示弹出框
    handleDialogImage(item) {
      console.log(item, "当前行数据");
      let tagArr = item.pic_tags.filter((v) => v != "");
      this.$set(this.dialogImage, "iamge", item.pic_url);
      this.$set(this.dialogImage, "title", item.pic_name);
      this.$set(this.dialogImage, "tagArray", tagArr);
      this.$set(this.dialogImage, "pic_id", item.pic_id);
      this.imageDialogVisible = true;
      this.knowledgeImageTitle = "编辑标签";
    },
    //新建分组
    handleCreatedMenu(menuIndex) {
      let obj = {
        menuIndex,
      };
      this.$confirm(
        "新建完分组后请添加内容，否则下次新建分组时将替换此前无内容的分组！",
        "提醒！",
        {
          confirmButtonText: "确定",
          cancelButtonText: "添加内容",
        }
      )
        .then(() => {
          this.knowledgeDialogObject = obj;
          this.knowledgeDialogTitle = "创建分组";
          this.knowledgeDialogType = 1;
          this.$refs.knowledgeDialog.dialogVisible = true;
        })
        .catch(() => {});
    },
    //编辑分组
    handleEditMenu(item) {
      console.log(item, "当前行数据");
      let menuStatus = null; //分组状态，0本地，1真实分组
      if (item.bool) {
        menuStatus = 0;
      } else {
        menuStatus = 1;
      }
      let obj = {
        group_id: item.group_id,
        group_name: item.group_name,
        group_desc: item.group_desc,
        file_id: item.file_id,
        user_id: JSON.parse(localStorage.getItem("userInfo"))["user_id"],
        menuStatus,
      };
      this.knowledgeDialogObject = obj;
      this.knowledgeDialogTitle = "编辑分组";
      this.knowledgeDialogType = 3;
      this.$refs.knowledgeDialog.dialogVisible = true;
    },
    //删除分组
    handleDeleteMenu(item) {
      let menuStatus = null; //分组状态，0本地，1真实分组
      if (item.bool) {
        menuStatus = 0;
      } else {
        menuStatus = 1;
      }
      let obj = {
        group_name: item.group_name,
        group_id: item.group_id,
        file_id: item.file_id,
        user_id: JSON.parse(localStorage.getItem("userInfo"))["user_id"],
        menuStatus,
      };
      this.knowledgeDialogObject = obj;
      this.knowledgeDialogTitle = "系统提示";
      this.knowledgeDialogType = 4;
      this.$refs.knowledgeDialog.dialogVisible = true;
    },
    //表格编辑
    handleEdit(row) {
      console.log(row, "当前行数据");
      if (this.menuTwoIndex == "1-2") {
        let obj = {
          group_desc: row.row.file_desc,
          group_name: row.row.file_name,
          file_id: row.row.file_id,
          user_id: JSON.parse(localStorage.getItem("userInfo"))["user_id"],
        };
        console.log(obj, 123654);
        this.knowledgeDialogObject = obj;
        this.knowledgeDialogTitle = "编辑文档信息";
        this.$store.dispatch("app/changeknowledgeLabel", "文档库");
      } else if (this.menuTwoIndex == "1-3") {
        let obj = {
          group_desc: row.url_title,
          group_name: row.url_name,
          url_id: row.url_id,
          user_id: JSON.parse(localStorage.getItem("userInfo"))["user_id"],
        };
        this.knowledgeDialogObject = obj;
        this.knowledgeDialogTitle = "编辑网址信息";
        this.$store.dispatch("app/changeknowledgeLabel", "网址库");
      }
      this.knowledgeDialogType = 2;
      this.$refs.knowledgeDialog.dialogVisible = true;
    },
    //表格删除
    handleDelete(row) {
      console.log(row);
      if (this.menuTwoIndex == "1-2") {
        let obj = {
          group_desc: row.row.file_desc,
          group_name: row.row.file_name,
          file_id: row.row.file_id,
          user_id: JSON.parse(localStorage.getItem("userInfo"))["user_id"],
        };
        this.knowledgeDialogObject = obj;
        // this.$store.dispatch("app/changeknowledgeLabel", "文档库");
      } else if (this.menuTwoIndex == "1-3") {
        let obj = {
          group_name: row.url_name,
          url_id: row.url_id,
          user_id: JSON.parse(localStorage.getItem("userInfo"))["user_id"],
        };
        console.log(obj, "传递数据");
        this.knowledgeDialogObject = obj;
        // this.$store.dispatch("app/changeknowledgeLabel", "网址库");
      }
      this.knowledgeDialogTitle = "系统提示";
      this.knowledgeDialogType = 0;
      this.$refs.knowledgeDialog.dialogVisible = true;
    },
    // 获取图片标签
    getTagArray(e) {
      this.$set(this.dialogImage, "tagArray", e);
    },
    //图片编辑
    handleEditImage() {
      let requestData = {
        user_id: JSON.parse(localStorage.getItem("userInfo"))["user_id"],
        pic_id: this.dialogImage.pic_id,
        pic_tags: this.dialogImage.tagArray,
      };
      editImage(requestData).then((res) => {
        if (res.code == 20000) {
          this.imageDialogVisible = false;
          this.$message.success("编辑成功");
          this.init();
        } else {
          this.$message.error(res.msg);
        }
      });
    },
    // 图片删除
    handleDeleteImage(item) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "系统提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          let group_id = null;
          this.menusImage.some((item) => {
            // 使用 Object.entries 代替 Object.keys，可以同时得到键和值
            return Object.entries(item).some(([child, value], index) => {
              if (value[0].group_id == this.menuIndex) {
                group_id = value[0]["group_id"];
                return true; // 如果找到了匹配的项，返回 true 来停止遍历
              }
            });
          });
          let requestData = {
            user_id: JSON.parse(localStorage.getItem("userInfo"))["user_id"],
            group_id,
            pic_id: item.pic_id,
          };
          deleteImage(requestData).then((res) => {
            if (res.code == 20000) {
              this.$message.success("删除成功");
              this.init();
            } else {
              this.$message.error(res.msg);
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    // 图片上传
    handleUploadSuccess(response, file, fileList) {
      this.ruleForm.pic = response.data.new_url;
      let group_name = null;
      let group_order = null;
      let group_desc = null;
      let menusImageBool = true; //true本地分组/数据库分组
      this.menusImage.some((item) => {
        // 使用 Object.entries 代替 Object.keys，可以同时得到键和值
        return Object.entries(item).some(([child, value], index) => {
          if (value[0].group_id == this.menuIndex) {
            console.log(value[0]);
            group_name = value[0]["group_name"];
            group_order = value[0]["group_order"];
            group_desc = value[0]["group_desc"] ? value[0]["group_desc"] : "";
            return true; // 如果找到了匹配的项，返回 true 来停止遍历
          }
        });
      });
      let requestData = {
        group_name: group_name ? group_name : "默认分组",
        group_order: group_order ? group_order : "1",
        group_desc,
        pic_name: file.name.substring(file.name.lastIndexOf(".") + 1),
        pic_url: response.data.new_url,
        user_id: JSON.parse(localStorage.getItem("userInfo"))["user_id"],
      };
      this.menusImage.map((item) => {
        Object.values(item).map((key_1) => {
          if (key_1[0].group_id == this.menuIndex) {
            //获取到你选中的分组
            Object.keys(this.menus["pictures"]).map((key_2) => {
              //循环数据库分组
              if (key_1[0].group_name == key_2) {
                //判断是否是本地分组,数据库分组中有才进入,有说明不是本地分组
                menusImageBool = false;
              }
            });
          }
        });
      });
      createdImage(requestData).then((res) => {
        if (res.code == 20000) {
          this.$message.success("图片添加成功！");
          // this.initMenu()
          this.init();
          if (!menusImageBool) {
            this.init();
          } else {
            localStorage.setItem("menuImage", null);
            this.initMenu();
            this.init();
          }
        } else {
          this.$message.error(res.msg);
        }
      });
    },
    //图片上传
    handleUploadChange(file, fileList) {
      this.requestMiniCode.image = file.raw;
    },
    // 文档上传前
    beforeAvatarUploadA(file) {
      console.log(file);
      let index = file.name.lastIndexOf(".");
      let str = file.name.slice(index + 1);
      this.uploadData.image_name = file.name;
      // let bool = true  //判断是否是本地分组
      // this.menusDocument.map(item => {
      //   Object.values(item).map(key_1 => {
      //     if(key_1[0].group_id == this.menuIndex){  //获取到你选中的分组
      //       Object.keys(this.menus['documents']).map(key_2 => {   //循环数据库分组
      //         if(key_1[0].group_name == key_2){   //判断是否是本地分组
      //           bool = false
      //         }
      //       })
      //     }
      //   })
      // })
      // console.log(bool,'为tree是本地分组')

      // console.log()docx、pdf、csv、ppt、txt、md
      if (
        str != "docx" &&
        str != "pdf" &&
        str != "csv" &&
        str != "ppt" &&
        str != "txt" &&
        str != "md"
      ) {
        this.$message.error("文件仅支持docx、pdf、csv、ppt、txt、md这六种类型!");
        return false;
      }
    },
    //文档上传
    handleAvatarChange(file, fileList) {
      this.uploadData.image = file.raw;
      this.uploadData.image_name = file.name;
    },
    //文档上传
    handleAvatarSuccessA(res, file) {
      console.log(file, "文件上传成功");
      let userInfo = JSON.parse(localStorage.getItem("userInfo"));
      let group_name = null; //分组名称
      let group_order = null; //分组排序
      let group_desc = null; //分组详情
      // 使用 some 代替 forEach
      this.menusDocument.some((item) => {
        return Object.entries(item).some(([child, value], index) => {
          if (value[0].group_id == this.menuIndex) {
            console.log(value[0]); //输出匹配的值
            group_name = value[0]["group_name"];
            group_order = value[0]["group_order"];
            group_desc = value[0]["group_desc"] ? value[0]["group_desc"] : "";
            return true; // 如果找到了匹配的项，返回 true 来停止遍历
          }
        });
      });

      let menusDocumentBool = true; //判断是否是本地分组

      this.menusDocument.map((item) => {
        Object.values(item).map((key_1) => {
          if (key_1[0].group_id == this.menuIndex) {
            //获取到你选中的分组
            Object.keys(this.menus["documents"]).map((key_2) => {
              //循环数据库分组
              if (key_1[0].group_name == key_2) {
                //判断是否是本地分组,数据库分组中有才进入,有说明不是本地分组
                menusDocumentBool = false;
              }
            });
          }
        });
      });
      // console.log(menusDocumentBool,'为tree是本地分组')
      let data = {
        file_url: file.response.data.new_url,
        file_name: file.response.data.name,
        file_type: file.name.substring(file.name.lastIndexOf(".") + 1),
        user_id: userInfo.user_id,
        group_name: group_name ? group_name : "默认分组",
        group_order: group_order ? group_order : 1,
        group_desc,
      };
      createdDocument(data).then((res) => {
        if (res.code == 20000) {
          this.$message.success("文件上传成功");
          this.init();
          if (!menusDocumentBool) {
            this.init();
          } else {
            localStorage.setItem("menuDocument", null);
            this.initMenu();
            this.init();
          }
        } else {
          this.$message.error(res.msg);
        }
      });
    },
    //设置表头颜色
    getRowClass({ row, column, rowIndex, columnIndex }) {
      if (rowIndex == 0) {
        return "background:#F6F8FA";
      } else {
        return "";
      }
    },
  },
};
</script>
<style scoped lang="scss">
.domHover {
  cursor: pointer;
}
.scoped-box {
  width: 100%;
  height: 100%;
  display: flex;
  // justify-content: center;
  align-items: center;
  color: #1f64ff;
  font-family: PingFang SC;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 20px; /* 142.857% */
  div {
    cursor: pointer;
  }
  > div:first-child {
    margin-right: 7px;
  }
}
.imageDialog-box {
  display: flex;
  justify-content: space-between;
  img {
    width: 180px;
    height: auto;
  }
  .imageDialog-box-content {
    width: calc(100% - 180px - 25px);
    height: 180px;
    > div:first-child {
      display: flex;
      align-items: center;
      div:first-child {
        color: #000;
        font-family: PingFang SC;
        font-size: 13px;
        font-style: normal;
        font-weight: 400;
        line-height: normal;
      }
    }
    > div:last-child {
      margin-top: 10px;
      height: calc(100% - 19px - 10px);
      > div:first-child {
        color: #000;
        font-family: PingFang SC;
        font-size: 12px;
        font-style: normal;
        font-weight: 400;
        line-height: normal;
        margin-bottom: 10px;
      }
      > div:last-child {
        width: 100%;
        height: calc(100% - 10px - 16px);
        border-radius: 4px;
        border: 1px solid #d9d9d9;
        padding: 12px;
        box-sizing: border-box;
        overflow-y: auto;
      }
    }
  }
}
/deep/ .el-dialog__header {
  border-bottom: 1px solid #f1f1f1;
}
/deep/ .el-dialog__body {
  padding-bottom: 0px;
  padding-top: 10px;
}
/deep/ .el-upload {
  display: flex;
}
.menter-avatar-uploader .el-upload {
  cursor: pointer;
  position: relative;
  overflow: hidden;
  width: 108px;
  height: 108px;
  /* line-height: 20px; */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.menter-avatar-uploader .el-upload:hover {
  border-color: #409eff;
}

.menter-avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  text-align: center;
}

.menter-avatar {
  width: 108px;
  height: 108px;
  display: block;
  margin-right: 10px;
}

.upload-btn {
  width: 108px;
  height: 108px;
  display: flex;
  align-items: center;
  background: rgb(242, 243, 245);
}

.upload-btn .btn-mask {
  line-height: 24px;
  margin: auto;
  font-size: 14px;
}
.el-menu{
  border: 0px solid #ccc !important;
}
.el-menu-item {
  display: flex;
  justify-content: flex-end;
  // width: calc(100% - 48px) !important;
  // margin-left: 38px !important;
}
// .child-menu_name {
//   margin: 0px !important;
// }
.menuBox {
  width: calc(100% - 40px);
  height: 100%;
  display: flex;
  justify-content: space-between;
}
.el-popover-self {
  min-width: 20px !important;
  padding: 0px !important;
  background: red !important;
}
.popover {
  width: 80px;
  position: absolute;
  top: -20px;
  right: -80px;
  background: #fff;
  border-radius: 4px;
  box-shadow: 0px 5px 20px 0px rgba(51, 51, 51, 0.05);
  z-index: 100;
  > div {
    padding: 8px 0px;
    text-align: center;
  }
  > div:first-child {
    border-bottom: 1px solid #ccc;
  }
}
#main {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  background: rgb(241, 242, 245);
  padding: 40px 20px 30px 20px;
  display: flex;
  justify-content: space-between;
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
    width: 240px;
    height: 100%;
    background: #fff;
    border-radius: 4px;
    padding: 0px 15px;
    box-sizing: border-box;
    display: flex;
    justify-content: center;
    overflow-y: auto;
    overflow-x: hidden;
    .createdMenu {
      margin-top: 5px;
      text-align: center;
      cursor: pointer;
      span {
        color: #000;
        font-family: PingFang SC;
        font-size: 14px;
        font-style: normal;
        font-weight: 400;
        line-height: 150%; /* 21px */
      }
    }
  }
  .right {
    width: calc(100% - 240px - 20px);
    height: 100%;
    padding: 20px;
    box-sizing: border-box;
    border-radius: 4px;
    background: #fff;
    overflow-y: auto;
    .right-title {
      color: #393e45;
      font-family: PingFang SC;
      font-size: 16px;
      font-style: normal;
      font-weight: 600;
      line-height: 24px;
      display: flex;
    }
    .right-title-tips {
      color: #b7b9c0;
      font-family: PingFang SC;
      font-size: 12px;
      font-style: normal;
      font-weight: 400;
      line-height: 18px;
    }
    .knowledgeImage {
      margin-top: 15px;
      width: 100%;
      // display: flex;
      // justify-content: space-evenly;
      // flex-wrap: wrap;

      display: grid;
      justify-content: space-between;
      grid-template-columns: repeat(auto-fill, 108px);
      grid-gap: 0 1px;

      .knowledgeImage-box {
        width: 108px;
        margin-bottom: 16px;
        // flex-direction:row;
        > div:nth-child(1) {
          width: 108px;
          height: 108px;
          border-radius: 4.696px;
          position: relative;
          // overflow: hidden;
          > img {
            width: auto;
            height: 100%;
            position: relative;
            left: 50%;
            transform: translate(-50%);
          }
          div {
            width: 20px;
            height: 20px;
            border-radius: 0px 4.696px;
            background: rgba(0, 0, 0, 0.6);
            display: flex;
            justify-content: center;
            align-items: center;
            position: absolute;
            right: 0px;
            top: 0px;
            cursor: pointer;
          }
        }
        > div:nth-child(2) {
          color: #666;
          font-family: PingFang SC;
          font-size: 12px;
          font-style: normal;
          font-weight: 400;
          line-height: 18px;
          margin: 4px 0px;
        }
        > div:nth-child(3) {
          cursor: pointer;
          width: 76px;
          height: 22px;
          border-radius: 3px;
          border: 1px solid #1f64ff;
          display: flex;
          justify-content: center;
          align-items: center;
          div {
            color: #1f64ff;
            font-family: PingFang SC;
            font-size: 12px;
            font-style: normal;
            font-weight: 400;
            line-height: 18px; /*  */
          }
        }
      }
    }
    .knowledgeDocument {
      width: 100%;
      .knowledgeDocument-title {
        display: flex;
        margin-top: 15px;
        > div:first-child {
          color: #333;
          text-align: right;
          font-family: PingFang SC;
          font-size: 14px;
          font-style: normal;
          font-weight: 500;
          line-height: normal;
          margin-right: 20px;
        }
        .knowledgeDocument-upload {
          display: flex;
          align-items: center;
          border-radius: 2px;
          background: #1f64ff;
          padding: 5px 16px;
          justify-content: center;
          color: var(---White, #fff);
          font-family: PingFang SC;
          font-size: 14px;
          font-style: normal;
          font-weight: 400;
          line-height: 22px; /* 157.143% */
          img {
            margin-right: 8px;
          }
        }
      }
      .knowledgeDocument-content {
        margin-top: 20px;
        width: 100%;
      }
    }
    .knowledgeWebsite {
      width: 100%;
      .knowledgeWebsite-title {
        display: flex;
        align-items: center;
        margin-top: 15px;
        > div:first-child {
          color: #333;
          text-align: right;
          font-family: PingFang SC;
          font-size: 14px;
          font-style: normal;
          font-weight: 500;
          line-height: normal;
        }
        > div:nth-child(2) {
          width: 320px;
          margin: 0px 15px;
        }
        > div:last-child {
          display: inline-flex;
          padding: 5px 16px;
          justify-content: center;
          align-items: center;
          gap: 8px;
          border-radius: 2px;
          background: #1f64ff;
          color: var(---White, #fff);

          /* 14/CN-Regular */
          font-family: PingFang SC;
          font-size: 14px;
          font-style: normal;
          font-weight: 400;
          line-height: 22px;
        }
      }
      .knowledgeWebsite-content {
        width: 100%;
        margin-top: 20px;
      }
    }
  }
}
</style>
