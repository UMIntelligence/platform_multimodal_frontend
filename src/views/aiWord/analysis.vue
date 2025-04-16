<template>
  <div class="main">
    <div class="header">
      <div class="left">
        <img
          @click="$router.go(-1)"
          src="https://umi-intelligence.oss-cn-shenzhen.aliyuncs.com/xcx/com/message_center/Group_427321809@2x.png"
          alt=""
        />
        <div class="line"></div>
        <div>{{analysisTitle}}</div>
      </div>
      <el-dropdown trigger="click" @command="handlerExport">
       <div class="right" @click="handlerExport">
          <img
            src="https://umi-intelligence.oss-cn-shenzhen.aliyuncs.com/xcx/com/message_center/Group_427321732@2x.png"
            alt=""
          />
          <div>导出</div>
        </div>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="1">.docx</el-dropdown-item>
          <!-- <el-dropdown-item command="2">.xmind</el-dropdown-item> -->
          <el-dropdown-item command="3">.png</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <div class="container">
      <div class="left" v-if="analysisType == 1">
        <!-- 文档展示 -->
        <div class="word">
          <!-- 左侧预览 -->
          <div class="word-left" :style="leftShow?'width: 160px;':'0px'" v-if="leftShow">
              <div class="left-item" :style="scrollNum == index?'border-color:#003FFF;':''" v-for="(item,index) in wordPages" :key="index" @click="handleToPages(index)">
                <img :src="item.imageUrl" alt="">
                <div class="num">{{index + 1}}</div>
              </div>
          </div>
          <!-- 文档预览 -->
          <div class="word-analysis" id="word-analysis" :style="leftShow?'':'width: 100%;'">
            <div class="image-box">
              <img :src="item.imageUrl" v-for="(item,index) in wordPages" :key="index" :ref="'pageRefs'+index" :style="{width:fileWidth+'%'}" alt="">
            </div>
          </div>
        </div>
        <!-- 文档底部 -->
        <div class="left-footer">
          <!-- 展开/收起 -->
          <img
          @click="handleLeftShow"
            src="https://umi-intelligence.oss-cn-shenzhen.aliyuncs.com/xcx/com/message_center/Group_427321883@2x.png"
            alt=""
          />
          <!-- 分页 -->
          <div class="pagination">
            <i class="el-icon-arrow-left"></i>
            <div class="pagination-box">
              <el-input v-model="pageNumber"></el-input>
              <div>/</div>
              <div>{{pageTotal}}</div>
            </div>
            <i class="el-icon-arrow-right"></i>
          </div>
          <!-- 文本大小 -->
          <div class="wordSize">
            <img @click="handleWordSize(false)" src="https://umi-intelligence.oss-cn-shenzhen.aliyuncs.com/xcx/com/message_center/Group_427321529@2x.png" alt="">
            <div>{{fileWidth}}%</div>
            <img @click="handleWordSize(true)" src="https://umi-intelligence.oss-cn-shenzhen.aliyuncs.com/xcx/com/message_center/Group_427321483@2x (2).png" alt="">
          </div>
        </div>
      </div>
      <div class="left" v-else>
        <div class="website">
          <div class="text">原文链接：<a :href="analysisWebsite" target="_blank">{{analysisWebsite}}</a></div>
        </div>
      </div>
      <!-- 文档解析 -->
      <div class="analysis">
        <div class="analysis-header">
          <el-tabs v-model="activeName" @tab-click="handleTabsClick">
            <el-tab-pane label="导读" name="first"></el-tab-pane>
            <el-tab-pane label="思维导图" name="second"></el-tab-pane>
          </el-tabs>
        </div>
        <!-- 思维导图 -->
        <div v-if="activeName == 'second'" class="analysis-container" style="justify-content: center;align-items: center;">
          <kityminder ref="kityminder"></kityminder>
          <div class="kityminder-tool">
            <el-tooltip effect="dark" content="自适应视图" placement="top">
              <img @click="handlerSelf()" src="https://umi-intelligence.oss-cn-shenzhen.aliyuncs.com/xcx/com/message_center/Group_427321483@2x (3).png" alt="">
            </el-tooltip>
            <div class="line"></div>
            <div class="toolSize">
              <img @click="handleMinderSize(false)" src="https://umi-intelligence.oss-cn-shenzhen.aliyuncs.com/xcx/com/message_center/Group_427321529@2x.png" alt="">
              <div>{{scaleNum}}%</div>
              <img @click="handleMinderSize(true)" src="https://umi-intelligence.oss-cn-shenzhen.aliyuncs.com/xcx/com/message_center/Group_427321483@2x (2).png" alt="">
            </div>
            <div class="line"></div>
            <el-tooltip effect="dark" content="全屏查看" placement="top">
              <img @click="handleFull()" src="https://umi-intelligence.oss-cn-shenzhen.aliyuncs.com/xcx/com/message_center/Group_427321483@2x (4).png" alt="">
            </el-tooltip>
          </div>
        </div>
        <!-- 解析内容 -->
        <div v-else class="analysis-container">
          <div id="analysis-word">
          <!-- 标题 -->
           <div class="analysis-title">{{analysisTitle}}</div>
           <!-- 概述 -->
           <div class="overview">
              <div class="title">
                <span>全文概述</span>
                <img @click="copyText(analysisDesc)" src="../../assets/images/images_ljh/Group_427320305@2x(1).png" alt="">
              </div>
              <div class="content">
                <!-- 骨架屏 -->
                <el-skeleton :rows="6" animated v-if="!analysisDesc"/>
                <template v-else>
                  {{analysisDesc}}
                </template>
              </div>
           </div>
           <!-- 关键要点 -->
          <div class="keyPoint">
            <div class="title">关键要点</div>
            <div class="content">
              <!-- 骨架屏 -->
              <el-skeleton :rows="6" animated v-if="!analysisbestkey.length"/>
              <template>
                <div v-for="(item,index) in analysisbestkey" :key="index">
                  {{index + 1}}. {{ item }}。
                </div>
              </template>
            </div>
          </div>
          <!-- 文档速读 -->
          <div class="speedReading">
            <div class="title">文档速读</div>
            <div class="speedReading-card" v-for="(item,index) in analysisPageDesc" :key="index">
              <div class="speedReading-item-pageNum">第{{index + 1}}页</div>
              <div class="speedReading-card-divider">
                <div class="speedReading-card-circle"></div>
                <div v-if="index != analysisPageDesc.length - 1" class="speedReading-card-line"></div>
              </div>
              <div class="speedReading-card-content">
                <div class="title">
                  <span>{{item.title}}</span>
                  <img class="copyImg" @click="copyText(item.text)" src="../../assets/images/images_ljh/Group_427320305@2x(1).png" alt="">
                </div>
                <div class="text">
                  {{ item.text }}
                </div>
              </div>
            </div>
          </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 全屏脑图 -->
    <el-dialog
      :visible.sync="dialogVisible"
      :show-close="false"
      :fullscreen="true"
      >
      <div id="kityminder-box"></div>
      <!-- <kityminder ref="kityminder"></kityminder> -->
      <img @click="handleClose" class="close-img" src="https://umi-intelligence.oss-cn-shenzhen.aliyuncs.com/xcx/com/message_center/Group_427320452@2x (1).png" alt="">
      <div class="kityminder-tool">
        <el-tooltip effect="dark" content="自适应视图" placement="top">
          <img @click="handlerSelf()" src="https://umi-intelligence.oss-cn-shenzhen.aliyuncs.com/xcx/com/message_center/Group_427321483@2x (3).png" alt="">
        </el-tooltip>
        <div class="line"></div>
        <div class="toolSize">
          <img @click="handleMinderSize(false)" src="https://umi-intelligence.oss-cn-shenzhen.aliyuncs.com/xcx/com/message_center/Group_427321529@2x.png" alt="">
          <div>{{scaleNum}}%</div>
          <img @click="handleMinderSize(true)" src="https://umi-intelligence.oss-cn-shenzhen.aliyuncs.com/xcx/com/message_center/Group_427321483@2x (2).png" alt="">
        </div>
        <div class="line"></div>
        <el-tooltip effect="dark" content="关闭全屏" placement="top">
          <img @click="dialogVisible = false" src="https://umi-intelligence.oss-cn-shenzhen.aliyuncs.com/xcx/com/message_center/Group_427321483@2x (4).png" alt="">
        </el-tooltip>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { createAnalysisWord,getAnalysisWord } from "@/api/analysis";
