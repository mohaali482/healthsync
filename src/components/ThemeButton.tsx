"use client";

import { MoonIcon, SunIcon } from '@radix-ui/react-icons'
import { Button } from './ui/button'
import { useEffect, useState } from 'react'
import { DropdownMenuItem } from './ui/dropdown-menu';
import { Check } from 'lucide-react';

const ThemeButton = () => {
    const [theme, setTheme] = useState<string | null>(null)

    const updateChange = () => {
        setTheme(localStorage.getItem('theme'))
    }

    useEffect(() => {
        setTheme(localStorage.getItem('theme'))
        window.addEventListener('storage', updateChange)

    }, [])

    useEffect(() => {
        if (theme === null) {
            return
        }
        if (theme === "dark") {
            document.body.classList.add('dark')
            localStorage.setItem('theme', 'dark')
        } else {
            document.body.classList.remove('dark')
            localStorage.setItem('theme', 'light')
        }
    }, [theme])

    const toggleTheme = (theme: "dark" | "light") => {
        setTheme(theme)
    }

    return (
        <>
            <DropdownMenuItem onClick={() => toggleTheme("light")}>
                Light
                <p className='ml-auto'>
                    {theme === "light" && <Check size={15} />}
                </p>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => toggleTheme("dark")}>
                Dark
                <p className='ml-auto'>
                    {theme === "dark" && <Check size={15} />}
                </p>
            </DropdownMenuItem>
        </>
    )
}

export default ThemeButton