<template>
    <div class="main">
        <!-- 菜单栏 -->
        <div class="left" v-if="!first_time">
            <div class="left-box" :class="page == 'myAudio'?'left-box-check':''" @click="checkMenu(1)">我的声音</div>
            <div class="left-box" :class="page == 'introduce'?'left-box-check':''" @click="checkMenu(2)">声音克隆</div>
            <div class="left-box" :class="page == 'audioDetail'?'left-box-check':''" @click="checkMenu(3)">合成配音</div>
            <div class="left-box" :class="page == 'orderRecord'?'left-box-check':''" @click="checkMenu(4)">订单记录</div>
        </div>
        <!-- 主页面 -->
        <div class="right" :style="first_time?'width: 100%;':''">
            <GoBackNew style="margin-left: 10px;" v-if="page == 'pageOne' || page == 'introduce'"></GoBackNew>

            <!-- 主体盒子 -->
            <!-- 声音克隆训练页面 -->
            <div class="pageOne" style="height: 100%;" v-if="page == 'pageOne'">
                <div class="title-box">
                    <div>声音克隆</div>
                    <div>轻松3步，复刻高品质真人声音</div>
                </div>
                <div class="pageOne-content">
                    <div class="created-name">
                        <div>
                            <div class="radius-title">1</div>
                            <div class="created-title">创建你的声音</div>
                        </div>
                        <div>
                            <el-input v-model="audioName" placeholder="请输入名称"></el-input>
                        </div>
                    </div>
                    <div class="created-audio">
                        <div>
                            <div class="radius-title">2</div>
                            <div class="created-title">上传录制音频</div>
                        </div>
                        <div>
                            <div class="aduio-uoload" style="height: 280px;">
                                <el-upload
                                    style="width: 100%; height: 100%"
                                    class="upload-demo"
                                    :show-file-list="false"
                                    ref="blueprintReading"
                                    :data="blueprintReadingFile"
                                    drag
                                    :action="httpUrls.loginUrl + 'api/user/oss_upload'"
                                    :on-change="handleChangeFile"
                                    :on-success="handleSuccessFile"
                                    :before-upload="beforeAvatarUpload"
                                    :headers="headerData"
                                >
                                    <!-- <i class="el-icon-upload"></i> -->
                                    <div class="pageOne-upload" v-if="!audio.new_url">
                                        <img
                                            style="width: 88px; height: 72px"
                                            :src="
                                            httpUrls.ossUrl +
                                            'static/picture/b5c57e43-3f6d-4f94-882a-77707425d590.png'
                                            "
                                            alt=""
                                        />
                                        <div class="upload-title">
                                            点击或拖拽音频到此处上传
                                        </div>
                                        <div class="el-upload__text">
                                            支持wav、mp3、ogg、m4a、aac、pcm格式
                                        </div>
                                        <div class="el-upload__text">
                                            文件小于20MB
                                        </div>
                                        <div class="el-upload__text" style="margin-top: 5px">
                                            建议10s-30s的单个音频
                                        </div>
                                        <div class="upload-btn" style="text-align:center;">
                                            <span>上传音频</span>
                                        </div>
                                    </div>
                                    <audio v-else :src="httpUrls.ossUrl + audio.new_url" controls></audio>
                                </el-upload>
                            </div>
                            <!-- 上传音频提示 -->
                            <div class="audio-tips">
                                <div class="audio-tips-title">
                                    <div>录音规范</div>
                                    <div style="cursor: pointer;" @click="specificationBool = !specificationBool">{{!specificationBool?'查看':'收起'}}详细录音规范</div>
                                </div>
                                <div class="audio-tips-guif" v-if="specificationBool">
                                    <div>音频规范</div>
                                    <div>需要保证复刻音频的质量，我们推荐您上传的音频文件符合以下规范</div>
                                    
                                    <el-table
                                        :header-cell-style="getRowClass"
                                        :data="specification"
                                        style="width: 100%"
                                    >
                                        <el-table-column prop="label" width="100" label="类别"></el-table-column>
                                        <el-table-column prop="value" width="520" label="建议">
                                            <template slot-scope="scope">
                                                <div v-if="scope.row.label == '音频时长'">
                                                    <span>建议为10s~30s的音频。</span>
                                                </div>
                                                <div v-if="scope.row.label == '录制环境'">
                                                    <div>录音环境的选择主要考虑降低噪音和混响,建议使用10平方米以内的小房间进行录音,有吸音装置的房间是理想环境。可使用价格低廉的吸音棉对房间进行改造,目的是为了改变声波的平面反射为漫反射,降低混响。</div>
                                                    <div>1.尽量在同一声学环境下录制,避免过于喧哗的背景音和噪音,音频非拼接而成。</div>
                                                    <div>2.避免远场环境下录制,建议离麦克风50cm之内,并需要保持位置、距离稳定,防止音量大小不一致。</div>
                                                    <div>3.尽量在自然对话状态下录制,对比刻意压低声线/呢喃获得的音色会更贴合本人。</div>
                                                </div>
                                                <div v-if="scope.row.label == '音频质量'">
                                                    <div>1.必须仅含有一个人在说话,避免多个人同时说话。</div>
                                                    <div>2.说话人发音及音质越清晰、复刻质量越高。如说话人喉音/声音底噪严重,则复刻音频 </div>
                                                    <div>3.录音时需要保持音量大小、语速稳定、注意断句、避免口腔噪音(如口水声)、杂音、混响等情况。结合最终使用场景与人设加入适当演绎,避免朗读风格过于严重,并保持整体风格一致。</div>
                                                    <div>4.录音时尽量保持姿态稳定,减少不必要的肢体动作,椅子的响声、衣物的摩擦音、鼠标键盘的敲击声都是常见的人为噪声,需要格外注意细节。</div>
                                                    <div>5.如口误无需终止录音,可停顿1~2秒后,继续录制即可。文案中所有文字不必追求一字不落地完成,可以接受丢字、填字,保持语句通畅即可。</div>
                                                </div>
                                                <div v-if="scope.row.label == '录制内容'">
                                                    <span>建议在录音前熟悉文案,并确定好人设及演绎风格。尽量贴近复刻内容和主题,避免说话人韵律过于平淡,否则将得到较平的复刻效果。如需要复刻情绪韵律起伏较强的音频,请尽量输入表现力强的prompt。</span>
                                                </div>
                                                <div v-if="scope.row.label == '音频格式'">
                                                    <span>目前支持pcm、m4a、mp3、wav、ogg、aac、ogg_opus格式,当格式为pcm时,保证采样率为24k</span>
                                                </div>
                                            </template>
                                        </el-table-column>
                                    </el-table>
                                </div>
                                <div class="audio-tips-content">
                                    <div v-for="(item,index) in audioTips" :key="index">
                                        <img :src="httpUrls.ossUrl + item.image" alt="">
                                        <div>{{ item.text }}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="created-pay">
                        <div class="title">
                            <div class="radius-title">3</div>
                            <div class="created-title">付费定制，等待训练完成即可使用</div>
                        </div>
                        <div class="pay">
                            <!-- 重新训练 -->
                            <template v-if="childPage == 're-'">
                                <div class="re-" @click="handleRetraining">重新训练</div>
                            </template>
                            <!-- 声音克隆 -->
                            <template v-else>
                                <div class="re-" @click="createdAudio">开始训练</div>
                                <!-- <div class="pay-left">
                                    <div>付款定制，即可快速复刻，拥有高品质Al定制音色，实现你的专属发音播稿</div>
                                    <div>
                                        <el-checkbox v-model="checked"></el-checkbox>
                                        <div>我已阅读并同意<span @click="showArgee">《定制数字人协议》</span></div>
                                    </div>
                                </div>
                                <div class="pay-right">
                                    <div>
                                        <div>应付费用</div>
                                        <div>¥{{money}}/次</div>
                                    </div>
                                    <div @click="handlePay">立即定制</div>
                                </div> -->
                            </template>
                        </div>
                    </div>
                </div>
            </div>
            <!-- 声音克隆介绍页面/付款 -->
            <div class="pageOne" :style="!specificationBool?'height: 100%;':''" v-if="page == 'introduce'">
                <div class="title-box">
                    <div>声音克隆</div>
                    <div>轻松3步，复刻高品质真人声音</div>
                </div>
                <div class="pageOne-content">
                    <div class="created-name">
                        <div>
                            <div class="radius-title">1</div>
                            <div class="created-title">创建你的声音</div>
                        </div>
                        <div style="position: relative;left: 37px;">
                            创建并命名你的声音模型
                        </div>
                    </div>
                    <div class="created-audio">
                        <div>
                            <div class="radius-title">2</div>
                            <div class="created-title">上传录制音频</div>
                        </div>
                        <div>
                            <div class="aduio-uoload" style="height:auto;position: relative;left: 37px;">
                                    <!-- <i class="el-icon-upload"></i> -->
                                    <div class="pageOne-upload" style="text-align: center;">
                                        <div class="el-upload__text">
                                            支持wav、mp3、ogg、m4a、aac、pcm格式
                                        </div>
                                        <div class="el-upload__text" style="margin-top: 5px">
                                            文件小于20MB
                                        </div>
                                        <div class="el-upload__text" style="margin-top: 5px">
                                            建议10s-30s的单个音频
                                        </div>
                                    </div>
                            </div>
                            <!-- 上传音频提示 -->
                            <div class="audio-tips">
                                <div class="audio-tips-title">
                                    <div>录音规范</div>
                                    <div style="cursor: pointer;" @click="specificationBool = !specificationBool">{{!specificationBool?'查看':'收起'}}详细录音规范</div>
                                </div>
                                <div class="audio-tips-guif" v-if="specificationBool">
                                    <div>音频规范</div>
                                    <div>需要保证复刻音频的质量，我们推荐您上传的音频文件符合以下规范</div>
                                    
                                    <el-table
                                        :header-cell-style="getRowClass"
                                        :data="specification"
                                        style="width: 100%"
                                    >
                                        <el-table-column prop="label" width="100" label="类别"></el-table-column>
                                        <el-table-column prop="value" width="520" label="建议">
                                            <template slot-scope="scope">
                                                <div v-if="scope.row.label == '音频时长'">
                                                    <span>建议为10s~30s的音频。</span>
                                                </div>
                                                <div v-if="scope.row.label == '录制环境'">
                                                    <div>录音环境的选择主要考虑降低噪音和混响,建议使用10平方米以内的小房间进行录音,有吸音装置的房间是理想环境。可使用价格低廉的吸音棉对房间进行改造,目的是为了改变声波的平面反射为漫反射,降低混响。</div>
                                                    <div>1.尽量在同一声学环境下录制,避免过于喧哗的背景音和噪音,音频非拼接而成。</div>
                                                    <div>2.避免远场环境下录制,建议离麦克风50cm之内,并需要保持位置、距离稳定,防止音量大小不一致。</div>
                                                    <div>3.尽量在自然对话状态下录制,对比刻意压低声线/呢喃获得的音色会更贴合本人。</div>
                                                </div>
                                                <div v-if="scope.row.label == '音频质量'">
                                                    <div>1.必须仅含有一个人在说话,避免多个人同时说话。</div>
                                                    <div>2.说话人发音及音质越清晰、复刻质量越高。如说话人喉音/声音底噪严重,则复刻音频 </div>
                                                    <div>3.录音时需要保持音量大小、语速稳定、注意断句、避免口腔噪音(如口水声)、杂音、混响等情况。结合最终使用场景与人设加入适当演绎,避免朗读风格过于严重,并保持整体风格一致。</div>
                                                    <div>4.录音时尽量保持姿态稳定,减少不必要的肢体动作,椅子的响声、衣物的摩擦音、鼠标键盘的敲击声都是常见的人为噪声,需要格外注意细节。</div>
                                                    <div>5.如口误无需终止录音,可停顿1~2秒后,继续录制即可。文案中所有文字不必追求一字不落地完成,可以接受丢字、填字,保持语句通畅即可。</div>
                                                </div>
                                                <div v-if="scope.row.label == '录制内容'">
                                                    <span>建议在录音前熟悉文案,并确定好人设及演绎风格。尽量贴近复刻内容和主题,避免说话人韵律过于平淡,否则将得到较平的复刻效果。如需要复刻情绪韵律起伏较强的音频,请尽量输入表现力强的prompt。</span>
                                                </div>
                                                <div v-if="scope.row.label == '音频格式'">
                                                    <span>目前支持pcm、m4a、mp3、wav、ogg、aac、ogg_opus格式,当格式为pcm时,保证采样率为24k</span>
                                                </div>
                                            </template>
                                        </el-table-column>
                                    </el-table>
                                </div>
                                <div class="audio-tips-content">
                                    <div v-for="(item,index) in audioTips" :key="index">
                                        <img :src="httpUrls.ossUrl + item.image" alt="">
                                        <div>{{ item.text }}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="created-pay" :style="specificationBool?'position: relative;padding-bottom: 63px;':''">
                        <div class="title">
                            <div class="radius-title">3</div>
                            <div class="created-title">付费定制，等待训练完成即可使用</div>
                        </div>
                        <div class="content">
                            <div>声音克隆试听案例</div>
                            <div>
                                <div class="domHover" @click.self="handleAudio('audio1')">
                                    <span>原音频</span>
                                    <i class="el-icon-video-play" @click="handleAudio('audio1')" v-if="stopCase1"></i>
                                    <i class="el-icon-video-pause" @click="handleStopCase('audio1')" v-else></i>
                                    <audio ref="audio1" src="https://umi-intelligence.oss-cn-shenzhen.aliyuncs.com/xcx/com/message_center/案例原声音.wav"></audio>
                                </div>
                                <div class="domHover" @click.self="handleAudio('audio2')">
                                    <span>克隆声音</span>
                                    <i class="el-icon-video-play" @click="handleAudio('audio2')" v-if="stopCase2"></i>
                                    <i class="el-icon-video-pause" @click="handleStopCase('audio2')" v-else></i>
                                    <audio ref="audio2" src="https://umi-intelligence.oss-cn-shenzhen.aliyuncs.com/xcx/com/message_center/案例克隆声音.wav"></audio>
                                </div>
                            </div>
                        </div>
                        <div class="pay">
                            <div class="pay-left">
                                <div>付款定制，即可快速复刻，拥有高品质Al定制音色，实现你的专属发音播稿</div>
                                <div>
                                    <el-checkbox v-model="checked"></el-checkbox>
                                    <div>我已阅读并同意<span @click="showArgee">《定制数字人协议》</span></div>
                                </div>
                            </div>
                            <div class="pay-right">
                                <div>
                                    <div>应付费用</div>
                                    <div>¥{{money}}/次</div>
                                </div>
                                <div @click="handlePay">立即定制</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- 我的声音页面 -->
            <div class="myAudio" v-if="page == 'myAudio'">
                <div class="myAudio-title">我的声音</div>
                <div class="myAudio-top">
                    <div class="createdAudio">
                        <div class="created-box" @click="goCreated()">
                            <i class="el-icon-plus" style="font-size: 28px; color: #999"></i>
                        </div>
                        <div class="created-text">创建声音</div>
                    </div>
                </div>
                <div class="myAudio-content">
                    <div class="myAudio-content-top">
                        <div>
                            <div v-for="item in myAudioStatusArray" :style="myAudioStatus == item.value?'background: #FFF;color:#165DFF;':''" @click="myAudioStatus = item.value" :key="item.value">
                                {{ item.label }}
                            </div>
                        </div>
                        <div>
                            <el-input
                                placeholder="搜索"
                                suffix-icon="el-icon-search"
                                v-model="searchValue">
                            </el-input>
                        </div>
                    </div>
                    <div class="myAudio-content-table">
                        <el-table
                            :header-cell-style="getRowClass"
                            :data="audioData"
                            style="width: 100%"
                        >
                            <el-table-column prop="voice_name" label="声音名称"></el-table-column>
                            <el-table-column prop="voice_status" label="状态">
                                <template slot-scope="scope">
                                    <div v-if="scope.row.voice_status == 1" style="color: #F00;">未付款</div>
                                    <div v-if="scope.row.voice_status == 2" style="color: #1F64FF;">训练中</div>
                                    <div v-if="scope.row.voice_status == 3" style="color: #00C777;">制作成功</div>
                                    <div v-if="scope.row.voice_status == 4" style="color: #F00;">制作失败</div>
                                    <div v-if="scope.row.voice_status == 5">启用</div>
                                    <div v-if="scope.row.voice_status == 6" style="color: #F00;">过期</div>
                                    <div v-if="scope.row.voice_status == 7" style="color: #00C777;">付款成功</div>
                                </template>
                            </el-table-column>
                            <el-table-column prop="create_time" label="创建时间"></el-table-column>
                            <el-table-column prop="file_name" width="250" label="操作">
                                <template slot-scope="scope">
                                    <div class="scoped-box">
                                        <audio :ref="scope.row.voice_id" v-if="scope.row.voice_status == 3 || scope.row.voice_status == 5"
                                                :src="httpUrls.ossUrl + scope.row.demo_audio ">
                                        </audio>
                                        <div v-if="scope.row.voice_status == 3 || scope.row.voice_status == 5" @click="playTableAudio(scope.row.voice_id)">试听</div>
                                        <div v-if="scope.row.voice_status == 3" @click="re_(scope.row)">重新训练</div>
                                        <div v-if="scope.row.voice_status == 3" @click="firing(scope.row)">启用(启用后即可开始合成配音)</div>
                                        <div v-if="scope.row.voice_status == 3 || scope.row.voice_status == 4 || scope.row.voice_status == 5" @click="handleDetail(scope.row)">查看详情</div>
                                        <div v-if="scope.row.voice_status == 5" @click="handleDetail(scope.row)">合成记录</div>
                                        <div v-if="scope.row.voice_status == 5" @click="page = 'audioDetail',childPage = 'synthesis'">合成声音</div>
                                    </div>
                                </template>
                            </el-table-column>
                        </el-table>
                    </div>
                </div>
                <!-- 分页 -->
                <!-- <div class="myAudio-bottom">

                </div> -->
            </div>
            <!-- 声音详情页面 -->
            <div class="audioDetail" v-if="page == 'audioDetail'">
                <!-- 主体内容 -->
                <div class="audioDetail-main">
                    <div>
                        <div class="audioDetail-main-title">
                            <!-- 合成配音 -->
                            <template v-if="childPage == 'synthesis'">
                                <div class="title">合成配音</div>
                            </template>
                            <!-- 查看详情 -->
                            <template v-if="childPage == 'detail'">
                                <!-- v-if="editAudioStatus == false" -->
                                <div class="title">{{detailData.name}}</div>
                                <!-- <div class="edit-box" v-if="editAudioStatus == false" @click="editAudioStatus = true">
                                    <img :src='httpUrls.ossUrl + "static/picture/ba6e611f-ee9b-46c4-8d55-b6d88639e5a2.png"' alt="">
                                    <span>编辑</span>
                                </div>
                                <div style="width: 250px;" v-if="editAudioStatus == true">
                                    <el-input v-model="detailData.name" placeholder="请输入内容"></el-input>
                                </div>
                                <div class="edit-btn"  v-if="editAudioStatus == true" @click="editAudioStatus = false">确定</div> -->
                            </template> 
                        </div>
                        <div class="audioDetail-main-content">
                            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                                <el-form-item label="选择声音"  v-if="childPage == 'synthesis'" prop="checkModel" >
                                    <el-select style="width: 100%;" v-model="ruleForm.checkModel" placeholder="请选择">
                                        <el-option v-for="item in timbreData" :value="item.voice_code" :label="item.voice_name" :key="item.voice_code"></el-option>
                                    </el-select>
                                </el-form-item>
                                <el-form-item label="输入文本" prop="text">
                                    <el-input v-model="ruleForm.text" show-word-limit maxlength="300" :rows="10" type="textarea"></el-input>
                                </el-form-item>
                            </el-form>
                            <div class="slider">
                                <div>音量</div>
                                <div>
                                    <el-slider v-model="ruleForm.volume"></el-slider>
                                </div>
                                <div>{{ ruleForm.volume }}</div>
                            </div>
                            <div class="slider">
                                <div>语调</div>
                                <div>
                                    <el-slider v-model="ruleForm.intonation"></el-slider>
                                </div>
                                <div>{{ ruleForm.intonation }}</div>
                            </div>
                            <div class="slider">
                                <div>语速</div>
                                <div>
                                    <el-slider v-model="ruleForm.speed"></el-slider>
                                </div>
                                <div>{{ ruleForm.speed }}</div>
                            </div>
                        </div>
                        <div class="audioDetail-main-bottom">
                            <div @click="handleDubbing('ruleForm')">开始合成</div>
                            <div v-show="detailAudio.speech_url">
                                <audio :src="httpUrls.ossUrl+detailAudio.speech_url" :ref="'detailAudio'"></audio>
                                <div v-if="stop" @click="stopAudio('detailAudio')">
                                    <img :src='httpUrls.ossUrl + "static/picture/c7647e95-e2e1-4278-933a-9f461b890b75.png"' alt="">
                                    <div class="text">暂停</div>
                                </div>
                                <div v-else @click="playAudio('detailAudio')">
                                    <img :src='httpUrls.ossUrl + "static/picture/e763e85a-45fd-4688-8652-79dea4e699a7.png"' alt="">
                                    <div class="text">播放</div>
                                </div>
                                <div style="margin-left: 20px;">
                                    <img :src='httpUrls.ossUrl + "static/picture/e07e22bb-6d59-4c1a-a3c7-a5ad1d1e103d.png"' alt="">
                                    <div class="text">下载</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- 历史记录 -->
                <div class="audioDetail-right">
                    <div class="audioDetail-right-title">历史记录</div>
                    <div class="audioDetail-right-line"></div>
                    <div class="audioDetail-right-input">
                        <el-input placeholder="请输入内容" suffix-icon="el-icon-search" v-model="historyValue">
                        </el-input>
                    </div>
                    <div id="history-list">
                        <div class="history-mask">
                        <div class="history-box domHover" v-for="(item,index) in historyList" :key="index">
                            <audio :ref="'audio'+item.h_code" :src="httpUrls.ossUrl + item.speech_url"></audio>
                            <div class="history-title">记录</div>
                            <div class="history-content">
                                <div>
                                    <div>话题</div>
                                    <div>
                                    <div>
                                        {{ item.title }}
                                    </div>
                                    </div>
                                </div>
                            <div>
                                <div>时间</div>
                                <div>
                                <div>
                                    {{ item.create_time }}
                                </div>
                                </div>
                            </div>
                            </div>
                            <div class="history-bottom">
                            <button class="domHover" @click.stop="download(item)">下载</button>
                            <button class="domHover" @click.stop="playAudio('audio'+item.h_code)">播放</button>
                            <button class="domHover" @click.stop="deleteVoice(item.h_code)">删除</button>
                            </div>
                        </div>
                        </div>
                    </div>
                    <div class="noHistory" v-if="false">
                        <div>
                        <img :src='httpUrls.ossUrl + "static/picture/86e840c2-e961-4649-848e-39d12c8c1cb0.png"' alt="">
                        <div>暂无记录</div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- 支付成功/状态 -->
            <div class="pay-success" v-if="page == 'pay'">
                <div class="title">
                    <div>声音克隆</div>
                    <div>轻松3步，复刻高品质真人声音</div>
                </div>
                <div class="pay-success-content">
                    <!-- 支付成功图片 -->
                    <img v-if="childPage == 'pay'" :src='httpUrls.ossUrl + "static/picture/01c48d79-77b4-4d5d-a5f9-c2e81f7971e0.png"' />
                    <!-- 重新训练图片 -->
                    <img v-if="childPage == 're-'" :src='httpUrls.ossUrl + "static/picture/f7b00282-3d0c-4d61-8ee0-e925bcec7ec5.png"' />
                    <div class="pay-text">{{childPage == 'pay'?'支付成功':'训练中'}}</div>
                    <div class="pay-tips" v-if="childPage == 're-'">正在克隆，预计还剩时间10min</div>
                    <div class="pay-time">{{countdown}}m后跳转到{{childPage == 're-'?'我的声音':'声音克隆'}}页面</div>
                    <div class="pay-btn" @click="countdown = 0">立即跳转</div>
                </div>
            </div>
            <!-- 订单记录 -->
            <div class="orderRecord" v-if="page == 'orderRecord'">
                <div class="orderRecord-title">
                    <div>
                        <el-select v-model="orderValue" placeholder="请选择类型">
                            <el-option
                            v-for="item in orderOptions"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                            </el-option>
                        </el-select>
                    </div>
                    <div>
                        <el-input
                            placeholder="搜索订单号"
                            suffix-icon="el-icon-search"
                            v-model="searchOrderValue">
                        </el-input>
                    </div>
                </div>
                <div class="orderRecord-content">
                    <el-table
                        :data="orderData"
                        :header-cell-style="getRowClass"
                        ref="orderData"
                        @selection-change="handleSelectionChange"
                        style="width: 100%">
                        <el-table-column
                            type="selection"
                            width="55">
                        </el-table-column>
                        <el-table-column prop="order_id" label="订单号"></el-table-column>
                        <el-table-column prop="prod_name" label="套餐"></el-table-column>
                        <el-table-column prop="total_amount" label="金额"></el-table-column>
                        <el-table-column label="支付方式">
                            <template slot-scope="scope">
                                <span v-if="scope.row.payment_method == 1">支付宝</span>
                                <span v-if="scope.row.payment_method == 2">微信</span>
                                <span v-if="scope.row.payment_method == 3">卡密兑换</span>
                            </template>
                        </el-table-column>
                        <el-table-column label="订单状态">
                            <template slot-scope="scope">
                                <span v-if="scope.row.status == 1" style="cursor: pointer"
                                ><el-tag type="warning" @click="toPay(scope.row)"
                                    >待付款</el-tag
                                ></span
                                >
                                <span v-if="scope.row.status == 2"
                                ><el-tag type="success">已付款</el-tag></span
                                >
                                <span v-if="scope.row.status == 4"
                                ><el-tag type="danger">已过期</el-tag></span
                                >
                            </template>
                        </el-table-column>
                        <el-table-column prop="created_at" label="时间"></el-table-column>
                    </el-table>
                </div>
                <!-- 分页 -->
                <div class="orderRecord-bottom" v-if="orderData != null">
                    <div class="btn_del" @click="delSelect()">删除</div>
                    <div class="cancel_del" @click="toggleSelection()">取消选中</div>
                    <!-- 分页组件 -->
                    <Pagination
                        v-bind:child-msg="orderPage"
                        @callFather="callFather"
                    ></Pagination>
                </div>
            </div>
        </div>
        <Agree ref="Agree"></Agree>
        <Register ref="Register"></Register>
        <!-- 实名认证弹出框 -->
        <el-dialog
            title="系统提示"
            :visible.sync="dialogVisible"
            class="real-dialog"
            width="500px"
            :before-close="handleClose"
            >
            <div>
                <div>使用声音克隆需要进行实名授权，</div>
                <div>请扫码前往<b>【无忧秘书智脑微信小程序】</b>完成认证授权后继续定制。</div>
                <img style="width: 160px;height: 160px;margin-top: 20px;position: relative;left: 50%;transform: translate(-50%);" :src='httpUrls.ossUrl + "static/picture/c94d71e3-9a2c-4033-b3f6-fe2c3720057a.png"' alt="">
            </div>
        </el-dialog>
        <!-- 支付 -->
        <audioClonePay ref="audioClonePay" @payResult="payResult"></audioClonePay>
    </div>
