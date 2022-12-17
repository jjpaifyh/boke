<!--  -->
<template>
  <div class="box">
    <!-- <div class="shang"></div> -->
    <div class="box_top">
      <div class="top">留言板</div>
      <div class="main">
        😄这里是用来灌水的地方，我不一定回复， 😝 各位随意哈~
      </div>
    </div>
    <div class="box_pl">
      <comment
        :avatar="data.avatar"
        :comment-num="data.commentNum"
        :placeholder="placeholder"
        :author-id="data.authorId"
        :label="data.label"
        :comment-list="data.commentList"
        @doSend="comment"
        @doChidSend="reply"
        v-if="data.commentList.length != 0"
      ></comment>
    </div>
  </div>
</template>
  
  <script>
// https://gitee.com/bright-boy/bright-comment
import comment from "bright-comment";
import {
  comment_main,
  comment_user,
  comment_02,
  comment_add_01,
  qq_cx,
  comment_add_02,
} from "../request/boke/api.js";
import axios from "axios";
import { json } from "body-parser";

export default {
  data() {
    return {
      name: "",
      user: {},
      qq: "",
      textpl: {},
      // beiyon: {},
      data: {},
      placeholder: "您的鼓励是我前进的动力！",
      commentData: {},
    };
  },
  components: {
    comment,
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    get_user() {
      if ("qq" in this.$store.state.user) {
        this.user.qq = this.$store.state.user.qq;
        this.user.name = this.$store.state.user.name;
        this.user.url_img = this.$store.state.user.url_img;
        qq_cx({ qq: this.user.qq }).then((res) => {
          this.user.id = res.data[0].id;
          this.$store.state.user.id = res.data[0].id;
        });
      }
      // console.log(this.user);
    },
    // 对拿到的数据进行处理
    async data_textpl_init() {
      // 一级处理

      // 一级评论固定评论博客作者
      let boke_00 = {
        id: "000",
        nickName: "博客作者",
        avatar:
          "http://thirdqq.qlogo.cn/g?b=sdk&k=CXQicDo1avw5q82A8NfCKOQ&s=100&t=1586483094?rand=1605000166",
      };
      let data_comment = [];
      // 发请求拿数据
      await comment_main().then((res) => {
        data_comment = res.data;
      });
      // 获取用户数据
      await data_comment.forEach((v) => {
        // console.log(v.commentUser);
        comment_user({ id: v.commentUser }).then((res) => {
          // console.log(res.data[0].name);
          let user = {
            id: v.commentUser,
            nickName: res.data[0].name,
            avatar: res.data[0].url_img,
          };
          v.commentUser = user;
          v.targetUser = boke_00;
        });
      });
      // console.log(data_comment);
      // https://blog.csdn.net/chendongpu/article/details/117331757
      // 添加二级评论
      let list_prmis = [];
      for (let i = 0; i < data_comment.length; i++) {
        let zhuru = data_comment.length - 1;
        let v = data_comment[i];
        comment_02({ id: v.id }).then((data) => {
          for (let j = 0; j < data.data.length; j++) {
            let vs = data.data[j];
            let a = new Promise((reslove, reject) => {
              comment_user({ id: vs.commentUser }).then((res) => {
                let user = {
                  id: vs.commentUser,
                  nickName: res.data[0].name,
                  avatar: res.data[0].url_img,
                };
                vs.commentUser = user;
                reslove(res);
              });
            });
            let b = new Promise((reslove, reject) => {
              comment_user({ id: vs.targetUser }).then((res) => {
                let targetUseruser = {
                  id: vs.targetUser,
                  nickName: res.data[0].name,
                  avatar: res.data[0].url_img,
                };
                vs.targetUser = targetUseruser;
                reslove(res);
              });
            });
            list_prmis.push(a);
            list_prmis.push(b);
            // delete vs.id;
          }

          Promise.all(list_prmis).then((res) => {
            v.childrenList = data.data;
            // console.log(res);
            // console.log("查看结果");
            // console.log(data_comment);

            if (zhuru == i) {
              let textpl = {
                // 头像
                avatar: this.user.url_img,
                commentNum: data_comment.length,
                authorId: 193016309,
                label: "小鹏",
                commentList: data_comment,
              };
              // console.log(this.textpl);
              this.textpl = textpl;
              // const str = JSON.stringify(this.textpl, null, 4);

              // print JSON string
              // console.log(str);

              this.data = textpl;
            }
          });
        });
      }
    },
    // 发出一级评论
    comment(content) {
      // 设置评论的基本信息
      this.commentData.content = content;
      this.commentData.targetUser = "000";
      this.commentData.createDate = new Date().toLocaleString();
      this.commentData.commentUser = this.$store.state.user.id;
      comment_add_01(this.commentData).then((v) => {
        console.log("成功执行");
      });
      // console.log(this.commentData);
      this.data_textpl_init();
    },
    // 发出二级评论
    reply(content, bid, pid) {
      // 设置评论的基本信息
      this.commentData.content = content;
      this.commentData.createDate = new Date().toLocaleString();
      this.commentData.targetUser = bid;
      this.commentData.commentUser = this.$store.state.user.id;
      this.commentData.messageboard_id = pid;
      comment_add_02(this.commentData).then((res) => {
        // console.log(res);
      });
      this.data_textpl_init();
      // console.log(this.commentData);
    },
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
    this.get_user();
    this.data_textpl_init();
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
.box {
  position: relative;
  width: 100vw;
  height: 100vh;
  background-color: cadetblue;
  background: url("../assets/img/site_head.png") center center no-repeat;
  background-size: 100% 100%;
  overflow: scroll;
  /* filter: blur(1px); */
}
.shang {
  position: absolute;
  width: 100vw;
  height: 100vh;
  opacity: 0.5;
  background-color: rgb(38, 38, 38);
  /* background-image: ; */
}
.box_pl {
  position: absolute;
  width: 60vw;
  height: 100vh;
  background-color: aliceblue;
  top: 80%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.box::-webkit-scrollbar {
  width: 0 !important;
}
.box_top {
  position: absolute;
  width: 60vw;
  height: 20vh;
  background-color: aliceblue;
  top: 6%;
  left: 50%;
  transform: translate(-50%);
  border-radius: 20px;
}
.top {
  width: 70%;
  height: 40%;
  text-align: center;
  line-height: 8vh;
  background-color: aliceblue;
  font-size: 3vw;
  letter-spacing: 10px;
  font-weight: 700;
  color: #82f5f1;
  text-shadow: 4px 4px 0 #2260b1;
  border-bottom: 1px solid #adadad;
  margin: auto;

  /* margin-bottom: 5vw; */
}
.main {
  width: 100%;
  height: 60%;
  text-align: center;
  line-height: 12vh;
  background-color: aliceblue;
  font-size: 1.2vw;
  letter-spacing: 2px;
  font-weight: 700;
  color: #82f5f1;
  text-shadow: 1px 1px 0 #2260b1;
}
.hbl-fa {
  background-color: aliceblue;
}
</style>