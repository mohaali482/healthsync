import { logout } from "@/app/lib/actions";
import { auth } from "@/lib/auth";
import { getUserByRoleAndHospital } from "@/data/user";
import Table from "./table"

export default async function Page() {
    const user = await auth()

    if (!user || user.user.role !== 'HOSPITAL_ADMIN' || user.user.hospitalId === null) {
        return await logout()
    }
    
    const data = await getUserByRoleAndHospital('DATA_ENCODER', user.user.hospitalId)
    return (
        <Table data={data} />
    )
 
}