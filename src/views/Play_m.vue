<!--  -->
<template>
  <div class="viedo">
    <div :class="[is_ini ? 'init' : is_list_click ? 'plugin' : 'plugin_f']">
      <div
        :class="[is_ini ? 'initaf' : is_list_click ? 'afters_f' : 'afters']"
        @click="is_list"
      ></div>
      <div class="db">
        <Keyboard
          v-for="(k, index) in list_data_key.chapterList"
          :key="index"
          :listdata="k"
          :name="list_data_key.title"
          :videoId="videoIds"
          @add="add"
        ></Keyboard>
      </div>
    </div>
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
import axios from "axios";
import videojs from "video.js";
import "videojs-contrib-hls";
import Keyboard from "../components/Keyboard";
export default {
  name: "",
  data() {
    return {
      videoId: "",
      //   player: null,
      singlePlayer: null,
      name: "",
      num: "",
      is_list_click: true,
      is_ini: true,
      videoIds: "",
      list_data_key: [],
    };
  },
  props: {
    datalist: [],
  },
  components: { Keyboard },
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
      this.videoIds = this.$route.query.videoId;
      // console.log(this.videoIds);
      this.get_list_data_key();
    },
    is_list() {
      console.log("dianji");
      this.is_list_click = !this.is_list_click;
      this.is_ini = false;
      console.log(this.is_list_click);
    },
    get_list_data_key() {
      let url = `https://api.pingcc.cn/videoChapter/search/${this.videoIds}`;
      axios.get(url).then((res) => {
        // console.log(res.data.data);
        this.list_data_key = res.data.data;
        console.log(this.list_data_key);
      });
    },
    add() {
      location.reload();
      console.log("刷新了");
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
  overflow: hidden;
}
.bj {
  position: relative;
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
.plugin {
  width: 20vw;
  height: 80vh;
  position: absolute;
  /* background-color: rgb(144, 145, 145); */
  right: 0vw;
  top: 10vh;
  animation: run 1s;
  animation-fill-mode: forwards;
  z-index: 2;
}

.plugin_f {
  width: 20vw;
  height: 80vh;
  position: absolute;
  /* background-color: rgb(144, 145, 145); */
  right: -20vw;
  top: 10vh;
  animation: run_f 1s;
  animation-fill-mode: forwards;
  z-index: 2;
}
.init {
  width: 20vw;
  height: 80vh;
  position: absolute;
  /* background-color: rgb(144, 145, 145); */
  right: -20vw;
  top: 10vh;
  z-index: 2;
}

.afters {
  display: inline-block;
  width: 4vw;
  height: 20vw;
  background-color: black;
  position: absolute;
  top: 10vw;
  left: -4vw;
  z-index: 0;
  animation: aj_run 1s;
  animation-fill-mode: forwards;
  border-radius: 20px;
  background-image: linear-gradient(147deg, #f5baca 0%, #51a2e8 74%);
  text-align: center;
}

.afters_f {
  display: inline-block;
  width: 4vw;
  height: 20vw;
  background-color: black;
  position: absolute;
  top: 10vw;
  left: -4vw;
  z-index: 0;
  animation: aj_run_f 1s;
  animation-fill-mode: forwards;
  border-radius: 20px;
  background-image: linear-gradient(147deg, #f5baca 0%, #51a2e8 74%);
  text-align: center;
}
.initaf {
  display: inline-block;
  width: 4vw;
  height: 20vw;
  background-color: black;
  position: absolute;
  top: 10vw;
  left: -4vw;
  z-index: 0;
  border-radius: 20px;
  background-image: linear-gradient(147deg, #f5baca 0%, #51a2e8 74%);
}
@keyframes run {
  0% {
    right: 0;
  }
  100% {
    right: -20vw;
  }
}

@keyframes run_f {
  0% {
    right: -20vw;
  }
  100% {
    right: 0vw;
  }
}

@keyframes aj_run {
  0% {
    left: -4vw;
  }
  100% {
    left: -2vw;
  }
}

@keyframes aj_run_f {
  0% {
    left: -2vw;
  }
  100% {
    left: -4vw;
  }
}
.db {
  position: relative;
  right: -17px;
  width: 20vw;
  height: 80vh;
  background-color: rgb(62, 192, 244);
  /* margin-left: 2vw; */
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  overflow: auto;
  border-radius: 20px;
  background-image: linear-gradient(147deg, #f5baca 0%, #51a2e8 74%);
  /* overflow-y: scroll; */
  z-index: 0;
}
</style>