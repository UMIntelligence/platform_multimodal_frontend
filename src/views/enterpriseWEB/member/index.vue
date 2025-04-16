<template>
  <!-- 成员管理 -->
  <div class="main">
    <div class="nav">
      <div
        :class="nav_active == 0 ? 'nav-item check' : 'nav-item'"
        @click="handleNav(0)"
      >
        成员管理
      </div>
      <div
        :class="nav_active == 1 ? 'nav-item check' : 'nav-item'"
        @click="handleNav(1)"
      >
        团队管理
      </div>
      <div
        :class="nav_active == 2 ? 'nav-item check' : 'nav-item'"
        @click="handleNav(2)"
      >
        职位维护
      </div>
      <!-- 线 -->
      <div class="nav-line" :style="{ left: nav_position + 'px' }"></div>
    </div>
    <div class="container">
      <div class="left">
        <div class="left-menu">
          <div class="menu-top">
            <div>{{ nav_active == 0?'部门':nav_active == 1?'团队':'职位'}}</div>
            <img
              :src="httpUrls.ossUrl + 'xcx/com/message_center/Subtract@2x.png'"
              alt=""
              @click="addMember()"
            />
          </div>
          <el-menu
            default-active="2"
            class="el-menu-vertical-demo"
            background-color="#FFFFFF"
            text-color="#333"
            active-text-color="#1f64ff"
            :unique-opened="true"
          >
            <el-submenu index="1" v-if="nav_active == 0">
              <template slot="title">
                <div class="el-submenu-div">
                  <img class="menu-img" src="https://umi-intelligence.oss-cn-shenzhen.aliyuncs.com/xcx/com/message_center/Group_427319899@2x (1).png" alt="">
                  <span>小杨哥的团队</span>
                  <!-- 操作栏 -->
                  <div class="right-bar" @click.stop>
                    <el-tooltip
                      class="item"
                      effect="dark"
                      content="更多"
                      placement="top-end"
                    >
                      <el-popover
                        placement="bottom-start"
                        width="180"
                        popper-class="customPopper"
                        trigger="click"
                      >
                        <div class="right-btn">
                          <div class="right-btn-item" @click="departmentAdd">
                            <img :src="addImg" alt="" />
                            <div>新建部门</div>
                          </div>
                          <!-- <div class="right-btn-item">
                            <img :src="editImg" alt="" />
                            <div>编辑</div>
                          </div>
                          <div class="right-btn-item">
                            <img :src="deleteImg" alt="" />
                            <div>删除</div>
                          </div> -->
                        </div>
                        <img
                          :src="circularImg"
                          class="circularImg"
                          alt=""
                          slot="reference"
                        />
                      </el-popover>
                    </el-tooltip>
                  </div>
                </div>
              </template>
              <el-submenu index="1-4">
                <template slot="title">
                  <el-input class="menu-input" v-show="false" ref="submenuInput1-4"  @blur="handleInputConfirm('submenuInput1-4')" v-model="input1"/>
                  <div class="el-submenu-div" v-show="true">
                    <span>行政部</span>
                    <div class="right-bar" @click.stop>
                      <el-tooltip
                        class="item"
                        effect="dark"
                        content="更多"
                        placement="top-end"
                      >
                        <el-popover
                          placement="bottom-start"
                          width="180"
                          popper-class="customPopper"
                          trigger="click"
                        >
                          <div class="right-btn">
                            <div class="right-btn-item" v-if="nav_active == 0" @click="departmentAdd">
                              <img :src="addImg" alt="" />
                              <div>新建子部门</div>
                            </div>
                            <div class="right-btn-item" @click="editSubmenuTitle('submenuInput1-4')">
                              <img :src="editImg" alt="" />
                              <div>编辑</div>
                            </div>
                            <div class="right-btn-item delete">
                              <img :src="deleteImg" alt="" />
                              <div>删除</div>
                            </div>
                          </div>
                          <img
                            :src="circularImg"
                            class="circularImg"
                            alt=""
                            slot="reference"
                          />
                        </el-popover>
                      </el-tooltip>
                    </div>
                  </div>
                </template>
                <el-menu-item index="1-4-1">
                  <el-input class="menu-input" v-show="false" ref="submenuInput1-4-1"  @blur="handleInputConfirm('submenuInput1-4-1')" v-model="input1"/>
                  <div class="child-menu_name">
                    <span>行政1部</span>
                    <div class="right-bar" @click.stop>
                      <el-tooltip
                        class="item"
                        effect="dark"
                        content="更多"
                        placement="top-end"
                      >
                        <el-popover
                          placement="bottom-start"
                          width="180"
                          popper-class="customPopper"
                          trigger="click"
                        >
                          <div class="right-btn">
                            <div class="right-btn-item" v-if="nav_active == 0" @click="departmentAdd">
                              <img :src="addImg" alt="" />
                              <div>新建子部门</div>
                            </div>
                            <div class="right-btn-item"  @click="editSubmenuTitle('submenuInput1-4-1')">
                              <img :src="editImg" alt="" />
                              <div>编辑</div>
                            </div>
                            <div class="right-btn-item delete">
                              <img :src="deleteImg" alt="" />
                              <div>删除</div>
                            </div>
                          </div>
                          <img
                            :src="circularImg"
                            class="circularImg"
                            alt=""
                            slot="reference"
                          />
                        </el-popover>
                      </el-tooltip>
                    </div>
                  </div>
                </el-menu-item>
                <el-menu-item index="1-4-2">
                  <el-input class="menu-input" v-show="false" ref="submenuInput1-4-2"  @blur="handleInputConfirm('submenuInput1-4-2')" v-model="input1"/>
                  <div class="child-menu_name">
                    <span>行政2部</span>
                    <div class="right-bar" @click.stop>
                      <el-tooltip
                        class="item"
                        effect="dark"
                        content="更多"
                        placement="top-end"
                      >
                        <el-popover
                          placement="bottom-start"
                          width="180"
                          popper-class="customPopper"
                          trigger="click"
                        >
                          <div class="right-btn">
                            <div class="right-btn-item" v-if="nav_active == 0" @click="departmentAdd">
                              <img :src="addImg" alt="" />
                              <div>新建子部门</div>
                            </div>
                            <div class="right-btn-item"  @click="editSubmenuTitle('submenuInput1-4-2')">
                              <img :src="editImg" alt="" />
                              <div>编辑</div>
                            </div>
                            <div class="right-btn-item delete">
                              <img :src="deleteImg" alt="" />
                              <div>删除</div>
                            </div>
                          </div>
                          <img
                            :src="circularImg"
                            class="circularImg"
                            alt=""
                            slot="reference"
                          />
                        </el-popover>
                      </el-tooltip>
                    </div>
                  </div>
                </el-menu-item>
              </el-submenu>
              <el-menu-item index="12">
                <el-input class="menu-input" v-show="false" ref="submenuInput12"  @blur="handleInputConfirm('submenuInput12')" v-model="input1"/>
                <span class="child-menu_name" v-show="true">
                  <span>运营部</span>
                  <div class="right-bar" @click.stop>
                    <el-tooltip
                      class="item"
                      effect="dark"
                      content="更多"
                      placement="top-end"
                    >
                      <el-popover
                        placement="bottom-start"
                        width="180"
                        popper-class="customPopper"
                        trigger="click"
                      >
                        <div class="right-btn">
                          <div class="right-btn-item" @click="editSubmenuTitle('submenuInput12')">
                            <img :src="editImg" alt="" />
                            <div>编辑</div>
                          </div>
                          <div class="right-btn-item delete">
                            <img :src="deleteImg" alt="" />
                            <div>删除</div>
                          </div>
                        </div>
                        <img
                          :src="circularImg"
                          class="circularImg"
                          alt=""
                          slot="reference"
                        />
                      </el-popover>
                    </el-tooltip>
                  </div>
                </span>
              </el-menu-item>
            </el-submenu>
            <el-submenu index="1" v-if="nav_active == 1">
              <template slot="title">
                <el-input class="menu-input" v-show="false" ref="submenuInput1"  @blur="handleInputConfirm('submenuInput1')" v-model="input1"/>
                <div class="el-submenu-div">
                  <img class="menu-img" src="https://umi-intelligence.oss-cn-shenzhen.aliyuncs.com/xcx/com/message_center/Group_427319899@2x (1).png" alt="">
                  <span>小杨哥的团队</span>
                  <!-- 操作栏 -->
                  <div class="right-bar" @click.stop>
                    <el-tooltip
                      class="item"
                      effect="dark"
                      content="更多"
                      placement="top-end"
                    >
                      <el-popover
                        placement="bottom-start"
                        width="180"
                        popper-class="customPopper"
                        trigger="click"
                      >
                        <div class="right-btn">
                          <div class="right-btn-item" @click="editSubmenuTitle('submenuInput1')">
                            <img :src="editImg" alt="" />
                            <div>编辑</div>
                          </div>
                          <div class="right-btn-item delete">
                            <img :src="deleteImg" alt="" />
                            <div>删除</div>
                          </div>
                        </div>
                        <img
                          :src="circularImg"
                          class="circularImg"
                          alt=""
                          slot="reference"
                        />
                      </el-popover>
                    </el-tooltip>
                  </div>
                </div>
              </template>
              <el-submenu index="1-4">
                <template slot="title">
                  <div class="el-submenu-div">
                    <span>选项四</span>
                    <div class="right-bar" @click.stop>
                      <el-tooltip
                        class="item"
                        effect="dark"
                        content="更多"
                        placement="top-end"
                      >
                        <el-popover
                          placement="bottom-start"
                          width="180"
                          popper-class="customPopper"
                          trigger="click"
                        >
                          <div class="right-btn">
                            <div class="right-btn-item" v-if="nav_active == 0">
                              <img :src="addImg" alt="" />
                              <div>新建子部门</div>
                            </div>
                            <div class="right-btn-item" @click="editTeam()">
                              <img :src="editImg" alt="" />
                              <div>编辑</div>
                            </div>
                            <div class="right-btn-item delete">
                              <img :src="deleteImg" alt="" />
                              <div>删除</div>
                            </div>
                          </div>
                          <img
                            :src="circularImg"
                            class="circularImg"
                            alt=""
                            slot="reference"
                          />
                        </el-popover>
                      </el-tooltip>
                    </div>
                  </div>
                </template>
                <el-menu-item index="1-4-1">
                  <div class="child-menu_name">
                    <span>选项4-1</span>
                    <div class="right-bar" @click.stop>
                      <el-tooltip
                        class="item"
                        effect="dark"
                        content="更多"
                        placement="top-end"
                      >
                        <el-popover
                          placement="bottom-start"
                          width="180"
                          popper-class="customPopper"
                          trigger="click"
                        >
                          <div class="right-btn">
                            <div class="right-btn-item" v-if="nav_active == 0">
                              <img :src="addImg" alt="" />
                              <div>新建子部门</div>
                            </div>
                            <div class="right-btn-item">
                              <img :src="editImg" alt="" />
                              <div>编辑</div>
                            </div>
                            <div class="right-btn-item delete">
                              <img :src="deleteImg" alt="" />
                              <div>删除</div>
                            </div>
                          </div>
                          <img
                            :src="circularImg"
                            class="circularImg"
                            alt=""
                            slot="reference"
                          />
                        </el-popover>
                      </el-tooltip>
                    </div>
                  </div>
                </el-menu-item>
              </el-submenu>
              <el-menu-item index="12">
                <el-input class="menu-input" v-show="false" ref="submenuInput12" @blur="handleInputConfirm('submenuInput12')" v-model="input1"/>
                <span class="child-menu_name">
                  <span>第二级</span>
                  <div class="right-bar" @click.stop>
                    <el-tooltip
                      class="item"
                      effect="dark"
                      content="更多"
                      placement="top-end"
                    >
                      <el-popover
                        placement="bottom-start"
                        width="180"
                        popper-class="customPopper"
                        trigger="click"
                      >
                        <div class="right-btn">
                          <div class="right-btn-item" v-if="nav_active == 0">
                            <img :src="addImg" alt="" />
                            <div>新建子部门</div>
                          </div>
                          <div class="right-btn-item" @click="editSubmenuTitle('submenuInput12')">
                            <img :src="editImg" alt="" />
                            <div>编辑</div>
                          </div>
                          <div class="right-btn-item delete">
                            <img :src="deleteImg" alt="" />
                            <div>删除</div>
                          </div>
                        </div>
                        <img
                          :src="circularImg"
                          class="circularImg"
                          alt=""
                          slot="reference"
                        />
                      </el-popover>
                    </el-tooltip>
                  </div>
                </span>
              </el-menu-item>
            </el-submenu>
            <el-submenu index="1" v-if="nav_active == 2">
              <template slot="title">
                <el-input class="menu-input" v-show="false" ref="submenuInput1"  @blur="handleInputConfirm('submenuInput1')" v-model="input1"/>
                <div class="el-submenu-div">
                  <img class="menu-img" src="https://umi-intelligence.oss-cn-shenzhen.aliyuncs.com/xcx/com/message_center/Group_427319899@2x (1).png" alt="">
                  <span>小杨哥的团队</span>
                  <!-- 操作栏 -->
                  <div class="right-bar" @click.stop>
                    <el-tooltip
                      class="item"
                      effect="dark"
                      content="更多"
                      placement="top-end"
                    >
                      <el-popover
                        placement="bottom-start"
                        width="180"
                        popper-class="customPopper"
                        trigger="click"
                      >
                        <div class="right-btn">
                          <div class="right-btn-item" @click="editSubmenuTitle('submenuInput1')">
                            <img :src="editImg" alt="" />
                            <div>编辑</div>
                          </div>
                          <div class="right-btn-item delete">
                            <img :src="deleteImg" alt="" />
                            <div>删除</div>
                          </div>
                        </div>
                        <img
                          :src="circularImg"
                          class="circularImg"
                          alt=""
                          slot="reference"
                        />
                      </el-popover>
                    </el-tooltip>
                  </div>
                </div>
              </template>
              <el-submenu index="1-4">
                <template slot="title">
                  <div class="el-submenu-div">
                    <span>技术</span>
                    <div class="right-bar" @click.stop>
                      <el-tooltip
                        class="item"
                        effect="dark"
                        content="更多"
                        placement="top-end"
                      >
                        <el-popover
                          placement="bottom-start"
                          width="180"
                          popper-class="customPopper"
                          trigger="click"
                        >
                          <div class="right-btn">
                            <div class="right-btn-item" @click="editTeam()">
                              <img :src="editImg" alt="" />
                              <div>编辑</div>
                            </div>
                            <div class="right-btn-item delete">
                              <img :src="deleteImg" alt="" />
                              <div>删除</div>
                            </div>
                          </div>
                          <img
                            :src="circularImg"
                            class="circularImg"
                            alt=""
                            slot="reference"
                          />
                        </el-popover>
                      </el-tooltip>
                    </div>
                  </div>
                </template>
                <el-menu-item index="1-4-1">
                  <el-input class="menu-input" v-show="false" ref="submenuInput1-4-1"  @blur="handleInputConfirm('submenuInput1-4-1')" v-model="input1"/>
                  <div class="child-menu_name">
                    <span>前端开发工程师</span>
                    <div class="right-bar" @click.stop>
                      <el-tooltip
                        class="item"
                        effect="dark"
                        content="更多"
                        placement="top-end"
                      >
                        <el-popover
                          placement="bottom-start"
                          width="180"
                          popper-class="customPopper"
                          trigger="click"
                        >
                          <div class="right-btn">
                            <div class="right-btn-item" @click="editSubmenuTitle('submenuInput1-4-1')">
                              <img :src="editImg" alt="" />
                              <div>编辑</div>
                            </div>
                            <div class="right-btn-item delete">
                              <img :src="deleteImg" alt="" />
                              <div>删除</div>
                            </div>
                          </div>
                          <img
                            :src="circularImg"
                            class="circularImg"
                            alt=""
                            slot="reference"
                          />
                        </el-popover>
                      </el-tooltip>
                    </div>
                  </div>
                </el-menu-item>
                <el-menu-item index="1-4-2">
                  <el-input class="menu-input" v-show="false" ref="submenuInput1-4-2"  @blur="handleInputConfirm('submenuInput1-4-2')" v-model="input1"/>

                  <div class="child-menu_name">
                    <span>后端开发工程师</span>
                    <div class="right-bar" @click.stop>
                      <el-tooltip
                        class="item"
                        effect="dark"
                        content="更多"
                        placement="top-end"
                      >
                        <el-popover
                          placement="bottom-start"
                          width="180"
                          popper-class="customPopper"
                          trigger="click"
                        >
                          <div class="right-btn">
                            <div class="right-btn-item" @click="editSubmenuTitle('submenuInput1-4-2')">
                              <img :src="editImg" alt="" />
                              <div>编辑</div>
                            </div>
                            <div class="right-btn-item delete">
                              <img :src="deleteImg" alt="" />
                              <div>删除</div>
                            </div>
                          </div>
                          <img
                            :src="circularImg"
                            class="circularImg"
                            alt=""
                            slot="reference"
                          />
                        </el-popover>
                      </el-tooltip>
                    </div>
                  </div>
                </el-menu-item>
                <el-menu-item index="1-4-3">
                  <el-input class="menu-input" v-show="false" ref="submenuInput1-4-3"  @blur="handleInputConfirm('submenuInput1-4-3')" v-model="input1"/>
                  <div class="child-menu_name">
                    <span>技术总监</span>
                    <div class="right-bar" @click.stop>
                      <el-tooltip
                        class="item"
                        effect="dark"
                        content="更多"
                        placement="top-end"
                      >
                        <el-popover
                          placement="bottom-start"
                          width="180"
                          popper-class="customPopper"
                          trigger="click"
                        >
                          <div class="right-btn">
                            <div class="right-btn-item" @click="editSubmenuTitle('submenuInput1-4-3')">
                              <img :src="editImg" alt="" />
                              <div>编辑</div>
                            </div>
                            <div class="right-btn-item delete">
                              <img :src="deleteImg" alt="" />
                              <div>删除</div>
                            </div>
                          </div>
                          <img
                            :src="circularImg"
                            class="circularImg"
                            alt=""
                            slot="reference"
                          />
                        </el-popover>
                      </el-tooltip>
                    </div>
                  </div>
                </el-menu-item>
              </el-submenu>
              <el-submenu index="1-5">
                <template slot="title">
                  <div class="el-submenu-div">
                    <span>设计</span>
                    <div class="right-bar" @click.stop>
                      <el-tooltip
                        class="item"
                        effect="dark"
                        content="更多"
                        placement="top-end"
                      >
                        <el-popover
                          placement="bottom-start"
                          width="180"
                          popper-class="customPopper"
                          trigger="click"
                        >
                          <div class="right-btn">
                            <div class="right-btn-item" @click="editTeam()">
                              <img :src="editImg" alt="" />
                              <div>编辑</div>
                            </div>
                            <div class="right-btn-item delete">
                              <img :src="deleteImg" alt="" />
                              <div>删除</div>
                            </div>
                          </div>
                          <img
                            :src="circularImg"
                            class="circularImg"
                            alt=""
                            slot="reference"
                          />
                        </el-popover>
                      </el-tooltip>
                    </div>
                  </div>
                </template>
                <el-menu-item index="1-4-1">
                  <div class="child-menu_name">
                    <span>设计总监</span>
                    <div class="right-bar" @click.stop>
                      <el-tooltip
                        class="item"
                        effect="dark"
                        content="更多"
                        placement="top-end"
                      >
                        <el-popover
                          placement="bottom-start"
                          width="180"
                          popper-class="customPopper"
                          trigger="click"
                        >
                          <div class="right-btn">
                            <div class="right-btn-item">
                              <img :src="editImg" alt="" />
                              <div>编辑</div>
                            </div>
                            <div class="right-btn-item delete">
                              <img :src="deleteImg" alt="" />
                              <div>删除</div>
                            </div>
                          </div>
                          <img
                            :src="circularImg"
                            class="circularImg"
                            alt=""
                            slot="reference"
                          />
                        </el-popover>
                      </el-tooltip>
                    </div>
                  </div>
                </el-menu-item>
                <el-menu-item index="1-4-2">
                  <div class="child-menu_name">
                    <span>ui设计师</span>
                    <div class="right-bar" @click.stop>
                      <el-tooltip
                        class="item"
                        effect="dark"
                        content="更多"
                        placement="top-end"
                      >
                        <el-popover
                          placement="bottom-start"
                          width="180"
                          popper-class="customPopper"
                          trigger="click"
                        >
                          <div class="right-btn">
                            <div class="right-btn-item">
                              <img :src="editImg" alt="" />
                              <div>编辑</div>
                            </div>
                            <div class="right-btn-item delete">
                              <img :src="deleteImg" alt="" />
                              <div>删除</div>
                            </div>
                          </div>
                          <img
                            :src="circularImg"
                            class="circularImg"
                            alt=""
                            slot="reference"
                          />
                        </el-popover>
                      </el-tooltip>
                    </div>
                  </div>
                </el-menu-item>
              </el-submenu>
            </el-submenu>
          </el-menu>
        </div>
      </div>
      <div class="right">
        <!-- 成员管理 -->
        <memberManagement ref="memberRef" v-if="nav_active == 0"></memberManagement>
        <!-- 团队管理 -->
        <teamManagement ref="teamRef" v-else-if="nav_active == 1"></teamManagement>
        <!-- 职位维护 -->
        <duties ref="dutRef" v-else></duties>
      </div>
    </div>
    <!-- 添加成员 -->
    <addMember ref="meberRef"></addMember>
  </div>
