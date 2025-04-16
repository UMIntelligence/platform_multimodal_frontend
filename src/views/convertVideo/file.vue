<template>
  <div class="convert_video">
    <button @click="btnClick">开始</button>
    <button @click="btnClick2">开始</button>
    <el-upload
  class="upload-demo"
  drag
  :auto-upload="false"
  :on-change="handleCHange"
  action="https://jsonplaceholder.typicode.com/posts/"
  multiple>
  <i class="el-icon-upload"></i>
  <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
  <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
</el-upload>



<el-button @click="startConvert">开始</el-button>
<el-button @click="stopConvert">结束</el-button>
  </div>
</template>

<script>
import { HZRecorder } from './HZRecorder'
import httpUrls from '../../api/requestURL'
import Recorder from 'js-audio-recorder';
let newrecorder = new Recorder({
  sampleBits: 16,         // 采样位数，支持 8 或 16，默认是16
  sampleRate: 16000,      // 采样率，支持 11025、16000、22050、24000、44100、48000，根据浏览器默认值，我的chrome是48000
  numChannels: 1,
})

export default {
  name: 'convert_video',
  data() {
    return {
      index: 0,
      timeCount: 0,
      recorder: HZRecorder,
      audio_context: AudioContext,
    };
  },
  methods: {
    handleCHange(file, fileList) {
      console.log(file.raw);
      this.socket.send(file.raw)
    },
    btnClick() {
      this.init()
      this.recorder.start()
      let imer = setInterval(() => {
        var blob = this.recorder.getBlob();
        console.log('文件内容', blob);
        const file = new File([blob], 'audio.wav');
        console.log("-----------" + file.size, file)

        var blob2 = blob.slice(this.index, blob.size - 1);
        const file2 = new File([blob2], 'audio.wav');
        console.log("----blob2-------" + blob2.size, file2)
        this.socket.send(file);
        this.index = blob.size - 1;
        // this.recorder.start()

        this.timeCount = this.timeCount + 1
        if (this.timeCount === 10) {
          clearInterval(imer)
          const blobUrl = window.URL.createObjectURL(blob)
          const a = document.createElement('a')
          a.style.display = 'none'
          a.download = new Date().getMinutes() + ':' + new Date().getSeconds() + '.wav'
          a.href = blobUrl
          a.click()

          const b = document.createElement('a')
          b.style.display = 'none'
          b.download = new Date().getMinutes() + ':' + new Date().getSeconds() + '.mp3'
          b.href = blobUrl
          b.click()
        }
      }, 2000)
    },

    btnClick2() {
      this.init()
      this.recorder.start()
      let imer = setInterval(() => {
        var blob = this.recorder.getBlob();
        console.log('文件内容', blob);
        const file = new File([blob], 'audio.wav');
        console.log("-----------" + file.size, file)

        var blob2 = blob.slice(this.index, blob.size - 1);
        const file2 = new File([blob2], 'audio.wav');
        console.log("----blob2-------" + blob2.size, file2)
        this.socket.send(file2);
        this.index = blob.size - 1;
        // this.recorder.start()

        this.timeCount = this.timeCount + 1
        if (this.timeCount === 10) {
          clearInterval(imer)
          const blobUrl = window.URL.createObjectURL(blob)
          const a = document.createElement('a')
          a.style.display = 'none'
          a.download = new Date().getMinutes() + ':' + new Date().getSeconds() + '.wav'
          a.href = blobUrl
          a.click()

          const b = document.createElement('a')
          b.style.display = 'none'
          b.download = new Date().getMinutes() + ':' + new Date().getSeconds() + '.mp3'
          b.href = blobUrl
          b.click()
        }
      }, 2000)
    },

    init() {
      if (typeof (WebSocket) === "undefined") {
        alert("您的浏览器不支持socket");
      }
      else {
        // 实例化socket
        this.socket = new WebSocket(`${httpUrls.ws}ws/ali/nls-gateway`);
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
      this.socket.send(JSON.stringify({ type: 'START', format: 'pcm' }), [JSON.parse(localStorage.getItem('userInfo')).token]);

      console.log("socket连接成功");
    },
    error(err) {
      console.log("连接错误", err);
    },
    getMessage(msg) {
      console.log('解析的语音信息：-------：', msg.data);
    },
    // 发送消息给被连接的服务端
    send(params) {
      this.socket.send('');

    },
    close() {
      console.log("socket已经关闭");
    },


    startConvert() {
      // this.init()
      newrecorder.start().then(() => {}, (error) => {
        console.log(`$error.name : $error.message`);
        // 出错了
      })

      newrecorder.onprogress = function(params) {
        console.log('当前获取到到音频数据', params);       // 当前获取到到音频数据
      }

      // newrecorder.getNextData().then(params => {
      //   console.log('实时数据：', params);
      // })
    },

    stopConvert() {
      newrecorder.stop()
      newrecorder.downloadPCM()
    },
  },
  mounted() {
    var that = this
    this.$nextTick(() => {
      try {
        // <!-- 检查是否能够调用麦克风 -->
        window.AudioContext = window.AudioContext || window.webkitAudioContext;
        navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia;
        window.URL = window.URL || window.webkitURL;

        that.audio_context = new AudioContext;
        console.log('navigator.getUserMedia ' + (navigator.getUserMedia ? 'available.' : 'not present!'));
      } catch (e) {
        alert('No web audio support in this browser!');
      }

      navigator.getUserMedia({ audio: true }, function (stream) {
        console.log(stream);
        that.recorder = new HZRecorder(stream, {
          sampleBits: 16,
          sampleRate: 16000,
          numChannels: 1,
        })
        console.log('初始化完成');
      }, function (e) {
        console.log('No live audio input: ' + e);
      });
    })
  },
}
</script>

<style scoped></style>