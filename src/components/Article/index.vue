<!--  -->
<template>
  <!-- 文章页面，正在疯狂构建中 id：{{ id }} -->
  <!-- https://blog.csdn.net/weixin_44598727/article/details/112754879 -->
  <!-- https://www.npmjs.com/package/mavon-editor -->
  <div class="article">
    <div class="titct">
      <div class="tit">{{ data_md.title }}</div>
      <div class="box">
        <div class="iconfont">
          <i class="el-icon-time"></i> &nbsp;{{ date }}
        </div>
        <div class="iconfont">
          <i class="el-icon-chat-dot-square"></i> &nbsp;{{
            data_md.comment
          }}条评论
        </div>
        <div class="iconfont">
          <i class="el-icon-view"></i> &nbsp;{{ data_md.look_num }}次阅读
        </div>
        <div class="iconfont">
          <i class="el-icon-star-on"></i> &nbsp;{{ data_md.like }}次点赞
        </div>
        <div class="iconfont">
          <i class="el-icon-user-solid"></i> &nbsp;{{ data_md.author_key }}
        </div>
      </div>
      <div
        :class="[
          label == '学习笔记' ? 'ladr' : '',
          label == '娱乐爱好' ? 'ladr_r' : '',
          'titct_bq',
        ]"
      >
        {{ label }}
      </div>
      <div class="bj_box">
        <span class="bj" @click="go_CreationCompile">编辑</span>
        <span class="sc" @click="wz_delete">删除</span>
      </div>
    </div>
    <!-- <div class="main">内容</div> -->
    <div>
      <mavon-editor
        class="markdown"
        :value="data_md.md_path"
        :subfield="false"
        :defaultOpen="prop.defaultOpen"
        :toolbarsFlag="prop.toolbarsFlag"
        :editable="prop.editable"
        :scrollStyle="prop.scrollStyle"
      ></mavon-editor>
    </div>
    <div class="like_box">
      <img
        @click="qh_like"
        :src="img_data"
        :class="[is_dz_dh ? 'like_ax' : 'like_ax_bof']"
      />
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
import Vue from "vue";
import { mavonEditor } from "mavon-editor";
import "mavon-editor/dist/css/index.css";
import comment from "bright-comment";
import {
  comment_main,
  comment_user,
  comment_02,
  comment_add_01,
  qq_cx,
  comment_add_02,
  text_get_md,
  comment_v1,
  like_v1,
  likeCancel_v1,
  userStateArticleLike,
  articleDelete,
  read_v1,
} from "../../request/boke/api.js";
// import { from } from "webpack-sources/lib/CompatSource";

