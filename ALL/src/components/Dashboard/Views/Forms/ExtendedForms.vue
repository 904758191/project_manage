<template>
  <!-- 验证输入框  × -->
  <!-- 给元素添加@blur事件数据会加载不出来 -->
  <div>
    <div>
      <a-form layout="inline" :form="form" @submit.prevent="paramsFilter">
        <div class="row no-gutters">
          <a-form-item>
            <div class="form-group col-md-1">
              <label key="airCo"
                >航司:
                <input
                  v-decorator="[
                    'airCo',
                    {
                      rules: [
                        {
                          required: true,
                          message: '必填',
                          pattern: /^(([A-Z]|\d){2},)*(([A-Z]|\d){2})$/,
                        },
                      ],
                    },
                  ]"
                  type="text"
                  placeholder="TR"
                  class="form-control"
                  @blur="strToCap('airCo')"
                />
              </label>
            </div>
            <div class="form-group col-md-1">
              <label key="depAirPort"
                >出发机场:
                <input
                  type="text"
                  v-decorator="['depAirPort', {}]"
                  placeholder="TR"
                  class="form-control"
                  @blur="strToCap('depAirPort')"
                />
              </label>
            </div>
            <div class="form-group col-md-1">
              <label key="arrAirPort"
                >到达机场:
                <input
                  type="text"
                  v-decorator="['arrAirPort', {}]"
                  placeholder="NGB"
                  class="form-control"
                  @blur="strToCap('arrAirPort')"
                />
              </label>
            </div>
            <div class="form-group col-md-1">
              <label key="depCity"
                >出发城市:
                <input
                  type="text"
                  v-decorator="['depCity', {}]"
                  placeholder="TR"
                  class="form-control"
                  @blur="strToCap('depCity')"
                />
              </label>
            </div>
            <div class="form-group col-md-1">
              <label key="arrCity"
                >到达城市:
                <input
                  type="text"
                  v-decorator="['arrCity', {}]"
                  placeholder="NGB"
                  class="form-control"
                  @blur="strToCap('arrCity')"
                />
              </label>
            </div>
            <div class="form-group col-md-1">
              <label key="flightNumber"
                >航班号:
                <input
                  type="text"
                  v-decorator="['flightNumber', {}]"
                  placeholder="UO228"
                  class="form-control"
                  @blur="autoFixairCo"
                />
              </label>
            </div>
            <div class="form-group col-md-1">
              <label key="cabin"
                >舱位:
                <input
                  type="text"
                  v-decorator="['cabin']"
                  placeholder="Q"
                  class="form-control"
                  @blur="strToCap('cabin')"
                />
              </label>
            </div>
            <div class="col-md-2">
              <p-checkbox
                key="routeReturn"
                placeholder="TR"
                class="form-control"
                v-decorator="[
                  'routeReturn',
                  {
                    valuePropName: 'checked',
                    initialValue: false,
                  },
                ]"
                >查往返</p-checkbox
              >
            </div>
            <div class="form-group col-md-2" style="margin-top:16px">
              <button class="btn btn-fill btn-info">查询</button>
            </div>
          </a-form-item>
        </div>
        <!-- 下一行 -->
        <div class="row no-gutters">
          <a-from-item>
            <div class="col-md-3 form-group">
              <label key="tripDate"
                >乘机日期:
                <el-date-picker
                  format="YYYY-MM-DD"
                  :placeholder="['开始日期', '结束日期']"
                  v-decorator="['tripDate', { rules: [{ type: 'array' }] }]"
                ></el-date-picker>
              </label>
            </div>
            <div class="col-md-3 form-group">
              <label key="updateDate"
                >更新日期:
                <el-date-picker
                  format="YYYY-MM-DD"
                  :placeholder="['开始日期', '结束日期']"
                  v-decorator="['updateDate', { rules: [{ type: 'array' }] }]"
                ></el-date-picker>
              </label>
            </div>
            <div class="col-md-2">
              <label key="status"
                >上下架
                <el-select
                  placeholder="全部"
                  v-decorator="['status', { initialValue: '' }]"
                >
                  <el-option value>全部</el-option>
                  <el-option value="1">上架</el-option>
                  <el-option value="0">下架</el-option>
                </el-select>
              </label>
            </div>
            <div class="col-md-3">
              <label key="updateStatus"
                >更新状态:
                <el-select
                  placeholder="全部"
                  v-decorator="['updateStatus', { initialValue: '' }]"
                >
                  <el-option value>全部</el-option>
                  <el-option value="1">更新中</el-option>
                  <el-option value="0">停止更新</el-option>
                </el-select>
              </label>
            </div>
            <div class="col-md-1">
              <p-checkbox
                style="padding-left:1px"
                key="unDeparture"
                v-decorator="[
                  'unDeparture',
                  {
                    valuePropName: 'checked',
                    initialValue: true,
                  },
                ]"
                >未起飞</p-checkbox
              >
            </div>
          </a-from-item>
        </div>
        <!-- 下一行 -->
        <div class="row" v-if="data.length > 0">
          <div class="col-md-4">
            <label></label>
            <p-pagination
              :total="pagination.total"
              :pageSize="pagination.pageSize"
              :current="pagination.current"
              v-model="pagination.currentPage"
              @change="
                (page, pageSize) => {
                  this.changePage(page, pageSize);
                }
              "
              @showSizeChange="
                (current, pageSize) => {
                  this.changePageSize(current, pageSize);
                }
              "
              :pageSizeOptions="pagination.pageSizeOptions"
              v-show="(total) => `共${total}条`"
            >
            </p-pagination>
            <el-select
              class="select-default"
              v-model="pagination.perPage"
              placeholder="Per page"
            >
              <!-- <el-option
                class="select-default"
                v-for="item in pagination.perPageOptions"
                :key="item"
                :label="item"
                :value="item"
              >
              </el-option> -->
            </el-select>
          </div>
          <div class="col-md-8">
            <div class="row">
              <div class="col-md-2">
                <button
                  class="btn btn-info btn-fill"
                  @click="batchChangeParam"
                  v-decorator="[
                    'flightNumber',
                    {
                      rules: [
                        {
                          pattern: /^([A-Z]|\d){2}\d+$/,
                          message: '格式不正确',
                        },
                      ],
                    },
                  ]"
                >
                  批量修改
                </button>
              </div>
              <div class="col-md-2">
                <button
                  class="btn btn-info btn-fill"
                  @click="batchChangeState('1')"
                >
                  批量上架
                </button>
              </div>
              <div class="col-md-2">
                <button
                  class="btn btn-info btn-fill"
                  @click="batchChangeState('0')"
                >
                  批量下架
                </button>
              </div>
              <div class="col-md-2">
                <button
                  class="btn btn-info btn-fill"
                  @click="changeUpdate('1')"
                >
                  开启更新
                </button>
              </div>
              <div class="col-md-2">
                <button
                  class="btn btn-info btn-fill"
                  @click="changeUpdate('0')"
                >
                  停止更新
                </button>
              </div>
              <div class="col-md-2">
                <button class="btn btn-danger btn-fill" @click="batchDelete">
                  批量删除
                </button>
              </div>
            </div>
          </div>
        </div>
        <!-- 下一行 -->
        <div class="row no-gutters" style="margin-bottom:4px">
          <div class="col-md-1">
            <button class="btn btn-fill btn-info" @click="exportData">
              导出
            </button>
          </div>
          <span v-if="tablesrc == 'privateflight'">
            <div class="col-md-1">
              <!-- 会跳转到表格中的修改页面 -->
              <button class="btn btn-fill btn-info" @click="itemFix">
                新增
              </button>
            </div>
            <div class="col-md-1">
              <a-upload
                :fileList="fileList"
                :remove="handleRemove"
                :beforeUpload="beforeUpload"
              >
                <button class="btn btn-fill btn-info">选择文件</button>
              </a-upload>
            </div>
            <div class="col-md-1">
              <button
                class="btn btn-fill btn-info"
                @click="handleUpload"
                :disabled="fileList.length === 0"
                :loading="uploading"
              >
                {{ uploading ? "上传中..." : "批量导入" }}
              </button>
            </div>
            <div class="col-md-2">
              <button class="btn btn-fill btn-info" @click="downloadTemplet">
                下载模板(新增专用)
              </button>
            </div>
            <div class="col-md-5"></div>
          </span>
        </div>
        <!--  -->
      </a-form>
    </div>
    <div>
      <div class="col-sm-12">
        <el-table :data="tableData">
          <el-table-column type="index"> </el-table-column>
          <el-table-column>
            <p-checkbox
              :indeterminate="
                selectedRowKeys.length > 0 &&
                  selectedRowKeys.length < data.length
              "
              @change="selectAll"
              :checked="selectedRowKeys.length === data.length"
            ></p-checkbox>
          </el-table-column>
          <el-table-column prop="airCo" label="航司"></el-table-column>
          <el-table-column prop="tripAirPort" label="机场码"></el-table-column>
          <el-table-column prop="tripCity" label="城市码"></el-table-column>
          <el-table-column prop="flightNumber" label="航班号"></el-table-column>
          <el-table-column prop="depDate" label="乘机日期"></el-table-column>
          <el-table-column
            prop="depTime"
            @click="sorterFiled('deptime')"
            style="cursor: pointer;"
            label="出发时间"
          ></el-table-column>
          <el-table-column prop="arrTime" label="到达时间"></el-table-column>
          <el-table-column label="Actions">
            <!-- slot-scope="props"显示数据：使用插槽 -->
            <template slot-scope="props">
              <a
                class="btn btn-simple btn-info btn-xs btn-icon like"
                @click="itemFix"
                >修改</a
              >
              <a
                class="btn btn-simple btn-warning btn-xs btn-icon edit"
                @click="itemLog"
                >日志</a
              >
              <a
                class="btn btn-simple btn-danger btn-xs btn-icon remove"
                @confirm="itemDelete"
                >删除</a
              >
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <!-- 渲染表格 -->
    <!-- <div class="col-sm-12">
      <el-table class="table-striped" :data="data" border style="width:100%">
        <el-table-column>
          <p-checkbox :checked="selectedRowKeys.indexOf(item.id) !== -1" @change="checkChange(item.id)"></p-checkbox>
        </el-table-column>
        <el-table-column v-for="item in data"
                             :key="item.label"
                             :min-width="column.minWidth"
                             :prop="item.prop"
                             :label="item.label">
            </el-table-column>
        <el-table-column label="操作">
           
            <template slot-scope="props">
              <a
                class="btn btn-simple btn-info btn-xs btn-icon like"
                @click="itemFix"
                >修改</a
              >
              <a
                class="btn btn-simple btn-warning btn-xs btn-icon edit"
                @click="itemLog"
                >日志</a
              >
              <a
                class="btn btn-simple btn-danger btn-xs btn-icon remove"
                @confirm="itemDelete"
                >删除</a
              >
            </template>
          </el-table-column>
      </el-table>
    </div> -->
    <!-- × -->
    <template>
      <a-modal title="日志" v-model="logVisible" :footer="null">
        <Log v-if="logVisible" db="privateflight" :src="tablesrc" :id="logId" />
      </a-modal>
    </template>
  </div>
