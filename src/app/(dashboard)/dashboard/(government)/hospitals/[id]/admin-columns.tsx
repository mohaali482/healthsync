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
import Link from "next/link";

export type Admin = {
    id: string;
    first_name: String;
    last_name: String;
    username: String;
    email: String;
    createdAt: Date;
}

export const columns: ColumnDef<Admin>[] = [
    {
        accessorKey: "first_name",
        header: ({ column }) => {
            return (
                <button className="flex p-2 rounded hover:bg-secondary/5"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    First Name
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </button>
            )
        },
    },
    {
        accessorKey: "last_name",
        header: ({ column }) => {
            return (
                <button className="flex p-2 rounded hover:bg-secondary/5"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Last Name
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </button>
            )
        },
    },
    {
        accessorKey: "username",

        header: ({ column }) => {
            return (
                <button className="flex p-2 rounded hover:bg-secondary/5"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Username
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </button>
            )
        },
    },
    {
        accessorKey: "email",
        header: ({ column }) => {
            return (
                <button className="flex p-2 rounded hover:bg-secondary/5"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Email
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
        cell: ({ row }) => {
            const FormSchema = z.object({
                username: z.string().min(1, "Username is required").includes(row.original.username.toString(), { message: "Must be the username of the admin you want to delete" })
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
                if (data.username === row.original.username) {
                    // error = await deleteHospitalAction({ id: row.original.id })
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
                            <Link href={`/dashboard/hospitals/${row.original.id}`}><DropdownMenuItem>Details</DropdownMenuItem></Link>
                            <DropdownMenuItem>Edit</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>
                                <DialogTrigger>Delete</DialogTrigger>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Are you absolutely sure?</DialogTitle>
                            <DialogDescription className="text-current">
                                Insert the following if you are sure: <p className="font-bold">{row.original.username}</p>
                            </DialogDescription>
                        </DialogHeader>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="grid gap-1">
                                <Label className="sr-only" htmlFor="username">
                                    Hospital Name
                                </Label>
                                <Input
                                    id="username"
                                    placeholder={row.original.username.toString()}
                                    type="username"
                                    autoCapitalize="none"
                                    autoComplete="username"
                                    autoCorrect="off"
                                    disabled={isLoading}
                                    {...register("username")}
                                />
                                {errors?.username && (
                                    <p className="px-1 text-xs text-red-600">
                                        {errors.username.message}
                                    </p>
                                )}
                                <Button variant="destructive" type="submit" disabled={(watch().username !== row.original.username) || isLoading}>
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
