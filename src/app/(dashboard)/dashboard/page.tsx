import { Button } from "@/components/ui/button"
import { Metadata } from "next"
import { logout } from "../../lib/actions"
import { auth } from "@/lib/auth"
import { redirect } from "next/navigation"
import SuperUserDashboard from "./(dashboard)/(super-user)/dashboard"
import HospitalDashboard from "./(dashboard)/(hospital-admin-data-encoders)/dashboard"

export const metadata: Metadata = {
    title: "Dashboard",
}

export default async function Dashboard() {
    const session = await auth()

    if (!session) return redirect("/login")

    if (session.user.role === "SUPER_USER") return <SuperUserDashboard />

    return <HospitalDashboard />
}