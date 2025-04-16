<template>
  <div class="main">
    <EnterpriseNav :itemArray="navArray"></EnterpriseNav>
    <div class="top">
      <div class="top_T">
        <div class="top_T_left">
          <img
            src="https://umi-intelligence.oss-cn-shenzhen.aliyuncs.com/xcx/com/message_center/Group_427319934@2x (1)p1.png"
            alt=""
          />
          <div>
            <div>产品知识库</div>
            <div>图片知识库支持上传图片，图片的标签将用于AI智能体的训练</div>
          </div>
        </div>
        <div class="top_T_right">
          <el-upload
            :name="uploadId"
            class="upload-demo"
            :on-success="handleImageSuccess"
            :on-change="handleImageChange"
            :data="requestMiniCode"
            action="http://127.0.0.1:29090/api/user/oss_upload"
            :show-file-list="false"
            :headers="headerData"
            :multiple="true"
          >
            <div class="upload-btn">
              <img
                :src="
                  httpUrls.ossUrl +
                  'xcx/com/message_center/vuesax_linear_export@2x.png'
                "
                alt=""
              />
              <div>上传内容</div>
            </div>
          </el-upload>
          <div class="upload-btn domHover" @click="handleCreateFolder()">
            <img
              :src="
                httpUrls.ossUrl +
                'xcx/com/message_center/vuesax_linear_add@2x.png'
              "
              alt=""
            />
            <div>创建分组</div>
          </div>
        </div>
      </div>
      <div class="top_B">
        <div>
          <el-input
            placeholder="搜索要查找的功能"
            prefix-icon="el-icon-search"
            v-model="input2"
          >
          </el-input>
        </div>
        <div>查询</div>
      </div>
    </div>
    <div class="container">
      <!-- 文件夹内容数据 -->
      <div class="container-list" v-if="folderList.length">
        <div v-for="item in folderList" :key="item.id">
          <!-- 文件夹 -->
          <template v-if="!item.exist_file">
            <div class="container-box domHover">
              <div class="container-box-top" @click="handleFolder(item)">
                <img
                  :src="
                    httpUrls.ossUrl +
                    'xcx/com/message_center/Group_427319966@2x.png'
                  "
                  alt=""
                />
                <div class="container_box_text">{{ item.label }}</div>
              </div>
              <div class="container_box_right" v-if="!item.back">
                <el-popover placement="bottom-start" width="80" trigger="click">
                  <!-- <div style="position: relative"> -->
                  <div class="popover">
                    <div style="cursor: pointer" @click="handleEdit(item)">
                      <i class="el-icon-edit" style="margin-right: 8px"></i>编辑
                    </div>
                    <div
                      style="cursor: pointer"
                      @click="handleDeleteFolder(item)"
                    >
                      <i
                        class="el-icon-delete"
                        style="margin-right: 8px; color: #ff0f00"
                      ></i
                      >删除
                    </div>
                  </div>
                  <img
                    slot="reference"
                    :src="
                      httpUrls.ossUrl +
                      'xcx/com/message_center/Group_427319967@2x.png'
                    "
                    alt=""
                    class="circular_icon"
                  />
                </el-popover>
              </div>
            </div>
          </template>
          <!-- 说明是内容 -->
          <template v-else>
            <div class="container-box">
              <div
                class="container-box-top domHover"
                @click="$router.push('/enterpriseWEB/knowledge/imageEdit')"
              >
                <img :src="item.web_path" alt="" />
                <div class="container_box_text">{{ item.label }}</div>
              </div>
              <div
                class="container-box-bottom"
                @click.stop="handleDialogImage(item)"
              >
                编辑
              </div>
              <!-- 删除图片 -->
              <div
                class="container_box_right"
                @click.stop="handleDeleteFolder(item)"
              >
                <img
                  :src="
                    httpUrls.ossUrl +
                    'xcx/com/message_center/Group_427319967@2x (1).png'
                  "
                  alt=""
                  class="circular_icon"
                />
              </div>
            </div>
          </template>
        </div>
      </div>
      <el-empty v-else description="暂无数据"></el-empty>
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
            <div>文件名称</div>
            <div>
              <el-input v-model="dialogImage.title" />
            </div>
          </div>
          <div>
            <div>标签</div>
            <div>
              <tagInput
                ref="tagInputs"
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
    <div class="bottom">
      <PaginationBase
        v-if="folderList.length"
        v-bind:child-msg="pageparm"
        @callFather="callFather"
      ></PaginationBase>
    </div>
  </div>
