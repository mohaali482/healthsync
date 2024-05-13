"use client"

import { DataTable } from "@/components/data-table";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { columns, MedicalEquipment } from "./columns";
import { Button, buttonVariants } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { set, z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { createMedicalEquipmentAction } from "@/app/lib/actions/equipment-types";
import { equipmentForm } from "@/lib/validations/medicalEquipments";
import { toast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";

type equipmentFormType = z.infer<typeof equipmentForm>

export default function Table({ data }: { data: MedicalEquipment[] }) {
    const { register, handleSubmit, formState: { errors }, reset } = useForm<equipmentFormType>({
        resolver: zodResolver(equipmentForm)
    })
    const [isLoading, setIsLoading] = useState(false)
    const [isDialogOpen, setIsDialogOpen] = useState(false)

    const onSubmit = async (data: equipmentFormType) => {
        setIsLoading(true)
        const error = await createMedicalEquipmentAction(data)
        setIsLoading(false)

        if (error) {
            toast({
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
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="grid gap-1">
                        <Label className="sr-only" htmlFor="name">
                            Name
                        </Label>
                        <Input
                            id="name"
                            placeholder="Name"
                            type="name"
                            autoCapitalize="none"
                            autoComplete="name"
                            autoCorrect="off"
                            disabled={isLoading}
                            {...register("name")}
                        />
                        {errors?.name && (
                            <p className="px-1 text-xs text-red-600">
                                {errors.name.message}
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
                            autoComplete="description"
                            autoCorrect="off"
                            disabled={isLoading}
                            {...register("description")}
                        />
                        {errors?.description && (
                            <p className="px-1 text-xs text-red-600">
                                {errors.description.message}
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