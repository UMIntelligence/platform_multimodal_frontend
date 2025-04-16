<template>
  <div
    class="draw-chat"
    :style="$route.path == '/drawChat/drawChat'?isShowNotice?'height: calc(100vh - 100px - 30px);':'':''"
  >
    <div class="work_area" style="width: calc(25% + 40px)">
      <div
        class="select_workspaceNew"
        :style="chat_type == 9 ? 'width: 160px;margin-top: 20px;' : 'width:80px;'"
        v-show="false"
      >
        <div
          :style="selsectWorkSpaceLeft == 1 ? 'background:#1F64FF;color: #FFF;' : ''"
          @click="showWorspaceOrHistory(1)"
        >
          极简
        </div>
        <div
          v-if="chat_type == 9"
          :style="selsectWorkSpaceLeft == 2 ? 'background:#1F64FF;color: #FFF;' : ''"
          @click="showWorspaceOrHistory(2)"
        >
          专家
        </div>
      </div>
      <!-- tab切换 -->
      <div class="tab">
        <div
          style="width: calc(100% * 2)"
          :class="selsectWorkSpaceLeft == 1 ? 'teb-content' : 'teb-content tabTransition'"
        >
          <div
            style="width: calc(100% / 2)"
            :class="selsectWorkSpaceLeft == 1 ? 'tab-box boxTransition' : 'tab-box'"
          >
            <!-- 极简 -->
            <div class="workSpace_area" style="width: 100%">
              <!-- 类型 -->
              <div class="typesof" v-if="chat_type == 9">
                <div class="workSpace_area-title">类型</div>
                <div class="msak">
                  <div
                    :class="imageToImage == 1 ? 'item item-on' : 'item'"
                    @click="imageToImage = 1"
                  >
                    文生图
                  </div>
                  <div
                    :class="imageToImage == 2 ? 'item item-on' : 'item'"
                    @click="imageToImage = 2"
                    v-if="chat_type == 9"
                  >
                    图生图
                  </div>
                </div>
              </div>

              <!-- 图生图 -->
              <!-- <div v-if="imageToImage == 2 && chat_type == 9">
                <el-upload
                  style="max-width: 500px"
                  :action="httpUrls.loginUrl + 'api/user/oss_upload'"
                  list-type="picture-card"
                  :auto-upload="true"
                  :limit="1"
                  :on-exceed="
                    () => {
                      return $message.error('文件上传超出最大限制！');
                    }
                  "
                  accept=".png,.jpg,.jpeg"
                  ref="drawPictureList"
                  :on-change="handleUploadChange"
                  :on-success="handleSuccess"
                  :data="requestData"
                  class="upload-file-code"
                >
                  <div class="upload-btn">
                    <div class="btn-mask">
                      <i class="el-icon-plus" style="font-size: 18px"></i>
                      <div>点击上传</div>
                    </div>
                  </div>
                  <div slot="file" slot-scope="{ file }">
                    <img
                      class="el-upload-list__item-thumbnail"
                      :src="httpUrls.ossUrl + uploadPictureUrl"
                      alt=""
                    />
                    <span class="el-upload-list__item-actions">
                      <span
                        class="el-upload-list__item-preview"
                        @click="handlePictureCardPreview(file)"
                      >
                        <i class="el-icon-zoom-in"></i>
                      </span>
                      <span
                        v-if="!disabled"
                        class="el-upload-list__item-delete"
                        @click="handleRemoveCompanyLogo(file)"
                      >
                        <i class="el-icon-delete"></i>
                      </span>
                    </span>
                  </div>
                </el-upload>
                <div class="title_prompt">
                  图片仅支持JPG、PNG文件，数量为1张，大小不得超过5MB
                </div>
              </div> -->
              <!-- 图片尺寸 -->
              <div class="img_size" v-show="chat_type != 14">
                <div class="workSpace_area-title">尺寸</div>
                <div class="size_mask" v-if="chat_type == 2">
                  <div
                    :class="sizeRadio == item.id ? 'item item-on' : 'item'"
                    v-for="item in drawSizeListOne"
                    :key="item.id"
                    @click="sizeRadio = item.id"
                  >
                    <div class="box_mask">
                      <div
                        class="box"
                        :style="{ width: item.width, height: item.height }"
                      ></div>
                    </div>
                    <div class="size">{{ item.id }}</div>
                  </div>
                </div>

                <div class="size_mask" v-if="chat_type == 3">
                  <div
                    :class="sizeRadio == item.id ? 'item item-on' : 'item'"
                    v-for="item in drawSizeListTwo"
                    :key="item.id"
                    @click="sizeRadio = item.id"
                  >
                    <div class="box_mask">
                      <div
                        class="box"
                        :style="{ width: item.width, height: item.height }"
                      ></div>
                    </div>
                    <div class="size">{{ item.id }}</div>
                  </div>
                </div>

                <div class="size_mask" v-if="chat_type == 6">
                  <div
                    :class="sizeRadio == item.id ? 'item item-on' : 'item'"
                    v-for="item in drawSizeListThree"
                    :key="item.id"
                    @click="sizeRadio = item.id"
                  >
                    <div class="box_mask">
                      <div
                        class="box"
                        :style="{ width: item.width, height: item.height }"
                      ></div>
                    </div>
                    <div class="size">{{ item.id }}</div>
                  </div>
                </div>

                <div class="size_mask" v-if="chat_type == 9">
                  <div
                    :class="sizeRadio == item.id ? 'item item-on' : 'item'"
                    v-for="item in drawSizeListFour"
                    :key="item.id"
                    @click="sizeRadio = item.id"
                  >
                    <div class="box_mask">
                      <div
                        class="box"
                        :style="{ width: item.width, height: item.height }"
                      ></div>
                    </div>
                    <div class="size">{{ item.id }}</div>
                  </div>
                </div>

                <div class="size_mask" v-if="chat_type == 13 || chat_type == 14">
                  <div
                    :class="sizeRadio == item.id ? 'item item-on' : 'item'"
                    v-for="item in drawSizeListFive"
                    :key="item.id"
                    @click="sizeRadio = item.id"
                  >
                    <div class="box_mask">
                      <div
                        class="box"
                        :style="{ width: item.width, height: item.height }"
                      ></div>
                    </div>
                    <div class="size">{{ item.id }}</div>
                  </div>
                </div>
                <div class="size_mask" v-if="chat_type == 15">
                  <div
                    :class="sizeRadio == item.id ? 'item item-on' : 'item'"
                    v-for="item in drawSizeListSix"
                    :key="item.id"
                    @click="sizeRadio = item.id"
                  >
                    <div class="box_mask">
                      <div
                        class="box"
                        :style="{ width: item.width, height: item.height }"
                      ></div>
                    </div>
                    <div class="size">{{ item.id }}</div>
                  </div>
                </div>
              </div>

              <!-- 图片风格 -->
              <div class="img_style" style="width: 100%">
                <div class="workSpace_area-title">
                  <span style="margin-right: 4px">模型</span>
                  <el-tooltip
                    class="item"
                    effect="dark"
                    content="选择效果: 将生成和效果封面类似的风格或主题图片"
                    placement="top-start"
                  >
                    <img
                      src="../../assets/images/help-circle.png"
                      style="width: 16px; cursor: pointer"
                      alt=""
                    />
                  </el-tooltip>
                </div>
                <div class="style_mask" v-if="chat_type == 9">
                  <div style="display: flex; flex-wrap: wrap; width: 100%">
                    <div
                      :class="SDValue == item.value ? 'item item-on' : 'item'"
                      v-for="item in SDModel"
                      :key="item.value"
                      @click="SDValue = item.value"
                    >
                      <img class="img" :src="httpUrls.ossUrl + item.pic_url" alt="" />
                      <div class="title">{{ item.name }}</div>
                    </div>
                  </div>
                </div>
                <!-- 百度绘画分格 -->
                <div class="style_mask" v-if="chat_type == 3">
                  <div style="display: flex; flex-wrap: wrap; width: 100%">
                    <div
                      :class="SDValue == item.value ? 'item item-on' : 'item'"
                      v-for="item in bdTypeList"
                      :key="item.value"
                      @click="SDValue = item.value"
                    >
                      <img class="img" :src="httpUrls.ossUrl + item.pic_url" alt="" />
                      <div class="title">{{ item.name }}</div>
                    </div>
                  </div>
                </div>
                <!-- 通义绘画类型 -->
                <div class="style_mask" v-if="chat_type == 13">
                  <div style="display: flex; flex-wrap: wrap; width: 100%">
                    <div
                      :class="SDValue == item.value ? 'item item-on' : 'item'"
                      v-for="item in tonyiTypeList"
                      :key="item.value"
                      @click="SDValue = item.value"
                    >
                      <img class="img" :src="httpUrls.ossUrl + item.pic_url" alt="" />
                      <div class="title">{{ item.name }}</div>
                    </div>
                  </div>
                </div>
                <!-- 火山引擎绘画类型 -->
                <div class="style_mask" v-if="chat_type == 14">
                  <div style="display: flex; flex-wrap: wrap; width: 100%">
                    <div
                      :class="SDValue == item.value ? 'item item-on' : 'item'"
                      v-for="item in huoshanTypeList"
                      :key="item.value"
                      @click="SDValue = item.value"
                    >
                      <img class="img" :src="httpUrls.ossUrl + item.pic_url" alt="" />
                      <div class="title">{{ item.name }}</div>
                    </div>
                  </div>
                </div>
                <!-- dell-3绘画类型 -->
                <div class="style_mask" v-if="chat_type == 15">
                  <div style="display: flex; flex-wrap: wrap; width: 100%">
                    <div
                      :class="SDValue == item.value ? 'item item-on' : 'item'"
                      v-for="item in dellE3TypeList"
                      :key="item.value"
                      @click="SDValue = item.value"
                    >
                      <img class="img" :src="httpUrls.ossUrl + item.pic_url" alt="" />
                      <div class="title">{{ item.name }}</div>
                    </div>
                  </div>
                </div>
                <div class="style_mask" v-if="chat_type == 6">
                  <div style="display: flex; flex-wrap: wrap; width: 100%">
                    <div
                      :class="mjImageStyle ? 'item' : 'item item-on'"
                      @click="mjImageStyle = false"
                    >
                      <img class="img" src="../../assets/images/mjFengge1.png" alt="" />
                      <div class="title">通用风格</div>
                    </div>

                    <div
                      :class="mjImageStyle ? 'item item-on' : 'item'"
                      @click="mjImageStyle = true"
                    >
                      <img class="img" src="../../assets/images/mjFengge2.png" alt="" />
                      <div class="title">二次元</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            style="width: calc(100% / 2)"
            :class="selsectWorkSpaceLeft == 2 ? 'tab-box boxTransition' : 'tab-box'"
          >
            <!-- 专家 -->
            <div class="workSpace_area">
              <!-- 类型 -->
              <div class="typesof" v-if="chat_type != 13">
                <div class="workSpace_area-title">类型</div>
                <div class="msak">
                  <div
                    :class="imageToImage == 1 ? 'item item-on' : 'item'"
                    @click="imageToImage = 1"
                  >
                    文生图
                  </div>
                  <div
                    :class="imageToImage == 2 ? 'item item-on' : 'item'"
                    @click="imageToImage = 2"
                    v-if="chat_type == 9"
                  >
                    图生图
                  </div>
                </div>
              </div>

              <!-- 图生图 -->
              <!-- <div v-if="imageToImage == 2 && chat_type == 9">
                <el-upload
                  style="max-width: 500px"
                  :action="httpUrls.loginUrl + 'api/user/oss_upload'"
                  list-type="picture-card"
                  :auto-upload="true"
                  :limit="1"
                  :on-exceed="
                    () => {
                      return $message.error('文件上传超出最大限制！');
                    }
                  "
                  accept=".png,.jpg,.jpeg"
                  ref="drawPictureList"
                  :on-change="handleUploadChange"
                  :on-success="handleSuccess"
                  :data="requestData"
                  class="upload-file-code"
                >
                  <div class="upload-btn">
                    <div class="btn-mask">
                      <i class="el-icon-plus" style="font-size: 18px"></i>
                      <div>点击上传</div>
                    </div>
                  </div>
                  <div slot="file" slot-scope="{ file }">
                    <img
                      class="el-upload-list__item-thumbnail"
                      :src="httpUrls.ossUrl + uploadPictureUrl"
                      alt=""
                    />
                    <span class="el-upload-list__item-actions">
                      <span
                        class="el-upload-list__item-preview"
                        @click="handlePictureCardPreview(file)"
                      >
                        <i class="el-icon-zoom-in"></i>
                      </span>
                      <span
                        v-if="!disabled"
                        class="el-upload-list__item-delete"
                        @click="handleRemoveCompanyLogo(file)"
                      >
                        <i class="el-icon-delete"></i>
                      </span>
                    </span>
                  </div>
                </el-upload>
                <div class="title_prompt">
                  图片仅支持JPG、PNG文件，数量为1张，大小不得超过5MB
                </div>
              </div> -->
              <!-- 图片尺寸 -->
              <div class="img_size" v-show="chat_type != 14">
                <div class="workSpace_area-title">尺寸</div>
                <div class="size_mask" v-if="chat_type == 2">
                  <div
                    :class="sizeRadio == item.id ? 'item item-on' : 'item'"
                    v-for="item in drawSizeListOne"
                    :key="item.id"
                    @click="sizeRadio = item.id"
                  >
                    <div class="box_mask">
                      <div
                        class="box"
                        :style="{ width: item.width, height: item.height }"
                      ></div>
                    </div>
                    <div class="size">{{ item.id }}</div>
                  </div>
                </div>

                <div class="size_mask" v-if="chat_type == 3">
                  <div
                    :class="sizeRadio == item.id ? 'item item-on' : 'item'"
                    v-for="item in drawSizeListTwo"
                    :key="item.id"
                    @click="sizeRadio = item.id"
                  >
                    <div class="box_mask">
                      <div
                        class="box"
                        :style="{ width: item.width, height: item.height }"
                      ></div>
                    </div>
                    <div class="size">{{ item.id }}</div>
                  </div>
                </div>

                <div class="size_mask" v-if="chat_type == 6">
                  <div
                    :class="sizeRadio == item.id ? 'item item-on' : 'item'"
                    v-for="item in drawSizeListThree"
                    :key="item.id"
                    @click="sizeRadio = item.id"
                  >
                    <div class="box_mask">
                      <div
                        class="box"
                        :style="{ width: item.width, height: item.height }"
                      ></div>
                    </div>
                    <div class="size">{{ item.id }}</div>
                  </div>
                </div>

                <div class="size_mask" v-if="chat_type == 9">
                  <div
                    :class="sizeRadio == item.id ? 'item item-on' : 'item'"
                    v-for="item in drawSizeListFour"
                    :key="item.id"
                    @click="sizeRadio = item.id"
                  >
                    <div class="box_mask">
                      <div
                        class="box"
                        :style="{ width: item.width, height: item.height }"
                      ></div>
                    </div>
                    <div class="size">{{ item.id }}</div>
                  </div>
                </div>

                <div class="size_mask" v-if="chat_type == 13 || chat_type == 14">
                  <div
                    :class="sizeRadio == item.id ? 'item item-on' : 'item'"
                    v-for="item in drawSizeListFive"
                    :key="item.id"
                    @click="sizeRadio = item.id"
                  >
                    <div class="box_mask">
                      <div
                        class="box"
                        :style="{ width: item.width, height: item.height }"
                      ></div>
                    </div>
                    <div class="size">{{ item.id }}</div>
                  </div>
                </div>
                <div class="size_mask" v-if="chat_type == 15">
                  <div
                    :class="sizeRadio == item.id ? 'item item-on' : 'item'"
                    v-for="item in drawSizeListSix"
                    :key="item.id"
                    @click="sizeRadio = item.id"
                  >
                    <div class="box_mask">
                      <div
                        class="box"
                        :style="{ width: item.width, height: item.height }"
                      ></div>
                    </div>
                    <div class="size">{{ item.id }}</div>
                  </div>
                </div>
              </div>

              <!-- 图片风格 -->
              <div class="img_style">
                <div class="workSpace_area-title">
                  <span style="margin-right: 4px">模型</span>
                  <el-tooltip
                    class="item"
                    effect="dark"
                    content="选择效果: 将生成和效果封面类似的风格或主题图片"
                    placement="top-start"
                  >
                    <img
                      src="../../assets/images/help-circle.png"
                      style="width: 16px; cursor: pointer"
                      alt=""
                    />
                  </el-tooltip>
                </div>
                <div class="style_mask" v-if="chat_type == 9">
                  <div style="display: flex; flex-wrap: wrap; width: 100%">
                    <div
                      :class="SDValue == item.value ? 'item item-on' : 'item'"
                      v-for="item in SDModel"
                      :key="item.value"
                      @click="SDValue = item.value"
                    >
                      <img class="img" :src="httpUrls.ossUrl + item.pic_url" alt="" />
                      <div class="title">{{ item.name }}</div>
                    </div>
                  </div>
                </div>
                <!-- 百度绘画分格 -->
                <div class="style_mask" v-if="chat_type == 3">
                  <div style="display: flex; flex-wrap: wrap; width: 100%">
                    <div
                      :class="SDValue == item.value ? 'item item-on' : 'item'"
                      v-for="item in bdTypeList"
                      :key="item.value"
                      @click="SDValue = item.value"
                    >
                      <img class="img" :src="httpUrls.ossUrl + item.pic_url" alt="" />
                      <div class="title">{{ item.name }}</div>
                    </div>
                  </div>
                </div>
                <!-- 通义绘画类型 -->
                <div class="style_mask" v-if="chat_type == 13">
                  <div style="display: flex; flex-wrap: wrap; width: 100%">
                    <div
                      :class="SDValue == item.value ? 'item item-on' : 'item'"
                      v-for="item in tonyiTypeList"
                      :key="item.value"
                      @click="SDValue = item.value"
                    >
                      <img class="img" :src="httpUrls.ossUrl + item.pic_url" alt="" />
                      <div class="title">{{ item.name }}</div>
                    </div>
                  </div>
                </div>
                <!-- 火山引擎绘画类型 -->
                <div class="style_mask" v-if="chat_type == 14">
                  <div style="display: flex; flex-wrap: wrap; width: 100%">
                    <div
                      :class="SDValue == item.value ? 'item item-on' : 'item'"
                      v-for="item in huoshanTypeList"
                      :key="item.value"
                      @click="SDValue = item.value"
                    >
                      <img class="img" :src="httpUrls.ossUrl + item.pic_url" alt="" />
                      <div class="title">{{ item.name }}</div>
                    </div>
                  </div>
                </div>
                <!-- dell-3绘画类型 -->
                <div class="style_mask" v-if="chat_type == 15">
                  <div style="display: flex; flex-wrap: wrap; width: 100%">
                    <div
                      :class="SDValue == item.value ? 'item item-on' : 'item'"
                      v-for="item in dellE3TypeList"
                      :key="item.value"
                      @click="SDValue = item.value"
                    >
                      <img class="img" :src="httpUrls.ossUrl + item.pic_url" alt="" />
                      <div class="title">{{ item.name }}</div>
                    </div>
                  </div>
                </div>
                <div class="style_mask" v-if="chat_type == 6">
                  <div style="display: flex; flex-wrap: wrap; width: 100%">
                    <div
                      :class="mjImageStyle ? 'item' : 'item item-on'"
                      @click="mjImageStyle = false"
                    >
                      <img class="img" src="../../assets/images/mjFengge1.png" alt="" />
                      <div class="title">通用风格</div>
                    </div>

                    <div
                      :class="mjImageStyle ? 'item item-on' : 'item'"
                      @click="mjImageStyle = true"
                    >
                      <img class="img" src="../../assets/images/mjFengge2.png" alt="" />
                      <div class="title">二次元</div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- 反向提示词 -->
              <div
                class="img_cue_word"
                v-if="selsectWorkSpaceLeft == 2 && chat_type == 9"
              >
                <div class="workSpace_area-title">反向提示词</div>
                <div class="input_textarea">
                  <el-input
                    type="textarea"
                    v-model="drawTextarea"
                    style="height: 80px"
                    resize="none"
                    placeholder="反向提示词可以屏蔽你不想生成的内容，可以输入(低画质、缺失的手指等)"
                  ></el-input>
                </div>
              </div>

              <!-- 高级设置 -->
              <div class="img_senior">
                <div class="senior-title" v-if="chat_type == 9">高级设置</div>
                <!-- 采集器 -->
                <div
                  class="img_collector"
                  v-if="selsectWorkSpaceLeft == 2 && chat_type == 9"
                >
                  <div class="workSpace_area-title">
                    <span style="margin-right: 4px">采集器</span>
                    <el-tooltip
                      class="item"
                      effect="dark"
                      content="选择效果: 将生成和效果封面类似的风格或主题图片"
                      placement="top-start"
                    >
                      <img
                        src="../../assets/images/help-circle.png"
                        style="width: 16px; cursor: pointer"
                        alt=""
                      />
                    </el-tooltip>
                  </div>
                  <div>
                    <el-select
                      v-model="samplerIndex"
                      placeholder="请选择"
                      style="width: 100%"
                    >
                      <el-option
                        v-for="item in samplerIndexArr"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                      >
                      </el-option>
                    </el-select>
                  </div>
                </div>
                <!-- 迭代次数 -->
                <div
                  class="img_collector"
                  v-if="selsectWorkSpaceLeft == 2 && chat_type == 9"
                >
                  <div class="workSpace_area-title">
                    <span style="margin-right: 4px">迭代次数</span>
                    <el-tooltip
                      class="item"
                      effect="dark"
                      content="选择效果: 将生成和效果封面类似的风格或主题图片"
                      placement="top-start"
                    >
                      <img
                        src="../../assets/images/help-circle.png"
                        style="width: 16px; cursor: pointer"
                        alt=""
                      />
                    </el-tooltip>
                  </div>
                  <div class="senior-box">
                    <div>
                      <el-input-number
                        :controls="false"
                        :min="10"
                        :max="50"
                        v-model="steps"
                        placeholder="选填数字，范围:10-50"
                      ></el-input-number>
                    </div>
                    <div @click="steps += 1">+</div>
                    <div @click="steps -= 1">-</div>
                  </div>
                </div>
                <!-- 提示词相关 -->
                <div
                  class="img_collector"
                  v-if="selsectWorkSpaceLeft == 2 && chat_type == 9"
                >
                  <div class="workSpace_area-title">
                    <span style="margin-right: 4px">提示词相关</span>
                    <el-tooltip
                      class="item"
                      effect="dark"
                      content="选择效果: 将生成和效果封面类似的风格或主题图片"
                      placement="top-start"
                    >
                      <img
                        src="../../assets/images/help-circle.png"
                        style="width: 16px; cursor: pointer"
                        alt=""
                      />
                    </el-tooltip>
                  </div>
                  <div class="senior-box">
                    <div>
                      <el-input-number
                        :controls="false"
                        :min="0"
                        :max="35"
                        v-model="cfg_scale"
                        placeholder="选填数字，范围:0-35"
                      ></el-input-number>
                    </div>
                    <div @click="cfg_scale += 1">+</div>
                    <div @click="cfg_scale -= 1">-</div>
                  </div>
                </div>
                <!-- 随机种子 -->
                <div
                  class="img_collector"
                  v-if="selsectWorkSpaceLeft == 2 && chat_type == 9"
                >
                  <div class="workSpace_area-title">
                    <span style="margin-right: 4px">随机种子</span>
                    <el-tooltip
                      class="item"
                      effect="dark"
                      content="选择效果: 将生成和效果封面类似的风格或主题图片"
                      placement="top-start"
                    >
                      <img
                        src="../../assets/images/help-circle.png"
                        style="width: 16px; cursor: pointer"
                        alt=""
                      />
                    </el-tooltip>
                  </div>
                  <div class="senior-box">
                    <div>
                      <el-input-number
                        :controls="false"
                        v-model="seed"
                        placeholder="选填数字，范围:0-4294967295"
                      ></el-input-number>
                    </div>
                    <div @click="seed++">+</div>
                    <div @click="seed--">-</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="main">
      <GoBackNew style="margin-left: 10px"></GoBackNew>
      <!-- 模型列表 -->
      <div class="checkModel" v-if="$route.path == '/chataboratory/laboratoryDrawChat'">
        <div class="top_title">选择绘画引擎</div>
        <div style="display: flex; justify-content: center">
          <div class="ai_list_btn">
            <el-button
              style="poaition: relative"
              v-for="item in aiNameList"
              :key="item.value"
              class="chat-ai-btn-list"
              @click="selectAIname(item)"
              :style="chat_type == item.value ? 'color: #fff;background: #1F64FF;' : ''"
            >
              {{ item.label }}
            </el-button>
          </div>
        </div>
      </div>

      <!-- 大图示例和用户生成图片，以及各种错误提示区 -->
      <div
        class="workspace_main"
        :style="$route.path == '/chataboratory/laboratoryDrawChat' ? 'height: 450px' : ''"
      >
        <div class="workspace_mask">
          <div>
            <!-- delle2 -->
            <div class="img_msk" v-if="chat_type == 2">
              <!-- 示例 -->
              <div v-if="exampleItem != '' && chatList.length == 0">
                <!-- 虚影图片 -->
                <img class="filter_img" :src="exampleItem.pic_url" alt="" />
                <!-- 显示图片 -->
                <img
                  class="img"
                  :src="exampleItem.pic_url"
                  alt=""
                  v-if="exampleItem != '' && chatList.length == 0"
                />

                <div class="example_title" v-if="exampleItem != ''">示例图片</div>
                <!-- <el-button
                  class="btn"
                  
                  >使用案例</el-button
                > -->
              </div>

              <!-- 没钱了 -->
              <div
                v-else-if="!isuser"
                style="
                  width: 100%;
                  height: 100%;
                  display: flex;
                  flex-direction: column;
                  justify-content: center;
                  align-items: center;
                  background-color: #ebebeb;
                "
              >
                <div style="font-size: 14px; margin-bottom: 20px">
                  十分抱歉，您的次数已用完，请购买流量包等产品
                </div>
                <el-button
                  v-if="!isuser"
                  @click="$refs.Pay.PayVisible = true"
                  style="
                    width: 179px;
                    height: 40px;
                    text-align: center;
                    background: #ff9b17;
                    color: #ffffff;
                  "
                  >购买套餐</el-button
                >
              </div>

              <!-- 结果 -->
              <div v-else-if="isBtn">
                <!-- 虚影图片 -->
                <img
                  class="filter_img"
                  :src="httpUrls.ossUrl + chatList[1].image_urls[0].url"
                  alt=""
                />
                <!-- 显示图片 -->
                <img
                  class="img"
                  style="cursor: zoom-in"
                  :src="httpUrls.ossUrl + chatList[1].image_urls[0].url"
                  alt=""
                  v-if="isBtn"
                  @click="
                    (dialogVisible = true),
                      (dialogImageUrl = httpUrls.ossUrl + chatList[1].image_urls[0].url)
                  "
                />
              </div>

              <!-- 生成中 -->
              <div
                v-if="isTimeDell"
                style="
                  width: 100%;
                  height: 100%;
                  display: flex;
                  flex-direction: column;
                  justify-content: center;
                  align-items: center;
                "
              >
                <el-progress
                  type="circle"
                  color="#B5CCFF"
                  define-back-color="#1F64FF"
                  :percentage="percentageNumber"
                ></el-progress>
                <div v-if="isTimeDell">生成中，耗时{{ timer }}秒</div>
              </div>
            </div>

            <!-- 百度绘画 -->
            <div class="img_msk" v-if="chat_type == 3">
              <!-- 示例 -->
              <div v-if="exampleItem != '' && baiduList.length == 0">
                <!-- 虚影图片 -->
                <img class="filter_img" :src="exampleItem.pic_url" alt="" />
                <!-- 显示图片 -->
                <img
                  class="img"
                  :src="exampleItem.pic_url"
                  alt=""
                  v-if="exampleItem != '' && baiduList.length == 0"
                />

                <div class="example_title" v-if="exampleItem != ''">示例图片</div>
                <!-- <el-button
                  class="btn"
                  v-if="exampleItem != ''"
                  @click="sendValue = exampleItem.pic_desc"
                  >使用案例</el-button
                > -->
              </div>

              <!-- 没钱了 -->
              <div
                v-else-if="!isuser"
                style="
                  width: 100%;
                  height: 100%;
                  display: flex;
                  flex-direction: column;
                  justify-content: center;
                  align-items: center;
                  background-color: #ebebeb;
                "
              >
                <div style="font-size: 14px; margin-bottom: 20px">
                  十分抱歉，您的次数已用完，请购买流量包等产品
                </div>
                <el-button
                  v-if="!isuser"
                  @click="$refs.Pay.PayVisible = true"
                  style="
                    width: 179px;
                    height: 40px;
                    text-align: center;
                    background: #ff9b17;
                    color: #ffffff;
                  "
                  >购买套餐</el-button
                >
              </div>

              <!-- 结果 -->
              <div v-else-if="isBtn">
                <!-- 虚影图片 -->
                <img
                  class="filter_img"
                  :src="httpUrls.ossUrl + baiduList[1].image_urls[0].url"
                  alt=""
                />
                <!-- 显示图片 -->
                <img
                  class="img"
                  style="cursor: zoom-in"
                  :src="httpUrls.ossUrl + baiduList[1].image_urls[0].url"
                  alt=""
                  @click="
                    (dialogVisible = true),
                      (dialogImageUrl = httpUrls.ossUrl + baiduList[1].image_urls[0].url)
                  "
                />
              </div>

              <!-- 生成中 -->
              <div
                v-if="isTimeBaidu"
                style="
                  width: 100%;
                  height: 100%;
                  display: flex;
                  flex-direction: column;
                  justify-content: center;
                  align-items: center;
                "
              >
                <el-progress type="circle" :percentage="percentageNumber"></el-progress>
                <div v-if="isTimeBaidu">生成中，耗时{{ timer }}秒</div>
              </div>
            </div>

            <!-- MJ -->
            <div class="img_msk" v-if="chat_type == 6">
              <!-- 示例 -->
              <div v-if="exampleItem != '' && midjourneyList.length == 0">
                <!-- 虚影图片 -->
                <img class="filter_img" :src="exampleItem.pic_url" alt="" />
                <!-- 显示图片 -->
                <img
                  class="img"
                  :src="exampleItem.pic_url"
                  alt=""
                  v-if="exampleItem != '' && midjourneyList.length == 0"
                />

                <div class="example_title" v-if="exampleItem != ''">示例图片</div>
                <!-- <el-button
                  class="btn"
                  v-if="exampleItem != ''"
                  @click="sendValue = exampleItem.pic_desc"
                  >使用案例</el-button
                > -->
              </div>

              <!-- 没钱了 -->
              <div
                v-else-if="!isuser"
                style="
                  width: 100%;
                  height: 100%;
                  display: flex;
                  flex-direction: column;
                  justify-content: center;
                  align-items: center;
                  background-color: #ebebeb;
                "
              >
                <div style="font-size: 14px; margin-bottom: 20px">
                  十分抱歉，您的次数已用完，请购买流量包等产品
                </div>
                <el-button
                  v-if="!isuser"
                  @click="$refs.Pay.PayVisible = true"
                  style="
                    width: 179px;
                    height: 40px;
                    text-align: center;
                    background: #ff9b17;
                    color: #ffffff;
                  "
                  >购买套餐</el-button
                >
              </div>

              <!-- 结果 -->
              <div v-else-if="isBtn">
                <!-- 虚影图片 -->
                <img
                  class="filter_img"
                  :src="httpUrls.ossUrl + midjourneyList[1].image_urls[0].url"
                  alt=""
                />
                <!-- 显示图片 -->
                <img
                  class="img"
                  style="cursor: zoom-in"
                  :src="httpUrls.ossUrl + midjourneyList[1].image_urls[0].url"
                  alt=""
                  @click="
                    (dialogVisible = true),
                      (dialogImageUrl =
                        httpUrls.ossUrl + midjourneyList[1].image_urls[0].url)
                  "
                />
              </div>

              <!-- 生成中 -->
              <div
                v-if="isTimeMidjourney"
                style="
                  width: 100%;
                  height: 100%;
                  display: flex;
                  flex-direction: column;
                  justify-content: center;
                  align-items: center;
                "
              >
                <el-progress type="circle" :percentage="percentageNumber"></el-progress>
                <div v-if="isTimeMidjourney">生成中，耗时{{ timer }}秒</div>
              </div>
            </div>

            <!-- SD -->
            <div class="img_msk" v-if="chat_type == 9">
              <div
                class="uploadImage"
                v-if="
                  exampleItem != '' &&
                  stableDiffusionList.length == 0 &&
                  imageToImage == 2
                "
              >
                <div
                  v-show="uploadPictureUrl"
                  class="uploadBack"
                  @click="uploadPictureUrl = ''"
                >
                  <i class="el-icon-close"></i>
                </div>
                <el-upload
                  style="width: 100%; height: 100%; position: relative"
                  class="upload-demo"
                  :show-file-list="false"
                  ref="blueprintReading"
                  :data="blueprintReadingFile"
                  drag
                  :action="httpUrls.loginUrl + 'api/user/oss_upload'"
                  :on-change="handleChangeFile"
                  :on-success="handleSuccessFile"
                  :headers="headerData"
                >
                  <!-- <i class="el-icon-upload"></i> -->
                  <div
                    style="
                      position: absolute;
                      top: 50%;
                      left: 50%;
                      transform: translate(-50%, -50%);
                    "
                  >
                    <div class="uploadImg-title" v-if="!uploadPictureUrl">上传图片</div>
                    <template v-if="!uploadPictureUrl">
                      <img
                        style="height: 120px"
                        :src="
                          httpUrls.ossUrl +
                          'static/picture/f05b5fd5-bc19-47c1-91b0-f23a40290c19.png'
                        "
                        alt=""
                      />
                      <div class="el-upload__text">将图片拖至此处或<em>点击上传</em></div>
                      <div class="el-upload__text" style="margin-top: 5px">
                        图片大小不超过2Mb
                      </div>
                    </template>
                    <template v-else>
                      <img
                        style="border-radius: 10px; max-height: 450px"
                        :src="httpUrls.ossUrl + uploadPictureUrl"
                        alt=""
                      />
                    </template>
                  </div>
                </el-upload>
              </div>
              <!-- 示例 -->
              <div v-else-if="exampleItem != '' && stableDiffusionList.length == 0">
                <!-- 虚影图片 -->
                <img class="filter_img" :src="exampleItem.pic_url" alt="" />
                <!-- 显示图片 -->
                <img
                  class="img"
                  :src="exampleItem.pic_url"
                  alt=""
                  v-if="exampleItem != '' && stableDiffusionList.length == 0"
                />

                <div class="example_title" v-if="exampleItem != ''">示例图片</div>
              </div>

              <!-- 没钱了 -->
              <div
                v-else-if="!isuser"
                style="
                  width: 100%;
                  height: 100%;
                  display: flex;
                  flex-direction: column;
                  justify-content: center;
                  align-items: center;
                  background-color: #ebebeb;
                "
              >
                <div style="font-size: 14px; margin-bottom: 20px">
                  十分抱歉，您的次数已用完，请购买流量包等产品
                </div>
                <el-button
                  v-if="!isuser"
                  @click="$refs.Pay.PayVisible = true"
                  style="
                    width: 179px;
                    height: 40px;
                    text-align: center;
                    background: #ff9b17;
                    color: #ffffff;
                  "
                  >购买套餐</el-button
                >
              </div>

              <!-- 结果 -->
              <div
                v-else-if="isBtn"
                style="
                  width: 100%;
                  height: 100%;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                "
              >
                <div
                  :style="
                    stableDiffusionList[1].is_mod == 1
                      ? 'font-size: 16px;font-weight: bold;color: #f56c6c;padding: 0 80px;'
                      : 'font-size: 16px;font-weight: bold;'
                  "
                  v-if="
                    stableDiffusionList[1].is_mod == 1 ||
                    stableDiffusionList[1].status == 1
                  "
                >
                  {{ stableDiffusionList[1].content }}
                </div>
                <!-- 虚影图片 -->
                <img
                  v-if="
                    stableDiffusionList[1].is_mod != 1 &&
                    stableDiffusionList[1].status != 1
                  "
                  class="filter_img"
                  :src="httpUrls.ossUrl + stableDiffusionList[1].image_urls[0].url"
                  alt=""
                />
                <!-- 显示图片 -->
                <img
                  v-if="
                    stableDiffusionList[1].is_mod != 1 &&
                    stableDiffusionList[1].status != 1
                  "
                  class="img"
                  style="cursor: zoom-in"
                  :src="httpUrls.ossUrl + stableDiffusionList[1].image_urls[0].url"
                  alt=""
                  @click="
                    (dialogVisible = true),
                      (dialogImageUrl =
                        httpUrls.ossUrl + stableDiffusionList[1].image_urls[0].url)
                  "
                />
              </div>

              <!-- 生成中 -->
              <div
                v-if="isTimestableDiffusion"
                style="
                  width: 100%;
                  height: 100%;
                  display: flex;
                  flex-direction: column;
                  justify-content: center;
                  align-items: center;
                "
              >
                <el-progress type="circle" :percentage="percentageNumber"></el-progress>
                <div v-if="isTimestableDiffusion">生成中，耗时{{ timer }}秒</div>
              </div>
            </div>

            <!-- 通义 -->
            <div class="img_msk" v-if="chat_type == 13">
              <!-- 示例 -->
              <div v-if="exampleItem != '' && tonyiList.length == 0">
                <!-- 虚影图片 -->
                <img class="filter_img" :src="exampleItem.pic_url" alt="" />
                <!-- 显示图片 -->
                <img
                  class="img"
                  :src="exampleItem.pic_url"
                  alt=""
                  v-if="exampleItem != '' && tonyiList.length == 0"
                />

                <div class="example_title" v-if="exampleItem != ''">示例图片</div>
                <!-- <el-button
                  class="btn"
                  v-if="exampleItem != ''"
                  @click="sendValue = exampleItem.pic_desc"
                  >使用案例</el-button
                > -->
              </div>

              <!-- 没钱了 -->
              <div
                v-else-if="!isuser"
                style="
                  width: 100%;
                  height: 100%;
                  display: flex;
                  flex-direction: column;
                  justify-content: center;
                  align-items: center;
                  background-color: #ebebeb;
                "
              >
                <div style="font-size: 14px; margin-bottom: 20px">
                  十分抱歉，您的次数已用完，请购买流量包等产品
                </div>
                <el-button
                  v-if="!isuser"
                  @click="$refs.Pay.PayVisible = true"
                  style="
                    width: 179px;
                    height: 40px;
                    text-align: center;
                    background: #ff9b17;
                    color: #ffffff;
                  "
                  >购买套餐</el-button
                >
              </div>

              <!-- 结果 -->
              <div v-else-if="isBtn">
                <!-- 虚影图片 -->
                <img
                  class="filter_img"
                  :src="httpUrls.ossUrl + tonyiList[1].image_urls[0].url"
                  alt=""
                />
                <!-- 显示图片 -->
                <img
                  class="img"
                  style="cursor: zoom-in"
                  :src="httpUrls.ossUrl + tonyiList[1].image_urls[0].url"
                  alt=""
                  @click="
                    (dialogVisible = true),
                      (dialogImageUrl = httpUrls.ossUrl + tonyiList[1].image_urls[0].url)
                  "
                />
              </div>

              <!-- 生成中 -->
              <div
                v-if="isTimeTonyi"
                style="
                  width: 100%;
                  height: 100%;
                  display: flex;
                  flex-direction: column;
                  justify-content: center;
                  align-items: center;
                "
              >
                <el-progress type="circle" :percentage="percentageNumber"></el-progress>
                <div v-if="isTimeTonyi">生成中，耗时{{ timer }}秒</div>
              </div>
            </div>

            <!-- 火山引擎 -->
            <div class="img_msk" v-if="chat_type == 14">
              <!-- 示例 -->
              <div v-if="exampleItem != '' && huoshanList.length == 0">
                <!-- 虚影图片 -->
                <img class="filter_img" :src="exampleItem.pic_url" alt="" />
                <!-- 显示图片 -->
                <img
                  class="img"
                  :src="exampleItem.pic_url"
                  alt=""
                  v-if="exampleItem != '' && huoshanList.length == 0"
                />

                <div class="example_title" v-if="exampleItem != ''">示例图片</div>
                <!-- <el-button
                  class="btn"
                  v-if="exampleItem != ''"
                  @click="sendValue = exampleItem.pic_desc"
                  >使用案例</el-button
                > -->
              </div>

              <!-- 没钱了 -->
              <div
                v-else-if="!isuser"
                style="
                  width: 100%;
                  height: 100%;
                  display: flex;
                  flex-direction: column;
                  justify-content: center;
                  align-items: center;
                  background-color: #ebebeb;
                "
              >
                <div style="font-size: 14px; margin-bottom: 20px">
                  十分抱歉，您的次数已用完，请购买流量包等产品
                </div>
                <el-button
                  v-if="!isuser"
                  @click="$refs.Pay.PayVisible = true"
                  style="
                    width: 179px;
                    height: 40px;
                    text-align: center;
                    background: #ff9b17;
                    color: #ffffff;
                  "
                  >购买套餐</el-button
                >
              </div>

              <!-- 结果 -->
              <div v-else-if="isBtn">
                <!-- 虚影图片 -->
                <img
                  class="filter_img"
                  :src="httpUrls.ossUrl + huoshanList[1].image_urls[0].url"
                  alt=""
                />
                <!-- 显示图片 -->
                <img
                  class="img"
                  style="cursor: zoom-in"
                  :src="httpUrls.ossUrl + huoshanList[1].image_urls[0].url"
                  alt=""
                  @click="
                    (dialogVisible = true),
                      (dialogImageUrl =
                        httpUrls.ossUrl + huoshanList[1].image_urls[0].url)
                  "
                />
              </div>

              <!-- 生成中 -->
              <div
                v-if="isTimeHuoshan"
                style="
                  width: 100%;
                  height: 100%;
                  display: flex;
                  flex-direction: column;
                  justify-content: center;
                  align-items: center;
                "
              >
                <el-progress type="circle" :percentage="percentageNumber"></el-progress>
                <div v-if="isTimeHuoshan">生成中，耗时{{ timer }}秒</div>
              </div>
            </div>

            <!-- dell-3 -->
            <div class="img_msk" v-if="chat_type == 15">
              <!-- 示例 -->
              <div v-if="exampleItem != '' && dellE3List.length == 0">
                <!-- 虚影图片 -->
                <img class="filter_img" :src="exampleItem.pic_url" alt="" />
                <!-- 显示图片 -->
                <img
                  class="img"
                  :src="exampleItem.pic_url"
                  alt=""
                  v-if="exampleItem != '' && dellE3List.length == 0"
                />

                <div class="example_title" v-if="exampleItem != ''">示例图片</div>
                <!-- <el-button
                  class="btn"
                  v-if="exampleItem != ''"
                  @click="sendValue = exampleItem.pic_desc"
                  >使用案例</el-button
                > -->
              </div>

              <!-- 没钱了 -->
              <div
                v-else-if="!isuser"
                style="
                  width: 100%;
                  height: 100%;
                  display: flex;
                  flex-direction: column;
                  justify-content: center;
                  align-items: center;
                  background-color: #ebebeb;
                "
              >
                <div style="font-size: 14px; margin-bottom: 20px">
                  十分抱歉，您的次数已用完，请购买流量包等产品
                </div>
                <el-button
                  v-if="!isuser"
                  @click="$refs.Pay.PayVisible = true"
                  style="
                    width: 179px;
                    height: 40px;
                    text-align: center;
                    background: #ff9b17;
                    color: #ffffff;
                  "
                  >购买套餐</el-button
                >
              </div>

              <!-- 结果 -->
              <div v-else-if="isBtn">
                <!-- 虚影图片 -->
                <img
                  class="filter_img"
                  :src="httpUrls.ossUrl + dellE3List[1].image_urls[0].url"
                  alt=""
                />
                <!-- 显示图片 -->
                <img
                  class="img"
                  style="cursor: zoom-in"
                  :src="httpUrls.ossUrl + dellE3List[1].image_urls[0].url"
                  alt=""
                  @click="
                    (dialogVisible = true),
                      (dialogImageUrl = httpUrls.ossUrl + dellE3List[1].image_urls[0].url)
                  "
                />
              </div>

              <!-- 生成中 -->
              <div
                v-if="isTimeDellE3"
                style="
                  width: 100%;
                  height: 100%;
                  display: flex;
                  flex-direction: column;
                  justify-content: center;
                  align-items: center;
                "
              >
                <el-progress type="circle" :percentage="percentageNumber"></el-progress>
                <div v-if="isTimeDellE3">生成中，耗时{{ timer }}秒</div>
              </div>
            </div>
          </div>
          <div class="upload-image" v-if="false">
            <div class="uploadImg domHover">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M21 15V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V15"
                  stroke="white"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M17 8L12 3L7 8"
                  stroke="white"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M12 3L12 15"
                  stroke="white"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
              <el-upload
                style="background: rgba(0, 0, 0, 0); height: 20px; border: 0px"
                class="menter-avatar-uploader yesUpload"
                :action="httpUrls.loginUrl + 'api/user/oss_upload'"
                :show-file-list="false"
                :data="requestData"
                :on-success="handleSuccess"
                :before-upload="beforeAvatarUpload"
                :on-change="handleUploadChange"
                :headers="headerData"
              >
                <div>上传图片</div>
              </el-upload>
            </div>
          </div>
        </div>
      </div>
      <div
        class="workspace_tips"
        v-if="
          chatList.length > 1 ||
          baiduList.length > 1 ||
          midjourneyList.length > 1 ||
          stableDiffusionList.length > 1 ||
          tonyiList.length > 1 ||
          huoshanList.length > 1 ||
          dellE3List.length > 1
        "
      >
        <div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
          >
            <path
              d="M6.8605 2.57347L1.21384 12.0001C1.09741 12.2018 1.03581 12.4303 1.03516 12.6631C1.03451 12.896 1.09483 13.1249 1.21012 13.3272C1.32541 13.5294 1.49165 13.698 1.69231 13.816C1.89296 13.9341 2.12103 13.9976 2.35384 14.0001H13.6472C13.88 13.9976 14.108 13.9341 14.3087 13.816C14.5094 13.698 14.6756 13.5294 14.7909 13.3272C14.9062 13.1249 14.9665 12.896 14.9658 12.6631C14.9652 12.4303 14.9036 12.2018 14.7872 12.0001L9.1405 2.57347C9.02165 2.37754 8.85432 2.21555 8.65463 2.10313C8.45495 1.9907 8.22966 1.93164 8.0005 1.93164C7.77135 1.93164 7.54606 1.9907 7.34637 2.10313C7.14669 2.21555 6.97935 2.37754 6.8605 2.57347Z"
              stroke="#666666"
              stroke-width="1.33333"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M8 6V8.66667"
              stroke="#666666"
              stroke-width="1.33333"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M8 11.334H8.00667"
              stroke="#666666"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </div>
        <span
          >当前内容为AI生成，不做任何决策使用！由此引发的一切后果，需自行承担，请知悉</span
        >
      </div>
      <div class="workspaceNew_bottom">
        <div>
          <div style="width: 200px">
            <div @click="handleSameStyle">
              <div
                style="
                  width: 32px;
                  height: 32px;
                  display: flex;
                  justify-content: center;
                  align-items: center;
                  border-radius: 5px;
                  background: #fff;
                  margin-right: 5px;
                "
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="25"
                  height="25"
                  viewBox="0 0 25 25"
                  fill="none"
                >
                  <rect
                    x="3"
                    y="7"
                    width="15"
                    height="15"
                    rx="1"
                    stroke="#1F64FF"
                    stroke-width="1.5"
                  />
                  <path
                    d="M20 18H21C21.5523 18 22 17.5523 22 17V4C22 3.44772 21.5523 3 21 3H8C7.44772 3 7 3.44772 7 4V5"
                    stroke="#1F64FF"
                    stroke-width="1.5"
                    stroke-linecap="round"
                  />
                </svg>
              </div>
              <div>做同款</div>
            </div>
            <div
              v-if="!createImgStatus"
              @click="handleHuan()"
            >
              <div
                style="
                  width: 32px;
                  height: 32px;
                  display: flex;
                  justify-content: center;
                  align-items: center;
                  border-radius: 5px;
                  background: #fff;
                  margin-right: 5px;
                "
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                >
                  <path
                    d="M3.20763 9.10481C3.25086 9.10481 3.29443 9.09897 3.33833 9.0873L5.8241 8.40513C6.09188 8.33132 6.25107 8.04912 6.17935 7.77412C6.1073 7.49947 5.83281 7.33811 5.56336 7.40987L4.24993 7.77069C5.2758 5.50791 7.49144 4.02994 9.97285 4.02994C13.0136 4.02994 15.6244 6.24912 16.1804 9.30667C16.2256 9.55455 16.4368 9.72723 16.6741 9.72723C16.7046 9.72723 16.7354 9.72483 16.7666 9.71865C17.0394 9.66681 17.2197 9.398 17.1687 9.1182C16.5239 5.57314 13.4976 3 9.97285 3C7.12748 3 4.58407 4.6764 3.37822 7.2516L2.98878 5.76162C2.91672 5.48697 2.64157 5.32561 2.37278 5.39736C2.10467 5.47117 1.94547 5.75338 2.01719 6.02837L2.72234 8.72339C2.78233 8.95341 2.98576 9.10481 3.20763 9.10481ZM17.9828 14.6592L17.2777 11.9645C17.2059 11.6902 16.9308 11.5285 16.662 11.6006L14.1762 12.2828C13.9081 12.3566 13.7489 12.6388 13.8206 12.9138C13.8927 13.1885 14.1675 13.3502 14.4366 13.2781L15.8396 12.8925C14.8934 15.3194 12.5575 16.9701 9.97285 16.9701C6.92136 16.9701 4.30925 14.742 3.76129 11.672C3.71135 11.3919 3.44826 11.2065 3.17646 11.258C2.90332 11.3092 2.72267 11.5773 2.77228 11.8571C3.40771 15.4166 6.43574 18 9.97285 18C12.8668 18 15.489 16.212 16.6526 13.5548L17.0116 14.926C17.0715 15.156 17.275 15.3077 17.4968 15.3077C17.5401 15.3077 17.5836 15.3019 17.6272 15.2902C17.8953 15.2164 18.0545 14.9342 17.9828 14.6592Z"
                    fill="#1F64FF"
                  />
                </svg>
              </div>
              <span>换一换</span>
            </div>
          </div>
          <div v-if="createImgStatus" class="img_tool">
            <div v-if="!is_likeOk" @click="showSetonHelpImg(1, false)">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
              >
                <g clip-path="url(#clip0_9743_32478)">
                  <path
                    d="M5.24974 8.24973L8.24974 1.49973C8.84647 1.49973 9.41877 1.73678 9.84073 2.15874C10.2627 2.5807 10.4997 3.15299 10.4997 3.74973L10.4997 6.74973L14.7447 6.74973C14.9622 6.74727 15.1775 6.79211 15.3759 6.88114C15.5743 6.97018 15.7509 7.10128 15.8936 7.26537C16.0363 7.42945 16.1416 7.6226 16.2022 7.83142C16.2629 8.04024 16.2774 8.25975 16.2447 8.47473L15.2097 15.2247C15.1555 15.5824 14.9738 15.9084 14.6982 16.1427C14.4225 16.377 14.0715 16.5038 13.7097 16.4997L5.24973 16.4997M5.24974 8.24973L5.24973 16.4997M5.24974 8.24973L3.24724 8.24973C2.82277 8.24222 2.41031 8.39083 2.08818 8.66734C1.76604 8.94386 1.55664 9.32902 1.49974 9.74973L1.49974 14.9997C1.55664 15.4204 1.76604 15.8056 2.08817 16.0821C2.41031 16.3586 2.82276 16.5072 3.24723 16.4997L5.24973 16.4997"
                    stroke="#1F64FF"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_9743_32478">
                    <rect
                      width="18"
                      height="18"
                      fill="white"
                      transform="translate(18 18) rotate(-180)"
                    />
                  </clipPath>
                </defs>
              </svg>
            </div>
            <div style="background: #1f64ff" @click="showSetonHelpImg(3, true)" v-else>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
              >
                <g clip-path="url(#clip0_9890_27678)">
                  <path
                    d="M5.24974 8.24973L8.24974 1.49973C8.84647 1.49973 9.41877 1.73678 9.84073 2.15874C10.2627 2.5807 10.4997 3.15299 10.4997 3.74973L10.4997 6.74973L14.7447 6.74973C14.9622 6.74727 15.1775 6.79211 15.3759 6.88114C15.5743 6.97018 15.7509 7.10128 15.8936 7.26537C16.0363 7.42945 16.1416 7.6226 16.2022 7.83142C16.2629 8.04024 16.2774 8.25975 16.2447 8.47473L15.2097 15.2247C15.1555 15.5824 14.9738 15.9084 14.6982 16.1427C14.4225 16.377 14.0715 16.5038 13.7097 16.4997L5.24973 16.4997M5.24974 8.24973L5.24973 16.4997M5.24974 8.24973L3.24724 8.24973C2.82277 8.24222 2.41031 8.39083 2.08818 8.66734C1.76604 8.94386 1.55664 9.32902 1.49974 9.74973L1.49974 14.9997C1.55664 15.4204 1.76604 15.8056 2.08817 16.0821C2.41031 16.3586 2.82276 16.5072 3.24723 16.4997L5.24973 16.4997"
                    stroke="white"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_9890_27678">
                    <rect
                      width="18"
                      height="18"
                      fill="white"
                      transform="translate(18 18) rotate(-180)"
                    />
                  </clipPath>
                </defs>
              </svg>
            </div>
            <div v-if="!is_likeNo" @click="showSetonHelpImg(2, true)">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
              >
                <g clip-path="url(#clip0_9743_32482)">
                  <path
                    d="M12.7561 9.75027L9.75613 16.5003C9.15939 16.5003 8.58709 16.2632 8.16514 15.8413C7.74318 15.4193 7.50613 14.847 7.50613 14.2503L7.50613 11.2503H3.26113C3.0437 11.2527 2.82833 11.2079 2.62995 11.1189C2.43157 11.0298 2.25492 10.8987 2.11223 10.7346C1.96955 10.5706 1.86425 10.3774 1.80362 10.1686C1.743 9.95976 1.7285 9.74025 1.76113 9.52527L2.79613 2.77527C2.85037 2.41759 3.03205 2.09157 3.3077 1.85727C3.58334 1.62297 3.93438 1.49618 4.29613 1.50027L12.7561 1.50027M12.7561 9.75027L12.7561 1.50027M12.7561 9.75027H14.7586C15.1831 9.75778 15.5955 9.60917 15.9177 9.33266C16.2398 9.05614 16.4492 8.67098 16.5061 8.25027V3.00027C16.4492 2.57957 16.2398 2.1944 15.9177 1.91789C15.5955 1.64137 15.1831 1.49276 14.7586 1.50027L12.7561 1.50027"
                    stroke="#1F64FF"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_9743_32482">
                    <rect width="18" height="18" fill="white" />
                  </clipPath>
                </defs>
              </svg>
            </div>
            <div style="background: #1f64ff" @click="showSetonHelpImg(3, true)" v-else>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
              >
                <g clip-path="url(#clip0_9890_27682)">
                  <path
                    d="M12.7561 9.75027L9.75613 16.5003C9.15939 16.5003 8.58709 16.2632 8.16514 15.8413C7.74318 15.4193 7.50613 14.847 7.50613 14.2503L7.50613 11.2503H3.26113C3.0437 11.2527 2.82833 11.2079 2.62995 11.1189C2.43157 11.0298 2.25492 10.8987 2.11223 10.7346C1.96955 10.5706 1.86425 10.3774 1.80362 10.1686C1.743 9.95976 1.7285 9.74025 1.76113 9.52527L2.79613 2.77527C2.85037 2.41759 3.03205 2.09157 3.3077 1.85727C3.58334 1.62297 3.93438 1.49618 4.29613 1.50027L12.7561 1.50027M12.7561 9.75027L12.7561 1.50027M12.7561 9.75027H14.7586C15.1831 9.75778 15.5955 9.60917 15.9177 9.33266C16.2398 9.05614 16.4492 8.67098 16.5061 8.25027V3.00027C16.4492 2.57957 16.2398 2.1944 15.9177 1.91789C15.5955 1.64137 15.1831 1.49276 14.7586 1.50027L12.7561 1.50027"
                    stroke="white"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_9890_27682">
                    <rect width="18" height="18" fill="white" />
                  </clipPath>
                </defs>
              </svg>
            </div>
            <div @click="downloadImgs()">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
              >
                <path
                  d="M15.75 11.25V14.25C15.75 14.6478 15.592 15.0294 15.3107 15.3107C15.0294 15.592 14.6478 15.75 14.25 15.75H3.75C3.35218 15.75 2.97064 15.592 2.68934 15.3107C2.40804 15.0294 2.25 14.6478 2.25 14.25V11.25"
                  stroke="#1F64FF"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M5.25 7.5L9 11.25L12.75 7.5"
                  stroke="#1F64FF"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M9 11.25V2.25"
                  stroke="#1F64FF"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </div>
          </div>
        </div>
        <div v-show="chat_type == 9">
          <div>
            <div>
              <span style="margin-right: 5px">无忧灵感改写</span>
            </div>
            <div>
              <span style="margin-right: 8px">{{
                chatTextStatus ? "已开启" : "已关闭"
              }}</span>
              <el-switch v-model="chatTextStatus"> </el-switch>
            </div>
          </div>
          <div v-show="chatTextStatus">
            你只需输入最关键主体，无需输入任何画风、修辞和艺术家等描述，我们将用无忧秘书AI自动优化您的绘画描述，实现更佳效果。
          </div>
        </div>
      </div>
      <!-- 用户输入区 -->
      <div class="user_input_area">
        <div class="title_area">
          <!-- <div> -->
          <div class="chat_cont">
            <span
              class="resetNewChat"
              @click="resetNewChat"
              v-if="startNewChatDALLE2 && chat_type == 2"
              >开启新绘画</span
            >
            <span
              style="
                color: #fff;
                background-color: #1f64ff;
                border-radius: 4px;
                padding: 5px 15px;
                cursor: pointer;
                line-height: 23px;
              "
              @click="resetNewChat"
              v-if="startNewChatBAIDU && chat_type == 3"
              >开启新绘画</span
            >
            <span
              class="resetNewChat"
              @click="resetNewChat"
              v-if="startNewChatMJ && chat_type == 6"
              >开启新绘画</span
            >
            <span
              class="resetNewChat"
              @click="resetNewChat"
              v-if="startNewChatstableDiffusion && chat_type == 9"
              >开启新绘画</span
            >
            <span
              class="resetNewChat"
              @click="resetNewChat"
              v-if="startNewChatTonyi && chat_type == 13"
              >开启新绘画</span
            >
            <span
              class="resetNewChat"
              @click="resetNewChat"
              v-if="startNewChatHuoshan && chat_type == 14"
              >开启新绘画</span
            >
            <span
              class="resetNewChat"
              @click="resetNewChat"
              v-if="startNewChatDellE3 && chat_type == 15"
              >开启新绘画</span
            >
            <span v-if="chat_type == 9" style="line-height: 30px"
              >排队人数：{{ SDWaitQueue || 0 }}人</span
            >
            <!-- <span v-if="chat_type == 6" style="margin-right: 10px; line-height: 30px">预计时间：{{ mjWaitQueue.time
              }}分钟</span> -->
            <span
              v-if="
                chat_type == 6 &&
                mjProgress != '' &&
                mjProgress != null &&
                mjProgress != '100'
              "
              style="line-height: 30px"
              >加载进度：{{ mjProgress }}%</span
            >
            <el-cascader
              v-if="$route.name != 'laboratoryDrawChat'"
              style="margin-left: 5px"
              size="small"
              v-model="chat_value"
              :options="options"
              @change="handleChange"
            >
            </el-cascader>
          </div>
          <!-- </div> -->
          <div class="share" @click="$router.push('/share/share')">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
            >
              <path
                d="M2.66602 8V13.3333C2.66602 13.687 2.80649 14.0261 3.05654 14.2761C3.30659 14.5262 3.64573 14.6667 3.99935 14.6667H11.9993C12.353 14.6667 12.6921 14.5262 12.9422 14.2761C13.1922 14.0261 13.3327 13.687 13.3327 13.3333V8"
                stroke="#1F64FF"
                stroke-width="1.33333"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M10.6673 3.9987L8.00065 1.33203L5.33398 3.9987"
                stroke="#1F64FF"
                stroke-width="1.33333"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M8 1.33203V9.9987"
                stroke="#1F64FF"
                stroke-width="1.33333"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
            <div>分享赚算力</div>
            <span style="line-height: 30px; margin-left: 10px; color: #999">{{
              priceToken
            }}</span>
          </div>
          <!-- <span>每张图消耗{{ chat_type == 6 ? 50 : chat_type == 9 ? 5 : chat_type == 15 ? 100 : 35 }}万算力</span> -->
        </div>
        <div class="input_area">
          <el-input
            class="user_btn"
            type="text"
            placeholder="在此输入您想了解的内容，Shift+Enter换行，Enter发送"
            v-model="sendValue"
            @keyup.enter.native="(event) => handleKeyUp(event)"
          ></el-input>
          <div>
            <el-button
              style="border: none; background-color: #1f64ff; color: #ffffff"
              @click="isBtn ? sendMsg(3) : sendMsg2(3)"
              >AI生成</el-button
            >
          </div>
        </div>
      </div>

      <!-- <div class="bottom_mask"></div> -->
    </div>

    <!-- 选项和记录 -->
    <div class="work_area" style="width: 20%; padding: 0px 20px">
      <div class="select_workspace">
        <div
          :class="selsectWorkSpaceRight == 3 ? 'item item-on' : 'item'"
          @click="showWorspaceOrHistory(3)"
        >
          案例
        </div>
        <div
          :class="selsectWorkSpaceRight == 4 ? 'item item-on' : 'item'"
          @click="showWorspaceOrHistory(4)"
        >
          历史记录
        </div>
      </div>
      <div class="remind" v-show="selsectWorkSpaceRight == 3">
        点击下方的图片，即可选用这张图所用的描述
      </div>
      <!-- 案例 -->
      <div class="history-list" id="history-list" v-if="selsectWorkSpaceRight == 3">
        <div class="mask" id="history-mask">
          <div
            v-for="(item, i) in qsList"
            :key="i"
            :class="exampleItem.pic_id == item.pic_id ? 'item item-on' : 'item'"
            @click="selectExampleItem(item, i)"
          >
            <img class="img" style="cursor: pointer" :src="item.pic_url" alt="" />
          </div>
        </div>
      </div>
      <!-- 历史记录 -->
      <div class="history-list" id="history-list" v-if="selsectWorkSpaceRight == 4">
        <div class="mask" id="history-mask">
          <div class="item" v-for="(item, i) in chatHistoryList" :key="i">
            <img
              class="img"
              :src="httpUrls.ossUrl + item.content"
              alt=""
              @click="getDrawDetail(item)"
            />
            <i class="el-icon-close del" @click="deleteDrawHistory(item, i)"></i>
          </div>
          <div class="noHistory" v-if="chatHistoryList.length == 0">暂无数据</div>
        </div>
      </div>
    </div>

    <el-dialog :visible.sync="dialogVisible" class="draw_image-class_dark">
      <img
        width="100%"
        :src="dialogImageUrl"
        style="max-height: 800px; min-height: 500px; cursor: zoom-out"
        alt=""
        @click="dialogVisible = false"
      />
    </el-dialog>
    <Register ref="Register"></Register>
    <pay ref="Pay"></pay>
  </div>
