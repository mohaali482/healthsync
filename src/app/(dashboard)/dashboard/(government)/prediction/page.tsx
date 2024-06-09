"use server"

import { getAllDiseases } from "@/data/diseases"
import Form from "./form"

export default async function Page() {
    const diseases = await getAllDiseases();
    return <Form disease={diseases} />
}