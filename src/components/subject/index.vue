<template>
  <div class="index">
    <div>
      <ListData />
      <ListData />
      <ListData />
      <ListData />
      <ListData />
    </div>
    <div>
      <MyList />
    </div>
  </div>
</template>

<script>
import MyList from "./components/MyList";
import ListData from "./components/ListData";
export default {
  name: "index",
  data() {
    return {};
  },
  components: {
    ListData,
    MyList,
  },
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
.index {
  width: 70vw;
  height: 5000px;
  background-color: rgb(255, 255, 255);
  margin: auto;
  display: flex;
}
</style>