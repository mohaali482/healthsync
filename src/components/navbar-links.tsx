import { Briefcase, Home, Hospital, LineChart, NotebookText, Syringe, Users } from "lucide-react";

export const links = {
  SUPER_USER: [
    { link: '/dashboard', linkName: 'Dashboard', icon: <Home /> },
    { link: '/dashboard/analysis', linkName: 'Analysis', icon: <LineChart /> },
    { link: '/dashboard/hospitals', linkName: 'Hospitals', icon: <Hospital /> },
    { link: '/dashboard/equipments', linkName: 'Equipments', icon: <Syringe /> },
    { link: '/dashboard/resources', linkName: 'Resources', icon: <Briefcase /> },
    { link: '/dashboard/reports', linkName: 'Reports', icon: <NotebookText /> },
    { link: '/dashboard/users', linkName: 'Users', icon: <Users /> },
  ],
  GOVERNMENT: [
    { link: '/dashboard', linkName: 'Dashboard', icon: <Home /> },
    { link: '/dashboard/analysis', linkName: 'Analysis', icon: <LineChart /> },
    { link: '/dashboard/hospitals', linkName: 'Hospitals', icon: <Hospital /> }
  ],
  HOSPITAL_ADMIN: [
    { link: '/dashboard', linkName: 'Dashboard', icon: <Home /> },
    { link: '/dashboard/equipments', linkName: 'Equipments', icon: <Syringe /> },
    { link: '/dashboard/resources', linkName: 'Resources', icon: <Briefcase /> },
    { link: '/dashboard/reports', linkName: 'Reports', icon: <NotebookText /> },
    { link: '/dashboard/users', linkName: 'Users', icon: <Users /> },
  ],
  DATA_ENCODER: [
    { link: '/dashboard', linkName: 'Dashboard', icon: <Home /> },
    { link: '/dashboard/equipments', linkName: 'Equipments', icon: <Syringe /> },
    { link: '/dashboard/resources', linkName: 'Resources', icon: <Briefcase /> },
    { link: '/dashboard/reports', linkName: 'Reports', icon: <NotebookText /> },
  ],
};

export function getLinks(role: "GOVERNMENT" | "HOSPITAL_ADMIN" | "DATA_ENCODER" | "SUPER_USER") {
  return links[role];
}
