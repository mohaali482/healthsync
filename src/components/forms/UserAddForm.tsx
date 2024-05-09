"use client"

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Icons } from '../icons'
import { cn } from '@/lib/utils'
import { buttonVariants } from '../ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card'
import { toast } from '../ui/use-toast'
import { roles, userAddSchema } from '@/lib/validations/auth'
import { addUserAction } from '@/app/lib/actions/auth'
import { zodResolver } from '@hookform/resolvers/zod'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'

type UserFormData = z.infer<typeof userAddSchema>

function UserAddForm() {
    const { register, handleSubmit, formState: { errors }, setError, setValue } = useForm<UserFormData>({
        resolver: zodResolver(userAddSchema)
    })
    const [isLoading, setIsLoading] = useState(false);

    const onSubmit = async (data: UserFormData) => {
        setIsLoading(true)
        const error = await addUserAction(data);
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
            description: "User added successfully",
        })
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Card className='max-w-[66%] ml-auto mr-auto'>
                <CardHeader>
                    <CardTitle>Add a new user</CardTitle>
                    <CardDescription>Please fill out the following information carefully</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex flex-col items-center justify-center gap-4">
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
                            <Label className="sr-only" htmlFor="email">
                                Role
                            </Label>

                            <Select name='role' onValueChange={(value) => setValue("role", value as any)} disabled={isLoading}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select a role" />
                                </SelectTrigger>
                                {errors?.role && (
                                    <p className="px-1 text-xs text-red-600">
                                        {errors.role.message}
                                    </p>
                                )}
                                <SelectContent>
                                    {roles.map(role => {
                                        if (role.includes("_")) {
                                            const [first, second] = role.split("_")

                                            return (
                                                <SelectItem value={role}>{first[0] + first.slice(1).toLowerCase() + " " + second[0] + second.slice(1).toLowerCase()}</SelectItem>
                                            )
                                        }
                                        return (
                                            <SelectItem value={role}>{role[0] + role.slice(1).toLowerCase()}</SelectItem>
                                        )
                                    })
                                    }
                                </SelectContent>
                            </Select>
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
                        <div className="w-full">
                            <Label className="sr-only" htmlFor="confirm_password">
                                Confirm Password
                            </Label>
                            <Input
                                id="confirm_password"
                                placeholder="Confirm Password"
                                type="password"
                                autoCapitalize="none"
                                autoCorrect="off"
                                disabled={isLoading}
                                {...register("confirm_password")}
                            />
                            {errors?.confirm_password && (
                                <p className="px-1 text-xs text-red-600">
                                    {errors.confirm_password.message}
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

export default UserAddForm