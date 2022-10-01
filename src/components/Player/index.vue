<!-- 总盒子 -->
<template>
  <div class="Player">
    <div
      class="bg"
      :style="{ background: `url(${mucuisimg}) no-repeat` }"
    ></div>
    <PlayerBox :mucuisimg="mucuisimg"></PlayerBox>
    <Box v-on:getimgurl="getimgurl" :mucuislist="mucuislist" v-if="is_tf"></Box>
  </div>
</template>

<script>
// 第三方库文件 elemntui axios qs
// 绝对路径
// 相对路径
// utils/axios
// api/index
// impoet {xx} from '@/api'
import { apimulist, logjjp, apidata } from "@/request/wyy/api.js";

import PlayerBox from "./components/PlayerBox";
import Box from "./components/Box";

export default {
  name: "Player",

  components: { PlayerBox, Box },

  data() {
    return {
      is_tf: false,
      name: 6452,
      mucuislist: [],
      mucuisimglists: [],
      mucisname: "",
      mucuisimg:
        "http://p3.music.126.net/o_OjL_NZNoeog9fIjBXAyw==/18782957139233959.jpg",
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    getimgurl(id) {
      apidata({
        ids: id,
      }).then((res) => {
        this.mucuisimg = res.data.songs[0].al.picUrl;
        this.mucisname = res.data.songs[0].name;
        this.$bus.$emit("getname", this.mucisname);
      });
      // this.mucuisimg = this.mucuisimglists[n];
    },
    data() {
      apimulist({
        id: "7628129235",
      }).then((res) => {
        let arr = res.data.playlist.tracks;
        let data = res.data.playlist.trackIds;
        console.log(res);
        data.forEach((v) => {
          this.mucuislist.push(v.id);
        });
        this.is_tf = true;
        console.log(this.mucuislist);
      });
    },
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {
    // 登录
    // login/cellphone?phone=18378083282&password=jjp20001204
    // 指定歌单
    // playlist/detail?id=7628129235
    // this.dl();
    this.data();
  },
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {},
  beforeCreate() {}, //生命周期 - 创建之前
};
</script>
<style scoped>
.bg {
  width: 100vw;
  height: 100vh;
  background-size: 100% !important;
  overflow: hidden;
  filter: blur(50px);
  background-position: center !important;
}
</style>