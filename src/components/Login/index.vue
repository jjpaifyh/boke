<!--  -->
<template>
  <div class="dabj" v-show="is_show">
    <div class="logins" @click.stop="show_bj"></div>
    <div class="login" v-show="is_login">
      <div class="id">登录</div>
      <div class="a">
        <input
          type="text"
          placeholder=""
          v-model.lazy="id"
          :style="istf ? 'border-color: red;' : ''"
          required
        />
        <label>账号昵称</label>
      </div>

      <div class="b">
        <input
          type="password"
          placeholder=""
          v-model.lazy="pwd"
          :style="ispwd ? 'border-color: red;' : ''"
          required
        />
        <label>密码</label>
      </div>

      <div
        :class="[is_donhua ? 'dl' : 'dlrun']"
        style="cursor: pointer"
        @click="log"
      >
        登录
      </div>
      <span @click="qh" class="box_qh">没有账号？游客登录</span>
    </div>
    <div class="login" v-show="!is_login">
      <div>|</div>
      <div :class="[is_donhua ? 'img_tp' : ' run_tp_go']"></div>
      <div class="a">
        <input
          type="text"
          placeholder=""
          v-model.lazy="qq"
          :style="istf ? 'border-color: red;' : ''"
          required
        />
        <label class="aqh">QQ账号</label>
        <div :class="[is_donhua ? 'dl' : 'dlrun']" @click="login">登录</div>
      </div>
      <span @click="qh" class="box_qh">作者登录</span>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { nanoid } from "nanoid";
