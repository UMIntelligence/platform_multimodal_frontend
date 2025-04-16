<template>
    <div class="fullscreen-bg">
        <div class="container">
            <div class="back_btn" @click="$router.back()">
                <i class="el-icon-arrow-left" style="color: #000; font-size: 14px; line-height: 16px;"></i>
                <span class="back_text">返回</span>
            </div>
            
            <div class="cont_speed">
                <el-progress type="circle" :percentage="speed"></el-progress>
                <div class="speed_text" v-if="speed != 100">ppt即将生成</div>
                <div style="display: flex;" v-else>
                    <a :href="ppturl" ><div class="downPPT" style="background: #67c23a;">下载PPT</div></a>
                    <div class="downPPT" @click="openPPT" style="margin-left: 30px">在线预览</div>
                </div>
                
            </div>
        </div>

    </div>
</template>
<script>
import httpUrls from "@/api/requestURL";
import { addPPt, getPPtLink } from '@/api/ppt'
export default {
    name: "pptSuccess",
    data() {
        return {
            speed: 2,
            sid: 0,
            cont: '',
            isCheck: '',
            theme: '',
            timer: 0,
            isSuccess: false,
            ppturl: '',
            pdfurl: ''
        };
    },

    components: {

    },
    beforeDestroy() {

    },
    // 创建完毕状态(里面是操作)
    created() {

    },

    mounted() {  
        console.log(this.$route.params, 22222)
        this.cont = this.$route.params.cont
        this.isCheck = this.$route.params.isCheck
        this.theme = this.$route.params.theme
        this.creatPPt()

    },

    // 里面的函数只有调用才会执行
    methods: {
         // 生成ppt
         creatPPt() {
            let userInfo = JSON.parse(localStorage.getItem("userInfo"));
            console.log(userInfo, 5589)
            let val = {
               'theme': this.theme,
               "author": userInfo.user_name, 
               'isCardNote': this.isCheck,
               'outline': this.cont
            }
           
            addPPt(val).then(res => {
                if(res.code == 20000) {
                   this.sid = res.data.sid
                   console.log(this.sid,66666)
                   this.timer = setInterval(() => {
                        this.getLink()
                   },5000)
                } else {
                    this.$message({
                        message: res.msg,
                        duration: 2000,
                    });
                }
            })
        },

        getLink() {
            let val = {
                'sid': this.sid
            }
            
            getPPtLink(val).then(res => {
                if(res.code == 20000) {
                    this.speed = res.data.process
                    if(res.data.process == 100) {
                        if(!this.isSuccess) { //防止重新打开窗口
                            let url = 'https://umi6.com/'+ res.data.ppturl
                            this.pdfurl = url
                            let ppt_url = httpUrls.ossUrl + res.data.origin_url
                            this.ppturl = ppt_url
                            clearInterval(this.timer)
                            this.isSuccess = true
                        }
                    }
                    
                } else {
                    clearInterval(this.timer)
                    this.$message({
                        message: res.msg,
                        duration: 2000,
                    });
                }
            })
        },

        openPPT() {
            window.open(this.pdfurl, '_blank')
        }


    }
};
</script>

<style scoped lang="scss">
.fullscreen-bg {
    /* 设置背景图片 */
    background-image: url('https://umi-intelligence.oss-cn-shenzhen.aliyuncs.com/pc/com/message_center/ppt-back.png');
    /* 替换为你的图片URL */

    /* 背景图覆盖整个div，保持图片的宽高比 */
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;

    /* 可选：如果内容也在这个div上，你可能需要设置z-index或其他属性来处理 */
    z-index: -1;
    /* 确保背景图在内容之下，如果页面中有其他内容的话 */

    /* 可选：设置背景颜色作为备用，以防图片加载失败 */
    background-color: #000;
    /* 黑色备用背景 */
}

/* 如果需要确保内容也在全屏div之上，可能还需要对html和body进行一些设置 */
html,
body {
    height: 100%;
    margin: 0;
    padding: 0;
}

.container {
    padding: 20px;
    width: calc(100% - 40px);
    min-height: calc(100vh - 40px);
    cursor: pointer;
    .back_btn {
        display: flex;
        align-items: center;
        justify-content: center;
        background: #fff;
        border-radius: 8px;
        width: 80px;
        height: 35px;
        cursor: pointer;
    }
    .back_text {
        color: #000;
        font-size: 14px;
        padding-left: 5px;
    }

    .cont_speed {
        width: 100%;
        height: 80vh;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        .speed_text {
            font-size: 20px;
            color: #000;
            padding: 18px;
        }
    }
    .downPPT {
        width: 120px;
        height: 35px;
        background: #003FFF;
        border-radius: 10px;
        display: flex;
        align-items: center;
        justify-content: center;
        color: #fff;
        font-size: 16px;
        cursor: pointer;
        margin-top: 30px;
    }
}

</style>
<style>
     .cont_speed a:link, .cont_speed a:visited {color:#fff; text-decoration: none;}
</style>