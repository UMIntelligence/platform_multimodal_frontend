<template>
  <div class="create-teacher">
    <div class="go-back-page">
      <div class="back" @click="$router.go(-1)">
        <i class="el-icon-arrow-left"></i>
        <span>返回</span>
      </div>
    </div>

    <div class="select-mentor-mask">
      <div :class="mentorType == 1 ? 'item item-on' : 'item'" @click="getMetorList(1)">推荐导师（{{ mentorList.length }}）</div>
      <div :class="mentorType == 2 ? 'item item-on' : 'item'" @click="getMetorList(2)">我的专属导师（{{ mentorOrMe.length }}）
      </div>
    </div>

    <div class="mentor-list-mask">
      <div class="mentor-list-sun">
        <div class="mentor-mask" v-if="mentorType == 1">
          <div class="item" v-for="(item, i) in mentorList" :key="i">
            <div class="mentor-name">
              <img class="img" :src="httpUrls.ossUrl + item.avatar" alt="">
              <div class="name">{{ item.character_name }}</div>
            </div>
            <div class="coonst">
              <span class="text">{{ item.introduction }}</span>
            </div>
            <div class="function-list">
              <el-button type="text" style="padding: 6px 0;width: calc(100% - 1px);"
                @click="toChatPage(item)">去聊天</el-button>
              <div style="height: 18px;width: 1px;background-color: #1f64ff;"></div>
              <el-button type="text" style="padding: 6px 0;width: calc(100% - 1px);" @click="open(item)">选择导师</el-button>
              <!-- <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M21 15C21 15.5304 20.7893 16.0391 20.4142 16.4142C20.0391 16.7893 19.5304 17 19 17H7L3 21V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H19C19.5304 3 20.0391 3.21071 20.4142 3.58579C20.7893 3.96086 21 4.46957 21 5V15Z" stroke="#6D7191" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M19.8949 13.6195L12.7184 11.032C12.4395 10.9312 12.1324 11.0765 12.0316 11.3531C11.9895 11.4703 11.9895 11.5992 12.0316 11.7164L14.6191 18.893C14.7738 19.3219 15.3621 19.3734 15.5871 18.9773L16.5621 17.2758C16.7098 17.0203 17.0379 16.9312 17.2934 17.0789C17.3332 17.1023 17.3707 17.1305 17.4035 17.1633L20.5371 20.2945C20.7457 20.5031 21.0855 20.5031 21.2941 20.2945C21.5027 20.0859 21.5027 19.7461 21.2941 19.5375L18.1652 16.4086C17.9566 16.2 17.9566 15.8601 18.1652 15.6515C18.198 15.6187 18.2355 15.5883 18.2777 15.5648L19.9793 14.5898C20.3754 14.3625 20.3238 13.7765 19.8949 13.6195Z" fill="#6D7191"/>
                <rect x="16" y="16.4141" width="2" height="6.76171" rx="1" transform="rotate(-45 16 16.4141)" fill="#6D7191"/>
                <path d="M22 12.5V6C22 4.89543 21.1046 4 20 4H8C6.89543 4 6 4.89543 6 6V19C6 20.1046 6.89543 21 8 21H15" stroke="#6D7191" stroke-width="2" stroke-linecap="round"/>
              </svg> -->
            </div>
          </div>
        </div>
        <div class="mentor-mask" v-else>
          <div class="create_me-item" @click="$router.push('/createMineMentor')">
            <i class="el-icon-plus"></i>
            <div>创建</div>
          </div>
          <div class="item" v-for="(item, i) in mentorOrMe" :key="i">
            <div class="mentor-name">
              <img class="img" :src="httpUrls.ossUrl + item.avatar" alt="">
              <div class="name">{{ item.character_name }}</div>
            </div>
            <div class="coonst">
              <span class="text">{{ item.introduction }}</span>
            </div>
            <div class="function-list">
              <el-button type="text" style="padding: 6px 0;width: calc(100% - 1px);"
                @click="toChatPage(item)">去聊天</el-button>
              <el-button type="text" style="padding: 6px 0;width: calc(100% - 1px);"
                @click="open(item)">选择导师</el-button>
              <!-- <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M21 15C21 15.5304 20.7893 16.0391 20.4142 16.4142C20.0391 16.7893 19.5304 17 19 17H7L3 21V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H19C19.5304 3 20.0391 3.21071 20.4142 3.58579C20.7893 3.96086 21 4.46957 21 5V15Z" stroke="#6D7191" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M19.8949 13.6195L12.7184 11.032C12.4395 10.9312 12.1324 11.0765 12.0316 11.3531C11.9895 11.4703 11.9895 11.5992 12.0316 11.7164L14.6191 18.893C14.7738 19.3219 15.3621 19.3734 15.5871 18.9773L16.5621 17.2758C16.7098 17.0203 17.0379 16.9312 17.2934 17.0789C17.3332 17.1023 17.3707 17.1305 17.4035 17.1633L20.5371 20.2945C20.7457 20.5031 21.0855 20.5031 21.2941 20.2945C21.5027 20.0859 21.5027 19.7461 21.2941 19.5375L18.1652 16.4086C17.9566 16.2 17.9566 15.8601 18.1652 15.6515C18.198 15.6187 18.2355 15.5883 18.2777 15.5648L19.9793 14.5898C20.3754 14.3625 20.3238 13.7765 19.8949 13.6195Z" fill="#6D7191"/>
                <rect x="16" y="16.4141" width="2" height="6.76171" rx="1" transform="rotate(-45 16 16.4141)" fill="#6D7191"/>
                <path d="M22 12.5V6C22 4.89543 21.1046 4 20 4H8C6.89543 4 6 4.89543 6 6V19C6 20.1046 6.89543 21 8 21H15" stroke="#6D7191" stroke-width="2" stroke-linecap="round"/>
              </svg> -->
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import httpUrls from '../../api/requestURL'
import { deleteMentor, getMentorMe, getMetorList, createMetor, updateMetor, batchMeTutor } from '../../api/mentor'

