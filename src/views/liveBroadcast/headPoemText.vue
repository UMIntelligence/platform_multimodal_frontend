
<template>
  <div :style="backImg" class="poem">
    <div class="content">
      <div class="cont_line">
        <div v-if="srcList.length > 0">
          <el-image
            class="head_img"
            :src="srcList[0]"
            :preview-src-list="srcList"
            :initial-index="0"
            alt=""
          >
            <div slot="error" class="image-slot">
              <div></div>
            </div>
          </el-image>
        </div>
        <div class="line_text">
          <div class="text_cont" style="margin-top: -48px" v-if="!isfinish">
            {{ reply }}
          </div>
          <div class="text_cont" v-else>
            <change-pinyin :content="reply"></change-pinyin>
          </div>
        </div>
        <div v-if="srcList.length > 0">
          <el-image
            class="back_img"
            :src="srcList[0]"
            :preview-src-list="srcList"
            :initial-index="0"
            alt=""
          >
            <div slot="error" class="image-slot">
              <div></div>
            </div>
          </el-image>
        </div>
      </div>
      <div class="footer_cont">
        <div class="btn_cont">
          <div style="margin-right: 20px">
            <el-button
              class="btn_img"
              size="small"
              type="primary"
              @click="dialogVisible = true"
              >自定义提示词</el-button
            >
          </div>

          <div style="margin-right: 20px">
            <el-button
              class="btn_img"
              size="small"
              type="primary"
              @click="ImgVisible = true"
              >自定义背景图</el-button
            >
          </div>

          <div class="chat_cont">
            <el-cascader
              size="small"
              style="height: 32px"
              v-model="chat_value"
              :options="options"
              @change="handleChange"
            >
            </el-cascader>
          </div>
        </div>
        <div class="cont">
          <div class="footer-inp_img">
            <el-input
              resize="none"
              class="chat-text-textarea"
              type="textarea"
              :autosize="{ minRows: 1, maxRows: 6 }"
              placeholder="请输入您的名字"
              v-model="sendValue"
            >
            </el-input>
          </div>
          <div class="textarea-btn">
            <div class="mask">
              <el-button
                class="send_img"
                style="height: 32px; width: 70px"
                type="primary"
                @click="isBtnThreeFive ? sendMsg() : sendMsg2()"
                >发送</el-button
              >
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 注册组件 -->
    <Register ref="Register"></Register>

    <pay ref="Pay"></pay>

    <el-dialog
      title="自定义提示词"
      :visible.sync="dialogVisible"
      width="50%"
      top="45vh"
    >
      <div class="diolog_cont">
        <div class="cont_title">姓名</div>
        <el-input v-model="userName" placeholder="请输入内容"></el-input>
        <div class="cont_title">提示词</div>
        <el-input
          type="textarea"
          :rows="3"
          placeholder="请输入内容"
          v-model="userSlove"
        ></el-input>
        <div class="cont_prot" @click="getPrompt">历史提示词</div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submit">确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog
      title="历史提示词"
      :visible.sync="protVisible"
      width="40%"
      top="50vh"
    >
      <div class="diolog_prot" v-if="promptList.length > 0">
        <div class="prot_text" v-for="(item, index) in promptList" :key="index">
          <span class="prot_num">{{ index + 1 }}</span>
          <span
            class="prot_l"
            :title="item.prompt_content"
            @click="selectPrompt(item.prompt_content)"
            >{{ item.prompt_content }}</span
          >
          <i class="el-icon-close" @click="delPrompt(item.prompt_id)"></i>
        </div>
      </div>
      <div class="diolog_prot" v-else>
        <div class="prot_text">
          <span class="prot_l">暂无历史提示词</span>
        </div>
      </div>
    </el-dialog>

    <el-dialog
      title="自定义背景图"
      :visible.sync="ImgVisible"
      width="40%"
      top="45vh"
    >
      <div class="diolog_cont">
        <el-upload
          class="avatar-uploader"
          ref="upload"
          :action="httpUrls.loginUrl + 'api/user/oss_upload'"
          :show-file-list="false"
          :on-change="handleUploadChangeMiniCode"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
          :data="requestMiniCode"
        >
          <img v-if="imageUrl" :src="imageUrl" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          <div slot="tip" class="el-upload__tip">
            只能上传jpg/png文件，且不超过500kb
          </div>
        </el-upload>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="ImgVisible = false">取 消</el-button>
        <el-button type="primary" @click="changeImg">更 换</el-button>
      </span>
    </el-dialog>
  </div>
