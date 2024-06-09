"use client"

import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown, MoreHorizontal } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "@/components/ui/use-toast";
import { Icons } from "@/components/icons";
import { decrementMedicalEquipmentStoreAction, incrementMedicalEquipmentStoreAction } from "@/app/lib/actions/medicalEquipmentStore";
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
                        <TooltipContent className="bg-destructive" hidden={row.original.quantity > row.original.thresholdLevel}>
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
    {
        id: "actions",
        cell: function Cell({ row }) {
            const [isDialogOpen, setIsDialogOpen] = useState(false)
            const [isLoading, setIsLoading] = useState(false)
            const [openedDialog, setOpenedDialog] = useState<"Increment" | "Decrement" | null>()

            const actionForm = z.object({
                quantity: z.number().min(0, { message: 'This field is required' }),
            });

            type actionFormType = z.infer<typeof actionForm>

            const { register, handleSubmit, formState: { errors }, reset } = useForm<actionFormType>({
                resolver: zodResolver(actionForm),
                defaultValues: {
                    quantity: 0,
                }
            })

            async function onSubmitIncrement(data: actionFormType) {
                setIsLoading(true)

                const error = await incrementMedicalEquipmentStoreAction(row.original.id, data.quantity)

                setIsLoading(false)

                if (error) {
                    return toast({
                        title: error,
                        variant: "destructive",
                    })
                } else {
                    setIsDialogOpen(false)
                    reset()
                    return toast({
                        title: "Success",
                        description: "Equipment incremented successfully.",
                        variant: "default",
                    })
                }
            }

            async function onSubmitDecrement(data: actionFormType) {
                setIsLoading(true)

                const error = await decrementMedicalEquipmentStoreAction(row.original.id, data.quantity)

                setIsLoading(false)

                if (error) {
                    return toast({
                        title: error,
                        variant: "destructive",
                    })
                } else {
                    setIsDialogOpen(false)
                    reset()
                    return toast({
                        title: "Success",
                        description: "Equipment decremented successfully.",
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
                            <DialogTrigger className="w-full" onClick={() => setOpenedDialog("Increment")}>
                                <DropdownMenuItem className="cursor-pointer">
                                    Increment
                                </DropdownMenuItem>
                            </DialogTrigger>

                            <DropdownMenuSeparator />
                            <DialogTrigger className="w-full" onClick={() => setOpenedDialog("Decrement")}>
                                <DropdownMenuItem className="cursor-pointer">
                                    Decrement
                                </DropdownMenuItem>
                            </DialogTrigger>
                        </DropdownMenuContent>
                    </DropdownMenu>
                    <DialogContent>
                        {openedDialog === "Decrement" && (
                            <>
                                <DialogHeader>
                                    <DialogTitle>Decrement the quantity of <span className="font-bold">{row.original.medicalEquipment.name}</span></DialogTitle>
                                </DialogHeader>
                                <form onSubmit={handleSubmit(onSubmitDecrement)}>
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
                                            {...register("quantity", { setValueAs: (value) => parseInt(value) })}
                                        />
                                        {errors?.quantity && (
                                            <p className="px-1 text-xs text-red-600">
                                                {errors.quantity.message}
                                            </p>
                                        )}
                                        <Button variant="secondary" type="submit" disabled={isLoading}>
                                            {isLoading && (
                                                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                                            )}
                                            Decrement
                                        </Button>
                                    </div>
                                </form>
                            </>
                        )
                        }
                        {
                            openedDialog === "Increment" && (
                                <>
                                    <DialogHeader>
                                        <DialogTitle>Increment the quantity of <span className="font-bold">{row.original.medicalEquipment.name}</span></DialogTitle>
                                    </DialogHeader>
                                    <form onSubmit={handleSubmit(onSubmitIncrement)}>
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
                                                {...register("quantity", { setValueAs: (value) => parseInt(value) })}
                                            />
                                            {errors?.quantity && (
                                                <p className="px-1 text-xs text-red-600">
                                                    {errors.quantity.message}
                                                </p>
                                            )}
                                            <Button variant="secondary" type="submit" disabled={isLoading}>
                                                {isLoading && (
                                                    <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                                                )}
                                                Increment
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
