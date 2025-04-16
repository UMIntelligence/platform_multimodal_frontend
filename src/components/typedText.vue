<template>
  <div>
    <div class="typedText">{{ typedText }}</div>
  </div>
</template>

<script>
export default {
  name: "typed",
  props: {
    typedList: {
      type: Array,
      required: true,
    },
    // loop: {
    //   type: Boolean,
    //   default: true,
    // },
    speed: {
      type: Number,
      default: 80,
    },
  },
  data() {
    return {
      typedText: "",
      loop: false,
      index:1
    };
  },
  mounted() {
    this.start();
  },
  methods: {
    start() {
      let j = 0;
      let k = 0;
      this.typedText = "";
      if (this.typedList.length <= 0) {
        console.error("typedList数据缺失");
        return;
      }
      let arr = this.typedList[k].split("");
      let timer = setInterval(() => {
        if (j < arr.length) {
          this.typedText += arr[j++];
        } else {
          if (k < this.typedList.length - 1) {
            k++;
            j = 0;
            this.typedText = "";
            arr = this.typedList[k].split("");
          } else {
            // this.index = this.index+1;
            clearInterval(timer);
            this.loop = false; // 设置loop为false，结束循环
            this.$emit('endTyped',this.index)
          }
        }
      }, this.speed);
    },
  },
};
</script>
<style lang="scss" scoped>

@keyframes blink {
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
}
</style>
