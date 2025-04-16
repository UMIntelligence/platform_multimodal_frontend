<template>
  <!-- 左侧菜单 -->
  <div class="leftnav">
    
    <div class="top" ref="topRef">
      <div class="new-btn">
        <img src="../../assets/images/images_ljh/plus@5f8c6ae8.png" alt="">
        <div>新对话</div>
      </div>
      <img src="../../assets/images/images_ljh/chevron-down@2x.png" class="btn" alt="">
      <img src="../../assets/images/images_ljh/addAfter@2x (1).png" class="btn" alt="">
    </div>
    <div class="container" :style="{height:`calc(100% - ${containerHeight}px)`}">
      <div class="container-list">
        <div class="container-list-title">置顶</div>
          <div v-for="item in 5" :key="item">
          <div v-if="editId != item" :class="checkId == item?'container-item container-item-on':'container-item'" @click.stop="checkId = item">
              <div class="left">
                <!-- 默认 -->
                <img v-if="checkId != item" src="../../assets/images/images_ljh/Group_427321565@2x (1).png" alt="">
                <!-- 选中 -->
                <img v-else src="../../assets/images/images_ljh/Group_427321565@2x (2).png" alt="">
                <div class="left-text">
                  包装美学设计专家包装美学设计专家
                </div>
              </div>
              <!-- 工具栏 -->
              <div v-if="checkId != item" class="tool">
                <el-tooltip
                  effect="dark"
                  content="置顶"
                  placement="top"
                >
                  <img @click.stop="handleTopping(item)" src="../../assets/images/images_ljh/Frame@2x (4).png" alt="">
                </el-tooltip>
                <el-tooltip
                  effect="dark"
                  content="编辑"
                  placement="top"
                ><img @click.stop="handleEdit(item,'editInput'+item)" src="../../assets/images/images_ljh/Group_427321391@2x (1).png" alt=""></el-tooltip>
                <el-tooltip
                  effect="dark"
                  content="删除"
                  placement="top"
                ><img @click.stop="handleDelete(item)" src="../../assets/images/images_ljh/vuesax_linear_trash@2x (5).png" alt=""></el-tooltip>
                
                
              </div>
              <div v-else class="tool">
                <el-tooltip
                  effect="dark"
                  content="取消置顶"
                  placement="top"
                ><img @click.stop="handleTopping(item)" src="../../assets/images/images_ljh/Frame@2x (5)135.png" alt=""></el-tooltip>
                <el-tooltip
                  effect="dark"
                  content="编辑"
                  placement="top"
                ><img @click.stop="handleEdit(item,'editInput'+item)" src="../../assets/images/images_ljh/Group_427321391@2x (2).png" alt=""></el-tooltip>
                <el-tooltip
                  effect="dark"
                  content="删除"
                  placement="top"
                ><img @click.stop="handleDelete(item)" src="../../assets/images/images_ljh/vuesax_linear_trash@2x (6).png" alt=""></el-tooltip>
                
                
                
              </div>
          </div>
          <template v-else>
              <el-input :id="'editInput'+item" style="margin-bottom: 10px;height: 40px;" v-model="editValue" @blur="editInputBlue"></el-input>
          </template>
        </div>
      </div>
    </div>
    <div class="bottom" ref="bottomRef">
      <div class="btn">
        <img src="../../assets/images/images_ljh/Group_427321591@2x.png" alt="">
        <div>切换智能体</div>
      </div>
      <div class="btn">
        <img src="../../assets/images/images_ljh/vuesax_linear_trash@2x (3).png" alt="">
        <div>清空未置顶对话</div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data(){
    return {
      containerHeight:0,//列表高度
      topRef:null,
      bottomRef:null,
      checkId:null,//选中
      editId:null,
      editValue:"",//编辑id，展示输入框
    }
  },
  mounted(){
    let height = this.$refs.topRef.offsetHeight + this.$refs.bottomRef.offsetHeight;
     this.containerHeight = height;
  },
  methods:{
    //置顶函数
    handleTopping(){
      console.log(item,'置顶')
    },
    //编辑
    handleEdit(item,dom){
      this.editId = item;
      nextTick(() => {
        //文本框聚焦
        document.getElementById(dom).focus()
      })
    },
    //输入框失去焦点
    editInputBlue(){
      this.editId = null;
      this.editValue = '';
    },
    handleDelete(item){
      console.log(item,'删除')
    },
  }
}
</script>
<style lang="scss" scoped>
.leftnav{
  width: 260px;
  height: calc(100vh - 60px);
  padding-top: 21px;
  box-sizing: border-box;
  position: relative;
  
  .top{
    width: 100%;
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 0px 16px;
    box-sizing: border-box;
    .new-btn{
      display: flex;
      align-items: center;
      justify-content: center;
      width: 132px;
      height: 40px;
      gap:4px;
      font-weight: bold;
      font-size: 14px;
      color: #FFFFFF;
      background: #003FFF;
      border-radius: 10px 10px 10px 10px;
      cursor: pointer;
      img{
        width: 20px;
        height: 20px;
      }
    }
    .btn{
      width: 40px;
      height: 40px;
      border-radius: 10px 10px 10px 10px;
      border: 1px solid #F0F0F0;
      background: #F5F5F5;
      padding: 12px;
      box-sizing: border-box;
      cursor: pointer;
    }
  }
  .container{
    overflow-y: auto;
    padding: 0px 16px;
    box-sizing: border-box;
    .container-list{
      box-sizing: border-box;
      padding-top: 24px;
    }
    .container-list-title{
      font-weight: bold;
      font-size: 12px;
      color: #888888;
      margin-bottom: 10px;
    }
    .container-item{
      width: 100%;
      height: 40px;
      padding: 0px 10px;
      box-sizing: border-box;
      display: flex;
      align-items: center;
      gap: 15px;
      border-radius: 10px 10px 10px 10px;
      border: 1px solid #E5E5E5;
      background: #fff;
      position: relative;
      cursor: pointer;
      overflow: hidden;
      margin-bottom: 10px;
      .triangle {
        width:0px;
        height:0px;
        border:10px solid transparent;/*以下四个样式对应四种三角形，任选其一即可实现*/
        //  border-top-color:lightseagreen; 
        border-left-color:#99B2FF; 
        // border-right-color:lightseagreen; 
        // border-bottom-color:#99B2FF;
        position: absolute;
        right: -13px;
        top: 0px;
        overflow: hidden;
        transform: scaleX(30deg);
      }
      .left{
        width: calc(100% - 68px - 15px);
        display: flex;
        align-items: center;
        gap: 5px;
        img{
          width: 16px;
          height: 16px;
        }
        .left-text{
          width: calc(100% - 16px - 5px);
          overflow: hidden; /* 溢出隐藏 */
          text-overflow: ellipsis; /* 文字溢出用省略号表示 */
          white-space: nowrap; /* 不换行 */
          font-weight: bold;
          font-size: 14px;
        }
      }
      .tool{
        display: flex;
        align-items: center;
        gap: 10px;
        img{
          width: 16px;
          height: 16px;
        }
      }
    }
    .container-item:hover{
      background: #F6F6F6 ;
      border: 1px solid #F2F2F2 ;
    }
    .container-item-on{
      background: #EBF0FF !important;
      color: #003FFF !important;
      border: 1px solid transparent;
    }
  }
  .bottom{
    padding: 24px 16px;
    box-sizing: border-box;
    box-shadow: inset 0px 1px 0px 0px rgba(0,0,0,0.05);
    display: flex;
    gap: 10px;
    flex-direction: column;
    .btn{
      width: 100%;
      height: 40px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: #fff;
      font-weight: bold;
      font-size: 14px;
      color: #000;
      border: 1px solid #E5E5E5;
      border-radius: 10px 10px 10px 10px;
      cursor: pointer;
      img{
        width: 20px;
        height: 20px;
      }
    }
    .btn:first-child{
      background: #EBF0FF;
      color: #003FFF;
      border: 1px solid transparent;
    }
  }
}
</style>