import { getAllHospitals } from "@/data/hospitals"
import { columns } from "./columns"
import { DataTable } from "./data-table"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"

export default async function Page() {
    const data = await getAllHospitals()

    return (
        <div className="container mx-auto py-10">
            <h1 className="text-xl font-semibold">List of all hospitals</h1>
            <DataTable columns={columns} data={data} actionButton={<Link className={cn(buttonVariants({ variant: "default" }))} href={"/dashboard/hospitals/add"}>Add</Link>} />
        </div>
    )
}
