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
import { deleteResourceAction, updateResourceAction } from "@/app/lib/actions/assets";
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
        cell: function Cell({ row }) {
            const [isDialogOpen, setIsDialogOpen] = useState(false)
            const [isLoading, setIsLoading] = useState(false)
            const [openedDialog, setOpenedDialog] = useState<"Edit" | "Delete" | null>()

            const DeleteFormSchema = z.object({
                resourceName: z.string().min(1, "Resource name is required").includes(row.original.name.toString(), { message: "Must be the name of the resource you want to delete" })
            })

            type FormValues = z.infer<typeof DeleteFormSchema>

            const { register, handleSubmit, formState: { errors }, watch, reset: resetDeleteForm } = useForm<FormValues>({
                resolver: zodResolver(DeleteFormSchema),
            })

            async function onSubmit(data: FormValues) {
                setIsLoading(true)
                let error: string | undefined
                if (data.resourceName === row.original.name) {
                    error = await deleteResourceAction(row.original.id)
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
                        description: "Resource deleted successfully.",
                        variant: "default",
                    })
                }
            }

            type assetFormType = z.infer<typeof assetForm>

            const { register: registerEdit, handleSubmit: handleSubmitEdit, formState: { errors: errorsEdit }, setValue: setEditValue, getValues: getEditValues } = useForm<assetFormType>({
                resolver: zodResolver(assetForm),
                defaultValues: {
                    name: row.original.name.toString(),
                    description: row.original.description.toString(),
                    quantity: row.original.quantity,
                    assetType: row.original.assetType as any,
                }
            })



            async function onSubmitEdit(data: assetFormType) {
                setIsLoading(true)

                const error = await updateResourceAction(row.original.id, data)

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
                        description: "Resource updated successfully.",
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
                                        <Label className="sr-only" htmlFor="resourceName">
                                            Resource Name
                                        </Label>
                                        <Input
                                            id="resourceName"
                                            placeholder={row.original.name.toString()}
                                            type="name"
                                            autoCapitalize="none"
                                            autoCorrect="off"
                                            disabled={isLoading}
                                            {...register("resourceName")}
                                        />
                                        {errors?.resourceName && (
                                            <p className="px-1 text-xs text-red-600">
                                                {errors.resourceName.message}
                                            </p>
                                        )}
                                        <Button variant="destructive" type="submit" disabled={(watch().resourceName !== row.original.name) || isLoading}>
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
                                        <DialogTitle>Editing resource: {row.original.name}</DialogTitle>
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
                                            <Label htmlFor="isActive">
                                                Active
                                            </Label>
                                            <Switch
                                                id="isActive"
                                                disabled={isLoading}
                                                defaultChecked={row.original.isActive}
                                                onCheckedChange={(val) => setEditValue("isActive", val)}
                                                {...registerEdit("isActive")}
                                            />
                                            {errorsEdit?.name && (
                                                <p className="px-1 text-xs text-red-600">
                                                    {errorsEdit.name.message}
                                                </p>
                                            )}
                                            <Label className="sr-only" htmlFor="description">
                                                Description
                                            </Label>
                                            <Input
                                                id="description"
                                                placeholder="Description"
                                                type="text"
                                                autoCapitalize="none"
                                                autoCorrect="off"
                                                disabled={isLoading}
                                                {...registerEdit("description")}
                                            />
                                            {errorsEdit?.description && (
                                                <p className="px-1 text-xs text-red-600">
                                                    {errorsEdit.description.message}
                                                </p>
                                            )}
                                            <Select name='assetType' onValueChange={(value) => setEditValue("assetType", value as any)} disabled={isLoading} defaultValue={getEditValues().assetType}>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select the asset type" />
                                                </SelectTrigger>
                                                {errorsEdit?.assetType && (
                                                    <p className="px-1 text-xs text-red-600">
                                                        {errorsEdit.assetType.message}
                                                    </p>
                                                )}
                                                <SelectContent>
                                                    {assetTypes.map((assetType, idx) => {
                                                        if (assetType.includes("_")) {
                                                            const [first, second] = assetType.split("_")

                                                            return (
                                                                <SelectItem key={idx} value={assetType}>{first[0] + first.slice(1).toLowerCase() + " " + second[0] + second.slice(1).toLowerCase()}</SelectItem>
                                                            )
                                                        }
                                                        return (
                                                            <SelectItem key={idx} value={assetType}>{assetType[0] + assetType.slice(1).toLowerCase()}</SelectItem>
                                                        )
                                                    })
                                                    }
                                                </SelectContent>
                                            </Select>

                                            <Label className="sr-only" htmlFor="quantity">
                                                Quantity
                                            </Label>
                                            <Input
                                                id="quantity"
                                                placeholder="Quantity"
                                                type="number"
                                                autoCapitalize="none"
                                                autoCorrect="off"
                                                disabled={isLoading}
                                                {...registerEdit("quantity", { setValueAs: (value) => parseInt(value) })}
                                            />
                                            {errorsEdit?.quantity && (
                                                <p className="px-1 text-xs text-red-600">
                                                    {errorsEdit.quantity.message}
                                                </p>
                                            )}

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
