<!--  -->
<template>
  <div class="box_z">
    <audio class="bof" id="plybox" :src="this.mucuis" v-if="mucuis"></audio>
    <!-- 不生效？？？ -->
    <div class="box" @keyup.space="stopmu()">
      <div class="left" @click="left_go()"></div>
      <div class="consts" v-if="is_tf" @click="go_mu()"></div>
      <div class="consts_f" v-else @click="stopmu()"></div>
      <div class="right" @click="rght_go()"></div>
    </div>
    <div class="progress_bar">
      <div class="tou"></div>
      <div class="progress"></div>
    </div>
    <div class="time">00:00/00:00</div>
  </div>
</template>

<script>
import { apiurl } from "@/request/wyy/api.js";
export default {
  name: "",
  data() {
    return {
      // 当前播放歌曲
      mucuis: "1",
      // 控制按键样式
      is_tf: true,
      // 歌曲下标
      n: 0,
      // 放抖，避免多次点击
      JL_tf: true,
      // 当前播放时间
      time: "00:00",
      // 当前歌曲总时间
      newtimew: "00:00",
      // 当前播放时间int格式
      timeint: 0,
      // 当前歌曲总时间int格式
      newtimewint: 0,
      // 定时器
      p: {},
    };
  },
  props: {
    mucuislist: [],
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    // 请求歌曲
    async playmu() {
      this.is_tf = false;
      let urlid = this.mucuislist[this.n];
      this.$bus.$emit("muid", urlid);
      await apiurl({
        id: urlid,
      }).then((res) => {
        this.mucuis = res.data.data[0].url;
      });
      let au = document.querySelector(".bof");
      au.play();
      this.JL_tf = true;
      this.getnewtime(au);
      this.Progress_movement();
    },
    // 获取音乐播放当前时间
    getnewtime(au) {
      let time_box = document.querySelector(".time");
      au.addEventListener("timeupdate", () => {
        let timew = au.duration;

        if (timew) {
          let newtimew = this.gettime(timew);
          this.newtimew = newtimew;
          this.newtimewint = parseInt(Number(timew));
        }
        //用秒数来显示当前播放进度
        let timeDisplay = Math.floor(au.currentTime); //获取实时时间
        this.timeint = timeDisplay;
        this.$bus.$emit("value", this.timeint);
        this.time = this.gettime(timeDisplay);
        this.getnewtime_timew(time_box);
      });
    },
    // 时间格式处理
    gettime(timeDisplay) {
      let minute = timeDisplay / 60;
      let minutes = parseInt(minute);
      if (minutes < 10) {
        minutes = "0" + minutes;
      }
      //秒
      let second = timeDisplay % 60;
      let seconds = Math.round(second);
      if (seconds < 10) {
        seconds = "0" + seconds;
      }
      return minutes + ":" + seconds;
    },
    // 播放
    go_mu() {
      if (this.mucuis) {
        this.is_tf = false;
        let au = document.querySelector(".bof");
        au.play();
      }
    },
    // 暂停
    stopmu() {
      this.is_tf = true;
      let au = document.querySelector(".bof");
      au.pause();
    },
    // 下一首
    rght_go() {
      if (this.JL_tf) {
        this.n = this.n + 1;
        if (this.mucuislist.length - 1 < this.n) {
          this.n = 0;
        }
        this.$emit("getimgurl", this.mucuislist[this.n]);
        this.playmu();
      }
    },
    // 上一首
    left_go() {
      if (this.JL_tf) {
        this.n = this.n - 1;
        if (0 > this.n) {
          this.n = this.mucuislist.length - 1;
        }
        this.$emit("getimgurl", this.mucuislist[this.n]);
        this.playmu();
        this.JL_tf = false;
      }
    },
    inits() {
      this.n = this.randomNum(0, this.mucuislist.length - 1);
      this.$emit("getimgurl", this.mucuislist[this.n]);
      this.playmu();
      this.zidon();
    },
    // 范围内随机数
    randomNum(min, max) {
      var range = max - min;
      var rand = Math.random();
      var num = min + Math.round(rand * range);
      return num;
    },
    // 修改时间进度
    getnewtime_timew(time_box) {
      time_box.innerHTML = `${this.time}/${this.newtimew}`;
    },
    // 进度条随时间移动
    Progress_movement() {
      let tou = document.querySelector(".tou");
      let progress = document.querySelector(".progress");
      // console.log(this.newtimewint);
      // tou.style.animation = `tou_go ${this.newtimewint}s linear;`;

      let num = 0;
      let z = 60;
      this.p = setInterval(() => {
        num = this.timeint / this.newtimewint;
        progress.style.width = `${z * num}vw`;
        tou.style.left = `${z * num}vw`;
      }, 100);
    },
    // 销毁定时器
    xh() {
      clearInterval(this.p);
    },
    // 小数转百分比
    toPercent(point) {
      var str = Number(point * 100).toFixed(1);
      str += "%";
      return str;
    },
    // 自动播放
    zidon() {
      let player = document.querySelector("#plybox");
      player.addEventListener(
        "ended",
        () => {
          this.rght_go();
        },
        false
      );
    },
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
    this.inits();
  },
  beforeDestroy() {
    this.xh();
  },
};
</script>
<style scoped>
.box_z {
  position: fixed;
  bottom: 0;
  right: 0;
  width: 100vw;
  height: 4vw;
  background-color: rgb(29, 29, 29, 0.5);
  z-index: 20;
}
.box {
  position: absolute;
  bottom: 0;
  left: 10vw;
  width: 10vw;
  height: 4vw;
  /* background-color: rgb(36, 38, 38); */
  /* border: 1px rgb(65, 63, 63) solid; */
  display: flex;
  align-items: center;
  justify-content: space-around;
}
.consts {
  width: 4vw;
  height: 4vw;
  border-radius: 50%;
  background-color: aqua;
  background: url("../../../../../public/img/record-play.png") no-repeat;
  background-size: 100%;
}
.consts_f {
  width: 4vw;
  height: 4vw;
  border-radius: 50%;
  background-color: aqua;
  background: url("../../../../../public/img/record-stop.png") no-repeat;
  background-size: 100%;
}
.left {
  width: 3vw;
  height: 3vw;
  border-radius: 50%;
  background: url("../../../../../public/img/s-left.png") no-repeat;
  background-size: 100%;
}
.right {
  width: 3vw;
  height: 3vw;
  border-radius: 50%;
  background: url("../../../../../public/img/s-right.png") no-repeat;
  background-size: 100%;
}
.progress_bar {
  position: absolute;
  left: 25vw;
  top: 2vw;
  width: 60vw;
  height: 0.01vw;
  background-color: antiquewhite;
  display: flex;
  align-items: center;
  justify-content: left;
}
.tou {
  position: absolute;
  left: 0vw;
  top: -0.5vw;
  width: 1vw;
  height: 1vw;
  border-radius: 50%;
  background-color: rgba(0, 0, 0, 1);
  z-index: 99;

  /* animation-fill-mode: forwards; */
}
/* animation: tou_go 20s linear; */
.progress {
  position: absolute;
  left: 0vw;
  width: 0vw;
  height: 0.01vw;
  background-color: rgb(255, 145, 0);

  /* animation-fill-mode: forwards; */
}
/* animation: progress_go 20s linear; */
.time {
  position: absolute;
  right: 11vw;
  top: 1vw;
  width: 3vw;
  height: 1.5vw;
  font-size: 0.8vw;
  line-height: 1.5vw;
}
@keyframes tou_go {
  0% {
    transform: translateX(0vw);
  }
  100% {
    transform: translateX(60vw);
  }
}
@keyframes progress_go {
  0% {
    width: 0vw;
  }
  100% {
    width: 60vw;
  }
}
</style>