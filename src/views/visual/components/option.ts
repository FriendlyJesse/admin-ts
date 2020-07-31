export default {
  backgroundColor: '',
  tooltip: {
    trigger: 'item'
  },
  geo: {
    map: 'china',
    zoom: 1,
    label: {
      emphasis: {
        show: false
      }
    },
    roam: true,
    itemStyle: {
      normal: {
        borderColor: 'rgba(147, 235, 248, 1)',
        borderWidth: 1,
        areaColor: {
          type: 'radial',
          x: 0.5,
          y: 0.5,
          r: 0.8,
          colorStops: [
            {
              offset: 0,
              color: 'rgba(147, 235, 248, 0)' // 0% 处的颜色
            },
            {
              offset: 1,
              color: 'rgba(147, 235, 248, .2)' // 100% 处的颜色
            }
          ],
          globalCoord: false // 缺省为 false
        },
        shadowColor: 'rgba(128, 217, 248, 1)',
        // shadowColor: 'rgba(255, 255, 255, 1)',
        shadowOffsetX: -2,
        shadowOffsetY: 2,
        shadowBlur: 10
      },
      emphasis: {
        areaColor: '#389BB7',
        borderWidth: 0
      }
    }
  },
  series: [
    // {
    //   type: "effectScatter",
    //   coordinateSystem: "geo",
    //   zlevel: 4,
    //   symbolSize: 30,
    //   label: {
    //     normal: {
    //       show: true,
    //       position: "right",
    //       formatter: "{b}",
    //       color: "white"
    //     }
    //   },
    //   itemStyle: {
    //     normal: {
    //       color: "#c9b972"
    //     }
    //   },
    //   rippleEffect: {
    //     scale: 10,
    //     brushType: "stroke"
    //   },
    //   data: [
    //     {
    //       name: "美克总部",
    //       value: [87.568283, 43.857571],
    //       visualMap: false
    //     }
    //   ]
    // }
  ]
}