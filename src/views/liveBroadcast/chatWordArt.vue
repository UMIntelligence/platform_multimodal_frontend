<template>
  <div class="draw-chat">
    <div class="work_area" style="width: 390px">
      <div class="select_workspace">
        <div class="item" @click="showWorspaceOrHistory(1)">艺术字姓氏头像</div>
      </div>

      <!-- 工作区 -->
      <div class="workSpace_area">
        <!-- 类型 -->
        <div class="typesof">
          <div class="workSpace_area-title">
            请输入你的姓氏,AI生成专属艺术头像
          </div>
          <div class="chatWordArt-input">
            <el-input
              v-model="chatInput"
              placeholder="请输入姓氏,支持1-2汉字"
            ></el-input>
            <span
              class="workSpace_area-title"
              style="color: red; margin-top: 5px"
              v-if="chatInputTips"
              >* 未监测到您的姓氏,请重新输入</span
            >
          </div>
        </div>

        <!-- 图片风格 -->
        <div class="img_style" v-if="modelData.length">
          <div
            class="workSpace_area-title"
            style="justify-content: space-between"
          >
            <div style="display: flex; align-items: center">
              <span style="margin-right: 4px">风格</span>
              <el-tooltip
                class="item"
                effect="dark"
                content="选择效果: 将生成和效果封面类似的风格或主题图片"
                placement="top-start"
              >
                <img
                  src="../../assets/images/help-circle.png"
                  style="width: 16px; cursor: pointer"
                  alt=""
                />
              </el-tooltip>
            </div>
          </div>
          <div class="style_mask">
            <div
              style="
                display: flex;
                justify-content: space-between;
                flex-wrap: wrap;
                width: 100%;
                height: calc(80px * 5 + 15px);
                cursor: pointer;
              "
            >
              <div
                :class="checkModel == item.title ? 'item item-on' : 'item'"
                v-for="(item, index) in modelData"
                :key="index"
                v-show="item.bool"
              >
                <img
                  class="img"
                  :src="httpUrls.ossUrl + item.pic_url"
                  @click="checkModel = item.title"
                  alt=""
                />
                <div class="title">{{ item.title }}</div>
              </div>
            </div>
          </div>
        </div>
        <!-- 生成 -->
        <div class="img_create">
          <div>
            <img
              :src="
                httpUrls.ossUrl +
                'static/picture/66bbd9a7-4e2d-4137-801e-b46e0567ec15.png'
              "
              alt=""
            />
            <div>免费</div>
          </div>
          <div @click="createTextImg">立即生成</div>
        </div>
      </div>
    </div>
    <div class="main">
    <img  class="bgImg" :src='httpUrls.ossUrl+"static/picture/5bbdf80a-4fc6-4257-9b30-2347f4a2f4d2.png"' alt="">

      <!-- 大图示例和用户生成图片,以及各种错误提示区 -->
      <div class="workspace_main">
        <div class="workspace_mask">
          <div>
            <!-- SD -->
            <div class="img_msk">
              <!-- 示例 -->
              <div v-if="chatImage">
                <!-- 虚影图片 -->
                <!-- <img class="filter_img" :src="exampleItem.pic_url" alt=""> -->
                <img class="filter_img" :src="chatImage" />
                <img class="img" :src="chatImage" />
                <!-- 显示图片 -->
                <!-- 提示 -->
                <!-- <div class="draw-result-tips" v-if="chatImage">
                  <img
                    class="tips_img"
                    src="../../assets/images/alert-triangle.png"
                  />
                  <span
                    >当前内容为AI生成,不做任何决策使用！由此引发的一切后果,需自行承担,请知悉</span
                  >
                </div> -->
              </div>
              <div v-else>
                <!-- 虚影图片 -->
                <img
                  class="filter_img"
                  :src="
                    httpUrls.ossUrl +
                    'static/picture/c18fd45b-a649-4577-a917-433ceace4427.png'
                  "
                />
                <img
                  class="img"
                  :src="
                    httpUrls.ossUrl +
                    'static/picture/c18fd45b-a649-4577-a917-433ceace4427.png'
                  "
                />
              </div>
            </div>
            <div
              
              style="
                display: flex;
                flex-wrap: wrap;
                width: 450px;
                height: 150px;
                justify-content: end;
                position: relative;
              "
            >
              <img v-if="chatImage" class="smallImg" :src="chatImage" />
            </div>
          </div>
        </div>
      </div>
      <div class="main-bottom" v-if="chatImage">
        <div class="draw-result-tips">
          <img class="tips_img" src="../../assets/images/alert-triangle.png" />
          <span
            >当前内容为AI生成,不做任何决策使用！由此引发的一切后果,需自行承担,请知悉</span
          >
        </div>
        <div style="cursor: pointer" @click.stop="downloadImgs(chatImage)">
          一键下载
        </div>
      </div>
    </div>
    <div class="work_area" style="width: 20%; padding: 0px 20px">
      <div class="select_workspace">
        <div
          :class="selsectWorkSpaceRight == 4 ? 'item item-on' : 'item'"
          @click="showWorspaceOrHistory(4)"
        >
          历史记录
        </div>
      </div>
      <!-- 历史记录 -->
      <div class="history-list" id="history-list">
        <div class="mask" id="history-mask">
          <div
            class="item"
            v-for="(item, i) in chatHistoryData"
            :key="i"
            v-if="item"
          >
            <img class="img" :src="item" alt="" @click="getDrawDetail(item)" />
            <i
              class="el-icon-close del"
              @click="deleteDrawHistory(item, i)"
            ></i>
          </div>
          <div class="noHistory" v-if="chatHistoryData.length == 0">
            暂无数据
          </div>
        </div>
      </div>
    </div>

    <pay ref="Pay"></pay>
  </div>
