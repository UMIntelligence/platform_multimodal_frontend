/**
 * 绘画
 */
<template>
    <div style="width: 100%;display: flex;height: calc(100% - 30px);position: relative;background-color: #F1F2F5;">

    <div class="content">
        <div style="margin: 10px 0 10px 16px;">
            <el-button style="position: relative;"
                v-for="item in aiNameList"
                :key="item.value"
                class="chat-ai-btn-list"
                @click="selectAIname(item.value)" 
                :style="chat_type == item.value ? 'color: #1F64FF;background: rgba(31, 100, 255, 0.15);' : ''">
                    {{ item.label }}
                    <img v-if="item.value == 9" style="position: absolute;left: 0;top: -8px;" src="../../assets/images/Frame427319412.png" alt="">
            </el-button>
        </div>

        <!-- AI应用模板/DALL·E2 -->
        <div class="footer_qs" v-if="isShowTemplateDALL && AIname == 2">
            <div class="mask">
                <div class="qs_top">
                    <div style="display: flex;">
                        <div class="top_left">您可以这样问</div>
                        <div class="top_right" @click="huanYiPi">
                            <i class="el-icon-refresh"></i>
                            <span class="top_text">换一批</span>
                        </div>
                    </div>
                </div>
    
                <div class="qs_text">
                    <div class="qs_line" v-for="(item, index) in qsList" :key="index" @click="selectQs(item.pic_desc)">
                            <div class="qs_img-mask">
                                <img class="qs_item_img" :src="item.pic_url" alt="" style="width: 100%;">
                                <div class="qs_iten_title">示例图片</div>
                            </div>
                        <div class="qs_line-mask">
                            <span class="qs_line-item">{{ item.pic_desc }}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- AI应用模板/百度 -->
        <div class="footer_qs" v-if="isShowTemplateBaidu && AIname == 3">
            <div class="mask">
                <div class="qs_top">
                    <div style="display: flex;">
                        <div class="top_left">您可以这样问</div>
                        <div class="top_right" @click="huanYiPi">
                            <i class="el-icon-refresh"></i>
                            <span class="top_text">换一批</span>
                        </div>
                    </div>
                </div>
    
                <div class="qs_text">
                    <div class="qs_line" v-for="(item, index) in qsList" :key="index" @click="selectQs(item.pic_desc)">
                        <div class="qs_img-mask">
                            <img class="qs_item_img" :src="item.pic_url" alt="" style="width: 100%;">
                            <div class="qs_iten_title">示例图片</div>
                        </div>
                        <div class="qs_line-mask">
                            <span class="qs_line-item">{{ item.pic_desc }}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- AI应用模板/MJ -->
        <div class="footer_qs" v-if="isShowTemplateMidJ && AIname == 6">
            <div class="mask">
                <div class="qs_top">
                    <div style="display: flex;">
                        <div class="top_left">您可以这样问</div>
                        <div class="top_right" @click="huanYiPi">
                            <i class="el-icon-refresh"></i>
                            <span class="top_text">换一批</span>
                        </div>
                    </div>
                </div>
    
                <div class="qs_text">
                    <div class="qs_line" v-for="(item, index) in qsList" :key="index" @click="selectQs(item.pic_desc)">
                        <div class="qs_img-mask">
                            <img class="qs_item_img" :src="item.pic_url" alt="" style="width: 100%;">
                            <div class="qs_iten_title">示例图片</div>
                        </div>
                        <div class="qs_line-mask">
                            <span class="qs_line-item">{{ item.pic_desc }}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- AI应用模板/stable Diffusion -->
        <div class="footer_qs" v-if="isShowTemplatestableDiffusion && AIname == 9">
            <div class="mask">
                <div class="qs_top">
                    <div style="display: flex;">
                        <div class="top_left">您可以这样问</div>
                        <div class="top_right" @click="huanYiPi">
                            <i class="el-icon-refresh"></i>
                            <span class="top_text">换一批</span>
                        </div>
                    </div>
                </div>
    
                <div class="qs_text">
                    <div class="qs_line" v-for="(item, index) in qsList" :key="index" @click="selectQs(item.pic_desc)">
                        <div class="qs_img-mask">
                            <img class="qs_item_img" :src="item.pic_url" alt="" style="width: 100%;">
                            <div class="qs_iten_title">示例图片</div>
                        </div>
                        <div class="qs_line-mask">
                            <span class="qs_line-item">{{ item.pic_desc }}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="cg-chat-content" id="chatCont" ref="wrap">
            <div class="cg-chat-left">
                <img class="cg-user-pic cg-right" src="../../assets/images/delle2.png" alt="" v-if="chat_type == 2">
                <img class="cg-user-pic cg-right" src="../../assets/images/baiduLogo.png" alt="" v-if="chat_type == 3">
                <img class="cg-user-pic cg-right" src="../../assets/images/Midjourney.png" alt="" v-if="chat_type == 6">
                <img class="cg-user-pic cg-right" src="../../assets/images/SD.png" alt="" v-if="chat_type == 9">
                <div class="as-cont-left">
                    <div class="as_text_left">
                        <div class="cg-chatbox cg-chatbox-left">
                            <div v-if="chat_type == 2" style="font-weight: bold;">我是DALL·E2以智能为笔，以创意为墨现在为您服务！</div>
                            <div v-else-if="chat_type == 3" style="font-weight: bold;">我是百度绘画将最前沿科技与艺术的完美融合。现在为您服务！</div>
                            <div v-else-if="chat_type == 6" style="font-weight: bold;">我是Midjourney探索新的思想媒介，扩展人类的想象力。</div>
                            <div v-else-if="chat_type == 9" style="font-weight: bold;">我是Stable Diffusion将创造力带到世界的每个角落</div>
                            <div v-if="chat_type == 6" style="font-weight: bold;">为确保更高的准确性，请使用英文输入。</div>
                            <div class="left_tip-content">
                                <span v-if="Object.keys(loginInfo.member.data.count).length != 0 && !loginInfo.member.status && chat_type == 2">体验次数可用{{ loginInfo.member.data.count.DALLE_2.day }}次</span>
                                <span v-if="Object.keys(loginInfo.member.data.count).length != 0 && !loginInfo.member.status && chat_type == 3">体验次数可用{{ loginInfo.member.data.count.BAIDU_DRAWING.day }}次</span>
                                <span v-if="Object.keys(loginInfo.member.data.count).length != 0 && !loginInfo.member.status && chat_type == 6">体验次数可用{{ loginInfo.member.data.count.MJ.day }}次</span>
                                <span v-if="Object.keys(loginInfo.member.data.count).length != 0 && !loginInfo.member.status && chat_type == 9">体验次数可用{{ loginInfo.member.data.count.STABLEDIFFUSION.day }}次</span>
                                (每张图消耗{{ chat_type == 6 ? 50 : chat_type == 9 ? 5 : 35 }}算力)
                            </div>
                        </div>
                    </div>
                </div>
            </div>

<!-- DELL·E 2 -->
            <div v-for="(item, index) in chatList" :key="index" v-if="chat_type == 2">
                <div>
                    <!-- 左侧模板 -->
                    <div class="cg-chat-left" v-if="item.role == 'assistant'">
                        <el-checkbox v-if="isShowChecked" v-model="item.checked" style="margin-right: 18px;margin-top: 6px;" @change="changeSendAnswer(item)"></el-checkbox>
                        <div style="display: flex;">
                            <img class="cg-user-pic cg-right" src="../../assets/images/delle2.png" alt="" v-if="chat_type == 2">
                            <img class="cg-user-pic cg-right" src="../../assets/images/baiduLogo.png" alt="" v-if="chat_type == 3">
                            <div class="as-cont-left">
                                <!-- 绘画模式 -->
                                <div>
                                    <div class="chat_draws" v-for="(val, index) in item.image_urls" :key="index">
                                        <div class="draw-mark">
                                            <img class="draw_img 1" :src="httpUrls.ossUrl + val.url" alt="" v-if="item.isClickChat" @click="imagesSrc = httpUrls.ossUrl + val.url, showDrawImage = true">
                                            <img class="draw_img 2" :src="httpUrls.ossUrl + val.sso_url" alt="" v-else @click="imagesSrc = httpUrls.ossUrl + val.sso_url, showDrawImage = true">
                                            <!-- <div class="title">尺寸{{ item.size }}</div> -->
                                            <div class="img-list">
                                                <div>
                                                    <span class="put_text" v-if="item.timer">耗时:{{ item.timer }}秒</span>
                                                    <span class="put_text" v-if="!isfinish && index == chatList.length - 1"><img class="await_img" src="../../assets/images/Time_atack_light.png" alt="">耗时:{{ timer }}秒</span>
                                                </div>
                                                <div>
                                                    <img class="help-setpon-img" v-if="!item.help" src="../../assets/images/helpNo.png" alt="" @click="showSetonHelpImg(1, true, item)">
                                                    <img class="help-setpon-img" v-if="item.help" src="../../assets/images/helpYes.png" alt="" @click="showSetonHelpImg(1, false, item)">
                                                    <img class="help-setpon-img" v-if="!item.stepOn" src="../../assets/images/stepOnNo.png" alt="" @click="showSetonHelpImg(2, true, item)">
                                                    <img class="help-setpon-img" v-if="item.stepOn" src="../../assets/images/stepOnYes.png" alt="" @click="showSetonHelpImg(2, false, item)">
                                                    <img class="cope-img" src="../../assets/images/download_img.png" alt="" @click.stop="downloadImgs(item)">
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div class="buttons-draw" v-if="item.isShowOldChat">
                                        <el-button class="but" @click="event => imgSunImg(item)">图文生图</el-button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- 右侧模板 -->
                    <div :class="isShowChecked ? 'cg-chat-right' : 'cg-chat-right cg-chat-right-on'" v-if="item.role == 'user'">

                        <el-checkbox v-if="isShowChecked" v-model="item.checked" style="margin-top: 10px;" @change="changeSendAnswer(item)"></el-checkbox>
                        <div class="as-cont-right" style="justify-content: flex-start;">
                            <img class="cg-user-pic cg-left" :src="httpUrls.ossUrl + loginInfo.avatar_url" alt="">
                            <div class="as_text_right">
                                <div class="cg-chatbox cg-chatbox-right">
                                    <span class="reply" style="display: block;margin-bottom: 10px;">{{item.content}}</span>
                                    <img class="img" src="../../assets/images/copyWrite.png" alt="" @click="copyText(item.content)">
                                </div>
                            </div>
                        </div>
                        
                    </div>

                </div>
            </div>

<!-- 百度绘画 -->
            <div v-for="(item, index) in baiduList" :key="index" v-if="chat_type == 3">
                <div>
                    <!-- 左侧模板 -->
                    <div class="cg-chat-left" v-if="item.role == 'assistant'">
                        <el-checkbox v-if="isShowChecked" v-model="item.checked" style="margin-right: 18px;margin-top: 6px;" @change="changeSendAnswer(item)"></el-checkbox>
                        <div style="display: flex;">
                            <img class="cg-user-pic cg-right" src="../../assets/images/delle2.png" alt="" v-if="chat_type == 2">
                            <img class="cg-user-pic cg-right" src="../../assets/images/baiduLogo.png" alt="" v-if="chat_type == 3">
                            <div class="as-cont-left">
                                <!-- 绘画模式 -->
                                <div>
                                    <div class="chat_draws" v-for="(val, index) in item.image_urls" :key="index">
                                        <div class="draw-mark">
                                            <img class="draw_img" :src="httpUrls.ossUrl + val.url" alt="" @click="imagesSrc = httpUrls.ossUrl + val.url, showDrawImage = true">
                                            <!-- <div class="title">尺寸{{ item.size }}</div> -->
                                            <div class="img-list">
                                                <div>
                                                    <span class="put_text" v-if="item.timer && index != baiduList.length - 1">耗时:{{ item.timer }}秒</span>
                                                    <span class="put_text" v-if="!isfinish && index == baiduList.length - 1"><img class="await_img" src="../../assets/images/Time_atack_light.png" alt="">耗时:{{ timer }}秒</span>
                                                </div>
                                                <div>
                                                    <img class="help-setpon-img" v-if="!item.help" src="../../assets/images/helpNo.png" alt="" @click="showSetonHelpImg(3, true, item)">
                                                    <img class="help-setpon-img" v-if="item.help" src="../../assets/images/helpYes.png" alt="" @click="showSetonHelpImg(3, false, item)">
                                                    <img class="help-setpon-img" v-if="!item.stepOn" src="../../assets/images/stepOnNo.png" alt="" @click="showSetonHelpImg(4, true, item)">
                                                    <img class="help-setpon-img" v-if="item.stepOn" src="../../assets/images/stepOnYes.png" alt="" @click="showSetonHelpImg(4, false, item)">
                                                    <img class="cope-img" src="../../assets/images/download_img.png" alt="" @click="downloadImgs(item)">
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                    <!-- 右侧模板 -->
                    <div :class="isShowChecked ? 'cg-chat-right' : 'cg-chat-right cg-chat-right-on'" v-if="item.role == 'user'">

                        <el-checkbox v-if="isShowChecked" v-model="item.checked" style="margin-top: 10px;" @change="changeSendAnswer(item)"></el-checkbox>
                        <div class="as-cont-right"  style="justify-content: flex-start;">
                            <img class="cg-user-pic cg-left" :src="httpUrls.ossUrl + loginInfo.avatar_url" alt="">
                            <div class="as_text_right">
                                <div class="cg-chatbox cg-chatbox-right">
                                    <span class="reply" style="display: block;margin-bottom: 10px;">{{item.content}}</span>
                                    <img class="img" src="../../assets/images/copyWrite.png" alt="" @click="copyText(item.content)">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

