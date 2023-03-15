import React, {useEffect, useRef, useState} from 'react';
import * as echarts from 'echarts';

function SleepBar() {
  const chartRef = useRef(null);
  const [data, setData] = useState([]);
  
  const fetchData = async () => {
    const response = await fetch('/sleep');
    const json = await response.json()
    if(response.ok){
      return json
    }
  };

    useEffect( () => {
      const fetchDataAndRenderChart = async () => {
        const newData = await fetchData();
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
            data: newData.map((item) => item.date),
          },
          yAxis: {
            type: 'value',
            axisLabel: {
              formatter: '{value} hrs'
            }
          },
          series: [
            {
              name: 'mins',
              type: 'bar',
              data: newData.map((item) => item.hours + parseFloat((item.minutes/60).toFixed(1))),
              itemStyle: {
                barBorderRadius: 5,
                borderWidth: 1,
                borderType: 'solid',
                color: '#18B283',
                shadowColor: '#18B283',
                shadowBlur: 3,
                opacity: 0.5
                },
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
          <div className="Bar" ref={chartRef} style={{width:'110%',height:'280%'}}></div>
        </div>
    )
}

export default SleepBar;