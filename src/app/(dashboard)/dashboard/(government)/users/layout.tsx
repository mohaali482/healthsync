import { Icons } from "@/components/icons";
import { Suspense } from "react";

export default function layout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <h1 className="text-xl font-semibold">List of all users</h1>
            <Suspense fallback=
                {
                    (
                        <div className="w-full h-full flex justify-center items-center text-primary">
                            <Icons.spinner size={30} className="mr-2 animate-spin" />
                        </div>
                    )
                }>
                {children}
            </Suspense>
        </>
    )
}