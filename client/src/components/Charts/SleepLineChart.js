import React, {useEffect, useRef} from 'react';
import * as echarts from 'echarts';
function SleepLine() {
    const domRef = useRef()
    const chartInit = () => {
        const myChart = echarts.init(domRef.current)
        myChart.setOption({
            title: {
                text: "7 days average sleep time: 7 hours 22 minutes"
            },
            xAxis: {
                data: ['Week1', 'Week2', 'Week3', 'Week4', 'Week5']
              },
              yAxis: {},
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
            <div ref={domRef} style={{width:'700px',height:'400px'}}></div>
        </div>
    )
}

export default SleepLine