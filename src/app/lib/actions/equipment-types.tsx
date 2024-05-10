"use server"

import { createMedicalEquipment, deleteMedicalEquipment, updateMedicalEquipment } from "@/data/equipment-types";
import { equipmentForm } from "@/lib/validations/medicalEquipments";
import { revalidatePath } from "next/cache";
import { z } from "zod";


type equipmentFormType = z.infer<typeof equipmentForm>

export async function createMedicalEquipmentAction(data: equipmentFormType) {
    try {
        await createMedicalEquipment(data)
        revalidatePath("/dashboard/equipment-types")
    } catch (e) {
        console.log("Error happened while trying to create equipment type\n[error]", e)
        return "Something went wrong"
    }
}

export async function updateMedicalEquipmentAction(id: number, data: equipmentFormType) {
    try {
        await updateMedicalEquipment(id, data)
        revalidatePath("/dashboard/equipment-types")
    } catch (e) {
        console.log("Error happened while trying to update medical equipment\n[error]", e)
        return "Something went wrong"
    }
}

export async function deleteMedicalEquipmentAction(id: number) {
    try {
        await deleteMedicalEquipment(id)
        revalidatePath("/dashboard/equipment-types")
    } catch (e) {
        console.log("Error happened while trying to delete medical equipment\n[error]", e)
        return "Something went wrong"
    }
}

