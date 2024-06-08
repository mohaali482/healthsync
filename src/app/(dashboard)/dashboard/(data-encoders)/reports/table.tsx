"use client"

import { DataTable } from "@/components/data-table";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { columns, Report } from "./columns";
import { Button, buttonVariants } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { toast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";
import { createDiseaseAction } from "@/app/lib/actions/diseases";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { reportsForm } from "@/lib/validations/reports";
import { createReportAction } from "@/app/lib/actions/reports";
import { Disease } from "../../(government)/diseases/columns";

type reportFormType = z.infer<typeof reportsForm>

export default function Table({ data, diseases }: { data: Report[], diseases: Disease[] }) {
    const { register, handleSubmit, formState: { errors }, reset, setValue } = useForm<reportFormType>({
        resolver: zodResolver(reportsForm)
    })
    const [isLoading, setIsLoading] = useState(false)
    const [isDialogOpen, setIsDialogOpen] = useState(false)

    const onSubmit = async (data: reportFormType) => {
        setIsLoading(true)
        const error = await createReportAction(data)
        setIsLoading(false)

        if (error !== undefined) {
            return toast({
                title: "Error",
                description: error,
                variant: "destructive"
            })
        }

        toast({
            title: "Success",
            description: "Report added successfully",
        })
        setIsDialogOpen(false)
        reset()
    }
    return (
        <Dialog open={isDialogOpen} defaultOpen={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <div className="container mx-auto py-10">
                <DataTable columns={columns} data={data} diseases={diseases} actionButton={
                    <DialogTrigger className={cn(buttonVariants({ variant: "default" }))}>
                        Add
                    </DialogTrigger>
                } />
            </div>

            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Add a new report</DialogTitle>
                    <DialogDescription className="text-current">
                        Insert the following information
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="grid gap-1">
                        <Select
                            disabled={isLoading}
                            onValueChange={(value) => setValue("diseaseId", parseInt(value))}
                        >
                            <SelectTrigger>
                                <SelectValue
                                    ref={register("diseaseId").ref}
                                    placeholder="Disease"
                                />
                            </SelectTrigger>
                            <SelectContent>
                                {diseases.map((val) => (
                                    <SelectItem key={val.id} value={`${val.id}`}>{val.name}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        {errors?.diseaseId && (
                            <p className="px-1 text-xs text-red-600">
                                {errors.diseaseId.message}
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
                            {...register("confirmedCase", { setValueAs: (value) => parseInt(value) })}

                        />
                        {errors?.confirmedCase && (
                            <p className="px-1 text-xs text-red-600">
                                {errors.confirmedCase.message}
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
                            {...register("confirmedDeath", { setValueAs: (value) => parseInt(value) })}
                        />
                        {errors?.confirmedDeath && (
                            <p className="px-1 text-xs text-red-600">
                                {errors.confirmedDeath.message}
                            </p>
                        )}

                        <Label className="sr-only" htmlFor="confirmedDeath">
                            Report Date
                        </Label>
                        <Input
                            id="reportDate"
                            placeholder="Report Date"
                            type="date"
                            disabled={isLoading}
                            {...register("reportDate")}
                        />
                        {errors?.reportDate && (
                            <p className="px-1 text-xs text-red-600">
                                {errors.reportDate.message}
                            </p>
                        )}
                        <Button variant="secondary" type="submit" disabled={isLoading}>
                            {isLoading ? "Adding..." : "Add"}
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    )
}