import React, {useEffect, useRef} from 'react';
import * as echarts from 'echarts';
function SleepLine() {
    const domRef = useRef()
    const chartInit = () => {
        const myChart = echarts.init(domRef.current)
        myChart.setOption({
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                  type: 'none'
                }
              },
              grid:{
                left:'0%',
                right:'0%',
                bottom:'0%',
                containLabel: true
              },
            xAxis: {
                type: 'category',
                boundaryGap: false,
                data: ['Week1', 'Week2', 'Week3', 'Week4', 'Week5']
              },
              yAxis: {
                axisLabel: {
                  formatter: '{value} h'
                }
              },
              series: [
                {
                  data: [9.5, 7.8, 11.0, 9.2, 10.1], 
                    itemStyle: {
                        barBorderRadius: 5,
                        borderWidth: 1,
                        borderType: 'solid',
                        color: '#18B283',
                        shadowColor: '#18B283',
                        shadowBlur: 3
                    },
                  type: 'line',
                  smooth: true,
                  areaStyle: { color: '#18B283'}
                }
              ]
          });
    }
    useEffect( () => {
        chartInit()
    }, [])

    return (
        <div>
            <div ref={domRef} style={{width:'100%',height:'250px'}}></div>
        </div>
    )
}

export default SleepLine