import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts';

function WeightLineChart() {
    const domRef = useRef();

    const chartInit = () => {
        const myChart = echarts.init(domRef.current);
        myChart.setOption({
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'none'
                }
            },
            grid: {
                left: '0%',
                right: '0%',
                bottom: '0%',
                containLabel: true
            },
            xAxis: {
                type: 'category',
                boundaryGap: true,
                data: ['Week1', 'Week2', 'Week3', 'Week4', 'Week5']
            },
            yAxis: {
                axisLabel: {
                    formatter: '{value} kg'
                }
            },
            series: [
                {
                    data: [80.5, 75.2, 70.1, 67.8, 64.5],
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
                    areaStyle: { color: '#18B283' }
                }
            ]
        });
    };

    useEffect(() => {
        chartInit();
    }, []);

    return (
        <div>
            <div ref={domRef} style={{ width: '100%', height: '250px' }}></div>
        </div>
    );
}

export default WeightLineChart;