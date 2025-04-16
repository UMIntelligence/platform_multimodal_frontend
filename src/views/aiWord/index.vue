<template>
  <div class="main">
    <!-- 头部 -->
    <div class="header">
      <el-tooltip class="item" effect="dark" content="上传记录" placement="bottom">
        <img @click="handlePlugIn" src="https://umi-intelligence.oss-cn-shenzhen.aliyuncs.com/xcx/com/message_center/Group_427321578@2x.png" alt="">
      </el-tooltip>
    </div>
    <div class="container">
      <!-- 导航栏 -->
      <div class="nav">
        <div class="title">AI文档理解</div>
        <div class="navList">
          <div class="nav-item" @click="dialogVisible = true,createType = 1">
            <div class="nav-text">
              <div class="nav-title">文档阅读</div>
              <div class="nav-desc">
                <div>上传各类文档</div>
                <div>分析文档中的关键内容信息</div>
              </div>
            </div>
            <img src="https://umi-intelligence.oss-cn-shenzhen.aliyuncs.com/xcx/com/message_center/Group_427321873@2x.png" class="nav-icon" alt="">
          </div>
          <div class="nav-item" @click="dialogVisible = true,createType = 1">
            <div class="nav-text">
              <div class="nav-title">报告阅读</div>
              <div class="nav-desc">
                <div>上传行业报告</div>
                <div>提炼出报告中最有价值的内容</div>
              </div>
            </div>
            <img src="https://umi-intelligence.oss-cn-shenzhen.aliyuncs.com/xcx/com/message_center/Group_427321873@2x (1).png" class="nav-icon" alt="">
          </div>
          <div class="nav-item" @click="dialogVisible = true,createType = 2">
            <div class="nav-text">
              <div class="nav-title">网页阅读</div>
              <div class="nav-desc">
                <div>添加网页链接</div>
                <div>总结网页内容概述和主要观点</div>
              </div>
            </div>
            <img src="https://umi-intelligence.oss-cn-shenzhen.aliyuncs.com/xcx/com/message_center/Group_427321874@2x.png" class="nav-icon" alt="">
          </div>
        </div>
      </div>
      <!-- 查找记录 -->
      <div class="history">
        <div class="title">我的记录</div>
        <el-input v-model="searchValue" @blur="init" placeholder="搜索" prefix-icon="el-icon-search"></el-input>
        <!-- 文档记录 -->
        <div class="history-list">
          <div class="history-box" v-for="(item,index) in historyList" :key="index" @click.stop="handleToAnalysis(item)">
            <!-- 头部 -->
            <div class="top">
              <div class="top-title">{{item.title}}</div>
              <!-- 收藏图标 -->
               <!-- 未收藏图标 -->
              <img v-if="item.is_collect == 0" @click.stop="handlerChangeCollect(1,item)" class="collect-icon" src="https://umi-intelligence.oss-cn-shenzhen.aliyuncs.com/xcx/com/message_center/Group_427321221@2x.png" alt="">
              <!-- 已收藏图标 -->
              <img v-else @click.stop="handlerChangeCollect(0,item)" class="collect-icon" src="https://umi-intelligence.oss-cn-shenzhen.aliyuncs.com/xcx/com/message_center/Group_427321221@2x (1).png" alt="">
            </div>
            <!-- 文本 -->
            <div class="center" v-if="false">
              愿景： 致力于让 AI 人工智能更普世化的运用拴人们的生产、
              生活，让生产效率更高，生活更美好! 第一个KT 板，公司介绍： 
              深圳xxxx科技有限公司成立于2018年，是一家专注于AI 
              人工智能应用的公司。公司的愿景是为各行业提供领先的
            </div>
            <!-- 内容是图片 -->
            <img v-else class="center-img" src="https://umi-intelligence.oss-cn-shenzhen.aliyuncs.com/xcx/com/message_center/Group_427321849@2x.png" alt="">
            <div class="bottom" @click.stop>
              <div class="bottom-text">
                <div>文档一篇</div>
                <div>{{item.create_time}}</div>
              </div>
              <el-tooltip
                class="item"
                effect="dark"
                content="更多"
                placement="top-end"
                @click.stop
              >
                <el-popover
                  placement="bottom-start"
                  popper-class="customPopper"
                  trigger="click"
                >
                  <!-- 工具栏 -->
                  <div class="tool-box">
                    <div class="tool-item" @click="handleWordEdit(item)">
                      <img src="https://umi-intelligence.oss-cn-shenzhen.aliyuncs.com/xcx/com/message_center/General__ Edit 2@2x (2).png" />
                      <div>重命名</div>
                    </div>
                    <div class="tool-item">
                      <img src="https://umi-intelligence.oss-cn-shenzhen.aliyuncs.com/xcx/com/message_center/Group_427321576@2x.png" />
                      <div>导出</div>
                    </div>
                    <div class="tool-item" @click="handleWordDel(item)">
                      <img src="https://umi-intelligence.oss-cn-shenzhen.aliyuncs.com/xcx/com/message_center/vuesax_linear_trash@2x.png" />
                      <div style="color: #FF0F00;">删除</div>
                    </div>
                  </div>
                  <!-- 小圆点图标 -->
                  <img slot="reference" class="botton-icon" src="https://umi-intelligence.oss-cn-shenzhen.aliyuncs.com/static/picture/d864fc17-e118-4133-87d2-c7bf02e8b905.png" alt="">
                </el-popover>
              </el-tooltip>
            </div>
          </div>
        </div>
          <!-- 空状态 -->
        <el-empty v-if="!historyList.length" :image-size="180" image="https://umi-intelligence.oss-cn-shenzhen.aliyuncs.com/xcx/com/message_center/Group 427319412@2x.png"></el-empty>
        <PaginationBase style="text-align: end;margin: 0;" v-else v-bind:child-msg="pageparm" @callFather="callFather"></PaginationBase>
      </div>
    </div>
    <!-- 插件右侧弹出层 -->
    <el-drawer
    :visible.sync="plugDrawer"
      direction="rtl"
      :with-header="false"
      :size="440"
    >
      <div class="Drawer">
        <div class="Drawer-title">上传记录</div>
        <div class="Drawer-list">
          <div class="drawer-box" v-for="(item,index) in historyList" :key="index" @click="handleToAnalysis(item)">
            <div class="left-box">
              <div class="card-left">
                <img class="poImg" src="https://umi-intelligence.oss-cn-shenzhen.aliyuncs.com/xcx/com/message_center/Files__ File Document@2x (1).png" alt="">
                <div :class="item.status == 0 || item.status == 3?'word-img left-loading':'word-img'" :style="item == 2?'border: 4px solid #FF1500;':''">
                </div>
              </div>
              <div style="width: calc(100% - 56px - 10px);">
                <div class="word-name">{{item.title}}</div>
                <div class="word-desc">{{ item.status == 0 || item.status == 3?'正在解析...':item.status == 1?'解析成功':'解析失败' }}</div>
              </div>
            </div>
            <div v-if="item.status != 0" class="right-btn" :style="item.status == 2?'color:#FF1500;':''">{{item == 2?'移除':'立即查看'}}</div>
          </div>
          <!-- <el-empty description="暂无数据"></el-empty> -->
        </div>
        <div class="Drawer-bottom">
          <div class="btn" @click="plugDrawer = false">取消</div>
          <div class="btn" @click="plugDrawer = false">确定</div>
        </div>
      </div>
    </el-drawer>
    <!-- 上传文档 -->
    <el-dialog
      :visible.sync="dialogVisible"
      :show-close="false"
      :before-close="() => {textarea = '',dialogVisible = false}"
      width="690px">
      <div class="uploadWord">
        <div class="uploadWord-header">
          <div>{{createType == 1?'文档阅读':'网页阅读'}}</div>
          <i @click="dialogVisible = false" class="el-icon-close"></i>
        </div>
        <div class="uploadWord-body" v-if="createType == 1">
          <!-- tab切换 -->
          <div class="uploadWord-tabs">
            <div :class="dialogTabs == 1?'uploadWord-tabs-item item-on':'uploadWord-tabs-item'" @click="dialogTabs=1">文档阅读</div>
            <div :class="dialogTabs == 2?'uploadWord-tabs-item item-on':'uploadWord-tabs-item'" @click="dialogTabs=2">网页添加</div>
          </div>
          <!-- 文档 -->
          <div class="word" v-if="dialogTabs == 1">
            <!-- 上传 -->
            <el-upload
              class="upload-demo"
              drag
              action="http://127.0.0.1:29090/api/user/oss_upload#"
              :data="blueprintReadingFile"
              :on-success="handleUploadSuccess"
              :on-change="handleUploadChange"
              :headers="headerData"
              >
              <div class="upload-demo-box">
                <img class="img" src="https://umi-intelligence.oss-cn-shenzhen.aliyuncs.com/xcx/com/message_center/Group_427319386@2x (1).png" alt="">
                <div class="upload-text">将文件拖到此处或<span>点击上传</span></div>
                <div class="upload-tips">上传文件支持pdf(不支持扫描件)、docx、txt、md格式的文档，文件大小不能超过10MB</div>
              </div>
            </el-upload>
            <!-- 输入框上传网络路径文件 -->
            <div class="upload-input">
              <el-input v-model="uploadInput" placeholder="输入包含文档的URL，后缀必须包含.pdf。如：xx.com/xx.pdf"></el-input>
              <div class="addBtn">添加</div>
            </div>
            <!-- 注意事项 -->
            <div class="word-tips">
              <div>文档格式：支持 PDF（含扫描件）/ Word / 图片 / HTML / Markdown / EPUB / Mobi </div>
              <div>文档大小：文件最大支持100M，图片最大支持20M </div>
              <div>文档页数：PDF/Word最多支持1000页</div>
            </div>
          </div>
          <!-- 网页添加 -->
          <div class="website" v-else>
            <el-input
              type="textarea"
              :rows="13"
              placeholder="请输入或粘贴网址"
              resize="none"
              v-model="textarea">
            </el-input>
            <div class="website-bottom">
              <div class="text">一次支持添加1个网址，请确保添加的网址符合合规要求</div>
              <div class="btn-box">
                <div class="btn" @click="dialogVisible = false">取消</div>
                <div class="btn" @click="createWebsite">确定</div>
              </div>
            </div>
          </div>
        </div>
        <div class="uploadWord-body" v-else>
          <!-- 网页添加 -->
          <div class="website">
            <el-input
              type="textarea"
              :rows="13"
              placeholder="请输入或粘贴网址"
              resize="none"
              v-model="textarea">
            </el-input>
            <div class="website-bottom">
              <div class="text">一次支持添加1个网址，请确保添加的网址符合合规要求</div>
              <div class="btn-box">
                <div class="btn" @click="dialogVisible = false">取消</div>
                <div class="btn" @click="createWebsite">确定</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getAnalysisList,getAnalysisWord,createAnalysisWord,DeleteAnalysisList,EditAnalysisList } from "@/api/analysis";
