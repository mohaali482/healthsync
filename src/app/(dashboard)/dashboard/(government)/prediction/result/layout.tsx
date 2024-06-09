import { Icons } from "@/components/icons";
import { Suspense } from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <>
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