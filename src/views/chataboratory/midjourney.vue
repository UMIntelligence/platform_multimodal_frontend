<template>
  <div class="draw_container" style="padding: 0; min-height: calc(100vh - 106px);">
      <div class="cont_left" style="border-radius: 0; width: 22%; border-right: 1px solid #f2f2f2">
          <div class="model_ul">
              <div class="model_ul_title">
                  <div class="ul_title_l">
                      <span class="title_text">比例</span>
                      <el-popover placement="left" :width="120" trigger="hover">
                          <template #reference>
                              <el-image class="title_examp" :src="httpUrls.ossUrl + 'pc/com/message_center/bxl_draw_tip.png'" fit="fill" />
                          </template>
                          <template #default>
                              <div class="examp_text">参数释义：生成图片尺寸比例</div>
                          </template>
                      </el-popover>
                  </div>
              </div>

              <div class="size">
                  <div class="size_ul">
                      <div class="size_ul_mj" :style="{'background': size_active == index ? '#fff':'#F5F5F5',
                      'border': size_active == index ? '2px solid #003FFF':'none'}" v-for="(item, index) in proportList" :key="index" @click="selectProport(index)">
                          <div class="size_border">
                              <div class="size_li" :style="{ width: item.width, height: item.height, background: size_active == index ? '#CDD9FF':'#D9D9D9' }"></div>
                          </div>
                          <div class="size_count" :style="{ color: size_active == index ? '#003FFF':'#666' }">{{ item.size }}</div>
                      </div>
                  </div>
              </div>
          </div>

          <div class="model_ul">
              <div class="model_ul_title">
                  <div class="ul_title_l">
                      <span class="title_text">模型</span>
                      <el-popover placement="left" :width="120" trigger="hover">
                          <template #reference>
                              <el-image class="title_examp" :src="httpUrls.ossUrl + 'pc/com/message_center/bxl_draw_tip.png'" fit="fill" />
                          </template>
                          <template #default>
                              <div class="examp_text">MJ：通用模型</div>
                              <div class="examp_text">NIJI：动漫风格模型</div>
                          </template>
                      </el-popover>
                  </div>
              </div>

              <div class="mj_model">
                  <div class="mj_img" :style="{'border': model_active == 1 ? '2px solid #003FFF':'none'}" @click="model_active = 1">
                      <el-image class="mj_examp" :src="httpUrls.ossUrl + 'pc/com/message_center/bxl_draw_mj.png'" fit="fill" />
                  </div>
                  <div class="mj_img" :style="{'border': model_active == 2 ? '2px solid #003FFF':'none'}" @click="model_active = 2">
                      <el-image class="mj_examp" :src="httpUrls.ossUrl + 'pc/com/message_center/bxl_draw_niji.png'" fit="fill" />
                  </div>
              </div>
              <div class="mj_model_query">
                  <div class="query_li">版本</div>
                  <div class="mj_select">
                      <el-select  v-model="value" placeholder="选择版本" style="width: 200px">
                          <el-option
                              v-for="item in versions"
                              :key="item.value"
                              :label="item.label"
                              :value="item.value"
                          />
                      </el-select>
                  </div>
              </div>

              <div class="mj_model_query">
                  <div class="query_li">风格</div>
                  <div class="mj_select">
                      <el-select  v-model="value" placeholder="选择风格" style="width: 200px">
                          <el-option
                              v-for="item in versions"
                              :key="item.value"
                              :label="item.label"
                              :value="item.value"
                          />
                      </el-select>
                  </div>
              </div>

              <div class="mj_model_query">
                  <div class="query_li">RAW</div>
                  <div class="mj_select">
                      <el-switch v-model="query_check" />
                      <el-popover placement="right" :width="120" trigger="hover">
                          <template #reference>
                              <el-image class="title_examp" :src="httpUrls.ossUrl + 'pc/com/message_center/bxl_draw_tip.png'" fit="fill" />
                          </template>
                          <template #default>
                              <div class="examp_text">呈现的人物写实感更加逼真</div>
                              <div class="examp_text">人物细节、光源、流畅度也更加接近原始作品</div>
                          </template>
                      </el-popover>
                  </div>
              </div>
          </div>

          <div class="model_ul">
              <div class="model_ul_title">
                  <div class="ul_title_l">
                      <span class="title_text">参数</span>
                      <el-popover placement="left" :width="120" trigger="hover">
                          <template #reference>
                              <el-image class="title_examp" :src="httpUrls.ossUrl + 'pc/com/message_center/bxl_draw_tip.png'" fit="fill" />
                          </template>
                          <template #default>
                              <div class="examp_text">绘画模型参数</div>
                          </template>
                      </el-popover>
                  </div>
              </div>

              <div class="mj_model_query" style="margin-top: 15px;">
                  <div class="query_li">画质</div>
                  <div class="mj_select">
                      <el-select  v-model="value" placeholder="选择画质" style="width: 174px">
                          <el-option
                              v-for="item in versions"
                              :key="item.value"
                              :label="item.label"
                              :value="item.value"
                          />
                      </el-select>
                      <el-popover placement="right" :width="200" trigger="hover">
                          <template #reference>
                              <el-image class="title_examp" :src="httpUrls.ossUrl + 'pc/com/message_center/bxl_draw_tip.png'" fit="fill" />
                          </template>
                          <template #default>
                              <div class="examp_text">画质：--quality 或 --q</div>
                              <div class="examp_text">参数释义：更高质量需要更长的时间处理更多细节</div>
                          </template>
                      </el-popover>
                  </div>
              </div>

              <div class="mj_model_query">
                  <div class="query_li">混乱</div>
                  <div class="mj_select">
                      <el-input-number v-model="value" :min="1" :max="10" style="width: 174px" />
                      <el-popover placement="right" :width="400" trigger="hover">
                          <template #reference>
                              <el-image class="title_examp" :src="httpUrls.ossUrl + 'pc/com/message_center/bxl_draw_tip.png'" fit="fill" />
                          </template>
                          <template #default>
                              <div class="examp_text">混乱：--chaos 或 --c，范围 0-100</div>
                              <div class="examp_text">参数释义：较高值将产生意想不到的结果和成分，较低值具有更可靠、可重复的结果</div>
                          </template>
                      </el-popover>
                      
                  </div>
              </div>
          </div>

          <div class="model_ul">
              <div class="model_ul_title">
                  <div class="ul_title_l">
                      <span class="title_text">选项</span>
                      <el-popover placement="left" :width="120" trigger="hover">
                          <template #reference>
                              <el-image class="title_examp" :src="httpUrls.ossUrl + 'pc/com/message_center/bxl_draw_tip.png'" fit="fill" />
                          </template>
                          <template #default>
                              <div class="examp_text">绘画额外选项</div>
                          </template>
                      </el-popover>
                  </div>
              </div>

              <div class="mj_model_query" style="margin-top: 15px;">
                  <div class="query_li">模式</div>
                  <div class="mj_select">
                      <el-select  v-model="value" placeholder="选择模式" style="width: 174px">
                          <el-option
                              v-for="item in versions"
                              :key="item.value"
                              :label="item.label"
                              :value="item.value"
                          />
                      </el-select>
                      <el-popover placement="right" :width="120" trigger="hover">
                          <template #reference>
                              <el-image class="title_examp" :src="httpUrls.ossUrl + 'pc/com/message_center/bxl_draw_tip.png'" fit="fill" />
                          </template>
                          <template #default>
                              <div class="examp_text">参数释义：不同的生成速度</div>
                          </template>
                      </el-popover>
                  </div>
              </div>
          </div>

          <div class="model_ul">
              <div class="model_ul_title">
                  <div class="ul_title_l">
                      <span class="title_text">风格化</span>
                      <el-popover placement="left" :width="300" trigger="hover">
                          <template #reference>
                              <el-image class="title_examp" :src="httpUrls.ossUrl + 'pc/com/message_center/bxl_draw_tip.png'" fit="fill" />
                          </template>
                          <template #default>
                              <div class="examp_text">风格化：--stylize 或 --s，范围 1-1000</div>
                              <div class="examp_text">参数释义：数值越高，画面表现也会更具丰富性和艺术性</div>
                          </template>
                      </el-popover>
                  </div>
              </div>

              <div class="size_cc">
                  <div class="size_count_li" :style="{'background': count_active == index ? '#fff':'#F5F5F5', 'color': count_active == index ? '#003FFF':'#666',
                  'border': count_active == index ? '2px solid #003FFF':'none'}" v-for="(item, index) in countList" :key="index" @click="selcetCount(index)">{{  item.value }}</div>
              </div>
              <div style="margin-top: 15px">
                  <el-input-number v-model="value" :min="1" :max="10" style="width: 100%" />
              </div>
          </div>

          <div class="model_ul">
              <div class="model_ul_title">
                  <div class="ul_title_l">
                      <span class="title_text">设定</span>
                  </div>
              </div>

              <div class="mj_model_query" style="margin-top: 15px;">
                  <div class="query_li">携带参数</div>
                  <div class="mj_select">
                      <el-switch v-model="query_check" />
                      <el-popover placement="right" :width="120" trigger="hover">
                          <template #reference>
                              <el-image class="title_examp" :src="httpUrls.ossUrl + 'pc/com/message_center/bxl_draw_tip.png'" fit="fill" />
                          </template>
                          <template #default>
                              <div class="examp_text">是否自动携带参数</div>
                              <div class="examp_text">开启：使用设定参数</div>
                              <div class="examp_text">关闭：可在提示词框自行设定参数</div>
                          </template>
                      </el-popover>
                  </div>
              </div>

              <div class="mj_model_query" style="margin-top: 15px;">
                  <div class="query_li">携带参数</div>
                  <div class="mj_select">
                      <span class="mj_text">重置</span>
                  </div>
              </div>

              <div class="mj_model_query" style="margin-top: 15px;">
                  <div class="query_li">余额(200)</div>
                  <div class="mj_select">
                      <span class="mj_text">刷新</span>
                      <span class="mj_text">充值</span>
                      <el-popover placement="right" :width="120" trigger="hover">
                          <template #reference>
                              <el-image class="title_examp" :src="httpUrls.ossUrl + 'pc/com/message_center/bxl_draw_tip.png'" fit="fill" />
                          </template>
                          <template #default>
                              <div class="examp_text">绘画额度</div>
                          </template>
                      </el-popover>
                  </div>
              </div>
          </div>
      </div>
      <div class="mj_right">
          <div class="mj_draw">
              <div class="draw_title">AI绘画</div>
              <div class="draw_tip">图生图：生成类似风格或类型图像；图生文：上传一张图片生成对应的提示词；融图：融合图片风格</div>
              <div class="draw_btn">
                  <div class="btn_oper" @click="photoVisible = true">
                      <el-image class="img_oper" :src="httpUrls.ossUrl + 'pc/com/message_center/bxl_mj_up.png'" fit="fill" />
                      <span class="btn_text">图生图(可选)</span>
                  </div>

                  <div class="btn_oper" @click="textVisible = true">
                      <el-image class="img_oper" :src="httpUrls.ossUrl + 'pc/com/message_center/bxl_mj_up.png'" fit="fill" />
                      <span class="btn_text">图生文(可选)</span>
                  </div>

                  <div class="btn_oper" @click="fuseVisible = true">
                      <el-image class="img_oper" :src="httpUrls.ossUrl + 'pc/com/message_center/bxl_mj_up.png'" fit="fill" />
                      <span class="btn_text">融图(可选)</span>
                  </div>
              </div>
          </div>

          <div class="mj_photo_ul">
              <div class="photo_ul_tit">清空参考图</div>
              <div class="photo_li">
                  <div class="li_img">
                      <el-image class="photo_img" :src="httpUrls.ossUrl + 'xcx/com/message_center/%E7%AB%8B%E4%BD%93%E9%A3%8E.png'" fit="contain" />
                      <el-icon class="photo_del"><Delete /></el-icon>
                  </div>
              </div>
          </div>

          <div class="mj_draw">
              <div class="draw_cont">
                  <div class="cont_tip">提示词</div>
                  <div class="draw_cont_btn">
                      <el-image class="img_examp" :src="httpUrls.ossUrl + 'pc/com/message_center/bxl_mj_change.png'" fit="fill" />
                      <span class="btn_text">翻译</span>
                  </div>
              </div>

              <div class="desc_val">
                  <el-input v-model="descVal" :rows="5" type="textarea" placeholder="例如：a cute cat（中文描述词处理可能不准确，建议使用英文进行描述）"/>
              </div>
          </div>

          <div class="mj_draw">
              <div class="draw_cont">
                  <div class="cont_tip">忽略元素（可选）</div>
                  <div class="draw_cont_btn">
                      <el-image class="img_examp" :src="httpUrls.ossUrl + 'pc/com/message_center/bxl_mj_change.png'" fit="fill" />
                      <span class="btn_text">翻译</span>
                  </div>
              </div>

              <div class="desc_val">
                  <el-input v-model="descVal" placeholder="例如：a cute cat（中文描述词处理可能不准确，建议使用英文进行描述）" />
              </div>

              <div class="desc_btn">
                  <div class="btn_text">可爱的小猫</div>
                  <div class="btn_text">蓝色动漫女孩</div>
                  <div class="btn_text">吃西瓜小女孩</div>
              </div>
          </div>

          <div class="mj_draw">
              <div class="draw_cont_btn" style="width: 110px; margin-bottom: 20px;">
                  <el-image class="img_examp" :src="httpUrls.ossUrl + 'pc/com/message_center/bxl_mj_creat.png'" fit="fill" />
                  <span class="btn_text">创建任务</span>
              </div>

              <div class="draw_cont">
                  <div class="cont_tip">创建任务</div>
                  <div class="draw_cont_btn">
                      <el-image class="img_examp" style="width: 16px; height: 16px;" :src="httpUrls.ossUrl + 'pc/com/message_center/bxl_mj_shuaxin.png'" fit="fill" />
                      <span class="btn_text">刷新</span>
                  </div>
              </div>

              <div class="draw_empty" v-if="isCreat">
                  <span class="noempty_text">1个任务正在进行中...</span>
              </div>

              <div class="draw_empty" v-else>
                  <el-image class="img_examp" :src="httpUrls.ossUrl + 'pc/com/message_center/bxl_mj_empty.png'" fit="fill" />
                  <span class="empty_text">暂无任务</span>
              </div>

              
          </div>

          <div class="mj_draw">
              <div class="draw_cont" style="align-items: flex-end">
                  <div class="cont_mj_left">
                      <div class="left_top">
                          <span class="top_text">任务列表</span>
                          <el-popover placement="right" :width="180" trigger="hover">
                              <template #reference>
                                  <el-image class="title_examp" :src="httpUrls.ossUrl + 'pc/com/message_center/bxl_draw_tip.png'" fit="fill" />
                              </template>
                              <template #default>
                                  <div class="examp_text">未启动：任务等待执行</div>
                                  <div class="examp_text">执行中：任务正在执行中</div>
                                  <div class="examp_text">成功：任务执行成功</div>
                                  <div class="examp_text">失败：任务执行失败</div>
                              </template>
                          </el-popover>
                      </div>
                      <div class="left_bot">总计：36</div>
                  </div>
                  <div class="cont_mj_right">
                      <div class="right_btn">
                          <el-image class="title_examp" :src="httpUrls.ossUrl + 'pc/com/message_center/bxl_mj_refresh.png'" fit="fill" />
                          <span class="right_text">刷新</span>
                      </div>

                      <div class="right_btn">
                          <el-image class="title_examp" :src="httpUrls.ossUrl + 'pc/com/message_center/bxl_mj_xz.png'" fit="fill" />
                          <span class="right_text">下载</span>
                      </div>
                  </div>
              </div>

          </div>

          <div class="mj_draw_ul">
              <div class="draw_img_li" v-for="(item, index) in 8" :key="index">
                  <div class="img_top">
                      <div class="img_top_left">
                          <el-tag type="warning" v-if="index == 0">绘制中</el-tag>
                          <el-tag type="danger" v-else-if="index == 1">失败</el-tag>
                          <el-tag type="success" v-else>成功</el-tag>
                      </div>
                      <div class="img_top_right">
                          <div class="top_right_btn">
                              <el-image class="title_examp" :src="httpUrls.ossUrl + 'pc/com/message_center/bxl_img_use.png'" fit="fill" />
                              <span class="title_text">使用</span>
                          </div>
                          <div class="top_right_btn">
                              <el-image class="title_examp" :src="httpUrls.ossUrl + 'pc/com/message_center/bxl_img_xz.png'" fit="fill" />
                              <span class="title_text">下载</span>
                          </div>
                          <div class="top_right_btn">
                              <el-image class="title_examp" :src="httpUrls.ossUrl + 'pc/com/message_center/bxl_mj_dash.png'" fit="fill" />
                              <span class="title_text">删除</span>
                          </div>
                      </div>
                  </div>
                  <div class="img_fail" v-if="index == 0">
                      <el-image class="fail_img" :src="httpUrls.ossUrl + 'pc/com/message_center/bxl_img_fail.png'" fit="contain" />
                      <span class="fail_text">绘制失败</span>
                  </div>
                  <div class="img_fail" v-else-if="index == 1">
                      <el-progress type="circle" :percentage="25" />
                      <span class="fail_text">绘制中</span>
                  </div>
                  <div class="img_cont" v-else>
                      <el-image class="title_examp" :src="httpUrls.ossUrl + 'xcx/com/message_center/%E7%AB%8B%E4%BD%93%E9%A3%8E.png'" fit="contain" />
                  </div>
                  <div class="img_li_oper">
                      <span class="oper_text">放大:</span>
                      <el-popover placement="left" :width="240" trigger="hover">
                          <template #reference>
                              <el-image class="oper_examp" :src="httpUrls.ossUrl + 'pc/com/message_center/bxl_draw_tip.png'" fit="fill" />
                          </template>
                          <template #default>
                              <div class="examp_text">参数释义：放大某张图片</div>
                              <div class="examp_text">如 V1 则变换第一张图片，以此类推</div>
                          </template>
                      </el-popover>
                      <div class="oper_btn">U1</div>
                      <div class="oper_btn">U2</div>
                      <div class="oper_btn">U3</div>
                      <div class="oper_btn">U4</div>
                      <el-image class="oper_examp" :src="httpUrls.ossUrl + 'pc/com/message_center/bxl_img_sx.png'" fit="contain" />
                  </div>
                  <div class="img_li_oper">
                      <span class="oper_text">变换:</span>
                      <el-popover placement="left" :width="240" trigger="hover">
                          <template #reference>
                              <el-image class="oper_examp" :src="httpUrls.ossUrl + 'pc/com/message_center/bxl_draw_tip.png'" fit="fill" />
                          </template>
                          <template #default>
                              <div class="examp_text">参数释义：以某张图片为基准重新生成</div>
                              <div class="examp_text">如 V1 则变换第一张图片，以此类推</div>
                          </template>
                      </el-popover>
                      <div class="oper_btn">V1</div>
                      <div class="oper_btn">V2</div>
                      <div class="oper_btn">V3</div>
                      <div class="oper_btn">V4</div>
                  </div>

                  <div class="img_li_oper">
                      <span class="oper_text">提示词:</span>
                      <el-popover placement="left" :width="240" trigger="hover">
                          <template #reference>
                              <el-image class="oper_examp" :src="httpUrls.ossUrl + 'pc/com/message_center/bxl_draw_tip.png'" fit="fill" />
                          </template>
                          <template #default>
                              <div class="examp_text">(提示词带有自定义参数，将不使用默认设定参数)</div>
                          </template>
                      </el-popover>
                      <div class="oper_btn">P1</div>
                      <div class="oper_btn">P2</div>
                      <div class="oper_btn">P3</div>
                      <div class="oper_btn">P4</div>
                  </div>
                  <div class="img_zx" style="margin-bottom: 10px;">执行：绘图</div>
                  <div class="img_zx">时间：2024-07-30 15:14:30</div>
              </div>
          </div>
      </div>

      <!-- 图生图 -->
      <el-dialog
          v-model="photoVisible"
          title="图生图"
          width="600"
          style="border-radius: 10px;;"
      >
          <div class="photo_cont_mj">
               <div class="mj_tip">
                  <span class="tip_text">1、图片越相似，生成角色越精准，最多 2 张图片</span>
                  <span class="tip_text">2、图片顺序越前，权重越高，建议把你最喜欢的图片放在最前面</span>
                  <span class="tip_text">3、生成权重：描述，生成偏向描述词；图片，生成偏向参考图</span>
               </div>

               <div class="mj_step">
                  <span class="step_text">生成权重</span>
                  <el-slider v-model="stepValue" :min="0.45" :max="2.05" step="0.1" :marks="marks" />
               </div>

               <div class="mj_step">
                  <span class="step_text" style="width: 70px;">上传图片</span>
                  <div class="step_img">
                      <el-upload
                          class="avatar-uploader"
                          action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
                          :show-file-list="false"
                          :on-success="handleAvatarSuccess"
                          :before-upload="beforeAvatarUpload"
                      >
                          <el-image class="doctor_img" :src="httpUrls.ossUrl + 'pc/com/message_center/bxl_doctor_img.png'" fit="fill" />
                      </el-upload>
                      <span class="img_text">只能上传大于 5kb，小于4M的图片</span>
                  </div>
               </div>
          </div>
          <template #footer>
              <div class="dialog-footer">
                  <el-button @click="photoVisible = false">取消</el-button>
                  <el-button type="primary" @click="photoVisible = false">确定</el-button>
              </div>
          </template>
      </el-dialog>

      <!-- 图生文 -->
      <el-dialog
          v-model="textVisible"
          title="图生文"
          width="600"
          style="border-radius: 10px;;"
      >
          <div class="photo_cont_mj">
               <div class="mj_tip">
                  <span class="tip_text">上传一张图片生成相似的提示词</span>
               </div>

               <div class="mj_step">
                  <span class="step_text" style="width: 70px;">上传图片</span>
                  <div class="step_img">
                      <el-upload
                          class="avatar-uploader"
                          action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
                          :show-file-list="false"
                          :on-success="handleAvatarSuccess"
                          :before-upload="beforeAvatarUpload"
                      >
                          <el-image class="doctor_img" :src="httpUrls.ossUrl + 'pc/com/message_center/bxl_doctor_img.png'" fit="fill" />
                      </el-upload>
                      <span class="img_text">只能上传大于 5kb，小于4M的图片</span>
                  </div>
               </div>
          </div>
          <template #footer>
              <div class="dialog-footer">
                  <el-button @click="textVisible = false">取消</el-button>
                  <el-button type="primary" @click="textVisible = false">确定</el-button>
              </div>
          </template>
      </el-dialog>

      <!-- 融图 -->
      <el-dialog
          v-model="fuseVisible"
          title="融图"
          width="600"
          style="border-radius: 10px;;"
      >
          <div class="photo_cont_mj">
               <div class="mj_tip">
                  <span class="tip_text">1、融合图片风格，最多上传 5 张图片</span>
                  <span class="tip_text">2、图片顺序越前，权重越高，建议把你最想融合的图片放在最前面</span>
               </div>
               
               <div class="mj_step">
                  <span class="step_text" style="width: 70px;">比例</span>
                  <div class="size">
                      <div class="size_ul">
                          <div class="size_ul_mj" :style="{'background': fuse_active == index ? '#fff':'#F5F5F5',
                          'border': fuse_active == index ? '2px solid #003FFF':'none'}" v-for="(item, index) in fuseList" :key="index" @click="selectFuse(index)">
                              <div class="size_border">
                                  <div class="size_li" :style="{ width: item.width, height: item.height, background: fuse_active == index ? '#CDD9FF':'#D9D9D9' }"></div>
                              </div>
                              <div class="size_count" :style="{ color: fuse_active == index ? '#003FFF':'#666' }">{{ item.size }}</div>
                          </div>
                      </div>
                  </div>
               </div>

               <div class="mj_step">
                  <span class="step_text" style="width: 70px;">上传图片</span>
                  <div class="step_img">
                      <el-upload
                          class="avatar-uploader"
                          action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
                          :show-file-list="false"
                          :on-success="handleAvatarSuccess"
                          :before-upload="beforeAvatarUpload"
                      >
                          <el-image class="doctor_img" :src="httpUrls.ossUrl + 'pc/com/message_center/bxl_doctor_img.png'" fit="fill" />
                      </el-upload>
                      <span class="img_text">只能上传大于 5kb，小于4M的图片</span>
                  </div>
               </div>
          </div>
          <template #footer>
              <div class="dialog-footer">
                  <el-button @click="fuseVisible = false">取消</el-button>
                  <el-button type="primary" @click="fuseVisible = false">确定</el-button>
              </div>
          </template>
      </el-dialog>
  </div>
