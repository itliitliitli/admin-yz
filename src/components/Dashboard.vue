<template>
  <a-layout>
    <a-layout-header class="aaa">
     
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
    </a-layout-header>
    <a-layout-content>
      <div class="box_wrap">
        <div class="box">
          <div class="item">
            <div class="item_top">用户总数</div>
            <div class="item_con">{{ userCount }}</div>
          </div>
          <div class="item">
            <div class="item_top">商品总数</div>
            <div class="item_con">{{ productCount }}</div>
          </div>
          <div class="item">
            <div class="item_top">订单数</div>
            <div class="item_con">{{ orderCount }}</div>
          </div>
        </div>
      </div>
    </a-layout-content>
    <a-layout-footer>Footer</a-layout-footer>
  </a-layout>
</template>

<script>
import { useRouter } from "vue-router";
import { onMounted, inject, ref } from "vue";
export default {
  setup() {
    const router = useRouter();
    const orderCount = ref(0);
    const productCount = ref(0);
    const userCount = ref(0);
    const http = inject("http");
    const getmenus = async () => {
      const res = await http({
        url: "/api/manage/statistic/base_count.do",
        methods: "GET",
      });
      console.log(res);
      userCount.value = res.data.data.userCount;
      productCount.value = res.data.data.productCount;
      orderCount.value = res.data.data.orderCount;
    };
    onMounted(() => {
      getmenus();
    });
    const tologin = () => {
      router.push({
        name: "login",
      });
    };
    return {
      orderCount,
      productCount,
      userCount,
      tologin,
    };
  },
};
</script>

<style>
.ant-layout-header {
  background-color: rgb(255, 255, 255);
  box-shadow: rgb(0 21 41 / 8%) 0px 1p;
}
.login {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 80px;
  height: 100%;
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
.box_wrap {
  margin: 20px;
  padding: 40px;
  min-height: 360px;
}

.box {
  position: relative;
  height: auto;
  margin-right: 0;
  margin-left: 0;
  zoom: 1;
  display: block;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  display: flex;
  justify-content: space-around;
}
.item {
  width: 157px;
  height: 169px;
}
.item_top {
  width: 100%;
  height: 57px;
  border-bottom: 1px solid #e8e8e8;
  background: white;
  color: rgba(0, 0, 0, 0.85);
  font-weight: 500;
  font-size: 16px;
  padding: 0 24px;
  line-height: 57px;
}
.item_con {
  width: 100%;
  height: 113px;
  background: white;
  color: rgba(0, 0, 0, 0.65);
  font-size: 26px;
  font-weight: bold;
  padding: 24px;
}
</style>