import PaginationBase from "@/components/PaginationBase";
export default {
  data(){
    return{
      searchValue:"",
      plugDrawer:false,
      historyList:[], //记录列表
      // 分页参数
      pageparm: {
        currentPage: 1,
        pageSize: 7,
        total: 10,
      },
      dialogVisible:false,
      dialogTabs:1, //tab切换 1：文档 2：网址
      createType:1, //上传类型 1：文档 2：网址
      blueprintReadingFile:{
        image: null,
        image_name: null,
        oss_dir: "static",
        cate: "AI_chat-picture",
      },
      uploadInput:"", //输入框上传网络路径文件
      textarea:"",
      timer:0,
      headerData: {}
    }
  },
  components:{
    PaginationBase
  },
  mounted(){
    this.init()
    let userInfo = JSON.parse(localStorage.getItem("userInfo"));
    this.headerData.authorization = userInfo.token
    this.headerData.role = userInfo.role
  },  
  methods:{
    init(){
      let requestData = `title=${this.searchValue}&page_size=${this.pageparm.pageSize}&page=${this.pageparm.currentPage}`
      getAnalysisList(requestData).then(res => {
        if(res.code == 20000){
          this.historyList = res.data.data;
          this.pageparm.total = res.data.total;
        }
      })
    },
    // 分页事件
    callFather({currentPage,pageSize}){
      this.pageparm.currentPage = currentPage;
      this.pageparm.pageSize = pageSize;
      this.init()
    },
    //文档上传前
    beforeUpload(file){
      let typeArray = ['pdf','docx','txt','md'];  //文件类型数组
      console.log(file.type,'文件类型')
      const isType = typeArray.includes(file.type);
      if (!isType) {
        this.$message.error('上传的文件类型仅支持pdf，docx，txt，md');
      }
      return isType;
    },
    //文档上传
    handleUploadChange(file){
      this.blueprintReadingFile.image = file.raw;
      this.blueprintReadingFile.image_name = file.name;
    },
    //上传成功
    handleUploadSuccess(response,file){
      this.createWord(response.data.new_url,file.name);
    },
    //创建解析任务
    createWord(file_url,file_name){
      let requestData = {
        file_url,
        file_name,
      }
      createAnalysisWord(requestData).then(res => {
        if(res.code == 20000){
          this.$message.success('上传成功，文档正在解析中...');
          this.dialogVisible = false;
          this.init()
          this.realTimeQuery(`task_id=${res.data.task_id}`);
          setTimeout(() => {
            this.plugDrawer = true;
          },1000)
        }else{
          this.$message.error(res.msg);
        }
      })
    }, 
    // 实时查询
    realTimeQuery(task_id){
      let queryId = task_id;  //查询ID
      getAnalysisWord(queryId).then(res => {
        if(res.code == 20000 && res.data.status == 1){
          this.$message.success('文档解析成功');
          this.init()
          this.timer = 0;
        }else if(res.code == 20000 && res.data.status != 1 && this.timer <= 900000){  
          setTimeout(() => {
            this.timer = this.timer + 10000;
            this.realTimeQuery(queryId);
          },10000)
        }else if(res.code != 20000){  //接口异常
          this.$message.error(res.msg)
        }
      })
    },
    // 编辑
    handleWordEdit({task_id}){
      this.$prompt('', '重命名', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          inputPattern: /^.+$/,
          inputErrorMessage: '请输入最新的文档名称！'
        }).then(({ value }) => {
          let requestData = {
            title:value,
            task_id
          }
          EditAnalysisList(requestData).then(res => {
            if(res.code == 20000){
              this.$message.success('修改成功');
              this.init()
            }
          })
        }).catch(() => {});
    },
    //删除
    handleWordDel({task_id}){
      this.$confirm('删除后将无法恢复和继续使用，确认删除吗?', '删除', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          DeleteAnalysisList(`task_id=${task_id}`).then(res => {
            if(res.code == 20000){
              this.$message({
              type: 'success',
              message: '删除成功!'
            });
              this.init()
            }
            
          })
        }).catch(() => {    
        });
    },
    //点击插件
    handlePlugIn(){
      this.plugDrawer = true;
    },
    // 跳转文档解析详情页面
    handleToAnalysis(item){
      if(item.status == 0 || item.status == 3){
        this.$message.warning('文档正在解析中，请稍后重试...');
        this.plugDrawer = true;
        //点击文档，如果是解析中的状态，创建一个定时解析任务
        console.log(this.timer,'this.timer')
        if(this.timer == 0){
          console.log('创建解析任务')
          this.realTimeQuery(`task_id=${item.task_id}`)
        }
        return
      }else if(item.status == 2){
        this.$message.error('文档解析失败')
        this.plugDrawer = true;
        return
      }
      let type = 1;
      if(item.origin_path.includes('https')){
        type = 0;
        sessionStorage.setItem('analysisWebsite',item.origin_path)
      }
      this.$router.push(`/aiWord/analysis?task_id=${item.task_id}&title=${JSON.stringify(item.title)}&type=${type}`)
    },
    //改变收藏状态
    handlerChangeCollect(is_collect,{task_id}){
      let requestData = {
        task_id,
        is_collect,
        title:''
      }
      EditAnalysisList(requestData).then(res => {
        if(res.code == 20000){
          if(is_collect){
            this.$message.success('收藏成功')
          }else{
            this.$message.success('已取消收藏')
          }
          this.init()
        }else{
          this.$message.error(res.msg)
        }
      })
    },
    //添加网址
    createWebsite(){
      let str = /(https)[^\s]+/;
      let bool = str.test(this.textarea);
      if(!bool){
        this.$message.error('请检查您输入的网址是否正确，（要求是https开头的地址）')
        return
      }
      this.createWord(this.textarea,'')
    },
  }
}
</script>

