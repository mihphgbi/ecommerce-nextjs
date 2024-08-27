import prisma from "@/lib/db/prisma";
import {NextRequest, NextResponse} from "next/server";

export async function GET(res: NextResponse) {
    try {
        const res = await prisma.product.findMany();
        return NextResponse.json({data: res})
    } catch (error) {
        console.error(error);
    }
}

export async function DELETE(req: NextRequest, res: NextResponse) {
    const searchParams = req.nextUrl.searchParams;
    const id = searchParams.get('id') || '';
    try {
        const res = await prisma.product.delete({
            where: {
                id: id
            }
        })
        return NextResponse.json({res});
    } catch (error) {
        return NextResponse.json(
            {error: 'Internal server error - delete '},
            {status: 500}
        );
    }
}

export async function POST(req: NextRequest, res: NextResponse ) {
    try {
        const body = await req.json()
        const parseData = {
            name: body.name,
            description: body.description,
            image: body.image,
            quality: parseInt(body.quality),
            price: parseFloat(body.price),
            is_sale: body.is_sale,
            sale_price: parseFloat(body.sale_price),
        }
        await prisma.product.create({data:parseData})
        return NextResponse.json({status: 202},{ statusText: 'ok'})
    } catch (error) {
        return NextResponse.json(
            {error: 'Internal server error - delete '},
            {status: 500}
        );
    }
}

export async function PUT(req: NextRequest, res: NextResponse ) {
    try {
        const searchParams = req.nextUrl.searchParams;
        const id = searchParams.get('id') || '';
        const body = await req.json()
        await prisma.product.update({
            where: {
                id: id,
            },
            data: body,
        })
        return NextResponse.json({status: 202})
    } catch (error) {
        return NextResponse.json(
            {error: 'Internal server error - delete '},
            {status: 500}
        );
    }
}