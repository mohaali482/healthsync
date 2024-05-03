import { cn } from '@/lib/utils'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

function HeaderLink({ icon, link, linkName }: { icon: React.ReactNode, link: string, linkName: string, }) {
    const pathname = usePathname()

    return (
        <Link
            href={link}
            className={cn("flex items-center gap-4 px-2.5", pathname === link ? "text-foreground" : "text-muted-foreground hover:text-foreground")}
        >
            {icon}
            {linkName}
        </Link>
    )
}

export default HeaderLink