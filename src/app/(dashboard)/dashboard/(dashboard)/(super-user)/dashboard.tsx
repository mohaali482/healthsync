
import { Metadata } from "next"
import CardComponent from "@/components/Card"
import { getAllHospitalsCount } from "@/data/hospitals"
import { getAllMedicalEquipmentsCount } from "@/data/equipment-types"
import { getAllResourcesCount } from "@/data/assets"
import { getAllHumanResourcesCount } from "@/data/human-resource"
import ChartComponent from "./chart"
import { getDiseaseWithMostReports } from "@/data/reports"
import Link from "next/link"

export const metadata: Metadata = {
    title: "Dashboard",
}

export default async function SuperUserDashboard() {
    const data = await Promise.all([
        getAllHospitalsCount(),
        getAllMedicalEquipmentsCount(),
        getAllResourcesCount(),
        getAllHumanResourcesCount(),
        getDiseaseWithMostReports()
    ])


    return (
        <div>
            <div className="flex gap-2 justify-between flex-wrap flex-col md:flex-row mb-8">
                <div className="w-56">
                    <Link href="/dashboard/hospitals">
                        <CardComponent title="# of hospitals" value={data[0].toString()} description={"Registered across the country"} />
                    </Link>
                </div>
                <div className="w-56">
                    <Link href="/dashboard/equipment-types">
                        <CardComponent title="# of equipment types" value={data[1].toString()} description="Registered by hospitals" />
                    </Link>
                </div>
                <div className="w-56">
                    <CardComponent title="# of resources" value={data[2].toString()} description="Total available" />
                </div>
                <div className="w-56">
                    <CardComponent title="# of human resources" value={data[3].toString()} description="Registered across the country" />
                </div>
            </div>

            <div className="mb-8">
                <h2 className="text-xl font-bold mb-4">Disease with most reports: <span>{data[4]?.name}</span></h2>
                <ChartComponent data={data[4]} />
            </div>
        </div>
    )
}