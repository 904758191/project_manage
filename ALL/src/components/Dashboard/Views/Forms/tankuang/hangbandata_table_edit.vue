<template>
  <div>
    <el-form>
      <div>
        <div class="form-group col-md-2">
          <label>航司</label>
          <input type="text" v-model="searchCarrier" />
        </div>
        <div class="form-group col-md-2">
          <label>出发机场</label>
          <input type="text" v-model="searchDepAirport" />
        </div>
        <div class="form-group col-md-2">
          <label>到达机场</label>
          <input type="text" v-model="searchArrAirport" />
        </div>
        <div class="form-group col-md-2">
          <label>航班号</label>
          <input type="text" v-model="searchFlightNumber" />
        </div>
      </div>
    </el-form>
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
  data() {
    return {
      searchCarrier: "",
      searchDepAirport: "",
      searchArrAirport: "",
      searchFlightNumber: "",
    };
  },
};
</script>
