import { Button } from "@/components/ui/button"
import { Metadata } from "next"
import { logout } from "../../lib/actions"
import { auth } from "@/lib/auth"
import { redirect } from "next/navigation"
import SuperUserDashboard from "./(super-user)/dashboard"

export const metadata: Metadata = {
    title: "Dashboard",
}

export default async function Dashboard() {
    const session = await auth()

    if (!session) {
        return redirect("/login")
    } else if (session.user.role === "SUPER_USER") {
        return <SuperUserDashboard />
    }

    return (
        <div>
            Hello
            <form action={async () => {
                "use server"
                await logout()
            }}>

                <Button type="submit">Logout</Button>
            </form>
        </div>
    )
}