import { qq_cx, qq_rk } from "../../request/boke/api";
export default {
  name: "login",
  data() {
    return {
      id: "",
      pwd: "",
      istf: false,
      ispwd: false,
      is_login: false,
      qq: "",
      is_donhua: true,
      avatar: "",
      name: "",
    };
  },
  props: {
    is_show: false,
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    // 作者登录
    log() {
      this.is_donhua = false;
    },
    // qq登录
    login() {
      var qqPattern = /^[1-9][0-9]{4,10}$/;
      if (qqPattern.test(this.qq)) {
        this.is_donhua = false;
        setTimeout(async () => {
          //判断是否为老用户
          await qq_cx({
            qq: this.qq,
          })
            .then(async (res) => {
              if (res.data[0].code == 1) {
                this.$emit("xg_is_show");
                console.log(`查询成功：${res.data[0].code == 1}`);
                console.log(res.data);
                this.avatar = res.data[0].url_img;
                this.name = res.data[0].name;
                // this.is_tf = false;
                this.$emit("getthem", {
                  istf: true,
                  avatar: this.avatar,
                  name: this.name,
                  tit: "登录成功",
                });
              } else {
                console.log("没有这个用户");
                let url = "https://api.usuuu.com/qq/";
                url = url + this.qq;
                await axios
                  .get(url)
                  .then((res) => {
                    this.$emit("xg_is_show");
                    console.log(res.data);
                    if (res.data.code == 200) {
                      this.avatar = res.data.data.avatar;
                      this.name = res.data.data.name;
                      // this.is_tf = false;
                      this.$emit("getthem", {
                        istf: true,
                        avatar: this.avatar,
                        name: this.name,
                        tit: "注册成功",
                      });
                      // 生成id
                      // 入库qq号
                      // console.log(nanoid());
                      let id = nanoid() + "";
                      qq_rk({
                        id: id,
                        qq: this.qq,
                        name: this.name,
                        token: "弃用中...",
                      }).then((res) => {
                        console.log(res);
                      });
                    } else {
                      this.is_donhua = true;
                      this.$emit("getthem", { istf: false });
                    }
                  })
                  .catch((err) => {
                    // this.is_tf = true;
                  });
              }
            })
            .catch((err) => {
              // this.is_tf = true;
              console.log("查询失败");
              this.is_donhua = true;
              this.$emit("getthem", { istf: false });
              // this.is_tf = true;
            });
        }, 1000);
      } else {
        this.$emit("getthem", {
          istf: true,
          avatar: this.avatar,
          name: this.name,
          tit: "请输入正确的QQ号",
        });
        setTimeout(() => {
          this.$emit("getthem", { istf: false });
        }, 2000);
      }
    },
    getspan() {
      const labels = document.querySelectorAll("label");
      labels.forEach((label) => {
        label.innerHTML = label.innerText
          .split("")
          .map(
            (letter, idx) =>
              `<span style="transition-delay:${idx * 50}ms">${letter}</span>`
          )
          .join("");
      });
    },
    qh() {
      this.is_login = !this.is_login;
    },
    show_bj() {
      this.$emit("show_bj");
    },
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
    this.getspan();
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
<style lang="less">
.dabj {
  position: fixed;
  width: 100vw;
  height: 100vh;
  top: 0px;
  left: 0px;
  // background-color: rgba(90, 84, 76, 0.5);
  z-index: 5;
}
.logins {
  position: fixed;
  width: 100vw;
  height: 100vh;
  top: 0px;
  left: 0px;
  background-color: rgba(90, 84, 76, 0.5);
  z-index: 5;
}
.login {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 600px;
  height: 450px;
  background-color: #fff;
  // border-radius: 50px;
  display: flex;
  justify-content: center;
  align-content: center;
  text-align: center;
  flex-direction: column;
  z-index: 999;
}
.login input {
  width: 400px;
  height: 40px;
  margin-left: 0%;
  margin-top: 20px;
  margin-bottom: 20px;
  font-size: 20px;
  outline: none;
  border: none;
  border-bottom: 1px solid #ccc;
}
.id {
  font-size: 30px;
  font-weight: 700;
}
.dl {
  width: 400px;
  height: 60px;
  background-color: rgb(49, 210, 210);
  margin-left: 16%;
  border-radius: 30px;
  line-height: 60px;
  font-size: 20px;
  font-weight: 700;
  margin-top: 40px;
}
.a label {
  position: absolute;
  left: 100px;
  top: 146px;
}
.login .aqh {
  position: absolute;
  left: 100px;
  top: 235px;
}
.b label {
  position: absolute;
  left: 100px;
  top: 229px;
}

label span {
  display: inline-block;
  font-size: 18px;
  min-width: 5px;
  /* 动画时间，运动速度轨迹 */
  transition: 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
  color: rgb(135, 132, 132);
}

input:focus + label span,
input:valid + label span {
  color: rgb(17, 18, 18);
  transform: translateY(-30px);
}
.box_qh {
  position: absolute;
  left: 50%;
  bottom: 33px;
  transform: translateX(-50%);
  color: rgb(174, 174, 174);
  font-size: 15px;
}
.box_qh:hover {
  color: rgb(78, 78, 78);
}
.img_tp {
  position: relative;
  top: -20px;
  left: 50%;
  transform: translateX(-60%);
  width: 120px;
  height: 120px;
  background-color: aqua;
  border-radius: 50%;
  background: url("../../assets/img/login.jpg") no-repeat center center;
  background-size: 100%;
}
.dlrun {
  width: 400px;
  height: 60px;
  background-color: rgb(49, 210, 210);
  margin-left: 16%;
  border-radius: 30px !important;
  line-height: 60px;
  font-size: 20px;
  font-weight: 700;
  margin-top: 40px;
  animation: run_get 1s linear;
  animation-fill-mode: forwards;
}
@keyframes run_get {
  0% {
    border-radius: 30px !important;
    width: 400px;
    margin-left: 100px;
    border-radius: 0px;
  }
  50% {
    border-radius: 30px;
    width: 60px;
    margin-left: 268px;
    border-radius: 0px;
  }
  100% {
    width: 60px;
    border-radius: 50%;
    margin-left: 268px;
    // animation: rotation 1s linear infinite;
  }
}

@keyframes rotation {
  from {
    -webkit-transform: rotate(0deg);
  }
  to {
    -webkit-transform: rotate(360deg);
  }
}
.run_tp_go {
  position: relative;
  top: -20px;
  left: 39%;
  transform: translateX(-60%);
  width: 120px;
  height: 120px;
  background-color: aqua;
  border-radius: 50%;
  background: url("../../assets/img/login.jpg") no-repeat center center;
  background-size: 100%;
  animation: rotation 1s linear infinite;
  transform-origin: 50% 50%;
}
</style>