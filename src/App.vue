<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
    name: "App"
};
</script>

<style> 

html,
body {
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    padding: 0px;
    margin: 0px;
}
#app {
    /* font-family: "Avenir", Helvetica, Arial, sans-serif; */
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
    widows: 100%;
    height: 100%;
}
.customPopper{
  padding: 0px !important;
  width: 140px !important;
  min-width: 130px !important;
}

/* 全局滚动条样式 */
::-webkit-scrollbar {
    width: 3px;
}

::-webkit-scrollbar-thumb{
    background-color: #f2f2f2;
}

pre {
  position: relative;
}

pre:hover .copy-code-button {
  pointer-events: all;
  transform: translateX(0);
  opacity: .5;
}

pre .copy-code-button {
  position: absolute;
  right: 10px;
  top: 1em;
  cursor: pointer;
  padding: 0 5px;
  background-color: #303030;
  color: #fff;
  border: 1px solid #dedede;
  border-radius: 10px;
  transform: translateX(10px);
  pointer-events: none;
  opacity: 0;
  transition: all .3s ease;
}

pre .copy-code-button:after {
  content: "copy";
}

pre .copy-code-button:hover {
  opacity: 1;
}

code {
    margin: 0;
    padding: 3px 5px;
    white-space: break-spaces;
    background-color: rgba(175,184,193,0.2);
    border-radius: 6px;
    font-size: 14px;
    font-family: Menlo,Monaco,Consolas,Courier New,monospace;
}
.footer-inp_img /deep/ .el-textarea__inner{
  border: 0px !important;
}
</style>
