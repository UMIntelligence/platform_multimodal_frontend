<template>
    <div style="background: #F6F8FA; padding: 30px 30px 50px 30px; min-height: 100vh;">
        <div class="page_top">
            <div class="top_l">AI PPT</div>
            <div class="top_r">
                <el-input
                    placeholder="搜索"
                    suffix-icon="el-icon-search"
                    v-model="search_val"
                    @change="getPptList"
                    >
                </el-input>
            </div>
        </div>

        <div style="padding: 10px 0;">
            <el-image style="width: 100%; height: 158px; border-radius: 10px;" :src="sloveImg" fit="fill"></el-image>
        </div>

        <div class="start_add" @click="addPPT">
            <div class="add_title">快速创作</div>
            <el-image style="width: 250px; height: 212px; border-radius: 10px;" :src="addImg" fit="fill"></el-image>
        </div>

        <div class="start_add" v-if="pptList.length > 0">
            <div class="add_title">我的创作</div>
            <div class="cont_ul">
                <div class="cont_li" v-for="(item, index) in pptList" :key="index" @click="openLink(item.ppt_filer_path)">
                    <el-image class="li_img" :src="httpUrls.ossUrl + item.ppt_cover_path"></el-image>
                    <div class="li_info">
                        <div class="info_l">
                            <span class="info_title">{{ item.title }}</span>
                            <span class="info_time">2024-07-20</span>
                        </div>
                        <div class="info_more">
                           
                            <el-popover placement="bottom" :width="40" trigger="hover">
                                <template #reference>
                                    <!-- <el-image style="width: 14px; height: 14px; cursor: pointer;" src="../../src/assets/upload/more.png" fit="fill" /> -->
                                    <i class="el-icon-more" style="color: #333; font-size: 20px;"></i>
                                </template>
                                <template #default>
                                    <div class="operate">
                                        <a :href="httpUrls.ossUrl +item.origin_url"><div class="oper_copy">导出</div></a>
                                        <div class="oper_copy" @click="openEdit(item.sid)">重命名</div>
                                        <div class="oper_del" @click="delCont(item.sid)">删除</div>
                                    </div>
                                </template>
                            </el-popover>
                        </div>
                    </div>
                </div>
            </div>
            <div class="page_count" v-if="pageTotal > 10">
                <el-pagination
                    background
                    layout="prev, pager, next"
                    :total="pageTotal"
                    @current-change="nextPage"
                    >
                </el-pagination>
            </div>
        </div>

        <!-- 我的创作弹窗 -->
        <el-dialog
            title="快速开始"
            :visible.sync="creatVisible"
            @close="creatVisible = false"
            width="500px" style="border-radius: 10px">
            <div class="creat_ul">
                  <div class="ul_top">AI PPT</div>
                  <div class="ul_cont">
                       <div class="cont_li" @click="toThemp('theme')">
                           <el-image style="width: 56px; height: 56px;" :src="thempImg" fit="fill"></el-image>
                           <span class="li_text">主题创建</span>
                       </div>
                       <div class="cont_li" @click="toThemp('text')">
                           <el-image style="width: 56px; height: 56px;" :src="textImg" fit="fill"></el-image>
                           <span class="li_text">文本创建</span>
                       </div>
                       <div class="cont_li" @click="toThemp('document')">
                           <el-image style="width: 56px; height: 56px;" :src="documentImg" fit="fill"></el-image>
                           <span class="li_text">文档创建</span>
                       </div>
                       <div class="cont_li" @click="toThemp('diy')">
                           <el-image style="width: 56px; height: 56px;" :src="zdyImg" fit="fill"></el-image>
                           <span class="li_text">自定义创建</span>
                       </div>
                  </div>
            </div>
            <div class="ul_texts" style="margin-top: 15px;">生成大纲 每次消耗5043算力</div>

            <div class="ul_texts">基于大纲（可修改）生成PPT（最多8000字）每次消耗20271算力</div>
        </el-dialog>

        <!-- 重命名 -->
        <el-dialog
            title="重命名"
            :visible.sync="nameVisible"
            width="30%"
            top="30vh"
            @close="nameVisible = false"
            style="border-radius: 10px">
            <div>
                <el-input v-model="againName" placeholder="请输入名称"></el-input>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="nameVisible = false">取 消</el-button>
                <el-button type="primary" style="background: #003FFF;" @click="editName">确 定</el-button>
            </span>
        </el-dialog>

        <!-- 注册组件 -->
        <Register ref="Register"></Register>
    </div>
  </template>
  <script>
  import httpUrls from "@/api/requestURL";
  import { getPptList, editTitle, delPpt } from '@/api/ppt'
  import Register from "@/components/register";
  export default {
    name: "ppt",
    data() {
      return {
          search_val: '',
          addImg: httpUrls.ossUrl + 'pc/com/message_center/ppt.png',
          sloveImg: httpUrls.ossUrl + 'pc/com/message_center/ppt_slove.png',
          thempImg: httpUrls.ossUrl + 'pc/com/message_center/themp.png',
          textImg: httpUrls.ossUrl + 'pc/com/message_center/ppt_text.png',
          documentImg: httpUrls.ossUrl + 'pc/com/message_center/ppt_document.png',
          zdyImg: httpUrls.ossUrl + 'pc/com/message_center/ppt_zdy.png',
          
          creatVisible: false,
          nameVisible: false,
          againName: '',
          pptList: [],
          httpUrls,
          pageTotal: 0,
          page: 1,
          sid: 0
      };
    },
  
    components: {
        Register
    },
    beforeDestroy() {
      
    },
    // 创建完毕状态(里面是操作)
    created() {
       this.getPptList()
    },
  
    // 里面的函数只有调用才会执行
    methods: {

        delCont(sid) {
            this.$confirm('确定要删除该PPT？', '提示', {
            confirmButtonText: '删除',
            cancelButtonText: '取消',
            type: 'warning',
            }).then(() => {
               this.delppt(sid)
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });
            });
        },

        delppt(sid) {
            let val = {
                'sid': sid
            }
            delPpt(val).then(res => {
                if(res.code == 20000) {
                   this.page = 1
                   this.getPptList()
                   this.$message({
                       type: 'success',
                       message: '删除成功!'
                   });
                } else {
                    this.$message({
                        message: res.msg,
                        duration: 2000,
                    });
                }
            })
        },

        //主题创建
        toThemp(type) {
            console.log('jinlail')
            this.$router.push({ path: '/ppt/add_ppt', query: { 'keyword': type }});
        },

        openEdit(sid) {
            this.nameVisible = true
            this.sid = sid
        },

        // 修改名称
        editName() {
            let val = {
                'sid': this.sid,
                'title': this.againName
            }
            editTitle(val).then(res => {
                if(res.code == 20000) {
                   this.getPptList()
                   this.nameVisible = false
                } else {
                    this.$message({
                        message: res.msg,
                        duration: 2000,
                    });
                }
            })
        },

        // 获取模版
        getPptList() {
            let val = {
                'page_size': 10,
                'page': this.page,
                'title': this.search_val
            }
            getPptList(val).then(res => {
                if(res.code == 20000) {
                    this.pptList = res.data.data
                    this.pageTotal = res.data.total
                    // console.log(this.pptList, 5555)
                } else {
                    this.$message({
                        message: res.msg,
                        duration: 2000,
                    });
                }
            })
        },

        openLink(url) {
            let page_url = 'https://umi6.com/'+ url
            window.open(page_url, '_blank')
        },

        nextPage(val) {
            this.page = val
            this.getPptList()
        },

        addPPT() {
            let userInfo = JSON.parse(localStorage.getItem("userInfo"));
            if(userInfo.role == "guess") {
                this.$refs.Register.registerVisible = true;
            } else {
                this.creatVisible = true
            }
        }
    },
  };
  </script>
  
  <style scoped lang="scss">
     .page_top {
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 100%;
        margin-bottom: 20px;
        .top_l {
            color: #000;
            font-size: 20px;
            line-height: 40px;
            font-weight: bold;
        }
     }

     .start_add {
        margin-bottom: 20px;
        cursor: pointer;
        .add_title {
            color: #000;
            font-size: 16px;
            line-height: 40px;
            margin-bottom: 6px;
            font-weight: 600;
        }
     }
     .cont_ul {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: flex-start;
        flex-wrap: wrap;
        gap: 20px;
        .cont_li {
            width: 250px;
            height: auto;
            border-radius: 10px;
            background: #fff;
            transition: transform 0.3s; /* 平滑过渡效果 */
            cursor: pointer; /* 将鼠标指针改为指针样式 */
            box-shadow: 0px 10px 30px 0px rgba(0,0,0,0.1);
            .li_img {
                width: 250px;
                height: 140px;
                border-radius: 10px 10px 0 0;
            }
            .li_info {
                display: flex;
                align-items: center;
                justify-content: space-between;
                padding: 16px;
                width: calc(100% - 32px);
                .info_l {
                    display: flex;
                    flex-direction: column;
                    flex: 1;
                    .info_title {
                        font-size: 14px;
                        color: #333;
                        font-weight: bold;
                        line-height: 30px;
                        width: 180px;
                        white-space: nowrap; /* 不换行 */
                        overflow: hidden; /* 隐藏溢出文本 */
                        text-overflow: ellipsis; /* 使用省略号表示溢出的文本 */
                    }
                    .info_time {
                        color: #8F9197;
                        font-size: 14px;
                        line-height: 25px;
                    }
                }
                .info_more {
                    padding-left: 8px;
                }
            }
        }
        .cont_li:hover {
            transform: scale(1.1); /* 放大1.1倍 */
        }
     }

     .creat_ul {
        // padding: 20px;
        width: 100%;
        border-radius: 10px;
        border: 1px solid #ebebeb;
        .ul_top {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 100%;
            height: 48px;
            background: #F2F7FF;
            color: #000;
            font-weight: bold;
            font-size: 16px;
        }
        .ul_cont {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 100%;
            height: 250px;
            cursor: pointer;
            .cont_li {
                display: flex;
                align-items: center;
                justify-content: center;
                flex-direction: column;
                padding: 0 20px;
                .li_text {
                    font-size: 16px;
                    color: #333;
                    line-height: 50px;
                }
            }

        }
     }
     .ul_texts {
        color: #000;
        font-size: 14px;
        line-height: 21px;
     }
     .operate {
        padding: 5px;
        cursor: pointer;
        .oper_copy {
            background: #fff;
            border-radius: 8px 8px 8px 8px;
            font-size: 14px;
            color: #000;
            line-height: 40px;
            padding-left: 10px;
        }
        .oper_copy:hover {
            background: #F6F6F6;
        }
        .oper_del {
            font-size: 14px;
            color: #FF1500;
            line-height: 40px;
            padding-left: 10px;
        }
    }

    .page_count {
        width: 100%;
        display: flex;
        justify-content: center;
        padding: 30px;
    }


    
  </style>
  <style>
     .operate a:link, .operate a:visited {color:#000;}
  </style>
  