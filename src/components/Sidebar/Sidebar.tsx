import Link from 'next/link'
import React, { SetStateAction } from 'react'
import { PanelLeftClose, PanelLeftOpen, Stethoscope } from 'lucide-react'
import SidebarLink from './SidebarLink'
import { cn } from '@/lib/utils'


function Sidebar({ links, open, setOpen }: {
    links: {
        link: string;
        linkName: string;
        icon: React.ReactNode
        activeLinks: string[];
    }[],
    open: boolean, setOpen: React.Dispatch<SetStateAction<boolean>>
}) {
    return (
        <aside className={cn("fixed inset-y-0 left-0 z-10 hidden flex-col border-r bg-background md:flex transition-[width] ease-in-out", open ? "w-64" : "w-24")}>
            <nav className="flex flex-col items-start gap-4 px-4 sm:py-4">
                <div className={cn('flex items-center gap-4 justify-center mb-10', !open && "w-full")}>
                    <div className='rounded-full bg-primary h-9 w-9 text-primary-foreground flex shrink-0 items-center justify-center'>
                        <Stethoscope className="h-4 w-4 transition-all group-hover:scale-110" />
                    </div>
                    <Link
                        href="/dashboard"
                        className={cn("flex items-center text-lg font-semibold md:h-8 md:text-base", !open && "hidden")}
                    >
                        HealthSync
                    </Link>
                    <div
                        className='absolute right-[-20px] flex items-center justify-center h-10 w-10 bg-primary text-primary-foreground rounded-full cursor-pointer'
                        onClick={() => setOpen(!open)}
                    >
                        {open ?
                            <PanelLeftClose />
                            :
                            <PanelLeftOpen />
                        }
                    </div>
                </div>

                {links.map((link, index) => <SidebarLink key={index} open={open} {...link} />)}
            </nav>
        </aside>
    )
}


export default Sidebar