</template>
  
  <script>
import httpUrls from "../../api/requestURL";

import Register from "../../components/register";
import changePinyin from "../../components/changePinyin.vue";

import pay from "../../components/pay";
import { arr2str } from "../../utils/download";
import { addPrompt, getPrompt, delPrompt } from "../../api/basisMG";
export default {
  name: "chat",
  data() {
    return {
      httpUrls,

      isfinish: true,
      chatVipList: [], // 4.0数据

      isBtnThreeFive: true, // 防止重新发送
      chat_type: 1004, // ai35: 0; ai40: 1
      chat_model: "umi-pro-4k",
      sendValue: "", // 问题的内容
      sendProt: "", //发送的提示词
      reply:
        "名字：欧阳若英\n欧气映日照东方\n阳狮怒吼振山岗\n若鹰翱翔在云梯\n英勇不屈乐无疆",
      promptList: [],
      chatContent: [
        {
          content: "",
        },
      ],

      chatCont: "文心一言",
      dialogVisible: false,
      userSlove:
        "你现在是诗仙李白，擅长写诗，现在给姓名为“欧阳若云”的好友，写一首七言绝句的藏头诗,共四句，每句7个字，要求积极向上，正向，有趣，好玩，可以适当使用夸张的手法",
      userName: "欧阳若云",
      chat_value: ["1004", "umi-pro-4k"],
      options: [
        {
          value: "4",
          label: "文心一言",
          children: [
            {
              value: "ernie-speed-128k",
              label: "ernie-speed-128k（免费）",
            },
            {
              value: "ernie-4.0-8k-latest",
              label: "ernie-4.0-8k-latest",
            },
            {
              value: "ernie-3.5-128k",
              label: "ernie-3.5-128k",
            },
            
          ],
        },

        {
          value: "10",
          label: "通义千问",
          children: [
            {
              value: "qwen-turbo",
              label: "qwen-turbo（免费）",
            },
            {
              value: "qwen-plus",
              label: "qwen-plus",
            },
            {
              value: "qwen-max-longcontext",
              label: "qwen-max-longcontext",
            }
          ],
        },
        {
          value: "5",
          label: "讯飞星火",
          children: [
            {
              value: "v1.1",
              label: "v1.1（免费）",
            },
            {
              value: "v3.5",
              label: "v3.5",
            },
            {
              value: "v4.0",
              label: "v4.0",
            },
          ],
        },

        {
          value: "8",
          label: "chatGLM",
          children: [
          {
              value: "glm-4-flash",
              label: "glm-4-flash（免费）",
            },
            {
              value: "glm-4-airx",
              label: "glm-4-airx",
            },
            {
              value: "glm-4-air",
              label: "glm-4-air",
            },
            
          ],
        },
        {
          value: "12",
          label: "360智脑",
          children: [
            {
              value: "360gpt-turbo",
              label: "360gpt-turbo（免费）",
            },
            {
              value: "360GPT_S2_V9",
              label: "360GPT_S2_V9",
            },
            {
              value: "360gpt2-pro",
              label: "360gpt2-pro",
            },
            
          ],
        },

        {
          value: "1001",
          label: "腾讯混元",
          children: [
            {
              value: "hunyuan-lite",
              label: "hunyuan-lite（免费）",
            },
            {
              value: "hunyuan-standard",
              label: "hunyuan-standard",
            },
            {
              value: "hunyuan-standard-256K",
              label: "hunyuan-standard-256K",
            },
            {
              value: "hunyuan-pro",
              label: "hunyuan-pro",
            }
          ],
        },
        {
          value: "1003",
          label: "豆包",
          children: [
            {
              value: "Doubao-lite-32k",
              label: "Doubao-lite-32k（免费）",
            },
            {
              value: "Doubao-lite-128k",
              label: "Doubao-lite-128k（免费）",
            }
          ],
        },
        {
          value: "1004",
          label: "无忧秘书",
          children: [
            {
              value: "umi-pro-4k",
              label: "umi-pro-4k（免费）",
            },
            {
              value: "umi-pro-32k",
              label: "umi-pro-32k",
            },
            {
              value: "umi-pro-128k",
              label: "umi-pro-128k",
            }

          ],
        }
      ],

      protVisible: false,
      headImg: "",
      firstName: "",
      srcList: [],

      ImgVisible: false,
      imageUrl: "",
      requestMiniCode: {
        image: null,
        image_name: null,
        oss_dir: "static",
        cate: "Enterprise_customization-mini_code",
      },
      backImg:
        'background-image: url("' +
        httpUrls.ossUrl +
        'xcx/com/message_center/v3.png")',
    };
  },

  // 注册组件
  components: {
    Register,
    pay,
    changePinyin,
  },

  created() {
    this.loginInfo = JSON.parse(localStorage.getItem("userInfo"));
    let img_url = localStorage.getItem("backImg4");
    if (img_url != "" && img_url != null) {
      this.backImg = "background-image: url(" + img_url + ")";
    }
  },

  mounted() {
    //   this.checkName(this.userName)
    this.srcList = [];
    const headImg = httpUrls.ossUrl + "name_dragon/龙宝宝_out/欧阳1.png";
    this.srcList.push(headImg);
  },

  /**
   * 里面的方法只有被调用才会执行
   */
  methods: {
    //发送信息
    sendMsg(bool = "") {
      // console.log('发送信息')
      this.loginInfo = JSON.parse(localStorage.getItem("userInfo"));
      this.isBtnThreeFive = false; //不允许重复发送

      if (this.sendValue == "" || this.sendValue.replace(/\s*/g, "") == "") {
        this.$message({
          type: "error",
          message: "请输入您要发送内容",
        });
        this.isBtnThreeFive = true;
        return false;
      }

      this.checkName(this.sendValue);

      this.vipSend(bool);
    },

    // 4.0信息发送
    async vipSend(bool = "") {
      this.chatContent[this.chatContent.length - 1].content = "";
      this.reply = "";
      this.isfinish = false;

      let val = null;
      let cont = "姓名：" + this.sendValue;
      this.keepReplys(cont, 1);
      let send_text = "";
      if (this.sendProt != "") {
        send_text = this.sendProt;
      } else {
        // send_text = `给姓名为${this.sendValue}的人，写一首七言绝句的藏头诗,共四句，每句7个字，以，要求积极向上，正向，有趣，好玩`;
        send_text = `你现在是诗仙李白，擅长写诗，现在给姓名为“${this.sendValue}”的好友，写一首七言绝句的藏头诗,共四句，每句7个字，要求积极向上，正向，有趣，好玩，可以适当使用夸张的手法'`;
      }

      val = {
        chat_type: this.chat_type,
        model: this.chat_model,
        session_code: localStorage.getItem("session_code") || "",
        chat_group_code: "",
        msg_list: JSON.stringify([
          { role: "user", content: send_text, images: [] },
        ]),
      };

      this.chatVipList.push({
        //新构造一个对话内容
        session_code: "",
        create_time: "",
        chat_group_code: "",
        finish_reason: "",
        role: "",
        content: "",
        help: false, // 点赞
        stepOn: false, // 点踩
        id: this.chatVipList.length,
        timer: false,
      });

      let userInfo = JSON.parse(localStorage.getItem("userInfo"));

      this.sendValue = "";
      this.sendProt = "";
      sessionStorage.setItem("chatImageFile", this.chatImageFile);
      this.chatImageFile = "";
      // console.log(val, '--请求参数')
      let response = null;
      let url =
        this.chat_type < 2
          ? "api/chat/async_chat_session"
          : "api/chat/async_chat_completion";
      this.controllerFourZreo = new AbortController();
      // val.model = this.AIname;  //传递子模型
      response = await fetch(httpUrls.httpUrl + url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "*/*",
          authorization: userInfo.token,
          role: userInfo.role,
          source: "pc",
        },
        body: JSON.stringify(val),
        signal: this.controllerFourZreo.signal,
      });

      this.sendValue = ""; // 清空发送栏内容
      const reader = response.body.getReader();

      this.association = "";

      while (true) {
        const { value, done } = await reader.read();
        if (done) {
          break;
        }
        if (value) {
          let stringStr = arr2str(value);
          let chatArr = stringStr.split("\r\n");

          // 信息清空
          chatArr.forEach((val) => {
            if (val != "") {
              let res = JSON.parse(val);
              // console.log(res.content, 8854)

              this.talkMsgList(res);
              return;
            }
          });
        }
      }
    },

    sendMsg2() {
      if (!this.isShowassociation || this.association != "") {
        this.$message({
          type: "info",
          message: "当前问题还没回答完毕，请稍后再提问！",
        });
      } else {
        this.$message({
          type: "info",
          message: "请选择是否关联",
        });
      }
    },

    // ai返回的数据处理
    talkMsgList(res) {
      this.isTimeFourZero = false;
      if (Number(res.code) == 30014 || Number(res.code) == 40022) {
        if (this.loginInfo.role == "guess") {
          // 登录
          this.$refs.Register.registerVisible = true;
          this.isBtnThreeFive = true;
          return;
        } else {
          this.$confirm(res.msg, "提示", {
            confirmButtonText: "购买算力",
            cancelButtonText: "取消",
            type: "warning",
          })
            .then(() => {
              this.$refs.Pay.PayVisible = true;
            })
            .catch(() => {});
          this.isBtnThreeFive = true;
          return;
        }
      }
      if (res != "" && res.content != null) {
        if (this.chat_type == 10) {
          this.chatVipList[this.chatVipList.length - 1].content = res.content;
        } else {
          this.chatVipList[this.chatVipList.length - 1].content =
            this.chatVipList[this.chatVipList.length - 1].content + res.content;
        }
      }

      if (this.chat_type == 4) {
        if (res.finish_reason) {
          // console.log(this.chatVipList[this.chatVipList.length - 1].content, 5589)
          let content = this.chatVipList[this.chatVipList.length - 1].content;
          let list = [];
          for (let char of content) {
            // console.log("cont==",char);
            // 判断是否为汉字
            var reg = new RegExp("[\\u4E00-\\u9FFF]+", "g");
            if (reg.test(char)) {
              list.push(char);
            }
          }

          list.splice(7, 0, "\n");
          list.splice(15, 0, "\n");
          list.splice(23, 0, "\n");
          list.splice(31, 0, "\n");
          const newArray = list.slice(0, 31);
          // console.log(list,8888)
          let chat_text = newArray.join("");
          //  console.log(chat_text,202020)
          this.keepReplys(chat_text, 2);
          this.isBtnThreeFive = true;
        }
      } else if (this.chat_type == 5) {
        if (res.finish_reason == 2) {
          // console.log(this.chatVipList[this.chatVipList.length - 1].content, 5589)
          let content = this.chatVipList[this.chatVipList.length - 1].content;
          let list = [];
          for (let char of content) {
            // console.log("cont==",char);
            // 判断是否为汉字
            var reg = new RegExp("[\\u4E00-\\u9FFF]+", "g");
            if (reg.test(char)) {
              list.push(char);
            }
          }

          list.splice(7, 0, "\n"); // 格式化数组
          list.splice(15, 0, "\n");
          list.splice(23, 0, "\n");
          list.splice(31, 0, "\n");
          const newArray = list.slice(0, 31);
          // console.log(list,8888)
          let chat_text = newArray.join("");
          //  console.log(chat_text,202020)
          this.keepReplys(chat_text, 2);
          this.isBtnThreeFive = true;
        }
      } else {
        if (res.finish_reason == "stop") {
          // console.log(this.chatVipList[this.chatVipList.length - 1].content, 5589)
          let content = this.chatVipList[this.chatVipList.length - 1].content;
          let list = [];
          for (let char of content) {
            // console.log("cont==",char);
            // 判断是否为汉字
            var reg = new RegExp("[\\u4E00-\\u9FFF]+", "g");
            if (reg.test(char)) {
              list.push(char);
            }
          }

          list.splice(7, 0, "\n");
          list.splice(15, 0, "\n");
          list.splice(23, 0, "\n");
          list.splice(31, 0, "\n");
          const newArray = list.slice(0, 31);
          // console.log(list,8888)
          let chat_text = newArray.join("");
          //  console.log(chat_text,202020)
          this.keepReplys(chat_text, 2);
          this.isBtnThreeFive = true;
        }
      }
    },

    sendMsg2() {
      if (!this.isShowassociation || this.association != "") {
        this.$message({
          type: "info",
          message: "当前问题还没回答完毕，请稍后再提问！",
        });
      } else {
        this.$message({
          type: "info",
          message: "请选择是否关联",
        });
      }
      // this.$message({
      //     type: 'info',
      //     message: '当前问题还没回答完毕，请稍后再提问！'
      // })
    },

    keepReplys(content, val) {
      // console.log(content, 333);
      // this.isTime = false;
      let reply = content;
      let replyArr = reply.split("");
      let replyStr = this.chatContent[this.chatContent.length - 1].content;

      let i = 0;
      let time = setInterval(() => {
        if (i < replyArr.length) {
          if (replyArr[i] == "\n") {
            replyStr += "\n";
          } else {
            replyStr += replyArr[i];
          }
          this.reply = replyStr;
          i++;
          // 定位到聊天最底部
          // this.toBottom();
        } else {
          clearInterval(time);
          this.getReply(val);
        }
      }, 100);
    },

    //判断打字效果是否完结
    getReply(val) {
      if (val == 2) {
        this.isfinish = true;
      } else {
        this.reply = this.reply + "\n";
      }
      this.chatContent[this.chatContent.length - 1].content = this.reply;
    },

    //选择模型
    selectType(e) {
      //  console.log(e, 555)
      this.chat_type = e;
    },

    submit() {
      if (this.userName == "") {
        this.$message({
          type: "error",
          message: "请填写姓名！",
        });
        return;
      }

      if (this.userSlove == "") {
        this.$message({
          type: "error",
          message: "请填写提示词！",
        });
        return;
      }

      this.sendProt = this.userSlove;
      this.sendValue = this.userName;
      this.dialogVisible = false;
      this.saveProt();
    },

    handleChange(value) {
      // console.log(value);
      let chat_val = value;
      if (chat_val.length > 1) {
        this.chat_type = chat_val[0];
        this.chat_model = chat_val[1];
      } else {
        this.chat_type = chat_val[0];
        this.chat_model = "";
      }

      // console.log(this.chat_type, 332)
      // console.log(this.chat_model,3333)
    },

    //保存提示词
    saveProt() {
      let val = {
        user_id: this.loginInfo.user_id,
        prompt_content: this.userSlove,
      };
      addPrompt(val)
        .then((res) => {
          if (res.code == 20000) {
          } else {
            this.$message.error(res.msg);
          }
        })
        .catch((err) => {
          // this.$message.error("获取失败！");
        });
    },

    //获取提示词列表
    getPrompt() {
      let val = {
        user_id: this.loginInfo.user_id,
      };
      getPrompt(val)
        .then((res) => {
          if (res.code == 20000) {
            this.promptList = res.data;
            this.protVisible = true;
          } else {
            this.$message.error(res.msg);
          }
        })
        .catch((err) => {
          this.$message.error("获取失败！");
        });
    },

    //删除提示词
    delPrompt(id) {
      this.$confirm("确定删除该提示词吗?", "提示", {
        confirmButtonText: "删除",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          let val = {
            user_id: this.loginInfo.user_id,
            prompt_id: id,
          };
          delPrompt(val)
            .then((res) => {
              if (res.code == 20000) {
                this.getPrompt();
                this.$message({
                  message: "删除成功",
                  type: "success",
                  duration: "1500",
                });
              } else {
                this.$message.error(res.msg);
              }
            })
            .catch((err) => {
              this.$message.error("删除失败！");
            });
        })
        .catch(() => {});
    },

    selectPrompt(val) {
      this.userSlove = val;
      this.protVisible = false;
    },

    checkName(uname) {
      // console.log(uname,885)
      const surname_one =
        "赵|钱|孙|李|周|吴|郑|王|冯|陈|楮|卫|蒋|沈|韩|杨|朱|秦|尤|许|何|吕|施|张|孔|曹|严|华|金|魏|陶|姜|戚|谢|邹|喻|柏|水|窦|章|云|苏|潘|葛|奚|范|彭|郎|鲁|韦|昌|马|苗|凤|花|方|俞|任|袁|柳|酆|鲍|史|唐|费|廉|岑|薛|雷|贺|倪|汤|滕|殷|罗|毕|郝|邬|安|常|乐|于|时|傅|皮|卞|齐|康|伍|余|元|卜|顾|孟|平|黄|和|穆|萧|尹|" +
        "姚|邵|湛|汪|祁|毛|禹|狄|米|贝|明|臧|计|伏|成|戴|谈|宋|茅|庞|熊|纪|舒|屈|项|祝|董|梁|杜|阮|蓝|闽|席|季|麻|强|贾|路|娄|危|江|童|颜|郭|梅|盛|林|刁|锺|徐|丘|邱|骆|高|夏|蔡|田|樊|胡|凌|霍|虞|万|支|柯|昝|管|卢|莫|经|房|裘|缪|干|解|应|宗|丁|宣|贲|邓|郁|单|杭|洪|包|诸|左|石|崔|吉|钮|龚|程|嵇|邢|滑|裴|陆|荣|翁|荀|羊|於|惠|甄|麹|家|" +
        "封|芮|羿|储|靳|汲|邴|糜|松|井|段|富|巫|乌|焦|巴|弓|牧|隗|山|谷|车|侯|宓|蓬|全|郗|班|仰|秋|仲|伊|宫|宁|仇|栾|暴|甘|斜|厉|戎|祖|武|符|刘|景|詹|束|龙|叶|幸|司|韶|郜|黎|蓟|薄|印|宿|白|怀|蒲|邰|从|鄂|索|咸|籍|赖|卓|蔺|屠|蒙|池|乔|阴|郁|胥|能|苍|双|闻|莘|党|翟|谭|贡|劳|逄|姬|申|扶|堵|冉|宰|郦|雍|郤|璩|桑|桂|濮|牛|寿|通|边|扈|" +
        "燕|冀|郏|浦|尚|农|温|别|庄|晏|柴|瞿|阎|充|慕|连|茹|习|宦|艾|鱼|容|向|古|易|慎|戈|廖|庾|终|暨|居|衡|步|都|耿|满|弘|匡|国|文|寇|广|禄|阙|东|欧|殳|沃|利|蔚|越|夔|隆|师|巩|厍|聂|晁|勾|敖|融|冷|訾|辛|阚|那|简|饶|空|曾|毋|沙|乜|养|鞠|须|丰|巢|关|蒯|相|查|后|荆|红|游|竺|权|逑|盖|益|桓|公|仉|督|晋|楚|阎|法|汝|鄢|涂|钦|岳|帅|缑|" +
        "亢|况|后|有|琴|归|海|墨|哈|谯|笪|年|爱|阳|佟|商|牟|佘|佴|伯|赏";

      const surname_two =
        "万俟|司马|上官|欧阳|夏侯|诸葛|闻人|东方|赫连|皇甫|尉迟|公羊|澹台|公冶|宗政|濮阳|淳于|单于|太叔|申屠|公孙|仲孙|轩辕|令狐|锺离|宇文|长孙|慕容|鲜于|闾丘|司徒|司空|丌官|司寇|子车|微生|颛孙|端木|巫马|公西|漆雕|乐正|壤驷|公良|拓拔|夹谷|宰父|谷梁|段干|百里|东郭|南门|呼延|羊舌|梁丘|左丘|东门|西门|南宫";

      let patt1 = new RegExp(uname.substr(0, 1)); // 判断单姓氏
      let patt2 = new RegExp(uname.substr(0, 2)); // 判断双姓氏

      if (patt1.test(surname_one) == true && patt2.test(surname_two) == false) {
        this.firstName = uname.slice(0, 1);
      }

      if (patt1.test(surname_one) == true && patt2.test(surname_two) == true) {
        this.firstName = uname.slice(0, 2);
      }

      if (patt1.test(surname_one) == false && patt2.test(surname_two) == true) {
        this.firstName = uname.slice(0, 2);
      }

      if (
        patt1.test(surname_one) == false &&
        patt2.test(surname_two) == false
      ) {
        this.firstName = uname.slice(0, 1);
      }

      // this.chatWordArtNumber = Math.floor(Math.random() * 2); //随机数
      this.srcList = [];

      let str = Math.round(Math.random() * 10);
      console.log(str, 225);
      switch (str) {
        case 0:
          //龙宝宝
          this.srcList.push(
            `${httpUrls.ossUrl}name_dragon/龙宝宝_out/${this.firstName}1.png`
          );
          break;
        case 1:
          //可爱毛绒绒
          this.srcList.push(
            `${httpUrls.ossUrl}name_cutefluffy/${this.firstName}.png`
          );
          break;
        case 2:
          //霸气土豪金
          this.srcList.push(
            `${httpUrls.ossUrl}name_gold/${this.firstName}0.png`
          );
          break;
        case 3:
          //凤凰
          this.srcList.push(
            `${httpUrls.ossUrl}name_fenghuang/${this.firstName}0.png`
          );
          break;
        case 4:
          //古建筑
          this.srcList.push(
            `${httpUrls.ossUrl}name_building/${this.firstName}0.png`
          );

          break;
        case 5:
          //金色翅膀
          this.srcList.push(
            `${httpUrls.ossUrl}name_goldenwing/${this.firstName}0.png`
          );
          break;
        case 6:
          //金色美女
          this.srcList.push(
            `${httpUrls.ossUrl}name_goldenbeauty/${this.firstName}0.png`
          );
          break;
        case 7:
          //精致羽毛
          this.srcList.push(
            `${httpUrls.ossUrl}name_yumao/${this.firstName}0.png`
          );
          break;
        case 8:
          //兰花小清新
          this.srcList.push(
            `${httpUrls.ossUrl}name_lanhua/${this.firstName}0.png`
          );

          break;
        case 9:
          //蓝色龙年
          this.srcList.push(
            `${httpUrls.ossUrl}name_bluedragon/${this.firstName}0.png`
          );

          break;
        case 10:
          //毛绒谐音梗
          this.srcList.push(
            `${httpUrls.ossUrl}name_fluffyjoke/${this.firstName}0.png`
          );
          break;
        case 11:
          //瀑布光影字
          this.srcList.push(
            `${httpUrls.ossUrl}name_waterfall/${this.firstName}0.png`
          );
          break;
        case 12:
          //山水
          this.srcList.push(
            `${httpUrls.ossUrl}name_shanshui/${this.firstName}0.png`
          );
          break;
        case 13:
          //水墨徽州
          this.srcList.push(
            `${httpUrls.ossUrl}name_shuimohz/${this.firstName}0.png`
          );
          break;
        case 14:
          this.srcList.push(
            `${httpUrls.ossUrl}name_wuxia/${this.firstName}0.png`
          );
          break;
        case 15:
          //雪韵江南
          this.srcList.push(
            `${httpUrls.ossUrl}name_snowjn/${this.firstName}0.png`
          );
          break;
        case 16:
          //烟雨江南
          this.srcList.push(
            `${httpUrls.ossUrl}name_rainjn/${this.firstName}0.png`
          );
          break;
        case 17:
          //迎客松
          this.srcList.push(
            `${httpUrls.ossUrl}name_yingkesong/${this.firstName}0.png`
          );
          break;
        case 18:
          //孔雀
          this.srcList.push(
            `${httpUrls.ossUrl}name_kongque/${this.firstName}0.png`
          );
          break;
        default:
          break;
      }
      // console.log(this.srcList,333)
    },

    handleUploadChangeMiniCode(file) {
      this.requestMiniCode.image = file.raw;
      this.requestMiniCode.image_name = file.name;
    },

    handleAvatarSuccess(res) {
      console.log(res, 321);
      this.imageUrl = httpUrls.ossUrl + res.data.new_url;
      // this.$refs.upload.submit();
      console.log(this.imageUrl, 3325);
    },
    beforeAvatarUpload(file) {
      // const isJPG = file.type === 'image/jpeg';
      const isLt2M = file.size / 1024 / 1024 < 5;

      // if (!isJPG) {
      //   this.$message.error('上传头像图片只能是 JPG 格式!');
      // }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 5MB!");
      }
      return isLt2M;
    },

    changeImg() {
      localStorage.setItem("backImg4", this.imageUrl);
      this.backImg = "background-image: url(" + this.imageUrl + ")";
      this.ImgVisible = false;
    },
  },
};
</script>
  
  <style scoped>
