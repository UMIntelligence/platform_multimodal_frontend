<template>
  <div id="main">
    <div class="back" v-if="detailData.length" @click="goBack">
      <i class="el-icon-arrow-left"></i>
      <div>返回</div>
    </div>
    <div class="container">
      <!-- 左边盒子 -->
      
      <div
        class="left"
        :style="
          informationData.length
            ? 'height: calc(100vh -  56px - 30px - 30px)'
            : ''
        "
        id="mask"
        v-if="detailData.length == 0"
      >
        <div
          id="list"
          :style="
            informationData.length
              ? 'height: calc(100% - 32px - 52px - 20px);'
              : 'height: calc(100% - 42px - 41px);'
          "
        >
          <!-- 子盒子 -->
          <template>
            <div
              class="left-box"
              v-for="item in informationData"
              :key="item.message_id"
              @click="handleDetails(item)"
            >
              <img class="left-img" :src="item.image" alt="" />
              <div class="left-content">
                <div>
                  <div>{{ item.title }}</div>
                  <div>{{ item.desc }}</div>
                </div>
                <div>
                  <div class="left-time">
                    {{ informationTime(item.create_time) }}
                  </div>
                  <div>阅读{{ item.read_count }}</div>
                  <div>点赞{{ item.like_count }}</div>
                </div>
              </div>
            </div>
            <div
              v-if="!informationData.length"
              style="
                width: 100%;
                height: 100%;
                background: #fff;
                display: flex;
                justify-content: center;
                align-items: center;
              "
            >
              <el-empty description="暂无文章" :image-size="88"></el-empty>
            </div>
          </template>
        </div>
        <!-- 分页 -->
        <div class="left-bottom" v-if="informationData.length">
          <Pagination
            v-bind:child-msg="pageparm"
            @callFather="callFather"
          ></Pagination>
        </div>
        <footerRemark></footerRemark>
        <!-- 详情 -->
      </div>
      <div class="left" id="mask" style="height: calc(100%)" v-else>
        <div class="detail">
          <div
            class="left-detail"
            v-for="item in detailData"
            :key="item.message_id"
          >
            <!-- 详情标题 -->
            <div class="detail-title">
              {{ item.title }}
            </div>
            <!-- 图标 -->
            <div class="detail-icon">
              <div>
                <img
                  :src="
                    httpUrls.ossUrl +
                    'static/picture/60325600-b2d3-4f7a-b384-027d05121f5f.png'
                  "
                  alt=""
                />
              </div>
              <span>无忧秘书智脑</span>
              <el-popover placement="right" width="180" trigger="click">
                <div style="display: flex; justify-content: center">
                  <div style="">
                    <!-- <img style="width: 180px;" :src="officialAccount" alt=""> -->
                    <img
                      style="width: 180px"
                      :src="
                        httpUrls.ossUrl +
                        'static/picture/dc6868c4-f6ea-42dc-935e-5fff7338f72e.jpg'
                      "
                      alt=""
                    />
                    <div
                      style="text-align: center; position: relative; top: -9px"
                    >
                      手机扫码关注微信公众号
                    </div>
                  </div>
                </div>
                <div slot="reference" class="add_code">关注公众号</div>
              </el-popover>
            </div>
            <!-- 内容 -->
            <div class="detail_html">
              <!-- <div v-html="detailData[0].content"></div> -->
              <VueOfficeDocx src="https://umi-intelligence.oss-cn-shenzhen.aliyuncs.com/message_center_old/427.docx" @rendered="rendered"></VueOfficeDocx>
            </div>
            <div class="qr-code">
              <div v-for="item in qrCode" :key="item.pic_id">
                <img :src="item.pic_url" alt="" />
                <div>{{ item.pic_desc }}</div>
              </div>
            </div>
            <!-- 时间 -->
            <div>
              <div class="left-time">
                {{ informationTime(item.create_time) }}
              </div>
              <div>阅读{{ item.read_count }}</div>
              <div>点赞{{ item.like_count }}</div>
            </div>
          </div>
        </div>
        <footerRemark></footerRemark>
      </div>
      <!-- 右边盒子 -->
      <div class="right">
        <!-- 二维码区域 -->
        <div class="right-top">
          <img
            :src="
              httpUrls.ossUrl +
              'static/picture/837d9bcd-e7de-477c-a340-e3e03c5d834b.png'
            "
            alt=""
          />
        </div>
        <!-- 相关推荐 -->
        <div class="related" id="related">
          <!-- 标题 -->
          <div class="title" style="margin-bottom: 14px">相关推荐</div>
          <!-- 相关推荐内容展示 -->
          <div
            style="height: calc(100% - 28px); overflow-y: auto"
            id="related-list"
          >
            <!-- <div
              class="related-box"
              v-for="item in informationData"
              :key="item.message_id"
              style="cursor: pointer"
              @click="handleDetails(item)"
            >
              <div class="related-title">
                <div>{{ ificationFn(item.cate) }}</div>
                <span>{{ informationTime(item.create_time) }}</span>
              </div>
              <img class="related-img" :src="item.image" />
              <div class="releted-content">{{ item.title }}</div>
            </div> -->
            <div 
              class="related-box"
              v-for="item in informationData"
              :key="item.message_id"
              @click="handleDetails(item)"
            >
              <div class="relatedInformation">
                <div class="related-title">{{item.title}}</div>
                <div class="related-tool">
                  <div>{{ informationTime(item.create_time) }}</div>
                  <div>
                    <div>阅读{{item.read_count.length >= 5?(Number(item.read_count) / 10000).toFixed(1)+'w':item.read_count}}</div>
                    <div>点赞{{item.like_count.length >= 5?(Number(item.like_count) / 10000).toFixed(1)+'w':item.like_count}}</div>
                  </div>
                </div>
              </div>
              <img :src="item.image" alt="">
            </div>
            <div
              v-if="!informationData.length"
              style="
                width: 100%;
                height: 100%;
                background: #fff;
                display: flex;
                justify-content: center;
                align-items: center;
              "
            >
              <el-empty description="暂无文章" :image-size="88"></el-empty>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { informationList, informationDetail } from "../../api/information";
