"use client"

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { Disease } from "../diseases/columns";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Label } from "@/components/ui/label";

const regions = [
    { name: "Addis Ababa", value: "addis_ababa" },
    { name: "Amhara", value: "amhara" },
    { name: "Oromia", value: "oromia" },
    { name: "Tigray", value: "tigray" },
    { name: "Somali", value: "somali" },
    { name: "Afar", value: "afar" },
    { name: "Diredawa", value: "diredawa" },
    { name: "Debub", value: "debub" },
    { name: "Gambela", value: "gambela" },
    { name: "B_gumuz", value: "b_gumuz" },
    { name: "Harari", value: "harari" },
]
const formSchema = z.object({
    region: z.string().min(1, { message: "This field is required" }),
    disease: z.string().min(1, { message: "This field is required" }),
    startDate: z.string().min(1, { message: "This field is required" }),
    endDate: z.string().min(1, { message: "This field is required" }),
})

type FormType = z.infer<typeof formSchema>

export default function Form({ disease }: { disease: Disease[] }) {
    const router = useRouter()

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors, isValid }
    } = useForm<FormType>({
        resolver: zodResolver(formSchema)
    })

    async function onSubmit(data: FormType) {
        router.push("/dashboard/prediction/result?region=" + data.region + "&startDate=" + data.startDate + "&endDate=" + data.endDate + "&disease=" + data.disease)
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Card className='max-w-[66%] ml-auto mr-auto'>
                <CardHeader>
                    <CardTitle>Request a prediction</CardTitle>
                    <CardDescription>Please fill out the following information carefully</CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col gap-4">
                    <Select
                        onValueChange={(value) => setValue("disease", value)}
                    >
                        <SelectTrigger>
                            <SelectValue
                                ref={register("disease").ref}
                                placeholder="Disease"
                            />
                        </SelectTrigger>
                        <SelectContent>
                            {disease.map((val) => (
                                <SelectItem key={val.id} value={`${val.id}`}>{val.name}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    {errors?.disease && (
                        <p className="px-1 text-xs text-red-600">
                            {errors.disease.message}
                        </p>
                    )}

                    <Select
                        onValueChange={(value) => setValue("region", value)}
                    >
                        <SelectTrigger>
                            <SelectValue
                                ref={register("region").ref}
                                placeholder="Region"
                            />
                        </SelectTrigger>
                        <SelectContent>
                            {regions.map((val, index) => (
                                <SelectItem key={index} value={val.value}>{val.name}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>

                    {errors?.region && (
                        <p className="px-1 text-xs text-red-600">
                            {errors.region.message}
                        </p>
                    )}

                    <div className="flex items-center gap-2">
                        <Label htmlFor="startDate" className="w-[100px]">
                            Start Date
                        </Label>

                        <Input
                            id="startDate"
                            placeholder="Start Date"
                            type="date"
                            {...register("startDate")}
                        />

                    </div>

                    {errors?.startDate && (
                        <p className="px-1 text-xs text-red-600">
                            {errors.startDate.message}
                        </p>
                    )}

                    <div className="flex items-center">
                        <Label className="w-[100px]" htmlFor="endDate">
                            End Date
                        </Label>


                        <Input
                            id="endDate"
                            placeholder="Start Date"
                            type="date"

                            {...register("endDate")}
                        />

                    </div>
                    {errors?.endDate && (
                        <p className="px-1 text-xs text-red-600">
                            {errors.endDate.message}
                        </p>
                    )}

                    <Button variant="secondary" type="submit" >
                        Predict
                    </Button>
                </CardContent>
            </Card>
        </form >

    )
}