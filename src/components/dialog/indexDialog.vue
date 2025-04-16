<template>
    <div class="index-dialog">
        <el-dialog
            title=""
            :visible.sync="dialogVisible"
            class="dialog"
            width="779px"
            @close="closeDialog">
            <div>
                <div>
                    <img class="logo" src="../../assets/images/frameLogo.png" alt="">
                </div>
                <div class="main-dislog">
                    <div class="left">
                        <img class="comma" src="../../assets/images/comma.png" alt="">
                        <div>
                            <div>{{ httpUrls.name }}看作是你的好友——对他说话，给他非常具体的指示，告诉他你想让他做什么。它可以帮助总结，创造性和协作性写作，问答等等。慧远会记住你的整个谈话的线程，并可以迭代手头的任务，就像一个敬业的员工一样。慧远 AI的功能是与人类用户进行自然的对话和交互,理解用户的意图并提供相应的回答与数据。</div>
                            <div>基于有监督学习和自监督学习训练而成,可以回答常见的知识问答问题,也能就复杂话题与人类进行更富有逻辑的讨论。在提高自身的语言能力和世界常识方面还需要不断学习,但会尽最大努力为用户提供最准确和最有用的信息。</div>
                            <div>很高兴为您服务,也希望与您有一个愉快的交流体验!</div>
                        </div>
                    </div>
                    <div class="right">
                        <div class="title">游客限免规则：</div>
                        <div class="title-item">a）AI35限时免费试用；</div>
                        <div class="title-item">b）AI40免费试用3次； </div>
                        <div class="title-item">c）DALL·E 2免费试用2次；</div>
                        <div class="title-item">d）百度AI绘画免费试用2次。</div>
                        <div class="title" style="margin-top: 40px;">注册用户限免规则：</div>
                        <div class="title-item">a）AI35免费试用；</div>
                        <div class="title-item">b）AI40注册即送5次，后每天送2次；</div>
                        <div class="title-item">c）DALL·E 2注册即送3次，后每天送1次；</div>
                        <div class="title-item">d）百度AI绘画注册即送3次，后每天送1次。</div>
                    </div>
                </div>
            </div>
            <el-checkbox class="checkbox" v-model="checked">不再显示</el-checkbox>
            <img class="dialogBG" src="../../assets/images/dialogbg.png" alt="">
        </el-dialog>
    </div>
</template>

<script>
import httpUrls from '../../api/requestURL'
export default {
    name: 'index-dialog',
    data() {
        return {
            dialogVisible: true,
            checked: false
        }
    },
    methods: {
        closeDialog() {
            if (this.checked) {
                this.$emit('isclosedialog', true)
            }
        }
    }
}
</script>

<style scoped>
.logo{
    width: 114px;
    height: 36px;
    margin: 0 0 19px 0;
}

.comma {
    width: 20px;
    height: 16px;
    margin-bottom: 19px;
}

.main-dislog {
    display: flex;
}


.left {
    border: 1px solid #1F64FF;
    padding: 20px;
    border-radius: 10px;
    width: 250px;
    margin-right: 40px;
}

.left div {
    /* font-family: 'PingFang SC'; */
    font-weight: 400;
    font-size: 13px;
    line-height: 18px;
    color: #333333;
}

.right {
    padding-top: 29px;
    width: 360px;
}

.right .title {
    /* font-family: 'PingFang SC'; */
    font-weight: bold;
    font-size: 27px;
    color: #333333;
}

.right .title-item, .left .title-item {
    /* font-family: 'PingFang SC'; */
    font-weight: 500;
    font-size: 18px;
    line-height: 27px;
    color: #333333;
}

.dialogBG {
    width: 254px;
    height: 172px;
    position: absolute;
    right: 0;
    bottom: 0;
}
</style>

<style>
.index-dialog .el-dialog__body {
    padding-top: 10px;
    position: relative;

}

.index-dialog .checkbox {
    margin-top: 45px;
}

.index-dialog .checkbox span {
    /* font-family: 'PingFang SC'; */
    font-weight: 400;
    font-size: 16px;
    line-height: 26px;
    color: #333333;
}
</style>