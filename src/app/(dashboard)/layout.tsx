import { Icons } from "@/components/icons"
import Layout from "@/components/Layout"
import { getLinks } from "@/components/navbar-links"
import { auth } from "@/lib/auth"
import { Suspense } from "react"

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
            <Suspense fallback=
                {
                    (
                        <div className="w-full h-full flex justify-center items-center">
                            <Icons.spinner size={30} className="mr-2 animate-spin" />
                        </div>
                    )
                }>
                {children}
            </Suspense>
        </Layout>
    )
}

export default layout