<!-- Midjourney -->
            <div v-for="(item, index) in midjourneyList" :key="index" v-if="chat_type == 6">
                <div>
                    <!-- 左侧模板 -->
                    <div class="cg-chat-left" v-if="item.role == 'assistant'">
                        <el-checkbox v-if="isShowChecked" v-model="item.checked" style="margin-right: 18px;margin-top: 6px;" @change="changeSendAnswer(item)"></el-checkbox>
                        <div style="display: flex;">
                            <img class="cg-user-pic cg-right" src="../../assets/images/Midjourney.png" alt="">
                            <div class="as-cont-left">
                                <!-- 绘画模式 -->
                                <div>
                                    <div class="chat_draws" v-for="(val, index) in item.image_urls" :key="index">
                                        <div class="draw-mark">
                                            <img class="draw_img" :style="val.url == '' ? 'widht: 256px;height: 256px;' : ''" :src="httpUrls.ossUrl + val.url" alt="" @click="imagesSrc = httpUrls.ossUrl + val.url, showDrawImage = true">
                                            <!-- <div class="title">尺寸{{ item.size }}</div> -->
                                            <div class="img-list">
                                                <div>
                                                    <span class="put_text" v-if="item.timer && index != midjourneyList.length - 1">耗时:{{ item.timer }}秒</span>
                                                    <span class="put_text" v-if="!isfinish && index == midjourneyList.length - 1"><img class="await_img" src="../../assets/images/Time_atack_light.png" alt="">耗时:{{ timer }}秒</span>
                                                </div>
                                                <div>
                                                    <img class="help-setpon-img" v-if="!item.help" src="../../assets/images/helpNo.png" alt="" @click="showSetonHelpImg(5, true, item)">
                                                    <img class="help-setpon-img" v-if="item.help" src="../../assets/images/helpYes.png" alt="" @click="showSetonHelpImg(5, false, item)">
                                                    <img class="help-setpon-img" v-if="!item.stepOn" src="../../assets/images/stepOnNo.png" alt="" @click="showSetonHelpImg(6, true, item)">
                                                    <img class="help-setpon-img" v-if="item.stepOn" src="../../assets/images/stepOnYes.png" alt="" @click="showSetonHelpImg(6, false, item)">
                                                    <img class="cope-img" src="../../assets/images/download_img.png" alt="" @click="downloadImgs(item)">
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                    <!-- 右侧模板 -->
                    <div :class="isShowChecked ? 'cg-chat-right' : 'cg-chat-right cg-chat-right-on'" v-if="item.role == 'user'">

                        <el-checkbox v-if="isShowChecked" v-model="item.checked" style="margin-top: 10px;" @change="changeSendAnswer(item)"></el-checkbox>
                        <div class="as-cont-right"  style="justify-content: flex-start;">
                            <img class="cg-user-pic cg-left" :src="httpUrls.ossUrl + loginInfo.avatar_url" alt="">
                            <div class="as_text_right">
                                <div class="cg-chatbox cg-chatbox-right">
                                    <span class="reply" style="display: block;margin-bottom: 10px;">{{item.content}}</span>
                                    <img class="img" src="../../assets/images/copyWrite.png" alt="" @click="copyText(item.content)">
                                </div>
                            </div>
                        </div>
                        
                    </div>

                </div>
            </div>

<!-- Stable Diffusion -->
            <div v-for="(item, index) in stableDiffusionList" :key="index" v-if="chat_type == 9">
                <div>
                    <!-- 左侧模板 -->
                    <div class="cg-chat-left" v-if="item.role == 'assistant'">
                        <el-checkbox v-if="isShowChecked" v-model="item.checked" style="margin-right: 18px;margin-top: 6px;" @change="changeSendAnswer(item)"></el-checkbox>
                        <div style="display: flex;">
                            <img class="cg-user-pic cg-right" src="../../assets/images/SD.png" alt="">
                            <div class="as-cont-left">
                                <!-- 绘画模式 -->
                                <div>
                                    <div class="chat_draws" v-for="(val, index) in item.image_urls" :key="index">
                                        <div class="draw-mark">
                                            <!-- 图片内容违规或生成失败 -->
                                            <div v-if="item.is_mod == 1 || item.status == 1">{{ item.content }}</div>
                                            <!-- 正常情况 -->
                                            <img v-else class="draw_img" :style="val.url == '' ? 'widht: 256px;height: 256px;' : ''" :src="httpUrls.ossUrl + val.url" alt="" @click="imagesSrc = httpUrls.ossUrl + val.url, showDrawImage = true">
                                            <!-- <div class="title">尺寸{{ item.size }}</div> -->
                                            <div class="img-list">
                                                <div>
                                                    <span class="put_text" v-if="item.timer && index != stableDiffusionList.length - 1">耗时:{{ item.timer }}秒</span>
                                                    <span class="put_text" v-if="!isfinish && index == stableDiffusionList.length - 1"><img class="await_img" src="../../assets/images/Time_atack_light.png" alt="">耗时:{{ timer }}秒</span>
                                                </div>
                                                <div>
                                                    <img class="help-setpon-img" v-if="!item.help" src="../../assets/images/helpNo.png" alt="" @click="showSetonHelpImg(7, true, item)">
                                                    <img class="help-setpon-img" v-if="item.help" src="../../assets/images/helpYes.png" alt="" @click="showSetonHelpImg(7, false, item)">
                                                    <img class="help-setpon-img" v-if="!item.stepOn" src="../../assets/images/stepOnNo.png" alt="" @click="showSetonHelpImg(8, true, item)">
                                                    <img class="help-setpon-img" v-if="item.stepOn" src="../../assets/images/stepOnYes.png" alt="" @click="showSetonHelpImg(8, false, item)">
                                                    <img  v-if="item.is_mod != 1 &&item.status != 1" class="cope-img" src="../../assets/images/download_img.png" alt="" @click="downloadImgs(item)">
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                    <!-- 右侧模板 -->
                    <div :class="isShowChecked ? 'cg-chat-right' : 'cg-chat-right cg-chat-right-on'" v-if="item.role == 'user'">

                        <el-checkbox v-if="isShowChecked" v-model="item.checked" style="margin-top: 10px;" @change="changeSendAnswer(item)"></el-checkbox>
                        <div class="as-cont-right"  style="justify-content: flex-start;">
                            <img class="cg-user-pic cg-left" :src="httpUrls.ossUrl + loginInfo.avatar_url" alt="">
                            <div class="as_text_right">
                                <div class="cg-chatbox cg-chatbox-right">
                                    <span class="reply" style="display: block;margin-bottom: 10px;">{{item.content}}</span>
                                    <img class="img" src="../../assets/images/copyWrite.png" alt="" @click="copyText(item.content)">
                                </div>
                            </div>
                        </div>
                        
                    </div>

                </div>
            </div>

            <!-- 账户没钱啦 -->
            <div class="cg-chat-left" v-if="!isuser" style="margin-top: 15px;">
                <img class="cg-user-pic cg-right" src="../../assets/images/delle2.png" alt="" v-if="chat_type == 2">
                <img class="cg-user-pic cg-right" src="../../assets/images/baiduLogo.png" alt="" v-if="chat_type == 3">
                <img class="cg-user-pic cg-right" src="../../assets/images/Midjourney.png" alt="" v-if="chat_type == 6">
                <img class="cg-user-pic cg-right" src="../../assets/images/SD.png" alt="" v-if="chat_type == 9">
                <div class="as-cont-left">
                    <div class="as_text_left">
                        <div class="cg-chatbox cg-chatbox-left">
                            <div class="left_tip">{{ queryErrorMsg }}</div>
                            <div style="margin-top: 10px;display: flex;justify-content: flex-start;">
                                <el-button type="primary" style="background-color: #1F64FF;border-radius: 4px;padding: 6px 60px;" @click="$refs.Pay.PayVisible = true">购买套餐</el-button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- 关注公众号 -->
            <!-- <div class="codebox" v-if="chatList.length == 0 && chat_type == 2" style="margin-top: 30px;">
                <img class="codeimg" :src="contactService" alt="">
                <span class="codename" style="margin: 10px 0 20px 0;">加客服免费领会员</span>
            </div>

            <div class="codebox" v-if="baiduList.length == 0 && chat_type == 3" style="margin-top: 30px;">
                <img class="codeimg" :src="contactService" alt="">
                <span class="codename" style="margin: 10px 0 20px 0;">加客服免费领会员</span>
            </div> -->

            <!-- 获取中 -->
            <div class="cg-chat-left" v-if="isTimeDell && chat_type == 2">
                <img class="cg-user-pic cg-right" src="../../assets/images/delle2.png" alt="">
                <div class="as-cont-left">
                    <div class="as_text_left">
                        <div class="cg-chatbox cg-chatbox-left">
                            <div class="comput">
                                <span class="put_text"><img class="await_img" src="../../assets/images/await.gif" alt="">思考中，耗时:{{ timer }}秒</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- 获取中 -->
            <div class="cg-chat-left" v-if="isTimeBaidu && chat_type == 3">
                <img class="cg-user-pic cg-right" src="../../assets/images/baiduLogo.png" alt="">
                <div class="as-cont-left">
                    <div class="as_text_left">
                        <div class="cg-chatbox cg-chatbox-left">
                            <div class="comput">
                                <span class="put_text"><img class="await_img" src="../../assets/images/await.gif" alt="">思考中，耗时:{{ timer }}秒</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- 获取中 -->
            <div class="cg-chat-left" v-if="isTimeMidjourney && chat_type == 6">
                <img class="cg-user-pic cg-right" src="../../assets/images/Midjourney.png" alt="">
                <div class="as-cont-left">
                    <div class="as_text_left">
                        <div class="cg-chatbox cg-chatbox-left">
                            <div class="comput">
                                <span class="put_text"><img class="await_img" src="../../assets/images/await.gif" alt="">思考中，耗时:{{ timer }}秒</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- 获取中 -->
            <div class="cg-chat-left" v-if="isTimestableDiffusion && chat_type == 9">
                <img class="cg-user-pic cg-right" src="../../assets/images/SD.png" alt="">
                <div class="as-cont-left">
                    <div class="as_text_left">
                        <div class="cg-chatbox cg-chatbox-left">
                            <div class="comput">
                                <span class="put_text"><img class="await_img" src="../../assets/images/await.gif" alt="">思考中，耗时:{{ timer }}秒</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- 开启新会话 DALL·E2 -->
        <div style="font-size: 14px;color: #999999;text-align: center;line-height: 30px;" v-if="startNewChatDALLE2 && AIname == 2">
            <span style="cursor: pointer;" @click="resetNewChat">
                <span style="width: 26px;height: 1px;background-color: #999999;display: inline-block;vertical-align: middle;"></span>
                <span style="color: #1F64FF;vertical-align: middle;margin: 0 10px;">点击我,开启新绘画</span>
                <span style="width: 26px;height: 1px;background-color: #999999;display: inline-block;vertical-align: middle;"></span>
            </span>
        </div>

        <!-- 开启新会话 百度 -->
        <div style="font-size: 14px;color: #999999;text-align: center;line-height: 30px;" v-if="startNewChatBAIDU && AIname == 3">
            <span style="cursor: pointer;" @click="resetNewChat">
                <span style="width: 26px;height: 1px;background-color: #999999;display: inline-block;vertical-align: middle;"></span>
                <span style="color: #1F64FF;vertical-align: middle;margin: 0 10px;">点击我,开启新绘画</span>
                <span style="width: 26px;height: 1px;background-color: #999999;display: inline-block;vertical-align: middle;"></span>
            </span>
        </div>

        <!-- 开启新会话 MJ -->
        <div style="font-size: 14px;color: #999999;text-align: center;line-height: 30px;" v-if="startNewChatMJ && AIname == 6">
            <span style="cursor: pointer;" @click="resetNewChat">
                <span style="width: 26px;height: 1px;background-color: #999999;display: inline-block;vertical-align: middle;"></span>
                <span style="color: #1F64FF;vertical-align: middle;margin: 0 10px;">点击我,开启新绘画</span>
                <span style="width: 26px;height: 1px;background-color: #999999;display: inline-block;vertical-align: middle;"></span>
            </span>
        </div>

        <!-- 开启新会话 MJ -->
        <div style="font-size: 14px;color: #999999;text-align: center;line-height: 30px;" v-if="startNewChatstableDiffusion && AIname == 9">
            <span style="cursor: pointer;" @click="resetNewChat">
                <span style="width: 26px;height: 1px;background-color: #999999;display: inline-block;vertical-align: middle;"></span>
                <span style="color: #1F64FF;vertical-align: middle;margin: 0 10px;">点击我,开启新绘画</span>
                <span style="width: 26px;height: 1px;background-color: #999999;display: inline-block;vertical-align: middle;"></span>
            </span>
        </div>

        <div class="footer_cont">
            <div style="display: flex;justify-content: space-between;width: 100%;margin-bottom: 10px;" v-if="AIname == 6">
                <div style="font-size: 12px;line-height: 28px;">
                    <span style="margin-right: 10px;">预计时间：{{ mjWaitQueue.time }}分钟</span>
                    <span v-if="mjProgress != '' && mjProgress != null && mjProgress != '100'">加载进度：{{ mjProgress }}%</span>
                </div>
                <div>
                    <el-button type="primary" plain size="mini" :style="!mjImageStyle ? 'background-color: #1F64FF;border-color: #1F64FF;color: #ffffff;' : ''" @click="mjImageStyle = false">通用风格</el-button>
                    <el-button type="primary" plain size="mini" :style="mjImageStyle ? 'background-color: #1F64FF;border-color: #1F64FF;color: #ffffff;' : ''" @click="mjImageStyle = true">二次元</el-button>
                </div>
            </div>

            <div style="display: flex;justify-content: space-between;width: 100%;margin-bottom: 10px;" v-if="AIname == 9">
                <div style="font-size: 12px;line-height: 28px;">
                    <span style="margin-right: 10px;">排队人数：{{ SDWaitQueue || 0 }}人</span>
                </div>
                <div>
                    <el-button type="primary" plain size="mini" :style="!mjImageStyle ? 'background-color: #1F64FF;border-color: #1F64FF;color: #ffffff;' : ''" @click="dialogTitleVisible = true">反向提示词</el-button>
                    
                    <el-select v-model="samplerIndex" placeholder="请选择采样器" class="SD-draw-model" style="background-color: #ffffff;padding: 4px;">
                        <el-option
                            v-for="item in samplerIndexArr"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                    </el-select>
                    
                    <el-select v-model="SDValue" placeholder="请选择绘画模型" class="SD-draw-model" style="background-color: #ffffff;padding: 4px;">
                        <el-option
                            v-for="item in SDModel"
                            :key="item.value"
                            :label="item.name"
                            :value="item.value">
                        </el-option>
                    </el-select>
                </div>
            </div>
            
            <div class="cont">
                <el-select v-model="AIname" placeholder="智能AI为您服务" class="select-aiName">
                    <el-option
                    v-for="item in aiNameList"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>

                <el-input
                    resize='none'
                    class="text-textarea"
                    type="textarea"
                    :rows="2"
                    placeholder="在此输入您想了解的内容，Shift+Enter换行，Enter发送"
                    v-model="sendValue"
                    :maxlength="textAreaLength"
                    @input="changeSendValue"
                    @keyup.enter.native="(event) => handleKeyUp(event)">
                </el-input>

                <div class="association" v-if="isShowassociation">
                    <div class="title">是否关联上下</div>
                    <div class="item">
                        <el-radio v-model="association" label="1">有</el-radio>
                        <el-radio v-model="association" label="2">没有</el-radio>
                    </div>
                    <div class="line"></div>
                </div>
            </div>
            <div class="image-size">
                <div class="left">
                    <div class="title">图片尺寸</div>
                    <div v-if="AIname == 2" style="display: flex;">
                        <div v-for="item in drawSizeListOne" style="margin-right: 10px;">
                            <el-radio v-model="sizeRadio" :label="item.id">{{item.size}}</el-radio>
                        </div>
                    </div>
                    <div v-else-if="AIname == 3" style="display: flex;">
                        <div v-for="item in drawSizeListTwo" style="margin-right: 10px;">
                            <el-radio v-model="sizeRadio" :label="item.id">{{item.size}}</el-radio>
                        </div>
                    </div>
                    <div v-else-if="AIname == 6" style="display: flex;">
                        <div v-for="item in drawSizeListThree" style="margin-right: 10px;">
                            <el-radio v-model="sizeRadio" :label="item.id">{{item.size}}</el-radio>
                        </div>
                    </div>
                    <div v-else-if="AIname == 9" style="display: flex;">
                        <div v-for="item in drawSizeListFour" style="margin-right: 10px;">
                            <el-radio v-model="sizeRadio" :label="item.id">{{item.size}}</el-radio>
                        </div>
                    </div>
                </div>
                <div class="right">
                    <el-button @click="isBtn == true ? sendMsg(3) : sendMsg2(3)">AI生成</el-button>
                </div>
            </div>
        </div>

        <!-- 补充弹窗 -->
        <el-dialog :visible.sync="supplyVisible" width="500px">
            <div class="supply_cont">
                <el-input type="textarea" resize='none' :rows="3" placeholder="请输入您要补充的内容" v-model="supplyValue"></el-input>
            </div>

            <span slot="footer" class="dialog-footer">
                <img class="supply_img" src="../../assets/images/send.png" alt="" @click="keepAs(2)">
            </span>
            
        </el-dialog>

        <!-- 注册组件 -->
        <Register ref="Register"></Register>
        
        <!-- 图文弹窗 -->
        <el-dialog
            title=""
            :visible.sync="dialogVisible"
            class="draw-dialog_dowm"
            width="40%">
            <div style="position: relative;">
                <el-input
                resize='none'
                    class="text-input"
                    type="textarea"
                    :rows="2"
                    placeholder="请输入内容"
                    v-model="drawTextarea">
                </el-input>
                <el-radio class="radio" v-model="drawDialogRadio" label="1">上传当前绘画图片</el-radio>
                <el-button class="dialog-footer" type="primary"  @click="isBtn == true ? sendMsg(5) : sendMsg2(5)">发 送</el-button>
            </div>
        </el-dialog>

        <!-- 反向提示词弹窗 -->
        <el-dialog
            title=""
            :visible.sync="dialogTitleVisible"
            class="draw-dialog_dowm"
            width="40%">
            <div style="position: relative;">
                <el-input
                resize='none'
                    class="text-input"
                    type="textarea"
                    :rows="2"
                    placeholder="例如：画质差、画质低、画质正常、低画质、水印、单色、灰度、丑陋、模糊、棕褐色皮肤、深色皮肤、黑色皮肤、皮肤斑点、皮肤瑕疵、老年斑、秃头、残疾、扭曲等"
                    v-model="drawTextarea">
                </el-input>
                <el-button class="dialog-footer" type="primary" style="bottom: 20px;" @click="dialogTitleVisible = false">确 定</el-button>
            </div>
        </el-dialog>

        <right-nav :updataRightList="updataRightList" :sessionRightNavCode="sessionRightNavCode" @updatachatlist="updataChatList" @undatename="undateName" :randomStr="randomStr"></right-nav>
        </div>

        <el-dialog
            class="image-class_dark"
            title=""
            :visible.sync="showDrawImage">
            <img :src="imagesSrc" style="max-height: 800px;min-height: 500px;cursor: zoom-out;" alt="" @click="showDrawImage = false">
            <!-- <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="showDrawImage = false">确 定</el-button>
            </span> -->
        </el-dialog>

        <pay ref="Pay"></pay>
    </div>
