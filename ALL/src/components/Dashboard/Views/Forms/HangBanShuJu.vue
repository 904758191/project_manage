
<template>
<!-- 航班数据 -->
  <div>
    <a-divider orientation="left">
        航班数据
        <span
          style="font-size: 14px; color: red;"
        >（a.凡是通过批量录入导入的政策，都只会新增，不会更新原有政策；b.当存在多条政策时，系统默认取价格低的政策；）</span>
      </a-divider>
      <a-form>
      <!-- 第一行 -->
      <div class="row">
        <div class="form-group col-md-1">
          <a-form-item>
            <a-upload>
              <button class="btn btn-info btn-fill">
                选择文件
              </button>
              </a-upload>
          </a-form-item> 
        </div>
        <button class="col-md-1 btn btn-info btn-fill">上传</button>
        <button class="col-md-1 btn btn-info btn-fill">下载样例</button>
        <button class="col-md-1 btn btn-info btn-fill">单程导入</button>
        <button class="col-md-1 btn btn-info btn-fill">往返录入</button>
        <button class="col-md-1 btn btn-info btn-fill">往返SP录入</button>
      </div>
      <!-- 第二行 -->
      <div class="row">
          <div class="col-md-2 form-group">
          <label>平台:</label>
          <el-select  placeholder="捷运">
            <el-option value="0" label="捷运"></el-option>
            <el-option value="1" label="甬航"></el-option>
          </el-select>
        </div>
        <div class="col-md-1">
          <label>类型</label>
          <el-select placeholder="全部">
            <el-option value="0" label="单程"></el-option>
            <el-option value="1" label="往返"></el-option>
          </el-select>
        </div>
        <div class="col-md-1">
          <label>航司</label>
          <input type="text" class="form-control" placeholder="TR">
        </div>
        <div class="col-md-1">
          <label>出发机场</label>
          <input type="text" class="form-control" placeholder="NGB">
        </div>
        <div class="col-md-1">
          <label>到达机场</label>
          <input type="text" class="form-control" placeholder="NGB">
        </div>
        <div class="col-md-1">
          <label>航班号</label>
          <input type="text" class="form-control" placeholder="UO112">
        </div>
        <div class="col-md-1">
          <label>舱位:</label>
          <input type="text" class="form-control" placeholder="X">
        </div>

      </div>
      <!-- 第三行 -->
      <div class="row">
        <div class="col-md-1">
          <label>票价:</label>
          <input type="text" class="form-control">
        </div>
        <div class="col-md-4">
          <label>去程日期:</label>
          <el-date-picker
                  type="daterange"
                  range-separator="~"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                ></el-date-picker>
        </div>
        <div class="col-md-1">
          <label>上架下架</label>
          <el-select placeholder="上架">
            <el-option value="0">上架</el-option>
            <el-option value="1">下架</el-option>
          </el-select>
        </div>
        <div class="col-md-1">
          <label>类型</label>
          <el-select placeholder="全部">
            <el-option value label="全部"></el-option>
            <el-option value="0" label="手动"></el-option>
            <el-option value="1" label="自动"></el-option>
          </el-select>
        </div>
        <button class="col-md-1 btn btn-info btn-fill">查询</button>
        <div class="col-md-1">
          <p-checkbox>查往返</p-checkbox>
        </div>

      </div>
      </a-form>
      
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
import PPagination from 'src/components/UIComponents/Pagination.vue'

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
    PPagination
  },
}
</script>
<style scoped>
  button{
    margin:0px 5px
  }
</style>