<template>
  <div id="main">
    <!-- <div class="go-back">
      <div @click="$router.go(-1)" class="go_back-item">
        <img
          style="width: 10px; transform: rotateZ(180deg)"
          src="../../assets/images/right.png"
          alt=""
        />
        <span style="margin-left: 8px">返回</span>
      </div>
    </div> -->
    <div class="left">
      <!-- 导航栏 -->
      <el-menu
        class="el-menu-vertical-demo"
        unique-opened
        background-color="#FFFFFF"
        text-color="#333"
        active-text-color="#1f64ff"
        :default-active="menuIndex"
        @select="selectMenu"
      >
        <el-submenu index="1">
          <template slot="title">
            <span style="color: #1f64ff; font-size: 16px; font-weight: 600"
              >我的智能体</span
            >
          </template>
          <template
            v-if="menus && menus.agent && Object.keys(menusAgent).length"
          >
            <el-menu-item
              :index="item[Object.keys(item)][0]['group_id']"
              :class="
                menuIndex == item[Object.keys(item)][0]['group_id']
                  ? 'menu-items'
                  : ''
              "
              v-for="(item, index) in menusAgent"
              :key="index"
            >
              <div class="menuBox">
                <div
                  :style="
                    menuIndex == item[Object.keys(item)][0]['group_id']
                      ? 'color: #1f64ff'
                      : ''
                  "
                >
                  {{ Object.keys(item)[0] }}
                </div>
                <div>
                  <i
                    class="el-icon-edit"
                    :style="
                      menuIndex == item[Object.keys(item)][0]['group_id']
                        ? 'color: rgb(31, 100, 255);'
                        : 'color: black;'
                    "
                    @click.stop="
                      (menuTwoIndex = '1-1'),
                        handleEditMenu(item[Object.keys(item)][0])
                    "
                  ></i>
                  <i
                    class="el-icon-delete"
                    :style="
                      menuIndex == item[Object.keys(item)][0]['group_id']
                        ? 'color: rgb(31, 100, 255);'
                        : 'color: black;'
                    "
                    @click.stop="
                      (menuTwoIndex = '1-1'),
                        handleDeleteMenu(item[Object.keys(item)][0])
                    "
                  ></i>
                </div>
              </div>
            </el-menu-item>
          </template>
          <div class="createdMenu" @click="handleCreatedMenu">
            <i class="el-icon-plus"></i>
            <span>新建分组</span>
          </div>
        </el-submenu>
      </el-menu>
    </div>
    <div class="right">
      <!-- AI智能体 -->
      <div class="knowledgeChat">
        <div class="right-title">
          <div>
            <div class="line"></div>
            <div>{{ group_name }}</div>
          </div>
          <div>点击AI智能体开启对话，帮助您工作学习提高效率</div>
        </div>
        <!-- 创建AI智能体 -->
        <div class="createdChat">
          <div
            class="created-box"
            @click="$router.push('/knowledge/knowledgeCreatedChat')"
          >
            <i class="el-icon-plus" style="font-size: 28px; color: #999"></i>
          </div>
          <div class="created-text">创建AI智能体</div>
        </div>
        <!-- AI智能体栏目 -->
        <div
          class="knowledgeChat-column"
          :key="index"
          v-for="(item, index) in knowledgeChatData"
        >
          <!-- 栏目标题 -->
          <div class="column-title">{{ item.title }}</div>
          <!-- 栏目主体内容 -->
          <div class="column-content">
            <div
              class="column-box"
              v-for="child in item.arr"
              :key="child.title"
              @click.stop="toChat(child)"
            >
              <img :src="httpUrls.ossUrl + child.avatar_url" alt="" />
              <div>
                <div @click.stop>
                  <div>{{ child.agent_name }}</div>
                  <div>
                    <el-popover placement="right" width="80" trigger="click">
                      <!-- <div style="position: relative"> -->
                      <div class="popover">
                        <div
                          style="cursor: pointer"
                          @click.stop="toEdit(child)"
                        >
                          <i class="el-icon-edit" style="margin-right: 8px"></i
                          >编辑
                        </div>
                        <div
                          style="cursor: pointer"
                          @click.stop="handleDeleteAgent(child)"
                        >
                          <i
                            class="el-icon-delete"
                            style="margin-right: 8px"
                          ></i
                          >删除
                        </div>
                      </div>
                      <!-- </div> -->
                      <img
                        slot="reference"
                        :src="
                          httpUrls.ossUrl +
                          'static/picture/d864fc17-e118-4133-87d2-c7bf02e8b905.png'
                        "
                        alt=""
                      />
                    </el-popover>
                  </div>
                </div>
                <div>{{ child.agent_desc }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- 知识库 -->
      <div class="knowledge">
        <div class="knowledge-title">
          <div class="right-title">
            <div>
              <div class="line"></div>
              <div>知识库</div>
            </div>
            <div>知识库内容会被AI智能体应用，并用于回答问题</div>
          </div>
          <div>API文档</div>
        </div>
        <div class="knowledge-content">
          <div
            class="knowledge-box"
            @click="
              $router.push('/knowledge/knowledge'),
                $store.dispatch('app/changeknowledgeLabel', '图片库')
            "
          >
            <img
              :src="
                httpUrls.ossUrl +
                'static/picture/bb15d89b-cf95-48ef-bf68-e658fdf599eb.png'
              "
              alt=""
            />
            <div>图片库</div>
            <div>上传图片，编辑图片标签</div>
          </div>
          <div
            class="knowledge-box"
            @click="
              $router.push('/knowledge/knowledge'),
                $store.dispatch('app/changeknowledgeLabel', '文档库')
            "
          >
            <img
              :src="
                httpUrls.ossUrl +
                'static/picture/cc1ebfb3-d87d-44ec-999d-bcf4bd733d18.png'
              "
              alt=""
            />
            <div>文档库</div>
            <div>上传docx、pdf、xlsx、ppt、txt、md文件</div>
          </div>
          <div
            class="knowledge-box"
            @click="
              $router.push('/knowledge/knowledge'),
                $store.dispatch('app/changeknowledgeLabel', '网址库')
            "
          >
            <img
              :src="
                httpUrls.ossUrl +
                'static/picture/6776eeb7-7aef-4cf5-bad0-531be6dddc15.png'
              "
              alt=""
            />
            <div>网址库</div>
            <div>导入网站网址</div>
          </div>
        </div>
      </div>
    </div>
    <knowledgeDialog
      ref="knowledgeDialog"
      @menu="initMenu()"
      @data="init()"
      :title.sync="knowledgeDialogTitle"
      :type.sync="knowledgeDialogType"
      :data.sync="knowledgeDialogObject"
    ></knowledgeDialog>
    <register ref="Register"></register>
  </div>
</template>
<script>
import httpUrls from "../../api/requestURL";
import knowledgeDialog from "../../components/knowledgeDialog.vue";
import {
  getKnowledgeModel,
  getModelGroups,
  deleteModel,
} from "../../api/knowledge";
import Register from "../../components/register";
export default {
  name: "knowledgeChat",
  data() {
    return {
      httpUrls,
      //智能体栏目数据
      knowledgeChatData: [],
      knowledgeDialogTitle: "", //弹出框标题
      knowledgeDialogType: 0, //弹出框类型/编辑/删除/添加
      knowledgeDialogObject: {}, //弹出框数据

      menus: {}, //分组数据
      menusAgent: [], //智能体分组数据
      menuIndex: "",
    };
  },
  components: {
    knowledgeDialog,
    Register,
  },
  created() {
    // this.loginRoNot()
    // let requestData = `user_id=${JSON.parse(localStorage.getItem('userInfo'))['user_id']}`
    // getModelGroups(requestData).then(res => {
    //   console.log(res)
    // })
    // this.init()
    this.initMenu();
    // this.init()
  },
  computed: {
    group_name() {
      //分组名称
      let name = "";
      this.menusAgent.some((item) => {
        // 使用 Object.entries 代替 Object.keys，可以同时得到键和值
        return Object.entries(item).some(([child, value], index) => {
          if (value[0].group_id == this.menuIndex) {
            name = value[0].group_name;
            return true; // 如果找到了匹配的项，返回 true 来停止遍历
          }
        });
      });
      // console.log(name,'分组名称')
      return name;
    },
  },
  mounted() {
    this.loginRoNot();
  },
  methods: {
    loginRoNot() {
      let userinfo = JSON.parse(localStorage.getItem("userInfo"));
      if (userinfo.role !== "user") {
        this.$message({
          message: "当前尚未登录，请先登录",
          type: "warning",
        });
        this.$refs.Register.registerVisible = true;
        return false;
      } else {
        return true;
      }
    },
    initMenu() {
      let requestData = `user_id=${
        JSON.parse(localStorage.getItem("userInfo")).user_id
      }`;
      getModelGroups(requestData).then((res) => {
        this.menus = res.data;
        let dataAgent = res.data["agent"];

        this.menusAgent = Object.keys(dataAgent).map((key) => ({
          [key]: dataAgent[key],
        }));
        console.log(this.menusAgent);
        if (this.menusAgent.length) {
          this.menuIndex =
            this.menusAgent[0][Object.keys(this.menusAgent[0])][0]["group_id"];
        }

        let menusAgentBool = false;

        //判断服务器中是否有本地分组
        this.menusAgent.map((item) => {
          Object.keys(item).forEach((k) => {
            let menuAgent = JSON.parse(localStorage.getItem("menuAgent"));
            if (menuAgent && menuAgent["groupName"] == k) {
              menusAgentBool = true;
              return;
            }
          });
        });

        if (JSON.parse(localStorage.getItem("menuAgent")) && !menusAgentBool) {
          let num = Math.floor(100000 + Math.random() * 900000); //随机数/临时分组ID
          // console.log(JSON.parse(localStorage.getItem('menuAgent'))['groupName'],'123465789')
          let menuObj = {
            [JSON.parse(localStorage.getItem("menuAgent"))["groupName"]]: [
              {
                group_id: num.toString(),
                group_order: this.menusAgent.length + 1,
                group_name: JSON.parse(localStorage.getItem("menuAgent"))[
                  "groupName"
                ],
                group_desc: JSON.parse(localStorage.getItem("menuAgent"))[
                  "groupDesc"
                ],
                bool: true,
              },
            ],
          };
          this.menusAgent.push(menuObj);
        }
        this.init();
      });
    },
    init() {
      let group_order = 1;
      //获取当前选中分组数据
      Object.keys(this.menus["agent"]).map((child) => {
        this.menus["agent"][child].map((k) => {
          // k --当前分组数据
          if (this.menuIndex == k.group_id) {
            group_order = k.group_order;
            // group_id = this.menuIndex;
          }
        });
      });
      let tableRequestData = `group_id=${
        this.menuIndex
      }&group_order=${group_order}&user_id=${
        JSON.parse(localStorage.getItem("userInfo")).user_id
      }`;
      getKnowledgeModel(tableRequestData).then((res) => {
        let newArr = [];
        Object.keys(res.data).map((key) => {
          let obj = {
            title: key,
            arr: [],
          };
          Object.keys(res.data[key]).map((item) => {
            console.log(item, "--数据");
            obj.arr.push(res.data[key][item]);
          });
          newArr.push(obj);
        });
        // console.log(newArr,'处理后数组')
        this.knowledgeChatData = newArr;
      });
    },
    //选中菜单项
    selectMenu(index, indexPath) {
      this.menuIndex = index;
      console.log(index);
      this.init();
    },
    //新建分组
    handleCreatedMenu() {
      let obj = {
        menuIndex: "11111",
      };
      this.$confirm(
        "新建完分组后请添加内容，否则下次新建分组时将替换此前无内容的分组！",
        "提醒！",
        {
          confirmButtonText: "确定",
          cancelButtonText: "添加内容",
        }
      )
        .then(() => {
          this.knowledgeDialogObject = obj;
          this.knowledgeDialogTitle = "创建分组";
          this.knowledgeDialogType = 1;
          this.$refs.knowledgeDialog.dialogVisible = true;
        })
        .catch(() => {});
    },
    //编辑分组
    handleEditMenu(item) {
      let menuStatus = null; //分组状态，0本地，1真实分组
      //判断当前行分组名称是否等于本地分组
      let menuAgent = JSON.parse(localStorage.getItem("menuAgent"));
      if (menuAgent && menuAgent["groupName"] == item.group_name) {
        menuStatus = 0;
      } else {
        menuStatus = 1;
      }
      let obj = {
        group_id: item.group_id,
        group_name: item.group_name,
        group_desc: item.group_desc,
        user_id: JSON.parse(localStorage.getItem("userInfo"))["user_id"],
        menuStatus,
        menuIndex: 3214568,
      };
      this.$store.dispatch("app/changeknowledgeLabel", "AI智能体");
      this.knowledgeDialogObject = obj;
      this.knowledgeDialogTitle = "编辑分组";
      this.knowledgeDialogType = 3;
      this.$refs.knowledgeDialog.dialogVisible = true;
    },
    //删除分组
    handleDeleteMenu(item) {
      console.log(item, "当前行数据");
      this.$confirm(`此操作将永久删除该文件, 是否继续?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          if (item.bool) {
            //有bool值说明是本地分组
            localStorage.setItem("menuAgent", null);
            this.$message.success("删除成功");
            this.initMenu();
          } else {
            console.log(item);
            let requestData = {
              group_id: item.group_id,
              user_id: JSON.parse(localStorage.getItem("userInfo"))["user_id"],
            };
            deleteModel(requestData).then((res) => {
              if (res.code == 20000) {
                this.$message.success("删除成功！");
                this.initMenu();
              } else {
                this.$message.error(res.msg);
              }
            });
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
      // this.knowledgeDialogTitle = "系统提示";
      // this.knowledgeDialogType = 0;
      // this.$refs.knowledgeDialog.dialogVisible = true;
    },
    //前往对话页面
    toChat(item) {
      let userInfo = JSON.parse(localStorage.getItem("userInfo"));
      //获取分组当前数据
      let group_order = null;
      this.menusAgent.some((item) => {
        // 使用 Object.entries 代替 Object.keys，可以同时得到键和值
        return Object.entries(item).some(([child, value], index) => {
          if (value[0].group_id == this.menuIndex) {
            group_order = value[0]["group_order"];
            return true; // 如果找到了匹配的项，返回 true 来停止遍历
          }
        });
      });
      let requestData = `user_id=${userInfo.user_id}&group_id=${this.menuIndex}&group_order=${group_order}`;
      getKnowledgeModel(requestData).then((res) => {
        Object.keys(res.data).map((key) => {
          Object.keys(res.data[key]).map((child) => {
            if (res.data[key][child].agent_id == item.agent_id) {
              console.log(res.data[key][child], "当前数据");
              localStorage.setItem(
                "chatKnowledge",
                JSON.stringify(res.data[key][child])
              );
              this.$router.push("/knowledge/knowledgeChat");
              this.$store.dispatch("app/changeSelectChat", "4");
            }
          });
        });
      });
    },
    //编辑智能体
    toEdit(item) {
      let userInfo = JSON.parse(localStorage.getItem("userInfo"));
      //获取分组当前数据
      let group_order = null;
      this.menusAgent.some((item) => {
        // 使用 Object.entries 代替 Object.keys，可以同时得到键和值
        return Object.entries(item).some(([child, value], index) => {
          if (value[0].group_id == this.menuIndex) {
            group_order = value[0]["group_order"];
            return true; // 如果找到了匹配的项，返回 true 来停止遍历
          }
        });
      });
      let requestData = `user_id=${userInfo.user_id}&group_id=${this.menuIndex}&group_order=${group_order}`;
      console.log(requestData, "请求参数");
      getKnowledgeModel(requestData).then((res) => {
        Object.keys(res.data).map((key) => {
          Object.keys(res.data[key]).map((child) => {
            if (res.data[key][child].agent_id == item.agent_id) {
              localStorage.setItem(
                "editKnowledge",
                JSON.stringify(res.data[key][child])
              );
              this.$router.push("/knowledge/knowledgeCreatedChat");
            }
          });
        });
      });
    },
    //删除智能体
    handleDeleteAgent(item) {
      let requestData = {
        group_id: this.menuIndex,
        user_id: JSON.parse(localStorage.getItem("userInfo"))["user_id"],
        agent_id: item.agent_id,
      };
      this.$confirm(
        `是否删除【${item.agent_name}】智能体？, 删除后将无法恢复数据`,
        "系统提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      )
        .then(() => {
          // this.$message({
          //   type: 'success',
          //   message: '删除成功!'
          // });
          deleteModel(requestData).then((res) => {
            if (res.code == 20000) {
              this.$message.success("删除成功！");
              this.init();
            } else {
              this.$message.error(res.msg);
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
  },
};
</script>
<style scoped lang="scss">
.el-menu{
  width: 100%;
  background: red;
  border: 0px solid #ccc;
}
.el-popover {
  width: 80px !important;
  padding: 0px !important;
  min-width: 0px !important;
}
.el-menu-item {
  display: flex;
  justify-content: flex-end;
}
.menuBox {
  width: calc(100% - 20px);
  height: 100%;
  display: flex;
  justify-content: space-between;
}
.el-popover-self {
  min-width: 20px !important;
  padding: 0px !important;
  background: red !important;
}
.popover {
  width: 80px;
  background: #fff;
  border-radius: 4px;
  box-shadow: 0px 5px 20px 0px rgba(51, 51, 51, 0.05);
  z-index: 100;
  > div {
    padding: 8px 0px;
    text-align: center;
  }
  > div:first-child {
    border-bottom: 1px solid #ccc;
  }
}
#main {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  background: rgb(241, 242, 245);
  padding: 20px;
  display: flex;
  // justify-content: space-between;
  gap: 20px;
  position: relative;
  .go-back {
    position: absolute;
    left: 20px;
    top: 10px;
    cursor: pointer;

    .go_back-item {
      display: flex;
      align-items: center;
      cursor: pointer;
      transition: all 0.2s;
    }
  }

  .left {
    width: 240px;
    height: 100%;
    background: #fff;
    border-radius: 4px;
    padding: 0px 15px;
    box-sizing: border-box;
    display: flex;
    justify-content: center;
    overflow-y: auto;
    .createdMenu {
      margin-top: 5px;
      text-align: center;
      cursor: pointer;
      span {
        color: #000;
        font-family: PingFang SC;
        font-size: 14px;
        font-style: normal;
        font-weight: 400;
        line-height: 150%; /* 21px */
      }
    }
  }
  .right {
    width: calc(100% - 240px - 20px);
    height: 100%;
    border-radius: 4px;
    > div {
      padding: 20px;
      box-sizing: border-box;
      border-radius: 4px;
      background: #fff;
    }
    .line {
      width: 3px;
      height: 16px;
      background: #1f64ff;
      margin-right: 10px;
    }
    .right-title {
      > div:first-child {
        display: flex;
        align-items: center;
        div:last-child {
          color: #393e45;
          font-family: PingFang SC;
          font-size: 16px;
          font-style: normal;
          font-weight: 600;
          line-height: 24px; /* 24px */
        }
      }
      > div:last-child {
        margin-top: 2px;
        color: #b7b9c0;
        font-family: PingFang SC;
        font-size: 12px;
        font-style: normal;
        font-weight: 400;
        line-height: 150%; /* 18px */
      }
    }
    .knowledgeChat {
      width: 100%;
      height: 70%;
      overflow-y: auto;
      .createdChat {
        width: 360px;
        height: 136px;
        flex-shrink: 0;
        border-radius: 8px;
        background: #f5f5f5;
        display: flex;
        align-items: center;
        padding-left: 24px;
        margin-top: 15px;
        box-sizing: border-box;
        .created-box {
          width: 88px;
          height: 88px;
          border-radius: 50%;
          border: 0.926px dashed #e7e7e7;
          background: #fff;
          display: flex;
          justify-content: center;
          align-items: center;
          cursor: pointer;
        }
        .created-text {
          color: #202123;
          font-family: PingFang SC;
          font-size: 16px;
          font-style: normal;
          font-weight: 500;
          line-height: 150%; /* 24px */
          margin-left: 16px;
        }
      }
      .knowledgeChat-column {
        margin-top: 13px;
        width: 100%;
        .column-title {
          margin-bottom: 12px;
          color: #393e45;
          font-family: PingFang SC;
          font-size: 16px;
          font-style: normal;
          font-weight: 600;
          line-height: 150%; /* 24px */
        }
        .column-content {
          width: 100%;
          // height: 116px;
          display: grid;
          justify-content: space-between;
          grid-template-columns: repeat(auto-fill, calc(33% - 10px));
          grid-gap: 0 1px;
          // justify-content: space-between;
          .column-box {
            cursor: pointer;
            width: 100%;
            height: 116px;
            border-radius: 10px;
            background: #f5f5f5;
            padding: 0px 20px;
            box-sizing: border-box;
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-bottom: 13px;
            > img {
              width: 80px;
              height: 80px;
              border-radius: 50%;
            }
            > div {
              width: calc(100% - 80px - 15px);
              height: 80px;
              > div:first-child {
                width: 100%;
                display: flex;
                justify-content: space-between;
                align-items: center;
                div:first-child {
                  color: #202123;
                  font-family: PingFang SC;
                  font-size: 16px;
                  font-style: normal;
                  font-weight: 500;
                  line-height: 24px; /* 24px */
                  overflow: hidden;
                  text-overflow: ellipsis;
                  display: -webkit-box;
                  -webkit-line-clamp: 1;
                  -webkit-box-orient: vertical;
                }
                img {
                  cursor: pointer;
                }
              }
              > div:last-child {
                margin-top: 6px;
                color: #2c2c2e;
                font-family: PingFang SC;
                font-size: 14px;
                font-style: normal;
                font-weight: 400;
                line-height: 150%; /* 21px */
                overflow: hidden;
                text-overflow: ellipsis;
                display: -webkit-box;
                -webkit-line-clamp: 2;
                -webkit-box-orient: vertical;
              }
            }
          }
        }
      }
    }
    .knowledge {
      margin-top: 20px;
      width: 100%;
      height: calc(100% - 70% - 20px);
      .knowledge-title {
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: calc(90% - 20px);
        .right-title {
          width: 70%;
        }
        > div:last-child {
          cursor: pointer;
          display: inline-flex;
          height: 22px;
          padding: 7px 10px;
          justify-content: center;
          align-items: center;
          gap: 10px;
          flex-shrink: 0;
          border-radius: 8px;
          border: 1px solid #e5e5e5;
          color: #666;
          text-align: center;
          font-family: "PingFang SC";
          font-size: 12px;
          font-style: normal;
          font-weight: 400;
        }
      }
      .knowledge-content {
        display: flex;
        margin-top: 20px;
        .knowledge-box {
          cursor: pointer;
          border-radius: 8px;
          margin-right: 20px;
          width: calc(30% - 20px);
          padding: 10px 10px;
          box-sizing: border-box;
          img {
            width: 32px;
            height: 32px;
          }
          div:nth-child(2) {
            color: #333;
            font-family: PingFang SC;
            font-size: 18px;
            font-style: normal;
            font-weight: 500;
            line-height: 27px; /* 27px */
          }
          div:nth-child(3) {
            overflow: hidden;
            color: #666;
            text-overflow: ellipsis;
            font-family: PingFang SC;
            font-size: 14px;
            font-style: normal;
            font-weight: 400;
            line-height: 21px; /* 21px */
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
          }
        }
        .knowledge-box:nth-child(1) {
          background: #e5edff;
        }
        .knowledge-box:nth-child(2) {
          background: rgba(0, 199, 119, 0.1);
        }
        .knowledge-box:nth-child(3) {
          background: #fff9e6;
        }
      }
    }
  }
}
</style>