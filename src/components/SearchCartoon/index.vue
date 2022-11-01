<!--  -->
<template>
  <div class="SearchCartoon">
    <div class="box" @click="click()">
      <p>電影搜索</p>
    </div>
    <el-drawer
      title="電影搜索"
      :visible.sync="drawer"
      direction="btt"
      :before-close="handleClose"
      size="80%"
    >
      <Hint :text="text" :is_tf="is_tf_h"></Hint>
      <div class="box_ss">
        <el-input
          placeholder="请输入電影名稱哦"
          v-model="input"
          clearable
          class="let"
          size="medium  "
          maxlength="15"
        >
        </el-input>
        <el-button type="primary" round class="aj" @click="add()"
          >搜索</el-button
        >
      </div>
      <div class="list">
        <div class="jz" v-show="is_jz">
          <img src="../../assets/img/jz.gif" alt="" />
        </div>
        <Card
          v-for="(data, index) in listdata"
          :key="index"
          :datas="data"
        ></Card>
        <div class="w" v-show="!is_tf && !is_jz">
          <div class="left" @click="left()">上一页</div>
          <div>{{ urlnum }}</div>
          <div class="rigth" @click="rigth()">下一页</div>
        </div>
        <div v-if="is_tf" class="kong">
          <img
            src="http://localhost:2000/public/images/%E6%95%B0%E6%8D%AE%E5%86%85%E5%AE%B9%E7%A9%BA.png"
            alt=""
          />
        </div>
      </div>
      <div class="classify">
        <div
          v-for="data in classify"
          :key="data"
          @click="classif(data)"
          :class="{ item: true, item_k: data === key_v }"
        >
          {{ data }}
        </div>
      </div>
    </el-drawer>
  </div>
</template>

<script>
import axios from "axios";
import Card from "./components/Card";
import Hint from "../Hint";
export default {
  name: "SearchCartoon",
  data() {
    return {
      drawer: false,
      input: "",
      currentDate: new Date(),
      listdata: [],
      is_tf: true,
      classify: [
        "动漫电影",
        "科幻片",
        "动作片",
        "日韩动漫",
        "欧美动漫",
        "悬疑",
        "惊悚",
        "奇幻",
        "国产动漫",
        "国产剧",
        "喜剧",
        "恐怖片",
        "犯罪",
      ],
      key_v: "",
      urlvuex: "",
      urlnum: 1,
      text: "提示出来啦",
      is_tf_h: false,
      is_jz: false,
    };
  },
  components: { Card, Hint },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then((_) => {
          done();
        })
        .catch((_) => {});
    },
    click() {
      // console.log(111111);
      this.drawer = !this.drawer;
    },
    add() {
      this.key_v = "";
      if (this.input != "") {
        // console.log(this.input);
        this.listdata = [];
        // listdata.length
        let url = `https://api.pingcc.cn/video/search/title/${this.input}/1/30`;
        this.urlvuex = `https://api.pingcc.cn/video/search/title/${this.input}`;
        this.is_tf = false;
        // console.log(url);
        this.is_jz = true;
        axios.get(url).then((res) => {
          // console.log("出结果了");
          if (res.data.code == 0) {
            this.listdata = res.data.data;
          }
          console.log(res.data);
          this.is_jz = false;
          this.is_tf = res.data.code == 1 ? true : false;
        });
        // .err(() => {
        //   // this.is_tf = res.data.data.length == 0 ? true : false;
        //   console.log(11);
        // });
      } else {
        this.bef();
      }
    },
    // 默认请求热门数据
    bef() {
      // console.log(this.input);
      this.listdata = [];
      // listdata.length
      let url = `https://api.pingcc.cn/video/search/videoType/国产动漫/1/30`;
      this.urlvuex = `https://api.pingcc.cn/video/search/videoType/国产动漫`;
      // console.log(url);
      // this.is_tf = true;
      this.is_tf = false;
      this.is_jz = true;
      axios.get(url).then((res) => {
        // console.log("出结果了");
        this.listdata = res.data.data;
        this.is_jz = false;
        this.is_tf = res.data.data.length == 0 ? true : false;
        console.log(this.listdata);
      });
    },
    // 分类查找
    classif(data) {
      this.urlnum = 1;
      this.key_v = data;
      this.listdata = [];
      // listdata.length
      let url = `https://api.pingcc.cn/video/search/videoType/${data}/1/30`;
      this.urlvuex = `https://api.pingcc.cn/video/search/videoType/${data}`;
      // console.log(url);
      // this.is_tf = true;
      this.is_tf = false;
      this.is_jz = true;
      axios.get(url).then((res) => {
        // console.log("出结果了");
        if (res.data.code == 0) {
          this.listdata = res.data.data;
        }
        console.log(res.data);
        this.is_jz = false;
        this.is_tf = res.data.code == 1 ? true : false;
      });
    },
    // 下一页
    rigth() {
      if (this.listdata.length == 30) {
        // console.log(this.urlvuex);
        this.urlnum = this.urlnum + 1;
        let url = this.urlvuex + "/" + this.urlnum + "/30";
        this.listdata = [];
        // this.is_tf = true;
        this.is_tf = false;
        this.is_jz = true;
        axios.get(url).then((res) => {
          // console.log("出结果了");
          if (res.data.code == 0) {
            this.listdata = res.data.data;
          }
          console.log(res.data);
          this.is_jz = false;
          this.is_tf = res.data.code == 1 ? true : false;
        });
      } else {
        this.text = "没有更多相关内容了呢~";
        this.is_tf_h = true;
        setTimeout(() => {
          this.is_tf_h = false;
          console.log("计时器触发");
        }, 2000);
      }
    },
    // 上一页
    left() {
      if (this.listdata.length == 30) {
        // console.log(this.urlvuex);
        if (this.urlnum > 1) {
          this.urlnum = this.urlnum - 1;
          let url = this.urlvuex + "/" + this.urlnum + "/30";
          this.listdata = [];
          // this.is_tf = true;
          this.is_tf = false;
          this.is_jz = true;
          axios.get(url).then((res) => {
            // console.log("出结果了");
            if (res.data.code == 0) {
              this.listdata = res.data.data;
            }
            console.log(res.data);
            this.is_jz = false;
            this.is_tf = res.data.code == 1 ? true : false;
          });
        } else {
          this.text = "不可以~达咩达咩~";
          this.is_tf_h = true;
          setTimeout(() => {
            this.is_tf_h = false;
            console.log("计时器触发");
          }, 2000);
        }
      }
    },
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
    this.bef();
  },
};
</script>
<style scoped>
.box {
  width: 302px;
  height: 102px;
  background-color: rgb(245, 245, 245);
  color: rgb(42, 237, 120);
  /* border: 4px solid red; */
  margin: auto;
  margin-top: 300px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  overflow: hidden;
}

