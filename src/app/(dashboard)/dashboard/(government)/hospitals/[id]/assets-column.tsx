"use client"

import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown } from "lucide-react"

export type Asset = {
    id: number;
    name: String;
    assetType: String;
    quantity: number;
}

export const columns: ColumnDef<Asset>[] = [
    {
        accessorKey: "name",
        header: ({ column }) => {
            return (
                <button className="flex p-2 rounded hover:bg-secondary/5"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Asset Name
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </button>
            )
        },
    },
    {
        accessorKey: "assetType",
        header: ({ column }) => {
            return (
                <button className="flex p-2 rounded hover:bg-secondary/5"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Asset Type
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