Vue.component("mavon-editor", mavonEditor);
export default {
  name: "article",
  data() {
    return {
      id: "",
      name: "",
      user: {},
      qq: "",
      is_dz_dh: false,
      textpl: {},
      // beiyon: {},
      data: {},
      placeholder: "您的鼓励是我前进的动力！",
      commentData: {},
      data_md: {},
      label: "",
      img_data: require("../../assets/img/dz_bfo.png"),
    };
  },
  components: {
    comment,
  },
  //监听属性 类似于data概念
  computed: {
    date() {
      return this.data_md.date_start.slice(0, 10);
    },
    prop() {
      let data = {
        subfield: false, // 单双栏模式
        defaultOpen: "preview", //edit： 默认展示编辑区域 ， preview： 默认展示预览区域
        editable: false,
        toolbarsFlag: false,
        scrollStyle: true,
      };
      return data;
    },
  },
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    qh_like() {
      if (this.is_dz_dh) {
        console.log("发送-1");
        likeCancel_v1({
          article_id: this.id,
          user_id: this.$store.state.user.id,
        }).then((res) => {
          console.log(res);
        });
      } else {
        console.log("发送+1");
        like_v1({
          article_id: this.id,
          user_id: this.$store.state.user.id,
        }).then((res) => {
          console.log(res);
        });
      }
      this.is_dz_dh = !this.is_dz_dh;
      this.img_data == require("../../assets/img/dz_red.png")
        ? (this.img_data = require("../../assets/img/dz_bfo.png"))
        : (this.img_data = require("../../assets/img/dz_red.png"));
    },
    init() {
      // 拿到文章专属id
      this.id = this.$route.params.id;

      read_v1({ id: this.id }).then((res) => {
        console.log(res);
      });

      // 获取用户当前点赞状态
      // console.log("=============" * 10);
      userStateArticleLike({
        article_id: this.id,
        user_id: this.$store.state.user.id,
      }).then((res) => {
        if (res.data.is_like == 1) {
          this.is_dz_dh = !this.is_dz_dh;
          this.img_data = require("../../assets/img/dz_red.png");
        }
      });
    },
    get_mark_data(data) {
      return "法国防军的活动分工";
    },
    // 请求文章
    text_axios() {
      console.log(this.id);
      text_get_md({ id: this.id }).then((res) => {
        // console.log("下面是返回");
        // console.log(res.data);

        this.data_md = res.data;
        // console.log(this.data_md.md_path);
        this.label = res.data.label;
      });
    },
    go_CreationCompile() {
      // 判断是否为文章作者进行修改
      // console.log(this.$store.state.user.name);
      if (this.data_md.author_key == this.$store.state.user.name) {
        this.$confirm("确定修改本篇文章吗？", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        })
          .then(() => {
            this.$router.push({
              path: "/CreationCompile",
              query: {
                id: this.id,
              },
            });
            this.$Message({
              type: "success",
              message: "读取数据成功,进入修改界面!",
            });
            // this.$router.push("/init");
          })
          .catch(() => {
            this.$Message({
              type: "info",
              message: "已取消",
            });
          });
      } else {
        this.$Message({
          type: "info",
          message: "文章所属权非本人",
        });
      }

      // this.$router.push(`/CreationCompile?id=${this.id}`);
    },
    // 评论
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
      await comment_main({ id: this.id }).then((res) => {
        data_comment = res.data;
        console.log(data_comment);
        // if (res.data.length == 0) return;
      });
      // if ((data_comment.length = 0)) return;
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
      this.commentData.targetUser = this.id;
      this.commentData.createDate = new Date().toLocaleString();
      this.commentData.commentUser = this.$store.state.user.id;
      comment_add_01(this.commentData).then((v) => {
        console.log("成功执行");
        this.comment_v1_get(this.id);
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
    comment_v1_get(id) {
      comment_v1({ id: id }).then((res) => {
        console.log(res);
      });
    },
    wz_delete() {
      if (this.data_md.author_key == this.$store.state.user.name) {
        this.$confirm("确定删除本篇文章吗?(恢复数据请联系开发人员)", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        })
          .then(() => {
            articleDelete({ id: this.id }).then((res) => {
              console.log(res);
            });
            this.$Message({
              type: "success",
              message: "成功删除文章!",
            });
            this.$router.push("/init");
          })
          .catch(() => {
            this.$Message({
              type: "info",
              message: "已取消",
            });
          });
      } else {
        this.$Message({
          type: "info",
          message: "文章所属权非本人",
        });
      }
    },
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
    this.init();
    this.get_user();
    this.data_textpl_init();
    // console.log(this.id);
    this.text_axios();
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
.article {
  width: 70%;

  background-color: rgb(184 222 241);
  margin: auto;

  /* box-shadow: 0 0 5px 1px #999; */
}
.titct {
  width: 100%;
  height: 10vw;
  /* border: 1px solid red; */
  border: 1px solid #d7d7d7;
  margin: 10px 0 10px;
  background-color: rgb(251, 251, 251);
  position: relative;
}
.titct .tit {
  width: 100%;
  height: 3vw;
  text-align: center;
  line-height: 3vw;
  font-size: 25px;
  /* background-color: blueviolet; */
  padding-top: 2vw;
}
.titct .box {
  width: 100%;
  height: 3vw;

  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 2vw;
}
.titct .box div {
  margin-left: 15px;
  margin-right: 15px;
}
.main {
  width: 100%;
  height: 80vh;
  background-color: rebeccapurple;
}
.markdown {
  /* position: relative; */
  width: 100%;
  /* height: 100vh; */
  /* 暂时未限制高度 height: 500px;*/
  margin: 0 auto;
  z-index: 2;
}
.titct_bq {
  width: 5vw;
  height: 20px;
  background-color: #51aded;
  /* left: 18vw; */
  text-align: center;
  line-height: 20px;
  font-size: 700;
  box-shadow: 0px 4px 0px -1px #020202;
  color: #ffffff;
  margin: auto;
  margin-top: 20px;
  width: 5vw;
  height: 20px;
  text-align: center;
  line-height: 20px;
  font-size: 0.8vw;
  /* font-size: 700; */
  box-shadow: 0px 4px 0px -1px #020202;
  color: #ffffff;
  margin: auto;
  margin-top: 20px;
  border-radius: 15px;
}
.ladr {
  background-color: blueviolet;
}

.ladr_r {
  background-color: #9af272;
}
.pu {
  background-color: #f3d600;
}
.like_box {
  width: 100%;
  height: 100px;
  background-color: #ffffff;
  display: flex;
  justify-content: center;
  align-items: center;
}
.like_ax {
  width: 50px;
  height: 50px;
  animation: 0.8s run_dz;
}
.like_ax_bof {
  width: 50px;
  height: 50px;
}
@keyframes run_dz {
  0% {
    width: 50px;
    height: 50px;
  }
  30% {
    width: 65px;
    height: 65px;
  }
  40% {
    transform: rotate(15deg);
    width: 65px;
    height: 65px;
  }
  50% {
    transform: rotate(-15deg);
    width: 65px;
    height: 65px;
  }
  60% {
    transform: rotate(15deg);
    width: 65px;
    height: 65px;
  }
  70% {
    transform: rotate(15deg);
    width: 63px;
    height: 63px;
  }
  80% {
    transform: rotate(0deg);
    width: 58px;
    height: 58px;
  }

  100% {
    width: 50px;
    height: 50px;
  }
}
.bj_box {
  width: 100px;
  height: 38px;
  /* background-color: #51aded; */
  position: absolute;
  top: 0px;
  left: 0px;
  color: rgb(101, 100, 100);
  font-size: 700;
  text-align: center;
  line-height: 38px;
  display: flex;
  /* justify-items: center; */
  justify-content: space-around;
  align-items: center;
  /* text-decoration: 1px solid rgb(19, 19, 19) fff; */
}
.bj:hover {
  color: rgb(216, 225, 42);
}
.sc:hover {
  color: rgb(252, 0, 0);
}
</style>