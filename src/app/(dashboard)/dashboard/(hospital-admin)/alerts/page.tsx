import Table from "./table";
import { auth } from "@/lib/auth";
import { logout } from "@/app/lib/actions";
import { getAllMedicalEquipmentStoreWithLowQuantityThanThreshold } from "@/data/medicalEquipmentStore";

const ALLOWED_ROLES = [
    "HOSPITAL_ADMIN"
]

export default async function Page() {
    const user = await auth()
    if (!user ||
        !ALLOWED_ROLES.includes(user.user.role) ||
        user.user.hospitalId === null
    ) {
        return await logout()
    }

    const data = await getAllMedicalEquipmentStoreWithLowQuantityThanThreshold(user.user.hospitalId)
    if (data.length === 0) {
        return (
            <div className="text-center text-xl font-bold text-green-600">
                No medical equipment with low quantity
            </div>
        )
    }

    return (
        <Table data={data} />
    )
}