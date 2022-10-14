<!--  -->
<template>
  <div class="hint" :class="{ tf: is_tf }">
    <img src="../../assets/img/sj.png" alt="" />
    <div>{{ text }}</div>
  </div>
</template>

<script>
export default {
  name: "hint",
  data() {
    return {
      // is_tf: false,
    };
  },
  //监听属性 类似于data概念
  props: {
    text: "",
    is_tf: {
      type: Boolean,
      default: false,
    },
  },
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
.hint {
  width: 20vw;
  height: 5vw;
  background-color: rgb(123, 122, 122);
  position: absolute;
  left: 50%;
  top: 10%;
  transform: translateX(-50%);
  display: flex;
  z-index: 99;
  border-radius: 50px;
  /* animation: run 2s; */
  opacity: 0;
}
.hint img {
  width: 40%;
  /* height: 5vw; */
  /* height: auto; */
}
.hint div {
  font-size: 15px;
  color: rgb(255, 255, 255);
  font-weight: 700;
  line-height: 5vw;
  text-align: center;
  margin-left: 2vw;
}
@keyframes run {
  0% {
    opacity: 0;
    top: 0px;
  }
  50% {
    opacity: 1;
    top: 150px;
  }
  100% {
    opacity: 0;
    top: 150px;
  }
}
.tf {
  animation: run 2s;
}
</style>