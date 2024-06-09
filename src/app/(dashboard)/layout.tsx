import Layout from "@/components/Layout"
import { getLinks } from "@/components/navbar-links"
import { auth } from "@/lib/auth"

const getRoleName = (role: string) => {
    switch (role) {
        case "SUPER_USER":
            return "Super User"
        case "DATA_ENCODER":
            return "Data Encoder"
        default:
            return "Hospital Admin"
    }
}

async function layout({ children }: { children: React.ReactNode }) {
    const session = await auth()
    if (!session) {
        return
    }
    const links = getLinks(session.user.role as any)

    return (
        <Layout role={getRoleName(session.user.role)} links={links}>
            {children}
        </Layout>
    )
}

export default layout