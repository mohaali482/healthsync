"use client"

import { cn } from "@/lib/utils"
import { useRouter } from "next/navigation"
import { buttonVariants } from "./ui/button"
import { Icons } from "./icons"

function BackButton() {
    const router = useRouter()
    return (
        <button
            onClick={() => router.back()}
            className={cn(
                buttonVariants({ variant: "ghost" }),
                "absolute left-4 top-4 md:left-8 md:top-8"
            )}
        >
            <>
                <Icons.chevronLeft className="mr-2 h-4 w-4" />
                Back
            </>
        </button>
    )
}

export default BackButton