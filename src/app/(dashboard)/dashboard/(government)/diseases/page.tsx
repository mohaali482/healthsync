import Table from "./table";
import { getAllDiseases } from "@/data/diseases";

export default async function Page() {
    const data = await getAllDiseases()

    return (
        <Table data={data} />
    )
}