.box::after {
  content: "";
  display: inline-block;
  width: 296px;
  height: 96px;
  background-color: rgb(60, 60, 61);
  position: absolute;
  margin-top: 1px;
  margin-left: 1px;

  left: 2px;
  top: 2px;
}

.box::before {
  content: "";
  display: inline-block;
  width: 300px;
  height: 300px;
  background: repeating-linear-gradient(
    #e0da12,
    #e8544d,
    #0dd649,
    #08bec4,
    #1a42d1,
    #d50faa,
    #cb0b1e,
    #eeeeee
  );
  position: absolute;
  top: 50%;
  left: 50%;
  animation: jjp 2s linear infinite;
  transform-origin: 0px 0px;
}

@keyframes jjp {
  0% {
    transform: rotate(0);
  }

  50% {
    transform: rotate(0.5turn);
  }

  100% {
    transform: rotate(1turn);
  }
}

p {
  position: absolute;
  color: rgb(255, 255, 255);
  font-size: 20px;
  z-index: 2;
  font-weight: 700;
}
.box:hover::after {
  background-color: #68e96d;
}
p:hover {
  color: #000;
}
.let {
  width: 300px;
  margin-left: 30px;
  /* height: 50px !important; */
}
.box_ss {
  /* border: 1px red solid; */
  width: 100%;
  height: 60px;
}
.aj {
  margin-left: 10px;
}
.list {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
.kong img {
  width: 100%;
}
.kong {
  width: 24vw;
  height: 24vw;
  position: absolute;
  /* background-color: #08bec4; */
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);

  /* margin: auto; */
}
.classify {
  width: 5.21vw;
  height: 27.1vw;
  background-color: #fcfcfc;
  position: absolute;
  right: 41px;
  top: 17%;
  z-index: 3;
  border: 1px #ccc solid;
  min-width: 60px;
}
.item {
  min-width: 60px;
  width: 100%;
  height: 2.08vw;
  /* background-color: #7de6b3; */

  text-align: center;
  line-height: 2.08vw;
  font-size: 0.78vw;
}
.item:hover {
  color: rgb(248, 248, 248);
  background-color: #4f4f4f;
}
.item_k {
  color: rgb(248, 248, 248);
  background-color: #4f4f4f;

  border: 1px rgb(13, 235, 235) solid;
  /* transform: translate(-50%, -50%);  */
  background: linear-gradient(
    90deg,
    #03a9f4,
    #ffeb3b,
    #f441a5,
    #ff253a,
    #bbffaa,
    #eeeeee
  );
  /*设置背景颜色渐变*/
  background-size: 400%; /*设置背景填充比例,放大4倍,使颜色过渡柔和,淡化线条*/
  /* position: absolute; */
  animation: stream 8s infinite linear; /*开启动画帧,线性移动背景,无限循环*/
  text-align: center;
  color: rgb(255, 255, 255);
}

@keyframes stream {
  from,
  to {
    background-position: 0%; /*无线循环,开始和结束帧设置相同*/
  }
  50% {
    background-position: 100%; /*关键帧设置背景移动100%*/
  }
}
.w {
  width: 100%;
  height: 100px;
  /* background-color: #08bec4; */
  display: flex;
  justify-content: center;
  align-items: center;
}
.w div {
  width: 5vw;
  height: 2vw;
  background-color: #ffffff;
  line-height: 2vw;
  text-align: center;
  border: 1px #ccc solid;
}
.left:hover,
.rigth:hover {
  color: rgb(255, 255, 255);
  background-color: rgb(127, 127, 127);
}

.left {
  margin-right: 20px;
}
.rigth {
  margin-left: 20px;
}
.jz {
  width: 100%;
  margin: auto;
  height: 60.26vh;
  background-color: rgb(25, 145, 236);
  /* border-radius: 50px; */
  box-shadow: 0 0 2.6vw 1.56vw #ffffff inset;
}
.jz img {
  width: 20.83vw;
  height: 15.63vw;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
</style>