</template>

<script>
import httpUrls from "../../api/requestURL";
import Agree from "../../components/Agree";
import audioClonePay from "../../components/audioClonePay";
import Pagination from '../../components/Pagination'
import {
  wechat,
  alipay,
  payResult,
  products,
  payOrder, delOrder, resetPay,getUserInfo
} from "../../api/chatMG";
import GoBackNew from "../../components/goBack";
import Register from "../../components/register";
import { getCloneNumber,createdAudioClone,getAudioClone,editAudioClone,voiceIdQuery,firingTimbre,getEngine,getTimbre,voiceSynthesis,getVoiceResult,deleteVoiceDetail,getVoiceHistory  } from "../../api/voice";
export default {
    name:'audio-clone',
    data() {
        return {
            httpUrls,
            stopCase1:true,     //案例音频停止标识符
            stopCase2:true,     //案例音频停止标识符
            dialogVisible:false,    //实名弹出框
            dialogVisibleNum:0,     //第一次调用弹出框开启实时校验实名认证
            audioName:'',   //创建声音名称
            page:null, //页面展示
            childPage:null,     //子页面区别显示
            first_time:null,  //第一次进入声音克隆页面
            blueprintReadingFile: {
                image: null,
                image_name: null,
                oss_dir: "static",
                cate: "recognizingSllThings-picture",
            },
            // 录音规范数据
            audioTips:[
                {
                    image:"static/picture/e37f7162-d461-4010-8021-3781ef9829c1.png",
                    text:'单人录音'
                },
                {
                    image:"static/picture/ff952f37-f1a4-4515-981e-902e8edfa2bc.png",
                    text:'周围安静无噪音'
                },
                {
                    image:"static/picture/c85899f1-3e93-46f9-ab54-332a25c7f175.png",
                    text:'录制符合日常使用场景'
                },
            ],
            checked:false,  //选择协议
            audio:{},   //上传音频数据
            searchValue:"",  //我的声音搜索框value值
            myAudioStatus:'0',    //我的声音页面中表格状态
            myAudioStatusArray:[    //状态数组
                {
                    value: "0",
                    label: "全部",
                },
                {
                    value: "1",
                    label: "未付款",
                },
                {
                    value: "2",
                    label: "训练中",
                },
                {
                    value: "3",
                    label: "制作成功",
                },
                {
                    value: "4",
                    label: "制作失败",
                },
                {
                    value: "5",
                    label: "启用",
                },
                {
                    value: "6",
                    label: "已过期",
                },
            ],
            editAudioStatus:false,  //编辑声音状态/输入框
            ruleForm: {
                text:"",    //文本
                volume:33,  //音量
                intonation:33,   //语调
                speed:50,    //语速
                checkModel:"",  //选择声音模型
            },
            rules: {
                text: [
                    { required: true, message: '请输入文本', trigger: 'blur' },
                    { max: 300, message: '输入的文本不能超过三百字！', trigger: 'blur' }
                ],
                checkModel: [
                    { required: true, message: '请选择声音模型', trigger: 'blur' },
                ],
            },
            historyValue:"",    //历史记录搜索框value

            //订单页面
            orderOptions: [
                {
                    value: "0",
                    label: "全部",
                },
                {
                    value: "1",
                    label: "待付款",
                },
                {
                    value: "2",
                    label: "已付款",
                },
                {
                    value: "4",
                    label: "已过期",
                },
            ],
            orderValue: '0',
            searchOrderValue:"", //搜索框绑定数据
            orderData:[],   //订单表格数据
            orderSelection: [], //订单表格选中数据
            orderPage: {    //订单表分页参数
                currentPage: 1,
                pageSize: 10,
                total: 10,
            },
            audioData:[],   //训练记录
            audioPage:{     //训练记录分页参数
                currentPage: 1,
                pageSize: 10,
                total: 10
            },
            countdown:5,    //倒计时
            train_code:null,    //训练记录唯一编号
            detailData:{    //查看详情数据
                name:"",    //声音名称
                voice_code:'',  //音色编号
                engine_code:""  //引擎编号
            },
            detailAudio:{

            },
            timbreData:[],  //音色数据
            engine_code:'',
            loading:null,   //加载
            stop:false,     //音频状态/停止
            historyList:[],     //历史记录
            money:0,
            specification:[ //规范数据
                {
                    label:'音频时长',
                    value:''
                },
                {
                    label:'录制环境',
                    value:''
                },
                {
                    label:'音频质量',
                    value:''
                },
                {
                    label:'录制内容',
                    value:''
                },
                {
                    label:'音频格式',
                    value:''
                },
            ],
            specificationBool:false,    //规范表格是否显示
            headerData: {}
        }
    },
    components:{
        Agree,
        audioClonePay,
        Pagination,
        Register,
        GoBackNew
    },
    watch:{
        myAudioStatus: {
            deep: true,
            handler() {
                this.init()
            }
        },
        dialogVisible: {
            deep: true,
            handler() {
                if(this.dialogVisible == true && this.dialogVisibleNum == 0){    //第一次开启校验
                    this.dialogVisibleNum = 1
                }else{
                    console.log('return')
                    return
                }
                if(this.dialogVisible = true && this.dialogVisibleNum == 1){
                    let realTime = setInterval(() => {   //开启定时器查询实名认证结果
                        getUserInfo().then(res => {
                            if(res.code == 20000){ 
                                let info = JSON.parse(localStorage.getItem("userInfo"));
                                info.nick_name = res.data.nick_name;
                                info.user_name = res.data.user_name;
                                info.avatar_url = res.data.avatar_url;
                                info.is_real_name = res.data.is_real_name;
                                this.$message,success('认证成功')
                                localStorage.setItem("userInfo", JSON.stringify(info));
                                this.$store.dispatch("user/changeInfo", info.user_id);
                                this.$root.Bus.$emit("loginInfo", 1); // 更新登录信息
                            }
                        })
                        //五分钟后关闭
                        setTimeout(() => {
                            clearInterval(realTime)
                            this.realBool = false;
                        },10 * 60 * 1000)
                    },5000)
                }
            }
        },
    },
    created() {
        let userInfo = JSON.parse(localStorage.getItem("userInfo"));
        this.headerData.authorization = userInfo.token
        this.headerData.role = userInfo.role
        //初始化数据
        let requestData = `voice_name=&voice_status=`;
        //获取训练记录
        getAudioClone(requestData).then(res => {
            console.log(res)
            if (res.data.data.length == 0) {
                this.first_time = true;    //用户第一次使用声音克隆
                this.page = 'introduce';
            }else{
                this.audioData = res.data.data
                this.first_time = false;    //不是第一次使用
                this.page = 'introduce'
            }
        })
        this.getVoiceHistory()
        this.initOrder()
        //获取火山引擎编号
        getEngine('scene_type=vg').then(res => {
            this.engine_code = res.data[0]['engine_code'];  //引擎编号
            console.log(this.engine_code,'--引擎编号')
            getTimbre(`engine_code=${res.data[0]['engine_code']}&voice_type=2`).then(response => {
                if (response.code == 20000) {
                    this.timbreData = response.data
                }else{
                    this.$message.error(response.msg)
                }
            })
        })

        //获取价格
        let val = {
            prod_cate_id: [202],
        }
        products(val)
        .then((res) => {
          if(res.code == 20000){
           let a = res.data[202][0]['prod_price'];
           let index = a.indexOf('.')
           console.log(a.substring(0,index))
            this.money =  a.substring(0,index)
          }
        })
        .catch((err) => {
          this.$message.error("获取失败！");
        });
    },
    methods: {
        //停止播放案例
        handleStopCase(val){
            let audioElement;
            if (this.$refs[val].length) {
                audioElement = this.$refs[val][0];
            }else{
                audioElement = this.$refs[val]
            }
            if (val == 'audio1') {
                this.stopCase1 = true;
            }else{
                this.stopCase2 = true;
            }
            console.log(audioElement)
            audioElement.pause(); // 暂停音频
            audioElement.currentTime = 0
        },
        //关闭实名对话框
        handleClose(){
            this.dialogVisible = false;
        },
        //改变菜单栏
        checkMenu(num){
            if(!this.realName()){
                return;
            }
            if(num == 1){
                this.page = 'myAudio'
            }else if(num == 2){
                this.page = 'introduce'
            }else if(num == 3){
                this.page = 'audioDetail'
                this.childPage = 'synthesis'    //合成配音页面/标识符
            }else if(num == 4){
                this.page = 'orderRecord'
            }
        },
        //判断用户是否实名
        realName(){
            if(JSON.parse(localStorage.getItem('userInfo'))['is_real_name'] == 1){
                this.dialogVisible = true;
                return false
            }else{
                return true
            }
        },
        init(){
            let requestData = `voice_name=${this.searchValue}&voice_status=${this.myAudioStatus==0?'':this.myAudioStatus}`;
            //获取训练记录
            getAudioClone(requestData).then(res => {
                    this.audioData = res.data.data
                    this.audioPage.total = res.data.total;
                    this.first_time = false;    //不是第一次使用
            })
        },
        //订单列表
        initOrder(){
            let val = {
                user_id: JSON.parse(localStorage.getItem('userInfo'))['user_id'],
                'prod_cate_id': [9],
                status: this.orderValue,
                order_id: this.searchOrderValue,
                page_index: this.orderPage.currentPage,
                page_count: this.orderPage.pageSize,
            };
            payOrder(val)
                .then((res) => {
                if (res.code == 20000) {
                    this.orderData = res.data
                    // this.tableData = res.data;
                    this.orderPage.total = parseInt(res.total);
                } else {
                    this.$message.error(res.msg);
                }
                })
                .catch((err) => {
                    this.$message.error("获取失败！");
                });
        },
        //订单列表分页会带哦
        callFather(parm) {
            this.orderPage.currentPage = parm.currentPage;
            this.orderPage.pageSize = parm.pageSize;
            this.initOrder();
        },
        //获取历史记录
        getVoiceHistory() {
            let requestData = `title=${this.historyValue}&engine_code=1000010006`
            getVoiceHistory(requestData).then(res => {
                if (res.code == 20000) {
                this.historyList = res.data.data;
                }
            })
        },
        //删除语音合成历史记录
        deleteVoice(val) {
            this.$confirm('确认删除该记录?', '提示', {
                confirmButtonText: '确认',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                deleteVoiceDetail(val).then(res => {
                if (res.code == 20000) {
                    this.getVoiceHistory()
                    this.$message({
                    type: 'success',
                    message: '删除成功!'
                    });
                }
                })

            }).catch(() => {
                this.$message({
                type: 'info',
                message: '已取消删除'
                });
            });
        },

        // 前往创建声音页面
        goCreated(){
            getCloneNumber().then(res => {
                if (res.data.count_number != 0) {    //不等于0说明用户有克隆次数无需支付
                    this.page = 'pageOne';
                    this.childPage = ''
                } else {
                    this.$message.error('当前您可创建声音次数为0,请前往购买');
                    this.page = 'introduce';
                }
            })
        },
        
        // 立即定制
        async handlePay(){
            //判断用户是否登录
            if(JSON.parse(localStorage.getItem('userInfo'))['role'] == 'guess'){
                this.$confirm('检测到您当前是游客身份，请先登录再使用该功能', '提示', {
                    confirmButtonText: '登录',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$refs.Register.registerVisible = true;
                }).catch(() => {
                            
                });
                return
            }
            if(!this.checked){
                this.$message.warning('请勾选《数字人协议》！')
                return
            }
            //判断实名
            // if(!this.realName()){
            //     return;
            // }
            let bool = null;
            await getCloneNumber().then(res => {
                if (res.data.count_number != 0) {    //不等于0说明用户有克隆次数无需支付
                    this.$message.success(`当前您还有${res.data}次声音克隆次数未使用，无需支付，请前往克隆`)
                    this.page = 'pageOne';
                    this.childPage = 'pay';     //进入训练声音页面（上传）
                    bool = true;
                } else {
                    bool = false
                }
            })

            if (bool) {
                return
            }
            
            await voiceIdQuery().then(res => {
                console.log(res,'余量');
                if(res.code == 20000){
                    this.$refs.audioClonePay.PayVisible = true;
                }else{
                    this.$message.error(res.msg)
                }
            })
        },

        //支付成功回调
        payResult(){
            console.log('触发查询支付结果')
            this.$refs.audioClonePay.PayVisible = false;
            // 如果是第一次使用
            if(this.page == 'introduce' && this.first_time){
                this.first_time = false;   //关闭第一次标识符
            }
            // 跳转页面
            this.childPage = 'pay'  //状态页面显示标识符(支付/重新训练)
            this.page = 'pay';
            this.countdown = 5;
            let interval = setInterval(() => {
                this.countdown--
                if(this.countdown <= 0){
                    clearInterval(interval)
                    this.page = 'pageOne'
                    this.countdown = 5;
                }
            },1000)
            // this.createdAudio()     //克隆声音
        },

        //创建声音克隆，支付成功进入克隆函数
        createdAudio(){
            if(!this.audioName){
                this.$message.warning('请先输入你的声音名称！')
                return
            };
            if(!this.audio.new_url){
                this.$message.warning('请上传你要克隆的声音！')
                return
            }
            let requestData = {
                audios:[
                    {
                        audio_url:this.audio.new_url
                    }
                ],
                voice_name:this.audioName
            }
            createdAudioClone(requestData).then(res => {
                console.log(res);
                if(res.code == 20000){
                    this.childPage = 're-'  //显示重新训练图标
                    this.page = 'pay'       //进入中转页面
                    this.countdown = 5;
                    let interval = setInterval(() => {
                        this.countdown--
                        if(this.countdown <= 0){
                            clearInterval(interval)
                            this.page = 'myAudio'   //跳转到我的声音
                            this.countdown = 5;
                            this.init()
                        }
                    },1000)
                    this.init()
                    // 清空数据
                    this.audio = '';
                    this.audioName = '';
                }else{
                    this.$message.error(res.msg)
                }
            })
        },
        // 重新训练
        handleRetraining(){
            if(!this.audioName){
                this.$message.warning('请先输入你的声音名称！')
                return
            };
            if(!this.audio.new_url){
                this.$message.warning('请上传你要克隆的声音！')
                return
            }
            let requestData = {
                audios:[
                    {
                        audio_url:this.audio.new_url
                    }
                ],
                voice_name:this.audioName,
                train_code:this.train_code  //训练记录唯一编号
            }
            editAudioClone(requestData).then(res => {
                if (res.code == 20000) {
                    this.childPage = 're-'  //显示重新训练图标
                    this.page = 'pay'       //进入中转页面
                    this.countdown = 5;
                    let interval = setInterval(() => {
                        this.countdown--
                        if(this.countdown <= 0){
                            clearInterval(interval)
                            this.page = 'myAudio'   //跳转到我的声音
                            this.countdown = 5;
                            this.init()
                        }
                    },1000)
                }else{
                    this.$message.error(res.msg)
                }
            })
        },
        //合成配音
        handleDubbing(formName){
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    let speed_ratio = parseFloat((this.ruleForm.speed * (3 - 0.2)) / 100 + 0.2).toFixed(1); //语速
                    let volume_ratio = parseFloat((this.ruleForm.volume * (3 - 0.1)) / 100 + 0.1).toFixed(1);    //音量    
                    let pitch_ratio = parseFloat((this.ruleForm.intonation * (3 - 0.1)) / 100 + 0.1).toFixed(1);     //语调
                    let requestData = null;
                    if(this.childPage == 'synthesis'){  //合成配音
                        //合成配音--语音合成
                        requestData = {
                            engine_code:this.engine_code,   //火山默认引擎
                            voice_code:this.ruleForm.checkModel,    //用户选中的音色
                            content:this.ruleForm.text,     //克隆的文本
                            speech_rate:speed_ratio,
                            pitch_rate:pitch_ratio,
                            volume_ratio
                        }
                    }else{
                        //详情--语音合成
                        requestData = {
                            engine_code:this.detailData.engine_code,    //表格详情引擎
                            voice_code:this.detailData.voice_code,      //表格详情音色
                            content:this.ruleForm.text,     //文本
                            speech_rate:speed_ratio,
                            pitch_rate:pitch_ratio,
                            volume_ratio
                        }
                    }
                    console.log(requestData,'请求参数')
                    this.loading = this.$loading({
                        lock: true,
                        text: '正在为您合成语音，请耐心等待...',
                        spinner: 'el-icon-loading',
                        background: 'rgba(0, 0, 0, 0.7)'
                    });
                    voiceSynthesis(requestData).then(res => {
                        if (res.code == 20000) {
                            this.resultVoice(`h_code=${res.data.h_code}`)
                        } else {
                            this.$message.error('网络错误，请稍后重试...')
                        }
                    })
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
            
        },
        // 合成结果查询
        resultVoice(code) {
            let h_code = code
            getVoiceResult(h_code).then(res => {
                console.log(res, '--结果查询')
                if (res.data.h_status == 1) {
                    setTimeout(() => {
                        this.resultVoice(h_code)
                    }, 1000)
                } else if (res.data.h_status == 2) {
                    this.loading.close()
                    let obj = {
                        speech_url: res.data.speech_url
                    }
                    this.detailAudio = obj;
                    console.log(res, '--成功')
                } else if (res.data.h_status == 3) {
                    this.loading.close()
                    this.$message.error('网络异常，请稍后重试')
                    return;
                } else {
                    setTimeout(() => {
                        this.resultVoice(h_code)
                    }, 1000)
                }
            })
        },
        // 重新训练/表格
        re_(row){
            this.$confirm('你是否确认要重新训练？重新训练将会覆盖现有的训练结果，并且可能需要一段时间来完成。请在确认之前仔细考虑', '系统提示', {
                confirmButtonText: '确认',
            }).then(() => {
                this. page = 'pageOne'
                this.childPage = 're-'
                this.train_code = row.train_code    //获取到当前行的声音编号标识符
                this.audio.new_url = JSON.parse(row.audios)[0].audio_url
                this.audioName = row.voice_name;
            })
        },
        //启用/表格
        firing(row){
            this.$confirm(`启用后即可进行合成配音，但无法重新训练，是否确认启用${row.voice_name}`, '系统提示', {
                confirmButtonText: '确认',
            }).then(() => {
                // getUserInfo().then(res => {     //判断实名认证
                //     if(res.data.is_real_name == 1){     //说明未实名
                //         this.dialogVisible = true       //调用实名弹出框
                //         return
                //     }
                // })
                let requestData = {
                    train_code:row.train_code
                }
                firingTimbre(requestData).then(res => {
                    if(res.code == 20000){
                        this.$message.success('启用成功')
                        this.init()
                    }else{
                        this.$message.error(res.msg)
                    }
                })
            })
        },
        //查看详情
        handleDetail(row){
            console.log('详情音色',row.voice_code)
            console.log('详情引擎',row.engine_code)
            this.$set(this.detailData,'name',row.voice_name)    //声音名称
            this.$set(this.detailData,'voice_code',row.voice_code)  //音色编号
            this.$set(this.detailData,'engine_code',row.engine_code)    //引擎编号
            
            //赋值数据
            this.$set(this.detailAudio,'speech_url',JSON.parse(row.audios)[0].audio_url)
            this.page = 'audioDetail'
            this.childPage = 'detail'
        },
        //多选，选中
        handleSelectionChange(val) {
            let array = val;
            this.orderSelection = [];
            array.forEach((row) => {
                this.orderSelection.push(row.order_id);
            });
        },
        //删除订单列表数据
        delSelect() {
            if (this.orderSelection.length > 0) {
                this.$confirm("确定删除选中的信息吗?", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning",
                })
                .then(() => {
                    let val = {
                    order_ids: this.orderSelection,
                    };
                    delOrder(val)
                    .then((res) => {
                        if (res.code == 20000) {
                        // this.formInline.page = 1;
                        this.initOrder();
                        this.$message.success("删除成功！");
                        } else {
                        this.$message.error(res.msg);
                        }
                    })
                    .catch((err) => {
                        this.$message.error("删除失败！");
                    });
                })
                .catch(() => {
                    this.toggleSelection();
                    this.$message({
                    type: "info",
                    message: "已取消",
                    });
                });
            } else {
                this.$message.error("请选择删除信息");
            }
            },
        // 取消选择
        toggleSelection() {
            this.$refs.orderData.clearSelection();
            this.orderSelection = [];
        },
        //播放案例音频
        handleAudio(ref){
            let audioElement;
            if (this.$refs[ref].length) {
                audioElement = this.$refs[ref][0];
            }else{
                audioElement = this.$refs[ref]
                this.stop = true;
            }
            if(ref == 'audio1'){
                this.$refs['audio2'].pause()
                this.stopCase2 = true;
                this.stopCase1 = false;
            }else{
                this.$refs['audio1'].pause()
                this.stopCase1 = true;
                this.stopCase2 = false
            }
            audioElement.play(); // 播放音频
        },
        //播放音频
        playAudio(ref){
            let audioElement;
            if (this.$refs[ref].length) {
                audioElement = this.$refs[ref][0];
            }else{
                audioElement = this.$refs[ref]
                this.stop = true;
            }
            audioElement.currentTime = 0; // 将音频的播放位置设置为开头
            audioElement.play(); // 播放音频
            
            audioElement.addEventListener('ended', () => {
                this.stop = false;
            });
        },
        //试听表格音频
        playTableAudio(ref){
            let audioElement = this.$refs[ref];
            audioElement.currentTime = 0; // 将音频的播放位置设置为开头
            audioElement.play(); // 播放音频
        },
        // 下载音频
        async download(val) {
            const response = await fetch(httpUrls.ossUrl + val.speech_url);
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.style.display = 'none';
            a.href = url;
            a.download = '无忧智脑.mp3'; // 这里设置你想要的文件名
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
        },
        //数字人协议展示
        showArgee(){
            this.$refs.Agree.agreeVisibleParent = true;
            this.$refs.Agree.agreeVisibleSeven = true;
        },
        //文件改变事件
        handleChangeFile(file, fileList) {
            this.blueprintReadingFile.image = file.raw;
            this.blueprintReadingFile.image_name = file.name;
        },
        // 文件上传成功
        handleSuccessFile(response, file, fileList) {
            console.log(response)
            if (response.code == 20000) {
                this.audio = response.data
                this.$message.success('文件上传成功');
            } else {
                this.$message.error(response.msg);
            }
        },
        // 文件上传前
        beforeAvatarUpload(file) {
            let index = file.name.lastIndexOf(".");
            let str = file.name.slice(index + 1);
            this.blueprintReadingFile.image_name = file.name;
            console.log(str)
            if (str != "mp3" && str != "wav" && str != "ogg" && str != "m4a" && str != "aac" && str != "pcm") {
                this.$message.error("仅支持wav、mp3、ogg、m4a、aac、pcm类型的音频文件!");
                return false;
            }
        },
        //设置表头颜色
        getRowClass({ row, column, rowIndex, columnIndex }) {
            if (rowIndex == 0) {
                return "background:#F6F8FA";
            } else {
                return "";
            }
        },
    },
}
</script>