</template>

<script>
import httpUrls from '../../api/requestURL'
import { creatChat, chatDetail, creatDraw, mjWaitingQuery, mjGetImageEnd, mjCreateImage, textTranslate, drawingSetRecommend, SDCreateImage, SDResultImage, getSDQueue, SDModel } from '../../api/chatMG'
import {recommend, chatLikes, getBaiduImage, baiduErnieImage} from '../../api/prompts'
import TemplateSelect from '../../components/dialog/templateSelect'
import Register from '../../components/register'
import rightNav from '../../components/rightNav'
import pay from '../../components/pay'

import {base64toFile, urlToBase64, saveAndExport, beforeUpload} from '../../utils/download'

import { mapGetters } from 'vuex'
import axios from 'axios'
export default {
  name: 'chat',
  data() {
    return {
        httpUrls,
        showDrawImage: false,
        imagesSrc: '',
        chatType: true,
        chatType1: false,
        chatType2: false,
        chatType3: false,
        chatText: 'DALL·E 2',
        // action_type: '1',
        activeName: '0',
        chat_type: 9, // ai35: 0; ai40: 1; DALL·E 2：2; 百度绘画: 3
        sendValue: '',
        isShow: false,

        isShowTemplateDALL: true,
        isShowTemplateBaidu: true,
        isShowTemplateMidJ: true,
        isShowTemplatestableDiffusion: true,

        isPay: true,
        reply: '',
        timer: 0,
        t_time: 0,
        
        isTimeDell: false,
        isTimeBaidu: false,
        isTimeMidjourney: false,
        isTimestableDiffusion: false,
        
        isfinish: false,
        isBtn: true, // 防止重新发送
        supplyVisible: false,
        supplyValue: '',
        isDetail: false,
        qsList: [],

        chatList: [], //dell2绘画内容
        baiduList: [], // 百度绘画内容
        midjourneyList: [], // midjourney内容
        stableDiffusionList: [], // Stable Diffusion内容
        
        isuser: true, //使用次数是否用完
        AIname: 2,
        userTextarea: '',
        isShowHelpImg: false,
        isShowStepOnImg: false,
        isShowTemplateSelte: false,
        textAreaLength: 900,
        association: '', // 是否关联上下文
        isShowassociation: false,
        isShowChecked: false,
        ordeAIList: [], // 关联上下文的列表
        sizeRadio: '', // 绘画尺寸
        sizeRadio2: '',
        dialogVisible: false,
        dialogTitleVisible: false,
        drawDialogRadio: '',
        drawSizeListOne: [{
            id: '256x256',
            size: '256x256'
        },{
            id: '512x512',
            size: '512x512'
        },{
            id: '1024x1024',
            size: '1024x1024'
        }],
        drawSizeListTwo: [{
            id: '1024*1024',
            size: '1024*1024'
        },{
            id: '1024*1536',
            size: '1024*1536'
        },{
            id: '1536*1024',
            size: '1536*1024'
        }],
        drawSizeListThree: [{
            id: '1:1',
            size: '1:1'
        },{
            id: '4:3',
            size: '4:3'
        },{
            id: '3:4',
            size: '3:4'
        },{
            id: '16:9',
            size: '16:9'
        },{
            id: '9:16',
            size: '9:16'
        }],
        drawSizeListFour: [{
            id: '512*512',
            size: '512*512'
        }, {
            id: '512*768',
            size: '512*768'
        },{
            id: '768*512',
            size: '768*512'
        }
        // ,{
        //     id: '640*640',
        //     size: '640*640'
        // }
        ],
        samplerIndex: 'Euler a',
        samplerIndexArr: [
            {value: 'Euler a', label: 'Euler a'},
            {value: 'Euler', label: 'Euler'},
            {value: 'LMS', label: 'LMS'},
            {value: 'LMS Karras', label: 'LMS Karras'},
            {value: 'DDIM', label: 'DDIM'},
            {value: 'Heun', label: 'Heun'},
            {value: 'DPM fast', label: 'DPM fast'},
            {value: 'DPM adaptive', label: 'DPM adaptive'},
            {value: 'DPM2', label: 'DPM2'},
            {value: 'DPM2 aDPM2 Karras', label: 'DPM2 aDPM2 Karras'},
            {value: 'DPM2 a Karras', label: 'DPM2 a Karras'},
            {value: 'DPM++ 2S a', label: 'DPM++ 2S a'},
            {value: 'DPM++ 2M', label: 'DPM++ 2M'},
            {value: 'DPM++ SDE', label: 'DPM++ SDE'},
            {value: 'DPM++ 2S a Karras', label: 'DPM++ 2S a Karras'},
            {value: 'DPM++ 2M Karras', label: 'DPM++ 2M Karras'},
            {value: 'DPM++ SDE Karras', label: 'DPM++ SDE Karras'},
            {value: 'DPM++ 2M SDE Karras', label: 'DPM++ 2M SDE Karras'},
        ],
        SDWaitQueue: 0,
        SDValue: '',
        SDModel: [],
        aiNameList: [
            {value: 9, label: 'Stable Diffusion'},
            {value: 6, label: 'Midjourney'},
            // {value: 2, label: 'DALL·E 2'},
            {value: 3, label: '百度绘画'}
        ],
        drawTextarea: '',
        actionType: 3, // 是否为图文生图 3：文字；5：图文生图
        updataRightList: 2,
        sessionRightNavCode: '',
        imgUrl: {},
        loginInfo: null,
        isClickChat: false, // 点击了历史会话
        randomStr: 0, // 随机数，用于刷新历史会话
        queryErrorMsg: '',
        mjImageStyle: false, // mj绘画风格
        mjWaitQueue: {},
        mjProgress: '',

        startNewChatDALLE2: false, // 开启新会话DELL·E2
        startNewChatBAIDU: false, // 开启新会话百度绘画
        startNewChatMJ: false, // 开启新会话MJ
        startNewChatstableDiffusion: false, // 开启新会话MJ
    }
  },

  // 注册组件
  components: {
    Register,
    TemplateSelect,
    rightNav,
    pay
},
computed: {
    ...mapGetters(['contactService', 'base64'])
},

  watch: {
    AIname: {
        deep: true,
        handler() {
            if (this.AIname == 2) {
                this.textAreaLength == 900
                if (!this.$route.params.sendMsg && this.isBtn) {
                    this.isTimeDell = false
                }
                this.$store.dispatch('user/changeChatListLength', this.chatList.length)
            } else if (this.AIname == 3) {
                if (!this.$route.params.sendMsg && this.isBtn) {
                    this.isTimeBaidu = false
                }
                this.textAreaLength == 2000
                this.$store.dispatch('user/changeChatListLength', this.baiduList.length)
            } else if (this.AIname == 6){
                this.mjImageStyle = false
                if (!this.$route.params.sendMsg && this.isBtn) {
                    this.isTimeMidjourney = false
                }
                this.textAreaLength == 2000
                this.$store.dispatch('user/changeChatListLength', this.midjourneyList.length)
                mjWaitingQuery().then(res => {
                    this.mjWaitQueue = {
                        people: res.data.data,
                        time: (res.data.data * 30 / 2).toFixed(0)
                    }
                })
            } else if (this.AIname == 9){
                if (!this.$route.params.sendMsg && this.isBtn) {
                    this.isTimestableDiffusion = false
                }
                this.textAreaLength == 2000
                this.$store.dispatch('user/changeChatListLength', this.stableDiffusionList.length)
                getSDQueue().then(res => {
                    this.SDWaitQueue = res.data.message_count
                })
            }
            this.isuser = true
            this.drawTextarea = ''
            this.chat_type = this.AIname
            this.$store.dispatch('id/setAIChatname', this.AIname)
            this.updataRightList = Number(this.AIname)
        }
    },
    association: {
        deep: true,
        handler() {
            if (this.association == '1') {
                this.isShowChecked = true
            } else {
                this.isShowChecked = false
            }
        }
    },
    chatList: {
        deep: true,
        handler() {
            if (this.chatList.length == 0) {
                this.startNewChatDALLE2 = false
            } else {
                this.startNewChatDALLE2 = true
            }
        }
    },
    baiduList: {
        deep: true,
        handler() {
            if (this.baiduList.length == 0) {
                this.startNewChatBAIDU = false
            } else {
                this.startNewChatBAIDU = true
            }
        }
    },
    midjourneyList: {
        deep: true,
        handler() {
            if (this.midjourneyList.length == 0) {
                this.startNewChatMJ = false
            } else {
                this.startNewChatMJ = true
            }
        }
    },
    stableDiffusionList: {
        deep: true,
        handler() {
            if (this.stableDiffusionList.length == 0) {
                this.startNewChatstableDiffusion = false
            } else {
                this.startNewChatstableDiffusion = true
            }
        }
    },
  },
 
  created() {
    this.loginInfo = JSON.parse(localStorage.getItem('userInfo'));
    this.$root.Bus.$on('selectChat', value => { // 接收点击相应会话标识
        this.chatList = [];
        this.$store.dispatch('user/changeChatListLength', this.chatList.length)
        this.baiduList = [];
        this.$store.dispatch('user/changeChatListLength', this.baiduList.length)
        this.midjourneyList = [];
        this.$store.dispatch('user/changeChatListLength', this.midjourneyList.length)
        this.stableDiffusionList = [];
        this.$store.dispatch('user/changeChatListLength', this.stableDiffusionList.length)
        this.sendValue = '';
        this.getDetail(value);
    })

    this.$root.Bus.$on('delChat', value => { // 清空历史会话
        this.chatList = [];
        this.$store.dispatch('user/changeChatListLength', this.chatList.length)
        this.baiduList = [];
        this.$store.dispatch('user/changeChatListLength', this.baiduList.length)
        this.midjourneyList = [];
        this.$store.dispatch('user/changeChatListLength', this.midjourneyList.length)
        this.stableDiffusionList = [];
        this.$store.dispatch('user/changeChatListLength', this.stableDiffusionList.length)
        if (this.chat_type == 2) {
            this.isTimeDell = false;
        } else {
            this.isTimeBaidu = false;
        }
    })
    localStorage.setItem('session_code2', '');
    localStorage.setItem('session_code3', '');
    localStorage.setItem('session_code6', '');
    localStorage.setItem('session_code9', '');
    this.drawingSetRecommend()
    this.updataRightList =  this.chat_type

    SDModel().then(res => {
        console.log(res);
        this.SDValue = res.data[0].value
        this.SDModel = res.data
    })

  },

  mounted() {
    // document.title = 'AI绘画-能根据用户的文本描述生成图像-是一款人工智能生成器-' + httpUrls.name
    // let metaKeywords = document.createElement('meta')
    // metaKeywords.id = 'chat-meta-keywords'
    // metaKeywords.name = 'keywords'
    // metaKeywords.content = 'AI绘画,DALL-E 2,百度绘画,人工智能艺术生成器,AI文本生成图像'
    // document.getElementsByTagName('head')[0].appendChild(metaKeywords)
    
    // let metaDescription = document.createElement('meta')
    // metaDescription.id = 'chat-meta-description'
    // metaDescription.name = 'description'
    // metaDescription.content = httpUrls.name + '的AI绘画功能,接入的是openai的文本生成图像系统DALL·E 2,和百度绘画系统的功能,能为人类增强视觉艺术和创造力,任何人都可以使用这个人工智能艺术生成器.'
    // document.getElementsByTagName('head')[0].appendChild(metaDescription)
    
    if (this.$route.query.item != undefined) {
        this.sendValue = this.$route.query.item
    }
    
    if (this.$route.params.item != undefined) {
        this.sendValue = this.$route.params.item
        this.chat_type = Number(this.$route.params.id)
        this.AIname = Number(this.$route.params.id)
        this.sizeRadio = this.$route.params.size
        if (this.$route.params.sendMsg) {
            this.sendMsg()
        }
    }
    if (this.$route.params.id != undefined && this.$route.params.code != undefined) {
        this.getDetail(this.$route.params.code);
        this.AIname = this.$route.params.id
        this.chat_type = this.$route.params.id
    }
    if (this.$route.query.id != undefined) {
        let aiN = this.$route.query.id
        if (Number(aiN) != 2 && Number(aiN) != 3 && Number(aiN) != 6) {
            aiN = 2
        }
        this.AIname = aiN
        this.chat_type = aiN
    }
  },

  beforeDestroy() {
    // document.getElementById('chat-meta-keywords').remove()
    // document.getElementById('chat-meta-description').remove()
  },

  

  /**
   * 里面的方法只有被调用才会执行
   */
  methods: {
    //键盘按下事件
    handleKeyUp(event){
      if (event.shiftKey && event.keyCode === 13) {
        // 按下 Shift+Enter，换行
        console.log('换行')
      } else if (event.keyCode === 13) {
        // 按下 Enter，发送
        // 在这里添加你的发送逻辑
        this.sendMsg(3)
      }
    },
    selectAIname(type) {
        this.AIname = type
    },
    undateName(aiId) {
        this.AIname = aiId
    },
    updataChatList(code) {
        this.isuser = true
        this.isClickChat = true
        this.getDetail(code)
    },

    huanYiPi() {
        this.drawingSetRecommend()
    },

    // 获取热词
    getRecommend() {
        recommend('').then(res => {
            if (res.data != null) {
                this.qsList = res.data.recommend_list
            }
        })
    },

      //选择版本
      handleClick(tab, event) {
        this.activeName = tab.index;
        this.isuser = true
        this.chat_type = tab.index;
        if(this.activeName == 2) {
            this.chatText = 'DALL·E2'
        } else {
            this.chatText = '百度绘画'
        }
        // 每次选择版本清空对话框
        this.isBtn = true
        this.isShow = false;
        if (this.chat_type == 2) {
            this.isTimeDell = false
        } else {
            this.isTimeBaidu = false
        }
        this.updataRightList = this.chat_type
      },

      // 获取会话详情
      getDetail(code) {
        this.isDetail  = true;
        if (this.chat_type == 2) {
            this.isTimeDell = false
            this.isShowTemplateDALL = false
        } else if (this.chat_type == 3) {
            this.isTimeBaidu = false
            this.isShowTemplateBaidu = false
        } else if (this.chat_type == 6) {
            this.isTimeMidjourney = false
            this.isShowTemplateMidJ = false
        } else if (this.chat_type == 9) {
            this.isTimestableDiffusion = false
            this.isShowTemplatestableDiffusion = false
        }
        this.isfinish = true;
        
        
        chatDetail(code).then(res => {
            if (this.AIname == 2) {
                this.chatList = [];
                this.$store.dispatch('user/changeChatListLength', this.chatList.length)
            } else if (this.AIname == 3) {
                this.baiduList = [];
                this.$store.dispatch('user/changeChatListLength', this.baiduList.length)
            } else if (this.AIname == 6) {
                this.midjourneyList = [];
                this.$store.dispatch('user/changeChatListLength', this.midjourneyList.length)
            } else if (this.AIname == 9) {
                this.stableDiffusionList = [];
                this.$store.dispatch('user/changeChatListLength', this.stableDiffusionList.length)
            }
            if (res.code == 20000) {
               let arr = res.data;
               arr.forEach((item,index) => {
                  
                  let cont = '';
                  let img_urls = [];
                  item.info.forEach((res,tip) => {
                    if(tip > 0) {
                        let url = { url: res.content }
                        img_urls.push(url)
                        if(res.chat_type == 2) {
                            localStorage.setItem('session_code2', code);
                            localStorage.setItem('chat_group_code2', item.chat_group_code);
                        }

                        if(res.chat_type == 3) {
                            localStorage.setItem('session_code3', code);
                            localStorage.setItem('chat_group_code3', item.chat_group_code);
                        }

                        if(res.chat_type == 6) {
                            localStorage.setItem('session_code6', code);
                            localStorage.setItem('chat_group_code6', item.chat_group_code);
                        }

                        if(res.chat_type == 9) {
                            localStorage.setItem('session_code9', code);
                            localStorage.setItem('chat_group_code9', item.chat_group_code);
                        }
                    }
                    
                  })

                  this.chat_type = item.info[0].chat_type;
                  item.info[0].help = item.info[0].is_likes == 1 ? true : false
                  item.info[0].stepOn = item.info[0].is_likes == 2 ? true : false
                  item.info[0].timer = false // 耗时
                  item.info[0].isClickChat = true // 图片可下载
                  item.info[0].isShowOldChat = false // 是否显示图文生图
                  item.info[1].image_urls = img_urls
                  item.info[1].help = item.info[1].is_likes == 1 ? true : false
                  item.info[1].stepOn = item.info[1].is_likes == 2 ? true : false
                  item.info[0].timer = false // 耗时
                  item.info[1].isClickChat = true // 图片可下载
                  item.info[1].isShowOldChat = false // 是否显示图文生图
                  item.info[1].finish_reason = 'stop';
                  item.info[1].content = item.info[1].is_mod == 1 ? '图片内容涉及敏感请重新提问。' : '生成失败，本次不消耗绘画次数'
                //   try {
                    
                //       item.info[1].is_mod = res.data[1].is_mod
                //       item.info[1].status = res.data[1].status
                //   } catch (error) {
                //     console.log(error);
                //   }
                  let newArr = [item.info[0], item.info[1]];
                if(this.chat_type == 2) {
                    this.chatList = this.chatList.concat(newArr);
                    this.$store.dispatch('user/changeChatListLength', this.chatList.length)
                }
                
                if(this.chat_type == 3) {
                    this.baiduList = this.baiduList.concat(newArr);
                    this.$store.dispatch('user/changeChatListLength', this.baiduList.length)
                }

                if(this.chat_type == 6) {
                    this.midjourneyList = this.midjourneyList.concat(newArr);
                    this.$store.dispatch('user/changeChatListLength', this.midjourneyList.length)
                }

                if(this.chat_type == 9) {
                    this.stableDiffusionList = this.stableDiffusionList.concat(newArr);
                    this.$store.dispatch('user/changeChatListLength', this.stableDiffusionList.length)
                }
                  

               })
               this.isShow = true;
               this.toBottom();
            } else {
                this.$message.error(res.msg)
            }
        }).catch(err => {
            this.$message.error('获取会话失败！')
        })
      },
      dellSend() {
        this.isShowassociation = false
        this.isShowChecked = false
        this.chatList.forEach(v => {
            v.checked = false
        })
        
        this.isDetail  = false;
        this.isShow = true;  // 快速提问
        this.isfinish = false; // 完成打字效果
        this.isBtn = false;  // 是否允许重发

        //月份是从0月开始获取的，所以要+1;
        let month = new Date().getMonth() +1;
        //日
        let day = new Date().getDate();
        //时
        let hour = new Date().getHours();
        //分
        let minute = new Date().getMinutes();
        //秒
        let second = new Date().getSeconds();
        if(month < 10) { month = '0'+ month }
        if(day < 10) { day = '0'+ day }
        if(hour < 10) { hour = '0'+ hour }
        if(minute < 10) { minute = '0'+ minute }
        if(second < 10) { second = '0'+ second }

        let date = month +'/'+ day +' '+ hour +'-'+ minute +'-'+ second;

        let sendVal = {  // 询问者问题展示
            "create_time": date,
            "finish_reason": "length",
            "session_code": '',
            "chat_group_code": '',
            "role": "user",
            "content": this.sendValue || this.drawTextarea,
            checked: false,
            help: false,
            stepOn: false,
            isShowOldChat: true,
            timer: false,
        }
        
        this.chatList.push(sendVal);
        this.$store.dispatch('user/changeChatListLength', this.chatList.length)
        this.toBottom();
      
        // this.isTime = true; // 思考中
        if (this.chat_type == 2) {
            this.isTimeDell = true
        } else {
            this.isTimeBaidu = true
        }
        this.timer = 0;
        this.t_time = setInterval(() => {
            this.timer += 1;
        }, 1000)

        let vals = new FormData()
        if (this.drawDialogRadio == '') {
            this.actionType = 3
        }
        if (this.actionType == 5 && Number(this.drawDialogRadio) == 1) {
                vals.append('action_type', this.actionType)
                vals.append('content', this.drawTextarea)
                vals.append('n', 1)
                vals.append('size', sessionStorage.getItem('sizeRadio2') || '256x256')
                vals.append('image', base64toFile(this.imgUrl.baseUrl, 'file'))
                vals.append('mask', '')
                vals.append('session_code', localStorage.getItem('session_code2') || '')
        } else {
                vals.append('action_type', this.actionType)
                vals.append('content', this.sendValue || this.drawTextarea)
                vals.append('n', 1)
                vals.append('size', this.sizeRadio || sessionStorage.getItem('sizeRadio2'))
                vals.append('session_code', localStorage.getItem('session_code2') || '')
        }
        if (this.sizeRadio != '') {
            sessionStorage.setItem('sizeRadio2', this.sizeRadio)
        }
        this.sizeRadio = ''
        this.sendValue = ''
        
        axios.post(httpUrls.httpUrl + 'api/chat/async_image_generation', vals, {
            headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'authorization': this.loginInfo.token,
            'role': this.loginInfo.role,
            'source': 'pc'
        },
        }).then(res => {
            this.sendValue = '';// 清空发送栏内容
            if (res.data.code == 20000) {
                clearInterval(this.t_time);
                this.isuser = true;
                res.data.data.create_time = res.data.data.create_time.replace(/-/g, "/");
                res.data.data.create_time = res.data.data.create_time.slice(5);
                res.data.data.checked = false
                res.data.data.help = false
                res.data.data.timer = this.timer
                res.data.data.stepOn = false
                res.data.data.isShowOldChat = true // 是否显示图文生图
                if (!this.isClickChat) {
                    this.chatList.push(res.data.data);
                    localStorage.setItem('session_code2', res.data.data.session_code);
                    localStorage.setItem('chat_group_code2', res.data.data.chat_group_code);
                }
                this.randomStr = Math.random()
                this.$store.dispatch('user/changeChatListLength', this.chatList.length)
                this.isBtn = true;
                if (this.chat_type == 2) {
                    this.isTimeDell = false
                } else {
                    this.isTimeBaidu = false
                }
                // 定位到聊天最底部
                this.toBottom();
            } else if(res.data.code == 30014 || res.data.code == 40022) {
                this.queryErrorMsg = res.data.msg
                this.isBtn = true;
                this.isTime = false;
                if (this.chat_type == 2) {
                    this.isTimeDell = false
                } else if (this.chat_type == 3) {
                    this.isTimeBaidu = false
                } else if (this.chat_type == 6) {
                    this.isTimeMidjourney = false
                }
                clearInterval(this.t_time);
                if (this.loginInfo.role == 'guess') {
                    this.isuser = false;
                    return
                }
                if (this.loginInfo.role == 'user') {
                    this.isuser = false;
                    return
                }
            } else {
                this.isBtn = true;
                if (this.chat_type == 2) {
                    this.isTimeDell = false
                } else if (this.chat_type == 3) {
                    this.isTimeBaidu = false
                } else if (this.chat_type == 6) {
                    this.isTimeMidjourney = false
                }
                clearInterval(this.t_time);
                this.$message.error(res.data.msg)
            }
        }).catch(err => {
            clearInterval(this.t_time);
            this.$message.error('网络异常，请重试!')
            this.isBtn = true
        })
        this.dialogVisible = false
      },

      baiduSend() {
        if(this.sendValue.length >= 100) {
            this.$message({
                type: 'error',
                message: '绘画内容不能超过100个字'
            })
            return false;
        }
        if (this.drawTextarea.length >= 100) {
            this.$message({
                type: 'error',
                message: '绘画内容不能超过100个字'
            })
            return
        }
        this.isShowassociation = false
        this.isShowChecked = false
        this.baiduList.forEach(v => {
            v.checked = false
        })
        
        this.isDetail  = false;
        this.isShow = true;  // 快速提问
        this.isfinish = false; // 完成打字效果
        this.isBtn = false;  // 是否允许重发

        //月份是从0月开始获取的，所以要+1;
        let month = new Date().getMonth() +1;
        //日
        let day = new Date().getDate();
        //时
        let hour = new Date().getHours();
        //分
        let minute = new Date().getMinutes();
        //秒
        let second = new Date().getSeconds();
        if(month < 10) { month = '0'+ month }
        if(day < 10) { day = '0'+ day }
        if(hour < 10) { hour = '0'+ hour }
        if(minute < 10) { minute = '0'+ minute }
        if(second < 10) { second = '0'+ second }

        let date = month +'/'+ day +' '+ hour +'-'+ minute +'-'+ second;

        let sendVal = {  // 询问者问题展示
            "create_time": date,
            "finish_reason": "length",
            "session_code": '',
            "chat_group_code": '',
            "role": "user",
            "content": this.sendValue,
            checked: false,
            help: false,
            stepOn: false,
            timer: false,
            isShowOldChat: true
        }
        
        this.baiduList.push(sendVal);
        this.$store.dispatch('user/changeChatListLength', this.baiduList.length)
        this.toBottom();
      
        // this.isTime = true; // 思考中
        if (this.chat_type == 2) {
            this.isTimeDell = true
        } else if (this.chat_type == 3) {
            this.isTimeBaidu = true
        } else if (this.chat_type == 6) {
            this.isTimeMidjourney = true
        }
        this.timer = 0;
        this.t_time = setInterval(() => {
            this.timer += 1;
        }, 1000)

        let data = new FormData()
        
        if (this.actionType == 3) {
                data.append("content", this.sendValue)
                data.append("size", this.sizeRadio)
                data.append("n", 1)
                data.append("chat_type", this.AIname)
                data.append("session_code", localStorage.getItem('session_code3') || '')
                data.append("action_type", this.actionType)
        } else {
                data.append("content", this.drawTextarea)
                data.append("size", sessionStorage.getItem('sizeRadio2') || '1024*1024')
                data.append("n", 1)
                data.append("chat_type", this.AIname)
                data.append("session_code", localStorage.getItem('session_code3') || '')
                data.append("action_type", this.actionType)
                data.append("image", base64toFile(this.imgUrl.base64Url, 'file'))
                data.append("url", this.imgUrl.url)
        }
        this.sendValue = ''
        sessionStorage.setItem('sizeRadio2', this.sizeRadio)
        if (this.AIname == 3) { // 百度绘画
            this.sizeRadio = ''
            axios.post(httpUrls.httpUrl + 'api/chat/baidu_ernie_image', data, {
                headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'authorization': this.loginInfo.token,
                'role': this.loginInfo.role,
                'source': 'pc'
            },})
            .then(res => {
                this.sendValue = '';// 清空发送栏内容
                if(res.data.code == 20000) {
                    let data = { "task_id": res.data.data.task_id, "action_type": this.actionType, };
                    let draw_time = setInterval(() => {
                        baiduErnieImage(data).then(val => {
                        if(val.code == 20000) {
                            if(val.data != null) {
                                this.isuser = true;
                                val.data[0].create_time = val.data[0].create_time.replace(/-/g, "/");
                                val.data[0].create_time = val.data[0].create_time.slice(5);
                                val.data[0].checked = false;
                                let img_urls = [];
                                let url_val = { url: val.data[0].content }
                                img_urls.push(url_val);
                                clearInterval(this.t_time);
                                let obj = {
                                    "create_time": val.data[0].create_time,
                                    "finish_reason": "stop",
                                    "session_code": val.data[0].session_code,
                                    "chat_group_code": val.data[0].chat_group_code,
                                    "size": val.data[0].size,
                                    "role": "assistant",
                                    "image_urls": img_urls,
                                    url_base: val.data[0].url_base,
                                    help: false,
                                    stepOn: false,
                                    isShowOldChat: true,
                                    timer: this.timer
                                }
                                
                                if (!this.isClickChat) {
                                    this.baiduList.push(obj);
                                    localStorage.setItem('session_code3', val.data[0].session_code);
                                    localStorage.setItem('chat_group_code3', val.data[0].chat_group_code);
                                }
                                this.randomStr = Math.random()
                                this.$store.dispatch('user/changeChatListLength', this.baiduList.length)
                                this.isBtn = true;
                                if (this.chat_type == 2) {
                                    this.isTimeDell = false
                                } else {
                                    this.isTimeBaidu = false
                                }
                                clearInterval(draw_time);
                                // 定位到聊天最底部
                                this.toBottom();
                            }
                            
                        }else {
                            this.isuser = true;
                            this.isBtn = true;
                            if (this.chat_type == 2) {
                                this.isTimeDell = false
                            } else {
                                this.isTimeBaidu = false
                            }
                            clearInterval(this.t_time);
                            clearInterval(draw_time);
                            this.$message.error(val.msg)
                        }
                    })
                    }, 2000)
                    
                }  else if(res.data.code == 30014 || res.data.code == 40022) {
                    this.queryErrorMsg = res.data.msg
                    this.isBtn = true;
                    if (this.chat_type == 2) {
                        this.isTimeDell = false
                    } else if (this.chat_type == 3) {
                        this.isTimeBaidu = false
                    } else if (this.chat_type == 6) {
                        this.isTimeMidjourney = false
                    }
                    clearInterval(this.t_time);
                    if (this.loginInfo.role == 'guess') {
                        this.isuser = false;
                        return
                    }
                    if (this.loginInfo.role == 'user') {
                        this.isuser = false;
                        return
                    }
                } else {
                    this.isBtn = true;
                    if (this.chat_type == 2) {
                        this.isTimeDell = false
                    } else if (this.chat_type == 3) {
                        this.isTimeBaidu = false
                    } else if (this.chat_type == 6) {
                        this.isTimeMidjourney = false
                    }
                    clearInterval(this.t_time);
                    this.$message.error(res.data.msg)
                }
            }).catch(err => {
                this.isBtn = true;
                if (this.chat_type == 2) {
                    this.isTimeDell = false
                } else {
                    this.isTimeBaidu = false
                }
                clearInterval(this.t_time);
                this.$message.error('绘图失败！')
            })
        }
      },

      midjourneySend() {
        this.isShowassociation = false
        this.isShowChecked = false
        this.midjourneyList.forEach(v => {
            v.checked = false
        })
        
        this.isDetail  = false;
        this.isShow = true;  // 快速提问
        this.isfinish = false; // 完成打字效果
        this.isBtn = false;  // 是否允许重发

        //月份是从0月开始获取的，所以要+1;
        let month = new Date().getMonth() +1;
        //日
        let day = new Date().getDate();
        //时
        let hour = new Date().getHours();
        //分
        let minute = new Date().getMinutes();
        //秒
        let second = new Date().getSeconds();
        if(month < 10) { month = '0'+ month }
        if(day < 10) { day = '0'+ day }
        if(hour < 10) { hour = '0'+ hour }
        if(minute < 10) { minute = '0'+ minute }
        if(second < 10) { second = '0'+ second }

        let date = month +'/'+ day +' '+ hour +'-'+ minute +'-'+ second;

        let sendVal = {  // 询问者问题展示
            "create_time": date,
            "finish_reason": "length",
            "session_code": '',
            "chat_group_code": '',
            "role": "user",
            "content": this.sendValue,
            checked: false,
            help: false,
            stepOn: false,
            timer: false,
            isShowOldChat: true
        }
        
        this.midjourneyList.push(sendVal);
        this.$store.dispatch('user/changeChatListLength', this.midjourneyList.length)
        this.toBottom();
      
        if (this.chat_type == 2) {
            this.isTimeDell = true
        } else if (this.chat_type == 3) {
            this.isTimeBaidu = true
        } else if (this.chat_type == 6) {
            this.isTimeMidjourney = true
        }

        this.timer = 0;
        this.t_time = setInterval(() => {
            this.timer += 1;
        }, 1000)

        let data = new FormData()
        
        if (this.actionType == 3) {
                data = {
                    content: this.sendValue,
                    size: this.sizeRadio,
                    chat_type: this.AIname,
                    session_code: localStorage.getItem('session_code6') || '',
                    action_type: this.actionType,
                    is_niji: this.mjImageStyle
                }
        } else {
                data.append("content", this.drawTextarea)
                data.append("size", sessionStorage.getItem('sizeRadio6') || '1:1')
                data.append("chat_type", this.AIname)
                data.append("session_code", localStorage.getItem('session_code6') || '')
                data.append("action_type", this.actionType)
                data.append("image", base64toFile(this.imgUrl.base64Url, 'file'))
                data.append("url", this.imgUrl.url)
                data.append("is_niji", this.mjImageStyle)
        }
        data = {
            'content': this.sendValue,
            'size': this.sizeRadio,
            'chat_type': this.AIname + '',
            'session_code': localStorage.getItem('session_code6') || '',
            'action_type': this.actionType + '',
            'is_niji': this.mjImageStyle
        }
        this.sendValue = ''

        sessionStorage.setItem('sizeRadio6', this.sizeRadio)
        if (this.AIname == 6) { // MJ
            this.sizeRadio = ''
            textTranslate({text: data.content}).then(res => {
                data.content_en = res.data.text
                if (res.code != 20000) {
                    this.isBtn = true;
                    if (this.chat_type == 2) {
                        this.isTimeDell = false
                    } else if (this.chat_type == 3) {
                        this.isTimeBaidu = false
                    } else if (this.chat_type == 6) {
                        this.isTimeMidjourney = false
                    }
                    clearInterval(this.t_time);
                    this.$message.error(res.msg)
                    return
                }
                mjCreateImage(data).then(res => {
                    this.sendValue = '';// 清空发送栏内容
                    if(res.code == 20000) {
                        let data = res.data.tag
                        let tiemrs = 0
                        let draw_time = setInterval(() => {
                            tiemrs++
                            mjGetImageEnd(data).then(val => {
                                if (val.data[0].status == 2) {
                                    this.$message.error('您的输入涉及不良内容，请勿发布违规信息，请注意文明用语。')
                                }
                            this.mjProgress = val.data[0].progress
                            if(val.code == 20000 && val.data[0].progress == '100') {
                                if(val.data != null) {
                                    this.isuser = true;
                                    val.data[0].create_time = val.data[0].create_time.replace(/-/g, "/");
                                    val.data[0].create_time = val.data[0].create_time.slice(5);
                                    val.data[0].checked = false;
                                    let img_urls = [];
                                    let url_val = { url: val.data[0].content }
                                    img_urls.push(url_val);
                                    clearInterval(this.t_time);
                                    let obj = {
                                        "create_time": val.data[0].create_time,
                                        "finish_reason": "stop",
                                        "session_code": val.data[0].session_code,
                                        "chat_group_code": val.data[0].chat_group_code,
                                        "size": val.data[0].size,
                                        "role": "assistant",
                                        "image_urls": img_urls,
                                        url_base: val.data[0].url_base,
                                        help: false,
                                        stepOn: false,
                                        isShowOldChat: true,
                                        timer: this.timer
                                    }
                                    
                                    if (!this.isClickChat) {
                                        this.midjourneyList.push(obj);
                                        localStorage.setItem('session_code6', val.data[0].session_code);
                                        localStorage.setItem('chat_group_code6', val.data[0].chat_group_code);
                                    }
                                    this.randomStr = Math.random()
                                    this.$store.dispatch('user/changeChatListLength', this.midjourneyList.length)
                                    this.isBtn = true;
                                    if (this.chat_type == 2) {
                                        this.isTimeDell = false
                                    } else if (this.chat_type == 3) {
                                        this.isTimeBaidu = false
                                    } else if (this.chat_type == 6) {
                                        this.isTimeMidjourney = false
                                    }
                                    clearInterval(draw_time);
                                    // 定位到聊天最底部
                                    this.toBottom();
                                }
                                
                            }else if (val.code != 20000) {
                                this.isuser = true;
                                this.isBtn = true;
                                if (this.chat_type == 2) {
                                    this.isTimeDell = false
                                } else if (this.chat_type == 3) {
                                    this.isTimeBaidu = false
                                } else if (this.chat_type == 6) {
                                    this.isTimeMidjourney = false
                                }
                                clearInterval(this.t_time);
                                clearInterval(draw_time);
                                this.$message.error(val.msg)
                            }
    
                            // 查询时间>=200秒之后停止查询
                            if (tiemrs >= 100) {
                                this.$message({
                                    message: '当前等待时间过长，请稍后前往历史记录查看',
                                    duration: 7000
                                })
                                clearInterval(this.t_time);
                                clearInterval(draw_time);
                                this.randomStr = Math.random()
                                this.isuser = true;
                                this.isBtn = true;
                                if (this.chat_type == 2) {
                                    this.isTimeDell = false
                                } else if (this.chat_type == 3) {
                                    this.isTimeBaidu = false
                                } else if (this.chat_type == 6) {
                                    this.isTimeMidjourney = false
                                }
                            }
                        })
                        }, 2000)
                        
                    }  else if(res.code == 30014 || res.code == 40022) {
                        try {
                            this.queryErrorMsg = res.msg
                            this.isBtn = true;
                            if (this.chat_type == 2) {
                                this.isTimeDell = false
                            } else if (this.chat_type == 3) {
                                this.isTimeBaidu = false
                            } else if (this.chat_type == 6) {
                                this.isTimeMidjourney = false
                            }
                            clearInterval(this.t_time);
                            if (this.loginInfo.role == 'guess') {
                                this.isuser = false;
                                return
                            }
                            if (this.loginInfo.role == 'user') {
                                this.isuser = false;
                                return
                            }
                            
                        } catch (error) {
                        }
                    } else {
                        this.isBtn = true;
                        if (this.chat_type == 2) {
                            this.isTimeDell = false
                        } else if (this.chat_type == 3) {
                            this.isTimeBaidu = false
                        } else if (this.chat_type == 6) {
                            this.isTimeMidjourney = false
                        }
                        clearInterval(this.t_time);
                        this.$message.error(res.msg)
                    }
                }).catch(err => {
                    this.isBtn = true;
                    if (this.chat_type == 2) {
                        this.isTimeDell = false
                    } else if (this.chat_type == 3) {
                        this.isTimeBaidu = false
                    } else if (this.chat_type == 6) {
                        this.isTimeMidjourney = false
                    }
                    clearInterval(this.t_time);
                    this.$message.error('绘图失败！')
                })
            })
        }
      },

      // SD绘画
      stableDiffusionSend() {
        this.isShowassociation = false
        this.isShowChecked = false
        this.stableDiffusionList.forEach(v => {
            v.checked = false
        })
        
        this.isDetail  = false;
        this.isShow = true;  // 快速提问
        this.isfinish = false; // 完成打字效果
        this.isBtn = false;  // 是否允许重发

        //月份是从0月开始获取的，所以要+1;
        let month = new Date().getMonth() +1;
        //日
        let day = new Date().getDate();
        //时
        let hour = new Date().getHours();
        //分
        let minute = new Date().getMinutes();
        //秒
        let second = new Date().getSeconds();
        if(month < 10) { month = '0'+ month }
        if(day < 10) { day = '0'+ day }
        if(hour < 10) { hour = '0'+ hour }
        if(minute < 10) { minute = '0'+ minute }
        if(second < 10) { second = '0'+ second }

        let date = month +'/'+ day +' '+ hour +'-'+ minute +'-'+ second;

        let sendVal = {  // 询问者问题展示
            "create_time": date,
            "finish_reason": "length",
            "session_code": '',
            "chat_group_code": '',
            "role": "user",
            "content": this.sendValue,
            checked: false,
            help: false,
            stepOn: false,
            timer: false,
            isShowOldChat: true
        }
        
        this.stableDiffusionList.push(sendVal);
        this.$store.dispatch('user/changeChatListLength', this.stableDiffusionList.length)
        this.toBottom();
      
        if (this.chat_type == 2) {
            this.isTimeDell = true
        } else if (this.chat_type == 3) {
            this.isTimeBaidu = true
        } else if (this.chat_type == 6) {
            this.isTimeMidjourney = true
        } else if (this.chat_type == 9) {
            this.isTimestableDiffusion = true
        }

        this.timer = 0;
        this.t_time = setInterval(() => {
            this.timer += 1;
        }, 1000)

        let data = new FormData()
        data = {
            'content': this.sendValue, // 用户输入内容/翻译后
            'size': this.sizeRadio,
            'chat_type': this.AIname + '',
            'session_code': localStorage.getItem('session_code9') || '',
            'action_type': this.actionType + '',
            "sampler_index": this.samplerIndex || 'Euler a',
            "sd_model_checkpoint": this.SDValue,
            "negative_prompt": this.drawTextarea, // 方向提示词/翻译后
            "content_zh": '', // 用户输入内容
            "negative_prompt_zh": '' // 反向提示词
        }
        this.sendValue = ''
        this.drawTextarea = ''

        sessionStorage.setItem('sizeRadio9', this.sizeRadio)
        if (this.AIname == 9) { // MJ
            this.sizeRadio = ''
            console.log(data);
            textTranslate({text: data.content}).then(res => {
                data.content_zh = data.content
                data.content = res.data.text
                if (data.negative_prompt != '') {
                    textTranslate({text: data.negative_prompt}).then(r => {
                        data.negative_prompt_zh = data.negative_prompt
                        data.negative_prompt_zh = r.data.text
                        this.SDDrawImage(data)
                    })
                } else {
                    this.SDDrawImage(data)
                }
            })
        }
      },

      // SD绘画
      SDDrawImage(data) {
        SDCreateImage(data).then(res => {
            // data.content_en = res.data.tag
            if (res.code != 20000) {
                this.isBtn = true;
                if (this.chat_type == 2) {
                    this.isTimeDell = false
                } else if (this.chat_type == 3) {
                    this.isTimeBaidu = false
                } else if (this.chat_type == 6) {
                    this.isTimeMidjourney = false
                } else if (this.chat_type == 9) {
                    this.isTimestableDiffusion = false
                }
                clearInterval(this.t_time);
                this.$message.error(res.msg)
                return
            }
            this.SDResultImage(res.data.tag)
        })
      },

      // SD绘画结果
      SDResultImage(result) {
        SDResultImage(`task_id=${result}`).then(val => {
            if (val.data != null && (Number(val.data[0].is_mod) == 1 || Number(val.data[0].status) == 1)) {
                let obj = {
                    "create_time": val.data[0].create_time,
                    "finish_reason": "stop",
                    "session_code": val.data[0].session_code,
                    "chat_group_code": val.data[0].chat_group_code,
                    "size": val.data[0].size,
                    "role": "assistant",
                    "image_urls": [{url: val.data.msg}],
                    url_base: val.data[0].url_base,
                    help: false,
                    stepOn: false,
                    isShowOldChat: true,
                    timer: this.timer,
                    is_mod: val.data[0].is_mod,
                    status: val.data[0].status,
                    content: val.data[0].is_mod == 1 ? '图片内容涉及敏感请重新提问。' : '生成失败，本次不消耗绘画次数'
                }
                if (!this.isClickChat) {
                    this.stableDiffusionList.push(obj);
                }
                this.isuser = true;
                this.isBtn = true;
                if (this.chat_type == 2) {
                    this.isTimeDell = false
                } else if (this.chat_type == 3) {
                    this.isTimeBaidu = false
                } else if (this.chat_type == 6) {
                    this.isTimeMidjourney = false
                } else if (this.chat_type == 9) {
                    this.isTimestableDiffusion = false
                }
                clearInterval(this.t_time);
                return
            }
            if (val.code == 20000 && val.data == null) {
                setTimeout(() => {
                    this.SDResultImage(result)
                }, 2000);
            } else if (val.code == 20000) {
                this.isuser = true;
                val.data[0].create_time = val.data[0].create_time.replace(/-/g, "/");
                val.data[0].create_time = val.data[0].create_time.slice(5);
                val.data[0].checked = false;
                let img_urls = [];
                let url_val = { url: val.data[0].content }
                img_urls.push(url_val);
                clearInterval(this.t_time);
                let obj = {
                    "create_time": val.data[0].create_time,
                    "finish_reason": "stop",
                    "session_code": val.data[0].session_code,
                    "chat_group_code": val.data[0].chat_group_code,
                    "size": val.data[0].size,
                    "role": "assistant",
                    "image_urls": img_urls,
                    url_base: val.data[0].url_base,
                    help: false,
                    stepOn: false,
                    isShowOldChat: true,
                    timer: this.timer,
                    is_mod: 0,
                }
                
                if (!this.isClickChat) {
                    this.stableDiffusionList.push(obj);
                    localStorage.setItem('session_code9', val.data[0].session_code);
                    localStorage.setItem('chat_group_code9', val.data[0].chat_group_code);
                }
                this.randomStr = Math.random()
                this.$store.dispatch('user/changeChatListLength', this.stableDiffusionList.length)
                this.isBtn = true;
                if (this.chat_type == 2) {
                    this.isTimeDell = false
                } else if (this.chat_type == 3) {
                    this.isTimeBaidu = false
                } else if (this.chat_type == 6) {
                    this.isTimeMidjourney = false
                } else if (this.chat_type == 9) {
                    this.isTimestableDiffusion = false
                }
                // 定位到聊天最底部
                this.toBottom();
            } else {
                this.isuser = true;
                this.isBtn = true;
                if (this.chat_type == 2) {
                    this.isTimeDell = false
                } else if (this.chat_type == 3) {
                    this.isTimeBaidu = false
                } else if (this.chat_type == 6) {
                    this.isTimeMidjourney = false
                } else if (this.chat_type == 9) {
                    this.isTimestableDiffusion = false
                }
                clearInterval(this.t_time);
                this.$message.error(val.msg)
            }
        })
      },
      //发送信息
      sendMsg(type = 3) {
        // this.drawTextarea = ''
        this.isClickChat = false
        this.actionType = type
        this.loginInfo = JSON.parse(localStorage.getItem('userInfo'));
        if (this.actionType == 3) { // 原图
            if(this.sendValue == '' || this.sendValue.replace(/\s*/g, '') == '') {
                
                this.$message({
                  type: 'error',
                  message: '请输入您要发送内容'
                })
                return false;
            }
            if (this.sendValue.length < 10) {
                this.$message({
                  type: 'error',
                  message: '输入绘画内容不能少于10个字！'
                })
                return
            }
            if (this.sizeRadio == '') {
                this.$message({
                type: 'error',
                message: '请选择图片尺寸！'
                })
                return
            }
        } else { // 图文生图
            if(this.drawTextarea == '' || this.drawTextarea.replace(/\s*/g, '') == '') {
                this.$message({
                  type: 'error',
                  message: '请输入您要发送内容'
                })
                return false;
            }
            if (this.drawTextarea.length < 10) {
                this.$message({
                  type: 'error',
                  message: '输入绘画内容不能少于10个字！'
                })
                return
            }
        }
        this.mjProgress = ''

        if(this.chat_type == 2) {
            this.isShowTemplateDALL = false
            this.dellSend()
        }

        if(this.chat_type == 3) {
            this.isShowTemplateBaidu = false
            this.baiduSend()
        }

        if(this.chat_type == 6) {
            this.isShowTemplateMidJ = false
            this.midjourneySend()
        }

        if(this.chat_type == 9) {
            this.isShowTemplatestableDiffusion = false
            this.stableDiffusionSend()
        }
      },

      sendMsg2() {
         this.$message({
            type: 'info',
            message: '当前问题还没回答完毕，请稍后再提问！'
         })
      },

      changeSendAnswer(item) {
        let a = 1
        for (let i = 0; i < this.ordeAIList.length; i++) {
            if (item.create_time == this.ordeAIList[i].create_time) {
                delete this.ordeAIList[i]
                i--
                a = 0
                break;
            } else {
                a = 1
            }
        }
        if (a == 1) {
            this.ordeAIList.push(item)
        }
      },

      // 内容逐字显示，每个字显示间隔为0.1秒，并识别换行符
      showReply (content) {
        if (this.chat_type == 2) {
            this.isTimeDell = false
        } else {
            this.isTimeBaidu = false
        }
        let reply = content;
        let replyArr = reply.split('');
        let replyStr = '';
        let i = 0;
        let time = setInterval(() => {
            if (i < replyArr.length) {
                if (replyArr[i] == '\n') {
                    replyStr += '\n'
                } else {
                    replyStr += replyArr[i]
                }
                this.reply = replyStr
                i++
                // 定位到聊天最底部
                this.toBottom();
            } else {
                clearInterval(time)
            }
        }, 100)

        // 判断是否显示完毕
        setTimeout(() => {
            this.isfinish = true;
            this.isBtn = true;
            clearInterval(this.t_time);
        }, replyArr.length * 100)
      },

      toBottom() {
         // 定位到当前聊天地点
         this.$nextTick(()=>{
            setTimeout(() => {
                var scrollTop = document.getElementById("chatCont")
                scrollTop.scrollTop = scrollTop.scrollHeight
            }, 200)
            
        })
      },

      // 继续回答
      keepAs(key) {
        let msg = '继续';
        if(key == 2) {
            msg = this.supplyValue
        }

        let val = { 
            "chat_type": this.chat_type,
            "action_type": 2,
            "session_code": localStorage.getItem('session_code') || '',
            "chat_group_code": localStorage.getItem('chat_group_code') || '',
            "content": msg
        }
        this.isDetail  = false;
        this.isBtn = false;
        this.isfinish = false;
        this.supplyVisible = false;
        this.t_time = setInterval(() => {
            this.timer += 1;
        }, 1000)
        creatChat(val).then(res => {
            if (res.code == 20000) {
                let backMsg = ''
                if(key == 2) {
                    backMsg = '\n\n'+ msg +'\n' +res.data.content; 
                } else {
                    backMsg = res.data.content;
                }
                this.isuser = true;
                this.keepReply(backMsg);
                localStorage.setItem('session_code', res.data.session_code);
                localStorage.setItem('chat_group_code', res.data.chat_group_code);
                this.supplyValue = '';
            } else if(res.code == 30014 || res.code == 40022) {
                this.queryErrorMsg = res.msg
                this.isuser = false;
                this.isBtn = true;
                this.isfinish = true;
                clearInterval(this.t_time);
            } else if(res.code == 50000) {
                this.isBtn = true;
                this.isfinish = true;
                clearInterval(this.t_time);
                this.$message.error('请求超时，请稍后继续')
            } else {
                this.isBtn = true;
                this.isfinish = true;
                clearInterval(this.t_time);
                this.$message.error(res.msg)
            }
        }).catch(err => {
            this.isBtn = true;
            this.isfinish = true;
            clearInterval(this.t_time);
            this.$message.error('发送消息失败！')
        })
      },

      keepReply (content) {
        if (this.chat_type == 2) {
            this.isTimeDell = false
        } else {
            this.isTimeBaidu = false
        }
        let reply = content
        let replyArr = reply.split('')
        let replyStr = this.chatList[this.chatList.length-1].content;
        let i = 0
        let time = setInterval(() => {
            if (i < replyArr.length) {
                if (replyArr[i] == '\n') {
                    replyStr += '\n'
                } else {
                    replyStr += replyArr[i]
                }
                this.reply = replyStr
                i++
                // 定位到聊天最底部
                this.toBottom();
            } else {
                clearInterval(time)
            }
        }, 100)

        // 判断是否显示完毕
        setTimeout(() => {
            this.isfinish = true;
            this.isBtn = true;
            this.chatList[this.chatList.length-1].content = this.reply;
            this.$store.dispatch('user/changeChatListLength', this.chatList.length)
            clearInterval(this.t_time);
        }, replyArr.length * 100)
      },

      // 快速选择问题
      selectQs(val) {
          this.sendValue = val
      },

      // 复制服务信息
      copyText(val) {
          var input = document.createElement("input"); // 创建input对象
          input.value = val; // 设置复制内容
          document.body.appendChild(input); // 添加临时实例
          input.select(); // 选择实例内容
          document.execCommand("Copy"); // 执行复制
          document.body.removeChild(input); // 删除临时实例
          this.$message.success('复制成功！');
      },

      //清除信息
      clear() {
         this.$confirm('确认要清空当前会话内容吗？', '提示', {
            confirmButtonText: '清空',
            cancelButtonText: '取消',
            type: 'warning'
        })
            .then(() => {
                this.chatList = [];
                this.$store.dispatch('user/changeChatListLength', this.chatList.length)
                this.isShow = false;
                localStorage.setItem('session_code', '');
            })
            .catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消'
                })
            })
      },

      // 开通会员
      goMember() {
        this.$refs.Register.registerVisible = true
      },

     
      toIndex() {
        this.$router.push('/index')
      },

      // 文本域的值变化
      changeSendValue(value) {
        if (value.match(/^\//) != null) {
            this.isShowTemplateSelte = true
        } else {
            this.isShowTemplateSelte = false
        }
      },

      // 显示隐藏点赞/踩
      showSetonHelpImg(num, bool, item) {
        if (bool && (num % 2 != 0)) {
            chatLikes({
                "is_likes": 1,
                "session_code": item.session_code,
                "chat_group_code": item.chat_group_code
            })
        } else if(bool && (num % 2 == 0)) {
            chatLikes({
                "is_likes": 2,
                "session_code": item.session_code,
                "chat_group_code": item.chat_group_code
            })
        } else {
            chatLikes({
                "is_likes": 0,
                "session_code": item.session_code,
                "chat_group_code": item.chat_group_code
            })
        }

        if (num % 2 != 0) { // GPT35 赞
            for (let i = 0; i < this.chatList.length; i++) {
                if (this.chatList[i].session_code == item.session_code && this.chatList[i].chat_group_code == item.chat_group_code) {
                    this.chatList[i].help = false
                    this.chatList[i].stepOn = false
                    this.chatList[i].help = bool
                    this.chatList[i].is_likes = bool ? 1 : 0

                }
            }
        } else if (num % 2 == 0) { // GPT35 踩
            for (let i = 0; i < this.chatList.length; i++) {
                if (this.chatList[i].session_code == item.session_code && this.chatList[i].chat_group_code == item.chat_group_code) {
                    this.chatList[i].help = false
                    this.chatList[i].stepOn = false
                    this.chatList[i].stepOn = bool
                    this.chatList[i].is_likes = bool ? 2 : 0

                }
            }
        }
      },

      // 指令集的回调
      useingTemplate(title) {
        this.isShowTemplateSelte = false
        this.sendValue = title
      },

      // 下载图片
      downloadImgs(item) {
        console.log(item);
        let url = ''
        if (this.chat_type == 2) {
            if (item.isShowOldChat) {
                url = httpUrls.ossUrl + item.image_urls[0].sso_url
            } else {
                url = httpUrls.ossUrl + item.image_urls[0].url
            }
        } else if (this.chat_type == 3) {
            url = httpUrls.ossUrl + item.image_urls[0].url    
        } else if (this.chat_type == 6) {
            url = httpUrls.ossUrl + item.image_urls[0].url
        } else if (this.chat_type == 9) {
            url = httpUrls.ossUrl + item.image_urls[0].url
        }
        let canvas = document.createElement('canvas'),
        ctx = canvas.getContext('2d'),
        img = new Image();
        img.crossOrigin = '*';//解决Canvas.toDataURL 图片跨域问题
        img.onload = () => {
            canvas.height = img.height;
            canvas.width = img.width;
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
            let ext = img.src.substring(img.src.lastIndexOf(".") + 1).toLowerCase(); // 获取到图片的格式
            let dataURL = canvas.toDataURL("image/" + ext); // 得到base64 编码的 dataURL
            var a = document.createElement("a"); // 生成一个a元素
            var event = new MouseEvent("click"); // 创建一个单击事件
            a.download =  "photo.png"; // 设置图片名称
            a.href = dataURL; // 将生成的URL设置为a.href属性
            a.dispatchEvent(event); // 触发a的单击事件
            canvas = null;
        };
        img.src = url;
      },

      imgSunImg(item) {
        this.drawDialogRadio = ''
        this.drawTextarea = ''
        this.dialogVisible = true
        if (this.chat_type == 2) {
            this.imgUrl = {url: item.image_urls[0].url, baseUrl: this.base64, base64Url: item.image_urls[0].url_base}
            urlToBase64(item.image_urls[0].sso_url).then(res => {
                // console.log(res);
                this.imgUrl.baseUrl = res
            })
        } else {
            this.imgUrl = {url: item.image_urls[0].url, baseUrl: urlToBase64(item.url_base, 'file'), base64Url: item.url_base}
        }
    },

    // 开启新会话
    resetNewChat() {
        if (!this.isBtn) {
            this.$message('当前问题还没回答完毕，请稍后再试')
            return
        }
        if (this.chat_type == 2) {
            if (this.chatList.length == 0) return
            this.chatList = []
            this.isShowTemplateDALL = true
            this.$store.dispatch('user/changeChatListLength', 0)
            localStorage.setItem('session_code2', '')
            localStorage.setItem('chat_group_code2', '')
        } else if (this.chat_type == 3) {
            if (this.baiduList.length == 0) return
            this.baiduList = []
            this.isShowTemplateBaidu = true
            this.$store.dispatch('user/changeChatListLength', 0)
            localStorage.setItem('session_code3', '')
            localStorage.setItem('chat_group_code3', '')
        } else if (this.chat_type == 6) {
            if (this.midjourneyList.length == 0) return
            this.midjourneyList = []
            this.isShowTemplateMidJ = true
            this.$store.dispatch('user/changeChatListLength', 0)
            localStorage.setItem('session_code6', '')
            localStorage.setItem('chat_group_code6', '')
        } else if (this.chat_type == 9) {
            if (this.stableDiffusionList.length == 0) return
            this.stableDiffusionList = []
            this.isShowTemplatestableDiffusion = true
            this.$store.dispatch('user/changeChatListLength', 0)
            localStorage.setItem('session_code9', '')
            localStorage.setItem('chat_group_code9', '')
        }
        this.isuser = true
        this.randomStr = Math.random()
        this.isShowChecked = false
        this.isShowassociation = false
        this.isClickChat = false
        this.isBtn = true
        clearInterval(this.t_time)
        if (this.chat_type == 2) {
            this.isTimeDell = false;
        } else if (this.chat_type == 3) {
            this.isTimeBaidu = false;
        } else if (this.chat_type == 6) {
            this.isTimeMidjourney = false;
        } else if (this.chat_type == 9) {
            this.isTimestableDiffusion = false;
        }
        this.sendValue = ''
      },

      drawingSetRecommend() {
        drawingSetRecommend().then(res => {
            // console.log(res);
            this.qsList = res.data
        })
      }
  }
}
</script>
<style scoped>
.qs_line-item {
    -webkit-line-clamp: 2;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
}

