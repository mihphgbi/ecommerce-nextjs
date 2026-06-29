import {NextRequest, NextResponse} from "next/server";
import prisma from "@/lib/db/prisma";
import {PASSWORD_REGEX} from "@/regex/auth";

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

export async function POST(req: Request ) {
    try {
        const body = await req.json()

        if (!body.username || !body.password || !body.rePassword || !body.email || !body.phone || !body.fullName) {
            return NextResponse.json({ error: 'Please fill in all required fields' }, { status: 400 })
        }

        if (body.password !== body.rePassword) {
            return NextResponse.json({ error: 'Passwords do not match' }, { status: 400 })
        }

        if (!PASSWORD_REGEX.test(body.password)) {
            return NextResponse.json({ error: 'Password does not meet criteria' }, { status: 400 })
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
        await prisma.user.create({data:parseData})
        return NextResponse.json({ status: 'ok', message: 'Create account success' }, { status: 201 })

    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Create account failed' }, { status: 500 })
    }
}
