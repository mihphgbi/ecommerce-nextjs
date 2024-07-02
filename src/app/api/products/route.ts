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

export async function POST(req: Request ) {
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
        return new NextResponse({status: 202},{data: {status: 'ok'}})
    } catch (error) {
        return NextResponse(
            {error: 'Internal server error - delete '},
            {status: 500}
        );
    }
}

export async function PUT(req: Request,res: Response ) {
    try {
        const searchParams = req.nextUrl.searchParams;
        const id = searchParams.get('id');
        const body = await req.json()
        await prisma.product.update({
            where: {
                id: id,
            },
            data: body,
        })
        return new NextResponse({status: 202})
    } catch (error) {
        return NextResponse(
            {error: 'Internal server error - delete '},
            {status: 500}
        );
    }
}