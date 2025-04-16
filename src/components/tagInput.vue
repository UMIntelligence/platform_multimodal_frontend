<template>
  <div class="tag-input">
    <!-- 父盒子 -->
    <div
      class="father_box"
      @click="fatherOnclick"
      :class="verify ? '' : 'notVerify'"
    >
      <!-- 生成的标签 -->
      <!-- <div v-for="(item, index) in deepTagsAll" :key="index" class="has-created">
        <span class="tag-title">{{ item }}</span>
        <a-icon type="close" class="i-close"  @click="removeTag(index, item)"/>
      </div> -->
      <el-tag
        class="tag"
        :key="index"
        v-for="(item, index) in deepTagsAll"
        closable
        :disable-transitions="false"
        @close="removeTag(index, item)"
      >
        {{ item }}
      </el-tag>
      <!-- 输入框 -->
      <input
        placeholder="请输入标签，逗号分隔创建标签"
        v-model="currentval"
        @keyup.enter="addTags"
        @keyup.delete="deleteTags"
        class="input-tag"
        ref="inputTag"
        type="text"
      />
    </div>
    <div v-show="!verify" class="verify-text">{{ verifyText }}</div>
  </div>
</template>
 
<script>
export default {
  name: "tagsInput",
  data() {
    return {
      // 输入框
      currentval: "",
      // 深拷贝tag
      // deepTagsAll: [],
      // 计算删除位置
      n: 0,
    };
  },
  props: {
    // 标签tags
    tags: {
      type: Array,
      default: () => {
        return [];
      },
    },
    // tag标签字符长度  默认99
    tagLength: {
      type: Number,
      default: 99,
    },
    // 标签个数限制
    tagNumLimit: {
      type: Number,
      default: 99,
    },
    // 是否直接去重  默认true自动去重，false不自动去重,页面提示
    repeat: {
      type: Boolean,
      default: true,
    },
    // 标签正则校验
    tagReg: {
      type: String,
      default: "",
    },
    // 校验 form校验不通过 false时border为红色不通过  true：为默认色通过
    verify: {
      type: Boolean,
      default: true,
    },
    // 校验不通过时文案提示
    verifyText: {
      type: String,
      default: "请输入",
    },
  },
  watch: {
    // 深度监听，避免父级组件接口返回数据过慢导致的页面组件数据不一致
    tags: {
      handler(newValue) {
        console.log(newValue, "newValue tags");
        this.deepTagsAll = newValue.length ? newValue : [];
      },
      deep: true, // 深度监听
    },

    currentval: {
      deep: true,
      handler() {
        let regex = /,|，/g; // 匹配英文逗号或中文逗号
        let result = regex.test(this.currentval); //正则匹配
        if (result) {
          this.addTags();
        }
      },
    },
    deepTagsAll: {
      //监听数据的变化并传值
      deep: true,
      handler() {
        this.sendTagsParams();
      },
    },
  },
  computed: {
    deepTagsAll: {
      get() {
        return this.tags;
      },
      set(value) {
        // 在这里可以对 tags 值进行处理，例如去重、排序等
        this.$emit("update:tags", value);
      },
    },
  },
  mounted() {
    // this.deepTagsAll = JSON.parse(JSON.stringify(this.tags))
  },
  methods: {
    // 点击叉叉删除tag
    removeTag(index, item) {
      this.deepTagsAll.splice(index, 1);
    },
    // 回车增加tag
    addTags() {
      // 新增函数中可以加一些你所需要的校验规则。比如只能是数子，或者不能输入‘，’等
      if (!this.currentval.length) return;
      // 限制标签个数
      if (this.deepTagsAll.length + 1 > this.tagNumLimit) {
        this.$message.warning("标签个数不能超过 " + this.tagNumLimit + " 个！");
        // 清空输入框
        this.currentval = "";
        return;
      }
      // 限制输入长度
      if (this.currentval.length > this.tagLength) {
        this.$message.warning(
          "单标签长度不能超过 " + this.tagLength + " 个字符！"
        );
        return;
      }
      // 根据父级参数实现页面是否自动去重
      // 标签自动去重
      if (this.repeat) {
        // 添加tag
        let regex = /,|，/g; // 匹配英文逗号或中文逗号
        let newStr = this.currentval.replace(regex, ""); // 替换逗号为空格
        this.deepTagsAll.push(newStr);
        this.deepTagsAll = Array.from(new Set(this.deepTagsAll));
        // 清空输入框
        this.currentval = "";
      } else {
        // 标签不需要自动去重 仅页面提示
        if (this.deepTagsAll.indexOf(this.currentval) > -1) {
          // 与已有标签重复 页面提示
          this.$message.warning("标签已存在");
        } else {
          // 与已有标签不重复 --> 添加tag
          this.deepTagsAll.push(this.currentval);
          // 清空输入框
          this.currentval = "";
        }
      }
    },
    // 键盘删除键删除tag
    deleteTags() {
      // 逻辑：当删除到最后一个字符的时候，删除后currentval为空，所以继续执行，n++。这时候n=1.然后判断n是否等于2，不等于不执行。
      // 这里是保证当你删除最后一个字符的时候不会执行删除tag的方法，当我们删完了字符后再按一次删除的时候，n就等于2了。就开始删除tag。
      // 当有多个tag时，我们连续删除，就会出现，因为currentval为空，所以一直执行n++，导致n不等于2了，所以没法删除后面的tag。
      // 所以增加判断，当n大于2的时候我们看tag的长度有没有，有那就继续删除，没有就归0，从来。
      if (this.currentval === "") {
        this.n++;
        if (this.n === 2) {
          this.deepTagsAll.pop();
        }
        if (this.n > 2) {
          if (this.deepTagsAll.length) {
            this.deepTagsAll.pop();
          } else {
            this.n = 0;
          }
        }
      } else {
        this.n = 0;
      }
    },
    // 点击父盒子输入框获取焦点
    fatherOnclick() {
      this.$nextTick(() => {
        this.$refs.inputTag.focus();
        this.$emit("update:verify", true);
      });
    },
    // 标签数据传递给父组件
    sendTagsParams() {
      this.$emit("getCustomTag", this.deepTagsAll);
    },
  },
};
</script>
 
