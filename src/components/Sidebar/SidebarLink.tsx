"use client"

import Link from "next/link"
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

function SidebarLink({ icon, link, linkName, open }: { icon: React.ReactNode, link: string, linkName: string, open: boolean }) {
    const pathname = usePathname()

    return (
        <Tooltip>
            <TooltipTrigger asChild>
                <Link
                    href={link}
                    className={
                        cn("flex h-9 py-5 w-full px-4 items-center justify-start rounded-lg transition-colors md:h-8 overflow-hidden",
                            pathname === link ? "bg-accent text-accent-foreground" : "hover:bg-secondary/[0.2]"
                        )}>
                    {icon}
                    <span className={cn('pl-2 transition-all ease-in-out', !open && "sr-only")}>{linkName}</span>
                </Link>
            </TooltipTrigger>
            {!open && <TooltipContent side="right">{linkName}</TooltipContent>}
        </Tooltip>
    )
}

export default SidebarLink