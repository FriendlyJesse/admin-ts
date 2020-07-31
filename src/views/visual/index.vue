<template>
  <section class="visual">
    <div class="visual__header">
      <div class="logo">
        <a href="/">
          <img
            src="@/assets/logo.png"
            alt="logo"
          >
        </a>
        <span class="title">全网攻击实时可视化图</span>
        <span
          class="toogle"
          @click="country = country == '中国' ? '世界' : '中国'"
        >{{ country }}</span>
      </div>
      <div class="attack">
        <el-row>
          <el-col :span="12">
            <h4 class="sub-title">
              今日攻击次数
            </h4>
            <div><span class="num">{{ baseInfo.protect_total }}</span><span class="unit">次</span></div>
          </el-col>
          <el-col :span="12">
            <h4 class="sub-title">
              今日攻击IP
            </h4>
            <div><span class="num">{{ baseInfo.protect_ip_num }}</span><span class="unit">个</span></div>
          </el-col>
        </el-row>
      </div>
    </div>
    <div class="visual__main">
      <div
        class="box attack-source"
        :class="{active: attackSourceTurn}"
      >
        <div class="sub-title">
          攻击来源
        </div>
        <div class="list">
          <ul
            class="infinite-list"
          >
            <li
              v-for="item in baseInfo.region"
              :key="item.key"
              class="infinite-list-item"
            >
              <div>{{ item.key }}</div>
              <div>{{ item.val }} 次</div>
            </li>
          </ul>
        </div>
        <div
          class="turn"
          @click="attackSourceTurn = !attackSourceTurn"
        >
          <i class="el-icon-d-arrow-left" />
        </div>
      </div>
      <div
        class="box subject-attack"
        :class="{active: subjectAttackTurn}"
      >
        <div class="sub-title">
          受攻击对象
        </div>
        <div class="list">
          <ul
            class="infinite-list"
          >
            <li
              v-for="item in baseInfo.site"
              :key="item.key"
              class="infinite-list-item"
            >
              <div>{{ item.key }}</div>
              <div>{{ item.val }} 次</div>
            </li>
          </ul>
        </div>
        <div
          class="turn"
          @click="subjectAttackTurn = !subjectAttackTurn"
        >
          <i class="el-icon-d-arrow-left" />
        </div>
      </div>
      <div
        class="box attack-defense"
        :class="{active: attackDefenseTurn}"
      >
        <el-row>
          <el-col :span="4">
            <div class="sub-title">
              实时攻防详情
            </div>
          </el-col>
          <el-col :span="20">
            <el-table
              :data="traceLog"
              max-height="230"
            >
              <el-table-column
                fixed
                prop="ip"
                label="攻击IP（归属地）"
                width="180"
              />
              <el-table-column
                fixed
                prop="attack_type"
                label="攻击类型"
                width="180"
              />
              <el-table-column
                fixed
                prop="url"
                label="被攻击URL"
              />
              <el-table-column
                fixed
                prop="user_agent"
                label="攻击UserAgent"
              />
            </el-table>
          </el-col>
        </el-row>
        <div
          class="turn"
          @click="attackDefenseTurn = !attackDefenseTurn"
        >
          <i class="el-icon-d-arrow-left" />
        </div>
      </div>
      <div class="box trend">
        <el-collapse
          v-model="activeName"
          accordion
        >
          <el-collapse-item
            class="1"
            title="24小时攻击次数趋势"
            name="1"
          >
            <div class="list">
              <ul class="infinite-list">
                <li
                  v-for="item in traceChart.pv"
                  :key="item.key"
                  class="infinite-list-item"
                >
                  <div>相距{{ item.key }}小时</div>
                  <div>{{ item.val }} 次</div>
                </li>
              </ul>
            </div>
          </el-collapse-item>
          <el-collapse-item
            title="24小时攻击次数趋势"
            name="2"
          >
            <div class="list">
              <ul class="infinite-list">
                <li
                  v-for="item in traceChart.region"
                  :key="item.key"
                  class="infinite-list-item"
                >
                  <div>{{ item.key }}</div>
                  <div>{{ item.val }} 次</div>
                </li>
              </ul>
            </div>
          </el-collapse-item>
          <el-collapse-item
            title="攻击UserAgent"
            name="3"
          >
            <div class="list">
              <ul class="infinite-list">
                <li
                  v-for="item in traceChart.ua"
                  :key="item.key"
                  class="infinite-list-item"
                >
                  <div>{{ item.key }}</div>
                  <div>{{ item.val }} 次</div>
                </li>
              </ul>
            </div>
          </el-collapse-item>
        </el-collapse>
      </div>

      <visual-map ref="visualMap" />
    </div>
  </section>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
import VisualMap from './components/VisualMap.vue'
import chinaData from './data/chinaData'
import worldData from './data/worldData'

@Component({
  components: {
    VisualMap
  }
})
export default class Visual extends Vue {

  activeName = '1'
  attackSourceTurn = false
  subjectAttackTurn = false
  attackDefenseTurn = false

  country = '中国'
  baseInfo = {}
  traceChart = {}
  traceLog: Array<object> = []

  @Watch('country')
  onCountryChange (newVal: string) {
    if (newVal === '中国') {
      this.baseInfo = chinaData.traceInfo.data
      this.traceChart = chinaData.traceChart.data
      this.traceLog = chinaData.traceLog.data.items;
      (this.$refs.visualMap as any).setData(chinaData.traceRegion.data)
    } else {
      this.baseInfo = worldData.traceInfo.data
      this.traceChart = worldData.traceChart.data
      this.traceLog = worldData.traceLog.data.items;
      (this.$refs.visualMap as any).setData(worldData.traceRegion.data)
    }
    // this.getTraceInfo()
    // this.getTraceChart()
    // this.getTraceLog()
    // this.getTraceRegion()
  }


