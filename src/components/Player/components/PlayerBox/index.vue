<template>
  <div class="PlayerBox">
    <audio class="bof" :src="this.mucuis"></audio>
    <div class="box">
      <div class="left" @click="left_go()"></div>
      <div class="consts" v-if="is_tf" @click="playmu()"></div>
      <div class="consts_f" v-else @click="stopmu()"></div>
      <div class="right" @click="rght_go()"></div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "PlayerBox",
  data() {
    return {
      is_tf: true,
      mucuis: "",
      name: 6452,
      mucuis_list: [],
      n: 5,
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    // 拿到指定歌数据
    get_url() {
      // 拿到歌id
      let ids = this.mucuis_list[this.n].id;
      // 拿到歌名
      let name_mu = this.mucuis_list[this.n].name;
      // 拿到专辑图片
      let tup = this.mucuis_list[this.n].al.picUrl;
      // 请求歌曲url
      axios({
        method: "get",
        url: "http://localhost:3000/song/url",
        params: {
          id: ids,
        },
      }).then((res) => {
        this.mucuis = res.data.data[0].url;
      });
    },
    // 播放
    playmu() {
      this.is_tf = false;
      let au = document.querySelector(".bof");
      au.play();
    },
    // 暂停
    stopmu() {
      this.is_tf = true;
      let au = document.querySelector(".bof");
      au.pause();
    },
    // 上一首
    left_go() {
      this.n = this.n - 1;
      this.get_url();
      setTimeout(() => {
        this.playmu();
      }, 300);
    },
    // 下一首
    rght_go() {
      this.n = this.n + 1;
      this.get_url();
      setTimeout(() => {
        this.playmu();
      }, 300);
    },
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {
    axios({
      method: "get",
      url: "http://localhost:3000/artist/top/song",
      params: {
        id: this.name,
      },
    }).then((res) => {
      this.mucuis_list = res.data.songs;
      console.log(this.mucuis_list);
      this.get_url();
    });
  },
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {},
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
.PlayerBox {
  position: absolute;
  top: 40%;
  left: 50%;
  width: 35vw;
  height: 35vw;
  transform: translate(-50%, -50%);
  background-color: rgb(15, 16, 16);
  border-radius: 50%;
  filter: none;
}
.PlayerBox::before {
  position: absolute;
  content: "";
  display: inline-block;
  width: 15vw;
  height: 15vw;
  background-color: aqua;
  border-radius: 50%;
  top: 29%;
  left: 29%;
  /* transform: translate(-50%, -50%); */
  background: url("https://p1.music.126.net/dDgHDWlJAFwkMNrjbQExIA==/109951165959446596.jpg")
    no-repeat;
  background-size: 100%;
  transform-origin: 50% 50%;
  animation: run_go 4s infinite linear;
}
.PlayerBox::after {
  position: absolute;
  content: "";
  display: inline-block;
  width: 2vw;
  height: 2vw;
  background-color: rgb(0, 0, 0);
  border-radius: 50%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
@keyframes run_go {
  0% {
    transform: rotate(0);
  }
  100% {
    transform: rotate(360deg);
  }
}

.bof {
  position: fixed;
  width: 35vw;
  bottom: -25%;
  left: 0;
}
.box {
  position: absolute;
  bottom: -10vw;
  left: -12vw;
  width: 60vw;
  height: 5vw;
  /* background-color: rgb(36, 38, 38); */
  /* border: 1px rgb(65, 63, 63) solid; */
  display: flex;
  align-items: center;
  justify-content: space-around;
}
.consts {
  width: 5vw;
  height: 5vw;
  border-radius: 50%;
  background-color: aqua;
  background: url("../../../../../public/img/record-play.png") no-repeat;
  background-size: 100%;
}
.consts_f {
  width: 5vw;
  height: 5vw;
  border-radius: 50%;
  background-color: aqua;
  background: url("../../../../../public/img/record-stop.png") no-repeat;
  background-size: 100%;
}
.left {
  width: 4vw;
  height: 4vw;
  border-radius: 50%;
  background: url("../../../../../public/img/s-left.png") no-repeat;
  background-size: 100%;
}
.right {
  width: 4vw;
  height: 4vw;
  border-radius: 50%;
  background: url("../../../../../public/img/s-right.png") no-repeat;
  background-size: 100%;
}
</style>