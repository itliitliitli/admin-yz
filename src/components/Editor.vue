<template>
  <a-layout>
    <a-layout-header class="aaa">
      <!-- <Viewtop></Viewtop> -->
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
      <div class="box_top">
        <a-breadcrumb>
          <a-breadcrumb-item>首页</a-breadcrumb-item>
          <a-breadcrumb-item>商品</a-breadcrumb-item>

          <a-breadcrumb-item
            ><router-link :to="{ path: 'goods' }">商品列表</router-link>
          </a-breadcrumb-item>
          <a-breadcrumb-item>新增商品</a-breadcrumb-item>
        </a-breadcrumb>
        <h2 class="h2">新增商品</h2>
      </div>
      <div class="box_con">
        <a-form
          :model="formState"
          class="login-form"
          @finish="onFinish"
          @finishFailed="onFinishFailed"
        >
          <a-form-item
            label="商品名称"
            name="name"
            :rules="[{ required: true, message: '此项为必填项' }]"
          >
            <a-input v-model:value="formState.form.name"> </a-input>
          </a-form-item>
          <a-form-item
            label="商品描述"
            name="subtitle"
            :rules="[{ required: true, message: '此项为必填项' }]"
          >
            <a-input v-model:value="formState.form.subtitle"> </a-input>
          </a-form-item>
          <a-form-item
            label="商品一级分类"
            v-bind="validateInfos.region"
            :rules="[{ required: true, message: '此项为必填项' }]"
          >
            <a-select v-model:value="detail" placeholder="请选择商品一级分类">
              <a-select-option
                v-for="i in form"
                v-model:value="i.name"
                :key="i.id"
              ></a-select-option>
            </a-select>
          </a-form-item>
          <a-form-item
            has-feedback
            label="价格"
            name="price"
            :rules="[{ required: true, message: '此项为必填项' }]"
          >
            <a-input-number v-model:value="formState.form.price" />
          </a-form-item>
          <a-form-item
            has-feedback
            label="库存"
            name="stock"
            :rules="[{ required: true, message: '此项为必填项' }]"
          >
            <a-input-number v-model:value="formState.form.stock" />
          </a-form-item>
          <a-form-item
            label="上架状态"
            :rules="[{ required: true, message: '此项为必填项' }]"
          >
            <a-switch v-model:checked="checked" />
          </a-form-item>
          <a-form-item
            label="图片上传"
            name="username"
            :rules="[{ required: true, message: '此项为必填项' }]"
          >
            <a-upload
              v-model:file-list="fileList"
              action="/api/manage/product/upload.do"
              list-type="picture-card"
              @preview="handlePreview"
              name="upload_file"
              @change="handleChange"
            >
              <div v-if="fileList.length < 8">
                <plus-outlined />
                <div style="margin-top: 8px">Upload</div>
              </div>
            </a-upload>
            <a-modal
              :visible="previewVisible"
              :title="previewTitle"
              :footer="null"
              @cancel="handleCancel"
            >
              <img alt="example" style="width: 100%" :src="previewImage" />
            </a-modal>
          </a-form-item>
        </a-form>
      </div>
    </a-layout-content>
    <a-layout-footer>Footer</a-layout-footer>
  </a-layout>
</template>

