<template>
  <div class="create-teacher">
    <div class="go-back-page">
      <div class="back" @click="$router.go(-1)">
        <i class="el-icon-arrow-left"></i>
        <span>返回</span>
      </div>
    </div>

    <div class="select-mentor-mask">
      <div :class="mentorType == 1 ? 'item item-on' : 'item'" @click="getMetorList(1)">
        推荐导师（{{ mentorList.length }}）
      </div>
      <div :class="mentorType == 2 ? 'item item-on' : 'item'" @click="getMetorList(2)">
        我的专属导师（{{ mentorOrMe.length }}）
      </div>
      <div :class="mentorType == 3 ? 'item item-on' : 'item'" @click="getMetorList(3)">
        我（{{ mineNumber }}）
      </div>
    </div>

    <div class="mentor-list-mask">
      <div class="mentor-list-sun">
        <div class="mentor-mask" v-if="mentorType == 1">
          <div class="item" v-for="(item, i) in mentorList" :key="i">
            <div class="mentor-name">
              <img class="img" :src="httpUrls.ossUrl + item.avatar" alt="" />
              <div class="name">{{ item.character_name }}</div>
            </div>
            <div class="coonst">
              <span class="text">{{ item.introduction }}</span>
            </div>
            <div class="function-list">
              <el-button
                type="text"
                style="padding: 6px 0; width: calc(100% - 1px)"
                @click="toChatPage(item)"
                >去聊天</el-button
              >
              <!-- <div style="height: 18px;width: 1px;background-color: #1f64ff;"></div>
              <el-button type="text" style="padding: 6px 0;width: calc(100% - 1px);" @click="selectMentorToMe(item)">选择导师</el-button> -->
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
        <div class="mentor-mask" v-else-if="mentorType == 2">
          <div class="create_me-item" @click="$router.push('/createMineMentor')">
            <i class="el-icon-plus"></i>
            <div>创建</div>
          </div>
          <div class="item" v-for="(item, i) in mentorOrMe" :key="i">
            <img
              class="delete-img"
              src="../../assets/images/trash.png"
              alt=""
              @click="handleDeleteMentor(item)"
            />
            <div class="mentor-name">
              <img class="img" :src="httpUrls.ossUrl + item.avatar" alt="" />
              <div class="name">{{ item.character_name }}</div>
            </div>
            <div class="coonst">
              <span class="text">{{ item.introduction }}</span>
            </div>
            <div class="function-list">
              <el-button
                type="text"
                style="padding: 6px 0; width: calc(100% - 1px)"
                @click="editMentorItem(item)"
                >编辑</el-button
              >
              <el-button
                type="text"
                style="padding: 6px 0; width: calc(100% - 1px)"
                @click="toChatPage(item)"
                >去聊天</el-button
              >
            </div>
          </div>
        </div>
        <div class="mentor-mask" v-else>
          <!-- <div class="create_me-item" @click="$router.push('/createMineMentor')">
            <i class="el-icon-plus"></i>
            <div>创建</div>
          </div> -->
          <div class="item" v-for="(item, i) in mineNumberList" :key="i">
            <!-- <img
              class="delete-img"
              src="../../assets/images/trash.png"
              alt=""
              @click="deleteMe(item)"
            /> -->
            <div class="mentor-name">
              <img class="img" :src="httpUrls.ossUrl + item.photo" alt="" />
              <div class="name">{{ item.name }}</div>
            </div>
            <div class="coonst">
              <span class="text">{{ item.greeting }}</span>
            </div>
            <div class="function-list">
              <el-button
                type="text"
                style="padding: 6px 0; width: calc(100% - 1px)"
                @click="editMeItem(item)"
                >编辑</el-button
              >
              <el-button
                type="text"
                style="padding: 6px 0; width: calc(100% - 1px)"
                @click="toChatPage(item)"
                >去聊天</el-button
              >
              <!-- <el-button type="text" style="padding: 6px 0;width: calc(100% - 1px);" @click="selectMentorToMe(item)">选择导师</el-button> -->
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
import httpUrls from "../../api/requestURL";
import {
  getMentorMe,
  getMetorList,
  createMetor,
  deleteMentorMe,
  deleteMentor,
  batchMeTutor,
} from "../../api/mentor";