import kityminder from "@/components/kityminder";
import { exportWord } from '@/utils/exportWord'
import html2canvas from "html2canvas";
export default {
  data() {
    return {
      fileUrl:"https://umi-intelligence.oss-cn-shenzhen.aliyuncs.com/static/mentor_image-list/96ca9e2b-31ba-4feb-947a-10a6fed3a628.docx", //文档路径
      fileType: null, //文件类型
      loading: true, //加载文件
      pageNumber: "1", //页码
      activeName:"first",
      leftShow:false,
      analysisData:{},  //解析数据
      fileWidth:100,  //文件大小%
      scrollNum:0,  //楼层监听
      offettopList:[],//存储每个节点与顶部的距离
      wordPages:[], //文档页数
      pageTotal:0,  //文档总页数
      analysisDesc:null,  //全文概括
      analysisbestkey:[],  //关键要点
      analysisPageDesc:[],  //文档速读
      dialogVisible:false,  //全屏
      scaleNum:100,
      analysisTitle:"解析文档标题",  //解析文档标题
      analysisType:1, //文档类型 1：文档 0：网址
      analysisWebsite:''
    };
  },
  components: {kityminder},
  async mounted() {
    this.analysisTitle = JSON.parse(this.$route.query.title)
    this.analysisType = this.$route.query.type;
    if(this.analysisType == 0){
      this.analysisWebsite = sessionStorage.getItem('analysisWebsite')
    }
    let task_id = this.$route.query.task_id
    this.fileType = this.fileUrl.split('.').pop();
    let requestData = `task_id=${task_id}`
    getAnalysisWord(requestData).then((res) => {
     
      if(res.code == 20000){
        let JsonUrl = 'https://umi-intelligence.oss-cn-shenzhen.aliyuncs.com/' + res.data.parse_json_path;
        this.$axios.get(JsonUrl).then(fileData => {
          if(fileData.status != 200){
            this.$message.error('文档解析失败')
          }else{
            this.analysisData = fileData.data;
            this.wordPages = fileData.data.docInfo.pages;   //文档页数据
            this.pageTotal = fileData.data.docInfo.pageCountEstimate; //总页数
            this.analysisPageDesc = fileData.data.parse_desc.pagedesc;  //速读
            this.analysisbestkey = fileData.data.parse_desc.bestkey;  //关键要点
            this.analysisDesc = fileData.data.parse_desc.desc;  //全文概括
            this.$nextTick(() => {
              let arr = [];  
              for (let index = 0; index < this.analysisData.docInfo.pageCountEstimate; index++) {
                // console.log(this.$refs['pageRefs'+index][0].offsetTop)
                arr.push(this.$refs['pageRefs'+index][0].offsetTop)
              }
              this.offettopList = arr;
              this.FloorMonitoring(); //楼层监听
            })
          }
        })
      }
    });
  },
  methods: {
    // tab改变
    handleTabsClick(tab){
      if(this.activeName == 'second'){
        this.$nextTick(() => {
          let minderData = {
            "root":{
              "data":{
                "text":JSON.parse(this.$route.query.title),
              },
              "children":this.handleMinder(this.analysisPageDesc)
            },
            "template": "default"
          };
          console.log(minderData,'数据')
          this.$refs.kityminder.minderData = minderData;
          this.$refs.kityminder.init()
        })
      }
    },
    //递归遍历处理脑图数据
    handleMinder(data){
      return data.map(page => ({
        data: {
          text: page.title
        },
        children: page.children.length > 0? this.handleMinder(page.children) : []
      }));
    },
    //复制文本
    copyText(text){
      var input = document.createElement("textarea"); // 创建input对象
      input.value = text; // 设置复制内容
      document.body.appendChild(input); // 添加临时实例
      input.select(); // 选择实例内容
      document.execCommand("Copy"); // 执行复制
      document.body.removeChild(input); // 删除临时实例 
      this.$message.success("复制成功！");
    },
    //思维导图自适应视图
    handlerSelf(){
      this.scaleNum = 100;
      this.$refs.kityminder.init()
    },
    //思维导图全屏查看
    handleFull(){
      this.dialogVisible = true;
      this.$nextTick(() => {
          // console.log()
            console.log(this.$refs.kityminder.$el,'节点')
            let father = document.getElementById('kityminder-box');
            let dom = this.$refs.kityminder.$el.cloneNode(true)
            father.appendChild(dom);
            document.getElementsByClassName('el-dialog__body')[0].firstChild.style.width = '100%'
            document.getElementsByClassName('el-dialog__body')[0].firstChild.style.height = '100%'
        })
    },  
    handleClose(){
      this.dialogVisible=false;
      this.handleTabsClick()
    },
    // 思维导图比例大小
    handleMinderSize(bool){
      if(bool){
        if(this.scaleNum < 150){
          this.scaleNum = this.scaleNum + 25;
        }
      }else{
        if(this.scaleNum > 25){
          this.scaleNum = this.scaleNum - 25;
        }
      }
      this.$refs.kityminder.scaleNum = this.scaleNum;
    },
    //展开收起 
    handleLeftShow(){
      this.leftShow = !this.leftShow;
      this.$nextTick(() => {
        setTimeout(() => {
          let arr = [];  
          for (let index = 0; index < this.analysisData.docInfo.pageCountEstimate; index++) {
            // console.log(this.$refs['pageRefs'+index][0].offsetTop)
            arr.push(this.$refs['pageRefs'+index][0].offsetTop)
          }
          this.offettopList = arr;
        },200)
      })
      
    },
    //楼层监听
    FloorMonitoring(){
      //楼层监听
      let dom = document.getElementById('word-analysis');
      dom.addEventListener('scroll', (e) => {
        this.scrollNum = this.offettopList.findLastIndex(item => item - e.target.scrollTop - 300 < 5);
        
        this.pageNumber = this.scrollNum + 1
      })
    },
    rendered() {
      console.log("渲染完成");
      this.loading = false;
    },
    // 左侧预览跳转页数
    handleToPages(index){
      let dom = this.$refs['pageRefs'+index];
      dom[0].scrollIntoView({
        block: "center",
        behavior: "smooth",
      });
    },
    //控制文件大小
    handleWordSize(bool){
      if(bool){
        if(this.fileWidth < 100){
          this.fileWidth = this.fileWidth + 25;
        }
      }else{
        if(this.fileWidth > 50){
          this.fileWidth = this.fileWidth - 25;
        }
      }
    },
    handlerExport(command){
      if(this.activeName != 'first' && (command == '1' || command == '3')){
        this.$message.error('抱歉，当前仅支持文档解析部分导出')
        return
      }
      if(command == '1'){ //md
        this.wordExport()
      }else if(command == '2'){ //xmind

      }else if(command == '3'){  //png
        this.imageExport()
      }
    },
    imageExport(){
      html2canvas(document.getElementById('analysis-word'), { useCORS: true, scale: 2, dpi: 300, }).then((canvas) => {
        let dataURL = canvas.toDataURL("image/png");
        // this.imgUrl = dataURL
        var a = document.createElement("a"); // 生成一个a元素
        var event = new MouseEvent("click"); // 创建一个单击事件
        a.download = "无忧秘书智脑.png"; // 设置图片名称
        a.href = dataURL; // 将生成的URL设置为a.href属性
        a.dispatchEvent(event); // 触发a的单击事件
        this.$message.success('导出成功')
      });
      
    },
    wordExport(){
      let contentHtml = document.getElementById('analysis-word').innerHTML;//获取这个div里面的数据
      
      //  html2canvas(document.getElementById('analysis-word'), { useCORS: true, scale: 2, dpi: 300, }).then((canvas) => {
      //    let dataURL = canvas.toDataURL("image/png");
      //    let img = document.createElement('img')
      //     img.src = dataURL;
      //   // ima
        exportWord(contentHtml,'word');
      //  });
    },
    xmindExport(){

    }
  },
};
</script>

