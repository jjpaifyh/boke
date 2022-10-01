<template>
  <div class="listdata">
    <div class="text_img">
      <img src="http://localhost:2000/api/list" alt="" />
      <div class="box_text">
        <h2>
          <div id="icoss">使用教程</div>
          Chevereto 3.20+ 与 Windows Server 的兼容性问题,第五版复刻js版
        </h2>
        <p>
          Windows 系统的路径分隔符为反斜杠(\)，而 Linux
          系统是正斜杠(/)，当代码中使用了 PHP
          自带函数获取路径，再进行路径拼接的话就会出现这种结果：D:\A\B/C/D.jpg，这并没有什么问题，PHP
          可…
        </p>
      </div>
    </div>
    <div class="ico">
      <a class="left-ico"><i class="fa iconfont">&#xe639;</i> 2022-04-12</a>
      <a class="left-ico"><i class="fa iconfont">&#xe661;</i> 7条评论</a>
      <a class="left-ico"><i class="fa iconfont"> &#xe610;</i> 3.32k次阅读</a>
      <a class="left-ico"><i class="fa iconfont">&#xe639;</i> 122人点赞</a>
      <a class="left-ico"><i class="fa iconfont">&#xe639;</i> 小鹏-鹏</a>
      <a class="flsex"><i class="fa iconfont">&#xeca1;</i> 查看更多></a>
    </div>
  </div>
</template>

<script>
export default {
  name: "listdata",
  data() {
    return {};
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
.listdata {
  position: relative;
  width: 45vw;
  height: 11.46vw;
  background-color: rgb(255, 255, 255);
  /* border-radius: 20px; */
  margin: 15px;
  box-shadow: 0 2px 4px rgb(0 0 0 / 10%);
}
.text_img img {
  position: absolute;
  width: 12.5vw;
  height: 7.55vw;
  overflow: hidden;
  margin: 20px;
  left: 20px;
}
.text_img > div {
  margin-left: 16vw;
  height: 8.75vw;
  padding: 21px 20px 0 3px;
  overflow: hidden;
}
.text_img {
  width: 100%;
  height: 11.46vw;
  display: flex;
  justify-content: center;
  align-content: center;
  flex-direction: row;
}
h2 {
  display: inline;
  margin: 0;
  font-size: 21px;
  color: #333;
  font-weight: 400;
}
.box_text {
  margin: 0.16vw 0 6px;
}
p {
  margin-top: 0.52vw;
  font-size: 15px;
  color: #333;
}
.ico {
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 1.77vw;
  /* padding: 3px 20px; */
  border-top: 0.05vw solid #f3f3f3;
  line-height: 1.41vw;
  overflow: hidden;
  display: flex;
  /* clear: both; */
  font-size: 0.63vw;
  /* background: rgba(253, 253, 253, 0.7); */
  align-content: center;
  justify-content: flex-start;
  border-top: 0.05vw solid rgba(83, 83, 83, 0.2);
  padding-left: 1.82vw;
}
/* .ico a {

} */
#icoss {
  /* position: absolute; */
  width: 85px;
  height: 22px;
  background: red;
  margin-top: 4px;
  margin-right: 8px;
  background-color: #51aded;
  position: relative;
  padding: 4px 6px;
  font-size: 12px;
  font-weight: 700;
  line-height: 14px;
  color: #fff;
}
#icoss::before {
  position: absolute;
  width: 0;
  height: 0;
  vertical-align: top;
  content: "";
  top: 8px;
  right: -4px;
  border-left: 4px solid #51aded;
  border-top: 4px solid transparent;
  border-bottom: 4px solid transparent;
}
.flsex {
  position: absolute;
  right: 0.52vw;
}
.left-ico {
  margin-left: 0.52vw;
}
.ico a:hover {
  color: rgb(137, 136, 134);
}
.box_text h2 {
  display: flex;
  justify-content: start;
  /* margin-left: 60px; */
}
</style>