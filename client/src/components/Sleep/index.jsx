import NavBar from '../NavBar';
import SleepBarChart from '../Charts/SleepBarChart';
import SleepLineChart from '../Charts/SleepLineChart';
import './sleep.css';
const Sleep = () => {

    return(
        <section>
            <NavBar />
            <content>
                <div className="SleepTracker">
                    <h1 className="Title">Sleep</h1>
                        <div className="SleepStats">
                            <div className="stats shadow">
                                <div className="stat place-items-center">
                                    <div className="stat-title">Sleep Score</div>
                                    <div className="stat-value">78</div>
                                    <div className="stat-desc">Yesterday</div>
                                </div>
                                <div className="stat place-items-center">
                                    <div className="stat-title">Sleep Time</div>
                                    <div className="stat-value">8 h 15 min</div>
                                    <div className="stat-desc">↗︎ Sleep duration (8%)</div>
                                </div>
                                <div className="stat place-items-center">
                                    <div className="stat-title">Deep Sleep</div>
                                    <div className="stat-value">1 h 5 min</div>
                                    <div className="stat-desc">↘︎ Deep sleep duration(14%)</div>
                                </div>
                            </div>
                            
                            <div className="BarChart">
                                <SleepBarChart />
                            </div>
                        </div>
                    <SleepLineChart />
            </div>
            </content>
            
        </section>
        
    )
}

export default Sleep;