.qs_line {
    margin: 0 20px;
    max-width: 200px;
    width: 33%;
    margin-bottom: 10px;
    border-radius: 6px;
    font-weight: 400;
    font-size: 14px;
    color: #78829A;
    cursor: pointer;
}

.qs_line-mask:hover {
    color: #FFFFFF;
    background: #1F64FF;
}
.qs_line-mask {
    background-color: #F6F8FB;
    padding: 20px;
    min-height: 38px;
    border-radius: 6px;
}
.qs_text {
    display: flex;
    padding: 10px 0;
    justify-content: center;
    max-width: 650px;
}

.qs_text::-webkit-scrollbar {
    width: 6px;
    background-color: rgba(0, 0, 0, 0.05);
    border-radius: 4px;
}

.qs_text::-webkit-scrollbar-thumb {
    border-radius: 4px;
    background-color: rgba(0, 0, 0, 0.1);
}

.qs_img-mask {
    position: relative;
}

.qs_item_img{
    border-radius: 6px;
}
.qs_iten_title {
    position: absolute;
    width: 100%;
    text-align: center;
    bottom: 4px;
    color: #FFF;
    font-size: 14px;
    font-weight: 400;
    line-height: 30px;
    border-radius: 0 0 6px 6px;
    background: rgba(0, 0, 0, 0.50);
}

