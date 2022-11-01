<!--  -->
<template>
  <div class="box">
    <div class="ss"></div>

    <div class="container">
      <!-- <DropDown></DropDown> -->
      <div
        class="item"
        v-for="(i, index) in listurl"
        :key="index"
        @click="look()"
      >
        <img v-lazy="i" />
      </div>
    </div>
    <div class="but"></div>
    <div>
      <el-breadcrumb separator="/" class="boxmbx">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item
          ><a href="#/PrettyPictures">图库</a></el-breadcrumb-item
        >
        <el-breadcrumb-item>二次元美少女</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
  </div>
</template>

<script>
// import DropDown from "../components/Nose/components/DropDown/index.vue";
// import DropDown from "../components/DropDown";
export default {
  name: "PrettyPictures",
  data() {
    return {
      listurl: [],
    };
  },

  components: {
    // DropDown,
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    // https://www.dmoe.cc/random.php
    // https://api.cyfan.top/acg
    dataurl() {
      let url = "https://api.cyfan.top/acg?timestamp=";
      let date = new Date().getTime();
      //   console.log(date);
      for (let i = 0; i < 100; i++) {
        let newurl = url + date;
        date = date + 1;
        this.listurl.push(newurl);
      }
    },
    look() {
      console.log(1);
    },
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
    this.dataurl();
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
.box {
  width: 100vw;
  height: 100vh;
  overflow-x: hidden !important;
}
.ss {
  width: 100%;
  height: 10vw;
  background-image: linear-gradient(
    to bottom right,
    rgb(12, 246, 102),
    rgb(28, 154, 217)
  );
}
.but {
  width: 100%;
  height: 10vw;
  background-image: linear-gradient(
    to bottom right,
    rgb(48, 58, 20),
    rgb(42, 86, 36)
  );
  position: relative;
  bottom: 0;
}
.container {
  width: 100vw;
  height: 750vh;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  overflow-x: hidden !important;
  /* margin-top: 10vw; */
}
.item {
  /* flex: 20%; */
  width: 20%;
  flex-shrink: 1;
}

.item img {
  width: 100%;
}
</style>