<template>
  <div class="main">
    <!-- 左侧工具栏/配置栏 -->
    <div class="toolBar">
      <el-tabs v-model="toolActive" style="margin-bottom: 24px" @tab-click="uploadPictureUrl = ''">
        <el-tab-pane label="文生视频" name="first"></el-tab-pane>
        <el-tab-pane label="图生视频" name="second"></el-tab-pane>
        <el-tab-pane label="角色生视频" name="three"></el-tab-pane>
      </el-tabs>
      <!-- 视频比例 -->
      <div class="toolBar-box" v-if="toolActive == 'first'">
        <div class="box-top">
          <div class="title">视频比例</div>
          <div></div>
        </div>
        <div class="box-size">
          <div
            class="item on"
          >
            <div class="box">
              <div
                class="box-item"
                style="width: 46px;height: 26px;"
              ></div>
            </div>
            <div class="text">16:9</div>
          </div>
        </div>
      </div>
      <!-- 视频分格 -->
      <div class="toolBar-box" v-if="toolActive == 'first'">
        <div class="box-top">
          <div class="title">
            <div>音乐风格</div>
          </div>
          <div></div>
        </div>
        <div class="style">
          <div
            class="item"
            @click="styleValue = item.value"
            :style="
              styleValue == item.value
                ? 'border: 2px solid #003FFF;'
                : 'border: 2px solid #fff;'
            "
            v-for="item in styleList"
            :key="item.value"
          >
            <img :src="item.pic_url" alt="" />
            <img
              v-if="styleValue == item.value"
              class="onImg"
              src="https://umi-intelligence.oss-cn-shenzhen.aliyuncs.com/xcx/com/message_center/Group_427320710@2x.png"
              alt=""
            />
            <div class="text">{{ item.name }}</div>
          </div>
        </div>
      </div>
      <!-- 上传图片 -->
      <div class="toolBar-box" v-if="toolActive == 'second'">
        <div class="box-top">
          <div class="title">上传图片</div>
          <div></div>
        </div>
        <div class="box-upload">
          <el-upload
            style="width: 100%; height: 100%; position: relative"
            class="upload-demo"
            :show-file-list="false"
            ref="blueprintReading"
            :data="blueprintReadingFile"
            :before-upload="beforeUpload"
            drag
            :action="httpUrls.loginUrl + 'api/user/oss_upload'"
            :on-change="handleChangeFile"
            :on-success="handleSuccessFile"
            :headers="headerData"
          >
            <!-- <i class="el-icon-upload"></i> -->
            <div class="upload-box" v-if="!uploadPictureUrl">
                <img
                  style="height: 64px"
                  :src="
                    httpUrls.ossUrl +
                    'xcx/com/message_center/Group_427319386@2x (3).png'
                  "
                  alt=""
                />
                <div class="el-upload__text">
                  将图片拖至此处 或 <em>点击上传</em>
                </div>
                <div class="el-upload__tips">
                  支持png/jpg/jpeg，文件大小不超过10M
                </div>
            </div>
            <div class="image-box" v-else>
              <img :src="httpUrls.ossUrl + uploadPictureUrl" alt="">
              <div class="text">{{ uploadPictureName }}</div>
              <i class="el-icon-delete" @click.stop="uploadPictureUrl = ''"></i>
            </div>
          </el-upload>
        </div>
      </div>
      <!-- 角色 -->
      <div class="toolBar-box" v-if="toolActive == 'three'">
        <div class="box-top">
          <div class="title">选择角色</div>
          <!-- 中英文转换 -->
          <div
            class="convert"
            style="border: 0px solid #ccc"
            @click="roleVisible = true"
          >
            <img
              :src="
                httpUrls.ossUrl +
                '/xcx/com/message_center/vuesax_linear_add@2x(1).png'
              "
              alt=""
            />
            <div>添加</div>
          </div>
        </div>
        <el-select v-model="role_id" placeholder="请选择角色">
          <el-option
            v-for="item in roleList"
            :key="item.asset_id"
            :label="item.title"
            :value="item.asset_id"
          >
          </el-option>
        </el-select>
      </div>
      <!-- 提示词 -->
      <div class="toolBar-box">
        <div class="box-top">
          <div class="title">
            <div>提示词</div>
            <el-tooltip
              effect="dark"
              content="描述你的视频画面内容"
              placement="right-end"
            >
              <img
                :src="
                  httpUrls.ossUrl +
                  'xcx/com/message_center/Group_427322083@2x.png'
                "
                alt=""
              />
            </el-tooltip>
          </div>
          <!-- 中英文转换 -->
          <div class="convert" @click="handlerTextTranslate">
            <img
              :src="
                httpUrls.ossUrl +
                'xcx/com/message_center/Group_427321483@2x (6).png'
              "
              alt=""
            />
            <div>中转英</div>
          </div>
        </div>
        <el-input
          type="textarea"
          :rows="6"
          placeholder="请输入内容"
          v-model="sendValue"
          v-loading="translateLoading"
        >
        </el-input>
      </div>
      <div class="line"></div>
      <div class="toolBar-box">
        <div class="box-top">
          <div class="title">高级设置</div>
          <div class="openBtn" @click="openBool = !openBool">
            <img
              :style="
                openBool
                  ? 'transform: rotateZ(180deg);'
                  : 'transform: rotateZ(0deg);'
              "
              :src="
                httpUrls.ossUrl +
                'xcx/com/message_center/chevron-down@2x (2).png'
              "
              alt=""
            />
            <div>{{ openBool ? "展开" : "收起" }}</div>
          </div>
        </div>
      </div>
      <div class="transitionBox" :style="{ height: openBool ? 'auto' : '0px' }">
        <div class="toolBar-box">
          <div class="box-top">
            <div class="title">
              <div>反向提示词</div>
              <el-tooltip
                effect="dark"
                content="描述你不想画面中出现的内容"
                placement="right-end"
              >
                <img
                  :src="
                    httpUrls.ossUrl +
                    'xcx/com/message_center/Group_427322083@2x.png'
                  "
                  alt=""
                />
              </el-tooltip>
            </div>
            <!-- 中英文转换 -->
            <div class="convert">
              <img
                :src="
                  httpUrls.ossUrl +
                  'xcx/com/message_center/Group_427321483@2x (6).png'
                "
                alt=""
              />
              <div>中转英</div>
            </div>
          </div>
          <el-input
            type="textarea"
            :rows="6"
            placeholder="请输入内容"
            v-model="negativePrompt"
          >
          </el-input>
        </div>
        <div class="toolBar-box">
          <div class="box-top">
            <div class="title">
              <div>种子</div>
              <el-tooltip
                effect="dark"
                content="复用种子，获取相近的结果"
                placement="right-end"
              >
                <img
                  :src="
                    httpUrls.ossUrl +
                    'xcx/com/message_center/Group_427322083@2x.png'
                  "
                  alt=""
                />
              </el-tooltip>
            </div>
            <el-switch v-model="seedBool"> </el-switch>
          </div>
          <el-input v-model="seedValue" placeholder="请输入种子" />
        </div>
      </div>
      <div class="submit-btn" @click="isBtn ? sendMsg(3) : sendMsg2(3)">
        <div>
          <img
            src="https://umi-intelligence.oss-cn-shenzhen.aliyuncs.com/xcx/com/message_center/Group_427322491@2x.png"
            alt=""
          />
          <div>立即生成</div>
        </div>
        <div class="token">3600算力/次</div>
      </div>
    </div>
    <!-- 主体内容部分 -->
    <div class="container">
      <div class="video-box">
        <!-- 工具栏 -->
        <div class="instrument">
          <div class="item" @click="resetNewChat()">
            <img
              src="https://umi-intelligence.oss-cn-shenzhen.aliyuncs.com/xcx/com/message_center/Group_427320453@2x (3).png"
              alt=""
            />
            <div class="text">新创作</div>
          </div>
          <div class="item" @click="handlerSame()">
            <img
              src="https://umi-intelligence.oss-cn-shenzhen.aliyuncs.com/xcx/com/message_center/Group_427320453@2x(1).png"
              alt=""
            />
            <div class="text">做同款</div>
          </div>
          <div class="item">
            <img
              src="https://umi-intelligence.oss-cn-shenzhen.aliyuncs.com/xcx/com/message_center/Group_427320453@2x (1)(1).png"
              alt=""
            />
            <div class="text">换一换</div>
          </div>
          <div class="item" v-if="chatList.length > 1 && exampleIndex == null" @click="downLoadVideo">
            <img
              src="https://umi-intelligence.oss-cn-shenzhen.aliyuncs.com/xcx/com/message_center/Group_427320453@2x (2)(1).png"
              alt=""
            />
            <div class="text">下载视频</div>
          </div>
          <div class="line"></div>
          <template v-if="chatList.length > 1 && exampleIndex == null">
            <div class="item">
              <!-- 点赞未选中 -->
              <img
                src="https://umi-intelligence.oss-cn-shenzhen.aliyuncs.com/xcx/com/message_center/Group_427320453@2x (3)(1).png"
                alt=""
                @click="handlerRecommend(1)"
                v-if="chatList[1]['is_good']!=1"
              />
              <!-- 点赞选中 -->
              <img 
                @click="handlerRecommend(0)"
                v-else
                src="https://umi-intelligence.oss-cn-shenzhen.aliyuncs.com/xcx/com/message_center/Group_427320453@2x (5).png" alt="">
            </div>
            <div class="item">
              <!-- 取消点赞未选中 -->
              <img
                @click="handlerRecommend(2)"
                src="https://umi-intelligence.oss-cn-shenzhen.aliyuncs.com/xcx/com/message_center/Group_427320453@2x (4)(1).png"
                alt=""
                v-if="chatList[1]['is_good']!=2"
              />
              <!-- 取消点赞选中 -->
              <img 
                v-else
                @click="handlerRecommend(0)"
                src="https://umi-intelligence.oss-cn-shenzhen.aliyuncs.com/xcx/com/message_center/Group_427320453@2x (6).png" alt="">
            </div>
          </template>
          <div class="item">
            <img
              src="https://umi-intelligence.oss-cn-shenzhen.aliyuncs.com/xcx/com/message_center/Group_427320453@2x (5)(1).png"
              alt=""
            />
          </div>
        </div>
        <div class="default-box" v-if="chatList.length == 0 && exampleIndex == null">
          <img src="https://umi-intelligence.oss-cn-shenzhen.aliyuncs.com/xcx/com/message_center/Group_427322505@2x(1).png" alt="">
          <div>快去生成你的创意吧~</div>
        </div>
        <!-- 生成中 -->
        <div class="waiting" v-else-if="isTimestableDiffusion">
          <div class="progress-text">{{ percentageNumber }}%</div>
          <div class="progress">
            <el-progress
              :stroke-width="10"
              :show-text="false"
              :percentage="percentageNumber"
            ></el-progress>
          </div>
          <div class="text">生成中，预计需要 2～5分钟，请稍后～</div>
        </div>
        <!-- 余额不足/没算力 -->
        <div class="balance" v-else-if="!isuser">
          <div class="text">十分抱歉，您的次数已用完，请购买流量包等产品</div>
          <el-button class="shopping-btn" @click="$refs.Pay.PayVisible = true"
            >购买套餐</el-button
          >
        </div>
        <!-- 成功 -->
        <video
          v-else-if="isBtn && chatList.length > 1"
          autoplay
          controls
          :src="chatList[1]['video_url']"
        ></video>
      </div>

      <div class="footer">
        <div class="title">
          <img
            src="https://umi-intelligence.oss-cn-shenzhen.aliyuncs.com/xcx/com/message_center/Group 427319584@2x (1).png"
            alt=""
          />
          <div class="text">角色生视频，只需轻松两步</div>
        </div>
        <!-- 介绍 -->
        <div class="introduce">
          <img
            src="https://umi-intelligence.oss-cn-shenzhen.aliyuncs.com/xcx/com/message_center/image@2x (1)1231sda.png"
            alt=""
          />
          <div>
            <div class="topic">
              <div class="number">1</div>
              <div class="text">创建角色</div>
            </div>
            <div class="desc">
              <div class="item">
                <div class="circular"></div>
                <div class="text">编辑角色名称</div>
              </div>
              <div class="item">
                <div class="circular"></div>
                <div class="text">
                  上传人物图片（真人图片，图片清晰，面部大小>200像素，面部无遮挡）
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="introduce">
          <img
            src="https://umi-intelligence.oss-cn-shenzhen.aliyuncs.com/xcx/com/message_center/image@2x (2)9xcv723.png"
            alt=""
          />
          <div>
            <div class="topic">
              <div class="number">2</div>
              <div class="text">生成角色视频</div>
            </div>
            <div class="desc">
              <div class="item">
                <div class="circular"></div>
                <div class="text">选择角色</div>
              </div>
              <div class="item">
                <div class="circular"></div>
                <div class="text">
                  输入提示词，例如：“一位年轻女孩，长发，黑色大眼睛，棕色皮肤。”
                </div>
              </div>
              <div class="item">
                <div class="circular"></div>
                <div class="text">
                  点击生成，等待生成完成
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 右侧栏目部分 -->
    <div class="right-nav">
      <div class="tabs">
        <el-tabs v-model="activeName">
          <el-tab-pane label="案例" name="first"></el-tab-pane>
          <el-tab-pane label="历史记录" name="second"></el-tab-pane>
        </el-tabs>
      </div>
      <div
          class="history-list"
          id="history-list"
          v-if="activeName == 'first'"
        >
          <div class="mask" id="history-mask">
            <div
              v-for="(item, i) in qsList"
              :key="i"
              :class="
                exampleIndex == i ? 'item item-on' : 'item'
              "
              @click="selectExampleItem(item, i)"
            >
              <img
                class="img"
                style="cursor: pointer"
                :src="httpUrls.ossUrl + item.pic_url"
                alt=""
              />
            </div>
          </div>
        </div>
        <!-- 历史记录 -->
        <div class="history-list" id="history-list" v-else>
          <div class="mask" id="history-mask">
            <div class="item" v-for="(item, i) in chatHistoryList" :key="i">
              <img
                class="img"
                :src="item.image_url"
                alt=""
                @click="getDrawDetail(item)"
              />
              <i
                class="el-icon-close del"
                @click="deleteDrawHistory(item, i)"
              ></i>
            </div>
            <div class="noHistory" v-if="chatHistoryList.length == 0">
              暂无数据
            </div>
          </div>
        </div>
    </div>
    <el-dialog
      title="创建角色"
      :visible.sync="roleVisible"
      width="900px"
      :before-close="handleClose"
    >
      <div class="role">
        <div class="role-item">
          <div class="role-top">
            <div class="title">角色名称</div>
          </div>
          <el-input v-model="roleName" placeholder="请输入角色名称" />
        </div>
        <div class="role-item">
          <div class="role-top">
            <div class="title">上传图片</div>
            <div>
              <el-popover popper-class="lookPopover" placement="top" width="600" trigger="click">
                <img
                  class="look-img"
                  src="https://umi-intelligence.oss-cn-shenzhen.aliyuncs.com/xcx/com/message_center/Group_427322203@2x(1).png"
                />
                <div slot="reference" class="look">查看示例</div>
              </el-popover>
            </div>
          </div>
          <div class="box-upload" style="width: 100%; height: 320px">
            <el-upload
            style="width: 100%; height: 100%; position: relative"
            class="upload-demo"
            :show-file-list="false"
            ref="blueprintReading"
            :data="blueprintReadingFile"
            :before-upload="beforeUpload"
            drag
            :action="httpUrls.loginUrl + 'api/user/oss_upload'"
            :on-change="handleChangeFile"
            :on-success="handleSuccessFile"
            :headers="headerData"
          >
            <!-- <i class="el-icon-upload"></i> -->
            <div class="upload-box" v-if="!uploadPictureUrl">
                <img
                  style="height: 64px"
                  :src="
                    httpUrls.ossUrl +
                    'xcx/com/message_center/Group_427319386@2x (3).png'
                  "
                  alt=""
                />
                <div class="el-upload__text">
                  将图片拖至此处 或 <em>点击上传</em>
                </div>
                <div class="el-upload__tips">
                  支持png/jpg/jpeg，文件大小不超过10M
                </div>
            </div>
            <div class="image-box" v-else>
              <img :src="httpUrls.ossUrl + uploadPictureUrl" alt="">
              <div class="text">{{ uploadPictureName }}</div>
              <i class="el-icon-delete" @click.stop="uploadPictureUrl = ''"></i>
            </div>
          </el-upload>
          </div>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="roleVisible = false">取 消</el-button>
        <el-button type="primary" @click="handlerCreateRole"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
