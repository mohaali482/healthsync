import { getAllReports, getReports } from "@/data/reports";
import Table from "./table";
import { getAllDiseases } from "@/data/diseases";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function Page() {
    const session = await auth()
    if (!session?.user || session.user.hospitalId === null) {
        return redirect("/dashboard")
    }

    const data = await Promise.all([
        getReports(session.user.hospitalId),
        getAllDiseases(),
    ])

    return (
        <Table data={data[0]} diseases={data[1]} />
    )
}