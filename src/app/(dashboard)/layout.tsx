import Layout from "@/components/Layout"
import { getLinks } from "@/components/navbar-links"
import { auth } from "@/lib/auth"

async function layout({ children }: { children: React.ReactNode }) {
    const session = await auth()
    const links = getLinks(session?.user.role)

    return (
        <Layout links={links}>
            {children}
        </Layout>
    )
}

export default layout