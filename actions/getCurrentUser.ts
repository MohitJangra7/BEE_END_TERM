import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { Prisma } from "@prisma/client";
import { getServerSession } from "next-auth";

export async function getSession(){
    return await getServerSession(authOptions);
}

export async function getCurrentUser() {
    try{
        const session = await getSession();

        if (!session?.user?.email){
            return null;
        }

        const currentUser = await prisma.user.findUnique({
            where: { email: session?.user?.email },
        });

        if(!currentUser){
            return null;
        }

        return{
            ...currentUser,
            createdAt: currentUser.createdAt.toISOString(),
            updateAt: currentUser.updateAt.toISOString(),
            emailVerfied: currentUser.emailVerified?.toISOString() || null
        }
    }catch(error: any){
        return null;
    }
}