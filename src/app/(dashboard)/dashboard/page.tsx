import { Button } from "@/components/ui/button"
import { Metadata } from "next"
import { logout } from "../../lib/actions"

export const metadata: Metadata = {
    title: "Dashboard",
}

export default function Dashboard() {

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