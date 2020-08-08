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
  grid: {
    left: '0',
    right: '20%',
    containLabel: true
  },
  legend: {
    orient: 'vertical',
    top: '30%',
    right: '0'
  },
  xAxis: {
    type: 'category',
    axisLine: { show: false }, // 去掉轴线
    axisTick: { show:false }, // 去掉刻度
    data: [ '14:30', '14:45', '15:00', '15:15', '15:30', '15:45', '16:00' ]
  },
  yAxis: {
    type: 'value',
    axisLine: { show: false }, // 去掉轴线
    axisTick: { show:false }, // 去掉刻度
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
  dataZoom: [ {
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
      name: '回源流量',
      data: [ 0, .5, .6, .8, .1, .3, .6 ],
      type: 'line',
      smooth: true,
      itemStyle:{
        color:'#63B7FC', // 折点颜色
      },
      lineStyle:{
        color:'#63B7FC' // 折线颜色
      }
    },
    {
      name: '命中缓存流量',
      data: [ 0, .8, .8, .6, .5, .1, .6 ],
      type: 'line',
      smooth: true,
      itemStyle:{
        color:'#999999', // 折点颜色
      },
      lineStyle:{
        color:'#999999' // 折线颜色
      }
    },
    {
      name: '总流量',
      data: [ 0, .1, .5, 0.4, .6, .8, .6 ],
      type: 'line',
      smooth: true,
      itemStyle:{
        color:'#91DB7B', // 折点颜色
      },
      lineStyle:{
        color:'#91DB7B' // 折线颜色
      }
    }
  ]
}