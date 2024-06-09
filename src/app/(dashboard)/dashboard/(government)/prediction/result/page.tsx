import { requestPrediction } from "@/app/lib/actions/predictions";
import ChartComponent from "./chart";
import TableComponent from "./table";

type PredictionData = {
    ds: String;
    yhat: number;
    yhat_lower: number;
    yhat_upper: number;
}

export type RecommendationData = {
    name: string;
    value: string;
}

type ResultData = {
    prediction: PredictionData[];
    recomendation: RecommendationData[];
}

export default async function Page({ searchParams }: {
    searchParams?: {
        region?: string
        startDate?: string
        endDate?: string
        disease?: string
    }
}) {
    try {
        const data: ResultData = await JSON.parse(await requestPrediction(searchParams?.region!, searchParams?.startDate!, searchParams?.endDate!))
        return (
            <div>
                <ChartComponent data={data} />
                <div className="mt-5">
                    <TableComponent data={data.recomendation} />
                </div>
            </div>
        )
    } catch (err) {
        console.log(err)
        return <div>Error occured while trying to contact the server</div>
    }
}