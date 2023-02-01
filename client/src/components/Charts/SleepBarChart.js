import React, {useEffect, useRef} from 'react';
import * as echarts from 'echarts';
function SleepBar() {
    const domRef = useRef()
    const chartInit = () => {
        var dataWeek = [8.8, 11.0, 9.5, 8.9, 7.6, 7.9, 10.3]
        var dataNight = [0, 0, 3, 5, 3, 5, 3, 5, 5, 3, 0, 0]

        const myChart = echarts.init(domRef.current)
        myChart.setOption({
            xAxis: {
                data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
              },
              yAxis: {
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
            toolbox: {
                feature: {
                    myTool1:{
                        show: true,
                        title: "Last Night",
                        icon: 'path://"M11.709,7.438H8.292c-0.234,0-0.427,0.192-0.427,0.427v8.542c0,0.234,0.192,0.427,0.427,0.427h3.417c0.233,0,0.426-0.192,0.426-0.427V7.865C12.135,7.63,11.942,7.438,11.709,7.438 M11.282,15.979H8.719V8.292h2.563V15.979zM6.156,11.709H2.74c-0.235,0-0.427,0.191-0.427,0.426v4.271c0,0.234,0.192,0.427,0.427,0.427h3.417c0.235,0,0.427-0.192,0.427-0.427v-4.271C6.583,11.9,6.391,11.709,6.156,11.709 M5.729,15.979H3.167v-3.416h2.562V15.979zM17.261,3.167h-3.417c-0.235,0-0.427,0.192-0.427,0.427v12.812c0,0.234,0.191,0.427,0.427,0.427h3.417c0.234,0,0.427-0.192,0.427-0.427V3.594C17.688,3.359,17.495,3.167,17.261,3.167 M16.833,15.979h-2.562V4.021h2.562V15.979z"',
                        onclick: function (){
                            myChart.setOption({
                                xAxis: {
                                    data: ['23', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10' ]
                                  },
                                  yAxis: {
                                    show: false
                                  },
                                  series: [
                                    {
                                      type: 'bar',
                                      data: dataNight,
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
                                  ]
                              });
                        }
                    },
                    myTool2:{
                        show: true,
                        title: "Week",
                        icon: 'path://"M11.709,7.438H8.292c-0.234,0-0.427,0.192-0.427,0.427v8.542c0,0.234,0.192,0.427,0.427,0.427h3.417c0.233,0,0.426-0.192,0.426-0.427V7.865C12.135,7.63,11.942,7.438,11.709,7.438 M11.282,15.979H8.719V8.292h2.563V15.979zM6.156,11.709H2.74c-0.235,0-0.427,0.191-0.427,0.426v4.271c0,0.234,0.192,0.427,0.427,0.427h3.417c0.235,0,0.427-0.192,0.427-0.427v-4.271C6.583,11.9,6.391,11.709,6.156,11.709 M5.729,15.979H3.167v-3.416h2.562V15.979zM17.261,3.167h-3.417c-0.235,0-0.427,0.192-0.427,0.427v12.812c0,0.234,0.191,0.427,0.427,0.427h3.417c0.234,0,0.427-0.192,0.427-0.427V3.594C17.688,3.359,17.495,3.167,17.261,3.167 M16.833,15.979h-2.562V4.021h2.562V15.979z"',
                        onclick: function (){
                            myChart.setOption({
                                xAxis: {
                                    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
                                  },
                                  yAxis: {
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
                                  ]
                              });
                        }
                    }
                }
            }
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

export default SleepBar