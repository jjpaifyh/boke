<!--  -->
<template>
  <div class="my">
    <Hint :text="text" :is_tf="is_tf_Hint"></Hint>
    <Login
      :is_show="is_show"
      @xg_is_show="loginshow"
      @getthem="getthem"
      @show_bj="loginshow"
    ></Login>
    <div class="head">
      <img :src="avatar" alt="" v-show="avatar" />
    </div>
    <div class="shang"></div>
    <div class="js" v-show="!is_tf">{{ name == "" ? namenull : name }}</div>
    <div class="js" v-show="is_tf">
      咦？我是谁？我为什么会在这？
      <span @click="loginshow">[登录]</span>
    </div>
  </div>
</template>

<script>
import Login from "../../../Login";
import Hint from "../../../Hint";
import axios from "axios";
export default {
  name: "my",
  data() {
    return {
      avatar: "",
      name: "",
      is_tf: true,
      is_show: false,
      text: "登录成功",
      is_tf_Hint: false,
      namenull: "未知匿名",
    };
  },
  components: { Login, Hint },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    login(qq) {
      let url = "https://api.usuuu.com/qq/";
      url = url + qq;
      axios
        .get(url)
        .then((res) => {
          console.log(res.data);
          if (res.data.code == 200) {
            this.avatar = res.data.data.avatar;
            this.name = res.data.data.name;
            this.is_tf = false;
            console.log(this.is_tf);
          } else {
            this.is_tf = true;
          }
        })
        .catch((err) => {
          this.is_tf = true;
        });
    },
    loginshow() {
      this.is_show = !this.is_show;
    },
    getthem(tf) {
      if (tf.istf) {
        this.is_tf = false;
        this.avatar = tf.avatar;
        this.name = tf.name;
        this.text = tf.tit;
      } else {
        this.is_tf = true;
        this.text = "登录失败";
      }

      this.is_tf_Hint = true;
      setTimeout(() => {
        this.is_tf_Hint = false;
      }, 2000);
    },
  },
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
.my {
  position: absolute;
  width: 100%;
  height: 13.98vw;
  margin: 0 0 15px;
  /* padding: 20px 25px; */
  background-color: #fff;
  box-shadow: 0 2px 4px rgb(0 0 0 / 10%);
  border-radius: 0;
  /* background-color: aqua; */
}
.shang {
  width: 100%;
  height: 50%;
  background: url("http://localhost:2000/api/myabout");
  background-size: 100%;
}
.head {
  position: absolute;
  border: rgba(255, 255, 255, 0.4) 4px solid;
  width: 100px;
  height: 100px;
  background: url("http://thirdqq.qlogo.cn/g?b=sdk&k=CXQicDo1avw5q82A8NfCKOQ&s=100&t=1586483094?rand=1605000166")
    no-repeat;
  background-size: 100%;
  border-radius: 50%;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
.js {
  position: absolute;
  width: 100%;
  height: 20px;
  /* background-color: aqua; */
  top: 70%;
  text-align: center;
  font-size: 13px;
  color: rgb(155 155 155);
}
.head img {
  width: 93px;
  height: 93px;
  border-radius: 50%;
}
/* .HINT {
  left: -200px;
} */
</style>