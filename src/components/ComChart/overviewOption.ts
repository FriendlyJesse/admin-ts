export default {
  tooltip: {   // 鼠标悬浮框的提示文字
    trigger: 'axis',
    formatter: function (params: any) {   // 格式化函数
      let str = '<div><p>' + params[0].name.split('[')[0] + '<p></div>'
      for (let i = 0; i < params.length; i++) {
        let text = ''
        if((params[i].data / (1024 * 1024 * 1024)) > 10) {
          text = (params[i].data / (1024 * 1024 * 1024)).toFixed(2) + ' Gbps'
        }else if((params[i].data / (1024 * 1024)) > 10) {
          text = (params[i].data / (1024 * 1024)).toFixed(2) + ' Mbps'
        }else if((params[i].data / (1024)) > 10) {
          text = (params[i].data / (1024)).toFixed(2) + ' Kbps'
        }else{
          text = params[0].data + ' bps'
        }
        str += params[i].marker + ' ' + params[i].seriesName + ': ' + text + '<br>'
      }
      return str
    }
  },
  xAxis: {
    type: 'category',
    axisLine: {show: false}, // 去掉轴线
    axisTick: {show:false}, // 去掉刻度
  },
  yAxis: {
    type: 'value',
    axisLine: {show: false}, // 去掉轴线
    axisTick: {show:false}, // 去掉刻度
    axisLabel: {
      formatter: function (value: any) {
        if((value / (1024 * 1024 * 1024)) > 10) {
          return (value / (1024 * 1024 * 1024)).toFixed(2) + ' Gbps'
        }else if((value / (1024 * 1024)) > 10) {
          return (value / (1024 * 1024)).toFixed(2) + ' Mbps'
        }else if((value / (1024)) > 10) {
          return (value / (1024)).toFixed(2) + ' Kbps'
        }else{
          return value + ' bps'
        }
      }
    }
  },
  dataZoom: [{
    type: 'slider',
    show: true,
    start: 0,
    end: 50,
    handleSize: 8
  },
  {
    type: 'inside',
    start: 0,
    end: 50
  }
  ],
  series: [
    {
      name: '流量',
      data: [0, 100, 300, 150, 500, 100, 500],
      type: 'line',
      smooth: true,
      itemStyle:{
        color:'#3FA6FB', // 折点颜色
      },
      lineStyle:{
        color:'#63B7FC' // 折线颜色
      }
    }
  ]
}