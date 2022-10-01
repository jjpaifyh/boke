<template>
  <div id="app">
    <router-view> </router-view>
  </div>
</template>


<script >
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
</style>