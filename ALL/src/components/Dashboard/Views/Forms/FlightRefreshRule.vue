<template>
  <div>
    <!-- 数据更新规则 -->
    <!-- 第一行 -->
    <div class="row">
      <div class="col-md-1">
        <label>航司</label>
        <input type="text" class="form-control" placeholder="TR" />
      </div>
      <div class="col-md-1">
        <label>出发机场</label>
        <input type="text" class="form-control" placeholder="NGB" />
      </div>
      <div class="col-md-1">
        <label>到达机场</label>
        <input type="text" class="form-control" placeholder="NGB" />
      </div>
      <div class="col-md-1">
        <label>行程类型</label>
        <el-select placeholder="全部">
          <el-option value="0" label="单程"></el-option>
          <el-option value="1" label="往返"></el-option>
        </el-select>
      </div>
      <div class="col-md-1">
        <label>渠道:</label>
        <el-select>
          <el-option value="0" label="爬虫"></el-option>
          <el-option value="1" label="API"></el-option>
        </el-select>
      </div>
    </div>
    <!-- 第二行 -->
    <div class="row">
      <button class="btn btn-info btn-fill">搜索</button>
      <button class="btn btn-info btn-fill">清空</button>
      <button class="btn btn-info btn-fill">新建</button>
      <button class="btn btn-info btn-fill">导出数据</button>
      <button class="btn btn-info btn-fill">选择文件</button>
      <button class="btn btn-info btn-fill">上传数据</button>
      <button class="btn btn-info btn-fill">下载模板</button>
      <button class="btn btn-info btn-fill">批量删除</button>
    </div>
  </div>
</template>
<script>
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
import PPagination from "src/components/UIComponents/Pagination.vue";

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
    PPagination,
  },
};
</script>
