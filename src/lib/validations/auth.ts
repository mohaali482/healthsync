import * as z from "zod"

export const userAuthSchema = z.object({
    username: z.string().min(1, "Username cannot be empty"),
    password: z.string().min(4, "Password cannot be less than 4 character(s)"),
})
