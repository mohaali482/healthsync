import { getAllMedicalEquipmentStore } from "@/data/medicalEquipmentStore";
import Table from "./table";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { getAllMedicalEquipments } from "@/data/equipment-types";
import { logout } from "@/app/lib/actions";

export default async function Page() {
    const session = await auth()
    if (session === null || session.user.role !== "HOSPITAL_ADMIN" || session.user.hospitalId === null) {
        return await logout()
    }

    const data = await Promise.all([
        getAllMedicalEquipmentStore(session.user.hospitalId),
        getAllMedicalEquipments()
    ])

    return (
        <Table data={data[0]} medicalEquipments={data[1]} />
    )
}