<template>
  <section class="charts">
    <div>
      <h2>折线图</h2>
      <com-chart
        ref="trafficChart"
        :data-option="statusOption"
      />
    </div>
    <div>
      <h2>世界地图切换</h2>
      <world-map
        ref="worldMap"
        :country.sync="formData.country"
      />
    </div>
  </section>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
import ComChart from '@/components/ComChart/index.vue'
import statusOption from '@/components/ComChart/domainStatusOption'
import WorldMap from '@/components/ComWordMap/index.vue'
import comChartData from './data/comChartData'
import chinaChartData from './data/chinaChartData'
import worldChartData from './data/worldChartData'

@Component({
  components: {
    ComChart,
    WorldMap
  }
})
export default class Charts extends Vue {

  private statusOption = statusOption

  protected formData = {
    country: '中国'
  }

  @Watch('formData', { deep: true })
  onFormChange (newVal: any) {
    this.setWorld(newVal.country)
  }

  private mounted () {
    this.setComChart()
    this.setWorld()
  }

  private setComChart () {
    const xAxisData: Array<string> = []
    const seriesData: Array<object> = []
    const pv: Array<number> = []
    const qps: Array<number> = []
    comChartData.data.items.forEach((el: any) => {
      xAxisData.push(el.time)
      pv.push(el.pv)
      qps.push(el.qps)
    });

    [ { name: '总访问量', data: pv, color: '#5C8BFB' }, { name: '请求并发', data: qps, color: '#63B7FC' } ].forEach((item: any) => {
      seriesData.push({
        name: item.name,
        data: item.data,
        type: 'line',
        smooth: true,
        itemStyle:{
          color: item.color // 折点颜色
        },
        lineStyle:{
          color: item.color // 折线颜色
        }
      })
    });
    (this.$refs.trafficChart as any).setData(xAxisData, seriesData)
  }

  private setWorld (country?: string) {
    if (country === '世界') {
      worldChartData.data.items.map((v: any) => {v.name = v.key; v.value = v.val});
      (this.$refs.worldMap as any).setData(worldChartData.data)
    } else {
      chinaChartData.data.items.map((v: any) => {v.name = v.key; v.value = v.val});
      (this.$refs.worldMap as any).setData(chinaChartData.data)
    }

  }

}
</script>