@media (height < 840px) and (height >= 690px) {
    .qs_text {
        height: 130px;
        overflow-y: auto;
    }
}
@media (height < 690px) {
    .qs_text {
        height: 130px;
        overflow-y: auto;
    }
}

.qs_top {
    max-width: 650px;
}
</style>
<style scoped>
   .content {
       width: 100%;
       height: calc(100% - 22px);
       display: flex;
       flex-direction: column;
   }
   .select_tyle{
       display: flex;
       flex-direction: column;
   }
   .select_switch {
       display: flex;
       justify-content: space-between;
       margin: 10px 16px;
   }
   .select-topage {
    display: flex;
   }
   .select-topage .to {
    font-style: normal;
    font-weight: 600;
    font-size: 14px;
    line-height: 20px;
    color: #333333;
    background: #F2FAFF;
    border-radius: 6px;
    display: flex;
    padding: 6px 20px;
   }
   .select-topage .to img  {
       margin-right: 10px;
       vertical-align: middle;

   }
   .select-topage .to:nth-child(1) {
    margin-right: 10px;
    background-color: #1F64FF;
    color: #FFFFFF;
    }
   .select-title {
    font-weight: 500;
    font-size: 24px;
    line-height: 30px;
    color: #333333;
   }

   .select-img img {
        width: 26px;
        height: 26px;
   }
   .switch_con {
       display: flex;
       align-items: center;
       justify-content: space-between;
       padding: 0 20px;
       margin-left: 30px;
       width: 180px;
       height: 80px;
       background: #FFFFFF;
       box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.1);
       border-radius: 15px;
   }
   .con_l {
      font-style: normal;
      font-weight: 500;
      font-size: 14px;
      color: #A0AEC0;
   }

   .select_mode .el-tabs__item {
      width: 180px;
      height: 60px;
      padding-left: 18px;
      font-style: normal;
      font-weight: 500;
      font-size: 20px;
      line-height: 60px;
      color: #000022;
      text-align: center;
   }

   .select_mode .el-tabs__active-bar {
      width: 180px;
   }

   .footer_cont {
      /* background: #fff; */
      width: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      padding-bottom: 50px;
      position: relative;
   }
   .qs_top {
    display: flex;
      align-items: center;
      justify-content: center;
      margin-right: 10px;
      /* max-width: 650px; */
   }
   .top_left {
      font-style: normal;
      font-weight: 400;
      font-size: 16px;
      line-height: 150%;
      color: #000;
      
   }
   .top_right {
      display: flex;
      cursor: pointer;
      align-items: center;
      color: #1F64FF;
      margin-left: 10px;
   }
   .top_text {
      font-style: normal;
      font-weight: 400;
      font-size: 12px;
      line-height: 150%;
      color: #1F64FF;
   }
   .change_img {
      width: 12px;
      height: 12px;
      margin-left: 10px;
   }

   .cont {
      width: 80%;
      background: #fff;
      border-radius: 10px;
      display: flex;
      align-items: center;
      position: relative;
   }

   .content .el-input__inner {
      background: #F5F6FA;
      border-radius: 10px;
      height: 58px;
      font-size: 16px;
      padding-left: 30px;
   }

   .clear_img {
      width: 29px;
      height: 29px;
      margin-right: 15px
   }

   .send_img {
      width: 28px;
      height: 22px;
      /* position: absolute;
      right: 20px;
      bottom: 10px; */
   }

   /* 对话框 */
    .cg-chat-content {
       width: calc(100% - 120px);
       flex: 1;
       padding: 20px 60px;
       /* margin: auto; */
       overflow: auto;
    padding-top: 0;

    }

    .cg-chatbox {
        min-width: 300px;
        border-radius: 5px;
        position: relative;
        padding: 20px;
        word-break: break-all;
        word-wrap: break-word;
    }

    .cg-chatbox-left {
        border: 1px solid #FFFFFF;
        display: inline-block;
        background: #FFFFFF;
        border-radius: 8px;
        color: #333;
    }

    .cg-chatbox-left::before {
        right: 100%;
        border-color: transparent #FFFFFF transparent transparent;
    }

    .cg-chatbox-right {
        border: 1px solid #1F64FF;
        display: inline-block;
        background: #1F64FF;
        border-radius: 8px;
        color: #fff;
        text-align: left;
        position: relative;
        padding-bottom: 32px;
    }

    .cg-chatbox-right::before {
        left: 100%;
        border-color: transparent transparent transparent #1F64FF;
    }

    .cg-chat-left,
    .cg-chat-right {
        display: flex;
        align-items: flex-start;
        padding-top: 20px;
    }

    .cg-user-pic {
        width: 40px;
        height: 40px;
        flex-shrink: 0;
        display: block;
    }

    .cg-left {
        margin-right: 15px;
    }

    .cg-right {
        margin-right: 15px;
    }

    .cg-chat-right {
        justify-content: space-between;
    }
    
    .cg-chat-right-on{
        justify-content: flex-start;
    }

    .reply {
        font-size: 16px;
        line-height: 20px;
        letter-spacing: 1px;
    }
    .left_tip {
        font-size: 16px;
        color: #333;
        font-weight: 600;
        line-height: 20px;
        letter-spacing: 1px;
    }

    .left_tip1 {
        font-size: 14px;
        color: #333;
        font-weight: 600;
        line-height: 20px;
        letter-spacing: 1px;
    }

    .as-cont-right {
        width: 84%;
        display: flex;
        justify-content: flex-start;
    }

    .as_text_left {
        display: flex;
        align-items: flex-end;
        justify-content: flex-start; 
    }

    .as_text_right {
        width: 100%;
    }

    .copy_img {
        width: 46px;
        height: 22px;
        margin-right: 10px;
    }

    .copy_img_left {
        width: 46px;
        height: 22px;
        margin-left: 10px;
    }

    .pay_img {
        width: 80px;
        height: 40px;
        margin-left: 10px;
    }

    .as-cont-left {
        text-align: left;
    }
    .cont-time {
        font-style: normal;
        font-weight: 400;
        font-size: 12px;
        line-height: 14px;
        color: #999;
        margin-bottom: 5px;
    }

    .chat_bot {
        display: flex;
    }

    .operete_btn {
        font-style: normal;
        font-weight: 500;
        font-size: 10px;
        line-height: 150%;
        color: #1F64FF;
        border: 1px solid rgba(31, 100, 255, 0.1);
        border-radius: 6px;
        padding: 5px 16px;
        margin-top: 15px;
        margin-right: 10px;
        cursor: pointer;
        background-color: rgba(31, 100, 255, 0.1);
    }

    .chat_draws{
        display: flex;
        flex-direction: row;
    }

    .draw-mark {
        background: #F5F6F8;
        border-radius: 8px;
        padding: 20px;
    }

    .draw-mark .title {
        font-weight: 400;
        font-size: 15px;
        text-align: center;
        color: #AAB2C8;
        margin: 22px 0;
    }

    .draw-mark .img-list {
        margin-top: 10px;
        display: flex;
        justify-content: space-between;
    }

    .draw-mark .img-list .help-setpon-img {
        width: 20px;
        height: 20px;
        margin-right: 10px;
        cursor: pointer;
    }
    .draw-mark .img-list .cope-img {
        width: 22px;
        height: 20px;
        margin-right: 10px;
        cursor: pointer;
    }

    .draw_img {
        width: 256px;
        cursor: zoom-in;
    }

    .comput {
        display: flex;
        justify-content: space-between;
    }

    .put_text {
        font-style: normal;
        font-weight: 400;
        font-size: 12px;
        line-height: 200%;
        color: #AAB2C8;
        display: flex;
        align-items: center;
        margin-right: 10px;
    }
    .await_img {
        width: 16px;
        height: 16px;
        opacity: 0.5;
        margin-right: 4px;
    }

    .supply_cont {
        background: #fff;
        border-radius: 10px;
        width: 400px;
        margin: auto;
    }

    .supply_img {
        width: 40px;
        height: 28px;
    }

    .select-aiName {
        width: 136px;
        border: 2px solid #1F64FF;
        border-right: none;
        border-top-left-radius: 10px;
        border-bottom-left-radius: 10px;
    }
    .content .select-aiName input {
        height: 80px;
        font-weight: 400;
        color: #666666;
        font-size: 14px;
        padding: 20px;
        border-radius: 10px 0 0 10px;
        border: none;
        border-right: 2px solid #FFFFFF;
    }

    .text-textarea {
        border: 2px solid #1F64FF;
        border-left: none;
        border-radius: 10px;
        border-radius: 0 10px 10px 0;
        height: 80px;
    }

    .text-textarea textarea{
        background-color: #F6F8FB;
        border: none;
        height: 79px;
        border-radius: 0 10px 10px 0;
        padding-right: 68px;
    }


    .help-setpon-img {
        height: 20px;
        width: 20px;
        margin-right: 24px;
        cursor: pointer;
    }

    .cg-chatbox-right .img {
        width: 24px;
        height: 22px;
        position: absolute;
        bottom: 10px;
        right: 20px;
        cursor: pointer;
        margin-top: 8px;
    }

    .help-setpon .cope-img {
        width: 22px;
        height: 20px;
    }

    .association {
        background-color: #FFFFFF;
        position: absolute;
        right: 0;
        top: -118px;
        padding: 26px 44px;
        width: 100px;
        height: 60px;
        box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
        border-radius: 4px;
    }

    .association .title {
        font-weight: 400;
        font-size: 14px;
        line-height: 22px;
        color: #333333;
        text-align: center;
        margin-bottom: 14px;
    }

    .association .item {
        display: flex;
        justify-content: space-between;
    }

    .association .item .el-radio .el-radio__label {
        padding-left: 4px;
    }

    .association .line {
        width: 12px;
        height: 12px;
        transform: rotateZ(45deg) translateY(-50%);
        background-color: #FFFFFF;
        position: absolute;
        right: 50%;
        bottom: -10px;
        box-shadow: 2px 2px 0 rgba(0, 0, 0, 0.1);
    }

    .is_VIP {
        background: #EA5050;
        border-radius: 8px;
    }

    .is_VIP >span {
        font-weight: 500;
        font-size: 14px;
        align-items: center;
        text-align: center;
        color: #FFFFFF;
    }

    .image-size {
        width: 100%;
        display: flex;
        justify-content: space-between;
        margin-top: 26px;
    }

    .image-size .left .title {
        margin-right: 26px;
    }

    .image-size .left {
        display: flex;
    }

    .image-size .left span {
        line-height: 30px;
        padding-left: 5px;
    }

    .image-size .left .title{
        font-weight: 500;
        font-size: 18px;
        color: #333333;
    }

    .image-size .right .el-button {
        background: #1F64FF;
        border-radius: 6px;
        padding: 5px 40px;
        font-weight: 500;
        font-size: 18px;
        color: #FFFFFF;
    }

    .draw-dialog_dowm .text-input textarea {
        height: 279px;
    }

    .draw-dialog_dowm .radio {
        margin-top: 20px;
    }

    .draw-dialog_dowm .radio span {
        font-weight: 400;
        font-size: 16px;
        line-height: 28px;
        color: #303133;
    }

    .draw-dialog_dowm .dialog-footer {
        position: absolute;
        bottom: 70px;
        right: 20px;
        padding: 8px 16px;
    }

    .buttons-draw .but {
        padding: 5px 16px;
        font-weight: 400;
        font-size: 14px;
        line-height: 22px;
        color: #333333;
        margin-top: 20px;
    }

    .is_VIP {
        background: #EA5050;
        border-radius: 8px;
    }

    .is_VIP >span {
        font-weight: 500;
        font-size: 14px;
        align-items: center;
        text-align: center;
        color: #FFFFFF;
    }

    .is_VIP_dialog {
        text-align: center;
        padding: 20px 24px;
        background: linear-gradient(180deg, #EFF6FF 0%, #FFFFFF 100%);
        border: 2px solid #C9D8F3;
        border-radius: 6px;
        width: 476px;
        height: 126px;
        margin: auto;
    }

    .is_VIP_dialog .title {
        font-weight: 500;
        font-size: 20px;
        color: #333333;
    }

    .is_VIP_dialog .tit {
        font-weight: 600;
        font-size: 16px;
        margin: 15px 0;
        color: #EA5050;

    }
    .as-vip-cont-left {
        width: 100%;
    }
   .content {
       width: calc(100% - 256px);
       height: calc(100% - 22px);
       display: flex;
       flex-direction: column;
       margin-left: 240px;
   }
   .select_tyle{
       display: flex;
       flex-direction: column;
       width: calc(100%);
   }
   .select_switch {
       display: flex;
       justify-content: space-between;
       margin: 10px 16px;
   }
   .select-topage {
    display: flex;
   }
   .select-topage .to {
    font-style: normal;
    font-weight: 600;
    font-size: 14px;
    line-height: 20px;
    color: #333333;
    background: #F2FAFF;
    border-radius: 6px;
    display: flex;
    padding: 6px 20px;
   }
   .select-topage .to img  {
       margin-right: 10px;
       vertical-align: middle;

   }
   .select-topage .to:nth-child(1) {
    margin-right: 10px;
    background-color: #1F64FF;
    color: #FFFFFF;
    }
   .select-title {
    font-weight: 500;
    font-size: 24px;
    line-height: 30px;
    color: #333333;
   }

   .select-img img {
        width: 26px;
        height: 26px;
   }
   .switch_con {
       display: flex;
       align-items: center;
       justify-content: space-between;
       padding: 0 20px;
       margin-left: 30px;
       width: 180px;
       height: 80px;
       background: #FFFFFF;
       box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.1);
       border-radius: 15px;
   }
   .con_l {
      font-style: normal;
      font-weight: 500;
      font-size: 14px;
      color: #A0AEC0;
   }

   .select_mode .el-tabs__item {
      width: 180px;
      height: 60px;
      padding-left: 18px;
      font-style: normal;
      font-weight: 500;
      font-size: 20px;
      line-height: 60px;
      color: #000022;
      text-align: center;
   }

   .select_mode .el-tabs__active-bar {
      width: 180px;
   }

   .footer_cont {
      /* background: #fff; */
      width: calc(100% - 40px);
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      padding: 20px;
      padding-bottom: 30px;
      position: relative;
   }
   .footer_qs {
        width: 100%;
        display: flex;
        justify-content: center;
        margin-top: 30px;
        /* position: absolute; */
        /* top: 50%;
        transform: translateX(-50%) translateY(-50%);
        left: calc(50% + 120px); */
   }

   .footer_qs .mask {
    width: 70%;
   }

   .top_left {
      font-style: normal;
      font-weight: 400;
      font-size: 16px;
      line-height: 150%;
      color: #000;
      
   }
   .top_right {
      display: flex;
      cursor: pointer;
      align-items: center;
   }

   .change_img {
      width: 12px;
      height: 12px;
      margin-left: 10px;
   }

   .cont {
      width: 100%;
      background: #fff;
      border-radius: 10px;
      display: flex;
      align-items: center;
      position: relative;
   }

   .content .el-input__inner {
      background: #F5F6FA;
      border-radius: 10px;
      height: 58px;
      font-size: 16px;
      padding-left: 30px;
   }

   .clear_img {
      width: 29px;
      height: 29px;
      margin-right: 15px
   }

   .send_img {
      width: 28px;
      height: 22px;
      /* position: absolute;
      right: 20px;
      bottom: 10px; */
   }

   /* 对话框 */
    .cg-chat-content {
       width: calc(100% - 120px);
       flex: 1;
       padding: 20px 60px;
       /* margin: auto; */
       overflow: auto;
    padding-top: 0;

    }

    .cg-chatbox {
        border-radius: 5px;
        position: relative;
        padding: 20px;
        word-break: break-all;
        word-wrap: break-word;
    }
