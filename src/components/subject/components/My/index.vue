<!--  -->
<template>
  <div class="my">
    <div class="head"></div>
    <div class="shang"></div>
    <p class="js">咦？我是谁？我为什么会在这？[关于]</p>
  </div>
</template>

<script>
export default {
  name: "my",
  data() {
    return {};
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {},
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
.my {
  position: relative;
  width: 100%;
  height: 13.98vw;
  margin: 0 0 15px;
  /* padding: 20px 25px; */
  background-color: #fff;
  box-shadow: 0 2px 4px rgb(0 0 0 / 10%);
  border-radius: 0;
  /* background-color: aqua; */
}
.shang {
  width: 100%;
  height: 50%;
  background: url("http://localhost:2000/api/myabout");
  background-size: 100%;
}
.head {
  position: absolute;
  border: rgba(255, 255, 255, 0.4) 4px solid;
  width: 100px;
  height: 100px;
  background: url("http://thirdqq.qlogo.cn/g?b=sdk&k=CXQicDo1avw5q82A8NfCKOQ&s=100&t=1586483094?rand=1605000166")
    no-repeat;
  background-size: 100%;
  border-radius: 50%;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
.js {
  position: absolute;
  width: 100%;
  height: 20px;
  /* background-color: aqua; */
  top: 70%;
  text-align: center;
  font-size: 13px;
  color: rgb(155 155 155);
}
</style>