<script>
import {
  defineComponent,
  reactive,
  computed,
  ref,
  onMounted,
  inject,
} from "vue";
import {
  UserOutlined,
  LockOutlined,
  PlusOutlined,
  LoadingOutlined,
} from "@ant-design/icons-vue";
import Viewtop from "../components/Top.vue";
import { Form, message } from "ant-design-vue";
import { useRouter, useRoute } from "vue-router";
function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = () => resolve(reader.result);

    reader.onerror = (error) => reject(error);
  });
}
export default defineComponent({
  components: {
    Viewtop,
    UserOutlined,
    LockOutlined,
    LoadingOutlined,
    PlusOutlined,
  },
  setup() {
    const route = useRoute();
    let modelRef = reactive({
      form: {},
    });
    const http = inject("http");
    const useForm = Form.useForm;
    const previewVisible = ref(false);
    const previewImage = ref("");
    const previewTitle = ref("");

    const onFinish = (values) => {
      console.log("Success:", values);
    };

    const onFinishFailed = (errorInfo) => {
      console.log("Failed:", errorInfo);
    };

    const disabled = computed(() => {
      return !(formState.username && formState.password);
    });

    const { resetFields, validate, validateInfos } = useForm(modelRef);

    const fileList = ref([]);
    const loading = ref(false);
    const imageUrl = ref("");

    const handleCancel = () => {
      previewVisible.value = false;
      previewTitle.value = "";
    };

    const handlePreview = async (file) => {
      if (!file.url && !file.preview) {
        file.preview = await getBase64(file.originFileObj);
      }

      previewImage.value = file.url || file.preview;
      previewVisible.value = true;

      previewTitle.value =
        file.name || file.url.substring(file.url.lastIndexOf("/") + 1);
    };
    const beforeUpload = (file) => {
      const isJpgOrPng =
        file.type === "image/jpeg" || file.type === "image/png";

      if (!isJpgOrPng) {
        message.error("You can only upload JPG file!");
      }

      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isLt2M) {
        message.error("Image must smaller than 2MB!");
      }

      return isJpgOrPng && isLt2M;
    };
    const handleChange = (info) => {
      if (info.file.status === "done") {
        // Get this url from response in real world.
        message.info("上传成功");
      }

      if (info.file.status === "error") {
        loading.value = false;
        message.error("上传失败");
      }
    };

    const router = useRouter();
    const categoryId = ref(0);

    const geteditor = async () => {
      const res = await http({
        url: "/api/manage/category/get_category.do",
        method: "GET",
        params: {
          categoryId: categoryId.value,
        },
      });
      console.log(route.query.id);
      console.log(res);
      if (res.data.status === 10) {
        router.push({
          name: "login",
        });
        return;
      }
      form.value = res.data.data;
      //   name = modelRef.name;
      console.log(form);
    };
    const formState = reactive({
      form: {},
    });
    let form = ref({});
    let detail = ref("");
    const checked = ref(false);

    const togoods = () => {
      router.push({
        name: "goods",
      });
    };
    const tologin = () => {
      router.push({
        name: "login",
      });
    };
    onMounted(() => {
      geteditor();
    });
    return {
      formState,
      togoods,
      onFinish,
      tologin,
      checked,
      onFinishFailed,
      disabled,
      validate,
      validateInfos,
      resetFields,
      modelRef,
      fileList,
      loading,
      imageUrl,
      handleCancel,
      previewVisible,
      previewImage,
      previewTitle,
      beforeUpload,
      handlePreview,
      handleChange,
      form,
      detail,
    };
  },
});
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
.box_top {
  width: 100%;
  padding: 20px 0 10px 30px;
  background: #fff;
  margin-top: 3px;
}
.box_top .h2 {
  margin-top: 10px;
}
.box_con {
  margin: 20px;
  padding: 40px;
  min-height: 360px;
  background-color: #fff;
}
.ant-input {
  width: 176px;
  height: 32px;
  border-radius: 4px;
  padding: 4px 11px;
}
.ant-select-single:not(.ant-select-customize-input) .ant-select-selector {
  width: 176px;
  height: 32px;
  padding: 0 11px;
}
.ant-form-item .ant-select,
.ant-form-item .ant-cascader-picker {
  width: auto;
}
/* you can make up upload button and sample style by using stylesheets */
.ant-upload-select-picture-card i {
  font-size: 32px;
  color: #999;
}

.ant-upload-select-picture-card .ant-upload-text {
  margin-top: 8px;
  color: #666;
}
.ant-upload-list-picture-card {
  display: flex;
  flex-direction: column;
}
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