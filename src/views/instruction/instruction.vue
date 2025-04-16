/**
  * 操作指南
  */
<template>
    <div class="instruction">
        <img src="../../assets/images/background2.png" alt="" class="title_img">
        <div class="main">
            <div class="title">
                <img src="../../assets/images/Frame427318981.png" alt="" class="img">
                <span class="title_item">您可能关心的问题:</span>
            </div>
            <div class="collapse-main">
                <el-collapse v-model="activeNames" @change="handleChange" accordion class="collapse-mask">
                    <div v-for="(item, index) in dataList" :key="index" class="item">
                        <div style="height: 39px;display: flex;">
                            <div class="roundDot"></div>
                        </div>
                        <el-collapse-item :title="item.title" :name="index" class="collapse_item">
                            <div v-if="index == dataList.length - 1" style="color: #1F64FF;cursor: pointer;" @click="toCustomized">{{httpUrls.url + '/#/customized/customized'}}</div>
                            <div v-else>{{ item.content }}</div>
                        </el-collapse-item>
                    </div>
                </el-collapse>
            </div>

            <div class="instruction_footer">
                <div class="left">
                    <div class="title">联系我们</div>
                    <div class="email">邮箱：<span style="color: #1F64FF;">week-8@foxmail.com</span></div>
                </div>
                <div class="right">
                    <div class="item">
                        <img :src='httpUrls.ossUrl + "static/picture/dc6868c4-f6ea-42dc-935e-5fff7338f72e.jpg"' alt="" class="img">
                        <div class="title">关注公众号不走丢</div>
                    </div>
                    <div class="item">
                        <img :src='httpUrls.ossUrl + "static/picture/c94d71e3-9a2c-4033-b3f6-fe2c3720057a.png"' alt="" class="img">
                        <div class="title">微信小程序版</div>
                    </div>
                    <div class="item">
                        <img :src='httpUrls.ossUrl + "static/picture/650980ad-e3d1-4593-b49e-8fa523c547aa.png"' alt="" class="img">
                        <div class="title">联系客服</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';

import httpUrls from '../../api/requestURL'

