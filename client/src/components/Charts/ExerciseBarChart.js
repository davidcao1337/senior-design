import React, {useEffect, useRef, useState} from 'react';
import * as echarts from 'echarts';
function ExerciseBar() {
    const [exerciseData, setExerciseData] = useState(null)
    var option;
    var myChart;
    const domRef = useRef()
    
    const chartInit = () => {
        var dataWeek = [2.2, 1.8, 2, 1.2, 2.5, 1.8, 1, 1.6]
        var dataNight = [2.1, 2.2, 2.1, 2, 1.9, 2.1, 2.3, 2.2, 2.1, 2.1, 2, 1.8]

        myChart = echarts.init(domRef.current)
        option = {
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'shadow'
            }
          },
            xAxis: {
                type: 'category',
                data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun', 'Avg']
              },
              yAxis: {
                type: 'value',
                axisLabel: {
                  formatter: '{value} mins',
                },
                show: true
              },
              series: [
                {
                  type: 'bar',
                  data: dataWeek,
                    itemStyle: {
                        barBorderRadius: 5,
                        borderWidth: 1,
                        borderType: 'solid',
                        color: '#18B283',
                        shadowColor: '#18B283',
                        shadowBlur: 3,
                        opacity: 0.5
                  },
                }
              ],
            grid:{
              left:'0%',
              right:'0%',
              bottom:'0%',
              containLabel: true
            }
          };

        myChart.setOption(option);
        myChart.resize();

        window.addEventListener('resize', () => {
          myChart.resize();
        });
        document.addEventListener('fullscreenchange', () => {
          myChart.resize();
        });
        document.addEventListener('webkitfullscreenchange', () => {
          myChart.resize();
        });
        document.addEventListener('mozfullscreenchange', () => {
          myChart.resize();
        });
        document.addEventListener('msfullscreenchange', () => {
          myChart.resize();
        });
    };

    useEffect( () => {
        chartInit()
        const fetchExercise = async () => {
          const response = await fetch('/exercise')
          const json = await response.json()

          if(response.ok){
              setExerciseData(json)
              const sortedData = exerciseData.sort((a, b) => {
                const dateA = new Date(a.date);
                const dateB = new Date(b.date);
                return dateA - dateB;
              });
              setExerciseData(sortedData)
              const fetchDate = exerciseData.map((item) => item.date);
              const shortDateArray = fetchDate.map((date) => {
                const d = new Date(date);
                return `${(d.getMonth() + 1).toString().padStart(2, '0')}-${d.getDate().toString().padStart(2, '0')}`;
              });

              option.xAxis.data = shortDateArray;
              option.series[0].data = exerciseData.map((item) => item.time)
              myChart.setOption(option);
          }
      }

      fetchExercise();
    }, [])
    
    return (
        <div>
            <div className="Bar" ref={domRef} style={{width:'90%',height:'380px'}}></div>
        </div>
    )
}

export default ExerciseBar;