import { pictures } from "../../api/chatMG";
import httpUrls from "../../api/requestURL";
import Pagination from "../../components/Pagination";
import footerRemark from "../../components/footerRemark";
import VueOfficeDocx from '@vue-office/docx'
import { mapGetters } from "vuex";
import { marked } from "marked";
export default {
  name: "information",
  data() {
    return {
      httpUrls,
      ificationData: [
        { value: "fun", label: "趣闻轶事" },
        { value: "free_resources", label: "免费资源" },
        { value: "applications", label: "垂直应用" },
        { value: "hashrates_share", label: "算力分享" },
        { value: "llm", label: "大模型" },
        { value: "drawing", label: "AI绘画" },
        { value: "meta_universe", label: "元宇宙" },
        { value: "AIGC", label: "AIGC" },
        { value: "AGI", label: "AGI" },
      ], //分类数组
      ification: "fun",
      informationData: [],
      detailData: [],
      userInfo: {},
      pageparm: {
        currentPage: 1,
        pageSize: 10,
        total: 10,
      },
      qrCode: {},
      fileUrl:"https://umi-intelligence.oss-cn-shenzhen.aliyuncs.com/message_center/5555.docx",
      loading:false
    };
  },
  // 注册组件
  components: {
    Pagination,
    footerRemark,
    VueOfficeDocx
  },
  computed: {
    ...mapGetters([
      "selectIfication",
    ]),
  },
  watch: {
    selectIfication: {
      deep: true,
      handler() {
        if (this.detailData.length) {
          this.goBack();
        }
        if(this.selectIfication){
          this.ification = this.selectIfication;
          // this.pageparm.currentPage = 1;
          // this.pageparm.pageSize = 10;
          this.init();
        }
        
      },
    },
  },
  created() {
    console.log('进入created')
    this.userInfo = JSON.parse(localStorage.getItem("userInfo"));
    let item = sessionStorage.getItem("information");
    if (item && item.length) {
      let query = JSON.parse(item);
      if (query) {
        this.handleDetails(query);
      }
    }
    if (this.$route.query.message_id) {
      // 请求参数
      let data = {
        user_id: this.userInfo.user_id,
        message_type: this.$route.query.message_type
          ? this.$route.query.message_type
          : 2,
        message_id: this.$route.query.message_id,
      };
      // this.$router.replace({
      //   query: {
      //     message_id: this.$route.query.message_id,
      //     message_type: this.$route.query.message_type,
      //   },
      // });
      informationDetail(data)
        .then((res) => {
          if (res.code == 20000) {
            this.detailData = res.data;
            this.$set(
              this.detailData[0],
              "content",
              marked(this.detailData[0].content)
            );
          }
        })
        .catch((err) => {
          console.log(err, "详情失败");
        });
    }
    // this.ification = this.$route.params.ification;
    
    this.init();
    let arr = [];
    pictures().then((res) => {
      this.qrCode = res.data[4];
      res.data.map((item) => {
        if (item.type == 8) {
          arr.push(item);
        }
      });
      this.qrCode = arr;
    });
  },
  beforeDestroy() {
    // sessionStorage.setItem("information",' ')
    this.detailData.length = 0;
    this.detailData = [];
    sessionStorage.setItem("information", "");
  },
  methods: {
    rendered() {
      this.loading = false
    },
    //返回
    goBack() {
      this.detailData = [];
    },
    //处理分类标题函数
    ificationFn(val) {
      let data;
      if (val) {
        data = this.ificationData.find((item) => item.value == val).label;
      } else {
        data = "暂无类别";
      }
      return data;
    },
    //分页
    callFather(parm) {
      this.pageparm.currentPage = parm.currentPage;
      this.pageparm.pageSize = parm.pageSize;
      this.init();
    },
    init(str = "") {
      // if (str == "gundong") {
      //   this.page_index++;
      // }
      // if (this.page_index > 5) {
      //   return;
      // }
      //请求参数
      let data;
      if (this.ification == 0 || !this.ification) {
        data = {
          user_id: this.userInfo.user_id,
          message_type: 2,
          page_index: this.pageparm.currentPage,
          page_count: this.pageparm.pageSize,
        };
      } else {
        data = {
          cate: this.ification,
          user_id: this.userInfo.user_id,
          message_type: 2,
          page_index: this.pageparm.currentPage,
          page_count: this.pageparm.pageSize,
        };
      }
      // console.log(data.cate, "分类");
      informationList(data)
        .then((res) => {
          // console.log(res.data);
          if (res.code == 20000) {
            this.pageparm.total = parseInt(res.total);
            if (str == "gundong") {
              this.informationData = this.informationData.concat(res.data);
            } else {
              this.informationData = res.data;
            }
          }
        })
        .catch((err) => {
          console.log(err, "错误信息");
        });
    },

    informationTime(val) {
      let time = new Date(val);
      return (
        time.getFullYear() + "/" + (time.getMonth() + 1) + "-" + time.getDate()
      );
    },
    // 详情
    handleDetails(val) {
      // 请求参数
      let data = {
        user_id: this.userInfo.user_id,
        message_type: val.message_type,
        message_id: val.message_id,
      };
      this.$router.push({
        query: {
          message_id: val.message_id,
          message_type: val.message_type,
        },
      });
      informationDetail(data)
        .then((res) => {
          if (res.code == 20000) {
            this.detailData = res.data;
            this.$set(
              this.detailData[0],
              "content",
              marked(this.detailData[0].content)
            );
          }
        })
        .catch((err) => {
          console.log(err, "详情失败");
        });
    },
  },
};
</script>

