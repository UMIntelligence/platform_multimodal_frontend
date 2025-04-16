<template>
  <!-- 对话组件 -->
  <div class="main">
    <!-- 智能体信息!chatList.length -->
    <div
      class="agent-information"
      v-if="!chatList.length"
      :style="uploadHide ? 'padding: 45px 0px;' : ''"
    >
      <template v-if="!uploadHide">
        <img class="agentIcon" :src="agentItem.icon_url" />
        <div class="name">{{ agentItem.bot_name }}</div>
        <div class="desc">
          {{ agentItem.description }}
        </div>
        <!-- 开场白 -->
        <div class="prologue">
          <!-- 头像 -->
          <img :src="agentItem.icon_url" alt="">
          <div>{{agentItem.preamble}}</div>
        </div>
        <!-- 预制问题 -->
        <div class="PrefabricationIssues">
          <div class="PrefabricationIssues-item" @click="sendValue = item" v-for="(item,index) in agentItem.beforehand" :key="index">
            <span>{{ item }}</span>
          </div>
        </div>
      </template>
    </div>
    <div class="cg-chat-content" v-else ref="wrap">
      <div id="chatCont" style="overflow: auto; height: 100%">
        <div id="chatContainer" style="height: auto">
          <!-- 文字 -->
          <div v-for="(item, index) in chatList" :key="index">
            <div>
              <!-- 左侧模板 -->
              <div class="cg-chat-left" v-if="item.role == 'assistant'">
                <div style="display: flex; width: 100%">
                  <img
                    class="cg-user-pic cg-right"
                    :src="agentItem.icon_url"
                    alt=""
                  />
                  <div class="as-cont-left">
                    <div class="as-cont-left-time"></div>
                    <!-- 文字模式 -->
                    <div class="as_text_left">
                      <div class="cg-chatbox cg-chatbox-left">
                        <div
                          v-if="item.wordBool"
                          class="reply markdown-body"
                          :style="
                            !isfinishChat && index == chatList.length - 1
                              ? 'white-space: pre-wrap;'
                              : ''
                          "
                          v-html="item.content"
                        ></div>
                        <div
                          v-if="item.textBool"
                          class="reply markdown-body"
                          :style="
                            !isfinishChat && index == chatList.length - 1
                              ? 'white-space: pre-wrap;'
                              : ''
                          "
                        >{{ item.content }}</div>
                        <div class="comput" style="margin-top: 10px">
                          <div style="display: flex; flex-wrap: nowrap">
                            <span
                              class="put_text"
                              v-if="
                                !isfinishChat && index == chatList.length - 1
                              "
                              >耗时:{{ timerChat }}秒</span
                            >
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="help-setpon">
                      <!-- 编辑 -->
                      <img
                        class="help-setpon-img"
                        src="https://umi-intelligence.oss-cn-shenzhen.aliyuncs.com/xcx/com/message_center/Group_427321391@2x (1).png"
                        alt=""
                      />
                      <!-- 文本 -->
                      <img
                        class="help-setpon-img"
                        src="https://umi-intelligence.oss-cn-shenzhen.aliyuncs.com/xcx/com/message_center/Group_427320306@2x.png"
                        alt=""
                        @click="handleTextTrue(item,index)"
                      />
                      <!-- mackDown -->
                      <img
                        class="help-setpon-img"
                        src="https://umi-intelligence.oss-cn-shenzhen.aliyuncs.com/xcx/com/message_center/Group_427321392@2x.png"
                        alt=""
                        @click="handleWordTrue(item,index)"
                      />
                      <!-- 删除 -->
                      <img
                        class="help-setpon-img"
                        src="https://umi-intelligence.oss-cn-shenzhen.aliyuncs.com/xcx/com/message_center/vuesax_linear_trash@2x (5).png"
                        alt=""
                        @click="handleDel(index)"
                      />
                      <div class="line"></div>
                      <!-- 点赞默认 -->
                      <img
                        v-show="false"
                        class="help-setpon-img"
                        src="https://umi-intelligence.oss-cn-shenzhen.aliyuncs.com/xcx/com/message_center/Group_427321554@2x.png"
                        alt=""
                      />
                      <!-- 点赞选中 -->
                      <img
                        v-show="false"
                        class="help-setpon-img"
                        src="https://umi-intelligence.oss-cn-shenzhen.aliyuncs.com/xcx/com/message_center/Group_427321585@2x.png"
                        alt=""
                      />
                      <!-- 不点赞默认 -->
                      <img
                        v-show="false"
                        class="help-setpon-img"
                        src="https://umi-intelligence.oss-cn-shenzhen.aliyuncs.com/xcx/com/message_center/Group_427321360@2x.png"
                        alt=""
                      />
                      <!-- 不点赞选中 -->
                      <img
                        v-show="false"
                        class="help-setpon-img"
                        src="https://umi-intelligence.oss-cn-shenzhen.aliyuncs.com/xcx/com/message_center/Group_427321586@2x.png"
                        alt=""
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <!-- 右侧模板 -->
            <div
              class="cg-chat-right cg-chat-right-on"
              v-if="item.role == 'user'"
              style="justify-content: flex-start"
            >
              <div class="as-cont-right">
                <img
                  class="cg-user-pic cg-left"
                  :src="httpUrls.ossUrl + loginInfo.avatar_url"
                  alt=""
                />
                <div class="as_text_right">
                  <div class="cg-chatbox cg-chatbox-right">
                    <span class="reply" v-html="item.content"></span>
                  </div>
                  <div class="help-setpon">
                    <!-- user -->

                    <!-- 编辑 -->
                    <img
                      class="help-setpon-img"
                      src="https://umi-intelligence.oss-cn-shenzhen.aliyuncs.com/xcx/com/message_center/Group_427321391@2x (1).png"
                      alt=""
                    />
                    <!-- 复制 -->
                    <img
                      class="help-setpon-img"
                      src="https://umi-intelligence.oss-cn-shenzhen.aliyuncs.com/xcx/com/message_center/Group_427320305@2x (1).png"
                      alt=""
                      @click="copyText(item.content)"
                    />
                    <!-- 刷新 -->
                    <img
                      class="help-setpon-img"
                      src="https://umi-intelligence.oss-cn-shenzhen.aliyuncs.com/xcx/com/message_center/Group_427320405@2x (2).png"
                      alt=""
                      @click="handleAskAgain(index)"
                    />
                    <!-- 删除 -->
                    <img
                      class="help-setpon-img"
                      src="https://umi-intelligence.oss-cn-shenzhen.aliyuncs.com/xcx/com/message_center/vuesax_linear_trash@2x (5).png"
                      alt=""
                      @click="handleDel(index)"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- 预设问题 -->
          <div class="PrefabricationIssues" v-if="isfinishChat">
          <div class="PrefabricationIssues-item" @click="sendValue = item" v-for="(item,index) in agentItem.beforehand" :key="index">
            <span>{{ item }}</span>
          </div>
        </div>
        </div>

        <!-- 获取中 -->
        <div>
          <div
            class="cg-chat-left"
            v-if="isTimeChat"
            style="margin-bottom: 20px"
          >
            <img
              class="cg-user-pic cg-right"
              :src="agentItem.icon_url"
              alt=""
            />
            <div class="as-cont-left">
              <div class="as-cont-left-time"></div>
              <div class="as_text_left">
                <div class="cg-chatbox cg-chatbox-left">
                  <div class="comput" style="justify-content: flex-start">
                    <span class="put_text"
                      ><img
                        class="await_img"
                        src="https://umi-intelligence.oss-cn-shenzhen.aliyuncs.com/xcx/com/message_center/await.gif"
                        alt=""
                      />思考中，</span
                    >
                    <span class="put_text">耗时:{{ timerChat }}秒</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 底部 -->
    <div class="bottom">
      <!-- 工具栏 -->
      <div class="input-tool">
        <img
          v-if="!expandHeight"
          src="https://umi-intelligence.oss-cn-shenzhen.aliyuncs.com/xcx/com/message_center/Group_427321483@2x.png"
          alt=""
          @click="expandHeight = !expandHeight"
        />
        <img
          v-else
          src="https://umi-intelligence.oss-cn-shenzhen.aliyuncs.com/xcx/com/message_center/Group_427321483@2x (1).png"
          alt=""
          @click="expandHeight = !expandHeight"
        />
      </div>
      <div class="input-send">
        <el-input
          v-model="sendValue"
          :rows="expandHeight ? 6 : 1"
          resize="none"
          type="textarea"
          class="chat-text-textarea"
          placeholder="在此输入您想了解的内容，Shift+Enter换行，Enter发送"
          @keydown.enter.native="enterEvent($event)"
        >
        </el-input>
        <img
          src="https://umi-intelligence.oss-cn-shenzhen.aliyuncs.com/xcx/com/message_center/Group_427321273@2x.png"
          class="sendImg"
          alt=""
          @click="vipSend()"
        />
      </div>
    </div>
  </div>
