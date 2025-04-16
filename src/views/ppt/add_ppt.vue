<template>
    <div class="fullscreen-bg">
        <div class="container">
            <div class="back_btn" @click="$router.back()">
                <i class="el-icon-arrow-left" style="color: #000; font-size: 14px; line-height: 16px;"></i>
                <span class="back_text">返回</span>
            </div>

<!------------------------------------- 主题 ---------------------------------------------------------->
            <div class="theme" v-if="keyword == 'theme'">
                <div class="theme_cont">
                    <el-image style="width: 100%;" :src="themeImg" fit="fill"></el-image>
                    <div class="cont_ul">
                        <div class="ul_left" v-if="step > 0">
                            <div class="ul_qs">您好，我是您的专属PPT AI 助手，今天需要我协助完成什么内容？</div>
                        </div>

                        <div class="ul_right" v-if="step > 0">
                            <div class="ul_as">
                                <div class="as_input">
                                     <el-input placeholder="请输入您的主题" type="text" v-model="sendVal" style="height: 64px; border: none" :disabled="step > 1"></el-input>
                                     <el-image style="width: 30px; height: 30px; cursor: pointer;" :src="sendImg" fit="fill" v-if="step < 2" @click="sendTheme"></el-image>
                                     <el-image style="width: 30px; height: 30px; cursor: pointer;" :src="nosendImg" fit="fill" v-if="step > 1"></el-image>
                                </div>
                                <!-- <div class="as_check"> -->
                                    <!-- <el-checkbox-group v-model="checkList">
                                        <el-checkbox label="演讲备注"></el-checkbox>
                                        <el-checkbox label="AI配图"></el-checkbox>
                                    </el-checkbox-group> -->
                                    <!-- <el-checkbox v-model="isCheck">演讲备注</el-checkbox> -->
                                <!-- </div> -->
                            </div>
                        </div>
                        
                        <div class="ul_left" v-if="step > 1">
                            <div class="ul_qs">好的，已收到您的要求，让我先为您生成PPT标题和大纲</div>
                        </div>

                        <div class="ul_loading" v-if="step > 1 && baseList.length == 0">
                            <span class="loading_text">生成中</span>
                            <img style="width: 16px; height: 16px; opacity: 0.5;" src="../../assets/images/await.gif" alt="" />
                        </div>

                        <div class="ul_left" v-if="step > 2">
                            <div class="ul_title">
                                <div class="ul_slove">您可以对大纲进行编辑，或者保持原样继续</div>
                                <div class="title_cont" style="min-height: 100px">
                                    <div class="cont_page">
                                        <div class="page_l">主标题</div>
                                        <div class="page_m">
                                            <div class="m_line" style="background: #fff;"></div>
                                            <div class="m_circle"></div>
                                            <div class="m_line"></div>
                                        </div>
                                        <div class="page_r">
                                            <div class="l_name">
                                                <el-input v-model="baseList.title" placeholder="请输入内容"></el-input>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="cont_page">
                                        <div class="page_l">副标题</div>
                                        <div class="page_m">
                                            <div class="m_line"></div>
                                            <div class="m_circle"></div>
                                            <div class="m_line" style="background: #fff;"></div>
                                        </div>
                                        <div class="page_r">
                                            <div class="l_name">
                                                <el-input v-model="baseList.subTitle" placeholder="请输入内容"></el-input>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="title_cont">
                                    <div v-for="(item, index) in baseList.chapters" :key="index">
                                        <div class="cont_page">
                                            <div class="page_l">章节{{ index+1 }}</div>
                                            <div class="page_m">
                                                <div class="m_line" :style="index === 0 ? 'background: #fff' : 'background: #f2f2f2'"></div>
                                                <div class="m_circle"></div>
                                                <div class="m_line"></div>
                                            </div>
                                            <div class="page_r">
                                                <div class="l_name">
                                                    <el-input v-model="item.chapterTitle" placeholder="请输入内容"></el-input>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="cont_page" v-for="(val, tip) in item.chapterContents" :key="tip">
                                            <div class="page_l_empty"></div>
                                            <div class="page_m_li">
                                                <div class="m_line" style="height: 60px"></div>
                                            </div>
                                            <div class="page_m_left">
                                                <div class="m_li_line"></div>
                                                <div class="m_li_circle"></div>
                                            </div>
                                            <div class="page_r">
                                                <div class="l_name_li">
                                                    <el-input v-model="val.chapterTitle" placeholder="请输入内容"></el-input>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="title_btn" v-if="baseList.chapters.length > 0">
                                    <div class="btn_l">
                                        <i class="el-icon-refresh" style="color: #003FFF; font-size: 16px;"></i>
                                        <span class="l_text" @click="sendTheme">重新生成</span>
                                    </div>
                                    <div class="btn_r" @click="nextStep">下一步</div>
                                </div>
                                <div class="ul_texts" style="margin-top: 15px;">生成大纲 每次消耗5043算力</div>
                            </div>
                           
                        </div>
                    </div>
                </div>
            </div>
