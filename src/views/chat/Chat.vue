
<template>
    <div style="width: 100%;display: flex;height: calc(100% - 30px);position: relative;background-color: #F1F2F5;">
        <!-- 侧边栏模块 -->
        <div class="bigModel">
            <div class="model-item" v-for="item in aiNameList" :key="item.value" @click="selectAIname(item.value)"
                :style="AIname == item.value ? 'border: 3px solid #1F64FF;' : 'border: 3px solid #F1F2F5;;'">
                <img v-if="item.value == 4" src="../../assets/img/logo3.png" alt="">
                <img v-else-if="item.value == 5" src="../../assets/img/讯飞星火认知大模型-AI大语言模型-星火大模型-科大讯飞1.png" alt="">
                <img v-else-if="item.value == 10" src="../../assets/img/通义1.png" alt="">
                <img v-else-if="item.value == 8" style="width: 45px;height: 45px;" :src="httpUrls.ossUrl+item.img"  alt="">
                <img v-else-if="item.value == 12" :src="httpUrls.ossUrl+item.img"  alt="">
            </div>
        </div>
        <div class="content"
            :style="isShowRightNav ? 'width: calc(100% - 316px);margin-left: 355px;' : 'width: calc(100% - 88px);margin-left: 72px;'">
            <GoBackNew></GoBackNew>
            <div class="model_list">
                <div class="title">选择对话引擎</div>
                <div style="background-color: #FFFFFF;padding: 4px;border-radius: 4px;">
                    <el-button v-for="item in modelList" :key="item.value" class="ai-btn-list" @click="modelNum = item"
                        :style="modelNum.value == item.value ? 'color: #ffffff;background: #1F64FF;border-radius: 4px;' : ''">
                        {{ item.label }}
                    </el-button>
                </div>
                <div class="model-price">{{ modelNum.price }}</div>
            </div>

            <!-- AI应用模板/35 -->
            <div class="footer_qs" v-if="isShowTemplateThreeFive && AIname == 0">
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

                    <div class="qs_text" style="display: flex;justify-content: space-between;">
                        <span v-for="(item, index) in qsList" :key="index" style="width: 32%;">
                            <span v-for="(v, i) in item" style="display: flex;flex-direction: column;" :key="i">
                                <span v-if="i == 0" style="text-align: center;margin-bottom: 10px;">{{ v.module_name
                                }}</span>
                                <span class="qs_line" @click="selectQs(v.content)">
                                    <span class="qs_line-item">{{ v.content }}</span>
                                </span>
                            </span>
                        </span>
                    </div>
                </div>
            </div>

            <!-- AI应用模板/40 -->
            <div class="footer_qs" v-if="isShowTemplateFourZero && AIname == 1">
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

                    <div class="qs_text" style="display: flex;justify-content: space-between;">
                        <span v-for="(item, index) in qsList" :key="index" style="width: 32%;">
                            <span v-for="(v, i) in item" style="display: flex;flex-direction: column;" :key="i">
                                <span v-if="i == 0" style="text-align: center;margin-bottom: 10px;">{{ v.module_name
                                }}</span>
                                <span class="qs_line" @click="selectQs(v.content)">
                                    <span class="qs_line-item">{{ v.content }}</span>
                                </span>
                            </span>
                        </span>
                    </div>
                </div>
            </div>
            <!-- AI应用模板/文心一言 -->
            <div class="footer_qs" v-if="isShowTemplateYiyan && AIname == 4">
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

                    <div class="qs_text" style="display: flex;justify-content: space-between;">
                        <span v-for="(item, index) in qsList" :key="index" style="width: 32%;">
                            <span v-for="(v, i) in item" style="display: flex;flex-direction: column;" :key="i">
                                <span v-if="i == 0" style="text-align: center;margin-bottom: 10px;">{{ v.module_name
                                }}</span>
                                <span class="qs_line" @click="selectQs(v.content)">
                                    <span class="qs_line-item">{{ v.content }}</span>
                                </span>
                            </span>
                        </span>
                    </div>
                </div>
            </div>
            <!-- AI应用模板/讯飞星火 -->
            <div class="footer_qs" v-if="isShowTemplateXunfei && AIname == 5">
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

                    <div class="qs_text" style="display: flex;justify-content: space-between;">
                        <span v-for="(item, index) in qsList" :key="index" style="width: 32%;">
                            <span v-for="(v, i) in item" style="display: flex;flex-direction: column;" :key="i">
                                <span v-if="i == 0" style="text-align: center;margin-bottom: 10px;">{{ v.module_name
                                }}</span>
                                <span class="qs_line" @click="selectQs(v.content)">
                                    <span class="qs_line-item">{{ v.content }}</span>
                                </span>
                            </span>
                        </span>
                    </div>
                </div>
            </div>
            <!-- AI应用模板/Claude -->
            <div class="footer_qs" v-if="isShowTemplateClaude && AIname == 7">
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

                    <div class="qs_text" style="display: flex;justify-content: space-between;">
                        <span v-for="(item, index) in qsList" :key="index" style="width: 32%;">
                            <span v-for="(v, i) in item" style="display: flex;flex-direction: column;" :key="i">
                                <span v-if="i == 0" style="text-align: center;margin-bottom: 10px;">{{ v.module_name
                                }}</span>
                                <span class="qs_line" @click="selectQs(v.content)">
                                    <span class="qs_line-item">{{ v.content }}</span>
                                </span>
                            </span>
                        </span>
                    </div>
                </div>
            </div>
            <!-- AI应用模板/ChatGLM -->
            <div class="footer_qs" v-if="isShowTemplateChatGLM && AIname == 8">
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

                    <div class="qs_text" style="display: flex;justify-content: space-between;">
                        <span v-for="(item, index) in qsList" :key="index" style="width: 32%;">
                            <span v-for="(v, i) in item" style="display: flex;flex-direction: column;" :key="i">
                                <span v-if="i == 0" style="text-align: center;margin-bottom: 10px;">{{ v.module_name
                                }}</span>
                                <span class="qs_line" @click="selectQs(v.content)">
                                    <span class="qs_line-item">{{ v.content }}</span>
                                </span>
                            </span>
                        </span>
                    </div>
                </div>
            </div>
            <!-- AI应用模板/通义千问 -->
            <div class="footer_qs" v-if="isShowTemplateTongyi && AIname == 10">
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

                    <div class="qs_text" style="display: flex;justify-content: space-between;">
                        <span v-for="(item, index) in qsList" :key="index" style="width: 32%;">
                            <span v-for="(v, i) in item" style="display: flex;flex-direction: column;" :key="i">
                                <span v-if="i == 0" style="text-align: center;margin-bottom: 10px;">{{ v.module_name
                                }}</span>
                                <span class="qs_line" @click="selectQs(v.content)">
                                    <span class="qs_line-item">{{ v.content }}</span>
                                </span>
                            </span>
                        </span>
                    </div>
                </div>
            </div>
            <!-- AI应用模板/商汤 -->
            <div class="footer_qs" v-if="isShowTemplateShangtang && AIname == 11">
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

                    <div class="qs_text" style="display: flex;justify-content: space-between;">
                        <span v-for="(item, index) in qsList" :key="index" style="width: 32%;">
                            <span v-for="(v, i) in item" style="display: flex;flex-direction: column;" :key="i">
                                <span v-if="i == 0" style="text-align: center;margin-bottom: 10px;">{{ v.module_name
                                }}</span>
                                <span class="qs_line" @click="selectQs(v.content)">
                                    <span class="qs_line-item">{{ v.content }}</span>
                                </span>
                            </span>
                        </span>
                    </div>
                </div>
            </div>
            <!-- AI应用模板/360 -->
            <div class="footer_qs" v-if="isShowTemplate360 && AIname == 12">
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

                    <div class="qs_text" style="display: flex;justify-content: space-between;">
                        <span v-for="(item, index) in qsList" :key="index" style="width: 32%;">
                            <span v-for="(v, i) in item" style="display: flex;flex-direction: column;" :key="i">
                                <span v-if="i == 0" style="text-align: center;margin-bottom: 10px;">{{ v.module_name
                                }}</span>
                                <span class="qs_line" @click="selectQs(v.content)">
                                    <span class="qs_line-item">{{ v.content }}</span>
                                </span>
                            </span>
                        </span>
                    </div>
                </div>
            </div>

            <div class="cg-chat-content" id="chatCont" ref="wrap">

                <div class="cg-chat-left">
                    <img class="cg-user-pic cg-right" src="../../assets/images/GPT35.png" alt="" v-if="chat_type == 0">
                    <img class="cg-user-pic cg-right" src="../../assets/images/GPT40.png" alt="" v-if="chat_type == 1">
                    <img class="cg-user-pic cg-right" src="../../assets/images/wenxinyiyan.png" alt=""
                        v-if="chat_type == 4">
                    <img class="cg-user-pic cg-right" src="../../assets/images/xunfeixinghuo.png" alt=""
                        v-if="chat_type == 5">
                    <img class="cg-user-pic cg-right" src="../../assets/images/Claude.png" alt="" v-if="chat_type == 7">
                    <img class="cg-user-pic cg-right" src="../../assets/images/ChatGLM.png" alt="" v-if="chat_type == 8">
                    <img class="cg-user-pic cg-right" src="../../assets/images/tongyi.png" alt="" v-if="chat_type == 10">
                    <img class="cg-user-pic cg-right" src="../../assets/images/shangtang.png" alt="" v-if="chat_type == 11">
                    <img class="cg-user-pic cg-right" 
                        :src="httpUrls.ossUrl+'static/picture/0bd787ee-2f53-4216-b810-030f6ba2f55c.png'"
                        alt="" v-if="chat_type == 12">
                    <div class="as-cont-left" style="min-width: 425px;">
                        <div class="as_text_left">
                            <div class="cg-chatbox cg-chatbox-left">
                                <!-- <div class="left_tip" v-if="chat_type == 0">我是领先的AI35大语言GPT模型，现在为您服务！</div>
                                <div class="left_tip" v-else-if="chat_type == 1">我是前沿的AI40大语言GPT模型，为您提供专业便捷的启智服务！</div>
                                <div class="left_tip" v-else-if="chat_type == 4">我是百度全新一代知识增强大语言模型，文心一言大模型</div>
                                <div class="left_tip" v-else-if="chat_type == 5">我是讯飞星火大模型以中文为核心的，新一代认知智能大模型</div>
                                <div class="left_tip" v-else-if="chat_type == 7">我是Claude大型语言模型</div>
                                <div class="left_tip" v-else-if="chat_type == 8">我是ChatGLM千亿对话模型</div>
                                <div class="left_tip" v-else-if="chat_type == 10">我是通义千问，一个专门响应人类指令的大模型</div>
                                <div class="left_tip" v-else-if="chat_type == 11">我是商汤日日新大模型</div>
                                <div class="left_tip" v-else-if="chat_type == 12">我是ChatGLM对话模型</div> -->
                                <div class="left_tip">{{ modelText }}</div>

                                <!-- <div class="left_tip-content">
                                    <span
                                        v-if="Object.keys(loginInfo.member.data.count).length != 0 && !loginInfo.member.status && chat_type == 0">体验次数可用{{
                                            loginInfo.member.data.count.AI35.day }}次</span>
                                    <span
                                        v-if="Object.keys(loginInfo.member.data.count).length != 0 && !loginInfo.member.status && chat_type == 1">体验次数可用{{
                                            loginInfo.member.data.count.AI40.day }}次</span>
                                    <span
                                        v-if="Object.keys(loginInfo.member.data.count).length != 0 && !loginInfo.member.status && chat_type == 4">体验次数可用{{
                                            loginInfo.member.data.count.WENXIN.day }}次</span>
                                    <span
                                        v-if="Object.keys(loginInfo.member.data.count).length != 0 && !loginInfo.member.status && chat_type == 5">体验次数可用{{
                                            loginInfo.member.data.count.XUNFEI.day }}次</span>
                                    <span
                                        v-if="Object.keys(loginInfo.member.data.count).length != 0 && !loginInfo.member.status && chat_type == 7">体验次数可用{{
                                            loginInfo.member.data.count.CLAUDE.day }}次</span>
                                    <span
                                        v-if="Object.keys(loginInfo.member.data.count).length != 0 && !loginInfo.member.status && chat_type == 8">体验次数可用{{
                                            loginInfo.member.data.count.CHATGLM.day }}次</span>
                                    <span
                                        v-if="Object.keys(loginInfo.member.data.count).length != 0 && !loginInfo.member.status && chat_type == 10">体验次数可用{{
                                            loginInfo.member.data.count.QIANWEN.day }}次</span>
                                    <span
                                        v-if="Object.keys(loginInfo.member.data.count).length != 0 && !loginInfo.member.status && chat_type == 11">体验次数可用{{
                                            loginInfo.member.data.count.SENSECORE.day }}次</span>
                                            <span
                                        v-if="Object.keys(loginInfo.member.data.count).length != 0 && !loginInfo.member.status && chat_type == 12">体验次数可用{{
                                            loginInfo.member.data.count[360].day }}次</span>
                                    (1k token消耗{{ chat_type == 1 ? 65 : 4 }}算力点)
                                </div> -->
                            </div>
                        </div>
                    </div>
                </div>

                <!-- 3.5显示 -->
                <div v-for="(item, index) in chatList" :key="index" v-if="chat_type == 0">
                    <div>
                        <!-- 左侧模板 -->
                        <div class="cg-chat-left" v-if="item.role == 'assistant'">
                            <!-- 多选框 -->
                            <!-- <el-checkbox v-if="isShowChecked" v-model="item.checked" style="margin-right: 18px;margin-top: 6px;" @change="changeSendAnswer(item)"></el-checkbox> -->
                            <div style="display: flex;width: 100%;">
                                <img class="cg-user-pic cg-right" src="../../assets/images/GPT35.png" alt="">
                                <div class="as-cont-left" style="min-width: 600px;">
                                    <!-- 文字模式 -->
                                    <div class="as_text_left">
                                        <div class="cg-chatbox cg-chatbox-left">
                                            <!-- 实时显示的内容/内容 -->
                                            <div v-if="t_timeThreeFive != null && index == chatList.length - 1"
                                                class="reply markdown-body"
                                                :style="!isfinishThreeFive && index == chatList.length - 1 ? 'white-space: pre-wrap;' : ''">
                                                {{ (index == chatList.length - 1 && index != 0 && !isDetailThreeFive) ?
                                                    replyThreeFive : item.content }}</div>

                                            <div v-else class="reply markdown-body"
                                                :style="!isfinishThreeFive && index == chatList.length - 1 ? 'white-space: pre-wrap;' : ''"
                                                v-html="(index == chatList.length - 1 && index != 0 && !isDetailThreeFive) ? replyThreeFive : item.markedContent">
                                            </div>

                                            <!-- <div style="font-size: 14px;color: #999999;margin-top: 20px;" v-if="isfinishThreeFive && index == chatList.length - 1 && !isClickChat">
                                            如果对此答案不满意，
                                            <span style="color: #1F64FF;cursor: pointer;" @click="toChatFouty">点我</span>
                                            可以尝试在40中提问
                                        </div> -->

                                            <div class="comput" style="margin-top: 10px;">
                                                <div style="display: flex;flex-wrap: nowrap;">
                                                    <span class="put_text"
                                                        v-if="!isfinishThreeFive && index == chatList.length - 1"><img
                                                            class="await_img" src="../../assets/images/await.gif"
                                                            alt="">思考中，</span>
                                                    <span class="put_text" v-if="item.timer != false"><img class="await_img"
                                                            src="../../assets/images/Time_atack_light.png" alt=""></span>
                                                    <!-- 回答结束时显示 -->
                                                    <span class="put_text"
                                                        v-if="isfinishThreeFive && item.timer != false">耗时:{{ item.timer
                                                        }}秒</span>
                                                    <!-- 回答中显示 -->
                                                    <span class="put_text"
                                                        v-else-if="!isClickChat && index == chatList.length - 1">耗时:{{
                                                            timerThreeFive }}秒</span>
                                                    <!-- 回答中 -->
                                                    <span class="put_text"
                                                        v-else-if="!isfinishThreeFive && index == chatList.length - 1">耗时:{{
                                                            timerThreeFive }}秒</span>
                                                    <!-- 历史记录等显示 -->
                                                    <div class="put_text" v-if="index != chatList.length - 1">总字数：{{ (index
                                                        == chatList.length - 1 && index != 0 && !isDetailThreeFive) ?
                                                        replyThreeFive.length : item.content.length }}</div>
                                                    <!-- 回答结束时显示 -->
                                                    <div class="put_text" v-else-if="isfinishThreeFive">总字数：{{ (index ==
                                                        chatList.length - 1 && index != 0 && !isDetailThreeFive) ?
                                                        replyThreeFive.length : item.content.length }}</div>

                                                    <!-- <span class="put_text" v-if="isBtnThreeFive">
                                                    <span>消耗{{ item.integral }}算力</span>
                                                    <span>：上行{{ item.prompt_tokens }}token 下行{{ item.completion_tokens }}token</span>
                                                </span>

                                                <el-tooltip placement="top" v-if="isBtnThreeFive">
                                                    <div slot="content" class="tooltip_public">
                                                    消耗算力：上行+下行=消耗算力<br />
                                                    如开通会员VIP，在有效期内使用问答消耗算力显示为0<br />
                                                    提醒：用户提问字数+机器人回答字数=消耗文字（因接口获取存在不稳定性，会产生token误差，如有问题请联系客服）<br />
                                                    </div>
                                                    <el-button icon="el-icon-question"
                                                    style="padding: 0;background-color: transparent;border: none;color: #999999;"></el-button>
                                                </el-tooltip> -->
                                                </div>

                                                <div class="help-setpon">
                                                    <img class="help-setpon-img" v-if="!item.help"
                                                        src="../../assets/images/helpNo.png" alt=""
                                                        @click="showSetonHelpImg(1, true, item)">
                                                    <img class="help-setpon-img" v-if="item.help"
                                                        src="../../assets/images/helpYes.png" alt=""
                                                        @click="showSetonHelpImg(1, false, item)">
                                                    <img class="help-setpon-img" v-if="!item.stepOn"
                                                        src="../../assets/images/stepOnNo.png" alt=""
                                                        @click="showSetonHelpImg(2, true, item)">
                                                    <img class="help-setpon-img" v-if="item.stepOn"
                                                        src="../../assets/images/stepOnYes.png" alt=""
                                                        @click="showSetonHelpImg(2, false, item)">
                                                    <img class="cope-img" src="../../assets/images/copyBlack.png"
                                                        @click="copyText(item.content)" alt="">
                                                </div>
                                            </div>

                                            <div class="prompt" v-if="isBtnThreeFive">
                                                当前内容为AI生成，不做任何决策使用！由此引发的一切后果，需自行承担，请知悉，已通过阿里云内容安全审核</div>
                                        </div>
                                    </div>
                                    <div class="chat_bot">
                                        <span class="operete_btn"
                                            v-if="isfinishThreeFive && index == chatList.length - 1 && item.finish_reason == 'length'"
                                            @click="keepAs(1, item)">继续</span>
                                        <span class="operete_btn" v-if="isfinishThreeFive && index == chatList.length - 1"
                                            @click="optimizeAnswers(item, index)">优化本次回答</span>
                                        <span class="reset_request"
                                            v-if="!isfinishThreeFive && index == chatList.length - 1"
                                            @click="endController(item.session_code)">
                                            <i class="el-icon-remove-outline"></i>
                                            停止回答
                                        </span>
                                        <span class="reset_request"
                                            v-if="!isClickChat && index == chatList.length - 1 && isfinishThreeFive"
                                            @click="resetController" style="width: 73px;">
                                            <i class="el-icon-refresh"></i>
                                            重试
                                        </span>
                                    </div>

                                </div>

                            </div>
                        </div>
                        <!-- 右侧模板 -->
                        <div :class="isShowChecked ? 'cg-chat-right' : 'cg-chat-right cg-chat-right-on'"
                            v-if="item.role == 'user'" style="justify-content: flex-start">

                            <!-- <el-checkbox v-if="isShowChecked" v-model="item.checked" style="margin-right: 18px;margin-top: 6px;" @change="changeSendAnswer(item)"></el-checkbox> -->
                            <div class="as-cont-right">
                                <img class="cg-user-pic cg-left" :src="httpUrls.ossUrl + loginInfo.avatar_url" alt="">
                                <div class="as_text_right">
                                    <div class="cg-chatbox cg-chatbox-right">
                                        <span class="reply" style="display: block;margin-bottom: 10px;"
                                            v-html="item.content"></span>
                                        <img v-if="item.images != null && item.images.length > 0"
                                            :src="httpUrls.ossUrl + item.images[0]" alt=""
                                            style="width: 300px;cursor: zoom-in;"
                                            @click="showImagesVisible = true, chatimageUrl = item.images[0]">
                                        <img class="img" src="../../assets/images/copyWrite.png" alt=""
                                            @click="copyText(item.content)">
                                    </div>
                                    <div class="reset_request" v-if="!isClickChat && isfinishThreeFive"
                                        @click="resetQuest(item)">
                                        <i class="el-icon-chat-dot-round" style="font-size: 16px;"></i>
                                        重新提问
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- 4.0显示 -->
                <div v-for="(item, index) in chatVipList" :key="index" v-if="chat_type == 1">
                    <div>
                        <!-- 左侧模板 -->
                        <div class="cg-chat-left" v-if="item.role == 'assistant'">
                            <el-checkbox v-if="isShowChecked" v-model="item.checked"
                                style="margin-right: 18px;margin-top: 6px;" @change="changeSendAnswer(item)"></el-checkbox>
                            <div style="display: flex;width: 100%;">
                                <img class="cg-user-pic cg-right" src="../../assets/images/GPT40.png" alt="">
                                <div class="as-cont-left" style="min-width: 600px;">
                                    <!-- 文字模式 -->
                                    <div class="as_text_left">
                                        <div class="cg-chatbox cg-chatbox-left">
                                            <div v-if="t_timeFourZero != null && index == chatVipList.length - 1"
                                                class="reply markdown-body"
                                                :style="!isfinishFourZero && index == chatVipList.length - 1 ? 'white-space: pre-wrap;' : ''">
                                                {{ (index == chatVipList.length - 1 && index != 0 && !isDetailFourZero) ?
                                                    replyFourZero : item.content }}</div>

                                            <div v-else class="reply markdown-body"
                                                :style="!isfinishFourZero && index == chatVipList.length - 1 ? 'white-space: pre-wrap;' : ''"
                                                v-html="(index == chatVipList.length - 1 && index != 0 && !isDetailFourZero) ? replyFourZero : item.markedContent">
                                            </div>

                                            <div class="comput">
                                                <div style="display: flex;flex-wrap: nowrap;">
                                                    <span class="put_text"
                                                        v-if="!isfinishFourZero && index == chatVipList.length - 1"><img
                                                            class="await_img asd" src="../../assets/images/await.gif"
                                                            alt="">思考中，</span>
                                                    <span class="put_text" v-if="isfinishFourZero && !isClickChat"><img
                                                            class="await_img" src="../../assets/images/Time_atack_light.png"
                                                            alt=""></span>
                                                    <!-- 回答结束时显示 -->
                                                    <span class="put_text 1"
                                                        v-if="item.timer != false && isfinishFourZero">耗时:{{ item.timer
                                                        }}秒</span>
                                                    <!-- 回答中显示 -->
                                                    <span class="put_text 2"
                                                        v-else-if="!isClickChat && index == chatVipList.length - 1">耗时:{{
                                                            timerFourZero }}秒</span>
                                                    <span class="put_text 3"
                                                        v-else-if="!isfinishFourZero && index == chatVipList.length - 1">耗时:{{
                                                            timerFourZero }}秒</span>
                                                    <!-- 历史记录等显示 -->
                                                    <div class="put_text" v-if="index != chatVipList.length - 1">总字数：{{
                                                        (index == chatVipList.length - 1 && index != 0 && !isDetailFourZero)
                                                        ? replyFourZero.length : item.content.length }}</div>
                                                    <!-- 回答结束时显示 -->
                                                    <div class="put_text" v-else-if="isfinishFourZero">总字数：{{ (index ==
                                                        chatVipList.length - 1 && index != 0 && !isDetailFourZero) ?
                                                        replyFourZero.length : item.content.length }}</div>

                                                    <!-- <span class="put_text" v-if="isBtnFourZero">
                                                    <span>消耗{{ item.integral }}算力</span>
                                                    <span>：上行{{ item.prompt_tokens }}token 下行{{ item.completion_tokens }}token</span>
                                                </span>

                                                <el-tooltip placement="top" v-if="isBtnThreeFive">
                                                    <div slot="content" class="tooltip_public">
                                                    消耗算力：上行+下行=消耗算力<br />
                                                    如开通会员VIP，在有效期内使用问答消耗算力显示为0<br />
                                                    提醒：用户提问字数+机器人回答字数=消耗文字（因接口获取存在不稳定性，会产生token误差，如有问题请联系客服）<br />
                                                    </div>
                                                    <el-button icon="el-icon-question"
                                                    style="padding: 0;background-color: transparent;border: none;color: #999999;"></el-button>
                                                </el-tooltip> -->
                                                </div>

                                                <div class="help-setpon">
                                                    <img class="help-setpon-img" v-if="!item.help"
                                                        src="../../assets/images/helpNo.png" alt=""
                                                        @click="showSetonHelpImg(3, true, item)">
                                                    <img class="help-setpon-img" v-if="item.help"
                                                        src="../../assets/images/helpYes.png" alt=""
                                                        @click="showSetonHelpImg(3, false, item)">
                                                    <img class="help-setpon-img" v-if="!item.stepOn"
                                                        src="../../assets/images/stepOnNo.png" alt=""
                                                        @click="showSetonHelpImg(4, true, item)">
                                                    <img class="help-setpon-img" v-if="item.stepOn"
                                                        src="../../assets/images/stepOnYes.png" alt=""
                                                        @click="showSetonHelpImg(4, false, item)">
                                                    <img class="cope-img" src="../../assets/images/copyBlack.png"
                                                        @click="copyText(item.content)" alt="">
                                                </div>
                                            </div>

                                            <div class="prompt" v-if="isBtnFourZero">
                                                当前内容为AI生成，不做任何决策使用！由此引发的一切后果，需自行承担，请知悉，已通过阿里云内容安全审核</div>
                                        </div>
                                    </div>
                                    <div class="chat_bot">
                                        <span class="operete_btn"
                                            v-if="isfinishFourZero && index == chatVipList.length - 1 && item.finish_reason == 'length'"
                                            @click="keepAs(1, item)">继续</span>
                                        <span class="operete_btn" v-if="isfinishFourZero && index == chatVipList.length - 1"
                                            @click="optimizeAnswers(item, index)">优化本次回答</span>
                                        <span class="reset_request"
                                            v-if="!isfinishFourZero && index == chatVipList.length - 1"
                                            @click="endController(item.session_code)">
                                            <i class="el-icon-remove-outline"></i>
                                            停止回答
                                        </span>

                                        <span class="reset_request"
                                            v-if="isfinishFourZero && !isClickChat && index == chatVipList.length - 1"
                                            @click="resetController" style="width: 73px;">
                                            <i class="el-icon-refresh"></i>
                                            重试
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!-- 右侧模板 -->
                        <div :class="isShowChecked ? 'cg-chat-right' : 'cg-chat-right cg-chat-right-on'"
                            v-if="item.role == 'user'" style="justify-content: flex-start">

                            <el-checkbox v-if="isShowChecked" v-model="item.checked"
                                style="margin-right: 18px;margin-top: 6px;" @change="changeSendAnswer(item)"></el-checkbox>
                            <div class="as-cont-right">
                                <img class="cg-user-pic cg-left" :src="httpUrls.ossUrl + loginInfo.avatar_url" alt="">
                                <div class="as_text_right">
                                    <div class="cg-chatbox cg-chatbox-right">
                                        <span class="reply" style="display: block;margin-bottom: 10px;"
                                            v-html="item.content"></span>
                                        <img v-if="item.images != null && item.images.length > 0"
                                            :src="httpUrls.ossUrl + item.images[0]" alt=""
                                            style="width: 300px;cursor: zoom-in;"
                                            @click="showImagesVisible = true, chatimageUrl = item.images[0]">
                                        <img class="img" src="../../assets/images/copyWrite.png" alt=""
                                            @click="copyText(item.content)">
                                    </div>

                                    <div class="reset_request" v-if="!isClickChat && isfinishFourZero"
                                        @click="resetQuest(item)">
                                        <i class="el-icon-chat-dot-round" style="font-size: 16px;"></i>
                                        重新提问
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- 文心一言 -->
                <div v-for="(item, index) in chatYiyanList" :key="index" v-if="chat_type == 4">
                    <div>
                        <!-- 左侧模板 -->
                        <div class="cg-chat-left" v-if="item.role == 'assistant'">
                            <el-checkbox v-if="isShowChecked" v-model="item.checked"
                                style="margin-right: 18px;margin-top: 6px;" @change="changeSendAnswer(item)"></el-checkbox>
                            <div style="display: flex;width: 100%;">
                                <img class="cg-user-pic cg-right" src="../../assets/images/wenxinyiyan.png" alt="">
                                <div class="as-cont-left" style="min-width: 600px;">
                                    <!-- 文字模式 -->
                                    <div class="as_text_left">
                                        <div class="cg-chatbox cg-chatbox-left">
                                            <div v-if="t_timeYiyan != null && index == chatYiyanList.length - 1"
                                                class="reply markdown-body"
                                                :style="!isfinishYiyan && index == chatYiyanList.length - 1 ? 'white-space: pre-wrap;' : ''">
                                                {{ (index == chatYiyanList.length - 1 && index != 0 && !isDetailYiyan) ?
                                                    replyYiyan : item.content }}</div>

                                            <div v-else class="reply markdown-body"
                                                :style="!isfinishYiyan && index == chatYiyanList.length - 1 ? 'white-space: pre-wrap;' : ''"
                                                v-html="(index == chatYiyanList.length - 1 && index != 0 && !isDetailYiyan) ? replyYiyan : item.markedContent">
                                            </div>
                                            <div class="comput">
                                                <div style="display: flex;flex-wrap: nowrap;">
                                                    <span class="put_text"
                                                        v-if="!isfinishYiyan && index == chatYiyanList.length - 1"><img
                                                            class="await_img asd" src="../../assets/images/await.gif"
                                                            alt="">思考中，</span>
                                                    <span class="put_text" v-if="isfinishYiyan && !isClickChat"><img
                                                            class="await_img" src="../../assets/images/Time_atack_light.png"
                                                            alt=""></span>
                                                    <!-- 回答结束时显示 -->
                                                    <span class="put_text 1"
                                                        v-if="item.timer != false && isfinishYiyan">耗时:{{ item.timer
                                                        }}秒</span>
                                                    <!-- 回答中显示 -->
                                                    <span class="put_text 2"
                                                        v-else-if="!isClickChat && index == chatYiyanList.length - 1">耗时:{{
                                                            timerYiyan }}秒</span>
                                                    <span class="put_text 3"
                                                        v-else-if="!isfinishYiyan && index == chatYiyanList.length - 1">耗时:{{
                                                            timerYiyan }}秒</span>
                                                    <!-- 历史记录等显示 -->
                                                    <div class="put_text" v-if="index != chatYiyanList.length - 1">总字数：{{
                                                        (index == chatYiyanList.length - 1 && index != 0 && !isDetailYiyan)
                                                        ?
                                                        replyYiyan.length : item.content.length }}</div>
                                                    <!-- 回答结束时显示 -->
                                                    <div class="put_text" v-else-if="isfinishYiyan">总字数：{{ (index ==
                                                        chatYiyanList.length - 1 && index != 0 && !isDetailYiyan) ?
                                                        replyYiyan.length : item.content.length }}</div>

                                                    <!-- <span class="put_text" v-if="isBtnYiyan">
                                                    <span>消耗{{ item.integral }}算力</span>
                                                    <span>：上行{{ item.prompt_tokens }}token 下行{{ item.completion_tokens }}token</span>
                                                </span>

                                                <el-tooltip placement="top" v-if="isBtnYiyan">
                                                    <div slot="content" class="tooltip_public">
                                                    消耗算力：上行+下行=消耗算力<br />
                                                    如开通会员VIP，在有效期内使用问答消耗算力显示为0<br />
                                                    提醒：用户提问字数+机器人回答字数=消耗文字（因接口获取存在不稳定性，会产生token误差，如有问题请联系客服）<br />
                                                    </div>
                                                    <el-button icon="el-icon-question"
                                                    style="padding: 0;background-color: transparent;border: none;color: #999999;"></el-button>
                                                </el-tooltip> -->
                                                </div>

                                                <div class="help-setpon">
                                                    <img class="help-setpon-img" v-if="!item.help"
                                                        src="../../assets/images/helpNo.png" alt=""
                                                        @click="showSetonHelpImg(5, true, item)">
                                                    <img class="help-setpon-img" v-if="item.help"
                                                        src="../../assets/images/helpYes.png" alt=""
                                                        @click="showSetonHelpImg(5, false, item)">
                                                    <img class="help-setpon-img" v-if="!item.stepOn"
                                                        src="../../assets/images/stepOnNo.png" alt=""
                                                        @click="showSetonHelpImg(6, true, item)">
                                                    <img class="help-setpon-img" v-if="item.stepOn"
                                                        src="../../assets/images/stepOnYes.png" alt=""
                                                        @click="showSetonHelpImg(6, false, item)">
                                                    <img class="cope-img" src="../../assets/images/copyBlack.png"
                                                        @click="copyText(item.content)" alt="">
                                                </div>
                                            </div>

                                            <div class="prompt" v-if="isBtnYiyan">
                                                当前内容为AI生成，不做任何决策使用！由此引发的一切后果，需自行承担，请知悉，已通过阿里云内容安全审核</div>
                                        </div>
                                    </div>
                                    <div class="chat_bot">
                                        <span class="operete_btn"
                                            v-if="isfinishYiyan && index == chatYiyanList.length - 1 && item.finish_reason == 'length'"
                                            @click="keepAs(1, item)">继续</span>
                                        <span class="operete_btn" v-if="isfinishYiyan && index == chatYiyanList.length - 1"
                                            @click="optimizeAnswers(item, index)">优化本次回答</span>
                                        <span class="reset_request"
                                            v-if="!isfinishYiyan && index == chatYiyanList.length - 1"
                                            @click="endController(item.session_code)">
                                            <i class="el-icon-remove-outline"></i>
                                            停止回答
                                        </span>

                                        <span class="reset_request"
                                            v-if="isfinishYiyan && !isClickChat && index == chatYiyanList.length - 1"
                                            @click="resetController" style="width: 73px;">
                                            <i class="el-icon-refresh"></i>
                                            重试
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!-- 右侧模板 -->
                        <div :class="isShowChecked ? 'cg-chat-right' : 'cg-chat-right cg-chat-right-on'"
                            v-if="item.role == 'user'" style="justify-content: flex-start">

                            <el-checkbox v-if="isShowChecked" v-model="item.checked"
                                style="margin-right: 18px;margin-top: 6px;" @change="changeSendAnswer(item)"></el-checkbox>
                            <div class="as-cont-right">
                                <img class="cg-user-pic cg-left" :src="httpUrls.ossUrl + loginInfo.avatar_url" alt="">
                                <div class="as_text_right">
                                    <div class="cg-chatbox cg-chatbox-right">
                                        <span class="reply" style="display: block;margin-bottom: 10px;"
                                            v-html="item.content"></span>
                                        <img v-if="item.images != null && item.images.length > 0"
                                            :src="httpUrls.ossUrl + item.images[0]" alt=""
                                            style="width: 300px;cursor: zoom-in;"
                                            @click="showImagesVisible = true, chatimageUrl = item.images[0]">
                                        <img class="img" src="../../assets/images/copyWrite.png" alt=""
                                            @click="copyText(item.content)">
                                    </div>

                                    <div class="reset_request" v-if="!isClickChat && isfinishYiyan"
                                        @click="resetQuest(item)">
                                        <i class="el-icon-chat-dot-round" style="font-size: 16px;"></i>
                                        重新提问
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- 讯飞星火 -->
                <div v-for="(item, index) in chatXunfeiList" :key="index" v-if="chat_type == 5">
                    <div>
                        <!-- 左侧模板 -->
                        <div class="cg-chat-left" v-if="item.role == 'assistant'">
                            <el-checkbox v-if="isShowChecked" v-model="item.checked"
                                style="margin-right: 18px;margin-top: 6px;" @change="changeSendAnswer(item)"></el-checkbox>
                            <div style="display: flex;width: 100%;">
                                <img class="cg-user-pic cg-right" src="../../assets/images/xunfeixinghuo.png" alt="">
                                <div class="as-cont-left" style="min-width: 600px;">
                                    <!-- 文字模式 -->
                                    <div class="as_text_left">
                                        <div class="cg-chatbox cg-chatbox-left">
                                            <div v-if="t_timeXunfei != null && index == chatXunfeiList.length - 1"
                                                class="reply markdown-body"
                                                :style="!isfinishXunfei && index == chatXunfeiList.length - 1 ? 'white-space: pre-wrap;' : ''">
                                                {{ (index == chatXunfeiList.length - 1 && index != 0 && !isDetailXunfei) ?
                                                    replyXunfei : item.content }}</div>

                                            <div v-else class="reply markdown-body"
                                                :style="!isfinishXunfei && index == chatXunfeiList.length - 1 ? 'white-space: pre-wrap;' : ''"
                                                v-html="(index == chatXunfeiList.length - 1 && index != 0 && !isDetailXunfei) ? replyXunfei : item.markedContent">
                                            </div>

                                            <!-- <div style="font-size: 14px;color: #999999;margin-top: 20px;" v-if="isfinishXunfei && index == chatXunfeiList.length - 1 && !isClickChat">
                                            如果对此答案不满意，
                                            <span style="color: #1F64FF;cursor: pointer;" @click="toChatFouty">点我</span>
                                            可以尝试在40中提问
                                        </div> -->
                                            <div class="comput">
                                                <div style="display: flex;flex-wrap: nowrap;">
                                                    <span class="put_text"
                                                        v-if="!isfinishXunfei && index == chatXunfeiList.length - 1"><img
                                                            class="await_img asd" src="../../assets/images/await.gif"
                                                            alt="">思考中，</span>
                                                    <span class="put_text" v-if="isfinishXunfei && !isClickChat"><img
                                                            class="await_img" src="../../assets/images/Time_atack_light.png"
                                                            alt=""></span>
                                                    <!-- 回答结束时显示 -->
                                                    <span class="put_text 1"
                                                        v-if="item.timer != false && isfinishXunfei">耗时:{{ item.timer
                                                        }}秒</span>
                                                    <!-- 回答中显示 -->
                                                    <span class="put_text 2"
                                                        v-else-if="!isClickChat && index == chatXunfeiList.length - 1">耗时:{{
                                                            timerXunfei }}秒</span>
                                                    <span class="put_text 3"
                                                        v-else-if="!isfinishXunfei && index == chatXunfeiList.length - 1">耗时:{{
                                                            timerXunfei }}秒</span>
                                                    <!-- 历史记录等显示 -->
                                                    <div class="put_text" v-if="index != chatXunfeiList.length - 1">总字数：{{
                                                        (index == chatXunfeiList.length - 1 && index != 0 &&
                                                            !isDetailXunfei)
                                                        ? replyXunfei.length : item.content.length }}</div>
                                                    <!-- 回答结束时显示 -->
                                                    <div class="put_text" v-else-if="isfinishXunfei">总字数：{{ (index ==
                                                        chatXunfeiList.length - 1 && index != 0 && !isDetailXunfei) ?
                                                        replyXunfei.length : item.content.length }}</div>

                                                    <!-- <span class="put_text" v-if="isBtnXunfei">
                                                    <span>消耗{{ item.integral }}算力</span>
                                                    <span>：上行{{ item.prompt_tokens }}token 下行{{ item.completion_tokens }}token</span>
                                                </span>

                                                <el-tooltip placement="top" v-if="isBtnXunfei">
                                                    <div slot="content" class="tooltip_public">
                                                    消耗算力：上行+下行=消耗算力<br />
                                                    如开通会员VIP，在有效期内使用问答消耗算力显示为0<br />
                                                    提醒：用户提问字数+机器人回答字数=消耗文字（因接口获取存在不稳定性，会产生token误差，如有问题请联系客服）<br />
                                                    </div>
                                                    <el-button icon="el-icon-question"
                                                    style="padding: 0;background-color: transparent;border: none;color: #999999;"></el-button>
                                                </el-tooltip> -->
                                                </div>

                                                <div class="help-setpon">
                                                    <img class="help-setpon-img" v-if="!item.help"
                                                        src="../../assets/images/helpNo.png" alt=""
                                                        @click="showSetonHelpImg(7, true, item)">
                                                    <img class="help-setpon-img" v-if="item.help"
                                                        src="../../assets/images/helpYes.png" alt=""
                                                        @click="showSetonHelpImg(7, false, item)">
                                                    <img class="help-setpon-img" v-if="!item.stepOn"
                                                        src="../../assets/images/stepOnNo.png" alt=""
                                                        @click="showSetonHelpImg(8, true, item)">
                                                    <img class="help-setpon-img" v-if="item.stepOn"
                                                        src="../../assets/images/stepOnYes.png" alt=""
                                                        @click="showSetonHelpImg(8, false, item)">
                                                    <img class="cope-img" src="../../assets/images/copyBlack.png"
                                                        @click="copyText(item.content)" alt="">
                                                </div>
                                            </div>

                                            <div class="prompt" v-if="isBtnXunfei">
                                                当前内容为AI生成，不做任何决策使用！由此引发的一切后果，需自行承担，请知悉，已通过阿里云内容安全审核</div>
                                        </div>
                                    </div>
                                    <div class="chat_bot">
                                        <span class="operete_btn"
                                            v-if="isfinishXunfei && index == chatXunfeiList.length - 1 && item.finish_reason == 'length'"
                                            @click="keepAs(1, item)">继续</span>
                                        <span class="operete_btn"
                                            v-if="isfinishXunfei && index == chatXunfeiList.length - 1"
                                            @click="optimizeAnswers(item, index)">优化本次回答</span>
                                        <span class="reset_request"
                                            v-if="!isfinishXunfei && index == chatXunfeiList.length - 1"
                                            @click="endController(item.session_code)">
                                            <i class="el-icon-remove-outline"></i>
                                            停止回答
                                        </span>

                                        <span class="reset_request"
                                            v-if="isfinishXunfei && !isClickChat && index == chatXunfeiList.length - 1"
                                            @click="resetController" style="width: 73px;">
                                            <i class="el-icon-refresh"></i>
                                            重试
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!-- 右侧模板 -->
                        <div :class="isShowChecked ? 'cg-chat-right' : 'cg-chat-right cg-chat-right-on'"
                            v-if="item.role == 'user'" style="justify-content: flex-start">

                            <el-checkbox v-if="isShowChecked" v-model="item.checked"
                                style="margin-right: 18px;margin-top: 6px;" @change="changeSendAnswer(item)"></el-checkbox>
                            <div class="as-cont-right">
                                <img class="cg-user-pic cg-left" :src="httpUrls.ossUrl + loginInfo.avatar_url" alt="">
                                <div class="as_text_right">
                                    <div class="cg-chatbox cg-chatbox-right">
                                        <span class="reply" style="display: block;margin-bottom: 10px;"
                                            v-html="item.content"></span>
                                        <img v-if="item.images != null && item.images.length > 0"
                                            :src="httpUrls.ossUrl + item.images[0]" alt=""
                                            style="width: 300px;cursor: zoom-in;"
                                            @click="showImagesVisible = true, chatimageUrl = item.images[0]">
                                        <img class="img" src="../../assets/images/copyWrite.png" alt=""
                                            @click="copyText(item.content)">
                                    </div>

                                    <div class="reset_request" v-if="!isClickChat && isfinishXunfei"
                                        @click="resetQuest(item)">
                                        <i class="el-icon-chat-dot-round" style="font-size: 16px;"></i>
                                        重新提问
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Claude -->
                <div v-for="(item, index) in chatClaudeList" :key="index" v-if="chat_type == 7">
                    <div>
                        <!-- 左侧模板 -->
                        <div class="cg-chat-left" v-if="item.role == 'assistant'">
                            <el-checkbox v-if="isShowChecked" v-model="item.checked"
                                style="margin-right: 18px;margin-top: 6px;" @change="changeSendAnswer(item)"></el-checkbox>
                            <div style="display: flex;width: 100%;">
                                <img class="cg-user-pic cg-right" src="../../assets/images/Claude.png" alt="">
                                <div class="as-cont-left" style="min-width: 600px;">
                                    <!-- 文字模式 -->
                                    <div class="as_text_left">
                                        <div class="cg-chatbox cg-chatbox-left">
                                            <div v-if="t_timeClaude != null && index == chatClaudeList.length - 1"
                                                class="reply markdown-body"
                                                :style="!isfinishClaude && index == chatClaudeList.length - 1 ? 'white-space: pre-wrap;' : ''">
                                                {{ (index == chatClaudeList.length - 1 && index != 0 && !isDetailClaude) ?
                                                    replyClaude : item.content }}</div>

                                            <div v-else class="reply markdown-body"
                                                :style="!isfinishClaude && index == chatClaudeList.length - 1 ? 'white-space: pre-wrap;' : ''"
                                                v-html="(index == chatClaudeList.length - 1 && index != 0 && !isDetailClaude) ? replyClaude : item.markedContent">
                                            </div>

                                            <!-- <div style="font-size: 14px;color: #999999;margin-top: 20px;" v-if="isfinishClaude && index == chatClaudeList.length - 1 && !isClickChat">
                                            如果对此答案不满意，
                                            <span style="color: #1F64FF;cursor: pointer;" @click="toChatFouty">点我</span>
                                            可以尝试在40中提问
                                        </div> -->
                                            <div class="comput">
                                                <div style="display: flex;flex-wrap: nowrap;">
                                                    <span class="put_text"
                                                        v-if="!isfinishClaude && index == chatClaudeList.length - 1"><img
                                                            class="await_img asd" src="../../assets/images/await.gif"
                                                            alt="">思考中，</span>
                                                    <span class="put_text" v-if="isfinishClaude && !isClickChat"><img
                                                            class="await_img" src="../../assets/images/Time_atack_light.png"
                                                            alt=""></span>
                                                    <!-- 回答结束时显示 -->
                                                    <span class="put_text 1"
                                                        v-if="item.timer != false && isfinishClaude">耗时:{{ item.timer
                                                        }}秒</span>
                                                    <!-- 回答中显示 -->
                                                    <span class="put_text 2"
                                                        v-else-if="!isClickChat && index == chatClaudeList.length - 1">耗时:{{
                                                            timerClaude }}秒</span>
                                                    <span class="put_text 3"
                                                        v-else-if="!isfinishClaude && index == chatClaudeList.length - 1">耗时:{{
                                                            timerClaude }}秒</span>
                                                    <!-- 历史记录等显示 -->
                                                    <div class="put_text" v-if="index != chatClaudeList.length - 1">总字数：{{
                                                        (index == chatClaudeList.length - 1 && index != 0 &&
                                                            !isDetailClaude)
                                                        ? replyClaude.length : item.content.length }}</div>
                                                    <!-- 回答结束时显示 -->
                                                    <div class="put_text" v-else-if="isfinishClaude">总字数：{{ (index ==
                                                        chatClaudeList.length - 1 && index != 0 && !isDetailClaude) ?
                                                        replyClaude.length : item.content.length }}</div>

                                                    <!-- <span class="put_text" v-if="isBtnClaude">
                                                    <span>消耗{{ item.integral }}算力</span>
                                                    <span>：上行{{ item.prompt_tokens }}token 下行{{ item.completion_tokens }}token</span>
                                                </span>

                                                <el-tooltip placement="top" v-if="isBtnClaude">
                                                    <div slot="content" class="tooltip_public">
                                                    消耗算力：上行+下行=消耗算力<br />
                                                    如开通会员VIP，在有效期内使用问答消耗算力显示为0<br />
                                                    提醒：用户提问字数+机器人回答字数=消耗文字（因接口获取存在不稳定性，会产生token误差，如有问题请联系客服）<br />
                                                    </div>
                                                    <el-button icon="el-icon-question"
                                                    style="padding: 0;background-color: transparent;border: none;color: #999999;"></el-button>
                                                </el-tooltip> -->
                                                </div>

                                                <div class="help-setpon">
                                                    <img class="help-setpon-img" v-if="!item.help"
                                                        src="../../assets/images/helpNo.png" alt=""
                                                        @click="showSetonHelpImg(9, true, item)">
                                                    <img class="help-setpon-img" v-if="item.help"
                                                        src="../../assets/images/helpYes.png" alt=""
                                                        @click="showSetonHelpImg(9, false, item)">
                                                    <img class="help-setpon-img" v-if="!item.stepOn"
                                                        src="../../assets/images/stepOnNo.png" alt=""
                                                        @click="showSetonHelpImg(10, true, item)">
                                                    <img class="help-setpon-img" v-if="item.stepOn"
                                                        src="../../assets/images/stepOnYes.png" alt=""
                                                        @click="showSetonHelpImg(10, false, item)">
                                                    <img class="cope-img" src="../../assets/images/copyBlack.png"
                                                        @click="copyText(item.content)" alt="">
                                                </div>
                                            </div>

                                            <div class="prompt" v-if="isBtnClaude">
                                                当前内容为AI生成，不做任何决策使用！由此引发的一切后果，需自行承担，请知悉，已通过阿里云内容安全审核</div>
                                        </div>
                                    </div>
                                    <div class="chat_bot">
                                        <span class="operete_btn"
                                            v-if="isfinishClaude && index == chatClaudeList.length - 1 && item.finish_reason == 'length'"
                                            @click="keepAs(1, item)">继续</span>
                                        <span class="operete_btn"
                                            v-if="isfinishClaude && index == chatClaudeList.length - 1"
                                            @click="optimizeAnswers(item, index)">优化本次回答</span>
                                        <span class="reset_request"
                                            v-if="!isfinishClaude && index == chatClaudeList.length - 1"
                                            @click="endController(item.session_code)">
                                            <i class="el-icon-remove-outline"></i>
                                            停止回答
                                        </span>

                                        <span class="reset_request"
                                            v-if="isfinishClaude && !isClickChat && index == chatClaudeList.length - 1"
                                            @click="resetController" style="width: 73px;">
                                            <i class="el-icon-refresh"></i>
                                            重试
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!-- 右侧模板 -->
                        <div :class="isShowChecked ? 'cg-chat-right' : 'cg-chat-right cg-chat-right-on'"
                            v-if="item.role == 'user'" style="justify-content: flex-start">

                            <el-checkbox v-if="isShowChecked" v-model="item.checked"
                                style="margin-right: 18px;margin-top: 6px;" @change="changeSendAnswer(item)"></el-checkbox>
                            <div class="as-cont-right">
                                <img class="cg-user-pic cg-left" :src="httpUrls.ossUrl + loginInfo.avatar_url" alt="">
                                <div class="as_text_right">
                                    <div class="cg-chatbox cg-chatbox-right">
                                        <span class="reply" style="display: block;margin-bottom: 10px;"
                                            v-html="item.content"></span>
                                        <img v-if="item.images != null && item.images.length > 0"
                                            :src="httpUrls.ossUrl + item.images[0]" alt=""
                                            style="width: 300px;cursor: zoom-in;"
                                            @click="showImagesVisible = true, chatimageUrl = item.images[0]">
                                        <img class="img" src="../../assets/images/copyWrite.png" alt=""
                                            @click="copyText(item.content)">
                                    </div>

                                    <div class="reset_request" v-if="!isClickChat && isfinishClaude"
                                        @click="resetQuest(item)">
                                        <i class="el-icon-chat-dot-round" style="font-size: 16px;"></i>
                                        重新提问
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- ChatGLM -->
                <div v-for="(item, index) in chatChatGLMList" :key="index" v-if="chat_type == 8">
                    <div>
                        <!-- 左侧模板 -->
                        <div class="cg-chat-left" v-if="item.role == 'assistant'">
                            <el-checkbox v-if="isShowChecked" v-model="item.checked"
                                style="margin-right: 18px;margin-top: 6px;" @change="changeSendAnswer(item)"></el-checkbox>
                            <div style="display: flex;width: 100%;">
                                <img class="cg-user-pic cg-right" src="../../assets/images/ChatGLM.png" alt="">
                                <div class="as-cont-left" style="min-width: 600px;">
                                    <!-- 文字模式 -->
                                    <div class="as_text_left">
                                        <div class="cg-chatbox cg-chatbox-left">
                                            <div v-if="t_timeChatGLM != null && index == chatChatGLMList.length - 1"
                                                class="reply markdown-body"
                                                :style="!isfinishChatGLM && index == chatChatGLMList.length - 1 ? 'white-space: pre-wrap;' : ''">
                                                {{ (index == chatChatGLMList.length - 1 && index != 0 && !isDetailChatGLM) ?
                                                    replyChatGLM : item.markedContent }}</div>

                                            <div v-else class="reply markdown-body"
                                                :style="!isfinishChatGLM && index == chatChatGLMList.length - 1 ? 'white-space: pre-wrap;' : ''"
                                                v-html="(index == chatChatGLMList.length - 1 && index != 0 && !isDetailChatGLM) ? replyChatGLM : item.markedContent">
                                            </div>

                                            <!-- <div style="font-size: 14px;color: #999999;margin-top: 20px;" v-if="isfinishChatGLM && index == chatChatGLMList.length - 1 && !isClickChat">
                                            如果对此答案不满意，
                                            <span style="color: #1F64FF;cursor: pointer;" @click="toChatFouty">点我</span>
                                            可以尝试在40中提问
                                        </div> -->
                                            <div class="comput">
                                                <div style="display: flex;flex-wrap: nowrap;">
                                                    <span class="put_text"
                                                        v-if="!isfinishChatGLM && index == chatChatGLMList.length - 1"><img
                                                            class="await_img asd" src="../../assets/images/await.gif"
                                                            alt="">思考中，</span>
                                                    <span class="put_text" v-if="isfinishChatGLM && !isClickChat"><img
                                                            class="await_img" src="../../assets/images/Time_atack_light.png"
                                                            alt=""></span>
                                                    <!-- 回答结束时显示 -->
                                                    <span class="put_text 1"
                                                        v-if="item.timer != false && isfinishChatGLM">耗时:{{ item.timer
                                                        }}秒</span>
                                                    <!-- 回答中显示 -->
                                                    <span class="put_text 2"
                                                        v-else-if="!isClickChat && index == chatChatGLMList.length - 1">耗时:{{
                                                            timerChatGLM }}秒</span>
                                                    <span class="put_text 3"
                                                        v-else-if="!isfinishChatGLM && index == chatChatGLMList.length - 1">耗时:{{
                                                            timerChatGLM }}秒</span>
                                                    <!-- 历史记录等显示 -->
                                                    <div class="put_text" v-if="index != chatChatGLMList.length - 1">总字数：{{
                                                        (index == chatChatGLMList.length - 1 && index != 0 &&
                                                            !isDetailChatGLM) ? replyChatGLM.length : item.content.length }}
                                                    </div>
                                                    <!-- 回答结束时显示 -->
                                                    <div class="put_text" v-else-if="isfinishChatGLM">总字数：{{ (index ==
                                                        chatChatGLMList.length - 1 && index != 0 && !isDetailChatGLM) ?
                                                        replyChatGLM.length : item.content.length }}</div>

                                                    <!-- <span class="put_text" v-if="isBtnChatGLM">
                                                    <span>消耗{{ item.integral }}算力</span>
                                                    <span>：共{{ item.total_tokens }}token</span>
                                                </span>

                                                <el-tooltip placement="top" v-if="isBtnChatGLM">
                                                    <div slot="content" class="tooltip_public">
                                                    消耗算力：上行+下行=消耗算力<br />
                                                    如开通会员VIP，在有效期内使用问答消耗算力显示为0<br />
                                                    提醒：用户提问字数+机器人回答字数=消耗文字（因接口获取存在不稳定性，会产生token误差，如有问题请联系客服）<br />
                                                    </div>
                                                    <el-button icon="el-icon-question"
                                                    style="padding: 0;background-color: transparent;border: none;color: #999999;"></el-button>
                                                </el-tooltip> -->
                                                </div>

                                                <div class="help-setpon">
                                                    <img class="help-setpon-img" v-if="!item.help"
                                                        src="../../assets/images/helpNo.png" alt=""
                                                        @click="showSetonHelpImg(11, true, item)">
                                                    <img class="help-setpon-img" v-if="item.help"
                                                        src="../../assets/images/helpYes.png" alt=""
                                                        @click="showSetonHelpImg(11, false, item)">
                                                    <img class="help-setpon-img" v-if="!item.stepOn"
                                                        src="../../assets/images/stepOnNo.png" alt=""
                                                        @click="showSetonHelpImg(12, true, item)">
                                                    <img class="help-setpon-img" v-if="item.stepOn"
                                                        src="../../assets/images/stepOnYes.png" alt=""
                                                        @click="showSetonHelpImg(12, false, item)">
                                                    <img class="cope-img" src="../../assets/images/copyBlack.png"
                                                        @click="copyText(item.content)" alt="">
                                                </div>
                                            </div>

                                            <div class="prompt" v-if="isBtnChatGLM">
                                                当前内容为AI生成，不做任何决策使用！由此引发的一切后果，需自行承担，请知悉，已通过阿里云内容安全审核</div>
                                        </div>
                                    </div>
                                    <div class="chat_bot">
                                        <span class="operete_btn"
                                            v-if="isfinishChatGLM && index == chatChatGLMList.length - 1 && item.finish_reason == 'length'"
                                            @click="keepAs(1, item)">继续</span>
                                        <span class="operete_btn"
                                            v-if="isfinishChatGLM && index == chatChatGLMList.length - 1"
                                            @click="optimizeAnswers(item, index)">优化本次回答</span>
                                        <span class="reset_request"
                                            v-if="!isfinishChatGLM && index == chatChatGLMList.length - 1"
                                            @click="endController(item.session_code)">
                                            <i class="el-icon-remove-outline"></i>
                                            停止回答
                                        </span>

                                        <span class="reset_request"
                                            v-if="isfinishChatGLM && !isClickChat && index == chatChatGLMList.length - 1"
                                            @click="resetController" style="width: 73px;">
                                            <i class="el-icon-refresh"></i>
                                            重试
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!-- 右侧模板 -->
                        <div :class="isShowChecked ? 'cg-chat-right' : 'cg-chat-right cg-chat-right-on'"
                            v-if="item.role == 'user'" style="justify-content: flex-start">

                            <el-checkbox v-if="isShowChecked" v-model="item.checked"
                                style="margin-right: 18px;margin-top: 6px;" @change="changeSendAnswer(item)"></el-checkbox>
                            <div class="as-cont-right">
                                <img class="cg-user-pic cg-left" :src="httpUrls.ossUrl + loginInfo.avatar_url" alt="">
                                <div class="as_text_right">
                                    <div class="cg-chatbox cg-chatbox-right">
                                        <span class="reply" style="display: block;margin-bottom: 10px;"
                                            v-html="item.content"></span>
                                        <img v-if="item.images != null && item.images.length > 0"
                                            :src="httpUrls.ossUrl + item.images[0]" alt=""
                                            style="width: 300px;cursor: zoom-in;"
                                            @click="showImagesVisible = true, chatimageUrl = item.images[0]">
                                        <img class="img" src="../../assets/images/copyWrite.png" alt=""
                                            @click="copyText(item.content)">
                                    </div>

                                    <div class="reset_request" v-if="!isClickChat && isfinishChatGLM"
                                        @click="resetQuest(item)">
                                        <i class="el-icon-chat-dot-round" style="font-size: 16px;"></i>
                                        重新提问
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- 通义千问 -->
                <div v-for="(item, index) in chatTongyiList" :key="index" v-if="chat_type == 10">
                    <div>
                        <!-- 左侧模板 -->
                        <div class="cg-chat-left" v-if="item.role == 'assistant'">
                            <el-checkbox v-if="isShowChecked" v-model="item.checked"
                                style="margin-right: 18px;margin-top: 6px;" @change="changeSendAnswer(item)"></el-checkbox>
                            <div style="display: flex;width: 100%;">
                                <img class="cg-user-pic cg-right" src="../../assets/images/tongyi.png" alt="">
                                <div class="as-cont-left" style="min-width: 600px;">
                                    <!-- 文字模式 -->
                                    <div class="as_text_left">
                                        <div class="cg-chatbox cg-chatbox-left">
                                            <div v-if="t_timeTongyi != null && index == chatTongyiList.length - 1"
                                                class="reply markdown-body"
                                                :style="!isfinishTongyi && index == chatTongyiList.length - 1 ? 'white-space: pre-wrap;' : ''">
                                                {{ (index == chatTongyiList.length - 1 && index != 0 && !isDetailTongyi) ?
                                                    replyTongyi : item.content }}</div>

                                            <div v-else class="reply markdown-body"
                                                :style="!isfinishTongyi && index == chatTongyiList.length - 1 ? 'white-space: pre-wrap;' : ''"
                                                v-html="(index == chatTongyiList.length - 1 && index != 0 && !isDetailTongyi) ? replyTongyi : item.markedContent">
                                            </div>
                                            {{ index == chatTongyiList.length - 1 && index != 0 && !isDetailTongyi }}
                                            <!-- <div style="font-size: 14px;color: #999999;margin-top: 20px;" v-if="isfinishTongyi && index == chatTongyiList.length - 1 && !isClickChat">
                                            如果对此答案不满意，
                                            <span style="color: #1F64FF;cursor: pointer;" @click="toChatFouty">点我</span>
                                            可以尝试在40中提问
                                        </div> -->
                                            <div class="comput">
                                                <div style="display: flex;flex-wrap: nowrap;">
                                                    <span class="put_text"
                                                        v-if="!isfinishTongyi && index == chatTongyiList.length - 1"><img
                                                            class="await_img asd" src="../../assets/images/await.gif"
                                                            alt="">思考中，</span>
                                                    <span class="put_text" v-if="isfinishTongyi && !isClickChat"><img
                                                            class="await_img" src="../../assets/images/Time_atack_light.png"
                                                            alt=""></span>
                                                    <!-- 回答结束时显示 -->
                                                    <span class="put_text 1"
                                                        v-if="item.timer != false && isfinishTongyi">耗时:{{ item.timer
                                                        }}秒</span>
                                                    <!-- 回答中显示 -->
                                                    <span class="put_text 2"
                                                        v-else-if="!isClickChat && index == chatTongyiList.length - 1">耗时:{{
                                                            timerTongyi }}秒</span>
                                                    <span class="put_text 3"
                                                        v-else-if="!isfinishTongyi && index == chatTongyiList.length - 1">耗时:{{
                                                            timerTongyi }}秒</span>
                                                    <!-- 历史记录等显示 -->
                                                    <div class="put_text" v-if="index != chatTongyiList.length - 1">总字数：{{
                                                        (index == chatTongyiList.length - 1 && index != 0 &&
                                                            !isDetailTongyi)
                                                        ? replyTongyi.length : item.content.length }}</div>
                                                    <!-- 回答结束时显示 -->
                                                    <div class="put_text" v-else-if="isfinishTongyi">总字数：{{ (index ==
                                                        chatTongyiList.length - 1 && index != 0 && !isDetailTongyi) ?
                                                        replyTongyi.length : item.content.length }}</div>

                                                    <!-- <span class="put_text" v-if="isBtnTongyi">
                                                    <span>消耗{{ item.integral }}算力</span>
                                                    <span>：上行{{ item.prompt_tokens }}token 下行{{ item.completion_tokens }}token</span>
                                                </span>

                                                <el-tooltip placement="top" v-if="isBtnTongyi">
                                                    <div slot="content" class="tooltip_public">
                                                    消耗算力：上行+下行=消耗算力<br />
                                                    如开通会员VIP，在有效期内使用问答消耗算力显示为0<br />
                                                    提醒：用户提问字数+机器人回答字数=消耗文字（因接口获取存在不稳定性，会产生token误差，如有问题请联系客服）<br />
                                                    </div>
                                                    <el-button icon="el-icon-question"
                                                    style="padding: 0;background-color: transparent;border: none;color: #999999;"></el-button>
                                                </el-tooltip> -->
                                                </div>

                                                <div class="help-setpon">
                                                    <img class="help-setpon-img" v-if="!item.help"
                                                        src="../../assets/images/helpNo.png" alt=""
                                                        @click="showSetonHelpImg(13, true, item)">
                                                    <img class="help-setpon-img" v-if="item.help"
                                                        src="../../assets/images/helpYes.png" alt=""
                                                        @click="showSetonHelpImg(13, false, item)">
                                                    <img class="help-setpon-img" v-if="!item.stepOn"
                                                        src="../../assets/images/stepOnNo.png" alt=""
                                                        @click="showSetonHelpImg(14, true, item)">
                                                    <img class="help-setpon-img" v-if="item.stepOn"
                                                        src="../../assets/images/stepOnYes.png" alt=""
                                                        @click="showSetonHelpImg(14, false, item)">
                                                    <img class="cope-img" src="../../assets/images/copyBlack.png"
                                                        @click="copyText(item.content)" alt="">
                                                </div>
                                            </div>

                                            <div class="prompt" v-if="isBtnTongyi">
                                                当前内容为AI生成，不做任何决策使用！由此引发的一切后果，需自行承担，请知悉，已通过阿里云内容安全审核</div>
                                        </div>
                                    </div>
                                    <div class="chat_bot">
                                        <span class="operete_btn"
                                            v-if="isfinishTongyi && index == chatTongyiList.length - 1 && item.finish_reason == 'length'"
                                            @click="keepAs(1, item)">继续</span>
                                        <span class="operete_btn"
                                            v-if="isfinishTongyi && index == chatTongyiList.length - 1"
                                            @click="optimizeAnswers(item, index)">优化本次回答</span>
                                        <span class="reset_request"
                                            v-if="!isfinishTongyi && index == chatTongyiList.length - 1"
                                            @click="endController(item.session_code)">
                                            <i class="el-icon-remove-outline"></i>
                                            停止回答
                                        </span>

                                        <span class="reset_request"
                                            v-if="isfinishTongyi && !isClickChat && index == chatTongyiList.length - 1"
                                            @click="resetController" style="width: 73px;">
                                            <i class="el-icon-refresh"></i>
                                            重试
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!-- 右侧模板 -->
                        <div :class="isShowChecked ? 'cg-chat-right' : 'cg-chat-right cg-chat-right-on'"
                            v-if="item.role == 'user'" style="justify-content: flex-start">

                            <el-checkbox v-if="isShowChecked" v-model="item.checked"
                                style="margin-right: 18px;margin-top: 6px;" @change="changeSendAnswer(item)"></el-checkbox>
                            <div class="as-cont-right">
                                <img class="cg-user-pic cg-left" :src="httpUrls.ossUrl + loginInfo.avatar_url" alt="">
                                <div class="as_text_right">
                                    <div class="cg-chatbox cg-chatbox-right">
                                        <span class="reply" style="display: block;margin-bottom: 10px;"
                                            v-html="item.content"></span>
                                        <img v-if="item.images != null && item.images.length > 0"
                                            :src="httpUrls.ossUrl + item.images[0]" alt=""
                                            style="width: 300px;cursor: zoom-in;"
                                            @click="showImagesVisible = true, chatimageUrl = item.images[0]">
                                        <img class="img" src="../../assets/images/copyWrite.png" alt=""
                                            @click="copyText(item.content)">
                                    </div>

                                    <div class="reset_request" v-if="!isClickChat && isfinishTongyi"
                                        @click="resetQuest(item)">
                                        <i class="el-icon-chat-dot-round" style="font-size: 16px;"></i>
                                        重新提问
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- 商汤 -->
                <div v-for="(item, index) in chatShangtangList" :key="index" v-if="chat_type == 11">
                    <div>
                        <!-- 左侧模板 -->
                        <div class="cg-chat-left" v-if="item.role == 'assistant'">
                            <el-checkbox v-if="isShowChecked" v-model="item.checked"
                                style="margin-right: 18px;margin-top: 6px;" @change="changeSendAnswer(item)"></el-checkbox>
                            <div style="display: flex;width: 100%;">
                                <img class="cg-user-pic cg-right" src="../../assets/images/shangtang.png" alt=""
                                    v-if="chat_type == 11">
                                <img class="cg-user-pic cg-right"
                                    src="https://s3-alpha-sig.figma.com/img/bfe3/eede/3e02200dc2cd325a9abd9a9f4c0fb94f?Expires=1700438400&Signature=TgU4r71Ruhre5FZLzIL-aj7e5u1Fg3BAOcMLmKVwD79MVOMEqW83SbTtvzgU4pQgXkeeyzFiUwvEqZuRJjqZy~1nqJZrfQV332QFHN8djT1fH0QuR64b2wXO1-25TSg1S3ZW9XUCS1ymXPPgLxN0nKSJ8kBtyhEQ1JWUEHTvaKA6kt0n-Ljbls-~8HA1iYre1KEERp68GIKN9HNUIW4Ls1Rb~VTPucukB0ED9TuIIBerVH-8TIhYY0dF1EWtiLgR-TdVVBqXpge06d1ndeL7w9Hc2EvxSVk4Qd64wRLCHPObMWvTVRSxl0BPk23shhASLNqSuMqGVKGOAwUT2ZPKqA__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4"
                                    alt="" v-else>
                                <div class="as-cont-left" style="min-width: 600px;">
                                    <!-- 文字模式 -->
                                    <div class="as_text_left">
                                        <div class="cg-chatbox cg-chatbox-left">
                                            <div v-if="t_timeShangtang != null && index == chatShangtangList.length - 1"
                                                class="reply markdown-body"
                                                :style="!isfinishShangtang && index == chatShangtangList.length - 1 ? 'white-space: pre-wrap;' : ''">
                                                {{ (index == chatShangtangList.length - 1 && index != 0 &&
                                                    !isDetailShangtang) ? replyShangtang : item.content }}</div>

                                            <div v-else class="reply markdown-body"
                                                :style="!isfinishShangtang && index == chatShangtangList.length - 1 ? 'white-space: pre-wrap;' : ''"
                                                v-html="(index == chatShangtangList.length - 1 && index != 0 && !isDetailShangtang) ? replyShangtang : item.markedContent">
                                            </div>

                                            <!-- <div style="font-size: 14px;color: #999999;margin-top: 20px;" v-if="isfinishShangtang && index == chatShangtangList.length - 1 && !isClickChat">
                                            如果对此答案不满意，
                                            <span style="color: #1F64FF;cursor: pointer;" @click="toChatFouty">点我</span>
                                            可以尝试在40中提问
                                        </div> -->
                                            <div class="comput">
                                                <div style="display: flex;flex-wrap: nowrap;">
                                                    <span class="put_text"
                                                        v-if="!isfinishShangtang && index == chatShangtangList.length - 1"><img
                                                            class="await_img asd" src="../../assets/images/await.gif"
                                                            alt="">思考中，</span>
                                                    <span class="put_text" v-if="isfinishShangtang && !isClickChat"><img
                                                            class="await_img" src="../../assets/images/Time_atack_light.png"
                                                            alt=""></span>
                                                    <!-- 回答结束时显示 -->
                                                    <span class="put_text 1"
                                                        v-if="item.timer != false && isfinishShangtang">耗时:{{ item.timer
                                                        }}秒</span>
                                                    <!-- 回答中显示 -->
                                                    <span class="put_text 2"
                                                        v-else-if="!isClickChat && index == chatShangtangList.length - 1">耗时:{{
                                                            timerShangtang }}秒</span>
                                                    <span class="put_text 3"
                                                        v-else-if="!isfinishShangtang && index == chatShangtangList.length - 1">耗时:{{
                                                            timerShangtang }}秒</span>
                                                    <!-- 历史记录等显示 -->
                                                    <div class="put_text" v-if="index != chatShangtangList.length - 1">
                                                        总字数：{{ (index == chatShangtangList.length - 1 && index != 0 &&
                                                            !isDetailShangtang) ? replyShangtang.length : item.content.length }}
                                                    </div>
                                                    <!-- 回答结束时显示 -->
                                                    <div class="put_text" v-else-if="isfinishShangtang">总字数：{{ (index ==
                                                        chatShangtangList.length - 1 && index != 0 && !isDetailShangtang) ?
                                                        replyShangtang.length : item.content.length }}</div>

                                                    <!-- <span class="put_text" v-if="isBtnShangtang">
                                                    <span>消耗{{ item.integral }}算力</span>
                                                    <span>：上行{{ item.prompt_tokens }}token 下行{{ item.completion_tokens }}token</span>
                                                </span>

                                                <el-tooltip placement="top" v-if="isBtnShangtang">
                                                    <div slot="content" class="tooltip_public">
                                                    消耗算力：上行+下行=消耗算力<br />
                                                    如开通会员VIP，在有效期内使用问答消耗算力显示为0<br />
                                                    提醒：用户提问字数+机器人回答字数=消耗文字（因接口获取存在不稳定性，会产生token误差，如有问题请联系客服）<br />
                                                    </div>
                                                    <el-button icon="el-icon-question"
                                                    style="padding: 0;background-color: transparent;border: none;color: #999999;"></el-button>
                                                </el-tooltip> -->
                                                </div>

                                                <div class="help-setpon">
                                                    <img class="help-setpon-img" v-if="!item.help"
                                                        src="../../assets/images/helpNo.png" alt=""
                                                        @click="showSetonHelpImg(15, true, item)">
                                                    <img class="help-setpon-img" v-if="item.help"
                                                        src="../../assets/images/helpYes.png" alt=""
                                                        @click="showSetonHelpImg(15, false, item)">
                                                    <img class="help-setpon-img" v-if="!item.stepOn"
                                                        src="../../assets/images/stepOnNo.png" alt=""
                                                        @click="showSetonHelpImg(16, true, item)">
                                                    <img class="help-setpon-img" v-if="item.stepOn"
                                                        src="../../assets/images/stepOnYes.png" alt=""
                                                        @click="showSetonHelpImg(16, false, item)">
                                                    <img class="cope-img" src="../../assets/images/copyBlack.png"
                                                        @click="copyText(item.content)" alt="">
                                                </div>
                                            </div>

                                            <div class="prompt" v-if="isBtnShangtang">
                                                当前内容为AI生成，不做任何决策使用！由此引发的一切后果，需自行承担，请知悉，已通过阿里云内容安全审核</div>
                                        </div>
                                    </div>
                                    <div class="chat_bot">
                                        <span class="operete_btn"
                                            v-if="isfinishShangtang && index == chatShangtangList.length - 1 && item.finish_reason == 'length'"
                                            @click="keepAs(1, item)">继续</span>
                                        <span class="operete_btn"
                                            v-if="isfinishShangtang && index == chatShangtangList.length - 1"
                                            @click="optimizeAnswers(item, index)">优化本次回答</span>
                                        <span class="reset_request"
                                            v-if="!isfinishShangtang && index == chatShangtangList.length - 1"
                                            @click="endController(item.session_code)">
                                            <i class="el-icon-remove-outline"></i>
                                            停止回答
                                        </span>

                                        <span class="reset_request"
                                            v-if="isfinishShangtang && !isClickChat && index == chatShangtangList.length - 1"
                                            @click="resetController" style="width: 73px;">
                                            <i class="el-icon-refresh"></i>
                                            重试
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!-- 右侧模板 -->
                        <div :class="isShowChecked ? 'cg-chat-right' : 'cg-chat-right cg-chat-right-on'"
                            v-if="item.role == 'user'" style="justify-content: flex-start">

                            <el-checkbox v-if="isShowChecked" v-model="item.checked"
                                style="margin-right: 18px;margin-top: 6px;" @change="changeSendAnswer(item)"></el-checkbox>
                            <div class="as-cont-right">
                                <img class="cg-user-pic cg-left" :src="httpUrls.ossUrl + loginInfo.avatar_url" alt="">
                                <div class="as_text_right">
                                    <div class="cg-chatbox cg-chatbox-right">
                                        <span class="reply" style="display: block;margin-bottom: 10px;"
                                            v-html="item.content"></span>
                                        <img v-if="item.images != null && item.images.length > 0"
                                            :src="httpUrls.ossUrl + item.images[0]" alt=""
                                            style="width: 300px;cursor: zoom-in;"
                                            @click="showImagesVisible = true, chatimageUrl = item.images[0]">
                                        <img class="img" src="../../assets/images/copyWrite.png" alt=""
                                            @click="copyText(item.content)">
                                    </div>

                                    <div class="reset_request" v-if="!isClickChat && isfinishShangtang"
                                        @click="resetQuest(item)">
                                        <i class="el-icon-chat-dot-round" style="font-size: 16px;"></i>
                                        重新提问
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- 360 -->
                <div v-for="(item, index) in chat360List" :key="index" v-if="chat_type == 12">
                    <div>
                        <!-- 左侧模板 -->
                        <div class="cg-chat-left" v-if="item.role == 'assistant'">
                            <el-checkbox v-if="isShowChecked" v-model="item.checked"
                                style="margin-right: 18px;margin-top: 6px;" @change="changeSendAnswer(item)"></el-checkbox>
                            <div style="display: flex;width: 100%;">
                                <img class="cg-user-pic cg-right" :src="httpUrls.ossUrl+'static/picture/0bd787ee-2f53-4216-b810-030f6ba2f55c.png'" alt=""
                                    v-if="chat_type == 12">
                                <img class="cg-user-pic cg-right"
                                :src="httpUrls.ossUrl+'static/picture/0bd787ee-2f53-4216-b810-030f6ba2f55c.png'"
                                    alt="" v-else>
                                <div class="as-cont-left" style="min-width: 600px;">
                                    <!-- 文字模式 -->
                                    <div class="as_text_left">
                                        <div class="cg-chatbox cg-chatbox-left">
                                            <div v-if="t_time360 != null && index == chat360List.length - 1"
                                                class="reply markdown-body"
                                                :style="!chat360List && index == chat360List.length - 1 ? 'white-space: pre-wrap;' : ''">
                                                {{ (index == chat360List.length - 1 && index != 0 &&
                                                    !isDetail360) ? reply360 : item.content }}</div>

                                            <div v-else class="reply markdown-body"
                                                :style="!isfinish360 && index == chat360List.length - 1 ? 'white-space: pre-wrap;' : ''"
                                                v-html="(index == chat360List.length - 1 && index != 0 && !isDetail360) ? reply360 : item.markedContent">
                                            </div>

                                            <!-- <div style="font-size: 14px;color: #999999;margin-top: 20px;" v-if="isfinishShangtang && index == chatShangtangList.length - 1 && !isClickChat">
                                            如果对此答案不满意，
                                            <span style="color: #1F64FF;cursor: pointer;" @click="toChatFouty">点我</span>
                                            可以尝试在40中提问
                                        </div> -->
                                            <div class="comput">
                                                <div style="display: flex;flex-wrap: nowrap;">
                                                    <span class="put_text"
                                                        v-if="!isfinishShangtang && index == chat360List.length - 1"><img
                                                            class="await_img asd" src="../../assets/images/await.gif"
                                                            alt="">思考中，</span>
                                                    <span class="put_text" v-if="isfinish360 && !isClickChat"><img
                                                            class="await_img" src="../../assets/images/Time_atack_light.png"
                                                            alt=""></span>
                                                    <!-- 回答结束时显示 -->
                                                    <span class="put_text 1" v-if="item.timer != false && isfinish360">耗时:{{
                                                        item.timer
                                                    }}秒</span>
                                                    <!-- 回答中显示 -->
                                                    <span class="put_text 2"
                                                        v-else-if="!isClickChat && index == chat360List.length - 1">耗时:{{
                                                            timer360 }}秒</span>
                                                    <span class="put_text 3"
                                                        v-else-if="!isfinish360 && index == chat360List.length - 1">耗时:{{
                                                            timer360 }}秒</span>
                                                    <!-- 历史记录等显示 -->
                                                    <div class="put_text" v-if="index != chat360List.length - 1">
                                                        总字数：{{ (index == chat360List.length - 1 && index != 0 &&
                                                            !isDetail360) ? reply360.length : item.content.length }}
                                                    </div>
                                                    <!-- 回答结束时显示 -->
                                                    <div class="put_text" v-else-if="isfinish360">总字数：{{ (index ==
                                                        chat360List.length - 1 && index != 0 && !isDetail360) ?
                                                        reply360.length : item.content.length }}</div>

                                                    <!-- <span class="put_text" v-if="isBtnShangtang">
                                                    <span>消耗{{ item.integral }}算力</span>
                                                    <span>：上行{{ item.prompt_tokens }}token 下行{{ item.completion_tokens }}token</span>
                                                </span>

                                                <el-tooltip placement="top" v-if="isBtnShangtang">
                                                    <div slot="content" class="tooltip_public">
                                                    消耗算力：上行+下行=消耗算力<br />
                                                    如开通会员VIP，在有效期内使用问答消耗算力显示为0<br />
                                                    提醒：用户提问字数+机器人回答字数=消耗文字（因接口获取存在不稳定性，会产生token误差，如有问题请联系客服）<br />
                                                    </div>
                                                    <el-button icon="el-icon-question"
                                                    style="padding: 0;background-color: transparent;border: none;color: #999999;"></el-button>
                                                </el-tooltip> -->
                                                </div>

                                                <div class="help-setpon">
                                                    <img class="help-setpon-img" v-if="!item.help"
                                                        src="../../assets/images/helpNo.png" alt=""
                                                        @click="showSetonHelpImg(15, true, item)">
                                                    <img class="help-setpon-img" v-if="item.help"
                                                        src="../../assets/images/helpYes.png" alt=""
                                                        @click="showSetonHelpImg(15, false, item)">
                                                    <img class="help-setpon-img" v-if="!item.stepOn"
                                                        src="../../assets/images/stepOnNo.png" alt=""
                                                        @click="showSetonHelpImg(16, true, item)">
                                                    <img class="help-setpon-img" v-if="item.stepOn"
                                                        src="../../assets/images/stepOnYes.png" alt=""
                                                        @click="showSetonHelpImg(16, false, item)">
                                                    <img class="cope-img" src="../../assets/images/copyBlack.png"
                                                        @click="copyText(item.content)" alt="">
                                                </div>
                                            </div>

                                            <div class="prompt" v-if="isBtn360">
                                                当前内容为AI生成，不做任何决策使用！由此引发的一切后果，需自行承担，请知悉，已通过阿里云内容安全审核</div>
                                        </div>
                                    </div>
                                    <div class="chat_bot">
                                        <span class="operete_btn"
                                            v-if="isfinish360 && index == chat360List.length - 1 && item.finish_reason == 'length'"
                                            @click="keepAs(1, item)">继续</span>
                                        <span class="operete_btn" v-if="isfinish360 && index == chat360List.length - 1"
                                            @click="optimizeAnswers(item, index)">优化本次回答</span>
                                        <span class="reset_request" v-if="!isfinish360 && index == chat360List.length - 1"
                                            @click="endController(item.session_code)">
                                            <i class="el-icon-remove-outline"></i>
                                            停止回答
                                        </span>

                                        <span class="reset_request"
                                            v-if="isfinishShangtang && !isClickChat && index == chatShangtangList.length - 1"
                                            @click="resetController" style="width: 73px;">
                                            <i class="el-icon-refresh"></i>
                                            重试
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!-- 右侧模板 -->
                        <div :class="isShowChecked ? 'cg-chat-right' : 'cg-chat-right cg-chat-right-on'"
                            v-if="item.role == 'user'" style="justify-content: flex-start">

                            <el-checkbox v-if="isShowChecked" v-model="item.checked"
                                style="margin-right: 18px;margin-top: 6px;" @change="changeSendAnswer(item)"></el-checkbox>
                            <div class="as-cont-right">
                                <img class="cg-user-pic cg-left" :src="httpUrls.ossUrl + loginInfo.avatar_url" alt="">
                                <div class="as_text_right">
                                    <div class="cg-chatbox cg-chatbox-right">
                                        <span class="reply" style="display: block;margin-bottom: 10px;"
                                            v-html="item.content"></span>
                                        <img v-if="item.images != null && item.images.length > 0"
                                            :src="httpUrls.ossUrl + item.images[0]" alt=""
                                            style="width: 300px;cursor: zoom-in;"
                                            @click="showImagesVisible = true, chatimageUrl = item.images[0]">
                                        <img class="img" src="../../assets/images/copyWrite.png" alt=""
                                            @click="copyText(item.content)">
                                    </div>

                                    <div class="reset_request" v-if="!isClickChat && isfinishShangtang"
                                        @click="resetQuest(item)">
                                        <i class="el-icon-chat-dot-round" style="font-size: 16px;"></i>
                                        重新提问
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- 账户没钱了 -->
                <div class="cg-chat-left" v-if="!isuser">
                    <img class="cg-user-pic cg-right" src="../../assets/images/GPT35.png" alt="" v-if="chat_type == 0">
                    <img class="cg-user-pic cg-right" src="../../assets/images/GPT40.png" alt="" v-if="chat_type == 1">
                    <img class="cg-user-pic cg-right" src="../../assets/images/wenxinyiyan.png" alt=""
                        v-if="chat_type == 4">
                    <img class="cg-user-pic cg-right" src="../../assets/images/xunfeixinghuo.png" alt=""
                        v-if="chat_type == 5">
                    <img class="cg-user-pic cg-right" src="../../assets/images/Claude.png" alt="" v-if="chat_type == 7">
                    <img class="cg-user-pic cg-right" src="../../assets/images/ChatGLM.png" alt="" v-if="chat_type == 8">
                    <img class="cg-user-pic cg-right" src="../../assets/images/tongyi.png" alt="" v-if="chat_type == 10">
                    <img class="cg-user-pic cg-right" src="../../assets/images/shangtang.png" alt="" v-if="chat_type == 11">
                    <img class="cg-user-pic cg-right" :src="httpUrls.ossUrl+'static/picture/0bd787ee-2f53-4216-b810-030f6ba2f55c.png'" alt="" v-if="chat_type == 12">
                    <div class="as-cont-left 123">
                        <div class="as_text_left">
                            <div class="cg-chatbox cg-chatbox-left">
                                <div class="left_tip">{{ queryErrorMsg }}</div>
                                <div style="margin-top: 10px;display: flex;justify-content: space-between;">
                                    <el-button
                                        style="background-color: #FF9B17;color: #FFFFFF;border-radius: 4px;padding: 6px 60px;"
                                        @click="$refs.Pay.PayVisible = true">开通VIP</el-button>
                                    <!-- <el-button type="primary" style="background-color: #1F64FF;border-radius: 4px;padding: 6px 60px;" @click="$router.push('/member/Member')">购买流量包</el-button> -->
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- 屏蔽词 -->
                <div class="cg-chat-left" v-if="isFoulLanguage">
                    <img class="cg-user-pic cg-right" src="../../assets/images/GPT35.png" alt="" v-if="chat_type == 0">
                    <img class="cg-user-pic cg-right" src="../../assets/images/GPT40.png" alt="" v-if="chat_type == 1">
                    <img class="cg-user-pic cg-right" src="../../assets/images/wenxinyiyan.png" alt=""
                        v-if="chat_type == 4">
                    <img class="cg-user-pic cg-right" src="../../assets/images/xunfeixinghuo.png" alt=""
                        v-if="chat_type == 5">
                    <img class="cg-user-pic cg-right" src="../../assets/images/Claude.png" alt="" v-if="chat_type == 7">
                    <img class="cg-user-pic cg-right" src="../../assets/images/ChatGLM.png" alt="" v-if="chat_type == 8">
                    <img class="cg-user-pic cg-right" src="../../assets/images/tongyi.png" alt="" v-if="chat_type == 10">
                    <img class="cg-user-pic cg-right" src="../../assets/images/shangtang.png" alt="" v-if="chat_type == 11">
                    <img class="cg-user-pic cg-right" :src="httpUrls.ossUrl+'static/picture/0bd787ee-2f53-4216-b810-030f6ba2f55c.png'" alt="" v-if="chat_type == 12">
                    <div class="as-cont-left">
                        <div class="as_text_left">
                            <div class="cg-chatbox cg-chatbox-left">
                                <div class="left_tip">{{ queryErrorMsg }}</div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- 关注公众号 -->
                <!-- <div class="codebox" v-if="chatList.length == 0 && AIname == 0" style="margin-top: 30px;">
                <img class="codeimg" :src="contactService" alt="">
                <span class="codename" style="margin: 10px 0 20px 0;">加客服免费领会员</span>
                <div>为了方便您以后能找到我们的网站，请按<span style="color: #0084ff;font-weight: bold;">Ctrl+D</span>收藏吧,或者下载<span style="color: #0084ff;font-weight: bold;cursor: pointer;" @click="downloadImage('慧远AI','.url')">快捷方式文件</span>拖至桌面</div>
            </div>
            <div class="codebox" v-if="AIname == 1 && chatVipList.length == 0" style="margin-top: 30px;">
                <img class="codeimg" :src="contactService" alt="">
                <span class="codename" style="margin: 10px 0 20px 0;">加客服免费领会员</span>
            </div> -->

                <!-- 获取中 -->
                <div>
                    <div class="cg-chat-left" v-if="isTimeThreeFive && chat_type == 0" style="margin-bottom: 20px;">
                        <img class="cg-user-pic cg-right" src="../../assets/images/GPT35.png" alt="">
                        <div class="as-cont-left">
                            <div class="as_text_left">
                                <div class="cg-chatbox cg-chatbox-left">
                                    <div class="comput" style="justify-content: flex-start;">
                                        <span class="put_text"><img class="await_img" src="../../assets/images/await.gif"
                                                alt="">思考中，</span>
                                        <span class="put_text">耗时:{{ timerThreeFive }}秒</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- 获取中 -->
                    <div class="cg-chat-left" v-else-if="isTimeFourZero && chat_type == 1" style="margin-bottom: 20px;">
                        <img class="cg-user-pic cg-right" src="../../assets/images/GPT40.png" alt="">
                        <div class="as-cont-left">
                            <div class="as_text_left">
                                <div class="cg-chatbox cg-chatbox-left">
                                    <div class="comput" style="justify-content: flex-start;">
                                        <span class="put_text"><img class="await_img" src="../../assets/images/await.gif"
                                                alt="">思考中，</span>
                                        <span class="put_text">耗时:{{ timerFourZero }}秒</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- 获取中 -->
                    <div class="cg-chat-left" v-else-if="isTimeYiyan && chat_type == 4" style="margin-bottom: 20px;">
                        <img class="cg-user-pic cg-right" src="../../assets/images/wenxinyiyan.png" alt="">
                        <div class="as-cont-left">
                            <div class="as_text_left">
                                <div class="cg-chatbox cg-chatbox-left">
                                    <div class="comput" style="justify-content: flex-start;">
                                        <span class="put_text"><img class="await_img" src="../../assets/images/await.gif"
                                                alt="">思考中，</span>
                                        <span class="put_text">耗时:{{ timerYiyan }}秒</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- 获取中 -->
                    <div class="cg-chat-left" v-else-if="isTimeXunfei && chat_type == 5" style="margin-bottom: 20px;">
                        <img class="cg-user-pic cg-right" src="../../assets/images/xunfeixinghuo.png" alt="">
                        <div class="as-cont-left">
                            <div class="as_text_left">
                                <div class="cg-chatbox cg-chatbox-left">
                                    <div class="comput" style="justify-content: flex-start;">
                                        <span class="put_text"><img class="await_img" src="../../assets/images/await.gif"
                                                alt="">思考中，</span>
                                        <span class="put_text">耗时:{{ timerXunfei }}秒</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- 获取中 -->
                    <div class="cg-chat-left" v-else-if="isTimeClaude && chat_type == 7" style="margin-bottom: 20px;">
                        <img class="cg-user-pic cg-right" src="../../assets/images/Claude.png" alt="">
                        <div class="as-cont-left">
                            <div class="as_text_left">
                                <div class="cg-chatbox cg-chatbox-left">
                                    <div class="comput" style="justify-content: flex-start;">
                                        <span class="put_text"><img class="await_img" src="../../assets/images/await.gif"
                                                alt="">思考中，</span>
                                        <span class="put_text">耗时:{{ timerClaude }}秒</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- 获取中 -->
                    <div class="cg-chat-left" v-else-if="isTimeChatGLM && chat_type == 8" style="margin-bottom: 20px;">
                        <img class="cg-user-pic cg-right" src="../../assets/images/ChatGLM.png" alt="">
                        <div class="as-cont-left">
                            <div class="as_text_left">
                                <div class="cg-chatbox cg-chatbox-left">
                                    <div class="comput" style="justify-content: flex-start;">
                                        <span class="put_text"><img class="await_img" src="../../assets/images/await.gif"
                                                alt="">思考中，</span>
                                        <span class="put_text">耗时:{{ timerChatGLM }}秒</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- 获取中 -->
                    <div class="cg-chat-left" v-else-if="isTimeTongyi && chat_type == 10" style="margin-bottom: 20px;">
                        <img class="cg-user-pic cg-right" src="../../assets/images/tongyi.png" alt="">
                        <div class="as-cont-left">
                            <div class="as_text_left">
                                <div class="cg-chatbox cg-chatbox-left">
                                    <div class="comput" style="justify-content: flex-start;">
                                        <span class="put_text"><img class="await_img" src="../../assets/images/await.gif"
                                                alt="">思考中，</span>
                                        <span class="put_text">耗时:{{ timerTongyi }}秒</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- 获取中 -->
                    <div class="cg-chat-left" v-else-if="isTimeShangtang && chat_type == 11" style="margin-bottom: 20px;">
                        <img class="cg-user-pic cg-right" src="../../assets/images/shangtang.png" alt="">
                        <div class="as-cont-left">
                            <div class="as_text_left">
                                <div class="cg-chatbox cg-chatbox-left">
                                    <div class="comput" style="justify-content: flex-start;">
                                        <span class="put_text"><img class="await_img" src="../../assets/images/await.gif"
                                                alt="">思考中，</span>
                                        <span class="put_text">耗时:{{ timerShangtang }}秒</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- 获取中 -->
                    <div class="cg-chat-left" v-else-if="isTime360 && chat_type == 12" style="margin-bottom: 20px;">
                        <img class="cg-user-pic cg-right" :src="httpUrls.ossUrl+'static/picture/0bd787ee-2f53-4216-b810-030f6ba2f55c.png'" alt="">
                        <div class="as-cont-left">
                            <div class="as_text_left">
                                <div class="cg-chatbox cg-chatbox-left">
                                    <div class="comput" style="justify-content: flex-start;">
                                        <span class="put_text"><img class="await_img" src="../../assets/images/await.gif"
                                                alt="">思考中，</span>
                                        <span class="put_text">耗时:{{ timer360 }}秒</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <span class="reset_request query-reset_request" v-if="isTimeThreeFive && chat_type == 0"
                        @click="endController('', false)">
                        <i class="el-icon-remove-outline"></i>
                        停止回答
                    </span>
                    <span class="reset_request query-reset_request" v-else-if="isTimeFourZero && chat_type == 1"
                        @click="endController('', false)">
                        <i class="el-icon-remove-outline"></i>
                        停止回答
                    </span>
                    <span class="reset_request query-reset_request" v-else-if="isTimeYiyan && chat_type == 4"
                        @click="endController('', false)">
                        <i class="el-icon-remove-outline"></i>
                        停止回答
                    </span>
                    <span class="reset_request query-reset_request" v-else-if="isTimeXunfei && chat_type == 5"
                        @click="endController('', false)">
                        <i class="el-icon-remove-outline"></i>
                        停止回答
                    </span>
                    <span class="reset_request query-reset_request" v-else-if="isTimeClaude && chat_type == 7"
                        @click="endController('', false)">
                        <i class="el-icon-remove-outline"></i>
                        停止回答
                    </span>
                    <span class="reset_request query-reset_request" v-else-if="isTimeChatGLM && chat_type == 8"
                        @click="endController('', false)">
                        <i class="el-icon-remove-outline"></i>
                        停止回答
                    </span>
                    <span class="reset_request query-reset_request" v-else-if="isTimeTongyi && chat_type == 10"
                        @click="endController('', false)">
                        <i class="el-icon-remove-outline"></i>
                        停止回答
                    </span>
                    <span class="reset_request query-reset_request" v-else-if="isTimeShangtang && chat_type == 11"
                        @click="endController('', false)">
                        <i class="el-icon-remove-outline"></i>
                        停止回答
                    </span>
                    <span class="reset_request query-reset_request" v-else-if="isTime360 && chat_type == 12"
                        @click="endController('', false)">
                        <i class="el-icon-remove-outline"></i>
                        停止回答
                    </span>
                </div>
            </div>

            <div class="footer_cont">
                <div class="cont">
                    <!-- <el-select v-model="AIname" placeholder="智能AI为您服务" :class="isShowTemplateSelte ? 'chat-select-aiName onceClassName' : 'chat-select-aiName'" :disabled="AINameDisabled" :style="{'--a': textareaHeight}">
                    <el-option
                    v-for="item in aiNameList"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select> -->
                    <div
                        :class="isSahowUploadPicture && chatImageFile != '' ? 'footer-inp_img footer-inp_img-on' : 'footer-inp_img'">
                        <!-- <div class="association_class">
                        <i class="el-icon-link" @click="isShowChecked = !isShowChecked, isShowassociation = !isShowassociation, association == '1' ? association = '' : association = '1'" :style="association == '1' ? 'color: #1f64ff' : ''"></i>
                        <el-tooltip class="item" effect="dark" content="关联上下文，可以让大语言模型更好理解上下文信息意图，让回答更精准" placement="right-start">
                            <el-button icon="el-icon-question" style="border: none;padding: 0;"></el-button>
                        </el-tooltip>
                    </div> -->
                        <el-input resize="none" :style="{ '--a': textareaHeight }"
                            :class="isShowTemplateSelte ? 'onceClassNameRight chat-text-textarea' : 'chat-text-textarea'"
                            type="textarea" :autosize="{ minRows: 1, maxRows: 6 }"
                            placeholder="在此输入您想了解的内容，Shift+Enter换行，Enter发送" v-model="sendValue" @input="changeSendValue"
                            @keyup.enter.native="(event) => handleKeyUp(event)">
                        </el-input>

                        <div class="upload-file_image" v-if="isSahowUploadPicture && chatImageFile != ''">
                            <img class="img" :src="httpUrls.ossUrl + chatImageFile" alt="">
                            <i class="el-icon-close clear_img" @click="clearUploadImage"></i>
                        </div>
                    </div>
                    <div class="textarea-btn">
                        <div class="mask">
                            <el-upload
                                :class="isSahowUploadPicture && chatImageFile != '' ? 'upload-demo-chat upload-demo-chat-on' : 'upload-demo-chat'"
                                v-if="isSahowUploadPicture && chatImageFile == ''" drag accept=".jpg,.jpeg,.png"
                                ref="blueprintReading" :data="blueprintReadingFile" :style="{ '--a': textareaHeight }"
                                :action="httpUrls.loginUrl + 'api/user/oss_upload'" :on-change="handleChangeFile"
                                :on-success="handleSuccessFile" :on-exceed="() => { return $message.error('文件上传超出最大限制！') }"
                                :show-file-list="false" :limit="1" :headers="headerData">
                                <i class="el-icon-upload"></i>
                                <div class="el-upload__text">将图片拖到此处，或<em>点击上传</em></div>
                                <!-- <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div> -->
                            </el-upload>

                            <img style="cursor: pointer;" src="../../assets/images/camera.png" alt=""
                                @click="isSahowUploadPicture = !isSahowUploadPicture, chatImageFile = ''">
                            <el-button class="send_img" style="height: 32px;width: 70px;" type="primary"
                                v-if="chat_type == 0" @click="isBtnThreeFive ? sendMsg() : sendMsg2()">发送</el-button>
                            <el-button class="send_img" style="height: 32px;width: 70px;" type="primary"
                                v-if="chat_type == 1" @click="isBtnFourZero ? sendMsg() : sendMsg2()">发送</el-button>
                            <el-button class="send_img" style="height: 32px;width: 70px;" type="primary"
                                v-if="chat_type == 4" @click="isBtnYiyan ? sendMsg() : sendMsg2()">发送</el-button>
                            <el-button class="send_img" style="height: 32px;width: 70px;" type="primary"
                                v-if="chat_type == 5" @click="isBtnXunfei ? sendMsg() : sendMsg2()">发送</el-button>
                            <el-button class="send_img" style="height: 32px;width: 70px;" type="primary"
                                v-if="chat_type == 7" @click="isBtnClaude ? sendMsg() : sendMsg2()">发送</el-button>
                            <el-button class="send_img" style="height: 32px;width: 70px;" type="primary"
                                v-if="chat_type == 8" @click="isBtnChatGLM ? sendMsg() : sendMsg2()">发送</el-button>
                            <el-button class="send_img" style="height: 32px;width: 70px;" type="primary"
                                v-if="chat_type == 10" @click="isBtnTongyi ? sendMsg() : sendMsg2()">发送</el-button>
                            <el-button class="send_img" style="height: 32px;width: 70px;" type="primary"
                                v-if="chat_type == 11" @click="isBtnShangtang ? sendMsg() : sendMsg2()">发送</el-button>
                            <el-button class="send_img" style="height: 32px;width: 70px;" type="primary"
                                v-if="chat_type == 12" @click="isBtn360 ? sendMsg() : sendMsg2()">发送</el-button>
                        </div>
                    </div>

                    <div class="association" v-if="isShowassociation" style="z-index: 5;">
                        <div class="title">是否关联上文</div>
                        <div class="item">
                            <el-radio v-model="association" label="1">是</el-radio>
                            <el-radio v-model="association" label="2">否</el-radio>
                        </div>
                        <div class="line"></div>
                    </div>
                </div>
            </div>

            <!-- 补充弹窗 -->
            <el-dialog :visible.sync="supplyVisible" width="500px">
                <div class="supply_cont">
                    <el-input type="textarea" resize='none' :rows="3" placeholder="请输入您要优化的内容"
                        v-model="sendValue"></el-input>
                </div>

                <span slot="footer" class="chat-dialog-footer" @click="sendMsg('reset')">
                    发送
                </span>
            </el-dialog>

            <!-- 注册组件 -->
            <Register ref="Register"></Register>

        </div>
        <right-nav :updataRightList="updataRightList" :sessionRightNavCode="sessionRightNavCode"
            @updatachatlist="updataChatList" @undatename="undateName" :randomStr="randomStr" @resetnewchat="resetNewChat"
            @isshowrightsidbar="isShowRightSidbar"></right-nav>
        <el-dialog class="draw_image-class_dark" :visible.sync="showImagesVisible">
            <img :src="httpUrls.ossUrl + chatimageUrl" alt="" style="max-height: 800px;min-height: 500px;cursor: zoom-out;"
                @click="showImagesVisible = false">
        </el-dialog>
        <pay ref="Pay"></pay>
    </div>
