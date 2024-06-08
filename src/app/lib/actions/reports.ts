'use server';

import { auth } from '@/lib/auth';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';
import { logout } from '../actions';
import {
  createReport,
  deleteReport,
  getReport,
  getReportWithDiseaseAndReportDate,
  updateReport
} from '@/data/reports';
import { reportsForm } from '@/lib/validations/reports';

type reportFormType = z.infer<typeof reportsForm>;

const ALLOWED_ROLES = ['HOSPITAL_ADMIN', 'DATA_ENCODER'];

function isValidDate(reportDate: Date) {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  return reportDate < tomorrow;
}

export async function createReportAction(data: reportFormType) {
  try {
    const user = await auth();
    if (
      !user ||
      !ALLOWED_ROLES.includes(user.user.role) ||
      user.user.hospitalId === null
    ) {
      await logout();
      return 'Something went wrong';
    }

    const report = await getReportWithDiseaseAndReportDate(
      user.user.hospitalId,
      data.diseaseId,
      data.reportDate
    );

    if (report !== null) {
      return 'Report for this disease already recorded on that day';
    }

    if (!isValidDate(data.reportDate)) {
      return 'Report date cannot be in the future';
    }
    try {
      await createReport(data, user.user.hospitalId);
    } catch (e) {
      return 'Something went wrong';
    }
    revalidatePath('/dashboard/reports');
  } catch (e) {
    console.log('Error happened while trying to add a report\n[error]', e);
    return 'Something went wrong';
  }
}

export async function updateReportAction(id: number, data: reportFormType) {
  try {
    const user = await auth();
    if (
      !user ||
      !ALLOWED_ROLES.includes(user.user.role) ||
      user.user.hospitalId === null
    ) {
      await logout();
      return 'Something went wrong';
    }

    const report = await getReport(id);
    if (!report || user.user.hospitalId !== report.hospitalId) {
      return 'Resource not found.';
    }

    if (!isValidDate(data.reportDate)) {
      return 'Report date cannot be in the future';
    }

    const oldReport = await getReportWithDiseaseAndReportDate(
      user.user.hospitalId,
      data.diseaseId,
      data.reportDate
    );

    if (oldReport !== null && oldReport.id !== id) {
      return 'Report for this disease already recorded on that day';
    }

    await updateReport(id, data);
    revalidatePath('/dashboard/reports');
  } catch (e) {
    console.log('Error happened while trying to update report\n[error]', e);
    return 'Something went wrong';
  }
}

export async function deleteReportAction(id: number) {
  try {
    const user = await auth();
    if (
      !user ||
      !ALLOWED_ROLES.includes(user.user.role) ||
      user.user.hospitalId === null
    ) {
      await logout();
      return 'Something went wrong';
    }

    const resource = await getReport(id);
    if (!resource || user.user.hospitalId !== resource.hospitalId) {
      return 'Resource not found.';
    }

    await deleteReport(id);
    revalidatePath('/dashboard/reports');
  } catch (e) {
    console.log('Error happened while trying to delete report\n[error]', e);
    return 'Something went wrong';
  }
}
