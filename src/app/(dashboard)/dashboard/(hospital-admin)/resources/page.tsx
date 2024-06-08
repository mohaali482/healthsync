import { getAllResources } from "@/data/assets";
import Table from "./table";
import { auth } from "@/lib/auth";
import { logout } from "@/app/lib/actions";

export default async function Page() {
    const user = await auth()
    if (!user ||
        user.user.role !== "HOSPITAL_ADMIN" ||
        user.user.hospitalId === null
    ) {
        return await logout()
    }

    const data = await getAllResources(user.user.hospitalId)

    return (
        <Table data={data} />
    )
}