</template>

<script>
import httpUrls from "../../../api/requestURL";
import { throttle } from "@/utils/util.js";
import duties from "./duties";
import memberManagement from "./memberManagement";
import teamManagement from "./teamManagement";
import addMember from "./components/addMember.vue";


import { nextTick } from 'vue';
export default {
  data() {
    return {
      nav_active: 0, //选中nav
      nav_position: 22, //偏移
      httpUrls,
      circularImg:
        httpUrls.ossUrl +
        "static/picture/d864fc17-e118-4133-87d2-c7bf02e8b905.png",
      addImg:
        httpUrls.ossUrl +
        "xcx/com/message_center/vuesax_linear_add-circle@2x.png",
      editImg:
        httpUrls.ossUrl + "xcx/com/message_center/General _ Edit 3@2x.png",
      deleteImg:
        httpUrls.ossUrl + "xcx/com/message_center/vuesax_linear_trash@2x.png",
      menuKey: null,
      input1:"",
    };
  },
  components:{
    duties,
    memberManagement,
    teamManagement,
    addMember
  },
  methods: {
    handleNav(number) {
      this.nav_active = number;
      this.nav_position = 22 + 86 * number;
    },
    handleMoveMeny(num) {
      this.menuKey = num;
    },
    throttledHandleMoveMeny: throttle(function (num) {
      this.handleMoveMeny(num);
    }, 1500),
    handleLeaveMeny(dom) {
      this.menuKey = null;
    },
    //添加成员
    addMember(){
      if(this.nav_active == 0 || this.nav_active == 1 ){
        this.$refs.meberRef.dialogVisible = true
        // this.$refs.memberRef.dialogVisible = true;
      }else if(this.nav_active == 2){
        this.$refs.dutRef.dialogVisible = true;
      }
      
    },
    //新建部门
    departmentAdd(){
      this.$refs.memberRef.departmentVisible = true;
    },
    //编辑团队
    editTeam(){
      this.$refs.teamRef.editVisible = true;
    },
    //编辑组名/文本框
    editSubmenuTitle(refDom){
      // console.log(this.$refs[refDom].$el.nextElementSibling)
      //显示文本框
      this.$refs[refDom].$el.style.display = 'block'
      //隐藏submenu组件
      this.$refs[refDom].$el.nextElementSibling.style.display = 'none'
      nextTick(() => {
        this.$refs[refDom].focus();
      })
    },
    //menu input框失去焦点事件
    handleInputConfirm(refDom){
      //隐藏文本框
      this.$refs[refDom].$el.style.display = 'none'
      //显示submenu组件
      this.$refs[refDom].$el.nextElementSibling.style.display = 'flex'
    }
  },
};
</script>

