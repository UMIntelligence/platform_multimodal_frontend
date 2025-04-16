<template>
  <el-container>
    <el-aside width="264px">
      <div :class="$route.path == '/mineRole/mineRole'?'left-item left-item-on':'left-item'" @click="$router.push('/mineRole/mineRole')">
        创作中心
      </div>
      <div :class="$route.path != '/mineRole/mineRole'&&(item.id
              ? applicationCenterId == item.id
              : applicationCenterId == item.tab_id)?'left-item left-item-on':'left-item'" @click="selectApplicationType(item)" v-for="(item) in appletList" :key="item.tab_id">
        {{ item.name }}
      </div>
    </el-aside>
    <el-main>
      <router-view></router-view>
    </el-main>
  </el-container>
</template>

<script>
import { mapGetters } from "vuex";
import { applitetab } from "@/api/prompts";

export default {
  data(){
    return {
      appletList: [],
    }
  },
  computed:{
    ...mapGetters(["applicationCenterId"])
  },
  created(){
    // 应用助理的tab栏
    applitetab().then((res) => {
      console.log(res, "助理中心tab");
      let arr = [3, 2, 5, 1];
      res.data.forEach((v, i) => {
        if (v.name == "工作助理") {
          v.id = 1;
        } else if (v.name == "实用工具") {
          v.id = 2;
        } else if (v.name == "名人互动") {
          v.id = 3;
        } else if (v.name == "休闲娱乐") {
          v.id = 5;
        }
      });
      res.data.sort((a, b) => {
        return a.weight - b.weight;
      });
      res.data.forEach((v) => {
        if (v.name != "私享定制") {
          this.appletList.push(v);
        }
      });
    });
  },  
  methods:{
    selectApplicationType(type){
      if(this.$route.path != '/templateSelect/templateSelect'){
        this.$router.push('/templateSelect/templateSelect')
      }
      this.$store.dispatch(
        "app/changeApplicationCenterId",
        type.id ? type.id : type.tab_id
      );
      sessionStorage.setItem("applicationId", type.id ? type.id : type.tab_id);
      sessionStorage.setItem("applicationType", type.id ? type.id : type.tab_id);
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