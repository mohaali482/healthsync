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
import { equipmentForm } from "@/lib/validations/medicalEquipments";
import { deleteMedicalEquipmentStoreAction, updateMedicalEquipmentStoreAction } from "@/app/lib/actions/medicalEquipmentStore";
import { medicalEquipmentStoreEditForm, medicalEquipmentStoreForm } from "@/lib/validations/medicalEquipmentStore";
import { Switch } from "@/components/ui/switch";

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
    {
        id: "actions",
        cell: ({ row }) => {
            const [isDialogOpen, setIsDialogOpen] = useState(false)
            const [isLoading, setIsLoading] = useState(false)
            const [openedDialog, setOpenedDialog] = useState<"Edit" | "Delete" | null>()

            const DeleteFormSchema = z.object({
                equipmentName: z.string().min(1, "Medical equipment name is required").includes(row.original.medicalEquipment.name.toString(), { message: "Must be the name of the medical equipment you want to delete" })
            })

            type FormValues = z.infer<typeof DeleteFormSchema>

            const { register, handleSubmit, formState: { errors }, watch, reset: resetDeleteForm } = useForm<FormValues>({
                resolver: zodResolver(DeleteFormSchema),
            })

            async function onSubmit(data: FormValues) {
                setIsLoading(true)
                let error: string | undefined
                if (data.equipmentName === row.original.medicalEquipment.name) {
                    error = await deleteMedicalEquipmentStoreAction(row.original.id)
                }

                setIsLoading(false)

                if (error) {
                    return toast({
                        title: error,
                        variant: "destructive",
                    })
                } else {
                    setIsDialogOpen(false)
                    resetDeleteForm()
                    return toast({
                        title: "Success",
                        description: "Equipment deleted successfully.",
                        variant: "default",
                    })
                }
            }

            type medicalEquipmentStoreFormType = z.infer<typeof medicalEquipmentStoreEditForm>

            const { register: registerEdit, handleSubmit: handleSubmitEdit, formState: { errors: errorsEdit }, setValue: setEditValue } = useForm<medicalEquipmentStoreFormType>({
                resolver: zodResolver(medicalEquipmentStoreEditForm),
                defaultValues: {
                    quantity: row.original.quantity,
                    thresholdLevel: row.original.thresholdLevel,
                }
            })



            async function onSubmitEdit(data: medicalEquipmentStoreFormType) {
                setIsLoading(true)

                const error = await updateMedicalEquipmentStoreAction(row.original.id, data)

                setIsLoading(false)

                if (error) {
                    return toast({
                        title: error,
                        variant: "destructive",
                    })
                } else {
                    setIsDialogOpen(false)
                    return toast({
                        title: "Success",
                        description: "Equipment updated successfully.",
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
                            <DialogTrigger className="w-full" onClick={() => setOpenedDialog("Edit")}>
                                <DropdownMenuItem className="cursor-pointer">
                                    Edit
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
                    <DialogContent>
                        {openedDialog === "Delete" && (
                            <>
                                <DialogHeader>
                                    <DialogTitle>Are you absolutely sure?</DialogTitle>
                                    <DialogDescription className="text-current">
                                        Insert the following if you are sure: <p className="font-bold">{row.original.medicalEquipment.name}</p>
                                    </DialogDescription>
                                </DialogHeader>
                                <form onSubmit={handleSubmit(onSubmit)}>
                                    <div className="grid gap-1">
                                        <Label className="sr-only" htmlFor="equipmentName">
                                            Equipment Name
                                        </Label>
                                        <Input
                                            id="equipmentName"
                                            placeholder={row.original.medicalEquipment.name.toString()}
                                            type="name"
                                            autoCapitalize="none"
                                            autoCorrect="off"
                                            disabled={isLoading}
                                            {...register("equipmentName")}
                                        />
                                        {errors?.equipmentName && (
                                            <p className="px-1 text-xs text-red-600">
                                                {errors.equipmentName.message}
                                            </p>
                                        )}
                                        <Button variant="destructive" type="submit" disabled={(watch().equipmentName !== row.original.medicalEquipment.name) || isLoading}>
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
                                        <DialogTitle>Editing Equipment: {row.original.medicalEquipment.name}</DialogTitle>
                                        <DialogDescription className="text-current">
                                            Insert the correct information
                                        </DialogDescription>
                                    </DialogHeader>
                                    <form onSubmit={handleSubmitEdit(onSubmitEdit)}>
                                        <div className="grid gap-1">
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
                                            <Input
                                                id="thresholdLevel"
                                                placeholder="Threshold Level"
                                                type="number"
                                                autoCapitalize="none"
                                                autoCorrect="off"
                                                disabled={isLoading}
                                                {...registerEdit("thresholdLevel", { setValueAs: (value) => parseInt(value) })}
                                            />
                                            {errorsEdit?.thresholdLevel && (
                                                <p className="px-1 text-xs text-red-600">
                                                    {errorsEdit.thresholdLevel.message}
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