<!------------------------------------- 文本 ---------------------------------------------------------->
            <div class="theme" v-if="keyword == 'text'">
                <div class="theme_cont">
                    <el-image style="width: 100%;" :src="textImg" fit="fill"></el-image>
                    <div class="cont_ul">
                        <div class="ul_left" v-if="step > 0">
                            <div class="ul_btn">
                                <span class="btn_l">您好，请先点击右侧输入文本按钮进行文本编辑</span>
                                <span class="btn_r" @click="textVisible = true">输入文本</span>
                            </div>
                        </div>

                        <div class="ul_right" style="margin-bottom: 20px" v-if="step > 1">
                            <div class="ul_as_text" :title="qs_text">{{ qs_text }}</div>
                        </div>
                        
                        <div class="ul_left" v-if="step > 2">
                            <div class="ul_qs">已收到您输入的文本，接下来我会整理、提炼相关内容，请耐心等待。</div>
                        </div>

                        <div class="ul_loading" v-if="step > 2 && baseList.length == 0">
                            <span class="loading_text">生成中</span>
                            <img style="width: 16px; height: 16px; opacity: 0.5;" src="../../assets/images/await.gif" alt="" />
                        </div>

                        <div class="ul_left" v-if="step > 3">
                            <div class="ul_title">
                                <div class="ul_slove">您可以对大纲进行编辑，或者保持原样继续</div>
                                <div class="title_cont" style="min-height: 100px">
                                    <div class="cont_page">
                                        <div class="page_l">主标题</div>
                                        <div class="page_m">
                                            <div class="m_line" style="background: #fff;"></div>
                                            <div class="m_circle"></div>
                                            <div class="m_line"></div>
                                        </div>
                                        <div class="page_r">
                                            <div class="l_name">
                                                <el-input v-model="baseList.title" placeholder="请输入内容"></el-input>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="cont_page">
                                        <div class="page_l">副标题</div>
                                        <div class="page_m">
                                            <div class="m_line"></div>
                                            <div class="m_circle"></div>
                                            <div class="m_line" style="background: #fff;"></div>
                                        </div>
                                        <div class="page_r">
                                            <div class="l_name">
                                                <el-input v-model="baseList.subTitle" placeholder="请输入内容"></el-input>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="title_cont">
                                    <div v-for="(item, index) in baseList.chapters" :key="index">
                                        <div class="cont_page">
                                            <div class="page_l">章节{{ index+1 }}</div>
                                            <div class="page_m">
                                                <div class="m_line" :style="index === 0 ? 'background: #fff' : 'background: #f2f2f2'"></div>
                                                <div class="m_circle"></div>
                                                <div class="m_line"></div>
                                            </div>
                                            <div class="page_r">
                                                <div class="l_name">
                                                    <el-input v-model="item.chapterTitle" placeholder="请输入内容"></el-input>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="cont_page" v-for="(val, tip) in item.chapterContents" :key="tip">
                                            <div class="page_l_empty"></div>
                                            <div class="page_m_li">
                                                <div class="m_line" style="height: 60px"></div>
                                            </div>
                                            <div class="page_m_left">
                                                <div class="m_li_line"></div>
                                                <div class="m_li_circle"></div>
                                            </div>
                                            <div class="page_r">
                                                <div class="l_name_li">
                                                    <el-input v-model="val.chapterTitle" placeholder="请输入内容"></el-input>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="title_btn"  v-if="baseList.chapters.length > 0">
                                    <div class="btn_l">
                                        <i class="el-icon-refresh" style="color: #003FFF; font-size: 16px;"></i>
                                        <span class="l_text" @click="sendTheme">重新生成</span>
                                    </div>
                                    <div class="btn_r" @click="nextStep">下一步</div>
                                </div>
                                <div class="ul_texts" style="margin-top: 15px;">生成大纲 每次消耗5043算力</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

