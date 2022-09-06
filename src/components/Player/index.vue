<template>
  <div class="Player">
    <PlayerBox />
  </div>
</template>

<script>
import PlayerBox from "./components/PlayerBox";
export default {
  name: "Player",
  data() {
    return {};
  },
  components: { PlayerBox },
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
  beforeCreate() {}, //生命周期 - 创建之前
  //beforeMount() {}, //生命周期 - 挂载之前
  //beforeUpdate() {}, //生命周期 - 更新之前
  //updated() {}, //生命周期 - 更新之后
  //beforeDestroy() {}, //生命周期 - 销毁之前
  //destroyed() {}, //生命周期 - 销毁完成
  //activated() {}, //如果页面有keep-alive缓存功能，这个函数会触发
};
</script>
<style scoped>
.Player::before {
  content: "";
  display: inline-block;
  width: 100vw;
  height: 95vh;
  background: url("https://p1.music.126.net/dDgHDWlJAFwkMNrjbQExIA==/109951165959446596.jpg")
    no-repeat;
  background-size: 100%;
  overflow: hidden;
  filter: blur(50px);
}
</style>