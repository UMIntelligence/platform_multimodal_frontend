export function HZRecorder(stream, config) {
  config = config || {};
  config.sampleBits = config.sampleBits || 16;   //采样数位 8, 16
  config.sampleRate = config.sampleRate || 16000;  //采样率16khz

  var context = new (window.webkitAudioContext || window.AudioContext)();
  var audioInput = context.createMediaStreamSource(stream);
  var createScript = context.createScriptProcessor || context.createJavaScriptNode;
  var recorder = createScript.apply(context, [4096, 1, 1]);

  var audioData = {
    size: 0,     //录音文件长度
    buffer: [],   //录音缓存
    inputSampleRate: context.sampleRate,  //输入采样率
    inputSampleBits: 16,    //输入采样数位 8, 16
    outputSampleRate: config.sampleRate,  //输出采样率
    outputSampleBits: config.sampleBits,    //输出采样数位 8, 16
    input: function (data) {
      this.buffer.push(new Float32Array(data));
      this.size += data.length;
    },
    compress: function (clearBuff) { //合并压缩
      //合并
      var data = new Float32Array(this.size);
      var offset = 0;
      for (var i = 0; i < this.buffer.length; i++) {
        data.set(this.buffer[i], offset);
        offset += this.buffer[i].length;
      }
      //压缩
      var compression = parseInt(this.inputSampleRate / this.outputSampleRate);
      var length = data.length / compression;
      var result = new Float32Array(length);
      var index = 0, j = 0;
      while (index < length) {
        result[index] = data[j];
        j += compression;
        index++;
      }
      //  TODO 每次获取清空缓冲区
      if (clearBuff) {
        this.buffer = []
        this.size = 0
      }

      return result;
    },
    encodeWAV: function (clearBuff) {
      var sampleRate = Math.min(this.inputSampleRate, this.outputSampleRate);
      var sampleBits = Math.min(this.inputSampleBits, this.outputSampleBits);
      var bytes = this.compress(clearBuff);
      var dataLength = bytes.length * (sampleBits / 8);
      var buffer = new ArrayBuffer(44 + dataLength);
      var data = new DataView(buffer);

      var channelCount = 1;//单声道
      var offset = 0;

      var writeString = function (str) {
        for (var i = 0; i < str.length; i++) {
          data.setUint8(offset + i, str.charCodeAt(i));
        }
      }

      // 资源交换文件标识符
      writeString('RIFF'); offset += 4;
      // 下个地址开始到文件尾总字节数,即文件大小-8
      data.setUint32(offset, 36 + dataLength, true); offset += 4;
      // WAV文件标志
      writeString('WAVE'); offset += 4;
      // 波形格式标志
      writeString('fmt '); offset += 4;
      // 过滤字节,一般为 0x10 = 16
      data.setUint32(offset, 16, true); offset += 4;
      // 格式类别 (PCM形式采样数据)
      data.setUint16(offset, 1, true); offset += 2;
      // 通道数
      data.setUint16(offset, channelCount, true); offset += 2;
      // 采样率,每秒样本数,表示每个通道的播放速度
      data.setUint32(offset, sampleRate, true); offset += 4;
      // 波形数据传输率 (每秒平均字节数) 单声道×每秒数据位数×每样本数据位/8
      data.setUint32(offset, channelCount * sampleRate * (sampleBits / 8), true); offset += 4;
      // 快数据调整数 采样一次占用字节数 单声道×每样本的数据位数/8
      data.setUint16(offset, channelCount * (sampleBits / 8), true); offset += 2;
      // 每样本数据位数
      data.setUint16(offset, sampleBits, true); offset += 2;
      // 数据标识符
      writeString('data'); offset += 4;
      // 采样数据总数,即数据总大小-44
      data.setUint32(offset, dataLength, true); offset += 4;
      // 写入采样数据
      if (sampleBits === 8) {
        for (var i = 0; i < bytes.length; i++, offset++) {
          var s = Math.max(-1, Math.min(1, bytes[i]));
          var val = s < 0 ? s * 0x8000 : s * 0x7FFF;
          val = parseInt(255 / (65535 / (val + 32768)));
          data.setInt8(offset, val, true);
        }
      } else {
        for (var i2 = 0; i2 < bytes.length; i2++, offset += 2) {
          var s2 = Math.max(-1, Math.min(1, bytes[i2]));
          data.setInt16(offset, s2 < 0 ? s2 * 0x8000 : s2 * 0x7FFF, true);
        }
      }

      return new Blob([data], { type: 'audio/wav' });
    }
  };
  //开始录音
  this.start = function () {
    audioInput.connect(recorder);
    recorder.connect(context.destination);
  }

  //停止
  this.stop = function () {
    recorder.disconnect();
  }

  //获取音频文件
  this.getBlob = function (clearBuff) {
    clearBuff = clearBuff || false;
    // this.stop();
    return audioData.encodeWAV(clearBuff);
  }

  //回放
  this.play = function (audio) {
    // var blob=this.getBlob();
    // saveAs(blob, "F:/3.wav");
    audio.src = window.URL.createObjectURL(this.getBlob());
  }

  //上传
  this.upload = function () {
    return this.getBlob()
  }

  //音频采集
  recorder.onaudioprocess = function (e) {
    audioData.input(e.inputBuffer.getChannelData(0));
    //record(e.inputBuffer.getChannelData(0));
  }

}