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
        :avatar="textpl.avatar"
        :commentNum="textpl.commentNum"
        :authorId="textpl.authorId"
        :label="textpl.label"
        :commentList="textpl.commentList"
      ></comment>
    </div>
  </div>
</template>
  
  <script>
// https://gitee.com/bright-boy/bright-comment
import comment from "bright-comment";

export default {
  name: "",
  data() {
    return {
      textpl: {
        // 头像
        avatar:
          "http://thirdqq.qlogo.cn/g?b=sdk&k=CXQicDo1avw5q82A8NfCKOQ&s=100&t=1586483094?rand=1605000166",
        commentNum: 2,
        authorId: "id",
        label: "小鹏",
        commentList: [
          {
            id: "01",
            commentUser: {
              id: "02",
              nickName: "无敌霸王龙",
              avatar:
                "http://thirdqq.qlogo.cn/g?b=sdk&k=CXQicDo1avw5q82A8NfCKOQ&s=100&t=1586483094?rand=1605000166",
            },
            targetUser: {
              id: "000",
              nickName: "博客作者",
              avatar:
                "http://thirdqq.qlogo.cn/g?b=sdk&k=CXQicDo1avw5q82A8NfCKOQ&s=100&t=1586483094?rand=1605000166",
            },
            content: "你真可爱",
            createDate: "2020/10/21",
            childrenList: [
              {
                id: "02",
                commentUser: {
                  id: "02",
                  nickName: "可爱小伟龙",
                  avatar:
                    "https://tse3-mm.cn.bing.net/th/id/OIP-C.JPaFw0vH2f6Qy44aUfZ4jgAAAA?pid=ImgDet&rs=1",
                },
                targetUser: {
                  id: "02",
                  nickName: "无敌霸王龙",
                  avatar:
                    "http://thirdqq.qlogo.cn/g?b=sdk&k=CXQicDo1avw5q82A8NfCKOQ&s=100&t=1586483094?rand=1605000166",
                },
                content: "你真可爱",
                createDate: "2020/10/21",
                childrenList: [],
              },
            ],
          },
        ],
      },
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
</style>