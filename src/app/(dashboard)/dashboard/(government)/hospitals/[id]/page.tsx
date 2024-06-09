import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { getHospitalById } from "@/data/hospitals";
import { DataTable } from "@/components/data-table";
import { columns as medicalEquipmentsColumns } from "./medical-equipments-columns";
import { columns as assetsColumn } from "./assets-column";
import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import { cn } from "@/lib/utils";
import AdminTable from "./admin-table";

const regions = [
    { name: "Addis Ababa", value: "addis_ababa" },
    { name: "Amhara", value: "amhara" },
    { name: "Oromia", value: "oromia" },
    { name: "Tigray", value: "tigray" },
    { name: "Somali", value: "somali" },
    { name: "Afar", value: "afar" },
    { name: "Diredawa", value: "diredawa" },
    { name: "Debub", value: "debub" },
    { name: "Gambela", value: "gambela" },
    { name: "B_gumuz", value: "b_gumuz" },
    { name: "Harari", value: "harari" },
]

export default async function Page({ params }: { params: { id: string } }) {
    const hospital = await getHospitalById(parseInt(params.id))
    if (hospital === null) return (<p>Hospital not found</p>)

    return (
        <Card>
            <CardHeader>
                <CardTitle>Hospital Detail</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="pb-10">
                    <h1 className="font-bold pb-2">Basic Information</h1>
                    <div className="flex flex-grow justify-start gap-4">
                        <div className="flex flex-col gap-2">
                            <p>Name: </p>
                            <p>City: </p>
                            <p>Region: </p>
                            <p>Woreda: </p>
                            <p>Zone: </p>
                        </div>

                        <div className="flex flex-col gap-2">
                            <p className="font-bold">{hospital.name}</p>
                            <p className="font-bold">{hospital.city}</p>
                            <p className="font-bold">{regions.find(region => hospital.region === region.value)?.name}</p>
                            <p className="font-bold">{hospital.woreda}</p>
                            <p className="font-bold">{hospital.zone}</p>
                        </div>
                    </div>
                </div>
                <AdminTable hospital={hospital} />
                <div className="pb-10">
                    <h1 className="font-bold pb-2">Medical Equipments</h1>
                    <DataTable data={hospital.medicalEquipmentStore} columns={medicalEquipmentsColumns} actionButton={null} />
                </div>
                <div className="pb-10">
                    <h1 className="font-bold pb-2">Assets</h1>
                    <DataTable data={hospital.assets} columns={assetsColumn} actionButton={null} />
                </div>
            </CardContent>
            <CardFooter>
                <Link href={`./edit/${hospital.id}`} className={cn(buttonVariants({ variant: "default" }), "ml-auto")}>Edit</Link>
            </CardFooter>
        </Card>
    )
}