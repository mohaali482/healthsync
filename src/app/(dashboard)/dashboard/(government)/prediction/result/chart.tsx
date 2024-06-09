"use client"

import React from 'react'
import { Line } from 'react-chartjs-2'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

const ChartComponent = ({ data }: { data: any }) => {
    return (
        <>
            <Line
                options={
                    {
                        responsive: true,

                    }
                }
                data={
                    {
                        labels: data?.prediction.map((val: any) => new Date(val.ds).toISOString().substring(0, 10)),
                        datasets: [
                            {
                                label: 'Prediction',
                                data: data?.prediction.map((val: any) => val.yhat),
                                borderColor: 'blue',
                                fill: false
                            },
                            {
                                label: 'Lower Bound',
                                data: data?.prediction.map((val: any) => val.yhat_lower),
                                borderColor: 'red',
                                fill: false
                            },
                            {
                                label: 'Upper Bound',
                                data: data?.prediction.map((val: any) => val.yhat_upper),
                                borderColor: 'green',
                                fill: false
                            }
                        ]

                    }
                }
            />

        </>

    )
}

export default ChartComponent