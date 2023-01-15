<!--  -->
<template>
  <div class="bottom" :style="pxjl" v-show="tf_show">
    <div class="box">
      <div class="box_s">
        <a href="https://github.com/">
          <div class="box_log">
            <img src="../../assets/img/github.png" alt="" />
            <div>GitHub</div>
          </div>
        </a>
        <a href="https://stackoverflow.com/"
          ><div class="box_log">
            <img src="../../assets/img/stackoverflow.png" alt="" />
            <div>stackoverflow</div>
          </div></a
        >
        <a href="https://blog.csdn.net/"
          ><div class="box_log">
            <img src="../../assets/img/csdn.png" alt="" />
            <div>CSDN</div>
          </div></a
        >
        <a href="https://cn.vuejs.org/">
          <div class="box_log">
            <img src="../../assets/img/vue.png" alt="" />
            <div>Vue</div>
          </div></a
        >
      </div>
      <div class="box_x">@小蒋的巢</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "bottom",
  data() {
    return {
      tf_show: true,
    };
  },
  props: {
    propD: {
      type: Number,
      default: 0,
    },
  },
  //监听属性 类似于data概念
  computed: {
    pxjl() {
      return `bottom: ${this.propD}px; `;
    },
  },
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {},
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
    this.$bus.$on("buttu", (res) => {
      this.tf_show = res;
      console.log("我bottom组件，收到了数据", res);
      const tf_show_gb = setTimeout(() => {
        this.tf_show = !this.tf_show;

        clearTimeout(tf_show_gb);
      }, 1000);
    });
  },
};
</script>
<style scoped>
.bottom {
  position: relative;

  width: 100%;
  height: 150px;
  background-color: rgba(52, 52, 52, 1);
}
.box {
  width: 30vw;
  height: 150px;
  /* background-color: aqua; */
  /* border: red 1px solid; */
  margin: auto;
}
.box_s {
  width: 100%;
  height: 60%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  font-size: 700;
}
.box_x {
  width: 100%;
  height: 40%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  color: rgb(189, 189, 189);
  font-size: 700;
}
.box_s img {
  width: 20px;
  height: 20px;
  margin-right: 5px;
}

.box_log {
  /* width: 25%; */
  height: 30px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  color: rgb(255, 255, 255);
}
.box_x:hover {
  color: rgb(255, 150, 3);
}

.box_log:hover {
  color: rgb(0, 255, 34);
}
</style>