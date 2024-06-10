import { Metadata } from "next"

import { UserChangePasswordForm } from "@/components/forms/UserChangePasswordForm"
import { auth } from "@/lib/auth"
import { redirect } from "next/navigation"
import { Stethoscope } from "lucide-react"

export const metadata: Metadata = {
    title: "Login",
    description: "Login to your account",
}

export default async function LoginPage() {
    const session = await auth()
    if (!session) return redirect("/login")


    return (
        <div className="container flex h-screen w-screen flex-col items-center justify-center">
            <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
                <div className="flex flex-col space-y-2 text-center">
                    <Stethoscope className="mx-auto h-6 w-6" />
                    <h1 className="text-2xl font-semibold tracking-tight">
                        Welcome back <span className="text-primary">{session.user.name}</span>
                    </h1>
                    <h1 className="text-xl font-semibold tracking-tight">
                        Change Password
                    </h1>
                    <p className="text-sm text-muted-foreground">
                        Enter your current and new password.
                    </p>
                </div>
                <UserChangePasswordForm />
            </div>
        </div>
    )
}