import prisma from '@/lib/prisma';
import { reportsForm } from '@/lib/validations/reports';
import { z } from 'zod';

export function getAllReports() {
  return prisma.report.findMany({
    orderBy: { id: 'asc' }
  });
}

export function getReportDiseases() {
  return prisma.disease.findMany({
    where: {
      reports: {
        some: {}
      }
    },
    include: {
      reports: true
    }
  });
}

export function getYearReports(diseaseId: number, year: number) {
  const startDate = new Date();
  startDate.setFullYear(year);
  startDate.setMonth(0);
  startDate.setDate(1);

  const endDate = new Date();
  endDate.setFullYear(year);
  endDate.setMonth(11);
  endDate.setDate(31);

  return prisma.disease.findFirst({
    where: {
      id: diseaseId
    },
    include: {
      reports: {
        where: {
          reportDate: {
            gt: startDate,
            lt: endDate
          }
        }
      }
    }
  });
}

type reportFormType = z.infer<typeof reportsForm>;

export function getReports(hospitalId: number) {
  return prisma.report.findMany({
    where: {
      hospitalId
    },
    include: {
      disease: true
    }
  });
}

export function getReportWithDiseaseAndReportDate(
  hospitalId: number,
  diseaseId: number,
  reportDate: Date
) {
  return prisma.report.findFirst({
    where: {
      hospitalId,
      diseaseId,
      reportDate
    }
  });
}

export function getReport(id: number) {
  return prisma.report.findFirst({
    where: {
      id
    }
  });
}

export function createReport(data: reportFormType, hospitalId: number) {
  return prisma.report.create({
    data: {
      ...data,
      hospitalId
    }
  });
}

export function updateReport(id: number, data: reportFormType) {
  return prisma.report.update({
    where: {
      id
    },
    data
  });
}

export function deleteReport(id: number) {
  return prisma.report.delete({
    where: {
      id
    }
  });
}