<!------------------------------------- 文档 ---------------------------------------------------------->
            <div class="theme" v-if="keyword == 'document'">
                <div class="theme_cont">
                    <el-image style="width: 100%;" :src="docImg" fit="fill"></el-image>
                    <div class="cont_ul">
                        <div class="ul_left" v-if="step > 0">
                            <div class="ul_qs">您好，我是您的专属PPT AI 助手，请先上传你的文档，AI助手会对文档内容进行解析。</div>
                        </div>

                        <div class="ul_right" style="margin-bottom: 20px;" v-if="step > 0">
                            <div class="right_doc">
                                <el-upload
                                class="upload-demo"
                                drag
                                :data="uploadData"
                                :on-change="handleChange"
                                :before-upload="beforeUpload"
                                :on-success="handleSuccess"
                                :headers="headerData"
                                :action="httpUrls.loginUrl + 'api/user/oss_upload'">
                                <i class="el-icon-upload"></i>
                                <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                                </el-upload>
                                <div class="doc_text">上传文件支持pdf(不支持扫描件)、docx、txt、md格式的文档，文件大小不能超过10MB</div>
                                <!-- <div class="as_check" style="text-align: left; margin-bottom: 20px;">
                                    <el-checkbox-group v-model="checkList">
                                        <el-checkbox label="演讲备注"></el-checkbox>
                                        <el-checkbox label="AI配图"></el-checkbox>
                                    </el-checkbox-group>
                                </div> -->

                                <div class="right_slove_btn">
                                    <el-button type="primary" size="small" :disabled="isBtn" @click="sendDoc">开始解析文档</el-button>
                                </div>
                            </div>
                            
                        </div>
                        
                        <div class="ul_left" v-if="step > 1">
                            <div class="ul_qs">好的，已收到您的要求，让我先为您生成PPT标题和大纲</div>
                        </div>

                        <div class="ul_loading" v-if="step > 1 && baseList.length == 0">
                            <span class="loading_text">生成中</span>
                            <img style="width: 16px; height: 16px; opacity: 0.5;" src="../../assets/images/await.gif" alt="" />
                        </div>

                        <div class="ul_left" v-if="step > 2">
                            <div class="ul_title">
                                <div class="ul_slove">您可以对大纲进行编辑，或者保持原样继续</div>
                                <div class="title_cont" style="min-height: 100px">
                                    <div class="cont_page">
                                        <div class="page_l">主标题</div>
                                        <div class="page_m">
                                            <div class="m_line" style="background: #fff;"></div>
                                            <div class="m_circle"></div>
                                            <div class="m_line"></div>
                                        </div>
                                        <div class="page_r">
                                            <div class="l_name">
                                                <el-input v-model="baseList.title" placeholder="请输入内容"></el-input>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="cont_page">
                                        <div class="page_l">副标题</div>
                                        <div class="page_m">
                                            <div class="m_line"></div>
                                            <div class="m_circle"></div>
                                            <div class="m_line" style="background: #fff;"></div>
                                        </div>
                                        <div class="page_r">
                                            <div class="l_name">
                                                <el-input v-model="baseList.subTitle" placeholder="请输入内容"></el-input>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="title_cont">
                                    <div v-for="(item, index) in baseList.chapters" :key="index">
                                        <div class="cont_page">
                                            <div class="page_l">章节{{ index+1 }}</div>
                                            <div class="page_m">
                                                <div class="m_line" :style="index === 0 ? 'background: #fff' : 'background: #f2f2f2'"></div>
                                                <div class="m_circle"></div>
                                                <div class="m_line"></div>
                                            </div>
                                            <div class="page_r">
                                                <div class="l_name">
                                                    <el-input v-model="item.chapterTitle" placeholder="请输入内容"></el-input>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="cont_page" v-for="(val, tip) in item.chapterContents" :key="tip">
                                            <div class="page_l_empty"></div>
                                            <div class="page_m_li">
                                                <div class="m_line" style="height: 60px"></div>
                                            </div>
                                            <div class="page_m_left">
                                                <div class="m_li_line"></div>
                                                <div class="m_li_circle"></div>
                                            </div>
                                            <div class="page_r">
                                                <div class="l_name_li">
                                                    <el-input v-model="val.chapterTitle" placeholder="请输入内容"></el-input>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="title_btn" v-if="baseList.chapters.length > 0">
                                    <div class="btn_l">
                                        <i class="el-icon-refresh" style="color: #003FFF; font-size: 16px;"></i>
                                        <span class="l_text" @click="sendDoc">重新生成</span>
                                    </div>
                                    <div class="btn_r" @click="nextStep">下一步</div>
                                </div>
                                <div class="ul_texts" style="margin-top: 15px;">生成大纲 每次消耗5043算力</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

