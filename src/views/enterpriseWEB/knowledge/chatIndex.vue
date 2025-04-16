<template>
  <div class="main">
   
    <nav>
      <img src="https://umi-intelligence.oss-cn-shenzhen.aliyuncs.com/xc/com/message_center/Group 427318874.png" alt=""> 
      <div>xxxx科技公司</div>
    </nav>
    <div class="top">
      <div class="top-row">
        <div class="title">AI智能体</div>
        <div class="content">
          <div class="content_box" v-for="(item,index) in topData" :key="index" @click="handleDetail(item)">
            <div>
              <img :src="item.image" alt="">
              <div>{{item.title}}</div>
            </div>
            <img src="https://umi-intelligence.oss-cn-shenzhen.aliyuncs.com/xcx/com/message_center/vuesax_linear_arrow-right@2xaa.png" alt="">
          </div>
        </div>
      </div>
      <div class="top-row">
        <div class="title">创建智能体</div>
        <div class="content">
          <div class="content_box">
            <div>
              <img src="https://umi-intelligence.oss-cn-shenzhen.aliyuncs.com/xcx/com/message_center/Group_427319938@2xasd.png" alt="">
              <div>创建AI智能体</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="container">
      <div class="container-top">
        <div class="title">最近访问</div>
        <div>
          <el-input
            placeholder="请输入内容"
            prefix-icon="el-icon-search"
            v-model="input2">
          </el-input>
        </div>
      </div>
      <div class="container-content">
        <el-tabs v-model="activeName" @tab-click="handleTabsClick">
          <el-tab-pane label="全部" name="first"></el-tab-pane>
          <el-tab-pane label="企业" name="second"></el-tab-pane>
          <el-tab-pane label="部门" name="third"></el-tab-pane>
          <el-tab-pane label="我的" name="fourth"></el-tab-pane>
        </el-tabs>
        <div class="container_c_father">
          <div class="container-box" v-for="(item,index) in chatData" :key="index">
            <div class="container_b_top">
              <div class="container_bTop_left">
                <img :src="item.img" alt="">
                <div>{{item.title}}</div>
              </div>
              <div class="container_bTop_right">
                <el-popover
                  placement="bottom-start"
                  width="80"
                  trigger="click">
                  <!-- <div style="position: relative"> -->
                  <div class="popover">
                    <div style="cursor: pointer;">
                      <i class="el-icon-edit" style="margin-right: 8px"></i
                      >编辑
                    </div>
                    <div style="cursor: pointer;">
                      <i class="el-icon-delete" style="margin-right: 8px;color: #FF0F00;"></i>删除
                    </div>
                  </div>
                  <img
                    slot="reference"
                    src="https://umi-intelligence.oss-cn-shenzhen.aliyuncs.com/static/picture/d864fc17-e118-4133-87d2-c7bf02e8b905.png"
                    alt=""
                    class="circular_icon"
                  />
                </el-popover>
              </div>
            </div>
            <div class="container_b_content">
              {{item.desc}}
            </div>
          </div>
        </div>
        <div class="container_c_bottom">
          <PaginationBase v-bind:child-msg="pageparm" @callFather="callFather"></PaginationBase>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import PaginationBase from "../../../components/PaginationBase.vue";
