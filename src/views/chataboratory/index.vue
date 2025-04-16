<template>
  <el-container>
    <el-aside width="200px">
      <!-- <div :class="$route.path == item.url ?'left-item left-item-on':'left-item'" @click="handlerToRouter(item)" v-for="(item,index) in liveData" :key="index">
        {{ item.title }}
      </div> -->
      <!-- <el-menu
        class="el-menu-vertical-demo"
        :collapse="false"
        active-text-color="#003FFF"
        :default-openeds="opens"
        router>
        <el-submenu :index="item.url">
          <template slot="title">
            <span :style="{color:$route.path == item.url?'#003FFF':''}">{{item.title}}</span>
          </template>
          <el-menu-item :index="`${item.url}?value=${child.value}`" v-for="child in item.children" :key="child.name">{{child.name}}</el-menu-item>
        </el-submenu>
      </el-menu> -->
      <div class="left-Nav">
        <div class="leftNav-box" v-for="(item,index) in liveData" :key="index">
          <div class="title">
            <img :src="item.img" alt="">
            <div>{{item.title}}</div>
          </div>
          <div :class="$route.fullPath == child.path?'item on':'item'" v-for="(child,cIndex) in item.children" :key="cIndex" @click="handlerToRouter(child.path)">{{ child.name }}</div>
        </div>
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
      opens:['/chataboratory/laboratoryChat','/chataboratory/laboratoryDrawChat','/chatVideo/index','/chatAudio/index'],
      liveData: [
        {
          title:'对话',
          img:"https://umi-intelligence.oss-cn-shenzhen.aliyuncs.com/xcx/com/message_center/Group 427319141@2x (2).png",
          children:[
            {
              name:"AI35",
              path:"/chataboratory/laboratoryChat?value=0",
              value:0
            },
            {
              name:"AI40",
              path:"/chataboratory/laboratoryChat?value=1",
              value:1
            },
            {
              name:"AI4o",
              path:"/chataboratory/laboratoryChat?value=400",
              value:400
            },
          ]
        },
        {
          title:'绘画',
          img:"https://umi-intelligence.oss-cn-shenzhen.aliyuncs.com/xcx/com/message_center/Group 427319141@2x (1).png",
          children:[
            {
              name:'Midjourney',
              // path:"/chataboratory/midjourney",
              path:"/chataboratory/laboratoryDrawChat?value=6",
              value:6
            },
            {
              name:'DALL.E-3',
              // path:"/chataboratory/dell-E",
              path:"/chataboratory/laboratoryDrawChat?value=15",
              value:15
            },
            {
              name:'Stable Diffusion',
              // path:"/chataboratory/StableDiffusion",
              path:"/chataboratory/laboratoryDrawChat?value=9",
              value:9
            },
          ]
        },
        {
          title:'视频',
          img:"https://umi-intelligence.oss-cn-shenzhen.aliyuncs.com/xcx/com/message_center/Group 427319141@2x (3).png",
          children:[
            {
              name:"runway",
              path:"/chatVideo/runway",
              value:1
            },
            {
              name:"pika",
              path:"/chatVideo/pika",
              value:2
            },
            {
              name:"pixverse",
              path:"/chatVideo/pixverse",
              value:3
            }
          ]
        },
        {
          title:'音频',
          img:"https://umi-intelligence.oss-cn-shenzhen.aliyuncs.com/xcx/com/message_center/Group 427319141@2x (4).png",
          children:[
            {
              name:"suno",
              path:"/chatAudio/newIndex",
              value:1
            }
          ]
        },
      ],
    }
  },
  watch:{
  },
  computed:{
  },
  mounted(){
  },
  methods:{
    handlerToRouter(url){
      this.$router.push(url)
    }
  }
}
</script>

<!-- <style scoped lang="sass">

</style> -->
<style scoped lang="scss">
.el-container{
  height: calc(100vh - 100px);
  overflow: hidden;
}
.el-aside{
  padding: 20px 16px;
  height: 100%;
  box-sizing: border-box;
}
.left-Nav{
  width: 100%;
  height: 100%;
  .leftNav-box{
    margin-bottom: 20px;
    .title{
      display: flex;
      align-items: center;
      font-weight: bold;
      font-size: 14px;
      color: #000000;
      margin-bottom: 10px;
      img{
        width: 16px;
        height: 16px;
        margin-right: 5px;
      }
    }
    .item{
      width: 100%;
      padding: 14px 16px;
      box-sizing: border-box;
      background: #F7F7F7;
      border-radius: 10px 10px 10px 10px;
      font-weight: 400;
      font-size: 14px;
      color: #000000;
      margin-bottom: 10px;
      cursor: pointer;
    }
    .item.on{
      background: #EBF0FF;
      border-radius: 10px 10px 10px 10px;
    }
  }
}
</style>