export default {
  name: "create-teacher",
  data() {
    return {
      httpUrls,
      mentorItemMsg: {},
      mentorType: 1,
      mentorList: [],
      mentorNumber: 0,
      mineMentorList: [],
      mineMentorNumber: 0,
      mineNumberList: [],
      mineNumber: 0,
      mentorOrMe: [],
    };
  },

  created() {
    let userInfo = JSON.parse(localStorage.getItem("userInfo"));
    // console.log(userInfo)
    this.getMetorList(2);
    this.getMetorList(1);
    this.getMentorMe();
  },

  mounted() {
    this.mentorItemMsg = JSON.parse(sessionStorage.getItem("ADD_MENTOR_ITEM_MESSAGE"));
  },
  methods: {
    //删除我的专属导师
    handleDeleteMentor(val) {
      console.log(val, "删除导师");
      let requestData = {
        user_id: val.user_id,
        me_id: val.me_id,
        tutor_id: val.tutor_id,
      };
      this.$confirm("是否删除该导师?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          deleteMentor(requestData).then((res) => {
            console.log(res);
            if (res.code == 20000) {
              this.getMentorMe();
              this.$message({
                type: "success",
                message: "删除成功!",
              });
            } else {
              this.$message({
                type: "error",
                message: "网络异常，请稍后重试",
              });
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    // 获取“我”
    getMentorMe() {
      let userInfo = JSON.parse(localStorage.getItem("userInfo"));
      // console.log(userInfo)
      let data = `user_id=${userInfo.user_id}&page_index=1&page_count=5`;
      getMentorMe(data).then((res) => {
        this.mineNumber = res.total;
        if (res.data.length == 0 || res.data == null) {
          this.mineNumberList = [];
        } else {
          this.mineNumberList = res.data;
        }
        let meId = [];
        res.data.forEach((v) => {
          meId.push(v.me_id);
        });
        batchMeTutor({ me_ids: JSON.stringify(meId) }).then((response) => {
          console.log(response, "--我的专属导师");
          if (response.code == 20000) {
            this.mentorOrMe = response.data[0].tutor.filter(
              (item) => item.character_name != undefined && item.character_name != null
            );
          }
          //  = response.data
        });
      });
    },
    // 获取推荐导师列表
    getMetorList(type) {
      this.mentorType = type;
      let userInfo = JSON.parse(localStorage.getItem("userInfo"));
      // console.log(userInfo)

      let data = "";
      if (type == 1) {
        data = `is_built_in=1`;
      } else {
        data = `user_id=${userInfo.user_code}&get_all=1`;
      }
      getMetorList(data).then((res) => {
        if (type == 1) {
          this.mentorList = res.data;
          this.mentorNumber = res.total;
        } else {
          this.mineMentorList = res.data;
          this.mineMentorNumber = res.total;
        }
      });
    },

    toChatPage(item) {
      let data = {
        avatar: this.mentorType != 3 ? item.avatar : item.photo,
        character_name: item.character_name,
        document: item.document,
        greeting: item.greeting,
        image: item.image,
        implicit_hint: item.implicit_hint,
        influence: item.influence,
        introduction: item.introduction,
        is_built_in: item.is_built_in,
        me_id: item.me_id,
        sort: item.sort,
        tutor_id: item.tutor_id,
        user_id: item.user_id,
        website: item.website,
      };
      sessionStorage.setItem("MENTOR_ITEM_MESSAGE", JSON.stringify(data));
      this.$router.push("/mentorChat");
    },

    editMentorItem(item) {
      sessionStorage.setItem("EDIT_MENTOR_ITEM_MESSAGE", JSON.stringify(item));
      this.$router.push("/createMineMentor");
    },

    deleteMe(item) {
      deleteMentorMe({ user_id: item.user_id, me_id: item.me_id }).then((res) => {
        if (res.code == 20000) {
          this.$message.success("删除成功");
          this.mineNumberList.forEach((v, i) => {
            if (v.me_id == item.me_id) {
              this.mineNumberList.splice(i, 1);
            }
          });
        }
      });
    },

    // 修改我
    editMeItem(item) {
      sessionStorage.setItem("EDIT_ME_ITEM_MSG", JSON.stringify(item));
      this.$router.push("/createMentor");
    },

    selectMentorToMe(item) {
      const userInfor = JSON.parse(localStorage.getItem("userInfo"));
      let data = {
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
      };
      createMetor(data).then((res) => {
        console.log(res);
        if (res.code == 20000) {
          this.$message.success("绑定成功");
          this.$router.go(-1);
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.create-teacher {
  background: #f4f7fd;
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
    background: #fff;
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
    width: calc(100% - 10px);

    .mentor-mask {
      display: flex;
      flex-wrap: wrap;
    }

    .create_me-item {
      width: calc(20% - 60px);
      margin: 10px;
      border-radius: 8px;
      background: #fff;
      padding: 20px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      color: #1f64ff;
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
      background: #fff;
      padding: 20px 20px 0 20px;
      position: relative;

      .delete-img {
        position: absolute;
        right: 10px;
        top: 10px;
        cursor: pointer;
        width: 20px;
        height: 20px;
      }

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
        color: #6d7191;
        font-size: 14px;
        font-weight: 400;
        line-height: 150%;
        /* 21px */
        padding: 8px 0 20px 0;
        border-bottom: 1px solid #edeef7;

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
