<!--  -->
<template>
  <div class="box">
    <div class="shang"></div>
    <div class="box_mian">
      <div class="box_text">404</div>
      <div class="go_souye" @click="go">前往首页</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "",
  data() {
    return {};
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    go() {
      this.$router.push("/init");
    },
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {},
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
.box {
  position: relative;
  width: 100vw;
  height: 100vh;
  background-color: cadetblue;
  background: url("../assets/img/miao.jpg") center center no-repeat;
  background-size: 100% 100%;
  /* filter: blur(1px); */
}
.shang {
  position: absolute;
  width: 100vw;
  height: 100vh;
  opacity: 0.5;
  background-color: rgb(38, 38, 38);
  /* background-image: ; */
}
.box_mian {
  position: relative;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 40vw;
  height: 10vw;
  /* background-color: rgb(240, 240, 240); */
}
.box_text {
  width: 40vw;
  height: 5vw;
  text-align: center;
  line-height: 5vw;
  font-size: 8vw;
  letter-spacing: 10px;
  font-weight: 700;
  color: #e7bc7b;
  text-shadow: 4px 4px 0 #2260b1;
  margin-bottom: 5vw;
}
.go_souye {
  width: 12vw;
  height: 5vw;
  text-align: center;
  line-height: 5vw;
  background-color: #323232;
  margin: auto;
  font-size: 1vw;
  color: rgb(241, 241, 241);
  font-weight: 700;
  border-radius: 10px;
}
.go_souye:hover {
  background-color: rgb(118, 118, 118);
}
</style>