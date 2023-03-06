import React, {useEffect, useRef, useState} from 'react';
import * as echarts from 'echarts';

//var dataWeek = [8.8, 11.0, 9.5, 8.9, 7.6, 7.9, 10.3];
//var hours = [8.5, 8.2, 8.2, 7.9, 7.8, 8.5, 8.6, 7.9, 8.0, 8.4, 8.1, 8.0, 8.9, 7.6, 7.9, 10.0, 8.8, 11.0, 9.5];
//var hourToPass;
var weeks = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
var dates = ['2/27/2023', '2/28/2023', '3/1/2023', '3/2/2023', '3/3/2023', '3/4/2023', '3/5/2023', '3/6/2023', '3/7/2023', '3/8/2023', '3/9/2023', '3/10/2023', '3/11/2023', '3/12/2023', '3/13/2023', '3/14/2023', '3/15/2023', '3/16/2023', '3/17/2023'];
var month = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Oct', 'Nov', 'Dec'];
var dataMonth = [8.5, 8.2, 8.2, 7.9, 7.8, 8.5, 8.6, 7.9, 8.0, 8.4, 8.1, 8.0];

function SleepBar(props) {
    const domRef = useRef()
    var myChart;
    var option ;

    function chartInit(){
        myChart = echarts.init(domRef.current)

        if(typeof props.sleepTime === "undefined"){
          option = {
            tooltip: {
              trigger: 'axis',
              axisPointer: {
                type: 'shadow'
              }
            },
              xAxis: {
                  data: weeks,
                },
                yAxis: {
                  show: true,
                  axisLabel: {
                    formatter: '{value} h'
                  }
                },
                series: [
                  {
                    type: 'bar',
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
                left: '90%',
                  feature: {
                      myTool1:{
                          show: true,
                          title: "Month",
                          icon: 'path://"M11.709,7.438H8.292c-0.234,0-0.427,0.192-0.427,0.427v8.542c0,0.234,0.192,0.427,0.427,0.427h3.417c0.233,0,0.426-0.192,0.426-0.427V7.865C12.135,7.63,11.942,7.438,11.709,7.438 M11.282,15.979H8.719V8.292h2.563V15.979zM6.156,11.709H2.74c-0.235,0-0.427,0.191-0.427,0.426v4.271c0,0.234,0.192,0.427,0.427,0.427h3.417c0.235,0,0.427-0.192,0.427-0.427v-4.271C6.583,11.9,6.391,11.709,6.156,11.709 M5.729,15.979H3.167v-3.416h2.562V15.979zM17.261,3.167h-3.417c-0.235,0-0.427,0.192-0.427,0.427v12.812c0,0.234,0.191,0.427,0.427,0.427h3.417c0.234,0,0.427-0.192,0.427-0.427V3.594C17.688,3.359,17.495,3.167,17.261,3.167 M16.833,15.979h-2.562V4.021h2.562V15.979z"',
                          onclick: function (){
                              myChart.setOption({
                                  xAxis: {
                                      data: month
                                    },
                                    yAxis: {
                                      show: true
                                    },
                                    series: [
                                      {
                                        type: 'bar',
                                        data: dataMonth,
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
                            option.series[0].data = props.sleepTime.slice(-7);
                            myChart.setOption(option);
                          }
                      }
                  }
              },
              grid:{
                left:'0%',
                right:'0%',
                bottom:'0%',
                containLabel: true
              }
            };
          //console.log("The 'sleepTime is undefined'");
        } else {
          //console.log(sleepTime)
          option = {
            tooltip: {
              trigger: 'axis',
              axisPointer: {
                type: 'shadow'
              }
            },
              xAxis: {
                  data: props.sleepWeek,
                },
                yAxis: {
                  show: true,
                  axisLabel: {
                    formatter: '{value} h'
                  }
                },
                series: [
                  {
                    type: 'bar',
                    data: props.sleepTime.slice(-7),
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
                left: '90%',
                  feature: {
                      myTool1:{
                          show: true,
                          title: "Month",
                          icon: 'path://"M11.709,7.438H8.292c-0.234,0-0.427,0.192-0.427,0.427v8.542c0,0.234,0.192,0.427,0.427,0.427h3.417c0.233,0,0.426-0.192,0.426-0.427V7.865C12.135,7.63,11.942,7.438,11.709,7.438 M11.282,15.979H8.719V8.292h2.563V15.979zM6.156,11.709H2.74c-0.235,0-0.427,0.191-0.427,0.426v4.271c0,0.234,0.192,0.427,0.427,0.427h3.417c0.235,0,0.427-0.192,0.427-0.427v-4.271C6.583,11.9,6.391,11.709,6.156,11.709 M5.729,15.979H3.167v-3.416h2.562V15.979zM17.261,3.167h-3.417c-0.235,0-0.427,0.192-0.427,0.427v12.812c0,0.234,0.191,0.427,0.427,0.427h3.417c0.234,0,0.427-0.192,0.427-0.427V3.594C17.688,3.359,17.495,3.167,17.261,3.167 M16.833,15.979h-2.562V4.021h2.562V15.979z"',
                          onclick: function (){
                              myChart.setOption({
                                  xAxis: {
                                      data: month
                                    },
                                    yAxis: {
                                      show: true
                                    },
                                    series: [
                                      {
                                        type: 'bar',
                                        data: dataMonth,
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
                            option.series[0].data = props.sleepTime.slice(-7);
                            myChart.setOption(option);
                          }
                      }
                  }
              },
              grid:{
                left:'0%',
                right:'0%',
                bottom:'0%',
                containLabel: true
              }
            };
            //console.log(props.sleepWeek)
        }
        
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
        chartInit();
        if(props.sleepTime){
          option.series[0].data = props.sleepTime.slice(-7);
          myChart.setOption(option);
        }
    }, [props.sleepTime])
    

    return (
        <div>
          <div className="Bar" ref={domRef} style={{width:'100%',height:'250px'}}></div>
        </div>
    )
}

export default SleepBar