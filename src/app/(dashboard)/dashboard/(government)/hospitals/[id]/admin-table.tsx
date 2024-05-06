"use client"

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import React, { useState } from 'react'
import { DataTable } from '../(index)/data-table'
import { columns as adminColumns } from './admin-columns'
import AdminAddForm from './admin-add-form'
import { cn } from '@/lib/utils'
import { buttonVariants } from '@/components/ui/button'

function AdminTable({ hospital }: { hospital: any }) {
    const [open, setOpen] = useState(false);

    return (
        <div>
            <Dialog defaultOpen={open} open={open} onOpenChange={setOpen}>
                <div className="pb-10">
                    <h1 className="font-bold pb-2">Admins</h1>
                    <DataTable data={hospital.admins} columns={adminColumns} actionButton={<DialogTrigger className={cn(buttonVariants({ variant: "default" }))}>Add</DialogTrigger>} />
                </div>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle className='pb-4'>Add an admin</DialogTitle>
                        <DialogDescription>
                            <AdminAddForm hospitalId={hospital.id} setOpen={setOpen} />
                        </DialogDescription>
                    </DialogHeader>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default AdminTable