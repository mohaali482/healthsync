import { BarChart3, Biohazard, Briefcase, Home, Hospital, Keyboard, NotebookText, Syringe, Users } from "lucide-react";
import React from "react";

export const links: {
  SUPER_USER: { link: string; linkName: string; icon: React.ReactNode; activeLinks: string[]; }[]
  HOSPITAL_ADMIN: { link: string; linkName: string; icon: React.ReactNode; activeLinks: string[]; }[]
  DATA_ENCODER: { link: string; linkName: string; icon: React.ReactNode; activeLinks: string[]; }[]
}
  = {
  SUPER_USER: [
    { link: '/dashboard', linkName: 'Dashboard', icon: <Home />, activeLinks: ["/dashboard"] },
    { link: '/dashboard/prediction', linkName: 'Prediction', icon: <BarChart3 />, activeLinks: ["/dashboard/prediction"] },
    { link: '/dashboard/hospitals', linkName: 'Hospitals', icon: <Hospital />, activeLinks: ['/dashboard/hospitals', '/dashboard/hospitals/add'] },
    { link: '/dashboard/equipment-types', linkName: 'Equipment Types', icon: <Syringe />, activeLinks: ["/dashboard/equipment-types"] },
    { link: '/dashboard/diseases', linkName: 'Diseases', icon: <Biohazard />, activeLinks: ["/dashboard/diseases"] },
    { link: '/dashboard/users', linkName: 'Super Users', icon: <Users />, activeLinks: ["/dashboard/users"] },
  ],
  HOSPITAL_ADMIN: [
    { link: '/dashboard', linkName: 'Dashboard', icon: <Home />, activeLinks: ["/dashboard"] },
    { link: '/dashboard/equipment', linkName: 'Equipment', icon: <Syringe />, activeLinks: ["/dashboard/equipment"] },
    { link: '/dashboard/resources', linkName: 'Resources', icon: <Briefcase />, activeLinks: ["/dashboard/resources"] },
    { link: '/dashboard/reports', linkName: 'Reports', icon: <NotebookText />, activeLinks: ["/dashboard/reports"] },
    { link: '/dashboard/human-resources', linkName: 'Human Resources', icon: <Users />, activeLinks: ["/dashboard/human-resources"] },
    { link: '/dashboard/data-encoders', linkName: 'Data Encoders', icon: <Keyboard />, activeLinks: ["/dashboard/data-encoders"] },
  ],
  DATA_ENCODER: [
    { link: '/dashboard', linkName: 'Dashboard', icon: <Home />, activeLinks: ["/dashboard"] },
    { link: '/dashboard/equipment', linkName: 'Equipment', icon: <Syringe />, activeLinks: ["/dashboard/equipment"] },
    { link: '/dashboard/resources', linkName: 'Resources', icon: <Briefcase />, activeLinks: ["/dashboard/resources"] },
    { link: '/dashboard/reports', linkName: 'Reports', icon: <NotebookText />, activeLinks: ["/dashboard/reports"] },
  ],
};

export function getLinks(role: "HOSPITAL_ADMIN" | "DATA_ENCODER" | "SUPER_USER") {
  return links[role];
}