<style scoped lang="scss">
.domHover{
    cursor: pointer;
}
.real-dialog /deep/ .el-dialog__body{
    border-top: 1px solid #ccc;
}
.el-textarea {
  border: 0px !important;

}

/deep/ .el-textarea__inner {
  border: 0px !important;
  background: #F8F8FC;
}
/deep/ .el-input__count{
    background: #F8F8FC;
}
.scoped-box {
  width: 100%;
  height: 100%;
  display: flex;
  // justify-content: center;
  align-items: center;
  color: #1f64ff;
  font-family: PingFang SC;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 20px; /* 142.857% */
  >div {
    cursor: pointer;
    margin-right: 7px;
  }
  > div:last-child {
    margin-right: 0px;
  }
}
.uploadImg {
  width: 60%;
  height: 400px;
  border-radius: 10px;
  background: #fff;
  /* margin-top: 30px; */
  box-shadow: 0px 0px 0px 0px rgba(0, 0, 0, 0.1),
    0px 10px 33px 0px rgba(0, 0, 0, 0.1);
  position: relative;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);
  /* padding-top: 70px; */
  box-sizing: border-box;
  /* display: flex;justify-content: center;flex-direction: column; */
}
.upload-demo /deep/ .el-upload {
  width: 100%;
  height: 100%;
  background: rgb(251, 252, 255);
}
.uploadImg-text{
    color: #666;
    text-align: center;
    font-family: "PingFang SC";
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 150%; /* 21px */
}
.upload-demo /deep/ .el-upload-dragger {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
}
.uploadImg-title {
  color: #000;
  text-align: center;
  font-family: PingFang SC;
  font-size: 18px;
  font-style: normal;
  font-weight: 500;
  line-height: 24px; /* 133.333% */
}
.upload-content {
  display: flex;
  justify-content: center;
  flex-direction: column;
}
.main {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: space-between;
    padding: 20px;
    padding-bottom: 30px;
    box-sizing: border-box;
    background-color: rgb(241, 242, 245);

    .left {
        width: 240px;
        height: 100%;
        border-radius: 4px;
        background: #FFF;
        padding: 20px;
        box-sizing: border-box;

        .left-box {
            width: 100%;
            border-radius: 4px;
            line-height: 30px;
            padding: 6px;
            box-sizing: border-box;
            color: #000;
            font-family: "PingFang SC";
            font-size: 14px;
            font-style: normal;
            font-weight: 400;
            cursor: pointer;
        }

        .left-box-check {
            color: #1F64FF;
            border-radius: 4px;
            background: rgba(31, 100, 255, 0.10);
        }
    }

    .right {
        width: calc(100% - 240px - 20px);
        height: 100%;
        border-radius: 4px;
        background: #FFF;
        padding: 20px;
        box-sizing: border-box;
        position: relative;
        overflow-y: auto;
        // 创建声音页面
        .pageOne {
            position: relative;
            left: 50%;
            transform: translate(-50%);
            display: inline-block;
            
            .title-box {
                >div:first-child {
                    color: #000;
                    font-family: "PingFang SC";
                    font-size: 36px;
                    font-style: normal;
                    font-weight: 500;
                    text-align: center;
                    /* 54px */
                }

                >div:last-child {
                    color: #666;
                    font-family: "PingFang SC";
                    font-size: 16px;
                    font-style: normal;
                    font-weight: 400;
                    line-height: 150%;
                    text-align: center;
                    /* 24px */
                }
            }
            .pageOne-content{
                margin-top: 30px;
                .radius-title{
                    width: 25px;
                    line-height: 25px;
                    text-align: center;
                    color: #FFF;
                    background: #1F64FF;
                    margin-right: 12px;
                    border-radius: 50%;
                }
                .created-name{
                    >div:first-child{
                        display: flex;
                        align-items: center;
                        margin-bottom: 12px;
                    }
                    >div:last-child{
                        min-width: 500px;
                        width: 620px;
                    }
                    
                    .created-title{
                        color: #333;
                        font-family: "PingFang SC";
                        font-size: 16px;
                        font-style: normal;
                        font-weight: 500;
                        line-height: 150%; /* 24px */
                    }
                }
                .created-audio{
                    margin-top: 15px;
                    
                    >div:first-child{
                        display: flex;
                        align-items: center;
                        margin-bottom: 12px;
                    }
                    >div:last-child{
                        min-width: 500px;
                        width: 620px;
                        .aduio-uoload{
                            width: 100%;
                            height: 280px;
                            .pageOne-upload{
                                display: inline-block;
                            }
                            .upload-title{
                                color: #000;
                                font-family: "PingFang SC";
                                font-size: 16px;
                                font-style: normal;
                                font-weight: 500;
                                line-height: 150%; /* 24px */
                            }
                            .upload-btn{
                                width: 104px;
                                height: 36px;
                                flex-shrink: 0;
                                border-radius: 4px;
                                background: #1F64FF;
                                color: #FFF;
                                font-family: "PingFang SC";
                                font-size: 14px;
                                font-style: normal;
                                font-weight: 500;
                                line-height: 36px; /* 21px */
                                margin: auto;
                                margin-top: 6px;
                                display: flex;
                                justify-content: center;
                                align-items: center;
                            }
                        }
                        .audio-tips{
                            min-width: 500px;
                            width: 620px;
                            margin-top: 15px;
                            .audio-tips-title{
                                width: 100%;
                                display: flex;
                                justify-content: space-between;
                                margin-bottom: 10px;
                                div:first-child{
                                    color: #333;
                                    font-family: "PingFang SC";
                                    font-size: 14px;
                                    font-style: normal;
                                    font-weight: 500;
                                    line-height: 150%; /* 21px */
                                }
                                div:last-child{
                                    color: #1F64FF;
                                    font-family: "PingFang SC";
                                    font-size: 14px;
                                    font-style: normal;
                                    font-weight: 400;
                                    line-height: 150%; /* 21px */
                                }
                            }
                            .audio-tips-guif{
                                margin-bottom: 10px;
                                >div:nth-child(1){
                                    font-size: 23px;
                                    font-weight: 550px;
                                    margin-top: 20px;
                                }
                                >div:nth-child(2){
                                    margin: 10px 0px;

                                    font-size: 13px;
                                }
                            }
                            .audio-tips-content{
                                display: flex;
                                justify-content: space-between;
                                align-items: center;
                                >div{
                                    width: calc(100% / 3 - 10px);
                                    height: 110px;
                                    display: flex;
                                    flex-direction: column;
                                    align-items: center;
                                    justify-content: center;
                                    border-radius: 8px;
                                    background: #F7F8F9;
                                    img{
                                        width: 36px;
                                        height: 36px;
                                    }
                                    div{
                                        color: #666;
                                        font-family: "PingFang SC";
                                        font-size: 14px;
                                        font-style: normal;
                                        font-weight: 400;
                                        line-height: 150%; /* 21px */
                                    }
                                }
                            }
                        }
                    }
                }
                .created-pay{
                    margin-top: 15px;
                    .title{
                        display: flex;
                        align-items: center;
                        margin-bottom: 12px;
                    }
                    .content{
                        width: 100%;
                        margin-top: 30px;
                        .el-icon-video-play{
                            font-size: 24px;
                        }.el-icon-video-pause{
                            font-size: 24px;
                        }
                        >div:first-child{
                            margin-bottom: 10px;
                        }
                        >div:last-child{
                            width: 100%;
                            display: flex;
                            >div{
                                border: 1px solid #ccc;
                                border-radius: 8px;
                                padding: 6px 15px;
                                display: flex;
                                align-items: center;
                                span{
                                    margin-right: 35px;
                                    font-size: 14px;
                                }
                            }
                            >div:last-child{
                                margin-left: 60px;
                            }
                        }
                    }
                    .pay{
                        min-width: 500px;
                        width: 620px;
                        margin-top: 20px;
                        display: flex;
                        justify-content: center;
                        position: absolute;
                        left: 50%;
                        bottom: 0px;
                        transform: translate(-50%);
                        .re-{
                            width: 84px;
                            height: 40px;
                            flex-shrink: 0;
                            border-radius: 4px;
                            background: #1F64FF;
                            color: #FFF;
                            font-family: "PingFang SC";
                            font-size: 14px;
                            font-style: normal;
                            font-weight: 500;
                            line-height: 40px; /* 21px */
                            text-align: center;
                            cursor: pointer;
                        }
                        .pay-left{
                            color: #969BA8;
                            font-family: "PingFang SC";
                            font-size: 12px;
                            font-style: normal;
                            font-weight: 400;
                            line-height: 150%; /* 18px */
                            >div:last-child{
                                margin-top: 5px;
                                display: flex;
                                align-items: center;
                                >div:last-child{
                                color: #969BA8;
                                font-family: "PingFang SC";
                                font-size: 12px;
                                font-style: normal;
                                font-weight: 400;
                                line-height: 150%; /* 18px */
                                    span{
                                        color: #1F64FF;
                                        cursor: pointer;
                                    }
                                }
                            }
                        }
                        .pay-right{
                            display: flex;
                            align-items: center;
                            >div:first-child{
                                margin-right: 10px;
                                display: flex;
                                align-items: center;
                                div:first-child{
                                    color: #000;
                                    font-family: "PingFang SC";
                                    font-size: 12px;
                                    font-style: normal;
                                    font-weight: 400;
                                    line-height: 150%; /* 18px */
                                }
                                div:last-child{
                                    color: #F00;
                                    font-family: DIN;
                                    font-size: 20px;
                                    font-style: normal;
                                    font-weight: 500;
                                    line-height: 150%; /* 30px */
                                }
                            }
                            >div:last-child{
                                width: 84px;
                                height: 40px;
                                flex-shrink: 0;
                                border-radius: 4px;
                                background: #1F64FF;
                                color: #FFF;
                                font-family: "PingFang SC";
                                font-size: 14px;
                                font-style: normal;
                                font-weight: 500;
                                line-height: 40px; /* 21px */
                                text-align: center;
                                cursor: pointer;
                            }
                        }
                    }
                }
            }
        }
        // 我的声音页面
        .myAudio{
            width: 100%;
            height: 100%;
            .myAudio-title{
                color: #000;
                font-family: "PingFang SC";
                font-size: 14px;
                font-style: normal;
                font-weight: 500;
                line-height: 150%; /* 21px */
            }
            .myAudio-top{
                .createdAudio {
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
            }
            .myAudio-content{
                margin-top: 20px;
                // - 52px - 30px
                height: calc(100% - 21px - 15px - 136px - 20px);
                // background: red;
                overflow-y: auto;
                .myAudio-content-top{
                    display: flex;
                    align-items: center;
                    justify-content: space-between;

                    >div:first-child{
                        display: flex;
                        align-items: center;
                        padding: 5px 3px;
                        border-radius: 2px;
                        background: var(---color-fill-2, #F2F3F5);
                        div{
                            padding: 4px 12px;
                            color: var(---color-text-2, #4E5969);
                            /* 14/CN-Regular */
                            font-family: "PingFang SC";
                            font-size: 14px;
                            font-style: normal;
                            font-weight: 400;
                            line-height: 22px; /* 157.143% */
                            border-radius: 2px;
                            cursor: pointer;
                        }
                    }
                    >div:last-child{
                        width: 200px;
                    }
                }
                .myAudio-content-table{
                    margin-top: 16px;
                }
            }
            .myAudio-bottom{
                width: 100%;
                margin-top: 30px;
                height: 52px;
            }
        }
        //声音详情页
        .audioDetail{
            
            display: flex;
            width: 100%;
            height: 100%;
            .audioDetail-main{
                width: calc(100% - 340px);
                height: calc(100% - 40px);
                margin-top: 40px;
                position: relative;
                >div{
                    position: relative;
                    left: 50%;
                    transform: translate(-50%);
                    width: 500px;
                    .audioDetail-main-title{
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        .title{
                            color: #000;
                            font-family: "PingFang SC";
                            font-size: 24px;
                            font-style: normal;
                            font-weight: 500;
                            line-height: 150%;
                            margin-right: 15px;
                        }
                        .edit-box{
                            display: flex;
                            align-items: center;
                            cursor: pointer;
                            span{
                                color: #666;
                                font-family: "PingFang SC";
                                font-size: 14px;
                                font-style: normal;
                                font-weight: 400;
                                line-height: 150%; /* 21px */
                            }
                        }
                        .edit-btn{
                            cursor: pointer;
                            margin-left: 15px;
                        }
                    }
                    .audioDetail-main-content{
                        margin-top: 30px;
                        .slider{
                            display: flex;
                            justify-content: space-between;
                            align-items: center;
                            >div:first-child{
                                width: 10%;
                                color: #000;
                                font-family: "PingFang SC";
                                font-size: 14px;
                                font-style: normal;
                                font-weight: 400;
                                line-height: 150%; /* 21px */
                                text-align: start;
                            }
                            >div:nth-child(2){
                                width: 82%;
                            }
                            >div:last-child{
                                width: 8%;
                                color: #000;
                                font-family: "PingFang SC";
                                font-size: 14px;
                                font-style: normal;
                                font-weight: 400;
                                line-height: 150%; /* 21px */
                                text-align: end;
                            }
                        }
                    }
                    .audioDetail-main-bottom{
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        margin-top: 40px;
                        >div:first-child{
                            cursor: pointer;
                            width: 55%;
                            height: 40px;
                            border-radius: 6px;
                            background: #1F64FF;
                            box-shadow: 0px 2px 6px 0px rgba(98, 98, 98, 0.10);
                            color: #FFF;
                            text-align: center;
                            font-family: "PingFang SC";
                            font-size: 16px;
                            font-style: normal;
                            font-weight: 500;
                            line-height: 40px; /* 27px */
                            letter-spacing: 0.18px;
                        }
                        >div:last-child{
                            display: flex;
                            >div{
                                cursor: pointer;
                                img{
                                    width: 24px;
                                    height: 24px;
                                    position: relative;
                                    left: 50%;
                                    transform: translate(-50%);
                                }
                            }
                            .text{
                                color: #000;
                                font-family: "PingFang SC";
                                font-size: 14px;
                                font-style: normal;
                                font-weight: 400;
                                line-height: 150%; /* 21px */
                            }
                        }
                    }
                }
            }
            /* 详情历史记录 */
            .audioDetail-right {
                width: 340px;
                height: 100%;
                overflow-y: hidden;
                background-color: #FFFFFF;
                padding: 20px;
                box-sizing: border-box;
                z-index: 1;
                border-left: 1px solid #EFEFF2;
                .audioDetail-right-title {
                color: #333;
                font-family: PingFang SC;
                font-size: 14px;
                font-style: normal;
                font-weight: 500;
                line-height: normal;
                }

                .audioDetail-right-line {
                width: 100%;
                background: #EFEFF2;
                height: 1px;
                margin-top: 4px;
                }

                .audioDetail-right-input {
                margin-top: 16px;
                }

                .audioDetail-right-input .el-input {
                height: 40px !important;
                padding: 5px 0px !important;
                box-sizing: border-box !important;
                }

                /deep/ .el-input__inner {
                width: 100%;
                height: 100%;
                background: var(--light-fill-color-fill-2, #F2F3F5) !important;

                }

                /deep/ .el-input__suffix {
                height: 35px;
                left: 270px;
                top: 0px;
                }

                #history-list {
                box-sizing: border-box;
                height: calc(100% - 70px);
                overflow-y: auto;

                }

                .history-mask {
                height: 100%;
                box-sizing: border-box;
                overflow-y: auto;
                }

                .history-box {
                width: 100%;
                height: 208px;
                padding: 16px;
                box-sizing: border-box;
                border-radius: 4px;
                border: 1px solid #F5F5F5;
                background: #FFF;
                margin-top: 16px;
                }

                .history-title {
                color: #000;
                font-family: PingFang SC;
                font-size: 16px;
                font-style: normal;
                font-weight: 500;
                line-height: 150%;
                margin-bottom: 13px;
                /* 24px */
                }

                .history-content>div {
                display: flex;
                justify-content: space-between;
                /* line-height: 33px; */
                margin-bottom: 9px;
                }

                .history-content>div div:first-child {
                color: #A4A4A4;
                font-family: PingFang SC;
                font-size: 14px;
                font-style: normal;
                font-weight: 400;
                /* 21px */
                }

                .history-content>div div:last-child {
                display: flex;
                }

                .history-content>div div:last-child div:first-child {
                color: #000;
                text-align: right;
                font-family: PingFang SC;
                font-size: 14px;
                font-style: normal;
                font-weight: 400;
                line-height: 21px;
                /* 21px */
                }

                .history-content>div div:last-child div:last-child {
                position: relative;
                top: -2px;
                }

                .history-bottom {
                display: flex;
                justify-content: space-between;
                }

                .history-bottom button {
                color: #1F64FF;
                text-align: center;
                font-family: PingFang SC;
                font-size: 14px;
                font-style: normal;
                font-weight: 600;
                line-height: 24px;
                /* 171.429% */
                /* width: 96px; */
                padding: 6px 23px;
                box-sizing: border-box;
                border-radius: 4px;
                border: 1px solid #1F64FF;
                background: #FFF;
                }

                .history-bottom button:last-child {
                border: 1px solid #A4A4A4;
                color: #A4A4A4;
                }

                .noHistory {
                width: 100%;
                height: calc(100% - 100px);
                display: flex;
                justify-content: center;
                align-items: center;
                color: #8D8C8F;
                font-family: PingFang SC;
                font-size: 14px;
                font-style: normal;
                font-weight: 500;
                line-height: 150%;
                text-align: center;
                /* 21px */
                }
            }
        }
        .pay-success{
            width: 100%;
            height: 100%;
           overflow-y: hidden;
            .title {
                margin-top: 40px;
                >div:first-child {
                    color: #000;
                    font-family: "PingFang SC";
                    font-size: 36px;
                    font-style: normal;
                    font-weight: 500;
                    text-align: center;
                    /* 54px */
                }

                >div:last-child {
                    color: #666;
                    font-family: "PingFang SC";
                    font-size: 16px;
                    font-style: normal;
                    font-weight: 400;
                    line-height: 150%;
                    text-align: center;
                    /* 24px */
                }
            }
            .pay-success-content{
                position: relative;
                top: 120px;
                img{
                    position: relative;
                    left: 50%;
                    transform: translate(-50%);
                    border-radius: 50%;
                }
                .pay-text{
                    color: #000;
                    text-align: center;
                    font-family: "PingFang SC";
                    font-size: 20px;
                    font-style: normal;
                    font-weight: 500;
                    line-height: 26px; /* 130% */
                    margin-top: 15px;
                    margin-bottom: 10px; 
                }
                .pay-tips{
                    color: #A4A4A4;
                    text-align: center;
                    font-family: "PingFang SC";
                    font-size: 15px;
                    font-style: normal;
                    font-weight: 400;
                    line-height: 26px; /* 173.333% */
                }
                .pay-time{
                    color: #666;
                    text-align: center;
                    font-family: "PingFang SC";
                    font-size: 15px;
                    font-style: normal;
                    font-weight: 400;
                    line-height: 26px; /* 173.333% */
                    margin-top: 15px;
                    margin-bottom: 10px;
                }
                .pay-btn{
                    display: flex;
                    width: 96px;
                    padding: 6px 23px;
                    justify-content: center;
                    align-items: center;
                    gap: 10px;
                    border-radius: 4px;
                    border: 1px solid #1F64FF;
                    color: #1F64FF;
                    text-align: center;
                    font-family: "PingFang SC";
                    font-size: 14px;
                    font-style: normal;
                    font-weight: 600;
                    line-height: 24px; /* 171.429% */
                    margin: auto;
                }
            }
        }
        .orderRecord{
            width: 100%;
            height: 100%;
            .orderRecord-title{
                width: 100%;
                display: flex;
                justify-content: space-between;
                >div:last-child{
                    width: 250px;
                }
            }
            .orderRecord-content{
                margin-top: 10px;
                width: 100%;
                height: calc(100% - 40px - 10px - 67px);
                overflow-y: auto;
            }
            .orderRecord-bottom{
                display: flex;
                align-items: center;
                margin-top: 15px;
                .btn_del {
                    background: #1f64ff;
                    border-radius: 2px;
                    font-style: normal;
                    font-weight: 400;
                    font-size: 14px;
                    color: #fff;
                    padding: 0px 16px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    height: 28px;
                    cursor: pointer;
                }

                .cancel_del {
                    background: #f2f3f5;
                    border-radius: 2px;
                    font-style: normal;
                    font-weight: 400;
                    font-size: 14px;
                    color: #4e5969;
                    padding: 0px 16px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    height: 28px;
                    margin-left: 20px;
                    cursor: pointer;
                }
            }
        }
    }
}</style>