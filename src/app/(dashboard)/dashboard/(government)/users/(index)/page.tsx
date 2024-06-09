import { columns } from "./columns"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { DataTable } from "@/components/data-table"
import { getSuperUsers } from "@/data/user"
import { auth } from "@/lib/auth"
import { redirect } from "next/navigation"

export default async function Page() {
    const session = await auth()
    if (!session || session.user.role !== "SUPER_USER") {
        return redirect("/dashboard")
    }
    const data = await getSuperUsers()

    return (
        <div className="container mx-auto py-10">
            <DataTable columns={columns} data={data} userId={session.user.id} actionButton={<Link className={cn(buttonVariants({ variant: "default" }))} href={"/dashboard/users/add"}>Add</Link>} />
        </div>
    )
}