<!------------------------------------- 自定义 ---------------------------------------------------------->
            <div class="theme" v-if="keyword == 'diy'">
                <div class="theme_cont">
                    <el-image style="width: 100%;" :src="diyImg" fit="fill"></el-image>
                    <div class="cont_ul">
                        <div class="ul_left" v-if="step > 0">
                            <div class="ul_qs">您好，我是您的专属PPT AI 助手，今天需要我协助完成什么内容？</div>
                        </div>

                        <div class="ul_right" v-if="step > 0">
                            <div class="ul_as">
                                <div class="as_input" style="margin-bottom: 20px;">
                                     <el-input placeholder="请输入您的主题" type="text" v-model="sendVal" style="height: 64px; border: none" :disabled="step > 1"></el-input>
                                     <el-image style="width: 30px; height: 30px; cursor: pointer;" :src="sendImg" fit="fill" v-if="step < 2" @click="sendDoc"></el-image>
                                     <el-image style="width: 30px; height: 30px; cursor: pointer;" :src="nosendImg" fit="fill" v-if="step > 1"></el-image>
                                </div>
                                <div class="zdy_li">
                                    <div>
                                        <el-popover placement="bottom" :width="40" trigger="hover">
                                            <template #reference>
                                                <div style="display: flex; align-items: center;">
                                                    <div class="li_slove">
                                                        <el-image style="width: 16px; height: 16px;" :src="uploadImg" fit="fill"></el-image>
                                                        <span class="slove_text">参考资料</span>
                                                    </div>
                                                    <div class="doc_name" v-if="file_name != ''"> {{ file_name }}</div>
                                                </div>
                                            </template>
                                            <template #default>
                                                <div class="operate">
                                                    <!-- <div class="oper_copy" @click="textVisible = true">
                                                        <el-image style="width: 16px; height: 16px;" :src="textIcon" fit="fill"></el-image>
                                                        <span class="copy_text">文本输入</span>
                                                    </div> -->
                                                    <div class="oper_copy" @click="docVisible = true">
                                                        <el-image style="width: 16px; height: 16px;" :src="docIcon" fit="fill"></el-image>
                                                        <span class="copy_text">上传文档</span>
                                                    </div>
                                                </div>
                                            </template>
                                        </el-popover>
                                    </div>
                                    <!-- <div>
                                        <el-checkbox-group v-model="checkList">
                                            <el-checkbox label="演讲备注"></el-checkbox>
                                            <el-checkbox label="AI配图"></el-checkbox>
                                        </el-checkbox-group>
                                    </div> -->
                                </div>
                                
                            </div>
                        </div>
                        
                        <div class="ul_left" v-if="step > 1">
                            <div class="ul_qs">好的，已收到您的要求，让我先为您生成PPT标题和大纲</div>
                        </div>

                        <div class="ul_loading" v-if="step > 1 && baseList.length == 0">
                            <span class="loading_text">生成中</span>
                            <img style="width: 16px; height: 16px; opacity: 0.5;" src="../../assets/images/await.gif" alt="" />
                        </div>

                        <div class="ul_left" v-if="step > 2">
                            <div class="ul_title">
                                <div class="ul_slove">您可以对大纲进行编辑，或者保持原样继续</div>
                                <div class="title_cont" style="min-height: 100px">
                                    <div class="cont_page">
                                        <div class="page_l">主标题</div>
                                        <div class="page_m">
                                            <div class="m_line" style="background: #fff;"></div>
                                            <div class="m_circle"></div>
                                            <div class="m_line"></div>
                                        </div>
                                        <div class="page_r">
                                            <div class="l_name">
                                                <el-input v-model="baseList.title" placeholder="请输入内容"></el-input>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="cont_page">
                                        <div class="page_l">副标题</div>
                                        <div class="page_m">
                                            <div class="m_line"></div>
                                            <div class="m_circle"></div>
                                            <div class="m_line" style="background: #fff;"></div>
                                        </div>
                                        <div class="page_r">
                                            <div class="l_name">
                                                <el-input v-model="baseList.subTitle" placeholder="请输入内容"></el-input>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="title_cont">
                                    <div v-for="(item, index) in baseList.chapters" :key="index">
                                        <div class="cont_page">
                                            <div class="page_l">章节{{ index+1 }}</div>
                                            <div class="page_m">
                                                <div class="m_line" :style="index === 0 ? 'background: #fff' : 'background: #f2f2f2'"></div>
                                                <div class="m_circle"></div>
                                                <div class="m_line"></div>
                                            </div>
                                            <div class="page_r">
                                                <div class="l_name">
                                                    <el-input v-model="item.chapterTitle" placeholder="请输入内容"></el-input>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="cont_page" v-for="(val, tip) in item.chapterContents" :key="tip">
                                            <div class="page_l_empty"></div>
                                            <div class="page_m_li">
                                                <div class="m_line" style="height: 60px"></div>
                                            </div>
                                            <div class="page_m_left">
                                                <div class="m_li_line"></div>
                                                <div class="m_li_circle"></div>
                                            </div>
                                            <div class="page_r">
                                                <div class="l_name_li">
                                                    <el-input v-model="val.chapterTitle" placeholder="请输入内容"></el-input>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="title_btn" v-if="baseList.chapters.length > 0">
                                    <div class="btn_l">
                                        <i class="el-icon-refresh" style="color: #003FFF; font-size: 16px;"></i>
                                        <span class="l_text" @click="sendDoc">重新生成</span>
                                    </div>
                                    <div class="btn_r" @click="nextStep">下一步</div>
                                </div>
                                <div class="ul_texts" style="margin-top: 15px;">生成大纲 每次消耗5043算力</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

             <!-- 文本弹窗 -->
            <el-dialog
                title="文本创建"
                :visible.sync="textVisible"
                @close="textVisible = false"
                width="500px" style="border-radius: 10px">
                <div class="text_cont">
                    <el-image style="width: 110px; height: 50px;" :src="dialogImg" fit="fill"></el-image>
                    <div class="cont_desc" style="margin-top: -23px">
                        <el-input
                            type="textarea"
                            :rows="10"
                            :maxlength="8000"
                            placeholder="请输入内容"
                            show-word-limit
                            v-model="text_val">
                        </el-input>
                    </div>
                    <!-- <div class="as_check" v-if="keyword != 'diy'">
                        <el-checkbox-group v-model="checkList">
                            <el-checkbox label="演讲备注"></el-checkbox>
                            <el-checkbox label="AI配图"></el-checkbox>
                        </el-checkbox-group>
                    </div> -->
                </div>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="textVisible = false">取 消</el-button>
                    <el-button type="primary" style="background: #003FFF;" @click="sendText">发送</el-button>
                </span>
            </el-dialog>

             <!-- 上传文档弹窗 -->
             <el-dialog
                title="上传文档"
                :visible.sync="docVisible"
                @close="docVisible = false"
                width="500px" style="border-radius: 10px">
                <div class="text_cont" style="text-align: center">
                    <el-upload
                    class="upload-demo"
                    drag
                    :data="uploadData"
                    :headers="headerData"
                    :on-change="handleChange"
                    :before-upload="beforeUpload"
                    :on-success="handleSuccess"
                    :action="httpUrls.loginUrl + 'api/user/oss_upload'">
                    <i class="el-icon-upload"></i>
                    <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                    </el-upload>
                    <div class="doc_text">上传文件支持pdf(不支持扫描件)、docx、txt、md格式的文档，文件大小不能超过10MB</div>
                </div>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="docVisible = false">取 消</el-button>
                    <el-button type="primary" style="background: #003FFF;" @click="docVisible = false">确定</el-button>
                </span>
            </el-dialog>
        </div>

    </div>
