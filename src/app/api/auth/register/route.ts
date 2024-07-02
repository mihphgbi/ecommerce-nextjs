import {NextResponse} from "next/server";
import prisma from "@/lib/db/prisma";

export async function POST(req: Request ) {
    try {
        const body = await req.json()
        const parseData = {
            email: body.email,
            username: body.username,
            password: body.password,
            phone: '11111111111111111'.toString(),
            address: body.isSeller,
            is_agent: body.isSeller,
            is_authenticate: false,
            full_name:'tesssssssssss'
        }
        console.log("==============",parseData)
        await prisma.user.create({data:parseData})
        return new NextResponse({status: 202},{data: {status: 'ok'}})
    } catch (error) {
        console.log("===========",error)
        return new NextResponse(
            {error: 'Internal server error - delete '},
            {status: 500}
        );
    }
}