export default {
    data() {
        return {
            httpUrls: httpUrls,
            activeNames: ['1'],
            dataList: [
                // {
                //     title: '本网站与chatGPT是什么关系?',
                //     content: 'ChatGPT是OpenAI公司的人工智能产品，OpenAI公司除了对最终用户提供ChatGPT服务，同时提供了可以编程的API接口，该API接口以付费的方式对具备研发能力的企业用户和合作伙伴开放，ChatAI中文网站是通过对接OpenAI公司的API实现的ChatGPT镜像网站，是一个可以在国内稳定访问ChatGPT服务的入口。'
                // },
                {
                    title: '我为什么要付费才能使用VIP的套餐?',
                    content: '由于大语言模型 API是收费的，计费方式是按照Token数量(约等于聊天字数)计费，我们严格遵循大语言模型的规范，从正规付费渠道对接官方的API服务，存在较大的运营成本，为了能够长期运营下去，无法提供完全的免费服务，希望尽我们所能，充分考虑用户的承受能力和自身的成本风险，让大多数用户以较低的费用享受到便捷高质的AI服务。'
                },{
                    title: '我的权益能得到保障吗?',
                    content: '在技术上，我们力求做到极致，尽可能与官网的体验保持一致并加以创新。流程上，我们确保每一个环节都是合法合规的，包括与大语言模型的合作对接、网站的备案、支付的流程，以及客服流程，严格遵循必要的规范和法律法规，确保提供长期有效的服务。'
                },{
                    title: '产品的概况和后续的规划?',
                    content: '我们提供强大的聊天、AI绘画、应用助理、音视频转写、数字人定制等服务，目前我们提供的各种版本入口有：PC端网页、小程序、公众号，您可以在任何一个版本中找到其他版本的入口。'
                },{
                    title: '付费成功，却没有成功升级到VIP怎么办?',
                    content: '支付前请您仔细查看VIP会员的权益，如果确定付费后没有成功升级到相应的VIP级别，请您联系我们的客服人员帮助解决，下列方式都可以找到我们：关注公众号，或者直接电话联系我们，客服人员会帮您解决遇到的问题。'
                },{
                    title: '我以前是VIP，现在怎么又变成免费套餐了?',
                    content: '出现这种情况，一般来说有两种可能： 第一种情况: 您以前购买了VIP会员，但是您的VIP会员过期了，需要续费。 第二种情况: 您可能之前是用户名密码登录的，后来改用微信扫描登录，或者点击了一键注册登录，后面两种情况都会自动注册一个新用户，需要切换到原来的账号，如果您忘记了原来的账号密码，请联系客服协助您找回。'
                },{
                    title: '我是VIP用户，在微信小程序登录变成了免费套餐用户?',
                    content: '首次进入微信小程序，并不会自动登录您在网页版本注册的账号，您可以选择快速登录或手机验证码登录，来登录到您网页版本的VIP账号。'
                },{
                    title: '源码开发',
                    content: '/customized/customized'
                }]
        }
    },

    computed: {
        ...mapGetters(['contactService', 'mini', 'officialAccount'])
    },

    mounted() {
        // document.title = httpUrls.name + '的操作指南,主要是让用户了解' + httpUrls.name + '和chatgpt之间的关系以及使用' + httpUrls.name + '工具平台的方法.'
        // let metaKeywords = document.createElement('meta')
        // metaKeywords.id = 'chat-meta-keywords'
        // metaKeywords.name = 'keywords'
        // metaKeywords.content = 'chatgpt镜像网站,' + httpUrls.name + '规划,' + httpUrls.name + '会员升级,' + httpUrls.name + '使用方法'
        // document.getElementsByTagName('head')[0].appendChild(metaKeywords)

        // let metaDescription = document.createElement('meta')
        // metaDescription.id = 'chat-meta-description'
        // metaDescription.name = 'description'
        // metaDescription.content = httpUrls.name + '操作指南,主要是让用户更了解并教会你怎么使用这个平台里的每一个功能,主要讲解了' + httpUrls.name + '和gpt之间的关系,以及升级会员过程中遇到问题怎么解决,让你轻松玩转' + httpUrls.name + '平台.'
        // document.getElementsByTagName('head')[0].appendChild(metaDescription)
    },

    beforeDestroy() {
        // document.getElementById('chat-meta-keywords').remove()
        // document.getElementById('chat-meta-description').remove()
    },

    methods: {
        handleChange(val) {
            console.log(val);
        },
        toCustomized() {
            window.open(httpUrls.url + '#/customized/customized')
        }
    },
}
</script>

<style scoped>
.instruction .title_img {
    width: 100%;
    position: fixed;
    top: -52px;
    right: 0;
    z-index: -1;
}
.instruction .main {
    margin-left: 96px;
    margin-bottom: 32px;
}
.instruction .main>.title {
    height: 50px;
    margin: 71px 0 37px 0;
}
.instruction .main .title .img {
    width: 50px;
    height: 50px;
    vertical-align: middle;
}

.instruction .main .title .title_item {
    font-weight: 500;
    font-size: 30px;
    line-height: 50px;
    color: #333333;
    vertical-align: middle;
}

.collapse-main {
    width: 80%;
    padding: 20px;
    background-color: #F6F8FB;
}
.collapse-mask {
    border: none;
}
.collapse-mask .item {
    display: flex;
    /* height: 39px; */
}

.roundDot {
    width: 4px;
    height: 4px;
    border-radius: 50%;
    margin: auto 0;
    margin-right: 10px;
    background-color: #000000;
}

.instruction_footer {
    display: flex;
    margin-top: 75px;
}
.instruction_footer .left {
    font-weight: 500;
    font-size: 16px;
    color: #000000;
    margin-right: 5%;
}
.instruction_footer .left .title {
    margin: 15px 0;
}
.instruction_footer .right {
    display: flex;
}
.instruction_footer .right .item {
    margin-right: 40px;
}
.instruction_footer .right .item .img {
    width: 160px;
    height: 160px;
}

.instruction_footer .right .item .title {
    text-align: center;
}
</style>
<style>
.collapse_item {
    background-color: #F6F8FB;
}
.collapse_item .el-collapse-item__header {
    background-color: #F6F8FB;
    height: 39px;
    line-height: 39px;
    border: none;
    font-size: 16px;
}

.collapse_item .el-collapse-item__arrow {
margin-left: 15px;
}

.collapse_item .el-collapse-item__wrap {
    padding: 8px 12px 0 12px;
    border-radius: 4px;
}
.collapse_item .el-collapse-item__wrap div {
    font-size: 14px;
}
</style>