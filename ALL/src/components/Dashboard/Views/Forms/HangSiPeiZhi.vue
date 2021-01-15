<template>
  <div>
    <!--  -->
    <el-tabs type="border-card">
      <el-tab-pane label="行李配置1">行李配置1</el-tab-pane>
      <el-tab-pane label="行李配置2">行李配置2</el-tab-pane>
      <el-tab-pane label="行李配置3">行李配置3</el-tab-pane>
      <el-tab-pane label="行李配置4">行李配置4</el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
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
