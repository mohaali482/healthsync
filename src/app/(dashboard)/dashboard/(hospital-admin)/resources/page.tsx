import { getAllResources } from "@/data/assets";
import Table from "./table";
import { auth } from "@/lib/auth";
import { logout } from "@/app/lib/actions";

const ALLOWED_ROLES = [
    "HOSPITAL_ADMIN",
    "DATA_ENCODER"
]

export default async function Page() {
    const user = await auth()
    if (!user ||
        !ALLOWED_ROLES.includes(user.user.role) ||
        user.user.hospitalId === null
    ) {
        return await logout()
    }

    const data = await getAllResources(user.user.hospitalId)

    return (
        <Table data={data} userRole={user.user.role} />
    )
}