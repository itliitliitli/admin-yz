<!--  -->
<template>
  <div class="">
    <img
      class="img"
      src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
      alt=""
    />
    <a-dropdown>
      <a class="ant-dropdown-link" @click.prevent> admin </a>
      <template #overlay>
        <a-menu>
          <a-menu-item key="0" @click="tologin"> 退出 </a-menu-item>
        </a-menu>
      </template>
    </a-dropdown>
  </div>
</template>

<script>
import { useRouter } from "vue-router";
export default {
  setup() {
    const router = useRouter();
    const tologin = () => {
      router.push({
        name: "login",
      });
      return {
        tologin,
      };
    };
  },
};
</script>
<style  scoped>
.ant-layout-header {
  background-color: rgb(255, 255, 255);
  box-shadow: rgb(0 21 41 / 8%) 0px 1p;
}

.img {
  width: 32px;
  height: 32px;
}

.aaa {
  display: flex;
  justify-content: right;
  align-items: center;
}
</style>