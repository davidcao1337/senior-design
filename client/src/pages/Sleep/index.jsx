import React from 'react';
import { useState } from 'react';
import NavBar from '../../components/NavBar';
import SleepBarChart from '../../components/Charts/SleepBarChart';
import SleepLineChart from '../../components/Charts/SleepLineChart';

import './sleep.css';
const Sleep = () => {

    return(
        <section>
            <NavBar />
            <content>
                    <titleContainer>
                        <div>Sleep</div>
                    </titleContainer>
                    <sleepLogContainer>
                        <statusContainer>
                            <statusContent>
                                <sleepLogSection>
                                    <sleepLabel><div> Sleep Score </div></sleepLabel>
                                    <sleepScore><div> 87 </div></sleepScore>
                                </sleepLogSection>
                                <sleepLogSection>
                                    <sleepLabel><div> Sleep Time </div></sleepLabel>
                                    <sleepTime>{<div> 7 hrs 48 mins </div>}</sleepTime>
                                </sleepLogSection>
                                <sleepLogSection>
                                    <sleepLabel><div> Sleep Goal </div></sleepLabel>
                                    <sleepTime><div> 8 hrs 30 mins </div></sleepTime>
                                </sleepLogSection>
                            </statusContent>
                            <sleepBarChart>
                                <SleepBarChart/>
                            </sleepBarChart>
                        </statusContainer>
                    </sleepLogContainer>

                    <sleepAveContainer>
                    <sleepLineChart>
                        <cardTitle>
                            7 days average sleep time: 7 hours 22 minutes
                        </cardTitle>
                        <SleepLineChart />
                    </sleepLineChart>
                    </sleepAveContainer>    
            </content>
            <rightBar></rightBar>
        </section>
        
    )
}

export default Sleep;