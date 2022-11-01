<!--  -->
<template>
  <div class="article">文章页面，正在疯狂构建中 id：{{ id }}</div>
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
  width: 100%;
  height: 50vw;
}
</style>