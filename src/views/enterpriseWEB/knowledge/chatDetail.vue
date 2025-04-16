<template>
  <div class="main">
      <EnterpriseNav :itemArray="navArray"></EnterpriseNav>
      <div class="container">
        <div class="container-search">
          <div>
            <el-input
              placeholder="请输入要查找的智能体"
              prefix-icon="el-icon-search"
              v-model="input2">
            </el-input>
          </div>
          <div>
            <i class="el-icon-plus"></i>
            <div>新建智能体</div>
          </div>
        </div>
        <el-tabs v-if="this.navId == 2" v-model="activeName" @tab-click="handleTabsClick">
          <el-tab-pane label="全部部门" name="first"></el-tab-pane>
          <el-tab-pane label="行政部" name="second"></el-tab-pane>
          <el-tab-pane label="商务部" name="third"></el-tab-pane>
        </el-tabs>
        <div class="container-content">
          <div class="container-c_top">
            <div class="container-top_left">
              <div v-for="item in 8" :key="item" @click="activeIndex = item" :style="activeIndex == item?'border: 1px solid #3363F6;color: #1952FF;':''">全部</div>
            </div>
            <div class="container-top_right">
              <i class="el-icon-arrow-up" color="#3363F6" ></i>
              <span>收起</span>
            </div>
          </div>
          <div class="container_c_father">
          <div class="container-box" v-for="item in 16" :key="item">
            <div class="container_b_top">
              <div class="container_bTop_left">
                <img src="https://umi-intelligence.oss-cn-shenzhen.aliyuncs.com/xcx/com/message_center/Group_427319934@2x.png" alt="">
                <div>高考志愿推荐导师</div>
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
                      <i class="el-icon-delete" style="margin-right: 8px"></i
                      >删除
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
              我是高考志愿推荐导师，熟悉各大高校和专业的招生政策、历年录取情况和就业前景等信息，能我是高考志愿推荐导师，熟悉各大高校和专业的招生政策、历年录取情况和就业前景等信息，能...
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
import EnterpriseNav from "../../../components/enterprise_nav.vue";
export default {
  name:'knowledgeBase_chatDetail',
  data(){
    return {
      input2:"",
      activeName:"first",
      activeIndex:1,
      // 分页参数
      pageparm: {
        currentPage: 1,
        pageSize: 10,
        total: 10,
      },
      navArray:[],
      navId:null,
    }
  },
   mounted(){
    if(!this.$route.query){
      return
    }
    this.navId = this.$route.query.id
    if(this.navId == 1) this.navArray = ['企业'];
    else if(this.navId == 2)this.navArray = ['所属部门'];
    else this.navArray = ['我的智能体'];
  },
  methods:{
    handleTabsClick(val){
      console.log('触发handleTabsClick')
    },
    callFather(val){
      console.log('触发callFather')
    }
  },
  components:{
    PaginationBase,
    EnterpriseNav
  },
}
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
.main{
  width: 100%;
  box-sizing: border-box;
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
      margin: 0px 8px;
    }
  }
  .container{
    width: 100%;
    padding: 30px 50px;
    padding-bottom: 0px;
    box-sizing: border-box;
    .container-search{
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 10px;
      >div:first-child{
        width: 320px;
      }
      >div:last-child{
        width: 140px;
        padding: 9px 0px;
        box-sizing: border-box;
        display: flex;
        justify-content: center;
        align-items: center;
        color: #fff;
        background: #1A52FF;
        border-radius: 8px 8px 8px 8px;
        cursor: pointer;
        >div:last-child{
          margin-left: 5px;
          font-weight: bold;
          font-size: 14px;
        }
      }
    }
    .container-content{
      width: 100%;
      margin-top: 8px;
      .container-c_top{
        display: flex;
        justify-content: space-between;
        position: relative;
        .container-top_left{
          width: calc(100% - 57px);
          display: flex;
          flex-wrap: wrap;
          >div{
            width: 80px;
            padding: 5px 0px;
            box-sizing: border-box;
            border: 1px solid rgba(0,0,0,0);
            border-radius: 8px 8px 8px 8px;
            text-align: center;
            margin-right: 10px;
            margin-bottom: 15px;
            font-weight: bold;
            font-size: 14px;
            // color: #1952FF;
            cursor: pointer;
          }
        }
        .container-top_right{
          position: absolute;
          top: 0px;
          right: 0px;
          font-weight: bold;
          font-size: 14px;
          color: #3363F6;
          cursor: pointer;
        }
      }
      .container_c_father{
        width: 100%;
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
        margin-top: 10px;
        
        .container-box{
          width: calc(25% - 16px);
          padding: 20px;
          box-sizing: border-box;
          border-radius: 10px 10px 10px 10px;
          border: 1px solid #E6E6E6;
          margin-bottom: 20px;
          .container_b_top{
            position: relative;
            margin-bottom: 10px;
            .circular_icon{
              width: 20px;
              height: 20px;
              cursor: pointer;
            }
            
            .container_bTop_right{
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
      }
    }
  }
}
</style>