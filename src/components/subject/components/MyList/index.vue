<template>
  <div :class="is_tf ? 'MyList' : 'MyList flox'">MyList</div>
</template>

<script>
export default {
  name: "MyList",
  data() {
    return {
      scrollTop_data: 1,
      is_tf: true,
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {
    scrollTop_data: function (newV, oldV) {
      if (newV > 279) {
        if (this.is_tf) {
          this.is_tf = false;
        }
      }
      if (newV < 279) {
        if (!this.is_tf) {
          this.is_tf = true;
        }
      }
    },
  },
  //方法集合
  methods: {
    windowScroll() {
      // 滚动条距离页面顶部的距离
      // 以下写法原生兼容
      let scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop;
      this.scrollTop_data = scrollTop;
    },
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
    window.addEventListener("scroll", this.windowScroll);
  },
  //beforeCreate() {}, //生命周期 - 创建之前
  //beforeMount() {}, //生命周期 - 挂载之前
  //beforeUpdate() {}, //生命周期 - 更新之前
  //updated() {}, //生命周期 - 更新之后
  beforeDestroy() {
    window.removeEventListener("scroll", this.windowScroll);
  }, //生命周期 - 销毁之前
  //destroyed() {}, //生命周期 - 销毁完成
  //activated() {}, //如果页面有keep-alive缓存功能，这个函数会触发
};
</script>
<style scoped>
.MyList {
  width: 20vw;
  height: 1000px;
  background-color: rgb(231, 240, 240);
  border-radius: 20px;
  margin: 15px 15px 15px 0px;
}
.flox {
  position: fixed;
  top: 41px;
}
/* 320-41 =279*/
</style>