<style scoped lang="scss">
/deep/ .docx-wrapper{
  background:transparent;
  padding: 0px !important;
  padding-top: 20px !important;
  .docx{
    width: 100% !important;
    padding: 0px !important;
    min-height: 0pt !important;
    box-shadow: 0px 0px 0px 0px #fff !important;
  }
}
.back{
  position: absolute;
  top: 30px;
  left: 30px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 4px;
}
.left-top {
  position: relative;
  top: -8px;
}
.detail_html /deep/ img {
  max-width: 100%;
}
.qr-code {
  width: 100%;
  display: flex;
  justify-content: space-between;
  img {
    width: 180px;
    height: 180px;
  }
}
#main {
  width: 100%;
  height: calc(100vh - 100px);
  background-color: rgb(241, 242, 245);
  display: flex;
  justify-content: center;
  box-sizing: border-box;
  position: relative;
  overflow: hidden;
  padding-top: 30px;
  .go-back-page {
    display: flex;
    width: 55px;
    margin: 0px;
    // margin: 20px 0;
    position: absolute;
    top: 30px;
    left: 10px;
    // left: -80px;
    .back {
      cursor: pointer;
    }
  }

  .container {
    width: 80%;
    max-width: 1200px;
    margin: 0px auto;
    // height: calc(100vh -30px - 56px);
    display: flex;
    justify-content: space-between;
    position: absolute;
    // overflow: scroll;

    .left {
      width: calc(100% - 370px - 20px);
      height: calc(100vh - 56px - 30px);
      // overflow-y: auto;
      #list {
        width: 100%;
        box-sizing: border-box;
        overflow-y: auto;
        // background: #FFF;
      }

      .left-box {
        width: 100%;
        height: 150px;
        padding: 15px;
        margin-bottom: 10px;
        box-sizing: border-box;
        background-color: white;
        border-radius: 5px;
        display: flex;

        .left-img {
          width: 180px;
          height: 100%;
          margin-right: 10px;
        }

        .left-content {
          width: calc(100% - 190px);
          height: 100%;
          position: relative;

          // background-color: #1F64FF;
          > div:first-child {
            width: 100%;
            position: absolute;
            top: 0px;
            > div:first-child {
              width: 100%;
              color: #333;
              font-family: PingFang SC;
              font-size: 18px;
              font-style: normal;
              font-weight: 600;
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;
              line-height: 150%;
            }
            > div:last-child {
              color: #333;
              font-family: PingFang SC;
              font-size: 14px;
              font-style: normal;
              font-weight: 400;
              line-height: 150%;
              width: 100%;
              overflow: hidden;
              text-overflow: ellipsis;
              display: -webkit-box;
              -webkit-line-clamp: 2;
              -webkit-box-orient: vertical;
            }
          }

          > div:last-child {
            color: #a6a6a6;
            font-family: PingFang SC;
            font-size: 12px;
            font-style: normal;
            font-weight: 400;
            line-height: 150%;
            position: absolute;
            bottom: 0px;
            display: flex;

            .left-time {
              margin-right: 51px;
            }

            div:last-child {
              margin-left: 16px;
            }
          }
        }
      }

      .left-box:last-child {
        margin-bottom: 0px;
      }
      .detail{
        width: 100%;
        height: calc(100vh - 130px);
        overflow-y: auto;
      }
      .left-detail {
        background-color: white;
        border-radius: 5px;
        padding: 15px;
        padding-bottom: 30px;
        box-sizing: border-box;
        .detail-title {
          color: #333;
          font-family: PingFang SC;
          font-size: 30px;
          font-style: normal;
          font-weight: 500;
          line-height: 150%;
          /* 45px */
        }

        .detail-icon {
          display: flex;
          align-items: center;
          margin-top: 16px;
          img {
            width: 100%;
            height: 100%;
          }
          > div:first-child {
            width: 30px;
            height: 33px;
            flex-shrink: 0;
            border-radius: 6px;
            // background: #1f64ff;
            display: flex;
            justify-content: center;
            align-items: center;
            margin-right: 10px;
          }

          span {
            color: #333;
            font-family: PingFang SC;
            font-size: 14px;
            font-style: normal;
            font-weight: 400;
            line-height: 25px;
            /* 21px */
          }
          .add_code {
            font-size: 12px;
            padding: 0 12px;
            color: #1f64ff;
            border: 1px solid #1f64ff;
            border-radius: 2px;
            line-height: 28px;
            cursor: pointer;
            margin-left: 10px;
          }
        }

        > div:last-child {
          color: #a6a6a6;
          font-family: PingFang SC;
          font-size: 12px;
          font-style: normal;
          font-weight: 400;
          line-height: 150%;
          display: flex;
          margin-top: 15px;

          .left-time {
            margin-right: 51px;
          }

          div:last-child {
            margin-left: 16px;
          }
        }
      }

      .left-box:hover {
        cursor: pointer;
      }
    }

    .right {
      width: 370px;
      overflow: hidden;
      height: 100%;
      padding-bottom: 30px;
      box-sizing: border-box;
      overflow: hidden;
      display: flex;
      flex-direction: column;
      gap: 20px;
      .right-top {
        width: 100%;
        border-radius: 5px;
        background-color: white;
        display: flex;
        justify-content: center;
        align-items: center;
        position: relative;
        > img {
          width: 80%;
          height: auto;
        }
      }

      .related {
        width: 100%;
        height: calc(100% - 310px - 20px);
        flex-shrink: 0;
        border-radius: 4px;
        padding: 14px;
        box-sizing: border-box;
        background: #fff;
        .title{
          font-weight: 500;
          font-size: 16px;
          color: #000000;
        }
        #related-list::-webkit-scrollbar{
          width: 0px !important;
        }
        .related-box{
          width: 100%;
          display: flex;
          justify-content: space-between;
          cursor: pointer;
          margin-bottom: 20px;
          .relatedInformation{
            width: calc(100% - 118px - 15px);
            .related-title{
              font-weight: 400;
              font-size: 14px;
              color: #333333;
              overflow: hidden;
              text-overflow: ellipsis;
              display: -webkit-box;
              -webkit-line-clamp: 2;
              -webkit-box-orient: vertical;
              line-height: 21px;
              height: 42px;
            }
            .related-tool{
              margin-top: 24px;
              display: flex;
              align-items: center;
              justify-content: space-between;
              font-weight: 400;
              font-size: 12px;
              color: #A6A6A6;
              white-space: nowrap;
              div:last-child{
                display: flex;
                align-items: center;
                gap: 5px;
              }
            }
          }
          img{
            width: auto;
            max-width: 118px;
            height: 80px;
            border-radius: 8px 8px 8px 8px;
          }
        }
      }
    }
  }

  // .main-box {
  //   width: 100%;
  //   height: 100%;
  // }
}
</style>