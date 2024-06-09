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
import { changeUserPasswordAction, deleteUserAction, editUserAction } from "@/app/lib/actions/auth";
import { changePasswordSchema, roles, userEditSchema } from "@/lib/validations/auth";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";

const Role: {
    USER: "USER",
    HOSPITAL_ADMIN: "HOSPITAL_ADMIN",
    DATA_ENCODER: "DATA_ENCODER",
    SUPER_USER: "SUPER_USER",
} = {
    USER: "USER",
    HOSPITAL_ADMIN: "HOSPITAL_ADMIN",
    DATA_ENCODER: "DATA_ENCODER",
    SUPER_USER: "SUPER_USER",
}
type Role = typeof Role[keyof typeof Role]

export type User = {
    id: string;
    username: String
    email: String
    first_name: String
    last_name: String
    role: Role
    isActive: boolean
    hospitalId: number | null
    createdAt: Date
}

export const columns: ColumnDef<User>[] = [
    {
        id: "full_name",
        header: ({ column }) => {
            return (
                <button className="flex p-2 rounded hover:bg-secondary/5"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Full Name
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </button>
            )
        },
        cell: ({ row }) => {
            return row.original.first_name + " " + row.original.last_name
        }
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
        accessorKey: "role",
        header: ({ column }) => {
            return (
                <button className="flex p-2 rounded hover:bg-secondary/5"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Role
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </button>
            )
        },
        cell: ({ row }) => {
            const role = row.original.role.toLowerCase()
            if (role.includes("_")) {
                const split = role.split("_")
                return (split[0][0].toUpperCase() + split[0].slice(1)) + " " + (split[1][0].toUpperCase() + split[1].slice(1))
            }

            return role[0].toUpperCase() + role.slice(1)
        }
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
            return (
                <Label className={!row.original.isActive ? "text-destructive" : "text-green-500"}>{row.original.isActive ? "Active" : "Inactive"}</Label>
            )
        }
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
        cell: ({ row, table }) => {

            const [isDialogOpen, setIsDialogOpen] = useState(false)
            const [openedDialog, setOpenedDialog] = useState<"Edit" | "Delete" | "Change Password" | null>()
            const [isLoading, setIsLoading] = useState(false)

            const DeleteFormSchema = z.object({
                username: z.string().min(1, "Username is required").includes(row.original.username.toString(),
                    { message: "Must be the username of the user you want to delete" })
            })

            type DeleteFormValues = z.infer<typeof DeleteFormSchema>

            const { register, handleSubmit, formState: { errors }, watch } = useForm<DeleteFormValues>({
                resolver: zodResolver(DeleteFormSchema),
            })

            async function onSubmit(data: DeleteFormValues) {
                setIsLoading(true)
                let error: string | undefined
                if (data.username === row.original.username) {
                    error = await deleteUserAction(row.original.id)
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
                        description: "User deleted successfully.",
                        variant: "default",
                    })
                }
            }

            type EditFormValues = z.infer<typeof userEditSchema>
            const { register: registerEdit,
                handleSubmit: handleSubmitEdit,
                formState: { errors: errorsEdit },
                setError: setEditError,
                setValue: setEditValue,
                getValues: getEditValues
            } = useForm<EditFormValues>({
                resolver: zodResolver(userEditSchema),
                values: {
                    first_name: row.original.first_name.toString(),
                    last_name: row.original.last_name.toString(),
                    email: row.original.email.toString(),
                    isActive: row.original.isActive,
                    username: row.original.username.toString(),
                    role: row.original.role as any
                }
            })

            const onSubmitEdit = async (data: EditFormValues) => {
                setIsLoading(true)
                const error = await editUserAction(row.original.id, data);
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
                    description: "User updated successfully",
                    variant: "default",
                })
            }
            type ChangePasswordValues = z.infer<typeof changePasswordSchema>
            const { register: registerChangePassword, handleSubmit: handleSubmitChangePassword, formState: { errors: errorsChangePassword } } = useForm<ChangePasswordValues>({
                resolver: zodResolver(changePasswordSchema),
            })

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
                    description: "User password changed successfully",
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
                            <DialogTrigger className="w-full" onClick={() => setOpenedDialog("Edit")}>
                                <DropdownMenuItem className="cursor-pointer">
                                    Edit
                                </DropdownMenuItem>
                            </DialogTrigger>
                            <DialogTrigger className="w-full" onClick={() => setOpenedDialog("Change Password")}>
                                <DropdownMenuItem className="cursor-pointer">
                                    Change Password
                                </DropdownMenuItem>
                            </DialogTrigger>
                            <DropdownMenuSeparator />
                            <DialogTrigger className="w-full" onClick={() => setOpenedDialog("Delete")}>
                                <DropdownMenuItem className="cursor-pointer">
                                    Delete
                                </DropdownMenuItem>
                            </DialogTrigger>
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
                                        {row.original.id !== table.options.meta?.userId && (
                                            <div className="w-full flex items-center gap-2">
                                                <Label htmlFor="isActive">
                                                    Active
                                                </Label>
                                                <Switch
                                                    id="isActive"
                                                    disabled={isLoading}
                                                    defaultChecked={getEditValues().isActive}
                                                    onCheckedChange={(value) => setEditValue("isActive", value)}
                                                />
                                                {errorsEdit?.isActive && (
                                                    <p className="px-1 text-xs text-red-600">
                                                        {errorsEdit.isActive.message}
                                                    </p>
                                                )}
                                            </div>
                                        )}
                                        <div className="w-full">
                                            <Label className="sr-only" htmlFor="email">
                                                Role
                                            </Label>

                                            <Select name='role' onValueChange={(value) => setEditValue("role", value as any)} disabled={isLoading} defaultValue={getEditValues().role}>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select a role" />
                                                </SelectTrigger>
                                                {errorsEdit?.role && (
                                                    <p className="px-1 text-xs text-red-600">
                                                        {errorsEdit.role.message}
                                                    </p>
                                                )}
                                                <SelectContent>
                                                    {roles.map(role => {
                                                        if (role.includes("_")) {
                                                            const [first, second] = role.split("_")

                                                            return (
                                                                <SelectItem value={role}>{first[0] + first.slice(1).toLowerCase() + " " + second[0] + second.slice(1).toLowerCase()}</SelectItem>
                                                            )
                                                        }
                                                        return (
                                                            <SelectItem value={role}>{role[0] + role.slice(1).toLowerCase()}</SelectItem>
                                                        )
                                                    })
                                                    }
                                                </SelectContent>
                                            </Select>
                                        </div>
                                        <Button disabled={isLoading}>
                                            {isLoading && (
                                                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                                            )}
                                            Update
                                        </Button>
                                    </div>
                                </form >
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
