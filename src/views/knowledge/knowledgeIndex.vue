<template>
  <el-container>
    <el-aside width="264px">
      <div :class="$route.path == '/knowledge/knowledgeRobot'?'left-item left-item-on':'left-item'" @click="$router.push('/knowledge/knowledgeRobot')">
        我的智能体
      </div>
      <div :class="$route.path == '/knowledge/knowledge' && knowledgeLabel==item?'left-item left-item-on':'left-item'" @click="handlerToRouter(item)" v-for="(item,index) in knowledgeData" :key="index">
        {{ item }}
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
      knowledgeData: ["图片库", "文档库", "网址库"],
    }
  },
  computed:{
    ...mapGetters(["knowledgeLabel"])
  },
  methods:{
    handlerToRouter(item){
      if(this.$route.path != '/knowledge/knowledge'){
        this.$router.push("/knowledge/knowledge")
      }
      this.$store.dispatch('app/changeknowledgeLabel', item)
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