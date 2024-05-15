"use client"

import { DataTable } from "@/components/data-table";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { columns, MedicalEquipmentStore, MedicalEquipment } from "./columns";
import { Button, buttonVariants } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { toast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";
import { medicalEquipmentStoreForm } from "@/lib/validations/medicalEquipmentStore";
import { createMedicalEquipmentStoreAction } from "@/app/lib/actions/medicalEquipmentStore";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

type medicalEquipmentStoreFormType = z.infer<typeof medicalEquipmentStoreForm>

export default function Table({ data, medicalEquipments }: { data: MedicalEquipmentStore[], medicalEquipments: MedicalEquipment[] }) {
    const { register,
        handleSubmit,
        formState: { errors },
        reset,
        setValue } = useForm<medicalEquipmentStoreFormType>({
            resolver: zodResolver(medicalEquipmentStoreForm)
        })
    const [isLoading, setIsLoading] = useState(false)
    const [isDialogOpen, setIsDialogOpen] = useState(false)

    useEffect(() => {
        if (!isDialogOpen) {
            reset()
        }
    }, [isDialogOpen, reset])

    const onSubmit = async (data: medicalEquipmentStoreFormType) => {
        setIsLoading(true)
        const error = await createMedicalEquipmentStoreAction(data)
        setIsLoading(false)

        if (error) {
            return toast({
                title: "Error",
                description: error,
                variant: "destructive"
            })
        }

        toast({
            title: "Success",
            description: "Equipment added successfully",
        })
        setIsDialogOpen(false)
        reset()
    }

    return (
        <Dialog open={isDialogOpen} defaultOpen={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <div className="container mx-auto py-10">
                <DataTable columns={columns} data={data} actionButton={
                    <DialogTrigger className={cn(buttonVariants({ variant: "default" }))}>
                        Add
                    </DialogTrigger>
                } />
            </div>

            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Add a new equipment</DialogTitle>
                    <DialogDescription className="text-current">
                        Insert the following information
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit(onSubmit)} className="py-2">
                    <div className="grid gap-1">
                        <Label className="sr-only" htmlFor="medicalEquipmentId">
                            Choose medical equipment
                        </Label>
                        <Select
                            disabled={isLoading}
                            onValueChange={(value) => setValue("medicalEquipmentId", parseInt(value))}
                        >
                            <SelectTrigger>
                                <SelectValue
                                    ref={register("medicalEquipmentId").ref}
                                    placeholder="Medical Equipment"
                                />
                            </SelectTrigger>
                            <SelectContent>
                                {medicalEquipments.map((val) => (
                                    <SelectItem key={val.id} value={`${val.id}`}>{val.name}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        {errors?.medicalEquipmentId && (
                            <p className="px-1 text-xs text-red-600">
                                {errors.medicalEquipmentId.message}
                            </p>
                        )}
                        <Label className="sr-only" htmlFor="quantity">
                            Quantity
                        </Label>
                        <Input
                            id="quantity"
                            placeholder="Quantity"
                            type="number"
                            disabled={isLoading}
                            {...register("quantity", { setValueAs: (value) => parseInt(value) })}
                        />
                        {errors?.quantity && (
                            <p className="px-1 text-xs text-red-600">
                                {errors.quantity.message}
                            </p>
                        )}
                        <Label className="sr-only" htmlFor="thresholdLevel">
                            Threshold Level
                        </Label>
                        <Input
                            id="thresholdLevel"
                            placeholder="Threshold Level"
                            type="number"
                            disabled={isLoading}
                            {...register("thresholdLevel", { setValueAs: (value) => parseInt(value) })}
                        />
                        {errors?.thresholdLevel && (
                            <p className="px-1 text-xs text-red-600">
                                {errors.thresholdLevel.message}
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