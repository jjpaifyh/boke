<!--  -->
<template>
  <div class="box">
    <div class="box_carsousel">
      <el-carousel :interval="4000" type="card" height="20vw">
        <el-carousel-item v-for="(item, index) in data" :key="index">
          <img :src="item" alt="" class="img_box" />
        </el-carousel-item>
      </el-carousel>
    </div>
    <SearchCartoon></SearchCartoon>
  </div>
</template>

<script>
import { listmovie } from "@/request/boke/api.js";
import SearchCartoon from "@/components/SearchCartoon";
export default {
  name: "",
  data() {
    return {
      data: [],
      is: false,
    };
  },
  components: { SearchCartoon },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {},
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {
    listmovie().then((res) => {
      this.data = res.data.data;
    });
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
.box_carsousel {
  width: 80vw;
  height: 20vw;
  margin: auto;
  /* margin-top: 5vw; */
  padding-top: 5vw;
}
.img_box {
  width: 100%;
  height: 100%;
}
.box {
  width: 100vw;
  height: 100vh;
  background: url("http://localhost:2000/public/images/背景.jpg") center center
    no-repeat;
  background-size: 100% 100%;
  background-attachment: fixed;
}
.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
}
</style>