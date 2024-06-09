"use client"

import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown } from "lucide-react"

export type MedicalEquipmentStore = {
    id: number;
    medicalEquipment: {
        id: number;
        name: String;
    };
    quantity: number;
}

export const columns: ColumnDef<MedicalEquipmentStore>[] = [
    {
        accessorKey: "medicalEquipment.name",
        header: ({ column }) => {
            return (
                <button className="flex p-2 rounded hover:bg-secondary/5"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Medical Equipment Name
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </button>
            )
        },
    },
    {
        accessorKey: "quantity",
        header: ({ column }) => {
            return (
                <button className="flex p-2 rounded hover:bg-secondary/5"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Quantity
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </button>
            )
        },
    },
]
