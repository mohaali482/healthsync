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

const chart = ({ data }: { data: any }) => {
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
                        labels: data?.reports.map((report: any) => report.confirmedCase),
                        datasets: [
                            {
                                label: 'Confirmed Cases',
                                data: data?.reports.map((report: any) => report.confirmedCase),
                                borderColor: 'blue',
                                fill: false
                            },
                            {
                                label: 'Confirmed Deaths',
                                data: data?.reports.map((report: any) => report.confirmedDeath),
                                borderColor: 'red',
                                fill: false

                            }
                        ]

                    }
                }
            />

        </>

    )
}

export default chart