.footer-inp_img {
  width: calc(100% - 80px);
  position: relative;
}

.content {
  width: 100%;
  height: calc(100vh - 76px);
  display: flex;
  /* margin-left: 242px; */
  flex-direction: column;
  transition: width 0.2s;
  /* padding-bottom: 35px; */
  box-sizing: border-box;
}

.footer_cont {
  /* background: #fff; */
  width: calc(100% - 40px);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px 20px 10px 20px;
  position: relative;
  /* margin-left: 20px; */
}

.cont {
  width: 100%;
  padding: 6px 0;
  background: #fff;
  border-radius: 10px;
  display: flex;
  align-items: center;
  position: relative;
}
</style>
  
  <style scoped>
.chat-text-textarea {
  display: flex;
  align-items: center;
}

.chat-text-textarea textarea {
  background-color: #ffffff;
  border: none;
  min-height: 31px !important;
  /* height: 38px; */
}

.chat-text-textarea textarea::-webkit-scrollbar {
  width: 3px;
}

.chat-text-textarea textarea::-webkit-scrollbar-thumb {
  background-color: #f2f2f2;
}

.chat-text-textarea {
  /* border: 2px solid #1F64FF; */
  border-left: none;
  border-right: 1px solid #ffffff;
  height: var(--a);
  width: calc(100%);
}

