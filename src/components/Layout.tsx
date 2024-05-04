"use client"

import React, { useState } from 'react'
import Header from './Header/Header'
import { TooltipProvider } from './ui/tooltip'
import Sidebar from './Sidebar/Sidebar'
import { cn } from '@/lib/utils'

function Layout({ links, children }: {
    links: {
        link: string;
        linkName: string;
        icon: React.ReactNode
        activeLinks: string[];
    }[], children: React.ReactNode
}) {
    const [open, setOpen] = useState(true)

    return (
        <TooltipProvider>
            <Sidebar links={links} open={open} setOpen={setOpen} />

            <div className={cn("flex flex-col sm:gap-4 md:py-4 transition-[width]", open ? "md:pl-64" : "md:pl-24")}>
                <Header links={links} />
                <main className="p-4 sm:px-6 sm:py-0 md:gap-8">
                    {children}
                </main>
            </div>
        </TooltipProvider>
    )
}

export default Layout