export default {
  name: 'create-teacher',
  data() {
    return {
      httpUrls,
      mentorItemMsg: {},
      mentorType: 1,
      mentorList: [],
      mentorNumber: 0,
      mineMentorList: [],
      mineMentorNumber: 0,
      user_id: '',
      mentorOrMe: []
    }
  },

  created() {
    this.getMetorList(2)
    this.getMetorList(1)
    this.getMentorMe()
  },

  mounted() {
    this.mentorItemMsg = JSON.parse(sessionStorage.getItem('ADD_MENTOR_ITEM_MESSAGE'))
  },
  methods: {
    // 获取“我”
    getMentorMe() {
      let userInfo = JSON.parse(localStorage.getItem('userInfo'))
      // console.log(userInfo)
      let data = `user_id=${userInfo.user_id}&page_index=1&page_count=5`
      getMentorMe(data).then(res => {
        console.log(res);
        this.mineNumber = res.total
        if (res.data.length == 0 || res.data == null) {
          this.mineNumberList = []
        } else {
          this.mineNumberList = res.data
        }
        let meId = []
        res.data.forEach(v => {
          meId.push(v.me_id)
        })
        batchMeTutor({ me_ids: JSON.stringify(meId) }).then(response => {
          this.mentorOrMe = response.data[0].tutor.filter(item => item.character_name != undefined && item.character_name != null);
        })
      })
    },
    // 获取推荐导师列表
    getMetorList(type) {
      this.mentorType = type
      let userInfo = JSON.parse(localStorage.getItem('userInfo'))
      this.user_id = userInfo.user_id
      let data = ''
      if (type == 1) {
        data = `is_built_in=1`
      } else {
        data = `user_id=${userInfo.user_id}&get_all=1`
      }
      getMetorList(data).then(res => {
        console.log(res);
        res.data.forEach((v, i) => {
          v.sort = i
        })
        if (type == 1) {
          this.mentorList = res.data
          this.mentorNumber = res.total
        } else {
          this.mineMentorList = res.data
          this.mineMentorNumber = res.total
        }
      })
    },

    toChatPage(item) {
      sessionStorage.setItem('MENTOR_ITEM_MESSAGE', JSON.stringify(item))
      this.$router.push('/mentorChat')
    },
    open(item) {
      this.$confirm('确定选择该导师吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'success'
      }).then(() => {
        this.selectMentorToMe(item)
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消'
        });
        // this.selectMentorToMe(item)
      });
    },
    selectMentorToMe(item) {
      console.log(this.mentorItemMsg, '----asdasda');
      const userInfor = JSON.parse(localStorage.getItem('userInfo'))
      let oldrequestData = {
        "user_id": userInfor.user_id,
        "me_id": this.mentorItemMsg.me_id,
        "tutor_id": this.mentorItemMsg.tutor_id,
        "avatar": this.mentorItemMsg.avata,
        "character_name": this.mentorItemMsg.character_name,
        "greeting": this.mentorItemMsg.greeting,
        "implicit_hint": this.mentorItemMsg.implicit_hint,
        "introduction": this.mentorItemMsg.introduction,
        "influence": this.mentorItemMsg.influence,
        "document": this.mentorItemMsg.document,
        "image": this.mentorItemMsg.image,
        "status": "0",
        "website": this.mentorItemMsg.website,
        "extend": ""
      }
      let requestData = {
        user_id: userInfor.user_code,
        avatar: item.avatar,
        character_name: item.character_name,
        greeting: item.greeting,
        implicit_hint: item.implicit_hint,
        introduction: item.introduction,
        influence: item.influence,
        document: item.document,
        image: item.image,
        website: item.website,
        me_id: this.mentorItemMsg.me_id,
        sort: this.mentorItemMsg.sort,
        extend: item.extend,
      }
      updateMetor(oldrequestData).then(res => {
        if (res.code == 20000) {
          createMetor(requestData).then(response => {
            this.$message.success('绑定成功')
            this.$router.go(-1)
          })
        }
      })
    },
  },
}
</script>

