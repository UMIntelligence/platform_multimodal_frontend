<template>
  <!-- 
    声音克隆记录
   -->
  <div class="audio-clone-history">
    <div class="go-back-page">
      <div @click="$router.go(-1)" style="cursor: pointer;">
        <i class="el-icon-arrow-left"></i>
        <span>返回</span>
      </div>
    </div>

    <el-table
      :data="tableData"
      :cell-style="() => { return 'height: 44px;padding: 0;' }"
      :header-cell-style="headerRowStyle"
      height="calc(100% - 113px)"
      style="width: 100%;border: none;">
      <el-table-column
        prop="live_script"
        label="声音内容">
        <template slot-scope="scope">
          <div style="overflow: hidden;text-overflow: ellipsis;white-space: nowrap;max-width: 60%;">{{ scope.row.live_script }}</div>
        </template>
      </el-table-column>
      <el-table-column
        prop="live_sound_url"
        label="链接">
        <template slot-scope="scope">
          <div style="overflow: hidden;text-overflow: ellipsis;white-space: nowrap;max-width: 60%;">{{ httpUrls.ossUrl + scope.row.live_sound_url }}</div>
        </template>
      </el-table-column>
      <el-table-column
        prop="address"
        label="操作"
        width="300">
        <template slot-scope="scope">
          <div>
            <el-button type="text" v-if="!isPlay" @click="playAudio(scope.row)">播放</el-button>
            <el-button type="text" v-if="isPlay" @click="pauseAudio(scope.row)">暂停</el-button>
            <el-button type="text" @click="downloadAudio(scope.row)">下载</el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>

    <div class="pagination-template">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="page"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="totalPageSize">
      </el-pagination>
    </div>

    <audio :src="audioUrl" ref="isPlayAUdio"></audio>
  </div>
</template>

<script>
import httpUrls from '../../api/requestURL'
import { voiceGenerateHistory } from '../../api/digitizedHuman'
export default {
  name: 'audio-clone-history',
  data() {
    return {
      httpUrls,
      tableData: [],
      audioUrl: '',
      isPlay: false,
      page: 1,
      pageSize: 10,
      totalPageSize: 0,
    }
  },

  created() {
    this.voiceGenerateHistory()
  },
  
  methods: {
    voiceGenerateHistory() {
      const MINE_ADUIO_ITEM = JSON.parse(sessionStorage.getItem('MINE_ADUIO_ITEM'))
      console.log(MINE_ADUIO_ITEM, MINE_ADUIO_ITEM.voice_code);
      voiceGenerateHistory(`page=${this.page}&page_size=${this.pageSize}&voice_code=${MINE_ADUIO_ITEM.voice_code}`).then(res => {
        console.log(res);
        this.tableData = res.data.data
        this.totalPageSize = res.data.total
      })
    },

    playAudio(row) {
      this.audioUrl = httpUrls.ossUrl + row.live_sound_url
      this.$nextTick(() => {
        this.$refs.isPlayAUdio.play()
      })
    },

    pauseAudio(row) {
      this.$refs.isPlayAUdio.pause()
    },

    downloadAudio(row) {
      window.open(httpUrls.ossUrl + row.live_sound_url)
    },

    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.pageSize = val
      this.voiceGenerateHistory()
    },
    
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.page = val
      this.voiceGenerateHistory()
    },

    headerRowStyle() {
      return 'color: #70767F;background: #F6F8FA;font-size: 12px;font-weight: 500;line-height: 16px;'
    },
  },
}
</script>

<style lang="scss" scoped>
.audio-clone-history{
  padding: 20px;
  height: calc(100% - 40px);
}

.go-back-page {
  margin-bottom: 40px;
}

.pagination-template {
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
}
</style>