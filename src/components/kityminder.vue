<template>
  <div style="width: 100%;height: 100%;display: flex;justify-content: center;align-items: center;overflow: hidden;">
    <div :style="{transform:`scale(${scaleNum/100})`}"  id="minder-container"></div>
  </div>
</template>

<script>
import kity from 'kity'
  import kityminder from 'kityminder-core'

  export default {
    name: "page",
    data() {
      return {
        minderData:null,
        scaleNum:100, //缩放比例
      }
    },
    methods: {
      init(){
        console.log(this.minderData,'进入init')
        this.scaleNum = 100;
        this.km = new window.kityminder.Minder({
          renderTo: '#minder-container'
        });
        this.km.importJson(this.minderData);
      }
    },
    mounted() {
      
    }
  }
</script>

<style scoped>
#minder-container{
  width: 100%;
  height: 100%;
  background: #fff !important;
}
</style>