</template>
<script>
import httpUrls from "@/api/requestURL";
import { addBase, addDocBase } from '@/api/ppt'
export default {
    name: "add_ppt",
    data() {
        return {
            themeImg: httpUrls.ossUrl + 'pc/com/message_center/ppt_theme.png',
            textImg: httpUrls.ossUrl + 'pc/com/message_center/ppt_text_back.png',
            nosendImg: httpUrls.ossUrl + 'pc/com/message_center/ppt_nosend.png',
            sendImg: httpUrls.ossUrl + 'pc/com/message_center/ppt_send.png',
            dialogImg: httpUrls.ossUrl + 'pc/com/message_center/text_dialog.png',
            docImg: httpUrls.ossUrl + 'pc/com/message_center/ppt_doc.png',
            uploadImg: httpUrls.ossUrl + 'pc/com/message_center/ppt_upload.png',
            diyImg: httpUrls.ossUrl + 'pc/com/message_center/ppt_diy.png',
            textIcon: httpUrls.ossUrl + 'pc/com/message_center/ppt_doc_icon.png',
            docIcon: httpUrls.ossUrl + 'pc/com/message_center/ppt_text_icon.png',
            sendVal: '',
            isCheck: false,
            input_text: '晨会主题',
            keyword: '',
            textVisible: false,
            docVisible: false,
            text_val: '',
            qs_text: '',
            httpUrls: httpUrls,
            step: 0,
            baseList: [], //大纲内容
            isBtn: true,
            //文档上传
            uploadData: {
                image: null,
                image_name: null,
                oss_dir: "static",
                cate: "ppt",
            },
            file_name: '',
            file_url: '',
            headerData: {}

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
        let userInfo = JSON.parse(localStorage.getItem("userInfo"));
        this.headerData.authorization = userInfo.token
        this.headerData.role = userInfo.role
        this.keyword =  this.$route.query.keyword 
        this.step = 1
        // console.log(this.$route.query.keyword,778); // 输出: Vue  
    },

    // 里面的函数只有调用才会执行
    methods: {
        nextStep() {
            // this.$router.push('/ppt/ppt_template');
            this.$router.push({ name: 'templates', params: { sid: 1, cont: JSON.stringify(this.baseList), isCheck: this.isCheck } });
        },
        sendText() {
            this.qs_text = this.text_val
            this.textVisible = false
            this.step = 2;
            this.sendTheme()
        },

        // 文档上传前
        beforeUpload(file) {
            console.log(file);
            let index = file.name.lastIndexOf(".");
            let str = file.name.slice(index + 1);
            this.uploadData.image_name = file.name;
            if (
                str != "docx" &&
                str != "pdf" &&
                str != "txt" &&
                str != "md"
            ) {
                this.$message.error("文件仅支持docx、pdf、txt、md这4种类型!");
                return false;
            }
        },

        handleSuccess(res, file, ) {
            console.log(res,777)
            this.file_name = res.data.name
            this.file_url = res.data.new_url
            this.isBtn = false
        },

        handleChange(file, fileList) {
            console.log(file, 66666)
            this.uploadData.image = file.raw;
            this.uploadData.image_name = file.name;
        },
        // 生成大纲
        sendTheme() {
            
            let val = ''
            if(this.keyword == 'theme') {
                this.step = 2
                val = {
                    'text': this.sendVal
                }
            } else if(this.keyword == 'text') {
                this.step = 3
                val = {
                    'text': this.qs_text
                }
            }
           
            addBase(val).then(res => {
                if(res.code == 20000) {
                    this.baseList = res.data.outline
                    if(this.keyword == 'theme') {
                        this.step = 3
                    } else if(this.keyword == 'text') {
                        this.step = 4
                    }
                } else {
                    if(this.keyword == 'theme') {
                        this.step = 1
                    } else if(this.keyword == 'text') {
                        this.step = 2
                    }
                    this.$message({
                        message: res.msg,
                        duration: 3000,
                        type: 'warning'
                    });
                }
            }).catch((err) => {
                // console.log(val, 33333)
                if(this.keyword == 'theme') {
                    this.step = 1
                } else if(this.keyword == 'text') {
                    this.step = 2
                }
                this.$message({
                    message: '获取大纲失败，请重试',
                    duration: 2000,
                    type: 'error'
                });
            });
        },

        // 生成文档大纲
        sendDoc() {
            this.step = 2
            let val = {
                'prompt': this.sendVal,
                'file_name': this.file_name,
                'file_url': this.file_url
            }
            addDocBase(val).then(res => {
                if(res.code == 20000) {
                    this.baseList = res.data.outline
                    this.isBtn = true
                    this.step = 3
                } else {
                    this.step = 1
                    this.$message({
                        message: res.msg,
                        duration: 2000,
                        type: 'warning'
                    });
                }
            }).catch((err) => {
                this.step = 1
                this.$message({
                    message: '获取大纲失败，请重试',
                    duration: 2000,
                    type: 'error'
                });
            });
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
}
.theme {
    width: 100%;
    display: flex;
    justify-content: center;
    padding-top: 30px;
    .theme_cont {
        width: 60%;
        .cont_ul {
            padding: 30px 0;
            display: flex;
            flex-direction: column;
            .ul_loading {
                padding: 10px 15px;
                background: #fff;
                border-radius: 8px;
                display: flex;
                align-items: center;
                width: 20%;
                .loading_text {
                    font-weight: 500;
                    font-size: 14px;
                    padding-right: 10px;
                }
            }
            .ul_left {
                width: 100%;
                display: flex;
                justify-content: flex-start;
                .ul_qs {
                    max-width: 70%;
                    padding: 10px 15px;
                    background: #003FFF;
                    font-weight: 500;
                    font-size: 14px;
                    color: #FFFFFF;
                    line-height: 21px;
                    font-style: normal;
                    border-radius: 8px;
                    word-break: break-all; 
                    white-space: normal;
                    margin-bottom: 30px;
                }
                .ul_btn {
                    max-width: 70%;
                    padding: 10px 15px;
                    background: #003FFF;
                    margin-bottom: 30px;
                    display: flex;
                    align-items: center;
                    justify-content: flex-start;
                    border-radius: 8px;
                    .btn_l {
                        font-weight: 500;
                        font-size: 14px;
                        color: #FFFFFF;
                        line-height: 21px;
                        font-style: normal;
                        border-radius: 8px;
                        word-break: break-all; 
                        white-space: normal;
                    }
                    .btn_r {
                        padding: 5px 15px;
                        background: #fff;
                        color: #333;
                        font-size: 14px;
                        text-align: center;
                        line-height: 21px;
                        margin-left: 20px;
                        border-radius: 8px;
                        cursor: pointer;
                    }
                }
                .ul_title {
                    width: 70%;
                    min-height: 600px;
                    background: #fff;
                    border-radius: 16px;
                    padding: 20px;
                    .ul_slove {
                        font-weight: bold;
                        font-size: 14px;
                        color: #797F91;
                        line-height: 40px;
                    }
                    .title_cont {
                        min-height: 500px;
                        overflow: scroll;
                        background: #fff;
                        border-radius: 10px;
                        border: 2px solid #ECECEC;
                        padding: 20px;
                        margin-bottom: 20px;
                    }
                    .title_btn {
                        display: flex;
                        align-items: center;
                        justify-content: space-between;
                        padding: 10px 0;
                        cursor: pointer;
                        .btn_l {
                            width: 20%;
                            height: 40px;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            border-radius: 10px;
                            border: 1px solid #003FFF;
                            cursor: pointer;
                            .l_text {
                                font-weight: bold;
                                font-size: 14px;
                                color: #003FFF;
                                line-height: 22px;
                            }
                        }
                        .btn_r {
                            width: 75%;
                            height: 40px;
                            background: #003FFF;
                            border-radius: 10px;
                            font-size: 16px;
                            color: #fff;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                        }
                    }
                }
            }
            
            .ul_right {
                width: 100%;
                display: flex;
                justify-content: flex-end;
                // margin-bottom: 30px;
                .ul_as {
                    width: 70%;
                    padding: 10px 15px;
                    background: #fff;
                    border-radius: 8px;
                    margin-bottom: 30px;
                    padding: 20px;
                    .as_input {
                        height: 64px;
                        background: #FFFFFF;
                        border: 3px solid #0377FF ;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        padding-right: 10px;
                        border-radius: 16px;
                        // margin-bottom: 20px;
                    }
                }
                .ul_as_text {
                    max-width: 70%;
                    padding: 10px 15px;
                    background: #fff;
                    font-weight: 500;
                    font-size: 14px;
                    color: #000;
                    line-height: 21px;
                    border-radius: 8px;
                    text-align: right;
                    white-space: nowrap; /* 不换行 */
                    overflow: hidden; /* 隐藏溢出文本 */
                    text-overflow: ellipsis; /* 使用省略号表示溢出的文本 */
                }
                .right_doc {
                    width: 80%;
                    padding: 10px 15px;
                    background: #fff;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    flex-direction: column;
                    border-radius: 16px;
                    .right_slove_btn {
                        width: 100%;
                        display: flex;
                        justify-content: flex-end;
                        margin-top: 15px;
                    }
                }
            }
            
        }
    }
}
.doc_text {
    font-weight: 500;
    font-size: 12px;
    color: #666;
    line-height: 16px;
    margin-top: 10px;
}

.cont_page {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    height: 60px;
    .page_l {
        width: 40px;
        height: 30px;
        background: #F2F2F2;
        border-radius: 5px;
        font-weight: bold;
        font-size: 12px;
        color: #666;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .page_l_empty {
        width: 59px;
        height: 30px;
    }
    .page_m_li {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        // margin-left: 18px;
    }

    .page_m_left {
        display: flex;
        align-items: center;
        justify-content: center;
        margin-right: 15px;
        .m_li_line {
            width: 25px;
            height: 2px;
            background: #f2f2f2;
        }
        .m_li_circle {
            width: 10px;
            height: 10px;
            border: 1px solid #f2f2f2;
            background: #fff;
            border-radius: 50%;
        }
    }

    .page_m {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        width: 40px;
        height: 60px;
    }

    .m_line {
        width: 2px;
        height: 25px;
        background: #f2f2f2;
    }
    .m_circle {
        width: 10px;
        height: 10px;
        background: #f2f2f2;
        border-radius: 50%;
    }

    .page_r {
        display: flex;
        align-items: center;
        justify-content: flex-start;
        flex: 1;
        .l_name {
            font-weight: bold;
            font-size: 14px;
            color: #000;
        }
    }
}
.zdy_li {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    .li_slove {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 108px;
        height: 32px;
        background: #F2F5FF;
        border-radius: 10px;
        border: 1px solid #CCD9FF; 
        .slove_text {
            font-weight: bold;
            font-size: 14px;
            color: #003FFF;
        }
    }
    .doc_name {
        background: #FFFFFF;
        border-radius: 10px;
        border: 1px solid #EAEAEA;
        padding: 8px 10px;
        margin-left: 10px;
        font-weight: 500;
        font-size: 14px;
        color: #000;
        display: flex;
        align-items: center;
    }
}

.operate {
    padding: 5px;
    cursor: pointer;
    .oper_copy {
        background: #fff;
        border-radius: 8px 8px 8px 8px;
        padding-left: 10px;
        .copy_text {
            font-size: 14px;
            color: #000;
            line-height: 40px;
            padding-left: 10px;
        }
    }
    .oper_copy:hover {
        background: #F6F6F6;
    }
}

.as_check {
    margin: 15px 0;
    width: 100%;
}

.right_slove_btn /deep/ .el-button--primary {
    background-color: #0377FF;
    border-color: #0377FF;
}
.right_slove_btn /deep/ .el-button--primary.is-disabled {
    background-color: #a0cfff;
    border-color: #a0cfff;
}
.ul_right /deep/ .el-upload-dragger {
    height: 120px;
}
.ul_right /deep/ .el-upload-dragger .el-icon-upload {
    margin-top: 20px;
}
.l_name /deep/ .el-input__inner {
    border: 1px solid #fff;
    color: #000;
    font-weight: bold;
    font-size: 16px;
    padding-left: 0;
}

.l_name /deep/ .el-input__inner:focus {
    outline: none;
    border-color: #409eff;
    padding-left: 10px;
}

.l_name_li /deep/ .el-input__inner {
    border: 1px solid #fff;
    color: #000;
    font-weight: 500;
    font-size: 14px;
    padding-left: 0;
}

.l_name_li /deep/ .el-input__inner:focus {
    outline: none;
    border-color: #409eff;
    padding-left: 10px;
}
.ul_right /deep/ .el-input__inner {
  height: 64px;
  background: #fff;
  border: none;
  border-radius: 16px;
}

.text_cont /deep/ .el-upload-list {
    width: 360px;
}

.ul_texts {
    color: #000;
    font-size: 14px;
    line-height: 21px;
}
</style>