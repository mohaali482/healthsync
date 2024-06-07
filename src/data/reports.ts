import prisma from '@/lib/prisma';

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
