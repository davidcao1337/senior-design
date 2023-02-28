import React, { useRef, useEffect } from "react";
import * as echarts from "echarts";

function LineChart() {
    const chartRef = useRef(null);

    useEffect(() => {
        const chart = echarts.init(chartRef.current);

        const options = {
            title: {
                text: "Line Chart",
            },
            tooltip: {},
            xAxis: {
                data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
            },
            yAxis: {},
            series: [
                {
                    name: "Sleep Hours",
                    type: "line",
                    data: [8.8, 11.0, 9.5, 8.9, 7.6, 7.9, 10.3],
                },
            ],
        };

        chart.setOption(options);

        return () => {
            chart.dispose();
        };
    }, []);

    return <div ref={chartRef} style={{ height: "400px" }}></div>;
}

export default LineChart;
