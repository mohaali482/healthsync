
import Chart from "./chart"
import { getYearReports } from "@/data/reports"

export default async function Analysis({ params }: { params: { id: string } }) {
    const { id: diseaseId } = params
    const data = await getYearReports(parseInt(diseaseId), 2024)

    return (
        <div>
            <h1 className="font-bold">Confirmed Cases for {data?.name}</h1>
            <Chart data={data} />

        </div>
    )
}
