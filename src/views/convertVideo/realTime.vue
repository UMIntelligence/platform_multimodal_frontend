<template>
  <div class="real_time">
    <div @click="send({ type: 'START', dev_pid: 15372 })">1231232134<br />132134123423</div>
    <button @click="startRecording">开始录音</button>
    <button @click="stopRecording">停止录音</button>
    <el-upload
  class="upload-demo"
  drag
  action="https://jsonplaceholder.typicode.com/posts/"
  :on-change="handleChange"
  multiple>
  <i class="el-icon-upload"></i>
  <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
  <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
</el-upload>
  </div>
</template>

<script>
import httpUrls from '../../api/requestURL'
export default {
  name: 'real_time',
  data() {
    return {
      socket: ""
    };
  },
  mounted() {
  },
  methods: {
    handleChange(file, fileList) {
      this.socket.send(file.raw);
    },
    startRecording() {
      navigator.mediaDevices.getUserMedia({ audio: true })
        .then(stream => {
          this.init()
          const mediaRecorder = new MediaRecorder(stream);
          const chunks = [];
          mediaRecorder.start();
          this.mediaRecorder = mediaRecorder;
          setTimeout(() => {
            mediaRecorder.addEventListener('dataavailable', event => {
              chunks.push(event.data);
              console.log('音频数据：', event.data);
              this.socket.send(new File([event.data], 'audio.pcm'));
            });
  
            mediaRecorder.addEventListener('stop', () => {
              const blob = new Blob(chunks, { type: 'audio/pcm' });
              const url = window.URL.createObjectURL(blob);
              // 处理录音数据流
              console.log('处理录音数据流', url);
              const b = document.createElement('a')
              b.style.display = 'none'
              b.download = new Date().getMinutes() + ':' + new Date().getSeconds() + '.mp3'
              b.href = url
              this.socket.send(new File([blob], 'audio.pcm'));

            });
  
          }, 2000);
        })
        .catch(error => {
          console.error('无法访问麦克风：', error);
        });
    },
    stopRecording() {
      if (this.mediaRecorder) {
        this.mediaRecorder.stop();
      }
    },
    init() {
      if (typeof (WebSocket) === "undefined") {
        alert("您的浏览器不支持socket");
      }
      else {
        // 实例化socket
        this.socket = new WebSocket(`${httpUrls.ws}/ws/ali/nls-gateway`);
        console.log(this.socket);
        // 监听socket连接
        this.socket.onopen = this.open;
        // 监听socket错误信息
        this.socket.onerror = this.error;
        // 监听socket消息
        this.socket.onmessage = this.getMessage;
      }
    },
    open() {
      this.socket.send(JSON.stringify({ type: 'START' }), [JSON.parse(localStorage.getItem('userInfo')).token]);

      console.log("socket连接成功");
    },
    error(err) {
      console.log("连接错误", err);
    },
    getMessage(msg) {
      console.log(msg.data);
    },
    // 发送消息给被连接的服务端
    send(params) {
      this.socket.send('');

    },
    close() {
      console.log("socket已经关闭");
    }
  },
  destroyed() {
    // 销毁监听
    this.socket.onclose = this.close;
  },
}
</script>

<style scoped></style>