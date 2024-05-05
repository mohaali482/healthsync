import Link from "next/link"
import { Button } from "../ui/button"
import { PanelLeft, Stethoscope, UserIcon } from "lucide-react"
import Image from "next/image"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu"
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet"
import DefaultBreadcrumb from "../DefaultBreadcrumb"
import { logout } from "@/app/lib/actions"
import HeaderLink from "./HeaderLink"

function Header({ links }: {
    links: {
        link: string;
        linkName: string;
        icon: React.ReactNode
        activeLinks: string[];
    }[]
}) {

    return (
        <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 md:static md:h-auto md:border-0 md:bg-transparent md:px-6">
            <Sheet>
                <SheetTrigger asChild>
                    <Button size="icon" variant="outline" className="md:hidden">
                        <PanelLeft className="h-5 w-5" />
                        <span className="sr-only">Toggle Menu</span>
                    </Button>
                </SheetTrigger>
                <SheetContent side="left" className="md:max-w-xs">
                    <nav className="grid gap-6 text-lg font-medium">
                        <Link
                            href="/dashboard"
                            className="group flex h-10 w-10 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:text-base"
                        >
                            <Stethoscope className="h-4 w-4 transition-all group-hover:scale-110" />
                            <span className="sr-only">HealthSync</span>
                        </Link>
                        {links.map((link, index) => (
                            <HeaderLink key={index} {...link} />
                        ))}
                    </nav>
                </SheetContent>
            </Sheet>
            <DefaultBreadcrumb />
            <div className="relative ml-auto md:grow-0">
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button
                            variant="outline"
                            size="icon"
                            className="overflow-hidden rounded-full"
                        >
                            <UserIcon />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>My Account</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>Settings</DropdownMenuItem>
                        <DropdownMenuItem>Support</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <form action={async () => await logout()}>
                            <DropdownMenuItem>
                                <button className="w-full text-left" type="submit">
                                    Logout
                                </button>
                            </DropdownMenuItem>
                        </form>

                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </header>
    )
}

export default Header