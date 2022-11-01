<!--  -->
<template>
  <div class="">
    <div>
      <el-breadcrumb separator="/" class="boxmbx">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item><a href="#/music">音乐庭院</a></el-breadcrumb-item>
        <el-breadcrumb-item>音乐播放器</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <Player />
  </div>
</template>

<script>
import Player from "../components/Player";
export default {
  name: "",
  data() {
    return {};
  },
  components: { Player },
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
.boxmbx {
  width: 50vw !important;
  height: 3vw !important;
  /* background-color: rgb(167, 167, 169); */
  position: fixed !important;
  top: 0;
  left: 50px;
  z-index: 999;
  overflow: hidden;
  /* width: 100% !important;
  height: 100% !important; */
  /* background-color: aqua; */
  line-height: 3vw;
}
</style>