<style lang="scss" scoped>
.create-teacher {
  background: #F4F7FD;
  padding: 20px;
  height: calc(100% - 40px);
}

.go-back-page {
  display: flex;
  margin: 20px 0;

  .back {
    cursor: pointer;
  }
}

.select-mentor-mask {
  display: flex;

  .item {
    color: #333;
    text-align: right;
    font-size: 15px;
    font-weight: 400;
    padding: 10px;
    margin-right: 20px;
    border-radius: 4px;
    background: #FFF;
    cursor: pointer;
  }

  .item-on {
    background-color: #1f64ff;
    color: #fff;
  }
}

.mentor-list-mask {
  height: calc(100% - 121px);
  overflow-y: auto;
  margin-top: 20px;

  .mentor-list-sun {
    margin: -10px;

    .mentor-mask {
      display: flex;
      flex-wrap: wrap;

    }

    .create_me-item {
      width: calc(20% - 60px);
      margin: 10px;
      border-radius: 8px;
      background: #FFF;
      padding: 20px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      color: #1F64FF;
      cursor: pointer;

      i {
        font-size: 24px;
        font-weight: bold;
      }
    }

    .item {
      width: calc(20% - 60px);
      margin: 10px;
      border-radius: 8px;
      background: #FFF;
      padding: 20px 20px 0 20px;

      .mentor-name {
        display: flex;
        align-items: center;
        color: #000;
        font-size: 18px;
        font-weight: 500;
        line-height: 150%;
        /* 27px */

        .img {
          width: 48px;
          height: 48px;
          margin-right: 8px;
        }
      }

      .coonst {
        color: #6D7191;
        font-size: 14px;
        font-weight: 400;
        line-height: 150%;
        /* 21px */
        padding: 8px 0 20px 0;
        border-bottom: 1px solid #EDEEF7;

        .text {
          -webkit-line-clamp: 3;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          overflow: hidden;
          text-overflow: ellipsis;
          height: 63px;
        }
      }

      .function-list {
        display: flex;
        justify-content: space-between;
        margin: 10px 0;
        align-items: center;

        svg {
          margin-left: 35px;
        }
      }
    }
  }
}
</style>