<template>
  <section class="visual-map">
    <div
      ref="chart"
      style="width:882px; height:740px; margin: auto"
    />
  </section>
</template>


<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import echarts from 'echarts'
import allCity from './allCity'
import option from './option'

@Component
export default class VisualMap extends Vue {

  private chart: any = {}
  private option: any = {}

  private created () {
    this.init()
  }

  private mounted () {
    this.chart = echarts.init(this.$refs.chart)
  }

  private init () {
    this.option = option
  }

  public setData (seriesData: any) {
    if (seriesData.country === '中国') {
      this.option.geo.map = 'china'
    } else {
      this.option.geo.map = 'world'
    }

    // 绘制已经起飞完成的线
    const series: Array<object> = []
    this.cityRender(seriesData.items, series)
    this.lineRender(seriesData.items, series)
    this.option.series = series
    this.onRender()
  }

  private cityRender (items: Array<object>, series: Array<object>) { // 绘制城市
    // 区域去重
    const city: Set<string> = new Set()
    items.forEach((item: any) => {
      city.add(item.from.trim())
      city.add(item.to.trim())
    })

    city.forEach((item: any) => {
      const cityOption: any = allCity.find((v: any) => v.name === item)
      if (!cityOption) {
        console.log(`${item}：绘制城市-此项不存在`)
        return
      }
      series.push({
        type: 'effectScatter',
        coordinateSystem: 'geo',
        zlevel: 4,
        symbolSize: 10,
        rippleEffect: {
          scale: 10,
          brushType: 'stroke'
        },
        // itemStyle: { // 扩散颜色
        //   normal: {
        //       color: {
        //         colorStops: [
        //           {
        //             offset: 0,
        //             color: cityOption.color
        //           }
        //         ]
        //     }
        //   }
        // },
        data: [
          {
            name: cityOption.name,
            value: cityOption.coords,
            visualMap: false
          }
        ]
      })
    })
  }

  private lineRender (items: Array<object>, series: Array<object>) { // 绘制线路
    // 绘制已经起飞完成的线
    items.forEach((item: any) => {
      const fromCity: any = allCity.find((v: any) => v.name === item.from.trim())
      const toCity: any = allCity.find((v: any) => v.name === item.to.trim())

      if (!fromCity) {
        console.log(`${item.from}：绘制线路-此项不存在`)
        return
      }
      if (!toCity) {
        console.log(`${item.to}：绘制线路-此项不存在`)
        return
      }

      series.push({
        name: item.to_name + ': ' + item.value + '次',
        type: 'lines',
        zlevel: 2,
        effect: {
          show: true,
          period: 4, // 箭头指向速度，值越小速度越快
          trailLength: 0.02, // 特效尾迹长度[0,1]值越大，尾迹越长重
          symbol: 'arrow', // 箭头图标
          symbolSize: 5, // 图标大小
        },
        lineStyle: {
          normal: {
            // color: fromCity.color,
            width: 2,
            opacity: 0.4,
            curveness: -0.2
          }
        },
        data: [
          {
            fromName: item.from,
            toName: item.to,
            coords: [fromCity.coords, toCity.coords]
          }
        ]
      })
    })
  }

  private onRender () {
    this.chart.setOption(this.option, true)
  }

}
</script>