<!--  -->
<template>
  <!-- 文章页面，正在疯狂构建中 id：{{ id }} -->
  <div class="article">
    <div class="titct">
      <div class="tit">Chevereto 3.20+ 与 Windows Server 的兼容性问题</div>
      <div class="box">
        <div class="iconfont">&#xe639;日期</div>
        <div class="iconfont">&#xe639;n条评论</div>
        <div class="iconfont">&#xe639;n次阅读</div>
        <div class="iconfont">&#xe639;n次点赞</div>
        <div class="iconfont">&#xe639;作者</div>
      </div>
    </div>
    <div class="main">内容</div>
  </div>
</template>

<script>
export default {
  name: "article",
  data() {
    return {
      id: "",
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    init() {
      // 拿到文章专属id
      this.id = this.$route.params.id;
      //   发送请求获取数据
    },
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
    this.init();
    // console.log(this.id);
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
.article {
  width: 70%;
  height: 50vw;
  background-color: rgb(235, 235, 235);
  margin: auto;
}
.titct {
  width: 100%;
  height: 10vw;
  /* border: 1px solid red; */
}
.titct .tit {
  width: 100%;
  height: 3vw;
  text-align: center;
  line-height: 3vw;
  font-size: 25px;
  /* background-color: blueviolet; */
  padding-top: 2vw;
}
.titct .box {
  width: 100%;
  height: 3vw;

  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 2vw;
}
.titct .box div {
  margin-left: 15px;
  margin-right: 15px;
}
.main {
  width: 100%;
  height: 80vh;
  background-color: rebeccapurple;
}
</style>