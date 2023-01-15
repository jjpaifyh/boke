<template>
  <div class="Home">
    <!-- 板头部分 -->
    <Nose></Nose>
    <transition name="bounce" mode="out-in">
      <router-view>
        <!-- <Subject></Subject> -->
      </router-view>
    </transition>
    <Bottom></Bottom>
  </div>
</template>

<script>
import Nose from "../components/Nose";
import Subject from "../components/subject";
import Bottom from "../components/Bottom";
export default {
  name: "Home",
  components: { Nose, Subject, Bottom },
};
</script>
<style>
body {
  background: #f5f5f5;
}
.bounce-enter-active {
  animation: bounce-in 0.5s;
}
.bounce-leave-active {
  animation: bounce-in 0.5s reverse;
}
@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(1);
  }
}
</style>
