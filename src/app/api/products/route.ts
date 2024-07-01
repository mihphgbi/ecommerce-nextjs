import prisma from "@/lib/db/prisma";
import {getAuthSession} from "@/lib/auth";
import {NextResponse} from "next/server";

export async function GET(res: Response) {
    try {
        const res = await prisma.product.findMany();
        return NextResponse.json({data: res})
    } catch (error) {
        console.error(error);
    }
}

export async function DELETE(req: Request) {
    const searchParams = req.nextUrl.searchParams;
    const id = searchParams.get('id');
    try {
        const res = await prisma.product.delete({
            where: {
                id: id
            }
        })
        return NextResponse.json({res});
    } catch (error) {
        return NextResponse(
            {error: 'Internal server error - delete '},
            {status: 500}
        );
    }
}