"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { cn } from "@/lib/utils"
import { changeSelfPasswordSchema } from "@/lib/validations/auth"
import { buttonVariants } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "@/components/ui/use-toast"
import { Icons } from "@/components/icons"
import { authenticate } from "@/app/lib/actions"
import React, { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { changeSelfUserPasswordAction } from "@/app/lib/actions/auth"


interface UserChangePasswordFormProps extends React.HTMLAttributes<HTMLDivElement> { }

type FormData = z.infer<typeof changeSelfPasswordSchema>

export function UserChangePasswordForm({ className, ...props }: UserChangePasswordFormProps) {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormData>({
        resolver: zodResolver(changeSelfPasswordSchema),
    })
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const router = useRouter()

    async function onSubmit(data: FormData) {
        setIsLoading(true)

        const error = await changeSelfUserPasswordAction(data.currentPassword, data.newPassword)
        setIsLoading(false)

        if (error) {
            return toast({
                title: "Something went wrong.",
                description: error,
                variant: "destructive",
            })
        }

        router.back()
    }

    return (
        <div className={cn("grid gap-6", className)} {...props}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="grid gap-2">
                    <div className="grid gap-1">
                        <Label className="sr-only" htmlFor="currentPassword">
                            Current Password
                        </Label>
                        <Input
                            id="currentPassword"
                            placeholder="Current Password"
                            type="password"
                            disabled={isLoading}
                            {...register("currentPassword")}
                        />
                        {errors?.currentPassword && (
                            <p className="px-1 text-xs text-red-600">
                                {errors.currentPassword.message}
                            </p>
                        )}
                    </div>
                    <div className="grid gap-1">
                        <Label className="sr-only" htmlFor="password">
                            Password
                        </Label>
                        <Input
                            id="password"
                            placeholder="New Password"
                            type="password"
                            disabled={isLoading}
                            {...register("newPassword")}
                        />
                        {errors?.newPassword && (
                            <p className="px-1 text-xs text-red-600">
                                {errors.newPassword.message}
                            </p>
                        )}
                    </div>
                    <div className="grid gap-1">
                        <Label className="sr-only" htmlFor="confirmPassword">
                            Confirm Password
                        </Label>
                        <Input
                            id="confirmPassword"
                            placeholder="Confirm Password"
                            type="password"
                            disabled={isLoading}
                            {...register("confirmPassword")}
                        />
                        {errors?.confirmPassword && (
                            <p className="px-1 text-xs text-red-600">
                                {errors.confirmPassword.message}
                            </p>
                        )}
                    </div>
                    <button className={cn(buttonVariants())} disabled={isLoading}>
                        {isLoading && (
                            <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                        )}
                        Change Password
                    </button>
                </div>
            </form>
        </div>
    )
}