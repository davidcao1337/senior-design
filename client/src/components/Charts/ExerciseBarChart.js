import React, {useEffect, useRef, useState} from 'react';
import * as echarts from 'echarts';

function ExerciseBar() {
  const chartRef = useRef(null);
  const [data, setData] = useState([]);
  
  const fetchData = async () => {
    const response = await fetch('/exercise');
    const json = await response.json()
    if(response.ok){
      return json
    }
  };

    useEffect( () => {
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
            data: newData.map((item) => item.date),
          },
          yAxis: {
            type: 'value',
          },
          series: [
            {
              name: 'mins',
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
            <div className="Bar" ref={chartRef} style={{width:'100%',height:'400%'}}></div>
        </div>
    )
}

export default ExerciseBar;