.cont .el-input__inner {
  background: #f5f6fa;
  border-radius: 10px;
  height: 58px;
  font-size: 16px;
  padding-left: 30px;
}

.chat_cont .el-input__inner {
  /* background: #F5F6FA; */
  border-radius: 6px !important;
  height: 32px !important;
  font-size: 16px;
  padding-left: 10px !important;
}

.send_img {
  width: 70px;
  height: 38px;
  /* position: absolute; */
  /* right: 10px;
      top: 50%; */
  /* transform: translateY(-50%); */
  padding: 8px 20px;
  border: none;
  background-color: #1f64ff;
}

.cont_line {
  width: 100%;
  height: calc(100vh - 120px);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}

.line_text {
  width: 50%;
  /* background: #fff;
    height: 600px; */
  display: flex;
  align-items: center;
  justify-content: center;
}

.text_cont {
  line-height: 250%;
  font-family: Kaiti SC;
  color: #333;
  font-size: 24px;
  font-weight: 530;
  letter-spacing: 12px;
  white-space: pre-line;
  text-align: center;
}

.btn_cont {
  display: flex;
  align-items: center;
  justify-self: flex-start;
  padding: 10px;
  width: 100%;
}
.btn_img {
  /* height: 38px; */
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #1f64ff;
  border: none;
}

