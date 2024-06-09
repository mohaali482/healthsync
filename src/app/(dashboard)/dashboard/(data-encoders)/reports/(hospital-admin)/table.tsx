"use client"

import { DataTable } from "@/components/data-table";
import { columns, Report } from "../columns";
import { Disease } from "../../../(government)/diseases/columns";


export default function Table({ data }: { data: Report[], diseases: Disease[] }) {
    return (
        <div className="container mx-auto py-10">
            <DataTable columns={columns} data={data} />
        </div>
    )
}