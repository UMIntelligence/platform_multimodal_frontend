<template>
  <div class="main">
    <GoBack></GoBack>
    <div class="list_mask">
      <div
        v-if="recentlyUseingList.length == 0"
        style="width: 100%; display: flex; justify-content: center"
      >
        <el-empty description="暂无数据" :image-size="88"></el-empty>
      </div>

      <div
        class="item"
        v-for="(item, i) in recentlyUseingList"
        @click="toPage(item)"
        :key="i"
      >
        <img
          v-if="
            item.type_code != 'real_time' &&
            item.type_code != 'real_file' &&
            item.image_url != '' &&
            item.image_url != undefined
          "
          class="imgs"
          :src="httpUrls.ossUrl + item.image_url"
          alt=""
        />
        <img
          v-else-if="item.type_code == 'chat'"
          class="imgs"
          src="../../assets/images/Frame427319895.png"
          alt=""
        />
        <img
          v-else-if="item.type_code == 'celebrity' || item.type_code == 'assistant'"
          class="imgs"
          src="../../assets/images/Frame427319897.png"
          alt=""
        />
        <img
          v-else-if="item.type_code == 'real_time' || item.type_code == 'real_file'"
          class="imgs"
          src="../../assets/images/Frame427319896.png"
          alt=""
        />
        <img
          v-else-if="item.type_code == 'cdu'"
          class="imgs"
          src="../../assets/images/frame2132323.png"
          alt=""
        />
        <div class="name">{{ item.name }}</div>
        <div class="titles">{{ item.title }}</div>
        <div class="time">{{ item.create_time }}</div>
      </div>
    </div>
  </div>
</template>
<script>
import GoBack from "../../components/goBack";
import { footprint } from "../../api/chatMG";
import httpUrls from "../../api/requestURL";

