"use client"

import { DataTable } from "@/components/data-table";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { columns, Disease } from "./columns";
import { Button, buttonVariants } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { toast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";
import { diseaseForm } from "@/lib/validations/diseases";
import { createDiseaseAction } from "@/app/lib/actions/diseases";

type diseaseFormType = z.infer<typeof diseaseForm>

export default function Table({ data }: { data: Disease[] }) {
    const { register, handleSubmit, formState: { errors }, reset } = useForm<diseaseFormType>({
        resolver: zodResolver(diseaseForm)
    })
    const [isLoading, setIsLoading] = useState(false)
    const [isDialogOpen, setIsDialogOpen] = useState(false)

    const onSubmit = async (data: diseaseFormType) => {
        setIsLoading(true)
        const error = await createDiseaseAction(data)
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
            description: "Disease added successfully",
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
                    <DialogTitle>Add a new disease</DialogTitle>
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