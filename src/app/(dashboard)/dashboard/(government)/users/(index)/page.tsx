import { columns } from "./columns"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { DataTable } from "@/components/data-table"
import { getSuperAndGovernmentUsers } from "@/data/user"

export default async function Page() {
    const data = await getSuperAndGovernmentUsers()
    // await new Promise((resolve) => setTimeout(resolve, 100000))

    return (
        <div className="container mx-auto py-10">
            <DataTable columns={columns} data={data} actionButton={<Link className={cn(buttonVariants({ variant: "default" }))} href={"/dashboard/users/add"}>Add</Link>} />
        </div>
    )
}