</template>

<script>
import httpUrls from "../../api/requestURL";
import Register from "../../components/register";
import pay from "../../components/pay";
import chatWordArtData from "./name";
import { mapGetters } from "vuex";
export default {
  name: "draw-chat",
  data() {
    return {
      socket: null, //websocket
      numberArr: [],
      checkModel: "龙宝宝",
      modelData: [
        {
          pic_url: "static/picture/d1970eb0-eeeb-4a95-9e0c-630fe57da3f8.jpg",
          title: "龙宝宝",
          bool: true,
        },
        {
          pic_url: "static/picture/58814065-27c4-4b2c-a524-97b4f5ab6ac3.png",
          title: "可爱毛绒绒",
          bool: true,
        },
        {
          pic_url: "static/picture/67998452-bcf1-49ca-920e-f0974e5ed369.png",
          title: "霸气土豪金",
          bool: true,
        },
        {
          pic_url: "static/picture/990bd2e0-5f5d-406f-b568-87a714aab5be.png",
          title: "凤凰",
          bool: true,
        },
        {
          pic_url: "static/picture/17835518-4d0f-40fd-b5e9-34d601171de6.jpg",
          title: "古建筑",
          bool: true,
        },
        {
          pic_url: "static/picture/576e1546-4135-49d1-a2ea-59df9d08962f.png",
          title: "金色翅膀",
          bool: true,
        },
        {
          pic_url: "static/picture/6b86939e-e08c-4d1e-afcc-0eb18cab55db.jpg",
          title: "金色美女",
          bool: true,
        },
        {
          pic_url: "static/picture/40849969-e10c-4bcd-a71a-e12f7e1ad1ad.png",
          title: "精致羽毛",
          bool: true,
        },
        {
          pic_url: "static/picture/cd6b36ef-f879-4716-af2f-b4f0e0c22a67.png",
          title: "兰花小清新",
          bool: true,
        },
        {
          pic_url: "static/picture/a4b3da91-58ca-4bd7-b6cf-7bbc5190ce3d.png",
          title: "蓝色龙年",
          bool: true,
        },
        {
          pic_url: "static/picture/ec765273-46ff-4880-a103-6ddb6d9e9fa8.png",
          title: "毛绒谐音梗",
          bool: true,
        },
        {
          pic_url: "static/picture/4ef984ef-ed90-4738-b38c-8356f977ee4d.png",
          title: "瀑布光影字",
          bool: true,
        },
        {
          pic_url: "static/picture/5d8f2e96-217c-4ed3-8a0c-6666bfa1cee3.png",
          title: "山水如画",
          bool: true,
        },
        {
          pic_url: "static/picture/f675c1c0-5310-4a34-9bf9-8bb7a8b83034.jpg",
          title: "水墨徽州",
          bool: true,
        },
        {
          pic_url: "static/picture/276c3711-1f9b-4aff-b2b8-8fe333b63017.png",
          title: "武侠",
          bool: true,
        },
        {
          pic_url: "static/picture/0eecbd11-8ba3-4234-921d-73fc92ecce97.jpg",
          title: "雪韵江南",
          bool: true,
        },
        {
          pic_url: "static/picture/244a102f-7b17-4674-9683-cf003c67f2ba.jpg",
          title: "烟雨江南",
          bool: true,
        },
        {
          pic_url: "static/picture/e31c0de2-2dcf-4da4-a080-6f49a3ac49c7.jpg",
          title: "迎客松",
          bool: true,
        },
        {
          pic_url: "static/picture/fb215124-9417-4754-8304-e662dc364790.jpg",
          title: "优雅孔雀",
          bool: true,
        },
      ], //风格数组
      chatHistoryData: [], //历史记录
      nameData: chatWordArtData.nameData, //匹配数组
      chatWordArtStatus: false, //生成状态
      chatWordArtNumber: 0, //随机数
      chatInput: "", //艺术字文本
      chatInputTips: false, //文本提示
      styleLength: 6, //风格长度
      chatImage: "", //展示图片
      httpUrls,
      selsectWorkSpaceLeft: 1,
      selsectWorkSpaceRight: 3,

      page_size: 30,
      page: 1,
    };
  },

  components: {
    pay,
  },

  created() {
    // //建立websocket连接
    // this.socket = new WebSocket(
    //   `ws://192.168.1.33:8091/ws/dy_async/poem?dy_id=107139290621`
    // );
    // // 监听socket连接
    // this.socket.onopen = function () {
    //   console.log("建立连接成功");
    // };
    // // 监听socket错误信息
    // this.socket.onerror = this.socketError;
    // // 监听socket消息
    // this.socket.onmessage = this.socketMessage;
    // //监听socket关闭
    // this.socket.onclose = this.socketOnclose;
  },

  methods: {
    //websocket发送信息
    socketMessage(res) {
      let data = JSON.parse(res.data);
      switch (data.type) {
        case "L":
          console.log(data.msg, "礼物");
          break;
        case "D":
          let name = data.msg.split(1);
          this.chatInput = name;
          this.createTextImg();
          // console.log(data.msg, "用户输入的姓名");
        case "S":
          console.log(data.msg, "随机生成的姓名");
          break;
        default:
          break;
      }
    },
    //websocket错误信息
    socketError() {
      console.log("websocket连接失败");
    },
    //websocket关闭
    socketOnclose() {
      console.log("服务器主动关闭");
    },
    // 创建艺术字
    createTextImg() {
      if (!this.chatInput) {
        this.$message.error("请输入姓氏");
        return;
      }
      let modelIndex = this.modelData.findIndex(
        //获取选中模型
        (item) => item.title == this.checkModel
      );
      let nameArr = this.nameData[modelIndex]; //匹配对应的风格获取到对应的姓氏数组
      let arrIndex = nameArr.findIndex((item) => item == this.chatInput); //查找用户输入的姓氏是否有图片
      if (arrIndex == -1) {
        // 未查找到姓氏提示用户
        this.chatInputTips = true;
        this.chatImage =
          httpUrls.ossUrl +
          "static/picture/688c702c-bbcc-4694-b4c8-4bf397fdb8d4.png";
        return;
      } else {
        this.chatInputTips = false;
      }
      let imgArray = [];
      switch (modelIndex) {
        case 0:
          //龙宝宝
          this.chatWordArtNumber = Math.floor(Math.random() * 2) + 1; //随机数
          this.chatImage = `${httpUrls.ossUrl}name_dragon/龙宝宝_out/${nameArr[arrIndex]}${this.chatWordArtNumber}.png`;
          break;
        case 1:
          //可爱毛绒绒
          this.chatImage = `${httpUrls.ossUrl}name_cutefluffy/${nameArr[arrIndex]}.png`;
          break;
        case 2:
          //霸气土豪金
          this.chatImage = `${httpUrls.ossUrl}name_gold/${nameArr[arrIndex]}0.png`;
          break;
        case 3:
          //凤凰
          this.chatImage = `${httpUrls.ossUrl}name_fenghuang/${nameArr[arrIndex]}0.png`;
          break;
        case 4:
          //古建筑
          this.chatImage = `${httpUrls.ossUrl}name_building/${nameArr[arrIndex]}0.png`;
          break;
        case 5:
          this.chatImage = `${httpUrls.ossUrl}name_goldenwing/${nameArr[arrIndex]}0.png`;
          break;
        case 6:
          this.chatImage = `${httpUrls.ossUrl}name_goldenbeauty/${nameArr[arrIndex]}0.png`;
          break;
        case 7:
          this.chatImage = `${httpUrls.ossUrl}name_yumao/${nameArr[arrIndex]}0.png`;
          break;
        case 8:
          //兰花小清新
          this.chatImage = `${httpUrls.ossUrl}name_lanhua/${nameArr[arrIndex]}0.png`;

          break;
        case 9:
          //蓝色龙年
          this.chatImage = `${httpUrls.ossUrl}name_bluedragon/${nameArr[arrIndex]}0.png`;
          break;
        case 10:
          //毛绒谐音梗
          this.chatImage = `${httpUrls.ossUrl}name_fluffyjoke/${nameArr[arrIndex]}0.png`;
          break;
        case 11:
          //瀑布光影字
          this.chatImage = `${httpUrls.ossUrl}name_waterfall/${nameArr[arrIndex]}0.png`;
          break;
        case 12:
          //山水
          this.chatImage = `${httpUrls.ossUrl}name_shanshui/${nameArr[arrIndex]}0.png`;
          break;
        case 13:
          //水墨徽州
          this.chatImage = `${httpUrls.ossUrl}name_shuimohz/${nameArr[arrIndex]}0.png`;
          break;
        case 14:
          //武侠
          this.chatImage = `${httpUrls.ossUrl}name_wuxia/${nameArr[arrIndex]}0.png`;
          break;
        case 15:
          //雪韵江南
          this.chatImage = `${httpUrls.ossUrl}name_snowjn/${nameArr[arrIndex]}0.png`;
          break;
        case 16:
          //烟雨江南
          this.chatImage = `${httpUrls.ossUrl}name_rainjn/${nameArr[arrIndex]}0.png`;
          break;
        case 17:
          //迎客松
          this.chatImage = `${httpUrls.ossUrl}name_yingkesong/${nameArr[arrIndex]}0.png`;
          break;
        case 18:
          //孔雀
          this.chatImage = `${httpUrls.ossUrl}name_kongque/${nameArr[arrIndex]}0.png`;
          break;
        case 19:
          break;
        default:
          break;
      }
      //图片去重
      let index = this.chatHistoryData.findIndex(
        (item) => item == this.chatImage
      );
      if (index != -1) {
        return;
      }
      this.chatHistoryData.push(this.chatImage);
    },
    // 选择工作区或者历史记录
    showWorspaceOrHistory(type) {
      if (type <= 2) {
        this.selsectWorkSpaceLeft = type;
      } else {
        this.selsectWorkSpaceRight = type;
      }
      // this.selsectWorkSpace = type
      if (type == 4) {
        this.page = 1;
        console.log("触发历史记录");
        this.getChatList("aiId");
      }
    },
    //下载图片
    downloadImgs(item) {
      let url = item;
      let canvas = document.createElement("canvas"),
        ctx = canvas.getContext("2d"),
        img = new Image();
      img.crossOrigin = "*"; //解决Canvas.toDataURL 图片跨域问题
      img.onload = () => {
        canvas.height = img.height;
        canvas.width = img.width;
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        let ext = img.src.substring(img.src.lastIndexOf(".") + 1).toLowerCase(); // 获取到图片的格式
        let dataURL = canvas.toDataURL("image/" + ext); // 得到base64 编码的 dataURL
        var a = document.createElement("a"); // 生成一个a元素
        var event = new MouseEvent("click"); // 创建一个单击事件
        a.download = `${this.chatInput}.png`; // 设置图片名称
        a.href = dataURL; // 将生成的URL设置为a.href属性
        a.dispatchEvent(event); // 触发a的单击事件
        canvas = null;
      };
      img.src = url;
    },
    getDrawDetail(item) {
      this.chatImage = item;
    },

    deleteDrawHistory(item, i) {
      this.$confirm("是否删除所选信息?", "删除", {
        confirmButtonText: "确认",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$set(this.chatHistoryData, i, "");
          this.$message.success("删除成功");
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
  },
};
</script>

<style scoped>
.bgImg{
  width: 100%;
  height: 100%;
  position: absolute;
  /* z-index: -1; */
}
.main-bottom {
  width: 85%;
  position: absolute;
  bottom: 50px;
  left: 50%;
  transform: translate(-50%);
  display: flex;
  justify-content: space-around;
  align-items: center;
}

.smallImg {
  width: 150px;
  height: 150px;
  margin-top: 15px;
  position: relative;
  right: 0px;
  /* bottom: 20px; */
}

.img_create {
  margin-top: 20px;
  position: relative;
}

.img_create > div:first-child {
  position: absolute;
  right: 0px;
  top: -17px;
}

.img_create > div:first-child img {
  /* position: absolute; */
  z-index: -1;
}

.img_create > div:first-child > div {
  position: absolute;
  top: 0px;
  left: 3px;
  color: #fff;
  font-family: PingFang SC;
  font-size: 12px;
  font-style: normal;
  font-weight: 500;
  z-index: 5;
}

.img_create > div:last-child {
  cursor: pointer;
  border-radius: 6px;
  background: #1f64ff;
  height: 38px;
  line-height: 38px;
  box-shadow: 0px 2px 6px 0px rgba(98, 98, 98, 0.1);
  color: #fff;
  text-align: center;

  font-family: PingFang SC;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  letter-spacing: 0.18px;
}

.noHistory {
  text-align: center;
  padding: 15px;
  box-sizing: border-box;
  font-size: 14px;
  color: #ccc;
  margin: auto;
}

.remind {
  color: #666;

  font-family: PingFang SC;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;

  margin-bottom: 10px;
}

.model-price {
  font-size: 12px;
  margin-top: 10px;
}

.draw-chat {
  background-color: #f1f2f5;
  display: flex;
  height: calc(100%);
  border-left: 1px solid #f1f2f5;
}

.ai_list_btn {
  margin: 10px 0 35px 16px;
  display: flex;
  justify-content: center;
  background-color: #ffffff;
  padding: 4px;
  border-radius: 4px;
}

.draw-chat .main {
  width: calc(100% - 20%);
  height: 100%;
  overflow-y: auto;
  position: relative;
  /* display: flex;
  justify-content: center;
  align-items: center; */
}

.draw-chat .main .top_title {
  text-align: center;
  margin-top: 35px;
}

.workspace_main {
  display: flex;
  justify-content: center;
  height: 100%;
  margin: 0px;
}

.workspace_main .img_msk {
  width: 450px;
  height: 450px;
  background-color: #ffffff;
  border-radius: 4px;
  position: relative;
  overflow: hidden;
  display: flex;
}

.workspace_main .img_msk .btn {
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  background-color: #1f64ff;
  color: #ffffff;
  z-index: 5;
  border: none;
}

.example_title {
  position: absolute;
  top: 0;
  right: 0;
  padding: 5px 10px;
  border-bottom-left-radius: 5px;
  background-color: rgba(0, 0, 0, 0.5);
  color: #ffffff;
  z-index: 5;
}

.workspace_mask {
  position: relative;
  display: flex;
  align-items: center;
  /* flex-wrap: nowrap; */
}

.filter_img {
  width: 100%;
  height: 100%;
  filter: blur(50px);
  position: absolute;
  z-index: 1;
  object-fit: cover;
}

.workspace_main .img_msk .img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  position: absolute;
  z-index: 2;
}

.functional_area {
  display: flex;
  align-items: center;
  justify-content: right;
  /* background-color: #FFFFFF; */
  /* padding: 34px 23px; */
  /* border-radius: 8px; */
  margin-top: 20px;
}

.functional_area .help-setpon-img {
  /* margin-bottom: 10px; */
  cursor: pointer;
  margin-right: 10px;
}

.example_list {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 140px;
}

.example_mask {
  width: 490px;
  display: flex;
  flex-wrap: wrap;
}

.example_mask .item {
  margin: 10px;
  width: 100px;
  height: 100px;
  border-radius: 8px;
  border: 1px solid transparent;
}

.example_mask .item-on {
  border-color: #1f64ff;
}

.example_mask .item .img {
  width: 100%;
  border-radius: 8px;
}

.user_input_area {
  position: absolute;
  bottom: 40px;
  z-index: 10;
  width: 100%;
  box-sizing: border-box;
  display: flex;
  /* flex-direction: column; */
  /* justify-content: center; */
  align-items: center;
}

.title_area {
  width: calc(90% - 25px);
  display: flex;
  justify-content: space-between;
  color: #000;
  font-size: 12px;
  font-weight: 400;
  padding: 15px 20px 20px 20px;
  background-color: #e8eefc;
  position: absolute;
  left: 50%;
  top: -45px;
  z-index: -1;
  transform: translate(-50%);
  border-radius: 8px 8px 0 0;
}

.input_area {
  width: calc(90%);
  display: flex;
  padding: 8px;
  background-color: #ffffff;
  border-radius: 8px;
  margin: auto;
}

.draw-chat .work_area {
  width: 29%;
  height: 100%;
  overflow-y: auto;
  background-color: #ffffff;
  padding: 0 20px;
}

.draw-chat .work_area:nth-child(2) {
  width: 260px;
  height: 100%;
  overflow-y: auto;
  /* background-color: red;s */
  padding: 0 20px;
}

.select_workspace {
  border-bottom: 1px solid #efeff2;
  display: flex;
  color: #666;
  padding: 20px 0;
  padding-bottom: 4px;
  font-size: 14px;
  font-weight: 400;
  position: sticky;
  top: 0;
  margin-bottom: 10px;
  background-color: #ffffff;
}

.select_workspace .item {
  margin-right: 20px;
  cursor: pointer;
  border-bottom: 1px solid white;
}

.select_workspace .item-on {
  color: #1f64ff;
  font-weight: 500;
  cursor: pointer;
  border-bottom: 1px solid #1f64ff;
}

.workSpace_area-title {
  color: #000;
  font-size: 12px;
  font-weight: 500;
  display: flex;
  align-items: center;
  margin: 20px 0 10px 0;
}

.workSpace_area .typesof .msak {
  display: flex;
}

.workSpace_area .typesof .msak .item {
  padding: 8px 16px;
  border: 1px solid #f4f4f7;
  background-color: #f4f4f7;
  cursor: pointer;
  margin: 10px 10px 10px 0;
}

.workSpace_area .typesof .msak .item-on {
  color: #1f64ff;
  border-color: #1f64ff;
  background-color: transparent;
}

.size_mask {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  /* overflow-x: auto; */
  padding-bottom: 10px;
}

.size_mask .item {
  width: 92px;
  height: 92px;
  margin-right: 10px;
  flex-shrink: 0;
  border-radius: 8px;
  background-color: #f4f4f7;
  border: 1px solid #f4f4f7;
  cursor: pointer;
}

.size_mask .item-on {
  background-color: transparent;
  border-color: #1f64ff;
}

.box_mask {
  width: 100%;
  height: 68px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.size_mask .item .box {
  border: 1px solid #7a7a7a;
  width: 40px;
  height: 40px;
}

.size_mask .item .size {
  text-align: center;
  color: #222;
  font-size: 12px;
  font-weight: 400;
}

.style_mask {
  width: 100%;
  overflow-y: auto;
  padding-bottom: 10px;
}

.style_mask::-webkit-scrollbar-thumb {
  background-color: #dedede;
}

.style_mask .item {
  border: 2px solid transparent;
  position: relative;
  
  /* margin-right: 10px; */
  width: calc(100% / 3 - 10px);
  /* height: 80px; */
  border-radius: 8px;
}

.style_mask .item .img {
  border-radius: 8px;
  width: 100%;
  height: 100%;
}

.style_mask .item-on {
  border-color: #1f64ff;
}

.style_mask .item .title {
  position: absolute;
  bottom: 0px;
  color: #fff;
  text-align: center;
  font-size: 12px;
  font-weight: 500;
  border-radius: 4px;
  background: rgba(0, 0, 0, 0.5);
  width: 100%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.history-list {
  height: calc(100% - 104px);
  overflow-y: auto;
}

.history-list .mask {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}

.history-list .item {
  width: calc(100% / 2 - 5px);
  height: calc(100% / 2 - 5px);
  margin-bottom: 5px;
  position: relative;
}

.history-list .item .del {
  display: none;
  font-size: 20px;
  color: #ffffff;
  position: absolute;
  right: 0px;
  top: 0px;
  cursor: pointer;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 2px;
  border-radius: 4px;
}

.history-list .item:hover .del {
  display: inline-block;
}

.history-list .item .img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.history-list .item .img-on {
  border: 1px solid #1f64ff;
}

.bottom_mask {
  position: fixed;
  bottom: 0;
  height: 40px;
  width: calc(100% - 640px);
  background-color: #f1f2f5;
  z-index: 100;
}

.title_prompt {
  color: #9a9a9a;
  font-size: 14px;
  font-weight: 400;
  line-height: 20px;
}

.draw-result-tips {
  display: flex;
  justify-content: center;
  /* position: absolute;
  bottom: 0; */
  /* width: 100%; */
  z-index: 3;
  font-size: 12px;
  padding: 8px 10px;
  color: #ffffff;
  background-color: rgba(0, 0, 0, 0.5);
}

.tips_img {
  width: 16px;
  height: 16px;
  margin-right: 10px;
}
</style>

<style>
.ai_list_btn .chat-ai-btn-list {
  color: #333;
  padding: 8px 12px;
  font-size: 14px;
  font-weight: 500;
  background-color: #fff;
  margin-left: 0;
  border: none;
}

.user_btn input {
  border: none;
}

.draw_image-class_dark .el-dialog {
  border-radius: 4px;
  top: 50%;
  left: 50%;
  transform: translateY(-50%) translateX(-50%);
  /* max-height: 800px;
  min-height: 500px; */
  background-color: transparent;
  box-shadow: 0 0 0 transparent;
  margin: 0 !important;
  display: flex;
  justify-content: center;
  /* width: auto; */
}

.draw_image-class_dark .el-dialog__headerbtn {
  display: none;
}

.draw_image-class_dark .el-dialog__header {
  display: none;
}

.draw_image-class_dark .el-dialog__body {
  padding: 0;
}

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

.input_textarea textarea {
  height: 80px;
}
</style>