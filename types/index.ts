import { User } from "@prisma/client";

export type SafeUser = Omit<User, "createdAt" | "updateAt" | "emailVerfied"> &
                        {
                            createdAt: string;
                            updateAt: string;
                            emailVerified: string | null;
                        }
