<template>
  <div class="Home">
    <!-- 板头部分 -->
    <Nose></Nose>
    <Subject></Subject>
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
</style>
