"use client"

import { DataTable } from "@/components/data-table";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { columns, HumanResource } from "./columns";
import { Button, buttonVariants } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { toast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { humanResourceForm, humanResourceType } from "@/lib/validations/human-resource";
import { createHumanResourceAction } from "@/app/lib/actions/human-resource";

type humanResourceFormType = z.infer<typeof humanResourceForm>

export default function Table({ data }: { data: HumanResource[] }) {
    const { register, handleSubmit, formState: { errors }, reset, setValue } = useForm<humanResourceFormType>({
        resolver: zodResolver(humanResourceForm)
    })
    const [isLoading, setIsLoading] = useState(false)
    const [isDialogOpen, setIsDialogOpen] = useState(false)

    const onSubmit = async (data: humanResourceFormType) => {
        setIsLoading(true)
        const error = await createHumanResourceAction(data)
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
            description: "Human resource added successfully",
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
                    <DialogTitle>Add a new human resource</DialogTitle>
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

                        <Select name='type' onValueChange={(value) => setValue("type", value as any)} disabled={isLoading}>
                            <SelectTrigger>
                                <SelectValue placeholder="Select the human resource type" />
                            </SelectTrigger>
                            {errors?.type && (
                                <p className="px-1 text-xs text-red-600">
                                    {errors.type.message}
                                </p>
                            )}
                            <SelectContent>
                                {humanResourceType.map(type => {
                                    if (type.includes("_")) {
                                        const [first, second] = type.split("_")

                                        return (
                                            <SelectItem value={type}>{first[0] + first.slice(1).toLowerCase() + " " + second[0] + second.slice(1).toLowerCase()}</SelectItem>
                                        )
                                    }
                                    return (
                                        <SelectItem value={type}>{type[0] + type.slice(1).toLowerCase()}</SelectItem>
                                    )
                                })
                                }
                            </SelectContent>
                        </Select>

                        <Button variant="secondary" type="submit" disabled={isLoading}>
                            {isLoading ? "Adding..." : "Add"}
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    )
}