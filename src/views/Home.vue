<template>
  <div class="Home">
    <!-- 板头部分 -->
    <Nose></Nose>
    <Subject></Subject>
  </div>
</template>

<script>
import Nose from "../components/Nose";
import Subject from "../components/subject";
export default {
  name: "Home",
  components: { Nose, Subject },
};
</script>
