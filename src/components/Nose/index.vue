<!--  -->
<template>
  <div class="index">
    <DropDown></DropDown>
    <!-- 导航栏 -->
    <div class="nev Gd">
      <div class="iconfont" @click="sy">&#xe639;首页</div>
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
      <div class="iconfont" @click="go_message()">&#xe615;留言</div>
      <div class="iconfont" @click="go_end()">&#xe614;关于</div>
    </div>
    <div class="TC_id" @click="tou" @mouseleave="leave">
      <el-button class="wj" type="primary" size="mini" round @click="C_MD"
        >新建文章</el-button
      >
      <img class="img_tx" :src="img_tx" alt="" />
      <div :class="['box_xla', tou_M == 1 ? 'go' : 'leave']">
        <div class="list_box">权限ID</div>
        <div class="list_box" @click="exit">退出登录</div>
      </div>
    </div>
    <!-- 特效文字栏 -->
    <div class="master GP">
      <h2>鹏の小さな巣</h2>
      <h4 id="text"></h4>
    </div>
    <hint :text="text_hint" :is_tf="is_tf"></hint>
  </div>
</template>

<script>
import hint from "../Hint";
import { mapMutations } from "vuex";
import axios from "axios";
import DropDown from "../DropDown";
export default {
  name: "index",
  data() {
    return {
      text: "",
      img_tx: require("../../assets/img/defaultheadportrait.png"),
      img_tx_new: "",
      tou_M: 2,
      text_hint: "",
      is_tf: false,
    };
  },
  components: { DropDown, hint },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    ...mapMutations(["userloig", "id_key_loig"]),
    // 退出
    exit() {
      this.$bus.$emit("exit_qq");
      this.text_hint = "退出成功~";
      this.is_tf = true;
      console.log("exit");
      this.userloig(undefined);
      this.id_key_loig(undefined);
      this.img_tx = require("../../assets/img/defaultheadportrait.png");
      // 发送信息告诉Login那边退出成功
      const qq_login_exit = setTimeout(() => {
        this.is_tf = !this.is_tf;
      }, 2000);
    },
    // 鼠标悬浮头像
    tou() {
      try {
        if ("qq" in this.$store.state.user) {
          // "qq" in this.$store.state.user && "qq" in this.$store.state.id_key
          this.tou_M = 1;
        }
      } catch (error) {
        console.log("没有登录，不可以点击");
      }
    },
    leave() {
      this.tou_M = 2;
    },
    // 获取用户头像
    getimguser(img) {
      // console.log(this.$store.state.id_key);
      // 判断是否直接事件总线传给了头像

      try {
        if (img != undefined) {
          this.img_tx = img;
          this.img_tx_new = img;
          console.log(this.img_tx_new);
        } else if ("qq" in this.$store.state.user) {
          // 如果没有传就去vuex内看看有没有账号数据
          this.img_tx = this.$store.state.user.url_img;
        } else {
          this.img_tx = require("../../assets/img/defaultheadportrait.png");
        }
      } catch {}
    },
    go_music() {
      // this.$router.push("/music");
      let routeurl = this.$router.resolve({
        path: "/music",
      });
      window.open(routeurl.href, "_blank");
    },
    goGame() {
      let routeurl = this.$router.resolve({
        path: "/Game",
      });
      window.open(routeurl.href, "_blank");
    },
    go_Cartoon() {
      let routeurl = this.$router.resolve({
        path: "/Cartoon",
      });
      window.open(routeurl.href, "_blank");
    },
    go_PrettyPictures() {
      let routeurl = this.$router.resolve({
        path: "/PrettyPictures",
      });
      window.open(routeurl.href, "_blank");
    },
    sy() {
      this.$router.push("/");
    },
    go_message() {
      this.$router.push("/message");
    },
    go_end() {
      this.$router.push("/MyH5");
    },
    zttx() {
      // 字段特效
      const textEl = document.querySelector("#text");
      console.log(textEl);
      const text = this.text;
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
    },
    async init() {
      await axios
        .get(
          "https://api.lilinbo.cn/api/dujitang?key=83ba6fc105e044eba353a6e00fc29af1"
        )
        .then((res) => {
          this.text = res.data.data;
        });
      this.zttx();
    },
    get_sx() {
      this.$bus.$on("gettxnose", ($event) => {
        // this.name = $event;
        console.log("触发了getimguser");
        this.getimguser($event);
      });
    },
    C_MD() {
      this.$router.push("/Creation");
    },
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {
    this.get_sx();
  },
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
    this.init();
    this.getimguser();
    // this.get_sx();
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
  background: url("../../assets/img/site_head02.png") center center no-repeat;
  background-size: 100%;
  /* background-position: top center; */
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
.TC_id {
  position: fixed;
  right: 2vw;
  width: 3vw;
  height: 41px;
  /* background-color: aliceblue; */
  z-index: 5;
}
.img_tx {
  width: 35px;
  height: 35px;
  size: 100% 100%;
  margin-top: 3px;
  margin-left: 10px;
  background-color: rgb(64, 65, 66, 0);
  border-radius: 50%;
}
.img_tx:hover {
  background-color: rgb(81, 81, 81);
}
.box_xla {
  width: 4vw;
  height: 0px;
  /* background-color: rgba(248, 248, 248, 0.7); */
  overflow: hidden;
  box-shadow: 1px 1px 3px rgb(147, 147, 147);
}
.box_xla .list_box {
  width: 4vw;
  height: 30px;
  color: rgb(0, 0, 0);
  background-color: rgba(248, 248, 248, 0.7);
  text-align: center;
  line-height: 30px;
  border-bottom: 1px solid rgb(139, 139, 139);
}
.go {
  animation: 0.2s linear run;
  animation-fill-mode: forwards;
}
.leave {
  animation: 0.2s linear leave;
  animation-fill-mode: forwards;
}
@keyframes run {
  0% {
    height: 0px;
  }
  100% {
    height: 60px;
  }
}
@keyframes leave {
  0% {
    height: 60px;
  }
  100% {
    height: 0px;
  }
}
.box_xla .list_box:hover {
  background-color: rgb(103, 103, 103);
  color: rgb(255, 255, 255);
}
.wj {
  position: absolute;
  right: 4vw;
  top: 6px;
}
</style>