</template>

<script>
import EnterpriseNav from "../../../components/enterprise_nav.vue";
import PaginationBase from "../../../components/PaginationBase.vue";
import tagInput from "../../../components/tagInput.vue";
import httpUrls from "../../../api/requestURL";
import {
  getFolder,
  uploadFolder,
  createFolder,
  deleteFolder,
  editFolder,
} from "@/api/enterprise";
export default {
  name: "knowledgeBase_imageDetail",
  data() {
    return {
      headerData: {},
      uploadId: Math.random().toString(36).substr(2).toLocaleUpperCase(),
      uploadFiles: [],
      fileTotal: null,
      httpUrls,
      requestMiniCode: {
        image: null,
        image_name: null,
        oss_dir: "static",
        cate: "Enterprise_customization-role_list",
      },
      isDetail: false, //是否进入分组详情
      input2: "", //搜索框绑定数据
      // 分页参数
      pageparm: {
        currentPage: 1,
        pageSize: 10,
        total: 10,
      },
      //图片打标签
      knowledgeImageTitle: "", //弹出框标题
      imageDialogVisible: false, //
      dialogImage: {
        //弹出框表单提交数据
        //图片弹出框
        iamge: "",
        title: "",
        tagArray: [],
        pic_id: "",
      },
      navArray: [""],
      navId: null,
      folderList: [], //渲染列表数据
      parent_id: [], //父文件夹ID
      folder_id: 0, //文件夹ID
      userInfo: null,
    };
  },
  components: {
    EnterpriseNav,
    PaginationBase,
    tagInput,
  },
  mounted() {
    let userInfo = JSON.parse(localStorage.getItem("userInfo"));
    this.headerData.authorization = userInfo.token
    this.headerData.role = userInfo.role
    if (!this.$route.query) {
      return;
    }
    this.navId = this.$route.query.id;
    if (this.navId == 1) this.navArray = ["企业", "产品知识库"];
    else if (this.navId == 2) this.navArray = ["部门", "产品知识库"];
    else this.navArray = ["我的", "产品知识库"];
    this.userInfo = JSON.parse(localStorage.getItem("userInfo"));
    this.init();
  },
  methods: {
    init() {
      let user_id = this.userInfo.user_id;
      let requestData = {
        file_name: this.input2,
        // authority:this.$route.query.id,
        parent_id: this.folder_id,
        user_id,
      };
      getFolder(requestData).then((res) => {
        this.folderList = res.data;
        if (this.folder_id) {
          let id = Date.now();
          let obj = {
            label: "返回上一级",
            parent_id: res.data[0]["parent_id"],
            id,
            exist_file: 0,
            back: true, //返回
          };
          this.folderList.unshift(obj);
        }
      });
    },
    handleDetail(bool) {
      if (bool) {
        this.isDetail = false;
        let arr = this.navArray.slice(0, 2);
        this.navArray = arr;
      } else {
        this.isDetail = true;
        this.navArray.push("产品素材");
      }
    },
    //点击文件夹进入详情
    handleFolder(item) {
      let user_id = this.userInfo.user_id;
      if (item.back) {
        //返回上一级
        let requestData = {
          file_name: "",
          parent_id: this.parent_id[this.parent_id.length - 1],
          user_id,
        };
        this.parent_id.pop();
        getFolder(requestData).then((res) => {
          this.folderList = res.data;
          this.folder_id = res.data[0]["parent_id"]; //当前文件夹ID
          if (this.parent_id.length) {
            let obj = {
              label: "返回上一级",
              parent_id: this.parent_id[this.parent_id.length - 1],
              exist_file: 0,
              back: true, //返回
            };
            this.folderList.unshift(obj);
          }
        });
      } else {
        this.folder_id = item.id; //当前文件夹ID
        //查看下一级
        this.parent_id.push(item.parent_id);
        let id = Date.now();
        this.folderList = item.children;
        let requestData = {
          file_name: "",
          parent_id: item.id,
          user_id,
        };
        getFolder(requestData).then((res) => {
          this.folderList = res.data;
          let obj = {
            label: "返回上一级",
            parent_id: item.parent_id,
            id,
            exist_file: 0,
            back: true, //返回
          };
          this.folderList.unshift(obj);
        });
      }
    },
    //上传改变事件
    handleImageChange(file, fileList) {
      this.requestMiniCode.image = file.raw;
      this.requestMiniCode.image_name = file.name;
      //获取原始文件的个数
      if (!this.fileTotal) {
        this.fileTotal = document.getElementsByName(
          this.uploadId
        )[0].files.length;
      }
    },
    //图片上传成功
    handleImageSuccess(response, file) {
      this.uploadFiles.push(file);
      if (this.fileTotal == this.uploadFiles.length) {
        // 图片上传完
        let file_infos = this.uploadFiles.map((item) => {
          return {
            web_path: this.httpUrls.ossUrl + item.response.data.new_url,
            file_name: item.name,
          };
        });
        let user_id = this.userInfo.user_id;
        let requestData = {
          user_id,
          parent_id: this.folder_id,
          vector_style: 2,
          file_infos,
        };
        uploadFolder(requestData).then((res) => {
          this.$message.success("文件上传成功！");
          this.fileTotal = null;
          this.uploadFiles = [];
          this.init();
        });
      }
    },
    handleEdit(item) {
      this.$prompt("请输入最新文件夹的名称", "编辑", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        inputPattern: /.+/,
        inputErrorMessage: "请输入最新编辑的名称",
      })
        .then(({ value }) => {
          let user_id = this.userInfo.user_id;
          let requestData = {
            user_id,
            parent_id: this.folder_id,
            file_name: value,
            folder_id: item.id,
            vector_style: item.vector_style,
            index_model: item.index_model,
            vector_model: item.vector_model,
            belong: this.$route.query.id,
            view_range: item.view_range,
            description: item.description,
          };
          editFolder(requestData).then((res) => {
            this.$message.success("编辑成功！");
            this.init();
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消创建",
          });
        });
    },
    //创建分组
    handleCreateFolder() {
      this.$prompt("请输入分组名称", "创建分组", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        inputPattern: /.+/,
        inputErrorMessage: "请输入分组名称",
      })
        .then(({ value }) => {
          let user_id = this.userInfo.user_id;
          let requestData = {
            user_id,
            parent_id: this.folder_id,
            file_name: value,
          };
          createFolder(requestData).then((res) => {
            this.$message.success("分组创建成功！");
            this.init();
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消创建",
          });
        });
    },
    //删除文件夹
    handleDeleteFolder(item) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          deleteFolder({ folder_id: item.id }).then((res) => {
            if ((res.code = 20000)) {
              this.$message.success("删除成功!");
              this.init();
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
    // 获取图片标签
    getTagArray(e) {
      this.$set(this.dialogImage, "tagArray", e);
    },
    //确认图片编辑
    handleEditImage() {
      console.log("图片打标签事件");
    },
    //点击图片编辑
    handleDialogImage(item) {
      // let tagArr = item.pic_tags.filter((v) => v != "");
      this.imageDialogVisible = true;
      let tagArr = [];
      this.$set(
        this.dialogImage,
        "iamge",
        "xcx/com/message_center/Rectangle 34625122.png"
      );
      this.$set(this.dialogImage, "title", "图片1");
      this.$set(this.dialogImage, "tagArray", tagArr);
      this.$set(this.dialogImage, "pic_id", 123456789);
      this.knowledgeImageTitle = "编辑标签";
      setTimeout(() => {
        this.$refs.tagInputs.$refs.inputTag.setAttribute(
          "placeholder",
          "请输入标签，逗号分割创建标签"
        );
      }, 100);
    },
    //分页
    callFather(val) {
      console.log("触发callFather");
    },
  },
};
</script>

<style lang="scss" scoped>
.imageDialog-box {
  display: flex;
  justify-content: space-between;
  align-items: center;
  img {
    width: 180px;
    height: auto;
  }
  .imageDialog-box-content {
    width: calc(100% - 180px - 25px);
    > div:first-child {
      // display: flex;
      // align-items: center;
      div:first-child {
        color: #000;
        font-family: PingFang SC;
        font-size: 13px;
        font-style: normal;
        font-weight: 400;
        line-height: normal;
        margin-bottom: 15px;
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
.popover {
  border-radius: 4px;
  box-shadow: 0px 5px 20px 0px rgba(51, 51, 51, 0.05);
  z-index: 100;
  > div {
    padding: 8px 0px;
    background: rgb(253, 253, 253);
    // text-align: center;
  }
  > div:first-child {
    border-bottom: 1px solid #ccc;
  }
  > div:last-child {
    color: #ff0f00;
  }
}
.circular_icon {
  width: 24px;
  height: 24px;
  cursor: pointer;
}
.domHover {
  cursor: pointer;
}
.main {
  width: 100%;
  padding-bottom: 30px;
  box-sizing: border-box;
  .top {
    width: 100%;
    padding: 30px 50px;
    padding-bottom: 0px;
    box-sizing: border-box;
    .top_T {
      width: 100%;
      display: flex;
      justify-content: space-between;
      .top_T_left {
        display: flex;
        img {
          width: 48px;
          height: 48px;
          border-radius: 50%;
          margin-right: 10px;
        }
        > div {
          height: 48px;
          div:first-child {
            font-weight: 600;
            font-size: 16px;
            color: #000000;
          }
          div:last-child {
            font-weight: 400;
            color: #666666;
            font-size: 14px;
            margin-top: 6px;
          }
        }
      }
      .top_T_right {
        display: flex;
        .upload-btn {
          width: auto !important;
          display: flex;
          padding: 10px 15px;
          box-sizing: border-box;
          height: 40px;
          background: #3363f6;
          border-radius: 8px 8px 8px 8px;
          img {
            width: 20px;
            height: 20px;
            margin-right: 5px;
          }
          div {
            font-weight: bold;
            font-size: 14px;
            color: #ffffff;
          }
        }
        .upload-btn:last-child {
          background: #fff;
          border: 1px solid #e6e6e6;
          margin-left: 10px;
          div {
            color: #000000;
          }
        }
      }
    }
    .top_B {
      display: flex;
      align-items: center;
      margin-top: 29px;
      > div:first-child {
        width: 320px;
      }
      > div:last-child {
        line-height: 40px;
        padding: 0px 16px;
        margin-left: 10px;
        background: #3363f6;
        border-radius: 8px 8px 8px 8px;
        font-weight: bold;
        font-size: 14px;
        color: #ffffff;
        cursor: pointer;
      }
    }
  }
  .container {
    width: 100%;
    padding: 30px 50px;
    padding-bottom: 0px;
    box-sizing: border-box;
    .container-list {
      display: flex;
      justify-content: flex-start;
      gap: 20px;
      flex-wrap: wrap;
    }
    .container-box {
      width: 125px;
      position: relative;
      .container-box-top {
        width: 100%;
        height: 164px;
        text-align: center;
        padding: 24px 22px;
        box-sizing: border-box;
        background: #f6f6f7;
        border-radius: 10px 10px 10px 10px;
        border: 1px solid #f8f8f8;
        > img {
          width: auto;
          height: 80px;
          margin-bottom: 4px;
          border-radius: 8px 8px 8px 8px;
          text-align: center;
        }
        div {
          font-size: 14px;
          font-weight: 400;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
        }
      }
      .container-box-bottom {
        width: 100%;
        padding: 7px 0px;
        box-sizing: border-box;
        border-radius: 8px 8px 8px 8px;
        border: 1px solid #3363f6;
        font-weight: bold;
        font-size: 14px;
        text-align: center;
        color: #3363f6;
        margin-top: 10px;
        cursor: pointer;
      }
      .container_box_right {
        position: absolute;
        top: 5px;
        right: 6px;
        z-index: 100;
      }
    }
  }
}
</style>