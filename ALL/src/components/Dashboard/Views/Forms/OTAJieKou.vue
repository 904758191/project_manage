<template>
<!-- OTA搜索接口验证 -->
  <div>
    <!-- 第一行 -->
    <div class="row">
      <div class="col-md-1">
        <label>平台</label>
        <el-select placeholder="携程">
          <el-option value label="携程"></el-option>
          <el-option value="0" label="淘宝"></el-option>
          <el-option value="1" label="去哪儿"></el-option>
        </el-select>
      </div>
      <div class="col-md-1">
        <label>马甲</label>
        <el-select placeholder="捷运廉航">
          <el-option value label="捷运廉航"></el-option>
          <el-option value="0" label="甬航空位"></el-option>
          <el-option value="1" label="捷运普通"></el-option>
        </el-select>
      </div>
      <div class="col-md-1">
          <label>行程类型</label>
          <el-select placeholder="全部">
            <el-option value="0" label="单程"></el-option>
            <el-option value="1" label="往返"></el-option>
          </el-select>
        </div>
      <div class="col-md-1">
        <label>人数</label>
        <el-select placeholder="1">
          <el-option label="1"></el-option>
          <el-option label="2"></el-option>
          <el-option label="3"></el-option>
        </el-select>
      </div>
      <div class="col-md-1">
        <label>出发城市</label>
        <input type="text" class="form-control" placeholder="TPE">
      </div>
      <div class="col-md-1">
        <label>到达城市</label>
        <input type="text" class="form-control" placeholder="TPE">
      </div>
      <div class="col-md-1">
        <label>去程日期</label>
        <el-date-picker></el-date-picker>
      </div>
      <div class="col-md-1">
        <label>返程日期</label>
        <el-date-picker></el-date-picker>
      </div>
      
    </div>
    <div class="row">
        <button class="col-md-1 btn btn-info btn-fill">搜索</button>
        <button class="col-md-1 btn btn-info btn-fill">验价</button>
        <button class="col-md-1 btn btn-info btn-fill">生单</button>
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