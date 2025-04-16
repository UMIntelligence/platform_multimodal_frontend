<template>
  <div class="draw_container">
      <div class="cont_left">
          <div class="model_ul">
              <div class="model_ul_title">
                  <div class="ul_title_l">
                      <span class="title_text">模型/工作流</span>
                      <span class="title_start">*</span>
                      <el-popover placement="right" :width="250" trigger="hover">
                          <template #reference>
                              <el-image class="title_examp"
                                  :src="httpUrls.ossUrl + 'pc/com/message_center/bxl_draw_tip.png'" fit="fill" />
                          </template>
                          <template #default>
                              <div class="examp_text">选择“模型/工作流”生成绘图时，将生成对应风格的绘图</div>
                          </template>
                      </el-popover>
                  </div>
                  <div class="ul_title_r">
                      <div :class="[tabIndex == 1 ? 'title_tab_active' : 'title_tab']" @click="changTab(1)">最近使用</div>
                      <div :class="[tabIndex == 2 ? 'title_tab_active' : 'title_tab']" style="margin: 0 20px"
                          @click="changTab(2)">全部
                      </div>
                      <div :class="[tabIndex == 3 ? 'title_tab_active' : 'title_tab']" @click="changTab(3)">工作流</div>
                  </div>
              </div>

              <div class="model_li">
                  <div class="model_examp" :style="{ border: model_active === index ? '2px solid #003FFF' : 'none' }"
                      v-for="(item, index) in modelList" :key="index" @click="selectModel(index, item.id)"
                      v-if="modelList.length > 0">
                      <el-image class="img_examp" :src="httpUrls.imgUrl + item.title_img_path" fit="fill" />
                      <el-image class="img_check" :src="httpUrls.ossUrl + 'pc/com/message_center/bxl_draw_check.png'"
                          fit="fill" v-if="model_active === index" />
                      <span class="model_tip">{{ item.model_name }}</span>
                  </div>
                  <div class="model_empty" v-if="modelList.length == 0">该类型下暂无模型</div>
              </div>

              <div class="model_img">
                  <el-image class="img_ope" :src="httpUrls.ossUrl + 'pc/com/message_center/bxl_draw_model.png'"
                      fit="fill" @click="modelVisible = true" />
              </div>
          </div>

          <div class="model_ul">
              <div class="model_ul_title" style="margin-bottom: 20px;">
                  <div class="ul_title_l">
                      <span class="title_text">增益Lora</span>
                      <el-popover placement="right" :width="250" trigger="hover">
                          <template #reference>
                              <el-image class="title_examp"
                                  :src="httpUrls.ossUrl + 'pc/com/message_center/bxl_draw_tip.png'" fit="fill" />
                          </template>
                          <template #default>
                              <div class="examp_text">选择“增益Lora”生成绘图时，将基于模型/工作流的风格生成 增益Lora对应的具体概念</div>
                          </template>
                      </el-popover>
                  </div>
                  <div class="ul_title_r">
                      <div class="loral_add" @click="loralVisible = true">
                          <el-icon class="loral_icon">
                              <Plus />
                          </el-icon>
                          <span class="add_text">添加</span>
                      </div>
                  </div>
              </div>

              <div class="loral_ul" v-for="(item, index) in selectLoralList" :key="index">
                  <div class="loral_left">
                      <el-image class="loral_img" :src="httpUrls.imgUrl + item.title_img_path" fit="fill" />
                      <div class="loral_info">
                          <div class="info_title">{{ item.model_name }}</div>
                          <div class="info_desc">参考程度建议：0.6-0.8</div>
                          <div class="info_count">
                              <el-slider v-model="item.weight" show-input :show-input-controls="false" :min="-2"
                                  :max="2" :step="0.1"/>
                          </div>
                      </div>
                  </div>
                  <div class="loral_right">
                      <el-icon class="loral_del" @click="selectLoralList.splice(index, 1)">
                          <Delete />
                      </el-icon>
                  </div>
              </div>
          </div>

          <div class="loral_line"></div>

          <div class="model_ul" v-if="typeIndex == 5">
              <div class="model_ul_title">
                  <div class="ul_title_l">
                      <span class="title_text">图片参考</span>
                      <el-popover placement="right" :width="180" trigger="hover">
                          <template #reference>
                              <el-image class="title_examp"
                                  :src="httpUrls.ossUrl + 'pc/com/message_center/bxl_draw_tip.png'" fit="fill" />
                          </template>
                          <template #default>
                              <div class="examp_text">AI将根据参考图和参考权重，融合出图</div>
                          </template>
                      </el-popover>
                  </div>
              </div>

              <div class="examp_img_doctor">
                  <el-upload class="avatar-uploader" :action="httpUrls.loginUrl + 'api/user/oss_upload'"
                      :data="uploadData" :show-file-list="false" :before-upload="beforeUpload"
                      :on-success="handleSuccess" :on-change="handleChange">
                      <el-image class="doctor_img" v-if="imageUrl" :src="imageUrl" fit="fill" />
                      <el-image class="doctor_img" :src="httpUrls.ossUrl + 'pc/com/message_center/bxl_doctor_img.png'"
                          fit="fill" v-else />
                  </el-upload>
                  <div class="loral_ul" style="flex: 1; margin-bottom: 0;">
                      <div class="loral_left">
                          <div class="loral_info">
                              <div class="info_title">参考图</div>
                              <div class="info_desc">参考程度建议：0-1</div>
                              <div class="info_count">
                                  <el-slider v-model="refer_weight" show-input :min="0.1" :max="1" :step="0.1"
                                      :show-input-controls="false" />
                              </div>
                          </div>
                      </div>
                      <div class="loral_right"><el-icon class="loral_del">
                              <Delete />
                          </el-icon></div>
                  </div>
              </div>
          </div>

          <div class="loral_line" v-if="typeIndex == 5"></div>

          <div class="model_ul">
              <div class="model_ul_title">
                  <div class="ul_title_l">
                      <span class="title_text">画面描述</span>
                      <span class="title_start">*</span>
                      <el-popover placement="right" :width="250" trigger="hover">
                          <template #reference>
                              <el-image class="title_examp"
                                  :src="httpUrls.ossUrl + 'pc/com/message_center/bxl_draw_tip.png'" fit="fill" />
                          </template>
                          <template #default>
                              <div class="examp_text">描述你想要的画面内容，如果有参考图，需要也描述参考图的内容</div>
                          </template>
                      </el-popover>
                  </div>
                  <div class="ul_title_r" @click="openHot">
                      <div class="loral_add">
                          <el-icon class="loral_icon">
                              <Sunny />
                          </el-icon>
                          <span class="add_text">描述词库</span>
                      </div>
                  </div>
              </div>

              <div class="desc_val">
                  <span class="desc_title">中文</span>
                  <el-input v-model="descVal" style="background: #f2f2f2; flex: 1;" :rows="5" type="textarea" @blur="changeText(1)"
                      placeholder="输入一段话或短语、词汇，描述你的创意；如果有参考图，请结合描述参考图内容" />
              </div>

              <div class="desc_val">
                  <span class="desc_title">英文</span>
                  <el-input v-model="descVal_en" style="background: #f2f2f2; flex: 1;" :rows="5" type="textarea"
                      placeholder="你的描述在这里自动翻译为英文并用于生成绘画" />
              </div>
          </div>

          <div class="model_ul">
              <div class="model_ul_title">
                  <div class="ul_title_l">
                      <span class="title_text">反向提示词</span>
                      <el-popover placement="right" :width="180" trigger="hover">
                          <template #reference>
                              <el-image class="title_examp"
                                  :src="httpUrls.ossUrl + 'pc/com/message_center/bxl_draw_tip.png'" fit="fill"/>
                          </template>
                          <template #default>
                              <div class="examp_text">描述你不想在绘图中出现的内容</div>
                          </template>
                      </el-popover>
                  </div>
              </div>

              <div class="desc_val">
                  <span class="desc_title">中文</span>
                  <el-input v-model="negative_prompt" style="background: #f2f2f2; flex: 1;" :rows="5" type="textarea" @blur="changeText(2)" 
                      placeholder="请输入你在绘图内容中不想生成的内容" />
              </div>

              <div class="desc_val">
                  <span class="desc_title">英文</span>
                  <el-input v-model="negative_prompt_en" style="background: #f2f2f2; flex: 1;" :rows="5" type="textarea"
                      placeholder="你的描述在这里自动翻译为英文并用于生成绘画" />
              </div>
          </div>

          <div class="loral_line"></div>

          <div class="model_ul" style="margin-bottom: 0">
              <div class="model_ul_title">
                  <div class="ul_title_l">
                      <span class="title_text">高级参数</span>
                      <el-popover placement="right" :width="300" trigger="hover">
                          <template #reference>
                              <el-image class="title_examp"
                                  :src="httpUrls.ossUrl + 'pc/com/message_center/bxl_draw_tip.png'" fit="fill" />
                          </template>
                          <template #default>
                              <div class="examp_text">采样方法：决定图像生成方式及效果</div>
                              <div class="examp_text">采样步骤：影响图像精细度与计算资源</div>
                              <div class="examp_text">文本强度：控制文本描述对图像的控制程度</div>
                              <div class="examp_text">种子编码：用于重现特定图像特征</div>
                          </template>
                      </el-popover>
                  </div>
                  <div class="ul_title_r">
                      <div class="loral_add" v-if="isOpen" @click="isOpen = false">
                          <el-icon class="loral_icon" style="color: #666">
                              <ArrowUp />
                          </el-icon>
                          <span class="add_text" style="color: #666">收起</span>
                      </div>
                      <div class="loral_add" v-else @click="isOpen = true">
                          <i class="el-icon-arrow-down" ></i>
                          <span class="add_text" style="color: #666">展开</span>
                      </div>
                  </div>
              </div>
              <div class="model_set" v-show="isOpen">
                  <div class="set_ul">
                      <div class="set_ul_title">采样方法</div>
                      <div class="set_ul_select">
                          <el-select v-model="sampler_value" placeholder="选择采样方法" style="width: 240px">
                              <el-option v-for="item in samplerList" :key="item.value" :label="item.value"
                                  :value="item.value" />
                          </el-select>
                      </div>
                  </div>

                  <div class="set_ul_other">
                      <div class="set_ul_title">采样步数</div>
                      <div class="info_count">
                          <el-slider v-model="sampler_step" show-input :show-input-controls="false" :min="1"
                              :max="60" :step="1"/>
                      </div>
                  </div>

                  <div class="set_ul_other">
                      <div class="set_ul_title">文本强度</div>
                      <div class="info_count">
                          <el-slider v-model="sampler_strong" show-input :show-input-controls="false" :step="1"/>
                      </div>
                  </div>

                  <div class="set_ul_other">
                      <div class="set_ul_title">种子编码</div>
                      <div class="code_count">
                          <el-input v-model="sampler_code" style="flex: 1; border: none;" placeholder="输入种子编码" />
                          <el-icon class="code_copy" @click="copyCode">
                              <CopyDocument />
                          </el-icon>
                      </div>
                  </div>
              </div>
          </div>

          <div class="loral_line"></div>

          <div class="model_ul">
              <div class="model_ul_title">
                  <div class="ul_title_l">
                      <span class="title_text">生成设置</span>
                      <span class="title_start">*</span>
                      <el-popover placement="right" :width="250" trigger="hover">
                          <template #reference>
                              <el-image class="title_examp"
                                  :src="httpUrls.ossUrl + 'pc/com/message_center/bxl_draw_tip.png'" fit="fill" />
                          </template>
                          <template #default>
                              <div class="examp_text">调整生成绘图的画面比例和分辨率</div>
                          </template>
                      </el-popover>
                  </div>
              </div>

              <div class="size">
                  <div class="size_ul">
                      <div class="size_ul_li" :style="{
                          'background': size_active == index ? '#fff' : '#F5F5F5',
                          'border': size_active == index ? '2px solid #003FFF' : 'none'
                      }" v-for="(item, index) in proportList" :key="index" @click="selectProport(index, item.size)">
                          <div class="size_border">
                              <div class="size_li"
                                  :style="{ width: item.width, height: item.height, background: size_active == index ? '#CDD9FF' : '#D9D9D9' }">
                              </div>
                          </div>
                          <div class="size_count" :style="{ color: size_active == index ? '#003FFF' : '#666' }">{{
                              item.size }}
                          </div>
                      </div>
                  </div>
                  <div class="size_cc">
                      <div class="size_cc_li" :style="{
                          'background': cc_active == tip ? '#fff' : '#F5F5F5', 'color': cc_active == tip ? '#003FFF' : '#666',
                          'border': cc_active == tip ? '2px solid #003FFF' : 'none'
                      }" v-for="(val, tip) in sizeList" :key="tip" @click="selcetSize(tip, val.size)">{{ val.size }}
                      </div>
                  </div>
              </div>
          </div>

          <div class="loral_line"></div>

          <div class="model_ul">
              <div class="model_ul_title">
                  <div class="ul_title_l">
                      <span class="title_text">图片数量</span>
                  </div>
              </div>

              <div class="size_cc">
                  <div class="size_count_li" :style="{
                      'background': count_active == index ? '#fff' : '#F5F5F5', 'color': count_active == index ? '#003FFF' : '#666',
                      'border': count_active == index ? '2px solid #003FFF' : 'none'
                  }" v-for="(item, index) in countList" :key="index" @click="selcetCount(index, item.value)">{{
                      item.value }}</div>
              </div>
          </div>

          <div class="cont_btn">
              <div class="btn_text" @click="creatImg">立即生成</div>
          </div>

      </div>
      <div class="cont_middle">
          <div class="middle_title">
              <div :class="[typeIndex == 3 ? 'title_text_active' : 'title_text']" @click="selctType(3)">文生图</div>
              <div :class="[typeIndex == 5 ? 'title_text_active' : 'title_text']" @click="selctType(5)">图生图</div>
          </div>
          <div class="middle_img" v-if="isImg == 3">
              <el-image class="img_examp" :src="resultUrl" fit="fill" />
          </div>

          <div class="middle_cont" v-if="isImg == 2">
              <div class="cont_wait">
                  <el-image class="img_examp" :src="httpUrls.ossUrl + 'pc/com/message_center/bxl_draw_gif.gif'"
                      fit="fill" />
                  <span class="cont_text">生成中，请稍后</span>
              </div>
          </div>

          <div class="middle_cont" v-if="isImg == 1">
              <div class="cont_border">
                  <el-image class="img_examp" :src="httpUrls.ossUrl + 'pc/com/message_center/bxl_draw_empty.png'"
                      fit="fill" />
                  <span class="cont_text">快去生成你的创意吧～</span>
              </div>
          </div>

          <div class="history_list">
              <div class="list_img" :style="{ 'border': history_active === index ? '2px solid #003FFF' : 'none' }"
                  v-for="(item, index) in historyList" :key="index" @click="toHistory(index)">
                  <el-image class="img_examp" :src="item.result_image" fit="fill" />
              </div>
          </div>

          <div class="history_page">
              <PaginationBase v-bind:child-msg="pageparm" @callFather="callFather"></PaginationBase>
          </div>
      </div>
      <div class="cont_right">
          <div class="right_ul">
              <el-popover placement="left" :width="80" trigger="click" v-if="historyList.length > 0">
                  <template #reference>
                      <div class="ul_li">
                          <el-image class="img_examp" :src="httpUrls.ossUrl + 'pc/com/message_center/bxl_down.png'"
                              fit="fill" />
                          <span class="ul_text">下载</span>
                      </div>
                  </template>
                  <template #default>
                      <div class="ul_opera">
                          <div class="ul_opera_li" @click="downloadPhoto">下载单张</div>
                          <div class="ul_opera_li" @click="downVisible = true">下载多张</div>
                      </div>
                  </template>
              </el-popover>


              <el-popover placement="left" :width="80" trigger="click" v-if="historyList.length > 0">
                  <template #reference>
                      <div class="ul_li">
                          <el-image class="img_examp" :src="httpUrls.ossUrl + 'pc/com/message_center/bxl_del.png'"
                              fit="fill" />
                          <span class="ul_text">删除</span>
                      </div>
                  </template>
                  <template #default>
                      <div class="ul_opera">
                          <div class="ul_opera_li" @click="delImg">删除单张</div>
                          <div class="ul_opera_li" @click="delVisible = true">删除多张</div>
                      </div>
                  </template>
              </el-popover>

              <div class="ul_li" @click="findPhoto" v-if="resultUrl">
                  <el-image class="img_examp" :src="httpUrls.ossUrl + 'pc/com/message_center/bxl_tz.png'"
                      fit="fill" />
                  <span class="ul_text">拓展生图</span>
              </div>

              <div class="ul_li" @click="resetDraw">
                  <el-image class="img_examp" :src="httpUrls.ossUrl + 'pc/com/message_center/bxl_draw_new.png'"
                      fit="fill" />
                  <span class="ul_text">新创作</span>
              </div>
          </div>
      </div>

      <!-- 选择热词 -->
      <el-dialog v-model="hotVisible" width="50%" :show-close="false" style="border-radius: 10px;">
          <div class="hot_title">
              <div class="title_left">
                  <div class="title_text">描述词库</div>
                  <div class="title_type">
                      <div :class="[hotIndex == 1 ? 'type_li_active' : 'type_li']" @click="selctHot(1)">基础词库</div>
                      <div :class="[hotIndex == 2 ? 'type_li_active' : 'type_li']" @click="selctHot(2)">RAG增强词库</div>
                  </div>
              </div>
              <div class="hot_close" @click="hotVisible = false">
                  <el-icon class="close_icon">
                      <Close />
                  </el-icon>
              </div>
          </div>
          <div class="hot_cont">
              <div class="cont_ul" v-for="(item, index) in hotValue" :key="index">
                  <div class="cont_ul_title">{{ item.category }}</div>
                  <div class="cont_ul_li">
                      <div :class="[val.isSelect == true ? 'cont_li_active' : 'cont_li']"
                          v-for="(val, tip) in item.items" :key="tip" @click="selcetHot(tip, index)">{{ val.tags }}
                      </div>
                  </div>
              </div>
          </div>
      </el-dialog>

      <!-- 模型/工作流 -->
      <el-dialog v-model="modelVisible" width="50%" :show-close="false" style="border-radius: 10px;">
          <div class="hot_title">
              <div class="title_left">
                  <div class="title_text">模型/工作流</div>
              </div>
              <div class="hot_close" @click="modelVisible = false">
                  <el-icon class="close_icon">
                      <Close />
                  </el-icon>
              </div>
          </div>

          <div class="model_cont">
              <div class="cont_search">
                  <div class="search_left">
                      <div :class="[searchIndex == 1 ? 'left_li_active' : 'left_li']" @click="selctSearch(1)">最近使用
                      </div>
                      <div :class="[searchIndex == 2 ? 'left_li_active' : 'left_li']" @click="selctSearch(2)">全部</div>
                      <div :class="[searchIndex == 3 ? 'left_li_active' : 'left_li']" @click="selctSearch(3)">工作流
                      </div>
                  </div>
                  <div class="search_right">
                      <el-input v-model="searchValue" style="width: 200px" placeholder="请输入搜索关键字"
                          prefix-icon="el-icon-search" />
                  </div>
              </div>

              <div class="cont_list">
                  <div class="list_li" :style="{ 'border': model_select == index ? '2px solid #003FFF' : 'none' }"
                      v-for="(item, index) in modelList" :key="index" @click="selectModelType(index)"
                      v-if="modelList.length > 0">
                      <el-image class="img_examp" :src="httpUrls.imgUrl + item.title_img_path" fit="fill" />
                      <div class="li_text">{{ item.model_name }}</div>
                  </div>
                  <div class="model_empty" v-if="modelList.length == 0">该类型下暂无模型</div>
              </div>
          </div>

      </el-dialog>

      <!-- 增益Lora -->
      <el-dialog v-model="loralVisible" width="50%" :show-close="false" style="border-radius: 10px;">
          <div class="hot_title">
              <div class="title_left">
                  <div class="title_text">增益Lora</div>
              </div>
              <div class="hot_close" @click="loralVisible = false">
                  <el-icon class="close_icon">
                      <Close />
                  </el-icon>
              </div>
          </div>

          <div class="model_cont">
              <div class="cont_search">
                  <div class="search_left">
                      <div :class="[loralIndex == 1 ? 'left_li_active' : 'left_li']" @click="selectLoral(1)">全部</div>
                      <div :class="[loralIndex == 2 ? 'left_li_active' : 'left_li']" @click="selectLoral(2)">预设</div>
                      <div :class="[loralIndex == 3 ? 'left_li_active' : 'left_li']" @click="selectLoral(3)">用户</div>
                      <div :class="[loralIndex == 4 ? 'left_li_active' : 'left_li']" @click="selectLoral(4)">我的</div>
                      <div :class="[loralIndex == 5 ? 'left_li_active' : 'left_li']" @click="selectLoral(5)">最近使用
                      </div>
                  </div>
                  <div class="search_right">
                      <el-input v-model="loralValue" style="width: 200px" placeholder="请输入搜索关键字"
                          prefix-icon="el-icon-search" />
                  </div>
              </div>

              <div class="cont_list">
                  <div class="list_li" :style="{ 'border': item.isSelect ? '2px solid #003FFF' : 'none' }"
                      v-for="(item, index) in loralList" :key="index" @click="selectLoralType(index)"
                      v-if="loralList.length > 0">
                      <el-image class="img_examp" :src="httpUrls.imgUrl + item.title_img_path" fit="fill" />
                      <div class="li_text">{{ item.model_name }}</div>
                  </div>

                  <div class="model_empty" v-if="loralList.length == 0">该类型下暂无模型</div>
              </div>
          </div>

      </el-dialog>

      <!-- 删除 -->
      <el-dialog v-model="delVisible" width="60%" :show-close="false" style="border-radius: 10px;">
          <div class="hot_title">
              <div class="title_left">
                  <div class="title_text">请选择你要删除的图片</div>
                  <div class="title_check">
                      <el-checkbox v-model="check_page" label="选择当前页" size="large" @change="selectImg" />
                  </div>
              </div>
              <div class="hot_close" @click="delVisible = false">
                  <el-icon class="close_icon">
                      <Close />
                  </el-icon>
              </div>
          </div>

          <div class="model_cont" style="border-radius: 0;">
              <div class="cont_list">
                  <div class="list_li" style="position: relative;" v-for="(item, index) in historyList" :key="index">
                      <el-image class="img_examp" :src="item.result_image" fit="fill" />
                      <!-- <div class="li_text">{{ item.value }}</div> -->
                      <div class="check_li">
                          <el-checkbox size="large" v-model="item.isCheck" />
                      </div>
                  </div>
              </div>
              <div class="history_page">
                  <PaginationBase v-bind:child-msg="pageparm" @callFather="callFather"></PaginationBase>
              </div>
          </div>
          <template #footer>
              <div class="dialog-footer">
                  <el-button @click="delVisible = false">取消</el-button>
                  <el-button type="primary" @click="delAllImg">
                      确认删除
                  </el-button>
              </div>
          </template>
      </el-dialog>

      <!-- 下载 -->
      <el-dialog v-model="downVisible" width="50%" :show-close="false" style="border-radius: 10px;">
          <div class="hot_title">
              <div class="title_left">
                  <div class="title_text">请选择你要下载的图片</div>
                  <div class="title_check">
                      <el-checkbox v-model="check_page" label="选择当前页" size="large" @change="selectImg" />
                  </div>
              </div>
              <div class="hot_close" @click="downVisible = false">
                  <el-icon class="close_icon">
                      <Close />
                  </el-icon>
              </div>
          </div>

          <div class="model_cont" style="border-radius: 0;">
              <div class="cont_list">
                  <div class="list_li" style="position: relative;" v-for="(item, index) in historyList" :key="index">
                      <el-image class="img_examp" :src="item.result_image" fit="fill" />
                      <!-- <div class="li_text">{{ item.value }}</div> -->
                      <div class="check_li">
                          <el-checkbox v-model="item.isCheck" size="large" />
                      </div>
                  </div>
              </div>
              <div class="history_page">
                  <PaginationBase v-bind:child-msg="pageparm" @callFather="callFather"></PaginationBase>
              </div>
          </div>
          <template #footer>
              <div class="dialog-footer">
                  <el-button @click="downVisible = false">取消</el-button>
                  <el-button type="primary" @click="downloadAllPhoto">
                      确认下载
                  </el-button>
              </div>
          </template>
      </el-dialog>
  </div>
