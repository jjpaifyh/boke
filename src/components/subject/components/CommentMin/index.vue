<!--  -->
<template>
  <div class="CommentMin">
    <div class="tit">
      <div class="tit_text">最新评论</div>
    </div>
    <div class="box" v-for="(k, index) in data" :key="index">
      <img :src="k.url_img" class="img_tx" />
      <div class="text_box">
        <div class="text_tit">{{ k.name }} (一周前)</div>
        <div class="data">
          {{ k.comment }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { pl_q } from "@/request/boke/api.js";
export default {
  name: "CommentMin",
  data() {
    return {
      data: [],
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {},
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {
    pl_q().then((res) => {
      this.data = res.data;
      console.log(res.data);
    });
  },
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {},
};
</script>
<style scoped>
.CommentMin {
  position: absolute;
  top: 14.3vw;
  width: 100%;
  height: 20vw;
  margin: 0 0 15px;
  /* padding: 20px 25px; */
  background-color: #fff;
  box-shadow: 0 2px 4px rgb(0 0 0 / 10%);
  border-radius: 0;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  /* background-color: aqua; */
}
.tit {
  width: 85%;
  height: 2.3vw;
  background-color: rgb(255, 255, 255);
  border-bottom: 1px rgba(202, 200, 200, 0.5) solid;
}

.tit_text {
  width: 20%;
  height: 2.3vw;
  border-bottom: 3px rgb(94, 174, 232) solid;
  text-align: center;
  line-height: 2.3vw;
  font-size: 0.78vw;
}
.box {
  width: 85%;
  height: 3.3vw;
  /* background-color: rgb(161, 7, 7); */
  border-bottom: 1px rgba(202, 200, 200, 0.3) solid;
  display: flex;
  justify-content: center;
  flex-direction: row;
  /* background-color: rgb(245, 245, 245); */
  align-items: center;
}
.img_tx {
  width: 3vw;
  height: 3vw;
  border-radius: 50%;
  box-shadow: 0 0.125rem 1.0625rem 0 rgb(0 0 0 / 10%);
}
.text_box {
  width: 15vw;
  height: 3vw;
  /* background-color: rgb(245, 245, 245); */
}
.text_tit {
  width: 15vw;
  height: 40%;
  /* background-color: rgb(196, 18, 134); */
  text-align: left;
  padding-left: 1vw;
  color: rgb(65, 65, 65);
}
.data {
  width: 15vw;
  height: 60%;
  /* background-color: rgb(175, 209, 23); */
  padding-left: 1vw;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  line-height: 1.98vw;
  color: rgb(159, 157, 157);
}
.data:hover {
  color: rgb(114, 192, 241);
}
</style>