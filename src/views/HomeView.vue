
<template>
  <div class="main">
    <div :style="!collapsed ? 'width:256px' : 'width:80px'" class="op">
      <a-menu
        v-model:openKeys="openKeys"
        v-model:selectedKeys="selectedKeys"
        mode="inline"
        theme="dark"
        :inline-collapsed="collapsed"
        @select="handleopenkey"
      >
        <a-sub-menu v-for="item in menus" :key="item.id">
          <template #icon>
            <MailOutlined />
          </template>
          <template #title>{{ item.title }}</template>
          <a-menu-item v-for="_item in item.children" :key="_item.path">{{
            _item.title
          }}</a-menu-item>
        </a-sub-menu>
      </a-menu>
      <div class="button">
        <a-button
          type="text"
          @click="toggleCollapsed"
          :style="!collapsed ? 'width:256px' : 'width:80px'"
        >
          <MenuUnfoldOutlined v-if="collapsed" />
          <MenuFoldOutlined v-else />
        </a-button>
      </div>
    </div>

    <div class="right">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import { defineComponent, reactive, toRefs, watch } from "vue";
import { useRouter, useRoute } from "vue-router";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  PieChartOutlined,
  MailOutlined,
  DesktopOutlined,
  InboxOutlined,
  AppstoreOutlined,
} from "@ant-design/icons-vue";
export default defineComponent({
  components: {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    PieChartOutlined,
    MailOutlined,
    DesktopOutlined,
    InboxOutlined,
    AppstoreOutlined,
  },

  setup() {
    const state = reactive({
      collapsed: false,
      selectedKeys: ["dashboard"],
      openKeys: [],
      // preOpenKeys: ['sub1'],
      menus: [
        {
          title: "仪表盘",
          id: 1,
          children: [
            {
              title: "首页",
              id: "1-1",
              path: "dashboard",
            },
          ],
        },
        {
          title: "商品",
          id: 2,
          children: [
            {
              title: "商品管理",
              id: "2-1",
              path: "goods",
            },
          ],
        },
        {
          title: "品类",
          id: 3,
          children: [
            {
              title: "品类管理",
              id: "3-1",
              path: "cogetory",
            },
          ],
        },
        {
          title: "订单",
          id: 4,
          children: [
            {
              title: "订单管理",
              id: "4-1",
              path: "order",
            },
          ],
        },
        {
          title: "用户",
          id: 5,
          children: [
            {
              title: "用户管理",
              id: "5-1",
              path: "users",
            },
          ],
        },
      ],
    });
    const route = useRoute();
    const router = useRouter();
    watch(
      () => state.openKeys,
      (_val, oldVal) => {
        state.preOpenKeys = oldVal;
      }
    );

    watch(
      () => route,
      (val) => {
        // console.log(val);
        state.selectedKeys = [val.name];
      },
      {
        immediate: true,
      }
    );
    const toggleCollapsed = () => {
      state.collapsed = !state.collapsed;
      state.openKeys = state.collapsed ? [] : state.preOpenKeys;
    };
    const handleopenkey = ({ key }) => {
      console.log(key);
      router.push({
        name: key,
      });
    };
    return {
      ...toRefs(state),
      toggleCollapsed,
      handleopenkey,
    };
  },
});
</script>
<style scoped>
.right {
  display: flex;
  flex: auto;
  flex-direction: column;
  min-height: 0;
  /* overflow: hidden; */
}
.main {
  display: flex;
  /* overflow: hidden; */
  height: 100%;
  min-height: 100vh;
}
.op {
  background: black;
  /* flex: 0 0 200px; */
  display: flex;
}
.button {
  height: 48px;
  bottom: 0;
  position: fixed;
  margin-bottom: 16px;
  color: #fff;
  line-height: 48px;
  text-align: center;
  background: #002140;
}
.ant-btn {
  color: #fff;
}
.ant-btn-text {
  color: #fff;
}
.ant-btn-text:hover,
.ant-btn-text:focus {
  color: #fff;
  border-color: transparent;
}
</style>