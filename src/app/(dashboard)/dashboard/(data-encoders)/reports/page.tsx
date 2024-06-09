import { getAllReports, getReports } from "@/data/reports";
import Table from "./table";
import { getAllDiseases } from "@/data/diseases";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

const ALLOWED_ROLES = ["DATA_ENCODER", "SUPER_USER", "HOSPITAL_ADMIN"]

export default async function Page() {
    const session = await auth()
    if (!session?.user || session.user.hospitalId === null || !ALLOWED_ROLES.includes(session.user.role)) {
        return redirect("/dashboard")
    }
    if (session.user.role === "DATA_ENCODER") {
        const data = await Promise.all([
            getReports(session.user.hospitalId),
            getAllDiseases(),
        ])

        return (
            <Table data={data[0]} diseases={data[1]} />
        )
    } else if (session.user.role === "HOSPITAL_ADMIN") {
        const data = await Promise.all([
            getReports(session.user.hospitalId),
            getAllDiseases(),
        ])

        return (
            <Table data={data[0]} diseases={data[1]} />
        )
    } else if (session.user.role === "SUPER_USER") {
        const data = await Promise.all([
            getAllReports(),
            getAllDiseases(),
        ])

        return (
            <Table data={data[0]} diseases={data[1]} />
        )
    }
}