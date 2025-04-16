<template>
  <!-- 
    我的声音
   -->
  <div class="mine-audio">
    <div class="page_title">
      <div class="video-state">
        <div :class="titleState == -1 ? 'item item-on' : 'item'" @click="selectType(-1)">全部</div>
        <div class="line"></div>
        <div :class="titleState == 3 ? 'item item-on' : 'item'" @click="selectType(3)">训练成功</div>
        <div class="line"></div>
        <div :class="titleState == 2 ? 'item item-on' : 'item'" @click="selectType(2)">训练中</div>
        <div class="line"></div>
        <div :class="titleState == 4 ? 'item item-on' : 'item'" @click="selectType(4)">训练失败</div>
      </div>

      <div class="btn">
        <el-input class="mine-video-inp" placeholder="请输入声音名称搜索" style="height: 32px;line-height: 32px;" icon="el-icon-search" v-model="searchName" @change="handleChangeSearch"></el-input>
        <el-button type="primary" icon="el-icon-plus" style="padding: 6px 10px;margin-left: 20px;" @click="$router.push('/digitizedHuman/cloneAudio')">创建我的模型</el-button>
      </div>
    </div>

    <el-table
      :data="tableData"
      :cell-style="() => { return 'height: 44px;padding: 0;' }"
      :header-cell-style="headerRowStyle"
      style="width: 100%">
      <el-table-column
        prop="voice_name"
        label="声音名称">
      </el-table-column>
      <el-table-column
        prop="gender"
        label="性别">
        <template slot-scope="scope">
          <div>{{ scope.row.gender == 'female' ? '女' : '男' }}</div>
        </template>
      </el-table-column>
      <el-table-column
        prop="voice_status"
        label="状态">
        <template slot-scope="scope">
          <div class="status_style">
            <span v-if="scope.row.voice_status == 3" style="color: #32BE48;">成功</span>
            <span v-if="scope.row.voice_status == 4" style="color: #F74439;">失败</span>
            <span v-if="scope.row.voice_status == 2" style="color: #0075FF;">训练中</span>
            <span v-if="scope.row.voice_status == 1" style="color: #BDBDBD;">待训练</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column
        prop="address"
        label="操作">
        <template slot-scope="scope">
          <div>
            <el-button type="text" v-if="scope.row.voice_status == 3" @click="synthesisAudio(scope.row)">生成声音</el-button>
            <el-button type="text" v-if="scope.row.voice_status == 3" @click="audioCloneHistory(scope.row)">生成记录</el-button>
            <el-button type="text" v-if="scope.row.voice_status == 1" @click="detailPage(scope.row)">查看详情</el-button>
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
  </div>
</template>

<script>
import httpUrls from '../../api/requestURL'
import { customizedVoiceView } from '../../api/digitizedHuman'
export default {
  name: 'mine-audio',
  data() {
    return {
      httpUrls,
      tableData: [],
      page: 1,
      pageSize: 10,
      totalPageSize: 0,
      titleState: -1,
      searchName: '',
    }
  },

  created() {
    this.customizedVoiceView(-1)
  },

  methods: {
    headerRowStyle() {
      return 'color: #70767F;background: #F6F8FA;font-size: 12px;font-weight: 500;line-height: 16px;'
    },

    handleChangeSearch() {
      this.customizedVoiceView(this.titleState)
    },

    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.pageSize = val
      this.customizedVoiceView(this.titleState)
    },
    
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.page = val
      this.customizedVoiceView(this.titleState)
    },

    customizedVoiceView(type) {
      let data = `page=${this.page}&page_size=${this.pageSize}&voice_name=${this.searchName}`
      if (type != -1) {
        data += `&voice_status=${type}`
      }
      customizedVoiceView(data).then(res => {
        console.log(res);
        this.tableData = res.data.data
        this.totalPageSize = res.data.total
      })
    },

    selectType(type) {
      this.titleState = type
      this.customizedVoiceView(type)
    },

    synthesisAudio(row) {
      sessionStorage.setItem('MINE_ADUIO_ITEM', JSON.stringify(row))
      this.$router.push('/digitizedHuman/synthesisAudio')
    },

    audioCloneHistory(row) {
      sessionStorage.setItem('MINE_ADUIO_ITEM', JSON.stringify(row))
      this.$router.push('/digitizedHuman/audioCloneHistory')
    },

    detailPage(row) {
      sessionStorage.setItem('MINE_ADUIO_ITEM', JSON.stringify(row))
      this.$router.push('/digitizedHuman/cloneAudio')
    },
  },
}
</script>

<style lang="scss" scoped>
.mine-audio {
  padding: 20px;
}

.page_title {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;

  .video-state {
    display: flex;
    padding: 4px;
    border-radius: 4px;
    background: #F0F2F6;

    .line {
      width: 1px;
      height: 20px;
      background: #D9DCE0;
      margin: 2px 0;
    }
    
    .item {
      color: #70767F;
      font-size: 14px;
      font-weight: 400;
      padding: 2px 12px;
      line-height: 20px; /* 142.857% */
      border-radius: 4px;
      cursor: pointer;
    }
    
    .item-on {
      box-shadow: 0px 1px 2px 0px rgba(74, 83, 91, 0.24);
      background: #206EF7;
      color: #FFFFFF;
    }
  }

  .btn {
    display: flex;
  }
}

.pagination-template {
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
}

.status_style {
  font-size: 14px;
  font-weight: 400;
  line-height: 20px; /* 142.857% */
}
</style>

<style lang="scss">
.mine-video-inp {
  input {
    height: 32px;
    line-height: 32px;
  }
}
</style>