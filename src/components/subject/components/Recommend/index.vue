<!--  -->
<template>
  <div class="recommend">
    <div class="tit">
      <div
        class="tit_text"
        @click="click(0)"
        :style="id == 0 ? 'border-bottom: 3px rgb(94, 174, 232) solid;' : ''"
      >
        推荐文章
      </div>
      <div
        class="tit_text"
        @click="click(1)"
        :style="id == 1 ? 'border-bottom: 3px rgb(94, 174, 232) solid;' : ''"
      >
        微博热搜
      </div>
    </div>
    <div class="tjwb" v-show="id == 0">
      <div
        class="box iconfont"
        v-for="(k, index) in data"
        :key="index"
        @click="go_ar(k.id)"
      >
        &#xe661;&nbsp;&nbsp;
        {{ k.title }}
      </div>
    </div>
    <div class="tjwb" v-show="id == 1">
      <div class="box iconfont" v-for="(k, index) in weibodata" :key="index">
        <a :href="k.url" class="a_url">&#xe661;&nbsp;&nbsp; {{ k.title }}</a>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { tj_article } from "@/request/boke/api.js";
export default {
  name: "Recommend",
  data() {
    return {
      data: [],
      id: 0,
      weibodata: [],
    };
  },
  components: { tj_article },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    click(num) {
      this.id = num;
    },
    go_ar(id) {
      console.log(id);
      let path = "/Article/" + id;
      this.$router.push(path);
    },
  },

  //生命周期 - 创建完成（可以访问当前this实例）
  created() {
    tj_article().then((res) => {
      this.data = res.data;
      // console.log(res.data);
    });
    axios
      .get(
        "https://api.lilinbo.cn/api/heatlist?key=83ba6fc105e044eba353a6e00fc29af1&type=weibo"
      )
      .then((res) => {
        if (res.data.status == 200) {
          this.weibodata = res.data.data.list.slice(0, 19);
        } else {
          console.log("微博数据拉取失败，可能过于频繁拉取，请稍后重试");
        }
      });
  },
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
.recommend {
  position: absolute;
  top: 34.6vw;
  width: 100%;
  height: 16.98vw;
  margin: 0 0 15px;
  /* padding: 20px 25px; */
  background-color: #fff;
  box-shadow: 0 2px 4px rgb(0 0 0 / 10%);
  border-radius: 0;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
}
.tit {
  width: 85%;
  height: 2.3vw;
  background-color: rgb(255, 255, 255);
  border-bottom: 3px rgba(202, 200, 200, 0.5) solid;
  display: flex;
  justify-content: space-around;
  flex-direction: row;
  align-items: center;
}

.tit_text {
  width: 20%;
  height: 2.3vw;

  text-align: center;
  line-height: 2.3vw;
  font-size: 0.78vw;
}
.box {
  width: 100%;
  height: 2.1vw;
  /* background-color: rgb(161, 7, 7); */
  border-bottom: 1px rgba(202, 200, 200, 0.3) solid;
  align-items: center;
  /* background-color: black; */
  overflow: hidden; /*超出隐藏*/
  text-overflow: ellipsis; /*隐藏后添加省略号*/
  white-space: nowrap; /*强制不换行*/
  line-height: 2.1vw;
}
.box:hover {
  color: rgb(120, 195, 238);
}
.tj {
  width: 85%;
  height: 15.5vw;
  /* background-color: aqua; */
  display: flex;
  justify-content: center;
  align-content: center;
  flex-direction: column;
}
.tjwb {
  width: 85%;
  height: 15.5vw;

  overflow: hidden;
  overflow: scroll;
}

.tjwb::-webkit-scrollbar {
  width: 0 !important;
}
.a_url {
  color: #000;
}
</style>