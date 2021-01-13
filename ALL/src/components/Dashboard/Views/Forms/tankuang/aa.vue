<template>
  <!-- 
  航线： depcity-arrcity
  类型：1：单程直飞 2：单程中转 3：往返直飞 4：往返中转
  公有：0 私有：1
  状态：0上线 1下线

  公有运价
   舱位 数量 成人税 儿童税 舱位价格
  
  私有运价
 -->
  <div>
    <h4>单程直飞：</h4>
    <h4>去程航班：</h4>
    <div>
      <!-- 固定不变的 -->
      <form>
        <div class="row">
          <div class="form-group col-md-1">
            <label>航线：</label>
            <div class="row" style="float:left">
              <input
                type="text"
                class="form-control"
                placeholder="HKG"
                v-model="depCity"
              />
              <input
                type="text"
                class="form-control"
                placeholder="NGB"
                v-model="arrCity"
              />
            </div>
          </div>
          <div class="form-group col-md-2">
            <el-item-form>
              <label>类型：</label>
              <el-select v-model="tripType">
                <el-option
                  value="1"
                  label="单程直飞"
                  class="option1"
                ></el-option>
                <el-option value="2" label="单程中转"></el-option>
                <el-option value="3" label="往返直飞"></el-option>
                <el-option value="4" label="往返中转"></el-option>
              </el-select>
            </el-item-form>
          </div>
          <div class="form-group col-md-2">
            <el-item-form>
              <label>公私有：</label>
              <el-select v-model="fareType">
                <el-option value="0" label="公有">公有</el-option>
                <el-option value="1" label="私有">私有</el-option>
              </el-select>
            </el-item-form>
          </div>
          <div class="form-group col-md-2">
            <label>状态：</label>
            <el-select v-model="status">
              <el-option value="0" label="上线">上线</el-option>
              <el-option value="1" label="下线">下线</el-option>
            </el-select>
          </div>
        </div>
      </form>
      <el-form :model="fromSegmentList">
        <div class="row">
          <el-form-item>
            <div class="from-group col-md-2">
              <label>航司</label>
              <input
                type="text"
                v-model="fromSegmentList[0].carrier"
                class=" form-control"
                placeholder="SQ"
              />
            </div>
          </el-form-item>
          <el-form-item>
            <div class="from-group col-md-2">
              <label>出发时间</label>
              <el-date-picker
                type="date"
                v-model="fromSegmentList[0].depTime"
              ></el-date-picker>
            </div>
          </el-form-item>
          <el-form-item>
            <div class="from-group col-md-2">
              <label>到达时间</label>
              <el-date-picker
                type="date"
                v-model="fromSegmentList[0].arrTime"
              ></el-date-picker>
            </div>
          </el-form-item>
          <el-form-item>
            <div class="from-group col-md-2">
              <label>出发机场</label>
              <input
                type="text"
                class=" form-control"
                v-model="fromSegmentList[0].depAirport"
                placeholder="SQ"
              />
            </div>
          </el-form-item>
          <el-form-item>
            <div class="from-group col-md-1">
              <label>到达机场</label>
              <input
                type="text"
                class=" form-control"
                v-model="fromSegmentList[0].arrAirport"
                placeholder="SQ"
              />
            </div>
          </el-form-item>
          <el-form-item>
            <div class="from-group col-md-1">
              <label>航班号</label>
              <input
                type="text"
                class=" form-control"
                v-model="fromSegmentList[0].flightNumber"
                placeholder="SQ"
              />
            </div>
          </el-form-item>
          <div v-if="tripType == 1">
            <button class="btn btn-small col-md-1">删除</button>
            <button class="btn btn-small col-md-1" @click="addItem">
              增加
            </button>
          </div>
          <div v-if="tripType != 1">
            <button class="btn btn-small col-md-1">删除</button>
            <button class="btn btn-small col-md-1" @click="addSelect">
              增加
            </button>
          </div>
          <div
            v-for="(item, index) in fromSegmentList"
            v-if="index >= 1"
            :key="index"
            class="row"
          >
            <el-form-item class="col-md-2">
              <label>航司</label>
              <el-input v-model="item.carrier"></el-input>
            </el-form-item>
            <el-form-item class="col-md-2">
              <label>出发时间</label>
              <el-date-picker
                type="date"
                v-model="item.depTime"
              ></el-date-picker> </el-form-item
            ><el-form-item>
              <el-form-item class="col-md-2">
                <label>到达时间</label>
                <el-date-picker
                  type="date"
                  v-model="item.arrTime"
                ></el-date-picker>
              </el-form-item>
              <el-form-item class="col-md-2">
                <label>出发机场</label>
                <input
                  type="text"
                  class=" form-control"
                  v-model="item.depAirport"
                  placeholder="SQ"
                />
              </el-form-item>
              <el-form-item class="col-md-1">
                <label>到达机场</label>
                <input
                  type="text"
                  class=" form-control"
                  v-model="item.arrAirport"
                  placeholder="SQ"
                />
              </el-form-item>
              <el-form-item>
                <div class="from-group col-md-1">
                  <label>航班号</label>
                  <input
                    type="text"
                    class=" form-control"
                    v-model="item.flightNumber"
                    placeholder="SQ"
                  />
                </div>
              </el-form-item>
              <button
                class="btn btn-small col-md-1"
                @click="deleteSelect(item, index)"
              >
                删除
              </button>
              <button class="btn btn-small col-md-1" @click="addSelect">
                添加
              </button>
            </el-form-item>
          </div>
        </div>

        <h4>公有运价：</h4>
        <el-form :model="publicCabins_go">
          <div class="row">
            <div class="col-md-2">
              <p></p>
            </div>
            <div class="form-group col-md-2">
              <label>舱位：</label>
              <input
                type="text"
                class="form-control"
                v-model="publicCabins_go[0].cabinName"
              />
            </div>
            <div class="form-group col-md-2">
              <label>数量：</label>
              <input
                type="text"
                class="form-control"
                v-model="publicCabins_go[0].count"
              />
            </div>
            <div class="form-group col-md-2">
              <label>成人税：</label>
              <input
                type="text"
                class="form-control"
                v-model="publicCabins_go[0].adultIax"
              />
            </div>
            <div class="form-group col-md-2">
              <label>儿童税：</label>
              <input
                type="text"
                class="form-control"
                v-model="publicCabins_go[0].childTax"
              />
            </div>
            <div class="form-group col-md-2">
              <label>舱位价格：</label>
              <input
                type="text"
                class="form-control"
                v-model="publicCabins_go[0].cabinPrice"
              />
            </div>

            <div
              v-for="(item, index) in publicCabins_go"
              v-if="index >= 1"
              :key="index"
              class="row"
            >
              <div class="col-md-2">
                <p></p>
              </div>
              <el-form-item class="col-md-2">
                <label>舱位</label>
                <el-input v-model="item.cabinName"></el-input>
              </el-form-item>
              <el-form-item class="col-md-2">
                <label>数量</label>
                <el-input v-model="item.count"></el-input> </el-form-item
              ><el-form-item>
                <el-form-item class="col-md-2">
                  <label>成人税</label>
                  <el-input v-model="item.adultTax"></el-input>
                </el-form-item>
                <el-form-item class="col-md-2">
                  <label>儿童税</label>
                  <el-input v-model="item.childTax"></el-input>
                </el-form-item>
                <el-form-item class="col-md-2">
                  <label>舱位价格</label>
                  <el-input v-model="item.cabinPrice"></el-input>
                </el-form-item>
              </el-form-item>
            </div>
          </div>
        </el-form>
        <h4>私有运价：</h4>
        <el-form ref="fromSegmentList" :model="privarcCabins">
          <div class="row" v-if="tripType == 1">
            <!-- 动态加载表单 -->
            <el-form-item class="col-md-2">
              <label>舱位</label>
              <el-input v-model="privarcCabins[0].cabinName"></el-input>
            </el-form-item>
            <el-form-item class="col-md-2">
              <label>数量</label>
              <el-input v-model="privarcCabins[0].count"></el-input>
            </el-form-item>
            <el-form-item class="col-md-2">
              <label>成人税</label>
              <el-input v-model="privarcCabins[0].adultTax"></el-input>
            </el-form-item>
            <el-form-item class="col-md-2">
              <label>儿童税</label>
              <el-input v-model="privarcCabins[0].childTax"></el-input>
            </el-form-item>
            <el-form-item class="col-md-2">
              <label>舱位价格</label>
              <el-input v-model="privarcCabins[0].cabinPrice"></el-input>
            </el-form-item>
            <el-form-item>
              <button class="btn btn-small col-md-1">删除</button>
              <button
                class="btn btn-small col-md-1"
                @click="addItem"
                style="clear:right"
              >
                添加
              </button>
            </el-form-item>
          </div>
          <div
            v-for="(item, index) in privarcCabins"
            v-if="index >= 1 && tripType == 1"
            :key="index"
            class="row"
          >
            <el-form-item
              class="col-md-2"
              :prop="'params.' + index + 'paramName'"
            >
              <label>舱位</label>
              <el-input v-model="item.cabinName"></el-input>
            </el-form-item>
            <el-form-item
              class="col-md-2"
              :prop="'params.' + index + '.paramValue'"
            >
              <label>数量</label>
              <el-input v-model="item.count"></el-input> </el-form-item
            ><el-form-item>
              <el-form-item
                class="col-md-2"
                :prop="'params.' + index + 'paramName'"
              >
                <label>成人税</label>
                <el-input v-model="item.adultTax"></el-input>
              </el-form-item>
              <el-form-item
                class="col-md-2"
                :prop="'params.' + index + 'paramName'"
              >
                <label>儿童税</label>
                <el-input v-model="item.childTax"></el-input>
              </el-form-item>
              <el-form-item
                class="col-md-2"
                :prop="'params.' + index + 'paramName'"
              >
                <label>舱位价格</label>
                <el-input v-model="item.cabinPrice"></el-input>
              </el-form-item>
              <button
                class="btn btn-small col-md-1"
                @click="deleteItem(item, index)"
              >
                删除
              </button>
              <button class="btn btn-small col-md-1" @click="addItem">
                添加
              </button>
            </el-form-item>
          </div>
        </el-form>
      </el-form>
    </div>
    <!-- 往返直飞的返程航班 -->
    <hr style="border-color:blank !important" />
    <div v-if="tripType == 3 || tripType == 4" class="mt-3">
      <h4>返程航班：</h4>
      <div>
        <el-form :model="retSegmentList">
          <div class="row">
            <el-form-item>
              <div class="from-group col-md-2">
                <label>航司</label>
                <input
                  type="text"
                  v-model="retSegmentList[0].carrier"
                  class=" form-control"
                  placeholder="SQ"
                />
              </div>
            </el-form-item>
            <el-form-item>
              <div class="from-group col-md-2">
                <label>出发时间</label>
                <el-date-picker
                  type="date"
                  v-model="retSegmentList[0].depTime"
                ></el-date-picker>
              </div>
            </el-form-item>
            <el-form-item>
              <div class="from-group col-md-2">
                <label>到达时间</label>
                <el-date-picker
                  type="date"
                  v-model="retSegmentList[0].arrTime"
                ></el-date-picker>
              </div>
            </el-form-item>
            <el-form-item>
              <div class="from-group col-md-2">
                <label>出发机场</label>
                <input
                  type="text"
                  class=" form-control"
                  v-model="retSegmentList[0].depAirport"
                  placeholder="SQ"
                />
              </div>
            </el-form-item>
            <el-form-item>
              <div class="from-group col-md-1">
                <label>到达机场</label>
                <input
                  type="text"
                  class=" form-control"
                  v-model="retSegmentList[0].arrAirport"
                  placeholder="SQ"
                />
              </div>
            </el-form-item>
            <el-form-item>
              <div class="from-group col-md-1">
                <label>航班号</label>
                <input
                  type="text"
                  class=" form-control"
                  v-model="retSegmentList[0].flightNumber"
                  placeholder="SQ"
                />
              </div>
            </el-form-item>
            <div v-if="tripType != 1">
              <button
                class="btn btn-small col-md-1"
                @click="delect_back(item, index)"
              >
                删除
              </button>
              <button class="btn btn-small col-md-1" @click="addSelect_back">
                增加
              </button>
            </div>
            <div
              v-for="(item, index) in retSegmentList"
              v-if="index >= 1"
              :key="index"
              class="row"
            >
              <el-form-item class="col-md-2">
                <label>航司</label>
                <el-input v-model="item.carrier"></el-input>
              </el-form-item>
              <el-form-item class="col-md-2">
                <label>出发时间</label>
                <el-date-picker
                  type="date"
                  v-model="item.depTime"
                ></el-date-picker> </el-form-item
              ><el-form-item>
                <el-form-item class="col-md-2">
                  <label>到达时间</label>
                  <el-date-picker
                    type="date"
                    v-model="item.arrTime"
                  ></el-date-picker>
                </el-form-item>
                <el-form-item class="col-md-2">
                  <label>出发机场</label>
                  <input
                    type="text"
                    class=" form-control"
                    v-model="item.depAirport"
                    placeholder="SQ"
                  />
                </el-form-item>
                <el-form-item class="col-md-1">
                  <label>到达机场</label>
                  <input
                    type="text"
                    class=" form-control"
                    v-model="item.arrAirport"
                    placeholder="SQ"
                  />
                </el-form-item>
                <el-form-item>
                  <div class="from-group col-md-1">
                    <label>航班号</label>
                    <input
                      type="text"
                      class=" form-control"
                      v-model="item.flightNumber"
                      placeholder="SQ"
                    />
                  </div>
                </el-form-item>
                <button
                  class="btn btn-small col-md-1"
                  @click="delect_back(item, index)"
                >
                  删除
                </button>
                <button class="btn btn-small col-md-1" @click="addSelect_back">
                  添加
                </button>
              </el-form-item>
            </div>
          </div>

          <h4>公有运价：</h4>
          <el-form :model="publicCabins_back">
            <div class="row">
              <div class="form-group col-md-1">
                <label>舱位：</label>
                <input
                  type="text"
                  class="form-control"
                  v-model="publicCabins_back[0].cabinName"
                />
              </div>
              <div class="form-group col-md-1">
                <label>数量：</label>
                <input
                  type="text"
                  class="form-control"
                  v-model="publicCabins_back[0].count"
                />
              </div>
              <div class="form-group col-md-1">
                <label>成人税：</label>
                <input
                  type="text"
                  class="form-control"
                  v-model="publicCabins_back[0].adultIax"
                />
              </div>
              <div class="form-group col-md-1">
                <label>儿童税：</label>
                <input
                  type="text"
                  class="form-control"
                  v-model="publicCabins_back[0].childTax"
                />
              </div>
              <div class="form-group col-md-1">
                <label>舱位价格：</label>
                <input
                  type="text"
                  class="form-control"
                  v-model="publicCabins_back[0].cabinPrice"
                />
              </div>
              <div
                v-for="(item, index) in publicCabins_back"
                v-if="index >= 1"
                :key="index"
                class="row"
              >
                <div class="col-md-2">
                  <p></p>
                </div>
                <el-form-item class="col-md-2">
                  <label>舱位</label>
                  <el-input v-model="item.cabinName"></el-input>
                </el-form-item>
                <el-form-item class="col-md-2">
                  <label>数量</label>
                  <el-input v-model="item.count"></el-input> </el-form-item
                ><el-form-item>
                  <el-form-item class="col-md-2">
                    <label>成人税</label>
                    <el-input v-model="item.adultTax"></el-input>
                  </el-form-item>
                  <el-form-item class="col-md-2">
                    <label>儿童税</label>
                    <el-input v-model="item.childTax"></el-input>
                  </el-form-item>
                  <el-form-item class="col-md-2">
                    <label>舱位价格</label>
                    <el-input v-model="item.cabinPrice"></el-input>
                  </el-form-item>
                </el-form-item>
              </div>
            </div>
          </el-form>
        </el-form>
      </div>
    </div>
    <button class="btn btn-small col-md-1" @click="submit">
      提交
    </button>
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
      depCity: "",
      arrCity: "",
      tripType: 1,
      fareType: 1,
      status: 0,
      fromSegmentList: [
        {
          carrier: "",
          arrTime: "",
          depTime: "",
          depAirport: "",
          arrAirport: "",
          flightNumber: "",
        },
      ],
      retSegmentList: [
        {
          carrier: "",
          arrTime: "",
          depTime: "",
          depAirport: "",
          arrAirport: "",
          flightNumber: "",
        },
      ],
      publicCabins_go: [
        {
          count: 5,
          cabinName: "",
          cabinPrice: 600,
          adultTax: 300,
          childTax: 100,
        },
      ],
      publicCabins_back: [
        {
          count: 5,
          cabinName: "",
          cabinPrice: 600,
          adultTax: 300,
          childTax: 100,
        },
      ],
      privarcCabins: [
        {
          count: 5,
          cabinName: "",
          cabinPrice: 600,
          adultTax: 300,
          childTax: 100,
        },
      ],
      routingData: {
        depCity: "",
        arrCity: "",
        tripType: 0,
        fareType: 0,
        status: 0,
        fromSegmentList: [
          {
            carrier: "",
            arrTime: "",
            depTime: "",
            depAirport: "",
            arrAirport: "",
            flightNumber: "",
            publicCabins: [],
            privarcCabins: [],
          },
        ],
        retSegmentList: [
          {
            carrier: "",
            arrTime: "",
            depTime: "",
            depAirport: "",
            arrAirport: "",
            flightNumber: "",
            publicCabins: [],
            privarcCabins: [],
          },
        ],
      },
    };
  },

  mounted() {
    console.log("111");
    let id = this.$route.query.id;
    this.axios.get("/privateFare/selectRoutingById/" + id).then((res) => {
      // 出发机场
      this.depCity = res.data.depCity;
      // 到达机场
      this.fromSegmentList[0].arrAirport =
        res.data.fromSegmentList[0].arrAirport;
      // 航司
      this.fromSegmentList[0].carrier = res.data.fromSegmentList[0].carrier;
      // 航班号
      this.fromSegmentList[0].flightNumber =
        res.data.fromSegmentList[0].flightNumber;
    });
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

    // 添加单程直飞表单
    addItem() {
      this.fromSegmentList.push({
        carrier: "",
        arrTime: "",
        depTime: "",
        depAirport: "",
        arrAirport: "",
        flightNumber: "",
      });
      this.privarcCabins.push({
        count: 5,
        cabinName: "",
        cabinPrice: 600,
        adultTax: 300,
        childTax: 100,
      });
    }, // 删除单程直飞表单
    deleteItem(item, index) {
      this.fromSegmentList.splice(index, 1);
      this.privarcCabins.splice(index, 1);
    },
    // 添加单程中转的航班
    addSelect() {
      this.fromSegmentList.push({
        carrier: "",
        arrTime: "",
        depTime: "",
        depAirport: "",
        arrAirport: "",
        flightNumber: "",
      });

      this.publicCabins_go.push({
        count: 5,
        cabinName: "",
        cabinPrice: 600,
        adultTax: 300,
        childTax: 100,
      });
    },
    // 删除单程中转表单
    deleteSelect(item, index) {
      this.fromSegmentList.splice(index, 1);

      this.publicCabins_go.splice(index, 1);
    },
    // 添加往返直飞
    addSelect_back() {
      this.retSegmentList.push({
        carrier: "",
        arrTime: "",
        depTime: "",
        depAirport: "",
        arrAirport: "",
        flightNumber: "",
      });
      this.publicCabins_back.push({
        count: 5,
        cabinName: "",
        cabinPrice: 600,
        adultTax: 300,
        childTax: 100,
      });
    },
    // 删除返程的表单
    delect_back(item, index) {
      this.retSegmentList.splice(index, 1);
      this.publicCabins_back.splice(index, 1);
    },

    // 表单提交
    async submit() {
      this.routingData.depCity = this.depCity;
      this.routingData.arrCity = this.arrCity;
      this.routingData.tripType = this.tripType;
      this.routingData.fareType = this.fareType;
      this.routingData.status = this.status;
      this.routingData.fromSegmentList = this.fromSegmentList;
      this.routingData.retSegmentList = this.retSegmentList;
      // this.routingData.fromSegmentList[0].depAirport = this.fromSegmentList[0].depAirport;
      // alert(JSON.stringify(this.routingData.fromSegmentList))

      // if (this.routingData.tripType == 1) {
      //   this.routingData.fromSegmentList[0].publicCabins = this.publicCabins;
      //   this.routingData.fromSegmentList[0].privarcCabins = this.privarcCabins;
      // } else if (this.routingData.tripType == 2) {
      //   this.routingData.fromSegmentList[0].publicCabins = this.publicCabins;
      //   this.routingData.fromSegmentList[0].privarcCabins = this.privarcCabins;
      // } else if (this.routingData.tripType == 3) {
      //   alert("只要一条公有运价，禁掉private");
      //   this.routingData.fromSegmentList[0].publicCabins = this.publicCabins;
      //   this.routingData.fromSegmentList[0].privarcCabins = this.privarcCabins;
      //   this.routingData.retSegmentList[0].publicCabins = this.publicCabins;
      // } else if (this.routingData.tripType == 4) {
      //   this.routingData.fromSegmentList[0].publicCabins = this.publicCabins;
      //   this.routingData.fromSegmentList[0].privarcCabins = this.privarcCabins;
      //   this.routingData.retSegmentList[0].publicCabins = this.publicCabins;
      // }

      this.routingData.fromSegmentList[0].publicCabins_go = this.publicCabins_go;
      this.routingData.fromSegmentList[0].publicCabins_back = this.publicCabins_back;
      this.routingData.fromSegmentList[0].privarcCabins = this.privarcCabins;
      // alert("插入航班数据");
      console.log(JSON.stringify(this.routingData.fromSegmentList));
      let rep = await this.axios.post(
        "/privateFare/addRouting",
        this.routingData
      );
      if (rep.code == 0) {
        alert(rep.message);
      }
    },
  },
};
</script>

<style scope>
.btn,
.navbar .navbar-nav > li > a.btn {
  margin: 20px 0;
}
.show {
  display: none !important;
}
</style>
