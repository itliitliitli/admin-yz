<template>
  <a-layout>
    <a-layout-header class="aaa">
      <viewtop></viewtop>
    </a-layout-header>
    <a-layout-content>
      <div class="box_wrap"></div>
    </a-layout-content>
    <a-layout-footer>Footer</a-layout-footer>
  </a-layout>
</template>

<script>
import Viewtop from "../components/Top.vue";
export default {
  components: {
    Viewtop,
  },
};
</script>

<style>
.ant-layout-header {
  background-color: rgb(255, 255, 255);
  box-shadow: rgb(0 21 41 / 8%) 0px 1p;
}
.aaa {
  display: flex;
  justify-content: right;
  align-items: center;
}
</style>