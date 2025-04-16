<template>
  <el-container>
    <el-aside width="264px">
      <div :class="$route.path == item.url?'left-item left-item-on':'left-item'" @click="handlerToRouter(item)" v-for="(item,index) in liveData" :key="index">
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
          title:'藏头诗',
          url:'/liveBroadcast/headPoem'
        },
        {
          title:'专属头像藏头诗 V1',
          url:'/liveBroadcast/headPoemArt'
        },
        {
          title:'专属头像藏头诗 V2',
          url:'/liveBroadcast/headPoemText'
        },
        {
          title:'专属头像藏头诗 V3',
          url:'/liveBroadcast/headPoemImg'
        },
        {
          title:'艺术字姓氏头像',
          url:'/liveBroadcast/chatWordArt'
        },
        {
          title:'艺术字头像九宫格',
          url:'/liveBroadcast/chatWordArtNew'
        },
        {
          title:'艺术字头像十宫格',
          url:'/liveBroadcast/chatWordArtNewTen'
        },
      ],
    }
  },
  computed:{
  },
  methods:{
    handlerToRouter(item){
      this.$router.push(item.url)
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