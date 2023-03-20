import React, {useEffect, useRef, useState} from 'react';
import * as echarts from 'echarts';
import { useAuthContext } from '../../hooks/useAuthContext';

function SleepLine() {
  const chartRef = useRef(null);
  const { user } = useAuthContext();

  const [data, setData] = useState([]);
  
  const fetchData = async () => {
    const response = await fetch('/sleep', {
      headers: {
          'Authorization': `Bearer ${user.token}`
      }
    });
    const json = await response.json()
    if(response.ok){
      return json
    }
  };

    useEffect( () => {
      if(!user){
        return
      }
      const fetchDataAndRenderChart = async () => {
        const newData = (await fetchData()).slice(0, 7);
        setData(newData);
  
        const chartInstance = echarts.init(chartRef.current);
        chartInstance.setOption({
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'none',
            },
          },
          grid:{
            left:'0%',
            right:'0%',
            bottom:'0%',
            containLabel: true
          },
          xAxis: {
            type: 'category',
            boundaryGap: true,
            data: newData.map((item) => {
              const dateObj = new Date(item.date);
              return dateObj.toISOString().split('T')[0];
            }),
          },
          yAxis: {
            axisLabel: {
              formatter: '{value} hrs'
            }
          },
          series: [
            {
              name: 'Sleep hours:',
              type: 'line',
              data: newData.map((item) => item.hours + parseFloat((item.minutes/60).toFixed(1))),
              itemStyle: {
                barBorderRadius: 5,
                borderWidth: 1,
                borderType: 'solid',
                color: '#18B283',
                shadowColor: '#18B283',
                shadowBlur: 3,
                },
              smooth: true,
              areaStyle: { color: '#97dcc7'},
              markPoint: {
                data: [
                  { type: 'max', name: 'Max' },
                  { type: 'min', name: 'Min' }
                ]
              },
              markLine: {
                data: [{ type: 'average', name: 'Avg' }]
              }
            },
          ],
        });
        chartInstance.resize();

        window.addEventListener('resize', () => {
          chartInstance.resize();
        });
        document.addEventListener('fullscreenchange', () => {
          chartInstance.resize();
        });
        document.addEventListener('webkitfullscreenchange', () => {
          chartInstance.resize();
        });
        document.addEventListener('mozfullscreenchange', () => {
          chartInstance.resize();
        });
        document.addEventListener('msfullscreenchange', () => {
          chartInstance.resize();
        });
      };
  
      fetchDataAndRenderChart();
    }, [])

    return (
        <div>
            <div ref={chartRef} style={{width:'100%',height:'300%'}}></div>
        </div>
    )
}

export default SleepLine;