  private created () {
    (document.documentElement as any).webkitRequestFullScreen()
  }

  private mounted () {
    this.baseInfo = chinaData.traceInfo.data
    this.traceChart = chinaData.traceChart.data
    this.traceLog = chinaData.traceLog.data.items;
    (this.$refs.visualMap as any).setData(chinaData.traceRegion.data)
  }

  // private async getTraceInfo () { // 基础信息
  //   const res = await this.$api.Web.getTraceInfo({country: this.country})
  //   if (res.code === 1) {
  //     this.baseInfo = res.data
  //   }
  // }

  // private async getTraceChart () { // 排名
  //   const res = await this.$api.Web.getTraceChart({country: this.country})
  //   if (res.code === 1) {
  //     this.traceChart = res.data
  //   }
  // }

  // private async getTraceLog () { // 实时攻防详情
  //   const res = await this.$api.Web.getTraceLog({country: this.country})
  //   if (res.code === 1) {
  //     this.traceLog = res.data.items
  //   }
  // }

  // private async getTraceRegion () {
  //   const res = await this.$api.Web.traceRegion({country: this.country})
  //   if (res.code === 1) {
  //     (this.$refs.visualMap as any).setData(res.data)
  //   }
  // }

}
</script>

<style lang="scss" scoped>
::v-deep ::-webkit-scrollbar {
  background: #181626;
}
::v-deep ::-webkit-scrollbar-thumb {
  background: #3FA5F9;
}
.visual {
  position: absolute;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background: #161E26;

  .sub-title {
    position: relative;
    margin: 0;
    font-size: 16px;
    color: #fff;
    font-weight: bold;
  }
  .list {
    margin: 30px auto;
    height: calc(100% - 60px);
    overflow: auto;
    ul, li {
      list-style: none;
      padding: 0;
      margin: 0;
      text-align: center;
    }
    .infinite-list-item {
      padding: 0 20px;
      margin-top: 20px;
      display: flex;
      justify-content: space-between;
      font-size: 12px;
    }
  }
  .el-collapse-item__content {
    .list {
      margin: 0;
      height: 120px;
    }
  }
  .num {
    font-size: 40px;
    color: #3FA6FB;
    vertical-align: sub;
    margin-right: 5px;
  }
  .unit {
    font-size: 20px;
    color: #fff;
  }
  .turn {
    position: absolute;
    right: 8px;
    top: 50%;
    padding: 10px;
    z-index: 999;
    cursor: pointer;
    transform: translateY(-50%);
    i {
      color: #3FA6FA;
    }
  }
  .box {
    position: absolute;
    z-index: 10;
    color: #fff;
    text-align: left;
    padding: 30px 40px 30px 30px;
    box-sizing: border-box;
    transition: .5s;
    border: 2px solid rgba(63,166,251,.2);
  }

  &__header {
    display: flex;
    height: 120px;
    padding-left: 36px;
    align-items: center;
    justify-content: space-between;

    .logo {
      display: flex;
      align-items: center;
      img {
        width: 164px;
        height: 36px;
      }
      span {
        font-size: 16px;
        color: #fff;
        &.title {
          margin: 0 26px;
        }
        &.toogle {
          cursor: pointer;
          color: #40A8FE;
        }
      }
    }
    .attack {
      width:513px;
      height:120px;
      text-align: center;
      background:linear-gradient(90deg,rgba(63,166,251,.2) 0%,rgba(63,165,249,0) 100%);
      .sub-title {
        margin: 24px 0 0;
      }
    }
  }
  &__main {
    .attack-source {
      left: 0;
      bottom: 344px;
      width: 340px;
      height: 440px;
    }
    .subject-attack {
      left: 0;
      bottom: 32px;
      width: 340px;
      height: 275px;
    }
    .attack-source, .subject-attack {
      &.active {
        transform: translateX(-300px);
        .turn {
          i {
            transform: rotate(-180deg);
          }
        }
      }
    }
    .attack-defense {
      position: absolute;
      bottom: 32px;
      left: 50%;
      height: 275px;
      width: 60%;
      transform: translateX(-50%);
      &.active {
        transform: translateX(-50%) translateY(275px);
        .turn {
          i {
            transform: rotate(90deg);
          }
        }
      }
      .turn {
        top: auto;
        right: auto;
        left: 50%;
        top: 0;
        transform: translateX(-50%);
        i {
          transform: rotate(-90deg);
        }
      }
    }
    .trend {
      border: none;
      right: 0;
      bottom: 344px;
      width: 328px;
      ::v-deep .el-collapse {
        border-color: transparent;
        & * {
          background: none;
          border-color: transparent;
          color: #fff;
        }
        .el-collapse-item {
          margin-top: 10px;
          padding: 5px;
          border: 2px solid rgba(63,166,251,.2);
          .el-collapse-item__arrow {
            color: #3FA6FA;
          }
        }
      }
    }
  }
}

::v-deep .el-table {
  margin-top: -15px;
  color: #fff;
  background-color: transparent;
  &::before, .el-table__fixed::before {
    display: none;
  }
  * {
    background-color: transparent;
  }
  tr:hover > td, .el-table__body tr.hover-row > td {
    background-color: transparent;
  }
  th {
    font-weight: normal;
    color: #fff;
  }
  th.is-leaf, td {
    border-bottom: none;
  }
}
</style>