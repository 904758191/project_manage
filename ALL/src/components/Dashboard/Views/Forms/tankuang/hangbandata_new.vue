<template>
  <div>
    <h4>单程直飞：</h4>
    <h4>去程航班：</h4>
    <div>
      <form>
        <div class="row">
          <div class="form-group col-md-1">
            <label>航司：</label>
            <input type="text" class="form-control" placeholder="TR" />
          </div>
          <div class="form-group col-md-2">
            <label>航班号：</label>
            <input type="text" class="form-control" placeholder="TR" />
          </div>
          <div class="form-group col-md-2">
            <label>出发时间：</label>
            <el-date-picker></el-date-picker>
          </div>
          <div class="form-group col-md-2">
            <label>到达时间：</label>
            <el-date-picker type="date" placeholder="选择日期"></el-date-picker>
          </div>
          <div class="form-group col-md-2">
            <label>乘机日期：</label>
            <el-date-picker></el-date-picker>
          </div>
          <div class="form-group col-md-2">
            <label>到达日期：</label>
            <el-date-picker></el-date-picker>
          </div>
        </div>
      </form>
    </div>
    <h4>公有运价：</h4>
    <div>
      <form>
        <div class="row">
          <div class="form-group col-md-1">
            <label>舱位：</label>
            <input type="text" class="form-control" />
          </div>
          <div class="form-group col-md-1">
            <label>数量：</label>
            <input type="text" class="form-control" />
          </div>
          <div class="form-group col-md-1">
            <label>裸价：</label>
            <input type="text" class="form-control" />
          </div>
          <div class="form-group col-md-1">
            <label>税金：</label>
            <input type="text" class="form-control" />
          </div>
          <div class="form-group col-md-1">
            <label>含税价：</label>
            <input type="text" class="form-control" />
          </div>
        </div>
      </form>
    </div>
    <h4>私有运价：</h4>
    <div v-for="(item, index) in formgroup" :key="index">
      <el-form ref="form">
        <el-form-item label="舱位">
          <el-input v-model="itemInput.cangwei"></el-input>
        </el-form-item>
        <el-form-item label="数量">
          <el-input v-model="itemInput.date"></el-input>
        </el-form-item>
        <el-form-item label="裸价">
          <el-input v-model="itemInput.price"></el-input>
        </el-form-item>
        <el-form-item label="税金">
          <el-input v-model="itemInput.shuijin"></el-input>
        </el-form-item>
        <el-form-item label="含税价">
          <el-input v-model="itemInput.hanshuijia"></el-input>
        </el-form-item>
        <button class="btn btn-small" @click="addCabin(editActiveRetFlightCabins, cindex, depFlightTax)">增加</button>
        <button class="btn btn-small" @click="delCabin(editActiveRetFlightCabins, cindex)">删除</button>
      </el-form>
    </div>
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
import PProgress from "@/components/UIComponents/Progress.vue";
import PSwitch from "@/components/UIComponents/Switch.vue";
import PPagination from "@/components/UIComponents/Pagination.vue";
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
      addform: [1],
    };
  },
  methods: {
    // 增加表格
    addCabin(cabins, index, tax) {
      console.log("index:", index);
      cabins.splice(index + 1, 0, { name: "", tax: tax });
    },
    // 删除表格
    delCabin(cabins, index) {
      console.log("index:", index);
      if (cabins.length == 1) {
        return;
      }
      cabins.splice(index, 1);
    },
  },
};
</script>