import httpUrls from "../../api/requestURL";
import {
  get_Audio_Video_recommend,
  get_Audio_Video_list,
  delete_Audio_Video,
  create_Audio_Video,
  get_Audio_Video_status,
  get_RoleList,
  change_Audio_Video_good,
  textTranslate
} from "../../api/chatMG";
export default {
  data() {
    return {
      httpUrls,
      blueprintReadingFile: {
        image: null,
        image_name: null,
        oss_dir: "static",
        cate: "AI_chat-picture",
      },
      uploadPictureUrl: "", //上传的图片
      uploadPictureName:"",
      headerData: {}, //上传请求头
      size: "16:9", //尺寸
      sizeList: [
        {
          id: "16:9",
          size: "16:9",
          width: "46px",
          height: "26px",
        },
        {
          id: "9:16",
          size: "9:16",
          width: "26px",
          height: "46px",
        },
        {
          id: "1:1",
          size: "1:1",
          width: "40px",
          height: "40px",
        },
        {
          id: "5:2",
          size: "5:2",
          width: "46px",
          height: "18px",
        },
        {
          id: "4:5",
          size: "4:5",
          width: "32px",
          height: "42px",
        },
        {
          id: "4:3",
          size: "4:3",
          width: "40px",
          height: "30px",
        },
      ],
      sendValue: "", //提示词
      openBool: false, //展开收起字段
      chouzhen: false, //视频插帧
      seedBool: false, //种子
      seedValue: "", //种子
      yinxiao: false,
      activeName: "first",
      chatHistoryList: [],
      qsList: [],
      exampleItem: {},

      negativePrompt: "", //反向提示词
      timer: 0, //生成时间
      t_time: null, //定时器函数
      isTimestableDiffusion: false, //是否显示生成中
      isuser: true, //使用次数是否用完  true还有余额 false没有
      isBtn: true, // 防止重新发送  true能 false不能
      percentageNumber: 0, //进度
      chatList: [],
      page_size: 30,
      page: 1,
      toolActive: "first", //操作配置栏tab
      roleName: "", //角色名称
      roleList: [], //角色列表
      role_id: null,
      roleVisible: false,
      translateLoading:false, //中英文转换

      styleValue: "anime",
      styleList: [
        {
          pic_url:
            "https://umi-intelligence.oss-cn-shenzhen.aliyuncs.com/xcx/com/message_center/anime.png",
          name: "anime",
          value: "anime",
        },
        {
          pic_url:
            "https://umi-intelligence.oss-cn-shenzhen.aliyuncs.com/xcx/com/message_center/moody.png",
          name: "moody",
          value: "moody",
        },
        {
          pic_url:
            "https://umi-intelligence.oss-cn-shenzhen.aliyuncs.com/xcx/com/message_center/3d.png",
          name: "3d",
          value: "3d",
        },
        {
          pic_url:
            "https://umi-intelligence.oss-cn-shenzhen.aliyuncs.com/xcx/com/message_center/watercolor(1).png",
          name: "watercolor",
          value: "watercolor",
        },
        {
          pic_url:
            "https://umi-intelligence.oss-cn-shenzhen.aliyuncs.com/xcx/com/message_center/natural.png",
          name: "natural",
          value: "natural",
        },
        {
          pic_url:
            "https://umi-intelligence.oss-cn-shenzhen.aliyuncs.com/xcx/com/message_center/claymation.png",
          name: "claymation",
          value: "claymation",
        },
        {
          pic_url:
            "https://umi-intelligence.oss-cn-shenzhen.aliyuncs.com/xcx/com/message_center/black-and-white.png",
          name: "black-and-whit",
          value: "black-and-whit",
        },
      ],
      exampleImg:"",
      exampleIndex:null,
    };
  },
  created() {
    let userInfo = JSON.parse(localStorage.getItem("userInfo"));
    this.headerData.authorization = userInfo.token;
    this.headerData.role = userInfo.role;
    this.getRecommend();
    this.getChatList();
    this.getRoleList();
  },
  methods: {
    //点击示例
    selectExampleItem(item,index){
      this.isBtn = true;
      this.chatList = [];
      this.chatList.push({});
      this.chatList.push(item);
      this.chatList[1].video_url = this.httpUrls.ossUrl + item.mv_url
      this.sendValue = item.prompt;
      this.exampleIndex = index;
    },
     //做同款
     handlerSame(){
      if(this.chatList.length > 1){
        this.sendValue = this.chatList[1]['title']
      }
    },
    // 中文转英文
    handlerTextTranslate(){
      if(!this.sendValue){
        this.$message.error('请输入提示词');
        return
      }
      this.translateLoading = true;
      textTranslate({text:this.sendValue}).then(res => {
        if(res.code == 20000){
          this.$message.success('转换成功')
          this.sendValue = res.data.text
        }else{
          this.$message.error(res.msg)
        }
        setTimeout(() => {
            this.translateLoading = false;
          },500)
      })
    },
    //获取角色列表
    getRoleList() {
      get_RoleList().then((res) => {
        if (res.code == 20000) {
          this.roleList = res.data.data;
        } else {
          this.$message.error("网络波动，请稍后重试~");
        }
      });
    },
    beforeUpload(file) {
      const isType = file.type.includes("image");
      if (!isType) {
        this.$message.error("上传的文件类型仅支持图片格式");
        return false;
      }
      return isType;
    },
    handleChangeFile(file, fileList) {
      this.blueprintReadingFile.image = file.raw;
      this.blueprintReadingFile.image_name = file.name;
    },
    handleSuccessFile(response, file, fileList) {
      this.uploadPictureUrl = response.data.new_url;
      this.uploadPictureName = file.name
    },
    //创建角色
    handlerCreateRole() {
      this.$message.success('角色创建中~')
      let requestData = {
        name: this.roleName,
        image: this.uploadPictureUrl,
        style: "realistic",
        model: "Pix",
        character: true,
        action_type: 2,
      };
      create_Audio_Video(requestData)
        .then((res) => {
          if (res.code == 20000) {
            this.getRoleList();
            this.uploadPictureUrl = "";
            this.roleName = "";
            this.$message.success("角色创建成功!");
            this.roleVisible = false;
          } else {
            this.$message.error(res.msg);
          }
        })
        .catch((err) => {
          console.log(err, "err");
          this.$message.error(err.msg);
        });
    },
    handleClose(done) {
      this.uploadPictureUrl = "";
      this.roleName = "";
      done();
    },
    // 获取示例
    getRecommend(){
      get_Audio_Video_recommend(12).then(res => {
        console.log(res)
        if(res.code == 20000){
          this.qsList = res.data.data;
          let mathNumber = Math.floor(Math.random() * res.data.data.length);
          this.exampleItem = res.data.data[mathNumber];
        }
      })
    }, 
    //发送信息
    async sendMsg(type = 3) {
      this.isClickChat = false;
      this.actionType = type;
      this.loginInfo = JSON.parse(localStorage.getItem("userInfo"));
      // 原图
      if (this.sendValue == "" || this.sendValue.replace(/\s*/g, "") == "") {
        this.$message({
          type: "error",
          message: "请输入您要发送内容",
        });
        return false;
      }
      if (this.sizeRadio == "") {
        this.$message({
          type: "error",
          message: "请选择视频尺寸！",
        });
        return;
      }

      if (this.toolActive == 'second' && this.uploadPictureUrl == "") {
        this.$message.error("请上传一张图片");
        return;
      }
      if (this.toolActive == 'three' && !this.role_id) {
        this.$message.error("请先选择一名角色");
        return;
      }
      this.percentageNumber = 0;
      this.oldSendValue = this.sendValue;
      this.exampleImg = '';
      this.chatList = [];
      this.exampleIndex = null;
      this.createVideo();
    },
    sendMsg2() {
      this.$message({
        type: "info",
        message: "当前问题还没回答完毕，请稍后再提问！",
      });
    },
    //创建视频
    createVideo() {
      let userInfo = JSON.parse(localStorage.getItem("userInfo"));
      if (userInfo.role == "guess") {
        this.$message({
          message: "当前尚未登录，请先登录",
          type: "warning",
        });
        return;
      }
      this.isTimestableDiffusion = true;
      this.isBtn = false; // 是否允许重发
      this.isuser = true;
      let sendVal = {
        finish_reason: "length",
        session_code: "",
        chat_group_code: "",
        role: "user",
        content: this.sendValue,
        checked: false,
        help: false,
        stepOn: false,
        isShowOldChat: true,
        timer: false,
      };

      this.chatList.push(sendVal);
      // this.toBottom();

      // this.isTime = true; // 思考中
      this.timer = 0;
      this.t_time = setInterval(() => {
        this.timer += 1;
        if (Number((Math.random() * 10).toFixed(0)) % 2 == 0) {
          let num = Number((Math.random() * 10).toFixed(0));
          this.percentageNumber =
            this.percentageNumber + num >= 97
              ? 97
              : this.percentageNumber + num;
        }
      }, 1000);

      let requestData = {
        action_type: 2,
        prompt: this.sendValue,
        image: this.uploadPictureUrl
          ? this.httpUrls.ossUrl + this.uploadPictureUrl
          : "",
        video: "",
        ratio: '16:9',
        style: this.styleValue,
        parameters: {
          negativePrompt: this.negativePrompt,
          seed: this.seedBool ? this.seedValue : "", //种子
        },
        model: "Pix",
        sfx: true,
      };
      if (this.toolActive == 'three') {
        requestData.asset_id = this.role_id;
      }
      
      create_Audio_Video(requestData)
        .then((res) => {
          if (res.code == 20000) {
            this.queryVideo(res.data.trace_code);
          } else {
            if (res.data.code == 30014 || res.data.code == 40022) {
              this.isuser = false;
            }
            this.$message.error(res.msg);
            this.isBtn = true;
            this.timer = 0;
            this.percentageNumber = 0;
            clearInterval(this.t_time);
            this.isTimestableDiffusion = false;
          }
        })
        .catch((err) => {
          this.$message.error(res.msg);
          this.isBtn = true;
          this.timer = 0;
          this.percentageNumber = 0;
          clearInterval(this.t_time);
          this.isTimestableDiffusion = false;
        });
    },
    //查询生成结果
    queryVideo(trace_code) {
      get_Audio_Video_status(trace_code)
        .then((res) => {
          if (res.data.code == 30014 || res.data.code == 40022) {
            this.$message.error(res.msg);
            this.isBtn = true;
            this.timer = 0;
            this.percentageNumber = 0;
            clearInterval(this.t_time);
            this.isTimestableDiffusion = false;
            this.isuser = false;
          } else if (res.code == 20000) {
            if(res.data[0]['status'] == 0 || res.data[0]['status'] == 1){
            //继续查找
            setTimeout(() => {
              let code = trace_code;
              this.queryVideo(code);
            }, 5000);
          }else if(res.data[0]['status'] == 2){ //失败
            clearInterval(this.t_time);
            setTimeout(() => {
              this.chatList = []
              this.$message.error('网络异常，图片生成失败');
              this.isBtn = true;
              this.timer = 0;
              this.percentageNumber = 0;
              this.isTimestableDiffusion = false;
            }, 500);
          }else if(res.data[0]['status'] == 3){   //成功
            this.chatList.push(res.data[0]);
            this.percentageNumber = 99;
            clearInterval(this.t_time);
            setTimeout(() => {
              this.$message.success('视频生成成功');
              this.isBtn = true;
              this.timer = 0;
              this.percentageNumber = 0;
              this.isTimestableDiffusion = false;
            }, 500);
          }
          }
        })
        .catch((err) => {
          this.$message.error("网络异常，请稍后重试~");
          this.isBtn = true;
          this.timer = 0;
          this.percentageNumber = 0;
          clearInterval(this.t_time);
          this.isTimestableDiffusion = false;
        });
    },
    // 获取对话列表
    getChatList(str = "") {
      if (str == "gundong") {
        this.page++;
      }
      if (str == "aiId") {
        this.chatHistoryList = [];
      }
      let model = "Pix";
      let val = `action_type=${2}&model=${model}&page_size=${
        this.page_size
      }&page=${this.page}`;
      get_Audio_Video_list(val)
        .then((res) => {
          let data = res.data.data;
          data.map((item) => (item["content"] = item.result_image));
          if (res.code == 20000) {
            if (str == "gundong") {
              this.chatHistoryList = this.chatHistoryList.concat(res.data.data);
            } else {
              this.chatHistoryList = res.data.data;
            }
          } else {
            this.$message.error(res.msg);
          }
        })
        .catch((err) => {
          this.$message.error("获取失败！");
        });
    },
    deleteDrawHistory(item, i) {
      let val = { task_id: item.task_id };
      this.$confirm("是否删除所选信息?", "删除", {
        confirmButtonText: "确认",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          delete_Audio_Video(val)
            .then((res) => {
              if (res.code == 20000) {
                this.chatHistoryList.splice(i, 1);
                this.$message.success("删除成功！");
              } else {
                this.$message.error(res.msg);
              }
            })
            .catch((err) => {
              this.$message.error("删除失败！");
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    //下载视频
    downLoadVideo(){
      if(this.chatList.length < 1){
        this.$message.error('未检测到有效视频地址');
        return
      }
      let url = this.chatList[1]['video_url'];
      var a = document.createElement("a"); // 生成一个a元素
      var event = new MouseEvent("click"); // 创建一个单击事件
      a.download = "chatVideo.mp4"; // 设置图片名称
      a.href = url; // 将生成的URL设置为a.href属性
      a.dispatchEvent(event); // 触发a的单击事件
    },
    handlerRecommend(type){
      let requestData = {
        trace_code:this.chatList[1]['trace_code'],
        is_good:type
      }
      change_Audio_Video_good(requestData).then(res => {
        if(res.code == 20000){
          this.$set(this.chatList[1],'is_good',type)
        }else{
          this.$message.error(res.msg)
        }
      })
    },
    getDrawDetail(item) {
      this.exampleIndex = null;
      this.chatList = []
      this.chatList.push({});
      this.chatList.push(item);
    },
    // 开启新会话
    resetNewChat() {
      if (!this.isBtn) {
        this.$message("当前问题还没回答完毕，请稍后再试");
        return;
      }
      if (this.chatList.length == 0) return;
      
      this.chatList = []
      this.timer = 0; //生成时间
      clearInterval(this.t_time)
      this.t_time = null; //定时器函数
      this.isTimestableDiffusion = false; //是否显示生成中
      this.isuser = true; //使用次数是否用完  true还有余额 false没有
      this.isBtn = true; // 防止重新发送  true能 false不能
      this.percentageNumber = 0; //进度
      this.exampleIndex = null;
    },
  },
};
</script>

<style lang="scss" scoped>
.main {
  width: 100%;
  height: 100%;
  background: #f5f5f7;
  display: flex;
  .toolBar {
    width: 440px;
    height: 100%;
    overflow-y: auto;
    padding: 20px;
    box-sizing: border-box;
    background: #fff;
    /deep/ .el-tabs__header.is-top {
      margin: 0px;
    }
    /deep/ .el-tabs__active-bar.is-top {
      background: #003fff;
    }
    /deep/ .el-tabs__item {
      height: 45px;
      line-height: 50px;
    }
    /deep/ .el-tabs__item.is-active {
      color: #003fff;
    }
    /deep/ .el-tabs__nav-scroll {
      padding: 0px;
    }
    /deep/ .el-tabs__nav-wrap::after {
      background: #fff !important;
    }
    .transitionBox {
      height: auto;
      transition: all 0.6s;
      overflow: hidden;
    }
    .title {
      font-weight: bold;
      font-size: 14px;
      color: #000000;
      display: flex;
      align-items: center;
      gap: 6px;
      img {
        width: 13.5px;
        height: 13.5px;
      }
    }
    .line {
      width: 100%;
      height: 1px;
      background: #f2f2f2;
      margin: 20px 0px;
    }
    .submit-btn {
      display: flex;
      justify-content: center;
      align-items: center;
      background: #003fff;
      border-radius: 10px 10px 10px 10px;
      padding: 12px 0px;
      box-sizing: border-box;
      width: 100%;
      cursor: pointer;
      gap: 10px;
      div {
        display: flex;
        align-items: center;
        font-size: 16px;
        color: #ffffff;
        font-weight: 600;
        img {
          width: 24px;
          height: 24px;
          margin-right: 5px;
        }
      }
      .token {
        font-weight: bold;
        font-size: 16px;
        color: #fff373;
      }
    }
    .toolBar-box {
      display: flex;
      flex-direction: column;
      gap: 16px;
      margin-bottom: 24px;
      .box-top {
        width: 100%;
        display: flex;
        justify-content: space-between;
        .convert {
          padding: 6px 13px;
          box-sizing: border-box;
          border-radius: 10px 10px 10px 10px;
          background: #ffffff;
          border: 1px solid #ebebeb;
          font-weight: bold;
          font-size: 14px;
          color: #003fff;
          display: flex;
          align-items: center;
          gap: 4px;
          cursor: pointer;
          img {
            width: 20px;
            height: 20px;
          }
        }
        .openBtn {
          padding: 6px 13px;
          box-sizing: border-box;
          border-radius: 10px 10px 10px 10px;
          background: #ffffff;
          border: 1px solid #ebebeb;
          font-weight: bold;
          font-size: 14px;
          color: #666666;
          display: flex;
          align-items: center;
          gap: 4px;
          cursor: pointer;
          img {
            width: 20px;
            height: 20px;
            transition: all 0.6s;
          }
        }
      }
      .box-size {
        display: flex;
        gap: 10px;
        flex-wrap: wrap;
        .item {
          width: 80px;
          height: 100px;
          box-sizing: border-box;
          background: #f5f5f5;
          cursor: pointer;
          border-radius: 10px 10px 10px 10px;
          .box {
            width: 100%;
            height: calc(100% - 32px);
            display: flex;
            align-items: center;
            justify-content: center;
            .box-item {
              background: #d9d9d9;
              border-radius: 5px 5px 5px 5px;
            }
          }
          .text {
            font-weight: bold;
            font-size: 14px;
            color: #666666;
            text-align: center;
          }
        }
        .item.on {
          background: #fff;
          border: 2px solid #003fff;
          .box-item {
            background: #cdd9ff;
          }
          .text {
            color: #003fff;
          }
        }
      }
      .style {
        width: 100%;
        display: flex;
        flex-wrap: wrap;
        gap: 5px;
        .item {
          width: calc(25% - 10px);
          height: 77px;
          position: relative;
          cursor: pointer;
          border-radius: 10px 10px 10px 10px;
          .onImg {
            right: 0px;
            top: 0px;
            width: 16px;
            height: 16px;
            border-radius: 0px;
          }
          img {
            position: absolute;
            width: 100%;
            height: 100%;
            object-fit: cover;
            border-radius: 10px 10px 10px 10px;
          }
          .text {
            width: 100%;
            border-radius: 8px 8px 8px 8px;
            position: absolute;
            bottom: 0px;
            padding: 3px 0px;
            text-align: center;
            background: rgba(0, 0, 0, 0.4);
            font-weight: bold;
            font-size: 12px;
            color: #ffffff;
            z-index: 10;
          }
        }
      }
    }
  }
  .container {
    width: calc(100% - 440px - 290px);
    height: 100%;
    overflow-y: auto;
    padding: 30px 0px;
    box-sizing: border-box;
    position: relative;
    .video-box {
      width: calc(100% - 190px);
      height: 600px;
      margin-left: 85px;
      background: #fff;
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
      margin-bottom: 20px;
      .default-box {
        width: calc(100% - 25px);
        height: calc(100% - 25px);
        border: 2px dashed #dadde6;
        border-radius: 16px;
        background: #fafbff;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 20px;
        flex-direction: column;
        font-weight: bold;
        font-size: 16px;
        color: #000000;
        img {
          width: 100px;
          height: 100px;
        }
      }
      .waiting {
        width: calc(100% - 25px);
        height: calc(100% - 25px);
        border: 2px dashed #dadde6;
        border-radius: 16px;
        background: #fafbff;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 20px;
        flex-direction: column;
        text-align: center;
        .progress-text {
          font-weight: bold;
          font-size: 16px;
          color: #003fff;
        }
        .progress {
          width: 70%;
          padding: 6px;
          box-sizing: border-box;
          border: #6951ff 1px solid;
          border-radius: 20px 20px 20px 20px;
          /deep/ .el-progress-bar__inner {
            background: linear-gradient(
              270deg,
              #d86bff 0%,
              #2467ff 51%,
              #03c3ff 100%
            );
          }
        }
        .text {
          font-weight: 400;
          font-size: 14px;
          color: #000000;
        }
      }
      video {
        width: 100%;
        height: 100%;
        cursor: zoom-in;
      }
      .balance {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        .text {
          font-size: 14px;
          margin-bottom: 20px;
        }
        .shopping-btn {
          width: 179px;
          height: 40px;
          text-align: center;
          background: #ff9b17;
          color: #ffffff;
        }
      }
    }
    .instrument {
      position: absolute;
      top: 0px;
      right: -90px;
      padding: 20px 15px;
      box-sizing: border-box;
      border-radius: 16px;
      background: #ffffff;
      box-shadow: 0px 0px 40px 0px rgba(0, 0, 0, 0.03);
      border: 1px solid #f0f0f0;
      .line {
        width: 100%;
        height: 1px;
        margin-bottom: 20px;
        background: #f2f2f2;
      }
      .item {
        font-weight: bold;
        font-size: 12px;
        color: #000000;
        text-align: center;
        margin-bottom: 20px;
        cursor: pointer;
        img {
          width: 40px;
          height: 40px;
          margin-bottom: 5px;
        }
      }
    }
    .footer {
      width: calc(100% - 190px);
      margin-left: 85px;
      padding: 20px 28px;
      box-sizing: border-box;
      background: #fff;
      border-radius: 16px 16px 16px 16px;
      .title {
        position: relative;
        width: 100%;
        img {
          width: 100%;
          height: 55px;
        }
        .text {
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
          z-index: 10;
          font-weight: 600;
          font-size: 24px;
          color: #000000;
        }
      }
      .introduce {
        display: flex;
        align-items: center;
        gap: 20px;
        padding: 10px;
        box-sizing: border-box;
        background: #f5f8fa;
        border-radius: 10px 10px 10px 10px;
        margin-bottom: 20px;
        img {
          width: 180px;
          height: 180px;
        }
        .topic {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 17px;
          .number{
            width: 24px;
            height: 24px;
            line-height: 24px;
            text-align: center;
            font-weight: 600;
            font-size: 16px;
            color: #FFFFFF;
            background: #003FFF;
            border-radius: 50%;
          }
          .text{
            font-weight: bold;
            font-size: 16px;
            color: #000000;
          }
        }
        .desc {
          width: 100%;
          .item{
            width: 80%;
            display: flex;
            gap: 8px;
            font-weight: 500;
            font-size: 14px;
            color: #45474D;
            margin-bottom: 10px;
            .circular{
              width: 5px;
              height: 5px;
              border-radius: 50%;
              background: #B9BFCC;
              margin-top: 6px;
            }
          }
        }
      }
    }
  }
  .right-nav {
    width: 290px;
    height: 100%;
    overflow-y: auto;
    background: #fff;
    .tabs {
      box-sizing: border-box;
      border-bottom: 2px solid #f2f2f2;
      /deep/ .el-tabs__header.is-top {
        margin: 0px;
      }
      /deep/ .el-tabs__active-bar.is-top {
        background: #003fff;
      }
      /deep/ .el-tabs__item {
        height: 45px;
        line-height: 50px;
      }
      /deep/ .el-tabs__item.is-active {
        color: #003fff;
      }
      /deep/ .el-tabs__nav-scroll {
        padding: 0px 16px;
      }
      /deep/ .el-tabs__nav-wrap::after {
        background: #fff !important;
      }
    }
  }
  .role {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 24px;
    .role-top {
      width: 100%;
      margin-bottom: 16px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .title {
        font-weight: bold;
        font-size: 14px;
        color: #000000;
      }
      .look {
        font-weight: 600;
        font-size: 14px;
        color: #003fff;
      }
    }
  }
}
.box-upload {
  width: 400px;
  height: 180px;
  border-radius: 10px;
  background: #fff;
  box-shadow: 0px 0px 0px 0px rgba(0, 0, 0, 0.1),
    0px 10px 33px 0px rgba(0, 0, 0, 0.1);
  position: relative;
  left: 50%;
  transform: translate(-50%);
  /* padding-top: 70px; */
  box-sizing: border-box;
  /* display: flex;justify-content: center;flex-direction: column; */
}
.box-upload .upload-demo /deep/ .el-upload {
  width: 100%;
  height: 100%;
}
.box-upload .upload-demo /deep/ .el-upload-dragger {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  border: 2px dashed #dadde6 !important;
  background: #fafbff !important;
  .upload-box {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 250px;
  }
  .image-box{
    width: 100%;
    height: 100%;
    padding: 10px;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    gap: 16px;
    position: relative;
    img{
      width: auto;
      max-height: 160px;
      border-radius: 10px;
    }
    .text{
      font-weight: 400;
      font-size: 14px;
      color: #000000;
    }
    .el-icon-delete{
      position: absolute;
      top: 10px;
      right: 10px;
      font-size: 18px;
      font-weight: bold;
    }
  }
  .el-upload__text {
    font-weight: bold;
    font-size: 14px;
    color: #000000;
    em {
      color: #003fff;
      text-decoration: underline;
    }
  }
  .el-upload__tips {
    font-weight: 400;
    font-size: 12px;
    color: #666666;
  }
}
@media (min-width: 1450px) {
  .toolBar {
    width: 390px !important;
    .box-upload {
      width: 350px !important;
    }
  }
  .right-nav {
    width: 240px !important;
  }
  .container {
    width: calc(100% - 390px - 240px) !important;
  }
}
.history-list {
  height: calc(100% - 104px);
  overflow-y: auto;
  padding: 0px 16px;
  box-sizing: border-box;
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
.noHistory {
  text-align: center;
  padding: 15px;
  box-sizing: border-box;
  font-size: 14px;
  color: #ccc;
  margin: auto;
}
/deep/ .el-textarea__inner {
  background: #f5f5f5;
  border: 0px solid #ccc !important;
}
/deep/ .el-input__inner {
  background: #f5f5f5;
  border: 0px solid #ccc !important;
}
/dee/ .el-dialog__header {
  border-bottom: 1px solid #f2f2f2;
}

.look-img {
  width: 600px;
  height: auto;
}
</style>
<style>
.lookPopover{
    background: #333333;
    padding: 0px;
    border: 0px solid #ccc;
    border-radius: 15px;
}
</style>
