<template>
  <a-layout>
    <a-layout-header class="aaa">
      <!-- <div class="login" @click.prevent>
        <img
          class="img"
          src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
          alt=""
        />
        <div>admin</div>
        
      </div> -->
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
      <div class="con_top">
        <a-breadcrumb>
          <a-breadcrumb-item>首页</a-breadcrumb-item>
          <a-breadcrumb-item>商品</a-breadcrumb-item>
          <a-breadcrumb-item>商品列表</a-breadcrumb-item>
        </a-breadcrumb>
        <h2 class="con_top_title">商品列表</h2>
      </div>
      <a-card :bordered="false" class="conbox_wrap">
        <div class="box_top">
          <a-form
            :layout="formState.layout"
            :model="formState"
            v-bind="formItemLayout"
            @finish="search"
            ref="form"
          >
            <a-form-item label="关键词" name="productName">
              <a-input
                v-model:value="formState.productName"
                placeholder="input placeholder"
              />
            </a-form-item>
            <a-form-item :wrapper-col="buttonItemLayout.wrapperCol">
              <a-button type="primary" html-type="submit">搜索</a-button>
            </a-form-item>
            <a-form-item
              :wrapper-col="buttonItemLayout.wrapperCol"
              style="margin-left: 10px"
            >
              <a-button @click="resetform">清空</a-button>
            </a-form-item>
          </a-form>
        </div>
        <a-button type="primary" @click="toeditor">新增</a-button>
        <a-table
          :columns="columns"
          :data-source="list"
          style="margin-top: 20px"
          class="table"
          :pagination="pagination"
          @change="handleTableChange"
        >
          <template #headerCell="{ column }">
            <template v-if="column.key === 'name'">
              <span>
                <smile-outlined />
                Name
              </span>
            </template>
          </template>

          <template #bodyCell="{ column, record }">
            <template v-if="column.key === 'name'">
              <a>
                {{ record.name }}
              </a>
            </template>
            <template v-else-if="column.key === 'subtitle'">
              <span>
                {{ record.subtitle }}
              </span>
            </template>
            <template v-else-if="column.key === 'price'">
              <span> ￥{{ record.price }} </span>
            </template>
            <template v-else-if="column.key === 'status'">
              <span>
                {{ record.status == 1 ? "在售" : "下架" }}
                <a-button @click="handleupdown(record)">{{
                  record.status == 1 ? "设置下架" : "设置上架"
                }}</a-button>
              </span>
            </template>
            <template v-else-if="column.key === 'action'">
              <span>
                <a>查看详情</a>
                <a-divider type="vertical" />
                <a @click="toeditorid(record.id)">编辑</a>
              </span>
            </template>
          </template>
        </a-table>
        <!-- <div>
          <br />

          <a-pagination
            v-model:current="current1"
            v-model:pageSize="pageSize"
            show-size-changer
            :total="total"
            @showSizeChange="onShowSizeChange"
          />
        </div> -->
      </a-card>
    </a-layout-content>
    <a-layout-footer>Footer</a-layout-footer>
  </a-layout>
</template>