export default {
  name: "visited",
  data() {
    return {
      recentlyUseingList: [], //最近打开
      httpUrls,
    };
  },
  components: {
    GoBack,
  },
  created() {
    this.init();
  },
  methods: {
    init() {
      footprint().then((res) => {
        res.data.data.forEach((v) => {
          if (v.type_code == "chat") {
            if (v.type_name == "提示词大全") {
              console.log("ljh");
              v.name = "提示词大全";
            } else {
              v.name = "聊天";
            }
          } else if (v.type_code == "image") {
            v.name = "AI绘画";
          } else if (v.type_code == "celebrity") {
            v.name = "助理中心";
          } else if (v.type_code == "assistant") {
            v.name = "助理中心";
          } else if (v.type_code == "cdu") {
            v.name = "彩超宝宝";
          } else if (v.type_code == "real_time") {
            v.name = "实时录音";
          } else if (v.type_code == "real_file") {
            v.name = "音视频转写";
          }
        });
        if (this.page == 1) {
          this.recentlyUseingList = res.data.data;
        } else {
          this.recentlyUseingList = this.recentlyUseingList.concat(res.data.data);
        }
      });
    },
    toPage(item) {
      console.log(item, "跳转");
      if (item.type_code == "chat") {
        // 对话
        if (item.type_name == "chatGLM") {
          this.$router.push({
            name: "chat",
            params: {
              id: 8,
              speakId: item.eid,
            },
          });
        } else if (item.type_name == "文心一言") {
          this.$router.push({
            name: "chat",
            params: {
              id: 4,
              speakId: item.eid,
            },
          });
        } else if (item.type_name == "讯飞星火") {
          this.$router.push({
            name: "chat",
            params: {
              id: 5,
              speakId: item.eid,
            },
          });
        } else if (item.type_name == "通义千问") {
          this.$router.push({
            name: "chat",
            params: {
              id: 10,
              speakId: item.eid,
            },
          });
        } else if (item.type_name == "360智脑") {
          this.$router.push({
            name: "chat",
            params: {
              id: 12,
              speakId: item.eid,
            },
          });
        } else if (item.type_name == "商汤日日新") {
          this.$router.push({
            name: "chat",
            params: {
              id: 11,
              speakId: item.eid,
            },
          });
        } else if (item.type_name == "AI40") {
          this.$router.push({
            name: "laboratoryChat",
            params: {
              id: 1,
              speakId: item.eid,
            },
          });
        } else if (item.type_name == "AI35") {
          this.$router.push({
            name: "laboratoryChat",
            params: {
              id: 0,
              speakId: item.eid,
            },
          });
        } else if (item.type_name == "火山云雀") {
          this.$router.push({
            name: "chat",
            params: {
              id: 1000,
              speakId: item.eid,
            },
          });
        } else if (item.type_name == "对话") {
          this.$router.push({
            name: "chat",
            params: {
              id: 12,
              speakId: item.eid,
            },
          });
        } else if (item.type_name == "腾讯混元") {
          this.$router.push({
            name: "chat",
            params: {
              id: 1001,
              speakId: item.eid,
            },
          });
        } else if (item.type_name == "文档对话") {
          this.$router.push("/document/chat");
        } else if (item.type_name == "导师对话") {
          this.$router.push({
            path: `/mentorChat?eid=${item.eid}`,
          });
        } else if (item.type_name == "提示词大全") {
          this.$router.push({
            path: `/templateSelect/templateSelect`,
          });
        }
      } else if (item.type_code == "image") {
        // 绘画
        // this.$router.push('/drawChat/drawChat')
        if (item.type_name == "Stable Diffusion") {
          this.$router.push({
            name: "AI绘画",
            params: {
              id: 9,
              speakId: item.eid,
            },
          });
        } else if (item.type_name == "Midjourney") {
          this.$router.push({
            name: "AI绘画",
            params: {
              id: 6,
              speakId: item.eid,
            },
          });
        } else if (item.type_name == "百度绘画") {
          this.$router.push({
            name: "AI绘画",
            params: {
              id: 3,
              speakId: item.eid,
            },
          });
        } else if (item.type_name == "通义万相") {
          this.$router.push({
            name: "AI绘画",
            params: {
              id: 13,
              speakId: item.eid,
            },
          });
        } else if (item.type_name == "火山引擎") {
          this.$router.push({
            name: "AI绘画",
            params: {
              id: 14,
              speakId: item.eid,
            },
          });
        } else {
          this.$router.push(`/vision/vision?title=${item.type_name}&eid=${item.eid}`);
        }
      } else if (item.type_code == "celebrity") {
        this.$router.push("/templateSelect/templateSelect");
        sessionStorage.setItem("applicationId", 4);
      } else if (item.type_code == "assistant") {
        this.$router.push("/templateSelect/templateSelect");
        sessionStorage.setItem("applicationId", 3);
      } else if (item.type_code == "cdu") {
        this.$router.push("/drawChat/fourDUltrasound");
      } else if (item.type_code == "real_time") {
        this.$router.push("/convert/index");
      } else if (item.type_code == "real_file") {
        this.$router.push("/convert/index");
      }
    },
  },
};
</script>
<style scoped>
.main {
  width: 100%;
  height: 100%;
  padding: 30px 60px;
  box-sizing: border-box;
  position: relative;
}
.list_mask {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-items: flex-start;
  /* align-content: flex-start; */
}
.list_mask .item {
  width: 200px;
  height: 188px;
  border-radius: 8px;
  border: 1px solid #e9e9eb;
  position: relative;
  /* margin-right: 20px; */
}

.list_mask .item .imgs {
  width: auto;
  height: 118px;
  box-sizing: border-box;
  /* border: 1px solid #000; */
  border-radius: 8px;
  position: relative;
  left: 50%;
  transform: translate(-50%);
}

.list_mask .item .name {
  border-radius: 7px 0px;
  background: #1f64ff;
  padding: 4px;
  position: absolute;
  left: 0;
  top: 0;
  color: #ffffff;
}

.list_mask .item .titles {
  color: #19191a;
  font-size: 14px;
  font-weight: 500;
  margin: 7px 0 7px 12px;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}

.list_mask .item .time {
  color: #8b8c8f;
  font-size: 12px;
  font-weight: 500;
  margin-left: 12px;
}
</style>
