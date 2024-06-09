"use client"

import { hospitalEditSchema } from '@/lib/validations/hospital'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Icons } from '../icons'
import { cn } from '@/lib/utils'
import { buttonVariants } from '../ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card'
import { editHospitalAction } from '@/app/lib/actions/hospital'
import { toast } from '../ui/use-toast'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import { zodResolver } from '@hookform/resolvers/zod'

type HospitalFormData = z.infer<typeof hospitalEditSchema>

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

function HospitalEditForm({ hospitalId, hospitalData }: { hospitalId: number, hospitalData: HospitalFormData }) {
    const { register, handleSubmit, formState: { errors }, setValue } = useForm<HospitalFormData>({
        values: { ...hospitalData },
        resolver: zodResolver(hospitalEditSchema)
    })
    const [isLoading, setIsLoading] = useState(false);

    const onSubmit = async (data: HospitalFormData) => {
        setIsLoading(true)
        const error = await editHospitalAction(hospitalId, data);
        setIsLoading(false)

        if (error) {

            return toast({
                title: "Error",
                description: error,
                variant: "destructive",
            })

        }

        toast({
            title: "Success",
            description: "Hospital edited successfully",
        })
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Card className='max-w-[66%] ml-auto mr-auto'>
                <CardHeader>
                    <CardTitle>Edit hospital: {hospitalData.name}</CardTitle>
                    <CardDescription>Please fill out the following information carefully</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex flex-col items-center justify-center gap-4">
                        <div className="w-full">
                            <Label className='sr-only' htmlFor="name">
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
                        </div>

                        <div className="flex flex-col md:flex-row items-center justify-center gap-2 w-full">
                            <div className="w-full">
                                <Label className="sr-only" htmlFor="region">
                                    Region
                                </Label>
                                <Select
                                    disabled={isLoading}
                                    onValueChange={(value) => setValue("region", value)}
                                    defaultValue={hospitalData.region}
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
                            </div>
                        </div>

                        <div className="w-full">
                            <Label className="sr-only" htmlFor="woreda">
                                Woreda
                            </Label>
                            <Input
                                id="woreda"
                                placeholder="Woreda"
                                type="woreda"
                                autoCapitalize="none"
                                autoComplete="woreda"
                                autoCorrect="off"
                                disabled={isLoading}
                                {...register("woreda")}
                            />
                            {errors?.woreda && (
                                <p className="px-1 text-xs text-red-600">
                                    {errors.woreda.message}
                                </p>
                            )}
                        </div>


                        <div className="w-full">
                            <Label className="sr-only" htmlFor="zone">
                                Zone
                            </Label>
                            <Input
                                id="zone"
                                placeholder="Zone"
                                type="zone"
                                autoCapitalize="none"
                                autoComplete="zone"
                                autoCorrect="off"
                                disabled={isLoading}
                                {...register("zone")}
                            />
                            {errors?.zone && (
                                <p className="px-1 text-xs text-red-600">
                                    {errors.zone.message}
                                </p>
                            )}
                        </div>
                    </div>
                </CardContent>
                <CardFooter>
                    <button className={cn(buttonVariants())} disabled={isLoading}>
                        {isLoading && (
                            <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                        )}
                        Edit
                    </button>
                </CardFooter>
            </Card>
        </form>
    )
}

export default HospitalEditForm