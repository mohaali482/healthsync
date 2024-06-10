"use client"

import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

export type MedicalEquipment = {
    id: number;
    name: String;
    description: String;
    createdAt: Date;
}

export type MedicalEquipmentStore = {
    id: number;
    medicalEquipment: MedicalEquipment;
    quantity: number;
    thresholdLevel: number;

    medicalEquipmentId: number;

    createdAt: Date;
}

export const columns: ColumnDef<MedicalEquipmentStore>[] = [
    {
        accessorKey: "medicalEquipment.name",
        header: ({ column }) => {
            return (
                <button className="flex p-2 rounded hover:bg-secondary/5"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Name
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </button>
            )
        },
    },
    {
        accessorKey: "medicalEquipment.description",
        header: () => {
            return "Description"
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
        cell: ({ row }) => {
            return (
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger>
                            <span className={row.original.quantity < row.original.thresholdLevel ? "text-destructive" : "text-current"}>
                                {row.original.quantity}
                            </span>
                        </TooltipTrigger>
                        <TooltipContent hidden={row.original.quantity > row.original.thresholdLevel}>
                            <p>Quantity lower than threshold level</p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            )
        }
    },
    {
        accessorKey: "thresholdLevel",
        header: ({ column }) => {
            return (
                <button className="flex p-2 rounded hover:bg-secondary/5"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Threshold Level
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </button>
            )
        },
    },
    {
        accessorKey: "createdAt",
        header: ({ column }) => {
            return (
                <button className="flex p-2 rounded hover:bg-secondary/5"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Created At
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </button>
            )
        },
        cell: ({ row }) => {
            return row.original.createdAt.toLocaleString()
        }
    },
]
