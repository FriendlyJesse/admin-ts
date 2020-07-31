<template>
  <section class="worldMap">
    <el-row type="flex">
      <el-col :span="12">
        <div
          ref="chart"
          style="height: 350px"
        />
      </el-col>
      <el-col :span="12">
        <div class="aside">
          <div class="toogle">
            <el-select
              v-model="selectedVal"
              placeholder="请选择"
            >
              <el-option
                v-for="item in selecteOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </div>

          <h2 class="title">
            {{ seriesData.country }}分布
          </h2>
          <el-table
            :data="seriesData.items"
            style="width: 100%"
            max-height="240px"
          >
            <el-table-column
              prop="name"
              :label="seriesData.country === '中国' ? '省份' : '国家'"
              width="250"
            />
            <el-table-column
              sort
              prop="value"
              align="center"
              label="攻击次数"
            />
            <el-table-column
              prop="percent"
              align="center"
              sort
              :formatter="(ow, column, cellValue) => `${cellValue}%`"
              label="占比"
            />
          </el-table>
        </div>
      </el-col>
    </el-row>
  </section>
</template>

<script lang="ts">
import { Component, Vue, PropSync } from 'vue-property-decorator'
import echarts from 'echarts'
import option from './option'

@Component
export default class WorldMap extends Vue {
  @PropSync('country') selectedVal!: string

  chart: any = {}
  option: any = {}

  selecteOptions = [
    {
      value: '世界',
      label: '世界地图'
    },
    {
      value: '中国',
      label: '中国地图'
    }
  ]
  seriesData: any = {}

  private created () {
    this.init()
  }

  private init () {
    this.option = option
  }

  private mounted () {
    this.chart = echarts.init(this.$refs.chart)
    // this.chart.on("click", (params: any) => {
    //   console.log(params);
    //   if (params.name === "中国") {
    //     this.chart.setOption(CHINA_OPTION, true)
    //   }
    // })
  }

  public setData (seriesData: any) {
    this.seriesData = seriesData
    if (seriesData.country === '中国') {
      this.option.series[0].name = '中国地图'
      this.option.series[0].mapType = 'china'
    } else {
      this.option.series[0].name = '世界地图'
      this.option.series[0].mapType = 'world'
    }
    this.option.series[0].data = seriesData.items
    this.onRender()
  }

  private onRender (): void {
    this.chart.setOption(this.option, true)
  }
}
</script>

<style lang="scss" scoped>
.worldMap {
  .toogle {
    text-align: right;
    .el-select {
      top: -20px;
    }
  }
  .title {
    margin: 0;
    box-sizing: border-box;
    height: 58px;
    line-height: 58px;
    text-indent: 20px;
    text-align: left;
    font-weight: normal;
    background: #F0F8FF;
    color: #333333;
    font-size: 16px;
  }
  ::v-deep .el-table th, ::v-deep .el-table td {
    height: 58px;
  }
  ::v-deep .el-table th > .cell {
    font-size: 14px;
    color: #333333;
    font-weight: normal;
  }
}
</style>