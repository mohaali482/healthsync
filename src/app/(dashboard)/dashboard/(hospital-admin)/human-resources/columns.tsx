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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { humanResourceForm, humanResourceType } from "@/lib/validations/human-resource";
import { deleteHumanResourceAction, updateHumanResourceAction } from "@/app/lib/actions/human-resource";


const HumanResourceType: {
    DOCTOR: "DOCTOR",
    NURSE: "NURSE",
} = {
    DOCTOR: "DOCTOR",
    NURSE: "NURSE",
}
type HumanResourceType = typeof HumanResourceType[keyof typeof HumanResourceType]


export type HumanResource = {
    id: number;
    name: String;
    type: HumanResourceType;
}

export const columns: ColumnDef<HumanResource>[] = [
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
        accessorKey: "type",
        header: ({ column }) => {
            return (
                <button className="flex p-2 rounded hover:bg-secondary/5"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Human Resource Type
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </button>
            )
        },
        cell: ({ row }) => {
            return row.original.type[0] + row.original.type.slice(1).toLowerCase()
        }
    },
    {
        id: "actions",
        header: () => {
            return "Actions"
        },
        cell: ({ row }) => {
            const [isDialogOpen, setIsDialogOpen] = useState(false)
            const [isLoading, setIsLoading] = useState(false)
            const [openedDialog, setOpenedDialog] = useState<"Edit" | "Delete" | null>()

            const DeleteFormSchema = z.object({
                humanResourceName: z.string().min(1, "Human resource name is required").includes(row.original.name.toString(), { message: "Must be the name of the human resource you want to delete" })
            })

            type FormValues = z.infer<typeof DeleteFormSchema>

            const { register, handleSubmit, formState: { errors }, watch, reset: resetDeleteForm } = useForm<FormValues>({
                resolver: zodResolver(DeleteFormSchema),
            })

            async function onSubmit(data: FormValues) {
                setIsLoading(true)
                let error: string | undefined
                if (data.humanResourceName === row.original.name) {
                    error = await deleteHumanResourceAction(row.original.id)
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
                    resetDeleteForm()
                    return toast({
                        title: "Success",
                        description: "Human resource deleted successfully.",
                        variant: "default",
                    })
                }
            }

            type humanResourceFormType = z.infer<typeof humanResourceForm>

            const { register: registerEdit, handleSubmit: handleSubmitEdit, formState: { errors: errorsEdit }, setValue: setEditValue, getValues: getEditValues } = useForm<humanResourceFormType>({
                resolver: zodResolver(humanResourceForm),
                defaultValues: {
                    name: row.original.name.toString(),
                    type: row.original.type
                }
            })



            async function onSubmitEdit(data: humanResourceFormType) {
                setIsLoading(true)

                const error = await updateHumanResourceAction(row.original.id, data)

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
                        description: "Human resource updated successfully.",
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
                            <DialogTrigger onClick={() => setOpenedDialog("Edit")} className="w-full">
                                <DropdownMenuItem className="cursor-pointer">
                                    Edit
                                </DropdownMenuItem>
                            </DialogTrigger>

                            <DropdownMenuSeparator />
                            <DialogTrigger onClick={() => setOpenedDialog("Delete")} className="w-full">
                                <DropdownMenuItem className="cursor-pointer">
                                    Delete
                                </DropdownMenuItem>
                            </DialogTrigger>
                        </DropdownMenuContent>
                    </DropdownMenu>
                    <DialogContent>
                        {openedDialog === "Delete" && (
                            <>
                                <DialogHeader>
                                    <DialogTitle>Are you absolutely sure?</DialogTitle>
                                    <DialogDescription className="text-current">
                                        Insert the following if you are sure: <p className="font-bold">{row.original.name}</p>
                                    </DialogDescription>
                                </DialogHeader>
                                <form onSubmit={handleSubmit(onSubmit)}>
                                    <div className="grid gap-1">
                                        <Label className="sr-only" htmlFor="humanResourceName">
                                            Name
                                        </Label>
                                        <Input
                                            id="humanResourceName"
                                            placeholder={row.original.name.toString()}
                                            type="name"
                                            autoCapitalize="none"
                                            autoCorrect="off"
                                            disabled={isLoading}
                                            {...register("humanResourceName")}
                                        />
                                        {errors?.humanResourceName && (
                                            <p className="px-1 text-xs text-red-600">
                                                {errors.humanResourceName.message}
                                            </p>
                                        )}
                                        <Button variant="destructive" type="submit" disabled={(watch().humanResourceName !== row.original.name) || isLoading}>
                                            {isLoading ? "Deleting..." : "Delete"}
                                        </Button>
                                    </div>
                                </form>
                            </>
                        )
                        }
                        {
                            openedDialog === "Edit" && (
                                <>
                                    <DialogHeader>
                                        <DialogTitle>Editing human resource: {row.original.name}</DialogTitle>
                                        <DialogDescription className="text-current">
                                            Insert the correct information
                                        </DialogDescription>
                                    </DialogHeader>
                                    <form onSubmit={handleSubmitEdit(onSubmitEdit)}>
                                        <div className="grid gap-1">
                                            <Label className="sr-only" htmlFor="name">
                                                Name
                                            </Label>
                                            <Input
                                                id="name"
                                                placeholder="Name"
                                                type="name"
                                                autoCapitalize="none"
                                                autoCorrect="off"
                                                disabled={isLoading}
                                                {...registerEdit("name")}
                                            />
                                            {errorsEdit?.name && (
                                                <p className="px-1 text-xs text-red-600">
                                                    {errorsEdit.name.message}
                                                </p>
                                            )}
                                            <Select name='type' onValueChange={(value) => setEditValue("type", value as any)} disabled={isLoading} defaultValue={getEditValues().type}>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select the human resource type" />
                                                </SelectTrigger>
                                                {errorsEdit?.type && (
                                                    <p className="px-1 text-xs text-red-600">
                                                        {errorsEdit.type.message}
                                                    </p>
                                                )}
                                                <SelectContent>
                                                    {humanResourceType.map(type => {
                                                        if (type.includes("_")) {
                                                            const [first, second] = type.split("_")

                                                            return (
                                                                <SelectItem value={type}>{first[0] + first.slice(1).toLowerCase() + " " + second[0] + second.slice(1).toLowerCase()}</SelectItem>
                                                            )
                                                        }
                                                        return (
                                                            <SelectItem value={type}>{type[0] + type.slice(1).toLowerCase()}</SelectItem>
                                                        )
                                                    })
                                                    }
                                                </SelectContent>
                                            </Select>

                                            <Button variant="secondary" type="submit" disabled={isLoading}>
                                                {isLoading && (
                                                    <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                                                )}
                                                Edit
                                            </Button>
                                        </div>
                                    </form>
                                </>
                            )
                        }
                    </DialogContent>
                </Dialog >
            )
        }
    }
]