</template>

<script>
import httpUrls from '../../api/requestURL'

import { Line } from 'echarts/lib/util/graphic'
import { creatChat, chatDetail, creatDraw, questionSetRecommend, submitFootprint } from '../../api/chatMG'
import { recommend, chatLikes, promptsRecommend } from '../../api/prompts'
import TemplateSelect from '../../components/dialog/templateSelect'
import Register from '../../components/register'
import rightNav from '../../components/rightNav';
import GoBackNew from '../../components/GoBackNew';

import { mapGetters } from 'vuex'

import { marked } from 'marked'
import hljs from 'highlight.js'

import pay from '../../components/pay'
import { textDecoder, arr2str } from '../../utils/download'
export default {
    name: 'chat',
    data() {
        return {
            httpUrls,
            isSahowUploadPicture: false,
            isShowRightNav: true,
            chatImageFile: '', // 上传图片的地址
            chatimageUrl: '',
            showImagesVisible: false,
            blueprintReadingFile: {
                image: null,
                image_name: null,
                oss_dir: 'static',
                cate: 'AI_chat-picture'
            },
            aiNameList: [
                { value: 4, label: '文心一言', img: '../../assets/img/讯飞星火认知大模型-AI大语言模型-星火大模型-科大讯飞1.png' },
                { value: 5, label: '讯飞星火', img: '../../assets/img/通义1.png' },
                { value: 10, label: '通义千问', img: 'https://s3-alpha-sig.figma.com/img/0c43/4a73/456a956ee0424f9ded03e6c2bd7f2d7c?Expires=1700438400&Signature=N3e7zmoS5QJkFpCF05cVPznLiYQbnUrKk7hxkJKj0JD92SkwYV2tZUl6ui1slQtbaTAjM0BS1-C-KD-c5xXsETtlVNYlbCkvf53X49U8r9t938syzFwE3Q0CN8LCfOnq-7nJvFf~UppCV12MtvDYzSdzJGPxwHwfakISV1anbwDuN4uHF0cty2M-DEdxMZa09lABXlfeeZc7qvCdx0UQyQn1r84TzmfXUqaOKEkx-L4XiDK3eIeAtazga~-RO6BOsKevBNUS2nhC9-8b5ibGYu5wvpe-PIthjFZuYQhdyj6PJoNSgurw078t1C0FIvbglH79UudkwszE61yjIn~a9A__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4' },
                { value: 12, label: '360智脑-2', img: "static/picture/0bd787ee-2f53-4216-b810-030f6ba2f55c.png"},
                { value: 8, label: 'ChatGLM', img: "static/picture/e70dcaf9-f3cb-40c1-99de-b739f09a7d18.png" },

                // {value: 11, label: '商汤日日新'},
                // {value: 0, label: 'AI35'},
                // {value: 1, label: 'AI40'},
                // {value: 7, label: 'Claude'},
            ],
            modelList: [
                {
                    label: '文心一言-4',
                    value: 'completions_pro',
                    price: '能力较强，36w算力/1000token'
                },
                {
                    label: '文心一言',
                    value: 'completions',
                    price: '3.6w算力/1000token'
                },
                {
                    label: '文心一言-turbo',
                    value: 'eb-instant',
                    price: '2.4w算力/1000token'
                },
            ],
            modelNum: {
                label: '文心一言-4',
                value: 'completions_pro',
                price: '能力较强，36w算力/1000token'
            },
            AINameDisabled: false,

            headerData: {},
            // chatText: 'AI35',
            // action_type: '1',
            // activeName: '0',
            chat_type: 4, // ai35: 0; ai40: 1
            AIname: 4, // ai id
            sendValue: '', // 问题的内容
            oldSendValue: '', // 临时保存上一次的问题
            isShow: false, // 快速提问
            // isPay: true,
            replyThreeFive: '', // 实时回答 / 35
            replyFourZero: '', // 实时回答 / 40
            replyYiyan: '', // 实时回答 / 文心一言
            replyXunfei: '', // 实时回答 / 讯飞星火
            replyClaude: '', // 实时回答 / Claude
            replyChatGLM: '', // 实时回答 / ChatGLM
            replyTongyi: '', // 实时回答 / 通义千问
            replyShangtang: '', // 实时回答 / 商汤
            reply360: '', // 实时回答 / 商汤

            timerThreeFive: 0, // 定时器的时间 / 35
            timerFourZero: 0, // 定时器的时间 / 40
            timerYiyan: 0, // 定时器的时间 / 文心一言
            timerXunfei: 0, // 定时器的时间 / 讯飞星火
            timerClaude: 0, // 定时器的时间 / Claude
            timerChatGLM: 0, // 定时器的时间 / ChatGLM
            timerTongyi: 0, // 定时器的时间 / 通义千问
            timerShangtang: 0, // 定时器的时间 / 商汤
            timer360: 0, // 定时器的时间 / 360

            t_timeThreeFive: null, // 定时器
            t_timeFourZero: null, // 定时器
            t_timeYiyan: null, // 定时器
            t_timeXunfei: null, // 定时器
            t_timeClaude: null, // 定时器
            t_timeChatGLM: null, // 定时器
            t_timeTongyi: null, // 定时器
            t_timeShangtang: null, // 定时器
            t_time360: null, // 定时器

            isTimeThreeFive: false, // 开启获取中对话框 / 35
            isTimeFourZero: false, // 开启获取中对话框 / 40
            isTimeYiyan: false, // 开启获取中对话框 / 文心一言
            isTimeXunfei: false, // 开启获取中对话框 / 讯飞星火
            isTimeClaude: false, // 开启获取中对话框 / 讯飞星火
            isTimeChatGLM: false, // 开启获取中对话框 / ChatGLM
            isTimeTongyi: false, // 开启获取中对话框 / 通义千问
            isTimeShangtang: false, // 开启获取中对话框 / 商汤
            isTime360: false, // 开启获取中对话框 / 360

            // isfinish: true,
            isfinishThreeFive: true,// 完成打字效果 / 35
            isfinishFourZero: true,// 完成打字效果 / 40
            isfinishYiyan: true,// 完成打字效果 / 文心一言
            isfinishXunfei: true,// 完成打字效果 / 讯飞星火
            isfinishClaude: true,// 完成打字效果 / 讯飞星火
            isfinishChatGLM: true,// 完成打字效果 / ChatGLM
            isfinishTongyi: true,// 完成打字效果 / 通义千问
            isfinishShangtang: true,// 完成打字效果 / 商汤
            isfinish360: true,// 完成打字效果 / 商汤

            isBtnThreeFive: true, // 防止重新发送
            isBtnFourZero: true, // 防止重新发送
            isBtnYiyan: true, // 防止重新发送
            isBtnXunfei: true, // 防止重新发送
            isBtnClaude: true, // 防止重新发送
            isBtnChatGLM: true, // 防止重新发送
            isBtnTongyi: true, // 防止重新发送
            isBtnShangtang: true, // 防止重新发送
            isBtn360: true, // 防止重新发送

            supplyVisible: false, // 补充对话
            supplyValue: '', // 补充对话的问题
            isDetailThreeFive: false, // 显示会话内容 / 35
            isDetailFourZero: false, // 显示会话内容 / 40
            isDetailYiyan: false, // 显示会话内容 / 40
            isDetailXunfei: false, // 显示会话内容 / 40
            isDetailClaude: false, // 显示会话内容 / 40
            isDetailChatGLM: false, // 显示会话内容 / ChatGLM
            isDetailTongyi: false, // 显示会话内容 / ChatGLM
            isDetailShangtang: false, // 显示会话内容 / ChatGLM
            isDetail360: false,

            qsList: {}, // 热词

            chatList: [],//3.5数据
            chatVipList: [], // 4.0数据
            chatYiyanList: [], // 文心一言数据
            chatXunfeiList: [], // 讯飞星火数据
            chatClaudeList: [], // 讯飞星火数据
            chatChatGLMList: [], // 讯飞星火数据
            chatTongyiList: [], // 讯飞星火数据
            chatShangtangList: [], // 讯飞星火数据
            chat360List: [], // 讯飞星火数据

            isuser: true, //使用次数是否用完
            // userTextarea: '',
            // isShowHelpImg: false,
            // isShowStepOnImg: false,

            isShowTemplateSelte: false, // 查询模板
            isShowTemplateThreeFive: true, // 热词推荐
            isShowTemplateFourZero: true, // 热词推荐
            isShowTemplateYiyan: true, // 热词推荐
            isShowTemplateXunfei: true, // 热词推荐
            isShowTemplateClaude: true, // 热词推荐
            isShowTemplateChatGLM: true, // 热词推荐
            isShowTemplateTongyi: true, // 热词推荐
            isShowTemplateShangtang: true, // 热词推荐
            isShowTemplate360: true, // 热词推荐

            textAreaLength: '2000', // 问题长度
            association: '', // 是否关联上下文
            isShowassociation: false, // 是否关联上下文
            isShowChecked: false, // 复选框
            ordeAIList: [], // 关联上下文的列表
            // showRegister: false,
            updataRightList: null, // ai的id，=chat_type
            promptsId: null, // 模板指令的id
            sessionRightNavCode: '', // 聊天组的唯一id，用于刷新历史会话
            isClickChat: false, // 点击历史会话打开优化本次回答
            chatItem: {}, // 用于存放优化会话的临时对象
            randomStr: 0, // 随机数，刷新列表
            msgCode: '', // 当前会话的唯一id

            controllerThreeFive: null, // 用于终止fetch请求 / 35
            controllerFourZreo: null, // 用于终止fetch请求 / 40
            controllerYiyan: null, // 用于终止fetch请求 / 文心一言
            controllerXunfei: null, // 用于终止fetch请求 / 讯飞星火
            controllerClaude: null, // 用于终止fetch请求 / 讯飞星火
            controllerChatGLM: null, // 用于终止fetch请求 / 讯飞星火
            controllerTongyi: null, // 用于终止fetch请求 / 讯飞星火
            controllerShangtang: null, // 用于终止fetch请求 / 讯飞星火
            controller360: null, // 用于终止fetch请求 / 讯飞星火

            startNewChat35: false, // 开启新会话35
            startNewChat40: false, // 开启新会话40
            startNewChatYiyan: false, // 开启新会话文心一言
            startNewChatXunfei: false, // 开启新会话讯飞星火
            startNewChatClaude: false, // 开启新会话讯飞星火
            startNewChatChatGLM: false, // 开启新会话讯飞星火
            startNewChatTongyi: false, // 开启新会话讯飞星火
            startNewChatShangtang: false, // 开启新会话讯飞星火
            startNewChat360: false, // 开启新会话360

            isScrollTop: false, // 滚动条的变化
            chatContScroll: '', // 滚动条距离顶部的高度
            oldScrollTop: 0,
            textareaHeight: '38px', // 发送框的同一高度
            queryErrorMsg: '', // 会员次数用尽的提示
            isFoulLanguage: false, // 用户问题是否出现屏蔽词，问题返回时

            // 会话消耗的token和积分
            tokenNumberThreeFive: {
                completionTokens: 0, // 下行token
                promptTokens: 0, // 上行token
                integral: 0, // 积分
                totalTokens: 0 // 总tokes
            },
            tokenNumberFourZero: {
                completionTokens: 0,
                promptTokens: 0,
                integral: 0,
                totalTokens: 0
            },
            tokenNumberYiyan: {
                completionTokens: 0,
                promptTokens: 0,
                integral: 0,
                totalTokens: 0
            },
            tokenNumberXunfei: {
                completionTokens: 0,
                promptTokens: 0,
                integral: 0,
                totalTokens: 0
            }
        }
    },

    // 注册组件
    components: {
        Register,
        TemplateSelect,
        rightNav,
        pay,
        GoBackNew
    },
    computed: {
        ...mapGetters(['userInfoData', 'contactService']),
        modelText() {
            let text;
            let value = this.modelList.find(item => item.value == this.modelNum.value);
            switch (value.value) {
                case 'chatglm_pro':
                    text = "我是智普.AI推出的千亿参数对话语言模型，chatGLM-Turbo版本，,Turbo版本速度更快，价格也比较便宜哦"
                    break;
                case 'completions_pro':
                    text = "我是百度新一代大型语言模型，文心家族4.0版本，是文心家族最强的语言模型，我能力较强，但是价格也比较贵哦"
                    break;
                case 'completions':
                    text = "我是百度新一代大型语言模型，文心一言，在文心家族里，我推理能力更强，价格适中哦"
                    break;
                case 'eb-instant':
                    text = "我是百度新一代大型语言模型，文心一言-Turbo版本，在文心家族里，我的速度更快，价格相对优惠哦"
                    break;
                case 'v1.1':
                    text = '我是讯飞科大推出的新一代认知智能大模型，讯飞星火-1.1版本，V1.1版本能力一般，价格也相对较便宜哦'

                    break;
                case 'v2.1':
                    text = '我是讯飞科大推出的新一代认知智能大模型，讯飞星火-2.1版本，V2.1版本能力较强，价格也相对适中哦'
                    break;
                case 'v3.1':
                    text = '我是讯飞科大推出的新一代认知智能大模型，讯飞星火-3.1版本，V3.1版本能力更强，价格也相对更贵哦'
                    break;
                case 'qwen-plus':
                    text = '我是阿里巴巴集团推出的大型语言模型，是通义大模型家族的一员，通义千问Plus版本,Plus版本能力更强，价格也比较贵哦'
                    break;
                case 'qwen-turbo':
                    text = '我是阿里巴巴集团推出的大型语言模型，是通义大模型家族的一员，通义千问Turbo版本,Turbo版本速度更快，价格也比较便宜哦'
                    break;
                case '360GPT_S2_V9':
                    text = '我是360集团推出的认知型通用大模型，360智脑V9版本，V9版本速度较快，价格适中哦'
                    break;
                default:
                    break;
            }
            return text;
        }
    },

    props: {
        item: {
            type: String,
            default: ''
        }
    },

    watch: {
        sendValue: {
            deep: true,
            handler() {
                setTimeout(() => {
                    this.textareaHeight = document.getElementsByClassName('chat-text-textarea')[0].childNodes[0].clientHeight + 'px'
                }, 10);
            }
        },
        isTimeThreeFive: {
            deep: true,
            handler() {
                if (this.isTimeThreeFive) {
                    this.AINameDisabled = true
                } else {
                    this.AINameDisabled = false
                }
            }
        },
        isTimeFourZero: {
            deep: true,
            handler() {
                if (this.isTimeFourZero) {
                    this.AINameDisabled = true
                } else {
                    this.AINameDisabled = false
                }
            }
        },
        isTimeYiyan: {
            deep: true,
            handler() {
                if (this.isTimeYiyan) {
                    this.AINameDisabled = true
                } else {
                    this.AINameDisabled = false
                }
            }
        },
        isTimeXunfei: {
            deep: true,
            handler() {
                if (this.isTimeXunfei) {
                    this.AINameDisabled = true
                } else {
                    this.AINameDisabled = false
                }
            }
        },
        isTimeClaude: {
            deep: true,
            handler() {
                if (this.isTimeClaude) {
                    this.AINameDisabled = true
                } else {
                    this.AINameDisabled = false
                }
            }
        },
        isTimeChatGLM: {
            deep: true,
            handler() {
                if (this.isTimeChatGLM) {
                    this.AINameDisabled = true
                } else {
                    this.AINameDisabled = false
                }
            }
        },
        isTimeTongyi: {
            deep: true,
            handler() {
                if (this.isTimeTongyi) {
                    this.AINameDisabled = true
                } else {
                    this.AINameDisabled = false
                }
            }
        },
        isTimeShangtang: {
            deep: true,
            handler() {
                if (this.isTimeShangtang) {
                    this.AINameDisabled = true
                } else {
                    this.AINameDisabled = false
                }
            }
        },
        // 用户信息发生改变，重置页面信息
        userInfoData: {
            deep: true,
            handler() {
                this.randomStr = Math.random()
                this.chatList = []
                this.chatVipList = []
                this.chatYiyanList = []
                this.chatXunfeiList = []
                this.chatClaudeList = []
                this.chatChatGLMList = []
                this.chatTongyiList = []
                this.chatShangtangList = []
                this.queryQuestionSetRecommend()

            }
        },
        AIname: {
            deep: true,
            handler() {
                // 切换不同的ai时重置页面
                this.isuser = true
                this.isShowassociation = false
                this.isShowChecked = false
                this.chatList.forEach(v => {
                    v.checked = false
                })
                this.chatVipList.forEach(v => {
                    v.checked = false
                })
                this.chatYiyanList.forEach(v => {
                    v.checked = false
                })
                this.chatXunfeiList.forEach(v => {
                    v.checked = false
                })
                this.chatClaudeList.forEach(v => {
                    v.checked = false
                })
                this.chatChatGLMList.forEach(v => {
                    v.checked = false
                })
                this.chatTongyiList.forEach(v => {
                    v.checked = false
                })
                this.chatShangtangList.forEach(v => {
                    v.checked = false
                })
                this.association = ''

                if (this.AIname == 0) {
                    this.textAreaLength = '2000'
                    this.$store.dispatch('user/changeChatListLength', this.chatList.length)
                } else if (this.AIname == 1) {
                    this.textAreaLength = '2000'
                    this.$store.dispatch('user/changeChatListLength', this.chatVipList.length)
                } else if (this.AIname == 4) {
                    this.textAreaLength = '2000'
                    this.$store.dispatch('user/changeChatListLength', this.chatYiyanList.length)
                } else if (this.AIname == 5) {
                    this.textAreaLength = '2000'
                    this.$store.dispatch('user/changeChatListLength', this.chatXunfeiList.length)
                } else if (this.AIname == 7) {
                    this.textAreaLength = '2000'
                    this.$store.dispatch('user/changeChatListLength', this.chatClaudeList.length)
                } else if (this.AIname == 8) {
                    this.textAreaLength = '2000'
                    this.$store.dispatch('user/changeChatListLength', this.chatChatGLMList.length)
                } else if (this.AIname == 10) {
                    this.textAreaLength = '2000'
                    this.$store.dispatch('user/changeChatListLength', this.chatTongyiList.length)
                } else if (this.AIname == 11) {
                    this.textAreaLength = '2000'
                    this.$store.dispatch('user/changeChatListLength', this.chatShangtangList.length)
                }
                this.chat_type = this.AIname
                this.$store.dispatch('id/setAIChatname', this.AIname)
                this.updataRightList = Number(this.chat_type)
            }
        },
        isShowassociation: {
            deep: true,
            handler() {
                if (this.isShowassociation && this.association == '') {
                    if (this.chat_type == 0) {
                        this.isBtnThreeFive = false
                    } else if (this.chat_type == 1) {
                        this.isBtnFourZero = false
                    } else if (this.chat_type == 4) {
                        this.isBtnYiyan = false
                    } else if (this.chat_type == 5) {
                        this.isBtnXunfei = false
                    } else if (this.chat_type == 7) {
                        this.isBtnClaude = false
                    } else if (this.chat_type == 8) {
                        this.isBtnChatGLM = false
                    } else if (this.chat_type == 10) {
                        this.isBtnTongyi = false
                    } else if (this.chat_type == 11) {
                        this.isBtnShangtang = false
                    } else if (this.chat_type == 12) {
                        this.isBtn360 = false
                    }
                }
            }
        },
        association: {
            deep: true,
            handler() {
                if (this.association != '') {
                    if (this.chat_type == 0) {
                        this.isBtnThreeFive = true
                    } else if (this.chat_type == 1) {
                        this.isBtnFourZero = true
                    } else if (this.chat_type == 4) {
                        this.isBtnYiyan = true
                    } else if (this.chat_type == 5) {
                        this.isBtnXunfei = true
                    } else if (this.chat_type == 7) {
                        this.isBtnClaude = true
                    } else if (this.chat_type == 8) {
                        this.isBtnChatGLM = true
                    } else if (this.chat_type == 10) {
                        this.isBtnTongyi = true
                    } else if (this.chat_type == 11) {
                        this.isBtnShangtang = true
                    } else if (this.chat_type == 12) {
                        this.isBtn360 = true
                    }
                }
                if (Number(this.association) == 2) {
                    this.isClickChat = false
                    if (this.chat_type == 0) {
                        clearInterval(this.t_timeThreeFive)
                        this.chatList = []
                        this.$store.dispatch('user/changeChatListLength', this.chatList.length)
                    } else if (this.chat_type == 1) {
                        clearInterval(this.t_timeFourZero)
                        this.chatVipList = []
                        this.$store.dispatch('user/changeChatListLength', this.chatVipList.length)
                    } else if (this.chat_type == 4) {
                        clearInterval(this.t_timeYiyan)
                        this.chatYiyanList = []
                        this.$store.dispatch('user/changeChatListLength', this.chatYiyanList.length)
                    } else if (this.chat_type == 5) {
                        clearInterval(this.t_timeXunfei)
                        this.chatXunfeiList = []
                        this.$store.dispatch('user/changeChatListLength', this.chatXunfeiList.length)
                    } else if (this.chat_type == 7) {
                        clearInterval(this.t_timeClaude)
                        this.chatClaudeList = []
                        this.$store.dispatch('user/changeChatListLength', this.chatClaudeList.length)
                    } else if (this.chat_type == 8) {
                        clearInterval(this.t_timeChatGLM)
                        this.chatChatGLMList = []
                        this.$store.dispatch('user/changeChatListLength', this.chatChatGLMList.length)
                    } else if (this.chat_type == 10) {
                        clearInterval(this.t_timeTongyi)
                        this.chatTongyiList = []
                        this.$store.dispatch('user/changeChatListLength', this.chatTongyiList.length)
                    } else if (this.chat_type == 11) {
                        clearInterval(this.t_timeShangtang)
                        this.chatShangtangList = []
                        this.$store.dispatch('user/changeChatListLength', this.chatShangtangList.length)
                    } else if (this.chat_type == 12) {
                        clearInterval(this.t_time360)
                        this.chatShangtangList = []
                        this.$store.dispatch('user/changeChatListLength', this.chat360List.length)
                    }
                    this.sendMsg()
                    this.isShowChecked = false
                    this.isShowassociation = false
                    this.isClickChat = false
                } else if (Number(this.association == 1)) {
                    // this.$message.success('请勾选您要关联上文的内容')
                    // this.isShowChecked = true
                    this.sendMsg()
                }
            }
        },
        textAreaLength: {
            deep: true,
            handler() {
                // if (this.chat_type == 0) {
                //     if (this.textAreaLength.length >= 2001) {
                //         this.$message.error('文字不得超过2000字')
                //     }
                // } else {
                //     if (this.textAreaLength.length >= 2001) {
                //         this.$message.error('文字不得超过2000字')
                //     }
                // }
            }
        },
        chatList: {
            deep: true,
            handler() {
                if (this.chatList.length == 0) {
                    this.startNewChat35 = false
                } else {
                    this.startNewChat35 = true
                }
            }
        },
        chatVipList: {
            deep: true,
            handler() {
                if (this.chatVipList.length == 0) {
                    this.startNewChat40 = false
                } else {
                    this.startNewChat40 = true
                }
            }
        },
        chatYiyanList: {
            deep: true,
            handler() {
                if (this.chatYiyanList.length == 0) {
                    this.startNewChatYiyan = false
                } else {
                    this.startNewChatYiyan = true
                }
            }
        },
        chatXunfeiList: {
            deep: true,
            handler() {
                if (this.chatXunfeiList.length == 0) {
                    this.startNewChatXunfei = false
                } else {
                    this.startNewChatXunfei = true
                }
            }
        },
        chatClaudeList: {
            deep: true,
            handler() {
                if (this.chatClaudeList.length == 0) {
                    this.startNewChatClaude = false
                } else {
                    this.startNewChatClaude = true
                }
            }
        },
        chatChatGLMList: {
            deep: true,
            handler() {
                if (this.chatChatGLMList.length == 0) {
                    this.startNewChatChatGLM = false
                } else {
                    this.startNewChatChatGLM = true
                }
            }
        },
        chatTongyiList: {
            deep: true,
            handler() {
                if (this.chatTongyiList.length == 0) {
                    this.startNewChatTongyi = false
                } else {
                    this.startNewChatTongyi = true
                }
            }
        },
        chatShangtangList: {
            deep: true,
            handler() {
                if (this.chatShangtangList.length == 0) {
                    this.startNewChatShangtang = false
                } else {
                    this.startNewChatShangtang = true
                }
            }
        },
    },

    created() {
        let userInfo = JSON.parse(localStorage.getItem("userInfo"));
        this.headerData.authorization = userInfo.token
        this.headerData.role = userInfo.role
        this.updataRightList = Number(this.chat_type)
        this.loginInfo = JSON.parse(localStorage.getItem("userInfo"));
        this.$root.Bus.$on('selectChat', value => { // 接收点击相应会话标识
            this.chatList = [];
            this.$store.dispatch('user/changeChatListLength', this.chatList.length)
            this.chatVipList = [];
            this.$store.dispatch('user/changeChatListLength', this.chatVipList.length)
            this.chatYiyanList = [];
            this.$store.dispatch('user/changeChatListLength', this.chatYiyanList.length)
            this.chatXunfeiList = [];
            this.$store.dispatch('user/changeChatListLength', this.chatXunfeiList.length)
            this.chatClaudeList = [];
            this.$store.dispatch('user/changeChatListLength', this.chatClaudeList.length)
            this.chatChatGLMList = [];
            this.$store.dispatch('user/changeChatListLength', this.chatChatGLMList.length)
            this.chatTongyiList = [];
            this.$store.dispatch('user/changeChatListLength', this.chatTongyiList.length)
            this.chatShangtangList = [];
            this.$store.dispatch('user/changeChatListLength', this.chatShangtangList.length)
            this.getDetail(value);
        })

        this.$root.Bus.$on('delChat', value => { // 清空历史会话
            this.chatList = [];
            this.$store.dispatch('user/changeChatListLength', this.chatList.length)
            this.chatVipList = [];
            this.$store.dispatch('user/changeChatListLength', this.chatVipList.length)
            this.chatYiyanList = [];
            this.$store.dispatch('user/changeChatListLength', this.chatYiyanList.length)
            this.chatXunfeiList = [];
            this.$store.dispatch('user/changeChatListLength', this.chatXunfeiList.length)
            this.chatClaudeList = [];
            this.$store.dispatch('user/changeChatListLength', this.chatClaudeList.length)
            this.chatChatGLMList = [];
            this.$store.dispatch('user/changeChatListLength', this.chatChatGLMList.length)
            this.chatTongyiList = [];
            this.$store.dispatch('user/changeChatListLength', this.chatTongyiList.length)
            this.chatShangtangList = [];
            this.$store.dispatch('user/changeChatListLength', this.chatShangtangList.length)
            if (this.chat_type == 0) {
                this.isTimeThreeFive = false;
            } else if (this.chat_type == 1) {
                this.isTimeFourZero = false;
            } else if (this.chat_type == 4) {
                this.isTimeYiyan = false;
            } else if (this.chat_type == 5) {
                this.isTimeXunfei = false;
            } else if (this.chat_type == 7) {
                this.isTimeClaude = false;
            } else if (this.chat_type == 8) {
                this.isTimeChatGLM = false;
            } else if (this.chat_type == 10) {
                this.isTimeTongyi = false;
            } else if (this.chat_type == 11) {
                this.isTimeShangtang = false;
            } else if (this.chat_type == 12) {
                this.isTime360 = false;
            }
        })
        localStorage.setItem('session_code', '');
        localStorage.setItem('session_code1', '');
        localStorage.setItem('session_code4', '');
        localStorage.setItem('session_code5', '');
        localStorage.setItem('session_code7', '');
        localStorage.setItem('session_code8', '');
        localStorage.setItem('session_code10', '');
        localStorage.setItem('session_code11', '');
        localStorage.setItem('session_code12', '');
        this.queryQuestionSetRecommend()
    },

    mounted() {
        // console.log(this.$route.query.value,'---监听')
        // document.title = httpUrls.name + '是一款人工智能聊天机器-能进行AI绘画-适用于多个场景进行聊天-商务合作-源码定制等'
        // let metaKeywords = document.createElement('meta')
        // metaKeywords.id = 'chat-meta-keywords'
        // metaKeywords.name = 'keywords'
        // metaKeywords.content = httpUrls.name + ',Ai聊天,ChatGpt3.5,ChatGpt4.0中文版,OpenAi,chatgpt国内版,AI智能软件,源码定制,API接口GPT4.0,API接口百度AI绘画'
        // document.getElementsByTagName('head')[0].appendChild(metaKeywords)

        // let metaDescription = document.createElement('meta')
        // metaDescription.id = 'chat-meta-description'
        // metaDescription.name = 'description'
        // metaDescription.content = httpUrls.name + '是人工智能聊天工具,相当于国内版的chatgpt4.0.拥有语言理解能力和文本生成能力,能撰写视频脚本,文案,翻译,代码,写论文邮件,诗词歌赋等任务.职场上升职.写工作报告,企业管理,市场营销等能助你一臂之力.它上知天文下知地理,在任何场景都能和你像人类一样进行交流,互动.'
        // document.getElementsByTagName('head')[0].appendChild(metaDescription)

        if (this.$route.params.item != undefined) {
            this.sendValue = this.$route.params.item
            this.promptsId = this.$route.params.item.prompts_id
            this.chat_type = Number(this.$route.params.id)
            this.AIname = Number(this.$route.params.id)
            if (this.$route.params.sendMsg) {
                this.sendMsg()
            }
        }
        this.$store.dispatch('id/setAIChatname', this.AIname)

        if (this.$route.params.id != undefined && this.$route.params.code != undefined) {
            this.getDetail(this.$route.params.code);
            this.AIname = this.$route.params.id
            this.chat_type = this.$route.params.id
        }

        if (this.$route.query.id != undefined) {
            let aiN = this.$route.query.id
            if (Number(aiN) != 0 && Number(aiN) != 1 && Number(aiN) != 4 && Number(aiN) != 5) {
                aiN = 0
            }
            this.AIname = aiN
            this.chat_type = aiN
        }
        // console.log(this.$route);
        if (this.$route.params.speakId != undefined && this.$route.params.id != undefined) {
            this.AIname = this.$route.params.id
            this.chat_type = this.$route.params.id
            this.updataChatList(this.$route.params.speakId)
        }
        if (this.$route.query.value) {
            let type = parseInt(this.$route.query.value)
            this.selectAIname(type)
        }

    },

    // 卸载前
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
        this.sendMsg()
      }
    },
        // 点击大模块
        handleModel() {

        },
        clearUploadImage() {
            this.isSahowUploadPicture = false
            this.chatImageFile = ''
        },
        isShowRightSidbar(bool) {
            this.isShowRightNav = bool
        },
        handleChangeFile(file, fileList) {
            this.blueprintReadingFile.image = file.raw
            this.blueprintReadingFile.image_name = file.name
        },
        handleSuccessFile(response, file, fileList) {
            this.chatImageFile = response.data.new_url
        },
        selectAIname(type) {
            let data = []
            switch (type) {
                case 8:
                    data = [
                        {
                            label: 'ChatGLM',
                            value: 'chatglm_pro',
                            price: '1.5w算力/1000token'
                        }
                    ]
                    break;
                case 4:
                    data = [
                        {
                            label: '文心一言-4',
                            value: 'completions_pro',
                            price: '能力较强，36w算力/1000token'
                        },
                        {
                            label: '文心一言',
                            value: 'completions',
                            price: '3.6w算力/1000token'
                        },
                        {
                            label: '文心一言-turbo',
                            value: 'eb-instant',
                            price: '2.4w算力/1000token'
                        },
                    ]
                    break;
                case 5:
                    data = [
                        {
                            label: '讯飞星火1.1',
                            value: 'v1.1',
                            price: '5.4w算力/1000token'
                        },
                        {
                            label: '讯飞星火2.1',
                            value: 'v2.1',
                            price: '10.8w算力/1000token'
                        },
                        {
                            label: '讯飞星火3.1',
                            value: 'v3.1',
                            price: '10.8w算力/1000token'
                        },
                    ]
                    break;
                case 10:
                    data = [
                        {
                            label: '通义千问Plus',
                            value: 'qwen-plus',
                            price: '6w算力/1000token'
                        },
                        {
                            label: '通义千问Tubor',
                            value: 'qwen-turbo',
                            price: '2.4w算力/1000token'
                        }
                    ]
                    break;
                case 12:
                    data = [
                        {
                            label: '360智脑-v9',
                            value: '360GPT_S2_V9',
                            price: '3.6w算力/1000token'
                        }
                    ]
                    break;
                default:
                    break;
            }
            this.modelNum = data[0];
            this.modelList = data;
            this.AIname = type
        },
        undateName(aiId) {
            this.AIname = aiId
        },
        updataChatList(code) {
            this.isuser = true
            this.isShowassociation = false
            this.isShowChecked = false
            this.chatList.forEach(v => {
                v.checked = false
            })
            this.chatVipList.forEach(v => {
                v.checked = false
            })
            this.chatYiyanList.forEach(v => {
                v.checked = false
            })
            this.chatXunfeiList.forEach(v => {
                v.checked = false
            })
            this.chatClaudeList.forEach(v => {
                v.checked = false
            })
            this.chatChatGLMList.forEach(v => {
                v.checked = false
            })
            this.chatTongyiList.forEach(v => {
                v.checked = false
            })
            this.chatShangtangList.forEach(v => {
                v.checked = false
            })
            this.sendValue = ''
            this.association = ''
            this.isClickChat = true
            this.chatContScroll = ''
            // console.log(this.chat_type);
            if (this.chat_type == 0) {
                this.isShowTemplateThreeFive = false
                if (!this.isfinishThreeFive) {
                    try {
                        this.controllerThreeFive.abort()
                    } catch (error) { }
                    clearInterval(this.t_timeThreeFive)
                    this.isfinishThreeFive = true
                    this.isBtnThreeFive = true
                }
            } else if (this.chat_type == 1) {
                this.isShowTemplateFourZero = false
                if (!this.isfinishFourZero) {
                    clearInterval(this.t_timeFourZero)
                    this.isfinishFourZero = true
                    this.isBtnFourZero = true
                    try {
                        this.controllerFourZreo.abort()
                    } catch (error) { }
                }
            } else if (this.chat_type == 4) {
                this.isShowTemplateYiyan = false
                if (!this.isfinishYiyan) {
                    clearInterval(this.t_timeYiyan)
                    this.isfinishYiyan = true
                    this.isBtnYiyan = true
                    try {
                        this.controllerYiyan.abort()
                    } catch (error) { }
                }
            } else if (this.chat_type == 5) {
                this.isShowTemplateXunfei = false
                if (!this.isfinishXunfei) {
                    clearInterval(this.t_timeXunfei)
                    this.isfinishXunfei = true
                    this.isBtnXunfei = true
                    try {
                        this.controllerXunfei.abort()
                    } catch (error) { }
                }
            } else if (this.chat_type == 7) {
                this.isShowTemplateClaude = false
                if (!this.isfinishClaude) {
                    clearInterval(this.t_timeClaude)
                    this.isfinishClaude = true;
                    this.isBtnClaude = true;
                    try {
                        this.controllerClaude.abort()
                    } catch (error) { }
                }
            } else if (this.chat_type == 8) {
                this.isShowTemplateChatGLM = false
                if (!this.isfinishChatGLM) {
                    clearInterval(this.t_timeChatGLM)
                    this.isfinishChatGLM = true
                    this.isBtnChatGLM = true
                    try {
                        this.controllerChatGLM.abort()
                    } catch (error) { }
                }
            } else if (this.chat_type == 10) {
                this.isShowTemplateTongyi = false
                if (!this.isfinishTongyi) {
                    clearInterval(this.t_timeTongyi)
                    this.isfinishTongyi = true
                    this.isBtnTongyi = true
                    try {
                        this.controllerTongyi.abort()
                    } catch (error) { }
                }
            } else if (this.chat_type == 11) {
                this.isShowTemplateShangtang = false
                if (!this.isfinishShangtang) {
                    clearInterval(this.t_timeShangtang)
                    this.isfinishShangtang = true
                    this.isBtnShangtang = true
                    try {
                        this.controllerShangtang.abort()
                    } catch (error) { }
                }
            } else if (this.chat_type == 12) {
                this.isShowTemplate360 = false
                if (!this.isfinish360) {
                    clearInterval(this.t_time360)
                    this.isfinish360 = true
                    this.isBtn360 = true
                    try {
                        this.controller360.abort()
                    } catch (error) { }
                }
            }
            this.getDetail(code)
        },
        // 换一批
        huanYiPi() {
            this.queryQuestionSetRecommend()
        },

        // 获取热词
        getRecommend() {
            recommend('').then(res => {
                if (res.data != null) {
                    this.qsList = res.data
                } else if (res.code == 40013) {
                    this.$refs.Register.registerVisible = true
                }
            })
        },

        // 获取会话详情
        getDetail(code) {
            // console.log(code,'会话详情')
            if (this.chat_type == 0) {
                this.isDetailThreeFive = true;
                this.isTimeThreeFive = false;
                this.isfinishThreeFive = true;
                this.chatList = [];
                this.isShowTemplateThreeFive = false
            } else if (this.chat_type == 1) {
                this.isDetailFourZero = true;
                this.isTimeFourZero = false;
                this.isfinishFourZero = true
                this.chatVipList = []
                this.isShowTemplateFourZero = false
            } else if (this.chat_type == 4) {
                this.isDetailYiyan = true;
                this.isTimeYiyan = false;
                this.isfinishYiyan = true
                this.chatYiyanList = []
                this.isShowTemplateYiyan = false
            } else if (this.chat_type == 5) {
                this.isDetailXunfei = true;
                this.isTimeXunfei = false;
                this.isfinishXunfei = true
                this.chatXunfeiList = []
                this.isShowTemplateXunfei = false
            } else if (this.chat_type == 7) {
                this.isDetailClaude = true;
                this.isTimeClaude = false;
                this.isfinishClaude = true
                this.chatClaudeList = []
                this.isShowTemplateClaude = false
            } else if (this.chat_type == 8) {
                this.isDetailChatGLM = true;
                this.isTimeChatGLM = false;
                this.isfinishChatGLM = true
                this.chatChatGLMList = []
                this.isShowTemplateChatGLM = false
            } else if (this.chat_type == 10) {
                this.isDetailTongyi = true;
                this.isTimeTongyi = false;
                this.isfinishTongyi = true
                this.chatTongyiList = []
                this.isShowTemplateTongyi = false
            } else if (this.chat_type == 11) {
                this.isDetailShangtang = true;
                this.isTimeShangtang = false;
                this.isfinishShangtang = true
                this.chatShangtangList = []
                this.isShowTemplateShangtang = false
            } else if (this.chat_type == 12) {
                this.isDetail360 = true;
                this.isTime360 = false;
                this.isfinish360 = true
                this.chat360List = []
                this.isShowTemplate360 = false
            }
            this.isFoulLanguage = false
            this.ordeAIList = []
            const renderer = new marked.Renderer();
            // 重写代码块渲染方法，使用highlight.js进行代码高亮
            renderer.code = (code, language) => {
                const validLanguage = hljs.getLanguage(language) ? language : 'plaintext';
                const highlightedCode = hljs.highlight(validLanguage, code).value;
                return `<pre><code class="hljs ${validLanguage}">${highlightedCode}</code></pre>`;
            };
            // console.log(code)
            chatDetail(code).then(res => {
                if (res.code == 20000) {
                    let arr = res.data;
                    arr.forEach((item, index) => {
                        if (item.chat_type == 0) {
                            localStorage.setItem('session_code', code);
                            localStorage.setItem('chat_group_code', item.chat_group_code);
                            this.chatList.push({
                                ...item,
                                help: item.is_likes == 1 ? true : false,
                                stepOn: item.is_likes == 2 ? true : false,
                                markedContent: marked(item.content, { renderer }),
                                id: this.chatList.length,
                                timer: false
                            })
                            this.$store.dispatch('user/changeChatListLength', this.chatList.length)
                        } else if (item.chat_type == 1) {
                            localStorage.setItem('session_code1', code);
                            localStorage.setItem('chat_group_code1', item.chat_group_code);
                            this.chatVipList.push({
                                ...item,
                                help: item.is_likes == 1 ? true : false,
                                stepOn: item.is_likes == 2 ? true : false,
                                markedContent: marked(item.content, { renderer }),
                                id: this.chatVipList.length,
                                timer: false
                            })
                            this.$store.dispatch('user/changeChatListLength', this.chatVipList.length)
                        } else if (item.chat_type == 4) {
                            localStorage.setItem('session_code4', code);
                            localStorage.setItem('chat_group_code4', item.chat_group_code);
                            this.chatYiyanList.push({
                                ...item,
                                help: item.is_likes == 1 ? true : false,
                                stepOn: item.is_likes == 2 ? true : false,
                                markedContent: marked(item.content, { renderer }),
                                id: this.chatYiyanList.length,
                                timer: false
                            })
                            this.$store.dispatch('user/changeChatListLength', this.chatYiyanList.length)
                        } else if (item.chat_type == 5) {
                            localStorage.setItem('session_code5', code);
                            localStorage.setItem('chat_group_code5', item.chat_group_code);
                            this.chatXunfeiList.push({
                                ...item,
                                help: item.is_likes == 1 ? true : false,
                                stepOn: item.is_likes == 2 ? true : false,
                                markedContent: marked(item.content, { renderer }),
                                id: this.chatXunfeiList.length,
                                timer: false
                            })
                            this.$store.dispatch('user/changeChatListLength', this.chatXunfeiList.length)
                        } else if (item.chat_type == 7) {
                            localStorage.setItem('session_code7', code);
                            localStorage.setItem('chat_group_code7', item.chat_group_code);
                            this.chatClaudeList.push({
                                ...item,
                                help: item.is_likes == 1 ? true : false,
                                stepOn: item.is_likes == 2 ? true : false,
                                markedContent: marked(item.content, { renderer }),
                                id: this.chatClaudeList.length,
                                timer: false
                            })
                            this.$store.dispatch('user/changeChatListLength', this.chatClaudeList.length)
                        } else if (item.chat_type == 8) {
                            localStorage.setItem('session_code8', code);
                            localStorage.setItem('chat_group_code8', item.chat_group_code);
                            this.chatChatGLMList.push({
                                ...item,
                                help: item.is_likes == 1 ? true : false,
                                stepOn: item.is_likes == 2 ? true : false,
                                markedContent: marked(item.content, { renderer }),
                                id: this.chatChatGLMList.length,
                                timer: false
                            })
                            this.$store.dispatch('user/changeChatListLength', this.chatChatGLMList.length)
                        } else if (item.chat_type == 10) {
                            localStorage.setItem('session_code10', code);
                            localStorage.setItem('chat_group_code10', item.chat_group_code);
                            this.chatTongyiList.push({
                                ...item,
                                help: item.is_likes == 1 ? true : false,
                                stepOn: item.is_likes == 2 ? true : false,
                                markedContent: marked(item.content, { renderer }),
                                id: this.chatTongyiList.length,
                                timer: false
                            })
                            this.$store.dispatch('user/changeChatListLength', this.chatTongyiList.length)
                        } else if (item.chat_type == 11) {
                            localStorage.setItem('session_code11', code);
                            localStorage.setItem('chat_group_code11', item.chat_group_code);
                            this.chatShangtangList.push({
                                ...item,
                                help: item.is_likes == 1 ? true : false,
                                stepOn: item.is_likes == 2 ? true : false,
                                markedContent: marked(item.content, { renderer }),
                                id: this.chatShangtangList.length,
                                timer: false
                            })
                            this.$store.dispatch('user/changeChatListLength', this.chat360List.length)
                        } else if (item.chat_type == 12) {
                            localStorage.setItem('session_code12', code);
                            localStorage.setItem('chat_group_code12', item.chat_group_code);
                            this.chat360List.push({
                                ...item,
                                help: item.is_likes == 1 ? true : false,
                                stepOn: item.is_likes == 2 ? true : false,
                                markedContent: marked(item.content, { renderer }),
                                id: this.chat360List.length,
                                timer: false
                            })
                            this.$store.dispatch('user/changeChatListLength', this.chat360List.length)
                        }
                    })
                    this.$nextTick(() => {
                        let pres = document.getElementsByTagName('pre')
                        for (let a = 0; a < pres.length; a++) {
                            let spans = document.createElement('span')
                            spans.setAttribute('class', 'copy-code-button')
                            spans.addEventListener('click', (event) => {
                                var input = document.createElement("textarea"); // 创建input对象
                                input.value = event.target.previousElementSibling.innerText; // 设置复制内容
                                document.body.appendChild(input); // 添加临时实例
                                input.select(); // 选择实例内容
                                document.execCommand("Copy"); // 执行复制
                                document.body.removeChild(input); // 删除临时实例
                                this.$message.success('复制成功！');
                            })
                            spans.setAttribute('click', 'copyCodeButton')
                            pres[a].appendChild(spans)
                        }
                    })
                    this.isShow = true;
                    this.isScrollTop = false
                    this.toBottom(false);
                } else {
                    this.$message.error(res.msg)
                }
            }).catch(err => {
                this.$message.error('获取会话失败！')
            })
        },

        // 优化回答
        optimizeAnswers(item, index) {
            if (this.chat_type == 0) {
                if (!this.isfinishThreeFive) {
                    this.$message('当前问题还没回答完毕，请稍后再提问');
                    return
                }
            } else if (this.chat_type == 1) {
                if (!this.isfinishFourZero) {
                    this.$message('当前问题还没回答完毕，请稍后再提问');
                    return
                }
            } else if (this.chat_type == 4) {
                if (!this.isfinishYiyan) {
                    this.$message('当前问题还没回答完毕，请稍后再提问');
                    return
                }
            } else if (this.chat_type == 5) {
                if (!this.isfinishXunfei) {
                    this.$message('当前问题还没回答完毕，请稍后再提问');
                    return
                }
            } else if (this.chat_type == 7) {
                if (!this.isfinishClaude) {
                    this.$message('当前问题还没回答完毕，请稍后再提问');
                    return
                }
            } else if (this.chat_type == 8) {
                if (!this.isfinishChatGLM) {
                    this.$message('当前问题还没回答完毕，请稍后再提问');
                    return
                }
            } else if (this.chat_type == 10) {
                if (!this.isfinishTongyi) {
                    this.$message('当前问题还没回答完毕，请稍后再提问');
                    return
                }
            } else if (this.chat_type == 11) {
                if (!this.isfinishShangtang) {
                    this.$message('当前问题还没回答完毕，请稍后再提问');
                    return
                }
            } else if (this.chat_type == 12) {
                if (!this.isfinish360) {
                    this.$message('当前问题还没回答完毕，请稍后再提问');
                    return
                }
            }
            this.supplyVisible = true
            this.chatItem = { ...item, chatIndex: index }
            this.supplyValue = ''
            // if (this.chat_type == 0) {
            //     this.replyThreeFive = item.content
            // } else if (this.chat_type == 1) {
            //     this.replyFourZero = item.content
            // } else if (this.chat_type == 4) {
            //     this.replyYiyan = item.content
            // } else if (this.chat_type == 5) {
            //     this.replyXunfei = item.content
            // } else if (this.chat_type == 7) {
            //     this.replyClaude = item.content
            // } else if (this.chat_type == 8) {
            //     this.replyChatGLM = item.content
            // } else if (this.chat_type == 10) {
            //     this.replyTongyi = item.content
            // } else if (this.chat_type == 11) {
            //     this.replyShangtang = item.content
            // }
        },

        // 开启新会话
        resetNewChat(aiId) {
            if (aiId == 0) {
                if (this.chatList.length == 0) return
                this.chatList = []
                this.isShowTemplateThreeFive = true
                this.$store.dispatch('user/changeChatListLength', 0)
                localStorage.setItem('session_code', '')
                localStorage.setItem('chat_group_code', '')
            } else if (aiId == 1) {
                if (this.chatVipList.length == 0) return
                this.chatVipList = []
                this.isShowTemplateFourZero = true
                this.$store.dispatch('user/changeChatListLength', 0)
                localStorage.setItem('session_code1', '')
                localStorage.setItem('chat_group_code1', '')
            } else if (aiId == 4) {
                if (this.chatYiyanList.length == 0) return
                this.chatYiyanList = []
                this.isShowTemplateYiyan = true
                this.$store.dispatch('user/changeChatListLength', 0)
                localStorage.setItem('session_code4', '')
                localStorage.setItem('chat_group_code4', '')
            } else if (aiId == 5) {
                if (this.chatXunfeiList.length == 0) return
                this.chatXunfeiList = []
                this.isShowTemplateXunfei = true
                this.$store.dispatch('user/changeChatListLength', 0)
                localStorage.setItem('session_code5', '')
                localStorage.setItem('chat_group_code5', '')
            } else if (aiId == 7) {
                if (this.chatClaudeList.length == 0) return
                this.chatClaudeList = []
                this.isShowTemplateClaude = true
                this.$store.dispatch('user/changeChatListLength', 0)
                localStorage.setItem('session_code7', '')
                localStorage.setItem('chat_group_code7', '')
            } else if (aiId == 8) {
                if (this.chatChatGLMList.length == 0) return
                this.chatChatGLMList = []
                this.isShowTemplateChatGLM = true
                this.$store.dispatch('user/changeChatListLength', 0)
                localStorage.setItem('session_code8', '')
                localStorage.setItem('chat_group_code8', '')
            } else if (aiId == 10) {
                if (this.chatTongyiList.length == 0) return
                this.chatTongyiList = []
                this.isShowTemplateTongyi = true
                this.$store.dispatch('user/changeChatListLength', 0)
                localStorage.setItem('session_code10', '')
                localStorage.setItem('chat_group_code11', '')
            } else if (aiId == 11) {
                if (this.chatShangtangList.length == 0) return
                this.chatShangtangList = []
                this.isShowTemplateShangtang = true
                this.$store.dispatch('user/changeChatListLength', 0)
                localStorage.setItem('session_code11', '')
                localStorage.setItem('chat_group_code11', '')
            } else if (aiId == 12) {
                if (this.chatShangtangList.length == 0) return
                this.chatShangtangList = []
                this.isShowTemplateShangtang = true
                this.$store.dispatch('user/changeChatListLength', 0)
                localStorage.setItem('session_code12', '')
                localStorage.setItem('chat_group_code12', '')
            }
            this.isuser = true
            this.endController('', false) // 终止回答
            this.randomStr = Math.random()
            this.isShowChecked = false
            this.isShowassociation = false
            this.isClickChat = false
            this.msgCode = ''
            if (aiId == 0) {
                this.isTimeThreeFive = false;
            } else if (aiId == 1) {
                this.isTimeFourZero = false;
            } else if (aiId == 4) {
                this.isTimeYiyan = false;
            } else if (aiId == 5) {
                this.isTimeXunfei = false;
            } else if (aiId == 7) {
                this.isTimeClaude = false;
            } else if (aiId == 8) {
                this.isTimeChatGLM = false;
            } else if (aiId == 10) {
                this.isTimeTongyi = false;
            } else if (aiId == 11) {
                this.isTimeShangtang = false;
            }
            this.sendValue = ''
        },

        resetQuest(item) {
            if (this.chat_type == 0) {
                if (!this.isfinishThreeFive) {
                    this.$message('当前问题还没回答完毕，请稍后再提问');
                    return
                }
            } else if (this.chat_type == 1) {
                if (!this.isfinishFourZero) {
                    this.$message('当前问题还没回答完毕，请稍后再提问');
                    return
                }
            } else if (this.chat_type == 4) {
                if (!this.isfinishYiyan) {
                    this.$message('当前问题还没回答完毕，请稍后再提问');
                    return
                }
            } else if (this.chat_type == 5) {
                if (!this.isfinishXunfei) {
                    this.$message('当前问题还没回答完毕，请稍后再提问');
                    return
                }
            } else if (this.chat_type == 7) {
                if (!this.isfinishClaude) {
                    this.$message('当前问题还没回答完毕，请稍后再提问');
                    return
                }
            } else if (this.chat_type == 8) {
                if (!this.isfinishChatGLM) {
                    this.$message('当前问题还没回答完毕，请稍后再提问');
                    return
                }
            } else if (this.chat_type == 10) {
                if (!this.isfinishTongyi) {
                    this.$message('当前问题还没回答完毕，请稍后再提问');
                    return
                }
            } else if (this.chat_type == 11) {
                if (!this.isfinishShangtang) {
                    this.$message('当前问题还没回答完毕，请稍后再提问');
                    return
                }
            } else if (this.chat_type == 12) {
                if (!this.isfinish360) {
                    this.$message('当前问题还没回答完毕，请稍后再提问');
                    return
                }
            }
            this.sendValue = item.content
            this.endController('', false)
            this.vipSend('reset')
        },

        //发送信息
        sendMsg(bool = '') {
            this.loginInfo = JSON.parse(localStorage.getItem('userInfo'));
            this.chatContScroll = ''
            // 重新回答
            // if (bool != '' && bool != 'toChatFouty') {
            //     this.sendValue = this.oldSendValue
            // }

            if (this.sendValue == '' || this.sendValue.replace(/\s*/g, '') == '') {
                this.$message({
                    type: 'error',
                    message: '请输入您要发送内容'
                })
                return false;
            }
            // 判断输入的文字和选中上下文的文字是否超过限制
            let msgList = ''
            this.ordeAIList.forEach(v => {
                msgList += v.content
            })
            msgList += this.sendValue;
            this.isuser = true;
            if (Number(this.association) != 1) {
                // if (this.chat_type == 0) {
                //     if (msgList.length >= '2001') {
                //         this.$message.error('文字不得超过2000字')
                //         return
                //     }
                // } else {
                //     if (msgList.length >= '2001') {
                //         this.$message.error('文字不得超过2000字')
                //         return
                //     }
                // }
            }
            this.vipSend(bool)
        },

        // 4.0信息发送
        async vipSend(bool = '') {
            // 重试/优化/重新提问等不需要关联上下文
            if (bool != 'true' && bool != 'reset' && bool != 'toChatFouty') {
                if (this.chat_type == 0) {
                    // 是否显示关联上下文
                    if (!this.isShowassociation && this.chatList.length != 0) {
                        this.isShowassociation = !this.isShowassociation
                        return
                    }
                    // 关联上下文的多选，此处仅用作展示
                    this.chatList.forEach(v => {
                        v.checked = false
                    })
                } else if (this.chat_type == 1) {
                    if (!this.isShowassociation && this.chatVipList.length != 0) {
                        this.isShowassociation = !this.isShowassociation
                        return
                    }
                    this.chatVipList.forEach(v => {
                        v.checked = false
                    })
                } else if (this.chat_type == 4) {
                    if (!this.isShowassociation && this.chatYiyanList.length != 0) {
                        this.isShowassociation = !this.isShowassociation
                        return
                    }
                    this.chatYiyanList.forEach(v => {
                        v.checked = false
                    })
                } else if (this.chat_type == 5) {
                    if (!this.isShowassociation && this.chatXunfeiList.length != 0) {
                        this.isShowassociation = !this.isShowassociation
                        return
                    }
                    this.chatXunfeiList.forEach(v => {
                        v.checked = false
                    })
                } else if (this.chat_type == 7) {
                    if (!this.isShowassociation && this.chatClaudeList.length != 0) {
                        this.isShowassociation = !this.isShowassociation
                        return
                    }
                    this.chatClaudeList.forEach(v => {
                        v.checked = false
                    })
                } else if (this.chat_type == 8) {
                    if (!this.isShowassociation && this.chatChatGLMList.length != 0) {
                        this.isShowassociation = !this.isShowassociation
                        return
                    }
                    this.chatChatGLMList.forEach(v => {
                        v.checked = false
                    })
                } else if (this.chat_type == 10) {
                    if (!this.isShowassociation && this.chatTongyiList.length != 0) {
                        this.isShowassociation = !this.isShowassociation
                        return
                    }
                    this.chatTongyiList.forEach(v => {
                        v.checked = false
                    })
                } else if (this.chat_type == 11) {
                    if (!this.isShowassociation && this.chatShangtangList.length != 0) {
                        this.isShowassociation = !this.isShowassociation
                        return
                    }
                    this.chatShangtangList.forEach(v => {
                        v.checked = false
                    })
                } else if (this.chat_type == 12) {
                    if (!this.isShowassociation && this.chat360List.length != 0) {
                        this.isShowassociation = !this.isShowassociation
                        return
                    }
                    this.chat360List.forEach(v => {
                        v.checked = false
                    })
                }
            }
            this.isFoulLanguage = false
            this.isShowassociation = false
            this.isShowChecked = false
            this.supplyVisible = false

            this.isShow = true;  // 快速提问
            if (this.chat_type == 0) {
                this.isDetailThreeFive = false;
                this.isfinishThreeFive = false; // 完成打字效果
                this.isBtnThreeFive = false;  // 是否允许重发
                this.replyThreeFive = ''
                this.isShowTemplateThreeFive = false // 关闭热词
            } else if (this.chat_type == 1) {
                this.isBtnFourZero = false;  // 是否允许重发
                this.isDetailFourZero = false;
                this.isfinishFourZero = false; // 完成打字效果
                this.replyFourZero = ''
                this.isShowTemplateFourZero = false // 关闭热词
            } else if (this.chat_type == 4) {
                this.isBtnYiyan = false;  // 是否允许重发
                this.isDetailYiyan = false;
                this.isfinishYiyan = false; // 完成打字效果
                this.replyYiyan = ''
                this.isShowTemplateYiyan = false // 关闭热词
            } else if (this.chat_type == 5) {
                this.isBtnXunfei = false;  // 是否允许重发
                this.isDetailXunfei = false;
                this.isfinishXunfei = false; // 完成打字效果
                this.replyXunfei = ''
                this.isShowTemplateXunfei = false // 关闭热词
            } else if (this.chat_type == 7) {
                this.isBtnClaude = false;  // 是否允许重发
                this.isDetailClaude = false;
                this.isfinishClaude = false; // 完成打字效果
                this.replyClaude = ''
                this.isShowTemplateClaude = false // 关闭热词
            } else if (this.chat_type == 8) {
                this.isBtnChatGLM = false;  // 是否允许重发
                this.isDetailChatGLM = false;
                this.isfinishChatGLM = false; // 完成打字效果
                this.replyChatGLM = ''
                this.isShowTemplateChatGLM = false // 关闭热词
            } else if (this.chat_type == 10) {
                this.isBtnTongyi = false;  // 是否允许重发
                this.isDetailTongyi = false;
                this.isfinishTongyi = false; // 完成打字效果
                this.replyTongyi = ''
                this.isShowTemplateTongyi = false // 关闭热词
            } else if (this.chat_type == 11) {
                this.isBtnShangtang = false;  // 是否允许重发
                this.isDetailShangtang = false;
                this.isfinishShangtang = false; // 完成打字效果
                this.replyShangtang = ''
                this.isShowTemplateShangtang = false // 关闭热词
            } else if (this.chat_type == 12) {
                this.isBtn360 = false;  // 是否允许重发
                this.isDetail360 = false;
                this.isfinish360 = false; // 完成打字效果
                this.reply360 = ''
                this.isShowTemplate360 = false // 关闭热词
            }

            //月份是从0月开始获取的，所以要+1;
            let month = new Date().getMonth() + 1;
            //日
            let day = new Date().getDate();
            //时
            let hour = new Date().getHours();
            //分
            let minute = new Date().getMinutes();
            //秒
            let second = new Date().getSeconds();
            if (month < 10) { month = '0' + month }
            if (day < 10) { day = '0' + day }
            if (hour < 10) { hour = '0' + hour }
            if (minute < 10) { minute = '0' + minute }
            if (second < 10) { second = '0' + second }

            let date = month + '/' + day + ' ' + hour + '-' + minute + '-' + second;

            let sendVal = {  // 询问者问题展示
                "create_time": date,
                "finish_reason": "length",
                "session_code": '',
                "chat_group_code": '',
                "role": "user",
                "images": [this.chatImageFile],
                "content": this.sendValue, // 预留，对话内容的转换
                "markedContent": marked(this.sendValue),
                checked: false,
                help: false, // 点赞
                stepOn: false, // 点踩
                timer: false,
            }

            // 获取当前会话列表的长度，用作右侧侧边栏的选中状态
            if (this.chat_type == 0) {
                this.chatList.push({ ...sendVal, id: this.chatList.length }); // id：用于关联上下文时的排序，防止顺序错乱导致接口返回的信息错误
                this.$store.dispatch('user/changeChatListLength', this.chatList.length)
            } else if (this.chat_type == 1) {
                this.chatVipList.push({ ...sendVal, id: this.chatVipList.length }); // id：用于关联上下文时的排序，防止顺序错乱导致接口返回的信息错误
                this.$store.dispatch('user/changeChatListLength', this.chatVipList.length)
            } else if (this.chat_type == 4) {
                this.chatYiyanList.push({ ...sendVal, id: this.chatYiyanList.length }); // id：用于关联上下文时的排序，防止顺序错乱导致接口返回的信息错误
                this.$store.dispatch('user/changeChatListLength', this.chatYiyanList.length)
            } else if (this.chat_type == 5) {
                this.chatXunfeiList.push({ ...sendVal, id: this.chatXunfeiList.length }); // id：用于关联上下文时的排序，防止顺序错乱导致接口返回的信息错误
                this.$store.dispatch('user/changeChatListLength', this.chatXunfeiList.length)
            } else if (this.chat_type == 7) {
                this.chatClaudeList.push({ ...sendVal, id: this.chatClaudeList.length }); // id：用于关联上下文时的排序，防止顺序错乱导致接口返回的信息错误
                this.$store.dispatch('user/changeChatListLength', this.chatClaudeList.length)
            } else if (this.chat_type == 8) {
                this.chatChatGLMList.push({ ...sendVal, id: this.chatChatGLMList.length }); // id：用于关联上下文时的排序，防止顺序错乱导致接口返回的信息错误
                this.$store.dispatch('user/changeChatListLength', this.chatChatGLMList.length)
            } else if (this.chat_type == 10) {
                this.chatTongyiList.push({ ...sendVal, id: this.chatTongyiList.length }); // id：用于关联上下文时的排序，防止顺序错乱导致接口返回的信息错误
                this.$store.dispatch('user/changeChatListLength', this.chatTongyiList.length)
            } else if (this.chat_type == 11) {
                this.chatShangtangList.push({ ...sendVal, id: this.chatShangtangList.length }); // id：用于关联上下文时的排序，防止顺序错乱导致接口返回的信息错误
                this.$store.dispatch('user/changeChatListLength', this.chatShangtangList.length)
            } else if (this.chat_type == 12) {
                this.chat360List.push({ ...sendVal, id: this.chat360List.length }); // id：用于关联上下文时的排序，防止顺序错乱导致接口返回的信息错误
                this.$store.dispatch('user/changeChatListLength', this.chat360List.length)
            }

            this.toBottom();

            // this.isTime = true; // 思考中
            if (this.chat_type == 0) {
                this.isTimeThreeFive = true;
                this.replyThreeFive = ''
            } else if (this.chat_type == 1) {
                this.isTimeFourZero = true
                this.replyFourZero = ''
            } else if (this.chat_type == 4) {
                this.isTimeYiyan = true
                this.replyYiyan = ''
            } else if (this.chat_type == 5) {
                this.isTimeXunfei = true
                this.replyXunfei = ''
            } else if (this.chat_type == 7) {
                this.isTimeClaude = true
                this.replyClaude = ''
            } else if (this.chat_type == 8) {
                this.isTimeChatGLM = true
                this.replyChatGLM = ''
            } else if (this.chat_type == 10) {
                this.isTimeTongyi = true
                this.replyTongyi = ''
            } else if (this.chat_type == 11) {
                this.isTimeShangtang = true
                this.replyShangtang = ''
            } else if (this.chat_type == 12) {
                this.isTime360 = true
                this.reply360 = ''
            }
            if (bool != 'toChatFouty') {
                if (this.chat_type == 0) {
                    this.timerThreeFive = 0;
                    this.t_timeThreeFive = setInterval(() => {
                        this.timerThreeFive += 1;
                    }, 1000)
                } else if (this.chat_type == 1) {
                    this.timerFourZero = 0;
                    this.t_timeFourZero = setInterval(() => {
                        this.timerFourZero += 1;
                    }, 1000)
                } else if (this.chat_type == 4) {
                    this.timerYiyan = 0;
                    this.t_timeYiyan = setInterval(() => {
                        this.timerYiyan += 1;
                    }, 1000)
                } else if (this.chat_type == 5) {
                    this.timerXunfei = 0;
                    this.t_timeXunfei = setInterval(() => {
                        this.timerXunfei += 1;
                    }, 1000)
                } else if (this.chat_type == 7) {
                    this.timerClaude = 0;
                    this.t_timeClaude = setInterval(() => {
                        this.timerClaude += 1;
                    }, 1000)
                } else if (this.chat_type == 8) {
                    this.timerChatGLM = 0;
                    this.t_timeChatGLM = setInterval(() => {
                        this.timerChatGLM += 1;
                    }, 1000)
                } else if (this.chat_type == 10) {
                    this.timerTongyi = 0;
                    this.t_timeTongyi = setInterval(() => {
                        this.timerTongyi += 1;
                    }, 1000)
                } else if (this.chat_type == 11) {
                    this.timerShangtang = 0;
                    this.t_timeShangtang = setInterval(() => {
                        this.timerShangtang += 1;
                    }, 1000)
                } else if (this.chat_type == 12) {
                    this.timer360 = 0;
                    this.t_time360 = setInterval(() => {
                        this.timer360 += 1;
                    }, 1000)
                }
            }
            let val = null
            if (this.chat_type == 0) {
                val = {
                    "chat_type": this.chat_type,
                    "session_code": localStorage.getItem('session_code') || '',
                    "chat_group_code": "",
                    msg_list: JSON.stringify([{ role: 'user', content: this.sendValue, images: this.chatImageFile != '' ? [this.chatImageFile] : [] }])
                }
                // 重试
                if (bool == 'true') {
                    let dataes = []
                    this.chatList.forEach(v => {
                        if (v.chat_group_code == this.chatItem.chat_group_code) {
                            dataes.push({
                                role: v.role,
                                content: v.content
                            })
                        }
                    })
                    val.msg_list = JSON.stringify([
                        ...dataes,
                        {
                            role: 'user',
                            content: this.sendValue,
                            images: sessionStorage.getItem('chatImageFile') != '' ? [sessionStorage.getItem('chatImageFile')] : []
                        }])
                    val.chat_group_code = localStorage.getItem('chat_group_code')
                }
            } else if (this.chat_type == 1) {
                val = {
                    "chat_type": this.chat_type,
                    "session_code": localStorage.getItem('session_code1') || '',
                    "chat_group_code": "",
                    msg_list: JSON.stringify([{ role: 'user', content: this.sendValue, images: this.chatImageFile != '' ? [this.chatImageFile] : [] }])
                }
                // 重试
                if (bool == 'true') {
                    let dataes = []
                    this.chatVipList.forEach(v => {
                        if (v.chat_group_code == this.chatItem.chat_group_code) {
                            dataes.push({
                                role: v.role,
                                content: v.content
                            })
                        }
                    })
                    val.msg_list = JSON.stringify([
                        ...dataes,
                        {
                            role: 'user',
                            content: this.sendValue,
                            images: sessionStorage.getItem('chatImageFile') != '' ? [sessionStorage.getItem('chatImageFile')] : []
                        }
                    ])
                    val.chat_group_code = localStorage.getItem('chat_group_code1')
                }
            } else if (this.chat_type == 4) {
                val = {
                    "chat_type": this.chat_type,
                    "session_code": localStorage.getItem('session_code4') || '',
                    "chat_group_code": "",
                    msg_list: JSON.stringify([{ role: 'user', content: this.sendValue, images: this.chatImageFile != '' ? [this.chatImageFile] : [] }])
                }
                // 重试
                if (bool == 'true') {
                    let dataes = []
                    this.chatYiyanList.forEach(v => {
                        if (v.chat_group_code == this.chatItem.chat_group_code) {
                            dataes.push({
                                role: v.role,
                                content: v.content
                            })
                        }
                    })
                    val.msg_list = JSON.stringify([
                        ...dataes,
                        {
                            role: 'user',
                            content: this.sendValue,
                            images: sessionStorage.getItem('chatImageFile') != '' ? [sessionStorage.getItem('chatImageFile')] : []
                        }
                    ])
                    val.chat_group_code = localStorage.getItem('chat_group_code4')
                }
            } else if (this.chat_type == 5) {
                val = {
                    "chat_type": this.chat_type,
                    "session_code": localStorage.getItem('session_code5') || '',
                    "chat_group_code": "",
                    msg_list: JSON.stringify([{ role: 'user', content: this.sendValue, images: this.chatImageFile != '' ? [this.chatImageFile] : [] }])
                }
                // 重试
                if (bool == 'true') {
                    let dataes = []
                    this.chatXunfeiList.forEach(v => {
                        if (v.chat_group_code == this.chatItem.chat_group_code) {
                            dataes.push({
                                role: v.role,
                                content: v.content
                            })
                        }
                    })
                    val.msg_list = JSON.stringify([
                        ...dataes,
                        {
                            role: 'user',
                            content: this.sendValue,
                            images: sessionStorage.getItem('chatImageFile') != '' ? [sessionStorage.getItem('chatImageFile')] : []
                        }
                    ])
                    val.chat_group_code = localStorage.getItem('chat_group_code5')
                }
            } else if (this.chat_type == 7) {
                val = {
                    "chat_type": this.chat_type,
                    "session_code": localStorage.getItem('session_code7') || '',
                    "chat_group_code": "",
                    msg_list: JSON.stringify([{ role: 'user', content: this.sendValue, images: this.chatImageFile != '' ? [this.chatImageFile] : [] }])
                }
                // 重试
                if (bool == 'true') {
                    let dataes = []
                    this.chatClaudeList.forEach(v => {
                        if (v.chat_group_code == this.chatItem.chat_group_code) {
                            dataes.push({
                                role: v.role,
                                content: v.content
                            })
                        }
                    })
                    val.msg_list = JSON.stringify([
                        ...dataes,
                        {
                            role: 'user',
                            content: this.sendValue,
                            images: sessionStorage.getItem('chatImageFile') != '' ? [sessionStorage.getItem('chatImageFile')] : []
                        }
                    ])
                    val.chat_group_code = localStorage.getItem('chat_group_code7')
                }
            } else if (this.chat_type == 8) {
                val = {
                    "chat_type": this.chat_type,
                    "session_code": localStorage.getItem('session_code8') || '',
                    "chat_group_code": "",
                    msg_list: JSON.stringify([{ role: 'user', content: this.sendValue, images: this.chatImageFile != '' ? [this.chatImageFile] : [] }]),
                    'model': 'chatglm_pro'
                }
                // 重试
                if (bool == 'true') {
                    let dataes = []
                    this.chatChatGLMList.forEach(v => {
                        if (v.chat_group_code == this.chatItem.chat_group_code) {
                            dataes.push({
                                role: v.role,
                                content: v.content
                            })
                        }
                    })
                    val.msg_list = JSON.stringify([
                        // ...dataes,
                        {
                            role: 'user',
                            content: this.sendValue,
                            images: sessionStorage.getItem('chatImageFile') != '' ? [sessionStorage.getItem('chatImageFile')] : []
                        }
                    ])
                    val.chat_group_code = localStorage.getItem('chat_group_code8')
                }
            } else if (this.chat_type == 10) {
                val = {
                    "chat_type": this.chat_type,
                    "session_code": localStorage.getItem('session_code10') || '',
                    "chat_group_code": "",
                    msg_list: JSON.stringify([{ role: 'user', content: this.sendValue, images: this.chatImageFile != '' ? [this.chatImageFile] : [] }]),
                    'model': 'qwen-v1'
                }
                // 重试
                if (bool == 'true') {
                    let dataes = []
                    this.chatTongyiList.forEach(v => {
                        if (v.chat_group_code == this.chatItem.chat_group_code) {
                            dataes.push({
                                role: v.role,
                                content: v.content
                            })
                        }
                    })
                    val.msg_list = JSON.stringify([
                        ...dataes,
                        {
                            role: 'user',
                            content: this.sendValue,
                            images: sessionStorage.getItem('chatImageFile') != '' ? [sessionStorage.getItem('chatImageFile')] : []
                        }
                    ])
                    val.chat_group_code = localStorage.getItem('chat_group_code10')
                }
            } else if (this.chat_type == 11) {
                val = {
                    "chat_type": this.chat_type,
                    "session_code": localStorage.getItem('session_code11') || '',
                    "chat_group_code": "",
                    msg_list: JSON.stringify([{ role: 'user', content: this.sendValue, images: this.chatImageFile != '' ? [this.chatImageFile] : [] }]),
                    'model': 'nova-ptc-xs-v1'
                }
                // 重试
                if (bool == 'true') {
                    let dataes = []
                    this.chatShangtangList.forEach(v => {
                        if (v.chat_group_code == this.chatItem.chat_group_code) {
                            dataes.push({
                                role: v.role,
                                content: v.content
                            })
                        }
                    })
                    val.msg_list = JSON.stringify([
                        ...dataes,
                        {
                            role: 'user',
                            content: this.sendValue,
                            images: sessionStorage.getItem('chatImageFile') != '' ? [sessionStorage.getItem('chatImageFile')] : []
                        }
                    ])
                    val.chat_group_code = localStorage.getItem('chat_group_code11')
                }
            } else if (this.chat_type == 12) {
                val = {
                    "chat_type": this.chat_type,
                    "session_code": localStorage.getItem('session_code12') || '',
                    "chat_group_code": "",
                    msg_list: JSON.stringify([{ role: 'user', content: this.sendValue, images: this.chatImageFile != '' ? [this.chatImageFile] : [] }]),
                    'model': 'nova-ptc-xs-v1'
                }
                // 重试
                if (bool == 'true') {
                    let dataes = []
                    this.chat360List.forEach(v => {
                        if (v.chat_group_code == this.chatItem.chat_group_code) {
                            dataes.push({
                                role: v.role,
                                content: v.content
                            })
                        }
                    })
                    val.msg_list = JSON.stringify([
                        ...dataes,
                        {
                            role: 'user',
                            content: this.sendValue,
                            images: sessionStorage.getItem('chatImageFile') != '' ? [sessionStorage.getItem('chatImageFile')] : []
                        }
                    ])
                    val.chat_group_code = localStorage.getItem('chat_group_code11')
                }
            }

            // 关联上下文时，拿到对应的值然后清空对应的数据
            if (Number(this.association) == 1) {
                // this.ordeAIList.sort((a, b) => {
                //     return a.id - b.id
                // })
                // let contemt = []
                // this.ordeAIList.forEach(v => {
                //     contemt.push ({
                //         role: v.role,
                //         content: v.content
                //     })
                // })

                if (this.chat_type == 0) {
                    let historyList = []
                    this.chatList.forEach((v, i) => {
                        if (i != this.chatList.length - 1) {
                            historyList.push({
                                role: v.role,
                                content: v.content
                            })
                        }
                    })
                    val = {
                        'chat_type': this.chat_type,
                        'session_code': localStorage.getItem('session_code') || '',
                        'chat_group_code': "",
                        'msg_list': JSON.stringify([...historyList, { role: 'user', content: this.sendValue, images: this.chatImageFile != '' ? [this.chatImageFile] : [] }])
                    }
                } else if (this.chat_type == 1) {
                    let historyList = []
                    this.chatVipList.forEach((v, i) => {
                        if (i != this.chatVipList.length - 1) {
                            historyList.push({
                                role: v.role,
                                content: v.content
                            })
                        }
                    })
                    val = {
                        'chat_type': this.chat_type,
                        'session_code': localStorage.getItem('session_code1') || '',
                        'chat_group_code': "",
                        'msg_list': JSON.stringify([...historyList, { role: 'user', content: this.sendValue, images: this.chatImageFile != '' ? [this.chatImageFile] : [] }])
                    }
                } else if (this.chat_type == 4) {
                    let historyList = []
                    this.chatYiyanList.forEach((v, i) => {
                        if (i != this.chatYiyanList.length - 1) {
                            historyList.push({
                                role: v.role,
                                content: v.content
                            })
                        }
                    })
                    val = {
                        'chat_type': this.chat_type,
                        'session_code': localStorage.getItem('session_code4') || '',
                        'chat_group_code': "",
                        'msg_list': JSON.stringify([...historyList, { role: 'user', content: this.sendValue, images: this.chatImageFile != '' ? [this.chatImageFile] : [] }])
                    }
                } else if (this.chat_type == 5) {
                    let historyList = []
                    this.chatXunfeiList.forEach((v, i) => {
                        if (i != this.chatXunfeiList.length - 1) {
                            historyList.push({
                                role: v.role,
                                content: v.content
                            })
                        }
                    })
                    val = {
                        'chat_type': this.chat_type,
                        'session_code': localStorage.getItem('session_code5') || '',
                        'chat_group_code': "",
                        'msg_list': JSON.stringify([...historyList, { role: 'user', content: this.sendValue, images: this.chatImageFile != '' ? [this.chatImageFile] : [] }])
                    }
                } else if (this.chat_type == 7) {
                    let historyList = []
                    this.chatClaudeList.forEach((v, i) => {
                        if (i != this.chatClaudeList.length - 1) {
                            historyList.push({
                                role: v.role,
                                content: v.content
                            })
                        }
                    })
                    val = {
                        'chat_type': this.chat_type,
                        'session_code': localStorage.getItem('session_code7') || '',
                        'chat_group_code': "",
                        'msg_list': JSON.stringify([...historyList, { role: 'user', content: this.sendValue, images: this.chatImageFile != '' ? [this.chatImageFile] : [] }]),
                    }
                } else if (this.chat_type == 8) {
                    let historyList = []
                    this.chatChatGLMList.forEach((v, i) => {
                        if (i != this.chatChatGLMList.length - 1) {
                            historyList.push({
                                role: v.role,
                                content: v.content
                            })
                        }
                    })
                    val = {
                        'chat_type': this.chat_type,
                        'session_code': localStorage.getItem('session_code8') || '',
                        'chat_group_code': "",
                        'msg_list': JSON.stringify([...historyList, { role: 'user', content: this.sendValue, images: this.chatImageFile != '' ? [this.chatImageFile] : [] }]),
                        'model': 'chatglm_pro'
                    }
                } else if (this.chat_type == 10) {
                    let historyList = []
                    this.chatTongyiList.forEach((v, i) => {
                        if (i != this.chatTongyiList.length - 1) {
                            historyList.push({
                                role: v.role,
                                content: v.content
                            })
                        }
                    })
                    val = {
                        'chat_type': this.chat_type,
                        'session_code': localStorage.getItem('session_code10') || '',
                        'chat_group_code': "",
                        'msg_list': JSON.stringify([...historyList, { role: 'user', content: this.sendValue, images: this.chatImageFile != '' ? [this.chatImageFile] : [] }]),
                        'model': 'qwen-v1'
                    }
                } else if (this.chat_type == 11) {
                    console.log("进入")
                    let historyList = []
                    this.chatShangtangList.forEach((v, i) => {
                        if (i != this.chatShangtangList.length - 1) {
                            historyList.push({
                                role: v.role,
                                content: v.content
                            })
                        }
                    })
                    val = {
                        'chat_type': this.chat_type,
                        'session_code': localStorage.getItem('session_code11') || '',
                        'chat_group_code': "",
                        'msg_list': JSON.stringify([...historyList, { role: 'user', content: this.sendValue, images: this.chatImageFile != '' ? [this.chatImageFile] : [] }]),
                        'model': 'nova-ptc-xs-v1'
                    }
                } else if (this.chat_type == 12) {
                    console.log("进入")
                    let historyList = []
                    this.chat360List.forEach((v, i) => {
                        if (i != this.chat360List.length - 1) {
                            historyList.push({
                                role: v.role,
                                content: v.content
                            })
                        }
                    })
                    val = {
                        'chat_type': this.chat_type,
                        'session_code': localStorage.getItem('session_code12') || '',
                        'chat_group_code': "",
                        'msg_list': JSON.stringify([...historyList, { role: 'user', content: this.sendValue, images: this.chatImageFile != '' ? [this.chatImageFile] : [] }]),
                        'model': 'nova-ptc-xs-v1'
                    }
                }
                this.ordeAIList = []
            }
            if (Number(this.association) == 2) {
                val.session_code = ''
            }

            this.association = ''

            if (this.chat_type == 0) {
                this.chatList.push({ //新构造一个对话内容
                    'session_code': '',
                    'create_time': '',
                    'chat_group_code': '',
                    'finish_reason': '',
                    'role': '',
                    'content': '',
                    'help': false, // 点赞
                    'stepOn': false, // 点踩
                    id: this.chatList.length,
                    timer: false
                });
            } else if (this.chat_type == 1) {
                this.chatVipList.push({ //新构造一个对话内容
                    'session_code': '',
                    'create_time': '',
                    'chat_group_code': '',
                    'finish_reason': '',
                    'role': '',
                    'content': '',
                    'help': false, // 点赞
                    'stepOn': false, // 点踩
                    id: this.chatVipList.length,
                    timer: false
                });
            } else if (this.chat_type == 4) {
                this.chatYiyanList.push({ //新构造一个对话内容
                    'session_code': '',
                    'create_time': '',
                    'chat_group_code': '',
                    'finish_reason': '',
                    'role': '',
                    'content': '',
                    'help': false, // 点赞
                    'stepOn': false, // 点踩
                    id: this.chatYiyanList.length,
                    timer: false
                });
            } else if (this.chat_type == 5) {
                this.chatXunfeiList.push({ //新构造一个对话内容
                    'session_code': '',
                    'create_time': '',
                    'chat_group_code': '',
                    'finish_reason': '',
                    'role': '',
                    'content': '',
                    'help': false, // 点赞
                    'stepOn': false, // 点踩
                    id: this.chatXunfeiList.length,
                    timer: false
                });
            } else if (this.chat_type == 7) {
                this.chatClaudeList.push({ //新构造一个对话内容
                    'session_code': '',
                    'create_time': '',
                    'chat_group_code': '',
                    'finish_reason': '',
                    'role': '',
                    'content': '',
                    'help': false, // 点赞
                    'stepOn': false, // 点踩
                    id: this.chatClaudeList.length,
                    timer: false
                });
            } else if (this.chat_type == 8) {
                this.chatChatGLMList.push({ //新构造一个对话内容
                    'session_code': '',
                    'create_time': '',
                    'chat_group_code': '',
                    'finish_reason': '',
                    'role': '',
                    'content': '',
                    'help': false, // 点赞
                    'stepOn': false, // 点踩
                    id: this.chatChatGLMList.length,
                    timer: false
                });
            } else if (this.chat_type == 10) {
                this.chatTongyiList.push({ //新构造一个对话内容
                    'session_code': '',
                    'create_time': '',
                    'chat_group_code': '',
                    'finish_reason': '',
                    'role': '',
                    'content': '',
                    'help': false, // 点赞
                    'stepOn': false, // 点踩
                    id: this.chatTongyiList.length,
                    timer: false
                });
            } else if (this.chat_type == 11) {
                this.chatShangtangList.push({ //新构造一个对话内容
                    'session_code': '',
                    'create_time': '',
                    'chat_group_code': '',
                    'finish_reason': '',
                    'role': '',
                    'content': '',
                    'help': false, // 点赞
                    'stepOn': false, // 点踩
                    id: this.chatShangtangList.length,
                    timer: false
                });
            } else if (this.chat_type == 12) {
                this.chat360List.push({ //新构造一个对话内容
                    'session_code': '',
                    'create_time': '',
                    'chat_group_code': '',
                    'finish_reason': '',
                    'role': '',
                    'content': '',
                    'help': false, // 点赞
                    'stepOn': false, // 点踩
                    id: this.chat360List.length,
                    timer: false
                });
            }
            if (bool == 'toChatFouty') {
                if (this.chat_type == 0) {
                    this.t_timeThreeFive = setInterval(() => {
                        this.timerThreeFive += 1;
                    }, 1000)
                } else if (this.chat_type == 1) {
                    this.t_timeFourZero = setInterval(() => {
                        this.timerFourZero += 1;
                    }, 1000)
                } else if (this.chat_type == 4) {
                    this.t_timeYiyan = setInterval(() => {
                        this.timerYiyan += 1;
                    }, 1000)
                } else if (this.chat_type == 5) {
                    this.t_timeXunfei = setInterval(() => {
                        this.timerXunfei += 1;
                    }, 1000)
                } else if (this.chat_type == 7) {
                    this.t_timeClaude = setInterval(() => {
                        this.timerClaude += 1;
                    }, 1000)
                } else if (this.chat_type == 8) {
                    this.t_timeChatGLM = setInterval(() => {
                        this.timerChatGLM += 1;
                    }, 1000)
                } else if (this.chat_type == 10) {
                    this.t_timeTongyi = setInterval(() => {
                        this.timerTongyi += 1;
                    }, 1000)
                } else if (this.chat_type == 11) {
                    this.t_timeShangtang = setInterval(() => {
                        this.timerShangtang += 1;
                    }, 1000)
                } else if (this.chat_type == 12) {
                    this.t_time360 = setInterval(() => {
                        this.timer360 += 1;
                    }, 1000)
                }
            }

            if (bool == 'true') {
                val.msg_code = this.msgCode
            }

            let userInfo = JSON.parse(localStorage.getItem("userInfo"));
            // 模板指令使用后要 +1
            if (this.promptsId != null) {
                promptsRecommend({ prompts_id: this.promptsId }).then(() => {
                    this.promptsId = null
                })
            }
            this.oldSendValue = this.sendValue
            this.isClickChat = false
            this.sendValue = ''
            this.isSahowUploadPicture = false
            sessionStorage.setItem('chatImageFile', this.chatImageFile)
            this.chatImageFile = ''

            let response = null
            let url = Number(this.chat_type) == 0 || Number(this.chat_type) == 1 ? 'api/chat/async_chat_session' : 'api/chat/async_chat_completion'
            // console.log(val,'请求参数')
            if (this.chat_type == 0) {
                this.controllerThreeFive = new AbortController();
                val.model = this.modelNum.value;  //传递子模型
                response = await fetch(httpUrls.httpUrl + url, {
                    method: "POST",
                    headers: {
                        "Content-Type": 'application/json',
                        'Accept': '*/*',
                        'authorization': userInfo.token,
                        'role': userInfo.role,
                        'source': 'pc'
                    },
                    body: JSON.stringify(val),
                    signal: this.controllerThreeFive.signal
                })
            } else if (this.chat_type == 1) {
                this.controllerFourZreo = new AbortController();
                val.model = this.modelNum.value;  //传递子模型
                response = await fetch(httpUrls.httpUrl + url, {
                    method: "POST",
                    headers: {
                        "Content-Type": 'application/json',
                        'Accept': '*/*',
                        'authorization': userInfo.token,
                        'role': userInfo.role,
                        'source': 'pc'
                    },
                    body: JSON.stringify(val),
                    signal: this.controllerFourZreo.signal
                })
            } else if (this.chat_type == 4) {
                this.controllerYiyan = new AbortController()
                val.model = this.modelNum.value;  //传递子模型
                response = await fetch(httpUrls.httpUrl + url, {
                    method: "POST",
                    headers: {
                        "Content-Type": 'application/json',
                        'Accept': '*/*',
                        'authorization': userInfo.token,
                        'role': userInfo.role,
                        'source': 'pc'
                    },
                    body: JSON.stringify(val),
                    signal: this.controllerYiyan.signal
                })
            } else if (this.chat_type == 5) {
                this.controllerXunfei = new AbortController();
                val.model = this.modelNum.value;  //传递子模型
                response = await fetch(httpUrls.httpUrl + url, {
                    method: "POST",
                    headers: {
                        "Content-Type": 'application/json',
                        'Accept': '*/*',
                        'authorization': userInfo.token,
                        'role': userInfo.role,
                        'source': 'pc'
                    },
                    body: JSON.stringify(val),
                    signal: this.controllerXunfei.signal
                })
            } else if (this.chat_type == 7) {
                this.controllerClaude = new AbortController()
                val.model = this.modelNum.value;  //传递子模型
                response = await fetch(httpUrls.httpUrl + url, {
                    method: "POST",
                    headers: {
                        "Content-Type": 'application/json',
                        'Accept': '*/*',
                        'authorization': userInfo.token,
                        'role': userInfo.role,
                        'source': 'pc'
                    },
                    body: JSON.stringify(val),
                    signal: this.controllerClaude.signal
                })
            } else if (this.chat_type == 8) {
                this.controllerChatGLM = new AbortController();
                val.model = 'chatglm_turbo';  //传递子模型
                response = await fetch(httpUrls.httpUrl + url, {
                    method: "POST",
                    headers: {
                        "Content-Type": 'application/json',
                        'Accept': '*/*',
                        'authorization': userInfo.token,
                        'role': userInfo.role,
                        'source': 'pc'
                    },
                    body: JSON.stringify(val),
                    signal: this.controllerChatGLM.signal
                })
            } else if (this.chat_type == 10) {
                this.controllerTongyi = new AbortController();
                val.model = this.modelNum.value;  //传递子模型
                response = await fetch(httpUrls.httpUrl + url, {
                    method: "POST",
                    headers: {
                        "Content-Type": 'application/json',
                        'Accept': '*/*',
                        'authorization': userInfo.token,
                        'role': userInfo.role,
                        'source': 'pc'
                    },
                    body: JSON.stringify(val),
                    signal: this.controllerTongyi.signal
                })
            } else if (this.chat_type == 11) {
                this.controllerShangtang = new AbortController();
                val.model = this.modelNum.value;  //传递子模型
                response = await fetch(httpUrls.httpUrl + url, {
                    method: "POST",
                    headers: {
                        "Content-Type": 'application/json',
                        'Accept': '*/*',
                        'authorization': userInfo.token,
                        'role': userInfo.role,
                        'source': 'pc'
                    },
                    body: JSON.stringify(val),
                    signal: this.controllerShangtang.signal
                })
            } else if (this.chat_type == 12) {
                this.controller360 = new AbortController();
                // console.log(val)
                val.model = this.modelNum.value;  //传递子模型
                response = await fetch(httpUrls.httpUrl + url, {
                    method: "POST",
                    headers: {
                        "Content-Type": 'application/json',
                        'Accept': '*/*',
                        'authorization': userInfo.token,
                        'role': userInfo.role,
                        'source': 'pc'
                    },
                    body: JSON.stringify(val),
                    signal: this.controller360.signal
                })
            }
            this.ordeAIList = []

            if (Number(response.status) != 200) {
                response.json().then(res => {
                    this.codeHandleChange(res)
                })
                return
            }
            // console.log(response, "发送问题后返回数据")

            this.sendValue = '';// 清空发送栏内容
            const reader = response.body.getReader();

            this.association = ''

            while (true) {
                const { value, done } = await reader.read();
                if (done) {
                    break;
                }
                if (value) {
                    let stringStr = arr2str(value)
                    let chatArr = stringStr.split('\r\n');
                    // console.log(stringStr,'--stringStr ||', chatArr,'--chatArr ||' )
                    console.log(chatArr)
                    if (this.chat_type == 0) {
                        this.isDetailThreeFive = false
                    } else if (this.chat_type == 1) {
                        this.isDetailFourZero = false
                    } else if (this.chat_type == 4) {
                        this.isDetailYiyan = false
                    } else if (this.chat_type == 5) {
                        this.isDetailXunfei = false
                    } else if (this.chat_type == 7) {
                        this.isDetailClaude = false
                    } else if (this.chat_type == 8) {
                        this.isDetailChatGLM = false
                    } else if (this.chat_type == 10) {
                        this.isDetailTongyi = false
                    } else if (this.chat_type == 11) {
                        this.isDetailShangtang = false
                    } else if (this.chat_type == 12) {
                        this.isDetail360 = false
                    }
                    // 信息清空
                    chatArr.forEach((val,index) => {
                        // console.log(index,'循环次数')
                        if (val != '') {
                            let res = JSON.parse(val);
                            this.talkMsgList(res)
                            return;
                        }

                    })
                }
            }
        },

        sendMsg2() {
            if (!this.isShowassociation || this.association != '') {
                this.$message({
                    type: 'info',
                    message: '当前问题还没回答完毕，请稍后再提问！'
                })
            } else {
                this.$message({
                    type: 'info',
                    message: '请选择是否关联'
                })
            }
        },


        // 关联上下文的多选
        changeSendAnswer(item) {
            let a = 1
            for (let i = 0; i < this.ordeAIList.length; i++) {
                if (item.create_time == this.ordeAIList[i].create_time && item.content == this.ordeAIList[i].content) {
                    this.ordeAIList.splice(i, 1)
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
            this.$forceUpdate();//解决点击计数器失效问题
        },

        // 内容逐字显示，每个字显示间隔为0.1秒，并识别换行符
        showReply(content) {
            if (this.chat_type == 0) {
                this.isTimeThreeFive = false;
            } else if (this.chat_type == 1) {
                this.isTimeFourZero = false
            } else if (this.chat_type == 4) {
                this.isTimeYiyan = false
            } else if (this.chat_type == 5) {
                this.isTimeXunfei = false
            } else if (this.chat_type == 7) {
                this.isTimeClaude = false
            } else if (this.chat_type == 8) {
                this.isTimeChatGLM = false
            } else if (this.chat_type == 10) {
                this.isTimeTongyi = false
            } else if (this.chat_type == 11) {
                this.isTimeShangtang = false
            } else if (this.chat_type == 12) {
                this.isTime360 = false
            }
            let reply = content;
            let replyArr = reply.split('');
            let replyStr = '';
            let i = 0;
            let time = setInterval(() => {
                if (i < replyArr.length) {
                    // marked.parse, 预留，需删除下面的判断
                    if (replyArr[i] == '\n') {
                        replyStr += '\n'
                    } else {
                        replyStr += replyArr[i]
                    }
                    if (this.chat_type == 0) {
                        this.replyThreeFive = replyStr
                    } else if (this.chat_type == 1) {
                        this.replyFourZero = replyStr
                    } else if (this.chat_type == 4) {
                        this.replyYiyan = replyStr
                    } else if (this.chat_type == 5) {
                        this.replyXunfei = replyStr
                    } else if (this.chat_type == 7) {
                        this.replyClaude = replyStr
                    } else if (this.chat_type == 8) {
                        this.replyChatGLM = replyStr
                    } else if (this.chat_type == 10) {
                        this.replyTongyi = replyStr
                    } else if (this.chat_type == 11) {
                        this.replyShangtang = replyStr
                    } else if (this.chat_type == 12) {
                        this.reply360 = replyStr
                    }
                    // this.reply = replyStr
                    i++
                    // 定位到聊天最底部
                    this.toBottom();
                } else {
                    clearInterval(time)
                }
            }, 100)

            // 判断是否显示完毕
            setTimeout(() => {
                if (this.chat_type == 0) {
                    this.isfinishThreeFive = true; // 完成打字效果
                    this.isBtnThreeFive = true;
                    clearInterval(this.t_timeThreeFive);
                    this.t_timeThreeFive = null
                } else if (this.chat_type == 1) {
                    this.isBtnFourZero = true;
                    this.isfinishFourZero = true; // 完成打字效果
                    clearInterval(this.t_timeFourZero);
                    this.t_timeFourZero = null
                } else if (this.chat_type == 4) {
                    this.isBtnYiyan = true;
                    this.isfinishYiyan = true; // 完成打字效果
                    clearInterval(this.t_timeYiyan);
                    this.t_timeYiyan = null
                } else if (this.chat_type == 5) {
                    this.isBtnXunfei = true;
                    this.isfinishXunfei = true; // 完成打字效果
                    clearInterval(this.t_timeXunfei);
                    this.t_timeXunfei = null
                } else if (this.chat_type == 7) {
                    this.isBtnClaude = true;
                    this.isfinishClaude = true; // 完成打字效果
                    clearInterval(this.t_timeClaude);
                    this.t_timeClaude = null
                } else if (this.chat_type == 8) {
                    this.isBtnChatGLM = true;
                    this.isfinishChatGLM = true; // 完成打字效果
                    clearInterval(this.t_timeChatGLM);
                    this.t_timeChatGLM = null
                } else if (this.chat_type == 10) {
                    this.isBtnTongyi = true;
                    this.isfinishTongyi = true; // 完成打字效果
                    clearInterval(this.t_timeTongyi);
                    this.t_timeTongyi = null
                } else if (this.chat_type == 11) {
                    this.isBtnShangtang = true;
                    this.isfinishShangtang = true; // 完成打字效果
                    clearInterval(this.t_timeShangtang);
                    this.t_timeShangtang = null
                } else if (this.chat_type == 12) {
                    this.isBtn360 = true;
                    this.isfinish360 = true; // 完成打字效果
                    clearInterval(this.t_time360);
                    this.t_time360 = null
                }
            }, replyArr.length * 100)
        },

        toBottom(type = true) {
            // 定位到当前聊天地点
            this.$nextTick(() => {
                setTimeout(() => {
                    var scrollTop = document.getElementById("chatCont")
                    if (this.chatContScroll == '' || this.chatContScroll <= scrollTop.scrollTop) {
                        scrollTop.scrollTop = scrollTop.scrollHeight
                        this.chatContScroll = scrollTop.scrollTop
                    }
                }, 200)

            })
        },

        // 重新回答
        resetController() {
            if (this.chat_type == 0) {
                if (!this.isfinishThreeFive) {
                    this.$message('当前问题还没回答完毕，请稍后再提问')
                    return
                }
            } else if (this.chat_type == 1) {
                if (!this.isfinishFourZero) {
                    this.$message('当前问题还没回答完毕，请稍后再提问')
                    return
                }
            } else if (this.chat_type == 4) {
                if (!this.isfinishYiyan) {
                    this.$message('当前问题还没回答完毕，请稍后再提问')
                    return
                }
            } else if (this.chat_type == 5) {
                if (!this.isfinishXunfei) {
                    this.$message('当前问题还没回答完毕，请稍后再提问')
                    return
                }
            } else if (this.chat_type == 7) {
                if (!this.isfinishClaude) {
                    this.$message('当前问题还没回答完毕，请稍后再提问')
                    return
                }
            } else if (this.chat_type == 8) {
                if (!this.isfinishChatGLM) {
                    this.$message('当前问题还没回答完毕，请稍后再提问')
                    return
                }
            } else if (this.chat_type == 10) {
                if (!this.isfinishTongyi) {
                    this.$message('当前问题还没回答完毕，请稍后再提问')
                    return
                }
            } else if (this.chat_type == 11) {
                if (!this.isfinishShangtang) {
                    this.$message('当前问题还没回答完毕，请稍后再提问')
                    return
                }
            } else if (this.chat_type == 12) {
                if (!this.isfinish360) {
                    this.$message('当前问题还没回答完毕，请稍后再提问')
                    return
                }
            }

            if (this.chat_type == 0) {
                this.sendValue = this.chatList[this.chatList.length - 2].content
                // console.log(this.chatList[this.chatList.length - 2].content);
                this.chatList.splice(this.chatList.length - 2, 2)
            } else if (this.chat_type == 1) {
                this.sendValue = this.chatVipList[this.chatVipList.length - 2].content
                this.chatVipList.splice(this.chatVipList.length - 2, 2)
            } else if (this.chat_type == 4) {
                this.sendValue = this.chatYiyanList[this.chatYiyanList.length - 2].content
                this.chatYiyanList.splice(this.chatYiyanList.length - 2, 2)
            } else if (this.chat_type == 5) {
                this.sendValue = this.chatXunfeiList[this.chatXunfeiList.length - 2].content
                this.chatXunfeiList.splice(this.chatXunfeiList.length - 2, 2)
            } else if (this.chat_type == 7) {
                this.sendValue = this.chatClaudeList[this.chatClaudeList.length - 2].content
                this.chatClaudeList.splice(this.chatClaudeList.length - 2, 2)
            } else if (this.chat_type == 8) {
                this.sendValue = this.chatChatGLMList[this.chatChatGLMList.length - 2].content
                this.chatChatGLMList.splice(this.chatChatGLMList.length - 2, 2)
            } else if (this.chat_type == 10) {
                this.sendValue = this.chatTongyiList[this.chatTongyiList.length - 2].content
                this.chatTongyiList.splice(this.chatTongyiList.length - 2, 2)
            } else if (this.chat_type == 11) {
                this.sendValue = this.chatShangtangList[this.chatShangtangList.length - 2].content
                this.chatShangtangList.splice(this.chatShangtangList.length - 2, 2)
            } else if (this.chat_type == 12) {
                this.sendValue = this.chat360List[this.chat360List.length - 2].content
                this.chat360List.splice(this.chat360List.length - 2, 2)
            }
            this.endController('', false)
            this.sendMsg('true')
        },

        // 终止回答
        endController(code, resetChat = true) {
            if (Number(this.chat_type) == 0) {
                this.isfinishThreeFive = true
                this.isBtnThreeFive = true
                this.isTimeThreeFive = false
                try {
                    this.controllerThreeFive.abort()
                } catch (error) { }
                clearInterval(this.t_timeThreeFive);
            } else if (Number(this.chat_type) == 1) {
                this.isBtnFourZero = true
                this.isfinishFourZero = true
                this.isTimeFourZero = false
                try {
                    this.controllerFourZreo.abort()
                } catch (error) { }
                clearInterval(this.t_timeFourZero);
            } else if (Number(this.chat_type) == 4) {
                this.isBtnYiyan = true
                this.isfinishYiyan = true
                this.isTimeYiyan = false
                try {
                    this.controllerYiyan.abort()
                } catch (error) { }
                clearInterval(this.t_timeYiyan);
            } else if (Number(this.chat_type) == 5) {
                this.isBtnXunfei = true
                this.isfinishXunfei = true
                this.isTimeXunfei = false
                try {
                    this.controllerXunfei.abort()
                } catch (error) { }
                clearInterval(this.t_timeXunfei);
            } else if (Number(this.chat_type) == 7) {
                this.isBtnClaude = true
                this.isfinishClaude = true
                this.isTimeClaude = false
                try {
                    this.controllerClaude.abort()
                } catch (error) { }
                clearInterval(this.t_timeClaude);
            } else if (Number(this.chat_type) == 8) {
                this.isBtnChatGLM = true
                this.isfinishChatGLM = true
                this.isTimeChatGLM = false
                try {
                    this.controllerChatGLM.abort()
                } catch (error) { }
                clearInterval(this.t_timeChatGLM);
            } else if (Number(this.chat_type) == 10) {
                this.isBtnTongyi = true
                this.isfinishTongyi = true
                this.isTimeTongyi = false
                try {
                    this.controllerTongyi.abort()
                } catch (error) { }
                clearInterval(this.t_timeTongyi);
            } else if (Number(this.chat_type) == 11 || Number(this.chat_type) == 12) {
                this.isBtnShangtang = true
                this.isfinishShangtang = true
                this.isTimeShangtang = false
                try {
                    this.controllerShangtang.abort()
                } catch (error) { }
                clearInterval(this.t_timeShangtang);
            }

            this.sessionRightNavCode = code
            if (resetChat) {
                if (this.chat_type == 0) {
                    this.chatList[this.chatList.length - 1].timer = this.timerThreeFive
                } else if (this.chat_type == 1) {
                    this.chatVipList[this.chatVipList.length - 1].timer = this.timerFourZero
                } else if (this.chat_type == 4) {
                    this.chatYiyanList[this.chatYiyanList.length - 1].timer = this.timerYiyan
                } else if (this.chat_type == 5) {
                    this.chatXunfeiList[this.chatXunfeiList.length - 1].timer = this.timerXunfei
                } else if (this.chat_type == 7) {
                    this.chatClaudeList[this.chatClaudeList.length - 1].timer = this.timerClaude
                } else if (this.chat_type == 8) {
                    this.chatChatGLMList[this.chatChatGLMList.length - 1].timer = this.timerChatGLM
                } else if (this.chat_type == 10) {
                    this.chatTongyiList[this.chatTongyiList.length - 1].timer = this.timerTongyi
                } else if (this.chat_type == 11) {
                    this.chatShangtangList[this.chatShangtangList.length - 1].timer = this.timerShangtang
                } else if (this.chat_type == 12) {
                    this.chat360List[this.chat360List.length - 1].timer = this.timer360
                }
            }
        },

        // 继续回答
        keepAs(key, item = {}) {
            if (this.supplyValue == '' || this.supplyValue.replace(/\s*/g, '') == '') {
                this.$message.error('请输入您要发送内容')
                return;
            }
            let msg = '继续';
            if (key == 2) {
                msg = this.supplyValue
                item = this.chatItem
            }

            let val = {
                "chat_type": this.chat_type,
                "action_type": 3,
                "session_code": this.chatItem.session_code,
                "chat_group_code": this.chatItem.chat_group_code,
                "content": msg
            }
            if (this.chat_type == 0) {
                this.isBtnThreeFive = false;
                this.isDetailThreeFive = false;
                this.isfinishThreeFive = false;
                this.replyThreeFive = ''
            } else if (this.chat_type == 1) {
                this.isBtnFourZero = false;
                this.isDetailFourZero = false;
                this.isfinishFourZero = false;
                this.replyFourZero = ''
            } else if (this.chat_type == 4) {
                this.isBtnYiyan = false;
                this.isDetailYiyan = false;
                this.isfinishYiyan = false;
                this.replyYiyan = ''
            } else if (this.chat_type == 5) {
                this.isBtnXunfei = false;
                this.isDetailXunfei = false;
                this.isfinishXunfei = false;
                this.replyXunfei = ''
            } else if (this.chat_type == 7) {
                this.isBtnClaude = false;
                this.isDetailClaude = false;
                this.isfinishClaude = false;
                this.replyClaude = ''
            } else if (this.chat_type == 8) {
                this.isBtnChatGLM = false;
                this.isDetailChatGLM = false;
                this.isfinishChatGLM = false;
                this.replyChatGLM = ''
            } else if (this.chat_type == 10) {
                this.isBtnTongyi = false;
                this.isDetailTongyi = false;
                this.isfinishTongyi = false;
                this.replyTongyi = ''
            } else if (this.chat_type == 11) {
                this.isBtnShangtang = false;
                this.isDetailShangtang = false;
                this.isfinishShangtang = false;
                this.replyShangtang = ''
            } else if (this.chat_type == 12) {
                this.isBtn360 = false;
                this.isDetail360 = false;
                this.isfinish360 = false;
                this.reply360 = ''
            }
            this.supplyVisible = false;
            if (this.chat_type == 0) {
                if (this.chatItem.timer) {
                    this.timerThreeFive = this.chatItem.timer
                } else {
                    this.timerThreeFive = 0
                }
                this.t_timeThreeFive = setInterval(() => {
                    this.timerThreeFive += 1;
                }, 1000)
            } else if (this.chat_type == 1) {
                if (this.chatItem.timer) {
                    this.timerFourZero = this.chatItem.timer
                } else {
                    this.timerFourZero = 0
                }
                this.t_timeFourZero = setInterval(() => {
                    this.timerFourZero += 1;
                }, 1000)
            } else if (this.chat_type == 4) {
                if (this.chatItem.timer) {
                    this.timerYiyan = this.chatItem.timer
                } else {
                    this.timerYiyan = 0
                }
                this.t_timeYiyan = setInterval(() => {
                    this.timerYiyan += 1;
                }, 1000)
            } else if (this.chat_type == 5) {
                if (this.chatItem.timer) {
                    this.timerXunfei = this.chatItem.timer
                } else {
                    this.timerXunfei = 0
                }
                this.t_timeXunfei = setInterval(() => {
                    this.timerXunfei += 1;
                }, 1000)
            } else if (this.chat_type == 7) {
                if (this.chatItem.timer) {
                    this.timerClaude = this.chatItem.timer
                } else {
                    this.timerClaude = 0
                }
                this.t_timeClaude = setInterval(() => {
                    this.timerClaude += 1;
                }, 1000)
            } else if (this.chat_type == 8) {
                if (this.chatItem.timer) {
                    this.timerChatGLM = this.chatItem.timer
                } else {
                    this.timerChatGLM = 0
                }
                this.t_timeChatGLM = setInterval(() => {
                    this.timerChatGLM += 1;
                }, 1000)
            } else if (this.chat_type == 10) {
                if (this.chatItem.timer) {
                    this.timerTongyi = this.chatItem.timer
                } else {
                    this.timerTongyi = 0
                }
                this.t_timeTongyi = setInterval(() => {
                    this.timerTongyi += 1;
                }, 1000)
            } else if (this.chat_type == 11) {
                if (this.chatItem.timer) {
                    this.timerShangtang = this.chatItem.timer
                } else {
                    this.timerShangtang = 0
                }
                this.t_timeShangtang = setInterval(() => {
                    this.timerShangtang += 1;
                }, 1000)
            } else if (this.chat_type == 12) {
                if (this.chatItem.timer) {
                    this.timer360 = this.chatItem.timer
                } else {
                    this.timer360 = 0
                }
                this.t_time360 = setInterval(() => {
                    this.timer360 += 1;
                }, 1000)
            }
            this.vipAgainSend(key, val, item)
        },

        async vipAgainSend(key, valu = {}, item) {
            let msg = '继续';
            if (key == 2) {
                msg = this.supplyValue
            }

            let val = null
            if (this.chat_type == 0) {
                val = {
                    "chat_type": this.chat_type,
                    "session_code": localStorage.getItem('session_code'),
                    "chat_group_code": localStorage.getItem('chat_group_code'),
                    "msg_list": JSON.stringify([{ role: item.role, content: item.content }, { role: 'user', content: msg }])
                }
            } else if (this.chat_type == 1) {
                val = {
                    "chat_type": this.chat_type,
                    "session_code": localStorage.getItem('session_code1'),
                    "chat_group_code": localStorage.getItem('chat_group_code1'),
                    "msg_list": JSON.stringify([{ role: item.role, content: item.content }, { role: 'user', content: msg }])
                }
            } else if (this.chat_type == 4) {
                val = {
                    "chat_type": this.chat_type,
                    "session_code": localStorage.getItem('session_code4'),
                    "chat_group_code": localStorage.getItem('chat_group_code4'),
                    "msg_list": JSON.stringify([{ role: this.chatYiyanList[this.chatItem.chatIndex - 1].role, content: this.chatYiyanList[this.chatItem.chatIndex - 1].content }, { role: item.role, content: item.content }, { role: 'user', content: msg }])
                }
            } else if (this.chat_type == 5) {
                val = {
                    "chat_type": this.chat_type,
                    "session_code": localStorage.getItem('session_code5'),
                    "chat_group_code": localStorage.getItem('chat_group_code5'),
                    "msg_list": JSON.stringify([{ role: item.role, content: item.content }, { role: 'user', content: msg }])
                }
            } else if (this.chat_type == 7) {
                val = {
                    "chat_type": this.chat_type,
                    "session_code": localStorage.getItem('session_code7'),
                    "chat_group_code": localStorage.getItem('chat_group_code7'),
                    "msg_list": JSON.stringify([{ role: this.chatClaudeList[this.chatItem.chatIndex - 1].role, content: this.chatClaudeList[this.chatItem.chatIndex - 1].content }, { role: item.role, content: item.content }, { role: 'user', content: msg }]),
                }
            } else if (this.chat_type == 8) {
                val = {
                    "chat_type": this.chat_type,
                    "session_code": localStorage.getItem('session_code8'),
                    "chat_group_code": localStorage.getItem('chat_group_code8'),
                    "msg_list": JSON.stringify([{ role: this.chatChatGLMList[this.chatItem.chatIndex - 1].role, content: this.chatChatGLMList[this.chatItem.chatIndex - 1].content }, { role: item.role, content: item.content }, { role: 'user', content: msg }]),
                    'model': 'chatglm_pro'
                }
            } else if (this.chat_type == 10) {
                val = {
                    "chat_type": this.chat_type,
                    "session_code": localStorage.getItem('session_code10'),
                    "chat_group_code": localStorage.getItem('chat_group_code10'),
                    "msg_list": JSON.stringify([{ role: this.chatTongyiList[this.chatItem.chatIndex - 1].role, content: this.chatTongyiList[this.chatItem.chatIndex - 1].content }, { role: item.role, content: item.content }, { role: 'user', content: msg }]),
                    'model': 'qwen-v1'
                }
            } else if (this.chat_type == 11) {
                val = {
                    "chat_type": this.chat_type,
                    "session_code": localStorage.getItem('session_code11'),
                    "chat_group_code": localStorage.getItem('chat_group_code11'),
                    "msg_list": JSON.stringify([{ role: this.chatShangtangList[this.chatItem.chatIndex - 1].role, content: this.chatShangtangList[this.chatItem.chatIndex - 1].content }, { role: item.role, content: item.content }, { role: 'user', content: msg }]),
                    'model': 'nova-ptc-xs-v1'
                }
            } else if (this.chat_type == 12) {
                val = {
                    "chat_type": this.chat_type,
                    "session_code": localStorage.getItem('session_code12'),
                    "chat_group_code": localStorage.getItem('chat_group_code12'),
                    "msg_list": JSON.stringify([{ role: this.chat360List[this.chatItem.chatIndex - 1].role, content: this.chat360List[this.chatItem.chatIndex - 1].content }, { role: item.role, content: item.content }, { role: 'user', content: msg }]),
                    'model': 'nova-ptc-xs-v1'
                }
            }

            let userInfo = JSON.parse(localStorage.getItem("userInfo"));
            if (key == 2) {
                if (this.chat_type == 0) {
                    this.chatList.push(
                        {  // 询问者问题展示
                            "create_time": 'date',
                            "finish_reason": "length",
                            "session_code": this.chatItem.session_code,
                            "chat_group_code": this.chatItem.chat_group_code,
                            "role": "user",
                            "content": this.supplyValue, // 预留，对话内容的转换
                            "markedContent": marked(this.supplyValue),
                            checked: false,
                            help: false, // 点赞
                            stepOn: false, // 点踩
                            timer: false,
                        }
                    )
                    this.chatList.push(
                        {  // 询问者问题展示
                            "create_time": 'date',
                            "finish_reason": "length",
                            "session_code": '',
                            "chat_group_code": '',
                            "role": "assistant",
                            "content": '', // 预留，对话内容的转换
                            "markedContent": marked(this.supplyValue),
                            checked: false,
                            help: false, // 点赞
                            stepOn: false, // 点踩
                            timer: false,
                        }
                    )
                    // this.chatList[this.chatList.length-1].content = this.chatList[this.chatList.length-1].content + '\n\n'+ msg +'\n'
                    // this.chatList[this.chatList.length-1].markedContent = marked(this.chatList[this.chatList.length-1].content + '\n' + msg) // 预留，对话内容的转换
                    // this.chatList[this.chatList.length-1].content = this.chatList[this.chatList.length-1].content + '\n\n' + msg + '\n'
                    this.$store.dispatch('user/changeChatListLength', this.chatList.length)
                } else if (this.chat_type == 1) {
                    this.chatVipList.push(
                        {  // 询问者问题展示
                            "create_time": 'date',
                            "finish_reason": "length",
                            "session_code": this.chatItem.session_code,
                            "chat_group_code": this.chatItem.chat_group_code,
                            "role": "user",
                            "content": this.supplyValue, // 预留，对话内容的转换
                            "markedContent": marked(this.supplyValue),
                            checked: false,
                            help: false, // 点赞
                            stepOn: false, // 点踩
                            timer: false,
                        }
                    )
                    this.chatVipList.push(
                        {  // 询问者问题展示
                            "create_time": 'date',
                            "finish_reason": "length",
                            "session_code": '',
                            "chat_group_code": '',
                            "role": "assistant",
                            "content": '', // 预留，对话内容的转换
                            "markedContent": marked(this.supplyValue),
                            checked: false,
                            help: false, // 点赞
                            stepOn: false, // 点踩
                            timer: false,
                        }
                    )
                    // this.chatVipList[this.chatVipList.length-1].content = this.chatVipList[this.chatVipList.length-1].content + '\n\n'+ msg +'\n'
                    // this.chatVipList[this.chatVipList.length-1].markedContent = marked(this.chatVipList[this.chatVipList.length-1].content + '\n' + msg) // 预留，对话内容的转换
                    // this.chatVipList[this.chatVipList.length-1].content = this.chatVipList[this.chatVipList.length-1].content + '\n\n' + msg + '\n'
                    this.$store.dispatch('user/changeChatListLength', this.chatVipList.length)
                } else if (this.chat_type == 4) {
                    this.chatYiyanList.push(
                        {  // 询问者问题展示
                            "create_time": 'date',
                            "finish_reason": "length",
                            "session_code": this.chatItem.session_code,
                            "chat_group_code": this.chatItem.chat_group_code,
                            "role": "user",
                            "content": this.supplyValue, // 预留，对话内容的转换
                            "markedContent": marked(this.supplyValue),
                            checked: false,
                            help: false, // 点赞
                            stepOn: false, // 点踩
                            timer: false,
                        }
                    )
                    this.chatYiyanList.push(
                        {  // 询问者问题展示
                            "create_time": 'date',
                            "finish_reason": "length",
                            "session_code": '',
                            "chat_group_code": '',
                            "role": "assistant",
                            "content": '', // 预留，对话内容的转换
                            "markedContent": marked(this.supplyValue),
                            checked: false,
                            help: false, // 点赞
                            stepOn: false, // 点踩
                            timer: false,
                        }
                    )
                    // this.chatVipList[this.chatVipList.length-1].content = this.chatVipList[this.chatVipList.length-1].content + '\n\n'+ msg +'\n'
                    // this.chatYiyanList[this.chatYiyanList.length-1].markedContent = marked(this.chatYiyanList[this.chatYiyanList.length-1].content + '\n' + msg) // 预留，对话内容的转换
                    // this.chatYiyanList[this.chatYiyanList.length-1].content = this.chatYiyanList[this.chatYiyanList.length-1].content + '\n\n' + msg + '\n'
                    this.$store.dispatch('user/changeChatListLength', this.chatYiyanList.length)
                } else if (this.chat_type == 5) {
                    this.chatXunfeiList.push(
                        {  // 询问者问题展示
                            "create_time": 'date',
                            "finish_reason": "length",
                            "session_code": this.chatItem.session_code,
                            "chat_group_code": this.chatItem.chat_group_code,
                            "role": "user",
                            "content": this.supplyValue, // 预留，对话内容的转换
                            "markedContent": marked(this.supplyValue),
                            checked: false,
                            help: false, // 点赞
                            stepOn: false, // 点踩
                            timer: false,
                        }
                    )
                    this.chatXunfeiList.push(
                        {  // 询问者问题展示
                            "create_time": 'date',
                            "finish_reason": "length",
                            "session_code": '',
                            "chat_group_code": '',
                            "role": "assistant",
                            "content": '', // 预留，对话内容的转换
                            "markedContent": marked(this.supplyValue),
                            checked: false,
                            help: false, // 点赞
                            stepOn: false, // 点踩
                            timer: false,
                        }
                    )
                    // this.chatVipList[this.chatVipList.length-1].content = this.chatVipList[this.chatVipList.length-1].content + '\n\n'+ msg +'\n'
                    // this.chatXunfeiList[this.chatXunfeiList.length-1].markedContent = marked(this.chatXunfeiList[this.chatXunfeiList.length-1].content + '\n' + msg) // 预留，对话内容的转换
                    // this.chatXunfeiList[this.chatXunfeiList.length-1].content = this.chatXunfeiList[this.chatXunfeiList.length-1].content + '\n\n' + msg + '\n'
                    this.$store.dispatch('user/changeChatListLength', this.chatXunfeiList.length)
                } else if (this.chat_type == 7) {
                    this.chatClaudeList.push(
                        {  // 询问者问题展示
                            "create_time": 'date',
                            "finish_reason": "length",
                            "session_code": this.chatItem.session_code,
                            "chat_group_code": this.chatItem.chat_group_code,
                            "role": "user",
                            "content": this.supplyValue, // 预留，对话内容的转换
                            "markedContent": marked(this.supplyValue),
                            checked: false,
                            help: false, // 点赞
                            stepOn: false, // 点踩
                            timer: false,
                        }
                    )
                    this.chatClaudeList.push(
                        {  // 询问者问题展示
                            "create_time": 'date',
                            "finish_reason": "length",
                            "session_code": '',
                            "chat_group_code": '',
                            "role": "assistant",
                            "content": '', // 预留，对话内容的转换
                            "markedContent": marked(this.supplyValue),
                            checked: false,
                            help: false, // 点赞
                            stepOn: false, // 点踩
                            timer: false,
                        }
                    )
                    // this.chatVipList[this.chatVipList.length-1].content = this.chatVipList[this.chatVipList.length-1].content + '\n\n'+ msg +'\n'
                    // this.chatClaudeList[this.chatClaudeList.length-1].markedContent = marked(this.chatClaudeList[this.chatClaudeList.length-1].content + '\n' + msg) // 预留，对话内容的转换
                    // this.chatClaudeList[this.chatClaudeList.length-1].content = this.chatClaudeList[this.chatClaudeList.length-1].content + '\n\n' + msg + '\n'
                    this.$store.dispatch('user/changeChatListLength', this.chatClaudeList.length)
                } else if (this.chat_type == 8) {
                    this.chatChatGLMList.push(
                        {  // 询问者问题展示
                            "create_time": 'date',
                            "finish_reason": "length",
                            "session_code": this.chatItem.session_code,
                            "chat_group_code": this.chatItem.chat_group_code,
                            "role": "user",
                            "content": this.supplyValue, // 预留，对话内容的转换
                            "markedContent": marked(this.supplyValue),
                            checked: false,
                            help: false, // 点赞
                            stepOn: false, // 点踩
                            timer: false,
                        }
                    )
                    this.chatChatGLMList.push(
                        {  // 询问者问题展示
                            "create_time": 'date',
                            "finish_reason": "length",
                            "session_code": '',
                            "chat_group_code": '',
                            "role": "assistant",
                            "content": '', // 预留，对话内容的转换
                            "markedContent": marked(this.supplyValue),
                            checked: false,
                            help: false, // 点赞
                            stepOn: false, // 点踩
                            timer: false,
                        }
                    )
                    // this.chatVipList[this.chatVipList.length-1].content = this.chatVipList[this.chatVipList.length-1].content + '\n\n'+ msg +'\n'
                    // this.chatChatGLMList[this.chatChatGLMList.length-1].markedContent = marked(this.chatChatGLMList[this.chatChatGLMList.length-1].content + '\n' + msg) // 预留，对话内容的转换
                    // this.chatChatGLMList[this.chatChatGLMList.length-1].content = this.chatChatGLMList[this.chatChatGLMList.length-1].content + '\n\n' + msg + '\n'
                    this.$store.dispatch('user/changeChatListLength', this.chatChatGLMList.length)
                } else if (this.chat_type == 10) {
                    this.chatTongyiList.push(
                        {  // 询问者问题展示
                            "create_time": 'date',
                            "finish_reason": "length",
                            "session_code": this.chatItem.session_code,
                            "chat_group_code": this.chatItem.chat_group_code,
                            "role": "user",
                            "content": this.supplyValue, // 预留，对话内容的转换
                            "markedContent": marked(this.supplyValue),
                            checked: false,
                            help: false, // 点赞
                            stepOn: false, // 点踩
                            timer: false,
                        }
                    )
                    this.chatTongyiList.push(
                        {  // 询问者问题展示
                            "create_time": 'date',
                            "finish_reason": "length",
                            "session_code": '',
                            "chat_group_code": '',
                            "role": "assistant",
                            "content": '', // 预留，对话内容的转换
                            "markedContent": marked(this.supplyValue),
                            checked: false,
                            help: false, // 点赞
                            stepOn: false, // 点踩
                            timer: false,
                        }
                    )
                    // this.chatVipList[this.chatVipList.length-1].content = this.chatVipList[this.chatVipList.length-1].content + '\n\n'+ msg +'\n'
                    // this.chatChatGLMList[this.chatChatGLMList.length-1].markedContent = marked(this.chatChatGLMList[this.chatChatGLMList.length-1].content + '\n' + msg) // 预留，对话内容的转换
                    // this.chatChatGLMList[this.chatChatGLMList.length-1].content = this.chatChatGLMList[this.chatChatGLMList.length-1].content + '\n\n' + msg + '\n'
                    this.$store.dispatch('user/changeChatListLength', this.chatTongyiList.length)
                } else if (this.chat_type == 11) {
                    this.chatShangtangList.push(
                        {  // 询问者问题展示
                            "create_time": 'date',
                            "finish_reason": "length",
                            "session_code": this.chatItem.session_code,
                            "chat_group_code": this.chatItem.chat_group_code,
                            "role": "user",
                            "content": this.supplyValue, // 预留，对话内容的转换
                            "markedContent": marked(this.supplyValue),
                            checked: false,
                            help: false, // 点赞
                            stepOn: false, // 点踩
                            timer: false,
                        }
                    )
                    this.chatShangtangList.push(
                        {  // 询问者问题展示
                            "create_time": 'date',
                            "finish_reason": "length",
                            "session_code": '',
                            "chat_group_code": '',
                            "role": "assistant",
                            "content": '', // 预留，对话内容的转换
                            "markedContent": marked(this.supplyValue),
                            checked: false,
                            help: false, // 点赞
                            stepOn: false, // 点踩
                            timer: false,
                        }
                    )
                    // this.chatVipList[this.chatVipList.length-1].content = this.chatVipList[this.chatVipList.length-1].content + '\n\n'+ msg +'\n'
                    // this.chatChatGLMList[this.chatChatGLMList.length-1].markedContent = marked(this.chatChatGLMList[this.chatChatGLMList.length-1].content + '\n' + msg) // 预留，对话内容的转换
                    // this.chatChatGLMList[this.chatChatGLMList.length-1].content = this.chatChatGLMList[this.chatChatGLMList.length-1].content + '\n\n' + msg + '\n'
                    this.$store.dispatch('user/changeChatListLength', this.chatShangtangList.length)
                } else if (this.chat_type == 12) {
                    this.chat360List.push(
                        {  // 询问者问题展示
                            "create_time": 'date',
                            "finish_reason": "length",
                            "session_code": this.chatItem.session_code,
                            "chat_group_code": this.chatItem.chat_group_code,
                            "role": "user",
                            "content": this.supplyValue, // 预留，对话内容的转换
                            "markedContent": marked(this.supplyValue),
                            checked: false,
                            help: false, // 点赞
                            stepOn: false, // 点踩
                            timer: false,
                        }
                    )
                    this.chat360List.push(
                        {  // 询问者问题展示
                            "create_time": 'date',
                            "finish_reason": "length",
                            "session_code": '',
                            "chat_group_code": '',
                            "role": "assistant",
                            "content": '', // 预留，对话内容的转换
                            "markedContent": marked(this.supplyValue),
                            checked: false,
                            help: false, // 点赞
                            stepOn: false, // 点踩
                            timer: false,
                        }
                    )
                    // this.chatVipList[this.chatVipList.length-1].content = this.chatVipList[this.chatVipList.length-1].content + '\n\n'+ msg +'\n'
                    // this.chatChatGLMList[this.chatChatGLMList.length-1].markedContent = marked(this.chatChatGLMList[this.chatChatGLMList.length-1].content + '\n' + msg) // 预留，对话内容的转换
                    // this.chatChatGLMList[this.chatChatGLMList.length-1].content = this.chatChatGLMList[this.chatChatGLMList.length-1].content + '\n\n' + msg + '\n'
                    this.$store.dispatch('user/changeChatListLength', this.chat360List.length)
                }
            }

            let response = null
            let url = Number(this.chat_type) == 0 || Number(this.chat_type) == 1 ? 'api/chat/async_chat_session' : 'api/chat/async_chat_completion'
            if (this.chat_type == 0) {
                this.controllerThreeFive = new AbortController()
                response = await fetch(httpUrls.httpUrl + url, {
                    method: "POST",
                    headers: {
                        "Content-Type": 'application/json',
                        'Accept': '*/*',
                        'authorization': userInfo.token,
                        'role': userInfo.role,
                        'source': 'pc'
                    },
                    body: JSON.stringify(val),
                    signal: this.controllerThreeFive.signal
                });
            } else if (this.chat_type == 1) {
                this.controllerFourZreo = new AbortController()
                response = await fetch(httpUrls.httpUrl + url, {
                    method: "POST",
                    headers: {
                        "Content-Type": 'application/json',
                        'Accept': '*/*',
                        'authorization': userInfo.token,
                        'role': userInfo.role,
                        'source': 'pc'
                    },
                    body: JSON.stringify(val),
                    signal: this.controllerFourZreo.signal
                });
            } else if (this.chat_type == 4) {
                this.controllerYiyan = new AbortController()
                response = await fetch(httpUrls.httpUrl + url, {
                    method: "POST",
                    headers: {
                        "Content-Type": 'application/json',
                        'Accept': '*/*',
                        'authorization': userInfo.token,
                        'role': userInfo.role,
                        'source': 'pc'
                    },
                    body: JSON.stringify(val),
                    signal: this.controllerYiyan.signal
                });
            } else if (this.chat_type == 5) {
                this.controllerXunfei = new AbortController()
                response = await fetch(httpUrls.httpUrl + url, {
                    method: "POST",
                    headers: {
                        "Content-Type": 'application/json',
                        'Accept': '*/*',
                        'authorization': userInfo.token,
                        'role': userInfo.role,
                        'source': 'pc'
                    },
                    body: JSON.stringify(val),
                    signal: this.controllerXunfei.signal
                });
            } else if (this.chat_type == 7) {
                this.controllerClaude = new AbortController()
                response = await fetch(httpUrls.httpUrl + url, {
                    method: "POST",
                    headers: {
                        "Content-Type": 'application/json',
                        'Accept': '*/*',
                        'authorization': userInfo.token,
                        'role': userInfo.role,
                        'source': 'pc'
                    },
                    body: JSON.stringify(val),
                    signal: this.controllerClaude.signal
                });
            } else if (this.chat_type == 8) {
                this.controllerChatGLM = new AbortController()
                response = await fetch(httpUrls.httpUrl + url, {
                    method: "POST",
                    headers: {
                        "Content-Type": 'application/json',
                        'Accept': '*/*',
                        'authorization': userInfo.token,
                        'role': userInfo.role,
                        'source': 'pc'
                    },
                    body: JSON.stringify(val),
                    signal: this.controllerChatGLM.signal
                });
            } else if (this.chat_type == 10) {
                this.controllerTongyi = new AbortController()
                response = await fetch(httpUrls.httpUrl + url, {
                    method: "POST",
                    headers: {
                        "Content-Type": 'application/json',
                        'Accept': '*/*',
                        'authorization': userInfo.token,
                        'role': userInfo.role,
                        'source': 'pc'
                    },
                    body: JSON.stringify(val),
                    signal: this.controllerTongyi.signal
                });
            } else if (this.chat_type == 11) {
                this.controllerShangtang = new AbortController()
                response = await fetch(httpUrls.httpUrl + url, {
                    method: "POST",
                    headers: {
                        "Content-Type": 'application/json',
                        'Accept': '*/*',
                        'authorization': userInfo.token,
                        'role': userInfo.role,
                        'source': 'pc'
                    },
                    body: JSON.stringify(val),
                    signal: this.controllerShangtang.signal
                });
            } else if (this.chat_type == 12) {
                this.controller360 = new AbortController()
                response = await fetch(httpUrls.httpUrl + url, {
                    method: "POST",
                    headers: {
                        "Content-Type": 'application/json',
                        'Accept': '*/*',
                        'authorization': userInfo.token,
                        'role': userInfo.role,
                        'source': 'pc'
                    },
                    body: JSON.stringify(val),
                    signal: this.controller360.signal
                });
            }

            this.ordeAIList = []

            // 状态码的统一处理
            if (response.status != '200') {
                response.json().then(res => {
                    this.codeHandleChange(res)
                })
                return
            }

            if (!response.ok) {
                this.$message.error(response.statusText);
                return;
            }

            this.sendValue = '';// 清空发送栏内容
            const reader = response.body.getReader();
            while (true) {
                const { value, done } = await reader.read();
                if (done) {
                    break;
                }
                if (value) {
                    let stringStr = arr2str(value)
                    let chatArr = stringStr.split('\r\n');
                    console.log(chatArr)
                    chatArr.forEach(val => {
                        if (val != '') {
                            let res = JSON.parse(val);
                            this.talkMsgList(res)
                            return
                        }

                    })
                }
            }
        },


        // ai返回的数据处理
        talkMsgList(res) {
            // console.log('---------', res);
            /**
             * 35
             */
            this.msgCode = res.msg_code
            if (Number(res.code) == 36003) {
                if (this.chat_type == 0) {
                    this.isfinishThreeFive = true;
                    clearInterval(this.t_timeThreeFive)
                    this.t_timeThreeFive = null
                    this.isTimeThreeFive = false;
                    this.isBtnThreeFive = true
                } else if (this.chat_type == 1) {
                    clearInterval(this.t_timeFourZero)
                    this.t_timeFourZero = null
                    this.isfinishFourZero = true;
                    this.isTimeFourZero = false
                    this.isBtnFourZero = true
                } else if (this.chat_type == 4) {
                    clearInterval(this.t_timeYiyan)
                    this.t_timeYiyan = null
                    this.isfinishYiyan = true;
                    this.isTimeYiyan = false
                    this.isBtnYiyan = true
                } else if (this.chat_type == 5) {
                    clearInterval(this.t_timeXunfei)
                    this.t_timeXunfei = null
                    this.isfinishXunfei = true;
                    this.isTimeXunfei = false
                    this.isBtnXunfei = true
                } else if (this.chat_type == 7) {
                    clearInterval(this.t_timeClaude)
                    this.t_timeClaude = null
                    this.isfinishClaude = true;
                    this.isTimeClaude = false
                    this.isBtnClaude = true
                } else if (this.chat_type == 8) {
                    clearInterval(this.t_timeChatGLM)
                    this.t_timeChatGLM = null
                    this.isfinishChatGLM = true;
                    this.isTimeChatGLM = false
                    this.isBtnChatGLM = true
                } else if (this.chat_type == 10) {
                    clearInterval(this.t_timeTongyi)
                    this.t_timeTongyi = null
                    this.isfinishTongyi = true;
                    this.isTimeTongyi = false
                    this.isBtnTongyi = true
                } else if (this.chat_type == 11) {
                    clearInterval(this.t_timeShangtang)
                    this.t_timeShangtang = null
                    this.isfinishShangtang = true;
                    this.isTimeShangtang = false
                    this.isBtnShangtang = true
                } else if (this.chat_type == 12) {
                    clearInterval(this.t_time360)
                    this.t_time360 = null
                    this.isfinish360 = true;
                    this.isTime360 = false
                    this.isBtn360 = true
                }
                this.$message.error('关联对话必须为一问一答')
            }
            if (Number(res.code) == 30014 || Number(res.code) == 40022) {
                // 登录
                if (this.loginInfo.role == 'guess') {
                    this.$refs.Register.registerVisible = true
                    return
                }
                // 升级会员
                if (this.loginInfo.role == 'user') {
                    this.queryErrorMsg = res.msg
                    this.isuser = false
                    if (this.chat_type == 0) {
                        this.isfinishThreeFive = true;
                        clearInterval(this.t_timeThreeFive)
                        this.t_timeThreeFive = null
                        this.isTimeThreeFive = false;
                        this.isBtnThreeFive = true
                    } else if (this.chat_type == 1) {
                        clearInterval(this.t_timeFourZero)
                        this.t_timeFourZero = null
                        this.isfinishFourZero = true;
                        this.isTimeFourZero = false
                        this.isBtnFourZero = true
                    } else if (this.chat_type == 4) {
                        clearInterval(this.t_timeYiyan)
                        this.t_timeYiyan = null
                        this.isfinishYiyan = true;
                        this.isTimeYiyan = false
                        this.isBtnYiyan = true
                    } else if (this.chat_type == 5) {
                        clearInterval(this.t_timeXunfei)
                        this.t_timeXunfei = null
                        this.isfinishXunfei = true;
                        this.isTimeXunfei = false
                        this.isBtnXunfei = true
                    } else if (this.chat_type == 7) {
                        clearInterval(this.t_timeClaude)
                        this.t_timeClaude = null
                        this.isfinishClaude = true;
                        this.isTimeClaude = false
                        this.isBtnClaude = true
                    } else if (this.chat_type == 8) {
                        clearInterval(this.t_timeChatGLM)
                        this.t_timeChatGLM = null
                        this.isfinishChatGLM = true;
                        this.isTimeChatGLM = false
                        this.isBtnChatGLM = true
                    } else if (this.chat_type == 10) {
                        clearInterval(this.t_timeTongyi)
                        this.t_timeTongyi = null
                        this.isfinishTongyi = true;
                        this.isTimeTongyi = false
                        this.isBtnTongyi = true
                    } else if (this.chat_type == 11) {
                        clearInterval(this.t_timeShangtang)
                        this.t_timeShangtang = null
                        this.isfinishShangtang = true;
                        this.isTimeShangtang = false
                        this.isBtnShangtang = true
                    } else if (this.chat_type == 12) {
                        clearInterval(this.t_time360)
                        this.t_time360 = null
                        this.isfinish360 = true;
                        this.isTime360 = false
                        this.isBtn360 = true
                    }
                    return
                }
            }

            // 状态码的统一处理
            if (res.code != undefined) {
                let resStatus = this.codeHandleChange(res)
                if (!resStatus) {
                    return
                }
            }
            const renderer = new marked.Renderer();
            // 重写代码块渲染方法，使用highlight.js进行代码高亮
            renderer.code = (code, language) => {
                const validLanguage = hljs.getLanguage(language) ? language : 'plaintext';
                const highlightedCode = hljs.highlight(validLanguage, code).value;
                return `<pre><code class="hljs ${validLanguage}">${highlightedCode}</code></pre>`;
            };

            // 35
            if (res.chat_type == '0' && !this.isfinishThreeFive) {
                this.isTimeThreeFive = false;
                if (res != '' && res.content != null) {
                    // this.chatVipList[this.chatVipList.length-1].content += res.content;
                    // console.log(this.chatVipList[this.chatVipList.length-1].content, 335)
                    // this.lsReply(this.chatVipList[this.chatVipList.length-1].content, res.content);
                    // this.reply = this.chatList[this.chatList.length-1].content + res.content; // 老版本预留
                    // this.replyThreeFive = marked(this.chatList[this.chatList.length-1].content + res.content); // 预留，对话内容的转换
                    // this.replyThreeFive = this.chatList[this.chatList.length-1].content + res.content;
                    // this.chatList[this.chatList.length-1].content = this.chatList[this.chatList.length-1].content + res.content;

                    this.chatList[this.chatList.length - 1].content = this.chatList[this.chatList.length - 1].content + res.content;

                    this.chatList[this.chatList.length - 1].markedContent = marked(this.chatList[this.chatList.length - 1].content + res.content);
                    this.replyThreeFive = marked(this.chatList[this.chatList.length - 1].content + res.content);

                    // 定位到聊天最底部
                    this.toBottom();
                }
                if (res.session_code != '' && res.content != null) {
                    this.chatList[this.chatList.length - 1].session_code = res.session_code;
                    this.chatList[this.chatList.length - 2].session_code = res.session_code;
                    localStorage.setItem('session_code', res.session_code);
                }
                if (res.create_time != '' && res.create_time != null) {
                    this.chatList[this.chatList.length - 1].create_time = res.create_time
                }
                if (res.chat_group_code != '' && res.chat_group_code != null) {
                    this.chatList[this.chatList.length - 1].chat_group_code = res.chat_group_code;
                    this.chatList[this.chatList.length - 2].chat_group_code = res.chat_group_code;
                    localStorage.setItem('chat_group_code', res.chat_group_code);
                }
                if (res.finish_reason != '' && res.finish_reason != null) {
                    // console.log('完结了');
                    this.isfinishThreeFive = true;
                    this.isBtnThreeFive = true;
                    // this.chatList[this.chatList.length-1].content = this.reply;
                    for (let i = 0; i < 10; i++) {
                        clearInterval(this.t_timeThreeFive)
                    }
                    this.t_timeThreeFive = null
                    this.chatList[this.chatList.length - 1].finish_reason = res.finish_reason;
                    this.$store.dispatch('user/changeChatListLength', this.chatList.length)
                    this.chatList[this.chatList.length - 1].timer = this.timerThreeFive
                    if (!localStorage.getItem('session_code')) {
                        // this.$root.Bus.$emit('updateList', this.chat_type) // 触发左侧导航栏刷新对话内容
                        this.sessionRightNavCode = res.session_code
                    }
                    this.chatList.forEach(v => {
                        v.markedContent = marked(v.content, { renderer })
                    })
                    this.replyThreeFive = marked(this.replyFourZero, { renderer })

                    this.tokenNumberThreeFive = {
                        completionTokens: res.completion_tokens, // 下行token
                        promptTokens: res.prompt_tokens, // 上行token
                        integral: res.integral, // 积分
                        totalTokens: res.total_tokens // 总tokes
                    }
                    this.chatList[this.chatList.length - 1].completion_tokens = res.completion_tokens
                    this.chatList[this.chatList.length - 1].prompt_tokens = res.prompt_tokens
                    this.chatList[this.chatList.length - 1].integral = res.integral
                    this.chatList[this.chatList.length - 1].total_tokens = res.total_tokens

                    // 保存最近使用
                    submitFootprint({
                        type_name: 'AI35',
                        type_code: 'chat',
                        title: this.oldSendValue,
                        eid: res.session_code
                    }).then(res => { })

                    this.$nextTick(() => {
                        let pres = document.getElementsByTagName('pre')
                        for (let a = 0; a < pres.length; a++) {
                            let spans = document.createElement('span')
                            spans.setAttribute('class', 'copy-code-button')
                            spans.addEventListener('click', (event) => {
                                var input = document.createElement("textarea"); // 创建input对象
                                input.value = event.target.previousElementSibling.innerText; // 设置复制内容
                                document.body.appendChild(input); // 添加临时实例
                                input.select(); // 选择实例内容
                                document.execCommand("Copy"); // 执行复制
                                document.body.removeChild(input); // 删除临时实例
                                this.$message.success('复制成功！');
                            })
                            spans.setAttribute('click', 'copyCodeButton')
                            pres[a].appendChild(spans)
                        }
                    })
                    // this.replyThreeFive = marked(this.replyThreeFive) // marked的转换
                    // this.replyThreeFive = marked(this.chatList[this.chatList.length-1].content + res.content); // 预留，对话内容的转换
                }
                if (res.finish_reason == 'stop') {
                    this.sessionRightNavCode = res.session_code
                }
                if (res.role != '' && res.role != null) {
                    this.chatList[this.chatList.length - 1].role = res.role;
                }
                // return;
            }

            /**
             * 40
             */
            if (res.chat_type == "1" && !this.isfinishFourZero) {
                this.isTimeFourZero = false;
                if (res != '' && res.content != null) {
                    // this.chatVipList[this.chatVipList.length-1].content += res.content;
                    // this.lsReply(this.chatVipList[this.chatVipList.length-1].content, res.content);
                    // this.chatVipList[this.chatVipList.length-1].content = marked.parse(this.chatVipList[this.chatVipList.length-1].content + res.content); // 预留，对话内容的转换
                    // this.reply = this.chatVipList[this.chatVipList.length-1].content + res.content; // 老版本预留

                    // this.replyFourZero = marked(this.chatVipList[this.chatVipList.length-1].content + res.content); // 预留，对话内容的转换
                    // this.replyFourZero = this.chatVipList[this.chatVipList.length-1].content + res.content;
                    // this.chatVipList[this.chatVipList.length-1].content = this.chatVipList[this.chatVipList.length-1].content + res.content;

                    this.chatVipList[this.chatVipList.length - 1].content = this.chatVipList[this.chatVipList.length - 1].content + res.content;

                    this.chatVipList[this.chatVipList.length - 1].markedContent = this.chatVipList[this.chatVipList.length - 1].content + res.content;
                    this.replyFourZero = this.chatVipList[this.chatVipList.length - 1].content + res.content;

                    // 定位到聊天最底部
                    this.toBottom();
                }
                if (res.session_code != '' && res.content != null) {
                    this.chatVipList[this.chatVipList.length - 1].session_code = res.session_code;
                    this.chatVipList[this.chatVipList.length - 2].session_code = res.session_code;
                    localStorage.setItem('session_code1', res.session_code);
                }
                if (res.create_time != '' && res.create_time != null) {
                    this.chatVipList[this.chatVipList.length - 1].create_time = res.create_time
                }
                if (res.chat_group_code != '' && res.chat_group_code != null) {
                    this.chatVipList[this.chatVipList.length - 1].chat_group_code = res.chat_group_code;
                    this.chatVipList[this.chatVipList.length - 2].chat_group_code = res.chat_group_code;
                    localStorage.setItem('chat_group_code1', res.chat_group_code);
                }
                if (res.finish_reason != '' && res.finish_reason != null) {
                    // console.log('完结了');
                    clearInterval(this.t_timeFourZero);
                    this.t_timeFourZero = null
                    this.isfinishFourZero = true;
                    this.isBtnFourZero = true;
                    // this.chatVipList[this.chatVipList.length-1].content = this.reply;
                    this.chatVipList[this.chatVipList.length - 1].finish_reason = res.finish_reason;
                    this.$store.dispatch('user/changeChatListLength', this.chatVipList.length)
                    this.chatVipList[this.chatVipList.length - 1].timer = this.timerFourZero
                    if (!localStorage.getItem('session_code1')) {
                        this.sessionRightNavCode = res.session_code
                    }

                    this.chatVipList.forEach(v => {
                        v.markedContent = marked(v.content, { renderer })
                    })
                    this.replyFourZero = marked(this.replyFourZero, { renderer })

                    this.tokenNumberFourZero = {
                        completionTokens: res.completion_tokens, // 下行token
                        promptTokens: res.prompt_tokens, // 上行token
                        integral: res.integral, // 积分
                        totalTokens: res.total_tokens // 总tokes
                    }
                    this.chatVipList[this.chatVipList.length - 1].completion_tokens = res.completion_tokens
                    this.chatVipList[this.chatVipList.length - 1].prompt_tokens = res.prompt_tokens
                    this.chatVipList[this.chatVipList.length - 1].integral = res.integral
                    this.chatVipList[this.chatVipList.length - 1].total_tokens = res.total_tokens

                    // 保存最近使用
                    submitFootprint({
                        type_name: 'AI40',
                        type_code: 'chat',
                        title: this.oldSendValue,
                        eid: res.session_code
                    }).then(res => { })

                    this.$nextTick(() => {
                        let pres = document.getElementsByTagName('pre')
                        for (let a = 0; a < pres.length; a++) {
                            let spans = document.createElement('span')
                            spans.setAttribute('class', 'copy-code-button')
                            spans.addEventListener('click', (event) => {
                                var input = document.createElement("textarea"); // 创建input对象
                                input.value = event.target.previousElementSibling.innerText; // 设置复制内容
                                document.body.appendChild(input); // 添加临时实例
                                input.select(); // 选择实例内容
                                document.execCommand("Copy"); // 执行复制
                                document.body.removeChild(input); // 删除临时实例
                                this.$message.success('复制成功！');
                            })
                            spans.setAttribute('click', 'copyCodeButton')
                            pres[a].appendChild(spans)
                        }
                    })
                    // this.replyFourZero = marked(this.replyFourZero) // marked的转换
                }
                if (res.finish_reason == 'stop') {
                    this.sessionRightNavCode = res.session_code
                }
                if (res.role != '' && res.role != null) {
                    this.chatVipList[this.chatVipList.length - 1].role = res.role;
                }
            }

            /**
             * 文心一言
             */
            if (res.chat_type == "4" && !this.isfinishYiyan) {
                this.isTimeYiyan = false;
                if (res != '' && res.content != null) {
                    // this.replyYiyan = this.chatYiyanList[this.chatYiyanList.length-1].content + res.content;
                    // this.chatYiyanList[this.chatYiyanList.length-1].content = this.chatYiyanList[this.chatYiyanList.length-1].content + res.content;

                    this.chatYiyanList[this.chatYiyanList.length - 1].content = this.chatYiyanList[this.chatYiyanList.length - 1].content + res.content;

                    this.chatYiyanList[this.chatYiyanList.length - 1].markedContent = this.chatYiyanList[this.chatYiyanList.length - 1].content + res.content;
                    this.replyYiyan = this.chatYiyanList[this.chatYiyanList.length - 1].content + res.content;

                    // 定位到聊天最底部
                    this.toBottom();
                }
                if (res.session_code != '' && res.content != null) {
                    this.chatYiyanList[this.chatYiyanList.length - 1].session_code = res.session_code;
                    this.chatYiyanList[this.chatYiyanList.length - 2].session_code = res.session_code;
                    localStorage.setItem('session_code4', res.session_code);
                }
                if (res.create_time != '' && res.create_time != null) {
                    this.chatYiyanList[this.chatYiyanList.length - 1].create_time = res.create_time
                }
                if (res.chat_group_code != '' && res.chat_group_code != null) {
                    this.chatYiyanList[this.chatYiyanList.length - 1].chat_group_code = res.chat_group_code;
                    this.chatYiyanList[this.chatYiyanList.length - 2].chat_group_code = res.chat_group_code;
                    localStorage.setItem('chat_group_code4', res.chat_group_code);
                }
                if (res.finish_reason) {
                    // console.log('完结了');
                    clearInterval(this.t_timeYiyan);
                    this.t_timeYiyan = null
                    this.isfinishYiyan = true;
                    this.isBtnYiyan = true;
                    this.chatYiyanList[this.chatYiyanList.length - 1].finish_reason = res.finish_reason;
                    this.$store.dispatch('user/changeChatListLength', this.chatYiyanList.length)
                    this.chatYiyanList[this.chatYiyanList.length - 1].timer = this.timerYiyan
                    if (!localStorage.getItem('session_code4')) {
                        this.sessionRightNavCode = res.session_code
                    }

                    this.chatYiyanList.forEach(v => {
                        v.markedContent = marked(v.content, { renderer })
                    })
                    this.replyYiyan = marked(this.replyYiyan, { renderer })

                    this.tokenNumberYiyan = {
                        completionTokens: res.completion_tokens, // 下行token
                        promptTokens: res.prompt_tokens, // 上行token
                        integral: res.integral, // 积分
                        totalTokens: res.total_tokens // 总tokes
                    }
                    this.chatYiyanList[this.chatYiyanList.length - 1].completion_tokens = res.completion_tokens
                    this.chatYiyanList[this.chatYiyanList.length - 1].prompt_tokens = res.prompt_tokens
                    this.chatYiyanList[this.chatYiyanList.length - 1].integral = res.integral
                    this.chatYiyanList[this.chatYiyanList.length - 1].total_tokens = res.total_tokens

                    // 保存最近使用
                    submitFootprint({
                        type_name: '文心一言',
                        type_code: 'chat',
                        title: this.oldSendValue,
                        eid: res.session_code
                    }).then(res => { })

                    this.$nextTick(() => {
                        let pres = document.getElementsByTagName('pre')
                        for (let a = 0; a < pres.length; a++) {
                            let spans = document.createElement('span')
                            spans.setAttribute('class', 'copy-code-button')
                            spans.addEventListener('click', (event) => {
                                var input = document.createElement("textarea"); // 创建input对象
                                input.value = event.target.previousElementSibling.innerText; // 设置复制内容
                                document.body.appendChild(input); // 添加临时实例
                                input.select(); // 选择实例内容
                                document.execCommand("Copy"); // 执行复制
                                document.body.removeChild(input); // 删除临时实例
                                this.$message.success('复制成功！');
                            })
                            spans.setAttribute('click', 'copyCodeButton')
                            pres[a].appendChild(spans)
                        }
                    })
                }
                if (res.finish_reason) {
                    this.sessionRightNavCode = res.session_code
                }
                if (res.role != '' && res.role != null) {
                    this.chatYiyanList[this.chatYiyanList.length - 1].role = res.role;
                }
            }

            /**
             * 讯飞星火
             */
            if (res.chat_type == "5" && !this.isfinishXunfei) {
                this.isTimeXunfei = false;
                if (res != '' && res.content != null) {
                    // const renderer = new marked.Renderer();
                    // // 重写代码块渲染方法，使用highlight.js进行代码高亮
                    // renderer.code = (code, language) => {
                    //     const validLanguage = hljs.getLanguage(language) ? language : 'plaintext';
                    //     const highlightedCode = hljs.highlight(validLanguage, code).value;
                    //     return `<pre><code class="hljs ${validLanguage}">${highlightedCode}</code></pre>`;
                    // };
                    this.chatXunfeiList[this.chatXunfeiList.length - 1].content = this.chatXunfeiList[this.chatXunfeiList.length - 1].content + res.content;

                    this.chatXunfeiList[this.chatXunfeiList.length - 1].markedContent = this.chatXunfeiList[this.chatXunfeiList.length - 1].content + res.content;
                    this.replyXunfei = this.chatXunfeiList[this.chatXunfeiList.length - 1].content + res.content;

                    // this.replyXunfei = this.chatXunfeiList[this.chatXunfeiList.length-1].content + res.content;
                    // this.chatXunfeiList[this.chatXunfeiList.length-1].content = this.chatXunfeiList[this.chatXunfeiList.length-1].content + res.content;
                    // 定位到聊天最底部
                    this.toBottom();
                }
                if (res.session_code != '' && res.content != null) {
                    this.chatXunfeiList[this.chatXunfeiList.length - 1].session_code = res.session_code;
                    this.chatXunfeiList[this.chatXunfeiList.length - 2].session_code = res.session_code;
                    localStorage.setItem('session_code5', res.session_code);
                }
                if (res.create_time != '' && res.create_time != null) {
                    this.chatXunfeiList[this.chatXunfeiList.length - 1].create_time = res.create_time
                }
                if (res.chat_group_code != '' && res.chat_group_code != null) {
                    this.chatXunfeiList[this.chatXunfeiList.length - 1].chat_group_code = res.chat_group_code;
                    this.chatXunfeiList[this.chatXunfeiList.length - 2].chat_group_code = res.chat_group_code;
                    localStorage.setItem('chat_group_code5', res.chat_group_code);
                }
                if (res.finish_reason == 2) {
                    clearInterval(this.t_timeXunfei);
                    this.t_timeXunfei = null
                    this.isfinishXunfei = true;
                    this.isBtnXunfei = true;
                    // this.chatVipList[this.chatVipList.length-1].content = this.reply;
                    this.chatXunfeiList[this.chatXunfeiList.length - 1].finish_reason = res.finish_reason;
                    this.$store.dispatch('user/changeChatListLength', this.chatXunfeiList.length)
                    this.chatXunfeiList[this.chatXunfeiList.length - 1].timer = this.timerXunfei
                    if (!localStorage.getItem('session_code5')) {
                        this.sessionRightNavCode = res.session_code
                    }

                    this.chatXunfeiList.forEach(v => {
                        v.markedContent = marked(v.content, { renderer })
                    })
                    console.log(this.replyXunfei,'---测试bug')
                    this.replyXunfei = marked(this.replyXunfei, { renderer })
                    this.tokenNumberXunfei = {
                        completionTokens: res.completion_tokens, // 下行token
                        promptTokens: res.prompt_tokens, // 上行token
                        integral: res.integral, // 积分
                        totalTokens: res.total_tokens // 总tokes
                    }
                    this.chatXunfeiList[this.chatXunfeiList.length - 1].completion_tokens = res.completion_tokens
                    this.chatXunfeiList[this.chatXunfeiList.length - 1].prompt_tokens = res.prompt_tokens
                    this.chatXunfeiList[this.chatXunfeiList.length - 1].integral = res.integral
                    this.chatXunfeiList[this.chatXunfeiList.length - 1].total_tokens = res.total_tokens

                    // 保存最近使用
                    submitFootprint({
                        type_name: '讯飞星火',
                        type_code: 'chat',
                        title: this.oldSendValue,
                        eid: res.session_code
                    }).then(res => { })

                    this.$nextTick(() => {
                        let pres = document.getElementsByTagName('pre')
                        for (let a = 0; a < pres.length; a++) {
                            let spans = document.createElement('span')
                            spans.setAttribute('class', 'copy-code-button')
                            spans.addEventListener('click', (event) => {
                                var input = document.createElement("textarea"); // 创建input对象
                                input.value = event.target.previousElementSibling.innerText; // 设置复制内容
                                document.body.appendChild(input); // 添加临时实例
                                input.select(); // 选择实例内容
                                document.execCommand("Copy"); // 执行复制
                                document.body.removeChild(input); // 删除临时实例
                                this.$message.success('复制成功！');
                            })
                            spans.setAttribute('click', 'copyCodeButton')
                            pres[a].appendChild(spans)
                        }
                    })
                    // this.replyXunfei = marked(this.replyXunfei) // marked的转换
                }
                if (res.finish_reason == 2) {
                    this.sessionRightNavCode = res.session_code
                }
                if (res.role != '' && res.role != null) {
                    this.chatXunfeiList[this.chatXunfeiList.length - 1].role = res.role;
                }
            }

            /**
             * Claude
             */
            if (res.chat_type == "7" && !this.isfinishClaude) {
                this.isTimeClaude = false;
                if (res != '' && res.content != null) {
                    // const renderer = new marked.Renderer();
                    // // 重写代码块渲染方法，使用highlight.js进行代码高亮
                    // renderer.code = (code, language) => {
                    //     const validLanguage = hljs.getLanguage(language) ? language : 'plaintext';
                    //     const highlightedCode = hljs.highlight(validLanguage, code).value;
                    //     return `<pre><code class="hljs ${validLanguage}">${highlightedCode}</code></pre>`;
                    // };
                    // this.replyClaude = this.chatClaudeList[this.chatClaudeList.length-1].content + res.content;
                    // this.chatClaudeList[this.chatClaudeList.length-1].content = this.chatClaudeList[this.chatClaudeList.length-1].content + res.content;

                    this.chatClaudeList[this.chatClaudeList.length - 1].content = this.chatClaudeList[this.chatClaudeList.length - 1].content + res.content;

                    this.chatClaudeList[this.chatClaudeList.length - 1].markedContent = this.chatClaudeList[this.chatClaudeList.length - 1].content + res.content;
                    this.replyClaude = this.chatClaudeList[this.chatClaudeList.length - 1].content + res.content;
                    // 定位到聊天最底部
                    this.toBottom();
                }
                if (res.session_code != '' && res.content != null) {
                    this.chatClaudeList[this.chatClaudeList.length - 1].session_code = res.session_code;
                    this.chatClaudeList[this.chatClaudeList.length - 2].session_code = res.session_code;
                    localStorage.setItem('session_code7', res.session_code);
                }
                if (res.create_time != '' && res.create_time != null) {
                    this.chatClaudeList[this.chatClaudeList.length - 1].create_time = res.create_time
                }
                if (res.chat_group_code != '' && res.chat_group_code != null) {
                    this.chatClaudeList[this.chatClaudeList.length - 1].chat_group_code = res.chat_group_code;
                    this.chatClaudeList[this.chatClaudeList.length - 2].chat_group_code = res.chat_group_code;
                    localStorage.setItem('chat_group_code7', res.chat_group_code);
                }
                if (res.finish_reason == 'stop') {
                    clearInterval(this.t_timeClaude);
                    this.t_timeClaude = null
                    this.isfinishClaude = true;
                    this.isBtnClaude = true;
                    // this.chatVipList[this.chatVipList.length-1].content = this.reply;
                    this.chatClaudeList[this.chatClaudeList.length - 1].finish_reason = res.finish_reason;
                    this.$store.dispatch('user/changeChatListLength', this.chatClaudeList.length)
                    this.chatClaudeList[this.chatClaudeList.length - 1].timer = this.timerClaude
                    if (!localStorage.getItem('session_code7')) {
                        this.sessionRightNavCode = res.session_code
                    }

                    this.chatClaudeList.forEach(v => {
                        v.markedContent = marked(v.content, { renderer })
                    })
                    this.replyClaude = marked(this.replyClaude, { renderer })

                    this.tokenNumberClaude = {
                        completionTokens: res.completion_tokens, // 下行token
                        promptTokens: res.prompt_tokens, // 上行token
                        integral: res.integral, // 积分
                        totalTokens: res.total_tokens // 总tokes
                    }
                    this.chatClaudeList[this.chatClaudeList.length - 1].completion_tokens = res.completion_tokens
                    this.chatClaudeList[this.chatClaudeList.length - 1].prompt_tokens = res.prompt_tokens
                    this.chatClaudeList[this.chatClaudeList.length - 1].integral = res.integral
                    this.chatClaudeList[this.chatClaudeList.length - 1].total_tokens = res.total_tokens

                    // 保存最近使用
                    submitFootprint({
                        type_name: 'Claude',
                        type_code: 'chat',
                        title: this.oldSendValue,
                        eid: res.session_code
                    }).then(res => { })

                    this.$nextTick(() => {
                        let pres = document.getElementsByTagName('pre')
                        for (let a = 0; a < pres.length; a++) {
                            let spans = document.createElement('span')
                            spans.setAttribute('class', 'copy-code-button')
                            spans.addEventListener('click', (event) => {
                                var input = document.createElement("textarea"); // 创建input对象
                                input.value = event.target.previousElementSibling.innerText; // 设置复制内容
                                document.body.appendChild(input); // 添加临时实例
                                input.select(); // 选择实例内容
                                document.execCommand("Copy"); // 执行复制
                                document.body.removeChild(input); // 删除临时实例
                                this.$message.success('复制成功！');
                            })
                            spans.setAttribute('click', 'copyCodeButton')
                            pres[a].appendChild(spans)
                        }
                    })
                    // this.replyXunfei = marked(this.replyXunfei) // marked的转换
                }
                if (res.finish_reason == 'stop') {
                    this.sessionRightNavCode = res.session_code
                }
                if (res.role != '' && res.role != null) {
                    this.chatClaudeList[this.chatClaudeList.length - 1].role = res.role;
                }
            }

            /**
             * ChatGLM
             */
            if (res.chat_type == "8" && !this.isfinishChatGLM) {
                this.isTimeChatGLM = false;
                if (res != '' && res.content != null) {
                    this.chatChatGLMList[this.chatChatGLMList.length - 1].content = this.chatChatGLMList[this.chatChatGLMList.length - 1].content + res.content;

                    this.chatChatGLMList[this.chatChatGLMList.length - 1].markedContent = this.chatChatGLMList[this.chatChatGLMList.length - 1].content + res.content;
                    this.replyChatGLM = this.chatChatGLMList[this.chatChatGLMList.length - 1].content + res.content;

                    // this.replyChatGLM = marked(this.chatChatGLMList[this.chatChatGLMList.length-1].content + res.content);
                    // this.chatChatGLMList[this.chatChatGLMList.length-1].content = this.chatChatGLMList[this.chatChatGLMList.length-1].content + res.content;
                    // this.chatChatGLMList[this.chatChatGLMList.length-1].markedContent = marked(this.chatChatGLMList[this.chatChatGLMList.length-1].content + res.content);
                    // 定位到聊天最底部
                    this.toBottom();
                }
                if (res.session_code != '' && res.content != null) {
                    this.chatChatGLMList[this.chatChatGLMList.length - 1].session_code = res.session_code;
                    this.chatChatGLMList[this.chatChatGLMList.length - 2].session_code = res.session_code;
                    localStorage.setItem('session_code8', res.session_code);
                }
                if (res.create_time != '' && res.create_time != null) {
                    this.chatChatGLMList[this.chatChatGLMList.length - 1].create_time = res.create_time
                }
                if (res.chat_group_code != '' && res.chat_group_code != null) {
                    this.chatChatGLMList[this.chatChatGLMList.length - 1].chat_group_code = res.chat_group_code;
                    this.chatChatGLMList[this.chatChatGLMList.length - 2].chat_group_code = res.chat_group_code;
                    localStorage.setItem('chat_group_code8', res.chat_group_code);
                }
                if (res.finish_reason == 'stop') {
                    clearInterval(this.t_timeChatGLM);
                    this.t_timeChatGLM = null
                    this.isfinishChatGLM = true;
                    this.isBtnChatGLM = true;
                    // this.chatVipList[this.chatVipList.length-1].content = this.reply;
                    this.chatChatGLMList[this.chatChatGLMList.length - 1].finish_reason = res.finish_reason;
                    this.$store.dispatch('user/changeChatListLength', this.chatChatGLMList.length)
                    this.chatChatGLMList[this.chatChatGLMList.length - 1].timer = this.timerChatGLM
                    if (!localStorage.getItem('session_code8')) {
                        this.sessionRightNavCode = res.session_code
                    }
                    const renderer = new marked.Renderer();
                    // 重写代码块渲染方法，使用highlight.js进行代码高亮
                    renderer.code = (code, language) => {
                        const validLanguage = hljs.getLanguage(language) ? language : 'plaintext';
                        const highlightedCode = hljs.highlight(validLanguage, code).value;
                        return `<pre><code class="hljs ${validLanguage}">${highlightedCode}</code></pre>`;
                    };
                    this.chatChatGLMList.forEach(v => {
                        v.markedContent = marked(v.content, { renderer })
                    })
                    this.replyChatGLM = marked(this.replyChatGLM, { renderer })

                    this.tokenNumberChatGLM = {
                        completionTokens: res.completion_tokens, // 下行token
                        promptTokens: res.prompt_tokens, // 上行token
                        integral: res.integral, // 积分
                        totalTokens: res.total_tokens // 总tokes
                    }
                    this.chatChatGLMList[this.chatChatGLMList.length - 1].completion_tokens = res.completion_tokens
                    this.chatChatGLMList[this.chatChatGLMList.length - 1].prompt_tokens = res.prompt_tokens
                    this.chatChatGLMList[this.chatChatGLMList.length - 1].integral = res.integral
                    this.chatChatGLMList[this.chatChatGLMList.length - 1].total_tokens = res.total_tokens

                    // 保存最近使用
                    submitFootprint({
                        type_name: 'chatGLM',
                        type_code: 'chat',
                        title: this.oldSendValue,
                        eid: res.session_code
                    }).then(res => { })

                    this.$nextTick(() => {
                        let pres = document.getElementsByTagName('pre')
                        for (let a = 0; a < pres.length; a++) {
                            let spans = document.createElement('span')
                            spans.setAttribute('class', 'copy-code-button')
                            spans.addEventListener('click', (event) => {
                                var input = document.createElement("textarea"); // 创建input对象
                                input.value = event.target.previousElementSibling.innerText; // 设置复制内容
                                document.body.appendChild(input); // 添加临时实例
                                input.select(); // 选择实例内容
                                document.execCommand("Copy"); // 执行复制
                                document.body.removeChild(input); // 删除临时实例
                                this.$message.success('复制成功！');
                            })
                            spans.setAttribute('click', 'copyCodeButton')
                            pres[a].appendChild(spans)
                        }
                    })
                    // this.replyXunfei = marked(this.replyXunfei) // marked的转换
                }
                if (res.finish_reason == 'stop') {
                    this.sessionRightNavCode = res.session_code
                }
                if (res.role != '' && res.role != null) {
                    this.chatChatGLMList[this.chatChatGLMList.length - 1].role = res.role;
                }
            }

            /**
             * 通义千问
             */
            if (res.chat_type == "10" && !this.isfinishTongyi) {
                this.isTimeTongyi = false;
                if (res != '' && res.content != null) {
                    // this.replyTongyi = res.content;
                    // this.chatTongyiList[this.chatTongyiList.length-1].content = res.content;
                    // const renderer = new marked.Renderer();
                    //     // 重写代码块渲染方法，使用highlight.js进行代码高亮
                    //     renderer.code = (code, language) => {
                    //         const validLanguage = hljs.getLanguage(language) ? language : 'plaintext';
                    //         const highlightedCode = hljs.highlight(validLanguage, code).value;
                    //         return `<pre><code class="hljs ${validLanguage}">${highlightedCode}</code></pre>`;
                    //     };
                    this.chatTongyiList[this.chatTongyiList.length - 1].content = res.content;

                    this.chatTongyiList[this.chatTongyiList.length - 1].markedContent = res.content;
                    this.replyTongyi = res.content;
                    // 定位到聊天最底部
                    this.toBottom();
                }
                if (res.session_code != '' && res.content != null) {
                    this.chatTongyiList[this.chatTongyiList.length - 1].session_code = res.session_code;
                    this.chatTongyiList[this.chatTongyiList.length - 2].session_code = res.session_code;
                    localStorage.setItem('session_code10', res.session_code);
                }
                if (res.create_time != '' && res.create_time != null) {
                    this.chatTongyiList[this.chatTongyiList.length - 1].create_time = res.create_time
                }
                if (res.chat_group_code != '' && res.chat_group_code != null) {
                    this.chatTongyiList[this.chatTongyiList.length - 1].chat_group_code = res.chat_group_code;
                    this.chatTongyiList[this.chatTongyiList.length - 2].chat_group_code = res.chat_group_code;
                    localStorage.setItem('chat_group_code10', res.chat_group_code);
                }
                if (res.finish_reason == 'stop') {
                    clearInterval(this.t_timeTongyi);
                    this.t_timeTongyi = null
                    this.isfinishTongyi = true;
                    this.isBtnTongyi = true;
                    // this.chatVipList[this.chatVipList.length-1].content = this.reply;
                    this.chatTongyiList[this.chatTongyiList.length - 1].finish_reason = res.finish_reason;
                    this.$store.dispatch('user/changeChatListLength', this.chatTongyiList.length)
                    this.chatTongyiList[this.chatTongyiList.length - 1].timer = this.timerTongyi
                    if (!localStorage.getItem('session_code10')) {
                        this.sessionRightNavCode = res.session_code
                    }

                    this.chatTongyiList.forEach(v => {
                        v.markedContent = marked(v.content, { renderer })
                    })
                    this.replyTongyi = marked(this.replyTongyi, { renderer })

                    this.tokenNumberTongyi = {
                        completionTokens: res.completion_tokens, // 下行token
                        promptTokens: res.prompt_tokens, // 上行token
                        integral: res.integral, // 积分
                        totalTokens: res.total_tokens // 总tokes
                    }
                    this.chatTongyiList[this.chatTongyiList.length - 1].completion_tokens = res.completion_tokens
                    this.chatTongyiList[this.chatTongyiList.length - 1].prompt_tokens = res.prompt_tokens
                    this.chatTongyiList[this.chatTongyiList.length - 1].integral = res.integral
                    this.chatTongyiList[this.chatTongyiList.length - 1].total_tokens = res.total_tokens

                    // 保存最近使用
                    submitFootprint({
                        type_name: '通义千问',
                        type_code: 'chat',
                        title: this.oldSendValue,
                        eid: res.session_code
                    }).then(res => { })

                    this.$nextTick(() => {
                        let pres = document.getElementsByTagName('pre')
                        for (let a = 0; a < pres.length; a++) {
                            let spans = document.createElement('span')
                            spans.setAttribute('class', 'copy-code-button')
                            spans.addEventListener('click', (event) => {
                                var input = document.createElement("textarea"); // 创建input对象
                                input.value = event.target.previousElementSibling.innerText; // 设置复制内容
                                document.body.appendChild(input); // 添加临时实例
                                input.select(); // 选择实例内容
                                document.execCommand("Copy"); // 执行复制
                                document.body.removeChild(input); // 删除临时实例
                                this.$message.success('复制成功！');
                            })
                            spans.setAttribute('click', 'copyCodeButton')
                            pres[a].appendChild(spans)
                        }
                    })
                    // this.replyXunfei = marked(this.replyXunfei) // marked的转换
                }
                if (res.finish_reason == 'stop') {
                    this.sessionRightNavCode = res.session_code
                }
                if (res.role != '' && res.role != null) {
                    this.chatTongyiList[this.chatTongyiList.length - 1].role = res.role;
                }
            }

            /**
             * 商汤
             */
            if (res.chat_type == "11" && !this.isfinishShangtang) {
                this.isTimeShangtang = false;
                if (res != '' && res.content != null) {
                    // this.replyShangtang = this.chatShangtangList[this.chatShangtangList.length-1].content + res.content;
                    // this.chatShangtangList[this.chatShangtangList.length-1].content = this.chatShangtangList[this.chatShangtangList.length-1].content + res.content;
                    // const renderer = new marked.Renderer();
                    //     // 重写代码块渲染方法，使用highlight.js进行代码高亮
                    //     renderer.code = (code, language) => {
                    //         const validLanguage = hljs.getLanguage(language) ? language : 'plaintext';
                    //         const highlightedCode = hljs.highlight(validLanguage, code).value;
                    //         return `<pre><code class="hljs ${validLanguage}">${highlightedCode}</code></pre>`;
                    //     };
                    this.chatShangtangList[this.chatShangtangList.length - 1].content = this.chatShangtangList[this.chatShangtangList.length - 1].content + res.content;

                    this.chatShangtangList[this.chatShangtangList.length - 1].markedContent = this.chatShangtangList[this.chatShangtangList.length - 1].content + res.content;
                    this.replyShangtang = this.chatShangtangList[this.chatShangtangList.length - 1].content + res.content;

                    // 定位到聊天最底部
                    this.toBottom();
                }
                if (res.session_code != '' && res.content != null) {
                    this.chatShangtangList[this.chatShangtangList.length - 1].session_code = res.session_code;
                    this.chatShangtangList[this.chatShangtangList.length - 2].session_code = res.session_code;
                    localStorage.setItem('session_code11', res.session_code);
                }
                if (res.create_time != '' && res.create_time != null) {
                    this.chatShangtangList[this.chatShangtangList.length - 1].create_time = res.create_time
                }
                if (res.chat_group_code != '' && res.chat_group_code != null) {
                    this.chatShangtangList[this.chatShangtangList.length - 1].chat_group_code = res.chat_group_code;
                    this.chatShangtangList[this.chatShangtangList.length - 2].chat_group_code = res.chat_group_code;
                    localStorage.setItem('chat_group_code11', res.chat_group_code);
                }
                if (res.finish_reason == 'stop') {
                    clearInterval(this.t_timeShangtang);
                    this.t_timeShangtang = null
                    this.isfinishShangtang = true;
                    this.isBtnShangtang = true;
                    // this.chatVipList[this.chatVipList.length-1].content = this.reply;
                    this.chatShangtangList[this.chatShangtangList.length - 1].finish_reason = res.finish_reason;
                    this.$store.dispatch('user/changeChatListLength', this.chatShangtangList.length)
                    this.chatShangtangList[this.chatShangtangList.length - 1].timer = this.timerShangtang
                    if (!localStorage.getItem('session_code11')) {
                        this.sessionRightNavCode = res.session_code
                    }

                    this.chatShangtangList.forEach(v => {
                        v.markedContent = marked(v.content, { renderer })
                    })
                    this.replyShangtang = marked(this.replyShangtang, { renderer })

                    this.tokenNumberShangtang = {
                        completionTokens: res.completion_tokens, // 下行token
                        promptTokens: res.prompt_tokens, // 上行token
                        integral: res.integral, // 积分
                        totalTokens: res.total_tokens // 总tokes
                    }
                    this.chatShangtangList[this.chatShangtangList.length - 1].completion_tokens = res.completion_tokens
                    this.chatShangtangList[this.chatShangtangList.length - 1].prompt_tokens = res.prompt_tokens
                    this.chatShangtangList[this.chatShangtangList.length - 1].integral = res.integral
                    this.chatShangtangList[this.chatShangtangList.length - 1].total_tokens = res.total_tokens

                    // 保存最近使用
                    submitFootprint({
                        type_name: '商汤日日新',
                        type_code: 'chat',
                        title: this.oldSendValue,
                        eid: res.session_code
                    }).then(res => { })

                    this.$nextTick(() => {
                        let pres = document.getElementsByTagName('pre')
                        for (let a = 0; a < pres.length; a++) {
                            let spans = document.createElement('span')
                            spans.setAttribute('class', 'copy-code-button')
                            spans.addEventListener('click', (event) => {
                                var input = document.createElement("textarea"); // 创建input对象
                                input.value = event.target.previousElementSibling.innerText; // 设置复制内容
                                document.body.appendChild(input); // 添加临时实例
                                input.select(); // 选择实例内容
                                document.execCommand("Copy"); // 执行复制
                                document.body.removeChild(input); // 删除临时实例
                                this.$message.success('复制成功！');
                            })
                            spans.setAttribute('click', 'copyCodeButton')
                            pres[a].appendChild(spans)
                        }
                    })
                    // this.replyXunfei = marked(this.replyXunfei) // marked的转换
                }
                if (res.finish_reason == 'stop') {
                    this.sessionRightNavCode = res.session_code
                }
                if (res.role != '' && res.role != null) {
                    this.chatShangtangList[this.chatShangtangList.length - 1].role = res.role;
                }
            }

            /**
             *360
             */
            if (res.chat_type == "12" && !this.isfinish360) {
                this.isTime360 = false;
                if (res != '' && res.content != null) {
                    // this.reply360 = this.chatShangtangList[this.chatShangtangList.length-1].content + res.content;
                    // this.chatShangtangList[this.chatShangtangList.length-1].content = this.chatShangtangList[this.chatShangtangList.length-1].content + res.content;
                    // const renderer = new marked.Renderer();
                    //     // 重写代码块渲染方法，使用highlight.js进行代码高亮
                    //     renderer.code = (code, language) => {
                    //         const validLanguage = hljs.getLanguage(language) ? language : 'plaintext';
                    //         const highlightedCode = hljs.highlight(validLanguage, code).value;
                    //         return `<pre><code class="hljs ${validLanguage}">${highlightedCode}</code></pre>`;
                    //     };
                    this.chat360List[this.chat360List.length - 1].content = this.chat360List[this.chat360List.length - 1].content + res.content;

                    this.chat360List[this.chat360List.length - 1].markedContent = this.chat360List[this.chat360List.length - 1].content + res.content;
                    this.reply360 = this.chat360List[this.chat360List.length - 1].content + res.content;

                    // 定位到聊天最底部
                    this.toBottom();
                }
                if (res.session_code != '' && res.content != null) {
                    this.chat360List[this.chat360List.length - 1].session_code = res.session_code;
                    this.chat360List[this.chat360List.length - 2].session_code = res.session_code;
                    localStorage.setItem('session_code11', res.session_code);
                }
                if (res.create_time != '' && res.create_time != null) {
                    this.chat360List[this.chat360List.length - 1].create_time = res.create_time
                }
                if (res.chat_group_code != '' && res.chat_group_code != null) {
                    this.chat360List[this.chat360List.length - 1].chat_group_code = res.chat_group_code;
                    this.chat360List[this.chat360List.length - 2].chat_group_code = res.chat_group_code;
                    localStorage.setItem('chat_group_code11', res.chat_group_code);
                }
                if (res.finish_reason == 'stop') {
                    clearInterval(this.t_time360);
                    this.t_time360 = null
                    this.isfinish360 = true;
                    this.isBtn360 = true;
                    // this.chatVipList[this.chatVipList.length-1].content = this.reply;
                    this.chat360List[this.chat360List.length - 1].finish_reason = res.finish_reason;
                    this.$store.dispatch('user/changeChatListLength', this.chat360List.length)
                    this.chat360List[this.chat360List.length - 1].timer = this.timer360
                    if (!localStorage.getItem('session_code11')) {
                        this.sessionRightNavCode = res.session_code
                    }

                    this.chat360List.forEach(v => {
                        v.markedContent = marked(v.content, { renderer })
                    })
                    this.reply360 = marked(this.reply360, { renderer })

                    this.tokenNumber360 = {
                        completionTokens: res.completion_tokens, // 下行token
                        promptTokens: res.prompt_tokens, // 上行token
                        integral: res.integral, // 积分
                        totalTokens: res.total_tokens // 总tokes
                    }
                    this.chat360List[this.chat360List.length - 1].completion_tokens = res.completion_tokens
                    this.chat360List[this.chat360List.length - 1].prompt_tokens = res.prompt_tokens
                    this.chat360List[this.chat360List.length - 1].integral = res.integral
                    this.chat360List[this.chat360List.length - 1].total_tokens = res.total_tokens

                    // 保存最近使用
                    submitFootprint({
                        type_name: '商汤日日新',
                        type_code: 'chat',
                        title: this.oldSendValue,
                        eid: res.session_code
                    }).then(res => { })

                    this.$nextTick(() => {
                        let pres = document.getElementsByTagName('pre')
                        for (let a = 0; a < pres.length; a++) {
                            let spans = document.createElement('span')
                            spans.setAttribute('class', 'copy-code-button')
                            spans.addEventListener('click', (event) => {
                                var input = document.createElement("textarea"); // 创建input对象
                                input.value = event.target.previousElementSibling.innerText; // 设置复制内容
                                document.body.appendChild(input); // 添加临时实例
                                input.select(); // 选择实例内容
                                document.execCommand("Copy"); // 执行复制
                                document.body.removeChild(input); // 删除临时实例
                                this.$message.success('复制成功！');
                            })
                            spans.setAttribute('click', 'copyCodeButton')
                            pres[a].appendChild(spans)
                        }
                    })
                    // this.replyXunfei = marked(this.replyXunfei) // marked的转换
                }
                if (res.finish_reason == 'stop') {
                    this.sessionRightNavCode = res.session_code
                }
                if (res.role != '' && res.role != null) {
                    this.chat360List[this.chat360List.length - 1].role = res.role;
                }
            }
        },

        // 快速选择问题,热词推荐
        selectQs(val) {
            this.sendValue = val
        },

        // 复制服务信息
        copyText(val) {
            var input = document.createElement("textarea"); // 创建input对象
            input.value = val; // 设置复制内容
            document.body.appendChild(input); // 添加临时实例
            input.select(); // 选择实例内容
            document.execCommand("Copy"); // 执行复制
            document.body.removeChild(input); // 删除临时实例
            this.$message.success('复制成功！');
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
            // console.log(item);
            if (bool && (num == 1 || num == 3 || num == 5 || num == 7 || num == 9 || num == 11 || num == 13 || num == 15)) {
                chatLikes({
                    "is_likes": 1,
                    "session_code": item.session_code,
                    "chat_group_code": item.chat_group_code
                })
            } else if (bool && (num == 2 || num == 4 || num == 6 || num == 8 || num == 10 || num == 12 || num == 14 || num == 16)) {
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

            if (num == 1) { // GPT35
                for (let i = 0; i < this.chatList.length; i++) {
                    if (this.chatList[i].id == item.id && this.chatList[i].session_code == item.session_code && this.chatList[i].chat_group_code == item.chat_group_code) {
                        this.chatList[i].help = false
                        this.chatList[i].stepOn = false
                        this.chatList[i].help = bool
                        this.chatList[i].is_likes = bool ? 1 : 0
                    }
                }
            } else if (num == 2) { // GPT35
                for (let i = 0; i < this.chatList.length; i++) {
                    if (this.chatList[i].id == item.id && this.chatList[i].session_code == item.session_code && this.chatList[i].chat_group_code == item.chat_group_code) {
                        this.chatList[i].help = false
                        this.chatList[i].stepOn = false
                        this.chatList[i].stepOn = bool
                        this.chatList[i].is_likes = bool ? 2 : 0
                    }
                }
            } else if (num == 3) { // GPT40
                for (let i = 0; i < this.chatVipList.length; i++) {
                    if (this.chatVipList[i].id == item.id && this.chatVipList[i].session_code == item.session_code && this.chatVipList[i].chat_group_code == item.chat_group_code) {
                        this.chatVipList[i].help = false
                        this.chatVipList[i].stepOn = false
                        this.chatVipList[i].help = bool
                        this.chatVipList[i].is_likes = bool ? 1 : 0
                    }
                }
            } else if (num == 4) { // GPT40
                for (let i = 0; i < this.chatVipList.length; i++) {
                    if (this.chatVipList[i].id == item.id && this.chatVipList[i].session_code == item.session_code && this.chatVipList[i].chat_group_code == item.chat_group_code) {
                        this.chatVipList[i].help = false
                        this.chatVipList[i].stepOn = false
                        this.chatVipList[i].stepOn = bool
                        this.chatVipList[i].is_likes = bool ? 2 : 0
                    }
                }
            } else if (num == 5) { // GPT40
                for (let i = 0; i < this.chatYiyanList.length; i++) {
                    if (this.chatYiyanList[i].id == item.id && this.chatYiyanList[i].session_code == item.session_code && this.chatYiyanList[i].chat_group_code == item.chat_group_code) {
                        this.chatYiyanList[i].help = false
                        this.chatYiyanList[i].stepOn = false
                        this.chatYiyanList[i].help = bool
                        this.chatYiyanList[i].is_likes = bool ? 1 : 0
                    }
                }
            } else if (num == 6) { // GPT40
                for (let i = 0; i < this.chatYiyanList.length; i++) {
                    if (this.chatYiyanList[i].id == item.id && this.chatYiyanList[i].session_code == item.session_code && this.chatYiyanList[i].chat_group_code == item.chat_group_code) {
                        this.chatYiyanList[i].help = false
                        this.chatYiyanList[i].stepOn = false
                        this.chatYiyanList[i].stepOn = bool
                        this.chatYiyanList[i].is_likes = bool ? 2 : 0
                    }
                }
            } else if (num == 7) { // GPT40
                for (let i = 0; i < this.chatXunfeiList.length; i++) {
                    if (this.chatXunfeiList[i].id == item.id && this.chatXunfeiList[i].session_code == item.session_code && this.chatXunfeiList[i].chat_group_code == item.chat_group_code) {
                        this.chatXunfeiList[i].help = false
                        this.chatXunfeiList[i].stepOn = false
                        this.chatXunfeiList[i].help = bool
                        this.chatXunfeiList[i].is_likes = bool ? 1 : 0
                    }
                }
            } else if (num == 8) { // GPT40
                for (let i = 0; i < this.chatXunfeiList.length; i++) {
                    if (this.chatXunfeiList[i].id == item.id && this.chatXunfeiList[i].session_code == item.session_code && this.chatXunfeiList[i].chat_group_code == item.chat_group_code) {
                        this.chatXunfeiList[i].help = false
                        this.chatXunfeiList[i].stepOn = false
                        this.chatXunfeiList[i].stepOn = bool
                        this.chatXunfeiList[i].is_likes = bool ? 2 : 0
                    }
                }
            } else if (num == 9) { // GPT40
                for (let i = 0; i < this.chatClaudeList.length; i++) {
                    if (this.chatClaudeList[i].id == item.id && this.chatClaudeList[i].session_code == item.session_code && this.chatClaudeList[i].chat_group_code == item.chat_group_code) {
                        this.chatClaudeList[i].help = false
                        this.chatClaudeList[i].stepOn = false
                        this.chatClaudeList[i].help = bool
                        this.chatClaudeList[i].is_likes = bool ? 1 : 0
                    }
                }
            } else if (num == 10) { // GPT40
                for (let i = 0; i < this.chatClaudeList.length; i++) {
                    if (this.chatClaudeList[i].id == item.id && this.chatClaudeList[i].session_code == item.session_code && this.chatClaudeList[i].chat_group_code == item.chat_group_code) {
                        this.chatClaudeList[i].help = false
                        this.chatClaudeList[i].stepOn = false
                        this.chatClaudeList[i].stepOn = bool
                        this.chatClaudeList[i].is_likes = bool ? 2 : 0
                    }
                }
            } else if (num == 11) { // GPT40
                for (let i = 0; i < this.chatChatGLMList.length; i++) {
                    if (this.chatChatGLMList[i].id == item.id && this.chatChatGLMList[i].session_code == item.session_code && this.chatChatGLMList[i].chat_group_code == item.chat_group_code) {
                        this.chatChatGLMList[i].help = false
                        this.chatChatGLMList[i].stepOn = false
                        this.chatChatGLMList[i].help = bool
                        this.chatChatGLMList[i].is_likes = bool ? 1 : 0
                    }
                }
            } else if (num == 12) { // GPT40
                for (let i = 0; i < this.chatChatGLMList.length; i++) {
                    if (this.chatChatGLMList[i].id == item.id && this.chatChatGLMList[i].session_code == item.session_code && this.chatChatGLMList[i].chat_group_code == item.chat_group_code) {
                        this.chatChatGLMList[i].help = false
                        this.chatChatGLMList[i].stepOn = false
                        this.chatChatGLMList[i].stepOn = bool
                        this.chatChatGLMList[i].is_likes = bool ? 2 : 0
                    }
                }
            } else if (num == 13) { // GPT40
                for (let i = 0; i < this.chatTongyiList.length; i++) {
                    if (this.chatTongyiList[i].id == item.id && this.chatTongyiList[i].session_code == item.session_code && this.chatTongyiList[i].chat_group_code == item.chat_group_code) {
                        this.chatTongyiList[i].help = false
                        this.chatTongyiList[i].stepOn = false
                        this.chatTongyiList[i].help = bool
                        this.chatTongyiList[i].is_likes = bool ? 1 : 0
                    }
                }
            } else if (num == 14) { // GPT40
                for (let i = 0; i < this.chatTongyiList.length; i++) {
                    if (this.chatTongyiList[i].id == item.id && this.chatTongyiList[i].session_code == item.session_code && this.chatTongyiList[i].chat_group_code == item.chat_group_code) {
                        this.chatTongyiList[i].help = false
                        this.chatTongyiList[i].stepOn = false
                        this.chatTongyiList[i].stepOn = bool
                        this.chatTongyiList[i].is_likes = bool ? 2 : 0
                    }
                }
            } else if (num == 15) { // GPT40
                for (let i = 0; i < this.chatShangtangList.length; i++) {
                    if (this.chatShangtangList[i].id == item.id && this.chatShangtangList[i].session_code == item.session_code && this.chatShangtangList[i].chat_group_code == item.chat_group_code) {
                        this.chatShangtangList[i].help = false
                        this.chatShangtangList[i].stepOn = false
                        this.chatShangtangList[i].help = bool
                        this.chatShangtangList[i].is_likes = bool ? 1 : 0
                    }
                }
            } else if (num == 16) { // GPT40
                for (let i = 0; i < this.chatShangtangList.length; i++) {
                    if (this.chatShangtangList[i].id == item.id && this.chatShangtangList[i].session_code == item.session_code && this.chatShangtangList[i].chat_group_code == item.chat_group_code) {
                        this.chatShangtangList[i].help = false
                        this.chatShangtangList[i].stepOn = false
                        this.chatShangtangList[i].stepOn = bool
                        this.chatShangtangList[i].is_likes = bool ? 2 : 0
                    }
                }
            }
        },

        // 切换为ai40
        toChatFouty() {
            // this.controller.abort()
            // this.isfinish = true
            if (this.chat_type == 0) {
                // this.controllerThreeFive.abort()
                clearInterval(this.t_timeThreeFive)
                this.t_timeThreeFive = null;
                this.isfinishThreeFive = true;
                this.isBtnThreeFive = true
                this.chatList[this.chatList.length - 1].timer = this.timerThreeFive
            } else if (this.chat_type == 1) {
                clearInterval(this.t_timeFourZero)
                this.t_timeFourZero = null
                // this.controllerFourZreo.abort()
                this.isBtnFourZero = true
                this.isfinishFourZero = true;
                this.chatVipList[this.chatVipList.length - 1].timer = this.timerFourZero
            } else if (this.chat_type == 4) {
                clearInterval(this.t_timeYiyan)
                this.t_timeYiyan = null
                // this.controllerFourZreo.abort()
                this.isBtnYiyan = true
                this.isfinishYiyan = true;
                this.chatYiyanList[this.chatYiyanList.length - 1].timer = this.timerYiyan
            } else if (this.chat_type == 5) {
                clearInterval(this.t_timeXunfei)
                this.t_timeXunfei = null
                // this.controllerFourZreo.abort()
                this.isBtnXunfei = true
                this.isfinishXunfei = true;
                this.chatXunfeiList[this.chatXunfeiList.length - 1].timer = this.timerXunfei
            } else if (this.chat_type == 7) {
                clearInterval(this.t_timeClaude)
                this.t_timeClaude = null
                // this.controllerFourZreo.abort()
                this.isBtnClaude = true
                this.isfinishClaude = true;
                this.chatClaudeList[this.chatClaudeList.length - 1].timer = this.timerClaude
            } else if (this.chat_type == 8) {
                clearInterval(this.t_timeChatGLM)
                this.t_timeChatGLM = null
                // this.controllerFourZreo.abort()
                this.isBtnChatGLM = true
                this.isfinishChatGLM = true;
                this.chatChatGLMList[this.chatChatGLMList.length - 1].timer = this.timerChatGLM
            } else if (this.chat_type == 10) {
                clearInterval(this.t_timeTongyi)
                this.t_timeTongyi = null
                // this.controllerFourZreo.abort()
                this.isBtnTongyi = true
                this.isfinishTongyi = true;
                this.chatTongyiList[this.chatTongyiList.length - 1].timer = this.timerTongyi
            } else if (this.chat_type == 11) {
                clearInterval(this.t_timeShangtang)
                this.t_timeShangtang = null
                // this.controllerFourZreo.abort()
                this.isBtnShangtang = true
                this.isfinishShangtang = true;
                this.chatShangtangList[this.chatShangtangList.length - 1].timer = this.timerShangtang
            } else if (this.chat_type == 12) {
                clearInterval(this.t_time360)
                this.t_time360 = null
                // this.controllerFourZreo.abort()
                this.isBtn360 = true
                this.isfinish360 = true;
                this.chat360List[this.chat360List.length - 1].timer = this.timer360
            }
            // this.endController()
            if (this.chat_type == 0) {
                this.sendValue = this.chatList[this.chatList.length - 2].content
            } else if (this.chat_type == 4) {
                this.sendValue = this.chatYiyanList[this.chatYiyanList.length - 2].content
            } else if (this.chat_type == 5) {
                this.sendValue = this.chatXunfeiList[this.chatXunfeiList.length - 2].content
            } else if (this.chat_type == 7) {
                this.sendValue = this.chatClaudeList[this.chatClaudeList.length - 2].content
            } else if (this.chat_type == 8) {
                this.sendValue = this.chatChatGLMList[this.chatChatGLMList.length - 2].content
            } else if (this.chat_type == 10) {
                this.sendValue = this.chatTongyiList[this.chatTongyiList.length - 2].content
            } else if (this.chat_type == 11) {
                this.sendValue = this.chatShangtangList[this.chatShangtangList.length - 2].content
            } else if (this.chat_type == 12) {
                this.sendValue = this.chat360List[this.chat360List.length - 2].content
            }
            this.timerFourZero = 0
            this.AIname = 1
            this.chat_type = 1
            this.ordeAIList = []
            if (!this.isfinishFourZero) {
                this.$message('当前问题还没回答完毕，请稍后再提问！')
                return
            }
            this.sendMsg('toChatFouty')
        },

        // 指令集的回调
        useingTemplate(item) {
            this.isShowTemplateSelte = false
            this.sendValue = item.prompts_name
        },

        // 换一批模板
        refresh() {
            this.queryQuestionSetRecommend()
        },

        // 更多模板
        showMore() {
            this.$router.push('/templateSelect/templateSelect')
            this.$store.dispatch('user/changeRouterIndex', 3)
        },

        // 关闭推荐
        closeRecommend() {
            this.isShowTemplate = false
        },


        // 下载快捷方式
        downloadImage(a, b) {
            var d = '' + a + b;
            var e = '[InternetShortcut]' + '\n' + 'URL=' + location.href;
            this.saveToDesktop(d, e);
        },

        saveToDesktop(fileName, data) {
            var explorer = navigator.userAgent.toLowerCase();
            if (explorer.indexOf("trident") > 0) {//IE 5+
                var wss = new ActiveXObject("WScript.Shell");
                var desktopUrl = wss.SpecialFolders("Desktop");
                var fso = new ActiveXObject("Scripting.FileSystemObject");
                var tf = fso.CreateTextFile(desktopUrl + "\\" + fileName, true);
                tf.Write(data);
                tf.Close();
            } else {//fireFox chrome
                var urlObj = window.URL || window.webkitURL || window;
                var blob = new Blob([data]);
                var link = document.createElementNS("http://www.w3.org/1999/xhtml", "a")
                link.href = urlObj.createObjectURL(blob);
                link.download = fileName;
                saveClick(link);
            }

            function saveClick(obj) {
                var e = document.createEvent("MouseEvents");
                e.initMouseEvent(
                    "click", true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null
                );
                obj.dispatchEvent(e);
            }
        },

        codeHandleChange(res) {
            // if (response.status == '400') {
            if (this.chat_type == 0) {
                this.isTimeThreeFive = false;
                this.isBtnThreeFive = true
                this.isfinishThreeFive = true; // 完成打字效果
                clearInterval(this.t_timeThreeFive)
                this.t_timeThreeFive = null
            } else if (this.chat_type == 1) {
                this.isBtnFourZero = true
                this.isTimeFourZero = false
                clearInterval(this.t_timeFourZero)
                this.t_timeFourZero = null
                this.isfinishFourZero = true; // 完成打字效果
            } else if (this.chat_type == 4) {
                this.isBtnYiyan = true
                this.isTimeYiyan = false
                clearInterval(this.t_timeYiyan)
                this.t_timeYiyan = null
                this.isfinishYiyan = true; // 完成打字效果
            } else if (this.chat_type == 5) {
                this.isBtnXunfei = true
                this.isTimeXunfei = false
                clearInterval(this.t_timeXunfei)
                this.t_timeXunfei = null
                this.isfinishXunfei = true; // 完成打字效果
            } else if (this.chat_type == 7) {
                this.isBtnClaude = true
                this.isTimeClaude = false
                clearInterval(this.t_timeClaude)
                this.t_timeClaude = null
                this.isfinishClaude = true; // 完成打字效果
            } else if (this.chat_type == 8) {
                this.isBtnChatGLM = true
                this.isTimeChatGLM = false
                clearInterval(this.t_timeChatGLM)
                this.t_timeChatGLM = null
                this.isfinishChatGLM = true; // 完成打字效果
            } else if (this.chat_type == 10) {
                this.isBtnTongyi = true
                this.isTimeTongyi = false
                clearInterval(this.t_timeTongyi)
                this.t_timeTongyi = null
                this.isfinishTongyi = true; // 完成打字效果
            } else if (this.chat_type == 11) {
                this.isBtnShangtang = true
                this.isTimeShangtang = false
                clearInterval(this.t_timeShangtang)
                this.t_timeShangtang = null
                this.isfinishShangtang = true; // 完成打字效果
            } else if (this.chat_type == 12) {
                this.isBtn360 = true
                this.isTime360 = false
                clearInterval(this.t_time360)
                this.t_time360 = null
                this.isfinish360 = true; // 完成打字效果
            }

            if (Number(res.code) == 40013) {
                this.$refs.Register.registerVisible = true
                this.$store.dispatch('user/GuessLogin')
            }
            if ((Number(res.code) == 30014 || Number(res.code) == 40022) && this.loginInfo.role == 'guess') {
                this.queryErrorMsg = res.msg
                this.$refs.Register.registerVisible = true
            } else if ((Number(res.code) == 30014 || Number(res.code) == 40022) && this.loginInfo.role == 'user') {
                this.isuser = false
                this.queryErrorMsg = res.msg
            } else if (Number(res.code) == 40015) {
                this.isFoulLanguage = true
                this.queryErrorMsg = res.msg
            } else {
                if (Number(res.code) < 50000 && Number(res.code) != 40022 && Number(res.code) != 30014) {
                    this.$message.error(res.msg)
                } else if (Number(res.code) != 40022 && Number(res.code) != 30014) {
                    this.$message({
                        message: '网络异常,请稍后重试',
                        type: 'success',
                        duration: 2000
                    })
                }
            }
        },

        sendMsg2() {
            if (!this.isShowassociation || this.association != '') {
                this.$message({
                    type: 'info',
                    message: '当前问题还没回答完毕，请稍后再提问！'
                })
            } else {
                this.$message({
                    type: 'info',
                    message: '请选择是否关联'
                })
            }
            // this.$message({
            //     type: 'info',
            //     message: '当前问题还没回答完毕，请稍后再提问！'
            // })
        },

        // 获取推荐问题集
        queryQuestionSetRecommend() {
            questionSetRecommend().then(res => {
                this.qsList = []
                this.qsList.push(res.data[0])
                this.qsList.push(res.data[1])
                this.qsList.push(res.data[2])
            })
        },

        resetMarkedRenderer() {
            const renderer = new marked.Renderer();
            // 重写代码块渲染方法，使用highlight.js进行代码高亮
            renderer.code = (code, language) => {
                const validLanguage = hljs.getLanguage(language) ? language : 'plaintext';
                const highlightedCode = hljs.highlight(validLanguage, code).value;
                return `<pre><code class="hljs ${validLanguage}">${highlightedCode}</code></pre>`;
            };
            return renderer
        },
    }
}
</script>

<style scoped>
.model-price {
    font-size: 12px;
    margin-top: 10px;
}

.bigModel {
    width: 76px;
    height: 100%;
    background-color: #F1F2F5;
    position: absolute;
    top: -28px;
    padding: 0px 20px;
}

.bigModel .model-item {
    background-color: white;
    border-radius: 8px;
    width: 76px;
    height: 76px;
    flex-shrink: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 15px;
}

.bigModel .model-item img {
    width: 35px;
    height: 35px;
}

#chatCont::-webkit-scrollbar {
    height: 10px;
    width: 3px;
}

