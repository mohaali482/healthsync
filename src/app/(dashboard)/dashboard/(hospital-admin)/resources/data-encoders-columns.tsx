"use client"

import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown, MoreHorizontal } from "lucide-react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "@/components/ui/use-toast";
import { Icons } from "@/components/icons";
import { deleteResourceAction, updateResourceAction, updateResourceStatusAction } from "@/app/lib/actions/assets";
import { assetForm, assetTypes } from "@/lib/validations/assets";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";


const AssetType: {
    CAR: "CAR",
    MEDICAL_EQUIPMENT: "MEDICAL_EQUIPMENT",
    OTHER: "OTHER",
} = {
    CAR: "CAR",
    MEDICAL_EQUIPMENT: "MEDICAL_EQUIPMENT",
    OTHER: "OTHER",
}
type AssetType = typeof AssetType[keyof typeof AssetType]


export type Resource = {
    id: number;
    name: String;
    description: String;
    assetType: AssetType;
    isActive: boolean;
    quantity: number;
}

export const columns: ColumnDef<Resource>[] = [
    {
        accessorKey: "name",
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
        accessorKey: "description",
        header: ({ column }) => {
            return (
                <button className="flex p-2 rounded hover:bg-secondary/5"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Description
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
                    Resource Type
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </button>
            )
        },
        cell: ({ row }) => {
            const assetType = row.original.assetType.split("_")

            if (assetType.length == 2) {
                return assetType[0][0] + assetType[0].slice(1).toLowerCase() + " " + assetType[1][0] + assetType[1].slice(1).toLowerCase()
            }

            return row.original.assetType[0] + row.original.assetType.slice(1).toLowerCase()
        }
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
    {
        accessorKey: "isActive",
        header: ({ column }) => {
            return (
                <button className="flex p-2 rounded hover:bg-secondary/5"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Is Active
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </button>
            )
        },
        cell: ({ row }) => {
            return row.original.isActive ? <p className="text-green-500">Yes</p> : <p className="text-destructive">No</p>
        }
    },
    {
        id: "actions",
        cell: ({ row }) => {
            const [isDialogOpen, setIsDialogOpen] = useState(false)
            const [isLoading, setIsLoading] = useState(false)

            const UpdateFormSchema = z.object({
                isActive: z.boolean()
            })

            type FormValues = z.infer<typeof UpdateFormSchema>

            const { register, handleSubmit, setValue } = useForm<FormValues>({
                resolver: zodResolver(UpdateFormSchema),
            })

            async function onSubmit(data: FormValues) {
                setIsLoading(true)
                let error = await updateResourceStatusAction(row.original.id, data.isActive)
                setIsLoading(false)

                if (error) {
                    return toast({
                        title: "Something went wrong.",
                        description: error,
                        variant: "destructive",
                    })
                } else {
                    setIsDialogOpen(false)
                    return toast({
                        title: "Success",
                        description: "Resource deleted successfully.",
                        variant: "default",
                    })
                }
            }

            return (
                <Dialog defaultOpen={isDialogOpen} open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                                <span className="sr-only">Open menu</span>
                                <MoreHorizontal className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DialogTrigger className="w-full">
                                <DropdownMenuItem className="cursor-pointer">
                                    Edit
                                </DropdownMenuItem>
                            </DialogTrigger>
                        </DropdownMenuContent>
                    </DropdownMenu>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Editing resource: {row.original.name}</DialogTitle>
                            <DialogDescription className="text-current">
                                Insert the correct information
                            </DialogDescription>
                        </DialogHeader>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="grid gap-1">
                                <Label htmlFor="isActive">
                                    Active
                                </Label>
                                <Switch
                                    id="isActive"
                                    disabled={isLoading}
                                    defaultChecked={row.original.isActive}
                                    onCheckedChange={(val) => setValue("isActive", val)}
                                    {...register("isActive")}
                                />

                                <Button variant="secondary" type="submit" disabled={isLoading}>
                                    {isLoading && (
                                        <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                                    )}
                                    Edit
                                </Button>
                            </div>
                        </form>
                    </DialogContent>
                </Dialog >
            )
        }
    }
]
