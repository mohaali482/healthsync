import { getAllMedicalEquipments } from "@/data/equipment-types";
import Table from "./table";

export default async function Page() {
    const data = await getAllMedicalEquipments()

    return (
        <Table data={data} />
    )
}