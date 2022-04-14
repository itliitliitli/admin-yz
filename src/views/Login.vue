<template>
  <div class="login">
    <h1 class="ltop">Hello world123</h1>
    <div class="root">
      <div class="backg">
        <a-form
          :model="formState"
          name="normal_login"
          class="login-form"
          @finish="onFinish"
          @finishFailed="onFinishFailed"
        >
          <a-form-item
            name="username"
            :rules="[
              { required: true, message: 'Please input your username!' },
            ]"
          >
            <a-input class="input" v-model:value="formState.username">
              <template #prefix>
                <UserOutlined class="site-form-item-icon" />
              </template>
            </a-input>
          </a-form-item>

          <a-form-item
            name="password"
            :rules="[
              { required: true, message: 'Please input your password!' },
            ]"
          >
            <a-input-password class="input" v-model:value="formState.password">
              <template #prefix>
                <LockOutlined class="site-form-item-icon" />
              </template>
            </a-input-password>
          </a-form-item>

          <!-- <div class="login-form-wrap">
              <a-form-item name="remember" no-style>
                <a-checkbox v-model:checked="formState.remember">Remember me</a-checkbox>
              </a-form-item>
              <a class="login-form-forgot" href="">Forgot password</a>
            </div> -->

          <a-form-item>
            <a-button
              type="primary"
              html-type="submit"
              class="login-form-button"
            >
              Log in
            </a-button>
            <!-- Or -->
            <!-- <a href="">register now!</a> -->
          </a-form-item>
        </a-form>
      </div>
    </div>
  </div>
</template>

<script>
import {
  defineComponent,
  getCurrentInstance,
  reactive,
  computed,
  inject,
} from "vue";
import { UserOutlined, LockOutlined } from "@ant-design/icons-vue";
import qs from "qs";
import { useRouter } from "vue-router";
import { useUserStore } from "@/stores/user.js";
export default {
  components: {
    UserOutlined,
    LockOutlined,
  },

  setup() {
    const http = inject("http");
    const router = useRouter();
    const userStore = useUserStore();
    // const { proxy } = getCurrentInstance()
    const formState = reactive({
      username: "admin",
      password: "admin",
      remember: true,
    });

    const onFinish = async (values) => {
      console.log("Success:", values);
      const res = await http({
        url: "api/manage/user/login.do",
        method: "POST",
        data: qs.stringify({
          ...formState,
        }),
      });
      console.log(res);

      if (res.data.status) return;
      userStore.setUsername(res.data.data.username);
      router.push({
        name: "dashboard",
      });
    };

    const onFinishFailed = (errorInfo) => {
      console.log("Failed:", errorInfo);
    };

    const disabled = computed(() => {
      return !(formState.username && formState.password);
    });

    return {
      formState,
      onFinish,
      onFinishFailed,
      disabled,
    };
  },
};
</script>

<style scoped>
h1,
h2,
h3,
h4,
h5,
h6 {
  margin-top: 0;
  margin-bottom: 0.5em;
  color: rgba(0, 0, 0, 0.85);
  font-weight: 500;
}
.ltop {
  height: 42px;
  width: 100vw;
  margin-bottom: 14px;
  background-color: black;
}
.login {
  height: 100vh;
  width: 100vw;
  background-color: black;
}
.root {
  width: 100vw;
  height: 100%;
  background-color: black;
}
.backg {
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: url(https://gw.alipayobjects.com/zos/rmsportal/TVYTbAXWheQpRcWDaDMu.svg);
}
.login-form-button {
  width: 300px;
}

.input {
  width: 300px;
}
</style>