#chatCont::-webkit-scrollbar {
    background-color: #f9f9f9;
}

#chatCont::-webkit-scrollbar-thumb {
    border-radius: 4px;
    background-color: #dedede;
}

.footer-inp_img {
    width: calc(100% - 140px);
    position: relative;
}

.association_class {
    position: absolute;
    left: 10px;
    top: -34px;
    z-index: 2;
    font-size: 24px;
}

.upload-file_image {
    height: 80px;
    margin-top: 20px;
    display: flex;
    align-items: center;
}

.upload-file_image .img {
    height: 80px;
    border: 1px solid #E5E5E5;
    border-right: none;
    border-radius: 4px 0 0 4px;
}

.upload-file_image .clear_img {
    padding: 0 10px;
    border: 1px solid #E5E5E5;
    font-size: 18px;
    line-height: 80px;
    height: 80px;
    font-weight: bold;
    text-align: center;
    border-radius: 0 4px 4px 0;
    cursor: pointer;
}

.model_list {
    margin: 10px 0 10px 16px;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.model_list .title {
    color: #333;
    font-size: 16px;
    font-weight: 500;
    margin: 20px 0 20px 0;
}

@media (height >=780px) {
    .footer_qs .qs_text {
        height: 295px;
        overflow-y: auto;
    }
}

@media (height < 780px) and (height >=690px) {
    .footer_qs .qs_text {
        height: 211px;
        overflow-y: auto;
    }
}

@media (height < 690px) {
    .footer_qs .qs_text {
        height: 121px;
        overflow-y: auto;
    }
}

.qs_text {
    display: flex;
    flex-wrap: wrap;
    padding: 10px 0;
    justify-content: space-between;
}

.qs_line {
    margin-bottom: 10px;
    padding: 20px;
    border-radius: 6px;
    font-weight: 400;
    font-size: 14px;
    height: 38px;
    color: #78829A;
    cursor: pointer;
    background-color: #FFFFFF;
}

.qs_line-item {
    -webkit-line-clamp: 2;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
}

.qs_line:hover {
    color: #FFFFFF;
    background: #1F64FF;
}

.prompt {
    color: #AAB2C8;
    font-size: 14px;
    font-weight: 400;
    margin-top: 10px;
}

.content {
    width: calc(100% - 256px);
    height: calc(100% - 22px);
    display: flex;
    flex-direction: column;
    margin-left: 400px;
    transition: width .2s;
    position: relative;
}

.footer_cont {
    /* background: #fff; */
    width: calc(100% - 80px);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 20px 0 10px 20px;
    position: relative;
    margin-left: 20px;
}

.footer_qs {
    width: 100%;
    /* width: calc(100% - 240px); */
    display: flex;
    justify-content: center;
    margin-top: 30px;
    /* position: absolute; */
    /* top: 50%;
        transform: translateX(-50%) translateY(-50%); */
    /* left: calc(50% + 120px); */
}

.footer_qs .mask {
    width: 70%;
}

.qs_top {
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 10px 0;
    width: 100%;
}

.top_left {
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 150%;
    color: #000;
    margin-right: 16px;

}

.top_right {
    display: flex;
    cursor: pointer;
    align-items: center;
    color: #1F64FF;
}

.top_text {
    font-style: normal;
    font-weight: 400;
    font-size: 12px;
    line-height: 150%;
    margin-left: 5px;
    color: #1F64FF;
}

.cont {
    width: 100%;
    padding: 6px 0;
    background: #fff;
    border-radius: 10px;
    display: flex;
    align-items: center;
    position: relative;
}

.cg-chat-content {
    width: calc(100% - 120px);
    flex: 1;
    padding: 20px 60px;
    margin: auto;
    overflow: auto;
    padding-top: 0;

}

.cg-chatbox {
    border-radius: 5px;
    position: relative;
    padding: 20px 20px 20px 20px;
    word-break: break-all;
    word-wrap: break-word;
}

.cg-chatbox-left {
    border: 1px solid #FFFFFF;
    display: inline-block;
    background: #FFFFFF;
    border-radius: 8px;
    color: #333;
    /* width: 100%; */
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
    justify-content: flex-start;
}

.cg-user-pic {
    width: 40px;
    height: 40px;
    flex-shrink: 0;
    display: block;
    border-radius: 50%;
}

.cg-left {
    margin-right: 15px;
}

.cg-right {
    margin-right: 15px;
}

.cg-chat-right-on {
    justify-content: flex-start;
}

.reply {
    font-size: 16px;
    line-height: 20px;
    letter-spacing: 1px;
    /* white-space: pre-wrap; */
}

.left_tip {
    font-size: 16px;
    color: #333;
    font-weight: 600;
    line-height: 20px;
    /* 设置字间距 */
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

.as-cont-left {
    max-width: 80%;
    text-align: left;
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

.textarea-btn {
    background-color: #FFFFFF;
    height: calc(100%);
    width: 140px;
    display: flex;
    align-items: flex-end;
    position: relative;
    /* border: 2px solid #1F64FF; */
    /* border-left: none; */
    border-radius: 0 10px 10px 0;
}

.textarea-btn .mask {
    display: flex;
    /* margin-bottom: 10px; */
    align-items: center;
    /* height: 100%; */
    width: 90%;
    justify-content: space-between;
}

.send_img {
    width: 70px;
    height: 38px;
    /* position: absolute; */
    /* right: 10px;
      top: 50%; */
    /* transform: translateY(-50%); */
    padding: 8px 20px;
    border: none;
    background-color: #1f64ff;
}

.help-setpon {
    display: flex;
    flex-wrap: nowrap;
    margin-top: 5px;
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
    cursor: pointer;
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


.reset_request {
    font-size: 14px;
    line-height: 150%;
    color: #1F64FF;
    border: 1px solid #1F64FF;
    border-radius: 3px;
    width: 95px;
    padding: 5px 0;
    margin-top: 15px;
    text-align: center;
    cursor: pointer;
    margin-right: 20px;
}

.reset_request:hover {
    color: #1F64FF;
    background: rgba(31, 100, 255, 0.1);
    border: 1px solid rgba(31, 100, 255, 0.1);
}

.chat-dialog-footer {
    background-color: #1F64FF;
    color: #FFFFFF;
    padding: 6px 12px;
    font-size: 14px;
    border-radius: 4px;
    cursor: pointer;
}

.query-reset_request {
    padding: 5px;
    margin-left: 55px;
}

.left_tip-content {
    font-size: 14px;
    color: #7EA6FC;
}
</style>

<style scoped>
.chat-text-textarea {
    display: flex;
    align-items: center;
}

.chat-text-textarea textarea {
    background-color: #FFFFFF;
    border: none;
    min-height: 31px !important;
    /* height: 38px; */
}

.chat-text-textarea textarea::-webkit-scrollbar {
    width: 3px;
}

.chat-text-textarea textarea::-webkit-scrollbar-thumb {
    background-color: #f2f2f2;
}

.chat-text-textarea {
    /* border: 2px solid #1F64FF; */
    border-left: none;
    border-right: 1px solid #FFFFFF;
    height: var(--a);
    width: calc(100%);
}

.onceClassName {
    border-top-left-radius: 0 !important;
}

.onceClassNameRight {
    border-top-right-radius: 0 !important;
}

.chat-select-aiName {
    width: 136px;
    height: var(--a) !important;
    border: 2px solid #1F64FF;
    border-right: none;
    border-top-left-radius: 10px;
    border-bottom-left-radius: 10px;
}

.chat-select-aiName input {
    height: var(--a) !important;
    font-weight: 400;
    color: #666666;
    font-size: 14px;
    padding: 20px;
    border-radius: 10px 0 0 10px;
    border: none;
    border-right: 1px solid #FFFFFF;
}

.content .el-input__inner {
    background: #F5F6FA;
    border-radius: 10px;
    height: 58px;
    font-size: 16px;
    padding-left: 30px;
}

.model_list .ai-btn-list {
    border: none;
    border-radius: 0;
    font-size: 14px;
    padding: 8px 12px;
    background-color: #FFFFFF;
    text-align: center;
    margin-left: 0;
    position: relative;
    margin: auto;
}

.upload-demo-chat {
    position: absolute;
    bottom: calc(var(--a) + 10px);
    right: 90px;
}

.upload-demo-chat-on {
    bottom: calc(90px + var(--a));
}

.draw_image-class_dark .el-dialog {
    border-radius: 4px;
    top: 50%;
    left: 50%;
    transform: translateY(-50%) translateX(-50%);
    /* max-height: 800px;
  min-height: 500px; */
    background-color: transparent;
    box-shadow: 0 0 0 transparent;
    margin: 0 !important;
    display: flex;
    justify-content: center;
    /* width: auto; */
}

.draw_image-class_dark .el-dialog__headerbtn {
    display: none;
}

.draw_image-class_dark .el-dialog__header {
    display: none;
}

.draw_image-class_dark .el-dialog__body {
    padding: 0;
}
</style>