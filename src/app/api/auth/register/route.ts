import {NextResponse} from "next/server";
import prisma from "@/lib/db/prisma";
import bcrypt from 'bcrypt';
import {PASSWORD_REGEX} from "@/regex/auth";

export async function POST(req: Request ) {
    try {
        const body = await req.json()
        if (!PASSWORD_REGEX.test(body.password)) {
            throw new Error('Password does not meet criteria')
        }
        // kiểm tra username đã có chưa
        // kiểm tra email đã có chưa
        const parseData = {
            email: body.email,
            username: body.username,
            password: body.password,
            phone: body.password.toString(),
            address: body.address,
            is_agent: body.isSeller,
            is_authenticate: false,
            full_name:body.fullName.toString()
        }
        await prisma.user.create({data:parseData})
        return NextResponse.json({ status: 'ok' }, { status: 202 })

    } catch (error) {
        return NextResponse.json({ error: error?.message }, { status: 401 })
    }
}