export default {
  name: "knowledgeBase_chatIndex",
  data() {
    return {
      topData:[
        {
          title:'深圳xxxx公司',
          image:'https://umi-intelligence.oss-cn-shenzhen.aliyuncs.com/xcx/com/message_center/Group_427319934@2x.png',
          id:1
        },
        {
          title:'所属部门-运营部',
          image:'https://umi-intelligence.oss-cn-shenzhen.aliyuncs.com/xcx/com/message_center/Group_427319937@2x.png',
          id:2
        },
        {
          title:'我的智能体',
          image:'https://umi-intelligence.oss-cn-shenzhen.aliyuncs.com/xcx/com/message_center/Group_427319125@2x.png',
          id:3
        },
      ],
      input2:'',
      activeName:'first',
      chatData:[],  //智能体数据
      chatData_1:[
        {
          img:"https://umi-intelligence.oss-cn-shenzhen.aliyuncs.com/xcx/com/message_center/Rectangle 34625122.png",
          title:"读书小助手",
          desc:"读书小助手是一款专为爱书人士设计的智能读书工具，具有强大的功能。它不仅可以根据你的需求推荐好书，还能根据你提供的书名，快速而详细地帮你全面解读一本书的创作背景、详细内容、经典书评和读书摘要。更为特别的是，它还能模拟作者与你互动交流。"
        },
        {
          img:"https://umi-intelligence.oss-cn-shenzhen.aliyuncs.com/xcx/com/message_center/Rectangle 34625122-1.png",
          title:"学习小助手",
          desc:"我可以解答数学、语文、英语、科学、历史等各学科问题，你可以把题目通过输入框 📷 拍照发给我。"
        },
        {
          img:"https://umi-intelligence.oss-cn-shenzhen.aliyuncs.com/xcx/com/message_center/Rectangle 34625122-2.png",
          title:"制作ai小说推文",
          desc:"为小说生成吸引人的推文。"
        },
        {
          img:"https://umi-intelligence.oss-cn-shenzhen.aliyuncs.com/xcx/com/message_center/Rectangle 34625122-3.png",
          title:"少儿百科",
          desc:"专为儿童设计的百科知识学习工具，以通俗易懂的方式讲解百科知识，还能生成有趣的知识卡片，让学习变得更加生动有趣。"
        },
        {
          img:"https://umi-intelligence.oss-cn-shenzhen.aliyuncs.com/xcx/com/message_center/Rectangle 34625122-4.png",
          title:"解题答疑助手",
          desc:"帮你解决全科作业难题，提供个性化答疑的智能辅导机器人。"
        },
        {
          img:"https://umi-intelligence.oss-cn-shenzhen.aliyuncs.com/xcx/com/message_center/Rectangle 34625122-5.png",
          title:"股神巴菲特",
          desc:"股神巴菲特，以其卓越的投资成就、理性冷静的性格、简洁明了的语言风格、与比尔·盖茨的友谊以及从小对商业和投资的浓厚兴趣，创造了许多投资神话，成为全球最富有的人之一。"
        },
        {
          img:"https://umi-intelligence.oss-cn-shenzhen.aliyuncs.com/xcx/com/message_center/Rectangle 34625122-6.png",
          title:"Excel办公大全",
          desc:"EXCEL 办公高手，擅长各种表格制作、快捷键使用、函数公式设置和运用，让你的办公更高效。"
        },
        {
          img:"https://umi-intelligence.oss-cn-shenzhen.aliyuncs.com/xcx/com/message_center/Rectangle 34625122-7.png",
          title:"脑筋急转弯",
          desc:"脑筋急转弯是一种智力问答游戏，以简单的问题或情景为基础，需要从不同的角度思考和回答问题，能锻炼人们的思维灵活性、创造力和逻辑推理能力，同时也能带来乐趣和娱乐。"
        },
        {
          img:"https://umi-intelligence.oss-cn-shenzhen.aliyuncs.com/xcx/com/message_center/Rectangle 34625122-8.png",
          title:"星座运势",
          desc:"星座运势，神秘有趣的星座大师，为你提供专属星座运势预测，解析星座特点，探寻星座奥秘。"
        },
        {
          img:"https://umi-intelligence.oss-cn-shenzhen.aliyuncs.com/xcx/com/message_center/Rectangle 34625122-9.png",
          title:"起名大师",
          desc:"起名大师饱读诗书，精通古诗词和音律，善于引经据典，用富有内涵的名字赋予新生宝宝独特的魅力。"
        },
        {
          img:"https://umi-intelligence.oss-cn-shenzhen.aliyuncs.com/xcx/com/message_center/Rectangle 34625122-10.png",
          title:"ai写作",
          desc:"高效创作高质量文章的智能助手"
        },
        {
          img:"https://umi-intelligence.oss-cn-shenzhen.aliyuncs.com/xcx/com/message_center/Rectangle 34625122-11.png",
          title:"短视频脚本制作",
          desc:"专业的短视频脚本创作专家，能够根据用户需求创作适合不同平台的短视频脚本，涵盖各种风格，确保脚本内容吸引人、易于理解。"
        },
        {
          img:"https://umi-intelligence.oss-cn-shenzhen.aliyuncs.com/xcx/com/message_center/Rectangle 34625122-12.png",
          title:"文章改写",
          desc:"文章改写，专注于将文章或文本进行改写，使其语气、风格或结构发生变化，但保持原始信息和主要内容不变。"
        },
        {
          img:"https://umi-intelligence.oss-cn-shenzhen.aliyuncs.com/xcx/com/message_center/Rectangle 34625122-13.png",
          title:"天眼查",
          desc:"专业商业查询工具，信息全面、准确、简洁"
        },
        {
          img:"https://umi-intelligence.oss-cn-shenzhen.aliyuncs.com/xcx/com/message_center/Rectangle 34625122-14.png",
          title:"公众号文案",
          desc:"公众号文章写作高手，擅长撰写高质量的公众号文章文案和爆款标题，让您的文章更具吸引力。"
        },
        {
          img:"https://umi-intelligence.oss-cn-shenzhen.aliyuncs.com/xcx/com/message_center/Rectangle 34625122-15.png",
          title:"创业项目分析",
          desc:"分析各类创业项目，揭示从 0 到 100 万的成功秘诀。"
        },
        {
          img:"https://umi-intelligence.oss-cn-shenzhen.aliyuncs.com/xcx/com/message_center/Rectangle 34625122-16.png",
          title:"PPT大纲生成",
          desc:"PPT 大纲生成专家，能根据主题快速生成完整、清晰的 PPT 大纲，确保结构完整、重点突出，并可根据需要添加图表、图片、表格等元素。"
        },
        {
          img:"https://umi-intelligence.oss-cn-shenzhen.aliyuncs.com/xcx/com/message_center/Rectangle 34625122-17.png",
          title:"恋爱大师",
          desc:"资深恋爱顾问，擅长运用同理心和沟通技巧，帮助用户实现甜蜜约会和美满恋爱。"
        },
        {
          img:"https://umi-intelligence.oss-cn-shenzhen.aliyuncs.com/xcx/com/message_center/Rectangle 34625122-18.png",
          title:"性格测试",
          desc:"它是一个趣味十足的性格测试，能够帮助你更好地了解自己的性格特点。"
        },
        {
          img:"https://umi-intelligence.oss-cn-shenzhen.aliyuncs.com/xcx/com/message_center/Rectangle 34625122-19.png",
          title:"AI取英文名",
          desc:"结合东西方文化，为商务、日常等场景赋予独特英文名的专家。"
        },
        {
          img:"https://umi-intelligence.oss-cn-shenzhen.aliyuncs.com/xcx/com/message_center/Rectangle 34625122-20.png",
          title:"幽默笑话",
          desc:"有趣笑话，让你笑不停。"
        },
        {
          img:"https://umi-intelligence.oss-cn-shenzhen.aliyuncs.com/xcx/com/message_center/Rectangle 34625122-21.png",
          title:"直播口播带货",
          desc:"直播带货口播是一个能精准把控产品卖点、抓住受众购买心理、熟悉消费行业和直播行业的专家，能够快速定制吸引人的口播稿，并根据特定要求调整内容和语言，在文案中体现特定的销售策略。"
        },
        {
          img:"https://umi-intelligence.oss-cn-shenzhen.aliyuncs.com/xcx/com/message_center/Rectangle 34625122-22.png",
          title:"头像生成",
          desc:"快来生成超级cool的涂鸦头像"
        },
        {
          img:"https://umi-intelligence.oss-cn-shenzhen.aliyuncs.com/xcx/com/message_center/Rectangle 34625122-23.png",
          title:"小红书爆款文案",
          desc:"小红书爆款文案，点亮你的文案之火。"
        },
        {
          img:"https://umi-intelligence.oss-cn-shenzhen.aliyuncs.com/xcx/com/message_center/Rectangle 34625122-24.png",
          title:"抖音爆款文案",
          desc:"抖音爆款文案，帮助你打造多款爆款文案。"
        },
        {
          img:"https://umi-intelligence.oss-cn-shenzhen.aliyuncs.com/xcx/com/message_center/Rectangle 34625122-25.png",
          title:"中英文助手",
          desc:"我是一名翻译助理！当你输入中文时，我会给你翻译成英文，当你输入英文时，我会给你翻译成中文。"
        },
        {
          img:"https://umi-intelligence.oss-cn-shenzhen.aliyuncs.com/xcx/com/message_center/Rectangle 34625122-26.png",
          title:"高情商回复",
          desc:"聊天时不知道怎么回复，我来帮你~"
        },
        {
          img:"https://umi-intelligence.oss-cn-shenzhen.aliyuncs.com/xcx/com/message_center/Rectangle 34625122-27.png",
          title:"汽车报价",
          desc:"专业汽车报价智能体，提供准确报价。"
        },

      ],
      // 分页参数
      pageparm: {
        currentPage: 1,
        pageSize: 10,
        total: 10,
      },
      check:[],
      checkArr:[
        {
          label:"多选1",
          id:1
        },
        {
          label:"多选2",
          id:2
        },
        {
          label:"多选3",
          id:3
        },
        {
          label:"多选4",
          id:4
        },
      ]
    };
  },
  components:{
    PaginationBase
  },
  mounted(){
    let data = this.chatData_1;
    this.pageparm.total = this.chatData_1.length;
    this.chatData = data.slice(0,10);
  },
  methods: {
    callFather(val){
      let data = this.chatData_1;
      if(val.currentPage == 1){
        this.chatData = data.slice(0,10);
      }else if(val.currentPage == 2){
        this.chatData = data.slice(10,20);
      }else if(val.currentPage == 3){
        this.chatData = data.slice(20,28);
      }
    },
    handleTabsClick(val){
      console.log('触发handleTabsClick')
    },
    handleDetail(val){
      this.$router.push(`/enterpriseWEB/knowledge/chatDetail?id=${val.id}`)
    },
    //前往创建
    toCreate(){
      this.$router.push('/enterpriseWEB/createBase')
    }
  },
};
</script>

