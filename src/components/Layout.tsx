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
        icon: JSX.Element;
    }[], children: React.ReactNode
}) {
    const [open, setOpen] = useState(true)

    return (
        <TooltipProvider>
            <Sidebar links={links} open={open} setOpen={setOpen} />

            <div className={cn("flex flex-col sm:gap-4 sm:py-4 transition-[width]", open ? "sm:pl-64" : "sm:pl-24")}>
                <Header links={links} />
                <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 lg:grid-cols-3 xl:grid-cols-3">
                    {children}
                </main>
            </div>
        </TooltipProvider>
    )
}

export default Layout