
import { Metadata } from "next"
import CardComponent from "@/components/Card"
import { getAllHospitalsCount } from "@/data/hospitals"
import { getAllMedicalEquipmentsCount } from "@/data/equipment-types"
import { getAllHospitalResourcesCount, getAllResourcesCount } from "@/data/assets"
import { getAllHospitalHumanResourcesCount, getAllHumanResourcesCount } from "@/data/human-resource"
import ChartComponent from "../(super-user)/chart"
import { getDiseaseWithMostReports, getDiseaseWithMostReportsPerHospital, getDiseaseWithWeeklyReportsPerHospital } from "@/data/reports"
import Link from "next/link"
import { getAllMedicalEquipmentStoreCount } from "@/data/medicalEquipmentStore"
import { auth } from "@/lib/auth"
import { redirect } from "next/navigation"
import { getAllDataEncodersCount } from "@/data/user"

export const metadata: Metadata = {
    title: "Dashboard",
}

export default async function HospitalDashboard() {
    const session = await auth();

    if (!session || session.user.hospitalId === null) {
        return redirect("/login")
    }
    const hospitalId = session.user.hospitalId;

    const data = await Promise.all([
        getAllMedicalEquipmentStoreCount(hospitalId),
        getAllHospitalResourcesCount(hospitalId),
        getAllHospitalHumanResourcesCount(hospitalId),
        getAllDataEncodersCount(hospitalId),
        getDiseaseWithWeeklyReportsPerHospital(hospitalId),
        getDiseaseWithMostReportsPerHospital(hospitalId),
    ])


    return (
        <div>
            <div className="flex gap-2 justify-between flex-col md:flex-row mb-8">
                <Link href="/dashboard/equipment">
                    <CardComponent title="# of equipments in store" value={data[0].toString()} description={""} />
                </Link>

                <Link href="/dashboard/equipment-types">
                    <CardComponent title="# of resources" value={data[1].toString()} description="" />
                </Link>

                <CardComponent title="# of human resources" value={data[2].toString()} description="" />

                <CardComponent title="# of data encoders" value={data[3].toString()} description="" />
            </div>

            <div className="mb-8">
                <h2 className="text-xl font-bold mb-4">Weekly disease with most reports: <span>{data[4]?.name}</span></h2>
                <ChartComponent data={data[4]} />
            </div>

            <div className="mb-8">
                <h2 className="text-xl font-bold mb-4">Disease with most reports: <span>{data[5]?.name}</span></h2>
                <ChartComponent data={data[5]} />
            </div>
        </div>
    )
}