<script>
import { message } from "ant-design-vue";
import qs from "qs";
import { useRouter } from "vue-router";
import { SmileOutlined, DownOutlined } from "@ant-design/icons-vue";
import {
  defineComponent,
  reactive,
  toRaw,
  computed,
  onMounted,
  inject,
  ref,
  watch,
} from "vue";
const columns = [
  {
    name: "名称",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "标题",
    dataIndex: "subtitle",
    key: "subtitle",
  },
  {
    title: "价格",
    dataIndex: "price",
    key: "price",
  },
  {
    title: "商品状态",
    key: "status",
    dataIndex: "status",
  },
  {
    title: "操作",
    key: "action",
  },
];
const data = [
  {
    key: "1",
    name: "John Brown",
    age: 32,
    address: "New York No. 1 Lake Park",
    tags: ["nice", "developer"],
  },
  {
    key: "2",
    name: "Jim Green",
    age: 42,
    address: "London No. 1 Lake Park",
    tags: ["loser"],
  },
  {
    key: "3",
    name: "Joe Black",
    age: 32,
    address: "Sidney No. 1 Lake Park",
    tags: ["cool", "teacher"],
  },
];
export default defineComponent({
  components: {
    SmileOutlined,
    DownOutlined,
  },
  setup() {
    const form = ref();
    const router = useRouter();
    const http = inject("http");
    const formState = reactive({
      productName: "",
    });
    const formItemLayout = computed(() => {
      const { layout } = formState;
      return layout === "horizontal"
        ? {
            labelCol: {
              span: 4,
            },
            wrapperCol: {
              span: 14,
            },
          }
        : {};
    });
    const buttonItemLayout = computed(() => {
      const { layout } = formState;
      return layout === "horizontal"
        ? {
            wrapperCol: {
              span: 14,
              offset: 4,
            },
          }
        : {};
    });
    const pagination = reactive({
      total: 0,
      current: 1,
      defaultPageSize: 10,
    });
    const pageSize = ref(10);
    const pageNum = ref(1);
    const total = ref(0);
    let list = ref([]);
    const getgoodslist = async () => {
      const res = await http({
        url: "/api/manage/product/list.do",
        methods: "GET",
        params: {
          pageSize: pagination.defaultPageSize,
          pageNum: pagination.current,
        },
      });
      console.log(res);
      if (res.data.status === 10) {
        router.push({
          name: "login",
        });
        return;
      }
      if (res.data.status === 0) {
        const { pageSize, pageNum, total, list: _list } = res.data.data;

        // pageSize.value = _pageSize;
        // pageNum.value = _pageNum;
        // total.value = _total;
        list.value = _list;
        pagination.total = total;
        pagination.current = pageNum;
        pagination.defaultPageSize = pageSize;
      }
    };
    const tologin = () => {
      router.push({
        name: "login",
      });
    };
    const toeditor = () => {
      router.push({
        name: "edtior",
      });
    };
    const toeditorid = (id) => {
      console.log(id);
      router.push({
        name: "edtiorid",
        query: {
          id: id,
        },
      });
    };
    const search = async () => {
      pagination.current = 1;
      pagination.defaultPageSize = 10;
      pagination.total = 0;
      list.value = [];
      const res = await http({
        url: "/api/manage/product/search.do",
        methods: "GET",
        params: {
          pageSize: pagination.defaultPageSize,
          pageNum: pagination.current,
          productName: formState.productName,
        },
      });
      console.log(res);
      if (res.data.status === 10) {
        router.push({
          name: "login",
        });
        return;
      }
      if (res.data.status === 0) {
        const { pageSize, pageNum, total, list: _list } = res.data.data;
        list.value = _list;
        pagination.total = total;
        pagination.current = pageNum;
        pagination.defaultPageSize = pageSize;
      }
      if (!formState.productName) {
        getgoodslist();
      }
    };
    const resetform = () => {
      form.value.resetFields();
    };
    const handleupdown = async (obj) => {
      await http({
        url: "/api/manage/product/set_sale_status.do",
        method: "POST",
        data: qs.stringify({
          productId: obj.id,
          status: obj.status == 1 ? 2 : 1,
        }),
      });
      if (obj.status === 1) {
        obj.status = 2;
      } else {
        obj.status = 1;
      }
      message.info("修改成功");
    };
    onMounted(() => {
      getgoodslist();
    });
    // const current1 = ref(3);
    // const current2 = ref(4);
    // const onShowSizeChange = (current, pageSize) => {
    //   console.log(current, pageSize);
    // };

    // watch(pageSize, () => {
    //   console.log("pageSize", pageSize.value);
    // });
    // watch(current1, () => {
    //   console.log("current", current1.value);
    // });

    const handleTableChange = (val) => {
      console.log(val);
      pagination.current = val.current;
      getgoodslist();
    };

    return {
      formState,
      formItemLayout,
      buttonItemLayout,
      data,
      pageSize,
      pageNum,
      total,
      columns,
      list,
      toeditorid,
      handleupdown,
      form,
      tologin,
      // onShowSizeChange,
      // current1,
      // current2,
      handleTableChange,
      pagination,
      search,
      resetform,
      toeditor,
    };
  },
});
</script>

<style scoped>
.con_top {
  width: 100%;
  height: 103px;
  background: white;
  margin-top: 3px;
  padding: 20px 0 10px 30px;
}
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
.con_top_title {
  margin: 10px 0;
}
.conbox_wrap {
  margin: 20px;
  padding: 40px 0;
}
.box_top {
  /* width: 100%; */
  height: 64px;
  /* display: flex; */
}
.ant-input {
  width: 250px;
}
.box_top .form {
  margin: 0 -12px;
  width: 100%;
  display: flex;
  justify-content: space-between;
}
.ant-form-item-control-input-contentz {
  display: flex;
  width: 150px;
}
.ant-form-horizontal {
  display: flex;
}
</style>