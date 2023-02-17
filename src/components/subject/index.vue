<template>
  <div class="index">
    <div :class="[is_show ? 'fun' : 'run_f']">
      <img
        src="../../assets/img/OIP-C.png"
        class="img_show"
        @click.stop="is_ft_t"
      />
      <el-input
        class="ele"
        placeholder="模糊搜索"
        v-model="data"
        clearable
        @keyup.enter="search"
        @clear="clear"
      >
      </el-input>
    </div>
    <div class="mian" style="--height_h: 2600px">
      <ListData
        v-for="k in list_home_data"
        :key="k.id"
        :data="k"
        @click.native="go_article(k.id)"
      />
      <el-pagination
        class="pagd"
        background
        layout="prev, pager, next"
        :total="pagelist"
        @current-change="change"
        :current-page="num"
      >
      </el-pagination>
      <img src="../../assets/img/qsy.png" class="img_qsy" v-show="is_tf" />
    </div>
    <div>
      <MyList />
    </div>
  </div>
</template> 
<script>
import MyList from "./components/MyList";
import ListData from "./components/ListData";
import {
  listhome,
  search_v1,
  newArticleLike,
  pagedata,
} from "@/request/boke/api.js";
export default {
  name: "index",
  data() {
    return {
      list_home_data: [],
      data: "",
      is_show: true,
      is_tf: false,
      pagelist: 100,
      num: 1,
    };
  },
  components: {
    ListData,
    MyList,
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    is_ft_t() {
      this.is_show = !this.is_show;
    },
    search() {
      console.log("监控回车");
    },
    enterKey(event) {
      // console.log();
      if (event.keyCode == 13) {
        if (document.activeElement.localName == "input") {
          console.log("回车");
          search_v1({ data: this.data }).then((res) => {
            this.list_home_data = res.data;
            this.list_home_data.length == 0
              ? ((this.is_tf = true), this.height_main_f())
              : ((this.is_tf = false), this.height_main());
          });
        }
      }
    },
    clear() {
      pagedata({ page: 1 }).then((res) => {
        this.list_home_data = res.data;
      });
      this.height_main();
    },
    enterKeyupDestroyed() {
      document.removeEventListener("keyup", this.enterKey);
    },
    enterKeyup() {
      document.addEventListener("keyup", this.enterKey);
    },
    go_article(id) {
      newArticleLike({
        article_id: id,
        user_id: this.$store.state.user.id,
      }).then((res) => {
        console.log(res);
      });
      this.$router.push({
        path: `/Article/${id}`,
      });
      this.$bus.$emit("buttu", false);
    },
    height_main() {
      document.querySelector(".mian").style.setProperty("--height_h", "2600px");
    },
    height_main_f() {
      document.querySelector(".mian").style.setProperty("--height_h", "1200px");
    },

    change(currentPage) {
      console.log("change");
      // console.log(currentPage);
      // 请数据
      pagedata({ page: currentPage }).then((res) => {
        // console.log(res.data);
        this.list_home_data = res.data;
      });
    },
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
    this.clear();
    // 绑定enter事件
    this.enterKeyup();
    // 获取文章总条数
    listhome().then((res) => {
      this.pagelist = res.data.length;
    });
  },
  destroyed() {
    // 销毁enter事件
    this.enterKeyupDestroyed();
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
.index {
  width: 70vw;
  /* height: 500px; */
  background-color: #f5f5f5;
  margin: auto;
  display: flex;
  position: relative;
}
.mian {
  width: 47vw;
  height: var(--height_h);
  /* 2600px */
}
.img_qsy {
  width: 45vw;
  /* height: 100%; */

  padding-top: 30px;
}
.fun {
  width: 16vw;
  height: 81px;
  background-color: #f5f5f5;
  position: fixed;
  right: -15vw;
  bottom: 20px;
  z-index: 1000;
  display: flex;
  align-content: center;
  align-items: center;
  animation: 1s show_run;
  /* 动画结束属性保存 */
  animation-fill-mode: forwards;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
}
.run_f {
  width: 16vw;
  height: 81px;
  background-color: #f5f5f5;
  position: fixed;
  right: -15vw;
  bottom: 20px;
  z-index: 1000;
  display: flex;
  align-content: center;
  align-items: center;
  animation: show_run_f 1s;
  animation-direction: normal;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
}
@keyframes show_run {
  0% {
    right: -15vw;
  }
  100% {
    right: 0;
  }
}
@keyframes show_run_f {
  0% {
    right: 0;
  }
  100% {
    right: -15vw;
  }
}
.img_show {
  width: 81px;
  height: 81px;
  border-radius: 50%;
  position: relative;
  height: 81px;
  left: -31px;
  display: table-cell;
}
.ele {
  position: relative;
  left: -23px;
}
.pagd {
  margin: auto;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>