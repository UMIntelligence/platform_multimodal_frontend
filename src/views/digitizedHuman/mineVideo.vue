<template>
  <!-- 
    我的视频
   -->
  <div class="mine-video">
    <div class="select-title">
      <div :class="selectTitleItem == 1 ? 'item item-on' : 'item'" @click="selsectShowList(1)">已导出视频</div>
      <div :class="selectTitleItem == 0 ? 'item item-on' : 'item'" @click="selsectShowList(0)">草稿箱</div>
    </div>
    
    <div class="download_video-mask" v-if="selectTitleItem == 1">
      <div class="mask">
        <div :class="selectLittleTitleItem == -1 ? 'item item-on' : 'item'" @click="selectDownloadType(-1)">全部</div>
        <div class="line"></div>
        <div :class="selectLittleTitleItem == 1 ? 'item item-on' : 'item'" @click="selectDownloadType(1)">队列中</div>
        <div class="line"></div>
        <div :class="selectLittleTitleItem == 3 ? 'item item-on' : 'item'" @click="selectDownloadType(3)">训练成功</div>
        <div class="line"></div>
        <div :class="selectLittleTitleItem == 2 ? 'item item-on' : 'item'" @click="selectDownloadType(2)">训练中</div>
        <div class="line"></div>
        <div :class="selectLittleTitleItem == 4 ? 'item item-on' : 'item'" @click="selectDownloadType(4)">训练失败</div>
      </div>
    </div>

    <div class="history-list" ref="parentInner">
      <div ref="sunInner" class="mask">
        <div v-for="(item, i) in videoList" :key="i" class="item">
          <div class="train_type" v-if="selectTitleItem == 1 && item.make_status == 1">队列中</div>
          <div class="train_type" v-if="selectTitleItem == 1 && item.make_status == 3">训练成功</div>
          <div class="train_type" v-if="selectTitleItem == 1 && item.make_status == 4">训练失败</div>
          <div class="training_type" v-if="selectTitleItem == 1 && item.make_status == 2">
            <span>训练中...</span>
          </div>
          <div style="width: 100%;height: 100px;display: flex;justify-content: center;align-items: center;">
            <img :src="httpUrls.ossUrl + item.video_cover_url" alt="" style="height: 100%;" @click="showBigImage(item)">
          </div>
          <div class="text-content">
            <div class="title-or-time">
              <div class="title">{{ item.project_name }}</div>
              <div class="title">{{ item.video_name }}</div>
              <div class="time">
                <i class="el-icon-time"></i>
                <span>{{ item.create_time }}</span>
              </div>
            </div>

            <div class="more">
              <el-popover
                placement="right"
                popper-class="popover-content-mask"
                trigger="click">
                <div class="popover-content">
                  <div class="item" v-if="selectTitleItem == 1 && item.make_status == 3" @click="downloadVideo(item)">下载</div>
                  <div class="item" v-if="selectTitleItem == 0" @click="editTrainVideo(item)">编辑</div>
                  <!-- <div class="item">重命名</div> -->
                  <div class="item" v-if="selectTitleItem == 0" @click="deleteHuamnVideo(item)">删除</div>
                  <div class="item" v-if="selectTitleItem == 1 && item.make_status == 4" @click="resetTrainHuman(item)">重新训练</div>
                </div>
                <i class="el-icon-more" slot="reference" style="cursor: pointer;transform: rotate(90deg)"></i>
              </el-popover>
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
import { DigitalHumanProjectView, myLiveVideo, digitalHumanProject, resetTrainMyLiveVideo, myDigitalHuman } from '../../api/digitizedHuman'
export default {
  name: 'mine-video',
  data() {
    return {
      httpUrls,
      selectTitleItem: 1,
      selectLittleTitleItem: -1,
      videoList: [],
      page: 1,
      pageSize: 20,
      dialogVisible: false,
      videoUrl: '',
    }
  },

  created() {
    this.myLiveVideo(-1)
  },

  mounted() {
    this.$refs.parentInner.addEventListener('scroll', this.callBackScroll)
  },

  methods: {
    // 草稿箱/已导出视频
    selsectShowList(type) {
      this.videoList = []
      this.page = 1
      this.selectTitleItem = type
      if (type == 0) {
        this.digitalHumanProjectView()
      } else {
        this.myLiveVideo(-1)
      }
    },

    // 已导出视频选项
    selectDownloadType(type) {
      this.selectLittleTitleItem = type
      this.videoList = []
      this.page = 1
      this.myLiveVideo(type)
    },

    // 获取草稿箱列表
    digitalHumanProjectView() {
      DigitalHumanProjectView(`page=${this.page}&page_size=${this.pageSize}&project_status=1`).then(res => {
        console.log(res);
        res.data.data.forEach(v => {
          this.videoList.push(v)
        })
        this.page++
      })
    },

    // 获取已导出视频列表
    myLiveVideo(type) {
      let data = `page=${this.page}&page_size=${this.pageSize}`
      if (type != -1) {
        data += `&make_status=${type}`
      }
      myLiveVideo(data).then(res => {
        console.log(res);
        res.data.data.forEach(v => {
          this.videoList.push(v)
        })
        this.page++
      })
    },

    deleteHuamnVideo(item) {
      this.$confirm('此操作将永久删除此项目, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        digitalHumanProject({project_code_list: [item.project_code]}).then(res => {
          console.log(res);
          if (res.code == 20000) {
            this.$message.success('删除成功')
            this.videoList.forEach((v, i) => {
              if (item.project_code == v.project_code) {
                this.videoList.splice(i, 1)
              }
            })
          } else {
            this.$message.error(res.msg)
          }
        }).catch(error => {
          this.$message.error('网络异常，请稍后重试')
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });          
      });
    },

    // 下载视频
    downloadVideo(item) {
      window.open(httpUrls.ossUrl + item.complete_url)
    },

    // 重新训练
    resetTrainHuman(item) {
      resetTrainMyLiveVideo({live_dtl_code: item.live_dtl_code}).then(res => {
        this.videoList.forEach(v => {
          if (v.project_code == item.project_code) {
            v.make_status = 2
          }
        })
      })
    },

    editTrainVideo(item) {
      sessionStorage.setItem('EDIT_HUMAN_MESSAGE', JSON.stringify(item))
      myDigitalHuman().then(res => {
        res.data.data.forEach(v => {
          if (v.live_code == item.live_code) {
            sessionStorage.setItem('HUMAN_MESSAGE', JSON.stringify(v))
            this.$router.push('/digitizedHuman/startProduceHuman')
          }
        })
      })
    },

    // 滚动回调函数
    callBackScroll(e) {
      let innerHeight = this.$refs.sunInner.offsetHeight
      let containerHeight = this.$refs.parentInner.clientHeight
      let scrollTop = e.target.scrollTop
      // 当滚出去的内容高度加上窗口也就是外部容器的高度大于等于内容高度时发送请求
      if (scrollTop + containerHeight >= innerHeight) {
        if (this.selectTitleItem == 0) {
          this.digitalHumanProjectView()
        } else {
          this.myLiveVideo(this.selectLittleTitleItem)
        }
        console.log('到底了~~');
      }
    },

    showBigImage(item) {
      this.videoUrl = httpUrls.ossUrl + item.complete_url
      if (this.selectTitleItem == 1 && item.make_status == 3) {
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
.mine-video {
  height: 100%;
}

.select-title {
  display: flex;
  margin: 20px;

  .item {
    color: #000;
    font-size: 16px;
    font-weight: 500;
    line-height: 150%; /* 24px */
    margin-right: 44px;
    padding-bottom: 9px;
    cursor: pointer;
  }

  .item-on {
    border-bottom: 2px solid #1f64ff;
  }
}

.history-list {
  height: calc(100% - 120px);
  overflow-y: auto;
  
  .mask {
    display: flex;
    flex-wrap: wrap;
    margin: 8px 8px 0 8px;
    // margin: 0 -12px;
  }
  
  .item {
    border-radius: 4px;
    border: 1px solid #EBECEC;
    background: #F5F5F7;
    width: calc(20% - 26px);
    margin: 12px;
    position: relative;

    .train_type {
      position: absolute;
      color: #FFF;
      font-size: 14px;
      font-weight: 400;
      line-height: 150%; /* 21px */
      padding: 4px 12px;
      border-radius: 3px 0px 4px 0px;
      background: #206EF7;
    }

    .training_type {
      position: absolute;
      left: 0;
      top: 0;
      right: 0;
      bottom: 0;
      border-radius: 3px;
      background: rgba(0, 0, 0, 0.60);
      color: #FFF;
      font-size: 14px;
      font-weight: 500;
      line-height: 150%; /* 21px */
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 1;
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

.download_video-mask {
  display: flex;
  
  .mask {
    margin-left: 20px;
    display: flex;
    padding: 8px;
    border-radius: 4px;
    background: #F0F2F6;
    align-items: center;

    .item {
      color: #70767F;
      font-size: 14px;
      font-weight: 400;
      line-height: 20px; /* 142.857% */
      padding: 2px 12px;
      cursor: pointer;
    }

    .item-on {
      border-radius: 4px;
      background: #206EF7;
      box-shadow: 0px 1px 2px 0px rgba(74, 83, 91, 0.24);
      color: #FFFFFF;
    }

    .line {
      height: 16px;
      width: 1px;
      background-color: #D9DCE0;
    }
  }
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