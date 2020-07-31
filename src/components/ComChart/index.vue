<template>
  <section class="charts">
    <div
      ref="chart"
      style="height: 400px"
    />
  </section>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import echarts from 'echarts'

@Component
export default class Chart extends Vue {

  @Prop() dataOption!: string

  private chart: any = {}
  private option: any = {}

  private created () {
    this.init()
  }

  private init () { // 初始化 option
    this.option = this.dataOption
  }

  private mounted (): void {
    this.chart = echarts.init(this.$refs.chart)
  }

  public setData (xAxisData: Array<string> | Array<number>, seriesData: Array<object>): void {
    this.option.xAxis.data = xAxisData
    this.option.series = seriesData
    this.onRender()
  }

  private onRender (): void {
    this.chart.setOption(this.option, true)
  }
}
</script>