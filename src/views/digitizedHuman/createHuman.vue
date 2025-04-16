<template>
  <!-- 
    创作首页
   -->
  <div class="create-human">
    <div class="clone-project">
      <div class="item" @click="$router.push('/digitizedHuman/profile')">
        <img class="icon" src="../../assets/images/huamn-icon4.png" alt="">
        <div class="tit">形象克隆</div>
        <div class="cont">定制专属形象</div>
      </div>
      <div class="item" @click="$router.push('/digitizedHuman/mineAudio')">
        <img class="icon" src="../../assets/images/huamn-icon2.png" alt="">
        <div class="tit">声音克隆</div>
        <div class="cont">1v1还原声音克隆</div>
      </div>
      <div class="item" @click="$router.push('/digitizedHuman/startProduceHuman')">
        <img class="position-icon" src="../../assets/images/huamn-icon3.png" alt="">
        <img class="icon" src="../../assets/images/huamn-icon1.png" alt="">
        <div class="tit">输出视频</div>
        <div class="cont">AI生成数字人视频</div>
      </div>
    </div>

    <div class="create_history">
      <div class="bit-title">最近制作</div>
      <div class="classification">
        <div :class="selectProject == 2 ? 'item item-on' : 'item'" @click="selectClassification(2)">我的数字人</div>
        <div :class="selectProject == 1 ? 'item item-on' : 'item'" @click="selectClassification(1)">我的声音</div>
        <div :class="selectProject == 0 ? 'item item-on' : 'item'" @click="selectClassification(0)">输出视频</div>
      </div>

      <div class="history-list" ref="parentInner">
        <div ref="sunInner" class="mask">
          <div class="empty" v-if="historyList.length == 0">
            <img src="../../assets/images/Empty-icon1.png" alt="">
            <div>暂无记录</div>
          </div>
          <div v-for="(item, i) in historyList" :key="i" class="item">
            <div style="width: 100%;height: 100px;display: flex;align-items: center;justify-content: center;">
              <img :src="httpUrls.ossUrl + item.video_cover_url" alt="" v-if="selectProject != 1" style="max-height: 100%;width: auto;" @click="showBigImage(item)">
            </div>
            <div class="text-content">
              <div class="title-or-time">
                <div class="title" v-if="selectProject == 1">{{ item.voice_name }}</div>
                <div class="title" v-else>{{ item.live_name }}</div>
                <div class="time">
                  <i class="el-icon-time"></i>
                  <span>{{ item.create_time }}</span>
                </div>
              </div>

              <div class="more" v-if="selectProject == 0 || (selectProject == 2 && item.make_status == 1)">
                <el-popover
                  placement="right"
                  width="92"
                  popper-class="popover-content-mask"
                  trigger="click">
                  <div class="popover-content">
                    <div class="item" @click="downloadVideo(item)" v-if="selectProject == 0">下载</div>
                    <div class="item" @click="editHuamn(item)" v-if="selectProject == 2 && item.make_status == 1">编辑</div>
                  </div>
                  <i class="el-icon-more" slot="reference" style="cursor: pointer;transform: rotate(90deg)"></i>
                </el-popover>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <el-dialog
      title=""
      :visible.sync="dialogVisible"
      width="375px"
      :before-close="handleDialogClose">
      <video width="100%" height="100%" controls ref="playVideo" v-if="dialogVisible">
        <source :src="videoUrl">
      </video>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogVisible = false">关闭</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import httpUrls from '../../api/requestURL'
import { myLiveVideo, myDigitalHuman, customizedVoiceView } from '../../api/digitizedHuman'