<style lang="scss" scoped>
/deep/ .el-dialog__header,/deep/ .el-dialog__body{
  margin: 0 !important;
  padding: 0 !important;
}
/deep/ .el-dialog{
  border-radius: 16px !important;
}
.uploadWord{
  width: 100%;
  .uploadWord-header{
    width: 100%;
    padding: 20px 24px;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-weight: 600;
    font-size: 16px;
    color: #000000;
    box-shadow: inset 0px -1px 0px 0px #F2F2F2;
    .el-icon-close:before{
      font-weight: 600;
      font-size: 18px;
      cursor: pointer;
    }
  }
  .uploadWord-body{
    width: 100%;
    padding: 20px 26px;
    box-sizing: border-box;
    .uploadWord-tabs{
      width: 100%;
      display: flex;
      gap: 30px;
      align-items: center;
      .uploadWord-tabs-item{
        font-weight: bold;
        font-size: 14px;
        color: #838999;
        border-bottom: 2px solid transparent;
        padding-bottom: 9px;
        cursor: pointer;
      }
      .uploadWord-tabs-item.item-on{
        color: #003FFF;
        border-bottom: 2px solid #003FFF !important;
      }
    }
    .word{
      display: flex;
      flex-direction: column;
      gap: 20px;
      .upload-demo{
        margin-top: 20px !important;
        /deep/ .el-upload{
          width: 100% !important;
        }
        /deep/ .el-upload-dragger{
          width: 100% !important;
          background: #F7F9FF !important;
          border: 2px dashed #DADDE6 !important;
          height: 186px !important;
          position: relative !important;
        }
        .upload-demo-box{
          width: 100%;
          display: flex;
          flex-direction: column;
          justify-content: center;
          text-align: center;
          gap: 10px;
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%,-50%);
          .img{
            width: 64px;
            height: 64px;
            margin: auto;
          }
          .upload-text{
            font-weight: bold;
            font-size: 16px;
            color: #000000;
            span{
              color: #003FFF;
            }
          }
          .upload-tips{
            font-weight: 500;
            font-size: 14px;
            color: #666666;
          }
        }
      }
      .upload-input{
        width: 100%;
        display: flex;
        justify-content: space-between;
        gap: 16px;
        align-items: center;
        .addBtn{
          width: 88px;
          height: 40px;
          line-height: 40px;
          text-align: center;
          border-radius: 10px 10px 10px 10px;
          background: #003FFF;
          font-weight: bold;
          font-size: 14px;
          cursor: pointer;
          color: #fff;
        }
      }
      .word-tips{
        font-weight: 400;
        font-size: 14px;
        color: #666666;
        line-height: 22px;
        text-align: left;
        margin-bottom: 20px;
      }
    }
    .website{
      width: 100%;
      padding-top: 20px;
      box-sizing: border-box;
      /deep/ .el-textarea__inner{
        background: #F2F3F5 !important;
      }
      .website-bottom{
        width: 100%;
        margin-top: 29px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        .text{
          font-weight: 400;
          font-size: 14px;
          color: #666666;
        }
        .btn-box{
          display: flex;
          align-items: center;
          gap: 8px;
          .btn{
            width: 88px;
            height: 32px;
            line-height: 32px;
            text-align: center;
            cursor: pointer;
            font-weight: bold;
            font-size: 14px;
            color: #000000;
            border-radius: 8px 8px 8px 8px;
            border: 1px solid #E6E6E6;
          }
          .btn:last-child{
            background: #003FFF;
            color: #fff;
          }
        }
      }
    }
  }
}
.Drawer {
  width: 100%;
  height: 100%;
  position: relative;
  .Drawer-title {
    padding: 17px 24px;
    box-sizing: border-box;
    box-shadow: inset 0px -1px 0px 0px #f2f2f2;
    font-weight: 600;
    font-size: 20px;
    color: #000000;
  }
  .Drawer-list {
    width: 100%;
    height: calc(100% - 60px - 32px - 24px);
    overflow-y: auto;
    box-sizing: border-box;
    padding: 24px;
    .drawer-box{
      margin-bottom: 16px;
      background: #F6F6F6;
      border-radius: 16px 16px 16px 16px;
      padding: 18px 22px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      .left-box{
        width: calc(100% - 82px - 20px);
        display: flex;
        align-items: center;
        gap: 10px;
        .card-left{
          width: 56px;
          height: 56px;
          position: relative;
          .poImg{
            width: 20px;
            height: 20px;
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate(-50%,-50%);
          }
        }
        .word-img{
          width: 100%;
          height: 100%;
          border-radius: 50%;
          border: 4px solid #003FFF;
          box-sizing: border-box;
        }
        .left-loading{
          border: 4px solid #003FFF !important;
          border-top: 4px solid #E5E5E5 !important;
          animation: left-loading 1s linear infinite;

        }
        @keyframes left-loading {
          0% {
                transform: rotate(0deg);
            }

            100% {
                /* 顺时针旋转360度 */
                transform: rotate(360deg);
            }
        }
        .word-name{
          font-weight: bold;
          font-size: 14px;
          color: #000000;
          margin-bottom: 8px;
          -webkit-line-clamp: 2;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .word-desc{
          font-weight: 500;
          font-size: 12px;
          color: #666666;
        }
      }
      .right-btn{
        width: 80px;
        height: 32px;
        line-height: 32px;
        text-align: center;
        background: #FFFFFF;
        border-radius: 10px 10px 10px 10px;
        border: 1px solid #E6E6E6;
        font-weight: 500;
        font-size: 14px;
        color: #003FFF;
        cursor: pointer;
      }
    }
  }
  .Drawer-bottom {
    width: 100%;
    display: flex;
    justify-content: flex-end;
    gap: 8px;
    position: absolute;
    bottom: 24px;
    right: 24px;
    .btn {
      width: 88px;
      line-height: 30px;
      text-align: center;
      background: #ffffff;
      border-radius: 10px 10px 10px 10px;
      border: 1px solid #e6e6e6;
      cursor: pointer;
      font-weight: bold;
      font-size: 14px;
    }
    .btn:last-child {
      background: #003fff;
      color: #fff;
    }
  }
}
.tool-box{
  width: 100%;
  padding: 10px 8px;
  box-sizing: border-box;
  .tool-item{
    padding: 12px 10px;
    box-sizing: border-box;
    display: flex;
    gap: 5px;
    font-weight: 400;
    font-size: 14px;
    border-radius: 10px 10px 10px 10px;
    cursor: pointer;
    line-height: 16px;
    color: #000000;
    img{
      width: 16px;
      height: 16px;
    }
  }
  .tool-item:hover{
    background: #F6F6F6;
  }
}
  .main{
    width: 100%;
    height: calc(100vh - 58px);
    overflow: auto;
    background: #F6F8FA;
    position: relative;
    border: 1px solid rgba(0,0,0,0.05);
    box-sizing: border-box;
    .header{
      display: flex;
      justify-content: flex-end;
      width: 100%;
      padding: 16px 40px;
      margin: 0px;
      box-sizing: border-box;
      background: #fff;
      box-shadow: inset 0px -1px 0px 0px #EBEBEB;
      img{
        width: 32px;
        height: 32px;
        cursor: pointer;
      }
    }
    .container{
      width: 100%;
      height: calc(100% - 64px);
      overflow-y: auto;
      padding: 40px;
      box-sizing: border-box;
      margin: 0px;
      .nav{
        width: 100%;
        margin-bottom: 40px;
        .title{
          font-weight: 600;
          font-size: 16px;
          color: #000000;
          margin-bottom: 20px;
        }
        .navList{
          width: 100%;
          display: flex;
          gap: 20px;
          .nav-item{
            width: 380px;
            border-radius: 10px 10px 10px 10px;
            border: 1px solid #F1F1F1;
            padding: 22px 24px;
            box-sizing: border-box;
            position: relative;
            cursor: pointer;
            .nav-title{
              font-weight: bold;
              font-size: 18px;
              color: #000000;
              margin-bottom: 10px;
            }
            .nav-desc{
              font-weight: 400;
              font-size: 14px;
              color: #797980;
            }
            .nav-icon{
              position: absolute;
              right: 24px;
              top: 16px;
              width: 64px;
              height: 64px;
            }
          }
          .nav-item:nth-child(1){
            background: linear-gradient( 96deg, #FFFBF2 0%, #FFFEFB 45%, #FFFEFC 100%);
          }
          .nav-item:nth-child(2){
            background: linear-gradient( 96deg, #F6FFF2 0%, #FFFEFB 45%, #FDFFFC 100%);
          }
          .nav-item:nth-child(3){
            background: linear-gradient( 96deg, #EFF5FF 0%, #FFFEFB 52%, #FCFDFF 100%);
          }
        }
      }
      .history{
        width: 100%;
        display: flex;
        flex-direction: column;
        gap: 20px;
        .title{
          font-weight: 600; 
          font-size: 16px;
        }
        .el-input{
          width: 250px !important;
        }
        .el-empty{
          margin: auto;
        }
        .history-list{
          width: 100%;
          display: flex;
          gap: 20px;
          flex-wrap: wrap;
          .history-box{
            width: calc((100% / 6) - 20px);
            min-width: 250px;
            background: #FFFFFF;
            border-radius: 10px 10px 10px 10px;
            border: 1px solid #EAEAEB;
            padding: 20px 16px;
            box-sizing: border-box;
            position: relative;
            top: 0px;
            transition: all .6s;
            cursor: pointer;
            .top{
              width: 100%;
              height: 38px;
              display: flex;
              justify-content: space-between;
              margin-bottom: 16px;
              .top-title{
                width: calc(100% - 24px);
                font-weight: bold;
                font-size: 14px;
                -webkit-line-clamp: 2;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                overflow: hidden;
                text-overflow: ellipsis;
              }
              .collect-icon{
                width: 24px;
                height: 24px;
                opacity: 0;
                transition: all .6s;
              }
            }
            .center{
              width: 100%;
              height: 150px;
              overflow: hidden;
              padding: 10px;
              box-sizing: border-box;
              background: #FCFCFC;
              border: 10px;
              font-weight: 400;
              font-size: 12px;
              color: #525566;
            }
            .center-img{
              width: auto;
              height: 150px;
              border: 10px;
            }
            .bottom{
              width: 100%;
              margin-top: 14px;
              display: flex;
              justify-content: space-between;
              .bottom-text{
                display: flex;
                gap: 8px;
                font-weight: bold;
                font-size: 12px;
                color: #8F9197;
                line-height: 20px;
              }
              .botton-icon{
                width: 20px;
                height: 20px;
                opacity: 0;
                transition: all .6s;
              }
            }
          }
          .history-box:hover{
            top: -10px;
            box-shadow: 0px 10px 15px 0px rgba(0,0,0,0.05);
            .collect-icon,.botton-icon{
              opacity: 1;
            }
          }
        }
      }
    }
  }
</style>