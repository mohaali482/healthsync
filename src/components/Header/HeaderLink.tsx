import { getAlertCount } from '@/app/lib/actions/medicalEquipmentStore';
import { cn } from '@/lib/utils'
import { useQuery } from '@tanstack/react-query';
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'
import { Badge } from '../ui/badge';

const linkRegexes = [
    { link: "/dashboard", regex: /^\/dashboard$/ },
    { link: "/dashboard/prediction", regex: /^\/dashboard\/prediction(\/result)?$/ },
    { link: "/dashboard/hospitals", regex: /^\/dashboard\/hospitals(\/(add|edit\/\d+|\d+))?$/ },
    { link: "/dashboard/equipment-types", regex: /^\/dashboard\/equipment-types$/ },
    { link: "/dashboard/diseases", regex: /^\/dashboard\/diseases$/ },
    { link: "/dashboard/alerts", regex: /^\/dashboard\/alerts$/ },
    { link: "/dashboard/users", regex: /^\/dashboard\/users(\/add)?$/ },
    { link: "/dashboard/equipment", regex: /^\/dashboard\/equipment$/ },
    { link: "/dashboard/resources", regex: /^\/dashboard\/resources$/ },
    { link: "/dashboard/reports", regex: /^\/dashboard\/reports$/ },
    { link: "/dashboard/human-resources", regex: /^\/dashboard\/human-resources$/ },
    { link: "/dashboard/data-encoders", regex: /^\/dashboard\/data-encoders(\/add)?$/ },
];


function HeaderLink({ icon, link, linkName, activeLinks }: { icon: React.ReactNode, link: string, linkName: string, activeLinks: string[]; }) {
    const pathname = usePathname()
    if (link === "/dashboard/alerts") {
        return <AlertLink icon={icon} link={link} linkName={linkName} activeLinks={activeLinks} />
    }

    return (
        <Link
            href={link}
            className={cn("flex items-center gap-4 px-2.5", linkRegexes.find(val => val.link === link)?.regex.test(pathname) ? "text-foreground" : "text-muted-foreground hover:text-foreground")}
        >
            {icon}
            {linkName}
        </Link>
    )
}


function AlertLink({ icon, link, linkName, activeLinks }: { icon: React.ReactNode, link: string, linkName: string, activeLinks: string[]; }) {
    const { data } = useQuery({ queryKey: ['alerts'], queryFn: () => getAlertCount(), refetchInterval: 100 })
    const pathname = usePathname()

    return (
        <Link
            href={link}
            className={cn("flex items-center gap-4 px-2.5", linkRegexes.find(val => val.link === link)?.regex.test(pathname) ? "text-foreground" : "text-muted-foreground hover:text-foreground")}
        >
            {icon}
            {linkName}
            {(data !== undefined && data > 0) && <Badge variant="destructive">{data}</Badge>}
        </Link>
    )
}

export default HeaderLink