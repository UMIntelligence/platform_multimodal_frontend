export function downloadImage(imgSrc) {
    window.URL = window.URL || window.webkitURL;
    var xhr = new XMLHttpRequest();
    xhr.open("get", imgSrc, true);
    xhr.responseType = "blob";
    xhr.onload = function () {
        if (this.status == 200) {
            //得到一个blob对象
            var blob = this.response;
            // console.log("blob", blob)
            // 至关重要
            let oFileReader = new FileReader();
            // console.log(oFileReader);
            oFileReader.onloadend = function (e) {
                // 此处拿到的已经是base64的图片了,可以赋值做相应的处理
                // console.log(e)
                return e
                var a = document.createElement("a"); // 生成一个a元素
                var event = new MouseEvent("click"); // 创建一个单击事件
                a.download = "photo.png"; // 设置图片名称
                a.href = e.target.result; // 将生成的URL设置为a.href属性
                a.dispatchEvent(event); // 触发a的单击事件
            }
            oFileReader.readAsDataURL(blob);
        }
    }
    xhr.send();
}

export async function urlToBase64(url) {
    return new Promise((resolve, reject) => {
        let canvas = document.createElement('canvas');
        let dataURL = null
        let ctx = canvas.getContext('2d');
        let img = new Image();
        img.crossOrigin = '*';//解决Canvas.toDataURL 图片跨域问题
        img.onload = () => {
            img.src = url;
            canvas.height = img.height;
            canvas.width = img.width;
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
            let ext = img.src.substring(img.src.lastIndexOf(".") + 1).toLowerCase(); // 获取到图片的格式
            dataURL = canvas.toDataURL("image/" + ext); // 得到base64 编码的 dataURL
            resolve(dataURL)
        };
        img.src= url
    })
    // console.log(dataURL);
    // return  dataURL
}

export function base64toFile(data, fileName) {
    // console.log(data);
    const dataArr = data.split(',')
    const byteString = atob(dataArr[1])
    const options = {
        type: 'image/png',
        endings: 'native',
    }
    const u8Arr = new Uint8Array(byteString.length)
    for (let i = 0; i < byteString.length; i++) {
        u8Arr[i] = byteString.charCodeAt(i)
    }
    return new File([u8Arr], `${fileName}.png`, options) // 返回文件流
}


export function saveAndExport(content, filename) {
    //接口返回的数据格式是文件流，转成通过标签直接下载
    const blob = new Blob([content])
    const _fileName = filename
    if ('download' in document.createElement('a')) {
        // 非IE下载
        const elink = document.createElement('a')
        elink.download = _fileName
        elink.style.display = 'none'
        elink.href = URL.createObjectURL(blob)
        document.body.appendChild(elink)
        elink.click()
        URL.revokeObjectURL(elink.href) // 释放URL 对象
        document.body.removeChild(elink)
    } else {
        // IE10+下载
        navigator.msSaveBlob(blob, _fileName)
    }
}


function compressImg(file) {
    var src;
    var files;
    var fileSize = parseFloat(parseInt(file['size']) / 1024);
    // console.log('压缩前KB :' + fileSize)
    var read = new FileReader();
    read.readAsDataURL(file);
    return new Promise(function (resolve, reject) {
        read.onload = function (e) {
            var img = new Image();
            img.src = e.target.result;
            img.onload = function () {
                //默认按比例压缩
                var w = this.width,
                    h = this.height;
                //生成canvas
                var canvas = document.createElement('canvas');
                var ctx = canvas.getContext('2d');
                var base64;
                // 创建属性节点
                canvas.setAttribute("width", w);
                canvas.setAttribute("height", h);
                ctx.drawImage(this, 0, 0, w, h);
                if (fileSize < 1) {
                    //如果图片小于一兆 那么不执行压缩操作
                    base64 = canvas.toDataURL(file['type'], 1);
                } else if (fileSize > 1 && fileSize < 2) {
                    //如果图片大于1M并且小于2M 那么压缩0.5
                    base64 = canvas.toDataURL(file['type'], 0.5);
                } else {
                    //如果图片超过2m 那么压缩0.2
                    base64 = canvas.toDataURL(file['type'], 0.2);
                }
                // 回调函数返回file的值（将base64编码转成file）如果后台接收类型为base64的话这一步可以省略

                // console.log('base64', base64);
                resolve(base64)
            };
        };
    })
}
//base64转码（压缩完成后的图片为base64编码，这个方法可以将base64编码转回file文件）
function dataURLtoFile(dataurl) {
    var arr = dataurl.split(','),
        mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]),
        n = bstr.length,
        u8arr = new Uint8Array(n);
    while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], {
        type: mime
    });

}




