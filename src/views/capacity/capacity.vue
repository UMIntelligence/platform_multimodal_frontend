<template>
  <div class="main" ref="main">
    <!-- 头部 -->
    <header>
      <img class="bgImg" :src="httpUrls.ossUrl + '/xcx/com/message_center/Group 427319124.png'" alt="" />
      <div class="title">无忧秘书智脑</div>
      <div class="remind">一站式链接优质的AIGC大模型</div>
      <div class="search">
        <div><i class="el-icon-search"></i></div>
        <el-select v-model="value" filterable remote reserve-keyword placeholder="请输入要查找的功能" @change="searchToPage"
          :remote-method="remoteMethod">
          <el-option @click="searchToPage" v-for="item in options" :key="item.value" :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </div>
      <img class="navImg"
        src="https://umi-intelligence.oss-cn-shenzhen.aliyuncs.com/xcx/com/message_center/Group 427319099.png" />
    </header>
    <!-- 主体 -->
    <section style="padding-top: 20px">
      <!-- 主题内容 -->
      <div class="left">
        <!-- 栏目 -->
        <div class="column" v-for="(item, index) in leftOne" :key="index">
          <!-- 标题 -->
          <div class="column-title">
            <div>{{ item.title }}</div>
            <!-- <div class="more" v-if="item.arr.length < 5" @click="leftMeny(index)">
              查看更多
            </div>
            <div class="more" v-else @click="leftMeny(index)">收起</div> -->
          </div>
          <div class="column-conter">
            <div class="column-box" v-for="child in item.arr" :key="child.title" :ref="child.title"
              @click="pageLink(child)">
              <img class="box-image" v-if="child.topImage" :src="httpUrls.ossUrl + child.topImage" alt="" />
              <div class="box-top">
                <div v-if="child.image">
                  <img style="width: 32px; height: 32px;" :src="httpUrls.ossUrl + child.image" alt="" />
                </div>
                <span v-if="child.title != '语音对讲'">{{ child.title }}</span>
                <el-popover placement="right" width="200" trigger="click" v-if="child.title == '语音对讲'">
                  <div style="display: flex; justify-content: center">
                    <div>
                      <div style="text-align: center; background: #fff">
                        请前往小程序体验该功能
                      </div>
                      <img style="width: 180px" :src="httpUrls.ossUrl +
                        'static/picture/c94d71e3-9a2c-4033-b3f6-fe2c3720057a.png'
                        " alt="" />
                    </div>
                  </div>
                  <span slot="reference">{{ child.title }}</span>
                </el-popover>
              </div>
              <div class="box-text">{{ child.text }}</div>
            </div>
          </div>
        </div>
        <div id="element"></div>
      </div>
      <!-- AI资讯 -->
      <div class="right">
        <div class="right-top">
          <img style="width: 100%; height: 100%" :src="httpUrls.ossUrl +
            'static/picture/837d9bcd-e7de-477c-a340-e3e03c5d834b.png'
            " alt="" />
        </div>
        <!-- 相关推荐 -->
        <div class="related">
          <!-- 标题 -->
          <div class="related-title">相关推荐</div>
          <!-- 相关推荐内容展示 -->
          <!-- <div> -->
          <div class="related-box" v-for="item in informationData" :key="item.message_id" style="cursor: pointer"
            @click="handleDetails(item)">
            <div class="related-left">
              <div>{{ item.title }}</div>
              <div>
                <div class="related-time">
                  {{ informationTime(item.create_time) }}
                </div>
                <div>阅读{{ item.read_count }}</div>
              </div>
            </div>
            <img class="related-img" :src="item.image" />
          </div>
          <!-- </div> -->
          <div class="rightMeny" @click="$router.push('/information/information?ification=fun')"
            v-if="informationData.length != informationTotal">
            查看更多
          </div>
        </div>
        <!-- 官方活动 -->
        <div class="activity">
          <div class="activity-title">官方活动</div>
          <div class="activity-content">
            <img :src="httpUrls.ossUrl +
              'xcx/com/message_center/ws_1.png'
              " @click="$router.push('/shoppingServer')" />
            <div>服务器购买&租赁</div>
          </div>
        </div>
      </div>
    </section>
    <!-- AI定制合作 -->
    <div class="customized">
      <div class="customized-top">
        <img src="https://umi-intelligence.oss-cn-shenzhen.aliyuncs.com/xcx/com/message_center/Vector_225@2x.png"
          class="bgImg" alt="">
        <div class="title">AI定制合作</div>
        <div class="desc">一站式AIGC技术解决方案，激活企业/个人无限智造力</div>
      </div>
      <div class="customized-content">
        <div :style="index == 0 || index == 5
            ? `margin-left: 0px;${item.bgColor};`
            : `${item.bgColor};`"
             @click="handleCustomized(item)" class="customized-item" v-for="(item, index) in customizedData"
          :key="index">
          <div class="customized_l">
            <img :src="item.img" />
          </div>
          <div class="customized_r">
            <div>
              <span v-if="item.title != 'AI数字分身' && item.title != 'AI数字生命'">{{ item.title }}</span>
              <el-popover v-model="customizedbool_1" placement="right" width="200" trigger="click"
                v-else-if="item.title == 'AI数字分身'">
                <div style="display: flex; justify-content: center">
                  <div>
                    <div style="text-align: center; background: #fff">
                      请前往小程序体验该功能
                    </div>
                    <img style="width: 180px" :src="httpUrls.ossUrl +
                      'static/picture/c94d71e3-9a2c-4033-b3f6-fe2c3720057a.png'
                      " alt="" />
                  </div>
                </div>
                <span slot="reference">{{ item.title }}</span>
              </el-popover>
              <el-popover v-model="customizedbool_2" placement="right" width="200" trigger="click"
                v-else-if="item.title == 'AI数字生命'">
                <div style="display: flex; justify-content: center">
                  <div>
                    <div style="text-align: center; background: #fff">
                      请前往小程序体验该功能
                    </div>
                    <img style="width: 180px" :src="httpUrls.ossUrl +
                      'static/picture/c94d71e3-9a2c-4033-b3f6-fe2c3720057a.png'
                      " alt="" />
                  </div>
                </div>
                <span slot="reference">{{ item.title }}</span>
              </el-popover>
            </div>
            <div>{{ item.text }}</div>
          </div>
        </div>
      </div>
      <div class="btn" @click="handleCustomizedTo()">联系定制</div>
    </div>
    <!-- AI能力解决方案 -->
    <div class="solution">
      <div class="from-title">
        <img src="https://umi-intelligence.oss-cn-shenzhen.aliyuncs.com/xcx/com/message_center/Vector_225@2x.png"
          class="bgImg" alt="">
        <span>AI能力解决方案</span>
        <span>定制开发</span>
      </div>
      <div>
        <el-form style="width: 600px;margin: auto" :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px"
          class="demo-ruleForm">
          <el-form-item label="合作类型" prop="type">
            <el-select v-model="ruleForm.type" placeholder="请选择合作类型" style="width: 100%">
              <el-option v-for="item in typeArr" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="姓名" prop="name">
            <el-input v-model="ruleForm.name" placeholder="请输入您的姓名"></el-input>
          </el-form-item>
          <el-form-item label="手机号" prop="phone">
            <el-input v-model="ruleForm.phone" placeholder="请输入您的手机号" maxlength="11"></el-input>
          </el-form-item>
          <el-form-item label="合作意向" prop="text">
            <el-input type="textarea" v-model="ruleForm.text" placeholder="请输入内容" class="container_textarea"></el-input>
          </el-form-item>
        </el-form>
        <div class="btn" @click="submitForm('ruleForm')">提交</div>
      </div>
    </div>
    <footerRemark></footerRemark>
    <!-- 注册组件 -->
    <Register ref="Register"></Register>
  </div>
</template>
<script>
import { informationList, informationDetail } from "../../api/information";
import { business } from "../../api/chatMG";
import httpUrls from "../../api/requestURL";

import { getCozeTags, getAgent } from "../../api/enterprise";

import footerRemark from "../../components/footerRemark";
import Register from "../../components/register";
import PaginationBase from "../../components/PaginationBase.vue";


