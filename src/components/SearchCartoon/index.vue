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
        <Card
          v-for="(data, index) in listdata"
          :key="index"
          :datas="data"
        ></Card>
      </div>
    </el-drawer>
  </div>
</template>

<script>
import axios from "axios";
import Card from "./components/Card";
export default {
  name: "SearchCartoon",
  data() {
    return {
      drawer: false,
      input: "",
      currentDate: new Date(),
      listdata: [],
    };
  },
  components: { Card },
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
      // console.log(this.input);
      this.listdata = [];
      let url = `https://api.pingcc.cn/video/search/title/${this.input}/1/10`;
      // console.log(url);
      axios.get(url).then((res) => {
        this.listdata = res.data.data;
        // console.log(res.data.data);
      });
    },
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
    this.add();
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
</style>