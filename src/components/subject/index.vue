<template>
  <div class="index">
    <div>
      <ListData v-for="k in list_home_data" :key="k.id" :data="k" />
    </div>
    <div>
      <MyList />
    </div>
  </div>
</template> 
<script>
import MyList from "./components/MyList";
import ListData from "./components/ListData";
import { listhome } from "@/request/boke/api.js";
export default {
  name: "index",
  data() {
    return {
      list_home_data: [],
    };
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
  mounted() {
    listhome().then((res) => {
      this.list_home_data = res.data;
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
.index {
  width: 70vw;
  /* height: 500px; */
  background-color: #f5f5f5;
  margin: auto;
  display: flex;
  position: relative;
}
</style>