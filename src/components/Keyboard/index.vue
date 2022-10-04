<!--  -->
<template>
  <div class="lg" @click="add()">{{ listdata.title }}</div>
</template>

<script>
export default {
  name: "",
  data() {
    return {};
  },
  props: {
    listdata: {},
    name: "",
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    add() {
      let routeurl = this.$router.resolve({
        path: "/Play_m",
        query: {
          chapterPath: this.listdata.chapterPath,
          name: this.name,
          num: this.listdata.title,
        },
      });
      window.open(routeurl.href, "_blank");
    },
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
    // console.log(this.listdata.chapterPath);
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
.lg {
  width: 100px; /*设置好宽高*/
  height: 30px;
  border-radius: 15px;
  text-align: center;
  line-height: 30px;
  color: rgb(255, 255, 255);
  margin: 20px;
  /* margin-left: 22px; */
  border: 1px rgb(0, 0, 0) solid;
  color: #000;
}
.lg:hover {
  width: 100px; /*设置好宽高*/
  height: 30px;
  border-radius: 15px; /*圆角边框*/
  /* top: 50%; */
  /* left: 50%; */
  border: 1px rgb(13, 235, 235) solid;
  /* transform: translate(-50%, -50%);  */
  background: linear-gradient(
    90deg,
    #03a9f4,
    #ffeb3b,
    #f441a5,
    #ff253a,
    #bbffaa,
    #eeeeee
  );
  /*设置背景颜色渐变*/
  background-size: 400%; /*设置背景填充比例,放大4倍,使颜色过渡柔和,淡化线条*/
  /* position: absolute; */
  animation: stream 8s infinite linear; /*开启动画帧,线性移动背景,无限循环*/
  text-align: center;
  line-height: 30px;
  color: rgb(255, 255, 255);
  margin: 20px;
}

@keyframes stream {
  from,
  to {
    background-position: 0%; /*无线循环,开始和结束帧设置相同*/
  }
  50% {
    background-position: 100%; /*关键帧设置背景移动100%*/
  }
}
</style>