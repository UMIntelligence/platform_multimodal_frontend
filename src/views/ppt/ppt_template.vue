<template>
   <div style="background: #F6F8FA; height: 100%; width: 100%;">
        <div class="page_tops">
            <div class="top_left" @click="$router.back()">
                <i class="el-icon-arrow-left" style="color: #000; font-size: 16px; font-weight: bold;"></i>
                <span class="left_text">选择你想要的模版配色</span>
            </div>
            <div class="top_right" @click="nextStep">下一步</div>
        </div>
        <div class="start_add">
            <div class="add_title">我的创作</div>
            <div class="cont_ul">
                <div class="cont_li" v-for="(item, index) in themeList" :key="index" @click="selectTab(index, item.theme)" 
                :style="selectId === index ? 'border: 2px solid #003FFF' : ''">
                    <el-image class="li_img" :src="httpUrls.ossUrl + item.thumbnail"></el-image>
                    <div class="li_info"><span class="info_title">{{ item.name }}</span></div>
                </div>
            </div>
        </div>

    </div>
  </template>
  <script>
  import httpUrls from "@/api/requestURL";
  import { pptTemplate } from '@/api/ppt'
  export default {
    name: "templates",
    data() {
      return {
          addImg: httpUrls.ossUrl + '/pc/com/message_center/ppt.png',
          selectId: '',
          themeList: [],
          httpUrls,
      };
    },
  
    components: {
      
    },
    beforeDestroy() {
      
    },
    // 创建完毕状态(里面是操作)
    created() {
        this.getTemplate()
    },

    mounted() {
        console.log(this.$route.params, 111111)
    },
  
    // 里面的函数只有调用才会执行
    methods: {
       
        //下一步
        nextStep() {
            // this.$router.push('/ppt/ppt_success');
            if(this.selectId != '') {
                this.$router.push({ name: 'pptSuccess', params: this.$route.params});
            } else {
                this.$message({
                    message: '请选择模板',
                    duration: 2000,
                    type: 'warning'
                });
            }
            
        },

        selectTab(index, type) {
            this.selectId = index
            this.$route.params.theme = type
        },

        // 获取模版
        getTemplate() {
            console.log('jinlai')
            pptTemplate().then(res => {
                console.log(res,556)
                if(res.code == 20000) {
                    this.themeList = res.data.themes
                } else {
                    this.$message({
                        message: res.msg,
                        duration: 2000,
                    });
                }
            })
        },

    }, 
  };
  </script>
  
  <style scoped lang="scss">
     .page_tops {
        width: calc(100% - 40px);
        background: #fff;
        padding: 10px 20px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        .top_left {
            display: flex;
            align-items: center;
            justify-content: flex-start;
            line-height: 30px;
            .left_text {
                font-weight: bold;
                font-size: 16px;
                color: #000000;
                margin-left: 8px;
            }
        }
        .top_right {
            width: 160px;
            height: 35px;
            background: #003FFF;
            border-radius: 10px;
            display: flex;
            align-items: center;
            justify-content: center;
            color: #fff;
            font-size: 16px;
            cursor: pointer;
        }
     }
     .start_add {
        margin-bottom: 20px;
        padding: 30px;
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
            }
        }
        // .cont_li:hover {
        //     transform: scale(1.1); /* 放大1.1倍 */
        // }
     }

  </style>
  