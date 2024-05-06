import HospitalEditForm from "@/components/forms/HospitalEditForm";
import { getHospitalById } from "@/data/hospitals";

export default async function Page({ params }: { params: { id: string } }) {

    const hospital = await getHospitalById(parseInt(params.id))
    if (!hospital) {
        return <div>Hospital not found</div>
    }
    return (
        <div className="container mx-auto py-10">
            <HospitalEditForm hospitalId={hospital.id} hospitalData={{ ...hospital }} />
        </div>
    )
}