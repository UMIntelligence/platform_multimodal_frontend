<template>
  <!-- 
    我的数字人
   -->
  <div class="mine-human">
    <div style="display: flex;justify-content: space-between;align-items: center;">
      <el-input
        style="width: 216px;"
        placeholder="请输入内容"
        prefix-icon="el-icon-search"
        @change="handelInputChange"
        v-model="humanContent">
      </el-input>
      <el-button type="primary" icon="el-icon-plus" style="padding: 6px 12px;background-color: #1f64ff;" @click="$router.push('/digitizedHuman/profile')">形象克隆</el-button>
    </div>

    <div class="selsect-list">
      <div :class="selsectHumanType == 1 ? 'item item-on' : 'item'" @click="huamneType(1)">我的数字人</div>
      <div :class="selsectHumanType == 0 ? 'item item-on' : 'item'" @click="huamneType(0)">公模数字人</div>
      <div :class="selsectHumanType == -1 ? 'item item-on' : 'item'" @click="huamneType(-1)">全部</div>
    </div>

    <div class="human-state" v-if="selsectHumanType == 1">
      <div :class="huamanState == 0 ? 'item item-on' : 'item'" @click="huamnState(0)">已生成数字人</div>
      <div :class="huamanState == 1 ? 'item item-on' : 'item'" @click="huamnState(1)">草稿箱</div>
    </div>

    <div class="human-list" ref="parentInner">
      <div ref="sunInner" class="mask">
        <div v-for="item in humanList" class="item">
          <div class="imgs">
            <!-- <video width="100%" height="289px">
              <source :src="httpUrls.ossUrl + item.live_video_url">
            </video> -->
            <div class="draft" v-if="item.make_status == 1">草稿</div>
            <div class="mask-image">
              <img :src="httpUrls.ossUrl + item.video_cover_url" alt="" class="human-image">
            </div>
          </div>
          <div class="text-mask">
            <div class="huamn-name">{{ item.live_name }}</div>
            <div class="btns">
              <el-button @click="editHuman(item)" class="btn" v-if="item.make_status == 1">编辑</el-button>
              <el-button @click="toProduceHuman(item)" class="btn" v-if="item.make_status != 1">开始制作</el-button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { myDigitalHuman } from '../../api/digitizedHuman'
import httpUrls from '../../api/requestURL'

export default {
  name: 'mine-human',
  data() {
    return {
      httpUrls,
      humanContent: '',
      selsectHumanType: 1,
      huamanState: 0,
      humanList: [],
      page: 1,
      pageSize: 20
    }
  },

  created() {
    this.getmyDigitalHuman(this.selsectHumanType)
  },

  mounted() {
    this.$nextTick(() => {
      this.$refs.parentInner.addEventListener('scroll',this.callBackScroll)
    })
  },
  
  methods: {
    huamnState(type) {
      this.huamanState = type
      this.humanList = []
      this.page = 1
      this.getmyDigitalHuman(1)
    },

    huamneType(type) {
      this.selsectHumanType = type
      this.humanList = []
      this.page = 1
      this.getmyDigitalHuman(type)
    },

    handelInputChange() {
      this.humanList = []
      this.page = 1
      this.getmyDigitalHuman(this.selsectHumanType)
    },

    getmyDigitalHuman(type) {
      let data = `page=${this.page}&page_size=${this.pageSize}&live_name=${this.humanContent}&`
      if (type != -1) {
        data += `live_type=${type}`
      }
      if (type == 1) {
        data += `&make_status=${this.huamanState}`
      }
      myDigitalHuman(data).then(res => {
        console.log(res);
        res.data.data.forEach(v => {
          this.humanList.push(v)
        })
        this.page++
      })
    },

    toProduceHuman(item) {
      if (item.make_status != 1) {
        sessionStorage.setItem('HUMAN_MESSAGE', JSON.stringify(item))
        this.$router.push('/digitizedHuman/startProduceHuman')
      }
    },

    editHuman(item) {
      sessionStorage.setItem('MINE_HUMAN_ITEM', JSON.stringify(item))
      this.$router.push('/digitizedHuman/profile')
    },

    // 滚动回调函数
    callBackScroll(e) {
      let innerHeight = this.$refs.sunInner.offsetHeight
      let containerHeight = this.$refs.parentInner.clientHeight
      let scrollTop = e.target.scrollTop
      // 当滚出去的内容高度加上窗口也就是外部容器的高度大于等于内容高度时发送请求
      if (scrollTop + containerHeight >= innerHeight) {
        this.getmyDigitalHuman(this.selsectHumanType)
        console.log('到底了~~');
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.mine-human {
  margin: 20px;
  width: calc(100% - 40px);
  height: calc(100% - 40px);
  // overflow-y: auto;
}
.selsect-list {
  display: flex;
  margin: 24px 0;

  .item {
    color: #000;
    font-size: 16px;
    font-weight: 500;
    line-height: 150%; /* 24px */
    cursor: pointer;
    margin-right: 32px;
    padding-bottom: 9px;
  }
  .item-on {
    border-bottom: 2px solid #1F64FF;
  }
}

.human-list {
  // justify-content: space-between;
  margin: 0 -8px;
  margin-top: 10px;
  width: calc(100% - 16px);
  height: calc(100% - 150px);
  overflow-y: auto;
  
  .mask {
    display: flex;
    flex-wrap: wrap;
  }

  .item {
    width: calc(100% / 7 - 18px);
    border-radius: 8px;
    border: 1px solid #EBECEC;
    background: #F5F5F7;
    margin: 8px;
    width: 200px;
    height: 361px;

    .text-mask {
      background-color: #FFF;
      border-radius: 0 0 8px 8px;
      padding: 12px;
      height: calc(100% - 313px);

      .huamn-name {
        height: 20px;
      }
    }

    .btns {
      display: flex;
      justify-content: flex-end;
      .btn {
        border-radius: 12px;
        background: #1F64FF;
        color: #FFF;
        font-size: 12px;
        font-weight: 400;
        line-height: 20px; /* 166.667% */
        padding: 3px 12px;
      }
    }
    .imgs {
      height: 289px;
      display: flex;
      justify-content: center;
      align-items: center;
      position: relative;

      .draft {
        position: absolute;
        left: 0;
        top: 0;
        width: 50px;
        height: 20px;
        font-size: 14px;
        background-color: #1F64FF;
        color: #FFF;
        text-align: center;
        border-radius: 8px 0 ;
      }

      .mask-image {
        display: flex;
        justify-content: center;
        align-items: flex-end;
        width: 200px;
        height: 289px;
      }

      .human-image {
        max-height: 100%;
        width: 100%;
        object-fit: contain;
      }
    }
  }
}

.huamn-name {
  color: #333;
  font-size: 14px;
  font-weight: 500;
  line-height: 20px; /* 142.857% */
}

.human-state {
  display: flex;

  .item {
    color: #9297A4;
    font-size: 12px;
    font-weight: 500;
    line-height: 20px; /* 166.667% */
    border-radius: 6px;
    background: #F8F9FB;
    padding: 5px 20px;
    margin-right: 16px;
    cursor: pointer;
  }

  .item-on {
    background: #EBEEFE;
    color: #1F64FF;
  }
}
</style>