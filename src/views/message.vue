<!--  -->
<template>
  <div class="box">
    <!-- <div class="shang"></div> -->
    <div class="box_top">
      <div class="top">çè¨æ¿</div>
      <div class="main">
        ðè¿éæ¯ç¨æ¥çæ°´çå°æ¹ï¼æä¸ä¸å®åå¤ï¼ ð åä½éæå~
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
      placeholder: "æ¨çé¼å±æ¯æåè¿çå¨åï¼",
      commentData: {},
    };
  },
  components: {
    comment,
  },
  //çå¬å±æ§ ç±»ä¼¼äºdataæ¦å¿µ
  computed: {},
  //çæ§dataä¸­çæ°æ®åå
  watch: {},
  //æ¹æ³éå
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
    // å¯¹æ¿å°çæ°æ®è¿è¡å¤ç
    async data_textpl_init() {
      // ä¸çº§å¤ç

      // ä¸çº§è¯è®ºåºå®è¯è®ºåå®¢ä½è
      let boke_00 = {
        id: "000",
        nickName: "åå®¢ä½è",
        avatar:
          "http://thirdqq.qlogo.cn/g?b=sdk&k=CXQicDo1avw5q82A8NfCKOQ&s=100&t=1586483094?rand=1605000166",
      };
      let data_comment = [];
      // åè¯·æ±æ¿æ°æ®
      await comment_main().then((res) => {
        data_comment = res.data;
      });
      // è·åç¨æ·æ°æ®
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
      // æ·»å äºçº§è¯è®º
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
            // console.log("æ¥çç»æ");
            // console.log(data_comment);

            if (zhuru == i) {
              let textpl = {
                // å¤´å
                avatar: this.user.url_img,
                commentNum: data_comment.length,
                authorId: 193016309,
                label: "å°é¹",
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
    // ååºä¸çº§è¯è®º
    comment(content) {
      // è®¾ç½®è¯è®ºçåºæ¬ä¿¡æ¯
      this.commentData.content = content;
      this.commentData.targetUser = "000";
      this.commentData.createDate = new Date().toLocaleString();
      this.commentData.commentUser = this.$store.state.user.id;
      comment_add_01(this.commentData).then((v) => {
        console.log("æåæ§è¡");
      });
      // console.log(this.commentData);
      this.data_textpl_init();
    },
    // ååºäºçº§è¯è®º
    reply(content, bid, pid) {
      // è®¾ç½®è¯è®ºçåºæ¬ä¿¡æ¯
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
  //çå½å¨æ - åå»ºå®æï¼å¯ä»¥è®¿é®å½åthiså®ä¾ï¼
  created() {},
  //çå½å¨æ - æè½½å®æï¼å¯ä»¥è®¿é®DOMåç´ ï¼
  mounted() {
    this.get_user();
    this.data_textpl_init();
  },
  //beforeCreate() {}, //çå½å¨æ - åå»ºä¹å
  //beforeMount() {}, //çå½å¨æ - æè½½ä¹å
  //beforeUpdate() {}, //çå½å¨æ - æ´æ°ä¹å
  //updated() {}, //çå½å¨æ - æ´æ°ä¹å
  //beforeDestroy() {}, //çå½å¨æ - éæ¯ä¹å
  //destroyed() {}, //çå½å¨æ - éæ¯å®æ
  //activated() {}, //å¦æé¡µé¢ækeep-aliveç¼å­åè½ï¼è¿ä¸ªå½æ°ä¼è§¦å
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