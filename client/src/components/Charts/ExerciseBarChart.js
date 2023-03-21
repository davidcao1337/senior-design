import React, {useEffect, useRef, useState} from 'react';
import * as echarts from 'echarts';
import { useAuthContext } from '../../hooks/useAuthContext';

function ExerciseBar() {
  const { user } = useAuthContext()
  const chartRef = useRef(null);
  const [data, setData] = useState([]);
  
  const fetchData = async () => {
    const response = await fetch('/exercise', {
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
              type: 'shadow',
            },
          },
          xAxis: {
            type: 'category',
            data: newData.map((item) => {
              const dateObj = new Date(item.date);
              return dateObj.toISOString().split('T')[0];
            }),
          },
          yAxis: {
            type: 'value',
            axisLabel: {
              formatter: '{value} mins'
            }
          },
          series: [
            {
              name: 'Exercise time (mins):',
              type: 'bar',
              data: newData.map((item) => item.time),
              itemStyle: {
                barBorderRadius: 5,
                borderWidth: 1,
                borderType: 'solid',
                color: '#18B283',
                shadowColor: '#18B283',
                shadowBlur: 3,
                opacity: 0.5
                },
                markPoint: {
                data: [
                  { type: 'max', name: 'Max' },
                  { type: 'min', name: 'Min' }
                ]
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
            <div className="Bar h-full w-full" ref={chartRef} style={{width:'100%',height:'400%'}}></div>
        </div>
    )
}

export default ExerciseBar;