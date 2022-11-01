<!--  -->
<template>
  <div class="Game">
    <div>
      <el-breadcrumb separator="/" class="boxmbx">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item><a href="#/Game">游戏大厅</a></el-breadcrumb-item>
        <el-breadcrumb-item>游戏列表</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="background">
      <div class="box">
        <div @click="go_Gluttonous()" class="tcs">
          <img v-lazy="dataimg[0]" alt="" />
          <h1>贪吃蛇</h1>
          <p>怀旧的小游戏，运用js的es6新语法创作</p>
        </div>

        <a
          href="https://www.return8090.com/mameWeb.html?fccpath=MAMEC.bin&gameid=mslug"
        >
          <div class="tcs">
            <img v-lazy="dataimg[1]" alt="" />
            <h1>合金弹头</h1>
            <p>
              2030年，在军中有一名元帅企图建立自己的政权，引发许多反叛行动，搞得世界大乱。那位元帅名为MORDEN.....，他聚集许多人的力量，并立自己为反叛军总司令。当时，正规军正在开发强力的战斗工具-SUPER
              VEHICLE系列，於是生产出一种超强力战车，名为METAL
              SLUG(正是游戏的名字唷~)，编号为SV-001。然而MORDEN元帅知道正规军有了如此强大的武器，自然是相当焦虑。为了不落人後，但是自己又生产不出来......他们突袭战车工厂，偷了许多的战车。正规军知情况不妙，赶紧举行反攻作战行动!在高层慌得一片混乱的同时，特殊工作部队-PF队的MARCO及TARMA自愿进入前线作战....METAL
              SLUG的一切导火线.....便是从此开始。
            </p>
          </div>
        </a>
        <a
          href="https://www.return8090.com/mameWeb.html?fccpath=MAMEC.bin&gameid=kovplus"
        >
          <div class="tcs">
            <img v-lazy="dataimg[2]" alt="" />
            <h1>三国战纪</h1>
            <p>
              继V117后又一作出大修改的版本，故此许多玩家认为该版本应该是IGS为风云再起而做的测试版本，让玩家提早适应风云。加入风云式的连技系统使连技更加多样化，再不是AAAA的无限连，而该版本的游戏难度也比前几个版本大，当中还有一些和旧版本不同的细微之处。据说自正宗PLUS出现后，117版本亦逐渐消失。
            </p>
          </div>
        </a>
        <a
          href="https://www.return8090.com/FCweb3.html?fccpath=FCC.bin&gameid=cjml1"
        >
          <div class="tcs">
            <img v-lazy="dataimg[3]" alt="" />
            <h1>超级玛丽奥</h1>
            <p>
              这个游戏被赞誉为各种类型家用游戏的原始范本，
              确立了角色、游戏目的、流程分布、操作性、隐藏要素、BOSS、杂兵等以后通用至今的制作概念。
            </p>
          </div>
        </a>
        <a
          href="https://www.return8090.com/mameWeb.html?fccpath=MAMEC.bin&gameid=mslugx"
        >
          <div class="tcs">
            <img v-lazy="dataimg[4]" alt="" />
            <h1>合金弹头X</h1>
            <p>
              1999年的MSX实际上是MS2的一个强化版,没有什么主要的系统修改,甚至连每关的背景和Boss都鲜有变化(当然,不是没有:P).但是从游戏者角度来说,这完全是两个游戏,游戏的节奏完全被重新安排了,在MS2练熟的那些技巧已经不能使用.作为一个资料片,让游戏者从完全另外一个角度来理解这个游戏,MSX还是非常成功的.从制作的严谨角度来看,MSX要强过MS2很多,许多在MS2中疏忽的细节被重新制作完善.一个remix版被列为和正传作品同等的地位,这恐怕也是ARC历史上非常罕见的案例.
            </p>
          </div>
        </a>
        <a
          href="https://www.return8090.com/FCweb3.html?fccpath=FCC.bin&gameid=ssdzz2"
        >
          <div class="tcs">
            <img v-lazy="dataimg[5]" />
            <h1>松鼠大作战</h1>
            <p>适合朋友，情侣一起游玩的游戏，体验互动极佳</p>
          </div>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Game",
  data() {
    return {
      dataimg: [
        "https://20889800.s21i.faiusr.com/2/ABUIABACGAAg2eDEgwYo2O7Z0wcwmgQ4uQM.jpg",
        "https://20889800.s21i.faiusr.com/2/ABUIABACGAAg0aSM_wUoqZjKAjDcAziaAw.jpg",
        "https://20889800.s21i.faiusr.com/2/ABUIABACGAAgwc-Y_gUo3NmPpgUw0wM4mgM.jpg",
        "https://20889800.s21i.faiusr.com/2/ABUIABACGAAgitL-9wUo856EuQEwmgM4mgM.jpg",
        "https://20889800.s21i.faiusr.com/2/ABUIABACGAAgqZ_M_wUogKCzkwQw0gM4mgM.jpg",
        "https://20889800.s21i.faiusr.com/2/ABUIABACGAAg4M61_AUo9dLN1gcwmgM4mgM.jpg",
      ],
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    go_Gluttonous() {
      this.$router.push("/Game/Gluttonous");
    },
  },
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
.background {
  position: relative;
  width: 100vw;
  height: 100vh;

  background: url("../assets/img/bj.svg");
  background-color: #ee5522;
  /* background: linear-gradient(to right, Red, purple); */
}
.box {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 100vw;
  height: 20vw;
  /* background-color: rgb(239, 239, 239); */
  display: flex;
  justify-content: space-around;
}
.box div {
  width: 12vw;
  height: 20vw;
  background-color: rgb(255, 255, 255);
  animation: gorun_ 1s;
  animation-fill-mode: forwards;
  border: 4px #ccc solid;
}
.box div img {
  width: 100%;
  height: 50%;
}
.boxmbx {
  width: 50vw !important;
  height: 3vw !important;
  /* background-color: rgb(167, 167, 169); */
  position: fixed !important;
  top: 0;
  left: 50px;
  z-index: 999;
  overflow: hidden;
  /* width: 100% !important;
  height: 100% !important; */
  /* background-color: aqua; */
  line-height: 3vw;
}
.tcs:hover {
  /* background-color: aqua; */
  animation: gorun 0.5s;
  animation-fill-mode: forwards;
}
img[lazy="loading"] {
  display: block;
  width: 100% !important;
  height: 50% !important;
  margin-top: 0%;
}
h1 {
  width: 100%;
  height: 40px;
  text-align: center;
  line-height: 40px;
  font-size: 20px;
  color: rgb(240, 121, 24);
}
p {
  text-align: center;
  width: 100%;
  height: 30%;
  display: -webkit-box;
  overflow: hidden;
  -webkit-line-clamp: 5;
  -webkit-box-orient: vertical;
  color: #000;
}
@keyframes gorun {
  0% {
    transform: translateY(0);
  }
  100% {
    transform: translateY(-10px);
  }
}
@keyframes gorun_ {
  0% {
    transform: translateY(-10px);
  }
  100% {
    transform: translateY(0px);
  }
}
</style>