import { mapGetters } from "vuex";
export default {
  name: "capacity",
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
      httpUrls,
      tabPaneList: [],   //tab数据
      pageparm: {
        currentPage: 1,
        pageSize: 7,
        total: 10,
      },
      bool: false,
      customizedbool_1: false,
      customizedbool_2: false,
     
      leftOne: [
        
        {
          title: "对话",
          arr: [
            {
              title: "无忧秘书",
              text: "先进AI、无限创意",
              path: "/chat/Chat",
              query: 1004,
              image: "pc/com/message_center/wy_chat1.png",
            },
            {
              title: "文心一言",
              text: "推荐百度新一代语言大模型",
              path: "/chat/Chat",
              query: 4,
              image: "pc/com/message_center/wy_chat2.png",
            },
            {
              title: "讯飞星火",
              text: "科大讯飞推出的新一代认知智能大模型",
              path: "/chat/Chat",
              query: 5,
              image: "pc/com/message_center/wy_chat3.png",
            },
            {
              title: "ChatGLM",
              text: "由智谱AI推出的千亿参赛对话大模型",
              path: "/chat/Chat",
              query: 8,
              image: "static/picture/e70dcaf9-f3cb-40c1-99de-b739f09a7d18.png",
            },
            {
              title: "通义千问",
              text: "阿里巴巴集团推出的大语言模型",
              path: "/chat/Chat",
              query: 10,
              image: "pc/com/message_center/wy_chat4.png",
            },
            {
              title: "360智脑",
              text: "由360集团推出的认知型通用大模型",
              path: "/chat/Chat",
              query: 12,
              image: "pc/com/message_center/wy_chat5.png",
            },
            {
              title: "豆包",
              text: "字节旗下火山引擎推出的大型语言模型",
              path: "/chat/Chat",
              query: 1003,
              image: "pc/com/message_center/doubao.png",
            },
            {
              title: "腾讯混元",
              text: "腾讯最新研发的大语言模型",
              path: "/chat/Chat",
              query: 1001,
              image: "pc/com/message_center/wy_chat6.png",
            },
          ],
        },
        {
          title: "绘画",
          arr: [
            {
              title: "无忧秘书",
              text: "先进AI、无限创意",
              query: "",
              path: "/drawChat/drawChat",
              image: "pc/com/message_center/wy_chat1.png",
            },
            {
              title: "通义万相",
              text: "一个不断进化的AI艺术创作大模型",
              query: "13",
              path: "/drawChat/drawChat",
              image: "pc/com/message_center/wy_chat4.png",
            },
            {
              title: "百度绘画",
              text: "AI一下，文字成画将创意变成创作",
              query: "3",
              path: "/drawChat/drawChat",
              image: "pc/com/message_center/wy_chat2.png",
            },
            {
              title: "火山引擎",
              text: "火山方舟推出的大模型服务，文生图",
              query: "14",
              path: "/drawChat/drawChat",
              image: "pc/com/message_center/wy_chat7.png",
            },
          ],
        },
        {
          title: "音频",
          arr: [
            {
              title: "语音合成",
              text: "根据文字合成语音",
              image: "pc/com/message_center/wy_chat8.png",
              path: "/voice",
            },
            {
              title: "音视频转写",
              text: "音频，视频快速转写文字",
              image: "pc/com/message_center/wy_chat9.png",
              path: "/convert/voice",
            },
            {
              title: "语音对讲",
              text: "智能语音你问我答",
              image: "pc/com/message_center/wy_chat10.png",
              path: "",
            },
            {
              title: "声音克隆v1",
              text: "根据需求定制专属声音",
              image: "pc/com/message_center/wy_chat11.png",
              path: "/digitizedHuman/audioClone",
            },
            {
              title: "声音克隆v2",
              text: "根据需求定制专属声音",
              image: "pc/com/message_center/wy_chat11.png",
              path: "/audio/audioClone",
            },
            {
              title: "短视频制作",
              text: "定制你的专属数字人",
              image: "pc/com/message_center/wy_short.png",
              path: "/digitizedHuman/produceIndex",
            }
            
          ]
        },
        {
          title: "视频",
          arr: [
            {
              title: "视频处理",
              text: "高效处理视频能力合集",
              image: "pc/com/message_center/wy_shiping.png",
              path: "/workset/worksetNavVideo",
            },
            {
              title: "形象克隆",
              text: "定制专属形象",
              image: "pc/com/message_center/wy_kelong.png",
              path: "digitizedHuman/profile_video",
            },
            {
              title: "短视频制作",
              text: "定制你的专属数字人",
              image: "pc/com/message_center/wy_short.png",
              path: "/digitizedHuman/produceIndex",
            }
            
          ]
        },
        {
          title: "数字人",
          arr: [
            {
              title: "直播数字人",
              text: "数字人定制、想象无界",
              image: "xcx/com/message_center/ws_voice.png",
              path: "/digitizedHuman/index",
            },
            {
              title: "形象克隆",
              text: "定制专属形象",
              image: "pc/com/message_center/wy_kelong.png",
              path: "/digitizedHuman/profile",
            },
            {
              title: "声音克隆",
              text: "根据需求定制专属声音",
              image: "pc/com/message_center/wy_chat11.png",
              path: "/digital/audioClone",
            },
            {
              title: "短视频制作",
              text: "定制你的专属数字人",
              image: "pc/com/message_center/wy_short.png",
              path: "/digitizedHuman/produceIndex",
            }
            
          ]
        },
        {
          title: "智能体",
          arr: [
            {
              title: "提示词v1",
              text: "激发灵感，精准引导，让您的创作更具方向",
              image: "pc/com/message_center/wy_agent3.png",
              path: "/mineRole/mineRole",
            },
            {
              title: "提示词v2",
              text: "海量提示词宝库，满足您的各种创作需求",
              image: "pc/com/message_center/wy_agent2.png",
              path: "/question/question",
            },
            {
              title: "智能体",
              text: "智能体",
              image: "pc/com/message_center/wy_agen1.png",
              path: "/knowledge/knowledgeRobot",
            }
            
          ]
        },
       
        {
          title: "AI创作",
          arr: [
            {
              title: "AI PPT",
              text: "精彩演示 轻松生成",
              image: "pc/com/message_center/wy_chat12.png",
              path: "/ppt/ppt",
            },
            {
              title: "AI文档理解",
              text: "智能解读 一目了然",
              image: "pc/com/message_center/wy_chat13.png",
              path: "/aiWord/index",
            },
            // {
            //   title: "看图说话",
            //   text: "上传图片并根据文字智能对话",
            //   image: "pc/com/message_center/wy_chat14.png",
            //   path: "/identify/identify",
            // },
            {
              title: "文字识别",
              text: "识别图片中所包含的文字",
              image: "pc/com/message_center/wy_chat15.png",
              path: "/workset/textChat?title=通用文字识别",
            },
            {
              title: "语音合成",
              text: "根据文字合成语音",
              image: "pc/com/message_center/wy_chat8.png",
              path: "/workset/voiceChat",
            },
            {
              title: "文档对话",
              text: "上传文档、即可进行文档知识对话",
              path: "/workset/documentChat",
              image: "pc/com/message_center/wy_chat16.png",
            }
            
          ]
        },
        {
          title: "AI应用",
          arr: [
            {
              title: "数字孪生",
              text: "虚拟与现实融合，展现全新的数字世界",
              path: "/templateSelect/templateSelectNew",
              image: "pc/com/message_center/wy_chat23.png",
            },
            {
              title: "企业AI知识库",
              text: "汇聚企业智慧，AI 驱动的知识宝库",
              path: "/enterpriseWEB/knowledge/chatIndex",
              image: "pc/com/message_center/wy_chat24.png",
            },
            {
              title: "音视频转写",
              text: "会议记录、课堂笔记领域一键生稿",
              path: "/convert/application",
              image: "pc/com/message_center/wy_chat17.png",
            },
            {
              title: "看图说话",
              text: "上传图片并根据文字智能对话",
              image: "pc/com/message_center/wy_chat14.png",
              path: "/identify/identify",
            },
            {
              title: "彩超宝宝",
              text: "根据四维彩超预测宝宝未来长相",
              image: "pc/com/message_center/wy_chat18.png",
              path: "/drawChat/fourDUltrasound",
            },
            {
              title: "多模型对话",
              text: "沉浸式体验群聊场景",
              query: "1",
              image: "pc/com/message_center/wy_chat19.png",
              path: "/manyModelChat/chat",
            },
            {
              title: "智能直播",
              text: "创新直播体验，智能技术助力精彩呈现",
              image: "pc/com/message_center/wy_chat21.png",
              path: "/liveBroadcast/headPoem",
            }
          
          ]
        },

        {
          title: "更多功能",
          arr: [
            {
              title: "实验室",
              text: "探索前沿科技，挖掘无限可能",
              path: "/chataboratory/laboratoryChat?value=0",
              image: "pc/com/message_center/wy_chat22.png",
            },
            {
              title: "投诉与建议",
              text: "倾听您的声音，持续优化我们的服务",
              path: "/opinion/opinion",
              image: "pc/com/message_center/wy_chat25.png",
            },
            {
              title: "帮助中心",
              text: "遇到问题不用愁，这里为您答疑解惑",
              path: "/instruction/instruction",
              image: "pc/com/message_center/wy_chat26.png",
            },
            {
              title: "公众号",
              text: "最新资讯与精彩内容，一键推送至您手中",
              path: "/instruction/instruction",
              image: "pc/com/message_center/wy_chat27.png",
            },
          
          ]
        },
        

      ],
      informationData: [], //资讯数据
      informationTotal: 25, //资讯总数
      page_index: 1,
      page_count: 8,
      userInfo: null,
      menyIndex: 4,
      options: [],
      value: [],
      list: [],
      states: [
        {
          label: "创作中心",
          query: "/mineRole/mineRole",
        },
        {
          label: "AI导师",
          query: "/mengerMentor",
        },
        {
          label: "AI智能体",
          query: "/knowledge/knowledgeRobot",
        },
        {
          label: "藏头诗",
          query: "/liveBroadcast/headPoem",
        },
        {
          label: "专属头像藏头诗V1",
          query: "/liveBroadcast/headPoemArt",
        },
        {
          label: "专属头像藏头诗V2",
          query: "/liveBroadcast/headPoemText",
        },
        {
          label: "专属头像藏头诗V3",
          query: "/liveBroadcast/headPoemImg",
        },
        {
          label: "艺术字姓氏头像",
          query: "/liveBroadcast/chatWordArt",
        },
        {
          label: "艺术字头像九宫格",
          query: "/liveBroadcast/chatWordArtNew",
        },
        {
          label: "艺术字头像十宫格",
          query: "/liveBroadcast/chatWordArtNewTen",
        },
        {
          label: "AI对话",
          query: "/chat/Chat",
        },
        {
          label: "文心一言",
          query: "/chat/Chat",
          selectChat: "4",
        },
        {
          label: "讯飞星火",
          query: "/chat/Chat",
          selectChat: "5",
        },
        {
          label: "通义千问",
          query: "/chat/Chat",
          selectChat: "10",
        },
        {
          label: "360智脑",
          query: "/chat/Chat",
          selectChat: "12",
        },
        {
          label: "腾讯混元",
          query: "/chat/Chat",
          selectChat: "1001",
        },
        {
          label: "火山云雀",
          query: "/chat/Chat",
          selectChat: "1000",
        },
        {
          label: "AI绘画",
          query: "/drawChat/drawChat",
        },
        {
          label: "通义万相(绘画)",
          query: "/drawChat/drawChat?value=13",
        },
        {
          label: "百度绘画",
          query: "/drawChat/drawChat?value=3",
        },
        {
          label: "火山引擎(绘画)",
          query: "/drawChat/drawChat?value=14",
        },
        {
          label: "AI数字孪生",
          query: "/templateSelect/templateSelectNew",
        },
        {
          label: "名人互动",
          query: "/templateSelect/templateSelect",
          value: "3",
        },
        {
          label: "实用工具",
          query: "/templateSelect/templateSelect",
          value: "2",
        },
        {
          label: "休闲娱乐",
          query: "/templateSelect/templateSelect",
          value: "5",
        },
        // {
        //   label: "工作助理",
        //   query: "/templateSelect/templateSelect",
        //   value:''
        // },
        {
          label: "热门场景",
          query: "/templateSelect/templateSelect",
          value: "500615029629574",
        },
        {
          label: "助力职场",
          query: "/templateSelect/templateSelect",
          value: "500619806540422",
        },
        {
          label: "媒体创作",
          query: "/templateSelect/templateSelect",
          value: "500620488053382",
        },
        {
          label: "日常办公",
          query: "/templateSelect/templateSelect",
          value: "500620702696070",
        },
        {
          label: "知识技能",
          query: "/templateSelect/templateSelect",
          value: "500620906222214",
        },
        {
          label: "美好生活",
          query: "/templateSelect/templateSelect",
          value: "500621135958662",
        },
        {
          label: "跨境电商",
          query: "/templateSelect/templateSelect",
          value: "500621342761606",
        },
        {
          label: "对话模型",
          query: "/workset/worksetNav",
        },
        {
          label: "绘画模型",
          query: "/workset/worksetNav",
        },
        {
          label: "图片处理",
          query: "/workset/worksetNav",
        },
        {
          label: "视频处理",
          query: "/workset/worksetNav",
        },
        {
          label: "文字识别",
          query: "/workset/textChat?title=通用文字识别",
        },
        {
          label: "语音合成",
          query: "/workset/voiceChat",
        },
        {
          label: "文档对话",
          query: "/workset/documentChat",
        },
        {
          label: "AI实验室",
          query: "/chataboratory/laboratoryChat?value=0",
        },
        {
          label: "多模型对话",
          query: "/manyModelChat/chat",
        },
        //AI百宝箱
        {
          label: "照片修图",
          query: "/treasureBox?title=照片修图",
        },
        {
          label: "照片裁剪",
          query: "/treasureBox?title=照片裁剪",
        },
        {
          label: "视频人像卡通画",
          query: "/treasureBox?title=视频人像卡通画",
        },
        {
          label: "通用视频生成",
          query: "/treasureBox?title=通用视频生成",
        },
        {
          label: "视频字幕擦除",
          query: "/treasureBox?title=视频字幕擦除",
        },
        {
          label: "视频标志擦除",
          query: "/treasureBox?title=视频标志擦除",
        },
        //视觉体验馆
        {
          label: "视觉体验馆",
          query: "/visionNav/visionNav",
        },
        {
          label: "人脸融合",
          query: "/vision/vision?title=人脸融合",
        },
        {
          label: "人像年龄变化",
          query: "/vision/vision?title=人像年龄变化",
        },
        {
          label: "通用文字识别",
          query: "/vision/vision?title=通用文字识别",
        },
        {
          label: "人像漫画",
          query: "/vision/vision?title=人像漫画",
        },
        {
          label: "智能变美",
          query: "/vision/vision?title=智能变美",
        },
        {
          label: "人物抠图",
          query: "/vision/vision?title=人物抠图",
        },
        {
          label: "老照片修复",
          query: "/vision/vision?title=老照片修复",
        },
        {
          label: "图像增强",
          query: "/vision/vision?title=图像增强",
        },
        {
          label: "人像特效",
          query: "/vision/vision?title=人像特效",
        },
        {
          label: "表情编辑",
          query: "/vision/vision?title=表情编辑",
        },
        {
          label: "发型编辑",
          query: "/vision/vision?title=发型编辑",
        },
        {
          label: "3D游戏风",
          query: "/vision/vision?title=3D游戏风",
        },
        {
          label: "活体照片",
          query: "/vision/vision?title=活体照片",
        },
        {
          label: "头发分割",
          query: "/vision/vision?title=头发分割",
        },
        {
          label: "图片拉伸修复",
          query: "/vision/vision?title=图片拉伸修复",
        },
        {
          label: "图片配文",
          query: "/vision/vision?title=图片配文",
        },
        {
          label: "图片超分辨率",
          query: "/vision/vision?title=图片超分辨率",
        },
        {
          label: "图片方向矫正",
          query: "/vision/vision?title=图片方向矫正",
        },
        //智能工具
        {
          label: "音视频转写",
          text: "会议记录、课堂笔记等领域一键生稿",
          query: "/convert/index",
        },
        {
          label: "数字人",
          query: "/digitizedHuman/index",
        },
        {
          label: "文本识别",
          query: "/identify/identify",
        },
        {
          label: "彩超宝宝",
          query: "/drawChat/fourDUltrasound",
        },
        {
          label: "看图说话",
          query: "/identify/identify",
        },
        {
          label: "虚拟数字人",
          query: "/digitizedHuman/produceIndex",
        },
        {
          label: "声音克隆",
          query: "/audioCloneNew/index",
        },
        //企业知识库
        {
          label: "企业设置",
          query: "/enterpriseWEB/indexList/enterpriseSet",
        },
        {
          label: "知识库",
          query: "/enterpriseWEB/indexList/indexListView",
        },
        {
          label: "AI企业数字员工",
          query: "/enterpriseWEB/indexList/digitalEmployees",
        },
        {
          label: "成员管理",
          query: "/enterpriseWEB/indexList/memberManagement",
        },
        {
          label: "AI商城",
          query: "/shoppingToken",
        },
        {
          label: "帮助中心",
          query: "/instruction/instruction",
        },
        {
          label: "商务合作",
          query: "/collaborate/collaborate",
        },
        {
          label: "公告通知",
          query: "/noticeIndex/index",
        },
        {
          label: "版本信息",
          query: "/noticeIndex/index",
        },
        {
          label: "计费中心",
          query: "/residueNumber/residueNumber",
        },
        {
          label: "服务商",
          query: "/chatServe",
        },
        {
          label: "我要分销",
          query: "/mineDistribution/mineDistribution",
        },
        {
          label: "订单记录",
          query: "/order/Order",
        },
        {
          label: "我要分享",
          query: "/share/share",
        },
        {
          label: "卡密兑换",
          query: "/change/change",
        },
        {
          label: "个人中心",
          query: "/center/Center",
        },
      ],
      searchStatus: false,
      customizedData: [
        {
          title: "AI智能体",
          text: "自我学习的AI智能体",
          img: "https://umi-intelligence.oss-cn-shenzhen.aliyuncs.com/xcx/com/message_center/Group 427319125.png",
          bgColor:
            "background: linear-gradient( 315deg, #FFFFFF 0%, #F2FFFD 100%);",
          page: "/knowledge/knowledgeRobot",
        },
        {
          title: "AI数字分身",
          text: "专属您的多重AI数字分身",
          img: "https://umi-intelligence.oss-cn-shenzhen.aliyuncs.com/xcx/com/message_center/Group 427319126.png",
          bgColor:
            "background: linear-gradient( 315deg, #FFFFFF 0%, #F6F2FF 100%);",
          page: "",
        },
        {
          title: "AI数字生命",
          text: "数字分身、数字复活",
          img: "https://umi-intelligence.oss-cn-shenzhen.aliyuncs.com/xcx/com/message_center/Group 427319141.png",
          bgColor:
            "background: linear-gradient( 315deg, #FFFFFF 0%, #F2FFF9 100%);",
          page: "",
        },
        {
          title: "视频数字人",
          text: "声音克隆、形象克隆、视频生成",
          img: "https://umi-intelligence.oss-cn-shenzhen.aliyuncs.com/xcx/com/message_center/Group 427319127.png",
          bgColor:
            "background: linear-gradient( 315deg, #FFFFFF 0%, #FFF9F0 100%);",
          page: "http://127.0.0.1/s_video_dh/",
        },
        {
          title: "直播数字人",
          text: "声音克隆、形象克隆、数字人直播",
          img: "https://umi-intelligence.oss-cn-shenzhen.aliyuncs.com/xcx/com/message_center/Group 427319125 (1).png",
          bgColor:
            "background: linear-gradient( 315deg, #FFFFFF 19%, #F0F4FF 100%);",
          page: "/digitizedHuman/index",
        },
        {
          title: "互动数字人",
          text: "数字人、声音克隆、形象克隆",
          img: "https://umi-intelligence.oss-cn-shenzhen.aliyuncs.com/xcx/com/message_center/Group 427319129.png",
          bgColor:
            "background: linear-gradient( 315deg, #FFFFFF 0%, #FFF5F2 100%);",
          page: "http://127.0.0.1/ai_avatar_8/",
        },
        {
          title: "企业AI知识库",
          text: "自我进化的AI知识资产",
          img: "https://umi-intelligence.oss-cn-shenzhen.aliyuncs.com/xcx/com/message_center/Group 427319130.png",
          bgColor:
            "background: linear-gradient( 315deg, #FFFFFF 0%, #F2F8FF 100%);",
          page: "/enterpriseWEB/indexList/indexListView",
        },
      ],
      activeName: 'first',
      ruleForm: {
        type: "",
        name: "",
        phone: "",
        text: "",
      },
      rules: {
        name: [{ required: true, message: "请输入您的姓名", trigger: "blur" }],
        type: [{ required: true, message: "请选择您的合作意向", trigger: "blur" }],
        phone: [
          { required: true, message: "请输入您的手机号", trigger: "blur" },
          { validator: checkPhone, message: "请输入正确的手机号", trigger: "blur" },
        ],
      },
      typeArr: [
        {
          label: "AI数字人虚拟直播系统",
          value: 10,
        },
        {
          label: "无人直播伴侣",
          value: 11,
        },
        {
          label: "短视频矩阵SEO",
          value: 12,
        },
        {
          label: "AI 能力定制",
          value: 13,
        },
        {
          label: "企业/行业数字员工",
          value: 14,
        },
        {
          label: "企业/行业AI能力定制开发",
          value: 15,
        },
        {
          label: "基于 AIGC 的能力定制",
          value: 16,
        },
        {
          label: "申请服务商",
          value: 20,
        },
      ],
      agentTags: [], //一级标签
      agentTagsId: 0,
      agentTagsChild: [], //二级标签
      agentTagsIdChild: 0, //二级标签
      agentData: [
        {
          img: "https://umi-intelligence.oss-cn-shenzhen.aliyuncs.com/xcx/com/message_center/Rectangle 34625122.png",
          title: "读书小助手",
          desc: "读书小助手是一款专为爱书人士设计的智能读书工具，具有强大的功能。它不仅可以根据你的需求推荐好书，还能根据你提供的书名，快速而详细地帮你全面解读一本书的创作背景、详细内容、经典书评和读书摘要。更为特别的是，它还能模拟作者与你互动交流。"
        },
        {
          img: "https://umi-intelligence.oss-cn-shenzhen.aliyuncs.com/xcx/com/message_center/Rectangle 34625122-1.png",
          title: "学习小助手",
          desc: "我可以解答数学、语文、英语、科学、历史等各学科问题，你可以把题目通过输入框 📷 拍照发给我。"
        },
        {
          img: "https://umi-intelligence.oss-cn-shenzhen.aliyuncs.com/xcx/com/message_center/Rectangle 34625122-2.png",
          title: "制作ai小说推文",
          desc: "为小说生成吸引人的推文。"
        },
        {
          img: "https://umi-intelligence.oss-cn-shenzhen.aliyuncs.com/xcx/com/message_center/Rectangle 34625122-3.png",
          title: "少儿百科",
          desc: "专为儿童设计的百科知识学习工具，以通俗易懂的方式讲解百科知识，还能生成有趣的知识卡片，让学习变得更加生动有趣。"
        },
        {
          img: "https://umi-intelligence.oss-cn-shenzhen.aliyuncs.com/xcx/com/message_center/Rectangle 34625122-4.png",
          title: "解题答疑助手",
          desc: "帮你解决全科作业难题，提供个性化答疑的智能辅导机器人。"
        },
        {
          img: "https://umi-intelligence.oss-cn-shenzhen.aliyuncs.com/xcx/com/message_center/Rectangle 34625122-5.png",
          title: "股神巴菲特",
          desc: "股神巴菲特，以其卓越的投资成就、理性冷静的性格、简洁明了的语言风格、与比尔·盖茨的友谊以及从小对商业和投资的浓厚兴趣，创造了许多投资神话，成为全球最富有的人之一。"
        },
        {
          img: "https://umi-intelligence.oss-cn-shenzhen.aliyuncs.com/xcx/com/message_center/Rectangle 34625122-6.png",
          title: "Excel办公大全",
          desc: "EXCEL 办公高手，擅长各种表格制作、快捷键使用、函数公式设置和运用，让你的办公更高效。"
        },
        {
          img: "https://umi-intelligence.oss-cn-shenzhen.aliyuncs.com/xcx/com/message_center/Rectangle 34625122-7.png",
          title: "脑筋急转弯",
          desc: "脑筋急转弯是一种智力问答游戏，以简单的问题或情景为基础，需要从不同的角度思考和回答问题，能锻炼人们的思维灵活性、创造力和逻辑推理能力，同时也能带来乐趣和娱乐。"
        },
      ]
    };
  },
  components: {
    footerRemark,
    Register,
    PaginationBase
  },
  created() {
    this.userInfo = JSON.parse(localStorage.getItem("userInfo"));
    this.init();
  },
  mounted() {
    let dom = this.$refs[this.indexDom];

    if (dom != undefined) {
      dom[0].scrollIntoView({
        block: "center",
        behavior: "smooth",
      });
    }
    this.list = this.states.map((item) => {
      return {
        value: `${item.label}`,
        label: `${item.label}`,
        path: `${item.query}`,
      };
    });
    getCozeTags().then(res => {
      console.log(res, '智能体类目')
      if (res.code == 20000) {
        this.tabPaneList = res.data;
        this.activeName = this.tabPaneList[0]['label']
        // this.agentTags = res.data[0]['children'];
        // this.agentTagsId = this.agentTags[0]['id']
        // this.agentTagsChild = res.data[0]['children'][0]['children'];
        // this.agentTagsIdChild = this.agentTagsChild[0]['id']
        this.getAgentData(0)
      }
    })
  },
  computed: {
    ...mapGetters(["indexDom"]),
  },
  methods: {
    
    //tab改变事件
    handleTabsChange() {
      if (this.activeName != '全部') {
        this.agentTags = this.tabPaneList.filter(item => item.label == this.activeName)[0]['children']
        this.agentTagsId = this.agentTags[0]['id']
        this.agentTagsChild = this.agentTags[0]['children'];
        this.agentTagsIdChild = this.agentTagsChild[0]['id']
        this.getAgentData(this.agentTagsIdChild)
      } else {
        this.agentTags = [];
        this.agentTagsChild = [];
        this.agentTagsId = null;
        this.agentTagsIdChild = null;
        this.getAgentData(0)
      }

    },
    //点击1级标签
    handleClickTags(item) {
      this.agentTagsId = item.id
      this.agentTagsChild = item.children;
      this.agentTagsIdChild = this.agentTagsChild[0]['id'];
      this.getAgentData(this.agentTagsIdChild)
    },
    //点击二级标签  //获取智能体数据
    handleClickTagsChild({ id }) {
      this.agentTagsIdChild = id;
      this.getAgentData(id)
    },
    callFather(val) {
      this.pageparm.currentPage = val.currentPage;
      this.agentTags = [];
      this.agentTagsChild = [];
      this.agentTagsId = null;
      this.agentTagsIdChild = null;
      this.getAgentData(0)
    },
    //获取智能体数据
    getAgentData(classify_id) {
      let obj = {}
      if (classify_id != 0) {
        obj.classify_id = classify_id
      } else {
        obj.page_size = this.pageparm.pageSize;
        obj.page = this.pageparm.currentPage;
      }
      getAgent(obj).then(res => {
        this.agentData = res.data;
        if (classify_id == 0) {
          this.pageparm.total = res.total;
        }
      })
    },
    //跳转智能体对话
    handleAgent(item) {
      let userInfo = JSON.parse(localStorage.getItem('userInfo'));
      if (userInfo.role == "guess") {
        this.$refs.Register.registerVisible = true;
        return;
      }
      this.$router.push('/agentChat/chat?id=' + item.bot_id);
      sessionStorage.setItem('agentItem', JSON.stringify(item));
    },
    remoteMethod(query) {
      if (query !== "") {
        setTimeout(() => {
          this.options = this.list.filter((item) => {
            return item.label.toLowerCase().indexOf(query.toLowerCase()) > -1;
          });
        }, 200);
      } else {
        this.options = [];
      }
    },
    searchToPage(e) {
      this.value = "";
      this.searchStatus = false;
      let path = this.options.find((item) => e == item.label);
      let index = this.states.findIndex((item) => e == item.label);
      // console.log(this.states[index]);
      if (this.states[index].value) {
        this.$store.dispatch(
          "app/changeApplicationCenterId",
          this.states[index].value
        );
        sessionStorage.setItem("applicationId", this.states[index].value);
        sessionStorage.setItem("applicationType", this.states[index].value);
      }
      if (this.states[index].selectChat) {
        console.log(this.states[index].selectChat);
        this.$store.dispatch(
          "app/changeSelectChat",
          this.states[index].selectChat
        );
      }
      if (path.path == "/workset/worksetNav") {
        this.$store.dispatch("app/changeworksetLabel", path.value);
      }
      this.$router.push(path.path);
    },
    handleCustomizedTo() {
      let dom = this.$refs.main;
      dom.scrollIntoView({
        block: "end",
        behavior: "smooth",
      });
    },
    handleCustomized(val) {
      if (val.title == "AI数字分身") this.customizedbool_1 = !this.customizedbool_1;
      else if (val.title == "AI数字生命") this.customizedbool_2 = !this.customizedbool_2;
      else if (val.title == "视频数字人" || val.title == "互动数字人") {
        window.open(val.page);
      } else this.$router.push(val.page);
    },
    informationTime(val) {
      let time = new Date(val);
      return time.getMonth() + 1 + "-" + time.getDate();
    },
    init(str = "") {
      if (str == "gundong") {
        this.page_index++;
      }
      if (this.informationData.length >= this.informationTotal) {
        return;
      }
      //请求参数
      let data = {
        user_id: this.userInfo.user_id,
        message_type: 2,
        page_index: this.page_index,
        page_count: this.page_count,
      };
      console.log(data, "请求参数");
      informationList(data)
        .then((res) => {
          console.log(res.data);
          if (res.code == 20000) {
            this.informationTotal = res.total;
            if (str == "gundong") {
              this.informationData = this.informationData.concat(res.data);
              // console.log(this.informationData)
            } else {
              this.informationData = res.data;
            }
          }
        })
        .catch((err) => {
          console.log(err, "错误信息");
        });
    },
    leftMeny(index) {
      let data = [
        
        {
          title: "对话",
          arr: [
            {
              title: "无忧秘书",
              text: "先进AI、无限创意",
              query: "/chat/Chat",
              val: 1004,
              image: "static/picture/89200a8a-36ab-43aa-9f6b-918b470c3f63.png",
            },
            {
              title: "文心一言",
              text: "推荐百度新一代语言大模型",
              query: "/chat/Chat",
              val: 4,
              image: "static/picture/2a4a8b53-5339-4f11-976d-af5c562656ba.png",
            },
            {
              title: "讯飞星火",
              text: "科大讯飞推出的新一代认知智能大模型",
              query: "/chat/Chat",
              val: 5,
              image: "static/picture/f6ccba51-9274-4a9e-9380-27775dda6cb1.png",
            },
            {
              title: "ChatGLM",
              text: "由智谱AI推出的千亿参赛对话大模型",
              query: "/chat/Chat",
              val: 8,
              image: "static/picture/e70dcaf9-f3cb-40c1-99de-b739f09a7d18.png",
            },
            {
              title: "通义千问",
              text: "阿里巴巴集团推出的大语言模型",
              query: "/chat/Chat",
              val: 10,
              image: "static/picture/c41cd958-a14d-4f6e-a26a-bd22c6b3460e.png",
            },
            {
              title: "360智脑",
              text: "由360集团推出的认知型通用大模型",
              query: "/chat/Chat",
              val: 12,
              image: "static/picture/0bd787ee-2f53-4216-b810-030f6ba2f55c.png",
            },
            {
              title: "豆包",
              text: "字节旗下火山引擎推出的大型语言模型",
              query: "/chat/Chat",
              val: 1004,
              image: "static/picture/a2d95978-ce23-4206-99cd-7b51a42a4388.png",
            },
            {
              title: "腾讯混元",
              text: "腾讯最新研发的大语言模型",
              query: "/chat/Chat",
              val: 1001,
              image: "static/picture/b21293b8-b53c-4aab-8a5e-7eb269776839.png",
            },
          ],
        },
        {
          title: "绘画",
          arr: [
            {
              title: "无忧秘书",
              text: "先进AI、无限创意",
              query: "13",
              image: "static/picture/89200a8a-36ab-43aa-9f6b-918b470c3f63.png",
            },
            {
              title: "通义万相",
              text: "一个不断进化的AI艺术创作大模型",
              query: "13",
              image: "static/picture/c41cd958-a14d-4f6e-a26a-bd22c6b3460e.png",
            },
            {
              title: "百度绘画",
              text: "AI一下，文字成画将创意变成创作",
              query: "3",
              image: "static/picture/5e052261-6ace-48c1-8c2a-3c6422207a3d.png",
            },
            {
              title: "火山引擎",
              text: "火山方舟推出的大模型服务，文生图",
              query: "14",
              image: "static/picture/90b3a7b1-1b0e-401b-bc2a-f71b56feb937.jpg",
            },
          ],
        },
        {
          title: "优选能力",
          arr: [
            {
              title: "多模型对话",
              text: "丰富功能应有尽有",
              query: "",
              topImage:
                "static/picture/b3ce80fe-81fa-41bb-b1a2-ae5f7f5f7a50.png",
            },
            {
              title: "音视频转文字",
              text: "会议记录、课堂笔记领域一键生稿",
              query: "",
              topImage:
                "static/picture/fa6c6413-ca88-4c70-8d0d-c1f7f9ac4408.png",
            },
            {
              title: "数字人",
              text: "数字人定制、想象无界",
              query: "",
              topImage:
                "static/picture/7baaebb1-12db-478c-ada5-eb845a26ae90.png",
            },
            {
              title: "文本识别",
              text: "智能识别图中的内容",
              query: "",
              topImage:
                "static/picture/ecfc7aab-9a13-43c3-89a1-092924f512c8.png",
            },
            {
              title: "文档对话",
              text: "上传文档、即可进行文档知识对话",
              query: "",
              topImage:
                "static/picture/b57fb660-b66a-4af0-9df4-06d77fd5e7e0.png",
            },
            {
              title: "人像抠图",
              text: "上传图片即可人像抠图",
              query: "",
              topImage:
                "static/picture/5b45f220-edb7-46e3-9a2a-a1d765db5cce.png",
            },
            {
              title: "人脸融合",
              text: "提供视频和图片即可进行人脸融合",
              query: "",
              topImage:
                "static/picture/ee2ae9b9-b522-41e0-9e00-7f04e2122064.png",
            },
          ],
        },
        {
          title: "AI工具集",
          arr: [
            {
              title: "对话模型",
              text: "多种对话模型任意选择",
              image: "static/picture/385ba555-a833-4e66-b1e8-9e2b94a21758.png",
              path: "/workset/worksetNav",
            },
            {
              title: "绘画模型",
              text: "多种绘画模型任意选择",
              image: "static/picture/fe226738-79ae-4752-bb37-40678c2506de.png",
              path: "/workset/worksetNav",
            },
            {
              title: "图片处理",
              text: "高效处理图片能力合集",
              image: "static/picture/429c8e3f-accc-4ffa-832b-9fc732904198.png",
              path: "/workset/worksetNav",
            },
            {
              title: "视频处理",
              text: "高效处理视频能力合集",
              image: "static/picture/ecadf13f-ca74-4c91-b006-cd1d1a17d858.png",
              path: "/workset/worksetNav",
            },
            {
              title: "文字识别",
              text: "识别图片中所包含的文字",
              image: "static/picture/62de06f8-babe-4eb3-85d2-692419f67f04.png",
              path: "/workset/textChat?title=通用文字识别",
            },
            {
              title: "语音合成",
              text: "根据文字合成语音",
              image: "static/picture/b2585ea5-2be9-4a27-a95c-b4eb2de6673d.png",
              path: "/workset/voiceChat",
            },
            {
              title: "文档对话",
              text: "上传文档进行文档知识对话",
              image: "static/picture/7aea648c-06f9-45cc-bf12-0459f931ba76.png",
              path: "/workset/documentChat",
            },
          ],
        },
        {
          title: "AI超级能力",
          arr: [
            {
              title: "音视频转写",
              text: "音频，视频快速转写文字",
              image: "static/picture/db7722da-b876-40d9-8a0d-5553f22fe9ad.png",
              path: "/convert/index",
            },
            {
              title: "看图说话",
              text: "上传图片并根据文字智能对话",
              image: "static/picture/588fbf6f-f74e-429e-8a24-b8303c289df7.png",
              path: "/identify/identify",
            },
            {
              title: "彩超宝宝",
              text: "根据四维彩超预测宝宝未来长相",
              image: "static/picture/0968d1c6-c33c-4906-8362-b2b0e359dc47.png",
              path: "/drawChat/fourDUltrasound",
            },
            {
              title: "多模型对话",
              text: "沉浸式体验群聊场景",
              query: "1",
              image: "static/picture/23736a28-671f-4774-a92a-d09ec7dcc7a0.png",
              path: "/manyModelChat/chat",
            },
            {
              title: "虚拟数字人",
              text: "定制你的专属数字人",
              image: "static/picture/07ed9435-7777-4048-bde7-75adc3f5db0b.png",
              path: "/digitizedHuman/produceIndex",
            },
            {
              title: "声音克隆",
              text: "根据需求定制专属声音",
              image: "static/picture/ee71c7e6-c41a-4fcb-903e-638a3f535b33.png",
              path: "/audioCloneNew/index",
            },
            {
              title: "语音对讲",
              text: "智能语音你问我答",
              image: "static/picture/b8a0f83c-f3eb-46c0-9d49-71574f2511f5.png",
              path: "",
            },
            {
              title: "智能直播",
              text: "创新直播体验，智能技术助力精彩呈现",
              image: "static/picture/b8a0f83c-f3eb-46c0-9d49-71574f2511f5.png",
              path: "",
            },
          ],
        },
        {
          title: "AI实验室",
          arr: [
            {
              title: "AI35",
              text: "语言大模型3.5版本，语义理解不错",
              image: "static/picture/2b1ae683-8a59-450a-9d56-bfd55cc626a9.png",
              query: "0",
            },
            {
              title: "AI40",
              text: "语言大模型4.0版本，语义理解升级版",

              query: "1",
              image: "static/picture/2b1ae683-8a59-450a-9d56-bfd55cc626a9.png",
            },
            {
              title: "Stable Diffusion",
              text: "上传人像图即可生成相应的漫画人像",
              query: "9",
              image: "static/picture/d426d41b-c1e1-427e-b1bd-ec30c824ee14.jpg",
              // query: { value: 9, label: 'Stable Diffusion', size: '512*512' }
            },
            {
              title: "Midjourney",
              text: "上传图片，智能修图",
              image: "static/picture/9d013074-eff9-476e-864c-e98c67e00fbe.jpg",

              query: "6",
            },
            {
              title: "Dall.E3",
              text: "输入文字内容即可智能生图",
              image: "static/picture/2b1ae683-8a59-450a-9d56-bfd55cc626a9.png",
              query: "15",
            },
          ],
        },
      ];
      if (data[index].arr.length <= 4) {
        this.$message("没有更多数据了...");
        return;
      }
      if (this.leftOne[index]["arr"].length <= 4) {
        this.$set(
          this.leftOne[index],
          "arr",
          data[index]["arr"].slice(0, data[index]["arr"].length)
        );
      } else {
        this.$set(this.leftOne[index], "arr", data[index]["arr"].slice(0, 4));
      }
    },
    //跳转Ai资讯
    handleDetails(val) {
      // 请求参数
      let data = {
        message_type: val.message_type,
        message_id: val.message_id,
      };
      sessionStorage.setItem("information", JSON.stringify(data));
      this.$router.push(`/information/information`);
    },

    pageLink(item) {
      if(item.path == '/chat/Chat') {
        this.$store.dispatch("app/changeSelectChat", item.query);
        this.$router.push(item.path);
      } else if(item.path == '/drawChat/drawChat') {
        this.$router.push("/drawChat/drawChat?value=" + item.query);
        sessionStorage.setItem("indexType", JSON.stringify(item.query));
      } else {
        console.log(item.path, 558978)
        if(item.path == '') {
          this.bool = true
        } else {
          this.bool = false
          this.$router.push(item.path);
        }
        
      }
      this.$store.dispatch("app/changeIndexDom", item.title);
    },
    toPage(item, type) {
      switch (item.title) {
        case "无忧秘书":
          this.$router.push(type.query);
          break;
        case "热门推荐":
          // this.$router.push(`/chat/Chat?value=${type.query}`);
          if (type.title == "AI工具集") {
            this.$router.push("/treasureBoxNav");
          } else if (type.title == "AI实验室") {
            this.$router.push("/chataboratory/laboratoryDrawChat?value=9");
          } else if (type.title == "AI视觉馆") {
            this.$router.push("/visionNav/visionNav");
          } else if (type.title == "智能工具") {
            this.$message("功能正在开发中...");
          } else if (type.title == "绘画模型") {
            this.$router.push("/drawChat/drawChat?value=13");
          } else if (type.title == "对话模型") {
            this.$store.dispatch("app/changeSelectChat", 12);
            this.$router.push("/chat/Chat");
          } else {
            this.$router.push(type.query);
          }
          break;
        case "优选能力":
          // type.title == '语音对讲'
          if (type.title == "多模型对话") {
            this.$router.push("/manyModelChat/chat");
          } else if (type.title == "音视频转文字") {
            this.$router.push("/convert/index");
          } else if (type.title == "数字人") {
            this.$router.push("/digitizedHuman/index");
          } else if (type.title == "文本识别") {
            this.$router.push("/identify/identify");
          } else if (type.title == "文档对话") {
            this.$router.push("/workset/documentChat");
          } else if (type.title == "人像抠图") {
            this.$router.push("/vision/vision?title=人物抠图");
          } else if (type.title == "人脸融合") {
            this.$router.push("/vision/vision?title=人脸融合");
          }
          break;
        case "对话模型":
          // if (type.query == "/chat/Chat") {
          //   this.$router.push(`/chat/Chat`);
          // } else {
          this.$store.dispatch("app/changeSelectChat", type.val);

          this.$router.push("/chat/Chat");
          // }
          break;
        case "绘画模型":
          if (type.title == "无忧秘书") {
            this.$router.push("/drawChat/drawChat");
          } else {
            this.$router.push("/drawChat/drawChat?value=" + type.query);
            sessionStorage.setItem("indexType", JSON.stringify(type.query));
          }
          break;
        case "AI工具集":
          if (type.path == "/workset/worksetNav") {
            this.$store.dispatch("app/changeworksetLabel", type.title);
            this.$router.push(type.path);
          } else {
            this.$router.push(type.path);
          }
          break;
        case "AI超级能力":
          if (type.path != "") {
            this.$router.push(type.path);
          } else {
            this.bool = !this.bool;
          }
          break;
        case "AI视觉馆":
          console.log(item);
          item.arr.forEach((item2, index) => {
            if (item2.title == type.title && index < 12) {
              this.$router.push(`/vision/vision?title=${type.title}`);
            } else if (item2.title == type.title && index >= 12) {
              this.$message("正在开发中...");
            }
          });
          break;
        case "助理中心":
          this.$router.push("/templateSelect/templateSelect");
          this.$store.dispatch("app/changeApplicationCenterId", type.id);
          sessionStorage.setItem("applicationId", type.id);
          sessionStorage.setItem("applicationType", type.tab_id);
          break;
        case "AI实验室":
          if (type.title == "AI35" || type.title == "AI40") {
            this.$router.push(
              `/chataboratory/laboratoryChat?value=${type.query}`
            );
            sessionStorage.setItem("indexType", type.query);
          } else {
            console.log(type.query);
            this.$router.push(
              `/chataboratory/laboratoryDrawChat?value=${type.query}`
            );
            sessionStorage.setItem("indexType", JSON.stringify(type.query));
          }
          break;
        case "智能工具":
          if (type.title == "数字人") {
            this.$router.push(type.page);
          } else if (type.title == "彩超宝宝") {
            this.$router.push("/drawChat/fourDUltrasound");
          } else if (type.title == "音视频转文字") {
            this.$router.push("/convert/index");
          } else if (type.title == "文本识别") {
            this.$router.push(`/vision/vision?title=通用文字识别`);
          } else if (type.title == "文档对话") {
            this.$router.push("/document/chat");
          } else if (type.title == "看图说话") {
            this.$router.push("/identify/identify");
          }

          break;
        default:
          break;
      }
      this.$store.dispatch("app/changeIndexDom", type.title);
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
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
                this.$message.error(res.msg);
              }
            })
            .catch((err) => {
              this.isClick = true;
              this.$message.error("信息提交失败！");
            });
        }
      });
    },
  },
};
</script>
<style scoped lang="scss">
.agent {
  width: 100%;
  padding: 0px 32px;
  box-sizing: border-box;

  .title {
    font-weight: 600;
    font-size: 20px;
    color: #19191a;
    text-align: left;
    padding: 0px !important;
  }

  .agent-tags {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    gap: 10px;

    .tags-item {
      width: 80px;
      height: 32px;
      line-height: 32px;
      text-align: center;
      cursor: pointer;
      border-radius: 8px 8px 8px 8px;
      border: 1px solid #f2f2f2;
      font-weight: 500;
      font-size: 14px;
      color: #515359;
      background: #fff;
    }

    .tags-itemOn {
      background: #1a52ff !important;
      color: #ffffff !important;
    }

    .tags-itemOnc {
      background: #06988a !important;
      color: #ffffff !important;
    }
  }

  .agent-list {
    margin-top: 24px;
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    gap: 20px;

    .agent-box {
      width: calc(25% - 20px);
      padding: 20px;
      box-sizing: border-box;
      background: #fff;
      border-radius: 10px 10px 10px 10px;
      transition: all 0.6s;
      position: relative;
      top: 0px;
      cursor: pointer;

      .agent-information {
        display: flex;
        align-items: center;
        gap: 10px;
        font-weight: 500;
        font-size: 16px;
        color: #000000;

        img {
          width: 48px;
          height: 48px;
          border-radius: 10px;
        }
      }

      .agent-desc {
        width: calc(100% - 20px);
        height: 38px;
        margin-top: 10px;
        font-weight: 500;
        font-size: 14px;
        text-align: start;
        color: #666666;
        -webkit-line-clamp: 2;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }

    .agent-box:hover {
      top: -10px;
      box-shadow: 0px 10px 20px 0px rgba(0, 0, 0, 0.08);
    }
  }
}

.solution {
  width: 100%;
  padding: 0px 32px;
  box-sizing: border-box;
  background: #f1f2f5;
  margin: 0px;
  padding-top: 60px;

  .from-title {
    text-align: center;
    font-weight: 600;
    font-size: 32px;
    color: #000000;
    width: 500px;
    position: relative;
    margin: auto;

    span:last-child {
      color: #1d5eff;
      margin-left: 5px;
    }

    .bgImg {
      width: 500px;
      height: auto;
      position: absolute;
      top: 32px;
      left: 0px;
    }
  }

  >div:first-child {
    margin-bottom: 50px;
  }
}

.activity {
  width: 100%;
  padding: 14px;
  box-sizing: border-box;
  background: #fff;
  border-radius: 4px;
  margin-top: 20px;
}

.activity-title {
  margin-bottom: 12px;
}

.activity-content img {
  width: 100%;
  min-height: 120px;
  cursor: pointer;
}

.activity-content div {
  font-size: 14px;
}

.main {
  padding: 0px;
  width: 100%;
  overflow: hidden;
}

header {
  width: 100%;
  position: relative;
  box-sizing: border-box;
  padding-bottom: 20px;
  text-align: center;
  /* background: rgb(241, 242, 245); */
}

header .bg-box {
  width: 100%;
  height: 50%;
  position: absolute;
  bottom: 0px;
  z-index: -1;
  background: url("https://umi-intelligence.oss-cn-shenzhen.aliyuncs.com/xcx/com/message_center/Group 427319124.png") no-repeat 100% 100%;
  background-size: cover;
}

header .bgImg {
  width: 100%;
  height: 100%;
  position: absolute;
  z-index: -2;
  left: 0px !important;
  top: 0px;
}

/deep/ .el-tabs__nav-wrap::after {
  height: 1px !important;
  background: #e6e6e6;
}

header .title {
  padding-top: 50px;
  text-align: center;
  color: #333;
  font-family: PingFang SC;
  font-size: 48px;
  font-style: normal;
  font-weight: 600;
  line-height: 150%;
  /* 72px */
}

header .title span {
  background: linear-gradient(277deg,
      #1f64ff 54.69%,
      #97b7ff 64.14%,
      #1f64ff 74.27%);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

header .remind {
  margin-top: 16px;
  color: #333;
  font-family: PingFang SC;
  font-size: 20px;
  font-style: normal;
  font-weight: 400;
  text-align: center;
  /* 80% */
}

header .search {
  width: 70%;
  height: 48px;
  margin: auto;
  background: #fff;
  border-radius: 8px;
  display: flex;
  align-items: center;
  padding-left: 10px;
  margin-top: 25px;
}

.customized {
  width: 100%;
  padding: 0px 32px;
  padding-top: 30px;
  box-sizing: border-box;
  margin: 0px !important;
  background: #f1f2f5;

  .customized-top {
    width: 500px;
    text-align: center;
    position: relative;
    margin: auto;

    margin-bottom: 35px;

    .bgImg {
      width: 500px;
      height: auto;
      position: absolute;
      top: 32px;
      left: 0px;
    }

    .title {
      font-weight: 600;
      font-size: 32px;
      color: #000000;
      margin-bottom: 10px;
    }

    .desc {
      font-weight: bold;
      font-size: 16px;
      color: #666666;
    }
  }

}

.btn {
  width: 240px;
  height: 40px;
  line-height: 40px;
  background: #3363F6;
  border-radius: 10px 10px 10px 10px;
  cursor: pointer;
  font-weight: bold;
  font-size: 14px;
  color: #FFFFFF;
  text-align: center;
  margin: auto;
  margin-top: 30px;
}

.navImg {
  width: calc(100% - 64px);
  height: auto;
  margin: 22px auto;
}

.customized-content {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
}

.customized-content .customized-item {
  width: calc(25% - 60px);
  // width: calc(100% / 4 - 30px);
  display: flex;
  padding: 23px 21px;
  box-sizing: border-box;
  border-radius: 10px;
  border: 1px solid #ffffff;
  // margin: 8px 20;
  background: linear-gradient(315deg, #ffffff 0%, #f2fff9 100%);
  cursor: pointer;
  position: relative;
  transition: all 0.6s;
  top: 0px;
}

.customized-content .customized-item:hover {
  top: -10px;
  box-shadow: 0px 10px 20px 0px rgba(0, 0, 0, 0.08);
}

.customized-content .customized-item .customized_l {
  width: 64px;
  height: 64px;
  margin-right: 16px;
}

.customized_l img {
  width: 100%;
  height: 100%;
}

.customized_r {
  width: calc(100% - 64px - 16px);
  position: relative;
}

.customized_r div:first-child {
  width: 100%;
  font-weight: bold;
  font-size: 18px;
  color: #000000;
  margin-bottom: 8px;
}

.customized_r div:last-child {
  width: 100%;
  font-weight: 400;
  font-size: 14px;
  color: #8f8f8f;
}

header .search /deep/ .el-input__inner {
  border: 0px solid #ccc;
  border-radius: 8px;
}

header .search .el-icon-search {
  font-size: 20px;
  /* font-weight: bold; */
  cursor: pointer;
}

section {
  width: 100%;
  background: #f1f2f5;
  padding: 0px 26px;

  display: flex;
  justify-content: space-between;
  align-items: stretch;
  /* flex-direction: row; */
  box-sizing: border-box;
  height: 100%;
}

section .left {
  width: calc(100% - 300px - 20px);
  /* height: 800px; */
  /* flex: 1; */
}

.column {
  box-sizing: content-box;
  margin-bottom: 20px;
  padding: 0px;
}

.column-title {
  color: #19191a;
  font-family: PingFang SC;
  font-size: 20px;
  font-style: normal;
  font-weight: 600;
  line-height: 30px;
  margin-bottom: 12px;
  display: flex;
  justify-content: space-between;
}

.column-title .more {
  color: #1f64ff;
  font-size: 12px;
  font-weight: 500;
  cursor: pointer;
  margin-right: 1%;
}

.column-conter {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  box-sizing: content-box;
}

.column-box {
  width: 23%;
  height: 110px;
  padding: 10.5px;
  box-sizing: border-box;
  position: relative;
  background: #fff;
  border-radius: 8px;
  margin: 8px 1%;
  cursor: pointer;
  transition: all 0.6s;
  position: relative;
  top: 0px;
}

.column-box:hover {
  top: -10px;
  box-shadow: 0px 10px 20px 0px rgba(0, 0, 0, 0.08);
}

/* .column-box:hover{
  background: rgb(204, 204, 204,0.7);
} */

.column-box:last-child {
  margin-right: 0px;
}

.column-box .box-image {
  width: 50px;
  height: 50px;
  position: absolute;
  top: 0px;
  right: 0px;
}

.column-box .box-top {
  display: flex;
}

.column-box .box-top>div:first-child {
  width: 32px;
  height: 32px;
  flex-shrink: 0;
  border-radius: 3.2px;
  border: 0.8px solid #f4f5f9;
  background: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 10px;
  overflow: hidden;
}

.column-box .box-top>div:first-child img {
  width: 16px;
  height: 16px;
}

.column-box .box-top span {
  color: #000;
  font-family: PingFang SC;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: 32px;
  /* 24px */
}

.column-box .box-text {
  color: #8f8f8f;
  font-family: PingFang SC;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 21px;
  margin-top: 12px;
  /* 21px */
}

.right {
  width: 300px;
  min-height: 100%;
  padding-top: 50px;
  /* flex: 1; */
}

.right-top {
  width: 100%;
  height: 300px;
  border-radius: 5px;
  background-color: white;
  margin-bottom: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  overflow: hidden;
}

.right-top>img {
  width: 100%;
  height: 100%;
}

.related {
  width: 100%;
  /* min-height: 2063px; */
  /* height: calc(100% - 320px); */
  flex-shrink: 0;
  border-radius: 4px;
  padding: 14px;
  box-sizing: border-box;
  background: #fff;
}

.related-box {
  width: 100%;
  height: 80px;
  display: flex;
  justify-content: space-between;
  margin: 12px 0px;
}

.related-left {
  position: relative;
  width: calc(100% - 150px);
}

.related-left>div:last-child {
  color: #a6a6a6;
  width: 100%;
  font-family: PingFang SC;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 150%;
  position: absolute;
  bottom: 0px;
  display: flex;
  justify-content: space-between;
}

.related-left>div:last-child .related-time {
  /* margin-right: 51px; */
}

.related-left>div:last-child div:last-child {
  /* margin-left: 16px; */
}

.related-left>div:first-child {
  color: #333;

  font-family: PingFang SC;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 150%;
  /* 18px */
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  position: absolute;
  top: 0px;
}

.related-img {
  border-radius: 10px;
  width: 130px;
  height: 80px;
}

.rightMeny {
  width: 80%;
  line-height: 50px;
  text-align: center;
  border: 1px solid blue;
  color: blue;
  border-radius: 8px;
  margin: auto;
  margin-top: 30px;
  cursor: pointer;
}
</style>
<!-- <style>
.footer_remark-on {
    background-color: rgb(241, 242, 245) !important;
}
</style> -->