<style lang="scss" scoped>
.popover {
  border-radius: 4px;
  box-shadow: 0px 5px 20px 0px rgba(51, 51, 51, 0.05);
  > div {
    padding: 8px 0px;
    background: rgb(253,253,253);
    // text-align: center;
  }
  > div:first-child {
    border-bottom: 1px solid #ccc;
  }
  > div:last-child {
    color: #FF0F00;
  }
}
.main {
  width: 100%;
  box-sizing: border-box;
  padding-bottom: 30px;
  nav {
    width: 100%;
    padding: 16px 30px;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    border-bottom: 1px solid #ccc;
    img{
      width: 24px;
      height: auto;
    }
    div{
      font-weight: 400;
      font-size: 14px;
      // margin-left: 8px;
    }
  }
  .title{
    font-weight: 600;
    font-size: 16px;
    color: #000000;
    margin-bottom: 16px;
  }
  .top{
    width: 100%;
    padding: 0px 50px;
    box-sizing: border-box;
    .top-row{
      width: 100%;
      margin-top: 20px;
      .content{
        width: 100%;
        display: flex;
        .content_box{
          width: 300px;
          padding: 24px 20px;
          box-sizing: border-box;
          border: 1px solid #F2F2F2;
          border-radius: 10px 10px 10px 10px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          cursor: pointer;
          position: relative;
          top: 0px;
          box-shadow: 0px 10px 15px 0px rgba(0,0,0,0);
          transition: all .6s;
          margin-right: 20px;
          >div:first-child{
            display: flex;
            align-items: center;
            font-family: PingFang SC, PingFang SC;
            img{
              width: 32px;
              margin-right: 8px;
            }
          }
          >img{
            width: 16px;
            height: 16px;
            opacity: 0;
            transition: all .6s;
          }
        }
        .content_box:hover{
          box-shadow: 0px 10px 15px 0px rgba(0,0,0,0.04);
          top: -10px;
          >img{      
            width: 16px;
            height: 16px;
            opacity: 1;
          }
        }
      }
    }
    
  }
  .container{
    width: 100%;
    padding: 0px 50px;
    box-sizing: border-box;
    .container-top{
      margin-top: 20px;
      >div:last-child{
        width: 320px;
        margin-bottom: 10px;
      }
    }
    .container-content{
      width: 100%;
      .container_c_father{
        width: 100%;
        display: flex;
        justify-content: flex-start;
        gap: 20px;
        flex-wrap: wrap;
        .container-box{
          width: calc(25% - 16px);
          padding: 20px;
          box-sizing: border-box;
          border-radius: 10px 10px 10px 10px;
          border: 1px solid #E6E6E6;
          // margin-bottom: 20px;
          .container_b_top{
            position: relative;
            margin-bottom: 10px;
            .circular_icon{
              width: 20px;
              height: 20px;
              cursor: pointer;
            }
            
            .container_bTop_right{
              opacity: 0;
              position: absolute;
              top: 0px;
              right: 0px;
            }
            .container_bTop_left{
              display: flex;
              align-items: center;
              img{
                width: 48px;
                height: 48px;
                border-radius: 8px;
                margin-right: 10px;
              }
              div{
                font-weight: 500;
                font-size: 16px;
              }
            }
          }
          .container_b_content{
            font-weight: 400;
            font-size: 14px;
            color: #666666;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
          }
        }
        .container-box:hover .container_bTop_right{
          opacity: 1;
        }
      }
    }
  }
}
</style>