.poem {
  width: 100%;
  display: flex;
  height: calc(100%);
  position: relative;
  /* background-color: #F1F2F5; */
  background-repeat: no-repeat;
  background-position: center right;
  background-size: 100% 100%;
}
.poem .el-dialog {
  margin-top: 40vh !important;
}

.cont_title {
  font-size: 16px;
  color: #333;
  line-height: 40px;
}

.cont_prot {
  font-size: 16px;
  color: #1f64ff;
  line-height: 40px;
  cursor: pointer;
}

.diolog_prot {
  width: 100%;
  max-height: 400px;
  overflow: scroll;
}

.prot_text {
  display: flex;
  align-items: center;
  justify-content: space-around;
  width: 100%;
}
.prot_l {
  font-size: 14px;
  color: #333;
  line-height: 40px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: 85%;
  cursor: pointer;
}

.prot_num {
  font-size: 14px;
  color: #333;
  line-height: 40px;
  /* margin-left: 5px; */
}

.head_img {
  width: 100px;
  height: 100px;
  border-radius: 50%;
}

.back_img {
  width: 250px;
  height: 250px;
}

.other_zw {
  width: 100px;
  height: 100px;
  border-radius: 50%;
}
.chat_cont /deep/ .el-input__inner {
  background: white;
  border-radius: 6px;
  height: 32px;
  font-size: 14px;
  padding-left: 10px;
}
</style>

  <style>
.el-image-viewer__canvas {
  width: 400px;
  margin-left: calc(50% - 120px);
  /* margin: auto; */
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>