"use client"

import { DataTable } from "@/components/data-table";
import { columns, MedicalEquipmentStore } from "./columns";

export default function Table({ data }: { data: MedicalEquipmentStore[] }) {
    return (
        <div className="container mx-auto py-10">
            <DataTable columns={columns} data={data} />
        </div>
    )
}