<!--  -->
<template>
  <div class="Card" @click="jinru()">
    <div class="label" v-show="datas.videoType">
      {{ datas.videoType.split(",")[0] }}
    </div>
    <img v-lazy="datas.cover" />
    <p>{{ datas.title }}</p>
  </div>
</template>

<script>
export default {
  name: "Card",
  data() {
    return {};
  },
  props: {
    datas: {},
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    jinru() {
      // console.log(this.datas);
      let routeurl = this.$router.resolve({
        path: "/particulars",
        query: { videoId: this.datas.videoId },
      });
      window.open(routeurl.href, "_blank");
      // console.log(this.datas);
      // this.$router.push("/particulars");
    },
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
    // console.log(1111);
    // console.log(this.datas);
  },
};
</script>
<style scoped>
.Card {
  width: 15vw;
  /* height: 25vw; */
  height: 25vw;
  margin: 10px 20px 30px 20px;
  border: 1px #ccc solid;
  transition: all 0.9s;
  position: relative;
}
.Card img {
  width: 100%;
  height: 22vw;
}
p {
  width: 100%;
  height: 25px;
  /* border: 1px red solid; */
  background-color: rgb(255, 255, 255);
  line-height: 3vw;
  font-size: 15px;
  font-weight: 700;
  text-align: center;
}
.Card:hover {
  box-shadow: 0px 15px 30px rgba(0, 0, 0, 0.4);
  /* margin-bottom: 10px; */
  /* margin-top: 15px; */
}
.label {
  width: 3.5vw;
  height: 1.5vw;
  background-color: rgb(0, 205, 251);
  position: absolute;
  left: -6%;
  top: 2vw;
  font-size: 0.78vw;
  color: rgb(253, 253, 253);
  line-height: 1.5vw;
  font-weight: 700;
  text-align: center;
}
.label::before {
  position: absolute;
  width: 0;
  height: 0;
  vertical-align: top;
  content: "";
  top: 0.05vw;
  right: -0.73vw;
  border-left: 0.73vw solid rgb(0, 205, 251);
  border-top: 0.73vw solid transparent;
  border-bottom: 0.73vw solid transparent;
}
img[lazy="loading"] {
  display: block;
  width: 100% !important;
  height: 50% !important;
  margin-top: 30%;
}
</style>