export default {
  name: 'create-human',
  data() {
    return {
      httpUrls,
      selectProject: 2,
      page: 1,
      pageSize: 20,
      historyList: [],
      videoUrl: '',
      dialogVisible: false,
    }
  },

  created() {
    this.myDigitalHuman()
    // this.customizedVoiceView()
    // this.myDigitalHuman()
  },

  mounted() {
    this.$nextTick(() => {
      this.$refs.parentInner.addEventListener('scroll',this.callBackScroll)
    })
  },

  methods: {
    selectClassification(type) {
      this.selectProject = type
      this.page = 1
      this.historyList = []
      if (this.selectProject == 0) {
        this.myLiveVideo()
      } else if (this.selectProject == 1) {
        this.customizedVoiceView()
      } else {
        this.myDigitalHuman()
      }
    },

    myLiveVideo() {
      let data = `page=${this.page}&page_size=${this.pageSize}&make_status=3`
      myLiveVideo(data).then(res => {
        res.data.data.forEach(v => {
          this.historyList.push(v)
        });
        this.page++
      })
    },

    myDigitalHuman() {
      let data = `page=${this.page}&page_size=${this.pageSize}&live_type=1`
      myDigitalHuman(data).then(res => {
        res.data.data.forEach(v => {
          this.historyList.push(v)
        });
        this.page++
      })
    },

    // 获取声音克隆列表
    customizedVoiceView() {
      customizedVoiceView(`voice_status=3`).then(res => {
        console.log(res);
        res.data.data.forEach(v => {
          this.historyList.push(v)
        });
        this.page++
        // this.historyList = res.data.data
      })
    },

    // 滚动回调函数
    callBackScroll(e) {
      let innerHeight = this.$refs.sunInner.offsetHeight
      let containerHeight = this.$refs.parentInner.clientHeight
      let scrollTop = e.target.scrollTop
      // 当滚出去的内容高度加上窗口也就是外部容器的高度大于等于内容高度时发送请求
      if (scrollTop + containerHeight >= innerHeight) {
        // this.myLiveVideo()
        if (this.selectProject == 0) {
          this.myLiveVideo()
        } else if (this.selectProject == 1) {
          this.customizedVoiceView()
        } else {
          this.myDigitalHuman()
        }
        console.log('到底了~~');
      }
    },

    downloadVideo(item) {
      window.open(httpUrls.ossUrl + item.complete_url)
    },

    editHuamn(item) {
      sessionStorage.setItem('MINE_HUMAN_ITEM', JSON.stringify(item))
      this.$router.push('/digitizedHuman/profile')
    },

    showBigImage(item) {
      if (this.selectProject == 0) {
        this.videoUrl = httpUrls.ossUrl + item.complete_url
        this.$nextTick(() => {
          this.dialogVisible = true
        })
      }
    },

    handleDialogClose(done) {
      this.$refs.playVideo.pause()
      done()
    },
  },
}
</script>

<style lang="scss" scoped>
.create-human {
  height: 100%;
}

.clone-project {
  display: flex;
  margin: 20px;

  .item {
    width: 196px;
    height: 174px;
    border-radius: 6px;
    background: #F5F5F7;
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    margin-right: 20px;
    position: relative;
    cursor: pointer;
    .position-icon {
      position: absolute;
      right: 0;
      top: 0;
    }

    .tit {
      color: #000;
      font-size: 16px;
      font-weight: 500;
      line-height: 150%; /* 24px */
    }

    .cont {
      color: #B5B5B5;
      font-size: 14px;
      font-weight: 400;
      line-height: 150%; /* 21px */
      background-color: transparent;
      text-align: center;
      display: block;
    }
  }
}

.create_history {
  margin: 20px;
  height: calc(100% - 194px);

  .bit-title {
    color: #000;
    font-size: 24px;
    font-weight: 500;
    line-height: 150%; /* 36px */
  }
}

.classification {
  display: flex;
  margin: 22px 0 31px 0;

  .item {
    color: #000;
    font-size: 16px;
    font-weight: 500;
    line-height: 150%; /* 24px */
    margin-right: 28px;
    cursor: pointer;
  }

  .item-on {
    border-bottom: 2px solid #1F64FF;
  }
}

.history-list {
  height: calc(100% - 155px);
  overflow-y: auto;
  
  .mask {
    display: flex;
    flex-wrap: wrap;
    // margin: 0 -12px;
  }
  
  .item {
    border-radius: 4px;
    border: 1px solid #EBECEC;
    background: #F5F5F7;
    width: calc(20% - 26px);
    margin: 12px;

    img {
      width: 100%;
    }
  }
}

.text-content {
  margin: 13px;
  display: flex;
  justify-content: space-between;
}

.title-or-time {
  .title {
    color: #000;
    font-size: 14px;
    font-weight: 500;
    line-height: 150%; /* 21px */
  }

  .time {
    color: #A5A6A8;
    font-size: 12px;
    font-weight: 400;
    line-height: 150%; /* 18px */
  }
}


.popover-content {
  .item {
    color: #000;
    font-size: 14px;
    font-weight: 400;
    line-height: 150%; /* 21px */
    padding: 8px 0;
    padding-left: 20px;
    cursor: pointer;
  }

  .item:hover {
    background: rgba(31, 100, 255, 0.10);
  }
}

.empty {
  color: #8D8C8F;
  font-size: 14px;
  font-weight: 500;
  line-height: 150%; /* 21px */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
}
</style>

<style lang="scss">
  .popover-content-mask {
    border-radius: 8px;
    background: #FFF;
    box-shadow: 0px 2px 10px 0px rgba(51, 51, 51, 0.10);
    // height: 142px;
    // width: 92px;
    min-width: 92px;
  }
</style>