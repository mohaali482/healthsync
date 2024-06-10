import { cn } from '@/lib/utils'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'


// export const links: {
//   SUPER_USER: { link: string; linkName: string; icon: React.ReactNode; activeLinks: string[]; activeLinkRegex: RegExp; }[]
//   HOSPITAL_ADMIN: { link: string; linkName: string; icon: React.ReactNode; activeLinks: string[]; activeLinkRegex: RegExp; }[]
//   DATA_ENCODER: { link: string; linkName: string; icon: React.ReactNode; activeLinks: string[]; activeLinkRegex: RegExp; }[]
// }
//   = {
//   SUPER_USER: [
//     { link: '/dashboard', linkName: 'Dashboard', icon: <Home />, activeLinks: ["/dashboard"], activeLinkRegex: /^\/dashboard$/ },
//     { link: '/dashboard/prediction', linkName: 'Prediction', icon: <BarChart3 />, activeLinks: ["/dashboard/prediction"], activeLinkRegex: /^\/dashboard\/prediction$/ },
//     { link: '/dashboard/hospitals', linkName: 'Hospitals', icon: <Hospital />, activeLinks: ['/dashboard/hospitals', '/dashboard/hospitals/add'], activeLinkRegex: /^\/dashboard\/hospitals(\/(add|edit\/\d+|\d+))?$/ },
//     { link: '/dashboard/equipment-types', linkName: 'Equipment Types', icon: <Syringe />, activeLinks: ["/dashboard/equipment-types"], activeLinkRegex: /^\/dashboard\/equipment-types$/ },
//     { link: '/dashboard/diseases', linkName: 'Diseases', icon: <Biohazard />, activeLinks: ["/dashboard/diseases"], activeLinkRegex: /^\/dashboard\/diseases$/ },
//     { link: '/dashboard/users', linkName: 'Super Users', icon: <Users />, activeLinks: ["/dashboard/users"], activeLinkRegex: /^\/dashboard\/users$/ },
//   ],
//   HOSPITAL_ADMIN: [
//     { link: '/dashboard', linkName: 'Dashboard', icon: <Home />, activeLinks: ["/dashboard"], activeLinkRegex: /^\/dashboard$/ },
//     { link: '/dashboard/equipment', linkName: 'Equipment', icon: <Syringe />, activeLinks: ["/dashboard/equipment"], activeLinkRegex: /^\/dashboard\/equipment$/ },
//     { link: '/dashboard/resources', linkName: 'Resources', icon: <Briefcase />, activeLinks: ["/dashboard/resources"], activeLinkRegex: /^\/dashboard\/resources$/ },
//     { link: '/dashboard/reports', linkName: 'Reports', icon: <NotebookText />, activeLinks: ["/dashboard/reports"], activeLinkRegex: /^\/dashboard\/reports$/ },
//     { link: '/dashboard/human-resources', linkName: 'Human Resources', icon: <Users />, activeLinks: ["/dashboard/human-resources"], activeLinkRegex: /^\/dashboard\/human-resources$/ },
//     { link: '/dashboard/data-encoders', linkName: 'Data Encoders', icon: <Keyboard />, activeLinks: ["/dashboard/data-encoders"], activeLinkRegex: /^\/dashboard\/data-encoders$/ },
//   ],
//   DATA_ENCODER: [
//     { link: '/dashboard', linkName: 'Dashboard', icon: <Home />, activeLinks: ["/dashboard"], activeLinkRegex: /^\/dashboard$/ },
//     { link: '/dashboard/equipment', linkName: 'Equipment', icon: <Syringe />, activeLinks: ["/dashboard/equipment"], activeLinkRegex: /^\/dashboard\/equipment$/ },
//     { link: '/dashboard/resources', linkName: 'Resources', icon: <Briefcase />, activeLinks: ["/dashboard/resources"], activeLinkRegex: /^\/dashboard\/resources$/ },
//     { link: '/dashboard/reports', linkName: 'Reports', icon: <NotebookText />, activeLinks: ["/dashboard/reports"], activeLinkRegex: /^\/dashboard\/reports$/ },
//   ],
// };



const linkRegexes = [
    { link: "/dashboard", regex: /^\/dashboard$/ },
    { link: "/dashboard/prediction", regex: /^\/dashboard\/prediction(\/result)?$/ },
    { link: "/dashboard/hospitals", regex: /^\/dashboard\/hospitals(\/(add|edit\/\d+|\d+))?$/ },
    { link: "/dashboard/equipment-types", regex: /^\/dashboard\/equipment-types$/ },
    { link: "/dashboard/diseases", regex: /^\/dashboard\/diseases$/ },
    { link: "/dashboard/users", regex: /^\/dashboard\/users(\/add)?$/ },
    { link: "/dashboard/equipment", regex: /^\/dashboard\/equipment$/ },
    { link: "/dashboard/resources", regex: /^\/dashboard\/resources$/ },
    { link: "/dashboard/reports", regex: /^\/dashboard\/reports$/ },
    { link: "/dashboard/human-resources", regex: /^\/dashboard\/human-resources$/ },
    { link: "/dashboard/data-encoders", regex: /^\/dashboard\/data-encoders$/ },
];


function HeaderLink({ icon, link, linkName, activeLinks }: { icon: React.ReactNode, link: string, linkName: string, activeLinks: string[]; }) {
    const pathname = usePathname()

    return (
        <Link
            href={link}
            className={cn("flex items-center gap-4 px-2.5", linkRegexes.find(val => val.link === link)?.regex.test(pathname) ? "text-foreground" : "text-muted-foreground hover:text-foreground")}
        >
            {icon}
            {linkName}
        </Link>
    )
}

export default HeaderLink