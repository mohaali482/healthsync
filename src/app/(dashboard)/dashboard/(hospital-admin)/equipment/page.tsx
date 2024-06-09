import { getAllMedicalEquipmentStore } from "@/data/medicalEquipmentStore";
import Table from "./table";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { getAllMedicalEquipments } from "@/data/equipment-types";

const ALLOWED_ROLES = [
    "HOSPITAL_ADMIN",
    "DATA_ENCODER"
]

export default async function Page() {
    const session = await auth()
    if (session === null || !ALLOWED_ROLES.includes(session.user.role) || session.user.hospitalId === null) {
        return redirect("/dashboard")
    }

    const data = await Promise.all([
        getAllMedicalEquipmentStore(session.user.hospitalId),
        getAllMedicalEquipments()
    ])

    return (
        <Table data={data[0]} medicalEquipments={data[1]} userRole={session.user.role} />
    )
}