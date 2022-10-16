<template>
  <div
    :class="[is_tf ? 'MyList' : 'MyList flox']"
    :style="
      is_bh ? '' : `position: absolute !important;top:unset; bottom: 0px;`
    "
  >
    <My></My>
  </div>
</template>

<script>
import My from "../My/index.vue";
export default {
  name: "MyList",
  data() {
    return {
      scrollTop_data: 1,
      is_tf: true,
      is_bh: true,
    };
  },
  //监听属性 类似于data概念
  components: { My },
  computed: {},
  //监控data中的数据变化
  watch: {
    scrollTop_data: function (newV, oldV) {
      console.log(document.body.clientHeight);
      console.log(newV);
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
      if (newV > 1620) {
        // h:150
        // console.log("class固定");
        this.is_bh = false;
      }
      if (newV < 1620) {
        // console.log("class浮动");
        this.is_bh = true;
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
  height: 52.08vw;
  /* background-color: rgb(231, 240, 240); */
  background-color: #f5f5f5;
  /* border-radius: 20px; */
  margin: 15px 15px 15px 0px;
  border: 1px red solid;
}
.flox {
  position: fixed;
  top: 41px;
}

/* 320-41 =279*/
</style>