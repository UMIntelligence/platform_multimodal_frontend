<template>
  <div class="main">
    <EnterpriseNav></EnterpriseNav>
    <div class="container">
      <div class="container-box">
        <div class="left" ref="left" :style="{ height: leftHeight }">
          <img
            src="https://umi-intelligence.oss-cn-shenzhen.aliyuncs.com/xcx/com/message_center/Rectangle 34625122.png"
            alt=""
          />
        </div>
        <div class="right" :style="{ height: leftHeight }">
          <div class="right-top" ref="rightT">
            <!-- 工具栏 -->
            <div class="right-tool">
              <img :src="deletaIcon" alt="" @click="handleDelete"/>
              <img :src="editIcon" alt="" @click="handleDialogImage"/>
              <img :src="downloadIcon" alt="" />
            </div>
            <!-- 图片标题 -->
            <div class="right-title">图片标题啊实打实</div>
            <!-- 图片标签 -->
            <div class="right-tags">
              <div>
                <div v-for="item in 16" :key="item" class="tags">标签1</div>
              </div>
            </div>
          </div>
          <div class="line"></div>
          <!-- 素材 -->
          <div class="right-bottom" :style="{height:`calc(100% - ${rT_height}px - 42px)`}">
            <div class="title">
              <img
                :src="
                  httpUrls.ossUrl +
                  'xcx/com/message_center/Group_427319934@2x (4).png'
                "
                alt=""
              />
              <div>产品素材</div>
            </div>
            <div class="right-bottom-content">
              <div class="rBottom-content-list">
                <img
                  src="https://umi-intelligence.oss-cn-shenzhen.aliyuncs.com/xcx/com/message_center/Rectangle 34625122.png"
                  alt=""
                  v-for="item in 16"
                  :key="item"
                />
              </div>
            </div>
          </div>
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
            <div>文件名称</div>
            <div>
              <el-input v-model="dialogImage.title"/>
            </div>
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
  </div>
</template>

<script>
import EnterpriseNav from "../../../components/enterprise_nav.vue";
import tagInput from "../../../components/tagInput.vue";
import httpUrls from "../../../api/requestURL";
export default {
  name: "knowledgeBase_imageEdit",
  data() {
    return {
      httpUrls,
      left: null, //节点
      rightT:null,//节点
      rT_height:null,
      leftHeight: null,
      deletaIcon:
        httpUrls.ossUrl + "xcx/com/message_center/Group_427320032@2x.png",
      editIcon:
        httpUrls.ossUrl + "xcx/com/message_center/Group_427320031@2x.png",
      downloadIcon:
        httpUrls.ossUrl + "xcx/com/message_center/Group_427320033@2x.png",
      //图片打标签
      knowledgeImageTitle: "",
      imageDialogVisible: false,
      dialogImage: {
        //图片弹出框
        iamge: "",
        title: "",
        tagArray: [],
        pic_id: "",
      },
    };
  },
  mounted() {
    let height = this.$refs.left.offsetWidth;
    this.rightT = this.leftHeight = height + "px";
    this.rT_height = this.$refs.rightT.offsetHeight;
  },
  methods:{
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
      let tagArr = [];
      this.$set(
        this.dialogImage,
        "iamge",
        "xcx/com/message_center/Rectangle 34625122.png"
      );
      this.$set(this.dialogImage, "title", "图片1");
      this.$set(this.dialogImage, "tagArray", tagArr);
      this.$set(this.dialogImage, "pic_id", 123456789);
      this.imageDialogVisible = true;
      this.knowledgeImageTitle = "编辑标签";
    },
     //删除图片
    handleDelete() {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "删除成功!",
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
  },
  components: {
    EnterpriseNav,
    tagInput
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
.main {
  width: 100%;
  min-height: 100%;
  height: 100%;
  .container {
    width: 100%;
    height: calc(100% - 60px);
    display: flex;
    justify-content: center;
    align-items: center;
    background: #f6f8fa;
    .container-box {
      max-width: 1206px;
      width: 70%;
      height: auto;
      padding: 30px;
      box-sizing: border-box;
      box-shadow: 0px 0px 40px 0px rgba(0, 0, 0, 0.03);
      border-radius: 20px 20px 20px 20px;
      background: #fff;
      border: 1px solid #f0f0f0;
      display: flex;
      justify-content: space-between;
      .left {
        width: 60%;
        background: #f2f2f5;
        box-shadow: 0px 0px 40px 0px rgba(0, 0, 0, 0.03);
        border-radius: 10px 10px 10px 10px;
        position: relative;
        img {
          width: auto;
          height: 100%;
          position: absolute;
          left: 50%;
          transform: translate(-50%);
        }
      }
      .right {
        width: calc(40% - 30px);
        .right-tool {
          display: flex;
          justify-content: end;
          margin-bottom: 20px;
          img {
            width: 40px;
            height: 40px;
            margin-left: 10px;
            cursor: pointer;
          }
        }
        .right-title {
          font-weight: bold;
          font-size: 20px;
          color: #000000;
          margin-bottom: 15px;
        }
        .right-tags {
          width: 100%;
          height: 72px;
          overflow-y: auto;

          > div {
            width: 100%;
            display: flex;
            // justify-content: space-between;
            gap: 10px;
            flex-wrap: wrap;
            .tags {
              width: calc(100% / 4 - 10px);
              padding: 5px 0px;
              box-sizing: border-box;
              text-align: center;
              font-weight: 500;
              font-size: 14px;
              border-radius: 8px 8px 8px 8px;
              border: 1px solid #e6e6e6;
            }
          }
        }
        .line {
          width: 100%;
          border: 1px solid #f2f2f2;
          margin: 20px 0px;
        }
        .right-bottom {
          width: 100%;
          .title {
            display: flex;
            align-items: center;
            margin-bottom: 15px;
            img {
              width: 16px;
              height: 16px;
              margin-right: 7px;
            }
            div {
              font-weight: 600;
              font-size: 14px;
              color: #000000;
            }
          }
          .right-bottom-content {
            width: 100%;
            height: calc(100% - 35px);
            overflow-y: auto;
            .rBottom-content-list{
              width: 100%;
              display: flex;
              flex-wrap: wrap;
              gap: 3px;
              img{
                width: calc(100% / 4 - 3px);
                cursor: pointer;
              }
            }
          }
        }
      }
    }
  }
}
</style>