<style lang="scss" scoped>
/deep/ .el-submenu__icon-arrow {
  right: auto !important;
  left: 20px !important;
  // transform: rotateZ(0deg) !important;
}
// /deep/ .el-dialog__header,.el-dialog__body{
//   padding: 0px !important;
// }
.menu-input{
  width: 220px;
  height: 35px !important;
  position: absolute;
  left: 50%;
  top: 0px;
  transform: translateX(-50%);
  z-index: 3000;
}
.menu-input /deep/ .el-input__inner{
  height: 100%;
}
.el-menu-vertical-demo {
  padding-top: 0px;
  .el-submenu-div {
    width: calc(100% - 30px);
    display: flex;
    align-items: center;
    margin-left: 30px;
    position: relative;
  }
  .el-submenu{
    padding: 0px 10px !important;
    box-sizing: border-box !important;
  }
  .el-submenu .el-submenu{
    padding: 0px !important;
  }
  .el-submenu .el-submenu .el-submenu-div {
    width: 100% !important;
    .right-bar {
      right: 4px !important;
    }
  }
  .menu-img {
    width: 16px;
    height: 16px;
    margin-right: 5px;
  }
  /deep/ .el-submenu__title {
    height: 40px !important;
    border-radius: 4px !important;
    line-height: 40px !important;
    position: relative;
  }
  .el-submenu .el-submenu /deep/ .el-submenu__title {
    padding-left: 67px !important;
  }
  .el-submenu .el-submenu /deep/ .el-submenu__title .el-submenu-div {
    margin-left: 3px !important;
  }
  .el-menu-item {
    height: 40px !important;
    line-height: 40px !important;
    padding: 0 10px !important;
    margin: 0 10px;
    border-radius: 4px;
    display: flex !important;
    align-items: center !important;
    position: relative !important;
  }

  .el-menu-item-group__title {
    padding: 0px;
  }
  .el-submenu .el-submenu .child-menu_name {
    margin-left: 66px !important;
  }
  .child-menu_name {
    width: calc(100% - 36px);
    color: #333333;
    margin-left: 51px;
    position: relative;
    overflow: hidden;
    display: flex;
    align-items: center;
  }

  .child-menu_name-on {
    color: #1f64ff;
  }
  .el-popover {
    padding: 0px !important;
  }
  /deep/ .el-submenu__title:hover .el-submenu-div > .right-bar {
    opacity: 1 !important;
  }
  .el-menu-item:hover > .child-menu_name > .right-bar {
    opacity: 1 !important;
  }
}
.right-btn-item {
  display: flex;
  align-items: center;
  padding: 12px 15px;
  box-sizing: border-box;
  border-bottom: 1px solid #f2f2f2;
  cursor: pointer;
  img {
    width: 16px;
    height: 16px;
    margin-right: 8px;
  }
  div {
    font-weight: 500;
    font-size: 14px;
    color: #000000;
  }
}
.delete div{
  color: red !important;
}

