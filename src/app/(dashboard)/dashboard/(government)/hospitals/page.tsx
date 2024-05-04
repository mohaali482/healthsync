import { getAllHospitals } from "@/data/hospitals"
import { columns } from "./columns"
import { DataTable } from "./data-table"

export default async function Page() {
    const data = await getAllHospitals()

    return (
        <div className="container mx-auto py-10">
            <h1 className="text-2xl font-bold mb-2">Hospitals</h1>
            <DataTable columns={columns} data={data} />
        </div>
    )
}
