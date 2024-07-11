import {NextResponse} from "next/server";
import prisma from "@/lib/db/prisma";
import bcrypt from 'bcrypt'
import {PASSWORD_REGEX} from "@/regex/auth";

export async function POST(req: Request ) {
    try {
        const body = await req.json()
        if (!PASSWORD_REGEX.test(body.password)) {
            console.log("===========fail");
            throw new Error('Password does not meet criteria')
        }
        // kiểm tra username đã có chưa
        // kiểm tra email đã có chưa
        const parseData = {
            email: body.email,
            username: body.username,
            password: await bcrypt.hash(body.password, 10),
            phone: body.password.toString(),
            address: body.address,
            is_agent: body.isSeller,
            is_authenticate: false,
            full_name:body.fullName.toString()
        }
        console.log("==============",parseData)
        await prisma.user.create({data:parseData})
        return new NextResponse({status: 202},{data: {status: 'ok'}})

    } catch (error) {
        console.log("===========",error)
        return new NextResponse(
            { error: error.message }, // Return the error message thrown
            { status: 400 } // Use appropriate status code based on the error
        );
    }
}