<template>
  <div class="Player">
    <PlayerBox />
  </div>
</template>

<script>
import PlayerBox from "./components/PlayerBox";
import axios from "axios";
export default {
  name: "Player",
  data() {
    return {
      songlist: [],
    };
  },
  components: { PlayerBox },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {},
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {
    // axios({
    //   method: "get",
    //   url: "http://localhost:3000/artist/top/song",
    //   params: {
    //     // 周杰伦
    //     id: 6452,
    //   },
    // }).then((res) => {
    //   this.songlist = res.data.songs;
    //   console.log(this.songlist);
    // });
  },
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
.Player {
  width: 100vw;
  height: 100vh;
  background: url("https://images.pexels.com/photos/844297/pexels-photo-844297.jpeg?cs=srgb&dl=pexels-eberhard-grossgasteiger-844297.jpg&fm=jpg")
    no-repeat;
  background-size: 100%;
  overflow: hidden;
  filter: blur(50px);
}
</style>