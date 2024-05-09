"use client"

import { hospitalSchema } from '@/lib/validations/hospital'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Icons } from '../icons'
import { cn } from '@/lib/utils'
import { buttonVariants } from '../ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card'
import { Separator } from '../ui/separator'
import { createHospitalAction } from '@/app/lib/actions/hospital'
import { toast } from '../ui/use-toast'
import { zodResolver } from '@hookform/resolvers/zod'

type HospitalFormData = z.infer<typeof hospitalSchema>

function HospitalAddForm() {
    const { register, handleSubmit, formState: { errors }, setError, reset } = useForm<HospitalFormData>({
        resolver: zodResolver(hospitalSchema)
    })
    const [isLoading, setIsLoading] = useState(false);

    const onSubmit = async (data: HospitalFormData) => {
        setIsLoading(true)
        const error = await createHospitalAction(data);
        setIsLoading(false)

        if (error) {
            if (typeof error === "object") {
                return setError(error.key as (("email") | ("username")), { message: error.message })
            } else {
                return toast({
                    title: "Error",
                    description: error,
                    variant: "destructive",
                })
            }
        }

        toast({
            title: "Success",
            description: "Hospital added successfully",
        })
        reset()
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Card className='max-w-[66%] ml-auto mr-auto'>
                <CardHeader>
                    <CardTitle>Add a new hospital</CardTitle>
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
                        <Separator />
                        <div className='flex w-full'>
                            <p>Hospital admin details</p>
                        </div>
                        <div className="w-full flex justify-between items-center gap-2">
                            <Label className='sr-only' htmlFor="first_name">
                                Name
                            </Label>
                            <div className="flex flex-col w-full">
                                <Input
                                    id="first_name"
                                    placeholder="First Name"
                                    type="first_name"
                                    autoCapitalize="none"
                                    autoComplete="first_name"
                                    autoCorrect="off"
                                    disabled={isLoading}
                                    {...register("first_name")}
                                />
                                {errors?.first_name && (
                                    <p className="px-1 text-xs text-red-600">
                                        {errors.first_name.message}
                                    </p>
                                )}
                            </div>
                            <div className="flex flex-col w-full">
                                <Input
                                    id="last_name"
                                    placeholder="Last Name"
                                    type="last_name"
                                    autoCapitalize="none"
                                    autoComplete="last_name"
                                    autoCorrect="off"
                                    disabled={isLoading}
                                    {...register("last_name")}
                                />
                                {errors?.last_name && (
                                    <p className="px-1 text-xs text-red-600">
                                        {errors.last_name.message}
                                    </p>
                                )}
                            </div>
                        </div>
                        <div className="w-full">
                            <Label className="sr-only" htmlFor="username">
                                Username
                            </Label>
                            <Input
                                id="username"
                                placeholder="Username"
                                type="username"
                                autoCapitalize="none"
                                autoComplete="username"
                                autoCorrect="off"
                                disabled={isLoading}
                                {...register("username")}
                            />
                            {errors?.username && (
                                <p className="px-1 text-xs text-red-600">
                                    {errors.username.message}
                                </p>
                            )}
                        </div>
                        <div className="w-full">
                            <Label className="sr-only" htmlFor="email">
                                Email
                            </Label>
                            <Input
                                id="email"
                                placeholder="Email"
                                type="email"
                                autoCapitalize="none"
                                autoComplete="email"
                                autoCorrect="off"
                                disabled={isLoading}
                                {...register("email")}
                            />
                            {errors?.email && (
                                <p className="px-1 text-xs text-red-600">
                                    {errors.email.message}
                                </p>
                            )}
                        </div>
                        <div className="w-full">
                            <Label className="sr-only" htmlFor="password">
                                Password
                            </Label>
                            <Input
                                id="password"
                                placeholder="Password"
                                type="password"
                                autoCapitalize="none"
                                autoComplete="password"
                                autoCorrect="off"
                                disabled={isLoading}
                                {...register("password")}
                            />
                            {errors?.password && (
                                <p className="px-1 text-xs text-red-600">
                                    {errors.password.message}
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

export default HospitalAddForm