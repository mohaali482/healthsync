"use client"

import Link from "next/link"
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"


const linkRegexes = [
    { link: "/dashboard", regex: /^\/dashboard$/ },
    { link: "/dashboard/prediction", regex: /^\/dashboard\/prediction(\/result)?$/ },
    { link: "/dashboard/hospitals", regex: /^\/dashboard\/hospitals(\/(add|edit\/\d+|\d+))?$/ },
    { link: "/dashboard/equipment-types", regex: /^\/dashboard\/equipment-types$/ },
    { link: "/dashboard/diseases", regex: /^\/dashboard\/diseases$/ },
    { link: "/dashboard/users", regex: /^\/dashboard\/users(\/add)?$/ },
    { link: "/dashboard/equipment", regex: /^\/dashboard\/equipment$/ },
    { link: "/dashboard/resources", regex: /^\/dashboard\/resources$/ },
    { link: "/dashboard/reports", regex: /^\/dashboard\/reports$/ },
    { link: "/dashboard/human-resources", regex: /^\/dashboard\/human-resources$/ },
    { link: "/dashboard/data-encoders", regex: /^\/dashboard\/data-encoders$/ },
];



function SidebarLink({ icon, link, linkName, open, activeLinks }: { icon: React.ReactNode, link: string, linkName: string, open: boolean, activeLinks: string[]; }) {
    const pathname = usePathname()

    return (
        <Tooltip>
            <TooltipTrigger asChild>
                <Link
                    href={link}
                    className={
                        cn("flex h-9 py-5 w-full px-4 items-center justify-start rounded-lg transition-colors md:h-8 overflow-hidden",
                            linkRegexes.find(val => val.link === link)?.regex.test(pathname) ? "bg-accent text-accent-foreground" : "hover:bg-secondary/[0.2]"
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