/* 
    .cg-chatbox-left {
        border: 1px solid #F5F6F8;
        display: inline-block;
        background: #F5F6F8;
        border-radius: 8px;
        color: #333;
    }

    .cg-chatbox-left::before {
        right: 100%;
        border-color: transparent #F5F6F8 transparent transparent;
    } */

    .cg-chatbox-right {
        border: 1px solid #1F64FF;
        display: inline-block;
        background: #1F64FF;
        border-radius: 8px;
        color: #fff;
        text-align: left;
        position: relative;
        padding-bottom: 32px;
    }

    .cg-chatbox-right::before {
        left: 100%;
        border-color: transparent transparent transparent #1F64FF;
    }

    .cg-chat-left,
    .cg-chat-right {
        display: flex;
        align-items: flex-start;
        padding-top: 20px;
    }

    .cg-user-pic {
        width: 40px;
        height: 40px;
        flex-shrink: 0;
        display: block;
    }

    .cg-left {
        margin-right: 15px;
    }

    .cg-right {
        margin-right: 15px;
    }

    .cg-chat-right {
        justify-content: space-between;
    }
    
    .cg-chat-right-on{
        justify-content: flex-start;
    }

    .reply {
        font-size: 16px;
        line-height: 20px;
        letter-spacing: 1px;
    }
    .left_tip {
        font-size: 16px;
        color: #333;
        font-weight: 600;
        line-height: 20px;
        letter-spacing: 1px;
    }

    .left_tip1 {
        font-size: 14px;
        color: #333;
        font-weight: 600;
        line-height: 20px;
        letter-spacing: 1px;
    }

    .as-cont-right {
        width: 84%;
        display: flex;
        justify-content: flex-start;
    }

    .as_text_left {
        display: flex;
        align-items: flex-end;
        justify-content: flex-start; 
    }

    .as_text_right {
        width: 100%;
    }

    .copy_img {
        width: 46px;
        height: 22px;
        margin-right: 10px;
    }

    .copy_img_left {
        width: 46px;
        height: 22px;
        margin-left: 10px;
    }

    .pay_img {
        width: 80px;
        height: 40px;
        margin-left: 10px;
    }

    .as-cont-left {
        width: 80%;
        text-align: left;
    }
    .cont-time {
        font-style: normal;
        font-weight: 400;
        font-size: 12px;
        line-height: 14px;
        color: #999;
        margin-bottom: 5px;
    }

    .chat_bot {
        display: flex;
    }

    .operete_btn {
        font-style: normal;
        font-weight: 500;
        font-size: 10px;
        line-height: 150%;
        color: #1F64FF;
        border: 1px solid rgba(31, 100, 255, 0.1);
        border-radius: 6px;
        padding: 5px 16px;
        margin-top: 15px;
        margin-right: 10px;
        cursor: pointer;
        background-color: rgba(31, 100, 255, 0.1);
    }

    .chat_draw{
        display: flex;
        flex-direction: column;
    }

    .draw_img {
        width: 256px;
        cursor: zoom-in;
    }

    .comput {
        display: flex;
        justify-content: space-between;
    }

    .put_text {
        font-style: normal;
        font-weight: 400;
        font-size: 12px;
        line-height: 200%;
        color: #AAB2C8;
        display: flex;
        align-items: center;
        margin-right: 10px;
    }
    .await_img {
        width: 16px;
        height: 16px;
        opacity: 0.5;
    }

    .supply_cont {
        background: #fff;
        border-radius: 10px;
        width: 400px;
        margin: auto;
    }

    .supply_img {
        width: 40px;
        height: 28px;
    }

    .select-aiName {
        width: 136px;
    }
    .select-aiName input {
        height: 80px;
        font-weight: 400;
        color: #666666;
        font-size: 14px;
        padding: 20px;
        border-radius: 10px 0 0 10px;
        border: none;
        border-right: 2px solid #FFFFFF;
    }
    .text-textarea textarea{
        background-color: #F6F8FB;
        border: none;
        height: 80px;
    }

    .help-setpon {
        display: flex;
        flex-wrap: nowrap;
    }

    .help-setpon-img {
        height: 22px;
        width: 22px;
        margin-right: 22px;
        cursor: pointer;
    }

    .cg-chatbox-right .img {
        width: 22px;
        height: 20px;
        position: absolute;
        bottom: 10px;
        right: 20px;
        cursor: pointer;
        margin-top: 21px;
        display: block;
        margin-top: 22px;
    }

    .help-setpon .cope-img {
        width: 20px;
        height: 20px;
    }

    .association {
        background-color: #FFFFFF;
        position: absolute;
        right: 0;
        top: -118px;
        padding: 26px 44px;
        width: 100px;
        height: 60px;
        box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
        border-radius: 4px;
    }

    .association .title {
        font-weight: 400;
        font-size: 14px;
        line-height: 22px;
        color: #333333;
        text-align: center;
        margin-bottom: 14px;
    }

    .association .item {
        display: flex;
        justify-content: space-between;
    }

    .association .item .el-radio .el-radio__label {
        padding-left: 4px;
    }

    .association .line {
        width: 12px;
        height: 12px;
        transform: rotateZ(45deg) translateY(-50%);
        background-color: #FFFFFF;
        position: absolute;
        right: 50%;
        bottom: -10px;
        box-shadow: 2px 2px 0 rgba(0, 0, 0, 0.1);
    }

    .is_VIP {
        background: #EA5050;
        border-radius: 8px;
    }

    .is_VIP >span {
        font-weight: 500;
        font-size: 14px;
        align-items: center;
        text-align: center;
        color: #FFFFFF;
    }

    .is_VIP_dialog {
        text-align: center;
        padding: 20px 24px;
        background: linear-gradient(180deg, #EFF6FF 0%, #FFFFFF 100%);
        border: 2px solid #C9D8F3;
        border-radius: 6px;
        width: 476px;
        height: 126px;
        margin: auto;
    }

    .is_VIP_dialog .title {
        font-weight: 500;
        font-size: 20px;
        color: #333333;
    }

    .is_VIP_dialog .tit {
        font-weight: 600;
        font-size: 16px;
        margin: 15px 0;
        color: #EA5050;

    }
    .as-vip-cont-left {
        width: 100%;
    }
    
    .cont .el-select .el-input .el-input__inner:focus {
        border-color: #FFFFFF;
    }
    .left_tip-content {
        font-size: 14px;
        color: #7EA6FC;
    }

    .chat-ai-btn-list {
        border: none;
        font-size: 14px;
        /* width: 84px; */
        height: 38px;
        background-color: #F8F8F9;
        text-align: center;
        padding: 0 10px;
        margin-left: 10px;
        position: relative;
   }

   .footer_cont .SD-draw-model input {
        background-color: #FFFFFF;
        padding: 4px;
        font-size: 12px;
        height: 28px;
        width: 120px;
        border-radius: 3px;
        line-height: 28px;
   }

   .footer_cont .SD-draw-model .el-input__suffix-inner {
        line-height: 28px;
   }

   .footer_cont .SD-draw-model i {
        line-height: 28px;
   }

   .footer_cont .SD-draw-model .el-input__suffix {
    right: 0;
   }

   .image-class_dark .el-dialog {
        border-radius: 4px;
        top: 50%;
        left: 50%;
        transform: translateY(-50%) translateX(-50%);
        max-height: 800px;
        min-height: 500px;
        background-color: transparent;
        box-shadow: 0 0 0 transparent;
        margin: 0 !important;
        display: flex;
        justify-content: center;
   }

   .image-class_dark .el-dialog__headerbtn {
        display: none;
   }
</style>
