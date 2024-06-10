'use server';

import { getMedicalEquipment } from '@/data/equipment-types';
import { getAllMedicalEquipmentStoreAggregate } from '@/data/medicalEquipmentStore';
import { JsonObject } from '@prisma/client/runtime/library';

export async function requestPrediction(
  region: string,
  startDate: string,
  endDate: string
) {
  const medicalEquipmentStores = await getAllMedicalEquipmentStoreAggregate(
    region
  );
  const availableResources: JsonObject = {};
  for (const medicalEquipmentStore of medicalEquipmentStores) {
    const medicalEquipment = await getMedicalEquipment(
      medicalEquipmentStore.medicalEquipmentId
    );
    if (medicalEquipment === null) {
      continue;
    }
    availableResources[medicalEquipment.name] =
      medicalEquipmentStore._sum.quantity;
  }

  const data = await fetch(process.env.PREDICTION_URL, {
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'POST',
    body: JSON.stringify({
      authorization_token: process.env.AUTH_SECRET,
      region: region,
      start_date: startDate,
      end_date: endDate,
      available_resources: availableResources
    })
  });

  return await data.text();
}
