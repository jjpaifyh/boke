<template>
  <div
    :class="top_TF ? 'show_top dropDown ' : 'dropDown go_F '"
    @click="top_go($event)"
  ></div>
</template>

<script>
export default {
  name: "index",
  data() {
    return {
      top_TF: true,
      scrollTop_data: 1,
      is_TF: true,
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {
    // 监听滚动跳，是否隐藏top按键
    scrollTop_data: function (newV, oldV) {
      // console.log(`检测数据：${newV},${oldV}`);
      if (newV > 320) {
        this.top_TF = false;
      }
      if (newV < 320) {
        if (this.is_TF) this.top_TF = true;
      }
    },
  },
  //方法集合
  methods: {
    // 回到顶部
    top_go(e) {
      e.target.classList.add("go");
      this.is_TF = false;
      // 返回顶部,有bug！！！！！！！！！！！
      const top_date = setInterval(() => {
        window.scrollBy(0, -this.scrollTop_data / 10);
      }, 10);
      setTimeout(() => {
        clearInterval(top_date);
        this.top_TF = true;
        this.is_TF = true;
      }, 1000);
    },
    windowScroll() {
      // 滚动条距离页面顶部的距离
      // 以下写法原生兼容
      let scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop;
      this.scrollTop_data = scrollTop;
      console.log("发送了改变");
    },
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
    // 注册窗口滚动条事件
    let body = document.querySelector("body");
    console.log(body);
    window.addEventListener("scroll", this.windowScroll);
  },
  //beforeCreate() {}, //生命周期 - 创建之前
  //beforeMount() {}, //生命周期 - 挂载之前
  //beforeUpdate() {}, //生命周期 - 更新之前
  //updated() {}, //生命周期 - 更新之后
  beforeDestroy() {
    // 解绑监听滚动事件
    window.removeEventListener("scroll", this.windowScroll);
  }, //生命周期 - 销毁之前
  //destroyed() {}, //生命周期 - 销毁完成
  //activated() {}, //如果页面有keep-alive缓存功能，这个函数会触发
};
</script>
<style scoped>
.dropDown {
  width: 3vw;
  height: 3vw;
  /* background-color: rgb(103, 101, 99); */
  background: url("../..//assets/img/top.png") no-repeat;
  background-size: 100%;
  position: fixed;
  bottom: 8vh;
  left: 90vw;
  z-index: 100;
}
.show_top {
  display: none;
}

.go_F {
  /* 调用动画 */
  animation-name: top_run_f;
  /* 持续时间 */
  animation-duration: 1s;
}
@keyframes top_run_f {
  0% {
    transform: translateY(-100vh);
  }
  100% {
    transform: translateY(0);
  }
}
.go {
  /* 调用动画 */
  animation-name: top_run;
  /* 持续时间 */
  animation-duration: 1s;
}
@keyframes top_run {
  0% {
    transform: translateY(0);
  }
  100% {
    transform: translateY(-100vh);
  }
}
</style>