.main {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  background: #F6F8FA;
  border-left: 1px solid #ebebeb;
  .nav {
    width: 100%;
    padding: 18px 22px;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    border-bottom: 1px solid #ebebeb;
    position: relative;
    margin: 0px;
    background: #ffffff;
    .nav-item {
      margin-right: 30px;
      font-weight: bold;
      font-size: 14px;
      color: #838999;
      cursor: pointer;
    }
    .nav-line {
      width: 56px;
      height: 2px;
      background: #3363f5;
      position: absolute;
      left: 0px;
      bottom: 0px;
      transition: all 0.6s;
    }
    .check {
      color: #3363f5 !important;
    }
  }
  .container{
    width: 100%;
    height: calc(100% - 56px);
    display: flex;
    align-items: center;
    
  }
  .left {
    width: 240px;
    height: 100%;
    overflow: auto;
    border-right: 1px solid #F2F2F2;
    background: #ffffff;
    .circularImg {
      width: 16px;
      height: 16px;
      transform: rotateZ(90deg);
      position: relative;
      top: -4px;
    }
    .right-bar {
      position: absolute;
      right: 0px;
      height: 40px;
      line-height: 40px;
      opacity: 0;
    }
    .right-btn .right-btn-item:nth-child(3):hover {
      color: red !important;
    }
    .menu-top {
      width: 100%;
      height: 54px;
      padding: 0px 20px;
      box-sizing: border-box;
      display: flex;
      align-items: center;
      justify-content: space-between;
      div {
        font-weight: bold;
        font-size: 16px;
        color: #000000;
      }
      img {
        width: 24px;
        height: 24px;
        cursor: pointer;
      }
    }
  }
  .right{
    width: calc(100% - 240px);
    height: 100%;
    // margin: 20px auto;
    // background: #ffffff;
    // border-radius: 10px 10px 10px 10px;
    overflow: auto;
    .right-top{
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
  }
}
</style>
