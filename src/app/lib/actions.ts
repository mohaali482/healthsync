"use server";

import { signIn, signOut } from "@/lib/auth";
import { AuthError } from "next-auth";
import { revalidatePath } from "next/cache";

export async function authenticate(formData: FormData) {
    try {
        await signIn("credentials", formData);
        revalidatePath("/login");
        return null;
    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case "CredentialsSignin":
                    return "Invalid credentials.";
                default:
                    return "Unknown error.";
            }
        }
        throw error;
    }
}

export async function logout() {
    await signOut({ redirectTo: "/login", redirect: true });
}
