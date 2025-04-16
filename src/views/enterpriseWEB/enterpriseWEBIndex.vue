<template>
  <el-container>
    <el-aside width="264px">
      <div :class="liveIndex == index?'left-item left-item-on':'left-item'" @click="handlerToRouter(item,index)" v-for="(item,index) in liveData" :key="index">
        {{ item.title }}
      </div>
    </el-aside>
    <el-main>
      <router-view></router-view>
    </el-main>
  </el-container>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data(){
    return {
      liveData: [
        {
          title:'AI智能体',
          url:'/enterpriseWEB/knowledge/chatIndex'
        },
        {
          title:'知识库',
          url:'/enterpriseWEB/knowledge/baseIndex'
        },
        {
          title:'企业设置',
          url:'/enterpriseWEB/settings'
        },
        {
          title:'成员管理',
          url:'/enterpriseWEB/enterpriseMember'
        },
      ],
      liveIndex:0
    }
  },
  computed:{
  },
  methods:{
    handlerToRouter(item,index){
      this.$router.push(item.url);
      this.liveIndex = index;
      console.log(this.liveIndex)
    }
  }
}
</script>

<!-- <style scoped lang="sass">

</style> -->
<style scoped>
.el-container{
  height: calc(100vh - 100px);
  overflow: hidden;
}
.el-aside{
  padding: 20px 16px;
  box-sizing: border-box;
  border-left: 1px solid #ebebeb;

}
.left-item{
  padding: 13px 20px;
  box-sizing: border-box;
  width: 100%;
  margin-bottom: 10px;
  cursor: pointer;
  font-weight: bold;
  font-size: 14px;
  border-radius: 10px 10px 10px 10px;
}
.left-item:hover{
  color: #003FFF;
  background: #EBF0FF;
}
.left-item-on{
  color: #003FFF;
  background: #EBF0FF;
}
</style>