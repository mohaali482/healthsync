import { Icons } from "@/components/icons";
import { Suspense } from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <h1 className="text-2xl font-bold mb-2">List of all diseases</h1>
            <Suspense fallback=
                {
                    (
                        <div className="w-full h-full flex justify-center items-center">
                            <Icons.spinner size={30} className="mr-2 animate-spin" />
                        </div>
                    )
                }>
                {children}
            </Suspense>
        </>
    )
}