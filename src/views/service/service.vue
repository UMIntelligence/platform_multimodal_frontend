<template>
    <div class="service">
        <div class="main">
            <div class="item">
                <img class="cg-user-pic" src="../../assets/images/hywc_logo.png" alt="" style="box-shadow: 4px 4px 4px #999;">
                <div class="cg-chatbox-left">
                    <div class="left_tip">你好,</div>
                    <div class="left_tip1">我是{{ httpUrls.name }}</div>
                    <div class="reply">作为一个人工智能语言模型，我可以回答你的问题，能帮助你理解和表达更复杂的语句，并为你提供有帮助的建议和见解。</div>
                </div>
            </div>
            <img class="cg-right" :src="officialAccount" alt="">
            <div class="title">关注公众号不走丢</div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
import httpUrls from '../../api/requestURL'
export default {
    name: 'service',
    computed: {
        ...mapGetters(['officialAccount'])
    },
    data() {
        return {
            httpUrls
        }
    },
    mounted() {
        // document.title = httpUrls.name + '客服,坚持以客户为中心的服务理念,为您提供精准,高效的AI智能解决方案.'
        // let metaKeywords = document.createElement('meta')
        // metaKeywords.id = 'chat-meta-keywords'
        // metaKeywords.name = 'keywords'
        // metaKeywords.content = httpUrls.nam + '客服,' + httpUrls.name + '在线客服,' + httpUrls.name + '客服咨询'
        // document.getElementsByTagName('head')[0].appendChild(metaKeywords)

        // let metaDescription = document.createElement('meta')
        // metaDescription.id = 'chat-meta-description'
        // metaDescription.name = 'description'
        // metaDescription.content = httpUrls.name + '客服,专注提升客户关系,为您打造更优质的用户体验,以人性化,智能化的方式为您提供贴心服务,始终注重服务细节,为客户提供真心实意的支持.欢迎联系' + httpUrls.name + '客服'
        // document.getElementsByTagName('head')[0].appendChild(metaDescription)
    },

    beforeDestroy() {
        // document.getElementById('chat-meta-keywords').remove()
        // document.getElementById('chat-meta-description').remove()
    },
}
</script>

<style scoped>
.main {
    margin-top: 100px;
    display: flex;
    flex-direction: column;
    justify-content: center;
}

.cg-user-pic {
    width: 36px;
    height: 36px;
    border-radius: 50%;
    margin-right: 10px;
}
.cg-right {
    width: 269px;
    height: 269px;
    display: block;
    margin: 0 auto;
}
.item {
    display: flex;
    flex-wrap: nowrap;
    justify-content: center;
    margin-bottom: 25px;
}

.cg-chatbox-left {
    width: 718px;
    background: #FFFFFF;
    border-radius: 8px;
    padding: 20px;

}

.left_tip {
    font-size: 28px;
    font-weight: bold;
}

.left_tip1 {
    font-size: 22px;
    line-height: 36px;
}

.reply {
    line-height: 22px;
    font-size: 16px;
}

.title {
    /* font-family: 'PingFang SC'; */
    font-weight: 500;
    font-size: 32px;
    color: #333333;
    text-align: center;
}
</style>