// 图片上传压缩
export function beforeUpload(file) {
    // 把上传的文件压缩成base64编码格式
    compressImg(file).then((res) => {
        // console.log(res);
        //res就是压缩后转成base64后的数据
        // 由字节转换为 KB
        let fileLength = parseInt(res.length - (res.length / 8) * 2);
        let size = "";
        size = parseInt((fileLength / 1024).toFixed(2));
        // console.log("压缩后：" + size + "KB");
        return res
        //   if (size > 5120) {
        //     console.log('上传图纸压缩后大小不得大于5MB！');
        //     // this.$message.info("上传图纸压缩后大小不得大于5MB！");
        //     return false;
        //   } else {
        //     console.log(file);
        //     let files = {};
        //     files.name = file.name;
        //     files.path = res;
        //     files.size = file.size;
        //     files.suffix = file.type.substring(file.type.lastIndexOf("/") + 1);
        //     // files.type = this.fileInfo.fileType;
        //     // this.$emit("fileData", files);
        //   }
    });
}

/**
* @description 这是一个补丁包。用来解决新引入的stomp中引用textEncoder和textDecoder在IE下不兼容的问题
*              由于stomp源码中只使用了最基本的utf8编码，故可以用支持ie的 unescape 和 encodeURIComponent伪装该函数
* @param {type} 
* @Date 2020-07-08 11:45:19
*/
export const textDecoder = (window) => {

    if (undefined !== window.TextEncoder) { return; }

    function _TextEncoder() {
        //--DO NOTHING
    }
    _TextEncoder.prototype.encode = function (s) {
        return unescape(encodeURIComponent(s)).split('').map(function (val) { return val.charCodeAt(); });
    };
    function _TextDecoder() {
        //--DO NOTHING
    }
    _TextDecoder.prototype.decode = function (code_arr) {
        return decodeURIComponent(escape(String.fromCharCode.apply(null, code_arr)));
    };

    window.TextEncoder = _TextEncoder;
    window.TextDecoder = _TextDecoder;

}


export function arr2str(arr) {
    // or [].slice.apply(arr)
    var utf8 = Array.from(arr).map(function (item) {
        return String.fromCharCode(item);
    }).join('');

    return decodeURIComponent(escape(utf8));
}

export function numTokensFromMessages(messages, model = "gpt-3.5-turbo") {
    // Returns the number of tokens used by a list of messages.
    let encoding;
    try {
        encoding = tiktoken.encodingForModel(model);
    } catch (error) {
        encoding = tiktoken.getEncoding("cl100k_base");
    }
    let numTokens = 0;
    for (let i = 0; i < messages.length; i++) {
        const message = messages[i];
        numTokens += 4;  // every message follows <im_start>{role/name}\n{content}<im_end>\n
        for (const key in message) {
            if (message.hasOwnProperty(key)) {
                const value = message[key];
                numTokens += encoding.encode(value).length;
                if (key === "name") {  // if there's a name, the role is omitted
                    numTokens -= 1;  // role is always required and always 1 token
                }
            }
        }
    }
    numTokens += 2;  // every reply is primed with <im_start>assistant
    return numTokens;
}