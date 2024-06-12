"use client"

import React, { useState } from 'react'
import { DataTable } from '@/components/data-table'
import { columns as adminColumns } from './admin-columns'

function AdminTable({ hospital }: { hospital: any }) {
    const [open, setOpen] = useState(false);

    return (
        <div>
            <div className="pb-10">
                <h1 className="font-bold pb-2">Admins</h1>
                <DataTable data={hospital.admins} columns={adminColumns} />
            </div>
        </div>
    )
}

export default AdminTable