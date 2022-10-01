<template>
  <div
    :class="{ PlayerBox: true, go_cons: isgo, go_y: !isgo }"
    @click="go_run()"
  >
    <div
      class="imgurlbox"
      :style="{ background: `url(${mucuisimg}) no-repeat` }"
    ></div>
    <div class="hei"></div>
    <Lyric :isgo="isgo"></Lyric>
  </div>
</template>

<script>
import Lyric from "../Lyric";
export default {
  name: "PlayerBox",
  data() {
    return {
      isgo: false,
      is_TF: true,
    };
  },
  props: {
    mucuisimg: {
      type: String,
      default:
        "http://p3.music.126.net/o_OjL_NZNoeog9fIjBXAyw==/18782957139233959.jpg",
    },
  },
  components: { Lyric },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    go_run() {
      if (this.is_TF) {
        this.isgo = !this.isgo;
        this.is_TF = false;
        setTimeout(() => {
          this.is_TF = true;
        }, 2000);
      }
    },
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {},
};
</script>
<style scoped>
.PlayerBox {
  position: absolute;
  top: 40%;
  left: 28%;
  width: 35vw;
  height: 35vw;
  transform: translate(-50%, -50%);
  background-color: rgb(15, 16, 16);
  border-radius: 50%;
  filter: none;
  z-index: 99;
}
.imgurlbox {
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
  background-size: 100% !important;
  transform-origin: 50% 50%;
  animation: run_go 4s infinite linear;
  z-index: 99;
}
.hei {
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
  z-index: 99;
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
@keyframes go_con {
  0% {
    left: 28%;
  }
  100% {
    left: 50%;
  }
}
.go_cons {
  animation: go_con 2s;
  animation-fill-mode: forwards;
}
@keyframes go_ys {
  0% {
    left: 50%;
  }
  100% {
    left: 28%;
  }
}
.go_y {
  animation: go_ys 2s;
  animation-fill-mode: forwards;
}
</style>