<style scoped>
/* 外层div */
.father_box {
  width: 100%;
  box-sizing: border-box;
  background-color: white;
  border-radius: 4px;
  font-size: 12px;
  text-align: left;
  padding-left: 5px;
  word-wrap: break-word;
  overflow: hidden;
  display: flex;
  flex-wrap: wrap;
}
.tag {
  margin-left: 10px;
  margin-bottom: 10px;
  color: #1f64ff;
  background: #dde8ff;
}
.notVerify {
  border: 1px solid #f5222d;
}
.verify-text {
  color: #f5222d;
  font-size: 12px;
  transform: scale(0.9);
  margin-top: -10px;
  margin-left: -15px;
  height: 12px;
}
/* 已生成的标签 box */
.has-created {
  display: inline-block;
  font-size: 14px;
  margin: 3px 4px 3px 0;
  padding-right: 3px;
  background-color: #ecf5ff;
  border: 1px solid #e8eaec;
  border-radius: 3px;
  line-height: 24px;
}
/* 标签文字 */
.tag-title {
  height: 24px;
  line-height: 22px;
  max-width: 99%;
  position: relative;
  display: inline-block;
  padding-left: 8px;
  color: #409eff;
  font-size: 14px;
  opacity: 1;
  vertical-align: middle;
  overflow: hidden;
  transition: 0.25s linear;
}
/* tag的叉叉 */
.i-close {
  padding: 2px;
  opacity: 1;
  -webkit-filter: none;
  filter: none;
  color: #409eff;
  cursor: pointer;
  vertical-align: middle;
  font-size: 10px;
}
/* 鼠标经过叉叉 */
.i-close:hover {
  background-color: #409eff;
  border-radius: 50%;
  color: #fff;
}
/* input */
.input-tag {
  font-size: 16px;
  border: none;
  box-shadow: none;
  outline: none;
  background-color: transparent;
  padding: 0;
  flex-grow: 1;
  vertical-align: top;
  height: 30px;
  color: #495060;
  line-height: 32px;
  margin-left: 10px;
}
/* 输入框提示文字大小 */
input:placeholder-shown {
  font-size: 14px;
}
</style>