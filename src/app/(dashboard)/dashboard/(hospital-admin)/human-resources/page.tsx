import Table from "./table";
import { auth } from "@/lib/auth";
import { logout } from "@/app/lib/actions";
import { getAllHumanResources } from "@/data/human-resource";

export default async function Page() {
    const user = await auth()
    if (!user ||
        user.user.role !== "HOSPITAL_ADMIN" ||
        user.user.hospitalId === null
    ) {
        return await logout()
    }

    const data = await getAllHumanResources(user.user.hospitalId)

    return (
        <Table data={data} />
    )
}