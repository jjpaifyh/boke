<!--  -->
<template>
  <div :class="{ lyricd: true, lyric_op: isgo, lyric_op_x: !isgo }" @click.stop>
    <!-- // lyricIndex为当前歌曲播放的进度在歌词中的位置，进而改变正在播放的歌词的样式 -->
    <div class="lyric each name">天外来我</div>
    <ul class="lyric" v-show="isShowMusicList" ref="lyric">
      <li class="each"></li>
      <li class="each"></li>
      <li
        :class="{ each: true, choose: index == lyricIndex }"
        v-for="(item, key, index) in currentMUsicLyric"
        :key="key"
      >
        {{ item }}
      </li>
      <li class="each"></li>
      <li class="each"></li>
      <li class="each"></li>
    </ul>
  </div>
</template>

<script>
import { apigeci } from "@/request/wyy/api.js";
export default {
  name: "lyric",
  data() {
    return {
      is_op: false,
      textlist: [],
      currentMUsicLyric: {},
      isShowMusicList: true,
      lyricIndex: 0,
      value: 0,
      // namelist: [],
    };
  },
  props: {
    isgo: Boolean,
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {
    // 使用watch监听当前歌曲进度value的变化处理歌词位置
    value() {
      let i = 0;
      if (this.value == 0) {
        this.$refs.lyric.scrollTop = 0;
      }
      // 循环歌词对象
      for (let key in this.currentMUsicLyric) {
        // key表示歌词对象中的时间，如果key等于歌曲进度value，改变当前歌词进度		lyricIndex
        if (+key == this.value) {
          this.lyricIndex = i;
          // 当歌词进度大于5，即播放到了第5句歌词，开始滚动
          if (i > 6) {
            this.$refs.lyric.scrollTop = 30 * (i - 6);
            // target.scrollIntoView({
            //   behavior: "smooth",
            // });
          }
        }
        i++;
      }
    },
  },
  //方法集合
  methods: {
    setdata(data) {
      // 处理歌词，转化成key为时间，value为歌词的对象
      let lyricArr = data.split("[").slice(1); // 先以[进行分割
      let lrcObj = {};
      lyricArr.forEach((item) => {
        let arr = item.split("]"); // 再分割右括号
        // 时间换算成秒
        let m = parseInt(arr[0].split(":")[0]);
        let s = parseInt(arr[0].split(":")[1]);
        arr[0] = m * 60 + s;
        if (arr[1] != "\n") {
          // 去除歌词中的换行符
          lrcObj[arr[0]] = arr[1];
        }
      });
      // 存储数据
      this.currentMUsicLyric = lrcObj;
    },
    getdata() {
      this.$bus.$on("getname", ($event) => {
        // this.name = $event;
        let name = document.querySelector(".name");
        name.innerHTML = $event;
      });
      this.$bus.$on("muid", ($event) => {
        apigeci({
          id: $event,
        }).then((res) => {
          let t = res.data.lrc.lyric;
          this.setdata(t);
          // console.log(this.currentMUsicLyric);
        });
      });
      this.$bus.$on("value", ($event) => {
        this.value = $event;
      });
    },
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
    this.getdata();
  },
  //beforeCreate() {}, //生命周期 - 创建之前
  //beforeMount() {}, //生命周期 - 挂载之前
  //beforeUpdate() {}, //生命周期 - 更新之前
  //updated() {}, //生命周期 - 更新之后
  //beforeDestroy() {}, //生命周期 - 销毁之前
  //destroyed() {}, //生命周期 - 销毁完成
  //activated() {}, //如果页面有keep-alive缓存功能，这个函数会触发
};
</script>
<style lang="less">
.lyricd {
  width: 54vw;
  height: 30vw;
  //   background-color: aqua;
  position: absolute;
  //   border: 1px red solid;
  top: 3vw;
  right: -43vw;
  display: flex;
}
.lyric_op {
  animation: opacity_run 1s;
  animation-fill-mode: forwards;
}
.lyric_op_x {
  animation: opacity_run_x 1s;
  animation-fill-mode: forwards;
}

// solidcolor
.lyric {
  flex: 100%;
  width: 100%;
  height: 30vw;
  position: absolute;
  background-color: rgba(15, 16, 17, 0.5);
  // 滚动条
  overflow: auto;
  color: rgb(221, 221, 221);
  font-size: 15px;
  font-weight: normal;
  padding: 5px 10px;
  //   border: 1px solid #000;
  border-left: none;
  .each {
    height: 30px;
    // border: 1px solid #000;
    line-height: 30px;
    text-align: center;
  }
  .choose {
    height: 30px;
    line-height: 30px;
    font-size: 25px;
    color: rgb(238, 255, 0);
  }
  // 修改滚动条样式
  &::-webkit-scrollbar {
    width: 3px;
    height: 1px;
  }
  // 滑块部分
  &::-webkit-scrollbar-thumb {
    background-color: #eee;
  }
  // 轨道部分
  &::-webkit-scrollbar-track {
    background-color: #333;
  }
}
* {
  ::-webkit-scrollbar {
    display: none; /* Chrome Safari */
  }
}

@keyframes opacity_run {
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}
@keyframes opacity_run_x {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
.name {
  height: 37px;
  /* margin-bottom: 10px; */
  font-size: 25px;
  background-color: rgba(15, 16, 17, 1);
  text-align: center;
  color: #ffffff;
  z-index: 99;
  overflow: hidden;
  line-height: 30px;
}
</style>
