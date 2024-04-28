"use client"

import React from 'react'
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from './ui/breadcrumb'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

function DefaultBreadcrumb() {
    const paths = usePathname()
    const pathNames = paths.split("/").filter(path => path)
    return (
        <Breadcrumb className="hidden md:flex">
            <BreadcrumbList>
                {
                    pathNames.map((link, index) =>
                        <>
                            <BreadcrumbItem>
                                {index + 1 == pathNames.length ?
                                    <BreadcrumbPage>{link[0].toUpperCase() + link.slice(1)}</BreadcrumbPage> :
                                    <BreadcrumbLink asChild>
                                        <Link href={`/${pathNames.slice(0, index + 1).join('/')}`}>{link[0].toUpperCase() + link.slice(1)}</Link>
                                    </BreadcrumbLink>
                                }
                            </BreadcrumbItem>
                            {index + 1 < pathNames.length ? <BreadcrumbSeparator /> : null}
                        </>
                    )}
            </BreadcrumbList>
        </Breadcrumb>
    )
}

export default DefaultBreadcrumb