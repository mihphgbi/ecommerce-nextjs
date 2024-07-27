import {NextResponse} from "next/server";
import prisma from "@/lib/db/prisma";
import {PASSWORD_REGEX} from "@/regex/auth";

export async function POST(req: Request ) {
    try {
        const body = await req.json()

        if (!PASSWORD_REGEX.test(body.password)) {
            throw new Error('Password does not meet criteria');
        }

        const bcrypt = require('bcrypt');
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(body.password, saltRounds)
        const parseData = {
            email: body.email,
            username: body.username,
            password: hashedPassword,
            phone: body.phone.toString(),
            address: body.address,
            is_agent: body.isSeller,
            is_authenticate: false,
            full_name:body.fullName.toString()
        }
        console.log("==================",parseData)
        await prisma.user.create({data:parseData})
        return NextResponse.json({ status: 'ok' }, { status: 202 })

    } catch (error) {
        return NextResponse.json({ error: error }, { status: 401 })
    }
}