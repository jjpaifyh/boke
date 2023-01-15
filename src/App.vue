<template>
  <div id="app">
    <transition :name="transitionName">
      <!-- <keep-alive>
        <router-view v-if="$route.path.meta.keepAlive"> </router-view>
      </keep-alive>
      <router-view v-if="!$route.path.meta.keepAlive"> </router-view> -->

      <router-view> </router-view>
    </transition>
  </div>
</template>


<script >
import "@/plugins/element.js";
import "element-ui/lib/theme-chalk/index.css";
import Home from "./views/Home";
export default {
  name: "app",
  components: {
    Home,
  },
  created() {
    window.L2Dwidget
      //此处是对点击人物时触发事件的监听
      .on("*", (name) => {
        console.log(
          "%c 你点击了 " + "%c -> " + name,
          "background: #222; color: yellow",
          "background: #fff; color: #000"
        );
      })
      //对人物的属性配置
      .init({
        pluginRootPath: "../live2dw/", //人物文件夹的位置
        pluginJsPath: "lib/",
        pluginModelPath: "live2d-widget-model-shizuku/assets/",
        model: {
          jsonPath:
            "../live2dw/live2d-widget-model-shizuku/assets/shizuku.model.json",
        },
        content: {
          welcome: "欢迎来到小蒋的小窝",
        },
        dialog: {
          enable: true, //是否开启对话框
          script: {
            //每20s，显示一言（调用一言Api返回的句子）
            "every idle 20s": "$hitokoto$",
            //触摸到class='star'对象,将会展示的文字
            "hover .star": "星星在天上而你在我心里 (*/ω＼*)",
            //触摸到身体
            "tap body": "害羞⁄(⁄ ⁄•⁄ω⁄•⁄ ⁄)⁄",
            //触摸到头部
            "tap face": "~~",
          },
        },
        display: {
          //人物的属性配置
          position: "left",
          width: 150,
          height: 300,
          hOffset: 0, // 横向偏移
          vOffset: -20, // 纵向偏移
        },
        mobile: {
          show: true, //是否在移动端展示
          scale: 1, //t透明度
        },
      });
  },
  watch: {
    $route(to, from) {
      //此时假设从index页面跳转到pointList页面
      console.log(to); // "/pointList"
      console.log(from); // “/index”
      const routeDeep = ["/init"];
      const toDepth = routeDeep.indexOf(to.path);
      this.transitionName = toDepth != 0 ? "fold-left" : "fold-right";
    },
  },
};
</script>


<style lang="less">
* {
  padding: 0;
  margin: 0;
}
* {
  box-sizing: border-box;
}
html {
  cursor: url("./assets/sb.png"), default;
}
img[lazy="error"] {
  display: block;
  width: 100% !important;
  height: 50% !important;
  margin-top: 30%;
}

// 过度动画
.fold-left-enter-active {
  animation-name: fold-left-in;
  animation-duration: 0.5s;
}
.fold-left-leave-active {
  animation-name: fold-left-out;
  animation-duration: 0.5s;
}
@keyframes fold-left-in {
  0% {
    // position: absolute;
    transform: translate3d(100%, 0, 0);
  }
  100% {
    // position: absolute;
    transform: translate3d(0, 0, 0);
  }
}
@keyframes fold-left-out {
  0% {
    position: absolute;
    transform: translate3d(0, 0, 0);
  }
  100% {
    position: absolute;
    transform: translate3d(-100%, 0, 0);
  }
}
.fold-right-enter-active {
  animation-name: fold-left-in_jjp;
  animation-duration: 0.5s;
}
.fold-right-leave-active {
  animation-name: fold-left-out_jjp;
  animation-duration: 0.5s;
}
@keyframes fold-left-in_jjp {
  0% {
    width: 200vw !important;
    // position: absolute;
    transform: translate3d(-100%, 0, 0);
  }
  100% {
    width: 200vw !important;
    // position: absolute;
    transform: translate3d(0, 0, 0);
  }
}
@keyframes fold-left-out_jjp {
  0% {
    position: absolute;
    transform: translate3d(0, 0, 0);
  }
  100% {
    position: absolute;
    transform: translate3d(100%, 0, 0);
  }
}
</style>