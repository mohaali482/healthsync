"use client"

import { DataTable } from "@/components/data-table";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { columns, Resource } from "./columns";
import { columns as dataEncodersColumns } from "./data-encoders-columns";
import { Button, buttonVariants } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { toast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";
import { assetAddForm, assetTypes } from "@/lib/validations/assets";
import { createResourceAction } from "@/app/lib/actions/assets";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

type assetFormType = z.infer<typeof assetAddForm>

export default function Table({ data, userRole }: { data: Resource[], userRole: string }) {
    const { register, handleSubmit, formState: { errors }, reset, setValue } = useForm<assetFormType>({
        resolver: zodResolver(assetAddForm)
    })
    const [isLoading, setIsLoading] = useState(false)
    const [isDialogOpen, setIsDialogOpen] = useState(false)

    const onSubmit = async (data: assetFormType) => {
        setIsLoading(true)
        const error = await createResourceAction(data)
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
            description: "Resource added successfully",
        })
        setIsDialogOpen(false)
        reset()
    }

    return (
        <Dialog open={isDialogOpen} defaultOpen={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <div className="container mx-auto py-10">
                <DataTable columns={userRole === "HOSPITAL_ADMIN" ? columns : dataEncodersColumns} data={data} actionButton={
                    userRole === "HOSPITAL_ADMIN" && (
                        <DialogTrigger className={cn(buttonVariants({ variant: "default" }))}>
                            Add
                        </DialogTrigger>
                    )
                } />
            </div>

            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Add a new resource</DialogTitle>
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
                        <Select name='assetType' onValueChange={(value) => setValue("assetType", value as any)} disabled={isLoading}>
                            <SelectTrigger>
                                <SelectValue placeholder="Select the asset type" />
                            </SelectTrigger>
                            {errors?.assetType && (
                                <p className="px-1 text-xs text-red-600">
                                    {errors.assetType.message}
                                </p>
                            )}
                            <SelectContent>
                                {assetTypes.map(assetType => {
                                    if (assetType.includes("_")) {
                                        const [first, second] = assetType.split("_")

                                        return (
                                            <SelectItem value={assetType}>{first[0] + first.slice(1).toLowerCase() + " " + second[0] + second.slice(1).toLowerCase()}</SelectItem>
                                        )
                                    }
                                    return (
                                        <SelectItem value={assetType}>{assetType[0] + assetType.slice(1).toLowerCase()}</SelectItem>
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
                            {...register("quantity", { setValueAs: (value) => parseInt(value) })}
                        />
                        {errors?.quantity && (
                            <p className="px-1 text-xs text-red-600">
                                {errors.quantity.message}
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