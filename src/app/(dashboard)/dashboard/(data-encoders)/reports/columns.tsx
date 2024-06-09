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
import { Disease } from "../../(government)/diseases/columns";
import { reportsForm } from "@/lib/validations/reports";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { deleteReportAction, updateReportAction } from "@/app/lib/actions/reports";


export type Report = {
    id: number;
    disease: Disease;
    confirmedCase: number;
    confirmedDeath: number;
    reportDate: Date;
}

export const columns: ColumnDef<Report>[] = [
    {
        accessorKey: "disease.name",
        header: ({ column }) => {
            return (
                <button className="flex p-2 rounded hover:bg-secondary/5"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Disease Name
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </button>
            )
        },
    },
    {
        accessorKey: "confirmedCase",
        header: ({ column }) => {
            return (
                <button className="flex p-2 rounded hover:bg-secondary/5"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Confirmed Case
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </button>
            )
        },
    },
    {
        accessorKey: "confirmedDeath",
        header: ({ column }) => {
            return (
                <button className="flex p-2 rounded hover:bg-secondary/5"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Confirmed Death
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </button>
            )
        },
    },
    {
        accessorKey: "reportDate",
        header: ({ column }) => {
            return (
                <button className="flex p-2 rounded hover:bg-secondary/5"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Report Date
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </button>
            )
        },
        cell: ({ row }) => {
            return new Date(row.original.reportDate).toLocaleDateString()
        }
    },
    {
        id: "actions",
        cell: ({ row, table }) => {
            const [isDialogOpen, setIsDialogOpen] = useState(false)
            const [isLoading, setIsLoading] = useState(false)
            const [openedDialog, setOpenedDialog] = useState<"Edit" | "Delete" | null>()


            async function handleDelete() {
                setIsLoading(true)
                let error = await deleteReportAction(row.original.id)
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
                        description: "Report deleted successfully.",
                        variant: "default",
                    })
                }
            }

            type reportFormType = z.infer<typeof reportsForm>

            const {
                register: registerEdit,
                handleSubmit: handleSubmitEdit,
                formState: { errors: errorsEdit },
                setValue
            } = useForm<reportFormType>({
                resolver: zodResolver(reportsForm),
                defaultValues: {
                    diseaseId: row.original.disease.id,
                    confirmedCase: row.original.confirmedCase,
                    confirmedDeath: row.original.confirmedDeath,
                }
            })



            async function onSubmitEdit(data: reportFormType) {
                setIsLoading(true)

                const error = await updateReportAction(row.original.id, data)

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
                        description: "Report updated successfully.",
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
                                        <p>Are you sure?</p>
                                        <p>
                                            You are deleting the report for date: <span className="font-bold">{row.original.reportDate.toLocaleString()}</span>
                                        </p>
                                        <p>
                                            <p>
                                                Confirmed case: <span className="font-bold">{row.original.confirmedCase}</span>
                                            </p>
                                            <p>
                                                Confirmed death: <span className="font-bold">{row.original.confirmedDeath}</span>
                                            </p>
                                        </p>
                                    </DialogDescription>
                                </DialogHeader>

                                <Button variant="destructive" onClick={handleDelete} disabled={isLoading}>
                                    {isLoading ? "Deleting..." : "Delete"}
                                </Button>
                            </>
                        )
                        }
                        {
                            openedDialog === "Edit" && (
                                <>
                                    <DialogHeader>
                                        <DialogTitle>Editing report: {row.original.reportDate.toLocaleDateString()}</DialogTitle>
                                        <DialogDescription className="text-current">
                                            Insert the correct information
                                        </DialogDescription>
                                    </DialogHeader>
                                    <form onSubmit={handleSubmitEdit(onSubmitEdit)}>
                                        <div className="grid gap-1">
                                            <Label className="sr-only" htmlFor="diseaseId">
                                                Change disease
                                            </Label>
                                            <Select
                                                disabled={isLoading}
                                                defaultValue={row.original.disease.id.toString()}
                                                onValueChange={(value) => setValue("diseaseId", parseInt(value))}
                                            >
                                                <SelectTrigger>
                                                    <SelectValue
                                                        ref={registerEdit("diseaseId").ref}
                                                        placeholder="Medical Equipment"
                                                    />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {table.options.meta?.diseases!.map((val) => (
                                                        <SelectItem key={val.id} value={`${val.id}`}>{val.name}</SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                            {errorsEdit?.diseaseId && (
                                                <p className="px-1 text-xs text-red-600">
                                                    {errorsEdit.diseaseId.message}
                                                </p>
                                            )}
                                            <Label className="sr-only" htmlFor="confirmedCase">
                                                Confirmed Case
                                            </Label>
                                            <Input
                                                id="confirmedCase"
                                                placeholder="Confirmed Case"
                                                type="number"
                                                disabled={isLoading}
                                                {...registerEdit("confirmedCase", { setValueAs: (value) => parseInt(value) })}
                                            />
                                            {errorsEdit?.confirmedCase && (
                                                <p className="px-1 text-xs text-red-600">
                                                    {errorsEdit.confirmedCase.message}
                                                </p>
                                            )}

                                            <Label className="sr-only" htmlFor="confirmedDeath">
                                                Confirmed Death
                                            </Label>
                                            <Input
                                                id="confirmedDeath"
                                                placeholder="Confirmed Death"
                                                type="number"
                                                disabled={isLoading}
                                                {...registerEdit("confirmedDeath", { setValueAs: (value) => parseInt(value) })}
                                            />
                                            {errorsEdit?.confirmedDeath && (
                                                <p className="px-1 text-xs text-red-600">
                                                    {errorsEdit.confirmedDeath.message}
                                                </p>
                                            )}

                                            <Label className="sr-only" htmlFor="confirmedDeath">
                                                Report Date
                                            </Label>
                                            <Input
                                                id="reportDate"
                                                placeholder="Report Date"
                                                type="date"
                                                max={new Date().toISOString().substring(0, 10)}
                                                disabled={isLoading}
                                                {...registerEdit("reportDate")}
                                                defaultValue={row.original.reportDate.toISOString().substring(0, 10)}
                                            />
                                            {errorsEdit?.reportDate && (
                                                <p className="px-1 text-xs text-red-600">
                                                    {errorsEdit.reportDate.message}
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
