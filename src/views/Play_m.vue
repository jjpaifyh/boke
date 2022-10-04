<!--  -->
<template>
  <div class="viedo">
    <div class="bj"></div>
    <div class="tit">
      <div class="name">{{ name }}</div>
      <div class="num">{{ num }}</div>
    </div>
    <video
      id="my-video"
      class="video-js vjs-default-skin box_bfq"
      controls
      preload="auto"
      width="500px"
      v-if="videoId"
    >
      <source :src="videoId" type="application/x-mpegURL" />
    </video>
  </div>
</template>

<script>
import "video.js/dist/video-js.css";

import videojs from "video.js";
import "videojs-contrib-hls";

export default {
  name: "",
  data() {
    return {
      videoId: "",
      //   player: null,
      singlePlayer: null,
      name: "",
      num: "",
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    getVideo() {
      videojs(
        "my-video",
        {
          bigPlayButton: false,
          textTrackDisplay: false,
          posterImage: true,
          errorDisplay: false,
          controlBar: true,
          poster: "http://localhost:2000/public/images/背景.jpg",
          language: "zh-CN",
          playbackRates: [0.5, 1, 1.5, 2],
        },
        function () {
          this.play();
        }
      );
    },
    // 检查
    getdata() {
      const k = setInterval(() => {
        if (this.videoId) {
          this.getVideo();
          clearInterval(k);
        }
        // console.log("我在检查");
      }, 500);
    },
    initdata() {
      this.videoId = this.$route.query.chapterPath;
      this.name = this.$route.query.name;
      this.num = this.$route.query.num;
    },
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
    this.initdata();
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
<style scoped>
.box_bfq {
  width: 1120px;
  height: 630px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
.viedo {
  position: relative;
  width: 100vw;
  height: 100vh;
}
.bj {
  position: absolute;
  width: 100vw;
  height: 100vh;
  /* background-color: aquamarine; */
  background: url("http://localhost:2000/public/images/bfybj.png") center center
    no-repeat;
  background-size: 100% 100%;
  z-index: -1;
  opacity: 0.5;
}
.tit {
  width: 1120px;
  height: 150px;
  /* background-color: aliceblue; */
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  top: 0;
  margin-top: 10px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
}
.name {
  font-size: 25px;
  color: rgb(1, 0, 0);
  font-weight: 700;
}
.num {
  color: #000;
  font-size: 20px;
}
</style>