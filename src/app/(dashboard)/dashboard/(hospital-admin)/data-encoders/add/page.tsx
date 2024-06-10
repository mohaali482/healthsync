import DataEncoderAddForm from "@/components/forms/DataEncoderAddForm";
import { auth } from "@/lib/auth";
import { logout } from "@/app/lib/actions";

export default async function Page() {
    const session = await auth()

    if (!session || session.user.role !== 'HOSPITAL_ADMIN' || session.user.hospitalId === null) {
        return await logout()
    }
    return (
        <div className="container mx-auto py-10">
            <DataEncoderAddForm hospitalId={session.user.hospitalId}/>
        </div>
    )
}