</template>
<script>
const srclist = [
  { value: "API", text: "API" },
  { value: "web", text: "网页" },
  { value: "APP", text: "APP" },
  { value: "other", text: "第三方" },
  { value: "shoudong", text: "手动" },
];
import {
  pageSizeInit,
  tablescrolly,
  pageSizeOptions,
} from "src/config/defaultSetting";
import {
  policyGetList,
  policyDelete,
  policyUploadFile,
  policyBatchUpdate,
  policyDownloadTemplet,
  policyExportFile,
} from "src/api/publicpolicy";
import _ from "underscore";
import Log from "src/components out/Log";

import {
  objectTrim,
  compactObject,
  compactObjectStr,
  downloadExcel,
  rangePickToArr,
} from "@/utils/util";

const sourcedataclass = {
  directconnect: {
    tablesrc: "privateflight",
    tabletitle: "直连数据（总）",
  },
  apidirectconnect: {
    tablesrc: "flightapi",
    tabletitle: "直连数据（API）",
  },
};
// 样式框架
import {
  DatePicker,
  TimeSelect,
  Slider,
  Tag,
  Input,
  Button,
  Select,
  Option,
} from "element-ui";
import PProgress from "src/components/UIComponents/Progress.vue";
import PSwitch from "src/components/UIComponents/Switch.vue";
export default {
  components: {
    [DatePicker.name]: DatePicker,
    [TimeSelect.name]: TimeSelect,
    [Slider.name]: Slider,
    [Tag.name]: Tag,
    [Input.name]: Input,
    [Button.name]: Button,
    [Option.name]: Option,
    [Select.name]: Select,
    PSwitch,
    PProgress,
  },
  data() {
    return {
      // 上传文件
      fileList: [],
      uploading: false,
      form: this.$form.createForm(this),
      // 分页
      pagination: {
        currentPage: 1,
        perPage: 5,
        total: 100,
        perPageOptions: [5, 10, 25, 50],
      },
      data: [],
      loading: false,
      tablescrolly, // Y轴滚动高度
      pagination: {
        current: 1,
        pageSize: pageSizeInit,
        showSizeChanger: true,
        showTotal: (total) => `共 ${total} 条`,
        total: 0,
        position: "top",
        pageSizeOptions: pageSizeOptions,
      },
      selectedRowKeys: [], // Check here to configure the default column
      form: this.$form.createForm(this),
      formBatchFix: this.$form.createForm(this),
      batchFixVisible: false,
      logVisible: false, // 日志面板
      logId: 0,
      // 当前搜索条件
      filter: {
        page: { pageNum: 1, pageSize: pageSizeInit },
        param: {},
        orderBy: { filed: "deptime", sort: "desc" },
      },
      // 分库信息
      tablesrc: "",
      tabletitle: "",
      data: [
        {
          prop: "airCo",
          label: "航司",
        },
        {
          prop: "tripAirPort",
          label: "机场码",
        },
        {
          prop: "tripCity",
          label: "城市码",
        },
        {
          prop: "flightNumber",
          label: "航班号",
        },
        {
          prop: "depDate",
          label: "乘机日期",
        },
        {
          prop: "depTime",
          label: "出发时间",
        },
        {
          prop: "arrTime",
          label: "到达时间",
        },
        {
          prop: "",
          label: "阶梯运价",
        },
        {
          prop: "",
          label: "舱位",
        },
        {
          prop: "",
          label: "余位",
        },
        {
          prop: "",
          label: "成人价",
        },
        {
          prop: "",
          label: "成人税",
        },
        {
          prop: "",
          label: "儿童价",
        },
        {
          prop: "",
          label: "儿童税",
        },
        {
          prop: "",
          label: "舱等",
        },
        {
          prop: "",
          label: "数据更新时间",
        },
        {
          prop: "",
          label: "来源",
        },
        {
          prop: "",
          label: "上下架",
        },
        {
          prop: "",
          label: "更新状态",
        },
        {
          prop: "",
          label: "操作",
        }
      ],
      tableData: [
        {
          id: "395345",
          airCo: "TR",
          tripAirPort: "HKG-SIN",
        },
        {
          id: "395346",
          airCo: "TR",
          tripAirPort: "SIN-HKG",
        },
      ],
    };
  },
  mounted() {
    const srctype = this.$route.name;
    this.tablesrcChange(srctype);
  },
  watch: {
    $route(to, from) {
      // 对路由变化时改变tablesrc...
      let srctype = "";
      if (to.name == "directconnect") {
        srctype = to.name;
        this.tablesrcChange(srctype);
      } else if (to.name == "apidirectconnect") {
        srctype = to.name;
        this.tablesrcChange(srctype);
      }

      const { form } = this;
      let airCo = form.getFieldValue("airCo");
      if (airCo) {
        this.filter.page = {
          pageNum: 1,
          pageSize: this.pagination.pageSize,
        };
        this.search();
      }
    },
  },
  methods: {
    // 点击按钮时触发的事件
    itemFix(e) {
      let id = e.target.dataset.id;
      this.$router.push(`/forms/validation`);
    },
    // tbody中的checkbox事件
    selectAll(e) {
      console.log(e);
      if (e.target.checked) {
        this.selectedRowKeys = _.map(this.data, (v) => v.id);
      } else {
        this.selectedRowKeys = [];
      }
    },
    checkChange(id) {
      if (this.selectedRowKeys.indexOf(id) > -1) {
        var index = this.selectedRowKeys.indexOf(id);
        if (index > -1) {
          this.selectedRowKeys.splice(index, 1);
        }
      } else {
        this.selectedRowKeys.push(id);
      }
    },
    // 封装的函数（用于监听路由变化）
    tablesrcChange(srctype) {
      const tablesrc = sourcedataclass[srctype]["tablesrc"];
      this.tablesrc = tablesrc;
      this.tabletitle = sourcedataclass[srctype]["tabletitle"];
      console.log(tablesrc);
      this.$store.commit("SET_TABLESRC", tablesrc);
      localStorage.setItem("policy_tablesrc", tablesrc);
    },
    // input中的blur事件
    strToCap(prop) {
      const { form } = this;
      let value = form.getFieldValue(prop);
      if (!value) return;
      let newValue = value.toUpperCase();
      form.setFieldsValue({ [prop]: newValue });
    },
    // input输入框的blur，表格相关事件
    pstrToCap(prop) {
      const { formBatchFix } = this;
      let value = formBatchFix.getFieldValue(prop);
      if (!value) return;
      let newValue = value.toUpperCase();
      formBatchFix.setFieldsValue({ [prop]: newValue });
    },
    // 封装的函数(根据ID去找信息)
    getItemById(id, newstate, sn) {
      let item = _.find(this.data, (v) => v.id == id);
      let param = {
        airCo: item.airCo,
      };
      param[sn] = newstate;
      return param;
    },

    // 阶梯运价展示格式
    formatContent(v, num) {
      return (function(v) {
        try {
          if (v.cabins) {
            let tmpcabins = v.cabins.replace(/;$/, ""); // 去除末尾的;号
            let tmparr = tmpcabins.split(";");
            let resultstr;
            let result = _.map(tmparr, (v) => {
              let tmp = v.split(",");
              return `<span style="width: 30px; display: inline-block;">${tmp[0]}</span>,
              <span style="width: 30px; display: inline-block;">${tmp[1]}</span>,
              <span style="width: 30px; display: inline-block;">${tmp[2]}</span>,
              <span display: inline-block;">${tmp[3]}</span>`;
            });
            if (num) {
              resultstr = _.filter(result, (v, i) => {
                return i < 2;
              }).join("<br>");
            } else {
              resultstr = result.join("<br>");
            }
            return resultstr;
          }
        } catch (error) {
          return "解析错误";
        }
      })(v);
    },
    // 分页相关
    changePage(page, pageSize) {
      console.log(page);
      this.filter.page.pageNum = page;
      this.pagination.current = page;
      this.filter.page.pageSize = pageSize;
      this.refresh(this.filter);
    },
    changePageSize(current, pageSize) {
      this.pagination.current = 1;
      this.filter.page.pageNum = 1;
      this.pagination.pageSize = pageSize;
      this.filter.page.pageSize = pageSize;
      this.refresh(this.filter);
    },
    // 表格中的事件
    sorterFiled(filed) {
      console.log(filed);
      if (filed == this.filter.orderBy.filed) {
        this.filter.orderBy.sort =
          this.filter.orderBy.sort == "desc" ? "asc" : "desc";
      } else {
        this.filter.orderBy.filed = filed;
        this.filter.orderBy.sort = "desc";
      }
      this.refresh(this.filter);
    },
    // 航班号的blur事件 筛选条件输入航班号自动取前两位，填入航司
    autoFixairCo() {
      const { form } = this;
      let flightNumber = form.getFieldValue("flightNumber");
      flightNumber = flightNumber.toUpperCase();
      form.setFieldsValue({ flightNumber: flightNumber });
      let airCo = flightNumber.slice(0, 2);
      let formAirCo = form.getFieldValue("airCo");
      form.setFieldsValue({ airCo: airCo });
    },
    // 上传文件
    handleRemove(file) {
      const index = this.fileList.indexOf(file);
      const newFileList = this.fileList.slice();
      newFileList.splice(index, 1);
      this.fileList = newFileList;
    },
    beforeUpload(file) {
      this.fileList = [...this.fileList, file];
      return false;
    },
    // 按钮批量导入
    handleUpload() {
      let { fileList } = this;
      let formData = new FormData();
      fileList.forEach((file) => {
        formData.append("file", file, file.name);
      });
      this.uploading = true;

      policyUploadFile(formData, this.tablesrc)
        .then((res) => {
          if (!res.state) {
            this.$message.success("上传成功", 2);
          } else {
            this.$message.error("格式有误，请检查表格", 2);
            // this.$message.error(res.message, 2);
          }
        })
        .catch((err) => {
          this.$message.error("上传失败", 2);
        })
        .finally(() => {
          this.fileList = [];
          this.uploading = false;
        });
    },
    // 批量修改状态上传
    updatestate(ids, newobj) {
      this.loading = true;
      let packdata = {
        param: newobj,
        ids: ids,
      };
      policyBatchUpdate(packdata, this.tablesrc)
        .then((res) => {
          if (!res.state) {
            this.$message.success("修改成功", 2);
            this.selectedRowKeys = [];
            this.data = _.map(this.data, (v) => {
              if (_.contains(ids, v.id)) {
                v = _.extend(v, newobj);
              }
              return v;
            });
            // this.refresh(this.filter);
          } else {
            this.$message.error(res.message, 2);
          }
        })
        .catch((err) => {
          this.$message.error("修改失败", 2);
        })
        .finally(() => {
          this.loading = false;
        });
    },
    // 在表格上绑定的change事件
    changeState(checked) {
      let id = +event.target.dataset.id;
      let ids = [id];
      let newstate = checked ? "1" : "0";
      let param = this.getItemById(id, newstate, "status");
      this.updatestate(ids, param);
    },
    // 在表格上绑定的事件
    changeUpdateState(checked, e) {
      let id = +event.target.dataset.id;
      let jtyj = event.target.dataset.jtyj;
      if (!checked) {
        if (!jtyj) {
          this.$message.error(
            "非更新状态下必须有阶梯运价信息，请修改该条目的阶梯运价",
            5
          );
          return;
        }
      }
      let ids = [id];
      let newstate = checked ? "1" : "0";
      let param = this.getItemById(id, newstate, "updateStatus");
      this.updatestate(ids, param);
    },
    // 封装函数（主要对数据进行操作）
    atLeastOne() {
      let selectedIds = this.selectedRowKeys;
      if (selectedIds.length <= 0) {
        this.$message.warning("至少选择一条记录");
        return false;
      }
      return true;
    },
    // 表格修改事件中触发页面的取消按钮
    hideBatchFixModal() {
      this.batchFixVisible = false;
    },
    // 封装函数（批量修改调用）
    showBatchFixModal() {
      this.batchFixVisible = true;
      const { formBatchFix } = this;
      formBatchFix.resetFields();
    },
    // 批量修改事件
    batchChangeParam() {
      if (!this.atLeastOne()) return;
      let selectIds = this.selectedRowKeys;
      let aircos = _.chain(this.data)
        .filter((v) => {
          return _.contains(selectIds, v.id);
        })
        .map((v) => {
          return v.airCo;
        })
        .uniq()
        .value();
      if (aircos.length > 1) {
        this.$message.warning("请选择同一航司进行批量修改", 3);
        return;
      }
      this.showBatchFixModal();
    },
    // 表格修改事件
    batchFix() {
      const { formBatchFix } = this;
      formBatchFix.validateFields((err, values) => {
        if (!err) {
          let packdata = values;
          let id = this.selectedRowKeys[0];
          let item = _.find(this.data, (v) => v.id == id);
          packdata.airCo = item.airCo;
          let param = compactObject(packdata);
          let json = {
            param: param,
            ids: this.selectedRowKeys,
          };
          this.loading = true;
          policyBatchUpdate(json, this.tablesrc)
            .then((res) => {
              if (!res.state) {
                this.$message.success("修改成功", 2);
                this.hideBatchFixModal();
                this.refresh(this.filter);
              } else {
                this.$message.error(res.message, 2);
              }
            })
            .catch((err) => {
              this.$message.error("修改失败", 2);
            })
            .finally(() => {
              this.loading = false;
            });
        }
      });
    },
    // 按钮上下架事件
    batchChangeState(newstate) {
      if (!this.atLeastOne()) return;
      let id = this.selectedRowKeys[0];
      let param = this.getItemById(id, newstate, "status");
      this.updatestate(this.selectedRowKeys, param);
    },
    // 按钮更新事件
    changeUpdate(newstate) {
      if (!this.atLeastOne()) return;
      let id = this.selectedRowKeys[0];
      let param = this.getItemById(id, newstate, "updateStatus");
      if (newstate == 0) {
        let check = true;
        _.chain(this.data)
          .filter((v) => {
            return _.contains(this.selectedRowKeys, v.id);
          })
          .each((v) => {
            if (!v.cabins) {
              check = false;
            }
          });
        if (!check) {
          this.$message.error(
            "非更新状态下必须有阶梯运价信息，请检查选中条目是否符合要求",
            5
          );
          return;
        }
      }
      this.updatestate(this.selectedRowKeys, param);
    },
    // 按钮下载模板事件
    downloadTemplet(e) {
      e.preventDefault();
      policyDownloadTemplet()
        .then((res) => {
          if (!res) {
            this.$message.error("下载成功", 2);
            return;
          }
          downloadExcel(res, "template.xlsx");
        })
        .catch((err) => {
          this.$message.error("下载失败", 2);
        });
    },

    // 按钮导出事件
    exportData(e) {
      e.preventDefault();
      const that = this;
      this.$confirm({
        title: "提示",
        // content: (
        //   <p>
        //     根据筛选条件导出数据，导出数据仅用于修改，新增数据请使用专用模板，是否继续？
        //   </p>
        // ),
        okText: "确定",
        cancelText: "取消",
        onOk() {
          that.form.validateFields((err, values) => {
            if (values.routeReturn) {
              if (values.depAirPort && values.arrAirPort) {
              } else {
                that.$message.warning("请输入出发机场和到达机场", 3);
                return;
              }
            }

            if (values.tripDate && values.tripDate.length > 0) {
              [values.depDateStart, values.depDateEnd] = rangePickToArr(
                values.tripDate
              );
            }
            if (values.updateDate && values.updateDate.length > 0) {
              [values.updateTimeStart, values.updateTimeEnd] = rangePickToArr(
                values.updateDate,
                "YYYY-MM-DD"
              );
              values.updateTimeStart = values.updateTimeStart + " 00:00:00";
              values.updateTimeEnd = values.updateTimeEnd + " 23:59:59";
            }
            if (!err) {
              let filter = compactObject(values); // 去除对象中为空的项
              if (values.routeReturn == false) {
                filter.routeReturn = false;
              }
              filter.destination = that.tablesrc; // 分库信息
              let query = _.map(filter, (v, i) => `${i}=${v}`).join("&");

              policyExportFile(query)
                .then((res) => {
                  if (!res) {
                    that.$message.error(res.message, 2);
                  } else {
                    downloadExcel(res, "policy.xlsx");
                  }
                })
                .catch((err) => {
                  that.$message.error("导出失败", 2);
                });
            }
          });
        },
        onCancel() {},
      });
    },
    // 表格中的修改
    // itemFix(e) {
    //   let id = e.target.dataset.id;
    //   this.$router.push(`/admin/rawdata/adddata/${id}?type=fixed`);
    // },
    // 按钮批量删除的事件
    batchDelete() {
      if (!this.atLeastOne()) return;
      let ids = this.selectedRowKeys;
      let list = this.data;
      // 选中相同航司时才能继续操作
      let aircos = _.chain(list)
        .filter((v) => {
          return _.contains(ids, v.id);
        })
        .map((v) => {
          return v.airCo;
        })
        .uniq()
        .value();
      if (aircos.length > 1) {
        this.$message.warning("请选择同一航司进行批量修改", 3);
        return;
      }
      const _this = this;
      this.$confirm({
        title: "提示",
        // content: <p style="color: red;">删除后无法恢复，是否继续？</p>,
        okText: "确定",
        cancelText: "取消",
        onOk() {
          let id = ids[0];
          let item = _.find(list, (v) => v.id == id);
          let params = {
            ids: ids,
            airCo: item.airCo,
          };
          _this.deleteRequest(params);
        },
      });
    },
    //表格中删除事件
    itemDelete(id) {
      let ids = [id];
      let item = _.find(this.data, (v) => v.id == id);
      let params = {
        ids: ids,
        airCo: item.airCo,
      };
      this.deleteRequest(params);
    },
    // 封装函数（删除事件）
    deleteRequest(params) {
      policyDelete(params, this.tablesrc)
        .then((res) => {
          if (!res.state) {
            this.$message.success("删除成功", 2);
            this.refresh(this.filter);
          } else {
            this.$message.error(res.message, 2);
          }
        })
        .catch((err) => {
          this.$message.error("删除失败", 2);
        });
    },
    // 用于表格中日志的事件
    itemLog(e) {
      this.logVisible = true;
      let id = e.target.dataset.id;
      this.logId = id;
    },

    // 暂时没有
    onSelectChange(selectedRowKeys, items) {
      this.selectedRowKeys = selectedRowKeys;
      this.selectedRows = items;
    },
    // 封装的函数用于表单更新
    renderList(data) {
      this.data = _.map(data.list, (v) => {
        let tmp = v;
        tmp.tripAirPort = `${v.depAirPort}-${v.arrAirPort}`;
        tmp.tripCity = `${v.depCity}-${v.arrCity}`;
        tmp.depTime = `${v.depTime.slice(0, 4)}-${v.depTime.slice(
          4,
          6
        )}-${v.depTime.slice(6, 8)} ${v.depTime.slice(8, 10)}:${v.depTime.slice(
          10,
          12
        )}`;
        tmp.arrTime = `${v.arrTime.slice(0, 4)}-${v.arrTime.slice(
          4,
          6
        )}-${v.arrTime.slice(6, 8)} ${v.arrTime.slice(8, 10)}:${v.arrTime.slice(
          10,
          12
        )}`;
        tmp.srcFrom = _.find(srclist, (vv) => {
          return vv.value === v.src;
        }).text;
        return tmp;
      });
      this.pagination.total = data.total;
    },
    // 暂时没有
    toCap(e) {
      return e.target.value.toUpperCase();
    },
    // 表单更新
    refresh(filter) {
      this.selectedRowKeys = [];
      this.loading = true;
      policyGetList(filter, this.tablesrc)
        .then((res) => {
          if (!res.state) {
            this.renderList(res.data);
          } else {
            this.$message.error(res.message, 2);
          }
        })
        .catch((err) => {
          this.$message.error("请求失败", 2);
        })
        .finally(() => {
          this.loading = false;
        });
    },
    // 提交表单的条件渲染
    paramsFilter() {
      this.filter.page.pageNum = 1;
      this.pagination.current = 1; // 查询后导航默认第一页
      this.search();
    },

    // 封装的方法
    search() {
      const { form } = this;
      form.validateFields((err, values) => {
        if (!err) {
          let param = values; // 去除对象中值为字符串的两端空格
          if (values.tripDate && values.tripDate.length > 0) {
            [param.depDateStart, param.depDateEnd] = rangePickToArr(
              values.tripDate
            );
          }
          if (values.updateDate && values.updateDate.length > 0) {
            [param.updateTimeStart, param.updateTimeEnd] = rangePickToArr(
              values.updateDate,
              "YYYY-MM-DD"
            );
            param.updateTimeStart = param.updateTimeStart + " 00:00:00";
            param.updateTimeEnd = param.updateTimeEnd + " 23:59:59";
          }
          if (values.routeReturn) {
            if (values.depAirPort && values.arrAirPort) {
            } else {
              this.$message.warning("请输入出发机场和到达机场", 3);
              return;
            }
          }
          this.filter.param = param;
          this.refresh(this.filter);
        }
      });
    },
  },
};
</script>
<style>
.extended-forms .el-select {
  width: 100%;
  margin-bottom: 30px;
}
.form-group {
  margin-bottom: 1px;
}
.col-md-1,
.col-md-2 {
  padding-right: 0px;
}
.checkbox {
  padding-left: 51px;
  margin-top: 27px;
}
.form-control {
  height: 30px;
}
</style>
