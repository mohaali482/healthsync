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
import { deleteDiseaseAction, updateDiseaseAction } from "@/app/lib/actions/diseases";
import { diseaseForm } from "@/lib/validations/diseases";

export type Disease = {
    id: number;
    name: String;
    description: String;
}

export const columns: ColumnDef<Disease>[] = [
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
        id: "actions",
        cell: function Cell({ row }) {
            const [isDialogOpen, setIsDialogOpen] = useState(false)
            const [isLoading, setIsLoading] = useState(false)
            const [openedDialog, setOpenedDialog] = useState<"Edit" | "Delete" | null>()

            const DeleteFormSchema = z.object({
                diseaseName: z.string().min(1, "Disease name is required").includes(row.original.name.toString(), { message: "Must be the name of the disease you want to delete" })
            })

            type FormValues = z.infer<typeof DeleteFormSchema>

            const { register, handleSubmit, formState: { errors }, watch, reset: resetDeleteForm } = useForm<FormValues>({
                resolver: zodResolver(DeleteFormSchema),
            })

            async function onSubmit(data: FormValues) {
                setIsLoading(true)
                let error: string | undefined
                if (data.diseaseName === row.original.name) {
                    error = await deleteDiseaseAction(row.original.id)
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
                        description: "Disease deleted successfully.",
                        variant: "default",
                    })
                }
            }

            type diseaseFormType = z.infer<typeof diseaseForm>

            const { register: registerEdit, handleSubmit: handleSubmitEdit, formState: { errors: errorsEdit } } = useForm<diseaseFormType>({
                resolver: zodResolver(diseaseForm),
                defaultValues: {
                    name: row.original.name.toString(),
                    description: row.original.description.toString()
                }
            })



            async function onSubmitEdit(data: diseaseFormType) {
                setIsLoading(true)

                const error = await updateDiseaseAction(row.original.id, data)

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
                        description: "Disease updated successfully.",
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
                                        <Label className="sr-only" htmlFor="diseaseName">
                                            Disease Name
                                        </Label>
                                        <Input
                                            id="diseaseName"
                                            placeholder={row.original.name.toString()}
                                            type="name"
                                            autoCapitalize="none"
                                            autoCorrect="off"
                                            disabled={isLoading}
                                            {...register("diseaseName")}
                                        />
                                        {errors?.diseaseName && (
                                            <p className="px-1 text-xs text-red-600">
                                                {errors.diseaseName.message}
                                            </p>
                                        )}
                                        <Button variant="destructive" type="submit" disabled={(watch().diseaseName !== row.original.name) || isLoading}>
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
                                        <DialogTitle>Editing disease: {row.original.name}</DialogTitle>
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
