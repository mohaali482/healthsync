import { Biohazard, Briefcase, Home, Hospital, Keyboard, LineChart, NotebookText, Syringe, Users } from "lucide-react";

export const links: {
  SUPER_USER: { link: string; linkName: string; icon: React.ReactNode; activeLinks: string[]; }[]
  GOVERNMENT: { link: string; linkName: string; icon: React.ReactNode; activeLinks: string[]; }[]
  HOSPITAL_ADMIN: { link: string; linkName: string; icon: React.ReactNode; activeLinks: string[]; }[]
  DATA_ENCODER: { link: string; linkName: string; icon: React.ReactNode; activeLinks: string[]; }[]
}
  = {
  SUPER_USER: [
    { link: '/dashboard', linkName: 'Dashboard', icon: <Home />, activeLinks: ["/dashboard"] },
    { link: '/dashboard/analysis', linkName: 'Analysis', icon: <LineChart />, activeLinks: ["/dashboard/analysis"] },
    { link: '/dashboard/hospitals', linkName: 'Hospitals', icon: <Hospital />, activeLinks: ['/dashboard/hospitals', '/dashboard/hospitals/add'] },
    { link: '/dashboard/equipment-types', linkName: 'Equipment Types', icon: <Syringe />, activeLinks: ["/dashboard/equipment-types"] },
    { link: '/dashboard/diseases', linkName: 'Diseases', icon: <Biohazard />, activeLinks: ["/dashboard/diseases"] },
    { link: '/dashboard/users', linkName: 'Users', icon: <Users />, activeLinks: ["/dashboard/users"] },
  ],
  GOVERNMENT: [
    { link: '/dashboard', linkName: 'Dashboard', icon: <Home />, activeLinks: ["/dashboard"] },
    { link: '/dashboard/analysis', linkName: 'Analysis', icon: <LineChart />, activeLinks: ['/dashboard/analysis'] },
    { link: '/dashboard/equipment-types', linkName: 'Equipment Types', icon: <Syringe />, activeLinks: ["/dashboard/equipment-types"] },
    { link: '/dashboard/hospitals', linkName: 'Hospitals', icon: <Hospital />, activeLinks: ['/dashboard/hospitals', '/dashboard/hospitals/add'] }
  ],
  HOSPITAL_ADMIN: [
    { link: '/dashboard', linkName: 'Dashboard', icon: <Home />, activeLinks: ["/dashboard"] },
    { link: '/dashboard/equipment', linkName: 'Equipment', icon: <Syringe />, activeLinks: ["/dashboard/equipment"] },
    { link: '/dashboard/resources', linkName: 'Resources', icon: <Briefcase />, activeLinks: ["/dashboard"] },
    { link: '/dashboard/reports', linkName: 'Reports', icon: <NotebookText />, activeLinks: ["/dashboard"] },
    { link: '/dashboard/staffs', linkName: 'Staffs', icon: <Users />, activeLinks: ["/dashboard/users"] },
    { link: '/dashboard/data-encoders', linkName: 'Data Encoders', icon: <Keyboard />, activeLinks: ["/dashboard/data-encoders"] },
  ],
  DATA_ENCODER: [
    { link: '/dashboard', linkName: 'Dashboard', icon: <Home />, activeLinks: ["/dashboard"] },
    { link: '/dashboard/equipment', linkName: 'Equipment', icon: <Syringe />, activeLinks: ["/dashboard"] },
    { link: '/dashboard/resources', linkName: 'Resources', icon: <Briefcase />, activeLinks: ["/dashboard"] },
    { link: '/dashboard/reports', linkName: 'Reports', icon: <NotebookText />, activeLinks: ["/dashboard"] },
  ],
};

export function getLinks(role: "GOVERNMENT" | "HOSPITAL_ADMIN" | "DATA_ENCODER" | "SUPER_USER") {
  return links[role];
}
