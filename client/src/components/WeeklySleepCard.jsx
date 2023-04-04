import React from 'react';
import PropTypes from 'prop-types';
import { Bar } from 'react-chartjs-2';
import { format, startOfWeek, endOfWeek } from 'date-fns';

const WeeklySleepCard = ({ data }) => {
    const options = {
        maintainAspectRatio: false,
        scales: {
            yAxes: [
                {
                    ticks: {
                        beginAtZero: true,
                        precision: 0,
                        callback: value => `${value}h`,
                    },
                    scaleLabel: {
                        display: true,
                        labelString: 'Hours of Sleep',
                    },
                },
            ],
            xAxes: [
                {
                    type: 'time',
                    time: {
                        tooltipFormat: 'MMM D, YYYY',
                        unit: 'day',
                        unitStepSize: 1,
                        min: startOfWeek(new Date()).getTime(),
                        max: endOfWeek(new Date()).getTime(),
                        displayFormats: {
                            day: 'D',
                        },
                    },
                    scaleLabel: {
                        display: true,
                        labelString: 'Date',
                    },
                },
            ],
        },
        legend: {
            display: false,
        },
        tooltips: {
            mode: 'nearest',
            intersect: false,
            callbacks: {
                label: tooltipItem => `${tooltipItem.yLabel}h`,
                title: ([tooltipItem]) => format(tooltipItem.xLabel, 'MMM D, YYYY'),
            },
        },
    };

    const chartData = {
        labels: data.map(datum => new Date(datum.date)),
        datasets: [
            {
                label: 'Hours of Sleep',
                backgroundColor: '#22c393',
                borderColor: '#22c393',
                borderWidth: 1,
                hoverBackgroundColor: '#22c393',
                hoverBorderColor: '#22c393',
                data: data.map(datum => datum.hours),
            },
        ],
    };

    return (
        <div className="weekly-sleep-card">
            <h2 className="card-title">This Week's Sleep</h2>
            <div className="chart-container">
                <Bar data={chartData} options={options} />
            </div>
        </div>
    );
};

WeeklySleepCard.propTypes = {
    data: PropTypes.arrayOf(
        PropTypes.shape({
            date: PropTypes.string.isRequired,
            hours: PropTypes.number.isRequired,
        }),
    ).isRequired,
};

export default WeeklySleepCard;
