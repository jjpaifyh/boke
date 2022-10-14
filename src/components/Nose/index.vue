<!--  -->
<template>
  <div class="index">
    <DropDown></DropDown>
    <!-- 导航栏 -->
    <div class="nev Gd">
      <div class="iconfont">&#xe639;首页</div>
      <div class="iconfont">&#xe661;文章</div>
      <div class="iconfont">
        &#xe610;工具
        <div class="div_box">
          <div>正则校验器</div>
        </div>
      </div>
      <div class="iconfont">&#xe8e1;友链</div>
      <div class="iconfont">
        &#xeca1;茶话会
        <div class="div_box san">
          <div @click="go_music()">音乐庭院</div>
          <div @click="goGame()">游戏大厅</div>
          <div @click="go_Cartoon()">私人影院</div>
          <div @click="go_PrettyPictures()">图库</div>
        </div>
      </div>
      <div class="iconfont">&#xe615;留言</div>
      <div class="iconfont">&#xe614;关于</div>
    </div>
    <!-- 特效文字栏 -->
    <div class="master GP">
      <h2>鹏の小さな巣</h2>
      <h4 id="text"></h4>
    </div>
  </div>
</template>

<script>
import DropDown from "../DropDown";
export default {
  name: "index",
  data() {
    return {};
  },
  components: { DropDown },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    go_music() {
      this.$router.push("/music");
    },
    goGame() {
      this.$router.push("/Game");
    },
    go_Cartoon() {
      this.$router.push("/Cartoon");
    },
    go_PrettyPictures() {
      this.$router.push("/PrettyPictures");
    },
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
    // 字段特效
    const textEl = document.querySelector("#text");
    console.log(textEl);
    const text = "欢迎来到小蒋的小窝,让我们一起学习进步吧";
    let idx = 1;
    let speed = 300 / 2;
    let TF = true;
    writeText();
    function writeText() {
      if (TF) {
        textEl.innerText = text.slice(0, idx);

        idx++;

        if (idx >= text.length) {
          TF = false;
        }
      } else {
        textEl.innerText = text.slice(0, idx);

        idx--;

        if (idx == 0) {
          TF = true;
        }
      }
      setTimeout(writeText, speed);
    }

    // 结束
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
  position: relative;
  height: 320px;
  width: 100%;
  background: url("http://localhost:2000/api/head") no-repeat;
  background-size: 100%;
  background-position: center center;
}
.nev {
  background-color: rgb(64, 65, 66, 0.5);
  width: 100%;
  height: 41px;
  display: flex;
  justify-content: center;
  align-content: center;
}
.nev > div {
  width: 8vw;
  overflow: hidden;
  /* background-color: blueviolet; */
  margin: 0px 20px 0px 20px;
  text-align: center;
  line-height: 41px;
  font-size: 15px;
  font-weight: 400;
  color: rgb(248, 248, 248);
}
.nev div:hover {
  background-color: rgb(248, 248, 248, 0.7);
  color: #000;
  overflow: visible;
}
.master {
  /* background-color: #fff; */
  width: 30%;
  height: 30%;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  color: rgb(245, 245, 245);
  text-shadow: 2px 2px 2px #666;
}
.master h2 {
  margin-bottom: 30px;
  font-size: 38px;
}
@font-face {
  font-family: "iconfont"; /* Project id 3597971 */
  src: url("//at.alicdn.com/t/c/font_3597971_np5hh6o3q1.woff2?t=1660830585154")
      format("woff2"),
    url("//at.alicdn.com/t/c/font_3597971_np5hh6o3q1.woff?t=1660830585154")
      format("woff"),
    url("//at.alicdn.com/t/c/font_3597971_np5hh6o3q1.ttf?t=1660830585154")
      format("truetype");
}
.Gd {
  position: fixed;
  top: 0;
  z-index: 3;
}
.GP {
  position: absolute;
  z-index: 2;
}
.div_box {
  display: flex;
  text-align: center;
  width: 8vw;
  height: 41px;
  flex-direction: column;
  color: rgb(0, 0, 0);
  background-color: rgb(248, 248, 248, 0.7);
}
.san {
  height: 164px;
}
</style>