</template>

<script>
// import bus from "@/utils/mitt.js";
import { saveAs } from "file-saver"; //JSON插件
import html2canvas from "html2canvas";
import "./chat.css";
import { error } from "shelljs";
import { marked } from "marked";
import { exportWord } from '@/utils/exportWord'
import { getAgent } from "@/api/enterprise";
import httpUrls from "../../api/requestURL";
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      agentItem: null, //智能体数据
      uploadHide: false,
      chatImageFile: "",
      sendValue: "",
      chat_value: ["1004", "umi-pro-4k"],
      expandHeight: false,
      chatList: [],
      isfinishChat: false,
      isBtnChat: false,
      isTimeChat: false,
      isClickChat: false,
      timerChat: 0,
      t_timeChat: null,
      a:[],
      httpUrls,
      loginInfo:null
    };
  },
  computed: {
    ...mapGetters(["userInfoData"]),
  },
  mounted() {
    this.loginInfo = JSON.parse(localStorage.getItem("userInfo"));
    this.$root.Bus.$on("ExportJSON", (e) => {
      if(!this.chatList.length){
        this.$message.error('导出文件失败，暂无聊天内容');
        return
      }
      console.log('导出JSOn')
      const blob = new Blob(
        [JSON.stringify(this.chatList)],
        { type: "text/plain;charset=utf-8" }
      );
      saveAs(blob, `index.json`); // 后面的是json文件的默认名称
    });
    //导出Word
    this.$root.Bus.$on("ExportWord", (e) => {
      if(!this.chatList.length){
        this.$message.error('导出文件失败，暂无聊天内容');
        return
      }
      let contentHtml = document.getElementById('chatContainer').innerHTML;//获取这个div里面的数据
      exportWord(contentHtml,'name')
    });
    // 导出图片
    this.$root.Bus.$on("ExportImage", (e) => {
      if(!this.chatList.length){
        this.$message.error('导出文件失败，暂无聊天内容');
        return
      }
      html2canvas(document.getElementById("chatContainer"), {
        width: document.getElementById("chatContainer").offsetWidth,
        scale: 2,
        useCORS: true,
      }).then(function (canvas) {
        let oImg = canvas.toDataURL("image/png");
        var oA = document.createElement("a");
        oA.download = "分享内容"; // 设置下载的文件名，默认是'下载'
        oA.href = oImg;
        document.body.appendChild(oA);
        oA.click();
        oA.remove(); // 下载之后把创建的元素删除
      });
    });
    //模型选择
    this.$root.Bus.$on("changeChatValue", (e) => {
      console.log(e, "changeChatValue");
      this.chat_value = e;
    });
    //删除对话列表
    this.$root.Bus.$on("removeChatList", (e) => {
      this.$confirm('是否删除该对话记录?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.chatList = []
        }).catch(() => {        
        });
    });
    this.getPrologue(this.$route.query.id)
  },
  methods: {
    //获取开场白
    getPrologue(id){
      getAgent({bot_id:id}).then(res => {
        console.log(res,'开场白数据')
        this.agentItem = res.data[0];   //智能体数据
      })
    },
    enterEvent(event){
      if (!event.shiftKey) {
        // 如果没有按下组合键ctrl，则会阻止默认事件
        event.preventDefault();
        this.vipSend()
      }
    },
    // 复制
    copyText(val) {
      var input = document.createElement("textarea"); // 创建input对象
      input.value = val; // 设置复制内容
      document.body.appendChild(input); // 添加临时实例
      input.select(); // 选择实例内容
      document.execCommand("Copy"); // 执行复制
      document.body.removeChild(input); // 删除临时实例 
      this.$message.success("复制成功！");
    },
    //删除
    handleDel(index){
      this.$confirm('是否删除该对话记录?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.chatList.splice(index,1)
        }).catch(() => {        
        });
    },
    //word
    handleWordTrue(item,index){
      let obj = {...item};
      obj.wordBool = true;
      obj.textBool = false;
      this.$set(this.chatList,index,obj)
    },
    //文本
    handleTextTrue(item,index){
      let obj = {...item};
      obj.wordBool = false;
      obj.textBool = true;
      this.$set(this.chatList,index,obj)
    },
    async vipSend() {
      if (!this.sendValue) {
        this.$message.error("问题不能为空！");
        return;
      }
      if (this.isBtnChat) {
        this.$message.error("当前的问题还未回答完毕，请稍后...");
        return;
      }
      this.isfinishChat = false; // 完成打字效果
      this.isBtnChat = true; // 是否在回答中
      //思考时间
      this.timerChat = 0;
      this.t_timeChat = setInterval(() => {
        this.timerChat += 1;
      }, 1000);

      //月份是从0月开始获取的，所以要+1;
      let month = new Date().getMonth() + 1;
      //日
      let day = new Date().getDate();
      //时
      let hour = new Date().getHours();
      //分
      let minute = new Date().getMinutes();
      //秒
      let second = new Date().getSeconds();
      if (month < 10) {
        month = "0" + month;
      }
      if (day < 10) {
        day = "0" + day;
      }
      if (hour < 10) {
        hour = "0" + hour;
      }
      if (minute < 10) {
        minute = "0" + minute;
      }
      if (second < 10) {
        second = "0" + second;
      }

      let date = month + "/" + day + " " + hour + "-" + minute + "-" + second;

      let sendVal = {
        // 询问者问题展示
        create_time: date,
        finish_reason: "length",
        session_code: "",
        chat_group_code: "",
        role: "user",
        images: [],
        content: this.sendValue, // 预留，对话内容的转换
        markedContent: this.sendValue,
        checked: false,
        help: false, // 点赞
        stepOn: false, // 点踩
        timer: false,
        type: "text",
      };
      this.chatList.push({ ...sendVal, id: this.chatList.length }); // id：用于关联上下文时的排序，防止顺序错乱导致接口返回的信息错误
      this.isTimeChat = true;
      let val = null;
      // val = {
      //   chat_type: this.chat_value[0],
      //   model: this.chat_value[1],
      //   session_code: "",
      //   chat_group_code: "",
      //   msg_list: JSON.stringify([
      //     {
      //       role: "user",
      //       content: this.sendValue,
      //       covert_content: "",
      //       images: [],
      //     },
      //   ]),
      // };\
      let userInfo = JSON.parse(localStorage.getItem("userInfo"));
      val = {
        user_id: userInfo.user_id,
        bot_id: this.agentItem.bot_id,
        content: this.sendValue,
      };
      this.chatList.push({
        //新构造一个对话内容
        session_code: "",
        create_time: date,
        chat_group_code: "",
        finish_reason: "",
        role: "",
        content: "",
        help: false, // 点赞
        stepOn: false, // 点踩
        id: this.chatList.length,
        timer: false,
        wordBool:true,
        textBool:false
      });

      this.isClickChat = false;
      this.sendValue = "";
      let response = null;
      let controllerChat = new AbortController();
      // return
      response = await fetch("https://qy.umi6.com:8002/coze/chat_stream", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "*/*",
          authorization: userInfo.token,
          role: "user",
          source: "pc",
        },
        body: JSON.stringify(val),
        signal: controllerChat.signal,
      });
      const reader = response.body.getReader();

      while (true) {
        const { value, done } = await reader.read();
        if (done) {
          break;
        }
        if (value) {
          let stringStr = this.arr2str(value).trim();
          console.log(stringStr,'stringStr')
          let data = stringStr;
          if (data.startsWith("{") && data.endsWith("}")) {
            // 去除字符串两端的 '{' 和 '}'
            data = data.slice(1, -1);
            // 将字符串按照 ',' 分割成数组
            let keyValuePairs = data.split(",");

            // 创建一个空对象来存储解析后的数据
            let obj = {};

            // 遍历数组中的每个键值对
            for (let pair of keyValuePairs) {
              // 将键值对按照 ':' 分割成键和值
              let [key, value] = pair.split(":");

              // 去除键和值两端的空格
              key = key.trim();
              value = value.trim();

              // 如果值是字符串，并且以 '"' 开头和以 '"' 结尾，则去除两端的 '"'
              if (value.startsWith('"') && value.endsWith('"')) {
                value = value.slice(1, -1);
              }

              // 将键和值添加到对象中
              obj[key] = value;
            }
            console.log(obj,'响应数据')
            this.talkMsgList(obj);
          }
        }
      }
    },
    //重新提问
    handleAskAgain(index){
      if (this.isBtnChat) {
        this.$message.error("当前的问题还未回答完毕，请稍后...");
        return;
      }
      let oldValue = this.chatList[index]['content']
      // 截取列表内容
      this.chatList.splice(index,1);
      this.chatList.splice(index+1,1);
      this.sendValue = oldValue;
      this.vipSend()
    },
    talkMsgList(res) {
      if (!this.isfinishChat) {
        this.isTimeChat = false;
        const renderer = new marked.Renderer();
        // 重写代码块渲染方法，使用highlight.js进行代码高亮
        renderer.code = (code, language) => {
          const validLanguage = hljs.getLanguage(language) ? language : "plaintext";
          const highlightedCode = hljs.highlight(validLanguage, code).value;
          return `<pre><code class="hljs ${validLanguage}">${highlightedCode}</code></pre>`;
        };
        if (res != "" && res['"content"'] && res['"type"'] == "answer") {
          let content = res['"content"']
          this.$set(
            this.chatList[this.chatList.length - 1],
            "content",
            marked(this.chatList[this.chatList.length - 1]["content"] +
              content, {
                renderer,
              })
          );
          this.$set(
            this.chatList[this.chatList.length - 1],
            "role",
            "assistant"
          );
        }else if(res['"type"'] != "answer" && this.hasChineseStr(res['"content"'])){
          this.a.push(res['"content"'])
        }
        if (res['"status"'] == 'stop') {
          if(this.a.length){
            this.$set(this.agentItem,'beforehand',this.a)
          }
          this.isfinishChat = true;
          this.isBtnChat = false;
          clearInterval(this.t_timeChat);
          this.t_timeChat = null;
          // setTimeout(() => {
          //   this.$nextTick(() => {
          //     let str = JSON.parse(JSON.stringify(this.chatList[this.chatList.length - 1]['content']));
          //     let newStr = str.replace(/\r\n/g, '<br/>');
          //     console.log(newStr,'截取后字符串')

          //     this.$set(
          //       this.chatList[this.chatList.length - 1],
          //       "content",
          //       newStr,
          //       );
          //   })
          // },200)
        }
      }
    },
    hasChineseStr(str) {
      var reg = /[\u4e00-\u9fff]+/;
      return reg.test(str);
    },
    arr2str(arr) {
      var utf8 = Array.from(arr)
        .map(function (item) {
          return String.fromCharCode(item);
        })
        .join("");

      return decodeURIComponent(escape(utf8));
    },
  },
};
</script>
<style lang="scss" scoped>
/deep/ .selectKnowledge .el-dialog__header,
/deep/ .selectKnowledge .el-dialog__body {
  padding: 0px;
}
.uploadImg {
  width: 80%;
  height: 451px;
  border-radius: 10px;
  background: #fff;
  margin-top: 30px;
  box-shadow: 0px 0px 0px 0px rgba(0, 0, 0, 0.1),
    0px 10px 33px 0px rgba(0, 0, 0, 0.1);
  position: relative;
  left: 50%;
  transform: translate(-50%);
  /* padding-top: 70px; */
  box-sizing: border-box;
  /* display: flex;justify-content: center;flex-direction: column; */
}
.uploadBack {
  position: absolute;
  top: 20px;
  right: 20px;
  display: flex;
  align-items: center;
  z-index: 99999;
  cursor: pointer;
}
.upload-demo /deep/ .el-upload {
  width: 100%;
  height: 100%;
}
.uploadImg-text {
  color: #898989;
  text-align: center;
  font-family: PingFang SC;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 24px; /* 171.429% */
  /* margin-top: 5px; */
  margin-bottom: 15px;
}
.upload-demo /deep/ .el-upload-dragger {
  width: 100%;
  height: 100%;
  padding-top: 50px;
  box-sizing: border-box;
}
.uploadImg-title {
  color: #000;
  text-align: center;
  font-family: PingFang SC;
  font-size: 18px;
  font-style: normal;
  font-weight: 500;
  line-height: 24px; /* 133.333% */
}
.upload-content {
  display: flex;
  justify-content: center;
  flex-direction: column;
}
#chatContainer{
  .PrefabricationIssues{
      max-width: 500px;
      margin-left: 47px;
      margin-top: 20px;
      display: flex;
      flex-direction: column !important;
      gap: 10px;
      .PrefabricationIssues-item{
        height: 35px;
        text-align: start;
        span{
          padding: 8px 12px;
        box-sizing: border-box;
        cursor: pointer;
        color: #000;
        background: #fff;
        font-size: 14px;
        font-weight: 400;
        border-radius: 6px;
          height: 100%;
          -webkit-line-clamp: 1;
          // display: -webkit-box;
          // -webkit-box-orient: vertical;
          // overflow: hidden;
          // text-overflow: ellipsis;
        }
      }
      .PrefabricationIssues-item span:hover{
        color: #fff;
        background: #1f64ff;
      }
    }
}
.main {
  width: 100%;
  height: 100%;
  overflow: auto;
  background: url("https://umi-intelligence.oss-cn-shenzhen.aliyuncs.com/xcx/com/message_center/背景@2x (as5dq822).png")
    no-repeat;
  background-size: 100% 100%;
  padding-bottom: 30px;
  box-sizing: border-box;
  position: relative;
  .agent-information {
    width: 992px;
    text-align: center;
    position: absolute;
    left: 50%;
    top: 40%;
    transform: translate(-50%,-50%);
    .agentIcon {
      width: 120px;
      height: 120px;
      margin-bottom: 16px;
      border-radius: 20px;
    }
    .name {
      font-weight: 600;
      font-size: 28px;
      color: #000000;
      line-height: 42px;
      margin-bottom: 4px;
    }
    .desc {
      max-width: 500px;
      margin: auto;
      font-weight: 400;
      font-size: 14px;
      color: #666666;
      line-height: 21px;
    }
    .prologue{
      max-width: 500px;
      display: flex;
      gap: 15px;
      margin: auto;
      margin-top: 20px;

      img{
        width: 40px;
        height: 40px;
        padding: 8px;
        box-sizing: border-box;
        background: #fff;
        border-radius: 50%;
      }
      div{
        display: inline-block;
        padding: 20px;
        box-sizing: border-box;
        border-radius: 8px;
        font-size: 16px;
        line-height: 20px;
        background: #fff;
        text-align: start;
      }
    }
    .PrefabricationIssues{
      max-width: 500px;
      margin: auto;
      margin-top: 20px;
      display: flex;
      flex-direction: column;
      
      gap:10px;
      .PrefabricationIssues-item{
        height: 35px;
        text-align: start;
        span{
          padding: 8px 12px;
        box-sizing: border-box;
        cursor: pointer;
        color: #000;
        background: #fff;
        font-size: 14px;
        font-weight: 400;
        border-radius: 6px;
          height: 100%;
          -webkit-line-clamp: 1;
          // display: -webkit-box;
          // -webkit-box-orient: vertical;
          // overflow: hidden;
          // text-overflow: ellipsis;
        }
      }
      .PrefabricationIssues-item span:hover{
        color: #fff;
        background: #1f64ff;
      }
    }
    .configuration {
      margin-top: 50px;
    }
    .configuration-row {
      width: 100%;
      display: flex;
      flex-wrap: wrap;
      gap: 10px;
      margin-bottom: 16px;
      .configuration-item {
        padding: 9px 12px;
        box-sizing: border-box;
        background: #ffffff;
        border-radius: 10px 10px 10px 10px;
        border: 1px solid #f2f2f2;
        font-weight: 500;
        font-size: 14px;
        color: #000000;
        line-height: 21px;
        cursor: pointer;
      }
    }
  }
  .bottom {
    width: 100%;
    max-width: 992px;
    margin: auto;
    position: absolute;
    bottom: 30px;
    left: 50%;
    transform: translateX(-50%);
    .input-tool {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: flex-end;
      margin-bottom: 16px;
      .tool-left {
        width: 90px;
        height: 32px;
        line-height: 32px;
        text-align: center;
        box-sizing: border-box;
        background: #003fff;
        border-radius: 10px 10px 10px 10px;
        font-weight: bold;
        font-size: 14px;
        color: #ffffff;
        cursor: pointer;
      }
      img {
        width: 24px;
        height: 24px;
        cursor: pointer;
      }
    }
    .input-send {
      width: 100%;
      border-radius: 16px 16px 16px 16px !important;
      border: 1px solid #f2f2f2 !important;
      position: relative;
      .chat-text-textarea {
        min-height: 54px;
        background: #ffffff;
        border-radius: 16px 16px 16px 16px !important;
        /deep/ .el-textarea__inner {
          min-height: 54px !important;
          line-height: 40px !important;
          border-radius: 16px 16px 16px 16px !important;
          border: 0px !important;
          padding-right: 44px !important;
        }
      }
      .sendImg {
        width: 24px;
        height: 24px;
        cursor: pointer;
        position: absolute;
        right: 11px;
        top: 15px;
        z-index: 200;
      }
    }
  }
}
</style>