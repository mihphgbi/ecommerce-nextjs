import {NextRequest, NextResponse} from "next/server";
import prisma from "@/lib/db/prisma";

export async function GET(req: NextRequest, res: NextResponse) {
    const searchParams = req.nextUrl.searchParams;
    const name = searchParams.get('name') || '';
    try {
        const res = await prisma.user.findFirst({
            where: {
                username: name,
            }
        });
        return NextResponse.json({data: res})
    } catch (error) {
        console.error(error);
    }
}