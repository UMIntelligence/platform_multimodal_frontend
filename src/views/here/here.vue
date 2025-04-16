/**
  * 防走丢
  */
<template>
    <div class="here">
        <go-back></go-back>
        <div>
            <div style="width: 500px;margin: auto;">
                <div style="text-align: center;color: #0096ff;display: flex;height: 25px;line-height: 20px;margin-top: 10px;justify-content: center;">
                    <span>{{httpUrls.url}}</span>
                    <span @click="copText" style="color: #000000;display: flex;cursor: pointer;">
                        <img src="../../assets/images/copyblue.png" alt="" style="width: 20px;height: 20px;display: flex;margin: 0 5px 0 10px;">
                        <span>一键复制</span>
                    </span>
                </div>
                <div class="here-title">(1) 桌面右键选择“新建”，选择“快捷方式”</div>
                <img src="../../assets/images/course1.png" alt="">
                <div class="here-title">(2) 把网址复制到输入框，点击“下一页”</div>
                <img src="../../assets/images/course2.png" alt="">
                <div class="here-title">(3) 命名后，点击“完成”即可</div>
                <img src="../../assets/images/course3.png" alt="">
            </div>
            <div class="img_list">
                <div class="item">
                    <img style="width: 160px;height: 160px;" :src="officialAccount" alt="">
                    <div>关注公众号不走丢</div>
                </div>
                <div class="item">
                    <img style="width: 160px;height: 160px;" :src="mini" alt="">
                    <div>扫一扫体验小程序</div>
                </div>
                <div class="item">
                    <img style="width: 160px;height: 160px;" :src="contactService" alt="">
                    <div>加客服免费领会员</div>
                </div>
            </div>
        </div>
        <div style="width: 234px;"></div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
import GoBack from '../../components/goBack.vue'

import httpUrls from '../../api/requestURL'

export default {
    name: 'here',
    data() {
        return {
            httpUrls: httpUrls
        }
    },
    components: {
        GoBack
    },
    computed: {
        ...mapGetters(['contactService', 'mini', 'officialAccount'])
    },
    mounted() {
        document.title = httpUrls.name
    },
    methods: {
        copText() {
            var input = document.createElement("input"); // 创建input对象
            input.value = httpUrls.url; // 设置复制内容
            document.body.appendChild(input); // 添加临时实例
            input.select(); // 选择实例内容
            document.execCommand("Copy"); // 执行复制
            document.body.removeChild(input); // 删除临时实例
            this.$message.success('复制成功！');
        }
    }
}
</script>

<style scoped>
.here {
    margin-bottom: 40px;
    display: flex;
    justify-content: center;
    position: relative;
}
img {
    width: 500px;
    display: block;
    margin: 0 auto;
}

.here-title {
    background-color: #e8e8e8;
    padding: 7px 10px;
    font-size: 10px;
    color: #1a1818;
    margin: 10px 0;
}

.img_list {
    display: flex;
    justify-content: center;
    margin: 20px 0 55px 0;
}
.img_list .item {
    text-align: center;
    font-size: 14px;
}
</style>