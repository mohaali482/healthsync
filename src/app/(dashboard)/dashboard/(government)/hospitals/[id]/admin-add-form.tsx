"use client"

import { createHospitalAdminAction } from '@/app/lib/actions/hospital'
import { Icons } from '@/components/icons'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { toast } from '@/components/ui/use-toast'
import { hospitalAdminSchema } from '@/lib/validations/hospital'
import { zodResolver } from '@hookform/resolvers/zod'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

type hospitalAdmin = z.infer<typeof hospitalAdminSchema>

function AdminAddForm({ hospitalId, setOpen }: { hospitalId: number, setOpen: React.Dispatch<React.SetStateAction<boolean>> }) {
    const { register, handleSubmit, formState: { errors }, setError } = useForm<hospitalAdmin>({
        resolver: zodResolver(hospitalAdminSchema)
    })
    const [isLoading, setIsLoading] = useState(false);

    const onSubmit = async (data: hospitalAdmin) => {
        setIsLoading(true)
        const error = await createHospitalAdminAction(hospitalId, data);
        setIsLoading(false)

        if (error) {
            if (typeof error === "object") {
                return setError(error.key as (("email") | ("username")), { message: error.message })
            }
            return toast({
                title: "Error",
                description: error,
                variant: "destructive",
            })
        }

        toast({
            title: "Success",
            description: "Admin created successfully",
            variant: "default",
        })
        setOpen(false)
    }
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-2">
                <div className="w-full flex justify-between items-center gap-2">
                    <Label className='sr-only' htmlFor="first_name">
                        Name
                    </Label>
                    <div className="flex gap-2 w-full">
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
                <Button disabled={isLoading}>
                    {isLoading && (
                        <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                    )}
                    Add
                </Button>
            </div>
        </form >
    )
}

export default AdminAddForm