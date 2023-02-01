import NavBar from '../NavBar';
import SleepBarChart from '../Charts/SleepBarChart';
import SleepLineChart from '../Charts/SleepLineChart';
import './sleep.css';
const Sleep = () => {

    return(
        <section>
            <NavBar />
            <content>
                <div className="flex flex-col items-left justify-left w-full flex-1 px-20 text-left">
                <h2 className="mb-5 font-bold text-3xl text-[#525252]">Sleep</h2>
                <div className="sleepStats">
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
                    
                    <div>
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