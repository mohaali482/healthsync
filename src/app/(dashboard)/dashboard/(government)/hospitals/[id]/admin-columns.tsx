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
import { deleteHospitalAdminAction, updateHospitalAdminAction } from "@/app/lib/actions/hospital";
import { hospitalAdminEditSchema } from "@/lib/validations/hospital";
import { Icons } from "@/components/icons";
import { changePasswordSchema } from "@/lib/validations/auth";
import { changeUserPasswordAction } from "@/app/lib/actions/auth";

export type Admin = {
    id: string;
    first_name: String;
    last_name: String;
    username: String;
    hospitalId: number;
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
                username: z.string().min(1, "Username is required").includes(row.original.username.toString(),
                    { message: "Must be the username of the admin you want to delete" })
            })

            type FormValues = z.infer<typeof FormSchema>

            const { register, handleSubmit, formState: { errors }, watch } = useForm<FormValues>({
                resolver: zodResolver(FormSchema),
            })

            type EditFormValues = z.infer<typeof hospitalAdminEditSchema>
            const { register: registerEdit, handleSubmit: handleSubmitEdit, formState: { errors: errorsEdit }, setError: setEditError } = useForm<EditFormValues>({
                resolver: zodResolver(hospitalAdminEditSchema),
                values: {
                    first_name: row.original.first_name.toString(),
                    last_name: row.original.last_name.toString(),
                    email: row.original.email.toString(),
                    username: row.original.username.toString()
                }
            })

            type ChangePasswordValues = z.infer<typeof changePasswordSchema>
            const { register: registerChangePassword, handleSubmit: handleSubmitChangePassword, formState: { errors: errorsChangePassword } } = useForm<ChangePasswordValues>({
                resolver: zodResolver(changePasswordSchema),
            })

            const [isDialogOpen, setIsDialogOpen] = useState(false)
            const [openedDialog, setOpenedDialog] = useState<"Edit" | "Delete" | "Change Password" | null>()
            const [isLoading, setIsLoading] = useState(false)

            async function onSubmit(data: FormValues) {
                setIsLoading(true)
                let error: string | undefined
                if (data.username === row.original.username) {
                    error = await deleteHospitalAdminAction(row.original.hospitalId, row.original.id)
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
                        description: "Hospital admin deleted successfully.",
                        variant: "default",
                    })
                }
            }


            const onSubmitEdit = async (data: EditFormValues) => {
                setIsLoading(true)
                const error = await updateHospitalAdminAction(row.original.hospitalId, row.original.id, data);
                setIsLoading(false)

                if (error) {
                    if (typeof error === "object") {
                        return setEditError(error.key as (("email") | ("username")), { message: error.message })
                    }
                    return toast({
                        title: "Error",
                        description: error,
                        variant: "destructive",
                    })
                }

                toast({
                    title: "Success",
                    description: "Admin updated successfully",
                    variant: "default",
                })
            }

            const onSubmitChangePassword = async (data: ChangePasswordValues) => {
                setIsLoading(true)
                const error = await changeUserPasswordAction(row.original.id, data.password);
                setIsLoading(false)

                if (error) {
                    return toast({
                        title: "Error",
                        description: error,
                        variant: "destructive",
                    })
                }

                toast({
                    title: "Success",
                    description: "Admin password changed successfully",
                    variant: "default",
                })

                setIsDialogOpen(false)
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
                            <DropdownMenuItem>
                                <DialogTrigger onClick={() => setOpenedDialog("Edit")}>
                                    Edit
                                </DialogTrigger>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                <DialogTrigger onClick={() => setOpenedDialog("Change Password")}>
                                    Change Password
                                </DialogTrigger>
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>
                                <DialogTrigger onClick={() => setOpenedDialog("Delete")}>Delete</DialogTrigger>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                    {
                        openedDialog === "Delete" && (
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
                                            Username
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
                        )}
                    {
                        openedDialog === "Edit" && (
                            <DialogContent>
                                <DialogHeader>
                                    <DialogTitle>Editing: {row.original.first_name}  {row.original.last_name}</DialogTitle>
                                    <DialogDescription className="text-current">
                                        Edit the fields you want to change
                                    </DialogDescription>
                                </DialogHeader>
                                <div className="grid gap-4 py-4">
                                    <form onSubmit={handleSubmitEdit(onSubmitEdit)}>
                                        <div className="flex flex-col gap-2">
                                            <div className="w-full flex justify-between items-center gap-2">
                                                <Label className='sr-only' htmlFor="first_name">
                                                    Name
                                                </Label>
                                                <div className="flex gap-2 w-full">
                                                    <Input
                                                        id="first_name"
                                                        placeholder="First Name"
                                                        type="first_name"
                                                        autoCapitalize="none"
                                                        autoComplete="first_name"
                                                        autoCorrect="off"
                                                        disabled={isLoading}
                                                        {...registerEdit("first_name")}
                                                    />
                                                    {errorsEdit?.first_name && (
                                                        <p className="px-1 text-xs text-red-600">
                                                            {errorsEdit.first_name.message}
                                                        </p>
                                                    )}
                                                    <Input
                                                        id="last_name"
                                                        placeholder="Last Name"
                                                        type="last_name"
                                                        autoCapitalize="none"
                                                        autoComplete="last_name"
                                                        autoCorrect="off"
                                                        disabled={isLoading}
                                                        {...registerEdit("last_name")}
                                                    />
                                                    {errorsEdit?.last_name && (
                                                        <p className="px-1 text-xs text-red-600">
                                                            {errorsEdit.last_name.message}
                                                        </p>
                                                    )}
                                                </div>
                                            </div>
                                            <div className="w-full">
                                                <Label className="sr-only" htmlFor="username">
                                                    Username
                                                </Label>
                                                <Input
                                                    id="username"
                                                    placeholder="Username"
                                                    type="username"
                                                    autoCapitalize="none"
                                                    autoComplete="username"
                                                    autoCorrect="off"
                                                    disabled={isLoading}
                                                    {...registerEdit("username")}
                                                />
                                                {errorsEdit?.username && (
                                                    <p className="px-1 text-xs text-red-600">
                                                        {errorsEdit.username.message}
                                                    </p>
                                                )}
                                            </div>
                                            <div className="w-full">
                                                <Label className="sr-only" htmlFor="email">
                                                    Email
                                                </Label>
                                                <Input
                                                    id="email"
                                                    placeholder="Email"
                                                    type="email"
                                                    autoCapitalize="none"
                                                    autoComplete="email"
                                                    autoCorrect="off"
                                                    disabled={isLoading}
                                                    {...registerEdit("email")}
                                                />
                                                {errorsEdit?.email && (
                                                    <p className="px-1 text-xs text-red-600">
                                                        {errorsEdit.email.message}
                                                    </p>
                                                )}
                                            </div>
                                            <Button disabled={isLoading}>
                                                {isLoading && (
                                                    <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                                                )}
                                                Update
                                            </Button>
                                        </div>
                                    </form >
                                </div>
                            </DialogContent>
                        )}

                    {openedDialog === "Change Password" && (
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Change Password for {row.original.first_name}  {row.original.last_name}</DialogTitle>
                                <DialogDescription className="text-current">
                                    Fill out the following information
                                </DialogDescription>
                            </DialogHeader>
                            <form onSubmit={handleSubmitChangePassword(onSubmitChangePassword)}>
                                <div className="flex flex-col gap-2">
                                    <div className="w-full">
                                        <Label className="sr-only" htmlFor="password">
                                            Password
                                        </Label>
                                        <Input
                                            id="password"
                                            placeholder="Password"
                                            type="password"
                                            autoCapitalize="none"
                                            autoComplete="password"
                                            autoCorrect="off"
                                            disabled={isLoading}
                                            {...registerChangePassword("password")}
                                        />
                                        {errorsChangePassword?.password && (
                                            <p className="px-1 text-xs text-red-600">
                                                {errorsChangePassword.password.message}
                                            </p>
                                        )}
                                    </div>
                                    <div className="w-full">
                                        <Label className="sr-only" htmlFor="confirm_password">
                                            Confirm Password
                                        </Label>
                                        <Input
                                            id="confirm_password"
                                            placeholder="Confirm Password"
                                            type="password"
                                            autoCapitalize="none"
                                            autoComplete="confirm_password"
                                            autoCorrect="off"
                                            disabled={isLoading}
                                            {...registerChangePassword("confirm_password")}
                                        />
                                        {errorsChangePassword?.confirm_password && (
                                            <p className="px-1 text-xs text-red-600">
                                                {errorsChangePassword.confirm_password.message}
                                            </p>
                                        )}
                                    </div>
                                    <Button disabled={isLoading}>
                                        {isLoading && (
                                            <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                                        )}
                                        Change Password
                                    </Button>
                                </div>
                            </form >
                        </DialogContent>

                    )}
                </Dialog >
            )
        }
    }
]
