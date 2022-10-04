<!--  -->
<template>
  <div class="Par">
    <div class="box_p">
      <div class="box_img">
        <div class="logo-site">
          <div class="kk"></div>
          <img :src="data.cover" alt="" />
        </div>
        <div class="pb">
          <div style="font-size: 20px; font-weight: 700; color: #ffffff">
            片名:{{ data.title }}
          </div>
          <div>作者:{{ data.director }}</div>
          <div>介绍:{{ data.descs }}</div>
          <div>发布时间:{{ data.releaseTime }}</div>
          <div>更新时间:{{ data.updateTime }}</div>
          <div>分类:{{ data.videoType }}</div>
        </div>
      </div>

      <div class="db">
        <Keyboard
          v-for="(k, index) in data.chapterList"
          :key="index"
          :listdata="k"
          :name="data.title"
        ></Keyboard>
      </div>
    </div>
  </div>
</template>

<script>
import Keyboard from "../components/Keyboard/index.vue";
import axios from "axios";
export default {
  name: "",
  data() {
    return {
      videoId: "",
      data: {},
    };
  },
  components: { Keyboard },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {},
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
    this.videoId = this.$route.query.videoId;
    // console.log(this.videoId);
    let url = `https://api.pingcc.cn/videoChapter/search/${this.videoId}`;
    axios.get(url).then((res) => {
      // console.log(res.data.data);
      this.data = res.data.data;
      this.data.videoType = this.data.videoType.split(",")[0];
    });
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
.Par {
  position: relative;
  width: 100vw;
  height: 100vh;
  background-color: #ffe74e;
  background-image: linear-gradient(147deg, #f5baca 0%, #51a2e8 74%);
  min-height: 100vh;
  font-family: "Fira Sans", sans-serif;
  display: flex;
}
.box_p {
  width: 60vw;
  height: 100vh;
  /* border: 1px #ccc solid; */
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
.box_img {
  width: 60vw;
  display: flex;
  margin-top: 50px;
  margin-bottom: 50px;
  justify-content: space-around;
}
.box_img .logo-site img {
  width: 14.06vw;
  height: 20.16vw;
  overflow: hidden;
}

.pb {
  width: 35vw;
  display: flex;
  justify-content: space-around;
  flex-direction: column;
  /* align-items: center; */
  /* margin-left: 20px; */
}
.db {
  width: 60vw;
  height: 20vw;
  /* border: 1px red solid; */
  /* background-color: rgba(255, 255, 255, 1); */
  border-radius: 20px;
  display: flex;
  flex-wrap: wrap;
  overflow: hidden;
  justify-content: space-between;
  /* overflow-y: scroll; */
  overflow-y: scroll;
  white-space: nowrap;
  box-shadow: 0 2px 4px rgb(0 0 0 / 10%);
}
.db::after {
  /* display: inline-block; */
  content: "";
  position: absolute;
  width: 100%;
  border-radius: 20px;
  height: 20vw;
  background: url("http://localhost:2000/public/images/listbj.png") center
    center;
  /* opacity: 0.5; */
  background-size: 100%;
  opacity: 0.4;
  z-index: -1;
}
::-webkit-scrollbar {
  width: 0 !important;
}
::-webkit-scrollbar {
  width: 0 !important;
  height: 0;
}
.logo-site {
  position: relative;
  width: 14.06vw;
  height: 20.16vw;
  overflow: hidden !important;
}
.kk {
  /* display: inline-block; */
  /* content: ""; */

  position: absolute;

  left: -665px;

  top: -460px;

  width: 800px;

  height: 15px;

  background-color: rgba(255, 255, 255, 0.5);
  transform: rotate(-45deg);
  animation: searchLights 3s ease-in 3s infinite;
}

@keyframes searchLights {
  0% {
    left: -500px;
    top: 0;
  }

  to {
    left: 300px;
    top: 300px;
  }
}
</style>