</template>
<script>
import httpUrls from "@/api/requestURL";
export default {
  name: "midjourney",
  data() {
    return {
      httpUrls: httpUrls,
      size_active: 0,
      model_active: 1,
      value: 1,
      query_check: true,
      descVal: '',
      isCreat: false,
      proportList: [
      {
        id: "1:1",
        size: "1:1",
        width: "32px",
        height: "32px"
      },
      {
        id: "4:3",
        size: "4:3",
        width: "30px",
        height: "20px"
      },
      {
        id: "3:4",
        size: "3:4",
        width: "20px",
        height: "30px"
      },
      {
        id: "16:9",
        size: "16:9",
        width: "38px",
        height: "17px"
      },
      {
        id: "9:16",
        size: "9:16",
        width: "17px",
        height: "38px"
      }
      ],
      versions: [
          {
              label: 5,
              value: 5
          },
          {
              label: 4,
              value: 4
          },
          {
              label: 3,
              value: 3
          }
      ],

      count_active: 0,
      countList: [
          {
          value: "低",
          id: "1",
          },
          {
          value: "中",
          id: "2",
          },
          {
          value: "高",
          id: "4",
          },
          {
          value: "强烈",
          id: "8",
          }
      ],

      photoVisible: false,
      stepValue: 1,
      marks: {
          0.5: '描述',
          1: '平衡',
          2: '图片'
      },

      textVisible: false,
      fuseVisible: false,
      fuse_active: 0,
      fuseList: [
      {
        id: "1:1",
        size: "1:1",
        width: "32px",
        height: "32px"
      },
      {
        id: "2:3",
        size: "2:3",
        width: "20px",
        height: "30px"
      },
      {
        id: "3:2",
        size: "3:2",
        width: "30px",
        height: "20px"
      },
      ]

    };
  },
  
  // 创建完毕状态(里面是操作)
  created() {
      
  },

  // 里面的函数只有调用才会执行
  methods: {
      selectProport(index) {
          this.size_active = index
      },
      selcetCount(index) {
          this.count_active = index
      },
      selectFuse(index) {
          this.fuse_active = index
      }
  },
};
</script>

<style scoped lang="scss">
   @import './draw.scss'
</style>

