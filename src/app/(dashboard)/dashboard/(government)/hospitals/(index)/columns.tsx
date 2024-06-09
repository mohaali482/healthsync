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
import { deleteHospitalAction } from "@/app/lib/actions/hospital";
import { toast } from "@/components/ui/use-toast";
import Link from "next/link";

export type Hospital = {
    id: number;
    name: String;
    region: String;
    zone: String;
    woreda: String;
    createdAt: Date;
}


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

export const columns: ColumnDef<Hospital>[] = [
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
        accessorKey: "region",
        header: ({ column }) => {
            return (
                <button className="flex p-2 rounded hover:bg-secondary/5"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Region
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </button>
            )
        },
        cell: ({ row }) => {
            return regions.find(region => row.original.region === region.value)?.name
        }
    },
    {
        accessorKey: "zone",
        header: ({ column }) => {
            return (
                <button className="flex p-2 rounded hover:bg-secondary/5"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Zone
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </button>
            )
        },
    },
    {
        accessorKey: "woreda",

        header: ({ column }) => {
            return (
                <button className="flex p-2 rounded hover:bg-secondary/5"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Woreda
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
    {
        id: "actions",
        cell: function Cell({ row }) {
            const FormSchema = z.object({
                hospitalname: z.string().min(1, "Hospital Name is required").includes(row.original.name.toString(), { message: "Must be the name of the hospital you want to delete" })
            })

            type FormValues = z.infer<typeof FormSchema>

            const { register, handleSubmit, formState: { errors }, watch } = useForm<FormValues>({
                resolver: zodResolver(FormSchema),
            })


            const [isDialogOpen, setIsDialogOpen] = useState(false)
            const [isLoading, setIsLoading] = useState(false)

            async function onSubmit(data: FormValues) {
                setIsLoading(true)
                let error: string | undefined
                if (data.hospitalname === row.original.name) {
                    error = await deleteHospitalAction({ id: row.original.id })
                }

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
                        description: "Hospital deleted successfully.",
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

                            <Link href={`/dashboard/hospitals/${row.original.id}`}>
                                <DropdownMenuItem className="cursor-pointer">Details</DropdownMenuItem>
                            </Link>

                            <Link href={`/dashboard/hospitals/edit/${row.original.id}`}>
                                <DropdownMenuItem className="cursor-pointer">Edit</DropdownMenuItem>
                            </Link>

                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="cursor-pointer">
                                <DialogTrigger>Delete</DialogTrigger>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Are you absolutely sure?</DialogTitle>
                            <DialogDescription className="text-current">
                                Insert the following if you are sure: <p className="font-bold">{row.original.name}</p>
                            </DialogDescription>
                        </DialogHeader>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="grid gap-1">
                                <Label className="sr-only" htmlFor="hospitalname">
                                    Hospital Name
                                </Label>
                                <Input
                                    id="hospitalname"
                                    placeholder={row.original.name.toString()}
                                    type="hospitalname"
                                    autoCapitalize="none"
                                    autoComplete="hospitalname"
                                    autoCorrect="off"
                                    disabled={isLoading}
                                    {...register("hospitalname")}
                                />
                                {errors?.hospitalname && (
                                    <p className="px-1 text-xs text-red-600">
                                        {errors.hospitalname.message}
                                    </p>
                                )}
                                <Button variant="destructive" type="submit" disabled={(watch().hospitalname !== row.original.name) || isLoading}>
                                    {isLoading ? "Deleting..." : "Delete"}
                                </Button>
                            </div>

                        </form>
                    </DialogContent>
                </Dialog >
            )
        }
    }
]