</template>

<script>
import httpUrls from "../../api/requestURL";
import {
  chatList,
  creatChat,
  chatDetail,
  chatDetailNew,
  creatDraw,
  baiduDraw,
  mjWaitingQuery,
  mjGetImageEnd,
  mjCreateImage,
  textTranslate,
  drawingSetRecommend,
  SDCreateImage,
  SDResultImage,
  getSDQueue,
  SDModel,
  drawChatHistroy,
  drawChatHistroyNew,
  ChatDelete,
  ChatDeleteNew,
  submitFootprint,
  deleteFootprint,
  chatCreateImage,
  newbaiduDrawDetail,
} from "../../api/chatMG";
import {
  recommend,
  chatLikes,
  chatLikesNew,
  getBaiduImage,
  baiduErnieImage,
} from "../../api/prompts";
import TemplateSelect from "../../components/dialog/templateSelect";
import Register from "../../components/register";
import rightNav from "../../components/rightNav";
import pay from "../../components/pay";
import { textDecoder, arr2str } from "../../utils/download";
import GoBackNew from "../../components/goBack";
import {
  base64toFile,
  urlToBase64,
  saveAndExport,
  beforeUpload,
} from "../../utils/download";

import { mapGetters } from "vuex";
import axios from "axios";

export default {
  name: "draw-chat",
  data() {
    return {
      blueprintReadingFile: {
        image: null,
        image_name: null,
        oss_dir: "static",
        cate: "AI_chat-picture",
      },
      cfg_scale: 7, //提示词相关
      steps: 20, //迭代次数/步数
      seed: -1, //随机种子
      chatTextStatus: false, //优化描述
      is_likeOk: false, //最新点赞选中状态
      is_likeNo: false, //最新取消点赞选中状态
      createImgStatus: false, //图片生成状态
      chatText: "",
      httpUrls,
      requestData: {
        image: null,
        image_name: null,
        oss_dir: "static",
        cate: "pc-draw_picture",
      },
      drawChatItem: {},
      uploadPictureUrl: "",
      dialogImageUrl: "",
      disabled: false,
      dialogVisible: false,
      chatHistoryList: [],
      exampleItem: {},
      examplet_time: null,
      exampleTime: 0,
      aiNameList: [
        { value: "9", label: "Stable Diffusion", size: "512*512" },
        { value: "3", label: "百度绘画", size: "1024*1024" },
        { value: "13", label: "通义万相", size: "1024*1024" },
        { value: "14", label: "火山引擎", size: "1024*1024" },
      ],
      chat_value: ["13"],

      options: [
        {
          value: "13",
          label: "通义万相",
        },
        {
          value: "3",
          label: "百度绘画",
        },
        {
          value: "14",
          label: "火山引擎",
        },
        // {
        //   value: "13",
        //   label: "通义万相",
        // },
        // {
        //   value: "15",
        //   label: "DALL.E-3",
        // },
      ],
      selsectWorkSpaceLeft: 2,
      selsectWorkSpaceRight: 3,
      imageToImage: 1, // 是否为图生图，1：否 2：是
      isBtn: true,
      showDrawImage: false,
      imagesSrc: "",
      chatType: true,
      chatType1: false,
      chatType2: false,
      chatType3: false,
      // action_type: '1',
      activeName: "0",
      chat_type: 13, // ai35: 0; ai40: 1; DALL·E 2：2; 百度绘画: 3
      sendValue: "",
      oldSendValue: "",
      isShow: false,

      percentageNumber: 0,

      isShowTemplateDALL: true,
      isShowTemplateBaidu: true,
      isShowTemplateMidJ: true,
      isShowTemplatestableDiffusion: true,
      isShowTemplateTonyi: true,
      isShowTemplateHuoshan: true,
      isShowTemplateDellE3: true,
      // isShowTemplateDellE2:true,
      isPay: true,
      reply: "",
      timer: 0,
      t_time: 0,

      isTimeDell: false,
      isTimeBaidu: false,
      isTimeMidjourney: false,
      isTimestableDiffusion: false,
      isTimeTonyi: false,
      isTimeHuoshan: false,
      isTimeDellE3: false,

      isfinish: false,
      isBtn: true, // 防止重新发送
      supplyVisible: false,
      supplyValue: "",
      isDetail: false,
      qsList: [],

      chatList: [], //dell2绘画内容
      baiduList: [], // 百度绘画内容
      midjourneyList: [], // midjourney内容
      stableDiffusionList: [], // Stable Diffusion内容
      tonyiList: [], //通义绘画内容
      tonyiTypeList: [
        {
          name: "默认",
          pic_url: "xcx/com/message_center/%E9%BB%98%E8%AE%A4.png",
          value: "<auto>",
        },
        {
          name: "扁平插画",
          pic_url: "xcx/com/message_center/%E6%89%81%E5%B9%B3%E6%8F%92%E7%94%BB.png",
          value: "<flat illustration>",
        },
        {
          name: "中国画",
          pic_url: "xcx/com/message_center/%E4%B8%AD%E5%9B%BD%E7%94%BB.png",
          value: "<chinese painting>",
        },
        {
          name: "素描",
          pic_url: "xcx/com/message_center/%E7%B4%A0%E6%8F%8F.png",
          value: "<sketch>",
        },
        {
          name: "水彩",
          pic_url: "xcx/com/message_center/%E6%B0%B4%E5%BD%A9.png",
          value: "<watercolor>",
        },
        {
          name: "油画",
          pic_url: "xcx/com/message_center/%E6%B2%B9%E7%94%BB.png",
          value: "<oil painting>",
        },
        {
          name: "动画",
          pic_url: "xcx/com/message_center/%E5%8A%A8%E7%94%BB.png",
          value: "<anime>",
        },
        {
          name: "3D卡通",
          pic_url: "xcx/com/message_center/3D%E5%8D%A1%E9%80%9A.png",
          value: "<3d cartoon>",
        },
        // {
        //   name: "人像写真",
        //   pic_url:
        //     "xcx/com/message_center/%E4%BA%BA%E5%83%8F%E5%86%99%E7%9C%9F.png",
        //   value: "<portrait>",
        // },
        // {
        //   name: "摄影",
        //   pic_url: "xcx/com/message_center/%E6%91%84%E5%BD%B1.png",
        //   value: "<photography>",
        // },
      ],
      huoshanList: [],
      huoshanTypeList: [
        {
          name: "立体风",
          pic_url: "xcx/com/message_center/%E7%AB%8B%E4%BD%93%E9%A3%8E.png",
          value: "cubism",
        },
        {
          name: "现代风",
          pic_url: "xcx/com/message_center/%E7%8E%B0%E4%BB%A3%E9%A3%8E.png",
          value: "contemporary",
        },
        {
          name: "卡通风",
          pic_url: "xcx/com/message_center/3D%E5%8D%A1%E9%80%9A.png",
          value: "cartoon",
        },
        {
          name: "铅笔画风",
          pic_url: "xcx/com/message_center/%E9%93%85%E7%AC%94%E7%94%BB%E9%A3%8E.png",
          value: "pencil",
        },
      ],
      dellE3List: [],
      dellE3TypeList: [
        {
          name: "生动的",
          pic_url: "xcx/com/message_center/%E7%AB%8B%E4%BD%93%E9%A3%8E.png",
          value: "vivid",
        },
        {
          name: "自然的",
          pic_url: "xcx/com/message_center/%E7%AB%8B%E4%BD%93%E9%A3%8E.png",
          value: "natural",
        },
      ],
      bdTypeList: [
        {
          name: "探索无限",
          pic_url: "xcx/com/message_center/%E6%8E%A2%E7%B4%A2%E6%97%A0%E9%99%90.png",
          value: "探索无限",
        },
        {
          name: "古风",
          pic_url: "xcx/com/message_center/%E5%8F%A4%E9%A3%8E.png",
          value: "古风",
        },
        {
          name: "二次元",
          pic_url: "xcx/com/message_center/%E4%BA%8C%E6%AC%A1%E5%85%83.png",
          value: "二次元",
        },
        {
          name: "浮世绘",
          pic_url: "xcx/com/message_center/%E6%B5%AE%E4%B8%96%E7%BB%98.png",
          value: "浮世绘",
        },
        {
          name: "low poly",
          pic_url: "xcx/com/message_center/low%20polw.png",
          value: "low poly",
        },
        {
          name: "未来主义",
          pic_url: "xcx/com/message_center/%E6%9C%AA%E6%9D%A5%E4%B8%BB%E4%B9%89.png",
          value: "未来主义",
        },
        {
          name: "概念艺术",
          pic_url: "xcx/com/message_center/%E6%A6%82%E5%BF%B5%E8%89%BA%E6%9C%AF.png",
          value: "概念艺术",
        },
        {
          name: "像素风格",
          pic_url: "xcx/com/message_center/%E5%83%8F%E7%B4%A0%E9%A3%8E%E6%A0%BC.png",
          value: "像素风格",
        },
        {
          name: "赛博朋克",
          pic_url: "xcx/com/message_center/%E8%B5%9B%E5%8D%9A%E6%9C%8B%E5%85%8B.png",
          value: "赛博朋克",
        },
        {
          name: "洛丽塔风格",
          pic_url: "xcx/com/message_center/%E6%B4%9B%E4%B8%BD%E5%A1%94.png",
          value: "洛丽塔风格",
        },
        {
          name: "巴洛克风格",
          pic_url: "xcx/com/message_center/%E5%B7%B4%E6%B4%9B%E5%85%8B.png",
          value: "巴洛克风格",
        },
        {
          name: "超现实主义",
          pic_url:
            "xcx/com/message_center/%E8%B6%85%E7%8E%B0%E5%AE%9E%E4%B8%BB%E4%B9%89.png",
          value: "超现实主义",
        },
        {
          name: "水彩画",
          pic_url: "xcx/com/message_center/%E6%B0%B4%E5%BD%A9%E7%94%BB.png",
          value: "水彩画",
        },
        {
          name: "蒸汽波艺术",
          pic_url:
            "xcx/com/message_center/%E8%92%B8%E6%B1%BD%E6%B3%A2%E8%89%BA%E6%9C%AF.png",
          value: "蒸汽波艺术",
        },
        {
          name: "油画",
          pic_url: "xcx/com/message_center/%E6%B2%B9%E7%94%BB.png",
          value: "油画",
        },
        {
          name: "卡通画",
          pic_url: "xcx/com/message_center/%E5%8D%A1%E9%80%9A%E7%94%BB.png",
          value: "卡通画",
        },
      ],

      isuser: true, //使用次数是否用完
      AIname: 2,
      userTextarea: "",
      isShowHelpImg: false,
      isShowStepOnImg: false,
      isShowTemplateSelte: false,
      textAreaLength: 900,
      association: "", // 是否关联上下文
      isShowassociation: false,
      isShowChecked: false,
      ordeAIList: [], // 关联上下文的列表
      sizeRadio: "512*512", // 绘画尺寸
      sizeRadio2: "",
      dialogTitleVisible: false,
      drawDialogRadio: "",
      drawSizeListOne: [
        {
          id: "256x256",
          size: "256x256",
          width: "42px",
          height: "42px",
        },
        {
          id: "512x512",
          size: "512x512",
          width: "42px",
          height: "42px",
        },
        {
          id: "1024x1024",
          size: "1024x1024",
          width: "42px",
          height: "42px",
        },
      ],
      drawSizeListTwo: [
        {
          id: "1024*1024",
          size: "1024*1024",
          width: "42px",
          height: "42px",
        },
        {
          id: "1024*1536",
          size: "1024*1536",
          width: "30px",
          height: "45px",
        },
        {
          id: "1536*1024",
          size: "1536*1024",
          width: "45px",
          height: "30px",
        },
      ],
      drawSizeListThree: [
        {
          id: "1:1",
          size: "1:1",
          width: "42px",
          height: "42px",
        },
        {
          id: "4:3",
          size: "4:3",
        },
        {
          id: "3:4",
          size: "3:4",
          width: "30px",
          height: "40px",
        },
        {
          id: "16:9",
          size: "16:9",
          width: "48px",
          height: "27px",
        },
        {
          id: "9:16",
          size: "9:16",
          width: "27px",
          height: "48px",
        },
      ],
      drawSizeListFour: [
        {
          id: "512*512",
          size: "512*512",
          width: "42px",
          height: "42px",
        },
        {
          id: "512*768",
          size: "512*768",
          width: "30px",
          height: "45px",
        },
        {
          id: "768*512",
          size: "768*512",
          width: "45px",
          height: "30px",
        },
        // ,{
        //     id: '640*640',
        //     size: '640*640'
        // }
      ],
      //通义万相尺寸
      drawSizeListFive: [
        {
          id: "1024*1024",
          size: "1024*1024",
          width: "45px",
          height: "45px",
        },
        {
          id: "720*1280",
          size: "720*1280",
          width: "30px",
          height: "45px",
        },
        {
          id: "1280*720",
          size: "1280*720",
          width: "45px",
          height: "30px",
        },
      ],
      drawSizeListSix: [
        {
          id: "1024x1024",
          size: "1024x1024",
          width: "30px",
          height: "30px",
        },
        {
          id: "1024x1792",
          size: "1024x1792",
          width: "30px",
          height: "45px",
        },
        {
          id: "1792x1024",
          size: "1792x1024",
          width: "45px",
          height: "30px",
        },
      ],
      samplerIndex: "Euler a",
      samplerIndexArr: [
        { value: "Euler a", label: "Euler a" },
        { value: "Euler", label: "Euler" },
        { value: "LMS", label: "LMS" },
        { value: "LMS Karras", label: "LMS Karras" },
        { value: "DDIM", label: "DDIM" },
        { value: "Heun", label: "Heun" },
        { value: "DPM fast", label: "DPM fast" },
        { value: "DPM adaptive", label: "DPM adaptive" },
        { value: "DPM2", label: "DPM2" },
        { value: "DPM2 aDPM2 Karras", label: "DPM2 aDPM2 Karras" },
        { value: "DPM2 a Karras", label: "DPM2 a Karras" },
        { value: "DPM++ 2S a", label: "DPM++ 2S a" },
        { value: "DPM++ 2M", label: "DPM++ 2M" },
        { value: "DPM++ SDE", label: "DPM++ SDE" },
        { value: "DPM++ 2S a Karras", label: "DPM++ 2S a Karras" },
        { value: "DPM++ 2M Karras", label: "DPM++ 2M Karras" },
        { value: "DPM++ SDE Karras", label: "DPM++ SDE Karras" },
        { value: "DPM++ 2M SDE Karras", label: "DPM++ 2M SDE Karras" },
      ],
      SDWaitQueue: 0,
      SDValue: "",
      SDModel: [],
      drawTextarea: "",
      actionType: 3, // 是否为图文生图 3：文字；5：图文生图
      updataRightList: 2,
      sessionRightNavCode: "",
      imgUrl: {},
      loginInfo: null,
      isClickChat: false, // 点击了历史会话
      randomStr: 0, // 随机数，用于刷新历史会话
      queryErrorMsg: "",
      mjImageStyle: false, // mj绘画风格
      mjWaitQueue: {},
      mjProgress: "",

      startNewChatDALLE2: false, // 开启新会话DELL·E2
      startNewChatBAIDU: false, // 开启新会话百度绘画
      startNewChatMJ: false, // 开启新会话MJ
      startNewChatstableDiffusion: false, // 开启新会话MJ
      startNewChatTonyi: false, //开启新会话ty
      startNewChatHuoshan: false, //开启新会话火山
      startNewChatDellE3: false, //开启新会话dellE3
      page_size: 30,
      page: 1,

      headerData: {}
    };
  },
  computed: {
    ...mapGetters(["isShowNotice"]),
    priceToken() {
      //图片价格
      let text = "4800算力/张图";
      switch (this.chat_type) {
        case "3":
          text = "9009算力/张图";
          break;
        case "6":
          text = "16854算力/张图";
          break;
        case "9":
          text = "4800算力/张图";
          break;
        case "13":
          text = "4800算力/张图";
          break;
        case "14":
          text = "1800算力/张图";
          break;
        case "15":
          text = "8400算力/张图";
          break;
        default:
          break;
      }
      return text;
    },
  },
  components: {
    pay,
    Register,
    GoBackNew,
  },

  watch: {
    isTimestableDiffusion: {
      deep: true,
      handler() {
        console.log(
          this.isTimestableDiffusion,
          this.stableDiffusionList.length,
          "发生改变"
        );
      },
    },
    $route: {
      deep: true,
      handler() {
        this.aiNameList =
          this.$route.name == "laboratoryDrawChat"
            ? [
                { value: "9", label: "Stable Diffusion", size: "512*512" },
                { value: "6", label: "Midjourney", size: "1:1" }, //mj绘画
                { value: "15", label: "DALL.E-3", size: "1024x1024" },
              ]
            : this.aiNameList;

        if(this.$route.name == "laboratoryDrawChat"){
          this.chat_type = this.$route.query.value;
        }
      },
    },
    chat_type: {
      deep: true,
      handler() {
        if (this.chat_type == 9) {
          this.chatTextStatus = true;
        } else {
          this.chatTextStatus = false;
          this.selsectWorkSpaceLeft = 1;
          this.imageToImage = 1;
        }
        if (this.chat_type == 2) {
          this.textAreaLength == 900;
          if (!this.$route.params.sendMsg && this.isBtn) {
            this.isTimeDell = false;
          }
          this.$store.dispatch("user/changeChatListLength", this.chatList.length);
        } else if (this.chat_type == 3) {
          if (!this.$route.params.sendMsg && this.isBtn) {
            this.isTimeBaidu = false;
          }
          this.textAreaLength == 2000;
          this.$store.dispatch("user/changeChatListLength", this.baiduList.length);
          this.sizeRadio = "1024*1024";
          this.SDValue = "探索无限";
        } else if (this.chat_type == 6) {
          this.mjImageStyle = false;
          if (!this.$route.params.sendMsg && this.isBtn) {
            this.isTimeMidjourney = false;
          }
          this.textAreaLength == 2000;
          this.$store.dispatch("user/changeChatListLength", this.midjourneyList.length);
          this.sizeRadio = "1:1";
          // mjWaitingQuery().then((res) => {
          //   console.log(res, "AI绘画1155");
          //   if (res.code != 20000) {
          //     this.$message.error("网络异常");
          //     return;
          //   }
          //   this.mjWaitQueue = {
          //     people: res.data.data,
          //     time: ((res.data.data * 30) / 2).toFixed(0),
          //   };
          // });
        } else if (this.chat_type == 9) {
          if (!this.$route.params.sendMsg && this.isBtn) {
            this.isTimestableDiffusion = false;
          }
          this.sizeRadio = "512*512";
          this.SDValue = "sd_xl_base_1.0";
          this.textAreaLength == 2000;
          this.$store.dispatch(
            "user/changeChatListLength",
            this.stableDiffusionList.length
          );
          getSDQueue().then((res) => {
            this.SDWaitQueue = res.data.message_count;
          });
        } else if (this.chat_type == 13) {
          if (!this.$route.params.sendMsg && this.isBtn) {
            this.isTimeTonyi = false;
          }
          this.textAreaLength == 2000;
          this.$store.dispatch("user/changeChatListLength", this.tonyiList.length);
          this.sizeRadio = "1024*1024";
          this.SDValue = "<auto>";
        } else if (this.chat_type == 14) {
          if (!this.$route.params.sendMsg && this.isBtn) {
            this.isTimeHuoshan = false;
          }
          this.textAreaLength == 2000;
          this.$store.dispatch("user/changeChatListLength", this.huoshanList.length);
          this.SDValue = "cubism";
          this.sizeRadio = "1024*1024";
        } else if (this.chat_type == 15) {
          if (!this.$route.params.sendMsg && this.isBtn) {
            this.isTimeDellE3 = false;
          }
          this.textAreaLength == 2000;
          this.$store.dispatch("user/changeChatListLength", this.dellE3List.length);
        }
        switch (this.chat_type) {
          case "9":
            this.chat_value = ["9"];
            break;
          case "13":
            this.chat_value = ["13"];
            break;
          case "3":
            this.chat_value = ["3"];
            break;
          case "14":
            this.chat_value = ["14"];
            break;
          case "6":
            this.chat_value = ["6"];
            break;
          case "15":
            this.chat_value = ["15"];
            break;
          default:
            break;
        }
        this.isuser = true;
        this.drawTextarea = "";
        this.$store.dispatch("id/setAIChatname", this.chat_type);
        this.updataRightList = Number(this.chat_type);
        this.page = 1;
        this.getChatList("aiId");
      },
    },
    association: {
      deep: true,
      handler() {
        if (this.association == "1") {
          this.isShowChecked = true;
        } else {
          this.isShowChecked = false;
        }
      },
    },
    chatList: {
      deep: true,
      handler() {
        if (this.chatList.length == 0) {
          this.startNewChatDALLE2 = false;
        } else {
          this.startNewChatDALLE2 = true;
        }
      },
    },
    baiduList: {
      deep: true,
      handler() {
        if (this.baiduList.length == 0) {
          this.startNewChatBAIDU = false;
        } else {
          this.startNewChatBAIDU = true;
        }
      },
    },
    midjourneyList: {
      deep: true,
      handler() {
        if (this.midjourneyList.length == 0) {
          this.startNewChatMJ = false;
        } else {
          this.startNewChatMJ = true;
        }
      },
    },
    stableDiffusionList: {
      deep: true,
      handler() {
        if (this.stableDiffusionList.length == 0) {
          this.startNewChatstableDiffusion = false;
        } else {
          this.startNewChatstableDiffusion = true;
        }
      },
    },
    tonyiList: {
      deep: true,
      handler() {
        if (this.tonyiList.length == 0) {
          this.startNewChatTonyi = false;
        } else {
          this.startNewChatTonyi = true;
        }
      },
    },
    huoshanList: {
      deep: true,
      handler() {
        if (this.huoshanList.length == 0) {
          this.startNewChatHuoshan = false;
        } else {
          this.startNewChatHuoshan = true;
        }
      },
    },
    dellE3List: {
      deep: true,
      handler() {
        if (this.dellE3List.length == 0) {
          this.startNewChatDellE3 = false;
        } else {
          this.startNewChatDellE3 = true;
        }
      },
    },
  },

  created() {
    let userInfo = JSON.parse(localStorage.getItem("userInfo"));
    this.headerData.authorization = userInfo.token
    this.headerData.role = userInfo.role
    this.aiNameList =
      this.$route.name == "laboratoryDrawChat"
        ? [
            { value: "9", label: "Stable Diffusion", size: "512*512" },
            { value: "6", label: "Midjourney", size: "1:1" }, //mj绘画
            { value: "15", label: "DALL.E-3", size: "1024x1024" },
          ]
        : this.aiNameList;
    if (
      this.$route.path == "/chataboratory/laboratoryDrawChat" &&
      this.$route.query.value
    ) {
      this.chat_type = this.$route.query.value;
    } else if (this.$route.path == "/chataboratory/laboratoryDrawChat") {
      this.chat_type = "9";
    } else if (this.$route.path == "/drawChat/drawChat" && this.$route.query.value) {
      this.chat_type = this.$route.query.value;
    }
    getSDQueue().then((res) => {
      this.SDWaitQueue = res.data.message_count;
    });
    this.loginInfo = JSON.parse(localStorage.getItem("userInfo"));
    this.$root.Bus.$on("selectChat", (value) => {
      // 接收点击相应会话标识
      this.chatList = [];
      this.$store.dispatch("user/changeChatListLength", this.chatList.length);
      this.baiduList = [];
      this.$store.dispatch("user/changeChatListLength", this.baiduList.length);
      this.midjourneyList = [];
      this.$store.dispatch("user/changeChatListLength", this.midjourneyList.length);
      this.stableDiffusionList = [];
      this.$store.dispatch("user/changeChatListLength", this.stableDiffusionList.length);
      this.huoshanList = [];
      this.$store.dispatch("user/changeChatListLength", this.huoshanList.length);
      this.tonyiList = [];
      this.$store.dispatch("user/changeChatListLength", this.tonyiList.length);
      this.dellE3List = [];
      this.$store.dispatch("user/changeChatListLength", this.dellE3List.length);
      this.sendValue = "";
      this.getDetail(value);
    });

    this.$root.Bus.$on("delChat", (value) => {
      // 清空历史会话
      this.chatList = [];
      this.$store.dispatch("user/changeChatListLength", this.chatList.length);
      this.baiduList = [];
      this.$store.dispatch("user/changeChatListLength", this.baiduList.length);
      this.midjourneyList = [];
      this.$store.dispatch("user/changeChatListLength", this.midjourneyList.length);
      this.stableDiffusionList = [];
      this.$store.dispatch("user/changeChatListLength", this.stableDiffusionList.length);
      this.huoshanList = [];
      this.$store.dispatch("user/changeChatListLength", this.huoshanList.length);
      this.tonyiList = [];
      this.$store.dispatch("user/changeChatListLength", this.tonyiList.length);
      this.dellE3List = [];
      this.$store.dispatch("user/changeChatListLength", this.dellE3List.length);
      if (this.chat_type == 2) {
        this.isTimeDell = false;
      } else {
        this.isTimeBaidu = false;
      }
    });
    localStorage.setItem("session_code2", "");
    localStorage.setItem("session_code3", "");
    localStorage.setItem("session_code6", "");
    localStorage.setItem("session_code9", "");
    this.drawingSetRecommend();
    this.updataRightList = this.chat_type;

    SDModel().then((res) => {
      if (this.chat_type == 3) {
        this.SDValue = "探索无限";
      } else if (this.chat_type == 13) {
        this.SDValue = "<auto>";
      } else if (this.chat_type == 14) {
        this.SDValue = "cubism";
      } else {
        this.SDValue = res.data[0].value;
      }
      this.SDModel = res.data;
    });
    if (this.$route.params.speakId != undefined && this.$route.params.id != undefined) {
      this.AIname = this.$route.params.id;
      this.chat_type = this.$route.params.id;
      this.getDetail(this.$route.params.speakId);
      this.selsectWorkSpace = 2;
    }
    if (this.chat_type == 9) {
      this.chatTextStatus = true;
    }
    this.getChatList();
  },

  mounted() {
    // document.title =
    //   "AI绘画-能根据用户的文本描述生成图像-是一款人工智能生成器-" + httpUrls.name;
    // let metaKeywords = document.createElement("meta");
    // metaKeywords.id = "chat-meta-keywords";
    // metaKeywords.name = "keywords";
    // metaKeywords.content = "AI绘画,DALL-E 2,百度绘画,人工智能艺术生成器,AI文本生成图像";
    // document.getElementsByTagName("head")[0].appendChild(metaKeywords);

    // let metaDescription = document.createElement("meta");
    // metaDescription.id = "chat-meta-description";
    // metaDescription.name = "description";
    // metaDescription.content =
    //   httpUrls.name +
    //   "的AI绘画功能,接入的是openai的文本生成图像系统DALL·E 2,和百度绘画系统的功能,能为人类增强视觉艺术和创造力,任何人都可以使用这个人工智能艺术生成器.";
    // document.getElementsByTagName("head")[0].appendChild(metaDescription);
    if (this.$route.query.item != undefined) {
      this.sendValue = this.$route.query.item;
    }

    if (this.$route.params.item != undefined) {
      this.sendValue = this.$route.params.item;
      this.chat_type = Number(this.$route.params.id);
      this.AIname = Number(this.$route.params.id);
      this.sizeRadio = this.$route.params.size;
      if (this.$route.params.sendMsg) {
        this.sendMsg();
      }
    }
    if (this.$route.params.id != undefined && this.$route.params.code != undefined) {
      this.getDetail(this.$route.params.code);
      this.AIname = this.$route.params.id;
      this.chat_type = this.$route.params.id;
    }
    if (this.$route.query.id != undefined) {
      let aiN = this.$route.query.id;
      if (Number(aiN) != 2 && Number(aiN) != 3 && Number(aiN) != 6) {
        aiN = 2;
      }
      this.AIname = aiN;
      this.chat_type = aiN;
    }
    this.sizeRadioInit();
    this.$nextTick(() => {
      let historyList = document.getElementById("history-list");
      let historyMask = document.getElementById("history-mask");
      historyList.addEventListener("scroll", (e) => {
        if (e.target.scrollTop + e.target.offsetHeight >= historyMask.offsetHeight) {
          console.log("进入nextTick");
          this.getChatList("gundong");
        }
      });
    });
  },

  beforeDestroy() {
    // document.getElementById("chat-meta-keywords").remove();
    // document.getElementById("chat-meta-description").remove();
  },

  methods: {
    //键盘按下事件
    handleKeyUp(event){
      if (event.shiftKey && event.keyCode === 13) {
        // 按下 Shift+Enter，换行
        console.log('换行')
      } else if (event.keyCode === 13) {
        // 按下 Enter，发送
        // 在这里添加你的发送逻辑
        if(this.isBtn){
          this.sendMsg(3)
        }else{
          sendMsg2(3)
        }
      }
    },
    handleHuan(){
      let mathNumber = Math.floor(Math.random() * this.qsList.length);
      this.exampleItem = this.qsList[mathNumber];
    },
    // 尺寸初始化
    sizeRadioInit() {
      let chat_type = this.chat_type;
      if (chat_type == 13) {
        this.sizeRadio = "1024*1024";
      }
    },
    handleChangeFile(file, fileList) {
      this.blueprintReadingFile.image = file.raw;
      this.blueprintReadingFile.image_name = file.name;
    },
    handleSuccessFile(response, file, fileList) {
      this.uploadPictureUrl = response.data.new_url;
    },
    //级联改变
    handleChange(val) {
      this.chat_type = val[0];
      let mathNumber = Math.floor(Math.random() * this.qsList.length);
      this.exampleItem = this.qsList[mathNumber];
      this.chatText = "";
      this.resetNewChat();
      // console.log(this.chat_type)
    },
    //做同款
    handleSameStyle() {
      let text; //文本
      console.log(this.chatList.length)
      console.log(this.baiduList.length)
      console.log(this.midjourneyList.length)
      console.log(this.stableDiffusionList.length)
      console.log(this.tonyiList.length)
      console.log(this.huoshanList.length)
      console.log(this.dellE3List.length)

      if (
        this.chatList.length > 1 ||
        this.baiduList.length > 1 ||
        this.midjourneyList.length > 1 ||
        this.stableDiffusionList.length > 1 ||
        this.tonyiList.length > 1 ||
        this.huoshanList.length > 1 ||
        this.dellE3List.length > 1
      ) {
        switch (this.chat_type) {
          case 3:
            //百度绘画
            text = this.baiduList;
            break;
          case 6:
            //mj绘画
            text = this.midjourneyList;
            break;
          case 9:
            //sd绘画
            text = this.stableDiffusionList[0];
            break;
          case 13:
            // 通义万相
            text = this.tonyiList;
            break;
          case 14:
            // 火山绘画
            text = this.huoshanList;
            break;
          case 15:
            //dell3
            text = this.dellE3TypeList;
            break;

          default:
            break;
        }
        this.sendValue = text[0].prompt ? text[0].prompt : text[0].content;
      } else {
        this.sendValue = this.exampleItem.pic_desc;
      }
    },
    // 选择工作区或者历史记录
    showWorspaceOrHistory(type) {
      if (type <= 2) {
        this.selsectWorkSpaceLeft = type;
      } else {
        this.selsectWorkSpaceRight = type;
      }
      // this.selsectWorkSpace = type
      if (type == 4) {
        this.page = 1;
        console.log("触发历史记录");
        this.getChatList("aiId");
      }
    },

    // 点击示例
    selectExampleItem(item, i) {
      this.exampleItem = item;
      this.sendValue = item.pic_desc;
      clearInterval(this.examplet_time);
      this.examplet_time = null;
      this.chatList = [];
      this.baiduList = [];
      this.midjourneyList = [];
      this.stableDiffusionList = [];
      this.tonyiList = [];
      this.huoshanList = [];
      this.dellE3List = [];
      this.createImgStatus = false;
      // setTimeout(() => {
      //   this.exampleTime = i;
      //   this.examplet_time = setInterval(() => {
      //     this.exampleTime++;
      //     if (this.exampleTime >= this.qsList.length) {
      //       this.exampleTime = 0;
      //     }
      //     this.exampleItem = this.qsList[this.exampleTime];
      //   }, 10000);
      // }, 5 * 60000);
    },

    // 切换模型
    selectAIname(chatType) {
      this.chat_type = chatType.value;
      this.imageToImage = 1;
      this.exampleItem = this.qsList[0];
      this.sizeRadio = chatType.size;
      this.isuser = true;
      this.page = 1;
      this.getChatList("aiId");
      if (chatType.value == 15) {
        this.SDValue = this.dellE3TypeList[0].value;
      }
      if (chatType.value == 9 && this.stableDiffusionList.length == 1) {
        this.stableDiffusionList = [];
      } else if (chatType.value == 6 && this.midjourneyList.length == 1) {
        this.midjourneyList = [];
      } else if (chatType.value == 3 && this.baiduList.length == 1) {
        this.baiduList = [];
      } else if (chatType.value == 13 && this.tonyiList.length == 1) {
        this.tonyiList = [];
      } else if (chatType.value == 14 && this.huoshanList.length == 1) {
        this.huoshanList = [];
      } else if (chatType.value == 15 && this.dellE3List.length == 1) {
        this.dellE3List = [];
      }
    },

    // 点赞点踩
    showSetonHelpImg(num, bool) {
      let item;
      switch (this.chat_type) {
        case 2:
          item = this.chatList[1];
          break;
        case 3:
          item = this.baiduList[1];
          break;
        case 6:
          item = this.midjourneyList[1];
          break;
        case 9:
          item = this.stableDiffusionList[1];
          break;
        case 13:
          item = this.tonyiList[1];
          break;
        case 14:
          item = this.huoshanList[1];
          break;
        case 15:
          item = this.dellE3List[1];
          break;
        default:
          break;
      }
      if (!bool && num % 2 != 0) {
        this.is_likeOk = true;
        this.is_likeNo = false;
        //点赞
        if (this.chat_type != 13 && this.chat_type != 14 && this.chat_type != 9) {
          chatLikes({
            is_likes: 1,
            session_code: item.session_code,
            chat_group_code: item.chat_group_code,
          });
        } else {
          chatLikesNew({
            is_likes: 1,
            msg_code: item.msg_code,
          });
        }
      } else if (bool && num % 2 == 0) {
        this.is_likeNo = true;
        this.is_likeOk = false;
        //取消点赞
        if (this.chat_type != 13 && this.chat_type != 14 && this.chat_type != 9) {
          chatLikes({
            is_likes: 2,
            session_code: item.session_code,
            chat_group_code: item.chat_group_code,
          });
        } else {
          chatLikesNew({
            is_likes: 2,
            msg_code: item.msg_code,
          });
        }
      } else {
        //取消状态
        this.is_likeOk = false;
        this.is_likeNo = false;
        if (this.chat_type != 13 && this.chat_type != 14 && this.chat_type != 9) {
          chatLikes({
            is_likes: 0,
            session_code: item.session_code,
            chat_group_code: item.chat_group_code,
          });
        } else {
          chatLikesNew({
            is_likes: 0,
            msg_code: item.msg_code,
          });
        }
      }
      return;
      if (num % 2 != 0) {
        // GPT35 赞
        if (this.chat_type == 2) {
          for (let i = 0; i < this.chatList.length; i++) {
            if (
              this.chatList[i].session_code == item.session_code &&
              this.chatList[i].chat_group_code == item.chat_group_code
            ) {
              this.chatList[i].help = false;
              this.chatList[i].stepOn = false;
              this.chatList[i].help = bool;
              this.chatList[i].is_likes = bool ? 1 : 0;
            }
          }
        } else if (this.chat_type == 3) {
          for (let i = 0; i < this.baiduList.length; i++) {
            if (
              this.baiduList[i].session_code == item.session_code &&
              this.baiduList[i].chat_group_code == item.chat_group_code
            ) {
              this.baiduList[i].help = false;
              this.baiduList[i].stepOn = false;
              this.baiduList[i].help = bool;
              this.baiduList[i].is_likes = bool ? 1 : 0;
            }
          }
        } else if (this.chat_type == 6) {
          for (let i = 0; i < this.midjourneyList.length; i++) {
            if (
              this.midjourneyList[i].session_code == item.session_code &&
              this.midjourneyList[i].chat_group_code == item.chat_group_code
            ) {
              this.midjourneyList[i].help = false;
              this.midjourneyList[i].stepOn = false;
              this.midjourneyList[i].help = bool;
              this.midjourneyList[i].is_likes = bool ? 1 : 0;
            }
          }
        } else if (this.chat_type == 9) {
          for (let i = 0; i < this.stableDiffusionList.length; i++) {
            if (
              this.stableDiffusionList[i].session_code == item.session_code &&
              this.stableDiffusionList[i].chat_group_code == item.chat_group_code
            ) {
              this.stableDiffusionList[i].help = false;
              this.stableDiffusionList[i].stepOn = false;
              this.stableDiffusionList[i].help = bool;
              this.stableDiffusionList[i].is_likes = bool ? 1 : 0;
            }
          }
        } else if (this.chat_type == 13) {
          for (let i = 0; i < this.tonyiList.length; i++) {
            if (
              this.tonyiList[i].session_code == item.session_code &&
              this.tonyiList[i].chat_group_code == item.chat_group_code
            ) {
              this.tonyiList[i].help = false;
              this.tonyiList[i].stepOn = false;
              this.tonyiList[i].help = bool;
              this.tonyiList[i].is_likes = bool ? 1 : 0;
            }
          }
        } else if (this.chat_type == 14) {
          for (let i = 0; i < this.huoshanList.length; i++) {
            if (
              this.huoshanList[i].session_code == item.session_code &&
              this.huoshanList[i].chat_group_code == item.chat_group_code
            ) {
              this.huoshanList[i].help = false;
              this.huoshanList[i].stepOn = false;
              this.huoshanList[i].help = bool;
              this.huoshanList[i].is_likes = bool ? 1 : 0;
            }
          }
        } else if (this.chat_type == 15) {
          for (let i = 0; i < this.dellE3List.length; i++) {
            if (
              this.dellE3List[i].session_code == item.session_code &&
              this.dellE3List[i].chat_group_code == item.chat_group_code
            ) {
              this.dellE3List[i].help = false;
              this.dellE3List[i].stepOn = false;
              this.dellE3List[i].help = bool;
              this.dellE3List[i].is_likes = bool ? 1 : 0;
            }
          }
        }
      } else if (num % 2 == 0) {
        // GPT35 踩
        if (this.chat_type == 2) {
          for (let i = 0; i < this.chatList.length; i++) {
            if (
              this.chatList[i].session_code == item.session_code &&
              this.chatList[i].chat_group_code == item.chat_group_code
            ) {
              this.chatList[i].help = false;
              this.chatList[i].stepOn = false;
              this.chatList[i].stepOn = bool;
              this.chatList[i].is_likes = bool ? 1 : 0;
            }
          }
        } else if (this.chat_type == 3) {
          for (let i = 0; i < this.baiduList.length; i++) {
            if (
              this.baiduList[i].session_code == item.session_code &&
              this.baiduList[i].chat_group_code == item.chat_group_code
            ) {
              this.baiduList[i].help = false;
              this.baiduList[i].stepOn = false;
              this.baiduList[i].stepOn = bool;
              this.baiduList[i].is_likes = bool ? 1 : 0;
            }
          }
        } else if (this.chat_type == 6) {
          for (let i = 0; i < this.midjourneyList.length; i++) {
            if (
              this.midjourneyList[i].session_code == item.session_code &&
              this.midjourneyList[i].chat_group_code == item.chat_group_code
            ) {
              this.midjourneyList[i].help = false;
              this.midjourneyList[i].stepOn = false;
              this.midjourneyList[i].stepOn = bool;
              this.midjourneyList[i].is_likes = bool ? 1 : 0;
            }
          }
        } else if (this.chat_type == 9) {
          for (let i = 0; i < this.stableDiffusionList.length; i++) {
            if (
              this.stableDiffusionList[i].session_code == item.session_code &&
              this.stableDiffusionList[i].chat_group_code == item.chat_group_code
            ) {
              this.stableDiffusionList[i].help = false;
              this.stableDiffusionList[i].stepOn = false;
              this.stableDiffusionList[i].stepOn = bool;
              this.stableDiffusionList[i].is_likes = bool ? 1 : 0;
            }
          }
        } else if (this.chat_type == 13) {
          for (let i = 0; i < this.tonyiList.length; i++) {
            if (
              this.tonyiList[i].session_code == item.session_code &&
              this.tonyiList[i].chat_group_code == item.chat_group_code
            ) {
              this.tonyiList[i].help = false;
              this.tonyiList[i].stepOn = false;
              this.tonyiList[i].stepOn = bool;
              this.tonyiList[i].is_likes = bool ? 1 : 0;
            }
          }
        } else if (this.chat_type == 14) {
          for (let i = 0; i < this.huoshanList.length; i++) {
            if (
              this.huoshanList[i].session_code == item.session_code &&
              this.huoshanList[i].chat_group_code == item.chat_group_code
            ) {
              this.huoshanList[i].help = false;
              this.huoshanList[i].stepOn = false;
              this.huoshanList[i].stepOn = bool;
              this.huoshanList[i].is_likes = bool ? 1 : 0;
            }
          }
        } else if (this.chat_type == 15) {
          for (let i = 0; i < this.dellE3List.length; i++) {
            if (
              this.dellE3List[i].session_code == item.session_code &&
              this.dellE3List[i].chat_group_code == item.chat_group_code
            ) {
              this.dellE3List[i].help = false;
              this.dellE3List[i].stepOn = false;
              this.dellE3List[i].stepOn = bool;
              this.dellE3List[i].is_likes = bool ? 1 : 0;
            }
          }
        }
      }
    },

    // 下载
    downloadImgs() {
      let url = "";
      let item;
      switch (this.chat_type) {
        case 2:
          item = this.chatList[1];
          break;
        case 3:
          item = this.baiduList[1];
          break;
        case 6:
          item = this.midjourneyList[1];
          break;
        case 9:
          item = this.stableDiffusionList[1];
          break;
        case 13:
          item = this.tonyiList[1];
          break;
        case 14:
          item = this.huoshanList[1];
          break;
        case 15:
          item = this.dellE3List[1];
          break;
        default:
          break;
      }
      if (this.chat_type == 2) {
        if (item.isShowOldChat) {
          url = httpUrls.ossUrl + item.image_urls[0].sso_url;
        } else {
          url = httpUrls.ossUrl + item.image_urls[0].url;
        }
      } else if (this.chat_type == 3) {
        url = httpUrls.ossUrl + item.image_urls[0].url;
      } else if (this.chat_type == 6) {
        url = httpUrls.ossUrl + item.image_urls[0].url;
      } else if (this.chat_type == 9) {
        url = httpUrls.ossUrl + item.image_urls[0].url;
      } else if (this.chat_type == 13) {
        url = httpUrls.ossUrl + item.image_urls[0].url;
      } else if (this.chat_type == 14) {
        url = httpUrls.ossUrl + item.image_urls[0].url;
      }
      let canvas = document.createElement("canvas"),
        ctx = canvas.getContext("2d"),
        img = new Image();
      img.crossOrigin = "*"; //解决Canvas.toDataURL 图片跨域问题
      img.onload = () => {
        canvas.height = img.height;
        canvas.width = img.width;
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        let ext = img.src.substring(img.src.lastIndexOf(".") + 1).toLowerCase(); // 获取到图片的格式
        let dataURL = canvas.toDataURL("image/" + ext); // 得到base64 编码的 dataURL
        var a = document.createElement("a"); // 生成一个a元素
        var event = new MouseEvent("click"); // 创建一个单击事件
        a.download = "photo.png"; // 设置图片名称
        a.href = dataURL; // 将生成的URL设置为a.href属性
        a.dispatchEvent(event); // 触发a的单击事件
        canvas = null;
      };
      img.src = url;
    },

    //发送信息
    async sendMsg(type = 3) {
      // this.drawTextarea = ''
      this.isClickChat = false;
      this.actionType = type;
      this.loginInfo = JSON.parse(localStorage.getItem("userInfo"));
      if (this.actionType == 3) {
        // 原图
        if (this.sendValue == "" || this.sendValue.replace(/\s*/g, "") == "") {
          this.$message({
            type: "error",
            message: "请输入您要发送内容",
          });
          return false;
        }
        if (this.sendValue.length < 1) {
          this.$message({
            type: "error",
            message: "输入绘画内容不能少于1个字！",
          });
          return;
        }
        if (this.sizeRadio == "") {
          this.$message({
            type: "error",
            message: "请选择图片尺寸！",
          });
          return;
        }
      } else {
        // 图文生图
        if (this.drawTextarea == "" || this.drawTextarea.replace(/\s*/g, "") == "") {
          this.$message({
            type: "error",
            message: "请输入您要发送内容",
          });
          return false;
        }
        if (this.drawTextarea.length < 1) {
          this.$message({
            type: "error",
            message: "输入绘画内容不能少于1个字！",
          });
          return;
        }
      }

      if (this.imageToImage == 2 && this.uploadPictureUrl == "") {
        this.$message.error("请上传一张图片");
        return;
      }
      this.mjProgress = "";
      this.percentageNumber = 0;
      this.oldSendValue = this.sendValue;
      clearInterval(this.examplet_time);

      if (this.chatTextStatus) {
        this.exampleItem = "";
        this.isBtn = false;
        //   let sendVal = {
        //   // 询问者问题展示
        //   finish_reason: "length",
        //   session_code: "",
        //   chat_group_code: "",
        //   role: "user",
        //   content: this.sendValue,
        //   checked: false,
        //   help: false,
        //   stepOn: false,
        //   timer: false,
        //   isShowOldChat: true,
        // };
        // this.stableDiffusionList.push(sendVal);
        if (this.chat_type == 2) {
          this.isTimeDell = true;
        } else if (this.chat_type == 3) {
          this.isTimeBaidu = true;
        } else if (this.chat_type == 6) {
          this.isTimeMidjourney = true;
        } else if (this.chat_type == 9) {
          this.isTimestableDiffusion = true;
        } else if (this.chat_type == 13) {
          this.isTimeTonyi = true;
        } else if (this.chat_type == 14) {
          this.isTimeHuoshan == true;
        }

        this.timer = 0;
        this.t_time = setInterval(() => {
          this.timer += 1;
          if (Number((Math.random() * 10).toFixed(0)) % 2 == 0) {
            let num = Number((Math.random() * 10).toFixed(0));
            this.percentageNumber =
              this.percentageNumber + num >= 97 ? 97 : this.percentageNumber + num;
          }
        }, 1000);
        let val = {
          chat_type: 8,
          session_code: localStorage.getItem("session_code") || "",
          chat_group_code: "",
          msg_list: JSON.stringify([
            {
              role: "user",
              content: `
              # Stable Diffusion prompt 助理

你来充当一位有艺术气息的Stable Diffusion prompt 助理。

## 任务

我用自然语言告诉你要生成的prompt的主题，你的任务是根据这个主题想象一幅完整的画面，然后转化成一份详细的、高质量的prompt，让Stable Diffusion可以生成高质量的图像。

## 背景介绍

Stable Diffusion是一款利用深度学习的文生图模型，支持通过使用 prompt 来产生新的图像，描述要包含或省略的元素。

## prompt 概念

- 完整的prompt包含“**Prompt:**”这单一部分。
- prompt 用来描述图像，由普通常见的单词构成，使用英文半角","做为分隔符。
- 以","分隔的每个单词或词组称为 tag。所以prompt是由系列由","分隔的tag组成的。

## () 和 [] 语法

调整关键字强度的等效方法是使用 () 和 []。 (keyword) 将tag的强度增加 1.1 倍，与 (keyword:1.1) 相同，最多可加三层。 [keyword] 将强度降低 0.9 倍，与 (keyword:0.9) 相同。

## Prompt 格式要求

下面我将说明 prompt 的生成步骤，这里的 prompt 可用于描述人物、风景、物体或抽象数字艺术图画。你可以根据需要添加合理的、但不少于5处的画面细节。

### 1. prompt 要求

- 你输出的 Stable Diffusion prompt 以“**Prompt:**”开头。
- prompt 内容包含画面主体、材质、附加细节、图像质量、艺术风格、色彩色调、灯光等部分，但你输出的 prompt 不能分段，例如类似"medium:"这样的分段描述是不需要的，也不能包含":"和"."。
- 画面主体：不简短的英文描述画面主体, 如 A girl in a garden，主体细节概括（主体可以是人、事、物、景）画面核心内容。这部分根据我每次给你的主题来生成。你可以添加更多主题相关的合理的细节。
- 对于人物主题，你必须描述人物的眼睛、鼻子、嘴唇，例如'beautiful detailed eyes,beautiful detailed lips,extremely detailed eyes and face,longeyelashes'，以免Stable Diffusion随机生成变形的面部五官，这点非常重要。你还可以描述人物的外表、情绪、衣服、姿势、视角、动作、背景等。人物属性中，1girl表示一个女孩，2girls表示两个女孩。
- 材质：用来制作艺术品的材料。 例如：插图、油画、3D 渲染和摄影。 Medium 有很强的效果，因为一个关键字就可以极大地改变风格。
- 附加细节：画面场景细节，或人物细节，描述画面细节内容，让图像看起来更充实和合理。这部分是可选的，要注意画面的整体和谐，不能与主题冲突。
- 图像质量：这部分内容开头永远要加上“(best quality,4k,8k,highres,masterpiece:1.2),ultra-detailed,(realistic,photorealistic,photo-realistic:1.37)”， 这是高质量的标志。其它常用的提高质量的tag还有，你可以根据主题的需求添加：HDR,UHD,studio lighting,ultra-fine painting,sharp focus,physically-based rendering,extreme detail description,professional,vivid colors,bokeh。
- 艺术风格：这部分描述图像的风格。加入恰当的艺术风格，能提升生成的图像效果。常用的艺术风格例如：portraits,landscape,horror,anime,sci-fi,photography,concept artists等。
- 色彩色调：颜色，通过添加颜色来控制画面的整体颜色。
- 灯光：整体画面的光线效果。



### 2. 限制：
- tag 内容用英语单词或短语来描述，并不局限于我给你的单词。注意只能包含关键词或词组。
- 注意不要输出句子，不要有任何解释。
- tag数量限制40个以内，单词数量限制在60个以内。
- tag不要带引号("")。
- 使用英文半角","做分隔符。
- tag 按重要性从高到低的顺序排列。
- 我给你的主题可能是用中文描述，你给出的prompt只用英文。
- 直接输出prompt内容，不要带任何前缀和标题（包括"prompt:"）
我的第一个主题是： ${this.sendValue}
              `,
              images: [],
            },
          ]),
        };
        if (this.loginInfo.role == "guess") {
          this.$refs.Register.registerVisible = true;
          return;
        }
        let response = null;
        let url = "api/chat/async_chat_completion";
        let controllerChat = new AbortController();
        let userInfo = JSON.parse(localStorage.getItem("userInfo"));
        val.model = "chatglm_pro"; //传递子模型
        response = await fetch(httpUrls.httpUrl + url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "*/*",
            authorization: userInfo.token,
            role: userInfo.role,
            source: "pc",
          },
          body: JSON.stringify(val),
          signal: controllerChat.signal,
        });
        const reader = response.body.getReader();
        while (true) {
          const { value, done } = await reader.read();
          if (done) {
            break;
          }
          if (value) {
            let stringStr = arr2str(value);
            let chatArr = stringStr.split("\r\n");
            // 信息清空
            chatArr.forEach((val, index) => {
              if (val != "") {
                let res = JSON.parse(val);
                this.talkMsgList(res);
                return;
              }
            });
          }
        }
        return;
      }

      if (this.chat_type == 2) {
        this.chatList = [];
        this.isShowTemplateDALL = false;
        this.dellSend();
      }

      if (this.chat_type == 3) {
        this.baiduList = [];
        this.isShowTemplateBaidu = false;
        this.baiduSend();
      }

      if (this.chat_type == 6) {
        this.midjourneyList = [];
        this.isShowTemplateMidJ = false;
        this.midjourneySend();
      }

      if (this.chat_type == 9) {
        this.stableDiffusionList = [];
        this.isShowTemplatestableDiffusion = false;
        this.stableDiffusionSend();
      }
      if (this.chat_type == 13) {
        this.tonyiList = [];
        this.tonyiSend(); //绘画方法
        this.isShowTemplateTonyi = false; //没有
      }

      if (this.chat_type == 14) {
        this.huoshanList = [];
        this.huoshanSend(); //绘画方法
        this.isShowTemplateHuoshan = false;
      }
      if (this.chat_type == 15) {
        this.dellE3List = [];
        this.dellE3Send(); //绘画方法
        this.isShowTemplateDellE3 = false;
      }
    },

    //处理AI返回的文本
    talkMsgList(res) {
      if (res.finish_reason == "stop") {
        if (this.chat_type == 2) {
          this.chatList = [];
          this.isShowTemplateDALL = false;
          this.dellSend();
        }

        if (this.chat_type == 3) {
          this.baiduList = [];
          this.isShowTemplateBaidu = false;
          this.baiduSend();
        }

        if (this.chat_type == 6) {
          this.midjourneyList = [];
          this.isShowTemplateMidJ = false;
          this.midjourneySend();
        }

        if (this.chat_type == 9) {
          this.stableDiffusionList = [];
          this.isShowTemplatestableDiffusion = false;
          this.stableDiffusionSend();
        }
        if (this.chat_type == 13) {
          this.tonyiList = [];
          this.tonyiSend(); //绘画方法
          this.isShowTemplateTonyi = false; //没有
        }

        if (this.chat_type == 14) {
          this.huoshanList = [];
          this.huoshanSend(); //绘画方法
          this.isShowTemplateHuoshan = false;
        }
        if (this.chat_type == 15) {
          this.dellE3List = [];
          this.dellE3Send(); //绘画方法
          this.isShowTemplateDellE3 = false;
        }
      } else {
        this.chatText = this.chatText + res.content;
      }
    },

    sendMsg2() {
      this.$message({
        type: "info",
        message: "当前问题还没回答完毕，请稍后再提问！",
      });
    },

    // 通义绘画方法
    tonyiSend() {
      this.isShowassociation = false;
      this.isShowChecked = false;
      this.tonyiList.forEach((v) => {
        v.checked = false;
      });
      this.isDetail = false;
      this.isShow = true; // 快速提问
      this.isfinish = false; // 完成打字效果
      this.isBtn = false; // 是否允许重发

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
      if (month < 10) {
        month = "0" + month;
      }
      if (day < 10) {
        day = "0" + day;
      }
      if (hour < 10) {
        hour = "0" + hour;
      }
      if (minute < 10) {
        minute = "0" + minute;
      }
      if (second < 10) {
        second = "0" + second;
      }

      let date = month + "/" + day + " " + hour + "-" + minute + "-" + second;

      let sendVal = {
        // 询问者问题展示
        create_time: date,
        finish_reason: "length",
        session_code: "",
        chat_group_code: "",
        role: "user",
        content: this.sendValue,
        checked: false,
        help: false,
        stepOn: false,
        timer: false,
        isShowOldChat: true,
      };

      this.tonyiList.push(sendVal);
      this.$store.dispatch("user/changeChatListLength", this.tonyiList.length);
      // this.toBottom();

      if (this.chat_type == 2) {
        this.isTimeDell = true;
      } else if (this.chat_type == 3) {
        this.isTimeBaidu = true;
      } else if (this.chat_type == 6) {
        this.isTimeMidjourney = true;
      } else if (this.chat_type == 9) {
        this.isTimestableDiffusion = true;
      } else if (this.chat_type == 13) {
        this.isTimeTonyi = true;
      } else if (this.chat_type == 14) {
        this.isTimeHuoshan = true;
      }

      this.timer = 0;
      this.t_time = setInterval(() => {
        this.timer += 1;
        if (Number((Math.random() * 10).toFixed(0)) % 2 == 0) {
          let num = Number((Math.random() * 10).toFixed(0));
          this.percentageNumber =
            this.percentageNumber + num >= 97 ? 97 : this.percentageNumber + num;
        }
      }, 1000);

      let data = new FormData();

      // 构建请求参数
      data = {
        prompt: this.chatTextStatus ? this.chatText : this.sendValue, //提示文字
        chat_type: this.chat_type + "", //# 类型必传 13
        negative_prompt: this.drawTextarea, // # 反向提示词非必传
        size: this.sizeRadio ? this.sizeRadio : "1024*1024", // # 生成图像的分辨率，目前仅支持'1024*1024', '720*1280', '1280*720'三种分辨率，
        n: 1, //# 张数默认1
        style: this.SDValue == "sd_xl_base_1.0" ? "<auto>" : this.SDValue, // # 风格
        quality: "standard", //# 标准 可选standard，hd。 默认传standard，chat_type=15传
        action_type: 3,
      };
      this.sendValue = "";
      this.drawTextarea = "";

      sessionStorage.setItem("sizeRadio13", this.sizeRadio);
      if (this.chat_type == 13) {
        // SD
        this.sizeRadio = "1024*1024";
        chatCreateImage(data).then((res) => {
          if (res.code == 20000) {
            this.tonyiDrawImage(res.data);
          } else if (res.code == 50001) {
            this.$message.error("网络超时！请稍后重试");
            this.isuser = true;
            this.isBtn = true;
            this.percentageNumber = 99;
            this.randomStr = Math.random();
            this.tonyiList = [];
            this.$store.dispatch("user/changeChatListLength", this.tonyiList.length);
            this.isTimeBaidu = false;
            clearInterval(this.t_time);
          } else {
            this.$message.error("网络超时！请稍后重试");
            this.isuser = true;
            this.isBtn = true;
            this.percentageNumber = 99;
            this.randomStr = Math.random();
            this.tonyiList = [];
            this.$store.dispatch("user/changeChatListLength", this.tonyiList.length);
            this.isTimeBaidu = false;
          }
        });
      }
    },

    //通义万相绘画图片
    tonyiDrawImage(data) {
      setTimeout(() => {
        this.isuser = true;
        // val.data[0].create_time = val.data[0].create_time.replace(/-/g, "/");
        // val.data[0].create_time = val.data[0].create_time.slice(5);
        // val.data[0].checked = false;
        let img_urls = [];
        let url_val = { url: data.results[0].result_image };
        img_urls.push(url_val);
        let obj = {
          // "create_time": val.data[0].create_time,
          finish_reason: "stop",
          session_code: data.image_code,
          chat_group_code: data.image_code,
          size: data.results[0].size,
          role: data.results[0].role,
          image_urls: img_urls,
          url_base: null,
          help: false,
          stepOn: false,
          isShowOldChat: true,
          timer: this.timer,
          is_mod: 0,
        };
        // if (!this.isClickChat) {
        this.tonyiList.push(obj);
        this.percentageNumber = 99;
        clearInterval(this.t_time);
        this.createImgStatus = true;
        // }
        this.randomStr = Math.random();
        this.$store.dispatch("user/changeChatListLength", this.tonyiList.length);
        this.isBtn = true;
        if (this.chat_type == 2) {
          this.isTimeDell = false;
        } else if (this.chat_type == 3) {
          this.isTimeBaidu = false;
        } else if (this.chat_type == 6) {
          this.isTimeMidjourney = false;
        } else if (this.chat_type == 9) {
          this.isTimestableDiffusion = false;
        } else if (this.chat_type == 13) {
          this.isTimeTonyi = false;
        } else if (this.chat_type == 14) {
          this.isTimeHuoshan = false;
        }
      }, 500);
      // 保存最近使用
      submitFootprint({
        type_name: "通义万相",
        type_code: "image",
        image_url: data.results[0].result_image,
        title: this.oldSendValue,
        eid: data.image_code,
      }).then((res) => {});
      this.getChatList();
    },
    baiduSend() {
      this.isShowassociation = false;
      this.isShowChecked = false;
      this.huoshanList.forEach((v) => {
        v.checked = false;
      });
      this.isDetail = false;
      this.isShow = true; // 快速提问
      this.isfinish = false; // 完成打字效果
      this.isBtn = false; // 是否允许重发

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
      if (month < 10) {
        month = "0" + month;
      }
      if (day < 10) {
        day = "0" + day;
      }
      if (hour < 10) {
        hour = "0" + hour;
      }
      if (minute < 10) {
        minute = "0" + minute;
      }
      if (second < 10) {
        second = "0" + second;
      }

      let date = month + "/" + day + " " + hour + "-" + minute + "-" + second;

      let sendVal = {
        // 询问者问题展示
        create_time: date,
        finish_reason: "length",
        session_code: "",
        chat_group_code: "",
        role: "user",
        content: this.sendValue,
        checked: false,
        help: false,
        stepOn: false,
        timer: false,
        isShowOldChat: true,
      };

      this.baiduList.push(sendVal);
      this.$store.dispatch("user/changeChatListLength", this.baiduList.length);
      // this.toBottom();

      if (this.chat_type == 2) {
        this.isTimeDell = true;
      } else if (this.chat_type == 3) {
        this.isTimeBaidu = true;
      } else if (this.chat_type == 6) {
        this.isTimeMidjourney = true;
      } else if (this.chat_type == 9) {
        this.isTimestableDiffusion = true;
      } else if (this.chat_type == 13) {
        this.isTimeTonyi = true;
      } else if (this.chat_type == 14) {
        this.isTimeHuoshan = true;
      }

      this.timer = 0;
      this.t_time = setInterval(() => {
        this.timer += 1;
        if (Number((Math.random() * 10).toFixed(0)) % 2 == 0) {
          let num = Number((Math.random() * 10).toFixed(0));
          this.percentageNumber =
            this.percentageNumber + num >= 97 ? 97 : this.percentageNumber + num;
        }
      }, 1000);

      let data = new FormData();

      // 构建请求参数
      data = {
        prompt: this.chatTextStatus ? this.chatText : this.sendValue, //提示文字
        chat_type: this.chat_type + "", //# 类型必传 13
        negative_prompt: this.drawTextarea, // # 反向提示词非必传
        size: this.sizeRadio, // # 生成图像的分辨率，目前仅支持'1024*1024', '720*1280', '1280*720'三种分辨率，
        n: 1, //# 张数默认1
        style: this.SDValue == "sd_xl_base_1.0" ? "" : this.SDValue, // # 风格
        quality: "standard", //# 标准 可选standard，hd。 默认传standard，chat_type=15传
        action_type: 3,
        model: "txt2img",
      };

      this.sendValue = "";
      this.drawTextarea = "";
      sessionStorage.setItem("sizeRadio3", this.sizeRadio);
      if (this.chat_type == 3) {
        // SD
        this.sizeRadio = "1024*1024";
        baiduDraw(data).then((res) => {
          if (res.code == 20000) {
            let resData = `task_id=${res.data.task_id}`;
            this.baiduDrawImage(resData);
          } else if (res.code == 50001 || res.code == 50000) {
            this.$message.error("网络超时！请稍后重试");
            this.isuser = true;
            this.isBtn = true;
            this.percentageNumber = 99;
            this.randomStr = Math.random();
            this.baiduList = [];
            this.$store.dispatch("user/changeChatListLength", this.baiduList.length);
            this.isTimeBaidu = false;
            clearInterval(this.t_time);
          }
        });
      }
    },
    baiduDrawImage(data) {
      let resData = data;
      newbaiduDrawDetail(resData).then((res) => {
        if (res.data != null) {
          setTimeout(() => {
            this.isuser = true;
            let img_urls = [];
            let url_val = { url: res.data[0].result_image };
            img_urls.push(url_val);
            let obj = {
              // "create_time": val.data[0].create_time,
              finish_reason: "stop",
              session_code: res.data[0].image_code,
              chat_group_code: res.data[0].image_code,
              size: res.data[0].size,
              role: res.data[0].role,
              image_urls: img_urls,
              url_base: null,
              help: false,
              stepOn: false,
              isShowOldChat: true,
              timer: this.timer,
              is_mod: 0,
            };
            this.baiduList.push(obj);
            this.percentageNumber = 99;
            clearInterval(this.t_time);
            this.createImgStatus = true;
            this.randomStr = Math.random();
            this.$store.dispatch("user/changeChatListLength", this.baiduList.length);
            this.isBtn = true;
            if (this.chat_type == 2) {
              this.isTimeDell = false;
            } else if (this.chat_type == 3) {
              this.isTimeBaidu = false;
            } else if (this.chat_type == 6) {
              this.isTimeMidjourney = false;
            } else if (this.chat_type == 9) {
              this.isTimestableDiffusion = false;
            } else if (this.chat_type == 13) {
              this.isTimeTonyi = false;
            } else if (this.chat_type == 14) {
              this.isTimeHuoshan = false;
            }
          }, 500);
          // 保存最近使用
          submitFootprint({
            type_name: "百度绘画",
            type_code: "image",
            image_url: res.data[0].result_image,
            title: this.oldSendValue,
            eid: res.data[0].image_code,
          }).then((res) => {});
          this.getChatList();
          return;
        } else {
          setTimeout(() => {
            this.baiduDrawImage(resData);
          }, 1500);
        }
      });
    },

    //火山绘画方法
    huoshanSend() {
      this.isShowassociation = false;
      this.isShowChecked = false;
      this.huoshanList.forEach((v) => {
        v.checked = false;
      });
      this.isDetail = false;
      this.isShow = true; // 快速提问
      this.isfinish = false; // 完成打字效果
      this.isBtn = false; // 是否允许重发

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
      if (month < 10) {
        month = "0" + month;
      }
      if (day < 10) {
        day = "0" + day;
      }
      if (hour < 10) {
        hour = "0" + hour;
      }
      if (minute < 10) {
        minute = "0" + minute;
      }
      if (second < 10) {
        second = "0" + second;
      }

      let date = month + "/" + day + " " + hour + "-" + minute + "-" + second;

      let sendVal = {
        // 询问者问题展示
        create_time: date,
        finish_reason: "length",
        session_code: "",
        chat_group_code: "",
        role: "user",
        content: this.sendValue,
        checked: false,
        help: false,
        stepOn: false,
        timer: false,
        isShowOldChat: true,
      };

      this.huoshanList.push(sendVal);
      this.$store.dispatch("user/changeChatListLength", this.huoshanList.length);
      // this.toBottom();

      if (this.chat_type == 2) {
        this.isTimeDell = true;
      } else if (this.chat_type == 3) {
        this.isTimeBaidu = true;
      } else if (this.chat_type == 6) {
        this.isTimeMidjourney = true;
      } else if (this.chat_type == 9) {
        this.isTimestableDiffusion = true;
      } else if (this.chat_type == 13) {
        this.isTimeTonyi = true;
      } else if (this.chat_type == 14) {
        this.isTimeHuoshan = true;
      }

      this.timer = 0;
      this.t_time = setInterval(() => {
        this.timer += 1;
        if (Number((Math.random() * 10).toFixed(0)) % 2 == 0) {
          let num = Number((Math.random() * 10).toFixed(0));
          this.percentageNumber =
            this.percentageNumber + num >= 97 ? 97 : this.percentageNumber + num;
        }
      }, 1000);

      let data = new FormData();

      // 构建请求参数
      data = {
        prompt: this.chatTextStatus ? this.chatText : this.sendValue, //提示文字
        chat_type: this.chat_type + "", //# 类型必传 13
        negative_prompt: this.drawTextarea, // # 反向提示词非必传
        size: this.sizeRadio, // # 生成图像的分辨率，目前仅支持'1024*1024', '720*1280', '1280*720'三种分辨率，
        n: 1, //# 张数默认1
        style: this.SDValue == "sd_xl_base_1.0" ? "" : this.SDValue, // # 风格
        quality: "standard", //# 标准 可选standard，hd。 默认传standard，chat_type=15传
        action_type: 3,
        model: "t2i_ldm",
      };

      this.sendValue = "";
      this.drawTextarea = "";
      sessionStorage.setItem("sizeRadio14", this.sizeRadio);
      if (this.chat_type == 14) {
        // SD
        this.sizeRadio = "1024*1024";
        chatCreateImage(data).then((res) => {
          if (res.code == 20000) {
            this.huoshanDrawImage(res.data);
          } else if (res.code == 50001) {
            this.$message.error("网络超时！请稍后重试");
            this.isuser = true;
            this.isBtn = true;
            this.percentageNumber = 99;
            this.randomStr = Math.random();
            this.huoshanList = [];
            this.$store.dispatch("user/changeChatListLength", this.huoshanList.length);
            this.isTimeBaidu = false;
            clearInterval(this.t_time);
          }
        });
      }
    },

    //火山引擎绘画图片
    huoshanDrawImage(data) {
      setTimeout(() => {
        this.isuser = true;
        // val.data[0].create_time = val.data[0].create_time.replace(/-/g, "/");
        // val.data[0].create_time = val.data[0].create_time.slice(5);
        // val.data[0].checked = false;
        let img_urls = [];
        let url_val = { url: data.results[0].result_image };
        img_urls.push(url_val);
        let obj = {
          // "create_time": val.data[0].create_time,
          finish_reason: "stop",
          session_code: data.image_code,
          chat_group_code: data.image_code,
          size: data.results[0].size,
          role: data.results[0].role,
          image_urls: img_urls,
          url_base: null,
          help: false,
          stepOn: false,
          isShowOldChat: true,
          timer: this.timer,
          is_mod: 0,
        };
        this.huoshanList.push(obj);
        this.percentageNumber = 99;
        this.createImgStatus = true;
        clearInterval(this.t_time);
        this.randomStr = Math.random();
        this.$store.dispatch("user/changeChatListLength", this.huoshanList.length);
        this.isBtn = true;
        if (this.chat_type == 2) {
          this.isTimeDell = false;
        } else if (this.chat_type == 3) {
          this.isTimeBaidu = false;
        } else if (this.chat_type == 6) {
          this.isTimeMidjourney = false;
        } else if (this.chat_type == 9) {
          this.isTimestableDiffusion = false;
        } else if (this.chat_type == 13) {
          this.isTimeTonyi = false;
        } else if (this.chat_type == 14) {
          this.isTimeHuoshan = false;
        }
      }, 500);
      // 保存最近使用
      submitFootprint({
        type_name: "火山引擎",
        type_code: "image",
        image_url: data.results[0].results_image,
        title: this.oldSendValue,
        eid: data.image_code,
      }).then((res) => {});
      this.getChatList();
    },

    //dellE3
    dellE3Send() {
      this.isShowassociation = false;
      this.isShowChecked = false;
      this.dellE3List.forEach((v) => {
        v.checked = false;
      });
      this.isDetail = false;
      this.isShow = true; // 快速提问
      this.isfinish = false; // 完成打字效果
      this.isBtn = false; // 是否允许重发

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
      if (month < 10) {
        month = "0" + month;
      }
      if (day < 10) {
        day = "0" + day;
      }
      if (hour < 10) {
        hour = "0" + hour;
      }
      if (minute < 10) {
        minute = "0" + minute;
      }
      if (second < 10) {
        second = "0" + second;
      }

      let date = month + "/" + day + " " + hour + "-" + minute + "-" + second;

      let sendVal = {
        // 询问者问题展示
        create_time: date,
        finish_reason: "length",
        session_code: "",
        chat_group_code: "",
        role: "user",
        content: this.sendValue,
        checked: false,
        help: false,
        stepOn: false,
        timer: false,
        isShowOldChat: true,
      };

      this.dellE3List.push(sendVal);
      this.$store.dispatch("user/changeChatListLength", this.dellE3List.length);
      // this.toBottom();

      if (this.chat_type == 2) {
        this.isTimeDell = true;
      } else if (this.chat_type == 3) {
        this.isTimeBaidu = true;
      } else if (this.chat_type == 6) {
        this.isTimeMidjourney = true;
      } else if (this.chat_type == 9) {
        this.isTimestableDiffusion = true;
      } else if (this.chat_type == 13) {
        this.isTimeTonyi = true;
      } else if (this.chat_type == 14) {
        this.isTimeHuoshan = true;
      } else if (this.chat_type == 15) {
        this.isTimeDellE3 = true;
      }

      this.timer = 0;
      this.t_time = setInterval(() => {
        this.timer += 1;
        if (Number((Math.random() * 10).toFixed(0)) % 2 == 0) {
          let num = Number((Math.random() * 10).toFixed(0));
          this.percentageNumber =
            this.percentageNumber + num >= 97 ? 97 : this.percentageNumber + num;
        }
      }, 1000);

      let data = new FormData();

      // 构建请求参数
      data = {
        prompt: this.chatTextStatus ? this.chatText : this.sendValue, //提示文字
        chat_type: this.chat_type + "", //# 类型必传 13
        negative_prompt: this.drawTextarea, // # 反向提示词非必传
        size: this.sizeRadio, // # 生成图像的分辨率，目前仅支持'1024*1024', '720*1280', '1280*720'三种分辨率，
        n: 1, //# 张数默认1
        style: this.SDValue == "sd_xl_base_1.0" ? "" : this.SDValue, // # 风格
        quality: "standard", //# 标准 可选standard，hd。 默认传standard，chat_type=15传
        action_type: 3,
      };

      this.sendValue = "";
      this.drawTextarea = "";
      sessionStorage.setItem("sizeRadio15", this.sizeRadio);
      let v = data.size;
      if (this.chat_type == 15) {
        this.sizeRadio = "1024x1024";
        chatCreateImage(data)
          .then((res) => {
            if (res.code == 20000) {
              this.dellE3DrawImage(res.data);
            } else if (res.code == 40022) {
              this.$message.error(res.msg);
              this.isuser = true;
              this.isBtn = true;
              this.percentageNumber = 99;
              this.randomStr = Math.random();
              this.dellE3List = [];
              this.$store.dispatch("user/changeChatListLength", this.dellE3List.length);
              this.isTimeBaidu = false;
              clearInterval(this.t_time);
            } else if (res.code == 50000 || res.code == 50001) {
              this.$message.error("网络超时！请稍后重试");
              this.isuser = true;
              this.isBtn = true;
              this.percentageNumber = 99;
              this.randomStr = Math.random();
              this.dellE3List = [];
              this.$store.dispatch("user/changeChatListLength", this.dellE3List.length);
              this.isTimeBaidu = false;
              clearInterval(this.t_time);
            }
          })
          .catch((err) => {
            console.log(err, "dellE3绘画错误");
          });
      }
    },

    //DellE3绘画图片
    dellE3DrawImage(data) {
      setTimeout(() => {
        this.isuser = true;
        // val.data[0].create_time = val.data[0].create_time.replace(/-/g, "/");
        // val.data[0].create_time = val.data[0].create_time.slice(5);
        // val.data[0].checked = false;
        let img_urls = [];
        let url_val = { url: data.results[0].result_image };
        img_urls.push(url_val);
        let obj = {
          // "create_time": val.data[0].create_time,
          finish_reason: "stop",
          session_code: data.image_code,
          chat_group_code: data.image_code,
          size: data.results[0].size,
          role: data.results[0].role,
          image_urls: img_urls,
          url_base: null,
          help: false,
          stepOn: false,
          isShowOldChat: true,
          timer: this.timer,
          is_mod: 0,
        };
        // if (!this.isClickChat) {
        this.dellE3List.push(obj);
        this.percentageNumber = 99;
        this.createImgStatus = true;
        clearInterval(this.t_time);
        // localStorage.setItem('session_code9', val.data[0].session_code);
        // localStorage.setItem('chat_group_code9', val.data[0].chat_group_code);
        // }
        this.randomStr = Math.random();
        this.$store.dispatch("user/changeChatListLength", this.dellE3List.length);
        this.isBtn = true;
        if (this.chat_type == 2) {
          this.isTimeDell = false;
        } else if (this.chat_type == 3) {
          this.isTimeBaidu = false;
        } else if (this.chat_type == 6) {
          this.isTimeMidjourney = false;
        } else if (this.chat_type == 9) {
          this.isTimestableDiffusion = false;
        } else if (this.chat_type == 13) {
          this.isTimeTonyi = false;
        } else if (this.chat_type == 14) {
          this.isTimeHuoshan = false;
        } else if (this.chat_type == 15) {
          this.isTimeDellE3 = false;
        }
      }, 500);
      // 保存最近使用
      submitFootprint({
        type_name: "dellE3",
        type_code: "image",
        image_url: data.results[0].results_image,
        title: this.oldSendValue,
        eid: data.image_code,
      }).then((res) => {});
      this.getChatList();
    },

    dellSend() {
      this.isShowassociation = false;
      this.isShowChecked = false;
      this.chatList.forEach((v) => {
        v.checked = false;
      });

      this.isDetail = false;
      this.isShow = true; // 快速提问
      this.isfinish = false; // 完成打字效果
      this.isBtn = false; // 是否允许重发

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
      if (month < 10) {
        month = "0" + month;
      }
      if (day < 10) {
        day = "0" + day;
      }
      if (hour < 10) {
        hour = "0" + hour;
      }
      if (minute < 10) {
        minute = "0" + minute;
      }
      if (second < 10) {
        second = "0" + second;
      }

      let date = month + "/" + day + " " + hour + "-" + minute + "-" + second;

      let sendVal = {
        // 询问者问题展示
        create_time: date,
        finish_reason: "length",
        session_code: "",
        chat_group_code: "",
        role: "user",
        content: this.sendValue || this.drawTextarea,
        checked: false,
        help: false,
        stepOn: false,
        isShowOldChat: true,
        timer: false,
      };

      this.chatList.push(sendVal);
      this.$store.dispatch("user/changeChatListLength", this.chatList.length);
      // this.toBottom();

      // this.isTime = true; // 思考中
      if (this.chat_type == 2) {
        this.isTimeDell = true;
      } else {
        this.isTimeBaidu = true;
      }
      this.timer = 0;
      this.t_time = setInterval(() => {
        this.timer += 1;
        if (Number((Math.random() * 10).toFixed(0)) % 2 == 0) {
          let num = Number((Math.random() * 10).toFixed(0));
          this.percentageNumber =
            this.percentageNumber + num >= 97 ? 97 : this.percentageNumber + num;
        }
      }, 1000);

      let vals = new FormData();
      if (this.drawDialogRadio == "") {
        this.actionType = 3;
      }
      if (this.actionType == 5 && Number(this.drawDialogRadio) == 1) {
        vals.append("action_type", this.actionType);
        vals.append("content", this.chatTextStatus ? this.chatText : this.drawTextarea);
        vals.append("n", 1);
        vals.append("size", sessionStorage.getItem("sizeRadio2") || "256x256");
        vals.append("image", base64toFile(this.imgUrl.baseUrl, "file"));
        vals.append("mask", "");
        vals.append("session_code", "");
      } else {
        vals.append("action_type", this.actionType);
        vals.append(
          "content",
          this.chatTextStatus ? this.chatText : this.sendValue || this.drawTextarea
        );
        vals.append("n", 1);
        vals.append("size", this.sizeRadio || sessionStorage.getItem("sizeRadio2"));
        vals.append("session_code", "");
      }
      if (this.sizeRadio != "") {
        sessionStorage.setItem("sizeRadio2", this.sizeRadio);
      }
      this.sizeRadio = "256x256";
      this.oldSendValue = this.sendValue;
      this.sendValue = "";

      axios
        .post(httpUrls.httpUrl + "api/chat/async_image_generation", vals, {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            authorization: this.loginInfo.token,
            role: this.loginInfo.role,
            source: "pc",
          },
        })
        .then((res) => {
          this.sendValue = ""; // 清空发送栏内容
          if (res.data.code == 20000) {
            this.percentageNumber = 99;
            clearInterval(this.t_time);
            setTimeout(() => {
              this.isuser = true;
              res.data.data.create_time = res.data.data.create_time.replace(/-/g, "/");
              res.data.data.create_time = res.data.data.create_time.slice(5);
              res.data.data.checked = false;
              res.data.data.help = false;
              res.data.data.timer = this.timer;
              res.data.data.stepOn = false;
              res.data.data.isShowOldChat = true; // 是否显示图文生图
              if (!this.isClickChat) {
                this.chatList.push(res.data.data);
                // localStorage.setItem('session_code2', res.data.data.session_code);
                // localStorage.setItem('chat_group_code2', res.data.data.chat_group_code);
              }
              this.randomStr = Math.random();
              this.$store.dispatch("user/changeChatListLength", this.chatList.length);
              this.isBtn = true;
              if (this.chat_type == 2) {
                this.isTimeDell = false;
              } else {
                this.isTimeBaidu = false;
              }
            }, 500);

            // 保存最近使用
            submitFootprint({
              type_name: "DELL·E2",
              type_code: "image",
              image_url: res.data.data.content,
              title: this.oldSendValue,
              eid: res.data.data.session_code,
            }).then((res) => {});
            // 定位到聊天最底部
            // this.toBottom();
          } else if (res.data.code == 30014 || res.data.code == 40022) {
            this.queryErrorMsg = res.data.msg;
            this.isBtn = true;
            this.isTime = false;

            if (this.chat_type == 2) {
              this.isTimeDell = false;
            } else if (this.chat_type == 3) {
              this.isTimeBaidu = false;
            } else if (this.chat_type == 6) {
              this.isTimeMidjourney = false;
            }
            clearInterval(this.t_time);
            if (this.loginInfo.role == "guess") {
              this.isuser = false;
              return;
            }
            if (this.loginInfo.role == "user") {
              this.isuser = false;
              return;
            }
          } else {
            this.isBtn = true;
            if (this.chat_type == 2) {
              this.isTimeDell = false;
            } else if (this.chat_type == 3) {
              this.isTimeBaidu = false;
            } else if (this.chat_type == 6) {
              this.isTimeMidjourney = false;
            }
            clearInterval(this.t_time);
            this.$message.error(res.data.msg);
          }
          this.getChatList();
        })
        .catch((err) => {
          clearInterval(this.t_time);
          this.$message.error("网络异常，请重试!");
          this.isBtn = true;
        });
    },

    // MJ绘画
    midjourneySend() {
      this.isShowassociation = false;
      this.isShowChecked = false;
      this.midjourneyList.forEach((v) => {
        v.checked = false;
      });

      this.isDetail = false;
      this.isShow = true; // 快速提问
      this.isfinish = false; // 完成打字效果
      this.isBtn = false; // 是否允许重发

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
      if (month < 10) {
        month = "0" + month;
      }
      if (day < 10) {
        day = "0" + day;
      }
      if (hour < 10) {
        hour = "0" + hour;
      }
      if (minute < 10) {
        minute = "0" + minute;
      }
      if (second < 10) {
        second = "0" + second;
      }

      let date = month + "/" + day + " " + hour + "-" + minute + "-" + second;

      let sendVal = {
        // 询问者问题展示
        create_time: date,
        finish_reason: "length",
        session_code: "",
        chat_group_code: "",
        role: "user",
        content: this.sendValue,
        checked: false,
        help: false,
        stepOn: false,
        timer: false,
        isShowOldChat: true,
      };

      this.midjourneyList.push(sendVal);
      this.$store.dispatch("user/changeChatListLength", this.midjourneyList.length);
      // this.toBottom();

      if (this.chat_type == 2) {
        this.isTimeDell = true;
      } else if (this.chat_type == 3) {
        this.isTimeBaidu = true;
      } else if (this.chat_type == 6) {
        this.isTimeMidjourney = true;
      } else if (this.chat_type == 13) {
        this.isTimeTonyi = true;
      } else if (this.chat_type == 14) {
        this.isTimeHuoshan = true;
      }

      this.timer = 0;
      this.t_time = setInterval(() => {
        this.timer += 1;
        if (Number((Math.random() * 10).toFixed(0)) % 2 == 0) {
          let num = Number((Math.random() * 10).toFixed(0));
          this.percentageNumber =
            this.percentageNumber + num >= 97 ? 97 : this.percentageNumber + num;
        }
      }, 1000);

      let data = new FormData();

      if (this.actionType == 3) {
        data = {
          content: this.chatTextStatus ? this.chatText : this.sendValue,
          size: this.sizeRadio,
          chat_type: this.chat_type,
          session_code: "",
          action_type: this.actionType,
          is_niji: this.mjImageStyle,
        };
      } else {
        data.append("content", this.chatTextStatus ? this.chatText : this.drawTextarea);
        data.append("size", sessionStorage.getItem("sizeRadio6") || "1:1");
        data.append("chat_type", this.chat_type);
        data.append("session_code", "");
        data.append("action_type", this.actionType);
        data.append("image", base64toFile(this.imgUrl.base64Url, "file"));
        data.append("url", this.imgUrl.url);
        data.append("is_niji", this.mjImageStyle);
      }
      // data = {
      //   content: this.chatTextStatus ? this.chatText : this.sendValue,
      //   size: this.sizeRadio,
      //   chat_type: this.chat_type + "",
      //   session_code: "",
      //   action_type: this.actionType + "",
      //   is_niji: this.mjImageStyle,
      // };
      data = {
        prompt: this.sendValue, //提示文字
        chat_type: this.chat_type + "", //# 类型必传 13
        size: this.sizeRadio, // # 生成图像的分辨率，目前仅支持'1024*1024', '720*1280', '1280*720'三种分辨率，
        n: 1, //# 张数默认1
        action_type: 3,
      };
      this.sendValue = "";
      sessionStorage.setItem("sizeRadio6", this.sizeRadio);
      if (this.chat_type == 6) {
        // MJ
        this.sizeRadio = "1:1";
        textTranslate({ text: data.prompt }).then((res) => {
          data.prompt_en = res.data.text;
          if (res.code != 20000) {
            this.isBtn = true;
            if (this.chat_type == 2) {
              this.isTimeDell = false;
            } else if (this.chat_type == 3) {
              this.isTimeBaidu = false;
            } else if (this.chat_type == 6) {
              this.isTimeMidjourney = false;
            } else if (this.chat_type == 13) {
              this.isTimeTonyi = false;
            } else if (this.chat_type == 14) {
              this.isTimeHuoshan = false;
            }
            clearInterval(this.t_time);
            this.$message.error(res.msg);
            return;
          }
          baiduDraw(data)
            .then((res) => {
              this.sendValue = ""; // 清空发送栏内容
              if (res.code == 20000) {
                let data = `task_id=${res.data.task_id}`;
                let tiemrs = 0;
                let draw_time = setInterval(() => {
                  tiemrs++;
                  if (tiemrs == 180) {
                    this.percentageNumber = 99;
                    clearInterval(this.t_time);
                    clearInterval(draw_time);
                    this.isuser = true;
                    this.$message.error("当前绘画时间过长，请稍后查看");
                  }
                  newbaiduDrawDetail(data).then((val) => {
                    if (val.data != null && val.data[0].status == 2) {
                      this.$message.error(
                        "您的输入涉及不良内容，请勿发布违规信息，请注意文明用语。"
                      );
                    }
                    // this.mjProgress = val.data[0].progress;
                    if (val.code == 20000 && val.data) {
                      if (val.data != null) {
                        this.percentageNumber = 99;
                        clearInterval(this.t_time);
                        clearInterval(draw_time);
                        setTimeout(() => {
                          this.isuser = true;
                          let img_urls = [];
                          let url_val = { url: val.data[0].result_image };
                          img_urls.push(url_val);
                          let obj = {
                            // "create_time": val.data[0].create_time,
                            finish_reason: "stop",
                            session_code: val.data[0].image_code,
                            chat_group_code: val.data[0].image_code,
                            size: val.data[0].size,
                            role: val.data[0].role,
                            image_urls: img_urls,
                            url_base: null,
                            help: false,
                            stepOn: false,
                            isShowOldChat: true,
                            timer: this.timer,
                            is_mod: 0,
                          };
                          this.midjourneyList.push(obj);
                          this.percentageNumber = 99;
                          clearInterval(this.t_time);
                          this.createImgStatus = true;
                          this.randomStr = Math.random();
                          this.$store.dispatch(
                            "user/changeChatListLength",
                            this.midjourneyList.length
                          );
                          this.isBtn = true;
                          if (this.chat_type == 2) {
                            this.isTimeDell = false;
                          } else if (this.chat_type == 3) {
                            this.isTimeBaidu = false;
                          } else if (this.chat_type == 6) {
                            this.isTimeMidjourney = false;
                          } else if (this.chat_type == 13) {
                            this.isTimeTonyi = false;
                          } else if (this.chat_type == 14) {
                            this.isTimeHuoshan = false;
                          }
                          clearInterval(draw_time);
                          // 定位到聊天最底部
                          // this.toBottom();
                          this.getChatList();
                        }, 500);

                        // 保存最近使用
                        submitFootprint({
                          type_name: "Midjourney",
                          type_code: "image",
                          title: this.oldSendValue,
                          image_url: val.data[0].result_image,
                          eid: val.data[0].image_code,
                        }).then((res) => {});
                      }
                    } else if (val.code != 20000) {
                      this.isuser = true;
                      this.isBtn = true;
                      if (this.chat_type == 2) {
                        this.isTimeDell = false;
                      } else if (this.chat_type == 3) {
                        this.isTimeBaidu = false;
                      } else if (this.chat_type == 6) {
                        this.isTimeMidjourney = false;
                      }
                      clearInterval(this.t_time);
                      clearInterval(draw_time);
                      this.$message.error(val.msg);
                    }

                    // 查询时间>=200秒之后停止查询
                    if (tiemrs >= 100) {
                      this.$message({
                        message: "当前等待时间过长，请稍后前往历史记录查看",
                        duration: 7000,
                      });
                      clearInterval(this.t_time);
                      clearInterval(draw_time);
                      this.randomStr = Math.random();
                      this.isuser = true;
                      this.isBtn = true;
                      if (this.chat_type == 2) {
                        this.isTimeDell = false;
                      } else if (this.chat_type == 3) {
                        this.isTimeBaidu = false;
                      } else if (this.chat_type == 6) {
                        this.isTimeMidjourney = false;
                      }
                    }
                  });
                }, 2000);
              } else if (res.code == 30014 || res.code == 40022) {
                try {
                  this.queryErrorMsg = res.msg;
                  this.isBtn = true;
                  if (this.chat_type == 2) {
                    this.isTimeDell = false;
                  } else if (this.chat_type == 3) {
                    this.isTimeBaidu = false;
                  } else if (this.chat_type == 6) {
                    this.isTimeMidjourney = false;
                  }
                  clearInterval(this.t_time);
                  if (this.loginInfo.role == "guess") {
                    this.isuser = false;
                    return;
                  }
                  if (this.loginInfo.role == "user") {
                    this.isuser = false;
                    return;
                  }
                } catch (error) {}
              } else {
                this.isBtn = true;
                if (this.chat_type == 2) {
                  this.isTimeDell = false;
                } else if (this.chat_type == 3) {
                  this.isTimeBaidu = false;
                } else if (this.chat_type == 6) {
                  this.isTimeMidjourney = false;
                }
                clearInterval(this.t_time);
                this.$message.error(res.msg);
              }
            })
            .catch((err) => {
              this.isBtn = true;
              if (this.chat_type == 2) {
                this.isTimeDell = false;
              } else if (this.chat_type == 3) {
                this.isTimeBaidu = false;
              } else if (this.chat_type == 6) {
                this.isTimeMidjourney = false;
              }
              clearInterval(this.t_time);
              this.$message.error("绘图失败！");
            });
        });
      }
    },

    // SD绘画
    stableDiffusionSend() {
      console.log("进入SD绘画方法");
      this.isShowassociation = false;
      this.isShowChecked = false;
      this.stableDiffusionList.forEach((v) => {
        v.checked = false;
      });

      this.isDetail = false;
      this.isShow = true; // 快速提问
      this.isfinish = false; // 完成打字效果
      this.isBtn = false; // 是否允许重发

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
      if (month < 10) {
        month = "0" + month;
      }
      if (day < 10) {
        day = "0" + day;
      }
      if (hour < 10) {
        hour = "0" + hour;
      }
      if (minute < 10) {
        minute = "0" + minute;
      }
      if (second < 10) {
        second = "0" + second;
      }

      let date = month + "/" + day + " " + hour + "-" + minute + "-" + second;

      let sendVal = {
        // 询问者问题展示
        create_time: date,
        finish_reason: "length",
        session_code: "",
        chat_group_code: "",
        role: "user",
        content: this.sendValue,
        checked: false,
        help: false,
        stepOn: false,
        timer: false,
        isShowOldChat: true,
      };

      this.stableDiffusionList[0] = sendVal;
      this.$store.dispatch("user/changeChatListLength", this.stableDiffusionList.length);
      // this.toBottom();

      if (this.chat_type == 2) {
        this.isTimeDell = true;
      } else if (this.chat_type == 3) {
        this.isTimeBaidu = true;
      } else if (this.chat_type == 6) {
        this.isTimeMidjourney = true;
      } else if (this.chat_type == 9) {
        this.isTimestableDiffusion = true;
      } else if (this.chat_type == 13) {
        this.isTimeTonyi = true;
      } else if (this.chat_type == 14) {
        this.isTimeHuoshan == true;
      }

      if (!this.chatTextStatus) {
        this.timer = 0;
        this.t_time = setInterval(() => {
          this.timer += 1;
          if (Number((Math.random() * 10).toFixed(0)) % 2 == 0) {
            let num = Number((Math.random() * 10).toFixed(0));
            this.percentageNumber =
              this.percentageNumber + num >= 97 ? 97 : this.percentageNumber + num;
          }
        }, 1000);
      }

      let data = new FormData();
      data = {
        prompt: this.chatTextStatus ? this.chatText : this.sendValue, // 提示文字
        prompt_en: this.sendValue, // 提示文字/英文
        size: this.sizeRadio, //尺寸
        chat_type: this.chat_type + "", //类型
        action_type: this.imageToImage == 1 ? "3" : "5",
        sampler_index: this.samplerIndex || "Euler a", //采样器
        model: this.SDValue,
        negative_prompt: this.drawTextarea, // 方向提示词/翻译后
        negative_prompt_en: "", // 反向提示词
        // origin_image: [this.uploadPictureUrl],  //图生文
        app_type: "1",
        seed: this.seed ? parseInt(this.seed) : -1, //随机种子
        steps: this.steps ? parseInt(this.steps) : 20, //迭代次数
        cfg_scale: this.cfg_scale ? parseInt(this.cfg_scale) : 7, //提示词相关
      };
      data.action_type == "5" ? (data.origin_image = this.uploadPictureUrl) : "";
      this.sendValue = "";
      this.drawTextarea = "";
      // console.log(data,'请求参数')
      // return
      sessionStorage.setItem("sizeRadio9", this.sizeRadio);
      if (this.chat_type == 9) {
        // SD
        this.sizeRadio = "512*512";
        // console.log(data, "构建SD绘画数据");
        textTranslate({ text: data.prompt }).then((res) => {
          // console.log('进入翻译用户输入函数')
          data.prompt = data.prompt;
          data.prompt_en = res.data.text;
          if (data.negative_prompt != "") {
            textTranslate({ text: data.negative_prompt }).then((r) => {
              data.negative_prompt_zh = data.negative_prompt;
              data.negative_prompt_en = r.data.text;
              this.SDDrawImage(data);
            });
          } else {
            this.SDDrawImage(data);
          }
        });
      }
    },

    // SD绘画方法
    SDDrawImage(val) {
      this.uploadPictureUrl = "";
      if (this.$refs.drawPictureList != undefined) {
        this.$refs.drawPictureList.clearFiles();
      }
      let data = val;
      //处理Prompt开头
      let newStr = data.prompt.replace("*Prompt:/g", "");
      data.prompt = newStr;
      data.prompt_en = newStr;
      console.log(data, "请求参数");
      SDCreateImage(data).then((res) => {
        console.log("进入创建SD绘画.then中", res);
        // data.content_en = res.data.tag
        if (res.code != 20000) {
          this.isBtn = true;
          if (res.code == 40022) {
            this.isuser = false;
          } else if (res.code == 40015) {
            this.stableDiffusionList.push({
              is_mod: 1,
              content: res.msg,
            });
          } else {
            this.$message.error(res.msg);
          }
          if (this.chat_type == 2) {
            this.isTimeDell = false;
          } else if (this.chat_type == 3) {
            this.isTimeBaidu = false;
          } else if (this.chat_type == 6) {
            this.isTimeMidjourney = false;
          } else if (this.chat_type == 9) {
            this.isTimestableDiffusion = false;
          } else if (this.chat_type == 13) {
            this.isTimeTonyi = false;
          } else if (this.chat_type == 14) {
            this.isTimeHuoshan = false;
          }
          clearInterval(this.t_time);
          return;
        }
        this.SDResultImage(res.data.tag);
      });
    },

    // SD绘画结果
    SDResultImage(result) {
      SDResultImage(`task_id=${result}`).then((val) => {
        console.log("进入SD绘画结果.then中", val);
        if (
          val.data != null &&
          (Number(val.data[0].is_mod) == 1 || Number(val.data[0].status) == 1)
        ) {
          let obj = {
            create_time: val.data[0].create_time,
            finish_reason: "stop",
            session_code: val.data[0].session_code,
            chat_group_code: val.data[0].chat_group_code,
            size: val.data[0].size,
            role: "assistant",
            image_urls: [{ url: val.data.msg }],
            url_base: val.data[0].url_base,
            help: false,
            stepOn: false,
            isShowOldChat: true,
            timer: this.timer,
            is_mod: val.data[0].is_mod,
            status: val.data[0].status,
            content:
              val.data[0].is_mod == 1
                ? "图片内容涉及敏感请重新提问。"
                : "生成失败，本次不消耗绘画次数",
          };
          console.log(this.isClickChat, obj, "输出绘画结果并构建图片数据--obj");
          // if (!this.isClickChat) {
          this.stableDiffusionList.push(obj);
          // }
          this.isuser = true;
          this.isBtn = true;
          if (this.chat_type == 2) {
            this.isTimeDell = false;
          } else if (this.chat_type == 3) {
            this.isTimeBaidu = false;
          } else if (this.chat_type == 6) {
            this.isTimeMidjourney = false;
          } else if (this.chat_type == 9) {
            this.isTimestableDiffusion = false;
          } else if (this.chat_type == 13) {
            this.isTimeTonyi = false;
          } else if (this.chat_type == 14) {
            this.isTimeHuoshan = false;
          }
          clearInterval(this.t_time);
          return;
        }
        if (val.code == 20000 && val.data == null) {
          setTimeout(() => {
            this.SDResultImage(result);
          }, 2000);
        } else if (val.code == 20000) {
          this.percentageNumber = 99;
          clearInterval(this.t_time);
          setTimeout(() => {
            this.isuser = true;
            val.data[0].create_time = val.data[0].create_time.replace(/-/g, "/");
            val.data[0].create_time = val.data[0].create_time.slice(5);
            val.data[0].checked = false;
            let img_urls = [];
            let url_val = { url: val.data[0].result_image };
            img_urls.push(url_val);
            let obj = {
              create_time: val.data[0].create_time,
              finish_reason: "stop",
              session_code: val.data[0].msg_code,
              chat_group_code: val.data[0].image_code,
              size: val.data[0].size,
              role: val.data[0].role,
              image_urls: img_urls,
              // url_base: val.data[0].url_base,
              help: false,
              stepOn: false,
              isShowOldChat: true,
              timer: this.timer,
              is_mod: 0,
            };
            console.log(obj, "--输出构建后obj");
            // if (!this.isClickChat) {
            this.stableDiffusionList.push(obj);
            this.createImgStatus = true;
            // localStorage.setItem('session_code9', val.data[0].session_code);
            // localStorage.setItem('chat_group_code9', val.data[0].chat_group_code);
            // }
            this.randomStr = Math.random();
            this.$store.dispatch(
              "user/changeChatListLength",
              this.stableDiffusionList.length
            );
            this.isBtn = true;
            if (this.chat_type == 2) {
              this.isTimeDell = false;
            } else if (this.chat_type == 3) {
              this.isTimeBaidu = false;
            } else if (this.chat_type == 6) {
              this.isTimeMidjourney = false;
            } else if (this.chat_type == 9) {
              this.isTimestableDiffusion = false;
            } else if (this.chat_type == 13) {
              this.isTimeTonyi = false;
            } else if (this.chat_type == 14) {
              this.isTimeHuoshan = false;
            }
          }, 500);
          // 保存最近使用
          submitFootprint({
            type_name: "Stable Diffusion",
            type_code: "image",
            image_url: val.data[0].result_image,
            title: this.oldSendValue,
            eid: val.data[0].image_code,
          }).then((res) => {});
          this.getChatList();
          // 定位到聊天最底部
          // this.toBottom();
        } else {
          this.isuser = true;
          this.isBtn = true;
          if (this.chat_type == 2) {
            this.isTimeDell = false;
          } else if (this.chat_type == 3) {
            this.isTimeBaidu = false;
          } else if (this.chat_type == 6) {
            this.isTimeMidjourney = false;
          } else if (this.chat_type == 9) {
            this.isTimestableDiffusion = false;
          } else if (this.chat_type == 13) {
            this.isTimeTonyi = false;
          } else if (this.chat_type == 14) {
            this.isTimeHuoshan = false;
          }
          clearInterval(this.t_time);
          this.$message.error(val.msg);
        }
      });
    },

    // 获取示例
    drawingSetRecommend() {
      drawingSetRecommend().then((res) => {
        this.qsList = res.data;
        let mathNumber = Math.floor(Math.random() * res.data.length);
        this.exampleItem = res.data[mathNumber];
        // clearInterval(this.examplet_time);
        // this.examplet_time = null;
        // this.examplet_time = setInterval(() => {
        //   this.exampleTime++;
        //   if (this.exampleTime >= this.qsList.length) {
        //     this.exampleTime = 0;
        //   }
        //   this.exampleItem = this.qsList[this.exampleTime];
        // }, 10000);
      });
    },

    // 开启新会话
    resetNewChat() {
      if (!this.isBtn) {
        this.$message("当前问题还没回答完毕，请稍后再试");
        return;
      }
      if (this.chat_type == 2) {
        if (this.chatList.length == 0) return;
        this.chatList = [];
        this.isShowTemplateDALL = true;
        this.$store.dispatch("user/changeChatListLength", 0);
        localStorage.setItem("session_code2", "");
        localStorage.setItem("chat_group_code2", "");
      } else if (this.chat_type == 3) {
        if (this.baiduList.length == 0) return;
        this.baiduList = [];
        this.isShowTemplateBaidu = true;
        this.$store.dispatch("user/changeChatListLength", 0);
        localStorage.setItem("session_code3", "");
        localStorage.setItem("chat_group_code3", "");
      } else if (this.chat_type == 6) {
        if (this.midjourneyList.length == 0) return;
        this.midjourneyList = [];
        this.isShowTemplateMidJ = true;
        this.$store.dispatch("user/changeChatListLength", 0);
        localStorage.setItem("session_code6", "");
        localStorage.setItem("chat_group_code6", "");
      } else if (this.chat_type == 9) {
        if (this.stableDiffusionList.length == 0) return;
        this.stableDiffusionList = [];
        this.isShowTemplatestableDiffusion = true;
        this.$store.dispatch("user/changeChatListLength", 0);
        localStorage.setItem("session_code9", "");
        localStorage.setItem("chat_group_code9", "");
      } else if (this.chat_type == 13) {
        if (this.tonyiList.length == 0) return;
        this.tonyiList = [];
        this.isShowTemplateTonyi = true;
        this.$store.dispatch("user/changeChatListLength", 0);
        localStorage.setItem("session_code13", "");
        localStorage.setItem("chat_group_code13", "");
      } else if (this.chat_type == 14) {
        if (this.huoshanList.length == 0) return;
        this.huoshanList = [];
        this.isShowTemplateHuoshan = true;
        this.$store.dispatch("user/changeChatListLength", 0);
        localStorage.setItem("session_code14", "");
        localStorage.setItem("chat_group_code14", "");
      } else if (this.chat_type == 15) {
        if (this.dellE3List.length == 0) return;
        this.dellE3List = [];
        this.isShowTemplateHuoshan = true;
        this.$store.dispatch("user/changeChatListLength", 0);
        localStorage.setItem("session_code14", "");
        localStorage.setItem("chat_group_code14", "");
      }
      this.isuser = true;
      this.randomStr = Math.random();
      this.isShowChecked = false;
      this.isShowassociation = false;
      this.isClickChat = false;
      this.isBtn = true;
      clearInterval(this.t_time);
      if (this.chat_type == 2) {
        this.isTimeDell = false;
      } else if (this.chat_type == 3) {
        this.isTimeBaidu = false;
      } else if (this.chat_type == 6) {
        this.isTimeMidjourney = false;
      } else if (this.chat_type == 9) {
        this.isTimestableDiffusion = false;
      } else if (this.chat_type == 13) {
        this.isTimeTonyi = false;
      } else if (this.chat_type == 14) {
        this.isTimeHuoshan = false;
      }
      this.createImgStatus = false;
      let mathNumber = Math.floor(Math.random() * this.qsList.length);
      this.exampleItem = this.qsList[mathNumber];
      this.sendValue = "";
    },

    // 获取会话详情
    getDetail(code) {
      this.isDetail = true;
      if (this.chat_type == 2) {
        this.isTimeDell = false;
        this.isShowTemplateDALL = false;
      } else if (this.chat_type == 3) {
        this.isTimeBaidu = false;
        this.isShowTemplateBaidu = false;
      } else if (this.chat_type == 6) {
        this.isTimeMidjourney = false;
        this.isShowTemplateMidJ = false;
      } else if (this.chat_type == 9) {
        this.isTimestableDiffusion = false;
        this.isShowTemplatestableDiffusion = false;
      } else if (this.chat_type == 13) {
        this.isTimeTonyi = false;
        this.isShowTemplateTonyi = false;
      } else if (this.chat_type == 14) {
        this.isTimeHuoshan = false;
        this.isShowTemplateHuoshan = false;
      }
      this.isfinish = true;
      this.createImgStatus = true;
      // if (this.chat_type != 13 && this.chat_type != 14 && this.chat_type != 9) {
      //   chatDetail(code)
      //     .then((res) => {
      //       console.log(code, "绘画历史详情");
      //       if (this.AIname == 2) {
      //         this.chatList = [];
      //         this.$store.dispatch("user/changeChatListLength", this.chatList.length);
      //       } else if (this.AIname == 3) {
      //         this.baiduList = [];
      //         this.$store.dispatch("user/changeChatListLength", this.baiduList.length);
      //       } else if (this.AIname == 6) {
      //         this.midjourneyList = [];
      //         this.$store.dispatch(
      //           "user/changeChatListLength",
      //           this.midjourneyList.length
      //         );
      //       } else if (this.AIname == 9) {
      //         this.stableDiffusionList = [];
      //         this.$store.dispatch(
      //           "user/changeChatListLength",
      //           this.stableDiffusionList.length
      //         );
      //       } else if (this.AIname == 13) {
      //         this.tonyiList = [];
      //         this.$store.dispatch("user/changeChatListLength", this.tonyiList.length);
      //       } else if (this.AIname == 14) {
      //         this.huoshanList = [];
      //         this.$store.dispatch("user/changeChatListLength", this.huoshanList.length);
      //       } else if (this.AIname == 15) {
      //         this.dellE3List = [];
      //         this.$store.dispatch("user/changeChatListLength", this.dellE3List.length);
      //       }
      //       if (res.code == 20000) {
      //         let arr = res.data;
      //         if (arr[1].is_likes == 1) {
      //           this.is_likeOk = true;
      //           this.is_likeNo = false;
      //         } else if (arr[1].is_likes == 2) {
      //           this.is_likeNo = true;
      //           this.is_likeOk = false;
      //         } else {
      //           this.is_likeNo = false;
      //           this.is_likeOk = false;
      //         }
      //         arr.forEach((v) => {
      //           v.image_urls = [{ url: v.content }];
      //           v.content =
      //             v.is_mod == 1
      //               ? "图片内容涉及敏感请重新提问。"
      //               : "生成失败，本次不消耗绘画次数";
      //           v.help = v.is_likes == 1 ? true : false;
      //           v.stepOn = v.is_likes == 2 ? true : false;
      //         });
      //         let data = [];
      //         data.push(arr[arr.length - 2]);
      //         data.push(arr[arr.length - 1]);
      //         this.sendValue = arr[arr.length - 2].image_urls[0].url;
      //         if (this.chat_type == 2) {
      //           this.chatList = data;
      //           this.$store.dispatch("user/changeChatListLength", this.chatList.length);
      //         }

      //         if (this.chat_type == 3) {
      //           this.baiduList = data;
      //           this.$store.dispatch("user/changeChatListLength", this.baiduList.length);
      //         }

      //         if (this.chat_type == 6) {
      //           this.midjourneyList = data;
      //           this.$store.dispatch(
      //             "user/changeChatListLength",
      //             this.midjourneyList.length
      //           );
      //         }

      //         if (this.chat_type == 9) {
      //           this.stableDiffusionList = data;
      //           this.$store.dispatch(
      //             "user/changeChatListLength",
      //             this.stableDiffusionList.length
      //           );
      //         }

      //         if (this.chat_type == 13) {
      //           this.tonyiList = data;
      //           this.$store.dispatch("user/changeChatListLength", this.tonyiList.length);
      //         }

      //         if (this.chat_type == 14) {
      //           this.huoshanList = data;
      //           this.$store.dispatch(
      //             "user/changeChatListLength",
      //             this.huoshanList.length
      //           );
      //         }
      //         if (this.chat_type == 15) {
      //           this.huoshanList = data;
      //           this.$store.dispatch("user/changeChatListLength", this.dellE3List.length);
      //         }

      //         this.exampleItem = "";
      //         this.isBtn = true;
      //         this.isShow = true;
      //         // this.toBottom();
      //       } else {
      //         this.$message.error(res.msg);
      //       }
      //     })
      //     .catch((err) => {
      //       this.$message.error("获取会话失败！");
      //     });
      // } else {
      chatDetailNew(code)
        .then((res) => {
          // console.log(res, "--new详情");
          if (this.AIname == 2) {
            this.chatList = [];
            this.$store.dispatch("user/changeChatListLength", this.chatList.length);
          } else if (this.AIname == 3) {
            this.baiduList = [];
            this.$store.dispatch("user/changeChatListLength", this.baiduList.length);
          } else if (this.AIname == 6) {
            this.midjourneyList = [];
            this.$store.dispatch("user/changeChatListLength", this.midjourneyList.length);
          } else if (this.AIname == 9) {
            this.stableDiffusionList = [];
            this.$store.dispatch(
              "user/changeChatListLength",
              this.stableDiffusionList.length
            );
          } else if (this.AIname == 13) {
            this.tonyiList = [];
            this.$store.dispatch("user/changeChatListLength", this.tonyiList.length);
          } else if (this.AIname == 14) {
            this.huoshanList = [];
            this.$store.dispatch("user/changeChatListLength", this.huoshanList.length);
          } else if (this.AIname == 15) {
            this.dellE3List = [];
            this.$store.dispatch("user/changeChatListLength", this.dellE3List.length);
          }
          if (res.code == 20000) {
            let arr = res.data;
            if (arr[1].is_likes == 1) {
              this.is_likeOk = true;
              this.is_likeNo = false;
            } else if (arr[1].is_likes == 2) {
              this.is_likeNo = true;
              this.is_likeOk = false;
            } else {
              this.is_likeNo = false;
              this.is_likeOk = false;
            }
            arr.forEach((v) => {
              v.image_urls = [{ url: v.result_image }];
              v.content =
                v.is_mod == 1
                  ? "图片内容涉及敏感请重新提问。"
                  : "生成失败，本次不消耗绘画次数";
              v.help = v.is_likes == 1 ? true : false;
              v.stepOn = v.is_likes == 2 ? true : false;
            });
            let data = [];
            data.push(arr[arr.length - 2]);
            data.push(arr[arr.length - 1]);
            this.sendValue = arr[arr.length - 2].image_urls[0].url;
            if (this.chat_type == 2) {
              this.chatList = data;
              this.$store.dispatch("user/changeChatListLength", this.chatList.length);
            }

            if (this.chat_type == 3) {
              this.baiduList = data;
              this.$store.dispatch("user/changeChatListLength", this.baiduList.length);
            }

            if (this.chat_type == 6) {
              this.midjourneyList = data;
              this.$store.dispatch(
                "user/changeChatListLength",
                this.midjourneyList.length
              );
            }

            if (this.chat_type == 9) {
              this.stableDiffusionList = data;
              this.$store.dispatch(
                "user/changeChatListLength",
                this.stableDiffusionList.length
              );
            }

            if (this.chat_type == 13) {
              this.tonyiList = data;
              this.$store.dispatch("user/changeChatListLength", this.tonyiList.length);
            }

            if (this.chat_type == 14) {
              this.huoshanList = data;
              this.$store.dispatch("user/changeChatListLength", this.huoshanList.length);
            }
            if (this.chat_type == 15) {
              this.dellE3List = data;
              this.$store.dispatch("user/changeChatListLength", this.dellE3List.length);
            }

            this.exampleItem = "";
            this.isBtn = true;
            this.isShow = true;
            // this.toBottom();
          } else {
            this.$message.error(res.msg);
          }
        })
        .catch((err) => {
          console.log(err);
          this.$message.error("获取会话失败！");
        });
      // }
    },

    // 获取对话列表
    getChatList(str = "") {
      if (str == "gundong") {
        this.page++;
      }
      if (str == "aiId") {
        this.chatHistoryList = [];
      }
      let chat_type = Number(this.chat_type);
      console.log(typeof chat_type);

      let val = `chat_type=${chat_type}&page_size=${this.page_size}&page=${this.page}`;
      drawChatHistroyNew(val)
        .then((res) => {
          let data = res.data.data;
          data.map((item) => (item["content"] = item.result_image));
          if (res.code == 20000) {
            if (str == "gundong") {
              this.chatHistoryList = this.chatHistoryList.concat(res.data.data);
            } else {
              this.chatHistoryList = res.data.data;
            }
          } else {
            this.$message.error(res.msg);
          }
        })
        .catch((err) => {
          this.$message.error("获取失败！");
        });
    },

    handleUploadChange(file, fileList) {
      this.requestData.image = file.raw;
      this.requestData.image_name = file.name;
    },
    handleSuccess(response, file, fileList) {
      if (response.code == 20000) {
        this.uploadPictureUrl = response.data.new_url;
      } else if (response.code != 20000 && response.code < 50000) {
        this.$message.error(response.msg);
        this.$refs.drawPictureList.clearFiles();
      }
    },

    handlePictureCardPreview() {
      this.dialogVisible = true;
      this.dialogImageUrl = httpUrls.ossUrl + this.uploadPictureUrl;
    },

    handleRemoveCompanyLogo() {
      this.uploadPictureUrl = "";
      this.$refs.drawPictureList.clearFiles();
    },

    getDrawDetail(item) {
      // this.sendValue = item.title
      // console.log(item.image_code, this.chat_type, "测试");
      console.log(this.chat_type, item);
      let code = item.image_code;
      // console.log(code, "绘画详情code",item);
      this.getDetail(code);
    },

    deleteDrawHistory(item, i) {
      let val =
        this.chat_type != 13 && this.chat_type != 14
          ? { session_codes: JSON.stringify([item.session_code]) }
          : {
              image_codes: JSON.stringify([item.image_code]),
            };
      this.$confirm("是否删除所选信息?", "删除", {
        confirmButtonText: "确认",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          if (this.chat_type != 13 && this.chat_type != 14) {
            ChatDelete(val)
              .then((res) => {
                if (res.code == 20000) {
                  this.chatHistoryList.splice(i, 1);
                  this.$message.success("删除成功！");
                  deleteFootprint(
                    `type_code=image&eid=${item.session_code}`
                  ).then((res) => {});
                } else {
                  this.$message.error(res.msg);
                }
              })
              .catch((err) => {
                this.$message.error("删除失败！");
              });
          } else {
            ChatDeleteNew(val)
              .then((res) => {
                if (res.code == 20000) {
                  this.chatHistoryList.splice(i, 1);
                  this.$message.success("删除成功！");
                  deleteFootprint(
                    `type_code=image&eid=${item.image_code}`
                  ).then((res) => {});
                } else {
                  this.$message.error(res.msg);
                }
              })
              .catch((err) => {
                this.$message.error("删除失败！");
              });
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
  },
};
</script>

<style scoped>
.uploadImage {
  width: 450px;
  height: 450px;
  border-radius: 10px;
  background: #fff;
  box-shadow: 0px 0px 0px 0px rgba(0, 0, 0, 0.1), 0px 10px 33px 0px rgba(0, 0, 0, 0.1);
  position: relative;
  left: 50%;
  transform: translate(-50%);
  /* padding-top: 70px; */
  box-sizing: border-box;
  /* display: flex;justify-content: center;flex-direction: column; */
}
.uploadImage .uploadBack {
  position: absolute;
  top: 20px;
  right: 20px;
  display: flex;
  align-items: center;
  z-index: 99999;
  cursor: pointer;
}
.uploadImage .uploadBack .el-icon-close {
  font-size: 24px;
  cursor: pointer;
}
.uploadImage .uploadBack div {
  margin-left: 0px;
  color: #666;
  font-family: PingFang SC;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 150%; /* 21px */
}
.uploadImage .upload-demo /deep/ .el-upload {
  width: 100%;
  height: 100%;
}
.uploadImage .uploadImg-text {
  color: #898989;
  text-align: center;
  font-family: PingFang SC;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 24px; /* 171.429% */
  /* margin-top: 5px; */
  margin-bottom: 15px;
}
.uploadImage .upload-demo /deep/ .el-upload-dragger {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
}
.uploadImage .uploadImg-title {
  color: #000;
  text-align: center;
  font-family: PingFang SC;
  font-size: 18px;
  font-style: normal;
  font-weight: 500;
  line-height: 24px; /* 133.333% */
}
.uploadImage .upload-content {
  display: flex;
  justify-content: center;
  flex-direction: column;
}
.resetNewChat {
  color: #fff;
  background-color: #1f64ff;
  border-radius: 4px;
  padding: 5px 15px;
  cursor: pointer;
  line-height: 23px;
  margin-right: 10px;
}
.checkModel {
  position: absolute;
  /* left: 50%; */
  left: 50%;
  top: 15px;
  transform: translate(-50%);
}
@media (height < 800px) {
  .img_msk {
    width: 400px;
    height: 400px;
  }

  .user_input_area {
    bottom: 20px;
  }
}

.chat_cont {
  margin: 0px 6px;
  display: flex;
  align-items: center;
}

/* 图片工具栏/点赞，下载 */
.img_tool > div {
  width: 32px;
  height: 32px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  background: #fff;
  margin-left: 16px;
  margin-right: 0px;
  cursor: pointer;
}

.workspace_tips {
  width: 450px;
  margin: 0px auto;
  display: flex;
  color: #666;
  font-family: PingFang SC;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  margin-bottom: 5px;
  position: relative;
  top: -40px;
}

.workspace_tips div:first-child {
  margin-right: 7px;
}

.workspaceNew_bottom {
  width: 450px;
  position: relative;
  top: -40px;
  /* margin: auto; */
}

.workspaceNew_bottom > div:first-child {
  display: flex;
  justify-content: space-between;
  color: #1f64ff;
  font-family: PingFang SC;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  margin-bottom: 5px;
}

.workspaceNew_bottom > div:first-child > div {
  display: flex;
}

.workspaceNew_bottom > div:first-child > div:first-child > div {
  margin-right: 20px;
  display: flex;
  align-items: center;
  cursor: pointer;
}

.workspaceNew_bottom > div:last-child > div:first-child {
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
}

.workspaceNew_bottom > div:last-child > div:first-child > div {
  display: flex;
  align-items: center;
}

.workspaceNew_bottom > div:last-child > div:first-child > div:first-child {
  color: #333;
  font-family: PingFang SC;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
}

.workspaceNew_bottom > div:last-child > div:first-child > div:last-child {
  color: #666;
  font-family: PingFang SC;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
}

.workspaceNew_bottom > div:last-child > div:last-child {
  color: #666;
  font-family: PingFang SC;
  font-size: 11px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
}

.share {
  flex-shrink: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  color: #1f64ff;
}

.share div {
  text-align: center;
  font-family: PingFang SC;
  font-size: 13px;
  font-style: normal;
  font-weight: 500;
  line-height: 150%;
  /* 21px */
}

.senior-box {
  display: flex;
  justify-content: space-between;
}

.senior-box .el-input-number {
  width: 100% !important;
}

.senior-box > div:nth-child(1) {
  width: calc(100% - 60px - 30px);
}

.senior-box > div:nth-child(2),
.senior-box > div:nth-child(3) {
  width: 35px;
  text-align: center;
  line-height: 35px;
  border: 1px solid #ccc;
  border-radius: 5px;
  cursor: pointer;
}

.tab {
  overflow-x: hidden;
  overflow-y: auto;
  width: 100%;
  height: 100%;
  padding: 0px 15px;
  padding-bottom: 30px;
  box-sizing: border-box;
}

.teb-content {
  width: 100%;
  display: flex;
  box-sizing: border-box;
  transition: all 1s;
  position: relative;
  left: 0%;
  /* padding-right: 20px; */
}

.boxTransition {
  opacity: 1 !important;
  transition: all 1s;
}

.tabTransition {
  left: -100%;
  transition: all 1s;
}

.tab-box {
  width: 100%;
  box-sizing: border-box;
  opacity: 0;
}

.noHistory {
  text-align: center;
  padding: 15px;
  box-sizing: border-box;
  font-size: 14px;
  color: #ccc;
  margin: auto;
}

.remind {
  color: #666;

  font-family: PingFang SC;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;

  margin-bottom: 10px;
}

.model-price {
  font-size: 12px;
  margin-top: 10px;
}

.draw-chat {
  background-color: #f1f2f5;
  display: flex;
  width: 100%;
  height: calc(100vh - 100px);
  border-left: 1px solid #f1f2f5;
  box-sizing: border-box;
}

.ai_list_btn {
  margin-top: 10px;
  display: flex;
  justify-content: center;
  background-color: #ffffff;
  padding: 4px;
  border-radius: 4px;
}

.draw-chat .main {
  width: calc(100% - 20%);
  height: 100%;
  overflow-y: auto;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.draw-chat .main .top_title {
  text-align: center;
}

.workspace_main {
  display: flex;
  justify-content: center;
  position: relative;
  top: -40px;
  /* height: calc(100% - 410px); */
}

.workspace_main .img_msk {
  width: 450px;
  height: 450px;
  background-color: #ffffff;
  border-radius: 4px;
  position: relative;
  /* top: -40px; */
  overflow: hidden;
  display: flex;
}

.workspace_main .img_msk .btn {
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  background-color: #1f64ff;
  color: #ffffff;
  z-index: 5;
  border: none;
}

.example_title {
  position: absolute;
  top: 0;
  right: 0;
  padding: 5px 10px;
  border-bottom-left-radius: 5px;
  background-color: rgba(0, 0, 0, 0.5);
  color: #ffffff;
  z-index: 5;
}

.workspace_mask {
  position: relative;
  /* top: -40px; */
  display: flex;
  align-items: center;
  /* flex-wrap: nowrap; */
}
.upload-image {
  width: 450px;
  height: 450px;
  background: #fff;
  border-radius: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.upload-image .uploadImg {
  width: 150px;
  height: 54px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white !important;
  border-radius: 4px;
  background: #1f64ff;
  text-align: center;
  font-family: PingFang SC;
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
}

.upload-image .uploadImg div {
  margin-left: 5px;
}
.upload-image /deep/ .el-upload {
  height: 20px;
  background: rgba(0, 0, 0, 0);
  border: 0px;
}
.filter_img {
  width: 100%;
  height: 100%;
  filter: blur(50px);
  position: absolute;
  z-index: 1;
  object-fit: cover;
}

.workspace_main .img_msk .img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  position: absolute;
  z-index: 2;
}

.functional_area {
  display: flex;
  align-items: center;
  justify-content: right;
  /* background-color: #FFFFFF; */
  /* padding: 34px 23px; */
  /* border-radius: 8px; */
  margin-top: 20px;
}

.functional_area .help-setpon-img {
  /* margin-bottom: 10px; */
  cursor: pointer;
  margin-right: 10px;
}

.example_list {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 140px;
}

.example_mask {
  width: 490px;
  display: flex;
  flex-wrap: wrap;
}

.example_mask .item {
  margin: 10px;
  width: 100px;
  height: 100px;
  border-radius: 8px;
  border: 1px solid transparent;
}

.example_mask .item-on {
  border-color: #1f64ff;
}

.example_mask .item .img {
  width: 100%;
  border-radius: 8px;
}

.user_input_area {
  position: absolute;
  bottom: 40px;
  z-index: 10;
  width: 100%;
  box-sizing: border-box;
  display: flex;
  /* flex-direction: column; */
  /* justify-content: center; */
  align-items: center;
}

.title_area {
  width: calc(90% - 25px);
  height: 44px;
  display: flex;
  justify-content: space-between;
  color: #000;
  font-size: 12px;
  font-weight: 400;
  padding: 0px 20px;
  background-color: #e8eefc;
  position: absolute;
  left: 50%;
  top: -45px;
  z-index: -1;
  transform: translate(-50%);
  border-radius: 8px 8px 0 0;
}

.input_area {
  width: calc(90%);
  display: flex;
  padding: 8px;
  background-color: #ffffff;
  border-radius: 8px;
  margin: auto;
}

.draw-chat .work_area {
  width: calc(25% + 40px);
  height: 100%;
  overflow-y: auto;
  background-color: #ffffff;
  /* padding: 0 20px; */
}

.draw-chat .work_area:nth-child(2) {
  width: 260px;
  height: 100%;
  overflow-y: auto;
  /* background-color: red;s */
  padding: 0 20px;
}

.select_workspaceNew {
  display: flex;
  padding: 4px;
  border-radius: 8px;
  background: #f4f4f7;
  width: 160px;
  height: 35px;
  color: #4e5969;
  font-family: PingFang SC;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 22px;
  /* 157.143% */
}

.select_workspaceNew > div {
  width: 80px;
  cursor: pointer;
  line-height: 35px;
  border-radius: 6px;
  text-align: center;
}

.select_workspace {
  border-bottom: 1px solid #efeff2;
  display: flex;
  color: #666;
  padding: 20px 0;
  padding-bottom: 4px;
  font-size: 14px;
  font-weight: 400;
  position: sticky;
  top: 0;
  margin-bottom: 10px;
  background-color: #ffffff;
}

.select_workspace .item {
  margin-right: 20px;
  cursor: pointer;
  border-bottom: 1px solid white;
}

.select_workspace .item-on {
  color: #1f64ff;
  font-weight: 500;
  cursor: pointer;
  border-bottom: 1px solid #1f64ff;
}

.workSpace_area-title {
  color: #000;
  font-size: 12px;
  font-weight: 500;
  display: flex;
  align-items: center;
  margin: 20px 0 10px 0;
}

.workSpace_area {
  width: 100%;
}

.workSpace_area .typesof .msak {
  display: flex;
}

.workSpace_area .typesof .msak .item {
  padding: 8px 16px;
  border: 1px solid #f4f4f7;
  background-color: #f4f4f7;
  cursor: pointer;
  margin: 10px 10px 10px 0;
}

.workSpace_area .typesof .msak .item-on {
  color: #1f64ff;
  border-color: #1f64ff;
  background-color: transparent;
}

.size_mask {
  width: 100%;
  height: 106px;
  display: flex;
  /* justify-content: space-between; */
  flex-wrap: wrap;
  overflow-y: auto;
  padding-bottom: 10px;
}

.size_mask .item {
  width: 92px;
  height: 92px;
  margin-bottom: 10px;
  margin-right: 10px;
  flex-shrink: 0;
  border-radius: 8px;
  background-color: #f4f4f7;
  border: 1px solid #f4f4f7;
  cursor: pointer;
}

.size_mask .item-on {
  background-color: transparent;
  border-color: #1f64ff;
}

.box_mask {
  width: 100%;
  height: 68px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.size_mask .item .box {
  border: 1px solid #7a7a7a;
  width: 40px;
  height: 40px;
}

.size_mask .item .size {
  text-align: center;
  color: #222;
  font-size: 12px;
  font-weight: 400;
}

.style_mask {
  /* display: flex; */
  width: 100%;
  height: 270px;
  overflow-y: auto;
  padding-bottom: 10px;
}

.style_mask::-webkit-scrollbar-thumb {
  background-color: #dedede;
}

.style_mask .item {
  border: 2px solid transparent;
  position: relative;
  display: flex;
  width: calc(100% / 3 - 5px);
  justify-content: center;
  /* margin-right: 10px; */
  /* width: 100%; */
  border-radius: 8px;
}

.style_mask .item .img {
  border-radius: 8px;
  width: 100%;
}

.style_mask .item-on {
  border-color: #1f64ff;
}

.style_mask .item .title {
  position: absolute;
  bottom: 0px;
  color: #fff;
  text-align: center;
  font-size: 12px;
  font-weight: 500;
  border-radius: 4px;
  background: rgba(0, 0, 0, 0.5);
  width: 100%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.history-list {
  height: calc(100% - 104px);
  overflow-y: auto;
}

.history-list .mask {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}

.history-list .item {
  width: calc(100% / 2 - 5px);
  height: calc(100% / 2 - 5px);
  margin-bottom: 5px;
  position: relative;
}

.history-list .item .del {
  display: none;
  font-size: 20px;
  color: #ffffff;
  position: absolute;
  right: 0px;
  top: 0px;
  cursor: pointer;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 2px;
  border-radius: 4px;
}

.history-list .item:hover .del {
  display: inline-block;
}

.history-list .item .img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.history-list .item .img-on {
  border: 1px solid #1f64ff;
}

.bottom_mask {
  position: fixed;
  bottom: 0;
  height: 40px;
  width: calc(100% - 640px);
  background-color: #f1f2f5;
  z-index: 100;
}

.title_prompt {
  color: #9a9a9a;
  font-size: 14px;
  font-weight: 400;
  line-height: 20px;
}

.draw-result-tips {
  display: flex;
  justify-content: center;
  position: absolute;
  bottom: 0;
  width: 100%;
  z-index: 3;
  font-size: 12px;
  padding: 8px 0;
  color: #ffffff;
  background-color: rgba(0, 0, 0, 0.5);
}

.tips_img {
  width: 16px;
  height: 16px;
  margin-right: 10px;
}

@media (height < 800px) {
  .img_msk {
    width: 400px !important;
    height: 400px !important;
  }

  .user_input_area {
    bottom: 20px;
  }
}
</style>

<style scoped>
.ai_list_btn .chat-ai-btn-list {
  color: #333;
  padding: 8px 12px;
  font-size: 14px;
  font-weight: 500;
  background-color: #fff;
  margin-left: 0;
  border: none;
}

.user_btn input {
  border: none;
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

.upload-file-code .el-upload {
  width: 80px;
  height: 80px;
  background-color: #f2f3f5;
}

.upload-file-code .el-upload-list .el-upload-list__item {
  width: 80px;
  height: 80px;
  margin-bottom: 0;
}

.upload-btn {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
}

.upload-btn .btn-mask {
  line-height: 24px;
  margin: auto;
  font-size: 14px;
}

.input_textarea textarea {
  height: 80px;
}
</style>
