<template>
    <div class="pinyins">
        <span class="wordBox" v-for="(item,index) in list" :key="index">
            <span v-if="item['hanzi'] != '\n'" class="word_text">
                <ruby class="hanzi">{{item['hanzi']}}
                    <rt class="pinyin" :style="isFirefox ? 'margin-left: -26px' : 'margin:5px'">{{item['pinyin']}}</rt>
                </ruby>
            </span>
           
            <br v-if="item['hanzi'] == '\n'">
        </span>
    </div>
</template>
<script>
    import { pinyin } from 'pinyin-pro';
    export default {
        name: "change-pinyin",
        data() {
            return {
                isFirefox: false
            }
        },
        props: {
            content: String,
        },
        created() {
            let userAgent = navigator.userAgent; //取得浏览器的userAgent字符串
            // console.log(userAgent,2258)
            if (userAgent.indexOf("Firefox") > -1) { //判断是否是火狐浏览器
                console.log('555')
                this.isFirefox = true
            } else {
                console.log('666')
                this.isFirefox = false
            }
        },
        mounted() {
            // this.cont_index = this.content.indexOf('\n');
            // console.log(this.cont_index,121212)
            for (let char of this.content) {
            //   console.log("char==",char);
                let pinyins = ''
                // 判断是否为汉字
                var reg = new RegExp("[\\u4E00-\\u9FFF]+", "g");
                if (reg.test(char)) {
                  pinyins = pinyin(char)
                }
                this.list.push(
                    {
                        "hanzi": char,
                        "pinyin": pinyins
                    }
                )
                // console.log(this.list,8888)
            }
        },
        data() {
            return {
                list: []
            }
        }
    }
</script>
<style scoped>
    .pinyins {
        margin: 5px;
    }
 
    .wordBox {
        /* width: 25px; */
        /* display: inline-block; */
        text-align: center;
        /* width: 1.2em; */
    }
    .word_text {
        width: 1.2em;
        display: inline-block;
        white-space: pre-line;
        font-family: Kaiti SC;
        color: #333;
        font-size: 24px;
        font-weight: 530;
        line-height: 250%;
        text-align: center;
    }
    .hanzi { 
        text-align: center;
        letter-spacing: 14px;
        white-space: pre-line;
    }
    .pinyin {
        text-align: center;
        letter-spacing: 1px;
        white-space: pre-line;
    }
</style>