import { DataTable } from "@/components/data-table";
import { columns, Resource } from "./columns";
import { Dialog} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import Link from "next/link"
import { buttonVariants } from "@/components/ui/button"



export default function Table ({ data }: { data: Resource[] }) {
    return (
        <Dialog>
            <div className="container mx-auto py-10">
                <DataTable columns={columns} data={data} actionButton={
                    <Link className={cn(buttonVariants({ variant: "default" }))} href={"/dashboard/data-encoders/add"}>Add</Link>
                } />
            </div>
        </Dialog>
    )
}