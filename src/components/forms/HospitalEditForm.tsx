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

type HospitalFormData = z.infer<typeof hospitalEditSchema>

function HospitalEditForm({ hospitalId, hospitalData }: { hospitalId: number, hospitalData: HospitalFormData }) {
    const { register, handleSubmit, formState: { errors } } = useForm<HospitalFormData>({ values: { ...hospitalData } })
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
                                <Label className="sr-only" htmlFor="city">
                                    City
                                </Label>
                                <Input
                                    id="city"
                                    placeholder="City"
                                    type="city"
                                    autoCapitalize="none"
                                    autoComplete="city"
                                    autoCorrect="off"
                                    disabled={isLoading}
                                    {...register("city")}
                                />
                                {errors?.city && (
                                    <p className="px-1 text-xs text-red-600">
                                        {errors.city.message}
                                    </p>
                                )}
                            </div>
                            <div className="w-full">
                                <Label className="sr-only" htmlFor="region">
                                    Region
                                </Label>
                                <Input
                                    id="region"
                                    placeholder="Region"
                                    type="region"
                                    autoCapitalize="none"
                                    autoComplete="region"
                                    autoCorrect="off"
                                    disabled={isLoading}
                                    {...register("region")}
                                />
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
                        Add
                    </button>
                </CardFooter>
            </Card>
        </form>
    )
}

export default HospitalEditForm