</template>
<script>
import httpUrls from "@/api/requestURL";
// import { doctorDraw, getSampler, wordList, getModel, getDoctorHistory, delPhoto, downloadPhoto, textChange } from "./../plugin/drawChat.api"
import PaginationBase from "@/components/PaginationBase.vue"
export default {
  name: "doctor",
  data() {
      return {
          httpUrls,
          tabIndex: 1,
          model_active: '',
          model_id: '',
          modelList: [],
          step: 20,
          loralList: [],
          selectLoralList: [],
          lora_id: '',

          imageUrl: '',
          resultUrl: '', //结果图片
          isImg: 1, //生成图片过程1还没开始2等待生成3已生成
          refer_weight: 0.7,
          uploadData: {
              image: null,
              image_name: null,
              oss_dir: "static",
              cate: "bxl",
          },
          descVal: '', //画面描述
          descVal_en: '', //英文画面描述
          negative_prompt: '', //反向提示词
          negative_prompt_en: '', //英文反向提示词
          sampler_value: '', //采样方法
          sampler_step: 20, //采样步数
          sampler_strong: 0, //采样强度
          sampler_code: '', //采样强度
          isOpen: false, //高级参数打开收起
          samplerList: [],
          word_type: 1, //词库类型1基础2增强
          options: [
              {
                  label: "方法1",
                  value: "vivid",
              },
              {
                  label: "方2",
                  value: "vivid",
              },

              {
                  label: "方法3",
                  value: "vivid",
              },
          ],
          proportList: [
              {
                  id: "1:1",
                  size: "1:1",
                  width: "42px",
                  height: "42px",
                  children: [
                      {
                          id: "512*512",
                          size: "512*512",
                      },
                      {
                          id: "1024*1024",
                          size: "1024*1024",
                      }
                  ]
              },
              {
                  id: "4:3",
                  size: "4:3",
                  width: "40px",
                  height: "30px",
                  children: [
                      {
                          id: "1024*768",
                          size: "1024*768",
                      },
                      {
                          id: "512*384",
                          size: "512*384",
                      }
                  ]
              },
              {
                  id: "3:4",
                  size: "3:4",
                  width: "30px",
                  height: "40px",
                  children: [
                      {
                          id: "768*1024",
                          size: "768*1024",
                      },
                      {
                          id: "384*512",
                          size: "384*512",
                      }
                  ]
              },
              {
                  id: "16:9",
                  size: "16:9",
                  width: "48px",
                  height: "27px",
                  children: [
                      {
                          id: "1024*576",
                          size: "1024*576",
                      },
                      {
                          id: "512*228",
                          size: "512*228",
                      }
                  ]
              },
              {
                  id: "9:16",
                  size: "9:16",
                  width: "27px",
                  height: "48px",
                  children: [
                      {
                          id: "576*1024",
                          size: "576*1024",
                      },
                      {
                          id: "288*512",
                          size: "288*512",
                      }
                  ]
              }
          ],
          size_active: 0,
          size_text: '1:1',
          sizeList: [
              {
                  id: "512*512",
                  size: "512*512",
              },
              {
                  id: "1024*1024",
                  size: "1024*1024",
              }
          ],
          cc_active: 0,
          cc_text: "512*512",
          count_active: 0,
          count_text: 1,
          countList: [
              {
                  id: "1",
                  value: "1",
              },
              {
                  id: "2",
                  value: "2",
              },
              {
                  id: "4",
                  value: "4",
              },
              {
                  id: "8",
                  value: "8",
              }
          ],
          typeIndex: 3, //画图类型3文生图5图生图
          historyList: [],
          history_active: '',
          hotVisible: false,
          hotIndex: 1,
          hotValue: [],

          pageparm: { //历史分页参数
              currentPage: 1,
              pageSize: 10,
              total: 10,
          },

          modelparm: { //模型分页参数
              currentPage: 1,
              pageSize: 10,
              total: 10,
          },

          historyparm: { //历史分页参数
              currentPage: 1,
              pageSize: 10,
              total: 10,
          },

          modelVisible: false,
          searchIndex: 1,
          searchValue: '',
          model_select: 0,

          loralVisible: false,
          loralIndex: 1,
          loralValue: '',
          loral_select: 0,

          delVisible: false,
          check_page: false,
          downVisible: false,

          isClick: true

      }
  },

  components: {
      PaginationBase
  },

  // 创建完毕状态(里面是操作)
  created() {
      this.getSamplerList()
      this.getModelList()
      this.getLoraList()
      this.getHistory()
  },

  // 里面的函数只有调用才会执行
  methods: {
      changTab(index) {
          this.tabIndex = index
          this.model_id = ''
          this.getModelList()
      },

      selectModel(index, id) {
          this.model_active = index
          this.model_id = id
      },

      selcetCount(index, val) {
          this.count_active = index
          this.count_text = val
      },

      selctType(index) {
          this.typeIndex = index
      },

      handleCurrentChange() {

      },

      selctHot(index) {
          this.hotIndex = index
          this.getHotList()
      },

      selcetHot(tip, index) {
          this.hotValue[index].items[tip].isSelect = !this.hotValue[index].items[tip].isSelect
          // console.log(hotValue.value[index].isSelect, 8547)
          if (this.hotValue[index].items[tip].isSelect) { //选中或取消热词,描述跟着改变
              if (this.descVal != '') {
                  this.descVal = this.descVal + ',' + this.hotValue[index].items[tip].tags
              } else {
                  this.descVal = this.hotValue[index].items[tip].tags
              }
          } else {

              if (this.descVal != '') {
                  let arr = this.descVal.split(',')
                  let tags = this.hotValue[index].items[tip].tags
                  let disp = arr.findIndex((element) => element == tags);
                  arr.splice(disp, 1)
                  this.descVal = arr.join(',')
              } else {
                  this.descVal = ''
              }
          }
      },

      selctSearch(index) {
          this.searchIndex = index
      },

      selectModelType(index) {
          this.model_select = index
      },

      selectLoral(index) {
          this.loralIndex = index
          this.getLoraList()
      },

      selectLoralType(index) {
          this.loralList[index].isSelect = !this.loralList[index].isSelect
          if (this.loralList[index].isSelect) { //处理lora选中取消
              let val = {
                  'id': this.loralList[index].id,
                  'model_name': this.loralList[index].model_name,
                  'title_img_path': this.loralList[index].title_img_path,
                  'weight': 0.6
              }
              this.selectLoralList.push(val)
          } else {
              let tags = this.loralList[index].id
              let disp = this.selectLoralList.findIndex((element) => element == tags);
              this.selectLoralList.splice(disp, 1)
          }
      },

      // 上传前
      beforeUpload(rawFile) {
          if (rawFile.type !== 'image/jpg' && rawFile.type !== 'image/png') {
              this.$message.error('只能上传jpg/png图片')
              return false
          } else if (rawFile.size / 1024 / 1024 > 2) {
            this.$message.error('图片大小不能超过2M')
              return false
          }
          return true
      },

      handleChange(file, fileList) {
          console.log(file, 66666)
          this.uploadData.image = file.raw;
          this.uploadData.image_name = file.name;
      },

      handleSuccess(res, file) {
          console.log(res, 777)
          this.imageUrl = this.httpUrls.ossUrl + res.data.new_url
      },

      getSamplerList() {
          getSampler({}).then(res => {
              if (res.code == 20000) {
                  this.samplerList = res.data
              } else {
                  this.$message({
                      message: res.msg,
                      duration: 2000,
                  });
              }
          })
      },

      getModelList() {
          let val = {
              'model_lora': 1,
              'model_type': this.tabIndex,
              'search_name': '',
              'page_number': this.modelparm.currentPage,
              'page_size': this.modelparm.pageSize,
              'model_id': this.model_id
          }
          getModel(val).then(res => {
              if (res.code == 20000) {
                  this.modelList = res.data
                  if (this.modelList.length > 0) {
                      this.model_id = this.modelList[0].id
                      this.modelparm.total = res.total
                      this.model_active = ''
                  }

              } else {
                  this.$message({
                      message: res.msg,
                      duration: 2000,
                  });
              }
          })
      },

      getLoraList() {
          let val = {
              'model_lora': 2,
              'lora_type': this.loralIndex,
              'search_name': '',
              'page_number': 1,
              'page_size': 10
          }
          getModel(val).then(res => {
              if (res.code == 20000) {
                  this.loralList = res.data
                  this.loralList.forEach(item => {
                      item.isSelect = false
                  })
              } else {
                  this.$message({
                      message: res.msg,
                      duration: 2000,
                  });
              }
          })
      },

      //生成图片
      creatImg() {
          if (!this.isClick) {
              return false
          }

          if (this.model_active === '') {
              this.$message({
                  message: '请选择工作流或者模型',
                  duration: 2000,
                  type: 'warning'
              });
              return false
          }
          if (this.descVal_en == '') {
              this.$message({
                  message: '请填写英文格式画面描述',
                  duration: 2000,
                  type: 'warning'
              });
              return false
          }

          if (this.typeIndex == 5 && this.imageUrl == '') {
              this.$message({
                  message: '请上传参考图',
                  duration: 2000,
                  type: 'warning'
              });
              return false
          }
          this.isClick = false
          this.isImg = 2
          let requestData = {
              'base_model_id': this.model_id,
              'lora_list': JSON.stringify(this.selectLoralList),
              'prompt': this.descVal, //描述
              'prompt_en': this.descVal_en, //描述
              'negative_prompt': this.negative_prompt, //反向提示词
              'negative_prompt_en': this.negative_prompt_en, //反向提示词
              'sampler_index': this.sampler_value, //采样器
              'sampler_num': this.sampler_step,
              'text_quality': this.sampler_strong,
              'seed': this.sampler_code,
              'size': this.cc_text,
              'per': this.size_text,
              'num': this.count_text,
              'action_type': this.typeIndex,
              'refer_weight': this.refer_weight,
              'refer_image': this.imageUrl
          }

          doctorDraw(requestData).then(res => {
              if (res.code == 20000) {
                  this.isClick = true
                  this.resultUrl = res.data.result_image
                  this.isImg = 3
                  this.history_active = 0
                  this.pageparm.currentPage = 1
                  this.getHistory()
              } else {
                  this.isImg = 1
                  this.isClick = true
                  this.$message({
                      message: res.msg,
                      duration: 2000,
                  });
              }
          })
              .catch((err) => {
                  console.log('chucuol')
                  this.isImg = 1
                  this.isClick = true
              });
      },

      copyCode() {
          if (navigator.clipboard && window.isSecureContext) {  // 只能在安全域下使用 安全域包括本地访问与开启TLS安全认证的地址，如 https 协议的地址、127.0.0.1 或 localhost
              // navigator clipboard 向剪贴板写文本
              navigator.clipboard
                  .writeText(this.sampler_code)
                  .then(() => {
                    this.$message.success("复制成功");
                  })
                  .catch((err) => {
                      console.error("Failed to copy code: ", err);
                  });
          } else {
              // 创建text area
              let textArea = document.createElement("textarea");
              textArea.value = this.sampler_code;
              // 使text area不在viewport，同时设置不可见
              textArea.style.position = "absolute";
              textArea.style.opacity = 0;
              textArea.style.left = "-999999px";
              textArea.style.top = "-999999px";
              document.body.appendChild(textArea);
              textArea.focus();
              textArea.select();

              return new Promise((res, rej) => {
                  // 执行复制命令并移除文本框
                  document.execCommand("copy") ? res() : rej();
                  textArea.remove();
              }).then(() => {
                this.$message.success( "复制成功");
              }).catch((err) => {
                  console.error("Failed to copy code: ", err);
              });
          }
      },

      getHotList() {
          let val = {
              type_id: this.hotIndex
          }
          wordList(val).then(res => {
              if (res.code == 20000) {
                  this.hotValue = res.data
                  this.hotValue.forEach((item) => {
                      item.items.forEach(val => {
                          val.isSelect = false
                      })
                  })
              } else {
                  this.$message({
                      message: res.msg,
                      duration: 2000,
                  });
              }
          })
      },

      openHot() {
          this.hotVisible = true
          this.hotIndex = 1
          this.getHotList()
      },

      getHistory() {
          let val = {
              'page_number': this.pageparm.currentPage,
              'page_size': this.pageparm.pageSize
          }
          getDoctorHistory(val).then(res => {
              if (res.code == 20000) {
                  this.historyList = res.data
                  this.historyList.forEach(item => {
                      item.isCheck = false
                  })
                  this.pageparm.total = res.total
              } else {
                  this.$message({
                      message: res.msg,
                      duration: 2000,
                  });
              }
          })
      },

      callFather(val) {
          this.pageparm.currentPage = val.currentPage
          this.getHistory()
      },

      //获取单个历史信息
      toHistory(index) {
          this.history_active = index

          this.descVal = this.historyList[index].prompt
          this.descVal_en = this.historyList[index].prompt_en
          this.negative_prompt = this.historyList[index].negative_prompt
          this.negative_prompt_en = this.historyList[index].negative_prompt_en
          this.sampler_value = this.historyList[index].sampler_index
          this.sampler_step = this.historyList[index].sampler_num
          this.sampler_strong = this.historyList[index].text_quality
          this.sampler_code = this.historyList[index].seed
          this.typeIndex = this.historyList[index].action_type
          this.refer_weight = this.historyList[index].refer_weight
          this.imageUrl = this.historyList[index].refer_image
          this.resultUrl = this.historyList[index].result_image
          this.isImg = 3 //用于展示图片区
          let disp = this.proportList.findIndex((element) => element.size == this.historyList[index].per);
          this.size_active = disp
          this.size_text = this.historyList[index].per
          this.sizeList = this.proportList[disp].children
          let s_disp = this.sizeList.findIndex((element) => element.size == this.historyList[index].size);
          this.cc_active = s_disp
          this.cc_text = this.sizeList[s_disp].size
          let cout_disp = this.countList.findIndex((element) => element.value == this.historyList[index].num);
          this.count_active = cout_disp
          this.count_text = this.historyList[index].num
          if (this.historyList[index].lora_list.length > 0) {
              this.selectLoralList = this.historyList[index].lora_list
          } else {
              this.selectLoralList = []
          }

          this.model_id = this.historyList[index].model_id
          this.pageparm.currentPage = 1
          this.tabIndex = ''
          this.getModelList()

      },

      selectProport(index, size) {
          this.size_active = index
          this.size_text = size
          this.sizeList = this.proportList[index].children
      },

      selcetSize(index, size) {
          this.cc_active = index
          this.cc_text = size
      },

      //删除图片
      delImg() {
        this.$prompt(
              '删除后将无法恢复和继续使用，确认删除吗？',
              '删除',
              {
                  confirmButtonText: '删除',
                  cancelButtonText: '取消',
                  type: 'warning',
              }
          )
              .then(() => {
                  this.delPhotos()
              })
              .catch(() => {
                this.$message({
                      type: 'info',
                      message: 'Delete canceled',
                  })
              })
      },

      delPhotos() {
          let arr = []
          let del_id = this.historyList[this.history_active].id
          arr.push(del_id)
          let val = {
              'ids': JSON.stringify(arr),
          }
          delPhoto(val).then(res => {
              if (res.code == 20000) {
                  this.history_active = ''
                  this.getHistory()
                  this.resetDraw()
                  this.$message({
                      message: '删除成功',
                      duration: 2000,
                      type: 'success'
                  });
              } else {
                  this.$message({
                      message: res.msg,
                      duration: 2000,
                  });
              }
          })
      },

      // 全选图片
      selectImg() {

          this.historyList.forEach(item => {
              if (this.check_page) {
                  item.isCheck = true
              } else {
                  item.isCheck = false
              }

          })
      },

      //批量删除
      delAllImg() {
          let del_arr = []
          this.historyList.forEach(item => {
              if (item.isCheck) {
                  del_arr.push(item.id)
              }
          })
          if (del_arr.length == 0) {
              this.$message({
                  message: '请选择删除图片',
                  duration: 2000,
                  type: 'warning'
              });
          }
          let val = {
              'ids': JSON.stringify(del_arr),
          }
          delPhoto(val).then(res => {
              if (res.code == 20000) {
                  this.history_active = ''
                  this.check_page = false
                  this.getHistory()
                  this.resetDraw()
                  this.$message({
                      message: '删除成功',
                      duration: 2000,
                      type: 'success'
                  });
              } else {
                  this.$message({
                      message: res.msg,
                      duration: 2000,
                  });
              }
          })
      },

      //下载单张图片
      downloadPhoto() {
          if (this.history_active === '') { this.history_active = 0 }
          window.open(this.historyList[this.history_active].result_image)
      },

      //批量下载
      downloadAllPhoto() {
          let index = this.historyList.findIndex((item) => item.isCheck == true);

          if (index > -1) {
              this.$message({
                  message: '开始下载，请前往浏览器下载文件夹查看结果',
                  duration: 2000,
                  type: 'warning'
              });
              this.historyList.forEach(item => {
                  if (item.isCheck) {
                      window.open(item.result_image, '_blank')
                  }
              })
          } else {
              this.$message({
                  message: '请选择需要下载的图片',
                  duration: 2000,
                  type: 'warning'
              });
          }

      },

      findPhoto() {
          this.imageUrl = this.resultUrl
          this.typeIndex = 5
          this.refer_weight = 0.7
      },

      //开启新会话
      resetDraw() {
          this.descVal = ''
          this.negative_prompt = ''
          this.sampler_value = ''
          this.sampler_step = 0
          this.sampler_strong = 0
          this.sampler_code = ''
          this.typeIndex = 3
          this.refer_weight = 0.7
          this.imageUrl = ''
          this.resultUrl = ''
          this.isImg = 1 //用于展示图片区
          this.size_active = 0
          this.size_text = '1:1'
          this.sizeList = [
              {
                  id: "512*512",
                  size: "512*512",
              },
              {
                  id: "1024*1024",
                  size: "1024*1024",
              }
          ],
              this.cc_active = 0
          this.cc_text = '512*512'
          this.count_active = 0
          this.count_text = 1
          this.model_id = ''
          this.model_active = ''
          this.selectLoralList = []
      },

      changeText(index) {
          let tags = ''
          if(index == 1) {
              tags = this.descVal
          } else {
              tags = this.negative_prompt
          }
          let requestData = {
              'tags': tags,
          }
          textChange(requestData).then(res => {
              if(res.code == 20000) {
                  if(index == 1) {
                      this.descVal_en = res.data
                  } else {
                      this.negative_prompt_en = res.data
                  }
              } else {
                  this.$message({
                      message: res.msg,
                      duration: 2000,
                  });
              }
          })
      }
  }
}
</script>

<style lang="scss" scoped>
@import "./draw.scss";

.info_count :deep(.el-slider__input) {
  width: 50px;
}

.desc_val :deep(.el-textarea__inner) {
  background: #F2F3F5;
}

:deep(.el-dialog__header),
:deep(.el-dialog__body) {
  padding: 0;
}

.ul_opera {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  cursor: pointer;

  .ul_opera_li {
      font-weight: 400;
      font-size: 14px;
      color: #000;
      line-height: 35px;
      background: #fff;
  }

  .ul_opera_li:hover {
      font-weight: 400;
      font-size: 14px;
      color: #000;
      line-height: 35px;
      background: #F0F3FF;
      border-radius: 10px;
      padding: 5px 15px;
  }
}
</style>