<style lang="scss" scoped>
/deep/ .el-dialog__header{
  padding: 0px;
}
/deep/ .el-dialog__body{
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  box-sizing: border-box;
  .close-img{
    position: absolute;
    right: 50px;
    top: 50px;
    cursor: pointer;
    width: 40px;
    height: 40px;
  }
  .kityminder-tool{
          display: flex;
          align-items: center;
          gap: 20px;
          padding: 12px 20px;
          box-sizing: border-box;
          background: #FFFFFF;
          border-radius: 16px 16px 16px 16px;
          border: 1px solid #E6E6E6;
          position: absolute;
          bottom: 30px;
          left: 50%;
          transform: translateX(-50%);
          .line{
            width: 1px;
            height: 30px;
            background: #F2F2F2;
          }
          .toolSize{
            display: flex;
            align-items: center;
            gap: 20px;
            font-weight: bold;
            font-size: 14px;
            color: #000000;
            
          }
          img{
              width: 24px;
              height: 24px;
              cursor: pointer;
          }
        }
}
/deep/ .km-view{
  width: 100%;
  height: 100%;
}
.main {
  background: #f5f5f7;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  box-sizing: border-box;
  .header {
    width: 100%;
    display: flex;
    justify-content: space-between;
    padding: 16px 24px;
    box-sizing: border-box;
    background: #fff;
    box-shadow: inset 0px -1px 0px 0px #ebebeb;
    > div {
      display: flex;
      align-items: center;
    }
    .left {
      gap: 12px;
      font-weight: bold;
      font-size: 16px;
      color: #000000;
      img {
        width: 20px;
        height: 20px;
        cursor: pointer;
      }
      .line {
        height: 20px;
        border-left: 1px solid #e6e6e6;
      }
    }
    .right {
      width: 88px;
      height: 32px;
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 5px;
      font-weight: bold;
      font-size: 14px;
      color: #ffffff;
      background: #003fff;
      border-radius: 10px 10px 10px 10px;
      cursor: pointer;
      img {
        width: 16px;
        height: 16px;
      }
    }
  }
  .container {
    width: 100%;
    height: calc(100% - 64px);
    display: flex;
    overflow: hidden;
    > div {
      width: 50%;
      height: 100%;
      overflow-y: auto;
    }
    .left{
      .word{
        width: 100%;
        height: calc(100% - 52px);
        display: flex;
        overflow: hidden;
        .word-left{
          width: 160px;
          height: 100%;
          overflow-y: auto;
          overflow-x: hidden;
          background: #fff;
          padding: 20px;
          box-sizing: border-box;
          display: flex;
            flex-direction: column;
            gap: 16px;
          .left-item{
            width: 100%;
            height: 168px;
            border-radius: 5px 5px 5px 5px;
            border: 1px solid #E6E6E6;
            position: relative;
            cursor: pointer;
            img{
              width: 100%;
              height: 168px;
              border-radius: 5px 5px 5px 5px;
            }
            .num{
              width: 14px;
              position: absolute;
              top: 5px;
              left: 5px;
              background: #000000;
              border-radius: 5px 5px 5px 5px;
              opacity: 0.5;
              font-weight: 400;
              font-size: 12px;
              color: #FFFFFF;
              text-align: center;
              line-height: 14px;
            }
          }
        }
        .word-analysis{
          width: calc(100% - 160px);
          height: 100%;
          padding: 30px;
          box-sizing: border-box;
          overflow-y: auto;
          overflow-x: hidden;
          .image-box{
            text-align: center;
            display: flex;
            flex-direction: column;
            justify-content: center;
            gap: 20px;
          }
          img{
            width: 100%;
            height: auto;
            box-shadow: 0px 0px 15px 0px rgba(0,0,0,0.03);
            border-radius: 20px 20px 20px 20px;
          }
          /deep/ .docx-wrapper{
            padding: 0px;
            background: rgba(0,0,0,0);
          }
          /deep/ .docx-wrapper >section{
            width: 100% !important;
          }
          /deep/ .docx-wrapper >section.docx{
            box-shadow: 0px 0px 5px rgba(0,0,0,0.1);
          }
        }
      }
      .left-footer{
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 10px 20px;
        box-sizing: border-box;
        background: #fff;
        box-shadow: inset 0px 1px 0px 0px rgba(0,0,0,0.05), 0px -3px 10px 0px rgba(0,0,0,0.03);
        img{
          width: 24px;
          height: 24px;
          cursor: pointer;
        }
        .pagination{
          display: flex;
          align-items: center;
          gap: 16px;
          .pagination-box{
            display: flex;
            align-items: center;
            gap: 10px;
            .el-input{
              width: 32px;
              height: 32px;
            }
            /deep/ .el-input__inner{
              height: 32px !important;
              padding: 0px !important;
              text-align: center;
            }
          }
        }
        .wordSize{
          display: flex;
          align-items: center;
          gap: 15px;
          font-weight: bold;
          font-size: 14px;
          color: #000000;
        }
      }
    }

    .analysis{
      background: #fff;
      .analysis-header{
        width: 100%;
        padding: 20px 30px;
        box-sizing: border-box;
        padding-bottom: 0px;
        /deep/ .el-tabs__item{
          font-weight: bold;
          font-size: 16px;
          color: #838999;
          bottom: 10px;
        }
        /deep/ .el-tabs__item.is-active{
          color: #003FFF;
        }
        /deep/ .el-tabs__nav-wrap::after{
          height: 1px;
        }
        /deep/ .el-tabs__active-bar{
          background: #003FFF;
        }
      }
      #analysis-word{
        padding: 30px;
        padding-top: 10px;
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
        gap: 30px;
        position: relative;
      }
      .analysis-container{
        width: 100%;
        height: calc(100% - 74px);
        
        overflow-y: auto;
        
        .analysis-title{
          font-weight: bold;
          font-size: 20px;
          color: #000000;
        }
        .overview{
          .title{
            display: flex;
            align-items: center;
            justify-content: space-between;
            img{
              width: 24px;
              height: 24px;
              cursor: pointer;
            }
          }
        }
        .title{
          font-weight: bold;
          font-size: 16px;
          color: #000000;
          line-height: 19px;
          margin-bottom: 16px;
        }
        .content{
          font-weight: 400;
          font-size: 14px;
          color: #000000;
          line-height: 24px;
        }
        .speedReading{
          .speedReading-card{
            width: 100%;
            display: flex;
            justify-content: space-between;
            position: relative;
            margin-bottom: 20px;
            .speedReading-item-pageNum{
              width: 48px;
              height: 24px;
              line-height: 24px;
              background: #F2F2F2;
              border-radius: 5px 5px 5px 5px;
              font-weight: bold;
              font-size: 12px;  
              color: #666666;
              text-align: center;
              margin-top: 19px;
              box-sizing: border-box;
            }
            .speedReading-card-divider{
              margin-left: 10px;
              margin-right: 16px;
              position: relative;
              .speedReading-card-circle{
                width: 6px;
                height: 6px;
                border-radius: 50%;
                margin-top: 28px;
                background: #003FFF;
              }
            }
            .speedReading-card-line{
              display: block;
              border-right: 1px dashed #DAE0F2;
              height: 100%;
              position: absolute;
              left: 50%;
              top: 40px;
              transform: translate(-50%);
            }
            .speedReading-card-content{
              flex: 1 1;
              background: #EAEFFF;
              border-radius: 16px 16px 16px 16px;
              border: 1px solid #E6ECFF;
              padding: 20px;
              box-sizing: border-box;
              height: auto;
              .title{
                display: flex;
                align-items: center;
                justify-content: space-between;
                font-weight: bold;
                font-size: 14px;
                color: #000000;
                margin-bottom: 12px;
                .copyImg{
                  width: 24px;
                  height: 24px;
                  cursor: pointer;
                  opacity: 0;
                }
              }
              .text{
                font-weight: 400;
                font-size: 12px;
                color: #000000;
                line-height: 24px;
              }
            }
            .speedReading-card-content:hover{
              .copyImg{
                opacity: 1 !important;
              }
            }
          }
        }
        .kityminder-tool{
          display: flex;
          align-items: center;
          gap: 20px;
          padding: 12px 20px;
          box-sizing: border-box;
          background: #FFFFFF;
          border-radius: 16px 16px 16px 16px;
          border: 1px solid #E6E6E6;
          position: absolute;
          bottom: 30px;
          right: 30px;
          .line{
            width: 1px;
            height: 30px;
            background: #F2F2F2;
          }
          .toolSize{
            display: flex;
            align-items: center;
            gap: 20px;
            font-weight: bold;
            font-size: 14px;
            color: #000000;
            
          }
          img{
              width: 24px;
              height: 24px;
              cursor: pointer;
          }
        }
      }
    }
    .website{
      width: 80%;
      height: 204px;
      padding: 60px 48px;
      box-sizing: border-box;
      box-shadow: rgba(0, 0, 0, 0.1) 0px 0px 10px 0px;
      background: #fff;
      margin: auto;
      margin-top: 60px;
      a{
        color: #1677ff;
        text-decoration: none;
        font-size: 14px;
      }
    }
  }
}
</style>